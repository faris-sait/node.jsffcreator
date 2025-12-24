/**
 * 🎬 STORY 14: "Double Exposure Poet" - Artistic
 * 
 * The Story: A person reciting a poem about the ocean while 
 * the waves crash inside their silhouette.
 * 
 * Visual Style:
 * - High contrast, monochrome aesthetic
 * - Alpha mattes and blending modes simulation
 * - Slow motion feel
 * - Text masked into silhouette shadow
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~45 seconds (5 scenes)
 * 
 * GPU ACCELERATION NOTE:
 * To enable GPU rendering, ensure FFmpeg is built with hardware encoding:
 * - NVIDIA: Use NVENC (add '-c:v h264_nvenc' to FFmpeg options)
 * - AMD: Use AMF (add '-c:v h264_amf')
 * - Intel: Use QSV (add '-c:v h264_qsv')
 * 
 * Run with: node examples/story-videos/story-14-double-exposure-poet.js
 */

// Mock browser environment for echarts
const inkpaint = require('inkpaint');
const originalCreateCanvas = inkpaint.createCanvas;

inkpaint.createCanvas = function(width, height) {
  const canvas = originalCreateCanvas(width, height);
  canvas.addEventListener = () => {};
  canvas.removeEventListener = () => {};
  canvas.style = canvas.style || {};
  return canvas;
};

global.document = {
  createElement: (type) => {
    if (type === 'canvas') return inkpaint.createCanvas(1, 1);
    return { style: {}, setAttribute: () => {}, getAttribute: () => null, appendChild: () => {}, removeChild: () => {}, addEventListener: () => {}, removeEventListener: () => {}, innerHTML: '', innerText: '' };
  },
  createElementNS: () => ({ style: {}, setAttribute: () => {}, getAttribute: () => null, appendChild: () => {}, removeChild: () => {}, addEventListener: () => {}, removeEventListener: () => {} }),
  documentElement: { style: { WebkitTransition: '', MozTransition: '', transition: '' } },
  body: { appendChild: () => {}, removeChild: () => {} },
  head: { appendChild: () => {}, removeChild: () => {} }
};

global.window = {
  devicePixelRatio: 1,
  addEventListener: () => {},
  removeEventListener: () => {},
  getComputedStyle: () => ({ getPropertyValue: () => '' }),
  requestAnimationFrame: (cb) => setTimeout(cb, 16),
  cancelAnimationFrame: (id) => clearTimeout(id),
  document: global.document
};

global.navigator = { userAgent: 'node' };
global.Image = class Image { constructor() { this.onload = null; this.onerror = null; this.src = ''; } };

const path = require('path');
const colors = require('colors');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('ffprobe-installer').path;
const { FFText, FFRect, FFScene, FFCreator } = require('../../');

FFCreator.setFFmpegPath(ffmpegPath);
FFCreator.setFFprobePath(ffprobePath);

const outputDir = path.join(__dirname, '../output/');
const cacheDir = path.join(__dirname, '../cache/');

// YouTube Shorts dimensions (9:16 vertical)
const width = 1080;
const height = 1920;

// ============================================
// COLOR PALETTE - Monochrome/Artistic Theme
// ============================================
const COLORS = {
  // Monochrome base
  pureBlack: '#000000',
  deepBlack: '#0a0a0a',
  darkGray: '#1a1a1a',
  midGray: '#3a3a3a',
  lightGray: '#6a6a6a',
  silver: '#a0a0a0',
  offWhite: '#e0e0e0',
  pureWhite: '#ffffff',
  
  // Ocean tones (subtle blue hints)
  deepOcean: '#0a1520',
  oceanMid: '#1a2a3a',
  oceanLight: '#2a3a4a',
  seafoam: 'rgba(100, 150, 180, 0.3)',
  
  // Silhouette colors
  silhouetteBlack: '#050505',
  silhouetteEdge: '#1a1a1a',
  
  // Text overlay
  poetryWhite: '#f5f5f5',
  poetryGray: '#c0c0c0',
  
  // Blend effects
  blendLight: 'rgba(255, 255, 255, 0.15)',
  blendDark: 'rgba(0, 0, 0, 0.6)'
};

// ============================================
// POEM LINES
// ============================================
const POEM = [
  { line: 'I am the ocean', emphasis: 'ocean' },
  { line: 'Vast and deep', emphasis: 'deep' },
  { line: 'Waves crash within me', emphasis: 'crash' },
  { line: 'Secrets I keep', emphasis: 'Secrets' },
  { line: 'Tides of emotion', emphasis: 'emotion' },
  { line: 'Rise and fall', emphasis: 'Rise' },
  { line: 'In the silence', emphasis: 'silence' },
  { line: 'I hear it all', emphasis: 'all' }
];

// ============================================
// HELPER: Create silhouette shape
// ============================================
function addSilhouette(scene, x, y, scale = 1, delay = 0) {
  // Head
  const head = new FFRect({ color: COLORS.silhouetteBlack, width: 180 * scale, height: 200 * scale, x: x, y: y - 350 * scale });
  head.addEffect('fadeIn', 0.8, delay);
  scene.addChild(head);
  
  // Neck
  const neck = new FFRect({ color: COLORS.silhouetteBlack, width: 80 * scale, height: 80 * scale, x: x, y: y - 220 * scale });
  neck.addEffect('fadeIn', 0.7, delay + 0.1);
  scene.addChild(neck);
  
  // Shoulders/Body
  const body = new FFRect({ color: COLORS.silhouetteBlack, width: 350 * scale, height: 500 * scale, x: x, y: y + 80 * scale });
  body.addEffect('fadeIn', 0.8, delay + 0.2);
  scene.addChild(body);
  
  return { head, neck, body };
}

// ============================================
// HELPER: Add wave effect inside silhouette
// ============================================
function addWaveEffect(scene, y, delay = 0) {
  // Multiple wave layers
  for (let i = 0; i < 5; i++) {
    const waveY = y + (i * 60);
    const wave = new FFRect({ 
      color: i % 2 === 0 ? COLORS.oceanMid : COLORS.oceanLight, 
      width: 300, 
      height: 25 + Math.random() * 20, 
      x: width/2, 
      y: waveY 
    });
    wave.addEffect('fadeIn', 0.3, delay + (i * 0.15));
    wave.addEffect('fadeOut', 0.4, delay + 1.5 + (i * 0.1));
    scene.addChild(wave);
  }
}

// ============================================
// HELPER: Add poetry text with mask effect
// ============================================
function addPoetryLine(scene, text, y, fontSize, delay = 0, fadeOutDelay = 3) {
  // Shadow text (offset)
  const shadowText = new FFText({ text: text, x: width/2 + 3, y: y + 3, fontSize: fontSize });
  shadowText.setColor(COLORS.blendDark);
  shadowText.alignCenter();
  shadowText.addEffect('fadeIn', 0.6, delay);
  shadowText.addEffect('fadeOut', 0.5, delay + fadeOutDelay);
  scene.addChild(shadowText);
  
  // Main text
  const mainText = new FFText({ text: text, x: width/2, y: y, fontSize: fontSize });
  mainText.setColor(COLORS.poetryWhite);
  mainText.alignCenter();
  mainText.addEffect('fadeIn', 0.6, delay + 0.1);
  mainText.addEffect('fadeOut', 0.5, delay + fadeOutDelay);
  scene.addChild(mainText);
  
  return mainText;
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createDoubleExposurePoetVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 14: "Double Exposure Poet"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~45 seconds'));
  console.log(colors.yellow('🎨 Theme: Artistic - Monochrome Double Exposure\n'));

  // Check for GPU acceleration availability
  console.log(colors.gray('💡 TIP: For GPU acceleration, ensure FFmpeg has NVENC/AMF/QSV support'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-14-double-exposure-poet.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
    // To enable GPU encoding (if supported), you can modify FFCreator's internal FFmpeg command
    // or use a custom FFmpeg build with hardware acceleration
  });

  // ============================================
  // SCENE 1: INTRO - Silhouette Emerges (8s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.pureBlack);
  scene1.setDuration(8);

  // Deep black background
  const introBg = new FFRect({ color: COLORS.deepBlack, width: 1100, height: 2000, x: width/2, y: height/2 });
  introBg.addEffect('fadeIn', 0.5, 0);
  scene1.addChild(introBg);

  // Subtle ocean texture in background
  for (let i = 0; i < 8; i++) {
    const oceanLayer = new FFRect({ 
      color: COLORS.deepOcean, 
      width: 1100, 
      height: 80 + Math.random() * 100, 
      x: width/2, 
      y: 300 + (i * 200) 
    });
    oceanLayer.addEffect('fadeIn', 0.8, 0.5 + (i * 0.2));
    scene1.addChild(oceanLayer);
  }

  // Title text
  const titleText1 = new FFText({ text: 'DOUBLE', x: width/2, y: 400, fontSize: 80 });
  titleText1.setColor(COLORS.offWhite);
  titleText1.alignCenter();
  titleText1.addEffect('fadeIn', 0.8, 1);
  scene1.addChild(titleText1);

  const titleText2 = new FFText({ text: 'EXPOSURE', x: width/2, y: 500, fontSize: 90 });
  titleText2.setColor(COLORS.pureWhite);
  titleText2.alignCenter();
  titleText2.addEffect('fadeIn', 0.8, 1.3);
  scene1.addChild(titleText2);

  // Silhouette emerging
  addSilhouette(scene1, width/2, height/2 + 200, 1.2, 2);

  // Wave hint inside silhouette area
  const waveHint1 = new FFRect({ color: COLORS.seafoam, width: 300, height: 40, x: width/2, y: height/2 + 100 });
  waveHint1.addEffect('fadeIn', 0.5, 3);
  waveHint1.addEffect('fadeOut', 0.5, 4);
  scene1.addChild(waveHint1);

  const waveHint2 = new FFRect({ color: COLORS.seafoam, width: 280, height: 30, x: width/2, y: height/2 + 180 });
  waveHint2.addEffect('fadeIn', 0.5, 3.3);
  waveHint2.addEffect('fadeOut', 0.5, 4.3);
  scene1.addChild(waveHint2);

  // Subtitle
  const subtitle = new FFText({ text: 'A Visual Poem', x: width/2, y: height - 300, fontSize: 36 });
  subtitle.setColor(COLORS.silver);
  subtitle.alignCenter();
  subtitle.addEffect('fadeIn', 0.6, 4);
  scene1.addChild(subtitle);

  // Ocean icon
  const oceanIcon = new FFText({ text: '🌊', x: width/2, y: height - 200, fontSize: 50 });
  oceanIcon.alignCenter();
  oceanIcon.addEffect('fadeIn', 0.5, 5);
  scene1.addChild(oceanIcon);

  scene1.setTransition('fade', 0.8);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Intro - Silhouette Emerges (8s)'));

  // ============================================
  // SCENE 2: POEM PART 1 - "I am the ocean" (10s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.pureBlack);
  scene2.setDuration(10);

  // Background
  const poem1Bg = new FFRect({ color: COLORS.deepBlack, width: 1100, height: 2000, x: width/2, y: height/2 });
  poem1Bg.addEffect('fadeIn', 0.3, 0);
  scene2.addChild(poem1Bg);

  // Silhouette
  addSilhouette(scene2, width/2, height/2 + 150, 1.3, 0.2);

  // Wave effects inside silhouette
  addWaveEffect(scene2, height/2 - 50, 1);
  addWaveEffect(scene2, height/2 + 100, 2.5);
  addWaveEffect(scene2, height/2 + 250, 4);

  // Poetry lines - Part 1
  addPoetryLine(scene2, '"I am the ocean"', 350, 52, 0.5, 4);
  addPoetryLine(scene2, 'Vast and deep', 450, 44, 2, 3.5);

  // Emphasis word
  const emphasisBox = new FFRect({ color: 'rgba(255,255,255,0.1)', width: 400, height: 80, x: width/2, y: 550 });
  emphasisBox.addEffect('fadeIn', 0.5, 3.5);
  emphasisBox.addEffect('fadeOut', 0.5, 6);
  scene2.addChild(emphasisBox);

  const emphasisText = new FFText({ text: 'OCEAN', x: width/2, y: 550, fontSize: 60 });
  emphasisText.setColor(COLORS.pureWhite);
  emphasisText.alignCenter();
  emphasisText.addEffect('zoomIn', 0.6, 3.7);
  emphasisText.addEffect('fadeOut', 0.5, 6);
  scene2.addChild(emphasisText);

  // Slow motion wave bars
  for (let i = 0; i < 6; i++) {
    const slowWave = new FFRect({ 
      color: COLORS.oceanLight, 
      width: 350, 
      height: 15, 
      x: width/2, 
      y: height/2 + 50 + (i * 50) 
    });
    slowWave.addEffect('fadeIn', 1, 5 + (i * 0.3));
    slowWave.addEffect('fadeOut', 0.8, 7 + (i * 0.2));
    scene2.addChild(slowWave);
  }

  // Blend overlay
  const blendOverlay1 = new FFRect({ color: COLORS.blendLight, width: 1100, height: 2000, x: width/2, y: height/2 });
  blendOverlay1.addEffect('fadeIn', 0.3, 6);
  blendOverlay1.addEffect('fadeOut', 0.5, 8);
  scene2.addChild(blendOverlay1);

  scene2.setTransition('crosswarp', 0.7);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Poem Part 1 - "I am the ocean" (10s)'));

  // ============================================
  // SCENE 3: POEM PART 2 - "Waves crash within me" (10s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.pureBlack);
  scene3.setDuration(10);

  // Background with ocean tint
  const poem2Bg = new FFRect({ color: COLORS.deepOcean, width: 1100, height: 2000, x: width/2, y: height/2 });
  poem2Bg.addEffect('fadeIn', 0.3, 0);
  scene3.addChild(poem2Bg);

  // Silhouette (slightly different position)
  addSilhouette(scene3, width/2 - 50, height/2 + 100, 1.4, 0.2);

  // Crashing wave effect - more dramatic
  for (let wave = 0; wave < 3; wave++) {
    const crashDelay = 1 + (wave * 2);
    
    // Wave crash lines
    for (let i = 0; i < 8; i++) {
      const crashLine = new FFRect({ 
        color: i % 2 === 0 ? COLORS.silver : COLORS.lightGray, 
        width: 280 - (i * 20), 
        height: 8, 
        x: width/2 - 50, 
        y: height/2 - 100 + (i * 40) 
      });
      crashLine.addEffect('fadeIn', 0.15, crashDelay + (i * 0.05));
      crashLine.addEffect('fadeOut', 0.3, crashDelay + 0.8);
      scene3.addChild(crashLine);
    }
  }

  // Poetry lines - Part 2
  addPoetryLine(scene3, '"Waves crash within me"', 300, 48, 0.5, 4);
  addPoetryLine(scene3, 'Secrets I keep', 400, 42, 2.5, 3.5);

  // Emphasis - CRASH
  const crashBox = new FFRect({ color: COLORS.pureWhite, width: 350, height: 90, x: width/2, y: 520 });
  crashBox.addEffect('zoomIn', 0.2, 4);
  crashBox.addEffect('fadeOut', 0.4, 6);
  scene3.addChild(crashBox);

  const crashText = new FFText({ text: 'CRASH', x: width/2, y: 520, fontSize: 70 });
  crashText.setColor(COLORS.pureBlack);
  crashText.alignCenter();
  crashText.addEffect('bounceIn', 0.3, 4.1);
  crashText.addEffect('fadeOut', 0.4, 6);
  scene3.addChild(crashText);

  // Secrets text appearing in shadow
  const secretsText = new FFText({ text: 'secrets', x: width/2 - 50, y: height/2 + 200, fontSize: 36 });
  secretsText.setColor(COLORS.oceanLight);
  secretsText.alignCenter();
  secretsText.addEffect('fadeIn', 0.8, 5);
  secretsText.addEffect('fadeOut', 0.6, 7.5);
  scene3.addChild(secretsText);

  // Double exposure blend
  const doubleExp = new FFRect({ color: 'rgba(26, 42, 58, 0.4)', width: 350, height: 600, x: width/2 - 50, y: height/2 + 100 });
  doubleExp.addEffect('fadeIn', 0.5, 6);
  doubleExp.addEffect('fadeOut', 0.5, 8.5);
  scene3.addChild(doubleExp);

  scene3.setTransition('dreamy', 0.8);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Poem Part 2 - "Waves crash within me" (10s)'));

  // ============================================
  // SCENE 4: POEM PART 3 - "Tides of emotion" (10s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.pureBlack);
  scene4.setDuration(10);

  // Background
  const poem3Bg = new FFRect({ color: COLORS.darkGray, width: 1100, height: 2000, x: width/2, y: height/2 });
  poem3Bg.addEffect('fadeIn', 0.3, 0);
  scene4.addChild(poem3Bg);

  // Gradient overlay (top to bottom)
  const gradTop = new FFRect({ color: COLORS.pureBlack, width: 1100, height: 600, x: width/2, y: 300 });
  gradTop.addEffect('fadeIn', 0.4, 0.2);
  scene4.addChild(gradTop);

  const gradBottom = new FFRect({ color: COLORS.deepOcean, width: 1100, height: 600, x: width/2, y: height - 300 });
  gradBottom.addEffect('fadeIn', 0.4, 0.2);
  scene4.addChild(gradBottom);

  // Silhouette
  addSilhouette(scene4, width/2 + 30, height/2 + 120, 1.35, 0.3);

  // Tidal wave effect - rising and falling
  for (let tide = 0; tide < 4; tide++) {
    const tideDelay = 1 + (tide * 1.5);
    const tideY = height/2 + 300 - (tide * 80);
    
    const tideWave = new FFRect({ 
      color: tide % 2 === 0 ? COLORS.oceanMid : COLORS.seafoam, 
      width: 320, 
      height: 40, 
      x: width/2 + 30, 
      y: tideY 
    });
    tideWave.addEffect('fadeIn', 0.4, tideDelay);
    tideWave.addEffect('fadeOut', 0.6, tideDelay + 1.2);
    scene4.addChild(tideWave);
  }

  // Poetry lines - Part 3
  addPoetryLine(scene4, '"Tides of emotion"', 280, 50, 0.5, 4);
  addPoetryLine(scene4, 'Rise and fall', 380, 44, 2, 3.5);

  // Emotion emphasis
  const emotionText = new FFText({ text: 'EMOTION', x: width/2, y: 500, fontSize: 65 });
  emotionText.setColor(COLORS.silver);
  emotionText.alignCenter();
  emotionText.addEffect('fadeIn', 0.8, 3.5);
  emotionText.addEffect('fadeOut', 0.6, 6);
  scene4.addChild(emotionText);

  // Rise/Fall visual
  const riseText = new FFText({ text: '↑ RISE', x: 300, y: 650, fontSize: 36 });
  riseText.setColor(COLORS.offWhite);
  riseText.alignCenter();
  riseText.addEffect('fadeInUp', 0.5, 5);
  riseText.addEffect('fadeOut', 0.4, 7);
  scene4.addChild(riseText);

  const fallText = new FFText({ text: 'FALL ↓', x: 780, y: 650, fontSize: 36 });
  fallText.setColor(COLORS.lightGray);
  fallText.alignCenter();
  fallText.addEffect('fadeInDown', 0.5, 5.5);
  fallText.addEffect('fadeOut', 0.4, 7.5);
  scene4.addChild(fallText);

  // Slow motion overlay pulse
  const slowPulse = new FFRect({ color: 'rgba(255,255,255,0.08)', width: 1100, height: 2000, x: width/2, y: height/2 });
  slowPulse.addEffect('fadeIn', 1, 6);
  slowPulse.addEffect('fadeOut', 1, 8);
  scene4.addChild(slowPulse);

  scene4.setTransition('fade', 0.8);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Poem Part 3 - "Tides of emotion" (10s)'));

  // ============================================
  // SCENE 5: FINALE - "In the silence" & CTA (7s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.pureBlack);
  scene5.setDuration(7);

  // Deep black background
  const finalBg = new FFRect({ color: COLORS.deepBlack, width: 1100, height: 2000, x: width/2, y: height/2 });
  finalBg.addEffect('fadeIn', 0.3, 0);
  scene5.addChild(finalBg);

  // Final silhouette - centered, prominent
  addSilhouette(scene5, width/2, height/2 + 50, 1.5, 0.2);

  // Final poem lines
  addPoetryLine(scene5, '"In the silence"', 250, 48, 0.3, 3);
  addPoetryLine(scene5, 'I hear it all', 340, 52, 1, 2.5);

  // Final emphasis - ALL
  const allBox = new FFRect({ color: COLORS.pureWhite, width: 200, height: 80, x: width/2, y: 450 });
  allBox.addEffect('zoomIn', 0.4, 2);
  scene5.addChild(allBox);

  const allText = new FFText({ text: 'ALL', x: width/2, y: 450, fontSize: 60 });
  allText.setColor(COLORS.pureBlack);
  allText.alignCenter();
  allText.addEffect('fadeIn', 0.3, 2.2);
  scene5.addChild(allText);

  // Ocean wave icon
  const waveIcon = new FFText({ text: '🌊', x: width/2, y: height/2 + 350, fontSize: 60 });
  waveIcon.alignCenter();
  waveIcon.addEffect('fadeIn', 0.5, 2.5);
  scene5.addChild(waveIcon);

  // Series title
  const seriesBox = new FFRect({ color: 'rgba(255,255,255,0.1)', width: 600, height: 100, x: width/2, y: 1350 });
  seriesBox.addEffect('fadeIn', 0.4, 3);
  scene5.addChild(seriesBox);

  const seriesText = new FFText({ text: 'DOUBLE EXPOSURE POET', x: width/2, y: 1350, fontSize: 36 });
  seriesText.setColor(COLORS.offWhite);
  seriesText.alignCenter();
  seriesText.addEffect('fadeIn', 0.3, 3.2);
  scene5.addChild(seriesText);

  // Hashtags
  const hashText = new FFText({ text: '#VisualPoetry #DoubleExposure #Art', x: width/2, y: 1450, fontSize: 24 });
  hashText.setColor(COLORS.lightGray);
  hashText.alignCenter();
  hashText.addEffect('fadeIn', 0.4, 3.5);
  scene5.addChild(hashText);

  // CTA
  const ctaText = new FFText({ text: '👆 Follow for more visual poetry', x: width/2, y: 1550, fontSize: 28 });
  ctaText.setColor(COLORS.silver);
  ctaText.alignCenter();
  ctaText.addEffect('fadeIn', 0.4, 4);
  scene5.addChild(ctaText);

  // Engagement
  const engageText = new FFText({ text: '❤️  💬  🔄', x: width/2, y: 1650, fontSize: 36 });
  engageText.alignCenter();
  engageText.addEffect('fadeIn', 0.4, 4.5);
  scene5.addChild(engageText);

  // Story count
  const storyCount = new FFText({ text: 'STORY 14 OF 30', x: width/2, y: 1780, fontSize: 22 });
  storyCount.setColor(COLORS.midGray);
  storyCount.alignCenter();
  storyCount.addEffect('fadeIn', 0.4, 5);
  scene5.addChild(storyCount);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Finale - "In the silence" & CTA (7s)'));

  // ============================================
  // EVENT HANDLERS & RENDER
  // ============================================
  creator.on('start', () => {
    console.log(colors.yellow('\n⏳ Rendering started...'));
    console.log(colors.gray('   (Using CPU encoding - for GPU, configure FFmpeg with NVENC/AMF/QSV)'));
  });

  creator.on('error', e => {
    console.log(colors.red(`\n❌ Error: ${e.error}`));
  });

  creator.on('progress', e => {
    const percent = (e.percent * 100).toFixed(1);
    process.stdout.write(colors.cyan(`\r  📊 Progress: ${percent}%`));
  });

  creator.on('complete', e => {
    console.log(colors.green(`\n\n✅ Video created successfully!`));
    console.log(colors.white(`📁 Output: ${e.output}`));
    console.log(colors.white(`⏱️  Duration: ${e.useage || 'N/A'}`));
    console.log(colors.magenta('\n🎬 Story 14: "Double Exposure Poet" complete!\n'));
  });

  creator.start();
}

createDoubleExposurePoetVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

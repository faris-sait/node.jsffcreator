/**
 * 🎬 STORY 7: "Luma-Fade Dreamscape" - Poetic/Vibe
 * 
 * The Story: A visual poem about "Golden Hour."
 * 
 * Visual Style:
 * - Dreamy, overexposed, soft focus aesthetic
 * - Luma Key Transitions and Light Leaks
 * - Gaussian Blur pulses
 * - Minimalist serif text with high letter spacing
 * - No borders, just raw light
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~40 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-07-lumafade-dreamscape.js
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
// COLOR PALETTE - Golden Hour Dreamscape
// ============================================
const COLORS = {
  // Golden hour warmth
  goldenLight: '#ffd89b',
  sunsetOrange: '#f5a962',
  warmPeach: '#ffcba4',
  softApricot: '#ffdab9',
  
  // Overexposed whites
  pureLight: '#fffef5',
  creamGlow: '#fff8e7',
  softWhite: '#fefefe',
  
  // Dreamy accents
  blushPink: '#ffc4c4',
  lavenderMist: '#e6e6fa',
  paleGold: '#eee8aa',
  
  // Soft shadows
  warmShadow: '#d4a574',
  gentleAmber: '#deb887',
  
  // Text
  softBrown: '#8b7355',
  warmGray: '#a09080',
  lightText: '#f5f0e8'
};

// ============================================
// POEM LINES - Golden Hour
// ============================================
const POEM = {
  title: 'G O L D E N   H O U R',
  lines: [
    'T H E   S U N   D I P S   L O W',
    'P A I N T I N G   T H E   W O R L D',
    'I N   H O N E Y   A N D   L I G H T',
    'E V E R Y T H I N G   G L O W S',
    'S O F T L Y   F A D I N G',
    'I N T O   G O L D'
  ]
};

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createLumaFadeDreamscapeVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 7: "Luma-Fade Dreamscape"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~40 seconds (5 scenes)'));
  console.log(colors.yellow('🎨 Theme: Poetic/Vibe - Golden Hour Dreamscape\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-07-lumafade-dreamscape.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: TITLE - Golden Hour Awakening (8s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.creamGlow);
  scene1.setDuration(8);

  // Soft gradient background layers - simulating overexposure
  const bgLayer1 = new FFRect({ color: COLORS.pureLight, width: 1200, height: 2100, x: width/2, y: height/2 });
  bgLayer1.addEffect('fadeIn', 1, 0);
  scene1.addChild(bgLayer1);

  // Light leak effect - top right
  const lightLeak1 = new FFRect({ color: COLORS.goldenLight, width: 600, height: 800, x: width - 100, y: 200 });
  lightLeak1.addEffect('fadeIn', 1.5, 0.3);
  lightLeak1.addEffect('fadeOut', 1, 5);
  scene1.addChild(lightLeak1);

  // Light leak effect - bottom left
  const lightLeak2 = new FFRect({ color: COLORS.warmPeach, width: 500, height: 600, x: 100, y: height - 300 });
  lightLeak2.addEffect('fadeIn', 1.5, 0.5);
  lightLeak2.addEffect('fadeOut', 1, 5.5);
  scene1.addChild(lightLeak2);

  // Soft glow orbs - dreamy particles
  const orbs = [
    { x: 200, y: 400, size: 150, color: COLORS.goldenLight, delay: 0.5 },
    { x: width - 250, y: 600, size: 120, color: COLORS.softApricot, delay: 0.8 },
    { x: 350, y: 1200, size: 100, color: COLORS.blushPink, delay: 1 },
    { x: width - 180, y: 1400, size: 130, color: COLORS.paleGold, delay: 1.2 },
    { x: width/2, y: 300, size: 180, color: COLORS.warmPeach, delay: 0.3 }
  ];

  orbs.forEach(orb => {
    const glow = new FFRect({ color: orb.color, width: orb.size, height: orb.size, x: orb.x, y: orb.y });
    glow.addEffect('fadeIn', 2, orb.delay);
    glow.addEffect('fadeOut', 1.5, 5);
    scene1.addChild(glow);
  });

  // Main title - spaced serif style
  const titleText = new FFText({ text: 'G O L D E N', x: width/2, y: height/2 - 100, fontSize: 70 });
  titleText.setColor(COLORS.softBrown);
  titleText.alignCenter();
  titleText.addEffect('fadeIn', 2, 1.5);
  scene1.addChild(titleText);

  const titleText2 = new FFText({ text: 'H O U R', x: width/2, y: height/2 + 20, fontSize: 90 });
  titleText2.setColor(COLORS.warmShadow);
  titleText2.alignCenter();
  titleText2.addEffect('fadeIn', 2, 2);
  scene1.addChild(titleText2);

  // Subtle subtitle
  const subtitle = new FFText({ text: 'a   v i s u a l   p o e m', x: width/2, y: height/2 + 180, fontSize: 32 });
  subtitle.setColor(COLORS.warmGray);
  subtitle.alignCenter();
  subtitle.addEffect('fadeIn', 1.5, 3);
  scene1.addChild(subtitle);

  // Soft horizontal line
  const softLine = new FFRect({ color: COLORS.paleGold, width: 300, height: 2, x: width/2, y: height/2 + 250 });
  softLine.addEffect('fadeIn', 1, 3.5);
  scene1.addChild(softLine);

  // Dreamy time indicator
  const timeText = new FFText({ text: '6 : 4 7   p m', x: width/2, y: height - 400, fontSize: 36 });
  timeText.setColor(COLORS.warmGray);
  timeText.alignCenter();
  timeText.addEffect('fadeIn', 1.5, 4);
  scene1.addChild(timeText);

  scene1.setTransition('fade', 1.2);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Title - Golden Hour Awakening (8s)'));

  // ============================================
  // SCENE 2: VERSE 1 - The Sun Dips Low (8s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.softApricot);
  scene2.setDuration(8);

  // Warm gradient base
  const warmBase = new FFRect({ color: COLORS.warmPeach, width: 1200, height: 2100, x: width/2, y: height/2 });
  warmBase.addEffect('fadeIn', 0.8, 0);
  scene2.addChild(warmBase);

  // Overexposed light from top
  const topLight = new FFRect({ color: COLORS.pureLight, width: 1100, height: 600, x: width/2, y: 200 });
  topLight.addEffect('fadeIn', 1.5, 0.2);
  scene2.addChild(topLight);

  // Light leak - diagonal
  const diagonalLeak = new FFRect({ color: COLORS.goldenLight, width: 400, height: 1200, x: width - 150, y: height/2 });
  diagonalLeak.addEffect('fadeIn', 2, 0.5);
  diagonalLeak.addEffect('fadeOut', 1.5, 5);
  scene2.addChild(diagonalLeak);

  // Floating light particles
  for (let i = 0; i < 8; i++) {
    const particle = new FFRect({ 
      color: i % 2 === 0 ? COLORS.pureLight : COLORS.paleGold, 
      width: 30 + Math.random() * 50, 
      height: 30 + Math.random() * 50, 
      x: 150 + Math.random() * (width - 300), 
      y: 300 + Math.random() * (height - 600) 
    });
    particle.addEffect('fadeIn', 1.5, 0.5 + (i * 0.2));
    particle.addEffect('fadeOut', 1, 5.5);
    scene2.addChild(particle);
  }

  // Poem line 1
  const line1 = new FFText({ text: 'T H E   S U N', x: width/2, y: height/2 - 150, fontSize: 55 });
  line1.setColor(COLORS.softBrown);
  line1.alignCenter();
  line1.addEffect('fadeIn', 1.5, 1);
  scene2.addChild(line1);

  const line2 = new FFText({ text: 'D I P S   L O W', x: width/2, y: height/2 - 50, fontSize: 60 });
  line2.setColor(COLORS.warmShadow);
  line2.alignCenter();
  line2.addEffect('fadeIn', 1.5, 1.8);
  scene2.addChild(line2);

  // Soft accent line
  const accentLine = new FFRect({ color: COLORS.goldenLight, width: 200, height: 3, x: width/2, y: height/2 + 50 });
  accentLine.addEffect('fadeIn', 1, 2.5);
  scene2.addChild(accentLine);

  // Second verse part
  const line3 = new FFText({ text: 'P A I N T I N G', x: width/2, y: height/2 + 150, fontSize: 50 });
  line3.setColor(COLORS.softBrown);
  line3.alignCenter();
  line3.addEffect('fadeIn', 1.5, 3);
  scene2.addChild(line3);

  const line4 = new FFText({ text: 'T H E   W O R L D', x: width/2, y: height/2 + 250, fontSize: 55 });
  line4.setColor(COLORS.warmShadow);
  line4.alignCenter();
  line4.addEffect('fadeIn', 1.5, 3.8);
  scene2.addChild(line4);

  // Bottom glow
  const bottomGlow = new FFRect({ color: COLORS.sunsetOrange, width: 800, height: 300, x: width/2, y: height - 200 });
  bottomGlow.addEffect('fadeIn', 2, 1);
  bottomGlow.addEffect('fadeOut', 1.5, 5.5);
  scene2.addChild(bottomGlow);

  scene2.setTransition('fade', 1.2);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Verse 1 - The Sun Dips Low (8s)'));

  // ============================================
  // SCENE 3: VERSE 2 - Honey and Light (8s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.goldenLight);
  scene3.setDuration(8);

  // Deep golden base
  const goldenBase = new FFRect({ color: COLORS.goldenLight, width: 1200, height: 2100, x: width/2, y: height/2 });
  goldenBase.addEffect('fadeIn', 0.5, 0);
  scene3.addChild(goldenBase);

  // Bright center glow - overexposed
  const centerGlow = new FFRect({ color: COLORS.pureLight, width: 700, height: 700, x: width/2, y: height/2 });
  centerGlow.addEffect('fadeIn', 2, 0.3);
  centerGlow.addEffect('fadeOut', 1.5, 5);
  scene3.addChild(centerGlow);

  // Light leaks from edges
  const edgeLeak1 = new FFRect({ color: COLORS.creamGlow, width: 300, height: 1000, x: 50, y: height/2 - 200 });
  edgeLeak1.addEffect('fadeIn', 1.5, 0.5);
  scene3.addChild(edgeLeak1);

  const edgeLeak2 = new FFRect({ color: COLORS.creamGlow, width: 300, height: 1000, x: width - 50, y: height/2 + 200 });
  edgeLeak2.addEffect('fadeIn', 1.5, 0.7);
  scene3.addChild(edgeLeak2);

  // Dreamy orbs pulsing
  const pulseOrbs = [
    { x: 250, y: 500, size: 100 },
    { x: width - 250, y: 700, size: 120 },
    { x: 300, y: 1300, size: 90 },
    { x: width - 300, y: 1500, size: 110 }
  ];

  pulseOrbs.forEach((orb, i) => {
    const glow = new FFRect({ color: COLORS.warmPeach, width: orb.size, height: orb.size, x: orb.x, y: orb.y });
    glow.addEffect('fadeIn', 1.5, 0.3 + (i * 0.3));
    glow.addEffect('fadeOut', 1, 5.5);
    scene3.addChild(glow);
  });

  // Main poem text
  const honey1 = new FFText({ text: 'I N', x: width/2, y: height/2 - 180, fontSize: 50 });
  honey1.setColor(COLORS.softBrown);
  honey1.alignCenter();
  honey1.addEffect('fadeIn', 1.5, 1);
  scene3.addChild(honey1);

  const honey2 = new FFText({ text: 'H O N E Y', x: width/2, y: height/2 - 80, fontSize: 80 });
  honey2.setColor(COLORS.warmShadow);
  honey2.alignCenter();
  honey2.addEffect('fadeIn', 1.5, 1.5);
  scene3.addChild(honey2);

  // Soft divider
  const divider = new FFRect({ color: COLORS.softBrown, width: 150, height: 2, x: width/2, y: height/2 + 20 });
  divider.addEffect('fadeIn', 1, 2.2);
  scene3.addChild(divider);

  const honey3 = new FFText({ text: 'A N D', x: width/2, y: height/2 + 80, fontSize: 45 });
  honey3.setColor(COLORS.warmGray);
  honey3.alignCenter();
  honey3.addEffect('fadeIn', 1.5, 2.5);
  scene3.addChild(honey3);

  const honey4 = new FFText({ text: 'L I G H T', x: width/2, y: height/2 + 180, fontSize: 85 });
  honey4.setColor(COLORS.softBrown);
  honey4.alignCenter();
  honey4.addEffect('fadeIn', 1.5, 3);
  scene3.addChild(honey4);

  // Subtle sparkle effect
  const sparkles = ['·', '·', '·', '·', '·'];
  sparkles.forEach((s, i) => {
    const sparkle = new FFText({ text: s, x: 350 + (i * 100), y: height/2 + 300, fontSize: 40 });
    sparkle.setColor(COLORS.paleGold);
    sparkle.addEffect('fadeIn', 0.5, 4 + (i * 0.15));
    scene3.addChild(sparkle);
  });

  scene3.setTransition('fade', 1.2);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Verse 2 - Honey and Light (8s)'));

  // ============================================
  // SCENE 4: VERSE 3 - Everything Glows (8s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.sunsetOrange);
  scene4.setDuration(8);

  // Warm sunset base
  const sunsetBase = new FFRect({ color: COLORS.sunsetOrange, width: 1200, height: 2100, x: width/2, y: height/2 });
  sunsetBase.addEffect('fadeIn', 0.5, 0);
  scene4.addChild(sunsetBase);

  // Overexposed top
  const overexposedTop = new FFRect({ color: COLORS.pureLight, width: 1100, height: 500, x: width/2, y: 150 });
  overexposedTop.addEffect('fadeIn', 1.5, 0.2);
  scene4.addChild(overexposedTop);

  // Gradient fade to warm
  const gradientMid = new FFRect({ color: COLORS.warmPeach, width: 1100, height: 400, x: width/2, y: 500 });
  gradientMid.addEffect('fadeIn', 1, 0.4);
  scene4.addChild(gradientMid);

  // Light leak burst - center
  const burstCenter = new FFRect({ color: COLORS.goldenLight, width: 500, height: 500, x: width/2, y: height/2 });
  burstCenter.addEffect('fadeIn', 2, 0.5);
  burstCenter.addEffect('fadeOut', 2, 4);
  scene4.addChild(burstCenter);

  // Floating light motes
  for (let i = 0; i < 12; i++) {
    const mote = new FFRect({ 
      color: i % 3 === 0 ? COLORS.pureLight : (i % 3 === 1 ? COLORS.paleGold : COLORS.creamGlow), 
      width: 20 + Math.random() * 40, 
      height: 20 + Math.random() * 40, 
      x: 100 + Math.random() * (width - 200), 
      y: 200 + Math.random() * (height - 400) 
    });
    mote.addEffect('fadeIn', 1, 0.2 + (i * 0.15));
    mote.addEffect('fadeOut', 1, 5.5);
    scene4.addChild(mote);
  }

  // Main poem text
  const glow1 = new FFText({ text: 'E V E R Y T H I N G', x: width/2, y: height/2 - 100, fontSize: 55 });
  glow1.setColor(COLORS.lightText);
  glow1.alignCenter();
  glow1.addEffect('fadeIn', 1.5, 1);
  scene4.addChild(glow1);

  const glow2 = new FFText({ text: 'G L O W S', x: width/2, y: height/2 + 30, fontSize: 100 });
  glow2.setColor(COLORS.pureLight);
  glow2.alignCenter();
  glow2.addEffect('fadeIn', 2, 1.8);
  scene4.addChild(glow2);

  // Soft line
  const softLine4 = new FFRect({ color: COLORS.lightText, width: 250, height: 2, x: width/2, y: height/2 + 150 });
  softLine4.addEffect('fadeIn', 1, 3);
  scene4.addChild(softLine4);

  // Continuation
  const glow3 = new FFText({ text: 'S O F T L Y', x: width/2, y: height/2 + 250, fontSize: 60 });
  glow3.setColor(COLORS.lightText);
  glow3.alignCenter();
  glow3.addEffect('fadeIn', 1.5, 3.5);
  scene4.addChild(glow3);

  const glow4 = new FFText({ text: 'F A D I N G', x: width/2, y: height/2 + 360, fontSize: 65 });
  glow4.setColor(COLORS.creamGlow);
  glow4.alignCenter();
  glow4.addEffect('fadeIn', 1.5, 4.2);
  scene4.addChild(glow4);

  // Bottom warm glow
  const bottomWarm = new FFRect({ color: COLORS.blushPink, width: 900, height: 400, x: width/2, y: height - 250 });
  bottomWarm.addEffect('fadeIn', 1.5, 1);
  bottomWarm.addEffect('fadeOut', 1.5, 5.5);
  scene4.addChild(bottomWarm);

  scene4.setTransition('fade', 1.2);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Verse 3 - Everything Glows (8s)'));

  // ============================================
  // SCENE 5: FINALE - Into Gold + CTA (8s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.warmPeach);
  scene5.setDuration(8);

  // Dreamy warm base
  const finalBase = new FFRect({ color: COLORS.warmPeach, width: 1200, height: 2100, x: width/2, y: height/2 });
  finalBase.addEffect('fadeIn', 0.5, 0);
  scene5.addChild(finalBase);

  // Central overexposed glow
  const finalGlow = new FFRect({ color: COLORS.pureLight, width: 800, height: 800, x: width/2, y: height/2 - 200 });
  finalGlow.addEffect('fadeIn', 2, 0.3);
  scene5.addChild(finalGlow);

  // Light leaks - final burst
  const finalLeak1 = new FFRect({ color: COLORS.goldenLight, width: 400, height: 600, x: 150, y: 400 });
  finalLeak1.addEffect('fadeIn', 1.5, 0.5);
  scene5.addChild(finalLeak1);

  const finalLeak2 = new FFRect({ color: COLORS.paleGold, width: 350, height: 500, x: width - 150, y: 600 });
  finalLeak2.addEffect('fadeIn', 1.5, 0.7);
  scene5.addChild(finalLeak2);

  // Floating particles - final dreamscape
  for (let i = 0; i < 10; i++) {
    const finalParticle = new FFRect({ 
      color: i % 2 === 0 ? COLORS.creamGlow : COLORS.paleGold, 
      width: 25 + Math.random() * 45, 
      height: 25 + Math.random() * 45, 
      x: 150 + Math.random() * (width - 300), 
      y: 250 + Math.random() * 800 
    });
    finalParticle.addEffect('fadeIn', 1.5, 0.3 + (i * 0.1));
    scene5.addChild(finalParticle);
  }

  // Final poem line
  const final1 = new FFText({ text: 'I N T O', x: width/2, y: height/2 - 250, fontSize: 55 });
  final1.setColor(COLORS.softBrown);
  final1.alignCenter();
  final1.addEffect('fadeIn', 1.5, 0.8);
  scene5.addChild(final1);

  const final2 = new FFText({ text: 'G O L D', x: width/2, y: height/2 - 120, fontSize: 120 });
  final2.setColor(COLORS.warmShadow);
  final2.alignCenter();
  final2.addEffect('fadeIn', 2, 1.3);
  scene5.addChild(final2);

  // Soft divider
  const finalDivider = new FFRect({ color: COLORS.paleGold, width: 300, height: 3, x: width/2, y: height/2 + 20 });
  finalDivider.addEffect('fadeIn', 1, 2.2);
  scene5.addChild(finalDivider);

  // Series attribution
  const seriesText = new FFText({ text: 'L U M A - F A D E', x: width/2, y: height/2 + 120, fontSize: 40 });
  seriesText.setColor(COLORS.warmGray);
  seriesText.alignCenter();
  seriesText.addEffect('fadeIn', 1.5, 2.8);
  scene5.addChild(seriesText);

  const seriesText2 = new FFText({ text: 'D R E A M S C A P E', x: width/2, y: height/2 + 190, fontSize: 36 });
  seriesText2.setColor(COLORS.warmGray);
  seriesText2.alignCenter();
  seriesText2.addEffect('fadeIn', 1.5, 3.2);
  scene5.addChild(seriesText2);

  // Minimal CTA - keeping the dreamy vibe
  const ctaText = new FFText({ text: 'f o l l o w   f o r   m o r e', x: width/2, y: height/2 + 350, fontSize: 32 });
  ctaText.setColor(COLORS.softBrown);
  ctaText.alignCenter();
  ctaText.addEffect('fadeIn', 1.5, 4);
  scene5.addChild(ctaText);

  const ctaText2 = new FFText({ text: 'v i s u a l   p o e t r y', x: width/2, y: height/2 + 420, fontSize: 28 });
  ctaText2.setColor(COLORS.warmGray);
  ctaText2.alignCenter();
  ctaText2.addEffect('fadeIn', 1.5, 4.5);
  scene5.addChild(ctaText2);

  // Soft dots
  const dots = ['·', '·', '·'];
  dots.forEach((d, i) => {
    const dot = new FFText({ text: d, x: 480 + (i * 60), y: height/2 + 500, fontSize: 30 });
    dot.setColor(COLORS.paleGold);
    dot.addEffect('fadeIn', 0.5, 5 + (i * 0.2));
    scene5.addChild(dot);
  });

  // Story count - minimal
  const storyNum = new FFText({ text: 's t o r y   7   o f   3 0', x: width/2, y: height - 350, fontSize: 24 });
  storyNum.setColor(COLORS.warmGray);
  storyNum.alignCenter();
  storyNum.addEffect('fadeIn', 1, 5.5);
  scene5.addChild(storyNum);

  // Hashtag - subtle
  const hashtag = new FFText({ text: '#goldenhour  #dreamscape  #visualpoetry', x: width/2, y: height - 280, fontSize: 22 });
  hashtag.setColor(COLORS.warmGray);
  hashtag.alignCenter();
  hashtag.addEffect('fadeIn', 1, 6);
  scene5.addChild(hashtag);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Finale - Into Gold + CTA (8s)'));

  // ============================================
  // EVENT HANDLERS & START
  // ============================================
  creator.on('start', () => {
    console.log(colors.yellow('\n⏳ Video rendering started...'));
  });

  creator.on('error', e => {
    console.log(colors.red(`\n❌ Error: ${e.error}`));
  });

  creator.on('progress', e => {
    const percent = (e.percent * 100).toFixed(1);
    process.stdout.write(colors.cyan(`\r📊 Progress: ${percent}%`));
  });

  creator.on('complete', e => {
    console.log(colors.green(`\n\n✅ Video created successfully!`));
    console.log(colors.white(`📁 Output: ${e.output}`));
    console.log(colors.magenta('\n🎬 "Luma-Fade Dreamscape: Golden Hour" complete!\n'));
  });

  creator.start();
}

// Run the video creation
createLumaFadeDreamscapeVideo().catch(err => {
  console.error(colors.red('Error creating video:'), err);
});

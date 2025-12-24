/**
 * 🎬 STORY 15: "Morphing Evolution" - Concept Change
 * 
 * The Story: The evolution of a car from a 1920s Model T to a futuristic flying concept.
 * 
 * Visual Style:
 * - Studio lighting, rotating platform feel
 * - Morph Cut, Feature Alignment, and Seamless Looping
 * - "Timeline Slider" at the bottom that moves as the car morphs
 * - Clean, professional automotive showcase aesthetic
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~55 seconds
 * 
 * Run with: node examples/story-videos/story-15-morphing-evolution.js
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
// COLOR PALETTE - Studio/Automotive Theme
// ============================================
const COLORS = {
  // Studio background
  studioBlack: '#0a0a0a',
  studioDark: '#1a1a1a',
  studioGray: '#2d2d2d',
  platformGray: '#3a3a3a',
  
  // Accent colors
  chromeSilver: '#c0c0c0',
  metallicBlue: '#4a90d9',
  electricBlue: '#00d4ff',
  neonCyan: '#00ffff',
  futureGold: '#ffd700',
  
  // Era colors
  vintageSepia: '#8b7355',
  classicRed: '#b22222',
  modernWhite: '#f5f5f5',
  futureNeon: '#7b68ee',
  
  // Timeline colors
  timelineTrack: '#333333',
  timelineActive: '#00d4ff',
  timelineDot: '#ffffff',
  
  // Text
  white: '#ffffff',
  dimWhite: '#a0a0a0',
  darkText: '#1a1a1a'
};

// Car eras for the evolution
const CAR_ERAS = [
  { year: '1920', name: 'MODEL T', style: 'VINTAGE', color: COLORS.vintageSepia },
  { year: '1950', name: 'CLASSIC', style: 'CHROME AGE', color: COLORS.classicRed },
  { year: '1980', name: 'SPORTS', style: 'AERODYNAMIC', color: COLORS.metallicBlue },
  { year: '2020', name: 'ELECTRIC', style: 'SUSTAINABLE', color: COLORS.modernWhite },
  { year: '2050', name: 'FLYING', style: 'AUTONOMOUS', color: COLORS.futureNeon }
];

// ============================================
// HELPER: Add Timeline Slider
// ============================================
function addTimelineSlider(scene, currentEraIndex, delay = 0) {
  const timelineY = height - 200;
  const timelineWidth = 800;
  const startX = (width - timelineWidth) / 2;
  
  // Timeline track background
  const trackBg = new FFRect({ color: COLORS.timelineTrack, width: timelineWidth, height: 8, x: width/2, y: timelineY });
  trackBg.addEffect('fadeIn', 0.3, delay);
  scene.addChild(trackBg);
  
  // Active portion of timeline
  const activeWidth = (currentEraIndex / (CAR_ERAS.length - 1)) * timelineWidth;
  if (activeWidth > 0) {
    const activeTrack = new FFRect({ color: COLORS.timelineActive, width: activeWidth, height: 8, x: startX + activeWidth/2, y: timelineY });
    activeTrack.addEffect('fadeIn', 0.4, delay + 0.1);
    scene.addChild(activeTrack);
  }
  
  // Era dots and labels
  CAR_ERAS.forEach((era, i) => {
    const dotX = startX + (i / (CAR_ERAS.length - 1)) * timelineWidth;
    const isActive = i <= currentEraIndex;
    const isCurrent = i === currentEraIndex;
    
    // Dot
    const dotSize = isCurrent ? 24 : 16;
    const dotColor = isActive ? COLORS.timelineActive : COLORS.timelineTrack;
    const dot = new FFRect({ color: dotColor, width: dotSize, height: dotSize, x: dotX, y: timelineY });
    dot.addEffect(isCurrent ? 'bounceIn' : 'fadeIn', 0.3, delay + 0.2 + (i * 0.1));
    scene.addChild(dot);
    
    // Year label
    const yearText = new FFText({ text: era.year, x: dotX, y: timelineY + 40, fontSize: isCurrent ? 28 : 22 });
    yearText.setColor(isActive ? COLORS.white : COLORS.dimWhite);
    yearText.alignCenter();
    yearText.addEffect('fadeIn', 0.2, delay + 0.3 + (i * 0.1));
    scene.addChild(yearText);
  });
  
  // Current era indicator arrow
  const currentX = startX + (currentEraIndex / (CAR_ERAS.length - 1)) * timelineWidth;
  const arrow = new FFText({ text: '▼', x: currentX, y: timelineY - 30, fontSize: 24 });
  arrow.setColor(COLORS.timelineActive);
  arrow.alignCenter();
  arrow.addEffect('bounceIn', 0.4, delay + 0.5);
  scene.addChild(arrow);
}

// ============================================
// HELPER: Add Studio Platform
// ============================================
function addStudioPlatform(scene, delay = 0) {
  // Platform base
  const platform = new FFRect({ color: COLORS.platformGray, width: 700, height: 40, x: width/2, y: height/2 + 250 });
  platform.addEffect('fadeIn', 0.3, delay);
  scene.addChild(platform);
  
  // Platform reflection line
  const reflection = new FFRect({ color: COLORS.chromeSilver, width: 650, height: 4, x: width/2, y: height/2 + 230 });
  reflection.addEffect('fadeIn', 0.2, delay + 0.1);
  scene.addChild(reflection);
  
  // Studio lights (top)
  for (let i = 0; i < 3; i++) {
    const lightX = 300 + (i * 240);
    const light = new FFRect({ color: 'rgba(255,255,255,0.1)', width: 100, height: 400, x: lightX, y: 300 });
    light.addEffect('fadeIn', 0.4, delay + 0.2 + (i * 0.1));
    scene.addChild(light);
  }
}

// ============================================
// HELPER: Add Morph Transition Effect
// ============================================
function addMorphEffect(scene, delay = 0) {
  // Horizontal scan lines for morph effect
  for (let i = 0; i < 8; i++) {
    const lineY = 400 + (i * 120);
    const scanLine = new FFRect({ color: COLORS.electricBlue, width: 1080, height: 3, x: width/2, y: lineY });
    scanLine.addEffect('fadeIn', 0.1, delay + (i * 0.05));
    scanLine.addEffect('fadeOut', 0.15, delay + 0.2 + (i * 0.05));
    scene.addChild(scanLine);
  }
  
  // Particle burst
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 150;
    const px = width/2 + Math.cos(angle) * radius;
    const py = height/2 + Math.sin(angle) * radius;
    const particle = new FFRect({ color: COLORS.neonCyan, width: 8, height: 8, x: px, y: py });
    particle.addEffect('zoomIn', 0.2, delay + 0.1);
    particle.addEffect('fadeOut', 0.3, delay + 0.3);
    scene.addChild(particle);
  }
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createMorphingEvolutionVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 15: "Morphing Evolution"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~55 seconds'));
  console.log(colors.yellow('🎨 Theme: Concept Change - Car Evolution\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-15-morphing-evolution.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: INTRO - Studio Setup (5s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.studioBlack);
  scene1.setDuration(5);

  // Studio background gradient
  const studioBg = new FFRect({ color: COLORS.studioDark, width: 1100, height: 2000, x: width/2, y: height/2 });
  studioBg.addEffect('fadeIn', 0.5, 0);
  scene1.addChild(studioBg);

  // Studio lights
  addStudioPlatform(scene1, 0.3);

  // Title reveal
  const titleBox = new FFRect({ color: COLORS.electricBlue, width: 800, height: 120, x: width/2, y: 350 });
  titleBox.addEffect('zoomIn', 0.5, 0.5);
  scene1.addChild(titleBox);

  const titleText = new FFText({ text: 'MORPHING', x: width/2, y: 320, fontSize: 70 });
  titleText.setColor(COLORS.white);
  titleText.alignCenter();
  titleText.addEffect('bounceIn', 0.6, 0.7);
  scene1.addChild(titleText);

  const titleText2 = new FFText({ text: 'EVOLUTION', x: width/2, y: 400, fontSize: 60 });
  titleText2.setColor(COLORS.darkText);
  titleText2.alignCenter();
  titleText2.addEffect('bounceIn', 0.6, 0.9);
  scene1.addChild(titleText2);

  // Subtitle
  const subtitle = new FFText({ text: '100 YEARS OF AUTOMOTIVE DESIGN', x: width/2, y: 520, fontSize: 32 });
  subtitle.setColor(COLORS.dimWhite);
  subtitle.alignCenter();
  subtitle.addEffect('fadeIn', 0.5, 1.3);
  scene1.addChild(subtitle);

  // Car icon placeholder
  const carIcon = new FFText({ text: '🚗', x: width/2, y: height/2, fontSize: 150 });
  carIcon.alignCenter();
  carIcon.addEffect('zoomIn', 0.6, 1.5);
  scene1.addChild(carIcon);

  // Era preview text
  const eraPreview = new FFText({ text: '1920 → 2050', x: width/2, y: height/2 + 150, fontSize: 48 });
  eraPreview.setColor(COLORS.futureGold);
  eraPreview.alignCenter();
  eraPreview.addEffect('fadeInUp', 0.5, 2);
  scene1.addChild(eraPreview);

  // Initial timeline (empty)
  addTimelineSlider(scene1, -1, 2.5);

  scene1.setTransition('directionalwarp', 0.6);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Intro - Studio Setup (5s)'));


  // ============================================
  // SCENE 2: ERA 1 - 1920s Model T (8s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.studioBlack);
  scene2.setDuration(8);

  // Studio background
  const bg2 = new FFRect({ color: COLORS.studioDark, width: 1100, height: 2000, x: width/2, y: height/2 });
  bg2.addEffect('fadeIn', 0.3, 0);
  scene2.addChild(bg2);

  addStudioPlatform(scene2, 0.2);

  // Era badge
  const eraBadge1 = new FFRect({ color: COLORS.vintageSepia, width: 300, height: 80, x: width/2, y: 200 });
  eraBadge1.addEffect('bounceIn', 0.4, 0.3);
  scene2.addChild(eraBadge1);

  const eraYear1 = new FFText({ text: '1920', x: width/2, y: 200, fontSize: 50 });
  eraYear1.setColor(COLORS.white);
  eraYear1.alignCenter();
  eraYear1.addEffect('fadeIn', 0.3, 0.5);
  scene2.addChild(eraYear1);

  // Car name
  const carName1 = new FFText({ text: 'MODEL T', x: width/2, y: 320, fontSize: 80 });
  carName1.setColor(COLORS.vintageSepia);
  carName1.alignCenter();
  carName1.addEffect('backInDown', 0.6, 0.6);
  scene2.addChild(carName1);

  const carStyle1 = new FFText({ text: 'THE VINTAGE ERA', x: width/2, y: 410, fontSize: 36 });
  carStyle1.setColor(COLORS.dimWhite);
  carStyle1.alignCenter();
  carStyle1.addEffect('fadeIn', 0.4, 1);
  scene2.addChild(carStyle1);

  // Vintage car representation
  const vintageCar = new FFRect({ color: COLORS.vintageSepia, width: 400, height: 200, x: width/2, y: height/2 });
  vintageCar.addEffect('zoomIn', 0.5, 1.2);
  scene2.addChild(vintageCar);

  // Car details - wheels
  const wheel1a = new FFRect({ color: '#1a1a1a', width: 80, height: 80, x: width/2 - 120, y: height/2 + 80 });
  wheel1a.addEffect('rotateIn', 0.4, 1.4);
  scene2.addChild(wheel1a);

  const wheel1b = new FFRect({ color: '#1a1a1a', width: 80, height: 80, x: width/2 + 120, y: height/2 + 80 });
  wheel1b.addEffect('rotateIn', 0.4, 1.5);
  scene2.addChild(wheel1b);

  // Car icon
  const carEmoji1 = new FFText({ text: '🚙', x: width/2, y: height/2, fontSize: 120 });
  carEmoji1.alignCenter();
  carEmoji1.addEffect('bounceIn', 0.5, 1.6);
  scene2.addChild(carEmoji1);

  // Features list
  const features1 = [
    { text: '• Hand-Cranked Engine', delay: 2.5 },
    { text: '• 20 HP Power', delay: 2.8 },
    { text: '• 45 MPH Top Speed', delay: 3.1 },
    { text: '• Mass Production Pioneer', delay: 3.4 }
  ];

  features1.forEach((feat, i) => {
    const featText = new FFText({ text: feat.text, x: width/2, y: 1050 + (i * 60), fontSize: 28 });
    featText.setColor(COLORS.chromeSilver);
    featText.alignCenter();
    featText.addEffect('fadeInLeft', 0.3, feat.delay);
    scene2.addChild(featText);
  });

  // Timeline
  addTimelineSlider(scene2, 0, 4);

  // Morph hint
  const morphHint = new FFText({ text: 'MORPHING...', x: width/2, y: 1400, fontSize: 32 });
  morphHint.setColor(COLORS.electricBlue);
  morphHint.alignCenter();
  morphHint.addEffect('fadeIn', 0.3, 6);
  morphHint.addEffect('fadeOut', 0.3, 7);
  scene2.addChild(morphHint);

  addMorphEffect(scene2, 6.5);

  scene2.setTransition('crosswarp', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Era 1 - 1920s Model T (8s)'));

  // ============================================
  // SCENE 3: ERA 2 - 1950s Classic (8s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.studioBlack);
  scene3.setDuration(8);

  // Studio background
  const bg3 = new FFRect({ color: COLORS.studioDark, width: 1100, height: 2000, x: width/2, y: height/2 });
  bg3.addEffect('fadeIn', 0.3, 0);
  scene3.addChild(bg3);

  addStudioPlatform(scene3, 0.2);

  // Era badge
  const eraBadge2 = new FFRect({ color: COLORS.classicRed, width: 300, height: 80, x: width/2, y: 200 });
  eraBadge2.addEffect('bounceIn', 0.4, 0.3);
  scene3.addChild(eraBadge2);

  const eraYear2 = new FFText({ text: '1950', x: width/2, y: 200, fontSize: 50 });
  eraYear2.setColor(COLORS.white);
  eraYear2.alignCenter();
  eraYear2.addEffect('fadeIn', 0.3, 0.5);
  scene3.addChild(eraYear2);

  // Car name
  const carName2 = new FFText({ text: 'CLASSIC', x: width/2, y: 320, fontSize: 80 });
  carName2.setColor(COLORS.classicRed);
  carName2.alignCenter();
  carName2.addEffect('backInDown', 0.6, 0.6);
  scene3.addChild(carName2);

  const carStyle2 = new FFText({ text: 'THE CHROME AGE', x: width/2, y: 410, fontSize: 36 });
  carStyle2.setColor(COLORS.dimWhite);
  carStyle2.alignCenter();
  carStyle2.addEffect('fadeIn', 0.4, 1);
  scene3.addChild(carStyle2);

  // Classic car representation - longer, sleeker
  const classicCar = new FFRect({ color: COLORS.classicRed, width: 500, height: 180, x: width/2, y: height/2 });
  classicCar.addEffect('zoomIn', 0.5, 1.2);
  scene3.addChild(classicCar);

  // Chrome trim
  const chromeTrim = new FFRect({ color: COLORS.chromeSilver, width: 480, height: 20, x: width/2, y: height/2 });
  chromeTrim.addEffect('fadeIn', 0.3, 1.4);
  scene3.addChild(chromeTrim);

  // Wheels
  const wheel2a = new FFRect({ color: '#1a1a1a', width: 90, height: 90, x: width/2 - 150, y: height/2 + 70 });
  wheel2a.addEffect('rotateIn', 0.4, 1.5);
  scene3.addChild(wheel2a);

  const wheel2b = new FFRect({ color: '#1a1a1a', width: 90, height: 90, x: width/2 + 150, y: height/2 + 70 });
  wheel2b.addEffect('rotateIn', 0.4, 1.6);
  scene3.addChild(wheel2b);

  // Car icon
  const carEmoji2 = new FFText({ text: '🚗', x: width/2, y: height/2, fontSize: 120 });
  carEmoji2.alignCenter();
  carEmoji2.addEffect('bounceIn', 0.5, 1.7);
  scene3.addChild(carEmoji2);

  // Features list
  const features2 = [
    { text: '• V8 Engine Power', delay: 2.5 },
    { text: '• Chrome Everything', delay: 2.8 },
    { text: '• Tail Fins Design', delay: 3.1 },
    { text: '• American Dream Icon', delay: 3.4 }
  ];

  features2.forEach((feat, i) => {
    const featText = new FFText({ text: feat.text, x: width/2, y: 1050 + (i * 60), fontSize: 28 });
    featText.setColor(COLORS.chromeSilver);
    featText.alignCenter();
    featText.addEffect('fadeInLeft', 0.3, feat.delay);
    scene3.addChild(featText);
  });

  // Timeline
  addTimelineSlider(scene3, 1, 4);

  // Morph hint
  const morphHint2 = new FFText({ text: 'MORPHING...', x: width/2, y: 1400, fontSize: 32 });
  morphHint2.setColor(COLORS.electricBlue);
  morphHint2.alignCenter();
  morphHint2.addEffect('fadeIn', 0.3, 6);
  morphHint2.addEffect('fadeOut', 0.3, 7);
  scene3.addChild(morphHint2);

  addMorphEffect(scene3, 6.5);

  scene3.setTransition('crosswarp', 0.5);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Era 2 - 1950s Classic (8s)'));

  // ============================================
  // SCENE 4: ERA 3 - 1980s Sports (8s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.studioBlack);
  scene4.setDuration(8);

  // Studio background
  const bg4 = new FFRect({ color: COLORS.studioDark, width: 1100, height: 2000, x: width/2, y: height/2 });
  bg4.addEffect('fadeIn', 0.3, 0);
  scene4.addChild(bg4);

  addStudioPlatform(scene4, 0.2);

  // Era badge
  const eraBadge3 = new FFRect({ color: COLORS.metallicBlue, width: 300, height: 80, x: width/2, y: 200 });
  eraBadge3.addEffect('bounceIn', 0.4, 0.3);
  scene4.addChild(eraBadge3);

  const eraYear3 = new FFText({ text: '1980', x: width/2, y: 200, fontSize: 50 });
  eraYear3.setColor(COLORS.white);
  eraYear3.alignCenter();
  eraYear3.addEffect('fadeIn', 0.3, 0.5);
  scene4.addChild(eraYear3);

  // Car name
  const carName3 = new FFText({ text: 'SPORTS', x: width/2, y: 320, fontSize: 80 });
  carName3.setColor(COLORS.metallicBlue);
  carName3.alignCenter();
  carName3.addEffect('backInDown', 0.6, 0.6);
  scene4.addChild(carName3);

  const carStyle3 = new FFText({ text: 'THE AERODYNAMIC ERA', x: width/2, y: 410, fontSize: 36 });
  carStyle3.setColor(COLORS.dimWhite);
  carStyle3.alignCenter();
  carStyle3.addEffect('fadeIn', 0.4, 1);
  scene4.addChild(carStyle3);

  // Sports car representation - low, wide
  const sportsCar = new FFRect({ color: COLORS.metallicBlue, width: 450, height: 120, x: width/2, y: height/2 + 20 });
  sportsCar.addEffect('zoomIn', 0.5, 1.2);
  scene4.addChild(sportsCar);

  // Spoiler
  const spoiler = new FFRect({ color: '#2a5a9a', width: 200, height: 30, x: width/2 + 100, y: height/2 - 40 });
  spoiler.addEffect('fadeIn', 0.3, 1.4);
  scene4.addChild(spoiler);

  // Wheels - larger
  const wheel3a = new FFRect({ color: '#1a1a1a', width: 100, height: 100, x: width/2 - 140, y: height/2 + 60 });
  wheel3a.addEffect('rotateIn', 0.4, 1.5);
  scene4.addChild(wheel3a);

  const wheel3b = new FFRect({ color: '#1a1a1a', width: 100, height: 100, x: width/2 + 140, y: height/2 + 60 });
  wheel3b.addEffect('rotateIn', 0.4, 1.6);
  scene4.addChild(wheel3b);

  // Car icon
  const carEmoji3 = new FFText({ text: '🏎️', x: width/2, y: height/2, fontSize: 120 });
  carEmoji3.alignCenter();
  carEmoji3.addEffect('bounceIn', 0.5, 1.7);
  scene4.addChild(carEmoji3);

  // Features list
  const features3 = [
    { text: '• Turbo Charged', delay: 2.5 },
    { text: '• Pop-Up Headlights', delay: 2.8 },
    { text: '• Digital Dashboard', delay: 3.1 },
    { text: '• 150+ MPH Speed', delay: 3.4 }
  ];

  features3.forEach((feat, i) => {
    const featText = new FFText({ text: feat.text, x: width/2, y: 1050 + (i * 60), fontSize: 28 });
    featText.setColor(COLORS.chromeSilver);
    featText.alignCenter();
    featText.addEffect('fadeInLeft', 0.3, feat.delay);
    scene4.addChild(featText);
  });

  // Timeline
  addTimelineSlider(scene4, 2, 4);

  // Morph hint
  const morphHint3 = new FFText({ text: 'MORPHING...', x: width/2, y: 1400, fontSize: 32 });
  morphHint3.setColor(COLORS.electricBlue);
  morphHint3.alignCenter();
  morphHint3.addEffect('fadeIn', 0.3, 6);
  morphHint3.addEffect('fadeOut', 0.3, 7);
  scene4.addChild(morphHint3);

  addMorphEffect(scene4, 6.5);

  scene4.setTransition('crosswarp', 0.5);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Era 3 - 1980s Sports (8s)'));


  // ============================================
  // SCENE 5: ERA 4 - 2020s Electric (8s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.studioBlack);
  scene5.setDuration(8);

  // Studio background
  const bg5 = new FFRect({ color: COLORS.studioDark, width: 1100, height: 2000, x: width/2, y: height/2 });
  bg5.addEffect('fadeIn', 0.3, 0);
  scene5.addChild(bg5);

  addStudioPlatform(scene5, 0.2);

  // Era badge
  const eraBadge4 = new FFRect({ color: COLORS.modernWhite, width: 300, height: 80, x: width/2, y: 200 });
  eraBadge4.addEffect('bounceIn', 0.4, 0.3);
  scene5.addChild(eraBadge4);

  const eraYear4 = new FFText({ text: '2020', x: width/2, y: 200, fontSize: 50 });
  eraYear4.setColor(COLORS.darkText);
  eraYear4.alignCenter();
  eraYear4.addEffect('fadeIn', 0.3, 0.5);
  scene5.addChild(eraYear4);

  // Car name
  const carName4 = new FFText({ text: 'ELECTRIC', x: width/2, y: 320, fontSize: 80 });
  carName4.setColor(COLORS.modernWhite);
  carName4.alignCenter();
  carName4.addEffect('backInDown', 0.6, 0.6);
  scene5.addChild(carName4);

  const carStyle4 = new FFText({ text: 'THE SUSTAINABLE ERA', x: width/2, y: 410, fontSize: 36 });
  carStyle4.setColor(COLORS.dimWhite);
  carStyle4.alignCenter();
  carStyle4.addEffect('fadeIn', 0.4, 1);
  scene5.addChild(carStyle4);

  // Electric car representation - sleek, minimal
  const electricCar = new FFRect({ color: COLORS.modernWhite, width: 480, height: 150, x: width/2, y: height/2 });
  electricCar.addEffect('zoomIn', 0.5, 1.2);
  scene5.addChild(electricCar);

  // Glass roof
  const glassRoof = new FFRect({ color: '#87ceeb', width: 200, height: 60, x: width/2, y: height/2 - 50 });
  glassRoof.addEffect('fadeIn', 0.3, 1.4);
  scene5.addChild(glassRoof);

  // LED strip
  const ledStrip = new FFRect({ color: COLORS.electricBlue, width: 460, height: 8, x: width/2, y: height/2 + 60 });
  ledStrip.addEffect('fadeIn', 0.3, 1.5);
  scene5.addChild(ledStrip);

  // Wheels - aero covers
  const wheel4a = new FFRect({ color: '#333333', width: 95, height: 95, x: width/2 - 150, y: height/2 + 55 });
  wheel4a.addEffect('rotateIn', 0.4, 1.6);
  scene5.addChild(wheel4a);

  const wheel4b = new FFRect({ color: '#333333', width: 95, height: 95, x: width/2 + 150, y: height/2 + 55 });
  wheel4b.addEffect('rotateIn', 0.4, 1.7);
  scene5.addChild(wheel4b);

  // Car icon
  const carEmoji4 = new FFText({ text: '⚡🚗', x: width/2, y: height/2, fontSize: 100 });
  carEmoji4.alignCenter();
  carEmoji4.addEffect('bounceIn', 0.5, 1.8);
  scene5.addChild(carEmoji4);

  // Features list
  const features4 = [
    { text: '• Zero Emissions', delay: 2.5 },
    { text: '• 300+ Mile Range', delay: 2.8 },
    { text: '• Autopilot Ready', delay: 3.1 },
    { text: '• Over-Air Updates', delay: 3.4 }
  ];

  features4.forEach((feat, i) => {
    const featText = new FFText({ text: feat.text, x: width/2, y: 1050 + (i * 60), fontSize: 28 });
    featText.setColor(COLORS.chromeSilver);
    featText.alignCenter();
    featText.addEffect('fadeInLeft', 0.3, feat.delay);
    scene5.addChild(featText);
  });

  // Timeline
  addTimelineSlider(scene5, 3, 4);

  // Morph hint - final transformation
  const morphHint4 = new FFText({ text: 'FINAL EVOLUTION...', x: width/2, y: 1400, fontSize: 32 });
  morphHint4.setColor(COLORS.futureGold);
  morphHint4.alignCenter();
  morphHint4.addEffect('fadeIn', 0.3, 6);
  morphHint4.addEffect('fadeOut', 0.3, 7);
  scene5.addChild(morphHint4);

  addMorphEffect(scene5, 6.5);

  scene5.setTransition('dreamy', 0.6);
  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Era 4 - 2020s Electric (8s)'));

  // ============================================
  // SCENE 6: ERA 5 - 2050s Flying Car (10s)
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor(COLORS.studioBlack);
  scene6.setDuration(10);

  // Futuristic studio background
  const bg6 = new FFRect({ color: '#0a0a1a', width: 1100, height: 2000, x: width/2, y: height/2 });
  bg6.addEffect('fadeIn', 0.3, 0);
  scene6.addChild(bg6);

  // Neon grid lines
  for (let i = 0; i < 10; i++) {
    const gridLine = new FFRect({ color: 'rgba(0, 212, 255, 0.2)', width: 1080, height: 2, x: width/2, y: 200 + (i * 150) });
    gridLine.addEffect('fadeIn', 0.2, 0.1 + (i * 0.05));
    scene6.addChild(gridLine);
  }

  // Floating platform effect
  const floatPlatform = new FFRect({ color: COLORS.futureNeon, width: 600, height: 20, x: width/2, y: height/2 + 200 });
  floatPlatform.addEffect('fadeIn', 0.4, 0.3);
  scene6.addChild(floatPlatform);

  // Glow under platform
  const platformGlow = new FFRect({ color: 'rgba(123, 104, 238, 0.3)', width: 550, height: 100, x: width/2, y: height/2 + 250 });
  platformGlow.addEffect('fadeIn', 0.5, 0.4);
  scene6.addChild(platformGlow);

  // Era badge
  const eraBadge5 = new FFRect({ color: COLORS.futureNeon, width: 300, height: 80, x: width/2, y: 200 });
  eraBadge5.addEffect('bounceIn', 0.4, 0.5);
  scene6.addChild(eraBadge5);

  const eraYear5 = new FFText({ text: '2050', x: width/2, y: 200, fontSize: 50 });
  eraYear5.setColor(COLORS.white);
  eraYear5.alignCenter();
  eraYear5.addEffect('fadeIn', 0.3, 0.7);
  scene6.addChild(eraYear5);

  // Car name
  const carName5 = new FFText({ text: 'FLYING', x: width/2, y: 320, fontSize: 90 });
  carName5.setColor(COLORS.neonCyan);
  carName5.alignCenter();
  carName5.addEffect('backInDown', 0.6, 0.8);
  scene6.addChild(carName5);

  const carStyle5 = new FFText({ text: 'THE AUTONOMOUS ERA', x: width/2, y: 420, fontSize: 36 });
  carStyle5.setColor(COLORS.dimWhite);
  carStyle5.alignCenter();
  carStyle5.addEffect('fadeIn', 0.4, 1.2);
  scene6.addChild(carStyle5);

  // Flying car representation - futuristic pod
  const flyingCar = new FFRect({ color: COLORS.futureNeon, width: 400, height: 180, x: width/2, y: height/2 - 50 });
  flyingCar.addEffect('zoomIn', 0.6, 1.4);
  scene6.addChild(flyingCar);

  // Cockpit dome
  const cockpit = new FFRect({ color: '#00ffff', width: 200, height: 100, x: width/2, y: height/2 - 100 });
  cockpit.addEffect('fadeIn', 0.4, 1.6);
  scene6.addChild(cockpit);

  // Hover engines
  const engine1 = new FFRect({ color: COLORS.electricBlue, width: 60, height: 40, x: width/2 - 140, y: height/2 + 50 });
  engine1.addEffect('bounceIn', 0.3, 1.8);
  scene6.addChild(engine1);

  const engine2 = new FFRect({ color: COLORS.electricBlue, width: 60, height: 40, x: width/2 + 140, y: height/2 + 50 });
  engine2.addEffect('bounceIn', 0.3, 1.9);
  scene6.addChild(engine2);

  // Engine glow
  const glow1 = new FFRect({ color: 'rgba(0, 255, 255, 0.5)', width: 80, height: 60, x: width/2 - 140, y: height/2 + 80 });
  glow1.addEffect('fadeIn', 0.3, 2);
  scene6.addChild(glow1);

  const glow2 = new FFRect({ color: 'rgba(0, 255, 255, 0.5)', width: 80, height: 60, x: width/2 + 140, y: height/2 + 80 });
  glow2.addEffect('fadeIn', 0.3, 2.1);
  scene6.addChild(glow2);

  // Car icon
  const carEmoji5 = new FFText({ text: '🛸', x: width/2, y: height/2 - 50, fontSize: 130 });
  carEmoji5.alignCenter();
  carEmoji5.addEffect('bounceIn', 0.6, 2.2);
  scene6.addChild(carEmoji5);

  // Features list
  const features5 = [
    { text: '• Vertical Takeoff', delay: 3 },
    { text: '• AI Pilot System', delay: 3.3 },
    { text: '• 500 MPH Cruise', delay: 3.6 },
    { text: '• Zero Traffic', delay: 3.9 }
  ];

  features5.forEach((feat, i) => {
    const featText = new FFText({ text: feat.text, x: width/2, y: 1050 + (i * 60), fontSize: 28 });
    featText.setColor(COLORS.neonCyan);
    featText.alignCenter();
    featText.addEffect('fadeInLeft', 0.3, feat.delay);
    scene5.addChild(featText);
  });

  // Final timeline - complete
  addTimelineSlider(scene6, 4, 4.5);

  // Evolution complete badge
  const completeBadge = new FFRect({ color: COLORS.futureGold, width: 500, height: 80, x: width/2, y: 1400 });
  completeBadge.addEffect('zoomIn', 0.5, 6);
  scene6.addChild(completeBadge);

  const completeText = new FFText({ text: '✓ EVOLUTION COMPLETE', x: width/2, y: 1400, fontSize: 36 });
  completeText.setColor(COLORS.darkText);
  completeText.alignCenter();
  completeText.addEffect('bounceIn', 0.4, 6.3);
  scene6.addChild(completeText);

  scene6.setTransition('fade', 0.6);
  creator.addChild(scene6);
  console.log(colors.green('  ✓ Scene 6: Era 5 - 2050s Flying Car (10s)'));

  // ============================================
  // SCENE 7: FINALE - Summary & CTA (8s)
  // ============================================
  const scene7 = new FFScene();
  scene7.setBgColor(COLORS.studioBlack);
  scene7.setDuration(8);

  // Dark gradient background
  const bg7 = new FFRect({ color: COLORS.studioDark, width: 1100, height: 2000, x: width/2, y: height/2 });
  bg7.addEffect('fadeIn', 0.3, 0);
  scene7.addChild(bg7);

  // Title
  const finalTitle = new FFText({ text: 'MORPHING', x: width/2, y: 280, fontSize: 80 });
  finalTitle.setColor(COLORS.electricBlue);
  finalTitle.alignCenter();
  finalTitle.addEffect('backInDown', 0.6, 0.3);
  scene7.addChild(finalTitle);

  const finalTitle2 = new FFText({ text: 'EVOLUTION', x: width/2, y: 380, fontSize: 70 });
  finalTitle2.setColor(COLORS.futureGold);
  finalTitle2.alignCenter();
  finalTitle2.addEffect('backInDown', 0.6, 0.5);
  scene7.addChild(finalTitle2);

  // Separator
  const separator = new FFRect({ color: COLORS.white, width: 500, height: 4, x: width/2, y: 470 });
  separator.addEffect('zoomIn', 0.4, 0.8);
  scene7.addChild(separator);

  // Era icons row
  const eraIcons = ['🚙', '🚗', '🏎️', '⚡', '🛸'];
  eraIcons.forEach((icon, i) => {
    const iconText = new FFText({ text: icon, x: 200 + (i * 170), y: 600, fontSize: 60 });
    iconText.alignCenter();
    iconText.addEffect('bounceIn', 0.3, 1 + (i * 0.15));
    scene7.addChild(iconText);
  });

  // Years row
  const years = ['1920', '1950', '1980', '2020', '2050'];
  years.forEach((year, i) => {
    const yearText = new FFText({ text: year, x: 200 + (i * 170), y: 680, fontSize: 24 });
    yearText.setColor(COLORS.dimWhite);
    yearText.alignCenter();
    yearText.addEffect('fadeIn', 0.2, 1.2 + (i * 0.15));
    scene7.addChild(yearText);
  });

  // Stats
  const statsBox = new FFRect({ color: 'rgba(255,255,255,0.1)', width: 800, height: 200, x: width/2, y: 900 });
  statsBox.addEffect('fadeIn', 0.4, 2);
  scene7.addChild(statsBox);

  const stat1 = new FFText({ text: '100+ YEARS', x: width/2, y: 850, fontSize: 48 });
  stat1.setColor(COLORS.electricBlue);
  stat1.alignCenter();
  stat1.addEffect('fadeIn', 0.3, 2.2);
  scene7.addChild(stat1);

  const stat2 = new FFText({ text: 'OF AUTOMOTIVE INNOVATION', x: width/2, y: 920, fontSize: 32 });
  stat2.setColor(COLORS.white);
  stat2.alignCenter();
  stat2.addEffect('fadeIn', 0.3, 2.5);
  scene7.addChild(stat2);

  // Hashtags
  const hashText = new FFText({ text: '#CarEvolution #FutureCars #Automotive', x: width/2, y: 1050, fontSize: 26 });
  hashText.setColor(COLORS.futureGold);
  hashText.alignCenter();
  hashText.addEffect('fadeIn', 0.3, 3);
  scene7.addChild(hashText);

  // CTA Box
  const ctaBox = new FFRect({ color: COLORS.electricBlue, width: 650, height: 150, x: width/2, y: 1250 });
  ctaBox.addEffect('zoomIn', 0.5, 3.5);
  scene7.addChild(ctaBox);

  const ctaText1 = new FFText({ text: '👆 FOLLOW FOR MORE', x: width/2, y: 1220, fontSize: 36 });
  ctaText1.setColor(COLORS.white);
  ctaText1.alignCenter();
  ctaText1.addEffect('bounceIn', 0.4, 3.8);
  scene7.addChild(ctaText1);

  const ctaText2 = new FFText({ text: 'EVOLUTION STORIES', x: width/2, y: 1280, fontSize: 42 });
  ctaText2.setColor(COLORS.darkText);
  ctaText2.alignCenter();
  ctaText2.addEffect('bounceIn', 0.4, 4);
  scene7.addChild(ctaText2);

  // Engagement
  const engageText = new FFText({ text: '❤️ LIKE  💬 COMMENT  🔄 SHARE', x: width/2, y: 1450, fontSize: 28 });
  engageText.setColor(COLORS.white);
  engageText.alignCenter();
  engageText.addEffect('fadeIn', 0.4, 4.5);
  scene7.addChild(engageText);

  // Story count
  const storyCount = new FFText({ text: 'STORY 15 OF 30', x: width/2, y: 1600, fontSize: 26 });
  storyCount.setColor(COLORS.dimWhite);
  storyCount.alignCenter();
  storyCount.addEffect('fadeIn', 0.4, 5);
  scene7.addChild(storyCount);

  // Final timeline
  addTimelineSlider(scene7, 4, 5.5);

  creator.addChild(scene7);
  console.log(colors.green('  ✓ Scene 7: Finale - Summary & CTA (8s)'));

  // ============================================
  // EVENT HANDLERS & RENDER
  // ============================================
  creator.on('start', () => {
    console.log(colors.yellow('\n⏳ Rendering started...'));
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
    console.log(colors.magenta('\n🎬 Story 15: "Morphing Evolution" complete!\n'));
  });

  creator.start();
}

createMorphingEvolutionVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

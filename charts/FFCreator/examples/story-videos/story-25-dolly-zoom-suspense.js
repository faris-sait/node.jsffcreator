/**
 * 🎬 STORY 25: "Dolly Zoom Suspense" - Cinematic
 * 
 * The Story: A character realizes they are being followed in a library.
 * 
 * Visual Style:
 * - High suspense, cinematic lighting
 * - Digital Dolly Zoom (Vertigo Effect)
 * - Keyframed Scale/Position
 * - Heartbeat Sound Design
 * - Cinematic black bars (letterboxing) that slowly close tighter
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~50 seconds
 * 
 * Run with: node examples/story-videos/story-25-dolly-zoom-suspense.js
 */

// Mock browser environment
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
// COLOR PALETTE - Cinematic Suspense
// ============================================
const COLORS = {
  // Dark cinematic tones
  deepBlack: '#0a0a0a',
  charcoalGray: '#1a1a1a',
  shadowGray: '#2a2a2a',
  dimGray: '#3a3a3a',
  
  // Library atmosphere
  warmBrown: '#3d2817',
  darkWood: '#2b1810',
  bookSpine: '#4a3728',
  dustyBeige: '#8b7355',
  
  // Suspense accents
  bloodRed: '#8b0000',
  dangerRed: '#cc0000',
  warningOrange: '#ff6600',
  eerieGreen: '#1a3d1a',
  
  // Lighting
  spotlightYellow: '#ffd700',
  dimLight: '#ffe4b5',
  shadowBlue: '#1a1a2e',
  
  // Text
  white: '#ffffff',
  offWhite: '#f5f5f5',
  lightGray: '#cccccc',
  darkText: '#2a2a2a'
};

// ============================================
// HELPER: Add Letterbox Bars
// ============================================
function addLetterbox(scene, topHeight, bottomHeight, delay = 0, duration = 0) {
  // Top black bar
  const topBar = new FFRect({ 
    color: COLORS.deepBlack, 
    width: width, 
    height: topHeight, 
    x: width/2, 
    y: topHeight/2 
  });
  topBar.addEffect('fadeIn', 0.3, delay);
  scene.addChild(topBar);
  
  // Bottom black bar
  const bottomBar = new FFRect({ 
    color: COLORS.deepBlack, 
    width: width, 
    height: bottomHeight, 
    x: width/2, 
    y: height - bottomHeight/2 
  });
  bottomBar.addEffect('fadeIn', 0.3, delay);
  scene.addChild(bottomBar);
  
  return { topBar, bottomBar };
}

// ============================================
// HELPER: Add Vignette Effect
// ============================================
function addVignette(scene, intensity = 0.5, delay = 0) {
  // Create gradient vignette using multiple rectangles
  const vignetteTop = new FFRect({ 
    color: COLORS.deepBlack, 
    width: width, 
    height: 300, 
    x: width/2, 
    y: 150 
  });
  vignetteTop.setOpacity(intensity);
  vignetteTop.addEffect('fadeIn', 0.5, delay);
  scene.addChild(vignetteTop);
  
  const vignetteBottom = new FFRect({ 
    color: COLORS.deepBlack, 
    width: width, 
    height: 300, 
    x: width/2, 
    y: height - 150 
  });
  vignetteBottom.setOpacity(intensity);
  vignetteBottom.addEffect('fadeIn', 0.5, delay);
  scene.addChild(vignetteBottom);
}

// ============================================
// HELPER: Create Dolly Zoom Effect
// ============================================
function createDollyZoom(target, startDelay, duration) {
  // Dolly zoom: zoom in while moving back (or vice versa)
  // This creates the famous Vertigo effect
  const animation = {
    from: { scale: 1.0, y: target.y },
    to: { scale: 1.8, y: target.y + 200 },
    time: duration,
    delay: startDelay,
    ease: 'Cubic.InOut'
  };
  return animation;
}

// ============================================
// HELPER: Add Heartbeat Pulse Effect
// ============================================
function addHeartbeatPulse(scene, x, y, delay, count = 3) {
  for (let i = 0; i < count; i++) {
    const beatDelay = delay + (i * 0.8);
    
    // Pulse circle
    const pulse = new FFRect({ 
      color: COLORS.bloodRed, 
      width: 80, 
      height: 80, 
      x: x, 
      y: y 
    });
    pulse.setOpacity(0.6);
    pulse.addEffect('zoomIn', 0.2, beatDelay);
    pulse.addEffect('zoomOut', 0.4, beatDelay + 0.2);
    scene.addChild(pulse);
  }
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createDollyZoomSuspenseVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 25: "Dolly Zoom Suspense"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~50 seconds'));
  console.log(colors.yellow('🎨 Theme: Cinematic Suspense - Vertigo Effect\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-25-dolly-zoom-suspense.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: TITLE - "The Library" (4s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.charcoalGray);
  scene1.setDuration(4);

  // Letterbox bars (cinematic)
  addLetterbox(scene1, 150, 150, 0);

  // Title text with suspenseful entrance
  const titleText = new FFText({ text: 'THE LIBRARY', x: width/2, y: height/2 - 100, fontSize: 80 });
  titleText.setColor(COLORS.offWhite);
  titleText.alignCenter();
  titleText.addEffect('fadeIn', 0.8, 0.3);
  scene1.addChild(titleText);

  // Subtitle
  const subtitleText = new FFText({ text: '11:47 PM', x: width/2, y: height/2 + 50, fontSize: 42 });
  subtitleText.setColor(COLORS.lightGray);
  subtitleText.alignCenter();
  subtitleText.addEffect('fadeIn', 0.6, 1);
  scene1.addChild(subtitleText);

  // Atmospheric text
  const atmosphereText = new FFText({ text: 'Something feels... wrong', x: width/2, y: height/2 + 150, fontSize: 32 });
  atmosphereText.setColor(COLORS.warningOrange);
  atmosphereText.alignCenter();
  atmosphereText.addEffect('fadeIn', 0.5, 2);
  scene1.addChild(atmosphereText);

  scene1.setTransition('fade', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Title - "The Library" (4s)'));

  // ============================================
  // SCENE 2: ESTABLISHING SHOT - Library Shelves (5s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.darkWood);
  scene2.setDuration(5);

  // Letterbox
  addLetterbox(scene2, 150, 150, 0);

  // Library background elements
  const shelf1 = new FFRect({ color: COLORS.bookSpine, width: 200, height: 800, x: 200, y: height/2 });
  shelf1.addEffect('fadeInLeft', 0.5, 0.2);
  scene2.addChild(shelf1);

  const shelf2 = new FFRect({ color: COLORS.warmBrown, width: 200, height: 800, x: 540, y: height/2 });
  shelf2.addEffect('fadeIn', 0.5, 0.4);
  scene2.addChild(shelf2);

  const shelf3 = new FFRect({ color: COLORS.bookSpine, width: 200, height: 800, x: 880, y: height/2 });
  shelf3.addEffect('fadeInRight', 0.5, 0.6);
  scene2.addChild(shelf3);

  // Book spines (visual detail)
  for (let i = 0; i < 15; i++) {
    const book = new FFRect({ 
      color: i % 3 === 0 ? COLORS.dustyBeige : COLORS.darkWood, 
      width: 40, 
      height: 120, 
      x: 150 + (i * 60), 
      y: 600 + (Math.random() * 100) 
    });
    book.addEffect('fadeIn', 0.3, 0.5 + (i * 0.05));
    scene2.addChild(book);
  }

  // Character indicator (silhouette)
  const character = new FFRect({ color: COLORS.shadowGray, width: 120, height: 400, x: width/2, y: height/2 + 200 });
  character.addEffect('fadeIn', 0.6, 1.5);
  scene2.addChild(character);

  // Text overlay
  const sceneText = new FFText({ text: 'Studying alone...', x: width/2, y: 400, fontSize: 38 });
  sceneText.setColor(COLORS.offWhite);
  sceneText.alignCenter();
  sceneText.addEffect('fadeIn', 0.5, 2);
  scene2.addChild(sceneText);

  scene2.setTransition('crosswarp', 0.4);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Establishing Shot - Library Shelves (5s)'));

  // ============================================
  // SCENE 3: FIRST SUSPICION - Footsteps (6s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.darkWood);
  scene3.setDuration(6);

  // Letterbox slightly tighter
  addLetterbox(scene3, 180, 180, 0);

  // Library aisle perspective
  const aisle = new FFRect({ color: COLORS.warmBrown, width: 600, height: 1200, x: width/2, y: height/2 });
  aisle.addEffect('fadeIn', 0.3, 0);
  scene3.addChild(aisle);

  // Character closer view
  const char3 = new FFRect({ color: COLORS.shadowGray, width: 180, height: 500, x: width/2, y: height/2 + 100 });
  char3.addEffect('fadeIn', 0.4, 0.2);
  scene3.addChild(char3);

  // Head turn indicator
  const head = new FFRect({ color: COLORS.dimGray, width: 100, height: 100, x: width/2, y: height/2 - 150 });
  head.addEffect('fadeIn', 0.3, 0.5);
  scene3.addChild(head);

  // Sound effect text (footsteps)
  const footstep1 = new FFText({ text: '👣', x: 300, y: 1400, fontSize: 50 });
  footstep1.addEffect('fadeIn', 0.2, 1);
  footstep1.addEffect('fadeOut', 0.2, 1.5);
  scene3.addChild(footstep1);

  const footstep2 = new FFText({ text: '👣', x: 400, y: 1350, fontSize: 50 });
  footstep2.addEffect('fadeIn', 0.2, 1.8);
  footstep2.addEffect('fadeOut', 0.2, 2.3);
  scene3.addChild(footstep2);

  const footstep3 = new FFText({ text: '👣', x: 500, y: 1300, fontSize: 50 });
  footstep3.addEffect('fadeIn', 0.2, 2.6);
  footstep3.addEffect('fadeOut', 0.2, 3.1);
  scene3.addChild(footstep3);

  // Reaction text
  const reactionText = new FFText({ text: 'Did you hear that?', x: width/2, y: 500, fontSize: 36 });
  reactionText.setColor(COLORS.warningOrange);
  reactionText.alignCenter();
  reactionText.addEffect('fadeIn', 0.4, 3.5);
  scene3.addChild(reactionText);

  // Heartbeat starts
  addHeartbeatPulse(scene3, width/2, 700, 4, 2);

  scene3.setTransition('directionalwarp', 0.5);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: First Suspicion - Footsteps (6s)'));

  // ============================================
  // SCENE 4: DOLLY ZOOM - Realization (8s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.shadowBlue);
  scene4.setDuration(8);

  // Letterbox getting tighter (building tension)
  addLetterbox(scene4, 220, 220, 0);

  // Background corridor (for dolly zoom effect)
  const corridor = new FFRect({ color: COLORS.warmBrown, width: 800, height: 1400, x: width/2, y: height/2 });
  corridor.addEffect('fadeIn', 0.3, 0);
  scene4.addChild(corridor);

  // Side walls for perspective
  const leftWall = new FFRect({ color: COLORS.darkWood, width: 150, height: 1400, x: 75, y: height/2 });
  leftWall.addEffect('fadeIn', 0.3, 0);
  scene4.addChild(leftWall);

  const rightWall = new FFRect({ color: COLORS.darkWood, width: 150, height: 1400, x: width - 75, y: height/2 });
  rightWall.addEffect('fadeIn', 0.3, 0);
  scene4.addChild(rightWall);

  // Character face (center of dolly zoom)
  const face = new FFRect({ color: COLORS.dimGray, width: 200, height: 250, x: width/2, y: height/2 });
  face.addEffect('fadeIn', 0.4, 0.2);
  scene4.addChild(face);

  // Eyes (fear)
  const leftEye = new FFRect({ color: COLORS.white, width: 40, height: 50, x: width/2 - 50, y: height/2 - 20 });
  leftEye.addEffect('zoomIn', 0.3, 0.5);
  scene4.addChild(leftEye);

  const rightEye = new FFRect({ color: COLORS.white, width: 40, height: 50, x: width/2 + 50, y: height/2 - 20 });
  rightEye.addEffect('zoomIn', 0.3, 0.5);
  scene4.addChild(rightEye);

  // Pupils dilating
  const leftPupil = new FFRect({ color: COLORS.deepBlack, width: 20, height: 30, x: width/2 - 50, y: height/2 - 20 });
  leftPupil.addEffect('zoomIn', 0.4, 0.8);
  scene4.addChild(leftPupil);

  const rightPupil = new FFRect({ color: COLORS.deepBlack, width: 20, height: 30, x: width/2 + 50, y: height/2 - 20 });
  rightPupil.addEffect('zoomIn', 0.4, 0.8);
  scene4.addChild(rightPupil);

  // DOLLY ZOOM EFFECT - Background zooms while character stays centered
  const dollyBg = new FFRect({ color: COLORS.bookSpine, width: 1200, height: 1600, x: width/2, y: height/2 });
  dollyBg.setOpacity(0.3);
  dollyBg.addEffect('fadeIn', 0.3, 1);
  
  // Custom animation for dolly zoom
  const dollyAnimation = {
    from: { scale: 1.0 },
    to: { scale: 2.5 },
    time: 5,
    delay: 1.5,
    ease: 'Cubic.InOut'
  };
  dollyBg.addAnimate(dollyAnimation);
  scene4.addChild(dollyBg);

  // Realization text
  const realizationText = new FFText({ text: "I'm being followed", x: width/2, y: 450, fontSize: 44 });
  realizationText.setColor(COLORS.dangerRed);
  realizationText.alignCenter();
  realizationText.addEffect('fadeIn', 0.5, 2);
  scene4.addChild(realizationText);

  // Intense heartbeat
  addHeartbeatPulse(scene4, width/2, 1300, 3, 4);

  // Vignette intensifies
  addVignette(scene4, 0.7, 2);

  scene4.setTransition('zoomIn', 0.6);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Dolly Zoom - Realization (8s)'));

  // ============================================
  // SCENE 5: LOOKING BACK - Shadow Figure (7s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.deepBlack);
  scene5.setDuration(7);

  // Letterbox even tighter (maximum tension)
  addLetterbox(scene5, 280, 280, 0);

  // Dark library background
  const darkBg = new FFRect({ color: COLORS.charcoalGray, width: 900, height: 1200, x: width/2, y: height/2 });
  darkBg.addEffect('fadeIn', 0.4, 0);
  scene5.addChild(darkBg);

  // Dim spotlight effect
  const spotlight = new FFRect({ color: COLORS.dimLight, width: 400, height: 600, x: width/2, y: height/2 });
  spotlight.setOpacity(0.2);
  spotlight.addEffect('fadeIn', 0.5, 0.3);
  scene5.addChild(spotlight);

  // Character turning around
  const turningChar = new FFRect({ color: COLORS.shadowGray, width: 160, height: 450, x: width/2 - 200, y: height/2 });
  turningChar.addEffect('fadeInLeft', 0.5, 0.5);
  scene5.addChild(turningChar);

  // Shadow figure in the distance
  const shadowFigure = new FFRect({ color: COLORS.deepBlack, width: 100, height: 350, x: width/2 + 250, y: height/2 + 100 });
  shadowFigure.setOpacity(0.8);
  shadowFigure.addEffect('fadeIn', 0.8, 1.5);
  scene5.addChild(shadowFigure);

  // Glowing eyes of the shadow
  const shadowEye1 = new FFRect({ color: COLORS.dangerRed, width: 15, height: 20, x: width/2 + 230, y: height/2 - 50 });
  shadowEye1.addEffect('fadeIn', 0.3, 2.5);
  shadowEye1.addEffect('fadeOut', 0.2, 3);
  shadowEye1.addEffect('fadeIn', 0.2, 3.3);
  scene5.addChild(shadowEye1);

  const shadowEye2 = new FFRect({ color: COLORS.dangerRed, width: 15, height: 20, x: width/2 + 270, y: height/2 - 50 });
  shadowEye2.addEffect('fadeIn', 0.3, 2.5);
  shadowEye2.addEffect('fadeOut', 0.2, 3);
  shadowEye2.addEffect('fadeIn', 0.2, 3.3);
  scene5.addChild(shadowEye2);

  // Distance markers (showing how close)
  const distanceText = new FFText({ text: '15 meters away', x: width/2, y: 500, fontSize: 32 });
  distanceText.setColor(COLORS.lightGray);
  distanceText.alignCenter();
  distanceText.addEffect('fadeIn', 0.4, 3);
  scene5.addChild(distanceText);

  // Panic text
  const panicText = new FFText({ text: 'RUN', x: width/2, y: 1200, fontSize: 90 });
  panicText.setColor(COLORS.dangerRed);
  panicText.alignCenter();
  panicText.addEffect('bounceIn', 0.5, 4.5);
  scene5.addChild(panicText);

  // Rapid heartbeat
  addHeartbeatPulse(scene5, width/2, 1350, 4, 5);

  scene5.setTransition('crosswarp', 0.5);
  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Looking Back - Shadow Figure (7s)'));

  // ============================================
  // SCENE 6: CHASE BEGINS - Motion Blur (6s)
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor(COLORS.shadowBlue);
  scene6.setDuration(6);

  // Letterbox still tight
  addLetterbox(scene6, 280, 280, 0);

  // Motion blur effect - streaking lines
  for (let i = 0; i < 20; i++) {
    const blurLine = new FFRect({ 
      color: i % 2 === 0 ? COLORS.warmBrown : COLORS.bookSpine, 
      width: 80, 
      height: 1400, 
      x: 100 + (i * 50), 
      y: height/2 
    });
    blurLine.setOpacity(0.4);
    blurLine.addEffect('fadeIn', 0.1, i * 0.05);
    blurLine.addEffect('slideOutLeft', 0.8, 0.2 + (i * 0.05));
    scene6.addChild(blurLine);
  }

  // Running character (side view)
  const runningChar = new FFRect({ color: COLORS.dimGray, width: 140, height: 400, x: width/2 - 150, y: height/2 });
  runningChar.addEffect('fadeIn', 0.3, 0.5);
  scene6.addChild(runningChar);

  // Leg motion indicators
  const leg1 = new FFRect({ color: COLORS.shadowGray, width: 60, height: 180, x: width/2 - 180, y: height/2 + 150 });
  leg1.addEffect('fadeIn', 0.2, 0.7);
  leg1.addEffect('fadeOut', 0.2, 1.2);
  leg1.addEffect('fadeIn', 0.2, 1.7);
  scene6.addChild(leg1);

  // Speed lines
  for (let i = 0; i < 10; i++) {
    const speedLine = new FFRect({ 
      color: COLORS.white, 
      width: 150, 
      height: 4, 
      x: width - 200, 
      y: 600 + (i * 80) 
    });
    speedLine.setOpacity(0.6);
    speedLine.addEffect('fadeIn', 0.1, 1 + (i * 0.1));
    speedLine.addEffect('slideOutLeft', 0.5, 1.1 + (i * 0.1));
    scene6.addChild(speedLine);
  }

  // Chase text
  const chaseText = new FFText({ text: 'GETTING CLOSER', x: width/2, y: 450, fontSize: 48 });
  chaseText.setColor(COLORS.dangerRed);
  chaseText.alignCenter();
  chaseText.addEffect('fadeIn', 0.3, 2);
  chaseText.addEffect('fadeOut', 0.3, 3);
  chaseText.addEffect('fadeIn', 0.3, 3.5);
  scene6.addChild(chaseText);

  // Frantic heartbeat
  addHeartbeatPulse(scene6, width/2, 1300, 2, 6);

  scene6.setTransition('windowslice', 0.4);
  creator.addChild(scene6);
  console.log(colors.green('  ✓ Scene 6: Chase Begins - Motion Blur (6s)'));

  // ============================================
  // SCENE 7: CLIMAX - Trapped (7s)
  // ============================================
  const scene7 = new FFScene();
  scene7.setBgColor(COLORS.deepBlack);
  scene7.setDuration(7);

  // Letterbox maximum tightness (claustrophobic)
  addLetterbox(scene7, 350, 350, 0);

  // Dead end wall
  const wall = new FFRect({ color: COLORS.darkWood, width: 800, height: 1000, x: width/2, y: height/2 });
  wall.addEffect('zoomIn', 0.5, 0);
  scene7.addChild(wall);

  // Character cornered
  const corneredChar = new FFRect({ color: COLORS.shadowGray, width: 150, height: 420, x: width/2, y: height/2 + 100 });
  corneredChar.addEffect('fadeIn', 0.4, 0.5);
  scene7.addChild(corneredChar);

  // Hands up in fear
  const leftHand = new FFRect({ color: COLORS.dimGray, width: 60, height: 100, x: width/2 - 120, y: height/2 - 80 });
  leftHand.addEffect('fadeInUp', 0.4, 1);
  scene7.addChild(leftHand);

  const rightHand = new FFRect({ color: COLORS.dimGray, width: 60, height: 100, x: width/2 + 120, y: height/2 - 80 });
  rightHand.addEffect('fadeInUp', 0.4, 1);
  scene7.addChild(rightHand);

  // Shadow approaching (getting larger)
  const approachingShadow = new FFRect({ color: COLORS.deepBlack, width: 200, height: 500, x: width/2, y: height/2 - 200 });
  approachingShadow.setOpacity(0.9);
  
  const shadowGrowth = {
    from: { scale: 0.5 },
    to: { scale: 2.0 },
    time: 4,
    delay: 1.5,
    ease: 'Cubic.In'
  };
  approachingShadow.addAnimate(shadowGrowth);
  approachingShadow.addEffect('fadeIn', 0.5, 1.5);
  scene7.addChild(approachingShadow);

  // Red glowing eyes getting closer
  const closeEye1 = new FFRect({ color: COLORS.bloodRed, width: 30, height: 40, x: width/2 - 60, y: height/2 - 250 });
  closeEye1.addEffect('fadeIn', 0.4, 2);
  closeEye1.addEffect('zoomIn', 2, 2.5);
  scene7.addChild(closeEye1);

  const closeEye2 = new FFRect({ color: COLORS.bloodRed, width: 30, height: 40, x: width/2 + 60, y: height/2 - 250 });
  closeEye2.addEffect('fadeIn', 0.4, 2);
  closeEye2.addEffect('zoomIn', 2, 2.5);
  scene7.addChild(closeEye2);

  // Terror text
  const terrorText = new FFText({ text: 'NO ESCAPE', x: width/2, y: 500, fontSize: 60 });
  terrorText.setColor(COLORS.dangerRed);
  terrorText.alignCenter();
  terrorText.addEffect('bounceIn', 0.5, 3);
  scene7.addChild(terrorText);

  // Maximum heartbeat
  addHeartbeatPulse(scene7, width/2, 1250, 3, 8);

  // Screen shake effect (multiple flashes)
  for (let i = 0; i < 6; i++) {
    const flash = new FFRect({ color: COLORS.bloodRed, width: width, height: height, x: width/2, y: height/2 });
    flash.setOpacity(0.3);
    flash.addEffect('fadeIn', 0.05, 4 + (i * 0.2));
    flash.addEffect('fadeOut', 0.05, 4.05 + (i * 0.2));
    scene7.addChild(flash);
  }

  scene7.setTransition('zoomIn', 0.7);
  creator.addChild(scene7);
  console.log(colors.green('  ✓ Scene 7: Climax - Trapped (7s)'));

  // ============================================
  // SCENE 8: FINALE - Cut to Black (7s)
  // ============================================
  const scene8 = new FFScene();
  scene8.setBgColor(COLORS.deepBlack);
  scene8.setDuration(7);

  // Full black screen
  const blackScreen = new FFRect({ color: COLORS.deepBlack, width: width, height: height, x: width/2, y: height/2 });
  blackScreen.addEffect('fadeIn', 0.3, 0);
  scene8.addChild(blackScreen);

  // Sound effect text (scream)
  const screamText = new FFText({ text: '😱', x: width/2, y: height/2 - 200, fontSize: 120 });
  screamText.addEffect('zoomIn', 0.4, 0.5);
  screamText.addEffect('fadeOut', 0.5, 1.5);
  scene8.addChild(screamText);

  // Final heartbeat stops
  const finalBeat1 = new FFRect({ color: COLORS.bloodRed, width: 100, height: 100, x: width/2, y: height/2 });
  finalBeat1.setOpacity(0.5);
  finalBeat1.addEffect('zoomIn', 0.3, 2);
  finalBeat1.addEffect('zoomOut', 0.5, 2.3);
  scene8.addChild(finalBeat1);

  const finalBeat2 = new FFRect({ color: COLORS.bloodRed, width: 100, height: 100, x: width/2, y: height/2 });
  finalBeat2.setOpacity(0.5);
  finalBeat2.addEffect('zoomIn', 0.3, 3);
  finalBeat2.addEffect('zoomOut', 0.5, 3.3);
  scene8.addChild(finalBeat2);

  // Silence indicator
  const silenceText = new FFText({ text: '...', x: width/2, y: height/2, fontSize: 100 });
  silenceText.setColor(COLORS.lightGray);
  silenceText.alignCenter();
  silenceText.addEffect('fadeIn', 0.8, 4);
  scene8.addChild(silenceText);

  // The End
  const endText = new FFText({ text: 'THE END', x: width/2, y: height/2 + 200, fontSize: 60 });
  endText.setColor(COLORS.offWhite);
  endText.alignCenter();
  endText.addEffect('fadeIn', 0.6, 5);
  scene8.addChild(endText);

  // Credits
  const creditsText = new FFText({ text: 'DOLLY ZOOM SUSPENSE', x: width/2, y: height/2 + 350, fontSize: 32 });
  creditsText.setColor(COLORS.lightGray);
  creditsText.alignCenter();
  creditsText.addEffect('fadeIn', 0.5, 5.5);
  scene8.addChild(creditsText);

  // Hashtags
  const hashtagText = new FFText({ text: '#Suspense #Thriller #CinematicShorts', x: width/2, y: height/2 + 450, fontSize: 26 });
  hashtagText.setColor(COLORS.dimGray);
  hashtagText.alignCenter();
  hashtagText.addEffect('fadeIn', 0.4, 6);
  scene8.addChild(hashtagText);

  creator.addChild(scene8);
  console.log(colors.green('  ✓ Scene 8: Finale - Cut to Black (7s)'));

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
    console.log(colors.magenta('\n🎬 Story 25: "Dolly Zoom Suspense" complete!\n'));
    console.log(colors.yellow('🎥 Features used:'));
    console.log(colors.cyan('   • Cinematic letterboxing (progressive tightening)'));
    console.log(colors.cyan('   • Dolly zoom / Vertigo effect'));
    console.log(colors.cyan('   • Keyframed scale and position animations'));
    console.log(colors.cyan('   • Heartbeat pulse effects'));
    console.log(colors.cyan('   • Motion blur and speed lines'));
    console.log(colors.cyan('   • Vignette and lighting effects'));
    console.log(colors.cyan('   • Suspenseful pacing and transitions\n'));
  });

  creator.start();
}

createDollyZoomSuspenseVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

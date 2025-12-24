/**
 * 🎬 STORY 10: "VHS Investigation" - True Crime/Suspense
 * 
 * The Story: A "found footage" snippet of a mysterious door in the woods.
 * 
 * Visual Style:
 * - Low-res, 4:3 aspect ratio feel (with letterboxing)
 * - Analog distortion, VHS aesthetic
 * - Chromatic Aberration, Scanlines, and Signal Noise
 * - "REC" indicator in corner
 * - Flickering timestamp (SEPT 12 1994)
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~45 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-10-vhs-investigation.js
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
// COLOR PALETTE - VHS/Analog Theme
// ============================================
const COLORS = {
  // VHS Base colors
  vhsBlack: '#0a0a0a',
  vhsDarkGray: '#1a1a1a',
  vhsGray: '#2d2d2d',
  staticGray: '#404040',
  
  // Chromatic aberration
  chromaRed: '#ff0040',
  chromaCyan: '#00ffff',
  chromaBlue: '#0066ff',
  chromaGreen: '#00ff66',
  
  // VHS UI elements
  recRed: '#ff0000',
  timestampWhite: '#e0e0e0',
  scanlineBlack: 'rgba(0, 0, 0, 0.3)',
  
  // Atmosphere
  fogWhite: 'rgba(200, 200, 200, 0.15)',
  eerieGreen: '#1a3a1a',
  darkForest: '#0d1f0d',
  woodBrown: '#3d2817',
  
  // Text
  white: '#ffffff',
  dimWhite: '#b0b0b0',
  glitchWhite: '#f0f0f0'
};

// ============================================
// HELPER: Add VHS overlay elements (REC, timestamp, scanlines)
// ============================================
function addVHSOverlay(scene, timestamp = 'SEPT 12 1994', showRec = true, delay = 0) {
  // Letterbox bars (4:3 simulation)
  const letterboxTop = new FFRect({ color: COLORS.vhsBlack, width: 1100, height: 180, x: width/2, y: 90 });
  letterboxTop.addEffect('fadeIn', 0.2, delay);
  scene.addChild(letterboxTop);
  
  const letterboxBottom = new FFRect({ color: COLORS.vhsBlack, width: 1100, height: 180, x: width/2, y: height - 90 });
  letterboxBottom.addEffect('fadeIn', 0.2, delay);
  scene.addChild(letterboxBottom);
  
  // REC indicator
  if (showRec) {
    const recDot = new FFRect({ color: COLORS.recRed, width: 24, height: 24, x: 120, y: 280 });
    recDot.addEffect('fadeIn', 0.1, delay + 0.1);
    recDot.addEffect('fadeOut', 0.1, delay + 0.6);
    recDot.addEffect('fadeIn', 0.1, delay + 0.8);
    scene.addChild(recDot);
    
    const recText = new FFText({ text: 'REC', x: 190, y: 280, fontSize: 32 });
    recText.setColor(COLORS.recRed);
    recText.addEffect('fadeIn', 0.2, delay + 0.1);
    scene.addChild(recText);
  }
  
  // Timestamp (bottom left)
  const timestampText = new FFText({ text: timestamp, x: 180, y: height - 280, fontSize: 28 });
  timestampText.setColor(COLORS.timestampWhite);
  timestampText.addEffect('fadeIn', 0.2, delay + 0.2);
  scene.addChild(timestampText);
  
  // Scanlines effect (horizontal lines)
  for (let i = 0; i < 40; i++) {
    const scanline = new FFRect({ 
      color: COLORS.scanlineBlack, 
      width: 1080, 
      height: 2, 
      x: width/2, 
      y: 200 + (i * 40) 
    });
    scanline.addEffect('fadeIn', 0.1, delay);
    scene.addChild(scanline);
  }
}

// ============================================
// HELPER: Add chromatic aberration effect
// ============================================
function addChromaticAberration(scene, y, delay = 0) {
  // Red shift left
  const redShift = new FFRect({ color: 'rgba(255, 0, 64, 0.08)', width: 1080, height: 100, x: width/2 - 8, y: y });
  redShift.addEffect('fadeIn', 0.1, delay);
  redShift.addEffect('fadeOut', 0.1, delay + 0.3);
  scene.addChild(redShift);
  
  // Cyan shift right
  const cyanShift = new FFRect({ color: 'rgba(0, 255, 255, 0.08)', width: 1080, height: 100, x: width/2 + 8, y: y });
  cyanShift.addEffect('fadeIn', 0.1, delay);
  cyanShift.addEffect('fadeOut', 0.1, delay + 0.3);
  scene.addChild(cyanShift);
}

// ============================================
// HELPER: Add signal noise/static
// ============================================
function addSignalNoise(scene, delay = 0, intensity = 'low') {
  const noiseCount = intensity === 'high' ? 60 : intensity === 'medium' ? 35 : 20;
  
  for (let i = 0; i < noiseCount; i++) {
    const noiseX = 100 + Math.random() * (width - 200);
    const noiseY = 200 + Math.random() * (height - 400);
    const noiseW = 2 + Math.random() * 15;
    const noiseH = 1 + Math.random() * 3;
    
    const noise = new FFRect({ 
      color: Math.random() > 0.5 ? COLORS.staticGray : COLORS.glitchWhite, 
      width: noiseW, 
      height: noiseH, 
      x: noiseX, 
      y: noiseY 
    });
    noise.addEffect('fadeIn', 0.05, delay + Math.random() * 0.5);
    noise.addEffect('fadeOut', 0.05, delay + 0.3 + Math.random() * 0.5);
    scene.addChild(noise);
  }
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createVHSInvestigationVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 10: "VHS Investigation"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~45 seconds'));
  console.log(colors.yellow('🎨 Theme: True Crime/Suspense - VHS Found Footage\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-10-vhs-investigation.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: STATIC INTRO - Tape Starting (8s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.vhsBlack);
  scene1.setDuration(8);

  // Heavy static background
  const staticBg = new FFRect({ color: COLORS.vhsDarkGray, width: 1100, height: 2000, x: width/2, y: height/2 });
  staticBg.addEffect('fadeIn', 0.2, 0);
  scene1.addChild(staticBg);

  // Static noise - heavy
  addSignalNoise(scene1, 0, 'high');
  addSignalNoise(scene1, 0.5, 'high');
  addSignalNoise(scene1, 1, 'medium');

  // VHS tracking lines
  for (let i = 0; i < 8; i++) {
    const trackLine = new FFRect({ 
      color: COLORS.glitchWhite, 
      width: 1080, 
      height: 4 + Math.random() * 8, 
      x: width/2, 
      y: 300 + (i * 180) 
    });
    trackLine.addEffect('fadeIn', 0.1, 0.2 + (i * 0.1));
    trackLine.addEffect('fadeOut', 0.2, 0.5 + (i * 0.1));
    scene1.addChild(trackLine);
  }

  // "PLAY" indicator
  const playBox = new FFRect({ color: 'rgba(0,0,0,0.7)', width: 200, height: 70, x: width - 150, y: 280 });
  playBox.addEffect('fadeIn', 0.3, 1.5);
  scene1.addChild(playBox);

  const playText = new FFText({ text: '▶ PLAY', x: width - 150, y: 280, fontSize: 32 });
  playText.setColor(COLORS.white);
  playText.alignCenter();
  playText.addEffect('fadeIn', 0.2, 1.7);
  scene1.addChild(playText);

  // Date stamp appearing
  const dateStamp = new FFText({ text: 'SEPT 12 1994', x: width/2, y: height/2, fontSize: 60 });
  dateStamp.setColor(COLORS.timestampWhite);
  dateStamp.alignCenter();
  dateStamp.addEffect('fadeIn', 0.3, 2.5);
  dateStamp.addEffect('fadeOut', 0.2, 3.5);
  scene1.addChild(dateStamp);

  // Time stamp
  const timeStamp = new FFText({ text: '11:47:23 PM', x: width/2, y: height/2 + 80, fontSize: 48 });
  timeStamp.setColor(COLORS.dimWhite);
  timeStamp.alignCenter();
  timeStamp.addEffect('fadeIn', 0.3, 2.8);
  timeStamp.addEffect('fadeOut', 0.2, 3.5);
  scene1.addChild(timeStamp);

  // "FOUND FOOTAGE" text
  const foundBox = new FFRect({ color: COLORS.recRed, width: 500, height: 80, x: width/2, y: height/2 + 250 });
  foundBox.addEffect('zoomIn', 0.4, 4);
  scene1.addChild(foundBox);

  const foundText = new FFText({ text: 'FOUND FOOTAGE', x: width/2, y: height/2 + 250, fontSize: 44 });
  foundText.setColor(COLORS.white);
  foundText.alignCenter();
  foundText.addEffect('fadeIn', 0.3, 4.2);
  scene1.addChild(foundText);

  // Warning text
  const warningText = new FFText({ text: 'EVIDENCE FILE #1994-0912', x: width/2, y: height/2 + 380, fontSize: 28 });
  warningText.setColor(COLORS.dimWhite);
  warningText.alignCenter();
  warningText.addEffect('fadeIn', 0.4, 5);
  scene1.addChild(warningText);

  // Chromatic glitch
  addChromaticAberration(scene1, 600, 3);
  addChromaticAberration(scene1, 1200, 4.5);

  // Add VHS overlay
  addVHSOverlay(scene1, 'SEPT 12 1994  11:47 PM', true, 0.5);

  scene1.setTransition('fastswitch', 0.3);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Static Intro - Tape Starting (8s)'));

  // ============================================
  // SCENE 2: THE WOODS - Approaching (10s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.darkForest);
  scene2.setDuration(10);

  // Dark forest background
  const forestBg = new FFRect({ color: COLORS.darkForest, width: 1100, height: 2000, x: width/2, y: height/2 });
  forestBg.addEffect('fadeIn', 0.5, 0);
  scene2.addChild(forestBg);

  // Tree silhouettes - left side
  const trees = [
    { x: 100, y: 800, w: 80, h: 600 },
    { x: 200, y: 750, w: 60, h: 700 },
    { x: 50, y: 900, w: 100, h: 500 },
    { x: 950, y: 780, w: 70, h: 650 },
    { x: 1020, y: 850, w: 90, h: 550 },
    { x: 880, y: 720, w: 55, h: 720 }
  ];

  trees.forEach((tree, i) => {
    const treeRect = new FFRect({ color: '#0a1a0a', width: tree.w, height: tree.h, x: tree.x, y: tree.y });
    treeRect.addEffect('fadeIn', 0.4, 0.2 + (i * 0.1));
    scene2.addChild(treeRect);
  });

  // Fog layers
  const fog1 = new FFRect({ color: COLORS.fogWhite, width: 1100, height: 300, x: width/2, y: 1100 });
  fog1.addEffect('fadeIn', 0.8, 0.5);
  scene2.addChild(fog1);

  const fog2 = new FFRect({ color: 'rgba(150, 150, 150, 0.1)', width: 1100, height: 200, x: width/2, y: 900 });
  fog2.addEffect('fadeIn', 0.6, 0.8);
  scene2.addChild(fog2);

  // Path in the middle
  const pathRect = new FFRect({ color: COLORS.woodBrown, width: 200, height: 800, x: width/2, y: 1200 });
  pathRect.addEffect('fadeIn', 0.5, 0.3);
  scene2.addChild(pathRect);

  // Narrative text - shaky VHS style
  const narrativeBox = new FFRect({ color: 'rgba(0,0,0,0.6)', width: 800, height: 150, x: width/2, y: 500 });
  narrativeBox.addEffect('fadeIn', 0.4, 2);
  scene2.addChild(narrativeBox);

  const narrative1 = new FFText({ text: '"I found something', x: width/2, y: 470, fontSize: 38 });
  narrative1.setColor(COLORS.glitchWhite);
  narrative1.alignCenter();
  narrative1.addEffect('fadeIn', 0.3, 2.3);
  scene2.addChild(narrative1);

  const narrative2 = new FFText({ text: 'in the woods..."', x: width/2, y: 530, fontSize: 38 });
  narrative2.setColor(COLORS.glitchWhite);
  narrative2.alignCenter();
  narrative2.addEffect('fadeIn', 0.3, 2.8);
  scene2.addChild(narrative2);

  // Footstep indicators
  const footsteps = ['👣', '👣', '👣'];
  footsteps.forEach((step, i) => {
    const footText = new FFText({ text: step, x: width/2, y: 1400 - (i * 150), fontSize: 40 });
    footText.alignCenter();
    footText.addEffect('fadeIn', 0.3, 4 + (i * 0.5));
    footText.addEffect('fadeOut', 0.3, 5 + (i * 0.5));
    scene2.addChild(footText);
  });

  // Camera shake simulation - glitch bars
  const shakeBar1 = new FFRect({ color: COLORS.glitchWhite, width: 1080, height: 6, x: width/2, y: 700 });
  shakeBar1.addEffect('fadeIn', 0.05, 5);
  shakeBar1.addEffect('fadeOut', 0.05, 5.1);
  scene2.addChild(shakeBar1);

  const shakeBar2 = new FFRect({ color: COLORS.glitchWhite, width: 1080, height: 4, x: width/2, y: 1100 });
  shakeBar2.addEffect('fadeIn', 0.05, 6);
  shakeBar2.addEffect('fadeOut', 0.05, 6.1);
  scene2.addChild(shakeBar2);

  // Signal noise
  addSignalNoise(scene2, 3, 'low');
  addSignalNoise(scene2, 6, 'medium');

  // Chromatic aberration
  addChromaticAberration(scene2, 800, 4);
  addChromaticAberration(scene2, 1000, 7);

  // VHS overlay
  addVHSOverlay(scene2, 'SEPT 12 1994  11:52 PM', true, 0);

  scene2.setTransition('shake', 0.4);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: The Woods - Approaching (10s)'));

  // ============================================
  // SCENE 3: THE DOOR - Discovery (10s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.vhsBlack);
  scene3.setDuration(10);

  // Dark background
  const doorBg = new FFRect({ color: COLORS.darkForest, width: 1100, height: 2000, x: width/2, y: height/2 });
  doorBg.addEffect('fadeIn', 0.3, 0);
  scene3.addChild(doorBg);

  // Clearing in the woods
  const clearing = new FFRect({ color: '#1a2a1a', width: 600, height: 800, x: width/2, y: height/2 });
  clearing.addEffect('fadeIn', 0.5, 0.2);
  scene3.addChild(clearing);

  // THE MYSTERIOUS DOOR
  // Door frame
  const doorFrame = new FFRect({ color: '#2a1a0a', width: 280, height: 450, x: width/2, y: height/2 + 50 });
  doorFrame.addEffect('zoomIn', 0.8, 0.5);
  scene3.addChild(doorFrame);

  // Door itself
  const door = new FFRect({ color: '#1a0f05', width: 240, height: 420, x: width/2, y: height/2 + 50 });
  door.addEffect('zoomIn', 0.7, 0.6);
  scene3.addChild(door);

  // Door handle
  const handle = new FFRect({ color: '#4a3a2a', width: 20, height: 40, x: width/2 + 90, y: height/2 + 50 });
  handle.addEffect('fadeIn', 0.3, 0.8);
  scene3.addChild(handle);

  // Eerie glow from door cracks
  const glowTop = new FFRect({ color: 'rgba(100, 255, 100, 0.3)', width: 200, height: 8, x: width/2, y: height/2 - 160 });
  glowTop.addEffect('fadeIn', 0.5, 1.5);
  glowTop.addEffect('fadeOut', 0.3, 2.5);
  glowTop.addEffect('fadeIn', 0.3, 3);
  scene3.addChild(glowTop);

  const glowBottom = new FFRect({ color: 'rgba(100, 255, 100, 0.4)', width: 220, height: 15, x: width/2, y: height/2 + 270 });
  glowBottom.addEffect('fadeIn', 0.5, 1.8);
  glowBottom.addEffect('fadeOut', 0.3, 2.8);
  glowBottom.addEffect('fadeIn', 0.3, 3.3);
  scene3.addChild(glowBottom);

  // "WHAT IS THIS?" text
  const whatBox = new FFRect({ color: 'rgba(0,0,0,0.7)', width: 600, height: 100, x: width/2, y: 350 });
  whatBox.addEffect('fadeIn', 0.4, 2);
  scene3.addChild(whatBox);

  const whatText = new FFText({ text: '"What... is this?"', x: width/2, y: 350, fontSize: 42 });
  whatText.setColor(COLORS.glitchWhite);
  whatText.alignCenter();
  whatText.addEffect('fadeIn', 0.3, 2.3);
  scene3.addChild(whatText);

  // Door label - mysterious
  const labelBox = new FFRect({ color: 'rgba(0,0,0,0.8)', width: 400, height: 80, x: width/2, y: height/2 + 350 });
  labelBox.addEffect('fadeIn', 0.4, 4);
  scene3.addChild(labelBox);

  const labelText = new FFText({ text: 'A DOOR TO NOWHERE', x: width/2, y: height/2 + 350, fontSize: 32 });
  labelText.setColor(COLORS.recRed);
  labelText.alignCenter();
  labelText.addEffect('fadeIn', 0.3, 4.3);
  scene3.addChild(labelText);

  // Question marks floating
  const questions = ['?', '?', '?'];
  questions.forEach((q, i) => {
    const qText = new FFText({ text: q, x: 300 + (i * 240), y: 550, fontSize: 60 });
    qText.setColor(COLORS.chromaCyan);
    qText.alignCenter();
    qText.addEffect('bounceIn', 0.4, 5 + (i * 0.3));
    scene3.addChild(qText);
  });

  // Heavy glitch effect
  const glitchBar1 = new FFRect({ color: COLORS.chromaRed, width: 1080, height: 20, x: width/2, y: 600 });
  glitchBar1.addEffect('fadeIn', 0.05, 6);
  glitchBar1.addEffect('fadeOut', 0.1, 6.2);
  scene3.addChild(glitchBar1);

  const glitchBar2 = new FFRect({ color: COLORS.chromaCyan, width: 1080, height: 15, x: width/2, y: 1200 });
  glitchBar2.addEffect('fadeIn', 0.05, 6.5);
  glitchBar2.addEffect('fadeOut', 0.1, 6.7);
  scene3.addChild(glitchBar2);

  // Signal distortion
  addSignalNoise(scene3, 2, 'medium');
  addSignalNoise(scene3, 5, 'high');
  addChromaticAberration(scene3, height/2, 3);
  addChromaticAberration(scene3, height/2 + 200, 6);

  // VHS overlay
  addVHSOverlay(scene3, 'SEPT 12 1994  11:58 PM', true, 0);

  scene3.setTransition('fastswitch', 0.3);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: The Door - Discovery (10s)'));

  // ============================================
  // SCENE 4: THE OPENING - Climax (10s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.vhsBlack);
  scene4.setDuration(10);

  // Dark background
  const openBg = new FFRect({ color: '#0a0a0a', width: 1100, height: 2000, x: width/2, y: height/2 });
  openBg.addEffect('fadeIn', 0.2, 0);
  scene4.addChild(openBg);

  // Door opening - revealing light
  const doorOpen = new FFRect({ color: '#1a0f05', width: 300, height: 500, x: width/2, y: height/2 });
  doorOpen.addEffect('fadeIn', 0.3, 0.2);
  scene4.addChild(doorOpen);

  // Bright light from inside
  const innerLight = new FFRect({ color: 'rgba(200, 255, 200, 0.6)', width: 150, height: 450, x: width/2, y: height/2 });
  innerLight.addEffect('fadeIn', 0.8, 0.5);
  scene4.addChild(innerLight);

  // Light rays
  for (let i = 0; i < 5; i++) {
    const ray = new FFRect({ 
      color: 'rgba(150, 255, 150, 0.2)', 
      width: 30 + (i * 20), 
      height: 600, 
      x: width/2 + (i - 2) * 60, 
      y: height/2 
    });
    ray.addEffect('fadeIn', 0.5, 1 + (i * 0.2));
    scene4.addChild(ray);
  }

  // "I'M GOING IN" text
  const goingBox = new FFRect({ color: 'rgba(0,0,0,0.8)', width: 500, height: 100, x: width/2, y: 350 });
  goingBox.addEffect('fadeIn', 0.4, 2);
  scene4.addChild(goingBox);

  const goingText = new FFText({ text: '"I\'m going in..."', x: width/2, y: 350, fontSize: 44 });
  goingText.setColor(COLORS.glitchWhite);
  goingText.alignCenter();
  goingText.addEffect('fadeIn', 0.3, 2.3);
  scene4.addChild(goingText);

  // Heartbeat effect - pulsing red
  const heartbeat1 = new FFRect({ color: 'rgba(255, 0, 0, 0.15)', width: 1100, height: 2000, x: width/2, y: height/2 });
  heartbeat1.addEffect('fadeIn', 0.2, 3);
  heartbeat1.addEffect('fadeOut', 0.3, 3.5);
  scene4.addChild(heartbeat1);

  const heartbeat2 = new FFRect({ color: 'rgba(255, 0, 0, 0.2)', width: 1100, height: 2000, x: width/2, y: height/2 });
  heartbeat2.addEffect('fadeIn', 0.2, 4);
  heartbeat2.addEffect('fadeOut', 0.3, 4.5);
  scene4.addChild(heartbeat2);

  // Static interference increasing
  addSignalNoise(scene4, 3, 'medium');
  addSignalNoise(scene4, 5, 'high');
  addSignalNoise(scene4, 6, 'high');

  // Heavy chromatic aberration
  addChromaticAberration(scene4, 500, 4);
  addChromaticAberration(scene4, 900, 5);
  addChromaticAberration(scene4, 1300, 6);

  // Glitch bars intensifying
  for (let i = 0; i < 6; i++) {
    const glitchY = 400 + (i * 200);
    const glitch = new FFRect({ 
      color: i % 2 === 0 ? COLORS.chromaRed : COLORS.chromaCyan, 
      width: 1080, 
      height: 8 + Math.random() * 15, 
      x: width/2, 
      y: glitchY 
    });
    glitch.addEffect('fadeIn', 0.05, 6.5 + (i * 0.1));
    glitch.addEffect('fadeOut', 0.1, 6.8 + (i * 0.1));
    scene4.addChild(glitch);
  }

  // "SIGNAL LOST" warning
  const signalBox = new FFRect({ color: COLORS.recRed, width: 450, height: 100, x: width/2, y: height/2 + 400 });
  signalBox.addEffect('fadeIn', 0.2, 7);
  signalBox.addEffect('fadeOut', 0.1, 7.5);
  signalBox.addEffect('fadeIn', 0.1, 7.7);
  scene4.addChild(signalBox);

  const signalText = new FFText({ text: '⚠ SIGNAL LOST', x: width/2, y: height/2 + 400, fontSize: 40 });
  signalText.setColor(COLORS.white);
  signalText.alignCenter();
  signalText.addEffect('fadeIn', 0.2, 7.1);
  signalText.addEffect('fadeOut', 0.1, 7.5);
  signalText.addEffect('fadeIn', 0.1, 7.7);
  scene4.addChild(signalText);

  // VHS overlay
  addVHSOverlay(scene4, 'SEPT 13 1994  12:01 AM', true, 0);

  scene4.setTransition('shake', 0.5);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: The Opening - Climax (10s)'));

  // ============================================
  // SCENE 5: END - Static & CTA (7s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.vhsBlack);
  scene5.setDuration(7);

  // Full static background
  const endBg = new FFRect({ color: COLORS.vhsDarkGray, width: 1100, height: 2000, x: width/2, y: height/2 });
  endBg.addEffect('fadeIn', 0.2, 0);
  scene5.addChild(endBg);

  // Heavy static
  addSignalNoise(scene5, 0, 'high');
  addSignalNoise(scene5, 0.3, 'high');

  // "TAPE ENDS" message
  const tapeEndBox = new FFRect({ color: 'rgba(0,0,0,0.8)', width: 500, height: 120, x: width/2, y: 400 });
  tapeEndBox.addEffect('fadeIn', 0.4, 1);
  scene5.addChild(tapeEndBox);

  const tapeEndText = new FFText({ text: '[ TAPE ENDS ]', x: width/2, y: 400, fontSize: 48 });
  tapeEndText.setColor(COLORS.recRed);
  tapeEndText.alignCenter();
  tapeEndText.addEffect('fadeIn', 0.3, 1.3);
  scene5.addChild(tapeEndText);

  // Mystery question
  const mysteryBox = new FFRect({ color: 'rgba(255,255,255,0.1)', width: 800, height: 200, x: width/2, y: 650 });
  mysteryBox.addEffect('fadeIn', 0.5, 2);
  scene5.addChild(mysteryBox);

  const mysteryText1 = new FFText({ text: 'WHAT WAS BEHIND', x: width/2, y: 610, fontSize: 42 });
  mysteryText1.setColor(COLORS.glitchWhite);
  mysteryText1.alignCenter();
  mysteryText1.addEffect('fadeIn', 0.4, 2.3);
  scene5.addChild(mysteryText1);

  const mysteryText2 = new FFText({ text: 'THE DOOR?', x: width/2, y: 680, fontSize: 56 });
  mysteryText2.setColor(COLORS.chromaCyan);
  mysteryText2.alignCenter();
  mysteryText2.addEffect('bounceIn', 0.5, 2.6);
  scene5.addChild(mysteryText2);

  // Series title
  const titleBox = new FFRect({ color: COLORS.recRed, width: 600, height: 100, x: width/2, y: 950 });
  titleBox.addEffect('zoomIn', 0.5, 3);
  scene5.addChild(titleBox);

  const titleText = new FFText({ text: 'VHS INVESTIGATION', x: width/2, y: 950, fontSize: 42 });
  titleText.setColor(COLORS.white);
  titleText.alignCenter();
  titleText.addEffect('fadeIn', 0.3, 3.3);
  scene5.addChild(titleText);

  // Hashtags
  const hashText = new FFText({ text: '#TrueCrime #FoundFootage #Mystery', x: width/2, y: 1100, fontSize: 28 });
  hashText.setColor(COLORS.dimWhite);
  hashText.alignCenter();
  hashText.addEffect('fadeIn', 0.4, 3.8);
  scene5.addChild(hashText);

  // CTA
  const ctaBox = new FFRect({ color: 'rgba(255,255,255,0.15)', width: 700, height: 150, x: width/2, y: 1350 });
  ctaBox.addEffect('fadeIn', 0.4, 4);
  scene5.addChild(ctaBox);

  const ctaText1 = new FFText({ text: '👆 FOLLOW FOR PART 2', x: width/2, y: 1320, fontSize: 36 });
  ctaText1.setColor(COLORS.white);
  ctaText1.alignCenter();
  ctaText1.addEffect('fadeIn', 0.3, 4.3);
  scene5.addChild(ctaText1);

  const ctaText2 = new FFText({ text: '❤️ LIKE  💬 COMMENT', x: width/2, y: 1390, fontSize: 30 });
  ctaText2.setColor(COLORS.dimWhite);
  ctaText2.alignCenter();
  ctaText2.addEffect('fadeIn', 0.3, 4.6);
  scene5.addChild(ctaText2);

  // Story count
  const storyCount = new FFText({ text: 'STORY 10 OF 30', x: width/2, y: 1550, fontSize: 26 });
  storyCount.setColor(COLORS.dimWhite);
  storyCount.alignCenter();
  storyCount.addEffect('fadeIn', 0.4, 5);
  scene5.addChild(storyCount);

  // Final glitch
  addChromaticAberration(scene5, 700, 5.5);

  // VHS overlay (no REC - tape ended)
  addVHSOverlay(scene5, 'SEPT 13 1994  --:-- --', false, 0);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: End - Static & CTA (7s)'));

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
    console.log(colors.magenta('\n🎬 Story 10: "VHS Investigation" complete!\n'));
  });

  creator.start();
}

createVHSInvestigationVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

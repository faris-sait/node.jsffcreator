/**
 * 🎬 STORY 1: "Glitch in the Routine" - VFX Narrative
 * 
 * The Story: A man pours coffee, but as the liquid hits the cup, 
 * it turns into digital pixels. He touches his face, and his hand 
 * "glitches" into a wireframe.
 * 
 * Visual Style:
 * - Cold, sterile kitchen lighting contrasted with vibrant "digital errors"
 * - Data-moshing, RGB Splitting, and Frame Tearing effects
 * - "System Error" UI overlay with flickering warning signs
 * - Hex-code text scrolling vertically
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~60 seconds
 * 
 * Run with: node examples/story-videos/story-01-glitch-routine.js
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
const { FFText, FFRect, FFScene, FFCreator, FFImage } = require('../../');

FFCreator.setFFmpegPath(ffmpegPath);
FFCreator.setFFprobePath(ffprobePath);

const outputDir = path.join(__dirname, '../output/');
const cacheDir = path.join(__dirname, '../cache/');
const assetsDir = path.join(__dirname, './assets/');

// YouTube Shorts dimensions (9:16 vertical)
const width = 1080;
const height = 1920;

// ============================================
// COLOR PALETTE - Glitch Theme
// ============================================
const COLORS = {
  // Base colors
  darkBg: '#0a0a0f',
  coldGray: '#1a1a2e',
  sterileTeal: '#16213e',
  
  // Glitch colors
  glitchCyan: '#00ffff',
  glitchMagenta: '#ff00ff',
  glitchRed: '#ff0040',
  glitchGreen: '#00ff88',
  glitchYellow: '#ffff00',
  
  // UI colors
  warningOrange: '#ff6b35',
  errorRed: '#e74c3c',
  systemBlue: '#3498db',
  matrixGreen: '#00ff41',
  
  // Text colors
  white: '#ffffff',
  dimWhite: '#a0a0a0',
  darkText: '#2c2c2c'
};

// ============================================
// HEX CODE DATA - For scrolling effect
// ============================================
const hexCodes = [
  '0x4F0E23', '0x4F2E9A', '0x052575', '0x4F2E9A',
  '0x0008285', '0x7DE2F8', '0x4F0E0F', '0x0026A3',
  '0x7156E6', '0xF1F29A', '0x636F74', '0xE1F29A',
  '0x007B0F', '0x1456E6', '0x0389E3', '0x4F2E9A',
  '0x443E35', '0x5E0073', '0x00264A', '0x4FB808',
  '0x388810', '0x450550', '0x443E35', '0x4FB808',
  '0x711824c', '0x071824c', '0x007D272', '0x0070F8'
];

// ============================================
// ERROR MESSAGES - For UI overlay
// ============================================
const errorMessages = [
  'SIMULATION_FAILURE',
  'IDENTITY_CORRUPTION',
  'REALITY_BUFFER_OVERFLOW',
  'CONSCIOUSNESS_LEAK',
  'MATRIX_DESTABILIZED',
  'PERCEPTION_ERROR_0x4F2E9A',
  'NEURAL_SYNC_LOST',
  'EXISTENCE_UNDEFINED'
];

async function createGlitchRoutineVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 1: "Glitch in the Routine"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~60 seconds'));
  console.log(colors.yellow('🎨 Theme: VFX Narrative - Digital Glitch\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-01-glitch-routine.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: COLD OPEN - System Initialization (3s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.darkBg);
  scene1.setDuration(3);

  // Dark background with scan lines effect simulation
  const bgOverlay1 = new FFRect({ color: COLORS.coldGray, width: 1100, height: 2000, x: width/2, y: height/2 });
  bgOverlay1.addEffect('fadeIn', 0.3, 0);
  scene1.addChild(bgOverlay1);

  // System boot text
  const bootText1 = new FFText({ text: 'INITIALIZING...', x: width/2, y: height/2 - 100, fontSize: 48 });
  bootText1.setColor(COLORS.matrixGreen);
  bootText1.alignCenter();
  bootText1.addEffect('fadeIn', 0.5, 0.2);
  scene1.addChild(bootText1);

  const bootText2 = new FFText({ text: 'REALITY.EXE', x: width/2, y: height/2, fontSize: 72 });
  bootText2.setColor(COLORS.glitchCyan);
  bootText2.alignCenter();
  bootText2.addEffect('zoomIn', 0.8, 0.5);
  scene1.addChild(bootText2);

  const bootText3 = new FFText({ text: '[LOADING SIMULATION]', x: width/2, y: height/2 + 100, fontSize: 36 });
  bootText3.setColor(COLORS.dimWhite);
  bootText3.alignCenter();
  bootText3.addEffect('fadeIn', 0.5, 1);
  scene1.addChild(bootText3);

  // Progress bar
  const progressBg = new FFRect({ color: COLORS.darkText, width: 600, height: 20, x: width/2, y: height/2 + 200 });
  progressBg.addEffect('fadeIn', 0.3, 1.2);
  scene1.addChild(progressBg);

  const progressFill = new FFRect({ color: COLORS.matrixGreen, width: 20, height: 20, x: width/2 - 290, y: height/2 + 200 });
  progressFill.addEffect('fadeIn', 0.2, 1.3);
  scene1.addChild(progressFill);

  // Hex codes on sides
  for (let i = 0; i < 8; i++) {
    const leftHex = new FFText({ text: hexCodes[i], x: 100, y: 200 + (i * 60), fontSize: 24 });
    leftHex.setColor(COLORS.matrixGreen);
    leftHex.addEffect('fadeIn', 0.2, 0.1 * i);
    scene1.addChild(leftHex);

    const rightHex = new FFText({ text: hexCodes[i + 8], x: width - 100, y: 200 + (i * 60), fontSize: 24 });
    rightHex.setColor(COLORS.glitchCyan);
    rightHex.addEffect('fadeIn', 0.2, 0.1 * i);
    scene1.addChild(rightHex);
  }

  scene1.setTransition('shake', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: System Initialization (3s)'));

  // ============================================
  // SCENE 2: THE MORNING ROUTINE - Main Image (8s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.darkBg);
  scene2.setDuration(8);

  // Main glitch image - the coffee pour scene
  const mainImage = new FFImage({ 
    path: path.join(assetsDir, 'Gemini_Generated_Image_qwa3hzqwa3hzqwa3.png'),
    x: width/2, 
    y: height/2,
    width: 1080,
    height: 1920
  });
  mainImage.addEffect('fadeIn', 1, 0);
  scene2.addChild(mainImage);

  // System Error UI Overlay - Top
  const errorBoxTop = new FFRect({ color: 'rgba(0,0,0,0.8)', width: 500, height: 120, x: width/2 + 100, y: 280 });
  errorBoxTop.addEffect('fadeIn', 0.5, 1);
  scene2.addChild(errorBoxTop);

  const systemErrorText1 = new FFText({ text: '⚠️ SYSTEM ERROR', x: width/2 + 100, y: 250, fontSize: 32 });
  systemErrorText1.setColor(COLORS.errorRed);
  systemErrorText1.alignCenter();
  systemErrorText1.addEffect('fadeIn', 0.3, 1.2);
  scene2.addChild(systemErrorText1);

  const systemErrorText2 = new FFText({ text: 'SYSTEM ERROR', x: width/2 + 100, y: 310, fontSize: 36 });
  systemErrorText2.setColor(COLORS.warningOrange);
  systemErrorText2.alignCenter();
  systemErrorText2.addEffect('bounceIn', 0.5, 1.5);
  scene2.addChild(systemErrorText2);

  // Warning triangle
  const warningIcon = new FFText({ text: '⚠', x: width/2 + 100, y: 380, fontSize: 60 });
  warningIcon.setColor(COLORS.glitchYellow);
  warningIcon.alignCenter();
  warningIcon.addEffect('zoomIn', 0.4, 1.8);
  scene2.addChild(warningIcon);

  // Hex code scrolling text on right side
  const hexScrollBg = new FFRect({ color: 'rgba(0,0,0,0.7)', width: 200, height: 1400, x: width - 110, y: height/2 });
  hexScrollBg.addEffect('fadeIn', 0.3, 0.5);
  scene2.addChild(hexScrollBg);

  // Create scrolling hex codes
  const hexLines = [
    'ERROR:', 'SIMULATION_FAILURE /',
    'IDENTITY_CORRUPTION /',
    '0x052575', '0x4F2E9A', '0x0008285',
    '0x7DE2F8', '0x4F0E0F', '0x0026A3',
    '0x7156E6', '0xF1F29A', '0x636F74',
    '0xE1F29A', '0x007B0F', '0x1456E6',
    '0x0389E3', '0x4F2E9A', '0x443E35',
    '0x5E0073', '0x00264A', '0x4FB808',
    '0x388810', '0x450550', '0x443E35',
    '0x4FB808', '0x711824c', '0x071824c'
  ];

  for (let i = 0; i < hexLines.length && i < 22; i++) {
    const hexLine = new FFText({ 
      text: hexLines[i], 
      x: width - 110, 
      y: 250 + (i * 55), 
      fontSize: 20 
    });
    hexLine.setColor(i < 3 ? COLORS.errorRed : COLORS.matrixGreen);
    hexLine.alignCenter();
    hexLine.addEffect('fadeInDown', 0.3, 0.8 + (i * 0.1));
    scene2.addChild(hexLine);
  }

  // Glitch accent bars
  const glitchBar1 = new FFRect({ color: COLORS.glitchMagenta, width: 1080, height: 8, x: width/2, y: 600 });
  glitchBar1.addEffect('fadeIn', 0.2, 2);
  glitchBar1.addEffect('fadeOut', 0.2, 2.5);
  scene2.addChild(glitchBar1);

  const glitchBar2 = new FFRect({ color: COLORS.glitchCyan, width: 1080, height: 5, x: width/2, y: 1200 });
  glitchBar2.addEffect('fadeIn', 0.2, 3);
  glitchBar2.addEffect('fadeOut', 0.2, 3.5);
  scene2.addChild(glitchBar2);

  const glitchBar3 = new FFRect({ color: COLORS.glitchRed, width: 1080, height: 12, x: width/2, y: 1500 });
  glitchBar3.addEffect('fadeIn', 0.2, 4);
  glitchBar3.addEffect('fadeOut', 0.2, 4.5);
  scene2.addChild(glitchBar3);

  // Story caption
  const captionBg = new FFRect({ color: 'rgba(0,0,0,0.85)', width: 900, height: 180, x: width/2, y: height - 200 });
  captionBg.addEffect('fadeInUp', 0.5, 2);
  scene2.addChild(captionBg);

  const captionText1 = new FFText({ text: 'THE GLITCH', x: width/2, y: height - 240, fontSize: 56 });
  captionText1.setColor(COLORS.glitchCyan);
  captionText1.alignCenter();
  captionText1.addEffect('backInUp', 0.6, 2.3);
  scene2.addChild(captionText1);

  const captionText2 = new FFText({ text: 'IN THE ROUTINE', x: width/2, y: height - 170, fontSize: 56 });
  captionText2.setColor(COLORS.glitchMagenta);
  captionText2.alignCenter();
  captionText2.addEffect('backInUp', 0.6, 2.6);
  scene2.addChild(captionText2);

  scene2.setTransition('slice', 0.6);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: The Morning Routine (8s)'));

  // ============================================
  // SCENE 3: THE REALIZATION - Narrative (8s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.sterileTeal);
  scene3.setDuration(8);

  // Dark gradient background
  const bgGrad3 = new FFRect({ color: COLORS.coldGray, width: 1100, height: 2000, x: width/2, y: height/2 });
  bgGrad3.addEffect('fadeIn', 0.3, 0);
  scene3.addChild(bgGrad3);

  // Story text
  const storyLine1 = new FFText({ text: 'A man pours coffee...', x: width/2, y: 400, fontSize: 52 });
  storyLine1.setColor(COLORS.white);
  storyLine1.alignCenter();
  storyLine1.addEffect('fadeInLeft', 0.6, 0.3);
  scene3.addChild(storyLine1);

  const storyLine2 = new FFText({ text: 'But as the liquid', x: width/2, y: 550, fontSize: 48 });
  storyLine2.setColor(COLORS.dimWhite);
  storyLine2.alignCenter();
  storyLine2.addEffect('fadeInRight', 0.6, 1);
  scene3.addChild(storyLine2);

  const storyLine3 = new FFText({ text: 'hits the cup...', x: width/2, y: 630, fontSize: 48 });
  storyLine3.setColor(COLORS.dimWhite);
  storyLine3.alignCenter();
  storyLine3.addEffect('fadeInRight', 0.6, 1.5);
  scene3.addChild(storyLine3);

  // Emphasis box
  const emphasisBox = new FFRect({ color: COLORS.glitchMagenta, width: 800, height: 150, x: width/2, y: 850 });
  emphasisBox.addEffect('zoomIn', 0.5, 2.2);
  scene3.addChild(emphasisBox);

  const emphasisText = new FFText({ text: 'IT TURNS INTO', x: width/2, y: 820, fontSize: 44 });
  emphasisText.setColor(COLORS.darkBg);
  emphasisText.alignCenter();
  emphasisText.addEffect('bounceIn', 0.5, 2.5);
  scene3.addChild(emphasisText);

  const emphasisText2 = new FFText({ text: 'DIGITAL PIXELS', x: width/2, y: 880, fontSize: 54 });
  emphasisText2.setColor(COLORS.white);
  emphasisText2.alignCenter();
  emphasisText2.addEffect('bounceIn', 0.6, 2.8);
  scene3.addChild(emphasisText2);

  // Pixel effect squares
  const pixelColors = [COLORS.glitchCyan, COLORS.glitchMagenta, COLORS.glitchYellow, COLORS.glitchRed, COLORS.glitchGreen];
  for (let i = 0; i < 25; i++) {
    const px = 150 + (i % 5) * 200;
    const py = 1050 + Math.floor(i / 5) * 80;
    const pixelRect = new FFRect({ 
      color: pixelColors[i % pixelColors.length], 
      width: 40 + Math.random() * 60, 
      height: 40 + Math.random() * 60, 
      x: px, 
      y: py 
    });
    pixelRect.addEffect('zoomIn', 0.3, 3.2 + (i * 0.05));
    scene3.addChild(pixelRect);
  }

  // Bottom narrative
  const narrativeBox = new FFRect({ color: 'rgba(0,0,0,0.8)', width: 950, height: 200, x: width/2, y: height - 250 });
  narrativeBox.addEffect('fadeIn', 0.4, 4);
  scene3.addChild(narrativeBox);

  const narrativeText1 = new FFText({ text: '☕ Reality begins to', x: width/2, y: height - 300, fontSize: 42 });
  narrativeText1.setColor(COLORS.glitchCyan);
  narrativeText1.alignCenter();
  narrativeText1.addEffect('fadeInUp', 0.5, 4.3);
  scene3.addChild(narrativeText1);

  const narrativeText2 = new FFText({ text: 'FRAGMENT', x: width/2, y: height - 230, fontSize: 68 });
  narrativeText2.setColor(COLORS.errorRed);
  narrativeText2.alignCenter();
  narrativeText2.addEffect('bounceIn', 0.6, 4.8);
  scene3.addChild(narrativeText2);

  scene3.setTransition('windowshades', 0.7);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: The Realization (8s)'));

  // ============================================
  // SCENE 4: THE WIREFRAME HAND - Key Visual (10s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.darkBg);
  scene4.setDuration(10);

  // Main image again with different overlay
  const mainImage2 = new FFImage({ 
    path: path.join(assetsDir, 'Gemini_Generated_Image_qwa3hzqwa3hzqwa3.png'),
    x: width/2, 
    y: height/2,
    width: 1080,
    height: 1920
  });
  mainImage2.addEffect('fadeIn', 0.8, 0);
  scene4.addChild(mainImage2);

  // Darker overlay for drama
  const darkOverlay = new FFRect({ color: 'rgba(10,10,15,0.5)', width: 1100, height: 2000, x: width/2, y: height/2 });
  darkOverlay.addEffect('fadeIn', 0.5, 0.5);
  scene4.addChild(darkOverlay);

  // Wireframe indicator
  const wireframeBox = new FFRect({ color: 'rgba(0,255,255,0.3)', width: 350, height: 350, x: 400, y: 750 });
  wireframeBox.addEffect('fadeIn', 0.5, 1);
  scene4.addChild(wireframeBox);

  const wireframeLabel = new FFText({ text: '[ WIREFRAME DETECTED ]', x: 400, y: 580, fontSize: 28 });
  wireframeLabel.setColor(COLORS.glitchCyan);
  wireframeLabel.alignCenter();
  wireframeLabel.addEffect('fadeIn', 0.3, 1.5);
  scene4.addChild(wireframeLabel);

  // Story continuation
  const storyBox4 = new FFRect({ color: 'rgba(0,0,0,0.9)', width: 950, height: 300, x: width/2, y: 1400 });
  storyBox4.addEffect('fadeInUp', 0.5, 2);
  scene4.addChild(storyBox4);

  const story4Line1 = new FFText({ text: 'He touches his face...', x: width/2, y: 1300, fontSize: 46 });
  story4Line1.setColor(COLORS.white);
  story4Line1.alignCenter();
  story4Line1.addEffect('fadeIn', 0.5, 2.3);
  scene4.addChild(story4Line1);

  const story4Line2 = new FFText({ text: 'His hand', x: width/2, y: 1400, fontSize: 52 });
  story4Line2.setColor(COLORS.dimWhite);
  story4Line2.alignCenter();
  story4Line2.addEffect('fadeInLeft', 0.5, 3);
  scene4.addChild(story4Line2);

  const story4Line3 = new FFText({ text: '"GLITCHES"', x: width/2, y: 1480, fontSize: 72 });
  story4Line3.setColor(COLORS.glitchMagenta);
  story4Line3.alignCenter();
  story4Line3.addEffect('bounceIn', 0.8, 3.5);
  scene4.addChild(story4Line3);

  const story4Line4 = new FFText({ text: 'into a WIREFRAME', x: width/2, y: 1570, fontSize: 48 });
  story4Line4.setColor(COLORS.glitchCyan);
  story4Line4.alignCenter();
  story4Line4.addEffect('fadeInRight', 0.5, 4.2);
  scene4.addChild(story4Line4);

  // Glitch scan lines
  for (let i = 0; i < 6; i++) {
    const scanLine = new FFRect({ 
      color: i % 2 === 0 ? COLORS.glitchCyan : COLORS.glitchMagenta, 
      width: 1080, 
      height: 3, 
      x: width/2, 
      y: 200 + (i * 300) 
    });
    scanLine.addEffect('fadeIn', 0.1, 5 + (i * 0.2));
    scanLine.addEffect('fadeOut', 0.1, 5.3 + (i * 0.2));
    scene4.addChild(scanLine);
  }

  // System warnings on screen
  const warningBox1 = new FFRect({ color: 'rgba(231,76,60,0.9)', width: 400, height: 60, x: width/2, y: 180 });
  warningBox1.addEffect('fadeIn', 0.3, 6);
  scene4.addChild(warningBox1);

  const warningText1 = new FFText({ text: '⚠️ IDENTITY_CORRUPTION', x: width/2, y: 180, fontSize: 28 });
  warningText1.setColor(COLORS.white);
  warningText1.alignCenter();
  warningText1.addEffect('fadeIn', 0.2, 6.2);
  scene4.addChild(warningText1);

  scene4.setTransition('shake', 0.6);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: The Wireframe Hand (10s)'));

  // ============================================
  // SCENE 5: SYSTEM ERROR CASCADE (8s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor('#050510');
  scene5.setDuration(8);

  // Dark tech background
  const techBg = new FFRect({ color: COLORS.sterileTeal, width: 1100, height: 2000, x: width/2, y: height/2 });
  techBg.addEffect('fadeIn', 0.3, 0);
  scene5.addChild(techBg);

  // Multiple error boxes cascade
  const errorBoxes = [
    { text: 'ERROR: SIMULATION_FAILURE', y: 300, color: COLORS.errorRed, delay: 0.3 },
    { text: 'WARNING: REALITY_BUFFER_OVERFLOW', y: 420, color: COLORS.warningOrange, delay: 0.6 },
    { text: 'CRITICAL: CONSCIOUSNESS_LEAK', y: 540, color: COLORS.glitchMagenta, delay: 0.9 },
    { text: 'FATAL: MATRIX_DESTABILIZED', y: 660, color: COLORS.glitchRed, delay: 1.2 },
    { text: 'ALERT: PERCEPTION_ERROR', y: 780, color: COLORS.glitchYellow, delay: 1.5 },
    { text: 'SYSTEM: NEURAL_SYNC_LOST', y: 900, color: COLORS.glitchCyan, delay: 1.8 }
  ];

  errorBoxes.forEach((err, index) => {
    const box = new FFRect({ color: 'rgba(0,0,0,0.85)', width: 900, height: 80, x: width/2, y: err.y });
    box.addEffect('fadeInLeft', 0.4, err.delay);
    scene5.addChild(box);

    const text = new FFText({ text: err.text, x: width/2, y: err.y, fontSize: 32 });
    text.setColor(err.color);
    text.alignCenter();
    text.addEffect('fadeIn', 0.3, err.delay + 0.2);
    scene5.addChild(text);
  });

  // Central question
  const questionBox = new FFRect({ color: COLORS.glitchMagenta, width: 800, height: 200, x: width/2, y: 1150 });
  questionBox.addEffect('zoomIn', 0.6, 2.5);
  scene5.addChild(questionBox);

  const questionText1 = new FFText({ text: 'IS THIS', x: width/2, y: 1100, fontSize: 56 });
  questionText1.setColor(COLORS.white);
  questionText1.alignCenter();
  questionText1.addEffect('bounceIn', 0.5, 2.8);
  scene5.addChild(questionText1);

  const questionText2 = new FFText({ text: 'REALITY?', x: width/2, y: 1180, fontSize: 80 });
  questionText2.setColor(COLORS.darkBg);
  questionText2.alignCenter();
  questionText2.addEffect('bounceIn', 0.6, 3.1);
  scene5.addChild(questionText2);

  // Binary rain effect
  const binaryChars = ['0', '1'];
  for (let col = 0; col < 15; col++) {
    for (let row = 0; row < 5; row++) {
      const binary = new FFText({ 
        text: binaryChars[Math.floor(Math.random() * 2)], 
        x: 80 + (col * 70), 
        y: 1400 + (row * 80), 
        fontSize: 36 
      });
      binary.setColor(COLORS.matrixGreen);
      binary.addEffect('fadeInDown', 0.2, 4 + (col * 0.1) + (row * 0.05));
      scene5.addChild(binary);
    }
  }

  scene5.setTransition('circlecrop', 0.6);
  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: System Error Cascade (8s)'));

  // ============================================
  // SCENE 6: THE AWAKENING (8s)
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor(COLORS.darkBg);
  scene6.setDuration(8);

  // Image with heavy glitch overlay
  const mainImage3 = new FFImage({ 
    path: path.join(assetsDir, 'Gemini_Generated_Image_qwa3hzqwa3hzqwa3.png'),
    x: width/2, 
    y: height/2,
    width: 1080,
    height: 1920
  });
  mainImage3.addEffect('fadeIn', 0.5, 0);
  scene6.addChild(mainImage3);

  // RGB split simulation - colored overlays
  const rgbRed = new FFRect({ color: 'rgba(255,0,64,0.15)', width: 1100, height: 2000, x: width/2 - 10, y: height/2 });
  rgbRed.addEffect('fadeIn', 0.3, 0.5);
  scene6.addChild(rgbRed);

  const rgbBlue = new FFRect({ color: 'rgba(0,255,255,0.15)', width: 1100, height: 2000, x: width/2 + 10, y: height/2 });
  rgbBlue.addEffect('fadeIn', 0.3, 0.5);
  scene6.addChild(rgbBlue);

  // Awakening text
  const awakenBox = new FFRect({ color: 'rgba(0,0,0,0.9)', width: 900, height: 350, x: width/2, y: height/2 });
  awakenBox.addEffect('zoomIn', 0.6, 1);
  scene6.addChild(awakenBox);

  const awakenText1 = new FFText({ text: 'THE MOMENT', x: width/2, y: height/2 - 120, fontSize: 48 });
  awakenText1.setColor(COLORS.dimWhite);
  awakenText1.alignCenter();
  awakenText1.addEffect('fadeIn', 0.5, 1.5);
  scene6.addChild(awakenText1);

  const awakenText2 = new FFText({ text: 'YOU REALIZE', x: width/2, y: height/2 - 40, fontSize: 56 });
  awakenText2.setColor(COLORS.white);
  awakenText2.alignCenter();
  awakenText2.addEffect('fadeInLeft', 0.5, 2);
  scene6.addChild(awakenText2);

  const awakenText3 = new FFText({ text: "YOU'RE IN A", x: width/2, y: height/2 + 40, fontSize: 52 });
  awakenText3.setColor(COLORS.glitchCyan);
  awakenText3.alignCenter();
  awakenText3.addEffect('fadeInRight', 0.5, 2.5);
  scene6.addChild(awakenText3);

  const awakenText4 = new FFText({ text: 'SIMULATION', x: width/2, y: height/2 + 130, fontSize: 84 });
  awakenText4.setColor(COLORS.glitchMagenta);
  awakenText4.alignCenter();
  awakenText4.addEffect('bounceIn', 0.8, 3);
  scene6.addChild(awakenText4);

  // Glitch bars
  const bars = [
    { y: 200, color: COLORS.glitchCyan, delay: 4 },
    { y: 500, color: COLORS.glitchMagenta, delay: 4.3 },
    { y: 1400, color: COLORS.glitchRed, delay: 4.6 },
    { y: 1700, color: COLORS.glitchYellow, delay: 4.9 }
  ];

  bars.forEach(bar => {
    const rect = new FFRect({ color: bar.color, width: 1080, height: 8, x: width/2, y: bar.y });
    rect.addEffect('fadeIn', 0.15, bar.delay);
    rect.addEffect('fadeOut', 0.15, bar.delay + 0.3);
    scene6.addChild(rect);
  });

  scene6.setTransition('fastswitch', 0.5);
  creator.addChild(scene6);
  console.log(colors.green('  ✓ Scene 6: The Awakening (8s)'));

  // ============================================
  // SCENE 7: FINAL MESSAGE - CTA (7s)
  // ============================================
  const scene7 = new FFScene();
  scene7.setBgColor('#0a0a0f');
  scene7.setDuration(7);

  // Dramatic background
  const finalBg = new FFRect({ color: COLORS.coldGray, width: 1100, height: 2000, x: width/2, y: height/2 });
  finalBg.addEffect('fadeIn', 0.3, 0);
  scene7.addChild(finalBg);

  // Title
  const finalTitle = new FFText({ text: '🎬 GLITCH IN THE', x: width/2, y: 350, fontSize: 64 });
  finalTitle.setColor(COLORS.glitchCyan);
  finalTitle.alignCenter();
  finalTitle.addEffect('backInDown', 0.8, 0.3);
  scene7.addChild(finalTitle);

  const finalTitle2 = new FFText({ text: 'ROUTINE', x: width/2, y: 440, fontSize: 84 });
  finalTitle2.setColor(COLORS.glitchMagenta);
  finalTitle2.alignCenter();
  finalTitle2.addEffect('backInDown', 0.8, 0.6);
  scene7.addChild(finalTitle2);

  // Separator
  const separator = new FFRect({ color: COLORS.white, width: 600, height: 4, x: width/2, y: 550 });
  separator.addEffect('zoomIn', 0.5, 1);
  scene7.addChild(separator);

  // Hashtags
  const hashtag1 = new FFText({ text: '#VFXNarrative', x: width/2, y: 650, fontSize: 42 });
  hashtag1.setColor(COLORS.systemBlue);
  hashtag1.alignCenter();
  hashtag1.addEffect('fadeInUp', 0.4, 1.3);
  scene7.addChild(hashtag1);

  const hashtag2 = new FFText({ text: '#GlitchArt #Simulation', x: width/2, y: 720, fontSize: 38 });
  hashtag2.setColor(COLORS.glitchGreen);
  hashtag2.alignCenter();
  hashtag2.addEffect('fadeInUp', 0.4, 1.6);
  scene7.addChild(hashtag2);

  // CTA Box
  const ctaBox = new FFRect({ color: COLORS.glitchMagenta, width: 800, height: 200, x: width/2, y: 950 });
  ctaBox.addEffect('zoomIn', 0.6, 2);
  scene7.addChild(ctaBox);

  const ctaText1 = new FFText({ text: '👆 FOLLOW FOR MORE', x: width/2, y: 910, fontSize: 44 });
  ctaText1.setColor(COLORS.white);
  ctaText1.alignCenter();
  ctaText1.addEffect('bounceIn', 0.5, 2.3);
  scene7.addChild(ctaText1);

  const ctaText2 = new FFText({ text: 'VISUAL STORIES', x: width/2, y: 980, fontSize: 52 });
  ctaText2.setColor(COLORS.darkBg);
  ctaText2.alignCenter();
  ctaText2.addEffect('bounceIn', 0.5, 2.6);
  scene7.addChild(ctaText2);

  // Like & Share
  const likeShare = new FFText({ text: '❤️ LIKE  💬 COMMENT  🔄 SHARE', x: width/2, y: 1150, fontSize: 36 });
  likeShare.setColor(COLORS.white);
  likeShare.alignCenter();
  likeShare.addEffect('fadeIn', 0.5, 3);
  scene7.addChild(likeShare);

  // Story count
  const storyCount = new FFText({ text: 'STORY 1 OF 30', x: width/2, y: 1300, fontSize: 32 });
  storyCount.setColor(COLORS.dimWhite);
  storyCount.alignCenter();
  storyCount.addEffect('fadeIn', 0.5, 3.5);
  scene7.addChild(storyCount);

  // Decorative elements at bottom
  const techLine1 = new FFRect({ color: COLORS.glitchCyan, width: 400, height: 3, x: 300, y: 1500 });
  techLine1.addEffect('fadeInLeft', 0.4, 4);
  scene7.addChild(techLine1);

  const techLine2 = new FFRect({ color: COLORS.glitchMagenta, width: 400, height: 3, x: 780, y: 1500 });
  techLine2.addEffect('fadeInRight', 0.4, 4);
  scene7.addChild(techLine2);

  // Final hex codes decoration
  for (let i = 0; i < 5; i++) {
    const hexLeft = new FFText({ text: hexCodes[i], x: 100, y: 1600 + (i * 50), fontSize: 22 });
    hexLeft.setColor(COLORS.matrixGreen);
    hexLeft.addEffect('fadeIn', 0.2, 4.5 + (i * 0.1));
    scene7.addChild(hexLeft);

    const hexRight = new FFText({ text: hexCodes[i + 5], x: width - 100, y: 1600 + (i * 50), fontSize: 22 });
    hexRight.setColor(COLORS.glitchCyan);
    hexRight.addEffect('fadeIn', 0.2, 4.5 + (i * 0.1));
    scene7.addChild(hexRight);
  }

  creator.addChild(scene7);
  console.log(colors.green('  ✓ Scene 7: Final Message & CTA (7s)'));

  // ============================================
  // SCENE 8: END CARD (5s)
  // ============================================
  const scene8 = new FFScene();
  scene8.setBgColor('#000000');
  scene8.setDuration(5);

  // Minimal end card
  const endBg = new FFRect({ color: COLORS.darkBg, width: 1100, height: 2000, x: width/2, y: height/2 });
  endBg.addEffect('fadeIn', 0.3, 0);
  scene8.addChild(endBg);

  const endLogo = new FFText({ text: '⚡', x: width/2, y: height/2 - 150, fontSize: 120 });
  endLogo.setColor(COLORS.glitchCyan);
  endLogo.alignCenter();
  endLogo.addEffect('zoomIn', 0.8, 0.3);
  scene8.addChild(endLogo);

  const endText1 = new FFText({ text: 'WHAT IF', x: width/2, y: height/2, fontSize: 64 });
  endText1.setColor(COLORS.white);
  endText1.alignCenter();
  endText1.addEffect('fadeIn', 0.5, 0.8);
  scene8.addChild(endText1);

  const endText2 = new FFText({ text: "EVERYTHING YOU KNOW", x: width/2, y: height/2 + 80, fontSize: 42 });
  endText2.setColor(COLORS.dimWhite);
  endText2.alignCenter();
  endText2.addEffect('fadeInUp', 0.5, 1.3);
  scene8.addChild(endText2);

  const endText3 = new FFText({ text: 'IS A SIMULATION?', x: width/2, y: height/2 + 160, fontSize: 52 });
  endText3.setColor(COLORS.glitchMagenta);
  endText3.alignCenter();
  endText3.addEffect('fadeInUp', 0.5, 1.8);
  scene8.addChild(endText3);

  // End screen branding
  const brandText = new FFText({ text: '[ END OF TRANSMISSION ]', x: width/2, y: height - 200, fontSize: 28 });
  brandText.setColor(COLORS.matrixGreen);
  brandText.alignCenter();
  brandText.addEffect('fadeIn', 0.5, 3);
  scene8.addChild(brandText);

  creator.addChild(scene8);
  console.log(colors.green('  ✓ Scene 8: End Card (5s)'));

  // ============================================
  // RENDER VIDEO
  // ============================================
  console.log(colors.yellow('\n📹 Starting video render...'));
  console.log(colors.cyan('  Total Duration: ~60 seconds'));
  console.log(colors.cyan('  Scenes: 8'));

  creator.on('start', () => {
    console.log(colors.green('\n🎬 Video creation started!'));
  });

  creator.on('progress', (e) => {
    const percent = (e.percent * 100).toFixed(1);
    process.stdout.write(`\r  ⏳ Rendering: ${percent}%`);
  });

  creator.on('complete', (e) => {
    console.log(colors.green(`\n\n✅ Video created successfully!`));
    console.log(colors.cyan(`📁 Output: ${e.output}`));
    console.log(colors.magenta('\n🎉 Story 1: "Glitch in the Routine" complete!\n'));
  });

  creator.on('error', (e) => {
    console.log(colors.red(`\n❌ Error: ${e.error}`));
  });

  creator.start();
}

// Run the video creation
createGlitchRoutineVideo();

module.exports = { createGlitchRoutineVideo };

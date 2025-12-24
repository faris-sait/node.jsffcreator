/**
 * 🎬 STORY 22: "Object Tracking Factoid" - Educational
 * 
 * The Story: Pointing out the features of a new NASA spacesuit 
 * with digital tracking lines and floating call-outs.
 * 
 * Visual Style:
 * - Sci-fi, clean, industrial aesthetic
 * - Point tracking with anchored lines
 * - Floating call-out boxes
 * - Glow effects and digital overlays
 * - Technical HUD interface
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~45 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-22-spacesuit-tracking.js
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
// COLOR PALETTE - Sci-Fi/NASA Theme
// ============================================
const COLORS = {
  // Background
  spaceDark: '#0a0e1a',
  deepSpace: '#050810',
  industrialGray: '#1a1f2e',
  
  // NASA/Tech colors
  nasaBlue: '#0b3d91',
  nasaRed: '#fc3d21',
  techCyan: '#00d9ff',
  techBlue: '#0099ff',
  neonGreen: '#00ff88',
  
  // Glow effects
  glowCyan: 'rgba(0, 217, 255, 0.6)',
  glowBlue: 'rgba(0, 153, 255, 0.5)',
  glowGreen: 'rgba(0, 255, 136, 0.4)',
  
  // UI elements
  hudWhite: '#ffffff',
  hudGray: '#a0a0a0',
  hudDark: '#2d3748',
  
  // Accent
  warningOrange: '#ff9500',
  successGreen: '#00ff88',
  infoBlue: '#00d9ff'
};

// ============================================
// HELPER: Add Tracking Line
// ============================================
function addTrackingLine(scene, startX, startY, endX, endY, color, delay = 0) {
  const lineLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const angle = Math.atan2(endY - startY, endX - startX);
  const midX = startX + Math.cos(angle) * lineLength / 2;
  const midY = startY + Math.sin(angle) * lineLength / 2;
  
  // Main tracking line
  const line = new FFRect({ 
    color: color, 
    width: lineLength, 
    height: 2, 
    x: midX, 
    y: midY 
  });
  line.addEffect('fadeIn', 0.3, delay);
  scene.addChild(line);
  
  // Start point glow
  const startGlow = new FFRect({ 
    color: color, 
    width: 12, 
    height: 12, 
    x: startX, 
    y: startY 
  });
  startGlow.addEffect('zoomIn', 0.2, delay + 0.1);
  scene.addChild(startGlow);
  
  // End point marker
  const endMarker = new FFRect({ 
    color: color, 
    width: 8, 
    height: 8, 
    x: endX, 
    y: endY 
  });
  endMarker.addEffect('bounceIn', 0.2, delay + 0.2);
  scene.addChild(endMarker);
}

// ============================================
// HELPER: Add Call-out Box
// ============================================
function addCallout(scene, title, description, x, y, color, delay = 0) {
  // Call-out background
  const calloutBg = new FFRect({ 
    color: 'rgba(10, 14, 26, 0.9)', 
    width: 400, 
    height: 120, 
    x: x, 
    y: y 
  });
  calloutBg.addEffect('fadeIn', 0.3, delay);
  scene.addChild(calloutBg);
  
  // Border
  const border = new FFRect({ 
    color: color, 
    width: 404, 
    height: 124, 
    x: x, 
    y: y 
  });
  border.addEffect('zoomIn', 0.2, delay + 0.1);
  scene.addChild(border);
  
  // Title
  const titleText = new FFText({ text: title, x: x, y: y - 30, fontSize: 28 });
  titleText.setColor(color);
  titleText.alignCenter();
  titleText.addEffect('fadeIn', 0.2, delay + 0.2);
  scene.addChild(titleText);
  
  // Description
  const descText = new FFText({ text: description, x: x, y: y + 15, fontSize: 20 });
  descText.setColor(COLORS.hudGray);
  descText.alignCenter();
  descText.addEffect('fadeIn', 0.2, delay + 0.3);
  scene.addChild(descText);
}

// ============================================
// HELPER: Add HUD Corner Elements
// ============================================
function addHUDCorners(scene, delay = 0) {
  const cornerSize = 40;
  const cornerThickness = 3;
  
  // Top-left
  const tl1 = new FFRect({ color: COLORS.techCyan, width: cornerSize, height: cornerThickness, x: 70, y: 100 });
  tl1.addEffect('fadeInLeft', 0.3, delay);
  scene.addChild(tl1);
  const tl2 = new FFRect({ color: COLORS.techCyan, width: cornerThickness, height: cornerSize, x: 52, y: 118 });
  tl2.addEffect('fadeInDown', 0.3, delay);
  scene.addChild(tl2);
  
  // Top-right
  const tr1 = new FFRect({ color: COLORS.techCyan, width: cornerSize, height: cornerThickness, x: width - 70, y: 100 });
  tr1.addEffect('fadeInRight', 0.3, delay);
  scene.addChild(tr1);
  const tr2 = new FFRect({ color: COLORS.techCyan, width: cornerThickness, height: cornerSize, x: width - 52, y: 118 });
  tr2.addEffect('fadeInDown', 0.3, delay);
  scene.addChild(tr2);
  
  // Bottom-left
  const bl1 = new FFRect({ color: COLORS.techCyan, width: cornerSize, height: cornerThickness, x: 70, y: height - 100 });
  bl1.addEffect('fadeInLeft', 0.3, delay);
  scene.addChild(bl1);
  const bl2 = new FFRect({ color: COLORS.techCyan, width: cornerThickness, height: cornerSize, x: 52, y: height - 118 });
  bl2.addEffect('fadeInUp', 0.3, delay);
  scene.addChild(bl2);
  
  // Bottom-right
  const br1 = new FFRect({ color: COLORS.techCyan, width: cornerSize, height: cornerThickness, x: width - 70, y: height - 100 });
  br1.addEffect('fadeInRight', 0.3, delay);
  scene.addChild(br1);
  const br2 = new FFRect({ color: COLORS.techCyan, width: cornerThickness, height: cornerSize, x: width - 52, y: height - 118 });
  br2.addEffect('fadeInUp', 0.3, delay);
  scene.addChild(br2);
}

// ============================================
// HELPER: Add Scan Line Effect
// ============================================
function addScanLine(scene, y, delay = 0) {
  const scanLine = new FFRect({ 
    color: COLORS.techCyan, 
    width: 1080, 
    height: 2, 
    x: width/2, 
    y: y 
  });
  scanLine.addEffect('fadeIn', 0.1, delay);
  scanLine.addEffect('fadeOut', 0.2, delay + 0.5);
  scene.addChild(scanLine);
  
  // Glow
  const scanGlow = new FFRect({ 
    color: COLORS.glowCyan, 
    width: 1080, 
    height: 20, 
    x: width/2, 
    y: y 
  });
  scanGlow.addEffect('fadeIn', 0.1, delay);
  scanGlow.addEffect('fadeOut', 0.2, delay + 0.5);
  scene.addChild(scanGlow);
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createSpacesuitTrackingVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 22: "Object Tracking Factoid"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~45 seconds'));
  console.log(colors.yellow('🎨 Theme: Educational - NASA Spacesuit\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-22-spacesuit-tracking.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: INTRO - System Boot (9s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.deepSpace);
  scene1.setDuration(9);

  // Background grid
  for (let i = 0; i < 20; i++) {
    const gridLine = new FFRect({ 
      color: 'rgba(0, 217, 255, 0.1)', 
      width: 1080, 
      height: 1, 
      x: width/2, 
      y: 100 + (i * 90) 
    });
    gridLine.addEffect('fadeIn', 0.2, 0.5 + (i * 0.02));
    scene1.addChild(gridLine);
  }

  // HUD corners
  addHUDCorners(scene1, 0.8);

  // System boot text
  const bootText1 = new FFText({ text: 'INITIALIZING ANALYSIS SYSTEM', x: width/2, y: 400, fontSize: 32 });
  bootText1.setColor(COLORS.techCyan);
  bootText1.alignCenter();
  bootText1.addEffect('fadeIn', 0.4, 1.2);
  scene1.addChild(bootText1);

  // Loading bar
  const loadBg = new FFRect({ color: COLORS.hudDark, width: 600, height: 20, x: width/2, y: 500 });
  loadBg.addEffect('fadeIn', 0.3, 1.6);
  scene1.addChild(loadBg);

  const loadFill = new FFRect({ color: COLORS.techCyan, width: 580, height: 16, x: width/2, y: 500 });
  loadFill.addEffect('fadeIn', 1, 1.8);
  scene1.addChild(loadFill);

  // Status
  const statusText = new FFText({ text: '[ SYSTEM READY ]', x: width/2, y: 580, fontSize: 28 });
  statusText.setColor(COLORS.neonGreen);
  statusText.alignCenter();
  statusText.addEffect('fadeIn', 0.3, 3);
  scene1.addChild(statusText);

  // Title
  const titleBox = new FFRect({ color: 'rgba(11, 61, 145, 0.3)', width: 850, height: 250, x: width/2, y: 850 });
  titleBox.addEffect('zoomIn', 0.5, 3.5);
  scene1.addChild(titleBox);

  const title1 = new FFText({ text: 'NASA', x: width/2, y: 780, fontSize: 80 });
  title1.setColor(COLORS.nasaBlue);
  title1.alignCenter();
  title1.addEffect('backInDown', 0.5, 4);
  scene1.addChild(title1);

  const title2 = new FFText({ text: 'SPACESUIT', x: width/2, y: 880, fontSize: 70 });
  title2.setColor(COLORS.hudWhite);
  title2.alignCenter();
  title2.addEffect('fadeIn', 0.4, 4.3);
  scene1.addChild(title2);

  const title3 = new FFText({ text: 'ANALYSIS', x: width/2, y: 960, fontSize: 60 });
  title3.setColor(COLORS.techCyan);
  title3.alignCenter();
  title3.addEffect('fadeIn', 0.4, 4.6);
  scene1.addChild(title3);

  // Subtitle
  const subtitle = new FFText({ text: 'Next Generation EVA Technology', x: width/2, y: 1100, fontSize: 32 });
  subtitle.setColor(COLORS.hudGray);
  subtitle.alignCenter();
  subtitle.addEffect('fadeInUp', 0.5, 5.5);
  scene1.addChild(subtitle);

  // Scan lines
  for (let i = 0; i < 5; i++) {
    addScanLine(scene1, 300 + (i * 300), 6 + (i * 0.3));
  }

  scene1.setTransition('fade', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Intro - System Boot (9s)'));

  // ============================================
  // SCENE 2: HELMET - Life Support System (9s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.spaceDark);
  scene2.setDuration(9);

  // HUD corners
  addHUDCorners(scene2, 0.2);

  // Scene title
  const sceneTitle = new FFText({ text: 'HELMET ANALYSIS', x: width/2, y: 150, fontSize: 40 });
  sceneTitle.setColor(COLORS.techCyan);
  sceneTitle.alignCenter();
  sceneTitle.addEffect('fadeInDown', 0.4, 0.5);
  scene2.addChild(sceneTitle);

  // Helmet representation
  const helmetOuter = new FFRect({ color: COLORS.hudWhite, width: 500, height: 500, x: width/2, y: 600 });
  helmetOuter.addEffect('zoomIn', 0.6, 1);
  scene2.addChild(helmetOuter);

  const helmetInner = new FFRect({ color: COLORS.industrialGray, width: 450, height: 450, x: width/2, y: 600 });
  helmetInner.addEffect('fadeIn', 0.4, 1.3);
  scene2.addChild(helmetInner);

  // Visor
  const visor = new FFRect({ color: COLORS.techBlue, width: 380, height: 280, x: width/2, y: 580 });
  visor.addEffect('fadeIn', 0.5, 1.6);
  scene2.addChild(visor);

  // Visor reflection
  const visorReflect = new FFRect({ color: COLORS.glowCyan, width: 150, height: 100, x: width/2 - 80, y: 520 });
  visorReflect.addEffect('fadeIn', 0.3, 2);
  scene2.addChild(visorReflect);

  // Feature 1: Visor
  addTrackingLine(scene2, width/2 - 100, 550, 200, 400, COLORS.techCyan, 2.5);
  addCallout(scene2, 'GOLD-COATED VISOR', 'Blocks harmful radiation', 200, 350, COLORS.techCyan, 3);

  // Feature 2: Communication
  addTrackingLine(scene2, width/2 + 150, 650, 880, 550, COLORS.neonGreen, 3.5);
  addCallout(scene2, 'COMM SYSTEM', 'Multi-channel radio', 880, 500, COLORS.neonGreen, 4);

  // Feature 3: Oxygen
  addTrackingLine(scene2, width/2, 750, 200, 900, COLORS.warningOrange, 4.5);
  addCallout(scene2, 'O₂ SUPPLY PORT', '8-hour life support', 200, 950, COLORS.warningOrange, 5);

  // Stats box
  const statsBox = new FFRect({ color: 'rgba(0, 217, 255, 0.2)', width: 700, height: 200, x: width/2, y: 1350 });
  statsBox.addEffect('fadeIn', 0.4, 5.5);
  scene2.addChild(statsBox);

  const stats = [
    { text: 'Weight: 3.4 kg', y: 1290 },
    { text: 'Pressure: 4.3 psi', y: 1350 },
    { text: 'Temperature: -156°C to 121°C', y: 1410 }
  ];

  stats.forEach((stat, i) => {
    const statText = new FFText({ text: stat.text, x: width/2, y: stat.y, fontSize: 28 });
    statText.setColor(COLORS.hudWhite);
    statText.alignCenter();
    statText.addEffect('fadeIn', 0.3, 6 + (i * 0.2));
    scene2.addChild(statText);
  });

  scene2.setTransition('directionalwarp', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Helmet - Life Support System (9s)'));

  // ============================================
  // SCENE 3: TORSO - Portable Life Support (9s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.spaceDark);
  scene3.setDuration(9);

  // HUD corners
  addHUDCorners(scene3, 0.2);

  // Scene title
  const sceneTitle2 = new FFText({ text: 'TORSO UNIT ANALYSIS', x: width/2, y: 150, fontSize: 40 });
  sceneTitle2.setColor(COLORS.neonGreen);
  sceneTitle2.alignCenter();
  sceneTitle2.addEffect('fadeInDown', 0.4, 0.5);
  scene3.addChild(sceneTitle2);

  // Torso/PLSS representation
  const torsoMain = new FFRect({ color: COLORS.hudWhite, width: 600, height: 800, x: width/2, y: 750 });
  torsoMain.addEffect('zoomIn', 0.6, 1);
  scene3.addChild(torsoMain);

  const torsoInner = new FFRect({ color: COLORS.industrialGray, width: 550, height: 750, x: width/2, y: 750 });
  torsoInner.addEffect('fadeIn', 0.4, 1.3);
  scene3.addChild(torsoInner);

  // Backpack (PLSS)
  const plss = new FFRect({ color: COLORS.nasaBlue, width: 400, height: 500, x: width/2, y: 750 });
  plss.addEffect('fadeIn', 0.5, 1.6);
  scene3.addChild(plss);

  // Control panel
  const controlPanel = new FFRect({ color: COLORS.techCyan, width: 200, height: 150, x: width/2, y: 550 });
  controlPanel.addEffect('zoomIn', 0.4, 2);
  scene3.addChild(controlPanel);

  // Feature 1: PLSS
  addTrackingLine(scene3, width/2 - 150, 700, 200, 600, COLORS.neonGreen, 2.5);
  addCallout(scene3, 'PLSS BACKPACK', 'Portable Life Support', 200, 550, COLORS.neonGreen, 3);

  // Feature 2: Battery
  addTrackingLine(scene3, width/2 + 150, 850, 880, 750, COLORS.warningOrange, 3.5);
  addCallout(scene3, 'BATTERY PACK', '8-hour power supply', 880, 700, COLORS.warningOrange, 4);

  // Feature 3: Cooling
  addTrackingLine(scene3, width/2, 1000, 200, 1150, COLORS.techBlue, 4.5);
  addCallout(scene3, 'COOLING SYSTEM', 'Liquid cooling garment', 200, 1200, COLORS.techBlue, 5);

  // Specs
  const specsBox = new FFRect({ color: 'rgba(0, 255, 136, 0.2)', width: 700, height: 180, x: width/2, y: 1500 });
  specsBox.addEffect('fadeIn', 0.4, 5.5);
  scene3.addChild(specsBox);

  const specs = [
    { text: 'O₂ Tank: 1.2 kg capacity', y: 1450 },
    { text: 'Water: 3.8 liters', y: 1510 },
    { text: 'Total Weight: 57 kg', y: 1570 }
  ];

  specs.forEach((spec, i) => {
    const specText = new FFText({ text: spec.text, x: width/2, y: spec.y, fontSize: 26 });
    specText.setColor(COLORS.hudWhite);
    specText.alignCenter();
    specText.addEffect('fadeIn', 0.3, 6 + (i * 0.2));
    scene3.addChild(specText);
  });

  scene3.setTransition('crosswarp', 0.5);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Torso - Portable Life Support (9s)'));

  // ============================================
  // SCENE 4: GLOVES - Dexterity & Protection (9s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.spaceDark);
  scene4.setDuration(9);

  // HUD corners
  addHUDCorners(scene4, 0.2);

  // Scene title
  const sceneTitle3 = new FFText({ text: 'GLOVE ANALYSIS', x: width/2, y: 150, fontSize: 40 });
  sceneTitle3.setColor(COLORS.warningOrange);
  sceneTitle3.alignCenter();
  sceneTitle3.addEffect('fadeInDown', 0.4, 0.5);
  scene4.addChild(sceneTitle3);

  // Left glove
  const gloveLeft = new FFRect({ color: COLORS.hudWhite, width: 250, height: 400, x: 300, y: 650 });
  gloveLeft.addEffect('fadeInLeft', 0.6, 1);
  scene4.addChild(gloveLeft);

  const gloveLeftInner = new FFRect({ color: COLORS.industrialGray, width: 220, height: 370, x: 300, y: 650 });
  gloveLeftInner.addEffect('fadeIn', 0.4, 1.3);
  scene4.addChild(gloveLeftInner);

  // Right glove
  const gloveRight = new FFRect({ color: COLORS.hudWhite, width: 250, height: 400, x: 780, y: 650 });
  gloveRight.addEffect('fadeInRight', 0.6, 1.2);
  scene4.addChild(gloveRight);

  const gloveRightInner = new FFRect({ color: COLORS.industrialGray, width: 220, height: 370, x: 780, y: 650 });
  gloveRightInner.addEffect('fadeIn', 0.4, 1.5);
  scene4.addChild(gloveRightInner);

  // Fingers detail
  for (let i = 0; i < 5; i++) {
    const finger = new FFRect({ 
      color: COLORS.techCyan, 
      width: 30, 
      height: 120, 
      x: 200 + (i * 40), 
      y: 550 
    });
    finger.addEffect('fadeInDown', 0.3, 1.8 + (i * 0.1));
    scene4.addChild(finger);
  }

  // Feature 1: Fingertips
  addTrackingLine(scene4, 300, 500, 200, 350, COLORS.techCyan, 2.5);
  addCallout(scene4, 'SILICONE TIPS', 'Enhanced grip & feel', 200, 300, COLORS.techCyan, 3);

  // Feature 2: Heating
  addTrackingLine(scene4, 780, 700, 880, 550, COLORS.warningOrange, 3.5);
  addCallout(scene4, 'HEATING ELEMENTS', 'Prevents freezing', 880, 500, COLORS.warningOrange, 4);

  // Feature 3: Pressure seal
  addTrackingLine(scene4, width/2, 850, 200, 1000, COLORS.neonGreen, 4.5);
  addCallout(scene4, 'PRESSURE SEAL', 'Airtight connection', 200, 1050, COLORS.neonGreen, 5);

  // Lower section - boots preview
  const bootsPreview = new FFRect({ color: COLORS.hudDark, width: 700, height: 300, x: width/2, y: 1400 });
  bootsPreview.addEffect('fadeIn', 0.4, 5.5);
  scene4.addChild(bootsPreview);

  const bootText = new FFText({ text: 'NEXT: BOOTS', x: width/2, y: 1300, fontSize: 36 });
  bootText.setColor(COLORS.techBlue);
  bootText.alignCenter();
  bootText.addEffect('fadeIn', 0.3, 6);
  scene4.addChild(bootText);

  // Boot icons
  const boot1 = new FFText({ text: '👢', x: width/2 - 100, y: 1400, fontSize: 80 });
  boot1.addEffect('bounceIn', 0.4, 6.5);
  scene4.addChild(boot1);

  const boot2 = new FFText({ text: '👢', x: width/2 + 100, y: 1400, fontSize: 80 });
  boot2.addEffect('bounceIn', 0.4, 6.7);
  scene4.addChild(boot2);

  scene4.setTransition('slice', 0.5);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Gloves - Dexterity & Protection (9s)'));

  // ============================================
  // SCENE 5: SUMMARY - Complete System (9s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.deepSpace);
  scene5.setDuration(9);

  // HUD corners
  addHUDCorners(scene5, 0.2);

  // Full suit silhouette
  const suitFull = new FFRect({ color: COLORS.industrialGray, width: 500, height: 1200, x: width/2, y: 800 });
  suitFull.addEffect('zoomIn', 0.7, 0.5);
  scene5.addChild(suitFull);

  // Helmet
  const fullHelmet = new FFRect({ color: COLORS.hudWhite, width: 200, height: 200, x: width/2, y: 350 });
  fullHelmet.addEffect('fadeIn', 0.4, 1.2);
  scene5.addChild(fullHelmet);

  // Visor glow
  const fullVisor = new FFRect({ color: COLORS.techBlue, width: 160, height: 100, x: width/2, y: 350 });
  fullVisor.addEffect('fadeIn', 0.3, 1.5);
  scene5.addChild(fullVisor);

  // Title
  const summaryTitle = new FFText({ text: 'COMPLETE SYSTEM', x: width/2, y: 150, fontSize: 50 });
  summaryTitle.setColor(COLORS.techCyan);
  summaryTitle.alignCenter();
  summaryTitle.addEffect('backInDown', 0.5, 1.8);
  scene5.addChild(summaryTitle);

  // Key stats
  const keyStats = [
    { icon: '🛡️', text: 'Radiation Protection', y: 1500, color: COLORS.techCyan },
    { icon: '❄️', text: 'Thermal Control', y: 1580, color: COLORS.techBlue },
    { icon: '💨', text: 'Pressurized System', y: 1660, color: COLORS.neonGreen },
    { icon: '🔋', text: '8-Hour Mission', y: 1740, color: COLORS.warningOrange }
  ];

  keyStats.forEach((stat, i) => {
    const statIcon = new FFText({ text: stat.icon, x: 200, y: stat.y, fontSize: 40 });
    statIcon.setAnchor(0, 0.5);
    statIcon.addEffect('bounceIn', 0.3, 3 + (i * 0.3));
    scene5.addChild(statIcon);

    const statText = new FFText({ text: stat.text, x: 280, y: stat.y, fontSize: 32 });
    statText.setColor(stat.color);
    statText.setAnchor(0, 0.5);
    statText.addEffect('fadeInLeft', 0.3, 3.2 + (i * 0.3));
    scene5.addChild(statText);
  });

  // CTA Box
  const ctaBox = new FFRect({ color: COLORS.nasaBlue, width: 750, height: 150, x: width/2, y: 250 });
  ctaBox.addEffect('zoomIn', 0.5, 5);
  scene5.addChild(ctaBox);

  const ctaText1 = new FFText({ text: '👆 FOLLOW FOR MORE', x: width/2, y: 220, fontSize: 38 });
  ctaText1.setColor(COLORS.hudWhite);
  ctaText1.alignCenter();
  ctaText1.addEffect('bounceIn', 0.4, 5.5);
  scene5.addChild(ctaText1);

  const ctaText2 = new FFText({ text: 'SPACE TECH', x: width/2, y: 280, fontSize: 42 });
  ctaText2.setColor(COLORS.techCyan);
  ctaText2.alignCenter();
  ctaText2.addEffect('fadeIn', 0.3, 5.8);
  scene5.addChild(ctaText2);

  // Hashtags
  const hashtags = new FFText({ text: '#NASA #SpaceTech #Engineering', x: width/2, y: 1850, fontSize: 26 });
  hashtags.setColor(COLORS.hudGray);
  hashtags.alignCenter();
  hashtags.addEffect('fadeIn', 0.4, 6.5);
  scene5.addChild(hashtags);

  // Scan effect
  for (let i = 0; i < 8; i++) {
    addScanLine(scene5, 300 + (i * 200), 2 + (i * 0.2));
  }

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Summary - Complete System (9s)'));

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
    console.log(colors.magenta('\n🎬 Story 22: "Object Tracking Factoid" complete!\n'));
  });

  creator.start();
}

createSpacesuitTrackingVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

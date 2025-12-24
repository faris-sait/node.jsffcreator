/**
 * 🎬 STORY 11: "X-Ray Tech Breakdown" - Visualization
 * 
 * The Story: A camera pans over a luxury watch, and an "X-ray" beam 
 * follows it, revealing the gears inside.
 * 
 * Visual Style:
 * - Dark, metallic, high-tech aesthetic
 * - Mask tracking simulation with scanning bar
 * - Blending modes (Screen/Add) effect
 * - Blueprint/wireframe overlay
 * - Scanning bar that reveals internal components
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~45 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-11-xray-tech.js
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
// COLOR PALETTE - High-Tech/X-Ray Theme
// ============================================
const COLORS = {
  // Dark metallic base
  darkBg: '#0a0a0f',
  metalDark: '#1a1a24',
  metalMid: '#2a2a3a',
  metalLight: '#3a3a4a',
  
  // Blueprint/X-Ray colors
  xrayBlue: '#00a8ff',
  xrayCyan: '#00ffff',
  xrayLight: '#80d4ff',
  blueprintBlue: '#0066cc',
  gridBlue: '#003366',
  
  // Scan/Glow effects
  scanGreen: '#00ff88',
  scanWhite: '#ffffff',
  glowCyan: 'rgba(0, 255, 255, 0.4)',
  glowBlue: 'rgba(0, 168, 255, 0.3)',
  
  // Accent colors
  goldAccent: '#ffd700',
  silverAccent: '#c0c0c0',
  copperAccent: '#b87333',
  
  // Text
  white: '#ffffff',
  dimWhite: '#a0a0a0',
  techGreen: '#00ff66'
};

// ============================================
// HELPER: Add blueprint grid overlay
// ============================================
function addBlueprintGrid(scene, delay = 0) {
  // Horizontal grid lines
  for (let i = 0; i < 20; i++) {
    const hLine = new FFRect({ 
      color: COLORS.gridBlue, 
      width: 1080, 
      height: 1, 
      x: width/2, 
      y: 100 + (i * 90) 
    });
    hLine.addEffect('fadeIn', 0.2, delay + (i * 0.02));
    scene.addChild(hLine);
  }
  
  // Vertical grid lines
  for (let i = 0; i < 12; i++) {
    const vLine = new FFRect({ 
      color: COLORS.gridBlue, 
      width: 1, 
      height: 1800, 
      x: 90 + (i * 90), 
      y: height/2 
    });
    vLine.addEffect('fadeIn', 0.2, delay + (i * 0.02));
    scene.addChild(vLine);
  }
}

// ============================================
// HELPER: Add scanning bar effect
// ============================================
function addScanningBar(scene, startY, endY, duration, delay = 0) {
  // Main scan line
  const scanLine = new FFRect({ 
    color: COLORS.xrayCyan, 
    width: 1080, 
    height: 4, 
    x: width/2, 
    y: startY 
  });
  scanLine.addEffect('fadeIn', 0.1, delay);
  scene.addChild(scanLine);
  
  // Glow above scan line
  const glowTop = new FFRect({ 
    color: COLORS.glowCyan, 
    width: 1080, 
    height: 30, 
    x: width/2, 
    y: startY - 20 
  });
  glowTop.addEffect('fadeIn', 0.1, delay);
  scene.addChild(glowTop);
  
  // Glow below scan line
  const glowBottom = new FFRect({ 
    color: COLORS.glowBlue, 
    width: 1080, 
    height: 50, 
    x: width/2, 
    y: startY + 30 
  });
  glowBottom.addEffect('fadeIn', 0.1, delay);
  scene.addChild(glowBottom);
}

// ============================================
// HELPER: Add tech UI elements
// ============================================
function addTechUI(scene, delay = 0) {
  // Corner brackets - top left
  const tlH = new FFRect({ color: COLORS.xrayBlue, width: 60, height: 3, x: 50, y: 120 });
  tlH.addEffect('fadeIn', 0.2, delay);
  scene.addChild(tlH);
  const tlV = new FFRect({ color: COLORS.xrayBlue, width: 3, height: 60, x: 22, y: 148 });
  tlV.addEffect('fadeIn', 0.2, delay);
  scene.addChild(tlV);
  
  // Corner brackets - top right
  const trH = new FFRect({ color: COLORS.xrayBlue, width: 60, height: 3, x: width - 50, y: 120 });
  trH.addEffect('fadeIn', 0.2, delay);
  scene.addChild(trH);
  const trV = new FFRect({ color: COLORS.xrayBlue, width: 3, height: 60, x: width - 22, y: 148 });
  trV.addEffect('fadeIn', 0.2, delay);
  scene.addChild(trV);
  
  // Corner brackets - bottom left
  const blH = new FFRect({ color: COLORS.xrayBlue, width: 60, height: 3, x: 50, y: height - 120 });
  blH.addEffect('fadeIn', 0.2, delay);
  scene.addChild(blH);
  const blV = new FFRect({ color: COLORS.xrayBlue, width: 3, height: 60, x: 22, y: height - 148 });
  blV.addEffect('fadeIn', 0.2, delay);
  scene.addChild(blV);
  
  // Corner brackets - bottom right
  const brH = new FFRect({ color: COLORS.xrayBlue, width: 60, height: 3, x: width - 50, y: height - 120 });
  brH.addEffect('fadeIn', 0.2, delay);
  scene.addChild(brH);
  const brV = new FFRect({ color: COLORS.xrayBlue, width: 3, height: 60, x: width - 22, y: height - 148 });
  brV.addEffect('fadeIn', 0.2, delay);
  scene.addChild(brV);
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createXRayTechVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 11: "X-Ray Tech Breakdown"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~45 seconds'));
  console.log(colors.yellow('🎨 Theme: Visualization - High-Tech X-Ray\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-11-xray-tech.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: INTRO - Tech Boot Up (8s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.darkBg);
  scene1.setDuration(8);

  // Dark metallic background
  const introBg = new FFRect({ color: COLORS.metalDark, width: 1100, height: 2000, x: width/2, y: height/2 });
  introBg.addEffect('fadeIn', 0.3, 0);
  scene1.addChild(introBg);

  // Blueprint grid fading in
  addBlueprintGrid(scene1, 0.5);

  // Tech UI corners
  addTechUI(scene1, 0.8);

  // System boot text
  const bootText1 = new FFText({ text: 'INITIALIZING X-RAY SYSTEM', x: width/2, y: 400, fontSize: 36 });
  bootText1.setColor(COLORS.xrayBlue);
  bootText1.alignCenter();
  bootText1.addEffect('fadeIn', 0.4, 1);
  scene1.addChild(bootText1);

  // Loading bar background
  const loadBg = new FFRect({ color: COLORS.metalMid, width: 600, height: 20, x: width/2, y: 500 });
  loadBg.addEffect('fadeIn', 0.3, 1.3);
  scene1.addChild(loadBg);

  // Loading bar fill
  const loadFill = new FFRect({ color: COLORS.xrayCyan, width: 580, height: 16, x: width/2, y: 500 });
  loadFill.addEffect('fadeIn', 0.8, 1.5);
  scene1.addChild(loadFill);

  // Status text
  const statusText = new FFText({ text: '[ SYSTEM READY ]', x: width/2, y: 580, fontSize: 28 });
  statusText.setColor(COLORS.techGreen);
  statusText.alignCenter();
  statusText.addEffect('fadeIn', 0.3, 2.5);
  scene1.addChild(statusText);

  // Main title
  const titleBox = new FFRect({ color: 'rgba(0, 168, 255, 0.2)', width: 800, height: 200, x: width/2, y: 800 });
  titleBox.addEffect('zoomIn', 0.5, 3);
  scene1.addChild(titleBox);

  const titleText1 = new FFText({ text: 'X-RAY', x: width/2, y: 760, fontSize: 100 });
  titleText1.setColor(COLORS.xrayCyan);
  titleText1.alignCenter();
  titleText1.addEffect('bounceIn', 0.5, 3.3);
  scene1.addChild(titleText1);

  const titleText2 = new FFText({ text: 'TECH BREAKDOWN', x: width/2, y: 860, fontSize: 50 });
  titleText2.setColor(COLORS.white);
  titleText2.alignCenter();
  titleText2.addEffect('fadeIn', 0.4, 3.6);
  scene1.addChild(titleText2);

  // Subject reveal
  const subjectText = new FFText({ text: '⌚ LUXURY TIMEPIECE', x: width/2, y: 1050, fontSize: 38 });
  subjectText.setColor(COLORS.goldAccent);
  subjectText.alignCenter();
  subjectText.addEffect('fadeInUp', 0.5, 4.5);
  scene1.addChild(subjectText);

  // Scan preview lines
  const scanPreview1 = new FFRect({ color: COLORS.xrayBlue, width: 1080, height: 2, x: width/2, y: 1200 });
  scanPreview1.addEffect('fadeIn', 0.2, 5);
  scanPreview1.addEffect('fadeOut', 0.2, 5.5);
  scene1.addChild(scanPreview1);

  const scanPreview2 = new FFRect({ color: COLORS.xrayCyan, width: 1080, height: 2, x: width/2, y: 1400 });
  scanPreview2.addEffect('fadeIn', 0.2, 5.5);
  scanPreview2.addEffect('fadeOut', 0.2, 6);
  scene1.addChild(scanPreview2);

  scene1.setTransition('fade', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Intro - Tech Boot Up (8s)'));

  // ============================================
  // SCENE 2: THE WATCH - External View (9s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.darkBg);
  scene2.setDuration(9);

  // Dark background
  const watchBg = new FFRect({ color: COLORS.metalDark, width: 1100, height: 2000, x: width/2, y: height/2 });
  watchBg.addEffect('fadeIn', 0.3, 0);
  scene2.addChild(watchBg);

  // Watch body - outer case (gold/metallic)
  const watchCase = new FFRect({ color: COLORS.goldAccent, width: 400, height: 400, x: width/2, y: height/2 });
  watchCase.addEffect('zoomIn', 0.6, 0.3);
  scene2.addChild(watchCase);

  // Watch face (dark)
  const watchFace = new FFRect({ color: COLORS.darkBg, width: 340, height: 340, x: width/2, y: height/2 });
  watchFace.addEffect('zoomIn', 0.5, 0.5);
  scene2.addChild(watchFace);

  // Watch dial markers
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) * (Math.PI / 180);
    const markerX = width/2 + Math.sin(angle) * 140;
    const markerY = height/2 - Math.cos(angle) * 140;
    const marker = new FFRect({ color: COLORS.silverAccent, width: 8, height: 25, x: markerX, y: markerY });
    marker.addEffect('fadeIn', 0.2, 0.7 + (i * 0.05));
    scene2.addChild(marker);
  }

  // Watch hands
  const hourHand = new FFRect({ color: COLORS.goldAccent, width: 8, height: 80, x: width/2, y: height/2 - 35 });
  hourHand.addEffect('fadeIn', 0.3, 1.2);
  scene2.addChild(hourHand);

  const minuteHand = new FFRect({ color: COLORS.silverAccent, width: 5, height: 120, x: width/2 + 30, y: height/2 - 55 });
  minuteHand.addEffect('fadeIn', 0.3, 1.3);
  scene2.addChild(minuteHand);

  // Watch crown
  const crown = new FFRect({ color: COLORS.goldAccent, width: 30, height: 50, x: width/2 + 220, y: height/2 });
  crown.addEffect('fadeIn', 0.3, 0.8);
  scene2.addChild(crown);

  // Watch strap hints
  const strapTop = new FFRect({ color: COLORS.metalLight, width: 150, height: 200, x: width/2, y: height/2 - 300 });
  strapTop.addEffect('fadeIn', 0.4, 0.4);
  scene2.addChild(strapTop);

  const strapBottom = new FFRect({ color: COLORS.metalLight, width: 150, height: 200, x: width/2, y: height/2 + 300 });
  strapBottom.addEffect('fadeIn', 0.4, 0.4);
  scene2.addChild(strapBottom);

  // Label
  const labelBox = new FFRect({ color: 'rgba(0,0,0,0.7)', width: 500, height: 80, x: width/2, y: 350 });
  labelBox.addEffect('fadeIn', 0.4, 2);
  scene2.addChild(labelBox);

  const labelText = new FFText({ text: 'EXTERNAL VIEW', x: width/2, y: 350, fontSize: 36 });
  labelText.setColor(COLORS.xrayBlue);
  labelText.alignCenter();
  labelText.addEffect('fadeIn', 0.3, 2.2);
  scene2.addChild(labelText);

  // Specs text
  const specsBox = new FFRect({ color: 'rgba(0, 168, 255, 0.15)', width: 600, height: 200, x: width/2, y: 1450 });
  specsBox.addEffect('fadeIn', 0.4, 3);
  scene2.addChild(specsBox);

  const specs = [
    { text: 'CASE: 18K GOLD', y: 1390 },
    { text: 'DIAMETER: 42MM', y: 1450 },
    { text: 'WATER RESISTANT: 100M', y: 1510 }
  ];

  specs.forEach((spec, i) => {
    const specText = new FFText({ text: spec.text, x: width/2, y: spec.y, fontSize: 28 });
    specText.setColor(COLORS.dimWhite);
    specText.alignCenter();
    specText.addEffect('fadeInLeft', 0.3, 3.3 + (i * 0.2));
    scene2.addChild(specText);
  });

  // Scanning indicator
  const scanIndicator = new FFText({ text: '[ INITIATING X-RAY SCAN ]', x: width/2, y: 1700, fontSize: 30 });
  scanIndicator.setColor(COLORS.xrayCyan);
  scanIndicator.alignCenter();
  scanIndicator.addEffect('fadeIn', 0.3, 5);
  scanIndicator.addEffect('fadeOut', 0.2, 6);
  scanIndicator.addEffect('fadeIn', 0.2, 6.3);
  scene2.addChild(scanIndicator);

  // Tech UI
  addTechUI(scene2, 0.2);

  scene2.setTransition('directionalwarp', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: The Watch - External View (9s)'));

  // ============================================
  // SCENE 3: X-RAY SCAN - Revealing Gears (10s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.darkBg);
  scene3.setDuration(10);

  // Blueprint background
  const xrayBg = new FFRect({ color: COLORS.blueprintBlue, width: 1100, height: 2000, x: width/2, y: height/2 });
  xrayBg.addEffect('fadeIn', 0.5, 0);
  scene3.addChild(xrayBg);

  // Blueprint grid
  addBlueprintGrid(scene3, 0.3);

  // Scanning bar moving down
  addScanningBar(scene3, 200, 1700, 3, 0.5);

  // Watch outline (wireframe style)
  const watchOutline = new FFRect({ color: COLORS.xrayCyan, width: 404, height: 404, x: width/2, y: height/2 });
  watchOutline.addEffect('fadeIn', 0.5, 1);
  scene3.addChild(watchOutline);

  const watchInner = new FFRect({ color: COLORS.blueprintBlue, width: 396, height: 396, x: width/2, y: height/2 });
  watchInner.addEffect('fadeIn', 0.4, 1.1);
  scene3.addChild(watchInner);

  // Internal gears revealed
  // Main gear (large)
  const mainGear = new FFRect({ color: COLORS.xrayLight, width: 180, height: 180, x: width/2, y: height/2 });
  mainGear.addEffect('zoomIn', 0.6, 2);
  scene3.addChild(mainGear);

  const mainGearInner = new FFRect({ color: COLORS.blueprintBlue, width: 80, height: 80, x: width/2, y: height/2 });
  mainGearInner.addEffect('zoomIn', 0.5, 2.2);
  scene3.addChild(mainGearInner);

  // Secondary gears
  const gear2 = new FFRect({ color: COLORS.xrayBlue, width: 80, height: 80, x: width/2 - 100, y: height/2 - 80 });
  gear2.addEffect('zoomIn', 0.4, 2.5);
  scene3.addChild(gear2);

  const gear3 = new FFRect({ color: COLORS.xrayBlue, width: 60, height: 60, x: width/2 + 110, y: height/2 + 60 });
  gear3.addEffect('zoomIn', 0.4, 2.7);
  scene3.addChild(gear3);

  const gear4 = new FFRect({ color: COLORS.xrayBlue, width: 50, height: 50, x: width/2 + 80, y: height/2 - 100 });
  gear4.addEffect('zoomIn', 0.4, 2.9);
  scene3.addChild(gear4);

  // Tiny gears
  const tinyGears = [
    { x: width/2 - 60, y: height/2 + 100, size: 30 },
    { x: width/2 - 120, y: height/2 + 40, size: 25 },
    { x: width/2 + 40, y: height/2 - 130, size: 35 }
  ];

  tinyGears.forEach((g, i) => {
    const gear = new FFRect({ color: COLORS.xrayLight, width: g.size, height: g.size, x: g.x, y: g.y });
    gear.addEffect('fadeIn', 0.3, 3.2 + (i * 0.2));
    scene3.addChild(gear);
  });

  // Connection lines between gears
  const connLines = [
    { x1: width/2 - 50, y1: height/2 - 40, w: 60, h: 3 },
    { x1: width/2 + 60, y1: height/2 + 30, w: 50, h: 3 },
    { x1: width/2 + 40, y1: height/2 - 60, w: 40, h: 3 }
  ];

  connLines.forEach((line, i) => {
    const conn = new FFRect({ color: COLORS.xrayCyan, width: line.w, height: line.h, x: line.x1, y: line.y1 });
    conn.addEffect('fadeIn', 0.2, 3.8 + (i * 0.15));
    scene3.addChild(conn);
  });

  // Label
  const xrayLabel = new FFRect({ color: 'rgba(0,0,0,0.7)', width: 500, height: 80, x: width/2, y: 350 });
  xrayLabel.addEffect('fadeIn', 0.4, 1.5);
  scene3.addChild(xrayLabel);

  const xrayText = new FFText({ text: 'X-RAY VIEW', x: width/2, y: 350, fontSize: 42 });
  xrayText.setColor(COLORS.xrayCyan);
  xrayText.alignCenter();
  xrayText.addEffect('fadeIn', 0.3, 1.7);
  scene3.addChild(xrayText);

  // Component labels
  const compLabels = [
    { text: 'MAINSPRING', x: width/2, y: height/2 + 250, delay: 4 },
    { text: 'ESCAPEMENT', x: width/2 - 150, y: height/2 - 180, delay: 4.5 },
    { text: 'BALANCE WHEEL', x: width/2 + 150, y: height/2 + 180, delay: 5 }
  ];

  compLabels.forEach(label => {
    const labelText = new FFText({ text: label.text, x: label.x, y: label.y, fontSize: 24 });
    labelText.setColor(COLORS.techGreen);
    labelText.alignCenter();
    labelText.addEffect('fadeIn', 0.3, label.delay);
    scene3.addChild(labelText);
  });

  // Scan complete indicator
  const scanComplete = new FFText({ text: '✓ SCAN COMPLETE', x: width/2, y: 1700, fontSize: 32 });
  scanComplete.setColor(COLORS.techGreen);
  scanComplete.alignCenter();
  scanComplete.addEffect('bounceIn', 0.4, 6);
  scene3.addChild(scanComplete);

  // Tech UI
  addTechUI(scene3, 0.2);

  scene3.setTransition('slice', 0.5);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: X-Ray Scan - Revealing Gears (10s)'));

  // ============================================
  // SCENE 4: COMPONENT BREAKDOWN - Details (10s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.darkBg);
  scene4.setDuration(10);

  // Dark tech background
  const detailBg = new FFRect({ color: COLORS.metalDark, width: 1100, height: 2000, x: width/2, y: height/2 });
  detailBg.addEffect('fadeIn', 0.3, 0);
  scene4.addChild(detailBg);

  // Title
  const breakdownTitle = new FFText({ text: 'COMPONENT BREAKDOWN', x: width/2, y: 200, fontSize: 44 });
  breakdownTitle.setColor(COLORS.xrayCyan);
  breakdownTitle.alignCenter();
  breakdownTitle.addEffect('fadeInDown', 0.5, 0.3);
  scene4.addChild(breakdownTitle);

  // Component cards
  const components = [
    { name: 'MAINSPRING', desc: 'Power source', icon: '⚡', y: 450, color: COLORS.goldAccent },
    { name: 'GEAR TRAIN', desc: 'Energy transfer', icon: '⚙️', y: 700, color: COLORS.silverAccent },
    { name: 'ESCAPEMENT', desc: 'Regulates time', icon: '⏱️', y: 950, color: COLORS.copperAccent },
    { name: 'BALANCE WHEEL', desc: 'Oscillator', icon: '🔄', y: 1200, color: COLORS.xrayBlue }
  ];

  components.forEach((comp, i) => {
    // Card background
    const cardBg = new FFRect({ color: 'rgba(0, 168, 255, 0.1)', width: 900, height: 180, x: width/2, y: comp.y });
    cardBg.addEffect('fadeInLeft', 0.4, 0.5 + (i * 0.4));
    scene4.addChild(cardBg);

    // Left accent bar
    const accentBar = new FFRect({ color: comp.color, width: 8, height: 160, x: 120, y: comp.y });
    accentBar.addEffect('fadeIn', 0.3, 0.7 + (i * 0.4));
    scene4.addChild(accentBar);

    // Icon
    const iconText = new FFText({ text: comp.icon, x: 220, y: comp.y - 20, fontSize: 50 });
    iconText.addEffect('bounceIn', 0.4, 0.8 + (i * 0.4));
    scene4.addChild(iconText);

    // Component name
    const nameText = new FFText({ text: comp.name, x: 550, y: comp.y - 30, fontSize: 36 });
    nameText.setColor(COLORS.white);
    nameText.alignCenter();
    nameText.addEffect('fadeIn', 0.3, 0.9 + (i * 0.4));
    scene4.addChild(nameText);

    // Description
    const descText = new FFText({ text: comp.desc, x: 550, y: comp.y + 30, fontSize: 26 });
    descText.setColor(COLORS.dimWhite);
    descText.alignCenter();
    descText.addEffect('fadeIn', 0.3, 1 + (i * 0.4));
    scene4.addChild(descText);

    // Right indicator
    const indicator = new FFRect({ color: COLORS.techGreen, width: 12, height: 12, x: 950, y: comp.y });
    indicator.addEffect('fadeIn', 0.2, 1.1 + (i * 0.4));
    scene4.addChild(indicator);
  });

  // Stats box
  const statsBox = new FFRect({ color: 'rgba(0, 255, 136, 0.15)', width: 800, height: 150, x: width/2, y: 1550 });
  statsBox.addEffect('fadeIn', 0.4, 3);
  scene4.addChild(statsBox);

  const statsTitle = new FFText({ text: 'TOTAL COMPONENTS: 312', x: width/2, y: 1520, fontSize: 32 });
  statsTitle.setColor(COLORS.techGreen);
  statsTitle.alignCenter();
  statsTitle.addEffect('fadeIn', 0.3, 3.3);
  scene4.addChild(statsTitle);

  const statsDetail = new FFText({ text: 'PRECISION: 0.001mm TOLERANCE', x: width/2, y: 1580, fontSize: 26 });
  statsDetail.setColor(COLORS.dimWhite);
  statsDetail.alignCenter();
  statsDetail.addEffect('fadeIn', 0.3, 3.6);
  scene4.addChild(statsDetail);

  // Tech UI
  addTechUI(scene4, 0.2);

  scene4.setTransition('crosswarp', 0.5);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Component Breakdown - Details (10s)'));

  // ============================================
  // SCENE 5: END - CTA & Branding (8s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.darkBg);
  scene5.setDuration(8);

  // Dark background with subtle grid
  const endBg = new FFRect({ color: COLORS.metalDark, width: 1100, height: 2000, x: width/2, y: height/2 });
  endBg.addEffect('fadeIn', 0.3, 0);
  scene5.addChild(endBg);

  // Subtle blueprint grid
  addBlueprintGrid(scene5, 0.2);

  // Series title
  const seriesBox = new FFRect({ color: 'rgba(0, 168, 255, 0.2)', width: 700, height: 250, x: width/2, y: 450 });
  seriesBox.addEffect('zoomIn', 0.5, 0.3);
  scene5.addChild(seriesBox);

  const seriesTitle1 = new FFText({ text: 'X-RAY', x: width/2, y: 400, fontSize: 90 });
  seriesTitle1.setColor(COLORS.xrayCyan);
  seriesTitle1.alignCenter();
  seriesTitle1.addEffect('backInDown', 0.5, 0.5);
  scene5.addChild(seriesTitle1);

  const seriesTitle2 = new FFText({ text: 'TECH BREAKDOWN', x: width/2, y: 500, fontSize: 48 });
  seriesTitle2.setColor(COLORS.white);
  seriesTitle2.alignCenter();
  seriesTitle2.addEffect('fadeIn', 0.4, 0.8);
  scene5.addChild(seriesTitle2);

  // Tagline
  const tagline = new FFText({ text: 'See beyond the surface', x: width/2, y: 650, fontSize: 32 });
  tagline.setColor(COLORS.dimWhite);
  tagline.alignCenter();
  tagline.addEffect('fadeIn', 0.4, 1.2);
  scene5.addChild(tagline);

  // Divider
  const divider = new FFRect({ color: COLORS.xrayBlue, width: 400, height: 3, x: width/2, y: 730 });
  divider.addEffect('zoomIn', 0.4, 1.5);
  scene5.addChild(divider);

  // Hashtags
  const hashText = new FFText({ text: '#TechBreakdown #XRay #Engineering', x: width/2, y: 820, fontSize: 28 });
  hashText.setColor(COLORS.xrayBlue);
  hashText.alignCenter();
  hashText.addEffect('fadeIn', 0.4, 1.8);
  scene5.addChild(hashText);

  // CTA Box
  const ctaBox = new FFRect({ color: COLORS.xrayCyan, width: 650, height: 160, x: width/2, y: 1050 });
  ctaBox.addEffect('zoomIn', 0.5, 2.2);
  scene5.addChild(ctaBox);

  const ctaText1 = new FFText({ text: '👆 FOLLOW FOR MORE', x: width/2, y: 1020, fontSize: 36 });
  ctaText1.setColor(COLORS.darkBg);
  ctaText1.alignCenter();
  ctaText1.addEffect('bounceIn', 0.4, 2.5);
  scene5.addChild(ctaText1);

  const ctaText2 = new FFText({ text: 'TECH VISUALIZATIONS', x: width/2, y: 1080, fontSize: 40 });
  ctaText2.setColor(COLORS.darkBg);
  ctaText2.alignCenter();
  ctaText2.addEffect('bounceIn', 0.4, 2.7);
  scene5.addChild(ctaText2);

  // Engagement
  const engageText = new FFText({ text: '❤️ LIKE  💬 COMMENT  🔄 SHARE', x: width/2, y: 1250, fontSize: 30 });
  engageText.setColor(COLORS.white);
  engageText.alignCenter();
  engageText.addEffect('fadeIn', 0.4, 3.2);
  scene5.addChild(engageText);

  // Next episode teaser
  const nextBox = new FFRect({ color: 'rgba(255, 215, 0, 0.15)', width: 700, height: 120, x: width/2, y: 1450 });
  nextBox.addEffect('fadeIn', 0.4, 4);
  scene5.addChild(nextBox);

  const nextText = new FFText({ text: 'NEXT: SMARTPHONE INTERNALS', x: width/2, y: 1450, fontSize: 30 });
  nextText.setColor(COLORS.goldAccent);
  nextText.alignCenter();
  nextText.addEffect('fadeIn', 0.3, 4.3);
  scene5.addChild(nextText);

  // Story count
  const storyCount = new FFText({ text: 'STORY 11 OF 30', x: width/2, y: 1650, fontSize: 26 });
  storyCount.setColor(COLORS.dimWhite);
  storyCount.alignCenter();
  storyCount.addEffect('fadeIn', 0.4, 5);
  scene5.addChild(storyCount);

  // Tech UI
  addTechUI(scene5, 0.2);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: End - CTA & Branding (8s)'));

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
    console.log(colors.magenta('\n🎬 Story 11: "X-Ray Tech Breakdown" complete!\n'));
  });

  creator.start();
}

createXRayTechVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

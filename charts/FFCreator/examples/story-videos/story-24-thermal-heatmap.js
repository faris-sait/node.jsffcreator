/**
 * 🎬 STORY 24: "Thermal Heat-Map" - Science/Visual
 * 
 * The Story: Seeing the "Stress Levels" of people in a busy 
 * subway station through thermal imaging visualization.
 * 
 * Visual Style:
 * - Thermal camera colors (purple, red, yellow, white)
 * - Heat distortion effects
 * - Vignette overlays
 * - Temperature scale on right side
 * - Digital biometric scans over faces
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~45 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-24-thermal-heatmap.js
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
// COLOR PALETTE - Thermal Camera Theme
// ============================================
const COLORS = {
  // Thermal spectrum (cold to hot)
  thermalPurple: '#4a0080',
  thermalBlue: '#0040ff',
  thermalCyan: '#00ffff',
  thermalGreen: '#00ff00',
  thermalYellow: '#ffff00',
  thermalOrange: '#ff8000',
  thermalRed: '#ff0000',
  thermalWhite: '#ffffff',
  
  // Stress levels
  stressLow: '#4a0080',      // Purple - calm
  stressMild: '#0040ff',     // Blue - mild
  stressModerate: '#00ff00', // Green - moderate
  stressHigh: '#ffff00',     // Yellow - high
  stressExtreme: '#ff0000',  // Red - extreme
  stressCritical: '#ffffff', // White - critical
  
  // Background
  thermalBlack: '#000000',
  thermalDark: '#0a0a0a',
  
  // UI elements
  scanGreen: '#00ff00',
  scanRed: '#ff0000',
  scanYellow: '#ffff00',
  uiWhite: '#ffffff',
  uiGray: '#808080'
};

// ============================================
// HELPER: Add Temperature Scale
// ============================================
function addTemperatureScale(scene, delay = 0) {
  const scaleX = 950;
  const scaleY = height/2;
  const scaleHeight = 800;
  
  // Scale background
  const scaleBg = new FFRect({ 
    color: 'rgba(0, 0, 0, 0.7)', 
    width: 120, 
    height: scaleHeight + 100, 
    x: scaleX, 
    y: scaleY 
  });
  scaleBg.addEffect('fadeIn', 0.3, delay);
  scene.addChild(scaleBg);
  
  // Temperature gradient bars
  const gradientColors = [
    { color: COLORS.thermalWhite, y: scaleY - 400, label: 'CRITICAL' },
    { color: COLORS.thermalRed, y: scaleY - 300, label: 'EXTREME' },
    { color: COLORS.thermalOrange, y: scaleY - 200, label: 'HIGH' },
    { color: COLORS.thermalYellow, y: scaleY - 100, label: 'ELEVATED' },
    { color: COLORS.thermalGreen, y: scaleY, label: 'MODERATE' },
    { color: COLORS.thermalCyan, y: scaleY + 100, label: 'MILD' },
    { color: COLORS.thermalBlue, y: scaleY + 200, label: 'LOW' },
    { color: COLORS.thermalPurple, y: scaleY + 300, label: 'CALM' }
  ];
  
  gradientColors.forEach((grad, i) => {
    const bar = new FFRect({ 
      color: grad.color, 
      width: 80, 
      height: 90, 
      x: scaleX, 
      y: grad.y 
    });
    bar.addEffect('fadeIn', 0.2, delay + 0.2 + (i * 0.05));
    scene.addChild(bar);
    
    // Label
    const label = new FFText({ text: grad.label, x: scaleX - 150, y: grad.y, fontSize: 18 });
    label.setColor(COLORS.uiWhite);
    label.setAnchor(1, 0.5);
    label.addEffect('fadeIn', 0.2, delay + 0.3 + (i * 0.05));
    scene.addChild(label);
  });
  
  // Title
  const scaleTitle = new FFText({ text: 'STRESS', x: scaleX, y: scaleY - 480, fontSize: 24 });
  scaleTitle.setColor(COLORS.uiWhite);
  scaleTitle.alignCenter();
  scaleTitle.addEffect('fadeIn', 0.3, delay + 0.5);
  scene.addChild(scaleTitle);
  
  const scaleTitle2 = new FFText({ text: 'LEVEL', x: scaleX, y: scaleY - 450, fontSize: 24 });
  scaleTitle2.setColor(COLORS.uiWhite);
  scaleTitle2.alignCenter();
  scaleTitle2.addEffect('fadeIn', 0.3, delay + 0.6);
  scene.addChild(scaleTitle2);
}

// ============================================
// HELPER: Add Biometric Scan
// ============================================
function addBiometricScan(scene, x, y, stressLevel, heartRate, delay = 0) {
  // Scan box
  const scanBox = new FFRect({ 
    color: 'rgba(0, 0, 0, 0.6)', 
    width: 250, 
    height: 180, 
    x: x, 
    y: y 
  });
  scanBox.addEffect('fadeIn', 0.3, delay);
  scene.addChild(scanBox);
  
  // Border color based on stress
  let borderColor = COLORS.scanGreen;
  if (stressLevel > 70) borderColor = COLORS.scanRed;
  else if (stressLevel > 40) borderColor = COLORS.scanYellow;
  
  const scanBorder = new FFRect({ 
    color: borderColor, 
    width: 254, 
    height: 184, 
    x: x, 
    y: y 
  });
  scanBorder.addEffect('zoomIn', 0.2, delay + 0.1);
  scene.addChild(scanBorder);
  
  // Scan lines
  for (let i = 0; i < 3; i++) {
    const scanLine = new FFRect({ 
      color: borderColor, 
      width: 230, 
      height: 2, 
      x: x, 
      y: y - 60 + (i * 60) 
    });
    scanLine.addEffect('fadeIn', 0.1, delay + 0.2 + (i * 0.1));
    scene.addChild(scanLine);
  }
  
  // Data
  const stressText = new FFText({ text: `STRESS: ${stressLevel}%`, x: x, y: y - 50, fontSize: 22 });
  stressText.setColor(COLORS.uiWhite);
  stressText.alignCenter();
  stressText.addEffect('fadeIn', 0.2, delay + 0.3);
  scene.addChild(stressText);
  
  const heartText = new FFText({ text: `❤️ ${heartRate} BPM`, x: x, y: y - 10, fontSize: 22 });
  heartText.setColor(borderColor);
  heartText.alignCenter();
  heartText.addEffect('fadeIn', 0.2, delay + 0.4);
  scene.addChild(heartText);
  
  // Status
  let status = 'CALM';
  if (stressLevel > 70) status = 'CRITICAL';
  else if (stressLevel > 50) status = 'HIGH';
  else if (stressLevel > 30) status = 'MODERATE';
  
  const statusText = new FFText({ text: status, x: x, y: y + 30, fontSize: 26 });
  statusText.setColor(borderColor);
  statusText.alignCenter();
  statusText.addEffect('bounceIn', 0.3, delay + 0.5);
  scene.addChild(statusText);
  
  // ID
  const idText = new FFText({ text: `ID: ${Math.floor(Math.random() * 9000) + 1000}`, x: x, y: y + 65, fontSize: 18 });
  idText.setColor(COLORS.uiGray);
  idText.alignCenter();
  idText.addEffect('fadeIn', 0.2, delay + 0.6);
  scene.addChild(idText);
}

// ============================================
// HELPER: Add Heat Distortion
// ============================================
function addHeatDistortion(scene, x, y, size, color, delay = 0) {
  // Multiple overlapping circles for heat effect
  for (let i = 0; i < 5; i++) {
    const heatCircle = new FFRect({ 
      color: color, 
      width: size + (i * 30), 
      height: size + (i * 30), 
      x: x, 
      y: y 
    });
    heatCircle.addEffect('fadeIn', 0.3, delay + (i * 0.1));
    heatCircle.addEffect('fadeOut', 0.5, delay + 1 + (i * 0.1));
    scene.addChild(heatCircle);
  }
}

// ============================================
// HELPER: Add Vignette
// ============================================
function addVignette(scene, delay = 0) {
  // Dark edges
  const vignetteTop = new FFRect({ 
    color: 'rgba(0, 0, 0, 0.5)', 
    width: 1080, 
    height: 300, 
    x: width/2, 
    y: 150 
  });
  vignetteTop.addEffect('fadeIn', 0.5, delay);
  scene.addChild(vignetteTop);
  
  const vignetteBottom = new FFRect({ 
    color: 'rgba(0, 0, 0, 0.5)', 
    width: 1080, 
    height: 300, 
    x: width/2, 
    y: height - 150 
  });
  vignetteBottom.addEffect('fadeIn', 0.5, delay);
  scene.addChild(vignetteBottom);
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createThermalHeatmapVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 24: "Thermal Heat-Map"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~45 seconds'));
  console.log(colors.yellow('🎨 Theme: Science/Visual - Stress Detection\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-24-thermal-heatmap.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: INTRO - System Activation (9s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.thermalBlack);
  scene1.setDuration(9);

  // Thermal grid background
  for (let row = 0; row < 24; row++) {
    for (let col = 0; col < 13; col++) {
      const gridColor = row < 8 ? COLORS.thermalPurple : row < 16 ? COLORS.thermalBlue : COLORS.thermalCyan;
      const gridCell = new FFRect({ 
        color: gridColor, 
        width: 80, 
        height: 80, 
        x: 50 + (col * 80), 
        y: 50 + (row * 80) 
      });
      gridCell.addEffect('fadeIn', 0.2, 0.5 + (row * 0.02));
      scene1.addChild(gridCell);
    }
  }

  // System boot text
  const bootText1 = new FFText({ text: 'THERMAL IMAGING SYSTEM', x: width/2, y: 400, fontSize: 40 });
  bootText1.setColor(COLORS.thermalCyan);
  bootText1.alignCenter();
  bootText1.addEffect('fadeIn', 0.4, 1.5);
  scene1.addChild(bootText1);

  const bootText2 = new FFText({ text: 'INITIALIZING...', x: width/2, y: 480, fontSize: 32 });
  bootText2.setColor(COLORS.uiWhite);
  bootText2.alignCenter();
  bootText2.addEffect('fadeIn', 0.3, 2);
  scene1.addChild(bootText2);

  // Loading bar
  const loadBg = new FFRect({ color: COLORS.thermalDark, width: 600, height: 30, x: width/2, y: 600 });
  loadBg.addEffect('fadeIn', 0.3, 2.5);
  scene1.addChild(loadBg);

  const loadFill = new FFRect({ color: COLORS.thermalRed, width: 580, height: 26, x: width/2, y: 600 });
  loadFill.addEffect('fadeIn', 1.2, 2.8);
  scene1.addChild(loadFill);

  // Status
  const statusReady = new FFText({ text: '[ SYSTEM ONLINE ]', x: width/2, y: 700, fontSize: 36 });
  statusReady.setColor(COLORS.scanGreen);
  statusReady.alignCenter();
  statusReady.addEffect('fadeIn', 0.3, 4.2);
  scene1.addChild(statusReady);

  // Title
  const titleBox = new FFRect({ color: 'rgba(255, 0, 0, 0.3)', width: 850, height: 250, x: width/2, y: 950 });
  titleBox.addEffect('zoomIn', 0.6, 5);
  scene1.addChild(titleBox);

  const title1 = new FFText({ text: 'STRESS LEVEL', x: width/2, y: 900, fontSize: 70 });
  title1.setColor(COLORS.thermalYellow);
  title1.alignCenter();
  title1.addEffect('backInDown', 0.6, 5.5);
  scene1.addChild(title1);

  const title2 = new FFText({ text: 'DETECTION', x: width/2, y: 1000, fontSize: 65 });
  title2.setColor(COLORS.uiWhite);
  title2.alignCenter();
  title2.addEffect('fadeIn', 0.5, 6);
  scene1.addChild(title2);

  // Location
  const location = new FFText({ text: 'LOCATION: SUBWAY STATION', x: width/2, y: 1200, fontSize: 32 });
  location.setColor(COLORS.thermalCyan);
  location.alignCenter();
  location.addEffect('fadeInUp', 0.5, 6.5);
  scene1.addChild(location);

  scene1.setTransition('fade', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Intro - System Activation (9s)'));

  // ============================================
  // SCENE 2: LOW STRESS - Calm Commuters (9s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.thermalDark);
  scene2.setDuration(9);

  // Temperature scale
  addTemperatureScale(scene2, 0.3);

  // Vignette
  addVignette(scene2, 0.2);

  // Background - cool colors (low stress)
  const coolBg = new FFRect({ color: COLORS.thermalPurple, width: 900, height: 1800, x: 450, y: height/2 });
  coolBg.addEffect('fadeIn', 0.5, 0.5);
  scene2.addChild(coolBg);

  // Scene title
  const sceneTitle = new FFText({ text: 'MORNING COMMUTE - 7:00 AM', x: width/2, y: 100, fontSize: 36 });
  sceneTitle.setColor(COLORS.uiWhite);
  sceneTitle.alignCenter();
  sceneTitle.addEffect('fadeInDown', 0.4, 1);
  scene2.addChild(sceneTitle);

  // Person silhouettes (low stress - purple/blue)
  const people1 = [
    { x: 250, y: 600, stress: 15, hr: 68 },
    { x: 500, y: 700, stress: 22, hr: 72 },
    { x: 750, y: 650, stress: 18, hr: 70 }
  ];

  people1.forEach((person, i) => {
    // Body heat
    const body = new FFRect({ color: COLORS.thermalBlue, width: 150, height: 400, x: person.x, y: person.y });
    body.addEffect('fadeIn', 0.5, 1.5 + (i * 0.3));
    scene2.addChild(body);
    
    // Head
    const head = new FFRect({ color: COLORS.thermalCyan, width: 100, height: 100, x: person.x, y: person.y - 220 });
    head.addEffect('fadeIn', 0.4, 1.7 + (i * 0.3));
    scene2.addChild(head);
    
    // Heat distortion
    addHeatDistortion(scene2, person.x, person.y - 220, 80, 'rgba(0, 255, 255, 0.3)', 2 + (i * 0.3));
    
    // Biometric scan
    addBiometricScan(scene2, person.x, person.y - 450, person.stress, person.hr, 3 + (i * 0.4));
  });

  // Analysis text
  const analysisBox = new FFRect({ color: 'rgba(0, 0, 0, 0.8)', width: 800, height: 200, x: width/2, y: 1400 });
  analysisBox.addEffect('fadeIn', 0.4, 5);
  scene2.addChild(analysisBox);

  const analysis1 = new FFText({ text: 'ANALYSIS: LOW STRESS', x: width/2, y: 1350, fontSize: 42 });
  analysis1.setColor(COLORS.thermalCyan);
  analysis1.alignCenter();
  analysis1.addEffect('fadeIn', 0.3, 5.3);
  scene2.addChild(analysis1);

  const analysis2 = new FFText({ text: 'Calm environment detected', x: width/2, y: 1420, fontSize: 32 });
  analysis2.setColor(COLORS.uiWhite);
  analysis2.alignCenter();
  analysis2.addEffect('fadeIn', 0.3, 5.6);
  scene2.addChild(analysis2);

  scene2.setTransition('directionalwarp', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Low Stress - Calm Commuters (9s)'));

  // ============================================
  // SCENE 3: MODERATE STRESS - Rush Hour Begins (9s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.thermalDark);
  scene3.setDuration(9);

  // Temperature scale
  addTemperatureScale(scene3, 0.3);

  // Vignette
  addVignette(scene3, 0.2);

  // Background - warmer colors (moderate stress)
  const warmBg1 = new FFRect({ color: COLORS.thermalGreen, width: 900, height: 900, x: 450, y: 500 });
  warmBg1.addEffect('fadeIn', 0.5, 0.5);
  scene3.addChild(warmBg1);

  const warmBg2 = new FFRect({ color: COLORS.thermalYellow, width: 900, height: 900, x: 450, y: 1400 });
  warmBg2.addEffect('fadeIn', 0.5, 0.7);
  scene3.addChild(warmBg2);

  // Scene title
  const sceneTitle2 = new FFText({ text: 'RUSH HOUR - 8:30 AM', x: width/2, y: 100, fontSize: 36 });
  sceneTitle2.setColor(COLORS.uiWhite);
  sceneTitle2.alignCenter();
  sceneTitle2.addEffect('fadeInDown', 0.4, 1);
  scene3.addChild(sceneTitle2);

  // More people (moderate stress - green/yellow)
  const people2 = [
    { x: 200, y: 550, stress: 45, hr: 85 },
    { x: 400, y: 650, stress: 52, hr: 90 },
    { x: 600, y: 600, stress: 48, hr: 87 },
    { x: 800, y: 700, stress: 55, hr: 92 }
  ];

  people2.forEach((person, i) => {
    // Body heat - warmer
    const body = new FFRect({ color: COLORS.thermalYellow, width: 150, height: 400, x: person.x, y: person.y });
    body.addEffect('fadeIn', 0.5, 1.5 + (i * 0.2));
    scene3.addChild(body);
    
    // Head - hotter
    const head = new FFRect({ color: COLORS.thermalOrange, width: 100, height: 100, x: person.x, y: person.y - 220 });
    head.addEffect('fadeIn', 0.4, 1.7 + (i * 0.2));
    scene3.addChild(head);
    
    // Heat distortion
    addHeatDistortion(scene3, person.x, person.y - 220, 90, 'rgba(255, 255, 0, 0.4)', 2 + (i * 0.2));
    
    // Biometric scan
    addBiometricScan(scene3, person.x, person.y - 450, person.stress, person.hr, 3 + (i * 0.3));
  });

  // Analysis
  const analysisBox2 = new FFRect({ color: 'rgba(0, 0, 0, 0.8)', width: 800, height: 200, x: width/2, y: 1500 });
  analysisBox2.addEffect('fadeIn', 0.4, 5);
  scene3.addChild(analysisBox2);

  const analysis3 = new FFText({ text: 'ANALYSIS: MODERATE STRESS', x: width/2, y: 1450, fontSize: 42 });
  analysis3.setColor(COLORS.thermalYellow);
  analysis3.alignCenter();
  analysis3.addEffect('fadeIn', 0.3, 5.3);
  scene3.addChild(analysis3);

  const analysis4 = new FFText({ text: 'Elevated heart rates detected', x: width/2, y: 1520, fontSize: 32 });
  analysis4.setColor(COLORS.uiWhite);
  analysis4.alignCenter();
  analysis4.addEffect('fadeIn', 0.3, 5.6);
  scene3.addChild(analysis4);

  scene3.setTransition('crosswarp', 0.5);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Moderate Stress - Rush Hour Begins (9s)'));

  // ============================================
  // SCENE 4: HIGH STRESS - Peak Chaos (9s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.thermalDark);
  scene4.setDuration(9);

  // Temperature scale
  addTemperatureScale(scene4, 0.3);

  // Vignette
  addVignette(scene4, 0.2);

  // Background - hot colors (high stress)
  const hotBg1 = new FFRect({ color: COLORS.thermalOrange, width: 900, height: 600, x: 450, y: 350 });
  hotBg1.addEffect('fadeIn', 0.5, 0.5);
  scene4.addChild(hotBg1);

  const hotBg2 = new FFRect({ color: COLORS.thermalRed, width: 900, height: 700, x: 450, y: 900 });
  hotBg2.addEffect('fadeIn', 0.5, 0.7);
  scene4.addChild(hotBg2);

  const hotBg3 = new FFRect({ color: COLORS.thermalYellow, width: 900, height: 600, x: 450, y: 1550 });
  hotBg3.addEffect('fadeIn', 0.5, 0.9);
  scene4.addChild(hotBg3);

  // Scene title
  const sceneTitle3 = new FFText({ text: '⚠️ PEAK HOUR - 9:00 AM', x: width/2, y: 100, fontSize: 36 });
  sceneTitle3.setColor(COLORS.thermalRed);
  sceneTitle3.alignCenter();
  sceneTitle3.addEffect('fadeInDown', 0.4, 1);
  scene4.addChild(sceneTitle3);

  // Crowded people (high stress - red/orange)
  const people3 = [
    { x: 180, y: 500, stress: 78, hr: 110 },
    { x: 340, y: 600, stress: 82, hr: 115 },
    { x: 500, y: 550, stress: 75, hr: 108 },
    { x: 660, y: 650, stress: 88, hr: 120 },
    { x: 820, y: 580, stress: 80, hr: 112 }
  ];

  people3.forEach((person, i) => {
    // Body heat - very hot
    const body = new FFRect({ color: COLORS.thermalRed, width: 150, height: 400, x: person.x, y: person.y });
    body.addEffect('fadeIn', 0.5, 1.5 + (i * 0.15));
    scene4.addChild(body);
    
    // Head - critical
    const head = new FFRect({ color: COLORS.thermalWhite, width: 100, height: 100, x: person.x, y: person.y - 220 });
    head.addEffect('fadeIn', 0.4, 1.7 + (i * 0.15));
    scene4.addChild(head);
    
    // Intense heat distortion
    addHeatDistortion(scene4, person.x, person.y - 220, 100, 'rgba(255, 0, 0, 0.5)', 2 + (i * 0.15));
    
    // Biometric scan
    addBiometricScan(scene4, person.x, person.y - 450, person.stress, person.hr, 3 + (i * 0.25));
  });

  // Warning box
  const warningBox = new FFRect({ color: 'rgba(255, 0, 0, 0.3)', width: 850, height: 220, x: width/2, y: 1500 });
  warningBox.addEffect('zoomIn', 0.5, 5);
  scene4.addChild(warningBox);

  const warning1 = new FFText({ text: '⚠️ CRITICAL STRESS LEVELS', x: width/2, y: 1440, fontSize: 44 });
  warning1.setColor(COLORS.thermalWhite);
  warning1.alignCenter();
  warning1.addEffect('bounceIn', 0.4, 5.3);
  scene4.addChild(warning1);

  const warning2 = new FFText({ text: 'Multiple subjects in distress', x: width/2, y: 1520, fontSize: 32 });
  warning2.setColor(COLORS.uiWhite);
  warning2.alignCenter();
  warning2.addEffect('fadeIn', 0.3, 5.6);
  scene4.addChild(warning2);

  const warning3 = new FFText({ text: 'Recommend intervention', x: width/2, y: 1570, fontSize: 28 });
  warning3.setColor(COLORS.thermalYellow);
  warning3.alignCenter();
  warning3.addEffect('fadeIn', 0.3, 5.9);
  scene4.addChild(warning3);

  scene4.setTransition('slice', 0.5);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: High Stress - Peak Chaos (9s)'));

  // ============================================
  // SCENE 5: SUMMARY - Data Analysis (9s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.thermalBlack);
  scene5.setDuration(9);

  // Temperature scale
  addTemperatureScale(scene5, 0.3);

  // Summary title
  const summaryTitle = new FFText({ text: 'STRESS ANALYSIS COMPLETE', x: width/2, y: 150, fontSize: 44 });
  summaryTitle.setColor(COLORS.thermalCyan);
  summaryTitle.alignCenter();
  summaryTitle.addEffect('fadeInDown', 0.5, 0.5);
  scene5.addChild(summaryTitle);

  // Data visualization
  const dataBox = new FFRect({ color: 'rgba(0, 0, 0, 0.8)', width: 850, height: 1000, x: 450, y: 850 });
  dataBox.addEffect('fadeIn', 0.5, 1);
  scene5.addChild(dataBox);

  // Stats
  const stats = [
    { label: 'SUBJECTS SCANNED:', value: '47', color: COLORS.uiWhite, y: 450 },
    { label: 'AVG STRESS LEVEL:', value: '62%', color: COLORS.thermalYellow, y: 550 },
    { label: 'AVG HEART RATE:', value: '95 BPM', color: COLORS.thermalOrange, y: 650 },
    { label: 'CRITICAL CASES:', value: '8', color: COLORS.thermalRed, y: 750 }
  ];

  stats.forEach((stat, i) => {
    const label = new FFText({ text: stat.label, x: 200, y: stat.y, fontSize: 32 });
    label.setColor(COLORS.uiGray);
    label.setAnchor(0, 0.5);
    label.addEffect('fadeInLeft', 0.3, 2 + (i * 0.3));
    scene5.addChild(label);

    const value = new FFText({ text: stat.value, x: 700, y: stat.y, fontSize: 48 });
    value.setColor(stat.color);
    value.setAnchor(1, 0.5);
    value.addEffect('fadeInRight', 0.3, 2.2 + (i * 0.3));
    scene5.addChild(value);
  });

  // Stress distribution
  const distTitle = new FFText({ text: 'STRESS DISTRIBUTION', x: 450, y: 900, fontSize: 36 });
  distTitle.setColor(COLORS.uiWhite);
  distTitle.alignCenter();
  distTitle.addEffect('fadeIn', 0.4, 3.5);
  scene5.addChild(distTitle);

  const distribution = [
    { level: 'LOW', count: 12, color: COLORS.thermalBlue, y: 1000 },
    { level: 'MODERATE', count: 18, color: COLORS.thermalYellow, y: 1080 },
    { level: 'HIGH', count: 9, color: COLORS.thermalOrange, y: 1160 },
    { level: 'CRITICAL', count: 8, color: COLORS.thermalRed, y: 1240 }
  ];

  distribution.forEach((dist, i) => {
    const bar = new FFRect({ 
      color: dist.color, 
      width: dist.count * 30, 
      height: 50, 
      x: 200 + (dist.count * 15), 
      y: dist.y 
    });
    bar.addEffect('zoomIn', 0.4, 4 + (i * 0.2));
    scene5.addChild(bar);

    const levelText = new FFText({ text: dist.level, x: 200, y: dist.y, fontSize: 26 });
    levelText.setColor(COLORS.uiWhite);
    levelText.setAnchor(0, 0.5);
    levelText.addEffect('fadeIn', 0.2, 4.2 + (i * 0.2));
    scene5.addChild(levelText);

    const countText = new FFText({ text: dist.count.toString(), x: 700, y: dist.y, fontSize: 32 });
    countText.setColor(dist.color);
    countText.setAnchor(1, 0.5);
    countText.addEffect('fadeIn', 0.2, 4.3 + (i * 0.2));
    scene5.addChild(countText);
  });

  // CTA
  const ctaBox = new FFRect({ color: COLORS.thermalRed, width: 750, height: 120, x: 450, y: 1450 });
  ctaBox.addEffect('zoomIn', 0.5, 5.5);
  scene5.addChild(ctaBox);

  const ctaText = new FFText({ text: '👆 FOLLOW FOR MORE DATA', x: 450, y: 1450, fontSize: 40 });
  ctaText.setColor(COLORS.uiWhite);
  ctaText.alignCenter();
  ctaText.addEffect('bounceIn', 0.4, 6);
  scene5.addChild(ctaText);

  // Hashtags
  const hashtags = new FFText({ text: '#ThermalImaging #StressDetection #Science', x: 450, y: 1650, fontSize: 26 });
  hashtags.setColor(COLORS.uiGray);
  hashtags.alignCenter();
  hashtags.addEffect('fadeIn', 0.4, 6.5);
  scene5.addChild(hashtags);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Summary - Data Analysis (9s)'));

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
    console.log(colors.magenta('\n🎬 Story 24: "Thermal Heat-Map" complete!\n'));
  });

  creator.start();
}

createThermalHeatmapVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

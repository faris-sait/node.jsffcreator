/**
 * 🎬 STORY 17: "Blueprint to Reality" - Architecture
 * 
 * The Story: A hand sketches a house on paper, and the lines "grow" 
 * into a real 3D building with technical callouts.
 * 
 * Visual Style:
 * - Yellow drafting paper aesthetic transitioning to cinematic drone shots
 * - Edge Detection and Sketch Filters
 * - Keyframed Masking for line growth effect
 * - Technical "Call-out" lines showing measurements (height, width)
 * - Blueprint grid and architectural annotations
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~55 seconds
 * 
 * Run with: node examples/story-videos/story-17-blueprint-reality.js
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
// COLOR PALETTE - Blueprint/Architecture Theme
// ============================================
const COLORS = {
  // Drafting paper colors
  draftYellow: '#fff8dc',
  paperYellow: '#fffacd',
  vintageYellow: '#ffeaa7',
  creamYellow: '#fef5e7',
  
  // Blueprint colors
  blueprintBlue: '#003d82',
  blueprintDark: '#001f3f',
  blueprintLight: '#0074d9',
  gridBlue: '#4a90d9',
  
  // Sketch/Ink colors
  inkBlack: '#1a1a1a',
  pencilGray: '#4a4a4a',
  charcoalGray: '#2d2d2d',
  
  // Technical/Measurement colors
  techRed: '#e74c3c',
  techOrange: '#e67e22',
  measureGreen: '#27ae60',
  calloutBlue: '#3498db',
  
  // Reality/3D colors
  concreteGray: '#95a5a6',
  steelGray: '#7f8c8d',
  glassBlue: '#85c1e9',
  skyBlue: '#87ceeb',
  
  // Text
  white: '#ffffff',
  darkText: '#2c3e50',
  dimText: '#7f8c8d'
};

// ============================================
// HELPER: Add Blueprint Grid
// ============================================
function addBlueprintGrid(scene, color = COLORS.gridBlue, delay = 0) {
  // Horizontal grid lines
  for (let i = 0; i < 20; i++) {
    const hLine = new FFRect({ 
      color: color, 
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
      color: color, 
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
// HELPER: Add Measurement Callout
// ============================================
function addMeasurementCallout(scene, x1, y1, x2, y2, label, delay = 0) {
  // Callout line
  const lineWidth = Math.abs(x2 - x1);
  const lineHeight = Math.abs(y2 - y1);
  const isHorizontal = lineWidth > lineHeight;
  
  const calloutLine = new FFRect({ 
    color: COLORS.techRed, 
    width: isHorizontal ? lineWidth : 3, 
    height: isHorizontal ? 3 : lineHeight, 
    x: (x1 + x2) / 2, 
    y: (y1 + y2) / 2 
  });
  calloutLine.addEffect('fadeIn', 0.3, delay);
  scene.addChild(calloutLine);
  
  // End markers
  const marker1 = new FFRect({ color: COLORS.techRed, width: 3, height: 20, x: x1, y: y1 });
  marker1.addEffect('fadeIn', 0.2, delay + 0.1);
  scene.addChild(marker1);
  
  const marker2 = new FFRect({ color: COLORS.techRed, width: 3, height: 20, x: x2, y: y2 });
  marker2.addEffect('fadeIn', 0.2, delay + 0.1);
  scene.addChild(marker2);
  
  // Label
  const labelText = new FFText({ 
    text: label, 
    x: (x1 + x2) / 2, 
    y: isHorizontal ? y1 - 30 : (y1 + y2) / 2, 
    fontSize: 24 
  });
  labelText.setColor(COLORS.techRed);
  labelText.alignCenter();
  labelText.addEffect('fadeIn', 0.3, delay + 0.2);
  scene.addChild(labelText);
}

// ============================================
// HELPER: Add Technical Annotation
// ============================================
function addTechnicalAnnotation(scene, x, y, text, lineToX, lineToY, delay = 0) {
  // Annotation box
  const boxWidth = 200;
  const boxHeight = 60;
  const annotBox = new FFRect({ 
    color: 'rgba(52, 152, 219, 0.9)', 
    width: boxWidth, 
    height: boxHeight, 
    x: x, 
    y: y 
  });
  annotBox.addEffect('zoomIn', 0.3, delay);
  scene.addChild(annotBox);
  
  // Pointer line
  const lineLength = Math.sqrt(Math.pow(lineToX - x, 2) + Math.pow(lineToY - y, 2));
  const angle = Math.atan2(lineToY - y, lineToX - x);
  const lineMidX = x + Math.cos(angle) * lineLength / 2;
  const lineMidY = y + Math.sin(angle) * lineLength / 2;
  
  const pointerLine = new FFRect({ 
    color: COLORS.calloutBlue, 
    width: lineLength, 
    height: 2, 
    x: lineMidX, 
    y: lineMidY 
  });
  pointerLine.addEffect('fadeIn', 0.2, delay + 0.1);
  scene.addChild(pointerLine);
  
  // Pointer dot
  const pointerDot = new FFRect({ 
    color: COLORS.techOrange, 
    width: 12, 
    height: 12, 
    x: lineToX, 
    y: lineToY 
  });
  pointerDot.addEffect('bounceIn', 0.3, delay + 0.2);
  scene.addChild(pointerDot);
  
  // Text
  const annotText = new FFText({ text: text, x: x, y: y, fontSize: 20 });
  annotText.setColor(COLORS.white);
  annotText.alignCenter();
  annotText.addEffect('fadeIn', 0.2, delay + 0.3);
  scene.addChild(annotText);
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createBlueprintToRealityVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 17: "Blueprint to Reality"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~55 seconds'));
  console.log(colors.yellow('🎨 Theme: Architecture - Sketch to Building\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-17-blueprint-reality.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: INTRO - Drafting Table Setup (5s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.draftYellow);
  scene1.setDuration(5);

  // Drafting paper texture
  const paperBg = new FFRect({ color: COLORS.paperYellow, width: 1000, height: 1800, x: width/2, y: height/2 });
  paperBg.addEffect('fadeIn', 0.5, 0);
  scene1.addChild(paperBg);

  // Paper edges/shadows
  const paperShadow = new FFRect({ color: COLORS.pencilGray, width: 1010, height: 1810, x: width/2 + 5, y: height/2 + 5 });
  paperShadow.addEffect('fadeIn', 0.4, 0.1);
  scene1.addChild(paperShadow);

  // Title
  const titleBox = new FFRect({ color: COLORS.inkBlack, width: 700, height: 150, x: width/2, y: 300 });
  titleBox.addEffect('zoomIn', 0.5, 0.5);
  scene1.addChild(titleBox);

  const titleText1 = new FFText({ text: 'BLUEPRINT', x: width/2, y: 270, fontSize: 70 });
  titleText1.setColor(COLORS.draftYellow);
  titleText1.alignCenter();
  titleText1.addEffect('backInDown', 0.6, 0.7);
  scene1.addChild(titleText1);

  const titleText2 = new FFText({ text: 'TO REALITY', x: width/2, y: 350, fontSize: 60 });
  titleText2.setColor(COLORS.vintageYellow);
  titleText2.alignCenter();
  titleText2.addEffect('fadeIn', 0.5, 1);
  scene1.addChild(titleText2);

  // Subtitle
  const subtitle = new FFText({ text: 'FROM SKETCH TO STRUCTURE', x: width/2, y: 480, fontSize: 32 });
  subtitle.setColor(COLORS.darkText);
  subtitle.alignCenter();
  subtitle.addEffect('fadeInUp', 0.5, 1.5);
  scene1.addChild(subtitle);

  // Drafting tools icons
  const toolsText = new FFText({ text: '📐 ✏️ 📏', x: width/2, y: 650, fontSize: 80 });
  toolsText.alignCenter();
  toolsText.addEffect('bounceIn', 0.6, 2);
  scene1.addChild(toolsText);

  // Architect label
  const architectLabel = new FFText({ text: 'ARCHITECTURAL VISUALIZATION', x: width/2, y: 1500, fontSize: 36 });
  architectLabel.setColor(COLORS.pencilGray);
  architectLabel.alignCenter();
  architectLabel.addEffect('fadeIn', 0.5, 2.5);
  scene1.addChild(architectLabel);

  scene1.setTransition('fade', 0.6);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Intro - Drafting Table Setup (5s)'));

  // ============================================
  // SCENE 2: THE SKETCH - Hand Drawing (10s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.draftYellow);
  scene2.setDuration(10);

  // Yellow drafting paper
  const draftPaper = new FFRect({ color: COLORS.paperYellow, width: 1000, height: 1800, x: width/2, y: height/2 });
  draftPaper.addEffect('fadeIn', 0.3, 0);
  scene2.addChild(draftPaper);

  // Light grid on paper
  addBlueprintGrid(scene2, 'rgba(0, 0, 0, 0.05)', 0.2);

  // Title
  const sketchTitle = new FFText({ text: 'THE SKETCH', x: width/2, y: 200, fontSize: 50 });
  sketchTitle.setColor(COLORS.inkBlack);
  sketchTitle.alignCenter();
  sketchTitle.addEffect('fadeIn', 0.4, 0.3);
  scene2.addChild(sketchTitle);

  // Hand icon (simulating drawing)
  const handIcon = new FFText({ text: '✍️', x: 200, y: 400, fontSize: 60 });
  handIcon.addEffect('fadeIn', 0.3, 0.5);
  scene2.addChild(handIcon);

  // Building sketch - foundation line (grows)
  const foundationLine = new FFRect({ color: COLORS.inkBlack, width: 600, height: 4, x: width/2, y: 1200 });
  foundationLine.addEffect('fadeIn', 0.5, 1);
  scene2.addChild(foundationLine);

  // Building sketch - left wall (grows up)
  const leftWall = new FFRect({ color: COLORS.inkBlack, width: 4, height: 500, x: 240, y: 950 });
  leftWall.addEffect('fadeInDown', 0.6, 1.5);
  scene2.addChild(leftWall);

  // Building sketch - right wall (grows up)
  const rightWall = new FFRect({ color: COLORS.inkBlack, width: 4, height: 500, x: 840, y: 950 });
  rightWall.addEffect('fadeInDown', 0.6, 1.7);
  scene2.addChild(rightWall);

  // Building sketch - roof line
  const roofLeft = new FFRect({ color: COLORS.inkBlack, width: 320, height: 4, x: 380, y: 700 });
  roofLeft.addEffect('fadeInLeft', 0.4, 2.2);
  scene2.addChild(roofLeft);

  const roofRight = new FFRect({ color: COLORS.inkBlack, width: 320, height: 4, x: 700, y: 700 });
  roofRight.addEffect('fadeInRight', 0.4, 2.4);
  scene2.addChild(roofRight);

  // Roof peak
  const roofPeak = new FFRect({ color: COLORS.inkBlack, width: 4, height: 100, x: width/2, y: 650 });
  roofPeak.addEffect('fadeInDown', 0.3, 2.6);
  scene2.addChild(roofPeak);

  // Windows (4 windows)
  const windows = [
    { x: 350, y: 850 },
    { x: 500, y: 850 },
    { x: 580, y: 850 },
    { x: 730, y: 850 }
  ];

  windows.forEach((win, i) => {
    const windowRect = new FFRect({ color: COLORS.pencilGray, width: 80, height: 100, x: win.x, y: win.y });
    windowRect.addEffect('zoomIn', 0.3, 3 + (i * 0.15));
    scene2.addChild(windowRect);
  });

  // Door
  const door = new FFRect({ color: COLORS.charcoalGray, width: 100, height: 150, x: width/2, y: 1125 });
  door.addEffect('zoomIn', 0.4, 3.8);
  scene2.addChild(door);

  // Sketch details - shading lines
  for (let i = 0; i < 8; i++) {
    const shadeLine = new FFRect({ 
      color: COLORS.pencilGray, 
      width: 2, 
      height: 450, 
      x: 280 + (i * 70), 
      y: 950 
    });
    shadeLine.addEffect('fadeIn', 0.2, 4.5 + (i * 0.05));
    scene2.addChild(shadeLine);
  }

  // Annotation text
  const annotText = new FFText({ text: 'MODERN RESIDENCE', x: width/2, y: 1400, fontSize: 32 });
  annotText.setColor(COLORS.darkText);
  annotText.alignCenter();
  annotText.addEffect('fadeIn', 0.4, 5);
  scene2.addChild(annotText);

  scene2.setTransition('directionalwarp', 0.6);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: The Sketch - Hand Drawing (10s)'));

  // ============================================
  // SCENE 3: BLUEPRINT PHASE - Technical Drawing (10s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.blueprintDark);
  scene3.setDuration(10);

  // Blueprint background
  const blueprintBg = new FFRect({ color: COLORS.blueprintBlue, width: 1100, height: 2000, x: width/2, y: height/2 });
  blueprintBg.addEffect('fadeIn', 0.5, 0);
  scene3.addChild(blueprintBg);

  // Blueprint grid
  addBlueprintGrid(scene3, 'rgba(255, 255, 255, 0.2)', 0.3);

  // Title
  const blueprintTitle = new FFText({ text: 'BLUEPRINT PHASE', x: width/2, y: 200, fontSize: 50 });
  blueprintTitle.setColor(COLORS.white);
  blueprintTitle.alignCenter();
  blueprintTitle.addEffect('backInDown', 0.5, 0.5);
  scene3.addChild(blueprintTitle);

  // Technical building outline (white lines on blue)
  const techFoundation = new FFRect({ color: COLORS.white, width: 700, height: 5, x: width/2, y: 1200 });
  techFoundation.addEffect('zoomIn', 0.5, 1);
  scene3.addChild(techFoundation);

  const techLeftWall = new FFRect({ color: COLORS.white, width: 5, height: 550, x: 190, y: 925 });
  techLeftWall.addEffect('fadeInDown', 0.6, 1.3);
  scene3.addChild(techLeftWall);

  const techRightWall = new FFRect({ color: COLORS.white, width: 5, height: 550, x: 890, y: 925 });
  techRightWall.addEffect('fadeInDown', 0.6, 1.5);
  scene3.addChild(techRightWall);

  // Roof structure
  const techRoofLeft = new FFRect({ color: COLORS.white, width: 360, height: 5, x: 370, y: 650 });
  techRoofLeft.addEffect('fadeInLeft', 0.4, 2);
  scene3.addChild(techRoofLeft);

  const techRoofRight = new FFRect({ color: COLORS.white, width: 360, height: 5, x: 710, y: 650 });
  techRoofRight.addEffect('fadeInRight', 0.4, 2.2);
  scene3.addChild(techRoofRight);

  const techRoofPeak = new FFRect({ color: COLORS.white, width: 5, height: 120, x: width/2, y: 590 });
  techRoofPeak.addEffect('fadeInDown', 0.3, 2.4);
  scene3.addChild(techRoofPeak);

  // Floor levels
  const floor1 = new FFRect({ color: 'rgba(255, 255, 255, 0.5)', width: 690, height: 2, x: width/2, y: 1050 });
  floor1.addEffect('fadeIn', 0.3, 2.8);
  scene3.addChild(floor1);

  const floor2 = new FFRect({ color: 'rgba(255, 255, 255, 0.5)', width: 690, height: 2, x: width/2, y: 900 });
  floor2.addEffect('fadeIn', 0.3, 3);
  scene3.addChild(floor2);

  // Measurement callouts
  addMeasurementCallout(scene3, 190, 1250, 890, 1250, '42.0 FT', 3.5);
  addMeasurementCallout(scene3, 120, 650, 120, 1200, '28.5 FT', 4);
  addMeasurementCallout(scene3, 950, 900, 950, 1050, '12 FT', 4.5);

  // Technical annotations
  addTechnicalAnnotation(scene3, 300, 450, 'ROOF STRUCTURE', width/2, 650, 5);
  addTechnicalAnnotation(scene3, 780, 1000, 'MAIN FLOOR', 540, 1050, 5.5);
  addTechnicalAnnotation(scene3, 300, 1350, 'FOUNDATION', 540, 1200, 6);

  // Specification box
  const specBox = new FFRect({ color: 'rgba(0, 0, 0, 0.5)', width: 600, height: 200, x: width/2, y: 1600 });
  specBox.addEffect('fadeIn', 0.4, 6.5);
  scene3.addChild(specBox);

  const specs = [
    { text: 'AREA: 2,400 SQ FT', y: 1540 },
    { text: 'FLOORS: 2', y: 1590 },
    { text: 'BEDROOMS: 4', y: 1640 }
  ];

  specs.forEach((spec, i) => {
    const specText = new FFText({ text: spec.text, x: width/2, y: spec.y, fontSize: 28 });
    specText.setColor(COLORS.white);
    specText.alignCenter();
    specText.addEffect('fadeIn', 0.3, 7 + (i * 0.2));
    scene3.addChild(specText);
  });

  scene3.setTransition('crosswarp', 0.6);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Blueprint Phase - Technical Drawing (10s)'));

  // ============================================
  // SCENE 4: TRANSFORMATION - Lines to 3D (10s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.blueprintBlue);
  scene4.setDuration(10);

  // Gradient transition background (blue to sky)
  const transitionBg1 = new FFRect({ color: COLORS.blueprintBlue, width: 1100, height: 1000, x: width/2, y: 500 });
  transitionBg1.addEffect('fadeIn', 0.3, 0);
  scene4.addChild(transitionBg1);

  const transitionBg2 = new FFRect({ color: COLORS.skyBlue, width: 1100, height: 1000, x: width/2, y: 1420 });
  transitionBg2.addEffect('fadeIn', 0.5, 0.5);
  scene4.addChild(transitionBg2);

  // Title
  const transformTitle = new FFText({ text: 'TRANSFORMATION', x: width/2, y: 250, fontSize: 60 });
  transformTitle.setColor(COLORS.white);
  transformTitle.alignCenter();
  transformTitle.addEffect('bounceIn', 0.6, 0.3);
  scene4.addChild(transformTitle);

  // Morphing effect - lines becoming solid
  // Building base (transitioning from line to solid)
  const morphBase = new FFRect({ color: COLORS.concreteGray, width: 650, height: 500, x: width/2, y: 1000 });
  morphBase.addEffect('zoomIn', 0.8, 1);
  scene4.addChild(morphBase);

  // Building walls with depth
  const wall3DLeft = new FFRect({ color: COLORS.steelGray, width: 50, height: 500, x: 220, y: 1000 });
  wall3DLeft.addEffect('fadeInLeft', 0.6, 1.5);
  scene4.addChild(wall3DLeft);

  const wall3DRight = new FFRect({ color: COLORS.steelGray, width: 50, height: 500, x: 860, y: 1000 });
  wall3DRight.addEffect('fadeInRight', 0.6, 1.7);
  scene4.addChild(wall3DRight);

  // Windows with glass effect
  const glassWindows = [
    { x: 350, y: 900 },
    { x: 480, y: 900 },
    { x: 600, y: 900 },
    { x: 730, y: 900 }
  ];

  glassWindows.forEach((win, i) => {
    const glassWin = new FFRect({ color: COLORS.glassBlue, width: 90, height: 120, x: win.x, y: win.y });
    glassWin.addEffect('zoomIn', 0.4, 2.5 + (i * 0.15));
    scene4.addChild(glassWin);
    
    // Window frame
    const frame = new FFRect({ color: COLORS.steelGray, width: 94, height: 124, x: win.x, y: win.y });
    frame.addEffect('fadeIn', 0.2, 2.6 + (i * 0.15));
    scene4.addChild(frame);
  });

  // Roof with 3D effect
  const roof3D = new FFRect({ color: COLORS.charcoalGray, width: 700, height: 200, x: width/2, y: 700 });
  roof3D.addEffect('fadeInDown', 0.6, 3.5);
  scene4.addChild(roof3D);

  // Roof peak highlight
  const roofHighlight = new FFRect({ color: COLORS.concreteGray, width: 680, height: 30, x: width/2, y: 610 });
  roofHighlight.addEffect('fadeIn', 0.3, 3.8);
  scene4.addChild(roofHighlight);

  // Door with depth
  const door3D = new FFRect({ color: COLORS.inkBlack, width: 110, height: 180, x: width/2, y: 1140 });
  door3D.addEffect('zoomIn', 0.5, 4);
  scene4.addChild(door3D);

  // Transformation particles
  for (let i = 0; i < 20; i++) {
    const particle = new FFRect({ 
      color: COLORS.calloutBlue, 
      width: 6, 
      height: 6, 
      x: 200 + Math.random() * 680, 
      y: 600 + Math.random() * 600 
    });
    particle.addEffect('fadeIn', 0.2, 1 + Math.random() * 2);
    particle.addEffect('fadeOut', 0.3, 3 + Math.random() * 2);
    scene4.addChild(particle);
  }

  // Progress indicator
  const progressText = new FFText({ text: 'LINES → 3D STRUCTURE', x: width/2, y: 1500, fontSize: 36 });
  progressText.setColor(COLORS.darkText);
  progressText.alignCenter();
  progressText.addEffect('fadeIn', 0.5, 5);
  scene4.addChild(progressText);

  scene4.setTransition('dreamy', 0.7);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Transformation - Lines to 3D (10s)'));

  // ============================================
  // SCENE 5: REALITY - The Finished Building (10s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.skyBlue);
  scene5.setDuration(10);

  // Sky background
  const skyBg = new FFRect({ color: COLORS.skyBlue, width: 1100, height: 1000, x: width/2, y: 500 });
  skyBg.addEffect('fadeIn', 0.3, 0);
  scene5.addChild(skyBg);

  // Ground
  const ground = new FFRect({ color: COLORS.measureGreen, width: 1100, height: 800, x: width/2, y: 1520 });
  ground.addEffect('fadeIn', 0.4, 0.2);
  scene5.addChild(ground);

  // Title
  const realityTitle = new FFText({ text: 'REALITY', x: width/2, y: 200, fontSize: 80 });
  realityTitle.setColor(COLORS.white);
  realityTitle.alignCenter();
  realityTitle.addEffect('backInDown', 0.6, 0.5);
  scene5.addChild(realityTitle);

  // Finished building - main structure
  const finishedBase = new FFRect({ color: COLORS.concreteGray, width: 700, height: 550, x: width/2, y: 1025 });
  finishedBase.addEffect('zoomIn', 0.7, 1);
  scene5.addChild(finishedBase);

  // Building depth/shadow
  const buildingShadow = new FFRect({ color: COLORS.steelGray, width: 60, height: 550, x: 220, y: 1025 });
  buildingShadow.addEffect('fadeIn', 0.5, 1.3);
  scene5.addChild(buildingShadow);

  // Windows - realistic
  const finalWindows = [
    { x: 350, y: 900, floor: 2 },
    { x: 480, y: 900, floor: 2 },
    { x: 600, y: 900, floor: 2 },
    { x: 730, y: 900, floor: 2 },
    { x: 350, y: 1050, floor: 1 },
    { x: 480, y: 1050, floor: 1 },
    { x: 600, y: 1050, floor: 1 },
    { x: 730, y: 1050, floor: 1 }
  ];

  finalWindows.forEach((win, i) => {
    const windowGlass = new FFRect({ color: COLORS.glassBlue, width: 95, height: 130, x: win.x, y: win.y });
    windowGlass.addEffect('fadeIn', 0.3, 1.8 + (i * 0.1));
    scene5.addChild(windowGlass);
    
    // Window reflection
    const reflection = new FFRect({ color: 'rgba(255, 255, 255, 0.3)', width: 40, height: 50, x: win.x - 20, y: win.y - 30 });
    reflection.addEffect('fadeIn', 0.2, 2 + (i * 0.1));
    scene5.addChild(reflection);
  });

  // Roof - finished
  const finishedRoof = new FFRect({ color: COLORS.charcoalGray, width: 750, height: 220, x: width/2, y: 680 });
  finishedRoof.addEffect('fadeInDown', 0.6, 2.5);
  scene5.addChild(finishedRoof);

  // Roof tiles effect
  for (let i = 0; i < 10; i++) {
    const tile = new FFRect({ 
      color: COLORS.inkBlack, 
      width: 70, 
      height: 3, 
      x: 280 + (i * 70), 
      y: 600 + (i * 15) 
    });
    tile.addEffect('fadeIn', 0.2, 2.8 + (i * 0.05));
    scene5.addChild(tile);
  }

  // Front door
  const finishedDoor = new FFRect({ color: COLORS.inkBlack, width: 120, height: 200, x: width/2, y: 1180 });
  finishedDoor.addEffect('zoomIn', 0.5, 3.2);
  scene5.addChild(finishedDoor);

  // Door handle
  const doorHandle = new FFRect({ color: COLORS.goldAccent, width: 15, height: 8, x: width/2 + 40, y: 1180 });
  doorHandle.addEffect('fadeIn', 0.2, 3.5);
  scene5.addChild(doorHandle);

  // Landscaping - trees
  const tree1 = new FFText({ text: '🌳', x: 150, y: 1300, fontSize: 80 });
  tree1.addEffect('bounceIn', 0.5, 4);
  scene5.addChild(tree1);

  const tree2 = new FFText({ text: '🌳', x: 930, y: 1300, fontSize: 80 });
  tree2.addEffect('bounceIn', 0.5, 4.2);
  scene5.addChild(tree2);

  // Pathway
  const pathway = new FFRect({ color: COLORS.pencilGray, width: 150, height: 300, x: width/2, y: 1400 });
  pathway.addEffect('fadeIn', 0.4, 4.5);
  scene5.addChild(pathway);

  // Final callouts
  addTechnicalAnnotation(scene5, 250, 550, 'COMPLETED 2024', width/2, 680, 5);
  addTechnicalAnnotation(scene5, 830, 1100, 'ENERGY EFFICIENT', 730, 1050, 5.5);

  // Completion badge
  const completeBadge = new FFRect({ color: COLORS.measureGreen, width: 500, height: 100, x: width/2, y: 1650 });
  completeBadge.addEffect('zoomIn', 0.5, 6);
  scene5.addChild(completeBadge);

  const completeText = new FFText({ text: '✓ PROJECT COMPLETE', x: width/2, y: 1650, fontSize: 40 });
  completeText.setColor(COLORS.white);
  completeText.alignCenter();
  completeText.addEffect('bounceIn', 0.5, 6.3);
  scene5.addChild(completeText);

  scene5.setTransition('fade', 0.6);
  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Reality - The Finished Building (10s)'));

  // ============================================
  // SCENE 6: END CARD - CTA (10s)
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor(COLORS.draftYellow);
  scene6.setDuration(10);

  // Split background - blueprint and reality
  const leftBg = new FFRect({ color: COLORS.blueprintBlue, width: 540, height: 1920, x: 270, y: height/2 });
  leftBg.addEffect('fadeIn', 0.4, 0);
  scene6.addChild(leftBg);

  const rightBg = new FFRect({ color: COLORS.skyBlue, width: 540, height: 1920, x: 810, y: height/2 });
  rightBg.addEffect('fadeIn', 0.4, 0.2);
  scene6.addChild(rightBg);

  // Divider line
  const dividerLine = new FFRect({ color: COLORS.white, width: 6, height: 1920, x: width/2, y: height/2 });
  dividerLine.addEffect('fadeIn', 0.3, 0.5);
  scene6.addChild(dividerLine);

  // Series title
  const seriesBox = new FFRect({ color: 'rgba(0, 0, 0, 0.8)', width: 900, height: 250, x: width/2, y: 350 });
  seriesBox.addEffect('zoomIn', 0.5, 0.7);
  scene6.addChild(seriesBox);

  const seriesTitle1 = new FFText({ text: 'BLUEPRINT', x: width/2, y: 300, fontSize: 70 });
  seriesTitle1.setColor(COLORS.blueprintLight);
  seriesTitle1.alignCenter();
  seriesTitle1.addEffect('backInDown', 0.5, 1);
  scene6.addChild(seriesTitle1);

  const seriesTitle2 = new FFText({ text: 'TO REALITY', x: width/2, y: 390, fontSize: 60 });
  seriesTitle2.setColor(COLORS.white);
  seriesTitle2.alignCenter();
  seriesTitle2.addEffect('fadeIn', 0.4, 1.3);
  scene6.addChild(seriesTitle2);

  // Tagline
  const tagline = new FFText({ text: 'FROM VISION TO STRUCTURE', x: width/2, y: 520, fontSize: 32 });
  tagline.setColor(COLORS.dimText);
  tagline.alignCenter();
  tagline.addEffect('fadeIn', 0.4, 1.7);
  scene6.addChild(tagline);

  // Icons showing process
  const processIcons = new FFText({ text: '✏️ → 📐 → 🏗️ → 🏠', x: width/2, y: 700, fontSize: 60 });
  processIcons.alignCenter();
  processIcons.addEffect('bounceIn', 0.6, 2.2);
  scene6.addChild(processIcons);

  // CTA Box
  const ctaBox = new FFRect({ color: COLORS.techOrange, width: 750, height: 180, x: width/2, y: 950 });
  ctaBox.addEffect('zoomIn', 0.5, 3);
  scene6.addChild(ctaBox);

  const ctaText1 = new FFText({ text: '👆 FOLLOW FOR MORE', x: width/2, y: 910, fontSize: 42 });
  ctaText1.setColor(COLORS.white);
  ctaText1.alignCenter();
  ctaText1.addEffect('bounceIn', 0.4, 3.3);
  scene6.addChild(ctaText1);

  const ctaText2 = new FFText({ text: 'ARCHITECTURE STORIES', x: width/2, y: 990, fontSize: 38 });
  ctaText2.setColor(COLORS.white);
  ctaText2.alignCenter();
  ctaText2.addEffect('bounceIn', 0.4, 3.5);
  scene6.addChild(ctaText2);

  // Hashtags
  const hashBox = new FFRect({ color: 'rgba(0, 0, 0, 0.6)', width: 800, height: 100, x: width/2, y: 1180 });
  hashBox.addEffect('fadeIn', 0.4, 4);
  scene6.addChild(hashBox);

  const hashText = new FFText({ text: '#Architecture #Design #Blueprint', x: width/2, y: 1180, fontSize: 30 });
  hashText.setColor(COLORS.white);
  hashText.alignCenter();
  hashText.addEffect('fadeIn', 0.3, 4.3);
  scene6.addChild(hashText);

  // Engagement
  const engageText = new FFText({ text: '❤️ LIKE  💬 COMMENT  🔄 SHARE', x: width/2, y: 1350, fontSize: 32 });
  engageText.setColor(COLORS.darkText);
  engageText.alignCenter();
  engageText.addEffect('fadeIn', 0.4, 5);
  scene6.addChild(engageText);

  // Next episode teaser
  const nextBox = new FFRect({ color: 'rgba(52, 152, 219, 0.3)', width: 700, height: 120, x: width/2, y: 1520 });
  nextBox.addEffect('fadeIn', 0.4, 5.5);
  scene6.addChild(nextBox);

  const nextText = new FFText({ text: 'NEXT: INTERIOR DESIGN EVOLUTION', x: width/2, y: 1520, fontSize: 28 });
  nextText.setColor(COLORS.darkText);
  nextText.alignCenter();
  nextText.addEffect('fadeIn', 0.3, 5.8);
  scene6.addChild(nextText);

  // Story count
  const storyCount = new FFText({ text: 'STORY 17 • ARCHITECTURE SERIES', x: width/2, y: 1700, fontSize: 26 });
  storyCount.setColor(COLORS.dimText);
  storyCount.alignCenter();
  storyCount.addEffect('fadeIn', 0.4, 6.5);
  scene6.addChild(storyCount);

  creator.addChild(scene6);
  console.log(colors.green('  ✓ Scene 6: End Card - CTA (10s)'));

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
    console.log(colors.magenta('\n🎬 Story 17: "Blueprint to Reality" complete!\n'));
  });

  creator.start();
}

createBlueprintToRealityVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

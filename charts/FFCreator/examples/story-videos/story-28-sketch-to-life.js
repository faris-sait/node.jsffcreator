/**
 * 🎬 STORY 28: "Sketch-to-Life" - Travel/Art
 * 
 * The Story: A hand-drawn sketch of the Eiffel Tower suddenly "fills in" 
 * with color and becomes a real video.
 * 
 * Visual Style:
 * - Artistic, transitioning to high-definition
 * - Luma Matte effects
 * - Brush Stroke Overlays
 * - Color Saturation Animation
 * - Canvas texture overlay throughout
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~30 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-28-sketch-to-life.js
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
// COLOR PALETTE - Artistic Sketch to Life
// ============================================
const COLORS = {
  // Canvas/Paper
  canvasWhite: '#f8f5f0',
  canvasCream: '#faf7f2',
  paperBeige: '#e8e4dc',
  
  // Sketch colors
  pencilGray: '#4a4a4a',
  charcoalBlack: '#2a2a2a',
  inkBlack: '#1a1a1a',
  sketchGray: '#6a6a6a',
  
  // Eiffel Tower colors (realistic)
  towerBrown: '#8b7355',
  towerDarkBrown: '#6b5a47',
  towerIron: '#7a6a54',
  towerRust: '#9d8468',
  
  // Paris sky
  skyBlue: '#87ceeb',
  skyLightBlue: '#b0d4f1',
  cloudWhite: '#ffffff',
  sunsetOrange: '#ff9966',
  
  // Artistic accents
  watercolorBlue: '#6ba3d4',
  watercolorGreen: '#8bc34a',
  watercolorPink: '#ff6b9d',
  watercolorYellow: '#ffd54f',
  
  // Text
  black: '#000000',
  white: '#ffffff',
  darkGray: '#333333',
  lightGray: '#999999'
};

// ============================================
// HELPER: Add Canvas Texture Overlay
// ============================================
function addCanvasTexture(scene, opacity = 0.15) {
  // Create canvas texture using small rectangles
  for (let i = 0; i < 100; i++) {
    const textureDot = new FFRect({ 
      color: COLORS.paperBeige, 
      width: 3 + Math.random() * 5, 
      height: 3 + Math.random() * 5, 
      x: Math.random() * width, 
      y: Math.random() * height 
    });
    textureDot.setOpacity(opacity);
    scene.addChild(textureDot);
  }
  
  // Horizontal canvas lines
  for (let i = 0; i < 40; i++) {
    const line = new FFRect({ 
      color: COLORS.paperBeige, 
      width: width, 
      height: 1, 
      x: width/2, 
      y: i * 48 
    });
    line.setOpacity(opacity * 0.5);
    scene.addChild(line);
  }
}

// ============================================
// HELPER: Draw Eiffel Tower Sketch (Outline)
// ============================================
function drawEiffelTowerSketch(scene, centerX, centerY, delay = 0) {
  // Base (wide bottom)
  const base1 = new FFRect({ 
    color: COLORS.pencilGray, 
    width: 400, 
    height: 8, 
    x: centerX, 
    y: centerY + 400 
  });
  base1.addEffect('zoomIn', 0.4, delay);
  scene.addChild(base1);
  
  // Left leg
  const leftLeg = new FFRect({ 
    color: COLORS.pencilGray, 
    width: 12, 
    height: 500, 
    x: centerX - 180, 
    y: centerY + 150 
  });
  leftLeg.setRotate(0.15);
  leftLeg.addEffect('fadeInUp', 0.5, delay + 0.2);
  scene.addChild(leftLeg);
  
  // Right leg
  const rightLeg = new FFRect({ 
    color: COLORS.pencilGray, 
    width: 12, 
    height: 500, 
    x: centerX + 180, 
    y: centerY + 150 
  });
  rightLeg.setRotate(-0.15);
  rightLeg.addEffect('fadeInUp', 0.5, delay + 0.2);
  scene.addChild(rightLeg);
  
  // First platform
  const platform1 = new FFRect({ 
    color: COLORS.pencilGray, 
    width: 300, 
    height: 6, 
    x: centerX, 
    y: centerY + 100 
  });
  platform1.addEffect('zoomIn', 0.4, delay + 0.5);
  scene.addChild(platform1);
  
  // Middle section - left
  const midLeft = new FFRect({ 
    color: COLORS.pencilGray, 
    width: 10, 
    height: 350, 
    x: centerX - 100, 
    y: centerY - 75 
  });
  midLeft.setRotate(0.08);
  midLeft.addEffect('fadeInUp', 0.5, delay + 0.7);
  scene.addChild(midLeft);
  
  // Middle section - right
  const midRight = new FFRect({ 
    color: COLORS.pencilGray, 
    width: 10, 
    height: 350, 
    x: centerX + 100, 
    y: centerY - 75 
  });
  midRight.setRotate(-0.08);
  midRight.addEffect('fadeInUp', 0.5, delay + 0.7);
  scene.addChild(midRight);
  
  // Second platform
  const platform2 = new FFRect({ 
    color: COLORS.pencilGray, 
    width: 180, 
    height: 6, 
    x: centerX, 
    y: centerY - 150 
  });
  platform2.addEffect('zoomIn', 0.4, delay + 1);
  scene.addChild(platform2);
  
  // Top section - left
  const topLeft = new FFRect({ 
    color: COLORS.pencilGray, 
    width: 8, 
    height: 200, 
    x: centerX - 50, 
    y: centerY - 300 
  });
  topLeft.setRotate(0.05);
  topLeft.addEffect('fadeInUp', 0.5, delay + 1.2);
  scene.addChild(topLeft);
  
  // Top section - right
  const topRight = new FFRect({ 
    color: COLORS.pencilGray, 
    width: 8, 
    height: 200, 
    x: centerX + 50, 
    y: centerY - 300 
  });
  topRight.setRotate(-0.05);
  topRight.addEffect('fadeInUp', 0.5, delay + 1.2);
  scene.addChild(topRight);
  
  // Spire
  const spire = new FFRect({ 
    color: COLORS.pencilGray, 
    width: 6, 
    height: 150, 
    x: centerX, 
    y: centerY - 475 
  });
  spire.addEffect('fadeInDown', 0.5, delay + 1.5);
  scene.addChild(spire);
  
  // Spire top
  const spireTop = new FFRect({ 
    color: COLORS.pencilGray, 
    width: 15, 
    height: 15, 
    x: centerX, 
    y: centerY - 550 
  });
  spireTop.addEffect('bounceIn', 0.4, delay + 1.8);
  scene.addChild(spireTop);
}

// ============================================
// HELPER: Add Brush Strokes
// ============================================
function addBrushStrokes(scene, delay = 0) {
  const strokes = [
    { x: 200, y: 400, width: 150, height: 20, rotation: 0.3 },
    { x: 800, y: 600, width: 180, height: 25, rotation: -0.2 },
    { x: 300, y: 1200, width: 200, height: 30, rotation: 0.15 },
    { x: 750, y: 1400, width: 160, height: 22, rotation: -0.25 },
    { x: 450, y: 800, width: 140, height: 18, rotation: 0.4 }
  ];
  
  strokes.forEach((stroke, i) => {
    const brushStroke = new FFRect({ 
      color: COLORS.watercolorBlue, 
      width: stroke.width, 
      height: stroke.height, 
      x: stroke.x, 
      y: stroke.y 
    });
    brushStroke.setRotate(stroke.rotation);
    brushStroke.setOpacity(0.3);
    brushStroke.addEffect('fadeIn', 0.3, delay + (i * 0.15));
    scene.addChild(brushStroke);
  });
}

// ============================================
// HELPER: Draw Colored Eiffel Tower
// ============================================
function drawColoredEiffelTower(scene, centerX, centerY, delay = 0) {
  // Base (wide bottom) - colored
  const base1 = new FFRect({ 
    color: COLORS.towerBrown, 
    width: 400, 
    height: 20, 
    x: centerX, 
    y: centerY + 400 
  });
  base1.addEffect('fadeIn', 0.5, delay);
  scene.addChild(base1);
  
  // Left leg - colored
  const leftLeg = new FFRect({ 
    color: COLORS.towerDarkBrown, 
    width: 30, 
    height: 500, 
    x: centerX - 180, 
    y: centerY + 150 
  });
  leftLeg.setRotate(0.15);
  leftLeg.addEffect('fadeIn', 0.5, delay + 0.1);
  scene.addChild(leftLeg);
  
  // Right leg - colored
  const rightLeg = new FFRect({ 
    color: COLORS.towerDarkBrown, 
    width: 30, 
    height: 500, 
    x: centerX + 180, 
    y: centerY + 150 
  });
  rightLeg.setRotate(-0.15);
  rightLeg.addEffect('fadeIn', 0.5, delay + 0.1);
  scene.addChild(rightLeg);
  
  // First platform - colored
  const platform1 = new FFRect({ 
    color: COLORS.towerIron, 
    width: 300, 
    height: 15, 
    x: centerX, 
    y: centerY + 100 
  });
  platform1.addEffect('fadeIn', 0.5, delay + 0.2);
  scene.addChild(platform1);
  
  // Middle section - left - colored
  const midLeft = new FFRect({ 
    color: COLORS.towerRust, 
    width: 25, 
    height: 350, 
    x: centerX - 100, 
    y: centerY - 75 
  });
  midLeft.setRotate(0.08);
  midLeft.addEffect('fadeIn', 0.5, delay + 0.3);
  scene.addChild(midLeft);
  
  // Middle section - right - colored
  const midRight = new FFRect({ 
    color: COLORS.towerRust, 
    width: 25, 
    height: 350, 
    x: centerX + 100, 
    y: centerY - 75 
  });
  midRight.setRotate(-0.08);
  midRight.addEffect('fadeIn', 0.5, delay + 0.3);
  scene.addChild(midRight);
  
  // Second platform - colored
  const platform2 = new FFRect({ 
    color: COLORS.towerIron, 
    width: 180, 
    height: 15, 
    x: centerX, 
    y: centerY - 150 
  });
  platform2.addEffect('fadeIn', 0.5, delay + 0.4);
  scene.addChild(platform2);
  
  // Top section - left - colored
  const topLeft = new FFRect({ 
    color: COLORS.towerBrown, 
    width: 20, 
    height: 200, 
    x: centerX - 50, 
    y: centerY - 300 
  });
  topLeft.setRotate(0.05);
  topLeft.addEffect('fadeIn', 0.5, delay + 0.5);
  scene.addChild(topLeft);
  
  // Top section - right - colored
  const topRight = new FFRect({ 
    color: COLORS.towerBrown, 
    width: 20, 
    height: 200, 
    x: centerX + 50, 
    y: centerY - 300 
  });
  topRight.setRotate(-0.05);
  topRight.addEffect('fadeIn', 0.5, delay + 0.5);
  scene.addChild(topRight);
  
  // Spire - colored
  const spire = new FFRect({ 
    color: COLORS.towerDarkBrown, 
    width: 15, 
    height: 150, 
    x: centerX, 
    y: centerY - 475 
  });
  spire.addEffect('fadeIn', 0.5, delay + 0.6);
  scene.addChild(spire);
  
  // Spire top - colored
  const spireTop = new FFRect({ 
    color: COLORS.towerRust, 
    width: 30, 
    height: 30, 
    x: centerX, 
    y: centerY - 550 
  });
  spireTop.addEffect('fadeIn', 0.4, delay + 0.7);
  scene.addChild(spireTop);
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createSketchToLifeVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 28: "Sketch-to-Life"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~30 seconds'));
  console.log(colors.yellow('🎨 Theme: Travel/Art - Sketch to Reality\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-28-sketch-to-life.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: BLANK CANVAS - Introduction (5s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.canvasWhite);
  scene1.setDuration(5);

  // Canvas texture
  addCanvasTexture(scene1, 0.2);

  // Title text
  const titleText = new FFText({ text: 'SKETCH TO LIFE', x: width/2, y: 600, fontSize: 72 });
  titleText.setColor(COLORS.charcoalBlack);
  titleText.alignCenter();
  titleText.addEffect('fadeIn', 0.8, 0.5);
  scene1.addChild(titleText);

  // Subtitle
  const subtitleText = new FFText({ text: 'An Artistic Journey', x: width/2, y: 720, fontSize: 38 });
  subtitleText.setColor(COLORS.sketchGray);
  subtitleText.alignCenter();
  subtitleText.addEffect('fadeIn', 0.6, 1.2);
  scene1.addChild(subtitleText);

  // Pencil icon
  const pencilText = new FFText({ text: '✏️', x: width/2, y: 900, fontSize: 100 });
  pencilText.alignCenter();
  pencilText.addEffect('bounceIn', 0.6, 2);
  scene1.addChild(pencilText);

  // Location text
  const locationText = new FFText({ text: 'Paris, France', x: width/2, y: 1400, fontSize: 42 });
  locationText.setColor(COLORS.pencilGray);
  locationText.alignCenter();
  locationText.addEffect('fadeIn', 0.6, 3);
  scene1.addChild(locationText);

  scene1.setTransition('fade', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Blank Canvas - Introduction (5s)'));

  // ============================================
  // SCENE 2: DRAWING SKETCH - Pencil Lines (7s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.canvasWhite);
  scene2.setDuration(7);

  // Canvas texture
  addCanvasTexture(scene2, 0.2);

  // Draw Eiffel Tower sketch
  drawEiffelTowerSketch(scene2, width/2, height/2 + 100, 0.5);

  // Drawing hand indicator (pencil moving)
  const pencilIcon = new FFText({ text: '✏️', x: width/2 - 200, y: height/2 - 400, fontSize: 60 });
  pencilIcon.addEffect('fadeIn', 0.3, 0.5);
  
  const drawMotion = {
    from: { x: width/2 - 200, y: height/2 - 400 },
    to: { x: width/2 + 100, y: height/2 + 300 },
    time: 2,
    delay: 1,
    ease: 'Linear.None'
  };
  pencilIcon.addAnimate(drawMotion);
  pencilIcon.addEffect('fadeOut', 0.3, 3);
  scene2.addChild(pencilIcon);

  // "Drawing..." text
  const drawingText = new FFText({ text: 'Drawing...', x: width/2, y: 1600, fontSize: 36 });
  drawingText.setColor(COLORS.sketchGray);
  drawingText.alignCenter();
  drawingText.addEffect('fadeIn', 0.5, 1);
  scene2.addChild(drawingText);

  scene2.setTransition('crosswarp', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Drawing Sketch - Pencil Lines (7s)'));

  // ============================================
  // SCENE 3: ADDING COLOR - Watercolor Fill (6s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.canvasWhite);
  scene3.setDuration(6);

  // Canvas texture
  addCanvasTexture(scene3, 0.15);

  // Sketch outline (fading)
  drawEiffelTowerSketch(scene3, width/2, height/2 + 100, 0);

  // Brush strokes appearing
  addBrushStrokes(scene3, 0.5);

  // Color wash effect (expanding circles)
  for (let i = 0; i < 6; i++) {
    const colorWash = new FFRect({ 
      color: [COLORS.watercolorBlue, COLORS.watercolorPink, COLORS.watercolorYellow][i % 3],
      width: 100, 
      height: 100, 
      x: width/2 + (Math.random() - 0.5) * 300, 
      y: height/2 + (Math.random() - 0.5) * 600 
    });
    colorWash.setOpacity(0.4);
    colorWash.addEffect('fadeIn', 0.3, 1 + (i * 0.3));
    
    const expandAnim = {
      from: { scale: 0.5 },
      to: { scale: 2.5 },
      time: 1.5,
      delay: 1 + (i * 0.3),
      ease: 'Cubic.Out'
    };
    colorWash.addAnimate(expandAnim);
    colorWash.addEffect('fadeOut', 0.5, 2 + (i * 0.3));
    scene3.addChild(colorWash);
  }

  // Colored tower starts appearing
  drawColoredEiffelTower(scene3, width/2, height/2 + 100, 2);

  // "Adding color..." text
  const colorText = new FFText({ text: 'Adding color...', x: width/2, y: 1600, fontSize: 36 });
  colorText.setColor(COLORS.watercolorBlue);
  colorText.alignCenter();
  colorText.addEffect('fadeIn', 0.5, 1.5);
  scene3.addChild(colorText);

  scene3.setTransition('windowslice', 0.5);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Adding Color - Watercolor Fill (6s)'));

  // ============================================
  // SCENE 4: SATURATION BOOST - Coming to Life (6s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.skyLightBlue);
  scene4.setDuration(6);

  // Canvas texture (fading out)
  addCanvasTexture(scene4, 0.08);

  // Sky background (animated)
  const skyBg = new FFRect({ 
    color: COLORS.skyBlue, 
    width: width, 
    height: 1200, 
    x: width/2, 
    y: 600 
  });
  skyBg.addEffect('fadeIn', 0.8, 0);
  scene4.addChild(skyBg);

  // Clouds
  const cloud1 = new FFRect({ 
    color: COLORS.cloudWhite, 
    width: 200, 
    height: 80, 
    x: 250, 
    y: 400 
  });
  cloud1.setOpacity(0.8);
  cloud1.addEffect('fadeInLeft', 0.6, 0.5);
  scene4.addChild(cloud1);

  const cloud2 = new FFRect({ 
    color: COLORS.cloudWhite, 
    width: 180, 
    height: 70, 
    x: 750, 
    y: 550 
  });
  cloud2.setOpacity(0.8);
  cloud2.addEffect('fadeInRight', 0.6, 0.8);
  scene4.addChild(cloud2);

  // Ground/grass
  const ground = new FFRect({ 
    color: COLORS.watercolorGreen, 
    width: width, 
    height: 400, 
    x: width/2, 
    y: height - 200 
  });
  ground.addEffect('fadeInUp', 0.6, 1);
  scene4.addChild(ground);

  // Fully colored Eiffel Tower (vibrant)
  drawColoredEiffelTower(scene4, width/2, height/2 + 100, 1.5);

  // Saturation flash effect
  for (let i = 0; i < 3; i++) {
    const flash = new FFRect({ 
      color: COLORS.sunsetOrange, 
      width: width, 
      height: height, 
      x: width/2, 
      y: height/2 
    });
    flash.setOpacity(0.15);
    flash.addEffect('fadeIn', 0.1, 2 + (i * 0.5));
    flash.addEffect('fadeOut', 0.2, 2.1 + (i * 0.5));
    scene4.addChild(flash);
  }

  // "Coming to life..." text
  const lifeText = new FFText({ text: 'Coming to life...', x: width/2, y: 1700, fontSize: 40 });
  lifeText.setColor(COLORS.white);
  lifeText.alignCenter();
  lifeText.addEffect('fadeIn', 0.6, 2.5);
  scene4.addChild(lifeText);

  scene4.setTransition('zoomIn', 0.6);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Saturation Boost - Coming to Life (6s)'));

  // ============================================
  // SCENE 5: FINAL REVEAL - HD Reality (6s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.skyBlue);
  scene5.setDuration(6);

  // Beautiful sky
  const finalSky = new FFRect({ 
    color: COLORS.skyBlue, 
    width: width, 
    height: 1200, 
    x: width/2, 
    y: 600 
  });
  scene5.addChild(finalSky);

  // Sunset gradient
  const sunset = new FFRect({ 
    color: COLORS.sunsetOrange, 
    width: width, 
    height: 400, 
    x: width/2, 
    y: 400 
  });
  sunset.setOpacity(0.3);
  sunset.addEffect('fadeIn', 0.8, 0);
  scene5.addChild(sunset);

  // Multiple clouds
  for (let i = 0; i < 5; i++) {
    const cloud = new FFRect({ 
      color: COLORS.cloudWhite, 
      width: 150 + (Math.random() * 100), 
      height: 60 + (Math.random() * 40), 
      x: 150 + (i * 200), 
      y: 350 + (Math.random() * 300) 
    });
    cloud.setOpacity(0.7);
    cloud.addEffect('fadeIn', 0.5, 0.3 + (i * 0.2));
    scene5.addChild(cloud);
  }

  // Lush ground
  const finalGround = new FFRect({ 
    color: COLORS.watercolorGreen, 
    width: width, 
    height: 450, 
    x: width/2, 
    y: height - 225 
  });
  finalGround.addEffect('fadeIn', 0.5, 0.5);
  scene5.addChild(finalGround);

  // Final Eiffel Tower (HD quality representation)
  drawColoredEiffelTower(scene5, width/2, height/2 + 100, 0.8);

  // Sparkle effects
  for (let i = 0; i < 15; i++) {
    const sparkle = new FFRect({ 
      color: COLORS.cloudWhite, 
      width: 8, 
      height: 8, 
      x: width/2 + (Math.random() - 0.5) * 400, 
      y: height/2 - 300 + (Math.random() * 600) 
    });
    sparkle.addEffect('fadeIn', 0.2, 1.5 + (Math.random() * 2));
    sparkle.addEffect('fadeOut', 0.3, 2 + (Math.random() * 2));
    scene5.addChild(sparkle);
  }

  // Final title
  const finalTitle = new FFText({ text: 'PARIS', x: width/2, y: 1650, fontSize: 80 });
  finalTitle.setColor(COLORS.white);
  finalTitle.alignCenter();
  finalTitle.addEffect('fadeIn', 0.8, 2);
  scene5.addChild(finalTitle);

  // Subtitle
  const finalSubtitle = new FFText({ text: 'From Sketch to Reality', x: width/2, y: 1770, fontSize: 36 });
  finalSubtitle.setColor(COLORS.cloudWhite);
  finalSubtitle.alignCenter();
  finalSubtitle.addEffect('fadeIn', 0.6, 2.5);
  scene5.addChild(finalSubtitle);

  // Hashtags
  const hashtagText = new FFText({ text: '#Travel #Art #Paris #EiffelTower', x: width/2, y: 1850, fontSize: 28 });
  hashtagText.setColor(COLORS.cloudWhite);
  hashtagText.alignCenter();
  hashtagText.addEffect('fadeIn', 0.5, 3.5);
  scene5.addChild(hashtagText);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Final Reveal - HD Reality (6s)'));

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
    console.log(colors.magenta('\n🎬 Story 28: "Sketch-to-Life" complete!\n'));
    console.log(colors.yellow('🎥 Features used:'));
    console.log(colors.cyan('   • Canvas texture overlay'));
    console.log(colors.cyan('   • Pencil sketch drawing animation'));
    console.log(colors.cyan('   • Watercolor brush strokes'));
    console.log(colors.cyan('   • Color saturation progression'));
    console.log(colors.cyan('   • Sketch-to-reality transformation'));
    console.log(colors.cyan('   • Artistic to HD transition\n'));
  });

  creator.start();
}

createSketchToLifeVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

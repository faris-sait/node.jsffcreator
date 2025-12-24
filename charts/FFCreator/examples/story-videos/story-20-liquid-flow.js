/**
 * 🎬 STORY 20: "Liquid Motion Graphic" - Abstract
 * 
 * The Story: Explaining the concept of "Flow State" through 
 * pure motion graphics with fluid, colorful abstract shapes.
 * 
 * Visual Style:
 * - Fluid, colorful, abstract shapes
 * - Gradient mesh effects
 * - Liquid waves and flowing animations
 * - Text floating on liquid surfaces
 * - No real footage - pure motion graphics
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~45 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-20-liquid-flow.js
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
// COLOR PALETTE - Liquid/Flow Theme
// ============================================
const COLORS = {
  // Gradient colors - vibrant and fluid
  liquidPurple: '#8b5cf6',
  liquidBlue: '#3b82f6',
  liquidCyan: '#06b6d4',
  liquidTeal: '#14b8a6',
  liquidGreen: '#10b981',
  liquidPink: '#ec4899',
  liquidOrange: '#f97316',
  liquidYellow: '#fbbf24',
  
  // Deep gradient colors
  deepPurple: '#6d28d9',
  deepBlue: '#1e40af',
  deepCyan: '#0e7490',
  deepTeal: '#0f766e',
  
  // Light gradient colors
  lightPurple: '#c4b5fd',
  lightBlue: '#93c5fd',
  lightCyan: '#67e8f9',
  lightPink: '#fbcfe8',
  
  // Background
  darkBg: '#0f172a',
  deepBg: '#1e1b4b',
  
  // Text
  white: '#ffffff',
  lightText: '#f1f5f9',
  glowWhite: '#fefefe'
};

// ============================================
// HELPER: Add Liquid Wave Layer
// ============================================
function addLiquidWave(scene, color, startY, waveHeight, delay = 0) {
  // Create wave using multiple overlapping shapes
  for (let i = 0; i < 8; i++) {
    const waveSegment = new FFRect({ 
      color: color, 
      width: 1200, 
      height: waveHeight, 
      x: width/2 + (i * 150) - 600, 
      y: startY + Math.sin(i * 0.5) * 50 
    });
    waveSegment.addEffect('fadeIn', 0.5, delay + (i * 0.1));
    scene.addChild(waveSegment);
  }
}

// ============================================
// HELPER: Add Floating Particle
// ============================================
function addFloatingParticle(scene, x, y, size, color, delay = 0) {
  const particle = new FFRect({ 
    color: color, 
    width: size, 
    height: size, 
    x: x, 
    y: y 
  });
  particle.addEffect('fadeIn', 0.3, delay);
  particle.addEffect('fadeOut', 0.5, delay + 2);
  scene.addChild(particle);
}

// ============================================
// HELPER: Add Gradient Blob
// ============================================
function addGradientBlob(scene, x, y, size, color1, color2, delay = 0) {
  // Outer glow
  const outerGlow = new FFRect({ 
    color: color1, 
    width: size + 100, 
    height: size + 100, 
    x: x, 
    y: y 
  });
  outerGlow.addEffect('fadeIn', 0.5, delay);
  scene.addChild(outerGlow);
  
  // Middle layer
  const middleLayer = new FFRect({ 
    color: color2, 
    width: size + 50, 
    height: size + 50, 
    x: x, 
    y: y 
  });
  middleLayer.addEffect('zoomIn', 0.6, delay + 0.2);
  scene.addChild(middleLayer);
  
  // Core
  const core = new FFRect({ 
    color: color1, 
    width: size, 
    height: size, 
    x: x, 
    y: y 
  });
  core.addEffect('bounceIn', 0.5, delay + 0.4);
  scene.addChild(core);
}

// ============================================
// HELPER: Add Floating Text
// ============================================
function addFloatingText(scene, text, x, y, fontSize, color, delay = 0) {
  // Text shadow/glow
  const shadow = new FFText({ text: text, x: x + 3, y: y + 3, fontSize: fontSize });
  shadow.setColor('rgba(0, 0, 0, 0.3)');
  shadow.alignCenter();
  shadow.addEffect('fadeIn', 0.4, delay);
  scene.addChild(shadow);
  
  // Main text
  const mainText = new FFText({ text: text, x: x, y: y, fontSize: fontSize });
  mainText.setColor(color);
  mainText.alignCenter();
  mainText.addEffect('fadeInUp', 0.5, delay + 0.1);
  scene.addChild(mainText);
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createLiquidFlowVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 20: "Liquid Motion Graphic"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~45 seconds'));
  console.log(colors.yellow('🎨 Theme: Abstract - Flow State\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-20-liquid-flow.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: INTRO - Liquid Emergence (9s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.darkBg);
  scene1.setDuration(9);

  // Deep background gradient
  const bgGradient1 = new FFRect({ color: COLORS.deepBg, width: 1100, height: 1000, x: width/2, y: 500 });
  bgGradient1.addEffect('fadeIn', 0.5, 0);
  scene1.addChild(bgGradient1);

  const bgGradient2 = new FFRect({ color: COLORS.darkBg, width: 1100, height: 1000, x: width/2, y: 1420 });
  bgGradient2.addEffect('fadeIn', 0.5, 0.2);
  scene1.addChild(bgGradient2);

  // Liquid blobs emerging
  addGradientBlob(scene1, width/2, 400, 300, COLORS.liquidPurple, COLORS.deepPurple, 0.5);
  addGradientBlob(scene1, width/2 - 200, 700, 200, COLORS.liquidBlue, COLORS.deepBlue, 1);
  addGradientBlob(scene1, width/2 + 200, 800, 250, COLORS.liquidCyan, COLORS.deepCyan, 1.3);
  addGradientBlob(scene1, width/2, 1100, 280, COLORS.liquidPink, COLORS.liquidPurple, 1.6);

  // Floating particles
  for (let i = 0; i < 30; i++) {
    addFloatingParticle(
      scene1, 
      100 + Math.random() * 880, 
      200 + Math.random() * 1500, 
      5 + Math.random() * 15, 
      i % 3 === 0 ? COLORS.lightPurple : i % 3 === 1 ? COLORS.lightBlue : COLORS.lightCyan,
      2 + Math.random() * 2
    );
  }

  // Title text
  const titleBg = new FFRect({ color: 'rgba(139, 92, 246, 0.3)', width: 800, height: 200, x: width/2, y: 1400 });
  titleBg.addEffect('zoomIn', 0.5, 3);
  scene1.addChild(titleBg);

  addFloatingText(scene1, 'FLOW', width/2, 1350, 120, COLORS.white, 3.5);
  addFloatingText(scene1, 'STATE', width/2, 1480, 100, COLORS.lightPurple, 4);

  // Subtitle
  addFloatingText(scene1, 'A Journey Into Focus', width/2, 1650, 36, COLORS.lightText, 5);

  scene1.setTransition('fade', 0.6);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Intro - Liquid Emergence (9s)'));

  // ============================================
  // SCENE 2: DEFINITION - What is Flow? (9s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.deepBg);
  scene2.setDuration(9);

  // Liquid wave layers
  addLiquidWave(scene2, COLORS.liquidBlue, 300, 400, 0.3);
  addLiquidWave(scene2, COLORS.liquidCyan, 500, 350, 0.6);
  addLiquidWave(scene2, COLORS.liquidTeal, 700, 400, 0.9);

  // Floating blobs
  addGradientBlob(scene2, 200, 400, 180, COLORS.liquidPurple, COLORS.deepPurple, 1.2);
  addGradientBlob(scene2, 880, 600, 200, COLORS.liquidPink, COLORS.liquidPurple, 1.5);
  addGradientBlob(scene2, 300, 1200, 220, COLORS.liquidOrange, COLORS.liquidYellow, 1.8);
  addGradientBlob(scene2, 780, 1400, 190, COLORS.liquidGreen, COLORS.liquidTeal, 2.1);

  // Definition text
  const defBox = new FFRect({ color: 'rgba(15, 23, 42, 0.7)', width: 900, height: 600, x: width/2, y: 1000 });
  defBox.addEffect('fadeIn', 0.5, 2.5);
  scene2.addChild(defBox);

  addFloatingText(scene2, 'WHAT IS', width/2, 800, 50, COLORS.lightCyan, 3);
  addFloatingText(scene2, 'FLOW STATE?', width/2, 900, 70, COLORS.white, 3.5);

  // Definition lines
  const defLines = [
    { text: 'Complete immersion', y: 1050, delay: 4.2 },
    { text: 'in an activity', y: 1120, delay: 4.5 },
    { text: 'Time disappears', y: 1220, delay: 4.8 },
    { text: 'Peak performance', y: 1290, delay: 5.1 }
  ];

  defLines.forEach(line => {
    addFloatingText(scene2, line.text, width/2, line.y, 42, COLORS.lightText, line.delay);
  });

  // Particles flowing
  for (let i = 0; i < 40; i++) {
    addFloatingParticle(
      scene2, 
      50 + Math.random() * 980, 
      100 + Math.random() * 1700, 
      4 + Math.random() * 12, 
      i % 4 === 0 ? COLORS.lightBlue : i % 4 === 1 ? COLORS.lightCyan : i % 4 === 2 ? COLORS.lightPurple : COLORS.lightPink,
      1 + Math.random() * 3
    );
  }

  scene2.setTransition('dreamy', 0.7);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Definition - What is Flow? (9s)'));

  // ============================================
  // SCENE 3: THE ZONE - Entering Flow (9s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.darkBg);
  scene3.setDuration(9);

  // Multiple gradient layers
  const gradLayer1 = new FFRect({ color: COLORS.liquidPurple, width: 1100, height: 600, x: width/2, y: 300 });
  gradLayer1.addEffect('fadeIn', 0.6, 0.2);
  scene3.addChild(gradLayer1);

  const gradLayer2 = new FFRect({ color: COLORS.liquidBlue, width: 1100, height: 600, x: width/2, y: 800 });
  gradLayer2.addEffect('fadeIn', 0.6, 0.5);
  scene3.addChild(gradLayer2);

  const gradLayer3 = new FFRect({ color: COLORS.liquidCyan, width: 1100, height: 600, x: width/2, y: 1300 });
  gradLayer3.addEffect('fadeIn', 0.6, 0.8);
  scene3.addChild(gradLayer3);

  const gradLayer4 = new FFRect({ color: COLORS.liquidTeal, width: 1100, height: 600, x: width/2, y: 1700 });
  gradLayer4.addEffect('fadeIn', 0.6, 1.1);
  scene3.addChild(gradLayer4);

  // Large central blob
  addGradientBlob(scene3, width/2, height/2, 500, COLORS.liquidPink, COLORS.liquidPurple, 1.5);

  // Orbiting blobs
  const orbitRadius = 350;
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60) * (Math.PI / 180);
    const orbitX = width/2 + Math.cos(angle) * orbitRadius;
    const orbitY = height/2 + Math.sin(angle) * orbitRadius;
    addGradientBlob(scene3, orbitX, orbitY, 120, COLORS.liquidYellow, COLORS.liquidOrange, 2 + (i * 0.2));
  }

  // Title
  addFloatingText(scene3, 'ENTERING', width/2, 400, 60, COLORS.white, 2.5);
  addFloatingText(scene3, 'THE ZONE', width/2, 500, 90, COLORS.lightCyan, 3);

  // Characteristics
  const zoneBox = new FFRect({ color: 'rgba(0, 0, 0, 0.5)', width: 800, height: 500, x: width/2, y: 1300 });
  zoneBox.addEffect('fadeIn', 0.5, 4);
  scene3.addChild(zoneBox);

  const characteristics = [
    { text: '🎯 Clear Goals', y: 1150, delay: 4.5 },
    { text: '⚡ Instant Feedback', y: 1240, delay: 4.8 },
    { text: '🧘 Effortless Action', y: 1330, delay: 5.1 },
    { text: '⏰ Time Distortion', y: 1420, delay: 5.4 }
  ];

  characteristics.forEach(char => {
    addFloatingText(scene3, char.text, width/2, char.y, 40, COLORS.lightText, char.delay);
  });

  // Energy particles
  for (let i = 0; i < 50; i++) {
    addFloatingParticle(
      scene3, 
      width/2 + (Math.random() - 0.5) * 800, 
      height/2 + (Math.random() - 0.5) * 1200, 
      3 + Math.random() * 10, 
      i % 5 === 0 ? COLORS.lightPurple : i % 5 === 1 ? COLORS.lightBlue : i % 5 === 2 ? COLORS.lightCyan : i % 5 === 3 ? COLORS.lightPink : COLORS.liquidYellow,
      1.5 + Math.random() * 2.5
    );
  }

  scene3.setTransition('crosswarp', 0.6);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: The Zone - Entering Flow (9s)'));

  // ============================================
  // SCENE 4: BENEFITS - Why Flow Matters (9s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.deepBg);
  scene4.setDuration(9);

  // Liquid waves - multiple colors
  addLiquidWave(scene4, COLORS.liquidGreen, 200, 350, 0.2);
  addLiquidWave(scene4, COLORS.liquidTeal, 450, 400, 0.5);
  addLiquidWave(scene4, COLORS.liquidCyan, 750, 380, 0.8);
  addLiquidWave(scene4, COLORS.liquidBlue, 1050, 350, 1.1);
  addLiquidWave(scene4, COLORS.liquidPurple, 1350, 400, 1.4);

  // Floating benefit blobs
  const benefits = [
    { x: 270, y: 500, size: 200, text: '5X', subtext: 'Productivity', color1: COLORS.liquidGreen, color2: COLORS.liquidTeal, delay: 1.8 },
    { x: 810, y: 650, size: 220, text: '500%', subtext: 'Creativity', color1: COLORS.liquidPurple, color2: COLORS.liquidPink, delay: 2.2 },
    { x: 270, y: 1100, size: 210, text: '∞', subtext: 'Focus', color1: COLORS.liquidBlue, color2: COLORS.liquidCyan, delay: 2.6 },
    { x: 810, y: 1250, size: 190, text: '100%', subtext: 'Presence', color1: COLORS.liquidOrange, color2: COLORS.liquidYellow, delay: 3 }
  ];

  benefits.forEach(benefit => {
    addGradientBlob(scene4, benefit.x, benefit.y, benefit.size, benefit.color1, benefit.color2, benefit.delay);
    addFloatingText(scene4, benefit.text, benefit.x, benefit.y - 30, 70, COLORS.white, benefit.delay + 0.5);
    addFloatingText(scene4, benefit.subtext, benefit.x, benefit.y + 50, 32, COLORS.lightText, benefit.delay + 0.7);
  });

  // Title
  const benefitTitle = new FFRect({ color: 'rgba(139, 92, 246, 0.4)', width: 850, height: 150, x: width/2, y: 250 });
  benefitTitle.addEffect('zoomIn', 0.5, 1);
  scene4.addChild(benefitTitle);

  addFloatingText(scene4, 'THE BENEFITS', width/2, 250, 65, COLORS.white, 1.5);

  // Bottom message
  const bottomBox = new FFRect({ color: 'rgba(0, 0, 0, 0.6)', width: 900, height: 200, x: width/2, y: 1600 });
  bottomBox.addEffect('fadeIn', 0.5, 4);
  scene4.addChild(bottomBox);

  addFloatingText(scene4, 'Peak Performance', width/2, 1560, 50, COLORS.lightCyan, 4.5);
  addFloatingText(scene4, 'Unlocked', width/2, 1640, 45, COLORS.lightText, 4.8);

  // Ambient particles
  for (let i = 0; i < 60; i++) {
    addFloatingParticle(
      scene4, 
      Math.random() * width, 
      Math.random() * height, 
      3 + Math.random() * 8, 
      i % 6 === 0 ? COLORS.lightGreen : i % 6 === 1 ? COLORS.lightBlue : i % 6 === 2 ? COLORS.lightCyan : i % 6 === 3 ? COLORS.lightPurple : i % 6 === 4 ? COLORS.lightPink : COLORS.liquidYellow,
      0.5 + Math.random() * 3
    );
  }

  scene4.setTransition('colorphase', 0.7);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Benefits - Why Flow Matters (9s)'));

  // ============================================
  // SCENE 5: OUTRO - Find Your Flow (9s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.darkBg);
  scene5.setDuration(9);

  // Massive gradient background
  const finalGrad1 = new FFRect({ color: COLORS.liquidPurple, width: 1200, height: 700, x: width/2, y: 350 });
  finalGrad1.addEffect('fadeIn', 0.7, 0.3);
  scene5.addChild(finalGrad1);

  const finalGrad2 = new FFRect({ color: COLORS.liquidBlue, width: 1200, height: 700, x: width/2, y: 900 });
  finalGrad2.addEffect('fadeIn', 0.7, 0.6);
  scene5.addChild(finalGrad2);

  const finalGrad3 = new FFRect({ color: COLORS.liquidCyan, width: 1200, height: 700, x: width/2, y: 1450 });
  finalGrad3.addEffect('fadeIn', 0.7, 0.9);
  scene5.addChild(finalGrad3);

  // Central massive blob
  addGradientBlob(scene5, width/2, height/2, 600, COLORS.liquidPink, COLORS.liquidPurple, 1.5);

  // Surrounding energy blobs
  const energyPositions = [
    { x: width/2, y: 300 },
    { x: width/2 - 300, y: 600 },
    { x: width/2 + 300, y: 600 },
    { x: width/2 - 350, y: 1200 },
    { x: width/2 + 350, y: 1200 },
    { x: width/2, y: 1600 }
  ];

  energyPositions.forEach((pos, i) => {
    addGradientBlob(scene5, pos.x, pos.y, 150, COLORS.liquidYellow, COLORS.liquidOrange, 2 + (i * 0.2));
  });

  // Main message
  const mainBox = new FFRect({ color: 'rgba(0, 0, 0, 0.6)', width: 850, height: 400, x: width/2, y: height/2 });
  mainBox.addEffect('zoomIn', 0.6, 3);
  scene5.addChild(mainBox);

  addFloatingText(scene5, 'FIND YOUR', width/2, height/2 - 120, 60, COLORS.lightCyan, 3.5);
  addFloatingText(scene5, 'FLOW', width/2, height/2 - 20, 120, COLORS.white, 4);
  addFloatingText(scene5, 'STATE', width/2, height/2 + 90, 100, COLORS.lightPurple, 4.5);

  // Call to action
  const ctaBox = new FFRect({ color: COLORS.liquidPurple, width: 700, height: 120, x: width/2, y: 1450 });
  ctaBox.addEffect('zoomIn', 0.5, 5.5);
  scene5.addChild(ctaBox);

  addFloatingText(scene5, '👆 FOLLOW FOR MORE', width/2, 1450, 40, COLORS.white, 6);

  // Hashtags
  addFloatingText(scene5, '#FlowState #Productivity #Focus', width/2, 1650, 28, COLORS.lightText, 6.5);

  // Final particle explosion
  for (let i = 0; i < 80; i++) {
    const angle = (i * 4.5) * (Math.PI / 180);
    const radius = 100 + Math.random() * 400;
    const px = width/2 + Math.cos(angle) * radius;
    const py = height/2 + Math.sin(angle) * radius;
    addFloatingParticle(
      scene5, 
      px, 
      py, 
      4 + Math.random() * 12, 
      i % 7 === 0 ? COLORS.lightPurple : i % 7 === 1 ? COLORS.lightBlue : i % 7 === 2 ? COLORS.lightCyan : i % 7 === 3 ? COLORS.lightPink : i % 7 === 4 ? COLORS.liquidYellow : i % 7 === 5 ? COLORS.liquidGreen : COLORS.liquidOrange,
      2 + Math.random() * 2
    );
  }

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Outro - Find Your Flow (9s)'));

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
    console.log(colors.magenta('\n🎬 Story 20: "Liquid Motion Graphic" complete!\n'));
  });

  creator.start();
}

createLiquidFlowVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

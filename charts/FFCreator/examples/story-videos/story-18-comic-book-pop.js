/**
 * 🎬 STORY 18: "Comic Book Pop" - Action/Comedy
 * 
 * The Story: Someone tries to open a jar and fails, ending in an 
 * epic "superhero" effort with comic book style effects.
 * 
 * Visual Style:
 * - Bright primary colors (red, blue, yellow)
 * - Halftone dots pattern overlay
 * - Comic book panel splits (3-panel grid)
 * - Freeze frames with posterize effect
 * - Onomatopoeia overlays (BAM! POW! CRACK!)
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~45 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-18-comic-book-pop.js
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
// COLOR PALETTE - Comic Book Theme
// ============================================
const COLORS = {
  // Primary comic colors
  comicRed: '#ff0000',
  comicBlue: '#0066ff',
  comicYellow: '#ffff00',
  comicGreen: '#00ff00',
  comicPurple: '#9900ff',
  comicOrange: '#ff6600',
  
  // Background colors
  white: '#ffffff',
  black: '#000000',
  paperWhite: '#f5f5f5',
  inkBlack: '#1a1a1a',
  
  // Panel borders
  panelBorder: '#000000',
  panelShadow: '#333333',
  
  // Halftone/texture
  halftoneBlue: '#0099ff',
  halftonePink: '#ff66cc',
  halftoneYellow: '#ffcc00',
  
  // Text colors
  textWhite: '#ffffff',
  textBlack: '#000000',
  textYellow: '#ffff00',
  outlineBlack: '#000000'
};

// ============================================
// HELPER: Add Halftone Dots Pattern
// ============================================
function addHalftonePattern(scene, color, delay = 0) {
  // Create halftone dot pattern
  for (let row = 0; row < 25; row++) {
    for (let col = 0; col < 15; col++) {
      const dotSize = 3 + Math.random() * 5;
      const dot = new FFRect({ 
        color: color, 
        width: dotSize, 
        height: dotSize, 
        x: 40 + (col * 72), 
        y: 40 + (row * 80) 
      });
      dot.addEffect('fadeIn', 0.2, delay + (row * 0.01));
      scene.addChild(dot);
    }
  }
}

// ============================================
// HELPER: Add Comic Text with Outline
// ============================================
function addComicText(scene, text, x, y, fontSize, color, delay = 0, effect = 'bounceIn') {
  // Shadow/outline effect
  const shadow = new FFText({ text: text, x: x + 4, y: y + 4, fontSize: fontSize });
  shadow.setColor(COLORS.outlineBlack);
  shadow.alignCenter();
  shadow.addEffect(effect, 0.3, delay);
  scene.addChild(shadow);
  
  // Main text
  const mainText = new FFText({ text: text, x: x, y: y, fontSize: fontSize });
  mainText.setColor(color);
  mainText.alignCenter();
  mainText.addEffect(effect, 0.3, delay + 0.05);
  scene.addChild(mainText);
}

// ============================================
// HELPER: Add Onomatopoeia Burst
// ============================================
function addOnomatopoeia(scene, text, x, y, color, delay = 0) {
  // Burst background
  const burstSize = 350;
  const burst = new FFRect({ color: color, width: burstSize, height: burstSize, x: x, y: y });
  burst.addEffect('zoomIn', 0.3, delay);
  scene.addChild(burst);
  
  // Star burst lines
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) * (Math.PI / 180);
    const lineLength = 180;
    const lineX = x + Math.cos(angle) * lineLength;
    const lineY = y + Math.sin(angle) * lineLength;
    const burstLine = new FFRect({ color: COLORS.white, width: 80, height: 12, x: lineX, y: lineY });
    burstLine.addEffect('zoomIn', 0.2, delay + 0.1 + (i * 0.02));
    scene.addChild(burstLine);
  }
  
  // Text with outline
  addComicText(scene, text, x, y, 100, COLORS.textWhite, delay + 0.2, 'bounceIn');
}

// ============================================
// HELPER: Add Comic Panel Border
// ============================================
function addPanelBorder(scene, x, y, w, h, delay = 0) {
  // Shadow
  const shadow = new FFRect({ color: COLORS.panelShadow, width: w + 10, height: h + 10, x: x + 5, y: y + 5 });
  shadow.addEffect('fadeIn', 0.2, delay);
  scene.addChild(shadow);
  
  // Border
  const border = new FFRect({ color: COLORS.panelBorder, width: w, height: h, x: x, y: y });
  border.addEffect('zoomIn', 0.3, delay + 0.1);
  scene.addChild(border);
  
  // Inner white
  const inner = new FFRect({ color: COLORS.white, width: w - 20, height: h - 20, x: x, y: y });
  inner.addEffect('fadeIn', 0.2, delay + 0.2);
  scene.addChild(inner);
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createComicBookPopVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 18: "Comic Book Pop"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~45 seconds'));
  console.log(colors.yellow('🎨 Theme: Action/Comedy - Comic Book Style\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-18-comic-book-pop.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: INTRO - Comic Book Title (8s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.comicYellow);
  scene1.setDuration(8);

  // Halftone background
  addHalftonePattern(scene1, 'rgba(255, 0, 0, 0.2)', 0.2);

  // Title burst
  const titleBurst = new FFRect({ color: COLORS.comicRed, width: 800, height: 800, x: width/2, y: 500 });
  titleBurst.addEffect('zoomIn', 0.6, 0.5);
  scene1.addChild(titleBurst);

  // Burst rays
  for (let i = 0; i < 16; i++) {
    const angle = (i * 22.5) * (Math.PI / 180);
    const rayLength = 400;
    const rayX = width/2 + Math.cos(angle) * rayLength;
    const rayY = 500 + Math.sin(angle) * rayLength;
    const ray = new FFRect({ color: COLORS.comicYellow, width: 120, height: 20, x: rayX, y: rayY });
    ray.addEffect('zoomIn', 0.3, 0.7 + (i * 0.03));
    scene1.addChild(ray);
  }

  // Main title
  addComicText(scene1, 'COMIC', width/2, 420, 120, COLORS.textWhite, 1, 'backInDown');
  addComicText(scene1, 'BOOK', width/2, 540, 110, COLORS.textYellow, 1.3, 'backInDown');
  addComicText(scene1, 'POP!', width/2, 650, 100, COLORS.textWhite, 1.6, 'bounceIn');

  // Subtitle
  const subtitleBox = new FFRect({ color: COLORS.comicBlue, width: 700, height: 100, x: width/2, y: 850 });
  subtitleBox.addEffect('zoomIn', 0.4, 2.2);
  scene1.addChild(subtitleBox);

  addComicText(scene1, 'THE JAR CHALLENGE', width/2, 850, 48, COLORS.textWhite, 2.5, 'fadeIn');

  // Character intro
  const heroIcon = new FFText({ text: '🦸', x: width/2, y: 1100, fontSize: 150 });
  heroIcon.alignCenter();
  heroIcon.addEffect('bounceIn', 0.6, 3);
  scene1.addChild(heroIcon);

  addComicText(scene1, 'VS', width/2, 1300, 70, COLORS.comicRed, 3.5, 'zoomIn');

  const jarIcon = new FFText({ text: '🫙', x: width/2, y: 1500, fontSize: 150 });
  jarIcon.alignCenter();
  jarIcon.addEffect('bounceIn', 0.6, 4);
  scene1.addChild(jarIcon);

  // Bottom text
  addComicText(scene1, 'AN EPIC BATTLE', width/2, 1750, 40, COLORS.comicRed, 5, 'fadeInUp');

  scene1.setTransition('zoomIn', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Intro - Comic Book Title (8s)'));

  // ============================================
  // SCENE 2: ATTEMPT 1 - First Try (9s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.comicBlue);
  scene2.setDuration(9);

  // Halftone pattern
  addHalftonePattern(scene2, 'rgba(255, 255, 255, 0.15)', 0.1);

  // Panel border
  addPanelBorder(scene2, width/2, height/2, 900, 1600, 0.3);

  // Scene title
  addComicText(scene2, 'ATTEMPT #1', width/2, 250, 60, COLORS.comicYellow, 0.8, 'fadeInDown');

  // Character (stick figure representation)
  const head = new FFRect({ color: COLORS.comicRed, width: 120, height: 120, x: width/2, y: 600 });
  head.addEffect('bounceIn', 0.4, 1.2);
  scene2.addChild(head);

  const body = new FFRect({ color: COLORS.comicRed, width: 20, height: 200, x: width/2, y: 750 });
  body.addEffect('fadeIn', 0.3, 1.4);
  scene2.addChild(body);

  const armLeft = new FFRect({ color: COLORS.comicRed, width: 120, height: 15, x: width/2 - 70, y: 700 });
  armLeft.addEffect('fadeInLeft', 0.3, 1.6);
  scene2.addChild(armLeft);

  const armRight = new FFRect({ color: COLORS.comicRed, width: 120, height: 15, x: width/2 + 70, y: 700 });
  armRight.addEffect('fadeInRight', 0.3, 1.6);
  scene2.addChild(armRight);

  // Jar
  const jar = new FFRect({ color: COLORS.comicYellow, width: 150, height: 200, x: width/2, y: 1050 });
  jar.addEffect('zoomIn', 0.4, 1.8);
  scene2.addChild(jar);

  const jarLid = new FFRect({ color: COLORS.comicRed, width: 160, height: 40, x: width/2, y: 960 });
  jarLid.addEffect('zoomIn', 0.3, 2);
  scene2.addChild(jarLid);

  // Effort lines
  for (let i = 0; i < 8; i++) {
    const effortLine = new FFRect({ 
      color: COLORS.white, 
      width: 80, 
      height: 4, 
      x: width/2 - 200 + (i * 20), 
      y: 700 + (i * 15) 
    });
    effortLine.addEffect('fadeIn', 0.2, 3 + (i * 0.1));
    scene2.addChild(effortLine);
  }

  // Sweat drops
  const sweat1 = new FFText({ text: '💧', x: width/2 - 80, y: 550, fontSize: 40 });
  sweat1.addEffect('fadeInDown', 0.3, 3.5);
  scene2.addChild(sweat1);

  const sweat2 = new FFText({ text: '💧', x: width/2 + 80, y: 570, fontSize: 40 });
  sweat2.addEffect('fadeInDown', 0.3, 3.7);
  scene2.addChild(sweat2);

  // Thought bubble
  const thoughtBubble = new FFRect({ color: COLORS.white, width: 300, height: 150, x: width/2 + 250, y: 450 });
  thoughtBubble.addEffect('bounceIn', 0.4, 4);
  scene2.addChild(thoughtBubble);

  addComicText(scene2, 'EASY...', width/2 + 250, 450, 40, COLORS.comicBlue, 4.3, 'fadeIn');

  // Onomatopoeia
  addOnomatopoeia(scene2, 'TWIST!', width/2, 1350, COLORS.comicGreen, 5);

  // Result text
  addComicText(scene2, 'NOTHING HAPPENED', width/2, 1650, 45, COLORS.comicRed, 6.5, 'fadeIn');

  scene2.setTransition('directionalwarp', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Attempt 1 - First Try (9s)'));

  // ============================================
  // SCENE 3: ATTEMPT 2 - Getting Serious (9s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.comicOrange);
  scene3.setDuration(9);

  // Halftone pattern
  addHalftonePattern(scene3, 'rgba(255, 0, 0, 0.2)', 0.1);

  // Panel border
  addPanelBorder(scene3, width/2, height/2, 900, 1600, 0.3);

  // Scene title
  addComicText(scene3, 'ATTEMPT #2', width/2, 250, 60, COLORS.comicRed, 0.8, 'fadeInDown');
  addComicText(scene3, 'GETTING SERIOUS', width/2, 340, 40, COLORS.white, 1.1, 'fadeIn');

  // Character - more determined
  const head2 = new FFRect({ color: COLORS.comicBlue, width: 130, height: 130, x: width/2, y: 600 });
  head2.addEffect('bounceIn', 0.4, 1.5);
  scene3.addChild(head2);

  // Angry eyes
  const eye1 = new FFRect({ color: COLORS.white, width: 30, height: 30, x: width/2 - 30, y: 590 });
  eye1.addEffect('fadeIn', 0.2, 1.8);
  scene3.addChild(eye1);

  const eye2 = new FFRect({ color: COLORS.white, width: 30, height: 30, x: width/2 + 30, y: 590 });
  eye2.addEffect('fadeIn', 0.2, 1.8);
  scene3.addChild(eye2);

  const body2 = new FFRect({ color: COLORS.comicBlue, width: 25, height: 220, x: width/2, y: 760 });
  body2.addEffect('fadeIn', 0.3, 1.7);
  scene3.addChild(body2);

  // Arms gripping
  const armLeft2 = new FFRect({ color: COLORS.comicBlue, width: 140, height: 20, x: width/2 - 80, y: 720 });
  armLeft2.addEffect('fadeInLeft', 0.3, 1.9);
  scene3.addChild(armLeft2);

  const armRight2 = new FFRect({ color: COLORS.comicBlue, width: 140, height: 20, x: width/2 + 80, y: 720 });
  armRight2.addEffect('fadeInRight', 0.3, 1.9);
  scene3.addChild(armRight2);

  // Jar - same position
  const jar2 = new FFRect({ color: COLORS.comicYellow, width: 150, height: 200, x: width/2, y: 1050 });
  jar2.addEffect('zoomIn', 0.4, 2.1);
  scene3.addChild(jar2);

  const jarLid2 = new FFRect({ color: COLORS.comicRed, width: 160, height: 40, x: width/2, y: 960 });
  jarLid2.addEffect('zoomIn', 0.3, 2.3);
  scene3.addChild(jarLid2);

  // More effort lines
  for (let i = 0; i < 12; i++) {
    const effortLine = new FFRect({ 
      color: COLORS.comicRed, 
      width: 100, 
      height: 6, 
      x: width/2 - 250 + (i * 25), 
      y: 700 + (i * 20) 
    });
    effortLine.addEffect('fadeIn', 0.15, 3 + (i * 0.08));
    scene3.addChild(effortLine);
  }

  // Shake effect lines
  for (let i = 0; i < 6; i++) {
    const shakeLine = new FFRect({ 
      color: COLORS.white, 
      width: 4, 
      height: 150, 
      x: width/2 - 100 + (i * 40), 
      y: 1050 
    });
    shakeLine.addEffect('fadeIn', 0.1, 4 + (i * 0.05));
    shakeLine.addEffect('fadeOut', 0.1, 4.5 + (i * 0.05));
    scene3.addChild(shakeLine);
  }

  // Multiple sweat drops
  for (let i = 0; i < 5; i++) {
    const sweat = new FFText({ text: '💧', x: width/2 - 100 + (i * 50), y: 530 + (i * 10), fontSize: 35 });
    sweat.addEffect('fadeInDown', 0.2, 4 + (i * 0.15));
    scene3.addChild(sweat);
  }

  // Onomatopoeia
  addOnomatopoeia(scene3, 'GRUNT!', width/2, 1400, COLORS.comicPurple, 5);

  // Result
  addComicText(scene3, 'STILL STUCK!', width/2, 1680, 50, COLORS.comicRed, 6.5, 'bounceIn');

  scene3.setTransition('crosswarp', 0.5);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Attempt 2 - Getting Serious (9s)'));

  // ============================================
  // SCENE 4: SUPERHERO MODE - 3-Panel Grid (10s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.black);
  scene4.setDuration(10);

  // Title
  addComicText(scene4, 'SUPERHERO MODE!', width/2, 150, 65, COLORS.comicYellow, 0.5, 'backInDown');

  // 3-Panel Grid Layout
  const panelWidth = 320;
  const panelHeight = 500;
  const panelSpacing = 20;
  const startY = 350;

  // Panel 1 - Top (Power Up)
  addPanelBorder(scene4, width/2, startY, panelWidth, panelHeight, 1);

  const powerIcon1 = new FFText({ text: '⚡', x: width/2, y: startY - 50, fontSize: 80 });
  powerIcon1.addEffect('bounceIn', 0.4, 1.5);
  scene4.addChild(powerIcon1);

  addComicText(scene4, 'POWER', width/2, startY + 50, 50, COLORS.comicYellow, 1.8, 'zoomIn');
  addComicText(scene4, 'UP!', width/2, startY + 120, 60, COLORS.comicRed, 2.1, 'bounceIn');

  // Energy aura
  for (let i = 0; i < 8; i++) {
    const aura = new FFRect({ 
      color: COLORS.comicYellow, 
      width: 200 + (i * 20), 
      height: 200 + (i * 20), 
      x: width/2, 
      y: startY 
    });
    aura.addEffect('fadeIn', 0.2, 2.5 + (i * 0.1));
    aura.addEffect('fadeOut', 0.2, 3 + (i * 0.1));
    scene4.addChild(aura);
  }

  // Panel 2 - Middle (The Grip)
  const panel2Y = startY + panelHeight + panelSpacing;
  addPanelBorder(scene4, width/2, panel2Y, panelWidth, panelHeight, 3.5);

  // Hands gripping jar
  const hand1 = new FFRect({ color: COLORS.comicRed, width: 100, height: 80, x: width/2 - 60, y: panel2Y - 50 });
  hand1.addEffect('fadeInLeft', 0.4, 4);
  scene4.addChild(hand1);

  const hand2 = new FFRect({ color: COLORS.comicRed, width: 100, height: 80, x: width/2 + 60, y: panel2Y - 50 });
  hand2.addEffect('fadeInRight', 0.4, 4);
  scene4.addChild(hand2);

  const jarClose = new FFRect({ color: COLORS.comicYellow, width: 120, height: 150, x: width/2, y: panel2Y });
  jarClose.addEffect('zoomIn', 0.5, 4.3);
  scene4.addChild(jarClose);

  addComicText(scene4, 'THE', width/2, panel2Y + 120, 40, COLORS.comicBlue, 4.8, 'fadeIn');
  addComicText(scene4, 'GRIP', width/2, panel2Y + 180, 55, COLORS.comicRed, 5.1, 'bounceIn');

  // Grip lines
  for (let i = 0; i < 10; i++) {
    const gripLine = new FFRect({ 
      color: COLORS.white, 
      width: 60, 
      height: 4, 
      x: width/2 - 150 + (i * 15), 
      y: panel2Y - 50 + (i * 10) 
    });
    gripLine.addEffect('fadeIn', 0.1, 5.5 + (i * 0.05));
    scene4.addChild(gripLine);
  }

  // Panel 3 - Bottom (The Twist)
  const panel3Y = panel2Y + panelHeight + panelSpacing;
  addPanelBorder(scene4, width/2, panel3Y, panelWidth, panelHeight, 6);

  // Rotation arrows
  const arrow1 = new FFText({ text: '↻', x: width/2 - 80, y: panel3Y - 80, fontSize: 70 });
  arrow1.addEffect('rotateIn', 0.4, 6.5);
  scene4.addChild(arrow1);

  const arrow2 = new FFText({ text: '↻', x: width/2 + 80, y: panel3Y - 80, fontSize: 70 });
  arrow2.addEffect('rotateIn', 0.4, 6.7);
  scene4.addChild(arrow2);

  addComicText(scene4, 'MAXIMUM', width/2, panel3Y + 50, 45, COLORS.comicOrange, 7, 'fadeIn');
  addComicText(scene4, 'EFFORT!', width/2, panel3Y + 120, 55, COLORS.comicRed, 7.3, 'bounceIn');

  // Onomatopoeia burst
  addOnomatopoeia(scene4, 'TWIST!', width/2, panel3Y + 220, COLORS.comicPurple, 7.8);

  scene4.setTransition('zoomIn', 0.6);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Superhero Mode - 3-Panel Grid (10s)'));

  // ============================================
  // SCENE 5: VICTORY - Success! (9s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.comicGreen);
  scene5.setDuration(9);

  // Halftone celebration pattern
  addHalftonePattern(scene5, 'rgba(255, 255, 0, 0.3)', 0.1);

  // Victory burst
  const victoryBurst = new FFRect({ color: COLORS.comicYellow, width: 900, height: 900, x: width/2, y: 600 });
  victoryBurst.addEffect('zoomIn', 0.7, 0.3);
  scene5.addChild(victoryBurst);

  // Burst rays
  for (let i = 0; i < 20; i++) {
    const angle = (i * 18) * (Math.PI / 180);
    const rayLength = 450;
    const rayX = width/2 + Math.cos(angle) * rayLength;
    const rayY = 600 + Math.sin(angle) * rayLength;
    const ray = new FFRect({ color: COLORS.white, width: 150, height: 25, x: rayX, y: rayY });
    ray.addEffect('zoomIn', 0.3, 0.5 + (i * 0.02));
    scene5.addChild(ray);
  }

  // Open jar
  const openJar = new FFRect({ color: COLORS.comicYellow, width: 180, height: 220, x: width/2, y: 700 });
  openJar.addEffect('bounceIn', 0.5, 1.2);
  scene5.addChild(openJar);

  // Lid flying off
  const flyingLid = new FFRect({ color: COLORS.comicRed, width: 190, height: 50, x: width/2 + 150, y: 400 });
  flyingLid.addEffect('fadeInRight', 0.5, 1.5);
  scene5.addChild(flyingLid);

  // Motion lines for lid
  for (let i = 0; i < 5; i++) {
    const motionLine = new FFRect({ 
      color: COLORS.white, 
      width: 80 - (i * 15), 
      height: 5, 
      x: width/2 + 50 - (i * 20), 
      y: 400 + (i * 5) 
    });
    motionLine.addEffect('fadeIn', 0.2, 1.7 + (i * 0.1));
    scene5.addChild(motionLine);
  }

  // Victory text
  addOnomatopoeia(scene5, 'POP!', width/2, 950, COLORS.comicRed, 2);

  // Success message
  const successBox = new FFRect({ color: COLORS.comicBlue, width: 700, height: 200, x: width/2, y: 1250 });
  successBox.addEffect('zoomIn', 0.5, 3);
  scene5.addChild(successBox);

  addComicText(scene5, 'SUCCESS!', width/2, 1200, 90, COLORS.textWhite, 3.3, 'bounceIn');
  addComicText(scene5, 'JAR DEFEATED!', width/2, 1310, 50, COLORS.comicYellow, 3.6, 'fadeIn');

  // Trophy
  const trophy = new FFText({ text: '🏆', x: width/2, y: 1500, fontSize: 120 });
  trophy.addEffect('bounceIn', 0.6, 4.2);
  scene5.addChild(trophy);

  // Stars
  const stars = ['⭐', '⭐', '⭐'];
  stars.forEach((star, i) => {
    const starText = new FFText({ text: star, x: 300 + (i * 240), y: 1650, fontSize: 80 });
    starText.addEffect('bounceIn', 0.4, 5 + (i * 0.2));
    scene5.addChild(starText);
  });

  // Final message
  addComicText(scene5, 'THE END', width/2, 1800, 55, COLORS.comicRed, 6.5, 'fadeIn');

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Victory - Success! (9s)'));

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
    console.log(colors.magenta('\n🎬 Story 18: "Comic Book Pop" complete!\n'));
  });

  creator.start();
}

createComicBookPopVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

/**
 * 🎬 STORY 23: "Retro Gaming UI" - Nostalgia
 * 
 * The Story: A "Life Hack" video presented as a Level 1 
 * video game tutorial with 8-bit aesthetics.
 * 
 * Visual Style:
 * - 8-bit, pixelated, vibrant colors
 * - Retro gaming UI elements
 * - Health bar that increases with success
 * - Score counter
 * - Sprite-style animations
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~45 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-23-retro-gaming.js
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
// COLOR PALETTE - 8-bit Retro Theme
// ============================================
const COLORS = {
  // Classic 8-bit colors
  pixelBlack: '#000000',
  pixelWhite: '#ffffff',
  
  // Vibrant retro colors
  arcadeRed: '#ff0040',
  arcadeBlue: '#0080ff',
  arcadeGreen: '#00ff00',
  arcadeYellow: '#ffff00',
  arcadePurple: '#ff00ff',
  arcadeCyan: '#00ffff',
  arcadeOrange: '#ff8000',
  
  // Background colors
  gameBlack: '#0a0a0a',
  gameDark: '#1a1a2e',
  gameBlue: '#16213e',
  
  // UI elements
  healthGreen: '#00ff00',
  healthYellow: '#ffff00',
  healthRed: '#ff0040',
  
  // Text
  textWhite: '#ffffff',
  textYellow: '#ffff00',
  textCyan: '#00ffff'
};

// ============================================
// HELPER: Add Pixelated Border
// ============================================
function addPixelBorder(scene, x, y, w, h, color, delay = 0) {
  const pixelSize = 20;
  
  // Top border
  for (let i = 0; i < w / pixelSize; i++) {
    const pixel = new FFRect({ 
      color: color, 
      width: pixelSize, 
      height: pixelSize, 
      x: x - w/2 + (i * pixelSize) + pixelSize/2, 
      y: y - h/2 
    });
    pixel.addEffect('fadeIn', 0.1, delay + (i * 0.02));
    scene.addChild(pixel);
  }
  
  // Bottom border
  for (let i = 0; i < w / pixelSize; i++) {
    const pixel = new FFRect({ 
      color: color, 
      width: pixelSize, 
      height: pixelSize, 
      x: x - w/2 + (i * pixelSize) + pixelSize/2, 
      y: y + h/2 
    });
    pixel.addEffect('fadeIn', 0.1, delay + (i * 0.02));
    scene.addChild(pixel);
  }
}

// ============================================
// HELPER: Add Health Bar
// ============================================
function addHealthBar(scene, currentHealth, maxHealth, delay = 0) {
  const barWidth = 800;
  const barHeight = 50;
  const barX = width/2;
  const barY = 150;
  
  // Label
  const label = new FFText({ text: 'PRODUCTIVITY', x: 200, y: barY, fontSize: 32 });
  label.setColor(COLORS.textWhite);
  label.setAnchor(0, 0.5);
  label.addEffect('fadeIn', 0.3, delay);
  scene.addChild(label);
  
  // Background
  const bgBar = new FFRect({ color: COLORS.pixelBlack, width: barWidth, height: barHeight, x: barX, y: barY });
  bgBar.addEffect('fadeIn', 0.2, delay + 0.1);
  scene.addChild(bgBar);
  
  // Border
  const border = new FFRect({ color: COLORS.textWhite, width: barWidth + 4, height: barHeight + 4, x: barX, y: barY });
  border.addEffect('fadeIn', 0.2, delay + 0.2);
  scene.addChild(border);
  
  // Health fill
  const fillWidth = (currentHealth / maxHealth) * (barWidth - 10);
  const fillColor = currentHealth > 70 ? COLORS.healthGreen : currentHealth > 30 ? COLORS.healthYellow : COLORS.healthRed;
  const healthFill = new FFRect({ color: fillColor, width: fillWidth, height: barHeight - 10, x: barX - (barWidth - fillWidth)/2 - 5, y: barY });
  healthFill.addEffect('zoomIn', 0.5, delay + 0.4);
  scene.addChild(healthFill);
  
  // Health text
  const healthText = new FFText({ text: `${currentHealth}/${maxHealth}`, x: barX, y: barY, fontSize: 28 });
  healthText.setColor(COLORS.pixelBlack);
  healthText.alignCenter();
  healthText.addEffect('fadeIn', 0.2, delay + 0.6);
  scene.addChild(healthText);
}

// ============================================
// HELPER: Add Score Counter
// ============================================
function addScoreCounter(scene, score, delay = 0) {
  const scoreLabel = new FFText({ text: 'SCORE', x: 150, y: 250, fontSize: 36 });
  scoreLabel.setColor(COLORS.textYellow);
  scoreLabel.setAnchor(0, 0.5);
  scoreLabel.addEffect('fadeIn', 0.3, delay);
  scene.addChild(scoreLabel);
  
  const scoreValue = new FFText({ text: score.toString().padStart(6, '0'), x: 350, y: 250, fontSize: 48 });
  scoreValue.setColor(COLORS.textWhite);
  scoreValue.setAnchor(0, 0.5);
  scoreValue.addEffect('bounceIn', 0.4, delay + 0.2);
  scene.addChild(scoreValue);
}

// ============================================
// HELPER: Add Pixel Sprite
// ============================================
function addPixelSprite(scene, x, y, size, color, delay = 0) {
  const pixelSize = size / 8;
  
  // Simple 8x8 sprite pattern (person shape)
  const pattern = [
    [0,0,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,0],
    [0,1,0,1,1,0,1,0],
    [0,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,0,0],
    [0,0,1,0,0,1,0,0],
    [0,1,1,0,0,1,1,0],
    [1,1,0,0,0,0,1,1]
  ];
  
  pattern.forEach((row, rowIndex) => {
    row.forEach((pixel, colIndex) => {
      if (pixel === 1) {
        const px = x - size/2 + (colIndex * pixelSize) + pixelSize/2;
        const py = y - size/2 + (rowIndex * pixelSize) + pixelSize/2;
        const pixelRect = new FFRect({ color: color, width: pixelSize, height: pixelSize, x: px, y: py });
        pixelRect.addEffect('fadeIn', 0.1, delay + (rowIndex * 0.02));
        scene.addChild(pixelRect);
      }
    });
  });
}

// ============================================
// HELPER: Add Coin/Star Sprite
// ============================================
function addCoinSprite(scene, x, y, delay = 0) {
  const coinSize = 60;
  const coin = new FFRect({ color: COLORS.arcadeYellow, width: coinSize, height: coinSize, x: x, y: y });
  coin.addEffect('bounceIn', 0.4, delay);
  scene.addChild(coin);
  
  const coinInner = new FFRect({ color: COLORS.arcadeOrange, width: coinSize - 20, height: coinSize - 20, x: x, y: y });
  coinInner.addEffect('zoomIn', 0.3, delay + 0.2);
  scene.addChild(coinInner);
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createRetroGamingVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 23: "Retro Gaming UI"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~45 seconds'));
  console.log(colors.yellow('🎨 Theme: Nostalgia - 8-bit Life Hack\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-23-retro-gaming.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: TITLE SCREEN - Game Start (9s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.gameBlack);
  scene1.setDuration(9);

  // Pixel grid background
  for (let row = 0; row < 24; row++) {
    for (let col = 0; col < 13; col++) {
      if ((row + col) % 2 === 0) {
        const gridPixel = new FFRect({ 
          color: 'rgba(255, 255, 255, 0.02)', 
          width: 80, 
          height: 80, 
          x: 50 + (col * 80), 
          y: 50 + (row * 80) 
        });
        gridPixel.addEffect('fadeIn', 0.2, 0.5 + (row * 0.02));
        scene1.addChild(gridPixel);
      }
    }
  }

  // Title box
  const titleBox = new FFRect({ color: COLORS.arcadeBlue, width: 900, height: 300, x: width/2, y: 500 });
  titleBox.addEffect('zoomIn', 0.6, 1);
  scene1.addChild(titleBox);

  addPixelBorder(scene1, width/2, 500, 900, 300, COLORS.arcadeCyan, 1.5);

  // Title text
  const title1 = new FFText({ text: 'LIFE HACK', x: width/2, y: 450, fontSize: 90 });
  title1.setColor(COLORS.textYellow);
  title1.alignCenter();
  title1.addEffect('bounceIn', 0.6, 2);
  scene1.addChild(title1);

  const title2 = new FFText({ text: 'QUEST', x: width/2, y: 560, fontSize: 80 });
  title2.setColor(COLORS.textWhite);
  title2.alignCenter();
  title2.addEffect('fadeIn', 0.5, 2.5);
  scene1.addChild(title2);

  // Level indicator
  const levelBox = new FFRect({ color: COLORS.arcadeRed, width: 400, height: 100, x: width/2, y: 750 });
  levelBox.addEffect('zoomIn', 0.4, 3);
  scene1.addChild(levelBox);

  const levelText = new FFText({ text: 'LEVEL 1', x: width/2, y: 750, fontSize: 60 });
  levelText.setColor(COLORS.textWhite);
  levelText.alignCenter();
  levelText.addEffect('bounceIn', 0.4, 3.3);
  scene1.addChild(levelText);

  // Subtitle
  const subtitle = new FFText({ text: 'THE MORNING ROUTINE HACK', x: width/2, y: 900, fontSize: 36 });
  subtitle.setColor(COLORS.textCyan);
  subtitle.alignCenter();
  subtitle.addEffect('fadeInUp', 0.5, 4);
  scene1.addChild(subtitle);

  // Player sprite
  addPixelSprite(scene1, width/2, 1150, 200, COLORS.arcadeGreen, 4.5);

  // Start prompt
  const startPrompt = new FFText({ text: 'PRESS START', x: width/2, y: 1400, fontSize: 48 });
  startPrompt.setColor(COLORS.textYellow);
  startPrompt.alignCenter();
  startPrompt.addEffect('fadeIn', 0.3, 5.5);
  startPrompt.addEffect('fadeOut', 0.3, 6);
  startPrompt.addEffect('fadeIn', 0.3, 6.5);
  scene1.addChild(startPrompt);

  // Coins
  addCoinSprite(scene1, 200, 1600, 6);
  addCoinSprite(scene1, width/2, 1650, 6.2);
  addCoinSprite(scene1, 880, 1600, 6.4);

  scene1.setTransition('zoomIn', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Title Screen - Game Start (9s)'));

  // ============================================
  // SCENE 2: STEP 1 - Prepare Night Before (9s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.gameDark);
  scene2.setDuration(9);

  // UI Elements
  addHealthBar(scene2, 25, 100, 0.5);
  addScoreCounter(scene2, 100, 0.7);

  // Level indicator
  const level1 = new FFText({ text: 'LVL 1', x: 900, y: 250, fontSize: 40 });
  level1.setColor(COLORS.textCyan);
  level1.setAnchor(0, 0.5);
  level1.addEffect('fadeIn', 0.3, 0.9);
  scene2.addChild(level1);

  // Step title
  const stepBox1 = new FFRect({ color: COLORS.arcadePurple, width: 850, height: 120, x: width/2, y: 400 });
  stepBox1.addEffect('zoomIn', 0.5, 1.2);
  scene2.addChild(stepBox1);

  const stepTitle1 = new FFText({ text: 'STEP 1: PREPARE', x: width/2, y: 400, fontSize: 60 });
  stepTitle1.setColor(COLORS.textWhite);
  stepTitle1.alignCenter();
  stepTitle1.addEffect('bounceIn', 0.5, 1.5);
  scene2.addChild(stepTitle1);

  // Instruction box
  const instructBox = new FFRect({ color: COLORS.pixelBlack, width: 900, height: 600, x: width/2, y: 900 });
  instructBox.addEffect('fadeIn', 0.4, 2);
  scene2.addChild(instructBox);

  addPixelBorder(scene2, width/2, 900, 900, 600, COLORS.arcadeGreen, 2.3);

  // Instructions
  const instructions = [
    { text: '▶ Lay out clothes', y: 700, icon: '👕' },
    { text: '▶ Pack your bag', y: 800, icon: '🎒' },
    { text: '▶ Prep breakfast', y: 900, icon: '🍳' },
    { text: '▶ Set alarm', y: 1000, icon: '⏰' }
  ];

  instructions.forEach((inst, i) => {
    const icon = new FFText({ text: inst.icon, x: 250, y: inst.y, fontSize: 50 });
    icon.setAnchor(0, 0.5);
    icon.addEffect('bounceIn', 0.3, 3 + (i * 0.3));
    scene2.addChild(icon);

    const text = new FFText({ text: inst.text, x: 350, y: inst.y, fontSize: 42 });
    text.setColor(COLORS.textWhite);
    text.setAnchor(0, 0.5);
    text.addEffect('fadeInLeft', 0.3, 3.2 + (i * 0.3));
    scene2.addChild(text);
  });

  // Reward message
  const rewardBox = new FFRect({ color: COLORS.arcadeGreen, width: 600, height: 100, x: width/2, y: 1300 });
  rewardBox.addEffect('zoomIn', 0.4, 5);
  scene2.addChild(rewardBox);

  const rewardText = new FFText({ text: '+25 PRODUCTIVITY', x: width/2, y: 1300, fontSize: 40 });
  rewardText.setColor(COLORS.pixelBlack);
  rewardText.alignCenter();
  rewardText.addEffect('bounceIn', 0.4, 5.3);
  scene2.addChild(rewardText);

  // Coins earned
  for (let i = 0; i < 3; i++) {
    addCoinSprite(scene2, 300 + (i * 240), 1500, 6 + (i * 0.2));
  }

  scene2.setTransition('directionalwarp', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Step 1 - Prepare Night Before (9s)'));

  // ============================================
  // SCENE 3: STEP 2 - Morning Routine (9s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.gameDark);
  scene3.setDuration(9);

  // UI Elements - health increased
  addHealthBar(scene3, 50, 100, 0.5);
  addScoreCounter(scene3, 350, 0.7);

  const level2 = new FFText({ text: 'LVL 1', x: 900, y: 250, fontSize: 40 });
  level2.setColor(COLORS.textCyan);
  level2.setAnchor(0, 0.5);
  level2.addEffect('fadeIn', 0.3, 0.9);
  scene3.addChild(level2);

  // Step title
  const stepBox2 = new FFRect({ color: COLORS.arcadeBlue, width: 850, height: 120, x: width/2, y: 400 });
  stepBox2.addEffect('zoomIn', 0.5, 1.2);
  scene3.addChild(stepBox2);

  const stepTitle2 = new FFText({ text: 'STEP 2: EXECUTE', x: width/2, y: 400, fontSize: 60 });
  stepTitle2.setColor(COLORS.textWhite);
  stepTitle2.alignCenter();
  stepTitle2.addEffect('bounceIn', 0.5, 1.5);
  scene3.addChild(stepTitle2);

  // Instruction box
  const instructBox2 = new FFRect({ color: COLORS.pixelBlack, width: 900, height: 600, x: width/2, y: 900 });
  instructBox2.addEffect('fadeIn', 0.4, 2);
  scene3.addChild(instructBox2);

  addPixelBorder(scene3, width/2, 900, 900, 600, COLORS.arcadeYellow, 2.3);

  // Morning steps
  const morningSteps = [
    { text: '▶ Wake up instantly', y: 700, icon: '☀️' },
    { text: '▶ Quick shower', y: 800, icon: '🚿' },
    { text: '▶ Grab pre-made items', y: 900, icon: '✅' },
    { text: '▶ Out the door!', y: 1000, icon: '🚪' }
  ];

  morningSteps.forEach((step, i) => {
    const icon = new FFText({ text: step.icon, x: 250, y: step.y, fontSize: 50 });
    icon.setAnchor(0, 0.5);
    icon.addEffect('bounceIn', 0.3, 3 + (i * 0.3));
    scene3.addChild(icon);

    const text = new FFText({ text: step.text, x: 350, y: step.y, fontSize: 42 });
    text.setColor(COLORS.textWhite);
    text.setAnchor(0, 0.5);
    text.addEffect('fadeInLeft', 0.3, 3.2 + (i * 0.3));
    scene3.addChild(text);
  });

  // Time saved
  const timeBox = new FFRect({ color: COLORS.arcadeOrange, width: 700, height: 100, x: width/2, y: 1300 });
  timeBox.addEffect('zoomIn', 0.4, 5);
  scene3.addChild(timeBox);

  const timeText = new FFText({ text: 'TIME SAVED: 30 MIN', x: width/2, y: 1300, fontSize: 40 });
  timeText.setColor(COLORS.pixelBlack);
  timeText.alignCenter();
  timeText.addEffect('bounceIn', 0.4, 5.3);
  scene3.addChild(timeText);

  // More coins
  for (let i = 0; i < 5; i++) {
    addCoinSprite(scene3, 200 + (i * 170), 1500, 6 + (i * 0.15));
  }

  scene3.setTransition('crosswarp', 0.5);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Step 2 - Morning Routine (9s)'));

  // ============================================
  // SCENE 4: BONUS ROUND - Extra Tips (9s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.gameBlue);
  scene4.setDuration(9);

  // UI Elements - health increased more
  addHealthBar(scene4, 75, 100, 0.5);
  addScoreCounter(scene4, 750, 0.7);

  const level3 = new FFText({ text: 'LVL 1', x: 900, y: 250, fontSize: 40 });
  level3.setColor(COLORS.textCyan);
  level3.setAnchor(0, 0.5);
  level3.addEffect('fadeIn', 0.3, 0.9);
  scene4.addChild(level3);

  // Bonus title
  const bonusBox = new FFRect({ color: COLORS.arcadeYellow, width: 850, height: 150, x: width/2, y: 400 });
  bonusBox.addEffect('zoomIn', 0.6, 1);
  scene4.addChild(bonusBox);

  const bonusTitle = new FFText({ text: '★ BONUS ROUND ★', x: width/2, y: 400, fontSize: 65 });
  bonusTitle.setColor(COLORS.pixelBlack);
  bonusTitle.alignCenter();
  bonusTitle.addEffect('bounceIn', 0.6, 1.3);
  scene4.addChild(bonusTitle);

  // Bonus tips box
  const bonusTipsBox = new FFRect({ color: COLORS.pixelBlack, width: 900, height: 700, x: width/2, y: 950 });
  bonusTipsBox.addEffect('fadeIn', 0.4, 2);
  scene4.addChild(bonusTipsBox);

  addPixelBorder(scene4, width/2, 950, 900, 700, COLORS.arcadePurple, 2.3);

  // Bonus tips
  const bonusTips = [
    { text: 'PRO TIP #1', desc: 'Use a sunrise alarm', y: 700 },
    { text: 'PRO TIP #2', desc: 'Keep water by bed', y: 850 },
    { text: 'PRO TIP #3', desc: 'No phone for 30 min', y: 1000 },
    { text: 'PRO TIP #4', desc: 'Stretch while brewing', y: 1150 }
  ];

  bonusTips.forEach((tip, i) => {
    const tipTitle = new FFText({ text: tip.text, x: width/2, y: tip.y, fontSize: 38 });
    tipTitle.setColor(COLORS.arcadeYellow);
    tipTitle.alignCenter();
    tipTitle.addEffect('fadeIn', 0.3, 3 + (i * 0.4));
    scene4.addChild(tipTitle);

    const tipDesc = new FFText({ text: tip.desc, x: width/2, y: tip.y + 45, fontSize: 32 });
    tipDesc.setColor(COLORS.textWhite);
    tipDesc.alignCenter();
    tipDesc.addEffect('fadeIn', 0.3, 3.2 + (i * 0.4));
    scene4.addChild(tipDesc);
  });

  // Bonus reward
  const bonusReward = new FFRect({ color: COLORS.arcadeGreen, width: 700, height: 100, x: width/2, y: 1450 });
  bonusReward.addEffect('zoomIn', 0.5, 5.5);
  scene4.addChild(bonusReward);

  const bonusRewardText = new FFText({ text: 'BONUS: +250 POINTS!', x: width/2, y: 1450, fontSize: 45 });
  bonusRewardText.setColor(COLORS.pixelBlack);
  bonusRewardText.alignCenter();
  bonusRewardText.addEffect('bounceIn', 0.4, 5.8);
  scene4.addChild(bonusRewardText);

  // Star sprites
  for (let i = 0; i < 7; i++) {
    const star = new FFText({ text: '⭐', x: 150 + (i * 130), y: 1650, fontSize: 60 });
    star.addEffect('bounceIn', 0.3, 6.5 + (i * 0.1));
    scene4.addChild(star);
  }

  scene4.setTransition('slice', 0.5);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Bonus Round - Extra Tips (9s)'));

  // ============================================
  // SCENE 5: VICTORY - Level Complete (9s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.gameBlack);
  scene5.setDuration(9);

  // UI Elements - full health!
  addHealthBar(scene5, 100, 100, 0.5);
  addScoreCounter(scene5, 1000, 0.7);

  const level4 = new FFText({ text: 'LVL 1', x: 900, y: 250, fontSize: 40 });
  level4.setColor(COLORS.textCyan);
  level4.setAnchor(0, 0.5);
  level4.addEffect('fadeIn', 0.3, 0.9);
  scene5.addChild(level4);

  // Victory banner
  const victoryBanner = new FFRect({ color: COLORS.arcadeGreen, width: 950, height: 250, x: width/2, y: 500 });
  victoryBanner.addEffect('zoomIn', 0.7, 1);
  scene5.addChild(victoryBanner);

  addPixelBorder(scene5, width/2, 500, 950, 250, COLORS.arcadeYellow, 1.5);

  const victoryText1 = new FFText({ text: 'LEVEL', x: width/2, y: 440, fontSize: 70 });
  victoryText1.setColor(COLORS.pixelBlack);
  victoryText1.alignCenter();
  victoryText1.addEffect('backInDown', 0.6, 2);
  scene5.addChild(victoryText1);

  const victoryText2 = new FFText({ text: 'COMPLETE!', x: width/2, y: 540, fontSize: 80 });
  victoryText2.setColor(COLORS.textYellow);
  victoryText2.alignCenter();
  victoryText2.addEffect('bounceIn', 0.6, 2.5);
  scene5.addChild(victoryText2);

  // Trophy
  const trophy = new FFText({ text: '🏆', x: width/2, y: 750, fontSize: 150 });
  trophy.alignCenter();
  trophy.addEffect('bounceIn', 0.7, 3);
  scene5.addChild(trophy);

  // Stats box
  const statsBox = new FFRect({ color: COLORS.arcadeBlue, width: 800, height: 350, x: width/2, y: 1050 });
  statsBox.addEffect('zoomIn', 0.5, 3.5);
  scene5.addChild(statsBox);

  const stats = [
    { label: 'TIME SAVED:', value: '30 MINUTES', y: 950 },
    { label: 'STRESS LEVEL:', value: 'MINIMAL', y: 1030 },
    { label: 'PRODUCTIVITY:', value: 'MAXIMUM', y: 1110 },
    { label: 'FINAL SCORE:', value: '1000 PTS', y: 1190 }
  ];

  stats.forEach((stat, i) => {
    const label = new FFText({ text: stat.label, x: 300, y: stat.y, fontSize: 32 });
    label.setColor(COLORS.textWhite);
    label.setAnchor(0, 0.5);
    label.addEffect('fadeIn', 0.3, 4 + (i * 0.2));
    scene5.addChild(label);

    const value = new FFText({ text: stat.value, x: 780, y: stat.y, fontSize: 34 });
    value.setColor(COLORS.arcadeYellow);
    value.setAnchor(1, 0.5);
    value.addEffect('fadeIn', 0.3, 4.2 + (i * 0.2));
    scene5.addChild(value);
  });

  // CTA
  const ctaBox = new FFRect({ color: COLORS.arcadeRed, width: 750, height: 120, x: width/2, y: 1400 });
  ctaBox.addEffect('zoomIn', 0.5, 5.5);
  scene5.addChild(ctaBox);

  const ctaText = new FFText({ text: '👆 FOLLOW FOR LVL 2', x: width/2, y: 1400, fontSize: 48 });
  ctaText.setColor(COLORS.textWhite);
  ctaText.alignCenter();
  ctaText.addEffect('bounceIn', 0.4, 6);
  scene5.addChild(ctaText);

  // Continue prompt
  const continuePrompt = new FFText({ text: 'PRESS START TO CONTINUE', x: width/2, y: 1600, fontSize: 32 });
  continuePrompt.setColor(COLORS.textCyan);
  continuePrompt.alignCenter();
  continuePrompt.addEffect('fadeIn', 0.3, 6.5);
  continuePrompt.addEffect('fadeOut', 0.3, 7);
  continuePrompt.addEffect('fadeIn', 0.3, 7.5);
  scene5.addChild(continuePrompt);

  // Hashtags
  const hashtags = new FFText({ text: '#LifeHacks #Productivity #RetroGaming', x: width/2, y: 1750, fontSize: 28 });
  hashtags.setColor(COLORS.textWhite);
  hashtags.alignCenter();
  hashtags.addEffect('fadeIn', 0.4, 7);
  scene5.addChild(hashtags);

  // Coin rain
  for (let i = 0; i < 12; i++) {
    addCoinSprite(scene5, 150 + (i * 80), 300 + (i % 3) * 100, 2 + (i * 0.1));
  }

  // Player victory sprite
  addPixelSprite(scene5, width/2, 1850, 150, COLORS.arcadeGreen, 3);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Victory - Level Complete (9s)'));

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
    console.log(colors.magenta('\n🎬 Story 23: "Retro Gaming UI" complete!\n'));
  });

  creator.start();
}

createRetroGamingVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

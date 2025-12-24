/**
 * 🎬 STORY 12: "Speed-Ramp Cook" - Action/Food
 * 
 * The Story: Making a complex ramen bowl in 60 seconds.
 * 
 * Visual Style:
 * - Vibrant, sharp, high-energy
 * - Time remapping feel with speed indicators
 * - Directional blur simulation
 * - Impact shakes on every action
 * - Step counter (1/10, 2/10) at bottom
 * - Circular progress bar around ingredients
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~45 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-12-speedramp-cook.js
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
// COLOR PALETTE - Vibrant Food/Action Theme
// ============================================
const COLORS = {
  // Base colors
  darkBg: '#1a0a0a',
  warmBlack: '#0f0805',
  kitchenDark: '#1a1210',
  
  // Vibrant food colors
  ramenOrange: '#ff6b35',
  eggYellow: '#ffd93d',
  noriGreen: '#2d5a27',
  chashuPink: '#e8a0a0',
  brothGold: '#c9a227',
  scallionGreen: '#7cb342',
  
  // Action/Energy colors
  speedRed: '#ff1744',
  impactWhite: '#ffffff',
  motionBlue: '#00b0ff',
  energyYellow: '#ffea00',
  
  // UI colors
  timerRed: '#ff3d00',
  progressGreen: '#00e676',
  stepWhite: '#ffffff',
  
  // Text
  white: '#ffffff',
  cream: '#fff8e1',
  dimWhite: '#b0b0b0'
};

// ============================================
// HELPER: Add step counter
// ============================================
function addStepCounter(scene, currentStep, totalSteps, delay = 0) {
  // Step counter background
  const stepBg = new FFRect({ color: 'rgba(0,0,0,0.8)', width: 200, height: 70, x: width/2, y: height - 150 });
  stepBg.addEffect('fadeIn', 0.2, delay);
  scene.addChild(stepBg);
  
  // Step text
  const stepText = new FFText({ text: `${currentStep}/${totalSteps}`, x: width/2, y: height - 150, fontSize: 40 });
  stepText.setColor(COLORS.stepWhite);
  stepText.alignCenter();
  stepText.addEffect('bounceIn', 0.3, delay + 0.1);
  scene.addChild(stepText);
  
  // Progress dots
  for (let i = 1; i <= totalSteps; i++) {
    const dotColor = i <= currentStep ? COLORS.progressGreen : COLORS.dimWhite;
    const dotSize = i === currentStep ? 16 : 10;
    const dot = new FFRect({ 
      color: dotColor, 
      width: dotSize, 
      height: dotSize, 
      x: 240 + (i * 60), 
      y: height - 80 
    });
    dot.addEffect('fadeIn', 0.1, delay + (i * 0.05));
    scene.addChild(dot);
  }
}

// ============================================
// HELPER: Add impact shake effect
// ============================================
function addImpactEffect(scene, x, y, delay = 0) {
  // Impact flash
  const flash = new FFRect({ color: COLORS.impactWhite, width: 200, height: 200, x: x, y: y });
  flash.addEffect('zoomIn', 0.1, delay);
  flash.addEffect('fadeOut', 0.15, delay + 0.1);
  scene.addChild(flash);
  
  // Impact lines
  for (let i = 0; i < 6; i++) {
    const angle = i * 60;
    const lineX = x + Math.cos(angle * Math.PI / 180) * 80;
    const lineY = y + Math.sin(angle * Math.PI / 180) * 80;
    const line = new FFRect({ color: COLORS.energyYellow, width: 40, height: 6, x: lineX, y: lineY });
    line.addEffect('fadeIn', 0.05, delay);
    line.addEffect('fadeOut', 0.1, delay + 0.15);
    scene.addChild(line);
  }
}

// ============================================
// HELPER: Add speed lines
// ============================================
function addSpeedLines(scene, direction = 'down', delay = 0) {
  const lineCount = 15;
  for (let i = 0; i < lineCount; i++) {
    const lineX = 100 + Math.random() * (width - 200);
    const lineY = direction === 'down' ? 200 + (i * 100) : height - 200 - (i * 100);
    const lineH = 50 + Math.random() * 150;
    
    const speedLine = new FFRect({ 
      color: 'rgba(255, 255, 255, 0.3)', 
      width: 3, 
      height: lineH, 
      x: lineX, 
      y: lineY 
    });
    speedLine.addEffect('fadeIn', 0.05, delay + (i * 0.02));
    speedLine.addEffect('fadeOut', 0.1, delay + 0.2 + (i * 0.02));
    scene.addChild(speedLine);
  }
}

// ============================================
// HELPER: Add timer display
// ============================================
function addTimer(scene, seconds, delay = 0) {
  const timerBg = new FFRect({ color: 'rgba(255, 23, 68, 0.9)', width: 150, height: 60, x: width - 100, y: 150 });
  timerBg.addEffect('fadeIn', 0.2, delay);
  scene.addChild(timerBg);
  
  const timerText = new FFText({ text: `${seconds}s`, x: width - 100, y: 150, fontSize: 36 });
  timerText.setColor(COLORS.white);
  timerText.alignCenter();
  timerText.addEffect('fadeIn', 0.2, delay + 0.1);
  scene.addChild(timerText);
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createSpeedRampCookVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 12: "Speed-Ramp Cook"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~45 seconds'));
  console.log(colors.yellow('🎨 Theme: Action/Food - High-Energy Cooking\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-12-speedramp-cook.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: INTRO - Challenge Start (8s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.darkBg);
  scene1.setDuration(8);

  // Dark kitchen background
  const introBg = new FFRect({ color: COLORS.kitchenDark, width: 1100, height: 2000, x: width/2, y: height/2 });
  introBg.addEffect('fadeIn', 0.3, 0);
  scene1.addChild(introBg);

  // Title burst
  const titleBurst = new FFRect({ color: COLORS.speedRed, width: 1100, height: 300, x: width/2, y: 400 });
  titleBurst.addEffect('zoomIn', 0.4, 0.3);
  scene1.addChild(titleBurst);

  const titleText1 = new FFText({ text: '🍜 RAMEN', x: width/2, y: 350, fontSize: 100 });
  titleText1.setColor(COLORS.white);
  titleText1.alignCenter();
  titleText1.addEffect('bounceIn', 0.5, 0.5);
  scene1.addChild(titleText1);

  const titleText2 = new FFText({ text: 'IN 60 SECONDS', x: width/2, y: 460, fontSize: 50 });
  titleText2.setColor(COLORS.eggYellow);
  titleText2.alignCenter();
  titleText2.addEffect('fadeIn', 0.4, 0.8);
  scene1.addChild(titleText2);

  // Challenge badge
  const challengeBadge = new FFRect({ color: COLORS.ramenOrange, width: 350, height: 80, x: width/2, y: 600 });
  challengeBadge.addEffect('bounceIn', 0.4, 1.2);
  scene1.addChild(challengeBadge);

  const challengeText = new FFText({ text: '⚡ SPEED CHALLENGE', x: width/2, y: 600, fontSize: 32 });
  challengeText.setColor(COLORS.white);
  challengeText.alignCenter();
  challengeText.addEffect('fadeIn', 0.3, 1.4);
  scene1.addChild(challengeText);

  // Ingredients preview
  const ingredients = [
    { emoji: '🍜', name: 'NOODLES', x: 200, y: 850 },
    { emoji: '🥚', name: 'EGG', x: 400, y: 850 },
    { emoji: '🥩', name: 'CHASHU', x: 600, y: 850 },
    { emoji: '🧅', name: 'SCALLION', x: 800, y: 850 }
  ];

  ingredients.forEach((ing, i) => {
    // Ingredient circle
    const circle = new FFRect({ color: 'rgba(255,255,255,0.1)', width: 120, height: 120, x: ing.x, y: ing.y });
    circle.addEffect('zoomIn', 0.3, 2 + (i * 0.2));
    scene1.addChild(circle);

    const emoji = new FFText({ text: ing.emoji, x: ing.x, y: ing.y - 10, fontSize: 50 });
    emoji.alignCenter();
    emoji.addEffect('bounceIn', 0.3, 2.1 + (i * 0.2));
    scene1.addChild(emoji);

    const name = new FFText({ text: ing.name, x: ing.x, y: ing.y + 50, fontSize: 18 });
    name.setColor(COLORS.cream);
    name.alignCenter();
    name.addEffect('fadeIn', 0.2, 2.3 + (i * 0.2));
    scene1.addChild(name);
  });

  // Countdown
  const countNums = ['3', '2', '1', 'GO!'];
  countNums.forEach((num, i) => {
    const countText = new FFText({ text: num, x: width/2, y: 1150, fontSize: num === 'GO!' ? 100 : 150 });
    countText.setColor(num === 'GO!' ? COLORS.progressGreen : COLORS.speedRed);
    countText.alignCenter();
    countText.addEffect('zoomIn', 0.2, 4 + (i * 0.8));
    countText.addEffect('fadeOut', 0.2, 4.6 + (i * 0.8));
    scene1.addChild(countText);
  });

  // Speed lines
  addSpeedLines(scene1, 'down', 6.5);

  scene1.setTransition('fastswitch', 0.3);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Intro - Challenge Start (8s)'));

  // ============================================
  // SCENE 2: PREP - Chopping & Slicing (9s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.warmBlack);
  scene2.setDuration(9);

  // Kitchen background
  const prepBg = new FFRect({ color: COLORS.kitchenDark, width: 1100, height: 2000, x: width/2, y: height/2 });
  prepBg.addEffect('fadeIn', 0.2, 0);
  scene2.addChild(prepBg);

  // Cutting board
  const cuttingBoard = new FFRect({ color: '#8b7355', width: 700, height: 400, x: width/2, y: height/2 });
  cuttingBoard.addEffect('fadeIn', 0.3, 0.2);
  scene2.addChild(cuttingBoard);

  // Step label
  const stepLabel = new FFRect({ color: COLORS.ramenOrange, width: 300, height: 70, x: width/2, y: 250 });
  stepLabel.addEffect('bounceIn', 0.3, 0.3);
  scene2.addChild(stepLabel);

  const stepLabelText = new FFText({ text: 'STEP 1-3: PREP', x: width/2, y: 250, fontSize: 32 });
  stepLabelText.setColor(COLORS.white);
  stepLabelText.alignCenter();
  stepLabelText.addEffect('fadeIn', 0.2, 0.4);
  scene2.addChild(stepLabelText);

  // Chopping actions
  const chopActions = [
    { item: '🧅 SCALLIONS', action: 'CHOP!', y: 500, delay: 1 },
    { item: '🧄 GARLIC', action: 'MINCE!', y: 700, delay: 2.5 },
    { item: '🥩 CHASHU', action: 'SLICE!', y: 900, delay: 4 }
  ];

  chopActions.forEach((chop, i) => {
    // Item label
    const itemText = new FFText({ text: chop.item, x: 300, y: chop.y, fontSize: 36 });
    itemText.setColor(COLORS.cream);
    itemText.addEffect('fadeInLeft', 0.3, chop.delay);
    scene2.addChild(itemText);

    // Action burst
    const actionBurst = new FFRect({ color: COLORS.speedRed, width: 250, height: 70, x: 750, y: chop.y });
    actionBurst.addEffect('zoomIn', 0.15, chop.delay + 0.5);
    scene2.addChild(actionBurst);

    const actionText = new FFText({ text: chop.action, x: 750, y: chop.y, fontSize: 36 });
    actionText.setColor(COLORS.white);
    actionText.alignCenter();
    actionText.addEffect('bounceIn', 0.2, chop.delay + 0.6);
    scene2.addChild(actionText);

    // Impact effect
    addImpactEffect(scene2, 750, chop.y, chop.delay + 0.5);
  });

  // Knife icon
  const knifeIcon = new FFText({ text: '🔪', x: width/2, y: 1150, fontSize: 80 });
  knifeIcon.alignCenter();
  knifeIcon.addEffect('bounceIn', 0.3, 0.5);
  scene2.addChild(knifeIcon);

  // Speed indicator
  const speedBox = new FFRect({ color: 'rgba(0, 176, 255, 0.8)', width: 200, height: 50, x: 150, y: 150 });
  speedBox.addEffect('fadeIn', 0.2, 0.3);
  scene2.addChild(speedBox);

  const speedText = new FFText({ text: '2X SPEED', x: 150, y: 150, fontSize: 26 });
  speedText.setColor(COLORS.white);
  speedText.alignCenter();
  speedText.addEffect('fadeIn', 0.2, 0.4);
  scene2.addChild(speedText);

  // Timer
  addTimer(scene2, '45', 0.2);

  // Step counter
  addStepCounter(scene2, 3, 10, 0.5);

  // Speed lines
  addSpeedLines(scene2, 'down', 1.5);
  addSpeedLines(scene2, 'down', 3);
  addSpeedLines(scene2, 'down', 4.5);

  scene2.setTransition('shake', 0.3);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Prep - Chopping & Slicing (9s)'));

  // ============================================
  // SCENE 3: COOKING - Broth & Noodles (10s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.warmBlack);
  scene3.setDuration(10);

  // Kitchen background with warm glow
  const cookBg = new FFRect({ color: '#1a1008', width: 1100, height: 2000, x: width/2, y: height/2 });
  cookBg.addEffect('fadeIn', 0.2, 0);
  scene3.addChild(cookBg);

  // Pot/Wok representation
  const pot = new FFRect({ color: '#2a2a2a', width: 500, height: 300, x: width/2, y: height/2 });
  pot.addEffect('fadeIn', 0.3, 0.2);
  scene3.addChild(pot);

  // Broth (golden liquid)
  const broth = new FFRect({ color: COLORS.brothGold, width: 450, height: 200, x: width/2, y: height/2 + 30 });
  broth.addEffect('fadeIn', 0.5, 0.5);
  scene3.addChild(broth);

  // Steam effect
  for (let i = 0; i < 5; i++) {
    const steam = new FFRect({ 
      color: 'rgba(255, 255, 255, 0.2)', 
      width: 30 + Math.random() * 40, 
      height: 80, 
      x: width/2 - 150 + (i * 80), 
      y: height/2 - 200 
    });
    steam.addEffect('fadeIn', 0.3, 0.8 + (i * 0.1));
    steam.addEffect('fadeOut', 0.5, 2 + (i * 0.1));
    scene3.addChild(steam);
  }

  // Step label
  const cookLabel = new FFRect({ color: COLORS.brothGold, width: 350, height: 70, x: width/2, y: 250 });
  cookLabel.addEffect('bounceIn', 0.3, 0.3);
  scene3.addChild(cookLabel);

  const cookLabelText = new FFText({ text: 'STEP 4-6: COOK', x: width/2, y: 250, fontSize: 32 });
  cookLabelText.setColor(COLORS.darkBg);
  cookLabelText.alignCenter();
  cookLabelText.addEffect('fadeIn', 0.2, 0.4);
  scene3.addChild(cookLabelText);

  // Cooking actions
  const cookActions = [
    { text: '🔥 HEAT BROTH', time: '15s', delay: 1 },
    { text: '🍜 BOIL NOODLES', time: '3min', delay: 3 },
    { text: '🥚 SOFT BOIL EGG', time: '6min', delay: 5 }
  ];

  cookActions.forEach((action, i) => {
    const actionBox = new FFRect({ color: 'rgba(255,255,255,0.1)', width: 800, height: 100, x: width/2, y: 500 + (i * 150) });
    actionBox.addEffect('fadeInLeft', 0.3, action.delay);
    scene3.addChild(actionBox);

    const actionText = new FFText({ text: action.text, x: 350, y: 500 + (i * 150), fontSize: 34 });
    actionText.setColor(COLORS.cream);
    actionText.addEffect('fadeIn', 0.2, action.delay + 0.1);
    scene3.addChild(actionText);

    // Time badge
    const timeBadge = new FFRect({ color: COLORS.speedRed, width: 120, height: 50, x: 850, y: 500 + (i * 150) });
    timeBadge.addEffect('bounceIn', 0.2, action.delay + 0.3);
    scene3.addChild(timeBadge);

    const timeText = new FFText({ text: action.time, x: 850, y: 500 + (i * 150), fontSize: 24 });
    timeText.setColor(COLORS.white);
    timeText.alignCenter();
    timeText.addEffect('fadeIn', 0.2, action.delay + 0.4);
    scene3.addChild(timeText);

    // Check mark appearing
    const check = new FFText({ text: '✓', x: 150, y: 500 + (i * 150), fontSize: 50 });
    check.setColor(COLORS.progressGreen);
    check.addEffect('bounceIn', 0.3, action.delay + 1.5);
    scene3.addChild(check);
  });

  // Fire emoji
  const fireIcon = new FFText({ text: '🔥', x: width/2, y: 1150, fontSize: 80 });
  fireIcon.alignCenter();
  fireIcon.addEffect('bounceIn', 0.3, 0.5);
  scene3.addChild(fireIcon);

  // Speed indicator
  const speedBox3 = new FFRect({ color: 'rgba(255, 23, 68, 0.8)', width: 200, height: 50, x: 150, y: 150 });
  speedBox3.addEffect('fadeIn', 0.2, 0.3);
  scene3.addChild(speedBox3);

  const speedText3 = new FFText({ text: '4X SPEED', x: 150, y: 150, fontSize: 26 });
  speedText3.setColor(COLORS.white);
  speedText3.alignCenter();
  speedText3.addEffect('fadeIn', 0.2, 0.4);
  scene3.addChild(speedText3);

  // Timer
  addTimer(scene3, '30', 0.2);

  // Step counter
  addStepCounter(scene3, 6, 10, 0.5);

  scene3.setTransition('directionalwarp', 0.4);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Cooking - Broth & Noodles (10s)'));

  // ============================================
  // SCENE 4: ASSEMBLY - Building the Bowl (10s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.warmBlack);
  scene4.setDuration(10);

  // Background
  const assemblyBg = new FFRect({ color: COLORS.kitchenDark, width: 1100, height: 2000, x: width/2, y: height/2 });
  assemblyBg.addEffect('fadeIn', 0.2, 0);
  scene4.addChild(assemblyBg);

  // Ramen bowl
  const bowl = new FFRect({ color: '#1a1a1a', width: 600, height: 350, x: width/2, y: height/2 + 100 });
  bowl.addEffect('zoomIn', 0.4, 0.2);
  scene4.addChild(bowl);

  // Bowl inner (broth)
  const bowlInner = new FFRect({ color: COLORS.brothGold, width: 550, height: 280, x: width/2, y: height/2 + 100 });
  bowlInner.addEffect('fadeIn', 0.3, 0.4);
  scene4.addChild(bowlInner);

  // Step label
  const assemblyLabel = new FFRect({ color: COLORS.scallionGreen, width: 400, height: 70, x: width/2, y: 250 });
  assemblyLabel.addEffect('bounceIn', 0.3, 0.3);
  scene4.addChild(assemblyLabel);

  const assemblyLabelText = new FFText({ text: 'STEP 7-10: ASSEMBLE', x: width/2, y: 250, fontSize: 32 });
  assemblyLabelText.setColor(COLORS.white);
  assemblyLabelText.alignCenter();
  assemblyLabelText.addEffect('fadeIn', 0.2, 0.4);
  scene4.addChild(assemblyLabelText);

  // Assembly steps with ingredients dropping in
  const assemblySteps = [
    { emoji: '🍜', name: 'NOODLES', delay: 1 },
    { emoji: '🥩', name: 'CHASHU', delay: 2.5 },
    { emoji: '🥚', name: 'EGG', delay: 4 },
    { emoji: '🧅', name: 'TOPPINGS', delay: 5.5 }
  ];

  assemblySteps.forEach((step, i) => {
    // Ingredient dropping animation
    const ingredient = new FFText({ text: step.emoji, x: width/2, y: 400, fontSize: 70 });
    ingredient.alignCenter();
    ingredient.addEffect('fadeInDown', 0.3, step.delay);
    scene4.addChild(ingredient);

    // Name label
    const nameLabel = new FFText({ text: step.name, x: width/2, y: 500, fontSize: 32 });
    nameLabel.setColor(COLORS.eggYellow);
    nameLabel.alignCenter();
    nameLabel.addEffect('fadeIn', 0.2, step.delay + 0.2);
    nameLabel.addEffect('fadeOut', 0.2, step.delay + 1);
    scene4.addChild(nameLabel);

    // Impact on bowl
    addImpactEffect(scene4, width/2, height/2 + 100, step.delay + 0.3);
  });

  // Final bowl representation
  const finalNoodles = new FFRect({ color: '#e8d5a0', width: 400, height: 100, x: width/2, y: height/2 + 80 });
  finalNoodles.addEffect('fadeIn', 0.3, 6);
  scene4.addChild(finalNoodles);

  // Toppings on bowl
  const toppingEmojis = ['🥚', '🥩', '🧅'];
  toppingEmojis.forEach((top, i) => {
    const topping = new FFText({ text: top, x: 350 + (i * 180), y: height/2 + 50, fontSize: 45 });
    topping.addEffect('bounceIn', 0.3, 6.5 + (i * 0.2));
    scene4.addChild(topping);
  });

  // Speed indicator
  const speedBox4 = new FFRect({ color: 'rgba(0, 230, 118, 0.8)', width: 250, height: 50, x: 170, y: 150 });
  speedBox4.addEffect('fadeIn', 0.2, 0.3);
  scene4.addChild(speedBox4);

  const speedText4 = new FFText({ text: 'REAL TIME', x: 170, y: 150, fontSize: 26 });
  speedText4.setColor(COLORS.white);
  speedText4.alignCenter();
  speedText4.addEffect('fadeIn', 0.2, 0.4);
  scene4.addChild(speedText4);

  // Timer
  addTimer(scene4, '10', 0.2);

  // Step counter
  addStepCounter(scene4, 10, 10, 0.5);

  // Speed lines
  addSpeedLines(scene4, 'down', 1);
  addSpeedLines(scene4, 'down', 2.5);
  addSpeedLines(scene4, 'down', 4);

  scene4.setTransition('shake', 0.3);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Assembly - Building the Bowl (10s)'));

  // ============================================
  // SCENE 5: FINALE - Complete & CTA (8s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.darkBg);
  scene5.setDuration(8);

  // Dark background
  const finalBg = new FFRect({ color: COLORS.kitchenDark, width: 1100, height: 2000, x: width/2, y: height/2 });
  finalBg.addEffect('fadeIn', 0.2, 0);
  scene5.addChild(finalBg);

  // Success burst
  const successBurst = new FFRect({ color: COLORS.progressGreen, width: 1100, height: 250, x: width/2, y: 350 });
  successBurst.addEffect('zoomIn', 0.4, 0.3);
  scene5.addChild(successBurst);

  const successText = new FFText({ text: '✓ COMPLETE!', x: width/2, y: 320, fontSize: 70 });
  successText.setColor(COLORS.white);
  successText.alignCenter();
  successText.addEffect('bounceIn', 0.5, 0.5);
  scene5.addChild(successText);

  const timeResult = new FFText({ text: '⏱️ 58 SECONDS', x: width/2, y: 400, fontSize: 40 });
  timeResult.setColor(COLORS.eggYellow);
  timeResult.alignCenter();
  timeResult.addEffect('fadeIn', 0.3, 0.8);
  scene5.addChild(timeResult);

  // Final bowl showcase
  const showcaseBowl = new FFRect({ color: '#1a1a1a', width: 500, height: 300, x: width/2, y: 700 });
  showcaseBowl.addEffect('zoomIn', 0.5, 1.2);
  scene5.addChild(showcaseBowl);

  const showcaseBroth = new FFRect({ color: COLORS.brothGold, width: 450, height: 250, x: width/2, y: 700 });
  showcaseBroth.addEffect('fadeIn', 0.4, 1.4);
  scene5.addChild(showcaseBroth);

  // Bowl emoji
  const bowlEmoji = new FFText({ text: '🍜', x: width/2, y: 700, fontSize: 120 });
  bowlEmoji.alignCenter();
  bowlEmoji.addEffect('bounceIn', 0.5, 1.6);
  scene5.addChild(bowlEmoji);

  // Series title
  const seriesBox = new FFRect({ color: COLORS.ramenOrange, width: 600, height: 100, x: width/2, y: 1000 });
  seriesBox.addEffect('zoomIn', 0.4, 2);
  scene5.addChild(seriesBox);

  const seriesText = new FFText({ text: 'SPEED-RAMP COOK', x: width/2, y: 1000, fontSize: 44 });
  seriesText.setColor(COLORS.white);
  seriesText.alignCenter();
  seriesText.addEffect('fadeIn', 0.3, 2.2);
  scene5.addChild(seriesText);

  // Hashtags
  const hashText = new FFText({ text: '#SpeedCooking #Ramen #FoodChallenge', x: width/2, y: 1120, fontSize: 26 });
  hashText.setColor(COLORS.eggYellow);
  hashText.alignCenter();
  hashText.addEffect('fadeIn', 0.3, 2.5);
  scene5.addChild(hashText);

  // CTA
  const ctaBox = new FFRect({ color: COLORS.speedRed, width: 650, height: 150, x: width/2, y: 1350 });
  ctaBox.addEffect('zoomIn', 0.4, 3);
  scene5.addChild(ctaBox);

  const ctaText1 = new FFText({ text: '👆 FOLLOW FOR MORE', x: width/2, y: 1320, fontSize: 34 });
  ctaText1.setColor(COLORS.white);
  ctaText1.alignCenter();
  ctaText1.addEffect('bounceIn', 0.3, 3.3);
  scene5.addChild(ctaText1);

  const ctaText2 = new FFText({ text: 'SPEED RECIPES', x: width/2, y: 1380, fontSize: 40 });
  ctaText2.setColor(COLORS.eggYellow);
  ctaText2.alignCenter();
  ctaText2.addEffect('bounceIn', 0.3, 3.5);
  scene5.addChild(ctaText2);

  // Engagement
  const engageText = new FFText({ text: '❤️ LIKE  💬 COMMENT  🔄 SHARE', x: width/2, y: 1550, fontSize: 28 });
  engageText.setColor(COLORS.white);
  engageText.alignCenter();
  engageText.addEffect('fadeIn', 0.4, 4);
  scene5.addChild(engageText);

  // Story count
  const storyCount = new FFText({ text: 'STORY 12 OF 30', x: width/2, y: 1700, fontSize: 26 });
  storyCount.setColor(COLORS.dimWhite);
  storyCount.alignCenter();
  storyCount.addEffect('fadeIn', 0.4, 5);
  scene5.addChild(storyCount);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Finale - Complete & CTA (8s)'));

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
    console.log(colors.magenta('\n🎬 Story 12: "Speed-Ramp Cook" complete!\n'));
  });

  creator.start();
}

createSpeedRampCookVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

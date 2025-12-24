/**
 * 🎬 STORY 30: "Credits Finale" - Ending Series
 * 
 * The Story: A rapid-fire montage of a 30-day challenge ending with 
 * a cinematic credit roll.
 * 
 * Visual Style:
 * - Fast-paced, celebratory
 * - Vertical Credit Scroll
 * - Flash Transitions
 * - Orchestral Build-up feel
 * - Professional movie credits
 * - Behind the Scenes montage
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~30 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-30-credits-finale.js
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
// COLOR PALETTE - Cinematic Credits
// ============================================
const COLORS = {
  // Background
  deepBlack: '#000000',
  richBlack: '#0a0a0a',
  darkGray: '#1a1a1a',
  charcoal: '#2a2a2a',
  
  // Gold/Awards
  gold: '#ffd700',
  darkGold: '#b8860b',
  bronze: '#cd7f32',
  champagne: '#f7e7ce',
  
  // Credits text
  white: '#ffffff',
  lightGray: '#e0e0e0',
  silverGray: '#c0c0c0',
  dimWhite: '#d0d0d0',
  
  // Accent colors
  celebrationRed: '#ff0000',
  celebrationBlue: '#0066ff',
  celebrationGreen: '#00ff00',
  celebrationPurple: '#9900ff',
  
  // Montage overlays
  flashWhite: '#ffffff',
  overlayBlack: '#000000',
  vignetteBlack: '#000000'
};

// ============================================
// HELPER: Add Flash Transition
// ============================================
function addFlash(scene, delay = 0, duration = 0.1) {
  const flash = new FFRect({ 
    color: COLORS.flashWhite, 
    width: width, 
    height: height, 
    x: width/2, 
    y: height/2 
  });
  flash.setOpacity(0.8);
  flash.addEffect('fadeIn', duration, delay);
  flash.addEffect('fadeOut', duration, delay + duration);
  scene.addChild(flash);
}

// ============================================
// HELPER: Add Montage Frame
// ============================================
function addMontageFrame(scene, label, x, y, size, delay = 0) {
  // Frame background
  const frame = new FFRect({ 
    color: COLORS.charcoal, 
    width: size, 
    height: size, 
    x: x, 
    y: y 
  });
  frame.addEffect('zoomIn', 0.2, delay);
  scene.addChild(frame);
  
  // Frame border
  const border = new FFRect({ 
    color: COLORS.gold, 
    width: size + 6, 
    height: size + 6, 
    x: x, 
    y: y 
  });
  border.addEffect('fadeIn', 0.2, delay + 0.1);
  scene.addChild(border);
  
  // Day label
  const dayText = new FFText({ text: label, x: x, y: y, fontSize: 32 });
  dayText.setColor(COLORS.white);
  dayText.alignCenter();
  dayText.addEffect('fadeIn', 0.2, delay + 0.2);
  scene.addChild(dayText);
  
  return frame;
}

// ============================================
// HELPER: Add Credit Line
// ============================================
function addCreditLine(scene, role, name, startY, delay = 0) {
  // Role (smaller, uppercase)
  const roleText = new FFText({ text: role, x: width/2, y: startY, fontSize: 28 });
  roleText.setColor(COLORS.silverGray);
  roleText.alignCenter();
  roleText.addEffect('fadeIn', 0.4, delay);
  
  const scrollAnim = {
    from: { y: startY },
    to: { y: startY - 1500 },
    time: 8,
    delay: delay,
    ease: 'Linear.None'
  };
  roleText.addAnimate(scrollAnim);
  scene.addChild(roleText);
  
  // Name (larger, bold feel)
  const nameText = new FFText({ text: name, x: width/2, y: startY + 50, fontSize: 42 });
  nameText.setColor(COLORS.white);
  nameText.alignCenter();
  nameText.addEffect('fadeIn', 0.4, delay + 0.1);
  
  const scrollAnim2 = {
    from: { y: startY + 50 },
    to: { y: startY + 50 - 1500 },
    time: 8,
    delay: delay + 0.1,
    ease: 'Linear.None'
  };
  nameText.addAnimate(scrollAnim2);
  scene.addChild(nameText);
}

// ============================================
// HELPER: Add Confetti
// ============================================
function addConfetti(scene, count, delay = 0) {
  for (let i = 0; i < count; i++) {
    const confetti = new FFRect({ 
      color: [COLORS.celebrationRed, COLORS.celebrationBlue, COLORS.celebrationGreen, COLORS.gold][i % 4],
      width: 8 + Math.random() * 12, 
      height: 15 + Math.random() * 20, 
      x: Math.random() * width, 
      y: -50 
    });
    confetti.setRotate(Math.random() * Math.PI * 2);
    confetti.addEffect('fadeIn', 0.2, delay + (Math.random() * 0.5));
    
    const fallAnim = {
      from: { y: -50 },
      to: { y: height + 50 },
      time: 2 + Math.random() * 2,
      delay: delay + (Math.random() * 0.5),
      ease: 'Cubic.In'
    };
    confetti.addAnimate(fallAnim);
    
    const rotateAnim = {
      from: { rotation: 0 },
      to: { rotation: Math.PI * 4 },
      time: 2 + Math.random() * 2,
      delay: delay + (Math.random() * 0.5),
      ease: 'Linear.None'
    };
    confetti.addAnimate(rotateAnim);
    
    scene.addChild(confetti);
  }
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createCreditsFinaleVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 30: "Credits Finale"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~30 seconds'));
  console.log(colors.yellow('🎨 Theme: Ending Series - Cinematic Credits\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-30-credits-finale.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: RAPID MONTAGE - Days 1-10 (5s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.deepBlack);
  scene1.setDuration(5);

  // Title
  const titleText = new FFText({ text: '30 DAY CHALLENGE', x: width/2, y: 300, fontSize: 56 });
  titleText.setColor(COLORS.gold);
  titleText.alignCenter();
  titleText.addEffect('fadeIn', 0.3, 0.2);
  titleText.addEffect('fadeOut', 0.3, 3);
  scene1.addChild(titleText);

  // Rapid montage frames
  const days1 = [
    { day: 'DAY 1', x: 270, y: 700 },
    { day: 'DAY 2', x: 810, y: 700 },
    { day: 'DAY 3', x: 270, y: 1000 },
    { day: 'DAY 4', x: 810, y: 1000 },
    { day: 'DAY 5', x: 270, y: 1300 },
    { day: 'DAY 6', x: 810, y: 1300 }
  ];

  days1.forEach((day, i) => {
    addMontageFrame(scene1, day.day, day.x, day.y, 200, 0.5 + (i * 0.15));
    addFlash(scene1, 0.5 + (i * 0.15), 0.05);
  });

  // Progress text
  const progressText = new FFText({ text: 'DAYS 1-10', x: width/2, y: 1650, fontSize: 48 });
  progressText.setColor(COLORS.white);
  progressText.alignCenter();
  progressText.addEffect('fadeIn', 0.4, 2);
  scene1.addChild(progressText);

  scene1.setTransition('fade', 0.3);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Rapid Montage - Days 1-10 (5s)'));

  // ============================================
  // SCENE 2: MONTAGE CONTINUES - Days 11-20 (5s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.deepBlack);
  scene2.setDuration(5);

  // More frames
  const days2 = [
    { day: 'DAY 11', x: 270, y: 500 },
    { day: 'DAY 12', x: 810, y: 500 },
    { day: 'DAY 13', x: 270, y: 800 },
    { day: 'DAY 14', x: 810, y: 800 },
    { day: 'DAY 15', x: 270, y: 1100 },
    { day: 'DAY 16', x: 810, y: 1100 },
    { day: 'DAY 17', x: 270, y: 1400 },
    { day: 'DAY 18', x: 810, y: 1400 }
  ];

  days2.forEach((day, i) => {
    addMontageFrame(scene2, day.day, day.x, day.y, 200, 0.2 + (i * 0.12));
    addFlash(scene2, 0.2 + (i * 0.12), 0.05);
  });

  // Progress text
  const progressText2 = new FFText({ text: 'DAYS 11-20', x: width/2, y: 1750, fontSize: 48 });
  progressText2.setColor(COLORS.white);
  progressText2.alignCenter();
  progressText2.addEffect('fadeIn', 0.4, 2);
  scene2.addChild(progressText2);

  // Building excitement
  const exciteText = new FFText({ text: 'HALFWAY THERE!', x: width/2, y: 250, fontSize: 42 });
  exciteText.setColor(COLORS.gold);
  exciteText.alignCenter();
  exciteText.addEffect('bounceIn', 0.5, 2.5);
  scene2.addChild(exciteText);

  scene2.setTransition('windowslice', 0.3);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Montage Continues - Days 11-20 (5s)'));

  // ============================================
  // SCENE 3: FINAL PUSH - Days 21-30 (6s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.deepBlack);
  scene3.setDuration(6);

  // Final days
  const days3 = [
    { day: 'DAY 21', x: 200, y: 400 },
    { day: 'DAY 22', x: 540, y: 400 },
    { day: 'DAY 23', x: 880, y: 400 },
    { day: 'DAY 24', x: 200, y: 700 },
    { day: 'DAY 25', x: 540, y: 700 },
    { day: 'DAY 26', x: 880, y: 700 },
    { day: 'DAY 27', x: 200, y: 1000 },
    { day: 'DAY 28', x: 540, y: 1000 },
    { day: 'DAY 29', x: 880, y: 1000 }
  ];

  days3.forEach((day, i) => {
    addMontageFrame(scene3, day.day, day.x, day.y, 180, 0.2 + (i * 0.1));
    addFlash(scene3, 0.2 + (i * 0.1), 0.05);
  });

  // DAY 30 - Special emphasis
  const day30Frame = new FFRect({ 
    color: COLORS.gold, 
    width: 400, 
    height: 400, 
    x: width/2, 
    y: 1450 
  });
  day30Frame.addEffect('zoomIn', 0.5, 2.5);
  scene3.addChild(day30Frame);

  const day30Text = new FFText({ text: 'DAY 30', x: width/2, y: 1450, fontSize: 72 });
  day30Text.setColor(COLORS.deepBlack);
  day30Text.alignCenter();
  day30Text.addEffect('bounceIn', 0.6, 2.8);
  scene3.addChild(day30Text);

  // Completion flash
  for (let i = 0; i < 5; i++) {
    addFlash(scene3, 3.5 + (i * 0.2), 0.1);
  }

  // Confetti celebration
  addConfetti(scene3, 40, 3.5);

  // COMPLETE text
  const completeText = new FFText({ text: 'COMPLETE!', x: width/2, y: 200, fontSize: 80 });
  completeText.setColor(COLORS.gold);
  completeText.alignCenter();
  completeText.addEffect('bounceIn', 0.6, 4);
  scene3.addChild(completeText);

  scene3.setTransition('zoomIn', 0.5);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Final Push - Days 21-30 (6s)'));

  // ============================================
  // SCENE 4: CREDITS ROLL - Part 1 (7s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.richBlack);
  scene4.setDuration(7);

  // Vignette effect
  const vignette = new FFRect({ 
    color: COLORS.vignetteBlack, 
    width: width, 
    height: 400, 
    x: width/2, 
    y: 200 
  });
  vignette.setOpacity(0.5);
  scene4.addChild(vignette);

  const vignetteBottom = new FFRect({ 
    color: COLORS.vignetteBlack, 
    width: width, 
    height: 400, 
    x: width/2, 
    y: height - 200 
  });
  vignetteBottom.setOpacity(0.5);
  scene4.addChild(vignetteBottom);

  // Main title
  const mainTitle = new FFText({ text: '30 DAY CHALLENGE', x: width/2, y: 2200, fontSize: 64 });
  mainTitle.setColor(COLORS.gold);
  mainTitle.alignCenter();
  
  const scrollMain = {
    from: { y: 2200 },
    to: { y: -200 },
    time: 6.5,
    delay: 0.5,
    ease: 'Linear.None'
  };
  mainTitle.addAnimate(scrollMain);
  scene4.addChild(mainTitle);

  // Credits
  const credits1 = [
    { role: 'CREATED BY', name: 'Your Name', y: 2400 },
    { role: 'DIRECTED BY', name: 'Your Name', y: 2600 },
    { role: 'PRODUCED BY', name: 'Your Name', y: 2800 },
    { role: 'EDITED BY', name: 'Your Name', y: 3000 },
    { role: 'CINEMATOGRAPHY', name: 'Your Name', y: 3200 }
  ];

  credits1.forEach((credit, i) => {
    addCreditLine(scene4, credit.role, credit.name, credit.y, 0.5);
  });

  scene4.setTransition('fade', 0.4);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Credits Roll - Part 1 (7s)'));

  // ============================================
  // SCENE 5: CREDITS FINALE - Part 2 (7s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.richBlack);
  scene5.setDuration(7);

  // Vignette
  const vignette2 = new FFRect({ 
    color: COLORS.vignetteBlack, 
    width: width, 
    height: 400, 
    x: width/2, 
    y: 200 
  });
  vignette2.setOpacity(0.5);
  scene5.addChild(vignette2);

  const vignetteBottom2 = new FFRect({ 
    color: COLORS.vignetteBlack, 
    width: width, 
    height: 400, 
    x: width/2, 
    y: height - 200 
  });
  vignetteBottom2.setOpacity(0.5);
  scene5.addChild(vignetteBottom2);

  // More credits
  const credits2 = [
    { role: 'MUSIC BY', name: 'Orchestral Composer', y: 2200 },
    { role: 'SOUND DESIGN', name: 'Audio Engineer', y: 2400 },
    { role: 'SPECIAL THANKS', name: 'Everyone Who Supported', y: 2600 },
    { role: 'FILMED ON', name: 'Your Camera', y: 2800 }
  ];

  credits2.forEach((credit, i) => {
    addCreditLine(scene5, credit.role, credit.name, credit.y, 0.5);
  });

  // Final message
  const finalMessage = new FFText({ text: 'THANK YOU', x: width/2, y: 3200, fontSize: 80 });
  finalMessage.setColor(COLORS.gold);
  finalMessage.alignCenter();
  
  const scrollFinal = {
    from: { y: 3200 },
    to: { y: height/2 },
    time: 6,
    delay: 0.5,
    ease: 'Cubic.Out'
  };
  finalMessage.addAnimate(scrollFinal);
  scene5.addChild(finalMessage);

  // Subtitle
  const subtitle = new FFText({ text: 'FOR WATCHING', x: width/2, y: 3350, fontSize: 42 });
  subtitle.setColor(COLORS.white);
  subtitle.alignCenter();
  
  const scrollSub = {
    from: { y: 3350 },
    to: { y: height/2 + 100 },
    time: 6,
    delay: 0.5,
    ease: 'Cubic.Out'
  };
  subtitle.addAnimate(scrollSub);
  scene5.addChild(subtitle);

  // Final confetti
  addConfetti(scene5, 30, 4);

  // Social media handles
  const socialText = new FFText({ text: '@YourHandle', x: width/2, y: 3600, fontSize: 36 });
  socialText.setColor(COLORS.silverGray);
  socialText.alignCenter();
  
  const scrollSocial = {
    from: { y: 3600 },
    to: { y: height/2 + 250 },
    time: 6,
    delay: 0.5,
    ease: 'Cubic.Out'
  };
  socialText.addAnimate(scrollSocial);
  scene5.addChild(socialText);

  // Hashtags
  const hashtagText = new FFText({ text: '#30DayChallenge #Complete', x: width/2, y: 3750, fontSize: 32 });
  hashtagText.setColor(COLORS.dimWhite);
  hashtagText.alignCenter();
  
  const scrollHash = {
    from: { y: 3750 },
    to: { y: height/2 + 350 },
    time: 6,
    delay: 0.5,
    ease: 'Cubic.Out'
  };
  hashtagText.addAnimate(scrollHash);
  scene5.addChild(hashtagText);

  // Fade to black
  const fadeBlack = new FFRect({ 
    color: COLORS.deepBlack, 
    width: width, 
    height: height, 
    x: width/2, 
    y: height/2 
  });
  fadeBlack.addEffect('fadeIn', 1, 5.5);
  scene5.addChild(fadeBlack);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Credits Finale - Part 2 (7s)'));

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
    console.log(colors.magenta('\n🎬 Story 30: "Credits Finale" complete!\n'));
    console.log(colors.yellow('🎥 Features used:'));
    console.log(colors.cyan('   • Rapid-fire montage frames'));
    console.log(colors.cyan('   • Flash transitions'));
    console.log(colors.cyan('   • Vertical credit scroll'));
    console.log(colors.cyan('   • Confetti celebration'));
    console.log(colors.cyan('   • Cinematic vignette'));
    console.log(colors.cyan('   • Professional credit formatting\n'));
  });

  creator.start();
}

createCreditsFinaleVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

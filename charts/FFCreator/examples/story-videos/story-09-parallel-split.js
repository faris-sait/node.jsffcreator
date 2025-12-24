/**
 * 🎬 STORY 9: "Parallel Split" - Symmetry Narrative
 * 
 * The Story: Two versions of a day: one where the protagonist 
 * misses the bus, and one where they catch it.
 * 
 * Visual Style:
 * - Symmetrical compositions with vertical split-screen
 * - Color grading (LUTs) to differentiate moods
 * - Left side: Cold/Blue tones (missed bus - bad day)
 * - Right side: Warm/Golden tones (caught bus - good day)
 * - Thin vibrating white line separates the two stories
 * - Text appears on both sides simultaneously
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~55 seconds
 * 
 * Run with: node examples/story-videos/story-09-parallel-split.js
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
// COLOR PALETTE - Split Theme (Cold vs Warm)
// ============================================
const COLORS = {
  // LEFT SIDE - Missed Bus (Cold/Blue/Sad)
  coldBg: '#0d1b2a',
  coldBlue: '#1b263b',
  icyBlue: '#415a77',
  stormGray: '#778da9',
  paleBlue: '#e0e1dd',
  sadBlue: '#3d5a80',
  rainGray: '#5c677d',
  
  // RIGHT SIDE - Caught Bus (Warm/Golden/Happy)
  warmBg: '#2d1810',
  warmOrange: '#bc6c25',
  goldenYellow: '#dda15e',
  sunnyGold: '#fefae0',
  happyOrange: '#fb8500',
  warmPeach: '#ffb703',
  cozyBrown: '#6b4423',
  
  // DIVIDER
  dividerWhite: '#ffffff',
  dividerGlow: 'rgba(255, 255, 255, 0.6)',
  
  // TEXT
  white: '#ffffff',
  lightGray: '#e0e0e0',
  darkText: '#1a1a1a',
  
  // ACCENTS
  missedRed: '#e63946',
  successGreen: '#2a9d8f',
  clockBlue: '#457b9d',
  clockGold: '#e9c46a'
};

// ============================================
// HELPER: Create vibrating divider line
// ============================================
function addDividerLine(scene, yStart, yEnd, delay = 0) {
  // Main white divider line
  const divider = new FFRect({ 
    color: COLORS.dividerWhite, 
    width: 6, 
    height: yEnd - yStart, 
    x: width / 2, 
    y: yStart + (yEnd - yStart) / 2 
  });
  divider.addEffect('fadeIn', 0.3, delay);
  scene.addChild(divider);
  
  // Glow effect layers
  const glow1 = new FFRect({ 
    color: COLORS.dividerGlow, 
    width: 12, 
    height: yEnd - yStart, 
    x: width / 2, 
    y: yStart + (yEnd - yStart) / 2 
  });
  glow1.addEffect('fadeIn', 0.4, delay + 0.1);
  scene.addChild(glow1);
  
  return divider;
}

// ============================================
// HELPER: Create split background
// ============================================
function addSplitBackground(scene, delay = 0) {
  // Left side - Cold blue
  const leftBg = new FFRect({ 
    color: COLORS.coldBg, 
    width: width / 2, 
    height: height, 
    x: width / 4, 
    y: height / 2 
  });
  leftBg.addEffect('fadeIn', 0.3, delay);
  scene.addChild(leftBg);
  
  // Right side - Warm orange
  const rightBg = new FFRect({ 
    color: COLORS.warmBg, 
    width: width / 2, 
    height: height, 
    x: (width / 4) * 3, 
    y: height / 2 
  });
  rightBg.addEffect('fadeIn', 0.3, delay);
  scene.addChild(rightBg);
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createParallelSplitVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 9: "Parallel Split"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~55 seconds'));
  console.log(colors.yellow('🎨 Theme: Symmetry Narrative - Split Screen\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-09-parallel-split.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: INTRO - The Split Begins (4s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor('#000000');
  scene1.setDuration(4);

  // Dark intro background
  const introBg = new FFRect({ color: '#0a0a0a', width: 1100, height: 2000, x: width/2, y: height/2 });
  introBg.addEffect('fadeIn', 0.3, 0);
  scene1.addChild(introBg);

  // Title text
  const titleText1 = new FFText({ text: 'WHAT IF', x: width/2, y: 600, fontSize: 70 });
  titleText1.setColor(COLORS.white);
  titleText1.alignCenter();
  titleText1.addEffect('fadeIn', 0.5, 0.3);
  scene1.addChild(titleText1);

  const titleText2 = new FFText({ text: 'ONE MOMENT', x: width/2, y: 720, fontSize: 80 });
  titleText2.setColor(COLORS.white);
  titleText2.alignCenter();
  titleText2.addEffect('bounceIn', 0.6, 0.6);
  scene1.addChild(titleText2);

  const titleText3 = new FFText({ text: 'CHANGED', x: width/2, y: 850, fontSize: 90 });
  titleText3.setColor(COLORS.warmPeach);
  titleText3.alignCenter();
  titleText3.addEffect('bounceIn', 0.6, 1);
  scene1.addChild(titleText3);

  const titleText4 = new FFText({ text: 'EVERYTHING?', x: width/2, y: 980, fontSize: 80 });
  titleText4.setColor(COLORS.icyBlue);
  titleText4.alignCenter();
  titleText4.addEffect('bounceIn', 0.6, 1.4);
  scene1.addChild(titleText4);

  // Divider line appears (small initial height, will be replaced by expanding divider)
  const introDivider = new FFRect({ color: COLORS.dividerWhite, width: 4, height: 10, x: width/2, y: height/2 });
  introDivider.addEffect('fadeIn', 0.3, 2);
  scene1.addChild(introDivider);

  // Expanding divider effect
  const expandDivider = new FFRect({ color: COLORS.dividerWhite, width: 6, height: 400, x: width/2, y: height/2 });
  expandDivider.addEffect('zoomIn', 0.8, 2.2);
  scene1.addChild(expandDivider);

  scene1.setTransition('fade', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Intro - The Split Begins (4s)'));

  // ============================================
  // SCENE 2: THE ALARM - 7:00 AM (5s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor('#000000');
  scene2.setDuration(5);

  // Split background
  addSplitBackground(scene2, 0);

  // Left side - Cold morning (hit snooze)
  const leftOverlay2 = new FFRect({ color: COLORS.coldBlue, width: 520, height: 1900, x: width/4, y: height/2 });
  leftOverlay2.addEffect('fadeIn', 0.3, 0.2);
  scene2.addChild(leftOverlay2);

  // Right side - Warm morning (woke up)
  const rightOverlay2 = new FFRect({ color: COLORS.cozyBrown, width: 520, height: 1900, x: (width/4)*3, y: height/2 });
  rightOverlay2.addEffect('fadeIn', 0.3, 0.2);
  scene2.addChild(rightOverlay2);

  // Time display - both sides
  const timeLeft = new FFText({ text: '7:00', x: width/4, y: 350, fontSize: 100 });
  timeLeft.setColor(COLORS.icyBlue);
  timeLeft.alignCenter();
  timeLeft.addEffect('zoomIn', 0.5, 0.4);
  scene2.addChild(timeLeft);

  const timeRight = new FFText({ text: '7:00', x: (width/4)*3, y: 350, fontSize: 100 });
  timeRight.setColor(COLORS.goldenYellow);
  timeRight.alignCenter();
  timeRight.addEffect('zoomIn', 0.5, 0.4);
  scene2.addChild(timeRight);

  // AM labels
  const amLeft = new FFText({ text: 'AM', x: width/4, y: 430, fontSize: 40 });
  amLeft.setColor(COLORS.stormGray);
  amLeft.alignCenter();
  amLeft.addEffect('fadeIn', 0.3, 0.6);
  scene2.addChild(amLeft);

  const amRight = new FFText({ text: 'AM', x: (width/4)*3, y: 430, fontSize: 40 });
  amRight.setColor(COLORS.warmOrange);
  amRight.alignCenter();
  amRight.addEffect('fadeIn', 0.3, 0.6);
  scene2.addChild(amRight);

  // Alarm icon
  const alarmLeft = new FFText({ text: '⏰', x: width/4, y: 550, fontSize: 80 });
  alarmLeft.alignCenter();
  alarmLeft.addEffect('bounceIn', 0.5, 0.8);
  scene2.addChild(alarmLeft);

  const alarmRight = new FFText({ text: '⏰', x: (width/4)*3, y: 550, fontSize: 80 });
  alarmRight.alignCenter();
  alarmRight.addEffect('bounceIn', 0.5, 0.8);
  scene2.addChild(alarmRight);

  // Action text - LEFT (snooze)
  const snoozeBox = new FFRect({ color: COLORS.missedRed, width: 400, height: 100, x: width/4, y: 750 });
  snoozeBox.addEffect('fadeInLeft', 0.4, 1.2);
  scene2.addChild(snoozeBox);

  const snoozeText = new FFText({ text: '💤 SNOOZE', x: width/4, y: 750, fontSize: 42 });
  snoozeText.setColor(COLORS.white);
  snoozeText.alignCenter();
  snoozeText.addEffect('fadeIn', 0.3, 1.4);
  scene2.addChild(snoozeText);

  // Action text - RIGHT (wake up)
  const wakeBox = new FFRect({ color: COLORS.successGreen, width: 400, height: 100, x: (width/4)*3, y: 750 });
  wakeBox.addEffect('fadeInRight', 0.4, 1.2);
  scene2.addChild(wakeBox);

  const wakeText = new FFText({ text: '☀️ WAKE UP', x: (width/4)*3, y: 750, fontSize: 42 });
  wakeText.setColor(COLORS.white);
  wakeText.alignCenter();
  wakeText.addEffect('fadeIn', 0.3, 1.4);
  scene2.addChild(wakeText);

  // Narrative text
  const narrativeLeft = new FFText({ text: '"5 more minutes..."', x: width/4, y: 950, fontSize: 32 });
  narrativeLeft.setColor(COLORS.paleBlue);
  narrativeLeft.alignCenter();
  narrativeLeft.addEffect('fadeIn', 0.5, 2);
  scene2.addChild(narrativeLeft);

  const narrativeRight = new FFText({ text: '"Let\'s do this!"', x: (width/4)*3, y: 950, fontSize: 32 });
  narrativeRight.setColor(COLORS.sunnyGold);
  narrativeRight.alignCenter();
  narrativeRight.addEffect('fadeIn', 0.5, 2);
  scene2.addChild(narrativeRight);

  // Divider
  addDividerLine(scene2, 100, 1800, 0.1);

  // Bottom labels
  const missedLabel = new FFText({ text: 'MISSED', x: width/4, y: 1700, fontSize: 50 });
  missedLabel.setColor(COLORS.icyBlue);
  missedLabel.alignCenter();
  missedLabel.addEffect('fadeInUp', 0.4, 3);
  scene2.addChild(missedLabel);

  const caughtLabel = new FFText({ text: 'CAUGHT', x: (width/4)*3, y: 1700, fontSize: 50 });
  caughtLabel.setColor(COLORS.goldenYellow);
  caughtLabel.alignCenter();
  caughtLabel.addEffect('fadeInUp', 0.4, 3);
  scene2.addChild(caughtLabel);

  scene2.setTransition('windowslice', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: The Alarm - 7:00 AM (5s)'));

  // ============================================
  // SCENE 3: THE RUSH - Getting Ready (6s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor('#000000');
  scene3.setDuration(6);

  addSplitBackground(scene3, 0);

  // Left side - Chaos (running late)
  const chaosOverlay = new FFRect({ color: 'rgba(13, 27, 42, 0.9)', width: 520, height: 1900, x: width/4, y: height/2 });
  chaosOverlay.addEffect('fadeIn', 0.3, 0.1);
  scene3.addChild(chaosOverlay);

  // Right side - Calm (on time)
  const calmOverlay = new FFRect({ color: 'rgba(45, 24, 16, 0.9)', width: 520, height: 1900, x: (width/4)*3, y: height/2 });
  calmOverlay.addEffect('fadeIn', 0.3, 0.1);
  scene3.addChild(calmOverlay);

  // Time - LEFT (late)
  const timeLate = new FFText({ text: '7:45', x: width/4, y: 250, fontSize: 80 });
  timeLate.setColor(COLORS.missedRed);
  timeLate.alignCenter();
  timeLate.addEffect('bounceIn', 0.5, 0.3);
  scene3.addChild(timeLate);

  // Time - RIGHT (on time)
  const timeOnTime = new FFText({ text: '7:15', x: (width/4)*3, y: 250, fontSize: 80 });
  timeOnTime.setColor(COLORS.successGreen);
  timeOnTime.alignCenter();
  timeOnTime.addEffect('bounceIn', 0.5, 0.3);
  scene3.addChild(timeOnTime);

  // Status icons - LEFT (chaos)
  const chaosIcons = ['😰', '🏃', '⚡', '😫'];
  chaosIcons.forEach((icon, i) => {
    const iconText = new FFText({ text: icon, x: 150 + (i * 120), y: 420, fontSize: 50 });
    iconText.addEffect('fadeInDown', 0.3, 0.5 + (i * 0.15));
    scene3.addChild(iconText);
  });

  // Status icons - RIGHT (calm)
  const calmIcons = ['😊', '☕', '🎵', '✨'];
  calmIcons.forEach((icon, i) => {
    const iconText = new FFText({ text: icon, x: 590 + (i * 120), y: 420, fontSize: 50 });
    iconText.addEffect('fadeInDown', 0.3, 0.5 + (i * 0.15));
    scene3.addChild(iconText);
  });

  // Activity list - LEFT
  const leftActivities = [
    { text: '❌ No breakfast', y: 580 },
    { text: '❌ Forgot keys', y: 680 },
    { text: '❌ Messy hair', y: 780 },
    { text: '❌ Wrong shoes', y: 880 }
  ];

  leftActivities.forEach((act, i) => {
    const actText = new FFText({ text: act.text, x: width/4, y: act.y, fontSize: 34 });
    actText.setColor(COLORS.stormGray);
    actText.alignCenter();
    actText.addEffect('fadeInLeft', 0.4, 1 + (i * 0.2));
    scene3.addChild(actText);
  });

  // Activity list - RIGHT
  const rightActivities = [
    { text: '✅ Full breakfast', y: 580 },
    { text: '✅ Everything packed', y: 680 },
    { text: '✅ Looking fresh', y: 780 },
    { text: '✅ Ready to go', y: 880 }
  ];

  rightActivities.forEach((act, i) => {
    const actText = new FFText({ text: act.text, x: (width/4)*3, y: act.y, fontSize: 34 });
    actText.setColor(COLORS.sunnyGold);
    actText.alignCenter();
    actText.addEffect('fadeInRight', 0.4, 1 + (i * 0.2));
    scene3.addChild(actText);
  });

  // Stress meter - LEFT
  const stressBg = new FFRect({ color: COLORS.coldBlue, width: 350, height: 30, x: width/4, y: 1050 });
  stressBg.addEffect('fadeIn', 0.3, 2.2);
  scene3.addChild(stressBg);

  const stressFill = new FFRect({ color: COLORS.missedRed, width: 320, height: 30, x: width/4 - 15, y: 1050 });
  stressFill.addEffect('fadeIn', 0.5, 2.4);
  scene3.addChild(stressFill);

  const stressLabel = new FFText({ text: 'STRESS: HIGH', x: width/4, y: 1110, fontSize: 26 });
  stressLabel.setColor(COLORS.missedRed);
  stressLabel.alignCenter();
  stressLabel.addEffect('fadeIn', 0.3, 2.6);
  scene3.addChild(stressLabel);

  // Calm meter - RIGHT
  const calmBg = new FFRect({ color: COLORS.cozyBrown, width: 350, height: 30, x: (width/4)*3, y: 1050 });
  calmBg.addEffect('fadeIn', 0.3, 2.2);
  scene3.addChild(calmBg);

  const calmFill = new FFRect({ color: COLORS.successGreen, width: 100, height: 30, x: (width/4)*3 - 125, y: 1050 });
  calmFill.addEffect('fadeIn', 0.5, 2.4);
  scene3.addChild(calmFill);

  const calmLabel = new FFText({ text: 'STRESS: LOW', x: (width/4)*3, y: 1110, fontSize: 26 });
  calmLabel.setColor(COLORS.successGreen);
  calmLabel.alignCenter();
  calmLabel.addEffect('fadeIn', 0.3, 2.6);
  scene3.addChild(calmLabel);

  // Divider
  addDividerLine(scene3, 100, 1800, 0.1);

  // Bottom narrative
  const rushNarr = new FFText({ text: 'THE MORNING RUSH', x: width/2, y: 1700, fontSize: 48 });
  rushNarr.setColor(COLORS.white);
  rushNarr.alignCenter();
  rushNarr.addEffect('fadeInUp', 0.5, 3.5);
  scene3.addChild(rushNarr);

  scene3.setTransition('shake', 0.4);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: The Rush - Getting Ready (6s)'));

  // ============================================
  // SCENE 4: THE BUS STOP - The Moment (7s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor('#000000');
  scene4.setDuration(7);

  addSplitBackground(scene4, 0);

  // Left side - Missed it
  const missedBg = new FFRect({ color: COLORS.coldBlue, width: 520, height: 1900, x: width/4, y: height/2 });
  missedBg.addEffect('fadeIn', 0.3, 0.1);
  scene4.addChild(missedBg);

  // Right side - Caught it
  const caughtBg = new FFRect({ color: COLORS.warmOrange, width: 520, height: 1900, x: (width/4)*3, y: height/2 });
  caughtBg.addEffect('fadeIn', 0.3, 0.1);
  scene4.addChild(caughtBg);

  // Bus stop sign - both sides
  const busStopLeft = new FFRect({ color: COLORS.icyBlue, width: 200, height: 80, x: width/4, y: 200 });
  busStopLeft.addEffect('fadeIn', 0.3, 0.3);
  scene4.addChild(busStopLeft);

  const busStopTextL = new FFText({ text: '🚏 BUS STOP', x: width/4, y: 200, fontSize: 24 });
  busStopTextL.setColor(COLORS.white);
  busStopTextL.alignCenter();
  busStopTextL.addEffect('fadeIn', 0.2, 0.4);
  scene4.addChild(busStopTextL);

  const busStopRight = new FFRect({ color: COLORS.goldenYellow, width: 200, height: 80, x: (width/4)*3, y: 200 });
  busStopRight.addEffect('fadeIn', 0.3, 0.3);
  scene4.addChild(busStopRight);

  const busStopTextR = new FFText({ text: '🚏 BUS STOP', x: (width/4)*3, y: 200, fontSize: 24 });
  busStopTextR.setColor(COLORS.darkText);
  busStopTextR.alignCenter();
  busStopTextR.addEffect('fadeIn', 0.2, 0.4);
  scene4.addChild(busStopTextR);

  // Time display
  const busTimeL = new FFText({ text: '8:02 AM', x: width/4, y: 350, fontSize: 60 });
  busTimeL.setColor(COLORS.missedRed);
  busTimeL.alignCenter();
  busTimeL.addEffect('bounceIn', 0.5, 0.6);
  scene4.addChild(busTimeL);

  const busTimeR = new FFText({ text: '7:58 AM', x: (width/4)*3, y: 350, fontSize: 60 });
  busTimeR.setColor(COLORS.successGreen);
  busTimeR.alignCenter();
  busTimeR.addEffect('bounceIn', 0.5, 0.6);
  scene4.addChild(busTimeR);

  // Bus scheduled time
  const scheduleL = new FFText({ text: 'Bus left at 8:00', x: width/4, y: 430, fontSize: 28 });
  scheduleL.setColor(COLORS.stormGray);
  scheduleL.alignCenter();
  scheduleL.addEffect('fadeIn', 0.3, 0.9);
  scene4.addChild(scheduleL);

  const scheduleR = new FFText({ text: 'Bus arrives 8:00', x: (width/4)*3, y: 430, fontSize: 28 });
  scheduleR.setColor(COLORS.sunnyGold);
  scheduleR.alignCenter();
  scheduleR.addEffect('fadeIn', 0.3, 0.9);
  scene4.addChild(scheduleR);

  // THE MOMENT - Left (missed)
  const missedBox = new FFRect({ color: COLORS.missedRed, width: 450, height: 200, x: width/4, y: 650 });
  missedBox.addEffect('zoomIn', 0.5, 1.2);
  scene4.addChild(missedBox);

  const missedIcon = new FFText({ text: '🚌💨', x: width/4, y: 600, fontSize: 60 });
  missedIcon.alignCenter();
  missedIcon.addEffect('fadeInLeft', 0.4, 1.5);
  scene4.addChild(missedIcon);

  const missedText = new FFText({ text: 'MISSED IT', x: width/4, y: 690, fontSize: 48 });
  missedText.setColor(COLORS.white);
  missedText.alignCenter();
  missedText.addEffect('bounceIn', 0.5, 1.7);
  scene4.addChild(missedText);

  // THE MOMENT - Right (caught)
  const caughtBox = new FFRect({ color: COLORS.successGreen, width: 450, height: 200, x: (width/4)*3, y: 650 });
  caughtBox.addEffect('zoomIn', 0.5, 1.2);
  scene4.addChild(caughtBox);

  const caughtIcon = new FFText({ text: '🚌✨', x: (width/4)*3, y: 600, fontSize: 60 });
  caughtIcon.alignCenter();
  caughtIcon.addEffect('fadeInRight', 0.4, 1.5);
  scene4.addChild(caughtIcon);

  const caughtText = new FFText({ text: 'CAUGHT IT', x: (width/4)*3, y: 690, fontSize: 48 });
  caughtText.setColor(COLORS.white);
  caughtText.alignCenter();
  caughtText.addEffect('bounceIn', 0.5, 1.7);
  scene4.addChild(caughtText);

  // Reaction - LEFT
  const reactionL = new FFText({ text: '😩', x: width/4, y: 900, fontSize: 100 });
  reactionL.alignCenter();
  reactionL.addEffect('bounceIn', 0.6, 2.2);
  scene4.addChild(reactionL);

  const thoughtL = new FFText({ text: '"Not again..."', x: width/4, y: 1020, fontSize: 32 });
  thoughtL.setColor(COLORS.paleBlue);
  thoughtL.alignCenter();
  thoughtL.addEffect('fadeIn', 0.4, 2.6);
  scene4.addChild(thoughtL);

  // Reaction - RIGHT
  const reactionR = new FFText({ text: '😊', x: (width/4)*3, y: 900, fontSize: 100 });
  reactionR.alignCenter();
  reactionR.addEffect('bounceIn', 0.6, 2.2);
  scene4.addChild(reactionR);

  const thoughtR = new FFText({ text: '"Perfect timing!"', x: (width/4)*3, y: 1020, fontSize: 32 });
  thoughtR.setColor(COLORS.sunnyGold);
  thoughtR.alignCenter();
  thoughtR.addEffect('fadeIn', 0.4, 2.6);
  scene4.addChild(thoughtR);

  // Wait time - LEFT
  const waitBox = new FFRect({ color: 'rgba(0,0,0,0.5)', width: 400, height: 120, x: width/4, y: 1200 });
  waitBox.addEffect('fadeIn', 0.4, 3.2);
  scene4.addChild(waitBox);

  const waitText = new FFText({ text: 'Next bus: 25 min', x: width/4, y: 1180, fontSize: 30 });
  waitText.setColor(COLORS.missedRed);
  waitText.alignCenter();
  waitText.addEffect('fadeIn', 0.3, 3.4);
  scene4.addChild(waitText);

  const waitIcon = new FFText({ text: '⏳', x: width/4, y: 1240, fontSize: 40 });
  waitIcon.alignCenter();
  waitIcon.addEffect('fadeIn', 0.3, 3.5);
  scene4.addChild(waitIcon);

  // On bus - RIGHT
  const onBusBox = new FFRect({ color: 'rgba(0,0,0,0.5)', width: 400, height: 120, x: (width/4)*3, y: 1200 });
  onBusBox.addEffect('fadeIn', 0.4, 3.2);
  scene4.addChild(onBusBox);

  const onBusText = new FFText({ text: 'On the bus!', x: (width/4)*3, y: 1180, fontSize: 30 });
  onBusText.setColor(COLORS.successGreen);
  onBusText.alignCenter();
  onBusText.addEffect('fadeIn', 0.3, 3.4);
  scene4.addChild(onBusText);

  const onBusIcon = new FFText({ text: '🎧', x: (width/4)*3, y: 1240, fontSize: 40 });
  onBusIcon.alignCenter();
  onBusIcon.addEffect('fadeIn', 0.3, 3.5);
  scene4.addChild(onBusIcon);

  // Divider with glow
  addDividerLine(scene4, 100, 1800, 0.1);

  // Vibrating effect on divider
  const vibrateBar1 = new FFRect({ color: COLORS.dividerWhite, width: 8, height: 100, x: width/2 - 3, y: 700 });
  vibrateBar1.addEffect('fadeIn', 0.1, 4);
  vibrateBar1.addEffect('fadeOut', 0.1, 4.2);
  scene4.addChild(vibrateBar1);

  const vibrateBar2 = new FFRect({ color: COLORS.dividerWhite, width: 8, height: 100, x: width/2 + 3, y: 700 });
  vibrateBar2.addEffect('fadeIn', 0.1, 4.3);
  vibrateBar2.addEffect('fadeOut', 0.1, 4.5);
  scene4.addChild(vibrateBar2);

  // Bottom text
  const momentText = new FFText({ text: 'THE PIVOTAL MOMENT', x: width/2, y: 1700, fontSize: 44 });
  momentText.setColor(COLORS.white);
  momentText.alignCenter();
  momentText.addEffect('fadeInUp', 0.5, 5);
  scene4.addChild(momentText);

  scene4.setTransition('slice', 0.5);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: The Bus Stop - The Moment (7s)'));

  // ============================================
  // SCENE 5: THE RIPPLE EFFECT - Consequences (7s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor('#000000');
  scene5.setDuration(7);

  addSplitBackground(scene5, 0);

  // Left - Bad day continues
  const badDayBg = new FFRect({ color: COLORS.sadBlue, width: 520, height: 1900, x: width/4, y: height/2 });
  badDayBg.addEffect('fadeIn', 0.3, 0.1);
  scene5.addChild(badDayBg);

  // Right - Good day continues
  const goodDayBg = new FFRect({ color: COLORS.warmOrange, width: 520, height: 1900, x: (width/4)*3, y: height/2 });
  goodDayBg.addEffect('fadeIn', 0.3, 0.1);
  scene5.addChild(goodDayBg);

  // Title
  const rippleTitle = new FFText({ text: 'THE RIPPLE EFFECT', x: width/2, y: 150, fontSize: 50 });
  rippleTitle.setColor(COLORS.white);
  rippleTitle.alignCenter();
  rippleTitle.addEffect('bounceIn', 0.5, 0.3);
  scene5.addChild(rippleTitle);

  // Timeline events - LEFT (bad)
  const badEvents = [
    { time: '8:30', event: 'Late to work', icon: '😓', y: 350 },
    { time: '9:00', event: 'Missed meeting', icon: '📉', y: 520 },
    { time: '12:00', event: 'Skipped lunch', icon: '🍽️', y: 690 },
    { time: '3:00', event: 'Boss angry', icon: '😤', y: 860 },
    { time: '6:00', event: 'Overtime', icon: '🌙', y: 1030 }
  ];

  badEvents.forEach((evt, i) => {
    const timeText = new FFText({ text: evt.time, x: 120, y: evt.y, fontSize: 28 });
    timeText.setColor(COLORS.icyBlue);
    timeText.addEffect('fadeInLeft', 0.3, 0.5 + (i * 0.3));
    scene5.addChild(timeText);

    const eventBox = new FFRect({ color: 'rgba(0,0,0,0.4)', width: 280, height: 70, x: 320, y: evt.y });
    eventBox.addEffect('fadeIn', 0.3, 0.6 + (i * 0.3));
    scene5.addChild(eventBox);

    const eventText = new FFText({ text: evt.event, x: 280, y: evt.y - 10, fontSize: 26 });
    eventText.setColor(COLORS.paleBlue);
    eventText.addEffect('fadeIn', 0.3, 0.7 + (i * 0.3));
    scene5.addChild(eventText);

    const iconText = new FFText({ text: evt.icon, x: 420, y: evt.y, fontSize: 35 });
    iconText.addEffect('bounceIn', 0.3, 0.8 + (i * 0.3));
    scene5.addChild(iconText);
  });

  // Timeline events - RIGHT (good)
  const goodEvents = [
    { time: '8:30', event: 'Early arrival', icon: '⭐', y: 350 },
    { time: '9:00', event: 'Nailed meeting', icon: '📈', y: 520 },
    { time: '12:00', event: 'Nice lunch', icon: '🥗', y: 690 },
    { time: '3:00', event: 'Promotion talk', icon: '🎉', y: 860 },
    { time: '6:00', event: 'Home early', icon: '🏠', y: 1030 }
  ];

  goodEvents.forEach((evt, i) => {
    const timeText = new FFText({ text: evt.time, x: 580, y: evt.y, fontSize: 28 });
    timeText.setColor(COLORS.goldenYellow);
    timeText.addEffect('fadeInRight', 0.3, 0.5 + (i * 0.3));
    scene5.addChild(timeText);

    const eventBox = new FFRect({ color: 'rgba(0,0,0,0.4)', width: 280, height: 70, x: 780, y: evt.y });
    eventBox.addEffect('fadeIn', 0.3, 0.6 + (i * 0.3));
    scene5.addChild(eventBox);

    const eventText = new FFText({ text: evt.event, x: 740, y: evt.y - 10, fontSize: 26 });
    eventText.setColor(COLORS.sunnyGold);
    eventText.addEffect('fadeIn', 0.3, 0.7 + (i * 0.3));
    scene5.addChild(eventText);

    const iconText = new FFText({ text: evt.icon, x: 880, y: evt.y, fontSize: 35 });
    iconText.addEffect('bounceIn', 0.3, 0.8 + (i * 0.3));
    scene5.addChild(iconText);
  });

  // Summary boxes
  const summaryLeft = new FFRect({ color: COLORS.missedRed, width: 400, height: 150, x: width/4, y: 1300 });
  summaryLeft.addEffect('zoomIn', 0.5, 3);
  scene5.addChild(summaryLeft);

  const summaryTextL1 = new FFText({ text: 'WORST DAY', x: width/4, y: 1270, fontSize: 36 });
  summaryTextL1.setColor(COLORS.white);
  summaryTextL1.alignCenter();
  summaryTextL1.addEffect('fadeIn', 0.3, 3.3);
  scene5.addChild(summaryTextL1);

  const summaryTextL2 = new FFText({ text: 'EVER', x: width/4, y: 1330, fontSize: 48 });
  summaryTextL2.setColor(COLORS.white);
  summaryTextL2.alignCenter();
  summaryTextL2.addEffect('bounceIn', 0.4, 3.5);
  scene5.addChild(summaryTextL2);

  const summaryRight = new FFRect({ color: COLORS.successGreen, width: 400, height: 150, x: (width/4)*3, y: 1300 });
  summaryRight.addEffect('zoomIn', 0.5, 3);
  scene5.addChild(summaryRight);

  const summaryTextR1 = new FFText({ text: 'BEST DAY', x: (width/4)*3, y: 1270, fontSize: 36 });
  summaryTextR1.setColor(COLORS.white);
  summaryTextR1.alignCenter();
  summaryTextR1.addEffect('fadeIn', 0.3, 3.3);
  scene5.addChild(summaryTextR1);

  const summaryTextR2 = new FFText({ text: 'EVER', x: (width/4)*3, y: 1330, fontSize: 48 });
  summaryTextR2.setColor(COLORS.white);
  summaryTextR2.alignCenter();
  summaryTextR2.addEffect('bounceIn', 0.4, 3.5);
  scene5.addChild(summaryTextR2);

  // Divider
  addDividerLine(scene5, 100, 1800, 0.1);

  // Bottom message
  const sameDay = new FFText({ text: 'SAME DAY. DIFFERENT CHOICES.', x: width/2, y: 1700, fontSize: 38 });
  sameDay.setColor(COLORS.white);
  sameDay.alignCenter();
  sameDay.addEffect('fadeInUp', 0.5, 5);
  scene5.addChild(sameDay);

  scene5.setTransition('directionalwarp', 0.5);
  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: The Ripple Effect - Consequences (7s)'));

  // ============================================
  // SCENE 6: THE EVENING - Reflection (6s)
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor('#000000');
  scene6.setDuration(6);

  addSplitBackground(scene6, 0);

  // Left - Exhausted at home
  const nightLeftBg = new FFRect({ color: '#0a1628', width: 520, height: 1900, x: width/4, y: height/2 });
  nightLeftBg.addEffect('fadeIn', 0.3, 0.1);
  scene6.addChild(nightLeftBg);

  // Right - Happy at home
  const nightRightBg = new FFRect({ color: '#2d1810', width: 520, height: 1900, x: (width/4)*3, y: height/2 });
  nightRightBg.addEffect('fadeIn', 0.3, 0.1);
  scene6.addChild(nightRightBg);

  // Time - Night
  const nightTime = new FFText({ text: '10:00 PM', x: width/2, y: 150, fontSize: 50 });
  nightTime.setColor(COLORS.white);
  nightTime.alignCenter();
  nightTime.addEffect('fadeIn', 0.4, 0.3);
  scene6.addChild(nightTime);

  // Moon/Stars
  const moonLeft = new FFText({ text: '🌑', x: width/4, y: 300, fontSize: 80 });
  moonLeft.alignCenter();
  moonLeft.addEffect('fadeIn', 0.5, 0.5);
  scene6.addChild(moonLeft);

  const moonRight = new FFText({ text: '🌕', x: (width/4)*3, y: 300, fontSize: 80 });
  moonRight.alignCenter();
  moonRight.addEffect('fadeIn', 0.5, 0.5);
  scene6.addChild(moonRight);

  // Person state - LEFT (exhausted)
  const personLeft = new FFText({ text: '😔', x: width/4, y: 500, fontSize: 120 });
  personLeft.alignCenter();
  personLeft.addEffect('fadeIn', 0.5, 0.8);
  scene6.addChild(personLeft);

  const stateLeft = new FFText({ text: 'Exhausted', x: width/4, y: 620, fontSize: 40 });
  stateLeft.setColor(COLORS.stormGray);
  stateLeft.alignCenter();
  stateLeft.addEffect('fadeIn', 0.4, 1);
  scene6.addChild(stateLeft);

  // Person state - RIGHT (happy)
  const personRight = new FFText({ text: '😄', x: (width/4)*3, y: 500, fontSize: 120 });
  personRight.alignCenter();
  personRight.addEffect('fadeIn', 0.5, 0.8);
  scene6.addChild(personRight);

  const stateRight = new FFText({ text: 'Fulfilled', x: (width/4)*3, y: 620, fontSize: 40 });
  stateRight.setColor(COLORS.goldenYellow);
  stateRight.alignCenter();
  stateRight.addEffect('fadeIn', 0.4, 1);
  scene6.addChild(stateRight);

  // Thought bubbles - LEFT
  const thoughtBubbleL = new FFRect({ color: 'rgba(255,255,255,0.1)', width: 400, height: 200, x: width/4, y: 850 });
  thoughtBubbleL.addEffect('fadeIn', 0.4, 1.5);
  scene6.addChild(thoughtBubbleL);

  const thoughtTextL1 = new FFText({ text: '"If only I had', x: width/4, y: 810, fontSize: 30 });
  thoughtTextL1.setColor(COLORS.paleBlue);
  thoughtTextL1.alignCenter();
  thoughtTextL1.addEffect('fadeIn', 0.3, 1.7);
  scene6.addChild(thoughtTextL1);

  const thoughtTextL2 = new FFText({ text: 'woken up earlier..."', x: width/4, y: 870, fontSize: 30 });
  thoughtTextL2.setColor(COLORS.paleBlue);
  thoughtTextL2.alignCenter();
  thoughtTextL2.addEffect('fadeIn', 0.3, 1.9);
  scene6.addChild(thoughtTextL2);

  // Thought bubbles - RIGHT
  const thoughtBubbleR = new FFRect({ color: 'rgba(255,255,255,0.1)', width: 400, height: 200, x: (width/4)*3, y: 850 });
  thoughtBubbleR.addEffect('fadeIn', 0.4, 1.5);
  scene6.addChild(thoughtBubbleR);

  const thoughtTextR1 = new FFText({ text: '"That extra 5 min', x: (width/4)*3, y: 810, fontSize: 30 });
  thoughtTextR1.setColor(COLORS.sunnyGold);
  thoughtTextR1.alignCenter();
  thoughtTextR1.addEffect('fadeIn', 0.3, 1.7);
  scene6.addChild(thoughtTextR1);

  const thoughtTextR2 = new FFText({ text: 'changed everything"', x: (width/4)*3, y: 870, fontSize: 30 });
  thoughtTextR2.setColor(COLORS.sunnyGold);
  thoughtTextR2.alignCenter();
  thoughtTextR2.addEffect('fadeIn', 0.3, 1.9);
  scene6.addChild(thoughtTextR2);

  // Tomorrow's alarm setting
  const alarmSetL = new FFRect({ color: COLORS.coldBlue, width: 350, height: 100, x: width/4, y: 1100 });
  alarmSetL.addEffect('fadeIn', 0.4, 2.5);
  scene6.addChild(alarmSetL);

  const alarmSetTextL = new FFText({ text: '⏰ Alarm: 6:30 AM', x: width/4, y: 1100, fontSize: 28 });
  alarmSetTextL.setColor(COLORS.paleBlue);
  alarmSetTextL.alignCenter();
  alarmSetTextL.addEffect('fadeIn', 0.3, 2.7);
  scene6.addChild(alarmSetTextL);

  const alarmSetR = new FFRect({ color: COLORS.cozyBrown, width: 350, height: 100, x: (width/4)*3, y: 1100 });
  alarmSetR.addEffect('fadeIn', 0.4, 2.5);
  scene6.addChild(alarmSetR);

  const alarmSetTextR = new FFText({ text: '⏰ Alarm: 7:00 AM', x: (width/4)*3, y: 1100, fontSize: 28 });
  alarmSetTextR.setColor(COLORS.sunnyGold);
  alarmSetTextR.alignCenter();
  alarmSetTextR.addEffect('fadeIn', 0.3, 2.7);
  scene6.addChild(alarmSetTextR);

  // Divider
  addDividerLine(scene6, 100, 1800, 0.1);

  // Bottom message
  const reflectMsg = new FFText({ text: 'SAME PERSON. DIFFERENT PATHS.', x: width/2, y: 1700, fontSize: 38 });
  reflectMsg.setColor(COLORS.white);
  reflectMsg.alignCenter();
  reflectMsg.addEffect('fadeInUp', 0.5, 4);
  scene6.addChild(reflectMsg);

  scene6.setTransition('fade', 0.6);
  creator.addChild(scene6);
  console.log(colors.green('  ✓ Scene 6: The Evening - Reflection (6s)'));

  // ============================================
  // SCENE 7: THE MESSAGE - Moral (6s)
  // ============================================
  const scene7 = new FFScene();
  scene7.setBgColor('#000000');
  scene7.setDuration(6);

  // Gradient merge background
  const mergeBg = new FFRect({ color: '#1a1a2e', width: 1100, height: 2000, x: width/2, y: height/2 });
  mergeBg.addEffect('fadeIn', 0.3, 0);
  scene7.addChild(mergeBg);

  // Split colors fading
  const fadeLeft = new FFRect({ color: COLORS.coldBg, width: 540, height: 1920, x: width/4, y: height/2 });
  fadeLeft.addEffect('fadeIn', 0.3, 0.1);
  fadeLeft.addEffect('fadeOut', 0.8, 2);
  scene7.addChild(fadeLeft);

  const fadeRight = new FFRect({ color: COLORS.warmBg, width: 540, height: 1920, x: (width/4)*3, y: height/2 });
  fadeRight.addEffect('fadeIn', 0.3, 0.1);
  fadeRight.addEffect('fadeOut', 0.8, 2);
  scene7.addChild(fadeRight);

  // Divider fading
  const fadeDivider = new FFRect({ color: COLORS.dividerWhite, width: 6, height: 1800, x: width/2, y: height/2 });
  fadeDivider.addEffect('fadeIn', 0.3, 0.1);
  fadeDivider.addEffect('fadeOut', 0.8, 2);
  scene7.addChild(fadeDivider);

  // Main message
  const msgBox = new FFRect({ color: 'rgba(255,255,255,0.1)', width: 900, height: 600, x: width/2, y: height/2 });
  msgBox.addEffect('zoomIn', 0.6, 2.5);
  scene7.addChild(msgBox);

  const msgLine1 = new FFText({ text: 'EVERY', x: width/2, y: height/2 - 200, fontSize: 60 });
  msgLine1.setColor(COLORS.white);
  msgLine1.alignCenter();
  msgLine1.addEffect('fadeIn', 0.4, 2.8);
  scene7.addChild(msgLine1);

  const msgLine2 = new FFText({ text: 'SMALL CHOICE', x: width/2, y: height/2 - 100, fontSize: 70 });
  msgLine2.setColor(COLORS.warmPeach);
  msgLine2.alignCenter();
  msgLine2.addEffect('bounceIn', 0.5, 3.1);
  scene7.addChild(msgLine2);

  const msgLine3 = new FFText({ text: 'CREATES A', x: width/2, y: height/2, fontSize: 50 });
  msgLine3.setColor(COLORS.lightGray);
  msgLine3.alignCenter();
  msgLine3.addEffect('fadeIn', 0.4, 3.5);
  scene7.addChild(msgLine3);

  const msgLine4 = new FFText({ text: 'DIFFERENT', x: width/2, y: height/2 + 100, fontSize: 80 });
  msgLine4.setColor(COLORS.icyBlue);
  msgLine4.alignCenter();
  msgLine4.addEffect('bounceIn', 0.5, 3.8);
  scene7.addChild(msgLine4);

  const msgLine5 = new FFText({ text: 'FUTURE', x: width/2, y: height/2 + 200, fontSize: 90 });
  msgLine5.setColor(COLORS.goldenYellow);
  msgLine5.alignCenter();
  msgLine5.addEffect('bounceIn', 0.6, 4.2);
  scene7.addChild(msgLine5);

  // Decorative elements
  const starLeft = new FFText({ text: '✨', x: 150, y: 400, fontSize: 50 });
  starLeft.addEffect('rotateIn', 0.5, 4.5);
  scene7.addChild(starLeft);

  const starRight = new FFText({ text: '✨', x: width - 150, y: 400, fontSize: 50 });
  starRight.addEffect('rotateIn', 0.5, 4.6);
  scene7.addChild(starRight);

  const starBottom = new FFText({ text: '⭐', x: width/2, y: 1500, fontSize: 60 });
  starBottom.alignCenter();
  starBottom.addEffect('bounceIn', 0.5, 4.8);
  scene7.addChild(starBottom);

  scene7.setTransition('crosswarp', 0.5);
  creator.addChild(scene7);
  console.log(colors.green('  ✓ Scene 7: The Message - Moral (6s)'));

  // ============================================
  // SCENE 8: CTA & END CARD (6s)
  // ============================================
  const scene8 = new FFScene();
  scene8.setBgColor('#0a0a0f');
  scene8.setDuration(6);

  // Background with subtle split
  const endBg = new FFRect({ color: '#0f0f1a', width: 1100, height: 2000, x: width/2, y: height/2 });
  endBg.addEffect('fadeIn', 0.3, 0);
  scene8.addChild(endBg);

  // Subtle color hints on sides
  const hintLeft = new FFRect({ color: 'rgba(65, 90, 119, 0.3)', width: 100, height: 1920, x: 50, y: height/2 });
  hintLeft.addEffect('fadeIn', 0.5, 0.2);
  scene8.addChild(hintLeft);

  const hintRight = new FFRect({ color: 'rgba(188, 108, 37, 0.3)', width: 100, height: 1920, x: width - 50, y: height/2 });
  hintRight.addEffect('fadeIn', 0.5, 0.2);
  scene8.addChild(hintRight);

  // Series title
  const seriesTitle = new FFText({ text: 'PARALLEL', x: width/2, y: 350, fontSize: 90 });
  seriesTitle.setColor(COLORS.icyBlue);
  seriesTitle.alignCenter();
  seriesTitle.addEffect('backInDown', 0.5, 0.3);
  scene8.addChild(seriesTitle);

  const seriesTitle2 = new FFText({ text: 'SPLIT', x: width/2, y: 460, fontSize: 100 });
  seriesTitle2.setColor(COLORS.goldenYellow);
  seriesTitle2.alignCenter();
  seriesTitle2.addEffect('backInDown', 0.5, 0.5);
  scene8.addChild(seriesTitle2);

  // Divider icon
  const dividerIcon = new FFRect({ color: COLORS.dividerWhite, width: 6, height: 150, x: width/2, y: 600 });
  dividerIcon.addEffect('zoomIn', 0.4, 0.8);
  scene8.addChild(dividerIcon);

  // Tagline
  const tagline = new FFText({ text: 'Two paths. One moment.', x: width/2, y: 750, fontSize: 36 });
  tagline.setColor(COLORS.lightGray);
  tagline.alignCenter();
  tagline.addEffect('fadeIn', 0.5, 1);
  scene8.addChild(tagline);

  // Hashtags
  const hashtags = new FFText({ text: '#ParallelSplit #Choices #Butterfly', x: width/2, y: 850, fontSize: 30 });
  hashtags.setColor(COLORS.warmPeach);
  hashtags.alignCenter();
  hashtags.addEffect('fadeIn', 0.4, 1.3);
  scene8.addChild(hashtags);

  // CTA Box
  const ctaBox = new FFRect({ color: COLORS.successGreen, width: 700, height: 180, x: width/2, y: 1050 });
  ctaBox.addEffect('zoomIn', 0.5, 1.6);
  scene8.addChild(ctaBox);

  const ctaText1 = new FFText({ text: '👆 FOLLOW FOR MORE', x: width/2, y: 1010, fontSize: 38 });
  ctaText1.setColor(COLORS.white);
  ctaText1.alignCenter();
  ctaText1.addEffect('bounceIn', 0.4, 1.9);
  scene8.addChild(ctaText1);

  const ctaText2 = new FFText({ text: 'VISUAL STORIES', x: width/2, y: 1080, fontSize: 46 });
  ctaText2.setColor(COLORS.darkText);
  ctaText2.alignCenter();
  ctaText2.addEffect('bounceIn', 0.4, 2.1);
  scene8.addChild(ctaText2);

  // Engagement icons
  const engageText = new FFText({ text: '❤️ LIKE  💬 COMMENT  🔄 SHARE', x: width/2, y: 1250, fontSize: 32 });
  engageText.setColor(COLORS.white);
  engageText.alignCenter();
  engageText.addEffect('fadeIn', 0.5, 2.5);
  scene8.addChild(engageText);

  // Question prompt
  const questionBox = new FFRect({ color: 'rgba(255,255,255,0.1)', width: 800, height: 150, x: width/2, y: 1450 });
  questionBox.addEffect('fadeIn', 0.4, 3);
  scene8.addChild(questionBox);

  const questionText = new FFText({ text: 'Which path would YOU take?', x: width/2, y: 1430, fontSize: 34 });
  questionText.setColor(COLORS.white);
  questionText.alignCenter();
  questionText.addEffect('fadeIn', 0.4, 3.3);
  scene8.addChild(questionText);

  const questionEmoji = new FFText({ text: '🤔', x: width/2, y: 1500, fontSize: 50 });
  questionEmoji.alignCenter();
  questionEmoji.addEffect('bounceIn', 0.4, 3.6);
  scene8.addChild(questionEmoji);

  // Story count
  const storyCount = new FFText({ text: 'STORY 9 OF 30', x: width/2, y: 1700, fontSize: 28 });
  storyCount.setColor(COLORS.lightGray);
  storyCount.alignCenter();
  storyCount.addEffect('fadeIn', 0.4, 4);
  scene8.addChild(storyCount);

  creator.addChild(scene8);
  console.log(colors.green('  ✓ Scene 8: CTA & End Card (6s)'));

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
    console.log(colors.magenta('\n🎬 Story 9: "Parallel Split" complete!\n'));
  });

  // Start rendering
  creator.start();
}

// Run the video creation
createParallelSplitVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

/**
 * 🎬 STORY 4: "Match-Cut Coffee" - Seamless Transition
 * 
 * The Story: A traveler takes a sip of coffee in a rainy London cafe 
 * and puts the cup down in a sunny Santorini balcony.
 * 
 * Visual Style:
 * - Dramatic color grade shift: cool blues (London) → warm oranges (Santorini)
 * - Match Cutting with perfect cup alignment
 * - Luma Fading and Speed Ramping effects
 * - "Location Tag" UI that flips like airport departure board
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~50 seconds
 * 
 * Run with: node examples/story-videos/story-04-matchcut-coffee.js
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
// COLOR PALETTES - London vs Santorini
// ============================================
const LONDON = {
  // Cool, rainy blues
  darkBlue: '#1a2634',
  stormBlue: '#2c3e50',
  rainGray: '#5d6d7e',
  coldWhite: '#d5dbdb',
  mistBlue: '#85929e',
  wetBlack: '#17202a',
  
  // Accent
  umbrellaRed: '#c0392b',
  cafeWarm: '#6d4c41'
};

const SANTORINI = {
  // Warm, sunny oranges
  sunOrange: '#f39c12',
  warmGold: '#f1c40f',
  terracotta: '#e67e22',
  whiteWash: '#fdfefe',
  skyBlue: '#5dade2',
  deepBlue: '#2980b9',
  
  // Accent
  bougainvillea: '#9b59b6',
  seaGreen: '#1abc9c'
};

const UI = {
  // Departure board colors
  boardBlack: '#0a0a0a',
  boardYellow: '#f4d03f',
  boardWhite: '#ffffff',
  boardGray: '#2c2c2c'
};

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createMatchCutCoffeeVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 4: "Match-Cut Coffee"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~50 seconds'));
  console.log(colors.yellow('🎨 Theme: Seamless Transition - London to Santorini\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-04-matchcut-coffee.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: DEPARTURE BOARD INTRO (4s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(UI.boardBlack);
  scene1.setDuration(4);

  // Airport departure board background
  const boardBg = new FFRect({ color: UI.boardGray, width: 950, height: 600, x: width/2, y: height/2 - 200 });
  boardBg.addEffect('fadeIn', 0.4, 0.1);
  scene1.addChild(boardBg);

  // Board header
  const headerBar = new FFRect({ color: UI.boardYellow, width: 950, height: 80, x: width/2, y: height/2 - 450 });
  headerBar.addEffect('fadeIn', 0.3, 0.2);
  scene1.addChild(headerBar);

  const headerText = new FFText({ text: '✈ DEPARTURES', x: width/2, y: height/2 - 450, fontSize: 48 });
  headerText.setColor(UI.boardBlack);
  headerText.alignCenter();
  headerText.addEffect('fadeIn', 0.3, 0.3);
  scene1.addChild(headerText);

  // Flight row 1 - London
  const row1Bg = new FFRect({ color: UI.boardBlack, width: 900, height: 100, x: width/2, y: height/2 - 300 });
  row1Bg.addEffect('fadeIn', 0.3, 0.5);
  scene1.addChild(row1Bg);

  const londonCode = new FFText({ text: 'LHR', x: 250, y: height/2 - 300, fontSize: 56 });
  londonCode.setColor(UI.boardYellow);
  londonCode.addEffect('fadeIn', 0.3, 0.6);
  scene1.addChild(londonCode);

  const londonCity = new FFText({ text: 'LONDON', x: 550, y: height/2 - 300, fontSize: 48 });
  londonCity.setColor(UI.boardWhite);
  londonCity.addEffect('fadeIn', 0.3, 0.7);
  scene1.addChild(londonCity);

  const arrow1 = new FFText({ text: '→', x: 780, y: height/2 - 300, fontSize: 50 });
  arrow1.setColor(UI.boardYellow);
  arrow1.addEffect('fadeIn', 0.3, 0.8);
  scene1.addChild(arrow1);

  // Flight row 2 - Santorini
  const row2Bg = new FFRect({ color: UI.boardBlack, width: 900, height: 100, x: width/2, y: height/2 - 150 });
  row2Bg.addEffect('fadeIn', 0.3, 0.9);
  scene1.addChild(row2Bg);

  const santoriniCode = new FFText({ text: 'JTR', x: 250, y: height/2 - 150, fontSize: 56 });
  santoriniCode.setColor(UI.boardYellow);
  santoriniCode.addEffect('fadeIn', 0.3, 1);
  scene1.addChild(santoriniCode);

  const santoriniCity = new FFText({ text: 'SANTORINI', x: 580, y: height/2 - 150, fontSize: 48 });
  santoriniCity.setColor(UI.boardWhite);
  santoriniCity.addEffect('fadeIn', 0.3, 1.1);
  scene1.addChild(santoriniCity);

  // Status
  const statusBox = new FFRect({ color: SANTORINI.sunOrange, width: 200, height: 60, x: 850, y: height/2 - 150 });
  statusBox.addEffect('bounceIn', 0.4, 1.3);
  scene1.addChild(statusBox);

  const statusText = new FFText({ text: 'NOW', x: 850, y: height/2 - 150, fontSize: 36 });
  statusText.setColor(UI.boardBlack);
  statusText.alignCenter();
  statusText.addEffect('fadeIn', 0.2, 1.4);
  scene1.addChild(statusText);

  // Title below board
  const titleText = new FFText({ text: 'MATCH-CUT', x: width/2, y: height/2 + 150, fontSize: 100 });
  titleText.setColor(UI.boardWhite);
  titleText.alignCenter();
  titleText.addEffect('bounceIn', 0.6, 1.8);
  scene1.addChild(titleText);

  const subtitleText = new FFText({ text: 'COFFEE', x: width/2, y: height/2 + 280, fontSize: 120 });
  subtitleText.setColor(UI.boardYellow);
  subtitleText.alignCenter();
  subtitleText.addEffect('bounceIn', 0.6, 2.1);
  scene1.addChild(subtitleText);

  // Coffee cup icon
  const coffeeIcon = new FFText({ text: '☕', x: width/2, y: height/2 + 450, fontSize: 100 });
  coffeeIcon.alignCenter();
  coffeeIcon.addEffect('zoomIn', 0.5, 2.5);
  scene1.addChild(coffeeIcon);

  scene1.setTransition('fade', 0.6);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Departure Board Intro (4s)'));

  // ============================================
  // SCENE 2: LONDON - Rainy Cafe (6s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(LONDON.darkBlue);
  scene2.setDuration(6);

  // Rainy London atmosphere
  const londonBg = new FFRect({ color: LONDON.stormBlue, width: 1100, height: 2000, x: width/2, y: height/2 });
  londonBg.addEffect('fadeIn', 0.4, 0);
  scene2.addChild(londonBg);

  // Rain streaks
  for (let i = 0; i < 30; i++) {
    const rain = new FFRect({ 
      color: LONDON.mistBlue, 
      width: 2, 
      height: 40 + Math.random() * 60, 
      x: Math.random() * width, 
      y: Math.random() * height 
    });
    rain.addEffect('fadeInDown', 0.3, Math.random() * 1.5);
    scene2.addChild(rain);
  }

  // Location tag - London style
  const locationTagBg = new FFRect({ color: UI.boardBlack, width: 400, height: 120, x: width/2, y: 200 });
  locationTagBg.addEffect('fadeInDown', 0.4, 0.3);
  scene2.addChild(locationTagBg);

  const locationIcon = new FFText({ text: '📍', x: 380, y: 200, fontSize: 40 });
  locationIcon.addEffect('fadeIn', 0.3, 0.5);
  scene2.addChild(locationIcon);

  const locationText = new FFText({ text: 'LONDON, UK', x: 600, y: 200, fontSize: 42 });
  locationText.setColor(UI.boardWhite);
  locationText.addEffect('fadeIn', 0.3, 0.6);
  scene2.addChild(locationText);

  // Weather indicator
  const weatherBox = new FFRect({ color: LONDON.rainGray, width: 180, height: 50, x: width/2, y: 290 });
  weatherBox.addEffect('fadeIn', 0.3, 0.8);
  scene2.addChild(weatherBox);

  const weatherText = new FFText({ text: '🌧 12°C', x: width/2, y: 290, fontSize: 28 });
  weatherText.setColor(UI.boardWhite);
  weatherText.alignCenter();
  weatherText.addEffect('fadeIn', 0.2, 0.9);
  scene2.addChild(weatherText);

  // Cafe window frame
  const windowFrame = new FFRect({ color: LONDON.wetBlack, width: 900, height: 800, x: width/2, y: 750 });
  windowFrame.addEffect('fadeIn', 0.5, 0.5);
  scene2.addChild(windowFrame);

  const windowInner = new FFRect({ color: LONDON.cafeWarm, width: 850, height: 750, x: width/2, y: 750 });
  windowInner.addEffect('fadeIn', 0.4, 0.6);
  scene2.addChild(windowInner);

  // Coffee cup - THE MATCH CUT ELEMENT
  const cupSaucer = new FFRect({ color: LONDON.coldWhite, width: 200, height: 30, x: width/2, y: 900 });
  cupSaucer.addEffect('zoomIn', 0.5, 1);
  scene2.addChild(cupSaucer);

  const cupBody = new FFRect({ color: LONDON.coldWhite, width: 140, height: 120, x: width/2, y: 820 });
  cupBody.addEffect('zoomIn', 0.5, 1.1);
  scene2.addChild(cupBody);

  const coffeeInCup = new FFRect({ color: LONDON.cafeWarm, width: 120, height: 80, x: width/2, y: 800 });
  coffeeInCup.addEffect('fadeIn', 0.3, 1.3);
  scene2.addChild(coffeeInCup);

  // Steam effect
  const steam1 = new FFText({ text: '~', x: width/2 - 30, y: 720, fontSize: 40 });
  steam1.setColor(LONDON.mistBlue);
  steam1.addEffect('fadeInUp', 0.5, 1.5);
  scene2.addChild(steam1);

  const steam2 = new FFText({ text: '~', x: width/2 + 30, y: 700, fontSize: 35 });
  steam2.setColor(LONDON.mistBlue);
  steam2.addEffect('fadeInUp', 0.5, 1.7);
  scene2.addChild(steam2);

  // Narrative text
  const narrativeBox = new FFRect({ color: 'rgba(0,0,0,0.8)', width: 900, height: 200, x: width/2, y: 1300 });
  narrativeBox.addEffect('fadeIn', 0.4, 2);
  scene2.addChild(narrativeBox);

  const narr1 = new FFText({ text: 'A RAINY MORNING', x: width/2, y: 1260, fontSize: 50 });
  narr1.setColor(LONDON.coldWhite);
  narr1.alignCenter();
  narr1.addEffect('fadeIn', 0.4, 2.2);
  scene2.addChild(narr1);

  const narr2 = new FFText({ text: 'IN A LONDON CAFE', x: width/2, y: 1340, fontSize: 48 });
  narr2.setColor(LONDON.mistBlue);
  narr2.alignCenter();
  narr2.addEffect('fadeInUp', 0.4, 2.5);
  scene2.addChild(narr2);

  // Time indicator
  const timeText = new FFText({ text: '8:47 AM', x: width/2, y: 1550, fontSize: 36 });
  timeText.setColor(LONDON.rainGray);
  timeText.alignCenter();
  timeText.addEffect('fadeIn', 0.3, 3);
  scene2.addChild(timeText);

  scene2.setTransition('directionalwarp', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: London - Rainy Cafe (6s)'));

  // ============================================
  // SCENE 3: THE SIP - Slow Motion (4s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(LONDON.darkBlue);
  scene3.setDuration(4);

  // London atmosphere continues
  const londonBg3 = new FFRect({ color: LONDON.stormBlue, width: 1100, height: 2000, x: width/2, y: height/2 });
  londonBg3.addEffect('fadeIn', 0.2, 0);
  scene3.addChild(londonBg3);

  // Dramatic text
  const sipText = new FFText({ text: 'ONE', x: width/2, y: 350, fontSize: 120 });
  sipText.setColor(LONDON.coldWhite);
  sipText.alignCenter();
  sipText.addEffect('bounceIn', 0.5, 0.2);
  scene3.addChild(sipText);

  const sipText2 = new FFText({ text: 'SIP', x: width/2, y: 500, fontSize: 160 });
  sipText2.setColor(UI.boardYellow);
  sipText2.alignCenter();
  sipText2.addEffect('bounceIn', 0.6, 0.5);
  scene3.addChild(sipText2);

  // Coffee cup rising (simulating lift)
  const cupRising = new FFRect({ color: LONDON.coldWhite, width: 160, height: 140, x: width/2, y: 850 });
  cupRising.addEffect('fadeInUp', 0.8, 0.8);
  scene3.addChild(cupRising);

  const coffeeRising = new FFRect({ color: LONDON.cafeWarm, width: 140, height: 100, x: width/2, y: 830 });
  coffeeRising.addEffect('fadeInUp', 0.8, 0.9);
  scene3.addChild(coffeeRising);

  // Speed ramp indicator
  const speedBox = new FFRect({ color: 'rgba(0,0,0,0.9)', width: 300, height: 80, x: width/2, y: 1100 });
  speedBox.addEffect('zoomIn', 0.4, 1.5);
  scene3.addChild(speedBox);

  const speedText = new FFText({ text: '⏱ 0.5x SPEED', x: width/2, y: 1100, fontSize: 32 });
  speedText.setColor(UI.boardYellow);
  speedText.alignCenter();
  speedText.addEffect('fadeIn', 0.3, 1.7);
  scene3.addChild(speedText);

  // Transition hint
  const transitionHint = new FFText({ text: 'MATCH CUT IN...', x: width/2, y: 1350, fontSize: 44 });
  transitionHint.setColor(LONDON.mistBlue);
  transitionHint.alignCenter();
  transitionHint.addEffect('fadeIn', 0.4, 2);
  scene3.addChild(transitionHint);

  // Countdown
  const countdown = new FFText({ text: '3...2...1', x: width/2, y: 1450, fontSize: 60 });
  countdown.setColor(UI.boardWhite);
  countdown.alignCenter();
  countdown.addEffect('bounceIn', 0.5, 2.5);
  scene3.addChild(countdown);

  scene3.setTransition('windowslice', 0.4);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: The Sip - Slow Motion (4s)'));

  // ============================================
  // SCENE 4: THE MATCH CUT - Location Flip (5s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(UI.boardBlack);
  scene4.setDuration(5);

  // Split screen effect - London fading, Santorini appearing
  // Left side - London (fading)
  const londonHalf = new FFRect({ color: LONDON.stormBlue, width: 550, height: 1000, x: 275, y: height/2 });
  londonHalf.addEffect('fadeIn', 0.3, 0);
  londonHalf.addEffect('fadeOut', 0.8, 1.5);
  scene4.addChild(londonHalf);

  // Right side - Santorini (appearing)
  const santoriniHalf = new FFRect({ color: SANTORINI.skyBlue, width: 550, height: 1000, x: width - 275, y: height/2 });
  santoriniHalf.addEffect('fadeIn', 0.8, 0.8);
  scene4.addChild(santoriniHalf);

  // Center divider line
  const divider = new FFRect({ color: UI.boardYellow, width: 8, height: 1000, x: width/2, y: height/2 });
  divider.addEffect('zoomIn', 0.4, 0.3);
  divider.addEffect('fadeOut', 0.5, 2);
  scene4.addChild(divider);

  // DEPARTURE BOARD FLIP ANIMATION
  const flipBoardBg = new FFRect({ color: UI.boardBlack, width: 700, height: 200, x: width/2, y: 300 });
  flipBoardBg.addEffect('fadeIn', 0.3, 0.2);
  scene4.addChild(flipBoardBg);

  // London text (flipping out)
  const londonFlip = new FFText({ text: 'LONDON', x: width/2, y: 280, fontSize: 70 });
  londonFlip.setColor(UI.boardWhite);
  londonFlip.alignCenter();
  londonFlip.addEffect('fadeIn', 0.2, 0.3);
  londonFlip.addEffect('fadeOut', 0.3, 1);
  scene4.addChild(londonFlip);

  const lhrFlip = new FFText({ text: 'LHR', x: width/2, y: 360, fontSize: 50 });
  lhrFlip.setColor(UI.boardYellow);
  lhrFlip.alignCenter();
  lhrFlip.addEffect('fadeIn', 0.2, 0.4);
  lhrFlip.addEffect('fadeOut', 0.3, 1);
  scene4.addChild(lhrFlip);

  // Santorini text (flipping in)
  const santoriniFlip = new FFText({ text: 'SANTORINI', x: width/2, y: 280, fontSize: 70 });
  santoriniFlip.setColor(UI.boardWhite);
  santoriniFlip.alignCenter();
  santoriniFlip.addEffect('fadeIn', 0.4, 1.3);
  scene4.addChild(santoriniFlip);

  const jtrFlip = new FFText({ text: 'JTR', x: width/2, y: 360, fontSize: 50 });
  jtrFlip.setColor(SANTORINI.sunOrange);
  jtrFlip.alignCenter();
  jtrFlip.addEffect('fadeIn', 0.4, 1.5);
  scene4.addChild(jtrFlip);

  // THE COFFEE CUP - Center (the match cut element)
  const matchCupSaucer = new FFRect({ color: UI.boardWhite, width: 220, height: 35, x: width/2, y: height/2 + 100 });
  matchCupSaucer.addEffect('zoomIn', 0.5, 0.5);
  scene4.addChild(matchCupSaucer);

  const matchCupBody = new FFRect({ color: UI.boardWhite, width: 160, height: 140, x: width/2, y: height/2 });
  matchCupBody.addEffect('zoomIn', 0.5, 0.6);
  scene4.addChild(matchCupBody);

  const matchCoffee = new FFRect({ color: LONDON.cafeWarm, width: 140, height: 100, x: width/2, y: height/2 - 20 });
  matchCoffee.addEffect('fadeIn', 0.4, 0.8);
  scene4.addChild(matchCoffee);

  // Match cut label
  const matchLabel = new FFRect({ color: SANTORINI.sunOrange, width: 350, height: 80, x: width/2, y: height/2 + 250 });
  matchLabel.addEffect('bounceIn', 0.5, 2);
  scene4.addChild(matchLabel);

  const matchText = new FFText({ text: '✂ MATCH CUT', x: width/2, y: height/2 + 250, fontSize: 40 });
  matchText.setColor(UI.boardBlack);
  matchText.alignCenter();
  matchText.addEffect('fadeIn', 0.3, 2.2);
  scene4.addChild(matchText);

  // Color grade shift indicator
  const gradeShift = new FFText({ text: 'COLOR GRADE SHIFT', x: width/2, y: height/2 + 400, fontSize: 36 });
  gradeShift.setColor(UI.boardWhite);
  gradeShift.alignCenter();
  gradeShift.addEffect('fadeIn', 0.4, 2.8);
  scene4.addChild(gradeShift);

  // Color bars showing transition
  const coldBar = new FFRect({ color: LONDON.stormBlue, width: 200, height: 40, x: 350, y: height/2 + 500 });
  coldBar.addEffect('fadeInLeft', 0.4, 3);
  scene4.addChild(coldBar);

  const arrow = new FFText({ text: '→', x: width/2, y: height/2 + 500, fontSize: 40 });
  arrow.setColor(UI.boardWhite);
  arrow.alignCenter();
  arrow.addEffect('fadeIn', 0.3, 3.2);
  scene4.addChild(arrow);

  const warmBar = new FFRect({ color: SANTORINI.sunOrange, width: 200, height: 40, x: 730, y: height/2 + 500 });
  warmBar.addEffect('fadeInRight', 0.4, 3.4);
  scene4.addChild(warmBar);

  scene4.setTransition('colorphase', 0.6);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: The Match Cut - Location Flip (5s)'));

  // ============================================
  // SCENE 5: SANTORINI - Sunny Balcony (6s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(SANTORINI.skyBlue);
  scene5.setDuration(6);

  // Sunny Santorini atmosphere
  const santoriniBg = new FFRect({ color: SANTORINI.skyBlue, width: 1100, height: 1200, x: width/2, y: 500 });
  santoriniBg.addEffect('fadeIn', 0.4, 0);
  scene5.addChild(santoriniBg);

  // Sun
  const sun = new FFRect({ color: SANTORINI.warmGold, width: 150, height: 150, x: 200, y: 250 });
  sun.addEffect('zoomIn', 0.6, 0.2);
  scene5.addChild(sun);

  // Sun rays
  for (let i = 0; i < 8; i++) {
    const ray = new FFRect({ 
      color: SANTORINI.sunOrange, 
      width: 8, 
      height: 80, 
      x: 200 + Math.cos(i * Math.PI / 4) * 120, 
      y: 250 + Math.sin(i * Math.PI / 4) * 120 
    });
    ray.addEffect('fadeIn', 0.3, 0.4 + (i * 0.05));
    scene5.addChild(ray);
  }

  // Location tag - Santorini style
  const locationTagBg5 = new FFRect({ color: SANTORINI.deepBlue, width: 450, height: 120, x: width/2, y: 200 });
  locationTagBg5.addEffect('fadeInDown', 0.4, 0.3);
  scene5.addChild(locationTagBg5);

  const locationIcon5 = new FFText({ text: '📍', x: 360, y: 200, fontSize: 40 });
  locationIcon5.addEffect('fadeIn', 0.3, 0.5);
  scene5.addChild(locationIcon5);

  const locationText5 = new FFText({ text: 'SANTORINI, GR', x: 600, y: 200, fontSize: 42 });
  locationText5.setColor(SANTORINI.whiteWash);
  locationText5.addEffect('fadeIn', 0.3, 0.6);
  scene5.addChild(locationText5);

  // Weather indicator
  const weatherBox5 = new FFRect({ color: SANTORINI.sunOrange, width: 180, height: 50, x: width/2, y: 290 });
  weatherBox5.addEffect('fadeIn', 0.3, 0.8);
  scene5.addChild(weatherBox5);

  const weatherText5 = new FFText({ text: '☀ 28°C', x: width/2, y: 290, fontSize: 28 });
  weatherText5.setColor(UI.boardBlack);
  weatherText5.alignCenter();
  weatherText5.addEffect('fadeIn', 0.2, 0.9);
  scene5.addChild(weatherText5);

  // Whitewashed balcony
  const balcony = new FFRect({ color: SANTORINI.whiteWash, width: 1000, height: 600, x: width/2, y: 900 });
  balcony.addEffect('fadeIn', 0.5, 0.5);
  scene5.addChild(balcony);

  // Balcony railing
  const railing = new FFRect({ color: SANTORINI.deepBlue, width: 900, height: 20, x: width/2, y: 650 });
  railing.addEffect('fadeIn', 0.4, 0.7);
  scene5.addChild(railing);

  // Sea view
  const seaView = new FFRect({ color: SANTORINI.seaGreen, width: 800, height: 150, x: width/2, y: 550 });
  seaView.addEffect('fadeIn', 0.4, 0.6);
  scene5.addChild(seaView);

  // Coffee cup - SAME POSITION (match cut)
  const cupSaucer5 = new FFRect({ color: SANTORINI.whiteWash, width: 200, height: 30, x: width/2, y: 900 });
  cupSaucer5.addEffect('zoomIn', 0.5, 1);
  scene5.addChild(cupSaucer5);

  const cupBody5 = new FFRect({ color: SANTORINI.whiteWash, width: 140, height: 120, x: width/2, y: 820 });
  cupBody5.addEffect('zoomIn', 0.5, 1.1);
  scene5.addChild(cupBody5);

  const coffeeInCup5 = new FFRect({ color: LONDON.cafeWarm, width: 120, height: 80, x: width/2, y: 800 });
  coffeeInCup5.addEffect('fadeIn', 0.3, 1.3);
  scene5.addChild(coffeeInCup5);

  // Bougainvillea decoration
  const flower1 = new FFRect({ color: SANTORINI.bougainvillea, width: 60, height: 60, x: 150, y: 700 });
  flower1.addEffect('bounceIn', 0.4, 1.5);
  scene5.addChild(flower1);

  const flower2 = new FFRect({ color: SANTORINI.bougainvillea, width: 50, height: 50, x: 200, y: 750 });
  flower2.addEffect('bounceIn', 0.4, 1.6);
  scene5.addChild(flower2);

  const flower3 = new FFRect({ color: SANTORINI.bougainvillea, width: 55, height: 55, x: 130, y: 780 });
  flower3.addEffect('bounceIn', 0.4, 1.7);
  scene5.addChild(flower3);

  // Narrative text
  const narrativeBox5 = new FFRect({ color: 'rgba(0,0,0,0.7)', width: 900, height: 200, x: width/2, y: 1300 });
  narrativeBox5.addEffect('fadeIn', 0.4, 2);
  scene5.addChild(narrativeBox5);

  const narr5_1 = new FFText({ text: 'A SUNNY AFTERNOON', x: width/2, y: 1260, fontSize: 50 });
  narr5_1.setColor(SANTORINI.warmGold);
  narr5_1.alignCenter();
  narr5_1.addEffect('fadeIn', 0.4, 2.2);
  scene5.addChild(narr5_1);

  const narr5_2 = new FFText({ text: 'ON A GREEK BALCONY', x: width/2, y: 1340, fontSize: 48 });
  narr5_2.setColor(SANTORINI.whiteWash);
  narr5_2.alignCenter();
  narr5_2.addEffect('fadeInUp', 0.4, 2.5);
  scene5.addChild(narr5_2);

  // Time indicator
  const timeText5 = new FFText({ text: '4:23 PM', x: width/2, y: 1550, fontSize: 36 });
  timeText5.setColor(SANTORINI.sunOrange);
  timeText5.alignCenter();
  timeText5.addEffect('fadeIn', 0.3, 3);
  scene5.addChild(timeText5);

  scene5.setTransition('dreamy', 0.6);
  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Santorini - Sunny Balcony (6s)'));

  // ============================================
  // SCENE 6: THE TECHNIQUE BREAKDOWN (5s)
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor(UI.boardBlack);
  scene6.setDuration(5);

  // Title
  const techTitle = new FFText({ text: 'THE TECHNIQUE', x: width/2, y: 250, fontSize: 70 });
  techTitle.setColor(UI.boardWhite);
  techTitle.alignCenter();
  techTitle.addEffect('backInDown', 0.5, 0.2);
  scene6.addChild(techTitle);

  // Technique boxes
  const techniques = [
    { name: 'MATCH CUTTING', desc: 'Perfect cup alignment', color: SANTORINI.sunOrange, y: 450 },
    { name: 'LUMA FADING', desc: 'Brightness transition', color: SANTORINI.deepBlue, y: 650 },
    { name: 'SPEED RAMPING', desc: 'Slow → Fast motion', color: SANTORINI.bougainvillea, y: 850 },
    { name: 'COLOR GRADE', desc: 'Cool → Warm shift', color: SANTORINI.seaGreen, y: 1050 }
  ];

  techniques.forEach((tech, i) => {
    const box = new FFRect({ color: tech.color, width: 800, height: 140, x: width/2, y: tech.y });
    box.addEffect('fadeInLeft', 0.4, 0.5 + (i * 0.3));
    scene6.addChild(box);

    const name = new FFText({ text: tech.name, x: width/2, y: tech.y - 25, fontSize: 44 });
    name.setColor(UI.boardBlack);
    name.alignCenter();
    name.addEffect('fadeIn', 0.3, 0.7 + (i * 0.3));
    scene6.addChild(name);

    const desc = new FFText({ text: tech.desc, x: width/2, y: tech.y + 30, fontSize: 32 });
    desc.setColor(UI.boardWhite);
    desc.alignCenter();
    desc.addEffect('fadeIn', 0.3, 0.8 + (i * 0.3));
    scene6.addChild(desc);
  });

  // Bottom message
  const bottomMsg = new FFText({ text: 'SEAMLESS STORYTELLING', x: width/2, y: 1300, fontSize: 48 });
  bottomMsg.setColor(UI.boardYellow);
  bottomMsg.alignCenter();
  bottomMsg.addEffect('bounceIn', 0.5, 2.5);
  scene6.addChild(bottomMsg);

  scene6.setTransition('windowshades', 0.5);
  creator.addChild(scene6);
  console.log(colors.green('  ✓ Scene 6: The Technique Breakdown (5s)'));

  // ============================================
  // SCENE 7: SAME CUP, DIFFERENT WORLD (5s)
  // ============================================
  const scene7 = new FFScene();
  scene7.setBgColor(UI.boardBlack);
  scene7.setDuration(5);

  // Split comparison
  // London side
  const londonSide = new FFRect({ color: LONDON.stormBlue, width: 500, height: 800, x: 280, y: 700 });
  londonSide.addEffect('fadeInLeft', 0.5, 0.2);
  scene7.addChild(londonSide);

  const londonLabel = new FFText({ text: 'LONDON', x: 280, y: 380, fontSize: 50 });
  londonLabel.setColor(LONDON.coldWhite);
  londonLabel.alignCenter();
  londonLabel.addEffect('fadeIn', 0.3, 0.5);
  scene7.addChild(londonLabel);

  // Rain on London side
  for (let i = 0; i < 10; i++) {
    const rain = new FFRect({ color: LONDON.mistBlue, width: 2, height: 30, x: 100 + Math.random() * 360, y: 500 + Math.random() * 400 });
    rain.addEffect('fadeIn', 0.2, 0.6 + (i * 0.05));
    scene7.addChild(rain);
  }

  // Santorini side
  const santoriniSide = new FFRect({ color: SANTORINI.skyBlue, width: 500, height: 800, x: width - 280, y: 700 });
  santoriniSide.addEffect('fadeInRight', 0.5, 0.2);
  scene7.addChild(santoriniSide);

  const santoriniLabel = new FFText({ text: 'SANTORINI', x: width - 280, y: 380, fontSize: 50 });
  santoriniLabel.setColor(SANTORINI.whiteWash);
  santoriniLabel.alignCenter();
  santoriniLabel.addEffect('fadeIn', 0.3, 0.5);
  scene7.addChild(santoriniLabel);

  // Sun on Santorini side
  const miniSun = new FFRect({ color: SANTORINI.warmGold, width: 80, height: 80, x: width - 180, y: 500 });
  miniSun.addEffect('zoomIn', 0.4, 0.7);
  scene7.addChild(miniSun);

  // Center coffee cup (the constant)
  const centerCupBg = new FFRect({ color: UI.boardBlack, width: 250, height: 300, x: width/2, y: 700 });
  centerCupBg.addEffect('zoomIn', 0.5, 1);
  scene7.addChild(centerCupBg);

  const centerSaucer = new FFRect({ color: UI.boardWhite, width: 180, height: 25, x: width/2, y: 780 });
  centerSaucer.addEffect('zoomIn', 0.4, 1.2);
  scene7.addChild(centerSaucer);

  const centerCup = new FFRect({ color: UI.boardWhite, width: 130, height: 110, x: width/2, y: 700 });
  centerCup.addEffect('zoomIn', 0.4, 1.3);
  scene7.addChild(centerCup);

  const centerCoffee = new FFRect({ color: LONDON.cafeWarm, width: 110, height: 70, x: width/2, y: 680 });
  centerCoffee.addEffect('fadeIn', 0.3, 1.5);
  scene7.addChild(centerCoffee);

  // Title
  const sameText = new FFText({ text: 'SAME CUP', x: width/2, y: 200, fontSize: 80 });
  sameText.setColor(UI.boardWhite);
  sameText.alignCenter();
  sameText.addEffect('bounceIn', 0.5, 0.3);
  scene7.addChild(sameText);

  const diffText = new FFText({ text: 'DIFFERENT WORLD', x: width/2, y: 300, fontSize: 70 });
  diffText.setColor(UI.boardYellow);
  diffText.alignCenter();
  diffText.addEffect('bounceIn', 0.5, 0.6);
  scene7.addChild(diffText);

  // Temperature comparison
  const tempLondon = new FFText({ text: '🌧 12°C', x: 280, y: 1000, fontSize: 36 });
  tempLondon.setColor(LONDON.coldWhite);
  tempLondon.alignCenter();
  tempLondon.addEffect('fadeIn', 0.3, 2);
  scene7.addChild(tempLondon);

  const tempSantorini = new FFText({ text: '☀ 28°C', x: width - 280, y: 1000, fontSize: 36 });
  tempSantorini.setColor(SANTORINI.warmGold);
  tempSantorini.alignCenter();
  tempSantorini.addEffect('fadeIn', 0.3, 2.2);
  scene7.addChild(tempSantorini);

  // Message
  const message = new FFText({ text: 'ONE EDIT CHANGES EVERYTHING', x: width/2, y: 1250, fontSize: 44 });
  message.setColor(UI.boardWhite);
  message.alignCenter();
  message.addEffect('fadeInUp', 0.5, 2.8);
  scene7.addChild(message);

  scene7.setTransition('crosswarp', 0.5);
  creator.addChild(scene7);
  console.log(colors.green('  ✓ Scene 7: Same Cup, Different World (5s)'));

  // ============================================
  // SCENE 8: FINAL DEPARTURE BOARD (5s)
  // ============================================
  const scene8 = new FFScene();
  scene8.setBgColor(UI.boardBlack);
  scene8.setDuration(5);

  // Final departure board
  const finalBoardBg = new FFRect({ color: UI.boardGray, width: 950, height: 500, x: width/2, y: 500 });
  finalBoardBg.addEffect('fadeIn', 0.4, 0.1);
  scene8.addChild(finalBoardBg);

  // Header
  const finalHeader = new FFRect({ color: UI.boardYellow, width: 950, height: 80, x: width/2, y: 300 });
  finalHeader.addEffect('fadeIn', 0.3, 0.2);
  scene8.addChild(finalHeader);

  const finalHeaderText = new FFText({ text: '✈ JOURNEY COMPLETE', x: width/2, y: 300, fontSize: 44 });
  finalHeaderText.setColor(UI.boardBlack);
  finalHeaderText.alignCenter();
  finalHeaderText.addEffect('fadeIn', 0.3, 0.3);
  scene8.addChild(finalHeaderText);

  // Route display
  const routeRow = new FFRect({ color: UI.boardBlack, width: 900, height: 120, x: width/2, y: 450 });
  routeRow.addEffect('fadeIn', 0.3, 0.5);
  scene8.addChild(routeRow);

  const lhrFinal = new FFText({ text: 'LHR', x: 280, y: 430, fontSize: 60 });
  lhrFinal.setColor(LONDON.mistBlue);
  lhrFinal.addEffect('fadeIn', 0.3, 0.6);
  scene8.addChild(lhrFinal);

  const londonFinal = new FFText({ text: 'LONDON', x: 280, y: 480, fontSize: 32 });
  londonFinal.setColor(UI.boardWhite);
  londonFinal.addEffect('fadeIn', 0.3, 0.7);
  scene8.addChild(londonFinal);

  const planeIcon = new FFText({ text: '✈', x: width/2, y: 450, fontSize: 50 });
  planeIcon.setColor(UI.boardYellow);
  planeIcon.alignCenter();
  planeIcon.addEffect('bounceIn', 0.4, 0.8);
  scene8.addChild(planeIcon);

  const jtrFinal = new FFText({ text: 'JTR', x: 800, y: 430, fontSize: 60 });
  jtrFinal.setColor(SANTORINI.sunOrange);
  jtrFinal.addEffect('fadeIn', 0.3, 0.9);
  scene8.addChild(jtrFinal);

  const santoriniFinal = new FFText({ text: 'SANTORINI', x: 800, y: 480, fontSize: 32 });
  santoriniFinal.setColor(UI.boardWhite);
  santoriniFinal.addEffect('fadeIn', 0.3, 1);
  scene8.addChild(santoriniFinal);

  // Status
  const statusFinal = new FFRect({ color: SANTORINI.seaGreen, width: 250, height: 70, x: width/2, y: 600 });
  statusFinal.addEffect('bounceIn', 0.4, 1.2);
  scene8.addChild(statusFinal);

  const statusTextFinal = new FFText({ text: '✓ ARRIVED', x: width/2, y: 600, fontSize: 36 });
  statusTextFinal.setColor(UI.boardBlack);
  statusTextFinal.alignCenter();
  statusTextFinal.addEffect('fadeIn', 0.2, 1.4);
  scene8.addChild(statusTextFinal);

  // Series title
  const seriesTitle = new FFText({ text: 'MATCH-CUT', x: width/2, y: 850, fontSize: 90 });
  seriesTitle.setColor(UI.boardWhite);
  seriesTitle.alignCenter();
  seriesTitle.addEffect('bounceIn', 0.5, 1.8);
  scene8.addChild(seriesTitle);

  const seriesTitle2 = new FFText({ text: 'COFFEE', x: width/2, y: 970, fontSize: 100 });
  seriesTitle2.setColor(UI.boardYellow);
  seriesTitle2.alignCenter();
  seriesTitle2.addEffect('bounceIn', 0.5, 2.1);
  scene8.addChild(seriesTitle2);

  // Coffee cup icon
  const finalCoffee = new FFText({ text: '☕', x: width/2, y: 1150, fontSize: 80 });
  finalCoffee.alignCenter();
  finalCoffee.addEffect('zoomIn', 0.5, 2.5);
  scene8.addChild(finalCoffee);

  // Tagline
  const tagline = new FFText({ text: 'WHERE WILL YOUR NEXT SIP TAKE YOU?', x: width/2, y: 1350, fontSize: 36 });
  tagline.setColor(UI.boardWhite);
  tagline.alignCenter();
  tagline.addEffect('fadeIn', 0.5, 3);
  scene8.addChild(tagline);

  scene8.setTransition('fade', 0.5);
  creator.addChild(scene8);
  console.log(colors.green('  ✓ Scene 8: Final Departure Board (5s)'));

  // ============================================
  // SCENE 9: CTA & END CARD (6s)
  // ============================================
  const scene9 = new FFScene();
  scene9.setBgColor(UI.boardBlack);
  scene9.setDuration(6);

  // Gradient background - London to Santorini colors
  const gradLeft = new FFRect({ color: LONDON.stormBlue, width: 550, height: 1800, x: 275, y: height/2 });
  gradLeft.addEffect('fadeIn', 0.4, 0);
  scene9.addChild(gradLeft);

  const gradRight = new FFRect({ color: SANTORINI.skyBlue, width: 550, height: 1800, x: width - 275, y: height/2 });
  gradRight.addEffect('fadeIn', 0.4, 0);
  scene9.addChild(gradRight);

  // Center overlay
  const centerOverlay = new FFRect({ color: 'rgba(0,0,0,0.85)', width: 900, height: 1600, x: width/2, y: height/2 });
  centerOverlay.addEffect('fadeIn', 0.3, 0.2);
  scene9.addChild(centerOverlay);

  // Series branding
  const brandTitle1 = new FFText({ text: 'MATCH-CUT', x: width/2, y: 300, fontSize: 80 });
  brandTitle1.setColor(UI.boardWhite);
  brandTitle1.alignCenter();
  brandTitle1.addEffect('backInDown', 0.5, 0.3);
  scene9.addChild(brandTitle1);

  const brandTitle2 = new FFText({ text: 'COFFEE', x: width/2, y: 410, fontSize: 90 });
  brandTitle2.setColor(UI.boardYellow);
  brandTitle2.alignCenter();
  brandTitle2.addEffect('backInDown', 0.5, 0.5);
  scene9.addChild(brandTitle2);

  // Separator
  const sep = new FFRect({ color: UI.boardYellow, width: 500, height: 4, x: width/2, y: 510 });
  sep.addEffect('zoomIn', 0.4, 0.8);
  scene9.addChild(sep);

  // Episode info
  const episodeText = new FFText({ text: 'EPISODE:', x: width/2, y: 600, fontSize: 32 });
  episodeText.setColor(UI.boardWhite);
  episodeText.alignCenter();
  episodeText.addEffect('fadeIn', 0.3, 1);
  scene9.addChild(episodeText);

  const routeText = new FFText({ text: 'LONDON → SANTORINI', x: width/2, y: 680, fontSize: 48 });
  routeText.setColor(SANTORINI.sunOrange);
  routeText.alignCenter();
  routeText.addEffect('bounceIn', 0.5, 1.2);
  scene9.addChild(routeText);

  // CTA Box
  const ctaBox = new FFRect({ color: UI.boardYellow, width: 750, height: 180, x: width/2, y: 900 });
  ctaBox.addEffect('zoomIn', 0.5, 1.6);
  scene9.addChild(ctaBox);

  const ctaText1 = new FFText({ text: '👆 FOLLOW FOR MORE', x: width/2, y: 865, fontSize: 42 });
  ctaText1.setColor(UI.boardBlack);
  ctaText1.alignCenter();
  ctaText1.addEffect('fadeIn', 0.3, 1.8);
  scene9.addChild(ctaText1);

  const ctaText2 = new FFText({ text: 'TRAVEL TRANSITIONS', x: width/2, y: 935, fontSize: 48 });
  ctaText2.setColor(UI.boardBlack);
  ctaText2.alignCenter();
  ctaText2.addEffect('bounceIn', 0.4, 2);
  scene9.addChild(ctaText2);

  // Hashtags
  const hashtags = new FFText({ text: '#MatchCut #TravelEdit #Transitions', x: width/2, y: 1100, fontSize: 30 });
  hashtags.setColor(SANTORINI.skyBlue);
  hashtags.alignCenter();
  hashtags.addEffect('fadeIn', 0.4, 2.4);
  scene9.addChild(hashtags);

  // Social actions
  const social = new FFText({ text: '❤️ LIKE  💬 COMMENT  🔄 SHARE', x: width/2, y: 1230, fontSize: 34 });
  social.setColor(UI.boardWhite);
  social.alignCenter();
  social.addEffect('fadeInUp', 0.4, 2.8);
  scene9.addChild(social);

  // Story count
  const storyNum = new FFText({ text: 'STORY 4 OF 30', x: width/2, y: 1370, fontSize: 28 });
  storyNum.setColor(UI.boardYellow);
  storyNum.alignCenter();
  storyNum.addEffect('fadeIn', 0.3, 3.2);
  scene9.addChild(storyNum);

  // Location icons at bottom
  const londonIcon = new FFText({ text: '🇬🇧', x: 300, y: 1550, fontSize: 60 });
  londonIcon.addEffect('bounceIn', 0.4, 3.5);
  scene9.addChild(londonIcon);

  const coffeeIconEnd = new FFText({ text: '☕', x: width/2, y: 1550, fontSize: 60 });
  coffeeIconEnd.alignCenter();
  coffeeIconEnd.addEffect('bounceIn', 0.4, 3.7);
  scene9.addChild(coffeeIconEnd);

  const greeceIcon = new FFText({ text: '🇬🇷', x: width - 300, y: 1550, fontSize: 60 });
  greeceIcon.addEffect('bounceIn', 0.4, 3.9);
  scene9.addChild(greeceIcon);

  creator.addChild(scene9);
  console.log(colors.green('  ✓ Scene 9: CTA & End Card (6s)'));

  // ============================================
  // EVENT HANDLERS & START
  // ============================================
  creator.on('start', () => {
    console.log(colors.yellow('\n⏳ Video rendering started...'));
  });

  creator.on('error', e => {
    console.log(colors.red(`\n❌ Error: ${e.error}`));
  });

  creator.on('progress', e => {
    const percent = (e.percent * 100).toFixed(1);
    process.stdout.write(colors.cyan(`\r📊 Progress: ${percent}%`));
  });

  creator.on('complete', e => {
    console.log(colors.green(`\n\n✅ Video created successfully!`));
    console.log(colors.white(`📁 Output: ${e.output}`));
    console.log(colors.magenta('\n🎬 "Match-Cut Coffee: London → Santorini" complete!\n'));
  });

  creator.start();
}

// Run the video creation
createMatchCutCoffeeVideo().catch(err => {
  console.error(colors.red('Error creating video:'), err);
});

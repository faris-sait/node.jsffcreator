/**
 * 🎬 STORY 5: "Billionaire Pulse" - Data Visualization
 * 
 * The Story: Comparing the spending power of $1 vs. Jeff Bezos's 
 * net worth using a "scrolling receipt" visual.
 * 
 * Visual Style:
 * - Clean, corporate, minimalist design
 * - Infinite scrolling receipt aesthetic
 * - Keyframed value counters
 * - Vector-style icons with price tags
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~55 seconds
 * 
 * Run with: node examples/story-videos/story-05-billionaire-pulse.js
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
// COLOR PALETTE - Corporate Minimalist
// ============================================
const COLORS = {
  // Receipt colors
  receiptWhite: '#fafafa',
  receiptPaper: '#f5f5f0',
  receiptShadow: '#e0e0e0',
  
  // Corporate colors
  darkCharcoal: '#1a1a1a',
  mediumGray: '#4a4a4a',
  lightGray: '#9e9e9e',
  
  // Accent colors
  moneyGreen: '#2e7d32',
  wealthGold: '#ffc107',
  alertRed: '#d32f2f',
  corporateBlue: '#1976d2',
  
  // Text
  black: '#000000',
  white: '#ffffff'
};

// ============================================
// RECEIPT ITEMS DATA
// ============================================
const RECEIPT_ITEMS = [
  { icon: '☕', name: 'Coffee', price: '$5', forYou: 'A treat', forBezos: 'Nothing' },
  { icon: '🍔', name: 'Lunch', price: '$15', forYou: 'Daily expense', forBezos: 'Invisible' },
  { icon: '📱', name: 'iPhone', price: '$1,200', forYou: 'Big purchase', forBezos: '0.000001%' },
  { icon: '🚗', name: 'New Car', price: '$35,000', forYou: 'Years of saving', forBezos: 'Pocket change' },
  { icon: '🏠', name: 'House', price: '$400,000', forYou: 'Life goal', forBezos: 'Rounding error' },
  { icon: '✈️', name: 'Private Jet', price: '$65M', forYou: 'Impossible', forBezos: 'Tuesday' },
  { icon: '🚀', name: 'Rocket Launch', price: '$500M', forYou: 'Fantasy', forBezos: 'Hobby' },
  { icon: '🏢', name: 'Skyscraper', price: '$1B', forYou: 'Unimaginable', forBezos: 'Investment' }
];

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createBillionairePulseVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 5: "Billionaire Pulse"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~55 seconds'));
  console.log(colors.yellow('🎨 Theme: Data Visualization - Scrolling Receipt\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-05-billionaire-pulse.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: TITLE CARD - The Question (4s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.darkCharcoal);
  scene1.setDuration(4);

  // Main question
  const questionText = new FFText({ text: 'WHAT DOES', x: width/2, y: 400, fontSize: 60 });
  questionText.setColor(COLORS.white);
  questionText.alignCenter();
  questionText.addEffect('fadeIn', 0.4, 0.2);
  scene1.addChild(questionText);

  // Dollar amount with emphasis
  const dollarBox = new FFRect({ color: COLORS.moneyGreen, width: 300, height: 150, x: width/2, y: 580 });
  dollarBox.addEffect('zoomIn', 0.5, 0.5);
  scene1.addChild(dollarBox);

  const dollarText = new FFText({ text: '$1', x: width/2, y: 580, fontSize: 120 });
  dollarText.setColor(COLORS.white);
  dollarText.alignCenter();
  dollarText.addEffect('bounceIn', 0.5, 0.6);
  scene1.addChild(dollarText);

  const meanText = new FFText({ text: 'MEAN TO YOU?', x: width/2, y: 750, fontSize: 60 });
  meanText.setColor(COLORS.white);
  meanText.alignCenter();
  meanText.addEffect('fadeIn', 0.4, 0.9);
  scene1.addChild(meanText);

  // VS divider
  const vsText = new FFText({ text: 'VS', x: width/2, y: 920, fontSize: 50 });
  vsText.setColor(COLORS.wealthGold);
  vsText.alignCenter();
  vsText.addEffect('bounceIn', 0.4, 1.3);
  scene1.addChild(vsText);

  // Bezos reference
  const bezosBox = new FFRect({ color: COLORS.wealthGold, width: 700, height: 120, x: width/2, y: 1080 });
  bezosBox.addEffect('zoomIn', 0.5, 1.5);
  scene1.addChild(bezosBox);

  const bezosText = new FFText({ text: 'JEFF BEZOS', x: width/2, y: 1080, fontSize: 70 });
  bezosText.setColor(COLORS.darkCharcoal);
  bezosText.alignCenter();
  bezosText.addEffect('fadeIn', 0.3, 1.7);
  scene1.addChild(bezosText);

  // Net worth counter
  const netWorthLabel = new FFText({ text: 'NET WORTH:', x: width/2, y: 1250, fontSize: 36 });
  netWorthLabel.setColor(COLORS.lightGray);
  netWorthLabel.alignCenter();
  netWorthLabel.addEffect('fadeIn', 0.3, 2);
  scene1.addChild(netWorthLabel);

  const netWorthValue = new FFText({ text: '$200,000,000,000', x: width/2, y: 1340, fontSize: 52 });
  netWorthValue.setColor(COLORS.moneyGreen);
  netWorthValue.alignCenter();
  netWorthValue.addEffect('bounceIn', 0.5, 2.3);
  scene1.addChild(netWorthValue);

  const billionLabel = new FFText({ text: '(200 BILLION DOLLARS)', x: width/2, y: 1420, fontSize: 32 });
  billionLabel.setColor(COLORS.lightGray);
  billionLabel.alignCenter();
  billionLabel.addEffect('fadeIn', 0.3, 2.8);
  scene1.addChild(billionLabel);

  scene1.setTransition('fade', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Title Card - The Question (4s)'));

  // ============================================
  // SCENE 2: RECEIPT INTRO (4s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.darkCharcoal);
  scene2.setDuration(4);

  // Receipt paper background
  const receiptBg = new FFRect({ color: COLORS.receiptPaper, width: 900, height: 1600, x: width/2, y: height/2 });
  receiptBg.addEffect('fadeIn', 0.5, 0.1);
  scene2.addChild(receiptBg);

  // Receipt shadow
  const receiptShadow = new FFRect({ color: COLORS.receiptShadow, width: 920, height: 1620, x: width/2 + 10, y: height/2 + 10 });
  receiptShadow.addEffect('fadeIn', 0.4, 0);
  scene2.addChild(receiptShadow);

  // Re-add receipt on top
  const receiptTop = new FFRect({ color: COLORS.receiptPaper, width: 900, height: 1600, x: width/2, y: height/2 });
  receiptTop.addEffect('fadeIn', 0.5, 0.1);
  scene2.addChild(receiptTop);

  // Receipt header
  const receiptHeader = new FFText({ text: '═══════════════════════', x: width/2, y: 200, fontSize: 28 });
  receiptHeader.setColor(COLORS.mediumGray);
  receiptHeader.alignCenter();
  receiptHeader.addEffect('fadeIn', 0.3, 0.3);
  scene2.addChild(receiptHeader);

  const storeTitle = new FFText({ text: 'WEALTH COMPARISON', x: width/2, y: 280, fontSize: 48 });
  storeTitle.setColor(COLORS.darkCharcoal);
  storeTitle.alignCenter();
  storeTitle.addEffect('fadeIn', 0.4, 0.5);
  scene2.addChild(storeTitle);

  const storeSubtitle = new FFText({ text: 'RECEIPT OF REALITY', x: width/2, y: 350, fontSize: 32 });
  storeSubtitle.setColor(COLORS.mediumGray);
  storeSubtitle.alignCenter();
  storeSubtitle.addEffect('fadeIn', 0.3, 0.7);
  scene2.addChild(storeSubtitle);

  const receiptLine1 = new FFText({ text: '═══════════════════════', x: width/2, y: 420, fontSize: 28 });
  receiptLine1.setColor(COLORS.mediumGray);
  receiptLine1.alignCenter();
  receiptLine1.addEffect('fadeIn', 0.3, 0.9);
  scene2.addChild(receiptLine1);

  // Column headers
  const itemHeader = new FFText({ text: 'ITEM', x: 200, y: 520, fontSize: 28 });
  itemHeader.setColor(COLORS.lightGray);
  itemHeader.addEffect('fadeIn', 0.3, 1.1);
  scene2.addChild(itemHeader);

  const priceHeader = new FFText({ text: 'PRICE', x: 550, y: 520, fontSize: 28 });
  priceHeader.setColor(COLORS.lightGray);
  priceHeader.addEffect('fadeIn', 0.3, 1.2);
  scene2.addChild(priceHeader);

  const impactHeader = new FFText({ text: 'FOR BEZOS', x: 800, y: 520, fontSize: 28 });
  impactHeader.setColor(COLORS.lightGray);
  impactHeader.addEffect('fadeIn', 0.3, 1.3);
  scene2.addChild(impactHeader);

  // Dashed line
  const dashLine = new FFText({ text: '- - - - - - - - - - - - - - - - - -', x: width/2, y: 580, fontSize: 24 });
  dashLine.setColor(COLORS.lightGray);
  dashLine.alignCenter();
  dashLine.addEffect('fadeIn', 0.3, 1.5);
  scene2.addChild(dashLine);

  // Scroll indicator
  const scrollHint = new FFText({ text: '↓ SCROLL TO SEE MORE ↓', x: width/2, y: 1650, fontSize: 28 });
  scrollHint.setColor(COLORS.corporateBlue);
  scrollHint.alignCenter();
  scrollHint.addEffect('fadeIn', 0.4, 2);
  scene2.addChild(scrollHint);

  scene2.setTransition('directionalwarp', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Receipt Intro (4s)'));

  // ============================================
  // SCENE 3: RECEIPT ITEM 1 - Coffee (4s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.receiptPaper);
  scene3.setDuration(4);

  // Receipt background
  const receipt3 = new FFRect({ color: COLORS.receiptPaper, width: 1100, height: 2000, x: width/2, y: height/2 });
  receipt3.addEffect('fadeIn', 0.2, 0);
  scene3.addChild(receipt3);

  // Item icon
  const coffeeIcon = new FFText({ text: '☕', x: width/2, y: 350, fontSize: 150 });
  coffeeIcon.alignCenter();
  coffeeIcon.addEffect('bounceIn', 0.5, 0.2);
  scene3.addChild(coffeeIcon);

  // Item name
  const coffeeName = new FFText({ text: 'COFFEE', x: width/2, y: 550, fontSize: 80 });
  coffeeName.setColor(COLORS.darkCharcoal);
  coffeeName.alignCenter();
  coffeeName.addEffect('fadeIn', 0.4, 0.5);
  scene3.addChild(coffeeName);

  // Price tag
  const priceBox3 = new FFRect({ color: COLORS.moneyGreen, width: 250, height: 100, x: width/2, y: 700 });
  priceBox3.addEffect('zoomIn', 0.4, 0.7);
  scene3.addChild(priceBox3);

  const priceText3 = new FFText({ text: '$5', x: width/2, y: 700, fontSize: 70 });
  priceText3.setColor(COLORS.white);
  priceText3.alignCenter();
  priceText3.addEffect('fadeIn', 0.3, 0.8);
  scene3.addChild(priceText3);

  // Comparison section
  const compLine = new FFRect({ color: COLORS.mediumGray, width: 800, height: 4, x: width/2, y: 850 });
  compLine.addEffect('zoomIn', 0.4, 1);
  scene3.addChild(compLine);

  // For You
  const forYouLabel = new FFText({ text: 'FOR YOU:', x: width/2, y: 950, fontSize: 36 });
  forYouLabel.setColor(COLORS.lightGray);
  forYouLabel.alignCenter();
  forYouLabel.addEffect('fadeIn', 0.3, 1.2);
  scene3.addChild(forYouLabel);

  const forYouValue = new FFText({ text: 'A NICE TREAT', x: width/2, y: 1030, fontSize: 48 });
  forYouValue.setColor(COLORS.corporateBlue);
  forYouValue.alignCenter();
  forYouValue.addEffect('fadeInUp', 0.4, 1.4);
  scene3.addChild(forYouValue);

  // For Bezos
  const forBezosLabel = new FFText({ text: 'FOR BEZOS:', x: width/2, y: 1180, fontSize: 36 });
  forBezosLabel.setColor(COLORS.lightGray);
  forBezosLabel.alignCenter();
  forBezosLabel.addEffect('fadeIn', 0.3, 1.8);
  scene3.addChild(forBezosLabel);

  const forBezosBox = new FFRect({ color: COLORS.wealthGold, width: 500, height: 100, x: width/2, y: 1280 });
  forBezosBox.addEffect('zoomIn', 0.4, 2);
  scene3.addChild(forBezosBox);

  const forBezosValue = new FFText({ text: 'NOTHING', x: width/2, y: 1280, fontSize: 56 });
  forBezosValue.setColor(COLORS.darkCharcoal);
  forBezosValue.alignCenter();
  forBezosValue.addEffect('bounceIn', 0.4, 2.1);
  scene3.addChild(forBezosValue);

  // Percentage
  const percentText = new FFText({ text: '= 0.0000000025% of his wealth', x: width/2, y: 1420, fontSize: 28 });
  percentText.setColor(COLORS.alertRed);
  percentText.alignCenter();
  percentText.addEffect('fadeIn', 0.4, 2.5);
  scene3.addChild(percentText);

  scene3.setTransition('windowslice', 0.4);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Receipt Item 1 - Coffee (4s)'));

  // ============================================
  // SCENE 4: RECEIPT ITEM 2 - iPhone (4s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.receiptPaper);
  scene4.setDuration(4);

  const receipt4 = new FFRect({ color: COLORS.receiptPaper, width: 1100, height: 2000, x: width/2, y: height/2 });
  receipt4.addEffect('fadeIn', 0.2, 0);
  scene4.addChild(receipt4);

  // Item icon
  const phoneIcon = new FFText({ text: '📱', x: width/2, y: 350, fontSize: 150 });
  phoneIcon.alignCenter();
  phoneIcon.addEffect('bounceIn', 0.5, 0.2);
  scene4.addChild(phoneIcon);

  const phoneName = new FFText({ text: 'iPHONE', x: width/2, y: 550, fontSize: 80 });
  phoneName.setColor(COLORS.darkCharcoal);
  phoneName.alignCenter();
  phoneName.addEffect('fadeIn', 0.4, 0.5);
  scene4.addChild(phoneName);

  const priceBox4 = new FFRect({ color: COLORS.moneyGreen, width: 350, height: 100, x: width/2, y: 700 });
  priceBox4.addEffect('zoomIn', 0.4, 0.7);
  scene4.addChild(priceBox4);

  const priceText4 = new FFText({ text: '$1,200', x: width/2, y: 700, fontSize: 60 });
  priceText4.setColor(COLORS.white);
  priceText4.alignCenter();
  priceText4.addEffect('fadeIn', 0.3, 0.8);
  scene4.addChild(priceText4);

  const compLine4 = new FFRect({ color: COLORS.mediumGray, width: 800, height: 4, x: width/2, y: 850 });
  compLine4.addEffect('zoomIn', 0.4, 1);
  scene4.addChild(compLine4);

  const forYouLabel4 = new FFText({ text: 'FOR YOU:', x: width/2, y: 950, fontSize: 36 });
  forYouLabel4.setColor(COLORS.lightGray);
  forYouLabel4.alignCenter();
  forYouLabel4.addEffect('fadeIn', 0.3, 1.2);
  scene4.addChild(forYouLabel4);

  const forYouValue4 = new FFText({ text: 'BIG PURCHASE', x: width/2, y: 1030, fontSize: 48 });
  forYouValue4.setColor(COLORS.corporateBlue);
  forYouValue4.alignCenter();
  forYouValue4.addEffect('fadeInUp', 0.4, 1.4);
  scene4.addChild(forYouValue4);

  const forBezosLabel4 = new FFText({ text: 'FOR BEZOS:', x: width/2, y: 1180, fontSize: 36 });
  forBezosLabel4.setColor(COLORS.lightGray);
  forBezosLabel4.alignCenter();
  forBezosLabel4.addEffect('fadeIn', 0.3, 1.8);
  scene4.addChild(forBezosLabel4);

  const forBezosBox4 = new FFRect({ color: COLORS.wealthGold, width: 600, height: 100, x: width/2, y: 1280 });
  forBezosBox4.addEffect('zoomIn', 0.4, 2);
  scene4.addChild(forBezosBox4);

  const forBezosValue4 = new FFText({ text: 'INVISIBLE', x: width/2, y: 1280, fontSize: 56 });
  forBezosValue4.setColor(COLORS.darkCharcoal);
  forBezosValue4.alignCenter();
  forBezosValue4.addEffect('bounceIn', 0.4, 2.1);
  scene4.addChild(forBezosValue4);

  const percentText4 = new FFText({ text: '= 0.0000006% of his wealth', x: width/2, y: 1420, fontSize: 28 });
  percentText4.setColor(COLORS.alertRed);
  percentText4.alignCenter();
  percentText4.addEffect('fadeIn', 0.4, 2.5);
  scene4.addChild(percentText4);

  scene4.setTransition('windowslice', 0.4);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Receipt Item 2 - iPhone (4s)'));

  // ============================================
  // SCENE 5: RECEIPT ITEM 3 - House (5s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.receiptPaper);
  scene5.setDuration(5);

  const receipt5 = new FFRect({ color: COLORS.receiptPaper, width: 1100, height: 2000, x: width/2, y: height/2 });
  receipt5.addEffect('fadeIn', 0.2, 0);
  scene5.addChild(receipt5);

  const houseIcon = new FFText({ text: '🏠', x: width/2, y: 350, fontSize: 150 });
  houseIcon.alignCenter();
  houseIcon.addEffect('bounceIn', 0.5, 0.2);
  scene5.addChild(houseIcon);

  const houseName = new FFText({ text: 'A HOUSE', x: width/2, y: 550, fontSize: 80 });
  houseName.setColor(COLORS.darkCharcoal);
  houseName.alignCenter();
  houseName.addEffect('fadeIn', 0.4, 0.5);
  scene5.addChild(houseName);

  const priceBox5 = new FFRect({ color: COLORS.moneyGreen, width: 450, height: 100, x: width/2, y: 700 });
  priceBox5.addEffect('zoomIn', 0.4, 0.7);
  scene5.addChild(priceBox5);

  const priceText5 = new FFText({ text: '$400,000', x: width/2, y: 700, fontSize: 55 });
  priceText5.setColor(COLORS.white);
  priceText5.alignCenter();
  priceText5.addEffect('fadeIn', 0.3, 0.8);
  scene5.addChild(priceText5);

  const compLine5 = new FFRect({ color: COLORS.mediumGray, width: 800, height: 4, x: width/2, y: 850 });
  compLine5.addEffect('zoomIn', 0.4, 1);
  scene5.addChild(compLine5);

  const forYouLabel5 = new FFText({ text: 'FOR YOU:', x: width/2, y: 950, fontSize: 36 });
  forYouLabel5.setColor(COLORS.lightGray);
  forYouLabel5.alignCenter();
  forYouLabel5.addEffect('fadeIn', 0.3, 1.2);
  scene5.addChild(forYouLabel5);

  const forYouValue5 = new FFText({ text: 'LIFE GOAL', x: width/2, y: 1030, fontSize: 52 });
  forYouValue5.setColor(COLORS.corporateBlue);
  forYouValue5.alignCenter();
  forYouValue5.addEffect('fadeInUp', 0.4, 1.4);
  scene5.addChild(forYouValue5);

  const yearsText = new FFText({ text: '(30 years of mortgage)', x: width/2, y: 1100, fontSize: 28 });
  yearsText.setColor(COLORS.lightGray);
  yearsText.alignCenter();
  yearsText.addEffect('fadeIn', 0.3, 1.6);
  scene5.addChild(yearsText);

  const forBezosLabel5 = new FFText({ text: 'FOR BEZOS:', x: width/2, y: 1220, fontSize: 36 });
  forBezosLabel5.setColor(COLORS.lightGray);
  forBezosLabel5.alignCenter();
  forBezosLabel5.addEffect('fadeIn', 0.3, 2);
  scene5.addChild(forBezosLabel5);

  const forBezosBox5 = new FFRect({ color: COLORS.wealthGold, width: 700, height: 100, x: width/2, y: 1320 });
  forBezosBox5.addEffect('zoomIn', 0.4, 2.2);
  scene5.addChild(forBezosBox5);

  const forBezosValue5 = new FFText({ text: 'ROUNDING ERROR', x: width/2, y: 1320, fontSize: 50 });
  forBezosValue5.setColor(COLORS.darkCharcoal);
  forBezosValue5.alignCenter();
  forBezosValue5.addEffect('bounceIn', 0.4, 2.3);
  scene5.addChild(forBezosValue5);

  const percentText5 = new FFText({ text: '= 0.0002% of his wealth', x: width/2, y: 1460, fontSize: 28 });
  percentText5.setColor(COLORS.alertRed);
  percentText5.alignCenter();
  percentText5.addEffect('fadeIn', 0.4, 2.8);
  scene5.addChild(percentText5);

  scene5.setTransition('windowslice', 0.4);
  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Receipt Item 3 - House (5s)'));

  // ============================================
  // SCENE 6: RECEIPT ITEM 4 - Private Jet (5s)
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor(COLORS.receiptPaper);
  scene6.setDuration(5);

  const receipt6 = new FFRect({ color: COLORS.receiptPaper, width: 1100, height: 2000, x: width/2, y: height/2 });
  receipt6.addEffect('fadeIn', 0.2, 0);
  scene6.addChild(receipt6);

  const jetIcon = new FFText({ text: '✈️', x: width/2, y: 350, fontSize: 150 });
  jetIcon.alignCenter();
  jetIcon.addEffect('bounceIn', 0.5, 0.2);
  scene6.addChild(jetIcon);

  const jetName = new FFText({ text: 'PRIVATE JET', x: width/2, y: 550, fontSize: 70 });
  jetName.setColor(COLORS.darkCharcoal);
  jetName.alignCenter();
  jetName.addEffect('fadeIn', 0.4, 0.5);
  scene6.addChild(jetName);

  const priceBox6 = new FFRect({ color: COLORS.moneyGreen, width: 500, height: 100, x: width/2, y: 700 });
  priceBox6.addEffect('zoomIn', 0.4, 0.7);
  scene6.addChild(priceBox6);

  const priceText6 = new FFText({ text: '$65,000,000', x: width/2, y: 700, fontSize: 50 });
  priceText6.setColor(COLORS.white);
  priceText6.alignCenter();
  priceText6.addEffect('fadeIn', 0.3, 0.8);
  scene6.addChild(priceText6);

  const priceLabel6 = new FFText({ text: '(65 MILLION)', x: width/2, y: 780, fontSize: 28 });
  priceLabel6.setColor(COLORS.mediumGray);
  priceLabel6.alignCenter();
  priceLabel6.addEffect('fadeIn', 0.3, 0.9);
  scene6.addChild(priceLabel6);

  const compLine6 = new FFRect({ color: COLORS.mediumGray, width: 800, height: 4, x: width/2, y: 870 });
  compLine6.addEffect('zoomIn', 0.4, 1);
  scene6.addChild(compLine6);

  const forYouLabel6 = new FFText({ text: 'FOR YOU:', x: width/2, y: 960, fontSize: 36 });
  forYouLabel6.setColor(COLORS.lightGray);
  forYouLabel6.alignCenter();
  forYouLabel6.addEffect('fadeIn', 0.3, 1.2);
  scene6.addChild(forYouLabel6);

  const forYouBox6 = new FFRect({ color: COLORS.alertRed, width: 500, height: 90, x: width/2, y: 1050 });
  forYouBox6.addEffect('zoomIn', 0.4, 1.4);
  scene6.addChild(forYouBox6);

  const forYouValue6 = new FFText({ text: 'IMPOSSIBLE', x: width/2, y: 1050, fontSize: 52 });
  forYouValue6.setColor(COLORS.white);
  forYouValue6.alignCenter();
  forYouValue6.addEffect('bounceIn', 0.4, 1.5);
  scene6.addChild(forYouValue6);

  const forBezosLabel6 = new FFText({ text: 'FOR BEZOS:', x: width/2, y: 1200, fontSize: 36 });
  forBezosLabel6.setColor(COLORS.lightGray);
  forBezosLabel6.alignCenter();
  forBezosLabel6.addEffect('fadeIn', 0.3, 1.9);
  scene6.addChild(forBezosLabel6);

  const forBezosBox6 = new FFRect({ color: COLORS.wealthGold, width: 450, height: 100, x: width/2, y: 1300 });
  forBezosBox6.addEffect('zoomIn', 0.4, 2.1);
  scene6.addChild(forBezosBox6);

  const forBezosValue6 = new FFText({ text: 'TUESDAY', x: width/2, y: 1300, fontSize: 60 });
  forBezosValue6.setColor(COLORS.darkCharcoal);
  forBezosValue6.alignCenter();
  forBezosValue6.addEffect('bounceIn', 0.4, 2.2);
  scene6.addChild(forBezosValue6);

  const percentText6 = new FFText({ text: '= 0.0325% of his wealth', x: width/2, y: 1440, fontSize: 28 });
  percentText6.setColor(COLORS.alertRed);
  percentText6.alignCenter();
  percentText6.addEffect('fadeIn', 0.4, 2.8);
  scene6.addChild(percentText6);

  scene6.setTransition('windowslice', 0.4);
  creator.addChild(scene6);
  console.log(colors.green('  ✓ Scene 6: Receipt Item 4 - Private Jet (5s)'));

  // ============================================
  // SCENE 7: RECEIPT ITEM 5 - Rocket Launch (5s)
  // ============================================
  const scene7 = new FFScene();
  scene7.setBgColor(COLORS.receiptPaper);
  scene7.setDuration(5);

  const receipt7 = new FFRect({ color: COLORS.receiptPaper, width: 1100, height: 2000, x: width/2, y: height/2 });
  receipt7.addEffect('fadeIn', 0.2, 0);
  scene7.addChild(receipt7);

  const rocketIcon = new FFText({ text: '🚀', x: width/2, y: 350, fontSize: 150 });
  rocketIcon.alignCenter();
  rocketIcon.addEffect('bounceIn', 0.5, 0.2);
  scene7.addChild(rocketIcon);

  const rocketName = new FFText({ text: 'ROCKET LAUNCH', x: width/2, y: 550, fontSize: 65 });
  rocketName.setColor(COLORS.darkCharcoal);
  rocketName.alignCenter();
  rocketName.addEffect('fadeIn', 0.4, 0.5);
  scene7.addChild(rocketName);

  const priceBox7 = new FFRect({ color: COLORS.moneyGreen, width: 550, height: 100, x: width/2, y: 700 });
  priceBox7.addEffect('zoomIn', 0.4, 0.7);
  scene7.addChild(priceBox7);

  const priceText7 = new FFText({ text: '$500,000,000', x: width/2, y: 700, fontSize: 48 });
  priceText7.setColor(COLORS.white);
  priceText7.alignCenter();
  priceText7.addEffect('fadeIn', 0.3, 0.8);
  scene7.addChild(priceText7);

  const priceLabel7 = new FFText({ text: '(500 MILLION)', x: width/2, y: 780, fontSize: 28 });
  priceLabel7.setColor(COLORS.mediumGray);
  priceLabel7.alignCenter();
  priceLabel7.addEffect('fadeIn', 0.3, 0.9);
  scene7.addChild(priceLabel7);

  const compLine7 = new FFRect({ color: COLORS.mediumGray, width: 800, height: 4, x: width/2, y: 870 });
  compLine7.addEffect('zoomIn', 0.4, 1);
  scene7.addChild(compLine7);

  const forYouLabel7 = new FFText({ text: 'FOR YOU:', x: width/2, y: 960, fontSize: 36 });
  forYouLabel7.setColor(COLORS.lightGray);
  forYouLabel7.alignCenter();
  forYouLabel7.addEffect('fadeIn', 0.3, 1.2);
  scene7.addChild(forYouLabel7);

  const forYouBox7 = new FFRect({ color: COLORS.alertRed, width: 450, height: 90, x: width/2, y: 1050 });
  forYouBox7.addEffect('zoomIn', 0.4, 1.4);
  scene7.addChild(forYouBox7);

  const forYouValue7 = new FFText({ text: 'FANTASY', x: width/2, y: 1050, fontSize: 52 });
  forYouValue7.setColor(COLORS.white);
  forYouValue7.alignCenter();
  forYouValue7.addEffect('bounceIn', 0.4, 1.5);
  scene7.addChild(forYouValue7);

  const forBezosLabel7 = new FFText({ text: 'FOR BEZOS:', x: width/2, y: 1200, fontSize: 36 });
  forBezosLabel7.setColor(COLORS.lightGray);
  forBezosLabel7.alignCenter();
  forBezosLabel7.addEffect('fadeIn', 0.3, 1.9);
  scene7.addChild(forBezosLabel7);

  const forBezosBox7 = new FFRect({ color: COLORS.wealthGold, width: 400, height: 100, x: width/2, y: 1300 });
  forBezosBox7.addEffect('zoomIn', 0.4, 2.1);
  scene7.addChild(forBezosBox7);

  const forBezosValue7 = new FFText({ text: 'HOBBY', x: width/2, y: 1300, fontSize: 60 });
  forBezosValue7.setColor(COLORS.darkCharcoal);
  forBezosValue7.alignCenter();
  forBezosValue7.addEffect('bounceIn', 0.4, 2.2);
  scene7.addChild(forBezosValue7);

  const blueOrigin = new FFText({ text: '(Blue Origin)', x: width/2, y: 1380, fontSize: 24 });
  blueOrigin.setColor(COLORS.lightGray);
  blueOrigin.alignCenter();
  blueOrigin.addEffect('fadeIn', 0.3, 2.4);
  scene7.addChild(blueOrigin);

  const percentText7 = new FFText({ text: '= 0.25% of his wealth', x: width/2, y: 1460, fontSize: 28 });
  percentText7.setColor(COLORS.alertRed);
  percentText7.alignCenter();
  percentText7.addEffect('fadeIn', 0.4, 2.8);
  scene7.addChild(percentText7);

  scene7.setTransition('windowslice', 0.4);
  creator.addChild(scene7);
  console.log(colors.green('  ✓ Scene 7: Receipt Item 5 - Rocket Launch (5s)'));

  // ============================================
  // SCENE 8: RECEIPT TOTAL - The Reality (6s)
  // ============================================
  const scene8 = new FFScene();
  scene8.setBgColor(COLORS.receiptPaper);
  scene8.setDuration(6);

  const receipt8 = new FFRect({ color: COLORS.receiptPaper, width: 1100, height: 2000, x: width/2, y: height/2 });
  receipt8.addEffect('fadeIn', 0.2, 0);
  scene8.addChild(receipt8);

  // Receipt total section
  const totalLine1 = new FFText({ text: '═══════════════════════', x: width/2, y: 250, fontSize: 28 });
  totalLine1.setColor(COLORS.mediumGray);
  totalLine1.alignCenter();
  totalLine1.addEffect('fadeIn', 0.3, 0.2);
  scene8.addChild(totalLine1);

  const totalLabel = new FFText({ text: 'RECEIPT TOTAL', x: width/2, y: 340, fontSize: 50 });
  totalLabel.setColor(COLORS.darkCharcoal);
  totalLabel.alignCenter();
  totalLabel.addEffect('fadeIn', 0.4, 0.4);
  scene8.addChild(totalLabel);

  const totalLine2 = new FFText({ text: '═══════════════════════', x: width/2, y: 420, fontSize: 28 });
  totalLine2.setColor(COLORS.mediumGray);
  totalLine2.alignCenter();
  totalLine2.addEffect('fadeIn', 0.3, 0.5);
  scene8.addChild(totalLine2);

  // The shocking comparison
  const ifYouHad = new FFText({ text: 'IF YOU HAD', x: width/2, y: 550, fontSize: 40 });
  ifYouHad.setColor(COLORS.mediumGray);
  ifYouHad.alignCenter();
  ifYouHad.addEffect('fadeIn', 0.3, 0.8);
  scene8.addChild(ifYouHad);

  const bezosWealthBox = new FFRect({ color: COLORS.wealthGold, width: 800, height: 120, x: width/2, y: 680 });
  bezosWealthBox.addEffect('zoomIn', 0.5, 1);
  scene8.addChild(bezosWealthBox);

  const bezosWealth = new FFText({ text: '$200 BILLION', x: width/2, y: 680, fontSize: 60 });
  bezosWealth.setColor(COLORS.darkCharcoal);
  bezosWealth.alignCenter();
  bezosWealth.addEffect('bounceIn', 0.5, 1.1);
  scene8.addChild(bezosWealth);

  // Spending rate
  const andSpent = new FFText({ text: 'AND SPENT', x: width/2, y: 820, fontSize: 40 });
  andSpent.setColor(COLORS.mediumGray);
  andSpent.alignCenter();
  andSpent.addEffect('fadeIn', 0.3, 1.5);
  scene8.addChild(andSpent);

  const spendRateBox = new FFRect({ color: COLORS.alertRed, width: 700, height: 100, x: width/2, y: 930 });
  spendRateBox.addEffect('zoomIn', 0.5, 1.7);
  scene8.addChild(spendRateBox);

  const spendRate = new FFText({ text: '$1 MILLION / DAY', x: width/2, y: 930, fontSize: 50 });
  spendRate.setColor(COLORS.white);
  spendRate.alignCenter();
  spendRate.addEffect('bounceIn', 0.5, 1.8);
  scene8.addChild(spendRate);

  // Result
  const itWouldTake = new FFText({ text: 'IT WOULD TAKE', x: width/2, y: 1100, fontSize: 40 });
  itWouldTake.setColor(COLORS.mediumGray);
  itWouldTake.alignCenter();
  itWouldTake.addEffect('fadeIn', 0.3, 2.2);
  scene8.addChild(itWouldTake);

  const yearsBox = new FFRect({ color: COLORS.corporateBlue, width: 600, height: 150, x: width/2, y: 1260 });
  yearsBox.addEffect('zoomIn', 0.5, 2.5);
  scene8.addChild(yearsBox);

  const yearsValue = new FFText({ text: '548 YEARS', x: width/2, y: 1260, fontSize: 70 });
  yearsValue.setColor(COLORS.white);
  yearsValue.alignCenter();
  yearsValue.addEffect('bounceIn', 0.6, 2.6);
  scene8.addChild(yearsValue);

  const toSpend = new FFText({ text: 'TO SPEND IT ALL', x: width/2, y: 1420, fontSize: 40 });
  toSpend.setColor(COLORS.darkCharcoal);
  toSpend.alignCenter();
  toSpend.addEffect('fadeIn', 0.4, 3.2);
  scene8.addChild(toSpend);

  // Mind blown emoji
  const mindBlown = new FFText({ text: '🤯', x: width/2, y: 1550, fontSize: 100 });
  mindBlown.alignCenter();
  mindBlown.addEffect('bounceIn', 0.5, 3.8);
  scene8.addChild(mindBlown);

  scene8.setTransition('fade', 0.5);
  creator.addChild(scene8);
  console.log(colors.green('  ✓ Scene 8: Receipt Total - The Reality (6s)'));

  // ============================================
  // SCENE 9: THE MESSAGE (5s)
  // ============================================
  const scene9 = new FFScene();
  scene9.setBgColor(COLORS.darkCharcoal);
  scene9.setDuration(5);

  // Powerful message
  const messageTitle = new FFText({ text: 'THE WEALTH GAP', x: width/2, y: 350, fontSize: 70 });
  messageTitle.setColor(COLORS.white);
  messageTitle.alignCenter();
  messageTitle.addEffect('backInDown', 0.5, 0.2);
  scene9.addChild(messageTitle);

  const isNotBox = new FFRect({ color: COLORS.alertRed, width: 500, height: 100, x: width/2, y: 500 });
  isNotBox.addEffect('zoomIn', 0.4, 0.5);
  scene9.addChild(isNotBox);

  const isNotText = new FFText({ text: 'IS NOT', x: width/2, y: 500, fontSize: 60 });
  isNotText.setColor(COLORS.white);
  isNotText.alignCenter();
  isNotText.addEffect('fadeIn', 0.3, 0.6);
  scene9.addChild(isNotText);

  const aGap = new FFText({ text: 'A GAP', x: width/2, y: 650, fontSize: 80 });
  aGap.setColor(COLORS.white);
  aGap.alignCenter();
  aGap.addEffect('fadeIn', 0.4, 0.9);
  scene9.addChild(aGap);

  // Visual gap representation
  const gapLine = new FFRect({ color: COLORS.wealthGold, width: 800, height: 8, x: width/2, y: 780 });
  gapLine.addEffect('zoomIn', 0.5, 1.2);
  scene9.addChild(gapLine);

  const itsA = new FFText({ text: "IT'S A", x: width/2, y: 900, fontSize: 50 });
  itsA.setColor(COLORS.lightGray);
  itsA.alignCenter();
  itsA.addEffect('fadeIn', 0.3, 1.5);
  scene9.addChild(itsA);

  const chasmBox = new FFRect({ color: COLORS.wealthGold, width: 600, height: 150, x: width/2, y: 1080 });
  chasmBox.addEffect('zoomIn', 0.5, 1.8);
  scene9.addChild(chasmBox);

  const chasmText = new FFText({ text: 'CHASM', x: width/2, y: 1080, fontSize: 100 });
  chasmText.setColor(COLORS.darkCharcoal);
  chasmText.alignCenter();
  chasmText.addEffect('bounceIn', 0.6, 1.9);
  scene9.addChild(chasmText);

  // Scale visualization
  const youDot = new FFRect({ color: COLORS.corporateBlue, width: 20, height: 20, x: 200, y: 1350 });
  youDot.addEffect('zoomIn', 0.3, 2.5);
  scene9.addChild(youDot);

  const youLabel = new FFText({ text: 'YOU', x: 200, y: 1400, fontSize: 24 });
  youLabel.setColor(COLORS.lightGray);
  youLabel.alignCenter();
  youLabel.addEffect('fadeIn', 0.3, 2.6);
  scene9.addChild(youLabel);

  const bezosDot = new FFRect({ color: COLORS.wealthGold, width: 200, height: 200, x: width - 200, y: 1350 });
  bezosDot.addEffect('zoomIn', 0.5, 2.8);
  scene9.addChild(bezosDot);

  const bezosLabel = new FFText({ text: 'BEZOS', x: width - 200, y: 1500, fontSize: 24 });
  bezosLabel.setColor(COLORS.lightGray);
  bezosLabel.alignCenter();
  bezosLabel.addEffect('fadeIn', 0.3, 3);
  scene9.addChild(bezosLabel);

  // Scale note
  const scaleNote = new FFText({ text: '(to scale)', x: width/2, y: 1600, fontSize: 24 });
  scaleNote.setColor(COLORS.lightGray);
  scaleNote.alignCenter();
  scaleNote.addEffect('fadeIn', 0.3, 3.3);
  scene9.addChild(scaleNote);

  scene9.setTransition('crosswarp', 0.5);
  creator.addChild(scene9);
  console.log(colors.green('  ✓ Scene 9: The Message (5s)'));

  // ============================================
  // SCENE 10: CTA & END CARD (6s)
  // ============================================
  const scene10 = new FFScene();
  scene10.setBgColor(COLORS.darkCharcoal);
  scene10.setDuration(6);

  // Receipt-style end card
  const endReceipt = new FFRect({ color: COLORS.receiptPaper, width: 900, height: 1500, x: width/2, y: height/2 });
  endReceipt.addEffect('fadeIn', 0.4, 0.1);
  scene10.addChild(endReceipt);

  // Header
  const endHeader = new FFText({ text: '═══════════════════════', x: width/2, y: 280, fontSize: 28 });
  endHeader.setColor(COLORS.mediumGray);
  endHeader.alignCenter();
  endHeader.addEffect('fadeIn', 0.3, 0.3);
  scene10.addChild(endHeader);

  const seriesTitle = new FFText({ text: 'BILLIONAIRE', x: width/2, y: 380, fontSize: 80 });
  seriesTitle.setColor(COLORS.darkCharcoal);
  seriesTitle.alignCenter();
  seriesTitle.addEffect('backInDown', 0.5, 0.4);
  scene10.addChild(seriesTitle);

  const seriesTitle2 = new FFText({ text: 'PULSE', x: width/2, y: 490, fontSize: 90 });
  seriesTitle2.setColor(COLORS.moneyGreen);
  seriesTitle2.alignCenter();
  seriesTitle2.addEffect('backInDown', 0.5, 0.6);
  scene10.addChild(seriesTitle2);

  const endLine = new FFText({ text: '═══════════════════════', x: width/2, y: 580, fontSize: 28 });
  endLine.setColor(COLORS.mediumGray);
  endLine.alignCenter();
  endLine.addEffect('fadeIn', 0.3, 0.8);
  scene10.addChild(endLine);

  // Data viz icon
  const chartIcon = new FFText({ text: '📊', x: width/2, y: 700, fontSize: 80 });
  chartIcon.alignCenter();
  chartIcon.addEffect('bounceIn', 0.5, 1);
  scene10.addChild(chartIcon);

  // CTA Box
  const ctaBox = new FFRect({ color: COLORS.moneyGreen, width: 750, height: 180, x: width/2, y: 920 });
  ctaBox.addEffect('zoomIn', 0.5, 1.4);
  scene10.addChild(ctaBox);

  const ctaText1 = new FFText({ text: '👆 FOLLOW FOR MORE', x: width/2, y: 885, fontSize: 42 });
  ctaText1.setColor(COLORS.white);
  ctaText1.alignCenter();
  ctaText1.addEffect('fadeIn', 0.3, 1.6);
  scene10.addChild(ctaText1);

  const ctaText2 = new FFText({ text: 'DATA STORIES', x: width/2, y: 955, fontSize: 48 });
  ctaText2.setColor(COLORS.darkCharcoal);
  ctaText2.alignCenter();
  ctaText2.addEffect('bounceIn', 0.4, 1.8);
  scene10.addChild(ctaText2);

  // Hashtags
  const hashtags = new FFText({ text: '#WealthGap #DataViz #BillionairePulse', x: width/2, y: 1100, fontSize: 28 });
  hashtags.setColor(COLORS.corporateBlue);
  hashtags.alignCenter();
  hashtags.addEffect('fadeIn', 0.4, 2.2);
  scene10.addChild(hashtags);

  // Social actions
  const social = new FFText({ text: '❤️ LIKE  💬 COMMENT  🔄 SHARE', x: width/2, y: 1220, fontSize: 32 });
  social.setColor(COLORS.darkCharcoal);
  social.alignCenter();
  social.addEffect('fadeInUp', 0.4, 2.6);
  scene10.addChild(social);

  // Story count
  const storyNum = new FFText({ text: 'STORY 5 OF 30', x: width/2, y: 1350, fontSize: 28 });
  storyNum.setColor(COLORS.lightGray);
  storyNum.alignCenter();
  storyNum.addEffect('fadeIn', 0.3, 3);
  scene10.addChild(storyNum);

  // Receipt footer
  const footerLine = new FFText({ text: '- - - - - - - - - - - - - - - - - -', x: width/2, y: 1450, fontSize: 24 });
  footerLine.setColor(COLORS.lightGray);
  footerLine.alignCenter();
  footerLine.addEffect('fadeIn', 0.3, 3.3);
  scene10.addChild(footerLine);

  const thankYou = new FFText({ text: 'THANK YOU FOR WATCHING', x: width/2, y: 1520, fontSize: 24 });
  thankYou.setColor(COLORS.mediumGray);
  thankYou.alignCenter();
  thankYou.addEffect('fadeIn', 0.3, 3.5);
  scene10.addChild(thankYou);

  // Money icons
  const money1 = new FFText({ text: '💰', x: 200, y: 1650, fontSize: 50 });
  money1.addEffect('bounceIn', 0.4, 3.8);
  scene10.addChild(money1);

  const money2 = new FFText({ text: '💵', x: width/2, y: 1650, fontSize: 50 });
  money2.alignCenter();
  money2.addEffect('bounceIn', 0.4, 4);
  scene10.addChild(money2);

  const money3 = new FFText({ text: '💰', x: width - 200, y: 1650, fontSize: 50 });
  money3.addEffect('bounceIn', 0.4, 4.2);
  scene10.addChild(money3);

  creator.addChild(scene10);
  console.log(colors.green('  ✓ Scene 10: CTA & End Card (6s)'));

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
    console.log(colors.magenta('\n🎬 "Billionaire Pulse: Wealth Comparison" complete!\n'));
  });

  creator.start();
}

// Run the video creation
createBillionairePulseVideo().catch(err => {
  console.error(colors.red('Error creating video:'), err);
});

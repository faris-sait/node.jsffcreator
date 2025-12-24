/**
 * 🎬 STORY 13: "Minimalist Listicle" - Informative
 * 
 * The Story: "3 Books That Will Change Your Mindset."
 * 
 * Visual Style:
 * - Clean, white-space heavy, Apple-style aesthetic
 * - Smooth lower thirds with soft shadows
 * - Slide transitions
 * - Large bold numbers (01, 02, 03) that stay fixed
 * - Background images slide behind the numbers
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~45 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-13-minimalist-listicle.js
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
// COLOR PALETTE - Minimalist/Apple-Style Theme
// ============================================
const COLORS = {
  // Base whites and grays
  pureWhite: '#ffffff',
  offWhite: '#fafafa',
  lightGray: '#f5f5f7',
  mediumGray: '#e8e8ed',
  softGray: '#d2d2d7',
  
  // Text colors
  darkText: '#1d1d1f',
  mediumText: '#424245',
  lightText: '#86868b',
  
  // Accent colors (subtle)
  accentBlue: '#0071e3',
  accentPurple: '#5e5ce6',
  accentGreen: '#34c759',
  
  // Shadow colors
  shadowLight: 'rgba(0, 0, 0, 0.04)',
  shadowMedium: 'rgba(0, 0, 0, 0.08)',
  shadowDark: 'rgba(0, 0, 0, 0.12)',
  
  // Book cover colors
  book1Color: '#2c3e50',
  book2Color: '#8e44ad',
  book3Color: '#16a085'
};

// ============================================
// HELPER: Add soft shadow card
// ============================================
function addShadowCard(scene, x, y, w, h, delay = 0) {
  // Shadow layer
  const shadow = new FFRect({ color: COLORS.shadowMedium, width: w + 8, height: h + 8, x: x + 4, y: y + 4 });
  shadow.addEffect('fadeIn', 0.3, delay);
  scene.addChild(shadow);
  
  // Main card
  const card = new FFRect({ color: COLORS.pureWhite, width: w, height: h, x: x, y: y });
  card.addEffect('fadeIn', 0.3, delay + 0.05);
  scene.addChild(card);
  
  return card;
}

// ============================================
// HELPER: Add lower third
// ============================================
function addLowerThird(scene, title, subtitle, delay = 0) {
  // Lower third background
  const lowerBg = new FFRect({ color: COLORS.pureWhite, width: 900, height: 180, x: width/2, y: height - 250 });
  lowerBg.addEffect('fadeInUp', 0.5, delay);
  scene.addChild(lowerBg);
  
  // Shadow
  const lowerShadow = new FFRect({ color: COLORS.shadowLight, width: 900, height: 10, x: width/2, y: height - 340 });
  lowerShadow.addEffect('fadeIn', 0.3, delay + 0.1);
  scene.addChild(lowerShadow);
  
  // Title
  const titleText = new FFText({ text: title, x: width/2, y: height - 280, fontSize: 32 });
  titleText.setColor(COLORS.darkText);
  titleText.alignCenter();
  titleText.addEffect('fadeIn', 0.4, delay + 0.2);
  scene.addChild(titleText);
  
  // Subtitle
  const subtitleText = new FFText({ text: subtitle, x: width/2, y: height - 220, fontSize: 24 });
  subtitleText.setColor(COLORS.lightText);
  subtitleText.alignCenter();
  subtitleText.addEffect('fadeIn', 0.4, delay + 0.3);
  scene.addChild(subtitleText);
}

// ============================================
// HELPER: Add progress indicator
// ============================================
function addProgressIndicator(scene, current, total, delay = 0) {
  const dotSpacing = 40;
  const startX = width/2 - ((total - 1) * dotSpacing) / 2;
  
  for (let i = 0; i < total; i++) {
    const dotColor = i < current ? COLORS.accentBlue : COLORS.softGray;
    const dotSize = i === current - 1 ? 14 : 10;
    
    const dot = new FFRect({ color: dotColor, width: dotSize, height: dotSize, x: startX + (i * dotSpacing), y: height - 100 });
    dot.addEffect('fadeIn', 0.2, delay + (i * 0.05));
    scene.addChild(dot);
  }
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createMinimalistListicleVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 13: "Minimalist Listicle"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~45 seconds'));
  console.log(colors.yellow('🎨 Theme: Informative - Apple-Style Minimalist\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-13-minimalist-listicle.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: INTRO - Title Card (7s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.offWhite);
  scene1.setDuration(7);

  // Clean white background
  const introBg = new FFRect({ color: COLORS.lightGray, width: 1100, height: 2000, x: width/2, y: height/2 });
  introBg.addEffect('fadeIn', 0.3, 0);
  scene1.addChild(introBg);

  // Subtle top accent line
  const accentLine = new FFRect({ color: COLORS.accentBlue, width: 100, height: 6, x: width/2, y: 350 });
  accentLine.addEffect('zoomIn', 0.5, 0.3);
  scene1.addChild(accentLine);

  // Main title
  const mainTitle = new FFText({ text: '3 BOOKS', x: width/2, y: 500, fontSize: 90 });
  mainTitle.setColor(COLORS.darkText);
  mainTitle.alignCenter();
  mainTitle.addEffect('fadeIn', 0.6, 0.5);
  scene1.addChild(mainTitle);

  const subTitle1 = new FFText({ text: 'THAT WILL CHANGE', x: width/2, y: 620, fontSize: 42 });
  subTitle1.setColor(COLORS.mediumText);
  subTitle1.alignCenter();
  subTitle1.addEffect('fadeIn', 0.5, 0.8);
  scene1.addChild(subTitle1);

  const subTitle2 = new FFText({ text: 'YOUR MINDSET', x: width/2, y: 700, fontSize: 60 });
  subTitle2.setColor(COLORS.darkText);
  subTitle2.alignCenter();
  subTitle2.addEffect('fadeIn', 0.5, 1.1);
  scene1.addChild(subTitle2);

  // Book emoji row
  const bookEmojis = ['📚', '📖', '📕'];
  bookEmojis.forEach((emoji, i) => {
    const emojiText = new FFText({ text: emoji, x: 340 + (i * 200), y: 900, fontSize: 70 });
    emojiText.alignCenter();
    emojiText.addEffect('bounceIn', 0.4, 2 + (i * 0.2));
    scene1.addChild(emojiText);
  });

  // Intro card
  const introCard = addShadowCard(scene1, width/2, 1150, 800, 200, 2.5);

  const introCardText1 = new FFText({ text: 'Curated for', x: width/2, y: 1110, fontSize: 28 });
  introCardText1.setColor(COLORS.lightText);
  introCardText1.alignCenter();
  introCardText1.addEffect('fadeIn', 0.4, 2.8);
  scene1.addChild(introCardText1);

  const introCardText2 = new FFText({ text: 'Personal Growth', x: width/2, y: 1170, fontSize: 38 });
  introCardText2.setColor(COLORS.darkText);
  introCardText2.alignCenter();
  introCardText2.addEffect('fadeIn', 0.4, 3);
  scene1.addChild(introCardText2);

  // Swipe hint
  const swipeHint = new FFText({ text: 'Swipe to explore →', x: width/2, y: 1450, fontSize: 24 });
  swipeHint.setColor(COLORS.lightText);
  swipeHint.alignCenter();
  swipeHint.addEffect('fadeIn', 0.5, 4);
  scene1.addChild(swipeHint);

  // Progress indicator
  addProgressIndicator(scene1, 0, 3, 4.5);

  scene1.setTransition('fade', 0.6);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Intro - Title Card (7s)'));

  // ============================================
  // SCENE 2: BOOK 1 - Atomic Habits (10s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.offWhite);
  scene2.setDuration(10);

  // Clean background
  const book1Bg = new FFRect({ color: COLORS.lightGray, width: 1100, height: 2000, x: width/2, y: height/2 });
  book1Bg.addEffect('fadeIn', 0.3, 0);
  scene2.addChild(book1Bg);

  // Large fixed number
  const number1 = new FFText({ text: '01', x: width/2, y: 350, fontSize: 200 });
  number1.setColor(COLORS.mediumGray);
  number1.alignCenter();
  number1.addEffect('fadeIn', 0.5, 0.2);
  scene2.addChild(number1);

  // Book cover card
  const bookCard1 = addShadowCard(scene2, width/2, 700, 350, 500, 0.5);

  // Book cover
  const bookCover1 = new FFRect({ color: COLORS.book1Color, width: 300, height: 420, x: width/2, y: 680 });
  bookCover1.addEffect('fadeIn', 0.4, 0.7);
  scene2.addChild(bookCover1);

  // Book title on cover
  const bookCoverTitle1 = new FFText({ text: 'ATOMIC', x: width/2, y: 620, fontSize: 40 });
  bookCoverTitle1.setColor(COLORS.pureWhite);
  bookCoverTitle1.alignCenter();
  bookCoverTitle1.addEffect('fadeIn', 0.3, 0.9);
  scene2.addChild(bookCoverTitle1);

  const bookCoverTitle1b = new FFText({ text: 'HABITS', x: width/2, y: 680, fontSize: 48 });
  bookCoverTitle1b.setColor(COLORS.pureWhite);
  bookCoverTitle1b.alignCenter();
  bookCoverTitle1b.addEffect('fadeIn', 0.3, 1);
  scene2.addChild(bookCoverTitle1b);

  // Author
  const author1 = new FFText({ text: 'James Clear', x: width/2, y: 780, fontSize: 24 });
  author1.setColor('rgba(255,255,255,0.8)');
  author1.alignCenter();
  author1.addEffect('fadeIn', 0.3, 1.1);
  scene2.addChild(author1);

  // Book info card
  const infoCard1 = addShadowCard(scene2, width/2, 1150, 850, 280, 1.5);

  const bookTitle1 = new FFText({ text: 'Atomic Habits', x: width/2, y: 1070, fontSize: 44 });
  bookTitle1.setColor(COLORS.darkText);
  bookTitle1.alignCenter();
  bookTitle1.addEffect('fadeIn', 0.4, 1.8);
  scene2.addChild(bookTitle1);

  const bookAuthor1 = new FFText({ text: 'by James Clear', x: width/2, y: 1130, fontSize: 26 });
  bookAuthor1.setColor(COLORS.lightText);
  bookAuthor1.alignCenter();
  bookAuthor1.addEffect('fadeIn', 0.3, 2);
  scene2.addChild(bookAuthor1);

  // Key insight
  const insight1Box = new FFRect({ color: COLORS.accentBlue, width: 700, height: 60, x: width/2, y: 1210 });
  insight1Box.addEffect('fadeIn', 0.4, 2.5);
  scene2.addChild(insight1Box);

  const insight1 = new FFText({ text: '"Small habits, remarkable results"', x: width/2, y: 1210, fontSize: 24 });
  insight1.setColor(COLORS.pureWhite);
  insight1.alignCenter();
  insight1.addEffect('fadeIn', 0.3, 2.7);
  scene2.addChild(insight1);

  // Lower third
  addLowerThird(scene2, 'Build better habits', 'The compound effect of 1% improvements', 3.5);

  // Progress indicator
  addProgressIndicator(scene2, 1, 3, 0.5);

  scene2.setTransition('moveright', 0.6);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Book 1 - Atomic Habits (10s)'));

  // ============================================
  // SCENE 3: BOOK 2 - Thinking Fast and Slow (10s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.offWhite);
  scene3.setDuration(10);

  // Clean background
  const book2Bg = new FFRect({ color: COLORS.lightGray, width: 1100, height: 2000, x: width/2, y: height/2 });
  book2Bg.addEffect('fadeIn', 0.3, 0);
  scene3.addChild(book2Bg);

  // Large fixed number
  const number2 = new FFText({ text: '02', x: width/2, y: 350, fontSize: 200 });
  number2.setColor(COLORS.mediumGray);
  number2.alignCenter();
  number2.addEffect('fadeIn', 0.5, 0.2);
  scene3.addChild(number2);

  // Book cover card
  const bookCard2 = addShadowCard(scene3, width/2, 700, 350, 500, 0.5);

  // Book cover
  const bookCover2 = new FFRect({ color: COLORS.book2Color, width: 300, height: 420, x: width/2, y: 680 });
  bookCover2.addEffect('fadeIn', 0.4, 0.7);
  scene3.addChild(bookCover2);

  // Book title on cover
  const bookCoverTitle2 = new FFText({ text: 'THINKING', x: width/2, y: 600, fontSize: 32 });
  bookCoverTitle2.setColor(COLORS.pureWhite);
  bookCoverTitle2.alignCenter();
  bookCoverTitle2.addEffect('fadeIn', 0.3, 0.9);
  scene3.addChild(bookCoverTitle2);

  const bookCoverTitle2b = new FFText({ text: 'FAST &', x: width/2, y: 660, fontSize: 40 });
  bookCoverTitle2b.setColor(COLORS.pureWhite);
  bookCoverTitle2b.alignCenter();
  bookCoverTitle2b.addEffect('fadeIn', 0.3, 1);
  scene3.addChild(bookCoverTitle2b);

  const bookCoverTitle2c = new FFText({ text: 'SLOW', x: width/2, y: 720, fontSize: 48 });
  bookCoverTitle2c.setColor(COLORS.pureWhite);
  bookCoverTitle2c.alignCenter();
  bookCoverTitle2c.addEffect('fadeIn', 0.3, 1.1);
  scene3.addChild(bookCoverTitle2c);

  // Author
  const author2 = new FFText({ text: 'Daniel Kahneman', x: width/2, y: 800, fontSize: 22 });
  author2.setColor('rgba(255,255,255,0.8)');
  author2.alignCenter();
  author2.addEffect('fadeIn', 0.3, 1.2);
  scene3.addChild(author2);

  // Book info card
  const infoCard2 = addShadowCard(scene3, width/2, 1150, 850, 280, 1.5);

  const bookTitle2 = new FFText({ text: 'Thinking, Fast and Slow', x: width/2, y: 1070, fontSize: 40 });
  bookTitle2.setColor(COLORS.darkText);
  bookTitle2.alignCenter();
  bookTitle2.addEffect('fadeIn', 0.4, 1.8);
  scene3.addChild(bookTitle2);

  const bookAuthor2 = new FFText({ text: 'by Daniel Kahneman', x: width/2, y: 1130, fontSize: 26 });
  bookAuthor2.setColor(COLORS.lightText);
  bookAuthor2.alignCenter();
  bookAuthor2.addEffect('fadeIn', 0.3, 2);
  scene3.addChild(bookAuthor2);

  // Key insight
  const insight2Box = new FFRect({ color: COLORS.accentPurple, width: 700, height: 60, x: width/2, y: 1210 });
  insight2Box.addEffect('fadeIn', 0.4, 2.5);
  scene3.addChild(insight2Box);

  const insight2 = new FFText({ text: '"Understand your two minds"', x: width/2, y: 1210, fontSize: 24 });
  insight2.setColor(COLORS.pureWhite);
  insight2.alignCenter();
  insight2.addEffect('fadeIn', 0.3, 2.7);
  scene3.addChild(insight2);

  // Lower third
  addLowerThird(scene3, 'Master decision-making', 'System 1 vs System 2 thinking', 3.5);

  // Progress indicator
  addProgressIndicator(scene3, 2, 3, 0.5);

  scene3.setTransition('moveright', 0.6);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Book 2 - Thinking Fast and Slow (10s)'));

  // ============================================
  // SCENE 4: BOOK 3 - The Psychology of Money (10s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.offWhite);
  scene4.setDuration(10);

  // Clean background
  const book3Bg = new FFRect({ color: COLORS.lightGray, width: 1100, height: 2000, x: width/2, y: height/2 });
  book3Bg.addEffect('fadeIn', 0.3, 0);
  scene4.addChild(book3Bg);

  // Large fixed number
  const number3 = new FFText({ text: '03', x: width/2, y: 350, fontSize: 200 });
  number3.setColor(COLORS.mediumGray);
  number3.alignCenter();
  number3.addEffect('fadeIn', 0.5, 0.2);
  scene4.addChild(number3);

  // Book cover card
  const bookCard3 = addShadowCard(scene4, width/2, 700, 350, 500, 0.5);

  // Book cover
  const bookCover3 = new FFRect({ color: COLORS.book3Color, width: 300, height: 420, x: width/2, y: 680 });
  bookCover3.addEffect('fadeIn', 0.4, 0.7);
  scene4.addChild(bookCover3);

  // Book title on cover
  const bookCoverTitle3 = new FFText({ text: 'THE', x: width/2, y: 600, fontSize: 28 });
  bookCoverTitle3.setColor(COLORS.pureWhite);
  bookCoverTitle3.alignCenter();
  bookCoverTitle3.addEffect('fadeIn', 0.3, 0.9);
  scene4.addChild(bookCoverTitle3);

  const bookCoverTitle3b = new FFText({ text: 'PSYCHOLOGY', x: width/2, y: 660, fontSize: 36 });
  bookCoverTitle3b.setColor(COLORS.pureWhite);
  bookCoverTitle3b.alignCenter();
  bookCoverTitle3b.addEffect('fadeIn', 0.3, 1);
  scene4.addChild(bookCoverTitle3b);

  const bookCoverTitle3c = new FFText({ text: 'OF MONEY', x: width/2, y: 720, fontSize: 40 });
  bookCoverTitle3c.setColor(COLORS.pureWhite);
  bookCoverTitle3c.alignCenter();
  bookCoverTitle3c.addEffect('fadeIn', 0.3, 1.1);
  scene4.addChild(bookCoverTitle3c);

  // Author
  const author3 = new FFText({ text: 'Morgan Housel', x: width/2, y: 800, fontSize: 22 });
  author3.setColor('rgba(255,255,255,0.8)');
  author3.alignCenter();
  author3.addEffect('fadeIn', 0.3, 1.2);
  scene4.addChild(author3);

  // Book info card
  const infoCard3 = addShadowCard(scene4, width/2, 1150, 850, 280, 1.5);

  const bookTitle3 = new FFText({ text: 'The Psychology of Money', x: width/2, y: 1070, fontSize: 40 });
  bookTitle3.setColor(COLORS.darkText);
  bookTitle3.alignCenter();
  bookTitle3.addEffect('fadeIn', 0.4, 1.8);
  scene4.addChild(bookTitle3);

  const bookAuthor3 = new FFText({ text: 'by Morgan Housel', x: width/2, y: 1130, fontSize: 26 });
  bookAuthor3.setColor(COLORS.lightText);
  bookAuthor3.alignCenter();
  bookAuthor3.addEffect('fadeIn', 0.3, 2);
  scene4.addChild(bookAuthor3);

  // Key insight
  const insight3Box = new FFRect({ color: COLORS.accentGreen, width: 700, height: 60, x: width/2, y: 1210 });
  insight3Box.addEffect('fadeIn', 0.4, 2.5);
  scene4.addChild(insight3Box);

  const insight3 = new FFText({ text: '"Wealth is what you don\'t see"', x: width/2, y: 1210, fontSize: 24 });
  insight3.setColor(COLORS.pureWhite);
  insight3.alignCenter();
  insight3.addEffect('fadeIn', 0.3, 2.7);
  scene4.addChild(insight3);

  // Lower third
  addLowerThird(scene4, 'Rethink wealth', 'Timeless lessons on money & behavior', 3.5);

  // Progress indicator
  addProgressIndicator(scene4, 3, 3, 0.5);

  scene4.setTransition('fade', 0.6);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Book 3 - The Psychology of Money (10s)'));

  // ============================================
  // SCENE 5: OUTRO - CTA & Summary (8s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.offWhite);
  scene5.setDuration(8);

  // Clean background
  const outroBg = new FFRect({ color: COLORS.lightGray, width: 1100, height: 2000, x: width/2, y: height/2 });
  outroBg.addEffect('fadeIn', 0.3, 0);
  scene5.addChild(outroBg);

  // Summary title
  const summaryTitle = new FFText({ text: 'YOUR READING LIST', x: width/2, y: 250, fontSize: 44 });
  summaryTitle.setColor(COLORS.darkText);
  summaryTitle.alignCenter();
  summaryTitle.addEffect('fadeIn', 0.5, 0.3);
  scene5.addChild(summaryTitle);

  // Accent line
  const summaryLine = new FFRect({ color: COLORS.accentBlue, width: 80, height: 4, x: width/2, y: 310 });
  summaryLine.addEffect('zoomIn', 0.4, 0.5);
  scene5.addChild(summaryLine);

  // Book summary cards
  const summaryBooks = [
    { num: '01', title: 'Atomic Habits', color: COLORS.book1Color, y: 450 },
    { num: '02', title: 'Thinking, Fast and Slow', color: COLORS.book2Color, y: 620 },
    { num: '03', title: 'Psychology of Money', color: COLORS.book3Color, y: 790 }
  ];

  summaryBooks.forEach((book, i) => {
    // Card
    const card = addShadowCard(scene5, width/2, book.y, 850, 120, 0.8 + (i * 0.3));

    // Number
    const numText = new FFText({ text: book.num, x: 200, y: book.y, fontSize: 48 });
    numText.setColor(book.color);
    numText.alignCenter();
    numText.addEffect('fadeIn', 0.3, 1 + (i * 0.3));
    scene5.addChild(numText);

    // Title
    const titleText = new FFText({ text: book.title, x: 580, y: book.y, fontSize: 30 });
    titleText.setColor(COLORS.darkText);
    titleText.alignCenter();
    titleText.addEffect('fadeIn', 0.3, 1.1 + (i * 0.3));
    scene5.addChild(titleText);

    // Check mark
    const check = new FFText({ text: '✓', x: 920, y: book.y, fontSize: 36 });
    check.setColor(COLORS.accentGreen);
    check.alignCenter();
    check.addEffect('bounceIn', 0.3, 1.3 + (i * 0.3));
    scene5.addChild(check);
  });

  // CTA Card
  const ctaCard = addShadowCard(scene5, width/2, 1050, 800, 180, 2.5);

  const ctaText1 = new FFText({ text: 'Save this list 📚', x: width/2, y: 1020, fontSize: 36 });
  ctaText1.setColor(COLORS.darkText);
  ctaText1.alignCenter();
  ctaText1.addEffect('fadeIn', 0.4, 2.8);
  scene5.addChild(ctaText1);

  const ctaText2 = new FFText({ text: 'Follow for more book recommendations', x: width/2, y: 1080, fontSize: 24 });
  ctaText2.setColor(COLORS.lightText);
  ctaText2.alignCenter();
  ctaText2.addEffect('fadeIn', 0.4, 3);
  scene5.addChild(ctaText2);

  // Follow button
  const followBtn = new FFRect({ color: COLORS.accentBlue, width: 250, height: 60, x: width/2, y: 1250 });
  followBtn.addEffect('zoomIn', 0.4, 3.5);
  scene5.addChild(followBtn);

  const followText = new FFText({ text: 'FOLLOW', x: width/2, y: 1250, fontSize: 28 });
  followText.setColor(COLORS.pureWhite);
  followText.alignCenter();
  followText.addEffect('fadeIn', 0.3, 3.7);
  scene5.addChild(followText);

  // Engagement icons
  const engageText = new FFText({ text: '❤️  💬  🔄  📌', x: width/2, y: 1400, fontSize: 36 });
  engageText.alignCenter();
  engageText.addEffect('fadeIn', 0.4, 4);
  scene5.addChild(engageText);

  // Hashtags
  const hashText = new FFText({ text: '#BookRecommendations #MindsetBooks #Reading', x: width/2, y: 1500, fontSize: 22 });
  hashText.setColor(COLORS.lightText);
  hashText.alignCenter();
  hashText.addEffect('fadeIn', 0.4, 4.5);
  scene5.addChild(hashText);

  // Story count
  const storyCount = new FFText({ text: 'STORY 13 OF 30', x: width/2, y: 1700, fontSize: 22 });
  storyCount.setColor(COLORS.softGray);
  storyCount.alignCenter();
  storyCount.addEffect('fadeIn', 0.4, 5);
  scene5.addChild(storyCount);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Outro - CTA & Summary (8s)'));

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
    console.log(colors.magenta('\n🎬 Story 13: "Minimalist Listicle" complete!\n'));
  });

  creator.start();
}

createMinimalistListicleVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

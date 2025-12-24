/**
 * 🎬 STORY 21: "Magazine Flip" - Fashion Editorial
 * 
 * The Story: A model posing in different streetwear looks, 
 * presented as a physical magazine being flipped through.
 * 
 * Visual Style:
 * - High-fashion, glossy magazine aesthetic
 * - White borders and clean layouts
 * - Halftone patterns for texture
 * - Drop caps and editorial typography
 * - Vogue-style cover headlines
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~45 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-21-magazine-flip.js
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
// COLOR PALETTE - Fashion Magazine Theme
// ============================================
const COLORS = {
  // Magazine colors
  white: '#ffffff',
  offWhite: '#fafafa',
  paperWhite: '#f5f5f5',
  creamWhite: '#fef9f3',
  
  // Fashion blacks
  black: '#000000',
  richBlack: '#0a0a0a',
  charcoal: '#1a1a1a',
  darkGray: '#2d2d2d',
  
  // Accent colors
  fashionRed: '#c41e3a',
  elegantGold: '#d4af37',
  luxuryPurple: '#4a154b',
  modernGray: '#6b6b6b',
  
  // Text colors
  headlineBlack: '#000000',
  bodyGray: '#4a4a4a',
  captionGray: '#7a7a7a',
  
  // Halftone
  halftoneGray: 'rgba(0, 0, 0, 0.1)',
  halftoneDark: 'rgba(0, 0, 0, 0.2)'
};

// ============================================
// HELPER: Add Magazine Border
// ============================================
function addMagazineBorder(scene, delay = 0) {
  // Outer white border
  const borderOuter = new FFRect({ color: COLORS.white, width: 1080, height: 1920, x: width/2, y: height/2 });
  borderOuter.addEffect('fadeIn', 0.3, delay);
  scene.addChild(borderOuter);
  
  // Inner content area
  const contentArea = new FFRect({ color: COLORS.offWhite, width: 980, height: 1820, x: width/2, y: height/2 });
  contentArea.addEffect('fadeIn', 0.2, delay + 0.1);
  scene.addChild(contentArea);
  
  // Thin black border accent
  const accentBorder = new FFRect({ color: COLORS.black, width: 960, height: 1800, x: width/2, y: height/2 });
  accentBorder.addEffect('fadeIn', 0.2, delay + 0.2);
  scene.addChild(accentBorder);
  
  // Final white content
  const finalContent = new FFRect({ color: COLORS.white, width: 950, height: 1790, x: width/2, y: height/2 });
  finalContent.addEffect('fadeIn', 0.2, delay + 0.3);
  scene.addChild(finalContent);
}

// ============================================
// HELPER: Add Halftone Pattern
// ============================================
function addHalftonePattern(scene, x, y, w, h, delay = 0) {
  const rows = Math.floor(h / 15);
  const cols = Math.floor(w / 15);
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const dotSize = 2 + Math.random() * 4;
      const dot = new FFRect({ 
        color: COLORS.halftoneGray, 
        width: dotSize, 
        height: dotSize, 
        x: x - w/2 + (col * 15) + 7, 
        y: y - h/2 + (row * 15) + 7 
      });
      dot.addEffect('fadeIn', 0.2, delay + (row * 0.01));
      scene.addChild(dot);
    }
  }
}

// ============================================
// HELPER: Add Drop Cap
// ============================================
function addDropCap(scene, letter, x, y, delay = 0) {
  // Drop cap background
  const dropCapBg = new FFRect({ color: COLORS.black, width: 100, height: 100, x: x, y: y });
  dropCapBg.addEffect('zoomIn', 0.4, delay);
  scene.addChild(dropCapBg);
  
  // Drop cap letter
  const dropCapText = new FFText({ text: letter, x: x, y: y, fontSize: 80 });
  dropCapText.setColor(COLORS.white);
  dropCapText.alignCenter();
  dropCapText.addEffect('bounceIn', 0.4, delay + 0.2);
  scene.addChild(dropCapText);
}

// ============================================
// HELPER: Add Vogue-Style Headline
// ============================================
function addVogueHeadline(scene, mainText, subText, y, delay = 0) {
  // Main headline
  const headline = new FFText({ text: mainText, x: width/2, y: y, fontSize: 70 });
  headline.setColor(COLORS.headlineBlack);
  headline.alignCenter();
  headline.addEffect('fadeInDown', 0.5, delay);
  scene.addChild(headline);
  
  // Underline
  const underline = new FFRect({ color: COLORS.fashionRed, width: 400, height: 4, x: width/2, y: y + 50 });
  underline.addEffect('zoomIn', 0.4, delay + 0.3);
  scene.addChild(underline);
  
  // Subtext
  if (subText) {
    const sub = new FFText({ text: subText, x: width/2, y: y + 90, fontSize: 28 });
    sub.setColor(COLORS.bodyGray);
    sub.alignCenter();
    sub.addEffect('fadeIn', 0.4, delay + 0.5);
    scene.addChild(sub);
  }
}

// ============================================
// HELPER: Add Page Number
// ============================================
function addPageNumber(scene, pageNum, delay = 0) {
  const pageText = new FFText({ text: `${pageNum}`, x: width/2, y: 1850, fontSize: 32 });
  pageText.setColor(COLORS.captionGray);
  pageText.alignCenter();
  pageText.addEffect('fadeIn', 0.3, delay);
  scene.addChild(pageText);
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createMagazineFlipVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 21: "Magazine Flip"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~45 seconds'));
  console.log(colors.yellow('🎨 Theme: Fashion Editorial - Magazine Flip\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-21-magazine-flip.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: COVER - Magazine Front (9s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.white);
  scene1.setDuration(9);

  // Magazine border
  addMagazineBorder(scene1, 0.3);

  // Magazine title (like VOGUE)
  const magTitle = new FFText({ text: 'STYLE', x: width/2, y: 200, fontSize: 120 });
  magTitle.setColor(COLORS.black);
  magTitle.alignCenter();
  magTitle.addEffect('fadeInDown', 0.6, 1);
  scene1.addChild(magTitle);

  // Issue info
  const issueInfo = new FFText({ text: 'ISSUE 21 • FALL 2024', x: width/2, y: 300, fontSize: 24 });
  issueInfo.setColor(COLORS.bodyGray);
  issueInfo.alignCenter();
  issueInfo.addEffect('fadeIn', 0.4, 1.5);
  scene1.addChild(issueInfo);

  // Model representation (fashion silhouette)
  const modelBg = new FFRect({ color: COLORS.charcoal, width: 700, height: 900, x: width/2, y: 850 });
  modelBg.addEffect('zoomIn', 0.7, 2);
  scene1.addChild(modelBg);

  // Model icon
  const modelIcon = new FFText({ text: '👤', x: width/2, y: 850, fontSize: 300 });
  modelIcon.alignCenter();
  modelIcon.addEffect('fadeIn', 0.5, 2.5);
  scene1.addChild(modelIcon);

  // Cover headline
  const coverHeadline = new FFRect({ color: COLORS.fashionRed, width: 800, height: 120, x: width/2, y: 1400 });
  coverHeadline.addEffect('zoomIn', 0.5, 3);
  scene1.addChild(coverHeadline);

  const coverText1 = new FFText({ text: 'STREET STYLE', x: width/2, y: 1370, fontSize: 50 });
  coverText1.setColor(COLORS.white);
  coverText1.alignCenter();
  coverText1.addEffect('fadeIn', 0.4, 3.3);
  scene1.addChild(coverText1);

  const coverText2 = new FFText({ text: 'REVOLUTION', x: width/2, y: 1430, fontSize: 45 });
  coverText2.setColor(COLORS.white);
  coverText2.alignCenter();
  coverText2.addEffect('fadeIn', 0.4, 3.6);
  scene1.addChild(coverText2);

  // Cover lines
  const coverLines = [
    'Urban Elegance Redefined',
    'The New Wave of Fashion',
    '5 Looks That Define 2024'
  ];

  coverLines.forEach((line, i) => {
    const lineText = new FFText({ text: line, x: width/2, y: 1580 + (i * 50), fontSize: 26 });
    lineText.setColor(COLORS.bodyGray);
    lineText.alignCenter();
    lineText.addEffect('fadeIn', 0.3, 4.5 + (i * 0.3));
    scene1.addChild(lineText);
  });

  // Barcode
  const barcode = new FFRect({ color: COLORS.black, width: 200, height: 60, x: width/2, y: 1800 });
  barcode.addEffect('fadeIn', 0.3, 5.5);
  scene1.addChild(barcode);

  scene1.setTransition('directionalwarp', 0.6);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Cover - Magazine Front (9s)'));

  // ============================================
  // SCENE 2: PAGE 1 - Look #1 "Urban Minimal" (9s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.white);
  scene2.setDuration(9);

  // Magazine border
  addMagazineBorder(scene2, 0.2);

  // Halftone background texture
  addHalftonePattern(scene2, width/2, 600, 900, 800, 0.5);

  // Drop cap
  addDropCap(scene2, 'U', 150, 250, 1);

  // Headline
  addVogueHeadline(scene2, 'URBAN MINIMAL', 'The Art of Less', 250, 1.5);

  // Model area
  const look1Bg = new FFRect({ color: COLORS.offWhite, width: 750, height: 900, x: width/2, y: 900 });
  look1Bg.addEffect('fadeIn', 0.5, 2);
  scene2.addChild(look1Bg);

  // Model representation - minimalist
  const model1Body = new FFRect({ color: COLORS.black, width: 300, height: 600, x: width/2, y: 900 });
  model1Body.addEffect('fadeInUp', 0.6, 2.5);
  scene2.addChild(model1Body);

  // Accessories
  const accessory1 = new FFRect({ color: COLORS.modernGray, width: 150, height: 150, x: width/2 - 100, y: 700 });
  accessory1.addEffect('fadeIn', 0.4, 3);
  scene2.addChild(accessory1);

  const accessory2 = new FFRect({ color: COLORS.darkGray, width: 120, height: 200, x: width/2 + 120, y: 750 });
  accessory2.addEffect('fadeIn', 0.4, 3.3);
  scene2.addChild(accessory2);

  // Fashion details
  const details = [
    { text: '• Oversized Blazer', y: 1400 },
    { text: '• Tailored Trousers', y: 1460 },
    { text: '• Minimalist Sneakers', y: 1520 }
  ];

  details.forEach((detail, i) => {
    const detailText = new FFText({ text: detail.text, x: 200, y: detail.y, fontSize: 28 });
    detailText.setColor(COLORS.bodyGray);
    detailText.setAnchor(0, 0.5);
    detailText.addEffect('fadeInLeft', 0.4, 4 + (i * 0.3));
    scene2.addChild(detailText);
  });

  // Quote box
  const quoteBox = new FFRect({ color: COLORS.fashionRed, width: 600, height: 100, x: width/2, y: 1680 });
  quoteBox.addEffect('zoomIn', 0.4, 5);
  scene2.addChild(quoteBox);

  const quote = new FFText({ text: '"Less is always more"', x: width/2, y: 1680, fontSize: 32 });
  quote.setColor(COLORS.white);
  quote.alignCenter();
  quote.addEffect('fadeIn', 0.3, 5.3);
  scene2.addChild(quote);

  // Page number
  addPageNumber(scene2, '02', 6);

  scene2.setTransition('windowslice', 0.6);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Page 1 - Look #1 "Urban Minimal" (9s)'));

  // ============================================
  // SCENE 3: PAGE 2 - Look #2 "Bold Statement" (9s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.white);
  scene3.setDuration(9);

  // Magazine border
  addMagazineBorder(scene3, 0.2);

  // Drop cap
  addDropCap(scene3, 'B', 150, 250, 1);

  // Headline
  addVogueHeadline(scene3, 'BOLD STATEMENT', 'Color Blocking Mastery', 250, 1.5);

  // Colorful background blocks
  const colorBlock1 = new FFRect({ color: COLORS.fashionRed, width: 400, height: 400, x: 300, y: 700 });
  colorBlock1.addEffect('fadeInLeft', 0.5, 2);
  scene3.addChild(colorBlock1);

  const colorBlock2 = new FFRect({ color: COLORS.elegantGold, width: 400, height: 400, x: 780, y: 900 });
  colorBlock2.addEffect('fadeInRight', 0.5, 2.3);
  scene3.addChild(colorBlock2);

  const colorBlock3 = new FFRect({ color: COLORS.luxuryPurple, width: 400, height: 400, x: 300, y: 1100 });
  colorBlock3.addEffect('fadeInLeft', 0.5, 2.6);
  scene3.addChild(colorBlock3);

  // Model silhouette
  const model2 = new FFRect({ color: COLORS.black, width: 350, height: 700, x: width/2, y: 900 });
  model2.addEffect('zoomIn', 0.6, 3);
  scene3.addChild(model2);

  // Bold accessories
  const boldAcc1 = new FFRect({ color: COLORS.fashionRed, width: 100, height: 100, x: width/2 - 150, y: 650 });
  boldAcc1.addEffect('bounceIn', 0.4, 3.5);
  scene3.addChild(boldAcc1);

  const boldAcc2 = new FFRect({ color: COLORS.elegantGold, width: 80, height: 120, x: width/2 + 150, y: 680 });
  boldAcc2.addEffect('bounceIn', 0.4, 3.8);
  scene3.addChild(boldAcc2);

  // Fashion details
  const boldDetails = [
    { text: '• Statement Jacket', y: 1450 },
    { text: '• Vibrant Accessories', y: 1510 },
    { text: '• Confidence is Key', y: 1570 }
  ];

  boldDetails.forEach((detail, i) => {
    const detailText = new FFText({ text: detail.text, x: 200, y: detail.y, fontSize: 28 });
    detailText.setColor(COLORS.bodyGray);
    detailText.setAnchor(0, 0.5);
    detailText.addEffect('fadeInLeft', 0.4, 4.5 + (i * 0.3));
    scene3.addChild(detailText);
  });

  // Quote
  const quoteBox2 = new FFRect({ color: COLORS.black, width: 700, height: 100, x: width/2, y: 1720 });
  quoteBox2.addEffect('zoomIn', 0.4, 5.5);
  scene3.addChild(quoteBox2);

  const quote2 = new FFText({ text: '"Make them stop and stare"', x: width/2, y: 1720, fontSize: 30 });
  quote2.setColor(COLORS.elegantGold);
  quote2.alignCenter();
  quote2.addEffect('fadeIn', 0.3, 5.8);
  scene3.addChild(quote2);

  // Page number
  addPageNumber(scene3, '04', 6);

  scene3.setTransition('crosswarp', 0.6);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Page 2 - Look #2 "Bold Statement" (9s)'));

  // ============================================
  // SCENE 4: PAGE 3 - Look #3 "Vintage Revival" (9s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.creamWhite);
  scene4.setDuration(9);

  // Magazine border
  addMagazineBorder(scene4, 0.2);

  // Vintage halftone pattern
  addHalftonePattern(scene4, width/2, height/2, 900, 1700, 0.3);

  // Drop cap
  addDropCap(scene4, 'V', 150, 250, 1);

  // Headline
  addVogueHeadline(scene4, 'VINTAGE REVIVAL', 'Timeless Elegance Returns', 250, 1.5);

  // Vintage frame
  const vintageFrame = new FFRect({ color: COLORS.darkGray, width: 700, height: 900, x: width/2, y: 900 });
  vintageFrame.addEffect('zoomIn', 0.6, 2);
  scene4.addChild(vintageFrame);

  const vintageInner = new FFRect({ color: COLORS.offWhite, width: 650, height: 850, x: width/2, y: 900 });
  vintageInner.addEffect('fadeIn', 0.4, 2.3);
  scene4.addChild(vintageInner);

  // Model - vintage style
  const model3 = new FFRect({ color: COLORS.charcoal, width: 280, height: 650, x: width/2, y: 900 });
  model3.addEffect('fadeInUp', 0.6, 2.8);
  scene4.addChild(model3);

  // Vintage accessories
  const vintageHat = new FFRect({ color: COLORS.darkGray, width: 200, height: 80, x: width/2, y: 600 });
  vintageHat.addEffect('fadeInDown', 0.4, 3.3);
  scene4.addChild(vintageHat);

  const vintageBag = new FFRect({ color: COLORS.elegantGold, width: 100, height: 120, x: width/2 + 180, y: 1000 });
  vintageBag.addEffect('fadeIn', 0.4, 3.6);
  scene4.addChild(vintageBag);

  // Fashion details
  const vintageDetails = [
    { text: '• Classic Trench Coat', y: 1450 },
    { text: '• Retro Sunglasses', y: 1510 },
    { text: '• Leather Handbag', y: 1570 }
  ];

  vintageDetails.forEach((detail, i) => {
    const detailText = new FFText({ text: detail.text, x: 200, y: detail.y, fontSize: 28 });
    detailText.setColor(COLORS.bodyGray);
    detailText.setAnchor(0, 0.5);
    detailText.addEffect('fadeInLeft', 0.4, 4.5 + (i * 0.3));
    scene4.addChild(detailText);
  });

  // Quote
  const quoteBox3 = new FFRect({ color: COLORS.elegantGold, width: 650, height: 100, x: width/2, y: 1720 });
  quoteBox3.addEffect('zoomIn', 0.4, 5.5);
  scene4.addChild(quoteBox3);

  const quote3 = new FFText({ text: '"Old is the new gold"', x: width/2, y: 1720, fontSize: 34 });
  quote3.setColor(COLORS.white);
  quote3.alignCenter();
  quote3.addEffect('fadeIn', 0.3, 5.8);
  scene4.addChild(quote3);

  // Page number
  addPageNumber(scene4, '06', 6);

  scene4.setTransition('slice', 0.6);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Page 3 - Look #3 "Vintage Revival" (9s)'));

  // ============================================
  // SCENE 5: BACK COVER - Subscribe & Follow (9s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.black);
  scene5.setDuration(9);

  // Magazine border (inverted)
  const borderOuter5 = new FFRect({ color: COLORS.black, width: 1080, height: 1920, x: width/2, y: height/2 });
  borderOuter5.addEffect('fadeIn', 0.3, 0);
  scene5.addChild(borderOuter5);

  const contentArea5 = new FFRect({ color: COLORS.charcoal, width: 980, height: 1820, x: width/2, y: height/2 });
  contentArea5.addEffect('fadeIn', 0.2, 0.1);
  scene5.addChild(contentArea5);

  const accentBorder5 = new FFRect({ color: COLORS.white, width: 960, height: 1800, x: width/2, y: height/2 });
  accentBorder5.addEffect('fadeIn', 0.2, 0.2);
  scene5.addChild(accentBorder5);

  const finalContent5 = new FFRect({ color: COLORS.black, width: 950, height: 1790, x: width/2, y: height/2 });
  finalContent5.addEffect('fadeIn', 0.2, 0.3);
  scene5.addChild(finalContent5);

  // Magazine logo
  const backLogo = new FFText({ text: 'STYLE', x: width/2, y: 300, fontSize: 100 });
  backLogo.setColor(COLORS.white);
  backLogo.alignCenter();
  backLogo.addEffect('fadeInDown', 0.6, 1);
  scene5.addChild(backLogo);

  // Tagline
  const tagline = new FFText({ text: 'MAGAZINE', x: width/2, y: 400, fontSize: 36 });
  tagline.setColor(COLORS.elegantGold);
  tagline.alignCenter();
  tagline.addEffect('fadeIn', 0.4, 1.5);
  scene5.addChild(tagline);

  // Divider
  const divider = new FFRect({ color: COLORS.fashionRed, width: 500, height: 4, x: width/2, y: 480 });
  divider.addEffect('zoomIn', 0.4, 2);
  scene5.addChild(divider);

  // Main message
  const mainBox = new FFRect({ color: COLORS.fashionRed, width: 800, height: 300, x: width/2, y: 750 });
  mainBox.addEffect('zoomIn', 0.6, 2.5);
  scene5.addChild(mainBox);

  const mainText1 = new FFText({ text: 'SUBSCRIBE', x: width/2, y: 680, fontSize: 70 });
  mainText1.setColor(COLORS.white);
  mainText1.alignCenter();
  mainText1.addEffect('bounceIn', 0.5, 3);
  scene5.addChild(mainText1);

  const mainText2 = new FFText({ text: 'FOR MORE', x: width/2, y: 780, fontSize: 60 });
  mainText2.setColor(COLORS.white);
  mainText2.alignCenter();
  mainText2.addEffect('fadeIn', 0.4, 3.3);
  scene5.addChild(mainText2);

  const mainText3 = new FFText({ text: 'FASHION', x: width/2, y: 860, fontSize: 55 });
  mainText3.setColor(COLORS.elegantGold);
  mainText3.alignCenter();
  mainText3.addEffect('fadeIn', 0.4, 3.6);
  scene5.addChild(mainText3);

  // Features
  const features = [
    { text: '✓ Weekly Style Guides', y: 1050 },
    { text: '✓ Exclusive Lookbooks', y: 1120 },
    { text: '✓ Fashion Trends 2024', y: 1190 },
    { text: '✓ Designer Interviews', y: 1260 }
  ];

  features.forEach((feature, i) => {
    const featureText = new FFText({ text: feature.text, x: width/2, y: feature.y, fontSize: 32 });
    featureText.setColor(COLORS.white);
    featureText.alignCenter();
    featureText.addEffect('fadeInLeft', 0.4, 4.5 + (i * 0.2));
    scene5.addChild(featureText);
  });

  // CTA Box
  const ctaBox = new FFRect({ color: COLORS.elegantGold, width: 700, height: 120, x: width/2, y: 1450 });
  ctaBox.addEffect('zoomIn', 0.5, 5.5);
  scene5.addChild(ctaBox);

  const ctaText = new FFText({ text: '👆 FOLLOW FOR MORE LOOKS', x: width/2, y: 1450, fontSize: 38 });
  ctaText.setColor(COLORS.black);
  ctaText.alignCenter();
  ctaText.addEffect('bounceIn', 0.4, 6);
  scene5.addChild(ctaText);

  // Social media
  const socialBox = new FFRect({ color: 'rgba(255, 255, 255, 0.1)', width: 750, height: 100, x: width/2, y: 1620 });
  socialBox.addEffect('fadeIn', 0.4, 6.5);
  scene5.addChild(socialBox);

  const socialText = new FFText({ text: '@StyleMagazine', x: width/2, y: 1620, fontSize: 32 });
  socialText.setColor(COLORS.white);
  socialText.alignCenter();
  socialText.addEffect('fadeIn', 0.3, 6.8);
  scene5.addChild(socialText);

  // Hashtags
  const hashtags = new FFText({ text: '#Fashion #Streetwear #Style2024', x: width/2, y: 1750, fontSize: 26 });
  hashtags.setColor(COLORS.modernGray);
  hashtags.alignCenter();
  hashtags.addEffect('fadeIn', 0.4, 7);
  scene5.addChild(hashtags);

  // Issue info
  const issueEnd = new FFText({ text: 'ISSUE 21 • FALL 2024', x: width/2, y: 1850, fontSize: 22 });
  issueEnd.setColor(COLORS.captionGray);
  issueEnd.alignCenter();
  issueEnd.addEffect('fadeIn', 0.3, 7.5);
  scene5.addChild(issueEnd);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Back Cover - Subscribe & Follow (9s)'));

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
    console.log(colors.magenta('\n🎬 Story 21: "Magazine Flip" complete!\n'));
  });

  creator.start();
}

createMagazineFlipVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

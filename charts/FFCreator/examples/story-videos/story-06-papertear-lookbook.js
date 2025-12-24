/**
 * 🎬 STORY 6: "Paper-Tear Lookbook" - Fashion/Handmade
 * 
 * The Story: A model changes outfits by "ripping" the screen away 
 * to reveal the next layer.
 * 
 * Visual Style:
 * - Scrapbook aesthetic with stop-motion feel
 * - Torn paper edges and texture
 * - "Scotch Tape" graphics pinning text descriptions
 * - Handmade, crafty vibe
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~35 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-06-papertear-lookbook.js
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
// COLOR PALETTE - Scrapbook/Handmade
// ============================================
const COLORS = {
  // Paper colors
  corkBoard: '#c4a574',
  kraftPaper: '#d4a574',
  creamPaper: '#f5f0e6',
  whitePaper: '#fefefe',
  tornEdge: '#e8e0d0',
  
  // Scotch tape
  tapeYellow: 'rgba(255, 235, 150, 0.7)',
  tapeClear: 'rgba(255, 255, 255, 0.4)',
  
  // Accent colors
  vintageRed: '#c94c4c',
  dustyPink: '#e8b4b8',
  sageGreen: '#9caf88',
  mustardYellow: '#d4a03c',
  denimBlue: '#5b7fa3',
  
  // Text
  inkBlack: '#2c2c2c',
  pencilGray: '#5a5a5a',
  markerRed: '#d63031'
};

// ============================================
// OUTFIT DATA
// ============================================
const OUTFITS = [
  { name: 'LOOK 01', style: 'CASUAL CHIC', desc: 'Oversized blazer + vintage denim', color: COLORS.denimBlue },
  { name: 'LOOK 02', style: 'STREET STYLE', desc: 'Graphic tee + cargo pants', color: COLORS.sageGreen },
  { name: 'LOOK 03', style: 'EVENING GLAM', desc: 'Silk slip dress + statement earrings', color: COLORS.dustyPink }
];

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createPaperTearLookbookVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 6: "Paper-Tear Lookbook"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~35 seconds (5 scenes)'));
  console.log(colors.yellow('🎨 Theme: Fashion/Handmade - Scrapbook Aesthetic\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-06-papertear-lookbook.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: COVER PAGE - Scrapbook Title (6s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.corkBoard);
  scene1.setDuration(6);

  // Cork board background texture simulation
  for (let i = 0; i < 30; i++) {
    const speckle = new FFRect({ 
      color: i % 2 === 0 ? '#b8956a' : '#d4b896', 
      width: 20 + Math.random() * 40, 
      height: 20 + Math.random() * 40, 
      x: Math.random() * width, 
      y: Math.random() * height 
    });
    speckle.addEffect('fadeIn', 0.2, Math.random() * 0.5);
    scene1.addChild(speckle);
  }

  // Main paper card
  const mainPaper = new FFRect({ color: COLORS.creamPaper, width: 900, height: 1400, x: width/2, y: height/2 });
  mainPaper.addEffect('zoomIn', 0.6, 0.3);
  scene1.addChild(mainPaper);

  // Paper shadow
  const paperShadow = new FFRect({ color: 'rgba(0,0,0,0.15)', width: 900, height: 1400, x: width/2 + 15, y: height/2 + 15 });
  paperShadow.addEffect('zoomIn', 0.5, 0.2);
  scene1.addChild(paperShadow);

  // Re-add paper on top
  const mainPaperTop = new FFRect({ color: COLORS.creamPaper, width: 900, height: 1400, x: width/2, y: height/2 });
  mainPaperTop.addEffect('zoomIn', 0.6, 0.3);
  scene1.addChild(mainPaperTop);

  // Torn edge effect - top
  const tornTop = new FFRect({ color: COLORS.tornEdge, width: 920, height: 30, x: width/2, y: 290 });
  tornTop.addEffect('fadeIn', 0.3, 0.5);
  scene1.addChild(tornTop);

  // Torn edge effect - bottom
  const tornBottom = new FFRect({ color: COLORS.tornEdge, width: 920, height: 30, x: width/2, y: height - 290 });
  tornBottom.addEffect('fadeIn', 0.3, 0.5);
  scene1.addChild(tornBottom);

  // Scotch tape - top left
  const tape1 = new FFRect({ color: COLORS.tapeYellow, width: 150, height: 40, x: 250, y: 320 });
  tape1.addEffect('fadeIn', 0.3, 0.7);
  scene1.addChild(tape1);

  // Scotch tape - top right
  const tape2 = new FFRect({ color: COLORS.tapeYellow, width: 150, height: 40, x: width - 250, y: 320 });
  tape2.addEffect('fadeIn', 0.3, 0.8);
  scene1.addChild(tape2);

  // Title - handwritten style
  const titleText = new FFText({ text: '✂️ LOOKBOOK', x: width/2, y: 500, fontSize: 90 });
  titleText.setColor(COLORS.inkBlack);
  titleText.alignCenter();
  titleText.addEffect('bounceIn', 0.6, 1);
  scene1.addChild(titleText);

  // Season tag with tape
  const seasonTape = new FFRect({ color: COLORS.tapeClear, width: 350, height: 50, x: width/2, y: 620 });
  seasonTape.addEffect('fadeIn', 0.3, 1.3);
  scene1.addChild(seasonTape);

  const seasonText = new FFText({ text: 'FALL / WINTER', x: width/2, y: 650, fontSize: 40 });
  seasonText.setColor(COLORS.pencilGray);
  seasonText.alignCenter();
  seasonText.addEffect('fadeIn', 0.4, 1.4);
  scene1.addChild(seasonText);

  // Decorative elements
  const star1 = new FFText({ text: '★', x: 300, y: 800, fontSize: 50 });
  star1.setColor(COLORS.mustardYellow);
  star1.addEffect('rotateIn', 0.4, 1.6);
  scene1.addChild(star1);

  const star2 = new FFText({ text: '★', x: width - 300, y: 850, fontSize: 40 });
  star2.setColor(COLORS.vintageRed);
  star2.addEffect('rotateIn', 0.4, 1.8);
  scene1.addChild(star2);

  // Outfit count
  const outfitCount = new FFText({ text: '3 LOOKS', x: width/2, y: 950, fontSize: 60 });
  outfitCount.setColor(COLORS.markerRed);
  outfitCount.alignCenter();
  outfitCount.addEffect('fadeInUp', 0.5, 2);
  scene1.addChild(outfitCount);

  // Swipe hint with arrow
  const swipeHint = new FFText({ text: '→ SWIPE TO REVEAL →', x: width/2, y: 1150, fontSize: 32 });
  swipeHint.setColor(COLORS.pencilGray);
  swipeHint.alignCenter();
  swipeHint.addEffect('fadeIn', 0.4, 2.5);
  scene1.addChild(swipeHint);

  // Doodle hearts
  const heart1 = new FFText({ text: '♡', x: 350, y: 1300, fontSize: 40 });
  heart1.setColor(COLORS.dustyPink);
  heart1.addEffect('bounceIn', 0.3, 2.8);
  scene1.addChild(heart1);

  const heart2 = new FFText({ text: '♡', x: width - 350, y: 1280, fontSize: 35 });
  heart2.setColor(COLORS.dustyPink);
  heart2.addEffect('bounceIn', 0.3, 3);
  scene1.addChild(heart2);

  // Push pins
  const pin1 = new FFRect({ color: COLORS.vintageRed, width: 25, height: 25, x: 200, y: 400 });
  pin1.addEffect('zoomIn', 0.3, 3.2);
  scene1.addChild(pin1);

  const pin2 = new FFRect({ color: COLORS.sageGreen, width: 25, height: 25, x: width - 200, y: 1500 });
  pin2.addEffect('zoomIn', 0.3, 3.4);
  scene1.addChild(pin2);

  scene1.setTransition('windowslice', 0.6);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Cover Page - Scrapbook Title (6s)'));

  // ============================================
  // SCENE 2: LOOK 01 - Casual Chic (7s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.kraftPaper);
  scene2.setDuration(7);

  // Kraft paper background
  const kraftBg = new FFRect({ color: COLORS.kraftPaper, width: 1100, height: 2000, x: width/2, y: height/2 });
  kraftBg.addEffect('fadeIn', 0.3, 0);
  scene2.addChild(kraftBg);

  // Paper texture dots
  for (let i = 0; i < 20; i++) {
    const dot = new FFRect({ 
      color: '#c49a6c', 
      width: 5 + Math.random() * 10, 
      height: 5 + Math.random() * 10, 
      x: Math.random() * width, 
      y: Math.random() * height 
    });
    dot.addEffect('fadeIn', 0.2, Math.random() * 0.3);
    scene2.addChild(dot);
  }

  // Torn paper reveal effect - simulated layers
  const tornLayer1 = new FFRect({ color: COLORS.creamPaper, width: 950, height: 1700, x: width/2, y: height/2 });
  tornLayer1.addEffect('fadeIn', 0.4, 0.2);
  scene2.addChild(tornLayer1);

  // Torn edge strips
  const tornStrip1 = new FFRect({ color: COLORS.tornEdge, width: 30, height: 1700, x: 95, y: height/2 });
  tornStrip1.addEffect('fadeIn', 0.3, 0.3);
  scene2.addChild(tornStrip1);

  const tornStrip2 = new FFRect({ color: COLORS.tornEdge, width: 30, height: 1700, x: width - 95, y: height/2 });
  tornStrip2.addEffect('fadeIn', 0.3, 0.3);
  scene2.addChild(tornStrip2);

  // Look number with tape
  const lookTape = new FFRect({ color: COLORS.tapeYellow, width: 250, height: 80, x: width/2, y: 280 });
  lookTape.addEffect('fadeIn', 0.3, 0.5);
  scene2.addChild(lookTape);

  const lookNum = new FFText({ text: 'LOOK 01', x: width/2, y: 280, fontSize: 50 });
  lookNum.setColor(COLORS.inkBlack);
  lookNum.alignCenter();
  lookNum.addEffect('fadeIn', 0.3, 0.6);
  scene2.addChild(lookNum);

  // Outfit silhouette placeholder (fashion figure)
  const outfitBg = new FFRect({ color: COLORS.denimBlue, width: 400, height: 800, x: width/2, y: 750 });
  outfitBg.addEffect('zoomIn', 0.5, 0.8);
  scene2.addChild(outfitBg);

  // Fashion figure icon
  const figureIcon = new FFText({ text: '👤', x: width/2, y: 750, fontSize: 200 });
  figureIcon.alignCenter();
  figureIcon.addEffect('fadeIn', 0.4, 1);
  scene2.addChild(figureIcon);

  // Style name with scotch tape
  const styleTape = new FFRect({ color: COLORS.tapeClear, width: 400, height: 60, x: width/2, y: 1250 });
  styleTape.addEffect('fadeIn', 0.3, 1.5);
  scene2.addChild(styleTape);

  const styleBox = new FFRect({ color: COLORS.whitePaper, width: 380, height: 80, x: width/2, y: 1280 });
  styleBox.addEffect('fadeIn', 0.3, 1.6);
  scene2.addChild(styleBox);

  const styleName = new FFText({ text: 'CASUAL CHIC', x: width/2, y: 1280, fontSize: 44 });
  styleName.setColor(COLORS.inkBlack);
  styleName.alignCenter();
  styleName.addEffect('fadeIn', 0.3, 1.7);
  scene2.addChild(styleName);

  // Description with tape pinned
  const descTape1 = new FFRect({ color: COLORS.tapeYellow, width: 100, height: 30, x: 300, y: 1400 });
  descTape1.addEffect('fadeIn', 0.2, 2);
  scene2.addChild(descTape1);

  const descTape2 = new FFRect({ color: COLORS.tapeYellow, width: 100, height: 30, x: width - 300, y: 1400 });
  descTape2.addEffect('fadeIn', 0.2, 2.1);
  scene2.addChild(descTape2);

  const descBox = new FFRect({ color: COLORS.whitePaper, width: 700, height: 120, x: width/2, y: 1450 });
  descBox.addEffect('fadeIn', 0.3, 2.2);
  scene2.addChild(descBox);

  const descText = new FFText({ text: 'Oversized blazer', x: width/2, y: 1420, fontSize: 32 });
  descText.setColor(COLORS.pencilGray);
  descText.alignCenter();
  descText.addEffect('fadeIn', 0.3, 2.4);
  scene2.addChild(descText);

  const descText2 = new FFText({ text: '+ vintage denim', x: width/2, y: 1470, fontSize: 32 });
  descText2.setColor(COLORS.pencilGray);
  descText2.alignCenter();
  descText2.addEffect('fadeIn', 0.3, 2.6);
  scene2.addChild(descText2);

  // Decorative stickers
  const sticker1 = new FFText({ text: '✨', x: 200, y: 600, fontSize: 50 });
  sticker1.addEffect('bounceIn', 0.3, 3);
  scene2.addChild(sticker1);

  const sticker2 = new FFText({ text: '💙', x: width - 200, y: 900, fontSize: 45 });
  sticker2.addEffect('bounceIn', 0.3, 3.2);
  scene2.addChild(sticker2);

  // Handwritten arrow
  const arrow = new FFText({ text: '↓ tear to see more', x: width/2, y: 1650, fontSize: 28 });
  arrow.setColor(COLORS.markerRed);
  arrow.alignCenter();
  arrow.addEffect('fadeIn', 0.4, 3.5);
  scene2.addChild(arrow);

  scene2.setTransition('windowshades', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Look 01 - Casual Chic (7s)'));

  // ============================================
  // SCENE 3: LOOK 02 - Street Style (7s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.corkBoard);
  scene3.setDuration(7);

  // Cork board with paper layers
  const corkBg = new FFRect({ color: COLORS.corkBoard, width: 1100, height: 2000, x: width/2, y: height/2 });
  corkBg.addEffect('fadeIn', 0.2, 0);
  scene3.addChild(corkBg);

  // Torn paper pieces scattered
  const tornPiece1 = new FFRect({ color: COLORS.creamPaper, width: 200, height: 150, x: 150, y: 200 });
  tornPiece1.addEffect('rotateIn', 0.4, 0.2);
  scene3.addChild(tornPiece1);

  const tornPiece2 = new FFRect({ color: COLORS.whitePaper, width: 180, height: 120, x: width - 150, y: 250 });
  tornPiece2.addEffect('rotateIn', 0.4, 0.3);
  scene3.addChild(tornPiece2);

  // Main paper card
  const mainCard = new FFRect({ color: COLORS.whitePaper, width: 900, height: 1500, x: width/2, y: height/2 + 50 });
  mainCard.addEffect('fadeIn', 0.4, 0.4);
  scene3.addChild(mainCard);

  // Torn edges simulation
  const tornEdgeL = new FFRect({ color: COLORS.tornEdge, width: 25, height: 1500, x: 115, y: height/2 + 50 });
  tornEdgeL.addEffect('fadeIn', 0.3, 0.5);
  scene3.addChild(tornEdgeL);

  const tornEdgeR = new FFRect({ color: COLORS.tornEdge, width: 25, height: 1500, x: width - 115, y: height/2 + 50 });
  tornEdgeR.addEffect('fadeIn', 0.3, 0.5);
  scene3.addChild(tornEdgeR);

  // Look number - washi tape style
  const washiTape = new FFRect({ color: COLORS.sageGreen, width: 300, height: 70, x: width/2, y: 350 });
  washiTape.addEffect('fadeIn', 0.3, 0.6);
  scene3.addChild(washiTape);

  const lookNum3 = new FFText({ text: 'LOOK 02', x: width/2, y: 350, fontSize: 48 });
  lookNum3.setColor(COLORS.whitePaper);
  lookNum3.alignCenter();
  lookNum3.addEffect('fadeIn', 0.3, 0.7);
  scene3.addChild(lookNum3);

  // Outfit silhouette
  const outfitBg3 = new FFRect({ color: COLORS.sageGreen, width: 420, height: 780, x: width/2, y: 800 });
  outfitBg3.addEffect('zoomIn', 0.5, 0.9);
  scene3.addChild(outfitBg3);

  const figureIcon3 = new FFText({ text: '🧍', x: width/2, y: 800, fontSize: 180 });
  figureIcon3.alignCenter();
  figureIcon3.addEffect('fadeIn', 0.4, 1.1);
  scene3.addChild(figureIcon3);

  // Polaroid-style label
  const polaroidBg = new FFRect({ color: COLORS.whitePaper, width: 350, height: 130, x: width/2, y: 1300 });
  polaroidBg.addEffect('fadeIn', 0.3, 1.5);
  scene3.addChild(polaroidBg);

  // Tape on polaroid
  const polaroidTape = new FFRect({ color: COLORS.tapeYellow, width: 120, height: 35, x: width/2, y: 1240 });
  polaroidTape.addEffect('fadeIn', 0.2, 1.6);
  scene3.addChild(polaroidTape);

  const styleName3 = new FFText({ text: 'STREET STYLE', x: width/2, y: 1290, fontSize: 40 });
  styleName3.setColor(COLORS.inkBlack);
  styleName3.alignCenter();
  styleName3.addEffect('fadeIn', 0.3, 1.7);
  scene3.addChild(styleName3);

  const styleDesc3 = new FFText({ text: '~ urban vibes ~', x: width/2, y: 1340, fontSize: 28 });
  styleDesc3.setColor(COLORS.pencilGray);
  styleDesc3.alignCenter();
  styleDesc3.addEffect('fadeIn', 0.3, 1.9);
  scene3.addChild(styleDesc3);

  // Item tags with tape
  const tag1Tape = new FFRect({ color: COLORS.tapeClear, width: 80, height: 25, x: 280, y: 1450 });
  tag1Tape.addEffect('fadeIn', 0.2, 2.2);
  scene3.addChild(tag1Tape);

  const tag1 = new FFRect({ color: COLORS.creamPaper, width: 280, height: 70, x: 300, y: 1500 });
  tag1.addEffect('fadeIn', 0.3, 2.3);
  scene3.addChild(tag1);

  const tag1Text = new FFText({ text: '📦 Graphic tee', x: 300, y: 1500, fontSize: 26 });
  tag1Text.setColor(COLORS.inkBlack);
  tag1Text.alignCenter();
  tag1Text.addEffect('fadeIn', 0.2, 2.4);
  scene3.addChild(tag1Text);

  const tag2Tape = new FFRect({ color: COLORS.tapeClear, width: 80, height: 25, x: width - 280, y: 1450 });
  tag2Tape.addEffect('fadeIn', 0.2, 2.5);
  scene3.addChild(tag2Tape);

  const tag2 = new FFRect({ color: COLORS.creamPaper, width: 280, height: 70, x: width - 300, y: 1500 });
  tag2.addEffect('fadeIn', 0.3, 2.6);
  scene3.addChild(tag2);

  const tag2Text = new FFText({ text: '👖 Cargo pants', x: width - 300, y: 1500, fontSize: 26 });
  tag2Text.setColor(COLORS.inkBlack);
  tag2Text.alignCenter();
  tag2Text.addEffect('fadeIn', 0.2, 2.7);
  scene3.addChild(tag2Text);

  // Stickers
  const sticker3a = new FFText({ text: '🌿', x: 180, y: 650, fontSize: 45 });
  sticker3a.addEffect('bounceIn', 0.3, 3);
  scene3.addChild(sticker3a);

  const sticker3b = new FFText({ text: '⚡', x: width - 180, y: 950, fontSize: 50 });
  sticker3b.addEffect('bounceIn', 0.3, 3.2);
  scene3.addChild(sticker3b);

  // Page number
  const pageNum = new FFText({ text: '- 2/3 -', x: width/2, y: 1700, fontSize: 28 });
  pageNum.setColor(COLORS.pencilGray);
  pageNum.alignCenter();
  pageNum.addEffect('fadeIn', 0.3, 3.5);
  scene3.addChild(pageNum);

  scene3.setTransition('crosswarp', 0.5);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Look 02 - Street Style (7s)'));

  // ============================================
  // SCENE 4: LOOK 03 - Evening Glam (7s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.kraftPaper);
  scene4.setDuration(7);

  // Layered paper background
  const bgLayer = new FFRect({ color: COLORS.kraftPaper, width: 1100, height: 2000, x: width/2, y: height/2 });
  bgLayer.addEffect('fadeIn', 0.2, 0);
  scene4.addChild(bgLayer);

  // Decorative torn pieces
  const tornDeco1 = new FFRect({ color: COLORS.dustyPink, width: 250, height: 180, x: 180, y: 180 });
  tornDeco1.addEffect('rotateIn', 0.4, 0.1);
  scene4.addChild(tornDeco1);

  const tornDeco2 = new FFRect({ color: COLORS.creamPaper, width: 200, height: 140, x: width - 160, y: 220 });
  tornDeco2.addEffect('rotateIn', 0.4, 0.2);
  scene4.addChild(tornDeco2);

  // Main elegant paper
  const elegantPaper = new FFRect({ color: COLORS.whitePaper, width: 880, height: 1450, x: width/2, y: height/2 + 80 });
  elegantPaper.addEffect('fadeIn', 0.4, 0.3);
  scene4.addChild(elegantPaper);

  // Gold accent border
  const goldBorder = new FFRect({ color: COLORS.mustardYellow, width: 860, height: 1430, x: width/2, y: height/2 + 80 });
  goldBorder.addEffect('fadeIn', 0.3, 0.4);
  scene4.addChild(goldBorder);

  const innerPaper = new FFRect({ color: COLORS.whitePaper, width: 840, height: 1410, x: width/2, y: height/2 + 80 });
  innerPaper.addEffect('fadeIn', 0.3, 0.45);
  scene4.addChild(innerPaper);

  // Look number - elegant style
  const lookBanner = new FFRect({ color: COLORS.dustyPink, width: 320, height: 80, x: width/2, y: 400 });
  lookBanner.addEffect('zoomIn', 0.4, 0.6);
  scene4.addChild(lookBanner);

  const lookNum4 = new FFText({ text: 'LOOK 03', x: width/2, y: 400, fontSize: 48 });
  lookNum4.setColor(COLORS.whitePaper);
  lookNum4.alignCenter();
  lookNum4.addEffect('fadeIn', 0.3, 0.7);
  scene4.addChild(lookNum4);

  // Outfit silhouette - elegant
  const outfitBg4 = new FFRect({ color: COLORS.dustyPink, width: 380, height: 750, x: width/2, y: 850 });
  outfitBg4.addEffect('zoomIn', 0.5, 0.9);
  scene4.addChild(outfitBg4);

  const figureIcon4 = new FFText({ text: '👗', x: width/2, y: 850, fontSize: 180 });
  figureIcon4.alignCenter();
  figureIcon4.addEffect('fadeIn', 0.4, 1.1);
  scene4.addChild(figureIcon4);

  // Style card with tape
  const styleCard = new FFRect({ color: COLORS.creamPaper, width: 400, height: 140, x: width/2, y: 1350 });
  styleCard.addEffect('fadeIn', 0.3, 1.5);
  scene4.addChild(styleCard);

  const styleTape4a = new FFRect({ color: COLORS.tapeYellow, width: 100, height: 30, x: width/2 - 150, y: 1285 });
  styleTape4a.addEffect('fadeIn', 0.2, 1.6);
  scene4.addChild(styleTape4a);

  const styleTape4b = new FFRect({ color: COLORS.tapeYellow, width: 100, height: 30, x: width/2 + 150, y: 1285 });
  styleTape4b.addEffect('fadeIn', 0.2, 1.7);
  scene4.addChild(styleTape4b);

  const styleName4 = new FFText({ text: 'EVENING GLAM', x: width/2, y: 1330, fontSize: 44 });
  styleName4.setColor(COLORS.inkBlack);
  styleName4.alignCenter();
  styleName4.addEffect('fadeIn', 0.3, 1.8);
  scene4.addChild(styleName4);

  const styleDesc4 = new FFText({ text: '✨ sparkle & shine ✨', x: width/2, y: 1390, fontSize: 28 });
  styleDesc4.setColor(COLORS.pencilGray);
  styleDesc4.alignCenter();
  styleDesc4.addEffect('fadeIn', 0.3, 2);
  scene4.addChild(styleDesc4);

  // Item description
  const descCard4 = new FFRect({ color: COLORS.whitePaper, width: 600, height: 100, x: width/2, y: 1530 });
  descCard4.addEffect('fadeIn', 0.3, 2.3);
  scene4.addChild(descCard4);

  const descTape4 = new FFRect({ color: COLORS.tapeClear, width: 150, height: 35, x: width/2, y: 1480 });
  descTape4.addEffect('fadeIn', 0.2, 2.4);
  scene4.addChild(descTape4);

  const descText4a = new FFText({ text: 'Silk slip dress', x: width/2, y: 1510, fontSize: 28 });
  descText4a.setColor(COLORS.inkBlack);
  descText4a.alignCenter();
  descText4a.addEffect('fadeIn', 0.3, 2.5);
  scene4.addChild(descText4a);

  const descText4b = new FFText({ text: '+ statement earrings', x: width/2, y: 1555, fontSize: 26 });
  descText4b.setColor(COLORS.pencilGray);
  descText4b.alignCenter();
  descText4b.addEffect('fadeIn', 0.3, 2.7);
  scene4.addChild(descText4b);

  // Decorative elements
  const sparkle1 = new FFText({ text: '💎', x: 220, y: 700, fontSize: 40 });
  sparkle1.addEffect('bounceIn', 0.3, 3);
  scene4.addChild(sparkle1);

  const sparkle2 = new FFText({ text: '🌙', x: width - 220, y: 1000, fontSize: 45 });
  sparkle2.addEffect('bounceIn', 0.3, 3.2);
  scene4.addChild(sparkle2);

  const heart4 = new FFText({ text: '♡', x: 250, y: 1100, fontSize: 35 });
  heart4.setColor(COLORS.dustyPink);
  heart4.addEffect('bounceIn', 0.3, 3.4);
  scene4.addChild(heart4);

  // Page number
  const pageNum4 = new FFText({ text: '- 3/3 -', x: width/2, y: 1720, fontSize: 28 });
  pageNum4.setColor(COLORS.pencilGray);
  pageNum4.alignCenter();
  pageNum4.addEffect('fadeIn', 0.3, 3.6);
  scene4.addChild(pageNum4);

  scene4.setTransition('fade', 0.5);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Look 03 - Evening Glam (7s)'));

  // ============================================
  // SCENE 5: CTA & END CARD (8s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.corkBoard);
  scene5.setDuration(8);

  // Cork board background
  const corkEnd = new FFRect({ color: COLORS.corkBoard, width: 1100, height: 2000, x: width/2, y: height/2 });
  corkEnd.addEffect('fadeIn', 0.2, 0);
  scene5.addChild(corkEnd);

  // Texture
  for (let i = 0; i < 25; i++) {
    const tex = new FFRect({ 
      color: i % 2 === 0 ? '#b8956a' : '#d4b896', 
      width: 15 + Math.random() * 30, 
      height: 15 + Math.random() * 30, 
      x: Math.random() * width, 
      y: Math.random() * height 
    });
    tex.addEffect('fadeIn', 0.1, Math.random() * 0.3);
    scene5.addChild(tex);
  }

  // Main end card paper
  const endPaper = new FFRect({ color: COLORS.creamPaper, width: 850, height: 1400, x: width/2, y: height/2 });
  endPaper.addEffect('zoomIn', 0.5, 0.2);
  scene5.addChild(endPaper);

  // Torn edges
  const tornEndL = new FFRect({ color: COLORS.tornEdge, width: 20, height: 1400, x: 135, y: height/2 });
  tornEndL.addEffect('fadeIn', 0.3, 0.4);
  scene5.addChild(tornEndL);

  const tornEndR = new FFRect({ color: COLORS.tornEdge, width: 20, height: 1400, x: width - 135, y: height/2 });
  tornEndR.addEffect('fadeIn', 0.3, 0.4);
  scene5.addChild(tornEndR);

  // Multiple tape pieces
  const endTape1 = new FFRect({ color: COLORS.tapeYellow, width: 180, height: 45, x: 280, y: 310 });
  endTape1.addEffect('fadeIn', 0.2, 0.5);
  scene5.addChild(endTape1);

  const endTape2 = new FFRect({ color: COLORS.tapeYellow, width: 180, height: 45, x: width - 280, y: 310 });
  endTape2.addEffect('fadeIn', 0.2, 0.6);
  scene5.addChild(endTape2);

  // Series title
  const seriesTitle = new FFText({ text: '✂️ LOOKBOOK', x: width/2, y: 450, fontSize: 80 });
  seriesTitle.setColor(COLORS.inkBlack);
  seriesTitle.alignCenter();
  seriesTitle.addEffect('backInDown', 0.5, 0.7);
  scene5.addChild(seriesTitle);

  // Season
  const seasonEnd = new FFText({ text: 'FALL / WINTER', x: width/2, y: 550, fontSize: 36 });
  seasonEnd.setColor(COLORS.pencilGray);
  seasonEnd.alignCenter();
  seasonEnd.addEffect('fadeIn', 0.3, 1);
  scene5.addChild(seasonEnd);

  // Decorative line
  const decoLine = new FFRect({ color: COLORS.mustardYellow, width: 400, height: 6, x: width/2, y: 620 });
  decoLine.addEffect('zoomIn', 0.4, 1.2);
  scene5.addChild(decoLine);

  // Looks recap
  const recapTitle = new FFText({ text: '3 LOOKS FEATURED:', x: width/2, y: 720, fontSize: 32 });
  recapTitle.setColor(COLORS.pencilGray);
  recapTitle.alignCenter();
  recapTitle.addEffect('fadeIn', 0.3, 1.5);
  scene5.addChild(recapTitle);

  const looks = [
    { text: '01 • Casual Chic', color: COLORS.denimBlue, y: 800 },
    { text: '02 • Street Style', color: COLORS.sageGreen, y: 860 },
    { text: '03 • Evening Glam', color: COLORS.dustyPink, y: 920 }
  ];

  looks.forEach((look, i) => {
    const lookText = new FFText({ text: look.text, x: width/2, y: look.y, fontSize: 30 });
    lookText.setColor(look.color);
    lookText.alignCenter();
    lookText.addEffect('fadeInLeft', 0.3, 1.7 + (i * 0.2));
    scene5.addChild(lookText);
  });

  // CTA with tape
  const ctaTape1 = new FFRect({ color: COLORS.tapeYellow, width: 120, height: 35, x: 320, y: 1020 });
  ctaTape1.addEffect('fadeIn', 0.2, 2.4);
  scene5.addChild(ctaTape1);

  const ctaTape2 = new FFRect({ color: COLORS.tapeYellow, width: 120, height: 35, x: width - 320, y: 1020 });
  ctaTape2.addEffect('fadeIn', 0.2, 2.5);
  scene5.addChild(ctaTape2);

  const ctaBox = new FFRect({ color: COLORS.vintageRed, width: 650, height: 150, x: width/2, y: 1100 });
  ctaBox.addEffect('zoomIn', 0.5, 2.6);
  scene5.addChild(ctaBox);

  const ctaText1 = new FFText({ text: '👆 FOLLOW FOR MORE', x: width/2, y: 1070, fontSize: 38 });
  ctaText1.setColor(COLORS.whitePaper);
  ctaText1.alignCenter();
  ctaText1.addEffect('fadeIn', 0.3, 2.8);
  scene5.addChild(ctaText1);

  const ctaText2 = new FFText({ text: 'FASHION INSPO', x: width/2, y: 1130, fontSize: 42 });
  ctaText2.setColor(COLORS.whitePaper);
  ctaText2.alignCenter();
  ctaText2.addEffect('bounceIn', 0.4, 3);
  scene5.addChild(ctaText2);

  // Hashtags on paper strip
  const hashStrip = new FFRect({ color: COLORS.whitePaper, width: 700, height: 60, x: width/2, y: 1280 });
  hashStrip.addEffect('fadeIn', 0.3, 3.3);
  scene5.addChild(hashStrip);

  const hashtags = new FFText({ text: '#Lookbook #Fashion #OOTD', x: width/2, y: 1280, fontSize: 26 });
  hashtags.setColor(COLORS.pencilGray);
  hashtags.alignCenter();
  hashtags.addEffect('fadeIn', 0.3, 3.5);
  scene5.addChild(hashtags);

  // Social actions
  const social = new FFText({ text: '❤️ LIKE  💬 COMMENT  🔄 SHARE', x: width/2, y: 1400, fontSize: 30 });
  social.setColor(COLORS.inkBlack);
  social.alignCenter();
  social.addEffect('fadeInUp', 0.4, 3.8);
  scene5.addChild(social);

  // Story count
  const storyNum = new FFText({ text: 'STORY 6 OF 30', x: width/2, y: 1500, fontSize: 26 });
  storyNum.setColor(COLORS.pencilGray);
  storyNum.alignCenter();
  storyNum.addEffect('fadeIn', 0.3, 4.2);
  scene5.addChild(storyNum);

  // Decorative stickers
  const endSticker1 = new FFText({ text: '✨', x: 200, y: 1600, fontSize: 45 });
  endSticker1.addEffect('bounceIn', 0.3, 4.5);
  scene5.addChild(endSticker1);

  const endSticker2 = new FFText({ text: '💕', x: width/2, y: 1620, fontSize: 50 });
  endSticker2.alignCenter();
  endSticker2.addEffect('bounceIn', 0.3, 4.7);
  scene5.addChild(endSticker2);

  const endSticker3 = new FFText({ text: '✂️', x: width - 200, y: 1600, fontSize: 45 });
  endSticker3.addEffect('bounceIn', 0.3, 4.9);
  scene5.addChild(endSticker3);

  // Push pins
  const endPin1 = new FFRect({ color: COLORS.vintageRed, width: 20, height: 20, x: 180, y: 380 });
  endPin1.addEffect('zoomIn', 0.2, 5);
  scene5.addChild(endPin1);

  const endPin2 = new FFRect({ color: COLORS.sageGreen, width: 20, height: 20, x: width - 180, y: 1550 });
  endPin2.addEffect('zoomIn', 0.2, 5.2);
  scene5.addChild(endPin2);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: CTA & End Card (8s)'));

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
    console.log(colors.magenta('\n🎬 "Paper-Tear Lookbook: Fall/Winter" complete!\n'));
  });

  creator.start();
}

// Run the video creation
createPaperTearLookbookVideo().catch(err => {
  console.error(colors.red('Error creating video:'), err);
});

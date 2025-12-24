/**
 * 🎬 STORY 3: "Parallax Time-Travel" - History/Aesthetic
 * 
 * The Story: A 3D journey through a single 1920s photograph 
 * of a busy New York street.
 * 
 * Visual Style:
 * - Sepia-toned, grainy aesthetic with modern 3D depth
 * - Z-Axis Parallax effects simulated through layered animations
 * - Dust overlays and film grain texture
 * - "Floating Frame" with frayed edges and historical dates
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~50 seconds
 * 
 * Run with: node examples/story-videos/story-03-parallax-timetravel.js
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
// COLOR PALETTE - Sepia/Vintage Theme
// ============================================
const COLORS = {
  // Sepia tones
  darkSepia: '#1a1510',
  sepia: '#704214',
  lightSepia: '#c4a35a',
  cream: '#f5e6c8',
  warmWhite: '#faf3e0',
  
  // Vintage accents
  oldGold: '#cfb53b',
  antiqueGold: '#d4af37',
  rust: '#8b4513',
  burgundy: '#722f37',
  
  // Film grain colors
  dustBrown: '#3d2914',
  filmBlack: '#0d0a07',
  vintageWhite: '#e8dcc4',
  
  // Accent colors
  fadeBlue: '#4a6670',
  mutedRed: '#8b3a3a'
};

// Historical dates for floating effect
const HISTORICAL_DATES = [
  '1920', '1921', '1922', '1923', '1924',
  '1925', '1926', '1927', '1928', '1929'
];

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createParallaxTimeTravelVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 3: "Parallax Time-Travel"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~50 seconds'));
  console.log(colors.yellow('🎨 Theme: History/Aesthetic - 1920s New York\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-03-parallax-timetravel.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: FILM REEL INTRO (4s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.filmBlack);
  scene1.setDuration(4);

  // Film countdown aesthetic
  const countdownCircle = new FFRect({ color: COLORS.cream, width: 400, height: 400, x: width/2, y: height/2 });
  countdownCircle.addEffect('zoomIn', 0.5, 0.1);
  scene1.addChild(countdownCircle);

  const innerCircle = new FFRect({ color: COLORS.filmBlack, width: 350, height: 350, x: width/2, y: height/2 });
  innerCircle.addEffect('zoomIn', 0.4, 0.2);
  scene1.addChild(innerCircle);

  // Year display
  const yearText = new FFText({ text: '1925', x: width/2, y: height/2, fontSize: 140 });
  yearText.setColor(COLORS.cream);
  yearText.alignCenter();
  yearText.addEffect('fadeIn', 0.5, 0.5);
  scene1.addChild(yearText);

  // Film sprocket holes - left side
  for (let i = 0; i < 12; i++) {
    const sprocket = new FFRect({ color: COLORS.dustBrown, width: 40, height: 60, x: 40, y: 100 + (i * 150) });
    sprocket.addEffect('fadeIn', 0.2, 0.1 + (i * 0.05));
    scene1.addChild(sprocket);
  }

  // Film sprocket holes - right side
  for (let i = 0; i < 12; i++) {
    const sprocket = new FFRect({ color: COLORS.dustBrown, width: 40, height: 60, x: width - 40, y: 100 + (i * 150) });
    sprocket.addEffect('fadeIn', 0.2, 0.1 + (i * 0.05));
    scene1.addChild(sprocket);
  }

  // Title text
  const titleText = new FFText({ text: 'A JOURNEY THROUGH TIME', x: width/2, y: height - 400, fontSize: 48 });
  titleText.setColor(COLORS.lightSepia);
  titleText.alignCenter();
  titleText.addEffect('fadeInUp', 0.6, 1);
  scene1.addChild(titleText);

  // Subtitle
  const subText = new FFText({ text: 'NEW YORK CITY', x: width/2, y: height - 320, fontSize: 72 });
  subText.setColor(COLORS.cream);
  subText.alignCenter();
  subText.addEffect('fadeInUp', 0.6, 1.5);
  scene1.addChild(subText);

  // Dust particles simulation
  for (let i = 0; i < 15; i++) {
    const dust = new FFRect({ 
      color: COLORS.lightSepia, 
      width: 4 + Math.random() * 8, 
      height: 4 + Math.random() * 8, 
      x: Math.random() * width, 
      y: Math.random() * height 
    });
    dust.addEffect('fadeIn', 0.3, Math.random() * 2);
    dust.addEffect('fadeOut', 0.3, 2.5 + Math.random());
    scene1.addChild(dust);
  }

  scene1.setTransition('fade', 0.8);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Film Reel Intro (4s)'));

  // ============================================
  // SCENE 2: FLOATING FRAME - THE PHOTOGRAPH (6s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.darkSepia);
  scene2.setDuration(6);

  // Background texture layer
  const bgTexture = new FFRect({ color: COLORS.dustBrown, width: 1100, height: 2000, x: width/2, y: height/2 });
  bgTexture.addEffect('fadeIn', 0.5, 0);
  scene2.addChild(bgTexture);

  // Floating historical dates - background layer (parallax far)
  const floatingDates = [
    { text: '1920', x: 150, y: 200, size: 60, delay: 0.2 },
    { text: '1923', x: width - 120, y: 350, size: 50, delay: 0.4 },
    { text: '1927', x: 100, y: 1500, size: 55, delay: 0.6 },
    { text: '1929', x: width - 150, y: 1650, size: 65, delay: 0.8 },
    { text: '1925', x: 200, y: 900, size: 45, delay: 1 },
    { text: '1921', x: width - 100, y: 1100, size: 52, delay: 1.2 }
  ];

  floatingDates.forEach(date => {
    const dateText = new FFText({ text: date.text, x: date.x, y: date.y, fontSize: date.size });
    dateText.setColor(COLORS.sepia);
    dateText.addEffect('fadeIn', 0.8, date.delay);
    scene2.addChild(dateText);
  });

  // Main photograph frame - frayed edges effect
  const frameOuter = new FFRect({ color: COLORS.cream, width: 920, height: 1200, x: width/2, y: height/2 });
  frameOuter.addEffect('zoomIn', 0.8, 0.5);
  scene2.addChild(frameOuter);

  // Inner frame shadow
  const frameShadow = new FFRect({ color: COLORS.dustBrown, width: 880, height: 1160, x: width/2 + 8, y: height/2 + 8 });
  frameShadow.addEffect('zoomIn', 0.7, 0.6);
  scene2.addChild(frameShadow);

  // Photo area (sepia background representing the photo)
  const photoArea = new FFRect({ color: COLORS.lightSepia, width: 860, height: 1140, x: width/2, y: height/2 });
  photoArea.addEffect('zoomIn', 0.7, 0.7);
  scene2.addChild(photoArea);

  // Simulated photo content - buildings (parallax layers)
  // Far layer - skyline
  const skyline = new FFRect({ color: COLORS.sepia, width: 800, height: 300, x: width/2, y: 500 });
  skyline.addEffect('fadeIn', 0.5, 1);
  scene2.addChild(skyline);

  // Building silhouettes
  const buildings = [
    { w: 80, h: 400, x: 250, y: 650 },
    { w: 100, h: 500, x: 380, y: 600 },
    { w: 120, h: 450, x: 540, y: 625 },
    { w: 90, h: 380, x: 700, y: 660 },
    { w: 110, h: 520, x: 850, y: 590 }
  ];

  buildings.forEach((b, i) => {
    const building = new FFRect({ color: COLORS.dustBrown, width: b.w, height: b.h, x: b.x, y: b.y });
    building.addEffect('fadeInUp', 0.5, 1.2 + (i * 0.15));
    scene2.addChild(building);
  });

  // Street level
  const street = new FFRect({ color: COLORS.rust, width: 860, height: 200, x: width/2, y: 1050 });
  street.addEffect('fadeIn', 0.5, 1.8);
  scene2.addChild(street);

  // Caption
  const caption = new FFText({ text: '"Fifth Avenue, 1925"', x: width/2, y: height - 250, fontSize: 42 });
  caption.setColor(COLORS.cream);
  caption.alignCenter();
  caption.addEffect('fadeIn', 0.6, 2.5);
  scene2.addChild(caption);

  scene2.setTransition('directionalwarp', 0.6);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Floating Frame - The Photograph (6s)'));

  // ============================================
  // SCENE 3: ZOOM INTO THE PAST (6s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.filmBlack);
  scene3.setDuration(6);

  // Sepia background
  const sepiaBg = new FFRect({ color: COLORS.lightSepia, width: 1100, height: 2000, x: width/2, y: height/2 });
  sepiaBg.addEffect('fadeIn', 0.3, 0);
  scene3.addChild(sepiaBg);

  // Narrative text - kinetic style
  const lookCloser = new FFText({ text: 'LOOK CLOSER', x: width/2, y: 350, fontSize: 80 });
  lookCloser.setColor(COLORS.darkSepia);
  lookCloser.alignCenter();
  lookCloser.addEffect('bounceIn', 0.6, 0.2);
  scene3.addChild(lookCloser);

  // Emphasis line
  const emphLine = new FFRect({ color: COLORS.sepia, width: 500, height: 8, x: width/2, y: 430 });
  emphLine.addEffect('zoomIn', 0.4, 0.6);
  scene3.addChild(emphLine);

  // Story text blocks
  const storyLines = [
    { text: 'EVERY FACE', y: 550, size: 70, color: COLORS.dustBrown, delay: 0.8 },
    { text: 'IN THIS PHOTOGRAPH', y: 650, size: 50, color: COLORS.sepia, delay: 1.1 },
    { text: 'HAD A', y: 780, size: 60, color: COLORS.dustBrown, delay: 1.4 },
    { text: 'STORY', y: 880, size: 120, color: COLORS.darkSepia, delay: 1.7 }
  ];

  storyLines.forEach(line => {
    const text = new FFText({ text: line.text, x: width/2, y: line.y, fontSize: line.size });
    text.setColor(line.color);
    text.alignCenter();
    text.addEffect('fadeInUp', 0.5, line.delay);
    scene3.addChild(text);
  });

  // Highlight box for STORY
  const storyBox = new FFRect({ color: COLORS.oldGold, width: 450, height: 150, x: width/2, y: 880 });
  storyBox.addEffect('zoomIn', 0.4, 1.6);
  scene3.addChild(storyBox);

  const storyText = new FFText({ text: 'STORY', x: width/2, y: 880, fontSize: 120 });
  storyText.setColor(COLORS.filmBlack);
  storyText.alignCenter();
  storyText.addEffect('bounceIn', 0.5, 1.7);
  scene3.addChild(storyText);

  // Floating dates - parallax effect
  const dates3 = [
    { text: '1925', x: 80, y: 1100, size: 40 },
    { text: '1926', x: width - 100, y: 1200, size: 35 },
    { text: '1924', x: 150, y: 1400, size: 45 }
  ];

  dates3.forEach((d, i) => {
    const dateText = new FFText({ text: d.text, x: d.x, y: d.y, fontSize: d.size });
    dateText.setColor(COLORS.sepia);
    dateText.addEffect('fadeIn', 0.5, 2.5 + (i * 0.2));
    scene3.addChild(dateText);
  });

  // Bottom narrative
  const bottomText = new FFText({ text: 'A LIFE LIVED IN FULL', x: width/2, y: 1550, fontSize: 52 });
  bottomText.setColor(COLORS.dustBrown);
  bottomText.alignCenter();
  bottomText.addEffect('fadeInUp', 0.6, 3);
  scene3.addChild(bottomText);

  // Film grain dots
  for (let i = 0; i < 20; i++) {
    const grain = new FFRect({ 
      color: COLORS.dustBrown, 
      width: 3, height: 3, 
      x: Math.random() * width, 
      y: Math.random() * height 
    });
    grain.addEffect('fadeIn', 0.2, Math.random() * 3);
    scene3.addChild(grain);
  }

  scene3.setTransition('dreamy', 0.7);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Zoom Into The Past (6s)'));

  // ============================================
  // SCENE 4: THE PEOPLE - Parallax Layers (6s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.darkSepia);
  scene4.setDuration(6);

  // Background - far layer
  const farBg = new FFRect({ color: COLORS.dustBrown, width: 1100, height: 2000, x: width/2, y: height/2 });
  farBg.addEffect('fadeIn', 0.3, 0);
  scene4.addChild(farBg);

  // Title
  const peopleTitle = new FFText({ text: 'THE PEOPLE', x: width/2, y: 200, fontSize: 90 });
  peopleTitle.setColor(COLORS.cream);
  peopleTitle.alignCenter();
  peopleTitle.addEffect('backInDown', 0.6, 0.2);
  scene4.addChild(peopleTitle);

  // Subtitle
  const ofTitle = new FFText({ text: 'OF FIFTH AVENUE', x: width/2, y: 310, fontSize: 50 });
  ofTitle.setColor(COLORS.lightSepia);
  ofTitle.alignCenter();
  ofTitle.addEffect('fadeIn', 0.4, 0.6);
  scene4.addChild(ofTitle);

  // Simulated people silhouettes - different parallax depths
  // Far layer (smaller, slower)
  const farPeople = [
    { x: 200, y: 550, w: 40, h: 100 },
    { x: 350, y: 560, w: 35, h: 90 },
    { x: 700, y: 555, w: 38, h: 95 },
    { x: 880, y: 565, w: 42, h: 105 }
  ];

  farPeople.forEach((p, i) => {
    const person = new FFRect({ color: COLORS.sepia, width: p.w, height: p.h, x: p.x, y: p.y });
    person.addEffect('fadeIn', 0.4, 0.8 + (i * 0.1));
    scene4.addChild(person);
  });

  // Mid layer (medium size)
  const midPeople = [
    { x: 150, y: 750, w: 60, h: 150 },
    { x: 400, y: 760, w: 55, h: 140 },
    { x: 600, y: 745, w: 65, h: 160 },
    { x: 850, y: 755, w: 58, h: 145 }
  ];

  midPeople.forEach((p, i) => {
    const person = new FFRect({ color: COLORS.rust, width: p.w, height: p.h, x: p.x, y: p.y });
    person.addEffect('fadeInUp', 0.5, 1.2 + (i * 0.15));
    scene4.addChild(person);
  });

  // Near layer (larger, faster - foreground)
  const nearPeople = [
    { x: 250, y: 1000, w: 100, h: 250 },
    { x: 540, y: 980, w: 110, h: 270 },
    { x: 830, y: 1010, w: 95, h: 240 }
  ];

  nearPeople.forEach((p, i) => {
    const person = new FFRect({ color: COLORS.darkSepia, width: p.w, height: p.h, x: p.x, y: p.y });
    person.addEffect('fadeInUp', 0.6, 1.8 + (i * 0.2));
    scene4.addChild(person);
  });

  // Narrative text
  const narrativeBox = new FFRect({ color: COLORS.cream, width: 900, height: 200, x: width/2, y: 1400 });
  narrativeBox.addEffect('zoomIn', 0.5, 2.5);
  scene4.addChild(narrativeBox);

  const narr1 = new FFText({ text: 'BUSINESSMEN', x: width/2, y: 1360, fontSize: 50 });
  narr1.setColor(COLORS.darkSepia);
  narr1.alignCenter();
  narr1.addEffect('fadeIn', 0.3, 2.8);
  scene4.addChild(narr1);

  const narr2 = new FFText({ text: 'DREAMERS • WORKERS', x: width/2, y: 1430, fontSize: 48 });
  narr2.setColor(COLORS.sepia);
  narr2.alignCenter();
  narr2.addEffect('fadeIn', 0.3, 3.1);
  scene4.addChild(narr2);

  // Floating year
  const floatYear = new FFText({ text: '1925', x: width - 120, y: 1650, fontSize: 70 });
  floatYear.setColor(COLORS.oldGold);
  floatYear.addEffect('fadeIn', 0.5, 3.5);
  scene4.addChild(floatYear);

  scene4.setTransition('windowslice', 0.6);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: The People - Parallax Layers (6s)'));

  // ============================================
  // SCENE 5: THE ERA - Historical Context (5s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.filmBlack);
  scene5.setDuration(5);

  // Vintage paper background
  const paperBg = new FFRect({ color: COLORS.cream, width: 1000, height: 1800, x: width/2, y: height/2 });
  paperBg.addEffect('fadeIn', 0.4, 0);
  scene5.addChild(paperBg);

  // Aged edges effect
  const edgeTop = new FFRect({ color: COLORS.dustBrown, width: 1000, height: 30, x: width/2, y: 90 });
  edgeTop.addEffect('fadeIn', 0.3, 0.2);
  scene5.addChild(edgeTop);

  const edgeBottom = new FFRect({ color: COLORS.dustBrown, width: 1000, height: 30, x: width/2, y: height - 90 });
  edgeBottom.addEffect('fadeIn', 0.3, 0.2);
  scene5.addChild(edgeBottom);

  // Era title
  const eraTitle = new FFText({ text: 'THE ROARING', x: width/2, y: 300, fontSize: 70 });
  eraTitle.setColor(COLORS.sepia);
  eraTitle.alignCenter();
  eraTitle.addEffect('fadeIn', 0.4, 0.3);
  scene5.addChild(eraTitle);

  const twentiesBox = new FFRect({ color: COLORS.oldGold, width: 600, height: 150, x: width/2, y: 450 });
  twentiesBox.addEffect('zoomIn', 0.5, 0.5);
  scene5.addChild(twentiesBox);

  const twentiesText = new FFText({ text: 'TWENTIES', x: width/2, y: 450, fontSize: 100 });
  twentiesText.setColor(COLORS.filmBlack);
  twentiesText.alignCenter();
  twentiesText.addEffect('bounceIn', 0.5, 0.6);
  scene5.addChild(twentiesText);

  // Historical facts
  const facts = [
    { text: '• JAZZ AGE', y: 650, delay: 1 },
    { text: '• PROHIBITION ERA', y: 750, delay: 1.3 },
    { text: '• ART DECO', y: 850, delay: 1.6 },
    { text: '• THE GREAT GATSBY', y: 950, delay: 1.9 }
  ];

  facts.forEach(fact => {
    const factText = new FFText({ text: fact.text, x: width/2, y: fact.y, fontSize: 48 });
    factText.setColor(COLORS.dustBrown);
    factText.alignCenter();
    factText.addEffect('fadeInLeft', 0.4, fact.delay);
    scene5.addChild(factText);
  });

  // Timeline years
  const years = ['1920', '1925', '1929'];
  years.forEach((year, i) => {
    const yearText = new FFText({ text: year, x: 200 + (i * 340), y: 1150, fontSize: 50 });
    yearText.setColor(COLORS.sepia);
    yearText.alignCenter();
    yearText.addEffect('bounceIn', 0.4, 2.2 + (i * 0.2));
    scene5.addChild(yearText);
  });

  // Timeline line
  const timeline = new FFRect({ color: COLORS.rust, width: 700, height: 6, x: width/2, y: 1200 });
  timeline.addEffect('zoomIn', 0.5, 2.8);
  scene5.addChild(timeline);

  // Bottom quote
  const quote = new FFText({ text: '"A time of dreams"', x: width/2, y: 1400, fontSize: 46 });
  quote.setColor(COLORS.burgundy);
  quote.alignCenter();
  quote.addEffect('fadeIn', 0.5, 3);
  scene5.addChild(quote);

  scene5.setTransition('colorphase', 0.6);
  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: The Era - Historical Context (5s)'));

  // ============================================
  // SCENE 6: DUST & MEMORIES (5s)
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor(COLORS.darkSepia);
  scene6.setDuration(5);

  // Gradient background
  const gradBg = new FFRect({ color: COLORS.dustBrown, width: 1100, height: 2000, x: width/2, y: height/2 });
  gradBg.addEffect('fadeIn', 0.3, 0);
  scene6.addChild(gradBg);

  // Heavy dust overlay simulation
  for (let i = 0; i < 40; i++) {
    const dustSize = 2 + Math.random() * 10;
    const dust = new FFRect({ 
      color: i % 3 === 0 ? COLORS.lightSepia : COLORS.cream, 
      width: dustSize, 
      height: dustSize, 
      x: Math.random() * width, 
      y: Math.random() * height 
    });
    dust.addEffect('fadeIn', 0.3, Math.random() * 2);
    scene6.addChild(dust);
  }

  // Main text
  const dustTitle = new FFText({ text: 'DUST', x: width/2, y: 400, fontSize: 160 });
  dustTitle.setColor(COLORS.cream);
  dustTitle.alignCenter();
  dustTitle.addEffect('bounceIn', 0.6, 0.3);
  scene6.addChild(dustTitle);

  const andText = new FFText({ text: '&', x: width/2, y: 550, fontSize: 80 });
  andText.setColor(COLORS.lightSepia);
  andText.alignCenter();
  andText.addEffect('fadeIn', 0.3, 0.7);
  scene6.addChild(andText);

  const memoriesText = new FFText({ text: 'MEMORIES', x: width/2, y: 700, fontSize: 120 });
  memoriesText.setColor(COLORS.oldGold);
  memoriesText.alignCenter();
  memoriesText.addEffect('bounceIn', 0.6, 0.9);
  scene6.addChild(memoriesText);

  // Poetic lines
  const poem1 = new FFText({ text: 'Time fades the photograph', x: width/2, y: 950, fontSize: 44 });
  poem1.setColor(COLORS.cream);
  poem1.alignCenter();
  poem1.addEffect('fadeIn', 0.5, 1.5);
  scene6.addChild(poem1);

  const poem2 = new FFText({ text: 'But not the souls within', x: width/2, y: 1030, fontSize: 44 });
  poem2.setColor(COLORS.lightSepia);
  poem2.alignCenter();
  poem2.addEffect('fadeIn', 0.5, 2);
  scene6.addChild(poem2);

  // Floating frame elements
  const frameCorner1 = new FFRect({ color: COLORS.oldGold, width: 80, height: 80, x: 150, y: 1300 });
  frameCorner1.addEffect('rotateIn', 0.5, 2.5);
  scene6.addChild(frameCorner1);

  const frameCorner2 = new FFRect({ color: COLORS.oldGold, width: 80, height: 80, x: width - 150, y: 1300 });
  frameCorner2.addEffect('rotateIn', 0.5, 2.7);
  scene6.addChild(frameCorner2);

  // Year floating
  const floatYear6 = new FFText({ text: '1925', x: width/2, y: 1500, fontSize: 100 });
  floatYear6.setColor(COLORS.sepia);
  floatYear6.alignCenter();
  floatYear6.addEffect('zoomIn', 0.6, 3);
  scene6.addChild(floatYear6);

  scene6.setTransition('crosswarp', 0.6);
  creator.addChild(scene6);
  console.log(colors.green('  ✓ Scene 6: Dust & Memories (5s)'));

  // ============================================
  // SCENE 7: THE QUESTION (5s)
  // ============================================
  const scene7 = new FFScene();
  scene7.setBgColor(COLORS.filmBlack);
  scene7.setDuration(5);

  // Sepia vignette effect
  const vignette = new FFRect({ color: COLORS.darkSepia, width: 900, height: 1600, x: width/2, y: height/2 });
  vignette.addEffect('fadeIn', 0.5, 0);
  scene7.addChild(vignette);

  // Question buildup
  const whatIf = new FFText({ text: 'WHAT IF', x: width/2, y: 400, fontSize: 80 });
  whatIf.setColor(COLORS.lightSepia);
  whatIf.alignCenter();
  whatIf.addEffect('fadeIn', 0.4, 0.2);
  scene7.addChild(whatIf);

  const youCould = new FFText({ text: 'YOU COULD', x: width/2, y: 520, fontSize: 70 });
  youCould.setColor(COLORS.cream);
  youCould.alignCenter();
  youCould.addEffect('fadeInLeft', 0.4, 0.5);
  scene7.addChild(youCould);

  // Main emphasis
  const stepBox = new FFRect({ color: COLORS.oldGold, width: 700, height: 180, x: width/2, y: 750 });
  stepBox.addEffect('zoomIn', 0.5, 0.8);
  scene7.addChild(stepBox);

  const stepInto = new FFText({ text: 'STEP INTO', x: width/2, y: 710, fontSize: 60 });
  stepInto.setColor(COLORS.filmBlack);
  stepInto.alignCenter();
  stepInto.addEffect('fadeIn', 0.3, 1);
  scene7.addChild(stepInto);

  const thisPhoto = new FFText({ text: 'THIS PHOTO', x: width/2, y: 790, fontSize: 70 });
  thisPhoto.setColor(COLORS.filmBlack);
  thisPhoto.alignCenter();
  thisPhoto.addEffect('bounceIn', 0.5, 1.2);
  scene7.addChild(thisPhoto);

  // Continuation
  const andWalk = new FFText({ text: 'AND WALK', x: width/2, y: 980, fontSize: 60 });
  andWalk.setColor(COLORS.cream);
  andWalk.alignCenter();
  andWalk.addEffect('fadeInUp', 0.4, 1.8);
  scene7.addChild(andWalk);

  const thoseStreets = new FFText({ text: 'THOSE STREETS?', x: width/2, y: 1080, fontSize: 70 });
  thoseStreets.setColor(COLORS.oldGold);
  thoseStreets.alignCenter();
  thoseStreets.addEffect('bounceIn', 0.5, 2.2);
  scene7.addChild(thoseStreets);

  // Floating dates around
  const questionDates = [
    { text: '1920', x: 100, y: 300, size: 40 },
    { text: '1929', x: width - 120, y: 1300, size: 45 },
    { text: '1925', x: 150, y: 1500, size: 50 }
  ];

  questionDates.forEach((d, i) => {
    const dateText = new FFText({ text: d.text, x: d.x, y: d.y, fontSize: d.size });
    dateText.setColor(COLORS.sepia);
    dateText.addEffect('fadeIn', 0.4, 2.8 + (i * 0.2));
    scene7.addChild(dateText);
  });

  scene7.setTransition('directionalwarp', 0.6);
  creator.addChild(scene7);
  console.log(colors.green('  ✓ Scene 7: The Question (5s)'));

  // ============================================
  // SCENE 8: FINAL REVEAL - Time Travel (5s)
  // ============================================
  const scene8 = new FFScene();
  scene8.setBgColor(COLORS.darkSepia);
  scene8.setDuration(5);

  // Rich sepia background
  const richBg = new FFRect({ color: COLORS.lightSepia, width: 1100, height: 2000, x: width/2, y: height/2 });
  richBg.addEffect('fadeIn', 0.3, 0);
  scene8.addChild(richBg);

  // Title
  const parallaxTitle = new FFText({ text: 'PARALLAX', x: width/2, y: 300, fontSize: 100 });
  parallaxTitle.setColor(COLORS.darkSepia);
  parallaxTitle.alignCenter();
  parallaxTitle.addEffect('backInDown', 0.6, 0.2);
  scene8.addChild(parallaxTitle);

  const timeTravelBox = new FFRect({ color: COLORS.filmBlack, width: 800, height: 150, x: width/2, y: 480 });
  timeTravelBox.addEffect('zoomIn', 0.5, 0.5);
  scene8.addChild(timeTravelBox);

  const timeTravelText = new FFText({ text: 'TIME-TRAVEL', x: width/2, y: 480, fontSize: 90 });
  timeTravelText.setColor(COLORS.oldGold);
  timeTravelText.alignCenter();
  timeTravelText.addEffect('bounceIn', 0.6, 0.6);
  scene8.addChild(timeTravelText);

  // Layered parallax visualization
  // Far layer
  const layer1 = new FFRect({ color: COLORS.sepia, width: 800, height: 150, x: width/2, y: 700 });
  layer1.addEffect('fadeInLeft', 0.4, 1);
  scene8.addChild(layer1);
  const layer1Text = new FFText({ text: 'FAR LAYER', x: width/2, y: 700, fontSize: 36 });
  layer1Text.setColor(COLORS.cream);
  layer1Text.alignCenter();
  layer1Text.addEffect('fadeIn', 0.3, 1.2);
  scene8.addChild(layer1Text);

  // Mid layer
  const layer2 = new FFRect({ color: COLORS.rust, width: 700, height: 150, x: width/2, y: 880 });
  layer2.addEffect('fadeInRight', 0.4, 1.4);
  scene8.addChild(layer2);
  const layer2Text = new FFText({ text: 'MID LAYER', x: width/2, y: 880, fontSize: 36 });
  layer2Text.setColor(COLORS.cream);
  layer2Text.alignCenter();
  layer2Text.addEffect('fadeIn', 0.3, 1.6);
  scene8.addChild(layer2Text);

  // Near layer
  const layer3 = new FFRect({ color: COLORS.darkSepia, width: 600, height: 150, x: width/2, y: 1060 });
  layer3.addEffect('fadeInLeft', 0.4, 1.8);
  scene8.addChild(layer3);
  const layer3Text = new FFText({ text: 'NEAR LAYER', x: width/2, y: 1060, fontSize: 36 });
  layer3Text.setColor(COLORS.oldGold);
  layer3Text.alignCenter();
  layer3Text.addEffect('fadeIn', 0.3, 2);
  scene8.addChild(layer3Text);

  // Depth indicator
  const depthArrow = new FFRect({ color: COLORS.oldGold, width: 20, height: 400, x: 150, y: 880 });
  depthArrow.addEffect('fadeInDown', 0.5, 2.3);
  scene8.addChild(depthArrow);

  const depthText = new FFText({ text: 'DEPTH', x: 150, y: 1150, fontSize: 28 });
  depthText.setColor(COLORS.darkSepia);
  depthText.alignCenter();
  depthText.addEffect('fadeIn', 0.3, 2.6);
  scene8.addChild(depthText);

  // Bottom message
  const bottomMsg = new FFText({ text: 'HISTORY IN 3D', x: width/2, y: 1350, fontSize: 60 });
  bottomMsg.setColor(COLORS.burgundy);
  bottomMsg.alignCenter();
  bottomMsg.addEffect('bounceIn', 0.5, 3);
  scene8.addChild(bottomMsg);

  scene8.setTransition('fade', 0.6);
  creator.addChild(scene8);
  console.log(colors.green('  ✓ Scene 8: Final Reveal - Time Travel (5s)'));

  // ============================================
  // SCENE 9: CTA & END CARD (6s)
  // ============================================
  const scene9 = new FFScene();
  scene9.setBgColor(COLORS.filmBlack);
  scene9.setDuration(6);

  // Vintage frame background
  const frameBg = new FFRect({ color: COLORS.cream, width: 950, height: 1700, x: width/2, y: height/2 });
  frameBg.addEffect('zoomIn', 0.5, 0.1);
  scene9.addChild(frameBg);

  const innerFrame = new FFRect({ color: COLORS.darkSepia, width: 900, height: 1650, x: width/2, y: height/2 });
  innerFrame.addEffect('zoomIn', 0.4, 0.2);
  scene9.addChild(innerFrame);

  // Series title
  const seriesTitle = new FFText({ text: 'PARALLAX', x: width/2, y: 280, fontSize: 80 });
  seriesTitle.setColor(COLORS.oldGold);
  seriesTitle.alignCenter();
  seriesTitle.addEffect('backInDown', 0.5, 0.4);
  scene9.addChild(seriesTitle);

  const seriesTitle2 = new FFText({ text: 'TIME-TRAVEL', x: width/2, y: 380, fontSize: 70 });
  seriesTitle2.setColor(COLORS.cream);
  seriesTitle2.alignCenter();
  seriesTitle2.addEffect('backInDown', 0.5, 0.6);
  scene9.addChild(seriesTitle2);

  // Separator
  const sepLine = new FFRect({ color: COLORS.oldGold, width: 500, height: 4, x: width/2, y: 470 });
  sepLine.addEffect('zoomIn', 0.4, 0.9);
  scene9.addChild(sepLine);

  // Episode info
  const episodeText = new FFText({ text: 'EPISODE:', x: width/2, y: 560, fontSize: 36 });
  episodeText.setColor(COLORS.lightSepia);
  episodeText.alignCenter();
  episodeText.addEffect('fadeIn', 0.3, 1.1);
  scene9.addChild(episodeText);

  const locationText = new FFText({ text: 'NEW YORK 1925', x: width/2, y: 640, fontSize: 56 });
  locationText.setColor(COLORS.cream);
  locationText.alignCenter();
  locationText.addEffect('bounceIn', 0.5, 1.3);
  scene9.addChild(locationText);

  // CTA Box
  const ctaBox = new FFRect({ color: COLORS.oldGold, width: 750, height: 180, x: width/2, y: 850 });
  ctaBox.addEffect('zoomIn', 0.5, 1.8);
  scene9.addChild(ctaBox);

  const ctaText1 = new FFText({ text: '👆 FOLLOW FOR MORE', x: width/2, y: 820, fontSize: 42 });
  ctaText1.setColor(COLORS.filmBlack);
  ctaText1.alignCenter();
  ctaText1.addEffect('fadeIn', 0.3, 2);
  scene9.addChild(ctaText1);

  const ctaText2 = new FFText({ text: 'HISTORY JOURNEYS', x: width/2, y: 885, fontSize: 48 });
  ctaText2.setColor(COLORS.darkSepia);
  ctaText2.alignCenter();
  ctaText2.addEffect('bounceIn', 0.4, 2.2);
  scene9.addChild(ctaText2);

  // Hashtags
  const hashtags = new FFText({ text: '#ParallaxTimeTravel #1920s #History', x: width/2, y: 1050, fontSize: 30 });
  hashtags.setColor(COLORS.lightSepia);
  hashtags.alignCenter();
  hashtags.addEffect('fadeIn', 0.4, 2.6);
  scene9.addChild(hashtags);

  // Social actions
  const social = new FFText({ text: '❤️ LIKE  💬 COMMENT  🔄 SHARE', x: width/2, y: 1180, fontSize: 34 });
  social.setColor(COLORS.cream);
  social.alignCenter();
  social.addEffect('fadeInUp', 0.4, 3);
  scene9.addChild(social);

  // Story count
  const storyNum = new FFText({ text: 'STORY 3 OF 30', x: width/2, y: 1320, fontSize: 28 });
  storyNum.setColor(COLORS.sepia);
  storyNum.alignCenter();
  storyNum.addEffect('fadeIn', 0.3, 3.5);
  scene9.addChild(storyNum);

  // Floating dates decoration
  const endDates = [
    { text: '1920', x: 120, y: 1500 },
    { text: '1925', x: width/2, y: 1550 },
    { text: '1929', x: width - 120, y: 1500 }
  ];

  endDates.forEach((d, i) => {
    const dateText = new FFText({ text: d.text, x: d.x, y: d.y, fontSize: 40 });
    dateText.setColor(COLORS.sepia);
    dateText.alignCenter();
    dateText.addEffect('fadeIn', 0.3, 4 + (i * 0.2));
    scene9.addChild(dateText);
  });

  // Film sprocket decoration
  for (let i = 0; i < 4; i++) {
    const sprocketL = new FFRect({ color: COLORS.dustBrown, width: 30, height: 45, x: 30, y: 300 + (i * 400) });
    sprocketL.addEffect('fadeIn', 0.2, 4.5);
    scene9.addChild(sprocketL);

    const sprocketR = new FFRect({ color: COLORS.dustBrown, width: 30, height: 45, x: width - 30, y: 300 + (i * 400) });
    sprocketR.addEffect('fadeIn', 0.2, 4.5);
    scene9.addChild(sprocketR);
  }

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
    console.log(colors.magenta('\n🎬 "Parallax Time-Travel: New York 1925" complete!\n'));
  });

  creator.start();
}

// Run the video creation
createParallaxTimeTravelVideo().catch(err => {
  console.error(colors.red('Error creating video:'), err);
});

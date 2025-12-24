/**
 * 🎬 STORY 16: "Isometric City Stats" - Data/Map
 * 
 * The Story: Comparing the "Most Expensive Cities" to live in.
 * 
 * Visual Style:
 * - 3D Tilt-shift, miniature world look
 * - Isometric map of the world
 * - "Pillars of Cash" rising out of cities like NYC, London, Tokyo
 * - 3D Camera Tracking, Extruded 3D Text, Drop Shadows
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~45 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-16-isometric-city-stats.js
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
// COLOR PALETTE - Isometric/Data Theme
// ============================================
const COLORS = {
  // Sky/Background
  skyBlue: '#87ceeb',
  deepSky: '#4a90d9',
  miniatureBlur: '#b0d4f1',
  
  // Map/Ground
  mapGreen: '#7cb342',
  oceanBlue: '#2196f3',
  landBeige: '#d4c5a9',
  
  // City/Building colors
  buildingGray: '#757575',
  buildingDark: '#424242',
  roofRed: '#d32f2f',
  windowBlue: '#64b5f6',
  
  // Cash pillar colors (gradient from bottom to top)
  cashGold: '#ffd700',
  cashYellow: '#ffeb3b',
  cashGreen: '#4caf50',
  cashEmerald: '#00c853',
  
  // Data/Stats colors
  statRed: '#f44336',
  statOrange: '#ff9800',
  statYellow: '#ffeb3b',
  statGreen: '#4caf50',
  
  // Text
  white: '#ffffff',
  black: '#000000',
  darkText: '#212121',
  dimWhite: '#b0b0b0',
  
  // Shadow
  shadow: 'rgba(0,0,0,0.3)',
  shadowDeep: 'rgba(0,0,0,0.5)'
};

// Most expensive cities data
const CITIES = [
  { name: 'NEW YORK', country: 'USA', cost: '$5,842', rank: 1, x: 300, y: 800, pillarHeight: 500, color: COLORS.statRed },
  { name: 'SINGAPORE', country: 'SGP', cost: '$5,634', rank: 2, x: 750, y: 950, pillarHeight: 480, color: COLORS.statOrange },
  { name: 'HONG KONG', country: 'CHN', cost: '$5,516', rank: 3, x: 800, y: 900, pillarHeight: 460, color: COLORS.statYellow },
  { name: 'LONDON', country: 'UK', cost: '$5,321', rank: 4, x: 500, y: 750, pillarHeight: 440, color: COLORS.statGreen },
  { name: 'TOKYO', country: 'JPN', cost: '$5,108', rank: 5, x: 850, y: 850, pillarHeight: 420, color: COLORS.cashGold }
];

// ============================================
// HELPER: Add Isometric Grid
// ============================================
function addIsometricGrid(scene, delay = 0) {
  // Grid lines - isometric perspective
  for (let i = 0; i < 12; i++) {
    // Horizontal lines (perspective)
    const lineY = 600 + (i * 80);
    const lineWidth = 900 - (i * 30);
    const gridLine = new FFRect({ 
      color: 'rgba(255,255,255,0.2)', 
      width: lineWidth, 
      height: 2, 
      x: width/2, 
      y: lineY 
    });
    gridLine.addEffect('fadeIn', 0.2, delay + (i * 0.03));
    scene.addChild(gridLine);
  }
  
  // Vertical lines (perspective)
  for (let i = 0; i < 8; i++) {
    const lineX = 200 + (i * 110);
    const gridLine = new FFRect({ 
      color: 'rgba(255,255,255,0.15)', 
      width: 2, 
      height: 800, 
      x: lineX, 
      y: 1000 
    });
    gridLine.addEffect('fadeIn', 0.2, delay + 0.3 + (i * 0.03));
    scene.addChild(gridLine);
  }
}

// ============================================
// HELPER: Add 3D Cash Pillar
// ============================================
function addCashPillar(scene, city, delay = 0) {
  // Shadow base
  const shadowSize = 80 + (city.pillarHeight / 10);
  const shadow = new FFRect({ 
    color: COLORS.shadow, 
    width: shadowSize, 
    height: shadowSize * 0.5, 
    x: city.x + 10, 
    y: city.y + 20 
  });
  shadow.addEffect('fadeIn', 0.3, delay);
  scene.addChild(shadow);
  
  // Pillar base (darker)
  const baseHeight = 40;
  const pillarBase = new FFRect({ 
    color: '#2a5a2a', 
    width: 70, 
    height: baseHeight, 
    x: city.x, 
    y: city.y 
  });
  pillarBase.addEffect('fadeIn', 0.2, delay + 0.1);
  scene.addChild(pillarBase);
  
  // Main pillar (rising animation)
  const pillar = new FFRect({ 
    color: city.color, 
    width: 60, 
    height: city.pillarHeight, 
    x: city.x, 
    y: city.y - city.pillarHeight/2 
  });
  pillar.addEffect('fadeInUp', 0.8, delay + 0.2);
  scene.addChild(pillar);
  
  // Pillar top cap (3D effect)
  const capTop = new FFRect({ 
    color: COLORS.cashYellow, 
    width: 65, 
    height: 20, 
    x: city.x, 
    y: city.y - city.pillarHeight - 10 
  });
  capTop.addEffect('fadeIn', 0.3, delay + 0.8);
  scene.addChild(capTop);
  
  // Dollar sign on pillar
  const dollarSign = new FFText({ 
    text: '💰', 
    x: city.x, 
    y: city.y - city.pillarHeight/2, 
    fontSize: 40 
  });
  dollarSign.alignCenter();
  dollarSign.addEffect('bounceIn', 0.4, delay + 1);
  scene.addChild(dollarSign);
  
  // Rank badge
  const rankBadge = new FFRect({ 
    color: COLORS.white, 
    width: 40, 
    height: 40, 
    x: city.x - 40, 
    y: city.y - city.pillarHeight - 30 
  });
  rankBadge.addEffect('zoomIn', 0.3, delay + 1.2);
  scene.addChild(rankBadge);
  
  const rankText = new FFText({ 
    text: `#${city.rank}`, 
    x: city.x - 40, 
    y: city.y - city.pillarHeight - 30, 
    fontSize: 24 
  });
  rankText.setColor(COLORS.darkText);
  rankText.alignCenter();
  rankText.addEffect('fadeIn', 0.2, delay + 1.3);
  scene.addChild(rankText);
}

// ============================================
// HELPER: Add Miniature Buildings
// ============================================
function addMiniatureBuildings(scene, x, y, count, delay = 0) {
  for (let i = 0; i < count; i++) {
    const buildingX = x + (Math.random() - 0.5) * 100;
    const buildingY = y + (Math.random() - 0.5) * 80;
    const buildingHeight = 30 + Math.random() * 60;
    const buildingWidth = 20 + Math.random() * 30;
    
    // Building shadow
    const shadow = new FFRect({ 
      color: COLORS.shadow, 
      width: buildingWidth + 5, 
      height: 10, 
      x: buildingX + 3, 
      y: buildingY + buildingHeight/2 + 5 
    });
    shadow.addEffect('fadeIn', 0.2, delay + (i * 0.05));
    scene.addChild(shadow);
    
    // Building body
    const building = new FFRect({ 
      color: i % 2 === 0 ? COLORS.buildingGray : COLORS.buildingDark, 
      width: buildingWidth, 
      height: buildingHeight, 
      x: buildingX, 
      y: buildingY 
    });
    building.addEffect('fadeInUp', 0.3, delay + 0.1 + (i * 0.05));
    scene.addChild(building);
    
    // Building roof
    const roof = new FFRect({ 
      color: COLORS.roofRed, 
      width: buildingWidth + 4, 
      height: 8, 
      x: buildingX, 
      y: buildingY - buildingHeight/2 - 4 
    });
    roof.addEffect('fadeIn', 0.2, delay + 0.2 + (i * 0.05));
    scene.addChild(roof);
    
    // Windows (small dots)
    const windowCount = Math.floor(buildingHeight / 15);
    for (let w = 0; w < windowCount; w++) {
      const window1 = new FFRect({ 
        color: COLORS.windowBlue, 
        width: 4, 
        height: 6, 
        x: buildingX - 5, 
        y: buildingY - buildingHeight/2 + 10 + (w * 15) 
      });
      window1.addEffect('fadeIn', 0.1, delay + 0.3 + (i * 0.05));
      scene.addChild(window1);
    }
  }
}

// ============================================
// HELPER: Add Tilt-Shift Blur Effect (simulated)
// ============================================
function addTiltShiftEffect(scene, delay = 0) {
  // Top blur band
  const topBlur = new FFRect({ 
    color: 'rgba(135, 206, 235, 0.3)', 
    width: 1100, 
    height: 300, 
    x: width/2, 
    y: 150 
  });
  topBlur.addEffect('fadeIn', 0.4, delay);
  scene.addChild(topBlur);
  
  // Bottom blur band
  const bottomBlur = new FFRect({ 
    color: 'rgba(135, 206, 235, 0.3)', 
    width: 1100, 
    height: 300, 
    x: width/2, 
    y: height - 150 
  });
  bottomBlur.addEffect('fadeIn', 0.4, delay);
  scene.addChild(bottomBlur);
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createIsometricCityStatsVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 16: "Isometric City Stats"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~45 seconds'));
  console.log(colors.yellow('🎨 Theme: Data/Map - Most Expensive Cities\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-16-isometric-city-stats.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: INTRO - World Map Setup (8s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.skyBlue);
  scene1.setDuration(8);

  // Sky gradient background
  const skyGradient = new FFRect({ color: COLORS.deepSky, width: 1100, height: 1000, x: width/2, y: 500 });
  skyGradient.addEffect('fadeIn', 0.5, 0);
  scene1.addChild(skyGradient);

  // Ground/Map base
  const mapBase = new FFRect({ color: COLORS.landBeige, width: 900, height: 1000, x: width/2, y: 1400 });
  mapBase.addEffect('fadeIn', 0.5, 0.2);
  scene1.addChild(mapBase);

  // Ocean patches
  const ocean1 = new FFRect({ color: COLORS.oceanBlue, width: 300, height: 200, x: 250, y: 1200 });
  ocean1.addEffect('fadeIn', 0.3, 0.4);
  scene1.addChild(ocean1);

  const ocean2 = new FFRect({ color: COLORS.oceanBlue, width: 250, height: 180, x: 800, y: 1300 });
  ocean2.addEffect('fadeIn', 0.3, 0.5);
  scene1.addChild(ocean2);

  // Isometric grid
  addIsometricGrid(scene1, 0.6);

  // Title box
  const titleBox = new FFRect({ color: 'rgba(0,0,0,0.8)', width: 800, height: 200, x: width/2, y: 350 });
  titleBox.addEffect('zoomIn', 0.5, 1);
  scene1.addChild(titleBox);

  const titleText = new FFText({ text: 'MOST EXPENSIVE', x: width/2, y: 310, fontSize: 60 });
  titleText.setColor(COLORS.cashGold);
  titleText.alignCenter();
  titleText.addEffect('backInDown', 0.6, 1.2);
  scene1.addChild(titleText);

  const titleText2 = new FFText({ text: 'CITIES TO LIVE', x: width/2, y: 390, fontSize: 56 });
  titleText2.setColor(COLORS.white);
  titleText2.alignCenter();
  titleText2.addEffect('backInDown', 0.6, 1.4);
  scene1.addChild(titleText2);

  // Subtitle
  const subtitle = new FFText({ text: '2024 GLOBAL RANKING', x: width/2, y: 500, fontSize: 32 });
  subtitle.setColor(COLORS.dimWhite);
  subtitle.alignCenter();
  subtitle.addEffect('fadeIn', 0.4, 1.8);
  scene1.addChild(subtitle);

  // World icon
  const worldIcon = new FFText({ text: '🌍', x: width/2, y: 650, fontSize: 120 });
  worldIcon.alignCenter();
  worldIcon.addEffect('rotateIn', 0.8, 2);
  scene1.addChild(worldIcon);

  // Info text
  const infoText = new FFText({ text: 'Monthly Cost of Living', x: width/2, y: 820, fontSize: 36 });
  infoText.setColor(COLORS.darkText);
  infoText.alignCenter();
  infoText.addEffect('fadeInUp', 0.5, 2.5);
  scene1.addChild(infoText);

  const infoText2 = new FFText({ text: '(Single Person)', x: width/2, y: 880, fontSize: 28 });
  infoText2.setColor(COLORS.dimWhite);
  infoText2.alignCenter();
  infoText2.addEffect('fadeIn', 0.4, 3);
  scene1.addChild(infoText2);

  // Miniature buildings preview
  addMiniatureBuildings(scene1, 200, 1100, 3, 3.5);
  addMiniatureBuildings(scene1, 800, 1150, 3, 3.7);

  // Tilt-shift effect
  addTiltShiftEffect(scene1, 4);

  // Transition hint
  const transitionHint = new FFText({ text: 'ZOOMING IN...', x: width/2, y: 1500, fontSize: 28 });
  transitionHint.setColor(COLORS.white);
  transitionHint.alignCenter();
  transitionHint.addEffect('fadeIn', 0.3, 6);
  transitionHint.addEffect('fadeOut', 0.3, 7);
  scene1.addChild(transitionHint);

  scene1.setTransition('directionalwarp', 0.6);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Intro - World Map Setup (8s)'));


  // ============================================
  // SCENE 2: RANK #5 & #4 - Tokyo & London (9s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.skyBlue);
  scene2.setDuration(9);

  // Sky
  const sky2 = new FFRect({ color: COLORS.deepSky, width: 1100, height: 1000, x: width/2, y: 500 });
  sky2.addEffect('fadeIn', 0.3, 0);
  scene2.addChild(sky2);

  // Map base
  const map2 = new FFRect({ color: COLORS.landBeige, width: 900, height: 1000, x: width/2, y: 1400 });
  map2.addEffect('fadeIn', 0.3, 0);
  scene2.addChild(map2);

  // Grid
  addIsometricGrid(scene2, 0.2);

  // Title bar
  const titleBar2 = new FFRect({ color: 'rgba(0,0,0,0.85)', width: 1080, height: 100, x: width/2, y: 150 });
  titleBar2.addEffect('fadeIn', 0.3, 0.3);
  scene2.addChild(titleBar2);

  const sceneTitle2 = new FFText({ text: 'TOP 5 CITIES', x: width/2, y: 150, fontSize: 48 });
  sceneTitle2.setColor(COLORS.cashGold);
  sceneTitle2.alignCenter();
  sceneTitle2.addEffect('fadeIn', 0.3, 0.5);
  scene2.addChild(sceneTitle2);

  // Miniature buildings for context
  addMiniatureBuildings(scene2, 300, 1100, 4, 0.5);
  addMiniatureBuildings(scene2, 700, 1150, 4, 0.6);

  // City #5 - Tokyo
  const tokyo = CITIES[4];
  addCashPillar(scene2, tokyo, 1);

  const tokyoLabel = new FFRect({ color: 'rgba(0,0,0,0.9)', width: 300, height: 120, x: tokyo.x + 150, y: tokyo.y - tokyo.pillarHeight/2 });
  tokyoLabel.addEffect('fadeInRight', 0.4, 2);
  scene2.addChild(tokyoLabel);

  const tokyoName = new FFText({ text: tokyo.name, x: tokyo.x + 150, y: tokyo.y - tokyo.pillarHeight/2 - 30, fontSize: 40 });
  tokyoName.setColor(tokyo.color);
  tokyoName.alignCenter();
  tokyoName.addEffect('fadeIn', 0.3, 2.2);
  scene2.addChild(tokyoName);

  const tokyoCost = new FFText({ text: tokyo.cost, x: tokyo.x + 150, y: tokyo.y - tokyo.pillarHeight/2 + 20, fontSize: 36 });
  tokyoCost.setColor(COLORS.white);
  tokyoCost.alignCenter();
  tokyoCost.addEffect('fadeIn', 0.3, 2.4);
  scene2.addChild(tokyoCost);

  const tokyoCountry = new FFText({ text: tokyo.country, x: tokyo.x + 150, y: tokyo.y - tokyo.pillarHeight/2 + 55, fontSize: 24 });
  tokyoCountry.setColor(COLORS.dimWhite);
  tokyoCountry.alignCenter();
  tokyoCountry.addEffect('fadeIn', 0.2, 2.6);
  scene2.addChild(tokyoCountry);

  // City #4 - London
  const london = CITIES[3];
  addCashPillar(scene2, london, 4);

  const londonLabel = new FFRect({ color: 'rgba(0,0,0,0.9)', width: 300, height: 120, x: london.x - 150, y: london.y - london.pillarHeight/2 });
  londonLabel.addEffect('fadeInLeft', 0.4, 5);
  scene2.addChild(londonLabel);

  const londonName = new FFText({ text: london.name, x: london.x - 150, y: london.y - london.pillarHeight/2 - 30, fontSize: 40 });
  londonName.setColor(london.color);
  londonName.alignCenter();
  londonName.addEffect('fadeIn', 0.3, 5.2);
  scene2.addChild(londonName);

  const londonCost = new FFText({ text: london.cost, x: london.x - 150, y: london.y - london.pillarHeight/2 + 20, fontSize: 36 });
  londonCost.setColor(COLORS.white);
  londonCost.alignCenter();
  londonCost.addEffect('fadeIn', 0.3, 5.4);
  scene2.addChild(londonCost);

  const londonCountry = new FFText({ text: london.country, x: london.x - 150, y: london.y - london.pillarHeight/2 + 55, fontSize: 24 });
  londonCountry.setColor(COLORS.dimWhite);
  londonCountry.alignCenter();
  londonCountry.addEffect('fadeIn', 0.2, 5.6);
  scene2.addChild(londonCountry);

  // Tilt-shift
  addTiltShiftEffect(scene2, 1);

  scene2.setTransition('crosswarp', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Rank #5 & #4 - Tokyo & London (9s)'));

  // ============================================
  // SCENE 3: RANK #3 & #2 - Hong Kong & Singapore (9s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.skyBlue);
  scene3.setDuration(9);

  // Sky
  const sky3 = new FFRect({ color: COLORS.deepSky, width: 1100, height: 1000, x: width/2, y: 500 });
  sky3.addEffect('fadeIn', 0.3, 0);
  scene3.addChild(sky3);

  // Map base
  const map3 = new FFRect({ color: COLORS.landBeige, width: 900, height: 1000, x: width/2, y: 1400 });
  map3.addEffect('fadeIn', 0.3, 0);
  scene3.addChild(map3);

  // Grid
  addIsometricGrid(scene3, 0.2);

  // Title bar
  const titleBar3 = new FFRect({ color: 'rgba(0,0,0,0.85)', width: 1080, height: 100, x: width/2, y: 150 });
  titleBar3.addEffect('fadeIn', 0.3, 0.3);
  scene3.addChild(titleBar3);

  const sceneTitle3 = new FFText({ text: 'ASIA DOMINATES', x: width/2, y: 150, fontSize: 48 });
  sceneTitle3.setColor(COLORS.statOrange);
  sceneTitle3.alignCenter();
  sceneTitle3.addEffect('fadeIn', 0.3, 0.5);
  scene3.addChild(sceneTitle3);

  // Miniature buildings
  addMiniatureBuildings(scene3, 350, 1100, 5, 0.5);
  addMiniatureBuildings(scene3, 750, 1120, 5, 0.6);

  // City #3 - Hong Kong
  const hongkong = CITIES[2];
  addCashPillar(scene3, hongkong, 1);

  const hkLabel = new FFRect({ color: 'rgba(0,0,0,0.9)', width: 320, height: 120, x: hongkong.x - 160, y: hongkong.y - hongkong.pillarHeight/2 });
  hkLabel.addEffect('fadeInLeft', 0.4, 2);
  scene3.addChild(hkLabel);

  const hkName = new FFText({ text: hongkong.name, x: hongkong.x - 160, y: hongkong.y - hongkong.pillarHeight/2 - 30, fontSize: 38 });
  hkName.setColor(hongkong.color);
  hkName.alignCenter();
  hkName.addEffect('fadeIn', 0.3, 2.2);
  scene3.addChild(hkName);

  const hkCost = new FFText({ text: hongkong.cost, x: hongkong.x - 160, y: hongkong.y - hongkong.pillarHeight/2 + 20, fontSize: 36 });
  hkCost.setColor(COLORS.white);
  hkCost.alignCenter();
  hkCost.addEffect('fadeIn', 0.3, 2.4);
  scene3.addChild(hkCost);

  const hkCountry = new FFText({ text: hongkong.country, x: hongkong.x - 160, y: hongkong.y - hongkong.pillarHeight/2 + 55, fontSize: 24 });
  hkCountry.setColor(COLORS.dimWhite);
  hkCountry.alignCenter();
  hkCountry.addEffect('fadeIn', 0.2, 2.6);
  scene3.addChild(hkCountry);

  // City #2 - Singapore
  const singapore = CITIES[1];
  addCashPillar(scene3, singapore, 4);

  const sgLabel = new FFRect({ color: 'rgba(0,0,0,0.9)', width: 320, height: 120, x: singapore.x - 160, y: singapore.y - singapore.pillarHeight/2 });
  sgLabel.addEffect('fadeInLeft', 0.4, 5);
  scene3.addChild(sgLabel);

  const sgName = new FFText({ text: singapore.name, x: singapore.x - 160, y: singapore.y - singapore.pillarHeight/2 - 30, fontSize: 38 });
  sgName.setColor(singapore.color);
  sgName.alignCenter();
  sgName.addEffect('fadeIn', 0.3, 5.2);
  scene3.addChild(sgName);

  const sgCost = new FFText({ text: singapore.cost, x: singapore.x - 160, y: singapore.y - singapore.pillarHeight/2 + 20, fontSize: 36 });
  sgCost.setColor(COLORS.white);
  sgCost.alignCenter();
  sgCost.addEffect('fadeIn', 0.3, 5.4);
  scene3.addChild(sgCost);

  const sgCountry = new FFText({ text: singapore.country, x: singapore.x - 160, y: singapore.y - singapore.pillarHeight/2 + 55, fontSize: 24 });
  sgCountry.setColor(COLORS.dimWhite);
  sgCountry.alignCenter();
  sgCountry.addEffect('fadeIn', 0.2, 5.6);
  scene3.addChild(sgCountry);

  // Tilt-shift
  addTiltShiftEffect(scene3, 1);

  scene3.setTransition('crosswarp', 0.5);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Rank #3 & #2 - Hong Kong & Singapore (9s)'));

  // ============================================
  // SCENE 4: RANK #1 - New York (10s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.skyBlue);
  scene4.setDuration(10);

  // Sky
  const sky4 = new FFRect({ color: COLORS.deepSky, width: 1100, height: 1000, x: width/2, y: 500 });
  sky4.addEffect('fadeIn', 0.3, 0);
  scene4.addChild(sky4);

  // Map base
  const map4 = new FFRect({ color: COLORS.landBeige, width: 900, height: 1000, x: width/2, y: 1400 });
  map4.addEffect('fadeIn', 0.3, 0);
  scene4.addChild(map4);

  // Grid
  addIsometricGrid(scene4, 0.2);

  // Dramatic title bar
  const titleBar4 = new FFRect({ color: COLORS.statRed, width: 1080, height: 120, x: width/2, y: 150 });
  titleBar4.addEffect('zoomIn', 0.5, 0.5);
  scene4.addChild(titleBar4);

  const sceneTitle4 = new FFText({ text: '#1 MOST EXPENSIVE', x: width/2, y: 150, fontSize: 52 });
  sceneTitle4.setColor(COLORS.white);
  sceneTitle4.alignCenter();
  sceneTitle4.addEffect('bounceIn', 0.6, 0.7);
  scene4.addChild(sceneTitle4);

  // Miniature buildings - more dense
  addMiniatureBuildings(scene4, 300, 1100, 6, 0.5);
  addMiniatureBuildings(scene4, 600, 1150, 5, 0.6);

  // City #1 - New York (tallest pillar)
  const newyork = CITIES[0];
  addCashPillar(scene4, newyork, 1.5);

  // Crown icon above pillar
  const crownIcon = new FFText({ text: '👑', x: newyork.x, y: newyork.y - newyork.pillarHeight - 80, fontSize: 60 });
  crownIcon.alignCenter();
  crownIcon.addEffect('bounceIn', 0.5, 3);
  scene4.addChild(crownIcon);

  // Large label
  const nyLabel = new FFRect({ color: 'rgba(0,0,0,0.95)', width: 400, height: 180, x: newyork.x + 200, y: newyork.y - newyork.pillarHeight/2 });
  nyLabel.addEffect('fadeInRight', 0.5, 3.5);
  scene4.addChild(nyLabel);

  const nyName = new FFText({ text: newyork.name, x: newyork.x + 200, y: newyork.y - newyork.pillarHeight/2 - 50, fontSize: 56 });
  nyName.setColor(newyork.color);
  nyName.alignCenter();
  nyName.addEffect('backInRight', 0.5, 3.7);
  scene4.addChild(nyName);

  const nyCost = new FFText({ text: newyork.cost, x: newyork.x + 200, y: newyork.y - newyork.pillarHeight/2 + 20, fontSize: 48 });
  nyCost.setColor(COLORS.cashGold);
  nyCost.alignCenter();
  nyCost.addEffect('bounceIn', 0.5, 4);
  scene4.addChild(nyCost);

  const nyCountry = new FFText({ text: newyork.country, x: newyork.x + 200, y: newyork.y - newyork.pillarHeight/2 + 70, fontSize: 32 });
  nyCountry.setColor(COLORS.dimWhite);
  nyCountry.alignCenter();
  nyCountry.addEffect('fadeIn', 0.3, 4.2);
  scene4.addChild(nyCountry);

  // Per month label
  const perMonth = new FFText({ text: '/month', x: newyork.x + 200, y: newyork.y - newyork.pillarHeight/2 + 105, fontSize: 24 });
  perMonth.setColor(COLORS.dimWhite);
  perMonth.alignCenter();
  perMonth.addEffect('fadeIn', 0.3, 4.4);
  scene4.addChild(perMonth);

  // Stat callouts
  const statBox = new FFRect({ color: 'rgba(255,255,255,0.9)', width: 350, height: 200, x: width/2, y: 1350 });
  statBox.addEffect('fadeInUp', 0.5, 5);
  scene4.addChild(statBox);

  const statTitle = new FFText({ text: 'BREAKDOWN:', x: width/2, y: 1280, fontSize: 32 });
  statTitle.setColor(COLORS.darkText);
  statTitle.alignCenter();
  statTitle.addEffect('fadeIn', 0.3, 5.2);
  scene4.addChild(statTitle);

  const stats = [
    { text: 'Rent: $3,500', delay: 5.4 },
    { text: 'Food: $800', delay: 5.6 },
    { text: 'Transport: $150', delay: 5.8 },
    { text: 'Other: $1,392', delay: 6 }
  ];

  stats.forEach((stat, i) => {
    const statText = new FFText({ text: stat.text, x: width/2, y: 1330 + (i * 50), fontSize: 28 });
    statText.setColor(COLORS.darkText);
    statText.alignCenter();
    statText.addEffect('fadeInLeft', 0.3, stat.delay);
    scene4.addChild(statText);
  });

  // Tilt-shift
  addTiltShiftEffect(scene4, 1);

  scene4.setTransition('fade', 0.6);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Rank #1 - New York (10s)'));

  // ============================================
  // SCENE 5: FINALE - All Cities & CTA (9s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.skyBlue);
  scene5.setDuration(9);

  // Sky
  const sky5 = new FFRect({ color: COLORS.deepSky, width: 1100, height: 1000, x: width/2, y: 500 });
  sky5.addEffect('fadeIn', 0.3, 0);
  scene5.addChild(sky5);

  // Map base
  const map5 = new FFRect({ color: COLORS.landBeige, width: 900, height: 1200, x: width/2, y: 1400 });
  map5.addEffect('fadeIn', 0.3, 0);
  scene5.addChild(map5);

  // Grid
  addIsometricGrid(scene5, 0.2);

  // Title
  const finalTitle = new FFRect({ color: 'rgba(0,0,0,0.9)', width: 900, height: 120, x: width/2, y: 200 });
  finalTitle.addEffect('zoomIn', 0.5, 0.3);
  scene5.addChild(finalTitle);

  const finalTitleText = new FFText({ text: 'ISOMETRIC CITY STATS', x: width/2, y: 200, fontSize: 50 });
  finalTitleText.setColor(COLORS.cashGold);
  finalTitleText.alignCenter();
  finalTitleText.addEffect('backInDown', 0.6, 0.5);
  scene5.addChild(finalTitleText);

  // All 5 pillars in miniature view
  const miniScale = 0.4;
  CITIES.forEach((city, i) => {
    const miniX = 200 + (i * 170);
    const miniY = 700;
    const miniHeight = city.pillarHeight * miniScale;
    
    // Mini pillar
    const miniPillar = new FFRect({ 
      color: city.color, 
      width: 50, 
      height: miniHeight, 
      x: miniX, 
      y: miniY 
    });
    miniPillar.addEffect('fadeInUp', 0.5, 1 + (i * 0.2));
    scene5.addChild(miniPillar);
    
    // Rank
    const miniRank = new FFText({ text: `#${city.rank}`, x: miniX, y: miniY - miniHeight - 30, fontSize: 32 });
    miniRank.setColor(COLORS.white);
    miniRank.alignCenter();
    miniRank.addEffect('bounceIn', 0.3, 1.5 + (i * 0.2));
    scene5.addChild(miniRank);
    
    // City name
    const miniName = new FFText({ text: city.name, x: miniX, y: miniY + 80, fontSize: 20 });
    miniName.setColor(COLORS.darkText);
    miniName.alignCenter();
    miniName.addEffect('fadeIn', 0.2, 1.7 + (i * 0.2));
    scene5.addChild(miniName);
    
    // Cost
    const miniCost = new FFText({ text: city.cost, x: miniX, y: miniY + 110, fontSize: 18 });
    miniCost.setColor(COLORS.dimWhite);
    miniCost.alignCenter();
    miniCost.addEffect('fadeIn', 0.2, 1.9 + (i * 0.2));
    scene5.addChild(miniCost);
  });

  // Summary stats
  const summaryBox = new FFRect({ color: 'rgba(255,255,255,0.95)', width: 800, height: 200, x: width/2, y: 1050 });
  summaryBox.addEffect('fadeIn', 0.5, 3);
  scene5.addChild(summaryBox);

  const summaryTitle = new FFText({ text: '💰 AVERAGE COST', x: width/2, y: 990, fontSize: 40 });
  summaryTitle.setColor(COLORS.darkText);
  summaryTitle.alignCenter();
  summaryTitle.addEffect('fadeIn', 0.3, 3.2);
  scene5.addChild(summaryTitle);

  const avgCost = new FFText({ text: '$5,484/month', x: width/2, y: 1060, fontSize: 56 });
  avgCost.setColor(COLORS.statRed);
  avgCost.alignCenter();
  avgCost.addEffect('bounceIn', 0.5, 3.5);
  scene5.addChild(avgCost);

  const comparison = new FFText({ text: '3x Global Average', x: width/2, y: 1120, fontSize: 32 });
  comparison.setColor(COLORS.darkText);
  comparison.alignCenter();
  comparison.addEffect('fadeIn', 0.3, 3.8);
  scene5.addChild(comparison);

  // Hashtags
  const hashText = new FFText({ text: '#CostOfLiving #ExpensiveCities #DataViz', x: width/2, y: 1250, fontSize: 24 });
  hashText.setColor(COLORS.dimWhite);
  hashText.alignCenter();
  hashText.addEffect('fadeIn', 0.3, 4.5);
  scene5.addChild(hashText);

  // CTA
  const ctaBox = new FFRect({ color: COLORS.cashGold, width: 650, height: 140, x: width/2, y: 1450 });
  ctaBox.addEffect('zoomIn', 0.5, 5);
  scene5.addChild(ctaBox);

  const ctaText1 = new FFText({ text: '👆 FOLLOW FOR MORE', x: width/2, y: 1420, fontSize: 36 });
  ctaText1.setColor(COLORS.darkText);
  ctaText1.alignCenter();
  ctaText1.addEffect('bounceIn', 0.4, 5.3);
  scene5.addChild(ctaText1);

  const ctaText2 = new FFText({ text: 'DATA STORIES', x: width/2, y: 1480, fontSize: 40 });
  ctaText2.setColor(COLORS.darkText);
  ctaText2.alignCenter();
  ctaText2.addEffect('bounceIn', 0.4, 5.5);
  scene5.addChild(ctaText2);

  // Engagement
  const engageText = new FFText({ text: '❤️ LIKE  💬 COMMENT  🔄 SHARE', x: width/2, y: 1650, fontSize: 28 });
  engageText.setColor(COLORS.darkText);
  engageText.alignCenter();
  engageText.addEffect('fadeIn', 0.4, 6);
  scene5.addChild(engageText);

  // Story count
  const storyCount = new FFText({ text: 'STORY 16 OF 30', x: width/2, y: 1780, fontSize: 26 });
  storyCount.setColor(COLORS.dimWhite);
  storyCount.alignCenter();
  storyCount.addEffect('fadeIn', 0.4, 6.5);
  scene5.addChild(storyCount);

  // Tilt-shift
  addTiltShiftEffect(scene5, 1);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Finale - All Cities & CTA (9s)'));

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
    console.log(colors.magenta('\n🎬 Story 16: "Isometric City Stats" complete!\n'));
  });

  creator.start();
}

createIsometricCityStatsVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

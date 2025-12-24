/**
 * 🎬 STORY 27: "Desktop Chaos" - Work/Relatable
 * 
 * The Story: A visual representation of "Procrastination" - files being 
 * dragged into a "Tomorrow" folder until the screen explodes.
 * 
 * Visual Style:
 * - Computer Desktop UI (macOS/Windows style)
 * - Browser window with multiple tabs
 * - Icon Animation
 * - Popup Windows
 * - Window Resizing
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~30 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-27-desktop-chaos.js
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
// COLOR PALETTE - Desktop UI
// ============================================
const COLORS = {
  // Desktop background
  desktopBlue: '#0078d4',
  desktopGray: '#2d2d30',
  wallpaperGradient: '#1e3a5f',
  
  // Window colors
  windowWhite: '#ffffff',
  windowGray: '#f3f3f3',
  windowBorder: '#cccccc',
  titleBarGray: '#e5e5e5',
  
  // Browser chrome
  chromeGray: '#323232',
  tabGray: '#4a4a4a',
  tabActive: '#ffffff',
  addressBar: '#2d2d2d',
  
  // Icons and folders
  folderYellow: '#ffd966',
  folderOrange: '#ff9933',
  fileBlue: '#4a90e2',
  fileGreen: '#7ed321',
  fileRed: '#d0021b',
  filePurple: '#9013fe',
  
  // UI elements
  buttonBlue: '#0078d4',
  buttonRed: '#e81123',
  buttonGreen: '#107c10',
  warningYellow: '#ffb900',
  
  // Text
  black: '#000000',
  white: '#ffffff',
  textGray: '#5a5a5a',
  lightGray: '#999999'
};

// ============================================
// HELPER: Add Browser Window Frame
// ============================================
function addBrowserWindow(scene, y, windowHeight, delay = 0) {
  // Window background
  const windowBg = new FFRect({ 
    color: COLORS.windowWhite, 
    width: 980, 
    height: windowHeight, 
    x: width/2, 
    y: y + windowHeight/2 
  });
  windowBg.addEffect('fadeIn', 0.3, delay);
  scene.addChild(windowBg);
  
  // Chrome/Title bar
  const titleBar = new FFRect({ 
    color: COLORS.chromeGray, 
    width: 980, 
    height: 60, 
    x: width/2, 
    y: y + 30 
  });
  titleBar.addEffect('fadeIn', 0.3, delay + 0.1);
  scene.addChild(titleBar);
  
  // Window control buttons (close, minimize, maximize)
  const closeBtn = new FFRect({ color: COLORS.buttonRed, width: 20, height: 20, x: 150, y: y + 30 });
  closeBtn.addEffect('fadeIn', 0.2, delay + 0.2);
  scene.addChild(closeBtn);
  
  const minBtn = new FFRect({ color: COLORS.warningYellow, width: 20, height: 20, x: 180, y: y + 30 });
  minBtn.addEffect('fadeIn', 0.2, delay + 0.25);
  scene.addChild(minBtn);
  
  const maxBtn = new FFRect({ color: COLORS.buttonGreen, width: 20, height: 20, x: 210, y: y + 30 });
  maxBtn.addEffect('fadeIn', 0.2, delay + 0.3);
  scene.addChild(maxBtn);
  
  return { windowBg, titleBar };
}

// ============================================
// HELPER: Add Browser Tabs
// ============================================
function addBrowserTabs(scene, y, delay = 0) {
  const tabs = [
    { name: 'Work Report', active: true },
    { name: 'YouTube', active: false },
    { name: 'Twitter', active: false },
    { name: 'Reddit', active: false },
    { name: 'Netflix', active: false }
  ];
  
  tabs.forEach((tab, i) => {
    const tabX = 200 + (i * 160);
    const tabColor = tab.active ? COLORS.tabActive : COLORS.tabGray;
    
    const tabBg = new FFRect({ 
      color: tabColor, 
      width: 150, 
      height: 40, 
      x: tabX, 
      y: y + 90 
    });
    tabBg.addEffect('fadeIn', 0.2, delay + (i * 0.1));
    scene.addChild(tabBg);
    
    const tabText = new FFText({ text: tab.name, x: tabX, y: y + 90, fontSize: 18 });
    tabText.setColor(tab.active ? COLORS.black : COLORS.white);
    tabText.alignCenter();
    tabText.addEffect('fadeIn', 0.2, delay + (i * 0.1) + 0.1);
    scene.addChild(tabText);
  });
}

// ============================================
// HELPER: Add File Icon
// ============================================
function addFileIcon(scene, x, y, fileName, color, delay = 0) {
  // File icon background
  const fileIcon = new FFRect({ 
    color: color, 
    width: 80, 
    height: 100, 
    x: x, 
    y: y 
  });
  fileIcon.addEffect('bounceIn', 0.4, delay);
  scene.addChild(fileIcon);
  
  // File corner fold
  const fold = new FFRect({ 
    color: COLORS.windowWhite, 
    width: 20, 
    height: 20, 
    x: x + 30, 
    y: y - 40 
  });
  fold.addEffect('fadeIn', 0.2, delay + 0.1);
  scene.addChild(fold);
  
  // File name label
  const label = new FFText({ text: fileName, x: x, y: y + 70, fontSize: 16 });
  label.setColor(COLORS.white);
  label.alignCenter();
  label.addEffect('fadeIn', 0.3, delay + 0.2);
  scene.addChild(label);
  
  return fileIcon;
}

// ============================================
// HELPER: Add Folder Icon
// ============================================
function addFolderIcon(scene, x, y, folderName, delay = 0) {
  // Folder back
  const folderBack = new FFRect({ 
    color: COLORS.folderOrange, 
    width: 120, 
    height: 90, 
    x: x, 
    y: y + 10 
  });
  folderBack.addEffect('zoomIn', 0.4, delay);
  scene.addChild(folderBack);
  
  // Folder tab
  const folderTab = new FFRect({ 
    color: COLORS.folderYellow, 
    width: 60, 
    height: 20, 
    x: x - 30, 
    y: y - 35 
  });
  folderTab.addEffect('fadeIn', 0.3, delay + 0.1);
  scene.addChild(folderTab);
  
  // Folder front
  const folderFront = new FFRect({ 
    color: COLORS.folderYellow, 
    width: 120, 
    height: 80, 
    x: x, 
    y: y + 5 
  });
  folderFront.addEffect('fadeIn', 0.3, delay + 0.15);
  scene.addChild(folderFront);
  
  // Folder name
  const label = new FFText({ text: folderName, x: x, y: y + 80, fontSize: 20 });
  label.setColor(COLORS.white);
  label.alignCenter();
  label.addEffect('fadeIn', 0.3, delay + 0.2);
  scene.addChild(label);
  
  return folderFront;
}

// ============================================
// HELPER: Add Popup Window
// ============================================
function addPopupWindow(scene, x, y, title, message, delay = 0) {
  // Popup background
  const popup = new FFRect({ 
    color: COLORS.windowWhite, 
    width: 400, 
    height: 200, 
    x: x, 
    y: y 
  });
  popup.addEffect('bounceIn', 0.4, delay);
  scene.addChild(popup);
  
  // Popup title bar
  const popupTitle = new FFRect({ 
    color: COLORS.buttonBlue, 
    width: 400, 
    height: 40, 
    x: x, 
    y: y - 80 
  });
  popupTitle.addEffect('fadeIn', 0.3, delay + 0.1);
  scene.addChild(popupTitle);
  
  // Title text
  const titleText = new FFText({ text: title, x: x, y: y - 80, fontSize: 22 });
  titleText.setColor(COLORS.white);
  titleText.alignCenter();
  titleText.addEffect('fadeIn', 0.3, delay + 0.2);
  scene.addChild(titleText);
  
  // Message text
  const msgText = new FFText({ text: message, x: x, y: y, fontSize: 24 });
  msgText.setColor(COLORS.black);
  msgText.alignCenter();
  msgText.addEffect('fadeIn', 0.3, delay + 0.3);
  scene.addChild(msgText);
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createDesktopChaosVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 27: "Desktop Chaos"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~30 seconds'));
  console.log(colors.yellow('🎨 Theme: Work/Relatable - Procrastination\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-27-desktop-chaos.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: DESKTOP INTRO - Clean Start (5s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.desktopBlue);
  scene1.setDuration(5);

  // Desktop wallpaper gradient
  const wallpaper = new FFRect({ 
    color: COLORS.wallpaperGradient, 
    width: width, 
    height: height, 
    x: width/2, 
    y: height/2 
  });
  wallpaper.setOpacity(0.5);
  wallpaper.addEffect('fadeIn', 0.5, 0);
  scene1.addChild(wallpaper);

  // Browser window
  addBrowserWindow(scene1, 200, 1400, 0.5);
  addBrowserTabs(scene1, 200, 1);

  // Title text in browser
  const titleText = new FFText({ text: 'PROCRASTINATION', x: width/2, y: 500, fontSize: 64 });
  titleText.setColor(COLORS.black);
  titleText.alignCenter();
  titleText.addEffect('fadeIn', 0.6, 1.5);
  scene1.addChild(titleText);

  const subtitleText = new FFText({ text: 'A Visual Journey', x: width/2, y: 600, fontSize: 36 });
  subtitleText.setColor(COLORS.textGray);
  subtitleText.alignCenter();
  subtitleText.addEffect('fadeIn', 0.5, 2);
  scene1.addChild(subtitleText);

  // Time display
  const timeText = new FFText({ text: '9:00 AM - Monday', x: width/2, y: 1500, fontSize: 32 });
  timeText.setColor(COLORS.white);
  timeText.alignCenter();
  timeText.addEffect('fadeIn', 0.5, 2.5);
  scene1.addChild(timeText);

  scene1.setTransition('fade', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Desktop Intro - Clean Start (5s)'));

  // ============================================
  // SCENE 2: FILES APPEAR - Tasks Pile Up (6s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.desktopBlue);
  scene2.setDuration(6);

  // Desktop background
  const wallpaper2 = new FFRect({ 
    color: COLORS.wallpaperGradient, 
    width: width, 
    height: height, 
    x: width/2, 
    y: height/2 
  });
  wallpaper2.setOpacity(0.5);
  scene2.addChild(wallpaper2);

  // Browser window
  addBrowserWindow(scene2, 200, 1400, 0);
  addBrowserTabs(scene2, 200, 0.2);

  // Files appearing on desktop
  const files = [
    { name: 'Report.doc', color: COLORS.fileBlue, x: 250, y: 500 },
    { name: 'Budget.xls', color: COLORS.fileGreen, x: 450, y: 500 },
    { name: 'Email.msg', color: COLORS.fileRed, x: 650, y: 500 },
    { name: 'Meeting.ppt', color: COLORS.filePurple, x: 850, y: 500 },
    { name: 'Task1.pdf', color: COLORS.fileBlue, x: 250, y: 750 },
    { name: 'Task2.pdf', color: COLORS.fileGreen, x: 450, y: 750 },
    { name: 'Task3.pdf', color: COLORS.fileRed, x: 650, y: 750 },
    { name: 'Task4.pdf', color: COLORS.filePurple, x: 850, y: 750 }
  ];

  files.forEach((file, i) => {
    addFileIcon(scene2, file.x, file.y, file.name, file.color, 0.5 + (i * 0.2));
  });

  // "Tomorrow" folder appears
  addFolderIcon(scene2, width/2, 1200, '📁 Tomorrow', 2.5);

  // Stress text
  const stressText = new FFText({ text: 'So much to do...', x: width/2, y: 1500, fontSize: 38 });
  stressText.setColor(COLORS.white);
  stressText.alignCenter();
  stressText.addEffect('fadeIn', 0.5, 3);
  scene2.addChild(stressText);

  scene2.setTransition('directionalwarp', 0.4);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Files Appear - Tasks Pile Up (6s)'));

  // ============================================
  // SCENE 3: DRAGGING FILES - Procrastination (7s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.desktopBlue);
  scene3.setDuration(7);

  // Desktop background
  const wallpaper3 = new FFRect({ 
    color: COLORS.wallpaperGradient, 
    width: width, 
    height: height, 
    x: width/2, 
    y: height/2 
  });
  wallpaper3.setOpacity(0.5);
  scene3.addChild(wallpaper3);

  // Browser window
  addBrowserWindow(scene3, 200, 1400, 0);
  addBrowserTabs(scene3, 200, 0);

  // Tomorrow folder (larger, glowing)
  const tomorrowFolder = addFolderIcon(scene3, width/2, 1000, '📁 Tomorrow', 0.3);
  
  // Glow effect on folder
  const folderGlow = new FFRect({ 
    color: COLORS.folderYellow, 
    width: 200, 
    height: 200, 
    x: width/2, 
    y: 1000 
  });
  folderGlow.setOpacity(0.3);
  folderGlow.addEffect('fadeIn', 0.5, 0.5);
  const glowPulse = {
    from: { scale: 1.0 },
    to: { scale: 1.3 },
    time: 1,
    delay: 1,
    ease: 'Sine.InOut'
  };
  folderGlow.addAnimate(glowPulse);
  scene3.addChild(folderGlow);

  // Files being dragged (motion trails)
  const dragFiles = [
    { x: 300, y: 500, targetY: 1000, delay: 1 },
    { x: 500, y: 500, targetY: 1000, delay: 1.5 },
    { x: 700, y: 500, targetY: 1000, delay: 2 },
    { x: 300, y: 700, targetY: 1000, delay: 2.5 },
    { x: 500, y: 700, targetY: 1000, delay: 3 },
    { x: 700, y: 700, targetY: 1000, delay: 3.5 }
  ];

  dragFiles.forEach((file, i) => {
    const dragFile = new FFRect({ 
      color: i % 2 === 0 ? COLORS.fileBlue : COLORS.fileGreen, 
      width: 80, 
      height: 100, 
      x: file.x, 
      y: file.y 
    });
    dragFile.setOpacity(0.8);
    dragFile.addEffect('fadeIn', 0.2, file.delay);
    
    // Drag animation
    const dragAnim = {
      from: { y: file.y },
      to: { y: file.targetY },
      time: 0.8,
      delay: file.delay + 0.2,
      ease: 'Cubic.InOut'
    };
    dragFile.addAnimate(dragAnim);
    dragFile.addEffect('fadeOut', 0.3, file.delay + 0.9);
    scene3.addChild(dragFile);
  });

  // Procrastination text
  const procrastText = new FFText({ text: "I'll do it tomorrow...", x: width/2, y: 600, fontSize: 42 });
  procrastText.setColor(COLORS.white);
  procrastText.alignCenter();
  procrastText.addEffect('fadeIn', 0.5, 2);
  scene3.addChild(procrastText);

  scene3.setTransition('windowslice', 0.5);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Dragging Files - Procrastination (7s)'));

  // ============================================
  // SCENE 4: FOLDER OVERLOAD - Warning Signs (6s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.desktopBlue);
  scene4.setDuration(6);

  // Desktop background
  const wallpaper4 = new FFRect({ 
    color: COLORS.wallpaperGradient, 
    width: width, 
    height: height, 
    x: width/2, 
    y: height/2 
  });
  wallpaper4.setOpacity(0.5);
  scene4.addChild(wallpaper4);

  // Browser window
  addBrowserWindow(scene4, 200, 1400, 0);
  addBrowserTabs(scene4, 200, 0);

  // Overloaded Tomorrow folder (shaking)
  const overloadFolder = addFolderIcon(scene4, width/2, 900, '📁 Tomorrow', 0.3);
  
  // Shake animation
  const shakeAnim1 = {
    from: { x: width/2 },
    to: { x: width/2 + 10 },
    time: 0.1,
    delay: 1,
    ease: 'Linear.None'
  };
  overloadFolder.addAnimate(shakeAnim1);
  
  const shakeAnim2 = {
    from: { x: width/2 + 10 },
    to: { x: width/2 - 10 },
    time: 0.1,
    delay: 1.1,
    ease: 'Linear.None'
  };
  overloadFolder.addAnimate(shakeAnim2);

  // Warning popups
  addPopupWindow(scene4, 300, 500, '⚠️ Warning', 'Folder is full!', 1.5);
  addPopupWindow(scene4, 780, 650, '⚠️ Alert', 'Deadline approaching!', 2);
  addPopupWindow(scene4, 540, 1200, '⚠️ Error', 'Too many tasks!', 2.5);

  // Multiple notification badges
  for (let i = 0; i < 10; i++) {
    const badge = new FFRect({ 
      color: COLORS.buttonRed, 
      width: 40, 
      height: 40, 
      x: 200 + (i * 80), 
      y: 1500 + (Math.random() * 100) 
    });
    badge.addEffect('bounceIn', 0.3, 3 + (i * 0.1));
    scene4.addChild(badge);
    
    const badgeNum = new FFText({ text: '99+', x: 200 + (i * 80), y: 1500 + (Math.random() * 100), fontSize: 18 });
    badgeNum.setColor(COLORS.white);
    badgeNum.alignCenter();
    badgeNum.addEffect('fadeIn', 0.2, 3 + (i * 0.1) + 0.1);
    scene4.addChild(badgeNum);
  }

  // Panic text
  const panicText = new FFText({ text: 'OH NO...', x: width/2, y: 350, fontSize: 56 });
  panicText.setColor(COLORS.buttonRed);
  panicText.alignCenter();
  panicText.addEffect('bounceIn', 0.5, 3.5);
  scene4.addChild(panicText);

  scene4.setTransition('crosswarp', 0.5);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Folder Overload - Warning Signs (6s)'));

  // ============================================
  // SCENE 5: EXPLOSION - System Crash (6s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.desktopBlue);
  scene5.setDuration(6);

  // Desktop background
  const wallpaper5 = new FFRect({ 
    color: COLORS.wallpaperGradient, 
    width: width, 
    height: height, 
    x: width/2, 
    y: height/2 
  });
  wallpaper5.setOpacity(0.5);
  scene5.addChild(wallpaper5);

  // Explosion effect - expanding circles
  for (let i = 0; i < 8; i++) {
    const explosion = new FFRect({ 
      color: i % 2 === 0 ? COLORS.buttonRed : COLORS.warningYellow, 
      width: 100 + (i * 50), 
      height: 100 + (i * 50), 
      x: width/2, 
      y: height/2 
    });
    explosion.setOpacity(0.6);
    explosion.addEffect('fadeIn', 0.1, 0.5 + (i * 0.1));
    
    const explodeAnim = {
      from: { scale: 0.5 },
      to: { scale: 3.0 },
      time: 1.5,
      delay: 0.5 + (i * 0.1),
      ease: 'Cubic.Out'
    };
    explosion.addAnimate(explodeAnim);
    explosion.addEffect('fadeOut', 0.5, 1.5 + (i * 0.1));
    scene5.addChild(explosion);
  }

  // Flying debris (files and icons)
  for (let i = 0; i < 20; i++) {
    const debris = new FFRect({ 
      color: [COLORS.fileBlue, COLORS.fileGreen, COLORS.fileRed, COLORS.filePurple][i % 4],
      width: 40, 
      height: 50, 
      x: width/2, 
      y: height/2 
    });
    debris.setOpacity(0.8);
    debris.addEffect('fadeIn', 0.1, 0.8);
    
    const angle = (i / 20) * Math.PI * 2;
    const distance = 400 + (Math.random() * 300);
    const targetX = width/2 + Math.cos(angle) * distance;
    const targetY = height/2 + Math.sin(angle) * distance;
    
    const flyAnim = {
      from: { x: width/2, y: height/2 },
      to: { x: targetX, y: targetY },
      time: 1.2,
      delay: 0.8,
      ease: 'Cubic.Out'
    };
    debris.addAnimate(flyAnim);
    
    const rotateAnim = {
      from: { rotation: 0 },
      to: { rotation: Math.PI * 4 },
      time: 1.2,
      delay: 0.8,
      ease: 'Linear.None'
    };
    debris.addAnimate(rotateAnim);
    
    debris.addEffect('fadeOut', 0.4, 1.8);
    scene5.addChild(debris);
  }

  // Error screen
  const errorScreen = new FFRect({ 
    color: COLORS.buttonBlue, 
    width: width, 
    height: height, 
    x: width/2, 
    y: height/2 
  });
  errorScreen.addEffect('fadeIn', 0.5, 2.5);
  scene5.addChild(errorScreen);

  // Sad face emoji
  const sadFace = new FFText({ text: '😰', x: width/2, y: 700, fontSize: 150 });
  sadFace.alignCenter();
  sadFace.addEffect('bounceIn', 0.6, 3);
  scene5.addChild(sadFace);

  // Error message
  const errorTitle = new FFText({ text: 'SYSTEM OVERLOAD', x: width/2, y: 950, fontSize: 56 });
  errorTitle.setColor(COLORS.white);
  errorTitle.alignCenter();
  errorTitle.addEffect('fadeIn', 0.5, 3.5);
  scene5.addChild(errorTitle);

  const errorMsg = new FFText({ text: 'Procrastination.exe has stopped working', x: width/2, y: 1050, fontSize: 32 });
  errorMsg.setColor(COLORS.lightGray);
  errorMsg.alignCenter();
  errorMsg.addEffect('fadeIn', 0.5, 4);
  scene5.addChild(errorMsg);

  // Moral of the story
  const moralText = new FFText({ text: 'Do it today, not tomorrow!', x: width/2, y: 1300, fontSize: 38 });
  moralText.setColor(COLORS.white);
  moralText.alignCenter();
  moralText.addEffect('fadeIn', 0.6, 4.5);
  scene5.addChild(moralText);

  // Hashtags
  const hashtagText = new FFText({ text: '#Procrastination #Relatable #WorkLife', x: width/2, y: 1500, fontSize: 28 });
  hashtagText.setColor(COLORS.lightGray);
  hashtagText.alignCenter();
  hashtagText.addEffect('fadeIn', 0.5, 5);
  scene5.addChild(hashtagText);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Explosion - System Crash (6s)'));

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
    console.log(colors.magenta('\n🎬 Story 27: "Desktop Chaos" complete!\n'));
    console.log(colors.yellow('🎥 Features used:'));
    console.log(colors.cyan('   • Browser window with tabs'));
    console.log(colors.cyan('   • File and folder icon animations'));
    console.log(colors.cyan('   • Drag and drop motion'));
    console.log(colors.cyan('   • Popup windows'));
    console.log(colors.cyan('   • Explosion effect with debris'));
    console.log(colors.cyan('   • Desktop UI elements\n'));
  });

  creator.start();
}

createDesktopChaosVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

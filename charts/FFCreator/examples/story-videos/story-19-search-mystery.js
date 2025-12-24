/**
 * 🎬 STORY 19: "Search Engine Mystery" - Text/UI
 * 
 * The Story: Someone types "Why am I..." into Google, and the 
 * auto-complete results tell a spooky story.
 * 
 * Visual Style:
 * - Clean web-browser interface (Google-style)
 * - Cursor animation with blinking effect
 * - Text type-on effect (character by character)
 * - Search bar that grows to fill screen
 * - Eerie auto-complete suggestions
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~45 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-19-search-mystery.js
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
// COLOR PALETTE - Google/Browser Theme
// ============================================
const COLORS = {
  // Google colors
  googleBlue: '#4285f4',
  googleRed: '#ea4335',
  googleYellow: '#fbbc04',
  googleGreen: '#34a853',
  
  // Browser UI
  white: '#ffffff',
  lightGray: '#f8f9fa',
  borderGray: '#dfe1e5',
  textGray: '#5f6368',
  darkGray: '#202124',
  
  // Search elements
  searchBarWhite: '#ffffff',
  searchShadow: 'rgba(0, 0, 0, 0.1)',
  hoverGray: '#f1f3f4',
  
  // Spooky elements
  eerieRed: '#8b0000',
  darkRed: '#4a0000',
  warningOrange: '#ff6b00',
  ghostWhite: '#f5f5f5',
  
  // Text
  black: '#000000',
  linkBlue: '#1a0dab',
  visitedPurple: '#681da8',
  suggestionGray: '#70757a'
};

// ============================================
// HELPER: Add Search Bar
// ============================================
function addSearchBar(scene, y, barWidth, delay = 0) {
  // Search bar shadow
  const shadow = new FFRect({ 
    color: COLORS.searchShadow, 
    width: barWidth + 10, 
    height: 55, 
    x: width/2, 
    y: y + 3 
  });
  shadow.addEffect('fadeIn', 0.3, delay);
  scene.addChild(shadow);
  
  // Search bar background
  const searchBar = new FFRect({ 
    color: COLORS.searchBarWhite, 
    width: barWidth, 
    height: 50, 
    x: width/2, 
    y: y 
  });
  searchBar.addEffect('zoomIn', 0.4, delay + 0.1);
  scene.addChild(searchBar);
  
  // Search bar border
  const border = new FFRect({ 
    color: COLORS.borderGray, 
    width: barWidth + 2, 
    height: 52, 
    x: width/2, 
    y: y 
  });
  border.addEffect('fadeIn', 0.2, delay + 0.2);
  scene.addChild(border);
  
  return searchBar;
}

// ============================================
// HELPER: Add Cursor
// ============================================
function addCursor(scene, x, y, delay = 0) {
  const cursor = new FFRect({ 
    color: COLORS.black, 
    width: 2, 
    height: 28, 
    x: x, 
    y: y 
  });
  cursor.addEffect('fadeIn', 0.1, delay);
  cursor.addEffect('fadeOut', 0.3, delay + 0.5);
  cursor.addEffect('fadeIn', 0.3, delay + 0.8);
  cursor.addEffect('fadeOut', 0.3, delay + 1.1);
  scene.addChild(cursor);
}

// ============================================
// HELPER: Add Auto-complete Suggestion
// ============================================
function addSuggestion(scene, text, x, y, delay = 0, isSpooky = false) {
  // Suggestion background (hover effect)
  const suggestionBg = new FFRect({ 
    color: COLORS.hoverGray, 
    width: 850, 
    height: 60, 
    x: x, 
    y: y 
  });
  suggestionBg.addEffect('fadeIn', 0.2, delay);
  scene.addChild(suggestionBg);
  
  // Search icon
  const searchIcon = new FFText({ text: '🔍', x: x - 380, y: y, fontSize: 24 });
  searchIcon.addEffect('fadeIn', 0.2, delay + 0.1);
  scene.addChild(searchIcon);
  
  // Suggestion text
  const suggestionText = new FFText({ text: text, x: x - 320, y: y, fontSize: 28 });
  suggestionText.setColor(isSpooky ? COLORS.eerieRed : COLORS.suggestionGray);
  suggestionText.setAnchor(0, 0.5);
  suggestionText.addEffect('fadeIn', 0.3, delay + 0.2);
  scene.addChild(suggestionText);
}

// ============================================
// HELPER: Type Text Character by Character
// ============================================
function typeText(scene, fullText, x, y, fontSize, startDelay = 0) {
  const charDelay = 0.08; // Delay between each character
  
  for (let i = 0; i < fullText.length; i++) {
    const char = fullText[i];
    const charX = x + (i * (fontSize * 0.5)); // Approximate character spacing
    
    const charText = new FFText({ text: char, x: charX, y: y, fontSize: fontSize });
    charText.setColor(COLORS.darkGray);
    charText.setAnchor(0, 0.5);
    charText.addEffect('fadeIn', 0.1, startDelay + (i * charDelay));
    scene.addChild(charText);
  }
  
  return startDelay + (fullText.length * charDelay);
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createSearchMysteryVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 19: "Search Engine Mystery"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~45 seconds'));
  console.log(colors.yellow('🎨 Theme: Text/UI - Spooky Search\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-19-search-mystery.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: INTRO - Browser Opens (8s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.white);
  scene1.setDuration(8);

  // Browser chrome (top bar)
  const browserBar = new FFRect({ color: COLORS.lightGray, width: 1080, height: 80, x: width/2, y: 40 });
  browserBar.addEffect('fadeInDown', 0.4, 0.3);
  scene1.addChild(browserBar);

  // Browser dots (close, minimize, maximize)
  const dot1 = new FFRect({ color: COLORS.googleRed, width: 15, height: 15, x: 50, y: 40 });
  dot1.addEffect('fadeIn', 0.2, 0.5);
  scene1.addChild(dot1);

  const dot2 = new FFRect({ color: COLORS.googleYellow, width: 15, height: 15, x: 80, y: 40 });
  dot2.addEffect('fadeIn', 0.2, 0.6);
  scene1.addChild(dot2);

  const dot3 = new FFRect({ color: COLORS.googleGreen, width: 15, height: 15, x: 110, y: 40 });
  dot3.addEffect('fadeIn', 0.2, 0.7);
  scene1.addChild(dot3);

  // URL bar
  const urlBar = new FFRect({ color: COLORS.white, width: 900, height: 45, x: width/2, y: 40 });
  urlBar.addEffect('fadeIn', 0.3, 0.8);
  scene1.addChild(urlBar);

  const urlBorder = new FFRect({ color: COLORS.borderGray, width: 902, height: 47, x: width/2, y: 40 });
  urlBorder.addEffect('fadeIn', 0.2, 0.9);
  scene1.addChild(urlBorder);

  // URL text
  const urlText = new FFText({ text: 'google.com', x: 200, y: 40, fontSize: 24 });
  urlText.setColor(COLORS.textGray);
  urlText.setAnchor(0, 0.5);
  urlText.addEffect('fadeIn', 0.3, 1.2);
  scene1.addChild(urlText);

  // Google logo
  const logoG = new FFText({ text: 'G', x: width/2 - 150, y: 400, fontSize: 100 });
  logoG.setColor(COLORS.googleBlue);
  logoG.addEffect('bounceIn', 0.5, 1.5);
  scene1.addChild(logoG);

  const logoO1 = new FFText({ text: 'o', x: width/2 - 50, y: 400, fontSize: 100 });
  logoO1.setColor(COLORS.googleRed);
  logoO1.addEffect('bounceIn', 0.5, 1.7);
  scene1.addChild(logoO1);

  const logoO2 = new FFText({ text: 'o', x: width/2 + 30, y: 400, fontSize: 100 });
  logoO2.setColor(COLORS.googleYellow);
  logoO2.addEffect('bounceIn', 0.5, 1.9);
  scene1.addChild(logoO2);

  const logoG2 = new FFText({ text: 'g', x: width/2 + 110, y: 400, fontSize: 100 });
  logoG2.setColor(COLORS.googleBlue);
  logoG2.addEffect('bounceIn', 0.5, 2.1);
  scene1.addChild(logoG2);

  const logoL = new FFText({ text: 'l', x: width/2 + 170, y: 400, fontSize: 100 });
  logoL.setColor(COLORS.googleGreen);
  logoL.addEffect('bounceIn', 0.5, 2.3);
  scene1.addChild(logoL);

  const logoE = new FFText({ text: 'e', x: width/2 + 210, y: 400, fontSize: 100 });
  logoE.setColor(COLORS.googleRed);
  logoE.addEffect('bounceIn', 0.5, 2.5);
  scene1.addChild(logoE);

  // Initial search bar
  addSearchBar(scene1, 600, 850, 3);

  // Search icon in bar
  const searchIconBar = new FFText({ text: '🔍', x: 200, y: 600, fontSize: 28 });
  searchIconBar.addEffect('fadeIn', 0.3, 3.5);
  scene1.addChild(searchIconBar);

  // Placeholder text
  const placeholder = new FFText({ text: 'Search Google or type a URL', x: 260, y: 600, fontSize: 26 });
  placeholder.setColor(COLORS.textGray);
  placeholder.setAnchor(0, 0.5);
  placeholder.addEffect('fadeIn', 0.3, 3.7);
  scene1.addChild(placeholder);

  // Cursor appears
  addCursor(scene1, 260, 600, 5);

  // Warning text
  const warningText = new FFText({ text: 'Something feels... off', x: width/2, y: 1500, fontSize: 32 });
  warningText.setColor(COLORS.textGray);
  warningText.alignCenter();
  warningText.addEffect('fadeIn', 0.5, 6);
  scene1.addChild(warningText);

  scene1.setTransition('fade', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Intro - Browser Opens (8s)'));

  // ============================================
  // SCENE 2: TYPING - "Why am I..." (9s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.white);
  scene2.setDuration(9);

  // Browser bar
  const browserBar2 = new FFRect({ color: COLORS.lightGray, width: 1080, height: 80, x: width/2, y: 40 });
  browserBar2.addEffect('fadeIn', 0.2, 0);
  scene2.addChild(browserBar2);

  // Search bar - centered and larger
  addSearchBar(scene2, 500, 900, 0.3);

  // Search icon
  const searchIcon2 = new FFText({ text: '🔍', x: 200, y: 500, fontSize: 32 });
  searchIcon2.addEffect('fadeIn', 0.2, 0.5);
  scene2.addChild(searchIcon2);

  // Type "Why am I..."
  const typedText = "Why am I...";
  const endTime = typeText(scene2, typedText, 270, 500, 36, 1);

  // Cursor blinking after typing
  addCursor(scene2, 270 + (typedText.length * 18), 500, endTime);

  // Dropdown appears
  const dropdownBg = new FFRect({ color: COLORS.white, width: 900, height: 400, x: width/2, y: 750 });
  dropdownBg.addEffect('fadeIn', 0.3, endTime + 0.5);
  scene2.addChild(dropdownBg);

  const dropdownBorder = new FFRect({ color: COLORS.borderGray, width: 902, height: 402, x: width/2, y: 750 });
  dropdownBorder.addEffect('fadeIn', 0.2, endTime + 0.6);
  scene2.addChild(dropdownBorder);

  // First suggestions (normal)
  addSuggestion(scene2, 'why am i so tired', width/2, 600, endTime + 1, false);
  addSuggestion(scene2, 'why am i always cold', width/2, 670, endTime + 1.3, false);
  addSuggestion(scene2, 'why am i so hungry', width/2, 740, endTime + 1.6, false);

  // Then... spooky ones appear
  addSuggestion(scene2, 'why am i being watched', width/2, 810, endTime + 2.5, true);
  addSuggestion(scene2, 'why am i not alone', width/2, 880, endTime + 3, true);

  // Eerie text at bottom
  const eerieText = new FFText({ text: 'Wait... what?', x: width/2, y: 1200, fontSize: 38 });
  eerieText.setColor(COLORS.darkGray);
  eerieText.alignCenter();
  eerieText.addEffect('fadeIn', 0.5, endTime + 4);
  scene2.addChild(eerieText);

  scene2.setTransition('directionalwarp', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Typing - "Why am I..." (9s)'));

  // ============================================
  // SCENE 3: CLICKING - First Spooky Result (9s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.white);
  scene3.setDuration(9);

  // Browser bar
  const browserBar3 = new FFRect({ color: COLORS.lightGray, width: 1080, height: 80, x: width/2, y: 40 });
  browserBar3.addEffect('fadeIn', 0.2, 0);
  scene3.addChild(browserBar3);

  // Search bar grows to fill more space
  addSearchBar(scene3, 200, 950, 0.3);

  // Clicked search text
  const clickedText = new FFText({ text: 'why am i being watched', x: 270, y: 200, fontSize: 32 });
  clickedText.setColor(COLORS.darkGray);
  clickedText.setAnchor(0, 0.5);
  clickedText.addEffect('fadeIn', 0.3, 0.5);
  scene3.addChild(clickedText);

  // Results title
  const resultsText = new FFText({ text: 'Search Results', x: 150, y: 350, fontSize: 28 });
  resultsText.setColor(COLORS.textGray);
  resultsText.setAnchor(0, 0.5);
  resultsText.addEffect('fadeIn', 0.3, 1);
  scene3.addChild(resultsText);

  // Result 1
  const result1Title = new FFText({ text: 'Someone is watching you right now', x: 150, y: 480, fontSize: 32 });
  result1Title.setColor(COLORS.linkBlue);
  result1Title.setAnchor(0, 0.5);
  result1Title.addEffect('fadeIn', 0.4, 1.5);
  scene3.addChild(result1Title);

  const result1Desc = new FFText({ text: 'They know what you searched. They know where you are...', x: 150, y: 530, fontSize: 24 });
  result1Desc.setColor(COLORS.textGray);
  result1Desc.setAnchor(0, 0.5);
  result1Desc.addEffect('fadeIn', 0.3, 1.8);
  scene3.addChild(result1Desc);

  // Result 2
  const result2Title = new FFText({ text: 'You should not have searched this', x: 150, y: 650, fontSize: 32 });
  result2Title.setColor(COLORS.linkBlue);
  result2Title.setAnchor(0, 0.5);
  result2Title.addEffect('fadeIn', 0.4, 2.5);
  scene3.addChild(result2Title);

  const result2Desc = new FFText({ text: 'Turn around. Look behind you. Do you see them?', x: 150, y: 700, fontSize: 24 });
  result2Desc.setColor(COLORS.textGray);
  result2Desc.setAnchor(0, 0.5);
  result2Desc.addEffect('fadeIn', 0.3, 2.8);
  scene3.addChild(result2Desc);

  // Result 3
  const result3Title = new FFText({ text: 'They are closer than you think', x: 150, y: 820, fontSize: 32 });
  result3Title.setColor(COLORS.eerieRed);
  result3Title.setAnchor(0, 0.5);
  result3Title.addEffect('fadeIn', 0.4, 3.5);
  scene3.addChild(result3Title);

  const result3Desc = new FFText({ text: 'Behind the screen. In the shadows. Always watching...', x: 150, y: 870, fontSize: 24 });
  result3Desc.setColor(COLORS.textGray);
  result3Desc.setAnchor(0, 0.5);
  result3Desc.addEffect('fadeIn', 0.3, 3.8);
  scene3.addChild(result3Desc);

  // Warning box
  const warningBox = new FFRect({ color: COLORS.eerieRed, width: 800, height: 150, x: width/2, y: 1150 });
  warningBox.addEffect('zoomIn', 0.5, 5);
  scene3.addChild(warningBox);

  const warningTitle = new FFText({ text: '⚠️ WARNING', x: width/2, y: 1110, fontSize: 42 });
  warningTitle.setColor(COLORS.white);
  warningTitle.alignCenter();
  warningTitle.addEffect('bounceIn', 0.4, 5.3);
  scene3.addChild(warningTitle);

  const warningMsg = new FFText({ text: 'Close this window immediately', x: width/2, y: 1180, fontSize: 32 });
  warningMsg.setColor(COLORS.white);
  warningMsg.alignCenter();
  warningMsg.addEffect('fadeIn', 0.3, 5.6);
  scene3.addChild(warningMsg);

  scene3.setTransition('crosswarp', 0.6);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Clicking - First Spooky Result (9s)'));

  // ============================================
  // SCENE 4: NEW SEARCH - "How do I escape" (10s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.white);
  scene4.setDuration(10);

  // Browser bar - glitching slightly
  const browserBar4 = new FFRect({ color: COLORS.lightGray, width: 1080, height: 80, x: width/2, y: 40 });
  browserBar4.addEffect('fadeIn', 0.2, 0);
  scene4.addChild(browserBar4);

  // Search bar - now dominates the screen
  addSearchBar(scene4, 400, 980, 0.3);

  // Search icon
  const searchIcon4 = new FFText({ text: '🔍', x: 180, y: 400, fontSize: 36 });
  searchIcon4.addEffect('fadeIn', 0.2, 0.5);
  scene4.addChild(searchIcon4);

  // Type new search
  const typedText2 = "How do I escape";
  const endTime2 = typeText(scene4, typedText2, 260, 400, 38, 1);

  // Cursor
  addCursor(scene4, 260 + (typedText2.length * 19), 400, endTime2);

  // Dropdown with terrifying suggestions
  const dropdownBg4 = new FFRect({ color: COLORS.white, width: 980, height: 500, x: width/2, y: 720 });
  dropdownBg4.addEffect('fadeIn', 0.3, endTime2 + 0.5);
  scene4.addChild(dropdownBg4);

  const dropdownBorder4 = new FFRect({ color: COLORS.eerieRed, width: 984, height: 504, x: width/2, y: 720 });
  dropdownBorder4.addEffect('fadeIn', 0.2, endTime2 + 0.6);
  scene4.addChild(dropdownBorder4);

  // Spooky suggestions
  addSuggestion(scene4, 'how do i escape... you cannot', width/2, 550, endTime2 + 1.2, true);
  addSuggestion(scene4, 'how do i escape... there is no escape', width/2, 630, endTime2 + 1.6, true);
  addSuggestion(scene4, 'how do i escape... we are already here', width/2, 710, endTime2 + 2, true);
  addSuggestion(scene4, 'how do i escape... look behind you', width/2, 790, endTime2 + 2.4, true);
  addSuggestion(scene4, 'how do i escape... it is too late', width/2, 870, endTime2 + 2.8, true);

  // Glitch effect - red flashes
  for (let i = 0; i < 5; i++) {
    const glitchFlash = new FFRect({ color: COLORS.eerieRed, width: 1080, height: 1920, x: width/2, y: height/2 });
    glitchFlash.addEffect('fadeIn', 0.05, endTime2 + 3.5 + (i * 0.3));
    glitchFlash.addEffect('fadeOut', 0.05, endTime2 + 3.6 + (i * 0.3));
    scene4.addChild(glitchFlash);
  }

  // Error message
  const errorBox = new FFRect({ color: COLORS.darkRed, width: 900, height: 200, x: width/2, y: 1300 });
  errorBox.addEffect('zoomIn', 0.5, endTime2 + 5);
  scene4.addChild(errorBox);

  const errorText1 = new FFText({ text: 'CONNECTION LOST', x: width/2, y: 1260, fontSize: 48 });
  errorText1.setColor(COLORS.white);
  errorText1.alignCenter();
  errorText1.addEffect('bounceIn', 0.4, endTime2 + 5.3);
  scene4.addChild(errorText1);

  const errorText2 = new FFText({ text: 'They found you', x: width/2, y: 1340, fontSize: 36 });
  errorText2.setColor(COLORS.warningOrange);
  errorText2.alignCenter();
  errorText2.addEffect('fadeIn', 0.3, endTime2 + 5.6);
  scene4.addChild(errorText2);

  scene4.setTransition('zoomIn', 0.7);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: New Search - "How do I escape" (10s)'));

  // ============================================
  // SCENE 5: FINALE - Screen Takeover (9s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.black);
  scene5.setDuration(9);

  // Static/glitch effect
  for (let i = 0; i < 100; i++) {
    const staticDot = new FFRect({ 
      color: i % 2 === 0 ? COLORS.white : COLORS.eerieRed, 
      width: 3 + Math.random() * 8, 
      height: 3 + Math.random() * 8, 
      x: Math.random() * width, 
      y: Math.random() * height 
    });
    staticDot.addEffect('fadeIn', 0.1, Math.random() * 2);
    staticDot.addEffect('fadeOut', 0.1, 1 + Math.random() * 2);
    scene5.addChild(staticDot);
  }

  // Final message - appears through static
  const finalBg = new FFRect({ color: COLORS.eerieRed, width: 900, height: 400, x: width/2, y: height/2 });
  finalBg.addEffect('zoomIn', 0.6, 1.5);
  scene5.addChild(finalBg);

  const finalText1 = new FFText({ text: 'YOU SEARCHED', x: width/2, y: 800, fontSize: 50 });
  finalText1.setColor(COLORS.white);
  finalText1.alignCenter();
  finalText1.addEffect('fadeIn', 0.4, 2);
  scene5.addChild(finalText1);

  const finalText2 = new FFText({ text: 'NOW WE FOUND YOU', x: width/2, y: 900, fontSize: 60 });
  finalText2.setColor(COLORS.white);
  finalText2.alignCenter();
  finalText2.addEffect('bounceIn', 0.5, 2.5);
  scene5.addChild(finalText2);

  // Eyes watching
  const eye1 = new FFText({ text: '👁️', x: width/2 - 100, y: 1100, fontSize: 80 });
  eye1.addEffect('zoomIn', 0.4, 3.5);
  scene5.addChild(eye1);

  const eye2 = new FFText({ text: '👁️', x: width/2 + 100, y: 1100, fontSize: 80 });
  eye2.addEffect('zoomIn', 0.4, 3.7);
  scene5.addChild(eye2);

  // Final warning
  const finalWarning = new FFText({ text: 'CLOSE THE APP', x: width/2, y: 1350, fontSize: 45 });
  finalWarning.setColor(COLORS.warningOrange);
  finalWarning.alignCenter();
  finalWarning.addEffect('fadeIn', 0.3, 5);
  finalWarning.addEffect('fadeOut', 0.2, 5.5);
  finalWarning.addEffect('fadeIn', 0.2, 5.8);
  finalWarning.addEffect('fadeOut', 0.2, 6.1);
  finalWarning.addEffect('fadeIn', 0.2, 6.4);
  scene5.addChild(finalWarning);

  // The End
  const theEnd = new FFText({ text: 'THE END...?', x: width/2, y: 1600, fontSize: 50 });
  theEnd.setColor(COLORS.white);
  theEnd.alignCenter();
  theEnd.addEffect('fadeIn', 0.5, 7);
  scene5.addChild(theEnd);

  // Hashtags
  const hashtags = new FFText({ text: '#SearchMystery #Creepy #Horror', x: width/2, y: 1750, fontSize: 28 });
  hashtags.setColor(COLORS.textGray);
  hashtags.alignCenter();
  hashtags.addEffect('fadeIn', 0.4, 7.5);
  scene5.addChild(hashtags);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Finale - Screen Takeover (9s)'));

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
    console.log(colors.magenta('\n🎬 Story 19: "Search Engine Mystery" complete!\n'));
  });

  creator.start();
}

createSearchMysteryVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

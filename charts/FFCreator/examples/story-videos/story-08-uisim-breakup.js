/**
 * 🎬 STORY 8: "UI Sim: Breakup" - Screen Narrative
 * 
 * The Story: A story told entirely through a smartphone interface:
 * typing a text, deleting it, and browsing old photos.
 * 
 * Visual Style:
 * - Realistic mobile OS simulation
 * - Screen recording overlay aesthetic
 * - Fake cursor/typing movement
 * - Glassmorphism effects with blurred backgrounds
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~50 seconds
 * 
 * Run with: node examples/story-videos/story-08-uisim-breakup.js
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
// COLOR PALETTE - iOS/Mobile UI
// ============================================
const COLORS = {
  // iOS System colors
  iosBlue: '#007aff',
  iosGreen: '#34c759',
  iosRed: '#ff3b30',
  iosGray: '#8e8e93',
  iosLightGray: '#c7c7cc',
  
  // UI backgrounds
  screenBg: '#000000',
  statusBar: '#1c1c1e',
  messageBubbleBlue: '#007aff',
  messageBubbleGray: '#3a3a3c',
  inputBg: '#1c1c1e',
  
  // Glassmorphism
  glassWhite: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
  blurOverlay: 'rgba(0, 0, 0, 0.4)',
  
  // Text
  white: '#ffffff',
  lightGray: '#ebebf5',
  dimGray: '#636366',
  
  // Accent
  heartRed: '#ff2d55',
  notifRed: '#ff3b30'
};

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createUISimBreakupVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 8: "UI Sim: Breakup"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~50 seconds'));
  console.log(colors.yellow('🎨 Theme: Screen Narrative - Mobile UI Simulation\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-08-uisim-breakup.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: LOCK SCREEN - 2:47 AM (6s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.screenBg);
  scene1.setDuration(6);

  // Blurred background (glassmorphism base)
  const blurBg1 = new FFRect({ color: '#1a1a2e', width: 1100, height: 2000, x: width/2, y: height/2 });
  blurBg1.addEffect('fadeIn', 0.5, 0);
  scene1.addChild(blurBg1);

  // Gradient overlay
  const gradOverlay = new FFRect({ color: 'rgba(0,0,0,0.3)', width: 1100, height: 1000, x: width/2, y: 400 });
  gradOverlay.addEffect('fadeIn', 0.3, 0.2);
  scene1.addChild(gradOverlay);

  // Status bar
  const statusBar = new FFRect({ color: COLORS.statusBar, width: 1080, height: 50, x: width/2, y: 25 });
  statusBar.addEffect('fadeIn', 0.3, 0.3);
  scene1.addChild(statusBar);

  // Time - large
  const timeText = new FFText({ text: '2:47', x: width/2, y: 450, fontSize: 180 });
  timeText.setColor(COLORS.white);
  timeText.alignCenter();
  timeText.addEffect('fadeIn', 0.8, 0.5);
  scene1.addChild(timeText);

  // Date
  const dateText = new FFText({ text: 'Saturday, November 23', x: width/2, y: 580, fontSize: 36 });
  dateText.setColor(COLORS.lightGray);
  dateText.alignCenter();
  dateText.addEffect('fadeIn', 0.5, 0.8);
  scene1.addChild(dateText);

  // Notification card - glassmorphism
  const notifCard = new FFRect({ color: 'rgba(60, 60, 67, 0.8)', width: 950, height: 180, x: width/2, y: 850 });
  notifCard.addEffect('fadeInDown', 0.6, 1.5);
  scene1.addChild(notifCard);

  // Notification icon
  const notifIcon = new FFRect({ color: COLORS.iosGreen, width: 50, height: 50, x: 150, y: 820 });
  notifIcon.addEffect('fadeIn', 0.3, 1.8);
  scene1.addChild(notifIcon);

  const msgIcon = new FFText({ text: '💬', x: 150, y: 820, fontSize: 30 });
  msgIcon.alignCenter();
  msgIcon.addEffect('fadeIn', 0.3, 1.9);
  scene1.addChild(msgIcon);

  // Notification content
  const notifApp = new FFText({ text: 'MESSAGES', x: 220, y: 790, fontSize: 22 });
  notifApp.setColor(COLORS.dimGray);
  notifApp.addEffect('fadeIn', 0.3, 2);
  scene1.addChild(notifApp);

  const notifTime = new FFText({ text: 'now', x: 950, y: 790, fontSize: 22 });
  notifTime.setColor(COLORS.dimGray);
  notifTime.addEffect('fadeIn', 0.3, 2);
  scene1.addChild(notifTime);

  const notifName = new FFText({ text: 'Alex ❤️', x: 220, y: 835, fontSize: 32 });
  notifName.setColor(COLORS.white);
  notifName.addEffect('fadeIn', 0.3, 2.1);
  scene1.addChild(notifName);

  const notifPreview = new FFText({ text: 'Can we talk?', x: 220, y: 885, fontSize: 28 });
  notifPreview.setColor(COLORS.lightGray);
  notifPreview.addEffect('fadeIn', 0.3, 2.3);
  scene1.addChild(notifPreview);

  // Swipe hint
  const swipeHint = new FFText({ text: 'Swipe up to open', x: width/2, y: height - 150, fontSize: 24 });
  swipeHint.setColor(COLORS.dimGray);
  swipeHint.alignCenter();
  swipeHint.addEffect('fadeIn', 0.5, 3);
  scene1.addChild(swipeHint);

  // Home indicator
  const homeIndicator = new FFRect({ color: COLORS.white, width: 200, height: 6, x: width/2, y: height - 50 });
  homeIndicator.addEffect('fadeIn', 0.3, 0.5);
  scene1.addChild(homeIndicator);

  scene1.setTransition('fade', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Lock Screen - 2:47 AM (6s)'));

  // ============================================
  // SCENE 2: MESSAGES APP - Typing (8s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.screenBg);
  scene2.setDuration(8);

  // Messages app background
  const msgBg = new FFRect({ color: COLORS.screenBg, width: 1100, height: 2000, x: width/2, y: height/2 });
  msgBg.addEffect('fadeIn', 0.3, 0);
  scene2.addChild(msgBg);

  // Navigation bar
  const navBar = new FFRect({ color: COLORS.statusBar, width: 1080, height: 120, x: width/2, y: 85 });
  navBar.addEffect('fadeIn', 0.3, 0.1);
  scene2.addChild(navBar);

  // Back button
  const backBtn = new FFText({ text: '‹ Messages', x: 150, y: 100, fontSize: 32 });
  backBtn.setColor(COLORS.iosBlue);
  backBtn.addEffect('fadeIn', 0.3, 0.2);
  scene2.addChild(backBtn);

  // Contact name
  const contactName = new FFText({ text: 'Alex ❤️', x: width/2, y: 85, fontSize: 34 });
  contactName.setColor(COLORS.white);
  contactName.alignCenter();
  contactName.addEffect('fadeIn', 0.3, 0.2);
  scene2.addChild(contactName);

  // Contact avatar
  const avatar = new FFRect({ color: COLORS.iosBlue, width: 60, height: 60, x: width/2, y: 150 });
  avatar.addEffect('fadeIn', 0.3, 0.3);
  scene2.addChild(avatar);

  const avatarText = new FFText({ text: 'A', x: width/2, y: 150, fontSize: 30 });
  avatarText.setColor(COLORS.white);
  avatarText.alignCenter();
  avatarText.addEffect('fadeIn', 0.3, 0.3);
  scene2.addChild(avatarText);

  // Previous messages
  // Received message
  const receivedBubble = new FFRect({ color: COLORS.messageBubbleGray, width: 350, height: 80, x: 220, y: 350 });
  receivedBubble.addEffect('fadeIn', 0.4, 0.5);
  scene2.addChild(receivedBubble);

  const receivedText = new FFText({ text: 'Can we talk?', x: 220, y: 350, fontSize: 28 });
  receivedText.setColor(COLORS.white);
  receivedText.alignCenter();
  receivedText.addEffect('fadeIn', 0.3, 0.6);
  scene2.addChild(receivedText);

  const receivedTime = new FFText({ text: '2:47 AM', x: 220, y: 410, fontSize: 20 });
  receivedTime.setColor(COLORS.dimGray);
  receivedTime.alignCenter();
  receivedTime.addEffect('fadeIn', 0.3, 0.7);
  scene2.addChild(receivedTime);

  // Input area
  const inputArea = new FFRect({ color: COLORS.inputBg, width: 1080, height: 120, x: width/2, y: height - 100 });
  inputArea.addEffect('fadeIn', 0.3, 0.3);
  scene2.addChild(inputArea);

  // Text input field
  const inputField = new FFRect({ color: COLORS.messageBubbleGray, width: 850, height: 70, x: 480, y: height - 100 });
  inputField.addEffect('fadeIn', 0.3, 0.4);
  scene2.addChild(inputField);

  // Camera icon
  const cameraIcon = new FFText({ text: '📷', x: 80, y: height - 100, fontSize: 32 });
  cameraIcon.addEffect('fadeIn', 0.3, 0.4);
  scene2.addChild(cameraIcon);

  // Typing animation - text appearing letter by letter simulation
  const typingText1 = new FFText({ text: 'I', x: 150, y: height - 100, fontSize: 28 });
  typingText1.setColor(COLORS.white);
  typingText1.addEffect('fadeIn', 0.1, 1);
  scene2.addChild(typingText1);

  const typingText2 = new FFText({ text: 'I m', x: 160, y: height - 100, fontSize: 28 });
  typingText2.setColor(COLORS.white);
  typingText2.addEffect('fadeIn', 0.1, 1.2);
  scene2.addChild(typingText2);

  const typingText3 = new FFText({ text: 'I mi', x: 170, y: height - 100, fontSize: 28 });
  typingText3.setColor(COLORS.white);
  typingText3.addEffect('fadeIn', 0.1, 1.4);
  scene2.addChild(typingText3);

  const typingText4 = new FFText({ text: 'I miss', x: 185, y: height - 100, fontSize: 28 });
  typingText4.setColor(COLORS.white);
  typingText4.addEffect('fadeIn', 0.1, 1.6);
  scene2.addChild(typingText4);

  const typingText5 = new FFText({ text: 'I miss y', x: 200, y: height - 100, fontSize: 28 });
  typingText5.setColor(COLORS.white);
  typingText5.addEffect('fadeIn', 0.1, 1.8);
  scene2.addChild(typingText5);

  const typingTextFull = new FFText({ text: 'I miss you', x: 230, y: height - 100, fontSize: 28 });
  typingTextFull.setColor(COLORS.white);
  typingTextFull.addEffect('fadeIn', 0.1, 2);
  scene2.addChild(typingTextFull);

  // Cursor blink
  const cursor = new FFRect({ color: COLORS.iosBlue, width: 3, height: 30, x: 330, y: height - 100 });
  cursor.addEffect('fadeIn', 0.2, 2.2);
  cursor.addEffect('fadeOut', 0.2, 2.5);
  cursor.addEffect('fadeIn', 0.2, 2.8);
  cursor.addEffect('fadeOut', 0.2, 3.1);
  scene2.addChild(cursor);

  // Pause... then delete
  const deleteText1 = new FFText({ text: 'I miss yo', x: 220, y: height - 100, fontSize: 28 });
  deleteText1.setColor(COLORS.white);
  deleteText1.addEffect('fadeIn', 0.05, 4);
  scene2.addChild(deleteText1);

  const deleteText2 = new FFText({ text: 'I miss', x: 200, y: height - 100, fontSize: 28 });
  deleteText2.setColor(COLORS.white);
  deleteText2.addEffect('fadeIn', 0.05, 4.2);
  scene2.addChild(deleteText2);

  const deleteText3 = new FFText({ text: 'I mi', x: 175, y: height - 100, fontSize: 28 });
  deleteText3.setColor(COLORS.white);
  deleteText3.addEffect('fadeIn', 0.05, 4.4);
  scene2.addChild(deleteText3);

  const deleteText4 = new FFText({ text: 'I', x: 150, y: height - 100, fontSize: 28 });
  deleteText4.setColor(COLORS.white);
  deleteText4.addEffect('fadeIn', 0.05, 4.6);
  scene2.addChild(deleteText4);

  // Empty field indicator
  const placeholder = new FFText({ text: 'iMessage', x: 200, y: height - 100, fontSize: 26 });
  placeholder.setColor(COLORS.dimGray);
  placeholder.addEffect('fadeIn', 0.3, 5);
  scene2.addChild(placeholder);

  // Emotional indicator
  const emotionText = new FFText({ text: '...', x: width/2, y: height/2, fontSize: 60 });
  emotionText.setColor(COLORS.dimGray);
  emotionText.alignCenter();
  emotionText.addEffect('fadeIn', 0.5, 5.5);
  scene2.addChild(emotionText);

  scene2.setTransition('fade', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Messages App - Typing (8s)'));

  // ============================================
  // SCENE 3: PHOTOS APP - Memories (8s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.screenBg);
  scene3.setDuration(8);

  // Photos app background
  const photosBg = new FFRect({ color: COLORS.screenBg, width: 1100, height: 2000, x: width/2, y: height/2 });
  photosBg.addEffect('fadeIn', 0.3, 0);
  scene3.addChild(photosBg);

  // Navigation bar
  const photosNav = new FFRect({ color: COLORS.statusBar, width: 1080, height: 120, x: width/2, y: 85 });
  photosNav.addEffect('fadeIn', 0.3, 0.1);
  scene3.addChild(photosNav);

  // Back button
  const photosBack = new FFText({ text: '‹ Albums', x: 130, y: 100, fontSize: 32 });
  photosBack.setColor(COLORS.iosBlue);
  photosBack.addEffect('fadeIn', 0.3, 0.2);
  scene3.addChild(photosBack);

  // Album title
  const albumTitle = new FFText({ text: 'Alex 💕', x: width/2, y: 85, fontSize: 34 });
  albumTitle.setColor(COLORS.white);
  albumTitle.alignCenter();
  albumTitle.addEffect('fadeIn', 0.3, 0.2);
  scene3.addChild(albumTitle);

  const photoCount = new FFText({ text: '47 Photos', x: width/2, y: 130, fontSize: 24 });
  photoCount.setColor(COLORS.dimGray);
  photoCount.alignCenter();
  photoCount.addEffect('fadeIn', 0.3, 0.3);
  scene3.addChild(photoCount);

  // Photo grid - simulated memories
  const photoColors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da'];
  const photoEmojis = ['🌅', '🎡', '🍕', '🎭', '🌸', '☕'];
  
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const idx = row * 3 + col;
      const photoX = 130 + col * 280;
      const photoY = 300 + row * 280;
      
      // Photo placeholder
      const photo = new FFRect({ 
        color: photoColors[idx % photoColors.length], 
        width: 260, 
        height: 260, 
        x: photoX, 
        y: photoY 
      });
      photo.addEffect('fadeIn', 0.3, 0.4 + (idx * 0.1));
      scene3.addChild(photo);

      // Photo emoji
      const emoji = new FFText({ text: photoEmojis[idx % photoEmojis.length], x: photoX, y: photoY, fontSize: 60 });
      emoji.alignCenter();
      emoji.addEffect('fadeIn', 0.3, 0.5 + (idx * 0.1));
      scene3.addChild(emoji);
    }
  }

  // Date labels
  const dateLabel1 = new FFText({ text: 'June 2023', x: 130, y: 200, fontSize: 24 });
  dateLabel1.setColor(COLORS.dimGray);
  dateLabel1.addEffect('fadeIn', 0.3, 0.5);
  scene3.addChild(dateLabel1);

  // Scroll indicator - more photos below
  const morePhotos = new FFText({ text: '• • •', x: width/2, y: 1150, fontSize: 30 });
  morePhotos.setColor(COLORS.dimGray);
  morePhotos.alignCenter();
  morePhotos.addEffect('fadeIn', 0.3, 1.5);
  scene3.addChild(morePhotos);

  // Emotional overlay - glassmorphism
  const emotionOverlay = new FFRect({ color: 'rgba(0,0,0,0.7)', width: 1080, height: 400, x: width/2, y: 1450 });
  emotionOverlay.addEffect('fadeIn', 0.5, 3);
  scene3.addChild(emotionOverlay);

  const memoryText = new FFText({ text: 'Memories with Alex', x: width/2, y: 1380, fontSize: 36 });
  memoryText.setColor(COLORS.white);
  memoryText.alignCenter();
  memoryText.addEffect('fadeIn', 0.5, 3.5);
  scene3.addChild(memoryText);

  const memoryDate = new FFText({ text: 'June 2023 - October 2024', x: width/2, y: 1450, fontSize: 28 });
  memoryDate.setColor(COLORS.lightGray);
  memoryDate.alignCenter();
  memoryDate.addEffect('fadeIn', 0.5, 4);
  scene3.addChild(memoryDate);

  const heartBroken = new FFText({ text: '💔', x: width/2, y: 1550, fontSize: 60 });
  heartBroken.alignCenter();
  heartBroken.addEffect('bounceIn', 0.5, 5);
  scene3.addChild(heartBroken);

  // Home indicator
  const homeInd3 = new FFRect({ color: COLORS.white, width: 200, height: 6, x: width/2, y: height - 50 });
  homeInd3.addEffect('fadeIn', 0.3, 0.3);
  scene3.addChild(homeInd3);

  scene3.setTransition('fade', 0.5);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Photos App - Memories (8s)'));

  // ============================================
  // SCENE 4: CONTACT CARD - Delete? (8s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.screenBg);
  scene4.setDuration(8);

  // Blurred background
  const blurBg4 = new FFRect({ color: '#1a1a2e', width: 1100, height: 2000, x: width/2, y: height/2 });
  blurBg4.addEffect('fadeIn', 0.3, 0);
  scene4.addChild(blurBg4);

  // Contact card - glassmorphism
  const contactCard = new FFRect({ color: 'rgba(44, 44, 46, 0.95)', width: 900, height: 700, x: width/2, y: 600 });
  contactCard.addEffect('zoomIn', 0.5, 0.3);
  scene4.addChild(contactCard);

  // Avatar large
  const avatarLarge = new FFRect({ color: COLORS.iosBlue, width: 150, height: 150, x: width/2, y: 380 });
  avatarLarge.addEffect('fadeIn', 0.4, 0.5);
  scene4.addChild(avatarLarge);

  const avatarLetter = new FFText({ text: 'A', x: width/2, y: 380, fontSize: 70 });
  avatarLetter.setColor(COLORS.white);
  avatarLetter.alignCenter();
  avatarLetter.addEffect('fadeIn', 0.3, 0.6);
  scene4.addChild(avatarLetter);

  // Contact name
  const contactNameLarge = new FFText({ text: 'Alex', x: width/2, y: 520, fontSize: 48 });
  contactNameLarge.setColor(COLORS.white);
  contactNameLarge.alignCenter();
  contactNameLarge.addEffect('fadeIn', 0.4, 0.7);
  scene4.addChild(contactNameLarge);

  // Phone number
  const phoneNum = new FFText({ text: '+1 (555) 123-4567', x: width/2, y: 590, fontSize: 28 });
  phoneNum.setColor(COLORS.dimGray);
  phoneNum.alignCenter();
  phoneNum.addEffect('fadeIn', 0.3, 0.8);
  scene4.addChild(phoneNum);

  // Action buttons row
  const actions = [
    { icon: '💬', label: 'message', x: 280 },
    { icon: '📞', label: 'call', x: 440 },
    { icon: '📹', label: 'video', x: 600 },
    { icon: '✉️', label: 'mail', x: 760 }
  ];

  actions.forEach((action, i) => {
    const btnBg = new FFRect({ color: COLORS.messageBubbleGray, width: 100, height: 100, x: action.x, y: 720 });
    btnBg.addEffect('fadeIn', 0.3, 1 + (i * 0.1));
    scene4.addChild(btnBg);

    const btnIcon = new FFText({ text: action.icon, x: action.x, y: 710, fontSize: 35 });
    btnIcon.alignCenter();
    btnIcon.addEffect('fadeIn', 0.3, 1.1 + (i * 0.1));
    scene4.addChild(btnIcon);

    const btnLabel = new FFText({ text: action.label, x: action.x, y: 760, fontSize: 18 });
    btnLabel.setColor(COLORS.iosBlue);
    btnLabel.alignCenter();
    btnLabel.addEffect('fadeIn', 0.3, 1.2 + (i * 0.1));
    scene4.addChild(btnLabel);
  });

  // Scroll down indicator
  const scrollDown = new FFText({ text: '↓', x: width/2, y: 880, fontSize: 30 });
  scrollDown.setColor(COLORS.dimGray);
  scrollDown.alignCenter();
  scrollDown.addEffect('fadeIn', 0.3, 2);
  scene4.addChild(scrollDown);

  // Delete contact option - danger zone
  const deleteSection = new FFRect({ color: 'rgba(255, 59, 48, 0.15)', width: 900, height: 120, x: width/2, y: 1100 });
  deleteSection.addEffect('fadeIn', 0.5, 3);
  scene4.addChild(deleteSection);

  const deleteText = new FFText({ text: 'Delete Contact', x: width/2, y: 1100, fontSize: 34 });
  deleteText.setColor(COLORS.iosRed);
  deleteText.alignCenter();
  deleteText.addEffect('fadeIn', 0.4, 3.3);
  scene4.addChild(deleteText);

  // Finger tap indicator
  const tapCircle = new FFRect({ color: 'rgba(255,255,255,0.3)', width: 80, height: 80, x: width/2, y: 1100 });
  tapCircle.addEffect('fadeIn', 0.2, 4.5);
  tapCircle.addEffect('fadeOut', 0.3, 5);
  scene4.addChild(tapCircle);

  // Confirmation dialog
  const dialogOverlay = new FFRect({ color: 'rgba(0,0,0,0.6)', width: 1100, height: 2000, x: width/2, y: height/2 });
  dialogOverlay.addEffect('fadeIn', 0.3, 5.5);
  scene4.addChild(dialogOverlay);

  const dialogBox = new FFRect({ color: 'rgba(44, 44, 46, 0.98)', width: 600, height: 250, x: width/2, y: height/2 });
  dialogBox.addEffect('zoomIn', 0.3, 5.7);
  scene4.addChild(dialogBox);

  const dialogTitle = new FFText({ text: 'Delete Contact?', x: width/2, y: height/2 - 60, fontSize: 32 });
  dialogTitle.setColor(COLORS.white);
  dialogTitle.alignCenter();
  dialogTitle.addEffect('fadeIn', 0.2, 5.9);
  scene4.addChild(dialogTitle);

  const dialogMsg = new FFText({ text: 'This cannot be undone.', x: width/2, y: height/2, fontSize: 24 });
  dialogMsg.setColor(COLORS.dimGray);
  dialogMsg.alignCenter();
  dialogMsg.addEffect('fadeIn', 0.2, 6);
  scene4.addChild(dialogMsg);

  // Cancel button
  const cancelBtn = new FFRect({ color: COLORS.messageBubbleGray, width: 250, height: 60, x: 340, y: height/2 + 80 });
  cancelBtn.addEffect('fadeIn', 0.2, 6.2);
  scene4.addChild(cancelBtn);

  const cancelText = new FFText({ text: 'Cancel', x: 340, y: height/2 + 80, fontSize: 26 });
  cancelText.setColor(COLORS.iosBlue);
  cancelText.alignCenter();
  cancelText.addEffect('fadeIn', 0.2, 6.3);
  scene4.addChild(cancelText);

  // Delete button
  const deleteBtn = new FFRect({ color: COLORS.iosRed, width: 250, height: 60, x: 740, y: height/2 + 80 });
  deleteBtn.addEffect('fadeIn', 0.2, 6.2);
  scene4.addChild(deleteBtn);

  const deleteBtnText = new FFText({ text: 'Delete', x: 740, y: height/2 + 80, fontSize: 26 });
  deleteBtnText.setColor(COLORS.white);
  deleteBtnText.alignCenter();
  deleteBtnText.addEffect('fadeIn', 0.2, 6.3);
  scene4.addChild(deleteBtnText);

  scene4.setTransition('fade', 0.5);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Contact Card - Delete? (8s)'));

  // ============================================
  // SCENE 5: FINAL - Cancel Pressed (6s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.screenBg);
  scene5.setDuration(6);

  // Back to messages
  const finalBg = new FFRect({ color: COLORS.screenBg, width: 1100, height: 2000, x: width/2, y: height/2 });
  finalBg.addEffect('fadeIn', 0.3, 0);
  scene5.addChild(finalBg);

  // Nav bar
  const finalNav = new FFRect({ color: COLORS.statusBar, width: 1080, height: 120, x: width/2, y: 85 });
  finalNav.addEffect('fadeIn', 0.3, 0.1);
  scene5.addChild(finalNav);

  const finalBack = new FFText({ text: '‹ Messages', x: 150, y: 100, fontSize: 32 });
  finalBack.setColor(COLORS.iosBlue);
  finalBack.addEffect('fadeIn', 0.3, 0.2);
  scene5.addChild(finalBack);

  const finalContact = new FFText({ text: 'Alex ❤️', x: width/2, y: 85, fontSize: 34 });
  finalContact.setColor(COLORS.white);
  finalContact.alignCenter();
  finalContact.addEffect('fadeIn', 0.3, 0.2);
  scene5.addChild(finalContact);

  // The original message
  const finalReceived = new FFRect({ color: COLORS.messageBubbleGray, width: 350, height: 80, x: 220, y: 350 });
  finalReceived.addEffect('fadeIn', 0.4, 0.4);
  scene5.addChild(finalReceived);

  const finalReceivedText = new FFText({ text: 'Can we talk?', x: 220, y: 350, fontSize: 28 });
  finalReceivedText.setColor(COLORS.white);
  finalReceivedText.alignCenter();
  finalReceivedText.addEffect('fadeIn', 0.3, 0.5);
  scene5.addChild(finalReceivedText);

  // New reply - finally sent
  const sentBubble = new FFRect({ color: COLORS.messageBubbleBlue, width: 200, height: 80, x: width - 180, y: 500 });
  sentBubble.addEffect('fadeIn', 0.5, 1.5);
  scene5.addChild(sentBubble);

  const sentText = new FFText({ text: 'Yes.', x: width - 180, y: 500, fontSize: 28 });
  sentText.setColor(COLORS.white);
  sentText.alignCenter();
  sentText.addEffect('fadeIn', 0.3, 1.7);
  scene5.addChild(sentText);

  // Delivered status
  const deliveredText = new FFText({ text: 'Delivered', x: width - 180, y: 560, fontSize: 18 });
  deliveredText.setColor(COLORS.dimGray);
  deliveredText.alignCenter();
  deliveredText.addEffect('fadeIn', 0.3, 2.2);
  scene5.addChild(deliveredText);

  // Typing indicator from Alex
  const typingBubble = new FFRect({ color: COLORS.messageBubbleGray, width: 120, height: 60, x: 150, y: 680 });
  typingBubble.addEffect('fadeIn', 0.4, 3);
  scene5.addChild(typingBubble);

  const typingDots = new FFText({ text: '• • •', x: 150, y: 680, fontSize: 24 });
  typingDots.setColor(COLORS.lightGray);
  typingDots.alignCenter();
  typingDots.addEffect('fadeIn', 0.3, 3.2);
  scene5.addChild(typingDots);

  // Input area
  const finalInput = new FFRect({ color: COLORS.inputBg, width: 1080, height: 120, x: width/2, y: height - 100 });
  finalInput.addEffect('fadeIn', 0.3, 0.3);
  scene5.addChild(finalInput);

  const finalInputField = new FFRect({ color: COLORS.messageBubbleGray, width: 850, height: 70, x: 480, y: height - 100 });
  finalInputField.addEffect('fadeIn', 0.3, 0.4);
  scene5.addChild(finalInputField);

  const finalPlaceholder = new FFText({ text: 'iMessage', x: 200, y: height - 100, fontSize: 26 });
  finalPlaceholder.setColor(COLORS.dimGray);
  finalPlaceholder.addEffect('fadeIn', 0.3, 0.5);
  scene5.addChild(finalPlaceholder);

  // Emotional message overlay
  const emotionBox = new FFRect({ color: 'rgba(0,0,0,0.85)', width: 800, height: 300, x: width/2, y: height/2 + 200 });
  emotionBox.addEffect('fadeIn', 0.6, 4);
  scene5.addChild(emotionBox);

  const emotionMsg1 = new FFText({ text: 'Some things', x: width/2, y: height/2 + 130, fontSize: 40 });
  emotionMsg1.setColor(COLORS.white);
  emotionMsg1.alignCenter();
  emotionMsg1.addEffect('fadeIn', 0.5, 4.3);
  scene5.addChild(emotionMsg1);

  const emotionMsg2 = new FFText({ text: "can't be deleted", x: width/2, y: height/2 + 200, fontSize: 44 });
  emotionMsg2.setColor(COLORS.lightGray);
  emotionMsg2.alignCenter();
  emotionMsg2.addEffect('fadeIn', 0.5, 4.6);
  scene5.addChild(emotionMsg2);

  const heartEmoji = new FFText({ text: '❤️', x: width/2, y: height/2 + 290, fontSize: 50 });
  heartEmoji.alignCenter();
  heartEmoji.addEffect('bounceIn', 0.5, 5);
  scene5.addChild(heartEmoji);

  // Home indicator
  const finalHome = new FFRect({ color: COLORS.white, width: 200, height: 6, x: width/2, y: height - 50 });
  finalHome.addEffect('fadeIn', 0.3, 0.3);
  scene5.addChild(finalHome);

  scene5.setTransition('fade', 0.5);
  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Final - Cancel Pressed (6s)'));

  // ============================================
  // SCENE 6: CTA & END CARD (6s)
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor(COLORS.screenBg);
  scene6.setDuration(6);

  // Dark background
  const ctaBg = new FFRect({ color: '#0a0a0f', width: 1100, height: 2000, x: width/2, y: height/2 });
  ctaBg.addEffect('fadeIn', 0.3, 0);
  scene6.addChild(ctaBg);

  // Phone frame outline
  const phoneFrame = new FFRect({ color: COLORS.messageBubbleGray, width: 920, height: 1700, x: width/2, y: height/2 });
  phoneFrame.addEffect('fadeIn', 0.4, 0.2);
  scene6.addChild(phoneFrame);

  const phoneInner = new FFRect({ color: COLORS.screenBg, width: 880, height: 1660, x: width/2, y: height/2 });
  phoneInner.addEffect('fadeIn', 0.4, 0.3);
  scene6.addChild(phoneInner);

  // Series title
  const seriesTitle = new FFText({ text: 'UI SIM', x: width/2, y: 400, fontSize: 80 });
  seriesTitle.setColor(COLORS.white);
  seriesTitle.alignCenter();
  seriesTitle.addEffect('backInDown', 0.5, 0.5);
  scene6.addChild(seriesTitle);

  const seriesSubtitle = new FFText({ text: 'BREAKUP', x: width/2, y: 510, fontSize: 60 });
  seriesSubtitle.setColor(COLORS.iosBlue);
  seriesSubtitle.alignCenter();
  seriesSubtitle.addEffect('backInDown', 0.5, 0.7);
  scene6.addChild(seriesSubtitle);

  // Tagline
  const tagline = new FFText({ text: 'Stories told through screens', x: width/2, y: 650, fontSize: 32 });
  tagline.setColor(COLORS.dimGray);
  tagline.alignCenter();
  tagline.addEffect('fadeIn', 0.5, 1);
  scene6.addChild(tagline);

  // Divider
  const divider = new FFRect({ color: COLORS.iosBlue, width: 400, height: 3, x: width/2, y: 730 });
  divider.addEffect('zoomIn', 0.4, 1.3);
  scene6.addChild(divider);

  // CTA
  const ctaBox = new FFRect({ color: COLORS.iosBlue, width: 700, height: 150, x: width/2, y: 900 });
  ctaBox.addEffect('zoomIn', 0.5, 1.6);
  scene6.addChild(ctaBox);

  const ctaText1 = new FFText({ text: '👆 FOLLOW FOR MORE', x: width/2, y: 870, fontSize: 38 });
  ctaText1.setColor(COLORS.white);
  ctaText1.alignCenter();
  ctaText1.addEffect('fadeIn', 0.3, 1.8);
  scene6.addChild(ctaText1);

  const ctaText2 = new FFText({ text: 'SCREEN STORIES', x: width/2, y: 930, fontSize: 42 });
  ctaText2.setColor(COLORS.white);
  ctaText2.alignCenter();
  ctaText2.addEffect('bounceIn', 0.4, 2);
  scene6.addChild(ctaText2);

  // Hashtags
  const hashtags = new FFText({ text: '#UISim #ScreenNarrative #Storytelling', x: width/2, y: 1080, fontSize: 26 });
  hashtags.setColor(COLORS.dimGray);
  hashtags.alignCenter();
  hashtags.addEffect('fadeIn', 0.4, 2.4);
  scene6.addChild(hashtags);

  // Social actions
  const social = new FFText({ text: '❤️ LIKE  💬 COMMENT  🔄 SHARE', x: width/2, y: 1200, fontSize: 30 });
  social.setColor(COLORS.lightGray);
  social.alignCenter();
  social.addEffect('fadeInUp', 0.4, 2.8);
  scene6.addChild(social);

  // Story count
  const storyNum = new FFText({ text: 'STORY 8 OF 30', x: width/2, y: 1350, fontSize: 26 });
  storyNum.setColor(COLORS.dimGray);
  storyNum.alignCenter();
  storyNum.addEffect('fadeIn', 0.3, 3.2);
  scene6.addChild(storyNum);

  // App icons decoration
  const appIcons = ['💬', '📷', '📞', '❤️'];
  appIcons.forEach((icon, i) => {
    const appIcon = new FFText({ text: icon, x: 300 + (i * 160), y: 1500, fontSize: 45 });
    appIcon.addEffect('bounceIn', 0.3, 3.5 + (i * 0.15));
    scene6.addChild(appIcon);
  });

  // Home indicator
  const ctaHome = new FFRect({ color: COLORS.white, width: 200, height: 6, x: width/2, y: height - 180 });
  ctaHome.addEffect('fadeIn', 0.3, 0.5);
  scene6.addChild(ctaHome);

  creator.addChild(scene6);
  console.log(colors.green('  ✓ Scene 6: CTA & End Card (6s)'));

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
    console.log(colors.magenta('\n🎬 "UI Sim: Breakup" complete!\n'));
  });

  creator.start();
}

// Run the video creation
createUISimBreakupVideo().catch(err => {
  console.error(colors.red('Error creating video:'), err);
});

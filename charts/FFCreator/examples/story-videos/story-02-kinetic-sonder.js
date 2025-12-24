/**
 * 🎬 STORY 2: "Kinetic Dictionary" - Typography Focus
 * 
 * The Story: A rapid-fire explanation of the word "Sonder" 
 * (the realization that everyone has a complex life).
 * 
 * Visual Style:
 * - High-contrast black background with bold, colorful text
 * - Kinetic Typography with words "hitting" the screen
 * - Kerning Animation and Motion Blur effects
 * - Text-only design with oversized fonts bleeding off edges
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~45 seconds
 * 
 * Run with: node examples/story-videos/story-02-kinetic-sonder.js
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
// COLOR PALETTE - High Contrast Typography
// ============================================
const COLORS = {
  // Base
  black: '#000000',
  pureBlack: '#0a0a0a',
  
  // Primary accent colors (bold, punchy)
  electricBlue: '#00d4ff',
  hotPink: '#ff0080',
  neonYellow: '#ffff00',
  limeGreen: '#00ff66',
  deepPurple: '#9d00ff',
  fireOrange: '#ff6600',
  
  // Text colors
  white: '#ffffff',
  offWhite: '#f0f0f0',
  gray: '#666666',
  darkGray: '#333333'
};

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createKineticSonderVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 2: "Kinetic Dictionary - SONDER"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~45 seconds'));
  console.log(colors.yellow('🎨 Theme: Kinetic Typography - High Contrast\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-02-kinetic-sonder.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: WORD IMPACT - "SONDER" (4s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.black);
  scene1.setDuration(4);

  // Dramatic word entrance - SONDER
  const mainWord = new FFText({ text: 'SONDER', x: width/2, y: height/2, fontSize: 180 });
  mainWord.setColor(COLORS.white);
  mainWord.alignCenter();
  mainWord.addEffect('bounceIn', 0.6, 0.2);
  scene1.addChild(mainWord);

  // Phonetic pronunciation
  const phonetic = new FFText({ text: '/ˈsändər/', x: width/2, y: height/2 + 150, fontSize: 48 });
  phonetic.setColor(COLORS.gray);
  phonetic.alignCenter();
  phonetic.addEffect('fadeIn', 0.4, 0.8);
  scene1.addChild(phonetic);

  // Part of speech
  const partOfSpeech = new FFText({ text: 'noun', x: width/2, y: height/2 + 230, fontSize: 36 });
  partOfSpeech.setColor(COLORS.electricBlue);
  partOfSpeech.alignCenter();
  partOfSpeech.addEffect('fadeInUp', 0.3, 1.2);
  scene1.addChild(partOfSpeech);

  // Accent bars - kinetic feel
  const accentBar1 = new FFRect({ color: COLORS.hotPink, width: 400, height: 8, x: width/2, y: height/2 - 150 });
  accentBar1.addEffect('zoomIn', 0.3, 0.1);
  scene1.addChild(accentBar1);

  const accentBar2 = new FFRect({ color: COLORS.electricBlue, width: 400, height: 8, x: width/2, y: height/2 + 320 });
  accentBar2.addEffect('zoomIn', 0.3, 1.5);
  scene1.addChild(accentBar2);

  // Corner accents for visual punch
  const cornerTL = new FFRect({ color: COLORS.neonYellow, width: 100, height: 100, x: 60, y: 60 });
  cornerTL.addEffect('fadeIn', 0.2, 0.3);
  scene1.addChild(cornerTL);

  const cornerBR = new FFRect({ color: COLORS.hotPink, width: 100, height: 100, x: width - 60, y: height - 60 });
  cornerBR.addEffect('fadeIn', 0.2, 0.5);
  scene1.addChild(cornerBR);

  scene1.setTransition('directionalwarp', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Word Impact - SONDER (4s)'));

  // ============================================
  // SCENE 2: DEFINITION PART 1 - "THE REALIZATION" (5s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.pureBlack);
  scene2.setDuration(5);

  // Word hits - kinetic typography style
  const word1 = new FFText({ text: 'THE', x: 200, y: 400, fontSize: 120 });
  word1.setColor(COLORS.gray);
  word1.addEffect('backInLeft', 0.4, 0.1);
  scene2.addChild(word1);

  const word2 = new FFText({ text: 'REALIZATION', x: width/2, y: 600, fontSize: 100 });
  word2.setColor(COLORS.white);
  word2.alignCenter();
  word2.addEffect('bounceIn', 0.5, 0.4);
  scene2.addChild(word2);

  // Emphasis box behind key word
  const emphasisBox = new FFRect({ color: COLORS.hotPink, width: 750, height: 130, x: width/2, y: 600 });
  emphasisBox.addEffect('zoomIn', 0.3, 0.3);
  scene2.addChild(emphasisBox);

  // Re-add text on top of box
  const word2Top = new FFText({ text: 'REALIZATION', x: width/2, y: 600, fontSize: 100 });
  word2Top.setColor(COLORS.black);
  word2Top.alignCenter();
  word2Top.addEffect('bounceIn', 0.5, 0.4);
  scene2.addChild(word2Top);

  const word3 = new FFText({ text: 'THAT', x: width - 250, y: 800, fontSize: 90 });
  word3.setColor(COLORS.gray);
  word3.addEffect('backInRight', 0.4, 0.8);
  scene2.addChild(word3);

  // Kinetic accent lines
  const kineticLine1 = new FFRect({ color: COLORS.electricBlue, width: 600, height: 6, x: width/2, y: 720 });
  kineticLine1.addEffect('fadeInLeft', 0.3, 1);
  scene2.addChild(kineticLine1);

  const kineticLine2 = new FFRect({ color: COLORS.neonYellow, width: 400, height: 6, x: 300, y: 880 });
  kineticLine2.addEffect('fadeInRight', 0.3, 1.2);
  scene2.addChild(kineticLine2);

  // Bottom teaser
  const teaser = new FFText({ text: 'EVERY PERSON...', x: width/2, y: height - 400, fontSize: 72 });
  teaser.setColor(COLORS.electricBlue);
  teaser.alignCenter();
  teaser.addEffect('fadeInUp', 0.5, 2);
  scene2.addChild(teaser);

  scene2.setTransition('windowslice', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Definition Part 1 (5s)'));

  // ============================================
  // SCENE 3: "EVERY RANDOM PASSERBY" (5s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.black);
  scene3.setDuration(5);

  // Oversized text bleeding off edges
  const everyText = new FFText({ text: 'EVERY', x: -50, y: 350, fontSize: 160 });
  everyText.setColor(COLORS.white);
  everyText.addEffect('slideInLeft', 0.4, 0.1);
  scene3.addChild(everyText);

  const randomText = new FFText({ text: 'RANDOM', x: width + 50, y: 550, fontSize: 140 });
  randomText.setColor(COLORS.limeGreen);
  randomText.addEffect('slideInRight', 0.4, 0.4);
  scene3.addChild(randomText);

  // Highlight box for PASSERBY
  const passerbyBox = new FFRect({ color: COLORS.deepPurple, width: 900, height: 180, x: width/2, y: 800 });
  passerbyBox.addEffect('zoomIn', 0.4, 0.7);
  scene3.addChild(passerbyBox);

  const passerbyText = new FFText({ text: 'PASSERBY', x: width/2, y: 800, fontSize: 130 });
  passerbyText.setColor(COLORS.white);
  passerbyText.alignCenter();
  passerbyText.addEffect('bounceIn', 0.5, 0.8);
  scene3.addChild(passerbyText);

  // Visual rhythm elements
  const rhythmBar1 = new FFRect({ color: COLORS.hotPink, width: 8, height: 300, x: 100, y: 600 });
  rhythmBar1.addEffect('fadeInDown', 0.3, 1.2);
  scene3.addChild(rhythmBar1);

  const rhythmBar2 = new FFRect({ color: COLORS.electricBlue, width: 8, height: 300, x: width - 100, y: 600 });
  rhythmBar2.addEffect('fadeInUp', 0.3, 1.4);
  scene3.addChild(rhythmBar2);

  // Continuation text
  const isLiving = new FFText({ text: 'IS LIVING', x: width/2, y: 1100, fontSize: 80 });
  isLiving.setColor(COLORS.gray);
  isLiving.alignCenter();
  isLiving.addEffect('fadeIn', 0.4, 1.8);
  scene3.addChild(isLiving);

  const aLife = new FFText({ text: 'A LIFE', x: width/2, y: 1220, fontSize: 110 });
  aLife.setColor(COLORS.neonYellow);
  aLife.alignCenter();
  aLife.addEffect('bounceIn', 0.5, 2.2);
  scene3.addChild(aLife);

  scene3.setTransition('crosswarp', 0.5);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Every Random Passerby (5s)'));

  // ============================================
  // SCENE 4: "AS VIVID AND COMPLEX" (5s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.pureBlack);
  scene4.setDuration(5);

  // Stacked kinetic words
  const asText = new FFText({ text: 'AS', x: 150, y: 300, fontSize: 100 });
  asText.setColor(COLORS.darkGray);
  asText.addEffect('fadeIn', 0.2, 0.1);
  scene4.addChild(asText);

  // VIVID with color burst
  const vividBox = new FFRect({ color: COLORS.fireOrange, width: 500, height: 160, x: width/2, y: 480 });
  vividBox.addEffect('zoomIn', 0.3, 0.2);
  scene4.addChild(vividBox);

  const vividText = new FFText({ text: 'VIVID', x: width/2, y: 480, fontSize: 140 });
  vividText.setColor(COLORS.black);
  vividText.alignCenter();
  vividText.addEffect('bounceIn', 0.4, 0.3);
  scene4.addChild(vividText);

  const andText = new FFText({ text: 'AND', x: width/2, y: 620, fontSize: 60 });
  andText.setColor(COLORS.gray);
  andText.alignCenter();
  andText.addEffect('fadeIn', 0.3, 0.6);
  scene4.addChild(andText);

  // COMPLEX with multi-color effect
  const complexBox = new FFRect({ color: COLORS.deepPurple, width: 700, height: 170, x: width/2, y: 800 });
  complexBox.addEffect('zoomIn', 0.4, 0.8);
  scene4.addChild(complexBox);

  const complexText = new FFText({ text: 'COMPLEX', x: width/2, y: 800, fontSize: 130 });
  complexText.setColor(COLORS.white);
  complexText.alignCenter();
  complexText.addEffect('bounceIn', 0.5, 0.9);
  scene4.addChild(complexText);

  // Kinetic accent squares
  const squares = [
    { x: 100, y: 1000, color: COLORS.hotPink, delay: 1.2 },
    { x: 250, y: 1050, color: COLORS.electricBlue, delay: 1.3 },
    { x: 400, y: 1000, color: COLORS.neonYellow, delay: 1.4 },
    { x: 550, y: 1050, color: COLORS.limeGreen, delay: 1.5 },
    { x: 700, y: 1000, color: COLORS.fireOrange, delay: 1.6 },
    { x: 850, y: 1050, color: COLORS.deepPurple, delay: 1.7 },
    { x: 1000, y: 1000, color: COLORS.hotPink, delay: 1.8 }
  ];

  squares.forEach(sq => {
    const rect = new FFRect({ color: sq.color, width: 60, height: 60, x: sq.x, y: sq.y });
    rect.addEffect('bounceIn', 0.3, sq.delay);
    scene4.addChild(rect);
  });

  // Continuation
  const asYourOwn = new FFText({ text: 'AS YOUR OWN', x: width/2, y: 1250, fontSize: 90 });
  asYourOwn.setColor(COLORS.white);
  asYourOwn.alignCenter();
  asYourOwn.addEffect('backInUp', 0.5, 2);
  scene4.addChild(asYourOwn);

  scene4.setTransition('dreamy', 0.5);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: As Vivid and Complex (5s)'));

  // ============================================
  // SCENE 5: THE EMOTIONAL CORE (6s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.black);
  scene5.setDuration(6);

  // Full screen impact words
  const theyHave = new FFText({ text: 'THEY HAVE', x: width/2, y: 300, fontSize: 80 });
  theyHave.setColor(COLORS.gray);
  theyHave.alignCenter();
  theyHave.addEffect('fadeIn', 0.3, 0.1);
  scene5.addChild(theyHave);

  // DREAMS - oversized, bleeding off
  const dreamsText = new FFText({ text: 'DREAMS', x: width/2 - 100, y: 500, fontSize: 160 });
  dreamsText.setColor(COLORS.electricBlue);
  dreamsText.addEffect('backInLeft', 0.5, 0.3);
  scene5.addChild(dreamsText);

  // FEARS
  const fearsText = new FFText({ text: 'FEARS', x: width/2 + 100, y: 700, fontSize: 160 });
  fearsText.setColor(COLORS.hotPink);
  fearsText.addEffect('backInRight', 0.5, 0.7);
  scene5.addChild(fearsText);

  // SECRETS
  const secretsBox = new FFRect({ color: COLORS.deepPurple, width: 650, height: 180, x: width/2, y: 950 });
  secretsBox.addEffect('zoomIn', 0.4, 1);
  scene5.addChild(secretsBox);

  const secretsText = new FFText({ text: 'SECRETS', x: width/2, y: 950, fontSize: 140 });
  secretsText.setColor(COLORS.white);
  secretsText.alignCenter();
  secretsText.addEffect('bounceIn', 0.5, 1.1);
  scene5.addChild(secretsText);

  // STORIES
  const storiesText = new FFText({ text: 'STORIES', x: width/2, y: 1180, fontSize: 130 });
  storiesText.setColor(COLORS.neonYellow);
  storiesText.alignCenter();
  storiesText.addEffect('bounceIn', 0.5, 1.5);
  scene5.addChild(storiesText);

  // Kinetic lines for rhythm
  const line1 = new FFRect({ color: COLORS.limeGreen, width: 300, height: 6, x: 200, y: 1350 });
  line1.addEffect('fadeInLeft', 0.3, 2);
  scene5.addChild(line1);

  const line2 = new FFRect({ color: COLORS.fireOrange, width: 300, height: 6, x: width - 200, y: 1350 });
  line2.addEffect('fadeInRight', 0.3, 2.2);
  scene5.addChild(line2);

  // Bottom text
  const youllNever = new FFText({ text: "YOU'LL NEVER", x: width/2, y: 1500, fontSize: 70 });
  youllNever.setColor(COLORS.gray);
  youllNever.alignCenter();
  youllNever.addEffect('fadeInUp', 0.4, 2.5);
  scene5.addChild(youllNever);

  const knowText = new FFText({ text: 'KNOW', x: width/2, y: 1620, fontSize: 120 });
  knowText.setColor(COLORS.white);
  knowText.alignCenter();
  knowText.addEffect('bounceIn', 0.5, 3);
  scene5.addChild(knowText);

  scene5.setTransition('colorphase', 0.5);
  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: The Emotional Core (6s)'));

  // ============================================
  // SCENE 6: THE CROWD METAPHOR (5s)
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor(COLORS.pureBlack);
  scene6.setDuration(5);

  // Visual representation of "crowd"
  const crowdTitle = new FFText({ text: 'IN A CROWD', x: width/2, y: 250, fontSize: 90 });
  crowdTitle.setColor(COLORS.white);
  crowdTitle.alignCenter();
  crowdTitle.addEffect('fadeIn', 0.4, 0.1);
  scene6.addChild(crowdTitle);

  // Create visual "crowd" of colored rectangles
  const crowdColors = [COLORS.hotPink, COLORS.electricBlue, COLORS.neonYellow, COLORS.limeGreen, COLORS.deepPurple, COLORS.fireOrange];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 8; col++) {
      const rect = new FFRect({
        color: crowdColors[(row + col) % crowdColors.length],
        width: 80,
        height: 120,
        x: 100 + col * 120,
        y: 450 + row * 100
      });
      rect.addEffect('zoomIn', 0.2, 0.3 + (row * 0.1) + (col * 0.05));
      scene6.addChild(rect);
    }
  }

  // Overlay text
  const eachOne = new FFText({ text: 'EACH ONE', x: width/2, y: 750, fontSize: 100 });
  eachOne.setColor(COLORS.black);
  eachOne.alignCenter();
  eachOne.addEffect('bounceIn', 0.5, 1.5);
  scene6.addChild(eachOne);

  const aUniverse = new FFText({ text: 'A UNIVERSE', x: width/2, y: 900, fontSize: 110 });
  aUniverse.setColor(COLORS.black);
  aUniverse.alignCenter();
  aUniverse.addEffect('bounceIn', 0.5, 2);
  scene6.addChild(aUniverse);

  // Bottom emphasis
  const bottomBox = new FFRect({ color: COLORS.white, width: 900, height: 150, x: width/2, y: 1400 });
  bottomBox.addEffect('zoomIn', 0.4, 2.5);
  scene6.addChild(bottomBox);

  const youreJust = new FFText({ text: "YOU'RE JUST", x: width/2, y: 1370, fontSize: 60 });
  youreJust.setColor(COLORS.black);
  youreJust.alignCenter();
  youreJust.addEffect('fadeIn', 0.3, 2.8);
  scene6.addChild(youreJust);

  const anExtra = new FFText({ text: 'AN EXTRA', x: width/2, y: 1440, fontSize: 80 });
  anExtra.setColor(COLORS.hotPink);
  anExtra.alignCenter();
  anExtra.addEffect('bounceIn', 0.4, 3);
  scene6.addChild(anExtra);

  scene6.setTransition('windowshades', 0.5);
  creator.addChild(scene6);
  console.log(colors.green('  ✓ Scene 6: The Crowd Metaphor (5s)'));

  // ============================================
  // SCENE 7: "IN THEIR STORY" (4s)
  // ============================================
  const scene7 = new FFScene();
  scene7.setBgColor(COLORS.black);
  scene7.setDuration(4);

  // Dramatic reveal
  const inTheir = new FFText({ text: 'IN THEIR', x: width/2, y: 500, fontSize: 100 });
  inTheir.setColor(COLORS.gray);
  inTheir.alignCenter();
  inTheir.addEffect('fadeIn', 0.3, 0.1);
  scene7.addChild(inTheir);

  // STORY - massive, center screen
  const storyBox = new FFRect({ color: COLORS.hotPink, width: 800, height: 220, x: width/2, y: 750 });
  storyBox.addEffect('zoomIn', 0.4, 0.3);
  scene7.addChild(storyBox);

  const storyText = new FFText({ text: 'STORY', x: width/2, y: 750, fontSize: 180 });
  storyText.setColor(COLORS.white);
  storyText.alignCenter();
  storyText.addEffect('bounceIn', 0.5, 0.4);
  scene7.addChild(storyText);

  // Accent elements
  const accentLeft = new FFRect({ color: COLORS.electricBlue, width: 20, height: 400, x: 150, y: 750 });
  accentLeft.addEffect('fadeInDown', 0.4, 0.8);
  scene7.addChild(accentLeft);

  const accentRight = new FFRect({ color: COLORS.neonYellow, width: 20, height: 400, x: width - 150, y: 750 });
  accentRight.addEffect('fadeInUp', 0.4, 1);
  scene7.addChild(accentRight);

  // Bottom reflection
  const justLike = new FFText({ text: 'JUST LIKE', x: width/2, y: 1100, fontSize: 60 });
  justLike.setColor(COLORS.gray);
  justLike.alignCenter();
  justLike.addEffect('fadeIn', 0.3, 1.5);
  scene7.addChild(justLike);

  const theyAre = new FFText({ text: 'THEY ARE IN YOURS', x: width/2, y: 1200, fontSize: 70 });
  theyAre.setColor(COLORS.white);
  theyAre.alignCenter();
  theyAre.addEffect('fadeInUp', 0.4, 1.8);
  scene7.addChild(theyAre);

  scene7.setTransition('directionalwarp', 0.5);
  creator.addChild(scene7);
  console.log(colors.green('  ✓ Scene 7: In Their Story (4s)'));

  // ============================================
  // SCENE 8: FINAL IMPACT - SONDER REDUX (5s)
  // ============================================
  const scene8 = new FFScene();
  scene8.setBgColor(COLORS.pureBlack);
  scene8.setDuration(5);

  // Build up to final word
  const thatsText = new FFText({ text: "THAT'S", x: width/2, y: 400, fontSize: 80 });
  thatsText.setColor(COLORS.gray);
  thatsText.alignCenter();
  thatsText.addEffect('fadeIn', 0.3, 0.1);
  scene8.addChild(thatsText);

  // Final SONDER - maximum impact
  const finalBox = new FFRect({ color: COLORS.white, width: 950, height: 280, x: width/2, y: 700 });
  finalBox.addEffect('zoomIn', 0.5, 0.4);
  scene8.addChild(finalBox);

  const finalSonder = new FFText({ text: 'SONDER', x: width/2, y: 700, fontSize: 200 });
  finalSonder.setColor(COLORS.black);
  finalSonder.alignCenter();
  finalSonder.addEffect('bounceIn', 0.6, 0.5);
  scene8.addChild(finalSonder);

  // Color accent bars
  const colorBars = [
    { y: 550, color: COLORS.hotPink },
    { y: 570, color: COLORS.electricBlue },
    { y: 590, color: COLORS.neonYellow },
    { y: 830, color: COLORS.limeGreen },
    { y: 850, color: COLORS.deepPurple },
    { y: 870, color: COLORS.fireOrange }
  ];

  colorBars.forEach((bar, i) => {
    const rect = new FFRect({ color: bar.color, width: 1080, height: 15, x: width/2, y: bar.y });
    rect.addEffect('fadeIn', 0.2, 1 + (i * 0.1));
    scene8.addChild(rect);
  });

  // Definition reminder
  const defText = new FFText({ text: 'THE PROFOUND FEELING', x: width/2, y: 1050, fontSize: 50 });
  defText.setColor(COLORS.gray);
  defText.alignCenter();
  defText.addEffect('fadeIn', 0.4, 1.8);
  scene8.addChild(defText);

  const defText2 = new FFText({ text: 'THAT EVERYONE HAS A STORY', x: width/2, y: 1130, fontSize: 48 });
  defText2.setColor(COLORS.white);
  defText2.alignCenter();
  defText2.addEffect('fadeInUp', 0.4, 2.2);
  scene8.addChild(defText2);

  const defText3 = new FFText({ text: 'AS COMPLEX AS YOUR OWN', x: width/2, y: 1210, fontSize: 48 });
  defText3.setColor(COLORS.electricBlue);
  defText3.alignCenter();
  defText3.addEffect('fadeInUp', 0.4, 2.6);
  scene8.addChild(defText3);

  scene8.setTransition('fade', 0.5);
  creator.addChild(scene8);
  console.log(colors.green('  ✓ Scene 8: Final Impact - SONDER Redux (5s)'));

  // ============================================
  // SCENE 9: CTA & END CARD (6s)
  // ============================================
  const scene9 = new FFScene();
  scene9.setBgColor(COLORS.black);
  scene9.setDuration(6);

  // Title card
  const kineticTitle = new FFText({ text: 'KINETIC', x: width/2, y: 300, fontSize: 90 });
  kineticTitle.setColor(COLORS.hotPink);
  kineticTitle.alignCenter();
  kineticTitle.addEffect('backInDown', 0.5, 0.2);
  scene9.addChild(kineticTitle);

  const dictTitle = new FFText({ text: 'DICTIONARY', x: width/2, y: 420, fontSize: 100 });
  dictTitle.setColor(COLORS.white);
  dictTitle.alignCenter();
  dictTitle.addEffect('backInDown', 0.5, 0.4);
  scene9.addChild(dictTitle);

  // Separator
  const sepLine = new FFRect({ color: COLORS.electricBlue, width: 600, height: 6, x: width/2, y: 530 });
  sepLine.addEffect('zoomIn', 0.4, 0.8);
  scene9.addChild(sepLine);

  // Word of the day
  const wordOf = new FFText({ text: 'WORD:', x: width/2, y: 650, fontSize: 50 });
  wordOf.setColor(COLORS.gray);
  wordOf.alignCenter();
  wordOf.addEffect('fadeIn', 0.3, 1);
  scene9.addChild(wordOf);

  const sonderFinal = new FFText({ text: 'SONDER', x: width/2, y: 750, fontSize: 120 });
  sonderFinal.setColor(COLORS.neonYellow);
  sonderFinal.alignCenter();
  sonderFinal.addEffect('bounceIn', 0.5, 1.2);
  scene9.addChild(sonderFinal);

  // CTA Box
  const ctaBox = new FFRect({ color: COLORS.hotPink, width: 800, height: 180, x: width/2, y: 1000 });
  ctaBox.addEffect('zoomIn', 0.5, 1.8);
  scene9.addChild(ctaBox);

  const ctaText1 = new FFText({ text: '👆 FOLLOW FOR MORE', x: width/2, y: 970, fontSize: 44 });
  ctaText1.setColor(COLORS.white);
  ctaText1.alignCenter();
  ctaText1.addEffect('fadeIn', 0.3, 2);
  scene9.addChild(ctaText1);

  const ctaText2 = new FFText({ text: 'WORD STORIES', x: width/2, y: 1040, fontSize: 52 });
  ctaText2.setColor(COLORS.black);
  ctaText2.alignCenter();
  ctaText2.addEffect('bounceIn', 0.4, 2.2);
  scene9.addChild(ctaText2);

  // Hashtags
  const hashtags = new FFText({ text: '#KineticTypography #Sonder #WordOfTheDay', x: width/2, y: 1250, fontSize: 32 });
  hashtags.setColor(COLORS.electricBlue);
  hashtags.alignCenter();
  hashtags.addEffect('fadeIn', 0.4, 2.8);
  scene9.addChild(hashtags);

  // Social actions
  const social = new FFText({ text: '❤️ LIKE  💬 COMMENT  🔄 SHARE', x: width/2, y: 1400, fontSize: 36 });
  social.setColor(COLORS.white);
  social.alignCenter();
  social.addEffect('fadeInUp', 0.4, 3.2);
  scene9.addChild(social);

  // Story count
  const storyNum = new FFText({ text: 'STORY 2 OF 30', x: width/2, y: 1550, fontSize: 28 });
  storyNum.setColor(COLORS.gray);
  storyNum.alignCenter();
  storyNum.addEffect('fadeIn', 0.3, 3.8);
  scene9.addChild(storyNum);

  // Corner accents
  const cornerAccent1 = new FFRect({ color: COLORS.limeGreen, width: 80, height: 80, x: 50, y: height - 50 });
  cornerAccent1.addEffect('fadeIn', 0.2, 4);
  scene9.addChild(cornerAccent1);

  const cornerAccent2 = new FFRect({ color: COLORS.deepPurple, width: 80, height: 80, x: width - 50, y: height - 50 });
  cornerAccent2.addEffect('fadeIn', 0.2, 4.2);
  scene9.addChild(cornerAccent2);

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
    console.log(colors.magenta('\n🎬 "Kinetic Dictionary: SONDER" complete!\n'));
  });

  creator.start();
}

// Run the video creation
createKineticSonderVideo().catch(err => {
  console.error(colors.red('Error creating video:'), err);
});

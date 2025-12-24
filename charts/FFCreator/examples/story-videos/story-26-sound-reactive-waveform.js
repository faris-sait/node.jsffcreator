/**
 * 🎬 STORY 26: "Sound-Reactive Waveform" - Music/Audio
 * 
 * The Story: A new indie song teaser with atmospheric visuals.
 * 
 * Visual Style:
 * - Dark, atmospheric, moody
 * - Focus on a single burning candle
 * - Audio Spectrum Effect
 * - Frame Sampling and Flicker
 * - Circular waveform reacting to bass
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~30 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-26-sound-reactive-waveform.js
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
// COLOR PALETTE - Dark Atmospheric
// ============================================
const COLORS = {
  // Dark background
  deepBlack: '#000000',
  voidBlack: '#0a0a0a',
  charcoal: '#1a1a1a',
  darkGray: '#2a2a2a',
  
  // Candle colors
  flameOrange: '#ff6600',
  flameYellow: '#ffaa00',
  flameWhite: '#fff5e6',
  candleBeige: '#f5e6d3',
  wickBrown: '#3d2817',
  
  // Waveform colors
  waveBlue: '#00d4ff',
  waveCyan: '#00ffff',
  wavePurple: '#9d00ff',
  wavePink: '#ff00ff',
  waveGreen: '#00ff88',
  
  // Accent colors
  glowOrange: '#ff8833',
  neonBlue: '#0099ff',
  electricPurple: '#cc00ff',
  
  // Text
  white: '#ffffff',
  lightGray: '#cccccc',
  dimWhite: '#e6e6e6'
};

// ============================================
// HELPER: Create Circular Waveform
// ============================================
function addCircularWaveform(scene, centerX, centerY, radius, barCount, delay, beatIntensity = 1) {
  const angleStep = (Math.PI * 2) / barCount;
  
  for (let i = 0; i < barCount; i++) {
    const angle = i * angleStep;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    
    // Simulate audio reactivity with varying heights
    const baseHeight = 20 + (Math.random() * 30);
    const beatHeight = baseHeight * (1 + beatIntensity);
    
    const bar = new FFRect({ 
      color: i % 3 === 0 ? COLORS.waveBlue : i % 3 === 1 ? COLORS.wavePurple : COLORS.wavePink,
      width: 8, 
      height: baseHeight, 
      x: x, 
      y: y 
    });
    
    bar.setRotate(angle + Math.PI / 2);
    bar.setOpacity(0.8);
    bar.addEffect('fadeIn', 0.2, delay + (i * 0.01));
    
    // Pulse animation to simulate audio reactivity
    const pulseAnim = {
      from: { scaleY: 1.0 },
      to: { scaleY: 1.5 + (Math.random() * beatIntensity) },
      time: 0.3,
      delay: delay + (i * 0.01) + 0.5,
      ease: 'Cubic.InOut'
    };
    bar.addAnimate(pulseAnim);
    
    scene.addChild(bar);
  }
}

// ============================================
// HELPER: Add Candle with Flame
// ============================================
function addCandle(scene, x, y, delay) {
  // Candle body
  const candleBody = new FFRect({ 
    color: COLORS.candleBeige, 
    width: 80, 
    height: 200, 
    x: x, 
    y: y + 50 
  });
  candleBody.addEffect('fadeIn', 0.5, delay);
  scene.addChild(candleBody);
  
  // Candle top (melted wax)
  const candleTop = new FFRect({ 
    color: COLORS.candleBeige, 
    width: 90, 
    height: 30, 
    x: x, 
    y: y - 85 
  });
  candleTop.addEffect('fadeIn', 0.5, delay + 0.1);
  scene.addChild(candleTop);
  
  // Wick
  const wick = new FFRect({ 
    color: COLORS.wickBrown, 
    width: 6, 
    height: 25, 
    x: x, 
    y: y - 110 
  });
  wick.addEffect('fadeIn', 0.4, delay + 0.2);
  scene.addChild(wick);
  
  // Flame (main)
  const flame = new FFRect({ 
    color: COLORS.flameOrange, 
    width: 40, 
    height: 70, 
    x: x, 
    y: y - 145 
  });
  flame.setOpacity(0.9);
  flame.addEffect('fadeIn', 0.3, delay + 0.3);
  
  // Flicker animation
  const flickerAnim = {
    from: { scaleY: 1.0, scaleX: 1.0 },
    to: { scaleY: 1.15, scaleX: 0.95 },
    time: 0.4,
    delay: delay + 0.5,
    ease: 'Sine.InOut'
  };
  flame.addAnimate(flickerAnim);
  scene.addChild(flame);
  
  // Flame inner (bright)
  const flameInner = new FFRect({ 
    color: COLORS.flameYellow, 
    width: 25, 
    height: 50, 
    x: x, 
    y: y - 145 
  });
  flameInner.setOpacity(0.8);
  flameInner.addEffect('fadeIn', 0.3, delay + 0.4);
  
  const flickerInner = {
    from: { scaleY: 1.0 },
    to: { scaleY: 1.2 },
    time: 0.35,
    delay: delay + 0.6,
    ease: 'Sine.InOut'
  };
  flameInner.addAnimate(flickerInner);
  scene.addChild(flameInner);
  
  // Flame core (white hot)
  const flameCore = new FFRect({ 
    color: COLORS.flameWhite, 
    width: 12, 
    height: 30, 
    x: x, 
    y: y - 140 
  });
  flameCore.setOpacity(0.9);
  flameCore.addEffect('fadeIn', 0.3, delay + 0.5);
  scene.addChild(flameCore);
  
  // Glow effect
  const glow = new FFRect({ 
    color: COLORS.glowOrange, 
    width: 200, 
    height: 200, 
    x: x, 
    y: y - 120 
  });
  glow.setOpacity(0.15);
  glow.addEffect('fadeIn', 0.6, delay + 0.3);
  scene.addChild(glow);
}

// ============================================
// HELPER: Add Spectrum Bars (Bottom)
// ============================================
function addSpectrumBars(scene, y, barCount, delay) {
  const barWidth = width / barCount;
  
  for (let i = 0; i < barCount; i++) {
    const barHeight = 50 + (Math.random() * 150);
    const x = (i * barWidth) + (barWidth / 2);
    
    const bar = new FFRect({ 
      color: i % 4 === 0 ? COLORS.waveBlue : i % 4 === 1 ? COLORS.waveCyan : i % 4 === 2 ? COLORS.wavePurple : COLORS.wavePink,
      width: barWidth - 4, 
      height: barHeight, 
      x: x, 
      y: y - (barHeight / 2) 
    });
    
    bar.setOpacity(0.6);
    bar.addEffect('fadeInUp', 0.3, delay + (i * 0.02));
    
    // Pulse with audio
    const pulseAnim = {
      from: { scaleY: 0.5 },
      to: { scaleY: 1.5 },
      time: 0.4,
      delay: delay + (i * 0.02) + 0.5,
      ease: 'Cubic.Out'
    };
    bar.addAnimate(pulseAnim);
    
    scene.addChild(bar);
  }
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createSoundReactiveWaveformVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 26: "Sound-Reactive Waveform"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~30 seconds'));
  console.log(colors.yellow('🎨 Theme: Music/Audio - Atmospheric Waveform\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-26-sound-reactive-waveform.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: INTRO - Fade In (5s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.deepBlack);
  scene1.setDuration(5);

  // Title text
  const titleText = new FFText({ text: 'NEW RELEASE', x: width/2, y: 400, fontSize: 48 });
  titleText.setColor(COLORS.dimWhite);
  titleText.alignCenter();
  titleText.addEffect('fadeIn', 0.8, 0.5);
  scene1.addChild(titleText);

  // Song title
  const songTitle = new FFText({ text: 'MIDNIGHT ECHOES', x: width/2, y: 520, fontSize: 72 });
  songTitle.setColor(COLORS.white);
  songTitle.alignCenter();
  songTitle.addEffect('fadeIn', 1, 1.2);
  scene1.addChild(songTitle);

  // Artist name
  const artistText = new FFText({ text: 'by The Indie Collective', x: width/2, y: 640, fontSize: 36 });
  artistText.setColor(COLORS.lightGray);
  artistText.alignCenter();
  artistText.addEffect('fadeIn', 0.8, 2);
  scene1.addChild(artistText);

  // Decorative lines
  const line1 = new FFRect({ color: COLORS.waveBlue, width: 400, height: 3, x: width/2, y: 750 });
  line1.addEffect('zoomIn', 0.6, 2.5);
  scene1.addChild(line1);

  const line2 = new FFRect({ color: COLORS.wavePurple, width: 400, height: 3, x: width/2, y: 780 });
  line2.addEffect('zoomIn', 0.6, 2.7);
  scene1.addChild(line2);

  // Hint text
  const hintText = new FFText({ text: '🔊 Turn up the volume', x: width/2, y: 1500, fontSize: 32 });
  hintText.setColor(COLORS.lightGray);
  hintText.alignCenter();
  hintText.addEffect('fadeIn', 0.6, 3.5);
  scene1.addChild(hintText);

  scene1.setTransition('fade', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Intro - Fade In (5s)'));

  // ============================================
  // SCENE 2: CANDLE APPEARS - First Waveform (6s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.voidBlack);
  scene2.setDuration(6);

  // Add candle
  addCandle(scene2, width/2, height/2, 0.5);

  // First circular waveform (small)
  addCircularWaveform(scene2, width/2, height/2 - 120, 180, 32, 1.5, 0.5);

  // Ambient particles
  for (let i = 0; i < 20; i++) {
    const particle = new FFRect({ 
      color: COLORS.glowOrange, 
      width: 4, 
      height: 4, 
      x: width/2 + (Math.random() - 0.5) * 400, 
      y: height/2 - 120 + (Math.random() - 0.5) * 400 
    });
    particle.setOpacity(0.3);
    particle.addEffect('fadeIn', 0.4, 2 + (Math.random() * 2));
    scene2.addChild(particle);
  }

  // Text overlay
  const sceneText = new FFText({ text: 'Listen...', x: width/2, y: 1400, fontSize: 42 });
  sceneText.setColor(COLORS.dimWhite);
  sceneText.alignCenter();
  sceneText.addEffect('fadeIn', 0.6, 3);
  scene2.addChild(sceneText);

  scene2.setTransition('crosswarp', 0.4);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Candle Appears - First Waveform (6s)'));

  // ============================================
  // SCENE 3: BASS DROP - Intense Waveform (7s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.deepBlack);
  scene3.setDuration(7);

  // Candle with stronger glow
  addCandle(scene3, width/2, height/2, 0);

  // Multiple circular waveforms (layered)
  addCircularWaveform(scene3, width/2, height/2 - 120, 200, 40, 0.5, 1.5);
  addCircularWaveform(scene3, width/2, height/2 - 120, 280, 48, 0.8, 1.8);
  addCircularWaveform(scene3, width/2, height/2 - 120, 360, 56, 1.1, 2.0);

  // Bottom spectrum bars
  addSpectrumBars(scene3, height - 100, 30, 1.5);

  // Flicker effect (screen flash)
  for (let i = 0; i < 8; i++) {
    const flash = new FFRect({ color: COLORS.flameOrange, width: width, height: height, x: width/2, y: height/2 });
    flash.setOpacity(0.1);
    flash.addEffect('fadeIn', 0.05, 2 + (i * 0.4));
    flash.addEffect('fadeOut', 0.05, 2.05 + (i * 0.4));
    scene3.addChild(flash);
  }

  // Beat text
  const beatText = new FFText({ text: 'FEEL THE BEAT', x: width/2, y: 350, fontSize: 56 });
  beatText.setColor(COLORS.waveBlue);
  beatText.alignCenter();
  beatText.addEffect('bounceIn', 0.5, 2.5);
  beatText.addEffect('fadeOut', 0.4, 5);
  scene3.addChild(beatText);

  scene3.setTransition('windowslice', 0.5);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Bass Drop - Intense Waveform (7s)'));

  // ============================================
  // SCENE 4: BREAKDOWN - Pulsing Energy (6s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.voidBlack);
  scene4.setDuration(6);

  // Candle
  addCandle(scene4, width/2, height/2, 0);

  // Radial waveform rings (expanding)
  for (let ring = 0; ring < 5; ring++) {
    const ringRadius = 150 + (ring * 80);
    const ringDelay = 0.5 + (ring * 0.3);
    
    for (let i = 0; i < 48; i++) {
      const angle = (i / 48) * Math.PI * 2;
      const x = width/2 + Math.cos(angle) * ringRadius;
      const y = (height/2 - 120) + Math.sin(angle) * ringRadius;
      
      const dot = new FFRect({ 
        color: ring % 2 === 0 ? COLORS.waveCyan : COLORS.electricPurple,
        width: 6, 
        height: 6, 
        x: x, 
        y: y 
      });
      dot.setOpacity(0.7);
      dot.addEffect('fadeIn', 0.2, ringDelay + (i * 0.01));
      
      // Pulse animation
      const pulseAnim = {
        from: { scale: 1.0 },
        to: { scale: 2.0 },
        time: 0.5,
        delay: ringDelay + (i * 0.01) + 0.3,
        ease: 'Cubic.Out'
      };
      dot.addAnimate(pulseAnim);
      
      scene4.addChild(dot);
    }
  }

  // Energy text
  const energyText = new FFText({ text: 'ENERGY RISING', x: width/2, y: 1450, fontSize: 48 });
  energyText.setColor(COLORS.wavePurple);
  energyText.alignCenter();
  energyText.addEffect('fadeIn', 0.5, 2);
  scene4.addChild(energyText);

  // Spectrum at top
  for (let i = 0; i < 25; i++) {
    const barWidth = width / 25;
    const barHeight = 40 + (Math.random() * 80);
    const x = (i * barWidth) + (barWidth / 2);
    
    const topBar = new FFRect({ 
      color: i % 2 === 0 ? COLORS.waveGreen : COLORS.waveCyan,
      width: barWidth - 4, 
      height: barHeight, 
      x: x, 
      y: 100 + (barHeight / 2) 
    });
    topBar.setOpacity(0.5);
    topBar.addEffect('fadeInDown', 0.3, 2.5 + (i * 0.02));
    scene4.addChild(topBar);
  }

  scene4.setTransition('directionalwarp', 0.5);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Breakdown - Pulsing Energy (6s)'));

  // ============================================
  // SCENE 5: OUTRO - Fade Out (6s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.deepBlack);
  scene5.setDuration(6);

  // Candle fading
  addCandle(scene5, width/2, height/2, 0);

  // Final waveform (calm)
  addCircularWaveform(scene5, width/2, height/2 - 120, 220, 36, 0.5, 0.3);

  // Outro text
  const outroTitle = new FFText({ text: 'MIDNIGHT ECHOES', x: width/2, y: 1300, fontSize: 64 });
  outroTitle.setColor(COLORS.white);
  outroTitle.alignCenter();
  outroTitle.addEffect('fadeIn', 0.8, 1);
  scene5.addChild(outroTitle);

  const outroSubtitle = new FFText({ text: 'Available Now', x: width/2, y: 1420, fontSize: 36 });
  outroSubtitle.setColor(COLORS.lightGray);
  outroSubtitle.alignCenter();
  outroSubtitle.addEffect('fadeIn', 0.6, 1.5);
  scene5.addChild(outroSubtitle);

  // Social media icons (text emojis)
  const spotifyIcon = new FFText({ text: '🎵', x: width/2 - 120, y: 1550, fontSize: 48 });
  spotifyIcon.addEffect('bounceIn', 0.4, 2.5);
  scene5.addChild(spotifyIcon);

  const appleIcon = new FFText({ text: '🎧', x: width/2, y: 1550, fontSize: 48 });
  appleIcon.addEffect('bounceIn', 0.4, 2.7);
  scene5.addChild(appleIcon);

  const youtubeIcon = new FFText({ text: '▶️', x: width/2 + 120, y: 1550, fontSize: 48 });
  youtubeIcon.addEffect('bounceIn', 0.4, 2.9);
  scene5.addChild(youtubeIcon);

  // Hashtags
  const hashtagText = new FFText({ text: '#IndieMusic #NewRelease #MidnightEchoes', x: width/2, y: 1700, fontSize: 26 });
  hashtagText.setColor(COLORS.darkGray);
  hashtagText.alignCenter();
  hashtagText.addEffect('fadeIn', 0.5, 3.5);
  scene5.addChild(hashtagText);

  // Fade to black
  const fadeBlack = new FFRect({ color: COLORS.deepBlack, width: width, height: height, x: width/2, y: height/2 });
  fadeBlack.addEffect('fadeIn', 1, 4.5);
  scene5.addChild(fadeBlack);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Outro - Fade Out (6s)'));

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
    console.log(colors.magenta('\n🎬 Story 26: "Sound-Reactive Waveform" complete!\n'));
    console.log(colors.yellow('🎥 Features used:'));
    console.log(colors.cyan('   • Circular waveform around candle'));
    console.log(colors.cyan('   • Audio spectrum bars (simulated)'));
    console.log(colors.cyan('   • Flame flicker effects'));
    console.log(colors.cyan('   • Pulsing animations synced to "beat"'));
    console.log(colors.cyan('   • Radial expanding rings'));
    console.log(colors.cyan('   • Dark atmospheric lighting\n'));
  });

  creator.start();
}

createSoundReactiveWaveformVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

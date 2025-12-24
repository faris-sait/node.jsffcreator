/**
 * 🎬 STORY 29: "Infinite Zoom" - Mind-Bending
 * 
 * The Story: Zooming into a person's eye, finding a galaxy, zooming into 
 * a planet, and finding that same person - creating an infinite loop.
 * 
 * Visual Style:
 * - Space-themed, psychedelic
 * - Nested Sequences
 * - Exponential Zoom
 * - Seamless Looping
 * - No text - pure visual experience
 * - Focus on center point
 * 
 * Format: YouTube Shorts (9:16 - 1080x1920)
 * Duration: ~30 seconds (5 scenes)
 * 
 * Run with: node examples/story-videos/story-29-infinite-zoom.js
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
// COLOR PALETTE - Space & Psychedelic
// ============================================
const COLORS = {
  // Space colors
  deepSpace: '#000000',
  spaceBlue: '#0a0e27',
  spacePurple: '#1a0f2e',
  nebulaPink: '#ff006e',
  nebulaPurple: '#8338ec',
  nebulaBlue: '#3a86ff',
  
  // Eye colors
  eyeWhite: '#f8f8f8',
  irisBlue: '#4a90e2',
  irisBrown: '#8b6f47',
  pupilBlack: '#000000',
  
  // Planet colors
  planetBlue: '#1e88e5',
  planetGreen: '#43a047',
  planetBrown: '#8d6e63',
  planetRed: '#e53935',
  
  // Galaxy colors
  galaxyPurple: '#9c27b0',
  galaxyBlue: '#2196f3',
  galaxyPink: '#e91e63',
  galaxyWhite: '#ffffff',
  
  // Psychedelic
  neonPink: '#ff00ff',
  neonCyan: '#00ffff',
  neonGreen: '#00ff00',
  neonYellow: '#ffff00',
  
  // Stars
  starWhite: '#ffffff',
  starYellow: '#fff9c4',
  starBlue: '#bbdefb'
};

// ============================================
// HELPER: Add Stars
// ============================================
function addStars(scene, count, delay = 0) {
  for (let i = 0; i < count; i++) {
    const size = 2 + Math.random() * 4;
    const star = new FFRect({ 
      color: [COLORS.starWhite, COLORS.starYellow, COLORS.starBlue][Math.floor(Math.random() * 3)],
      width: size, 
      height: size, 
      x: Math.random() * width, 
      y: Math.random() * height 
    });
    star.setOpacity(0.6 + Math.random() * 0.4);
    star.addEffect('fadeIn', 0.3, delay + (Math.random() * 0.5));
    scene.addChild(star);
  }
}

// ============================================
// HELPER: Create Eye
// ============================================
function createEye(scene, centerX, centerY, scale, delay = 0) {
  // Eye white (sclera)
  const eyeWhite = new FFRect({ 
    color: COLORS.eyeWhite, 
    width: 400 * scale, 
    height: 250 * scale, 
    x: centerX, 
    y: centerY 
  });
  eyeWhite.addEffect('fadeIn', 0.5, delay);
  scene.addChild(eyeWhite);
  
  // Iris
  const iris = new FFRect({ 
    color: COLORS.irisBlue, 
    width: 180 * scale, 
    height: 180 * scale, 
    x: centerX, 
    y: centerY 
  });
  iris.addEffect('fadeIn', 0.4, delay + 0.2);
  scene.addChild(iris);
  
  // Iris details (rings)
  for (let i = 0; i < 3; i++) {
    const ring = new FFRect({ 
      color: COLORS.irisBrown, 
      width: (140 - i * 30) * scale, 
      height: (140 - i * 30) * scale, 
      x: centerX, 
      y: centerY 
    });
    ring.setOpacity(0.3);
    ring.addEffect('fadeIn', 0.3, delay + 0.3 + (i * 0.1));
    scene.addChild(ring);
  }
  
  // Pupil
  const pupil = new FFRect({ 
    color: COLORS.pupilBlack, 
    width: 80 * scale, 
    height: 80 * scale, 
    x: centerX, 
    y: centerY 
  });
  pupil.addEffect('fadeIn', 0.4, delay + 0.5);
  scene.addChild(pupil);
  
  // Light reflection
  const reflection = new FFRect({ 
    color: COLORS.starWhite, 
    width: 20 * scale, 
    height: 20 * scale, 
    x: centerX - 20 * scale, 
    y: centerY - 20 * scale 
  });
  reflection.setOpacity(0.8);
  reflection.addEffect('fadeIn', 0.3, delay + 0.6);
  scene.addChild(reflection);
  
  return pupil;
}

// ============================================
// HELPER: Create Galaxy
// ============================================
function createGalaxy(scene, centerX, centerY, delay = 0) {
  // Galaxy core
  const core = new FFRect({ 
    color: COLORS.galaxyWhite, 
    width: 150, 
    height: 150, 
    x: centerX, 
    y: centerY 
  });
  core.setOpacity(0.9);
  core.addEffect('fadeIn', 0.5, delay);
  scene.addChild(core);
  
  // Spiral arms
  for (let arm = 0; arm < 4; arm++) {
    const armAngle = (arm / 4) * Math.PI * 2;
    
    for (let i = 0; i < 15; i++) {
      const distance = 100 + (i * 30);
      const angle = armAngle + (i * 0.3);
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      const star = new FFRect({ 
        color: [COLORS.galaxyPurple, COLORS.galaxyBlue, COLORS.galaxyPink][i % 3],
        width: 15 - (i * 0.5), 
        height: 15 - (i * 0.5), 
        x: x, 
        y: y 
      });
      star.setOpacity(0.7 - (i * 0.03));
      star.addEffect('fadeIn', 0.3, delay + 0.2 + (i * 0.02));
      scene.addChild(star);
    }
  }
  
  // Nebula clouds
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const distance = 200 + Math.random() * 100;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    
    const nebula = new FFRect({ 
      color: [COLORS.nebulaPink, COLORS.nebulaPurple, COLORS.nebulaBlue][i % 3],
      width: 80 + Math.random() * 60, 
      height: 80 + Math.random() * 60, 
      x: x, 
      y: y 
    });
    nebula.setOpacity(0.4);
    nebula.addEffect('fadeIn', 0.5, delay + 0.5 + (i * 0.1));
    scene.addChild(nebula);
  }
}

// ============================================
// HELPER: Create Planet
// ============================================
function createPlanet(scene, centerX, centerY, delay = 0) {
  // Planet body
  const planet = new FFRect({ 
    color: COLORS.planetBlue, 
    width: 400, 
    height: 400, 
    x: centerX, 
    y: centerY 
  });
  planet.addEffect('fadeIn', 0.5, delay);
  scene.addChild(planet);
  
  // Continents/land masses
  for (let i = 0; i < 6; i++) {
    const landX = centerX + (Math.random() - 0.5) * 300;
    const landY = centerY + (Math.random() - 0.5) * 300;
    
    const land = new FFRect({ 
      color: COLORS.planetGreen, 
      width: 60 + Math.random() * 80, 
      height: 50 + Math.random() * 70, 
      x: landX, 
      y: landY 
    });
    land.setOpacity(0.8);
    land.addEffect('fadeIn', 0.4, delay + 0.2 + (i * 0.1));
    scene.addChild(land);
  }
  
  // Clouds
  for (let i = 0; i < 10; i++) {
    const cloudX = centerX + (Math.random() - 0.5) * 350;
    const cloudY = centerY + (Math.random() - 0.5) * 350;
    
    const cloud = new FFRect({ 
      color: COLORS.eyeWhite, 
      width: 40 + Math.random() * 50, 
      height: 30 + Math.random() * 40, 
      x: cloudX, 
      y: cloudY 
    });
    cloud.setOpacity(0.5);
    cloud.addEffect('fadeIn', 0.3, delay + 0.5 + (i * 0.05));
    scene.addChild(cloud);
  }
  
  // Atmosphere glow
  const atmosphere = new FFRect({ 
    color: COLORS.nebulaBlue, 
    width: 500, 
    height: 500, 
    x: centerX, 
    y: centerY 
  });
  atmosphere.setOpacity(0.2);
  atmosphere.addEffect('fadeIn', 0.6, delay + 0.3);
  scene.addChild(atmosphere);
}

// ============================================
// MAIN VIDEO CREATION
// ============================================
async function createInfiniteZoomVideo() {
  console.log(colors.magenta('\n🎬 Creating Story 29: "Infinite Zoom"...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical - YouTube Shorts)'));
  console.log(colors.cyan('⏱️  Duration: ~30 seconds'));
  console.log(colors.yellow('🎨 Theme: Mind-Bending - Infinite Loop\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'story-29-infinite-zoom.mp4'),
    width,
    height,
    fps: 30,
    highWaterMark: '3mb'
  });

  // ============================================
  // SCENE 1: PERSON'S EYE - Starting Point (6s)
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor(COLORS.deepSpace);
  scene1.setDuration(6);

  // Subtle background
  const bg1 = new FFRect({ 
    color: COLORS.spaceBlue, 
    width: width, 
    height: height, 
    x: width/2, 
    y: height/2 
  });
  bg1.setOpacity(0.3);
  scene1.addChild(bg1);

  // Create eye at center
  const eye1 = createEye(scene1, width/2, height/2, 1, 0.5);

  // Zoom into pupil animation
  const zoomAnim1 = {
    from: { scale: 1.0 },
    to: { scale: 3.0 },
    time: 4,
    delay: 1.5,
    ease: 'Cubic.In'
  };
  eye1.addAnimate(zoomAnim1);

  // Psychedelic color flashes
  for (let i = 0; i < 5; i++) {
    const flash = new FFRect({ 
      color: [COLORS.neonPink, COLORS.neonCyan, COLORS.neonGreen][i % 3],
      width: width, 
      height: height, 
      x: width/2, 
      y: height/2 
    });
    flash.setOpacity(0.1);
    flash.addEffect('fadeIn', 0.1, 3 + (i * 0.3));
    flash.addEffect('fadeOut', 0.1, 3.1 + (i * 0.3));
    scene1.addChild(flash);
  }

  scene1.setTransition('zoomIn', 0.5);
  creator.addChild(scene1);
  console.log(colors.green('  ✓ Scene 1: Person\'s Eye - Starting Point (6s)'));

  // ============================================
  // SCENE 2: ENTERING SPACE - Transition (6s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor(COLORS.deepSpace);
  scene2.setDuration(6);

  // Stars appearing
  addStars(scene2, 150, 0);

  // Tunnel effect (expanding circles)
  for (let i = 0; i < 10; i++) {
    const tunnel = new FFRect({ 
      color: [COLORS.nebulaPurple, COLORS.nebulaBlue, COLORS.nebulaPink][i % 3],
      width: 100 + (i * 100), 
      height: 100 + (i * 100), 
      x: width/2, 
      y: height/2 
    });
    tunnel.setOpacity(0.3 - (i * 0.02));
    tunnel.addEffect('fadeIn', 0.3, 0.5 + (i * 0.1));
    
    const expandAnim = {
      from: { scale: 0.5 },
      to: { scale: 3.0 },
      time: 4,
      delay: 0.5 + (i * 0.1),
      ease: 'Cubic.Out'
    };
    tunnel.addAnimate(expandAnim);
    tunnel.addEffect('fadeOut', 0.5, 4 + (i * 0.1));
    scene2.addChild(tunnel);
  }

  // Warp speed lines
  for (let i = 0; i < 30; i++) {
    const angle = (i / 30) * Math.PI * 2;
    const startDist = 100;
    const endDist = 1000;
    
    const line = new FFRect({ 
      color: COLORS.starWhite, 
      width: 4, 
      height: 100, 
      x: width/2 + Math.cos(angle) * startDist, 
      y: height/2 + Math.sin(angle) * startDist 
    });
    line.setRotate(angle);
    line.setOpacity(0.6);
    line.addEffect('fadeIn', 0.2, 1 + (i * 0.02));
    
    const warpAnim = {
      from: { x: width/2 + Math.cos(angle) * startDist, y: height/2 + Math.sin(angle) * startDist },
      to: { x: width/2 + Math.cos(angle) * endDist, y: height/2 + Math.sin(angle) * endDist },
      time: 2,
      delay: 1 + (i * 0.02),
      ease: 'Cubic.In'
    };
    line.addAnimate(warpAnim);
    line.addEffect('fadeOut', 0.3, 2.5 + (i * 0.02));
    scene2.addChild(line);
  }

  scene2.setTransition('crosswarp', 0.5);
  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: Entering Space - Transition (6s)'));

  // ============================================
  // SCENE 3: GALAXY - Cosmic Scale (6s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor(COLORS.deepSpace);
  scene3.setDuration(6);

  // Deep space stars
  addStars(scene3, 200, 0);

  // Create galaxy
  createGalaxy(scene3, width/2, height/2, 0.5);

  // Zoom into galaxy center
  const galaxyCore = new FFRect({ 
    color: COLORS.galaxyWhite, 
    width: 150, 
    height: 150, 
    x: width/2, 
    y: height/2 
  });
  galaxyCore.setOpacity(0.9);
  galaxyCore.addEffect('fadeIn', 0.5, 0.5);
  
  const zoomGalaxy = {
    from: { scale: 1.0 },
    to: { scale: 4.0 },
    time: 4,
    delay: 1.5,
    ease: 'Cubic.In'
  };
  galaxyCore.addAnimate(zoomGalaxy);
  scene3.addChild(galaxyCore);

  // Psychedelic spiral
  for (let i = 0; i < 20; i++) {
    const spiralAngle = (i / 20) * Math.PI * 2;
    const spiralDist = 50 + (i * 20);
    
    const spiralDot = new FFRect({ 
      color: [COLORS.neonPink, COLORS.neonCyan, COLORS.neonYellow][i % 3],
      width: 15, 
      height: 15, 
      x: width/2 + Math.cos(spiralAngle) * spiralDist, 
      y: height/2 + Math.sin(spiralAngle) * spiralDist 
    });
    spiralDot.setOpacity(0.7);
    spiralDot.addEffect('fadeIn', 0.3, 2 + (i * 0.05));
    scene3.addChild(spiralDot);
  }

  scene3.setTransition('zoomIn', 0.6);
  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: Galaxy - Cosmic Scale (6s)'));

  // ============================================
  // SCENE 4: PLANET - Zooming In (6s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor(COLORS.deepSpace);
  scene4.setDuration(6);

  // Stars in background
  addStars(scene4, 100, 0);

  // Create planet
  createPlanet(scene4, width/2, height/2, 0.5);

  // Planet zoom animation
  const planetBody = new FFRect({ 
    color: COLORS.planetBlue, 
    width: 400, 
    height: 400, 
    x: width/2, 
    y: height/2 
  });
  planetBody.addEffect('fadeIn', 0.5, 0.5);
  
  const zoomPlanet = {
    from: { scale: 0.5 },
    to: { scale: 3.5 },
    time: 4.5,
    delay: 1,
    ease: 'Cubic.In'
  };
  planetBody.addAnimate(zoomPlanet);
  scene4.addChild(planetBody);

  // Atmosphere particles
  for (let i = 0; i < 30; i++) {
    const particle = new FFRect({ 
      color: COLORS.eyeWhite, 
      width: 5 + Math.random() * 8, 
      height: 5 + Math.random() * 8, 
      x: width/2 + (Math.random() - 0.5) * 600, 
      y: height/2 + (Math.random() - 0.5) * 600 
    });
    particle.setOpacity(0.4);
    particle.addEffect('fadeIn', 0.3, 1 + (Math.random() * 2));
    
    const floatAnim = {
      from: { y: particle.y },
      to: { y: particle.y + (Math.random() - 0.5) * 200 },
      time: 3,
      delay: 1 + (Math.random() * 2),
      ease: 'Sine.InOut'
    };
    particle.addAnimate(floatAnim);
    scene4.addChild(particle);
  }

  // Color flashes
  for (let i = 0; i < 4; i++) {
    const flash = new FFRect({ 
      color: [COLORS.neonCyan, COLORS.neonGreen][i % 2],
      width: width, 
      height: height, 
      x: width/2, 
      y: height/2 
    });
    flash.setOpacity(0.15);
    flash.addEffect('fadeIn', 0.1, 3.5 + (i * 0.4));
    flash.addEffect('fadeOut', 0.1, 3.6 + (i * 0.4));
    scene4.addChild(flash);
  }

  scene4.setTransition('zoomIn', 0.7);
  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: Planet - Zooming In (6s)'));

  // ============================================
  // SCENE 5: BACK TO EYE - The Loop (6s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor(COLORS.deepSpace);
  scene5.setDuration(6);

  // Transition from planet surface to eye
  const transitionBg = new FFRect({ 
    color: COLORS.spaceBlue, 
    width: width, 
    height: height, 
    x: width/2, 
    y: height/2 
  });
  transitionBg.setOpacity(0.3);
  transitionBg.addEffect('fadeIn', 0.5, 0);
  scene5.addChild(transitionBg);

  // Eye appears (completing the loop)
  const finalEye = createEye(scene5, width/2, height/2, 0.3, 0.5);
  
  // Zoom out from eye
  const zoomOutAnim = {
    from: { scale: 3.0 },
    to: { scale: 1.0 },
    time: 3,
    delay: 0.5,
    ease: 'Cubic.Out'
  };
  finalEye.addAnimate(zoomOutAnim);

  // Infinite symbol appears
  const infinityLeft = new FFRect({ 
    color: COLORS.neonPink, 
    width: 80, 
    height: 80, 
    x: width/2 - 60, 
    y: 1600 
  });
  infinityLeft.setOpacity(0.8);
  infinityLeft.addEffect('fadeIn', 0.5, 3.5);
  scene5.addChild(infinityLeft);

  const infinityRight = new FFRect({ 
    color: COLORS.neonCyan, 
    width: 80, 
    height: 80, 
    x: width/2 + 60, 
    y: 1600 
  });
  infinityRight.setOpacity(0.8);
  infinityRight.addEffect('fadeIn', 0.5, 3.7);
  scene5.addChild(infinityRight);

  const infinityCenter = new FFRect({ 
    color: COLORS.neonYellow, 
    width: 40, 
    height: 40, 
    x: width/2, 
    y: 1600 
  });
  infinityCenter.setOpacity(0.9);
  infinityCenter.addEffect('fadeIn', 0.5, 3.9);
  scene5.addChild(infinityCenter);

  // Loop indicator text (minimal)
  const loopText = new FFText({ text: '∞', x: width/2, y: 1700, fontSize: 120 });
  loopText.setColor(COLORS.starWhite);
  loopText.alignCenter();
  loopText.addEffect('bounceIn', 0.6, 4);
  scene5.addChild(loopText);

  // Psychedelic final flash
  for (let i = 0; i < 6; i++) {
    const finalFlash = new FFRect({ 
      color: [COLORS.neonPink, COLORS.neonCyan, COLORS.neonGreen, COLORS.neonYellow][i % 4],
      width: width, 
      height: height, 
      x: width/2, 
      y: height/2 
    });
    finalFlash.setOpacity(0.2);
    finalFlash.addEffect('fadeIn', 0.05, 4.5 + (i * 0.15));
    finalFlash.addEffect('fadeOut', 0.05, 4.55 + (i * 0.15));
    scene5.addChild(finalFlash);
  }

  // Fade to black for seamless loop
  const fadeBlack = new FFRect({ 
    color: COLORS.deepSpace, 
    width: width, 
    height: height, 
    x: width/2, 
    y: height/2 
  });
  fadeBlack.addEffect('fadeIn', 0.8, 5);
  scene5.addChild(fadeBlack);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Back to Eye - The Loop (6s)'));

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
    console.log(colors.magenta('\n🎬 Story 29: "Infinite Zoom" complete!\n'));
    console.log(colors.yellow('🎥 Features used:'));
    console.log(colors.cyan('   • Exponential zoom animations'));
    console.log(colors.cyan('   • Nested visual sequences'));
    console.log(colors.cyan('   • Space and galaxy effects'));
    console.log(colors.cyan('   • Psychedelic color flashes'));
    console.log(colors.cyan('   • Seamless loop structure'));
    console.log(colors.cyan('   • Center-focused composition\n'));
  });

  creator.start();
}

createInfiniteZoomVideo().catch(err => {
  console.error(colors.red('Failed to create video:'), err);
});

/**
 * 📊 Charts with New Animations - FFCreator
 * 
 * Using bounce, zoom, rotate, back animations and unique transitions.
 * Run with: node examples/charts-new-animations.js
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
const { FFText, FFChart, FFScene, FFCreator } = require('../');

FFCreator.setFFmpegPath(ffmpegPath);
FFCreator.setFFprobePath(ffprobePath);

const outputDir = path.join(__dirname, './output/');
const cacheDir = path.join(__dirname, './cache/');

const width = 800;
const height = 600;

async function createChartsWithNewAnimations() {
  console.log(colors.green('\n🎬 Creating Charts with NEW Animations...\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'charts-new-animations.mp4'),
    width,
    height,
    fps: 30
  });

  // ============================================
  // INTRO SCENE - bounceIn + zoomIn
  // ============================================
  const introScene = new FFScene();
  introScene.setBgColor('#1a0a2e');
  introScene.setDuration(3);

  const introText1 = new FFText({ text: '🚀 Data Analytics', x: width / 2, y: height / 2 - 40, fontSize: 52 });
  introText1.setColor('#ff6b9d');
  introText1.alignCenter();
  introText1.addEffect('bounceIn', 1.2, 0);  // NEW: Bounce effect
  introScene.addChild(introText1);

  const introText2 = new FFText({ text: 'Dynamic Visualizations', x: width / 2, y: height / 2 + 30, fontSize: 24 });
  introText2.setColor('#c56cf0');
  introText2.alignCenter();
  introText2.addEffect('zoomIn', 0.8, 0.4);  // NEW: Zoom in effect
  introScene.addChild(introText2);

  const introText3 = new FFText({ text: '✦ 2025 Edition ✦', x: width / 2, y: height / 2 + 80, fontSize: 16 });
  introText3.setColor('#7158e2');
  introText3.alignCenter();
  introText3.addEffect('rotateIn', 1, 0.8);  // NEW: Rotate in
  introScene.addChild(introText3);

  creator.addChild(introScene);
  console.log(colors.cyan('  ✓ Intro (bounceIn, zoomIn, rotateIn)'));

  // ============================================
  // SCENE 1: Bar Chart - backInLeft + circlecrop transition
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor('#2d1b4e');
  scene1.setDuration(5);
  scene1.setTransition('moveleft', 0.8);  // NEW: Move left transition

  const title1 = new FFText({ text: '📊 Revenue Analysis', x: width / 2, y: 35, fontSize: 28 });
  title1.setColor('#ff6b9d');
  title1.alignCenter();
  title1.addEffect('backInLeft', 0.8, 0);  // NEW: Back in from left
  scene1.addChild(title1);

  const subtitle1 = new FFText({ text: 'Q4 2025 Performance', x: width / 2, y: 70, fontSize: 16 });
  subtitle1.setColor('#aaa');
  subtitle1.alignCenter();
  subtitle1.addEffect('bounceInRight', 0.8, 0.3);  // NEW: Bounce from right
  scene1.addChild(subtitle1);

  const barOption = {
    backgroundColor: 'transparent',
    xAxis: {
      type: 'category',
      data: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
      axisLabel: { color: '#fff', fontSize: 13 },
      axisLine: { lineStyle: { color: '#555' } }
    },
    yAxis: { type: 'value', axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#444' } } },
    series: [{
      data: [95, 120, 145, 160, 180, 220],
      type: 'bar',
      itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ff6b9d' }, { offset: 1, color: '#c56cf0' }] } },
      label: { show: true, position: 'top', color: '#fff', formatter: '${c}K' }
    }],
    animationDuration: 2000
  };

  const chart1 = new FFChart({ theme: 'dark', option: barOption, x: width / 2, y: height / 2 + 30, width: width - 100, height: height - 150 });
  scene1.addChild(chart1);
  creator.addChild(scene1);
  console.log(colors.cyan('  ✓ Bar Chart (backInLeft, bounceInRight) + circlecrop'));

  // ============================================
  // SCENE 2: Line Chart - zoomInLeft + windowshades transition
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor('#1e3a5f');
  scene2.setDuration(5);
  scene2.setTransition('stretch', 0.8);  // NEW: Stretch transition

  const title2 = new FFText({ text: '📈 Growth Trend', x: width / 2, y: 35, fontSize: 28 });
  title2.setColor('#00d9ff');
  title2.alignCenter();
  title2.addEffect('zoomInLeft', 0.8, 0);  // NEW: Zoom from left
  scene2.addChild(title2);

  const subtitle2 = new FFText({ text: 'User Acquisition Rate', x: width / 2, y: 70, fontSize: 16 });
  subtitle2.setColor('#aaa');
  subtitle2.alignCenter();
  subtitle2.addEffect('rollIn', 1, 0.3);  // NEW: Roll in effect
  scene2.addChild(subtitle2);

  const lineOption = {
    backgroundColor: 'transparent',
    legend: { data: ['Users', 'Sessions'], bottom: 10, textStyle: { color: '#fff' } },
    xAxis: {
      type: 'category',
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      axisLabel: { color: '#fff' },
      axisLine: { lineStyle: { color: '#555' } }
    },
    yAxis: { type: 'value', axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#333' } } },
    series: [
      { name: 'Users', type: 'line', smooth: true, data: [500, 800, 1200, 1800, 2500, 3200], lineStyle: { width: 4, color: '#00d9ff' }, itemStyle: { color: '#00d9ff' }, symbol: 'diamond', symbolSize: 10 },
      { name: 'Sessions', type: 'line', smooth: true, data: [1000, 1600, 2400, 3600, 5000, 6400], lineStyle: { width: 4, color: '#ff6348' }, itemStyle: { color: '#ff6348' }, symbol: 'diamond', symbolSize: 10 }
    ],
    animationDuration: 2000
  };

  const chart2 = new FFChart({ theme: 'dark', option: lineOption, x: width / 2, y: height / 2 + 30, width: width - 100, height: height - 150 });
  scene2.addChild(chart2);
  creator.addChild(scene2);
  console.log(colors.cyan('  ✓ Line Chart (zoomInLeft, rollIn) + windowshades'));

  // ============================================
  // SCENE 3: Pie Chart - bounceInDown + waterwave transition
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor('#1a2f4a');
  scene3.setDuration(5);
  scene3.setTransition('slice', 0.8);  // NEW: Slice transition

  const title3 = new FFText({ text: '🥧 Market Share', x: width / 2, y: 35, fontSize: 28 });
  title3.setColor('#feca57');
  title3.alignCenter();
  title3.addEffect('bounceInDown', 0.8, 0);  // NEW: Bounce from top
  scene3.addChild(title3);

  const subtitle3 = new FFText({ text: 'Industry Distribution 2025', x: width / 2, y: 70, fontSize: 16 });
  subtitle3.setColor('#aaa');
  subtitle3.alignCenter();
  subtitle3.addEffect('backInUp', 0.8, 0.3);  // NEW: Back in from bottom
  scene3.addChild(subtitle3);

  const pieOption = {
    backgroundColor: 'transparent',
    legend: { orient: 'horizontal', bottom: 10, textStyle: { color: '#fff' } },
    series: [{
      type: 'pie',
      radius: ['35%', '65%'],
      center: ['50%', '55%'],
      itemStyle: { borderRadius: 10, borderColor: '#1a2f4a', borderWidth: 3 },
      label: { show: true, color: '#fff', formatter: '{b}\n{d}%', fontSize: 12 },
      data: [
        { value: 40, name: 'Tech', itemStyle: { color: '#ff6b6b' } },
        { value: 28, name: 'Finance', itemStyle: { color: '#feca57' } },
        { value: 18, name: 'Retail', itemStyle: { color: '#48dbfb' } },
        { value: 14, name: 'Health', itemStyle: { color: '#1dd1a1' } }
      ]
    }],
    animationDuration: 2000
  };

  const chart3 = new FFChart({ theme: 'dark', option: pieOption, x: width / 2, y: height / 2 + 30, width: width - 80, height: height - 130 });
  scene3.addChild(chart3);
  creator.addChild(scene3);
  console.log(colors.cyan('  ✓ Pie Chart (bounceInDown, backInUp) + waterwave'));

  // ============================================
  // SCENE 4: Area Chart - rotateInUpLeft + magnifier transition
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor('#2c2c54');
  scene4.setDuration(5);
  scene4.setTransition('fat', 0.8);  // NEW: Fat/grow transition

  const title4 = new FFText({ text: '🌊 Traffic Flow', x: width / 2, y: 35, fontSize: 28 });
  title4.setColor('#a29bfe');
  title4.alignCenter();
  title4.addEffect('rotateInUpLeft', 1, 0);  // NEW: Rotate from bottom-left
  scene4.addChild(title4);

  const subtitle4 = new FFText({ text: '24-Hour Network Analysis', x: width / 2, y: 70, fontSize: 16 });
  subtitle4.setColor('#aaa');
  subtitle4.alignCenter();
  subtitle4.addEffect('zoomInRight', 0.8, 0.3);  // NEW: Zoom from right
  scene4.addChild(subtitle4);

  const areaOption = {
    backgroundColor: 'transparent',
    legend: { data: ['Inbound', 'Outbound'], bottom: 10, textStyle: { color: '#fff' } },
    xAxis: {
      type: 'category', boundaryGap: false,
      data: ['0h', '4h', '8h', '12h', '16h', '20h', '24h'],
      axisLabel: { color: '#fff' },
      axisLine: { lineStyle: { color: '#555' } }
    },
    yAxis: { type: 'value', axisLabel: { color: '#fff', formatter: '{value} GB' }, splitLine: { lineStyle: { color: '#444' } } },
    series: [
      { name: 'Inbound', type: 'line', smooth: true, areaStyle: { opacity: 0.7, color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#a29bfe' }, { offset: 1, color: 'transparent' }] } }, lineStyle: { color: '#a29bfe', width: 3 }, data: [10, 25, 60, 85, 70, 45, 15] },
      { name: 'Outbound', type: 'line', smooth: true, areaStyle: { opacity: 0.7, color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#74b9ff' }, { offset: 1, color: 'transparent' }] } }, lineStyle: { color: '#74b9ff', width: 3 }, data: [8, 20, 50, 75, 60, 40, 12] }
    ],
    animationDuration: 2000
  };

  const chart4 = new FFChart({ theme: 'dark', option: areaOption, x: width / 2, y: height / 2 + 30, width: width - 100, height: height - 150 });
  scene4.addChild(chart4);
  creator.addChild(scene4);
  console.log(colors.cyan('  ✓ Area Chart (rotateInUpLeft, zoomInRight) + magnifier'));

  // ============================================
  // SCENE 5: Radar Chart - backInDown + oblique transition
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor('#1e272e');
  scene5.setDuration(5);
  scene5.setTransition('fluidly', 0.8);  // NEW: Fluid motion transition

  const title5 = new FFText({ text: '🎯 Skill Matrix', x: width / 2, y: 35, fontSize: 28 });
  title5.setColor('#00d8d6');
  title5.alignCenter();
  title5.addEffect('backInDown', 0.8, 0);  // NEW: Back in from top
  scene5.addChild(title5);

  const subtitle5 = new FFText({ text: 'Team Competency Assessment', x: width / 2, y: 70, fontSize: 16 });
  subtitle5.setColor('#aaa');
  subtitle5.alignCenter();
  subtitle5.addEffect('bounceInUp', 0.8, 0.3);  // NEW: Bounce from bottom
  scene5.addChild(subtitle5);

  const radarOption = {
    backgroundColor: 'transparent',
    legend: { data: ['Team A', 'Team B'], bottom: 10, textStyle: { color: '#fff' } },
    radar: {
      indicator: [
        { name: 'Coding', max: 100 },
        { name: 'Design', max: 100 },
        { name: 'Communication', max: 100 },
        { name: 'Leadership', max: 100 },
        { name: 'Problem Solving', max: 100 }
      ],
      axisName: { color: '#ddd', fontSize: 12 },
      splitArea: { areaStyle: { color: ['#2d3436', '#1e272e'] } },
      axisLine: { lineStyle: { color: '#555' } },
      splitLine: { lineStyle: { color: '#444' } }
    },
    series: [{
      type: 'radar',
      data: [
        { value: [90, 75, 85, 70, 95], name: 'Team A', areaStyle: { opacity: 0.5, color: '#00d8d6' }, lineStyle: { color: '#00d8d6', width: 3 }, itemStyle: { color: '#00d8d6' } },
        { value: [70, 95, 80, 90, 75], name: 'Team B', areaStyle: { opacity: 0.5, color: '#ff9ff3' }, lineStyle: { color: '#ff9ff3', width: 3 }, itemStyle: { color: '#ff9ff3' } }
      ]
    }],
    animationDuration: 2000
  };

  const chart5 = new FFChart({ theme: 'dark', option: radarOption, x: width / 2, y: height / 2 + 30, width: width - 80, height: height - 130 });
  scene5.addChild(chart5);
  creator.addChild(scene5);
  console.log(colors.cyan('  ✓ Radar Chart (backInDown, bounceInUp) + oblique'));

  // ============================================
  // SCENE 6: Scatter Chart - zoomInUp + sunflower transition
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor('#192a56');
  scene6.setDuration(5);
  scene6.setTransition('shake', 0.8);  // NEW: Shake transition

  const title6 = new FFText({ text: '⭐ Correlation Map', x: width / 2, y: 35, fontSize: 28 });
  title6.setColor('#f9ca24');
  title6.alignCenter();
  title6.addEffect('zoomInUp', 0.8, 0);  // NEW: Zoom from bottom
  scene6.addChild(title6);

  const subtitle6 = new FFText({ text: 'Investment vs Returns', x: width / 2, y: 70, fontSize: 16 });
  subtitle6.setColor('#aaa');
  subtitle6.alignCenter();
  subtitle6.addEffect('rotateInDownRight', 1, 0.3);  // NEW: Rotate from top-right
  scene6.addChild(subtitle6);

  const scatterOption = {
    backgroundColor: 'transparent',
    legend: { data: ['Low Risk', 'Medium Risk', 'High Risk'], bottom: 10, textStyle: { color: '#fff' } },
    xAxis: { type: 'value', name: 'Investment ($K)', nameLocation: 'middle', nameGap: 30, nameTextStyle: { color: '#fff' }, axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#333' } } },
    yAxis: { type: 'value', name: 'ROI (%)', nameLocation: 'middle', nameGap: 40, nameTextStyle: { color: '#fff' }, axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#333' } } },
    series: [
      { name: 'Low Risk', type: 'scatter', symbolSize: 18, data: [[50, 8], [80, 12], [100, 15], [70, 10], [90, 14]], itemStyle: { color: '#1dd1a1' } },
      { name: 'Medium Risk', type: 'scatter', symbolSize: 18, data: [[150, 25], [200, 35], [180, 30], [220, 40], [170, 28]], itemStyle: { color: '#f9ca24' } },
      { name: 'High Risk', type: 'scatter', symbolSize: 18, data: [[300, 60], [350, 80], [400, 100], [320, 70], [380, 90]], itemStyle: { color: '#ee5253' } }
    ],
    animationDuration: 2000
  };

  const chart6 = new FFChart({ theme: 'dark', option: scatterOption, x: width / 2, y: height / 2 + 30, width: width - 100, height: height - 150 });
  scene6.addChild(chart6);
  creator.addChild(scene6);
  console.log(colors.cyan('  ✓ Scatter Chart (zoomInUp, rotateInDownRight) + sunflower'));

  // ============================================
  // OUTRO SCENE - backIn + zoomOut
  // ============================================
  const outroScene = new FFScene();
  outroScene.setBgColor('#1a0a2e');
  outroScene.setDuration(3);
  outroScene.setTransition('zoomright', 0.8);  // NEW: Zoom right transition

  const outroText1 = new FFText({ text: '🎉 Thank You!', x: width / 2, y: height / 2 - 30, fontSize: 48 });
  outroText1.setColor('#ff6b9d');
  outroText1.alignCenter();
  outroText1.addEffect('backIn', 1, 0);  // NEW: Back in with overshoot
  outroScene.addChild(outroText1);

  const outroText2 = new FFText({ text: 'Built with FFCreator', x: width / 2, y: height / 2 + 30, fontSize: 22 });
  outroText2.setColor('#c56cf0');
  outroText2.alignCenter();
  outroText2.addEffect('bounceIn', 0.8, 0.4);  // NEW: Bounce in
  outroScene.addChild(outroText2);

  const outroText3 = new FFText({ text: '★ Dynamic Charts ★ New Animations ★', x: width / 2, y: height / 2 + 75, fontSize: 14 });
  outroText3.setColor('#7158e2');
  outroText3.alignCenter();
  outroText3.addEffect('zoomInDown', 0.8, 0.7);  // NEW: Zoom from top
  outroScene.addChild(outroText3);

  creator.addChild(outroScene);
  console.log(colors.cyan('  ✓ Outro (backIn, bounceIn, zoomInDown) + tricolorcircle'));

  // Event handlers
  creator.on('start', () => console.log(colors.yellow('\n📹 Rendering...')));
  creator.on('error', e => console.log(colors.red(`❌ Error: ${e.message || e}`)));
  creator.on('progress', e => process.stdout.write(colors.blue(`\r  Progress: ${(e.percent * 100).toFixed(1)}%`)));
  creator.on('complete', e => {
    console.log(colors.green(`\n\n✅ Video created!`));
    console.log(colors.white(`📁 Output: ${e.output}`));
  });

  creator.start();
}

console.log(colors.magenta('\n╔═════════════════════════════════════════════╗'));
console.log(colors.magenta('║    📊 Charts with NEW Animations 📊         ║'));
console.log(colors.magenta('╚═════════════════════════════════════════════╝'));

createChartsWithNewAnimations();

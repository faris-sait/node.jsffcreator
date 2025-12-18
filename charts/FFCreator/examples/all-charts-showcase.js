/**
 * 📊 All Charts Showcase - FFCreator
 * 
 * Clean presentation of all 6 chart types with titles.
 * Run with: node examples/all-charts-showcase.js
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

async function createAllChartsShowcase() {
  console.log(colors.green('\n🎬 Creating All Charts Showcase...\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'all-charts-showcase.mp4'),
    width,
    height,
    fps: 30
  });

  // ============================================
  // INTRO SCENE
  // ============================================
  const introScene = new FFScene();
  introScene.setBgColor('#0a0a1a');
  introScene.setDuration(3);

  const introText1 = new FFText({ text: '📊 Chart Visualization', x: width / 2, y: height / 2 - 30, fontSize: 48 });
  introText1.setColor('#00d4ff');
  introText1.alignCenter();
  introText1.addEffect('fadeInUp', 1, 0);
  introScene.addChild(introText1);

  const introText2 = new FFText({ text: 'Powered by FFCreator & ECharts', x: width / 2, y: height / 2 + 40, fontSize: 22 });
  introText2.setColor('#888888');
  introText2.alignCenter();
  introText2.addEffect('fadeIn', 1, 0.5);
  introScene.addChild(introText2);

  creator.addChild(introScene);
  console.log(colors.cyan('  ✓ Intro'));

  // ============================================
  // SCENE 1: Bar Chart
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor('#1a1a2e');
  scene1.setDuration(5);
  scene1.setTransition('fadeIn', 0.5);

  const title1 = new FFText({ text: 'Bar Chart', x: width / 2, y: 35, fontSize: 28 });
  title1.setColor('#00d4ff');
  title1.alignCenter();
  scene1.addChild(title1);

  const subtitle1 = new FFText({ text: 'Monthly Sales Performance', x: width / 2, y: 70, fontSize: 16 });
  subtitle1.setColor('#888888');
  subtitle1.alignCenter();
  scene1.addChild(subtitle1);

  const barOption = {
    backgroundColor: 'transparent',
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      axisLabel: { color: '#fff', fontSize: 13 },
      axisLine: { lineStyle: { color: '#555' } }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [{
      data: [120, 200, 150, 180, 230, 210],
      type: 'bar',
      itemStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#00d4ff' }, { offset: 1, color: '#0066ff' }] }
      },
      label: { show: true, position: 'top', color: '#fff' }
    }],
    animationDuration: 1500
  };

  const chart1 = new FFChart({ theme: 'dark', option: barOption, x: width / 2, y: height / 2 + 30, width: width - 100, height: height - 150 });
  scene1.addChild(chart1);
  creator.addChild(scene1);
  console.log(colors.cyan('  ✓ Bar Chart'));

  // ============================================
  // SCENE 2: Line Chart
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor('#16213e');
  scene2.setDuration(5);
  scene2.setTransition('slideLeft', 0.5);

  const title2 = new FFText({ text: 'Line Chart', x: width / 2, y: 35, fontSize: 28 });
  title2.setColor('#00ff88');
  title2.alignCenter();
  scene2.addChild(title2);

  const subtitle2 = new FFText({ text: 'Weekly Website Traffic', x: width / 2, y: 70, fontSize: 16 });
  subtitle2.setColor('#888888');
  subtitle2.alignCenter();
  scene2.addChild(subtitle2);

  const lineOption = {
    backgroundColor: 'transparent',
    legend: { data: ['Visitors', 'Page Views'], bottom: 10, textStyle: { color: '#fff' } },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: { color: '#fff' },
      axisLine: { lineStyle: { color: '#555' } }
    },
    yAxis: { type: 'value', axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#333' } } },
    series: [
      { name: 'Visitors', type: 'line', smooth: true, data: [820, 932, 901, 1034, 1290, 1330, 1120], lineStyle: { width: 3, color: '#00ff88' }, itemStyle: { color: '#00ff88' }, symbol: 'circle', symbolSize: 8 },
      { name: 'Page Views', type: 'line', smooth: true, data: [1200, 1400, 1300, 1600, 1900, 2100, 1800], lineStyle: { width: 3, color: '#ffd93d' }, itemStyle: { color: '#ffd93d' }, symbol: 'circle', symbolSize: 8 }
    ],
    animationDuration: 1500
  };

  const chart2 = new FFChart({ theme: 'dark', option: lineOption, x: width / 2, y: height / 2 + 30, width: width - 100, height: height - 150 });
  scene2.addChild(chart2);
  creator.addChild(scene2);
  console.log(colors.cyan('  ✓ Line Chart'));

  // ============================================
  // SCENE 3: Pie Chart
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor('#0f3460');
  scene3.setDuration(5);
  scene3.setTransition('fadeIn', 0.5);

  const title3 = new FFText({ text: 'Pie Chart', x: width / 2, y: 35, fontSize: 28 });
  title3.setColor('#ffd93d');
  title3.alignCenter();
  scene3.addChild(title3);

  const subtitle3 = new FFText({ text: 'Revenue Distribution by Category', x: width / 2, y: 70, fontSize: 16 });
  subtitle3.setColor('#888888');
  subtitle3.alignCenter();
  scene3.addChild(subtitle3);

  const pieOption = {
    backgroundColor: 'transparent',
    legend: { orient: 'horizontal', bottom: 10, textStyle: { color: '#fff' } },
    series: [{
      type: 'pie',
      radius: ['30%', '60%'],
      center: ['50%', '55%'],
      itemStyle: { borderRadius: 8, borderColor: '#0f3460', borderWidth: 2 },
      label: { show: true, color: '#fff', formatter: '{b}: {d}%' },
      data: [
        { value: 35, name: 'Electronics', itemStyle: { color: '#5470C6' } },
        { value: 25, name: 'Clothing', itemStyle: { color: '#91CC75' } },
        { value: 20, name: 'Home', itemStyle: { color: '#FAC858' } },
        { value: 12, name: 'Sports', itemStyle: { color: '#EE6666' } },
        { value: 8, name: 'Other', itemStyle: { color: '#73C0DE' } }
      ]
    }],
    animationDuration: 1500
  };

  const chart3 = new FFChart({ theme: 'dark', option: pieOption, x: width / 2, y: height / 2 + 30, width: width - 80, height: height - 130 });
  scene3.addChild(chart3);
  creator.addChild(scene3);
  console.log(colors.cyan('  ✓ Pie Chart'));

  // ============================================
  // SCENE 4: Area Chart
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor('#1a1a2e');
  scene4.setDuration(5);
  scene4.setTransition('slideUp', 0.5);

  const title4 = new FFText({ text: 'Area Chart', x: width / 2, y: 35, fontSize: 28 });
  title4.setColor('#e056fd');
  title4.alignCenter();
  scene4.addChild(title4);

  const subtitle4 = new FFText({ text: 'Server Resource Usage', x: width / 2, y: 70, fontSize: 16 });
  subtitle4.setColor('#888888');
  subtitle4.alignCenter();
  scene4.addChild(subtitle4);

  const areaOption = {
    backgroundColor: 'transparent',
    legend: { data: ['CPU', 'Memory', 'Disk'], bottom: 10, textStyle: { color: '#fff' } },
    xAxis: {
      type: 'category', boundaryGap: false,
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      axisLabel: { color: '#fff' },
      axisLine: { lineStyle: { color: '#555' } }
    },
    yAxis: { type: 'value', max: 100, axisLabel: { color: '#fff', formatter: '{value}%' }, splitLine: { lineStyle: { color: '#333' } } },
    series: [
      { name: 'CPU', type: 'line', stack: 'Total', areaStyle: { opacity: 0.6, color: '#5470C6' }, lineStyle: { color: '#5470C6' }, data: [15, 25, 45, 60, 55, 40, 20] },
      { name: 'Memory', type: 'line', stack: 'Total', areaStyle: { opacity: 0.6, color: '#91CC75' }, lineStyle: { color: '#91CC75' }, data: [20, 30, 35, 45, 50, 45, 30] },
      { name: 'Disk', type: 'line', stack: 'Total', areaStyle: { opacity: 0.6, color: '#FAC858' }, lineStyle: { color: '#FAC858' }, data: [10, 12, 15, 18, 20, 22, 18] }
    ],
    animationDuration: 1500
  };

  const chart4 = new FFChart({ theme: 'dark', option: areaOption, x: width / 2, y: height / 2 + 30, width: width - 100, height: height - 150 });
  scene4.addChild(chart4);
  creator.addChild(scene4);
  console.log(colors.cyan('  ✓ Area Chart'));

  // ============================================
  // SCENE 5: Radar Chart
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor('#16213e');
  scene5.setDuration(5);
  scene5.setTransition('fadeIn', 0.5);

  const title5 = new FFText({ text: 'Radar Chart', x: width / 2, y: 35, fontSize: 28 });
  title5.setColor('#ff6b6b');
  title5.alignCenter();
  scene5.addChild(title5);

  const subtitle5 = new FFText({ text: 'Product Comparison Analysis', x: width / 2, y: 70, fontSize: 16 });
  subtitle5.setColor('#888888');
  subtitle5.alignCenter();
  scene5.addChild(subtitle5);

  const radarOption = {
    backgroundColor: 'transparent',
    legend: { data: ['Product A', 'Product B'], bottom: 10, textStyle: { color: '#fff' } },
    radar: {
      indicator: [
        { name: 'Quality', max: 100 },
        { name: 'Price', max: 100 },
        { name: 'Support', max: 100 },
        { name: 'Features', max: 100 },
        { name: 'Performance', max: 100 },
        { name: 'Design', max: 100 }
      ],
      axisName: { color: '#fff', fontSize: 12 },
      splitArea: { areaStyle: { color: ['#333', '#222'] } }
    },
    series: [{
      type: 'radar',
      data: [
        { value: [85, 70, 90, 80, 95, 88], name: 'Product A', areaStyle: { opacity: 0.4, color: '#00d4ff' }, lineStyle: { color: '#00d4ff', width: 2 }, itemStyle: { color: '#00d4ff' } },
        { value: [75, 90, 70, 85, 80, 92], name: 'Product B', areaStyle: { opacity: 0.4, color: '#ff6b6b' }, lineStyle: { color: '#ff6b6b', width: 2 }, itemStyle: { color: '#ff6b6b' } }
      ]
    }],
    animationDuration: 1500
  };

  const chart5 = new FFChart({ theme: 'dark', option: radarOption, x: width / 2, y: height / 2 + 30, width: width - 80, height: height - 130 });
  scene5.addChild(chart5);
  creator.addChild(scene5);
  console.log(colors.cyan('  ✓ Radar Chart'));

  // ============================================
  // SCENE 6: Scatter Chart
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor('#0f3460');
  scene6.setDuration(5);
  scene6.setTransition('slideLeft', 0.5);

  const title6 = new FFText({ text: 'Scatter Chart', x: width / 2, y: 35, fontSize: 28 });
  title6.setColor('#ff9f43');
  title6.alignCenter();
  scene6.addChild(title6);

  const subtitle6 = new FFText({ text: 'Price vs Performance Analysis', x: width / 2, y: 70, fontSize: 16 });
  subtitle6.setColor('#888888');
  subtitle6.alignCenter();
  scene6.addChild(subtitle6);

  const scatterOption = {
    backgroundColor: 'transparent',
    legend: { data: ['Budget', 'Mid-range', 'Premium'], bottom: 10, textStyle: { color: '#fff' } },
    xAxis: { type: 'value', name: 'Price ($)', nameLocation: 'middle', nameGap: 30, nameTextStyle: { color: '#fff' }, axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#333' } } },
    yAxis: { type: 'value', name: 'Performance', nameLocation: 'middle', nameGap: 40, nameTextStyle: { color: '#fff' }, axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#333' } } },
    series: [
      { name: 'Budget', type: 'scatter', symbolSize: 15, data: [[100, 40], [150, 55], [200, 60], [180, 50], [120, 45]], itemStyle: { color: '#91CC75' } },
      { name: 'Mid-range', type: 'scatter', symbolSize: 15, data: [[350, 70], [400, 75], [450, 80], [380, 72], [420, 78]], itemStyle: { color: '#FAC858' } },
      { name: 'Premium', type: 'scatter', symbolSize: 15, data: [[600, 85], [700, 90], [800, 95], [650, 88], [750, 92]], itemStyle: { color: '#EE6666' } }
    ],
    animationDuration: 1500
  };

  const chart6 = new FFChart({ theme: 'dark', option: scatterOption, x: width / 2, y: height / 2 + 30, width: width - 100, height: height - 150 });
  scene6.addChild(chart6);
  creator.addChild(scene6);
  console.log(colors.cyan('  ✓ Scatter Chart'));

  // ============================================
  // OUTRO SCENE
  // ============================================
  const outroScene = new FFScene();
  outroScene.setBgColor('#0a0a1a');
  outroScene.setDuration(3);
  outroScene.setTransition('fadeIn', 0.5);

  const outroText1 = new FFText({ text: '✨ FFCreator Charts', x: width / 2, y: height / 2 - 20, fontSize: 42 });
  outroText1.setColor('#00d4ff');
  outroText1.alignCenter();
  outroText1.addEffect('fadeIn', 1, 0);
  outroScene.addChild(outroText1);

  const outroText2 = new FFText({ text: 'Data Visualization Made Simple', x: width / 2, y: height / 2 + 35, fontSize: 20 });
  outroText2.setColor('#888888');
  outroText2.alignCenter();
  outroText2.addEffect('fadeIn', 1, 0.5);
  outroScene.addChild(outroText2);

  creator.addChild(outroScene);
  console.log(colors.cyan('  ✓ Outro'));

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

console.log(colors.cyan('\n╔═════════════════════════════════════════════╗'));
console.log(colors.cyan('║       📊 All Charts Showcase 📊             ║'));
console.log(colors.cyan('╚═════════════════════════════════════════════╝'));

createAllChartsShowcase();

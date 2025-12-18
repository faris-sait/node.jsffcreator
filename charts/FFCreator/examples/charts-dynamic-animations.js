/**
 * 📊 Dynamic Charts - FFCreator
 * 
 * Super dynamic animations with slides, zooms, and special effects!
 * Run with: node examples/charts-dynamic-animations.js
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

async function createDynamicCharts() {
  console.log(colors.green('\n🎬 Creating DYNAMIC Charts...\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'charts-dynamic.mp4'),
    width,
    height,
    fps: 30
  });

  // ============================================
  // INTRO SCENE - slideInDown + slideInUp combo
  // ============================================
  const introScene = new FFScene();
  introScene.setBgColor('#0d0221');
  introScene.setDuration(3);

  const introText1 = new FFText({ text: '⚡ DYNAMIC', x: width / 2, y: height / 2 - 60, fontSize: 64 });
  introText1.setColor('#ff2e63');
  introText1.alignCenter();
  introText1.addEffect('slideInDown', 0.6, 0);  // Slide from top
  introScene.addChild(introText1);

  const introText2 = new FFText({ text: 'DATA VISUALS', x: width / 2, y: height / 2 + 10, fontSize: 42 });
  introText2.setColor('#08d9d6');
  introText2.alignCenter();
  introText2.addEffect('slideInUp', 0.6, 0.2);  // Slide from bottom
  introScene.addChild(introText2);

  const introText3 = new FFText({ text: '— Interactive Charts —', x: width / 2, y: height / 2 + 70, fontSize: 18 });
  introText3.setColor('#eaeaea');
  introText3.alignCenter();
  introText3.addEffect('blurIn', 0.8, 0.5);  // Blur in effect
  introScene.addChild(introText3);

  creator.addChild(introScene);
  console.log(colors.cyan('  ✓ Intro (slideInDown, slideInUp, blurIn)'));

  // ============================================
  // SCENE 1: Gauge Chart - slideInLeft + slideInRight
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor('#190a28');
  scene1.setDuration(5);
  scene1.setTransition('fastswitch', 0.5);

  const title1 = new FFText({ text: '🎯 Performance Score', x: width / 2, y: 35, fontSize: 28 });
  title1.setColor('#ff2e63');
  title1.alignCenter();
  title1.addEffect('slideInLeft', 0.5, 0);
  scene1.addChild(title1);

  const subtitle1 = new FFText({ text: 'Real-time KPI Dashboard', x: width / 2, y: 70, fontSize: 16 });
  subtitle1.setColor('#aaa');
  subtitle1.alignCenter();
  subtitle1.addEffect('slideInRight', 0.5, 0.2);
  scene1.addChild(subtitle1);

  const gaugeOption = {
    backgroundColor: 'transparent',
    series: [{
      type: 'gauge',
      center: ['50%', '60%'],
      radius: '75%',
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 100,
      splitNumber: 10,
      itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#ff2e63' }, { offset: 0.5, color: '#08d9d6' }, { offset: 1, color: '#00ff88' }] } },
      progress: { show: true, width: 20, roundCap: true },
      pointer: { show: true, length: '60%', width: 8, itemStyle: { color: '#fff' } },
      axisLine: { lineStyle: { width: 20, color: [[1, '#333']] } },
      axisTick: { lineStyle: { color: '#555' } },
      splitLine: { length: 15, lineStyle: { color: '#555', width: 2 } },
      axisLabel: { distance: 30, color: '#ddd', fontSize: 14 },
      detail: { valueAnimation: true, formatter: '{value}%', color: '#fff', fontSize: 36, offsetCenter: [0, '40%'] },
      data: [{ value: 78 }]
    }],
    animationDuration: 2500
  };

  const chart1 = new FFChart({ theme: 'dark', option: gaugeOption, x: width / 2, y: height / 2 + 30, width: width - 80, height: height - 120 });
  scene1.addChild(chart1);
  creator.addChild(scene1);
  console.log(colors.cyan('  ✓ Gauge Chart (slideInLeft, slideInRight) + fastswitch'));

  // ============================================
  // SCENE 2: Funnel Chart - fadeInLeftBig + fadeInRightBig
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor('#1a1a3e');
  scene2.setDuration(5);
  scene2.setTransition('backoff', 0.6);

  const title2 = new FFText({ text: '🔻 Sales Funnel', x: width / 2, y: 35, fontSize: 28 });
  title2.setColor('#08d9d6');
  title2.alignCenter();
  title2.addEffect('fadeInLeftBig', 0.6, 0);  // Big fade from left
  scene2.addChild(title2);

  const subtitle2 = new FFText({ text: 'Conversion Pipeline Analysis', x: width / 2, y: 70, fontSize: 16 });
  subtitle2.setColor('#aaa');
  subtitle2.alignCenter();
  subtitle2.addEffect('fadeInRightBig', 0.6, 0.2);  // Big fade from right
  scene2.addChild(subtitle2);

  const funnelOption = {
    backgroundColor: 'transparent',
    legend: { bottom: 10, textStyle: { color: '#fff' } },
    series: [{
      type: 'funnel',
      left: '15%',
      top: 80,
      bottom: 60,
      width: '70%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 4,
      label: { show: true, position: 'inside', formatter: '{b}: {c}%', color: '#fff', fontSize: 14 },
      itemStyle: { borderColor: '#1a1a3e', borderWidth: 2 },
      data: [
        { value: 100, name: 'Visitors', itemStyle: { color: '#5470c6' } },
        { value: 75, name: 'Leads', itemStyle: { color: '#91cc75' } },
        { value: 50, name: 'Prospects', itemStyle: { color: '#fac858' } },
        { value: 30, name: 'Negotiations', itemStyle: { color: '#ee6666' } },
        { value: 15, name: 'Closed Deals', itemStyle: { color: '#73c0de' } }
      ]
    }],
    animationDuration: 2000
  };

  const chart2 = new FFChart({ theme: 'dark', option: funnelOption, x: width / 2, y: height / 2 + 30, width: width - 80, height: height - 120 });
  scene2.addChild(chart2);
  creator.addChild(scene2);
  console.log(colors.cyan('  ✓ Funnel Chart (fadeInLeftBig, fadeInRightBig) + backoff'));

  // ============================================
  // SCENE 3: Horizontal Bar - fadeInUpBig + fadeInDownBig
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor('#0f2027');
  scene3.setDuration(5);
  scene3.setTransition('fadeIn', 0.6);

  const title3 = new FFText({ text: '🏆 Top Products', x: width / 2, y: 35, fontSize: 28 });
  title3.setColor('#f7d794');
  title3.alignCenter();
  title3.addEffect('fadeInUpBig', 0.6, 0);  // Big fade from bottom
  scene3.addChild(title3);

  const subtitle3 = new FFText({ text: 'Revenue by Category', x: width / 2, y: 70, fontSize: 16 });
  subtitle3.setColor('#aaa');
  subtitle3.alignCenter();
  subtitle3.addEffect('fadeInDownBig', 0.6, 0.2);  // Big fade from top
  scene3.addChild(subtitle3);

  const hBarOption = {
    backgroundColor: 'transparent',
    xAxis: { type: 'value', axisLabel: { color: '#fff', formatter: '${value}K' }, splitLine: { lineStyle: { color: '#333' } } },
    yAxis: { type: 'category', data: ['Laptops', 'Phones', 'Tablets', 'Watches', 'Cameras'], axisLabel: { color: '#fff', fontSize: 13 }, axisLine: { lineStyle: { color: '#555' } } },
    series: [{
      type: 'bar',
      data: [
        { value: 320, itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#667eea' }, { offset: 1, color: '#764ba2' }] } } },
        { value: 280, itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#f093fb' }, { offset: 1, color: '#f5576c' }] } } },
        { value: 220, itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#4facfe' }, { offset: 1, color: '#00f2fe' }] } } },
        { value: 180, itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#43e97b' }, { offset: 1, color: '#38f9d7' }] } } },
        { value: 150, itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#fa709a' }, { offset: 1, color: '#fee140' }] } } }
      ],
      label: { show: true, position: 'right', color: '#fff', formatter: '${c}K' },
      barWidth: '50%'
    }],
    animationDuration: 2000
  };

  const chart3 = new FFChart({ theme: 'dark', option: hBarOption, x: width / 2, y: height / 2 + 30, width: width - 100, height: height - 150 });
  scene3.addChild(chart3);
  creator.addChild(scene3);
  console.log(colors.cyan('  ✓ Horizontal Bar (fadeInUpBig, fadeInDownBig) + colorful'));

  // ============================================
  // SCENE 4: Doughnut Chart - rotateInDownLeft + rotateInUpRight
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor('#1f1c2c');
  scene4.setDuration(5);
  scene4.setTransition('fluidly', 0.6);

  const title4 = new FFText({ text: '🍩 Budget Allocation', x: width / 2, y: 35, fontSize: 28 });
  title4.setColor('#a8e6cf');
  title4.alignCenter();
  title4.addEffect('rotateInDownLeft', 0.8, 0);  // Rotate from top-left
  scene4.addChild(title4);

  const subtitle4 = new FFText({ text: 'Department Spending 2025', x: width / 2, y: 70, fontSize: 16 });
  subtitle4.setColor('#aaa');
  subtitle4.alignCenter();
  subtitle4.addEffect('rotateInUpRight', 0.8, 0.3);  // Rotate from bottom-right
  scene4.addChild(subtitle4);

  const doughnutOption = {
    backgroundColor: 'transparent',
    legend: { orient: 'vertical', right: 20, top: 'center', textStyle: { color: '#fff' } },
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['40%', '55%'],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 10, borderColor: '#1f1c2c', borderWidth: 3 },
      label: { show: true, position: 'center', formatter: 'Total\n$2.5M', fontSize: 18, color: '#fff', fontWeight: 'bold' },
      emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold' } },
      labelLine: { show: false },
      data: [
        { value: 35, name: 'R&D', itemStyle: { color: '#667eea' } },
        { value: 25, name: 'Marketing', itemStyle: { color: '#f093fb' } },
        { value: 20, name: 'Operations', itemStyle: { color: '#4facfe' } },
        { value: 12, name: 'HR', itemStyle: { color: '#43e97b' } },
        { value: 8, name: 'Admin', itemStyle: { color: '#fa709a' } }
      ]
    }],
    animationDuration: 2000
  };

  const chart4 = new FFChart({ theme: 'dark', option: doughnutOption, x: width / 2, y: height / 2 + 30, width: width - 60, height: height - 120 });
  scene4.addChild(chart4);
  creator.addChild(scene4);
  console.log(colors.cyan('  ✓ Doughnut Chart (rotateInDownLeft, rotateInUpRight) + radiation'));

  // ============================================
  // SCENE 5: Stacked Bar - backOutLeft entrance + backInRight
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor('#16222a');
  scene5.setDuration(5);
  scene5.setTransition('shake', 0.6);

  const title5 = new FFText({ text: '📊 Quarterly Results', x: width / 2, y: 35, fontSize: 28 });
  title5.setColor('#11998e');
  title5.alignCenter();
  title5.addEffect('zoomInDown', 0.6, 0);  // Zoom from top
  scene5.addChild(title5);

  const subtitle5 = new FFText({ text: 'Revenue vs Expenses vs Profit', x: width / 2, y: 70, fontSize: 16 });
  subtitle5.setColor('#aaa');
  subtitle5.alignCenter();
  subtitle5.addEffect('zoomInUp', 0.6, 0.2);  // Zoom from bottom
  scene5.addChild(subtitle5);

  const stackedOption = {
    backgroundColor: 'transparent',
    legend: { data: ['Revenue', 'Expenses', 'Profit'], bottom: 10, textStyle: { color: '#fff' } },
    xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'], axisLabel: { color: '#fff' }, axisLine: { lineStyle: { color: '#555' } } },
    yAxis: { type: 'value', axisLabel: { color: '#fff', formatter: '${value}K' }, splitLine: { lineStyle: { color: '#333' } } },
    series: [
      { name: 'Revenue', type: 'bar', stack: 'total', data: [120, 150, 180, 220], itemStyle: { color: '#11998e' }, label: { show: true, color: '#fff' } },
      { name: 'Expenses', type: 'bar', stack: 'total', data: [80, 90, 100, 110], itemStyle: { color: '#fc5c65' }, label: { show: true, color: '#fff' } },
      { name: 'Profit', type: 'bar', stack: 'total', data: [40, 60, 80, 110], itemStyle: { color: '#fed330' }, label: { show: true, color: '#fff' } }
    ],
    animationDuration: 2000
  };

  const chart5 = new FFChart({ theme: 'dark', option: stackedOption, x: width / 2, y: height / 2 + 30, width: width - 100, height: height - 150 });
  scene5.addChild(chart5);
  creator.addChild(scene5);
  console.log(colors.cyan('  ✓ Stacked Bar (zoomInDown, zoomInUp) + lens'));

  // ============================================
  // SCENE 6: Mixed Chart - bounceInLeft + bounceInRight
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor('#141e30');
  scene6.setDuration(5);
  scene6.setTransition('zoomright', 0.6);

  const title6 = new FFText({ text: '📈 Combined Analysis', x: width / 2, y: 35, fontSize: 28 });
  title6.setColor('#667eea');
  title6.alignCenter();
  title6.addEffect('bounceInLeft', 0.8, 0);  // Bounce from left
  scene6.addChild(title6);

  const subtitle6 = new FFText({ text: 'Sales Volume & Growth Rate', x: width / 2, y: 70, fontSize: 16 });
  subtitle6.setColor('#aaa');
  subtitle6.alignCenter();
  subtitle6.addEffect('bounceInRight', 0.8, 0.2);  // Bounce from right
  scene6.addChild(subtitle6);

  const mixedOption = {
    backgroundColor: 'transparent',
    legend: { data: ['Sales', 'Growth %'], bottom: 10, textStyle: { color: '#fff' } },
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axisLabel: { color: '#fff' }, axisLine: { lineStyle: { color: '#555' } } },
    yAxis: [
      { type: 'value', name: 'Sales', axisLabel: { color: '#fff', formatter: '{value}K' }, splitLine: { lineStyle: { color: '#333' } } },
      { type: 'value', name: 'Growth', axisLabel: { color: '#fff', formatter: '{value}%' }, splitLine: { show: false } }
    ],
    series: [
      { name: 'Sales', type: 'bar', data: [80, 95, 110, 130, 155, 180], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#667eea' }, { offset: 1, color: '#764ba2' }] } } },
      { name: 'Growth %', type: 'line', yAxisIndex: 1, smooth: true, data: [10, 18, 16, 22, 19, 28], lineStyle: { width: 4, color: '#fad390' }, itemStyle: { color: '#fad390' }, symbol: 'circle', symbolSize: 12, areaStyle: { opacity: 0.2, color: '#fad390' } }
    ],
    animationDuration: 2000
  };

  const chart6 = new FFChart({ theme: 'dark', option: mixedOption, x: width / 2, y: height / 2 + 30, width: width - 100, height: height - 150 });
  scene6.addChild(chart6);
  creator.addChild(scene6);
  console.log(colors.cyan('  ✓ Mixed Chart (bounceInLeft, bounceInRight) + windows4'));

  // ============================================
  // SCENE 7: Polar Bar Chart - rollIn + blurIn
  // ============================================
  const scene7 = new FFScene();
  scene7.setBgColor('#1a1a2e');
  scene7.setDuration(5);
  scene7.setTransition('moveleft', 0.6);

  const title7 = new FFText({ text: '🌀 Activity Breakdown', x: width / 2, y: 35, fontSize: 28 });
  title7.setColor('#e056fd');
  title7.alignCenter();
  title7.addEffect('rollIn', 0.8, 0);
  scene7.addChild(title7);

  const subtitle7 = new FFText({ text: 'Weekly Time Distribution', x: width / 2, y: 70, fontSize: 16 });
  subtitle7.setColor('#aaa');
  subtitle7.alignCenter();
  subtitle7.addEffect('blurIn', 0.6, 0.2);
  scene7.addChild(subtitle7);

  const polarOption = {
    backgroundColor: 'transparent',
    angleAxis: { max: 100, startAngle: 90, axisLine: { lineStyle: { color: '#555' } }, axisLabel: { color: '#fff' } },
    radiusAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisLine: { lineStyle: { color: '#555' } }, axisLabel: { color: '#fff' } },
    polar: { radius: ['20%', '70%'] },
    series: [{
      type: 'bar',
      data: [85, 70, 90, 65, 80, 95, 60],
      coordinateSystem: 'polar',
      itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#e056fd' }, { offset: 1, color: '#f78fb3' }] } },
      label: { show: true, position: 'middle', color: '#fff' }
    }],
    animationDuration: 2000
  };

  const chart7 = new FFChart({ theme: 'dark', option: polarOption, x: width / 2, y: height / 2 + 30, width: width - 80, height: height - 130 });
  scene7.addChild(chart7);
  creator.addChild(scene7);
  console.log(colors.cyan('  ✓ Polar Bar (rollIn, blurIn) + hangaround'));

  // ============================================
  // SCENE 8: Tree Map - backInUp + backInDown
  // ============================================
  const scene8 = new FFScene();
  scene8.setBgColor('#0a192f');
  scene8.setDuration(5);
  scene8.setTransition('stretch', 0.6);

  const title8 = new FFText({ text: '🗂️ Storage Usage', x: width / 2, y: 35, fontSize: 28 });
  title8.setColor('#64ffda');
  title8.alignCenter();
  title8.addEffect('backInUp', 0.8, 0);
  scene8.addChild(title8);

  const subtitle8 = new FFText({ text: 'Disk Space by Category', x: width / 2, y: 70, fontSize: 16 });
  subtitle8.setColor('#aaa');
  subtitle8.alignCenter();
  subtitle8.addEffect('backInDown', 0.8, 0.2);
  scene8.addChild(subtitle8);

  const treemapOption = {
    backgroundColor: 'transparent',
    series: [{
      type: 'treemap',
      top: 90,
      bottom: 30,
      left: 30,
      right: 30,
      roam: false,
      nodeClick: false,
      breadcrumb: { show: false },
      label: { show: true, formatter: '{b}\n{c} GB', fontSize: 14, color: '#fff' },
      itemStyle: { borderColor: '#0a192f', borderWidth: 2, gapWidth: 2 },
      data: [
        { name: 'Videos', value: 450, itemStyle: { color: '#64ffda' } },
        { name: 'Photos', value: 280, itemStyle: { color: '#7c4dff' } },
        { name: 'Documents', value: 150, itemStyle: { color: '#ff6e40' } },
        { name: 'Music', value: 120, itemStyle: { color: '#ffd740' } },
        { name: 'Apps', value: 200, itemStyle: { color: '#69f0ae' } },
        { name: 'System', value: 100, itemStyle: { color: '#ff4081' } }
      ]
    }],
    animationDuration: 2000
  };

  const chart8 = new FFChart({ theme: 'dark', option: treemapOption, x: width / 2, y: height / 2 + 30, width: width - 60, height: height - 120 });
  scene8.addChild(chart8);
  creator.addChild(scene8);
  console.log(colors.cyan('  ✓ Tree Map (backInUp, backInDown) + tetrapod'));

  // ============================================
  // SCENE 9: Candlestick Chart - zoomInLeft + zoomInRight
  // ============================================
  const scene9 = new FFScene();
  scene9.setBgColor('#151515');
  scene9.setDuration(5);
  scene9.setTransition('backoff', 0.6);

  const title9 = new FFText({ text: '📈 Stock Analysis', x: width / 2, y: 35, fontSize: 28 });
  title9.setColor('#00e676');
  title9.alignCenter();
  title9.addEffect('zoomInLeft', 0.8, 0);
  scene9.addChild(title9);

  const subtitle9 = new FFText({ text: 'Weekly Price Movement', x: width / 2, y: 70, fontSize: 16 });
  subtitle9.setColor('#aaa');
  subtitle9.alignCenter();
  subtitle9.addEffect('zoomInRight', 0.8, 0.2);
  scene9.addChild(subtitle9);

  const candlestickOption = {
    backgroundColor: 'transparent',
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], axisLabel: { color: '#fff' }, axisLine: { lineStyle: { color: '#555' } } },
    yAxis: { type: 'value', min: 90, max: 130, axisLabel: { color: '#fff', formatter: '${value}' }, splitLine: { lineStyle: { color: '#333' } } },
    series: [{
      type: 'candlestick',
      data: [
        [100, 115, 98, 118],   // Mon: open, close, low, high
        [115, 108, 105, 120],  // Tue
        [108, 122, 106, 125],  // Wed
        [122, 118, 115, 128],  // Thu
        [118, 125, 112, 130]   // Fri
      ],
      itemStyle: { color: '#00e676', color0: '#ff5252', borderColor: '#00e676', borderColor0: '#ff5252' }
    }],
    animationDuration: 2000
  };

  const chart9 = new FFChart({ theme: 'dark', option: candlestickOption, x: width / 2, y: height / 2 + 30, width: width - 100, height: height - 150 });
  scene9.addChild(chart9);
  creator.addChild(scene9);
  console.log(colors.cyan('  ✓ Candlestick (zoomInLeft, zoomInRight) + stretch'));

  // ============================================
  // SCENE 10: Heatmap - fadeInLeftBig + fadeInRightBig
  // ============================================
  const scene10 = new FFScene();
  scene10.setBgColor('#1a1a2e');
  scene10.setDuration(5);
  scene10.setTransition('fastswitch', 0.6);

  const title10 = new FFText({ text: '🔥 Activity Heatmap', x: width / 2, y: 35, fontSize: 28 });
  title10.setColor('#ff6b6b');
  title10.alignCenter();
  title10.addEffect('fadeInLeftBig', 0.8, 0);
  scene10.addChild(title10);

  const subtitle10 = new FFText({ text: 'Hourly User Engagement', x: width / 2, y: 70, fontSize: 16 });
  subtitle10.setColor('#aaa');
  subtitle10.alignCenter();
  subtitle10.addEffect('fadeInRightBig', 0.8, 0.2);
  scene10.addChild(subtitle10);

  const heatmapData = [];
  const hours = ['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 12; j++) {
      heatmapData.push([j, i, Math.floor(Math.random() * 100)]);
    }
  }

  const heatmapOption = {
    backgroundColor: 'transparent',
    xAxis: { type: 'category', data: hours, axisLabel: { color: '#fff', fontSize: 10 }, axisLine: { lineStyle: { color: '#555' } }, splitArea: { show: true } },
    yAxis: { type: 'category', data: days, axisLabel: { color: '#fff' }, axisLine: { lineStyle: { color: '#555' } }, splitArea: { show: true } },
    visualMap: { min: 0, max: 100, calculable: true, orient: 'horizontal', left: 'center', bottom: 10, textStyle: { color: '#fff' }, inRange: { color: ['#1a1a2e', '#3d1a78', '#7c3aed', '#ff6b6b', '#feca57'] } },
    series: [{
      type: 'heatmap',
      data: heatmapData,
      label: { show: false },
      emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
    }],
    animationDuration: 2000
  };

  const chart10 = new FFChart({ theme: 'dark', option: heatmapOption, x: width / 2, y: height / 2 + 20, width: width - 80, height: height - 140 });
  scene10.addChild(chart10);
  creator.addChild(scene10);
  console.log(colors.cyan('  ✓ Heatmap (fadeInLeftBig, fadeInRightBig) + slice'));

  // ============================================
  // SCENE 11: Nightingale Rose - rotateIn + bounceIn
  // ============================================
  const scene11 = new FFScene();
  scene11.setBgColor('#16213e');
  scene11.setDuration(5);
  scene11.setTransition('fadeIn', 0.6);

  const title11 = new FFText({ text: '🌹 Market Segments', x: width / 2, y: 35, fontSize: 28 });
  title11.setColor('#feca57');
  title11.alignCenter();
  title11.addEffect('rotateIn', 0.8, 0);
  scene11.addChild(title11);

  const subtitle11 = new FFText({ text: 'Revenue by Region', x: width / 2, y: 70, fontSize: 16 });
  subtitle11.setColor('#aaa');
  subtitle11.alignCenter();
  subtitle11.addEffect('bounceIn', 0.8, 0.2);
  scene11.addChild(subtitle11);

  const roseOption = {
    backgroundColor: 'transparent',
    legend: { bottom: 10, textStyle: { color: '#fff' } },
    series: [{
      type: 'pie',
      radius: ['15%', '70%'],
      center: ['50%', '55%'],
      roseType: 'area',
      itemStyle: { borderRadius: 5, borderColor: '#16213e', borderWidth: 2 },
      label: { show: true, color: '#fff', formatter: '{b}\n{d}%' },
      data: [
        { value: 45, name: 'Americas', itemStyle: { color: '#ff6b6b' } },
        { value: 35, name: 'Europe', itemStyle: { color: '#feca57' } },
        { value: 28, name: 'Asia', itemStyle: { color: '#48dbfb' } },
        { value: 18, name: 'Africa', itemStyle: { color: '#1dd1a1' } },
        { value: 12, name: 'Oceania', itemStyle: { color: '#a55eea' } }
      ]
    }],
    animationDuration: 2000
  };

  const chart11 = new FFChart({ theme: 'dark', option: roseOption, x: width / 2, y: height / 2 + 30, width: width - 60, height: height - 120 });
  scene11.addChild(chart11);
  creator.addChild(scene11);
  console.log(colors.cyan('  ✓ Nightingale Rose (rotateIn, bounceIn) + fat'));

  // ============================================
  // SCENE 12: Boxplot Chart - slideInDown + slideInUp
  // ============================================
  const scene12 = new FFScene();
  scene12.setBgColor('#1e272e');
  scene12.setDuration(5);
  scene12.setTransition('fluidly', 0.6);

  const title12 = new FFText({ text: '📦 Statistical Analysis', x: width / 2, y: 35, fontSize: 28 });
  title12.setColor('#00cec9');
  title12.alignCenter();
  title12.addEffect('slideInDown', 0.6, 0);
  scene12.addChild(title12);

  const subtitle12 = new FFText({ text: 'Performance Distribution', x: width / 2, y: 70, fontSize: 16 });
  subtitle12.setColor('#aaa');
  subtitle12.alignCenter();
  subtitle12.addEffect('slideInUp', 0.6, 0.2);
  scene12.addChild(subtitle12);

  const boxplotOption = {
    backgroundColor: 'transparent',
    xAxis: { type: 'category', data: ['Team A', 'Team B', 'Team C', 'Team D'], axisLabel: { color: '#fff' }, axisLine: { lineStyle: { color: '#555' } } },
    yAxis: { type: 'value', axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#333' } } },
    series: [{
      type: 'boxplot',
      data: [
        [655, 850, 940, 980, 1070],
        [760, 800, 845, 885, 960],
        [780, 840, 855, 880, 940],
        [720, 767, 815, 865, 920]
      ],
      itemStyle: { color: '#00cec9', borderColor: '#00cec9' }
    }],
    animationDuration: 2000
  };

  const chart12 = new FFChart({ theme: 'dark', option: boxplotOption, x: width / 2, y: height / 2 + 30, width: width - 100, height: height - 150 });
  scene12.addChild(chart12);
  creator.addChild(scene12);
  console.log(colors.cyan('  ✓ Boxplot (slideInDown, slideInUp) + moveleft'));

  // ============================================
  // OUTRO SCENE - All dynamic effects
  // ============================================
  const outroScene = new FFScene();
  outroScene.setBgColor('#0d0221');
  outroScene.setDuration(3);
  outroScene.setTransition('quicksand', 0.6);

  const outroText1 = new FFText({ text: '🌟 AMAZING!', x: width / 2, y: height / 2 - 50, fontSize: 56 });
  outroText1.setColor('#ff2e63');
  outroText1.alignCenter();
  outroText1.addEffect('bounceIn', 0.8, 0);
  outroScene.addChild(outroText1);

  const outroText2 = new FFText({ text: 'Dynamic Data Visualization', x: width / 2, y: height / 2 + 20, fontSize: 24 });
  outroText2.setColor('#08d9d6');
  outroText2.alignCenter();
  outroText2.addEffect('slideInLeft', 0.6, 0.3);
  outroScene.addChild(outroText2);

  const outroText3 = new FFText({ text: 'FFCreator + ECharts', x: width / 2, y: height / 2 + 60, fontSize: 18 });
  outroText3.setColor('#eaeaea');
  outroText3.alignCenter();
  outroText3.addEffect('slideInRight', 0.6, 0.5);
  outroScene.addChild(outroText3);

  const outroText4 = new FFText({ text: '12 Chart Types • 24 Animations', x: width / 2, y: height / 2 + 100, fontSize: 14 });
  outroText4.setColor('#888');
  outroText4.alignCenter();
  outroText4.addEffect('blurIn', 0.6, 0.7);
  outroScene.addChild(outroText4);

  creator.addChild(outroScene);
  console.log(colors.cyan('  ✓ Outro (bounceIn, slideInLeft, slideInRight, blurIn) + quicksand'));

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

console.log(colors.red('\n╔═════════════════════════════════════════════╗'));
console.log(colors.red('║      ⚡ DYNAMIC Charts Animation ⚡          ║'));
console.log(colors.red('╚═════════════════════════════════════════════╝'));

createDynamicCharts();

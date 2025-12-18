/**
 * Dynamic Charts Demo - All Chart Types with Live Animations
 * 
 * This creates a video showcasing 6 different chart types,
 * each with dynamic/animated data updates.
 * 
 * Run with: node examples/dynamic-all-charts.js
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

// Set FFmpeg paths
FFCreator.setFFmpegPath(ffmpegPath);
FFCreator.setFFprobePath(ffprobePath);

const outputDir = path.join(__dirname, './output/');
const cacheDir = path.join(__dirname, './cache/');

const width = 800;
const height = 600;

// Helper to generate random data
const randomData = (count, min, max) => 
  Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);

async function createDynamicChartsVideo() {
  console.log(colors.green('\n🎬 Creating Dynamic All Charts Video...\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'dynamic-all-charts.mp4'),
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

  const introText1 = new FFText({
    text: '📊 Dynamic Charts Demo',
    x: width / 2, y: height / 2 - 30,
    fontSize: 48
  });
  introText1.setColor('#00d4ff');
  introText1.alignCenter();
  introText1.addEffect('fadeInUp', 1, 0);
  introScene.addChild(introText1);

  const introText2 = new FFText({
    text: 'Real-time Animated Data Visualization',
    x: width / 2, y: height / 2 + 40,
    fontSize: 24
  });
  introText2.setColor('#ffffff');
  introText2.alignCenter();
  introText2.addEffect('fadeIn', 1, 0.5);
  introScene.addChild(introText2);

  creator.addChild(introScene);
  console.log(colors.cyan('  ✓ Intro Scene'));

  // ============================================
  // SCENE 1: Dynamic Bar Chart
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor('#1a1a2e');
  scene1.setDuration(8);
  scene1.setTransition('fadeIn', 0.5);

  const title1 = new FFText({
    text: '📊 Dynamic Bar Chart - Live Sales',
    x: width / 2, y: 30, fontSize: 24
  });
  title1.setColor('#ffffff');
  title1.alignCenter();
  scene1.addChild(title1);

  let barData = [120, 200, 150, 80, 70, 110, 130];
  const barOption = {
    backgroundColor: 'transparent',
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: { color: '#fff', fontSize: 14 },
      axisLine: { lineStyle: { color: '#555' } }
    },
    yAxis: {
      type: 'value',
      max: 350,
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [{
      data: barData,
      type: 'bar',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#00d4ff' },
            { offset: 1, color: '#0066ff' }
          ]
        }
      },
      label: { show: true, position: 'top', color: '#fff' }
    }],
    animationDuration: 800,
    animationDurationUpdate: 800,
    animationEasingUpdate: 'elasticOut'
  };

  const chart1 = new FFChart({
    theme: 'dark',
    option: barOption,
    x: width / 2, y: height / 2 + 25,
    width: width - 100, height: height - 120
  });

  chart1.update(chart => {
    barData = randomData(7, 50, 300);
    barOption.series[0].data = barData;
    chart.setOption(barOption);
  }, 1000);
  chart1.updateNow();

  scene1.addChild(chart1);
  creator.addChild(scene1);
  console.log(colors.cyan('  ✓ Scene 1: Dynamic Bar Chart'));

  // ============================================
  // SCENE 2: Dynamic Line Chart
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor('#16213e');
  scene2.setDuration(8);
  scene2.setTransition('slideLeft', 0.5);

  const title2 = new FFText({
    text: '📈 Dynamic Line Chart - Stock Prices',
    x: width / 2, y: 30, fontSize: 24
  });
  title2.setColor('#ffffff');
  title2.alignCenter();
  scene2.addChild(title2);

  let lineData1 = [150, 230, 224, 218, 335, 447, 520];
  let lineData2 = [80, 130, 184, 250, 310, 380, 420];
  const lineOption = {
    backgroundColor: 'transparent',
    legend: {
      data: ['AAPL', 'GOOGL'],
      bottom: 5,
      textStyle: { color: '#fff' }
    },
    xAxis: {
      type: 'category',
      data: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      axisLabel: { color: '#fff' },
      axisLine: { lineStyle: { color: '#555' } }
    },
    yAxis: {
      type: 'value',
      max: 700,
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [
      {
        name: 'AAPL',
        type: 'line',
        smooth: true,
        data: lineData1,
        lineStyle: { width: 3, color: '#00ff88' },
        itemStyle: { color: '#00ff88' },
        symbol: 'circle',
        symbolSize: 8
      },
      {
        name: 'GOOGL',
        type: 'line',
        smooth: true,
        data: lineData2,
        lineStyle: { width: 3, color: '#ff6b6b' },
        itemStyle: { color: '#ff6b6b' },
        symbol: 'circle',
        symbolSize: 8
      }
    ],
    animationDuration: 800,
    animationDurationUpdate: 800
  };

  const chart2 = new FFChart({
    theme: 'dark',
    option: lineOption,
    x: width / 2, y: height / 2 + 25,
    width: width - 100, height: height - 120
  });

  chart2.update(chart => {
    lineData1 = lineData1.map(v => Math.max(100, Math.min(650, v + (Math.random() - 0.5) * 100)));
    lineData2 = lineData2.map(v => Math.max(100, Math.min(650, v + (Math.random() - 0.5) * 80)));
    lineOption.series[0].data = lineData1;
    lineOption.series[1].data = lineData2;
    chart.setOption(lineOption);
  }, 1000);
  chart2.updateNow();

  scene2.addChild(chart2);
  creator.addChild(scene2);
  console.log(colors.cyan('  ✓ Scene 2: Dynamic Line Chart'));

  // ============================================
  // SCENE 3: Dynamic Pie Chart
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor('#0f3460');
  scene3.setDuration(8);
  scene3.setTransition('fadeIn', 0.5);

  const title3 = new FFText({
    text: '🥧 Dynamic Pie Chart - Market Share',
    x: width / 2, y: 30, fontSize: 24
  });
  title3.setColor('#ffffff');
  title3.alignCenter();
  scene3.addChild(title3);

  let pieData = [
    { value: 40, name: 'Chrome', itemStyle: { color: '#4285F4' } },
    { value: 25, name: 'Safari', itemStyle: { color: '#34A853' } },
    { value: 20, name: 'Firefox', itemStyle: { color: '#FF7139' } },
    { value: 10, name: 'Edge', itemStyle: { color: '#0078D4' } },
    { value: 5, name: 'Others', itemStyle: { color: '#9E9E9E' } }
  ];
  const pieOption = {
    backgroundColor: 'transparent',
    legend: {
      orient: 'horizontal',
      bottom: 5,
      textStyle: { color: '#fff' }
    },
    series: [{
      type: 'pie',
      radius: ['30%', '60%'],
      center: ['50%', '52%'],
      itemStyle: { borderRadius: 8, borderColor: '#0f3460', borderWidth: 2 },
      label: { show: true, color: '#fff', formatter: '{b}: {d}%' },
      data: pieData
    }],
    animationDuration: 800,
    animationDurationUpdate: 800
  };

  const chart3 = new FFChart({
    theme: 'dark',
    option: pieOption,
    x: width / 2, y: height / 2 + 25,
    width: width - 80, height: height - 100
  });

  chart3.update(chart => {
    // Shuffle values while keeping total around 100
    const total = 100;
    const newVals = randomData(5, 5, 40);
    const sum = newVals.reduce((a, b) => a + b, 0);
    pieData.forEach((item, i) => {
      item.value = Math.round((newVals[i] / sum) * total);
    });
    pieOption.series[0].data = pieData;
    chart.setOption(pieOption);
  }, 1200);
  chart3.updateNow();

  scene3.addChild(chart3);
  creator.addChild(scene3);
  console.log(colors.cyan('  ✓ Scene 3: Dynamic Pie Chart'));

  // ============================================
  // SCENE 4: Dynamic Area Chart
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor('#1a1a2e');
  scene4.setDuration(8);
  scene4.setTransition('slideUp', 0.5);

  const title4 = new FFText({
    text: '📉 Dynamic Area Chart - Network Traffic',
    x: width / 2, y: 30, fontSize: 24
  });
  title4.setColor('#ffffff');
  title4.alignCenter();
  scene4.addChild(title4);

  let areaData1 = [120, 132, 101, 134, 90, 230, 210];
  let areaData2 = [220, 182, 191, 234, 290, 330, 310];
  let areaData3 = [150, 232, 201, 154, 190, 330, 410];
  const areaOption = {
    backgroundColor: 'transparent',
    legend: {
      data: ['Download', 'Upload', 'Streaming'],
      bottom: 5,
      textStyle: { color: '#fff' }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      axisLabel: { color: '#fff' },
      axisLine: { lineStyle: { color: '#555' } }
    },
    yAxis: {
      type: 'value',
      max: 500,
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [
      {
        name: 'Download',
        type: 'line',
        stack: 'Total',
        areaStyle: { opacity: 0.6, color: '#5470C6' },
        lineStyle: { color: '#5470C6' },
        data: areaData1
      },
      {
        name: 'Upload',
        type: 'line',
        stack: 'Total',
        areaStyle: { opacity: 0.6, color: '#91CC75' },
        lineStyle: { color: '#91CC75' },
        data: areaData2
      },
      {
        name: 'Streaming',
        type: 'line',
        stack: 'Total',
        areaStyle: { opacity: 0.6, color: '#FAC858' },
        lineStyle: { color: '#FAC858' },
        data: areaData3
      }
    ],
    animationDuration: 800,
    animationDurationUpdate: 800
  };

  const chart4 = new FFChart({
    theme: 'dark',
    option: areaOption,
    x: width / 2, y: height / 2 + 25,
    width: width - 100, height: height - 120
  });

  chart4.update(chart => {
    areaData1 = randomData(7, 80, 180);
    areaData2 = randomData(7, 150, 280);
    areaData3 = randomData(7, 100, 250);
    areaOption.series[0].data = areaData1;
    areaOption.series[1].data = areaData2;
    areaOption.series[2].data = areaData3;
    chart.setOption(areaOption);
  }, 1000);
  chart4.updateNow();

  scene4.addChild(chart4);
  creator.addChild(scene4);
  console.log(colors.cyan('  ✓ Scene 4: Dynamic Area Chart'));

  // ============================================
  // SCENE 5: Dynamic Radar Chart
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor('#16213e');
  scene5.setDuration(8);
  scene5.setTransition('fadeIn', 0.5);

  const title5 = new FFText({
    text: '🎯 Dynamic Radar Chart - Performance Metrics',
    x: width / 2, y: 30, fontSize: 24
  });
  title5.setColor('#ffffff');
  title5.alignCenter();
  scene5.addChild(title5);

  let radarData1 = [80, 90, 70, 85, 75, 95];
  let radarData2 = [70, 75, 85, 80, 90, 70];
  const radarOption = {
    backgroundColor: 'transparent',
    legend: {
      data: ['Team A', 'Team B'],
      bottom: 5,
      textStyle: { color: '#fff' }
    },
    radar: {
      indicator: [
        { name: 'Speed', max: 100 },
        { name: 'Accuracy', max: 100 },
        { name: 'Reliability', max: 100 },
        { name: 'Efficiency', max: 100 },
        { name: 'Innovation', max: 100 },
        { name: 'Teamwork', max: 100 }
      ],
      axisName: { color: '#fff' },
      splitArea: { areaStyle: { color: ['#333', '#222'] } }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: radarData1,
          name: 'Team A',
          areaStyle: { opacity: 0.4, color: '#00ff88' },
          lineStyle: { color: '#00ff88', width: 2 },
          itemStyle: { color: '#00ff88' }
        },
        {
          value: radarData2,
          name: 'Team B',
          areaStyle: { opacity: 0.4, color: '#ff6b6b' },
          lineStyle: { color: '#ff6b6b', width: 2 },
          itemStyle: { color: '#ff6b6b' }
        }
      ]
    }],
    animationDuration: 800,
    animationDurationUpdate: 800
  };

  const chart5 = new FFChart({
    theme: 'dark',
    option: radarOption,
    x: width / 2, y: height / 2 + 25,
    width: width - 80, height: height - 100
  });

  chart5.update(chart => {
    radarData1 = randomData(6, 60, 100);
    radarData2 = randomData(6, 55, 95);
    radarOption.series[0].data[0].value = radarData1;
    radarOption.series[0].data[1].value = radarData2;
    chart.setOption(radarOption);
  }, 1200);
  chart5.updateNow();

  scene5.addChild(chart5);
  creator.addChild(scene5);
  console.log(colors.cyan('  ✓ Scene 5: Dynamic Radar Chart'));

  // ============================================
  // SCENE 6: Dynamic Scatter Chart
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor('#0f3460');
  scene6.setDuration(8);
  scene6.setTransition('slideLeft', 0.5);

  const title6 = new FFText({
    text: '⚬ Dynamic Scatter Chart - Data Points',
    x: width / 2, y: 30, fontSize: 24
  });
  title6.setColor('#ffffff');
  title6.alignCenter();
  scene6.addChild(title6);

  const generateScatterData = (count) => 
    Array.from({ length: count }, () => [
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100)
    ]);

  let scatterData1 = generateScatterData(15);
  let scatterData2 = generateScatterData(12);
  let scatterData3 = generateScatterData(10);

  const scatterOption = {
    backgroundColor: 'transparent',
    legend: {
      data: ['Cluster A', 'Cluster B', 'Cluster C'],
      bottom: 5,
      textStyle: { color: '#fff' }
    },
    xAxis: {
      type: 'value',
      max: 100,
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [
      {
        name: 'Cluster A',
        type: 'scatter',
        symbolSize: 15,
        data: scatterData1,
        itemStyle: { color: '#5470C6' }
      },
      {
        name: 'Cluster B',
        type: 'scatter',
        symbolSize: 15,
        data: scatterData2,
        itemStyle: { color: '#91CC75' }
      },
      {
        name: 'Cluster C',
        type: 'scatter',
        symbolSize: 15,
        data: scatterData3,
        itemStyle: { color: '#FAC858' }
      }
    ],
    animationDuration: 800,
    animationDurationUpdate: 800
  };

  const chart6 = new FFChart({
    theme: 'dark',
    option: scatterOption,
    x: width / 2, y: height / 2 + 25,
    width: width - 100, height: height - 120
  });

  chart6.update(chart => {
    scatterData1 = generateScatterData(15);
    scatterData2 = generateScatterData(12);
    scatterData3 = generateScatterData(10);
    scatterOption.series[0].data = scatterData1;
    scatterOption.series[1].data = scatterData2;
    scatterOption.series[2].data = scatterData3;
    chart.setOption(scatterOption);
  }, 1000);
  chart6.updateNow();

  scene6.addChild(chart6);
  creator.addChild(scene6);
  console.log(colors.cyan('  ✓ Scene 6: Dynamic Scatter Chart'));

  // ============================================
  // OUTRO SCENE
  // ============================================
  const outroScene = new FFScene();
  outroScene.setBgColor('#0a0a1a');
  outroScene.setDuration(3);
  outroScene.setTransition('fadeIn', 0.5);

  const outroText1 = new FFText({
    text: '✨ FFCreator Dynamic Charts',
    x: width / 2, y: height / 2 - 30,
    fontSize: 42
  });
  outroText1.setColor('#00d4ff');
  outroText1.alignCenter();
  outroText1.addEffect('fadeIn', 1, 0);
  outroScene.addChild(outroText1);

  const outroText2 = new FFText({
    text: 'Real-time Data Visualization Made Easy',
    x: width / 2, y: height / 2 + 30,
    fontSize: 22
  });
  outroText2.setColor('#ffffff');
  outroText2.alignCenter();
  outroText2.addEffect('fadeInUp', 1, 0.5);
  outroScene.addChild(outroText2);

  creator.addChild(outroScene);
  console.log(colors.cyan('  ✓ Outro Scene'));

  // Event handlers
  creator.on('start', () => console.log(colors.yellow('\n📹 Rendering...')));
  creator.on('error', e => console.log(colors.red(`❌ Error: ${e.message || e}`)));
  creator.on('progress', e => process.stdout.write(colors.blue(`\r  Progress: ${(e.percent * 100).toFixed(1)}%`)));
  creator.on('complete', e => {
    console.log(colors.green(`\n\n✅ Video created!`));
    console.log(colors.white(`📁 Output: ${e.output}`));
    console.log(colors.white(`📊 Total Duration: ~54 seconds`));
  });

  creator.start();
}

console.log(colors.magenta('\n╔═══════════════════════════════════════════════════╗'));
console.log(colors.magenta('║   🎬 Dynamic All Charts Demo - FFCreator 🎬       ║'));
console.log(colors.magenta('╚═══════════════════════════════════════════════════╝'));

createDynamicChartsVideo();

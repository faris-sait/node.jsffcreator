/**
 * 🎬 Faris & Bad Decisions - Dynamic Charts Edition
 * 
 * All 6 chart types with live animated data showing
 * Faris's legendary bad decision-making skills!
 * 
 * Run with: node examples/faris-dynamic-charts.js
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

// Helper functions
const randomData = (count, min, max) => 
  Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);

const randomIncrease = (arr, min, max) => 
  arr.map(v => Math.min(max, v + Math.floor(Math.random() * 20)));

async function createFarisDynamicCharts() {
  console.log(colors.red('\n🎬 Creating: Faris & Bad Decisions - Dynamic Edition\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'faris-dynamic-charts.mp4'),
    width,
    height,
    fps: 30
  });

  // ============================================
  // INTRO SCENE - "Faris is great..."
  // ============================================
  const introScene = new FFScene();
  introScene.setBgColor('#0a0a1a');
  introScene.setDuration(3);

  const intro1 = new FFText({ text: '😊 Faris is great...', x: width / 2, y: height / 2 - 20, fontSize: 52 });
  intro1.setColor('#00ff88');
  intro1.alignCenter();
  intro1.addEffect('fadeInUp', 1, 0);
  introScene.addChild(intro1);

  const intro2 = new FFText({ text: '(or is he?)', x: width / 2, y: height / 2 + 50, fontSize: 24 });
  intro2.setColor('#888888');
  intro2.alignCenter();
  intro2.addEffect('fadeIn', 1, 1);
  introScene.addChild(intro2);

  creator.addChild(introScene);
  console.log(colors.cyan('  ✓ Intro: "Faris is great..."'));

  // ============================================
  // REVEAL SCENE - "...at making BAD DECISIONS!"
  // ============================================
  const revealScene = new FFScene();
  revealScene.setBgColor('#1a0a0a');
  revealScene.setDuration(3);
  revealScene.setTransition('fadeIn', 0.5);

  const reveal1 = new FFText({ text: '...at making', x: width / 2, y: height / 2 - 40, fontSize: 36 });
  reveal1.setColor('#ffffff');
  reveal1.alignCenter();
  reveal1.addEffect('fadeIn', 0.5, 0);
  revealScene.addChild(reveal1);

  const reveal2 = new FFText({ text: '💀 BAD DECISIONS! 💀', x: width / 2, y: height / 2 + 30, fontSize: 48 });
  reveal2.setColor('#ff3333');
  reveal2.alignCenter();
  reveal2.addEffect('zoomIn', 1, 0.5);
  revealScene.addChild(reveal2);

  creator.addChild(revealScene);
  console.log(colors.cyan('  ✓ Reveal: "BAD DECISIONS!"'));

  // ============================================
  // SCENE 1: Dynamic Bar Chart - Bad Decisions by Category
  // ============================================
  const scene1 = new FFScene();
  scene1.setBgColor('#1a1a2e');
  scene1.setDuration(8);
  scene1.setTransition('slideLeft', 0.5);

  const title1 = new FFText({ text: '📊 Faris Bad Decisions by Category', x: width / 2, y: 30, fontSize: 22 });
  title1.setColor('#ff6b6b');
  title1.alignCenter();
  scene1.addChild(title1);

  let barData = [85, 92, 78, 95, 88, 70];
  const barOption = {
    backgroundColor: 'transparent',
    xAxis: {
      type: 'category',
      data: ['Money', 'Dating', 'Career', 'Food', 'Sleep', 'Friends'],
      axisLabel: { color: '#fff', fontSize: 12 },
      axisLine: { lineStyle: { color: '#555' } }
    },
    yAxis: {
      type: 'value',
      max: 120,
      name: 'Bad Decision Score',
      nameTextStyle: { color: '#ff6b6b' },
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [{
      data: barData,
      type: 'bar',
      itemStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color: '#ff6b6b' }, { offset: 1, color: '#8b0000' }]
        }
      },
      label: { show: true, position: 'top', color: '#fff', formatter: '{c}%' }
    }],
    animationDuration: 800,
    animationDurationUpdate: 800,
    animationEasingUpdate: 'elasticOut'
  };

  const chart1 = new FFChart({
    theme: 'dark', option: barOption,
    x: width / 2, y: height / 2 + 25,
    width: width - 100, height: height - 120
  });

  chart1.update(chart => {
    barData = randomIncrease(barData, 60, 110);
    barOption.series[0].data = barData;
    chart.setOption(barOption);
  }, 1000);
  chart1.updateNow();

  scene1.addChild(chart1);
  creator.addChild(scene1);
  console.log(colors.cyan('  ✓ Scene 1: Dynamic Bar Chart'));

  // ============================================
  // SCENE 2: Dynamic Line Chart - Bad Decisions Over Time
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor('#16213e');
  scene2.setDuration(8);
  scene2.setTransition('fadeIn', 0.5);

  const title2 = new FFText({ text: '📈 Faris Bad Decisions Growth (2020-2025)', x: width / 2, y: 30, fontSize: 22 });
  title2.setColor('#ff9f43');
  title2.alignCenter();
  scene2.addChild(title2);

  let lineData1 = [10, 25, 45, 70, 95, 150]; // Bad decisions
  let lineData2 = [100, 90, 75, 60, 40, 20]; // Good decisions
  const lineOption = {
    backgroundColor: 'transparent',
    legend: { data: ['Bad Decisions 📉', 'Good Decisions 📈'], bottom: 5, textStyle: { color: '#fff' } },
    xAxis: {
      type: 'category',
      data: ['2020', '2021', '2022', '2023', '2024', '2025'],
      axisLabel: { color: '#fff' },
      axisLine: { lineStyle: { color: '#555' } }
    },
    yAxis: {
      type: 'value', max: 200,
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [
      {
        name: 'Bad Decisions 📉', type: 'line', smooth: true,
        data: lineData1,
        lineStyle: { width: 4, color: '#ff3333' },
        itemStyle: { color: '#ff3333' },
        symbol: 'circle', symbolSize: 10
      },
      {
        name: 'Good Decisions 📈', type: 'line', smooth: true,
        data: lineData2,
        lineStyle: { width: 4, color: '#00ff88' },
        itemStyle: { color: '#00ff88' },
        symbol: 'circle', symbolSize: 10
      }
    ],
    animationDuration: 800,
    animationDurationUpdate: 800
  };

  const chart2 = new FFChart({
    theme: 'dark', option: lineOption,
    x: width / 2, y: height / 2 + 25,
    width: width - 100, height: height - 120
  });

  chart2.update(chart => {
    // Bad decisions go up, good decisions go down
    lineData1 = lineData1.map(v => Math.min(190, v + Math.floor(Math.random() * 15)));
    lineData2 = lineData2.map(v => Math.max(5, v - Math.floor(Math.random() * 10)));
    lineOption.series[0].data = lineData1;
    lineOption.series[1].data = lineData2;
    chart.setOption(lineOption);
  }, 1000);
  chart2.updateNow();

  scene2.addChild(chart2);
  creator.addChild(scene2);
  console.log(colors.cyan('  ✓ Scene 2: Dynamic Line Chart'));

  // ============================================
  // SCENE 3: Dynamic Pie Chart - Decision Distribution
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor('#0f3460');
  scene3.setDuration(8);
  scene3.setTransition('slideUp', 0.5);

  const title3 = new FFText({ text: '🥧 How Faris Makes Decisions', x: width / 2, y: 30, fontSize: 22 });
  title3.setColor('#ffd93d');
  title3.alignCenter();
  scene3.addChild(title3);

  let pieData = [
    { value: 45, name: '🎲 Random Guess', itemStyle: { color: '#ff6b6b' } },
    { value: 25, name: '🍕 Based on Food', itemStyle: { color: '#ffd93d' } },
    { value: 15, name: '😴 Half Asleep', itemStyle: { color: '#9b59b6' } },
    { value: 10, name: '🎮 Gaming Logic', itemStyle: { color: '#3498db' } },
    { value: 5, name: '🧠 Actual Thinking', itemStyle: { color: '#00ff88' } }
  ];
  const pieOption = {
    backgroundColor: 'transparent',
    legend: { orient: 'horizontal', bottom: 5, textStyle: { color: '#fff', fontSize: 11 } },
    series: [{
      type: 'pie',
      radius: ['25%', '55%'],
      center: ['50%', '52%'],
      itemStyle: { borderRadius: 8, borderColor: '#0f3460', borderWidth: 2 },
      label: { show: true, color: '#fff', formatter: '{d}%', fontSize: 14 },
      data: pieData
    }],
    animationDuration: 800,
    animationDurationUpdate: 800
  };

  const chart3 = new FFChart({
    theme: 'dark', option: pieOption,
    x: width / 2, y: height / 2 + 25,
    width: width - 60, height: height - 100
  });

  chart3.update(chart => {
    // "Actual Thinking" keeps getting smaller
    const vals = [
      Math.min(55, pieData[0].value + Math.floor(Math.random() * 5)),
      Math.min(35, pieData[1].value + Math.floor(Math.random() * 3)),
      Math.min(25, pieData[2].value + Math.floor(Math.random() * 3)),
      Math.min(20, pieData[3].value + Math.floor(Math.random() * 2)),
      Math.max(1, pieData[4].value - Math.floor(Math.random() * 2))
    ];
    pieData.forEach((item, i) => item.value = vals[i]);
    pieOption.series[0].data = pieData;
    chart.setOption(pieOption);
  }, 1200);
  chart3.updateNow();

  scene3.addChild(chart3);
  creator.addChild(scene3);
  console.log(colors.cyan('  ✓ Scene 3: Dynamic Pie Chart'));

  // ============================================
  // SCENE 4: Dynamic Area Chart - Regret Levels
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor('#1a1a2e');
  scene4.setDuration(8);
  scene4.setTransition('fadeIn', 0.5);

  const title4 = new FFText({ text: '📉 Faris Regret Levels Throughout the Day', x: width / 2, y: 30, fontSize: 22 });
  title4.setColor('#e056fd');
  title4.alignCenter();
  scene4.addChild(title4);

  let areaData1 = [20, 35, 50, 80, 95, 110, 130]; // Regret
  let areaData2 = [10, 25, 40, 60, 75, 85, 90];   // Denial
  let areaData3 = [5, 10, 15, 20, 25, 30, 35];    // Acceptance
  const areaOption = {
    backgroundColor: 'transparent',
    legend: { data: ['😱 Regret', '🙈 Denial', '😌 Acceptance'], bottom: 5, textStyle: { color: '#fff' } },
    xAxis: {
      type: 'category', boundaryGap: false,
      data: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM', '12AM'],
      axisLabel: { color: '#fff' },
      axisLine: { lineStyle: { color: '#555' } }
    },
    yAxis: {
      type: 'value', max: 200,
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [
      { name: '😱 Regret', type: 'line', stack: 'Total', areaStyle: { opacity: 0.7, color: '#ff6b6b' }, lineStyle: { color: '#ff6b6b' }, data: areaData1 },
      { name: '🙈 Denial', type: 'line', stack: 'Total', areaStyle: { opacity: 0.7, color: '#ffd93d' }, lineStyle: { color: '#ffd93d' }, data: areaData2 },
      { name: '😌 Acceptance', type: 'line', stack: 'Total', areaStyle: { opacity: 0.7, color: '#00ff88' }, lineStyle: { color: '#00ff88' }, data: areaData3 }
    ],
    animationDuration: 800,
    animationDurationUpdate: 800
  };

  const chart4 = new FFChart({
    theme: 'dark', option: areaOption,
    x: width / 2, y: height / 2 + 25,
    width: width - 100, height: height - 120
  });

  chart4.update(chart => {
    areaData1 = randomData(7, 60, 140);
    areaData2 = randomData(7, 40, 100);
    areaData3 = randomData(7, 10, 50);
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
  // SCENE 5: Dynamic Radar Chart - Faris Skills
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor('#16213e');
  scene5.setDuration(8);
  scene5.setTransition('slideLeft', 0.5);

  const title5 = new FFText({ text: '🎯 Faris Skill Assessment', x: width / 2, y: 30, fontSize: 22 });
  title5.setColor('#00d4ff');
  title5.alignCenter();
  scene5.addChild(title5);

  let radarData1 = [95, 90, 88, 92, 85, 98]; // Bad Decision Skills
  let radarData2 = [15, 20, 25, 10, 18, 5];  // Good Decision Skills
  const radarOption = {
    backgroundColor: 'transparent',
    legend: { data: ['💀 Bad Decision Skills', '✨ Good Decision Skills'], bottom: 5, textStyle: { color: '#fff' } },
    radar: {
      indicator: [
        { name: 'Impulse', max: 100 },
        { name: 'YOLO', max: 100 },
        { name: 'Procrastination', max: 100 },
        { name: 'Overthinking', max: 100 },
        { name: 'Food Cravings', max: 100 },
        { name: 'Sleep Deprivation', max: 100 }
      ],
      axisName: { color: '#fff', fontSize: 11 },
      splitArea: { areaStyle: { color: ['#333', '#222'] } }
    },
    series: [{
      type: 'radar',
      data: [
        { value: radarData1, name: '💀 Bad Decision Skills', areaStyle: { opacity: 0.5, color: '#ff3333' }, lineStyle: { color: '#ff3333', width: 2 }, itemStyle: { color: '#ff3333' } },
        { value: radarData2, name: '✨ Good Decision Skills', areaStyle: { opacity: 0.5, color: '#00ff88' }, lineStyle: { color: '#00ff88', width: 2 }, itemStyle: { color: '#00ff88' } }
      ]
    }],
    animationDuration: 800,
    animationDurationUpdate: 800
  };

  const chart5 = new FFChart({
    theme: 'dark', option: radarOption,
    x: width / 2, y: height / 2 + 25,
    width: width - 80, height: height - 100
  });

  chart5.update(chart => {
    radarData1 = randomData(6, 80, 100); // Always high
    radarData2 = randomData(6, 5, 25);   // Always low
    radarOption.series[0].data[0].value = radarData1;
    radarOption.series[0].data[1].value = radarData2;
    chart.setOption(radarOption);
  }, 1200);
  chart5.updateNow();

  scene5.addChild(chart5);
  creator.addChild(scene5);
  console.log(colors.cyan('  ✓ Scene 5: Dynamic Radar Chart'));

  // ============================================
  // SCENE 6: Dynamic Scatter - Bad Decisions vs Consequences
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor('#0f3460');
  scene6.setDuration(8);
  scene6.setTransition('fadeIn', 0.5);

  const title6 = new FFText({ text: '⚬ Bad Decisions vs Consequences Matrix', x: width / 2, y: 30, fontSize: 22 });
  title6.setColor('#ff9f43');
  title6.alignCenter();
  scene6.addChild(title6);

  const generateScatter = (count, xRange, yRange) => 
    Array.from({ length: count }, () => [
      Math.floor(Math.random() * (xRange[1] - xRange[0]) + xRange[0]),
      Math.floor(Math.random() * (yRange[1] - yRange[0]) + yRange[0])
    ]);

  let scatterData1 = generateScatter(12, [60, 100], [60, 100]); // High bad, high consequence
  let scatterData2 = generateScatter(5, [10, 40], [10, 40]);    // Low bad, low consequence
  let scatterData3 = generateScatter(8, [50, 90], [20, 50]);    // Got lucky

  const scatterOption = {
    backgroundColor: 'transparent',
    legend: { data: ['💥 Disasters', '✅ Rare Wins', '🍀 Got Lucky'], bottom: 5, textStyle: { color: '#fff' } },
    xAxis: {
      type: 'value', max: 100, name: 'Bad Decision Level →',
      nameLocation: 'middle', nameGap: 25, nameTextStyle: { color: '#ff6b6b' },
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    yAxis: {
      type: 'value', max: 100, name: '↑ Consequence Severity',
      nameLocation: 'middle', nameGap: 35, nameTextStyle: { color: '#ff6b6b' },
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [
      { name: '💥 Disasters', type: 'scatter', symbolSize: 18, data: scatterData1, itemStyle: { color: '#ff3333' } },
      { name: '✅ Rare Wins', type: 'scatter', symbolSize: 18, data: scatterData2, itemStyle: { color: '#00ff88' } },
      { name: '🍀 Got Lucky', type: 'scatter', symbolSize: 18, data: scatterData3, itemStyle: { color: '#ffd93d' } }
    ],
    animationDuration: 800,
    animationDurationUpdate: 800
  };

  const chart6 = new FFChart({
    theme: 'dark', option: scatterOption,
    x: width / 2, y: height / 2 + 25,
    width: width - 100, height: height - 120
  });

  chart6.update(chart => {
    scatterData1 = generateScatter(12, [55, 100], [55, 100]);
    scatterData2 = generateScatter(5, [5, 35], [5, 35]);
    scatterData3 = generateScatter(8, [45, 95], [15, 55]);
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
  outroScene.setDuration(4);
  outroScene.setTransition('fadeIn', 0.5);

  const outro1 = new FFText({ text: '🏆 Conclusion:', x: width / 2, y: height / 2 - 60, fontSize: 32 });
  outro1.setColor('#ffd93d');
  outro1.alignCenter();
  outro1.addEffect('fadeIn', 0.5, 0);
  outroScene.addChild(outro1);

  const outro2 = new FFText({ text: 'Faris is consistently GREAT', x: width / 2, y: height / 2, fontSize: 28 });
  outro2.setColor('#ffffff');
  outro2.alignCenter();
  outro2.addEffect('fadeIn', 0.5, 0.5);
  outroScene.addChild(outro2);

  const outro3 = new FFText({ text: 'at making BAD DECISIONS! 💀', x: width / 2, y: height / 2 + 50, fontSize: 36 });
  outro3.setColor('#ff3333');
  outro3.alignCenter();
  outro3.addEffect('zoomIn', 1, 1);
  outroScene.addChild(outro3);

  const outro4 = new FFText({ text: '(The data doesn\'t lie)', x: width / 2, y: height / 2 + 110, fontSize: 18 });
  outro4.setColor('#888888');
  outro4.alignCenter();
  outro4.addEffect('fadeIn', 0.5, 2);
  outroScene.addChild(outro4);

  creator.addChild(outroScene);
  console.log(colors.cyan('  ✓ Outro Scene'));

  // Event handlers
  creator.on('start', () => console.log(colors.yellow('\n📹 Rendering Faris\'s Bad Decisions...')));
  creator.on('error', e => console.log(colors.red(`❌ Error: ${e.message || e}`)));
  creator.on('progress', e => process.stdout.write(colors.blue(`\r  Progress: ${(e.percent * 100).toFixed(1)}%`)));
  creator.on('complete', e => {
    console.log(colors.green(`\n\n✅ Video created!`));
    console.log(colors.white(`📁 Output: ${e.output}`));
    console.log(colors.red(`💀 Total Bad Decisions Visualized: ∞`));
  });

  creator.start();
}

console.log(colors.red('\n╔═══════════════════════════════════════════════════════════╗'));
console.log(colors.red('║  💀 FARIS & BAD DECISIONS - Dynamic Charts Edition 💀     ║'));
console.log(colors.red('╚═══════════════════════════════════════════════════════════╝'));

createFarisDynamicCharts();

/**
 * FFCreator Chart Visualization Test Demo (Server-Side Compatible)
 * 
 * This file demonstrates 6 different chart types using FFChart component:
 * 1. Bar Chart - Basic vertical bar chart
 * 2. Line Chart - Multi-series line chart  
 * 3. Pie Chart - Doughnut pie chart
 * 4. Area Chart - Stacked area chart
 * 5. Radar Chart - Multi-dimensional radar
 * 6. Dynamic Chart - Animated bar chart with live updates
 * 
 * Run with: 
 *   node examples/chart-simple-demo.js all      - All charts
 *   node examples/chart-simple-demo.js dynamic  - Dynamic animated chart
 *   node examples/chart-simple-demo.js 1-6      - Individual chart
 */

// Mock browser environment for echarts before loading anything
const inkpaint = require('inkpaint');
const originalCreateCanvas = inkpaint.createCanvas;

// Patch createCanvas to add DOM methods
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
    const el = {
      style: {},
      setAttribute: () => {},
      getAttribute: () => null,
      appendChild: () => {},
      removeChild: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      innerHTML: '',
      innerText: ''
    };
    return el;
  },
  createElementNS: () => ({
    style: {},
    setAttribute: () => {},
    getAttribute: () => null,
    appendChild: () => {},
    removeChild: () => {},
    addEventListener: () => {},
    removeEventListener: () => {}
  }),
  documentElement: {
    style: { WebkitTransition: '', MozTransition: '', transition: '' }
  },
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

// Output and cache directories
const outputDir = path.join(__dirname, './output/');
const cacheDir = path.join(__dirname, './cache/');

// Video dimensions
const width = 800;
const height = 600;

// ============================================
// CHART 1: Bar Chart
// ============================================
const barChartOption = {
  backgroundColor: 'transparent',
  title: {
    text: 'Weekly Sales Report',
    left: 'center',
    textStyle: { color: '#fff', fontSize: 22 }
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLabel: { color: '#fff', fontSize: 14 },
    axisLine: { lineStyle: { color: '#555' } }
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#fff', fontSize: 14 },
    splitLine: { lineStyle: { color: '#333' } }
  },
  series: [{
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'bar',
    itemStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: '#83bff6' },
          { offset: 1, color: '#188df0' }
        ]
      }
    },
    barWidth: '50%'
  }],
  animationDuration: 1500,
  animationEasing: 'elasticOut'
};

// ============================================
// CHART 2: Line Chart
// ============================================
const lineChartOption = {
  backgroundColor: 'transparent',
  title: {
    text: 'Monthly Revenue Trends',
    left: 'center',
    textStyle: { color: '#fff', fontSize: 22 }
  },
  legend: {
    data: ['Product A', 'Product B', 'Product C'],
    bottom: 10,
    textStyle: { color: '#fff' }
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    axisLabel: { color: '#fff' },
    axisLine: { lineStyle: { color: '#555' } }
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#fff' },
    splitLine: { lineStyle: { color: '#333' } }
  },
  series: [
    {
      name: 'Product A',
      type: 'line',
      smooth: true,
      data: [150, 230, 224, 218, 335, 447],
      lineStyle: { width: 3, color: '#5470C6' },
      itemStyle: { color: '#5470C6' }
    },
    {
      name: 'Product B',
      type: 'line',
      smooth: true,
      data: [50, 130, 184, 290, 390, 310],
      lineStyle: { width: 3, color: '#91CC75' },
      itemStyle: { color: '#91CC75' }
    },
    {
      name: 'Product C',
      type: 'line',
      smooth: true,
      data: [80, 90, 120, 160, 200, 280],
      lineStyle: { width: 3, color: '#FAC858' },
      itemStyle: { color: '#FAC858' }
    }
  ],
  animationDuration: 2000
};

// ============================================
// CHART 3: Pie Chart
// ============================================
const pieChartOption = {
  backgroundColor: 'transparent',
  title: {
    text: 'Market Share Distribution',
    left: 'center',
    textStyle: { color: '#fff', fontSize: 22 }
  },
  legend: {
    orient: 'horizontal',
    bottom: 10,
    textStyle: { color: '#fff' }
  },
  series: [{
    name: 'Share',
    type: 'pie',
    radius: ['35%', '65%'],
    center: ['50%', '55%'],
    itemStyle: {
      borderRadius: 8,
      borderColor: '#1a1a2e',
      borderWidth: 2
    },
    label: {
      show: true,
      color: '#fff',
      formatter: '{b}: {d}%'
    },
    data: [
      { value: 1048, name: 'Chrome', itemStyle: { color: '#4285F4' } },
      { value: 735, name: 'Safari', itemStyle: { color: '#34A853' } },
      { value: 580, name: 'Firefox', itemStyle: { color: '#FF7139' } },
      { value: 484, name: 'Edge', itemStyle: { color: '#0078D4' } },
      { value: 300, name: 'Others', itemStyle: { color: '#9E9E9E' } }
    ]
  }],
  animationType: 'scale',
  animationDuration: 1500
};

// ============================================
// CHART 4: Area Chart
// ============================================
const areaChartOption = {
  backgroundColor: 'transparent',
  title: {
    text: 'Website Traffic Analysis',
    left: 'center',
    textStyle: { color: '#fff', fontSize: 22 }
  },
  legend: {
    data: ['Mobile', 'Desktop', 'Tablet'],
    bottom: 10,
    textStyle: { color: '#fff' }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLabel: { color: '#fff' },
    axisLine: { lineStyle: { color: '#555' } }
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#fff' },
    splitLine: { lineStyle: { color: '#333' } }
  },
  series: [
    {
      name: 'Mobile',
      type: 'line',
      stack: 'Total',
      areaStyle: { opacity: 0.7, color: '#5470C6' },
      lineStyle: { color: '#5470C6' },
      itemStyle: { color: '#5470C6' },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Desktop',
      type: 'line',
      stack: 'Total',
      areaStyle: { opacity: 0.7, color: '#91CC75' },
      lineStyle: { color: '#91CC75' },
      itemStyle: { color: '#91CC75' },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Tablet',
      type: 'line',
      stack: 'Total',
      areaStyle: { opacity: 0.7, color: '#FAC858' },
      lineStyle: { color: '#FAC858' },
      itemStyle: { color: '#FAC858' },
      data: [150, 232, 201, 154, 190, 330, 410]
    }
  ],
  animationDuration: 2000
};

// ============================================
// CHART 5: Radar Chart
// ============================================
const radarChartOption = {
  backgroundColor: 'transparent',
  title: {
    text: 'Product Comparison',
    left: 'center',
    textStyle: { color: '#fff', fontSize: 22 }
  },
  legend: {
    data: ['Product A', 'Product B'],
    bottom: 10,
    textStyle: { color: '#fff' }
  },
  radar: {
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Admin', max: 16000 },
      { name: 'Tech', max: 30000 },
      { name: 'Support', max: 38000 },
      { name: 'Dev', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ],
    axisName: { color: '#fff' },
    splitArea: { areaStyle: { color: ['#333', '#222'] } }
  },
  series: [{
    name: 'Comparison',
    type: 'radar',
    data: [
      {
        value: [4200, 12000, 20000, 35000, 50000, 18000],
        name: 'Product A',
        areaStyle: { opacity: 0.3, color: '#5470C6' },
        lineStyle: { color: '#5470C6' },
        itemStyle: { color: '#5470C6' }
      },
      {
        value: [5000, 14000, 28000, 26000, 42000, 21000],
        name: 'Product B',
        areaStyle: { opacity: 0.3, color: '#91CC75' },
        lineStyle: { color: '#91CC75' },
        itemStyle: { color: '#91CC75' }
      }
    ]
  }],
  animationDuration: 1500
};

// ============================================
// CHART 6: Scatter Chart
// ============================================
const scatterChartOption = {
  backgroundColor: 'transparent',
  title: {
    text: 'Performance Analysis',
    left: 'center',
    textStyle: { color: '#fff', fontSize: 22 }
  },
  legend: {
    data: ['Tech', 'Finance', 'Retail'],
    bottom: 10,
    textStyle: { color: '#fff' }
  },
  xAxis: {
    name: 'Revenue ($M)',
    nameTextStyle: { color: '#fff' },
    axisLabel: { color: '#fff' },
    splitLine: { lineStyle: { type: 'dashed', color: '#333' } }
  },
  yAxis: {
    name: 'Profit ($M)',
    nameTextStyle: { color: '#fff' },
    axisLabel: { color: '#fff' },
    splitLine: { lineStyle: { type: 'dashed', color: '#333' } }
  },
  series: [
    {
      name: 'Tech',
      type: 'scatter',
      symbolSize: 20,
      data: [[100, 40], [150, 60], [200, 90], [80, 25]],
      itemStyle: { color: '#5470C6' }
    },
    {
      name: 'Finance',
      type: 'scatter',
      symbolSize: 20,
      data: [[120, 50], [180, 75], [90, 30]],
      itemStyle: { color: '#91CC75' }
    },
    {
      name: 'Retail',
      type: 'scatter',
      symbolSize: 20,
      data: [[60, 15], [110, 35], [140, 45]],
      itemStyle: { color: '#FAC858' }
    }
  ],
  animationDuration: 1500
};

// All chart configurations
const charts = [
  { name: 'Bar Chart', option: barChartOption, bgColor: '#1a1a2e' },
  { name: 'Line Chart', option: lineChartOption, bgColor: '#16213e' },
  { name: 'Pie Chart', option: pieChartOption, bgColor: '#0f3460' },
  { name: 'Area Chart', option: areaChartOption, bgColor: '#1a1a2e' },
  { name: 'Radar Chart', option: radarChartOption, bgColor: '#16213e' },
  { name: 'Scatter Chart', option: scatterChartOption, bgColor: '#0f3460' }
];

// ============================================
// Create Video with All Charts
// ============================================
async function createAllChartsVideo() {
  console.log(colors.green('\n🎬 Creating video with ALL 6 charts...\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    width,
    height,
    fps: 30
  });

  charts.forEach((chartConfig, index) => {
    const scene = new FFScene();
    scene.setBgColor(chartConfig.bgColor);
    scene.setDuration(5);
    if (index > 0) scene.setTransition('fadeIn', 0.5);

    const title = new FFText({
      text: `Demo ${index + 1}: ${chartConfig.name}`,
      x: width / 2, y: 30, fontSize: 20
    });
    title.setColor('#ffffff');
    title.alignCenter();
    title.addEffect('fadeInDown', 0.8, 0);
    scene.addChild(title);

    const chart = new FFChart({
      theme: 'dark',
      option: chartConfig.option,
      x: width / 2, y: height / 2 + 20,
      width: width - 100, height: height - 140
    });
    chart.addEffect('fadeIn', 1, 0.3);
    scene.addChild(chart);

    creator.addChild(scene);
    console.log(colors.cyan(`  ✓ Added: ${chartConfig.name}`));
  });

  setupEvents(creator);
  creator.start();
}

// ============================================
// Create Dynamic Animated Chart
// ============================================
async function createDynamicChart() {
  console.log(colors.green('\n🎬 Creating DYNAMIC animated bar chart...\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'dynamic-chart.mp4'),
    width, height, fps: 30
  });

  const scene = new FFScene();
  scene.setBgColor('#1a1a2e');
  scene.setDuration(10);

  let currentData = [120, 200, 150, 80, 70, 110, 130];
  const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const dynamicOption = {
    backgroundColor: 'transparent',
    title: {
      text: 'Live Sales Dashboard',
      left: 'center',
      textStyle: { color: '#fff', fontSize: 24 }
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: { color: '#fff' },
      axisLine: { lineStyle: { color: '#555' } }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff' },
      max: 350,
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [{
      data: currentData,
      type: 'bar',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#00d2ff' },
            { offset: 1, color: '#3a7bd5' }
          ]
        }
      }
    }],
    animationDuration: 800,
    animationDurationUpdate: 800,
    animationEasing: 'elasticOut',
    animationEasingUpdate: 'elasticOut'
  };

  const chart = new FFChart({
    theme: 'dark',
    option: dynamicOption,
    x: width / 2, y: height / 2 + 20,
    width: width - 80, height: height - 120
  });

  // Dynamic update every second
  chart.update(chartInstance => {
    currentData = currentData.map(() => Math.floor(Math.random() * 250) + 50);
    dynamicOption.series[0].data = currentData;
    chartInstance.setOption(dynamicOption);
  }, 1000);
  
  chart.updateNow();
  scene.addChild(chart);
  creator.addChild(scene);

  setupEvents(creator);
  creator.start();
}

// ============================================
// Create Single Chart Video
// ============================================
async function createSingleChart(index) {
  if (index < 0 || index >= charts.length) {
    console.log(colors.red(`Invalid index. Use 1-${charts.length}`));
    return;
  }

  const chartConfig = charts[index];
  console.log(colors.green(`\n🎬 Creating ${chartConfig.name} video...\n`));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, `chart-${index + 1}-${chartConfig.name.toLowerCase().replace(' ', '-')}.mp4`),
    width, height, fps: 30
  });

  const scene = new FFScene();
  scene.setBgColor(chartConfig.bgColor);
  scene.setDuration(6);

  const title = new FFText({
    text: chartConfig.name,
    x: width / 2, y: 35, fontSize: 28
  });
  title.setColor('#ffffff');
  title.alignCenter();
  title.addEffect('fadeInDown', 0.8, 0);
  scene.addChild(title);

  const chart = new FFChart({
    theme: 'dark',
    option: chartConfig.option,
    x: width / 2, y: height / 2 + 20,
    width: width - 80, height: height - 100
  });
  chart.addEffect('zoomIn', 1.2, 0.3);
  scene.addChild(chart);

  creator.addChild(scene);
  setupEvents(creator);
  creator.start();
}

// Event handlers
function setupEvents(creator) {
  creator.on('start', () => console.log(colors.yellow('\n📹 Rendering...')));
  creator.on('error', e => console.log(colors.red(`❌ Error: ${e.message || e}`)));
  creator.on('progress', e => process.stdout.write(colors.blue(`\r  Progress: ${(e.percent * 100).toFixed(1)}%`)));
  creator.on('complete', e => {
    console.log(colors.green(`\n\n✅ Video created!`));
    console.log(colors.white(`📁 Output: ${e.output}`));
  });
}

// ============================================
// Main Entry Point
// ============================================
const args = process.argv.slice(2);
const command = args[0] || 'all';

console.log(colors.magenta('\n╔════════════════════════════════════════════╗'));
console.log(colors.magenta('║   FFCreator Chart Visualization Test       ║'));
console.log(colors.magenta('╚════════════════════════════════════════════╝'));

switch (command) {
  case 'all':
    createAllChartsVideo();
    break;
  case 'dynamic':
    createDynamicChart();
    break;
  case '1': case '2': case '3': case '4': case '5': case '6':
    createSingleChart(parseInt(command) - 1);
    break;
  default:
    console.log(colors.yellow('\nUsage:'));
    console.log(colors.white('  node chart-simple-demo.js all      - All 6 charts'));
    console.log(colors.white('  node chart-simple-demo.js dynamic  - Dynamic animated chart'));
    console.log(colors.white('  node chart-simple-demo.js 1        - Bar Chart'));
    console.log(colors.white('  node chart-simple-demo.js 2        - Line Chart'));
    console.log(colors.white('  node chart-simple-demo.js 3        - Pie Chart'));
    console.log(colors.white('  node chart-simple-demo.js 4        - Area Chart'));
    console.log(colors.white('  node chart-simple-demo.js 5        - Radar Chart'));
    console.log(colors.white('  node chart-simple-demo.js 6        - Scatter Chart\n'));
}

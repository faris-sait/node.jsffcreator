/**
 * 🤖 AI Concepts YouTube Shorts Video
 * 
 * A 60-second engaging vertical video explaining latest AI concepts
 * Optimized for YouTube Shorts (9:16 aspect ratio)
 * 
 * Run with: node examples/ai-shorts-video.js
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
const { FFText, FFRect, FFScene, FFCreator, FFChart } = require('../');

FFCreator.setFFmpegPath(ffmpegPath);
FFCreator.setFFprobePath(ffprobePath);

const outputDir = path.join(__dirname, './output/');
const cacheDir = path.join(__dirname, './cache/');

// YouTube Shorts dimensions (9:16 vertical)
const width = 1080;
const height = 1920;

async function createAIShortsVideo() {
  console.log(colors.magenta('\n🎬 Creating AI Concepts YouTube Shorts Video...\n'));
  console.log(colors.cyan('📐 Resolution: 1080x1920 (9:16 Vertical)'));
  console.log(colors.cyan('⏱️  Duration: ~60 seconds\n'));

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    output: path.join(outputDir, 'ai-concepts-shorts.mp4'),
    width,
    height,
    fps: 30
  });

  // ============================================
  // SCENE 1: HOOK - Attention Grabber (5s)
  // ============================================
  const hookScene = new FFScene();
  hookScene.setBgColor('#0a0a0f');
  hookScene.setDuration(5);

  // Animated background rectangle
  const bgRect1 = new FFRect({ color: '#1a1a2e', width: 1200, height: 2000, x: width/2, y: height/2 });
  bgRect1.addEffect('fadeIn', 0.5, 0);
  hookScene.addChild(bgRect1);

  // Glowing accent
  const accentRect = new FFRect({ color: '#6c5ce7', width: 400, height: 8, x: width/2, y: 400 });
  accentRect.addEffect('zoomIn', 0.8, 0.3);
  hookScene.addChild(accentRect);

  // Hook text
  const hookText1 = new FFText({ text: '🤖 AI in 2025', x: width/2, y: 500, fontSize: 90 });
  hookText1.setColor('#ffffff');
  hookText1.alignCenter();
  hookText1.addEffect('bounceIn', 1, 0.2);
  hookScene.addChild(hookText1);

  const hookText2 = new FFText({ text: 'Changed EVERYTHING', x: width/2, y: 620, fontSize: 65 });
  hookText2.setColor('#fd79a8');
  hookText2.alignCenter();
  hookText2.addEffect('backInUp', 0.8, 0.6);
  hookScene.addChild(hookText2);

  const hookText3 = new FFText({ text: '5 Concepts You MUST Know', x: width/2, y: 750, fontSize: 48 });
  hookText3.setColor('#74b9ff');
  hookText3.alignCenter();
  hookText3.addEffect('fadeInUp', 0.8, 1);
  hookScene.addChild(hookText3);

  // Decorative elements
  const emoji1 = new FFText({ text: '⚡', x: 200, y: 900, fontSize: 80 });
  emoji1.addEffect('rotateIn', 0.6, 1.5);
  hookScene.addChild(emoji1);

  const emoji2 = new FFText({ text: '🧠', x: width - 200, y: 900, fontSize: 80 });
  emoji2.addEffect('rotateIn', 0.6, 1.7);
  hookScene.addChild(emoji2);

  const swipeText = new FFText({ text: '👆 Watch till end!', x: width/2, y: 1600, fontSize: 36 });
  swipeText.setColor('#a29bfe');
  swipeText.alignCenter();
  swipeText.addEffect('fadeIn', 0.5, 2);
  hookScene.addChild(swipeText);

  creator.addChild(hookScene);
  console.log(colors.green('  ✓ Scene 1: Hook (5s)'));

  // ============================================
  // SCENE 2: Concept 1 - Large Language Models (10s)
  // ============================================
  const scene2 = new FFScene();
  scene2.setBgColor('#1e3a5f');
  scene2.setDuration(10);
  scene2.setTransition('circlecrop', 0.8);

  // Number badge
  const badge1 = new FFRect({ color: '#e74c3c', width: 120, height: 120, x: 150, y: 200 });
  badge1.addEffect('bounceIn', 0.6, 0);
  scene2.addChild(badge1);

  const numText1 = new FFText({ text: '1', x: 150, y: 200, fontSize: 72 });
  numText1.setColor('#ffffff');
  numText1.alignCenter();
  numText1.addEffect('zoomIn', 0.5, 0.2);
  scene2.addChild(numText1);

  const title2 = new FFText({ text: '🗣️ Large Language', x: width/2, y: 320, fontSize: 68 });
  title2.setColor('#ffffff');
  title2.alignCenter();
  title2.addEffect('backInRight', 0.8, 0.3);
  scene2.addChild(title2);

  const title2b = new FFText({ text: 'Models (LLMs)', x: width/2, y: 400, fontSize: 68 });
  title2b.setColor('#00cec9');
  title2b.alignCenter();
  title2b.addEffect('backInLeft', 0.8, 0.5);
  scene2.addChild(title2b);

  // Latest 2025 Models showcase
  const latestLabel = new FFText({ text: '🔥 Latest 2025 Models:', x: width/2, y: 520, fontSize: 40 });
  latestLabel.setColor('#fdcb6e');
  latestLabel.alignCenter();
  latestLabel.addEffect('fadeIn', 0.5, 0.8);
  scene2.addChild(latestLabel);

  // Model boxes - Row 1
  const modelBox1 = new FFRect({ color: '#10ac84', width: 240, height: 90, x: 280, y: 620 });
  modelBox1.addEffect('fadeInLeft', 0.4, 1);
  scene2.addChild(modelBox1);
  const modelText1 = new FFText({ text: 'GPT-4o', x: 280, y: 620, fontSize: 32 });
  modelText1.setColor('#fff');
  modelText1.alignCenter();
  modelText1.addEffect('fadeIn', 0.3, 1.2);
  scene2.addChild(modelText1);

  const modelBox2 = new FFRect({ color: '#6c5ce7', width: 240, height: 90, x: 540, y: 620 });
  modelBox2.addEffect('fadeInUp', 0.4, 1.2);
  scene2.addChild(modelBox2);
  const modelText2 = new FFText({ text: 'Claude 3.5', x: 540, y: 620, fontSize: 32 });
  modelText2.setColor('#fff');
  modelText2.alignCenter();
  modelText2.addEffect('fadeIn', 0.3, 1.4);
  scene2.addChild(modelText2);

  const modelBox3 = new FFRect({ color: '#0984e3', width: 240, height: 90, x: 800, y: 620 });
  modelBox3.addEffect('fadeInRight', 0.4, 1.4);
  scene2.addChild(modelBox3);
  const modelText3 = new FFText({ text: 'Gemini 3', x: 800, y: 620, fontSize: 32 });
  modelText3.setColor('#fff');
  modelText3.alignCenter();
  modelText3.addEffect('fadeIn', 0.3, 1.6);
  scene2.addChild(modelText3);

  // Model boxes - Row 2
  const modelBox4 = new FFRect({ color: '#e17055', width: 240, height: 90, x: 400, y: 730 });
  modelBox4.addEffect('fadeInLeft', 0.4, 1.6);
  scene2.addChild(modelBox4);
  const modelText4 = new FFText({ text: 'Llama 3.2', x: 400, y: 730, fontSize: 32 });
  modelText4.setColor('#fff');
  modelText4.alignCenter();
  modelText4.addEffect('fadeIn', 0.3, 1.8);
  scene2.addChild(modelText4);

  const modelBox5 = new FFRect({ color: '#00b894', width: 240, height: 90, x: 680, y: 730 });
  modelBox5.addEffect('fadeInRight', 0.4, 1.8);
  scene2.addChild(modelBox5);
  const modelText5 = new FFText({ text: 'Mistral', x: 680, y: 730, fontSize: 32 });
  modelText5.setColor('#fff');
  modelText5.alignCenter();
  modelText5.addEffect('fadeIn', 0.3, 2);
  scene2.addChild(modelText5);

  // Visual chart comparing model capabilities
  const llmChartOption = {
    backgroundColor: 'transparent',
    title: { text: '2025 Model Benchmark Scores', left: 'center', textStyle: { color: '#fff', fontSize: 22 }, top: 5 },
    legend: { data: ['Reasoning', 'Coding', 'Math'], textStyle: { color: '#fff', fontSize: 12 }, top: 35 },
    xAxis: {
      type: 'category',
      data: ['GPT-4o', 'Claude 3.5', 'Gemini 3', 'Llama 3.2'],
      axisLabel: { color: '#fff', fontSize: 14, rotate: 0 }
    },
    yAxis: { type: 'value', max: 100, axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#334' } } },
    series: [
      { name: 'Reasoning', type: 'bar', data: [92, 94, 96, 85], itemStyle: { color: '#00cec9' }, barGap: '10%' },
      { name: 'Coding', type: 'bar', data: [88, 92, 90, 82], itemStyle: { color: '#6c5ce7' } },
      { name: 'Math', type: 'bar', data: [85, 88, 95, 78], itemStyle: { color: '#fdcb6e' } }
    ],
    animationDuration: 2500
  };

  const chart1 = new FFChart({ theme: 'dark', option: llmChartOption, x: width/2, y: 1120, width: 950, height: 480 });
  scene2.addChild(chart1);

  const funFact1 = new FFText({ text: '💡 Gemini 3 scores 95%+ on AIME 2025!', x: width/2, y: 1500, fontSize: 36 });
  funFact1.setColor('#ffeaa7');
  funFact1.alignCenter();
  funFact1.addEffect('bounceIn', 0.8, 4);
  scene2.addChild(funFact1);

  const funFact1b = new FFText({ text: '🏆 Claude leads in coding benchmarks!', x: width/2, y: 1580, fontSize: 34 });
  funFact1b.setColor('#74b9ff');
  funFact1b.alignCenter();
  funFact1b.addEffect('fadeInUp', 0.6, 5);
  scene2.addChild(funFact1b);

  creator.addChild(scene2);
  console.log(colors.green('  ✓ Scene 2: LLMs Concept (10s)'));

  // ============================================
  // SCENE 3: Concept 2 - AI Agents (10s)
  // ============================================
  const scene3 = new FFScene();
  scene3.setBgColor('#2d1b4e');
  scene3.setDuration(10);
  scene3.setTransition('moveleft', 0.8);

  // Number badge
  const badge2 = new FFRect({ color: '#9b59b6', width: 120, height: 120, x: 150, y: 200 });
  badge2.addEffect('bounceIn', 0.6, 0);
  scene3.addChild(badge2);

  const numText2 = new FFText({ text: '2', x: 150, y: 200, fontSize: 72 });
  numText2.setColor('#ffffff');
  numText2.alignCenter();
  numText2.addEffect('zoomIn', 0.5, 0.2);
  scene3.addChild(numText2);

  const title3 = new FFText({ text: '🤖 AI Agents', x: width/2, y: 380, fontSize: 80 });
  title3.setColor('#ffffff');
  title3.alignCenter();
  title3.addEffect('backInDown', 0.8, 0.3);
  scene3.addChild(title3);

  const subtitle3 = new FFText({ text: 'Autonomous Digital Workers', x: width/2, y: 490, fontSize: 48 });
  subtitle3.setColor('#a29bfe');
  subtitle3.alignCenter();
  subtitle3.addEffect('fadeIn', 0.6, 0.7);
  scene3.addChild(subtitle3);

  // Agent workflow visualization
  const agentBox1 = new FFRect({ color: '#6c5ce7', width: 280, height: 100, x: 250, y: 700 });
  agentBox1.addEffect('fadeInLeft', 0.5, 1);
  scene3.addChild(agentBox1);
  const agentText1 = new FFText({ text: '📋 Plan', x: 250, y: 700, fontSize: 36 });
  agentText1.setColor('#fff');
  agentText1.alignCenter();
  agentText1.addEffect('fadeIn', 0.3, 1.3);
  scene3.addChild(agentText1);

  const agentBox2 = new FFRect({ color: '#0984e3', width: 280, height: 100, x: width/2, y: 700 });
  agentBox2.addEffect('fadeInUp', 0.5, 1.5);
  scene3.addChild(agentBox2);
  const agentText2 = new FFText({ text: '⚡ Execute', x: width/2, y: 700, fontSize: 36 });
  agentText2.setColor('#fff');
  agentText2.alignCenter();
  agentText2.addEffect('fadeIn', 0.3, 1.8);
  scene3.addChild(agentText2);

  const agentBox3 = new FFRect({ color: '#00b894', width: 280, height: 100, x: width - 250, y: 700 });
  agentBox3.addEffect('fadeInRight', 0.5, 2);
  scene3.addChild(agentBox3);
  const agentText3 = new FFText({ text: '🔄 Learn', x: width - 250, y: 700, fontSize: 36 });
  agentText3.setColor('#fff');
  agentText3.alignCenter();
  agentText3.addEffect('fadeIn', 0.3, 2.3);
  scene3.addChild(agentText3);

  // Examples
  const example3a = new FFText({ text: '🔥 Examples:', x: width/2, y: 900, fontSize: 46 });
  example3a.setColor('#fdcb6e');
  example3a.alignCenter();
  example3a.addEffect('fadeInUp', 0.5, 3);
  scene3.addChild(example3a);

  const example3b = new FFText({ text: 'AutoGPT • Devin • Claude MCP', x: width/2, y: 990, fontSize: 40 });
  example3b.setColor('#dfe6e9');
  example3b.alignCenter();
  example3b.addEffect('fadeIn', 0.5, 3.5);
  scene3.addChild(example3b);

  const funFact3 = new FFText({ text: '🚀 Agents can code entire apps!', x: width/2, y: 1150, fontSize: 38 });
  funFact3.setColor('#74b9ff');
  funFact3.alignCenter();
  funFact3.addEffect('bounceIn', 0.8, 5);
  scene3.addChild(funFact3);

  // Agent capability chart
  const agentChartOption = {
    backgroundColor: 'transparent',
    radar: {
      indicator: [
        { name: 'Planning', max: 100 },
        { name: 'Coding', max: 100 },
        { name: 'Research', max: 100 },
        { name: 'Analysis', max: 100 },
        { name: 'Writing', max: 100 }
      ],
      axisLine: { lineStyle: { color: '#666' } },
      splitLine: { lineStyle: { color: '#444' } },
      axisName: { color: '#fff', fontSize: 14 }
    },
    series: [{
      type: 'radar',
      data: [{ value: [90, 85, 95, 88, 92], name: 'AI Agent', areaStyle: { color: 'rgba(108, 92, 231, 0.5)' }, lineStyle: { color: '#a29bfe' } }]
    }]
  };

  const chart3 = new FFChart({ theme: 'dark', option: agentChartOption, x: width/2, y: 1500, width: 800, height: 550 });
  scene3.addChild(chart3);

  creator.addChild(scene3);
  console.log(colors.green('  ✓ Scene 3: AI Agents (10s)'));

  // ============================================
  // SCENE 4: Concept 3 - RAG (10s)
  // ============================================
  const scene4 = new FFScene();
  scene4.setBgColor('#1e4d3d');
  scene4.setDuration(10);
  scene4.setTransition('windowshades', 0.8);

  // Number badge
  const badge3 = new FFRect({ color: '#27ae60', width: 120, height: 120, x: 150, y: 200 });
  badge3.addEffect('bounceIn', 0.6, 0);
  scene4.addChild(badge3);

  const numText3 = new FFText({ text: '3', x: 150, y: 200, fontSize: 72 });
  numText3.setColor('#ffffff');
  numText3.alignCenter();
  numText3.addEffect('zoomIn', 0.5, 0.2);
  scene4.addChild(numText3);

  const title4 = new FFText({ text: '📚 RAG', x: width/2, y: 350, fontSize: 90 });
  title4.setColor('#ffffff');
  title4.alignCenter();
  title4.addEffect('bounceIn', 0.8, 0.3);
  scene4.addChild(title4);

  const subtitle4 = new FFText({ text: 'Retrieval Augmented', x: width/2, y: 460, fontSize: 48 });
  subtitle4.setColor('#55efc4');
  subtitle4.alignCenter();
  subtitle4.addEffect('fadeInUp', 0.6, 0.6);
  scene4.addChild(subtitle4);

  const subtitle4b = new FFText({ text: 'Generation', x: width/2, y: 520, fontSize: 48 });
  subtitle4b.setColor('#55efc4');
  subtitle4b.alignCenter();
  subtitle4b.addEffect('fadeInUp', 0.6, 0.9);
  scene4.addChild(subtitle4b);

  // RAG Flow visualization - IMPROVED LAYOUT with proper connectors
  const boxWidth = 340;
  const boxHeight = 100;
  const startY = 680;
  const gapY = 160; // Gap between boxes including connector space
  const connectorHeight = 50;
  const connectorWidth = 12;

  // Box 1: Question
  const ragFlow1 = new FFRect({ color: '#00b894', width: boxWidth, height: boxHeight, x: width/2, y: startY });
  ragFlow1.addEffect('fadeInDown', 0.5, 1.2);
  scene4.addChild(ragFlow1);
  const ragText1 = new FFText({ text: '? Question', x: width/2, y: startY, fontSize: 36 });
  ragText1.setColor('#fff');
  ragText1.alignCenter();
  ragText1.addEffect('fadeIn', 0.3, 1.5);
  scene4.addChild(ragText1);

  // Connector 1 (Arrow line from box 1 to box 2)
  const connector1 = new FFRect({ color: '#55efc4', width: connectorWidth, height: connectorHeight, x: width/2, y: startY + boxHeight/2 + connectorHeight/2 + 5 });
  connector1.addEffect('fadeIn', 0.3, 1.7);
  scene4.addChild(connector1);
  const arrowHead1 = new FFText({ text: 'V', x: width/2, y: startY + boxHeight/2 + connectorHeight + 10, fontSize: 28 });
  arrowHead1.setColor('#55efc4');
  arrowHead1.alignCenter();
  arrowHead1.addEffect('fadeIn', 0.2, 1.8);
  scene4.addChild(arrowHead1);

  // Box 2: Search DB
  const ragFlow2 = new FFRect({ color: '#0984e3', width: boxWidth, height: boxHeight, x: width/2, y: startY + gapY });
  ragFlow2.addEffect('fadeInDown', 0.5, 1.9);
  scene4.addChild(ragFlow2);
  const ragText2 = new FFText({ text: '🔍 Search DB', x: width/2, y: startY + gapY, fontSize: 36 });
  ragText2.setColor('#fff');
  ragText2.alignCenter();
  ragText2.addEffect('fadeIn', 0.3, 2.2);
  scene4.addChild(ragText2);

  // Connector 2
  const connector2 = new FFRect({ color: '#74b9ff', width: connectorWidth, height: connectorHeight, x: width/2, y: startY + gapY + boxHeight/2 + connectorHeight/2 + 5 });
  connector2.addEffect('fadeIn', 0.3, 2.4);
  scene4.addChild(connector2);
  const arrowHead2 = new FFText({ text: 'V', x: width/2, y: startY + gapY + boxHeight/2 + connectorHeight + 10, fontSize: 28 });
  arrowHead2.setColor('#74b9ff');
  arrowHead2.alignCenter();
  arrowHead2.addEffect('fadeIn', 0.2, 2.5);
  scene4.addChild(arrowHead2);

  // Box 3: AI + Context
  const ragFlow3 = new FFRect({ color: '#6c5ce7', width: boxWidth, height: boxHeight, x: width/2, y: startY + gapY * 2 });
  ragFlow3.addEffect('fadeInDown', 0.5, 2.6);
  scene4.addChild(ragFlow3);
  const ragText3 = new FFText({ text: '🧠 AI + Context', x: width/2, y: startY + gapY * 2, fontSize: 36 });
  ragText3.setColor('#fff');
  ragText3.alignCenter();
  ragText3.addEffect('fadeIn', 0.3, 2.9);
  scene4.addChild(ragText3);

  // Connector 3
  const connector3 = new FFRect({ color: '#a29bfe', width: connectorWidth, height: connectorHeight, x: width/2, y: startY + gapY * 2 + boxHeight/2 + connectorHeight/2 + 5 });
  connector3.addEffect('fadeIn', 0.3, 3.1);
  scene4.addChild(connector3);
  const arrowHead3 = new FFText({ text: 'V', x: width/2, y: startY + gapY * 2 + boxHeight/2 + connectorHeight + 10, fontSize: 28 });
  arrowHead3.setColor('#a29bfe');
  arrowHead3.alignCenter();
  arrowHead3.addEffect('fadeIn', 0.2, 3.2);
  scene4.addChild(arrowHead3);

  // Box 4: Accurate Answer
  const ragFlow4 = new FFRect({ color: '#fdcb6e', width: boxWidth, height: boxHeight, x: width/2, y: startY + gapY * 3 });
  ragFlow4.addEffect('bounceIn', 0.5, 3.3);
  scene4.addChild(ragFlow4);
  const ragText4 = new FFText({ text: '✅ Accurate Answer', x: width/2, y: startY + gapY * 3, fontSize: 34 });
  ragText4.setColor('#2d3436');
  ragText4.alignCenter();
  ragText4.addEffect('fadeIn', 0.3, 3.6);
  scene4.addChild(ragText4);

  // Fun fact at bottom
  const funFact4 = new FFText({ text: '💡 No more hallucinations!', x: width/2, y: 1550, fontSize: 42 });
  funFact4.setColor('#ffeaa7');
  funFact4.alignCenter();
  funFact4.addEffect('bounceIn', 0.8, 5);
  scene4.addChild(funFact4);

  // Add explanatory text
  const ragExplain = new FFText({ text: 'Grounds AI in YOUR data!', x: width/2, y: 1650, fontSize: 36 });
  ragExplain.setColor('#55efc4');
  ragExplain.alignCenter();
  ragExplain.addEffect('fadeInUp', 0.6, 6);
  scene4.addChild(ragExplain);

  creator.addChild(scene4);
  console.log(colors.green('  ✓ Scene 4: RAG Concept (10s)'));

  // ============================================
  // SCENE 5: Concept 4 - Multimodal AI (10s)
  // ============================================
  const scene5 = new FFScene();
  scene5.setBgColor('#2c1810');
  scene5.setDuration(10);
  scene5.setTransition('stretch', 0.8);

  // Number badge
  const badge4 = new FFRect({ color: '#e67e22', width: 120, height: 120, x: 150, y: 200 });
  badge4.addEffect('bounceIn', 0.6, 0);
  scene5.addChild(badge4);

  const numText4 = new FFText({ text: '4', x: 150, y: 200, fontSize: 72 });
  numText4.setColor('#ffffff');
  numText4.alignCenter();
  numText4.addEffect('zoomIn', 0.5, 0.2);
  scene5.addChild(numText4);

  const title5 = new FFText({ text: '🎨 Multimodal AI', x: width/2, y: 380, fontSize: 80 });
  title5.setColor('#ffffff');
  title5.alignCenter();
  title5.addEffect('backInDown', 0.8, 0.3);
  scene5.addChild(title5);

  const subtitle5 = new FFText({ text: 'Text + Image + Audio + Video', x: width/2, y: 490, fontSize: 44 });
  subtitle5.setColor('#f39c12');
  subtitle5.alignCenter();
  subtitle5.addEffect('fadeIn', 0.6, 0.7);
  scene5.addChild(subtitle5);

  // Modality boxes
  const modBox1 = new FFRect({ color: '#e74c3c', width: 200, height: 200, x: 200, y: 700 });
  modBox1.addEffect('rotateIn', 0.6, 1);
  scene5.addChild(modBox1);
  const modText1 = new FFText({ text: '📝', x: 200, y: 680, fontSize: 70 });
  modText1.addEffect('fadeIn', 0.3, 1.3);
  scene5.addChild(modText1);
  const modLabel1 = new FFText({ text: 'Text', x: 200, y: 750, fontSize: 28 });
  modLabel1.setColor('#fff');
  modLabel1.alignCenter();
  modLabel1.addEffect('fadeIn', 0.3, 1.3);
  scene5.addChild(modLabel1);

  const modBox2 = new FFRect({ color: '#3498db', width: 200, height: 200, x: 450, y: 700 });
  modBox2.addEffect('rotateIn', 0.6, 1.3);
  scene5.addChild(modBox2);
  const modText2 = new FFText({ text: '🖼️', x: 450, y: 680, fontSize: 70 });
  modText2.addEffect('fadeIn', 0.3, 1.6);
  scene5.addChild(modText2);
  const modLabel2 = new FFText({ text: 'Image', x: 450, y: 750, fontSize: 28 });
  modLabel2.setColor('#fff');
  modLabel2.alignCenter();
  modLabel2.addEffect('fadeIn', 0.3, 1.6);
  scene5.addChild(modLabel2);

  const modBox3 = new FFRect({ color: '#9b59b6', width: 200, height: 200, x: 700, y: 700 });
  modBox3.addEffect('rotateIn', 0.6, 1.6);
  scene5.addChild(modBox3);
  const modText3 = new FFText({ text: '🎵', x: 700, y: 680, fontSize: 70 });
  modText3.addEffect('fadeIn', 0.3, 1.9);
  scene5.addChild(modText3);
  const modLabel3 = new FFText({ text: 'Audio', x: 700, y: 750, fontSize: 28 });
  modLabel3.setColor('#fff');
  modLabel3.alignCenter();
  modLabel3.addEffect('fadeIn', 0.3, 1.9);
  scene5.addChild(modLabel3);

  const modBox4 = new FFRect({ color: '#1abc9c', width: 200, height: 200, x: 950, y: 700 });
  modBox4.addEffect('rotateIn', 0.6, 1.9);
  scene5.addChild(modBox4);
  const modText4 = new FFText({ text: '🎬', x: 950, y: 680, fontSize: 70 });
  modText4.addEffect('fadeIn', 0.3, 2.2);
  scene5.addChild(modText4);
  const modLabel4 = new FFText({ text: 'Video', x: 950, y: 750, fontSize: 28 });
  modLabel4.setColor('#fff');
  modLabel4.alignCenter();
  modLabel4.addEffect('fadeIn', 0.3, 2.2);
  scene5.addChild(modLabel4);

  // Center convergence
  const centerCircle = new FFRect({ color: '#f1c40f', width: 250, height: 250, x: width/2, y: 1050 });
  centerCircle.addEffect('bounceIn', 0.8, 2.5);
  scene5.addChild(centerCircle);
  const centerText = new FFText({ text: '🤖 AI', x: width/2, y: 1050, fontSize: 60 });
  centerText.setColor('#2c3e50');
  centerText.alignCenter();
  centerText.addEffect('zoomIn', 0.5, 3);
  scene5.addChild(centerText);

  // Examples
  const example5 = new FFText({ text: '🌟 GPT-4V • Gemini • DALL-E 3', x: width/2, y: 1300, fontSize: 40 });
  example5.setColor('#ecf0f1');
  example5.alignCenter();
  example5.addEffect('fadeInUp', 0.6, 4);
  scene5.addChild(example5);

  const funFact5 = new FFText({ text: '📸 Describe ANY image instantly!', x: width/2, y: 1450, fontSize: 38 });
  funFact5.setColor('#f39c12');
  funFact5.alignCenter();
  funFact5.addEffect('bounceIn', 0.8, 5.5);
  scene5.addChild(funFact5);

  creator.addChild(scene5);
  console.log(colors.green('  ✓ Scene 5: Multimodal AI (10s)'));

  // ============================================
  // SCENE 6: Concept 5 - Fine-Tuning (10s)
  // ============================================
  const scene6 = new FFScene();
  scene6.setBgColor('#1a1a2e');
  scene6.setDuration(10);
  scene6.setTransition('circlecrop', 0.8);

  // Number badge
  const badge5 = new FFRect({ color: '#e84393', width: 120, height: 120, x: 150, y: 200 });
  badge5.addEffect('bounceIn', 0.6, 0);
  scene6.addChild(badge5);

  const numText5 = new FFText({ text: '5', x: 150, y: 200, fontSize: 72 });
  numText5.setColor('#ffffff');
  numText5.alignCenter();
  numText5.addEffect('zoomIn', 0.5, 0.2);
  scene6.addChild(numText5);

  const title6 = new FFText({ text: '🎯 Fine-Tuning', x: width/2, y: 380, fontSize: 80 });
  title6.setColor('#ffffff');
  title6.alignCenter();
  title6.addEffect('bounceIn', 0.8, 0.3);
  scene6.addChild(title6);

  const subtitle6 = new FFText({ text: 'Customize AI For YOUR Needs', x: width/2, y: 490, fontSize: 44 });
  subtitle6.setColor('#fd79a8');
  subtitle6.alignCenter();
  subtitle6.addEffect('fadeIn', 0.6, 0.7);
  scene6.addChild(subtitle6);

  // Fine-tuning process
  const ftBox1 = new FFRect({ color: '#636e72', width: 800, height: 100, x: width/2, y: 650 });
  ftBox1.addEffect('fadeInLeft', 0.5, 1);
  scene6.addChild(ftBox1);
  const ftText1 = new FFText({ text: '🌐 Base Model (Generic)', x: width/2, y: 650, fontSize: 36 });
  ftText1.setColor('#fff');
  ftText1.alignCenter();
  ftText1.addEffect('fadeIn', 0.3, 1.3);
  scene6.addChild(ftText1);

  const ftArrow = new FFText({ text: '⬇️ + Your Data', x: width/2, y: 770, fontSize: 44 });
  ftArrow.setColor('#fdcb6e');
  ftArrow.alignCenter();
  ftArrow.addEffect('fadeIn', 0.5, 2);
  scene6.addChild(ftArrow);

  const ftBox2 = new FFRect({ color: '#00b894', width: 800, height: 100, x: width/2, y: 900 });
  ftBox2.addEffect('fadeInRight', 0.5, 2.5);
  scene6.addChild(ftBox2);
  const ftText2 = new FFText({ text: '🎯 Custom Model (Expert!)', x: width/2, y: 900, fontSize: 36 });
  ftText2.setColor('#fff');
  ftText2.alignCenter();
  ftText2.addEffect('fadeIn', 0.3, 2.8);
  scene6.addChild(ftText2);

  // Chart showing improvement
  const ftChartOption = {
    backgroundColor: 'transparent',
    title: { text: 'Performance After Fine-Tuning', left: 'center', textStyle: { color: '#fff', fontSize: 22 } },
    xAxis: {
      type: 'category',
      data: ['Accuracy', 'Speed', 'Relevance', 'Cost'],
      axisLabel: { color: '#fff', fontSize: 14 }
    },
    yAxis: { type: 'value', max: 100, axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#333' } } },
    series: [
      { name: 'Before', type: 'bar', data: [60, 70, 55, 40], itemStyle: { color: '#636e72' } },
      { name: 'After', type: 'bar', data: [95, 88, 92, 85], itemStyle: { color: '#00b894' } }
    ],
    legend: { data: ['Before', 'After'], textStyle: { color: '#fff' }, top: 40 },
    animationDuration: 2500
  };

  const chart6 = new FFChart({ theme: 'dark', option: ftChartOption, x: width/2, y: 1250, width: 900, height: 450 });
  scene6.addChild(chart6);

  const funFact6 = new FFText({ text: '💰 10x better with just 100 examples!', x: width/2, y: 1600, fontSize: 36 });
  funFact6.setColor('#ffeaa7');
  funFact6.alignCenter();
  funFact6.addEffect('bounceIn', 0.8, 6);
  scene6.addChild(funFact6);

  creator.addChild(scene6);
  console.log(colors.green('  ✓ Scene 6: Fine-Tuning (10s)'));

  // ============================================
  // SCENE 7: OUTRO - Call to Action (5s)
  // ============================================
  const outroScene = new FFScene();
  outroScene.setBgColor('#0a0a0f');
  outroScene.setDuration(5);
  outroScene.setTransition('radiation', 0.8);

  // Background accent
  const outroBg = new FFRect({ color: '#1a1a2e', width: 1200, height: 2000, x: width/2, y: height/2 });
  outroBg.addEffect('fadeIn', 0.3, 0);
  outroScene.addChild(outroBg);

  const outroTitle = new FFText({ text: '🔥 Now You Know!', x: width/2, y: 400, fontSize: 72 });
  outroTitle.setColor('#ffffff');
  outroTitle.alignCenter();
  outroTitle.addEffect('bounceIn', 1, 0);
  outroScene.addChild(outroTitle);

  // Summary icons
  const summary1 = new FFText({ text: '🗣️ LLMs', x: 200, y: 600, fontSize: 42 });
  summary1.setColor('#74b9ff');
  summary1.addEffect('fadeInLeft', 0.4, 0.5);
  outroScene.addChild(summary1);

  const summary2 = new FFText({ text: '🤖 Agents', x: 450, y: 600, fontSize: 42 });
  summary2.setColor('#a29bfe');
  summary2.addEffect('fadeInUp', 0.4, 0.7);
  outroScene.addChild(summary2);

  const summary3 = new FFText({ text: '📚 RAG', x: 680, y: 600, fontSize: 42 });
  summary3.setColor('#55efc4');
  summary3.addEffect('fadeInUp', 0.4, 0.9);
  outroScene.addChild(summary3);

  const summary4 = new FFText({ text: '🎨 Multi', x: width - 200, y: 600, fontSize: 42 });
  summary4.setColor('#f39c12');
  summary4.addEffect('fadeInRight', 0.4, 1.1);
  outroScene.addChild(summary4);

  // CTA
  const cta1 = new FFText({ text: '👍 LIKE if you learned', x: width/2, y: 800, fontSize: 52 });
  cta1.setColor('#e74c3c');
  cta1.alignCenter();
  cta1.addEffect('backInLeft', 0.6, 1.5);
  outroScene.addChild(cta1);

  const cta2 = new FFText({ text: 'something new!', x: width/2, y: 880, fontSize: 52 });
  cta2.setColor('#e74c3c');
  cta2.alignCenter();
  cta2.addEffect('backInRight', 0.6, 1.7);
  outroScene.addChild(cta2);

  const cta3 = new FFText({ text: '🔔 FOLLOW for more AI tips', x: width/2, y: 1050, fontSize: 48 });
  cta3.setColor('#fdcb6e');
  cta3.alignCenter();
  cta3.addEffect('bounceIn', 0.8, 2.2);
  outroScene.addChild(cta3);

  const cta4 = new FFText({ text: '💬 Comment: Which concept', x: width/2, y: 1200, fontSize: 44 });
  cta4.setColor('#74b9ff');
  cta4.alignCenter();
  cta4.addEffect('fadeInUp', 0.5, 2.8);
  outroScene.addChild(cta4);

  const cta5 = new FFText({ text: 'was NEW to you?', x: width/2, y: 1270, fontSize: 44 });
  cta5.setColor('#74b9ff');
  cta5.alignCenter();
  cta5.addEffect('fadeInUp', 0.5, 3);
  outroScene.addChild(cta5);

  // Final branding
  const brandText = new FFText({ text: '✨ AI Simplified ✨', x: width/2, y: 1500, fontSize: 56 });
  brandText.setColor('#fff');
  brandText.alignCenter();
  brandText.addEffect('zoomIn', 0.8, 3.5);
  outroScene.addChild(brandText);

  creator.addChild(outroScene);
  console.log(colors.green('  ✓ Scene 7: Outro CTA (5s)'));

  // ============================================
  // RENDER VIDEO
  // ============================================
  console.log(colors.yellow('\n📹 Starting video render...'));
  console.log(colors.gray('   This may take 2-5 minutes...\n'));

  creator.on('start', () => {
    console.log(colors.blue('🚀 Rendering started...'));
  });

  creator.on('progress', (e) => {
    const percent = (e.percent * 100).toFixed(1);
    process.stdout.write(colors.cyan(`\r   Progress: ${percent}% ${'█'.repeat(Math.floor(e.percent * 30))}${'░'.repeat(30 - Math.floor(e.percent * 30))}`));
  });

  creator.on('complete', (e) => {
    console.log(colors.green('\n\n✅ Video created successfully!'));
    console.log(colors.white(`📁 Output: ${e.output}`));
    console.log(colors.magenta('\n🎉 Your AI Shorts video is ready for YouTube!\n'));
  });

  creator.on('error', (e) => {
    console.log(colors.red(`\n❌ Error: ${e.error}`));
  });

  creator.start();
}

// Run the creator
createAIShortsVideo().catch(console.error);

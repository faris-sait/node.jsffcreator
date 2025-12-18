/**
 * Chart Generator - Core module for creating chart videos
 */

// Initialize browser environment first
require('./browser-env');

const path = require('path');
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('ffprobe-installer').path;
const { FFText, FFChart, FFScene, FFCreator, FFAudio } = require('../../');
const { chartTemplates, backgrounds } = require('./chart-templates');

// Set FFmpeg paths
FFCreator.setFFmpegPath(ffmpegPath);
FFCreator.setFFprobePath(ffprobePath);

class ChartGenerator {
  constructor(options = {}) {
    this.width = options.width || 800;
    this.height = options.height || 600;
    this.fps = options.fps || 30;
    this.outputDir = options.outputDir || path.join(__dirname, '../output');
    this.cacheDir = options.cacheDir || path.join(__dirname, '../cache');
    this.audioPath = options.audio || null; // Path to background music file
    
    // Ensure directories exist
    if (!fs.existsSync(this.outputDir)) fs.mkdirSync(this.outputDir, { recursive: true });
    if (!fs.existsSync(this.cacheDir)) fs.mkdirSync(this.cacheDir, { recursive: true });
  }

  /**
   * Create a single chart video
   */
  async createSingleChart(chartType, data = {}, outputName = null) {
    const template = chartTemplates[chartType];
    if (!template) {
      console.error(`❌ Unknown chart type: ${chartType}`);
      console.log('Available types: bar, line, pie, area, radar, scatter');
      return;
    }

    const filename = outputName || `${chartType}-chart.mp4`;
    console.log(`\n📊 Creating ${template.name}...`);

    const creator = new FFCreator({
      cacheDir: this.cacheDir,
      outputDir: this.outputDir,
      output: path.join(this.outputDir, filename),
      width: this.width,
      height: this.height,
      fps: this.fps
    });

    // Create scene
    const scene = new FFScene();
    scene.setBgColor(backgrounds[chartType]);
    scene.setDuration(5);

    // Title
    const title = new FFText({
      text: data.title || template.name,
      x: this.width / 2,
      y: 35,
      fontSize: 28
    });
    title.setColor(template.color);
    title.alignCenter();
    title.addEffect('fadeIn', 0.5, 0);
    scene.addChild(title);

    // Subtitle
    if (data.subtitle) {
      const subtitle = new FFText({
        text: data.subtitle,
        x: this.width / 2,
        y: 70,
        fontSize: 16
      });
      subtitle.setColor('#888888');
      subtitle.alignCenter();
      scene.addChild(subtitle);
    }

    // Chart
    const chartOption = template.getOption(data);
    const chart = new FFChart({
      theme: 'dark',
      option: chartOption,
      x: this.width / 2,
      y: this.height / 2 + 30,
      width: this.width - 100,
      height: this.height - 150
    });
    scene.addChild(chart);

    creator.addChild(scene);
    
    // Add background audio if provided
    if (data.audio || this.audioPath) {
      creator.addAudio({
        path: data.audio || this.audioPath,
        loop: true,
        volume: 0.5
      });
    }
    
    return this._render(creator, filename);
  }

  /**
   * Create all charts showcase video
   */
  async createAllCharts(data = {}) {
    console.log('\n🎬 Creating All Charts Showcase...\n');

    const creator = new FFCreator({
      cacheDir: this.cacheDir,
      outputDir: this.outputDir,
      output: path.join(this.outputDir, 'all-charts.mp4'),
      width: this.width,
      height: this.height,
      fps: this.fps
    });

    // Intro scene
    const introScene = new FFScene();
    introScene.setBgColor('#0a0a1a');
    introScene.setDuration(3);

    const introTitle = new FFText({
      text: data.introTitle || '📊 Chart Visualization',
      x: this.width / 2,
      y: this.height / 2 - 30,
      fontSize: 48
    });
    introTitle.setColor('#00d4ff');
    introTitle.alignCenter();
    introTitle.addEffect('fadeInUp', 1, 0);
    introScene.addChild(introTitle);

    const introSub = new FFText({
      text: data.introSubtitle || 'Data Visualization with FFCreator',
      x: this.width / 2,
      y: this.height / 2 + 40,
      fontSize: 22
    });
    introSub.setColor('#888888');
    introSub.alignCenter();
    introSub.addEffect('fadeIn', 1, 0.5);
    introScene.addChild(introSub);

    creator.addChild(introScene);
    console.log('  ✓ Intro');

    // Add each chart type
    const chartTypes = ['bar', 'line', 'pie', 'area', 'radar', 'scatter'];
    const transitions = ['fadeIn', 'slideLeft', 'fadeIn', 'slideUp', 'fadeIn', 'slideLeft'];

    chartTypes.forEach((type, i) => {
      const template = chartTemplates[type];
      const chartData = data[type] || {};

      const scene = new FFScene();
      scene.setBgColor(backgrounds[type]);
      scene.setDuration(5);
      scene.setTransition(transitions[i], 0.5);

      const title = new FFText({
        text: chartData.title || template.name,
        x: this.width / 2,
        y: 35,
        fontSize: 28
      });
      title.setColor(template.color);
      title.alignCenter();
      scene.addChild(title);

      if (chartData.subtitle) {
        const subtitle = new FFText({
          text: chartData.subtitle,
          x: this.width / 2,
          y: 70,
          fontSize: 16
        });
        subtitle.setColor('#888888');
        subtitle.alignCenter();
        scene.addChild(subtitle);
      }

      const chartOption = template.getOption(chartData);
      const chart = new FFChart({
        theme: 'dark',
        option: chartOption,
        x: this.width / 2,
        y: this.height / 2 + 30,
        width: this.width - 100,
        height: this.height - 150
      });
      scene.addChild(chart);

      creator.addChild(scene);
      console.log(`  ✓ ${template.name}`);
    });

    // Outro scene
    const outroScene = new FFScene();
    outroScene.setBgColor('#0a0a1a');
    outroScene.setDuration(3);
    outroScene.setTransition('fadeIn', 0.5);

    const outroTitle = new FFText({
      text: data.outroTitle || '✨ FFCreator Charts',
      x: this.width / 2,
      y: this.height / 2 - 20,
      fontSize: 42
    });
    outroTitle.setColor('#00d4ff');
    outroTitle.alignCenter();
    outroTitle.addEffect('fadeIn', 1, 0);
    outroScene.addChild(outroTitle);

    const outroSub = new FFText({
      text: data.outroSubtitle || 'Data Visualization Made Simple',
      x: this.width / 2,
      y: this.height / 2 + 35,
      fontSize: 20
    });
    outroSub.setColor('#888888');
    outroSub.alignCenter();
    outroSub.addEffect('fadeIn', 1, 0.5);
    outroScene.addChild(outroSub);

    creator.addChild(outroScene);
    console.log('  ✓ Outro');

    // Add background audio if provided
    if (data.audio || this.audioPath) {
      creator.addAudio({
        path: data.audio || this.audioPath,
        loop: true,
        volume: 0.5
      });
      console.log('  ✓ Audio added');
    }

    return this._render(creator, 'all-charts.mp4');
  }

  /**
   * Create video from custom data.json
   */
  async createFromData(data) {
    if (data.type === 'single' && data.chart) {
      return this.createSingleChart(data.chart, data.data, data.output);
    } else if (data.type === 'showcase') {
      return this.createAllCharts(data);
    } else {
      console.error('❌ Invalid data format. Use type: "single" or "showcase"');
    }
  }

  /**
   * Internal render method
   */
  _render(creator, filename) {
    return new Promise((resolve, reject) => {
      creator.on('start', () => console.log('\n📹 Rendering...'));
      creator.on('error', e => {
        console.error(`❌ Error: ${e.message || e}`);
        reject(e);
      });
      creator.on('progress', e => {
        process.stdout.write(`\r  Progress: ${(e.percent * 100).toFixed(1)}%`);
      });
      creator.on('complete', e => {
        console.log(`\n\n✅ Video created!`);
        console.log(`📁 Output: ${e.output}`);
        resolve(e.output);
      });

      creator.start();
    });
  }
}

module.exports = ChartGenerator;

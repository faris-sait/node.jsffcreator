/**
 * 📊 FFCreator Chart Visualizer
 * 
 * A Node.js application for creating data visualization videos.
 * 
 * Usage:
 *   node index.js                    # Interactive mode
 *   node index.js --chart bar        # Create bar chart
 *   node index.js --chart all        # Create all charts
 *   node index.js --custom           # Use custom data from data.json
 */

const ChartGenerator = require('./src/chart-generator');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const chartArg = args.find(a => a.startsWith('--chart'));
const isCustom = args.includes('--custom');

async function main() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║     📊 FFCreator Chart Visualizer v1.0.0 📊       ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  const generator = new ChartGenerator({
    outputDir: path.join(__dirname, 'output'),
    width: 800,
    height: 600,
    fps: 30
  });

  if (isCustom) {
    // Load custom data from data.json
    const customData = require('./data.json');
    await generator.createFromData(customData);
  } else if (chartArg) {
    const chartType = args[args.indexOf('--chart') + 1] || 'all';
    
    if (chartType === 'all') {
      await generator.createAllCharts();
    } else {
      await generator.createSingleChart(chartType);
    }
  } else {
    // Default: create all charts showcase
    await generator.createAllCharts();
  }
}

main().catch(console.error);

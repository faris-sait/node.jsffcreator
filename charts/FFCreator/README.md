# FFCreator Chart Visualizer

A Node.js application for creating data visualization videos using FFCreator.

## 📊 Overview

This project demonstrates how to create beautiful chart visualization videos using FFCreator and ECharts. It supports 6 different chart types with both static and dynamic (animated) data.

## 🚀 Quick Start

### Installation

```bash
cd charts/FFCreator
yarn install
```

### Run Examples

```bash
# All charts showcase (static)
node examples/all-charts-showcase.js

# All charts with dynamic data
node examples/dynamic-all-charts.js

# Faris Bad Decisions (fun demo)
node examples/faris-dynamic-charts.js
```

### Using the Node.js App

```bash
cd nodejs-app

# Create all charts
node index.js

# Create single chart
node index.js --chart bar
node index.js --chart line
node index.js --chart pie

# Use custom data
node index.js --custom
```

## 📁 Project Structure

```
FFCreator/
├── index.js              # FFCreator entry
├── package.json          # Dependencies
├── lib/                  # FFCreator core library
├── examples/             # Example scripts
│   ├── all-charts-showcase.js    # All 6 charts (static)
│   ├── dynamic-all-charts.js     # All 6 charts (dynamic)
│   ├── faris-chart.js            # Fun demo
│   ├── faris-dynamic-charts.js   # Fun demo (dynamic)
│   ├── chart-simple-demo.js      # Basic examples
│   └── output/                   # Generated videos
└── nodejs-app/           # Standalone Node.js application
    ├── index.js          # CLI entry point
    ├── data.json         # Custom data input
    └── src/
        ├── browser-env.js      # DOM mocking for Node.js
        ├── chart-generator.js  # Core generator class
        └── chart-templates.js  # 6 chart templates
```

## 📊 Supported Chart Types

| Type | Description | Use Case |
|------|-------------|----------|
| `bar` | Vertical bar chart | Sales, comparisons |
| `line` | Multi-series line chart | Trends, time series |
| `pie` | Donut pie chart | Distribution, percentages |
| `area` | Stacked area chart | Cumulative data |
| `radar` | Multi-axis radar chart | Comparisons, ratings |
| `scatter` | Scatter plot | Correlations, clusters |

## 🎬 Features

- **6 Chart Types** - Bar, Line, Pie, Area, Radar, Scatter
- **Dynamic Charts** - Real-time animated data updates
- **Customizable** - Edit `data.json` for custom data
- **Scene Transitions** - fadeIn, slideLeft, slideUp, etc.
- **Text Animations** - fadeIn, fadeInUp, zoomIn effects
- **Clean Output** - High quality MP4 videos

## 📝 Custom Data Example

Edit `nodejs-app/data.json`:

```json
{
  "type": "showcase",
  "introTitle": "📊 My Report",
  "bar": {
    "title": "Monthly Sales",
    "labels": ["Jan", "Feb", "Mar"],
    "values": [100, 200, 150]
  },
  "line": {
    "title": "User Growth",
    "series": [
      { "name": "Users", "values": [100, 150, 200], "color": "#00ff88" }
    ]
  }
}
```

Then run:
```bash
node index.js --custom
```

## 🛠️ Technical Notes

- **ECharts** requires a browser DOM environment
- `browser-env.js` mocks `document`, `window`, `navigator` for Node.js
- FFCreator uses FFmpeg for video encoding
- Charts render to canvas frames via inkpaint

## 📦 Dependencies

- `ffcreator` - Video generation
- `echarts@5.1.2` - Chart rendering
- `inkpaint` - Canvas for Node.js
- `@ffmpeg-installer/ffmpeg` - FFmpeg binary
- `ffprobe-installer` - FFprobe binary

## 📤 Output

Videos are saved to:
- `examples/output/` - Example outputs
- `nodejs-app/output/` - App outputs

## License

MIT

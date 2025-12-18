# FFCreator Chart Visualizer

A Node.js application for creating data visualization videos using FFCreator.

## 📁 Structure

```
nodejs-app/
├── index.js              # Entry point
├── package.json          # Dependencies
├── data.json             # Custom data configuration
├── src/
│   ├── browser-env.js    # Browser environment mock
│   ├── chart-generator.js # Core chart generator
│   └── chart-templates.js # Chart configurations
├── output/               # Generated videos
└── cache/                # Temporary files
```

## 🚀 Usage

### Run from parent directory
```bash
cd nodejs-app
node index.js              # Create all charts
node index.js --chart bar  # Create single bar chart
node index.js --custom     # Use custom data.json
```

### Available Commands
```bash
node index.js --chart bar      # Bar chart
node index.js --chart line     # Line chart
node index.js --chart pie      # Pie chart
node index.js --chart area     # Area chart
node index.js --chart radar    # Radar chart
node index.js --chart scatter  # Scatter chart
node index.js --chart all      # All charts showcase
node index.js --custom         # Custom data from data.json
```

## 📊 Supported Chart Types

| Type | Description |
|------|-------------|
| `bar` | Vertical bar chart |
| `line` | Multi-series line chart |
| `pie` | Donut pie chart |
| `area` | Stacked area chart |
| `radar` | Multi-axis radar chart |
| `scatter` | Scatter plot |

## 📝 Custom Data

Edit `data.json` to customize your charts:

```json
{
  "type": "showcase",
  "introTitle": "My Report",
  "bar": {
    "title": "Sales Data",
    "labels": ["Q1", "Q2", "Q3"],
    "values": [100, 200, 150]
  }
}
```

## 📤 Output

Videos are saved to `output/` folder:
- `all-charts.mp4` - Full showcase
- `bar-chart.mp4` - Individual charts

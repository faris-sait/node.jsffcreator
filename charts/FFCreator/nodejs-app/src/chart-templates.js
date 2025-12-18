/**
 * Chart Templates - Pre-configured chart options
 */

const chartTemplates = {
  bar: {
    name: 'Bar Chart',
    color: '#00d4ff',
    getOption: (data) => ({
      backgroundColor: 'transparent',
      xAxis: {
        type: 'category',
        data: data.labels || ['A', 'B', 'C', 'D', 'E'],
        axisLabel: { color: '#fff', fontSize: 13 },
        axisLine: { lineStyle: { color: '#555' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#fff' },
        splitLine: { lineStyle: { color: '#333' } }
      },
      series: [{
        data: data.values || [120, 200, 150, 180, 230],
        type: 'bar',
        itemStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: data.color || '#00d4ff' },
              { offset: 1, color: data.colorEnd || '#0066ff' }
            ]
          }
        },
        label: { show: true, position: 'top', color: '#fff' }
      }],
      animationDuration: 1500
    })
  },

  line: {
    name: 'Line Chart',
    color: '#00ff88',
    getOption: (data) => ({
      backgroundColor: 'transparent',
      legend: {
        data: data.series?.map(s => s.name) || ['Series A', 'Series B'],
        bottom: 10,
        textStyle: { color: '#fff' }
      },
      xAxis: {
        type: 'category',
        data: data.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#555' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#fff' },
        splitLine: { lineStyle: { color: '#333' } }
      },
      series: data.series?.map((s, i) => ({
        name: s.name,
        type: 'line',
        smooth: true,
        data: s.values,
        lineStyle: { width: 3, color: s.color || ['#00ff88', '#ffd93d'][i] },
        itemStyle: { color: s.color || ['#00ff88', '#ffd93d'][i] },
        symbol: 'circle',
        symbolSize: 8
      })) || [
        { name: 'Series A', type: 'line', smooth: true, data: [820, 932, 901, 1034, 1290, 1330, 1120], lineStyle: { width: 3, color: '#00ff88' }, itemStyle: { color: '#00ff88' }, symbol: 'circle', symbolSize: 8 },
        { name: 'Series B', type: 'line', smooth: true, data: [1200, 1400, 1300, 1600, 1900, 2100, 1800], lineStyle: { width: 3, color: '#ffd93d' }, itemStyle: { color: '#ffd93d' }, symbol: 'circle', symbolSize: 8 }
      ],
      animationDuration: 1500
    })
  },

  pie: {
    name: 'Pie Chart',
    color: '#ffd93d',
    getOption: (data) => ({
      backgroundColor: 'transparent',
      legend: { orient: 'horizontal', bottom: 10, textStyle: { color: '#fff' } },
      series: [{
        type: 'pie',
        radius: ['30%', '60%'],
        center: ['50%', '55%'],
        itemStyle: { borderRadius: 8, borderColor: '#0f3460', borderWidth: 2 },
        label: { show: true, color: '#fff', formatter: '{b}: {d}%' },
        data: data.items || [
          { value: 35, name: 'Category A', itemStyle: { color: '#5470C6' } },
          { value: 25, name: 'Category B', itemStyle: { color: '#91CC75' } },
          { value: 20, name: 'Category C', itemStyle: { color: '#FAC858' } },
          { value: 12, name: 'Category D', itemStyle: { color: '#EE6666' } },
          { value: 8, name: 'Category E', itemStyle: { color: '#73C0DE' } }
        ]
      }],
      animationDuration: 1500
    })
  },

  area: {
    name: 'Area Chart',
    color: '#e056fd',
    getOption: (data) => ({
      backgroundColor: 'transparent',
      legend: {
        data: data.series?.map(s => s.name) || ['CPU', 'Memory', 'Disk'],
        bottom: 10,
        textStyle: { color: '#fff' }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.labels || ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#555' } }
      },
      yAxis: {
        type: 'value',
        max: data.max || 100,
        axisLabel: { color: '#fff', formatter: '{value}%' },
        splitLine: { lineStyle: { color: '#333' } }
      },
      series: data.series?.map((s, i) => ({
        name: s.name,
        type: 'line',
        stack: 'Total',
        areaStyle: { opacity: 0.6, color: s.color || ['#5470C6', '#91CC75', '#FAC858'][i] },
        lineStyle: { color: s.color || ['#5470C6', '#91CC75', '#FAC858'][i] },
        data: s.values
      })) || [
        { name: 'CPU', type: 'line', stack: 'Total', areaStyle: { opacity: 0.6, color: '#5470C6' }, lineStyle: { color: '#5470C6' }, data: [15, 25, 45, 60, 55, 40, 20] },
        { name: 'Memory', type: 'line', stack: 'Total', areaStyle: { opacity: 0.6, color: '#91CC75' }, lineStyle: { color: '#91CC75' }, data: [20, 30, 35, 45, 50, 45, 30] },
        { name: 'Disk', type: 'line', stack: 'Total', areaStyle: { opacity: 0.6, color: '#FAC858' }, lineStyle: { color: '#FAC858' }, data: [10, 12, 15, 18, 20, 22, 18] }
      ],
      animationDuration: 1500
    })
  },

  radar: {
    name: 'Radar Chart',
    color: '#ff6b6b',
    getOption: (data) => ({
      backgroundColor: 'transparent',
      legend: {
        data: data.series?.map(s => s.name) || ['Product A', 'Product B'],
        bottom: 10,
        textStyle: { color: '#fff' }
      },
      radar: {
        indicator: data.indicators || [
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
        data: data.series?.map((s, i) => ({
          value: s.values,
          name: s.name,
          areaStyle: { opacity: 0.4, color: s.color || ['#00d4ff', '#ff6b6b'][i] },
          lineStyle: { color: s.color || ['#00d4ff', '#ff6b6b'][i], width: 2 },
          itemStyle: { color: s.color || ['#00d4ff', '#ff6b6b'][i] }
        })) || [
          { value: [85, 70, 90, 80, 95, 88], name: 'Product A', areaStyle: { opacity: 0.4, color: '#00d4ff' }, lineStyle: { color: '#00d4ff', width: 2 }, itemStyle: { color: '#00d4ff' } },
          { value: [75, 90, 70, 85, 80, 92], name: 'Product B', areaStyle: { opacity: 0.4, color: '#ff6b6b' }, lineStyle: { color: '#ff6b6b', width: 2 }, itemStyle: { color: '#ff6b6b' } }
        ]
      }],
      animationDuration: 1500
    })
  },

  scatter: {
    name: 'Scatter Chart',
    color: '#ff9f43',
    getOption: (data) => ({
      backgroundColor: 'transparent',
      legend: {
        data: data.series?.map(s => s.name) || ['Group A', 'Group B', 'Group C'],
        bottom: 10,
        textStyle: { color: '#fff' }
      },
      xAxis: {
        type: 'value',
        name: data.xAxisName || 'X Axis',
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle: { color: '#fff' },
        axisLabel: { color: '#fff' },
        splitLine: { lineStyle: { color: '#333' } }
      },
      yAxis: {
        type: 'value',
        name: data.yAxisName || 'Y Axis',
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: { color: '#fff' },
        axisLabel: { color: '#fff' },
        splitLine: { lineStyle: { color: '#333' } }
      },
      series: data.series?.map((s, i) => ({
        name: s.name,
        type: 'scatter',
        symbolSize: 15,
        data: s.points,
        itemStyle: { color: s.color || ['#91CC75', '#FAC858', '#EE6666'][i] }
      })) || [
        { name: 'Group A', type: 'scatter', symbolSize: 15, data: [[100, 40], [150, 55], [200, 60]], itemStyle: { color: '#91CC75' } },
        { name: 'Group B', type: 'scatter', symbolSize: 15, data: [[350, 70], [400, 75], [450, 80]], itemStyle: { color: '#FAC858' } },
        { name: 'Group C', type: 'scatter', symbolSize: 15, data: [[600, 85], [700, 90], [800, 95]], itemStyle: { color: '#EE6666' } }
      ],
      animationDuration: 1500
    })
  }
};

const backgrounds = {
  bar: '#1a1a2e',
  line: '#16213e',
  pie: '#0f3460',
  area: '#1a1a2e',
  radar: '#16213e',
  scatter: '#0f3460'
};

module.exports = { chartTemplates, backgrounds };

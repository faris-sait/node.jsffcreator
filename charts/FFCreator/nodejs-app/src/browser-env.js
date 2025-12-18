/**
 * Browser Environment Setup for ECharts in Node.js
 * This mocks the DOM environment required by ECharts
 */

const inkpaint = require('inkpaint');
const originalCreateCanvas = inkpaint.createCanvas;

// Patch canvas with DOM methods
inkpaint.createCanvas = function(width, height) {
  const canvas = originalCreateCanvas(width, height);
  canvas.addEventListener = () => {};
  canvas.removeEventListener = () => {};
  canvas.style = canvas.style || {};
  return canvas;
};

// Mock document
global.document = {
  createElement: (type) => {
    if (type === 'canvas') return inkpaint.createCanvas(1, 1);
    return {
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

// Mock window
global.window = {
  devicePixelRatio: 1,
  addEventListener: () => {},
  removeEventListener: () => {},
  getComputedStyle: () => ({ getPropertyValue: () => '' }),
  requestAnimationFrame: (cb) => setTimeout(cb, 16),
  cancelAnimationFrame: (id) => clearTimeout(id),
  document: global.document
};

// Mock navigator
global.navigator = { userAgent: 'node' };

// Mock Image
global.Image = class Image {
  constructor() {
    this.onload = null;
    this.onerror = null;
    this.src = '';
  }
};

module.exports = { inkpaint };

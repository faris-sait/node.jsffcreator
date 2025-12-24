# 🎬 30 VFX Story Videos Series

This folder contains 30 story-based videos for YouTube Shorts, each with unique visual narratives and VFX themes.

## Story 1: "Glitch in the Routine"

**The Story:** A man pours coffee, but as the liquid hits the cup, it turns into digital pixels. He touches his face, and his hand "glitches" into a wireframe.

**Visual Style:**
- Cold, sterile kitchen lighting contrasted with vibrant "digital errors"
- Data-moshing, RGB Splitting, and Frame Tearing effects
- "System Error" UI overlay with flickering warning signs
- Hex-code text scrolling vertically

## Setup Instructions

### 1. Add Your Image Asset

Place your main image in the `assets` folder:
```
story-videos/assets/glitch-routine-main.jpg
```

The image should be:
- Resolution: 1080x1920 (or higher for better quality)
- Format: JPG or PNG
- Content: The glitch coffee pour scene

### 2. Run the Video Generator

```bash
cd charts/FFCreator/examples
node story-videos/story-01-glitch-routine.js
```

### 3. Output Location

The generated video will be saved to:
```
examples/output/story-01-glitch-routine.mp4
```

## Video Specifications

| Property | Value |
|----------|-------|
| Resolution | 1080x1920 (9:16) |
| Format | MP4 |
| FPS | 30 |
| Duration | ~60 seconds |
| Platform | YouTube Shorts |

## Scene Breakdown

1. **System Initialization** (3s) - Boot sequence with hex codes
2. **The Morning Routine** (8s) - Main image with System Error overlay
3. **The Realization** (8s) - Narrative text with pixel effects
4. **The Wireframe Hand** (10s) - Key visual with wireframe detection
5. **System Error Cascade** (8s) - Multiple error messages
6. **The Awakening** (8s) - RGB split and simulation reveal
7. **Final Message** (7s) - CTA and hashtags
8. **End Card** (5s) - Philosophical question

## Color Palette

```javascript
// Glitch Colors
glitchCyan: '#00ffff'
glitchMagenta: '#ff00ff'
glitchRed: '#ff0040'
glitchGreen: '#00ff88'
glitchYellow: '#ffff00'

// Base Colors
darkBg: '#0a0a0f'
coldGray: '#1a1a2e'
matrixGreen: '#00ff41'
```

## Effects Used

- `fadeIn`, `fadeOut`, `fadeInLeft`, `fadeInRight`, `fadeInUp`, `fadeInDown`
- `zoomIn`, `bounceIn`, `backInUp`, `backInDown`, `backInRight`, `backInLeft`
- `rotateIn`
- Transitions: `shake`, `slice`, `windowshades`, `circlecrop`, `fastswitch`

---

## Series Progress

- [x] Story 1: Glitch in the Routine
- [ ] Story 2: TBD
- [ ] Story 3: TBD
- ... (28 more stories)

---

*Created with FFCreator - A lightweight video production library*

/**
 * 🎬 Story Videos Manager
 * 
 * Utility to run and manage all 30 story-based videos
 * 
 * Usage:
 *   node story-videos/run-story.js 1        # Run story 1
 *   node story-videos/run-story.js all      # Run all stories
 *   node story-videos/run-story.js list     # List all stories
 */

const path = require('path');
const fs = require('fs');
const colors = require('colors');

// Story metadata for all 30 stories
const STORIES = {
  1: {
    title: 'Glitch in the Routine',
    theme: 'VFX Narrative - Digital Glitch',
    file: 'story-01-glitch-routine.js',
    description: 'A man pours coffee, but the liquid turns into digital pixels. His hand glitches into wireframe.',
    tags: ['#VFXNarrative', '#GlitchArt', '#Simulation']
  },
  2: {
    title: 'Kinetic Dictionary: SONDER',
    theme: 'Kinetic Typography - High Contrast',
    file: 'story-02-kinetic-sonder.js',
    description: 'A rapid-fire explanation of "Sonder" - the realization that everyone has a complex life.',
    tags: ['#KineticTypography', '#Sonder', '#WordOfTheDay']
  },
  3: {
    title: 'Parallax Time-Travel: New York 1925',
    theme: 'History/Aesthetic - Sepia Vintage',
    file: 'story-03-parallax-timetravel.js',
    description: 'A 3D journey through a 1920s photograph of busy New York street with parallax depth.',
    tags: ['#ParallaxTimeTravel', '#1920s', '#History']
  },
  4: {
    title: 'Match-Cut Coffee: London → Santorini',
    theme: 'Seamless Transition - Travel Edit',
    file: 'story-04-matchcut-coffee.js',
    description: 'A traveler sips coffee in rainy London and puts the cup down in sunny Santorini.',
    tags: ['#MatchCut', '#TravelEdit', '#Transitions']
  },
  5: {
    title: 'Billionaire Pulse: Wealth Comparison',
    theme: 'Data Visualization - Scrolling Receipt',
    file: 'story-05-billionaire-pulse.js',
    description: 'Comparing $1 spending power vs Jeff Bezos net worth using a scrolling receipt visual.',
    tags: ['#WealthGap', '#DataViz', '#BillionairePulse']
  },
  6: {
    title: 'Paper-Tear Lookbook: Fall/Winter',
    theme: 'Fashion/Handmade - Scrapbook Aesthetic',
    file: 'story-06-papertear-lookbook.js',
    description: 'A model changes outfits by ripping the screen away with torn paper and scotch tape.',
    tags: ['#Lookbook', '#Fashion', '#OOTD']
  },
  7: {
    title: 'Luma-Fade Dreamscape: Golden Hour',
    theme: 'Poetic/Vibe - Dreamy Overexposed',
    file: 'story-07-lumafade-dreamscape.js',
    description: 'A visual poem about Golden Hour with dreamy light leaks and minimalist serif text.',
    tags: ['#GoldenHour', '#Dreamscape', '#VisualPoetry']
  },
  8: {
    title: 'UI Sim: Breakup',
    theme: 'Screen Narrative - Mobile UI Simulation',
    file: 'story-08-uisim-breakup.js',
    description: 'A story told through smartphone interface: typing texts, deleting, browsing old photos.',
    tags: ['#UISim', '#ScreenNarrative', '#Storytelling']
  },
  9: {
    title: 'Parallel Split',
    theme: 'Symmetry Narrative - Split Screen',
    file: 'story-09-parallel-split.js',
    description: 'Two versions of a day: one where the protagonist misses the bus, and one where they catch it.',
    tags: ['#ParallelSplit', '#Choices', '#ButterflyEffect']
  },
  10: {
    title: 'VHS Investigation',
    theme: 'True Crime/Suspense - VHS Found Footage',
    file: 'story-10-vhs-investigation.js',
    description: 'A found footage snippet of a mysterious door in the woods with analog VHS distortion.',
    tags: ['#TrueCrime', '#FoundFootage', '#Mystery']
  },
  11: {
    title: 'X-Ray Tech Breakdown',
    theme: 'Visualization - High-Tech X-Ray',
    file: 'story-11-xray-tech.js',
    description: 'A camera pans over a luxury watch, and an X-ray beam reveals the gears inside.',
    tags: ['#TechBreakdown', '#XRay', '#Engineering']
  },
  12: {
    title: 'Speed-Ramp Cook',
    theme: 'Action/Food - High-Energy Cooking',
    file: 'story-12-speedramp-cook.js',
    description: 'Making a complex ramen bowl in 60 seconds with speed ramping and impact effects.',
    tags: ['#SpeedCooking', '#Ramen', '#FoodChallenge']
  },
  13: {
    title: 'Minimalist Listicle',
    theme: 'Informative - Apple-Style Minimalist',
    file: 'story-13-minimalist-listicle.js',
    description: '3 Books That Will Change Your Mindset - clean, white-space heavy aesthetic.',
    tags: ['#BookRecommendations', '#MindsetBooks', '#Reading']
  },
  14: {
    title: 'Double Exposure Poet',
    theme: 'Artistic - Monochrome Double Exposure',
    file: 'story-14-double-exposure-poet.js',
    description: 'A person reciting a poem about the ocean while waves crash inside their silhouette.',
    tags: ['#VisualPoetry', '#DoubleExposure', '#Art']
  },
  15: {
    title: 'Morphing Evolution',
    theme: 'Concept Change - Automotive Evolution',
    file: 'story-15-morphing-evolution.js',
    description: 'The evolution of a car from 1920s Model T to futuristic flying concept with morph cuts and timeline slider.',
    tags: ['#CarEvolution', '#FutureCars', '#Automotive', '#MorphCut']
  },
  16: {
    title: 'Isometric City Stats',
    theme: 'Data/Map - Most Expensive Cities',
    file: 'story-16-isometric-city-stats.js',
    description: 'Comparing the most expensive cities with 3D tilt-shift miniature world and cash pillars rising from NYC, London, Tokyo.',
    tags: ['#CostOfLiving', '#ExpensiveCities', '#DataViz', '#Isometric']
  },
  17: {
    title: 'Blueprint to Reality',
    theme: 'Architecture - Sketch to Structure',
    file: 'story-17-blueprint-reality.js',
    description: 'A hand sketches a house on paper, and the lines grow into a real 3D building with technical callout measurements.',
    tags: ['#Architecture', '#Blueprint', '#Design', '#Transformation']
  },
  // Add more stories here as they are created
  // 18: { title: 'Story 18 Title', ... },
  // ...
};

// Banner
function showBanner() {
  console.log(colors.cyan('\n╔════════════════════════════════════════════════════════════╗'));
  console.log(colors.cyan('║') + colors.magenta('     🎬 30 STORY VIDEOS - VFX NARRATIVE SERIES 🎬         ') + colors.cyan('║'));
  console.log(colors.cyan('║') + colors.yellow('           YouTube Shorts Edition (1080x1920)              ') + colors.cyan('║'));
  console.log(colors.cyan('╚════════════════════════════════════════════════════════════╝\n'));
}

// List all stories
function listStories() {
  showBanner();
  console.log(colors.white('📚 Available Stories:\n'));
  
  Object.entries(STORIES).forEach(([num, story]) => {
    const status = fs.existsSync(path.join(__dirname, story.file)) ? colors.green('✓') : colors.red('✗');
    console.log(`  ${status} ${colors.cyan(`Story ${num}:`)} ${colors.white(story.title)}`);
    console.log(`     ${colors.gray(story.theme)}`);
    console.log(`     ${colors.gray(story.description.substring(0, 60))}...`);
    console.log('');
  });

  const created = Object.values(STORIES).filter(s => fs.existsSync(path.join(__dirname, s.file))).length;
  console.log(colors.yellow(`\n📊 Progress: ${created}/${Object.keys(STORIES).length} stories created\n`));
}

// Run a specific story
async function runStory(storyNum) {
  if (!STORIES[storyNum]) {
    console.log(colors.red(`\n❌ Story ${storyNum} not found!`));
    console.log(colors.yellow('Use "node run-story.js list" to see available stories.\n'));
    return;
  }

  const story = STORIES[storyNum];
  const storyPath = path.join(__dirname, story.file);

  if (!fs.existsSync(storyPath)) {
    console.log(colors.red(`\n❌ Story file not found: ${story.file}`));
    return;
  }

  showBanner();
  console.log(colors.green(`🎬 Running Story ${storyNum}: "${story.title}"\n`));
  console.log(colors.cyan(`   Theme: ${story.theme}`));
  console.log(colors.gray(`   ${story.description}\n`));
  console.log(colors.yellow('─'.repeat(60)));
  
  // Run the story script
  require(storyPath);
}

// Main
const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  showBanner();
  console.log(colors.white('Usage:'));
  console.log(colors.cyan('  node run-story.js <number>') + colors.gray('  - Run specific story'));
  console.log(colors.cyan('  node run-story.js list') + colors.gray('      - List all stories'));
  console.log(colors.cyan('  node run-story.js all') + colors.gray('       - Run all stories'));
  console.log('');
  console.log(colors.white('Examples:'));
  console.log(colors.gray('  node run-story.js 1'));
  console.log(colors.gray('  node run-story.js list'));
  console.log('');
} else if (command === 'list') {
  listStories();
} else if (command === 'all') {
  showBanner();
  console.log(colors.yellow('🔄 Running all stories...\n'));
  Object.keys(STORIES).forEach(num => runStory(parseInt(num)));
} else {
  const storyNum = parseInt(command);
  if (isNaN(storyNum)) {
    console.log(colors.red(`\n❌ Invalid command: ${command}`));
    console.log(colors.yellow('Use a number (1-30) or "list" / "all"\n'));
  } else {
    runStory(storyNum);
  }
}

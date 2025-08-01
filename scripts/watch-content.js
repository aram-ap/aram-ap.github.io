import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to watch
const blogContentDir = path.join(__dirname, '../src/content/blog');
const projectContentDir = path.join(__dirname, '../src/content/projects');

// Build script paths
const buildBlogScript = path.join(__dirname, 'build-blog.js');
const buildProjectsScript = path.join(__dirname, 'build-projects.js');

// Track file changes to avoid duplicate builds
let lastBuildTime = 0;
const BUILD_COOLDOWN = 2000; // 2 seconds cooldown between builds

// Debounce function to prevent multiple rapid executions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Function to run build scripts
async function runBuildScripts(changedFiles) {
  const now = Date.now();
  
  // Check if we're still in cooldown period
  if (now - lastBuildTime < BUILD_COOLDOWN) {
    console.log('⏳ Skipping build - still in cooldown period');
    return;
  }
  
  try {
    console.log(`🔄 Detected changes in: ${changedFiles.join(', ')}`);
    lastBuildTime = now;
    
    // Determine which build scripts to run based on what changed
    const blogChanged = changedFiles.some(file => file.includes('blog'));
    const projectsChanged = changedFiles.some(file => file.includes('projects'));
    
    if (blogChanged) {
      console.log('📝 Building blog data...');
      await execAsync(`node ${buildBlogScript}`);
      console.log('✅ Blog build completed');
    }
    
    if (projectsChanged) {
      console.log('🚀 Building project data...');
      await execAsync(`node ${buildProjectsScript}`);
      console.log('✅ Projects build completed');
    }
    
    console.log('🎉 All builds completed successfully!');
    console.log('🔄 Vite will automatically reload the page...');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
  }
}

// Debounced version of the build function
const debouncedBuild = debounce(runBuildScripts, 1000);

// File watcher function
function watchDirectory(dirPath, label) {
  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️  Directory ${dirPath} does not exist. Creating...`);
    fs.mkdirSync(dirPath, { recursive: true });
  }

  console.log(`👀 Watching ${label} directory: ${dirPath}`);
  
  fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
    if (filename && (filename.endsWith('.md') || filename.endsWith('.js'))) {
      console.log(`📁 ${eventType}: ${filename} in ${label}`);
      debouncedBuild([`${label}/${filename}`]);
    }
  });
}

// Function to check if directories exist and create them if needed
function ensureDirectoriesExist() {
  const dirs = [blogContentDir, projectContentDir];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      console.log(`📁 Creating directory: ${dir}`);
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Main function
function startWatching() {
  console.log('🚀 Starting content watcher...');
  console.log('📝 Will automatically rebuild when blog or project files change');
  console.log('⏹️  Press Ctrl+C to stop watching');
  console.log('');

  // Ensure directories exist
  ensureDirectoriesExist();

  // Watch blog content directory
  watchDirectory(blogContentDir, 'blog');
  
  // Watch project content directory
  watchDirectory(projectContentDir, 'projects');
  
  console.log('');
  console.log('✨ Watcher is now active!');
  console.log('   - Blog files: src/content/blog/*.md');
  console.log('   - Project files: src/content/projects/*.md');
  console.log('   - Changes will trigger automatic rebuilds');
  console.log('   - Vite will reload the page after builds');
  console.log('');
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Stopping content watcher...');
  process.exit(0);
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('\n👋 Stopping content watcher...');
  process.exit(0);
});

// Start the watcher
startWatching(); 
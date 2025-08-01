import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to run initial builds
async function runInitialBuilds() {
  console.log('🔨 Running initial builds...');
  
  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  const execAsync = promisify(exec);
  
  try {
    console.log('📝 Building blog data...');
    await execAsync('npm run build-blog');
    console.log('✅ Blog build completed');
    
    console.log('🚀 Building project data...');
    await execAsync('npm run build-projects');
    console.log('✅ Projects build completed');
    
    console.log('🎉 Initial builds completed!');
  } catch (error) {
    console.error('❌ Initial build failed:', error.message);
    process.exit(1);
  }
}

// Function to start a process and handle its output
function startProcess(command, args, label, color = '\x1b[36m') {
  const reset = '\x1b[0m';
  const process = spawn(command, args, { 
    stdio: 'pipe',
    shell: true 
  });
  
  process.stdout.on('data', (data) => {
    console.log(`${color}[${label}]${reset} ${data.toString().trim()}`);
  });
  
  process.stderr.on('data', (data) => {
    console.log(`${color}[${label}]${reset} ${data.toString().trim()}`);
  });
  
  process.on('close', (code) => {
    console.log(`${color}[${label}]${reset} Process exited with code ${code}`);
  });
  
  process.on('error', (error) => {
    console.error(`${color}[${label}]${reset} Error:`, error);
  });
  
  return process;
}

// Main function
async function startDevWithWatch() {
  console.log('🚀 Starting development server with content watching...');
  console.log('📝 This will run both the content watcher and Vite dev server');
  console.log('⏹️  Press Ctrl+C to stop all processes');
  console.log('');
  
  // Run initial builds
  await runInitialBuilds();
  
  console.log('');
  console.log('🔄 Starting processes...');
  console.log('');
  
  // Start the content watcher
  const watcher = startProcess('node', ['scripts/watch-content.js'], 'WATCHER', '\x1b[33m');
  
  // Wait a moment for watcher to start
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Start the Vite dev server
  const vite = startProcess('npm', ['run', 'dev'], 'VITE', '\x1b[32m');
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down all processes...');
    watcher.kill('SIGINT');
    vite.kill('SIGINT');
    
    // Give processes time to clean up
    setTimeout(() => {
      process.exit(0);
    }, 1000);
  });
  
  process.on('SIGTERM', () => {
    console.log('\n👋 Shutting down all processes...');
    watcher.kill('SIGTERM');
    vite.kill('SIGTERM');
    
    setTimeout(() => {
      process.exit(0);
    }, 1000);
  });
}

// Start the development environment
startDevWithWatch().catch(error => {
  console.error('❌ Failed to start development environment:', error);
  process.exit(1);
}); 
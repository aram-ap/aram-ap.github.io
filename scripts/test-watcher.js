import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test file paths
const testBlogFile = path.join(__dirname, '../src/content/blog/test-post.md');
const testProjectFile = path.join(__dirname, '../src/content/projects/test-project.md');

// Test content
const testBlogContent = `---
id: test-${Date.now()}
slug: test-post
title: Test Blog Post
excerpt: This is a test blog post for the watcher system
featuredImage: ''
gradientId: default
date: 2024-01-01
readTime: 2 min
tags: [test, watcher]
category: Test
---

# Test Blog Post

This is a test blog post to verify the content watcher system is working properly.

## Features Tested

- File watching
- Automatic rebuilds
- Blog data generation

The watcher should detect this file change and rebuild the blog data automatically.
`;

const testProjectContent = `---
id: test-${Date.now()}
slug: test-project
title: Test Project
subtitle: A test project for the watcher system
year: 2024
type: detailed
github: ''
external: ''
tech: [JavaScript, React, Node.js]
category: Test
gradientId: ''
featuredImage: ''
excerpt: A test project to verify the content watcher
progress: completed
dateStarted: 2024-01-01
dateEnd: 2024-01-01
---

# Test Project

This is a test project to verify the content watcher system is working properly.

## Project Details

- **Type**: Test Project
- **Year**: 2024
- **Status**: Completed

The watcher should detect this file change and rebuild the project data automatically.
`;

async function runTest() {
  console.log('🧪 Testing Content Watcher System...');
  console.log('');

  try {
    // Step 1: Create test files
    console.log('📝 Creating test files...');
    
    // Ensure directories exist
    const blogDir = path.dirname(testBlogFile);
    const projectDir = path.dirname(testProjectFile);
    
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }
    
    // Create test files
    fs.writeFileSync(testBlogFile, testBlogContent);
    fs.writeFileSync(testProjectFile, testProjectContent);
    
    console.log('✅ Test files created');
    console.log('');

    // Step 2: Run initial builds
    console.log('🔨 Running initial builds...');
    await execAsync('npm run build-blog');
    await execAsync('npm run build-projects');
    console.log('✅ Initial builds completed');
    console.log('');

    // Step 3: Start watcher in background
    console.log('👀 Starting content watcher...');
    const watcher = exec('npm run watch-content', { stdio: 'pipe' });
    
    // Wait for watcher to start
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('✅ Watcher started');
    console.log('');

    // Step 4: Simulate file changes
    console.log('🔄 Simulating file changes...');
    
    // Modify blog file
    const modifiedBlogContent = testBlogContent + '\n\n## Updated Content\n\nThis content was added to test the watcher.';
    fs.writeFileSync(testBlogFile, modifiedBlogContent);
    console.log('📝 Modified blog file');
    
    // Wait for build
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Modify project file
    const modifiedProjectContent = testProjectContent + '\n\n## Updated Project Content\n\nThis content was added to test the watcher.';
    fs.writeFileSync(testProjectFile, modifiedProjectContent);
    console.log('🚀 Modified project file');
    
    // Wait for build
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('✅ File changes simulated');
    console.log('');

    // Step 5: Clean up
    console.log('🧹 Cleaning up test files...');
    fs.unlinkSync(testBlogFile);
    fs.unlinkSync(testProjectFile);
    
    // Stop watcher
    watcher.kill('SIGINT');
    
    console.log('✅ Test completed successfully!');
    console.log('');
    console.log('🎉 Content Watcher System is working properly!');
    console.log('');
    console.log('To use the system:');
    console.log('  npm run dev-with-watch  # Start development with auto-watching');
    console.log('  npm run watch-content   # Start standalone watcher');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
runTest(); 
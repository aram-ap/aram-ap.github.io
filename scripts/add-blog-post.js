#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function addBlogPost() {
  console.log('📝 Blog Post Creator\n');

  try {
    // Get blog post data
    const title = await question('Title: ');
    const excerpt = await question('Excerpt: ');
    const featuredImage = await question('Featured Image Path (e.g., /src/assets/my-image.jpg, or press Enter to skip): ');
    const gradientId = await question('Fallback Gradient (default/sunset/ocean/forest/fire/space/tech/warm/cool/minimal, or press Enter for default): ') || 'default';
    const category = await question('Category (Web Development/Science/Technology): ');
    const tags = await question('Tags (comma-separated): ');
    const readTime = await question('Read time (e.g., "5 min read"): ');
    
    console.log('\n📝 Content (press Enter twice when done):');
    let content = '';
    let line;
    let emptyLines = 0;
    
    while (true) {
      line = await question('');
      if (line === '') {
        emptyLines++;
        if (emptyLines >= 2) break;
      } else {
        emptyLines = 0;
      }
      content += line + '\n';
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    // Generate ID (timestamp)
    const id = Date.now();

    // Create blog post object
    const blogPost = {
      id,
      slug,
      title,
      excerpt,
      featuredImage: featuredImage || null,
      gradientId,
      content: content.trim(),
      date: new Date().toISOString().split('T')[0],
      readTime,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      category
    };

    // Read current blog data
    const blogDataPath = path.join(__dirname, '../src/utils/blogData.js');
    let blogDataContent = fs.readFileSync(blogDataPath, 'utf8');

    // Find the blogPosts array and add the new post
    const blogPostsMatch = blogDataContent.match(/export const blogPosts = \[([\s\S]*?)\];/);
    
    if (blogPostsMatch) {
      const postsContent = blogPostsMatch[1];
      const newPostString = `\n  ${JSON.stringify(blogPost, null, 4).split('\n').join('\n  ')},`;
      
      // Insert the new post at the beginning of the array
      const updatedContent = blogDataContent.replace(
        /export const blogPosts = \[/,
        `export const blogPosts = [${newPostString}`
      );

      // Write back to file
      fs.writeFileSync(blogDataPath, updatedContent);
      
      console.log('\n✅ Blog post added successfully!');
      console.log(`📄 File: ${blogDataPath}`);
      console.log(`🔗 URL: /blog/${slug}`);
    } else {
      console.error('❌ Could not find blogPosts array in the file');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

addBlogPost(); 
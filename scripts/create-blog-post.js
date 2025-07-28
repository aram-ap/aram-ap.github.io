import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

const createBlogPost = async () => {
  console.log('📝 Creating a new blog post...\n');

  try {
    // Get user input
    const title = await question('Title: ');
    const excerpt = await question('Excerpt: ');
    const category = await question('Category (Web Development/Embedded/Projects/Science/Technology): ');
    const tags = await question('Tags (comma-separated): ');
    const readTime = await question('Read time (e.g., "5 min read"): ');
    const featuredImage = await question('Featured image path (optional): ');
    
    // Generate metadata
    const slug = generateSlug(title);
    const id = Date.now();
    const date = new Date().toISOString().split('T')[0];
    const gradientId = 'default';
    
    // Create frontmatter
    const frontmatter = `---
id: ${id}
slug: ${slug}
title: ${title}
excerpt: ${excerpt}
featuredImage: ${featuredImage || ''}
gradientId: ${gradientId}
date: ${date}
readTime: ${readTime}
tags: [${tags.split(',').map(tag => tag.trim()).join(', ')}]
category: ${category}
---

# ${title}

Write your blog post content here...

## Introduction

Start with an engaging introduction...

## Main Content

Add your main content here...

## Conclusion

Wrap up your post with a strong conclusion...
`;

    // Create filename
    const filename = `${slug}.md`;
    const filepath = path.join(__dirname, '../src/content/blog', filename);
    
    // Write the file
    fs.writeFileSync(filepath, frontmatter);
    
    console.log(`\n✅ Blog post created successfully!`);
    console.log(`📁 File: ${filepath}`);
    console.log(`🔗 Slug: ${slug}`);
    console.log(`\n📝 Next steps:`);
    console.log(`1. Edit the content in ${filepath}`);
    console.log(`2. Run 'npm run build-blog' to regenerate the blog data`);
    console.log(`3. Start the dev server with 'npm run dev'`);
    
  } catch (error) {
    console.error('❌ Error creating blog post:', error);
  } finally {
    rl.close();
  }
};

createBlogPost(); 
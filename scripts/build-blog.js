import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

/**
 * Blog build script that converts markdown files to JavaScript data
 * Processes frontmatter and generates blog post data for the application
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the content directory if it doesn't exist
const contentDir = path.join(__dirname, '../src/content/blog');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Read all markdown files from the content directory
const blogFiles = fs.readdirSync(contentDir)
  .filter(file => file.endsWith('.md'))
  .map(file => {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: markdownContent } = matter(content);
    const slug = file.replace('.md', '');
    
    return {
      id: data.id || Date.now(),
      slug: data.slug || slug,
      title: data.title,
      excerpt: data.excerpt,
      featuredImage: data.featuredImage,
      gradientId: data.gradientId || 'default',
      content: markdownContent,
      date: data.date,
      readTime: data.readTime,
      tags: data.tags || [],
      category: data.category
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// Generate the JavaScript file
const jsContent = `// Auto-generated from markdown files
// Run 'npm run build-blog' to regenerate this file

export const blogPosts = ${JSON.stringify(blogFiles, null, 2)};

// Utility functions
export const getPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category) => {
  if (category === "All") return blogPosts;
  return blogPosts.filter(post => post.category === category);
};

export const searchPosts = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(term) ||
    post.excerpt.toLowerCase().includes(term) ||
    post.tags.some(tag => tag.toLowerCase().includes(term)) ||
    post.content.toLowerCase().includes(term)
  );
};

export const getCategories = () => {
  const categories = [...new Set(blogPosts.map(post => post.category))];
  return ["All", ...categories];
};

export const getTags = () => {
  const allTags = blogPosts.flatMap(post => post.tags);
  return [...new Set(allTags)];
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper function to create a new blog post file
export const createBlogPost = (postData) => {
  const frontmatter = \`---
id: \${postData.id}
slug: \${postData.slug}
title: \${postData.title}
excerpt: \${postData.excerpt}
featuredImage: \${postData.featuredImage || ''}
gradientId: \${postData.gradientId || 'default'}
date: \${postData.date}
readTime: \${postData.readTime}
tags: [\${postData.tags.join(', ')}]
category: \${postData.category}
---

\${postData.content}\`;

  return frontmatter;
};
`;

// Write the generated file
const outputPath = path.join(__dirname, '../src/utils/blogDataGenerated.js');
fs.writeFileSync(outputPath, jsContent);

console.log(`✅ Generated blog data from ${blogFiles.length} markdown files`);
console.log(`📁 Output: ${outputPath}`);
console.log(`📝 Posts: ${blogFiles.map(p => p.title).join(', ')}`); 
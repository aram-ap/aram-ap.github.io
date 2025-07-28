# Blog System Guide

## File-Based Blog System

This project uses a file-based blog system where each blog post is stored as a separate markdown file. This helps keep things clean and organized

## File Structure

```
src/
  content/
    blog/
      building-a-modern-portfolio-with-react.md
      your-next-blog-post.md
      another-post.md
  utils/
    blogDataGenerated.js    # Auto-generated from markdown files
  scripts/
    build-blog.js          # Build script to generate blog data
    create-blog-post.js    # CLI tool to create new posts
```

## Creating a New Blog Post

### Method 1: Using the CLI Tool

```bash
npm run create-post
```
This will guide you through creating a new blog post interactively.

### Method 2: Using the Blog Editor
1. Go to `/blog-editor` in your app
2. Fill in all the required fields
3. Click "Generate Markdown File"
4. Copy the generated markdown content
5. Create a new `.md` file in `src/content/blog/`
6. Paste the content and save
7. Run `npm run build-blog` to regenerate the blog data

### Method 3: Manual Creation
Create a new `.md` file in `src/content/blog/` with this structure:

```markdown
---
id: 1234567890
slug: your-post-slug
title: Your Post Title
excerpt: Brief description of your post
featuredImage: /images/blog/your-image.jpg
gradientId: default
date: 2025-01-15
readTime: 5 min read
tags: [Web Development, React, Tutorial]
category: Tutorial
---

# Your Post Title

Your content here...

## Section 1

More content...

## Section 2

Even more content...
```

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique identifier (timestamp works) |
| `slug` | Yes | URL-friendly version of title |
| `title` | Yes | Post title |
| `excerpt` | Yes | Brief description |
| `featuredImage` | No | Path to featured image |
| `gradientId` | No | Fallback gradient (default: "default") |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `readTime` | Yes | Estimated reading time |
| `tags` | Yes | Array of tags |
| `category` | Yes | Post category |


## Best Practices

1. **Use descriptive slugs**: `building-a-modern-portfolio` not `post-1`
2. **Include relevant tags**: Helps with search and discovery
3. **Write good excerpts**: 1-2 sentences that summarize the post
4. **Use proper markdown**: Headers, lists, code blocks, etc.
5. **Optimize images**: Keep featured images under 1MB
6. **Test your posts**: Preview before publishing

## Adding Images

1. Place images in `/public/images/blog/`
2. Reference them in frontmatter: `featuredImage: /images/blog/your-image.jpg`
3. Use the Image Upload Helper in the blog editor

## Build Process

1. **Development**: Run `npm run dev` - automatically builds blog data
2. **Production**: Run `npm run build` - automatically builds blog data
3. **Manual**: Run `npm run build-blog` to regenerate blog data
4. **New Posts**: Run `npm run create-post` to create new posts

## Future Enhancements

- Draft posts (unpublished)
- Scheduled posts
- Rich text editor
- Image optimization
- SEO meta tags
- Social media previews

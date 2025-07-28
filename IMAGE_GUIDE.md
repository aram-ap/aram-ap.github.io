# Blog Image Guide

## Adding Featured Images to Blog Posts

blog system supports images that appear at the top of each blog post and in the blog listing cards.

## How to Add Images

### Option 1: Using the Web Editor
1. Go to `/blog-editor` in your browser
2. Fill out your blog post details
3. In the "Featured Image Path" field, either:
   - Type the path manually (e.g., `/src/assets/my-image.jpg`)
   - Use the image picker below the field to select from available images
4. Choose a fallback gradient in the "Fallback Gradient" section
5. The selected image/gradient will automatically appear in the preview

### Option 2: Using the Command Line
```bash
npm run add-post
```
When prompted for "Featured Image Path", enter the path to your image.

### Option 3: Manual File Editing
Add the `featuredImage` and `gradientId` fields to your blog post in `src/utils/blogData.js`:

```javascript
{
  id: 5,
  slug: "my-new-post",
  title: "My New Post",
  excerpt: "Brief description...",
  featuredImage: "/src/assets/my-image.jpg", // Optional: path to image
  gradientId: "default", // Fallback gradient if no image
  content: `# My content...`,
  // ... other fields
}
```

## Image File Locations

### Current Available Images
- `/src/assets/me.jpg` - Your profile photo
- `/src/assets/space.jpg` - Space background
- `/src/assets/nyc.jpg` - NYC skyline
- `/src/assets/logo.png` - Your logo
- `/src/assets/logo.svg` - SVG version of logo
- `/src/assets/ufo.gif` - Animated UFO

## Available Gradients

If no featured image is provided, these gradients will be used as fallbacks:

- **default**: Default Purple (`#a259f7` to `#4ade80`)
- **sunset**: Sunset (`#ff6b6b` to `#feca57`)
- **ocean**: Ocean (`#667eea` to `#764ba2`)
- **forest**: Forest (`#11998e` to `#38ef7d`)
- **fire**: Fire (`#ff416c` to `#ff4b2b`)
- **space**: Space (`#0c0c0c` to `#3a3a3a`)
- **tech**: Tech Blue (`#667eea` to `#764ba2`)
- **warm**: Warm Orange (`#ff9a9e` to `#fecfef`)
- **cool**: Cool Blue (`#a8edea` to `#fed6e3`)
- **minimal**: Minimal Gray (`#f5f7fa` to `#c3cfe2`)

### Adding New Images
1. Place your image file in the `src/assets/` folder
2. Use the path `/src/assets/your-image-name.jpg` in your blog post
3. Formats: JPG, PNG, GIF, SVG, WebP

## Image Guidelines

### Recommended Specs
- **Aspect Ratio**: 16:9 or 2:1 (landscape)
- **Minimum Size**: 1200x600 pixels
- **File Size**: Under 500KB for optimal loading
- **Format**: JPG for photos, PNG for graphics with transparency

## 🔧 Technical Details

### How It Works
- Images are displayed using the `<img>` tag with `object-fit: cover`
- Featured images appear at the top of individual blog posts
- Blog listing cards show a cropped version of the featured image
- If no featured image is provided, a gradient placeholder is shown

### Image Paths
- **Development**: Images are served from the `src/assets/` folder
- **Production**: Images are copied to the build folder during build process
- **GitHub Pages**: Images are served from the root of your repository

## Quick Start

1. **Add an image** to `src/assets/your-image.jpg`
2. **Create a blog post** using any of the methods above
3. **Set the featured image path** to `/src/assets/your-image.jpg`
4. **Preview your post** to see the image in action

## Examples

### Example Blog Post with Image
```javascript
{
  id: 6,
  slug: "my-tech-article",
  title: "My Tech Article",
  excerpt: "An interesting article about technology...",
  featuredImage: "/src/assets/me.jpg",
  gradientId: "tech", // Fallback gradient
  content: `# My Tech Article\n\nYour content here...`,
  date: "2024-01-20",
  readTime: "5 min read",
  tags: ["Technology", "Programming"],
  category: "Technology"
}
```

### Example Blog Post with Gradient Only
```javascript
{
  id: 7,
  slug: "my-article-no-image",
  title: "My Article Without Image",
  excerpt: "An article that uses a gradient instead of an image...",
  // featuredImage: null, // No image provided
  gradientId: "sunset", // Will use sunset gradient
  content: `# My Article\n\nYour content here...`,
  date: "2024-01-20",
  readTime: "3 min read",
  tags: ["General"],
  category: "Technology"
}
```

### Image in Markdown Content
You can also include images within your blog post content:

```markdown
# My Blog Post

Here's an image within the content:

![Description of image](/src/assets/my-image.jpg)

More content here...
```

## Troubleshooting

### Image Not Showing
1. Check the file path is correct
2. Ensure the image file exists in `src/assets/`
3. Verify the image format is supported
4. Check browser console for errors

### Image Too Large/Small
- The system automatically crops and scales images
- Use `object-fit: cover` for consistent display
- Consider the aspect ratio when choosing images

### Performance Issues
- Optimize images before adding them
- Use WebP format for better compression
- Consider lazy loading for multiple images

## 📝 Notes

- Images are automatically optimized during the build process
- The system supports responsive images
- Featured images are optional - posts work fine without them
- You can change featured images by updating the `featuredImage` field

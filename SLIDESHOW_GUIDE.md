# Slideshow Guide for Blog Posts

This guide explains how to add interactive slideshows to your blog posts using the blog editor.

## Overview

Slideshows allow you to create interactive presentations within your blog posts. They can include images, titles, descriptions, and bullet points that are displayed in an engaging slideshow format.

## How to Add Slideshows

### 1. Create a Slideshow in the Blog Editor

1. Open the blog editor
2. Scroll down to the "Slideshows" section
3. Click "Add Slideshow" to create a new slideshow
4. Give your slideshow a unique ID (e.g., "development-process")
5. Add slides with images and content

### 2. Embed Slideshows in Your Content

Use the following comment syntax in your markdown content:

```markdown
<!-- slideshow:slideshow-id:mode -->
```

**Parameters:**
- `slideshow-id`: The ID of your slideshow (e.g., "development-process")
- `mode`: The interaction mode (optional)
  - `buttons`: Navigation with arrow buttons (default)
  - `scroll`: Scroll-based navigation

**Examples:**
```markdown
<!-- slideshow:development-process:buttons -->
<!-- slideshow:my-slideshow:scroll -->
<!-- slideshow:simple-slideshow -->
```

### 3. Slideshow Structure

Each slideshow consists of slides with the following structure:

```javascript
{
  id: "slideshow-id",
  title: "Slideshow Title",
  slides: [
    {
      image: "/images/blog/my-image.jpg",
      imageTitle: "Optional image title",
      imageCaption: "Optional image caption",
      content: {
        title: "Slide content title",
        description: "Detailed description",
        points: [
          "Point 1",
          "Point 2",
          "Point 3"
        ]
      }
    }
  ]
}
```

## Features

### Slideshow Modes

- **Buttons Mode**: Traditional slideshow with navigation buttons
- **Scroll Mode**: Slides change as the user scrolls through the content

### Slideshow Options

- **Auto-play**: Automatically advance slides
- **Indicators**: Show slide position dots
- **Navigation**: Show previous/next buttons
- **Zoom**: Allow image expansion on click
- **Full-bleed**: Extend slideshow to full width

### Image Support

- Supports all common image formats (JPG, PNG, GIF, WebP)
- Images should be placed in the `public/images/blog/` directory
- Use relative paths starting with `/images/blog/`

## Best Practices

1. **Use descriptive IDs**: Choose meaningful slideshow IDs that reflect the content
2. **Optimize images**: Compress images for faster loading
3. **Keep slides focused**: Each slide should have a clear, focused message
4. **Test on mobile**: Ensure slideshows work well on mobile devices
5. **Use consistent styling**: Maintain visual consistency across slides

## Example Usage

Here's a complete example of a blog post with a slideshow:

```markdown
# My Blog Post

This is the introduction to my blog post.

<!-- slideshow:development-process:buttons -->

## Conclusion

This concludes my blog post with an interactive slideshow.
```

The slideshow will appear between the introduction and conclusion, providing an interactive way to present information.

## Troubleshooting

### Slideshow Not Appearing
- Check that the slideshow ID matches exactly
- Ensure the slideshow has at least one slide
- Verify the comment syntax is correct

### Images Not Loading
- Check that image paths are correct
- Ensure images are in the `public/images/blog/` directory
- Verify image file permissions

### Performance Issues
- Optimize image sizes
- Consider using WebP format for better compression
- Limit the number of slides for better performance 
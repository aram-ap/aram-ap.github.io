// Blog Post Template
// Copy this template and modify it to create a new blog post

const newBlogPost = {
  id: 5, // Increment this number for each new post
  slug: "your-post-slug-here", // URL-friendly version of your title
  title: "Your Blog Post Title",
  excerpt: "A brief description of your blog post that appears in the blog listing page.",
  featuredImage: "/src/assets/your-image.jpg", // Path to your featured image (optional)
  gradientId: "default", // Fallback gradient if no image is provided
  content: `
# Your Blog Post Title

Start your blog post content here. You can use full markdown formatting.

## Subheadings

Use ## for subheadings like this.

### Code Examples

You can include code examples:

\`\`\`javascript
function example() {
  return "Hello, World!";
}
\`\`\`

### Lists

You can create lists:

- First item
- Second item
- Third item

### Blockquotes

> This is a blockquote. You can use it for quotes or important information.

### Links

You can include [links](https://example.com) in your content.

### Images

You can reference images (make sure to add them to your assets folder):

![Alt text](path/to/image.jpg)

### Featured Image

The featured image will appear at the top of your blog post. Make sure to:
1. Add your image to the src/assets/ folder
2. Update the featuredImage path in the blog post data
3. Use a high-quality image (recommended: 1200x600px or larger)

### Fallback Gradient

If no featured image is provided, a gradient will be used instead. Available gradients:
- default: Default Purple
- sunset: Sunset
- ocean: Ocean
- forest: Forest
- fire: Fire
- space: Space
- tech: Tech Blue
- warm: Warm Orange
- cool: Cool Blue
- minimal: Minimal Gray

## Conclusion

End your blog post with a conclusion or call to action.
  `,
  date: "2024-01-20", // Use YYYY-MM-DD format
  readTime: "5 min read", // Estimate reading time
  tags: ["Tag1", "Tag2", "Tag3"], // Add relevant tags
  category: "Web Development" // Choose from: Web Development, Science, Technology
};

// To add this post to your blog:
// 1. Copy this template
// 2. Modify the content
// 3. Add it to the blogPosts array in src/utils/blogData.js
// 4. Make sure the id is unique 
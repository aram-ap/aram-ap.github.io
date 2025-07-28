import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiSave, FiPlus, FiEdit, FiTrash2, FiCopy, FiCalendar, FiTag, FiClock, FiImage } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighterComponent from "./SyntaxHighlighter";
import ImageUploadHelper from "./ImageUploadHelper";
import GradientSelector from "./GradientSelector";
import MarkdownEditor from "./MarkdownEditor";
import SlideshowEditor from "./SlideshowEditor";
import Slideshow from "./Slideshow";
import { getGradientById } from "../utils/gradients";
import { createBlogPost } from "../utils/blogDataGenerated";

const EditorContainer = styled.div`
  padding-top: 120px;
  padding-bottom: ${(props) => props.theme.spacing.xxl};
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.lg};
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 5px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.typography.fontSizes.hero};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const Form = styled.form`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: 16px;
  padding: ${(props) => props.theme.spacing.xl};
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.backgroundTertiary};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.md};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: ${(props) => props.theme.spacing.md};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.backgroundTertiary};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.md};
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.backgroundTertiary};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.md};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

const Button = styled(motion.button)`
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
  background: ${(props) => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};

  &:hover {
    background: ${(props) => props.theme.colors.accentDark};
  }
`;

const PreviewSection = styled.div`
  margin-top: ${(props) => props.theme.spacing.xl};
  padding-top: ${(props) => props.theme.spacing.xl};
  border-top: 1px solid ${(props) => props.theme.colors.border};
`;

const PreviewTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const PreviewContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PreviewFeaturedImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${(props) => props.theme.animations.normal};
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 70%,
      rgba(0, 0, 0, 0.3) 100%
    );
  }
`;

const PreviewHeader = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.xxl};
`;

const PreviewPostTitle = styled.h1`
  font-size: ${(props) => props.theme.typography.fontSizes.hero};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md};
  line-height: ${(props) => props.theme.typography.lineHeights.tight};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.typography.fontSizes.xxl};
  }
`;

const PreviewMeta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  color: ${(props) => props.theme.colors.textSecondary};
  flex-wrap: wrap;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    gap: ${(props) => props.theme.spacing.md};
  }
`;

const PreviewMetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
`;

const PreviewTags = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  flex-wrap: wrap;
`;

const PreviewTag = styled.span`
  background: ${(props) => props.theme.colors.backgroundTertiary};
  color: ${(props) => props.theme.colors.accent};
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: 20px;
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const PreviewContent = styled.div`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: 16px;
  padding: ${(props) => props.theme.spacing.xl};
  border: 1px solid ${(props) => props.theme.colors.border};
  line-height: ${(props) => props.theme.typography.lineHeights.relaxed};

  /* Markdown styling */
  h1, h2, h3, h4, h5, h6 {
    color: ${(props) => props.theme.colors.text};
    margin-top: ${(props) => props.theme.spacing.xl};
    margin-bottom: ${(props) => props.theme.spacing.md};
    font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  }

  h1 {
    font-size: ${(props) => props.theme.typography.fontSizes.xxl};
  }

  h2 {
    font-size: ${(props) => props.theme.typography.fontSizes.xl};
  }

  h3 {
    font-size: ${(props) => props.theme.typography.fontSizes.lg};
  }

  p {
    margin-bottom: ${(props) => props.theme.spacing.md};
    color: ${(props) => props.theme.colors.textSecondary};
  }

  ul, ol {
    margin-bottom: ${(props) => props.theme.spacing.md};
    padding-left: ${(props) => props.theme.spacing.lg};
  }

  li {
    margin-bottom: ${(props) => props.theme.spacing.xs};
    color: ${(props) => props.theme.colors.textSecondary};
  }

  code {
    background: ${(props) => props.theme.colors.backgroundTertiary};
    color: ${(props) => props.theme.colors.accent};
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
    word-break: break-all;
    white-space: pre-wrap;
  }

  pre {
    background: transparent;
    padding: ${(props) => props.theme.spacing.md};
    border-radius: 8px;
    overflow-x: auto;
    margin: ${(props) => props.theme.spacing.md} 0;
    max-width: 100%;
    word-wrap: break-word;
    white-space: pre-wrap;
  }

  pre code {
    background: none;
    padding: 0;
    word-break: break-all;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    max-width: 100%;
  }

  blockquote {
    border-left: 4px solid ${(props) => props.theme.colors.accent};
    padding-left: ${(props) => props.theme.spacing.md};
    margin: ${(props) => props.theme.spacing.md} 0;
    font-style: italic;
    color: ${(props) => props.theme.colors.textSecondary};
  }

  a {
    color: ${(props) => props.theme.colors.accent};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: ${(props) => props.theme.spacing.md} 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: ${(props) => props.theme.spacing.md} 0;
  }

  th, td {
    padding: ${(props) => props.theme.spacing.sm};
    border: 1px solid ${(props) => props.theme.colors.border};
    text-align: left;
  }

  th {
    background: ${(props) => props.theme.colors.backgroundTertiary};
    font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const SuccessMessage = styled(motion.div)`
  background: #10b981;
  color: white;
  padding: ${(props) => props.theme.spacing.md};
  border-radius: 8px;
  margin-top: ${(props) => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const UnsavedChangesIndicator = styled(motion.div)`
  background: #f59e0b;
  color: white;
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  border-radius: 8px;
  margin-bottom: ${(props) => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const GeneratedDataContainer = styled(motion.div)`
  margin-top: ${(props) => props.theme.spacing.lg};
  padding: ${(props) => props.theme.spacing.lg};
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
`;

const GeneratedDataTitle = styled.h4`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md};
  font-size: ${(props) => props.theme.typography.fontSizes.lg};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const GeneratedDataTextarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: ${(props) => props.theme.spacing.md};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.backgroundTertiary};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  resize: vertical;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

const GeneratedDataActions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.button)`
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  background: ${(props) => props.$variant === 'secondary' ? 'transparent' : props.theme.colors.accent};
  color: ${(props) => props.$variant === 'secondary' ? props.theme.colors.text : 'white'};
  border: 2px solid ${(props) => props.$variant === 'secondary' ? props.theme.colors.border : props.theme.colors.accent};
  border-radius: 8px;
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};

  &:hover {
    background: ${(props) => props.$variant === 'secondary' ? props.theme.colors.backgroundTertiary : props.theme.colors.accentDark};
  }
`;

/**
 * Blog Editor component with markdown editing capabilities
 * Features: live preview, syntax highlighting, image upload, gradient selection
 */
const BlogEditor = () => {
  // Form state for blog post data
  const [formData, setFormData] = useState({
    id: "",
    slug: "",
    title: "",
    excerpt: "",
    featuredImage: "",
    gradientId: "default",
          content: `# Welcome to the Markdown Editor!

This is a **markdown editor** with live preview capabilities.

## Features

- **Bold text** and *italic text*
- \`Inline code\` and code blocks
- Lists and numbered lists
- Links and images
- And much more!

### Try it out:

1. Use the toolbar buttons above
2. Switch between Edit, Preview, and Split views
3. See your content rendered in real-time

\`\`\`javascript
// You can even write code blocks!
function hello() {
  return "Hello, Markdown!";
}
\`\`\`

> This is a blockquote. Perfect for highlighting important information.

[Learn more about Markdown](https://www.markdownguide.org/)`,
    date: new Date().toISOString().split('T')[0],
    readTime: "5 min read",
    tags: "",
    category: "Web Development"
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [hasBeenSaved, setHasBeenSaved] = useState(false);
  const [generatedData, setGeneratedData] = useState("");
  const [showGeneratedData, setShowGeneratedData] = useState(false);
  const [slideshows, setSlideshows] = useState([]);

  const clearAllData = () => {
    const hasContent = formData.title.trim() !== "" || 
                      formData.excerpt.trim() !== "" || 
                      formData.content.trim() !== `# Welcome to the Markdown Editor!

This is a **markdown editor** with live preview capabilities.

## Features

- **Bold text** and *italic text*
- \`Inline code\` and code blocks
- Lists and numbered lists
- Links and images
- And much more!

### Try it out:

1. Use the toolbar buttons above
2. Switch between Edit, Preview, and Split views
3. See your content rendered in real-time

\`\`\`javascript
// You can even write code blocks!
function hello() {
  return "Hello, Markdown!";
}
\`\`\`

> This is a blockquote. Perfect for highlighting important information.

[Learn more about Markdown](https://www.markdownguide.org/)`;

    if (hasContent) {
      const confirmed = window.confirm("Are you sure you want to clear all data? This action cannot be undone.");
      if (!confirmed) {
        return;
      }
    }

    setFormData({
      id: "",
      slug: "",
      title: "",
      excerpt: "",
      featuredImage: "",
      gradientId: "default",
      content: `# Welcome to the Markdown Editor!

This is a **markdown editor** with live preview capabilities.

## Features

- **Bold text** and *italic text*
- \`Inline code\` and code blocks
- Lists and numbered lists
- Links and images
- And much more!

### Try it out:

1. Use the toolbar buttons above
2. Switch between Edit, Preview, and Split views
3. See your content rendered in real-time

\`\`\`javascript
// You can even write code blocks!
function hello() {
  return "Hello, Markdown!";
}
\`\`\`

> This is a blockquote. Perfect for highlighting important information.

[Learn more about Markdown](https://www.markdownguide.org/)`,
      date: new Date().toISOString().split('T')[0],
      readTime: "5 min read",
      tags: "",
      category: "Web Development"
    });
    setHasBeenSaved(false);
    setHasUnsavedChanges(false);
    setShowGeneratedData(false);
    setGeneratedData("");
    setSlideshows([]);
  };

  // Check if there are unsaved changes
  const hasContent = useCallback(() => {
    const hasUserContent = formData.title.trim() !== "" || 
                          formData.excerpt.trim() !== "" || 
                          formData.content.trim() !== `# Welcome to the Markdown Editor!

This is a **markdown editor** with live preview capabilities.

## Features

- **Bold text** and *italic text*
- \`Inline code\` and code blocks
- Lists and numbered lists
- Links and images
- And much more!

### Try it out:

1. Use the toolbar buttons above
2. Switch between Edit, Preview, and Split views
3. See your content rendered in real-time

\`\`\`javascript
// You can even write code blocks!
function hello() {
  return "Hello, Markdown!";
}
\`\`\`

> This is a blockquote. Perfect for highlighting important information.

[Learn more about Markdown](https://www.markdownguide.org/)`;
    
    // Only show unsaved changes if there's content AND it hasn't been saved
    return hasUserContent && !hasBeenSaved;
  }, [formData.title, formData.excerpt, formData.content, hasBeenSaved]);

  // Handle beforeunload event
  const handleBeforeUnload = useCallback((e) => {
    if (hasContent()) {
      e.preventDefault();
      e.returnValue = '';
      return '';
    }
  }, [hasContent]);

  // Set up beforeunload event listener
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  // Update hasUnsavedChanges when form data changes
  useEffect(() => {
    setHasUnsavedChanges(hasContent());
  }, [formData, hasContent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset saved state when user makes changes
    if (hasBeenSaved) {
      setHasBeenSaved(false);
    }
  };

  const handleImageSelect = (imagePath) => {
    setFormData(prev => ({
      ...prev,
      featuredImage: imagePath
    }));
  };

  const handleGradientSelect = (gradientId) => {
    setFormData(prev => ({
      ...prev,
      gradientId
    }));
  };

  // Slideshow management functions
  const addSlideshow = () => {
    const newSlideshow = {
      id: `slideshow-${Date.now()}`,
      title: `Slideshow ${slideshows.length + 1}`,
      slides: []
    };
    setSlideshows(prev => [...prev, newSlideshow]);
  };

  const updateSlideshow = (slideshowId, updatedSlideshow) => {
    setSlideshows(prev => 
      prev.map(s => s.id === slideshowId ? updatedSlideshow : s)
    );
  };

  const deleteSlideshow = (slideshowId) => {
    setSlideshows(prev => prev.filter(s => s.id !== slideshowId));
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogPost = {
      ...formData,
      id: parseInt(formData.id) || Date.now(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      slideshows: slideshows
    };

    const markdownContent = createBlogPost(blogPost);
    setGeneratedData(markdownContent);
    setShowGeneratedData(true);
    
    // Mark as saved since data has been generated
    setHasBeenSaved(true);
    setHasUnsavedChanges(false);
  };

  const copyToClipboard = async () => {
    const blogPost = {
      ...formData,
      id: parseInt(formData.id) || Date.now(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      slideshows: slideshows
    };

    const markdownContent = createBlogPost(blogPost);
    
    try {
      await navigator.clipboard.writeText(markdownContent);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Mark as saved since data has been copied to clipboard
      setHasBeenSaved(true);
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      alert('Failed to copy to clipboard. Please try again.');
    }
  };

  return (
    <EditorContainer>
      <Container>
        <Header>
          <Title>Blog Post Editor</Title>
        </Header>

        <Form onSubmit={handleSubmit}>
          {hasUnsavedChanges && (
            <UnsavedChangesIndicator
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              ⚠️ You have unsaved changes. Make sure to save your work before leaving this page.
            </UnsavedChangesIndicator>
          )}
          <FormGroup>
            <Label>ID (leave empty for auto-generated)</Label>
            <Input
              type="number"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              placeholder="Leave empty for auto-generated ID"
            />
          </FormGroup>

          <FormGroup>
            <Label>Title *</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Enter your blog post title"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Slug (auto-generated from title)</Label>
            <Input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              placeholder="URL-friendly version of title"
            />
          </FormGroup>

          <FormGroup>
            <Label>Excerpt *</Label>
            <TextArea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Brief description of your blog post"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Featured Image Path</Label>
            <Input
              type="text"
              name="featuredImage"
              value={formData.featuredImage}
              onChange={handleInputChange}
              placeholder="e.g., /images/blog/my-image.png"
            />
            <small style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>
              Path to your image file (must be in the public/images/blog/ directory)
            </small>
            <ImageUploadHelper onImageSelect={handleImageSelect} />
          </FormGroup>

          <FormGroup>
            <Label>Fallback Gradient</Label>
            <small style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>
              Choose a gradient to use when no featured image is provided
            </small>
            <GradientSelector
              selectedGradientId={formData.gradientId}
              onGradientSelect={handleGradientSelect}
            />
          </FormGroup>

          <FormGroup>
            <Label>Content (Markdown) *</Label>
            <MarkdownEditor
              value={formData.content}
              onChange={(value) => {
                setFormData(prev => ({ ...prev, content: value }));
                // Reset saved state when user makes changes
                if (hasBeenSaved) {
                  setHasBeenSaved(false);
                }
              }}
              placeholder="Write your blog post content in markdown format..."
            />
          </FormGroup>

          <FormGroup>
            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Read Time</Label>
            <Input
              type="text"
              name="readTime"
              value={formData.readTime}
              onChange={handleInputChange}
              placeholder="e.g., 5 min read"
            />
          </FormGroup>

          <FormGroup>
            <Label>Tags (comma-separated)</Label>
            <Input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="React, Web Development, JavaScript, Embedded, Projects"
            />
          </FormGroup>

          <FormGroup>
            <Label>Category</Label>
            <Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="Web Development">Web Development</option>
              <option value="Embedded">Embedded</option>
              <option value="Projects">Projects</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
            </Select>
          </FormGroup>

          {/* Slideshows Section */}
          <FormGroup>
            <Label>
              <FiImage style={{ marginRight: '8px' }} />
              Slideshows
            </Label>
            <small style={{ color: '#666', fontSize: '12px', marginTop: '4px', display: 'block', marginBottom: '12px' }}>
              Add interactive slideshows to your blog post. Use the comment syntax {'<!-- slideshow:slideshow-id:mode -->'} in your content to embed them.
              <br />
              <strong>Example:</strong> {'<!-- slideshow:my-slideshow:buttons -->'} or {'<!-- slideshow:my-slideshow:scroll -->'}
            </small>
            
            {slideshows.map((slideshow) => (
              <SlideshowEditor
                key={slideshow.id}
                slideshow={slideshow}
                onSlideshowChange={(updatedSlideshow) => updateSlideshow(slideshow.id, updatedSlideshow)}
                onDelete={() => deleteSlideshow(slideshow.id)}
              />
            ))}
            
            <Button
              type="button"
              onClick={addSlideshow}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                background: 'transparent', 
                color: '#666', 
                border: '2px dashed #666',
                marginTop: '8px'
              }}
            >
              <FiPlus />
              Add Slideshow
            </Button>
          </FormGroup>

          <ButtonGroup>
            <Button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiSave />
              Generate Markdown File
            </Button>
            
            <Button
              type="button"
              onClick={copyToClipboard}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ background: '#059669' }}
            >
              <FiCopy />
              Copy Markdown
            </Button>

            <Button
              type="button"
              onClick={clearAllData}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ background: '#dc2626' }}
            >
              <FiTrash2 />
              Clear All
            </Button>
          </ButtonGroup>

          {showSuccess && (
            <SuccessMessage
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <FiSave />
              Markdown file copied to clipboard!
            </SuccessMessage>
          )}
        </Form>

        {showGeneratedData && (
          <GeneratedDataContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GeneratedDataTitle>Generated Markdown File</GeneratedDataTitle>
            <GeneratedDataTextarea
              value={generatedData}
              readOnly
              placeholder="Generated data will appear here..."
            />
            <GeneratedDataActions>
              <ActionButton
                onClick={() => {
                  navigator.clipboard.writeText(generatedData);
                  setShowSuccess(true);
                  setTimeout(() => setShowSuccess(false), 3000);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiCopy />
                Copy Markdown
              </ActionButton>
              <ActionButton
                $variant="secondary"
                onClick={() => {
                  setShowGeneratedData(false);
                  setGeneratedData("");
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiTrash2 />
                Close
              </ActionButton>
            </GeneratedDataActions>
          </GeneratedDataContainer>
        )}

        <PreviewSection>
          <PreviewTitle>Preview</PreviewTitle>
          <PreviewContainer>
            <PreviewHeader>
              <PreviewPostTitle>{formData.title || 'Your Title Here'}</PreviewPostTitle>
              
              <PreviewMeta>
                <PreviewMetaItem>
                  <FiCalendar />
                  {formData.date}
                </PreviewMetaItem>
                <PreviewMetaItem>
                  <FiClock />
                  {formData.readTime}
                </PreviewMetaItem>
                <PreviewMetaItem>
                  <FiTag />
                  {formData.category}
                </PreviewMetaItem>
              </PreviewMeta>

              <PreviewTags>
                {formData.tags.split(',').map((tag, index) => tag.trim()).filter(tag => tag).map((tag, index) => (
                  <PreviewTag key={index}>{tag}</PreviewTag>
                ))}
              </PreviewTags>
            </PreviewHeader>

            {formData.featuredImage && formData.featuredImage.trim() !== "" ? (
              <PreviewFeaturedImage>
                <img 
                  src={formData.featuredImage} 
                  alt={formData.title || 'Featured'} 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const errorDiv = e.target.parentNode.querySelector('.image-error');
                    if (errorDiv) {
                      errorDiv.style.display = 'flex';
                    }
                  }}
                />
                <div 
                  className="image-error"
                  style={{ 
                    width: '100%',
                    height: '100%',
                    background: '#f0f0f0',
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#666',
                    fontSize: '14px',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                >
                  Image not found: {formData.featuredImage}
                </div>
              </PreviewFeaturedImage>
            ) : (
              <PreviewFeaturedImage 
                style={{ 
                  background: getGradientById(formData.gradientId || "default").value 
                }}
              />
            )}

            <PreviewContent>
              {formData.content ? (
                (() => {
                  // Process content to handle slideshow comments
                  const slideshowRegex = /<!-- slideshow:([^:]+)(?::([^ ]+))? -->/g;
                  const parts = formData.content.split(slideshowRegex);
                  
                  return parts.map((part, index) => {
                    if (index % 3 === 0) {
                      // Regular markdown content
                      return (
                        <ReactMarkdown
                          key={`preview-content-${index}`}
                          components={{
                            code: ({ node, inline, className, children, ...props }) => {
                              return (
                                <SyntaxHighlighterComponent
                                  className={inline ? undefined : className}
                                  {...props}
                                >
                                  {children}
                                </SyntaxHighlighterComponent>
                              );
                            },
                          }}
                        >
                          {part}
                        </ReactMarkdown>
                      );
                    } else if (index % 3 === 1) {
                      // This is a slideshow ID
                      const slideshowId = part;
                      const mode = parts[index + 1] || "buttons";
                      const slideshow = slideshows.find(s => s.id === slideshowId);
                      
                      if (!slideshow) {
                        return (
                          <div key={`preview-slideshow-${slideshowId}-${index}`} style={{ 
                            padding: '20px', 
                            background: '#f0f0f0', 
                            borderRadius: '8px', 
                            margin: '20px 0',
                            textAlign: 'center',
                            color: '#666'
                          }}>
                            <FiImage style={{ fontSize: '24px', marginBottom: '8px' }} />
                            <p>Slideshow "{slideshowId}" not found</p>
                            <small>Create a slideshow with this ID to see it here</small>
                          </div>
                        );
                      }

                      // Transform slideshow data to Slideshow component format
                      const slides = slideshow.slides.map(slide => ({
                        image: slide.image,
                        imageTitle: slide.imageTitle,
                        imageCaption: slide.imageCaption,
                        content: (
                          <div>
                            <h3>{slide.content.title}</h3>
                            <p>{slide.content.description}</p>
                            {slide.content.points && (
                              <ul>
                                {slide.content.points.map((point, index) => (
                                  <li key={index}>{point}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )
                      }));

                      return (
                        <Slideshow
                          key={`preview-slideshow-${slideshowId}-${mode}-${index}`}
                          slides={slides}
                          autoPlay={false}
                          showIndicators={true}
                          showNavigation={true}
                          height="400px"
                          mode={mode}
                          showImageText={false}
                          imageFitMode="contain"
                          fullBleed={false}
                          zoomEnabled={false}
                          autoSlide={false}
                          autoSlideInterval={5000}
                        />
                      );
                    }
                    // Skip the mode part (index % 3 === 2)
                    return null;
                  }).filter(Boolean);
                })()
              ) : (
                <p style={{ color: '#666', fontStyle: 'italic' }}>Your content will appear here...</p>
              )}
            </PreviewContent>
          </PreviewContainer>
        </PreviewSection>
      </Container>
    </EditorContainer>
  );
};

export default BlogEditor;

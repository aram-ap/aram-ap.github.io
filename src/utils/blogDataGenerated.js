// Auto-generated from markdown files
// Run 'npm run build-blog' to regenerate this file

export const blogPosts = [
  {
    "id": 1754007961412,
    "slug": "pyg-engine-python-game-engine",
    "title": "PyG-Engine | Python Game Engine",
    "excerpt": "PyG Engine is a Python game engine that brings Unity-like simplicity to Python game development. Born from the frustration of repeatedly rewriting the same boilerplate code, it provides a component-based architecture that feels natural to Python developers.",
    "featuredImage": "/images/pyg-engine-logo.png",
    "gradientId": "forest",
    "content": "\n# Building [PyG Engine:](https://www.github.com/aram-ap/pyg-engine) Why I'm Creating a Python Game Engine\n\n## Introduction\n\nPygame is a powerful tool for python 2D game development, but it doesn't have the same refinement as major game engines like Unity\nor Godot. PyG-Engine buids upon PyGame providing a component-based architecture, built-in physics system, game object management, and more.\n\n####  In this post, I'll go over:\n> - The problems of python game development\n> - My vision for PyG-Engine\n> - What makes this different\n> - The current state of development\n> - Future plans\n> - Why this matters\n\n## The Problem\n- What's missing in the Python game development ecosystem\n- Why existing solutions don't quite fit\n- The gap between Pygame tutorials and production games\n\nPopular python game devlopment tools like pygame, Arcade,\n\n## The Vision\n- What PyG Engine aims to be\n- The target audience (students, indie devs, Python enthusiasts)\n- The philosophy behind the design decisions\n\n## What Makes PyG Engine Different\n- Component-based architecture\n- Built-in physics system\n- Event-driven communication\n- Familiar Python patterns\n- Comprehensive input system\n\n## Current State\n- What's working now\n- Key features that are implemented\n- Example of what you can build with it\n\n## Future Plans\n- What's coming next\n- Roadmap for development\n- Long-term vision\n\n## Why This Matters\n- Impact on Python game development ecosystem\n- Benefits for different user groups\n- Educational value\n\n## Conclusion\n- Call to action\n- How to get involved\n- Final thoughts on the project's potential\n\n",
    "date": "2025-08-01T00:00:00.000Z",
    "readTime": "10 min read",
    "tags": [
      "Game Engines",
      "Development",
      "Project",
      "Python"
    ],
    "category": "Game Development"
  },
  {
    "id": 1753681241787,
    "slug": "building-a-modern-portfolio-with-react",
    "title": "Building a Modern Portfolio with React",
    "excerpt": "A tutorial on starting your first portfolio with React JS",
    "featuredImage": "https://imgs.search.brave.com/kEDncOq4wCoJxVPE2RdvMefqpPC6Xt852gJ-pc_OfXk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzEw/L1JlYWN0LUxvZ28t/NTAweDI4MS5wbmc",
    "gradientId": "Default",
    "content": "\n# Building a Modern Portfolio with React\n\nConstructing an effective portfolio is, frankly, non-negotiable if you're aiming to distinguish yourself in today's competitive landscape. If your work isn't visible, it's essentially invisible. React has emerged as a leading framework due to its adaptability and robust performance—qualities that make it particularly well-suited for portfolio development. In this walkthrough, I'll outline how to assemble a sleek, contemporary portfolio utilizing React, styled-components, and Framer Motion.\n\n<!-- slideshow:development-process:buttons -->\n\n## Getting Started\n\nFirst things first, let's set up our development environment quickly and painlessly:\n\n```bash\nnpx create-react-app my-portfolio\ncd my-portfolio\nnpm install styled-components framer-motion react-router-dom\n```\n\nEasy, right? Now we're ready to dive in.\n\n## Project Structure\n\nHaving an organized project structure makes life a lot easier, trust me. Here's a solid starting point:\n\n```\nsrc/\n  components/\n    Navigation.jsx\n    Hero.jsx\n    ProjectCard.jsx\n  pages/\n    Home.jsx\n    About.jsx\n    Projects.jsx\n    Contact.jsx\n  styles/\n    theme.js\n    global.css\n```\n\nKeeping your code organized now will save you from headaches later (future you will be grateful).\n\n## Styling with Styled Components\n\nStyled-components make CSS more manageable by keeping your styling closely tied to your components:\n\n```jsx\nimport styled from 'styled-components';\n\nconst Button = styled.button`\n  background: ${props => props.theme.colors.primary};\n  color: white;\n  padding: 12px 24px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n\n  &:hover {\n    background: ${props => props.theme.colors.primaryDark};\n  }\n`;\n```\n\nThe best part? No more jumping between different CSS files hunting for styles.\n\n## Adding Animations\n\nAnimations can seriously elevate your portfolio. Framer Motion makes this surprisingly simple:\n\n```jsx\nimport { motion } from 'framer-motion';\n\nconst AnimatedCard = styled(motion.div)`\n  background: white;\n  padding: 20px;\n  border-radius: 12px;\n`;\n\n// Example usage\n<AnimatedCard\n  initial={{ opacity: 0, y: 50 }}\n  animate={{ opacity: 1, y: 0 }}\n  transition={{ duration: 0.6 }}\n>\n  Your content here\n</AnimatedCard>\n```\n\nAnimations aren't just flashy—they make your interactions feel polished and professional.\n\n## Quick Best Practices\n\n* **Performance**: React.memo and useMemo help keep your site snappy.\n* **Accessibility**: Remember to use ARIA labels and test keyboard navigation (it matters).\n* **SEO**: Meta tags and structured data help Google find your work easily.\n* **Mobile First**: Always design your portfolio with mobile users in mind first.\n\n## Deployment\n\nReady to share your portfolio with the world? Here's how to quickly deploy using GitHub Pages:\n\n```json\n{\n  \"scripts\": {\n    \"predeploy\": \"npm run build\",\n    \"deploy\": \"gh-pages -d build\"\n  }\n}\n```\n\nA few clicks, and your portfolio goes live—no stress required.\n\n## Conclusion\n\nUltimately, employing React, styled-components, and Framer Motion allows you to present your portfolio with both sophistication and technical prowess. It's vital to update your portfolio regularly, incorporating recent projects to maintain its relevance and ensure it continues to impress prospective employers or clients. ",
    "date": "2025-07-28T00:00:00.000Z",
    "readTime": "5 min read",
    "tags": [
      "Web Development",
      "React",
      "Portfolio",
      "Tutorial"
    ],
    "category": "Tutorial"
  }
];

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
  const frontmatter = `---
id: ${postData.id}
slug: ${postData.slug}
title: ${postData.title}
excerpt: ${postData.excerpt}
featuredImage: ${postData.featuredImage || ''}
gradientId: ${postData.gradientId || 'default'}
date: ${postData.date}
readTime: ${postData.readTime}
tags: [${postData.tags.join(', ')}]
category: ${postData.category}
---

${postData.content}`;

  return frontmatter;
};

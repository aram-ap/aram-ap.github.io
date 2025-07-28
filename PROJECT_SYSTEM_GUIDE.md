# Project System Guide

This guide explains how to use the new project system that allows you to manage projects using markdown files, similar to the blog system.

## Overview

The project system supports two types of projects:

1. **Detailed Projects** (`type: detailed`) - Full markdown pages with comprehensive project information
2. **GitHub Only Projects** (`type: github-only`) - Simple cards that link directly to GitHub repositories

## File Structure

```
src/
├── content/
│   └── projects/           # Project markdown files
│       ├── nasa-rocksat-2024.md
│       ├── nasa-rocksat-2025.md
│       └── example-github-project.md
├── pages/
│   ├── Projects.jsx        # Projects listing page
│   └── ProjectPost.jsx     # Detailed project page
├── utils/
│   └── projectDataGenerated.js  # Auto-generated project data
└── scripts/
    └── build-projects.js   # Build script for projects
```

## Creating a New Project

### Step 1: Create the Markdown File

Create a new `.md` file in `src/content/projects/` with your project slug as the filename.

### Step 2: Add Frontmatter

Add the required frontmatter at the top of your markdown file:

```markdown
---
id: 4
slug: your-project-slug
title: Your Project Title
subtitle: Your Role | Brief Description
year: 2024
type: detailed  # or "github-only"
github: https://github.com/your-username/your-repo
external: https://external-link.com (optional)
tech: ["React", "Node.js", "TypeScript"]
category: "Web Development"
featuredImage: /src/assets/your-image.jpg (optional)
---
```

### Step 3: Write Your Content

For detailed projects, write your project content in markdown below the frontmatter.

For GitHub-only projects, just add a brief description.

### Step 4: Build the Projects

Run the build script to generate the project data:

```bash
npm run build-projects
```

## Project Types

### Detailed Projects

- Full markdown pages with comprehensive information
- Similar layout to the NASA RockSat pages
- Include technical details, achievements, and lessons learned
- Support for images, code blocks, and rich formatting

### GitHub Only Projects

- Simple cards that link directly to GitHub
- Perfect for smaller projects or quick references
- Minimal content, just basic project info

## Visual Indicators

The projects page includes visual indicators to distinguish between the two types:

- **Detailed Projects**: Show a "Detailed" badge with a document icon
- **GitHub Only Projects**: Show a "GitHub Only" badge with a code icon

## Available Categories

- "Space & Aerospace"
- "Web Development"
- "Mobile Development"
- "Backend"
- "Frontend"
- "Full Stack"
- "Machine Learning"
- "Data Science"
- "DevOps"
- "Open Source"

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique identifier (increment from existing projects) |
| `slug` | Yes | URL-friendly version of your title |
| `title` | Yes | Project title |
| `subtitle` | Yes | Brief description or your role |
| `year` | Yes | Project year |
| `type` | Yes | Either "detailed" or "github-only" |
| `github` | Yes | GitHub repository URL |
| `external` | No | External link (optional) |
| `tech` | Yes | Array of technologies used |
| `category` | Yes | Project category |
| `featuredImage` | No | Path to featured image (optional) |

## Build Process

The build script (`scripts/build-projects.js`) does the following:

1. Reads all `.md` files from `src/content/projects/`
2. Parses frontmatter and content
3. Generates JavaScript data in `src/utils/projectDataGenerated.js`
4. Sorts projects by year (newest first)

## Integration with Development

The build script is automatically run during development and build:

- `npm run dev` - Builds projects and starts development server
- `npm run build` - Builds projects and creates production build

## Examples

### NASA RockSat Projects

The NASA RockSat projects serve as examples of detailed projects with comprehensive information about space missions, technical achievements, and leadership roles.

### Example GitHub Project

The example GitHub project demonstrates the simpler GitHub-only type for smaller projects.

## Adding Images

To add images to your projects:

1. Place images in `src/assets/`
2. Reference them in the frontmatter: `featuredImage: /src/assets/your-image.jpg`
3. Use them in markdown content: `![Alt text](/src/assets/your-image.jpg)`

## Troubleshooting

### Project Not Appearing

1. Check that the markdown file is in `src/content/projects/`
2. Verify the frontmatter is correctly formatted
3. Run `npm run build-projects` to regenerate data
4. Check the console for any build errors

### Build Errors

1. Ensure all required frontmatter fields are present
2. Check that the `id` is unique
3. Verify the `slug` is URL-friendly (no spaces, special characters)
4. Make sure the markdown syntax is valid

## Future Enhancements

Potential improvements to the project system:

- Project search functionality
- Filtering by technology stack
- Project tags and categories
- Project images and galleries
- Integration with GitHub API for live data
- Project timeline view 
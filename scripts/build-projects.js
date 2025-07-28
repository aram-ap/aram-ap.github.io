import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

/**
 * Projects build script that converts markdown files to JavaScript data
 * Processes frontmatter and generates project data for the application
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the content directory if it doesn't exist
const contentDir = path.join(__dirname, '../src/content/projects');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Read all markdown files from the content directory
const projectFiles = fs.readdirSync(contentDir)
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
      subtitle: data.subtitle,
      year: data.year,
      type: data.type || 'detailed', // 'detailed' or 'github-only'
      github: data.github,
      external: data.external,
      tech: data.tech || [],
      category: data.category,
      gradientId: data.gradientId,
      featuredImage: data.featuredImage,
      excerpt: data.excerpt || '',
      progress: data.progress || 'completed', // 'completed', 'in-progress', 'planned'
      dateStarted: data.dateStarted || '',
      dateEnd: data.dateEnd || '',
      slideshows: data.slideshows || [],
      content: markdownContent
    };
  })
  .sort((a, b) => b.year - a.year); // Sort by year descending

// Generate the JavaScript file
const jsContent = `// Auto-generated from markdown files
// Run 'npm run build-projects' to regenerate this file

export const projects = ${JSON.stringify(projectFiles, null, 2)};

// Utility functions
export const getProjectBySlug = (slug) => {
  return projects.find(project => project.slug === slug);
};

export const getProjectsByCategory = (category) => {
  if (category === "All") return projects;
  return projects.filter(project => project.category === category);
};

export const getProjectsByType = (type) => {
  return projects.filter(project => project.type === type);
};

export const searchProjects = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return projects.filter(project => 
    project.title.toLowerCase().includes(term) ||
    project.subtitle.toLowerCase().includes(term) ||
    project.tech.some(tech => tech.toLowerCase().includes(term)) ||
    project.content.toLowerCase().includes(term)
  );
};

export const getCategories = () => {
  const categories = [...new Set(projects.map(project => project.category))];
  return ["All", ...categories];
};

export const getTechStack = () => {
  const allTech = projects.flatMap(project => project.tech);
  return [...new Set(allTech)];
};

export const getYears = () => {
  const years = [...new Set(projects.map(project => project.year))];
  return years.sort((a, b) => b - a);
};

// Helper function to create a new project file
export const createProject = (projectData) => {
  const frontmatter = \`---
id: \${projectData.id}
slug: \${projectData.slug}
title: \${projectData.title}
subtitle: \${projectData.subtitle}
year: \${projectData.year}
type: \${projectData.type || 'detailed'}
github: \${projectData.github || ''}
external: \${projectData.external || ''}
tech: [\${projectData.tech.join(', ')}]
category: \${projectData.category}
gradientId: \${projectData.gradientId || ''}
featuredImage: \${projectData.featuredImage || ''}
excerpt: \${projectData.excerpt || ''}
progress: \${projectData.progress || 'completed'}
dateStarted: \${projectData.dateStarted || ''}
dateEnd: \${projectData.dateEnd || ''}
---

\${projectData.content}\`;

  return frontmatter;
};
`;

// Write the generated file
const outputPath = path.join(__dirname, '../src/utils/projectDataGenerated.js');
fs.writeFileSync(outputPath, jsContent);

console.log(`✅ Generated project data from ${projectFiles.length} markdown files`);
console.log(`📁 Output: ${outputPath}`);
console.log(`📝 Projects: ${projectFiles.map(p => p.title).join(', ')}`); 
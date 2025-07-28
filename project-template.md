---
id: 1
slug: nasa-rocksat-2024
title: NASA RockSat-X 2024
subtitle: Software Lead | Suborbital Research Mission
year: 2024
type: detailed
github: https://github.com/aram-ap/COCRockSatX2024
external: https://www.nasa.gov/wallops/stem/rocksatx/
tech: ["C++", "Python", "Arduino", "Embedded Systems", "Real-time Programming", "Sensor Integration", "Data Logging", "Flight Software", "Mission Planning", "Testing & Validation"]
category: "Space & Aerospace"
gradientId: space
featuredImage: /src/assets/space-exploration.jpg
excerpt: "Led software development for NASA's RockSat-X suborbital research mission, designing flight software systems and coordinating with hardware teams to ensure mission success."
progress: completed
dateStarted: "2024-01-15"
dateEnd: "2024-06-20"
slideshows: [] # Array of slideshow objects for modular slideshows
---

# NASA RockSat-X 2024

## Mission Overview

As a 19-year-old college student, stepping up to lead the software team for NASA's RockSat-X project was both daunting and exhilarating. We developed a payload for a suborbital research mission launching from Wallops Flight Facility, aimed at studying atmospheric and space environments with a deployable capsule reaching over 100km in altitude.

In my role as Software Lead, I designed and implemented the flight software systems, collaborated closely with hardware teams, and focused on ensuring reliability in the demanding space environment. There were tough moments balancing this with my coursework, but pushing through taught me invaluable lessons in resilience.

## Leadership Role

**Software Team Lead** - I guided a team of 8 fellow students, establishing coding standards, review processes, and development workflows while navigating the pressures of college life.

- Introduced agile practices to meet the rigorous space mission timeline—it took some trial and error, but it kept us on track
- Implemented code review protocols and testing frameworks that prevented major issues
- Collaborated with NASA engineers, an experience that was equal parts intimidating and inspiring
- Delivered flight-ready software on schedule, despite the occasional all-nighter

## Technical Achievements

Creating software resilient enough for suborbital flight conditions was a steep learning curve—I dove deep into embedded systems and fault tolerance. Here's what we accomplished:

- Real-time data acquisition and telemetry systems built to withstand extreme vibrations
- A fault-tolerant architecture that maintained operations even under stress
- Autonomous experiment control and data logging for the flight duration
- Ground communication protocols that required meticulous refinement
- Pre-flight simulation environments for thorough testing and validation

## Mission Success

The 2024 RockSat-X mission achieved its core objectives, though we faced a setback with the radio antennas breaking during launch—it was disappointing, but the software performed without a hitch.

- Successfully executed all planned experiments in microgravity
- Maintained continuous telemetry throughout the flight, despite the communication challenges
- Recovered all data post-flight, turning potential loss into valuable insights 

# Project Template

Copy this template and modify it to create a new project. There are two types of projects:

1. **Detailed** (`type: detailed`) - Opens a full markdown page with project details
2. **GitHub Only** (`type: github-only`) - Just contains a button that sends you to GitHub

## Template for Detailed Project

```markdown
---
id: 3
slug: your-project-slug
title: Your Project Title
subtitle: Your Role | Brief Description
year: 2024
type: detailed
github: https://github.com/your-username/your-repo
external: https://external-link.com (optional)
tech: ["React", "Node.js", "TypeScript", "Your Tech Stack"]
category: "Web Development"
gradientId: default # (optional) See below for options
featuredImage: /src/assets/your-image.jpg (optional)
excerpt: "A brief description of your project that will appear in the project cards. Keep it concise but informative."
progress: completed # 'completed', 'in-progress', 'planned'
dateStarted: "2024-01-01" # YYYY-MM-DD format
dateEnd: "2024-06-01" # Leave empty for ongoing projects
---

# Your Project Title

## Project Overview

Start your project description here. Explain what the project is about, your role, and the main objectives.

## Technical Details

Describe the technical implementation, challenges faced, and solutions developed.

## Key Features

- Feature 1
- Feature 2
- Feature 3

## Technologies Used

Explain how each technology was used and why it was chosen.

## Results & Impact

Describe the outcomes, metrics, or impact of your project.

## Lessons Learned

Share what you learned from this project and how it helped you grow.
```

## Template for GitHub Only Project

```markdown
---
id: 4
slug: your-github-project
title: Your GitHub Project
subtitle: Brief Description
year: 2024
type: github-only
github: https://github.com/your-username/your-repo
tech: ["Python", "Flask", "SQLite"]
category: "Backend"
gradientId: ocean # (optional)
excerpt: "A brief description of your GitHub project that will appear in the project cards."
progress: completed # 'completed', 'in-progress', 'planned'
dateStarted: "2024-01-01" # YYYY-MM-DD format
dateEnd: "2024-06-01" # Leave empty for ongoing projects
---

# Your GitHub Project

Brief description of the project that will appear in the project listing.
```

## Available Gradients

- `default`: Default Purple
- `sunset`: Sunset
- `ocean`: Ocean
- `forest`: Forest
- `fire`: Fire
- `space`: Space
- `tech`: Tech Blue
- `warm`: Warm Orange
- `cool`: Cool Blue
- `minimal`: Minimal Gray

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

## Instructions

1. Copy the appropriate template above
2. Create a new file in `src/content/projects/` with your slug as the filename (e.g., `my-project.md`)
3. Fill in all the frontmatter fields
4. Write your project content in markdown
5. Run `npm run build-projects` to regenerate the project data
6. Your project will appear on the projects page

## Frontmatter Fields

- `id`: Unique identifier (increment from existing projects)
- `slug`: URL-friendly version of your title (used in URLs)
- `title`: Project title
- `subtitle`: Brief description or your role
- `year`: Project year
- `type`: Either "detailed" or "github-only"
- `github`: GitHub repository URL
- `external`: External link (optional)
- `tech`: Array of technologies used
- `category`: Project category
- `gradientId`: Gradient background for the card (see above)
- `featuredImage`: Path to featured image (optional)
- `excerpt`: Brief description that appears in project cards (optional)
- `progress`: Project status - 'completed', 'in-progress', or 'planned'
- `dateStarted`: Start date in YYYY-MM-DD format
- `dateEnd`: End date in YYYY-MM-DD format (leave empty for ongoing projects) 
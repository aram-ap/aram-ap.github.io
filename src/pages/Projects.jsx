import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiFilter } from "react-icons/fi";

const ProjectsContainer = styled.main`
  padding-top: 120px;
  padding-bottom: ${(props) => props.theme.spacing.xxl};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.lg};
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.xxl};
`;

const Title = styled(motion.h1)`
  font-size: ${(props) => props.theme.typography.fontSizes.hero};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.typography.fontSizes.xxl};
  }
`;

const Subtitle = styled(motion.p)`
  font-size: ${(props) => props.theme.typography.fontSizes.lg};
  color: ${(props) => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const FilterSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  gap: ${(props) => props.theme.spacing.sm};
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  border: 2px solid ${(props) => props.active ? props.theme.colors.accent : props.theme.colors.border};
  background: ${(props) => props.active ? props.theme.colors.accent : 'transparent'};
  color: ${(props) => props.active ? props.theme.colors.text : props.theme.colors.textSecondary};
  border-radius: 50px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  transition: all ${(props) => props.theme.animations.normal};

  &:hover {
    border-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accent};
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${(props) => props.theme.spacing.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.border};
  transition: all ${(props) => props.theme.animations.normal};
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    border-color: ${(props) => props.theme.colors.accent};
    box-shadow: 0 20px 40px rgba(162, 89, 247, 0.1);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.accent}, ${(props) => props.theme.colors.success});
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity ${(props) => props.theme.animations.normal};
  }

  ${ProjectCard}:hover &::after {
    opacity: 1;
  }
`;

const ProjectContent = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
`;

const ProjectTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.xl};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const ProjectDescription = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.md};
  line-height: ${(props) => props.theme.typography.lineHeights.relaxed};
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const TechTag = styled.span`
  background: ${(props) => props.theme.colors.backgroundTertiary};
  color: ${(props) => props.theme.colors.accent};
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: 20px;
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: 8px;
  transition: all ${(props) => props.theme.animations.normal};

  &:hover {
    color: ${(props) => props.theme.colors.accent};
    background: ${(props) => props.theme.colors.accentLight};
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xxl};
  color: ${(props) => props.theme.colors.textSecondary};
`;

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      category: "Full Stack",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/aram-ap/ecommerce",
      live: "https://ecommerce-demo.com"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates, team features, and progress tracking.",
      category: "Frontend",
      tech: ["React", "TypeScript", "Firebase", "Framer Motion"],
      github: "https://github.com/aram-ap/task-manager",
      live: "https://taskmanager-demo.com"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Beautiful weather application with location-based forecasts, interactive maps, and detailed analytics.",
      category: "Frontend",
      tech: ["Next.js", "Tailwind CSS", "OpenWeather API"],
      github: "https://github.com/aram-ap/weather-dashboard",
      live: "https://weather-demo.com"
    },
    {
      id: 4,
      title: "Restaurant API",
      description: "RESTful API for restaurant management with menu handling, order processing, and user authentication.",
      category: "Backend",
      tech: ["Node.js", "Express", "PostgreSQL", "JWT"],
      github: "https://github.com/aram-ap/restaurant-api",
      live: null
    },
    {
      id: 5,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with data visualization and automated reporting.",
      category: "Full Stack",
      tech: ["Vue.js", "Python", "Django", "Chart.js"],
      github: "https://github.com/aram-ap/social-dashboard",
      live: "https://social-dashboard-demo.com"
    },
    {
      id: 6,
      title: "Chat Application",
      description: "Real-time chat application with group messaging, file sharing, and video call integration.",
      category: "Full Stack",
      tech: ["React", "Socket.io", "Node.js", "WebRTC"],
      github: "https://github.com/aram-ap/chat-app",
      live: "https://chat-demo.com"
    }
  ];

  const filters = ["All", "Frontend", "Backend", "Full Stack"];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <ProjectsContainer>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Header>
            <Title variants={itemVariants}>My Projects</Title>
            <Subtitle variants={itemVariants}>
              A collection of my recent work showcasing various technologies and creative solutions. **[UNDER CONSTRUCTION]**
            </Subtitle>
          </Header>

          <FilterSection variants={itemVariants}>
            {filters.map((filter) => (
              <FilterButton
                key={filter}
                active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiFilter />
                {filter}
              </FilterButton>
            ))}
          </FilterSection>

          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <ProjectsGrid
                key={activeFilter}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                    layout
                  >
                    <ProjectImage />
                    <ProjectContent>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectDescription>{project.description}</ProjectDescription>

                      <TechStack>
                        {project.tech.map((tech, index) => (
                          <TechTag key={index}>{tech}</TechTag>
                        ))}
                      </TechStack>

                      <ProjectLinks>
                        <ProjectLink
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                        >
                          <FiGithub />
                          Code
                        </ProjectLink>
                        {project.live && (
                          <ProjectLink
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                          >
                            <FiExternalLink />
                            Live Demo
                          </ProjectLink>
                        )}
                      </ProjectLinks>
                    </ProjectContent>
                  </ProjectCard>
                ))}
              </ProjectsGrid>
            ) : (
              <EmptyState
                key="empty"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3>No projects found for this category</h3>
                <p>Try selecting a different filter to see more projects.</p>
              </EmptyState>
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </ProjectsContainer>
  );
};

export default Projects;

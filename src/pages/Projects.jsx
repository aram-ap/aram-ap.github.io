import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiGithub, FiExternalLink, FiFilter, FiFileText, FiCode, FiChevronRight, FiCalendar, FiClock, FiCheckCircle, FiPlayCircle, FiTarget } from "react-icons/fi";
import { projects, getCategories } from "../utils/projectDataGenerated";
import { getGradientById } from "../utils/gradients";

/**
 * Projects page component with filtering and animated project cards
 * Features: category filtering, hover animations, responsive grid layout
 * Two types of projects: detailed (opens markdown page) and github-only (just GitHub link)
 */

const ProjectsContainer = styled.main`
  padding-top: 120px;
  padding-bottom: ${(props) => props.theme.spacing.xxl};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.lg};
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 20px;
  }
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
  border: 2px solid ${(props) => props.$active ? props.theme.colors.accent : props.theme.colors.border};
  background: ${(props) => props.$active ? props.theme.colors.accent : 'transparent'};
  color: ${(props) => props.$active ? props.theme.colors.text : props.theme.colors.textSecondary};
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

const SortSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  gap: ${(props) => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const SortButton = styled(motion.button)`
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.$active ? props.theme.colors.accent : 'transparent'};
  color: ${(props) => props.$active ? props.theme.colors.text : props.theme.colors.textSecondary};
  border-radius: 20px;
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
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
  position: relative;

  &:hover {
    transform: translateY(-8px);
    border-color: ${(props) => props.theme.colors.accent};
    box-shadow: 0 20px 40px rgba(162, 89, 247, 0.1);
  }
`;

const ProjectTypeIndicator = styled.div`
  position: absolute;
  top: ${(props) => props.theme.spacing.md};
  right: ${(props) => props.theme.spacing.md};
  background: ${(props) => props.$type === 'detailed' ? props.theme.colors.accent : props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: 20px;
  font-size: ${(props) => props.theme.typography.fontSizes.xs};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  z-index: 10;
`;

const ProgressTag = styled.div`
  position: absolute;
  top: ${(props) => props.theme.spacing.md};
  left: ${(props) => props.theme.spacing.md};
  background: ${(props) => {
    switch (props.$progress) {
      case 'completed': return props.theme.colors.success;
      case 'in-progress': return props.theme.colors.warning;
      case 'planned': return props.theme.colors.info;
      default: return props.theme.colors.secondary;
    }
  }};
  color: ${(props) => {
    switch (props.$progress) {
      case 'completed': return '#ffffff';
      case 'in-progress': return '#000000';
      case 'planned': return '#ffffff';
      default: return props.theme.colors.text;
    }
  }};
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: 20px;
  font-size: ${(props) => props.theme.typography.fontSizes.xs};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  z-index: 10;
`;

const ProjectImage = styled.div`
  height: 200px;
  background: ${(props) => props.$gradient ? props.$gradient : `linear-gradient(135deg, ${props.theme.colors.accent}, ${props.theme.colors.success})`};
  position: relative;
  overflow: hidden;

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

const ProjectSubtitle = styled.p`
  color: ${(props) => props.theme.colors.accent};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const ProjectDescription = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.md};
  line-height: ${(props) => props.theme.typography.lineHeights.relaxed};
`;

const ProjectDates = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.md};
  font-size: ${(props) => props.theme.typography.fontSizes.xs};
  color: ${(props) => props.theme.colors.textSecondary};
`;

const DateItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
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
  color: ${(props) => props.theme.colors.accent};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  border: 2px solid ${(props) => props.theme.colors.accent};
  border-radius: 8px;
  transition: all ${(props) => props.theme.animations.normal};

  &:hover {
    color: ${(props) => props.theme.colors.text};
    background: ${(props) => props.theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const ProjectButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.accent};
  border: none;
  border-radius: 8px;
  transition: all ${(props) => props.theme.animations.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(108, 92, 231, 0.3);
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xxl};
  color: ${(props) => props.theme.colors.textSecondary};
`;

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSort, setActiveSort] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const categories = getCategories();
  const progressOptions = ["All", "completed", "in-progress", "planned"];

  // Filter projects by category and progress
  const filteredProjects = projects.filter(project => {
    const categoryMatch = activeFilter === "All" || project.category === activeFilter;
    return categoryMatch;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    let comparison = 0;
    
    switch (activeSort) {
      case "name":
        comparison = a.title.localeCompare(b.title);
        break;
      case "date":
        const aDate = a.dateStarted ? new Date(a.dateStarted) : new Date(0);
        const bDate = b.dateStarted ? new Date(b.dateStarted) : new Date(0);
        comparison = aDate - bDate;
        break;
      case "progress":
        const progressOrder = { 'planned': 0, 'in-progress': 1, 'completed': 2 };
        comparison = (progressOrder[a.progress] || 0) - (progressOrder[b.progress] || 0);
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const handleProjectClick = (project) => {
    if (project.type === 'detailed') {
      window.location.href = `/projects/${project.slug}`;
    } else if (project.github) {
      window.open(project.github, '_blank');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getProgressIcon = (progress) => {
    switch (progress) {
      case 'completed': return <FiCheckCircle />;
      case 'in-progress': return <FiPlayCircle />;
      case 'planned': return <FiTarget />;
      default: return <FiClock />;
    }
  };

  const getProgressText = (progress) => {
    switch (progress) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'planned': return 'Planned';
      default: return 'Unknown';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
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
            <Title variants={itemVariants}>
              Projects
            </Title>
            <Subtitle variants={itemVariants}>
              A collection of my work, from space missions to web applications
            </Subtitle>
          </Header>

          <FilterSection variants={itemVariants}>
            {categories.map((category) => (
              <FilterButton
                key={category}
                $active={activeFilter === category}
                onClick={() => setActiveFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiFilter />
                {category}
              </FilterButton>
            ))}
          </FilterSection>

          <SortSection variants={itemVariants}>
            <SortButton
              $active={activeSort === "name"}
              onClick={() => {
                setActiveSort("name");
                setSortDirection(sortDirection === "asc" ? "desc" : "asc");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Name {activeSort === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </SortButton>
            <SortButton
              $active={activeSort === "date"}
              onClick={() => {
                setActiveSort("date");
                setSortDirection(sortDirection === "asc" ? "desc" : "asc");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Date {activeSort === "date" && (sortDirection === "asc" ? "↑" : "↓")}
            </SortButton>
            <SortButton
              $active={activeSort === "progress"}
              onClick={() => {
                setActiveSort("progress");
                setSortDirection(sortDirection === "asc" ? "desc" : "asc");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Progress {activeSort === "progress" && (sortDirection === "asc" ? "↑" : "↓")}
            </SortButton>
          </SortSection>

          <AnimatePresence mode="wait">
            {sortedProjects.length > 0 ? (
              <ProjectsGrid
                key={`${activeFilter}-${activeSort}-${sortDirection}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {sortedProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                    layout
                    onClick={() => handleProjectClick(project)}
                  >
                    {project.type === 'detailed' && (
                      <ProjectTypeIndicator $type={project.type}>
                        <FiChevronRight />
                        More
                      </ProjectTypeIndicator>
                    )}
                    
                    <ProgressTag $progress={project.progress}>
                      {getProgressIcon(project.progress)}
                      {getProgressText(project.progress)}
                    </ProgressTag>
                    
                    <ProjectImage $gradient={project.gradientId ? getGradientById(project.gradientId).value : undefined}>
                      {project.featuredImage && project.featuredImage.trim() !== "" && (
                        <img 
                          src={project.featuredImage} 
                          alt={project.title}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const gradient = project.gradientId 
                              ? getGradientById(project.gradientId).value 
                              : `linear-gradient(135deg, #6c5ce7, #00b894)`;
                            e.target.parentElement.style.background = gradient;
                          }}
                        />
                      )}
                    </ProjectImage>
                    <ProjectContent>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectSubtitle>{project.subtitle}</ProjectSubtitle>
                      <ProjectDescription>
                        {project.excerpt || (project.type === 'detailed' 
                          ? 'Click to view detailed project information and documentation.'
                          : 'Click to view the project on GitHub.'
                        )}
                      </ProjectDescription>

                      <ProjectDates>
                        <DateItem>
                          <FiCalendar />
                          {formatDate(project.dateStarted)}
                        </DateItem>
                        {project.dateEnd && (
                          <DateItem>
                            <FiClock />
                            {formatDate(project.dateEnd)}
                          </DateItem>
                        )}
                      </ProjectDates>

                      <TechStack>
                        {project.tech.slice(0, 5).map((tech, index) => (
                          <TechTag key={index}>{tech}</TechTag>
                        ))}
                        {project.tech.length > 5 && (
                          <TechTag>+{project.tech.length - 5} more</TechTag>
                        )}
                      </TechStack>

                      <ProjectLinks>
                        {project.type === 'detailed' ? (
                          <ProjectButton
                            whileHover={{ scale: 1.05 }}
                          >
                            <FiFileText />
                            View Details
                          </ProjectButton>
                        ) : (
                          <ProjectLink
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiGithub />
                            View on GitHub
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

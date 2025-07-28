import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighterComponent from "../components/SyntaxHighlighter";
import Slideshow from "../components/Slideshow";
import { FiArrowLeft, FiGithub, FiExternalLink, FiCalendar, FiCode } from "react-icons/fi";
import { getProjectBySlug } from "../utils/projectDataGenerated";
import { getGradientById } from "../utils/gradients";

// Custom component to render slideshow in markdown
const SlideshowComponent = ({ slideshowId, project, mode = "buttons" }) => {
  if (!project.slideshows || !slideshowId) return null;

  const slideshow = project.slideshows.find(s => s.id === slideshowId);
  if (!slideshow) return null;

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
      slides={slides}
      autoPlay={false}
      showIndicators={true}
      showNavigation={true}
      height="600px"
      mode={mode}
      showImageText={true}
      imageFitMode="contain"
      fullBleed={false}
      zoomEnabled={false}
      autoSlide={true}
      autoSlideInterval={7000}
    />
  );
};

// Custom components for ReactMarkdown
const customComponents = (project) => ({
  // Handle code blocks with syntax highlighting
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
});

const ProjectContainer = styled.main`
  padding-top: 120px;
  padding-bottom: ${(props) => props.theme.spacing.xxl};
  background: ${(props) => props.theme.colors.spaceGradient};
  min-height: 100vh;
`;

const Navigation = styled(motion.div)`
  margin-bottom: ${(props) => props.theme.spacing.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 ${(props) => props.theme.spacing.lg} ${(props) => props.theme.spacing.xl};
  }
`;

const BackButton = styled(motion.create(Link))`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  transition: all ${(props) => props.theme.animations.normal};

  &:hover {
    color: ${(props) => props.theme.colors.accent};
    transform: translateX(-4px);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.lg};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0;
  }
`;

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.xxl};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 ${(props) => props.theme.spacing.lg} ${(props) => props.theme.spacing.xxl};
  }
`;

const ProjectTitleStyled = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md};
  text-shadow: 0 0 20px rgba(108, 92, 231, 0.5);
`;

const ProjectSubtitleStyled = styled.h2`
  font-size: ${(props) => props.theme.typography.fontSizes.xl};
  color: ${(props) => props.theme.colors.accent};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const ProjectYearStyled = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  background: ${(props) => props.theme.colors.cosmicGradient};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  border-radius: 50px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const FeaturedImageContainer = styled.div`
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
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.xs};
  margin-top: ${(props) => props.theme.spacing.md};
  justify-content: center;
`;

const TechTag = styled.span`
  background: ${(props) => props.theme.colors.backgroundTertiary};
  color: ${(props) => props.theme.colors.accent};
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: 20px;
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const ContentStyled = styled.div`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: 16px;
  padding: ${(props) => props.theme.spacing.xl};
  border: 1px solid ${(props) => props.theme.colors.border};
  line-height: ${(props) => props.theme.typography.lineHeights.relaxed};
  backdrop-filter: blur(10px);

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
  }

  pre {
    background: ${(props) => props.theme.colors.backgroundTertiary};
    padding: ${(props) => props.theme.spacing.md};
    border-radius: 8px;
    overflow-x: auto;
    margin: ${(props) => props.theme.spacing.md} 0;
  }

  pre code {
    background: none;
    padding: 0;
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

  strong {
    color: ${(props) => props.theme.colors.text};
    font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 ${(props) => props.theme.spacing.lg};
    border-radius: 12px;
    padding: ${(props) => props.theme.spacing.lg};
  }
`;

const LinksSectionStyled = styled.div`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 16px;
  padding: ${(props) => props.theme.spacing.xl};
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.xl};
`;

const LinkButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  background: ${(props) => props.theme.colors.cosmicGradient};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
  border-radius: 50px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  margin: ${(props) => props.theme.spacing.sm};
  transition: all ${(props) => props.theme.animations.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(108, 92, 231, 0.3);
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xxl};
  color: ${(props) => props.theme.colors.textSecondary};
`;

const ProjectPost = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  if (!project) {
    return (
      <ProjectContainer>
        <Container>
          <NotFound>
            <h2>Project Not Found</h2>
            <p>The project you're looking for doesn't exist.</p>
            <BackButton to="/projects" whileHover={{ x: -5 }}>
              <FiArrowLeft />
              Back to Projects
            </BackButton>
          </NotFound>
        </Container>
      </ProjectContainer>
    );
  }

  return (
    <ProjectContainer>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Navigation variants={itemVariants}>
            <BackButton
              to="/projects"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Projects
            </BackButton>
          </Navigation>

          <motion.div variants={itemVariants}>
            <HeaderContainer>
              <motion.div variants={itemVariants}>
                <ProjectTitleStyled>
                  {project.title}
                </ProjectTitleStyled>
              </motion.div>

              <motion.div variants={itemVariants}>
                <ProjectSubtitleStyled>
                  {project.subtitle}
                </ProjectSubtitleStyled>
              </motion.div>

              <motion.div variants={itemVariants}>
                <ProjectYearStyled>
                  <FiCalendar />
                  {project.year} Project
                </ProjectYearStyled>
              </motion.div>

              <motion.div variants={itemVariants}>
                <TechStack>
                  {project.tech.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </TechStack>
              </motion.div>
            </HeaderContainer>
          </motion.div>

          {project.featuredImage && project.featuredImage.trim() !== "" ? (
            <motion.div variants={itemVariants}>
              <FeaturedImageContainer>
                <img
                  src={project.featuredImage}
                  alt={project.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </FeaturedImageContainer>
            </motion.div>
          ) : null}

          <motion.div variants={itemVariants}>
                          <ContentStyled>
                {(() => {
                  // Process content to handle slideshow comments
                  const slideshowRegex = /<!-- slideshow:([^:]+)(?::([^ ]+))? -->/g;
                  const parts = project.content.split(slideshowRegex);

                  return parts.map((part, index) => {
                    if (index % 3 === 0) {
                      // Regular markdown content
                      return (
                        <ReactMarkdown
                          key={`content-${index}`}
                          components={customComponents(project)}
                        >
                          {part}
                        </ReactMarkdown>
                      );
                    } else if (index % 3 === 1) {
                      // This is a slideshow ID
                      const slideshowId = part;
                      const mode = parts[index + 1] || "buttons";
                      return (
                        <SlideshowComponent
                          key={`slideshow-${slideshowId}-${mode}-${index}`}
                          slideshowId={slideshowId}
                          project={project}
                          mode={mode}
                        />
                      );
                    }
                    // Skip the mode part (index % 3 === 2)
                    return null;
                  }).filter(Boolean);
                })()}
              </ContentStyled>
          </motion.div>

          {(project.github || project.external) && (
            <motion.div variants={itemVariants}>
              <LinksSectionStyled>
              <h3 style={{ marginBottom: '1.5rem', color: '#ffffff' }}>
                Project Resources & Links
              </h3>
              <div>
                {project.github && (
                  <LinkButton
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGithub />
                    View on GitHub
                  </LinkButton>
                )}
                {project.external && (
                  <LinkButton
                    href={project.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiExternalLink />
                    External Link
                  </LinkButton>
                )}
              </div>
              </LinksSectionStyled>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </ProjectContainer>
  );
};

export default ProjectPost;

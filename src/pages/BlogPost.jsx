import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighterComponent from "../components/SyntaxHighlighter";
import Slideshow from "../components/Slideshow";
import { FiArrowLeft, FiCalendar, FiTag, FiClock } from "react-icons/fi";
import { getPostBySlug, formatDate } from "../utils/blogDataGenerated";
import { getGradientById } from "../utils/gradients";

const BlogPostContainer = styled.main`
  padding-top: 120px;
  padding-bottom: ${(props) => props.theme.spacing.xxl};
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.lg};
`;

const FeaturedImage = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['variants', 'initial', 'animate', 'exit', 'transition'].includes(prop)
})`
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

const BackButton = styled(motion.create(Link))`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  
  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const Header = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['variants', 'initial', 'animate', 'exit', 'transition'].includes(prop)
})`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.xxl};
`;

const Title = styled(motion.h1).withConfig({
  shouldForwardProp: (prop) => !['variants', 'initial', 'animate', 'exit', 'transition'].includes(prop)
})`
  font-size: ${(props) => props.theme.typography.fontSizes.hero};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md};
  line-height: ${(props) => props.theme.typography.lineHeights.tight};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.typography.fontSizes.xxl};
  }
`;

const Meta = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['variants', 'initial', 'animate', 'exit', 'transition'].includes(prop)
})`
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

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
`;

const Tags = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['variants', 'initial', 'animate', 'exit', 'transition'].includes(prop)
})`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: ${(props) => props.theme.colors.backgroundTertiary};
  color: ${(props) => props.theme.colors.accent};
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: 20px;
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const SlideshowComponent = ({ slideshowId, post, mode = "buttons" }) => {
  if (!post.slideshows || !slideshowId) return null;
  
  const slideshow = post.slideshows.find(s => s.id === slideshowId);
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
      showImageText={false}
      imageFitMode="cover"
      fullBleed={false}
      zoomEnabled={false}
      autoSlide={false}
      autoSlideInterval={5000}
    />
  );
};

const customComponents = (post) => ({
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

const Content = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['variants', 'initial', 'animate', 'exit', 'transition'].includes(prop)
})`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: 16px;
  padding: ${(props) => props.theme.spacing.xl};
  border: 1px solid ${(props) => props.theme.colors.border};
  line-height: ${(props) => props.theme.typography.lineHeights.relaxed};
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 ${(props) => props.theme.spacing.lg};
    border-radius: 12px;
    padding: ${(props) => props.theme.spacing.lg};
  }

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

const NotFound = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xxl};
  color: ${(props) => props.theme.colors.textSecondary};
`;

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);



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

  if (!post) {
    return (
      <BlogPostContainer>
        <Container>
          <NotFound>
            <h2>Blog Post Not Found</h2>
            <p>The blog post you're looking for doesn't exist.</p>
            <BackButton to="/blog" whileHover={{ x: -5 }}>
              <FiArrowLeft />
              Back to Blog
            </BackButton>
          </NotFound>
        </Container>
      </BlogPostContainer>
    );
  }

  return (
    <BlogPostContainer>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <BackButton to="/blog" whileHover={{ x: -5 }}>
            <FiArrowLeft />
            Back to Blog
          </BackButton>

          <Header>
            <Title variants={itemVariants}>{post.title}</Title>
            
            <Meta variants={itemVariants}>
              <MetaItem>
                <FiCalendar />
                {formatDate(post.date)}
              </MetaItem>
              <MetaItem>
                <FiClock />
                {post.readTime}
              </MetaItem>
              <MetaItem>
                <FiTag />
                {post.category}
              </MetaItem>
            </Meta>

            <Tags variants={itemVariants}>
              {post.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </Tags>
          </Header>

          {post.featuredImage && post.featuredImage.trim() !== "" ? (
            <FeaturedImage variants={itemVariants}>
              <img src={post.featuredImage} alt={post.title} />
            </FeaturedImage>
          ) : (
            <FeaturedImage 
              variants={itemVariants}
              style={{ 
                background: getGradientById(post.gradientId || "default").value 
              }}
            />
          )}

          <Content variants={itemVariants}>
            {(() => {
              // Process content to handle slideshow comments
              const slideshowRegex = /<!-- slideshow:([^:]+)(?::([^ ]+))? -->/g;
              const parts = post.content.split(slideshowRegex);
              
              return parts.map((part, index) => {
                if (index % 3 === 0) {
                  // Regular markdown content
                  return (
                    <ReactMarkdown
                      key={`content-${index}`}
                      components={customComponents(post)}
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
                      post={post}
                      mode={mode}
                    />
                  );
                }
                // Skip the mode part (index % 3 === 2)
                return null;
              }).filter(Boolean);
            })()}
          </Content>
        </motion.div>
      </Container>
    </BlogPostContainer>
  );
};

export default BlogPost; 
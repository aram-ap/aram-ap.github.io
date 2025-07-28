import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiCalendar, FiTag, FiArrowRight, FiEdit3 } from "react-icons/fi";
import { blogPosts, getCategories, formatDate } from "../utils/blogDataGenerated";
import { getGradientById } from "../utils/gradients";

/**
 * Blog page component with search and filtering capabilities
 * Features: search functionality, category filtering, responsive grid layout
 */

const BlogContainer = styled.main`
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

const SearchSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  gap: ${(props) => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const SearchInput = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
`;

const SearchField = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  padding-left: 48px;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 50px;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.md};
  transition: all ${(props) => props.theme.animations.normal};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.accentLight};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: ${(props) => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.textSecondary};
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

const BlogGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${(props) => props.theme.spacing.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled(motion.create(Link))`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.border};
  transition: all ${(props) => props.theme.animations.normal};
  cursor: pointer;
  text-decoration: none;
  display: block;

  &:hover {
    transform: translateY(-8px);
    border-color: ${(props) => props.theme.colors.accent};
    box-shadow: 0 20px 40px rgba(162, 89, 247, 0.1);
  }
`;

const BlogImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.accent}, ${(props) => props.theme.colors.success});
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${(props) => props.theme.animations.normal};
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

  ${BlogCard}:hover img {
    transform: scale(1.05);
  }

  ${BlogCard}:hover &::after {
    opacity: 1;
  }
`;

const BlogContent = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  color: ${(props) => props.theme.colors.textSecondary};
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
`;

const BlogTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.xl};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  line-height: ${(props) => props.theme.typography.lineHeights.tight};
`;

const BlogExcerpt = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.md};
  line-height: ${(props) => props.theme.typography.lineHeights.relaxed};
`;

const BlogTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const BlogTag = styled.span`
  background: ${(props) => props.theme.colors.backgroundTertiary};
  color: ${(props) => props.theme.colors.accent};
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: 20px;
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const ReadMore = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  color: ${(props) => props.theme.colors.accent};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xxl};
  color: ${(props) => props.theme.colors.textSecondary};
`;

const EditorButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.xs};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${(props) => props.theme.animations.normal};
  margin: ${(props) => props.theme.spacing.lg} auto 0;
  box-shadow: 0 2px 8px rgba(162, 89, 247, 0.2);

  &:hover {
    background: ${(props) => props.theme.colors.accentDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(162, 89, 247, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const EditorSection = styled(motion.div)`
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.xxl};
  padding-top: ${(props) => props.theme.spacing.xxl};
  border-top: 1px solid ${(props) => props.theme.colors.border};
`;

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  const handleOpenEditor = () => {
    navigate('/blog-editor');
  };

  const categories = getCategories();

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = activeFilter === "All" || post.category === activeFilter;

    return matchesSearch && matchesCategory;
  });



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
  };

  return (
    <BlogContainer>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Header>
            <Title variants={itemVariants}>Blog</Title>
            <Subtitle variants={itemVariants}>
              Thoughts, tutorials, and insights on technology, space exploration, and web development.
            </Subtitle>
          </Header>

          <SearchSection variants={itemVariants}>
            <SearchInput>
              <SearchIcon />
              <SearchField
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInput>

            {categories.map((category) => (
              <FilterButton
                key={category}
                $active={activeFilter === category}
                onClick={() => setActiveFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiTag />
                {category}
              </FilterButton>
            ))}
          </SearchSection>

          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              <BlogGrid
                key={`${searchTerm}-${activeFilter}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                    layout
                  >
                    <BlogImage>
                      {post.featuredImage && post.featuredImage.trim() !== "" ? (
                        <img src={post.featuredImage} alt={post.title} />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          background: getGradientById(post.gradientId || "default").value
                        }} />
                      )}
                    </BlogImage>
                    <BlogContent>
                      <BlogMeta>
                        <MetaItem>
                          <FiCalendar />
                          {formatDate(post.date)}
                        </MetaItem>
                        <MetaItem>
                          <FiTag />
                          {post.category}
                        </MetaItem>
                      </BlogMeta>

                      <BlogTitle>{post.title}</BlogTitle>
                      <BlogExcerpt>{post.excerpt}</BlogExcerpt>

                      <BlogTags>
                        {post.tags.map((tag, index) => (
                          <BlogTag key={index}>{tag}</BlogTag>
                        ))}
                      </BlogTags>

                      <ReadMore
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        Read More
                        <FiArrowRight />
                      </ReadMore>
                    </BlogContent>
                  </BlogCard>
                ))}
              </BlogGrid>
            ) : (
              <EmptyState
                key="empty"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <h3>No posts found</h3>
                <p>Try adjusting your search terms or filters.</p>
              </EmptyState>
            )}
          </AnimatePresence>

          <EditorSection variants={itemVariants}>
            <EditorButton
              onClick={handleOpenEditor}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiEdit3 />
              Create Blog Post
            </EditorButton>
          </EditorSection>
        </motion.div>
      </Container>
    </BlogContainer>
  );
};

export default Blog;

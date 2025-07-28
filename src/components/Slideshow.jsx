import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiCircle, FiX, FiMaximize2, FiPlay, FiPause } from "react-icons/fi";

/**
 * Advanced slideshow component with scroll-based and button-based interactions
 * Features: Mobile-first design, smooth animations, aspect ratio handling, modal expansion
 */

const SlideshowContainer = styled.div`
  width: 100%;
  margin: 0;
  position: relative;
  border-radius: 0;
  overflow: hidden;
  background: #0a0a0f;
  touch-action: pan-y;

  /* Mobile breakout - full width */
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-left: -${(props) => props.theme.spacing.lg};
    margin-right: -${(props) => props.theme.spacing.lg};
    width: calc(100% + ${(props) => props.theme.spacing.lg} * 2);
    /* Ensure smooth scrolling on mobile */
    -webkit-overflow-scrolling: touch;
  }

  ${(props) => props.$fullBleed && `
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    max-width: 100vw;
    overflow: hidden;
  `}

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    border-radius: 24px;
    margin: ${(props) => props.theme.spacing.xxl} 0;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border: 1px solid ${(props) => props.theme.colors.border};
  }
`;

const SlideshowContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;

  ${(props) => props.$pos === 'right' && `
    @media(min-width:${props.theme.breakpoints.tablet}){
      grid-template-columns:1.2fr 1fr;
      grid-template-rows: 1fr;
    }
  `}

  ${(props) => props.$pos === 'left' && `
    @media(min-width:${props.theme.breakpoints.tablet}){
      grid-template-columns:1fr 1.2fr;
      grid-template-rows: 1fr;
    }
  `}
`;

const ImageSection = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  min-height: 300px; /* Stable minimum height to prevent layout shifts */
  width: 100%;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    min-height: 250px;
    align-items: center; /* Center images on mobile */
  }
`;

// Update SlideContainer styling for hardware acceleration
const SlideContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    /* Reduce animation complexity on mobile */
    transform: translate3d(0, 0, 0);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  cursor: ${(props) => props.$zoomEnabled ? 'pointer' : 'default'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    min-height: 250px; /* Ensure consistent container height */
  }
  
  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    min-height: 300px;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: ${(props) => {
    switch (props.$fitMode) {
      case 'fill': return 'fill';
      case 'stretch': return 'stretch';
      case 'cover': return 'cover';
      case 'contain': return 'contain';
      default: return 'cover';
    }
  }};
  object-position: center;
  transition: transform ${(props) => props.theme.animations.normal};
  max-height: 500px; /* Consistent max height */
  max-width: 100%;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    /* Disable hover effects on mobile for better performance */
    transition: none;
    max-height: 400px;
    object-fit: cover; /* Force cover on mobile to prevent stretching */
  }
  
  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: 500px; /* Fixed height on desktop with object-fit */
    &:hover {
      transform: scale(1.02);
    }
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 4px;
  left: 0;
  right: 0;
  color: white;
  padding: 0 ${(props) => props.theme.spacing.xl};
  text-align: left;
  z-index: 3;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.spacing.lg};
    text-align: left;
  }
`;

const ImageOverlayBackground = styled.div`
  background: rgba(0, 0, 0, 0.75);
  padding: 2px 8px 2px 8px;
  border-radius: 4px;
  display: inline-block;
  max-width: 80%;
  line-height: 1;
  vertical-align: middle;
`;

const ImageTitle = styled.span`
  font-size: ${(props) => props.theme.typography.fontSizes.xl};
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  font-family: ${(props) => props.theme.typography.fontFamily};
  margin: 0 0 ${(props) => props.theme.spacing.sm} 0;
  padding: 0;
  letter-spacing: -0.02em;
  display: block;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.typography.fontSizes.lg};
  }
`;

const ImageCaption = styled.p`
  font-size: ${(props) => props.theme.typography.fontSizes.md};
  opacity: 0.95;
  line-height: 1.5;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.typography.fontSizes.sm};
  }
`;

const TextSection = styled.div`
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: #0a0a0f;
  ${(props)=>props.$pos==='above' && `order:-1;`}
  ${(props)=>props.$pos==='below' && ``}
  ${(props)=>props.$pos==='left' && `grid-column:1/2;`}
  ${(props)=>props.$pos==='right' && `grid-column:2/3;`}
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.lg};
    order: -1;
  }
`;

const TextContent = styled(motion.div)`
  color: ${(props) => props.theme.colors.text};
  width: 100%;
  
  h3 {
    font-size: ${(props) => props.theme.typography.fontSizes.xxl};
    font-weight: ${(props) => props.theme.typography.fontWeights.bold};
    margin-bottom: ${(props) => props.theme.spacing.lg};
    color: ${(props) => props.theme.colors.text};
    letter-spacing: -0.03em;
    line-height: 1.2;
    
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.typography.fontSizes.xl};
      margin-bottom: ${(props) => props.theme.spacing.md};
    }
  }
  
  p {
    font-size: ${(props) => props.theme.typography.fontSizes.lg};
    line-height: 1.7;
    margin-bottom: ${(props) => props.theme.spacing.lg};
    color: ${(props) => props.theme.colors.textSecondary};
    font-weight: ${(props) => props.theme.typography.fontWeights.medium};
    
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.typography.fontSizes.md};
      line-height: 1.6;
      margin-bottom: ${(props) => props.theme.spacing.md};
    }
  }
  
  ul {
    margin: ${(props) => props.theme.spacing.lg} 0;
    padding-left: ${(props) => props.theme.spacing.xl};
    
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: ${(props) => props.theme.spacing.md} 0;
      padding-left: ${(props) => props.theme.spacing.lg};
    }
  }
  
  li {
    margin-bottom: ${(props) => props.theme.spacing.md};
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: ${(props) => props.theme.typography.fontSizes.md};
    line-height: 1.6;
    font-weight: ${(props) => props.theme.typography.fontWeights.medium};
    
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.typography.fontSizes.sm};
      margin-bottom: ${(props) => props.theme.spacing.sm};
    }
    
    &::marker {
      color: ${(props) => props.theme.colors.accent};
    }
  }
`;

const NavigationControls = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 ${(props) => props.theme.spacing.xl};
  pointer-events: none;
  z-index: 10;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.spacing.md};
  }
`;

const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 4;
  font-size: 20px;
  backdrop-filter: blur(10px);
  transition: all ${(props) => props.theme.animations.fast};
  pointer-events: auto;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    /* Optimize for touch on mobile */
    width: 44px;
    height: 44px;
    backdrop-filter: none;
    transition: none;
    touch-action: manipulation;
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: translateY(-50%) scale(1.1);
    
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      transform: translateY(-50%);
    }
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
    
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      transform: translateY(-50%) scale(0.9);
    }
  }

  &:first-of-type {
    left: ${(props) => props.theme.spacing.lg};
  }

  &:last-of-type {
    right: ${(props) => props.theme.spacing.lg};
  }
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  z-index: 10;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    bottom: 2px;
  }
`;

const Indicator = styled(motion.button)`
  background: ${(props) => props.$active ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.3)'};
  border: none;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all ${(props) => props.theme.animations.normal};
  touch-action: manipulation;
  pointer-events: auto;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 12px;
    height: 12px;
    backdrop-filter: none;
    transition: none;
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  
  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    &:hover {
      background: ${(props) => props.$active ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.6)'};
      transform: scale(1.3);
    }
  }
`;

const ExpandButton = styled(motion.button)`
  position: absolute;
  top: ${(props) => props.theme.spacing.md};
  right: ${(props) => props.theme.spacing.md};
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all ${(props) => props.theme.animations.normal};
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 36px;
    height: 36px;
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: ${(props) => props.theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  opacity: 0.8;
  z-index: 10;
  text-align: center;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    bottom: ${(props) => props.theme.spacing.md};
    font-size: ${(props) => props.theme.typography.fontSizes.xs};
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 0;
`;

const ModalContent = styled(motion.div)`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 0;
  }
`;

const ModalCloseButton = styled(motion.button)`
  position: fixed;
  top: 40px;
  right: 24px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${(props) => props.theme.animations.normal};
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    top: 16px;
    right: 16px;
    width: 36px;
    height: 36px;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const Slideshow = ({ 
  slides, 
  autoPlay = false, 
  autoPlayInterval = 5000,
  showIndicators = true,
  showNavigation = true,
  height = "600px",
  mode = "buttons", // "buttons" or "scroll"
  showImageText = false, // New prop to control image text visibility
  imageFitMode = "cover", // New prop for image fit: "cover", "contain", "fill", "stretch"
  fullBleed = false,
  textPosition = "below", // "below", "right", "left", "above"
  zoomEnabled = false, // Enable/disable image zoom functionality
  autoSlide = false, // Enable/disable auto slide progression
  autoSlideInterval = 5000 // Auto slide interval in milliseconds
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(autoSlide);
  const autoPlayRef = useRef(null);
  const autoSlideRef = useRef(null);
  const containerRef = useRef(null);
  const scrollY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100 };

  // Add mobile detection and performance optimization
  // Mobile detection for performance optimization
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload current image to prevent layout shifts
  useEffect(() => {
    if (slides && slides.length > 0) {
      const safeIndex = Math.max(0, Math.min(slides.length - 1, currentSlide));
      const currentSlideData = slides[safeIndex];
      if (currentSlideData?.image) {
        setImageLoaded(false);
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src = currentSlideData.image;
      }
    }
  }, [slides, currentSlide]);

  // Early returns after useEffects
  if (!slides || slides.length === 0) {
    return null;
  }

  const safeIndex = Math.max(0, Math.min(slides.length - 1, currentSlide));
  const currentSlideData = slides[safeIndex];
  if (!currentSlideData) return null;

  // Smooth scroll-based slide transitions
  const slideIndex = useTransform(scrollY, (value) => {
    if (mode === "scroll" && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height * 0.8)));
      return Math.floor(progress * slides.length);
    }
    return currentSlide;
  }, springConfig);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const handleImageClick = useCallback(() => {
    if (zoomEnabled) {
      setIsModalOpen(true);
    }
  }, [zoomEnabled]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && isAutoPlaying && mode === "buttons") {
      autoPlayRef.current = setInterval(nextSlide, autoPlayInterval);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, isAutoPlaying, autoPlayInterval, slides.length, mode, nextSlide]);

  // Auto-slide functionality
  useEffect(() => {
    if (autoSlide && isAutoSliding) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, autoSlideInterval);
    }
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [autoSlide, isAutoSliding, autoSlideInterval, slides.length]);

  // Pause auto-play and auto-slide on hover
  const handleMouseEnter = useCallback(() => {
    if (autoPlay && mode === "buttons") {
      setIsAutoPlaying(false);
    }
    if (autoSlide) {
      setIsAutoSliding(false);
    }
  }, [autoPlay, mode, autoSlide]);

  const handleMouseLeave = useCallback(() => {
    if (autoPlay && mode === "buttons") {
      setIsAutoPlaying(true);
    }
    if (autoSlide) {
      setIsAutoSliding(true);
    }
  }, [autoPlay, mode, autoSlide]);

  // Scroll-based interaction – sequential slide changes, no skipping
  useEffect(() => {
    if (mode === "scroll") {
      let ticking = false;
      
      const handleScroll = () => {
        if (ticking) return;
        
        ticking = true;
        requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // More responsive progress calculation for mobile
          const containerMidpoint = rect.top + rect.height / 2;
          const viewportMidpoint = viewportHeight / 2;
          
          // Progress based on container midpoint relative to viewport midpoint
          let progress;
          if (containerMidpoint > viewportMidpoint) {
            // Container is below center - early slides
            progress = Math.max(0, (viewportHeight - containerMidpoint) / (viewportHeight / 2));
          } else {
            // Container is above center - later slides  
            progress = 0.5 + Math.min(0.5, (viewportMidpoint - containerMidpoint) / (viewportHeight / 2));
          }
          
          const clamped = Math.min(1, Math.max(0, progress));
          const slice = 1 / slides.length;
          let newIndex = Math.floor(clamped * slides.length);
          newIndex = Math.max(0, Math.min(slides.length - 1, newIndex));
          
          if (newIndex !== currentSlide) {
            setCurrentSlide(newIndex);
          }
          
          ticking = false;
        });
      };

      // Use passive scroll listener with throttling
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [mode, slides.length, currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (mode === "buttons") {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mode, prevSlide, nextSlide]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isModalOpen]);

  return (
    <SlideshowContainer 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ minHeight: height }}
      $fullBleed={fullBleed}
    >
      <SlideshowContent $pos={textPosition}>
        <ImageSection>
          <AnimatePresence mode={isMobile ? "sync" : "wait"}>
            <SlideContainer
              key={currentSlide}
              initial={{ 
                opacity: isMobile ? 1 : 0, 
                x: isMobile ? 20 : 300,
                scale: isMobile ? 1 : 0.95
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ 
                opacity: isMobile ? 1 : 0, 
                x: isMobile ? -20 : -300,
                scale: isMobile ? 1 : 0.95
              }}
              transition={{ 
                duration: isMobile ? 0.25 : 0.5,
                ease: "easeOut",
                opacity: { duration: isMobile ? 0 : 0.3 },
                type: isMobile ? "tween" : "spring",
                ...(isMobile ? {} : { stiffness: 300, damping: 30 }),
                // Respect reduced motion preferences
                ...(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 
                  { duration: 0.1, type: "tween" } : {})
              }}
            >
              <ImageContainer onClick={handleImageClick} $zoomEnabled={zoomEnabled}>
                <SlideImage 
                  src={currentSlideData.image} 
                  alt={currentSlideData.title || `Slide ${currentSlide + 1}`}
                  $fitMode={imageFitMode}
                  style={{ 
                    opacity: imageLoaded ? 1 : 0,
                    transition: 'opacity 0.2s ease'
                  }}
                  onLoad={() => setImageLoaded(true)}
                />
                {showImageText && currentSlideData.imageTitle && (
                  <ImageOverlay>
                    <ImageOverlayBackground>
                      <ImageTitle>{currentSlideData.imageTitle}</ImageTitle>
                      {currentSlideData.imageCaption && (
                        <ImageCaption>{currentSlideData.imageCaption}</ImageCaption>
                      )}
                    </ImageOverlayBackground>
                  </ImageOverlay>
                )}
                {zoomEnabled && (
                  <ExpandButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick();
                  }}
                >
                  <FiMaximize2 />
                </ExpandButton>
                )}
              </ImageContainer>
            </SlideContainer>
          </AnimatePresence>
          
          {showNavigation && slides.length > 1 && mode === "buttons" && (
            <NavigationControls>
              <NavButton
                onClick={prevSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronLeft />
              </NavButton>
              <NavButton
                onClick={nextSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronRight />
              </NavButton>
            </NavigationControls>
          )}
          
          {showIndicators && slides.length > 1 && mode === "buttons" && (
            <Indicators>
              {slides.map((_, index) => (
                <Indicator
                  key={index}
                  $active={index === currentSlide}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </Indicators>
          )}
          
          {mode === "scroll" && (
            <ScrollIndicator>
              Scroll to navigate • {currentSlide + 1} of {slides.length}
            </ScrollIndicator>
          )}
        </ImageSection>
        
        <TextSection $pos={textPosition}>
          <AnimatePresence mode="wait">
            <TextContent
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {currentSlideData.content}
            </TextContent>
          </AnimatePresence>
        </TextSection>
      </SlideshowContent>
      
      {/* Image Expansion Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalCloseButton
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX />
              </ModalCloseButton>
              <img 
                src={currentSlideData.image} 
                alt={currentSlideData.title || `Slide ${currentSlide + 1}`}
              />
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </SlideshowContainer>
  );
};

export default Slideshow; 
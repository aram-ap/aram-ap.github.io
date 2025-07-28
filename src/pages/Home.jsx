import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiSend, FiZap } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profileImage from "../assets/me.jpg";
import CircuitReveal from "../components/CircuitReveal";

const HomeContainer = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 80px;
  position: relative;
  overflow: hidden;
  /* No custom background or transition here; use global styles */
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.lg};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.xxl};
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.xl};
    text-align: center;
    padding: 5px;
  }
`;

const ContentSection = styled(motion.div)`
  z-index: 2;
`;

const Greeting = styled(motion.p)`
  color: ${(props) => props.theme.colors.accent};
  font-size: ${(props) => props.theme.typography.fontSizes.lg};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const Name = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  line-height: 1.1;
  text-shadow: 0 0 30px rgba(108, 92, 231, 0.5);
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: ${(props) => props.theme.typography.fontWeights.normal};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const Description = styled(motion.p)`
  font-size: ${(props) => props.theme.typography.fontSizes.lg};
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: ${(props) => props.theme.typography.lineHeights.relaxed};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  max-width: 500px;
`;

const NASAHighlight = styled(motion.div)`
  background: ${(props) => props.theme.colors.cosmicGradient};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: 12px;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  text-align: center;
  box-shadow: 0 0 30px rgba(108, 92, 231, 0.3);
`;

const NASAText = styled.p`
  color: ${(props) => props.theme.colors.text};
  font-weight: ${(props) => props.theme.typography.fontWeights.semibold};
  margin: 0;
  font-size: ${(props) => props.theme.typography.fontSizes.md};
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: ${(props) => props.theme.colors.cosmicGradient};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
  border-radius: 50px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  font-size: ${(props) => props.theme.typography.fontSizes.md};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  box-shadow: 0 0 20px rgba(108, 92, 231, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(108, 92, 231, 0.4);
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 50px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  font-size: ${(props) => props.theme.typography.fontSizes.md};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};

  &:hover {
    border-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const NASAProjectsSection = styled(motion.div)`
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const NASAProjectsTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md};
  font-size: ${(props) => props.theme.typography.fontSizes.lg};
`;

const NASAProjectButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  flex-wrap: wrap;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const NASAProjectButton = styled(motion.create(Link))`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  transition: all ${(props) => props.theme.animations.normal};
  text-decoration: none;

  &:hover {
    border-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(108, 92, 231, 0.2);
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.typography.fontSizes.xl};
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: 50%;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${(props) => props.theme.animations.normal};

  &:hover {
    color: ${(props) => props.theme.colors.accent};
    background: ${(props) => props.theme.colors.accentLight};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(108, 92, 231, 0.3);
  }
`;

const ImageSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ProfileImageContainer = styled(motion.div)`
  position: relative;
  width: 400px;
  height: 400px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 300px;
    height: 300px;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid ${(props) => props.theme.colors.accent};
  box-shadow: 0 0 50px rgba(108, 92, 231, 0.4);
  /* Prevent layout shift during loading */
  aspect-ratio: 1;
  background: ${(props) => props.theme.colors.backgroundSecondary};
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  background: ${(props) => props.theme.colors.accent};
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(108, 92, 231, 0.6);

  &:nth-child(2) {
    top: 10%;
    right: 10%;
    width: 15px;
    height: 15px;
  }

  &:nth-child(3) {
    bottom: 20%;
    left: 10%;
    width: 25px;
    height: 25px;
    background: ${(props) => props.theme.colors.secondary};
    box-shadow: 0 0 15px rgba(9, 132, 227, 0.6);
  }

  &:nth-child(4) {
    top: 40%;
    left: -20px;
    width: 12px;
    height: 12px;
    background: ${(props) => props.theme.colors.success};
    box-shadow: 0 0 15px rgba(0, 206, 201, 0.6);
  }

  &:nth-child(5) {
    top: 60%;
    right: -15px;
    width: 18px;
    height: 18px;
    background: ${(props) => props.theme.colors.warning};
    box-shadow: 0 0 15px rgba(253, 203, 110, 0.6);
  }
`;

const Home = () => {
    // Animation state management
    const [circuitComplete, setCircuitComplete] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    // Circuit reveal animation control: null=checking, true=show, false=skip
    const [showCircuitReveal, setShowCircuitReveal] = useState(null);
    // Content animation control: prevent animations on subsequent visits
    const [hasVisitedHome, setHasVisitedHome] = useState(window.__homePageVisited || false);
    const location = useLocation();
    const navigate = useNavigate();

    // Decide whether to show the CircuitReveal animation.
    // We show it ONLY the very first time Home mounts in a given SPA runtime.
    // Subsequent navigations back to Home skip it. A full page refresh resets the flag.
    useEffect(() => {
        const flag = sessionStorage.getItem('circuitRevealShown');
        if (flag === 'true') {
            // Already shown during this page session – skip animation.
            setShowCircuitReveal(false);
            setCircuitComplete(true);
            setHasVisitedHome(true);
            window.__circuitRevealShown = true;
        } else {
            // First time – show animation and set the flag.
            sessionStorage.setItem('circuitRevealShown', 'true');
            window.__circuitRevealShown = true;
            setShowCircuitReveal(true);
        }

        // Clear the flag when the user reloads or leaves the page so that a hard refresh
        // will play the animation again.
        const handleBeforeUnload = () => {
            sessionStorage.removeItem('circuitRevealShown');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Track home page visits to prevent content animations on subsequent visits
    useEffect(() => {
        if (!window.__homePageVisited) {
            window.__homePageVisited = true;
        }
    }, []);

    // Preload the profile image
    useEffect(() => {
        const img = new Image();
        img.src = profileImage;
        img.onload = () => setImageLoaded(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: (window.__homePageVisited || hasVisitedHome) ? 0 : 0.3,
                delayChildren: (window.__homePageVisited || hasVisitedHome) ? 0 : (showCircuitReveal ? (circuitComplete ? 0.5 : 4.0) : 0),
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: (window.__homePageVisited || hasVisitedHome) ? 0 : 0.6,
                ease: "easeOut",
            },
        },
    };

    const socialLinks = [
        { icon: FiGithub, href: "https://github.com/aram-ap", label: "GitHub" },
        { icon: FiLinkedin, href: "https://linkedin.com/in/aram-aprahamian", label: "LinkedIn" },
        { icon: FiMail, href: "mailto:aram@apra.dev", label: "Email" },
    ];

    const handleCircuitComplete = () => {
        setCircuitComplete(true);
    };

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = '/aram-aprahamian-resume.pdf';
        link.download = 'Aram_Aprahamian_Resume.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleGetInTouch = () => {
        navigate('/contact');
    };

    // Don't render anything until we've determined whether to show the animation
    if (showCircuitReveal === null) {
        return null;
    }

    return (
        <>
            {showCircuitReveal && <CircuitReveal onComplete={handleCircuitComplete} />}
            <HomeContainer>
                <Container>
                    <ContentSection
                        variants={containerVariants}
                        initial={hasVisitedHome ? "visible" : "hidden"}
                        animate="visible"
                    >
                        <Greeting variants={itemVariants}>
                            Hello, I'm
                        </Greeting>

                        <Name variants={itemVariants}>
                            Aram Aprahamian
                        </Name>

                        <Title variants={itemVariants}>
                            Software Systems Engineer
                        </Title>

                        <NASAHighlight variants={itemVariants}>
                            <NASAText>
                                🚀 NASA RockSat-X | Software Lead 2024 | Electrical Lead 2025
                            </NASAText>
                        </NASAHighlight>

                        <Description variants={itemVariants}>
                            Hey, I’m Aram—a 21-year-old full-stack engineer who loves space and making cool stuff.
                            From coding sleek IoT apps and visualizing data, to designing PCBs and playing with robots,
                            I’m all about blending hardware and software into something awesome. If it’s techy and fun, count me in.
                        </Description>

                        <NASAProjectsSection variants={itemVariants}>
                            <NASAProjectsTitle>Featured NASA Projects</NASAProjectsTitle>
                            <NASAProjectButtons>
                                <NASAProjectButton
                                    to="/nasa-rocksat-2025"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FiZap />
                                    RockSat-X 2025 (Electrical Lead)
                                </NASAProjectButton>
                                <NASAProjectButton
                                    to="/nasa-rocksat-2024"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FiSend />
                                    RockSat-X 2024 (Software Lead)
                                </NASAProjectButton>
                            </NASAProjectButtons>
                        </NASAProjectsSection>

                        <ButtonGroup variants={itemVariants}>
                            <PrimaryButton
                                onClick={handleGetInTouch}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiMail />
                                Get In Touch
                            </PrimaryButton>

                            <SecondaryButton
                                onClick={handleDownloadResume}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiDownload />
                                Resume
                            </SecondaryButton>
                        </ButtonGroup>

                        <SocialLinks variants={itemVariants}>
                            {socialLinks.map((social, index) => (
                                <SocialLink
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <social.icon />
                                </SocialLink>
                            ))}
                        </SocialLinks>
                    </ContentSection>

                    <ImageSection
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                            duration: (window.__homePageVisited || hasVisitedHome) ? 0 : 0.8, 
                            delay: (window.__homePageVisited || hasVisitedHome) ? 0 : (showCircuitReveal ? (circuitComplete ? 1.0 : 4.5) : 0.5) 
                        }}
                    >
                        <ProfileImageContainer>
                            <ProfileImage
                                src={profileImage}
                                alt="Aram Aprahamian"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />

                            <FloatingElement
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: (window.__homePageVisited || hasVisitedHome) ? 0 : (showCircuitReveal ? (circuitComplete ? 0 : 4.0) : 0),
                                }}
                            />
                            <FloatingElement
                                animate={{
                                    y: [0, 15, 0],
                                    x: [0, 10, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: (window.__homePageVisited || hasVisitedHome) ? 0 : (showCircuitReveal ? (circuitComplete ? 1 : 5.0) : 0.5),
                                }}
                            />
                            <FloatingElement
                                animate={{
                                    y: [0, -15, 0],
                                    rotate: -360,
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: (window.__homePageVisited || hasVisitedHome) ? 0 : (showCircuitReveal ? (circuitComplete ? 2 : 6.0) : 1.0),
                                }}
                            />
                            <FloatingElement
                                animate={{
                                    x: [0, 20, 0],
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: (window.__homePageVisited || hasVisitedHome) ? 0 : (showCircuitReveal ? (circuitComplete ? 0.5 : 4.5) : 0.2),
                                }}
                            />
                            <FloatingElement
                                animate={{
                                    y: [0, -25, 0],
                                    x: [0, -15, 0],
                                    rotate: 180,
                                }}
                                transition={{
                                    duration: 7,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: (window.__homePageVisited || hasVisitedHome) ? 0 : (showCircuitReveal ? (circuitComplete ? 1.5 : 5.5) : 0.8),
                                }}
                            />
                        </ProfileImageContainer>
                    </ImageSection>
                </Container>
            </HomeContainer>
        </>
    );
};

export default Home;

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiCode, FiUsers, FiSend, FiStar, FiGithub, FiExternalLink, FiCalendar, FiAward } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProjectContainer = styled.main`
  padding-top: 120px;
  padding-bottom: ${(props) => props.theme.spacing.xxl};
  background: ${(props) => props.theme.colors.spaceGradient};
  min-height: 100vh;
`;

const Navigation = styled(motion.div)`
  margin-bottom: ${(props) => props.theme.spacing.xl};
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
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.xxl};
`;

const ProjectTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md};
  text-shadow: 0 0 20px rgba(108, 92, 231, 0.5);
`;

const ProjectSubtitle = styled(motion.h2)`
  font-size: ${(props) => props.theme.typography.fontSizes.xl};
  color: ${(props) => props.theme.colors.accent};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const ProjectYear = styled(motion.div)`
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing.xxl};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ContentCard = styled(motion.div)`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 16px;
  padding: ${(props) => props.theme.spacing.xl};
  backdrop-filter: blur(10px);
  transition: all ${(props) => props.theme.animations.normal};

  &:hover {
    border-color: ${(props) => props.theme.colors.accent};
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(108, 92, 231, 0.1);
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${(props) => props.theme.colors.cosmicGradient};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.xl};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const CardTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  font-size: ${(props) => props.theme.typography.fontSizes.xl};
`;

const CardContent = styled.div`
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: ${(props) => props.theme.typography.lineHeights.relaxed};
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.xs};
  margin-top: ${(props) => props.theme.spacing.md};
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

const LinksSection = styled(motion.div)`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 16px;
  padding: ${(props) => props.theme.spacing.xl};
  text-align: center;
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

const AchievementsList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing.sm};
    margin-bottom: ${(props) => props.theme.spacing.md};
    color: ${(props) => props.theme.colors.textSecondary};

    &::before {
      content: "🚀";
      font-size: ${(props) => props.theme.typography.fontSizes.md};
      margin-top: 2px;
    }
  }
`;

const NASARockSat2024 = () => {
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

    const techStack = [
        "C++", "Python", "Arduino", "Embedded Systems",
        "Real-time Programming", "Sensor Integration", "Data Logging",
        "Flight Software", "Mission Planning", "Testing & Validation"
    ];

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

                    <Header>
                        <ProjectTitle variants={itemVariants}>
                            NASA RockSat-X 2024
                        </ProjectTitle>

                        <ProjectSubtitle variants={itemVariants}>
                            Software Lead | Suborbital Research Mission
                        </ProjectSubtitle>

                        <ProjectYear variants={itemVariants}>
                            <FiCalendar />
                            2024 Mission
                        </ProjectYear>
                    </Header>

                    <ContentGrid>
                        <ContentCard variants={itemVariants}>
                            <CardIcon>
                                <FiCode />
                            </CardIcon>
                            <CardTitle>Mission Overview</CardTitle>
                            <CardContent>
                                <p>
                                    As a 19-year-old college student, stepping up to lead the software team for NASA's RockSat-X project was both daunting and exhilarating. We developed a payload for a suborbital research mission launching from Wallops Flight Facility, aimed at studying atmospheric and space environments with a deployable capsule reaching over 100km in altitude.
                                </p>
                                <p>
                                    In my role as Software Lead, I designed and implemented the flight software systems, collaborated closely with hardware teams, and focused on ensuring reliability in the demanding space environment. There were tough moments balancing this with my coursework, but pushing through taught me invaluable lessons in resilience.
                                </p>
                            </CardContent>
                        </ContentCard>

                        <ContentCard variants={itemVariants}>
                            <CardIcon>
                                <FiUsers />
                            </CardIcon>
                            <CardTitle>Leadership Role</CardTitle>
                            <CardContent>
                                <p>
                                    <strong>Software Team Lead</strong> - I guided a team of 8 fellow students, establishing coding standards, review processes, and development workflows while navigating the pressures of college life.
                                </p>
                                <AchievementsList>
                                    <li>Introduced agile practices to meet the rigorous space mission timeline—it took some trial and error, but it kept us on track</li>
                                    <li>Implemented code review protocols and testing frameworks that prevented major issues</li>
                                    <li>Collaborated with NASA engineers, an experience that was equal parts intimidating and inspiring</li>
                                    <li>Delivered flight-ready software on schedule, despite the occasional all-nighter</li>
                                </AchievementsList>
                            </CardContent>
                        </ContentCard>

                        <ContentCard variants={itemVariants}>
                            <CardIcon>
                                <FiSend />
                            </CardIcon>
                            <CardTitle>Technical Achievements</CardTitle>
                            <CardContent>
                                <p>
                                    Creating software resilient enough for suborbital flight conditions was a steep learning curve—I dove deep into embedded systems and fault tolerance. Here's what we accomplished:
                                </p>
                                <AchievementsList>
                                    <li>Real-time data acquisition and telemetry systems built to withstand extreme vibrations</li>
                                    <li>A fault-tolerant architecture that maintained operations even under stress</li>
                                    <li>Autonomous experiment control and data logging for the flight duration</li>
                                    <li>Ground communication protocols that required meticulous refinement</li>
                                    <li>Pre-flight simulation environments for thorough testing and validation</li>
                                </AchievementsList>
                                <TechStack>
                                    {techStack.map((tech, index) => (
                                        <TechTag key={index}>{tech}</TechTag>
                                    ))}
                                </TechStack>
                            </CardContent>
                        </ContentCard>

                        <ContentCard variants={itemVariants}>
                            <CardIcon>
                                <FiAward />
                            </CardIcon>
                            <CardTitle>Mission Success</CardTitle>
                            <CardContent>
                                <p>
                                    The 2024 RockSat-X mission achieved its core objectives, though we faced a setback with the radio antennas breaking during launch—it was disappointing, but the software performed without a hitch.
                                </p>
                                <AchievementsList>
                                    <li>Successfully executed all planned experiments in microgravity</li>
                                    <li>Maintained continuous telemetry throughout the flight, despite the communication challenges</li>
                                    <li>Recovered all data post-flight, turning potential loss into valuable insights</li>
                                </AchievementsList>
                            </CardContent>
                        </ContentCard>
                    </ContentGrid>

                    <LinksSection variants={itemVariants}>
                        <h3 style={{ marginBottom: '1.5rem', color: '#ffffff' }}>
                            Project Resources & Documentation
                        </h3>
                        <div>
                            <LinkButton
                                href="https://github.com/aram-ap/COCRockSatX2024"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiGithub />
                                Github
                            </LinkButton>
                            <LinkButton
                                href="https://www.nasa.gov/wallops/stem/rocksatx/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiExternalLink />
                                NASA Mission Page
                            </LinkButton>
                        </div>
                    </LinksSection>
                </motion.div>
            </Container>
        </ProjectContainer>
    );
};
export default NASARockSat2024;


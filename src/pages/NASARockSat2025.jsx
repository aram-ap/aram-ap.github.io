import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiZap, FiCpu, FiUsers, FiSend, FiGithub, FiExternalLink, FiCalendar, FiAward, FiSettings } from "react-icons/fi";

const ProjectContainer = styled.main`
  padding-top: 120px;
  padding-bottom: ${(props) => props.theme.spacing.xxl};
  background: ${(props) => props.theme.colors.spaceGradient};
  min-height: 100vh;
`;

const Navigation = styled(motion.div)`
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const BackButton = styled(motion(Link))`
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
  text-shadow: 0 0 20px rgba(9, 132, 227, 0.5);
`;

const ProjectSubtitle = styled(motion.h2)`
  font-size: ${(props) => props.theme.typography.fontSizes.xl};
  color: ${(props) => props.theme.colors.secondary};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const ProjectYear = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  background: linear-gradient(135deg, #0984e3 0%, #6c5ce7 100%);
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
    border-color: ${(props) => props.theme.colors.secondary};
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(9, 132, 227, 0.1);
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #0984e3 0%, #6c5ce7 100%);
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
  color: ${(props) => props.theme.colors.secondary};
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
  background: linear-gradient(135deg, #0984e3 0%, #6c5ce7 100%);
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
  border-radius: 50px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  margin: ${(props) => props.theme.spacing.sm};
  transition: all ${(props) => props.theme.animations.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(9, 132, 227, 0.3);
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
      content: "⚡";
      font-size: ${(props) => props.theme.typography.fontSizes.md};
      margin-top: 2px;
    }
  }
`;

const NASARockSat2025 = () => {
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
    "PCB Design", "KiCad", "Analog Circuits",
    "Digital Signal Processing", "Power Systems", "EMI/EMC",
    "Microcontrollers", "Sensor Interfaces", "Flight Avionics", "Testing & Validation"
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
              NASA RockSat-X 2025
            </ProjectTitle>

            <ProjectSubtitle variants={itemVariants}>
              Electrical Lead | Next-Generation Payload Systems
            </ProjectSubtitle>

            <ProjectYear variants={itemVariants}>
              <FiCalendar />
              2025 Mission
            </ProjectYear>
          </Header>

          <ContentGrid>
            <ContentCard variants={itemVariants}>
              <CardIcon>
                <FiZap />
              </CardIcon>
              <CardTitle>Mission Overview</CardTitle>
              <CardContent>
                <p>
                  Serving as Electrical Lead for NASA's RockSat-X 2025 mission, building upon
                  the 2024 flight with enhanced payload capabilities, improved
                  electrical systems. This mission features advanced sensing capabilities and
                  more sophisticated data acquisition systems.
                </p>
                <p>
                  As Electrical Lead, I'm responsible for all electrical subsystems, power
                  distribution, signal conditioning, and ensuring electromagnetic compatibility
                  for the harsh space environment.
                </p>
              </CardContent>
            </ContentCard>

            <ContentCard variants={itemVariants}>
              <CardIcon>
                <FiUsers />
              </CardIcon>
              <CardTitle>Leadership & Team</CardTitle>
              <CardContent>
                <p>
                  <strong>Electrical Team Lead</strong> - Leading a multidisciplinary team of
                  electrical engineers, managing PCB design, system integration, and testing
                  protocols for space-qualified hardware.
                </p>
                <AchievementsList>
                  <li>Coordinating electrical design with mechanical and software teams</li>
                  <li>Implementing rigorous testing and qualification procedures</li>
                  <li>Managing component selection for space environment reliability</li>
                  <li>Establishing design standards and review processes</li>
                </AchievementsList>
              </CardContent>
            </ContentCard>

            <ContentCard variants={itemVariants}>
              <CardIcon>
                <FiCpu />
              </CardIcon>
              <CardTitle>Technical Systems</CardTitle>
              <CardContent>
                <p>
                  Designing and implementing next-generation electrical systems for enhanced
                  scientific capabilities, including:
                </p>
                <AchievementsList>
                  <li>Multi-layer PCB design for high-speed digital systems</li>
                  <li>Low-noise analog front-end for sensitive measurements</li>
                  <li>Redundant power distribution and protection systems</li>
                  <li>High-reliability connectors and cable assemblies</li>
                  <li>EMI shielding and grounding for space environment</li>
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
                <FiSettings />
              </CardIcon>
              <CardTitle>Innovation & Improvements</CardTitle>
              <CardContent>
                <p>
                  Building on lessons learned from 2024, implementing significant improvements
                  and new technologies for enhanced mission capabilities:
                </p>
                <AchievementsList>
                  <li>Advanced power management with smart switching systems</li>
                  <li>Improved signal conditioning for higher accuracy measurements</li>
                  <li>Enhanced fault detection and autonomous recovery systems</li>
                  <li>Modular design for rapid integration and testing</li>
                  <li>Next-generation data acquisition with higher sampling rates</li>
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
                href="https://github.com/nasa-rocksat-2025"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub />
                View Schematics & Design
              </LinkButton>
              <LinkButton
                href="https://nasa.gov/rocksat-x"
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

export default NASARockSat2025;

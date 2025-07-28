import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiCode, FiDatabase, FiGlobe, FiTool, FiZap} from "react-icons/fi";

/**
 * About page component showcasing skills, experience, and background
 * Features: animated sections, skill categories, statistics, responsive layout
 */

const AboutContainer = styled.main`
  padding-top: 120px;
  padding-bottom: ${(props) => props.theme.spacing.xxl};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.lg};
`;

const Section = styled(motion.section)`
  margin-bottom: ${(props) => props.theme.spacing.xxl};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${(props) => props.theme.typography.fontSizes.hero};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.typography.fontSizes.xxl};
  }
`;

const Intro = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.xxl};
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xxl};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.xl};
  }
`;

const IntroText = styled.div`
  p {
    font-size: ${(props) => props.theme.typography.fontSizes.lg};
    margin-bottom: ${(props) => props.theme.spacing.md};
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${(props) => props.theme.spacing.lg};
`;

const Stat = styled(motion.div)`
  text-align: center;
  padding: ${(props) => props.theme.spacing.lg};
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const StatNumber = styled.div`
  font-size: ${(props) => props.theme.typography.fontSizes.hero};
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.accent};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  margin-top: ${(props) => props.theme.spacing.xl};
`;

const SkillCategory = styled(motion.div)`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  padding: ${(props) => props.theme.spacing.xl};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.colors.border};
  transition: all ${(props) => props.theme.animations.normal};

  &:hover {
    border-color: ${(props) => props.theme.colors.accent};
    transform: translateY(-4px);
  }
`;

const SkillIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${(props) => props.theme.colors.accentLight};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.accent};
  font-size: ${(props) => props.theme.typography.fontSizes.xl};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const SkillTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.xs};
`;

const SkillTag = styled.span`
  background: ${(props) => props.theme.colors.backgroundTertiary};
  color: ${(props) => props.theme.colors.textSecondary};
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: 20px;
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const Timeline = styled.div`
  position: relative;
  margin-top: ${(props) => props.theme.spacing.xl};

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${(props) => props.theme.colors.border};
    transform: translateX(-50%);

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.lg};
  align-items: center;

  &:nth-child(even) {
    .timeline-content {
      order: -1;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    margin-left: 40px;

    &:nth-child(even) {
      .timeline-content {
        order: 0;
      }
    }
  }
`;

const TimelineContent = styled.div`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  padding: ${(props) => props.theme.spacing.lg};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  position: relative;
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 16px;
  height: 16px;
  background: ${(props) => props.theme.colors.accent};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid ${(props) => props.theme.colors.background};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    left: -28px;
  }
`;

const TimelineDate = styled.div`
  color: ${(props) => props.theme.colors.accent};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const TimelineTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const TimelineSubtitle = styled.div`
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const About = () => {
  const skillCategories = [
    {
      icon: FiCode,
      title: "Frontend Development",
      skills: ["JavaFX", "Avalonia UI", "PyQt", "Tkinter"]
    },
    {
      icon: FiDatabase,
      title: "Backend Development",
      skills: ["Java", "Python", "C#", "C++", "C", ".NET 8.0", "REST APIs"]
    },
    {
      icon: FiTool,
      title: "Tools & Technologies",
      skills: ["Linux", "Git", "Bash", "Docker", "VS Code", "Figma"]
    },
    {
      icon: FiZap,
      title: "PCB & IOT Technologies",
      skills: ["KiCad", "PCB Development", "PCB Assembly", "ESP32", "Arduino", "PlatformIO" ,"Fusion 360", "Autodesk Inventor", "3D Printing"]
    }
  ];

  const experience = [
    {
      date: "2024 - Present",
      title: "Software Engineer",
      company: "Acqubit; 3D-SensIR",
      description: "Lead development on IOT devices, applications development, data visualizations, "+
        "and data processing. Collaborated with engineering and manufacturing teams."
    },
    {
      date: "2023 - 2024",
      title: "Software Engineer, Intern",
      company: "Acqubit; 3D-SensIR",
      description: "Built and maintained multiple client projects using JavaFX, .NET 9, and Python."
    },
    {
      date: "2022 - 2023",
      title: "Software Engineer, Intern",
      company: "SMEC",
      description: "Developed Arduino-based software and hardware, handled 3D printing, and worked on CNC machine retrofitting."
    }
  ];

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

  return (
    <AboutContainer>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <SectionTitle variants={itemVariants}>About Me</SectionTitle>

          <Intro variants={itemVariants}>
            <IntroText>
              <p>
                  I'm a full-stack software engineer specializing in IoT, data processing,
                  visualization, and robotics integration. With over two years of experience,
                  I leverage Python, Java, C#, JavaFX, and .NET 8.0 to create efficient,
                  scalable solutions involving high-performance computing, real-time IoT networks,
                  and automated assembly processes.
              </p>
              <p>
                Beyond software, I have hands-on experience with PCB development using KiCad and
                CAD modeling. My passion lies in building clean, maintainable code and robust hardware solutions,
                consistently driven by innovation and creating impactful technology.
              </p>
            </IntroText>

            <Stats>
              <Stat variants={itemVariants}>
                <StatNumber>10+</StatNumber>
                <StatLabel>Projects Completed</StatLabel>
              </Stat>
              <Stat variants={itemVariants}>
                <StatNumber>2+</StatNumber>
                <StatLabel>Years Experience</StatLabel>
              </Stat>
            </Stats>
          </Intro>

          <Section>
            <SectionTitle variants={itemVariants}>Skills & Technologies</SectionTitle>
            <SkillsGrid>
              {skillCategories.map((category, index) => (
                <SkillCategory
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <SkillIcon>
                    <category.icon />
                  </SkillIcon>
                  <SkillTitle>{category.title}</SkillTitle>
                  <SkillList>
                    {category.skills.map((skill, skillIndex) => (
                      <SkillTag key={skillIndex}>{skill}</SkillTag>
                    ))}
                  </SkillList>
                </SkillCategory>
              ))}
            </SkillsGrid>
          </Section>

          <Section>
            <SectionTitle variants={itemVariants}>Experience</SectionTitle>
            <Timeline>
              {experience.map((item, index) => (
                <TimelineItem key={index} variants={itemVariants}>
                  <TimelineDot />
                  <TimelineContent className="timeline-content">
                    <TimelineDate>{item.date}</TimelineDate>
                    <TimelineTitle>{item.title}</TimelineTitle>
                    <TimelineSubtitle>{item.company}</TimelineSubtitle>
                    <p>{item.description}</p>
                  </TimelineContent>
                  <div /> {/* Empty div for grid layout */}
                </TimelineItem>
              ))}
            </Timeline>
          </Section>
        </motion.div>
      </Container>
    </AboutContainer>
  );
};

export default About;

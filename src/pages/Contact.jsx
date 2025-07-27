import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiSend } from "react-icons/fi";
import emailjs from '@emailjs/browser';

const ContactContainer = styled.main`
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.xxl};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.xl};
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xl};
`;

const InfoCard = styled(motion.div)`
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

const InfoIcon = styled.div`
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

const InfoTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const InfoText = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.lg};
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  background: ${(props) => props.theme.colors.backgroundTertiary};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.typography.fontSizes.lg};
  transition: all ${(props) => props.theme.animations.normal};

  &:hover {
    background: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.text};
    transform: translateY(-2px);
  }
`;

const ContactForm = styled(motion.form)`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  padding: ${(props) => props.theme.spacing.xl};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const FormTitle = styled.h2`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  font-size: ${(props) => props.theme.typography.fontSizes.xxl};
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.xs};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.backgroundTertiary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.md};
  transition: all ${(props) => props.theme.animations.normal};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.accentLight};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textMuted};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.backgroundTertiary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.md};
  font-family: ${(props) => props.theme.typography.fontFamily};
  resize: vertical;
  min-height: 120px;
  transition: all ${(props) => props.theme.animations.normal};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.accentLight};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textMuted};
  }
`;

const SubmitButton = styled(motion.button)`
  background: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
  border: none;
  border-radius: 50px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  font-size: ${(props) => props.theme.typography.fontSizes.md};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  cursor: pointer;
  transition: all ${(props) => props.theme.animations.normal};

  &:hover {
    background: ${(props) => props.theme.colors.accentHover};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: ${(props) => props.theme.colors.success};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: 8px;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  text-align: center;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const ErrorMessage = styled(motion.div)`
  background: ${(props) => props.theme.colors.danger};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: 8px;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  text-align: center;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      // Use environment variables for EmailJS credentials
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Aram Aprahamian',
          reply_to: formData.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setShowSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email send error:', error);
      setShowError(true);
      setErrorMessage(`Failed to send message. Please try again or contact me directly at ${import.meta.env.VITE_CONTACT_EMAIL || 'aram@apra.dev'}`);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: "Email",
      text: "aram@apra.dev"
    },
    {
      icon: FiPhone,
      title: "Phone",
      text: "+1 (661) 877-3347"
    },
    {
      icon: FiMapPin,
      title: "Location",
      text: "Santa Cruz, CA"
    }
  ];

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/aram-ap", label: "GitHub" },
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/aram-aprahamian", label: "LinkedIn" },
    // { icon: FiTwitter, href: "https://twitter.com/your-profile", label: "Twitter" },
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
    <ContactContainer>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Header>
            <Title variants={itemVariants}>Get In Touch</Title>
            <Subtitle variants={itemVariants}>
              Let's discuss your project ideas and bring them to life together.
              I'd love to hear from you!
            </Subtitle>
          </Header>

          <ContactContent>
            <ContactInfo variants={itemVariants}>
              {contactInfo.map((info, index) => (
                <InfoCard
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <InfoIcon>
                    <info.icon />
                  </InfoIcon>
                  <InfoTitle>{info.title}</InfoTitle>
                  <InfoText>{info.text}</InfoText>
                </InfoCard>
              ))}

              <InfoCard variants={itemVariants} whileHover={{ y: -4 }}>
                <InfoTitle>Follow Me</InfoTitle>
                <InfoText>Connect with me on social media</InfoText>
                <SocialLinks>
                  {socialLinks.map((social, index) => (
                    <SocialLink
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon />
                    </SocialLink>
                  ))}
                </SocialLinks>
              </InfoCard>
            </ContactInfo>

            <ContactForm
              variants={itemVariants}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <FormTitle>Send me a message</FormTitle>

              {showSuccess && (
                <SuccessMessage
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  Thank you! Your message has been sent successfully.
                </SuccessMessage>
              )}

              {showError && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {errorMessage}
                </ErrorMessage>
              )}

              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or just say hello!"
                  required
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiSend />
                {isSubmitting ? "Sending..." : "Send Message"}
              </SubmitButton>
            </ContactForm>
          </ContactContent>
        </motion.div>
      </Container>
    </ContactContainer>
  );
};

export default Contact;

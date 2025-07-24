import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${(props) => 
    props.scrolled 
      ? `${props.theme.colors.backgroundSecondary}dd` 
      : 'transparent'
  };
  backdrop-filter: ${(props) => props.scrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${(props) => 
    props.scrolled 
      ? `1px solid ${props.theme.colors.border}` 
      : 'none'
  };
  transition: all ${(props) => props.theme.animations.normal};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: ${(props) => props.theme.typography.fontSizes.xl};
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
  
  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.lg};
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  color: ${(props) => props.active ? props.theme.colors.accent : props.theme.colors.textSecondary};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  padding: ${(props) => props.theme.spacing.xs} 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${(props) => props.active ? '100%' : '0%'};
    height: 2px;
    background: ${(props) => props.theme.colors.accent};
    transition: width ${(props) => props.theme.animations.normal};
  }
  
  &:hover {
    color: ${(props) => props.theme.colors.accent};
    
    &::after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.xl};
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xl};
  z-index: 2000; /* Above the nav (1000) */
  height: 100dvh; /* Full dynamic viewport height on mobile */
  padding-top: env(safe-area-inset-top, 2rem);
`;

const MobileNavLink = styled(Link)`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.xl};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  
  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <Nav
        scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <NavContainer>
          <Logo to="/">Aram</Logo>
          
          <NavLinks>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                active={location.pathname === item.path}
              >
                {item.label}
              </NavLink>
            ))}
          </NavLinks>
          
          <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
            <FiMenu />
          </MobileMenuButton>
        </NavContainer>
      </Nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MobileMenuButton 
              onClick={() => setMobileMenuOpen(false)}
              style={{ position: 'absolute', top: '2rem', right: '2rem' }}
            >
              <FiX />
            </MobileMenuButton>
            
            {navItems.map((item) => (
              <MobileNavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </MobileNavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 
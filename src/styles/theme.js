export const theme = {
  colors: {
    backgroundSecondary: "#1a1a2e", // Dark space blue
    backgroundTertiary: "#16213e", // Deep navy
    accent: "#6c5ce7", // Cosmic purple
    accentHover: "#a29bfe", // Lighter cosmic purple
    accentLight: "rgba(108, 92, 231, 0.2)",
    secondary: "#0984e3", // Space blue
    secondaryLight: "rgba(9, 132, 227, 0.2)",
    text: "#ffffff", // Starlight white
    textSecondary: "#b2bec3", // Light gray
    textMuted: "#636e72", // Muted gray
    border: "#2d3436", // Dark border
    success: "#00cec9", // Cyan
    warning: "#fdcb6e", // Warm orange
    danger: "#e17055", // Mars red
    // Space-themed gradients
    spaceGradient: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)",
    cosmicGradient: "linear-gradient(135deg, #6c5ce7 0%, #0984e3 100%)",
    starField: "radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px)",
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    xxl: "4rem",
  },
  typography: {
    fontFamily: "'Inter', 'Orbitron', 'Roboto', Arial, sans-serif",
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      xxl: "1.5rem",
      hero: "3rem",
      display: "4rem",
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  breakpoints: {
    mobile: "768px",
    tablet: "1024px",
    desktop: "1280px",
  },
  animations: {
    fast: "0.2s ease",
    normal: "0.3s ease",
    slow: "0.5s ease",
    float: "3s ease-in-out infinite",
    pulse: "2s ease-in-out infinite",
  },
}; 
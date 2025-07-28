/**
 * Gradient utilities for blog post styling
 * Provides predefined gradient options and helper functions
 */

// Predefined gradient options for blog posts
export const gradients = [
  {
    id: "default",
    name: "Default Purple",
    value: "linear-gradient(135deg, #a259f7, #4ade80)",
    colors: ["#a259f7", "#4ade80"]
  },
  {
    id: "sunset",
    name: "Sunset",
    value: "linear-gradient(135deg, #ff6b6b, #feca57)",
    colors: ["#ff6b6b", "#feca57"]
  },
  {
    id: "ocean",
    name: "Ocean",
    value: "linear-gradient(135deg, #667eea, #764ba2)",
    colors: ["#667eea", "#764ba2"]
  },
  {
    id: "forest",
    name: "Forest",
    value: "linear-gradient(135deg, #11998e, #38ef7d)",
    colors: ["#11998e", "#38ef7d"]
  },
  {
    id: "fire",
    name: "Fire",
    value: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    colors: ["#ff416c", "#ff4b2b"]
  },
  {
    id: "space",
    name: "Space",
    value: "linear-gradient(135deg, #0c0c0c, #3a3a3a)",
    colors: ["#0c0c0c", "#3a3a3a"]
  },
  {
    id: "tech",
    name: "Tech Blue",
    value: "linear-gradient(135deg, #667eea, #764ba2)",
    colors: ["#667eea", "#764ba2"]
  },
  {
    id: "warm",
    name: "Warm Orange",
    value: "linear-gradient(135deg, #ff9a9e, #fecfef)",
    colors: ["#ff9a9e", "#fecfef"]
  },
  {
    id: "cool",
    name: "Cool Blue",
    value: "linear-gradient(135deg, #a8edea, #fed6e3)",
    colors: ["#a8edea", "#fed6e3"]
  },
  {
    id: "minimal",
    name: "Minimal Gray",
    value: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    colors: ["#f5f7fa", "#c3cfe2"]
  }
];

export const getGradientById = (id) => {
  return gradients.find(gradient => gradient.id === id) || gradients[0];
};

export const getDefaultGradient = () => {
  return gradients[0]; // Default purple gradient
}; 
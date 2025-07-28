import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogEditor from "./components/BlogEditor";
import Contact from "./pages/Contact";
import NASARockSat2024 from "./pages/NASARockSat2024";
import NASARockSat2025 from "./pages/NASARockSat2025";

/**
 * Main App component that sets up routing and theme provider
 * Routes include: Home, About, Projects, Blog, Contact, and NASA project pages
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router basename={import.meta.env.BASE_URL}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog-editor" element={<BlogEditor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/nasa-rocksat-2024" element={<NASARockSat2024 />} />
          <Route path="/nasa-rocksat-2025" element={<NASARockSat2025 />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

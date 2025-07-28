import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import Navigation from "./components/Navigation";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load all page components
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Projects = React.lazy(() => import("./pages/Projects"));
const ProjectPost = React.lazy(() => import("./pages/ProjectPost"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));
const BlogEditor = React.lazy(() => import("./components/BlogEditor"));
const Contact = React.lazy(() => import("./pages/Contact"));
const NASARockSat2024 = React.lazy(() => import("./pages/NASARockSat2024"));
const NASARockSat2025 = React.lazy(() => import("./pages/NASARockSat2025"));



/**
 * Main App component that sets up routing and theme provider
 * Routes include: Home, About, Projects, Blog, Contact, and NASA project pages
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router basename={import.meta.env.BASE_URL}>
        <Navigation />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectPost />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/blog-editor" element={<BlogEditor />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/nasa-rocksat-2024" element={<NASARockSat2024 />} />
            <Route path="/nasa-rocksat-2025" element={<NASARockSat2025 />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;

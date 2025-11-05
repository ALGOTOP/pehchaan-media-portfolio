// src/App.jsx
import React, { useEffect } from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingCTA from "@/components/FloatingCTA";
import CustomCursor from "@/components/CustomCursor";
import ParallaxBackground from "@/components/ParallaxBackground";
import MetaTags from "@/components/MetaTags";

// ─────────────────────────────────────────────
// SECTIONS (Home Page)
// ─────────────────────────────────────────────
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Services from "@/sections/Services";
import Work from "@/sections/Work";
import Studio from "@/sections/Studio";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";

// ─────────────────────────────────────────────
// PAGES (Case Studies)
// ─────────────────────────────────────────────
import CaseStudiesHub from "@/pages/case-studies/index.jsx";
import CaseStudyDetail from "@/pages/case-studies/CaseStudyDetail.jsx";

// ─────────────────────────────────────────────
// SCROLL + PAGE WRAPPER
// ─────────────────────────────────────────────
function ScrollWrapper({ children }) {
  const location = useLocation();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    try {
      const lenis = new Lenis({
        duration: 1.3,
        smoothWheel: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => lenis.destroy();
    } catch (err) {
      console.warn("⚠️ Lenis init failed:", err);
    }
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children;
}

// ─────────────────────────────────────────────
// MAIN APP COMPONENT
// ─────────────────────────────────────────────
export default function App() {
  return (
    <Router>
      <ScrollWrapper>
        <div className="relative bg-black text-white font-sans">
          <MetaTags />
          <Navbar />
          <ParallaxBackground />
          <ScrollProgress />
          <CustomCursor />

          <AnimatePresence mode="wait">
            <Routes>
              {/* Home Page */}
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <About />
                    <Services />
                    <Work />
                    <Studio />
                    <Testimonials />
                    <Contact />
                  </>
                }
              />

              {/* Case Studies */}
              <Route path="/case-studies" element={<CaseStudiesHub />} />
              <Route
                path="/case-studies/:slug"
                element={<CaseStudyDetail />}
              />
            </Routes>
          </AnimatePresence>

          <Footer />
          <ScrollToTop />
          <FloatingCTA />
        </div>
      </ScrollWrapper>
    </Router>
  );
}

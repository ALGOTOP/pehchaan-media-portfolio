import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";

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
// CASE STUDIES
// ─────────────────────────────────────────────
import CaseStudiesHub from "@/pages/case-studies";
import CaseStudyDetail from "@/pages/case-studies/CaseStudyDetail";

// ─────────────────────────────────────────────
// MAIN APP COMPONENT
// ─────────────────────────────────────────────
export default function App() {
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

  return (
    <div className="relative bg-black text-white font-sans">
      {/* ─── Global Components ─── */}
      <MetaTags />
      <Navbar />
      <ParallaxBackground />
      <ScrollProgress />
      <CustomCursor />

      {/* ─── Route System ─── */}
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
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col items-center justify-center text-center bg-black text-white px-4">
                <h1 className="text-5xl font-bold text-cyan-400 mb-3">
                  404
                </h1>
                <p className="text-gray-400 mb-4">
                  The page you’re looking for doesn’t exist.
                </p>
                <a
                  href="/"
                  className="text-cyan-400 hover:underline font-medium"
                >
                  ⟵ Go back home
                </a>
              </div>
            }
          />
        </Routes>
      </AnimatePresence>

      {/* ─── Footer & Utility UI ─── */}
      <Footer />
      <ScrollToTop />
      <FloatingCTA />
    </div>
  );
}

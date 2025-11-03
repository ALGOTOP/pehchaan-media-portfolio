import React, { useEffect } from "react";
import Lenis from "lenis";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
// CASE STUDY PAGES
// ─────────────────────────────────────────────
import CaseStudies from "@/pages/CaseStudies";
import Lumina from "@/pages/case-studies/Lumina";
import Aurix from "@/pages/case-studies/Aurix";
import NovaSkin from "@/pages/case-studies/NovaSkin";
import AerialX from "@/pages/case-studies/AerialX";
import BuildSmart from "@/pages/case-studies/BuildSmart";
import Velo from "@/pages/case-studies/Velo";
import EcoRise from "@/pages/case-studies/EcoRise";
import HelixHealth from "@/pages/case-studies/HelixHealth";
import Zenith from "@/pages/case-studies/Zenith";

// ─────────────────────────────────────────────
// MAIN APP COMPONENT
// ─────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    // ✅ Smooth scroll with Lenis
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
  }, []);

  return (
    <Router>
      <div className="relative bg-black text-white font-sans">
        {/* ─── Global Components ─── */}
        <MetaTags />
        <Navbar />
        <ParallaxBackground />
        <ScrollProgress />
        <CustomCursor />

        {/* ─── Page Routing ─── */}
        <AnimatePresence mode="wait">
          <Routes>
            {/* Home Page (One-Page Scroll Sections) */}
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

            {/* Case Studies Overview */}
            <Route path="/case-studies" element={<CaseStudies />} />

            {/* Individual Case Studies */}
            <Route path="/case-studies/Lumina" element={<Lumina />} />
            <Route path="/case-studies/Aurix" element={<Aurix />} />
            <Route path="/case-studies/NovaSkin" element={<NovaSkin />} />
            <Route path="/case-studies/AerialX" element={<AerialX />} />
            <Route path="/case-studies/BuildSmart" element={<BuildSmart />} />
            <Route path="/case-studies/Velo" element={<Velo />} />
            <Route path="/case-studies/EcoRise" element={<EcoRise />} />
            <Route path="/case-studies/HelixHealth" element={<HelixHealth />} />
            <Route path="/case-studies/Zenith" element={<Zenith />} />
          </Routes>
        </AnimatePresence>

        {/* ─── Footer & Utility UI ─── */}
        <Footer />
        <ScrollToTop />
        <FloatingCTA />
      </div>
    </Router>
  );
}

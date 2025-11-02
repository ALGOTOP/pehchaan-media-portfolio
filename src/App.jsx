// ────────────────────────────────────────────────────────────────
// App.jsx — Full Pehchaan Media App (Router + Lenis + SEO + Parallax)
// ────────────────────────────────────────────────────────────────

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { Helmet } from "react-helmet";

// ─── Components ───
import Navbar from "./components/Navbar";
import ParallaxBackground from "./components/ParallaxBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import CaseStudies from "./components/CaseStudies";
import Studio from "./components/Studio";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// ────────────────────────────────────────────────
// Smooth Scroll Setup (Lenis)
// ────────────────────────────────────────────────
const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.08,
      smoothWheel: true,
      smoothTouch: false,
      easing: (x) => 1 - Math.pow(1 - x, 2),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
};

// ────────────────────────────────────────────────
// Page Components
// ────────────────────────────────────────────────
const HomePage = () => (
  <>
    <Helmet>
      <title>Pehchaan Media | Crafting Digital Identity</title>
      <meta
        name="description"
        content="Pehchaan Media — a creative studio crafting bold, emotion-driven brand experiences through design, storytelling, and strategy."
      />
      <meta property="og:title" content="Pehchaan Media" />
      <meta
        property="og:description"
        content="Crafting Digital Identity through design, motion, and strategy."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://pehchaanmedia.com" />
    </Helmet>

    <ParallaxBackground />
    <Hero />
    <About />
    <Services />
    <Work />
    <CaseStudies />
    <Studio />
    <Testimonials />
    <Contact />
    <Footer />
  </>
);

const CaseStudiesPage = () => (
  <>
    <Helmet>
      <title>Case Studies | Pehchaan Media</title>
      <meta
        name="description"
        content="Explore our brand and digital transformation stories — where creativity meets measurable impact."
      />
    </Helmet>

    <Navbar />
    <CaseStudies standalone />
    <Footer />
  </>
);

const ContactPage = () => (
  <>
    <Helmet>
      <title>Contact Us | Pehchaan Media</title>
      <meta
        name="description"
        content="Let’s collaborate — reach out to Pehchaan Media for your next creative journey."
      />
    </Helmet>

    <Navbar />
    <Contact />
    <Footer />
  </>
);

// ────────────────────────────────────────────────
// Main App Component
// ────────────────────────────────────────────────
export default function PehchaanMediaApp() {
  useLenis();

  return (
    <Router>
      <AnimatePresence mode="wait">
        <div className="relative bg-black text-white overflow-hidden min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  );
}

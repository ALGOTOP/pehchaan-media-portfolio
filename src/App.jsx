import React, { useEffect } from "react";
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
// SECTIONS
// ─────────────────────────────────────────────
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Services from "@/sections/Services";
import Work from "@/sections/Work";
import Studio from "@/sections/Studio";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";

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
    <div className="relative bg-black text-white font-sans overflow-hidden">
      {/* ─── Meta & Global Components ─── */}
      <MetaTags />
      <Navbar />
      <ParallaxBackground />
      <ScrollProgress />
      <CustomCursor />

      {/* ─── Page Sections ─── */}
      <AnimatePresence mode="wait">
        <Hero />
        <About />
        <Services />
        <Work />
        <Studio />
        <Testimonials />
        <Contact />
      </AnimatePresence>

      {/* ─── Footer & Utility UI ─── */}
      <Footer />
      <ScrollToTop />
      <FloatingCTA />
    </div>
  );
}

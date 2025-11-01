// ────────────────────────────────────────────────
// App.jsx — Main Component for Pehchaan Media Portfolio
// Cinematic scroll reveals + Parallax depth synced with Lenis
// ────────────────────────────────────────────────

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Navbar from "./components/Navbar";
import ParallaxBackground from "./components/ParallaxBackground";

// ───────────────────────────────────────────────
// Section Wrapper — handles fade-in on scroll
// ───────────────────────────────────────────────
const Section = ({ id, children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 60, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      initial="hidden"
      animate={controls}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-white"
    >
      {children}
    </motion.section>
  );
};

// ───────────────────────────────────────────────
// Main App Component
// ───────────────────────────────────────────────
export default function App() {
  const parallaxRef = useRef(null);

  // Parallax tuning synced with scroll
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY * 0.3;
        parallaxRef.current.style.transform = `translateY(${scrollY}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <ParallaxBackground ref={parallaxRef} />
      <Navbar />

      {/* ─── HERO ─── */}
      <Section id="home">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Crafting Digital Identity.
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Pehchaan Media helps brands stand out with bold design,
            storytelling, and emotion-driven digital experiences.
          </p>
        </motion.div>
      </Section>

      {/* ─── ABOUT ─── */}
      <Section id="about">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-gray-400 max-w-2xl text-center">
          We’re a multidisciplinary creative studio specializing in brand
          strategy, motion design, and interactive storytelling.
        </p>
      </Section>

      {/* ─── SERVICES ─── */}
      <Section id="services">
        <h2 className="text-4xl font-bold mb-4">Our Services</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300 max-w-5xl">
          {["Branding", "Web Design", "Motion Graphics"].map((s) => (
            <motion.li
              key={s}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-lg"
            >
              <h3 className="text-2xl font-semibold mb-2 text-cyan-400">{s}</h3>
              <p className="text-gray-400">
                We combine strategy and aesthetics to deliver measurable impact.
              </p>
            </motion.li>
          ))}
        </ul>
      </Section>

      {/* ─── CONTACT ─── */}
      <Section id="contact">
        <motion.div whileHover={{ scale: 1.05 }} className="text-center">
          <h2 className="text-4xl font-bold mb-4">Let’s Work Together</h2>
          <a
            href="mailto:hello@pehchaanmedia.com"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-md hover:shadow-cyan-400/30 transition"
          >
            Get in Touch
          </a>
        </motion.div>
      </Section>
    </div>
  );
}

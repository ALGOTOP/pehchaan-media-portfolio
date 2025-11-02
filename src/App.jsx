// ────────────────────────────────────────────────
// App.jsx — Pehchaan Media Portfolio (Stable Version)
// Clean + Responsive + Scroll-Ready
// ────────────────────────────────────────────────

import React from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="relative bg-gradient-to-b from-[#040714] to-[#001233] text-white min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ─── HERO ─── */}
      <section
        id="home"
        className="flex flex-col items-center justify-center min-h-screen text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent"
        >
          We make brands<br />unforgettable.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="text-gray-300 text-lg md:text-xl mt-6 max-w-2xl"
        >
          Pehchaan Media is a full-service creative agency crafting stories
          that connect, inspire, and move audiences. From design to film to
          strategy — we create experiences that define identities.
        </motion.p>

        <motion.a
          href="#work"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="mt-10 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-black font-semibold hover:opacity-90 transition"
        >
          <span>▶</span> View Our Work
        </motion.a>
      </section>

      {/* ─── OTHER SECTIONS PLACEHOLDER ─── */}
      <section id="about" className="min-h-screen flex items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-4">About</h2>
      </section>

      <section id="services" className="min-h-screen flex items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-4">Services</h2>
      </section>

      <section id="work" className="min-h-screen flex items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-4">Work</h2>
      </section>

      <section id="case-studies" className="min-h-screen flex items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-4">Case Studies</h2>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-4">Contact</h2>
      </section>
    </div>
  );
}

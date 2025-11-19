// src/components/work/WorkHeroNew.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  heroContainer,
  heroTitleParent,
  heroTitleChild,
  heroSubtitle,
  heroGlowOrbs,
  heroTrails,
} from "@/utils/workAnimations";

export default function WorkHeroNew() {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden bg-[#050505] flex items-center justify-center">
      {/* ===== BACKGROUND LAYERS (PARALLAX / GRAIN / GRADIENTS) ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-20 mix-blend-soft-light bg-[url('/textures/noise.png')] bg-cover" />

        {/* Radial Core Highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]" />

        {/* Horizontal Flow Gradient */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),transparent,rgba(255,255,255,0.05))]"
          animate={{ x: ["-20%", "20%", "-20%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Color Wash Layers */}
        <motion.div
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
          style={{ background: "radial-gradient(circle, #ff3e8f, transparent)" }}
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20"
          style={{ background: "radial-gradient(circle, #4ed2ff, transparent)" }}
          animate={{ x: [0, -20, 30, 0], y: [0, 20, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Soft Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black via-black/40 to-transparent" />

      </div>

      {/* ===== FLOATING ORBS (AWWARDS-STYLE) ===== */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          variants={heroGlowOrbs}
          initial="initial"
          animate="animate"
          custom={i}
          className="absolute w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"
        />
      ))}

      {/* ===== TRAIL PARTICLES ===== */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`trail-${i}`}
          variants={heroTrails}
          initial="initial"
          animate="animate"
          custom={i}
          className="absolute w-[2px] h-[70px] bg-gradient-to-b from-white/10 to-transparent blur-sm opacity-40"
        />
      ))}

      {/* ===== FOREGROUND TEXT ===== */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-[900px] mx-auto"
        variants={heroContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          variants={heroTitleParent}
          className="text-6xl md:text-8xl font-semibold leading-none tracking-tight text-white mb-8 drop-shadow-[0_4px_20px_rgb(255_255_255_/_15%)]"
        >
          {["Extended", "Work", "Collection"].map((word, i) => (
            <motion.span
              key={word}
              variants={heroTitleChild}
              className="inline-block mx-2"
              custom={i}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={heroSubtitle}
          className="text-lg md:text-2xl text-gray-300 max-w-[600px] mx-auto leading-relaxed"
        >
          A curated visual journey across categories — reimagined with cinematic
          depth, refined details, and award-winning motion language.
        </motion.p>
      </motion.div>
    </section>
  );
}

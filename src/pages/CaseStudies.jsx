// ─────────────────────────────────────────────
// CaseStudiesHub.jsx — Central Case Studies Page
// Matching Pehchaan Media’s visual language
// ─────────────────────────────────────────────
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import ScrollToTop from "@/components/ScrollToTop";

// Case Study Cards (You can add more later)
const CASE_STUDIES = [
  {
    name: "Lumina",
    tagline: "Skincare Reimagined — Minimalism Meets Emotion",
    route: "/case-studies/lumina",
  },
  {
    name: "Aurix",
    tagline: "Luxury Jewelry Identity in Motion",
    route: "/case-studies/aurix",
  },
  {
    name: "NovaSkin",
    tagline: "A Futuristic Skincare Brand Experience",
    route: "/case-studies/novaskin",
  },
  {
    name: "AerialX",
    tagline: "Drone Cinematics Powered by Design Precision",
    route: "/case-studies/aerialx",
  },
  {
    name: "BuildSmart",
    tagline: "Construction SaaS Rebranding and Interface Design",
    route: "/case-studies/buildsmart",
  },
  {
    name: "Velo",
    tagline: "Sport Tech Aesthetics Refined Through Motion",
    route: "/case-studies/velo",
  },
  {
    name: "EcoRise",
    tagline: "Sustainability Meets Digital Performance",
    route: "/case-studies/ecorise",
  },
  {
    name: "HelixHealth",
    tagline: "Healthcare UX Centered Around Human Trust",
    route: "/case-studies/helixhealth",
  },
  {
    name: "Zenith",
    tagline: "High-Altitude Branding for Global Aspirations",
    route: "/case-studies/zenith",
  },
];

export default function CaseStudiesHub() {
  return (
    <div className="relative bg-black text-white font-sans overflow-hidden">
      <Navbar />
      <ParallaxBackground />
      <ScrollToTop />

      {/* ───────────────────────────────
          Hero Section
      ─────────────────────────────── */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 relative">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Case Studies
        </motion.h1>
        <motion.p
          className="text-gray-400 text-lg md:text-xl mt-6 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Explore our portfolio of digital stories — where branding, motion, and
          technology merge to create measurable impact.
        </motion.p>
      </section>

      {/* ───────────────────────────────
          Case Study Grid
      ─────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {CASE_STUDIES.map((study, index) => (
          <motion.div
            key={study.name}
            className="group relative bg-gradient-to-b from-zinc-900/80 to-zinc-800/60 border border-white/10 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,255,0.15)]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <Link to={study.route}>
              <motion.h2
                className="text-3xl font-bold text-cyan-400 group-hover:scale-105 transition-transform duration-300"
              >
                {study.name}
              </motion.h2>
              <p className="text-gray-400 mt-3">{study.tagline}</p>

              <motion.div
                className="mt-8 inline-flex items-center text-sm text-cyan-400 group-hover:translate-x-2 transition-transform duration-300"
              >
                View Case Study →
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* ───────────────────────────────
          Outro / CTA
      ─────────────────────────────── */}
      <motion.section
        className="text-center py-24 px-6 border-t border-white/10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Have a vision worth building?
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Let’s collaborate to craft your next brand story or digital experience.
        </p>
        <a
          href="/#contact"
          className="px-8 py-3 bg-cyan-500 text-black font-semibold rounded-full hover:bg-cyan-400 transition-all"
        >
          Start a Project
        </a>
      </motion.section>

      <Footer />
    </div>
  );
}

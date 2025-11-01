// ─────────────────────────────────────────────
// CaseStudies.jsx — refined + SEO integrated
// ─────────────────────────────────────────────
import React from "react";
import { motion } from "framer-motion";
import SEOManager from "../utils/SEOManager";
import ParallaxBackground from "../components/ParallaxBackground";

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      title: "Digital Rebrand for TechNova",
      subtitle: "Modern identity for a future-focused startup.",
      image:
        "https://images.unsplash.com/photo-1581092795360-56d09b231bde?auto=format&fit=crop&w=1200&q=80",
      description:
        "We transformed TechNova's presence into a bold digital identity, blending futuristic gradients, interactive motion, and meaningful UX.",
    },
    {
      id: 2,
      title: "E-commerce Evolution for UrbanWear",
      subtitle: "Turning browsing into immersive storytelling.",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      description:
        "UrbanWear’s site became a narrative experience — built with motion-first design, performance optimization, and luxury visual rhythm.",
    },
    {
      id: 3,
      title: "Campaign Activation — SoundScape",
      subtitle: "A digital audio revolution powered by design.",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
      description:
        "Our campaign for SoundScape combined sonic branding, kinetic typography, and motion-crafted storytelling across digital platforms.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <SEOManager
        title="Case Studies — Pehchaan Media"
        description="Explore the stories behind Pehchaan Media’s most impactful projects, where creativity meets performance."
      />

      <ParallaxBackground />

      {/* ─── Hero Section ─── */}
      <section className="relative z-10 py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
        >
          Case Studies
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 max-w-2xl mx-auto text-gray-400"
        >
          A curated collection of our most transformative collaborations — where
          brands evolve through creativity and experience.
        </motion.p>
      </section>

      {/* ─── Case Studies Grid ─── */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-12 pb-28">
        {caseStudies.map((cs, index) => (
          <motion.div
            key={cs.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: index * 0.15,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-cyan-400/10 transition-all duration-500"
          >
            <div className="overflow-hidden">
              <img
                src={cs.image}
                alt={cs.title}
                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white">
                {cs.title}
              </h3>
              <p className="text-cyan-400 mt-1 text-sm">{cs.subtitle}</p>
              <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                {cs.description}
              </p>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
}

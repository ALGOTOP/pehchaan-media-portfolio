import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

// ───────────────────────────────
// Animation Variants
// ───────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Lumina() {
  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans overflow-hidden">
      {/* ─── Hero Section ─── */}
      <section className="relative w-full py-32 flex flex-col items-center text-center overflow-hidden">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
        >
          Lumina
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={1}
          viewport={{ once: true }}
          className="text-lg text-gray-400 mt-4 max-w-2xl"
        >
          Reinventing how light defines luxury — a complete digital and brand transformation.
        </motion.p>

        <motion.img
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={2}
          viewport={{ once: true }}
          src="https://images.unsplash.com/photo-1585218354497-1c72b1f36c1c?auto=format&fit=crop&w=1200&q=80"
          alt="Lumina Project Mockup"
          className="mt-12 rounded-2xl shadow-2xl border border-white/10 max-w-5xl w-full"
        />
      </section>

      {/* ─── Project Overview ─── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-24 border-t border-white/10"
      >
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">Project Overview</h2>
        <p className="text-gray-400 leading-relaxed mb-8">
          Lumina approached Pehchaan Media with a mission to redefine their digital identity. Despite being a
          leader in innovative lighting solutions, their brand presence lacked the sophistication of their
          products. We crafted a sleek, high-end experience that captures the interplay between light, emotion,
          and luxury — designed to inspire at every scroll.
        </p>

        <img
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
          alt="Brand concept visual"
          className="rounded-xl shadow-lg border border-white/10 w-full mb-10"
        />

        <p className="text-gray-400 leading-relaxed">
          The project involved a complete overhaul of Lumina’s online identity, transforming a static brochure
          site into a dynamic storytelling experience that celebrates artistry and innovation.
        </p>
      </motion.section>

      {/* ─── Pain Points ─── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-24 border-t border-white/10"
      >
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">Pain Points</h2>
        <ul className="list-disc pl-5 space-y-3 text-gray-400">
          <li>Outdated visuals failing to convey the luxury essence of the brand.</li>
          <li>Unoptimized mobile experience with clunky navigation.</li>
          <li>Lack of cohesive storytelling and visual identity across channels.</li>
          <li>No clear value proposition or emotional engagement with users.</li>
        </ul>

        <motion.img
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={1}
          viewport={{ once: true }}
          src="https://i.ibb.co/RkCd8Gcq/Chat-GPT-Image-Nov-7-2025-09-12-02-AM.png"
          alt="Pain point visualization"
          className="rounded-xl shadow-lg border border-white/10 mt-12 w-full"
        />
      </motion.section>

      {/* ─── Process & Strategy ─── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-24 border-t border-white/10"
      >
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">Our Process</h2>
        <div className="grid md:grid-cols-3 gap-10 text-gray-400">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">01 — Discovery</h3>
            <p>We immersed ourselves in Lumina’s philosophy — understanding light as emotion and form.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">02 — Design</h3>
            <p>Developed a modular design system based on fluid grids, subtle gradients, and cinematic light play.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">03 — Execution</h3>
            <p>Engineered a fast, responsive site with Framer Motion transitions and optimized imagery.</p>
          </div>
        </div>

        <motion.img
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={2}
          viewport={{ once: true }}
          src="https://images.unsplash.com/photo-1616628182501-5d3ad9b93056?auto=format&fit=crop&w=1200&q=80"
          alt="Process showcase"
          className="rounded-xl shadow-lg border border-white/10 mt-14 w-full"
        />
      </motion.section>

      {/* ─── Services Provided ─── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-24 border-t border-white/10"
      >
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">Services Provided</h2>
        <div className="grid md:grid-cols-2 gap-10 text-gray-400">
          <ul className="space-y-3">
            <li>✔️ Brand Identity & Positioning</li>
            <li>✔️ UX/UI Design & Development</li>
            <li>✔️ Storytelling & Content Strategy</li>
          </ul>
          <ul className="space-y-3">
            <li>✔️ SEO & Performance Optimization</li>
            <li>✔️ Social Campaign Art Direction</li>
            <li>✔️ Photography Curation</li>
          </ul>
        </div>
      </motion.section>

      {/* ─── Results ─── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-24 border-t border-white/10"
      >
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">Results & Impact</h2>
        <div className="grid md:grid-cols-2 gap-8 text-gray-400">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Engagement</h3>
            <p>2.4× increase in on-site time, 60% faster load speeds, and 45% higher conversions.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Brand Influence</h3>
            <p>Positioned Lumina as an aspirational benchmark for luxury lighting globally.</p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=1200&q=80"
          alt="Results visuals"
          className="rounded-xl shadow-lg border border-white/10 mt-12 w-full"
        />
      </motion.section>

      {/* ─── Testimonial ─── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 py-24 border-t border-white/10 text-center"
      >
        <Sparkles className="mx-auto text-cyan-400 mb-4" size={36} />
        <blockquote className="italic text-gray-300 text-lg leading-relaxed">
          “Pehchaan Media completely redefined our online image. Their design and storytelling made Lumina feel
          alive — like light in motion.”
        </blockquote>
        <p className="mt-4 text-cyan-400 font-semibold">— Ayesha Malik, Creative Director at Lumina</p>
      </motion.section>

      {/* ─── CTA / Back ─── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-20 border-t border-white/10 text-center"
      >
        <motion.a
          href="/case-studies"
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:underline"
        >
          <span>← Back to Case Studies</span>
          <ArrowRight size={18} />
        </motion.a>
      </motion.section>
    </div>
  );
}

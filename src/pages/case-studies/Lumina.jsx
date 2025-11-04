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
      <section className="relative w-full py-28 flex flex-col items-center text-center overflow-hidden">
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
          src="https://via.placeholder.com/1000x550/0a0a0a/ffffff?text=Lumina+Mockup"
          alt="Lumina Project Mockup"
          className="mt-10 rounded-2xl shadow-2xl border border-white/10"
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
        <p className="text-gray-400 leading-relaxed">
          Lumina approached Pehchaan Media with a mission to redefine their digital identity.
          Despite being a leader in innovative lighting solutions, their brand presence was dull
          and outdated. We crafted a high-end digital experience that truly illuminates their
          excellence — both literally and figuratively.
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
          <li>Outdated brand visuals and inconsistent color usage.</li>
          <li>Poor online engagement due to slow, unoptimized website.</li>
          <li>Lack of clear storytelling and emotional connection with users.</li>
          <li>Underutilized digital marketing strategy.</li>
        </ul>
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
            <li>✔️ Brand Identity Design</li>
            <li>✔️ Website Redesign & Development</li>
            <li>✔️ UX/UI Strategy</li>
          </ul>
          <ul className="space-y-3">
            <li>✔️ Content Direction</li>
            <li>✔️ Social Media Art Direction</li>
            <li>✔️ SEO Optimization</li>
          </ul>
        </div>
      </motion.section>

      {/* ─── Results & Impact ─── */}
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
            <h3 className="text-xl font-semibold text-white mb-3">Performance</h3>
            <p>
              2.4× increase in website engagement, 60% faster load times, and a
              significant uplift in lead conversions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Brand Perception</h3>
            <p>
              Lumina’s new design language became a benchmark in the luxury lighting space,
              positioning them as a visionary leader.
            </p>
          </div>
        </div>
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
          “Pehchaan Media completely redefined our online image. Their team understood
          our brand at its core and transformed it into something timeless.”
        </blockquote>
        <p className="mt-4 text-cyan-400 font-semibold">
          — Ayesha Malik, Creative Director at Lumina
        </p>
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

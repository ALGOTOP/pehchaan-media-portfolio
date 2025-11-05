import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import { Play, ChevronDown } from "lucide-react";

export default function Hero() {
  // ─────────────────────────────────────────────
  // Smooth parallax background movement
  // ─────────────────────────────────────────────
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#0a0f1f] via-[#0a0a0a] to-[#050505]"
    >
      {/* Animated background gradients */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ y: yBg }}
      >
        {/* Cyan glow */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full bg-cyan-400/15 blur-[180px] top-[-250px] left-[-250px]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
        />

        {/* Blue glow */}
        <motion.div
          className="absolute w-[750px] h-[750px] rounded-full bg-blue-500/15 blur-[180px] bottom-[-250px] right-[-250px]"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
        />

        {/* Soft overlay for color blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1f]/70 via-[#050505]/50 to-black/80 mix-blend-overlay" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl px-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight drop-shadow-[0_0_20px_rgba(56,189,248,0.15)]">
          We make brands unforgettable.
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Pehchaan Media is a full-service creative agency crafting stories that
          connect, inspire, and move audiences. From design to film to strategy —
          we create experiences that define identities.
        </p>

        <motion.a
          href="#work"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-xl hover:shadow-cyan-500/30 transition-all"
        >
          <Play size={18} className="mr-2" />
          View Our Work
        </motion.a>

        {/* Floating arrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-cyan-400 animate-bounce" size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}

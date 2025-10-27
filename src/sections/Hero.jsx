import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import { Play, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#0a0f1f] via-[#0a0a0a] to-[#050505]"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full bg-cyan-500/10 blur-[200px] top-[-200px] left-[-200px]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full bg-blue-500/10 blur-[160px] bottom-[-200px] right-[-200px]"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl px-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight">
          We make brands unforgettable.
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Pehchaan Media is a full-service creative agency crafting stories that
          connect, inspire, and move audiences. From design to film to strategy —
          we create experiences that define identities.
        </p>

        <motion.a
          href="#work"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-xl hover:shadow-cyan-500/30 transition-all"
        >
          <Play size={18} className="mr-2" />
          View Our Work
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-cyan-400 animate-bounce" size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}

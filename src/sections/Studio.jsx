import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { slideIn, fadeInUp } from "@/utils/animations";
import { Sparkles, Camera, Heart, Users } from "lucide-react";

export default function Studio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="studio"
      ref={ref}
      className="relative py-24 md:py-36 bg-[#080808] overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[900px] h-[900px] rounded-full bg-blue-500/5 blur-[200px] top-[-200px] left-[-200px]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
        />
      </div>

      {/* Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="relative z-10 text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
          Inside Our Studio
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          A space where creativity meets technology — our studio is designed to
          foster collaboration, experimentation, and magic. Every corner tells
          a story of ideas coming to life.
        </p>
      </motion.div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
        {/* Image */}
        <motion.div
          variants={slideIn("left")}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="rounded-3xl overflow-hidden border border-white/10 shadow-lg hover:border-cyan-400/30 transition-all"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Studio Interior"
            className="object-cover w-full h-[420px]"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          variants={slideIn("right")}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col justify-center space-y-6"
        >
          <h3 className="text-3xl font-semibold text-white">
            Where Ideas Turn Into Reality
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Whether it’s conceptualizing a new brand, producing a film, or
            designing an immersive web experience, our studio is the heart of
            innovation.
          </p>
          <ul className="text-gray-300 grid grid-cols-2 gap-3 mt-4">
            <li className="flex items-center space-x-2">
              <Sparkles className="text-cyan-400" size={16} />
              <span>Design Lab</span>
            </li>
            <li className="flex items-center space-x-2">
              <Camera className="text-cyan-400" size={16} />
              <span>Film Stage</span>
            </li>
            <li className="flex items-center space-x-2">
              <Heart className="text-cyan-400" size={16} />
              <span>Brand Strategy</span>
            </li>
            <li className="flex items-center space-x-2">
              <Users className="text-cyan-400" size={16} />
              <span>Creative Teams</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

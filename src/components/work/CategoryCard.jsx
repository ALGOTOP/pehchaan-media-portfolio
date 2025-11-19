// src/components/work/CategoryCard.jsx
import React from "react";
import { motion } from "framer-motion";

export default function CategoryCard({ category, active, onClick }) {
  return (
    <motion.button
      onClick={() => onClick(category)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      className={`px-6 py-3 rounded-xl border text-sm tracking-wide transition-all duration-300 
        backdrop-blur-md bg-black/30 shadow-lg 
        ${
          active
            ? "border-cyan-400 text-cyan-400"
            : "border-white/10 text-gray-300 hover:text-white hover:border-white/40"
        }`}
    >
      {category}
    </motion.button>
  );
}

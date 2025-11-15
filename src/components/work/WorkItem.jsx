// src/components/work/WorkItem.jsx
import React from "react";
import { motion } from "framer-motion";

export default function WorkItem({ item, index, onOpen }) {
  return (
    <motion.div
      className="group relative cursor-pointer"
      onClick={() => onOpen(item)}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* thumbnail */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-black border border-white/10">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* title overlay */}
        <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-400">
          <h3 className="text-white text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-300 text-sm">{item.category}</p>
        </div>
      </div>
    </motion.div>
  );
}

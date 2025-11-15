// src/components/work/CaseStudyModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CaseStudyModal({ open, item, onClose }) {
  if (!open || !item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modal panel */}
        <motion.div
          className="relative max-w-4xl w-full bg-[#0c0c0f] border border-white/10 rounded-2xl p-6 overflow-y-auto max-h-[90vh]"
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          >
            ✕
          </button>

          {/* Thumbnail */}
          {item.thumbnail && (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-72 object-cover rounded-xl mb-6 border border-white/10"
            />
          )}

          {/* Text */}
          <h2 className="text-white text-2xl font-semibold">{item.title}</h2>
          <p className="text-gray-400 text-sm">{item.category}</p>

          <p className="mt-4 text-gray-300 leading-relaxed">
            {item.description ||
              "This is a placeholder description. You will replace this with real case study content later."}
          </p>

          {/* Placeholder button */}
          <a
            href="#"
            className="inline-block mt-6 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm transition"
          >
            View Full Case Study →
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

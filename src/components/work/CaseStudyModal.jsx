// src/components/work/CaseStudyModal.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalBackdrop, modalContent } from "@/utils/workAnimations";

export default function CaseStudyModal({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-xl"
        variants={modalBackdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="relative w-[90%] max-w-4xl bg-[#0d0d0d] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          variants={modalContent}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={item.thumbnail}
            className="w-full h-[350px] object-cover opacity-90"
          />

          <div className="p-8">
            <h2 className="text-3xl font-semibold mb-4 tracking-tight text-white">
              {item.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">{item.description}</p>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-300 hover:text-white transition text-xl"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

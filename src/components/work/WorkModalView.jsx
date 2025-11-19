// src/components/work/WorkModalView.jsx (PART 1 of 2)
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalBackdrop, modalContent } from "@/utils/workAnimations";
import PropTypes from "prop-types";

/**
 * WorkModalView
 * - Cinematic fullscreen modal viewer
 * - ESC to close
 * - Click outside to close
 * - Smooth motion blur fade-in
 * - Optional next/prev controls
 */

export default function WorkModalView({
  open,
  item,
  onClose,
  onNext,
  onPrev,
}) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          variants={modalBackdrop}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            variants={modalContent}
            className="relative z-[201] max-w-5xl w-full mx-6 rounded-3xl overflow-hidden shadow-2xl bg-[#050506]/90 border border-white/10 backdrop-blur-2xl"
          >
            {item && <ModalContent item={item} onNext={onNext} onPrev={onPrev} />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

WorkModalView.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object,
  onClose: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
};
// src/components/work/WorkModalView.jsx (PART 2 of 2)

function ModalContent({ item, onNext, onPrev }) {
  return (
    <div className="relative p-8">

      {/* Title */}
      <h2 className="text-white text-xl font-semibold mb-3">{item.title}</h2>
      <p className="text-white/60 text-sm mb-6">{item.year || "Year"} · {item.client || "Client"}</p>

      {/* Image */}
      <div className="rounded-xl overflow-hidden shadow-lg shadow-black/40">
        <img
          src={item.thumbnail}
          alt={item.alt || item.title}
          loading="lazy"
          className="w-full object-cover"
        />
      </div>

      {/* Description */}
      {item.description && (
        <p className="mt-5 text-white/70 leading-relaxed text-sm">
          {item.description}
        </p>
      )}

      {/* Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={onPrev}
          className="mx-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
        >
          ‹
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={onNext}
          className="mx-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
        >
          ›
        </button>
      </div>
    </div>
  );
}

ModalContent.propTypes = {
  item: PropTypes.object.isRequired,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
};

// END FILE

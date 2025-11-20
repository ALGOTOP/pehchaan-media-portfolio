// src/components/work/WorkModalView.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalBackdrop, modalContent } from "@/utils/workAnimations";
import PropTypes from "prop-types";

/**
 * WorkModalView
 * Fullscreen cinematic modal for viewing a selected work item.
 */
export default function WorkModalView({ open, item, onClose, onNext, onPrev }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
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
          <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={onClose} />

          {/* Modal content */}
          <motion.div
            variants={modalContent}
            className="relative z-[201] max-w-5xl w-full mx-6 rounded-3xl overflow-hidden shadow-2xl bg-[#050506]/95 border border-white/10 backdrop-blur-2xl"
          >
            {item && <ModalContent item={item} onNext={onNext} onPrev={onPrev} onClose={onClose} />}
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

// Inner layout
function ModalContent({ item, onNext, onPrev, onClose }) {
  return (
    <div className="relative p-6 md:p-8">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70"
        aria-label="Close"
      >
        ×
      </button>

      {/* Title / meta */}
      <div className="mb-5 pr-10">
        <h2 className="text-white text-xl md:text-2xl font-semibold mb-1">{item.title}</h2>
        {(item.year || item.client || item.type) && (
          <p className="text-white/60 text-sm">
            {item.client && <span>{item.client}</span>}
            {item.client && (item.year || item.type) && <span> · </span>}
            {item.year && <span>{item.year}</span>}
            {item.type && <span> · {item.type}</span>}
          </p>
        )}
      </div>

      {/* Image */}
      <div className="rounded-xl overflow-hidden shadow-lg shadow-black/40">
        <img
          src={item.thumbnail}
          alt={item.alt || item.title}
          loading="lazy"
          className="w-full max-h-[60vh] object-contain bg-black"
        />
      </div>

      {/* Description */}
      {item.description && (
        <p className="mt-5 text-white/70 leading-relaxed text-sm md:text-[15px]">
          {item.description}
        </p>
      )}

      {/* Next / Prev controls */}
      {onPrev && (
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={onPrev}
            className="mx-4 md:mx-6 p-2 md:p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full border border-white/10"
            aria-label="Previous"
          >
            ‹
          </button>
        </div>
      )}
      {onNext && (
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={onNext}
            className="mx-4 md:mx-6 p-2 md:p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full border border-white/10"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

ModalContent.propTypes = {
  item: PropTypes.object.isRequired,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onClose: PropTypes.func,
};

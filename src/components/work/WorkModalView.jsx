// src/components/work/MediaModal.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function MediaModal({ open, onClose, item }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !item) return null;

  const isVideo = (url) => {
    if (!url) return false;
    return /\.mp4|\.webm|\.mov/i.test(url) || url.includes("youtube") || url.includes("vimeo");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        className="relative z-10 w-full max-w-[1100px] bg-[#060606] rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-xs text-white/60 mt-1">{item.client} • {item.year}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="ml-auto text-white/60 hover:text-white p-2 rounded"
          >
            <span className="sr-only">Close</span>
            ✕
          </button>
        </div>

        <div className="px-6 pb-6">
          <div className="w-full bg-black rounded-md overflow-hidden">
            {isVideo(item.media) ? (
              // YouTube/Vimeo embed or direct mp4
              item.media.includes("youtube") || item.media.includes("vimeo") ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={item.media}
                    title={item.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <video
                  src={item.media}
                  className="w-full h-auto max-h-[70vh]"
                  controls
                  playsInline
                />
              )
            ) : (
              <img src={item.media} alt={item.title} className="w-full h-auto object-contain" />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

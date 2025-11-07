// src/components/ReelModal.jsx
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

/**
 * Modal shows:
 * - direct video <video> with controls + sound (autoplay if called by user interaction)
 * - or embedded iframe for YouTube/Vimeo (autoplay depends on host & browser)
 *
 * Click outside or X to close.
 */

function isYouTube(url = "") {
  return /youtube\.com|youtu\.be/.test(url);
}
function isVimeo(url = "") {
  return /vimeo\.com/.test(url);
}
function isDirectVideo(url = "") {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

export default function ReelModal({ reel, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // if direct video, try to autoplay with sound (user initiated by tap)
    if (isDirectVideo(reel.src) && videoRef.current) {
      const v = videoRef.current;
      v.muted = false;
      v.volume = 1;
      v.play().catch(() => {});
    }
    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      if (videoRef.current) {
        try { videoRef.current.pause(); } catch (e) {}
      }
    };
  }, [reel.src]);

  const embedUrl = (() => {
    if (isYouTube(reel.src)) {
      // turn youtu.be or youtube link to embed + modest branding & autoplay off by default
      const idMatch = reel.src.match(/(youtu\.be\/|v=)([^&?/]+)/);
      const id = idMatch ? idMatch[2] : "";
      return `https://www.youtube.com/embed/${id}?rel=0&showinfo=0&modestbranding=1&autoplay=0`;
    }
    if (isVimeo(reel.src)) {
      const idMatch = reel.src.match(/vimeo\.com\/(\d+)/);
      const id = idMatch ? idMatch[1] : "";
      return `https://player.vimeo.com/video/${id}?autoplay=0&title=0&byline=0&portrait=0`;
    }
    return null;
  })();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl mx-auto"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 text-white/80 hover:text-white"
          aria-label="Close"
        >
          <X size={26} />
        </button>

        <div className="rounded-2xl overflow-hidden bg-black">
          {isDirectVideo(reel.src) ? (
            <video
              ref={videoRef}
              src={reel.src}
              controls
              autoPlay
              playsInline
              className="w-full h-auto max-h-[80vh] object-contain bg-black"
            />
          ) : embedUrl ? (
            <div className="w-full aspect-video">
              <iframe
                title={reel.brand}
                src={embedUrl}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="p-8 text-center text-gray-300">
              <p>Cannot play this media. Try a direct mp4/webm or a valid YouTube/Vimeo link.</p>
            </div>
          )}
        </div>

        {/* brand + tools */}
        <div className="mt-4 text-white">
          <h3 className="text-xl font-semibold">{reel.brand}</h3>
          <p className="text-sm text-gray-300">{reel.tools?.join(", ")}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// src/components/ReelCard.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReelModal from "./ReelModal";

/**
 * ReelCard:
 * - Hover (desktop): expand + fade audio in
 * - Leave (desktop): shrink + fade audio out
 * - Click (mobile / touch): open modal with full controls & sound
 *
 * Behavior:
 * - If reel.src is a direct file (mp4/webm) -> use <video>
 * - If reel.src is YouTube or Vimeo -> show poster & open modal (embed) on click
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

export default function ReelCard({ reel }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // responsive detection once on mount
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Audio fade handler for direct video files on hover.
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !isDirectVideo(reel.src) || isMobile) return;

    let fadeInterval;
    if (hovered) {
      try {
        vid.muted = false;
        if (vid.paused) vid.play().catch(() => {});
        vid.volume = vid.volume || 0;
        fadeInterval = setInterval(() => {
          if (vid.volume < 1) vid.volume = Math.min(1, +(vid.volume + 0.06).toFixed(2));
          else clearInterval(fadeInterval);
        }, 40);
      } catch (e) {
        // play may fail if browser blocks; ignore silently
      }
    } else {
      fadeInterval = setInterval(() => {
        if (!vid) { clearInterval(fadeInterval); return; }
        if (vid.volume > 0) {
          vid.volume = Math.max(0, +(vid.volume - 0.06).toFixed(2));
        } else {
          vid.muted = true;
          vid.pause();
          clearInterval(fadeInterval);
        }
      }, 40);
    }
    return () => clearInterval(fadeInterval);
  }, [hovered, reel.src, isMobile]);

  // If URL is non-direct (YouTube/Vimeo), we'll just show poster and open modal on click.
  const handleClick = () => {
    if (isMobile || !isDirectVideo(reel.src)) {
      setOpen(true);
    } else {
      // desktop direct video click toggles play/pause
      const v = videoRef.current;
      if (!v) return;
      if (v.paused) v.play().catch(() => {});
      else v.pause();
    }
  };

  // styling: keep cards visually ~50% width on desktop via grid 2cols; aspect-video keeps pleasant ratio
  return (
    <>
      <motion.div
        className="relative rounded-2xl overflow-hidden aspect-video shadow-lg bg-black"
        onMouseEnter={() => !isMobile && isDirectVideo(reel.src) && setHovered(true)}
        onMouseLeave={() => !isMobile && isDirectVideo(reel.src) && setHovered(false)}
        onClick={handleClick}
        initial={{ scale: 1 }}
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        role="button"
        aria-label={`Open ${reel.brand} reel`}
      >
        {/* Video or Poster */}
        {isDirectVideo(reel.src) ? (
          <video
            ref={videoRef}
            src={reel.src}
            poster={reel.poster}
            className="w-full h-full object-cover"
            playsInline
            muted
            loop
            preload="metadata"
          />
        ) : (
          // Non-direct: use poster image as preview (or fallback)
          <img
            src={reel.poster || "/images/video-fallback.jpg"}
            alt={`${reel.brand} preview`}
            className="w-full h-full object-cover"
          />
        )}

        {/* subtle cinematic gradient overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Light flare (animated) */}
        <motion.div
          className="absolute -left-[120%] top-0 w-[300%] h-full pointer-events-none mix-blend-screen opacity-0"
          animate={hovered ? { left: "120%", opacity: [0, 0.45, 0] } : { left: "-120%", opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0.12) 55%, transparent 100%)",
            filter: "blur(12px)",
          }}
        />

        {/* Info overlay (brand + tools) */}
        <div className="absolute left-4 bottom-4 text-left z-10">
          <h3 className="text-lg md:text-2xl font-semibold">{reel.brand}</h3>
          <p className="text-xs md:text-sm text-gray-300 mt-1">
            {reel.tools?.join(", ")}
          </p>
        </div>

        {/* small hint for mobile */}
        <div className="absolute right-4 top-4 text-xs text-gray-200/80 hidden md:block">
          {/* hidden on mobile */}
        </div>

        {/* subtle border on hover */}
        <motion.span
          className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent"
          animate={hovered ? { borderColor: "rgba(255,255,255,0.06)" } : { borderColor: "transparent" }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Modal for mobile or for non-direct source (youtube/vimeo) */}
      <AnimatePresence>
        {open && (
          <ReelModal reel={reel} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

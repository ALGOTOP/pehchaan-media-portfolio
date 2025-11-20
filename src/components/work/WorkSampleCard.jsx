// src/components/work/MediaCard.jsx
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Props:
 * - item: { id, title, caption, client, year, media }  (media = url string)
 * - onOpen(item) -> open modal
 *
 * Behavior:
 * - Detects whether media is video (mp4, webm, mov) or embed (youtube/vimeo) and image otherwise
 * - Video plays on mouse enter with sound; on mouse leave it mutes and continues playing to end (no loop)
 * - Clicking opens modal
 */

const isVideoUrl = (url) => {
  if (!url) return false;
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be") || u.includes("vimeo.com")) return true;
  return /\.mp4|\.webm|\.mov|\.m3u8/i.test(u);
};

export default function MediaCard({ item, onOpen }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // ensure videos are not looping by default
    if (videoRef.current) {
      videoRef.current.loop = false;
      // do not autoplay
    }
  }, []);

  const handleMouseEnter = () => {
    try {
      const vid = videoRef.current;
      if (!vid) return;
      // if ended, restart
      if (vid.ended) vid.currentTime = 0;
      vid.muted = false;
      // attempt to play with sound
      const p = vid.play();
      if (p && p.catch) p.catch(() => {
        // ignore autoplay block errors
      });
    } catch (e) { /* swallow */ }
  };

  const handleMouseLeave = () => {
    try {
      const vid = videoRef.current;
      if (!vid) return;
      // mute and let it play to the end (no loop)
      vid.muted = true;
      vid.loop = false;
      const p = vid.play();
      if (p && p.catch) p.catch(() => {});
    } catch (e) {}
  };

  const isVideo = isVideoUrl(item.media);

  const videoGlow = isVideo ? "shadow-[0_10px_30px_rgba(0,200,255,0.06)] ring-1 ring-cyan-400/6" : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      whileHover={{ scale: 1.01 }}
      className={`mb-6 break-inside-avoid rounded-2xl overflow-hidden bg-[#070707] ${videoGlow}`}
    >
      <div
        className={`relative w-full ${isVideo ? "aspect-[9/16]" : "w-full"} cursor-pointer`}
        onClick={() => onOpen(item)}
        onMouseEnter={isVideo ? handleMouseEnter : undefined}
        onMouseLeave={isVideo ? handleMouseLeave : undefined}
      >
        {isVideo ? (
          // For youtube/vimeo we could show an iframe thumbnail with play overlay (but not autoplay on load).
          (item.media.includes("youtube") || item.media.includes("vimeo")) ? (
            <div className="w-full h-full bg-black">
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
              ref={videoRef}
              src={item.media}
              className="w-full h-full object-cover"
              playsInline
              muted
              preload="metadata"
            />
          )
        ) : (
          <img src={item.media} alt={item.title} className="w-full h-auto object-cover" />
        )}

        {/* play icon overlay for videos */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h4 className="text-sm font-semibold leading-tight">{item.title}</h4>
        <p className="text-xs text-white/60 mt-1">{item.client} • {item.year}</p>
        <p className="text-xs text-white/60 mt-2 line-clamp-3">{item.caption}</p>
      </div>
    </motion.div>
  );
}

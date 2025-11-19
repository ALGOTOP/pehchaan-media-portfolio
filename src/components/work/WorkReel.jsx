// src/components/work/WorkReel.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * WorkReel - horizontally scrollable reel for video embeds or thumbnails.
 * items: [{ id, title, embedUrl, thumbnail, client }]
 */
export default function WorkReel({ items = [] }) {
  return (
    <div className="mt-6">
      <h3 className="text-sm text-white/60 uppercase tracking-wide mb-3">Showreel & video samples</h3>
      <div className="flex gap-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-white/10">
        {items.map((it) => (
          <motion.div
            key={it.id}
            className="min-w-[320px] rounded-xl overflow-hidden border border-white/8 bg-black/20"
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <div className="w-full h-44 bg-black/40">
              {it.embedUrl ? (
                <iframe
                  src={it.embedUrl}
                  title={it.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img src={it.thumbnail} alt={it.title} className="w-full h-full object-cover" loading="lazy" />
              )}
            </div>
            <div className="p-3">
              <p className="text-sm font-medium">{it.title}</p>
              <p className="text-xs text-white/60 mt-1">{it.client || "Demo Project"}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

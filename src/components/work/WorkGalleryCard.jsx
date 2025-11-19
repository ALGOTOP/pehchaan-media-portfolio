// src/components/work/WorkGalleryCard.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * Simple gallery card. item: { id, title, thumbnail, client, year, sampleUrl }
 */
export default function WorkGalleryCard({ item }) {
  return (
    <motion.a
      href={item.sampleUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group block rounded-2xl overflow-hidden border border-white/6 bg-gradient-to-br from-white/2 to-black/10"
    >
      <div className="relative w-full h-48 md:h-56 lg:h-44">
        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-3">
        <h4 className="text-sm font-semibold leading-tight">{item.title}</h4>
        <p className="text-xs text-white/60 mt-1">{item.client} • {item.year}</p>
      </div>
    </motion.a>
  );
}

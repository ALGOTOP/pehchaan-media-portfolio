// src/sections/Showreel.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

// ───────────────────────────────
// Reel data (you can extend this)
// ───────────────────────────────
const reels = [
  {
    title: "Olipo Drink — 3D Motion",
    brand: "Olipo",
    tools: "Cinema4D • After Effects • Octane Render",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/Motion%203D%20Refreshingly%20Citrus%20Olipo%20Drink%20Final.Cut%286%29.mp4",
  },
  {
    title: "Denver Fragrance Ad",
    brand: "Denver",
    tools: "Sony FX3 • Premiere Pro • DaVinci Resolve",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/Denver%20Fragrance%20Videography%20adverts%20Final.Cut%289%29~2.mp4",
  },
  {
    title: "Aloe Vera Refresh Campaign",
    brand: "KlickPin CF",
    tools: "Blender • After Effects • Photoshop",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/From%20KlickPin%20CF%20Aloe%20Vera%20The%20Refreshing%20Element.mp4",
  },
  {
    title: "CellCosmet Inspiration Reel",
    brand: "CellCosmet",
    tools: "After Effects • Redshift • DaVinci Resolve",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/From%20KlickPin%20CF%20Motion%20inspiration%20-%20cellCosmet%20%5BVideo%5D%20en%202025%20_%20Anuncios%20creativos%20Disenos%20de%20unas%20Fondos%20para%20fotografia.mp4",
  },
];

export default function Showreel() {
  const [hovered, setHovered] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section
      id="showreel"
      className="relative bg-black text-white py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-semibold mb-16 text-center"
        >
          Showreel Highlights
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reels.map((reel, i) => (
            <motion.div
              key={i}
              className="relative cursor-pointer rounded-2xl overflow-hidden group"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActiveVideo(reel)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Video Preview */}
              <video
                src={reel.video}
                autoPlay
                muted
                loop
                playsInline
                className={`w-full object-cover duration-700 ${
                  hovered === i ? "scale-105" : "scale-100"
                }`}
                style={{
                  aspectRatio: "16 / 9",
                  filter: hovered === i ? "brightness(100%)" : "brightness(70%)",
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 via-transparent">
                <h3 className="text-xl font-semibold">{reel.brand}</h3>
                <p className="text-sm opacity-80">{reel.tools}</p>
              </div>

              {/* Play Button */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <Play size={36} className="text-white" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ──────────────── Modal for Mobile Tap Expand ──────────────── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.video
              src={activeVideo.video}
              controls
              autoPlay
              className="rounded-2xl w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            />
            <motion.div
              className="absolute bottom-8 text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-2xl font-semibold">
                {activeVideo.brand}
              </h3>
              <p className="text-sm opacity-80">{activeVideo.tools}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

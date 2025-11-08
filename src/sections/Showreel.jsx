// src/sections/Showreel.jsx
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { useInView } from "react-intersection-observer";

// ───────────────────────────────
// Reels Data
// ───────────────────────────────
const reels = [
  {
    title: "Olipo Drink — 3D Motion Ad",
    brand: "Olipo",
    tools: "Cinema 4D • After Effects • Octane Render",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/Motion%203D%20Refreshingly%20Citrus%20Olipo%20Drink%20Final.Cut%286%29.mp4",
  },
  {
    title: "Denver Fragrance Videography",
    brand: "Denver",
    tools: "Sony FX3 • DaVinci Resolve • Lightroom",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/Denver%20Fragrance%20Videography%20adverts%20Final.Cut%289%29~2.mp4",
  },
  {
    title: "Aloe Vera — Refresh Campaign",
    brand: "KlickPin CF",
    tools: "Blender • After Effects • Photoshop",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/From%20KlickPin%20CF%20Aloe%20Vera%20The%20Refreshing%20Element.mp4",
  },
  {
    title: "CellCosmet — Motion Inspiration",
    brand: "CellCosmet",
    tools: "After Effects • Redshift • DaVinci Resolve",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/From%20KlickPin%20CF%20Motion%20inspiration%20-%20cellCosmet%20%5BVideo%5D%20en%202025%20_%20Anuncios%20creativos%20Disenos%20de%20unas%20Fondos%20para%20fotografia.mp4",
  },
  {
    title: "Aurora — Conceptual Product Ad",
    brand: "Aurora",
    tools: "Blender • Octane • Premiere Pro",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/Motion%203D%20Refreshingly%20Citrus%20Olipo%20Drink%20Final.Cut%286%29.mp4",
  },
];

// ───────────────────────────────
// Main Component
// ───────────────────────────────
export default function Showreel() {
  const [hovered, setHovered] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section
      id="showreel"
      className="relative bg-black text-white py-32 px-6 md:px-16 overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Showreel
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto"
        >
          A curation of Pehchaan Media’s most expressive motion and film work —
          cinematic, emotional, and built to move.
        </motion.p>
      </div>

      {/* Reels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reels.map((reel, i) => (
          <ReelCard
            key={i}
            reel={reel}
            hovered={hovered === i}
            onHover={() => setHovered(i)}
            onLeave={() => setHovered(null)}
            onClick={() => setActiveVideo(reel)}
            index={i}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeVideo && (
          <ModalReel reel={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// ───────────────────────────────
// Reel Card Component
// ───────────────────────────────
function ReelCard({ reel, hovered, onHover, onLeave, onClick, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const videoRef = useRef(null);

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        hovered
          ? "scale-[1.05] shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          : "scale-100"
      }`}
      style={{ aspectRatio: "16/9", background: "#0a0a0a" }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      {/* Gleam effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
      >
        <motion.div
          className="absolute top-0 left-[-75%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform skew-x-[20deg]"
          animate={
            hovered
              ? {
                  left: ["-75%", "125%"],
                  transition: { duration: 1.5, ease: "easeInOut" },
                }
              : { left: "-75%" }
          }
        />
      </motion.div>

      {/* Video */}
      <video
        ref={videoRef}
        src={reel.video}
        muted
        loop
        autoPlay
        playsInline
        className="w-full h-full object-cover transition-all duration-700"
        style={{
          filter: hovered ? "brightness(1)" : "brightness(0.75)",
        }}
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 flex flex-col justify-end p-6">
        <h3 className="text-xl font-semibold mb-1">{reel.brand}</h3>
        <p className="text-gray-400 text-sm">{reel.tools}</p>
      </div>

      {/* Play Button */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
          <Play size={36} className="text-white" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ───────────────────────────────
// Modal Reel
// ───────────────────────────────
function ModalReel({ reel, onClose }) {
  const videoRef = useRef(null);

  return (
    <motion.div
      className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[999] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-[90%] max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <video
          ref={videoRef}
          src={reel.video}
          autoPlay
          controls
          playsInline
          className="w-full h-auto rounded-2xl"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4 text-white">
          <h3 className="text-lg font-semibold">{reel.brand}</h3>
          <p className="text-gray-400 text-sm">{reel.tools}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

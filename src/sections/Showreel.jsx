import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useInView } from "react-intersection-observer";

// ───────────────────────────────
// Reel data (6 placeholders with thumbnails)
// ───────────────────────────────
const reels = [
  {
    title: "Olipo Drink — 3D Motion",
    brand: "Olipo",
    tools: "Cinema4D • After Effects • Octane Render",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/Motion%203D%20Refreshingly%20Citrus%20Olipo%20Drink%20Final.Cut%286%29.mp4",
    thumbnail: "/thumbnails/olipo.jpg",
  },
  {
    title: "Denver Fragrance Ad",
    brand: "Denver",
    tools: "Sony FX3 • Premiere Pro • DaVinci Resolve",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/Denver%20Fragrance%20Videography%20adverts%20Final.Cut%289%29~2.mp4",
    thumbnail: "/thumbnails/denver.jpg",
  },
  {
    title: "Aloe Vera Refresh Campaign",
    brand: "KlickPin CF",
    tools: "Blender • After Effects • Photoshop",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/From%20KlickPin%20CF%20Aloe%20Vera%20The%20Refreshing%20Element.mp4",
    thumbnail: "/thumbnails/aloe-vera.jpg",
  },
  {
    title: "CellCosmet Inspiration Reel",
    brand: "CellCosmet",
    tools: "After Effects • Redshift • DaVinci Resolve",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/From%20KlickPin%20CF%20Motion%20inspiration%20-%20cellCosmet%20%5BVideo%5D%20en%202025%20_%20Anuncios%20creativos%20Disenos%20de%20unas%20Fondos%20para%20fotografia.mp4",
    thumbnail: "/thumbnails/cellcosmet.jpg",
  },
  {
    title: "Aurix Project Reel",
    brand: "Aurix",
    tools: "After Effects • Blender • Premiere",
    video: "#", // placeholder
    thumbnail: "/thumbnails/aurix.jpg",
  },
  {
    title: "Zenith Campaign",
    brand: "Zenith",
    tools: "Cinema4D • Photoshop • After Effects",
    video: "#", // placeholder
    thumbnail: "/thumbnails/zenith.jpg",
  },
];

export default function Showreel() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
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
            <ReelCard
              key={i}
              reel={reel}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              setActiveVideo={setActiveVideo}
            />
          ))}
        </div>
      </div>

      {/* Mobile / tap modal */}
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
              <h3 className="text-2xl font-semibold">{activeVideo.brand}</h3>
              <p className="text-sm opacity-80">{activeVideo.tools}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ───────────────────────────────
// Reel Card Component
// ───────────────────────────────
function ReelCard({ reel, index, hoveredIndex, setHoveredIndex, setActiveVideo }) {
  const videoRef = useRef(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  const [hasPlayed, setHasPlayed] = useState(false);

  // Play once on hover
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (hoveredIndex === index && inView && !hasPlayed) {
      video.currentTime = 0;
      video.play();
      const handleEnded = () => setHasPlayed(true);
      video.addEventListener("ended", handleEnded);
      return () => video.removeEventListener("ended", handleEnded);
    } else if (hoveredIndex !== index) {
      video.pause();
      video.currentTime = 0;
    }
  }, [hoveredIndex, inView, hasPlayed, index]);

  return (
    <div
      ref={ref}
      className="relative cursor-pointer rounded-2xl overflow-hidden group"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onClick={() => setActiveVideo(reel)}
    >
      <video
        ref={videoRef}
        src={reel.video}
        poster={reel.thumbnail}
        muted
        playsInline
        preload="metadata"
        className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ aspectRatio: "16 / 9" }}
      />

      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 via-transparent">
        <h3 className="text-xl font-semibold">{reel.brand}</h3>
        <p className="text-sm opacity-80">{reel.tools}</p>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ─────────────────────────────────────────────
// ─── DATA
// ─────────────────────────────────────────────
const showreels = [
  {
    title: "Olipo Drink — 3D Motion Ad",
    tools: "Blender • After Effects • Premiere Pro",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/Motion%203D%20Refreshingly%20Citrus%20Olipo%20Drink%20Final.Cut%286%29.mp4",
  },
  {
    title: "Motion Graphic Concept",
    tools: "Cinema 4D • Redshift • After Effects",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/110c2cbf42fc32faec789114fdda0196.mp4",
  },
  {
    title: "Denver Fragrance Videography",
    tools: "Sony FX3 • DaVinci Resolve • Lightroom",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/Denver%20Fragrance%20Videography%20adverts%20Final.Cut%289%29~2.mp4",
  },
  {
    title: "KlickPin — Aloe Vera Campaign",
    tools: "Canon R5 • After Effects • Photoshop",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/From%20KlickPin%20CF%20Aloe%20Vera%20The%20Refreshing%20Element.mp4",
  },
  {
    title: "CellCosmet Motion Design",
    tools: "Illustrator • After Effects • Premiere Pro",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/From%20KlickPin%20CF%20Motion%20inspiration%20-%20cellCosmet%20%5BVideo%5D%20en%202025%20_%20Anuncios%20creativos%20Disenos%20de%20unas%20Fondos%20para%20fotografia.mp4",
  },
];

// ─────────────────────────────────────────────
// ─── COMPONENT
// ─────────────────────────────────────────────
export default function Showreel() {
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="showreel"
      className="relative bg-black text-white py-24 px-4 md:px-12 overflow-hidden"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-white">
          Our Showreel
        </h2>
        <p className="text-gray-400 mt-4 text-lg">
          Cinematic creations — each frame, a crafted story.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {showreels.map((item, i) => (
          <ReelCard
            key={i}
            data={item}
            active={active}
            setActive={setActive}
            index={i}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Mobile Modal */}
      <AnimatePresence>
        {isMobile && active !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full max-w-3xl">
              <video
                src={showreels[active].video}
                autoPlay
                controls
                playsInline
                className="rounded-2xl w-full h-auto"
              />
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 p-2 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─────────────────────────────────────────────
// ─── Reel Card Component
// ─────────────────────────────────────────────
function ReelCard({ data, index, active, setActive, isMobile }) {
  const videoRef = useRef(null);
  const [isHovered, setHovered] = useState(false);

  // Sound fade in/out
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fadeInterval;
    if (isHovered) {
      video.muted = false;
      video.volume = 0;
      video.play();
      fadeInterval = setInterval(() => {
        if (video.volume < 1) video.volume = Math.min(1, video.volume + 0.1);
      }, 100);
    } else {
      fadeInterval = setInterval(() => {
        if (video.volume > 0) video.volume = Math.max(0, video.volume - 0.1);
        else video.muted = true;
      }, 100);
    }

    return () => clearInterval(fadeInterval);
  }, [isHovered]);

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-700 ease-out ${
        active === index ? "z-20" : ""
      }`}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      onClick={() => isMobile && setActive(index)}
      animate={{
        scale: isHovered ? 1.05 : 1,
        width: isHovered ? "110%" : "100%",
        zIndex: isHovered ? 10 : 1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={data.video}
        autoPlay
        loop
        playsInline
        muted
        preload="metadata"
        className="object-cover w-full h-72 md:h-96 brightness-90 transition-all duration-700 group-hover:brightness-100"
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 flex flex-col justify-end p-6">
        <h3 className="text-xl md:text-2xl font-semibold">{data.title}</h3>
        <p className="text-sm text-gray-300 mt-1">{data.tools}</p>
      </div>

      {/* Light Flare */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-r from-white/5 via-transparent to-white/5 mix-blend-screen"
        animate={{ opacity: isHovered ? [0.2, 0.4, 0.2] : 0 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}

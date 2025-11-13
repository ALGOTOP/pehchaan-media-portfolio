import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ─────────────────────────────────────────────
// ─── DATA
// ─────────────────────────────────────────────
const showreels = [
  {
    title: "KENETIK - 3D Motion Ad + Brand Identity",
    tools: "Blender • After Effects • Premiere Pro • DaVinci",
    video:
      "https://ia803108.us.archive.org/17/items/ketone.-drink.-2025.final-6/Ketone.Drink.2025.final%286%29.mp4",
    poster: "/thumbnails/kenetik.jpg",
  },
  {
    title: "TRULY - 4D Graphic Post + Ad",
    tools: "Cinema 4D • Redshift • After Effects",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/110c2cbf42fc32faec789114fdda0196.mp4",
    poster: "/thumbnails/truly.jpg",
  },
  {
    title: "Denver Fragrances - Videography",
    tools: "Sony FX3 • DaVinci Resolve • Lightroom",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/Denver%20Fragrance%20Videography%20adverts%20Final.Cut%289%29~2.mp4",
    poster: "/thumbnails/denver.jpg",
  },
  {
    title: "Kinstu By BRIZO - Motion Ad + Major Rebranding",
    tools: "Canon R5 • After Effects • Adobe Premiere Pro • Cinema 4D",
    video:
      "https://ia600504.us.archive.org/32/items/from-klick-pin-cf-kintsur-kitchen-collection-by-brizo-video-in-2025-kitchen-coll/From%20KlickPin%20CF%20Kintsu%C2%AE%20Kitchen%20Collection%20by%20Brizo%20%5BVideo%5D%20in%202025%20_%20Kitchen%20collection%20Motion%20design%20Motion%20design%20video.mp4",
    poster: "/thumbnails/kinstu.jpg",
  },
  {
    title: "CellCosmet - Creative Direction",
    tools: "Illustrator • After Effects • Premiere Pro • Maxon Cinema 4D",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/From%20KlickPin%20CF%20Motion%20inspiration%20-%20cellCosmet%20%5BVideo%5D%20en%202025%20_%20Anuncios%20creativos%20Disenos%20de%20unas%20Fondos%20para%20fotografia.mp4",
    poster: "/thumbnails/cellcosmet.jpg",
  },
  {
    title: "URÉE - 3D Motion Ad",
    tools: "Blender • After Effects • Premiere Pro",
    video:
      "https://ia600501.us.archive.org/26/items/ure-e-serums-oils-luxury-graphic-design-motion-graphics-design-cut-8-finalized/UR%C3%88E%20Serums%20%26%20Oils%20Luxury%20graphic%20design%20Motion%20graphics%20design%20Cut%288%29%20Finalized.mp4",
    poster: "/thumbnails/uree.jpg",
  },
];

// ─────────────────────────────────────────────
// ─── MAIN COMPONENT
// ─────────────────────────────────────────────
export default function Showreel() {
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = useRef([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pauseOthers = (currentIndex) => {
    videoRefs.current.forEach((vid, idx) => {
      if (vid && idx !== currentIndex) {
        vid.pause();
        vid.muted = true;
      }
    });
  };

  return (
    <section
      id="showreel"
      className="relative bg-black text-white py-24 px-4 md:px-12 overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
        >
          Our Showreel
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto"
        >
          Every frame tells a story. Every story defines a brand.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {showreels.map((item, i) => (
          <ReelCard
            key={i}
            data={item}
            index={i}
            active={active}
            setActive={setActive}
            isMobile={isMobile}
            videoRefs={videoRefs}
            pauseOthers={pauseOthers}
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
// ─── CARD COMPONENT (Optimized)
// ─────────────────────────────────────────────
function ReelCard({
  data,
  index,
  active,
  setActive,
  isMobile,
  videoRefs,
  pauseOthers,
}) {
  const videoRef = useRef(null);
  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    videoRefs.current[index] = videoRef.current;
  }, [index, videoRefs]);

  const fadeVolume = (video, from, to, duration) => {
    const step = 50;
    const diff = to - from;
    const steps = duration / step;
    let current = 0;
    const fade = setInterval(() => {
      current++;
      video.volume = from + (diff * current) / steps;
      if (current >= steps) clearInterval(fade);
    }, step);
  };

  const handleEnter = () => {
    const video = videoRef.current;
    if (video) {
      pauseOthers(index);
      video.currentTime = 0;
      video.muted = false;
      fadeVolume(video, 0, 1, 700);
      setHovered(true);
      video.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    const video = videoRef.current;
    if (video) {
      fadeVolume(video, 1, 0, 700);
      setHovered(false);
      video.muted = true;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-700 ease-out ${
        active === index ? "z-20" : ""
      }`}
      onMouseEnter={() => !isMobile && handleEnter()}
      onMouseLeave={() => !isMobile && handleLeave()}
      onClick={() => isMobile && setActive(index)}
      animate={{
        scale: isHovered ? 1.05 : 1,
        zIndex: isHovered ? 10 : 1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={data.video}
        poster={data.poster}
        autoPlay
        loop
        playsInline
        muted
        preload="metadata"
        loading="lazy"
        className="object-cover w-full h-72 md:h-96 brightness-90 transition-all duration-700 group-hover:brightness-100"
      />

      {/* Cyan Glow on Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? "0px 0px 60px 5px rgba(34, 211, 238, 0.25)"
            : "0px 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Overlay Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 rounded-2xl"
      >
        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-gray-400 text-lg md:text-xl font-semibold mb-1 tracking-wide">
          {data.title}
        </h3>
        <p className="text-sm text-gray-300 mt-1 font-light tracking-wide">
          {data.tools}
        </p>
      </motion.div>
    </motion.div>
  );
}

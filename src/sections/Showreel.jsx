import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
    poster: "/thumbnails/olipo.jpg",
  },
  {
    title: "TRULY — 4D Graphic Post + AD",
    tools: "Cinema 4D • Redshift • After Effects",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/110c2cbf42fc32faec789114fdda0196.mp4",
    poster: "/thumbnails/truly.jpg",
  },
  {
    title: "Denver Fragrances — Videography",
    tools: "Sony FX3 • DaVinci Resolve • Lightroom",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/Denver%20Fragrance%20Videography%20adverts%20Final.Cut%289%29~2.mp4",
    poster: "/thumbnails/denver.jpg",
  },
  {
    title: "IMPLORA — Aloe Vera Campaign",
    tools: "Canon R5 • After Effects • Photoshop",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/From%20KlickPin%20CF%20Aloe%20Vera%20The%20Refreshing%20Element.mp4",
    poster: "/thumbnails/implora.jpg",
  },
  {
    title: "CellCosmet — Motion Design",
    tools: "Illustrator • After Effects • Premiere Pro • Cinema 4D",
    video:
      "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/From%20KlickPin%20CF%20Motion%20inspiration%20-%20cellCosmet.mp4",
    poster: "/thumbnails/cellcosmet.jpg",
  },
  {
    title: "URÉE — 3D Motion Ad",
    tools: "Blender • After Effects • Premiere Pro",
    video:
      "https://ia600501.us.archive.org/26/items/ure-e-serums-oils-luxury-graphic-design-motion-graphics-design-cut-8-finalized/UR%C3%88E%20Serums%20%26%20Oils.mp4",
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
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

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
      {/* ─── Cinematic Intro (with Parallax & Same Color Gradient) ─────────────────────────────── */}
      <motion.div
        style={{ y: yParallax }}
        initial={{ opacity: 0, y: 80, scale: 1.05 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, amount: 0.4 }}
        className="relative mb-20"
      >
        <h2 className="text-center text-[3.5rem] md:text-[6rem] font-extrabold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]">
          Stories in Motion
        </h2>
        {/* Preserve your original gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 pointer-events-none" />
      </motion.div>

      {/* ─── Subtitle ─────────────────────────────── */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <p className="text-gray-400 mt-4 text-lg">
          Every frame crafted with intention, emotion, and identity, that makes your content stand-out and make people stop scrolling.
        </p>
      </motion.div>

      {/* ─── Grid (same sizing) ─────────────────────────────── */}
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

      {/* ─── Mobile Modal ─────────────────────────────── */}
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
// ─── CARD COMPONENT (same size as original)
// ─────────────────────────────────────────────
function ReelCard({ data, index, active, setActive, isMobile, videoRefs, pauseOthers }) {
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
      className="relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
      onMouseEnter={() => !isMobile && handleEnter()}
      onMouseLeave={() => !isMobile && handleLeave()}
      onClick={() => isMobile && setActive(index)}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      {/* Video container retains exact sizing */}
      <video
        ref={videoRef}
        src={data.video}
        poster={data.poster}
        loop
        playsInline
        muted
        preload="metadata"
        className="object-cover w-full h-72 md:h-96 brightness-90 transition-all duration-700 group-hover:brightness-110"
      />

      {/* Hover text overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 via-transparent to-transparent"
      >
        <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
          {data.title}
        </h3>
        <p className="text-sm text-gray-300 mt-1">{data.tools}</p>
      </motion.div>

      {/* Light sweep effect */}
      <motion.div
        className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={isHovered ? { left: ["-100%", "100%"] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}

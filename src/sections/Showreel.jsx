import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const reels = [
  {
    title: "Olipo Drink — 3D Motion Ad",
    tools: "Blender • After Effects • Premiere Pro",
    src: "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/Motion%203D%20Refreshingly%20Citrus%20Olipo%20Drink%20Final.Cut%286%29.mp4",
    thumb: "/thumbnails/olipo.jpg",
  },
  {
    title: "Truly Drinks — Motion Design",
    tools: "Cinema 4D • Redshift • After Effects",
    src: "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/110c2cbf42fc32faec789114fdda0196.mp4",
    thumb: "/thumbnails/truly.jpg",
  },
  {
    title: "Denver Fragrance Videography",
    tools: "Sony FX3 • DaVinci Resolve • Lightroom",
    src: "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/Denver%20Fragrance%20Videography%20adverts%20Final.Cut%289%29~2.mp4",
    thumb: "/thumbnails/denver.jpg",
  },
  {
    title: "Aloe Vera — The Refreshing Element",
    tools: "Cinema 4D • Redshift • Premiere Pro",
    src: "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/From%20KlickPin%20CF%20Aloe%20Vera%20The%20Refreshing%20Element.mp4",
    thumb: "/thumbnails/aloe.jpg",
  },
  {
    title: "CellCosmet — Motion Inspiration",
    tools: "Cinema 4D • After Effects • Resolve",
    src: "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/From%20KlickPin%20CF%20Motion%20inspiration%20-%20cellCosmet%20%5BVideo%5D%20en%202025%20_%20Anuncios%20creativos%20Disenos%20de%20unas%20Fondos%20para%20fotografia.mp4",
    thumb: "/thumbnails/cellcosmet.jpg",
  },
  {
    title: "Aurora — Conceptual Product Ad",
    tools: "Blender • Octane • Premiere Pro",
    src: "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/Motion%203D%20Refreshingly%20Citrus%20Olipo%20Drink%20Final.Cut%286%29.mp4",
    thumb: "/thumbnails/aurora.jpg",
  },
];

export default function Showreel() {
  return (
    <section
      id="showreel"
      className="relative bg-black text-white py-32 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reels.map((reel, i) => (
          <ReelCard key={i} {...reel} />
        ))}
      </div>
    </section>
  );
}

function ReelCard({ title, tools, src, thumb }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  // Handle video sound fade and playback
  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (video) {
      setHovered(true);
      video.muted = false;
      fadeVolume(video, 0, 1, 600);
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (video) {
      fadeVolume(video, 1, 0, 800);
      setHovered(false);
      video.muted = true;
      // Let it continue playing silently
    }
  };

  const fadeVolume = (video, from, to, duration) => {
    const step = 50;
    const volumeDiff = to - from;
    const steps = duration / step;
    let currentStep = 0;
    video.volume = from;
    const fade = setInterval(() => {
      currentStep++;
      video.volume = from + (volumeDiff * currentStep) / steps;
      if (currentStep >= steps) clearInterval(fade);
    }, step);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`relative rounded-3xl overflow-hidden group cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        hovered ? "scale-[1.05] shadow-[0_0_40px_rgba(255,255,255,0.1)]" : "scale-100"
      }`}
      style={{ aspectRatio: "16/9", background: "#0a0a0a" }}
    >
      {/* Gleam light sweep effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={false}
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
      >
        <motion.div
          className="absolute top-0 left-[-75%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-[20deg]"
          animate={
            hovered
              ? { left: ["-75%", "125%"], transition: { duration: 1.5, ease: "easeInOut" } }
              : { left: "-75%" }
          }
        />
      </motion.div>

      {/* Video / Thumbnail */}
      <video
        ref={videoRef}
        src={src}
        poster={thumb}
        playsInline
        muted
        preload="metadata"
        className="w-full h-full object-cover transition-all duration-700"
        style={{ filter: hovered ? "brightness(1)" : "brightness(0.8)" }}
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 flex flex-col justify-end p-6">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{tools}</p>
      </div>
    </motion.div>
  );
}

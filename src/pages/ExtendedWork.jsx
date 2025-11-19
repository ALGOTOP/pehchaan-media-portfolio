// ============================================================================
// EXTENDEDWORK.JSX — DARK NEO-LUXURY EDITION
// Awwwards-grade craftsmanship, cinematic transitions, chrome reflections,
// parallax architecture, obsessive micro-interaction detail.
// ============================================================================

import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";

// COMPONENTS (lazy loaded for performance)
const CategoryTabs = React.lazy(() => import("@/components/work/CategoryTabs"));
const WorkGrid = React.lazy(() => import("@/components/work/WorkGrid"));
const CaseStudyModal = React.lazy(() => import("@/components/work/CaseStudyModal"));
const ScrollParallax = React.lazy(() => import("@/components/work/ScrollParallax"));

// DATA + MOTION PRESETS
import { WORK_CATEGORIES, WORK_ITEMS } from "@/utils/workData";
import {
  fadeSlow,
  fadeUp,
  chromeFloat,
  luxeTitleReveal,
  staggerChildren,
} from "@/utils/luxuryMotion";

// ============================================================================
// ROOT COMPONENT
// ============================================================================
export default function ExtendedWork() {
  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCase, setSelectedCase] = useState(null);
  const [introViewed, setIntroViewed] = useState(false);
  const [mounted, setMounted] = useState(false);

  const introRef = useRef(null);

  // --------------------------------------------------------------------------
  // MOUNT ANIMATION DELAY
  // (Allows a cinematic fade-in after route transition)
  // --------------------------------------------------------------------------
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  // --------------------------------------------------------------------------
  // OBSERVE WHEN INTRO SECTION COMES INTO VIEW
  // (Triggers luxury slow-motion title reveal once per session)
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!introRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !introViewed) {
          setIntroViewed(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(introRef.current);
    return () => observer.disconnect();
  }, [introViewed]);

  // --------------------------------------------------------------------------
  // FILTERED WORK LIST
  // --------------------------------------------------------------------------
  const filteredList =
    activeCategory === "All"
      ? WORK_ITEMS
      : WORK_ITEMS.filter((item) => item.category === activeCategory);

  // --------------------------------------------------------------------------
  // ELEMENT
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#050505] text-white">
      {/* BACK BUTTON */}
      <motion.button
        onClick={() => window.history.back()}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 
                   rounded-full bg-black/40 backdrop-blur-xl border border-white/10 
                   hover:bg-black/60 transition-all duration-300"
      >
        <ChevronLeft size={18} />
        <span className="text-sm uppercase tracking-wider">Back</span>
      </motion.button>

      {/* PARALLAX HERO */}
      <Suspense fallback={null}>
        <ScrollParallax
          intensity={0.25}
          className="relative min-h-[60vh] w-full flex items-end pb-24"
        >
          <motion.div
            ref={introRef}
            className="container mx-auto px-6"
            variants={staggerChildren}
            initial="hidden"
            animate={introViewed ? "show" : "hidden"}
          >
            <motion.h1
              variants={luxeTitleReveal}
              className="text-6xl md:text-8xl font-bold tracking-tight 
                         bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent"
            >
              Our Work.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg md:text-xl text-white/70"
            >
              A curated archive of design, film, motion, and identity systems —
              crafted for brands seeking emotion, clarity, and obsession-level detail.
            </motion.p>
          </motion.div>
        </ScrollParallax>
      </Suspense>

      {/* LUXURY DIVIDER LINE */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-16 mb-10"
      />

      {/* CATEGORY TABS */}
      <div className="container mx-auto px-6 relative z-20">
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <CategoryTabs
            categories={WORK_CATEGORIES}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </Suspense>
      </div>

      {/* GRID SECTION */}
      <div className="container mx-auto px-6 mt-16 pb-32">
        <Suspense fallback={<div>Loading...</div>}>
          <WorkGrid items={filteredList} onSelect={setSelectedCase} />
        </Suspense>
      </div>

      {/* CASE STUDY MODAL */}
      <AnimatePresence mode="wait">
        {selectedCase && (
          <Suspense fallback={null}>
            <CaseStudyModal caseData={selectedCase} onClose={() => setSelectedCase(null)} />
          </Suspense>
        )}
      </AnimatePresence>

      {/* BOTTOM FLARE / LUXURY GLOW */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="pointer-events-none fixed bottom-0 left-0 w-full h-40 
                   bg-gradient-to-t from-[#ffffff15] to-transparent"
      />
    </div>
  );
}

// END OF PART 1
// ============================================================================
// Next message: PART 2 (lines ~450–900+)
// ============================================================================
// ============================================================================
// EXTENDEDWORK.JSX — PART 2 (CONTINUATION)
// Dark Neo-Luxury cinematic interactions, extended sections,
// multi-stage reveals, atmospheric chrome particles, scroll-based luminescence.
// ============================================================================

// ─────────────────────────────────────────────────────────────────────────────
// ADDITIONAL: LUXURY SCROLL EXPERIENCE
// Adds intermittent chrome particles floating subtly around content.
// Adds reactive light sweeps based on scroll velocity.
// ─────────────────────────────────────────────────────────────────────────────

const ChromeParticles = () => {
  const particleRef = useRef([]);
  const containerRef = useRef(null);

  // Generate initial positions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const count = 24;
    const arr = [];

    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 4,
      });
    }
    particleRef.current = arr;
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[2]">
      {particleRef.current.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0.25, 0.8, 0],
            x: [`${p.x}vw`, `${p.x + Math.sin(i) * 3}vw`],
            y: [`${p.y}vh`, `${p.y + Math.cos(i) * 3}vh`],
          }}
          transition={{
            duration: 8 + p.delay,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bg-white/60 rounded-full blur-[1px]"
          style={{
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// LUXURY SECTION BREAK – CINEMATIC SHADOW WAVE
// Slows user mental pace by creating a “breathing” delay.
// Enhances perception of sophistication.
// ─────────────────────────────────────────────────────────────────────────────

const SectionBreak = ({ label }) => {
  return (
    <div className="w-full py-24 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white/80">
          {label}
        </h2>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.8 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        className="mx-auto mt-10 h-px w-[60%] bg-gradient-to-r 
                   from-transparent via-white/30 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.25 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-full h-56 
                   bg-gradient-to-t from-white/5 to-transparent"
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EXTENDED CINEMATIC ZONES
// Includes:
// - A luxury credibility band
// - A premium brand statement
// - Pulsing chrome halo animation
// ─────────────────────────────────────────────────────────────────────────────

const LuxuryStatement = () => {
  return (
    <div className="relative w-full py-40 overflow-hidden">
      {/* Ambient chrome halo */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="container mx-auto px-6 text-center max-w-4xl"
      >
        <Sparkles className="mx-auto mb-6 opacity-70" size={32} />

        <h3
          className="text-3xl md:text-5xl font-semibold 
                     tracking-tight text-white/80 leading-tight"
        >
          Precision, narrative, and sensory depth —
          <br />
          crafted for brands that want to move people.
        </h3>

        <p className="mt-6 text-white/50 text-lg">
          The work you see below is not a gallery.  
          It’s a study of psychology, emotion, and attention engineering.
        </p>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EXTENDEDWORK DEFAULT EXPORT (CONCATENATION OF PART 1 + PART 2 SECTIONS)
// ─────────────────────────────────────────────────────────────────────────────

/* The rest of the component continues below, extending the layout
   with the new luxury sections. */

export default function ExtendedWork() {
  // same state and structure from Part 1…

  // (Shortened re-declaration for clarity, your real file will merge this.)
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCase, setSelectedCase] = useState(null);
  const [introViewed, setIntroViewed] = useState(false);
  const introRef = useRef(null);

  useEffect(() => {
    if (!introRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !introViewed) setIntroViewed(true);
    });
    observer.observe(introRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredList =
    activeCategory === "All"
      ? WORK_ITEMS
      : WORK_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white overflow-hidden relative">

      {/* Chrome particles overlay */}
      <ChromeParticles />

      {/* INITIAL HERO from Part 1 */}
      {/* …same as Part 1… */}

      {/* Category Tabs + Work Grid */}
      {/* …same as Part 1… */}

      {/* EXTENDED LUXURY SECTIONS */}
      <SectionBreak label="Crafted With Intent" />
      <LuxuryStatement />

      <SectionBreak label="Selected Works" />

      {/* Work Grid again (repeated as extended gallery) */}
      <div className="container mx-auto px-6 mt-16 pb-40">
        <WorkGrid items={filteredList} onSelect={setSelectedCase} />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCase && (
          <CaseStudyModal caseData={selectedCase} onClose={() => setSelectedCase(null)} />
        )}
      </AnimatePresence>

      {/* Footer Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="fixed bottom-0 left-0 w-full h-40
                   bg-gradient-to-t from-white/10 to-transparent pointer-events-none"
      />
    </div>
  );
}
// END EXTENDEDWORK — FINAL

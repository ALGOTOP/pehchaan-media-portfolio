// src/pages/ExtendedWork.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom"; // keep if your router is react-router
import { motion } from "framer-motion";
import WORK_CATEGORIES from "../data/workData";
import { heroContainer, thumbReveal, staggerContainer } from "../utils/workAnimations";

/**
 * ExtendedWork (redesigned)
 * - Uses Pehchaan Media brand accents (teal / coral) via utility classes.
 * - Category cards are larger, image-first, minimal text.
 *
 * NOTE: Adjust font-family in your global CSS: use 'Montserrat' for headings; 'Inter' for body.
 */

const slugify = (str) =>
  String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function ExtendedWork() {
  const [hovered, setHovered] = useState(null);

  const categoryCards = useMemo(
    () =>
      WORK_CATEGORIES.map((c) => ({
        ...c,
        slug: c.slug || slugify(c.title),
      })),
    []
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[14%] left-[6%] w-[480px] h-[480px] bg-[rgba(0,91,91,0.12)] blur-[140px]" />
        <div className="absolute bottom-[8%] right-[6%] w-[380px] h-[380px] bg-[rgba(255,111,97,0.06)] blur-[140px]" />
      </div>

      {/* Hero */}
      <motion.header variants={heroContainer} initial="initial" animate="animate" className="max-w-6xl mx-auto px-6 pt-20 pb-8">
        <div className="max-w-3xl">
          <h1 className="font-[Montserrat] text-5xl md:text-6xl leading-tight tracking-tight">
            Explore Our Capabilities
          </h1>
          <p className="mt-4 text-white/70 text-base md:text-lg">
            We are a full-service creative agency — storytelling through motion, design, photography and strategy. Click any capability to explore 15 curated samples.
          </p>
        </div>
      </motion.header>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <motion.div variants={staggerContainer(0.06)} initial="initial" animate="animate" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categoryCards.map((cat, idx) => {
            const hero = cat.hero || (cat.media && cat.media[0] && cat.media[0].poster) || (cat.media && cat.media[0] && cat.media[0].src);
            return (
              <motion.div
                key={cat.slug}
                variants={thumbReveal}
                custom={idx}
                onMouseEnter={() => setHovered(cat.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  to={`/work/${cat.slug}`}
                  className={`group block rounded-2xl overflow-hidden border border-white/6 transition-shadow transform-gpu hover:scale-[1.01]`}
                  aria-label={`Open ${cat.title}`}
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-900">
                    {hero ? (
                      <img
                        src={hero}
                        alt={cat.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ minHeight: 260 }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/40">No preview</div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                    {/* Text area - smaller footprint */}
                    <div className="absolute left-6 bottom-6 right-6">
                      <div className="text-xs uppercase text-white/50 tracking-[0.18em]">Capability</div>
                      <h3 className="mt-1 text-2xl font-semibold font-[Montserrat] leading-snug">{cat.title}</h3>
                      <p className="mt-2 text-sm text-white/60 max-w-[85%]">{cat.description}</p>
                    </div>

                    {/* subtle accent / badge */}
                    <div
                      className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium ${
                        hovered === cat.slug ? "bg-[#FF6F61] text-white" : "bg-white/8 text-white/80"
                      }`}
                    >
                      {cat.media?.length ?? 0} samples
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* spacing */}
        <div className="h-20" />
      </section>
    </main>
  );
}

// src/pages/ExtendedWork.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import WORK_CATEGORIES from "../data/workData";
import {
  heroContainer,
  thumbReveal,
  staggerContainer,
} from "../utils/workAnimations";

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
    <main className="min-h-screen bg-[#020713] text-white relative overflow-hidden">
      {/* Gradient background similar to home hero */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#0b95ff1f,_transparent_55%),radial-gradient(circle_at_bottom,_#0ae2ff10,_transparent_55%)]" />
      </div>

      {/* Content wrapper so navbar/footer still work */}
      <div className="relative z-10">
        {/* Hero */}
        <motion.header
          variants={heroContainer}
          initial="initial"
          animate="animate"
          className="max-w-6xl mx-auto px-6 pt-24 pb-10 text-center md:text-left"
        >
          <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-cyan-300/70">
            Our Capabilities
          </p>

          <h1 className="mt-3 font-semibold text-4xl md:text-5xl lg:text-[3.4rem] leading-tight tracking-tight text-[#48b4ff]">
            Extended Work Portfolio
          </h1>

          <p className="mt-4 text-sm md:text-base text-white/75 max-w-2xl md:max-w-3xl">
            From brand launches and social content to motion and product
            visuals, these categories showcase how we make brands{" "}
            <span className="font-semibold text-white">
              unforgettable across formats.
            </span>
          </p>
        </motion.header>

        {/* Grid of categories – styled like “Our Work” cards */}
        <section className="max-w-7xl mx-auto px-6 pb-28">
          <motion.div
            variants={staggerContainer(0.06)}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categoryCards.map((cat, idx) => {
              const hero =
                cat.hero ||
                (cat.media && cat.media[0] && cat.media[0].poster) ||
                (cat.media && cat.media[0] && cat.media[0].src);

              return (
                <motion.div
                  key={cat.slug}
                  variants={thumbReveal}
                  custom={idx}
                  onMouseEnter={() => setHovered(cat.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className="flex"
                >
                  <Link
                    to={`/work/${cat.slug}`}
                    className="group block w-full rounded-[26px] overflow-hidden bg-[#05070b] border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.55)] hover:shadow-[0_0_35px_rgba(0,193,255,0.45)] transition-all duration-300 transform-gpu hover:-translate-y-1"
                    aria-label={`Open ${cat.title}`}
                  >
                    {/* Media section */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
                      {hero ? (
                        <img
                          src={hero}
                          alt={cat.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">
                          No preview available
                        </div>
                      )}

                      {/* Soft overlay at bottom, similar to portfolio cards */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Text block styled like “Our Work” */}
                    <div className="px-5 pb-5 pt-4 flex flex-col gap-1.5">
                      {/* Top meta row: category label / tag */}
                      <div className="flex items-center justify-between text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/55">
                        <span>Category</span>
                        <span
                          className={`px-2 py-1 rounded-full border border-white/10 bg-white/5 ${
                            hovered === cat.slug
                              ? "shadow-[0_0_15px_rgba(0,193,255,0.75)]"
                              : "shadow-[0_0_0_rgba(0,0,0,0)]"
                          }`}
                        >
                          {cat.media?.length ?? 0} Samples
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-1 text-lg md:text-xl font-semibold tracking-tight text-white">
                        {cat.title}
                      </h3>

                      {/* Subtext / description */}
                      {cat.description && (
                        <p className="text-xs md:text-sm text-white/60 leading-relaxed">
                          {cat.description}
                        </p>
                      )}

                      {/* Optional mini CTA aligned with rest of typography */}
                      <div className="mt-3 flex items-center text-xs font-medium text-cyan-300 group-hover:text-cyan-200">
                        <span>View curated projects</span>
                        <span className="ml-1.5 translate-x-0 group-hover:translate-x-0.5 transition-transform">
                          ⟶
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* bottom spacing */}
          <div className="h-16" />
        </section>
      </div>
    </main>
  );
}

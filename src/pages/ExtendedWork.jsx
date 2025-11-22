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
      {/* Gradient background similar to home but a bit subtler */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#0b95ff22,_transparent_55%),radial-gradient(circle_at_bottom,_#00e0ff14,_transparent_52%)]" />
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <motion.header
          variants={heroContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto px-6 pt-28 pb-12 text-center"
        >
          <h1 className="font-semibold md:font-bold text-[2.5rem] md:text-[3rem] lg:text-[3.3rem] leading-tight tracking-tight text-[#48b4ff]">
            OUR WORK AS A FULL-SERVICE AGENCY
          </h1>

          <p className="mt-4 text-sm md:text-base text-white/75 max-w-2xl mx-auto">
            From brand launches and social content to motion and product
            visuals, these categories showcase how we make brands{" "}
            <span className="font-semibold text-white">unforgettable</span>{" "}
            across formats.
          </p>
        </motion.header>

        {/* GRID */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
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

              const sampleCount = cat.media?.length ?? 0;

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
                    className="group block w-full rounded-[28px] overflow-hidden bg-[#04060d] border border-white/6 shadow-[0_18px_45px_rgba(0,0,0,0.75)] hover:shadow-[0_22px_55px_rgba(0,193,255,0.45)] transition-all duration-300 transform-gpu hover:-translate-y-[4px]"
                    aria-label={`Open ${cat.title}`}
                  >
                    {/* 
                      Taller container to match previous version:
                      aspect-[4/3] instead of [16/10]
                    */}
                    <div className="relative w-full aspect-[4/3] bg-black overflow-hidden">
                      {/* IMAGE */}
                      {hero ? (
                        <img
                          src={hero}
                          alt={cat.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/35 text-sm">
                          Preview coming soon
                        </div>
                      )}

                      {/* Overlays to keep text on top of image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/45 to-transparent pointer-events-none" />

                      {/* Hover glow ring */}
                      <div
                        className={`absolute inset-0 rounded-[28px] pointer-events-none transition-opacity duration-300 ${
                          hovered === cat.slug
                            ? "opacity-100 shadow-[0_0_0_1px_rgba(0,193,255,0.9),0_0_35px_rgba(0,193,255,0.55)]"
                            : "opacity-0"
                        }`}
                      />

                      {/* TEXT OVER IMAGE */}
                      <div className="absolute left-5 right-5 bottom-5 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-base md:text-lg font-semibold tracking-tight text-white">
                            {cat.title}
                          </h3>

                          {sampleCount > 0 && (
                            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-[2px]">
                              {sampleCount} samples
                            </span>
                          )}
                        </div>

                        {cat.description && (
                          <p className="text-[0.72rem] md:text-xs text-white/65 leading-relaxed max-w-[90%]">
                            {cat.description}
                          </p>
                        )}

                        <button
                          type="button"
                          className="mt-2 self-start text-[0.72rem] md:text-xs font-medium text-cyan-300 group-hover:text-cyan-200 inline-flex items-center gap-1"
                        >
                          <span>View curated projects</span>
                          <span className="translate-x-0 group-hover:translate-x-0.5 transition-transform">
                            ⟶
                          </span>
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA PILL BELOW GRID */}
          <div className="mt-16 flex justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm md:text-base font-semibold bg-gradient-to-r from-[#1dd1ff] to-[#4c8dff] text-black shadow-[0_12px_32px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_40px_rgba(0,193,255,0.6)] transition-all duration-300 hover:-translate-y-[2px]"
            >
              Book a Free Session
            </a>
          </div>

          <div className="h-20" />
        </section>
      </div>
    </main>
  );
}

// src/pages/ExtendedWork.jsx

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import WorkHeroNew from "@/components/work/WorkHeroNew";
import { CATEGORIES, CATEGORY_HERO } from "@/data/workData";
import { heroContainer, thumbReveal } from "@/utils/workAnimations";

// Helper
const slugify = (str) =>
  String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function ExtendedWork() {
  const categoryCards = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        name: cat,
        slug: slugify(cat),
        image: CATEGORY_HERO[cat],
      })),
    []
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden">

      {/* ─────────────────────────────────────────────
          Floating Ambient Light Glow
      ───────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] left-[10%] w-[420px] h-[420px] bg-cyan-500/10 blur-[160px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[360px] h-[360px] bg-purple-500/10 blur-[160px]" />
      </div>

      {/* ─────────────────────────────────────────────
          Hero Shared Component
      ───────────────────────────────────────────── */}
      <WorkHeroNew />

      {/* ─────────────────────────────────────────────
          Main Section
      ───────────────────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-32">

        {/* Section intro */}
        <motion.div
          variants={heroContainer}
          initial="initial"
          animate="animate"
          className="mb-14"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Explore Our Full Capability Spectrum
            </h2>
            <p className="text-white/60 mt-3 text-sm md:text-base leading-relaxed">
              Every category opens into a dedicated, uniquely crafted page
              showcasing real work samples, motion previews, case assets,
              and content tailored to that capability.
            </p>
          </div>

          {/* subtle divider */}
          <div className="h-[1px] w-full bg-white/10 mt-10" />
        </motion.div>

        {/* ─────────────────────────────────────────────
            Grid of Category Cards (3 per row)
        ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">

          {categoryCards.map((cat, index) => (
            <motion.div
              key={cat.slug}
              variants={thumbReveal}
              initial="initial"
              animate="animate"
              custom={index}
            >
              <Link
                to={`/work/${cat.slug}`}
                className="group block h-full rounded-3xl overflow-hidden border border-white/10 
                           bg-[#080808] shadow-[0_0_60px_-25px_rgba(255,255,255,0.3)]
                           hover:shadow-[0_0_80px_-20px_rgba(0,255,255,0.25)]
                           transition-all duration-500"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden">

                  {/* Image */}
                  {cat.image && (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-80 
                                 group-hover:opacity-100 group-hover:scale-[1.06]
                                 transition-all duration-[900ms] ease-[cubic-bezier(.23,.96,.52,.99)]"
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Text */}
                  <div className="absolute left-6 bottom-6 flex flex-col">
                    <span className="text-xs uppercase tracking-[0.22em] text-white/50">
                      Capability
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight leading-snug mt-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs mt-1 text-white/70 max-w-[80%]">
                      Open category to view detailed samples and case outputs.
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

        </div>

        {/* Bottom spacing */}
        <div className="h-16" />
      </section>
    </main>
  );
}

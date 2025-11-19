// src/pages/ExtendedWork.jsx

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import WorkHeroNew from "@/components/work/WorkHeroNew";
import { CATEGORIES, CATEGORY_HERO } from "@/data/workData";
import { heroContainer, thumbReveal } from "@/utils/workAnimations";

// simple slug helper (matches what we use in data)
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
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Reuse the same hero */}
      <WorkHeroNew />

      <section className="max-w-7xl mx-auto px-6 pt-10 pb-24">
        {/* Header line */}
        <motion.header
          variants={heroContainer}
          initial="initial"
          animate="animate"
          className="mb-10"
        >
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Explore by capability
          </h2>
          <p className="text-sm text-white/60 mt-2 max-w-xl">
            Choose a category to view detailed work for that specific capability.
          </p>
        </motion.header>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
                className="group block h-full rounded-3xl overflow-hidden border border-white/10 bg-[#070707] shadow-[0_0_50px_-20px_rgba(255,255,255,0.25)]"
              >
                <div className="relative w-full aspect-[4/3] md:aspect-[4/3] overflow-hidden">
                  {/* Background image */}
                  {cat.image && (
                    <img
                      src={cat.image}
                      alt={`${cat.name} preview`}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-500"
                      loading="lazy"
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

                  {/* Text overlay (top-left-ish) */}
                  <div className="absolute inset-x-5 bottom-5 flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.22em] text-white/60">
                      Category
                    </span>
                    <h3 className="text-lg md:text-xl font-semibold leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-xs md:text-sm text-white/70 max-w-xs">
                      View detailed work created under this capability.
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

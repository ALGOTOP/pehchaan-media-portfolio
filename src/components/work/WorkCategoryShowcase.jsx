// src/components/work/WorkCategoryShowcase.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CATEGORY_HERO, WORK_CATEGORIES, WORK_BY_CATEGORY } from "@/data/workData";
import { pillVariant } from "@/utils/workAnimations";
import PropTypes from "prop-types";

const cn = (...xs) => xs.filter(Boolean).join(" ");

export default function WorkCategoryShowcase({ onSelectCategory }) {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-10 pb-6" aria-label="Work categories">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Explore by category</h2>
          <p className="text-sm text-white/60 mt-1">Pick a category to see a curated grid of 15–20 samples.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {WORK_CATEGORIES.map((category, idx) => {
          const slug = category.toLowerCase().replace(/\s+/g, "-");
          const count = WORK_BY_CATEGORY[category]?.length ?? 0;

          return (
            <motion.div
              key={category}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.42, delay: idx * 0.04 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/4 backdrop-blur-xl cursor-pointer"
              onClick={() => onSelectCategory?.(category)}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={CATEGORY_HERO[category]}
                  alt={`${category} cover`}
                  className="w-full h-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>

              <div className="relative z-10 px-4 pt-3 pb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm md:text-base font-semibold">{category}</h3>
                  <p className="text-[11px] text-white/60 mt-1">{count ? `${count} curated samples` : "Curated category"}</p>
                </div>

                <motion.div variants={pillVariant} initial="initial" animate="animate" whileTap="tap" className="shrink-0">
                  <Link
                    to={`/work/category/${slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/90",
                      "group-hover:bg-cyan-500/90 group-hover:border-cyan-300/60 group-hover:text-black transition-colors"
                    )}
                  >
                    <span>View</span>
                    <span className="text-[13px] translate-y-[0.5px]">↗</span>
                  </Link>
                </motion.div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-cyan-400/0 group-hover:border-cyan-300/60 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.22)] transition-all duration-400" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

WorkCategoryShowcase.propTypes = {
  onSelectCategory: PropTypes.func,
};

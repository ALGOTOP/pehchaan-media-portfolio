// src/components/work/WorkFilterBarNew.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { pillVariant } from "@/utils/workAnimations";
import PropTypes from "prop-types";

export default function WorkFilterBarNew({
  categories = [],
  tags = [],
  activeCategory = "All",
  onCategoryChange = () => {},
  activeTags = [],
  onTagToggle = () => {},
  searchQuery = "",
  onSearchChange = () => {},
  sortOption = "newest",
  onSortChange = () => {},
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div className="relative z-20 w-full px-6 md:px-12 lg:px-20 py-8 bg-[#050505]/60 backdrop-blur-xl border-b border-white/10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-[45%]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300/70">🔎</span>
          <input
            type="text"
            placeholder="Search visual work..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0a0a0a] text-gray-200 placeholder-gray-500 border border-white/8 focus:border-white/20 focus:outline-none transition"
          />
        </div>

        {/* Sort + Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select value={sortOption} onChange={(e) => onSortChange(e.target.value)} className="px-4 py-3 rounded-xl bg-[#0a0a0a] text-gray-200 border border-white/10">
            <option value="year-desc">Newest First</option>
            <option value="year-asc">Oldest First</option>
            <option value="alpha-asc">A → Z</option>
            <option value="alpha-desc">Z → A</option>
          </select>

          <button onClick={() => setExpanded((s) => !s)} className="px-4 py-3 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10">
            Filters
          </button>
        </div>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={() => onCategoryChange("All")}
          className={`px-4 py-2 rounded-full text-sm font-medium border ${activeCategory === "All" ? "bg-cyan-400/20 border-cyan-300 text-cyan-200" : "bg-white/5 border-white/10 text-slate-200/80"}`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${activeCategory === cat ? "bg-cyan-400/20 border-cyan-300 text-cyan-200" : "bg-white/5 border-white/10 text-slate-200/80"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Expandable tags */}
      <motion.div initial={{ height: 0, opacity: 0 }} animate={expanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden mt-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const active = activeTags.includes(tag);
            return (
              <motion.button
                key={tag}
                onClick={() => onTagToggle(tag)}
                variants={pillVariant}
                initial="initial"
                animate="animate"
                whileTap="tap"
                className={`px-3 py-1.5 rounded-full text-sm border ${active ? "bg-white/10 border-white/20 text-white" : "bg-black/20 border-white/10 text-gray-300"}`}
              >
                #{tag}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

WorkFilterBarNew.propTypes = {
  categories: PropTypes.array,
  tags: PropTypes.array,
  activeCategory: PropTypes.string,
  onCategoryChange: PropTypes.func,
  activeTags: PropTypes.array,
  onTagToggle: PropTypes.func,
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func,
  sortOption: PropTypes.string,
  onSortChange: PropTypes.func,
};

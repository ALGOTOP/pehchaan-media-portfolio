// src/components/work/WorkFilterBarNew.jsx
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  filterBarParent,
  filterBarInput,
  filterChipParent,
  filterChipChild,
} from "@/utils/workAnimations";
import PropTypes from "prop-types";

const cn = (...xs) => xs.filter(Boolean).join(" ");

// -----------------------------------------------------------------------------
// MAIN FILTER BAR
// -----------------------------------------------------------------------------

export default function WorkFilterBarNew({
  categories,
  activeCategory,
  onCategoryChange,
  availableTags,
  activeTags,
  onTagToggle,
  searchQuery,
  onSearchChange,
  sortMode,
  onSortChange,
  categoryPreviews = {},
}) {
  const [showTagFilters, setShowTagFilters] = useState(false);

  const sortedCategories = useMemo(
    () => categories || [],
    [categories]
  );

  return (
    <motion.section
      variants={filterBarParent}
      initial="initial"
      animate="animate"
      className="relative z-20 max-w-7xl mx-auto px-6 -mt-16 mb-14"
      aria-label="Work filters"
    >
      <div
        className={cn(
          "w-full backdrop-blur-2xl bg-black/50",
          "border border-white/10 rounded-3xl",
          "px-5 sm:px-7 md:px-9 py-6 md:py-7",
          "shadow-[0_0_80px_-10px_rgba(15,15,30,0.8)]"
        )}
      >
        {/* TOP ROW — SEARCH + SORT + TAG TOGGLE */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 mb-5">
          {/* Search */}
          <motion.div
            variants={filterBarInput}
            className="relative w-full md:flex-1"
          >
            <input
              type="text"
              placeholder="Search visual work by title, client, tag..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={cn(
                "w-full px-4 md:px-5 py-2.5 md:py-3 rounded-xl",
                "bg-[#050505] text-gray-100 placeholder-gray-500",
                "outline-none border border-white/10",
                "focus:border-white/30 focus:ring-1 focus:ring-white/20",
                "transition-all text-sm md:text-base"
              )}
            />
          </motion.div>

          {/* Sort Dropdown */}
          <motion.div
            variants={filterBarInput}
            className="flex items-center gap-2 md:w-64"
          >
            <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40 hidden md:block">
              Sort
            </label>
            <select
              value={sortMode}
              onChange={(e) => onSortChange(e.target.value)}
              className={cn(
                "w-full bg-[#050505] border border-white/10 text-gray-100",
                "px-4 py-2.5 rounded-xl text-sm",
                "focus:outline-none focus:ring-1 focus:ring-white/30",
                "backdrop-blur-xl transition-all"
              )}
            >
              <option value="featured">Featured (Popularity)</option>
              <option value="recent">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alpha">A → Z</option>
            </select>
          </motion.div>

          {/* Toggle Tag Filters */}
          <motion.button
            variants={filterBarInput}
            type="button"
            onClick={() => setShowTagFilters((prev) => !prev)}
            className={cn(
              "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl",
              "bg-white/5 text-white border border-white/15",
              "hover:bg-white/10 hover:border-white/30",
              "text-xs font-medium tracking-[0.14em] uppercase"
            )}
          >
            {showTagFilters ? "Hide Tags" : "Filter by Tags"}
          </motion.button>
        </div>

        {/* CATEGORY CHIPS — DESKTOP */}
        <motion.div
          variants={filterChipParent}
          className="hidden md:flex flex-wrap gap-2.5 mb-1"
        >
          {sortedCategories.map((cat) => {
            const isActive = activeCategory === cat;

            return (
              <motion.button
                key={cat}
                variants={filterChipChild}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition-all",
                  isActive
                    ? "bg-white text-black border-white shadow-lg shadow-white/20"
                    : "bg-white/5 text-gray-200 border-white/12 hover:bg-white/10 hover:text-white"
                )}
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* MOBILE CATEGORY CARDS */}
        <CategoryCardsMobile
          categories={sortedCategories}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
          categoryPreviews={categoryPreviews}
        />

        {/* TAG FILTERS (EXPANDABLE AREA) */}
        <motion.div
          initial={false}
          animate={showTagFilters ? "open" : "collapsed"}
          variants={{
            open: { height: "auto", opacity: 1, marginTop: 14 },
            collapsed: { height: 0, opacity: 0, marginTop: 0 },
          }}
          className="overflow-hidden"
        >
          <TagSelector
            availableTags={availableTags}
            activeTags={activeTags}
            onTagToggle={onTagToggle}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

WorkFilterBarNew.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  availableTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTagToggle: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortMode: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  categoryPreviews: PropTypes.object,
};

// -----------------------------------------------------------------------------
// TAG SELECTOR
// -----------------------------------------------------------------------------

function TagSelector({ availableTags, activeTags, onTagToggle }) {
  if (!availableTags.length) return null;

  return (
    <div className="pt-3 border-t border-white/8 mt-2">
      <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
        Active tags
      </div>
      <div className="flex flex-wrap gap-2.5">
        {availableTags.map((tag) => {
          const isActive = activeTags.includes(tag);

          return (
            <button
              key={tag}
              type="button"
              onClick={() => onTagToggle(tag)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                "backdrop-blur-md border",
                isActive
                  ? "bg-white text-black border-white shadow-lg shadow-white/10 scale-[1.02]"
                  : "bg-black/40 border-white/12 text-gray-300 hover:bg-white/10 hover:text-white"
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

TagSelector.propTypes = {
  availableTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTagToggle: PropTypes.func.isRequired,
};

// -----------------------------------------------------------------------------
// MOBILE CATEGORY CARDS
// -----------------------------------------------------------------------------

function CategoryCardsMobile({
  categories,
  activeCategory,
  onCategoryChange,
  categoryPreviews,
}) {
  if (!categories?.length) return null;

  return (
    <div className="md:hidden mt-4 space-y-3">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        const img = categoryPreviews[cat];

        return (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            className={cn(
              "w-full flex items-center gap-3 rounded-2xl overflow-hidden",
              "border transition-all duration-300 backdrop-blur-xl",
              isActive
                ? "border-white/25 bg-white/10 shadow-lg shadow-white/15 scale-[1.01]"
                : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
            )}
          >
            <div className="relative w-20 h-16 overflow-hidden rounded-xl flex-shrink-0 bg-black/40">
              {img ? (
                <img
                  src={img}
                  alt={`${cat} category preview`}
                  className="w-full h-full object-cover opacity-90"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-white/40">
                  {cat}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-xs uppercase tracking-[0.18em] text-white/40 mb-0.5">
                Category
              </div>
              <div className="text-sm font-medium text-white">{cat}</div>
              {isActive && (
                <div className="text-[11px] text-emerald-300/80 mt-0.5">
                  Active filter
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

CategoryCardsMobile.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  categoryPreviews: PropTypes.object,
};

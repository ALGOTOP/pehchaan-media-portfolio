// src/components/work/WorkFilterBarNew.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  filterBarParent,
  filterBarInput,
  filterChipParent,
  filterChipChild,
  magneticWrap,
} from "@/utils/workAnimations";

export default function WorkFilterBarNew({
  categories,
  tags,
  activeCategory,
  onCategoryChange,
  activeTags,
  onTagToggle,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={filterBarParent}
      initial="initial"
      animate="animate"
      className="relative z-20 w-full px-6 md:px-12 lg:px-20 py-10 bg-[#050505]/60 backdrop-blur-xl border-b border-white/10"
    >
      {/* ==== TOP ROW (Search + Sort + Expand) ==== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        {/* Search */}
        <motion.div
          variants={filterBarInput}
          className="relative w-full md:w-[45%]"
        >
          <input
            type="text"
            placeholder="Search visual work..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-[#0a0a0a] text-gray-200 placeholder-gray-500 outline-none border border-white/10 focus:border-white/25 transition-all"
          />
        </motion.div>

        {/* Sort Dropdown */}
        <motion.select
          variants={filterBarInput}
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-5 py-3 rounded-xl bg-[#0a0a0a] text-gray-200 border border-white/10"
        >
          <option value="year-desc">Newest First</option>
          <option value="year-asc">Oldest First</option>
          <option value="alpha-asc">A → Z</option>
          <option value="alpha-desc">Z → A</option>
        </motion.select>

        {/* Expand Tags */}
        <motion.button
          variants={filterBarInput}
          onClick={() => setExpanded(!expanded)}
          className="px-5 py-3 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition"
        >
          Filters
        </motion.button>
      </div>

      {/* ==== CATEGORY CHIPS ==== */}
      <motion.div
        variants={filterChipParent}
        className="flex flex-wrap gap-3 mt-10"
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            variants={filterChipChild}
            onClick={() => onCategoryChange(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium border 
              ${
                activeCategory === cat
                  ? "bg-white text-black border-white"
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
              }
            `}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* ==== TAGS (EXPANDABLE) ==== */}
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="overflow-hidden mt-8"
        >
          <motion.div
            variants={filterChipParent}
            className="flex flex-wrap gap-3"
          >
            {tags.map((tag) => (
              <motion.button
                key={tag}
                variants={filterChipChild}
                onClick={() => onTagToggle(tag)}
                className={`px-4 py-2 rounded-full text-sm border 
                  ${
                    activeTags.includes(tag)
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                  }
                `}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
// WorkFilterBarNew.jsx — PART 2
// -----------------------------------------------------------------------------
// TAG SELECTOR (GRID) — Highly visual, pill-style, interactive tags
// -----------------------------------------------------------------------------

function TagSelector({
  availableTags,
  selectedTags,
  onChange,
}) {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="w-full mt-4 md:mt-0">

      <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">
        FILTER BY TAG
      </div>

      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => {
          const active = selectedTags.includes(tag);

          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                backdrop-blur-md border  
                ${
                  active
                    ? "bg-[#ffffff15] border-white/30 text-white shadow-lg shadow-white/10 scale-[1.03]"
                    : "bg-black/20 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {tag}
            </button>
          );
        })}
      </div>

    </div>
  );
}


// -----------------------------------------------------------------------------
// CATEGORY CARDS (MOBILE) — Collapsible, modern, polished
// -----------------------------------------------------------------------------

function CategoryCards({
  categories,
  selectedCategories,
  onChangeCategory,
  categoryPreviews,
}) {
  return (
    <div className="md:hidden mt-8 space-y-4">

      {Object.keys(categories).map((cat) => {
        const active = selectedCategories.includes(cat);

        return (
          <div
            key={cat}
            className={`
              p-5 rounded-2xl transition-all duration-500 border 
              backdrop-blur-xl
              ${
                active
                  ? "border-white/20 bg-white/5 shadow-lg shadow-white/10 scale-[1.02]"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">{cat}</h3>

              <button
                onClick={() =>
                  onChangeCategory(
                    active
                      ? selectedCategories.filter((c) => c !== cat)
                      : [...selectedCategories, cat]
                  )
                }
                className="px-3 py-1 rounded-xl text-xs uppercase tracking-widest border border-white/10 bg-black/40 text-gray-300 hover:text-white hover:border-white/20 transition-all"
              >
                {active ? "Remove" : "Add"}
              </button>
            </div>

            <div className="rounded-xl overflow-hidden relative group">
              <img
                src={categoryPreviews[cat]}
                alt={`${cat} category preview`}
                className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>
          </div>
        );
      })}

    </div>
  );
}

export { TagSelector, CategoryCards };
// WorkFilterBarNew.jsx — PART 3 (FINAL PART)
// -----------------------------------------------------------------------------
// SORTING DROPDOWN — Elegant floating dropdown with smooth motion
// -----------------------------------------------------------------------------

function SortDropdown({ sortValue, onChange }) {
  return (
    <div className="relative w-full md:w-48 mt-4 md:mt-0">
      <select
        value={sortValue}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full bg-black/30 border border-white/10 text-gray-300 
          px-4 py-3 rounded-xl 
          focus:outline-none focus:ring-2 focus:ring-white/30
          backdrop-blur-xl transition-all
        "
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="a-z">A → Z</option>
        <option value="z-a">Z → A</option>
      </select>
    </div>
  );
}


// -----------------------------------------------------------------------------
// MAIN EXPORT — THE COMPLETE FILTER BAR
// -----------------------------------------------------------------------------

export default function WorkFilterBarNew({
  categories,
  selectedCategories,
  onChangeCategory,
  availableTags,
  selectedTags,
  onChangeTags,
  sortValue,
  onSortChange,
  categoryPreviews,
}) {
  return (
    <div
      className="
        w-full
        backdrop-blur-2xl
        bg-black/30
        border border-white/10
        rounded-3xl
        p-8
        mb-14
        shadow-[0_0_80px_-10px_rgba(255,255,255,0.15)]
      "
    >

      {/* TOP ROW — Category Multi-Select + Sorting */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* CATEGORY SELECTOR (DESKTOP) */}
        <div className="hidden md:flex md:flex-row md:flex-wrap gap-3">
          {Object.keys(categories).map((cat) => {
            const active = selectedCategories.includes(cat);

            return (
              <button
                key={cat}
                onClick={() =>
                  onChangeCategory(
                    active
                      ? selectedCategories.filter((c) => c !== cat)
                      : [...selectedCategories, cat]
                  )
                }
                className={`
                  px-5 py-2 rounded-xl text-sm font-medium border transition-all
                  ${
                    active
                      ? "bg-white/10 border-white/20 text-white shadow-lg shadow-white/10"
                      : "bg-black/20 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* SORT DROPDOWN */}
        <SortDropdown sortValue={sortValue} onChange={onSortChange} />
      </div>


      {/* TAG SELECTOR SECTION */}
      <TagSelector
        availableTags={availableTags}
        selectedTags={selectedTags}
        onChange={onChangeTags}
      />

      {/* MOBILE CATEGORY CARDS */}
      <CategoryCards
        categories={categories}
        selectedCategories={selectedCategories}
        onChangeCategory={onChangeCategory}
        categoryPreviews={categoryPreviews}
      />

    </div>
  );
}

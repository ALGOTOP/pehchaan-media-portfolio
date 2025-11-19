// src/components/work/CaseStudyThumbGrid.jsx (PART 1 of 2)
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer } from "@/utils/workAnimations";
import PropTypes from "prop-types";

/**
 * CaseStudyThumbGrid
 * A premium thumbnail grid showing 15–20 sample works for a category.
 *
 * Features:
 * - Fluid masonry layout (CSS columns)
 * - Smooth image reveal
 * - Hover zoom + glass overlay
 * - Optional modal trigger
 * - Fully optimized lazy loading
 */

export default function CaseStudyThumbGrid({
  items = [],
  triggerModal = () => {},
}) {
  const memoized = useMemo(() => items, [items]);

  return (
    <section
      className="max-w-7xl mx-auto px-6 pt-6 pb-28"
      aria-label="Case study sample thumbnails"
    >
      <motion.div
        variants={staggerContainer(0.04)}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <MasonryGrid>
          {memoized.map((item, idx) => (
            <ThumbCard key={item.id || idx} item={item} onOpen={triggerModal} />
          ))}
        </MasonryGrid>
      </motion.div>
    </section>
  );
}

CaseStudyThumbGrid.propTypes = {
  items: PropTypes.array.isRequired,
  triggerModal: PropTypes.func,
};

// ---------------------------
// Masonry Layout Wrapper
// ---------------------------
function MasonryGrid({ children }) {
  return (
    <div className="masonry-thumbs space-y-5">
      {children}

      <style>{`
        .masonry-thumbs {
          column-count: 1;
          column-gap: 18px;
        }
        @media(min-width: 640px) {
          .masonry-thumbs { column-count: 2; }
        }
        @media(min-width: 1024px) {
          .masonry-thumbs { column-count: 3; }
        }
        @media(min-width: 1440px) {
          .masonry-thumbs { column-count: 4; }
        }
        .masonry-thumbs > * {
          break-inside: avoid;
        }
      `}</style>
    </div>
  );
}
// src/components/work/CaseStudyThumbGrid.jsx (PART 2 of 2)

import { thumbReveal } from "@/utils/workAnimations";

// ---------------------------
// Single Thumbnail Card
// ---------------------------
function ThumbCard({ item, onOpen }) {
  const open = () => onOpen(item);

  return (
    <motion.div
      variants={thumbReveal}
      className="relative rounded-xl overflow-hidden group cursor-pointer bg-[#0b0b0b] border border-white/5 shadow-xl shadow-black/40"
      onClick={open}
      tabIndex={0}
      role="button"
      aria-label={`Open sample: ${item.title}`}
    >
      {/* Thumbnail Image */}
      <img
        src={item.thumbnail}
        alt={item.alt || item.title}
        loading="lazy"
        className="w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.07] opacity-90 group-hover:opacity-100"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-500"></div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        <div>
          <h3 className="text-white font-semibold text-sm">{item.title}</h3>
          <p className="text-white/60 text-xs">{item.year || "Year"}</p>
        </div>
        <button
          className="px-3 py-1.5 text-xs font-medium bg-white/20 backdrop-blur-xl text-white rounded-lg border border-white/10 group-hover:bg-indigo-600 transition-all pointer-events-auto"
        >
          View
        </button>
      </div>
    </motion.div>
  );
}

ThumbCard.propTypes = {
  item: PropTypes.object.isRequired,
  onOpen: PropTypes.func.isRequired,
};

// END FILE

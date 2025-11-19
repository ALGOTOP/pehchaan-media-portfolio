// src/components/work/CaseStudyThumbGrid.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { staggerContainer, thumbReveal } from "@/utils/workAnimations";
import PropTypes from "prop-types";

/**
 * CaseStudyThumbGrid
 * Premium masonry-style thumbnail grid for 15-20 samples.
 */
export default function CaseStudyThumbGrid({ items = [], onOpen = () => {} }) {
  const memoized = useMemo(() => items, [items]);

  return (
    <section
      aria-label="Case study thumbnails"
      className="max-w-7xl mx-auto px-6 pt-6 pb-28"
    >
      <motion.div variants={staggerContainer(0.04)} initial="initial" animate="animate">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg md:text-xl font-semibold tracking-tight">Samples</h3>
            <p className="text-sm text-white/60 mt-1">A curated set of deliverables — click to preview.</p>
          </div>
        </div>

        <MasonryGrid>
          {memoized.map((item, idx) => (
            <ThumbCard key={item.id ?? idx} item={item} onOpen={onOpen} />
          ))}
        </MasonryGrid>
      </motion.div>
    </section>
  );
}

CaseStudyThumbGrid.propTypes = {
  items: PropTypes.array.isRequired,
  onOpen: PropTypes.func,
};

// Masonry wrapper using CSS columns for graceful flow
function MasonryGrid({ children }) {
  return (
    <div className="masonry-thumbs space-y-5">
      {children}
      <style>{`
        .masonry-thumbs {
          column-count: 1;
          column-gap: 18px;
        }
        @media(min-width: 640px) { .masonry-thumbs { column-count: 2; } }
        @media(min-width: 1024px) { .masonry-thumbs { column-count: 3; } }
        @media(min-width: 1440px) { .masonry-thumbs { column-count: 4; } }
        .masonry-thumbs > * { break-inside: avoid; margin-bottom: 18px; }
      `}</style>
    </div>
  );
}

MasonryGrid.propTypes = { children: PropTypes.node };

// Single thumbnail card
function ThumbCard({ item, onOpen }) {
  const open = () => onOpen(item);

  return (
    <motion.div
      variants={thumbReveal}
      className="relative rounded-xl overflow-hidden group cursor-pointer bg-[#0b0b0b] border border-white/5 shadow-xl"
      onClick={open}
      tabIndex={0}
      role="button"
      aria-label={`Open sample: ${item.title}`}
    >
      <img
        src={item.thumbnail}
        alt={item.alt || item.title}
        loading="lazy"
        className="w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.06] opacity-95"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity"></div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        <div>
          <h3 className="text-white font-semibold text-sm">{item.title}</h3>
          <p className="text-white/60 text-xs mt-1">{item.year || "—"}</p>
        </div>
        <button className="px-3 py-1.5 text-xs font-medium bg-white/10 backdrop-blur-lg text-white rounded-lg border border-white/10 group-hover:bg-cyan-500/90 transition-all">
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

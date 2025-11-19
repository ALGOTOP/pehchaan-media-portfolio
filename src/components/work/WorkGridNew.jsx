// src/components/work/WorkGridNew.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import WorkItemLargeCard from "./WorkItemLargeCard";
import { staggerContainer } from "@/utils/workAnimations";
import PropTypes from "prop-types";

export default function WorkGridNew({ items = [], layout = "masonry", columns = 3, colWidth = 340 }) {
  const memoizedItems = useMemo(() => items || [], [items]);

  return (
    <section aria-label="Work Grid" className="max-w-7xl mx-auto px-6 pb-28">
      <motion.div variants={staggerContainer(0.03)} initial="initial" animate="animate">
        {layout === "masonry" ? (
          <MasonryContainer items={memoizedItems} colWidth={colWidth} />
        ) : (
          <GridContainer items={memoizedItems} columns={columns} />
        )}
      </motion.div>
    </section>
  );
}

WorkGridNew.propTypes = {
  items: PropTypes.array,
  layout: PropTypes.oneOf(["masonry", "grid"]),
  columns: PropTypes.number,
  colWidth: PropTypes.number,
};

// CSS columns masonry
function MasonryContainer({ items, colWidth = 340, gap = 20 }) {
  return (
    <div style={{ columnGap: gap, columnWidth: colWidth }} className="masonry-grid">
      {items.map((item) => (
        <div key={item.id} style={{ breakInside: "avoid", marginBottom: gap }}>
          <WorkItemLargeCard item={item} />
        </div>
      ))}

      <style>{`
        .masonry-grid { -webkit-column-gap: ${gap}px; column-gap: ${gap}px; }
        @media (min-width: 1280px) { .masonry-grid { column-width: ${Math.max(300, colWidth)}px; } }
      `}</style>
    </div>
  );
}

MasonryContainer.propTypes = { items: PropTypes.array };

// Regular grid fallback
function GridContainer({ items, columns = 3, gap = 20 }) {
  const min = Math.floor(1000 / Math.max(1, columns));
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`, gap }}>
      {items.map((it) => (
        <WorkItemLargeCard key={it.id} item={it} />
      ))}
    </div>
  );
}

GridContainer.propTypes = { items: PropTypes.array, columns: PropTypes.number, gap: PropTypes.number };

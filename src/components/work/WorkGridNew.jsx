// src/components/work/WorkGridNew.jsx  (PART 1 of 2)
import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WorkItemLargeCard from './WorkItemLargeCard';
import { staggerContainer } from '@/utils/workAnimations';
import PropTypes from 'prop-types';

/**
 * WorkGridNew
 * - items: array of work items
 * - layout: 'masonry' | 'grid'
 * - columns: preferred columns for grid fallback
 * - colWidth: column width for CSS-columns masonry
 *
 * This component supports two display modes:
 *  - CSS-columns based masonry (fluid, pinterest-like)
 *  - Regular CSS grid (uniform rows)
 *
 * Accessibility & UX:
 *  - Each item is reachable by keyboard
 *  - Images use loading="lazy" and have alt text
 *  - Motion uses staggered reveal
 */

export default function WorkGridNew({ items = [], layout = 'masonry', columns = 3, colWidth = 320 }) {
  // compute stable key for AnimatePresence to avoid layout flash
  useEffect(() => {
    // smooth scroll restore suggestion: optionally hook here
  }, []);

  const memoizedItems = useMemo(() => items || [], [items]);

  return (
    <section aria-label="Work samples grid" className="max-w-7xl mx-auto px-6 pb-28">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`work-grid-${layout}-${memoizedItems.length}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={staggerContainer(0.03)}
          className="w-full"
        >
          {layout === 'masonry' ? (
            <MasonryContainer items={memoizedItems} colWidth={colWidth} />
          ) : (
            <GridContainer items={memoizedItems} columns={columns} />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

WorkGridNew.propTypes = {
  items: PropTypes.array,
  layout: PropTypes.oneOf(['masonry', 'grid']),
  columns: PropTypes.number,
  colWidth: PropTypes.number,
};

// -------------------------------
// MasonryContainer (CSS columns)
// -------------------------------
function MasonryContainer({ items, colWidth = 320, gap = 20 }) {
  return (
    <div
      className="masonry-grid"
      style={{
        columnGap: gap,
        columnWidth: colWidth,
      }}
    >
      {items.map((item) => (
        <div key={item.id} style={{ breakInside: 'avoid', marginBottom: gap }}>
          <WorkItemLargeCard item={item} />
        </div>
      ))}

      <style>{`
        .masonry-grid {
          -webkit-column-gap: ${gap}px;
          column-gap: ${gap}px;
        }
        @media (min-width: 1280px) {
          .masonry-grid { column-width: ${Math.max(300, colWidth)}px; }
        }
      `}</style>
    </div>
  );
}
// src/components/work/WorkGridNew.jsx  (PART 2 of 2)

// -------------------------------
// GridContainer (regular grid)
// -------------------------------
function GridContainer({ items, columns = 3, gap = 20 }) {
  const gridCols = Math.max(1, columns);
  return (
    <motion.div
      className="w-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={staggerContainer(0.03)}
    >
      <div
        className={`grid gap-${Math.min(12, gap)} `}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${Math.floor(1000 / gridCols)}px, 1fr))`,
          gap: gap,
        }}
      >
        {items.map((item) => (
          <WorkItemLargeCard key={item.id} item={item} />
        ))}
      </div>
    </motion.div>
  );
}

GridContainer.propTypes = {
  items: PropTypes.array,
  columns: PropTypes.number,
  gap: PropTypes.number,
};

// End of WorkGridNew.jsx

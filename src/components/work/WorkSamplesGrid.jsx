// src/components/work/WorkSamplesGrid.jsx
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { staggerContainer } from '@/utils/workAnimations';
import WorkSampleCard from './WorkSampleCard';
import WorkModalView from './WorkModalView';

export default function WorkSamplesGrid({
  items,
  layout = 'grid', // 'grid' | 'masonry' if you want later
  title = 'Curated samples',
}) {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section
      aria-label="Work samples"
      className="max-w-7xl mx-auto px-6 pb-20"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-white/70 uppercase tracking-[0.16em]">
            {title}
          </h3>
          <p className="text-xs text-white/50 mt-1">
            Showing <span className="font-semibold">{items.length}</span> pieces from the extended archive.
          </p>
        </div>
      </div>

      <motion.div
        variants={staggerContainer(0.05)}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div key={item.id} layout>
              <WorkSampleCard item={item} onClick={setActiveItem} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal view for large preview */}
      <AnimatePresence>
        {activeItem && (
          <WorkModalView
            item={activeItem}
            onClose={() => setActiveItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

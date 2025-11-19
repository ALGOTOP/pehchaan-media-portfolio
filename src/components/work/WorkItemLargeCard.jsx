// src/components/work/WorkItemLargeCard.jsx  (PART 1 of 2)
import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cardHover } from '@/utils/workAnimations';

/**
 * WorkItemLargeCard
 * - visually rich card used inside WorkGridNew
 * - tilt effect based on pointer position
 * - small parallax on image, overlay CTA that navigates to category samples
 *
 * Props:
 *  - item: { id, title, category, thumbnail, alt, client, year, tags }
 */

export default function WorkItemLargeCard({ item }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [inViewRef, inView] = useInView({ threshold: 0.12, triggerOnce: true });

  // combine refs
  const setRefs = (node) => {
    ref.current = node;
    inViewRef(node);
  };

  // tilt math using framer-motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-40, 40], [8, -8]);
  const rotateY = useTransform(x, [-40, 40], [-8, 8]);

  const onMove = (e) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const tx = (px - 0.5) * 40;
    const ty = (py - 0.5) * 40;
    x.set(tx);
    y.set(ty);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const openCategory = (ev) => {
    ev.preventDefault();
    const slug = item.category.toLowerCase().replace(/\s+/g, '-');
    navigate(`/work/category/${slug}`);
  };

  return (
    <motion.article
      ref={setRefs}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative block rounded-3xl overflow-hidden bg-gradient-to-b from-[#071026] to-[#050506] shadow-2xl border border-white/6"
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
      whileHover="hover"
      variants={cardHover}
      tabIndex={0}
      role="region"
      aria-labelledby={`workitem-${item.id}-title`}
      style={{
        perspective: 1200,
      }}
    >
      <motion.div
        className="relative transform-gpu will-change-transform"
        style={{
          rotateX,
          rotateY,
          translateZ: 0,
        }}
      >
        {/* image container with parallax */}
        <ImageParallax src={item.thumbnail} alt={item.alt || item.title} inView={inView} />
// src/components/work/WorkItemLargeCard.jsx  (PART 2 of 2)

        {/* overlay content */}
        <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3 pointer-events-none">
          <div className="pointer-events-auto">
            <h3 id={`workitem-${item.id}-title`} className="text-white font-semibold text-base md:text-lg leading-snug">
              {item.title}
            </h3>
            <p className="text-white/70 text-xs mt-1">{item.client} · {item.year}</p>
          </div>

          <div className="pointer-events-auto">
            <button
              onClick={openCategory}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 text-white/95 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label={`Open more ${item.category} samples`}
            >
              View
            </button>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

WorkItemLargeCard.propTypes = {
  item: PropTypes.object.isRequired,
};

// -----------------------------
// ImageParallax subcomponent
// -----------------------------
function ImageParallax({ src, alt, inView }) {
  // subtle reveal if inView
  const imgRef = useRef(null);

  return (
    <div className="w-full overflow-hidden bg-[#0b0b0b]">
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        initial={{ opacity: 0, scale: 1.03 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="w-full h-auto object-cover block"
        style={{ display: 'block' }}
      />
      {/* subtle gradient overlay for legibility */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}

ImageParallax.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  inView: PropTypes.bool,
};

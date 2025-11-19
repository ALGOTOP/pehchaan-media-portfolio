// src/components/work/WorkItemLargeCard.jsx
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { cardHover } from "@/utils/workAnimations";

/**
 * WorkItemLargeCard
 * High-contrast, tilt-responsive hero card for WorkGridNew.
 */
export default function WorkItemLargeCard({ item }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [inViewRef, inView] = useInView({ threshold: 0.14, triggerOnce: true });

  // combine refs
  const setRefs = (node) => {
    ref.current = node;
    inViewRef(node);
  };

  // tilt values
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
    if (!item?.category) return;
    const slug = item.category.toLowerCase().replace(/\s+/g, "-");
    navigate(`/work/category/${slug}`);
  };

  return (
    <motion.article
      ref={setRefs}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative block rounded-3xl overflow-hidden bg-gradient-to-b from-[#071026] to-[#050506] shadow-2xl border border-white/6"
      initial="initial"
      animate={inView ? "animate" : "initial"}
      whileHover="hover"
      variants={cardHover}
      tabIndex={0}
      role="region"
      aria-labelledby={`workitem-${item.id}-title`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="relative transform-gpu will-change-transform"
        style={{ rotateX, rotateY, translateZ: 0 }}
      >
        <ImageParallax src={item.thumbnail} alt={item.alt || item.title} inView={inView} />

        {/* Overlay content */}
        <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3 pointer-events-none">
          <div className="pointer-events-auto">
            <h3
              id={`workitem-${item.id}-title`}
              className="text-white font-semibold text-base md:text-lg leading-snug drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)]"
            >
              {item.title}
            </h3>
            <p className="text-white/75 text-xs mt-1">
              {item.client && <span>{item.client}</span>}
              {item.client && item.year && <span> · </span>}
              {item.year}
            </p>
          </div>

          <div className="pointer-events-auto">
            <button
              onClick={openCategory}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 text-white/95 hover:bg-cyan-500/90 hover:text-black border border-white/20 hover:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/80"
              aria-label={`Open more ${item.category} samples`}
            >
              <span className="text-xs font-medium">View category</span>
              <span className="text-sm translate-y-[0.5px]">↗</span>
            </button>
          </div>
        </div>

        {/* Edge glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-cyan-400/0 hover:border-cyan-300/40 hover:shadow-[0_0_45px_rgba(56,189,248,0.3)] transition-all duration-500" />
      </motion.div>
    </motion.article>
  );
}

WorkItemLargeCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    category: PropTypes.string,
    thumbnail: PropTypes.string,
    alt: PropTypes.string,
    client: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

// Image subcomponent
function ImageParallax({ src, alt, inView }) {
  const imgRef = useRef(null);

  return (
    <div className="w-full overflow-hidden bg-[#0b0b0b] relative">
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        initial={{ opacity: 0, scale: 1.03 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="w-full h-auto object-cover block"
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/65 via-black/30 to-transparent" />
    </div>
  );
}

ImageParallax.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  inView: PropTypes.bool,
};

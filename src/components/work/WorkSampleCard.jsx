// src/components/work/WorkSampleCard.jsx
import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { cardHover } from '@/utils/workAnimations';

const cn = (...xs) => xs.filter(Boolean).join(' ');

export default function WorkSampleCard({ item, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-40, 40], [10, -10]);
  const rotateY = useTransform(x, [-40, 40], [-10, 10]);
  const shineX = useTransform(x, [-40, 40], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX / 4);
    y.set(relY / 4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={ref}
      layout
      variants={cardHover}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className={cn(
        'relative rounded-2xl overflow-hidden bg-white/5',
        'border border-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.6)]',
        'cursor-pointer group'
      )}
      onClick={() => onClick?.(item)}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <motion.img
          src={item.thumbnail}
          alt={item.alt || item.title}
          className="w-full h-52 object-cover transform-gpu group-hover:scale-[1.03] transition-transform duration-500"
          style={{
            x: useTransform(x, (v) => v * -0.4),
            y: useTransform(y, (v) => v * -0.4),
          }}
          loading="lazy"
        />

        {/* Shine animation */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-white/20 via-white/60 to-transparent opacity-0 group-hover:opacity-100"
          style={{ left: shineX }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />

        {/* Upper overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 pt-3 pb-3.5 flex items-end justify-between gap-3">
        <div>
          <h4 className="text-sm md:text-[15px] font-semibold leading-tight">
            {item.title}
          </h4>
          <p className="mt-1 text-[11px] text-white/60">
            {item.client && <span>{item.client} · </span>}
            {item.year}
            {item.type && <span> · {item.type}</span>}
          </p>
          {item.tags?.length ? (
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-[3px] text-[10px] text-white/70"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* CTA pill */}
        <button
          type="button"
          className={cn(
            'shrink-0 inline-flex items-center gap-1 rounded-full',
            'bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white',
            'border border-white/15 backdrop-blur-md',
            'group-hover:bg-cyan-400 group-hover:text-black group-hover:border-cyan-200',
            'transition-colors'
          )}
        >
          <span>View</span>
          <span className="text-[13px] translate-y-[0.5px]">↗</span>
        </button>
      </div>

      {/* Outer ring glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/0 group-hover:border-cyan-300/60 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] transition-all duration-500" />
    </motion.article>
  );
}

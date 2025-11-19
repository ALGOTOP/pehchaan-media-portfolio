// src/utils/workAnimations.js
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCallback } from 'react';

// Simple fade-in
export const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 4 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
};

// Staggered container for grids
export const staggerContainer = (stagger = 0.06) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.05,
    },
  },
});

// Card hover / depth
export const cardHover = {
  initial: { opacity: 0, y: 10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.02,
    boxShadow: '0 28px 80px rgba(0,0,0,0.55)',
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 22,
    },
  },
};

// Filter tray entrance
export const filterTrayVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// Elastic pill for categories/tags
export const pillVariant = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 360,
      damping: 20,
    },
  },
  tap: {
    scale: 0.94,
    transition: { type: 'spring', stiffness: 500, damping: 26 },
  },
};

// Magnetic button (hook + variants)
export const useMagnetic = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.2 });

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleMouseMove = useCallback(
    (event) => {
      const { currentTarget, clientX, clientY } = event;
      const rect = currentTarget.getBoundingClientRect();
      const relX = clientX - rect.left - rect.width / 2;
      const relY = clientY - rect.top - rect.height / 2;
      x.set(relX * 0.25);
      y.set(relY * 0.25);
    },
    [x, y],
  );

  return {
    magneticStyle: {
      x: springX,
      y: springY,
    },
    handleMouseMove,
    reset,
  };
};

export const magneticVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: { type: 'spring', stiffness: 280, damping: 20 },
  },
  tap: {
    scale: 0.97,
  },
};

// Simple parallax layer variants utility
export const parallaxLayer = (depth = 30) => ({
  initial: { y: 0, opacity: 0 },
  animate: { y: depth * -0.25, opacity: 1 },
});

// Hero floating elements
export const heroFloat = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: [16, 8, 16],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

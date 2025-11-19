// src/utils/workAnimations.js
// Centralised Framer Motion variants for the work/extended-work system.

// Simple fade-in with optional delay
export const fadeIn = (delay = 0, y = 12) => ({
  initial: { opacity: 0, y },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.23, 0.96, 0.52, 0.99],
      delay,
    },
  },
});

// Reveal from left (hero / headings)
export const revealFromLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -18 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.9, 0.3, 1],
      delay,
    },
  },
});

// Stagger container for grids
export const staggerContainer = (stagger = 0.06, delayChildren = 0) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

// Card hover variant for tiles / thumbnails
export const cardHover = {
  hover: {
    y: -6,
    scale: 1.02,
    transition: {
      duration: 0.25,
      ease: [0.22, 0.8, 0.35, 1],
    },
  },
};

// Little pill micro-animation (buttons / chips)
export const pillVariant = {
  initial: { scale: 1, opacity: 0.9 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.12 },
  },
};

// =======================
// Modal-specific variants
// =======================

// Backdrop fade-in (for WorkModalView)
export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: 'linear',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// Modal content (panel) animation
export const modalContent = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.98,
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

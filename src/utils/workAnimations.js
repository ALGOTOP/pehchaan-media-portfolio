// src/utils/workAnimations.js

export const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const fadeInDelayed = (i) => ({
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
});

export const modalReveal = {
  hidden: { scale: 0.9, opacity: 0, y: 40 },
  show: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    y: 40,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

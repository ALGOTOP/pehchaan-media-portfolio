// src/utils/motionVariants.js
export const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
  hidden: {},
};

export const modalVariant = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.38, ease: [0.2, 0.9, 0.2, 1] } },
};

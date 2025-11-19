// src/utils/workAnimations.js

export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export const modalContent = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: 40, transition: { duration: 0.3 } },
};

export const itemHover = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
  },
};

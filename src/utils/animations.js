// src/utils/animations.js
import { Variants } from "framer-motion";

// ✅ Fade-in with upward motion
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// ✅ Simple fade-in
export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ✅ Slide-in from direction (left/right/up/down)
export const slideIn = (direction = "up", delay = 0) => {
  let x = 0,
    y = 0;
  if (direction === "left") x = -100;
  if (direction === "right") x = 100;
  if (direction === "up") y = -100;
  if (direction === "down") y = 100;

  return {
    hidden: { opacity: 0, x, y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, delay, ease: "easeOut" },
    },
  };
};

// ✅ Fade with customizable delay
export const delayFade = (delay = 0.2) => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  },
});

// ✅ Scale in effect
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ✅ Text reveal
export const revealText = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
  },
};

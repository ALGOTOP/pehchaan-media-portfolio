// src/utils/helpers.js

// Smooth scroll to element by ID
export const smoothScrollTo = (id) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Format text safely for display
export const capitalizeWords = (str = "") =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

// Detect viewport size
export const isMobile = () => window.innerWidth <= 768;

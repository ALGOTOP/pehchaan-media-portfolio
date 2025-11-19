Okay, let's rewrite the `workAnimations.js` file to include the missing `itemHover` animation and ensure it aligns perfectly with the `WorkItem.jsx` component you provided. The `WorkItem.jsx` uses `variants={itemHover}` and `whileHover="hover"`, so the `itemHover` object needs `initial`, `hover`, and potentially other named states if used elsewhere.

Here is the complete, rewritten `src/utils/workAnimations.js` file:

```javascript
// src/utils/workAnimations.js

// Animation variant for fading in elements from below
export const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1], // Custom easing for smoothness
    },
  },
};

// Animation variant for fading in elements with a delay based on index
export const fadeInDelayed = (i) => ({
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08, // Apply stagger delay based on item index
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
});

// Animation variant for revealing the modal
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

// --- NEW: Animation variant for WorkItem hover effect ---
// This matches the usage in src/components/work/WorkItem.jsx
export const itemHover = {
  initial: {
    scale: 1, // Default scale
    opacity: 1, // Default opacity
    y: 0, // Default vertical position
    transition: {
      duration: 0.3, // Duration for returning to initial state
      ease: "easeOut", // Easing for returning to initial state
    }
  },
  hover: {
    scale: 1.03, // Slightly scale up on hover
    opacity: 0.95, // Slightly reduce opacity on hover for depth
    y: -5, // Lift the item slightly on hover
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)", // Add a subtle shadow on hover for depth
    transition: {
      duration: 0.3, // Duration for hover effect
      ease: "easeInOut", // Easing for hover effect
    },
  },
  // Add other states if needed by Framer Motion (e.g., tap, whileDrag)
  // tap: {
  //   scale: 0.98, // Example for tap effect
  // },
};

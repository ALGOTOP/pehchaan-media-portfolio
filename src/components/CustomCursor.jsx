import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

/**
 * CustomCursor Component (Enhanced Interactive Version)
 * ---------------------------------------------------------
 * ✦ Smoothly tracks mouse position using translate3d
 * ✦ Reacts to hover events on links, buttons, text, and images
 * ✦ Enlarges and glows dynamically for better feedback
 * ✦ Hidden on mobile and before first mouse movement
 * ✦ Lightweight + GPU accelerated
 */

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Start off-screen
    cursor.style.transform = `translate3d(-100px, -100px, 0)`;

    const moveCursor = (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!visible) setVisible(true);
    };

    // Hover Effects: Elements that trigger a "focus" state
    const hoverSelectors = [
      "a",
      "button",
      "[role='button']",
      "input",
      "textarea",
      "h1",
      "h2",
      "h3",
      "h4",
      "img",
      ".hoverable",
    ];

    const handleMouseEnter = (e) => {
      const tag = e.target.tagName.toLowerCase();

      // Slightly different reactions depending on element
      if (tag === "img") {
        controls.start({
          scale: 2.3,
          borderColor: "#f472b6", // pink-400
          boxShadow: "0 0 25px #f472b655",
          transition: { type: "spring", stiffness: 220, damping: 12 },
        });
      } else if (["h1", "h2", "h3", "h4"].includes(tag)) {
        controls.start({
          scale: 1.8,
          borderColor: "#22d3ee", // cyan-400
          boxShadow: "0 0 18px #22d3ee55",
          transition: { type: "spring", stiffness: 220, damping: 12 },
        });
      } else {
        // default hover (links, buttons, etc.)
        controls.start({
          scale: 2,
          borderColor: "#22d3ee",
          boxShadow: "0 0 15px #22d3ee55",
          transition: { type: "spring", stiffness: 220, damping: 10 },
        });
      }
    };

    const handleMouseLeave = () => {
      controls.start({
        scale: 1,
        borderColor: "#22d3ee",
        boxShadow: "0 0 0px transparent",
        transition: { type: "spring", stiffness: 200, damping: 12 },
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Attach hover listeners to all interactive elements
    const interactiveEls = document.querySelectorAll(hoverSelectors.join(","));
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [visible, controls]);

  return (
    <motion.div
      ref={cursorRef}
      animate={controls}
      className={`hidden md:block fixed top-0 left-0 w-5 h-5 rounded-full border-2 border-cyan-400 pointer-events-none mix-blend-difference z-[10000] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      transition={{ ease: "easeInOut" }}
    />
  );
}

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

/**
 * CustomCursor Component (Interactive Version)
 * ---------------------------------------------------------
 * ✦ Smooth motion tracking using transform3d
 * ✦ Enlarges and glows when hovering over clickable elements
 * ✦ Hidden on mobile and before first mouse move
 * ✦ Lightweight and GPU-accelerated for performance
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

    // Add hover reactions
    const handleMouseEnter = () => {
      controls.start({
        scale: 2,
        borderColor: "#22d3ee", // Tailwind cyan-400
        boxShadow: "0 0 15px #22d3ee55",
        transition: { type: "spring", stiffness: 200, damping: 10 },
      });
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

    // Add listeners for interactive elements
    const interactiveEls = document.querySelectorAll(
      "a, button, [role='button'], input, textarea"
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

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
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    />
  );
}

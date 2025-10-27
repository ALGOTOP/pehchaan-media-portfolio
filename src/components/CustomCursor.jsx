import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const moveCursor = (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className="hidden md:block fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-cyan-400 pointer-events-none mix-blend-difference z-[10000]"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
  );
}

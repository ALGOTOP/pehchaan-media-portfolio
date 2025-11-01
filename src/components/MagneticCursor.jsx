import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const cursorRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 300, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const moveCursor = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [x, y]);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed w-8 h-8 rounded-full bg-cyan-400/30 border border-cyan-300/60 pointer-events-none z-[9999] mix-blend-lighten"
      style={{
        translateX: smoothX,
        translateY: smoothY,
        x: "-50%",
        y: "-50%",
      }}
    />
  );
}

// ─────────────────────────────────────────────
// ParallaxBackground.jsx — GPU-optimized scroll layer
// ─────────────────────────────────────────────
import React, { useRef, useEffect } from "react";

export default function ParallaxBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const offset = window.scrollY * 0.25;
        ref.current.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-[0.05] pointer-events-none will-change-transform z-0"
    />
  );
}

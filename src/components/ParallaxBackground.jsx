import React, { useRef, useEffect } from "react";

export default function ParallaxBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const offset = window.scrollY * 0.25;
      ref.current.style.transform = `translate3d(0, ${offset}px, 0)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80')]
      bg-cover bg-center opacity-[0.08] pointer-events-none z-0 will-change-transform transition-transform duration-700 ease-out"
    >
      {/* Subtle gradient tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
    </div>
  );
}

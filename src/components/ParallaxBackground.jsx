import React, { useRef, useEffect } from "react";

export default function ParallaxBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const offset = window.scrollY * 0.35;
        ref.current.style.backgroundPositionY = `${offset}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-1 left-1 w-full h-full bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-[0.03] pointer-events-none z-0"
    />
  );
}

// ────────────────────────────────────────────────────────────────
// main.jsx — Root Entry File for Pehchaan Media Portfolio
// Safe for Vercel Deployment (Lazy Lenis + Framer Motion)
// ────────────────────────────────────────────────────────────────

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import PehchaanMediaApp from "./App";
import { AnimatePresence } from "framer-motion";

// ────────────────────────────────────────────────────────────────
// Lazy Load Lenis — avoids SSR build errors on Vercel
// ────────────────────────────────────────────────────────────────
const useLenisSmoothScroll = () => {
  React.useEffect(() => {
    let lenis;

import("lenis")
      .then(({ default: Lenis }) => {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          smoothTouch: false
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      })
      .catch((err) => console.warn("Lenis not loaded:", err));

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);
};

// ────────────────────────────────────────────────────────────────
// Root Component
// ────────────────────────────────────────────────────────────────
const Root = () => {
  useLenisSmoothScroll();

  return (
    <React.StrictMode>
      <AnimatePresence mode="wait">
        <PehchaanMediaApp />
      </AnimatePresence>
    </React.StrictMode>
  );
};

// ────────────────────────────────────────────────────────────────
// Mount Application
// ────────────────────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById("root")).render(<Root />);

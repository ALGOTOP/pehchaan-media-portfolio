// ────────────────────────────────────────────────────────────────
// main.jsx — Root Entry File for Pehchaan Media Portfolio
// ────────────────────────────────────────────────────────────────

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import PehchaanMediaApp from "./App";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence } from "framer-motion";

// ────────────────────────────────────────────────────────────────
// Smooth Scroll (Lenis) Setup
// ────────────────────────────────────────────────────────────────
const useLenisSmoothScroll = () => {
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
};

// ────────────────────────────────────────────────────────────────
// Root Component Wrapper
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
// Mount the App
// ────────────────────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById("root")).render(<Root />);

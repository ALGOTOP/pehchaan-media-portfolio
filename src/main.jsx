// ────────────────────────────────────────────────
// main.jsx — Root Entry File for Pehchaan Media Portfolio
// Smooth Lenis Scroll + Framer Motion Animations (Vercel Safe)
// ────────────────────────────────────────────────

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Lenis from "lenis";
import { useEffect } from "react";

// ─────────────────────────────────────────────
// Smooth Scroll Wrapper — Handles Lenis globally
// ─────────────────────────────────────────────
function SmoothScrollWrapper({ children }) {
  useEffect(() => {
    let lenis;

    try {
      if (typeof window !== "undefined") {
        lenis = new Lenis({
          duration: 1.2,
          smoothWheel: true,
          lerp: 0.1,
          easing: (x) => 1 - Math.pow(1 - x, 2),
        });

        const raf = (time) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }
    } catch (error) {
      console.warn("⚠️ Lenis initialization skipped:", error);
    }

    return () => lenis && lenis.destroy();
  }, []);

  return <>{children}</>;
}

// ─────────────────────────────────────────────
// Render App
// ─────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SmoothScrollWrapper>
      <App />
    </SmoothScrollWrapper>
  </React.StrictMode>
);

// ─────────────────────────────────────────────
// main.jsx — Optimized Lenis + FramerMotion setup
// ─────────────────────────────────────────────
import React, { useEffect } from "react";
// ────────────────────────────────────────────────
// main.jsx — Root Entry File for Pehchaan Media Portfolio
// Smooth Lenis Scroll + Framer Motion Animations (Vercel Safe)
// ────────────────────────────────────────────────

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import App from "./App";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

function RootApp() {
// ─────────────────────────────────────────────
// Smooth Scroll Wrapper — Handles Lenis globally
// ─────────────────────────────────────────────
function SmoothScrollWrapper({ children }) {
useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });
    let lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    try {
      if (typeof window !== "undefined") {
        lenis = new Lenis({
          duration: 1.2,
          smoothWheel: true,
          lerp: 0.1,
          easing: (x) => 1 - Math.pow(1 - x, 2),
        });

    requestAnimationFrame(raf);
        const raf = (time) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }
    } catch (error) {
      console.warn("⚠️ Lenis initialization skipped:", error);
    }

    return () => lenis.destroy();
    return () => lenis && lenis.destroy();
}, []);

  return <App />;
  return <>{children}</>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<RootApp />);
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

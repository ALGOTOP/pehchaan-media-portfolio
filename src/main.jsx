// ─────────────────────────────────────────────
// main.jsx — Optimized Lenis + FramerMotion setup
// ─────────────────────────────────────────────
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Lenis from "@studio-freight/lenis";

function RootApp() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<RootApp />);

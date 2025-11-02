// ────────────────────────────────────────────────────────────────
// main.jsx — Root Entry (Vercel-safe + Lenis-enabled via App.jsx)
// ────────────────────────────────────────────────────────────────

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import PehchaanMediaApp from "./App";

// The App handles Lenis, Router, Framer Motion, and SEO.
// Keeping this file clean ensures fastest hydration and stability.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PehchaanMediaApp />
  </React.StrictMode>
);

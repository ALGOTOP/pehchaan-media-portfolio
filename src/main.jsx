import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";

// ─────────────────────────────────────────────
// CASE STUDIES – Imports
// ─────────────────────────────────────────────
import CaseStudiesHub from "@/pages/case-studies/index.jsx";
import Lumina from "@/pages/case-studies/Lumina.jsx";
import Aurix from "@/pages/case-studies/Aurix.jsx";
import NovaSkin from "@/pages/case-studies/NovaSkin.jsx";
import AerialX from "@/pages/case-studies/AerialX.jsx";
import BuildSmart from "@/pages/case-studies/BuildSmart.jsx";
import Velo from "@/pages/case-studies/Velo.jsx";
import EcoRise from "@/pages/case-studies/EcoRise.jsx";
import HelixHealth from "@/pages/case-studies/HelixHealth.jsx";
import Zenith from "@/pages/case-studies/Zenith.jsx";

// ─────────────────────────────────────────────
// MAIN REACT RENDER
// ─────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ─── Main Portfolio Website ─── */}
        <Route path="/" element={<App />} />

        {/* ─── Case Studies Hub ─── */}
        <Route path="/case-studies" element={<CaseStudiesHub />} />

        {/* ─── Individual Case Study Pages ─── */}
        <Route path="/case-studies/Lumina" element={<Lumina />} />
        <Route path="/case-studies/Aurix" element={<Aurix />} />
        <Route path="/case-studies/NovaSkin" element={<NovaSkin />} />
        <Route path="/case-studies/AerialX" element={<AerialX />} />
        <Route path="/case-studies/BuildSmart" element={<BuildSmart />} />
        <Route path="/case-studies/Velo" element={<Velo />} />
        <Route path="/case-studies/EcoRise" element={<EcoRise />} />
        <Route path="/case-studies/HelixHealth" element={<HelixHealth />} />
        <Route path="/case-studies/Zenith" element={<Zenith />} />

        {/* ─── 404 Catch-All (Optional) ─── */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
              <h1 className="text-4xl font-bold text-cyan-400 mb-4">404</h1>
              <p className="text-gray-400 mb-6">
                The page you’re looking for doesn’t exist.
              </p>
              <a
                href="/"
                className="text-cyan-400 hover:underline font-medium"
              >
                Go back home
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";

// ─────────────────────────────────────────────
// CASE STUDIES – Imports
// ─────────────────────────────────────────────
import CaseStudiesHub from "@/pages/case-studies";
import Lumina from "@/pages/case-studies/Lumina";
import Aurix from "@/pages/case-studies/Aurix";
import NovaSkin from "@/pages/case-studies/NovaSkin";
import AerialX from "@/pages/case-studies/AerialX";
import BuildSmart from "@/pages/case-studies/BuildSmart";
import Velo from "@/pages/case-studies/Velo";
import EcoRise from "@/pages/case-studies/EcoRise";
import HelixHealth from "@/pages/case-studies/HelixHealth";
import Zenith from "@/pages/case-studies/Zenith";

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
        <Route path="/case-studies/lumina" element={<Lumina />} />
        <Route path="/case-studies/aurix" element={<Aurix />} />
        <Route path="/case-studies/novaskin" element={<NovaSkin />} />
        <Route path="/case-studies/aerialx" element={<AerialX />} />
        <Route path="/case-studies/buildsmart" element={<BuildSmart />} />
        <Route path="/case-studies/velo" element={<Velo />} />
        <Route path="/case-studies/ecorise" element={<EcoRise />} />
        <Route path="/case-studies/helixhealth" element={<HelixHealth />} />
        <Route path="/case-studies/zenith" element={<Zenith />} />

        {/* ─── 404 Catch-All (Optional) ─── */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-4">
              <h1 className="text-5xl font-extrabold text-cyan-400 mb-3">
                404
              </h1>
              <p className="text-gray-400 mb-6">
                The page you’re looking for doesn’t exist or has moved.
              </p>
              <a
                href="/"
                className="text-cyan-400 hover:underline font-medium"
              >
                ⟵ Go back home
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

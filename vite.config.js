import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// ────────────────────────────────────────────────
// VITE CONFIGURATION – Pehchaan Media Portfolio
// ────────────────────────────────────────────────
// Includes:
// ✅ React via @vitejs/plugin-react
// ✅ Path alias "@/"
// ✅ TailwindCSS support
// ✅ SPA fallback for React Router (for Vercel)
// ────────────────────────────────────────────────

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // use "@/components/..." clean imports
    },
  },

  css: {
    postcss: "./postcss.config.cjs", // ensures Tailwind + Autoprefixer work properly
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined, // keeps bundles consistent for SPA builds
      },
    },
  },

  server: {
    port: 5173,
    open: true,
  },

  // ✅ This makes sure routes like /case-studies/Lumina work after reload on Vercel
  preview: {
    port: 4173,
    open: true,
  },
});

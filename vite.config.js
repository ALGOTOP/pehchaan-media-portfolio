import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// ────────────────────────────────────────────────
// VITE CONFIGURATION for Pehchaan Media Portfolio
// ────────────────────────────────────────────────
//
// ✅ Includes:
// - React support via @vitejs/plugin-react
// - Aliases for clean imports (like "@/components/...")
// - Optimized build settings for deployment on Vercel
//
// ────────────────────────────────────────────────

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // allows "@/..." imports
    },
  },

  css: {
    postcss: "./postcss.config.cjs", // ensures Tailwind & Autoprefixer are loaded
  },

  build: {
    outDir: "dist", // default build directory
    sourcemap: false, // optional: set true if you want source maps for debugging
    rollupOptions: {
      output: {
        manualChunks: undefined, // improves small bundle splitting for SPA
      },
    },
  },

  server: {
    port: 5173, // you can change if you want (default 5173)
    open: true, // auto-opens browser on dev start
  },
});

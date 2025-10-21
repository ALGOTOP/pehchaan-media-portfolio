import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Clean, production-ready configuration for Vercel
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // output folder for Vercel
  },
});

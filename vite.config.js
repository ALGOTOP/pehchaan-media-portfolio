import react from "@vitejs/plugin-react";
import path from "path";

// ─────────────────────────────────────────────
// Vite Configuration – Pehchaan Media Portfolio
// ─────────────────────────────────────────────
// ✅ Enables @ alias for cleaner imports (e.g., "@/components/Navbar")
// ✅ Compatible with Framer Motion, Lenis, and Tailwind CSS
// ✅ Optimized for smooth dev + production builds
export default defineConfig({
plugins: [react()],
resolve: {
@@ -19,8 +13,4 @@ export default defineConfig({
port: 5173,
open: true,
},
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});

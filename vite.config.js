import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['*'],
    strictPort: false,
    cors: true, // ✅ allow sandbox requests through CORS
    hmr: {
      clientPort: 443, // ✅ required for CodeSandbox HTTPS tunnels
    },
  },
});

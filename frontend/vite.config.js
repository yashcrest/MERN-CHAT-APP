//this file will affect your production env

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy is only used in dev server
    proxy: {
      // anytime we call /api to our backend the target is defined already from here.
      "/api": {
        target: "http://localhost:3000", //backend address
        changeOrigin: true,
      },
    },
  },
});

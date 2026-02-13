import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For GitHub Pages set BASE_PATH, e.g. BASE_PATH=/valentines/
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react()],
});

import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import manifest from "./manifest";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifest)],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ isSsrBuild }) => ({
    plugins: [react(), tailwindcss()],
    build: {
        rollupOptions: {
            output: isSsrBuild
                ? {}
                : {
                      // Split vendor chunks for better long-term caching
                      manualChunks: {
                          react: ["react", "react-dom", "react-router-dom"],
                          leaflet: ["leaflet", "react-leaflet", "leaflet-draw"],
                      },
                  },
        },
    },
}));
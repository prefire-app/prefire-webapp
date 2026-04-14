import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        rollupOptions: {
            output: {
                // Split vendor chunks for better long-term caching
                manualChunks: {
                    react: ["react", "react-dom", "react-router-dom"],
                    leaflet: ["leaflet", "react-leaflet", "leaflet-draw"],
                },
            },
        },
    },
});
/**
 * prerender.mjs
 * Run after `vite build` to generate static HTML for crawlable routes.
 * Usage: node prerender.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

// Routes to pre-render. /map is excluded — it's Leaflet-heavy with no crawlable text.
const routes = [
    { url: "/", outFile: "dist/index.html" },
    { url: "/learning", outFile: "dist/learning/index.html" },
    { url: "/donate", outFile: "dist/donate/index.html" },
];

// Step 1: Build the SSR bundle
console.log("==> Building SSR bundle...");
await build({
    plugins: [react(), tailwindcss()],
    build: {
        ssr: "src/entry-server.tsx",
        outDir: "dist/server",
        rollupOptions: {
            output: { format: "esm" },
        },
    },
    // Externalize browser-only map libraries so they are never evaluated in Node.js
    ssr: {
        external: [
            "leaflet",
            "react-leaflet",
            "leaflet-draw",
            "terra-draw",
            "terra-draw-google-maps-adapter",
            "@react-google-maps/api",
            "@googlemaps/js-api-loader",
        ],
    },
});

// Step 2: Load the built server module and the client HTML template
console.log("==> Loading SSR module...");
const { render } = await import(toAbsolute("dist/server/entry-server.js"));
const template = fs.readFileSync(toAbsolute("dist/index.html"), "utf-8");

// Step 3: Render each route and write the HTML file
for (const { url, outFile } of routes) {
    const { html: appHtml } = render(url);
    const html = template.replace("<!--ssr-outlet-->", appHtml);
    const fullPath = toAbsolute(outFile);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, html);
    console.log("  Pre-rendered:", outFile);
}

console.log("==> Pre-rendering complete.");

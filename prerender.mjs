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
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const BASE_URL = "https://prefire.online";

function buildHeadTags({ title, description, canonical }) {
    const esc = (s) => s.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return [
        // Override the default <title> set in index.html
        `<title>${esc(title)}</title>`,
        `<meta name="description" content="${esc(description)}" />`,
        `<link rel="canonical" href="${canonical}" />`,
        `<meta property="og:url" content="${canonical}" />`,
        `<meta property="og:title" content="${esc(title)}" />`,
        `<meta property="og:description" content="${esc(description)}" />`,
        `<meta name="twitter:title" content="${esc(title)}" />`,
        `<meta name="twitter:description" content="${esc(description)}" />`,
    ].join("\n    ");
}

// Discover blog post slugs from markdown frontmatter.
const postsDir = toAbsolute("src/blog/posts");
const blogPostRoutes = fs.existsSync(postsDir)
    ? fs
          .readdirSync(postsDir)
          .filter((f) => f.endsWith(".md"))
          .map((f) => {
              const raw = fs.readFileSync(path.join(postsDir, f), "utf-8");
              const { data } = matter(raw);
              const slug = data.slug || f.replace(/\.md$/, "");
              const title = data.title ? `${data.title} — Prefire Blog` : "Prefire Blog";
              const description = data.description || "Read the latest wildfire preparedness insights from the Prefire team.";
              return {
                  url: `/blog/${slug}`,
                  outFile: `dist/blog/${slug}/index.html`,
                  title,
                  description,
                  canonical: `${BASE_URL}/blog/${slug}`,
              };
          })
    : [];

// Routes to pre-render. /map is excluded — it's Leaflet-heavy with no crawlable text.
const routes = [
    {
        url: "/",
        outFile: "dist/index.html",
        title: "Prefire — Free Wildfire Defensible Space Tool",
        description: "Free wildfire defensible space mapping tool for homeowners. Draw your property and get a personalized fire preparedness report.",
        canonical: `${BASE_URL}/`,
    },
    {
        url: "/learning",
        outFile: "dist/learning/index.html",
        title: "Learning Resources — Wildfire Preparedness | Prefire",
        description: "Curated wildfire preparedness resources. Learn about defensible space, California fire-safe regulations, and how to protect your home.",
        canonical: `${BASE_URL}/learning`,
    },
    {
        url: "/donate",
        outFile: "dist/donate/index.html",
        title: "Support Prefire — Keep the Tool Free",
        description: "Prefire is a free public-interest wildfire defensible space tool. Donate to help cover hosting and expand coverage to more communities.",
        canonical: `${BASE_URL}/donate`,
    },
    {
        url: "/blog",
        outFile: "dist/blog/index.html",
        title: "Blog — Wildfire News & Updates | Prefire",
        description: "The Prefire blog: wildfire news, defensible space tips, and updates from the team.",
        canonical: `${BASE_URL}/blog`,
    },
    {
        url: "/about",
        outFile: "dist/about/index.html",
        title: "About Prefire — Wildfire Defensible Space for Everyone",
        description: "Learn about Prefire, the free wildfire defensible space tool built for homeowners and communities.",
        canonical: `${BASE_URL}/about`,
    },
    {
        url: "/about/tool",
        outFile: "dist/about/tool/index.html",
        title: "How the Tool Works | Prefire",
        description: "Prefire uses satellite imagery, building footprint data, and a questionnaire to estimate your defensible space compliance with California fire-safe regulations.",
        canonical: `${BASE_URL}/about/tool`,
    },
    {
        url: "/about/me",
        outFile: "dist/about/me/index.html",
        title: "About the Team | Prefire",
        description: "Meet the people behind Prefire, the free wildfire defensible space mapping tool.",
        canonical: `${BASE_URL}/about/me`,
    },
    {
        url: "/about/mission",
        outFile: "dist/about/mission/index.html",
        title: "Our Mission — Wildfire Defense for All | Prefire",
        description: "Prefire's mission: give every homeowner free access to wildfire defensible space analysis, without the insurance industry gatekeeping.",
        canonical: `${BASE_URL}/about/mission`,
    },
    {
        url: "/about/data",
        outFile: "dist/about/data/index.html",
        title: "Data Sources | Prefire",
        description: "Prefire uses publicly available data from the USDA, USGS, CAL FIRE, and other agencies to power its wildfire defensible space analysis.",
        canonical: `${BASE_URL}/about/data`,
    },
    {
        url: "/about/methodology",
        outFile: "dist/about/methodology/index.html",
        title: "Scoring Methodology | Prefire",
        description: "How Prefire calculates your defensible space score based on California fire-safe regulations.",
        canonical: `${BASE_URL}/about/methodology`,
    },
    {
        url: "/about/contact",
        outFile: "dist/about/contact/index.html",
        title: "Contact | Prefire",
        description: "Get in touch with the Prefire team.",
        canonical: `${BASE_URL}/about/contact`,
    },
    {
        url: "/learning/california",
        outFile: "dist/learning/california/index.html",
        title: "California Wildfire Resources — Defensible Space & Regulations | Prefire",
        description: "California-specific wildfire defensible space resources: PRC § 4291, AB 3074, CAL FIRE Fire Hazard Severity Zones (regulatory context), and how Prefire uses USFS Wildfire Hazard Potential (WHP) to score CA properties.",
        canonical: `${BASE_URL}/learning/california`,
    },
    {
        url: "/legal/terms",
        outFile: "dist/legal/terms/index.html",
        title: "Terms of Use | Prefire",
        description: "Terms of use and disclaimers for Prefire's free wildfire defensible space tool.",
        canonical: `${BASE_URL}/legal/terms`,
    },
    {
        url: "/legal/privacy",
        outFile: "dist/legal/privacy/index.html",
        title: "Privacy Policy | Prefire",
        description: "How Prefire handles the small amount of data you share. No cookies, no analytics, 7-day retention.",
        canonical: `${BASE_URL}/legal/privacy`,
    },
    ...blogPostRoutes,
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
for (const { url, outFile, title, description, canonical } of routes) {
    const { html: appHtml } = render(url);
    const html = template
        .replace("<!--head-outlet-->", buildHeadTags({ title, description, canonical }))
        .replace("<!--ssr-outlet-->", appHtml);
    const fullPath = toAbsolute(outFile);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, html);
    console.log("  Pre-rendered:", outFile);
}

console.log("==> Pre-rendering complete.");

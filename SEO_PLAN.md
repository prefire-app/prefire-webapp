gi# Prefire SEO Plan

## Current State

The site is a React SPA (Vite + React Router) deployed on CloudFront. This architecture has significant SEO implications since CloudFront serves a single `index.html` shell — search engine crawlers may not execute JavaScript, meaning page content and routes (`/map`, `/learning`, `/donate`) may not be indexed.

Current `index.html` metadata:
- Title: `prefire_` (too short, non-descriptive)
- No meta description
- No Open Graph or Twitter Card tags
- No structured data (JSON-LD)
- No sitemap or robots.txt

---

## Priority 1 — Fix the SPA Crawlability Problem

This is the most critical SEO issue. Options, ranked by effectiveness:

### Option A: Pre-rendering / SSG (Recommended)
Use **vite-plugin-ssg** or **vite-prerender** to generate static HTML for each route at build time. Each route (`/`, `/map`, `/learning`, `/donate`) gets its own fully-rendered `index.html` in the S3/CloudFront distribution.

```bash
npm install vite-plugin-ssg
```

This requires no infrastructure changes and keeps the CloudFront setup intact.

### Option B: Server-Side Rendering (SSR)
Migrate to a framework like **Next.js** or **Remix**. More powerful but a larger refactor.

### Option C: Dynamic Rendering
Serve pre-rendered HTML only to bots using a CloudFront Lambda@Edge function that detects the `User-Agent`. This is a workaround and not recommended long-term.

---

## Priority 2 — LLM Compatibility (Generative Engine Optimization)

LLMs like ChatGPT, Perplexity, Claude, and Google AI Overviews are increasingly the first place users find tools. Making Prefire legible to these systems is now as important as traditional SEO.

### `llms.txt`
Add `public/llms.txt` — a proposed standard (analogous to `robots.txt`) that gives LLMs a concise, plain-text summary of your site. AI crawlers look for this file.

```
# Prefire

> A free wildfire defensible space mapping tool for homeowners and communities.

Prefire helps property owners assess and improve their defensible space against wildfires. It provides an interactive map tool, educational resources on fire-safe regulations, and a donation page to support continued development.

## Pages

- /: Home — overview of the tool and calls to action
- /map: Interactive defensible space mapping tool
- /learning: Curated wildfire preparedness and defensible space resources
- /donate: Support the project

## About

Prefire is a public-interest project. The tool is free to use with no account required.
```

### `llms-full.txt`
Add `public/llms-full.txt` with the full plain-text content of each page — this is what LLMs use for RAG and citations. Keep it factual and structured:

```
# Prefire — Full Content

## Home Page (/)

Prefire is a wildfire defense tool for the people. We provide a free defensible space tool to save lives and property. Use our map tool to assess your property or visit the learning section for wildfire preparedness resources.

## Map Tool (/map)

[Describe what the map does, data sources used, how to interpret results]

## Learning Resources (/learning)

[Summary of the educational content and linked resources]

## Donate (/donate)

[Describe the project mission and how donations are used]
```

### Allow AI Crawlers in `robots.txt`
Major LLMs use their own crawlers. Explicitly allow them:

```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

### Content Clarity for LLM Citation
LLMs cite sources that have clear, factual, unambiguous prose. Recommendations:

- The home page hero text ("A Wildfire Defense Tool for the People") is punchy but vague. Add a one-paragraph factual description of what Prefire actually does beneath it.
- The `/learning` page is currently only outbound links. Add an original introductory paragraph explaining what defensible space is — this is highly citable content.
- Use plain `<h1>`, `<h2>`, `<p>` elements with semantic meaning (not just Tailwind divs) so LLMs can parse the content hierarchy from pre-rendered HTML.

### Structured Data for AI Overviews
The JSON-LD from Priority 3 also feeds Google's AI Overviews. Extend it with `FAQPage` schema on `/learning`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is defensible space?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Defensible space is the buffer you create between your home and the grass, trees, shrubs, or any other wild land area that surround it."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use the Prefire map tool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Navigate to the Map page, search for your address, and the tool will assess your property's defensible space based on local vegetation and fire risk data."
      }
    }
  ]
}
</script>
```

---

## Priority 3 — On-Page Metadata

### `index.html` Improvements

Replace the current minimal `<head>` with proper metadata:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Prefire — Wildfire Defensible Space Tool</title>
  <meta name="description" content="Free wildfire defense mapping tool. Assess your property's defensible space and prepare your home against wildfires." />

  <!-- Open Graph (Facebook, LinkedIn) -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yoursite.com/" />
  <meta property="og:title" content="Prefire — Wildfire Defensible Space Tool" />
  <meta property="og:description" content="Free wildfire defense mapping tool for homeowners and communities." />
  <meta property="og:image" content="https://yoursite.com/og-image.jpg" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Prefire — Wildfire Defensible Space Tool" />
  <meta name="twitter:description" content="Free wildfire defense mapping tool for homeowners and communities." />
  <meta name="twitter:image" content="https://yoursite.com/og-image.jpg" />

  <!-- Canonical -->
  <link rel="canonical" href="https://yoursite.com/" />
</head>
```

### Per-Route `<title>` and `<meta>` Tags
Use **react-helmet-async** to set unique titles and descriptions per route:

```bash
npm install react-helmet-async
```

| Route | Title | Description |
|---|---|---|
| `/` | Prefire — Wildfire Defensible Space Tool | Free wildfire defense mapping tool... |
| `/map` | Defensible Space Map — Prefire | Assess your property's wildfire risk... |
| `/learning` | Wildfire Learning Resources — Prefire | Guides and resources on defensible space... |
| `/donate` | Support Prefire — Donate | Help us keep wildfire defense tools free... |

---

## Priority 4 — Technical SEO

### `robots.txt`
Add `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

### `sitemap.xml`
Add `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yoursite.com/map</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://yoursite.com/learning</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yoursite.com/donate</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

### Structured Data (JSON-LD)
Add to `index.html` to help Google understand the site:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Prefire",
  "description": "A wildfire defensible space tool for homeowners and communities.",
  "url": "https://yoursite.com",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
```

### CloudFront: Fix SPA 404s
Ensure CloudFront returns `index.html` for all routes (not a 403/404), so direct links to `/map`, `/learning`, etc. work. In your CloudFront distribution:

- **Error Pages**: Add a custom error response for 403 and 404 → return `/index.html` with HTTP 200.

This also ensures Google can crawl all routes correctly.

---

## Priority 5 — Performance (Core Web Vitals)

Google uses Core Web Vitals as a ranking signal. Key improvements:

- **LCP (Largest Contentful Paint)**: Add a hero image with `loading="eager"` and proper dimensions. Preconnect to any external domains.
- **CLS (Cumulative Layout Shift)**: Ensure all images and embeds have explicit `width`/`height`.
- **INP (Interaction to Next Paint)**: The map tool (`/map`) is the most interactive — profile and defer heavy map libraries.
- **Bundle size**: Run `vite build --report` and code-split the map component with `React.lazy()`.

---

## Priority 6 — Content & Keyword Strategy

Target keywords with high wildfire relevance and low competition:

| Keyword | Intent | Target Page |
|---|---|---|
| defensible space tool | Informational/Tool | `/` or `/map` |
| wildfire property risk map | Informational | `/map` |
| how to create defensible space | Informational | `/learning` |
| wildfire preparedness checklist | Informational | `/learning` |
| free wildfire risk assessment | Tool | `/map` |

The `/learning` page currently has a list of external links. Expanding it with original written content (guides, FAQs) will drive the most organic traffic over time.

---

## Priority 7 — Off-Page SEO

- Submit the sitemap to **Google Search Console** and **Bing Webmaster Tools**.
- Reach out to wildfire/emergency preparedness organizations (CAL FIRE, NFPA, USFS) for backlinks — the `/learning` page already references them.
- Share the tool on Reddit communities like r/WildlandFire, r/California, r/homeowners.

---

## Implementation Checklist

- [ ] Fix CloudFront error pages to return `index.html` for 403/404
- [ ] Implement pre-rendering (`vite-plugin-ssg`) for all routes
- [ ] Update `index.html` with full meta tags, OG tags, canonical link
- [ ] Install `react-helmet-async` and add per-route metadata
- [ ] Add `public/llms.txt` with site summary
- [ ] Add `public/llms-full.txt` with full page content
- [ ] Add `public/robots.txt` allowing GPTBot, ClaudeBot, PerplexityBot, Google-Extended
- [ ] Add `public/sitemap.xml`
- [ ] Add JSON-LD structured data to `index.html`
- [ ] Add `FAQPage` JSON-LD schema to `/learning`
- [ ] Add factual descriptive paragraph to home hero
- [ ] Expand `/learning` with original written content
- [ ] Register on Google Search Console and submit sitemap
- [ ] Run Lighthouse audit and address Core Web Vitals issues
- [ ] Expand `/learning` with original written content

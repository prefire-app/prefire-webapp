# Prefire — Wildfire Defensible Space Analyzer

A web application that helps homeowners and property managers assess and improve their defensible space against wildfires. Users select their county, search for their property address, draw one or more polygons on a satellite map, and submit the area for automated analysis.

---

## Features

- **State & County selection** — choose from supported counties across the western US; unavailable areas are clearly indicated
- **Interactive mapping** — satellite and street layer options with zoom up to level 22, county boundary overlay, and multi-polygon drawing via Leaflet Draw
- **Address search** — geocoding via Nominatim to jump directly to a property
- **Multi-polygon submission** — draw multiple areas in one session and submit them all at once for backend analysis
- **Learning resources** — curated links to defensible space guidelines from CAL FIRE, NFPA, USFS, and Ready for Wildfire

---

## Supported Counties (California)

Alameda · Contra Costa · El Dorado · Los Angeles · Marin · Nevada · Orange · Placer · San Diego · San Mateo · Santa Clara · Santa Cruz · Sonoma

Additional states and counties are in progress.

---

## Tech Stack

| Layer             | Technology                               |
| ----------------- | ---------------------------------------- |
| Frontend          | React 19, TypeScript, Vite               |
| Styling           | Tailwind CSS v4                          |
| Mapping           | Leaflet, React-Leaflet, Leaflet Draw     |
| Geocoding         | OpenStreetMap Nominatim                  |
| County boundaries | Census Bureau TIGERweb API               |
| Backend           | FastAPI (local: `http://127.0.0.1:8000`) |
| Routing           | React Router v7                          |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- A running instance of the Prefire backend API

### Install & run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
  app/
    App.tsx                 # Router setup and layout shell
  components/
    NavBar.tsx              # Top navigation
    HomeHero.tsx            # Landing page hero section
    HomeCTA.tsx             # Call-to-action buttons
    Learning.tsx            # Wildfire learning resources page
    Logo.tsx                # Brand logo
    MappingTool.tsx         # Main map page — orchestrates the full analysis flow
    StateCountySelector.tsx # Step 1: state/county picker with FIPS lookup
    AddressSearchPopup.tsx  # Step 2: address geocoding modal
    ConfirmSubmitPopup.tsx  # Step 3: review and submit drawn polygons
```

---

## User Flow

1. Navigate to **Analyzer** in the nav bar (`/map`)
2. Select your **state and county** from the selector
3. Search for your **property address** to center the map
4. Use the **draw tools** to outline one or more areas of interest
5. Click **Submit** to send the geometry and county FIPS code to the backend for analysis

---

## Backend API

The frontend POSTs to `/send-geometry` on the configured backend:

```
POST http://127.0.0.1:8000/send-geometry
Content-Type: application/json

{
  "fips": "081",
  "geometry": [ ...array of GeoJSON geometry objects... ]
}
```

> To point at a different backend, update `API_URL` in `src/components/ConfirmSubmitPopup.tsx`.

---

## License

Private — all rights reserved.

{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```

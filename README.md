# Prefire — Wildfire Defensible Space Analyzer

A web application that helps homeowners and property managers assess and improve their defensible space against wildfires. Users select their county, search for their property address, draw one or more polygons on a satellite map, and submit the area for automated analysis.

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
- AWS CLI installed and configured (`aws configure`)
- A running instance of the Prefire backend API

### 1. Clone and install

```bash
git clone <repo-url>
cd prefire-webapp
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

```
VITE_API_URL=http://127.0.0.1:8000/send-geometry
```

### 3. Run locally

```bash
npm run dev
```

App runs at `http://localhost:5173`. Changes hot-reload automatically.

### 4. Run a production preview locally

```bash
npm run build
npm run preview
```

Previews the built `dist/` output at `http://localhost:4173`.

---

## Deploying to AWS S3

### Deploy

```bash
./deploy.sh your-bucket-name YOUR_CF_DISTRIBUTION_ID
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

wip

---

## Backend API

The frontend POSTs to `/send-geometry` on the configured backend:

```
POST <VITE_API_URL>
Content-Type: application/json

{
  "fips": "081",
  "email": "user@example.com",
  "geometry": [ ...array of GeoJSON geometry objects... ]
}
```

The backend URL is set via the `VITE_API_URL` environment variable. See `.env.example`.

---

## License

Private — all rights reserved.

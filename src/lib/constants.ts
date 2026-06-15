const PROD_API_BASE = "https://wrtzl2rou1.execute-api.us-east-1.amazonaws.com";
const LOCAL_API_BASE = "http://127.0.0.1:8000";

export const API_BASE_URL: string =
    (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
    (import.meta.env.DEV ? LOCAL_API_BASE : PROD_API_BASE);

export const API_URL = `${API_BASE_URL}/send-geometry`;
export const HEALTH_URL = `${API_BASE_URL}/health`;

export const TIGERWEB_URL =
    "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/1/query";

/** Base URL for per-state building-footprint PMTiles files.
 *  Append a zero-padded state FIPS code + ".pmtiles", e.g. "06.pmtiles" for CA. */
export const PMTILES_BASE_URL =
    "https://prefire-data.s3.us-east-1.amazonaws.com/pmtiles/buildings-";

export const BUILDING_MIN_ZOOM = 13;

/** Default map center (California centroid fallback). */
export const CA_CENTER: [number, number] = [36.7783, -119.4179];

/** Mapbox public token. Restricted to allowed URLs in the Mapbox dashboard. */
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as
    | string
    | undefined;

/** Mapbox raster tile URL templates (require MAPBOX_TOKEN). */
export const MAPBOX_SATELLITE_URL = MAPBOX_TOKEN
    ? `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/512/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`
    : null;

export const MAPBOX_STREETS_URL = MAPBOX_TOKEN
    ? `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/512/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`
    : null;

export const MAPBOX_ATTRIBUTION =
    '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>';

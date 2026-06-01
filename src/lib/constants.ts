export const API_URL =
    import.meta.env.NODE_ENV === "local"
        ? "http://127.0.0.1:8000/send-geometry"
        : "https://wrtzl2rou1.execute-api.us-east-1.amazonaws.com/send-geometry";

export const TIGERWEB_URL =
    "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/1/query";

export const PMTILES_URL =
    "https://prefire-dev-data.s3.us-east-1.amazonaws.com/pmtiles/buildings-ca.pmtiles";

export const BUILDING_MIN_ZOOM = 12;

/** Default map center (California centroid fallback). */
export const CA_CENTER: [number, number] = [36.7783, -119.4179];

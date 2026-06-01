export type State = {
    name: string;
    code: string;
    fips: string;
    available: boolean;
};

export type County = {
    name: string;
    fips: string;
    centroid: [number, number];
};

export const STATES: State[] = [
    { name: "California", code: "CA", fips: "06", available: true },
    { name: "Oregon", code: "OR", fips: "41", available: false },
    { name: "Washington", code: "WA", fips: "53", available: false },
    { name: "Idaho", code: "ID", fips: "16", available: false },
    { name: "Montana", code: "MT", fips: "30", available: false },
    { name: "Wyoming", code: "WY", fips: "56", available: false },
    { name: "Colorado", code: "CO", fips: "08", available: false },
    { name: "Utah", code: "UT", fips: "49", available: false },
    { name: "Arizona", code: "AZ", fips: "04", available: false },
    { name: "New Mexico", code: "NM", fips: "35", available: false },
];

export const COUNTIES: Record<string, County[]> = {
    CA: [
        { name: "Alameda", fips: "001", centroid: [37.6483, -121.892] },
        { name: "Alpine", fips: "003", centroid: [38.597, -119.825] },
        { name: "Amador", fips: "005", centroid: [38.447, -120.651] },
        { name: "Butte", fips: "007", centroid: [39.667, -121.601] },
        { name: "Calaveras", fips: "009", centroid: [38.19, -120.556] },
        { name: "Colusa", fips: "011", centroid: [39.178, -122.237] },
        { name: "Contra Costa", fips: "013", centroid: [37.9161, -121.9] },
        { name: "Del Norte", fips: "015", centroid: [41.744, -123.923] },
        { name: "El Dorado", fips: "017", centroid: [38.6872, -120.54] },
        { name: "Fresno", fips: "019", centroid: [36.875, -119.272] },
        { name: "Glenn", fips: "021", centroid: [39.598, -122.393] },
        { name: "Humboldt", fips: "023", centroid: [40.707, -123.865] },
        { name: "Imperial", fips: "025", centroid: [33.044, -115.357] },
        { name: "Inyo", fips: "027", centroid: [36.514, -117.398] },
        { name: "Kern", fips: "029", centroid: [35.343, -118.731] },
        { name: "Kings", fips: "031", centroid: [36.068, -119.815] },
        { name: "Lake", fips: "033", centroid: [39.099, -122.754] },
        { name: "Lassen", fips: "035", centroid: [40.674, -120.596] },
        { name: "Los Angeles", fips: "037", centroid: [34.3073, -118.227] },
        { name: "Madera", fips: "039", centroid: [37.217, -119.763] },
        { name: "Marin", fips: "041", centroid: [38.084, -122.734] },
        { name: "Mariposa", fips: "043", centroid: [37.576, -119.904] },
        { name: "Mendocino", fips: "045", centroid: [39.429, -123.395] },
        { name: "Merced", fips: "047", centroid: [37.19, -120.718] },
        { name: "Modoc", fips: "049", centroid: [41.588, -120.727] },
        { name: "Mono", fips: "051", centroid: [37.938, -118.885] },
        { name: "Monterey", fips: "053", centroid: [36.24, -121.308] },
        { name: "Napa", fips: "055", centroid: [38.503, -122.276] },
        { name: "Nevada", fips: "057", centroid: [39.304, -120.778] },
        { name: "Orange", fips: "059", centroid: [33.717, -117.831] },
        { name: "Placer", fips: "061", centroid: [39.092, -120.804] },
        { name: "Plumas", fips: "063", centroid: [40.001, -120.835] },
        { name: "Riverside", fips: "065", centroid: [33.745, -115.994] },
        { name: "Sacramento", fips: "067", centroid: [38.449, -121.34] },
        { name: "San Benito", fips: "069", centroid: [36.604, -121.077] },
        { name: "San Bernardino", fips: "071", centroid: [34.842, -116.174] },
        { name: "San Diego", fips: "073", centroid: [33.028, -116.735] },
        { name: "San Francisco", fips: "075", centroid: [37.773, -122.445] },
        { name: "San Joaquin", fips: "077", centroid: [37.927, -121.271] },
        { name: "San Luis Obispo", fips: "079", centroid: [35.388, -120.452] },
        { name: "San Mateo", fips: "081", centroid: [37.434, -122.344] },
        { name: "Santa Barbara", fips: "083", centroid: [34.537, -119.793] },
        { name: "Santa Clara", fips: "085", centroid: [37.233, -121.696] },
        { name: "Santa Cruz", fips: "087", centroid: [37.046, -122.023] },
        { name: "Shasta", fips: "089", centroid: [40.787, -122.014] },
        { name: "Sierra", fips: "091", centroid: [39.577, -120.522] },
        { name: "Siskiyou", fips: "093", centroid: [41.592, -122.543] },
        { name: "Solano", fips: "095", centroid: [38.269, -121.939] },
        { name: "Sonoma", fips: "097", centroid: [38.528, -122.928] },
        { name: "Stanislaus", fips: "099", centroid: [37.56, -120.999] },
        { name: "Sutter", fips: "101", centroid: [39.035, -121.695] },
        { name: "Tehama", fips: "103", centroid: [40.124, -122.23] },
        { name: "Trinity", fips: "105", centroid: [40.649, -123.113] },
        { name: "Tulare", fips: "107", centroid: [36.219, -118.789] },
        { name: "Tuolumne", fips: "109", centroid: [38.027, -119.956] },
        { name: "Ventura", fips: "111", centroid: [34.358, -119.137] },
        { name: "Yolo", fips: "113", centroid: [38.683, -121.9] },
        { name: "Yuba", fips: "115", centroid: [39.27, -121.373] },
    ],
};

import { Link } from "react-router-dom";

const pipelineSources = [
    {
        name: "NAIP Aerial Imagery",
        category: "Imagery — Tree Detection",
        description:
            "National Agriculture Imagery Program (NAIP) 4-band (RGB + near-infrared) imagery at 1 m/pixel resolution. The primary input to the ML pipeline — used by DeepForest for object detection, NDVI segmentation for vegetation classification, and SAM 2 for mask refinement. NAIP is collected by the USDA and is freely available for the contiguous United States.",
        url: "https://naip-usdaonline.hub.arcgis.com/",
    },
    {
        name: "USGS 3DEP Elevation",
        category: "Elevation — Slope Analysis",
        description:
            "USGS 3D Elevation Program (3DEP) 1 m digital elevation model. A slope raster is derived from this DEM and sampled at each detected tree crown's centroid. The resulting slope percentage determines which CAL FIRE horizontal spacing rule applies to that tree — stricter spacing is required on steeper terrain.",
        url: "https://www.usgs.gov/3d-elevation-program",
    },
    {
        name: "Microsoft Building Footprints",
        category: "Building Footprints — Zone Computation",
        description:
            "Building polygon dataset derived from the Microsoft US Building Footprints project, served via PMTiles HTTP range requests. Used by the pipeline to snap user-drawn polygons to known structure outlines and compute the defensible space zone buffers (0, 2, 10, and 30 m rings). When PMTiles data is unavailable for a region, OpenStreetMap building data is used as a fallback.",
        url: "https://github.com/microsoft/USBuildingFootprints",
    },
    {
        name: "CAL FIRE Fire Hazard Severity Zones",
        category: "Risk Context — FHSZ Score",
        description:
            "CAL FIRE's official FHSZ classification for every parcel in California: Moderate, High, or Very High. The classification for your property's centroid is looked up at analysis time and contributes up to 15 points to the overall risk score as a community-level context multiplier. A lookup failure does not abort the job — it is treated as 0 FHSZ points.",
        url: "https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones",
    },
    {
        name: "DeepForest & SAM 2",
        category: "ML Models — Tree Detection",
        description:
            "Two open-source models power the tree detection stage. DeepForest (Weecology) is a deep learning model trained on aerial RGB imagery to detect tree crowns as bounding boxes. SAM 2 (Meta / Facebook) is a segment-anything model that refines each detected bounding box into a precise pixel-level crown mask. Both models are baked into the inference container and run entirely within our infrastructure — no third-party inference API is used.",
        url: "https://deepforest.readthedocs.io/",
    },
];

const mapSources = [
    {
        name: "ESRI World Imagery",
        category: "Satellite Tiles",
        description:
            "High-resolution satellite and aerial imagery used as the primary basemap in the map tool. Served via ArcGIS Online tile servers at zoom levels up to 22.",
        url: "https://www.esri.com/en-us/home",
    },
    {
        name: "ESRI World Topo Map",
        category: "Street / Topo Tiles",
        description:
            "Alternative basemap showing roads, terrain, and labels — useful for navigating to a property when satellite imagery alone is unclear.",
        url: "https://www.esri.com/en-us/home",
    },
    {
        name: "Microsoft Building Footprints (map overlay)",
        category: "Building Footprint Overlay",
        description:
            "The same Microsoft Building Footprints dataset is also displayed as an optional visual overlay in the map tool (served as PMTiles from Amazon S3). This helps users accurately draw polygons around their structures without guessing structure edges from satellite imagery alone.",
        url: "https://github.com/microsoft/USBuildingFootprints",
    },
    {
        name: "U.S. Census TIGERweb API",
        category: "County Boundaries",
        description:
            "Real-time county boundary polygons fetched from the Census Bureau's TIGERweb REST API. Rendered as a GeoJSON overlay on the map to help users orient themselves within their selected county.",
        url: "https://tigerweb.geo.census.gov/tigerwebmain/TIGERweb_main.html",
    },
    {
        name: "Nominatim / OpenStreetMap",
        category: "Address Search",
        description:
            "Geocoding API used to convert a user-entered address into map coordinates. Powered by OpenStreetMap data via the public Nominatim service.",
        url: "https://nominatim.org/",
    },
];

function SourceCard({ name, category, description, url }: { name: string; category: string; description: string; url: string }) {
    return (
        <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                    <span className="text-[#D8BD8A] text-xs font-semibold uppercase tracking-widest opacity-70">
                        {category}
                    </span>
                    <h2 className="text-[#efefd1] font-semibold text-base mt-0.5">
                        {name}
                    </h2>
                </div>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D8BD8A] text-xs underline opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap mt-1"
                >
                    Source ↗
                </a>
            </div>
            <p className="text-[#efefd1] text-sm opacity-75 leading-relaxed">
                {description}
            </p>
        </div>
    );
}

export default function AboutData() {
    return (
        <div className="max-w-3xl mx-auto py-12 md:py-20 px-4 md:px-8 text-[#efefd1]">
            <Link
                to="/about"
                className="text-[#D8BD8A] text-sm opacity-70 hover:opacity-100 hover:underline mb-8 inline-block transition-opacity"
            >
                ← About
            </Link>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">Data Sources</h1>
            <p className="text-[#efefd1] opacity-80 text-lg leading-relaxed mb-10">
                Prefire is built entirely on publicly available geospatial data and
                open-source models. No proprietary or commercially licensed datasets are
                used. Sources fall into two categories: those that power the analysis
                pipeline, and those that power the map interface.
            </p>

            <h2 className="text-[#D8BD8A] font-semibold text-sm uppercase tracking-widest opacity-70 mb-3">
                Analysis Pipeline
            </h2>
            <div className="space-y-4 mb-10">
                {pipelineSources.map((s) => (
                    <SourceCard key={s.name} {...s} />
                ))}
            </div>

            <h2 className="text-[#D8BD8A] font-semibold text-sm uppercase tracking-widest opacity-70 mb-3">
                Map & Interface
            </h2>
            <div className="space-y-4">
                {mapSources.map((s) => (
                    <SourceCard key={s.name} {...s} />
                ))}
            </div>

            <div className="mt-8 border border-[#D8BD8A] border-opacity-20 rounded-xl p-5 bg-[#D8BD8A] bg-opacity-5">
                <h2 className="text-[#4F3130] font-semibold text-sm mb-2">
                    Coverage Note
                </h2>
                <p className="text-[#4F3130] text-sm opacity-70 leading-relaxed">
                    NAIP imagery, 3DEP elevation, and FHSZ data are currently available
                    for California only. Building footprint coverage follows the same
                    boundary. Expanding to additional states requires sourcing equivalent
                    state-level datasets and extending the data pipeline.
                </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
                <Link
                    to="/about/tool"
                    className="text-[#D8BD8A] text-sm underline hover:opacity-70 transition-opacity"
                >
                    How the tool uses this data →
                </Link>
                <Link
                    to="/about/methodology"
                    className="text-[#D8BD8A] text-sm underline hover:opacity-70 transition-opacity"
                >
                    How the score is calculated →
                </Link>
                <Link
                    to="/about/contact"
                    className="text-[#D8BD8A] text-sm underline hover:opacity-70 transition-opacity"
                >
                    Have a dataset to share? →
                </Link>
            </div>
        </div>
    );
}


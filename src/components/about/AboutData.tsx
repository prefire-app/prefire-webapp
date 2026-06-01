import { Link } from "react-router-dom";

const pipelineSources = [
    {
        name: "NAIP Aerial Imagery",
        category: "Imagery — Tree Detection",
        url: "https://naip-usdaonline.hub.arcgis.com/",
    },
    {
        name: "USGS 3DEP Elevation",
        category: "Elevation — Slope Analysis",
        url: "https://www.usgs.gov/3d-elevation-program",
    },
    {
        name: "Microsoft Building Footprints",
        category: "Building Footprints — Zone Computation",
        url: "https://github.com/microsoft/USBuildingFootprints",
    },
    {
        name: "CAL FIRE Fire Hazard Severity Zones",
        category: "Risk Context — FHSZ Score",
        url: "https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones",
    },
    {
        name: "DeepForest & SAM 2",
        category: "ML Models — Tree Detection",
        url: "https://deepforest.readthedocs.io/",
    },
];

const mapSources = [
    {
        name: "ESRI World Imagery",
        category: "Satellite Tiles",
        url: "https://www.esri.com/en-us/home",
    },
    {
        name: "ESRI World Topo Map",
        category: "Street / Topo Tiles",
        url: "https://www.esri.com/en-us/home",
    },
    {
        name: "Microsoft Building Footprints (map overlay)",
        category: "Building Footprint Overlay",
        url: "https://github.com/microsoft/USBuildingFootprints",
    },
    {
        name: "U.S. Census TIGERweb API",
        category: "County Boundaries",
        url: "https://tigerweb.geo.census.gov/tigerwebmain/TIGERweb_main.html",
    },
    {
        name: "Nominatim / OpenStreetMap",
        category: "Address Search",
        url: "https://nominatim.org/",
    },
];

function SourceCard({ name, category, url }: { name: string; category: string; url: string }) {
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
                open-source models.
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


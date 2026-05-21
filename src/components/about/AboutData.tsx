import { Link } from "react-router-dom";

const sources = [
    {
        name: "ESRI World Imagery",
        category: "Satellite Tiles",
        description:
            "High-resolution satellite and aerial imagery used as the primary basemap. Served via ArcGIS Online tile servers at zoom levels up to 22.",
        url: "https://www.esri.com/en-us/home",
    },
    {
        name: "U.S. Census TIGERweb API",
        category: "County Boundaries",
        description:
            "Real-time county boundary polygons fetched from the Census Bureau's TIGERweb REST API. Used to render county outlines on the map and validate user location.",
        url: "https://tigerweb.geo.census.gov/tigerwebmain/TIGERweb_main.html",
    },
    {
        name: "Microsoft Building Footprints (via PMTiles)",
        category: "Building Footprints",
        description:
            "Building footprint polygons derived from the Microsoft US Building Footprints dataset, processed into PMTiles format and hosted on Amazon S3. Displayed as an optional overlay to help users accurately draw polygons around their structures.",
        url: "https://github.com/microsoft/USBuildingFootprints",
    },
    {
        name: "Nominatim / OpenStreetMap",
        category: "Address Search",
        description:
            "Geocoding API used to convert user-entered addresses to map coordinates. Powered by OpenStreetMap data via the Nominatim service.",
        url: "https://nominatim.org/",
    },
    {
        name: "ESRI World Topo Map",
        category: "Street / Topo Tiles",
        description:
            "Alternative basemap tile layer showing roads, terrain, and labels — useful for navigating to a property when satellite imagery alone is unclear.",
        url: "https://www.esri.com/en-us/home",
    },
];

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
                Prefire is built on publicly available geospatial data. All external
                datasets are either fetched at runtime from public APIs or pre-processed
                and hosted for efficient delivery. No proprietary or third-party
                commercial data is used.
            </p>

            <div className="space-y-4">
                {sources.map(({ name, category, description, url }) => (
                    <div
                        key={name}
                        className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5"
                    >
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
                ))}
            </div>

            <div className="mt-8 border border-[#D8BD8A] border-opacity-20 rounded-xl p-5 bg-[#D8BD8A] bg-opacity-5">
                <h2 className="text-[#D8BD8A] font-semibold text-sm mb-2">
                    Coverage Note
                </h2>
                <p className="text-[#efefd1] text-sm opacity-70 leading-relaxed">
                    Building footprint coverage is currently focused on California.
                    Expanding to additional states is an ongoing effort — the PMTiles
                    pipeline can be extended to any region where compatible footprint data
                    is available.
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

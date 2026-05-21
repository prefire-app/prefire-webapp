import { Link } from "react-router-dom";

export default function AboutTool() {
    return (
        <div className="max-w-3xl mx-auto py-12 md:py-20 px-4 md:px-8 text-[#efefd1]">
            <Link
                to="/about"
                className="text-[#D8BD8A] text-sm opacity-70 hover:opacity-100 hover:underline mb-8 inline-block transition-opacity"
            >
                ← About
            </Link>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">The Analyzer</h1>
            <p className="text-[#efefd1] opacity-80 text-lg leading-relaxed mb-10">
                The Prefire Defensible Space Analyzer combines interactive mapping,
                satellite imagery, and a property questionnaire (coming soon) to estimate how well a
                home's surroundings comply with various fire-safe regulations.
            </p>

            <div className="space-y-6">
                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        What It Does
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        Prefire gives homeowners a free, self-service way to assess their
                        property's wildfire risk. Users navigate to their property on a
                        satellite map, draw polygons around their structures, and complete a
                        short questionnaire about their site conditions. That data is fed into
                        a model that estimates defensible space compliance and produces a
                        personalized report with actionable recommendations.{" "}
                        <Link
                            to="/about/methodology"
                            className="text-[#D8BD8A] underline hover:opacity-70 transition-opacity"
                        >
                            How the score is calculated →
                        </Link>
                    </p>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        The Mapping Layer
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed mb-3">
                        The map is built on{" "}
                        <span className="text-[#D8BD8A] font-medium">Leaflet</span>, an
                        open-source JavaScript mapping library.
                    </p>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        County boundaries are fetched in real time from the{" "}
                        <span className="text-[#D8BD8A] font-medium">U.S. Census TIGERweb</span>{" "}
                        API and rendered as a GeoJSON overlay to help users orient themselves
                        within their county.
                    </p>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Building Footprint Overlay
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        An optional building footprints layer is served as{" "}
                        <span className="text-[#D8BD8A] font-medium">PMTiles</span> from
                        Amazon S3 — shows known structure outlines on the map. This helps
                        users accurately place their polygons without having to eyeball
                        structure edges from satellite imagery alone. PMTiles is a cloud-native
                        tile format that allows efficient, range-request-based delivery of
                        vector tiles without a tile server.
                    </p>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Tech Stack
                    </h2>
                    <ul className="text-[#efefd1] text-sm opacity-80 leading-relaxed space-y-1 list-disc list-inside">
                        <li>
                            <span className="text-[#D8BD8A] font-medium">Frontend:</span> React
                            + TypeScript, built with Vite, styled with Tailwind CSS
                        </li>
                        <li>
                            <span className="text-[#D8BD8A] font-medium">Mapping:</span> Leaflet,
                            Leaflet Draw, Protomaps Leaflet for PMTiles rendering
                        </li>
                        <li>
                            <span className="text-[#D8BD8A] font-medium">Data delivery:</span>{" "}
                            PMTiles hosted on Amazon S3
                        </li>
                        <li>
                            <span className="text-[#D8BD8A] font-medium">Hosting:</span> Static
                            site deployed to Amazon S3 + CloudFront CDN with pre-rendered HTML
                            for SEO
                        </li>
                        <li>
                            <span className="text-[#D8BD8A] font-medium">Address search:</span>{" "}
                            Nominatim geocoding API
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
                <Link
                    to="/map"
                    className="text-[#D8BD8A] text-sm underline hover:opacity-70 transition-opacity"
                >
                    Try the analyzer →
                </Link>
                <Link
                    to="/about/methodology"
                    className="text-[#D8BD8A] text-sm underline hover:opacity-70 transition-opacity"
                >
                    How the score is calculated →
                </Link>
                <Link
                    to="/about/data"
                    className="text-[#D8BD8A] text-sm underline hover:opacity-70 transition-opacity"
                >
                    Data sources →
                </Link>
            </div>
        </div>
    );
}

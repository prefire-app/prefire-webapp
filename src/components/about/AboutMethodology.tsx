import { Link } from "react-router-dom";

export default function AboutMethodology() {
    return (
        <div className="max-w-3xl mx-auto py-12 md:py-20 px-4 md:px-8 text-[#efefd1]">
            <Link
                to="/about"
                className="text-[#D8BD8A] text-sm opacity-70 hover:opacity-100 hover:underline mb-8 inline-block transition-opacity"
            >
                ← About
            </Link>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">Methodology</h1>
            <p className="text-[#efefd1] opacity-80 text-lg leading-relaxed mb-2">
                Our defensible space assessment is based on California's fire-safe
                regulations and NFPA 1144 standards. The scoring methodology is actively
                being developed and refined as we gather more data and feedback.
            </p>
            <p className="text-[#efefd1] opacity-50 text-sm mb-10">
                Last updated May 2026
            </p>

            <div className="space-y-6">
                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Defensible Space Zones
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed mb-3">
                        California law (PRC § 4291) defines two primary defensible space
                        zones around structures. Our assessment evaluates compliance with
                        both:
                    </p>
                    <ul className="space-y-3">
                        <li className="border border-[#D8BD8A] border-opacity-20 rounded-lg p-3">
                            <span className="text-[#D8BD8A] font-semibold text-sm">
                                Zone 1 — Lean, Clean & Green (0–30 ft)
                            </span>
                            <p className="text-[#efefd1] text-xs opacity-80 leading-relaxed mt-1">
                                The highest-priority zone immediately surrounding your home.
                                Vegetation must be well-irrigated and spaced to prevent fire
                                from reaching the structure. Dead plants, dry leaves, and wood
                                piles must be removed. This zone has the most direct impact on
                                whether a home survives a wildfire.
                            </p>
                        </li>
                        <li className="border border-[#D8BD8A] border-opacity-20 rounded-lg p-3">
                            <span className="text-[#D8BD8A] font-semibold text-sm">
                                Zone 2 — Reduced Fuel (30–100 ft)
                            </span>
                            <p className="text-[#efefd1] text-xs opacity-80 leading-relaxed mt-1">
                                A wider buffer where vegetation density and spacing are managed
                                to slow the spread of fire toward the structure. Trees should
                                be spaced so canopies don't touch, and shrubs should be pruned
                                and thinned. This zone is especially important on slopes, where
                                fire spreads faster uphill.
                            </p>
                        </li>
                    </ul>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Inputs to the Assessment
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed mb-3">
                        The analysis draws from three sources of information:
                    </p>
                    <ul className="text-[#efefd1] text-sm opacity-80 leading-relaxed space-y-2 list-disc list-inside">
                        <li>
                            <span className="text-[#D8BD8A] font-medium">User-drawn polygons</span>{" "}
                            — the geometry you draw around your structures establishes the
                            footprint from which Zone 1 and Zone 2 boundaries are computed
                        </li>
                        <li>
                            <span className="text-[#D8BD8A] font-medium">Property questionnaire</span>{" "}
                            — answers about vegetation type and density, roof and siding
                            materials, slope, access road width, and other site-specific
                            factors that can't be derived from aerial data alone
                        </li>
                        <li>
                            <span className="text-[#D8BD8A] font-medium">Building footprint data</span>{" "}
                            — known structure outlines used to cross-check drawn polygons and
                            identify any unclaimed structures on the parcel
                        </li>
                    </ul>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        What the Score Means
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        The score is a relative compliance estimate — not a formal
                        inspection result, legal certification, or insurance determination.
                        It is designed to identify which aspects of your property most need
                        attention and prioritize the highest-impact improvements. Always
                        consult your local fire agency for authoritative guidance.
                    </p>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Actively Evolving
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        The scoring algorithm is under active development. We are currently
                        working to incorporate satellite-derived vegetation density
                        (NDVI/canopy cover) and historical fire perimeter data to make the
                        assessment more accurate and data-driven. If you have feedback on the
                        methodology or access to relevant datasets, we'd love to hear from
                        you.
                    </p>
                    <Link
                        to="/about/contact"
                        className="text-[#D8BD8A] text-sm underline hover:opacity-70 transition-opacity inline-block mt-3"
                    >
                        Get in touch →
                    </Link>
                </div>
            </div>
        </div>
    );
}

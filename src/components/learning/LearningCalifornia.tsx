import { Link } from "react-router-dom";

const EXTERNAL_LINK = "text-[#D8BD8A] underline hover:opacity-70 transition-opacity";
const INTERNAL_LINK = "text-[#D8BD8A] underline hover:opacity-70 transition-opacity";

export default function LearningCalifornia() {
    return (
        <div className="max-w-3xl mx-auto py-12 md:py-20 px-4 md:px-8 text-[#efefd1]">
            <Link
                to="/learning"
                className="text-[#D8BD8A] text-sm opacity-70 hover:opacity-100 hover:underline mb-8 inline-block transition-opacity"
            >
                ← Learning Resources
            </Link>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">California</h1>
            <p className="text-[#efefd1] opacity-80 text-lg leading-relaxed mb-10">
                California faces more wildfire risk than any other U.S. state. The Prefire
                analyzer is currently available for select California communities. These
                resources cover the state-specific regulations, risk maps, and programs
                that affect California homeowners.
            </p>

            <div className="space-y-6">
                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Fire Hazard Severity Zones (FHSZ)
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed mb-3">
                        CAL FIRE maps the entire state into Moderate, High, and Very High Fire
                        Hazard Severity Zones based on fuel, slope, fire weather, and ember
                        production. Your zone determines which state regulations apply to your
                        property and affects insurance availability and local fire code
                        requirements. Prefire uses FHSZ data to set baseline risk context for
                        your area.
                    </p>
                    <a
                        href="https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones"
                        className={EXTERNAL_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View the CAL FIRE FHSZ map ↗
                    </a>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Public Resources Code § 4291 — The 100-Foot Rule
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed mb-3">
                        California's foundational defensible space law requires all structures
                        in or adjacent to a State Responsibility Area to maintain 100 feet of
                        defensible space — or to the property line if it is closer. This
                        covers the two main zones (Zone 1: 5–30 ft, Zone 2: 30–100 ft) and
                        sets requirements for vegetation clearance, ladder fuel removal, and
                        tree spacing. Local fire agencies may enforce stricter standards.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PRC&sectionNum=4291."
                            className={EXTERNAL_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read PRC § 4291 ↗
                        </a>
                        <Link to="/about/methodology" className={INTERNAL_LINK}>
                            How Prefire scores compliance →
                        </Link>
                    </div>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        AB 3074 (2021) — The Zone 0 Requirement
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed mb-3">
                        Assembly Bill 3074, signed in 2020 and phased in starting in 2023,
                        created a mandatory{" "}
                        <strong className="text-[#efefd1]">Zone 0 (0–5 ft)</strong> ember-resistant
                        zone immediately around structures. In this zone, all combustible
                        material must be removed: wood mulch, dead vegetation, wood piles, and
                        combustible furniture. Non-combustible hardscaping, concrete, and
                        ember-resistant vents are encouraged. This zone directly addresses the
                        leading cause of home ignition during wildfires.
                    </p>
                    <a
                        href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB3074"
                        className={EXTERNAL_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read AB 3074 ↗
                    </a>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        CAL FIRE Resources
                    </h2>
                    <ul className="space-y-2 text-sm">
                        {[
                            {
                                href: "https://www.readyforwildfire.org/prepare-for-wildfire/defensible-space",
                                label: "Ready for Wildfire — Defensible Space Guidelines ↗",
                            },
                            {
                                href: "https://www.readyforwildfire.org/",
                                label: "Ready for Wildfire — CAL FIRE Public Education ↗",
                            },
                            {
                                href: "https://www.fire.ca.gov/incidents/",
                                label: "CAL FIRE Active Incidents Map ↗",
                            },
                        ].map(({ href, label }) => (
                            <li key={href}>
                                <a
                                    href={href}
                                    className={EXTERNAL_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Use Prefire for Your California Property
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed mb-4">
                        The Prefire analyzer is available for select California communities.
                        Draw your property on the map, answer a short questionnaire, and get
                        a personalized defensible space compliance estimate based on the
                        regulations above.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            to="/map"
                            className="rounded-md bg-[#efefd1] px-4 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 transition-colors"
                        >
                            Try the Analyzer
                        </Link>
                        <Link to="/about/tool" className={`${INTERNAL_LINK} text-sm self-center`}>
                            How it works →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

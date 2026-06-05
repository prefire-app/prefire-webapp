import { Link } from "react-router-dom";
import { EXTERNAL_LINK, INTERNAL_LINK } from "../lib/styles";

interface TopicCardProps {
    title: string;
    children: React.ReactNode;
}

function TopicCard({ title, children }: TopicCardProps) {
    return (
        <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
            <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">{title}</h2>
            <div className="text-[#efefd1] text-sm opacity-80 leading-relaxed space-y-2">
                {children}
            </div>
        </div>
    );
}

export default function Learning() {
    return (
        <div className="max-w-3xl mx-auto py-12 md:py-20 px-4 md:px-8 text-[#efefd1]">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Learning Resources</h1>
            <p className="text-[#efefd1] opacity-80 text-lg leading-relaxed mb-10">
                Defensible space is one of the most effective things a homeowner can do to
                protect their property from wildfire.
            </p>

            {/* Topic cards */}
            <div className="space-y-6 mb-16">
                <TopicCard title="What Is Defensible Space?">
                    <p>
                        Defensible space is the buffer of cleared and managed vegetation around
                        a structure that slows the spread of fire and gives firefighters room to
                        work. California law divides it into three zones based on distance from
                        the structure — Zone 0 (0–5 ft), Zone 1 (5–30 ft), and Zone 2 (30–100 ft)
                        — each with its own requirements.
                    </p>
                    <p>
                        <Link to="/about/methodology" className={INTERNAL_LINK}>
                            See the full zone breakdown →
                        </Link>
                    </p>
                </TopicCard>

                <TopicCard title="California Fire-Safe Regulations">
                    <p>
                        California's primary defensible space law is{" "}
                        <strong className="text-[#efefd1]">Public Resources Code § 4291</strong>,
                        which requires homeowners in State Responsibility Areas to maintain 100 ft
                        of clearance. In 2021,{" "}
                        <strong className="text-[#efefd1]">AB 3074</strong> added the Zone 0
                        ember-resistant zone (0–5 ft) as a new requirement, phased in starting in 2023.
                    </p>
                    <p>
                        <Link to="/about/methodology" className={INTERNAL_LINK}>
                            How Prefire scores compliance →
                        </Link>
                    </p>
                </TopicCard>

                <TopicCard title="How Slope Affects Fire Risk and Spacing">
                    <p>
                        Fire spreads significantly faster uphill roughly doubling in speed for every
                        10° of slope. California regulations account for this by tightening horizontal
                        tree-spacing requirements on steeper terrain. A tree that meets spacing rules
                        on flat ground may be too close on a 30% slope.
                    </p>
                    <p>
                        <Link to="/about/methodology" className={INTERNAL_LINK}>
                            How Prefire applies slope data →
                        </Link>
                    </p>
                </TopicCard>

                <TopicCard title="Home Hardening — Roof, Vents, and Siding">
                    <p>
                        Most homes ignite not from direct flame contact but from embers landing in
                        vulnerable spots; wood shake roofs, open vents, and combustible siding are
                        the biggest risks. Upgrading to Class A roofing, installing ember-resistant
                        vent covers, and replacing wood siding with fiber cement or stucco are among
                        the highest-impact changes a homeowner can make.
                    </p>
                    <p>
                        <a
                            href="https://ibhs.org/wildfireready/"
                            className={EXTERNAL_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            IBHS: Wildfire Ready Home Guide ↗
                        </a>
                        {" · "}
                        <a
                            href="https://www.readyforwildfire.org/prepare-for-wildfire/hardening-your-home"
                            className={EXTERNAL_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ready for Wildfire: Harden Your Home ↗
                        </a>
                    </p>
                </TopicCard>

                <TopicCard title="Evacuation Planning">
                    <p>
                        Having a plan before a fire starts is critical since wildfires can move faster
                        than evacuation orders. Know your evacuation routes, have a go-bag ready,
                        sign up for local emergency alerts, and establish a family meeting point
                        outside the fire zone.
                    </p>
                    <p>
                        <a
                            href="https://www.ready.gov/wildfires"
                            className={EXTERNAL_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ready.gov: Wildfire Preparedness ↗
                        </a>
                        {" · "}
                        <a
                            href="https://www.readyforwildfire.org/prepare-for-wildfire/go-evacuation-guide"
                            className={EXTERNAL_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ready for Wildfire: Go! Evacuation Guide ↗
                        </a>
                    </p>
                </TopicCard>

                <TopicCard title="How to Use the Prefire Analyzer">
                    <p>
                        The Prefire analyzer lets you draw your property on a satellite map,
                        answer a short questionnaire about site conditions, and receive a
                        personalized defensible space compliance estimate. No account required and
                        it's free to use.
                    </p>
                    <p>
                        <Link to="/map" className={INTERNAL_LINK}>
                            Try the analyzer →
                        </Link>
                        {" · "}
                        <Link to="/about/tool" className={INTERNAL_LINK}>
                            How it works →
                        </Link>
                    </p>
                </TopicCard>
            </div>

            {/* By State */}
            <h2 className="text-2xl md:text-3xl font-bold mb-2">By State</h2>
            <p className="text-[#efefd1] opacity-60 text-sm mb-6">
                State-specific resources for regulations, risk maps, and local programs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
                <Link
                    to="/learning/california"
                    className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5 hover:border-opacity-70 transition-all group"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[#efefd1] font-semibold">California</span>
                        <span className="text-[#4F3130] text-xs bg-[#D8BD8A] bg-opacity-10 px-2 py-0.5 rounded-full">
                            Supported
                        </span>
                    </div>
                    <p className="text-[#efefd1] text-xs opacity-60 mt-1 leading-relaxed">
                        PRC § 4291, AB 3074, CAL FIRE FHSZ, USFS Wildfire Hazard Potential
                    </p>
                    <span className="text-[#D8BD8A] text-xs underline mt-3 inline-block group-hover:opacity-100 opacity-70">
                        View California resources →
                    </span>
                </Link>

                <div className="border border-[#D8BD8A] border-opacity-10 rounded-xl p-5 opacity-40">
                    <div className="flex items-center justify-between">
                        <span className="text-[#efefd1] font-semibold">Oregon</span>
                        <span className="text-[#4F3130] text-xs bg-[#D8BD8A] bg-opacity-10 px-2 py-0.5 rounded-full">
                            Coming Soon
                        </span>
                    </div>
                    <p className="text-[#efefd1] text-xs opacity-60 mt-1 leading-relaxed">
                        ORS Chapter 477, Oregon Department of Forestry resources
                    </p>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-10 rounded-xl p-5 opacity-40">
                    <div className="flex items-center justify-between">
                        <span className="text-[#efefd1] font-semibold">Colorado</span>
                        <span className="text-[#efefd1] text-xs opacity-50 bg-white bg-opacity-10 px-2 py-0.5 rounded-full">
                            Coming Soon
                        </span>
                    </div>
                    <p className="text-[#efefd1] text-xs opacity-60 mt-1 leading-relaxed">
                        Colorado State Forest Service, defensible space guidelines
                    </p>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-10 rounded-xl p-5 opacity-40">
                    <div className="flex items-center justify-between">
                        <span className="text-[#efefd1] font-semibold">Washington</span>
                        <span className="text-[#efefd1] text-xs opacity-50 bg-white bg-opacity-10 px-2 py-0.5 rounded-full">
                            Coming Soon
                        </span>
                    </div>
                    <p className="text-[#efefd1] text-xs opacity-60 mt-1 leading-relaxed">
                        DNR resources, wildfire risk map, county OES contacts
                    </p>
                </div>
            </div>

            {/* All Resources */}
            <h2 className="text-2xl md:text-3xl font-bold mb-6">All Resources</h2>
            <ul className="space-y-3">
                {[
                    {
                        href: "https://www.readyforwildfire.org/prepare-for-wildfire/defensible-space",
                        label: "Defensible Space — Ready for Wildfire (CAL FIRE)",
                    },
                    {
                        href: "https://www.readyforwildfire.org/prepare-for-wildfire/hardening-your-home",
                        label: "Hardening Your Home — Ready for Wildfire (CAL FIRE)",
                    },
                    {
                        href: "https://ibhs.org/wildfireready/",
                        label: "Wildfire Ready Home Guide — IBHS",
                    },
                    {
                        href: "https://www.ready.gov/wildfires",
                        label: "Wildfire Preparedness — Ready.gov (FEMA)",
                    },
                    {
                        href: "https://www.fs.usda.gov/managing-land/fire",
                        label: "Wildfire Management — U.S. Forest Service",
                    },
                ].map(({ href, label }) => (
                    <li key={href}>
                        <a
                            href={href}
                            className={EXTERNAL_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {label} ↗
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

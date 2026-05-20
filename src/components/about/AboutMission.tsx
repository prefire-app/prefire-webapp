import { Link } from "react-router-dom";

export default function AboutMission() {
    return (
        <div className="max-w-3xl mx-auto py-12 md:py-20 px-4 md:px-8 text-[#efefd1]">
            <Link
                to="/about"
                className="text-[#D8BD8A] text-sm opacity-70 hover:opacity-100 hover:underline mb-8 inline-block transition-opacity"
            >
                ← About
            </Link>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Mission</h1>
            

            <div className="space-y-6">
                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        The Problem
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        Across the globe, wildfires are getting worse every year as climate change
                        accelerates. Communities face increasing risk and people deserve free tools
                        to understand their exposure. Many similar tools exist but they are
                        accessible only to insurance companies. Allowing insurers to hold
                        information hostage that could predict whether someone's house burns down,
                        or whether they survive, is wrong.
                    </p>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Our Approach
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        Prefire combines satellite imagery, building footprint data, and a short
                        questionnaire to produce a personalized compliance estimate based on
                        California's fire-safe regulations. {" "}
                        <Link to="/map" className="text-[#D8BD8A] underline hover:opacity-70 transition-opacity">
                            Try the analyzer →
                        </Link>
                    </p>
                    <div className="flex flex-wrap gap-4 mt-3">
                        <Link to="/about/tool" className="text-[#D8BD8A] text-xs underline hover:opacity-70 transition-opacity">
                            How the tool works →
                        </Link>
                        <Link to="/about/methodology" className="text-[#D8BD8A] text-xs underline hover:opacity-70 transition-opacity">
                            How the score is calculated →
                        </Link>
                        <Link to="/about/data" className="text-[#D8BD8A] text-xs underline hover:opacity-70 transition-opacity">
                            Data sources →
                        </Link>
                    </div>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Contradictions
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        AI and cloud services are known contributors to climate change. Prefire's
                        analyzer is not the kind of large language model most people associate with
                        AI. This site uses a relatively low-impact machine learning model small enough to
                        run on an iPhone. I hope to move away from commercial cloud services toward
                        servers we control directly, but in the meantime I believe the benefit to
                        users outweighs the cloud cost.
                    </p>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Limitations
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        Prefire generates no revenue, so it depends entirely on data released
                        publicly by the USDA, USGS, CAL FIRE, and other state and federal agencies.
                        Privately acquired satellite imagery is out of reach financially, so the
                        tool uses what is available. Hosting the site, the analyzer, and the large
                        geospatial datasets involved carries a real cost — which is why the tool is
                        currently available only in select communities. Expanded coverage means
                        expanded cost. I am actively pursuing grant funding to reach more
                        communities.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-3">
                        <Link to="/donate" className="text-[#D8BD8A] text-xs underline hover:opacity-70 transition-opacity">
                            Support the project →
                        </Link>
                        <Link to="/about/contact" className="text-[#D8BD8A] text-xs underline hover:opacity-70 transition-opacity">
                            Get in touch →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

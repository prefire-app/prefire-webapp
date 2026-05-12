import { Link } from "react-router-dom";

export default function AboutMe() {
    return (
        <div className="max-w-3xl mx-auto py-12 md:py-20 px-4 md:px-8 text-[#efefd1]">
            <Link
                to="/about"
                className="text-[#D8BD8A] text-sm opacity-70 hover:opacity-100 hover:underline mb-8 inline-block transition-opacity"
            >
                ← About
            </Link>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">The Developer</h1>
            <p className="text-[#efefd1] opacity-80 text-lg leading-relaxed mb-10">
                Prefire was built by Jack Lesemann — a software developer and
                [your short bio here, e.g., "data engineer based in California"]{" "}
                with a personal connection to the wildfire problem.
            </p>

            <div className="space-y-6">
                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Why I Built This
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        {/* TODO: Replace with your personal motivation story */}
                        [Share your personal story here — what connection do you have to
                        wildfires? Did you live near a fire, know someone who lost their
                        home, or see the problem firsthand? This is the most compelling part
                        of the About Me page for both readers and search engines.]
                    </p>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Background
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        {/* TODO: Replace with your professional background */}
                        [Describe your professional background — your experience in software
                        engineering, data, GIS, or any relevant domain expertise. Include
                        anything that lends credibility to the methodology or tool design.]
                    </p>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        What's Next
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        {/* TODO: Replace with your roadmap or vision */}
                        [What are you working toward? Where do you want to take Prefire?
                        Expanding to more states, improving the scoring algorithm, adding
                        community features? This shows the project is active and creates
                        reason to return.]
                    </p>
                </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
                <Link
                    to="/about/contact"
                    className="text-[#D8BD8A] text-sm underline hover:opacity-70 transition-opacity"
                >
                    Get in touch →
                </Link>
                {/* TODO: Add links to GitHub, LinkedIn, or personal site if desired */}
            </div>
        </div>
    );
}

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
                Prefire was built by Jack Lesemann — a software engineer based in
                Denver.
            </p>

            <div className="space-y-6">
                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Why I Built This
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        This started as a random side project as a way for me to learn more about geospatial data and mapping libraries. 
                        I enjoy coding and use to work as a sawyer on wildfire mitigation projects so this was a way to combine those interests.
                        As I built it, I realized that there was a real opportunity to make something useful that didn't exist yet.
                        I hope Prefire can help people take proactive steps to protect their homes and families from the increasing threat of wildfires.
                    </p>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        What's Next
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        The immediate priority is improving the{" "}
                        <Link
                            to="/about/methodology"
                            className="text-[#D8BD8A] underline hover:opacity-70 transition-opacity"
                        >
                            scoring methodology
                        </Link>{" "}
                        — incorporating satellite-derived vegetation data and expanding
                        coverage beyond California. Longer term, I want to expand to my home state of Colorado. My main blockers right now are data availability and funding. Private imagery is expensive and the NAIP data is usually old and low resolution. If any of that sounds interesting to you,{" "}
                        <Link
                            to="/about/contact"
                            className="text-[#D8BD8A] underline hover:opacity-70 transition-opacity"
                        >
                            get in touch
                        </Link>.
                    </p>
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
                    to="/donate"
                    className="text-[#D8BD8A] text-sm underline hover:opacity-70 transition-opacity"
                >
                    Support the project →
                </Link>
                <Link
                    to="/about/contact"
                    className="text-[#D8BD8A] text-sm underline hover:opacity-70 transition-opacity"
                >
                    Get in touch →
                </Link>
            </div>
        </div>
    );
}

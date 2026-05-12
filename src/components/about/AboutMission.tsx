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
            <p className="text-[#efefd1] opacity-80 text-lg leading-relaxed mb-10">
                Every year, we have seen the wildfires get worse with more property damage and loss of life. The tools that exist to help
                homeowners prepare are locked behind insurance products. Fire has a role in the ecosystem, but the increasing frequency and severity of wildfires driven by climate change is a crisis that demands 
                better resources for people to protect their homes and families.
            </p>

            <div className="space-y-6">
                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        The Problem
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                       
                    </p>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        The Gap
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        
                    </p>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Our Approach
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        
                    </p>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Who We Serve
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        
                    </p>
                </div>
            </div>
        </div>
    );
}

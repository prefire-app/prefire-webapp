import { Link } from "react-router-dom";

const sections = [
    {
        to: "/about/mission",
        title: "Our Mission",
        description: "Why Prefire exists and the problem it tries to solve.",
    },
    {
        to: "/about/tool",
        title: "The Analyzer",
        description: "How the defensible space mapping tool works under the hood.",
    },
    {
        to: "/about/methodology",
        title: "Methodology",
        description: "How prefires assesses defensible space compliance and what goes into the score.",
    },
    {
        to: "/about/data",
        title: "Data Sources",
        description: "The datasets and APIs that power the map and analysis.",
    },
    {
        to: "/about/me",
        title: "About the Developer",
        description: "Who built Prefire and what motivated the project.",
    },
    {
        to: "/about/contact",
        title: "Contact",
        description: "Get in touch with questions, feedback, or partnership inquiries.",
    },
];

export default function About() {
    return (
        <div className="max-w-3xl mx-auto py-12 md:py-20 px-4 md:px-8 text-[#efefd1]">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">About Prefire</h1>
            <p className="text-[#efefd1] opacity-80 text-lg leading-relaxed mb-10">
                I made prefire to provide a free, easy-to-use tool that helps people prepare their homes and properties for wildfire season. The project is built on the belief that everyone 
                deserves access to information about their wildfire risk as homeowners should have the same understanding of their risk as insurers do. 
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sections.map(({ to, title, description }) => (
                    <Link
                        key={to}
                        to={to}
                        className="block border border-[#D8BD8A] border-opacity-40 rounded-xl p-5 hover:border-opacity-80 hover:bg-[#D8BD8A] hover:bg-opacity-5 transition-all group"
                    >
                        <h2 className="text-[#D8BD8A] font-semibold text-base mb-1 group-hover:underline">
                            {title}
                        </h2>
                        <p className="text-[#efefd1] text-sm opacity-70 leading-relaxed">
                            {description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

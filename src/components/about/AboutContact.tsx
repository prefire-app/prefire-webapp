import { Link } from "react-router-dom";

export default function AboutContact() {
    return (
        <div className="max-w-3xl mx-auto py-12 md:py-20 px-4 md:px-8 text-[#efefd1]">
            <Link
                to="/about"
                className="text-[#D8BD8A] text-sm opacity-70 hover:opacity-100 hover:underline mb-8 inline-block transition-opacity"
            >
                ← About
            </Link>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact</h1>
            <p className="text-[#efefd1] opacity-80 text-lg leading-relaxed mb-10">
                Questions, feedback, bug reports, or partnership inquiries — reach out
                anytime. We read every message.
            </p>

            <div className="space-y-6">
                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Email
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed mb-3">
                        The best way to reach us is by email. We'll get back to you as
                        quickly as we can.
                    </p>
                    <a
                        href="mailto:prefire@prefire.online"
                        className="inline-block bg-[#D8BD8A] text-[#2a1a1a] font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        prefire@prefire.online
                    </a>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Feedback & Bug Reports
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        Found a bug in the analyzer? Noticed missing data for your county?
                        Have a suggestion for improving the methodology? Email us with as
                        much detail as you can — screenshots and addresses are always
                        helpful.
                    </p>
                </div>

                <div className="border border-[#D8BD8A] border-opacity-30 rounded-xl p-5">
                    <h2 className="text-[#D8BD8A] font-semibold text-base mb-2">
                        Data & Research Partnerships
                    </h2>
                    <p className="text-[#efefd1] text-sm opacity-80 leading-relaxed">
                        If you work in fire science, land management, or geospatial research
                        and think Prefire could be useful to your work — or if you have
                        datasets that could improve our coverage — we'd love to hear from
                        you.
                    </p>
                </div>
            </div>
        </div>
    );
}

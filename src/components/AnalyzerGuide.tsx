import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const pages: { title: string; content: React.ReactNode }[] = [
    {
        title: "Welcome to the Analyzer",
        content: (
            <>
                <p className="text-[#efefd1] text-sm leading-relaxed mb-4">
                    This tool helps you assess your property's ability to withstand wildfire by analyzing the defensible space around your structures.
                </p>
                <div className="space-y-4">
                    <div className="border border-[#D8BD8A] border-opacity-40 rounded-lg p-3">
                        <h3 className="text-[#D8BD8A] font-semibold text-sm mb-1">
                            What is Defensible Space?
                        </h3>
                        <p className="text-[#efefd1] text-xs leading-relaxed opacity-80">
                            Defensible space is the area around a structure where vegetation,
                            debris, and other combustible materials are managed to slow the
                            spread of wildfire and improve the chances your home survives.{" "}
                            <Link
                                to="/learning"
                                className="text-[#D8BD8A] underline hover:opacity-80 transition-opacity"
                            >
                                Learn more →
                            </Link>
                        </p>
                    </div>
                    <div className="border border-[#D8BD8A] border-opacity-40 rounded-lg p-3">
                        <h3 className="text-[#D8BD8A] font-semibold text-sm mb-1">
                            How does this tool work?
                        </h3>
                        <p className="text-[#efefd1] text-xs leading-relaxed opacity-80">
                            You'll locate your property on the map and draw polygons around
                            your structures. We'll use that plus a questionnaire, historical data, and other information to estimate your defensible space compliance.
                        </p>
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "Finding Your Property",
        content: (
            <>
                <p className="text-[#efefd1] text-sm leading-relaxed mb-4">
                    Before drawing, you'll need to navigate the map to your property.
                </p>
                <div className="space-y-4">
                    <div className="border border-[#D8BD8A] border-opacity-40 rounded-lg p-3">
                        <h3 className="text-[#D8BD8A] font-semibold text-sm mb-1">
                            1. Select your state and county
                        </h3>
                        <p className="text-[#efefd1] text-xs leading-relaxed opacity-80">
                            Choose your county from the selector that will appear next. We're
                            currently expanding our data coverage —{" "}
                            <span className="text-[#D8BD8A]">
                                at this time only select California counties are available
                            </span>
                            , with more states coming soon.
                        </p>
                    </div>
                    <div className="border border-[#D8BD8A] border-opacity-40 rounded-lg p-3">
                        <h3 className="text-[#D8BD8A] font-semibold text-sm mb-1">
                            2. Search by address or zoom to your property
                        </h3>
                        <p className="text-[#efefd1] text-xs leading-relaxed opacity-80">
                            After selecting your county, you'll be able to search for your
                            address directly or manually pan and zoom the satellite map to find
                            your parcel.
                        </p>
                    </div>
                </div>
            </>
        ),
    },
    {
        title: "Drawing Your Structures",
        content: (
            <>
                <p className="text-[#efefd1] text-sm leading-relaxed mb-4">
                    Once you've located your property, you're ready to draw.
                </p>
                <div className="space-y-3">
                    <div className="border border-[#D8BD8A] border-opacity-40 rounded-lg p-3">
                        <h3 className="text-[#D8BD8A] font-semibold text-sm mb-1">
                            Draw polygons around your structures
                        </h3>
                        <p className="text-[#efefd1] text-xs leading-relaxed opacity-80">
                            Use the polygon tool to outline each structure on your property:
                            home, garage, sheds, etc. You can draw multiple polygons. Try to
                            outline as accurately as you can; we'll attempt to auto-recognize
                            what you've outlined.
                        </p>
                    </div>
                    <img
                        src="/poly_tool.gif"
                        alt="Selecting the polygon tool and drawing a polygon on the map"
                        className="w-full mx-auto block max-h-45 object-contain"
                    />
                </div>
            </>
        ),
    },
    {
        title: "Submitting",
        content: (
            <>
                <div className="space-y-4">
                    <div className="border border-[#D8BD8A] border-opacity-40 rounded-lg p-3">
                        <h3 className="text-[#D8BD8A] font-semibold text-sm mb-1">
                            Submit when done
                        </h3>
                        <p className="text-[#efefd1] text-xs leading-relaxed opacity-80">
                            Once you've drawn your polygons, a counter will appear in the
                            top-right corner. Click{" "}
                            <span className="text-[#D8BD8A] font-medium">Done?</span>{" "}
                            to move on to the questionnaire.
                        </p>
                    </div>
                </div>
                <h2 className="text-[#efefd1] font-bold text-base mt-5 mb-3">Tips</h2>
                <div className="space-y-4">
                    <div className="border border-[#D8BD8A] border-opacity-40 rounded-lg p-3">
                        <h3 className="text-[#D8BD8A] font-semibold text-sm mb-1">
                            Can't see your house?
                        </h3>
                        <p className="text-[#efefd1] text-xs leading-relaxed opacity-80">
                            Toggle the{" "}
                            <span className="text-[#FF6B35] font-medium">
                                Building Footprints
                            </span>{" "}
                            overlay at the bottom of the map (zoom in first to enable it).
                            This shows known structure outlines you can draw over.
                        </p>
                    </div>
                </div>
            </>
        ),
    },
];

interface AnalyzerGuideProps {
    onDismiss: () => void;
}

export default function AnalyzerGuide({ onDismiss }: AnalyzerGuideProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [sliding, setSliding] = useState(false);
    const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const SLIDE_DURATION = 280;
    const total = pages.length;

    const goTo = (next: number, direction: "left" | "right") => {
        if (sliding) return;
        setSlideDirection(direction);
        setSliding(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setCurrentPage(next);
            setSliding(false);
        }, SLIDE_DURATION);
    };

    const handleNext = () => {
        if (currentPage < total - 1) goTo(currentPage + 1, "left");
    };

    const handlePrev = () => {
        if (currentPage > 0) goTo(currentPage - 1, "right");
    };

    const slideStyle: React.CSSProperties = sliding
        ? {
              transform: `translateX(${slideDirection === "left" ? "-60px" : "60px"})`,
              opacity: 0,
              transition: `transform ${SLIDE_DURATION}ms ease-in-out, opacity ${SLIDE_DURATION}ms ease-in-out`,
          }
        : {
              transform: "translateX(0)",
              opacity: 1,
              transition: `transform ${SLIDE_DURATION}ms ease-in-out, opacity ${SLIDE_DURATION}ms ease-in-out`,
          };

    return (
        <div className="bg-[#2a1a1a] border border-[#D8BD8A] rounded-xl shadow-2xl w-full max-w-md mx-4 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-[#D8BD8A] border-opacity-30">
                <span className="text-[#D8BD8A] text-xs font-semibold uppercase tracking-widest">
                    Guide
                </span>
                <button
                    onClick={onDismiss}
                    className="text-[#efefd1] text-xs opacity-50 hover:opacity-100 transition-opacity underline"
                >
                    Skip
                </button>
            </div>

            {/* Page content — grid-stack so container height = tallest page */}
            <div className="px-5 pt-4 pb-2" style={{ display: "grid" }}>
                {pages.map((page, i) => (
                    <div
                        key={i}
                        style={{
                            gridArea: "1 / 1",
                            ...(i === currentPage
                                ? slideStyle
                                : { opacity: 0, pointerEvents: "none" }),
                        }}
                    >
                        <h2 className="text-[#efefd1] font-bold text-base mb-3">
                            {page.title}
                        </h2>
                        {page.content}
                    </div>
                ))}
            </div>

            {/* Footer: arrows + dots */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-[#D8BD8A] border-opacity-30 mt-2">
                {/* Left arrow */}
                <div className="w-24 flex justify-start">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                    aria-label="Previous page"
                    className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors ${
                        currentPage === 0
                            ? "border-[#D8BD8A] border-opacity-20 text-[#efefd1] opacity-20 cursor-not-allowed"
                            : "border-[#D8BD8A] text-[#D8BD8A] hover:bg-[#D8BD8A] hover:text-black"
                    }`}
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                            d="M9 2L4 7L9 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>                </div>
                {/* Page dots */}
                <div className="flex gap-2">
                    {pages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i, i > currentPage ? "left" : "right")}
                            aria-label={`Go to page ${i + 1}`}
                            className={`rounded-full transition-all ${
                                i === currentPage
                                    ? "w-4 h-2 bg-[#D8BD8A]"
                                    : "w-2 h-2 bg-[#D8BD8A] opacity-30 hover:opacity-60"
                            }`}
                        />
                    ))}
                </div>

                {/* Right arrow / Get Started */}
                <div className="w-24 flex justify-end">
                {currentPage < total - 1 ? (
                    <button
                        onClick={handleNext}
                        aria-label="Next page"
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-[#D8BD8A] text-[#D8BD8A] hover:bg-[#D8BD8A] hover:text-black transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                                d="M5 2L10 7L5 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                ) : (
                    <button
                        onClick={onDismiss}
                        className="px-4 py-2 text-xs font-semibold bg-[#D8BD8A] text-black rounded-full hover:bg-[#c9ae7a] transition-colors"
                    >
                        Start
                    </button>
                )}
                </div>
            </div>
        </div>
    );
}

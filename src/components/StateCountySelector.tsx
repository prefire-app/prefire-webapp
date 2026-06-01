import { useState } from "react";
import { STATES, COUNTIES } from "../lib/geo";

const UNAVAILABLE_MSG =
    "Sorry, we are working to expand to more states and counties.";

function StateCountySelector({
    onConfirm,
}: {
    onConfirm: (
        fips: string,
        centroid: [number, number],
        stateFips: string,
    ) => void;
}) {
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedCounty, setSelectedCounty] = useState<{
        name: string;
        fips: string;
        centroid: [number, number];
    } | null>(null);

    const counties = selectedState ? (COUNTIES[selectedState] ?? []) : [];

    return (
        <div className="bg-[#aa5042] p-5 md:p-8 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90dvh] overflow-y-auto">
            <h2 className="text-[#efefd1] text-2xl font-bold mb-1 text-center">
                Select Your State & County
            </h2>
            <p className="text-[#efefd1] opacity-60 text-sm text-center mb-6">
                Choose the area you want to analyze for fire risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
                {/* State list */}
                <div className="flex-1">
                    <h3 className="text-[#d8bd8a] font-semibold mb-3 text-xs uppercase tracking-widest">
                        State
                    </h3>
                    <div className="space-y-1">
                        {STATES.map((state) => (
                            <div key={state.code} className="relative group">
                                <button
                                    onClick={() => {
                                        if (state.available) {
                                            setSelectedState(state.code);
                                            setSelectedCounty(null);
                                        }
                                    }}
                                    disabled={!state.available}
                                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                                        state.available
                                            ? selectedState === state.code
                                                ? "bg-[#d8bd8a] text-black font-semibold"
                                                : "text-[#efefd1] hover:bg-[#c0604e] cursor-pointer"
                                            : "text-[#efefd1] opacity-35 cursor-not-allowed"
                                    }`}
                                >
                                    {state.name}
                                </button>
                                {!state.available && (
                                    <div className="pointer-events-none absolute left-0 top-full mt-1 z-50 hidden group-hover:block w-56">
                                        <div className="bg-[#1e1010] text-[#efefd1] text-xs px-3 py-2 rounded shadow-lg leading-snug">
                                            {UNAVAILABLE_MSG}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* County list */}
                <div className="flex-1">
                    <h3 className="text-[#d8bd8a] font-semibold mb-3 text-xs uppercase tracking-widest">
                        County
                    </h3>
                    {!selectedState ? (
                        <p className="text-[#efefd1] opacity-40 text-sm italic mt-2">
                            Select a state first
                        </p>
                    ) : counties.length === 0 ? (
                        <p className="text-[#efefd1] opacity-40 text-sm italic mt-2">
                            No counties available yet
                        </p>
                    ) : (
                        <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                            {counties.map((county) => (
                                <button
                                    key={county.fips}
                                    onClick={() => setSelectedCounty(county)}
                                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                                        selectedCounty?.fips === county.fips
                                            ? "bg-[#d8bd8a] text-black font-semibold"
                                            : "text-[#efefd1] hover:bg-[#c0604e]"
                                    }`}
                                >
                                    {county.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={() => {
                        if (selectedCounty && selectedState) {
                            const state = STATES.find(
                                (s) => s.code === selectedState,
                            )!;
                            onConfirm(
                                selectedCounty.fips,
                                selectedCounty.centroid,
                                state.fips,
                            );
                        }
                    }}
                    disabled={!selectedCounty}
                    className={`px-6 py-2 rounded font-semibold transition-colors ${
                        selectedCounty
                            ? "bg-[#d8bd8a] text-black hover:bg-[#c9ae7a] cursor-pointer"
                            : "bg-[#d8bd8a] opacity-40 text-black cursor-not-allowed"
                    }`}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default StateCountySelector;

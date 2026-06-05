import { useMemo, useState } from "react";
import { STATES } from "../lib/geo";
import { COUNTIES_BY_STATE } from "../lib/counties";
import type { CountyRef } from "../lib/counties";

export type AreaSelection = {
    stateCode: string;
    stateFips: string;
    countyFips: string | null;
    countyName: string | null;
};

function StateCountySelector({
    onConfirm,
}: {
    onConfirm: (selection: AreaSelection) => void;
}) {
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedCounty, setSelectedCounty] = useState<CountyRef | null>(null);

    const counties = useMemo(
        () => (selectedState ? COUNTIES_BY_STATE[selectedState] ?? [] : []),
        [selectedState],
    );
    const state = STATES.find((s) => s.code === selectedState);

    const canConfirm =
        !!selectedState && (selectedCounty !== null || counties.length === 0);

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
                    <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                        {STATES.map((s) => (
                            <button
                                key={s.code}
                                onClick={() => {
                                    setSelectedState(s.code);
                                    setSelectedCounty(null);
                                }}
                                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                                    selectedState === s.code
                                        ? "bg-[#d8bd8a] text-black font-semibold"
                                        : "text-[#efefd1] hover:bg-[#c0604e] cursor-pointer"
                                }`}
                            >
                                {s.name}
                            </button>
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
                            No county data available — you can still continue
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
                        if (!state) return;
                        onConfirm({
                            stateCode: state.code,
                            stateFips: state.fips,
                            countyFips: selectedCounty?.fips ?? null,
                            countyName: selectedCounty?.name ?? null,
                        });
                    }}
                    disabled={!canConfirm}
                    className={`px-6 py-2 rounded font-semibold transition-colors ${
                        canConfirm
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

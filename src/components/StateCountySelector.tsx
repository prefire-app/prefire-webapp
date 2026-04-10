import { useState } from "react";

const UNAVAILABLE_MSG =
    "Sorry, we are working to expand to more states and counties.";

const STATES = [
    { name: "California", code: "CA", available: true },
    { name: "Oregon", code: "OR", available: false },
    { name: "Washington", code: "WA", available: false },
    { name: "Idaho", code: "ID", available: false },
    { name: "Montana", code: "MT", available: false },
    { name: "Wyoming", code: "WY", available: false },
    { name: "Colorado", code: "CO", available: false },
    { name: "Utah", code: "UT", available: false },
    { name: "Arizona", code: "AZ", available: false },
    { name: "New Mexico", code: "NM", available: false },
];

const COUNTIES: Record<
    string,
    { name: string; fips: string; centroid: [number, number] }[]
> = {
    CA: [
        { name: "Alameda", fips: "001", centroid: [37.6483, -121.892] },
        { name: "Contra Costa", fips: "013", centroid: [37.9161, -121.9] },
        { name: "El Dorado", fips: "017", centroid: [38.6872, -120.54] },
        { name: "Los Angeles", fips: "037", centroid: [34.3073, -118.227] },
        { name: "Marin", fips: "041", centroid: [38.084, -122.734] },
        { name: "Nevada", fips: "057", centroid: [39.304, -120.778] },
        { name: "Orange", fips: "059", centroid: [33.717, -117.831] },
        { name: "Placer", fips: "061", centroid: [39.092, -120.804] },
        { name: "San Diego", fips: "073", centroid: [33.028, -116.735] },
        { name: "San Mateo", fips: "081", centroid: [37.434, -122.344] },
        { name: "Santa Clara", fips: "085", centroid: [37.233, -121.696] },
        { name: "Santa Cruz", fips: "087", centroid: [37.046, -122.023] },
        { name: "Sonoma", fips: "097", centroid: [38.528, -122.928] },
    ],
};

function StateCountySelector({
    onConfirm,
}: {
    onConfirm: (fips: string, centroid: [number, number]) => void;
}) {
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedCounty, setSelectedCounty] = useState<{
        name: string;
        fips: string;
        centroid: [number, number];
    } | null>(null);

    const counties = selectedState ? (COUNTIES[selectedState] ?? []) : [];

    return (
        <div className="bg-[#aa5042] p-8 rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <h2 className="text-[#efefd1] text-2xl font-bold mb-1 text-center">
                Select Your State & County
            </h2>
            <p className="text-[#efefd1] opacity-60 text-sm text-center mb-6">
                Choose the area you want to analyze for fire risk.
            </p>
            <div className="flex gap-6">
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
                        if (selectedCounty) {
                            onConfirm(
                                selectedCounty.fips,
                                selectedCounty.centroid,
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

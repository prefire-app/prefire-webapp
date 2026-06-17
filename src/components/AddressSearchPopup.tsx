import { useState } from "react";
import Modal from "./Modal";
import { LOCATE_URL } from "../lib/constants";
import { apiFetch, ApiError, ApiTimeoutError } from "../lib/api";
import type { CountyState, LocateResponse } from "../types/locate";

type Props = {
    onClose: (area: CountyState | null) => void;
    onSearch: (lat: number, lng: number) => void;
};

function AddressSearchPopup({ onClose, onSearch }: Props) {
    const [address, setAddress] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        const trimmed = address.trim();
        if (trimmed.length < 3) {
            setError("Please enter at least 3 characters.");
            return;
        }
        setError(null);
        setLoading(true);
        try {
            const url = `${LOCATE_URL}?address=${encodeURIComponent(trimmed)}`;
            const data = await apiFetch<LocateResponse>(url, { timeoutMs: 6000 });
            onSearch(data.lat, data.lon);
            onClose({
                stateCode: data.stateCode,
                stateFips: data.stateFips,
                countyFips: data.countyFips,
                countyName: data.countyName,
                supported: data.supported,
            });
        } catch (err) {
            if (err instanceof ApiTimeoutError) {
                setError("Search timed out. Please try again.");
            } else if (err instanceof ApiError && err.status === 404) {
                setError("Address not found. Try adding city and state.");
            } else if (err instanceof ApiError && err.status === 429) {
                setError("Too many searches. Please wait a moment.");
            } else {
                setError("Search failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={true} onClose={() => onClose(null)} title="Search Address">
            <div className="bg-[#aa5042] rounded shadow-lg p-6 max-w-md w-full relative">
                <button
                    className="absolute top-3 right-5 text-[#efefd1] hover:text-gray-700"
                    onClick={() => onClose(null)}
                    aria-label="Close address search"
                >
                    &times;
                </button>
                <h2 className="text-[#efefd1] text-lg font-bold mb-2">
                    Search Address
                </h2>
                <p className="text-[#efefd1]/70 text-xs leading-snug mb-3">
                    For best results, include street number, street, city, and state e.g.,{" "}
                    <span className="text-[#d8bd8a] font-medium">2927 W 34th Ave, Denver, CO</span>.
                    If your address isn&rsquo;t found, try a nearby intersection or landmark.
                </p>
                <input
                    type="text"
                    placeholder="123 Main St, City, ST"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !loading) handleSearch();
                    }}
                    className="text-[#efefd1] w-full p-2 rounded mb-2"
                />
                {error && (
                    <p role="alert" className="text-[#efefd1] text-sm mb-2">
                        {error}
                    </p>
                )}
                <button
                    className="w-full bg-[#d8bd8a] text-black p-2 rounded hover:bg-[#4f3130] disabled:opacity-60"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? "Searching…" : "Search"}
                </button>
            </div>
        </Modal>
    );
}

export default AddressSearchPopup;

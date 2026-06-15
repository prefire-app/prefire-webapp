import { useState } from "react";
import Modal from "./Modal";
import { GEOCODE_URL } from "../lib/constants";
import { apiFetch, ApiError, ApiTimeoutError } from "../lib/api";

type Props = {
    onClose: () => void;
    onSearch: (lat: number, lng: number) => void;
};

type GeocodeResult = {
    lat: number;
    lon: number;
    display_name: string;
};
type GeocodeResponse = { results: GeocodeResult[] };

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
            const url = `${GEOCODE_URL}?address=${encodeURIComponent(trimmed)}`;
            const data = await apiFetch<GeocodeResponse>(url, {
                timeoutMs: 6000,
            });
            if (data.results.length > 0) {
                const { lat, lon } = data.results[0];
                onSearch(lat, lon);
                onClose();
            } else {
                setError("Address not found.");
            }
        } catch (err) {
            if (err instanceof ApiTimeoutError) {
                setError("Search timed out. Please try again.");
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
        <Modal isOpen={true} onClose={onClose} title="Search Address">
            <div className="bg-[#aa5042] rounded shadow-lg p-6 max-w-md w-full relative">
                <button
                    className="absolute top-3 right-5 text-[#efefd1] hover:text-gray-700"
                    onClick={onClose}
                    aria-label="Close address search"
                >
                    &times;
                </button>
                <h2 className="text-[#efefd1] text-lg font-bold mb-2">
                    Search Address
                </h2>
                <input
                    type="text"
                    placeholder="Enter address"
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

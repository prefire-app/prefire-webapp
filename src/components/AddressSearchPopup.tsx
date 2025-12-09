import { useState } from "react";

type Props = {
    onClose: () => void;
    onSearch: (lat: number, lng: number) => void;
};

function AddressSearchPopup({ onClose, onSearch }: Props) {
    const [address, setAddress] = useState("");

    const handleSearch = async () => {
        // Use Nominatim for free geocoding
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address,
        )}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            onSearch(parseFloat(lat), parseFloat(lon));
            onClose();
        } else {
            alert("Address not found.");
        }
    };

    return (
        <div className="bg-[#aa5042] rounded shadow-lg p-6 max-w-md w-full relative">
            <button
                className="absolute top-3 right-5 text-[#efefd1] hover:text-gray-700"
                onClick={onClose}
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
                className="text-[#efefd1] w-full p-2 rounded mb-2"
            />
            <button
                className="w-full bg-[#d8bd8a] text-black p-2 rounded hover:bg-[#4f3130]"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
}

export default AddressSearchPopup;

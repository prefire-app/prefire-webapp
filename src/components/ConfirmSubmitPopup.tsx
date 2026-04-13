import axios from "axios";

const API_URL = "http://127.0.0.1:8000/send-geometry";

function ConfirmSubmitPopup({
    drawnPolygons,
    onClose,
    onClear,
    fips,
}: {
    drawnPolygons: any[];
    onClose: () => void;
    onClear: () => void;
    fips: string;
}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-30">
            <div className="bg-[#aa5042] p-6 rounded shadow-lg">
                <p className="text-[#efefd1]">
                    {drawnPolygons.length === 1
                        ? "1 polygon drawn!"
                        : `${drawnPolygons.length} polygons drawn!`}{" "}
                    Submit for analysis?
                </p>
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={async () => {
                            try {
                                const response = await axios.post(API_URL, {
                                    fips,
                                    geometry: drawnPolygons.map(
                                        (p) => p.geometry,
                                    ),
                                });
                                console.log("Backend response:", response.data);
                                window.location.href = response.data.url;
                                onClear();
                            } catch (error) {
                                console.error(
                                    "Error sending geometry to backend:",
                                    error,
                                );
                            }
                        }}
                        className="bg-[#d8bd8a] text-black px-4 py-2 rounded mr-2"
                    >
                        Submit
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-[#aa5042] px-4 py-2 rounded text-[#efefd1]"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmSubmitPopup;

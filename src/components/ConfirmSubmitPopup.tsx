import axios from "axios";

const API_URL = "https://chpjhix9fj.execute-api.us-east-1.amazonaws.com/dev";

function ConfirmSubmitPopup({
    drawnPolygon,
    setDrawnPolygon,
}: {
    drawnPolygon: any;
    setDrawnPolygon: (val: any) => void;
}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-30">
            <div className="bg-[#aa5042] p-6 rounded shadow-lg">
                <p className="text-[#efefd1]">
                    Outline drawn! Submit for analysis?
                </p>
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={async () => {
                            try {
                                const fips = "081"; // TODO: determine from location
                                const response = await axios.post(API_URL, {
                                    fips,
                                    geometry: drawnPolygon.geometry,
                                });
                                console.log("Backend response:", response.data);
                                window.location.href = response.data.url;
                                setDrawnPolygon(null);
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
                        onClick={() => setDrawnPolygon(null)}
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
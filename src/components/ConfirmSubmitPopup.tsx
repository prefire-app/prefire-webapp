import axios from "axios";

function ConfirmSubmitPopup({
    drawnPolygons,
    setDrawnPolygons,
    setShowConfirmPopup,
}: {
    drawnPolygons: any;
    setDrawnPolygons: (val: any) => void;
    setShowConfirmPopup: (val: boolean) => void;
}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-30">
            <div className="bg-[#aa5042] p-6 rounded shadow-lg">
                <p className="text-[#efefd1]">
                    Outline drawn! Ready to draw another or submit for analysis?
                </p>
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => setShowConfirmPopup(false)}
                        className="bg-[#d8bd8a] text-black px-4 py-2 rounded mr-2"
                    >
                        Draw another
                    </button>
                    <button
                        onClick={async () => {
                            try {
                                const response = await axios.post(
                                    "http://localhost:8000/send-geometry",
                                    drawnPolygons,
                                );
                                console.log("Backend response:", response);

                                setDrawnPolygons([]);
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
                        onClick={() => setDrawnPolygons([])}
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

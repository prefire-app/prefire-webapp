import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { QuestionnaireAnswers } from "../types/questionnaire";
import { API_URL } from "../lib/constants";
import Modal from "./Modal";

function ConfirmSubmitPopup({
    drawnPolygons,
    onClose,
    fips,
    state,
    questionnaire,
}: {
    drawnPolygons: any[];
    onClose: () => void;
    fips: string | null;
    state: string;
    questionnaire?: QuestionnaireAnswers | null;
}) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (val: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

    return (
        <Modal isOpen={true} onClose={onClose} title="Submit polygons for analysis">
            <div className="bg-[#aa5042] p-6 rounded shadow-lg max-w-xs w-full mx-4">
                {submitted ? (
                    <>
                        <p className="text-[#efefd1] mb-3 font-semibold">
                            Submission received!
                        </p>
                        <p className="text-[#efefd1] text-sm mb-4">
                            Your analysis is being processed. Look for an email
                            from{" "}
                            <span className="text-[#d8bd8a] font-medium">
                                prefire@prefire.online
                            </span>{" "}
                            in your inbox with your report.
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => navigate("/")}
                                className="bg-[#d8bd8a] text-black px-4 py-2 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-[#efefd1] mb-4">
                            {drawnPolygons.length === 1
                                ? "1 polygon drawn!"
                                : `${drawnPolygons.length} polygons drawn!`}{" "}
                            Submit for analysis?
                        </p>
                        <label className="block text-[#efefd1] text-sm mb-1">
                            Email address
                            <span className="text-[#d8bd8a] ml-1 text-xs">
                                (your report will be sent here)
                            </span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError("");
                                setSubmitError("");
                            }}
                            placeholder="you@example.com"
                            className="w-full px-3 py-2 rounded bg-[#8a3d34] text-[#efefd1] placeholder-[#efefd1]/40 border border-[#d8bd8a]/30 focus:outline-none focus:border-[#d8bd8a] text-sm mb-1"
                        />
                        {emailError && (
                            <p className="text-yellow-300 text-xs mb-2">
                                {emailError}
                            </p>
                        )}
                        {submitError && (
                            <p className="text-yellow-300 text-xs mb-2" role="alert">
                                {submitError}
                            </p>
                        )}
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={async () => {
                                    if (!validateEmail(email)) {
                                        setEmailError(
                                            "Please enter a valid email address.",
                                        );
                                        return;
                                    }
                                    try {
                                        setLoading(true);
                                        setSubmitError("");
                                        await axios.post(API_URL, {
                                            ...(fips != null && { fips }),
                                            state,
                                            email,
                                            geometry: drawnPolygons.map(
                                                (p) => p.geometry,
                                            ),
                                            ...(questionnaire != null && { questionnaire }),
                                        });
                                        setSubmitted(true);
                                    } catch (error) {
                                        console.error(
                                            "Error sending geometry to backend:",
                                            error,
                                        );
                                        if (axios.isAxiosError(error) && error.response) {
                                            const status = error.response.status;
                                            const detail = error.response.data?.detail;
                                            if (status >= 400 && status < 500) {
                                                setSubmitError(
                                                    typeof detail === "string"
                                                        ? detail
                                                        : "Submission rejected. Please check your input and try again.",
                                                );
                                            } else {
                                                setSubmitError(
                                                    "Server unavailable. Please try again in a moment.",
                                                );
                                            }
                                        } else {
                                            setSubmitError(
                                                "Could not reach server. Check your connection and try again.",
                                            );
                                        }
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                                className="bg-[#d8bd8a] text-black px-4 py-2 rounded mr-2 flex items-center gap-2 disabled:opacity-60"
                                disabled={loading}
                            >
                                {loading && (
                                    <svg
                                        className="animate-spin h-4 w-4 text-black"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        />
                                    </svg>
                                )}
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-[#aa5042] px-4 py-2 rounded text-[#efefd1]"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
}

export default ConfirmSubmitPopup;

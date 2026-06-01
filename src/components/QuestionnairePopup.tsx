import { useState } from "react";
import type { QuestionnaireAnswers } from "../types/questionnaire";
import type { Question } from "../lib/questionnaire";
import { ZONES, EMPTY_ANSWERS } from "../lib/questionnaire";

export default function QuestionnairePopup({
    onComplete,
}: {
    onComplete: (answers: QuestionnaireAnswers | null) => void;
}) {
    const [zoneIndex, setZoneIndex] = useState(0);
    const [answers, setAnswers] = useState<QuestionnaireAnswers>({ ...EMPTY_ANSWERS });

    const currentZone = ZONES[zoneIndex];
    const isLastZone = zoneIndex === ZONES.length - 1;

    function setSingle(field: Exclude<keyof QuestionnaireAnswers, "combustible_items_5ft">, value: string) {
        setAnswers((prev) => ({ ...prev, [field]: value }));
    }

    function toggleMulti(value: string) {
        setAnswers((prev) => {
            const current = prev.combustible_items_5ft ?? [];
            const next = current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value];
            return { ...prev, combustible_items_5ft: next.length > 0 ? next : null };
        });
    }

    function handleNext() {
        if (isLastZone) {
            onComplete(answers);
        } else {
            setZoneIndex((i) => i + 1);
        }
    }

    return (
        <div className="bg-[#aa5042] rounded shadow-lg max-w-md w-full mx-4 flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="p-5 pb-3 border-b border-[#d8bd8a]/30">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-[#efefd1] font-semibold text-base">
                        Defensible Space Questionnaire
                    </h2>
                    <button
                        onClick={() => onComplete(null)}
                        className="text-[#efefd1]/50 hover:text-[#efefd1] text-xs underline transition-colors"
                    >
                        Skip
                    </button>
                </div>
                {/* Progress bar */}
                <div className="flex items-center gap-1.5">
                    {ZONES.map((zone, i) => (
                        <div
                            key={zone.zoneKey}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                i <= zoneIndex ? "bg-[#d8bd8a]" : "bg-[#d8bd8a]/25"
                            }`}
                        />
                    ))}
                </div>
                <p className="text-[#d8bd8a] text-xs mt-2 font-medium">
                    {currentZone.label}{" "}
                    <span className="text-[#efefd1]/55 font-normal">
                        ({currentZone.rangeLabel})
                    </span>
                </p>
            </div>

            {/* Questions scroll area */}
            <div className="overflow-y-auto flex-1 p-5 space-y-5">
                {currentZone.questions.map((q) => (
                    <QuestionBlock
                        key={q.field}
                        question={q}
                        answers={answers}
                        onSingle={setSingle}
                        onToggleMulti={toggleMulti}
                    />
                ))}
            </div>

            {/* Footer */}
            <div className="p-4 pt-3 border-t border-[#d8bd8a]/30 flex justify-between items-center">
                {zoneIndex > 0 ? (
                    <button
                        onClick={() => setZoneIndex((i) => i - 1)}
                        className="text-[#efefd1]/70 hover:text-[#efefd1] text-sm transition-colors"
                    >
                        ← Back
                    </button>
                ) : (
                    <div />
                )}
                <button
                    onClick={handleNext}
                    className="bg-[#d8bd8a] text-black text-sm font-semibold px-4 py-2 rounded hover:bg-[#c9ae7a] transition-colors"
                >
                    {isLastZone ? "Finish" : "Next Zone →"}
                </button>
            </div>
        </div>
    );
}

function QuestionBlock({
    question,
    answers,
    onSingle,
    onToggleMulti,
}: {
    question: Question;
    answers: QuestionnaireAnswers;
    onSingle: (field: Exclude<keyof QuestionnaireAnswers, "combustible_items_5ft">, value: string) => void;
    onToggleMulti: (value: string) => void;
}) {
    if (question.multi) {
        const selected = answers.combustible_items_5ft ?? [];
        return (
            <div>
                <p className="text-[#efefd1] text-sm mb-1">{question.label}</p>
                {question.description && (
                    <p className="text-[#efefd1]/55 text-xs leading-relaxed mb-1.5">{question.description}</p>
                )}
                <p className="text-[#efefd1]/50 text-xs mb-2">Select all that apply</p>
                <div className="space-y-1.5">
                    {question.options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => onToggleMulti(opt.value)}
                            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors border ${
                                selected.includes(opt.value)
                                    ? "bg-[#d8bd8a] text-black border-[#d8bd8a]"
                                    : "bg-[#8a3d34] text-[#efefd1] border-transparent hover:border-[#d8bd8a]/50"
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    const current = answers[question.field] as string | null;
    const isTwoOptions = question.options.length === 2;

    return (
        <div>
            <p className="text-[#efefd1] text-sm mb-1">{question.label}</p>
            {question.description && (
                <p className="text-[#efefd1]/55 text-xs leading-relaxed mb-2">{question.description}</p>
            )}
            {isTwoOptions ? (
                <div className="grid grid-cols-2 gap-2">
                    {question.options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => onSingle(question.field, opt.value)}
                            className={`px-3 py-2 rounded text-sm transition-colors border ${
                                current === opt.value
                                    ? "bg-[#d8bd8a] text-black border-[#d8bd8a]"
                                    : "bg-[#8a3d34] text-[#efefd1] border-transparent hover:border-[#d8bd8a]/50"
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="space-y-1.5">
                    {question.options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => onSingle(question.field, opt.value)}
                            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors border ${
                                current === opt.value
                                    ? "bg-[#d8bd8a] text-black border-[#d8bd8a]"
                                    : "bg-[#8a3d34] text-[#efefd1] border-transparent hover:border-[#d8bd8a]/50"
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

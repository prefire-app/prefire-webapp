import { useState } from "react";
import type { QuestionnaireAnswers } from "../types/questionnaire";

type Option = { value: string; label: string };

type SingleQuestion = {
    field: Exclude<keyof QuestionnaireAnswers, "combustible_items_5ft">;
    label: string;
    description?: string;
    multi: false;
    options: Option[];
};

type MultiQuestion = {
    field: "combustible_items_5ft";
    label: string;
    description?: string;
    multi: true;
    options: Option[];
};

type Question = SingleQuestion | MultiQuestion;

type ZoneDef = {
    zoneKey: string;
    label: string;
    rangeLabel: string;
    questions: Question[];
};

const ZONES: ZoneDef[] = [
    {
        zoneKey: "zone0",
        label: "Zone 0 — Immediate",
        rangeLabel: "0–6 ft from structure",
        questions: [
            {
                field: "roof_material",
                label: "Roof material",
                multi: false,
                options: [
                    { value: "wood_shake", label: "Wood shake / shingle" },
                    { value: "wood_composite", label: "Wood composite" },
                    { value: "tile", label: "Tile" },
                    { value: "metal_or_fire_resistant", label: "Metal, concrete tile, or Class A rated" },
                ],
            },
            {
                field: "building_material",
                label: "Wall / siding material",
                multi: false,
                options: [
                    { value: "wood_siding", label: "Wood siding or shingles" },
                    { value: "vinyl", label: "Vinyl" },
                    { value: "stucco", label: "Stucco" },
                    { value: "brick_or_fire_resistant", label: "Brick, stone, fiber-cement, or fire-resistant" },
                ],
            },
            {
                field: "combustible_items_5ft",
                label: "Combustible items within 5 ft of home",
                multi: true,
                options: [
                    { value: "wood_piles", label: "Firewood or wood piles" },
                    { value: "vegetation", label: "Vegetation (plants, shrubs, mulch)" },
                    { value: "wood_structures", label: "Wood structures (sheds, fences, furniture)" },
                ],
            },
            {
                field: "hardscape_surroundings",
                label: "Ground cover surrounding the home",
                multi: false,
                options: [
                    { value: "mostly_organic", label: "Mostly grass, mulch, bark, or organic material" },
                    { value: "partial", label: "Mix of organic and non-combustible" },
                    { value: "mostly_hardscape", label: "Mostly gravel, stone, concrete, or non-combustible" },
                ],
            },
            {
                field: "vents_screened",
                label: "Attic and foundation vents",
                multi: false,
                options: [
                    { value: "unscreened", label: "Open or unscreened" },
                    { value: "partial", label: "Some screened, some not" },
                    { value: "ember_resistant", label: 'All fitted with ember-resistant mesh (1/16" or finer)' },
                ],
            },
            {
                field: "deck_material",
                label: "Deck or patio material",
                multi: false,
                options: [
                    { value: "combustible", label: "Wood" },
                    { value: "composite", label: "Composite / Trex" },
                    { value: "noncombustible", label: "Concrete, pavers, or no deck" },
                ],
            },
            {
                field: "attached_fencing",
                label: "Fencing attached to or within 5 ft of structure",
                multi: false,
                options: [
                    { value: "wood_attached", label: "Wood fence attached to or touching structure" },
                    { value: "wood_nearby", label: "Wood fence within 5 ft but not attached" },
                    { value: "none_or_noncombustible", label: "No fence, or metal / masonry fence" },
                ],
            },
            {
                field: "propane_near_structure",
                label: "Propane tank or utility within 5 ft of structure",
                multi: false,
                options: [
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                ],
            },
            {
                field: "garbage_within_5ft",
                label: "Garbage or recycling bins within 5 ft of structure",
                multi: false,
                options: [
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                ],
            },
            {
                field: "gutters_debris",
                label: "Gutters and roof valleys",
                multi: false,
                options: [
                    { value: "yes", label: "Gutters have leaf debris or are unscreened" },
                    { value: "no", label: "Gutters are clear or home has no gutters" },
                ],
            },
            {
                field: "chimney_branches",
                label: "Branches within 10 ft of chimney",
                multi: false,
                options: [
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                ],
            },
            {
                field: "dead_plants_near_home",
                label: "Dead or dry plants within 5 ft of home",
                multi: false,
                options: [
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                ],
            },
        ],
    },
    {
        zoneKey: "zone1",
        label: "Zone 1 — Intermediate",
        rangeLabel: "6–30 ft from structure",
        questions: [
            {
                field: "zone1_ladder_fuels",
                label: "Ladder fuels in Zone 1",
                description: "Ladder fuels are dead lower branches, shrubs, or debris that form a continuous connection from ground level up to tree canopies. They allow a surface fire to climb into the treetops and dramatically increase flame intensity near your structure.",
                multi: false,
                options: [
                    { value: "yes", label: "Yes, significant ladder fuels present" },
                    { value: "some", label: "Some, but not continuous" },
                    { value: "no", label: "No" },
                ],
            },
            {
                field: "zone1_low_branches",
                label: "Tree branches below 6 ft within 30 ft of structure",
                multi: false,
                options: [
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                ],
            },
            {
                field: "zone1_grass_overgrown",
                label: "Grass over 4 inches tall within 30 ft of structure",
                multi: false,
                options: [
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                ],
            },
            {
                field: "zone1_dead_plants",
                label: "Dead or dry plants within 30 ft of structure",
                multi: false,
                options: [
                    { value: "yes", label: "Yes" },
                    { value: "some", label: "Some" },
                    { value: "no", label: "No" },
                ],
            },
        ],
    },
    {
        zoneKey: "zone2",
        label: "Zone 2 — Extended",
        rangeLabel: "30–100 ft from structure",
        questions: [
            {
                field: "zone2_leaf_litter",
                label: "Leaf or needle litter over 3 inches deep",
                multi: false,
                options: [
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                ],
            },
            {
                field: "zone2_woodpile_near_veg",
                label: "Wood piles within 10 ft of trees or shrubs",
                multi: false,
                options: [
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                ],
            },
            {
                field: "zone2_wooden_structures",
                label: "Wooden outbuildings or sheds in Zone 2",
                multi: false,
                options: [
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                ],
            },
            {
                field: "zone2_ladder_fuels",
                label: "Ladder fuels in Zone 2",
                description: "Ladder fuels are dead lower branches, shrubs, or debris that form a continuous connection from ground level up to tree canopies. They allow a surface fire to climb into the treetops and dramatically increase flame intensity near your structure.",
                multi: false,
                options: [
                    { value: "yes", label: "Yes, significant ladder fuels present" },
                    { value: "some", label: "Some" },
                    { value: "no", label: "No" },
                ],
            },
        ],
    },
];

const EMPTY_ANSWERS: QuestionnaireAnswers = {
    roof_material: null,
    building_material: null,
    combustible_items_5ft: null,
    hardscape_surroundings: null,
    propane_near_structure: null,
    garbage_within_5ft: null,
    vents_screened: null,
    deck_material: null,
    attached_fencing: null,
    gutters_debris: null,
    chimney_branches: null,
    dead_plants_near_home: null,
    zone1_ladder_fuels: null,
    zone1_low_branches: null,
    zone1_grass_overgrown: null,
    zone1_dead_plants: null,
    zone2_leaf_litter: null,
    zone2_woodpile_near_veg: null,
    zone2_wooden_structures: null,
    zone2_ladder_fuels: null,
};

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

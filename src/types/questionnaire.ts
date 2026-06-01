export interface QuestionnaireAnswers {
    // Zone 0 — Immediate (0–6 ft)
    roof_material: string | null;
    building_material: string | null;
    combustible_items_5ft: string[] | null; // multi-select
    hardscape_surroundings: string | null;
    propane_near_structure: string | null;
    garbage_within_5ft: string | null;
    vents_screened: string | null;
    deck_material: string | null;
    attached_fencing: string | null;
    gutters_debris: string | null;
    chimney_branches: string | null;
    dead_plants_near_home: string | null;
    // Zone 1 — Intermediate (6–30 ft)
    zone1_ladder_fuels: string | null;
    zone1_low_branches: string | null;
    zone1_grass_overgrown: string | null;
    zone1_dead_plants: string | null;
    // Zone 2 — Extended (30–100 ft)
    zone2_leaf_litter: string | null;
    zone2_woodpile_near_veg: string | null;
    zone2_wooden_structures: string | null;
    zone2_ladder_fuels: string | null;
}

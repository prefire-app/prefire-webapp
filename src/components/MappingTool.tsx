/* eslint-disable @typescript-eslint/no-explicit-any -- TODO(step-12): refactor leaflet/leaflet-draw types, remove file-level disable */
import { useRef, useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { leafletLayer, PolygonSymbolizer } from "protomaps-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import "leaflet-draw";
import AddressSearchPopup from "./AddressSearchPopup";
import AnalyzerGuide from "./AnalyzerGuide";
import ConfirmSubmitPopup from "./ConfirmSubmitPopup";
import QuestionnairePopup from "./QuestionnairePopup";
import StateCountySelector from "./StateCountySelector";
import type { QuestionnaireAnswers } from "../types/questionnaire";
import { TIGERWEB_URL, PMTILES_BASE_URL, BUILDING_MIN_ZOOM, CA_CENTER, MAPBOX_SATELLITE_URL, MAPBOX_STREETS_URL, MAPBOX_ATTRIBUTION, MAX_POLYGONS_PER_REQUEST, MAX_VERTICES_PER_POLYGON } from "../lib/constants";
import { STATES } from "../lib/geo";

function CountyBoundary({ geojson }: { geojson: any }) {
    const map = useMap();
    const layerRef = useRef<L.GeoJSON | null>(null);

    useEffect(() => {
        if (!geojson) return;

        layerRef.current = L.geoJSON(geojson, {
            style: {
                color: "#D8BD8A",
                weight: 2.5,
                fillColor: "#D8BD8A",
                fillOpacity: 0.08,
            },
        });
        layerRef.current.addTo(map);

        return () => {
            if (layerRef.current) {
                map.removeLayer(layerRef.current);
                layerRef.current = null;
            }
        };
    }, [map, geojson]);

    return null;
}

function PMTilesBuildingsLayer({
    stateFips,
    visible,
}: {
    stateFips: string | null;
    visible: boolean;
}) {
    const map = useMap();
    const layerRef = useRef<any>(null);

    useEffect(() => {
        if (!visible || !stateFips) return;

        const url = `${PMTILES_BASE_URL}${stateFips}.pmtiles`;

        layerRef.current = leafletLayer({
            url,
            maxDataZoom: 15,
            paintRules: [
                {
                    dataLayer: "buildings",
                    symbolizer: new PolygonSymbolizer({
                        fill: "rgba(255, 107, 53, 0.15)",
                        stroke: "#FF6B35",
                        width: 1.5,
                    }),
                },
            ],
            labelRules: [],
        });
        layerRef.current.addTo(map);

        return () => {
            if (layerRef.current) {
                map.removeLayer(layerRef.current);
                layerRef.current = null;
            }
        };
    }, [map, visible, stateFips]);

    return null;
}

function ZoomTracker({
    onZoomChange,
}: {
    onZoomChange: (zoom: number) => void;
}) {
    const map = useMap();
    useMapEvents({ zoomend: () => onZoomChange(map.getZoom()) });
    useEffect(() => {
        onZoomChange(map.getZoom());
    }, [map, onZoomChange]);
    return null;
}

function LeafletDrawControls({
    onPolygonDrawn,
    onClearRef,
}: {
    onPolygonDrawn: (geojson: any) => void;
    onClearRef: (clearFn: () => void) => void;
}) {
    const map = useMap();
    const drawnItemsRef = useRef<L.FeatureGroup>(new L.FeatureGroup());

    useEffect(() => {
        map.addLayer(drawnItemsRef.current);
        onClearRef(() => drawnItemsRef.current.clearLayers());

        const drawControl = new L.Control.Draw({
            draw: {
                polygon: {},
                polyline: false,
                rectangle: false,
                circle: false,
                marker: false,
                circlemarker: false,
            },
            edit: {
                featureGroup: drawnItemsRef.current,
                remove: true,
            },
        });

        map.addControl(drawControl);

        function handleCreated(event: any) {
            const layer = (event as any).layer;
            drawnItemsRef.current.addLayer(layer);
            const geojson = layer.toGeoJSON();
            onPolygonDrawn(geojson);
        }

        map.on(L.Draw.Event.CREATED, handleCreated);

        return () => {
            map.off(L.Draw.Event.CREATED, handleCreated);
            map.removeControl(drawControl);
            map.removeLayer(drawnItemsRef.current);
        };
    }, [map, onPolygonDrawn]);

    return null;
}

export default function MappingTool() {
    const mapRef = useRef<any>(null);
    const [showGuide, setShowGuide] = useState(true);
    const [setupComplete, setSetupComplete] = useState(false);
    const [showSelector, setShowSelector] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedFips, setSelectedFips] = useState<string | null>(null);
    const [selectedStateFips, setSelectedStateFips] = useState<string | null>(
        null,
    );
    const [selectedStateCode, setSelectedStateCode] = useState<string | null>(null);
    const [countyGeoJSON, setCountyGeoJSON] = useState<any>(null);
    const [geometryLoading, setGeometryLoading] = useState(false);
    const [mapCenter, setMapCenter] = useState<[number, number]>(CA_CENTER);
    const [drawnPolygons, setDrawnPolygons] = useState<any[]>([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showQuestionnaire, setShowQuestionnaire] = useState(false);
    const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswers | null>(null);
    const [layer, setLayer] = useState<"mapbox" | "esri" | "topo">("mapbox");
    const [showBuildings, setShowBuildings] = useState(false);
    const [showDataNote, setShowDataNote] = useState(true);
    const [mapZoom, setMapZoom] = useState(10);

    const isBlocked = showGuide || showSelector || showModal || showQuestionnaire;

    const clearDrawnLayers = useRef<() => void>(() => {});

    const [drawError, setDrawError] = useState<string | null>(null);

    const handlePolygonDrawn = useCallback((geojson: any) => {
        setDrawnPolygons((prev) => {
            if (prev.length >= MAX_POLYGONS_PER_REQUEST) {
                setDrawError(
                    `Limit of ${MAX_POLYGONS_PER_REQUEST} polygons reached. Remove one before drawing another.`,
                );
                return prev;
            }
            const rings: number[][][] | undefined =
                geojson?.geometry?.coordinates;
            if (Array.isArray(rings)) {
                const totalVertices = rings.reduce(
                    (sum, ring) => sum + (Array.isArray(ring) ? ring.length : 0),
                    0,
                );
                if (totalVertices > MAX_VERTICES_PER_POLYGON) {
                    setDrawError(
                        `Polygon has ${totalVertices} vertices; max is ${MAX_VERTICES_PER_POLYGON}. Try a simpler shape.`,
                    );
                    return prev;
                }
            }
            setDrawError(null);
            return [...prev, geojson];
        });
    }, []);

    const handleMoveMap = (lat: number, lng: number) => {
        if (mapRef.current) {
            mapRef.current.setView([lat, lng], 17); // Zoom in on found address
        }
    };

    return (
        <div className="relative h-full flex flex-col p-6 md:p-12 md:pb-14 max-w-4xl mx-auto">
            <MapContainer
                center={mapCenter}
                zoom={10}
                maxZoom={22}
                className="flex-1 min-h-0 w-full rounded-lg shadow-lg border border-5 border-[#D8BD8A]"
                style={{ zIndex: 0 }}
                ref={mapRef}
                whenReady={() => {}}
            >
                {layer === "mapbox" && MAPBOX_SATELLITE_URL ? (
                    <TileLayer
                        url={MAPBOX_SATELLITE_URL}
                        attribution={MAPBOX_ATTRIBUTION}
                        tileSize={512}
                        zoomOffset={-1}
                        maxNativeZoom={22}
                        maxZoom={22}
                    />
                ) : layer === "topo" ? (
                    MAPBOX_STREETS_URL ? (
                        <TileLayer
                            url={MAPBOX_STREETS_URL}
                            attribution={MAPBOX_ATTRIBUTION}
                            tileSize={512}
                            zoomOffset={-1}
                            maxNativeZoom={22}
                            maxZoom={22}
                        />
                    ) : (
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                            attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
                            maxNativeZoom={19}
                            maxZoom={22}
                        />
                    )
                ) : (
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
                        maxNativeZoom={19}
                        maxZoom={22}
                    />
                )}
                <PMTilesBuildingsLayer stateFips={selectedStateFips} visible={showBuildings} />
                <ZoomTracker onZoomChange={setMapZoom} />
                <LeafletDrawControls
                    onPolygonDrawn={handlePolygonDrawn}
                    onClearRef={(fn) => { clearDrawnLayers.current = fn; }}
                />
                {selectedFips && selectedStateFips && countyGeoJSON && (
                    <CountyBoundary geojson={countyGeoJSON} />
                )}
            </MapContainer>
            {(showGuide || showSelector) && (
                <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
            )}
            {showGuide && (
                <div className="fixed inset-0 flex items-center justify-center z-20">
                    <AnalyzerGuide
                        onDismiss={() => {
                            setShowGuide(false);
                            if (!setupComplete) {
                                setShowSelector(true);
                            }
                        }}
                    />
                </div>
            )}
            {showSelector && (
                <div className="fixed inset-0 flex items-center justify-center z-20">
                    <StateCountySelector
                        onConfirm={async (sel) => {
                            setSelectedStateFips(sel.stateFips);
                            setSelectedStateCode(sel.stateCode);
                            setSelectedFips(sel.countyFips);
                            setCountyGeoJSON(null);
                            setShowSelector(false);
                            setSetupComplete(true);

                            const stateInfo = STATES.find((s) => s.code === sel.stateCode);
                            const stateCentroid = stateInfo?.centroid ?? CA_CENTER;

                            // No county: pan to state centroid and skip the geometry fetch
                            if (!sel.countyFips) {
                                setMapCenter(stateCentroid);
                                if (mapRef.current) {
                                    mapRef.current.setView(stateCentroid, 8);
                                }
                                setShowModal(true);
                                return;
                            }

                            setGeometryLoading(true);
                            try {
                                const params = new URLSearchParams({
                                    where: `STATE='${sel.stateFips}' AND COUNTY='${sel.countyFips}'`,
                                    outFields: "NAME",
                                    geometryPrecision: "5",
                                    f: "geojson",
                                    outSR: "4326",
                                });
                                const res = await fetch(`${TIGERWEB_URL}?${params}`);
                                const data = await res.json();
                                setCountyGeoJSON(data);

                                // Pan to county bbox centroid
                                let centroid = stateCentroid;
                                const coords =
                                    data?.features?.[0]?.geometry?.coordinates;
                                if (coords) {
                                    const flat: number[][] = [];
                                    const walk = (node: any) => {
                                        if (
                                            Array.isArray(node) &&
                                            typeof node[0] === "number"
                                        ) {
                                            flat.push(node as number[]);
                                        } else if (Array.isArray(node)) {
                                            node.forEach(walk);
                                        }
                                    };
                                    walk(coords);
                                    if (flat.length > 0) {
                                        const lngs = flat.map((c) => c[0]);
                                        const lats = flat.map((c) => c[1]);
                                        centroid = [
                                            (Math.min(...lats) + Math.max(...lats)) / 2,
                                            (Math.min(...lngs) + Math.max(...lngs)) / 2,
                                        ];
                                    }
                                }
                                setMapCenter(centroid);
                                if (mapRef.current) {
                                    mapRef.current.setView(centroid, 11);
                                }
                            } catch {
                                // Fall back to state centroid on failure
                                setMapCenter(stateCentroid);
                                if (mapRef.current) {
                                    mapRef.current.setView(stateCentroid, 8);
                                }
                            } finally {
                                setGeometryLoading(false);
                                setShowModal(true);
                            }
                        }}
                    />
                </div>
            )}
            {geometryLoading && (
                <div className="absolute inset-6 md:inset-12 md:bottom-14 z-20 flex items-center justify-center pointer-events-none">
                    <div className="flex items-center gap-3 bg-[#aa5042] border border-[#D8BD8A] rounded px-4 py-2 shadow-lg">
                        <svg
                            className="animate-spin h-5 w-5 text-[#efefd1]"
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
                        <span className="text-[#efefd1] text-sm">
                            Loading county boundary…
                        </span>
                    </div>
                </div>
            )}
            {showModal && (
                <AddressSearchPopup
                    onClose={() => setShowModal(false)}
                    onSearch={handleMoveMap}
                />
            )}
            {/* Button overlay — positioned to exactly match the map's edges */}
            <div className="absolute inset-6 md:inset-12 md:bottom-14 pointer-events-none z-10">
                {/* Data availability note */}
                {showDataNote && !isBlocked && drawnPolygons.length === 0 && (
                    <div className="absolute top-4 right-4 pointer-events-auto max-w-[15rem] md:max-w-xs bg-[#aa5042] border border-[#D8BD8A] rounded px-3 py-2 shadow-lg">
                        <button
                            onClick={() => setShowDataNote(false)}
                            aria-label="Dismiss note"
                            className="absolute top-1 right-1.5 text-[#efefd1] opacity-60 hover:opacity-100 text-xs leading-none"
                        >
                            ✕
                        </button>
                        <p className="text-[#efefd1] text-[10px] md:text-xs leading-snug pr-3">
                            Prefire uses free public imagery and building data. Some homes, especially in dense forest or mountainous terrain, may be
                            hidden or appear shifted. Try the{" "}
                            <span className="text-[#D8BD8A] font-medium">Aerial (NAIP)</span>{" "}
                            layer if the satellite view looks off.
                        </p>
                    </div>
                )}
                {/* Polygon count + submit */}
                {drawnPolygons.length > 0 && !showConfirm && (
                    <div className="absolute top-4 right-4 pointer-events-auto flex items-center gap-3 bg-[#aa5042] border border-[#D8BD8A] rounded px-4 py-2 shadow-lg">
                        <span className="text-[#efefd1] text-sm">
                            {drawnPolygons.length}{" "}
                            {drawnPolygons.length === 1 ? "polygon" : "polygons"}{" "}
                            drawn
                        </span>
                        <button
                            onClick={() => setShowQuestionnaire(true)}
                            className="bg-[#D8BD8A] text-black text-sm font-semibold px-3 py-1 rounded hover:bg-[#c9ae7a] transition-colors"
                        >
                            Done?
                        </button>
                        <button
                            onClick={() => {
                                setDrawnPolygons([]);
                                clearDrawnLayers.current();
                            }}
                            className="text-[#efefd1] opacity-60 hover:opacity-100 text-xs underline transition-opacity"
                        >
                            Clear
                        </button>
                    </div>
                )}
                {drawError && (
                    <div
                        role="alert"
                        className="absolute top-20 right-4 pointer-events-auto max-w-xs bg-yellow-200 border border-yellow-500 text-yellow-900 rounded px-3 py-2 shadow-lg text-xs"
                    >
                        <button
                            onClick={() => setDrawError(null)}
                            aria-label="Dismiss warning"
                            className="absolute top-0.5 right-1.5 opacity-60 hover:opacity-100 text-xs"
                        >
                            ✕
                        </button>
                        <p className="pr-3">{drawError}</p>
                    </div>
                )}
                {/* Help button */}
                {!showGuide && (
                    <button
                        onClick={() => setShowGuide(true)}
                        aria-label="Open guide"
                        className={`absolute bottom-20 md:bottom-6 left-4 pointer-events-auto w-9 h-9 flex items-center justify-center rounded-full bg-[#aa5042] border border-[#D8BD8A] text-[#efefd1] text-sm font-bold shadow-lg hover:bg-[#c0604e] transition-colors transition-opacity ${
                            isBlocked ? "opacity-50 pointer-events-none" : ""
                        }`}
                    >
                        ?
                    </button>
                )}
                {/* Layer dropdown */}
                <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto flex items-center gap-2 md:gap-3 transition-opacity ${isBlocked ? "opacity-50 pointer-events-none" : ""}`}>
                    <select
                        value={layer}
                        onChange={(e) => setLayer(e.target.value as "mapbox" | "esri" | "topo")}
                        aria-label="Base map layer"
                        className="px-2 py-1 text-xs md:px-3 md:py-2 md:text-sm font-medium rounded shadow-lg border border-[#D8BD8A] bg-[#aa5042] text-[#efefd1] hover:bg-[#c0604e] transition-colors cursor-pointer appearance-none pr-7 bg-no-repeat bg-right"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='%23efefd1' d='M0 0l5 6 5-6z'/></svg>\")",
                            backgroundPosition: "right 0.5rem center",
                            backgroundSize: "10px 6px",
                        }}
                    >
                        <option value="mapbox">Satellite (Mapbox)</option>
                        <option value="esri">Aerial (Esri / NAIP)</option>
                        <option value="topo">Streets (Mapbox)</option>
                    </select>
                    <div className="relative group">
                        <button
                            onClick={() => setShowBuildings((b) => !b)}
                            disabled={mapZoom < BUILDING_MIN_ZOOM}
                            className={`px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm font-medium rounded shadow-lg border transition-colors ${
                                mapZoom < BUILDING_MIN_ZOOM
                                    ? "bg-[#6b3d37] text-[#efefd1] opacity-50 border-[#D8BD8A] cursor-not-allowed"
                                    : showBuildings
                                    ? "bg-[#FF6B35] text-white border-[#FF6B35] hover:bg-[#e55a25]"
                                    : "bg-[#aa5042] text-[#efefd1] border-[#D8BD8A] hover:bg-[#c0604e]"
                            }`}
                        >
                            Building Footprints
                        </button>
                        {mapZoom < BUILDING_MIN_ZOOM && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 text-center text-xs text-[#efefd1] bg-black bg-opacity-75 rounded px-2 py-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                Zoom in further to enable building footprints
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showQuestionnaire && (
                <QuestionnairePopup
                    onComplete={(answers) => {
                        setQuestionnaireAnswers(answers);
                        setShowQuestionnaire(false);
                        setShowConfirm(true);
                    }}
                />
            )}
            {showConfirm && selectedStateFips && (
                <ConfirmSubmitPopup
                    drawnPolygons={drawnPolygons}
                    onClose={() => setShowConfirm(false)}
                    fips={selectedFips}
                    state={selectedStateCode ?? "CA"}
                    questionnaire={questionnaireAnswers}
                />
            )}
        </div>
    );
}

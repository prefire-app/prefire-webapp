import { useRef, useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { leafletLayer, PolygonSymbolizer } from "protomaps-leaflet";
import type { Feature, Polygon } from "geojson";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import "leaflet-draw";
import AddressSearchPopup from "./AddressSearchPopup";
import AnalyzerGuide from "./AnalyzerGuide";
import ConfirmSubmitPopup from "./ConfirmSubmitPopup";
import QuestionnairePopup from "./QuestionnairePopup";
import type { QuestionnaireAnswers } from "../types/questionnaire";
import { PMTILES_BASE_URL, BUILDING_MIN_ZOOM, MAPBOX_SATELLITE_URL, MAPBOX_STREETS_URL, MAPBOX_ATTRIBUTION, CA_CENTER } from "../lib/constants";

function PMTilesBuildingsLayer({
    stateFips,
    visible,
}: {
    stateFips: string | null;
    visible: boolean;
}) {
    const map = useMap();
    const layerRef = useRef<L.Layer | null>(null);

    useEffect(() => {
        if (!visible || !stateFips) return;

        const url = `${PMTILES_BASE_URL}${stateFips}.pmtiles`;

        const pmLayer = leafletLayer({
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
        }) as unknown as L.Layer;
        layerRef.current = pmLayer;
        pmLayer.addTo(map);

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
    onPolygonDrawn: (geojson: Feature<Polygon>) => void;
    onClearRef: (clearFn: () => void) => void;
}) {
    const map = useMap();
    const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
    if (!drawnItemsRef.current) drawnItemsRef.current = new L.FeatureGroup();

    useEffect(() => {
        const drawnItems = drawnItemsRef.current!;
        map.addLayer(drawnItems);
        onClearRef(() => drawnItems.clearLayers());

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
                featureGroup: drawnItems,
                remove: true,
            },
        });

        map.addControl(drawControl);

        function handleCreated(event: L.LeafletEvent) {
            const layer = (event as L.DrawEvents.Created).layer;
            drawnItems.addLayer(layer);
            const geojson = (layer as L.Polygon).toGeoJSON() as Feature<Polygon>;
            onPolygonDrawn(geojson);
        }

        map.on(L.Draw.Event.CREATED, handleCreated);

        return () => {
            map.off(L.Draw.Event.CREATED, handleCreated);
            map.removeControl(drawControl);
            map.removeLayer(drawnItems);
        };
    }, [map, onPolygonDrawn, onClearRef]);

    return null;
}

export default function MappingTool() {
    const mapRef = useRef<L.Map | null>(null);
    const [showGuide, setShowGuide] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedCountyFips, setSelectedCountyFips] = useState<string | null>(null);
    const [selectedStateFips, setSelectedStateFips] = useState<string | null>(
        null,
    );
    const [selectedStateCode, setSelectedStateCode] = useState<string | null>(null);
    const [drawnPolygons, setDrawnPolygons] = useState<Feature<Polygon>[]>([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showQuestionnaire, setShowQuestionnaire] = useState(false);
    const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswers | null>(null);
    const [layer, setLayer] = useState<"mapbox" | "esri" | "topo">("mapbox");
    const [showBuildings, setShowBuildings] = useState(false);
    const [showDataNote, setShowDataNote] = useState(true);
    const [mapZoom, setMapZoom] = useState(10);

    const isBlocked = showGuide || showModal || showQuestionnaire;

    useEffect(() => {
        const previous = document.title;
        document.title = "Map \u2014 Prefire";
        return () => {
            document.title = previous;
        };
    }, []);

    const clearDrawnLayers = useRef<() => void>(() => {});

    const handlePolygonDrawn = useCallback((geojson: Feature<Polygon>) => {
        setDrawnPolygons((prev) => [...prev, geojson]);
    }, []);

    const handleMoveMap = (lat: number, lng: number) => {
        if (mapRef.current) {
            mapRef.current.setView([lat, lng], 17); // Zoom in on found address
        }
    };

    return (
        <div className="relative h-full flex flex-col p-6 md:p-12 md:pb-14 max-w-4xl mx-auto">
            <MapContainer
                center={CA_CENTER}
                zoom={5}
                maxZoom={22}
                className="flex-1 min-h-0 w-full rounded-lg shadow-lg border border-5 border-[#D8BD8A]"
                style={{ zIndex: 0 }}
                ref={mapRef}
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
            </MapContainer>
            {showGuide && (
                <AnalyzerGuide
                    onDismiss={() => {
                        setShowGuide(false);
                        setShowModal(true);
                    }}
                />
            )}
            {showModal && (
                <AddressSearchPopup
                    onClose={(area) => {
                        setShowModal(false);
                        if (area) {
                            setSelectedStateFips(area.stateFips);
                            setSelectedStateCode(area.stateCode);
                            setSelectedCountyFips(area.countyFips);
                        }
                    }}
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
                {/* Re-open address search (visible after dismissal or to change address) */}
                {!showModal && !showGuide && (
                    <button
                        onClick={() => setShowModal(true)}
                        className={`absolute top-4 left-20 pointer-events-auto px-3 py-1.5 text-xs md:text-sm font-medium rounded shadow-lg bg-[#aa5042] border border-[#D8BD8A] text-[#efefd1] hover:bg-[#c0604e] transition-colors transition-opacity ${
                            isBlocked ? "opacity-50 pointer-events-none" : ""
                        }`}
                    >
                        {selectedStateFips ? "Change address" : "Search address"}
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
            {showConfirm && (
                <ConfirmSubmitPopup
                    drawnPolygons={drawnPolygons}
                    onClose={() => setShowConfirm(false)}
                    fips={selectedCountyFips}
                    state={selectedStateCode}
                    questionnaire={questionnaireAnswers}
                />
            )}
        </div>
    );
}

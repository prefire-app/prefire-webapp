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
import StateCountySelector from "./StateCountySelector";

const TIGERWEB_URL =
    "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/1/query";

function CountyBoundary({
    stateFips,
    countyFips,
}: {
    stateFips: string;
    countyFips: string;
}) {
    const map = useMap();
    const layerRef = useRef<L.GeoJSON | null>(null);

    useEffect(() => {
        const params = new URLSearchParams({
            where: `STATE='${stateFips}' AND COUNTY='${countyFips}'`,
            outFields: "NAME",
            geometryPrecision: "5",
            f: "geojson",
            outSR: "4326",
        });

        fetch(`${TIGERWEB_URL}?${params}`)
            .then((res) => res.json())
            .then((data) => {
                if (layerRef.current) {
                    map.removeLayer(layerRef.current);
                }
                layerRef.current = L.geoJSON(data, {
                    style: {
                        color: "#D8BD8A",
                        weight: 2.5,
                        fillColor: "#D8BD8A",
                        fillOpacity: 0.08,
                    },
                });
                layerRef.current.addTo(map);
            })
            .catch(() => {
                // silently fail — outline is decorative
            });

        return () => {
            if (layerRef.current) {
                map.removeLayer(layerRef.current);
                layerRef.current = null;
            }
        };
    }, [map, stateFips, countyFips]);

    return null;
}

const PMTILES_URL =
    "https://prefire-dev-data.s3.us-east-1.amazonaws.com/pmtiles/buildings-ca.pmtiles";
const BUILDING_MIN_ZOOM = 12;

function PMTilesBuildingsLayer({ visible }: { visible: boolean }) {
    const map = useMap();
    const layerRef = useRef<any>(null);

    useEffect(() => {
        if (visible) {
            layerRef.current = leafletLayer({
                url: PMTILES_URL,
                maxDataZoom: 16,
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
        }

        return () => {
            if (layerRef.current) {
                map.removeLayer(layerRef.current);
                layerRef.current = null;
            }
        };
    }, [map, visible]);

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

const center: [number, number] = [36.7783, -119.4179]; // California fallback

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
    const [mapCenter, setMapCenter] = useState<[number, number]>(center);
    const [drawnPolygons, setDrawnPolygons] = useState<any[]>([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [layer, setLayer] = useState<"satellite" | "street">("satellite");
    const [showBuildings, setShowBuildings] = useState(false);
    const [mapZoom, setMapZoom] = useState(10);

    const isBlocked = showGuide || showSelector || showModal;

    const clearDrawnLayers = useRef<() => void>(() => {});

    const handlePolygonDrawn = useCallback((geojson: any) => {
        setDrawnPolygons((prev) => [...prev, geojson]);
    }, []);

    const handleMoveMap = (lat: number, lng: number) => {
        if (mapRef.current) {
            mapRef.current.setView([lat, lng], 17); // Zoom in on found address
        }
    };

    return (
        <div className="relative flex justify-center items-center w-full">
            <MapContainer
                center={mapCenter}
                zoom={10}
                maxZoom={22}
                className="h-[750px] w-[85vw] rounded-lg shadow-lg border border-5 border-[#D8BD8A]"
                style={{ zIndex: 0, height: "750px", width: "85%" }}
                ref={mapRef}
                whenReady={() => {}}
            >
                {layer === "satellite" ? (
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        maxNativeZoom={19}
                        maxZoom={22}
                    />
                ) : (
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                        attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
                        maxNativeZoom={19}
                        maxZoom={22}
                    />
                )}
                <PMTilesBuildingsLayer visible={showBuildings} />
                <ZoomTracker onZoomChange={setMapZoom} />
                <LeafletDrawControls
                    onPolygonDrawn={handlePolygonDrawn}
                    onClearRef={(fn) => { clearDrawnLayers.current = fn; }}
                />
                {selectedFips && selectedStateFips && (
                    <CountyBoundary
                        stateFips={selectedStateFips}
                        countyFips={selectedFips}
                    />
                )}
            </MapContainer>
            {(showGuide || showSelector || showModal) && (
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
                        onConfirm={(fips, centroid, stateFips) => {
                            setSelectedFips(fips);
                            setSelectedStateFips(stateFips);
                            setMapCenter(centroid);
                            if (mapRef.current) {
                                mapRef.current.setView(centroid, 11);
                            }
                            setSetupComplete(true);
                            setShowSelector(false);
                            setShowModal(true);
                        }}
                    />
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-20">
                    <AddressSearchPopup
                        onClose={() => setShowModal(false)}
                        onSearch={handleMoveMap}
                    />
                </div>
            )}
            {/* Polygon count + submit */}
            {drawnPolygons.length > 0 && !showConfirm && (
                <div className="absolute top-4 right-[8%] z-10 flex items-center gap-3 bg-[#aa5042] border border-[#D8BD8A] rounded px-4 py-2 shadow-lg">
                    <span className="text-[#efefd1] text-sm">
                        {drawnPolygons.length}{" "}
                        {drawnPolygons.length === 1 ? "polygon" : "polygons"}{" "}
                        drawn
                    </span>
                    <button
                        onClick={() => setShowConfirm(true)}
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
                    className={`absolute bottom-6 left-[10%] z-10 w-9 h-9 flex items-center justify-center rounded-full bg-[#aa5042] border border-[#D8BD8A] text-[#efefd1] text-sm font-bold shadow-lg hover:bg-[#c0604e] transition-colors transition-opacity ${
                        isBlocked ? "opacity-50 pointer-events-none" : ""
                    }`}
                >
                    ?
                </button>
            )}
            {/* Layer toggle */}
            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 transition-opacity ${isBlocked ? "opacity-50 pointer-events-none" : ""}`}>
                <div className="flex rounded overflow-hidden shadow-lg border border-[#D8BD8A]">
                    <button
                        onClick={() => setLayer("satellite")}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            layer === "satellite"
                                ? "bg-[#D8BD8A] text-black"
                                : "bg-[#aa5042] text-[#efefd1] hover:bg-[#c0604e]"
                        }`}
                    >
                        Satellite
                    </button>
                    <button
                        onClick={() => setLayer("street")}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            layer === "street"
                                ? "bg-[#D8BD8A] text-black"
                                : "bg-[#aa5042] text-[#efefd1] hover:bg-[#c0604e]"
                        }`}
                    >
                        Topo
                    </button>
                </div>
                <div className="relative group">
                    <button
                        onClick={() => setShowBuildings((b) => !b)}
                        disabled={mapZoom < BUILDING_MIN_ZOOM}
                        className={`px-4 py-2 text-sm font-medium rounded shadow-lg border transition-colors ${
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
            {showConfirm && selectedFips && (
                <ConfirmSubmitPopup
                    drawnPolygons={drawnPolygons}
                    onClose={() => setShowConfirm(false)}
                    onClear={() => {
                        setDrawnPolygons([]);
                        clearDrawnLayers.current();
                        setShowConfirm(false);
                    }}
                    fips={selectedFips}
                />
            )}
        </div>
    );
}

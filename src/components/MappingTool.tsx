import { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import "leaflet-draw";
import AddressSearchPopup from "./AddressSearchPopup";
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

const center: [number, number] = [36.7783, -119.4179]; // California fallback

function LeafletDrawControls({
    onPolygonDrawn,
}: {
    onPolygonDrawn: (geojson: any) => void;
}) {
    const map = useMap();
    const drawnItemsRef = useRef<L.FeatureGroup>(new L.FeatureGroup());

    useEffect(() => {
        map.addLayer(drawnItemsRef.current);

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

        map.on(L.Draw.Event.CREATED, function (event: any) {
            const layer = event.layer;
            drawnItemsRef.current.addLayer(layer);
            const geojson = layer.toGeoJSON();
            onPolygonDrawn(geojson);
        });

        return () => {
            map.removeControl(drawControl);
            map.removeLayer(drawnItemsRef.current);
        };
    }, [map, onPolygonDrawn]);

    return null;
}

export default function MappingTool() {
    const mapRef = useRef<any>(null);
    const [showSelector, setShowSelector] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedFips, setSelectedFips] = useState<string | null>(null);
    const [selectedStateFips, setSelectedStateFips] = useState<string | null>(
        null,
    );
    const [mapCenter, setMapCenter] = useState<[number, number]>(center);
    const [drawnPolygon, setDrawnPolygon] = useState(null);
    const [layer, setLayer] = useState<"satellite" | "street">("satellite");

    const handlePolygonDrawn = async (geojson: any) => {
        console.log("Polygon GeoJSON:", geojson);
        setDrawnPolygon(geojson);
    };

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
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        maxNativeZoom={19}
                        maxZoom={22}
                    />
                )}
                <LeafletDrawControls onPolygonDrawn={handlePolygonDrawn} />
                {selectedFips && selectedStateFips && (
                    <CountyBoundary
                        stateFips={selectedStateFips}
                        countyFips={selectedFips}
                    />
                )}
            </MapContainer>
            {(showSelector || showModal) && (
                <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
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
            {/* Layer toggle */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex rounded overflow-hidden shadow-lg border border-[#D8BD8A]">
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
                    Street
                </button>
            </div>
            {drawnPolygon && selectedFips && (
                <ConfirmSubmitPopup
                    drawnPolygon={drawnPolygon}
                    setDrawnPolygon={setDrawnPolygon}
                    fips={selectedFips}
                />
            )}
        </div>
    );
}

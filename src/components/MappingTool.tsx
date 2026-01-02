import { useRef, useEffect, useState, use, useCallback } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import "leaflet-draw";
import AddressSearchPopup from "./AddressSearchPopup";
import ConfirmSubmitPopup from "./ConfirmSubmitPopup";

const center: [number, number] = [37.7749, -122.4194]; // San Francisco

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

        console.log("LeafletDrawControls rendered");
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
    const [showModal, setShowModal] = useState(true);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [drawnPolygons, setDrawnPolygons] = useState<any[]>([]);

    const handlePolygonDrawn = useCallback((geojson: any) => {
        setDrawnPolygons((prev) => {
            console.log("Previous polygons:", prev);
            const updatedPolygons = [...prev, geojson];
            console.log("Updated polygons:", updatedPolygons);
            return updatedPolygons;
        });
        setShowConfirmPopup(true);
    }, []);

    useEffect(() => {
        console.log("drawnPolygons updated:", drawnPolygons);
    }, [drawnPolygons]);

    const handleMoveMap = (lat: number, lng: number) => {
        if (mapRef.current) {
            mapRef.current.setView([lat, lng], 17); // Zoom in on found address
        }
    };

    return (
        <div className="relative flex justify-center items-center w-full">
            <MapContainer
                center={center}
                zoom={15}
                className="h-[750px] w-[85vw] rounded-lg shadow-lg border border-5 border-[#D8BD8A]"
                style={{ zIndex: 0, height: "750px", width: "85%" }}
                ref={mapRef}
                whenReady={() => {}}
            >
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}@2x.jpg"
                    maxNativeZoom={18}
                    maxZoom={25}
                />
                <LeafletDrawControls onPolygonDrawn={handlePolygonDrawn} />
            </MapContainer>
            {showModal && (
                <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
            )}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-20">
                    <AddressSearchPopup
                        onClose={() => setShowModal(false)}
                        onSearch={handleMoveMap}
                    />
                </div>
            )}
            {drawnPolygons && drawnPolygons.length > 0 && showConfirmPopup && (
                <ConfirmSubmitPopup
                    drawnPolygons={drawnPolygons}
                    setDrawnPolygons={setDrawnPolygons}
                    setShowConfirmPopup={setShowConfirmPopup}
                />
            )}
        </div>
    );
}

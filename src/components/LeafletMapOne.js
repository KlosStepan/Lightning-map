import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const position = [50.0755, 14.4378];  // Coordinates for Prague

const LeafletMapOne = () => {
    return (
        <>
            <style>{`
                .map-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    max-height: 100vh;
                    height: 100%;
                }

                .leaflet-container {
                    width: 80vw;
                    max-height: 100vh;
                    border: 2px solid #ccc;
                    border-radius: 12px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
            `}</style>
            <div className="map-container">
                <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A beautiful popup in Prague. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </>
    );
}

export default LeafletMap;

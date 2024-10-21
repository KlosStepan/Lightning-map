import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const position = [50.0755, 14.4378];

const LeafletMapTwo = () => {
    return (
        <React.Fragment>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
                </Marker>
            </MapContainer>
        </React.Fragment>
    )
}

export default LeafletMapTwo;
import React, { useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapDummy = () => {
  const mapRef = useRef(null);
  const latitude = 51.505;
  const longitude = -0.09;

  return ( 
    // Make sure you set the height and width of the map container otherwise the map won't show
    //style={{height: "100vh", width: "100vw"}}
    //style={{height: "50vh", width: "50vw"}}
      <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} style={{height: "50vh", width: "25vw"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Additional map layers or components can be added here */}
      </MapContainer>
  );
};

export default MapDummy;

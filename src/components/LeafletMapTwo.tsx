import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../redux-rtk/store";
import IMerchant  from "../ts/IMerchant";

import group10 from "../icons/group10.png";
import group13 from "../icons/group13.png";

// Function to create a custom Leaflet icon
const createCustomIconWithText = (iconUrl: string, text: string, selected: boolean = false): L.DivIcon => {
  const purple = "#F23CFF";
  const purpleSelected = "#8000FF";

  const textDiv = `
    <div style="font-size: 14px; font-weight: 500; line-height: 18.2px; color: black; border: 1px solid ${purple}; border-radius: 100px; background-color: white; padding: 4px 10px; margin-top: 5px; text-align: center; display: inline-block; white-space: nowrap; font-family: 'IBM Plex Sans Condensed', sans-serif;">
      ${text}
    </div>`;

  const textDivSelected = `
    <div style="font-size: 14px; font-weight: 500; line-height: 18.2px; color: white; border: 1px solid ${purpleSelected}; border-radius: 100px; background-color: ${purpleSelected}; padding: 4px 10px; margin-top: 5px; text-align: center; display: inline-block; white-space: nowrap; font-family: 'IBM Plex Sans Condensed', sans-serif;">
      ${text}
    </div>`;

  return L.divIcon({
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <img src="${iconUrl}" style="width: 25px; height: 41px;" />
        ${selected ? textDivSelected : textDiv}
      </div>`,
    className: "custom-div-icon",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
  });
};

// Define props
interface LeafletMapTwoProps {
  data: IMerchant[];
  onMerchantSelect?: (merchant: IMerchant) => void;
  w?: string;
  h?: string;
}

const LeafletMapTwo: React.FC<LeafletMapTwoProps> = ({ data, onMerchantSelect, w = "25vw", h = "75vh" }) => {
  const mapRef = useRef<L.Map | null>(null);
  const selected = useSelector((state: RootState) => state.mapFiltering.selected);

  const latitude = 50.0755;
  const longitude = 14.4378;

  const handleMarkerClick = (merchant: IMerchant) => {
    if (onMerchantSelect) {
      onMerchantSelect(merchant);
    }
  };

  return (
    <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} style={{ height: h, width: w }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {data?.map((merchant, index) => (
        <Marker
          key={index}
          position={[merchant.geometry.coordinates[1], merchant.geometry.coordinates[0]]}
          icon={
            selected?.properties.name !== merchant.properties.name
              ? createCustomIconWithText(group13, merchant.properties.name)
              : createCustomIconWithText(group10, merchant.properties.name, true)
          }
          eventHandlers={{
            click: () => handleMarkerClick(merchant),
          }}
        />
      ))}
    </MapContainer>
  );
};

export default LeafletMapTwo;

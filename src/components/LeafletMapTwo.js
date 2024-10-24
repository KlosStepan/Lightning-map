import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LightningIcon } from "../icons/LightningIcon";
//
import group10 from '../icons/group10.png';
import group13 from '../icons/group13.png';
//Redux / RTK
//import { RootState } from "../redux-rtk/store";
import { useSelector } from "react-redux";

// Function to create a custom icon
const createCustomIconWithText = (iconUrl, text) => {
  //TODO - swap if Selected - 13 : 10
  //let iconUrl = group10;
  return L.divIcon({
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <img src="${iconUrl}" style="width: 25px; height: 41px;" />
        <div style="font-size: 12px; color: black; width: auto; border: 1px solid black; border-radius: 5px; padding: 2px; margin-top: 5px; text-align: center;">
          ${text}
        </div>
      </div>`,
    className: 'custom-div-icon',  // Add a class for any custom styling
    iconSize: [25, 41],  // Adjust the size as necessary
    iconAnchor: [12.5, 41],  // Adjust to ensure the icon is centered on the coordinates (half width, full height)
  });
};


const LeafletMapTwo = ({ data, onMerchantSelect }) => {
    const mapRef = useRef(null);
    //retrieve merchant
    const selected = useSelector((state/*: RootState*/) => state.mapFiltering.selected)
    //mby redo
    const latitude = 50.0755;
    const longitude = 14.4378;

    const handleMarkerClick = (merchant) => {
        //setSelectedMerchant(merchant);  // Set selected merchant
        if (onMerchantSelect) {
            onMerchantSelect(merchant);  // Call the parent callback, if provided
        }
    };

    return ( 
        <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} style={{height: "50vh", width: "25vw"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data?.map((merchant, index) => (
              <Marker 
                  key={index} 
                  position={[merchant.geometry.coordinates[1], merchant.geometry.coordinates[0]]} 
                  //switching on selected
                  icon={
                    selected?.properties.title !== merchant.properties.title 
                    ? createCustomIconWithText(group13, merchant.properties.title)
                    : createCustomIconWithText(group10, merchant.properties.title)
                  }
                  eventHandlers={{
                      click: () => handleMarkerClick(merchant),  // Set selected merchant in parent
                  }}
              />
          ))}
        </MapContainer>
    );
}

export default LeafletMapTwo;

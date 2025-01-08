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

// Function to create a custom icon with styled text
const createCustomIconWithText = (iconUrl, text, selected = false) => {
  const purple = '#F23CFF';
  const purpleSelected = '#8000FF';

  // Default textDiv
  const textDiv = `
    <div style="font-size: 14px; font-weight: 500; line-height: 18.2px; color: black; border: 1px solid ${purple}; border-radius: 100px; background-color: white; padding: 4px 10px 4px 10px; margin-top: 5px; text-align: center; display: inline-block; white-space: nowrap; font-family: 'IBM Plex Sans Condensed', sans-serif;">
      ${text}
    </div>`;

  // Selected textDiv2
  const textDiv2 = `
    <div style="font-size: 14px; font-weight: 500; line-height: 18.2px; color: white; border: 1px solid ${purpleSelected}; border-radius: 100px; background-color: ${purpleSelected}; padding: 4px 10px 4px 10px; margin-top: 5px; text-align: center; display: inline-block; white-space: nowrap; font-family: 'IBM Plex Sans Condensed', sans-serif;">
      ${text}
    </div>`;

  // Decide which div to use based on selected
  const chosenTextDiv = selected ? textDiv2 : textDiv;

  return L.divIcon({
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <img src="${iconUrl}" style="width: 25px; height: 41px;" />
        ${chosenTextDiv}
      </div>`,
    className: 'custom-div-icon',  // Add a class for additional custom styling
    iconSize: [25, 41],  // Adjust the size as necessary
    iconAnchor: [12.5, 41],  // Adjust to center the icon on the coordinates
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
        <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} style={{height: "75vh", width: "25vw"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {/* url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" */ /* OG */}
          {/* url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" */ /* Good, not sure about usage. */}
          {/* url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" */ /* prolly good */}
          {data?.map((merchant, index) => (
              <Marker 
                  key={index} 
                  position={[merchant.geometry.coordinates[1], merchant.geometry.coordinates[0]]} 
                  //switching on selected
                  icon={
                    selected?.properties.title !== merchant.properties.title 
                    ? createCustomIconWithText(group13, merchant.properties.title)
                    : createCustomIconWithText(group10, merchant.properties.title, true)
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

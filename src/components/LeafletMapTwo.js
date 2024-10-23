import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

//
import group10 from '../icons/group10.png';
import group13 from '../icons/group13.png';
// Function to create a custom icon
const createCustomIcon = () => {
    return L.icon({
        //iconUrl: `/path/to/your/icons/${imageName}.png`,  // Update this with the actual path to your icons
        conUrl: group10,
        iconSize: [32, 32],  // Adjust the size of the icons
        iconAnchor: [16, 32],  // Position the icon correctly (centered at the bottom)
    });
};

// Function to create a selected icon (you can customize this)
const createSelectedIcon = () => {
    return L.icon({
        //iconUrl: `/path/to/your/icons/selectedIcon.png`,  // Custom icon for selected marker
        iconUrl: group13,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    });
};

const LeafletMapTwo = ({ data, onMerchantSelect }) => {
    const mapRef = useRef(null);
    const [selectedMerchant, setSelectedMerchant] = useState(null); // State to track selected merchant
    const latitude = 50.0755;
    const longitude = 14.4378;

    const merchants2 = [
      {
        "geometry": {
          "coordinates": [14.4483471, 50.1033561],
          "type": "Point"
        },
        "properties": {
          "owner": "OxMuB2PyqsM3pUtwTEmB86EzM9p1",
          "visible": true,
          "image": "dummyImgTile1",  // Image name for custom icon
          "title": "Paralelní Polis",
          "description": "lorem ipsum2",
        },
        "type": "Feature"
      },
      {
        "geometry": {
          "coordinates": [14.4440644, 50.0719584],
          "type": "Point"
        },
        "properties": {
          "owner": "7G9IT4IfBBV2JV8UJDhiMPzYWOq2",
          "visible": true,
          "image": "dummyImgTile2",  // Image name for custom icon
          "title": "Blue Vegan Pig Shop",
          "description": "lorem ipsum",
        },
        "type": "Feature"
      }
    ];

    const handleMarkerClick = (merchant) => {
        setSelectedMerchant(merchant);  // Set selected merchant
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

          {/* Loop through merchants and place markers */}
          {data?.map((merchant, index) => (
              <Marker 
                  key={index} 
                  position={[merchant.geometry.coordinates[1], merchant.geometry.coordinates[0]]} 
                  //icon={selectedMerchant === merchant ? createSelectedIcon() : createCustomIcon(merchant.properties.image)}  // Change icon if selected
                  //icon={createCustomIcon}
                  eventHandlers={{
                      click: () => handleMarkerClick(merchant),  // Change icon on click
                  }}
              />
          ))}
        </MapContainer>
    );
}

export default LeafletMapTwo;

import React, { useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMapTwo = ({ /*geoJSON*/ }) => {
    const mapRef = useRef(null);
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
          "image": "dummyImgTile1",
          "title": "Paralelní Polis",
          "description": "lorem ipsum2",
          address: {
            address: "Dělnická 43",
            city: "Praha 7",
            postalCode: "170 00",
          },
          "tags": ["Shops", "Services"],
          "socials": [
            {
              "network": "web",
              "label": "Web",
              "link": "https://www.paralelnipolis.com"
            },
            {
              "network": "facebook",
              "label": "FB",
              "link": "https://www.facebook.com/paralelnipolis"
            },
            {
              "network": "instagram",
              "label": "IG",
              "link": "https://www.instagram.com/paralelnipolis"
            },
            {
              "network": "twitter",
              "label": "X",
              "link": "https://www.twitter.com/paralelnipolis"
            }
          ]
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
          "image": "dummyImgTile2",
          "title": "Blue Vegan Pig Shop",
          "description": "lorem ipsum",
          address: {
            address: "Štefánikova 6",
            city: "Praha 5",
            postalCode: "150 00",
          },
          "tags": ["Food & Drinks", "Shops"],
          "socials": [
            {
              "network": "web",
              "label": "Web",
              "link": "https://www.blueveganpigshop.com"
            },
            {
              "network": "facebook",
              "label": "FB",
              "link": "https://www.facebook.com/blueveganpigshop"
            },
            {
              "network": "instagram",
              "label": "IG",
              "link": "https://www.instagram.com/blueveganpigshop"
            },
            {
              "network": "twitter",
              "label": "X",
              "link": "https://www.twitter.com/blueveganpigshop"
            }
          ]
        },
        "type": "Feature"
      }
    ];
  

    
    return ( 
      // Make sure you set the height and width of the map container otherwise the map won't show
      //style={{height: "100vh", width: "100vw"}}
      //style={{height: "50vh", width: "50vw"}}
        <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} style={{height: "50vh", width: "25vw"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Render the passed geoJSON prop */}
          <GeoJSON data={merchants2} />
        </MapContainer>
    );
}

export default LeafletMapTwo;
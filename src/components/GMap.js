import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  // Snazzy Maps style JSON (replace this with your chosen style)
  const mapStyles = [
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        { "color": "#e9e9e9" },
        { "lightness": 17 }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        { "color": "#f5f5f5" },
        { "lightness": 20 }
      ]
    },
    // Add more style objects as needed
  ];

  // Handler for when the Google Maps API is loaded
  const handleApiLoaded = (map, maps) => {
    // You can interact with the map and maps objects here
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }} // Replace with your actual API key
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{
          styles: mapStyles, // Apply Snazzy Maps styles here
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

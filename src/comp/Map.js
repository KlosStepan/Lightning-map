import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import '../App.css';
//import geoJson from "../chicago-parks.json";

import light16 from '../icons/light16.png'
import light24 from '../icons/light24.png'
import light32 from '../icons/light32.png'
import light64 from '../icons/light64.png'
import light128 from '../icons/light128.png'

import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';

mapboxgl.accessToken =
  "pk.eyJ1IjoicHduc3RlcG8iLCJhIjoiY2w3YWltaDBrMHNyMzNxbzhrbWR3cG54byJ9.VzxNCsvHqjjolwUOn1VAdQ";

const Map = (props: any) => {
  const mapContainerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/pwnstepo/cl7aiq2qd003g15nqmwwpyglr",
      center: [14.498, 50.065],
      zoom: 10.35,
    });

    map.on("load", function () {
      // Add an image to use as a custom marker
      map.loadImage(
        //"https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        light64,
        function (error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          // Add a GeoJSON source with multiple points
          map.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              //features: geoJson.features,
              features: props.pins,
            },
          });
          // Add a symbol layer
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });
    //console.log("props pins")
    //console.log(props.pins)
    //console.log("geoJSON pins")
    //console.log(geoJson.features)

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, [props.pins]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map
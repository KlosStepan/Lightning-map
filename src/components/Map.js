import React, { useRef, useEffect } from "react";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import '../App.css';

//TODO https://github.com/visgl/react-map-gl/issues/1266
import light64 from '../icons/light64.png'

mapboxgl.accessToken =
  "pk.eyJ1IjoicHduc3RlcG8iLCJhIjoiY2w3YWltaDBrMHNyMzNxbzhrbWR3cG54byJ9.VzxNCsvHqjjolwUOn1VAdQ";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

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
    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, [props.pins]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map
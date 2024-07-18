import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import icon from "./SearchIcon";

// Cordinates of Marcillac
const center = [45.269169177925754, -0.5231516014256281];
const purpleOptions = { color: "white" };

function LeafletgeoSearch() {
  const map = useMap();
  useEffect(() => {
 const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
    
      provider,
      marker: {
        icon
      }
    });

    map.addControl(searchControl);
    
    return () => map.removeControl(searchControl);
 
  }, []);

  return null;
}

export default LeafletgeoSearch;




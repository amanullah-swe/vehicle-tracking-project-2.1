import { useEffect } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useLeaflet } from "react-leaflet";
import { useLeafletContext } from "@react-leaflet/core";
import LeafletIcons from "../LeafletIcons";
import draggdedLocation from "../../assets/images/location-sign-svgrepo-com.svg";
const markerClusters = L.markerClusterGroup();
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
});

const MarkerCluster = ({ markers, addMarkers, componentId }) => {
  const { map } = useLeafletContext();


  useEffect(() => {
    markerClusters.clearLayers();
    markers.forEach(({ position, Data }) => {
      L.marker(new L.LatLng(position.lat, position.lng), {
        icon: LeafletIcons(draggdedLocation),
      }).addTo(markerClusters).bindPopup().setPopupContent(`<div className="map-poinofIntrest-popup">
      <p>Name: <label className="value">${Data?.LocationName}</label> </p>
      <p>Address: <label className="value">${Data?.Address}</label> </p>
      <p>Latitude: <label className="value">${Data?.Latitude}</label> </p>
      <p>Longitude: <label className="value">${Data?.Longitude}</label> </p>

      


    </div>`)
    }); map.addLayer(markerClusters);
  }, [markers, map]);


  map.on("moveend", () => {
    const start = window.performance.now();
    addMarkers();
    const markersToAdd = [];
    markerClusters.clearLayers();
    markers &&
      markers.length > 0 &&
      markers.forEach(({ position, Data }) => {
        const markerToAdd = L.marker(new L.LatLng(position.lat, position.lng), {
          icon: LeafletIcons(draggdedLocation),
        });
        markerToAdd.bindPopup().setPopupContent(
          `<div className="map-poinofIntrest-popup">
          <p>Name: <label className="value">${Data?.LocationName}</label> </p>
          <p>Address: <label className="value">${Data?.Address}</label> </p>
          <p>Latitude: <label className="value">${Data?.Latitude}</label> </p>
          <p>Longitude: <label className="value">${Data?.Longitude}</label> </p>

          


        </div>`
        )
        if (markerToAdd !== undefined) {
          markersToAdd.push(markerToAdd);
        }
      });
    markerClusters.addLayers(markersToAdd);
    const end = window.performance.now();
    // console.log(`Time of adding markers and clusters: ${end - start}ms`);
  });

  return null;
};

export default MarkerCluster;

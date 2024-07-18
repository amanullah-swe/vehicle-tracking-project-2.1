

import { transform } from "framer-motion";
import L from "leaflet";
import { classNames } from "primereact/utils";


import React from 'react'
import { Image } from "react-bootstrap";
import { json } from "react-router-dom";

export default function LeafletIcons(icon) {
  const customIcon = L.icon({
    iconSize: [25, 25],
    iconAnchor: [5, 25],
    popupAnchor: [2, -40],
    iconUrl: icon,
  })
  return customIcon


}

export const LeafletIconsCompletedTrips=(icon)=> {
  const customIcon = L.icon({
    iconSize: [20, 20],
    iconAnchor: [5, 5],
    popupAnchor: [2, -12],
    iconUrl: icon,
  })
  return customIcon


}



export const LeafletIconsDashboard = (iconUrl, angle) => {

  const icon = L.divIcon({
    className: "custom-marker-icon",
    iconSize: [32, 32],
    iconAnchor: [30, 16],
    popupAnchor: [-10, -10],
    html: `<img src="${iconUrl}" style="transform: rotate(${angle}deg); width: ${40}px;
     height: ${40}px
 " />`,

  });
  return icon
}








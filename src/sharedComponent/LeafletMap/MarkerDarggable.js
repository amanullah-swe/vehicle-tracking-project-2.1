import React, { useContext, useEffect, useMemo, useRef } from 'react'
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import { Marker, Popup } from 'react-leaflet';
import { getResult } from '../../api/ApiServices';
import { AppContext } from '../../context/AppContext';
import iconNewMarker from "../LeafletMap/SearchIcon";
import untrackedIcon from "../../assets/images/untracked.svg";
import draggdedLocation from "../../assets/images/location-sign-svgrepo-com.svg";
import LeafletIcons from '../LeafletIcons';
const MarkerDarggable = () => {
  const {
    googleMap,
    place,
    mapLayer,
    mapRectangle,
    circle,
    regionCord,
    marker,
    layerTypeSend,
    radiusDraw,
    setRegionCord,
    draggedName,
    setDraggedName, setPlace,
    centerDragged, setCenterDragged
  } = useContext(AppContext);
  const location = useLocation();
  let currentRoute = location.pathname;
  const commanRef = useRef(null);
  const getLocationName = async (latLng) => {
    return await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latLng?.lat}&lon=${latLng?.lng}`, {
      
    })
      .then((response) => response.text())
      .then((result) => getResult(result));
      
  }
 useEffect(() => {
   getLocationName({lat:regionCord[0], lng:regionCord[1]})
 }, [location])
  
  const eventHandlerComman = useMemo(
    () => ({
      async dragend(e) {
        const comman = commanRef.current;
        if (comman != null) {
          let latLng = comman.getLatLng()
          let loc = await getLocationName(latLng)
          setRegionCord([latLng?.lat, latLng?.lng])
          // setCenterDragged([latLng?.lat, latLng?.lng])
          setDraggedName(loc)
          setPlace(loc?.display_name?loc?.display_name:"no laction name")


        }
      },
    }),
    []
  );

  return (
    <div>
      {
   
   place!=undefined &&   <Marker
          eventHandlers={eventHandlerComman}
          ref={commanRef}
          draggable
          position={
          regionCord  
          }
          // icon={iconNewMarker}
          icon={LeafletIcons(draggdedLocation)}
        >
         {place?.length>0 ? <Popup>{place}?</Popup>:""}
        </Marker>
      }


    </div>
  )
}

export default MarkerDarggable
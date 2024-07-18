import React, { useContext } from "react";
import LeafletIcons from "../LeafletIcons";
import untracked from "../../assets/images/start_icon.svg";
import customer from "../../assets/images/customer.svg";
import running from "../../assets/images/running.svg";
import parkingStation from "../../assets/images/parkingStation.jpg";
import pointofinterest from "../../assets/images/pointofinterest.png";
import geofenceIcon from "../../assets/images/geofenceIcon.jpg";
import draggdedLocation from "../../assets/images/location-sign-svgrepo-com.svg";
import draggdedLocationParking from "../../assets/images/location-sign-svgrepo-parking.svg";
import draggdedLocationParkingNew from "../../assets/images/parking-location-svgrepo-com.svg";
import { Marker, Popup } from "react-leaflet";
import { AppContext } from "../../context/AppContext";
function MarkerComman({ iconMarker, markerPosition, componentIdMarker }) {
  const { regionCord, setRegionCord, marker, setMarker } =
    useContext(AppContext);
  return (
    <>
      {/* {componentIdMarker === "geofanceView" &&
        markerPosition != undefined &&
        markerPosition?.length > 0 &&
        markerPosition.map((geoItem, index) => {
          return (
            <>
              {Number(geoItem?.area_latitude) !== null &&
                Number(geoItem?.area_longitude) !== null && (
                  <Marker
                    key={index}
                    position={[
                      Number(geoItem?.area_latitude),

                      Number(geoItem?.area_longitude),
                    ]}
                     icon={LeafletIcons(geofenceIcon)}
                  >
                    <Popup>
                      {geoItem.area_address}
                      .<br />
                    </Popup>
                  </Marker>
                )}
            </>
          );
        })} */}

      {componentIdMarker === "parkingView" &&
        markerPosition != undefined &&
        markerPosition?.length > 0 &&
        markerPosition.map((geoItem, index) => {
          return (
            <>
              {Number(geoItem?.slot_gps_latitude) !== null &&
                Number(geoItem?.slot_gps_longitude) !== null && (
                  <Marker
                    key={index}
                    position={[
                      Number(geoItem?.slot_gps_latitude),

                      Number(geoItem?.slot_gps_longitude),
                    ]}
                    icon={LeafletIcons(draggdedLocationParkingNew)}
                  >
                    <Popup>
                      {geoItem.address}
                      .<br />
                    </Popup>
                  </Marker>
                )}  
            </>   
          );  
        })}   

      {/* {componentIdMarker === "pointOfView" &&   
        markerPosition != undefined &&  
        markerPosition?.length > 0 &&   
        markerPosition.map((geoItem, index) => {  
          return (  
            <>  
              {Number(geoItem?.location_latitude) !== null &&   
                Number(geoItem?.location_longitude) !== null && (
                  <Marker
                    key={index}
                    position={[
                      Number(geoItem?.location_latitude),

                      Number(geoItem?.location_longitude),
                    ]}
                    icon={LeafletIcons(draggdedLocation)}
                  >
                    <Popup>
                   

                      <p>
                        Location Name : {geoItem.location_name} .<br />
                        Address : {geoItem?.location_address} .<br />
                        Latitude : {geoItem?.location_latitude} .<br />
                        Longitude : {geoItem?.location_longitude} .<br />
                      </p>
                    </Popup>
                  </Marker>
                )}
            </>
          );
        })} */}


    </>
  );
}

export default MarkerComman;

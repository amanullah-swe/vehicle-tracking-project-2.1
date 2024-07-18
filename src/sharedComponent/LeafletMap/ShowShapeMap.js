import React, { useContext } from "react";
import { Circle, Polygon, Polyline, Rectangle } from "react-leaflet";
import { AppContext } from "../../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function ShowShapeMap({ polylineData, componentId }) {
  const {
    mapLayer,
    setMapLayer,
    mapRectangle,
    circle,
    positionCercle,
    positionRectangle,
    postionPolygon,
    postionRadius,
    radiusDraw,
    multiCercledata,
    setMultiCercledata,
  } = useContext(AppContext);
  const center = [51.505, -0.09];
  const fillBlueOptions = { fillColor: "blue" };
  let polygonDraw = mapLayer;
  let rectangleDaw = mapRectangle;
  let CircleDraw = circle;
  const purpleOptions = { color: "purple" };

  let TransportationGeofence = useSelector(
    (state) => state.auth.TransportationGeofence
  );
  let type =
    TransportationGeofence &&
    TransportationGeofence.length &&
    TransportationGeofence[0].geofence_draw_type;
  let pointData =
    TransportationGeofence &&
    TransportationGeofence.length &&
    TransportationGeofence.filter(
      (point) =>
        point.geofence_draw_point &&
        !point.geofence_draw_point.includes("undefined")
    ).map((item) =>
      item.geofence_draw_point.split(",").map((item) => Number(item))
    );
  let radius = pointData && pointData.length && pointData[0];



  const handleMarkerDrag = (index, event) => {
    const newCoordinates = [...mapLayer];
    newCoordinates[index] = [event.latlng.lat, event.latlng.lng];
    setMapLayer(newCoordinates);
  
  };
  return (
    <div>

      {
        // componentId !== "ManualRouting" &&
        // componentId !== "dashBoard" &&
        componentId !== "parkingView" &&
        componentId !== "geofanceView" &&
        componentId !== "pointOfView" &&
        componentId !== "playback" &&
        componentId!=="viewtrip"&&componentId!== "ViewOrders"&&(
          <>
            {rectangleDaw && rectangleDaw.length > 0 && (
              <Rectangle
                bounds={rectangleDaw}
                pathOptions={componentId == "dashBoard"?{ fillColor: "green", color: "#8f4300" }:{ color: "#02C038" }}
                // draggable="true"
                // eventHandlers={{ drag: (e,index) =>{console.log(e,"sdfhdsgfsfg"), handleMarkerDrag(index, e)} }}
                // editable
                />
            )}
            {polygonDraw && polygonDraw.length > 0 && (
              <Polygon
                positions={polygonDraw}
                pathOptions={componentId == "dashBoard"?{ fillColor: "green", color: "#8f4300" }:{ color: "#02C038" }}
                // draggable="true"
                // eventHandlers={{ drag: (e,index) => handleMarkerDrag(index, e) }}
                // editable
              />
            )}

            {CircleDraw &&
              CircleDraw !== undefined &&
              CircleDraw[0] !== null &&
              CircleDraw.length > 0 &&
              radiusDraw.length !== "" &&
              radiusDraw != undefined && (
                <Circle
                  center={CircleDraw ? CircleDraw : 0}
                  pathOptions={componentId == "dashBoard"?{ fillColor: "green", color: "#8f4300" }:{ color: "#02C038" }}
                  radius={radiusDraw}
                />
              )}
          </>
        )}

      {polylineData &&
        polylineData !== undefined &&
        polylineData.length > 0 && (
          <Polyline pathOptions={{ purpleOptions }} positions={polylineData} />
        )}
      {(componentId === "parkingView" ||
        // componentId =="dashBoard" ||
        componentId === "parkingAdd" ||
        componentId === "geofanceView" ||
        componentId === "GeofanceAdd" ||
        componentId === "addVehicle" ||
        componentId === "VehicleGroup" ||
        componentId === "EditDispatchTrip") && (
        <>
          {positionRectangle.length > 0 && (
            <Rectangle
              bounds={positionRectangle}
              pathOptions={{ fillColor: "blue", color: "Navy" }}
            />
          )}
          {postionPolygon.length > 0 && (
            <Polygon
              positions={postionPolygon}
              pathOptions={{ fillColor: "red", color: "blue" }}
            />
          )}

          {positionCercle &&
            (positionCercle.length > 0 ||
              (positionCercle.lat && positionCercle.lng)) &&
            postionRadius.length !== "" &&
            postionRadius != undefined && (
              <Circle
                center={positionCercle ? positionCercle : []}
                pathOptions={{ fillColor: "green", color: "#8f4300" }}
                radius={postionRadius}
              />
            )}
        </>
      )}

      {componentId === "geofanceView" &&
        multiCercledata &&
        (multiCercledata.length > 0 || multiCercledata.circleData) &&
        multiCercledata.length !== "" &&
        multiCercledata != undefined &&
        multiCercledata.map((ele) => {
          return (
            <Circle
              center={ele.circleData ? ele.circleData : []}
              pathOptions={{ fillColor: "blue", color: "red" }}
              radius={ele.radiusData}
            />
          );
        })}
    </div>
  );
}

export default ShowShapeMap;

import React, { useState, useContext, useEffect } from "react";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import redCar from "../../src/assets/images/red-car-logo.svg";
import yellowCar from "../../src/assets/images/yellow-card-map.svg";
import greenCar from "../../src/assets/images/green-car-map.svg";
import blackCar from "../../src/assets/images/black-car-map.svg";
import blueCarN from "../../src/assets/images/blue-car-map.svg";
import dropPoint from "../../src/assets/images/unload.svg";
import pickUpIcon from "../../src/assets/images/load.svg";
import untracked from "../assets/images/start_icon.svg";
import parked from "../../src/assets/images/parked.svg";
import idle from "../assets/images/end_icon.svg";
import Gcustomer from "../assets/images/comp_icon.svg";
import stopIcon from "../assets/images/Vehicle_Icon/Group 35095.svg";
import Warehouser_icon from "../assets/images/Warehouser_icon.svg";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  Polyline,
  Tooltip,
} from "react-leaflet";
import { LatLng } from "leaflet";
import { useTranslation } from "react-i18next";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import optionDot from "../../src/assets/images/optionDot.svg";
import popimg from "../../src/assets/images/pop-img.png";
import speed from "../../src/assets/images/speed.png";
import engine from "../../src/assets/images/engine.png";
import dish from "../../src/assets/images/dish.png";
import iconNewMarker from "..//sharedComponent/LeafletMap/SearchIcon";
import "react-leaflet-fullscreen/dist/styles.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { AppContext } from "../context/AppContext";
import LeafletgeoSearch from "./LeafletMap/LeafletgeoSearch";
import DrawShapes from "./LeafletMap/DrawShapes";
import FullscreenControl from "./LeafletMap/FullscreenControl";
import { useMemo } from "react";
import { useRef } from "react";
import redMapIcon from "../assets/images/redHotspot.svg";
import yellowMapIcon from "../assets/images/yellowHotspot.svg";
import {
  getLocationName,
  simpleGetCall,
  simplePostCall,
} from "../api/ApiServices";
import ApiConfig from "../api/ApiConfig";
import { notifyError, notifySuccess } from "./notify";
import ShowShapeMap from "./LeafletMap/ShowShapeMap";
import MarkerComman from "./LeafletMap/MarkerComman";
import MarkerDarggable from "./LeafletMap/MarkerDarggable";
import { useSelector } from "react-redux";
import MarkerCluster from "./LeafletMap/MarkerCluster";
import { useNavigate } from "react-router-dom";
import LeafletIcons, { LeafletIconsDashboard } from "./LeafletIcons";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import NoDataComp from "./NoDataComp";
import { mapvalue } from "./common";
const klokantechBasicStyleUrl =
  "https://{s}.basemaps.cartocdn.com/r/klokantech-basic/{z}/{x}/{y}.png";
const RecenterAutomatically = ({ newdatamap, setAddStopOnclick, moveStop }) => {
  const map = useMap();
  useEffect(() => {
    newdatamap && map.setView(newdatamap);
  }, [newdatamap]);
  useEffect(() => {
    if (moveStop)
      map.on("click", function (e) {
        getLocationName(e?.latlng).then((data) => {
          setAddStopOnclick({
            pickup_point_latitude: e?.latlng?.lat,
            pickup_point_longitude: e?.latlng?.lng,
            pickup_point_code: data?.display_name,
            pickup_point_name: data?.name,
          });
        });
      });
  }, [moveStop, map]);

  return null;
};

const RecenterZoopAutomatic = ({ mapZoomValue }) => {
  const map = useMap();
  useEffect(() => {
    map.setZoom(mapZoomValue);
  }, [mapZoomValue, map]);
  return null;
};

const SetBoundTrasport = ({ maplayer, componentId, keyMap }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(maplayer);
  }, [maplayer, componentId, keyMap, map]);
  return null;
};
const BoundTrips = ({ TripsBounds, vehicleIcon }) => {
  const map = useMap();
  useEffect(() => {
    if (TripsBounds) {
      map.fitBounds(TripsBounds);
    }
  }, [TripsBounds]);
  return null;
};
const MapWithCenteredMarker = ({ markerPosition }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds([markerPosition]);
  }, [markerPosition, map]);
  return null;
};
const SetBoundTrasportCercle = ({ maplayer, radius, componentId, keyMap }) => {
  const map = useMap();
  const circleCenter = new LatLng(maplayer[0], maplayer[1]);
  const circleBounds = circleCenter.toBounds(radius);
  useEffect(() => {
    map.fitBounds(circleBounds, { padding: [100, 100] });
  }, [circleBounds, maplayer, componentId, keyMap]);
  return null;
};

const SetBoundTrasportCercleDash = ({ positionCercle, postionRadius, key }) => {
  const map = useMap();
  const circleCenter = new LatLng(positionCercle[0], positionCercle[1]);
  const circleBounds = circleCenter.toBounds(postionRadius);
  useEffect(() => {
    map.fitBounds(circleBounds, { padding: [100, 100] });
  }, [map, circleBounds, positionCercle, key]);
  return null;
};
const SetBoundTrasportDash = ({ postionPolygon, componentId }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(postionPolygon);
  }, [map, postionPolygon, componentId]);
  return null;
};
const SetBoundTrasportDashR = ({ positionRectangle, componentId }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(positionRectangle);
  }, [map, positionRectangle, componentId]);
  return null;
};
const SetBoundsComman = ({ bounds, triggerMapBoundKeyRandom }) => {
  const map = useMap();
  let boun = [Number(bounds[0]), Number(bounds[1])];
  useEffect(() => {
    map.fitBounds([boun]);
  }, [map, triggerMapBoundKeyRandom]);

  return null;
};
const SetBounds = ({ mapDataLive, triggerMap, triggerMapBoundKey }) => {
  const map = useMap();
  const bounds =
    mapDataLive &&
    mapDataLive.length > 0 &&
    mapDataLive?.filter(
      (el) =>
        el.latitude !== undefined &&
        el.longitude !== undefined &&
        el.latitude !== null &&
        el.longitude !== null
    );
  let boun = bounds.map((el) => [Number(el.latitude), Number(el.longitude)]);
  useEffect(() => {
    if (boun.length > 0) {
      map.fitBounds(boun);
    }
  }, [map, triggerMap, triggerMapBoundKey]);
  return null;
};
const SetBoundsSingle = ({ mapDataLive }) => {
  const map = useMap();
  const bounds =
    mapDataLive &&
    mapDataLive.length > 0 &&
    mapDataLive?.filter(
      (el) =>
        el.latitude !== undefined &&
        el.longitude !== undefined &&
        el.latitude !== null &&
        el.longitude !== null
    );
  let boun = bounds.map((el) => [Number(el.latitude), Number(el.longitude)]);
  useEffect(() => {
    if (boun.length > 0) {
      map.fitBounds(boun);
    }
  }, [map, mapDataLive]);
  return null;
};
const SetBoundsParking = ({ cardDetails }) => {
  const map = useMap();
  const bounds =
    cardDetails &&
    cardDetails.length > 0 &&
    cardDetails?.filter(
      (el) => el.slot_gps_latitude !== null && el.slot_gps_longitude !== null
    );
  let boun = bounds.map((el) => [
    Number(el.slot_gps_latitude),
    Number(el.slot_gps_longitude),
  ]);
  if (boun.length > 0) {
    map.fitBounds(boun);
  }
  return null;
};
const SetBoundsGeofance = ({ cardDetails }) => {
  const map = useMap();
  const bounds =
    cardDetails &&
    cardDetails.length > 0 &&
    cardDetails?.filter(
      (el) => el.area_latitude !== null && el.area_longitude !== null
    );
  let boun = bounds.map((el) => [
    Number(el.area_latitude),
    Number(el.area_longitude),
  ]);
  if (boun.length > 0) {
    map.fitBounds(boun);
  }
  return null;
};

const SetBoundsPointOfIntrest = ({ cardDetails }) => {
  const map = useMap();
  const bounds =
    cardDetails &&
    cardDetails.length > 0 &&
    cardDetails?.filter(
      (el) =>
        el.location_latitude !== null &&
        el.location_longitude !== null &&
        el.location_latitude !== undefined &&
        el.location_longitude !== undefined
    );
  let boun = bounds.map((el) => [
    Number(el.location_latitude),
    Number(el.location_longitude),
  ]);
  if (boun.length > 0) {
    map.fitBounds(boun);
  }
  return null;
};
const SetBoundsOrder = ({ dispatchData, triggerMapBoundKey }) => {
  const map = useMap();
  const bounds =
    dispatchData &&
    dispatchData.length > 0 &&
    dispatchData?.filter(
      (el) =>
        el.latitude !== undefined &&
        el.longitude !== undefined &&
        el.latitude !== null &&
        el.longitude !== null
    );
  let boun = bounds.map((el) => [Number(el?.latitude), Number(el?.longitude)]);
  useEffect(() => {
    if (boun.length > 0) {
      map.fitBounds(boun);
    }
  }, [boun]);
  return null;
};
// view trips function
// routeMachine
// const RoutingControl = ({
//   routeLine,
//   LeafletIcons,
//   startIcon,
//   EndIcon,
//   EndLable,
//   StartLable,
//   componentId,

// }) => {
//   console.log("routeLine",routeLine);
//   const map = useMap();
//   useEffect(() => {
//     try {
//       let startPoint = routeLine[0];
//       let endPont = routeLine[1];
//       const startMarker = L.marker(startPoint, {
//         icon: LeafletIcons(startIcon),
//       })
//         .addTo(map)
//         .bindPopup(StartLable);

//       const endMarker = L.marker(endPont, {
//         icon: LeafletIcons(EndIcon),
//       })
//         .addTo(map)
//         .bindPopup(EndLable);
//       if (
//         routeLine.length > 1 &&
//         (componentId === "ViewOrders" || componentId == "viewtrip")
//       ) {
//         L.Routing.control({
//           waypoints: [
//             L.latLng(startPoint[0], startPoint[1]), // Start point
//             L.latLng(endPont[0], endPont[1]), // End point
//           ],

//           createMarker: function (i, waypoint, n) {
//             if (i === 0) {
//               return startMarker;
//             } else if (i === n - 1) {
//               return endMarker;
//             }
//           },
//           waypointNameFallback: "",
//           routeWhileDragging: false,
//         }).addTo(map);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }, [map]);

//   return null;
// };

const RoutingControl = ({
  routeLine,
  LeafletIcons,
  startIcon,
  EndIcon,
  EndLable,
  StartLable,
  componentId,
  stopData,
}) => {
  const map = useMap();
  console.log("stopData", stopData);

  useEffect(() => {
    try {

      if (stopData.length) {
        console.log("view", stopData);
        let collection = [];
        let delivery = [];
        for (const iterator of stopData) {
          if (iterator.dispatch_customer_pickup_order_type == "collection") {
            collection.push(iterator);
          } else {
            delivery.push(iterator);
          }
        }
        const pointsCollection = collection.map((point) =>
          L.latLng(
            Number(point.pickup_point_latitude),
            Number(point.pickup_point_longitude)
          )
        );
        const pointsDelivery = delivery.map((point) =>
          L.latLng(
            Number(point.pickup_point_latitude),
            Number(point.pickup_point_longitude)
          )
        );

        let waypoints = [...pointsCollection, ...pointsDelivery];

        const markers1 = pointsCollection.map((waypoint, index) => {
          const icon = index === 0 ? startIcon : pickUpIcon;
          return L.marker(waypoint, { icon: LeafletIcons(icon) })
            .addTo(map)
            .bindPopup(
              collection[index]?.pickup_point_name +
              "<br>Order Number :" +
              collection[index]?.dispatch_package_order_number
            );
        });
        let markers2 = pointsDelivery.map((waypoint, index) => {
          const icon =
            index === pointsDelivery.length - 1 ? EndIcon : dropPoint;
          return L.marker(waypoint, { icon: LeafletIcons(icon) })
            .addTo(map)
            .bindPopup(
              delivery[index]?.pickup_point_name +
              "<br>Order Number :" +
              collection[index]?.dispatch_package_order_number
            );
        });
        let markers = [...markers1, ...markers2];
        if (
          waypoints.length > 1 &&
          (componentId === "ViewOrders" || componentId === "viewtrip")
        ) {
          try {
            let control = L.Routing.control({
              waypoints: waypoints,
              createMarker: function (i, waypoint, n) {
                return markers[i];
              },
              waypointNameFallback: "",
              routeWhileDragging: true,
              showAlternatives: false,
              createAlternatives: false,
            }).addTo(map);
            control.on("routeselected", function (e) {
              var route = e.route;
              var routeCoordinates = route.coordinates;
              waypoints = routeCoordinates.map(function (coord) {
                return L.latLng(coord.lat, coord.lng);
              });
            });
            control.on("waypointsdrag", function () {
              control.spliceWaypoints(
                0,
                control.getWaypoints().length,
                ...waypoints
              );
            });
          } catch (routingError) {
            console.error("Routing control error:", routingError);
          }
        }
      } else {

        try {
          let startPoint = routeLine[0];
          let endPont = routeLine[1];
          const startMarker = L.marker(startPoint, {
            icon: LeafletIcons(startIcon),
          })
            .addTo(map)
            .bindPopup(StartLable);

          const endMarker = L.marker(endPont, {
            icon: LeafletIcons(EndIcon),
          })
            .addTo(map)
            .bindPopup(EndLable);
          if (
            routeLine.length > 1 &&
            (componentId === "ViewOrders" || componentId == "viewtrip")
          ) {
            L.Routing.control({
              waypoints: [
                L.latLng(startPoint[0], startPoint[1]), // Start point
                L.latLng(endPont[0], endPont[1]), // End point
              ],

              createMarker: function (i, waypoint, n) {
                if (i === 0) {
                  return startMarker;
                } else if (i === n - 1) {
                  return endMarker;
                }
              },
              waypointNameFallback: "",
              routeWhileDragging: false,
            }).addTo(map);
          }
        } catch (err) {
          console.log(err);
        }

      }
    } catch (err) {
      console.error(err);
    }
  }, [
    map,
    routeLine,
    LeafletIcons,
    startIcon,
    EndIcon,
    componentId,
    stopData,
  ]);

  return null;
};

//newplay back

// const RoutingControladd = ({
//   routeLine,
//   flagValue,
//   setFlagData,
//   newDataSetter,
//   newdata,
//   componentId,
// }) => {
//   const map = useMap();
//   let routingControlRef = useRef(null);
//   useEffect(() => {
//     if (componentId === "EditDispatchTrip") {
//       if (routeLine.length === 2) {
//         let startPoint = routeLine[0];
//         let endPont = routeLine[1];

//         console.log(startPoint,endPont,"endPontendPont")
//         if (startPoint && endPont &&map) {
//           try {
//             if (routingControlRef?.current&&routingControlRef?.current!=null) {
//               routingControlRef?.current?.remove();
//             }
//           } catch (error) {
//             console.log(error);
//           }

//           const newRoutingControl = L.Routing.control({
//             waypoints: [
//               L.latLng(startPoint[0], startPoint[1]), // Start point
//               L.latLng(endPont[0], endPont[1]), // End point
//             ],
//             createMarker: function (i, waypoint, n) {
//               return L.marker([0, 0], { opacity: 0 });
//             },
//             routeWhileDragging: false,
//           }).addTo(map);
//           routingControlRef.current = newRoutingControl;
//         }
//       }
//     }
//   }, [routeLine]);
//   return null;
// };

const RoutingControladd = ({
  routeLine,
  componentId,
  flagValue,
  setFlagData,
  RemoveLayer,
  subComponentId,
}) => {
  const map = useMap();
  const routingControlRef = useRef(null);
  useEffect(() => {
    if (componentId === "EditDispatchTrip") {
      if (routeLine.length === 2) {
        let startPoint = routeLine[0];
        let endPont = routeLine[1];
        if (startPoint && endPont && map && flagValue) {
          // Remove the existing routing control if it exists
          if (
            routingControlRef !== null &&
            routingControlRef?.current &&
            RemoveLayer &&
            subComponentId === "EditDispatchTripOne"
          ) {
            if (
              subComponentId !== "EditDispatchTripFour" ||
              subComponentId !== "EditDispatchTripThree" ||
              subComponentId !== "EditDispatchTripTwo"
            ) {
              routingControlRef.current?.getPlan()?.setWaypoints([]); // Clear waypoints
              map?.removeControl(routingControlRef?.current);
            }
          }
          const newRoutingControl = L.Routing.control({
            waypoints: [
              L.latLng(startPoint[0], startPoint[1]), // Start point
              L.latLng(endPont[0], endPont[1]), // End point
            ],
            createMarker: function (i, waypoint, n) {
              return L.marker([0, 0], { opacity: 0 });
            },
            routeWhileDragging: false,
          }).addTo(map);
          if (
            routingControlRef?.current &&
            RemoveLayer &&
            subComponentId === "EditDispatchTripOne"
          ) {
            routingControlRef.current = newRoutingControl;
          }
        }
        setFlagData(true);
      }
    }
  }, [routeLine]);
  return null;
};
const MapComponent = ({
  stopDetails,
  componentId,
  tabsDetails,
  setStopDetails,
  editStop,
  tripDetails,
  setTripDetails,
  startEdit,
  cardDetails,
  setCustomerSetting,
  customerSetting,
  drawshape,
  stoplist,
  setStoplist,
  moveStop,
  stopsByTripId,
  stopData,
  setStopData,
  latlong,
  currentIndex,
  data,
  viewTripVehicle,
  setter,
  warehouse,
  selWareHouse,
  mapDataLive,
  setShareLink,
  setShareCureentLink,
  setShareLinkData,
  setShareCureentlatitudeLink,
  setShareCureentlongitudeLink,
  selectedPopmMrker,
  setSelectedPopMarker,
  customerSettingdata,
  prevPos,
  currentTrack,
  mapListRoad,
  updatedTrackRoad,
  BreakTrackRoad,
  mapBound,
  mapBoundReplay,
  subComponentId,
  RemoveLayer,
  dispatchData,
  stopListData,
}) => {
  console.log("stopListData", stopListData);
  let warehouseData = data ? data?.warehouse : {};
  let TransportatinGeofence = useSelector(
    (state) => state.auth.TransportationGeofence
  );
  let customerData = useSelector((state) => state.auth.customerData);
  let type =
    TransportatinGeofence &&
    TransportatinGeofence.length &&
    TransportatinGeofence[0].geofence_draw_type;
  let center =
    type == "circle"
      ? TransportatinGeofence &&
      TransportatinGeofence.length &&
      TransportatinGeofence[0].geofence_draw_point &&
      Number(TransportatinGeofence[0].geofence_draw_point)
      : TransportatinGeofence &&
      TransportatinGeofence.length &&
      TransportatinGeofence[0].geofence_draw_point &&
      TransportatinGeofence[0].geofence_draw_point &&
      TransportatinGeofence[0].geofence_draw_point
        .split(",")
        .map((item) => Number(item));
  let accessRights = useSelector((state) => state?.auth?.accessRights);
  const addonSettingData = useSelector((state) => state?.auth?.addonModule);
  const userRole = accessRights && accessRights.rights_role;
  const { t, i18n } = useTranslation();
  const {
    place,
    mapLayer,
    mapRectangle,
    circle,
    regionCord,
    radiusDraw,
    setRegionCord,
    setDraggedName,
    setPlace,
    mapZoomValue,
    setMapZoomValue,
    centerDragged,
    triggerMap,
    triggerMapBoundKey,
    triggerMapBoundKeyRandom,
    positionCercle,
    positionRectangle,
    postionPolygon,
    postionRadius,
    setMapRectangle,
    setMapLayer,
    setRadiusDraw,
    setCircle,
    customerLogo
  } = useContext(AppContext);
  // useEffect(() => {
  //   if (center) {
  //     setRegionCord(center)
  //   }
  // }, [center, TransportatinGeofence])
  // marker cluster

  let markers;
  const addMarkers = () => {
    markers =
      cardDetails && cardDetails.length > 0
        ? cardDetails?.map((geoItem) => {
          return {
            position: {
              lng: Number(geoItem?.location_longitude),
              lat: Number(geoItem?.location_latitude),
            },
            Data: {
              LocationName: geoItem?.location_name || "no data",
              Address: geoItem?.location_address,
              Latitude: geoItem?.location_latitude,
              Longitude: geoItem?.location_longitude,
            },
          };
        })
        : [];
  };
  addMarkers();
  const navigate = useNavigate();
  useEffect(() => {
    if ((latlong?.lat, latlong?.long)) {
      setRegionCord([latlong?.lat, latlong?.long]);
    }
  }, [latlong]);
  useEffect(() => {
    if (
      selWareHouse &&
      selWareHouse.vendor_warehouse_latitude &&
      selWareHouse.vendor_warehouse_longitude
    ) {
      setRegionCord([
        selWareHouse.vendor_warehouse_latitude,
        selWareHouse.vendor_warehouse_longitude,
      ]);
    }
  }, [selWareHouse]);

  const StopsRef = useRef([]);
  const clickedStopsRef = useRef([]);
  const markerRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const commanRef = useRef(null);
  const editMerchant = useRef(null);

  const [addStopOnclick, setAddStopOnclick] = useState(null);
  // const handleShow = () => setShow(true);
  const [clickedStops, setClickedStops] = useState([]);
  useEffect(() => {
    if (stopData && stopData?.location_latitude) {
      setClickedStops([
        ...clickedStops,
        {
          pickup_point_latitude: Number(stopData?.location_latitude),
          pickup_point_longitude: Number(stopData?.location_longitude),
          pickup_point_code: stopData.location_name,
          pickup_point_name: stopData.location_address,
        },
      ]);
      // if (stopData && stopData?.location_latitude) {
      //   setStoplist([
      //     ...clickedStops,
      //     {
      //       pickup_point_latitude: Number(stopData?.location_latitude),
      //       pickup_point_longitude: Number(stopData?.location_longitude),
      //       pickup_point_code: stopData.location_name,
      //       pickup_point_name: stopData.location_address,
      //     },
      //   ]);
      // }
      setStopData(null);
    }
    if (clickedStops.length)
      clickedStopsRef.current &&
        clickedStopsRef.current[clickedStops.length - 1] &&
        clickedStopsRef.current[clickedStops.length - 1].openPopup();
  }, [clickedStops, stopData]);
  const [clickStopUpdate, setClickStopUpdate] = useState(null);
  const [uptedStop, setUptedStop] = useState(null);
  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          let latLng = marker?.getLatLng();
          let loc = await getLocationName(latLng);
          marker.openPopup();
          setStopDetails({
            ...stopDetails,
            pickup_point_latitude: latLng?.lat && latLng?.lat,
            pickup_point_longitude: latLng?.lng && latLng?.lng,
            pickup_point_name: loc?.display_name,
            pickup_point_code: Math.floor(Math.random() * 10000)
              .toString()
              .padStart(4, "0"),
          });
        }
      },
    }),
    []
  );
  const [flag, setflag] = useState(false);
  const eventHandlerstart = useMemo(
    () => ({
      async dragend(e) {
        const start = startRef.current;
        if (start != null) {
          setflag(true);
          let latLng = start?.getLatLng();
          let loc = await getLocationName(latLng);
          start.openPopup();
          setTripDetails((tripDetails) => {
            return {
              ...tripDetails,
              trip_start_latitude: latLng?.lat && latLng?.lat,
              trip_start_longitude: latLng?.lng && latLng?.lng,
              trip_start_point: loc.display_name,
            };
          });
        }
      },
    }),
    []
  );
  const eventHandlerend = useMemo(
    () => ({
      async dragend(e) {
        const end = endRef.current;
        if (end != null) {
          setflag(true);
          let latLng = end?.getLatLng();
          let loc = await getLocationName(latLng);
          end.openPopup();
          setTripDetails((tripDetails) => {
            return {
              ...tripDetails,
              trip_end_latitude: latLng?.lat && latLng?.lat,
              trip_end_longitude: latLng?.lng && latLng?.lng,
              trip_end_point: loc.display_name,
            };
          });
        }
      },
    }),
    []
  );
  const eventHandleStop = useMemo(
    () => ({
      async dragend(e) {
        let markerIndex = null;
        var latlng = null;
        let loc = await getLocationName(e.target?._latlng);
        StopsRef.current.map((item, index) => {
          if (item._leaflet_id === e.target?._leaflet_id) {
            latlng = item?.getLatLng();
            markerIndex = index;
          }
        });
        if (!isNaN(markerIndex)) {
          StopsRef.current[markerIndex].openPopup();
          setUptedStop({
            markerIndex,
            latlng,
            pickup_point_name: loc.display_name,
            pickup_point_code: loc.name,
          });
        }
      },
    }),

    []
  );
  const addStop = (stopData) => {
    let body = JSON.stringify({
      pickup_point_name: stopData.pickup_point_name,
      pickup_point_code: stopData.pickup_point_code,
      pickup_point_latitude: stopData.pickup_point_latitude,
      pickup_point_longitude: stopData.pickup_point_longitude,
      pickup_point_trip_id: tripDetails.trip_id,
    });
    simplePostCall(ApiConfig.ADD_STOP, body)
      .then((res) => {
        if (res?.result) {
          notifySuccess(res?.message);
          stopsByTripId();
        } else {
          notifyError(res?.message);
        }
      })
      .catch((err) => {
        notifyError(err.message);
      });
  };
  const removeStop = (stopData) => {
    let body = JSON.stringify({
      pickup_point_id: stopData.pickup_point_id,
    });
    simplePostCall(ApiConfig.REMOVE_STOP, body)
      .then((res) => {
        if (res.result) {
          notifySuccess(res?.message);
          stopsByTripId();
        } else {
          notifyError(res?.message);
        }
      })
      .catch((err) => {
        notifyError(err.message);
      });
  };
  const updateStop = (stopData, index) => {
    let body = JSON.stringify(stopData);
    simplePostCall(ApiConfig.UPDATE_STOP, body)
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
          stopsByTripId();
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        notifyError(err.message);
      });
  };
  const eventHandleStopClicks = useMemo(
    () => ({
      async dragend(e) {
        let markerIndex = null;
        var latlng = null;
        let loc = await getLocationName(e.target?._latlng);
        clickedStopsRef.current.map((item, index) => {
          if (item._leaflet_id === e.target?._leaflet_id) {
            latlng = item?.getLatLng();
            markerIndex = index;
          }
        });

        clickedStopsRef.current[markerIndex].openPopup();
        if (markerIndex) {
          setClickStopUpdate({
            markerIndex,
            latlng,
            pickup_point_name: loc.display_name,
            pickup_point_code: loc.name,
          });
        }
      },
    }),

    []
  );
  useEffect(() => {
    if (addStopOnclick) {
      setClickedStops([...clickedStops, addStopOnclick]);
      setAddStopOnclick(null);
    }
  }, [addStopOnclick, clickedStops]);

  useEffect(() => {
    if (clickStopUpdate !== null) {
      setClickedStops((clickedStops) =>
        clickedStops.map((item, index) =>
          clickStopUpdate.markerIndex == index
            ? {
              ...item,
              pickup_point_latitude:
                clickStopUpdate.latlng?.lat && clickStopUpdate.latlng?.lat,
              pickup_point_longitude:
                clickStopUpdate.latlng?.lat && clickStopUpdate.latlng?.lng,
              pickup_point_name: clickStopUpdate.pickup_point_name,
              pickup_point_code: clickStopUpdate.pickup_point_code,
            }
            : { ...item }
        )
      );
      setClickStopUpdate(null);
    }
  }, [clickStopUpdate, clickedStops]);
  useEffect(() => {
    if (uptedStop !== null) {
      setStoplist((stoplist) =>
        stoplist.map((item, index) =>
          uptedStop.markerIndex == index
            ? {
              ...item,
              pickup_point_latitude:
                uptedStop.latlng?.lat && uptedStop.latlng?.lat,
              pickup_point_longitude:
                uptedStop.latlng?.lng && uptedStop.latlng?.lng,
              pickup_point_name: uptedStop.pickup_point_name,
              pickup_point_code: uptedStop.pickup_point_code,
            }
            : { ...item }
        )
      );

      setUptedStop(null);
    }
  }, [uptedStop, stoplist]);

  const eventHandlerComman = useMemo(
    () => ({
      async dragend(e) {
        const comman = commanRef.current;
        if (comman != null) {
          let latLng = comman?.getLatLng();
          let loc = await getLocationName(latLng);
          setRegionCord([latLng?.lat, latLng?.lng]);
          setDraggedName(loc);
          setPlace(loc.display_name);
          setCustomerSetting({
            ...customerSetting,
            customer_longitude: latLng?.lng,
            customer_latitude: latLng?.lat,
            customer_address: loc.display_name,
            customer_city: !loc.address.state_district
              ? ""
              : loc.address.state_district,
          });
        }
      },
    }),
    []
  );

  const eventEditMerchent = useMemo(
    () => ({
      async dragend(e) {
        const comman = editMerchant.current;
        if (comman != null) {
          let latLng = comman?.getLatLng();
          let loc = await getLocationName(latLng);
          setRegionCord([latLng?.lat, latLng?.lng]);
          setDraggedName(loc);
          setPlace(loc.display_name);
          if (componentId == "EditMerchant") {
            warehouseData[currentIndex].vendor_warehouse_latitude = latLng?.lat;
            warehouseData[currentIndex].vendor_warehouse_longitude =
              latLng?.lng;
            warehouseData[currentIndex].vendor_warehouse_address =
              loc?.display_name;
            setter({ ...data, warehouse: warehouseData });
          }
        }
      },
    }),
    []
  );

  const shareDatat = (id) => {
    let newData = mapDataLive.filter((ele) => ele.vehicle_imei == id);
    setShareLinkData(newData[0].vehicle_imei);
  };
  const shareCureenr = (latitudeLink, longitudeLink) => {
    setShareCureentlatitudeLink(latitudeLink);
    setShareCureentlongitudeLink(longitudeLink);
  };
  const [keyMap, setKeyMap] = useState("");
  const getsingleListDetails = (id) => {
    simpleGetCall(ApiConfig.VEHICLE_DETAILS_SINGLE + `?vehicle_id=${id}`)
      .then((res) => {
        if (res.result === true) {
          let data = res?.obj;
          setMapZoomValue(7);

          if (res.geofence.type == "circle") {
            if (
              !res.geofence.drowvalue.includes(null) &&
              res.geofence.drowvalue != null
            ) {
              setCircle(res.geofence.drowvalue ? res.geofence.drowvalue : []);
            }
            setRadiusDraw(
              Number(res.geofence?.radius) ? Number(res.geofence?.radius) : null
            );
            setKeyMap(Math.floor(Math.random() * 10000000));
          }

          if (res.geofence.type === "polygon") {
            if (
              !res.geofence.drowvalue[0].includes(null) &&
              res.geofence.drowvalue[0][0] != null
            ) {
              setMapLayer(
                res?.geofence.drowvalue ? res?.geofence.drowvalue : []
              );
            }
            setKeyMap(Math.floor(Math.random() * 10000000));
          }
          if (res.geofence.type === "rectangle") {
            if (!res.geofence.drowvalue.includes(null)) {
              setMapRectangle(
                res?.geofence.drowvalue ? res?.geofence.drowvalue : []
              );
              setKeyMap(Math.floor(Math.random() * 10000000));
            }
          }
        } else {
          notifyError(res?.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  const convertToLocalTime = (internationalTime) => {
    const [timeString, ampm] = internationalTime.split(" ");
    const [hours, minutes, seconds] = timeString.split(":");
    let hours24 = parseInt(hours, 10);

    // Adjust hours for AM/PM
    if (ampm === "PM" && hours24 !== 12) {
      hours24 += 12;
    } else if (ampm === "AM" && hours24 === 12) {
      hours24 = 0;
    }

    const date = new Date();
    date.setHours(hours24, parseInt(minutes, 10), parseInt(seconds, 10));

    return date.toLocaleTimeString(); // Convert to local time

    // Display the local time or do whatever you need with it
  };
  // selectted marker
  const markerRefPop = useRef(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (marker) {
      marker.openPopup();
      // setCustomData(
      //   mapDataLive.filter((ele) => ele.vehicle_id  == vehicleSelected)[0]
      // );
      // setShow(true);
    }
  }, [selectedPopmMrker, markerRefPop]);

  // playBack component
  const lineOptions = {
    color: "red", // Main color
    weight: 5,
  };
  const ChartRef = useRef();
  const ChartRefUpdate = useRef();
  const ChartRefBreak = useRef();
  const lineOptionsUpdate = {
    color: "green",
    weight: 10,
  };
  const lineOptionsBreak = {
    color: "yellow",
    weight: 10,
  };
  // Create a custom pane for labels
  useEffect(() => {
    // Create a custom pane for labels
    const labelsPane = L.DomUtil.create(
      "div",
      "leaflet-pane leaflet-labels-pane"
    );
    labelsPane.style.zIndex = 650;
    labelsPane.style.pointerEvents = "none"; // Allow interactions to pass through the labels pane
    document.querySelector(".leaflet-map-pane").appendChild(labelsPane);
  }, []);

  // useEffect(() => {
  //   const map = L.map('map').setView([0, 0], 2); // Set the initial center and zoom level

  //   L.tileLayer('your-map-url', {
  //     attribution: 'KlokanTech Basic'
  //   }).addTo(map);
  // }, []);

  return (
    <div className="map-wrapper">
      <div className="leaflet-map">
        {(addonSettingData?.addon_tracking == 1 && mapvalue()) ||
          componentId == "dashBoardShare" ||
          componentId == "viewtrip" ? (
          <div className="map-main" key={componentId}>
            {regionCord[0] !== null &&
              regionCord[1] !== null &&
              regionCord[0] !== undefined &&
              regionCord[1] !== undefined &&
              regionCord[0] !== "" &&
              regionCord[1] !== "" &&
              regionCord.length > 1 ? (
              <MapContainer
                center={regionCord}
                zoom={mapZoomValue}
                pane="labelsPane"
                scrollWheelZoom={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  subdomains={["a", "b", "c"]}
                  style={{ fontSize: "21px" }} // Adjust font size here
                />
                {componentId === "dashBoard" && (
                  <>
                    {mapDataLive &&
                      mapDataLive.length > 0 &&
                      mapDataLive.map((ele, index) => {
                        return (
                          <>
                            {ele.latitude && ele.longitude && (
                              <>
                                <Marker
                                  key={"Dashboard" + index}
                                  ref={
                                    ele.vehicle_id === selectedPopmMrker
                                      ? markerRef
                                      : null
                                  }
                                  eventHandlers={{
                                    click: (e) => {
                                      setSelectedPopMarker(ele.vehicle_id);
                                      setMapLayer([]);
                                      setMapRectangle([]);
                                      setCircle([]);
                                      setRadiusDraw("");
                                    },
                                  }}
                                  position={[
                                    Number(ele?.latitude),
                                    Number(ele?.longitude),
                                  ]}
                                  icon={LeafletIconsDashboard(
                                    ele.vehicle_type_icon !== "" &&
                                      ele.vehicle_type_icon !== null &&
                                      ele.vehicle_type_icon !== undefined
                                      ? ele?.vehicle_type_icon > 40
                                        ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id
                                        }/vehicle_type/${ele?.vehicle_type_icon
                                        }/${ele?.metering_status === "A"
                                          ? t("Parked")
                                          : ele?.metering_status === "B"
                                            ? t("Running")
                                            : ele?.metering_status === "d"
                                              ? t("Idle")
                                              : t("Untracked")
                                        }.png`
                                        : `${ApiConfig.BASE_URL
                                        }uploads/vehicle_type/${ele?.vehicle_type_icon
                                        }/${ele?.metering_status === "A"
                                          ? t("Parked")
                                          : ele?.metering_status === "B"
                                            ? t("Running")
                                            : ele?.metering_status === "d"
                                              ? t("Idle")
                                              : t("Untracked")
                                        }.svg`
                                      : ele.metering_status == "B"
                                        ? greenCar
                                        : ele.metering_status == "A"
                                          ? blueCarN
                                          : ele.metering_status == "d"
                                            ? yellowCar
                                            : ele.metering_status == "U"
                                              ? redCar
                                              : ele.metering_status == "customer"
                                                ? blackCar
                                                : parked,
                                    Number(ele.heading_angle)
                                  )}
                                >
                                  {ele.metering_status == "customer" ? (
                                    <Popup>
                                      <p>
                                        {t("Customer Speed:")}
                                        {ele.customer_speed_limit}
                                      </p>
                                    </Popup>
                                  ) : (
                                    <>
                                      <Popup
                                        position="bottom"
                                        className="dashboard_popup"
                                      >
                                        <div className="popover-wrapper">
                                          <div className="pw-top">
                                            <span>
                                              <img src={speed} alt="" />
                                              <p
                                                className={
                                                  addonSettingData?.addon_over_speed ==
                                                    1
                                                    ? Number(ele?.speed) >
                                                      Number(
                                                        ele?.overSpeed
                                                          ? ele?.overSpeed
                                                          : customerSettingdata.customer_speed_limit
                                                      ) &&
                                                      ele?.metering_status ==
                                                      "B"
                                                      ? "text-danger fw-bold flash animated_speed"
                                                      : Number(ele?.speed) <
                                                        Number(
                                                          ele?.overSpeed
                                                            ? ele?.overSpeed
                                                            : customerSettingdata.customer_speed_limit
                                                        ) &&
                                                        ele?.metering_status ==
                                                        "B"
                                                        ? "text-success fw-bold "
                                                        : ""
                                                    : ""
                                                }
                                              >
                                                {" "}
                                                {ele?.speed}
                                                {t("Km/h")}{" "}
                                              </p>
                                            </span>

                                            <span>
                                              <img src={engine} alt="" />
                                              {ele?.metering_status == "B"
                                                ? t("ON")
                                                : ele?.metering_status == "A"
                                                  ? t("Parked")
                                                  : ele?.metering_status == "d"
                                                    ? t("ON")
                                                    : t("OFF")}
                                            </span>
                                            <span>
                                              <img src={dish} alt="" />{" "}
                                              {ele?.gsm_signal_strength}
                                            </span>
                                            <Dropdown className="pw-dropdown">
                                              <Dropdown.Toggle>
                                                <img src={optionDot} alt="" />
                                              </Dropdown.Toggle>

                                              <Dropdown.Menu className="pwd-menu">
                                                {/* <Dropdown.Item>
                                                  {t("Track")}
                                                </Dropdown.Item > */}
                                                {(
                                                  accessRights?.rights_view_replay_or_paybacks ==
                                                  1) && (
                                                    <Dropdown.Item
                                                      onClick={() => {
                                                        navigate(
                                                          "/ReplayPlayback/" +
                                                          ele.vehicle_id
                                                        );
                                                      }}
                                                    >
                                                      {t("Playback")}
                                                    </Dropdown.Item>
                                                  )}
                                                {(
                                                  accessRights?.rights_view_vehicle == 1) && (
                                                    <>
                                                      <Dropdown.Item
                                                        onClick={() => {
                                                          navigate(
                                                            "/VehicleDetails/" +
                                                            ele.vehicle_id
                                                          );
                                                        }}
                                                      >
                                                        {t("Device Details")}
                                                      </Dropdown.Item>
                                                      <Dropdown.Item
                                                        onClick={() => {
                                                          localStorage.setItem(
                                                            "alertTab",
                                                            "2"
                                                          );
                                                          navigate(
                                                            "/VehicleDetails/" +
                                                            ele.vehicle_id
                                                          );
                                                        }}
                                                      >
                                                        {t("Alerts")}
                                                      </Dropdown.Item>
                                                    </>
                                                  )}

                                                {
                                                  accessRights?.rights_view_geofence_area == 1 ?
                                                    <>
                                                      <></>
                                                      <Dropdown.Item
                                                        onClick={() => {
                                                          // setPostionPolygon([]);
                                                          // setPositionRectangle([]);
                                                          // setPositionCercle([]);
                                                          // setPostionRadius("");
                                                          getsingleListDetails(
                                                            ele.vehicle_id
                                                          );

                                                          // setTriggerMapBoundKeyRandom(
                                                          //   Math.floor(
                                                          //     Math.random() *
                                                          //       10000000
                                                          //   )
                                                          // );
                                                          // setCenterDragged([
                                                          //   Number(ele?.latitude),
                                                          //   Number(ele?.longitude),
                                                          // ]);
                                                        }}
                                                      >
                                                        {t("Geofence")}
                                                      </Dropdown.Item>
                                                    </>
                                                    : <></>
                                                }

                                                <Dropdown.Item
                                                  // href="#"
                                                  onClick={() => {
                                                    shareDatat(
                                                      ele?.vehicle_imei
                                                    );
                                                    setShareLink(true);
                                                  }}
                                                >
                                                  {t("Share Tracking")}
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                  // href="#"
                                                  onClick={() => {
                                                    shareCureenr(
                                                      ele?.latitude,
                                                      ele?.longitude
                                                    );
                                                    setShareCureentLink(true);
                                                  }}
                                                >
                                                  {t("Share Current Location")}
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                          <div className="pw-img-box">
                                            {(ele?.vehicle_type_icon !== null &&
                                              ele?.vehicle_type_icon !== "" &&
                                              ele?.vehicle_type_icon !==
                                              undefined) ||
                                              (ele?.vehicle_image_path !== null &&
                                                ele?.vehicle_image_path !== "" &&
                                                ele?.vehicle_image_path !==
                                                undefined) ? (
                                              <img
                                                style={{
                                                  transform:
                                                    ele?.vehicle_image_path
                                                      ? `rotate(${0}deg)`
                                                      : `rotate(${270}deg)`,
                                                  width: "50px",
                                                  // heigth:"40px"
                                                }}
                                                src={
                                                  ele?.vehicle_image_path
                                                    ? `${ApiConfig.BASE_URL}${ele?.vehicle_image_path}`
                                                    : ele?.vehicle_type_icon >
                                                      40
                                                      ? `${ApiConfig.BASE_URL
                                                      }uploads/${customerData.customer_id
                                                      }/vehicle_type/${ele?.vehicle_type_icon
                                                      }/${ele?.metering_status ===
                                                        "A"
                                                        ? t("Parked")
                                                        : ele?.metering_status ===
                                                          "B"
                                                          ? t("Running")
                                                          : ele?.metering_status ===
                                                            "d"
                                                            ? t("Idle")
                                                            : t("Untracked")
                                                      }.png`
                                                      : `${ApiConfig.BASE_URL
                                                      }uploads/vehicle_type/${ele?.vehicle_type_icon
                                                      }/${ele?.metering_status ===
                                                        "A"
                                                        ? t("Parked")
                                                        : ele?.metering_status ===
                                                          "B"
                                                          ? t("Running")
                                                          : ele?.metering_status ===
                                                            "d"
                                                            ? t("Idle")
                                                            : t("Untracked")
                                                      }.svg`
                                                }
                                                alt="no icon"
                                              />
                                            ) : (
                                              <img
                                                src={popimg}
                                                alt="no vehicle icon"
                                              />
                                            )}
                                          </div>
                                          <div className="pw-bottom">
                                            <Table className="pwb-table">
                                              <tbody>
                                                <tr>
                                                  <td>{t("Vehicle Number")}</td>
                                                  <td>:</td>
                                                  <td>{ele?.vehicle_number}</td>
                                                </tr>
                                                <tr>
                                                  <td>{t("Vehicle Status")}</td>
                                                  <td>:</td>
                                                  <td>
                                                    {ele?.metering_status == "B"
                                                      ? t("Running")
                                                      : ele?.metering_status ==
                                                        "A"
                                                        ? t("Parked")
                                                        : ele?.metering_status ==
                                                          "d"
                                                          ? t("Idle")
                                                          : t("Untracked")}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>{t("Driver Name")}</td>
                                                  <td>:</td>
                                                  <td>
                                                    {ele?.user_name}
                                                  </td>
                                                </tr>
                                                {
                                                  ele?.temperatureSensor ===
                                                    null ||
                                                    ele?.temperatureSensor ===
                                                    undefined ? (
                                                    ""
                                                  ) : (
                                                    <tr>
                                                      <td>{t("Temparatue")}</td>
                                                      <td>:</td>
                                                      <td>
                                                        Max:{" "}
                                                        {ele?.metering_status ==
                                                          "B"
                                                          ? JSON.parse(
                                                            ele?.temperatureSensor
                                                          )
                                                            ?.maximumTemperatureRunning
                                                          : ele?.metering_status ==
                                                            "A"
                                                            ? JSON.parse(
                                                              ele?.temperatureSensor
                                                            )
                                                              ?.maximumTemperatureParked
                                                            : ""}
                                                        <sup>0</sup>C
                                                      </td>
                                                      <td>
                                                        Min:{" "}
                                                        {ele?.metering_status ==
                                                          "B"
                                                          ? JSON.parse(
                                                            ele?.temperatureSensor
                                                          )
                                                            ?.minimumTemperatureRunning
                                                          : ele?.metering_status ==
                                                            "A"
                                                            ? JSON.parse(
                                                              ele?.temperatureSensor
                                                            )
                                                              ?.minimumTemperatureParked
                                                            : ""}
                                                        <sup>0</sup>C
                                                      </td>
                                                    </tr>
                                                  )

                                                  //    <tr>
                                                  //    <td>{t("Temparatue")}</td>
                                                  //    <td>:</td>
                                                  //    <td>
                                                  //      {ele?.temperature

                                                  //        }
                                                  //      <sup>0</sup>C
                                                  //    </td>
                                                  //  </tr>
                                                }
                                                <tr>
                                                  <td>{t("Time")}</td>
                                                  <td>:</td>
                                                  <td> {ele?.logged_time}</td>
                                                </tr>
                                                {/* <tr>
                                          <td>{t("Last Seen At")}</td>
                                          <td>:</td>
                                          <td> {ele?.user_city}</td>
                                        </tr> */}
                                              </tbody>
                                            </Table>
                                          </div>
                                        </div>
                                      </Popup>
                                      <Tooltip className="dashboard_popup">
                                        <div className="pw-bottom">
                                          {ele?.vehicle_number}{" "}
                                          <span className="text-success ms-2">
                                            {ele?.metering_status == "B" &&
                                              ele?.speed
                                              ? ele?.speed
                                              : "0"}
                                          </span>{" "}
                                          {ele?.speed ? t("Km/h") : ""}
                                        </div>
                                      </Tooltip>
                                    </>
                                  )}
                                </Marker>
                              </>
                            )}
                          </>
                        );
                      })}
                    {mapDataLive && mapDataLive.length > 0 && (
                      <>
                        <SetBounds
                          mapDataLive={mapDataLive}
                          triggerMap={triggerMap}
                          triggerMapBoundKey={triggerMapBoundKey}
                        />
                      </>
                    )}
                  </>
                )}

                {componentId === "dashBoardShare" && (
                  <>
                    {mapDataLive &&
                      mapDataLive.length > 0 &&
                      mapDataLive.map((ele, index) => {
                        return (
                          <>
                            {ele.latitude && ele.longitude && (
                              <>
                                <Marker
                                  key={"DashboardShare" + index}
                                  ref={
                                    ele.vehicle_id === selectedPopmMrker
                                      ? markerRef
                                      : null
                                  }
                                  position={[
                                    Number(ele?.latitude),
                                    Number(ele?.longitude),
                                  ]}
                                  icon={LeafletIconsDashboard(
                                    ele.vehicle_type_icon !== "" &&
                                      ele.vehicle_type_icon !== null &&
                                      ele.vehicle_type_icon !== undefined
                                      ? ele?.vehicle_type_icon > 40
                                        ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id
                                        }/vehicle_type/${ele?.vehicle_type_icon
                                        }/${ele?.metering_status === "A"
                                          ? "Parked"
                                          : ele?.metering_status === "B"
                                            ? "Running"
                                            : ele?.metering_status === "d"
                                              ? "Idle"
                                              : "Untracked"
                                        }.png`
                                        : `${ApiConfig.BASE_URL
                                        }uploads/vehicle_type/${ele?.vehicle_type_icon
                                        }/${ele?.metering_status === "A"
                                          ? "Parked"
                                          : ele?.metering_status === "B"
                                            ? "Running"
                                            : ele?.metering_status === "d"
                                              ? "Idle"
                                              : "Untracked"
                                        }.svg`
                                      : ele.metering_status == "B"
                                        ? greenCar
                                        : ele.metering_status == "A"
                                          ? blueCarN
                                          : ele.metering_status == "d"
                                            ? yellowCar
                                            : ele.metering_status == "U"
                                              ? redCar
                                              : ele.metering_status == "customer"
                                                ? blackCar
                                                : parked,
                                    Number(ele.heading_angle)
                                  )}
                                >
                                  <>
                                    <Popup
                                      position="bottom"
                                      className="dashboard_popup"
                                    >
                                      <div className="popover-wrapper">
                                        <div className="pw-top">
                                          <span>
                                            <img src={speed} alt="" />
                                            <p
                                              className={
                                                Number(ele?.speed) >
                                                  Number(
                                                    ele?.overSpeed
                                                      ? ele?.overSpeed
                                                      : 60
                                                  ) &&
                                                  ele?.metering_status == "B"
                                                  ? "text-danger fw-bold flash animated_speed"
                                                  : Number(ele?.speed) <
                                                    Number(
                                                      ele?.overSpeed
                                                        ? ele?.overSpeed
                                                        : 60
                                                    ) &&
                                                    ele?.metering_status == "B"
                                                    ? "text-success fw-bold "
                                                    : ""
                                              }
                                            >
                                              {" "}
                                              {ele?.speed} Km/h{" "}
                                            </p>
                                          </span>

                                          <span>
                                            <img src={engine} alt="" />
                                            {ele?.panic_status}
                                          </span>
                                          <span>
                                            <img src={dish} alt="" />{" "}
                                            {ele?.gsm_signal_strength}
                                          </span>
                                        </div>
                                        <div className="pw-img-box">
                                          {(ele?.vehicle_type_icon !== null &&
                                            ele?.vehicle_type_icon !== "" &&
                                            ele?.vehicle_type_icon !==
                                            undefined) ||
                                            (ele?.vehicle_image_path !== null &&
                                              ele?.vehicle_image_path !== "" &&
                                              ele?.vehicle_image_path !==
                                              undefined) ? (
                                            <img
                                              style={{
                                                transform: `rotate(${270}deg)`,
                                              }}
                                              src={
                                                ele?.vehicle_image_path
                                                  ? `${ApiConfig.BASE_URL}${ele?.vehicle_image_path}`
                                                  : ele?.vehicle_type_icon > 40
                                                    ? `${ApiConfig.BASE_URL
                                                    }uploads/${customerData.customer_id
                                                    }/vehicle_type/${ele?.vehicle_type_icon
                                                    }/${ele?.metering_status ===
                                                      "A"
                                                      ? "Parked"
                                                      : ele?.metering_status ===
                                                        "B"
                                                        ? "Running"
                                                        : ele?.metering_status ===
                                                          "d"
                                                          ? "Idle"
                                                          : "Untracked"
                                                    }.png`
                                                    : `${ApiConfig.BASE_URL
                                                    }uploads/vehicle_type/${ele?.vehicle_type_icon
                                                    }/${ele?.metering_status ===
                                                      "A"
                                                      ? "Parked"
                                                      : ele?.metering_status ===
                                                        "B"
                                                        ? "Running"
                                                        : ele?.metering_status ===
                                                          "d"
                                                          ? "Idle"
                                                          : "Untracked"
                                                    }.svg`
                                              }
                                              alt="no icon"
                                            />
                                          ) : (
                                            <img
                                              src={popimg}
                                              alt="no vehicle icon"
                                            />
                                          )}
                                        </div>
                                        <div className="pw-bottom">
                                          <Table className="pwb-table">
                                            <tbody>
                                              <tr>
                                                <td>{t("Vehicle Number")}</td>
                                                <td>:</td>
                                                <td>{ele?.vehicle_number}</td>
                                              </tr>
                                              <tr>
                                                <td>{t("Vehicle Status")}</td>
                                                <td>:</td>
                                                <td>
                                                  {ele?.metering_status == "B"
                                                    ? "Running"
                                                    : ele?.metering_status ==
                                                      "A"
                                                      ? "Parked"
                                                      : ele?.metering_status ==
                                                        "d"
                                                        ? "Idle"
                                                        : "Untracked"}
                                                </td>
                                              </tr>
                                              {ele?.temperatureSensor ===
                                                null ||
                                                ele?.temperatureSensor ===
                                                undefined ? (
                                                ""
                                              ) : (
                                                <tr>
                                                  <td>{t("Temparatue")}</td>
                                                  <td>:</td>
                                                  <td>
                                                    Max:{" "}
                                                    {ele?.metering_status == "B"
                                                      ? JSON.parse(
                                                        ele?.temperatureSensor
                                                      )
                                                        ?.maximumTemperatureRunning
                                                      : ele?.metering_status ==
                                                        "A"
                                                        ? JSON.parse(
                                                          ele?.temperatureSensor
                                                        )
                                                          ?.maximumTemperatureParked
                                                        : ""}
                                                    <sup>0</sup>C
                                                  </td>
                                                  <td>
                                                    Min:{" "}
                                                    {ele?.metering_status == "B"
                                                      ? JSON.parse(
                                                        ele?.temperatureSensor
                                                      )
                                                        ?.minimumTemperatureRunning
                                                      : ele?.metering_status ==
                                                        "A"
                                                        ? JSON.parse(
                                                          ele?.temperatureSensor
                                                        )
                                                          ?.minimumTemperatureParked
                                                        : ""}
                                                    <sup>0</sup>C
                                                  </td>
                                                </tr>
                                              )}
                                              <tr>
                                                <td>{t("Time")}</td>
                                                <td>:</td>
                                                <td> {ele?.logged_time}</td>
                                              </tr>
                                            </tbody>
                                          </Table>
                                        </div>
                                      </div>
                                    </Popup>
                                    <Tooltip className="dashboard_popup">
                                      <div className="pw-bottom">
                                        {ele?.vehicle_number}{" "}
                                        <span className="text-success ms-2">
                                          {ele?.metering_status == "B" &&
                                            ele?.speed
                                            ? ele?.speed
                                            : "0"}
                                        </span>{" "}
                                        {ele?.speed ? " Km/h" : ""}
                                      </div>
                                    </Tooltip>
                                  </>
                                </Marker>
                                <Tooltip className="dashboard_popup">
                                  <div className="pw-bottom">
                                    {ele?.vehicle_number}{" "}
                                    <span className="text-success ms-2">
                                      {ele?.metering_status == "B" && ele?.speed
                                        ? ele?.speed
                                        : "0"}
                                    </span>{" "}
                                    {ele?.speed ? " Km/h" : ""}
                                  </div>
                                </Tooltip>
                              </>
                            )}
                          </>
                        );
                      })}
                    {mapDataLive && mapDataLive.length > 0 && mapBound && (
                      <SetBoundsSingle mapDataLive={mapDataLive} />
                    )}
                  </>
                )}
                {positionCercle?.length > 0 && (
                  <SetBoundTrasportCercleDash
                    positionCercle={positionCercle}
                    postionRadius={postionRadius}
                    key={triggerMapBoundKeyRandom}
                    componentId={componentId}
                  />
                )}

                {postionPolygon?.length > 0 && (
                  <SetBoundTrasportDash
                    postionPolygon={postionPolygon}
                    key={triggerMapBoundKeyRandom}
                    componentId={componentId}
                  />
                )}
                {positionRectangle?.length > 0 && (
                  <SetBoundTrasportDashR
                    positionRectangle={positionRectangle}
                    key={triggerMapBoundKeyRandom}
                    componentId={componentId}
                  />
                )}
                {componentId == "playback" &&
                  currentTrack != null &&
                  currentTrack != undefined &&
                  prevPos != undefined &&
                  prevPos != null && (
                    <>
                      {/* <RoutingControlReplay
                          routeLine={[   [
                       28.12,76324
                          ],
                            [
                           52.12,96.124
                            ],
                         
                          ]}
                          LeafletIcons={LeafletIcons}
                          startIcon={untracked}
                          EndIcon={idle}
                          StartLable={"starting point"}
                          EndLable={"ending point"}
                          MovingMarker={[25.21, 76.21]}
                        /> */}
                      {mapListRoad &&
                        mapListRoad?.length > 0 &&
                        mapListRoad != null &&
                        mapListRoad != undefined && (
                          <Polyline
                            ref={ChartRef}
                            pathOptions={lineOptions}
                            positions={
                              mapListRoad &&
                              mapListRoad?.length > 0 &&
                              mapListRoad
                            }
                          />
                        )}

                      {updatedTrackRoad != null &&
                        updatedTrackRoad != undefined &&
                        updatedTrackRoad &&
                        updatedTrackRoad.length > 0 && (
                          <Polyline
                            ref={ChartRefUpdate}
                            pathOptions={lineOptionsUpdate}
                            positions={updatedTrackRoad}
                          />
                        )}

                      {BreakTrackRoad != null &&
                        BreakTrackRoad != undefined &&
                        BreakTrackRoad &&
                        BreakTrackRoad.length > 0 && (
                          <Polyline
                            ref={ChartRefBreak}
                            pathOptions={lineOptionsBreak}
                            positions={[
                              BreakTrackRoad?.filter((single) => {
                                return single.length >= 2;
                              }),
                            ]}
                          />
                        )}

                      {currentTrack != null &&
                        currentTrack != undefined &&
                        currentTrack?.lat &&
                        currentTrack?.lng && (
                          <>
                            <Marker
                              key={"currentTrack"}
                              position={[currentTrack?.lat, currentTrack?.lng]}
                              icon={LeafletIconsDashboard(
                                currentTrack.vehicle_type_icon !== "" &&
                                  currentTrack.vehicle_type_icon !== null &&
                                  currentTrack.vehicle_type_icon !== undefined
                                  ? currentTrack?.vehicle_type_icon > 40
                                    ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id
                                    }/vehicle_type/${currentTrack?.vehicle_type_icon
                                    }/${currentTrack?.metering_status === "A"
                                      ? "Parked"
                                      : currentTrack?.metering_status ===
                                        "B"
                                        ? "Running"
                                        : currentTrack?.metering_status ===
                                          "d"
                                          ? "Idle"
                                          : "Untracked"
                                    }.png`
                                    : `${ApiConfig.BASE_URL
                                    }uploads/vehicle_type/${currentTrack?.vehicle_type_icon
                                    }/${currentTrack?.metering_status === "A"
                                      ? "Parked"
                                      : currentTrack?.metering_status ===
                                        "B"
                                        ? "Running"
                                        : currentTrack?.metering_status ===
                                          "d"
                                          ? "Idle"
                                          : "Untracked"
                                    }.svg`
                                  : currentTrack.metering_status == "B"
                                    ? greenCar
                                    : currentTrack.metering_status == "A"
                                      ? blueCarN
                                      : currentTrack.metering_status == "d"
                                        ? yellowCar
                                        : currentTrack.metering_status == "U"
                                          ? redCar
                                          : currentTrack.metering_status == "customer"
                                            ? blackCar
                                            : parked,
                                Number(currentTrack.heading_angle)
                              )}
                            >
                              <Popup>
                                {" "}
                                <div className="pw-bottom">
                                  <Table className="pwb-table">
                                    <tbody>
                                      <tr>
                                        <td>{t("Vehicle Number")}</td>
                                        <td>:</td>
                                        <td>{currentTrack?.vehicle_number}</td>
                                      </tr>
                                      <tr>
                                        <td>{t("Vehicle Status")}</td>
                                        <td>:</td>
                                        <td>
                                          {currentTrack?.metering_status == "B"
                                            ? "Running"
                                            : currentTrack?.metering_status ==
                                              "A"
                                              ? "Parked"
                                              : currentTrack?.metering_status ==
                                                "d"
                                                ? "Idle"
                                                : "Untracked"}
                                        </td>
                                      </tr>
                                      {currentTrack?.temperatureSensor ===
                                        null ||
                                        currentTrack?.temperatureSensor ===
                                        undefined ? (
                                        ""
                                      ) : (
                                        <tr>
                                          <td>{t("Temparatue")}</td>
                                          <td>:</td>
                                          <td>
                                            Max:{" "}
                                            {currentTrack?.metering_status ==
                                              "B"
                                              ? JSON.parse(
                                                currentTrack?.temperatureSensor
                                              )?.maximumTemperatureRunning
                                              : currentTrack?.metering_status ==
                                                "A"
                                                ? JSON.parse(
                                                  currentTrack?.temperatureSensor
                                                )?.maximumTemperatureParked
                                                : ""}
                                            <sup>0</sup>C
                                          </td>
                                          <td>
                                            Min:{" "}
                                            {currentTrack?.metering_status ==
                                              "B"
                                              ? JSON.parse(
                                                currentTrack?.temperatureSensor
                                              )?.minimumTemperatureRunning
                                              : currentTrack?.metering_status ==
                                                "A"
                                                ? JSON.parse(
                                                  currentTrack?.temperatureSensor
                                                )?.minimumTemperatureParked
                                                : ""}
                                            <sup>0</sup>C
                                          </td>
                                        </tr>
                                      )}

                                      <tr>
                                        <td>{t("Vehicle Speed")}</td>
                                        <td>:</td>
                                        <td>{currentTrack?.speed}</td>
                                      </tr>
                                      <tr>
                                        <td>{t("Time")}</td>
                                        <td>:</td>
                                        <td> {currentTrack?.logged_time}</td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                              </Popup>
                            </Marker>
                            {mapBoundReplay && (
                              <MapWithCenteredMarker
                                markerPosition={[
                                  Number(currentTrack?.lat),
                                  Number(currentTrack?.lng),
                                ]}
                              />
                            )}
                          </>
                        )}

                      {/* {TripsBounds.length > 0 && (
                        <BoundCompletedTrips
                          TripsBounds={TripsBounds}
                          vehicleIcon={vehicleIcon}
                        />
                      )} */}
                    </>
                  )}

                {(componentId === "ViewOrders" ||
                  componentId == "viewtrip") && (
                    <>
                      {data?.dispatch_customer_address_latitude &&
                        data?.dispatch_customer_address_longitude &&
                        data?.vendor_warehouse_latitude &&
                        data?.vendor_warehouse_longitude && (
                          <>
                            <RoutingControl
                              stopData={stopListData}
                              routeLine={[
                                [
                                  Number(data?.vendor_warehouse_latitude),
                                  Number(data?.vendor_warehouse_longitude),
                                ],
                                [
                                  Number(
                                    data?.dispatch_customer_address_latitude
                                  ),
                                  Number(
                                    data?.dispatch_customer_address_longitude
                                  ),
                                ],
                              ]}
                              componentId={componentId}
                              LeafletIcons={LeafletIcons}
                              startIcon={
                                customerLogo.logo_trip_start_point == "" || customerLogo.logo_trip_start_point == null ?
                                  untracked : ApiConfig.BASE_URL_FOR_IMAGES_L + customerLogo.logo_trip_start_point}
                              EndIcon={
                                customerLogo.logo_trip_end_point == "" || customerLogo.logo_trip_end_point == null ?
                                  idle : ApiConfig.BASE_URL_FOR_IMAGES_L + customerLogo.logo_trip_end_point}


                              StartLable={data?.vendor_warehouse_address}
                              EndLable={data?.dispatch_customer_address_address}
                            />
                          </>
                        )}

                      {viewTripVehicle != null &&
                        viewTripVehicle != undefined &&
                        viewTripVehicle?.latitude &&
                        viewTripVehicle?.longitude && (
                          <Marker
                            key={"viewTripVehicle"}
                            position={[
                              viewTripVehicle?.latitude,
                              viewTripVehicle?.longitude,
                            ]}
                            icon={LeafletIconsDashboard(
                              viewTripVehicle?.vehicle_type_icon !== "" &&
                                viewTripVehicle?.vehicle_type_icon !== null &&
                                viewTripVehicle?.vehicle_type_icon !== undefined
                                ? viewTripVehicle?.vehicle_type_icon > 40
                                  ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id
                                  }/vehicle_type/${viewTripVehicle?.vehicle_type_icon
                                  }/${viewTripVehicle?.metering_status === "A"
                                    ? "Parked"
                                    : viewTripVehicle?.metering_status === "B"
                                      ? "Running"
                                      : viewTripVehicle?.metering_status === "d"
                                        ? "Idle"
                                        : "Untracked"
                                  }.png`
                                  : `${ApiConfig.BASE_URL}uploads/vehicle_type/${viewTripVehicle?.vehicle_type_icon
                                  }/${viewTripVehicle?.metering_status === "A"
                                    ? "Parked"
                                    : viewTripVehicle?.metering_status === "B"
                                      ? "Running"
                                      : viewTripVehicle?.metering_status === "d"
                                        ? "Idle"
                                        : "Untracked"
                                  }.svg`
                                : viewTripVehicle.metering_status == "B"
                                  ? greenCar
                                  : viewTripVehicle.metering_status == "A"
                                    ? blueCarN
                                    : viewTripVehicle.metering_status == "d"
                                      ? yellowCar
                                      : viewTripVehicle.metering_status == "U"
                                        ? redCar
                                        : viewTripVehicle.metering_status == "customer"
                                          ? blackCar
                                          : parked,
                              Number(viewTripVehicle.heading_angle)
                            )}
                          >
                            <Popup>
                              {" "}
                              <div className="pw-bottom">
                                <Table className="pwb-table">
                                  <tbody>
                                    <tr>
                                      <td>{t("Vehicle Number")}</td>
                                      <td>:</td>
                                      <td>{viewTripVehicle?.vehicle_number}</td>
                                    </tr>
                                    <tr>
                                      <td>{t("Vehicle Status")}</td>
                                      <td>:</td>
                                      <td>
                                        {viewTripVehicle?.metering_status == "B"
                                          ? "Running"
                                          : viewTripVehicle?.metering_status ==
                                            "A"
                                            ? "Parked"
                                            : viewTripVehicle?.metering_status ==
                                              "d"
                                              ? "Idle"
                                              : "Untracked"}
                                      </td>
                                    </tr>
                                    {viewTripVehicle?.temperatureSensor ===
                                      null ||
                                      viewTripVehicle?.temperatureSensor ===
                                      undefined ? (
                                      ""
                                    ) : (
                                      <tr>
                                        <td>{t("Temparatue")}</td>
                                        <td>:</td>
                                        <td>
                                          Max:{" "}
                                          {viewTripVehicle?.metering_status == "B"
                                            ? JSON.parse(
                                              viewTripVehicle?.temperatureSensor
                                            )?.maximumTemperatureRunning
                                            : viewTripVehicle?.metering_status ==
                                              "A"
                                              ? JSON.parse(
                                                viewTripVehicle?.temperatureSensor
                                              )?.maximumTemperatureParked
                                              : ""}
                                          <sup>0</sup>C
                                        </td>
                                        <td>
                                          Min:{" "}
                                          {viewTripVehicle?.metering_status == "B"
                                            ? JSON.parse(
                                              viewTripVehicle?.temperatureSensor
                                            )?.minimumTemperatureRunning
                                            : viewTripVehicle?.metering_status ==
                                              "A"
                                              ? JSON.parse(
                                                viewTripVehicle?.temperatureSensor
                                              )?.minimumTemperatureParked
                                              : ""}
                                          <sup>0</sup>C
                                        </td>
                                      </tr>
                                    )}

                                    <tr>
                                      <td>{t("Vehicle Speed")}</td>
                                      <td>:</td>
                                      <td>{viewTripVehicle?.speed}</td>
                                    </tr>
                                    <tr>
                                      <td>{t("Time")}</td>
                                      <td>:</td>
                                      <td> {viewTripVehicle?.logged_time}</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                            </Popup>
                          </Marker>
                        )}

                      {Number(data?.vendor_warehouse_latitude) &&
                        Number(data?.vendor_warehouse_longitude) &&
                        Number(data?.dispatch_customer_address_latitude) &&
                        Number(data?.dispatch_customer_address_longitude) && (
                          <BoundTrips
                            TripsBounds={
                              Number(data?.vendor_warehouse_latitude) &&
                              Number(data?.vendor_warehouse_longitude) &&
                              Number(data?.dispatch_customer_address_latitude) &&
                              Number(
                                data?.dispatch_customer_address_longitude
                              ) && [
                                [
                                  Number(data?.vendor_warehouse_latitude),
                                  Number(data?.vendor_warehouse_longitude),
                                ],
                                [
                                  Number(
                                    data?.dispatch_customer_address_latitude
                                  ),
                                  Number(
                                    data?.dispatch_customer_address_longitude
                                  ),
                                ],
                              ]
                            }
                            vehicleIcon={[
                              Number(viewTripVehicle?.latitude),
                              Number(viewTripVehicle?.longitude),
                            ]}
                          />
                        )}
                    </>
                  )}

                {(componentId == "VehicleGroup" ||
                  componentId == "addVehicle" ||
                  componentId == "parkingAdd" ||
                  componentId == "transportation" ||
                  componentId == "ManualRouting" ||
                  (componentId == "EditDispatchTrip" &&
                    drawshape &&
                    subComponentId !== "EditDispatchTripOne") ||
                  componentId == "GeofanceAdd") && (
                    <>
                      <DrawShapes
                        componentId={componentId}
                        subComponentId={subComponentId}
                      />{" "}
                      <LeafletgeoSearch />
                    </>
                  )}
                {componentId == "ViewMerchant" &&
                  warehouse &&
                  warehouse.length &&
                  warehouse.map((wareH, index) => {
                    return (
                      <Marker
                        key={"warehouse" + index}
                        position={[
                          Number(wareH.vendor_warehouse_latitude),
                          Number(wareH.vendor_warehouse_longitude),
                        ]}
                        icon={LeafletIcons(Warehouser_icon)}
                      >
                        <Popup>
                          {/* {tripDetails.pickup_point_name} */}
                          <div className="popover-main-wrapper">
                            <div className="popover-wrapper">
                              <div className="stop-overlay-top">
                                <p>Warehouse Details</p>
                                {/* <button
                                        onClick={() => {
                                          handleClick2();
                                        }}
                                      >
                                        <img src={close_icon} alt="" />
                                      </button> */}
                              </div>
                              <div className="pw-bottom">
                                <table className="pwb-table">
                                  <tbody>
                                    <tr>
                                      <td>Warehouse Name</td>
                                      <td>:</td>
                                      <td>{wareH.vendor_warehouse_name}</td>
                                    </tr>
                                    <tr>
                                      <td>Address</td>
                                      <td>:</td>
                                      <td>{wareH.vendor_warehouse_address}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                {/* ManualRouting */}
                {componentId == "ManualRouting" &&
                  warehouse &&
                  warehouse?.length &&
                  warehouse?.map((wareH, index) => {
                    return (
                      <>
                        <Marker
                          key={"ManualRouting" + index}
                          position={[
                            Number(wareH?.dispatch_customer_address_latitude),
                            Number(wareH?.dispatch_customer_address_longitude),
                          ]}
                          icon={LeafletIcons(yellowMapIcon)}
                        >
                          <Popup>
                            <div className="popover-main-wrapper">
                              <div className="popover-wrapper">
                                <div className="stop-overlay-top">
                                  <p>Customer Details</p>
                                </div>
                                <div className="pw-bottom">
                                  <table className="pwb-table">
                                    <tbody>
                                      <tr>
                                        <td>Customer Name</td>
                                        <td>:</td>
                                        <td>{wareH?.dispatch_customer_name}</td>
                                      </tr>
                                      <tr>
                                        <td>Address</td>
                                        <td>:</td>
                                        <td>
                                          {
                                            wareH?.dispatch_customer_address_address
                                          }
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                        <Marker
                          key={"warehouse1201" + index}
                          position={[
                            Number(wareH?.vendor_warehouse_latitude),
                            Number(wareH?.vendor_warehouse_longitude),
                          ]}
                          icon={LeafletIcons(redMapIcon)}
                        >
                          <Popup>
                            <div className="popover-main-wrapper">
                              <div className="popover-wrapper">
                                <div className="stop-overlay-top">
                                  <p>Warehouse Details</p>
                                </div>
                                <div className="pw-bottom">
                                  <table className="pwb-table">
                                    <tbody>
                                      <tr>
                                        <td>Warehouse Name</td>
                                        <td>:</td>
                                        <td>{wareH?.vendor_warehouse_name}</td>
                                      </tr>
                                      <tr>
                                        <td>Address</td>
                                        <td>:</td>
                                        <td>
                                          {wareH?.vendor_warehouse_address}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      </>
                    );
                  })}

                {componentId == "DispatchOrder" &&
                  dispatchData &&
                  dispatchData?.length > 0 &&
                  dispatchData?.map((ele, index) => {
                    return (
                      <>
                        {ele.latitude && ele.longitude && (
                          <>
                            <Marker
                              key={"DashboardShare" + index}
                              // ref={
                              //   ele.vehicle_id === selectedPopmMrker
                              //     ? markerRef
                              //     : null
                              // }
                              position={[
                                Number(ele?.latitude),
                                Number(ele?.longitude),
                              ]}
                              icon={LeafletIconsDashboard(
                                ele.vehicle_type_icon !== "" &&
                                  ele.vehicle_type_icon !== null &&
                                  ele.vehicle_type_icon !== undefined
                                  ? ele?.vehicle_type_icon > 40
                                    ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id
                                    }/vehicle_type/${ele?.vehicle_type_icon
                                    }/${ele?.metering_status === "A"
                                      ? "Parked"
                                      : ele?.metering_status === "B"
                                        ? "Running"
                                        : ele?.metering_status === "d"
                                          ? "Idle"
                                          : "Untracked"
                                    }.png`
                                    : `${ApiConfig.BASE_URL
                                    }uploads/vehicle_type/${ele?.vehicle_type_icon
                                    }/${ele?.metering_status === "A"
                                      ? "Parked"
                                      : ele?.metering_status === "B"
                                        ? "Running"
                                        : ele?.metering_status === "d"
                                          ? "Idle"
                                          : "Untracked"
                                    }.svg`
                                  : ele.metering_status == "B"
                                    ? greenCar
                                    : ele.metering_status == "A"
                                      ? blueCarN
                                      : ele.metering_status == "d"
                                        ? yellowCar
                                        : ele.metering_status == "U"
                                          ? redCar
                                          : ele.metering_status == "customer"
                                            ? blackCar
                                            : parked,
                                Number(ele.heading_angle)
                              )}
                            >
                              <>
                                <Popup
                                  position="bottom"
                                  className="dashboard_popup"
                                >
                                  <div className="popover-wrapper">
                                    <div className="pw-top">
                                      <span>
                                        <img src={speed} alt="" />
                                        <p
                                          className={
                                            Number(ele?.speed) >
                                              Number(
                                                ele?.overSpeed
                                                  ? ele?.overSpeed
                                                  : 60
                                              ) && ele?.metering_status == "B"
                                              ? "text-danger fw-bold flash animated_speed"
                                              : Number(ele?.speed) <
                                                Number(
                                                  ele?.overSpeed
                                                    ? ele?.overSpeed
                                                    : 60
                                                ) &&
                                                ele?.metering_status == "B"
                                                ? "text-success fw-bold "
                                                : ""
                                          }
                                        >
                                          {" "}
                                          {ele?.speed} Km/h{" "}
                                        </p>
                                      </span>

                                      <span>
                                        <img src={engine} alt="" />
                                        {ele?.metering_status == "B"
                                          ? "ON"
                                          : ele?.metering_status == "A"
                                            ? "Parked"
                                            : ele?.metering_status == "d"
                                              ? "ON"
                                              : "OFF"}
                                      </span>
                                      <span>
                                        <img src={dish} alt="" />{" "}
                                        {ele?.gsm_signal_strength}
                                      </span>
                                    </div>
                                    <div className="pw-img-box">
                                      {(ele?.vehicle_type_icon !== null &&
                                        ele?.vehicle_type_icon !== "" &&
                                        ele?.vehicle_type_icon !== undefined) ||
                                        (ele?.vehicle_image_path !== null &&
                                          ele?.vehicle_image_path !== "" &&
                                          ele?.vehicle_image_path !==
                                          undefined) ? (
                                        <img
                                          style={{
                                            transform: `rotate(${270}deg)`,
                                          }}
                                          src={
                                            ele?.vehicle_image_path
                                              ? `${ApiConfig.BASE_URL}${ele?.vehicle_image_path}`
                                              : ele?.vehicle_type_icon > 40
                                                ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id
                                                }/vehicle_type/${ele?.vehicle_type_icon
                                                }/${ele?.metering_status === "A"
                                                  ? "Parked"
                                                  : ele?.metering_status ===
                                                    "B"
                                                    ? "Running"
                                                    : ele?.metering_status ===
                                                      "d"
                                                      ? "Idle"
                                                      : "Untracked"
                                                }.png`
                                                : `${ApiConfig.BASE_URL
                                                }uploads/vehicle_type/${ele?.vehicle_type_icon
                                                }/${ele?.metering_status === "A"
                                                  ? "Parked"
                                                  : ele?.metering_status ===
                                                    "B"
                                                    ? "Running"
                                                    : ele?.metering_status ===
                                                      "d"
                                                      ? "Idle"
                                                      : "Untracked"
                                                }.svg`
                                          }
                                          alt="no icon"
                                        />
                                      ) : (
                                        <img
                                          src={popimg}
                                          alt="no vehicle icon"
                                        />
                                      )}
                                    </div>
                                    <div className="pw-bottom">
                                      <Table className="pwb-table">
                                        <tbody>
                                          <tr>
                                            <td>{t("Order  Number")}</td>
                                            <td>:</td>
                                            <td>
                                              {
                                                ele?.dispatch_package_order_number
                                              }
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>{t("Vehicle  Number")}</td>
                                            <td>:</td>
                                            <td>{ele?.vehicle_number}</td>
                                          </tr>
                                          <tr>
                                            <td>{t("Customer Name")}</td>
                                            <td>:</td>
                                            <td>
                                              {ele?.dispatch_customer_name}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>{t("Marchant Name ")}</td>
                                            <td>:</td>
                                            <td>{ele?.vendor_name}</td>
                                          </tr>
                                          <tr>
                                            <td>{t("Driver Name")}</td>
                                            <td>:</td>
                                            <td>
                                              {ele?.user_name
                                                ? ele?.user_name
                                                : "driver not available"}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>{t("Vehicle Status")}</td>
                                            <td>:</td>
                                            <td>
                                              {ele?.metering_status == "B"
                                                ? "Running"
                                                : ele?.metering_status == "A"
                                                  ? "Parked"
                                                  : ele?.metering_status == "d"
                                                    ? "Idle"
                                                    : "Untracked"}
                                            </td>
                                            {/* </tr>
                                              {ele?.temperatureSensor ===
                                                null ||
                                              ele?.temperatureSensor ===
                                                undefined ? (
                                                ""
                                              ) : (
                                                <tr>
                                                  <td>{t("Temparatue")}</td>
                                                  <td>:</td>
                                                  <td>
                                                    Max:{" "}
                                                    {ele?.metering_status == "B"
                                                      ? JSON.parse(
                                                          ele?.temperatureSensor
                                                        )
                                                          ?.maximumTemperatureRunning
                                                      : ele?.metering_status ==
                                                        "A"
                                                      ? JSON.parse(
                                                          ele?.temperatureSensor
                                                        )
                                                          ?.maximumTemperatureParked
                                                      : ""}
                                                    <sup>0</sup>C
                                                  </td>
                                                  <td>
                                                    Min:{" "}
                                                    {ele?.metering_status == "B"
                                                      ? JSON.parse(
                                                          ele?.temperatureSensor
                                                        )
                                                          ?.minimumTemperatureRunning
                                                      : ele?.metering_status ==
                                                        "A"
                                                      ? JSON.parse(
                                                          ele?.temperatureSensor
                                                        )
                                                          ?.minimumTemperatureParked
                                                      : ""}
                                                    <sup>0</sup>C
                                                  </td>
                                                </tr>
                                              )}
                                              <tr> */}
                                          </tr>
                                          <tr>
                                            <td>{t("Time")}</td>
                                            <td>:</td>
                                            <td> {ele?.logged_time}</td>
                                          </tr>
                                        </tbody>
                                      </Table>
                                    </div>
                                  </div>
                                </Popup>
                                <Tooltip className="dashboard_popup">
                                  <div className="pw-bottom">
                                    {ele?.vehicle_number}{" "}
                                    <span className="text-success ms-2">
                                      {ele?.metering_status == "B" && ele?.speed
                                        ? ele?.speed
                                        : "0"}
                                    </span>{" "}
                                    {ele?.speed ? " Km/h" : ""}
                                  </div>
                                </Tooltip>
                              </>
                            </Marker>
                            <Tooltip className="dashboard_popup">
                              <div className="pw-bottom">
                                {ele?.vehicle_number}{" "}
                                <span className="text-success ms-2">
                                  {ele?.metering_status == "B" && ele?.speed
                                    ? ele?.speed
                                    : "0"}
                                </span>{" "}
                                {ele?.speed ? " Km/h" : ""}
                              </div>
                            </Tooltip>
                          </>
                        )}
                      </>
                    );
                  })}
                {/* {dispatchData && dispatchData.length > 0 && (
                      <>
                        <SetBounds
                          mapDataLive={dispatchData}
                          triggerMap={triggerMap}
                          triggerMapBoundKey={triggerMapBoundKey}
                        /></>)} */}
                {dispatchData && dispatchData.length > 0 && (
                  <SetBoundsOrder
                    dispatchData={dispatchData}
                    triggerMapBoundKey={triggerMapBoundKey}
                    regionCord={regionCord}
                  />
                )}

                {/* ManualRouting */}
                {componentId == "updateProfile" &&
                  customerSetting?.customer_latitude &&
                  customerSetting?.customer_longitude && (
                    <>
                      (
                      <Marker
                        eventHandlers={eventHandlerComman}
                        ref={commanRef}
                        draggable
                        position={
                          //  componentId == "updateProfile" ||
                          componentId == "updateProfile" &&
                            customerSetting?.customer_latitude &&
                            customerSetting?.customer_longitude
                            ? [
                              Number(customerSetting?.customer_latitude),
                              Number(customerSetting?.customer_longitude),
                            ]
                            : regionCord
                        }
                        icon={iconNewMarker}
                      >
                        <Popup>{place}</Popup>
                      </Marker>
                      )
                    </>
                  )}
                {componentId == "EditMerchant" &&
                  latlong.lat &&
                  latlong.long && (
                    <Marker
                      eventHandlers={eventEditMerchent}
                      ref={editMerchant}
                      draggable
                      position={[latlong.lat, latlong.long]}
                      icon={LeafletIcons(Warehouser_icon)}
                    >
                      <Popup>{place}</Popup>
                    </Marker>
                  )}
                {componentId == "vahicledetails" && (
                  <Marker
                    position={[
                      Number(tabsDetails?.latitude),
                      Number(tabsDetails?.longitude),
                    ]}
                    icon={LeafletIconsDashboard(
                      tabsDetails.vehicle_type_icon !== "" &&
                        tabsDetails.vehicle_type_icon !== null &&
                        tabsDetails.vehicle_type_icon !== undefined
                        ? tabsDetails?.vehicle_type_icon > 40
                          ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id
                          }/vehicle_type/${tabsDetails?.vehicle_type_icon}/${tabsDetails?.metering_status === "A"
                            ? "Parked"
                            : tabsDetails?.metering_status === "B"
                              ? "Running"
                              : tabsDetails?.metering_status === "d"
                                ? "Idle"
                                : "Untracked"
                          }.png`
                          : `${ApiConfig.BASE_URL}uploads/vehicle_type/${tabsDetails?.vehicle_type_icon
                          }/${tabsDetails?.metering_status === "A"
                            ? "Parked"
                            : tabsDetails?.metering_status === "B"
                              ? "Running"
                              : tabsDetails?.metering_status === "d"
                                ? "Idle"
                                : "Untracked"
                          }.svg`
                        : tabsDetails.metering_status == "B"
                          ? greenCar
                          : tabsDetails.metering_status == "A"
                            ? blueCarN
                            : tabsDetails.metering_status == "d"
                              ? yellowCar
                              : tabsDetails.metering_status == "U"
                                ? redCar
                                : tabsDetails.metering_status == "customer"
                                  ? blackCar
                                  : parked,
                      Number(tabsDetails.heading_angle)
                    )}
                  >
                    <Popup>
                      {" "}
                      <div className="pw-bottom">
                        <Table className="pwb-table">
                          <tbody>
                            <tr>
                              <td>{t("Vehicle Number")}</td>
                              <td>:</td>
                              <td>{tabsDetails?.vehicle_number}</td>
                            </tr>
                            <tr>
                              <td>{t("Vehicle Status")}</td>
                              <td>:</td>
                              <td>
                                {tabsDetails?.metering_status == "B"
                                  ? "Running"
                                  : tabsDetails?.metering_status == "A"
                                    ? "Parked"
                                    : tabsDetails?.metering_status == "d"
                                      ? "Idle"
                                      : "Untracked"}
                              </td>
                            </tr>
                            {tabsDetails?.temperatureSensor === null ||
                              tabsDetails?.temperatureSensor === undefined ? (
                              ""
                            ) : (
                              <tr>
                                <td>{t("Temparatue")}</td>
                                <td>:</td>
                                <td>
                                  Max:{" "}
                                  {tabsDetails?.metering_status == "B"
                                    ? JSON.parse(tabsDetails?.temperatureSensor)
                                      ?.maximumTemperatureRunning
                                    : tabsDetails?.metering_status == "A"
                                      ? JSON.parse(tabsDetails?.temperatureSensor)
                                        ?.maximumTemperatureParked
                                      : ""}
                                  <sup>0</sup>C
                                </td>
                                <td>
                                  Min:{" "}
                                  {tabsDetails?.metering_status == "B"
                                    ? JSON.parse(tabsDetails?.temperatureSensor)
                                      ?.minimumTemperatureRunning
                                    : tabsDetails?.metering_status == "A"
                                      ? JSON.parse(tabsDetails?.temperatureSensor)
                                        ?.minimumTemperatureParked
                                      : ""}
                                  <sup>0</sup>C
                                </td>
                              </tr>
                            )}

                            <tr>
                              <td>{t("Vehicle Speed")}</td>
                              <td>:</td>
                              <td>{tabsDetails?.speed}</td>
                            </tr>
                            <tr>
                              <td>{t("Time")}</td>
                              <td>:</td>
                              <td> {tabsDetails?.logged_time}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </Popup>
                  </Marker>

                  // <Marker
                  //   position={[
                  //     Number(
                  //       tabsDetails?.latitude
                  //     ),
                  //     Number(
                  //       tabsDetails?.longitude
                  //     ),
                  //   ]}
                  //   icon={iconNewMarker}
                  // >
                  //   <Popup>Vehicle current position</Popup>
                  // </Marker>
                )}
                {/* display shape function */}
                {/* {componentId == "viewStop" &&
                  stopDetails &&
                  stopDetails?.trip_end_longitude &&
                  stopDetails?.trip_end_latitude &&
                  stopDetails?.trip_start_longitude &&
                  stopDetails?.trip_start_latitude && (
                    <Polyline
                      pathOptions={{ color: "purple" }}
                      positions={[
                        [
                          Number(stopDetails?.trip_start_latitude),
                          Number(stopDetails?.trip_start_longitude),
                        ],
                        [
                          Number(stopDetails?.trip_end_latitude),
                          Number(stopDetails?.trip_end_longitude),
                        ],
                      ]}
                    />
                  )} */}
                {componentId == "viewtrip" && tripDetails && (
                  <>
                    {stoplist &&
                      stoplist.map((stop, index) => {
                        return (
                          <>
                            <Marker
                              eventHandlers={eventHandleStop}
                              ref={(element) =>
                                (StopsRef.current[index] = element)
                              }
                              // autoPan={true}
                              draggable={moveStop ? true : false}
                              position={[
                                Number(stop.pickup_point_latitude),
                                Number(stop.pickup_point_longitude),
                              ]}
                              icon={LeafletIcons(stopIcon)}
                            >
                              <Popup>
                                {/* {tripDetails.pickup_point_name} */}
                                <div className="popover-main-wrapper">
                                  <div className="popover-wrapper">
                                    <div className="stop-overlay-top">
                                      <p>Stop Details</p>
                                      {/* <button
                                        onClick={() => {
                                          handleClick2();
                                        }}
                                      >
                                        <img src={close_icon} alt="" />
                                      </button> */}
                                    </div>
                                    <div className="pw-bottom">
                                      <table className="pwb-table">
                                        <tbody>
                                          <tr>
                                            <td>Stop Name</td>
                                            <td>:</td>
                                            <td>{stop?.pickup_point_name}</td>
                                          </tr>
                                          <tr>
                                            <td>Stop Code</td>
                                            <td>:</td>
                                            <td>{stop?.pickup_point_code}</td>
                                          </tr>
                                          <tr>
                                            <td>Add to POI</td>
                                            <td>:</td>
                                            <td>Yes</td>
                                          </tr>
                                          <tr>
                                            <td colSpan={3}></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    {/* <div className="so-btn-wrapper">
                                    <button
                                      className="cx-btn-2"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        updateStop(stop, index);
                                      }}
                                    >
                                      Update Stop
                                    </button>
                                    <button
                                      className="cx-btn-1"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        removeStop(stop);
                                      }}
                                    >
                                      Remove Stop
                                    </button>
                                  </div> */}
                                  </div>
                                </div>
                              </Popup>
                            </Marker>
                          </>
                        );
                      })}

                    {tripDetails.trip_start_latitude &&
                      tripDetails.trip_end_latitude && (
                        <Marker
                          position={[
                            Number(tripDetails.trip_start_latitude),
                            Number(tripDetails.trip_start_longitude),
                          ]}
                          icon={LeafletIcons(untracked)}
                        >
                          <Popup>{tripDetails.trip_start_point}</Popup>
                        </Marker>
                      )}
                    {tripDetails.trip_end_latitude &&
                      tripDetails.trip_end_longitude && (
                        <Marker
                          position={[
                            Number(tripDetails.trip_end_latitude),
                            Number(tripDetails.trip_end_longitude),
                          ]}
                          icon={LeafletIcons(idle)}
                        >
                          <Popup>{tripDetails.trip_end_point}</Popup>
                        </Marker>
                      )}
                  </>
                )}
                {componentId == "EditDispatchTrip" &&
                  tripDetails &&
                  tripDetails.trip_start_latitude &&
                  tripDetails.trip_end_latitude &&
                  customerData && (
                    <>
                      <Marker
                        eventHandlers={eventHandlerComman}
                        ref={commanRef}
                        draggable
                        position={
                          customerData.lat && customerData.long
                            ? [
                              Number(customerData.lat),
                              Number(customerData.long),
                            ]
                            : regionCord
                        }
                        icon={LeafletIcons(Gcustomer)}
                      >
                        <Popup>{place}</Popup>
                      </Marker>

                      {stoplist &&
                        stoplist.map((stop, index) => {
                          return (
                            <Marker
                              eventHandlers={eventHandleStop}
                              ref={(element) =>
                                (StopsRef.current[index] = element)
                              }
                              // autoPan={true}
                              draggable={moveStop ? true : false}
                              position={[
                                Number(stop?.pickup_point_latitude),
                                Number(stop?.pickup_point_longitude),
                              ]}
                              icon={LeafletIcons(stopIcon)}
                            >
                              <Popup>
                                {/* {tripDetails.pickup_point_name} */}
                                <div className="popover-main-wrapper">
                                  <div className="popover-wrapper">
                                    <div className="stop-overlay-top">
                                      <p>Stop Details</p>
                                      {/* <button
                                        onClick={() => {
                                          handleClick2();
                                        }}
                                      >
                                        <img src={close_icon} alt="" />
                                      </button> */}
                                    </div>
                                    <div className="pw-bottom">
                                      <table className="pwb-table">
                                        <tbody>
                                          <tr>
                                            <td>Stop Name</td>
                                            <td>:</td>
                                            <td>{stop?.pickup_point_name}</td>
                                          </tr>
                                          <tr>
                                            <td>Stop Code</td>
                                            <td>:</td>
                                            <td>{stop?.pickup_point_code}</td>
                                          </tr>
                                          <tr>
                                            <td>Add to POI</td>
                                            <td>:</td>
                                            <td>Yes</td>
                                          </tr>
                                          <tr>
                                            <td colSpan={3}></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div className="so-btn-wrapper">
                                      <button
                                        className="cx-btn-2"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          updateStop(stop, index);
                                        }}
                                      >
                                        Update Stop
                                      </button>
                                      <button
                                        className="cx-btn-1"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          removeStop(stop);
                                        }}
                                      >
                                        Remove Stop
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Popup>
                            </Marker>
                          );
                        })}
                      {clickedStops &&
                        clickedStops.map((stop, index) => {
                          return (
                            <Marker
                              eventHandlers={eventHandleStopClicks}
                              ref={(element) =>
                                (clickedStopsRef.current[index] = element)
                              }
                              // autoPan={true}
                              draggable={moveStop ? true : false}
                              position={[
                                Number(stop.pickup_point_latitude),
                                Number(stop.pickup_point_longitude),
                              ]}
                              icon={LeafletIcons(stopIcon)}
                            >
                              <Popup>
                                {/* {tripDetails.pickup_point_name} */}
                                <div className="popover-main-wrapper">
                                  <div className="popover-wrapper">
                                    <div className="stop-overlay-top">
                                      <p>Add Stop</p>
                                      {/* <button
                                        onClick={() => {
                                          handleClick2();
                                        }}
                                      >
                                        <img src={close_icon} alt="" />
                                      </button> */}
                                    </div>
                                    <div className="pw-bottom">
                                      <table className="pwb-table">
                                        <tbody>
                                          <tr>
                                            <td>Stop Name</td>
                                            <td>:</td>
                                            <td>{stop?.pickup_point_name}</td>
                                          </tr>
                                          <tr>
                                            <td>Stop Code</td>
                                            <td>:</td>
                                            <td>{stop.pickup_point_code}</td>
                                          </tr>
                                          <tr>
                                            <td>Add to POI</td>
                                            <td>:</td>
                                            <td>Yes</td>
                                          </tr>
                                          <tr>
                                            <td colSpan={3}></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div className="so-btn-wrapper">
                                      <button
                                        className="cx-btn-2"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          addStop(stop);
                                        }}
                                      >
                                        Add Stop
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Popup>
                            </Marker>
                          );
                        })}
                      <Marker
                        eventHandlers={eventHandlerstart}
                        // eventHandlers={{
                        //   click: (e) => {
                        //    eventHandlerstart()
                        //     setflag(true)
                        //   },
                        // }}

                        ref={startRef}
                        // autoPan={true}
                        draggable={startEdit ? true : false}
                        position={[
                          Number(tripDetails.trip_start_latitude),
                          Number(tripDetails.trip_start_longitude),
                        ]}
                        icon={LeafletIcons(untracked)}
                      >
                        <Popup>{tripDetails.trip_start_point}</Popup>
                      </Marker>
                      <Marker
                        eventHandlers={eventHandlerend}
                        // eventHandlers={{
                        //   click: (e) => {
                        //     eventHandlerend()
                        //     setflag(true)
                        //   },
                        // }}
                        ref={endRef}
                        // autoPan={true}
                        draggable={startEdit ? true : false}
                        position={[
                          Number(tripDetails.trip_end_latitude),
                          Number(tripDetails.trip_end_longitude),
                        ]}
                        icon={LeafletIcons(idle)}
                      >
                        <Popup>{tripDetails.trip_end_point}</Popup>
                      </Marker>

                      {Number(tripDetails?.trip_start_latitude) &&
                        Number(tripDetails?.trip_start_longitude) &&
                        Number(tripDetails?.trip_end_latitude) &&
                        Number(tripDetails?.trip_end_longitude) && (
                          <RoutingControladd
                            routeLine={[
                              [
                                Number(tripDetails?.trip_start_latitude),
                                Number(tripDetails?.trip_start_longitude),
                              ],
                              [
                                Number(tripDetails?.trip_end_latitude),
                                Number(tripDetails?.trip_end_longitude),
                              ],
                            ]}
                            setFlagData={setflag}
                            flagValue={flag}
                            componentId={componentId}
                            RemoveLayer={RemoveLayer}
                            subComponentId={subComponentId}
                          />
                        )}
                    </>
                  )}

                {componentId == "viewStop" &&
                  tripDetails?.pickup_point_latitude &&
                  tripDetails?.pickup_point_longitude && (
                    <>
                      {/* <Marker
                        eventHandlers={eventHandlerstart}
                        ref={startRef}
                        autoPan={true}
                        position={[
                          Number(tripDetails?.trip_start_latitude),
                          Number(tripDetails?.trip_start_longitude),
                        ]}
                        icon={LeafletIcons(untracked)}
                      >
                        <Popup>{tripDetails?.trip_start_point}</Popup>
                      </Marker>
                      <Marker
                        eventHandlers={eventHandlerend}
                        ref={endRef}
                        autoPan={true}
                        position={[
                          Number(tripDetails?.trip_end_latitude),
                          Number(tripDetails?.trip_end_longitude),
                        ]}
                        icon={LeafletIcons(idle)}
                      >
                        <Popup>{tripDetails?.trip_end_point}</Popup>
                      </Marker> */}

                      {/* <Marker
                        position={[
                          Number(stopDetails?.pickup_point_latitude),

                          Number(stopDetails?.pickup_point_longitude),
                        ]}
                        icon={LeafletIcons(stopIcon)}
                      >
                        <Popup>{stopDetails?.pickup_point_name}</Popup>
                      </Marker> */}
                    </>
                  )}
                {(componentId == "AddStop" || componentId == "viewStop") &&
                  // "viewStop"
                  stopDetails?.pickup_point_latitude &&
                  stopDetails?.pickup_point_longitude && (
                    <Marker
                      ref={markerRef}
                      eventHandlers={eventHandlers}
                      position={[
                        Number(stopDetails?.pickup_point_latitude),

                        Number(stopDetails?.pickup_point_longitude),
                      ]}
                      icon={LeafletIcons(stopIcon)}
                      draggable={editStop ? true : false}
                    >
                      <Popup>{stopDetails?.pickup_point_name}</Popup>
                    </Marker>
                  )}
                {componentId == "CustomerProfile" &&
                  customerSetting.customer_latitude && (
                    <Marker
                      position={[
                        Number(customerSetting.customer_latitude),
                        Number(customerSetting.customer_longitude),
                      ]}
                      icon={iconNewMarker}
                      draggable={editStop ? true : false}
                    >
                      <Popup>{customerSetting.customer_address}</Popup>
                    </Marker>
                  )}

                {componentId === "pointOfView" && (
                  <MarkerCluster
                    markers={markers}
                    addMarkers={addMarkers}
                    componentId={componentId}
                  />
                )}
                {/*  */}
                {/* //comman marker dragged */}

                {
                  // componentId == "VehicleGroup" ||
                  // componentId == "addVehicle" ||
                  (componentId == "parkingAdd" ||
                    componentId == "pointIntrestAdd" ||
                    componentId == "GeofanceAdd") && <MarkerDarggable />
                }
                {/* //comman marker*/}
                <MarkerComman
                  markerPosition={cardDetails}
                  componentIdMarker={componentId}
                />
                {componentId === "parkingView" && cardDetails.length > 0 && (
                  <SetBoundsParking cardDetails={cardDetails} />
                )}
                {componentId === "geofanceView" && cardDetails.length > 0 && (
                  <SetBoundsGeofance cardDetails={cardDetails} />
                )}
                {componentId === "pointOfView" && cardDetails.length > 0 && (
                  <SetBoundsPointOfIntrest cardDetails={cardDetails} />
                )}

                {/* show shape */}
                <ShowShapeMap
                  polylineData={stopDetails}
                  componentId={componentId}
                />
                {/* zoom function */}
                <FullscreenControl position="bottomright" />
                {/* center reset fuction */}
                {regionCord.length > 1 && regionCord[0] != null && (
                  <RecenterAutomatically
                    moveStop={moveStop}
                    center={center}
                    setAddStopOnclick={setAddStopOnclick}
                    newdatamap={regionCord}
                  />
                )}
                {centerDragged.length > 1 && (
                  <SetBoundsComman
                    bounds={centerDragged}
                    triggerMapBoundKeyRandom={triggerMapBoundKeyRandom}
                  />
                )}
                {(componentId == "transportation" ||
                  componentId == "dashBoard" ||
                  // componentId == "DispatchOrder" ||
                  componentId == "parkingAdd" ||
                  componentId == "pointIntrestAdd" ||
                  componentId == "GeofanceAdd" ||
                  componentId == "VehicleGroup") &&
                  ((mapLayer.length > 1 && (
                    <SetBoundTrasport
                      maplayer={mapLayer}
                      componentId={componentId}
                      keyMap={keyMap}
                    />
                  )) ||
                    (mapRectangle.length > 1 && (
                      <SetBoundTrasport
                        maplayer={mapRectangle}
                        componentId={componentId}
                        keyMap={keyMap}
                      />
                    )) ||
                    (circle.length > 1 && (
                      <SetBoundTrasportCercle
                        maplayer={circle}
                        radius={radiusDraw}
                        componentId={componentId}
                        keyMap={keyMap}
                      />
                    )))}

                <RecenterZoopAutomatic mapZoomValue={mapZoomValue} />
              </MapContainer>
            ) : (
              <NoDataComp />
            )}
          </div>
        ) : (
          <div className="map-main" key={componentId}>
            {regionCord[0] !== null &&
              regionCord[1] !== null &&
              regionCord[0] !== undefined &&
              regionCord[1] !== undefined &&
              regionCord[0] !== "" &&
              regionCord[1] !== "" &&
              regionCord.length > 1 ? (
              <MapContainer
                center={regionCord}
                zoom={mapZoomValue}
                scrollWheelZoom={true}
              >
                <TileLayer
                  // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
                // url="https://{s}.basemaps.cartocdn.com/r/klokantech-basic/{z}/{x}/{y}.png"
                // url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png"
                />
              </MapContainer>
            ) : (
              <NoDataComp />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;

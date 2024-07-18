import React, { useContext,  useRef, } from "react";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import { FeatureGroup } from "react-leaflet";
import { AppContext } from "../../context/AppContext";
import { useDispatch } from "react-redux";
import { tripGeoFenceChagnes } from "../../store/loginSlice";

const DrawShapes = ({ componentId }) => {
  const {
  setMapLayer,
 setMapRectangle,
setCircle,
 setRadius,
    setLayerTypeSend,
    setMapLatLngData,
    setErrMsgMap,
    setPositionCercle, setPositionRectangle, setPostionPolygon, setPostionRadius,
    setTriggerMapBoundKey,
  } = useContext(AppContext);


  const dispatch = useDispatch()
  let _editableFG = useRef(null);

  const _onFeatureGroupReady = (reactFGref) => {
    _editableFG.current = reactFGref;
  };
  const _onCreate = (e) => {
    const { layerType, layer } = e;

    setErrMsgMap("");
    setRadius("")
    if (componentId == "transportation") {
      setCircle([])
      setMapRectangle([])
      setMapLayer([])
      setRadius("")
    }

    if (componentId == "parkingAdd" || componentId == "GeofanceAdd" || componentId == "addVehicle" || componentId == "EditDispatchTrip") {
      setPositionCercle([])
      setPositionRectangle([])
      setPostionPolygon([])
      setPostionRadius([])
    }
    

    if (layerType === "polygon") {
      setRadius("");
      const { _leaflet_id } = layer;
      setMapLatLngData((layers) => layer.getLatLngs()[0]);
      setLayerTypeSend(layerType);
      setTriggerMapBoundKey(Math.floor(Math.random() * 10000000))
    }
    if (layerType === "rectangle") {
      const { _leaflet_id } = layer;
      setMapLatLngData((layers) => layer.getLatLngs()[0]);
      setLayerTypeSend(layerType);
      setTriggerMapBoundKey(Math.floor(Math.random() * 10000000))
      setRadius("");
    }
    if (layerType === "circle") {
      const { layerType, layer } = e;
      const circledata = e.layer && e.layer._latlng;
      const circleRedius = e.layer && layer._mRadius;
      setRadius(circleRedius);
      setMapLatLngData([circledata]);
      setTriggerMapBoundKey(Math.floor(Math.random() * 10000000))
      setLayerTypeSend(layerType);
    }

    
    dispatch(tripGeoFenceChagnes({ status: true }))

    let AppLayers = e.sourceTarget._layers;
    if (_editableFG.current) {
      let layerIds = Object.keys(AppLayers);
      layerIds.map((id) => {
        if (layer._leaflet_id != id) {
          let layer =
            _editableFG.current._layers &&
            _editableFG.current._layers[Number(id)];
          layer && layer.remove();
        }
      });
    }
  };

  const onEdited = (e) => {
    const { layers } = e;   
 
      // Object.values(layers._layers).forEach((layer) => {
      //   const newLatLngs = layer._latlngs[0].map((latlng) => [latlng.lat, latlng.lng]);
      //   setMapLatLngData(newLatLngs);
      // });

    
    // Object.values(layers._layers).forEach(layer => {
     
    //   console.log('Edited layer:', layer._latlngs);
    // });
  };

  const _onDeleted = () => {
    // setMapLatLngData(null)
  }

  // useEffect(() => {
  //   // Add the default polygon to the FeatureGroup with editable property set to true
  //   const defaultPolygon = L.polygon(mapLatLngData, { editable: true });
  //   defaultPolygon.addTo(_editableFG.current);
  // }, [mapLatLngData]);

  return (
    <div>
      <FeatureGroup
        ref={(reactFGref) => {
          _onFeatureGroupReady(reactFGref);
        }}
        // ref={(reactFGref) => _onFeatureGroupReady(reactFGref)}
      >
        <EditControl
          position="topright"
          onCreated={_onCreate}
          onEdited={onEdited}
          onDeleted={_onDeleted}

          draw={{
            polyline: false,
            polygon: true,
            circle: true,
            circlemarker: false,
            markers: false,
            marker: false,
          }}
          edit={{
            edit: false,    // Disable edit mode
            remove: false,  // Disable remove (delete) mode
          }}
          // edit={{ edit: true }}
        />
      </FeatureGroup>
    </div>
  );
};

export default DrawShapes;



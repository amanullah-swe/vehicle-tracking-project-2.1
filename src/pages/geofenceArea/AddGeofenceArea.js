import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Form from "react-bootstrap/Form";
import DDlogo from "../../assets/images/DDlogo.png";
import whiteTrash from "../../assets/images/whiteTrash.svg";
import whiteHand from "../../assets/images/whiteHand.svg";
import whiteBox from "../../assets/images/whiteBox.svg";
import whiteBin from "../../assets/images/whiteBin.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import MapComponent from "../../sharedComponent/MapComponent";
import { SearchFunction } from "../../sharedComponent/LeafletMap/SearchFunction";
import ApiConfig from "../../api/ApiConfig";
import { simpleGetCall, simplePostCall } from "../../api/ApiServices";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import { useTranslation } from "react-i18next";
import GoogleMapComponent from "../../sharedComponent/GoogleMap/GoogleMapComponent";
import green_box from "../../assets/images/green_box.svg";
import { Select } from "antd";
const { Option } = Select;
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const AreaSpeed = [
  { id: "30", area_speed_limit: "30" },
  { id: "45", area_speed_limit: "45" },
  { id: "60", area_speed_limit: "60" },
  { id: "60", area_speed_limit: "60" },
];

const AddGeofenceArea = () => {
  const {
    googleMap,
    sidebar,
    place,
    regionCord,

    setRegionCord,
    setPlace,
    mapLayer,
    setMapLayer,
    mapRectangle,
    setMapRectangle,
    circle,
    setCircle,
    radius,
    setRadius,
    layerTypeSend,
    mapLatLngData,
    draggedName,
    errMsgMap,
    setErrMsgMap,
    setMapZoomValue,
    setPositionCercle,
    positionRectangle,
    setPositionRectangle,
    setPostionRadius,
    setPostionPolygon,
    setLayerTypeSend,
    setMapLatLngData,
    positionCercle,
    getTransporatioData,
  } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const navigation = useNavigate();
  let paramID = useParams();
  const IdGeoFance = paramID.id;

  const [parentArea, setParentArea] = useState([]);
  const { t, i18n } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (mapLatLngData.length === 0) {
        setErrMsgMap(
          " you can use below tools to  draw at least onegeofence. "
        );
        return;
      } else {
        addGeofanceDataMapDetails(event);
      }
    }
    setValidated(true);
  };
  const [btnDesable, setBtnDesable] = useState(false);
  const [addGeofanceData, setAddGeofanceData] = useState({
    area_address: "",
    area_country: "",
    area_city: "",
    area_land_mark: "",
    area_parent: "",
    area_speed_limit: "",
    area_name: "",
  });

  useEffect(() => {
    if (draggedName) {
      setAddGeofanceData({
        area_address: draggedName?.display_name
          ? draggedName?.display_name
          : "",
        area_country: draggedName?.address.country
          ? draggedName?.address.country
          : "",
        area_city: draggedName?.address.state_district
          ? draggedName?.address.state_district
          : "",
        area_land_mark: draggedName?.address.county
          ? draggedName?.address.county
          : draggedName?.address.suburb || "",
      });
    }
  }, [draggedName]);

  const [loader, setLoader] = useState(false);
  const addGeofanceDataMapDetails = (e) => {
    e.preventDefault();
    setBtnDesable(true);
    setPostionPolygon([]);
    setPositionRectangle([]);
    setPositionCercle([]);
    setPostionRadius("");
    simplePostCall(
      IdGeoFance ? ApiConfig.GEOFANCE_AREA_UPDATE : ApiConfig.GEOFANCE_AREA_ADD,
      JSON.stringify({
        ...addGeofanceData,
        // area_name: place,
        drowradius: radius,
        drowtype: layerTypeSend,
        drowvalue: mapLatLngData,
        area_id: IdGeoFance,
      })
    )
      .then((res) => {
        setBtnDesable(false);
        if (res.result === true) {
          notifySuccess(res.message);
          navigation("/GeofenceAreas");
        } else {
          notifyError(res.message);
        }
      })

      .catch((error) => {
        console.log("api response", error);
      });
  };

  useEffect(() => {
    if (IdGeoFance) {
      GeofancesingleData();
    }
    GeofanceParentList();
    getTransporatioData();
  }, []);

  const GeofancesingleData = () => {
    simplePostCall(
      ApiConfig.GEOFANCE_AREA_SINGLE_EDIT,
      JSON.stringify({ area_id: IdGeoFance })
    )
      .then((res) => {
        if (res?.result === true) {
          let result = res?.area_details[0];
          setRegionCord([
            Number(result?.area_latitude ? result?.area_latitude : 28.25),
            Number(result?.area_longitude ? result?.area_longitude : 78.451),
          ]);
          // setPlace(result?.area_name);
          setAddGeofanceData({
            area_address: result?.area_address ? result?.area_address : "",
            area_country: result?.area_country ? result?.area_country : "",
            area_city: result?.area_city ? result?.area_city : "",
            area_land_mark: result?.area_land_mark
              ? result?.area_land_mark
              : ""
              ? result?.area_land_mark
              : "",
            area_parent: result?.area_parent ? result?.area_parent : "",
            area_speed_limit: result?.area_speed_limit
              ? result?.area_speed_limit
              : "",
            area_name: result?.area_name ? result?.area_name : "",
          });

          setMapZoomValue(7);
          if (result.type == "circle") {
            setPostionRadius(
              Number(result?.radius) ? Number(result?.radius) : null
            );

            setPositionCercle(result.drowvalue ? result.drowvalue : []);
            setRadius(Number(result?.radius) ? Number(result?.radius) : null);
          }

          if (result.type == "polygon") {
            setPostionPolygon(result.drowvalue);
          }
          if (result.type == "rectangle") {
            setPositionRectangle(result.drowvalue);
          }
          setLayerTypeSend(result.type);
          setMapLatLngData(result.drowvalue ? result.drowvalue : []);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  // GEOFANCE_AREA_PARENT_LIST

  const GeofanceParentList = () => {
    simpleGetCall(ApiConfig.GEOFANCE_AREA_PARENT_LIST)
      .then((res) => {
        if (res.result === true) {
          setParentArea(res?.data);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  const filtersetGeofanceArea = (id) => {
    const newData = parentArea.filter((ele) => {
      return ele.area_name == id;
    });
    if (
      newData[0]?.area_latitude !== null &&
      newData[0]?.area_longitude !== null
    ) {
      setRegionCord([
        Number(newData[0]?.area_latitude)
          ? Number(newData[0]?.area_latitude)
          : 19.13,
        Number(newData[0]?.area_longitude)
          ? Number(newData[0]?.area_longitude)
          : 77.25,
      ]);
      setMapZoomValue(8);
    }
  };
  return (
    <>
      <motion.div
        className={sidebar ? "taskMain " : "cx-active taskMain"}
        id="cx-main"
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
      >
        <div id="cx-wrapper" className="AddGeofenceArea">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="main-master-wrapper">
              <div className="Heading">
                <p>{IdGeoFance ? t("Edit Geofence") : t("Add Geofence")}</p>
              </div>
              <div className="innerInputsGen">
                <div className="row">
                  <div className="col-md-6 form_input_main ">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Parent Area")}
                      </Form.Label>
                      <div className="multi-select-1">
                        <Select
                          style={{ width: "100%", height: "40px" }}
                          as="select"
                          type="select"
                          name="Speed_limit"
                          onChange={(value) => {
                            setAddGeofanceData({
                              ...addGeofanceData,
                              area_parent: value,
                            });
                            filtersetGeofanceArea(value);
                          }}
                          value={addGeofanceData.area_parent}
                          className="custom-select"
                        >
                          <Option
                            value=""
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            Select Area...
                          </Option>
                          {parentArea.map((area, index) => {
                            return (
                              <Option
                                style={{ color: "rgba(156, 73, 0)" }}
                                value={area.area_name}
                                key={"parent" + index}
                              >
                                {area.area_name}
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                      <Form.Control.Feedback type="invalid">
                        Please Select Area
                      </Form.Control.Feedback>
                      {/* <SearchFunction /> */}
                    </div>
                  </div>
                  <div className="col-md-6 form_input_main ">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Geofence Areas")} <span>&#42;</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Geofence Areas...")}
                        onChange={(e) =>
                          setAddGeofanceData({
                            ...addGeofanceData,
                            area_name: e.target.value,
                          })
                        }
                        value={addGeofanceData?.area_name}
                      />
                      {/* <SearchFunction /> */}
                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter Geofence Areas")}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6 form_input_main ">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Address")} <span>&#42;</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Address")}
                        onChange={(e) =>
                          setAddGeofanceData({
                            ...addGeofanceData,
                            area_address: e.target.value,
                          })
                        }
                        value={addGeofanceData.area_address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter Geofence Address")}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6 form_input_main ">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Landmark")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("Enter Landmark ...")}
                        onChange={(e) =>
                          setAddGeofanceData({
                            ...addGeofanceData,
                            area_land_mark: e.target.value,
                          })
                        }
                        value={addGeofanceData.area_land_mark}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter Landmark")}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6 form_input_main ">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("City / State")} <span>&#42;</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter City / state.auth...")}
                        onChange={(e) =>
                          setAddGeofanceData({
                            ...addGeofanceData,
                            area_city: e.target.value,
                          })
                        }
                        value={addGeofanceData.area_city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter City / state.auth...")}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6 form_input_main ">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Country")}
                      </Form.Label>

                      <Form.Control
                        // required
                        type="text"
                        placeholder={t("Enter Country..")}
                        onChange={(e) =>
                          setAddGeofanceData({
                            ...addGeofanceData,
                            area_country: e.target.value,
                          })
                        }
                        value={
                          addGeofanceData.area_country
                            ? addGeofanceData.area_country
                            : ""
                        }
                      />
                      {/* <Form.Select
                        required
                        as="select"
                        type="select"
                        name="Speed_limit"
                        onChange={(e) =>
                          setAddGeofanceData({
                            ...addGeofanceData,
                            area_country: e.target.value,
                          })
                        }
                        value={
                          addGeofanceData.area_country
                            ? addGeofanceData.area_country
                            : ""
                        }
                      >
                        <option value="">Select Country...</option>

                        {CountryArea.map((area, index) => {
                          return (
                            <option
                              value={area.area_country}
                              key={"country" + index}
                            >
                              {area.area_country}
                            </option>
                          );
                        })}
                      </Form.Select> */}
                      <Form.Control.Feedback type="invalid">
                        {t("Please Select Country")}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6 form_input_main ">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Area Speed Limit")} <span>&#42;</span>
                      </Form.Label>
                      <div className="multi-select-1">
                        <Select
                          style={{ width: "100%", height: "40px" }}
                          required
                          as="select"
                          type="select"
                          name="Speed_limit"
                          onChange={(value) =>
                            setAddGeofanceData({
                              ...addGeofanceData,
                              area_speed_limit: value,
                            })
                          }
                          value={
                            addGeofanceData.area_speed_limit
                              ? addGeofanceData.area_speed_limit
                              : ""
                          }
                          className="custom-select"
                        >
                          <Option
                            value=""
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            Select Speed Limit...
                          </Option>
                          {AreaSpeed.map((area, index) => {
                            return (
                              <Option
                                style={{ color: "rgba(156, 73, 0)" }}
                                value={area.area_speed_limit}
                                key={"speed" + index}
                              >
                                {area?.area_speed_limit}
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                      <Form.Control.Feedback type="invalid">
                        {t("Please Select Speed Limit")}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-12 weekCounter mb-4">
                    <div className="addParkingMap">
                      {errMsgMap.length > 0 && (
                        <span className="text-danger">{errMsgMap}</span>
                      )}
                      {googleMap === "leaflet" && (
                        <MapComponent componentId={"GeofanceAdd"} />
                      )}
                      {googleMap === "googleMap" && <GoogleMapComponent />}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center btn-wrapper">
                  <div className="notific">
                    <img src={green_box} alt="" />
                    <label>{t("Transportation Coverage Area")}</label>
                  </div>
                  <div className="d-flex">
                    <button
                      type="button"
                      onClick={() => {
                        navigation("/GeofenceAreas");
                      }}
                      className="cx-btn-1"
                    >
                      {t("Cancel")}
                    </button>
                    <button className="cx-btn-2" disabled={btnDesable}>
                      {btnDesable && (
                        <div class="spinner-border cx-btn-load" role="status">
                          <span class="sr-only"> </span>
                        </div>
                      )}
                      {IdGeoFance ? `${t("Update")}` : `${t("Submit")}`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </motion.div>
    </>
  );
};

export default AddGeofenceArea;

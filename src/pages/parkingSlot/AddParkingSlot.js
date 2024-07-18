import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Form from "react-bootstrap/Form";
import DDlogo from "../../assets/images/DDlogo.png";
import whiteTrash from "../../assets/images/whiteTrash.svg";
import whiteHand from "../../assets/images/whiteHand.svg";
import whiteBox from "../../assets/images/whiteBox.svg";
import whiteBin from "../../assets/images/whiteBin.svg";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import MapComponent from "../../sharedComponent/MapComponent";
import { SearchFunction } from "../../sharedComponent/LeafletMap/SearchFunction";
import green_box from "../../assets/images/green_box.svg";
import {
  getWithAuthCall,
  getWithAuthCallWithErrorResponse,
  postWithAuthCall,
  simplePostCall,
} from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import { useTranslation } from "react-i18next";
import Multiselect from "multiselect-react-dropdown";

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const AddParkingSlot = () => {
  const { t, i18n } = useTranslation();

  const {
    googleMap,
    sidebar,
    place,
    draggedName,
    layerTypeSend,
    setLayerTypeSend,
    setPlace,
    mapLatLngData,
    setMapLatLngData,
    mapLayer,
    circle,
    radius,
    mapRectangle,
    setMapLayer,
    setMapRectangle,
    setCircle,
    setRadius,
    setRegionCord,
    setRadiusDraw,
    errMsgMap,
    setErrMsgMap,
    setMapZoomValue,
    setPostionPolygon,
    setPositionRectangle,
    setPositionCercle,
    setPostionRadius,
    getTransporatioData,
  } = useContext(AppContext);
  const [btnDesable, setBtnDesable] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  let paramID = useParams();
  const IdParkingSlotEidit = paramID.id;

  useEffect(() => {
    simplePostCall(
      ApiConfig.GET_VEHICLES_ALL_LIST,
      JSON.stringify({
        vehicle_type: "allvehicle",
      })
    ).then((data) => {
      setVehicles(data.data);
    });
  }, []);

  const handleSelect = (selected) => {
    setSelectedVehicles(selected);
  };
  const handleRemove = (selected) => {
    setSelectedVehicles(selected);
  };
  const handleSubmit = (event, section) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (mapLatLngData.length === 0) {
        setErrMsgMap(
          t("You can use below tools to  draw at least one geofence.")
        );
        return;
      } else {
        addParkingMapDetails(event);
      }
    }

    setValidated(true);
  };

  const [parkingData, setParkingData] = useState({
    slotCode: "",
    slotName: "",
    slotStatus: "active",
  });

  const addParkingMapDetails = (e) => {
    e.preventDefault();
    setBtnDesable(true);
    setPostionPolygon([]);
    setPositionRectangle([]);
    setPositionCercle([]);
    setPostionRadius("");
    simplePostCall(
      IdParkingSlotEidit
        ? ApiConfig.PARKING_SLOT_UPDATE
        : ApiConfig.PARKING_SLOT_ADD,
      JSON.stringify({
        ...parkingData,
        address: place,
        slot_id: IdParkingSlotEidit,
        drowradius: radius,
        drowtype: layerTypeSend,
        drowvalue: mapLatLngData,
        vehicles: selectedVehicles?.map((single) => {
          return single.vehicle_id;
        }),
      })
    )
      .then((res) => {
        setBtnDesable(false);
        if (res.result === true) {
          navigate("/ParkingSlot");
          //  " Parking Slot Added Successfully...!"
          notifySuccess(res.message);
        } else {
          notifyError(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  useEffect(() => {
    if (IdParkingSlotEidit) {
      getSingleLIstParkingSlot();
    }
    getTransporatioData();
  }, []);

  const getSingleLIstParkingSlot = () => {
    simplePostCall(
      ApiConfig.PARKING_SLOT_SINGLE_EDIT,
      JSON.stringify({ slot_id: IdParkingSlotEidit })
    )
      .then((res) => {
        setLayerTypeSend(res.type);
        setRegionCord([
          Number(res.parking_slot[0].slot_gps_latitude),
          Number(res.parking_slot[0].slot_gps_longitude),
        ]);

        if (res.type == "circle") {
          setPositionCercle(res.drowvalue ? res.drowvalue : []);
          setPostionRadius(res?.radius ? res?.radius : "");
          setRadius(res?.radius ? res?.radius : "");
          setMapLatLngData(res.drowvalue ? res.drowvalue : []);
        }

        if (res.type == "polygon") {
          setPostionPolygon(res.drowvalue);
          setMapLatLngData(res.drowvalue);
        }
        if (res.type == "rectangle") {
          setPositionRectangle(res.drowvalue);
          setMapLatLngData(res.drowvalue);
        }

        setParkingData({
          slotCode: res.parking_slot[0]?.slot_code,
          slotName: res.parking_slot[0]?.slot_name,
          slotStatus: res.parking_slot[0]?.slot_status,
          parking_capacity: res.parking_slot[0]?.parking_capacity,
          address: res.parking_slot[0]?.address,
        });

        setPlace(res.parking_slot[0]?.address);
        setSelectedVehicles(
          res.parking_slot[0]?.vehicle_info
            ? res.parking_slot[0]?.vehicle_info.map((single) => {
                return {
                  label:
                    // single?.vehicle_type_code +
                    "(registration_no=" + single.vehicle_reg_no + ")",
                  vehicle_id: single.vehicle_id,
                };
              })
            : []
        );
        //  handleSelect(res.parking_slot[0]?.vehicle_details.map((single)=>{return {label : single.vehicle_id,vehicle_id:single.vehicle_id}}))

        setMapZoomValue(10);
      })
      .catch((err) => {});
  };

  const handleCancle = () => {
    navigate("/ParkingSlot");
    setParkingData({
      slotCode: "",
      slotName: "",
      slotStatus: "",
    });
    setPlace("");
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div id="cx-wrapper" className="Add_Parking_Slot">
            <div className="main-master-wrapper">
              <div className="Heading">
                <p>
                  {IdParkingSlotEidit
                    ? `${t("Edit Parking Slot")}`
                    : `${t("Add Parking Slot")}`}
                </p>
              </div>
              <div className="innerInputsGen">
                <div className="row">
                  <div className="col-md-6 form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Station Code")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={parkingData.slotCode}
                        placeholder={t("Enter a Slot Code...")}
                        onChange={(e) =>
                          setParkingData({
                            ...parkingData,
                            slotCode: e.target.value,
                          })
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("Enter a Station Code")}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6 form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Station Name")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={parkingData.slotName}
                        placeholder={t("Enter Station Name...")}
                        onChange={(e) =>
                          setParkingData({
                            ...parkingData,
                            slotName: e.target.value,
                          })
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter Station Name")}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6 form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Parking Capacity")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        min="0"
                        value={parkingData.parking_capacity}
                        placeholder={t("Enter Parking Capacity...")}
                        onChange={(e) =>
                          setParkingData({
                            ...parkingData,
                            parking_capacity: e.target.value,
                          })
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter parking capacity")}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6 form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Address")}
                      </Form.Label>

                      <SearchFunction />

                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter Station Address")}
                      </Form.Control.Feedback>
                    </div>
                  </div>

                  {/* {!IdParkingSlotEidit && ( */}
                  <div className="col-md-6">
                    <div className="multi-select-1">
                      <Form.Label className="common-labels">
                        {t("Assign Vehicles")}
                      </Form.Label>
                      <Multiselect
                        selectedValues={selectedVehicles}
                        value={selectedVehicles}
                        onSelect={handleSelect}
                        onRemove={handleRemove}
                        options={vehicles?.map((single) => {
                          return {
                            label:
                              // single?.vehicle_type_code +
                              "(registration_no=" + single.vehicle_reg_no + ")",
                            vehicle_id: single.vehicle_id,
                          };
                        })}
                        displayValue="label"
                        className="w-full "
                        display="chip"
                        placeholder={t("Select Vehicles")}
                      />
                    </div>
                  </div>
                  {/* )} */}

                  <div className="col-md-12 weekCounter mb-4">
                    <label className="common-labels ">{t("Map")} </label>
                    <div className="addParkingMap">
                      {errMsgMap?.length > 0 && (
                        <span className="text-danger">{errMsgMap}</span>
                      )}
                      <MapComponent componentId={"parkingAdd"} />
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
                      className="cx-btn-1"
                      type="button"
                      onClick={handleCancle}
                    >
                      {t("Cancel")}
                    </button>
                    <button className="cx-btn-2" disabled={btnDesable}>
                      {btnDesable && (
                        <div class="spinner-border cx-btn-load" role="status">
                          <span class="sr-only"> </span>
                        </div>
                      )}
                      {IdParkingSlotEidit ? `${t("Update")}` : `${t("Submit")}`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </motion.div>
    </>
  );
};

export default AddParkingSlot;

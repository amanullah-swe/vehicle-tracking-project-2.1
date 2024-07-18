import React, { useContext, useState } from "react";
import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import add_trip from "../../assets/images/add_trip.svg";
import add_stop_active from "../../assets/images/add_stop_active.svg";
import add_stop_inactive from "../../assets/images/add_stop_inactive.svg";
import geofence_active from "../../assets/images/geofence_active.svg";
import geofence_inactive from "../../assets/images/geofence_inactive.svg";
import view_active from "../../assets/images/view_active.svg";
import view_inactive from "../../assets/images/view_inactive.svg";
import stops_icon from "../../assets/images/stops_icon.svg";
import { useLocation, useNavigate, useParams } from "react-router";
import Geofance from "../../assets/images/Geo-fance.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Rectangle from "../../assets/images/Rectangle.svg";
import plam from "../../assets/images/plam.svg";
import Gcustomer from "../../assets/images/comp_icon.svg";
import untracked from "../../assets/images/start_icon.svg";
import idle from "../../assets/images/end_icon.svg";
import car from "../../assets/images/Catagiry_yellow_car.svg";
import driver_img from "../../assets/images/Customer-profile.png";
import { Link } from "react-router-dom";
import error_icon from "../../assets/images/error_icon.svg";
import step1 from "../../assets/images/step1.svg";
import step2 from "../../assets/images/step2.svg";
import laststep from "../../assets/images/laststep.svg";
import { Dropdown } from "react-bootstrap";
import option from "../../assets/images/option-three-dot.svg";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Calendar from "../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { Space, TimePicker } from "antd";
import locale from "antd/lib/locale/ar_EG";
import Chart from "react-apexcharts";
import MapComponent from "../../sharedComponent/MapComponent";
import { simpleGetCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import stopIcon from "../../assets/images/Vehicle_Icon/Group 35095.svg";
import { useEffect } from "react";
import Loader from "../../sharedComponent/Loader";
import dayjs from "dayjs";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import StopsTable from "./StopsTable";
import close_icon from "../../assets/images/close_icon.svg";
import { SearchFunction } from "../../sharedComponent/LeafletMap/SearchFunction";
import CommonSelect from "../../sharedComponent/ReactSelect";
import moment from "moment";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { latestDate } from "../../sharedComponent/common";
import CommonDatePicker from "../../sharedComponent/CommonDatePicker";
import { Select } from "antd";
const { Option } = Select;

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const EditDispatchTrip = () => {
  const tripGeofenceChagned = useSelector(
    (state) => state.auth.tripGeofenceChagned
  );
  const { id } = useParams();
  const [idTrips, setidTrips] = useState("");
  const [tripDetails, setTripDetails] = useState({
    trip_end_date: new Date(),
    trip_date: new Date(),
    trip_vehicle_id: "",
    driver_id: "",
    trip_end_point: "",
    trip_start_point: "",
    trip_type: "",
    trip_name: "",
    trip_category: "",
    trip_repeat_days: [],
  });
  const percentage = 66;
  const needDominantBaselineFix = true;
  const [btnDesable, setBtnDesable] = useState(false);
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);
  const [form4, setForm4] = useState(false);
  const [form5, setForm5] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const navigate = useNavigate();
  const [driverList, setDriverList] = useState([]);
  const [assistant, setAssistant] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selDrv, setSelDrv] = useState(null);
  const [stopSelFrompoiList, setStopSelFrompoiList] = useState(null);
  const [stopData, setStopData] = useState({});
  const [selVeh, setSelVeh] = useState(null);
  const [poiList, setPoiList] = useState([]);
  const [stoplist, setStoplist] = useState([]);
  const [prioritychagned, setPrioritychagned] = useState(false);
  const { t, i18n } = useTranslation();
  const [state, setState] = useState({
    series: [
      {
        name: "series1",
        data: [0, 30, 50, 90, 60, 70, 30, 50],
      },
    ],
    options: {
      chart: {
        height: 440,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#FF7800"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "#8F430080",
          type: "vertical",
          shadeIntensity: 0.5,
          // gradientToColors: "#FF7800",
          opacityFrom: 0.8,
          opacityTo: 0.1,
          stops: [0, 90, 100],
          colorStops: [],
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["#8F430080"],
      },
      xaxis: {
        type: "time",
        categories: [
          "7 am",
          "9 am",
          "11 am",
          "1 pm",
          "3 pm",
          "5 pm",
          "7 pm",
          "9 pm",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });
  const {
    sidebar,
    setRegionCord,
    setLoading,
    loading,
    setLayerTypeSend,
    setPositionCercle,
    setPostionRadius,
    setPostionPolygon,
    radius,
    setPositionRectangle,
    layerTypeSend,
    mapLatLngData,
    setMapLatLngData,
    errMsgMap,
    setErrMsgMap,
  } = useContext(AppContext);

  useEffect(() => {
    if (poiList && stopSelFrompoiList) {
      let Data = poiList.filter(
        (poi) => poi.location_name == stopSelFrompoiList
      )[0];
      if (Data?.location_latitude && Data?.location_longitude) {
        setRegionCord([
          Number(Data.location_latitude),
          Number(Data.location_longitude),
        ]);
        setStopData(Data);
      }
    }
  }, [stopSelFrompoiList, poiList]);

  useEffect(() => {
    if (prioritychagned) {
      updateStopPriority();
      setPrioritychagned(false);
    }
  }, [prioritychagned]);

  const updateStopPriority = () => {
    let stops = stoplist.map((stop) => stop?.pickup_point_id);
    let body = JSON.stringify({ trip_id: id || idTrips, ids: stops });
    simplePostCall(ApiConfig.UPDATE_STOP_PRIORITY, body)
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        notifyError(err);
        console.log("err", err);
      })
      .finally(() => {});
  };
  const [errMsg, setErrMsg] = useState({
    trip_end_date: "",
    trip_date: "",
    trip_vehicle_id: "",
    driver_id: "",
    trip_end_point: "",
    trip_start_point: "",
    trip_category: "",
    trip_name: "",
    trip_repeat_days: [],
  });

  const newTripes = () => {
    setBtnDesable(true);
    simplePostCall(
      ApiConfig.ADD_TRIP,
      JSON.stringify({ ...tripDetails, trip_driver_id: tripDetails?.driver_id })
    )
      .then((res) => {
        setBtnDesable(false);
        if (res.result) {
          setidTrips(res?.data[0].trip_id);
          setTripDetails({
            ...tripDetails,
            trip_id: res?.data[0].trip_id,
            trip_end_date: latestDate(tripDetails?.trip_end_date, "yyyy-MM-dd"),
            trip_date: latestDate(tripDetails?.trip_date, "yyyy-MM-dd"),
          });
          setForm1(false);
          setForm2(true);
          setForm3(false);
          setForm4(false);
          setForm5(false);
        } else {
          notifyError(res.message);
        }
      })
      .catch((errr) => {
        console.log("err", errr);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handelNext = () => {
    // console.log({ ...tripDetails }, "layerTypeSend", layerTypeSend, "mapLatLngData", mapLatLngData)
    if (
      form1 == true &&
      form2 == false &&
      form3 == false &&
      form4 == false &&
      form5 == false
    ) {
      if (tripDetails?.trip_name?.length === 0) {
        setErrMsg({
          ...errMsg,
          trip_name: t("Enter Trip Name"),
        });
        return;
      }
      if (tripDetails?.trip_category.length === 0) {
        setErrMsg({
          ...errMsg,
          trip_category: t("Enter Trip Type"),
        });
        return;
      }
      if (tripDetails?.trip_start_point?.length === 0) {
        setErrMsg({
          ...errMsg,
          trip_start_point: t("Enter Trip Start Point"),
        });
        return;
      }
      if (tripDetails?.trip_end_point.length === 0) {
        setErrMsg({
          ...errMsg,
          trip_end_point: t("Enter Trip End Point"),
        });
        return;
      }
      if (
        tripDetails?.driver_id != null &&
        tripDetails?.driver_id.length == ""
      ) {
        setErrMsg({
          ...errMsg,
          driver_id: t("Enter Driver Name"),
        });
        return;
      }
      if (tripDetails?.trip_vehicle_id.length == "") {
        setErrMsg({
          ...errMsg,
          trip_vehicle_id: t("Enter Trip Vehicle Name"),
        });
        return;
      }
      if (tripDetails?.trip_date.length == "") {
        setErrMsg({
          ...errMsg,
          trip_date: t("Enter Trip Start Date"),
        });
        return;
      }
      if (tripDetails?.trip_end_date.length == "") {
        setErrMsg({
          ...errMsg,
          trip_end_date: t("Enter Trip End Date"),
        });
        return;
      }
      if (
        tripDetails?.trip_repeat_days?.length != null &&
        tripDetails?.trip_repeat_days?.length == 0
      ) {
        setErrMsg({
          ...errMsg,
          trip_repeat_days: t("Enter Trip Days"),
        });
        return;
      }
      if (!idTrips) {
        newTripes();
      } else {
        setForm1(false);
        setForm2(true);
        setForm3(false);
        setForm4(false);
        setForm5(false);
      }
    } else if (
      form1 == false &&
      form2 == true &&
      form3 == false &&
      form4 == false &&
      form5 == false
    ) {
      setForm1(false);
      setForm2(false);
      setForm3(true);
      setForm4(false);
      setForm5(false);
    } else if (
      form1 == false &&
      form2 == false &&
      form3 == true &&
      form4 == false &&
      form5 == false
    ) {
      if (mapLatLngData.length === 0) {
        setErrMsgMap(
          t("You can use below tools to  draw at least one geofence.")
        );
        return;
      } else {
        setForm1(false);
        setForm2(false);
        setForm3(false);
        setForm4(true);
        setForm5(false);
      }
    } else if (
      form1 == false &&
      form2 == false &&
      form3 == false &&
      form4 == true &&
      form5 == false
    ) {
      setForm1(false);
      setForm2(false);
      setForm3(false);
      setLoading(true);
      tripDetails.trip_driver_id = selDrv;
      tripDetails.trip_vehicle_id = selVeh;
      tripDetails.tripGeofenceChagned = tripGeofenceChagned;
      let Body;
      if (layerTypeSend === "circle") {
        Body = {
          drowradius: radius,
          drowtype: layerTypeSend,
          drowvalue: mapLatLngData,
        };
      } else {
        Body = {
          drowtype: layerTypeSend,
          drowvalue: mapLatLngData,
        };
      }

      simplePostCall(
        id || idTrips ? ApiConfig.UPDATE_TRIP : ApiConfig.ADD_TRIP,
        JSON.stringify({
          ...tripDetails,
          trip_driver_id: tripDetails?.driver_id,
        })
      )
        .then((res) => {
          if (res.result) {
            notifySuccess(res.message);
            // if(id){
            //   navigate("/ViewDispatchTrip/" + id )
            // }else{
            // navigate("/ViewDispatchTrip/" +res.trip_id)
            // }

            navigate("/TripManagement");
          } else {
            notifyError(res.message);
          }
        })
        .catch((errr) => {
          console.log("err", errr);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    // else if (form5 == true) {
    //   console.log("asdf");

    //   // navigate("/Vehicle");
    // }
  };
  const handelback = () => {
    if (
      form1 == true &&
      form2 == false &&
      form3 == false &&
      form4 == false &&
      form5 == false
    ) {
      navigate("/TripManagement");
    } else if (
      form1 == false &&
      form2 == true &&
      form3 == false &&
      form4 == false &&
      form5 == false
    ) {
      setForm1(true);
      setForm2(false);
      setForm3(false);
      setForm4(false);
      setForm5(false);
    } else if (
      form1 == false &&
      form2 == false &&
      form3 == true &&
      form4 == false &&
      form5 == false
    ) {
      setForm1(false);
      setForm2(true);
      setForm3(false);
      setForm4(false);
      setForm5(false);
    } else if (
      form1 == false &&
      form2 == false &&
      form3 == false &&
      form4 == true &&
      form5 == false
    ) {
      setForm1(false);
      setForm2(false);
      setForm3(true);
      setForm4(false);
      setForm5(false);
    } else if (
      form1 == false &&
      form2 == false &&
      form3 == false &&
      form4 == false &&
      form5 == true
    ) {
      setForm1(false);
      setForm2(false);
      setForm3(false);
      setForm4(true);
      setForm5(false);
    }
  };
  const [validated, setValidated] = useState(false);
  const [validated2, setValidated2] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    handelNext();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
    }
    setValidated2(true);
    setValidated(true);
  };
  useEffect(() => {
    if (id) {
      getTripDetails();
      stopsByTripId();
      setidTrips(id);
    }
    getAllDrivers();
    getAllVehicles();
    getAllPOInterest();
    getAssistantList();
  }, [id]);
  useEffect(() => {
    if (idTrips && !id) {
      stopsByTripId();
    }
  }, [idTrips]);

  const stopsByTripId = () => {
    simplePostCall(
      ApiConfig.GET_STOP_LIST_BY_ID,
      JSON.stringify({ pickup_point_trip_id: id || idTrips })
    )
      .then((res) => {
        if (res.result) {
          setStoplist(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getAllPOInterest = () => {
    simpleGetCall(ApiConfig.POINT_OF_INTEREST_LIST)
      .then((res) => {
        if (res.result) {
          setPoiList(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const getTripDetails = () => {
    setLoading(true);
    simpleGetCall(ApiConfig.GET_TRIP_DETAILS + id)
      .then((res) => {
        if (res.result) {
          setTripDetails({
            ...res.data,
            trip_end_date:
              res.data.trip_end_date != null &&
              new Date(res.data.trip_end_date),
            trip_date:
              res.data.trip_date != null && new Date(res.data.trip_date),
            // trip_repeat_days: [],
            // trip_type:"",
            driver_id: res.data.trip_driver_id,
            trip_driver_id: res.data.trip_driver_id,
            // trip_name:"",
            trip_vehicle_id: res.data.vehicle_details[0].vehicle_id,
            // trip_repeat_days: []
          });
          setSelDrv(res?.data?.driver_details[0].user_id);
          setSelVeh(res?.data?.vehicle_details[0]?.vehicle_id);
          if (res.data.trip_start_latitude && res.data.trip_start_longitude) {
            setRegionCord([
              Number(res.data.trip_start_latitude),
              Number(res.data.trip_start_longitude),
            ]);
          }
          let geofenceTrip = res.data.geofenceTrip;
          let type = geofenceTrip && geofenceTrip[0].geofence_draw_type;
          let pointData =
            geofenceTrip &&
            geofenceTrip
              .filter(
                (point) =>
                  point.geofence_draw_point &&
                  !point.geofence_draw_point.includes("undefined")
              )
              .map((item) =>
                item.geofence_draw_point
                  ?.split(",")
                  ?.map((item) => Number(item))
              );
          if (type) {
            setLayerTypeSend(type);
            setMapLatLngData(pointData);
            if (pointData.length) {
              if (type == "rectangle") {
                setPositionRectangle(pointData);
              } else if (type == "polygon") {
                setPostionPolygon(pointData);
              } else {
                setPositionCercle(pointData[0]);
                setPostionRadius(pointData[1]);
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getAllDrivers = () => {
    simpleGetCall(ApiConfig.GET_ALL_DRIVERS)
      .then((res) => {
        if (res.result) {
          setDriverList(res.data);
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAssistantList = () => {
    simplePostCall(
      ApiConfig.VEHICLE_DROWPDOWN,
      JSON.stringify({
        key: "assistantList",
      })
    )
      .then((res) => {
        setAssistant(res.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };
  const getAllVehicles = () => {
    simpleGetCall(ApiConfig.GET_ALL_VEHICLES)
      .then((res) => {
        if (res.result) {
          setVehicles(res.data);
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // if()
    if (layerTypeSend && mapLatLngData) {
      setLayerTypeSend(layerTypeSend);
      setMapLatLngData(mapLatLngData);
      if (mapLatLngData.length) {
        if (layerTypeSend == "rectangle") {
          setPositionRectangle(mapLatLngData);
        } else if (layerTypeSend == "polygon") {
          setPostionPolygon(mapLatLngData);
        } else {
          if (radius) {
            setPositionCercle(mapLatLngData[0]);
            setPostionRadius(radius);
          }
        }
      }

      setTripDetails({
        ...tripDetails,
        geofence_details: radius,
        geofence_draw_type: layerTypeSend,
        geofence_draw_point: mapLatLngData,
      });
    }
  }, [radius, layerTypeSend, mapLatLngData]);
  const handelAutoSelect = (id) => {
    let SelectedVehicle = vehicles?.filter(
      (ele, index) => ele.vehicle_id == id
    );
    setSelDrv(
      SelectedVehicle[0]?.vehicle_driver_id
        ? SelectedVehicle[0]?.vehicle_driver_id
        : ""
    );
    setSelVeh(id);
    setTripDetails({
      ...tripDetails,
      trip_vehicle_id: id,
      trip_helper_id: SelectedVehicle[0]?.vehicle_assistant_id
        ? SelectedVehicle[0]?.vehicle_assistant_id
        : "",
      driver_id: SelectedVehicle[0]?.vehicle_driver_id
        ? SelectedVehicle[0]?.vehicle_driver_id
        : "",
    });
  };
  return (
    <motion.div
      className={sidebar ? "taskMain " : "cx-active taskMain"}
      id="cx-main"
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}
    >
      <div id="cx-wrapper" className="edit_trip">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="main-master-wrapper addvhical-main form_input_main">
              <div className="addvhical-heading">
                <p>
                  {id
                    ? `${t("Edit Dispatch Trip")}`
                    : `${t("Add Dispatch Trip")}`}
                </p>
                {form4 == true ? (
                  <>
                    {/* <div className="dropdown-wrapper2 customer-option">
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                          <img src={option} alt="" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <Link to="/EditDispatchTrip">{t("Edit")}</Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link to="#" onClick={handleShow1}>
                              {t("Delete")}
                            </Link>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div> */}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="dispatch-trip-stepper">
                <div className="single-step active">
                  <img src={add_trip} alt="" />
                </div>
                {form2 == true || form3 == true || form4 == true ? (
                  <div className="single-step active">
                    <img src={add_stop_active} alt="" />
                  </div>
                ) : (
                  <div className="single-step">
                    <img src={add_stop_inactive} alt="" />
                  </div>
                )}
                {form3 == true || form4 == true ? (
                  <div className="single-step active">
                    <img src={geofence_active} alt="" />
                  </div>
                ) : (
                  <div className="single-step">
                    <img src={geofence_inactive} alt="" />
                  </div>
                )}
                {form4 == true ? (
                  <>
                    <div className="single-step active last-step-dropdown">
                      <img src={view_active} alt="" />
                    </div>
                  </>
                ) : (
                  <div className="single-step">
                    <img src={view_inactive} alt="" />
                  </div>
                )}
              </div>
              {form1 == true ? (
                <>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <div className="information-card row">
                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          {t("Trip Name")} <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          // required
                          type="text"
                          placeholder={t("Enter Trip Name")}
                          value={tripDetails?.trip_name}
                          onChange={(e) => {
                            setTripDetails({
                              ...tripDetails,
                              trip_name: e.target.value,
                            });
                            setErrMsg({ errMsg, trip_name: "" });
                          }}
                        />
                        {errMsg.trip_name?.length > 0 && (
                          <span className="text-danger">
                            {errMsg.trip_name}
                          </span>
                        )}
                        {/* <Form.Control.Feedback type="invalid">
                            Please Enter Trip Name.
                          </Form.Control.Feedback> */}
                      </div>
                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          {t("Trip Category")}{" "}
                          <span className="red-star">*</span>
                        </Form.Label>
                        <div className="multi-select-1">
                          <Select
                            style={{ width: "100%", height: "40px" }}
                            value={tripDetails.trip_category}
                            onChange={(value) => {
                              setTripDetails({
                                ...tripDetails,
                                trip_category: value,
                              });
                              setErrMsg({ errMsg, trip_category: "" });
                            }}
                            className="custom-select"
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                           {t("Select Trip Category")}   
                            </Option>
                            <Option
                              value="Scheduled"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                           {t("Scheduled")}   
                            </Option>
                            <Option
                              value="Instant"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                           {t("Instant")}   
                            </Option>
                            <Option
                              value="Dispatch"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                            {t("Dispatch")}  
                            </Option>
                          </Select>
                        </div>
                        {errMsg.trip_category?.length > 0 && (
                          <span className="text-danger">
                            {errMsg.trip_category}
                          </span>
                        )}
                      </div>
                      {tripDetails &&
                        tripDetails.trip_category === "Scheduled" && (
                          <div className="col-md-6 mb-4">
                            <Form.Label className="common-labels">
                              {t("Trip Type")}{" "}
                              <span className="red-star">*</span>
                            </Form.Label>
                            <div className="multi-select-1">
                              <Select
                                style={{ width: "100%", height: "40px" }}
                                value={tripDetails?.trip_type}
                                onChange={(value) => {
                                  setTripDetails({
                                    ...tripDetails,
                                    trip_type: value,
                                  });
                                }}
                                className="custom-select"
                              >
                                <Option value="">{t("Select trip type")} </Option>
                                <Option
                                  value="PickUp"
                                  style={{ color: "rgba(156, 73, 0)" }}
                                >
                               {t("PickUp")}   
                                </Option>
                                <Option
                                  value="Drop"
                                  style={{ color: "rgba(156, 73, 0)" }}
                                >
                                 {t("Drop")} 
                                </Option>
                              </Select>
                            </div>
                          </div>
                        )}
                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          {t("Trip Start Location")}{" "}
                          <span className="red-star">*</span>
                        </Form.Label>
                        <SearchFunction
                          setterKey="trip_start_point"
                          setter={setTripDetails}
                          data={tripDetails}
                          latKey={"trip_start_latitude"}
                          lngKey={"trip_start_longitude"}
                          valueSarch={tripDetails?.trip_start_point}
                          comp={"EditDispatchTrip"}
                          setErrMsg={setErrMsg}
                          errMsg={errMsg}
                        />
                        {errMsg.trip_start_point?.length > 0 && (
                          <span className="text-danger">
                            {errMsg.trip_start_point}
                          </span>
                        )}
                      </div> 
                      {console.log("taleeb_tripDetails?.trip_start_point : ", tripDetails?.trip_start_point)}
                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          {t("Trip End Location")}{" "}
                          <span className="red-star">*</span>
                        </Form.Label>
                        <SearchFunction
                          setterKey="trip_end_point"
                          setter={setTripDetails}
                          data={tripDetails}
                          latKey={"trip_end_latitude"}
                          lngKey={"trip_end_longitude"}
                          comp={"EditDispatchTrip"}
                          valueSarch={tripDetails?.trip_end_point}
                          setErrMsg={setErrMsg}
                          errMsg={errMsg}
                        />
                        {errMsg.trip_end_point?.length > 0 && (
                          <span className="text-danger">
                            {errMsg.trip_end_point}
                          </span>
                        )}

                        {/* <Form.Control
                            required
                            type="text"
                            disabled
                            placeholder="Enter Trip End Location"
                            value={tripDetails.trip_end_point}
                            onChange={(e) => { setTripDetails({ ...tripDetails, trip_end_point: e.target.value }) }}
                          /> */}
                        {/* <Form.Control.Feedback type="invalid">
                            Please Enter Trip End Location.
                          </Form.Control.Feedback> */}
                      </div>
                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          {t("Vehicle")}
                        </Form.Label>
                        <div className="multi-select-1">
                          <Select
                            style={{ width: "100%", height: "40px" }}
                            required
                            value={tripDetails?.trip_vehicle_id}
                            onChange={(value) => {
                              setTripDetails({
                                ...tripDetails,
                                trip_vehicle_id: value,
                              });
                              setSelVeh(value);

                              handelAutoSelect(value);
                              setErrMsg({ errMsg, trip_vehicle_id: "" });
                            }}
                            className="custom-select"
                            showSearch
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                            {t("Select Vehicle...")}  
                            </Option>
                            {vehicles?.map((vehicle, index) => (
                              <Option
                                key={"vehicle" + vehicle.vehicle_id}
                                value={vehicle.vehicle_id}
                                style={{ color: "rgba(156, 73, 0)" }}
                              >
                                {vehicle.vehicle_number}
                              </Option>
                            ))}
                          </Select>
                        </div>
                        {errMsg.trip_vehicle_id?.length > 0 && (
                          <span className="text-danger">
                            {errMsg.trip_vehicle_id}
                          </span>
                        )}
                      </div>
                      {/* <div className="col-md-6 mb-4">
                          <Form.Label className="common-labels">
                            Trip Start Time <span className="red-star">*</span>
                          </Form.Label>
                          <Space>
                            <TimePicker
                              className="form-control carretClass"
                              placeholder=" Trip Start Time "
                              size="large"
                              value={tripDetails.trip_start_time ? dayjs(tripDetails.trip_start_time, 'HH:mm:ss') : dayjs(new Date())}
                              onChange={(e) => {
                                console.log("e", e);
                                if (e) {
                                  let time = e.hour() + ":" + e.minute() + ":" + e.second()
                                  setTripDetails({ ...tripDetails, trip_start_time: time })
                                }

                              }}
                            />
                          </Space>
                          <Form.Control.Feedback type="invalid">
                            Please Enter Start Time.
                          </Form.Control.Feedback>
                        </div> */}
                      {/* <div className="col-md-6 mb-4">
                          <Form.Label className="common-labels">
                            Trip End Time <span className="red-star">*</span>
                          </Form.Label>
                          <Space>
                            <TimePicker
                              className="form-control carretClass"
                              placeholder=" Trip End Time "
                              size="large"
                              value={tripDetails.trip_end_time ? dayjs(tripDetails.trip_end_time, 'HH:mm:ss') : dayjs(new Date())}
                              onChange={(e) => {
                                if (e) {
                                  let time = e.hour() + ":" + e.minute() + ":" + e.second()
                                  setTripDetails({ ...tripDetails, trip_end_time: time })
                                }
                              }}
                            />
                          </Space>
                          <Form.Control.Feedback type="invalid">
                            Please Enter End Time.
                          </Form.Control.Feedback>
                        </div> */}
                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          {t("Driver Name")}
                        </Form.Label>
                        {errMsg.driver_id?.length > 0 && (
                          <span className="text-danger">
                            {errMsg.driver_id}
                          </span>
                        )}
                        <div className="multi-select-1">
                          <Select
                            style={{ width: "100%", height: "40px" }}
                            value={tripDetails?.driver_id}
                            onChange={(value) => {
                              setSelDrv(value);
                              setTripDetails({
                                ...tripDetails,
                                driver_id: value,
                              });
                              setErrMsg({ errMsg, driver_id: "" });
                            }}
                            className="custom-select"
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              Select Driver Name
                            </Option>
                            {driverList.map((driver) => (
                              <Option
                                key={"driver" + driver.driver_id}
                                value={driver.driver_id}
                                style={{ color: "rgba(156, 73, 0)" }}
                              >
                                {driver.driver_name}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          {t("Vehicle Assistant Name")}
                        </Form.Label>
                        <div className="multi-select-1">
                          <Select
                            required
                            style={{ width: "100%", height: "40px" }}
                            value={tripDetails.trip_helper_id}
                            placeholder={t("Select...")}
                            onChange={(value) => {
                              setTripDetails({
                                ...tripDetails,
                                trip_helper_id: value,
                              });
                            }}
                            className="custom-select"
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                          {t("Select Vehicle assistant Name")}    
                            </Option>
                            {assistant &&
                              assistant?.map((ele) => {
                                return (
                                  <Option
                                    style={{ color: "rgba(156, 73, 0)" }}
                                    key={"driver" + ele.user_id}
                                    value={ele?.user_id}
                                  >
                                    {ele?.user_name}
                                  </Option>
                                );
                              })}
                          </Select>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          {t("Trip Start Date")}{" "}
                          <span className="red-star">*</span>
                        </Form.Label>
                        <div className="innerSelectBox weekCounter datepicker-main">
                          {/* <DatePicker
                              selected={tripDetails?.trip_date}
                              onChange={(date) =>{ 
                                setTripDetails({ ...tripDetails, trip_date: date })
                                setErrMsg({errMsg,
                                  trip_date:""
                                })
                              }}
                              className="form-control"
                            /> */}

                          <CommonDatePicker
                            dateKey="trip_date"
                            setDate={setTripDetails}
                            data={tripDetails}
                            // minDate={new Date()}
                          />
                          {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                        </div>
                        {errMsg.trip_date?.length > 0 && (
                          <span className="text-danger">
                            {errMsg.trip_date}
                          </span>
                        )}
                      </div>

                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          {t("Trip End Date")}{" "}
                          <span className="red-star">*</span>
                        </Form.Label>
                        <div className="innerSelectBox weekCounter datepicker-main">
                          {/* <DatePicker
                              selected={tripDetails?.trip_end_date }
                              onChange={(date) =>{ setTripDetails({ ...tripDetails, trip_end_date: date })
                              setErrMsg({errMsg,
                                trip_end_date:""
                              })
                            }}
                              minDate={tripDetails?.trip_date}
                              className="form-control"
                            /> */}

                          <CommonDatePicker
                            dateKey="trip_end_date"
                            setDate={setTripDetails}
                            data={tripDetails}
                            minDate={tripDetails?.trip_date}
                          />
                          {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                        </div>
                        {errMsg.trip_end_date?.length > 0 && (
                          <span className="text-danger">
                            {errMsg.trip_end_date}
                          </span>
                        )}
                      </div>
                      {[...new Array(7)].map((repeatDay, index) => {
                        let day =
                          index == 0
                            ? `${t("Monday")}`
                            : index == 1
                            ? `${t("Tuesday")}`
                            : index == 2
                            ? `${t("Wednesday")}`
                            : index == 3
                            ? `${t("Thursday")}`
                            : index == 4
                            ? `${t("Friday")}`
                            : index == 5
                            ? `${t("Saturday")}`
                            : `${t("Sunday")}`;
                        let days = tripDetails.trip_repeat_days;
                        let item = days?.length
                          ? days?.filter(
                              (item) => item?.trip_repeat_day == day
                            )[0]
                          : null;
                        return (
                          <div className="col-md-6 mb-4" key={day + index}>
                            <Form.Label className="weekLabels">
                              <div className="form-check form-switch trip-switch">
                                <div className="d-flex">
                                  <label className="form-check-label" for={day}>
                                    {day.charAt(0).toUpperCase() + day.slice(1)}
                                  </label>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={day}
                                    onChange={(e) => {
                                      setErrMsg({
                                        errMsg,
                                        trip_repeat_days: "",
                                      });
                                      if (item) {
                                        setTripDetails({
                                          ...tripDetails,
                                          trip_repeat_days:
                                            tripDetails.trip_repeat_days.map(
                                              (inner) => {
                                                return inner.trip_repeat_day ==
                                                  day
                                                  ? {
                                                      ...inner,
                                                      trip_repeat_status: e
                                                        .target.checked
                                                        ? t("active")
                                                        : t("inactive"),
                                                    }
                                                  : inner;
                                              }
                                            ),
                                        });
                                      } else {
                                        setTripDetails({
                                          ...tripDetails,
                                          trip_repeat_days: [
                                            ...tripDetails.trip_repeat_days,
                                            {
                                              trip_repeat_day: day,
                                              trip_repeat_status: e.target
                                                .checked
                                                ? t("active")
                                                : t("inactive"),
                                            },
                                          ],
                                        });
                                      }
                                    }}
                                    checked={
                                      item &&
                                      item.trip_repeat_status == "active"
                                        ? true
                                        : false
                                    }
                                  />
                                  {errMsg.trip_repeat_days?.length > 0 && (
                                    <span className="text-danger">
                                      {errMsg.trip_repeat_days}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Form.Label>
                            <div className="d-flex">
                              <Space className="col-md-6 mr-1">
                                <TimePicker
                                  className="form-control carretClass"
                                  placeholder={t("Select Start Time...")}
                                  size="large"
                                  onChange={(e) => {
                                    if (e) {
                                      let time =
                                        e.hour() +
                                        ":" +
                                        e.minute() +
                                        ":" +
                                        e.second();
                                      if (item) {
                                        setTripDetails({
                                          ...tripDetails,
                                          trip_repeat_days:
                                            tripDetails.trip_repeat_days.map(
                                              (inner) => {
                                                return inner.trip_repeat_day ==
                                                  day
                                                  ? {
                                                      ...inner,
                                                      trip_repeat_status:
                                                        t("active"),
                                                      trip_repeat_start_time:
                                                        time,
                                                    }
                                                  : inner;
                                              }
                                            ),
                                        });
                                      } else {
                                        setTripDetails({
                                          ...tripDetails,
                                          trip_repeat_days: [
                                            ...tripDetails.trip_repeat_days,
                                            {
                                              trip_repeat_day: day,
                                              trip_repeat_status: t("active"),
                                              trip_repeat_start_time: time,
                                            },
                                          ],
                                        });
                                      }
                                    }
                                  }}
                                  defaultValue={
                                    item && item.trip_repeat_start_time
                                      ? dayjs(
                                          item?.trip_repeat_start_time,
                                          "HH:mm:ss"
                                        )
                                      : ""
                                  }
                                  locale={locale} // Set the locale to Arabic
                                />
                              </Space>
                              <Space className="col-md-6 mr-1">
                                <TimePicker
                                  className="form-control carretClass"
                                  placeholder={t("Select End Time...")}
                                  size="large"
                                  locale={{
                                    // Override Ant Design's default locale
                                    ok: t("antd.time-picker.ok"), // Arabic translation for "OK"
                                    now: t("antd.time-picker.now"), // Arabic translation for "Now"
                                  }}
                                  onChange={(e) => {
                                    if (e) {
                                      let time =
                                        e.hour() +
                                        ":" +
                                        e.minute() +
                                        ":" +
                                        e.second();
                                      if (item) {
                                        setTripDetails({
                                          ...tripDetails,
                                          trip_repeat_days:
                                            tripDetails.trip_repeat_days.map(
                                              (inner) => {
                                                return inner.trip_repeat_day ==
                                                  day
                                                  ? {
                                                      ...inner,
                                                      trip_repeat_status:
                                                        "active",
                                                      trip_repeat_end_time:
                                                        time,
                                                    }
                                                  : inner;
                                              }
                                            ),
                                        });
                                      } else {
                                        setTripDetails({
                                          ...tripDetails,
                                          trip_repeat_days: [
                                            ...tripDetails.trip_repeat_days,
                                            {
                                              trip_repeat_day: day,
                                              trip_repeat_status: "active",
                                              trip_repeat_end_time: time,
                                            },
                                          ],
                                        });
                                      }
                                    }
                                  }}
                                  defaultValue={
                                    item && item.trip_repeat_end_time
                                      ? dayjs(
                                          item.trip_repeat_end_time,
                                          "HH:mm:ss"
                                        )
                                      : ""
                                  }
                                  // locale={locale} // Set the locale to Arabic
                                />
                              </Space>
                            </div>
                          </div>
                        );
                      })}
                      <div className="col-md-12">
                        <div className="transportMap trip-map">
                          <div className="innerMap">
                            <MapComponent
                              stopSelFrompoiList={stopSelFrompoiList}
                              startEdit={true}
                              drawshape={true}
                              control={true}
                              tripDetails={tripDetails}
                              componentId={"EditDispatchTrip"}
                              subComponentId={"EditDispatchTripOne"}
                              setTripDetails={setTripDetails}
                              stoplist={stoplist}
                              setStoplist={setStoplist}
                              stopsByTripId={stopsByTripId}
                              stopData={stopData}
                              setStopData={setStopData}
                              RemoveLayer={true}
                            />
                          </div>
                          <div className="belowContent">
                            <div className="notific">
                              <img src={Gcustomer} alt="" />
                              <label>{t("Company")}</label>
                            </div>
                            <div className="notific">
                              <img src={untracked} alt="" />
                              <label>{t("Start Point")}</label>
                            </div>
                            <div className="notific">
                              <img src={idle} alt="" />
                              <label>{t("End Point")}</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="btn-common">
                      <button className="cx-btn-1" onClick={handelback}>
                        {t("Cancel")}
                      </button>

                      {btnDesable ? (
                        <button className="cx-btn-1">
                          {" "}
                          {t("Continue")}{" "}
                          <div class="spinner-border cx-btn-load" role="status">
                            <span class="sr-only"> </span>
                          </div>{" "}
                        </button>
                      ) : (
                        <button
                          className="cx-btn-2"
                          type={!id ? "submit" : "button"}
                          onClick={() => id && handelNext()}
                        >
                          {t("Continue")}
                        </button>
                      )}
                    </div>
                  </Form>
                </>
              ) : (
                ""
              )}
              {form2 == true ? (
                <>
                  <Form
                    noValidate
                    validated={validated2}
                    onSubmit={handleSubmit}
                  >
                    <div className="information-card row">
                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          {t("Stop Name")} <span className="red-star">*</span>
                        </Form.Label>
                        <CommonSelect
                          single={true}
                          setterFucntions={setStopSelFrompoiList}
                          data={tripDetails}
                          placehold={t("Select")}
                          optionList={poiList?.map((poi) => {
                            return {
                              id: poi?.location_name,
                              label: poi?.location_name,
                            };
                          })}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          {t("Search Stop")}
                        </Form.Label>
                        <SearchFunction
                          comp="stops"
                          setStopData={setStopData}
                        />
                      </div>
                      <div className="col-md-12">
                        <div className="transportMap trip-map">
                          <div className="innerMap">
                            <MapComponent
                              tripDetails={tripDetails}
                              componentId={"EditDispatchTrip"}
                              setTripDetails={setTripDetails}
                              stoplist={stoplist}
                              setStoplist={setStoplist}
                              moveStop={true}
                              stopsByTripId={stopsByTripId}
                              stopData={stopData}
                              setStopData={setStopData}
                              RemoveLayer={false}
                              subComponentId={"EditDispatchTripTwo"}
                            />
                          </div>

                          <div className="belowContent">
                            <div className="notific">
                              <img src={Gcustomer} alt="" />
                              <label>{t("Company")}</label>
                            </div>
                            <div className="notific">
                              <img src={untracked} alt="" />
                              <label>{t("Start Point")}</label>
                            </div>
                            <div className="notific">
                              <img src={idle} alt="" />
                              <label>{t("End Point")}</label>
                            </div>
                            <div className="notific">
                              <img
                                src={stopIcon}
                                alt=""
                                style={{ width: "20px", height: "20px" }}
                              />
                              <label>{t("Stop Point")}</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <StopsTable
                        stoplist={stoplist}
                        setStoplist={setStoplist}
                        setPrioritychagne={setPrioritychagned}
                      />
                    </div>
                    <div className="btn-common">
                      <button className="cx-btn-1" onClick={handelback}>
                        {t("Cancel")}
                      </button>
                      <button
                        className="cx-btn-2"
                        type="submit"
                        onClick={() => id && handelNext()}
                      >
                        {t("Continue")}
                      </button>
                    </div>
                  </Form>
                </>
              ) : (
                ""
              )}
              {form3 == true ? (
                <>
                  <div className="addnew-map">
                    <div className="map-head">
                      <p>{t("Set Route Geofencing Borders")}</p>
                      {errMsgMap?.length > 0 && (
                        <span className="text-danger">{errMsgMap}</span>
                      )}

                      {/* <div className="">
                          <img src={Geofance} alt="" className="c-pointer" />
                          <img src={Rectangle} alt="" className="c-pointer" />
                          <img src={plam} alt="" className="c-pointer" />
                        </div> */}
                    </div>
                    <div className="road-map">
                      <MapComponent
                        tripDetails={tripDetails}
                        componentId={"EditDispatchTrip"}
                        setTripDetails={setTripDetails}
                        drawshape={true}
                        RemoveLayer={false}
                        subComponentId={"EditDispatchTripThree"}
                      />
                    </div>
                  </div>
                  <div className="btn-common">
                    <button className="cx-btn-1" onClick={handelback}>
                      {t("Cancel")}
                    </button>
                    <button className="cx-btn-2" onClick={handelNext}>
                      {t("Continue")}
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
              {form4 == true ? (
                <>
                  <div className="main-wrapper form_input_main">
                    <div className="mainTripDetails">
                      <p>{t("Trip Details")}</p>
                      <div className="trip-details-inner border-common">
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="">{t("Trip Vehicle Id")}</label>
                            <p className="innerPara">
                              {tripDetails && tripDetails.trip_vehicle_id}
                            </p>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="">{t("Trip Category")}</label>
                            <p className="innerPara">
                              {tripDetails && tripDetails?.trip_category}
                            </p>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="">{t("Trip Type")}</label>
                            <p className="innerPara">
                              {tripDetails && tripDetails?.trip_type}
                            </p>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="">{t("Trip Start Point")}</label>
                            <p className="innerPara">
                              {tripDetails && tripDetails?.trip_start_point}
                            </p>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="">{t("Trip End Point")}</label>
                            <p className="innerPara">
                              {tripDetails && tripDetails?.trip_end_point}
                            </p>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="">{t("Trip Driver Id")}</label>
                            <p className="innerPara">
                              {tripDetails && tripDetails?.driver_id}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="main-wrapper form_input_main">
                    <div className="trip-details-wrapper">
                      <p>{t("Trip Days Details")}</p>
                    </div>
                    <div className="trip-table-wrapper">
                      <table className="holiday-table">
                        <thead className="ht-head">
                          <tr>
                            <td>{t("Sr.No")}.</td>
                            {/* <td>Trip Date</td> */}
                            <td>{t("Trip Days")}</td>
                            <td>{t("Trip Day Start Time")}</td>
                            <td>{t("Trip Day End Time")}</td>
                          </tr>
                        </thead>
                        <tbody className="ht-body">
                          {tripDetails.trip_repeat_days &&
                            tripDetails.trip_repeat_days?.map((day, index) => {
                              return (
                                <tr
                                  className="table-row-custom"
                                  key={"tripDay" + index}
                                >
                                  <td>{index + 1}</td>
                                  {/* <td>{moment(tripDetails.trip_date).format()}</td> */}
                                  <td>{day?.trip_repeat_day}</td>
                                  <td>{day?.trip_repeat_start_time}</td>
                                  <td>{day?.trip_repeat_end_time}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="transportMap trip-map">
                    <div className="innerMap">
                      <MapComponent
                        subComponentId={"EditDispatchTripFour"}
                        RemoveLayer={false}
                        tripDetails={tripDetails}
                        componentId={"EditDispatchTrip"}
                        setTripDetails={setTripDetails}
                        stoplist={stoplist}
                        setStoplist={setStoplist}
                        stopsByTripId={stopsByTripId}
                        stopData={stopData}
                        showShape={true}
                      />
                    </div>
                    <div className="belowContent">
                      <div className="notific">
                        <img src={Gcustomer} alt="" />
                        <label>{t("Company")}</label>
                      </div>
                      <div className="notific">
                        <img src={untracked} alt="" />
                        <label>{t("Start Point")}</label>
                      </div>
                      <div className="notific">
                        <img src={idle} alt="" />
                        <label>{t("End Point")}</label>
                      </div>
                    </div>
                  </div>
                  <div className="btn-common">
                    <button className="cx-btn-1" onClick={handelback}>
                      {t("Cancel")}
                    </button>
                    <button className="cx-btn-2" onClick={handelNext}>
                      {id ? `${t("Update")}` : `${t("Add")}`}
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </>
        )}

        <Modal
          show={show}
          onHide={handleClose}
          centered
          className="common-model"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("Delete Stop")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {t("Are you sure you want to delete this Stop")} ?
          </Modal.Body>
          <Modal.Footer className="pop-up-modal-footer btn-wrapper">
            <button className="cx-btn-1" onClick={handleClose}>
              {t("Close")}
            </button>
            <button className="cx-btn-2" onClick={handleClose}>
              {t("Yes")}
            </button>
          </Modal.Footer>
        </Modal>

        {/* Delete Trip Modal Start */}

        <Modal
          show={show1}
          onHide={handleClose1}
          centered
          className="common-model"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("Delete Trip")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {t("Are you sure you want to delete this Trip")} ?
          </Modal.Body>
          <Modal.Footer className="pop-up-modal-footer btn-wrapper">
            <button className="cx-btn-1" onClick={handleClose1}>
              {t("Close")}
            </button>
            <button className="cx-btn-2" onClick={handleClose1}>
              {t("Yes")}
            </button>
          </Modal.Footer>
        </Modal>

        {/* Delete Trip Modal End */}
      </div>
    </motion.div>
  );
};

export default EditDispatchTrip;

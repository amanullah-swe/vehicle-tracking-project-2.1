import { React, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import ShareImp from "../../../assets/images/whiteTrash.svg";
import Box from "../../../assets/images/whiteBox.svg";
import hand from "../../../assets/images/whiteHand.svg";
import Bin from "../../../assets/images/whiteBin.svg";
import Red from "../../../assets/images/redHotspot.svg";
import popimg from "../../../assets/images/pop-img.png";
import Yellow from "../../../assets/images/yellowHotspot.svg";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import DatePlus from "../../../assets/images/Group 33597.svg";
import { motion } from "framer-motion";
import { Space, TimePicker } from "antd";
import { Modal, Tooltip } from "react-bootstrap";
import MapComponent from "../../../sharedComponent/MapComponent";
import { useTranslation } from "react-i18next";
import { simplePostCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { useEffect } from "react";
import CommonSelect from "../../../sharedComponent/ReactSelect";
import dayjs from "dayjs";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import redMapIcon from "../../../assets/images/redHotspot.svg";
import yellowMapIcon from "../../../assets/images/yellowHotspot.svg";
import Select from "react-select";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const ManualRouting = () => {
  const {
    sidebar,
    setSidebar,
    Dark,
    setDark,
    mapLatLngData,
    setMapLatLngData,
    layerTypeSend,
    triggerMapBoundKey,
    getTransporatioData,
    radius,
    timeZone,
    setDispatchStatus,
  } = useContext(AppContext);
  const customStyles = {
    control: (base) => ({
      ...base,
      color: "#f6efe9",
      fontSize: 14,
      borderRadius: 10,
      border: "1px solid #f6efe9",
      backgroundColor: "white",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #f6efe9",
      },
      // This line disable the blue border
      boxShadow: "none",
    }),
  };
  const [startDate, setStartDate] = useState(new Date());

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [btnDesable, setBtnDesable] = useState(false);
  const [manualRouteMark, setManualRouteMark] = useState([]);
  const [routingData, setRoutingData] = useState({
    trip_end_time: "",
    trip_start_time: dayjs(new Date()).format("HH:mm:ss"),
    vehicle_id: "",
  });
  const [vehicleList, setVehicleList] = useState([]);
  const [errMsg, setErrMsg] = useState({
    trip_end_time: "",
    trip_start_time: "",
    vehicle_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const selectedVehicles = selectedId.map((id) => ({ vehicle_id: id }));
  const [state, setState] = useState({
    topics: [],
    selectedTopics: [],
  });
  const [gradeState, setGradeState] = useState({
    grades: [],
  });
  function onTopicChange(selectedOption) {
    var selected_topics = [];

    if (selectedOption.length > 0) {
      selectedOption.map((topic, index) => {
        selected_topics.push(topic.value);
      });
    }

    setState({
      ...state,
      topics: selected_topics,
      selectedTopics: selectedOption,
    });
  }

  useEffect(() => {
    var choiceArry = [];

    state.selectedTopics.map((valuedata, index) => {
      choiceArry.push(valuedata.value);
    });
    setSelectedId(choiceArry);
  }, [state.selectedTopics]);

  const renderTooltipForPoligon = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("Draw Polygon")}
    </Tooltip>
  );
  const renderTooltipForRectangle = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("Draw Rectangle")}
    </Tooltip>
  );
  const renderTooltipForPalm = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("Move")}
    </Tooltip>
  );
  const renderTooltipForDelet = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("Delete")}
    </Tooltip>
  );

  const getManualRoute = () => {
    setLoading(true);
    simplePostCall(ApiConfig.MANUAL_ROUTE_LIST)
      .then((res) => {
        if (res.result) {
          setManualRouteMark(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getVehicleList = () => {
    setLoading(true);
    simplePostCall(
      ApiConfig.MANUAL_VEHICLE_LIST,
      JSON.stringify({ timeZone: timeZone })
    )
      .then((res) => {
        setVehicleList(res?.data);
        let vehicles = res?.data;
        var grades = [];
        vehicles.map((grade, index) => {
          grades.push({
            label: grade.vehicle_number,
            value: grade.vehicle_id,
          });
        });
        setGradeState({ ...gradeState, grades: grades });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getVehicleListMAP();
    setRoutingData({
      trip_end_time: "",
      trip_start_time: dayjs(new Date()).format("HH:mm:ss"),
      vehicle_id: "",
    });
  }, [triggerMapBoundKey]);

  const getVehicleListMAP = () => {
    setLoading(true);
    simplePostCall(
      ApiConfig.MANUAL_VEHICLE_LIST,
      JSON.stringify({
        drowvalue: mapLatLngData,
        drowtype: layerTypeSend,
        drowradius: radius,
      })
    )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handalevalidation = () => {
    if (routingData?.vehicle_id.length === 0) {
      setErrMsg({
        ...errMsg,
        vehicle_id: "Please Select Vehicle ",
      });
      return;
    }
    // if (routingData?.trip_start_time.length === 0) {
    //   setErrMsg({
    //     ...errMsg,
    //     trip_start_time:"Please Enter  start Time"

    //   });
    //   return;
    // }

    // if (routingData?.trip_end_time.length === 0) {
    //   setErrMsg({
    //     ...errMsg,
    //     trip_end_time:"Please Enter  End Time"

    //   });
    //   return;
    // }
    setBtnDesable(true);
    setLoading(true);
    let body = JSON.stringify({
      ...routingData,
      drowtype: layerTypeSend,
      drowradius: radius,
      drowvalue: mapLatLngData,
      vehicle_id: routingData?.vehicle_id,
      timeZone: timeZone,
    });
    simplePostCall(ApiConfig.ADD_MANUAL_ROUTING, body)
      .then((res) => {
        setBtnDesable(false);
        if (res.result) {
          notifySuccess(res.message);
          setDispatchStatus("Progress");
          localStorage.setItem("dispatchKey", "Progress");
          navigate("/DispatchOrder");
          setMapLatLngData([]);
          setRoutingData({
            trip_end_time: "",
            trip_start_time: dayjs(new Date()).format("HH:mm:ss"),
            vehicle_id: "",
          });
        } else {
          notifyError(res.message);
        }
      })
      .catch((errr) => {
        console.log("errr", errr);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // useEffect(() => {if(vehicleList&&routingData?.vehicle_id){

  //   let vehicleName= vehicleList?.filter((ele)=>ele.vehicle_id==routingData.vehicle_id)
  // }
  // }, [vehicleList,routingData.vehicle_id])

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.stopPropagation();
  //   } else {
  //     setLoading(true);
  //     let body = JSON.stringify({
  //       ...routingData,
  //       drowtype: layerTypeSend,
  //       drowradius: radius,
  //       drowvalue:mapLatLngData,
  //       vehicle_id: routingData?.vehicle_id,
  //     });
  //     simplePostCall(ApiConfig.ADD_MANUAL_ROUTING, body)
  //       .then((res) => {
  //         if (res.result) {
  //           notifySuccess(res.message);
  //           navigate("/TripManagement");
  //         } else {
  //           notifyError(res.message);
  //         }
  //       })
  //       .catch((errr) => {
  //         console.log("errr", errr);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  //   setValidated(true);
  // };

  let driver = vehicleList?.filter(
    (driver) => driver.vehicle_id == routingData?.vehicle_id
  )[0];

  // setSelectedDriver(driver);
  // setVehicleDetails({ ...vehicleDetails, driver_id: driver.driver_id });

  useEffect(() => {
    getManualRoute();
    if (timeZone) {
      getVehicleList();
      const currentTime = new Date()
        .toLocaleTimeString("en-US", { timeZone, hour12: false })
        .split(" ")[0];
      setRoutingData({ ...routingData, trip_start_time: currentTime });
    }
    return () => {};
  }, [timeZone]);
  const handleCancle = () => {
    notifySuccess("Order Cancel For Now");
  };
  useEffect(() => {
    getTransporatioData();
  }, []);
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
        <div id="cx-wrapper" className="Manual_Routing">
          <div className="manualROuting" id="modal-map-wrapper">
            <div className="mainMape" id="mapManualRouting">
              <MapComponent
                componentId={"ManualRouting"}
                warehouse={manualRouteMark}
              />
              <div className="bottom-wrapper d-flex">
                <div className="bottom-status mr-3 mt-3">
                  <img
                    src={redMapIcon}
                    className="mr-2"
                    height="20px"
                    width="20px"
                    alt=""
                  />
                  <span>{t("Warehouse")}</span>
                </div>
                <div className="bottom-status mt-3">
                  <img
                    src={yellowMapIcon}
                    className="mr-2"
                    height="20px"
                    width="20px"
                    alt=""
                  />
                  <span>{t("Customer")}</span>
                </div>
              </div>
            </div>
            <div
              className="modal  pm-body"
              style={{
                display: mapLatLngData?.length > 0 ? "block" : "none",
              }}
              id="modal-on-map"
            >
              <Modal.Dialog
                className="popover-main-wrapperHot"
                style={{ top: "20%" }}
              >
                <Modal.Header>
                  <Modal.Title className="headingHot d-flex flex-column">
                    <p>{t("Assign Order")}</p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      className="headerFlex"
                    >
                      <p>
                        {" "}
                        <label className="greenDot"></label> online
                      </p>
                      <p>
                        {" "}
                        <label className="redDot"></label> Busy
                      </p>
                      <p>
                        {" "}
                        <label className="greyDot"></label> Offline
                      </p>
                    </div>
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form
                  // noValidate
                  // validated={validated}
                  // onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-md-12 form_input_main mt-3">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {t("Vehicle with Driver")}
                          </Form.Label>
                          <CommonSelect
                            setterKey={"vehicle_id"}
                            componentId={true}
                            setID={true}
                            setErrMsg={setErrMsg}
                            errMsg={errMsg}
                            errKey={"manual"}
                            setterFucntions={setRoutingData}
                            data={routingData}
                            optionList={
                              vehicleList &&
                              vehicleList?.map((single) => ({
                                id: single?.vehicle_id,
                                value: single?.vehicle_number,
                                label: (
                                  <div className="d-flex me-2">
                                    <div
                                      style={{
                                        backgroundColor:
                                          single?.metering_status == "T"
                                            ? "red"
                                            : single?.metering_status == "B"
                                            ? "green"
                                            : "grey", // Set your desired background color here
                                        width: "10px", // Set your desired width here
                                        height: "10px", // Set your desired height here
                                        borderRadius: "50%", // Make it a circle
                                        marginRight: "10px", // Set the space between the circle and the text
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    ></div>
                                    {/* <img src="https://via.placeholder.com/30x30" alt="Vanilla" /> */}
                                    {`${single?.vehicle_number}( ${
                                      single?.user_name
                                        ? single?.user_name
                                        : "No Driver Available"
                                    })`}
                                  </div>
                                ),
                                //  (
                                //   <div className="d-flex me-2">
                                //     <div
                                //       style={{
                                //         backgroundColor: single.vehicle_status==
                                //         "active"?"green":"red",   // Set your desired background color here
                                //         width: "20px",             // Set your desired width here
                                //         height: "20px",            // Set your desired height here
                                //         borderRadius: "50%",       // Make it a circle
                                //         marginRight: "10px",       // Set the space between the circle and the text
                                //         display: "flex",
                                //         alignItems: "center",
                                //         justifyContent: "center",
                                //       }}
                                //     >

                                //     </div>
                                //     {/* <img src="https://via.placeholder.com/30x30" alt="Vanilla" /> */}
                                //     {single?.vehicle_number}
                                //   </div>
                                // ),
                                //  `${single?.vehicle_number}   ${ <img src="https://via.placeholder.com/30x30" alt="Vanilla" />}`,
                              }))
                            }
                          />
                          {errMsg?.vehicle_id.length > 0 && (
                            <span className="text-danger">
                              {errMsg?.vehicle_id}
                            </span>
                          )}
                          <Form.Control.Feedback>
                            Please Select Vehicle...
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      {/* <div className="col-md-12  form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {t("Driver Name with Vehicle ")}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Driver Name..."
                            disabled
                            value={driver?.user_name}
                          />
                          <div>
                            {driver?.user_name && driver?.vehicle_number && (
                              <span
                                style={{ color: "#9c4900" }}
                              >{`${driver?.user_name}>>${driver?.vehicle_number}`}</span>
                            )}
                          </div>
                        </div>
                      </div> */}
                      {/* <div className="col-md-12 col-lg-6 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {t("Start Time")}
                          </Form.Label>
                          <Space>
                            <TimePicker
                              className="form-control carretClass"
                              size="large"
                              value={
                                routingData?.trip_start_time &&
                                dayjs(routingData?.trip_start_time, "HH:mm:ss")
                              }
                              showNow={false}
                              onChange={(e) => {
                                if (e) {
                                  const currentTime = dayjs();
                                  const selectedTime = dayjs(
                                    e.format("HH:mm:ss"),
                                    "HH:mm:ss"
                                  );

                                  const differenceInMinutes = selectedTime.diff(
                                    currentTime,
                                    "minute"
                                  );

                                  if (
                                    selectedTime.isAfter(currentTime) ||
                                    selectedTime.isSame(currentTime) ||
                                    differenceInMinutes >= -120
                                  ) {
                                    let time =
                                      e.hour() +
                                      ":" +
                                      e.minute() +
                                      ":" +
                                      e.second();
                                    setRoutingData({
                                      ...routingData,
                                      trip_start_time: time,
                                    });
                                  } else {
                                    setRoutingData({
                                      ...routingData,
                                      trip_start_time:"",
                                    });
                                  }
                                } 

                                // else {
                                //   setRoutingData({
                                //     ...routingData,
                                //     trip_start_time: "",
                                //   });
                                // }
                                setErrMsg({ ...errMsg, trip_start_time: "" });
                              }}
                            />
                            {errMsg?.trip_start_time.length > 0 && (
                              <span className="text-danger">
                                {errMsg?.trip_start_time}
                              </span>
                            )}
                          </Space>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {t("End Time")}
                          </Form.Label>
                          <Space>
                            <TimePicker
                              className="form-control carretClass"
                              size="large"
                              allowClear={true}
                              defaultValue={
                                routingData?.trip_end_time &&
                                dayjs(routingData?.trip_end_time, "HH:mm:ss")
                              }
                              showNow={false}
                              onChange={(e) => {
                                if (e) {
                                  let time =
                                    e.hour() +
                                    ":" +
                                    e.minute() +
                                    ":" +
                                    e.second();
                                  setRoutingData({
                                    ...routingData,
                                    trip_end_time: time,
                                  });
                                } else {
                                  setRoutingData({
                                    ...routingData,
                                    trip_end_time: "",
                                  });
                                }
                                setErrMsg({ ...errMsg, trip_end_time: "" });
                              }}
                            />
                          </Space>
                          {errMsg?.trip_end_time.length > 0 && (
                            <span className="text-danger">
                              {errMsg?.trip_end_time}
                            </span>
                          )}
                        </div>
                      </div> */}
                    </div>
                    <Modal.Footer>
                      <div className="d-flex justify-content-end align-items-center belowBtns btn-wrapper">
                        <button
                          type="button"
                          onClick={() => {
                            handleCancle();
                            setMapLatLngData([]);
                            setRoutingData({
                              trip_end_time: "",
                              trip_start_time: "",
                              vehicle_id: "",
                            });
                          }}
                          className="cx-btn-1"
                        >
                          {t("Cancel")}
                        </button>
                        {btnDesable ? (
                          <button
                            type="button"
                            // onClick={() => handalevalidation()}
                            className="cx-btn-2"
                          >
                            <div
                              class="spinner-border cx-btn-load"
                              role="status"
                            >
                              <span class="sr-only"> </span>
                            </div>
                            {t("Assing Trip")}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handalevalidation()}
                            className="cx-btn-2"
                          >
                            {t("Assing Trip")}
                          </button>
                        )}
                      </div>
                    </Modal.Footer>
                  </Form>
                </Modal.Body>
              </Modal.Dialog>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ManualRouting;

import React, { useContext, useState } from "react";
import { Form, Modal, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import Gcustomer from "../../assets/images/comp_icon.svg";
import untracked from "../../assets/images/start_icon.svg";
// import dropIcon from "../../assets/images/Vehicle_Icon/drop-icon.svg";
// import pickIcon from "../../assets/images/Vehicle_Icon/pick-up.svg";
import dropIcon from "../../assets/images/unloadLogo.svg";
import pickIcon from "../../assets/images/loadlogo.svg";
import idle from "../../assets/images/end_icon.svg";
import car from "../../assets/images/Catagiry_yellow_car.svg";
import View from "../../assets/images/Group.svg";

import driver_img from "../../assets/images/Customer-profile.png";
import { Link, useParams } from "react-router-dom";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import styled from "styled-components";
import Chart from "react-apexcharts";
import error_icon from "../../assets/images/error_icon.svg";
import { Dropdown } from "react-bootstrap";
import option from "../../assets/images/option-three-dot.svg";
import Col from "react-bootstrap/Col";
import { ITEMS } from "./data";
import TableRow from "./TableRow";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import step1 from "../../assets/images/step1.svg";
import step2 from "../../assets/images/step2.svg";
import laststep from "../../assets/images/laststep.svg";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import MapComponent from "../../sharedComponent/MapComponent";
import arrayMove from "./arrayMove";
import { useCallback } from "react";
import { simpleGetCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { useEffect } from "react";
import Loader from "../../sharedComponent/Loader";
import { notifySuccess } from "../../sharedComponent/notify";
import { useTranslation } from "react-i18next";
import { DateDDMMYYYY, getTime } from "../../sharedComponent/common";
import dummy_Car from "../../assets/images/black-car-logo.svg";
import ImportUser from "../../assets/images/imagesuser.png";
import { useSelector } from "react-redux";
import ImageValid from "../../sharedComponent/ImageValid";


const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const ViewDispatchTrip = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [currntItem, setCurrntItem] = useState(null);
  const [tripDetails, setTripDetails] = useState({});
  const [mapModifiedData, setMapModifiedData] = useState({});

  const addonSettingData = useSelector((state) => state.auth.addonModule);

  const [tal_show, set_tal_show] = useState(false)
  const {
    sidebar,
    loading,
    setLoading,
    customerData,
    socket,
    timeZone,
    setViewId,
    customerLogo,
    add_new_order_ids,
    set_add_new_order_ids,
    pickup_point_id,
    set_pickup_point_id,
    dispatch_package_id,
    set_dispatch_package_id,
    pickup_point_trip_id,
    set_pickup_point_trip_id,
    is_last_row,
    set_is_last_row
  } = useContext(AppContext);
  const idFromStorage = sessionStorage.getItem('trip_id')
  const [paramId, setParamId] = useState("");
  let customerId = customerData.customer_id; //user_id
  const [liveVehicleDetails, setLiveVehicleDetails] = useState({});
  console.log("liveVehicleDetails", liveVehicleDetails);

  const [stopsData, setStopsData] = useState([]);
  const [usesetTimeDate, setTimeDate] = useState({
    time: 0,
    hour: 0,
    second: 0,
  });

  const SortableCont = SortableContainer(({ children }) => {
    return <tbody>{children}</tbody>;
  });
  const SortableItem = SortableElement((props) => <TableRow {...props} />);
  const [stopList, setStopList] = useState([]);
  console.log("stopList", stopList);
  const [items, setItems] = useState(ITEMS);
  const [useshowEtaTime, setShowEtaTime] = useState(false);
  const [useshowTripTime, setShowTripTime] = useState({
    trip_start_time: "",
    trip_date: "",
  });
  // const [clickedIndex, setClickedIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(new Set()); // Use a Set to store open dropdown indexes
  const handleErrorImageTrack = (ev) => {
    ev.target.src = untracked;
  };
  const handleErrorImageUntrack = (ev) => {
    ev.target.src = idle;
  };
  // console.log("clickedIndex",clickedIndex)
  /* const toggleDropdown = (index) => {
    setClickedIndex(clickedIndex === index ? null : index);
    console.log("index : ", index)
  }; */
  const toggleDropdown = (index) => {
    const updatedIndices = new Set(clickedIndex);
    if (clickedIndex.has(index)) {
      updatedIndices.delete(index);
    } else {
      updatedIndices.add(index);
    }
    setClickedIndex(updatedIndices);
  };

  const [count, setCount] = useState(0);
  let useshowEta = [];
  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    setItems((oldItems) => arrayMove(oldItems, oldIndex, newIndex));
  }, []);
  let hoursNew = 0;
  let minutesNew = 0;
  let secondsNew = 0;
  useEffect(() => {
    if (id || idFromStorage) {
      getTripDetails();
      stopsByTripId();
    }
  }, [id, idFromStorage]);
  // useEffect(() => {
  //   if (idFromStorage) {
  //     getTripDetails();
  //     stopsByTripId();

  //   }
  // }, [idFromStorage]);
  const stopsByTripId = () => {
    simplePostCall(
      ApiConfig.GET_STOP_LIST_BY_ID,   /*  // simpleGetCall(ApiConfig.GET_TRIP_DETAILS + (id ? id : sessionStorage.getItem('trip_id'))) */
      // JSON.stringify({ pickup_point_trip_id: id })
      JSON.stringify({ pickup_point_trip_id: (id ? id : idFromStorage) })
    )
      .then((res) => {
        if (res.result) {
          setStopList(res.data);
          setStopsData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getTripDetails = () => {
    setLoading(true);

    // simpleGetCall(ApiConfig.GET_TRIP_DETAILS + id)
    // simpleGetCall(ApiConfig.GET_TRIP_DETAILS + idFromStorage)
    simpleGetCall(ApiConfig.GET_TRIP_DETAILS + (id ? id : idFromStorage))
      .then((res) => {
        if (res.result) {
          setTripDetails(res.data);
          setShowTripTime({
            trip_date: res?.data.trip_date,
            trip_start_time: res?.data?.trip_start_time,
          });
          setShowEtaTime(true);
          setMapModifiedData({
            vendor_warehouse_latitude: res.data?.trip_start_latitude,
            vendor_warehouse_longitude: res.data?.trip_start_longitude,
            dispatch_customer_address_latitude: res.data?.trip_end_latitude,
            dispatch_customer_address_longitude: res.data?.trip_end_longitude,
            vendor_warehouse_address: res.data?.trip_end_point,
            dispatch_customer_address_address: res.data?.trip_start_point,
          });
          let idData = res.data.vehicle_details[0]?.vehicle_imei;
          let idDataVehicle = res.data.vehicle_details[0]?.vehicle_id;
          setParamId(idData);
          getLiveVehicleApi({
            user_customer_id: Number(customerId),
            vehicleId: idDataVehicle,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteStop = () => {
    simplePostCall(
      ApiConfig.DELETE_STOP_BY_ID,
      JSON.stringify({
        pickup_point_id: currntItem,
      })
    )
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
          setStopList(
            stopList.filter((stop) => stop.pickup_point_id != currntItem)
          );
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //mqttconnection

  const getLiveVehicleApi = (body) => {
    setLoading(true);
    simplePostCall(ApiConfig?.GET_DISPATCH_SINGLE_VEHICLE, JSON.stringify(body))
      .then((res) => {
        if (res?.result === true) {
          setLiveVehicleDetails(res?.data[0]);
          setParamId(res.data[0]?.vehicle_imei);
        } else {
          setLiveVehicleDetails({});
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (paramId && timeZone) {
      const dataSingle = {
        user_customer_id: customerId,
        imei: paramId,
        timeZone: timeZone,
      };
      socket && socket.emit("singleVehicle", dataSingle);
      socket &&
        socket.on(`${paramId}`, (data) => {
          setLiveVehicleDetails(data[0]);
        });
    }
  }, [paramId, timeZone]);

  // const MyTableWrapper = styled.div`
  //   // padding: 10px;
  //   width: 100%;
  //   .empty-th {
  //     padding: 10px 15px;
  //   }
  //   .fixed_header {
  //     width: 100%;
  //     border-collapse: separate;
  //     border-spacing: 0 10px;

  //     & > tbody {
  //       display: block;
  //       width: 100%;
  //       cursor: grabbing;
  //       background: transparent;
  //       & > td {
  //         & > tr {
  //         }
  //       }
  //     }

  //     & > thead {
  //       background: #fff;
  //       color: #8f4300;
  //       border: none;

  //       & > tr {
  //         display: block;
  //         //width: 793px;
  //       }
  //     }

  //     & > thead th {
  //       width: 16%;
  //       border: none;
  //       &:first-child {
  //         width: 80px;
  //       }
  //     }
  //     & > thead th,
  //     & > tbody td {
  //       padding: 10px;
  //       text-align: left;
  //       width: 16%;
  //       // border-radius:10px;
  //     }
  //     & > tbody tr {
  //       border-radius: 10px;
  //       td {
  //         padding: 15px;
  //         border: 1px solid #f6efe9;
  //         color: #8f4300;
  //         font-size: 14px;
  //         &:first-child {
  //           border-top-left-radius: 10px;
  //           border-right: none;
  //           border-bottom-left-radius: 10px;
  //           width: 50px;
  //         }
  //         &:nth-child(2) {
  //           border-right: none;
  //           border-left: none;
  //         }
  //         &:nth-child(3) {
  //           border-right: none;
  //           border-left: none;
  //         }
  //         &:nth-child(4) {
  //           border-right: none;
  //           border-left: none;
  //         }
  //         &:nth-child(5) {
  //           border-right: none;
  //           border-left: none;
  //         }
  //         &:nth-child(6) {
  //           border-right: none;
  //           border-left: none;
  //         }
  //         &:last-child {
  //           border-left: none;
  //           border-top-right-radius: 10px;
  //           border-bottom-right-radius: 10px;
  //         }
  //       }
  //     }
  //   }
  // `;
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
  const handleErrorImage = (ev) => {
    ev.target.src = dummy_Car;
  };
  const handleErrorImage1 = (ev) => {
    ev.target.src = ImportUser;
  };
  let minutes1 = 0;
  let hours1 = 0;
  let seconds1 = 0;

  let minutes2 = 0;
  let hours2 = 0;
  let seconds2 = 0;
  function addTime(inputTime) {
    try {
      console.log(useshowTripTime.trip_date);
      var currentDate = new Date(
        `${useshowTripTime.trip_date?.split("T")?.[0]} ${useshowTripTime.trip_start_time
        }`
      );
      var [hours, minutes, seconds] = inputTime.split(":").map(Number);
      seconds1 = seconds1 + seconds;
      hours1 = hours1 + hours;
      minutes1 = minutes1 + minutes;

      currentDate.setHours(currentDate.getHours() + hours1);
      currentDate.setMinutes(currentDate.getMinutes() + minutes1);
      currentDate.setSeconds(currentDate.getSeconds() + seconds1);

      var formattedDate = currentDate.toLocaleString();
    } catch (er) {
      console.log(er);
    }
    return formattedDate;
  }

  function addTimeActual(inputTime, dateTime) {
    console.log("inputTime,inputTime", inputTime);
    console.log("dateTime,dateTime", dateTime);
    try {
      console.log(useshowTripTime.trip_date);
      var currentDate = new Date(`${dateTime}`);
      var [hours, minutes, seconds] = inputTime.split(":").map(Number);
      seconds2 = seconds2 + seconds;
      hours2 = hours2 + hours;
      minutes2 = minutes2 + minutes;

      currentDate.setHours(currentDate.getHours() + hours2);
      currentDate.setMinutes(currentDate.getMinutes() + minutes2);
      currentDate.setSeconds(currentDate.getSeconds() + seconds2);

      var formattedDate = currentDate.toLocaleString();
    } catch (er) {
      console.log(er);
    }
    return formattedDate;
  }
  let [actualDate, setActualDate] = useState("");
  //   useEffect(() => {

  //     if (stopList.length && count == 0) {
  //       for (const iterator of stopList) {
  //         let time = addTime(iterator.pickup_point_eta);
  //         var givenTime = new Date(time);
  //         console.log(time,givenTime)
  //         iterator.loadingW=""
  //         iterator.unLoadingC=""
  //         if(iterator.dispatch_customer_pickup_order_type=='collection'){
  //           iterator.loadingW = `${new Date(givenTime.getTime() - (iterator.vendor_warehouse_loading_duration * 1000)).toLocaleString()}`
  //         }else{
  //           iterator.unLoadingC =`${new Date(givenTime.getTime() - (iterator.dispatch_customer_address_unload_duration* 1000)).toLocaleString()}`;
  //         }

  //         if(iterator.actualDate ){

  //           setActualDate(`${iterator.actualDate} ${iterator.actualTime}`)
  //         }
  //         iterator.pickup_point_eta_time = time;
  //         useshowEta.push(iterator);
  //       }
  //       setStopList(useshowEta);
  //       if (useshowEtaTime) {
  //         setCount(prev => prev + 1)
  //       }

  //     }
  //   }, [stopList]);
  //   let latestPushdata=[]
  // useEffect(()=>{
  //   for (const iterator of stopList) {
  //     iterator.purposedEta=  addTimeActual(iterator.pickup_point_eta,actualDate)
  //     latestPushdata.push(iterator);
  //     console.log(  iterator.purposedEta,"  iterator.purposedEta",iterator.pickup_point_eta,actualDate)
  //    }
  //    setStopList(latestPushdata);

  // },[actualDate])

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
      <div id="cx-wrapper">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="main-master-wrapper form_input_main">
              {/* <div className="trip-details-wrapper">
                <p>{t("Trip Details")}</p>
                <Link to="#">
                  <button className="end-trip-btn">{t("End Trip")}</button>
                </Link>
              </div> */}
              {/*   <div className="trip-details-timeline">
                <div className="row">
                  <div className="col-lg-2">
                    <div className="td-left-section">
                      <label htmlFor="">{t("Pick-Up Location")}</label>
                      <p>{tripDetails.trip_start_point}</p>
                      <p>
                        {t("Start Date & Time")} :
                        {DateDDMMYYYY(tripDetails.trip_date)}{" "}
                        {tripDetails.trip_start_time}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="td-middle-section">
                      <div class="horizontal timeline">
                        <div class="steps">
                          <div class="step">
                            <OverlayTrigger
                              rootClose={true}
                              trigger="hover"
                              key="bottom"
                              placement="bottom"
                              overlay={
                                <Popover
                                  id="popover-positioned-bottom"
                                  className="trip-popover"
                                  style={{ width: "600px !important" }}
                                >
                                  <Popover.Body className="tp-body">
                                    <div className="trip-popover-wrapper">
                                      {t(" Package Dispatched.")}
                                    </div>
                                  </Popover.Body>
                                </Popover>
                              }
                            >
                              <img
                                src={step1}
                                alt=""
                                className=""
                                onClick={() => {}}
                              />
                            </OverlayTrigger>
                          </div>
                          {stopsData &&
                            stopsData?.map((ele, index) => {
                              const startDate = new Date(ele?.start_date_time);
                          
                              return (
                                <div className="step-container" key={index}>
                                  <div className="step">
                                    <OverlayTrigger
                                      rootClose={true}
                                      trigger="hover"
                                      key="top"
                                      placement="top"
                                      overlay={
                                        <Popover
                                          id="popover-positioned-bottom"
                                          className="trip-popover"
                                          style={{ width: "600px !important" }}
                                        >
                                          <Popover.Body className="tp-body">
                                            <div className="trip-popover-wrapper">
                                              {t(`${ele?.pickup_point_name}`)}
                                              <p>  {t("Schedule ETA")}:{ele?.pickup_point_eta_time}</p>
                                            </div>
                                          </Popover.Body>
                                        </Popover>
                                      }
                                    >
                                      {ele.pickup_point_priority == "0" ? (
                                        <img
                                          src={pickIcon}
                                          alt=""
                                          className="pickup-icon"
                                          onClick={() => {}}
                                        />
                                      ) : (
                                        <img
                                          src={dropIcon}
                                          alt=""
                                          className="drop-icon"
                                          onClick={() => {}}
                                        />
                                      )}
                                    </OverlayTrigger>
                                  </div>
                                  <p className="date-time">Actual ETA: : 23-02-2024 16:04:46</p>
                                </div>
                              );
                            })}
              

                          <div class="step">
                            <OverlayTrigger
                              rootClose={true}
                              trigger="hover"
                              key="bottom"
                              placement="bottom"
                              overlay={
                                <Popover
                                  id="popover-positioned-bottom"
                                  className="trip-popover"
                                  style={{ width: "600px !important" }}
                                >
                                  <Popover.Body className="tp-body">
                                    <div className="trip-popover-wrapper">
                                      {t("Package Recieved")}
                                    </div>
                                  </Popover.Body>
                                </Popover>
                              }
                            >
                              <img
                                src={laststep}
                                alt=""
                                className=""
                                onClick={() => {}}
                              />
                            </OverlayTrigger>
                          </div>
                        </div>

                        <div class="line"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="td-right-section">
                      <label htmlFor="">{t("Drop Location")}</label>
                      <p>{tripDetails.trip_end_point}</p>
                      <p>
                        {t("End Date & Time")} :
                        {DateDDMMYYYY(tripDetails.trip_end_date)}{" "}
                        {tripDetails.trip_end_time}
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* ====================== Stepper start ===================== */}
              <div
                className="main-master-wrapper form_input_main"
                id="View_Dispatch_main"
              >
                <div className="headingDetails">
                  <div className="headingTxt">
                    <p className="heading">{t("Order Summary")}</p>
                  </div>
                </div>

                {/* ====================== Stepper start ===================== */}
                <div className="vertical-stepper-main-wrapper">
                  <div class="firstBox ">
                    {/* <!-- completed --> */}
                    <div class="step completed ">
                      <div class="v-stepper">
                        <div class="circle">
                          <img src={step1} alt="" />
                        </div>
                        <div class="line"></div>
                      </div>
                      <div
                        className="d-flex justify-content-between align-items-center"
                        style={{ position: "relative" }}
                      >
                        <div className="content col-3 pickUp">
                          <label className="head">{t("Trip Activity")}</label>
                          {/* <p className="Value">
                            {tripDetails?.trip_start_point ?? "-"}
                          </p>
                          <span className="DispatchSPan">
                            Ordered On{" "}
                            {DateDDMMYYYY(tripDetails.trip_date)}{" "}
                            {"  "}
                            {tripDetails.trip_start_time}
                          </span> */}
                        </div>
                        {/* <div className=""> */}
                        {/* <div className="content col-3" style={{ marginRight : "rem",maxWidth:'10rem', minWidth:'10rem',}}>
                          <div className="d-flex flex-column justify-content-end align-items-center">
                            <p className="value  fs-12" >
                              <span className="DispatchSPan " style={{fontSize : '13.7px'}}>
                           
                              {DateDDMMYYYY(tripDetails.trip_date)} {" "}
                              {' '}
                              {tripDetails.trip_start_time}
                              </span>
                            </p>
                            </div>
                          </div> */}
                        <div
                          className="content col-3 text-center "
                          style={{
                            marginLeft: "4.4rem",
                            marginRight: "rem",
                            fontWeight: "500",
                            fontSize: "15px",
                            maxWidth: "10rem",
                            minWidth: "10rem",
                          }}
                        >
                          <label
                            className="headGreen fw-bold"
                            style={{
                              color: "#8F4300",
                              paddingRight: "  rem",
                              paddingLeft: "1.7rem",
                            }}
                          >
                            {t("Schedule ETA")}
                          </label>
                          <p
                            className="dateInn  text-start"
                            style={{
                              maxWidth: "12rem",
                              minWidth: "12rem",
                              paddingLeft: "1.5rem",
                            }}
                          >
                            {" "}
                            {DateDDMMYYYY(tripDetails.trip_date)} {/* {"  "} */}
                            {tripDetails.trip_start_time}
                          </p>
                        </div>

                        <div
                          className="content col-3 text-center  "
                          style={{
                            position: "absolute",
                            marginLeft: "42.4rem",
                            marginRight: "rem",
                            maxWidth: "17rem",
                            minWidth: "17rem",
                          }}
                        >
                          <label
                            className="headGreen fw-bold"
                            style={{
                              color: "#8F4300",
                              marginLeft: "rem",
                              paddingRight: "5rem",
                            }}
                          >
                            {t("Actual ETA")}:
                          </label>
                          <p
                            className="dateInn "
                            style={{
                              maxWidth: "12rem",
                              minWidth: "12rem",
                              paddingRight: "0.9rem",
                            }}
                          >
                            {" "}
                            {DateDDMMYYYY(tripDetails.trip_date)} {"  "}
                            {tripDetails.trip_start_time}
                          </p>
                        </div>
                      </div>
                    </div>

                    {stopsData?.map((ele, index) => {
                      return (
                        <div className="step completed " key={"stop" + index}>
                          <div class="v-stepper">
                            <div class="circle">
                              {ele.dispatch_customer_pickup_order_type ==
                                "collection" ? (
                                <img
                                  src={pickIcon}
                                  alt=""
                                  className="pickup-icon"
                                  onClick={() => {
                                    toggleDropdown(index);
                                  }}
                                />
                              ) : (
                                <img
                                  src={dropIcon}
                                  alt=""
                                  className="drop-icon"
                                  onClick={() => {
                                    toggleDropdown(index);
                                  }}
                                />
                              )}
                            </div>
                            <div class="line"></div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center col-12">
                            <div
                              className="content pickUp col-3 "
                              onClick={() => toggleDropdown(index)}
                              style={{ maxWidth: "19rem", minWidth: "19rem" }}
                            >
                              <label
                                className=""
                                style={{ fontSize: 18, fontWeight: 700, marginBottom: "5px" }}
                              >
                                {" "}
                                {t(`${ele?.point_names ?
                                  ele?.point_names?.vendor_name
                                    ? ele?.point_names?.vendor_name
                                    : ele?.point_names?.dispatch_customer_name
                                      ? ele?.point_names?.dispatch_customer_name
                                      : ""
                                  : ""}`)}
                              </label>
                              <label
                                className="Value w-100"
                                style={{ whiteSpace: "pre-wrap" }}
                              >
                                {" "}
                                {t(`${ele?.pickup_point_name}`)}
                              </label>
                              <span className="DispatchSPan">
                                {ele?.dispatch_package_activity_date}{" "}
                                {ele?.dispatch_package_activity_time}
                              </span>{" "}
                              <br />
                              {
                                /* clickedIndex === index ? */ clickedIndex.has(
                                index
                              ) && (
                                  <div className="innerSteeper">
                                    <div className="steperBox">
                                      <div className="inncircle">
                                        <label></label>
                                      </div>
                                      <label className="innStepLab">
                                        {t("Arrival")}:
                                      </label>
                                    </div>
                                    <div className="innerLine"></div>
                                    <div className="steperBox">
                                      <div className="inncircle">
                                        <label></label>
                                      </div>
                                      <label className="innStepLab">
                                        {t("Departure")}:
                                      </label>
                                    </div>
                                  </div>
                                )
                              }
                            </div>
                            {/* <div class="content" style={{opacity : 0}} >
                              <p className="dateInn">{ele.loadingWW ||ele.unLoadingCC}</p>
                              { clickedIndex.has(index) &&
                              // clickedIndex === index ?
                                <>
                               {  <div className="insideDateTime">{ele.loadingWW ||ele.unLoadingCC }</div>} 
                                  <div className="insideDateTime">{ele?.etaTime}</div>
                                </>
                               
                              //  : null
                            }
                            </div> */}

                            <div
                              className="content col-3 text-center"
                              style={{
                                marginLeft: "3rem",
                                maxWidth: "12rem",
                                minWidth: "12rem",
                              }}
                            >
                              {/* HAAAAAAAAAAAAAAAAAAAAA    */}

                              <p className="dateInn">
                                {ele.loadingWW || ele.unLoadingCC}
                              </p>
                              {
                                clickedIndex.has(index) && (
                                  // clickedIndex === index ?
                                  <>
                                    {
                                      <div className="insideDateTime">
                                        {ele.loadingWW || ele.unLoadingCC}
                                      </div>
                                    }
                                    <div className="insideDateTime">
                                      {ele?.etaTime}
                                    </div>
                                  </>
                                )

                                //  : null
                              }
                            </div>
                            <div
                              className="content col-3 text-center"
                              style={{
                                maxWidth: "12rem",
                                minWidth: "12rem",
                                marginLeft: "5rem",
                                marginRight: "rem",
                              }}
                            >
                              {/* HAAAAAAAAAAAAAAAAAAAAA    */}

                              {ele.loadDateWreached || ele.dateTimeCreached ? (
                                <p
                                  className="dateInn" /* style={{ color:"green"}} */
                                >
                                  {ele.loadDateWreached ||
                                    ele.dateTimeCreached ||
                                    ""}{" "}
                                </p>
                              ) : (
                                <p
                                  className="dateInn"
                                  style={{ color: "orange" }}
                                >
                                  {ele.loadingWR || ele.unLoadingCR || ""}
                                </p>
                              )}

                              {
                                clickedIndex.has(index) && (
                                  // clickedIndex === index ?
                                  <>
                                    {ele.loadDateWreached ||
                                      ele.dateTimeCreached ? (
                                      <>
                                        <div className="insideDateTime">
                                          {ele.loadDateWreached
                                            ? ele.loadDateWreached
                                            : ele.dateTimeCreached}
                                        </div>
                                        <div className="insideDateTime">
                                          {ele.dateTimeWLeft ||
                                            ele.dateTimeCleft ||
                                            ""}
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <div className="insideDateTime">
                                          {ele.loadingWR
                                            ? ele.loadingWR
                                            : ele.unLoadingCR}
                                        </div>
                                        <div className="insideDateTime">
                                          {ele.proposedTime}{" "}
                                        </div>{" "}
                                      </>
                                    )}
                                  </>
                                )

                                //  : null
                              }
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div
                      class="step completed"
                      style={{ position: "relative" }}
                    >
                      <div class="v-stepper">
                        <div class="circle">
                          <img src={step1} alt="" />
                        </div>
                        <div class="line"></div>
                      </div>

                      <div class="content mr-5  d-flex w-40 ">
                        <label className="head">{t("Trip End")}</label>

                        {/* <div className="content text-end"  style={{  marginLeft: '15.3rem',  minWidth:'13rem' , maxWidth:'13rem'}} >

<p className="value  fs-12 bg-warning " >

  <span className="DispatchSPan  " style={{fontSize : '13.7px',}}>

  {DateDDMMYYYY(tripDetails.trip_end_date)} {" "}
  {' '}
  {tripDetails.trip_end_time}     
  </span>
</p>
</div> */}

                        {/* <p className="Value">
                          {tripDetails?.trip_end_point ??
                            "-"}
                        </p>
                        {tripDetails.trip_end_date && <span className="DispatchSPan">
                          {t("Expected Delivery by ")}

                          {DateDDMMYYYY(tripDetails.trip_end_date)}  {tripDetails.trip_end_time}
                        </span>} */}
                      </div>
                      <div
                        className="content text-end"
                        style={{
                          marginLeft: "16.5rem",
                          minWidth: "11rem",
                          maxWidth: "11rem",
                        }}
                      >
                        <p className="value  fs-12 ">
                          <span
                            className="DispatchSPan  "
                            style={{ fontSize: "13.7px" }}
                          >
                            {DateDDMMYYYY(tripDetails.trip_end_date)}{" "}
                            {tripDetails.trip_end_time}
                          </span>
                        </p>
                      </div>
                      <div
                        className="content text-start"
                        style={{
                          position: "absolute",
                          marginLeft: "46.7rem",
                          minWidth: "12rem",
                          maxWidth: "12rem",
                        }}
                      >
                        <p className="value  fs-12  ">
                          <span
                            className="DispatchSPan "
                            style={{ fontSize: "13.7px" }}
                          >
                            {/* {DateDDMMYYYY(tripDetails.trip_end_date)}{" "} */}
                            {/* {tripDetails.trip_end_time} */}
                            {stopsData.length && stopsData[stopList?.length - 1]?.actualDate ? stopsData[stopList?.length - 1]?.actualDate : " "}{" "}
                            {stopsData.length && stopsData[stopList?.length - 1]?.actualTime ? stopsData[stopList?.length - 1].actualTime : " "}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ====================== Stepper end ===================== */}
              </div>
              {/* ====================== Stepper end ===================== */}
            </div>
            <div className="main-master-wrapper mb-3">
              <div className="Heading">
                <p>{t("Stop List")}</p>
              </div>
              <table className="holiday-table">
                <thead className="ht-head">
                  <tr>
                    <td>{t("Sr.No.")}</td>
                    <td>{t("Stop Name")}</td>
                    <td>{t("Merchant Name")}</td>
                    <td>{t("Order No")}</td>
                    <td>{t("Stop Code")}</td>

                    <td>{t("Duration")}</td>
                    <td>{t("ETA")}</td>
                    {addonSettingData.addon_ghatke == 1 ? <>
                      <td>{t("Action")}</td>
                    </> : <></>}
                    {userRole === "customer" ||
                      (accessRights &&
                        accessRights?.rights_manage_trips == 1 && (
                          <td>{t("Action")}</td>
                        ))}
                  </tr>
                </thead>
                <tbody className="ht-body">

                  {stopList?.map((stop, index) => {
                    const isLastRow = index === stopList.length - 1 ? "1" : "0";
                    // const etaMilliseconds = new Date(
                    //   `1970-01-01T${stop.pickup_point_eta}Z`
                    // ).getTime();

                    // // Get current time in milliseconds
                    // const currentTimeMilliseconds = new Date().getTime();

                    // // Calculate the new time by adding pickup_point_eta to the current time
                    // const newTimeMilliseconds =
                    //   currentTimeMilliseconds + etaMilliseconds;

                    // // Format the result into a readable time format (HH:mm:ss)
                    // const formattedNewTime = new Date(
                    //   newTimeMilliseconds
                    // ).toLocaleTimeString([], {
                    //   hour: "2-digit",
                    //   minute: "2-digit",
                    //   second: "2-digit",
                    // });

                    return (
                      <tr className="table-row-custom" key={"stop" + index}>
                        <td>{index + 1}</td>
                        <td style={{ minWidth: 150 }}>{stop?.pickup_point_name}</td>
                        <td style={{ minWidth: 150 }}> {t(`${stop?.point_names ?
                          stop?.point_names?.vendor_name
                            ? stop?.point_names?.vendor_name
                            : stop?.point_names?.dispatch_customer_name
                              ? stop?.point_names?.dispatch_customer_name
                              : ""
                          : ""}`)}</td>
                        <td style={{ minWidth: 120 }} >
                          <Link
                            to="/ViewOrders"
                            className="linkTxt"
                            onClick={() => {
                              setViewId(stop.dispatch_package_id);
                            }}
                          >
                            {stop.dispatch_package_order_number}
                          </Link>
                        </td>

                        <td style={{ minWidth: 150 }}>{stop.pickup_point_code}</td>
                        {/* <td>------</td>
                      <td>-----</td> */}

                        <td>{stop.pickup_point_eta}</td>
                        <td>{stop.loadingWW || stop.unLoadingCC} ETA</td>

                        {addonSettingData.addon_ghatke == 1 ? <>
                          {userRole === "dispatchexecutive" ? (
                            <td>
                              <Link
                                to={'/AddNewOrder'}

                                onClick={() => {

                                  // setCurrntItem(stop.pickup_point_id);
                                  // set_pickup_point_id(stop.pickup_point_id)
                                  // set_dispatch_package_id(stop.dispatch_package_id)
                                  // set_pickup_point_trip_id(stop.pickup_point_trip_id)
                                  localStorage.setItem('pickup_point_id', stop?.pickup_point_id);
                                  localStorage.setItem('dispatch_package_id', stop?.dispatch_package_id);
                                  localStorage.setItem('pickup_point_trip_id', stop?.pickup_point_trip_id);
                                  isLastRow == 1 ? sessionStorage.setItem('isLastRow', 1) : sessionStorage.setItem('isLastRow', 0);



                                }}
                              >
                                {/* <Link
  to={{
    pathname: `/AddNewOrder/${isLastRow}`,
    state: {
      pickup_point_id: stop.pickup_point_id,
      dispatch_package_id: stop.dispatch_package_id,
      pickup_point_trip_id: stop.pickup_point_trip_id
    }
  }}
> */}
                                Add Pickup Details
                              </Link>
                            </td>
                          ) :
                            <>
                              <td>
                                <Link
                                  // to={"/DispatchViewOrder/" + stop.pickup_point_id}
                                  to={'/DispatchViewOrder' /* /${stop.pickup_point_id} */}
                                  onClick={() => {

                                    setCurrntItem(stop.pickup_point_id);
                                    sessionStorage.setItem('pickup_point_id', stop?.pickup_point_id)
                                    localStorage.setItem('dispatch_package_id', stop?.dispatch_package_id);
                                    localStorage.setItem('pickup_point_trip_id', stop?.pickup_point_trip_id);
                                    isLastRow == 1 ? sessionStorage.setItem('isLastRow', 1) : sessionStorage.setItem('isLastRow', 0)
                                  }}
                                >
                                  {console.log('stop?.pickup_point_id--->', stop?.pickup_point_id)}

                                  <div>
                                    <img src={View} className="mr-2" alt="" />
                                  </div>

                                </Link>
                              </td>
                            </>
                          }

                        </> : <></>}


                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="main-master-wrapper form_input_main">
                  <div className="transportMap trip-map">
                    <div className="innerMap">
                      <p>{t("Map Overview")}</p>
                      <MapComponent
                        data={mapModifiedData}
                        stopListData={stopList}
                        componentId={"viewtrip"}
                        viewTripVehicle={liveVehicleDetails}
                      />
                    </div>
                    <div className="belowContent">
                      <div className="notific">
                        <img src={Gcustomer} alt="" />
                        <label>{t("Company")}</label>
                      </div>
                      <div className="notific">
                        <img
                          src={
                            ApiConfig.BASE_URL_FOR_IMAGES_L +
                            customerLogo.logo_trip_start_point
                          }
                          alt=""
                          onError={(ev) => {
                            handleErrorImageTrack(ev);
                          }}
                          height="20"
                          width="20"
                        />
                        <label>{t("Start Point")}</label>
                      </div>
                      <div className="notific">
                        <img
                          src={
                            ApiConfig.BASE_URL_FOR_IMAGES_L +
                            customerLogo.logo_trip_end_point
                          }
                          alt=""
                          onError={(ev) => {
                            handleErrorImageUntrack(ev);
                          }}
                          height="20"
                          width="20"
                        />
                        <label>{t("End Point")}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-4">
                <div className="main-master-wrapper form_input_main">
                  <div className="vehicle-speed-chart">
                    <div className="vsc-heading">
                      <p>{t("Vehicle Speed")}</p>
                    </div>
                    <div className="vsc-chart-area">
                      <Chart
                        options={state.auth.options}
                        series={state.auth.series}
                        type="area"
                        width="100%"
                        height="420"
                      />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            {customerData.customer_id == 9999 && addonSettingData.addon_ghatke == 1 ? (
              <></>
            ) : (
              <>
                <div className="main-master-wrapper form_input_main">
                  <Tab.Container
                    id="left-tabs-example"
                    className="td-tab-wrapper"
                    defaultActiveKey="0"
                  >
                    <Row>
                      <Col sm={12}>
                        <Nav variant="pills" className="td-nav">
                          <Nav.Item className="td-tab">
                            <Nav.Link className="td-link" eventKey="0">
                              {t("Vehicle")}
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item className="td-tab">
                            <Nav.Link className="td-link" eventKey="1">
                              {t("Driver")}
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item className="td-tab">
                            <Nav.Link className="td-link" eventKey="2">
                              {t("Vehicle Assistant")}
                            </Nav.Link>
                          </Nav.Item>
                          {/* <Nav.Item className="td-tab">
                      <Nav.Link className="td-link" eventKey="2">
                        {t("Analytics")}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="td-tab">
                      <Nav.Link className="td-link" eventKey="3">
                        {t("Errors")}
                      </Nav.Link>
                    </Nav.Item> */}
                        </Nav>
                      </Col>
                      <Col sm={12} className="">
                        <Tab.Content>
                          <Tab.Pane eventKey="0">
                            <div className="row g-0 mb-3">
                              <div className="col-md-3 mt-3 d-flex justify-content-center align-items-center">
                                {tripDetails?.vehicle_details && (
                                  <ImageValid
                                    item={tripDetails?.vehicle_details[0]}
                                    componentId={"viewDispatch"}
                                  />
                                )}
                                {/* {tripDetails?.vehicle_details && <img
                            src={
                              tripDetails?.vehicle_details &&
                              tripDetails?.vehicle_details[0]?.vehicle_image_path
                                ? `${ApiConfig.BASE_URL}${tripDetails?.vehicle_details[0]?.vehicle_image_path}`
                                : Number(
                                    tripDetails?.vehicle_details[0]
                                      ?.vehicle_type_icon
                                  ) > 40
                                ? `${
                                    ApiConfig.BASE_URL
                                  }customer/public/uploads/vehicle_type/${
                                    tripDetails?.vehicle_details[0]
                                      ?.vehicle_type_icon
                                  }/${
                                    tripDetails?.vehicle_details[0]
                                      ?.metering_status === "A"
                                      ? "parked"
                                      : tripDetails?.vehicle_details[0]
                                          ?.metering_status === "B"
                                      ? "Running"
                                      : tripDetails?.vehicle_details[0]
                                          ?.metering_status === "d"
                                      ? "Idle"
                                      : "Untracked"
                                  }.svg`
                                : Number(
                                    tripDetails?.vehicle_details[0]
                                      ?.vehicle_type_icon
                                  ) < 40
                                ? `${
                                    ApiConfig.BASE_URL
                                  }customer/public/uploads/vehicle_type/${ Number(
                                    tripDetails?.vehicle_details[0]
                                      ?.vehicle_type_icon
                                  )}/${
                                    tripDetails?.vehicle_details[0]
                                      ?.metering_status === "A"
                                      ? "parked"
                                      : tripDetails?.vehicle_details[0]
                                          ?.metering_status === "B"
                                      ? "Running"
                                      : tripDetails?.vehicle_details[0]
                                          ?.metering_status === "d"
                                      ? "Idle"
                                      : "Untracked"
                                  }.svg`
                                : car
                            }
                            alt=""
                            onError={(ev) => {
                              handleErrorImage(ev);
                            }}
                            style={{height:"100px",width:"100px"}}
                          />} */}
                              </div>
                              <div className="col-md-9 mt-3">
                                <div className="vd-wrapper">
                                  <div className="vd-inner">
                                    <div className="row">
                                      <div className="col-md-4 form_input_main">
                                        <label htmlFor="">
                                          {t("Vehicle Name")}
                                        </label>
                                        <p>
                                          {tripDetails.vehicle_details &&
                                            tripDetails.vehicle_details[0]
                                              .vehicle_model_no}
                                        </p>
                                      </div>
                                      <div className="col-md-4 form_input_main">
                                        <label htmlFor="">
                                          {t("Vehicle Number")}
                                        </label>
                                        <p>
                                          {tripDetails.vehicle_details &&
                                            tripDetails.vehicle_details[0]
                                              .vehicle_number}
                                        </p>
                                      </div>
                                      <div className="col-md-4 form_input_main">
                                        <label htmlFor="">
                                          {t("Registration Number")}
                                        </label>
                                        <p>
                                          {tripDetails.vehicle_details &&
                                            tripDetails.vehicle_details[0]
                                              .vehicle_reg_no}
                                        </p>
                                      </div>
                                      <div className="col-md-4 form_input_main">
                                        <label htmlFor="">
                                          {t("IMEI No.")}
                                        </label>
                                        <p>
                                          {tripDetails.vehicle_details &&
                                            tripDetails.vehicle_details[0]
                                              .vehicle_imei}
                                        </p>
                                      </div>
                                      <div className="col-md-4 form_input_main">
                                        <label htmlFor="">
                                          {t("Vehicle Type")}
                                        </label>
                                        <p>
                                          {tripDetails.vehicle_details &&
                                            tripDetails.vehicle_details[0]
                                              .vehicle_type_code}
                                        </p>
                                      </div>
                                      <div className="col-md-4 form_input_main">
                                        <label htmlFor="">
                                          {t("Transportation Type")}
                                        </label>
                                        <p>{t("Goods")} </p>
                                      </div>
                                      <div className="col-md-4 form_input_main">
                                        <label htmlFor="">
                                          {t("Vehicle Capacity / Load")}
                                        </label>
                                        <p>
                                          {tripDetails.vehicle_details &&
                                            tripDetails.vehicle_details[0]
                                              .vehicle_seat_capacity}
                                        </p>
                                      </div>
                                      <div className="col-md-4 form_input_main">
                                        <label htmlFor="">{t("Trip Id")}</label>
                                        <p>{tripDetails.trip_id}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="1">
                            <div className="row g-0 mb-3">
                              <div className="col-md-3 d-flex justify-content-center">
                                <div className="driver-profile">
                                  {/* <img src={driver_img} alt="" /> */}

                                  {tripDetails?.driver_details &&
                                    tripDetails?.driver_details[0]
                                      ?.user_profile_pic?.length > 0 ? (
                                    <img
                                      src={`${ApiConfig.BASE_URL}${tripDetails.driver_details[0]?.user_profile_pic}`}
                                      onError={(ev) => {
                                        handleErrorImage1(ev);
                                      }}
                                      style={{
                                        height: "100px",
                                        width: "100px",
                                      }}
                                      alt="driver img"
                                    />
                                  ) : (
                                    <img
                                      src={ImportUser}
                                      style={{
                                        height: "100px",
                                        width: "100px",
                                      }}
                                      alt="driver img"
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="col-md-9 mt-3">
                                <div className="vd-wrapper">
                                  <div className="vd-inner">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label htmlFor="">
                                          {t("Driver Name")}
                                        </label>
                                        <p>
                                          {tripDetails.driver_details &&
                                            tripDetails.driver_details[0]
                                              ?.user_name}
                                        </p>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="">
                                          {t("Contact No.")}
                                        </label>
                                        <p>
                                          {tripDetails.driver_details &&
                                            tripDetails.driver_details[0]
                                              ?.user_mobile}
                                        </p>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="">{t("Email")}</label>
                                        <p>
                                          {tripDetails.driver_details &&
                                            tripDetails.driver_details[0]
                                              ?.user_email}
                                        </p>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="">
                                          {t("Vehicle Number")}
                                        </label>
                                        <p>
                                          {tripDetails.vehicle_details &&
                                            tripDetails.vehicle_details[0]
                                              ?.vehicle_number}
                                        </p>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="">
                                          {t("Vehicle Type")}
                                        </label>
                                        <p>
                                          {tripDetails.vehicle_details &&
                                            tripDetails.vehicle_details[0]
                                              ?.vehicle_type_code}
                                        </p>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="">{t("Address")}</label>
                                        <p>
                                          {tripDetails.driver_details &&
                                            tripDetails.driver_details[0]
                                              ?.user_address}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="2">
                            <div className="row g-0 mb-3">
                              <div className="col-md-3 d-flex justify-content-center">
                                <div className="driver-profile">
                                  {/* <img src={driver_img} alt="" /> */}

                                  {tripDetails?.vehicleAssistantDetails &&
                                    tripDetails?.vehicleAssistantDetails[0]
                                      ?.user_profile_pic?.length > 0 ? (
                                    <img
                                      src={`${ApiConfig.BASE_URL}${tripDetails.vehicleAssistantDetails[0]?.user_profile_pic}`}
                                      onError={(ev) => {
                                        handleErrorImage1(ev);
                                      }}
                                      style={{
                                        height: "100px",
                                        width: "100px",
                                      }}
                                      alt="driver img"
                                    />
                                  ) : (
                                    <img
                                      src={ImportUser}
                                      style={{
                                        height: "100px",
                                        width: "100px",
                                      }}
                                      alt="driver img"
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="col-md-9 mt-3">
                                <div className="vd-wrapper">
                                  <div className="vd-inner">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label htmlFor="">
                                          {t("Vehicle Assistant Name")}
                                        </label>
                                        <p>
                                          {tripDetails.vehicleAssistantDetails &&
                                            tripDetails
                                              .vehicleAssistantDetails[0]
                                              ?.user_name}
                                        </p>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="">
                                          {t("Contact No.")}
                                        </label>
                                        <p>
                                          {tripDetails.vehicleAssistantDetails &&
                                            tripDetails
                                              .vehicleAssistantDetails[0]
                                              ?.user_mobile}
                                        </p>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="">{t("Email")}</label>
                                        <p>
                                          {tripDetails.vehicleAssistantDetails &&
                                            tripDetails
                                              .vehicleAssistantDetails[0]
                                              ?.user_email}
                                        </p>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="">
                                          {t("Vehicle Number")}
                                        </label>
                                        <p>
                                          {tripDetails.vehicle_details &&
                                            tripDetails.vehicle_details[0]
                                              ?.vehicle_number}
                                        </p>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="">
                                          {t("Vehicle Type")}
                                        </label>
                                        <p>
                                          {tripDetails.vehicle_details &&
                                            tripDetails.vehicle_details[0]
                                              ?.vehicle_type_code}
                                        </p>
                                      </div>
                                      <div className="col-md-4">
                                        <label htmlFor="">{t("Address")}</label>
                                        <p>
                                          {tripDetails.vehicleAssistantDetails &&
                                            tripDetails
                                              .vehicleAssistantDetails[0]
                                              ?.user_address}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="3">
                            <div className="progress-wrapper">
                              <div style={{ width: "170px" }}>
                                <CircularProgressbarWithChildren value={66}>
                                  <div style={{ fontSize: 16 }}>
                                    <strong className="progress-text">
                                      66
                                    </strong>
                                  </div>
                                </CircularProgressbarWithChildren>
                                <p>{t("Executive Score")}</p>
                              </div>
                              <div style={{ width: "170px" }}>
                                <CircularProgressbarWithChildren value={66}>
                                  <div style={{ fontSize: 16 }}>
                                    <strong className="progress-text">
                                      66
                                    </strong>
                                  </div>
                                </CircularProgressbarWithChildren>
                                <p>{t("Accidents Saved")}</p>
                              </div>
                              <div style={{ width: "170px" }}>
                                <CircularProgressbarWithChildren value={66}>
                                  <div style={{ fontSize: 16 }}>
                                    <strong className="progress-text">
                                      66
                                    </strong>
                                  </div>
                                </CircularProgressbarWithChildren>
                                <p>{t("Braking Frequency")}</p>
                              </div>
                              <div style={{ width: "170px" }}>
                                <CircularProgressbarWithChildren value={66}>
                                  <div style={{ fontSize: 16 }}>
                                    <strong className="progress-text">
                                      66
                                    </strong>
                                  </div>
                                </CircularProgressbarWithChildren>
                                <p>{t("Incentives")}</p>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="4">
                            <div className="error-list-wrapper">
                              <div className="error-list">
                                <img src={error_icon} alt="" />
                                <div className="error-text">
                                  <label htmlFor="">
                                    {t("Vehicle error description goes here")}
                                    ...{" "}
                                  </label>
                                  <p>31-01-2023, 04:05:58 PM</p>
                                </div>
                              </div>
                              <div className="error-list">
                                <img src={error_icon} alt="" />
                                <div className="error-text">
                                  <label htmlFor="">
                                    {t("Vehicle error description goes here")}
                                    ...{" "}
                                  </label>
                                  <p>31-01-2023, 04:05:58 PM</p>
                                </div>
                              </div>
                              <div className="error-list">
                                <img src={error_icon} alt="" />
                                <div className="error-text">
                                  <label htmlFor="">
                                    {t("Vehicle error description goes here")}
                                    ...{" "}
                                  </label>
                                  <p>31-01-2023, 04:05:58 PM</p>
                                </div>
                              </div>
                              <div className="error-list">
                                <img src={error_icon} alt="" />
                                <div className="error-text">
                                  <label htmlFor="">
                                    {t("Vehicle error description goes here")}
                                    ...{" "}
                                  </label>
                                  <p>31-01-2023, 04:05:58 PM</p>
                                </div>
                              </div>
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
              </>
            )}

            {/* <div className="main-master-wrapper mb-3">
              <Tab.Container
                id="left-tabs-example"
                className="td-tab-wrapper"
                defaultActiveKey="0"
              >
                <div className="trip-details-wrapper">
                  <p>{t("Alerts")}</p>
                </div>
                <Row>
                  <Col sm={12}>
                    <Nav variant="pills" className="td-nav">
                      <Nav.Item className="td-tab">
                        <Nav.Link className="td-link" eventKey="0">
                          {t("Alert ")}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="td-tab">
                        <Nav.Link className="td-link" eventKey="1">
                          {t("Alert Name")}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="td-tab">
                        <Nav.Link className="td-link" eventKey="2">
                          {t("Alert Name")}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={12} className="">
                    <Tab.Content>
                      <Tab.Pane eventKey="0">
                        <div className="alert-table-wrapper">
                          <table className="alert-table">
                            <thead className="ht-head">
                              <tr>
                                <td>{t("Sr.No.")}</td>
                                <td>{t("Name.")}</td>
                                <td>{t("Event")}</td>
                                <td>{t("Value")}</td>

                              </tr>
                            </thead>
                            <tbody className="ht-body">
                              <tr className="table-row-custom">
                                <td>1</td>
                                <td>vehicle defect</td>
                                <td>Alert - 1</td>
                                <td>1</td>
                              </tr>
                              <tr className="table-row-custom">
                                <td>2</td>
                                <td>vehicle out of area</td>
                                <td>Alert - 2</td>
                                <td>10</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="1">
                        <div className="alert-table-wrapper">
                          <table className="alert-table">
                            <thead className="ht-head">
                              <tr>
                                <td>{t("Sr.No.")}</td>
                                <td>{t("Event")}</td>
                                <td>{t("Value")}</td>
                              </tr>
                            </thead>
                            <tbody className="ht-body">
                              <tr className="table-row-custom">
                                <td>1</td>
                                <td>Alert - 1</td>
                                <td>1</td>
                              </tr>
                              <tr className="table-row-custom">
                                <td>2</td>
                                <td>Alert - 2</td>
                                <td>10</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="2">
                        <div className="alert-table-wrapper">
                          <table className="alert-table">
                            <thead className="ht-head">
                              <tr>
                                <td>{t("Sr.No.")}</td>
                                <td>{t("Event")}</td>
                                <td>{t("Value")}</td>
                              </tr>
                            </thead>
                            <tbody className="ht-body">
                              <tr className="table-row-custom">
                                <td>1</td>
                                <td>Alert - 1</td>
                                <td>1</td>
                              </tr>
                              <tr className="table-row-custom">
                                <td>2</td>
                                <td>Alert - 2</td>
                                <td>10</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div> */}
          </>
        )}
        <Modal
          show={show2}
          onHide={handleClose2}
          centered
          className="common-model"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("Delete Stop")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {t("Are you sure you want to delete this Stop?")}
          </Modal.Body>
          <Modal.Footer className="pop-up-modal-footer">
            <button className="cx-btn-1" onClick={() => setShow2(false)}>
              {t("Close")}
            </button>
            <button
              className="cx-btn-2"
              onClick={() => {
                deleteStop();
                setShow2(false);
              }}
            >
              {t("Yes")}
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </motion.div >
  );
};
export default ViewDispatchTrip;

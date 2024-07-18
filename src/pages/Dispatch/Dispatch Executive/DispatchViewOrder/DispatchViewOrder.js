import { React, useContext, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
// import * as Buffer from 'buffer';
import { from } from 'buffer';
import step1 from "../../../../assets/images/step1.svg";
import step2 from "../../../../assets/images/step2.svg";
import borderStar from "../../../../assets/images/borderStar.svg";
import fillStar from "../../../../assets/images/fillStar.svg";
import flagLine from "../../../../assets/images/flagLine.svg";
import flagFill from "../../../../assets/images/flagFill.svg";
import { motion } from "framer-motion";
import MapComponent from "../../../../sharedComponent/MapComponent";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import Import from "../../../../assets/images/ic-Import.svg";

import {
  simpleGetCall,
  simpleGetCallTime,
  simplePostCall,
} from "../../../../api/ApiServices";
import ApiConfig from "../../../../api/ApiConfig";
import { useEffect } from "react";
import Loader from "../../../../sharedComponent/Loader";
import { useTranslation } from "react-i18next";
import { DateDDMMYYYY, getTime } from "../../../../sharedComponent/common";
import { Link, useParams, useNavigate, json } from "react-router-dom";
import { Space, TimePicker } from "antd";
import { Modal, Tooltip } from "react-bootstrap";
import CommonSelect from "../../../../sharedComponent/ReactSelect";
import dayjs from "dayjs";
import { notifyError, notifySuccess } from "../../../../sharedComponent/notify";
import Form from "react-bootstrap/Form";
import NoDataComp from "../../../../sharedComponent/NoDataComp";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const DispatchViewOrder = () => {
  const navigate = useNavigate();
  const {
    sidebar,
    ViewId,
    getTransporatioData,
    customerData,
    socket,
    timeZone,
    imageUrl,
    set_imageUrl
  } = useContext(AppContext);
  const id = ViewId;
  const [loading, setLoading] = useState(false);
  const [pdf_flag, set_pdf_flag] = useState(false);

  // mqttconnections
  const [paramId, setParamId] = useState("");
  const { t, i18n } = useTranslation();
  let customerId = customerData.customer_id; //user_id
  const [orderDetails, setOrderDetails] = useState([]);
  const [liveVehicleDetails, setLiveVehicleDetails] = useState({});
  const [stopsData, setStopsData] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [vehicleList, setVehicleList] = useState([]);
  const [modelstats, setModelstats] = useState(false);
  const [routingData, setRoutingData] = useState({
    trip_start_time: dayjs(new Date()).format("HH:mm:ss"),
    trip_end_time: "",
    vehicle_id: "",
  });
  const [errMsg, setErrMsg] = useState({
    trip_end_time: "",
    trip_start_time: "",
    vehicle_id: "",
  });

  const [OptionDownload, setOptionDownload] = useState("");
  const [pdf_link, set_pdf_link] = useState("");
  const [no_data_found, set_no_data_found] = useState(false);
  const isLastRow = sessionStorage.getItem('isLastRow');
  const ids = {
    pickup_point_id: sessionStorage.getItem('pickup_point_id'),
    dispatch_package_id: localStorage.getItem('dispatch_package_id'),
    pickup_point_trip_id: localStorage.getItem('pickup_point_trip_id'),
  }

  //  invoice tble data 
  const [invoiceTableData, setInvoiceTableData] = useState([]);




  // console.log("sessionstorage_pickup_point_id -->", pickup_point_id)
  console.log(' ids --->', ids)

  // useEffect(() => {
  //   if (id) {
  //     getOrderDetails();
  //   }
  //   // getTransporatioData();
  //   if(timeZone){

  //     getVehicleList();
  //   }
  // }, [id,timeZone]);
  const statusMap = {
    "0": "Order Received",
    "1": "Delivery Person Assigned",
    "2": "Order Dispatched",
    "3": "Ready to Delivery",
    "4": "Payment Done",
    "5": "Order Delivered",
    "6": "Returned",
    "7": "Return Back to Warehouse",
    "8": "Driver Reached For Pickup",
    "9": "Driver Reached For Delivery",
    "10": "Cancelled"
  };
  const handleInvoiceClick = (imageUrl, invoiceTableData, invoiceNo, pickuppoints_details_id) => {
    // console.log("checking the invoice table =========", invoiceTableData);
    localStorage.setItem("invoiceTableData", JSON.stringify(invoiceTableData));
    localStorage.setItem("invioceNo", invoiceNo)
    localStorage.setItem("pickuppoints_details_id", pickuppoints_details_id);
    navigate('/ViewInvoice')

    set_imageUrl(imageUrl);

  }

  // useEffect(() => {
  //   getOrderDetails();


  // }, [])



  // const getOrderDetails = () => {
  //   setLoading(true);
  //   // simpleGetCall(ApiConfig.GET_ORDER_DETAILS + id )
  //   simplePostCall(ApiConfig.GET_DISPATCHEXECUTIVE_VIEW_ORDER_DETAILS ,)
  //     .then((res) => {
  //       if (res.result) {
  //         setOrderDetails(res?.data);
  //         setStopsData(res?.timeLineData);
  //         let vehicle_id = res.data?.trip_vehicle_id;
  //         getLiveVehicleApi({
  //           user_customer_id: Number(customerId),
  //           vehicleId: vehicle_id,
  //         });

  //         getOrderListTime(
  //           [
  //             Number(res?.data?.vendor_warehouse_longitude),
  //             Number(res?.data?.vendor_warehouse_latitude),
  //           ].join(","),
  //           [
  //             Number(res?.data?.dispatch_customer_address_longitude),
  //             Number(res?.data?.dispatch_customer_address_latitude),
  //           ].join(",")
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  // let newId=useParams()
  // let paramID=newId?.id
  // console.log("paramID",paramID);

  // var ID=useParams()
  // var pickup_point_id_to_use_in_api=ID?.pickup_point_id

  // console.log("taleeb_pickup_point_id_to_use_in_api",pickup_point_id_to_use_in_api);

  useEffect(() => {

    getDispatchOrderDetails();

  }, [])


  const getDispatchOrderDetails_with_pdf = () => {
    setLoading(true);
    let body = JSON.stringify({
      pickup_point_id: ids?.pickup_point_id,
      pickup_point_trip_id: ids?.pickup_point_trip_id,
      format: 'pdf'
    }
    )
    // simplePostCall(ApiConfig?.GET_DISPATCH_SINGLE_VEHICLE, JSON.stringify(body))
    simplePostCall(ApiConfig?.GET_DISPATCHEXECUTIVE_VIEW_ORDER_DETAILS, body)
      .then((res) => {

        if (res.result) {
          const firstKey = res.pdf;
          setOrderDetails(res?.data);
          set_pdf_link(firstKey);


          if (res?.data?.length === 0) {
            set_no_data_found(true);
          }


        } else {

          set_no_data_found(true)
        }
      })
      .catch((err) => {
        set_no_data_found(true)
        console?.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDispatchOrderDetails = () => {
    setLoading(true);
    let body = JSON.stringify({
      pickup_point_id: ids?.pickup_point_id,
      pickup_point_trip_id: ids?.pickup_point_trip_id,
      format: ''
    }
    )
    // simplePostCall(ApiConfig?.GET_DISPATCH_SINGLE_VEHICLE, JSON.stringify(body))
    simplePostCall(ApiConfig?.GET_DISPATCHEXECUTIVE_VIEW_ORDER_DETAILS, body)
      .then((res) => {
        if (res.result) {
          // const firstKey = res.pdf;
          setOrderDetails(res?.data);
          // sessionStorage.setItem('pickuppoints_details_id', res?.data[0]?.pickuppoints_details_id)
          // set_pdf_link(firstKey);
          if (res?.data?.length === 0) {
            set_no_data_found(true);
          }


        } else { set_no_data_found(true) }
      })
      .catch((err) => {
        set_no_data_found(true)
        console?.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //  const handleDownloadPdf = () => {

  // if (pdf_link !== ""){
  //   window.open(pdf_link)
  // } 





  // }, [pdfData]);
  const getDispatchOrderDetails_with_pdf_1 = () => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      let body = JSON.stringify({
        pickup_point_id: ids?.pickup_point_id,
        pickup_point_trip_id: ids?.pickup_point_trip_id,
        format: 'pdf'
      });

      simplePostCall(ApiConfig?.GET_DISPATCHEXECUTIVE_VIEW_ORDER_DETAILS, body)
        .then((res) => {
          if (res.result) {
            setOrderDetails(res?.data);
            if (res?.data?.length === 0) {
              set_no_data_found(true);
            }
            resolve(res);  // Resolve the promise when the data is set
          } else {
            set_no_data_found(true);
            reject(new Error('No data found'));
          }
        })
        .catch((err) => {
          set_no_data_found(true);
          console?.log(err);
          reject(err);  // Reject the promise on error
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleDownloadPdf_1 = async () => {
    try {
      const res = await getDispatchOrderDetails_with_pdf_1();

      if (res && res.pdf) {
        const pdf_link = res.pdf;  // Assuming res.pdf is where the PDF link is stored

        const response = await fetch(pdf_link);
        const blob = await response.blob();
        const url = window?.URL?.createObjectURL(new Blob([blob]));

        const a = document.createElement("a");
        a.href = url;

        const fileName = pdf_link.substring(pdf_link.lastIndexOf("/") + 1);
        a.download = fileName;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window?.URL?.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleDownloadPdf = () => {
    getDispatchOrderDetails_with_pdf();

    if (pdf_link) {
      fetch(pdf_link)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window?.URL?.createObjectURL(new Blob([blob]));

          const a = document.createElement("a");
          a.href = url;

          // Extract the file name from the filepath dynamically
          const fileName = pdf_link.substring(pdf_link.lastIndexOf("/") + 1);
          a.download = fileName;

          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window?.URL?.revokeObjectURL(url);
        })
        .catch((error) => console.error("Error downloading file:", error));
    }
  };

  /* const getLiveVehicleApi = (body) => {
    setLoading(true);
    // simplePostCall(ApiConfig?.GET_DISPATCH_SINGLE_VEHICLE, JSON.stringify(body))
    simplePostCall(ApiConfig?.GET_DISPATCHEXECUTIVE_VIEW_ORDER_DETAILS, JSON.stringify(body))
      .then((res) => {
        if (res?.result === true) {
          setLiveVehicleDetails(res?.data[0]);
          setParamId(res.data[0]?.vehicle_imei);
        } else {
          setLiveVehicleDetails({});
        }
      })
      .catch((err) => {
        console?.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }; */

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

  //assign order

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
    //     trip_start_time: "Please Enter  start Time"

    //   });
    //   return;
    // }

    // if ( routingData?.trip_end_time.length === 0) {
    //   setErrMsg({
    //     ...errMsg,
    //     trip_end_time: "Please Enter valid End Time ",

    //   });
    //   return;
    // }
    setLoading1(true);
    let body = JSON.stringify({
      ...routingData,
      order_id: id,
      orderDetails: orderDetails,
      // drowtype: layerTypeSend,
      // drowradius: radius,
      // drowvalue: mapLatLngData,
      timeZone: timeZone,
      vehicle_id: routingData?.vehicle_id,
    });
    simplePostCall(ApiConfig.ADD_MANUAL_ROUTING_VIEW, body)
      .then((res) => {
        setLoading1(false);
        if (res.result) {
          notifySuccess(res.message);
          setModelstats(false);
          getDispatchOrderDetails();
          // getOrderDetails();
          // navigate("/TripManagement");
          setRoutingData({
            trip_end_time: "",
            trip_start_time: "",
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

  const getVehicleList = () => {
    setLoading(true);
    simplePostCall(ApiConfig.MANUAL_VEHICLE_LIST, JSON.stringify({ timeZone: timeZone }))
      .then((res) => {
        setVehicleList(res?.data);
        let vehicles = res?.data;
        var grades = [];
        vehicles?.map((grade, index) => {
          grades?.push({
            label: grade?.vehicle_number,
            value: grade?.vehicle_id,
          });
        });
        setGradeState({ ...gradeState, grades: grades });
      })
      .catch((err) => {
        console?.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  let driver = vehicleList?.filter(
    (driver) => driver.vehicle_id == routingData?.vehicle_id
  )[0];
  const [gradeState, setGradeState] = useState({
    grades: [],
  });
  const handleModel = (props) => {
    setModelstats(props);
  };
  const handleCancle = () => {
    notifySuccess("Order Cancel For Now");
  };

  const getOrderListTime = (startPoint, EndPoint) => {
    simpleGetCallTime(
      `https://routing.openstreetmap.de/routed-car/route/v1/driving/${startPoint};${EndPoint}?overview=false&alternatives=true&steps=false`
    )
      .then((res) => {
        if (res.code == "Ok") {
          const route = res.routes[0];
          // const distance = route.summary.totalDistance; // in meters

          const currentTime = new Date()
            .toLocaleTimeString("en-US", { timeZone, hour12: false })
            .split(" ")[0];
          const time = new Date(Date.now() + route?.duration * 1000)
            .toLocaleTimeString("en-US", { timeZone, hour12: false })
            .split(" ")[0];
          // setEndSendTime(time)

          setRoutingData({ ...routingData, trip_start_time: currentTime, trip_end_time: time });
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
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
        <div id="cx-wrapper" className="View_Orders">
          {loading ? (
            <Loader />
          ) : (
            <>
              {/* <div
                className="main-master-wrapper form_input_main"
                id="View_Dispatch_main"
              > */}
              {/*  <div className="headingDetails">
                  <div className="headingTxt">
                    <p className="heading">{t("Order Summary")}</p>
                  </div>
                  {orderDetails?.dispatch_package_status == 0 && (
                    <div className="innerSelectBox weekCounter selectForm form_input_main">
                      <button
                        className="AddAccidentLink"
                        onClick={() => {
                          getOrderListTime(
                            [
                              Number(orderDetails?.vendor_warehouse_longitude),
                              Number(orderDetails?.vendor_warehouse_latitude),
                            ].join(","),
                            [
                              Number(orderDetails?.dispatch_customer_address_longitude),
                              Number(orderDetails?.dispatch_customer_address_latitude),
                            ].join(",")
                          );
                          handleModel(true);
                        }}
                      >
                        {t("Assign Trip")}
                      </button>
                    </div>
                  )}
                </div> */}

              {/* ====================== Stepper start ===================== */}

              {/* <div className="vertical-stepper-main-wrapper">
                  <div class="">
                    <!-- completed -->
                    <div class="step completed">
                      <div class="v-stepper">
                        <div class="circle">
                          <img src={step1} alt="" />
                        </div>
                        <div class="line"></div>
                      </div>

                      <div class="content">
                        <label className="head">{t("Pick-Up Location")}</label>
                        <p className="Value">
                          {orderDetails?.vendor_warehouse_address ?? "-"}
                        </p>
                        <span className="DispatchSPan">
                          Ordered On{" "}
                          { orderDetails?.dispatch_package_order_datetime &&DateDDMMYYYY(
                            orderDetails?.dispatch_package_order_datetime ?? "-"
                          )}
                          {"  "}
                          {getTime(
                            orderDetails?.dispatch_package_order_datetime ?? "-"
                          )}
                        </span>
                      </div> */}
              {/* ////////////////////////////////Taleeb's code////////////////////////////////////////// */}
              {/*   <div className="content pl-5" >
                          <label className="headGreen ms-3" style={{color:'#8F4300',fontWeight :'500', fontSize:'15px'}}>{t("Schedule ETA" )}</label>
                        <div className="d-flex flex-column">
                        <div>
                        <p className="dateInn fs-12" style={{color:'#8F4300', fontSize:'13.7px'}}>11-12-1970 00:05:01</p>
                        </div>
                       
                        </div>
                         {/*  <p className="dateInn"> {DateDDMMYYYY(tripDetails.trip_date)}{" "}
                            {"  "}
                            {tripDetails.trip_start_time}</p> 
                        </div>
                        <div className="content px-6">
                          <label className="headGreen ms-4 pl-4" style={{color:'#8F4300',fontWeight :'500', fontSize:'15px'}}>{t("Actual ETA")}</label>
                          <div className="d-flex flex-column">
                        <div>
                        <p className="dateInn pl-4" style={{ marginLeft:'0.5rem', color:'#8F4300', fontSize:'13.7px'}}>11-12-1970 00:05:01</p>
                        </div>
                       
                        </div>
                          {/* <p className="dateInn"> {DateDDMMYYYY(tripDetails.trip_date)}{" "}
                            {"  "}
                            {tripDetails.trip_start_time}</p> 
                        </div>*/}

              {/* ////////////////////////////////Taleeb's code////////////////////////////////////////// */}
              {/* </div> */}

              {/* {stopsData?.map((ele, index) => {
                      return (
                        <div class="step completed" key={"stop" + index}>
                          <div class="v-stepper">
                            <div class="circle">
                              <img src={step2} alt="" />
                            </div>
                            <div className="line"></div>
                          </div>
                          

                          <div class="content">
                            <p className="head" style={{ fontSize: "18px", color: "#8f4300", fontWeight: 600 }}>
                              


                                {ele?.dispatch_package_activity_status == "0"
                                        ? "Order Received"
                                        : ele?.dispatch_package_activity_status == "1"
                                        ? "Delivery Person Assigned"
                                        : ele?.dispatch_package_activity_status == "2"
                                        ? "Order Dispatched"
                                        : ele?.dispatch_package_activity_status == "3"
                                        ? "Rready to Delivery"
                                        : ele?.dispatch_package_activity_status == "4"
                                        ? "Payment Done"
                                        : ele?.dispatch_package_activity_status == "5"
                                        ? "Order Delivered"
                                        : ele?.dispatch_package_activity_status == "6"
                                        ? "Returned"
                                        : ele?.dispatch_package_activity_status == "7"
                                        ? "Return Back to Warehouse"
                                        : ele?.dispatch_package_activity_status == "8"
                                        ? "Driver Reached For Pickup "
                                        : ele?.dispatch_package_activity_status == "9"
                                        ? "Driver Reached For Delivery"
                                        : ele?.dispatch_package_activity_status == "10"
                                        ? "cancelled"
                                        : ""} */}

              {/*    {ele?.dispatch_package_activity_status == "0" ? "Order Received":"" }
                                        {ele?.dispatch_package_activity_status == "1" ? "Delivery Person Assigned":"" }
                                        {ele?.dispatch_package_activity_status == "2" ? "Order Dispatched":"" }
                                        {ele?.dispatch_package_activity_status == "3" ? "Rready to Delivery":"" }
                                        {ele?.dispatch_package_activity_status == "4" ? "Payment Done":"" }
                                        {ele?.dispatch_package_activity_status == "5" ? "Order Delivered":"" }
                                        {ele?.dispatch_package_activity_status == "6" ? "Returned":"" }
                                        {ele?.dispatch_package_activity_status == "7" ? "Return Back to Warehouse":"" }
                                        {ele?.dispatch_package_activity_status == "8" ? "Driver Reached For Pickup":"" }
                                        {ele?.dispatch_package_activity_status == "9" ? "Driver Reached For Delivery":"" }
                                        {ele?.dispatch_package_activity_status == "10" ? "cancelled":"" }*/}

              {/* </p> */}

              {/* <span className="DispatchSPan">
                              {ele?.dispatch_package_activity_date}{" "}
                              {ele?.dispatch_package_activity_time}
                            </span>{" "}
                          </div>
                       
                      
                        </div>
                        
                      );
                    })} */}
              {/* <div class="step completed">
                      <div class="v-stepper">
                        <div class="circle">
                          <img src={step1} alt="" />
                        </div>
                        <div class="line"></div>
                      </div>

                      <div class="content">
                        <label className="head">{t("Drop Location")}</label>
                        <p className="Value">
                          {orderDetails?.dispatch_customer_address_address ??
                            "-"}
                        </p>
                   {orderDetails.trip_end_date&&     <span className="DispatchSPan">
                          {t("Expected Delivery by ")}

                          {`${orderDetails?.trip_end_date?DateDDMMYYYY(orderDetails?.trip_end_date):"" }  ${orderDetails?.trip_end_time?orderDetails?.trip_end_time:""}`}
                        </span>}
                      </div>
                      <div className="content pl-2 " >
                          <div className="d-flex flex-column">
                        <div>
                        
                        </div>
                       
                        </div> */}
              {/*  <p className="dateInn"> {DateDDMMYYYY(tripDetails.trip_date)}{" "}
                            {"  "}
                            {tripDetails.trip_start_time}</p> */}
              {/* </div> */}
              {/* <div className="content ">
                          <div className="d-flex flex-column">
                        <div>
                      
                        </div>
                       
                        </div> */}
              {/*  <p className="dateInn"> {DateDDMMYYYY(tripDetails.trip_date)}{" "}
                            {"  "}
                            {tripDetails.trip_start_time}</p> */}
              {/* </div> */}


              {/* </div>
                  </div>
                </div> */}
              {/* ====================== Stepper end ===================== */}
              {/* </div> */}
              {no_data_found && orderDetails.length === 0 && <NoDataComp />}
              {orderDetails.map((orderDetails) => (
                <div className="mb-5">

                  <div
                    className="main-master-wrapper form_input_main"
                    id="View_Dispatch_main"
                  >
                    <div className="headingDetails">
                      <div className="headingTxt">
                        <p className="heading">{t("Order Details")}</p>
                      </div>
                      <div className="leftContent d-flex">
                        <div class="btn-wrapper">
                          {!no_data_found &&
                            <button class="cx-btn-2 mb-1" onClick={handleDownloadPdf_1}>
                              {t("Download PDF")}
                            </button>}
                        </div>



                      </div>
                    </div>


                    {no_data_found ? <NoDataComp />
                      :
                      (


                        <div className="DetailsSec">
                          <div className="row">
                            {/* <div className="col-3">
                      <label className="head">{t("Material Collection Date")}</label>
                      <p className="Value">
                        {orderDetails?.vehicle_number ?? "-"}
                      </p>
                    </div> */}
                            <div className="col-md-3 col-12">
                              <label className="head">{t("Milk Run Vehicle No.")}</label>
                              <p className="Value">
                                {orderDetails?.vehicle_number ?? "-"}
                              </p>
                            </div>
                            <div className="col-md-3 col-12">
                              <label className="head">{t("Milk Run Route")}</label>
                              <p className="Value">{orderDetails?.pickuppoints_details_route ?? "-"}</p>
                            </div>
                            <div className="col-md-3 col-12">
                              <label className="head">{t("Start KM For Milk Run.")}</label>
                              <p className="Value">{orderDetails?.pickuppoints_details_start_kilometer_milk_run ?? "-"}</p>
                            </div>{" "}

                            {/* <div className="col-md-3 col-12">
                                <label className="head">{t("PO No.")}</label>
                                <p className="Value">{orderDetails?.pickuppoints_details_po_no ?? "-"}</p>
                              </div> */}

                            <div className="col-md-3 col-12">
                              <label className="head">{t("Invoice No.")}</label>
                              <p className="Value">
                                {orderDetails?.pickuppoints_details_invoice_no ?? "-"}
                              </p>
                            </div>

                            {/* <div className="col-md-3 col-12">
                                <label className="head">{t("Item Code")}</label>
                                <p className="Value">
                                  {orderDetails?.pickuppoints_details_item_code ?? "-"}
                                </p>
                              </div> */}
                            {/* <div className="col-md-3 col-12">
                                <label className="head">{t("Quantity.")}</label>
                                <p className="Value">
                                  {orderDetails?.pickuppoints_details_quantity ?? "-"}
                                </p>
                              </div> */}
                            <div className="col-md-3 col-12">
                              <label className="head">{t("Basic Value.")}</label>
                              <p className="Value">
                                {orderDetails?.pickuppoints_details_basic_value ?? "-"}
                              </p>
                            </div>

                            <div className="col-md-3 col-12">
                              <label className="head">{t("Value With Taxes.")}</label>
                              <p className="Value">
                                {orderDetails?.pickuppoints_details_value_with_taxes ?? "-"}
                              </p>
                            </div>
                            <div className="col-md-3 col-12">
                              <label className="head">{t("Start KM Supplier")}</label>
                              <p className="Value">
                                {orderDetails?.pickuppoints_details_start_kilometer_supplier ?? "-"}
                              </p>
                            </div>
                            <div className="col-md-3 col-12">
                              <label className="head">{t("End KM Supplier")}</label>
                              <p className="Value">
                                {orderDetails?.pickuppoints_details_end_kilometer_supplier ?? "-"}
                              </p>
                            </div>
                            <div className="col-md-3 col-12">
                              <label className="head">{t("In Time Supplier")}</label>
                              <p className="Value">
                                {orderDetails?.pickuppoints_details_in_time_supplier ?? "-"}
                              </p>
                            </div>
                            <div className="col-md-3 col-12">
                              <label className="head">{t("Out Time Supplier")}</label>
                              <p className="Value">
                                {orderDetails?.pickuppoints_details_out_time_supplier ?? "-"}
                              </p>
                            </div>
                            {isLastRow == 1 &&
                              <>
                                <div className="col-md-3 col-12">
                                  <label className="head">{t("Check In Dispatch Customer")}</label>
                                  <p className="Value">
                                    {orderDetails?.pickuppoints_details_check_in_dcustomer ?? "-"}
                                  </p>
                                </div>
                                <div className="col-md-3 col-12">
                                  <label className="head">{t("Check Out Dispatch Customer")}</label>
                                  <p className="Value">
                                    {orderDetails?.pickuppoints_details_check_out_dcustomer ?? "-"}
                                  </p>
                                </div>
                                <div className="col-md-3 col-12">
                                  <label className="head">{t("End KM Based Location")}</label>
                                  <p className="Value">
                                    {orderDetails?.pickuppoints_details_end_kilometer_based_location ?? "-"}
                                  </p>
                                </div>
                                <div className="col-md-3 col-12">
                                  <label className="head">{t("KM Reading")}</label>
                                  <p className="Value">
                                    {orderDetails?.pickuppoints_details_kilometer_reading ?? "-"}
                                  </p>
                                </div>
                                <div className="col-md-3 col-12">
                                  <label className="head">{t("Material Received By")}</label>
                                  <p className="Value">
                                    {orderDetails?.pickuppoints_details_received_by ?? "-"}
                                  </p>
                                </div>
                                <div className="col-md-3 col-12">
                                  <label className="head">{t("Vehicle Utilization")}</label>
                                  <p className="Value">
                                    {orderDetails?.pickuppoints_details_vehicle_utilization ?? "-"}
                                  </p>
                                </div>
                              </>
                            }
                            {isLastRow == 1 && <div className="col-md-3 col-12">
                              <label className="head">{t("Customer Gate Entery")}</label>
                              <p className="Value">
                                {orderDetails?.pickuppoints_details_vehicle_utilization ?? "-"}
                              </p>
                            </div>}

                            <div className="col-md-4 mt-2">
                              <label className="head">{t("Description")}</label>
                              <p className="Value">
                                {orderDetails?.pickuppoints_details_item_desc ?? "-"}
                              </p>
                            </div>
                            <div className="col-md-3 col-12 mt-2">
                              <label className="head">{t("Remarks")}</label>
                              <p className="Value">
                                {orderDetails?.pickuppoints_details_item_remark ?? "-"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>


                  {no_data_found ? <> </>
                    :
                    (



                      <div
                        className="main-master-wrapper form_input_main"
                        id="View_Dispatch_main"
                      >
                        <div className="headingDetails">
                          <div className="headingTxt">
                            <p className="heading">{t("Uploaded Photos")}</p>
                          </div>
                        </div>
                        <div className="DetailsSec">
                          <div className="row">
                            <div className="invoice-photo-container"> {/* Wrap for clarity */}
                              <label className="head">{t("Invoice Photo")}</label>

                              {orderDetails?.pickuppoints_details_invoice_img?.map((imageUrl, index) => (
                                <div key={index} className="col-md-6 col-lg-6 col-xl-4 col-12">

                                  {/* <Link to="/ViewInvoice"> */}
                                  <img
                                    style={{
                                      width: "23rem",
                                      height: "14rem",
                                      marginTop: "1rem",
                                      objectFit: "cover",
                                      cursor: "pointer"
                                    }}
                                    src={imageUrl}
                                    onClick={() => handleInvoiceClick(imageUrl, orderDetails.items, orderDetails?.pickuppoints_details_invoice_no, orderDetails?.pickuppoints_details_id)}

                                    alt={`Invoice Photo ${index + 1}`}
                                  />
                                  {/* </Link> */}
                                </div>

                              ))}
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-4 col-12">
                              <label className="head">{t("Material Photo")}</label>

                              <div>
                                {orderDetails?.pickuppoints_details_img_item && (
                                  <img
                                    style={{
                                      width: "23rem",
                                      height: "14rem",
                                      marginTop: "1rem",
                                      objectFit: "cover",
                                    }}
                                    src={orderDetails?.pickuppoints_details_img_item
                                      // typeof orderDetails?.pickuppoints_details_img_item ===
                                      // "string"
                                      //   ? `${ApiConfig.BASE_URL}${orderDetails?.pickuppoints_details_img_item}`
                                      //   : orderDetails?.pickuppoints_details_img_item &&
                                      //     URL.createObjectURL(
                                      //       orderDetails?.pickuppoints_details_img_item
                                      //     )
                                    }
                                    alt="img not found"
                                  />
                                )}
                              </div>

                            </div>
                            {isLastRow == 1 &&
                              <div className="col-md-6 col-lg-6 col-xl-4 col-12">
                                <label className="head">{t("Gate Pass Photo")}</label>

                                <div>
                                  {orderDetails?.pickuppoints_details_get_pass_img && (
                                    <img
                                      style={{
                                        width: "23rem",
                                        height: "14rem",
                                        marginTop: "1rem",
                                        objectFit: "cover",
                                      }}
                                      src={orderDetails?.pickuppoints_details_get_pass_img

                                        // typeof orderDetails?.pickuppoints_details_get_pass_img ===
                                        // "string"
                                        //   ? `${ApiConfig.BASE_URL}${orderDetails?.pickuppoints_details_get_pass_img}`
                                        //   : orderDetails?.pickuppoints_details_get_pass_img &&
                                        //     URL.createObjectURL(
                                        //       orderDetails?.pickuppoints_details_get_pass_img
                                        //     )
                                      }
                                      alt="img not found"
                                    />
                                  )}
                                </div>
                              </div>
                            }

                            {isLastRow == 1 &&
                              <div className="col-md-6 col-lg-6 col-xl-4 col-12">
                                <label className="head">{t("Weight Slip Photo")}</label>

                                <div>
                                  {orderDetails?.pickuppoints_details_vehicle_weight_img && (
                                    <img
                                      style={{
                                        width: "23rem",
                                        height: "14rem",
                                        marginTop: "1rem",
                                        objectFit: "cover",
                                      }}
                                      src={orderDetails?.pickuppoints_details_vehicle_weight_img

                                        // typeof orderDetails?.pickuppoints_details_get_pass_img ===
                                        // "string"
                                        //   ? `${ApiConfig.BASE_URL}${orderDetails?.pickuppoints_details_get_pass_img}`
                                        //   : orderDetails?.pickuppoints_details_get_pass_img &&
                                        //     URL.createObjectURL(
                                        //       orderDetails?.pickuppoints_details_get_pass_img
                                        //     )
                                      }
                                      alt="img not found"
                                    />
                                  )}
                                </div>
                              </div>
                            }
                            {/* <div className="col-md-4">
                      <label className="head">
                        {t("Customer Rating")} (*
                        {t("After Delivery of Product")})
                      </label>
                      <div className="d-flex">
                        <img src={fillStar} className="me-1" alt="" />
                        <img src={fillStar} className="me-1" alt="" />
                        <img src={fillStar} className="me-1" alt="" />
                        <img src={borderStar} className="me-1" alt="" />
                        <img src={borderStar} className="me-1" alt="" />
                      </div>
                    </div> */}
                          </div>
                        </div>
                      </div>

                    )
                  }

                </div>
              ))
              }





              {/* <div
                className="main-master-wrapper form_input_main"
                id="View_Dispatch_main"
              >
                <div className="headingDetails">
                  <div className="headingTxt">
                    <p className="heading">{t("Order Details")} </p>
                  </div>
                </div>
                <div className="DetailsSec">
                  <div className="row">
                    <div className="col-3">
                      <label className="head">{t("Order Number")} </label>
                      <p className="Value">
                        {orderDetails?.dispatch_package_order_number ?? "-"}
                      </p>
                    </div>
                    <div className="col-3">
                      <label className="head">{t("Order Date & Time")} </label>
                      <p className="Value">
                        {DateDDMMYYYY(
                          orderDetails?.dispatch_package_order_datetime ?? "-"
                        )}
                        {"  "}
                        {getTime(
                          orderDetails?.dispatch_package_order_datetime ?? "-"
                        )}
                      </p>
                    </div>
                    <div className="col-md-2">
                      <label className="head">{t("Amount")} </label>
                      <p className="Value">
                        {orderDetails.dispatch_package_order_amount ?? "-"}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <label className="head">{t("Payment Type")} </label>
                      <p className="Value">
                        {orderDetails?.dispatch_package_order_payment_mode ??
                          "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div
                className="main-master-wrapper form_input_main"
                id="View_Dispatch_main"
              >
                <div className="headingDetails">
                  <div className="headingTxt">
                    <p className="heading">{t("Trip Details")} </p>
                  </div>
                </div>
                <div className="DetailsSec">
                  <div className="row">
                    <div className="col-3">
                      <label className="head">{t("Trip Name")} </label>
                      <p className="Value">
                        {orderDetails?.trip_name ?? "-"}
                      </p>
                    </div>
                   
                    <div className="col-md-2">
                      <label className="head">{t("Trip Id")} </label>
                      <p className="Value">
                      {orderDetails.trip_id === "" || orderDetails.trip_id === null ?
                       <Link  to={"#"}>
                      {orderDetails.trip_id ?? "-"}
                      </Link> 
                      : <Link  to={"/ViewDispatchTrip/" + orderDetails.trip_id}>
                      {orderDetails.trip_id ?? "-"}
                      </Link>}
                      
                      </p>
                    </div>
                    <div className="col-md-4">
                      <label className="head">{t("Trip Time")} </label>
                      <p className="Value">
                        {orderDetails?.trip_time ??
                          "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div
                className="main-master-wrapper form_input_main"
                id="View_Dispatch_main"
              >
                <div className="headingDetails">
                  <div className="headingTxt">
                    <p className="heading">{t("Assigned Driver & Vehicle Details")} </p>
                  </div>
                </div>
                <div className="DetailsSec">
                  <div className="row">
                    <div className="col-3">
                      <label className="head">{t("Driver Name")} </label>
                      <p className="Value">{orderDetails?.driver_name ?? "-"}</p>
                    </div>
                    <div className="col-3">
                      <label className="head">{t("Driver Contact")} </label>
                      <p className="Value">
                        {orderDetails?.driver_mobile ?? "-"}
                      </p>
                    </div>
                    <div className="col-md-2">
                      <label className="head">{t("Vehicle Category")} </label>
                      <p className="Value">
                        {orderDetails?.vehicle_type_description ?? "-"}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <label className="head">{t("Vehicle Name")} </label>
                      <p className="Value">
                        {orderDetails?.vehicle_number ?? "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* Order menu Map */}
              {/* <div className="DispatchMenuMap">
                <div className="mainMape">
                  <div className="map-main">
                    <MapComponent
                      componentId={"ViewOrders"}
                      data={orderDetails}
                      
                      viewTripVehicle={(orderDetails?.dispatch_package_status==1 ||orderDetails?.dispatch_package_status==2 ||orderDetails?.dispatch_package_status==3||orderDetails?.dispatch_package_status==4)?liveVehicleDetails:{latitude:"",
                        longitude:""}}
                    />
                    <div className="flagComments">
                      <div className="me-2">
                        <img src={flagLine} alt="" />
                        <label>{t("Start Point")} </label>
                      </div>
                      <img src={flagFill} alt="" />
                      <label>{t("End Point")} </label>
                    </div>
                  </div>
                </div>
              </div> */}

            </>
          )}
        </div>

        {loading1 ? (
          <Loader />
        ) : (
          <>
            {" "}
            <div
              className="modal  pm-body"
              style={{
                display: modelstats > 0 ? "block" : "none",
              }}
              id="modal-on-map"
            // onClick={() => {
            //   setMapLatLngData([]);
            // }}
            >
              <Modal.Dialog
                className="popover-main-wrapperHot"
                style={{ top: "20%" }}
              >
                <Modal.Header>
                  <Modal.Title className="headingHot d-flex flex-column">
                    {/* <p style={{color:"#8f4300"}}> */}
                    {t("Assign Order")}
                    {/* </p> */}

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
                        <label className="greenDot"></label>{t("online")}
                      </p>
                      <p>
                        {" "}
                        <label className="redDot"></label>{t("Busy")}
                      </p>
                      <p>
                        {" "}
                        <label className="greyDot"></label>{t("Offline")}
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
                            {t("Vehicle & Driver")}
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
                            selectedValue={routingData?.vehicle_id}
                            selValue={routingData?.vehicle_id}
                            setid={true}
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
                                          single?.metering_status == "T" ? "red" : single?.metering_status == "B"
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
                                    {`${single?.vehicle_number} >> ${single?.user_name
                                      ? single?.user_name
                                      : `${t("No Driver Available")}`
                                      }`}
                                  </div>
                                ),

                                // `${single?.vehicle_number} >> ${single?.user_name?single?.user_name:"No Driver Available"}`
                              }))
                            }
                          />
                          {errMsg?.vehicle_id.length > 0 && (
                            <span className="text-danger">
                              {errMsg?.vehicle_id}
                            </span>
                          )}
                          <Form.Control.Feedback>
                            {t("Please Select Vehicle...")}
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      {/* <div className="col-md-12  form_input_main">

                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Driver with vehicle")}
                      </Form.Label>
                   
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
                              allowClear={true}
                              value={
                                routingData?.trip_start_time &&
                                dayjs(routingData?.trip_start_time, "HH:mm:ss")
                              }
                              showNow={false}
                              // showNow={()=>{
                              //      const currentTime = new Date()
                              //     .toLocaleTimeString("en-US", { timeZone, hour12: false })
                              //    .split(" ")[0];
                              //     setRoutingData({ ...routingData, trip_start_time:currentTime, });
                              //                         }}
                    // locale={}
                              onChange={(e) => {
                                if (e) {
                                  const currentTime = dayjs();
                                  const selectedTime = dayjs(
                                    e.format("HH:mm:ss"),
                                    "HH:mm:ss"
                                  );
                                  const differenceInMinutes = selectedTime?.diff(
                                    currentTime,
                                    "minute"
                                  );
                                  if (
                                    selectedTime?.isAfter(currentTime) ||
                                    selectedTime?.isSame(currentTime) ||
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
                                      trip_start_time: "",
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
                              value={
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
                            handleModel(false);
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
                        <button
                          type="button"
                          onClick={() => handalevalidation()}
                          className="cx-btn-2"
                        >
                          {t("Assign Trip")}
                        </button>
                      </div>
                    </Modal.Footer>
                  </Form>
                </Modal.Body>
              </Modal.Dialog>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default DispatchViewOrder;

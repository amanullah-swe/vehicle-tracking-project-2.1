import { React, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import Loader from "../../../../sharedComponent/Loader";

import {
  simpleGetCall,
  simpleGetCallTime,
  simplePostCall, multipartPostCall
} from "../../../../api/ApiServices";
import ApiConfig from "../../../../api/ApiConfig";
import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { DateDDMMYYYY, getTime } from "../../../../sharedComponent/common";
import { Link, useParams } from "react-router-dom";
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

const ViewInvoice = () => {
  const [binary_image, set_binary_image] = useState('');

  const invoiceTableData = JSON.parse(localStorage.getItem("invoiceTableData"));
  const iniTialInvoiceNumber = localStorage.getItem("invioceNo")

  // console.log(invoiceTableData);
  const ids = {
    pickup_point_id: sessionStorage.getItem('pickup_point_id'),
    dispatch_package_id: localStorage.getItem('dispatch_package_id'),
    pickup_point_trip_id: localStorage.getItem('pickup_point_trip_id'),
  }

  const totalRate = invoiceTableData.reduce((acc, item) => {
    return acc + (parseFloat(item.item_rate) * parseFloat(item.item_quantity));
  }, 0);
  // console.log("checking===========", totalRate);

  console.log(totalRate.toFixed(4)); // Total rate with 4 decimal points

  const [invoiceTableDataState, setInvoiceTableDataState] = useState(invoiceTableData);


  const [deleveryDetails_new, setDeleveryDetails_new] = useState({
    device_new: "web",
    time_new: dayjs(new Date()).format("HH:mm:ss"),
    dispatch_package_order_datetime_new: new Date(),
    milk_run_vehicle_no: "",
    escort_name: "",
    milk_run_route: "",
    start_km_for_milk_run: "",
    supplier_name: "",
    po_no: "",
    invoice_no: "",
    item_code: "",
    quantity: "",
    basic_value: "",
    value_with_taxes: "",
    photo_of_material: "",
    start_km_supplier: "",
    end_km_supplier: "",
    in_time_supplier: "",
    out_time_supplier: "",
    check_in_dispatch_customer: "",
    check_out_dispatch_customer: "",
    end_km_based_location: "",
    km_reading: "",
    material_received_by: "",
    vehicle_utilization: "",
    customer_gate_entery: "",
    description: "",
    remark: "",
    invoice_photo: "",
    material_photo: "",
    gate_pass_photo: "",
    vehicle_weight_slip_photo: "",
    pick_up_address: "",
    delivery_address: "",
    start_trip_with_start_time: "",
    end_trip_with_end_time: "",
  });
  const {
    sidebar,
    ViewId,
    getTransporatioData,
    customerData,
    socket,
    timeZone,
    imageUrl,
    set_imageUrl,
    invoice_details, set_invoice_details
  } = useContext(AppContext);
  const id = ViewId;
  const [loading_new, set_loading_new] = useState(false);
  const [loading, setLoading] = useState(false);
  //  const [invoice_details , set_invoice_details] = useState([])
  const [invoice_item, set_invoice_item] = useState([])
  const navigate = useNavigate();
  // mqttconnections
  const [paramId, setParamId] = useState("");
  const { t, i18n } = useTranslation();
  let customerId = customerData.customer_id; //user_id
  const [orderDetails, setOrderDetails] = useState({});
  const [liveVehicleDetails, setLiveVehicleDetails] = useState({});
  const [stopsData, setStopsData] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [vehicleList, setVehicleList] = useState([]);
  const [modelstats, setModelstats] = useState(false);
  const [loader, setLoader] = useState(false);
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

  var ID = useParams()
  var pickup_point_id_to_use_in_api = ID?.pickup_point_id



  const getInvoiceDetails = () => {
    fetch('https://i.ibb.co/3cLw7Mb/IMG-20240513-WA0005.jpg')
      .then(res => res.blob())
      .then(blob => {
        set_binary_image(blob);
        console.log('bbb--->', blob)

      })
      .catch(error => console.error('Error fetching image:', error));

    // const formData = new FormData();
    // formData.append('img_url', binary_image);
    //     multipartPostCall(ApiConfig?.GET_INVOIC_DETAILS, formData )
    //       .then((res) => {

    //         if (res.success) {
    //         set_invoice_details(res)
    //         set_invoice_item(res?.invoice?.items)

    //         console.log('t_response ---> ', invoice_details)
    //         console.log('t_invoice_item ---> ', invoice_item)
    //         if(res?.data?.length === 0 ){
    //           set_no_data_found(true);
    //         }


    //     }})
    //       .catch((err) => {
    //         console?.log(err);
    //       })
    //       .finally(() => {
    //         setLoading(false);
    //       });
  };

  useEffect(() => {
    if (imageUrl) {
      const formData = new FormData();
      formData.append('image_url', imageUrl);

      multipartPostCall(ApiConfig?.GET_INVOIC_DETAILS, formData)
        .then((res) => {
          if (res.success) {
            set_invoice_details(res);
            set_invoice_item(res?.invoice?.items);
            set_loading_new(false)

            // console.log('t_response ---> ', invoice_details);
            // console.log('t_invoice_item ---> ', invoice_item);
            if (res?.data?.length === 0) {
              // set_no_data_found(true);
            }
          }
        })
        .catch((err) => {
          console?.log(err);
          set_loading_new(false)
        })
        .finally(() => {
          setLoading(false);
          set_loading_new(false)
        });
    }
  }, []);

  // useEffect(() => {
  //   getInvoiceDetails();
  // }, []);

  /* const fetchImageAndSend = (imgUrl) => {
  
    fetch(imgUrl)
      .then((response) => {
    
        return response.blob();
        console.log("ppppppp" ,response.blob)
      })
      .then((blob) => {
        console.log("bbbbbb--->" ,blob)
      
        const formData = new FormData();
        formData.append('img_url', blob, 'image.jpg');
  
       
        multipartPostCall(ApiConfig?.GET_INVOIC_DETAILS, formData)
          .then((res) => {
            if (res.success) {
              set_invoice_details(res);
              set_invoice_item(res?.invoice?.items);
            }
          })
          .catch((error) => {
            console.error('Error sending image data:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
      });
  }; */




  const fetchImg = () => {
    fetch('https://i.ibb.co/3cLw7Mb/IMG-20240513-WA0005.jpg')
      .then(res => res.blob())
      .then(blob => {
        console.log('bbb--->', blob)
        set_binary_image(blob);
      })
      .catch(error => console.error('Error fetching image:', error));
  }


  const handleEditInvoice = () => {
    navigate("/EditInvoice");
    // getInvoiceDetails();

  }






  // const handleDownloadPdf = () => {
  //   fetch(pdf_link)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(new Blob([blob]));

  //       const a = document.createElement("a");
  //       a.href = url;

  //       // Extract the file name from the filepath dynamically
  //       const fileName = pdf_link.substring(pdf_link.lastIndexOf("/") + 1);
  //       a.download = fileName;

  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //       window.URL.revokeObjectURL(url);
  //     })
  //     .catch((error) => console.error("Error downloading file:", error));
  // };

  /* const getLiveVehicleApi = (body) => {
    setLoading(true);
    // simplePostCall(ApiConfig?.GET_DISPATCH_SINGLE_VEHICLE, JSON.stringify(body))
    simplePostCall(ApiConfig?.GET_DISPATCHEXECUTIVE_VIEW_ORDER_DETAILS, JSON.stringify(body))
      .then((res) => {
        if (res?.result === true) {
          setLiveVehicleDetails(res?.data?.[0]);
          setParamId(res.data?.[0]?.vehicle_imei);
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
          setLiveVehicleDetails(data?.[0]);
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
  )?.[0];
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
          const route = res.routes?.[0];
          // const distance = route.summary.totalDistance; // in meters

          const currentTime = new Date()
            .toLocaleTimeString("en-US", { timeZone, hour12: false })
            .split(" ")?.[0];
          const time = new Date(Date.now() + route?.duration * 1000)
            .toLocaleTimeString("en-US", { timeZone, hour12: false })
            .split(" ")?.[0];
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
  const [totalSum, setTotalSum] = useState('');
  useEffect(() => {
    let sum = 0;
    invoice_details?.invoice?.[0]?.items.forEach(item => {
      const splitItems = item.item.split(' '); // Split the item string by spaces
      const itemEightValue = parseFloat(splitItems[8]); // Parse splitItems[8] as float
      sum += itemEightValue;
    });
    setTotalSum(sum);
  }, [invoice_details]);





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
          {loading_new ? (
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

              <div
                className="main-master-wrapper form_input_main"
                id="View_Dispatch_main"
              >
                <div className="headingDetails">
                  <div className="headingTxt">
                    <p className="heading">{t("Invoie Details")}</p>
                    {/* <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Gate Pass")}
                      </Form.Label>
                      <Form.Control
                      required
                        accept="image/png, image/gif, image/jpeg"
                        type="file"
                        placeholder="Browse"
                        name="gate_pass_photo"
                        onChange={(e) => {
                          setDeleveryDetails_new({
                            ...deleveryDetails_new,
                            gate_pass_photo: e.target.files?.[0],
                          });
                        }}
                      /> </div> */}
                  </div>
                  <div className="leftContent d-flex">
                    <div class="btn-wrapper">
                      <button class="cx-btn-2 mb-1" onClick={handleEditInvoice}>
                        {t("Edit Invoice")}
                      </button>
                    </div>



                  </div>
                </div>


                {no_data_found ? <NoDataComp />
                  :
                  (


                    <div className="DetailsSec">
                      <div className="row">
                        {/* <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                      <label className="head">{t("Material Collection Date")}</label>
                      <p className="Value">
                        {orderDetails?.vehicle_number ?? "-"}
                      </p>
                    </div> */}
                        <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                          <label className="head">{t("Name : ")}</label>
                          <p className="Value">
                            {invoice_details?.invoice?.[0]?.name}
                          </p>
                        </div>
                        {/* <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                      <label className="head">{t("Date : ")}</label>
                      <p className="Value">
                        {invoice_details?.vehicle_id ?? "01-01-2024"}
                      </p>
                    </div> */}
                        <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                          <label className="head">{t("Challan No :")}</label>
                          <p className="Value">{invoice_details?.invoice?.[0]?.challanNo /* ?? "560F14700123" */}</p>
                        </div>
                        <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                          <label className="head">{t("Challan Date :")}</label>
                          <p className="Value">{invoice_details?.invoice?.[0]?.challanDt /* ?? "20-02-2024" */}</p>
                        </div>{" "}
                        <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                          <label className="head">{t("Supplier Invoice No :")}</label>
                          <p className="Value">{iniTialInvoiceNumber ? iniTialInvoiceNumber : "" /* ?? "23240236" */}</p>
                        </div>

                        <div className="col-12 col-md-4 mt-2">
                          <label className="head">{t("To :")}</label>
                          <p className="Value">
                            {invoice_details?.invoice?.[0]?.to /* ?? "WIPRO PARI PRIVATE LIMITED" */}

                          </p>
                        </div>
                        <div className="col-12 col-md-4 mt-2">
                          <label className="head">{t("From :")}</label>
                          <p className="Value">
                            {invoice_details?.invoice?.[0]?.from /* ?? "WIPRO PARI PRIVATE LIMITED" */}

                          </p>
                        </div>

                        <div className="col-12">

                          <div
                          // className="main-master-wrapper mt-2 "
                          // id="scroll_insideThe_Padding3"
                          >
                            {loader ? (
                              <Loader />
                            ) : (
                              <div
                                // id="scroll_insideThe_Padding3"
                                // onScroll={(e) => {
                                //   setBottom1(e ? true : false);
                                //   const bottom =
                                //     e.target.scrollHeight - e.target.scrollTop ===
                                //     e.target.clientHeight;
                                //   if (bottom1 && bottom && last_page !== true) {
                                //     holidaysAllList(page + 1);
                                //     setPage(page + 1);
                                //   }
                                // }}
                                className="row"
                              >

                                <div className="table-responsive">
                                  <table className="holiday-table table" >
                                    <thead className="ht-head text-center">
                                      <tr>
                                        <td>{t("Sr.No.")}</td>
                                        <td>{t("Item Code")}</td>
                                        <td>{t("Item Description")}</td>
                                        <td>{t("UM")}</td>
                                        <td>{t("PO No")}</td>
                                        {/* <td>{t("Sr No")}</td> */}
                                        <td>{t("Quantity")}</td>
                                        <td>{t("Rate")}</td>

                                      </tr>
                                    </thead>
                                    <tbody className="ht-body text-center">

                                      {true && true ? (
                                        // invoice_details?.invoice?.[0]?.items.map((item, index) => {
                                        //const splitItems = item.item.split(' '); // Split the item string by spaces


                                        ///////////////////////////////new code////////////////////////////////////////////////////////////////
                                        // Assume that the description starts at index 2 and ends at the second to last element
                                        //const itemDescription = splitItems.slice(2, -5).join(' '); // Adjust -6 based on your data
                                        //  const remainingItems = splitItems.slice(-5); // Adjust -6 based on your data
                                        ////////////////////////////////////////////////////////////////////////////////////
                                        invoiceTableDataState.map((item, index) => {
                                          return (
                                            <tr className="table-row-custom" key={"listadat" + index}>
                                              {/* Render the first split item in a single <td> */}
                                              <td>{index + 1}</td>
                                              <td>{item?.item_code}</td>
                                              <td>{item?.item_description}</td>
                                              <td>{item?.item_um ? item?.item_um : ""}</td>
                                              <td>{item?.item_pono}</td>
                                              {/* <td>2</td> */}
                                              <td>{item?.item_quantity}</td>
                                              <td>{item?.item_rate}</td>
                                              {/* <td>{splitItems[0]}</td>
                                              <td>{splitItems[1]}</td>
                                              <td>{itemDescription}</td>
                                              {remainingItems.map((item, idx) => (
                                                <td key={idx}>{item}</td>
                                              ))} */}

                                            </tr>
                                          );
                                        })
                                      ) : (
                                        <tr className="text-danger d-flex justify-content-center ">
                                          <td colSpan={6}>
                                            <div className="w-100">
                                              {" "}
                                              <NoDataComp />
                                            </div>
                                          </td>
                                        </tr>
                                      )}

                                      {/* <tr>
                                        <td>1</td>
                                        <td>PRV73D125065</td>
                                        <td>Float Bracket</td>
                                        <td>NO</td>
                                        <td>23PIN2638612</td>

                                        <td>1</td>
                                        <td>1.000</td>
                                        <td>1194.0000</td>
                                      </tr>
                                      <tr>
                                        <td>1</td>
                                        <td>PRV73D125016</td>
                                        <td>Clamp Pad</td>
                                        <td>NO</td>
                                        <td>23PIN2638612</td>

                                        <td>1</td>
                                        <td>1.000</td>
                                        <td>194.0000</td>
                                      </tr> */}

                                    </tbody>
                                    <tfooter className="bg-primary text-end" >

                                    </tfooter>
                                  </table>
                                </div>
                              </div>
                            )}

                            {/* {holidayData?.length > 0 && (
                              <Pagenation length={holidayData?.length} total={total_count} />
                            )} */}
                          </div>
                          <div className="d-flex justify-content-end mt-2" >
                            <div className="Value"> Total Value :  {totalRate} </div>
                            <div className="Value mx-3">  </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-4"> {/* Adjust col size based on desired layout */}
                              <label className="head">{t("Finetechnik Global Engeneering LLP")}</label>
                              <p className="Value">
                                {orderDetails?.pickuppoints_details_item_desc ?? "-"}
                              </p>
                            </div>
                            <div className="col-12 col-md-4"> {/* Adjust col size based on desired layout */}
                              <label className="head">{t("Prepared By :")}</label>
                              <p className="Value">
                                {orderDetails?.pickuppoints_details_item_desc ?? "-"}
                              </p>
                            </div>
                            <div className="col-12 col-md-4"> {/* Adjust col size based on desired layout */}
                              <label className="head">{t("Recieved By :")}</label>
                              <p className="Value">
                                {orderDetails?.pickuppoints_details_item_desc ?? "-"}
                              </p>
                            </div>
                          </div>



                        </div>

                      </div>
                    </div>
                  )}
              </div>


              {/* {no_data_found ? <> </>
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
                    <div className="col-4">
                      <label className="head">{t("Invoice Photo")}</label>
                      
<div>
              {orderDetails?.pickuppoints_details_invoice_img && (
                        <img
                          style={{
                            width: "23rem",
                            height: "14rem",
                            marginTop: "1rem",
                            objectFit: "cover",
                          }}
                          src={
                            typeof orderDetails?.pickuppoints_details_invoice_img ===
                            "string"
                              ? `${ApiConfig.BASE_URL}${orderDetails?.pickuppoints_details_invoice_img}`
                              : orderDetails?.pickuppoints_details_invoice_img &&
                                URL.createObjectURL(
                                  orderDetails?.pickuppoints_details_invoice_img
                                )
                          }
                          alt="img not found"
                        />
                      )}
                      </div>

                   


                    </div>
                    <div className="col-4">
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
                          src={
                            typeof orderDetails?.pickuppoints_details_img_item ===
                            "string"
                              ? `${ApiConfig.BASE_URL}${orderDetails?.pickuppoints_details_img_item}`
                              : orderDetails?.pickuppoints_details_img_item &&
                                URL.createObjectURL(
                                  orderDetails?.pickuppoints_details_img_item
                                )
                          }
                          alt="img not found"
                        />
                      )}
                      </div>

                    </div>
                  
                    <div className="col-4">
                      <label className="head">{t("Gate Pass Photo")}</label>
                      
<div>
            {orderDetails?.pickuppoints_details_img_item && (
                        <img
                          style={{
                            width: "23rem",
                            height: "14rem",
                            marginTop: "1rem",
                            objectFit: "cover",
                          }}
                          src={
                            typeof orderDetails?.pickuppoints_details_get_pass_img ===
                            "string"
                              ? `${ApiConfig.BASE_URL}${orderDetails?.pickuppoints_details_get_pass_img}`
                              : orderDetails?.pickuppoints_details_get_pass_img &&
                                URL.createObjectURL(
                                  orderDetails?.pickuppoints_details_get_pass_img
                                )
                          }
                          alt="img not found"
                        />
                      )}
</div>
                    </div>
                  
                  </div>
                </div>
              </div>

) } */}






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
                              //    .split(" ")?.[0];
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

export default ViewInvoice;

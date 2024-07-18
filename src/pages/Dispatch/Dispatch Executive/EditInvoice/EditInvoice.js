import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";
import CommonDatePicker from '../../../../sharedComponent/CommonDatePicker'
import { latestDate } from "../../../../sharedComponent/common";
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
  multipartPostCall
} from "../../../../api/ApiServices";
import ApiConfig from "../../../../api/ApiConfig";
import { useEffect } from "react";
import Loader from "../../../../sharedComponent/Loader";
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

const EditInvoice = () => {

  const invoiceTableData = JSON.parse(localStorage.getItem("invoiceTableData"));
  // console.log(invoiceTableData);
  const [invoiceTableDataState, setInvoiceTableDataState] = useState(invoiceTableData);
  const iniTialInvoiceNumber = localStorage.getItem("invioceNo")
  const [invoiceNumber, setInvoiceNumber] = useState(iniTialInvoiceNumber ? iniTialInvoiceNumber : "");
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
  const [loading, setLoading] = useState(false);

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
  // const [invoice_no, set_invoice_no] = useState('')
  const pickuppoints_details_id = localStorage.getItem('pickuppoints_details_id');
  const [invoice_no, set_invoice_no] = useState(invoice_details?.invoice?.[0]?.SuplrInvNo);
  // console.log('invoice_no-->', invoice_details?.invoice?.[0]?.SuplrInvNo)

  // const [invoice_data, set_invoice_data] = useState ({
  //   date :'01-01-2024',
  // //  date : new Date(),
  //   challan_no : '560F14700123',
  //   challan_date : "20-02-2024",
  //   sup_invoice_no : '23240236',
  //   to_address : 'WIPRO PARI PRIVATE LIMITED GATE NO 436 PUNE BANGALORE HIGHWAY',
  //   from_address : 'WIPRO PARI PRIVATE LIMITED GATE NO 436 PUNE BANGALORE HIGHWAY',
  //   sr_no_1 : '1',
  //   sr_no_2 : '1',
  //   item_code : 'PRV73D125065',
  //   item_description: 'Float Bracket',
  //   um : 'NO', 
  //   po_no : '23PIN2638612',
  //   quantity :'1.000',
  //   rate : '1194.0000',

  // })
  const [invoice_data, set_invoice_data] = useState({})
  useEffect(() => {
    set_invoice_data(invoice_details);
    // set_invoice_no(invoice_details?.0.SuplrInvNo)
    // console.log('invoice_data-->', invoice_no)
  }, [invoice_details])

  const [binary_image, set_binary_image] = useState('');
  // const [invoice_details , set_invoice_details] = useState([])
  const [invoice_item, set_invoice_item] = useState([])
  const getInvoiceDetails = () => {
    fetch('https://i.ibb.co/3cLw7Mb/IMG-20240513-WA0005.jpg')
      .then(res => res.blob())
      .then(blob => {
        set_binary_image(blob);
        console.log('bbb--->', blob)

      })
      .catch(error => console.error('Error fetching image:', error));
  }
  useEffect(() => {
    if (imageUrl) {
      const formData = new FormData();
      formData.append('img_url', imageUrl);

      multipartPostCall(ApiConfig?.GET_INVOIC_DETAILS, formData)
        .then((res) => {
          if (res.success) {
            set_invoice_details(res);
            set_invoice_item(res?.invoice?.items);

            console.log('t_response ---> ', invoice_details);
            // console.log('t_invoice_item ---> ', invoice_item);
            if (res?.data?.length === 0) {
              set_no_data_found(true);
            }
          }
        })
        .catch((err) => {
          console?.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [imageUrl]);
  // useEffect(() => {
  //   getInvoiceDetails();
  // }, []);
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

  // console.log("taleeb_pickup_point_id_to_use_in_api",pickup_point_id_to_use_in_api);

  useEffect(() => {

    getDispatchOrderDetails();

  }, [])


  const getDispatchOrderDetails = () => {
    setLoading(true);
    let body = JSON.stringify({
      pickup_point_id: pickup_point_id_to_use_in_api,
    }
    )
    // simplePostCall(ApiConfig?.GET_DISPATCH_SINGLE_VEHICLE, JSON.stringify(body))
    simplePostCall(ApiConfig?.GET_DISPATCHEXECUTIVE_VIEW_ORDER_DETAILS, body)
      .then((res) => {
        if (res.result) {
          const firstKey = res.pdf;
          setOrderDetails(res?.data[0]);
          set_pdf_link(firstKey);
          if (res?.data?.length === 0) {
            set_no_data_found(true);
          }


        }
      })
      .catch((err) => {
        console?.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleViewInvoice = () => {

    invoiceUpdate();


  }

  function invoiceUpdate() {
    // console.log("checking ==========", invoiceTableDataState);

    let body = JSON.stringify({
      pickuppoints_details_invoice_no: invoiceNumber,
      pickuppoints_details_id: pickuppoints_details_id ? pickuppoints_details_id : null,
      // pickuppoints_details_item_code: null,
      pickuppoints_details_po_no: invoice_data?.po_no,
      // pickuppoints_details_quantity: null,
      // pickuppoints_details_basic_value: null,
      // pickuppoints_details_value_with_taxes: null,
      // pickuppoints_details_item_desc: null,
      // pickuppoints_details_item_remark: null,
      items: JSON.stringify(invoiceTableDataState)
    }
    )
    simplePostCall(ApiConfig.UPDATE_INVOIC_DETAILS, body)
      .then(data => {
        console.log('UPdatedata--->', data)
        if (data?.result) {
          navigate('/DispatchViewOrder')
          notifySuccess(data?.message)
          // setDeleteModal(false)
          // getVechicleAccident(1)
          // setPage(1)
        } else {
          notifyError(data?.message)
        }
      })
      .catch(error => {
        console.log('api response-->', error)
      })
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
  var date = new Date();




  const handleTableValueChange = (e, index) => {
    const { name, value } = e.target;
    setInvoiceTableDataState(prev => {
      const data = [...prev];
      const item = {
        ...data[index],
        [name]: value,
      }

      data[index] = {
        ...item
      }
      return data;
    })
  }



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


              <div
                className="main-master-wrapper form_input_main"
                id="View_Dispatch_main"
              >
                <div className="headingDetails">
                  <div className="headingTxt">
                    <p className="heading">{t("Edit Invoice")}</p>
                  </div>
                  <div className="leftContent d-flex">
                    <div class="btn-wrapper">
                      <button class="cx-btn-2 mb-1" onClick={handleViewInvoice}>
                        {t("Update Invoice")}
                      </button>
                    </div>



                  </div>
                </div>


                {no_data_found ? <NoDataComp />
                  :
                  (


                    <div className="DetailsSec">
                      <div className="form-wrapper">

                        <Form
                          noValidate
                        // validated={validated}
                        // onSubmit={(e) => handleSubmit(e, "add")}
                        >
                          <div className="row">
                            {/* <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                      <label className="head">{t("Material Collection Date")}</label>
                      <p className="Value">
                        {orderDetails?.vehicle_number ?? "-"}
                      </p>
                    </div> */}
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                {/* <Form.Label>{t("Date : ")}</Form.Label> */}
                                <Form.Label>{t("Name : ")}</Form.Label>
                                <Form.Control
                                  disabled={true}
                                  required
                                  type="text"
                                  placeholder={t("Enter Date")}
                                  onChange={(e) =>
                                    set_invoice_data({
                                      ...invoice_data,
                                      date: e.target.value,
                                    })
                                  }
                                  //  value={invoice_data?.date}
                                  value={invoice_details?.invoice?.[0]?.name}
                                />
                                {/* <div className="innerSelectBox weekCounter datepicker-main">
                       <CommonDatePicker
                           dateKey="dispatch_package_order_datetime"
                           setDate={set_invoice_data}
                           data={invoice_data}
                           minDate={date}
                         />
                      </div> */}
                                {/* <p className="Value">
                        {orderDetails?.vehicle_id ?? "01-01-2024"}
                      
                      </p> */}
                              </Form.Group>
                            </div>

                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>{t("Challan No : ")}</Form.Label>
                                <Form.Control
                                  disabled={true}
                                  required
                                  type="text"
                                  placeholder={t("Enter Challan No")}
                                  onChange={(e) =>
                                    set_invoice_data({
                                      ...invoice_data,
                                      challan_no: e.target.value,
                                    })
                                  }
                                  // value={invoice_data?.challan_no}
                                  value={invoice_details?.invoice?.[0]?.challanNo}


                                />

                                {/* <p className="Value">
                        {orderDetails?.vehicle_id ?? "01-01-2024"}
                      
                      </p> */}
                              </Form.Group>
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>{t("Challan Date : ")}</Form.Label>
                                <Form.Control
                                  disabled={true}
                                  required
                                  type="text"
                                  placeholder={t("Enter Challan Date")}
                                  onChange={(e) => {
                                    set_invoice_data({
                                      ...invoice_data,
                                      challan_date: e.target.value
                                    })
                                  }}
                                  // value={invoice_data?.challan_date}
                                  value={invoice_details?.invoice?.[0]?.challanDt}
                                />

                                {/* <p className="Value">
                        {orderDetails?.vehicle_id ?? "01-01-2024"}
                      
                      </p> */}
                              </Form.Group>
                            </div>{" "}
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>{t("Supplier Invoice No : ")}</Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder={t("Enter Supplier Invoice No")}
                                  onChange={(e) => {
                                    setInvoiceNumber(e.target.value);
                                    set_invoice_no(e.target.value)
                                  }}
                                  value={invoiceNumber}
                                />

                                {/* <p className="Value">
                        {orderDetails?.vehicle_id ?? "01-01-2024"}
                      
                      </p> */}
                              </Form.Group>
                            </div>

                            <div className="col-12 col-md-4 mt-2">
                              {/* <label className="head">{t("To :")}</label>
  <p className="Value">
    {orderDetails?.pickuppoints_details_item_desc ?? "WIPRO PARI PRIVATE LIMITED"}
    <br />
    {"GATE NO 436"}
    <br />
    {"PUNE BANGALORE HIGHWAY"}
  </p> */}
                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>{t("To")}</Form.Label>
                                <Form.Control
                                  disabled={true}
                                  as="textarea"
                                  rows={6}
                                  required
                                  placeholder={t("Enter To Address...")}
                                  onChange={(e) =>
                                    set_invoice_data({
                                      ...invoice_data,
                                      to_address: e.target.value,
                                    })
                                  }
                                  //  value={invoice_data?.to_address}
                                  value={invoice_details?.invoice?.[0]?.to}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {t("Please Enter Address")}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </div>
                            <div className="col-12 col-md-4 mt-2">
                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>{t("From")}</Form.Label>
                                <Form.Control
                                  disabled={true}
                                  as="textarea"
                                  rows={6}
                                  required
                                  placeholder={t("Enter From Address...")}
                                  onChange={(e) => {
                                    set_invoice_data({
                                      ...invoice_data,
                                      from_address: e.target.value
                                    })
                                  }}
                                  //  value={invoice_data?.from_address}
                                  value={invoice_details?.invoice?.[0]?.to}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {t("Please Enter Address")}
                                </Form.Control.Feedback>
                              </Form.Group>
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
                                            <td width='6%'>{t("Sr.No.")}</td>
                                            <td width='20%'>{t("Item Code")}</td>
                                            <td width='20%'>{t("Item Description")}</td>
                                            <td width='8%'>{t("UM")}</td>
                                            <td width='20%'>{t("PO No")}</td>
                                            {/* <td width='6%'>{t("Sr.No")}</td> */}
                                            <td width='10%'>{t("Quantity")}</td>
                                            <td width='10%'>{t("Rate")}</td>

                                          </tr>
                                        </thead>
                                        <tbody className="ht-body text-center">
                                          {/* {holidayData && holidayData?.length > 0 ? (
                                            holidayData.map((listdata, index) => {
                                              return (
                                                <tr
                                                  className="table-row-custom"
                                                  key={"listadat" + index}
                                                >
                                                  <td>{index + 1}</td>
                                                  <td>{listdata.holiday_name}</td>
                                                  <td>{DateDDMMYYYY(listdata.holiday_date)}</td>
                                                  <td>{listdata.holiday_desc}</td>
                                                  <td>{listdata.holiday_status}</td>
                                                  {userRole === "customer" ||
                                                    (accessRights &&
                                                      accessRights?.rights_manage_holiday) ? (
                                                    <td>
                                                      <Link
                                                        to={"/AddHolidays/" + listdata.holiday_id}
                                                      >
                                                        <img src={edit_icon} alt="" />
                                                      </Link>
                                                      <Link
                                                        to="#"
                                                        onClick={() => {
                                                          setHolidayDeleteID(listdata.holiday_id);
                                                          handleShow();
                                                        }}
                                                      >
                                                        <img src={delete_icon} alt="" />
                                                      </Link>
                                                    </td>
                                                  ) : null}
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
                                          )} */}

                                          {/* {console.log('invoice_details--->', invoice_details)} */}

                                          {true && true ? (
                                            invoiceTableDataState.map((item, index) => {
                                              return (
                                                <tr className="table-row-custom" key={"listadat" + index}>
                                                  <td >
                                                    <input
                                                      type="text"
                                                      disabled={false}
                                                      className='input_style'
                                                      value={index + 1}
                                                    // onChange={(e) => handleTableValueChange(e, index)}
                                                    /></td>
                                                  <td >
                                                    <input
                                                      type="text"
                                                      disabled={false}
                                                      className='input_style'
                                                      value={item.item_code}
                                                      name="item_code"
                                                      onChange={(e) => handleTableValueChange(e, index)}
                                                    />
                                                  </td>
                                                  <td >
                                                    <input
                                                      type="text"
                                                      disabled={false}
                                                      className='input_style'
                                                      value={item?.item_description}
                                                      name="item_description"
                                                      onChange={(e) => handleTableValueChange(e, index)}
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="text"
                                                      disabled={false}
                                                      className='input_style'
                                                      value={item?.item_um}
                                                      name="item_um"
                                                      onChange={(e) => handleTableValueChange(e, index)}
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="text"
                                                      disabled={false}
                                                      className='input_style'
                                                      value={item?.item_pono}
                                                      name="item_pono"
                                                      onChange={(e) => handleTableValueChange(e, index)}
                                                    />
                                                  </td>
                                                  <td >
                                                    <input
                                                      type="text"
                                                      disabled={false}
                                                      className='input_style'
                                                      value={item?.item_quantity}
                                                      name="item_quantity"
                                                      onChange={(e) => handleTableValueChange(e, index)}
                                                    /></td>
                                                  <td >
                                                    <input type="text" disabled={false}
                                                      className='input_style'
                                                      value={item?.item_rate}
                                                      name="item_rate"
                                                      onChange={(e) => handleTableValueChange(e, index)}
                                                    />
                                                  </td>
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
                        <td ><input type="text" className='input_style'   value={invoice_data?.sr_no_1} onChange={(e)=>{set_invoice_data({...invoice_data, sr_no_1 : e.target.value})}} /></td>
                        <td > <input type="text" className='input_style' value={invoice_data?.item_code} onChange={(e)=>{set_invoice_data({...invoice_data, item_code : e.target.value})}} /> </td>
                        <td ><input type="text" className='input_style'  value={invoice_data?.item_description} onChange={(e)=>{set_invoice_data({...invoice_data, item_description : e.target.value})}} /> </td>
                        <td ><input type="text" className='input_style' value={invoice_data?.um} onChange={(e)=>{set_invoice_data({...invoice_data, um : e.target.value})}} /> </td>
                        <td ><input type="text" className='input_style' value={invoice_data?.po_no} onChange={(e)=>{set_invoice_data({...invoice_data, po_no : e.target.value})}}/></td>
                       <td ><input type="text" className='input_style' value={invoice_data?.sr_no_2} onChange={(e)=>{set_invoice_data({...invoice_data, sr_no_2 : e.target.value})}}  /> </td>
                        <td><input type="text" className='input_style' value={invoice_data?.quantity} onChange={(e)=>{set_invoice_data({...invoice_data, quantity : e.target.value})}} /></td>
                        <td><input type="text" className='input_style' value={invoice_data?.rate} onChange={(e)=>{set_invoice_data({...invoice_data, rate : e.target.value})}}  /></td>
                    </tr>
                    <tr>
                        <td ><input type="text" className='input_style' value="1" /></td>
                        <td ><input type="text" className='input_style'  value="PRV73D125016" /></td>
                        <td ><input type="text" className='input_style'  value="Clamp Pad" /></td>
                        <td ><input type="text" className='input_style' value="NO" /></td>
                        <td ><input type="text" className='input_style'  value="23PIN2638612" /></td>
                       <td ><input type="text" className='input_style' value="1" /></td>
                        <td ><input type="text" className='input_style' value="1.000" /></td>
                        <td ><input type="text" className='input_style' value="194.0000" /></td>
                    </tr>  */}

                                        </tbody>

                                      </table>
                                    </div>
                                  </div>
                                )}

                                {/* {holidayData?.length > 0 && (
              <Pagenation length={holidayData?.length} total={total_count} />
            )} */}
                              </div>
                              <div className="d-flex justify-content-end mt-2" >
                                <div className="Value"> Total Value {invoiceTableDataState.reduce((acc, item) => acc + (parseFloat(item.item_rate) * parseFloat(item.item_quantity)), 0)} </div>
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
                        </Form>
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

export default EditInvoice;

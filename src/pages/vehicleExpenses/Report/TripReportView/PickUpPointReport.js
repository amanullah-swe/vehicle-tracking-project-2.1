import React, { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";
// import View from "../../../../../assets/images/Group.svg";
import Export from "../../../../assets/images/Edit-Camunication.svg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FileSaver from "file-saver";
import { getDrivers } from "../../../../store/driverSlice";
import { getvehicleList } from "../../../../store/vehicleListSlice";
import { getTripActivity } from "../../../../store/tripActivitySlice";
import { getDriverRanking } from "../../../../store/driverRankingSlice";
import { getVehicleAlert } from "../../../../store/VehicleAlertSlice";
import { getAcceleration } from "../../../../store/accelerationSlice";
import {
  ConvertKilometersToMiles,
  DateDDMMYYYY,
  TimeFormat,
  TimeFormatForAll,
  addInterval,
  latestDate,
} from "../../../../sharedComponent/common";
import CommonDatePicker from "../../../../sharedComponent/CommonDatePicker";
import Import from "../../../../assets/images/ic-Import.svg";
import ApiConfig from "../../../../api/ApiConfig";
import { getWithAuthCall, simplePostCall } from "../../../../api/ApiServices";
import { notifyError } from "../../../../sharedComponent/notify";
import { Value } from "sass";
import Loader from "../../../../sharedComponent/Loader";
import NoDataComp from "../../../../sharedComponent/NoDataComp";
import MapComponent from "../../../../sharedComponent/MapComponent";
import GoogleMapComponent from "../../../../sharedComponent/GoogleMap/GoogleMapComponent";
import option from "../../../../assets/images/option-three-dot.svg";

const PickUpPointReport = () => {
  let counter = 0;
    const accessRights = useSelector((state) => state.auth.accessRights);
    const userRole = accessRights && accessRights.rights_role;

 
  const [selectedDriver, setSelectedDriver] = useState(0);
  // const [vehicleList, setvehicleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const drivers = useSelector((state) => state.driver.drivers);
  // const vehicleList = useSelector((state) => state.vehicleList.vehicleList);
  const [vehicleList, setvehicleList] = useState([]);
  const tripActivity = useSelector((state) => state.tripActivity.tripActivity);

  const { sidebar, setSidebar, customerData, LinkReport,setOptionDynamicDownload, setDark,googleMap,setMapZoomValue} =
    useContext(AppContext);
  console.log("customerData33333333333333", customerData);
  console.log("LinkReport  >>>>>>>>>>>  ", LinkReport);
 /*  const getdistanceunit = localStorage.customer_distance_unit
    ? localStorage.customer_distance_unit
    : ""; */
    const { t, i18n } = useTranslation();
    const getdistanceunit = localStorage.getItem('customer_distance_unit') || '';
    const translatedDistanceUnit = t(getdistanceunit);

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
 

  const dispatch = useDispatch();
  const params = useParams();
  const maxDate = new Date();

  const [startDate, setStartDate] = useState({ DateToday: new Date() });
  const [OrderListData, setOrderListData] = useState([]);
  const [pdfData, setpdfData] = useState("");
  console.log("pdfData", pdfData);
  const [NextPage, setNextPage] = useState(true);
  console.log("NextPage", NextPage);
  const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });
  const [optionData, setOptionData] = useState("date");
  const [VehicleId, setVehicleId] = useState("");
  console.log(optionData);
  const [daysToAdd, setDaysToAdd] = useState(30);
  const [NextDateShow, setNextDateShow] = useState({ toNextDate: new Date() });
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date());
  const [endDayOfMonth, setEndDayOfMonth] = useState(new Date());
  const [OptionDownload, setOptionDownload] = useState("");

  // State for weekStartDate and weekEndDate
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [tabClicked, setTabClicked] = useState(false);
  const [weekEndDate, setWeekEndDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [deletedId, setDeletedId] = useState("");
  const [singleCardDetails, setSingleCardDetails] = useState({
    address: "",
    school_id: "",
    slot_code: "",
    slot_gps_latitude: "",
    slot_gps_longitude: "",
    slot_id: "",
    slot_name: "",
    slot_status: "",
  });

  
  

  useEffect(() => {
    reportViewList()
  }, [LinkReport]);

   
  useEffect(() => {
    if (OptionDownload === "pdf" || OptionDownload === "excel") {
      reportViewList();
    }
  }, [
    
     ,
    OptionDownload
  ]);

  const reportViewList = () => {
    let requestData;
    requestData = {
      format: OptionDownload
    };
     

    if (requestData) {
      
      {OptionDownload == "pdf" || OptionDownload == "excel"  ? setLoading(false) : setLoading(true); }
      setOptionDownload("");
      simplePostCall(
        ApiConfig.TRIP_VERSUS_PICKUP_POINT ,
        JSON.stringify(requestData)
      )
        .then((res) => {
          console.log(res);
          if (res.result) {
            console.log(res.result);
            setLoading(false);
            setOptionDynamicDownload("");
            // Extract the array of items from the response
            const firstKey = res.filepath;

            console.log(pdfData);
            setpdfData(firstKey);
            if (!firstKey) {
              setOrderListData(res?.listData);
              console.log("OrderListData",OrderListData);
            }
            // Set the array to the state
          } else {
            setOptionDownload("");
            // notifyError(res.message)
            // Handle the case when the result is false
            // notifyError(res.message);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    getVehicelList();
  }, [,]);

  function getVehicelList() {
    getWithAuthCall(ApiConfig.VEHICEL_AVALIVALITY_DROPDAWAN)
      .then((data) => {
        // setVehicalType(data?.data);
        setvehicleList(data?.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  useEffect(() => {
    if (pdfData) {
      downloadFile();
    }
  }, [pdfData]);

  const downloadFile = () => {
    fetch(pdfData)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const a = document.createElement("a");
        a.href = url;

        // Extract the file name from the filepath dynamically
        const fileName = pdfData.substring(pdfData.lastIndexOf("/") + 1);
        a.download = fileName;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading file:", error));
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
      <div id="cx-wrapper" className="Vehicle_inspition_dashboard heightFixed">
        <div className="report-viwe-head" id="Viwe_Report_Respoasive">
          <p></p>
        </div>
        {/* <div className="col-lg-12 ">
          <div className="middle-header">
            <p> Vehicle Running Summary Report</p>
          </div>
        </div> */}
        {/* New UI ADD */}

        <div className="col-lg-12 mt-0">
          <div className="UserTabel">
            <div className="heading">
            <div className="middle-header">
            <p> {t("Pickup Point Trip")} </p>
          </div>
             
              
              <div className="leftContent d-flex">
                

                <div class="btn-wrapper">
                 
                </div>
                <div></div>
              </div>

              <div className="right-export-btn-section-wrapper">
                <div className="c-pointer me-2"></div>

                <div className="md_dropdown">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <img src={Import} alt="" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link
                          onClick={() => setOptionDownload("pdf")}
                          className="d-block"
                        >
                         {t("PDF")} 
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link
                          onClick={() => setOptionDownload("excel")}
                          className="d-block"
                        >
                         {t("Excel")} 
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
            {/* <div className="row body-content" style={{ height: "100%" }}>
            <div className="col-md-12">
                <div className="mainMape">
                  {googleMap === "leaflet" && (
                    <MapComponent
                    //   cardDetails={cardDetails}
                      componentId={"pointOfView"}
                    />
                  )}
                  {googleMap === "googleMap" && <GoogleMapComponent />}

                  {tabClicked && (
                    <div
                      className="innerMapDetails"
                      id="model-responsive-on-map"
                    >
                      <div className="headingDetails">
                        <div className="headingTxt">
                          <p className="heading">
                            {t("Point Of Interest Details")}
                          </p>
                        </div>

                        <div className="customer-option">
                          <div
                            onClick={() => {
                              setTabClicked(false);
                              setMapZoomValue(7);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="#9c4900"
                              class="bi bi-x"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                          </div>
                          {userRole === "customer" ||
                          (accessRights &&
                            accessRights?.rights_manage_point_of_interest) ? (
                            <Dropdown>
                              <Dropdown.Toggle id="dropdown-basic">
                                <img src={option} alt="" />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link
                                    to={
                                      "/AddPointOfInterest/" +
                                      singleCardDetails?.location_id
                                    }
                                    className="d-block"
                                  >
                                    {t("Edit")}
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link
                                    to="#"
                                    onClick={() => {
                                      setShow(true);
                                      setDeletedId(
                                        singleCardDetails?.location_id
                                      );
                                    }}
                                    className="d-block"
                                  >
                                    {t("Delete")}
                                  </Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          ) : null}
                        </div>
                      </div>
                      <div className="innerCOntent">
                        <div className="row">
                          <div className="col-md-4 dividedCol form_input_main">
                            <p className="paraHead">{t("Location Name")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.location_name}
                            </p>
                          </div>
                          <div className="col-md-4 dividedCol form_input_main">
                            <p className="paraHead">{t("Latitude")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.location_latitude}
                            </p>
                          </div>
                          <div className="col-md-4 dividedCol form_input_main">
                            <p className="paraHead">{t("Longitude")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.location_longitude}
                            </p>
                          </div>
                          <div className="col-md-12 dividedCol form_input_main">
                            <p className="paraHead">{t("Address")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.location_address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>


            </div> */}
            <div className="col-md-12">
                  <div className="heighScroller">
                    <table className="table tableAdmin  ">
                      <thead className="tableHead ">
                        <tr>
                          <th>{t("Sr.no")}</th>
                          <th>{t("Pickup Point Trip")}</th>
                          <th>{t("Pickup Point Name")}</th>
                          <th>{t("Pickup Point Code")}</th>
                          <th>{t("Pickup Point Priority")}</th>
                          <th>{t("Distance From Customer")}</th>
                           
                        </tr>
                      </thead>
                      {loading  ? (
                        <Loader />
                      ) : (
                        <>
                      <tbody className="tableBody">
  {OrderListData && OrderListData.length > 0 ? (
    OrderListData.map((trip, index) => (
      <React.Fragment key={index}>
        <tr className="d-flex" style={{color:"#8f4300",fontSize:"14px"}}  >
              <th  className="mr-5">{`Trip ID: ${trip.trip_id}`}</th>
              <th  >{`Trip Name: ${trip.trip_name}`}</th>
            </tr>
        {trip.pickuppoint && trip.pickuppoint.length > 0 ? (
          trip.pickuppoint.map((pickupPoint, pickupIndex) => (
            <tr key={`${index}-${pickupIndex}`}>
              <td>{pickupIndex + 1}</td>
              <td>{pickupPoint.pickup_point_id}</td>
              <td>{pickupPoint.pickup_point_name}</td>
              <td>{pickupPoint.pickup_point_code}</td>
              <td>{pickupPoint.pickup_point_priority}</td>
              <td>{pickupPoint.pickup_point_distance_from_source}</td>
              {/* Add more columns as needed */}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No pickup points available</td>
          </tr>
        )}
      </React.Fragment>
    ))
  ) : (
    <tr>
      <td colSpan="6">No data available</td>
    </tr>
  )}
</tbody>

                        </>
                      )}
                    </table>
                    {OrderListData?.length === 0 && !loading && (
                      <NoDataComp />
                    )}
                  </div>
                </div>
              
               
              
            

            
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PickUpPointReport;

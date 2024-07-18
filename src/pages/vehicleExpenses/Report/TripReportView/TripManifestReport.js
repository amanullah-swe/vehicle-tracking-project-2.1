import React, { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";
import View from "../../../../assets/images/Group.svg";
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

const TripManifestReport = () => {
  


 
  const [selectedDriver, setSelectedDriver] = useState(0);
  // const [vehicleList, setvehicleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const drivers = useSelector((state) => state.driver.drivers);
  // const vehicleList = useSelector((state) => state.vehicleList.vehicleList);
  const [vehicleList, setvehicleList] = useState([]);
  const [alltripList, setalltripList] = useState([]);
  console.log(alltripList,"==================================");
  const tripActivity = useSelector((state) => state.tripActivity.tripActivity);

  const { sidebar, setSidebar, customerData, LinkReport,setOptionDynamicDownload, setDark } =
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
  const [TripId, setTripId] = useState("");
  const [selected_trip_id, setselected_trip_id] = useState("");
  console.log(optionData);
  const [daysToAdd, setDaysToAdd] = useState(30);
  const [NextDateShow, setNextDateShow] = useState({ toNextDate: new Date() });
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date());
  const [endDayOfMonth, setEndDayOfMonth] = useState(new Date());
  const [OptionDownload, setOptionDownload] = useState("");

  // State for weekStartDate and weekEndDate
  const [weekStartDate, setWeekStartDate] = useState(new Date());

  const [weekEndDate, setWeekEndDate] = useState(new Date());
 
  // Pdf  and Exial

  // Api List UseEffacdt

   

  useEffect(() => {
    reportViewList()
  }, [TripId  ]);

 

  useEffect(() => {
    if (OptionDownload === "pdf" || OptionDownload === "excel") {
      reportViewList();
    }
  }, [
    OptionDownload,
    TripId
    
  ]);

  const reportViewList = (
    firstmonth,
    endmonth,
  ) => {
    let requestData;

    requestData = {
      trip_id:  TripId,
      format: OptionDownload,

    };

    

    if (requestData) {
      
      {OptionDownload == "pdf" || OptionDownload == "excel"  ? setLoading(false) : setLoading(true); }
      setOptionDownload("");
      simplePostCall(
        ApiConfig.TRIP_MANIFEST_TRIP ,
        JSON.stringify(requestData)
      )
        .then((res) => {
          console.log("res=====================>",res);
          if (res.result) {
            console.log(res.result);
            setLoading(false);
            setOptionDynamicDownload("");
            // Extract the array of items from the response
            const firstKey = res.filepath;

            console.log(pdfData);
            setpdfData(firstKey);
            if (!firstKey) {
              setOrderListData(res.listData ? res.listData : res.data);
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
    // getVehicelList();
    getAlltrip()
  }, [,]);

   
  function getAlltrip(){
    
    simplePostCall(ApiConfig.TRIP_LIST_REPORT)
    .then((data)=>{
      console.log(data,"data")
      setalltripList(data?.listData)

    })
    .catch((error)=>{
      console.log("api response",error);
    })
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
              <div className=""style={{width:"300px"}} >
                <select
                  className="form-select"
                  aria-label="Default select example"
                  placeholder="trip list"
                  onChange={(e) => setTripId(e.target.value)}
                >
                  <option value="">{t("Trip ID")}</option>
                  {alltripList.map((vehicle) => (
                    <option Value={vehicle.trip_id}>
                      {vehicle.trip_id}
                    </option>
                  ))}
                </select>
              </div> 
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
                          <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Trip ID")}</th>
                    <th>{t("Trip")}</th>
                    <th>{t("Vehicle")}</th>
                    <th>{t("Pickup Point")}</th>
                    <th>{t("Location")}</th>
                    <th>{t("Expected time")}</th>
                    
                  </tr>
                </thead>
                {loading  ? (
                  <Loader />
                ) : (
                  <>
                    <tbody className="tableBody">
                      {OrderListData && OrderListData?.length > 0 ? (
                        OrderListData?.map((itemlist, index) => {
                          return (
                            <>
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  {itemlist.trip_id}
                                </td>
                                <td>
                                  {itemlist.trip_name ? itemlist.trip_name : ""}
                                </td>
                                <td>
                                  {itemlist.vehicle_number
                                    ? itemlist.vehicle_number
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.pickup_point_name
                                    ? itemlist.pickup_point_name
                                    : ""}
                                </td>

                                <td>
                                  {itemlist.location ? itemlist.location : ""}
                                </td>

                                <td>
                                  {itemlist.pickup_point_eta
                                    ? itemlist.pickup_point_eta
                                    : ""}
                                </td>
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <div className="">{/* <NoDataComp /> */}</div>
                      )}
                    </tbody>
                  </>
                )}
              </table>
            

            {OrderListData?.length === 0 && !loading && <NoDataComp />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TripManifestReport;

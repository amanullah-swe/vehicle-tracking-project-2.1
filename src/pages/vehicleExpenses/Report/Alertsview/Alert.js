import React, { useContext, useState, useEffect, Fragment, useMemo } from "react";
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
  DateDDMMYYYY,
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
import "./Alertsview.scss";
import { setDate } from "date-fns";

const Alert = () => {
  const { sidebar, setSidebar, LinkReport, setDark } = useContext(AppContext);
  return (
    <div>
      <Component2 />
    </div>
  );
};

export default Alert;

const Component2 = () => {
  const [selectedDriver, setSelectedDriver] = useState(0);
  // const [vehicleList, setvehicleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const drivers = useSelector((state) => state.driver.drivers);
  // const vehicleList = useSelector((state) => state.vehicleList.vehicleList);
  const [vehicleList, setvehicleList] = useState([]);
  const tripActivity = useSelector((state) => state.tripActivity.tripActivity);

  const { sidebar, setSidebar, LinkReport, setDark } = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const params = useParams();
  const maxDate = new Date();

  const [AlertViewData, setAlertViewData] = useState([]);
  console.log("AlertViewData  >>>>>>>>>>>> ", AlertViewData);
  const [pdfData, setpdfData] = useState("");
  const [NextPage, setNextPage] = useState(true);
  console.log("NextPage", NextPage);
  const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });
  const [todaydate, settodaydate] = useState();
  const [optionData, setOptionData] = useState("date");
  const [daysToAdd, setDaysToAdd] = useState(1);
  const [NextDateShow, setNextDateShow] = useState({ toNextDate: new Date() });
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date());
  const [endDayOfMonth, setEndDayOfMonth] = useState(new Date());
  const [VehicleId, setVehicleId] = useState("");
  const [OptionDownload, setOptionDownload] = useState("");
  const [startDate, setStartDate] = useState({ DateToday: new Date() });
  const [format, setFormat] = useState("OptionDownload");
  const [enddate, setEndDate] = useState("");
  const [language, setLanguage] = useState("en");
  const [pageId, setpageId] = useState("");
  const [pageSize, setpageSize] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState(0); // State for selected vehicle ID
  const [filteredDropdownData, setFilteredDropdownData] = useState([]); // State for filtered dropdown data
  const [filteredAlertViewData, setFilteredAlertViewData] = useState([]); // State for filtered AlertViewData

  // State for weekStartDate and weekEndDate
  const [weekStartDate, setWeekStartDate] = useState(new Date());

  const [weekEndDate, setWeekEndDate] = useState(new Date());

  const handleNextButtonClick = () => {
    const { toNextDate, selectedOption } = NextDateShow;

    // Get the current date and format it to 'yyyy-MM-dd'
    const currentDateNext = latestDate(new Date(), "yyyy-MM-dd");

    console.log(currentDateNext,"*******newDate");
    // Get the new date from the state and format it to 'yyyy-MM-dd'
    const newDate = new Date(NextDateShow.toNextDate);
    console.log(newDate,"*******newDate");
    const camparDate = latestDate(newDate, "yyyy-MM-dd");
    const camparMonthe = latestDate(firstDayOfMonth, "yyyy-MM-dd");

    // Disable the button based on the selected option
    if (
      (optionData === "month" &&
        camparMonthe.substring(0, 7) === currentDateNext.substring(0, 7)) ||
      // (optionData === 'week' && camparDate === currentDate) ||
      (optionData === "date" && camparDate === currentDateNext)
    ) {
      console.log("Next button disabled");
    } else {
      // Enable the button and update the next date

      newDate.setDate(newDate.getDate() + daysToAdd);
      setNextDateShow({ toNextDate: newDate });
    }
  };

  const handleprivesButtonClick = () => {
    const newDate = new Date(NextDateShow.toNextDate);
    newDate.setDate(newDate.getDate() - daysToAdd); // Subtract one day
    setNextDateShow({ toNextDate: newDate });
    console.log("NextDateShow=======>", NextDateShow);
    // console.log(Subtracting one day. New date: ${newDate});
  };

  // Match current date and update number of days based on the selected option
  useEffect(() => {
    setNextDateShow({ toNextDate: currentDate.toDayDate });

    switch (optionData) {
      case "date":
        setDaysToAdd(1);
        break;
      default:
        setDaysToAdd(1); // Default to 30 days for month
        break;
    }
  }, [optionData, currentDate]);

  // State for NextDateShow

  const formattedNextDate = () => {
    switch (optionData) {
      case "date":
        return NextDateShow.toNextDate.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      default:
    }
  };

  // Pdf  and Exial

  // Api List UseEffacdt

  useEffect(() => {
    reportViewList(
      currentDate,
      firstDayOfMonth,
      endDayOfMonth,
      NextDateShow.toNextDate,
      optionData,
      weekStartDate,
      weekEndDate,
      LinkReport,
      selectedVehicleId
    );
  }, [
    weekEndDate,
    weekStartDate,
    currentDate,
    NextDateShow,
    firstDayOfMonth,
    optionData,
    endDayOfMonth,
    LinkReport,
    selectedVehicleId
  ]);

  useEffect(() => {}, [LinkReport]);
  useEffect(() => {
    if (VehicleId) {
      reportViewList(
        currentDate.toDayDate,
        firstDayOfMonth,
        endDayOfMonth,
        NextDateShow.toNextDate,
        optionData,
        weekStartDate,
        weekEndDate,
        LinkReport
      );
    }
  }, [
    OptionDownload,
    weekEndDate,
    weekStartDate,
    currentDate,
    NextDateShow,
    firstDayOfMonth,
    optionData,
    endDayOfMonth,
    LinkReport,
    VehicleId,
    language,
    pageSize,
    pageId,
  ]);

  useEffect(() => {
    if (OptionDownload === "pdf" || OptionDownload === "excel") {
      reportViewList(
        currentDate.toDayDate,
        firstDayOfMonth,
        endDayOfMonth,
        NextDateShow.toNextDate,
        optionData,
        weekStartDate,
        weekEndDate,
        LinkReport,
        selectedVehicleId
      );
    }
  }, [
    OptionDownload,
    weekEndDate,
    weekStartDate,
    currentDate,
    NextDateShow,
    firstDayOfMonth,
    optionData,
    endDayOfMonth,
    LinkReport,
    selectedVehicleId
  ]);

  const reportViewList = (
    date,
    firstmonth,
    endmonth,
    nextDate,
    selelctedDrop,
    weekStart,
    weekEnd
  ) => {
    let requestData;

    if (selelctedDrop === "month") {
      requestData = {
        format: OptionDownload,
        startdate: latestDate(firstmonth, "yyyy-MM-dd"),
        enddate: latestDate(endmonth, "yyyy-MM-dd"),
        vehicle_id: "",
        pageSize: "",
        language: "en",
      };
    } else if (selelctedDrop === "week") {
      // Handle OtherMonth case
      requestData = {
        format: OptionDownload,
        startdate: latestDate(weekStart, "yyyy-MM-dd"),
        enddate: latestDate(weekEnd, "yyyy-MM-dd"),

        vehicle_id: "",

        language: "en",
      };
      console.log("requestData==========", requestData);
    } else {
      // Handle other cases
      requestData = {
        format: OptionDownload,
        startdate: latestDate(nextDate, "yyyy-MM-dd"),
        enddate: latestDate(nextDate, "yyyy-MM-dd"),
        page: "1",
        vehicle_id: selectedVehicleId,
        pageSize: "5",
        language: language,

      };
      console.log("requestData==========", requestData);
    }

    if (requestData) {
      setLoading(true);
      simplePostCall(
        ApiConfig.GET_REPORT_LSIT + LinkReport ,
        JSON.stringify(requestData)
      )
        .then((res) => {
          if (res.result) {
            console.log(res);
            // Extract the array of items from the response
            const firstKey = res.filepath;
            setpdfData(firstKey);
            if (!firstKey) {
              // debugger
              setAlertViewData(res?.data.dataProvider[0]);
              console.log(res?.data);
              console.log("alertviewdata", AlertViewData);
            }
            // Set the array to the state
          } else {
            setAlertViewData([]);
            
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
  }, []);

  function getVehicelList() {
    getWithAuthCall(ApiConfig.VEHICEL_AVALIVALITY_DROPDAWAN)
      .then((data) => {
        // setVehicalType(data?.data);
        setvehicleList(data?.data);
        console.log(data);
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
  const handleSetToday = () => {
    setCurrentDate({ toDayDate: new Date() }); // Set the current date
  };
   
  console.log("=-=-=-=-==",AlertViewData);
  const filteredArray = useMemo(() => {
    if (!selectedVehicleId) {
      return AlertViewData; // Return the original AlertViewData if no option is selected
    } else {
      return AlertViewData.filter(item => item.toString().includes(selectedVehicleId));
    }
  }, [AlertViewData, selectedVehicleId]);
  const handleDropdownChange = (e) => {
    console.log("filteredArray",e.target.value);
    setSelectedVehicleId(e.target.value);
  };
  console.log("filteredArray",filteredArray);
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
        {/* New UI ADD */}{" "}
        
        <div className="col-lg-12 mt-2">
          <div className="middle-header">
            <p>Alertview</p>
          </div>
        </div>
        <div className="col-lg-12 mt-2">
          
          <div className="UserTabel">

            <div className="heading">
              <div>
                <p>
                  <p>Date: {formattedNextDate()}</p>
                </p>
              </div>
              <div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  placeholder="Vehicle list"
                  value={selectedVehicleId}
                  // onChange={(e) => setVehicleId(e.target.value)}
                  onChange={handleDropdownChange}
                >
                  <option value={0}>Vehicle</option>
                  {vehicleList.map((vehicle) => (
                    <option Value={vehicle.vehicle_id}>
                      {vehicle.vehicle_number}
                    </option>
                  ))}
                </select>
              </div>
              <div className="innerSelectBox weekCounter datepicker-main">
                <CommonDatePicker
                  dateKey={"toDayDate"}
                  setDate={setCurrentDate}
                  data={currentDate}
                  SetPlaceholder={"Today Date"}
                  dataDisbal={maxDate}
                />
              </div>

              <div>
                    
                <button className="widthAdjuster"    onClick={handleSetToday}>Today</button>
              </div>
              <div className="leftContent d-flex">
                <div class="btn-wrapper">
                  <button class="cx-btn-2" onClick={handleprivesButtonClick}>
                    Back
                  </button>
                </div>

                <div class="btn-wrapper">
                  <button
                    onClick={handleNextButtonClick}
                    class="cx-btn-2"
                    disabled={NextPage === false ? true : false}
                  >
                    Next
                  </button>
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
                          PDF
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link
                          onClick={() => setOptionDownload("excel")}
                          className="d-block"
                        >
                          Excel
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="heighScroller">
              <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Vehicle")}</th>
                    <th>{t("Alert Type")}</th>
                    <th>{t("Logged Date")}</th>
                    <th>{t("Logged Time")}</th>
                  </tr>
                </thead>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <tbody className="tableBody">
                      {filteredArray && filteredArray?.length > 0 ? (
                        filteredArray.map((data, index) => {
                          console.log(data, "-.,,,,,,");
                          return (
                            <>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{data.vehicle_number}</td>
                                <td>{data.alert_type}</td>
                                <td>{data.logged_date}</td>
                                <td>{data.logged_time}</td>
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
              {filteredArray && filteredArray.length === 0 && !loading && <NoDataComp />}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
import React, { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import View from "../../../assets/images/Group.svg";
import Export from "../../../assets/images/Edit-Camunication.svg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FileSaver from "file-saver";
import { getDrivers } from "../../../store/driverSlice";
import { getvehicleList } from "../../../store/vehicleListSlice";
import { getTripActivity } from "../../../store/tripActivitySlice";
import { getDriverRanking } from "../../../store/driverRankingSlice";
import { getVehicleAlert } from "../../../store/VehicleAlertSlice";
import { getAcceleration } from "../../../store/accelerationSlice";
import {
  DateDDMMYYYY,
  addInterval,
  latestDate,
} from "../../../sharedComponent/common";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import Import from "../../../assets/images/ic-Import.svg";
import ApiConfig from "../../../api/ApiConfig";
import { getWithAuthCall, simplePostCall } from "../../../api/ApiServices";
import { notifyError } from "../../../sharedComponent/notify";
import { Value } from "sass";
import Loader from "../../../sharedComponent/Loader";
import NoDataComp from "../../../sharedComponent/NoDataComp";

const DeliveryReports = () => {
  return (
    <div>
      <Component1 />
    </div>
  );
};

export default DeliveryReports;

const Component1 = () => {
  const [selectedDriver, setSelectedDriver] = useState(0);
  // const [vehicleList, setvehicleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const drivers = useSelector((state) => state.driver.drivers);
  // const vehicleList = useSelector((state) => state.vehicleList.vehicleList);
  const [vehicleList, setvehicleList] = useState([]);
  const tripActivity = useSelector((state) => state.tripActivity.tripActivity);

  const { sidebar, setSidebar, LinkReport, setDark } = useContext(AppContext);

  console.log("LinkReport  >>>>>>>>>>>  ", LinkReport);

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const params = useParams();
  const maxDate = new Date();

  const [startDate, setStartDate] = useState({ DateToday: new Date() });
  const [OrderListData, setOrderListData] = useState([]);
  const [pdfData, setpdfData] = useState("");
  const [NextPage, setNextPage] = useState(true);
  console.log("NextPage", NextPage);
  const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });
  const [optionData, setOptionData] = useState("month");
  const [VehicleId, setVehicleId] = useState("");
  console.log(optionData);
  const [daysToAdd, setDaysToAdd] = useState(30);
  const [NextDateShow, setNextDateShow] = useState({ toNextDate: new Date() });
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date());
  const [endDayOfMonth, setEndDayOfMonth] = useState(new Date());
  const [OptionDownload, setOptionDownload] = useState("");

  // State for weekStartDate and weekEndDate
  const [weekStartDate, setWeekStartDate] = useState(new Date());

  const [weekEndDate, setWeekEndDate] = useState(new Date());

  const handleNextButtonClick = () => {
    // const { toNextDate, selectedOption } = NextDateShow;

    // Get the current date and format it to 'yyyy-MM-dd'
    const currentDate = latestDate(new Date(), "yyyy-MM-dd");

    // Get the new date from the state and format it to 'yyyy-MM-dd'
    const newDate = new Date(NextDateShow.toNextDate);
    const camparDate = latestDate(newDate, "yyyy-MM-dd");
    const camparMonthe = latestDate(firstDayOfMonth, "yyyy-MM-dd");

    // Disable the button based on the selected option
    if (
      (optionData === "month" &&
        camparMonthe.substring(0, 7) === currentDate.substring(0, 7)) ||
      // (optionData === 'week' && camparDate === currentDate) ||
      (optionData === "date" && camparDate === currentDate)
    ) {
      console.log("Next button disabled");
    } else {
      // Enable the button and update the next date
      // newDate.setDate(newDate.getDate() + daysToAdd);
      // setNextDateShow({ toNextDate: newDate, selectedOption });
      newDate.setDate(newDate.getDate() + daysToAdd);
      setNextDateShow({ toNextDate: newDate });
    }
  };

  const handleprivesButtonClick = () => {
    const newDate = new Date(NextDateShow.toNextDate);
    newDate.setDate(newDate.getDate() - daysToAdd);
    setNextDateShow({ toNextDate: newDate });
    console.log(`Subtracting ${daysToAdd} days. New date: ${newDate}`);
  };

  // Match current date and update number of days based on the selected option
  useEffect(() => {
    setNextDateShow({ toNextDate: currentDate.toDayDate });
    // const currentDate = moment();

    // console.log("checking", currentDate.isSame(currentDate, `${optionData == 'month' ? 'month':  optionData == 'week' ? 'week' : optionData == 'date' ? 'date' : ''  }`))
    switch (optionData) {
      case "month":
        setDaysToAdd(30);
        break;
      case "week":
        setDaysToAdd(7);
        break;
      case "date":
        setDaysToAdd(1);
        break;
      default:
        setDaysToAdd(30); // Default to 30 days for month
        break;
    }
  }, [optionData, currentDate]);

  // State for NextDateShow

  const formattedNextDate = () => {
    switch (optionData) {
      case "month":
        // Use state for firstDayOfMonth
        const firstDayOfMonthState = new Date(
          NextDateShow.toNextDate.getFullYear(),
          NextDateShow.toNextDate.getMonth(),
          1
        );
        if (firstDayOfMonth.getTime() !== firstDayOfMonthState.getTime()) {
          setFirstDayOfMonth(firstDayOfMonthState);
        }

        const lastDayOfMonth = new Date(
          NextDateShow.toNextDate.getFullYear(),
          NextDateShow.toNextDate.getMonth() + 1,
          0
        );
        if (endDayOfMonth.getTime() !== lastDayOfMonth.getTime()) {
          setEndDayOfMonth(lastDayOfMonth);
        }
        return `${firstDayOfMonthState.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })} - ${lastDayOfMonth.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`;
      // Other cases...

      case "week":
        // Use state for weekStartDate and weekEndDate
        const weekStartDateState = new Date(NextDateShow.toNextDate);
        const weekEndDateState = new Date(weekStartDateState);
        weekEndDateState.setDate(weekEndDateState.getDate() + 6);

        if (weekStartDate.getTime() !== weekStartDateState.getTime()) {
          setWeekStartDate(weekStartDateState);
        }

        if (weekEndDate.getTime() !== weekEndDateState.getTime()) {
          setWeekEndDate(weekEndDateState);
        }

        return `${weekStartDateState.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        })} - ${weekEndDateState.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`;
      case "date":
        return NextDateShow.toNextDate.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      default:
        // If 'current date' is selected, display the current month
        const currentMonth = new Date(
          NextDateShow.toNextDate.getFullYear(),
          NextDateShow.toNextDate.getMonth(),
          1
        );
        const lastDayOfCurrentMonth = new Date(
          NextDateShow.toNextDate.getFullYear(),
          NextDateShow.toNextDate.getMonth() + 1,
          0
        );
        return `${currentMonth.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })} - ${lastDayOfCurrentMonth.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`;
    }
  };

  // Pdf  and Exial

  // Api List UseEffacdt

  useEffect(() => {
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
  }, [
    weekEndDate,
    weekStartDate,
    currentDate,
    NextDateShow,
    firstDayOfMonth,
    optionData,
    endDayOfMonth,
    LinkReport,
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
        fromtimeval: "",
        totimeval: "",
        vehicle_id: VehicleId,
        user_id: "",
        language: "en",
      };
    } else if (selelctedDrop === "week") {
      // Handle OtherMonth case
      requestData = {
        format: OptionDownload,
        startdate: latestDate(weekStart, "yyyy-MM-dd"),
        enddate: latestDate(weekEnd, "yyyy-MM-dd"),
        fromtimeval: "",
        totimeval: "",
        vehicle_id: VehicleId,
        user_id: "",
        language: "en",
      };
    } else {
      // Handle other cases
      requestData = {
        format: OptionDownload,
        startdate: latestDate(nextDate, "yyyy-MM-dd"),
        enddate: latestDate(nextDate, "yyyy-MM-dd"),
        fromtimeval: "",
        totimeval: "",
        vehicle_id: VehicleId,
        user_id: "",
        language: "en",
      };
    }

    if (requestData) {
      setLoading(true);
      simplePostCall(
        ApiConfig.GET_REPORT_LSIT + LinkReport,
        JSON.stringify(requestData)
      )
        .then((res) => {
          if (res.result) {
            setLoading(false);
            // Extract the array of items from the response
            const firstKey = res.filepath;
            setpdfData(firstKey);
            if (!firstKey) {
              setOrderListData(res.data);
            }
            // Set the array to the state
          } else {
            // notifyError(res.message)
            // Handle the case when the result is false
            // notifyError(res.message);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        })
        .finally(() => {
          // setLoading(false);
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
        {/* New UI ADD */}

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
                  onChange={(e) => setVehicleId(e.target.value)}
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
                <select
                  id="selectBox"
                  className="form-select widthAdjuster"
                  aria-label="Default select example"
                  placeholder="Vehicle"
                  value={optionData}
                  onChange={(e) => setOptionData(e.target.value)}
                >
                  <option selected value="date">
                    {t("Date")}
                  </option>
                  <option value="month">{t("Month")}</option>
                  <option value="week">{t("Week")}</option>
                </select>
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
            {LinkReport == "vehiclerunningsummaryreport" ? (
              <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Vehicle Reg No")}</th>
                    <th>{t("Report Date")}</th>
                    <th>{t("Vehicle Imei")}</th>
                    {/* <th>{t("Orders Pending")}</th> */}
                    <th>{t("Distance")}</th>
                    {/* {vehicleSelect != "All" ? <th>{t("Repair Cost")}</th> : ""} */}
                    <th>{t("Actual Duty Time(hrs)")}</th>
                    <th>{t("Average Speed(Km/hr)")}</th>
                    <th>{t("Max Speed(Km/hr)")}</th>
                    <th>{t("Actual Running Time(hrs)")}</th>
                    <th>{t("	Idle Time(hrs)")}</th>
                  </tr>
                </thead>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <tbody className="tableBody">
                      {OrderListData && OrderListData.length > 0 ? (
                        OrderListData?.map((itemlist, index) => {
                          return (
                            <>
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  {itemlist.vehicle_reg_no
                                    ? itemlist.vehicle_reg_no
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_date
                                    ? itemlist.vehicle_activity_date
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_imei
                                    ? itemlist.vehicle_imei
                                    : "NA"}
                                </td>

                                <td>
                                  {itemlist.distance ? itemlist.distance : "NA"}
                                </td>

                                <td>
                                  {itemlist.actual_duration
                                    ? itemlist.actual_duration
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.average_speed
                                    ? itemlist.average_speed
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.max_speed
                                    ? itemlist.max_speed
                                    : "NA"}
                                </td>
                                <td>NA</td>
                                <td>
                                  {itemlist.idle_duration
                                    ? itemlist.idle_duration
                                    : "NA"}
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
            ) : LinkReport == "vehicleignitionsummaryreport" ? (
              <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Vehicle")}</th>
                    <th>{t("Date")}</th>
                    <th>{t("Start Time")}</th>
                    {/* <th>{t("Orders Pending")}</th> */}
                    <th>{t("Start Location")}</th>
                    {/* {vehicleSelect != "All" ? <th>{t("Repair Cost")}</th> : ""} */}
                    <th>{t("End Time")}</th>
                    <th>{t("End Location")}</th>
                    <th>{t("Distance")}</th>
                    <th>{t("Duration")}</th>
                    <th>{t("Average Speed (Km/hr)")}</th>
                    <th>{t("Max Speed (Km/hr)")}</th>
                  </tr>
                </thead>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <tbody className="tableBody">
                      {OrderListData && OrderListData.length > 0 ? (
                        OrderListData?.map((itemlist, index) => {
                          return (
                            <>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{itemlist.vehicle_reg_no}</td>
                                <td>{itemlist.vehicle_activity_date}</td>
                                <td>{itemlist.vehicle_activity_start_time}</td>

                                <td>
                                  {itemlist.vehicle_activity_start_location}
                                </td>

                                <td>
                                  {itemlist.vehicle_activity_end_time
                                    ? itemlist.vehicle_activity_end_time
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_end_location
                                    ? itemlist.vehicle_activity_end_location
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_distance
                                    ? itemlist.vehicle_activity_distance
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_duration
                                    ? itemlist.vehicle_activity_duration
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_avgspeed
                                    ? itemlist.vehicle_activity_avgspeed
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_maxspeed
                                    ? itemlist.vehicle_activity_maxspeed
                                    : "NA"}
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
            ) : LinkReport == "vehiclerunningreport" ? (
              <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Vehicle")}</th>
                    <th>{t("Date")}</th>
                    <th>{t("Start Time")}</th>
                    {/* <th>{t("Orders Pending")}</th> */}
                    <th>{t("Start Location")}</th>
                    {/* {vehicleSelect != "All" ? <th>{t("Repair Cost")}</th> : ""} */}
                    <th>{t("End Time")}</th>
                    <th>{t("End Location")}</th>
                    <th>{t("Distance")}</th>
                    <th>{t("Duration")}</th>
                    <th>{t("Average Speed (Km/hr)")}</th>
                    <th>{t("Max Speed (Km/hr)")}</th>
                  </tr>
                </thead>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <tbody className="tableBody">
                      {OrderListData && OrderListData.length > 0 ? (
                        OrderListData?.map((itemlist, index) => {
                          return (
                            <>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{itemlist.vehicle_reg_no}</td>
                                <td>{itemlist.vehicle_activity_date}</td>
                                <td>{itemlist.vehicle_activity_start_time}</td>

                                <td>
                                  {itemlist.vehicle_activity_start_location}
                                </td>

                                <td>
                                  {itemlist.vehicle_activity_end_time
                                    ? itemlist.vehicle_activity_end_time
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_end_location
                                    ? itemlist.vehicle_activity_end_location
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_distance
                                    ? itemlist.vehicle_activity_distance
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_duration
                                    ? itemlist.vehicle_activity_duration
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_avgspeed
                                    ? itemlist.vehicle_activity_avgspeed
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_maxspeed
                                    ? itemlist.vehicle_activity_maxspeed
                                    : "NA"}
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
            ) : LinkReport == "vehiclestopagereport" ? (
              <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Vehicle Number")}</th>
                    <th>{t("Vehicle Reg No")}</th>
                    <th>{t("Date")}</th>
                    {/* <th>{t("Orders Pending")}</th> */}
                    {/* <th>{t("Start Location")}</th> */}
                    {/* {vehicleSelect != "All" ? <th>{t("Repair Cost")}</th> : ""} */}
                    <th>{t("Start Time")}</th>
                    <th>{t("End Time")}</th>
                    {/* <th>{t("End Location")}</th>
                    <th>{t("Distance")}</th> */}
                    <th>{t("Duration")}</th>
                    <th>{t("Location")}</th>
                    {/* <th>{t("Max Speed (Km/hr)")}</th> */}
                  </tr>
                </thead>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <tbody className="tableBody">
                      {OrderListData && OrderListData.length > 0 ? (
                        OrderListData?.map((itemlist, index) => {
                          return (
                            <>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{itemlist.vehicle_number}</td>
                                <td>{itemlist.vehicle_reg_no}</td>
                                <td>{itemlist.vehicle_activity_date}</td>

                                <td>{itemlist.vehicle_activity_start_time}</td>

                                <td>
                                  {itemlist.vehicle_activity_end_time
                                    ? itemlist.vehicle_activity_end_time
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_duration
                                    ? itemlist.vehicle_activity_duration
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_start_location
                                    ? itemlist.vehicle_activity_start_location
                                    : "NA"}
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
            ) : LinkReport == "vehicleidlereport" ? (
              <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Vehicle Number")}</th>
                    <th>{t("Vehicle Reg No")}</th>
                    <th>{t("Date")}</th>
                    {/* <th>{t("Orders Pending")}</th> */}
                    {/* <th>{t("Start Location")}</th> */}
                    {/* {vehicleSelect != "All" ? <th>{t("Repair Cost")}</th> : ""} */}
                    <th>{t("Start Time")}</th>
                    <th>{t("End Time")}</th>
                    {/* <th>{t("End Location")}</th>
                    <th>{t("Distance")}</th> */}
                    <th>{t("Duration")}</th>
                    <th>{t("Location")}</th>
                    {/* <th>{t("Max Speed (Km/hr)")}</th> */}
                  </tr>
                </thead>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <tbody className="tableBody">
                      {OrderListData && OrderListData.length > 0 ? (
                        OrderListData?.map((itemlist, index) => {
                          return (
                            <>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{itemlist.vehicle_number}</td>
                                <td>{itemlist.vehicle_reg_no}</td>
                                <td>{itemlist.vehicle_activity_date}</td>

                                <td>{itemlist.vehicle_activity_start_time}</td>

                                <td>
                                  {itemlist.vehicle_activity_end_time
                                    ? itemlist.vehicle_activity_end_time
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_duration
                                    ? itemlist.vehicle_activity_duration
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_start_location
                                    ? itemlist.vehicle_activity_start_location
                                    : "NA"}
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
            ) : LinkReport == "vehiclefirstlastignitionreport" ? (
              <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Vehicle Number")}</th>
                    <th>{t("Vehicle Reg No")}</th>
                    <th>{t("Driver")}</th>
                    <th>{t("Date")}</th>
                    {/* <th>{t("Orders Pending")}</th> */}
                    {/* <th>{t("Start Location")}</th> */}
                    {/* {vehicleSelect != "All" ? <th>{t("Repair Cost")}</th> : ""} */}
                    <th>{t("First Ignition")}</th>
                    <th>{t("Last Ignition")}</th>
                    {/* <th>{t("End Location")}</th>
                    <th>{t("Distance")}</th> */}
                    <th>{t("Duration")}</th>
                    <th>{t("Distance")}</th>
                    {/* <th>{t("Max Speed (Km/hr)")}</th> */}
                  </tr>
                </thead>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <tbody className="tableBody">
                      {OrderListData && OrderListData.length > 0 ? (
                        OrderListData?.map((itemlist, index) => {
                          return (
                            <>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{itemlist.vehicle_number}</td>
                                <td>{itemlist.vehicle_reg_no}</td>
                                <td>{itemlist.driver_name}</td>

                                <td>{itemlist.date}</td>

                                <td>
                                  {itemlist.first_ignition
                                    ? itemlist.first_ignition
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.last_ignition
                                    ? itemlist.last_ignition
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.ignition_time
                                    ? itemlist.ignition_time
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.distance ? itemlist.distance : "NA"}
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
            ) : LinkReport == "vehiclelocationactivityreport" ? (
              <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Vehicle Number")}</th>
                    <th>{t("Date")}</th>
                    <th>{t("Status")}</th>
                    <th>{t("Start Time")}</th>
                    {/* <th>{t("Orders Pending")}</th> */}
                    {/* <th>{t("Start Location")}</th> */}
                    {/* {vehicleSelect != "All" ? <th>{t("Repair Cost")}</th> : ""} */}
                    <th>{t("Start Location")}</th>
                    <th>{t("End Time")}</th>
                    {/* <th>{t("End Location")}</th>
                    <th>{t("Distance")}</th> */}
                    <th>{t("End Location")}</th>
                    <th>{t("Duration")}</th>
                    <th>{t("Distance")}</th>
                    {/* <th>{t("Max Speed (Km/hr)")}</th> */}
                  </tr>
                </thead>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <tbody className="tableBody">
                      {OrderListData && OrderListData.length > 0 ? (
                        OrderListData?.map((itemlist, index) => {
                          return (
                            <>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{itemlist.vehicle_number}</td>
                                <td>{itemlist.vehicle_activity_date}</td>
                                <td>{itemlist.vehicle_activity_status}</td>

                                <td>{itemlist.vehicle_activity_start_time}</td>

                                <td>
                                  {itemlist.vehicle_activity_start_location
                                    ? itemlist.vehicle_activity_start_location
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_end_time
                                    ? itemlist.vehicle_activity_end_time
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_end_location
                                    ? itemlist.vehicle_activity_end_location
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_duration
                                    ? itemlist.vehicle_activity_duration
                                    : "NA"}
                                </td>
                                <td>
                                  {itemlist.vehicle_activity_distance
                                    ? itemlist.vehicle_activity_distance
                                    : "NA"}
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
            ) : (
              "warning"
            )}

            {OrderListData.length === 0 && !loading && <NoDataComp />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

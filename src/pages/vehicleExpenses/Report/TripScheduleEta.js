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
import {
  simpleGetCall,
  simplePostCall,
  simplePostCallAll,
} from "../../../api/ApiServices";
import { notifyError } from "../../../sharedComponent/notify";
import { Value } from "sass";
import Loader from "../../../sharedComponent/Loader";
import NoDataComp from "../../../sharedComponent/NoDataComp";
import ImportUser from "../../../assets/images/imagesuser.png";
import { Select } from "antd";
const { Option } = Select;

const TripScheduleEta = () => {
  return (
    <div>
      <Component1 />
    </div>
  );
};

export default TripScheduleEta;

const Component1 = () => {
  const [selectedDriver, setSelectedDriver] = useState(0);
  // const [vehicleList, setvehicleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const drivers = useSelector((state) => state.driver.drivers);
  // const vehicleList = useSelector((state) => state.vehicleList.vehicleList);
  const [vehicleList, setvehicleList] = useState([]);
  const [tripList, settripList] = useState([]);

  const [DriverList, setDriverList] = useState([]);
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

  const [startDate, setStartDate] = useState({ DateToday: new Date() });
  const [OrderListData, setOrderListData] = useState([]);
  const [pdfData, setpdfData] = useState("");
  const [NextPage, setNextPage] = useState(true);
  const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });
  const [optionData, setOptionData] = useState("date");
  const [VehicleId, setVehicleId] = useState("");
  const [DispatchCustomerTd, setDispatchCustomerTd] = useState("");
  const [MerchantId, setMerchantId] = useState("");
  const [DeliveryPersonId, setDeliveryPersonId] = useState("");
  const [DriverId, setDriverId] = useState("");
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
        setDaysToAdd(29);
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

  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
  };

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

  // After DropDown Selected
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
        LinkReport,
        DispatchCustomerTd,
        DeliveryPersonId
      );
    } else if (MerchantId) {
      reportViewList(
        currentDate.toDayDate,
        firstDayOfMonth,
        endDayOfMonth,
        NextDateShow.toNextDate,
        optionData,
        weekStartDate,
        weekEndDate,
        LinkReport,
        DispatchCustomerTd,
        DeliveryPersonId
      );
    } else if (DriverId) {
      reportViewList(
        currentDate.toDayDate,
        firstDayOfMonth,
        endDayOfMonth,
        NextDateShow.toNextDate,
        optionData,
        weekStartDate,
        weekEndDate,
        LinkReport,
        DispatchCustomerTd,
        DeliveryPersonId
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
    DispatchCustomerTd,
    DeliveryPersonId,
    MerchantId,
    DriverId,
  ]);

  // Excel And PDF Download
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
      setOptionDownload("");
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

  /// Report List Data
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
        vehicle_id: VehicleId,
        trip_id: "",
        driver_id: DriverId,
        language: "en",
      };
    } else if (selelctedDrop === "week") {
      // Handle OtherMonth case
      requestData = {
        format: OptionDownload,
        startdate: latestDate(weekStart, "yyyy-MM-dd"),
        enddate: latestDate(weekEnd, "yyyy-MM-dd"),
        vehicle_id: VehicleId,
        trip_id: "",
        driver_id: DriverId,
        language: "en",
      };
    } else {
      // Handle other cases
      requestData = {
        format: OptionDownload,
        startdate: latestDate(nextDate, "yyyy-MM-dd"),
        enddate: latestDate(nextDate, "yyyy-MM-dd"),
        vehicle_id: VehicleId,
        trip_id: "",
        driver_id: DriverId,
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
              setOrderListData(res.listData ? res.listData : res.data);
            }
            // Set the array to the state
          } else {
            setLoading(false);
            // notifyError(res.message)
            setOrderListData([]);
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

  // Driver Dropdown List

  useEffect(() => {
    getVehicelList();
    getTripList();
    getDRiverList();
  }, [,]);

  function getVehicelList() {
    simplePostCall(ApiConfig.VEHICLE_LIST_REPORT)
      .then((data) => {
        // setVehicalType(data?.data);
        setvehicleList(data?.listData);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  function getTripList() {
    simplePostCall(ApiConfig.TRIP_LIST_REPORT)
      .then((data) => {
        // setVehicalType(data?.data);
        settripList(data?.listData);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  function getDRiverList() {
    let requestData;
    requestData = {
      key: "DriversList",
    };
    simplePostCall(ApiConfig.VEHICLE_DROWPDOWN, JSON.stringify(requestData))
      .then((data) => {
        // setVehicalType(data?.data);
        setDriverList(data?.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  // File Download
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
                  <p>
                    {t("Date")} : {formattedNextDate()}
                  </p>
                </p>
              </div>
              <div className="multi-select-1">
                <Select
                  className="custom-select"
                  style={{ height: "40px", width: "180px" }}
                  placeholder={t("Vehicle list")}
                  onChange={(value) => setVehicleId(value)}
                >
                  <Option value={0} style={{ color: "rgba(156, 73, 0)" }}>
                    {t("Select Vehicle")}{" "}
                  </Option>
                  {vehicleList.map((vehicle) => (
                    <Option
                      value={vehicle.vehicle_id}
                      style={{ color: "rgba(156, 73, 0)" }}
                    >
                      {vehicle.vehicle_number}
                    </Option>
                  ))}
                </Select>
              </div>
              <div style={{ width: "10%" }} className="multi-select-1">
                <Select
                  className="custom-select"
                  style={{ height: "40px", width: "120px" }}
                  placeholder={t("Vehicle list")}
                  onChange={(value) => setMerchantId(value)}
                >
                  <Option value={0} style={{ color: "rgba(156, 73, 0)" }}>
                    {t("Select Trip")}{" "}
                  </Option>
                  {tripList.map((vehicle) => (
                    <Option
                      value={vehicle.trip_id}
                      style={{ color: "rgba(156, 73, 0)" }}
                    >
                      {vehicle.trip_id}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="multi-select-1">
                <Select
                  className="custom-select"
                  style={{ height: "40px", width: "180px" }}
                  placeholder={t("Vehicle list")}
                  onChange={(value) => setDriverId(value)}
                >
                  <Option value={0} style={{ color: "rgba(156, 73, 0)" }}>
                    {t("Select Driver")}{" "}
                  </Option>
                  {DriverList.map((vehicle) => (
                    <Option
                      value={vehicle.user_id}
                      style={{ color: "rgba(156, 73, 0)" }}
                    >
                      {vehicle.user_name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="innerSelectBox weekCounter datepicker-main">
                <CommonDatePicker
                  dateKey={"toDayDate"}
                  setDate={setCurrentDate}
                  data={currentDate}
                  SetPlaceholder={t("Today Date")}
                  dataDisbal={maxDate}
                />
              </div>

              <div className="multi-select-1">
                <Select
                  className="custom-select"
                  style={{ height: "40px", width: "180px" }}
                  placeholder={t("Vehicle")}
                  value={optionData}
                  onChange={(value) => setOptionData(value)}
                >
                  <Option
                    selected
                    value="date"
                    style={{ color: "rgba(156, 73, 0)" }}
                  >
                    {t("Days")}
                  </Option>
                  <Option value="week" style={{ color: "rgba(156, 73, 0)" }}>
                    {t("Week")}
                  </Option>
                  <Option value="month" style={{ color: "rgba(156, 73, 0)" }}>
                    {t("Month")}
                  </Option>
                </Select>
              </div>
              <div className="leftContent d-flex">
                <div class="btn-wrapper">
                  <button class="cx-btn-2" onClick={handleprivesButtonClick}>
                    {t("Back")}
                  </button>
                </div>

                <div class="btn-wrapper">
                  <button
                    onClick={handleNextButtonClick}
                    class="cx-btn-2"
                    disabled={NextPage === false ? true : false}
                  >
                    {t("Next")}
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
                  <th rowspan="2">{t("Sr.no")}</th>
                  <th rowspan="2">{t("Trip Id")}</th>
                  <th rowspan="2">{t("Vehicle")}</th>
                  <th rowspan="2">{t("Driver")}</th>
                  <th rowspan="2">{t("Location")}</th>
                  <th
                    style={{
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                    colSpan="2"
                  >
                    {t("Trip Schedule ETA")}
                  </th>
                  <th
                    style={{ textAlign: "center", fontSize: "16px" }}
                    colSpan="2"
                  >
                    {t("Trip Actual ETA")}
                  </th>
                  <th
                    style={{ textAlign: "center", fontSize: "16px" }}
                    colSpan="2"
                  >
                    {t("ETA Difference")}
                  </th>
                </tr>
                <tr>
                  <th>{t("Start Date & Time")}</th>
                  <th>{t("End Date & Time")}</th>
                  <th>{t("Start Date & Time")}</th>
                  <th>{t("End Date & Time")}</th>
                  <th>{t("Start Time")}</th>
                  <th>{t("End Time")}</th>
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
                                {itemlist.pickup_point_trip_id
                                  ? itemlist.pickup_point_trip_id
                                  : "NA"}
                              </td>
                              <td>
                                {itemlist.vehicle_number
                                  ? itemlist.vehicle_number
                                  : "NA"}
                              </td>
                              <td>
                                {itemlist.driver_name
                                  ? itemlist.driver_name
                                  : "NA"}
                              </td>
                              <td>
                                {itemlist.pickup_point_name
                                  ? itemlist.pickup_point_name
                                  : "NA"}
                              </td>
                              <td>
                                {itemlist.pickup_point_eta_time_loadinStart
                                  ? itemlist.pickup_point_eta_time_loadinStart
                                  : "NA"}
                              </td>
                              <td>
                                {itemlist.pickup_point_eta_time_loadinEnd
                                  ? itemlist.pickup_point_eta_time_loadinEnd
                                  : "NA"}
                              </td>
                              <td>
                                {itemlist.startloading
                                  ? itemlist.startloading
                                  : "NA"}
                              </td>
                              <td>
                                {itemlist.endLoading
                                  ? itemlist.endLoading
                                  : "NA"}
                              </td>
                              <td>
                                {itemlist.timeLoadingStartDifference
                                  ? itemlist.timeLoadingStartDifference
                                  : "NA"}
                              </td>
                              <td>
                                {itemlist.timeLoadingEndDifference
                                  ? itemlist.timeLoadingEndDifference
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

            {OrderListData.length === 0 && !loading && <NoDataComp />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

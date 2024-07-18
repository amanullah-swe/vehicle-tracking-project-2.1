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
import { Select } from "antd";
const { Option } = Select;
const DriverBehaviourReport = () => {
  return (
    <div>
      <Component1 />
    </div>
  );
};

export default DriverBehaviourReport;

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
      (optionData === "week" && camparDate === currentDate) ||
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

  // const formattedNextDate = () => {
  //   switch (optionData) {
  //     case "month":
  //       // Use state for firstDayOfMonth
  //       const firstDayOfMonthState = new Date(
  //         NextDateShow.toNextDate.getFullYear(),
  //         NextDateShow.toNextDate.getMonth(),
  //         1
  //       );
  //       if (firstDayOfMonth.getTime() !== firstDayOfMonthState.getTime()) {
  //         setFirstDayOfMonth(firstDayOfMonthState);
  //       }

  //       const lastDayOfMonth = new Date(
  //         NextDateShow.toNextDate.getFullYear(),
  //         NextDateShow.toNextDate.getMonth() + 1,
  //         0
  //       );
  //       if (endDayOfMonth.getTime() !== lastDayOfMonth.getTime()) {
  //         setEndDayOfMonth(lastDayOfMonth);
  //       }
  //       return `${firstDayOfMonthState.toLocaleString("en-US", {
  //         month: "long",
  //         day: "numeric",
  //         year: "numeric",
  //       })} - ${lastDayOfMonth.toLocaleString("en-US", {
  //         month: "long",
  //         day: "numeric",
  //         year: "numeric",
  //       })}`;
  //     // Other cases...

  //     case "week":
  //       // Use state for weekStartDate and weekEndDate
  //       const weekStartDateState = new Date(NextDateShow.toNextDate);
  //       const weekEndDateState = new Date(weekStartDateState);
  //       weekEndDateState.setDate(weekEndDateState.getDate() + 6);

  //       if (weekStartDate.getTime() !== weekStartDateState.getTime()) {
  //         setWeekStartDate(weekStartDateState);
  //       }

  //       if (weekEndDate.getTime() !== weekEndDateState.getTime()) {
  //         setWeekEndDate(weekEndDateState);
  //       }

  //       return `${weekStartDateState.toLocaleString("en-US", {
  //         month: "short",
  //         day: "numeric",
  //       })} - ${weekEndDateState.toLocaleString("en-US", {
  //         month: "short",
  //         day: "numeric",
  //         year: "numeric",
  //       })}`;
  //     case "date":
  //       return NextDateShow.toNextDate.toLocaleString("en-US", {
  //         month: "long",
  //         day: "numeric",
  //         year: "numeric",
  //       });
  //     default:
  //       // If 'current date' is selected, display the current month
  //       const currentMonth = new Date(
  //         NextDateShow.toNextDate.getFullYear(),
  //         NextDateShow.toNextDate.getMonth(),
  //         1
  //       );
  //       const lastDayOfCurrentMonth = new Date(
  //         NextDateShow.toNextDate.getFullYear(),
  //         NextDateShow.toNextDate.getMonth() + 1,
  //         0
  //       );
  //       return `${currentMonth.toLocaleString("en-US", {
  //         month: "long",
  //         day: "numeric",
  //         year: "numeric",
  //       })} - ${lastDayOfCurrentMonth.toLocaleString("en-US", {
  //         month: "long",
  //         day: "numeric",
  //         year: "numeric",
  //       })}`;
  //   }
  // };
  const formattedNextDate = () => {
    if (NextDateShow && NextDateShow.toNextDate) {
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
    } else {
      // Handle the case when NextDateShow or NextDateShow.toNextDate is null

      const newDate = new Date(NextDateShow.toNextDate);
      console.log(newDate, "-=-=-=-=-=-=-=-=-=-=-");
      newDate.setDate(newDate.getDate() - daysToAdd);
      setNextDateShow({ toNextDate: newDate });
      console.log("NextDateShow", "[[[[[[[]]]]]]]]]");
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
      {
        OptionDownload == "pdf" || OptionDownload == "excel"
          ? setLoading(false)
          : setLoading(true);
      }
      setOptionDownload("");
      // setLoading(true);
      simplePostCall(
        ApiConfig.GET_REPORT_LSIT + LinkReport,
        JSON.stringify(requestData)
      )
        .then((res) => {
          if (res.result) {
            console.log(res.result);
            setLoading(false);
            // Extract the array of items from the response
            const firstKey = res.filepath;
            setpdfData(firstKey);
            console.log(pdfData);
            if (!firstKey) {
              setOrderListData(res.listData ? res.listData : res.data);
              // if(LinkReport == "vehiclerunningsummaryreport"){
              //   setOrderListData(res?.listData);
              // }else{
              // setOrderListData(res?.data);
              // }
              console.log(res.data, "res.data************pdf");
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
  const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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

        <div className="col-lg-12 mt-2">
          <div className="UserTabel">
            <div className="heading">
              <div>
                <p>
                  <p>
                    {t("Date")}: {formattedNextDate()}
                  </p>
                </p>
              </div>
              <div className="multi-select-1">
                <Select
                  style={{ height: "40px", width: "180px" }}
                  className="custom-select"
                  placeholder={t("Vehicle list")}
                  onChange={(value) => setVehicleId(value)}
                >
                  <Option value={0} style={{ color: "rgba(156, 73, 0)" }}>
                    {t("Vehicle")}{" "}
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
                  id="selectBox"
                  style={{ height: "40px", width: "180px" }}
                  className="custom-select"
                  placeholder={t("Vehicle")}
                  value={optionData}
                  onChange={(value) => setOptionData(value)}
                >
                  <Option
                    selected
                    value="date"
                    style={{ color: "rgba(156, 73, 0)" }}
                  >
                    {t("Day")}
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
                  <th>{t("Sr.no")}</th>
                  <th>{t("Vehicle Number")}</th>
                  <th>{t("Driver")}</th>
                  <th>{t("Harch Breaking")}</th>
                  <th>{t("Harch Acceleration")}</th>

                  <th>{t("SeatBelt violation")}</th>
                  <th>{t("over Speeding")}</th>

                  <th>{t("Data")}</th>
                </tr>
              </thead>
              {loading ? (
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

            {OrderListData?.length === 0 && !loading && <NoDataComp />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

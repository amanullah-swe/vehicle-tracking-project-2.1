import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { calcLength, motion } from "framer-motion";
import { AppContext } from "../../../../context/AppContext";
import SubHeader from "../../../../sharedComponent/SubHeader";
import CommonDatePicker from "../../../../sharedComponent/CommonDatePicker";
import Dropdown from "react-bootstrap/Dropdown";
import { getWithAuthCall, simplePostCall } from "../../../../api/ApiServices";
import ApiConfig from "../../../../api/ApiConfig";
import { latestDate } from "../../../../sharedComponent/common";
import Loader from "../../../../sharedComponent/Loader";
import NoDataComp from "../../../../sharedComponent/NoDataComp";
import { set } from "lodash";
import "./temperaturereport.scss";
import { Link } from "react-router-dom";
import Import from "../../../../assets/images/ic-Import.svg";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment-timezone";
import "moment/locale/en-in";
import { Select } from "antd";

import {
  DateDDMMYYYY,
  ConvertTemperatureUnit,
  getTime,
} from "../../../../sharedComponent/common";
dayjs.extend(customParseFormat);
const { Option } = Select;
const Temperaturereport = () => {
  const {
    sidebar,
    setOptionDynamicDownload,
    LinkReport,
    OptionDynamicDownload,
  } = useContext(AppContext);
  const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });
  const [EndDate, setEndDate] = useState({ toDayEnd: new Date() });
  const maxDate = new Date();
  const [OptionDownload, setOptionDownload] = useState("");
  const { t } = useTranslation();
  const [format, setFormat] = useState("OptionDownload");
  const [NextPage, setNextPage] = useState(true);
  console.log("NextPage", NextPage);
  const [todaysdate, settodaydate] = useState();
  const [optionData, setOptionData] = useState("date");
  const [daysToAdd, setDaysToAdd] = useState(1);
  const [NextDateShow, setNextDateShow] = useState({ toNextDate: new Date() });
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date());
  const [endDayOfMonth, setEndDayOfMonth] = useState(new Date());
  const [VehicleId, setVehicleId] = useState("");
  const [startDate, setStartDate] = useState({ DateToday: new Date() });
  const [language, setLanguage] = useState("en");
  const [pageId, setpageId] = useState("");
  const [pageSize, setpageSize] = useState("");
  const [vehicleList, setvehicleList] = useState([]);

  const [selectedVehicleId, setSelectedVehicleId] = useState(0); // State for selected vehicle ID
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const [loading, setLoading] = useState(false);
  const [TempratureReportData, setTempratureReportData] = useState([]);
  const [pdfData, setpdfData] = useState("");
  // const [Timesettemp, setTimesettemp] = useState();
  const [selectedTime, setSelectedTime] = useState("");

  //state for timezone and time set
  console.log("ConvertTemperatureUnit=====>>>>>>>", ConvertTemperatureUnit);

  // State for weekStartDate and weekEndDate
  const handleNextButtonClick = () => {
    const { toNextDate, selectedOption } = NextDateShow;

    // Get the current date and format it to 'yyyy-MM-dd'
    const currentDateNext = latestDate(new Date(), "yyyy-MM-dd");

    console.log(currentDateNext, "*******newDate");
    // Get the new date from the state and format it to 'yyyy-MM-dd'
    const newDate = new Date(NextDateShow.toNextDate);
    console.log(newDate, "*******newDate");
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
    newDate.setDate(newDate.getDate() - daysToAdd);
    setNextDateShow({ toNextDate: newDate });
    console.log(`Subtracting ${daysToAdd} days. New date: ${newDate}`);
  };

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
  useEffect(() => {
    reportViewList(
      NextDateShow.toNextDate,
      firstDayOfMonth,
      endDayOfMonth,
      NextDateShow.toNextDate,
      optionData,
      LinkReport,
      selectedVehicleId,
      fromTime,
      toTime
      // selectedTime
    );
  }, [
    currentDate,
    NextDateShow,
    firstDayOfMonth,
    optionData,
    endDayOfMonth,
    LinkReport,
    selectedVehicleId,
    fromTime,
    toTime,
    // selectedTime,
  ]);

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
    reportViewList();
  }, [LinkReport]);
  useEffect(() => {
    if (VehicleId) {
      reportViewList(
        NextDateShow.toNextDate,
        firstDayOfMonth,
        endDayOfMonth,
        NextDateShow.toNextDate,
        optionData,
        LinkReport
      );
    }
  }, [
    OptionDownload,
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
        NextDateShow.toNextDate,
        firstDayOfMonth,
        endDayOfMonth,
        NextDateShow.toNextDate,
        optionData,
        LinkReport,
        VehicleId
      );
    }
  }, [
    OptionDownload,
    currentDate,
    NextDateShow,
    firstDayOfMonth,
    optionData,
    endDayOfMonth,
    LinkReport,
    VehicleId,
    fromTime,
    toTime,
    selectedTime,
  ]);
  const reportViewList = (selectedTime) => {
    console.log("selectedTime", selectedTime);
    let requestData;

    requestData = {
      format: OptionDownload,
      startdate: latestDate(selectedTime, "yyyy-MM-dd"),
      enddate: latestDate(selectedTime, "yyyy-MM-dd"),
      // enddate: "2024-02-15",
      // startDate: '2023-09-29',
      // enddate: '2023-09-29',
      // fromtimeval: "09:50:03",
      // totimeval: "10:30:23",
      // vehicle_id: "",

      fromtimeval: fromTime,
      totimeval: toTime,
      vehicle_id: VehicleId,
    };

    if (requestData) {
      setLoading(true);
      simplePostCall(
        ApiConfig.GET_REPORT_LSIT + LinkReport,
        JSON.stringify(requestData)
      )
        .then((res) => {
          console.log("*************res", res);
          console.log("*************res", res);
          if (res.result) {
            setLoading(false);

            // Extract the array of items from the response
            const firstKey = res.path;
            setpdfData(firstKey);
            if (!firstKey) {
              setTempratureReportData(res?.listData);
              console.log(TempratureReportData, "*******TempratureReportData");
            }
            // Set the array to the state
          } else {
            setOptionDownload("");
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
  const handleSetToday = () => {
    setCurrentDate({ toDayDate: new Date() }); // Set the current date
  };
  // const handleDropdownChange = (e) => {
  //   console.log("filteredArray", e.target.value);
  //   setSelectedVehicleId(e.target.value);
  // };
  console.log("fromTime,", fromTime);
  console.log("totime,", fromTime);
  const handleTimeChange = (fromTime, totime) => {
    if (fromTime && totime) {
      // console.log(values);
      const formattedFromTimes = fromTime.format("HH:mm:ss");
      const formattedToTimes = totime.format("HH:mm:ss");
      // console.log(formattedTimes);
      setFromTime(formattedFromTimes);
      setToTime(formattedToTimes);
      // setSelectedTime(formattedTimes);
      // setSelectedTime({setToTime:toTime,setFromTime:fromTime})
      // Use the stateToUpdate function to update state
      // console.log("SelectedTime", selectedTime);
    } else {
      // setSelectedTime("");
    }
  };
  // const getTime = (value) => {
  //   if (!value) return null; // Handle case when value is null
  //   return value.format("HH:mm:ss"); // Extract time in HH:mm format
  // };
  // const convertToHHMMSS = (timestamp) => {
  //   return moment(timestamp).format("HH:mm:ss");
  // };
  // const convertedtime=convertToHHMMSS("2024-02-22T05:16:10.000Z")
  console.log(TempratureReportData, "inside the lop");

  return (
    <>
      <motion.div
        className={sidebar && sidebar ? "taskMain " : "cx-active  taskMain"}
        id="cx-main"
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
      >
        <div
          id="cx-wrapper"
          className="Vehicle_inspition_dashboard heightFixed"
        >
          <div className="col-lg-12 mt-2">
            <div className="middle-header">
              <p>{t("Temperature Sensor Report")} </p>
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
            {/* {/* <SubHeader /> */}

            <div className="col-md-12 mt-2">
              <div className="UserTabel">
                <div className="heading">
                  <div className="Dateheading">
                    <p>
                      <p>{t("Date")} : {formattedNextDate()}</p>
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
                      {t("Vehicle")}  
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
                  <div className="">
                    <div className="innerSelectBox weekCounter datepicker-main BGiMP mr-3">
                      <CommonDatePicker
                        dateKey={"toDayDate"}
                        setDate={setCurrentDate}
                        data={currentDate}
                        //   showTimeSelect
                        //   timeFormat="HH:mm"
                        //   timeIntervals={15}
                        SetPlaceholder={"Today Date"}
                        dataDisbal={maxDate}
                      />
                    </div>
                  </div>
                  {/* <div className=" ">
                    <div className="innerSelectBox weekCounter datepicker-main BGiMP mr-3">
                      <CommonDatePicker
                        dateKey={"toDayEnd"}
                        setDate={setEndDate}
                        data={EndDate}
                        SetPlaceholder={"Today End"}
                        dataDisbal={maxDate}
                      />
                    </div>
                  </div> */}

                  <div className="timesettemp">
                    <TimePicker.RangePicker
                      format="HH:mm:ss"
                      value={[fromTime, toTime]}
                      placeholder={[t("Start Time"), t("End Time")]}
                     
                      onChange={(value) => {
                        if (value && value.length === 2) {
                          handleTimeChange(value[0], value[1], setFromTime); // Pass state variable directly
                          // if(!fromTime){
                          // }
                          // else {
                          //   handleTimeChange(value[1], setToTime); // Pass state variable directly
                          // }
                        } else {
                          // Handle null values or incomplete range selection if necessary
                          console.log("Invalid time range selected:", value);
                        }
                      }}
                    />
                  </div>
                  <div className="todayselect  ">
                    <button className="widthAdjusters" onClick={handleSetToday}>
                     {t("Today")} 
                    </button>
                  </div>
                  {/* <div className=" mb-4">
<div className="dropDowns">
  <Dropdown>
    <Dropdown.Toggle id="dropdown-basic">
      Select Vehicles
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <input type="text" className="form-control mb-1" />
      <Dropdown.Item href="#/action-2">
        Another action
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</div>
</div> */}

                  {/* <div className="  ">
                    <button
                      className="cx-btn-2"
                      onClick={() => {
                        reportViewList();
                      }}
                    >
                      Day
                    </button>
                  </div> */}
                  <div className="leftContent   d-flex justify-content-between align-items-center ">
                    <div class="btn-wrapper ">
                      <button
                        class="cx-btn-2"
                        onClick={handleprivesButtonClick}
                      >
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
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="heighScroller">
                    <table className="table tableAdmin table-striped">
                      <thead className="tableHead">
                        <tr>
                          <th>{t("Sr.no")}</th>
                          <th>{t("Vehicle")}</th>
                          <th>{t("Date")}</th>
                          <th>{t("Time")}</th>
                          <th>{t("Running Status")}</th>
                          <th>{t("Location")}</th>
                          <th>{t("Temperature-1")}</th>
                          <th>{t("Temperature-2")}</th>
                          <th>{t("Temperature-3")}</th>
                          <th>{t("Temperature-4")}</th>
                        </tr>
                      </thead>
                      {loading && pdfData ? (
                        <Loader />
                      ) : (
                        <>
                          <tbody className="tableBody">
                            {TempratureReportData &&
                            TempratureReportData?.length > 0 ? (
                              TempratureReportData?.map((data, index) => {
                                // console.log(data, "'''''''''''''''''''");
                                return (
                                  <>
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{data.vehicle_number}</td>
                                      <td>{data.logged_date}</td>
                                      <td>{data.logged_time}</td>
                                      <td>
                                        {data.metering_status == "A"
                                          ? t("Parked")
                                          : data.metering_status == "B"
                                          ? t("Running")
                                          : data.metering_status == "d"
                                          ? t("Idle")
                                          : t("Untracked")}{" "}
                                      </td>
                                      <td>
                                        {data.latitude}-{data.longitude}
                                      </td>
                                      <td>
                                        {data.temperature
                                          ? ConvertTemperatureUnit(
                                              data.temperature
                                            )
                                          : ""}{" "}
                                      </td>
                                      <td>
                                        {data.temperature2
                                          ? ConvertTemperatureUnit(
                                              data.temperature2
                                            )
                                          : ""}{" "}
                                      </td>
                                      <td>
                                        {data.temperature3
                                          ? ConvertTemperatureUnit(
                                              data.temperature3
                                            )
                                          : ""}{" "}
                                      </td>
                                      <td>
                                        {data.temperature4
                                          ? ConvertTemperatureUnit(
                                              data.temperature4
                                            )
                                          : ""}{" "}
                                      </td>
                                    </tr>
                                  </>
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </tbody>
                        </>
                      )}
                    </table>
                    {TempratureReportData?.length === 0 && !loading && (
                      <NoDataComp />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Temperaturereport;

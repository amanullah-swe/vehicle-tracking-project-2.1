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
  TimeFormatForAll,
  addInterval,
  latestDate,
} from "../../../sharedComponent/common";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import Import from "../../../assets/images/ic-Import.svg";
import ApiConfig from "../../../api/ApiConfig";
import {
  getWithAuthCall,
  simpleGetCall,
  simplePostCall,
  simplePostCallAll,
} from "../../../api/ApiServices";
import { notifyError } from "../../../sharedComponent/notify";
import { Value } from "sass";
import Loader from "../../../sharedComponent/Loader";
import NoDataComp from "../../../sharedComponent/NoDataComp";
import ImportUser from "../../../assets/images/imagesuser.png";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const ReportView = () => {
  return (
    <div>
      <Component1 />
    </div>
  );
};

export default ReportView;

const Component1 = () => {
  const [selectedDriver, setSelectedDriver] = useState(0);
  // const [vehicleList, setvehicleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const drivers = useSelector((state) => state.driver.drivers);
  // const vehicleList = useSelector((state) => state.vehicleList.vehicleList);
  const [vehicleList, setvehicleList] = useState([]);
  const [CustomerList, setcustomerList] = useState([]);
  const [MerchantList, setMerchantList] = useState([]);
  const [DeliveryPersonList, setDeliveryPersonList] = useState([]);

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
    if (MerchantId) {
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
    } else {
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
  }, [DriverId, MerchantId, VehicleId]);

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
    } else if (DispatchCustomerTd) {
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
    } else if (DeliveryPersonId) {
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
    } else if (CustomerList) {
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
    } else if (DeliveryPersonList) {
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
    // OptionDownload,
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
        dispatch_customer_id: DispatchCustomerTd,
        merchant_id: MerchantId,
        driver_id: DriverId,
        delivery_person_id: DeliveryPersonId,
        language: "en",
      };
    } else if (selelctedDrop === "week") {
      // Handle OtherMonth case
      requestData = {
        format: OptionDownload,
        startdate: latestDate(weekStart, "yyyy-MM-dd"),
        enddate: latestDate(weekEnd, "yyyy-MM-dd"),
        vehicle_id: VehicleId,
        dispatch_customer_id: DispatchCustomerTd,
        merchant_id: MerchantId,
        driver_id: DriverId,
        delivery_person_id: DeliveryPersonId,
        language: "en",
      };
    } else {
      // Handle other cases
      requestData = {
        format: OptionDownload,
        startdate: latestDate(nextDate, "yyyy-MM-dd"),
        enddate: latestDate(nextDate, "yyyy-MM-dd"),
        vehicle_id: VehicleId,
        dispatch_customer_id: DispatchCustomerTd,
        merchant_id: MerchantId,
        driver_id: DriverId,
        delivery_person_id: DeliveryPersonId,
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

  useEffect(() => {
    getVehicelList();
    getCustomerList();
    getMerchantList();
    getDeliveryPersonList();
    getDriverList();
  }, [,]);

  /// Vehicle DropDown List
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

  // Customer Dropdown List
  function getCustomerList() {
    simplePostCall(ApiConfig.CUSTOMER_DROPDOWN)
      .then((data) => {
        // setVehicalType(data?.data);
        setcustomerList(data?.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  // Merchant Dropdown List
  function getMerchantList() {
    simplePostCall(ApiConfig.MARCHANT_DROPDOWN)
      .then((data) => {
        setMerchantList(data?.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  // Delivery Person Dropdown List
  function getDeliveryPersonList() {
    getWithAuthCall(ApiConfig.DRIVER_AVALIVALITY_DROPDAWAN)
      .then((data) => {
        // setVehicalType(data?.data);
        setDeliveryPersonList(data?.data);
        console.log("DeliveryPersonList", DeliveryPersonList);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  // Driver Dropdown List
  function getDriverList() {
    simpleGetCall(ApiConfig.GET_ALL_DRIVERS)
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
  // console.log(OrderListData,"OrderListData!!!!!!!!!!!");
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

        <div className="col-lg-12 mt-0">
          <div className="UserTabel">
            <div className="heading">
              <div>
                <p>
                  <p>
                    {t("Date")}: {formattedNextDate()}
                  </p>
                </p>
              </div>
              <div>
                {LinkReport == "dispatchreport" ? (
                  <div className="multi-select-1">
                    <Select
                      className="custom-select"
                      style={{ height: "40px", width: "180px" }}
                      placeholder={t("Vehicle list")}
                      onChange={(value) => setVehicleId(value)}
                    >
                      <Option value="" style={{ color: "rgba(156, 73, 0)" }}>
                        {t("Vehicle")}{" "}
                      </Option>
                      {vehicleList &&
                        vehicleList.map((vehicle) => (
                          <Option
                            value={vehicle.vehicle_id}
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            {vehicle.vehicle_number}
                          </Option>
                        ))}
                    </Select>
                  </div>
                ) : LinkReport == "dispatchreport/dispatchcustomerorder" ? (
                  <div className="multi-select-1">
                    <Select
                      className="custom-select"
                      style={{ height: "40px", width: "180px" }}
                      placeholder={t("Vehicle list")}
                      onChange={(value) => setDispatchCustomerTd(value)}
                    >
                      <Option value="" style={{ color: "rgba(156, 73, 0)" }}>
                        {t("Customer")}{" "}
                      </Option>
                      {CustomerList &&
                        CustomerList.map((customer) => (
                          <Option
                            value={customer.dispatch_customer_id}
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            {customer.dispatch_customer_name}
                          </Option>
                        ))}
                    </Select>
                  </div>
                ) : LinkReport == "dispatchreports/customerordersummary" ? (
                  <div className="multi-select-1">
                    <Select
                      className="custom-select"
                      style={{ height: "40px", width: "180px" }}
                      placeholder={t("Vehicle list")}
                      onChange={(value) => setDispatchCustomerTd(value)}
                    >
                      <Option value="" style={{ color: "rgba(156, 73, 0)" }}>
                        {t("Customer")}
                      </Option>
                      {CustomerList &&
                        CustomerList.map((customer) => (
                          <Option
                            value={customer.dispatch_customer_id}
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            {customer.dispatch_customer_name}
                          </Option>
                        ))}
                    </Select>
                  </div>
                ) : LinkReport == "dispatchreport/deliverypersonorder" ? (
                  <div className="multi-select-1">
                    <Select
                      className="custom-select"
                      style={{ height: "40px", width: "180px" }}
                      placeholder={t("Vehicle list")}
                      onChange={(value) => setDeliveryPersonId(value)}
                    >
                      <Option value="" style={{ color: "rgba(156, 73, 0)" }}>
                        {t("Delivery Person")}
                      </Option>
                      {DeliveryPersonList &&
                        DeliveryPersonList.map((Person) => (
                          <Option
                            Value={Person.user_id}
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            {Person.user_name}
                          </Option>
                        ))}
                    </Select>
                  </div>
                ) : LinkReport == "dispatchreports/merchantordersummary" ? (
                  <div className="multi-select-1">
                    <Select
                      className="custom-select"
                      style={{ height: "40px", width: "180px" }}
                      placeholder={t("Vehicle list")}
                      onChange={(value) => setMerchantId(value)}
                    >
                      <Option value="" style={{ color: "rgba(156, 73, 0)" }}>
                        {t("Merchant")}{" "}
                      </Option>
                      {MerchantList &&
                        MerchantList.map((Person) => (
                          <Option
                            value={Person.vendor_id}
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            {Person.vendor_name}
                          </Option>
                        ))}
                    </Select>
                  </div>
                ) : LinkReport == "dispatchreport/merchantorder" ? (
                  <div className="multi-select-1">
                    <Select
                      className="custom-select"
                      style={{ height: "40px", width: "180px" }}
                      placeholder={t("Vehicle list")}
                      onChange={(value) => setMerchantId(value)}
                    >
                      <Option value="" style={{ color: "rgba(156, 73, 0)" }}>
                        {t("Merchant")}
                      </Option>
                      {MerchantList &&
                        MerchantList.map((Person) => (
                          <Option
                            Value={Person.vendor_id}
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            {Person.vendor_name}
                          </Option>
                        ))}
                    </Select>
                  </div>
                ) : LinkReport ==
                  "dispatchreports/merchant-driver-loading-unloading" ? (
                  <>
                    <div className="multi-select-1">
                      <Select
                        className="custom-select"
                        style={{ height: "40px", width: "200px" }}
                        placeholder={t("Vehicle list")}
                        onChange={(value) => setMerchantId(value)}
                      >
                        <Option value="" style={{ color: "rgba(156, 73, 0)" }}>
                          {t("Select Merchant")}{" "}
                        </Option>
                        {MerchantList &&
                          MerchantList.map((Person) => (
                            <Option
                              value={Person.vendor_id}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              {Person.vendor_name}
                            </Option>
                          ))}
                      </Select>
                    </div>
                    <div className="multi-select-1">
                      <Select
                        className="custom-select"
                        style={{ height: "40px", width: "200px" }}
                        placeholder={t("Vehicle list")}
                        onChange={(value) => setDriverId(value)}
                      >
                        <Option value="" style={{ color: "rgba(156, 73, 0)" }}>
                          {t("Select Driver")}{" "}
                        </Option>
                        {DriverList &&
                          DriverList.map((Person) => (
                            <Option
                              value={Person.driver_id}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              {Person.driver_name}
                            </Option>
                          ))}
                      </Select>
                    </div>
                  </>
                ) : (
                  ""
                )}
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
            {LinkReport == "dispatchreport" ? (
              <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Driver")}</th>
                    {/* <th>{t("Image")}</th> */}
                    <th>{t("Vehicle")}</th>
                    <th>{t("Vehicle Reg No")}</th>
                    <th>{t("Vehicle Imei")}</th>
                    <th>{t("Start Date")}</th>
                    <th>{t("Start Time")}</th>
                  </tr>
                </thead>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <tbody className="tableBody ">
                      {OrderListData && OrderListData.length > 0 ? (
                        OrderListData?.map((itemlist, index) => {
                          return (
                            <>
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  <img
                                    src={
                                      itemlist?.user_profile_pic
                                        ? ApiConfig.BASE_URL_FOR_IMAGES +
                                          itemlist?.user_profile_pic
                                        : ""
                                    }
                                    onError={(ev) => {
                                      handleErrorImage(ev);
                                    }}
                                    alt=""
                                    width={"35px"}
                                    height={"35px"}
                                    style={{
                                      borderRadius: "50%",
                                      overflow: "hidden",
                                      marginRight: "10px",
                                    }}
                                  />
                                  {itemlist.user_name ? itemlist.user_name : ""}
                                </td>

                                <td>
                                  {itemlist.vehicle_number
                                    ? itemlist.vehicle_number
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.vehicle_reg_no
                                    ? itemlist.vehicle_reg_no
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.vehicle_imei
                                    ? itemlist.vehicle_imei
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.trips_history_start_date
                                    ? itemlist.trips_history_start_date
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.trips_history_start_time
                                    ? itemlist.trips_history_start_time
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
            ) : LinkReport == "dispatchreport/dispatchcustomerorder" ? (
              <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Dispatch Customer Name")}</th>
                    <th>{t("Order Number")}</th>
                    <th>{t("Number of Goods")}</th>
                    <th>{t("Dispatch Status")}</th>
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
                                  {itemlist.dispatch_customer_name
                                    ? itemlist.dispatch_customer_name
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.dispatch_package_order_number
                                    ? itemlist.dispatch_package_order_number
                                    : ""}
                                </td>
                                <td>{itemlist.number_of_goods}</td>
                                <td>
                                  {itemlist.dispatch_package_status
                                    ? itemlist.dispatch_package_status
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
            ) : LinkReport == "dispatchreport/deliverypersonorder" ? (
              <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Delivery Person Name")}</th>
                    <th>{t("Order Number")}</th>
                    <th>{t("Number of Packets")}</th>
                    <th>{t("Dispatch Status")}</th>
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
                                  {itemlist.delivery_person_name
                                    ? itemlist.delivery_person_name
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.dispatch_package_order_number
                                    ? itemlist.dispatch_package_order_number
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.dispatch_package_count
                                    ? itemlist.dispatch_package_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.dispatch_package_status
                                    ? itemlist.dispatch_package_status
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
            ) : LinkReport == "dispatchreports/merchantordersummary" ? (
              <table className="table tableAdmin">
                <thead className="tableHead ">
                  <tr>
                    <th className="text-center" rowspan="2">
                      {t("Sr.no")}
                    </th>
                    <th className="text-center" rowspan="2">
                      {t("Merchant")}
                    </th>
                    <th className="text-center w-2" rowspan="2">
                      {t("Date")}
                    </th>
                    <th className="text-center" colSpan="2">
                      {t("Pending")}
                    </th>
                    <th className="text-center ">{t("Assigned")}</th>
                    <th className="text-center ">{t("Picked Up")}</th>
                    <th className="text-center ">{t("Dispatched")}</th>
                    <th className="text-center ">{t("Delivered")}</th>
                    <th className="text-center ">{t("Paid")}</th>
                    <th className="text-center " colSpan="2">
                      {t("Canceled")}
                    </th>
                    <th className="text-center ">{t("Returned")}</th>
                  </tr>
                  <tr>
                    <th>{t("Count")}</th>
                    <th>{t("Amount")}</th>
                    <th>{t("Count")}</th>
                    <th>{t("Count")}</th>
                    <th>{t("Count")}</th>
                    <th>{t("Count")}</th>
                    <th>{t("Count")}</th>
                    <th>{t("Count")}</th>
                    <th>{t("Amount")}</th>
                    <th>{t("Count")}</th>
                    <th>{t("Amount")}</th>
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
                                  {itemlist.vendor_name
                                    ? itemlist.vendor_name
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.package_order_datetime
                                    ? DateDDMMYYYY(
                                        itemlist.package_order_datetime
                                      )
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_placed_count
                                    ? itemlist.order_placed_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_placed_amount
                                    ? itemlist.order_placed_amount
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.delivery_person_count
                                    ? itemlist.delivery_person_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_on_the_way_count
                                    ? itemlist.order_on_the_way_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_dispatched_count
                                    ? itemlist.order_dispatched_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.delivered_count
                                    ? itemlist.delivered_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.payment_done_count
                                    ? itemlist.payment_done_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_return_from_customer_count
                                    ? itemlist.order_return_from_customer_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_return_from_customer_amount
                                    ? itemlist.order_return_from_customer_amount
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_returned_to_store_count
                                    ? itemlist.order_returned_to_store_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_returned_to_store_amount
                                    ? itemlist.order_returned_to_store_amount
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
            ) : LinkReport == "dispatchreports/customerordersummary" ? (
              <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th rowspan="2">{t("Sr.no")}</th>
                    <th rowspan="2">{t("Customer Name")}</th>
                    <th rowspan="2" className="w-2">
                      {t("Date")}
                    </th>
                    <th colSpan="2" className="text-center">
                      {t("Pending")}
                    </th>
                    <th className="text-center">{t("Assigned")}</th>
                    <th className="text-center">{t("Picked Up")}</th>
                    <th className="text-center">{t("Dispatched ")}</th>
                    <th className="text-center">{t("Delivered")}</th>
                    <th className="text-center">{t("Paid")}</th>
                    <th className="text-center" colSpan="2">
                      {t("Canceled")}
                    </th>
                    <th className="text-center">{t("Returned")}</th>
                  </tr>
                  <tr>
                    <th className="text-center">{t("Count")}</th>
                    <th className="text-center">{t("Amount")}</th>
                    <th className="text-center">{t("Count")}</th>
                    <th className="text-center">{t("Count")}</th>
                    <th className="text-center">{t("Count")}</th>
                    <th className="text-center">{t("Count")}</th>
                    <th className="text-center">{t("Count")}</th>
                    <th className="text-center">{t("Count")}</th>
                    <th className="text-center">{t("Amount")}</th>
                    <th className="text-center">{t("Count")}</th>
                    <th className="text-center">{t("Amount")}</th>
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
                                  {itemlist.dispatch_customer_name
                                    ? itemlist.dispatch_customer_name
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.package_order_datetime
                                    ? itemlist.package_order_datetime
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_placed_count
                                    ? itemlist.order_placed_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_placed_amount
                                    ? itemlist.order_placed_amount
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.delivery_person_count
                                    ? itemlist.delivery_person_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_on_the_way_count
                                    ? itemlist.order_on_the_way_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_dispatched_count
                                    ? itemlist.order_dispatched_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.delivered_count
                                    ? itemlist.delivered_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.payment_done_count
                                    ? itemlist.payment_done_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_return_from_customer_count
                                    ? itemlist.order_return_from_customer_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_return_from_customer_amount
                                    ? itemlist.order_return_from_customer_amount
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_returned_to_store_count
                                    ? itemlist.order_returned_to_store_count
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.order_returned_to_store_amount
                                    ? itemlist.order_returned_to_store_amount
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
            ) : LinkReport ==
              "dispatchreports/merchant-driver-loading-unloading" ? (
              <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Order Number")}</th>
                    <th>{t("Order Date_&_Time")}</th>
                    <th>{t("Driver Name")}</th>
                    <th>{t("Vehicle Number")}</th>
                    <th>{t("Merchant Name")}</th>
                    <th>{t("Customer Name")}</th>
                    <th>{t("Load Start Time")}</th>
                    <th>{t("Load End Time")}</th>
                    <th>{t("Load Duration Time")}</th>
                    <th>{t("Unload Start Time")}</th>
                    <th>{t("Unload End Time")}</th>
                    <th>{t("UnLoad Duration Time")}</th>
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
                                  {itemlist.dispatch_package_order_number
                                    ? itemlist.dispatch_package_order_number
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.dispatch_package_order_datetime
                                    ? `${DateDDMMYYYY(
                                        moment(
                                          itemlist.dispatch_package_order_datetime
                                        ).format("YYYY-MM-DD")
                                      )} ${moment(
                                        itemlist.dispatch_package_order_datetime
                                      ).format("hh:mm:ss")}`
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.driver_name
                                    ? itemlist.driver_name
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.vehicle_number
                                    ? itemlist.vehicle_number
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.vendor_name
                                    ? itemlist.vendor_name
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.dispatch_customer_name
                                    ? itemlist.dispatch_customer_name
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.startloading
                                    ? `${DateDDMMYYYY(
                                        moment(itemlist.startloading).format(
                                          "YYYY-MM-DD"
                                        )
                                      )} ${moment(itemlist.startloading).format(
                                        "hh:mm:ss"
                                      )}`
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.endLoading
                                    ? `${DateDDMMYYYY(
                                        moment(itemlist.endLoading).format(
                                          "YYYY-MM-DD"
                                        )
                                      )} ${moment(itemlist.endLoading).format(
                                        "hh:mm:ss"
                                      )}`
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.timeLoadingDifference
                                    ? itemlist.timeLoadingDifference
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.startunloading
                                    ? `${DateDDMMYYYY(
                                        moment(itemlist.startunloading).format(
                                          "YYYY-MM-DD"
                                        )
                                      )} ${moment(
                                        itemlist.startunloading
                                      ).format("hh:mm:ss")}`
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.endunloading
                                    ? `${DateDDMMYYYY(
                                        moment(itemlist.endunloading).format(
                                          "YYYY-MM-DD"
                                        )
                                      )} ${moment(itemlist.endunloading).format(
                                        "hh:mm:ss"
                                      )}`
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.timeUnLoadingDifference
                                    ? itemlist.timeUnLoadingDifference
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
            ) : LinkReport == "dispatchreport/merchantorder" ? (
              <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Dispatch Merchant Name")}</th>
                    <th>{t("Order Number")}</th>
                    <th>{t("Number of Goods")}</th>
                    <th>{t("Dispatch Status")}</th>
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
                                  {itemlist.vendor_name
                                    ? itemlist.vendor_name
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.dispatch_package_order_number
                                    ? itemlist.dispatch_package_order_number
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.number_of_goods
                                    ? itemlist.number_of_goods
                                    : ""}
                                </td>
                                <td>
                                  {itemlist.dispatch_package_status
                                    ? itemlist.dispatch_package_status
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

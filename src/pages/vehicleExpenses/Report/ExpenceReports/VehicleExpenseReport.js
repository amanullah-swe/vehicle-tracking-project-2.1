import React, { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
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
import { getWithAuthCall, simpleGetCall, simplePostCall } from "../../../../api/ApiServices";
import { notifyError } from "../../../../sharedComponent/notify";
import { Value } from "sass";
import Loader from "../../../../sharedComponent/Loader";
import NoDataComp from "../../../../sharedComponent/NoDataComp";
import { Select } from "antd";
const { Option } = Select;
const VehicleExpenseReport = () => {
  


 
  const [selectedDriver, setSelectedDriver] = useState(0);
  // const [vehicleList, setvehicleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const drivers = useSelector((state) => state.driver.drivers);
  // const vehicleList = useSelector((state) => state.vehicleList.vehicleList);
  const [vehicleList, setvehicleList] = useState([]);
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
  const [incident_data, set_incident_data] = useState([]);
  const [accessory_data, set_accessory_data] = useState([]);
  const [spareparts_data, set_spareparts_data] = useState([]);
  const [fine_data, set_fine_data] = useState([]);
  const [fuel_data, set_fuel_data] = useState([]);
  const [pdfData, setpdfData] = useState("");
  console.log("pdfData", pdfData);
  const [NextPage, setNextPage] = useState(true);
  console.log("NextPage", NextPage);
  const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });
  const [optionData, setOptionData] = useState("date");
  const [VehicleId, setVehicleId] = useState("");
  const [DriverId, setDriverId] = useState("");
  const [DriverList, setDriverList] = useState([]);
  console.log(optionData);
  const [daysToAdd, setDaysToAdd] = useState(30);
  const [NextDateShow, setNextDateShow] = useState({ toNextDate: new Date() });
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date());
  const [endDayOfMonth, setEndDayOfMonth] = useState(new Date());
  const [OptionDownload, setOptionDownload] = useState("");
  const [EndDate, setEndDate] = useState({ toDayEnd: new Date() });

  // State for weekStartDate and weekEndDate
  const [weekStartDate, setWeekStartDate] = useState(new Date());

  const [weekEndDate, setWeekEndDate] = useState(new Date());
  const [checked_inc, setChecked_inc] = useState(false);
  const [checked_acc, setChecked_acc] = useState(false);
  const [checked_spar, setChecked_spar] = useState(false);
  const [checked_fine, setChecked_fine] = useState(false);
  const [checked_fuel, setChecked_fuel] = useState(false);
  const [accessory_checkbox, set_accessory_checkbox] = useState(1);
  const [fine_checkbox, set_fine_checkbox] = useState(1);
  const [fuel_checkbox, set_fuel_checkbox] = useState(1);
  const [incident_checkbox, set_incident_checkbox] = useState(1);
  const [spareparts_checkbox, set_spareparts_checkbox] = useState(1);

 
 
  
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
  }, [optionData, currentDate,EndDate]);

  

  // Pdf  and Exial

  // Api List UseEffacdt

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
           
        );
      
    }else if (DriverId) {
      reportViewList(
        currentDate.toDayDate,
        firstDayOfMonth,
        endDayOfMonth,
        NextDateShow.toNextDate,
        optionData,
        weekStartDate,
        weekEndDate,
        LinkReport,
       
      );
    }  
    else {
      reportViewList(
        currentDate.toDayDate,
        firstDayOfMonth,
        endDayOfMonth,
        NextDateShow.toNextDate,
        optionData,
        weekStartDate,
        weekEndDate
      );
    }
  }, [
    weekEndDate,
    weekStartDate,
    // currentDate,
    NextDateShow,
    firstDayOfMonth,
    optionData,
    endDayOfMonth,
    VehicleId,
    DriverId, checked_acc, checked_fine, checked_fuel, checked_inc, checked_spar
  ]);

  useEffect(() => {}, [LinkReport]);
  // useEffect(() => {
  //   if (VehicleId) {
  //       reportViewList();
  //   }
  //  }, [VehicleId]);

  

  useEffect(() => {
    if (OptionDownload === "pdf" || OptionDownload === "excel") {
      reportViewList(
        currentDate.toDayDate,
        firstDayOfMonth,
        endDayOfMonth,
        NextDateShow.toNextDate,
        optionData,
        weekStartDate,
        weekEndDate
      );
    }
  }, [OptionDownload]);

 /*  const reportViewList = () => {
    let requestData;

    
      requestData = {
        format: OptionDownload,
        startdate: latestDate(currentDate.toDayDate, "yyyy-MM-dd"),
        enddate: latestDate(EndDate.toDayEnd, "yyyy-MM-dd"),
         pageid:1,
        vehicle_id: VehicleId,
        driver_id:DriverId
      };
    

    if (requestData) {
      
      {OptionDownload == "pdf" || OptionDownload == "excel"  ? setLoading(false) : setLoading(true); }
      setOptionDownload("");
      simplePostCall(
        ApiConfig.TRIP_ASSIGNED_VERSUS_COMPLETED ,
        JSON.stringify(requestData)
      )
        .then((res) => {
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
  }; */

  useEffect(() => {
    getVehicelList();
    getDriverList()
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
  // Driver Dropdown List
  function getDriverList() {
    getWithAuthCall(ApiConfig.DRIVER_AVALIVALITY_DROPDAWAN)
      .then((data) => {
        // setVehicalType(data?.data);
        setDriverList(data?.data);
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
        incident_checkbox: /* incident_checkbox */ checked_inc ? 1 : 0,
        accessory_checkbox: /* accessory_checkbox */ checked_acc ? 1 : 0,
        spareparts_checkbox: /* spareparts_checkbox */ checked_spar ? 1 : 0,
        fine_checkbox: /* fine_checkbox */ checked_fine ? 1 : 0,
        fuel_checkbox: /* fuel_checkbox */ checked_fuel ? 1 : 0,
        language:"eng"
      };
    } else if (selelctedDrop === "week") {
      // Handle OtherMonth case
      requestData = {
        format: OptionDownload,
        startdate: latestDate(weekStart, "yyyy-MM-dd"),
        enddate: latestDate(weekEnd, "yyyy-MM-dd"),
        vehicle_id: VehicleId,
        incident_checkbox: checked_inc ? 1 : 0,
        accessory_checkbox: checked_acc ? 1 : 0,
        spareparts_checkbox: checked_spar ? 1 : 0,
        fine_checkbox: checked_fine ? 1 : 0,
        fuel_checkbox: checked_fuel ? 1 : 0,
        language:"eng"
      };
    } else {
      // Handle other cases
      requestData = {
        format: OptionDownload,
        startdate: latestDate(nextDate, "yyyy-MM-dd"),
        enddate: latestDate(nextDate, "yyyy-MM-dd"),
        vehicle_id: VehicleId,
        incident_checkbox: checked_inc ? 1 : 0,
        accessory_checkbox: checked_acc ? 1 : 0,
        spareparts_checkbox: checked_spar ? 1 : 0,
        fine_checkbox: checked_fine ? 1 : 0,
        fuel_checkbox: checked_fuel ? 1 : 0,
        language:"eng"
      
      };
    }
  
    if (requestData) {
      {
        OptionDownload == "pdf" || OptionDownload == "excel"
          ? setLoading(false)
          : setLoading(true);
      }
      setOptionDownload("");
      simplePostCall(
        ApiConfig.GET_VEHICLE_EXPENSE_REPORT /* + LinkReport */,
        JSON.stringify(requestData)
      )
        .then((res) => {
          if (res?.result) {
            console.log(res?.result);
            setLoading(false);
            setOptionDynamicDownload("");
            // Extract the array of items from the response
            const firstKey = res?.filepath;
  
            console.log(pdfData);
            setpdfData(firstKey);
            if (!firstKey) {
              setOrderListData(res?.listData ? res?.listData : res?.data);
              set_incident_data(res?.incident_data);
              set_accessory_data(res?.accessory_data);
              set_spareparts_data(res?.spareparts_data);
              set_fine_data(res?.fine_data);
              set_fuel_data(res?.fuel_data);
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
  const handleprivesButtonClick = () => {
    const newDate = new Date(NextDateShow.toNextDate);
    newDate.setDate(newDate.getDate() - daysToAdd);
    setNextDateShow({ toNextDate: newDate });
    console.log(`Subtracting ${daysToAdd} days. New date: ${newDate}`);
  };
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
              <div>
                <p>
                  <p>
                    {t("Date:")} {formattedNextDate()}
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
                  <Option value="" style={{ color: "rgba(156, 73, 0)" }}>
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
                  style={{ height: "40px", width: "100px" }}
                  id="selectBox"
                  placeholder={t("Vehicle")}
                  value={optionData}
                  onChange={(value) => setOptionData(value)}
                  className="custom-select"
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
            <div className="heading">
           <div className="container">
           <div className="row d-flex justify-content-between align-items-start">
           
       <div className="col-12 col-sm-6 col-md-4 col-lg-2">  
        
            <div className="btn-wrapper ms-2" style={{color:'#9C4900'}}>
              Incident
          
      <div className="btn-group ms-1" role="group" aria-label="Basic radio toggle button group">
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio1"
        autoComplete="off"
        value="1"
        // checked={selectedValue === '1'}
        checked={checked_inc}
        // onChange={(e) => setChecked(e.currentTarget.checked)}
        onClick={(e) => {setChecked_inc(true)
        
        }}
        // onChange={handleChange}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio1"  style={{fontSize: '0.8rem' ,  backgroundColor: checked_inc ?  '#9C4900' : '',
     color:  checked_inc  ?'white' : '#9C4900', 
     borderColor: '#9C4900',}}>
       Show
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio2"
        autoComplete="off"
        value="0"
        // checked_inc={selectedValue === '0'}
        checked={checked_inc}
        // onChange={handleChange}
        onClick={(e) => {setChecked_inc(false)
        
        }}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio2"  style={{fontSize: '0.8rem', backgroundColor: !checked_inc ?  '#9C4900' : 'white',
     color:  !checked_inc  ?'white' : '#9C4900', 
     borderColor: '#9C4900', }}>
        Hide
      </label>

    </div>
    </div>

   
      </div>
   
  <div className="col-12 col-sm-6 col-md-4 col-lg-2">
      <div className="btn-wrapper" style={{color:'#9C4900'}}>
              Accessory
          
      <div className="btn-group ms-1" role="group" aria-label="Basic radio toggle button group">
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio3"
        autoComplete="off"
        value="1"
        // checked={selectedValue === '1'}
        checked={checked_acc}
        // onChange={(e) => setChecked(e.currentTarget.checked)}
        onClick={(e) => {setChecked_acc(true)
      
        } }
        // onChange={handleChange}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio3"  style={{fontSize: '0.8rem' ,  backgroundColor: checked_acc ?  '#9C4900' : '',
     color:  checked_acc  ?'white' : '#9C4900', 
     borderColor: '#9C4900',}}>
       Show
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio4"
        autoComplete="off"
        value="0"
        // checked={selectedValue === '0'}
        checked={checked_acc}
        // onChange={handleChange}
        onClick={(e) => {setChecked_acc(false)
      
        } }
      />
      {console.log('checked_acc', checked_acc)}
      <label className="btn btn-outline-primary" htmlFor="btnradio4"  style={{fontSize: '0.8rem', backgroundColor: !checked_acc ?  '#9C4900' : 'white',
     color:  !checked_acc  ?'white' : '#9C4900', 
     borderColor: '#9C4900', }}>
        Hide
      </label>

    </div>
    </div>
     
      </div>
      
      <div className="col-12 col-sm-6 col-md-4 col-lg-2">
      <div className="btn-wrapper" style={{color:'#9C4900'}}>
      Spareparts
          
      <div className="btn-group ms-1" role="group" aria-label="Basic radio toggle button group">
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio5"
        autoComplete="off"
        value="1"
        // checked={selectedValue === '1'}
        checked={checked_spar}
        // onChange={(e) => setChecked(e.currentTarget.checked)}
        onClick={(e) => {setChecked_spar(true)
        }}
        // onChange={handleChange}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio5"  style={{fontSize: '0.8rem' ,  backgroundColor: checked_spar ?  '#9C4900' : '',
     color:  checked_spar  ?'white' : '#9C4900', 
     borderColor: '#9C4900',}}>
       Show
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio6"
        autoComplete="off"
        value="0"
        // checked={selectedValue === '0'}
        checked={checked_spar}
        // onChange={handleChange}
        onClick={(e) => {setChecked_spar(false)
        }}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio6"  style={{fontSize: '0.8rem', backgroundColor: !checked_spar ?  '#9C4900' : 'white',
     color:  !checked_spar  ?'white' : '#9C4900', 
     borderColor: '#9C4900', }}>
        Hide
      </label>

    </div>
    </div>
      </div>
     
     <div className="col-12 col-sm-6 col-md-4 col-lg-2">
      <div className="btn-wrapper" style={{color:'#9C4900'}}>
      Fine
          
      <div className="btn-group ms-1" role="group" aria-label="Basic radio toggle button group">
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio7"
        autoComplete="off"
        value="1"
        // checked={selectedValue === '1'}
        checked={checked_fine}
        // onChange={(e) => setChecked(e.currentTarget.checked)}
        onClick={(e) => {setChecked_fine(true)
        }}
        // onChange={handleChange}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio7"  style={{fontSize: '0.8rem' ,  backgroundColor: checked_fine ?  '#9C4900' : '',
     color:  checked_fine  ?'white' : '#9C4900', 
     borderColor: '#9C4900',}}>
       Show
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio8"
        autoComplete="off"
        value="0"
        // checked={selectedValue === '0'}
        checked={checked_fine}
        // onChange={handleChange}
        onClick={(e) => {setChecked_fine(false)
        }}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio8"  style={{fontSize: '0.8rem', backgroundColor: !checked_fine ?  '#9C4900' : 'white',
     color:  !checked_fine  ?'white' : '#9C4900', 
     borderColor: '#9C4900', }}>
        Hide
      </label>

    </div>
     
      </div>
      </div>
     
      <div className="col-12 col-sm-6 col-md-4 col-lg-2">
      <div className="btn-wrapper mr-2" style={{color:'#9C4900'}}>
      Fuel
          
      <div className="btn-group ms-1" role="group" aria-label="Basic radio toggle button group">
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio9"
        autoComplete="off"
        value="1"
        // checked={selectedValue === '1'}
        checked={checked_fuel}
        // onChange={(e) => setChecked(e.currentTarget.checked)}
        onClick={(e) => {setChecked_fuel(true)
        }}
        // onChange={handleChange}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio9"  style={{fontSize: '0.8rem' ,  backgroundColor: checked_fuel ?  '#9C4900' : '',
     color:  checked_fuel  ?'white' : '#9C4900', 
     borderColor: '#9C4900',}}>
       Show
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio10"
        autoComplete="off"
        value="0"
        // checked={selectedValue === '0'}
        checked={checked_fuel}
        // onChange={handleChange}
        onClick={(e) => {setChecked_fuel(false)
        }}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio10"  style={{fontSize: '0.8rem', backgroundColor: !checked_fuel ?  '#9C4900' : 'white',
     color:  !checked_fuel  ?'white' : '#9C4900', 
     borderColor: '#9C4900', }}>
        Hide
      </label>

    </div>
     
      </div>
      </div>
      </div>
      </div>
      </div>
    
           
            
            { !checked_inc ? (<></> ) : ( <>
            <div className="mt-2" style={{color:'#9C4900'}}>Vehicle Incedent </div>

                          <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr className="text-center">
                    <th>{t("Sr.No")}</th>
                    <th>{t("Vehicle No.")}</th>
                    <th>{t("Vehicle Reg. No.")}</th>
                    <th>{t("Vehicle IMEI")}</th>
                    <th>{t("Location")}</th>
                    <th>{t("Description")}</th>
                    <th>{t("Date")}</th>
                    <th>{t("Expense")}</th>
                   
                    
                  </tr>
                </thead>
                {loading  ? (
                  <Loader />
                ) : (
                  <>
                                   <tbody className="tableBody">

                      {incident_data && incident_data?.length > 0 ? (
                        incident_data?.map((itemlist, index) => {
                          return (
                            <>
                              <tr className="text-center">
                                <td>{index + 1}</td>
                                <td>
                                  {itemlist.vehicle_number  }
                                </td>
                                <td>
                                  {itemlist.vehicle_reg_no  }
                                </td>
                                <td>
                                  {itemlist.vehicle_imei  }
                                </td>

                                <td>
                                  {itemlist.incident_location  }
                                </td>

                                <td>
                                  {itemlist.incident_description  }
                                </td>
                                <td>
                                  {itemlist.incident_date  }
                                </td>
                                <td>
                                  {itemlist.incident_expense  }
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
            

            {incident_data?.length === 0 && !loading && <NoDataComp />}

            {/* start Vehicle accessory table//////////////////////////////////////////////////////////////////////////////////////////////////// */}
            </> ) }
            
            {!checked_acc ? <></> : <>
            <div className= 'mt-2' style={{color:'#9C4900'}}>Vehicle Accessory </div>

<table  className="table tableAdmin">
<thead className="tableHead">
<tr className="text-center">
<th>{t("Sr.No")}</th>
<th>{t("Vehicle No.")}</th>
<th>{t("Vehicle Reg. No.")}</th>
<th>{t("Vehicle IMEI")}</th>
<th>{t(" Accessory Item")}</th>
<th>{t("Quantity")}</th>
<th>{t(" Purchase Date")}</th>
<th>{t("Expense")}</th>


</tr>
</thead>
{loading  ? (
<Loader />
) : (
<>
         <tbody className="tableBody">

{accessory_data && accessory_data?.length > 0 ? (
accessory_data?.map((itemlist, index) => {
return (
  <>
    <tr className="text-center">
      <td>{index + 1}</td>
      <td>
        {itemlist.vehicle_number  }
      </td>
      <td>
        {itemlist.vehicle_reg_no  }
      </td>
      <td>
        {itemlist.vehicle_imei  }
      </td>

      <td>
        {itemlist.accessory_item  }
      </td>

      <td>
        {itemlist.accessory_quantity  }
      </td>
      <td>
        {itemlist.accessory_purchase_date  }
      </td>
      <td>
        {itemlist.accessory_price  }
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


{accessory_data?.length === 0 && !loading && <NoDataComp />}
            {/* End Vehicle accessory table//////////////////////////////////////////////////////////////////////////////////////////////////// */}
            </>}

            {!checked_spar ? <></> : <>
  {/* start Vehicle spareparts table//////////////////////////////////////////////////////////////////////////////////////////////////// */}
  <div className= 'mt-2' style={{color:'#9C4900'}}>Vehicle Spareparts </div>

<table className="table tableAdmin">
<thead className="tableHead">
<tr className="text-center">
<th>{t("Sr.No")}</th>
<th>{t("Vehicle No.")}</th>
<th>{t("Vehicle Reg. No.")}</th>
<th>{t("Vehicle IMEI")}</th>
<th>{t("  Spareparts Item")}</th>
<th>{t("undefined")}</th>
<th>{t("Quantity")}</th>
<th>{t(" Purchase Date")}</th>
<th>{t("Expense")}</th>


</tr>
</thead>
{loading  ? (
<Loader />
) : (
<>
         <tbody className="tableBody">

{spareparts_data && spareparts_data?.length > 0 ? (
spareparts_data?.map((itemlist, index) => {
return (
  <>
    <tr className="text-center">
      <td>{index + 1}</td>
      <td>
        {itemlist.vehicle_number  }
      </td>
      <td>
        {itemlist.vehicle_reg_no  }
      </td>
      <td>
        {itemlist.vehicle_imei  }
      </td>

      <td>
        {itemlist.spareparts_name  }
      </td>

      <td>
        {itemlist.spareparts_undefined}
      </td>
      <td>
        {itemlist.spareparts_quantity  }
      </td>
      <td>
        {itemlist.spareparts_purchase_date  }
      </td>
      <td>
        {itemlist.spareparts_amount  }
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


{spareparts_data?.length === 0 && !loading && <NoDataComp />}
            {/* End Vehicle spareparts table//////////////////////////////////////////////////////////////////////////////////////////////////// */}
            </>}


{!checked_fine ? <></> : <>
              {/* start Vehicle vehicle fine table//////////////////////////////////////////////////////////////////////////////////////////////////// */}
  <div className= 'mt-2' style={{color:'#9C4900'}}>Vehicle Fine </div>

<table className="table tableAdmin">
<thead className="tableHead">
<tr className="text-center">
<th>{t("Sr.No")}</th>
<th>{t("Vehicle No.")}</th>
<th>{t("Vehicle Reg. No.")}</th>
<th>{t("Vehicle IMEI")}</th>
<th>{t(" Fine Reason Item")}</th>
<th>{t("Date")}</th>
<th>{t("Status")}</th>
<th>{t("Expense")}</th>


</tr>
</thead>
{loading  ? (
<Loader />
) : (
<>
         <tbody className="tableBody">

{fine_data && fine_data?.length > 0 ? (
fine_data?.map((itemlist, index) => {
return (
  <>
    <tr className="text-center">
      <td>{index + 1}</td>
      <td>
        {itemlist.vehicle_number  }
      </td>
      <td>
        {itemlist.vehicle_reg_no  }
      </td>
      <td>
        {itemlist.vehicle_imei  }
      </td>

      <td>
        {itemlist.fine_reason  }
      </td>

      <td>
        {itemlist.fine_date}
      </td>
      <td>
        {itemlist.fine_status  }
      </td>
      <td>
        {itemlist.fine_amount  }
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


{fine_data?.length === 0 && !loading && <NoDataComp />}
            {/* End Vehicle fine table//////////////////////////////////////////////////////////////////////////////////////////////////// */}
            </>}

            {!checked_fuel ? <></> : <>
             {/* start Vehicle fuel table//////////////////////////////////////////////////////////////////////////////////////////////////// */}
  <div  className= 'mt-2' style={{color:'#9C4900'}}>Vehicle Fuel </div>

<table className="table tableAdmin">
<thead className="tableHead">
<tr className="text-center">
<th>{t("Sr.No")}</th>
<th>{t("Vehicle No.")}</th>
<th>{t("Vehicle Reg. No.")}</th>
<th>{t("Vehicle IMEI")}</th>
<th>{t("Current Odometer")}</th>
<th>{t("Quantity")}</th>
<th>{t("Purchase Date")}</th>
<th>{t("Expense")}</th>


</tr>
</thead>
{loading  ? (
<Loader />
) : (
<>
         <tbody className="tableBody">

{fuel_data && fuel_data?.length > 0 ? (
fuel_data?.map((itemlist, index) => {
return (
  <>
    <tr className="text-center">
      <td>{index + 1}</td>
      <td>
        {itemlist.vehicle_number  }
      </td>
      <td>
        {itemlist.vehicle_reg_no  }
      </td>
      <td>
        {itemlist.vehicle_imei  }
      </td>

      <td>
        {itemlist.vehicle_fuel_current_odometer  }
      </td>

      <td>
        {itemlist.vehicle_fuel_quantity}
      </td>
      <td>
        {itemlist.vehicle_fuel_date  }
      </td>
      <td>
        {itemlist.vehicle_fuel_amount  }
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


{fuel_data?.length === 0 && !loading && <NoDataComp />}
            {/* End Vehicle fuel table//////////////////////////////////////////////////////////////////////////////////////////////////// */}
            </>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleExpenseReport;

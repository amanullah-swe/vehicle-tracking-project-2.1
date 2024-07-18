import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useTranslation } from "react-i18next";
import Loader from "../../sharedComponent/Loader";
import { Link } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Form } from "react-bootstrap";
import { CLOSING } from "ws";
import { getWithAuthCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import CalendarDrivar from "./CalendarDrivar";
import CommonSelect from "../../sharedComponent/ReactSelect";
import "./../../assets/styles/calendar.scss";
import { Select } from "antd";
const { Option } = Select;

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
export default function VehicleAvailability() {
  const { sidebar } = useContext(AppContext);
  const [VehicalType, setVehicalType] = useState([]);
  const [vehicleList, setvehicleList] = useState([]);
  const [VehicelEvent, setVehicelEvent] = useState([]);
  const [optionList, setoptionList] = useState([]);
  const [VehicleId, setVehicleId] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1); // Initial month (1-12)
  const [selectedYear, setSelectedYear] = useState(moment().year());

  const [selectedValue, setSelectedValue] = useState();

  const [AddAccident, setAddAccident] = useState({
    vehicle_id: "",
  });
  const { t } = useTranslation();
  const event1 = {
    title: "Today",
    start: new Date(), // Start date (today)
    end: moment().add(2, "days").toDate(), // End date (today + 3 days)
  };

  const breakEvent = {
    title: "breakEvent",
    start: moment().add(3, "days").toDate(), // Start date (today + 3 days)
    end: moment().add(3, "days").toDate(), // End date (today + 4 days)
  };

  const event2 = {
    title: "Scheduled",
    start: moment().add(4, "days").toDate(), // Start date (today + 4 days)
    end: moment().add(6, "days").toDate(), // End date (today + 6 days)
  };

  const event3 = {
    title: "Instant",
    start: moment().add(8, "days").toDate(), // Start date (today + 4 days)
    end: moment().add(10, "days").toDate(), // End date (today + 6 days)
  };
  const event4 = {
    title: "completed",
    start: new Date(2023, 8, 1, 10, 0), // August 1, 2023, 10:00 AM
    end: new Date(2023, 8, 10, 15, 0), // August 1, 2023, 3:00 PM
  };
  const event5 = {
    title: "Weekends",
    start: new Date(2023, 10, 15, 10, 0), // August 1, 2023, 10:00 AM
    end: new Date(2023, 10, 20, 15, 0), // August 1, 2023, 3:00 PM
  };
  // Array of events to be displayed on the calendar
  const events = [event1, breakEvent, event2, event3, event4, event5];
  const [loading, setLoading] = useState(false);

  // const events = [
  //   {
  //     title: "Trip 1",
  //     start: new Date(2023, 7, 1, 10, 0), // August 1, 2023, 10:00 AM
  //     end: new Date(2023, 7, 1, 15, 0), // August 1, 2023, 3:00 PM
  //   },
  //   {
  //     title: "Shuttle",
  //     start: new Date(2023, 7, 1, 12, 0), // August 1, 2023, 12:00 PM
  //     end: new Date(2023, 7, 1, 13, 0), // August 1, 2023, 1:00 PM
  //   },
  // ];
  // const events = [
  //   {
  //     title: "Today",
  //     start: new Date(), // Current date and time
  //     end: new Date(), // Current date and time
  //     backgroundColor: "rgba(143, 67, 0, 1)",
  //   },
  //   {
  //     title: "Trip",
  //     start: new Date(2023, 7, 2, 10, 0), // August 2, 2023, 10:00 AM
  //     end: new Date(2023, 7, 2, 15, 0), // August 2, 2023, 3:00 PM
  //     backgroundColor: "rgba(213, 78, 33, 1)",
  //   },
  //   {
  //     title: "Instant Trip",
  //     start: new Date(2023, 7, 3, 10, 0), // August 3, 2023, 10:00 AM
  //     end: new Date(2023, 7, 3, 15, 0), // August 3, 2023, 3:00 PM
  //     backgroundColor: "rgba(66, 139, 202, 1)",
  //   },
  //   {
  //     title: "Shuttle",
  //     start: new Date(2023, 7, 4, 10, 0), // August 4, 2023, 10:00 AM
  //     end: new Date(2023, 7, 4, 15, 0), // August 4, 2023, 3:00 PM
  //     backgroundColor: "rgba(115, 113, 110, 1)",
  //   },
  //   {
  //     title: "Excursion",
  //     start: new Date(2023, 7, 5, 10, 0), // August 5, 2023, 10:00 AM
  //     end: new Date(2023, 7, 5, 15, 0), // August 5, 2023, 3:00 PM
  //     backgroundColor: "rgba(115, 113, 110, 1)",
  //   },
  //   {
  //     title: "Un-Planned Trip",
  //     start: new Date(2023, 7, 6, 10, 0), // August 6, 2023, 10:00 AM
  //     end: new Date(2023, 7, 6, 15, 0), // August 6, 2023, 3:00 PM
  //     backgroundColor: "rgba(115, 113, 110, 1)",
  //   },
  //   {
  //     title: "Weekends",
  //     start: new Date(2023, 7, 7, 10, 0), // August 7, 2023, 10:00 AM
  //     end: new Date(2023, 7, 8, 15, 0), // August 8, 2023, 3:00 PM
  //     backgroundColor: "rgba(115, 113, 110, 1)",
  //   },
  // ];
  useEffect(() => {
    getVehicelList();
  }, []);

  useEffect(() => {
    geAccidentDetails();
  }, [selectedMonth, selectedYear, VehicleId]);
  useEffect(() => {
    if (VehicleId) {
    } else {
    }
  }, [VehicleId]);

  function getVehicelList() {
    setLoading(true);

    getWithAuthCall(ApiConfig.VEHICEL_AVALIVALITY_DROPDAWAN)
      .then((data) => {
        // setVehicalType(data?.data);
        setLoading(false);

        setvehicleList(data?.data);
        console.log(vehicleList, ":::::::::::::::::::vehicleList");
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  useEffect(() => {
    if (AddAccident) {
      geAccidentDetails(AddAccident);
    }
  }, [AddAccident]);
  const geAccidentDetails = (id) => {
    let newRequestBody = JSON.stringify({
      vehicle_id: VehicleId,
      month: selectedMonth,
      year: selectedYear,
    });
    simplePostCall(ApiConfig.VEHICEL_AVALIVALITY_DATA, newRequestBody)
      .then((res) => {
        setVehicelEvent(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // const handleSelectChange = (event) => {
  //   const { value } = event.target;
  //   setSelectedValue(value);
  //   const newValue = { [setterKey]: value };
  //   setterFunctions((prevData) => ({
  //     ...prevData,
  //     ...newValue,
  //   }));
  //   if (setID) {
  //     componentId(value);
  //   }
  // };

  const localizer = momentLocalizer(moment);
  const handleClear = () => {
    setVehicleId(""); // Reset the dropdown value to default
  };
  return (
    <React.Fragment>
      <motion.div
        className={sidebar ? "taskMain " : "cx-active taskMain"}
        id="cx-main"
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <div id="cx-wrapper" className="Vehicle_Availability">
              <div className="upperMainSet">
                <div className="row">
                  <div className="col-md-8 form_input_main">
                    <div className="row PMINg">
                      {/* <div className="col-md-4"> */}
                      <div className="d-flex">
                        <div className="col-md-6 ">
                          <div className="multi-select-1">
                            <Select
                              style={{ width: "100%", height: "40px" }}
                              value={VehicleId}
                              onChange={(value) => setVehicleId(value)}
                              className="custom-select"
                            >
                              <Option
                                value={0}
                                style={{ color: "rgba(156, 73, 0)" }}
                              >
                                Vehicle
                              </Option>
                              {vehicleList.map((vehicle) => (
                                <Option
                                  style={{ color: "rgba(156, 73, 0)" }}
                                  key={vehicle.vehicle_id}
                                  value={vehicle.vehicle_id}
                                >
                                  {vehicle.vehicle_number}
                                </Option>
                              ))}
                            </Select>
                          </div>
                        </div>

                        <div className="mainCol4" style={{ marginLeft: "5px" }}>
                          <div className="leftSideSec">
                            <Link to="#" className="addParkBtn">
                              <button
                                className="clear_btn"
                                onClick={handleClear}
                              >
                                {t("Clear")}
                              </button>
                            </Link>
                          </div>
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mainCol4">
                    <div className="leftSideSec">
                      <Link
                        to="/VehicleAvailabilityList"
                        className="addParkBtn"
                      >
                        <button className="driver_btn">
                          {t("Show Available Vehicles")}
                        </button>
                      </Link>
                      {/* <Link to="#" className="addParkBtn">
                    <button>{t("Sync Geofence")}</button>
                  </Link> */}
                      {/* <Link to="#">
                    <div className="inconMain">
                      <img onClick={() => getExportChat()} src={Share} alt="" />
                    </div>
                  </Link> */}
                    </div>
                  </div>
                </div>
                <div className="row body-content">
                  <div className="col-md-8">
                    <div className="mainMape">
                      <div style={{ height: "740px" }}>
                        <Calendar
                          views={["month", "agenda"]}
                          localizer={localizer}
                          events={VehicelEvent}
                          startAccessor="start"
                          endAccessor="end"
                          eventPropGetter={(event, start, end, isSelected) => {
                            let className = "breakEvent";
                            switch (event.title) {
                              case "Today":
                                className = "event1";
                                break;
                              case "Scheduled":
                                className = "event2";
                                break;
                              case "Instant":
                                className = "event3";
                                break;
                              case "dispatched":
                                className = "breakEvent";
                                break;
                              case "completed":
                                className = "event4";
                                break;

                              case "Weekends":
                                className = "event5";
                                break;
                              default:
                                // className= "breakEvent" ;
                                break;
                            }
                            return { className };
                          }}
                        />

                        {/* <CalendarDrivar/> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="tabsCon">
                      <div className="vehicle_availability_category">
                        <label className="category_heading" htmlFor="">
                          {t("Categories")}
                        </label>
                      </div>
                      <hr className="my-1" />
                      <div>
                        {/* <div className="d-flex justify-content-between">
                      <label className="category_heading" htmlFor="">
                        Today
                      </label>
                      <div className="category_color_today"></div>
                    </div> */}
                        <div className="d-flex justify-content-between">
                          <label className="category_heading" htmlFor="">
                            {t("Trip / Scheduled")}
                          </label>
                          <div className="category_color_trip"></div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <label className="category_heading" htmlFor="">
                            {t("Instant Trip")}
                          </label>
                          <div className="category_color_iTrip"></div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <label className="category_heading" htmlFor="">
                            {t("dispatched")}
                          </label>
                          <div className="category_color_shuttle"></div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <label className="category_heading" htmlFor="">
                            {t("Completed")}
                          </label>
                          <div className="category_color_unplannedtrip"></div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <label className="category_heading" htmlFor="">
                            {t("Weekends")}
                          </label>
                          <div className="category_color_weekends"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </React.Fragment>
  );
}

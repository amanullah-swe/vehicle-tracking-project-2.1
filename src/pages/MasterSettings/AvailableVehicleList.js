import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useTranslation } from "react-i18next";
import Loader from "../../sharedComponent/Loader";
import { Link } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ar";
import { Form } from "react-bootstrap";
import { CLOSING } from "ws";
import { getWithAuthCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import CalendarDrivar from "./CalendarDrivar";
import CommonSelect from "../../sharedComponent/ReactSelect";
import { Select } from "antd";
const { Option } = Select;
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const localizer = momentLocalizer(moment);
export default function AvailableVehicleList() {
  const { sidebar } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const [VehicalType, setVehicalType] = useState([]);
  const [driverList, setdriverList] = useState([]);
  const [VehicelEvent, setVehicelEvent] = useState([]);
  const [driverSelect, setDriverSelect] = useState("");
  const { t } = useTranslation();
  const event1 = {
    title: t("Today"),
    start: new Date(), // Start date (today)
    end: moment().add(2, "days").toDate(), // End date (today + 3 days)
  };

  const breakEvent = {
    title: t("Today"),
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
    title: t("Today"),
    start: new Date(2023, 8, 1, 10, 0), // August 1, 2023, 10:00 AM
    end: new Date(2023, 8, 10, 15, 0), // August 1, 2023, 3:00 PM
  };
  const event5 = {
    title: t("Today"),
    start: new Date(2023, 10, 15, 10, 0), // August 1, 2023, 10:00 AM
    end: new Date(2023, 10, 20, 15, 0), // August 1, 2023, 3:00 PM
  };
  // Array of events to be displayed on the calendar
  const events = [event1, breakEvent, event2, event3, event4, event5];
  useEffect(() => {
    getVehicelList();
  }, [driverSelect]);
  function getVehicelList() {
    getWithAuthCall(ApiConfig.DRIVER_AVALIVALITY_DROPDAWAN)
      .then((data) => {
        //  setVehicalType(data.data);
        setdriverList(data.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  useEffect(() => {
    if (driverSelect) {
      getDriverList();
    }

  }, [driverSelect]);
  // useEffect(() => {
  //   if (driverSelect) {
  //     getDriverList();
  //   } else {
  //   }
  // }, [driverSelect]);

  const getDriverList = () => {
    // setLoading(true);

    let newRequestBody = JSON.stringify({
      driver_id: driverSelect,
    });
    simplePostCall(ApiConfig.DRIVER_AVALIVALITY_DATA, newRequestBody)
      .then((res) => {
        setVehicelEvent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleClear = () => {
    setDriverSelect(""); // Reset the dropdown value to default
    
    getVehicelList("")
    setVehicelEvent("")
    
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
                        <div className="col-md-6 weekCounter">
                          <div className="multi-select-1">
                            <Select
                              style={{ width: "100%", height: "40px" }}
                              placeholder="Driver list"
                              value={driverSelect}
                              onChange={(value) => setDriverSelect(value)}
                              className="custom-select"
                            >
                              <Option
                                value={0}
                                style={{ color: "rgba(156, 73, 0)" }}
                              >
                                Driver List
                              </Option>
                              {driverList.map((driver) => (
                                <Option
                                  style={{ color: "rgba(156, 73, 0)" }}
                                  key={driver.user_id}
                                  value={driver.user_id}
                                >
                                  {driver.user_name}
                                </Option>
                              ))}
                            </Select>
                          </div>
                        </div>

                        <div className="mainCol4" style={{ marginLeft: "5px" }}>
                          <div className="leftSideSec">
                            <Link to="#" className="addParkBtn">
                              <button
                                onClick={handleClear}
                                className="clear_btn"
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
                      <Link to="/DriverAvailabilityList" className="addParkBtn">
                        <button className="driver_btn">
                          {t("Show Available Driver")}
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
                              case t("Today"):
                                className = "event1";
                                break;
                              case t("Scheduled"):
                                className = "event2";
                                break;
                              case t("Instant"):
                                className = "event3";
                                break;
                              case t("Dispatch"):
                                className = "breakEvent";
                                break;
                              case t("Completed"):
                                className = "event4";
                                break;
                              case t("Weekends"):
                                className = "event5";
                              default:
                                className = "event5";
                                break;
                            }
                            return { className };
                          }}
                        />
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

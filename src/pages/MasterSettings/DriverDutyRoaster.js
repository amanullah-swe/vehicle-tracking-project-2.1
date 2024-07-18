import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Gantt, Task, TaskListHeader } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import Share from "../../assets/images/XMLID_1022_.svg";
import Calendar from "../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { simplePostCall } from "../../api/ApiServices";
import { notifyError } from "../../sharedComponent/notify";
import ApiConfig from "../../api/ApiConfig";
import { useEffect } from "react";
import { latestDate } from "../../sharedComponent/common";

export default function DriverDutyRoaster() {
  const { sidebar ,useDebounce} = useContext(AppContext);
  const { t } = useTranslation();
  const [endDate, setEndDate] = useState("")


  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  let tasks= [
    {
      start: new Date(2020, 1, 1, 7, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 14, 0), // 12:00 PM
      name: "John Doe",
      id: "Task 0",
      type: "",
      progress: 60,
      isDisabled: true,
      styles: { progressColor: "#D54E21", progressSelectedColor: "#D54E21" },
    },
    {
      start: new Date(2020, 1, 2, 10, 0), // 10:00 AM
      end: new Date(2020, 1, 2, 16, 0), // 2:00 PM
      name: "Paul Smith",
      id: "Task 1",
      type: "task",
      progress: 100,
      styles: { progressColor: "#E6EB00", progressSelectedColor: "#E6EB00" },
    },
    {
      start: new Date(2020, 1, 1, 7, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 14, 0), // 12:00 PM
      name: "Kristin Watson",
      id: "Task 2",
      type: "task",
      progress: 10,
      styles: { progressColor: "#428BCA", progressSelectedColor: "#428BCA" },
    },
    {
      start: new Date(2020, 1, 1, 8, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 16, 0), // 12:00 PM
      name: "Jerome Bell",
      id: "Task 3",
      type: "task",
      progress: 140,
      styles: { progressColor: "#D54E21", progressSelectedColor: "#D54E21" },
    },
    {
      start: new Date(2020, 1, 1, 10, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 18, 0), // 12:00 PM
      name: "Dianne Russell",
      id: "Task 4",
      type: "task",
      progress: 100,
      styles: { progressColor: "#73716E", progressSelectedColor: "#73716E" },
    },
    {
      start: new Date(2020, 1, 1, 6, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 20, 0), // 12:00 PM
      name: "Ronald Richards",
      id: "Task 5",
      type: "task",
      progress: 100,
      styles: { progressColor: "#D54E21", progressSelectedColor: "#D54E21" },
    },
    {
      start: new Date(2020, 1, 1, 5, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 20, 0), // 12:00 PM
      name: "Esther Howard",
      id: "Task 6",
      type: "task",
      progress: 100,
      styles: { progressColor: "#428BCA", progressSelectedColor: "#428BCA" },
    },
    {
      start: new Date(2020, 1, 1, 4, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 18, 0), // 12:00 PM
      name: "Bessie Cooper",
      id: "Task 7",
      type: "task",
      progress: 100,
      styles: { progressColor: "#D54E21", progressSelectedColor: "#D54E21" },
    },
    {
      start: new Date(2020, 1, 1, 7, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 11, 0), // 12:00 PM
      name: "Cameron Williamson",
      id: "Task 8",
      type: "task",
      progress: 100,
      styles: { progressColor: "#E6EB00", progressSelectedColor: "#E6EB00" },
    },
    {
      start: new Date(2020, 1, 1, 7, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 14, 0), // 12:00 PM
      name: "John Doe",
      id: "Task 0",
      type: "",
      progress: 60,
      isDisabled: true,
      styles: { progressColor: "#D54E21", progressSelectedColor: "#D54E21" },
    },
    {
      start: new Date(2020, 1, 2, 10, 0), // 10:00 AM
      end: new Date(2020, 1, 2, 16, 0), // 2:00 PM
      name: "Paul Smith",
      id: "Task 1",
      type: "task",
      progress: 100,
      styles: { progressColor: "#E6EB00", progressSelectedColor: "#E6EB00" },
    },
    {
      start: new Date(2020, 1, 1, 7, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 14, 0), // 12:00 PM
      name: "Kristin Watson",
      id: "Task 2",
      type: "task",
      progress: 10,
      styles: { progressColor: "#428BCA", progressSelectedColor: "#428BCA" },
    },
    {
      start: new Date(2020, 1, 1, 8, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 16, 0), // 12:00 PM
      name: "Jerome Bell",
      id: "Task 3",
      type: "task",
      progress: 140,
      styles: { progressColor: "#D54E21", progressSelectedColor: "#D54E21" },
    },
    {
      start: new Date(2020, 1, 1, 10, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 18, 0), // 12:00 PM
      name: "Dianne Russell",
      id: "Task 4",
      type: "task",
      progress: 100,
      styles: { progressColor: "#73716E", progressSelectedColor: "#73716E" },
    },
    {
      start: new Date(2020, 1, 1, 6, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 20, 0), // 12:00 PM
      name: "Ronald Richards",
      id: "Task 5",
      type: "task",
      progress: 100,
      styles: { progressColor: "#D54E21", progressSelectedColor: "#D54E21" },
    },
    {
      start: new Date(2020, 1, 1, 5, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 20, 0), // 12:00 PM
      name: "Esther Howard",
      id: "Task 6",
      type: "task",
      progress: 100,
      styles: { progressColor: "#428BCA", progressSelectedColor: "#428BCA" },
    },
    {
      start: new Date(2020, 1, 1, 4, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 18, 0), // 12:00 PM
      name: "Bessie Cooper",
      id: "Task 7",
      type: "task",
      progress: 100,
      styles: { progressColor: "#D54E21", progressSelectedColor: "#D54E21" },
    },
    {
      start: new Date(2020, 1, 1, 7, 0), // 8:00 AM
      end: new Date(2020, 1, 1, 11, 0), // 12:00 PM
      name: "Cameron Williamson",
      id: "Task 8",
      type: "task",
      progress: 100,
      styles: { progressColor: "#E6EB00", progressSelectedColor: "#E6EB00" },
    },
  ];


  const options = {
    hideTaskDetails: true, // Hide the "from" and "to" date labels
    hideTaskTime: true,
  };
  const debouncedSearchTerm = useDebounce(endDate, 500);
   useEffect(() => {
    getDriverDetailsTask()
   }, [debouncedSearchTerm])
   

  const getDriverDetailsTask = () => {
    let newRequestBody = JSON.stringify({
   date:endDate?latestDate(endDate,"yyyy-MM-dd"):""
      });
      simplePostCall(ApiConfig.HOLIDAYA_LIST_EXPORT, newRequestBody)
        .then((res) => {
          if (res?.result === true) {
         
          } else {
            notifyError(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
        <div id="cx-wrapper" className="Driver_Duty_Roaster">
          <div className="upperMainSet">
            <div className="row">
              <div className="col-md-8 form_input_main">
                <div className="row PMINg">
                  {/* <div className="col-md-4"> */}
                  <div className="d-flex">
                    <div
                      className="datepicker-main"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="date to"
                    >
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="form-control"
                        placeholderText="Please Select Date"
                      />
                      {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                    </div>
                    <div className="mainCol4 ms-2">
                      <div className="leftSideSec">
                        <Link to="#" className="addParkBtn">
                          <button className="search_btn">{t("Search")}</button>
                        </Link>
                      </div>
                    </div>
                    <div className="mainCol4">
                      <div className="leftSideSec">
                        <Link to="#" className="addParkBtn">
                          <button className="clear_btn">{t("Clear")}</button>
                        </Link>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
              <div className="col-md-4 mainCol4">
                <div className="leftSideSec">
                  <Link to="#">
                    <div className="inconMain">
                      <img
                        //    onClick={() => getExportChat()}
                        src={Share}
                        alt=""
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row body-content">
              <div className="col-md-12">
                <div className="mainMape">
                  <div style={{ height: "600px" }}>
                    <div class="container px-4 text-center">
                      <div class="row">
                        <div class="col d-flex justify-content-center my-2">
                          <div class="d-flex ">
                            <div className="s_trip"></div>
                            <label className="mx-2" htmlFor="">
                              Scheduled Trip
                            </label>
                          </div>
                          <div class="d-flex ">
                            <div className="e_trip"></div>
                            <label className="mx-2" htmlFor="">
                              Excursion Trip
                            </label>
                          </div>
                          <div class="d-flex ">
                            <div className="i_trip"></div>
                            <label className="mx-2" htmlFor="">
                              Instant Trip
                            </label>
                          </div>
                          <div class="d-flex ">
                            <div className="sh_trip"></div>
                            <label className="mx-2" htmlFor="">
                              Shuttle Trip
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Gantt
                      tasks={tasks}
                      viewMode="Hour" // Set viewMode to "Hour" to display hours
                      options={options} // Hide the "from" and "to" fields
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
}

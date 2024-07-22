
import React, { useContext, useEffect, useState } from "react";
// import trip_icon from "../assets/images/trip_icon.svg";
import trip_icon from "../../../assets/images/Report/RpoetSubCat.svg";
// import AppContext from "antd/es/app/context";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { AppContext } from "../../../context/AppContext";
import CarImg from "../../../assets/images/carImg.svg";
import { useSelector } from "react-redux";
import { t } from "i18next";
const Reports = () => {
  const userRole = "noRole"
  const { t, i18n } = useTranslation();

  const accessreports = useSelector((state) => state.auth.accessreports);
  const accessRights = useSelector((state) => state.auth.accessRights);
  const addonModule = useSelector((state) => state.auth.addonModule);
  console.log("addonModule", addonModule)
  console.log("accessRights", accessRights)
  const { sidebar, setLinkReport, setReportHader, recordsPerPage, timeZone } =
    useContext(AppContext);
  useEffect(() => {
    console.log("sidebar", sidebar);
  }, []);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const addonSettingData = useSelector((state) => state.auth.addonModule);











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
        key={"motionAnimation"}
      >
        <div className="reportsMain">
          <div className="row gx-3 main-cards-wrapper" id="cx-wrapper">
            <>


              <div
                className={
                  sidebar ? "col-lg-4 col-md-6 mb-3" : "col-lg-3 col-md-6 mb-3"
                }
              >
                <div className="reportsCards">
                  <div className="cardHeader">
                    <h1>
                      {" "}
                      <img
                        src={CarImg}
                        height="20"
                        width="20"
                        className="mr-2"
                        alt=""
                      />{" "}
                      {t("Vehicle Running Reports")}
                    </h1>
                  </div>
                  <div className="cardBody">
                    <div className="elementsBox">

                      <div className="innerElements">
                        <i class="fa fa-road"></i>
                        <Link to="/ReportView" className="linkTxt"
                          onClick={() => {
                            setLinkReport("vehiclerunningsummaryreport")

                            setReportHader(t("Vehicle Running Reports / Vehicle Running Summary Report"))
                            localStorage.setItem(
                              "ReportLink",
                              "vehiclerunningsummaryreport"
                            );

                          }}
                        >
                          {t("Vehicle Running Summary Report")}
                        </Link>
                      </div>




                      <div className="innerElements">
                        <i class="fa fa-sliders"></i>
                        <Link to="/ReportView" className="linkTxt"

                          onClick={() => {
                            setLinkReport("vehicleignitionsummaryreport")
                            setReportHader(t("Vehicle Running Reports / Vehicle Ignition Summary Report"))
                            localStorage.setItem(
                              "ReportLink",
                              "vehicleignitionsummaryreport"
                            );
                          }}
                        >
                          {t("Vehicle Ignition Summary Report")}
                        </Link>
                      </div>
                      {/* <div className="innerElements">
                      <i class="fa fa-sliders"></i>
                      <Link to="/ReportView" className="linkTxt"
                        onClick={() => {
                          setLinkReport("vehicleignitionsummaryreport")
                          setReportHader('Vehicle Ignition Time Summary Report')
                          localStorage.setItem(
                            "ReportLink",
                            "vehicleignitionsummaryreport"
                          );
                        }}
                      >
                        Vehicle Ignition Time Summary Report
                      </Link>
                    </div> */}


                      <div className="innerElements">
                        <i class="fa fa-bus"></i>
                        <Link to="/ReportView" className="linkTxt"
                          onClick={() => {
                            setLinkReport("vehiclerunningreport")
                            setReportHader(t("Vehicle Running Reports / Vehicle Running Report"))
                            localStorage.setItem(
                              "ReportLink",
                              "vehiclerunningreport"
                            );
                          }}
                        >
                          {t("Vehicle Running Report")}
                        </Link>
                      </div>

                      <div className="innerElements">
                        <i class="fa fa-tasks"></i>
                        <Link to="/ReportView" className="linkTxt"
                          onClick={() => {
                            setLinkReport("vehiclestopagereport")
                            setReportHader(t("Vehicle Running Reports / Vehicle Stopage Report"))
                            localStorage.setItem(
                              "ReportLink",
                              "vehiclestopagereport"
                            );
                          }}
                        >
                          {t("Vehicle Stopage Report")}
                        </Link>
                      </div>
                      <div className="innerElements">
                        <i class="fa fa-tasks"></i>
                        <Link to="/ReportView" className="linkTxt"
                          onClick={() => {
                            setLinkReport("vehicleidlereport")
                            setReportHader(t("Vehicle Running Reports / Vehicle Idle Report"))
                            localStorage.setItem(
                              "ReportLink",
                              "vehicleidlereport"
                            );
                          }}
                        >
                          {t("Vehicle Idle Report")}
                        </Link>
                      </div>
                      <div className="innerElements">
                        <i class="fa fa fa-exchange fa-inverse"></i>
                        <Link to="/ReportView" className="linkTxt"
                          onClick={() => {
                            setLinkReport("vehiclefirstlastignitionreport")
                            setReportHader(t("Vehicle Running Reports / Vehicle First & Last Ignition Report"))

                            localStorage.setItem(
                              "ReportLink",
                              "vehiclefirstlastignitionreport"
                            );
                          }}
                        >
                          {t("Vehicle First & Last Ignition Report")}
                        </Link>
                      </div>
                      <div className="innerElements">
                        <i class="fa fa-map-marker fa-inverse"></i>
                        <Link to="/ReportView" className="linkTxt"

                          onClick={() => {
                            setLinkReport("vehiclelocationactivityreport")
                            setReportHader(t("Vehicle Running Reports / Vehicle Activity Report"))

                            localStorage.setItem(
                              "ReportLink",
                              "vehiclelocationactivityreport"
                            );
                          }}
                        >
                          {t("Vehicle Activity Report")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>



            <div
              className={
                sidebar ? "col-lg-4 col-md-6 mb-3" : "col-lg-3 col-md-6 mb-3"
              }
            >
              <div className="reportsCards">
                <div className="cardHeader">
                  <h1>
                    {" "}
                    <span class="fa fa-truck mr-2"></span>
                    {t("Vehicle Reports")}
                  </h1>
                </div>
                <div className="cardBody">
                  <div className="elementsBox">

                    <div className="innerElements">
                      <i class="fa fa-map"></i>
                      <Link to="/VehicleLocationReport" className="linkTxt"
                        onClick={() => {
                          setLinkReport("vehiclereport/livevehicleslocationreport")
                          setReportHader(t("Vehicle Reports / Live Vehicles Location Report"))

                          localStorage.setItem(
                            "ReportLink",
                            "vehiclereport/livevehicleslocationreport"
                          );
                        }}
                      >
                        {t("Live Vehicles Location Report")}

                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-bus"></i>
                      <Link to="/VehicleCountAndCapacity" className="linkTxt"
                        onClick={() => {
                          setLinkReport("graph/vehiclecountandseatcapacity")
                          setReportHader(t("Vehicle Reports / Vehicle Count And Capacity"))

                          localStorage.setItem(
                            "ReportLink",
                            "graph/vehiclecountandseatcapacity"
                          );
                        }}
                      >
                        {t("Vehicle Count and Seat Capacity")}
                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-map-marker"></i>
                      <Link to="/VehicleLocationSignal" className="linkTxt"
                        onClick={() => {
                          setLinkReport("vehiclereport/vehiclelocationsignal")
                          setReportHader(t("Vehicle Reports / Vehicle Location Signal"))

                          localStorage.setItem(
                            "ReportLink",
                            "vehiclereport/vehiclelocationsignal"
                          );
                        }}
                      >
                        {t("Vehicle Location Signal")}

                      </Link>
                    </div>
                    {/* <div className="innerElements">
                      <i class="fa fa-users"></i>
                      <Link to="/VehicleparkingSlot" className="linkTxt"
                        onClick={() => {
                          setLinkReport("vehicleparking")
                          setReportHader('Vehicle Parking Slot')
                          localStorage.setItem(
                            "ReportLink",
                            "vehicleparking"
                          );
                        }}
                      >
                        Vehicle Parking Attendance
                      </Link>
                    </div> */}


                    <div className="innerElements">
                      <i class="fa fa-tachometer"></i>
                      <Link to="/VehicleLocationSignal" className="linkTxt"

                        onClick={() => {
                          setLinkReport("vehiclespeed")
                          setReportHader(t("Vehicle Reports / Vehicle Speed Report"))

                          localStorage.setItem(
                            "ReportLink",
                            "reports/vehiclespeed"
                          );
                        }}
                      >
                        {t("Vehicle Speed Report")}
                      </Link>
                    </div>
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

export default Reports;

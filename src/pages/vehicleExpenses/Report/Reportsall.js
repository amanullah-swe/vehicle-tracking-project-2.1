import { React, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { Button, Col, Modal, Nav } from "react-bootstrap";
import ReportCardContain from "../../../assets/images/ReportCardContain.svg";
import RunningReport from "../../../assets/images/Report/RunningReport.svg";
import ReportPluse from "../../../assets/images/Report/ReportPluse.svg";
import ReportClose from "../../../assets/images/Report/ReportClose.svg";
import RpoetSubCat from "../../../assets/images/Report/RpoetSubCat.svg";
import ReportEye from "../../../assets/images/Report/ReportEye.svg";
import VehReport from "../../../assets/images/Report/VehReport.svg";
import TripReport from "../../../assets/images/Report/TripReport.svg";
import TrickingReport from "../../../assets/images/Report/TrickingReport.svg";
import DriverReport from "../../../assets/images/Report/DriverReport.svg";
import MaintenceReport from "../../../assets/images/Report/MaintenceReport.svg";
import AdminReport from "../../../assets/images/Report/AdminReport.svg";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Import from "../../../assets/images/ic-Import.svg";
import Pagenation from "../../../sharedComponent/Pagenation";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import { message } from "antd";
// import SubReports from "./DefaultReports/VehicleRunningReports";
import DefaultReport from "./DefaultReports/DefaultReport";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const DefaultReportList = [
  { title: "Vehicle Running Reports", id: "1", count: "8" },
  { title: "Vehicle Reports", id: "2", count: "9" },
  { title: "Trip Reports", id: "3", count: "8" },
  { title: " Tracking Reports", id: "4", count: "6" },
  { title: "Drivers & Users Reports", id: "5", count: "6" },
  { title: " Maintenance Reports", id: "6", count: "7" },
  { title: "Usage Statistics", id: "7", count: "7" },
];
const Vehicle_Running_Reports = [
  { title: " Vehicle Running Summary Report", id: "1" },
  { title: "Vehicle Ignition Summary Report", id: "2" },
  { title: "Vehicle Ignition Time Summary Report", id: "3" },
  { title: "Vehicle Running Report", id: "4" },
  { title: "Vehicle Stopage Report", id: "5" },
  { title: "Vehicle Idle Report", id: "6" },
  { title: "Vehicle First & Last Ignition Report", id: "7" },
  { title: "Vehicle Location Activity Report", id: "8" },
];
const Vehicle_Reports = [
  { title: " Live Vehicles Location Report", id: "1" },
  { title: "Vehicle Assignment History", id: "2" },
  { title: "Vehicle Count and Seat Capacity", id: "3" },
  { title: "Vehicle Location Signal", id: "4" },
  { title: "Vehicle Parking Attendance", id: "5" },
  { title: "Vehicle Speed Report", id: "6" },
  { title: "Over Speeding Report", id: "7" },
  { title: "Seatbelt Violation Report", id: "8" },
  { title: "Immobiliser Report", id: "9" },
];
const Trip_Reports = [
  { title: "Trip Activity Report", id: "1" },
  { title: "Trip Assigned Versus Completed", id: "2" },
  { title: "Trip Versus Pickup Count", id: "3" },
  { title: "Trip Manifest", id: "4" },
  { title: "Pickup point Report", id: "5" },
  { title: "Live Trip Location Report", id: "6" },
  // { title: "Dispatch Trip History Report", id: "7" },
  
];
const Tracking_Reports = [
  { title: "Unplanned Trips Autorouting", id: "1" },
  { title: "Find Nearest Vehicle", id: "2" },
  { title: "Location Visit History", id: "3" },
  { title: "Alerts", id: "4" },
  { title: "Temperature", id: "5" },
  { title: "Snaps", id: "6" },
];
const Drivers_Users_Reports = [
  { title: "Safe Driver Ranking Report", id: "1" },
  { title: "Harsh Acceleration and Harsh Breaking Report", id: "2" },
  { title: "Acceleration vs Deacceleration threshold report", id: "3" },
  { title: "User Attendance Report", id: "4" },
  { title: "User Activity Report", id: "5" },
  { title: "Verified Users Report", id: "6" },
];
const Maintenance_Reports = [
  { title: "Expiry / Due Reports", id: "1" },
  { title: "Maintenance Overdues Report", id: "2" },
  { title: "Maintenance Dues Soon Report", id: "3" },
  { title: "Driver Licence Expiry Report", id: "4" },
  { title: "Vehicle Expense Report", id: "5" },
  { title: "GPS Strength", id: "6" },
  { title: "GSM Signal Report", id: "7" },
];
const Usage_Statistics = [
  { title: "Google API Usage Statistics", id: "1" },
  { title: "System Reports Usage Statistics", id: "2" },
  { title: "Data Usage Report", id: "3" },
  { title: "Mobile App Details", id: "4" },
  { title: "Mobile App Usage Details", id: "5" },
  { title: "Last Login Details", id: "6" },
  { title: "Tracking Device and Sim Card Details", id: "7" },
];
const Reportsall = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;

  const [running, setRunning] = useState(false);
  const [shudreport, setShudreport] = useState(false);
  const [customreport, setCustomreport] = useState(false);

  const { sidebar, setSidebar, Dark, setDark, customerData } =
    useContext(AppContext);
  const [startDate, setStartDate] = useState(new Date());
  const [deleteModal, setDeleteModal] = useState(false);
  const { t, i18n } = useTranslation();
  const [customerId, setCustomerId] = useState("");
  const [getdata, setGetData] = useState(null);
  const [getTrip, setTrip] = useState(false);

  useEffect(() => {
    setCustomerId(customerData?.customer_id);
  }, [customerData?.customer_id]);

  const MainRunnig = () => {
    setRunning(false);
    setCustomreport(false);
    setShudreport(false);
  };
  const RunningReportFun = (id) => {
    setRunning(true);
  };
  const shduleReport = () => {
    setShudreport(true);
  };
  const CutoRepoprt = () => {
    setCustomreport(true);
  };
  //defalt ReportData
  const [deafultDataListReport, setDeafultDataListReport] = useState([]);
  const [defaultID, setDefaultID] = useState("");


  useEffect(() => {
    if (defaultID == 1) {
      setDeafultDataListReport(Vehicle_Running_Reports);
    }
    if (defaultID == 2) {
      setDeafultDataListReport(Vehicle_Reports);
    }
    if (defaultID == 3) {
      setDeafultDataListReport(Trip_Reports);
    }
    if (defaultID == 4) {
      setDeafultDataListReport(Tracking_Reports);
    }
    if (defaultID == 5) {
      setDeafultDataListReport(Drivers_Users_Reports);
    }
    if (defaultID == 6) {
      setDeafultDataListReport(Maintenance_Reports);
    }
    if (defaultID == 7) {
      setDeafultDataListReport(Usage_Statistics);
    }
  }, [defaultID, running]);

  // const TripButtonToggle = () => {
  //   setTrip(!getTrip);
  // };
  const TripButtonToggle = () => {
    setTrip(true);
  };

  return (
    <>
      <motion.div
        className={sidebar ? "taskMain " : "cx-active taskMain"}
        id="cx-main"
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
      >
        <div id="cx-wrapper">
          {userRole === "customer" ||
          (accessRights && accessRights?.rights_manage_reports) ? (
            <div className="mainVehAccident" id="Report_head_reponsive">
              <div className="row d-flex justify-content-end">
                <div className="col-lg-4 d-flex justify-content-end mb-3">
                  <Link to="/ScheduleReport">
                    <button className="cx-btn-3">
                      + {t("Schedule Report")}
                    </button>
                  </Link>
                  <Link to="/GenerateCustomReport">
                    <button className="cx-btn-3">+ {t("Custom Report")}</button>
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
          <div className="Vehcle-main-tabs" id="Report_responsive">
            <div className="main-master-wrapper mb-0 inner-tabs-section">
              <div id="scroll_insideThe_Padding">
                <Tab.Container
                  id="left-tabs-example"
                  className="td-tab-wrapper"
                  defaultActiveKey="1"
                >
                  <Nav
                    variant="pills"
                    className="td-nav"
                    id="InnerTabNew_Three"
                  >
                    <Nav.Item className="td-tab" onClick={()=>{
                      setDefaultID(1)
                      setRunning(false)
                    }}>
                      <Nav.Link className="td-link" eventKey="1">
                        {t("Default Reports")}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="td-tab">
                      <Nav.Link className="td-link" eventKey="2">
                        {t("Scheduled Reports")}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="td-tab">
                      <Nav.Link className="td-link" eventKey="3">
                        {t("Customized Reports")}
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Col sm={12} className="">
                    <Tab.Content>
                      <Tab.Pane eventKey="1">
                        <div className="yauto">
                          <div className="all-vehical-head row vehicle-top-inputs">
                            <div className="input-section-wrapper">
                              {/* <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Report Name"
                                  />
                                </div>
                              </div> */}
                            </div>

                            <div className="right-export-btn-section-wrapper">
                              <div className="c-pointer"></div>
                              <div className="c-pointer">
                                <img src={Import} alt="" />
                              </div>
                            </div>
                          </div>
                          {running === false ? (
                            <>
                              <div
                                className="row main-cards-wrapper gx-3"
                                data-aos="zoom-in"
                                data-aos-duration="500"
                              >
                                {DefaultReportList &&
                                  DefaultReportList?.map((ele, index) => {
                                    return (
                                      <div
                                        key={ele.id}
                                        className={
                                          sidebar
                                            ? "col-lg-4 col-md-6"
                                            : "col-lg-3 col-md-6"
                                        }
                                      >
                                        <div className="common-vehical-card-inner">
                                          <div
                                            className="vehical-card-head"
                                            id="report-main"
                                          >
                                            <div className="heading">
                                              <div className="d-flex">
                                                <img
                                                  src={RunningReport}
                                                  alt=""
                                                />
                                                <div className="">
                                                  <p className="sub-heading">
                                                    {t("Report Name")}
                                                  </p>
                                                  <p className="title">
                                                    {ele?.title}
                                                  </p>
                                                </div>
                                              </div>
                                              <img
                                                src={ReportPluse}
                                                alt=""
                                                className="add-icon"
                                                onClick={() => {
                                                  setDefaultID(ele.id);
                                                  RunningReportFun();
                                                }}
                                              />
                                            </div>
                                          </div>
                                          <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                            <div className="">
                                              <div className="card-contain ">
                                                <p className="sub-heading">
                                                  {t("No. of Reports")}
                                                </p>
                                                <p className="title">
                                                  {ele?.count}
                                                </p>
                                              </div>
                                              {/* <div className="card-contain">
                                        <p className="sub-heading">
                                          {t("Last Updated On")}
                                        </p>
                                      
                                      </div> */}
                                            </div>
                                            <div className="">
                                              <img
                                                src={ReportCardContain}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}

                         
                              </div>
                            </>
                          ) : (
                            // <>
                            // hello</>
                            <div
                              variants={aninations}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={{
                                duration: 0.3,
                              }}
                            >
                                  <div
                                    className=" row gx-3 main-cards-wrapper"
                                    id="Report_scrol"
                                    data-aos="zoom-in"
                                    data-aos-duration="500"
                                  >
                              {deafultDataListReport?.map((ele, index) => {
                                return (
                              
                                    <div
                                      className={
                                        sidebar
                                          ? "col-lg-4 col-md-6"
                                          : "col-lg-3 col-md-6"
                                      }
                                    >
                                      <div
                                        className={"common-vehical-card-inner "}
                                        id="inner-report-card"
                                      >
                                        {
                                          <div
                                            className="vehical-card-head"
                                            id="report-main"
                                          >
                                            <div className="heading">
                                              <div className="d-flex">
                                                <img src={RpoetSubCat} alt="" />
                                                <div className="">
                                                  <p className="sub-heading">
                                                    {t("Report Name")}
                                                  </p>
                                                  <p className="title">
                                                    {ele.title}
                                                  </p>
                                                </div>
                                              </div>
                                              <img
                                                src={ReportClose}
                                                alt=""
                                                className="add-icon"
                                                onClick={() => {
                                                  MainRunnig();
                                                }}
                                              />
                                              <Link to="/ReportView">
                                                <img
                                                  src={ReportEye}
                                                  alt=""
                                                  className="add-icon"
                                                />
                                              </Link>
                                            </div>
                                          </div>
                                        }
                                        <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                          <div className="">
                                            <div className="card-contain ">
                                              <p className="sub-heading">
                                                {t("No. of Reports")}
                                              </p>
                                              <p className="title">20</p>
                                            </div>
                                            <div className="card-contain">
                                              <p className="sub-heading">
                                                {t("Last Updated On")}
                                              </p>
                                              <p className="title">
                                                20-01-2023
                                              </p>
                                            </div>
                                          </div>
                                          <div className="">
                                            <img
                                              src={ReportCardContain}
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                              
                                );
                              })}
                                  </div>
                            </div>
                          )}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="2">
                        <div className="yauto">
                          <div className="all-vehical-head row vehicle-top-inputs">
                            <div className="input-section-wrapper">
                              <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Report Name"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="right-export-btn-section-wrapper">
                              <div className="c-pointer"></div>
                              <div className="c-pointer">
                                <img src={Import} alt="" />
                              </div>
                            </div>
                          </div>
                          {running === false ? (
                            <>
                              <div
                                className="row main-cards-wrapper gx-3"
                                data-aos="zoom-in"
                                data-aos-duration="500"
                              >
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div
                              variants={aninations}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={{
                                duration: 0.3,
                              }}
                            >
                              <div
                                className=" row gx-3 main-cards-wrapper"
                                id="Report_scrol"
                                data-aos="zoom-in"
                                data-aos-duration="500"
                              >
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className={"common-vehical-card-inner"}>
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportClose}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            MainRunnig();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="3">
                        <div className="yauto">
                          <div className="all-vehical-head row vehicle-top-inputs">
                            <div className="input-section-wrapper">
                              <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Report Name"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="right-export-btn-section-wrapper">
                              <div className="c-pointer"></div>
                              <div className="c-pointer">
                                <img src={Import} alt="" />
                              </div>
                            </div>
                          </div>
                          {running === false ? (
                            <>
                              <div
                                className="row main-cards-wrapper gx-3"
                                data-aos="zoom-in"
                                data-aos-duration="500"
                              >
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className="common-vehical-card-inner">
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportPluse}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            RunningReportFun();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div
                              variants={aninations}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={{
                                duration: 0.3,
                              }}
                            >
                              <div
                                className=" row gx-3 main-cards-wrapper"
                                id="Report_scrol"
                                data-aos="zoom-in"
                                data-aos-duration="500"
                              >
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div className={"common-vehical-card-inner"}>
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RunningReport} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <img
                                          src={ReportClose}
                                          alt=""
                                          className="add-icon"
                                          onClick={() => {
                                            MainRunnig();
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={"common-vehical-card-inner "}
                                    id="inner-report-card"
                                  >
                                    <div
                                      className="vehical-card-head"
                                      id="report-main"
                                    >
                                      <div className="heading">
                                        <div className="d-flex">
                                          <img src={RpoetSubCat} alt="" />
                                          <div className="">
                                            <p className="sub-heading">
                                              {t("Report Name")}
                                            </p>
                                            <p className="title">
                                              Vehicle Running Report
                                            </p>
                                          </div>
                                        </div>
                                        <Link to="/ReportView">
                                          <img
                                            src={ReportEye}
                                            alt=""
                                            className="add-icon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
                                      <div className="">
                                        <div className="card-contain ">
                                          <p className="sub-heading">
                                            {t("No. of Reports")}
                                          </p>
                                          <p className="title">20</p>
                                        </div>
                                        <div className="card-contain">
                                          <p className="sub-heading">
                                            {t("Last Updated On")}
                                          </p>
                                          <p className="title">20-01-2023</p>
                                        </div>
                                      </div>
                                      <div className="">
                                        <img src={ReportCardContain} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Tab.Container>
              </div>
              {/* <Pagenation /> */}
              {/* {t("Showing")} 1 - {7} {t("of")} {7} */}
            </div>
          </div>
        </div>

        {/* https://app.vehicletracking.qa/customer/reports?customer_id=?&customer_valid_key=94589db3b3ce89370488f2a7bac0ab94  */}
        <div className="" id="cx-wrapper">
          {customerId && (
            <div className="iframe-wrapoper">
              {/* <iframe src={`https://app.vehicletracking.qa/customer/reports?customer_id=${customerId}&customer_valid_key=${customerData.api_key}`}>
  <p>Your browser does not support iframes.</p>
</iframe> */}
            </div>
          )}
        </div>
      </motion.div>

      {/* Delete Modal Start */}
      <Modal
        Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        centered
        className="common-model"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Fleet Maintenance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to Delete this Fleet Maintenance ?
        </Modal.Body>
        <Modal.Footer className="pop-up-modal-footer">
          <div class="btn-wrapper">
            <button className="cx-btn-1" onClick={() => setDeleteModal(false)}>
              Cancel
            </button>
            <button className="cx-btn-2" onClick={() => setDeleteModal(false)}>
              Yes
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal End */}
    </>
  );
};

export default Reportsall;

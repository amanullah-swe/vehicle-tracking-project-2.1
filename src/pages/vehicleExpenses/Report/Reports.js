// import { React, useContext, useState } from "react";
// import { AppContext } from "../../../context/AppContext";
// import { Button, Col, Modal, Nav } from "react-bootstrap";
// import ReportCardContain from "../../../assets/images/ReportCardContain.svg";
// import RunningReport from "../../../assets/images/Report/RunningReport.svg";
// import ReportPluse from "../../../assets/images/Report/ReportPluse.svg";
// import ReportClose from "../../../assets/images/Report/ReportClose.svg";
// import RpoetSubCat from "../../../assets/images/Report/RpoetSubCat.svg";
// import ReportEye from "../../../assets/images/Report/ReportEye.svg";
// import VehReport from "../../../assets/images/Report/VehReport.svg";
// import TripReport from "../../../assets/images/Report/TripReport.svg";
// import TrickingReport from "../../../assets/images/Report/TrickingReport.svg";
// import DriverReport from "../../../assets/images/Report/DriverReport.svg";
// import MaintenceReport from "../../../assets/images/Report/MaintenceReport.svg";
// import AdminReport from "../../../assets/images/Report/AdminReport.svg";
// import { Dropdown, Tab, Tabs } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Import from "../../../assets/images/ic-Import.svg";
// import Pagenation from "../../../sharedComponent/Pagenation";
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import axios from "axios";
// import { message } from "antd";
// // import SubReports from "./DefaultReports/VehicleRunningReports";
// import DefaultReport from "./DefaultReports/DefaultReport";

// const Reports = () => {
//   const accessRights = useSelector((state) => state.auth.accessRights);
//   const userRole = accessRights && accessRights.rights_role;

//   const [running, setRunning] = useState(false);
//   const [shudreport, setShudreport] = useState(false);
//   const [customreport, setCustomreport] = useState(false);

//   const { sidebar, setSidebar, Dark, setDark, customerData } =
//     useContext(AppContext);
//   const [startDate, setStartDate] = useState(new Date());
//   const [deleteModal, setDeleteModal] = useState(false);
//   const { t, i18n } = useTranslation();
//   const [customerId, setCustomerId] = useState("");
//   const [getdata, setGetData] = useState(null);
//   const [getTrip, setTrip] = useState(false);

//   useEffect(() => {
//     setCustomerId(customerData?.customer_id);
//   }, [customerData?.customer_id]);

//   const MainRunnig = () => {
//     setRunning(false);
//     setCustomreport(false);
//     setShudreport(false);
//   };
//   const RunningReportFun = () => {
//     setRunning(true);
//   };
//   const shduleReport = () => {
//     setShudreport(true);
//   };
//   const CutoRepoprt = () => {
//     setCustomreport(true);
//   };
//   const aninations = {
//     initial: { opacity: 0, x: 400 },
//     animate: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: 100 },
//   };

//   // const TripButtonToggle = () => {
//   //   setTrip(!getTrip);
//   // };
//   const TripButtonToggle = () => {
//     setTrip(true);
//   };

//   return (
//     <>
//       <motion.div
//         className={sidebar ? "taskMain " : "cx-active taskMain"}
//         id="cx-main"
//         variants={aninations}
//         initial="initial"
//         animate="animate"
//         exit="exit"
//         transition={{ duration: 0.1 }}
//       >
//         <div id="cx-wrapper">
//           {userRole === "customer" ||
//           (accessRights && accessRights?.rights_manage_reports) ? (
//             <div className="mainVehAccident" id="Report_head_reponsive">
//               <div className="row d-flex justify-content-end">
//                 <div className="col-lg-4 d-flex justify-content-end mb-3">
//                   <Link to="/ScheduleReport">
//                     <button className="cx-btn-3">
//                       + {t("Schedule Report")}
//                     </button>
//                   </Link>
//                   <Link to="/GenerateCustomReport">
//                     <button className="cx-btn-3">+ {t("Custom Report")}</button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ) : null}
//           <div className="Vehcle-main-tabs" id="Report_responsive">
//             <div className="main-master-wrapper mb-0 inner-tabs-section">
//               <div id="scroll_insideThe_Padding">
//                 <Tab.Container
//                   id="left-tabs-example"
//                   className="td-tab-wrapper"
//                   defaultActiveKey="1"
//                 >
//                   <Nav
//                     variant="pills"
//                     className="td-nav"
//                     id="InnerTabNew_Three"
//                   >
//                     <Nav.Item className="td-tab">
//                       <Nav.Link className="td-link" eventKey="1">
//                         {t("Default Reports")}
//                       </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item className="td-tab">
//                       <Nav.Link className="td-link" eventKey="2">
//                         {t("Scheduled Reports")}
//                       </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item className="td-tab">
//                       <Nav.Link className="td-link" eventKey="3">
//                         {t("Customized Reports")}
//                       </Nav.Link>
//                     </Nav.Item>
//                   </Nav>

//                   <Col sm={12} className="">
//                     <Tab.Content>
//                       <Tab.Pane eventKey="1">
//                         <div className="yauto">
//                           <div className="all-vehical-head row vehicle-top-inputs">
//                             <div className="input-section-wrapper">
//                               <div className="row">
//                                 <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Report Name"
//                                   />
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="right-export-btn-section-wrapper">
//                               <div className="c-pointer"></div>
//                               <div className="c-pointer">
//                                 <img src={Import} alt="" />
//                               </div>
//                             </div>
//                           </div>

//                         {/* Deful  */}
//                           {running === false ? (
//                             <>
//                               <div
//                                 className="row main-cards-wrapper gx-3"
//                                 data-aos="zoom-in"
//                                 data-aos-duration="500"
//                               >
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">7</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           {/* <p className="title"></p> */}
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Reports
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Trip Reports
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/test">
//                                           <img
//                                             src={ReportPluse}
//                                             alt=""
//                                             className="add-icon"
//                                             // onClick={() => {
//                                             // RunningReportFun();
//                                             // TripButtonToggle();

//                                             // }}
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Tracking Reports
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Drivers & Users Reports
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Maintenance Reports
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Usage Statistics
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 ></div>
//                               </div>
//                             </>
//                           ) : (
//                             <div
//                               variants={aninations}
//                               initial="initial"
//                               animate="animate"
//                               exit="exit"
//                               transition={{
//                                 duration: 0.3,
//                               }}
//                             >
//                               {/* <label id="export">Export</label>
//                             <select placeholder="Export">
//                               <option>Export to PDF</option>
//                               <option>Export to PNG</option>
//                             </select> */}
//                               {/* <span style={{ marginRight: '20rem', marginTop: '4rem' }}>
//                               <DropdownButton
//                                 id="dropdown-basic-button"
//                                 title="Export"
//                                 variant="warning"
//                               >
//                                 <Dropdown.Item href="#/action-1">
//                                   Export to PDF
//                                 </Dropdown.Item>
//                                 <Dropdown.Item href="#/action-2">
//                                   Export to PNG
//                                 </Dropdown.Item>
//                               </DropdownButton>
//                               </span> */}

//                               <div />
//                               <div
//                                 className=" row gx-3 main-cards-wrapper"
//                                 id="Report_scrol"
//                                 data-aos="zoom-in"
//                                 data-aos-duration="500"
//                               >
//                                 <div
//                                 // className={
//                                 //   sidebar
//                                 //     ? "col-lg-4 col-md-6"
//                                 //     : "col-lg-3 col-md-6"
//                                 // }
//                                 >
//                                   <DefaultReport></DefaultReport>
//                                   {/* <div
//                                         className={"common-vehical-card-inner "}
//                                         id="inner-report-card"
//                                       >
//                                         {
//                                           <div
//                                             className="vehical-card-head"
//                                             id="report-main"
//                                           >
//                                             <div className="heading">
//                                               <div className="d-flex">
//                                                 <img src={RpoetSubCat} alt="" />
//                                                 <div className="">
//                                                   <p className="sub-heading">
//                                                     {t("Report Name")}
//                                                   </p>
//                                                   <p className="title">
//                                                     Vehicle Running Summary Report
//                                                   </p>
//                                                 </div>
//                                               </div>
//                                                                                             <Link to="/ReportView">
//                                                 <img
//                                                   src={ReportEye}
//                                                   alt=""
//                                                   className="add-icon"
//                                                 />
//                                               </Link>
//                                             </div>
//                                           </div>
//                                         }
//                                         <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                           <div className="">
//                                             <div className="card-contain ">
//                                               <p className="sub-heading">
//                                                 {t("No. of Reports")}
//                                               </p>
//                                               <p className="title">20</p>
//                                             </div>
//                                             <div className="card-contain">
//                                               <p className="sub-heading">
//                                                 {t("Last Updated On")}
//                                               </p>
//                                               <p className="title">20-01-2023</p>
//                                             </div>
//                                           </div>
//                                           <div className="">
//                                             <img src={ReportCardContain} alt="" />
//                                           </div>
//                                         </div>
// </div> */}
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </Tab.Pane>
//                       <Tab.Pane eventKey="2">
//                         <div className="yauto">
//                           <div className="all-vehical-head row vehicle-top-inputs">
//                             <div className="input-section-wrapper">
//                               <div className="row">
//                                 <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Report Name"
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="right-export-btn-section-wrapper">
//                               <div className="c-pointer"></div>
//                               <div className="c-pointer">
//                                 <img src={Import} alt="" />
//                               </div>
//                             </div>
//                           </div>
//                           {running === false ? (
//                             <>
//                               <div
//                                 className="row main-cards-wrapper gx-3"
//                                 data-aos="zoom-in"
//                                 data-aos-duration="500"
//                               >
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>

//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </>
//                           ) : (
//                             <div
//                               variants={aninations}
//                               initial="initial"
//                               animate="animate"
//                               exit="exit"
//                               transition={{
//                                 duration: 0.3,
//                               }}
//                             >
//                               <div
//                                 className=" row gx-3 main-cards-wrapper"
//                                 id="Report_scrol"
//                                 data-aos="zoom-in"
//                                 data-aos-duration="500"
//                               >
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className={"common-vehical-card-inner"}>
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportClose}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             MainRunnig();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>

//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </Tab.Pane>
//                       <Tab.Pane eventKey="3">
//                         <div className="yauto">
//                           <div className="all-vehical-head row vehicle-top-inputs">
//                             <div className="input-section-wrapper">
//                               <div className="row">
//                                 <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Report Name"
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="right-export-btn-section-wrapper">
//                               <div className="c-pointer"></div>
//                               <div className="c-pointer">
//                                 <img src={Import} alt="" />
//                               </div>
//                             </div>
//                           </div>
//                           {running === false ? (
//                             <>
//                               <div
//                                 className="row main-cards-wrapper gx-3"
//                                 data-aos="zoom-in"
//                                 data-aos-duration="500"
//                               >
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>

//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className="common-vehical-card-inner">
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportPluse}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             RunningReportFun();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </>
//                           ) : (
//                             <div
//                               variants={aninations}
//                               initial="initial"
//                               animate="animate"
//                               exit="exit"
//                               transition={{
//                                 duration: 0.3,
//                               }}
//                             >
//                               <div
//                                 className=" row gx-3 main-cards-wrapper"
//                                 id="Report_scrol"
//                                 data-aos="zoom-in"
//                                 data-aos-duration="500"
//                               >
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div className={"common-vehical-card-inner"}>
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RunningReport} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <img
//                                           src={ReportClose}
//                                           alt=""
//                                           className="add-icon"
//                                           onClick={() => {
//                                             MainRunnig();
//                                           }}
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>

//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div
//                                   className={
//                                     sidebar
//                                       ? "col-lg-4 col-md-6"
//                                       : "col-lg-3 col-md-6"
//                                   }
//                                 >
//                                   <div
//                                     className={"common-vehical-card-inner "}
//                                     id="inner-report-card"
//                                   >
//                                     <div
//                                       className="vehical-card-head"
//                                       id="report-main"
//                                     >
//                                       <div className="heading">
//                                         <div className="d-flex">
//                                           <img src={RpoetSubCat} alt="" />
//                                           <div className="">
//                                             <p className="sub-heading">
//                                               {t("Report Name")}
//                                             </p>
//                                             <p className="title">
//                                               Vehicle Running Report
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <Link to="/ReportView">
//                                           <img
//                                             src={ReportEye}
//                                             alt=""
//                                             className="add-icon"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </div>
//                                     <div className="d-flex vehical-card-body customise_Report_Responsive justify-content-between">
//                                       <div className="">
//                                         <div className="card-contain ">
//                                           <p className="sub-heading">
//                                             {t("No. of Reports")}
//                                           </p>
//                                           <p className="title">20</p>
//                                         </div>
//                                         <div className="card-contain">
//                                           <p className="sub-heading">
//                                             {t("Last Updated On")}
//                                           </p>
//                                           <p className="title">20-01-2023</p>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <img src={ReportCardContain} alt="" />
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </Tab.Pane>
//                     </Tab.Content>
//                   </Col>
//                 </Tab.Container>
//               </div>
//               <Pagenation />
//               {/* {t("Showing")} 1 - {7} {t("of")} {7} */}
//             </div>
//           </div>
//         </div>

//         {/* https://app.vehicletracking.qa/customer/reports?customer_id=?&customer_valid_key=94589db3b3ce89370488f2a7bac0ab94  */}
//         <div className="" id="cx-wrapper">
//           {customerId && (
//             <div className="iframe-wrapoper">
//               {/* <iframe src={`https://app.vehicletracking.qa/customer/reports?customer_id=${customerId}&customer_valid_key=${customerData.api_key}`}>
//   <p>Your browser does not support iframes.</p>
// </iframe> */}
//             </div>
//           )}
//         </div>
//       </motion.div>

//       {/* Delete Modal Start */}
//       <Modal
//         Modal
//         show={deleteModal}
//         onHide={() => setDeleteModal(false)}
//         centered
//         className="common-model"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Delete Fleet Maintenance</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to Delete this Fleet Maintenance ?
//         </Modal.Body>
//         <Modal.Footer className="pop-up-modal-footer">
//           <div class="btn-wrapper">
//             <button className="cx-btn-1" onClick={() => setDeleteModal(false)}>
//               Cancel
//             </button>
//             <button className="cx-btn-2" onClick={() => setDeleteModal(false)}>
//               Yes
//             </button>
//           </div>
//         </Modal.Footer>
//       </Modal>
//       {/* Delete Modal End */}
//     </>
//   );
// };

// export default Reports;

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
              {(userRole === "customer") ||
                (accessRights &&
                  accessRights.vehicle_running_summary_report ||
                  accessRights.vehicle_ignition_summary_report ||
                  accessRights.vehicle_running_report ||
                  accessRights.vehicle_stopage_report ||
                  accessRights.vehicle_idle_report ||
                  accessRights.vehicle_first_last_ignition_report ||
                  accessRights.vehicle_location_activity_report

                ) ? (
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
                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.vehicle_running_summary_report
                          ) ? (
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
                        ) : null}


                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.vehicle_ignition_summary_report
                          ) ? (
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
                          </div>) : null}
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

                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.vehicle_running_report
                          ) ? (
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
                          </div>) : null}

                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.vehicle_stopage_report
                          ) ? (
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
                          </div>) : null}

                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.vehicle_idle_report
                          ) ? (
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
                          </div>) : null}

                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.vehicle_first_last_ignition_report
                          ) ? (
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
                          </div>) : null}

                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.vehicle_location_activity_report
                          ) ? (
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
                          </div>) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </>


            {(userRole === "customer") ||
              (accessRights &&
                accessRights.live_vehicles_location_report ||
                accessRights.vehicle_count_and_seat_capacity_report ||
                accessRights.vehicle_location_signal_report ||
                accessRights.vehicle_speed_report

              ) ? (
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
                      {(userRole === "customer") ||
                        (accessRights &&
                          accessRights.live_vehicles_location_report
                        ) ? (
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
                        </div>) : null}

                      {(userRole === "customer") ||
                        (accessRights &&
                          accessRights.vehicle_count_and_seat_capacity_report
                        ) ? (
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
                        </div>) : null}


                      {(userRole === "customer") ||
                        (accessRights &&
                          accessRights.vehicle_location_signal_report
                        ) ? (
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
                        </div>) : null}
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

                      {(userRole === "customer") ||
                        (accessRights &&
                          accessRights.vehicle_speed_report
                        ) ? (
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
                        </div>) : null}

                      {/* <div className="innerElements">
                    <i class="fa fa-bell"></i>
                    <Link to="/Alert" className="linkTxt"
                       onClick={() => {
                        setLinkReport("eventreport/alerts")
                        setReportHader(' alerts view')
                        localStorage.setItem(
                          "ReportLink",
                          "eventreport/alerts"
                        );
                      }}
                      >
                      Alert

                    </Link>
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>) : null}




            {/* <div
              className={
                sidebar ? "col-lg-4 col-md-6 mb-3" : "col-lg-3 col-md-6 mb-3"
              }
            >
              <div className="reportsCards">
                <div className="cardHeader">
                  <h1>
                    {" "}
                    <span class="fa fa-map mr-2"></span>
                    Tracking Reports

                  </h1>
                </div> 


                <div className="cardBody">
                  <div className="elementsBox">

                    <div className="innerElements">
                      <i class="fa fa-map mr-2"></i>
                      <Link to="/UnplannedTripsAutorouting" className="linkTxt">
                        Unplanned Trips Autorouting

                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-street-view"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Find Nearest Vehicle


                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-map-marker"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Location Visit History

                      </Link>
                    </div> 
                 
                     <div className="innerElements">
                      <i class="fa fa-camera-retro"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Snaps
                      </Link>
                    </div> 

                  </div>
                </div>
              </div>
            </div>*/}
            {(userRole === "customer") ||
              (addonModule &&
                addonModule.addon_dispatch



              ) ? (
              <>
                {(userRole === "customer") ||
                  (accessRights &&
                    accessRights.dispatch_report ||
                    accessRights.dispatch_customer_order_report ||
                    accessRights.dispatch_merchant_order_report ||
                    accessRights.delivery_person_order_report ||
                    accessRights.merchant_order_summary_report ||
                    accessRights.customer_order_summary_report ||
                    accessRights.load_upload_report

                  ) ? (
                  <div
                    className={
                      sidebar ? "col-lg-4 col-md-6 mb-3" : "col-lg-3 col-md-6 mb-3"
                    }
                  >
                    <div className="reportsCards">
                      <div className="cardHeader">
                        <h1>
                          {" "}
                          <span class="fa fa-file-invoice mr-2"></span>
                          {t("Delivery Dispatch Report")}

                        </h1>
                      </div>
                      <div className="cardBody">
                        <div className="elementsBox">
                          {(userRole === "customer") ||
                            (accessRights &&
                              accessRights.dispatch_report
                            ) ? (
                            <div className="innerElements">
                              <i class="fa fa-space-shuttle"></i>
                              <Link to="/DispatchReport" className="linkTxt"

                                onClick={() => {
                                  setLinkReport("dispatchreport")
                                  setReportHader(t("Dispatch Trip History Report"))
                                  localStorage.setItem(
                                    "ReportLink",
                                    "dispatchreport"
                                  );
                                }}
                              >
                                {t("Dispatch Trip History Report")}

                              </Link>
                            </div>) : null}
                          {(userRole === "customer") ||
                            (accessRights &&
                              accessRights.dispatch_customer_order_report
                            ) ? (
                            <div className="innerElements">
                              <i class="fa fa-exchange"></i>
                              <Link to="/DispatchReport" className="linkTxt"
                                onClick={() => {
                                  setLinkReport("dispatchreport/dispatchcustomerorder")
                                  setReportHader(t("Dispatch Customer Order"))

                                  localStorage.setItem(
                                    "ReportLink",
                                    "dispatchreport/dispatchcustomerorder"
                                  );
                                }}
                              >
                                {t("Dispatch Customer Order")}
                              </Link>
                            </div>) : null}
                          {(userRole === "customer") ||
                            (accessRights &&
                              accessRights.dispatch_merchant_order_report
                            ) ? (
                            <div className="innerElements">
                              <i class="fa fa-bell"></i>
                              <Link to="/DispatchReport" className="linkTxt"
                                onClick={() => {
                                  setLinkReport("dispatchreport/merchantorder")
                                  setReportHader(t("Dispatch Merchant Order"))

                                  localStorage.setItem(
                                    "ReportLink",
                                    "dispatchreport/merchantorder"
                                  );
                                }}

                              >
                                {t("Dispatch Merchant Order")}
                              </Link>
                            </div>) : null}

                          {(userRole === "customer") ||
                            (accessRights &&
                              accessRights.delivery_person_order_report
                            ) ? (
                            <div className="innerElements">
                              <i class="fa fa-bus"></i>
                              <Link to="/DispatchReport" className="linkTxt"
                                onClick={() => {
                                  setLinkReport("dispatchreport/deliverypersonorder")
                                  setReportHader(t("Delivery Person Order"))

                                  localStorage.setItem(
                                    "ReportLink",
                                    "dispatchreport/deliverypersonorder"
                                  );
                                }}

                              >
                                {t("Delivery Person Order")}
                              </Link>
                            </div>) : null}

                          {(userRole === "customer") ||
                            (accessRights &&
                              accessRights.merchant_order_summary_report
                            ) ? (
                            <div className="innerElements">
                              <i class="fa fa-arrows"></i>
                              <Link to="/DispatchReport" className="linkTxt"
                                onClick={() => {
                                  setLinkReport("dispatchreports/merchantordersummary")
                                  setReportHader(t("Merchant Order Summary"))

                                  localStorage.setItem(
                                    "ReportLink",
                                    "dispatchreports/merchantordersummary"
                                  );
                                }}

                              >
                                {t("Executive Order Summary")}
                              </Link>
                            </div>) : null}
                          {(userRole === "customer") ||
                            (accessRights &&
                              accessRights.customer_order_summary_report
                            ) ? (
                            <div className="innerElements">
                              <i class="fa fa-sliders"></i>
                              <Link to="/DispatchReport" className="linkTxt"
                                onClick={() => {
                                  setLinkReport("dispatchreports/customerordersummary")
                                  setReportHader(t("Customer Order Summary"))

                                  localStorage.setItem(
                                    "ReportLink",
                                    "dispatchreports/customerordersummary"
                                  );
                                }}

                              >
                                {t("Customer Order Summary")}
                              </Link>
                            </div>) : null}

                          {addonSettingData?.addon_ghatke == 1 ? <></> : <>

                            {(userRole === "customer") ||
                              (accessRights &&
                                accessRights.load_upload_report
                              ) ? (
                              <div className="innerElements">
                                <i class="fa fa-sliders"></i>
                                <Link to="/DispatchReport" className="linkTxt"
                                  onClick={() => {
                                    setLinkReport("dispatchreports/merchant-driver-loading-unloading")
                                    setReportHader(t("Load And Unload Report"))

                                    localStorage.setItem(
                                      "ReportLink",
                                      "dispatchreports/merchant-driver-loading-unloading"
                                    );
                                  }}

                                >
                                  {t("Load And Unload Report")}
                                </Link>
                              </div>
                            ) : null}

                          </>}

                          {(userRole === "customer") ||
                            (accessRights &&
                              accessRights.trip_schedule_eta_report
                            ) ? (
                            <div className="innerElements">
                              <i class="fa fa-tachometer"></i>
                              <Link to="/TripScheduleEta" className="linkTxt"
                                onClick={() => {
                                  setLinkReport("dispatchreports/ETA")
                                  setReportHader(t("Delivery Dispatch Report / Schedule vs Actual ETA Report"))

                                  localStorage.setItem(
                                    "ReportLink",
                                    "dispatchreports/ETA"
                                  );
                                }}

                              >
                                {t("Schedule vs Actual ETA Report")}
                              </Link>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>) : null}
              </>

            ) : null}
            {/* ///////////////////////////////Trip Report /////////////////////////////////////// */}
            {/* {(userRole === "customer") ||
            (addonModule &&
              // addonModule.addon_TripReport

             
             
            ) 
            ? (  */}
            <>
              {(userRole === "customer") ||
                (accessRights &&
                  accessRights.trip_reports_module ||
                  accessRights.trip_activity_report ||
                  accessRights.trip_assigned_versus_completed_report ||
                  accessRights.trip_versus_pickup_count_report ||
                  accessRights.trip_manifest_report ||
                  accessRights.pickup_point_report ||
                  accessRights.live_trip_location_report

                ) ? (
                <div
                  className={
                    sidebar ? "col-lg-4 col-md-6 mb-3" : "col-lg-3 col-md-6 mb-3"
                  }
                >
                  <div className="reportsCards">
                    <div className="cardHeader">
                      <h1>
                        {" "}
                        <span class="fa fa-map mr-2"></span>
                        {t("Trip Reports")}

                      </h1>
                    </div>
                    <div className="cardBody">
                      <div className="elementsBox">
                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.trip_activity_report
                          ) ? (
                          <div className="innerElements">

                            <i class="fa fa-road "></i>
                            <Link to="/TripActivityReport" className="linkTxt" onClick={() => {
                              setLinkReport("TripActivityReport")
                              setReportHader(t("Trip Activity Report"))
                              localStorage.setItem(
                                "ReportLink",
                                "TripActivityReport"
                              );
                            }}>
                              {t("Trip Activity Report")}
                            </Link>
                          </div>) : null}
                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.trip_assigned_versus_completed_report
                          ) ? (
                          <div className="innerElements">
                            <i class="fa fa-sliders"></i>
                            <Link to="/TripAssignedVersusCompleted" className="linkTxt" onClick={() => {
                              setLinkReport("TripAssignedVersusCompleted")
                              setReportHader(t("Trip Assigned Versus Completed"))
                              localStorage.setItem(
                                "ReportLink",
                                "TripAssignedVersusCompleted"
                              );
                            }}>
                              {t("Trip Assigned Versus Completed")}

                            </Link>
                          </div>) : null}

                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.trip_versus_pickup_count_report
                          ) ? (
                          <div className="innerElements">
                            <i class="fa fa-map-marker"></i>
                            <Link to="/TripVersusPickupCount" className="linkTxt"
                              onClick={() => {
                                setLinkReport("daily/pickuppoints")
                                setReportHader(t("Trip Versus Pickup Count"))
                                localStorage.setItem(
                                  "ReportLink",
                                  "daily/pickuppoints"
                                );
                              }}>

                              {t("Trip Versus Pickup Count")}
                            </Link>
                          </div>) : null}
                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.trip_manifest_report
                          ) ? (
                          <div className="innerElements">
                            <i class="fa fa-bus"></i>
                            <Link to="/TripManifestReport" className="linkTxt" onClick={() => {
                              setLinkReport("TripManifestReport")
                              setReportHader(t("Trip Manifest"))
                              localStorage.setItem(
                                "ReportLink",
                                "TripManifestReport"
                              );
                            }}>
                              {t("Trip Manifest")}

                            </Link>
                          </div>) : null}
                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.pickup_point_report
                          ) ? (
                          <div className="innerElements">
                            <i class="fa fa-map-marker"></i>
                            <Link to="/PickUpPointReport" className="linkTxt" onClick={() => {
                              setLinkReport("PickUpPointReport")
                              setReportHader(t("Pick Up Point Report"))
                              localStorage.setItem(
                                "ReportLink",
                                "LiveTripLocationReport"
                              );
                            }}>
                              {t("Pickup point Report")}
                            </Link>
                          </div>) : null}
                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.live_trip_location_report
                          ) ? (
                          <div className="innerElements">
                            <i class="fa fa-tasks"></i>
                            <Link to="/LiveTripLocationReport" className="linkTxt"
                              onClick={() => {
                                setLinkReport("LiveTripLocationReport")
                                setReportHader(t("Live Trip Location Report"))
                                localStorage.setItem(
                                  "ReportLink",
                                  "LiveTripLocationReport"
                                );
                              }}>
                              {t("Live Trip Location Report")}
                            </Link>
                          </div>) : null}
                        {/* <div className="innerElements">
                      <i class="fa fa fa-exchange fa-inverse"></i>
                      <Link to="/ReportView" className="linkTxt">
                      {t("Dispatch Trip History Report")}  
                      </Link>
                    </div> */}
                        {/* <div className="innerElements">
                      <i class="fa fa-map-marker fa-inverse"></i>
                      <Link to="/DispatchCustomerOrderReport" className="linkTxt" onClick={() => {
                      setLinkReport("DispatchCustomerOrderReport")
                        setReportHader(t("Dispatch Customer Order Report"))
                             localStorage.setItem(
                              "ReportLink",
                                   "DispatchCustomerOrderReport"
                           );
                                  }}>
                        Dispatch Customer Order Report

                      </Link>
                    </div> */}
                      </div>
                    </div>
                  </div>
                </div>) : null}
            </>
            {/* ):null} */}





            {/*     <div
              className={
                sidebar ? "col-lg-4 col-md-6 mb-3" : "col-lg-3 col-md-6 mb-3"
              }
            >


              <div className="reportsCards">
                <div className="cardHeader">
                  <h1>
                    {" "}
                    <span class="fa fa-user mr-2"></span>
                    Drivers & Users Reports
                  </h1>
                </div>
                <div className="cardBody">
                  <div className="elementsBox">
                    <div className="innerElements">
                      <i class="fa fa-bus"></i>
                      <Link to="/ReportView" className="linkTxt">
                        User Attendance Report

                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-tasks"></i>
                      <Link to="/ReportView" className="linkTxt">
                        User Activity Report

                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-tasks"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Verified Users Report

                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                sidebar ? "col-lg-4 col-md-6 mb-3" : "col-lg-3 col-md-6 mb-3"
              }
            >
              <div className="reportsCards">
                <div className="cardHeader">
                  <h1>
                    {" "}
                    <span class="fa fa-wrench mr-2"></span>
                    Maintenance Reports
                  </h1>
                </div>
                <div className="cardBody">
                  <div className="elementsBox">
                    <div className="innerElements">
                      <i class="fa fa-road"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Expiry / Due Reports
                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-sliders"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Maintenance Overdues Report

                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-sliders"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Maintenance Dues Soon Report
                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-bus"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Driver Licence Expiry Report

                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-tasks"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Vehicle Expense Report

                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-tasks"></i>
                      <Link to="/ReportView" className="linkTxt">
                        GPS Strength
                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa fa-exchange fa-inverse"></i>
                      <Link to="/ReportView" className="linkTxt">
                        GSM Signal Report
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                sidebar ? "col-lg-4 col-md-6 mb-3" : "col-lg-3 col-md-6 mb-3"
              }
            >
              <div className="reportsCards">
                <div className="cardHeader">
                  <h1>
                    {" "}
                    <span class="fa fa-file-text mr-2"></span>
                    Usage Statistics
                  </h1>
                </div>
                <div className="cardBody">
                  <div className="elementsBox">
                    <div className="innerElements">
                      <i class="fa fa-road"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Google API Usage Statistics
                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-sliders"></i>
                      <Link to="/ReportView" className="linkTxt">
                        System Reports Usage Statistics
                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-sliders"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Data Usage Report
                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-bus"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Mobile App Details
                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-tasks"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Mobile App Usage Details
                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-user"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Last Login Details
                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa fa-exchange fa-inverse"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Tracking Device and Sim Card Details
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div> */}

            {/* //////////////////driver report /////////////////////////// */}

            <>
              {(userRole === "customer") ||
                (accessRights &&
                  accessRights.drivers_users_reports_module ||
                  accessRights.safe_driver_ranking_report ||
                  accessRights.safe_driver_ranking_report ||
                  accessRights.user_activity_report ||
                  accessRights.user_activity_report
                  // accessRights.pickup_point_report  ||
                  // accessRights.live_trip_location_report  

                ) ? (
                <div
                  className={
                    sidebar ? "col-lg-4 col-md-6 mb-3" : "col-lg-3 col-md-6 mb-3"
                  }
                >
                  <div className="reportsCards">
                    <div className="cardHeader">
                      <h1>
                        {" "}
                        <span class="fa fa-file-text mr-2"></span>
                        {t("Driver Report")}
                      </h1>
                    </div>
                    <div className="cardBody">
                      <div className="elementsBox">
                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.safe_driver_ranking_report
                          ) ? (
                          <div className="innerElements">
                            <i class="fa fa-road"></i>
                            <Link to="/RealTimeReport" className="linkTxt"
                              onClick={() => {
                                setLinkReport("driverranking")
                                setReportHader(t("Driver Report / Safe Driver Ranking Report"))

                                localStorage.setItem(
                                  "ReportLink",
                                  "driverranking"
                                );
                              }}

                            >
                              {t("Safe Driver Ranking Report")}
                            </Link>
                          </div>) : null}

                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.safe_driver_ranking_report
                          ) ? (
                          <div className="innerElements">
                            <i class="fa fa fa-exchange fa-inverse"></i>
                            <Link to="/DriverListignitionReport" className="linkTxt"
                              onClick={() => {
                                setLinkReport("firstlastignitiondriverreport")
                                setReportHader(t("Driver Report / Driver First & List ignition Report"))

                                localStorage.setItem(
                                  "ReportLink",
                                  "firstlastignitiondriverreport"
                                );
                              }}

                            >
                              {t("Driver First & List ignition Report")}
                            </Link>
                          </div>) : null}
                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.user_activity_report
                          ) ? (
                          <div className="innerElements">
                            <i class="fa fa-map-marker fa-inverse"></i>
                            <Link to="/DriverActivertiyReport" className="linkTxt"
                              onClick={() => {
                                setLinkReport("userattendance/driver_activity")
                                setReportHader("Driver Report / Driver Activity Report")

                                localStorage.setItem(
                                  "ReportLink",
                                  "userattendance/driver_activity"
                                );
                              }}

                            >
                              {t("Driver Activity Report")}
                            </Link>
                          </div>) : null}

                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.user_activity_report
                          ) ? (
                          <div className="innerElements">
                            <i class="fa fa-bus"></i>
                            <Link to="/DriverActivetySummaryReport" className="linkTxt"
                              onClick={() => {
                                setLinkReport("userattendance/user_activity_Summary")
                                setReportHader(t("Driver Report /  Driver Activity Summary  Report"))

                                localStorage.setItem(
                                  "ReportLink",
                                  "userattendance/user_activity_Summary"
                                );
                              }}

                            >
                              {t("Driver Activity Summary Report")}
                            </Link>
                          </div>) : null}




                      </div>
                    </div>
                  </div>
                </div>) : null}
            </>
            {addonSettingData["addon_vehicle_expense"] == 1 && accessRights?.inspection_due_report || accessRights?.insurance_expiry_report
              || accessRights?.registration_expiry_report || accessRights?.maintenance_overdues_report || accessRights?.tax_expiry_report || accessRights?.maintenance_dues_soon_report || accessRights?.driver_licence_expiry_report ? (
              <>
                {/* /////// Maintenance report////////// */}
                <div
                  className={
                    sidebar ? "col-lg-4 col-md-6 mb-3" : "col-lg-3 col-md-6 mb-3"
                  }
                >
                  <div className="reportsCards">
                    <div className="cardHeader">
                      <h1>
                        {" "}
                        <span class="fa fa-wrench mr-2"></span>
                        Maintenance Reports
                      </h1>
                    </div>
                    <div className="cardBody">
                      <div className="elementsBox">
                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.inspection_due_report
                          ) ? (


                          <div className="innerElements">
                            <i class="fa fa-road"></i>
                            <Link to="/InspectionDueReport" className="linkTxt">
                              Inspection Due Report
                            </Link>
                          </div>) : null}

                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.insurance_expiry_report
                          ) ? (

                          <div className="innerElements">
                            <i class="fa fa-road"></i>
                            <Link to="/InsuranceExpiryReport" className="linkTxt">
                              Insurance Expiry Report
                            </Link>
                          </div>) : null}

                        {(accessRights &&
                          accessRights.registration_expiry_report
                        ) ? (

                          <div className="innerElements">
                            <i class="fa fa-road"></i>
                            <Link to="/RegistrationExpiryReport" className="linkTxt">
                              Registration Expiry Report
                            </Link>
                          </div>) : null}

                        {(accessRights &&
                          accessRights.tax_expiry_report
                        ) ? (
                          <div className="innerElements">
                            <i class="fa fa-road"></i>
                            <Link to="/TaxExpiryReport" className="linkTxt">
                              Tax Expiry Report
                            </Link>
                          </div>) : null}

                        {(accessRights &&
                          accessRights.maintenance_overdues_report
                        ) ? (
                          <div className="innerElements">
                            <i class="fa fa-sliders"></i>
                            <Link to="/MaintenanceOverduesReport" className="linkTxt">
                              Maintenance Overdues Report

                            </Link>
                          </div>) : null}

                        {(accessRights &&
                          accessRights.maintenance_dues_soon_report
                        ) ? (
                          <div className="innerElements">
                            <i class="fa fa-sliders"></i>
                            <Link to="/MaintenanceDuesSoonReport" className="linkTxt">
                              Maintenance Dues Soon Report
                            </Link>
                          </div>) : null}

                        {(accessRights &&
                          accessRights.driver_licence_expiry_report
                        ) ? (
                          <div className="innerElements">
                            <i class="fa fa-bus"></i>
                            <Link to="/DriverLicenceExpiryReport" className="linkTxt">
                              Driver Licence Expiry Report

                            </Link>
                          </div>) : null}
                        {/* <div className="innerElements">
                      <i class="fa fa-tasks"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Vehicle Expense Report

                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-tasks"></i>
                      <Link to="/ReportView" className="linkTxt">
                        GPS Strength
                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa fa-exchange fa-inverse"></i>
                      <Link to="/ReportView" className="linkTxt">
                        GSM Signal Report
                      </Link>
                    </div> */}

                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            {/* //////expense report /// */}
            {addonSettingData["addon_vehicle_expense"] == 1 && accessRights?.vehicle_expense_report ? (
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
                        <span class="fa fa-wrench mr-2"></span>
                        Expence Reports
                      </h1>
                    </div>
                    <div className="cardBody">
                      <div className="elementsBox">

                        {(accessRights &&
                          accessRights.vehicle_expense_report
                        ) ? (
                          <div className="innerElements">
                            <i class="fa fa-road"></i>
                            <Link to="/VehicleExpenseReport" className="linkTxt">
                              Vehicle Expense Report
                            </Link>
                          </div>) : null}

                        {(accessRights &&
                          accessRights.vehicle_expense_report
                        ) ? (
                          <div className="innerElements">
                            <i class="fa fa-road"></i>
                            <Link to="/VehicleFuelExpenseReport" className="linkTxt">
                              Vehicle Fuel Expense Report
                            </Link>
                          </div>) : null}

                        {/* <div className="innerElements">
                      <i class="fa fa-tasks"></i>
                      <Link to="/ReportView" className="linkTxt">
                        Vehicle Expense Report

                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa-tasks"></i>
                      <Link to="/ReportView" className="linkTxt">
                        GPS Strength
                      </Link>
                    </div>
                    <div className="innerElements">
                      <i class="fa fa fa-exchange fa-inverse"></i>
                      <Link to="/ReportView" className="linkTxt">
                        GSM Signal Report
                      </Link>
                    </div> */}

                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}



            {/* NEW UI */}
            <>
              {(userRole === "customer") ||
                (true ||
                {/* accessRights &&
                  accessRights.vehicle_running_summary_report ||
                  accessRights.vehicle_ignition_summary_report ||
                  accessRights.vehicle_running_report ||
                  accessRights.vehicle_stopage_report ||
                  accessRights.vehicle_idle_report ||
                  accessRights.vehicle_first_last_ignition_report ||
                  accessRights.vehicle_location_activity_report */}
                ) ? (
                <div
                  className={
                    sidebar ? "col-lg-4 col-md-6 mb-3" : "col-lg-3 col-md-6 mb-3"
                  }
                >
                  <div className="reportsCards">
                    <div className="cardHeader">
                      <h1>
                        {" "}
                        <i class="fa-solid fa-chart-column mr-2 h-100"></i>
                        {t("Usage Statistics")}
                      </h1>
                    </div>
                    <div className="cardBody">
                      <div className="elementsBox">
                        {(userRole === "customer") ||
                          (true ||
                          {/* accessRights &&
                            accessRights.vehicle_running_summary_report */}
                          ) ? (
                          <div className="innerElements">
                            <i class="fa-solid fa-file-invoice"></i>
                            <Link to="/ReportsAndStatisticsUsageAudit" className="linkTxt"
                              onClick={() => {
                                setLinkReport("ReportsAndStatisticsUsageAudit")
                                setReportHader(t("Usage Statistics / System Reports Usage Statistics System Usage Audit"))
                                localStorage.setItem(
                                  "ReportLink",
                                  "ReportsAndStatisticsUsageAudit"
                                );

                              }}
                            >
                              {t("System Reports Usage Statistics System Usage Audit")}
                            </Link>
                          </div>
                        ) : null}


                        {(userRole === "customer") ||
                          (true ||
                          {/* accessRights &&
                            accessRights.vehicle_running_report */}
                          ) ? (
                          <div className="innerElements">
                            <i class="fa-solid fa-bars-progress"></i>
                            <Link to="/DataUsageR" className="linkTxt"
                              onClick={() => {
                                setLinkReport("DataUsageR")
                                setReportHader(t("Usage Statistics / Data Usage Report"))
                                localStorage.setItem(
                                  "ReportLink",
                                  "vehiclerunningreport"
                                );
                              }}
                            >
                              {t("Data Usage Report")}
                            </Link>
                          </div>) : null}

                        {(userRole === "customer") ||
                          (true ||
                          {/* accessRights &&
                            accessRights.vehicle_ignition_summary_report */}
                          ) ? (
                          <div className="innerElements">
                            <i class="fa-solid fa-mobile-screen"></i>
                            <Link to="/MobileAppDetailsR" className="linkTxt"

                              onClick={() => {
                                setLinkReport("vehicleignitionsummaryreport")
                                setReportHader(t("Usage Statistics /   Mobile App Details"))
                                localStorage.setItem(
                                  "ReportLink",
                                  "vehicleignitionsummaryreport"
                                );
                              }}
                            >
                              {t("  Mobile App Details")}
                            </Link>
                          </div>) : null}
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



                        {(userRole === "customer") ||
                          (accessRights &&
                            accessRights.vehicle_stopage_report
                          ) ? (
                          <div className="innerElements">
                            <i class="fa-solid fa-map-location"></i>
                            <Link to="/TrackingdevicesAndSimDetailsR" className="linkTxt"
                              onClick={() => {
                                setLinkReport("vehiclestopagereport")
                                setReportHader(t("Usage Statistics / Tracking Device and Sim Card Details List of Tracking Devices"))
                                localStorage.setItem(
                                  "ReportLink",
                                  "vehiclestopagereport"
                                );
                              }}
                            >
                              {t("Tracking Device and Sim Card Details List of Tracking Devices")}
                            </Link>
                          </div>) : null}

                        {(userRole === "customer") ||
                          (true ||
                          {/* accessRights &&
                            accessRights.vehicle_idle_report */}
                          ) ? (
                          <div className="innerElements">
                            <i class="fa-solid fa-clock-rotate-left"></i>
                            <Link to="/lastLoginDetailsR" className="linkTxt"
                              onClick={() => {
                                setLinkReport("vehicleidlereport")
                                setReportHader(t("Usage Statistics / Last Login Details"))
                                localStorage.setItem(
                                  "ReportLink",
                                  "vehicleidlereport"
                                );
                              }}
                            >
                              {t("Last Login Details")}
                            </Link>
                          </div>) : null}

                        {(userRole === "customer") ||
                          (true ||
                          {/* accessRights &&
                            accessRights.vehicle_first_last_ignition_report */}
                          ) ? (
                          <div className="innerElements">
                            <i class="fa-solid fa-mobile-button"></i>
                            <Link to="/mobleAppUsageDetailsR" className="linkTxt"
                              onClick={() => {
                                setLinkReport("vehiclefirstlastignitionreport")
                                setReportHader(t("Usage Statistics / Mobile App Usage Details"))

                                localStorage.setItem(
                                  "ReportLink",
                                  "vehiclefirstlastignitionreport"
                                );
                              }}
                            >
                              {t("Mobile App Usage Details")}
                            </Link>
                          </div>) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </>



          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Reports;

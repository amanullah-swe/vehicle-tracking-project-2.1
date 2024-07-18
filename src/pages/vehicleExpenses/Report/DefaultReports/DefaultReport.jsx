
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import RpoetSubCat from "../../../../assets/images/Report/RpoetSubCat.svg";
import ReportEye from "../../../../assets/images/Report/ReportEye.svg";
// import ReportCardContain from "../../../assets/images/ReportCardContain.svg";
import ReportCardContain from "../../../../assets/images/ReportCardContain.svg";
import { Col, Row } from "react-bootstrap";

function DefaultReport() {
  const { t } = useTranslation();
  return (
    
      <div className="d-flex justify-content-around flex-wrap">
        <div className={"common-vehical-card-inner "} id="inner-report-card">
          {
            <div className="vehical-card-head" id="report-main">
              <div className="heading">
                <div className="d-flex">
                  <img src={RpoetSubCat} alt="" />
                  <div className="">
                    <p className="sub-heading">
                      {t("Report Name")}
                    </p>
                    <p className="title">Vehicle </p>
                  </div>
                </div>
                <Link to="/ReportView/vehiclerunningsummaryreport">
                  <img src={ReportEye} alt="" className="add-icon" />
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
                  Last Updated On
                </p>
                <p className="title">20-01-2023</p>
              </div>
            </div>
            <div className="">
              <img src={ReportCardContain} alt="" />
            </div>
          </div>
        </div>

        <div className={"common-vehical-card-inner "} id="inner-report-card">
          {
            <div className="vehical-card-head" id="report-main">
              <div className="heading">
                <div className="d-flex">
                  <img src={RpoetSubCat} alt="" />
                  <div className="">
                    <p className="sub-heading">
                      {t("Report Name")}
                    </p>
                    <p className="title">Vehicle Ignition Summary Report</p>
                  </div>
                </div>
                <Link to="/ReportView">
                  <img src={ReportEye} alt="" className="add-icon" />
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
                <p className="title">20-01-2023</p>
              </div>
            </div>
            <div className="">
              <img src={ReportCardContain} alt="" />
            </div>
          </div>
        </div>

        <div className={"common-vehical-card-inner "} id="inner-report-card">
          {
            <div className="vehical-card-head" id="report-main">
              <div className="heading">
                <div className="d-flex">
                  <img src={RpoetSubCat} alt="" />
                  <div className="">
                    <p className="sub-heading">
                      {t("Report Name")}
                    </p>
                    <p className="title">
                      Vehicle Ignition Time Summary Report
                    </p>
                  </div>
                </div>
                <Link to="/ReportView">
                  <img src={ReportEye} alt="" className="add-icon" />
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
                <p className="title">20-01-2023</p>
              </div>
            </div>
            <div className="">
              <img src={ReportCardContain} alt="" />
            </div>
          </div>
        </div>

        <div className={"common-vehical-card-inner "} id="inner-report-card">
          {
            <div className="vehical-card-head" id="report-main">
              <div className="heading">
                <div className="d-flex">
                  <img src={RpoetSubCat} alt="" />
                  <div className="">
                    <p className="sub-heading">
                      {t("Report Name")}
                
                    </p>
                    <p className="title">Vehicle Stopage Report</p>
                  </div>
                </div>
                <Link to="/ReportView">
                  <img src={ReportEye} alt="" className="add-icon" />
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
                <p className="title">20-01-2023</p>
              </div>
            </div>
            <div className="">
              <img src={ReportCardContain} alt="" />
            </div>
          </div>
        </div>

        <div className={"common-vehical-card-inner "} id="inner-report-card">
          {
            <div className="vehical-card-head" id="report-main">
              <div className="heading">
                <div className="d-flex">
                  <img src={RpoetSubCat} alt="" />
                  <div className="">
                    <p className="sub-heading">
                      {t("Report Name")}
                
                    </p>
                    <p className="title">Vehicle Idle Report</p>
                  </div>
                </div>
                <Link to="/ReportView">
                  <img src={ReportEye} alt="" className="add-icon" />
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
                <p className="title">20-01-2023</p>
              </div>
            </div>
            <div className="">
              <img src={ReportCardContain} alt="" />
            </div>
          </div>
        </div>

        <div className={"common-vehical-card-inner "} id="inner-report-card">
          {
            <div className="vehical-card-head" id="report-main">
              <div className="heading">
                <div className="d-flex">
                  <img src={RpoetSubCat} alt="" />
                  <div className="">
                    <p className="sub-heading">
                      {t("Report Name")}
                    
                    </p>
                    <p className="title">
                      Vehicle First & Last Ignition Report
                    </p>
                  </div>
                </div>
                <Link to="/ReportView">
                  <img src={ReportEye} alt="" className="add-icon" />
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
                <p className="title">20-01-2023</p>
              </div>
            </div>
            <div className="">
              <img src={ReportCardContain} alt="" />
            </div>
          </div>
        </div>

        <div className={"common-vehical-card-inner "} id="inner-report-card">
          {
            <div className="vehical-card-head" id="report-main">
              <div className="heading">
                <div className="d-flex">
                  <img src={RpoetSubCat} alt="" />
                  <div className="">
                    <p className="sub-heading">
                      {t("Report Name")}
                    
                    </p>
                    <p className="title">Vehicle Location Activity Report</p>
                  </div>
                </div>
                <Link to="/ReportView">
                  <img src={ReportEye} alt="" className="add-icon" />
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
                <p className="title">20-01-2023</p>
              </div>
            </div>
            <div className="">
              <img src={ReportCardContain} alt="" />
            </div>
          </div>
        </div>
      </div>
  );
}

export default DefaultReport;

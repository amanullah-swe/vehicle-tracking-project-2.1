import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
// import RpoetSubCat from "../../assets/images/Report/RpoetSubCat.svg";
import RpoetSubCat from "../../../../../assets/images/Report/RpoetSubCat.svg"
import ReportEye from "../../../../../assets/images/Report/ReportEye.svg";
// import ReportCardContain from "../../../assets/images/ReportCardContain.svg";
import ReportCardContain from "../../../../../assets/images/ReportCardContain.svg";
import { Col, Row } from "react-bootstrap";
import { getTripActivity } from "../../../../../store/tripActivitySlice";
import { useDispatch, useSelector} from "react-redux";

function Test() {
  const { t } = useTranslation();

const tripActivity = useSelector((state) => state.tripActivity.tripActivity);


const dispatch = useDispatch()
const params = useParams()

useEffect(() => {
    dispatch(getTripActivity)
})

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
                    <p className="title">Trip Activity Report</p>
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
                    <p className="title">Trip Assigned Versus Completed
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
                    <p className="title">Trip Versus Pickup Count
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
                    <p className="title">Trip Manifest</p>
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
                    <p className="title">Pickup point Report</p>
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
                    <p className="title">Live Trip Location Report
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
                    <p className="title">Dispatch Trip History Report</p>
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
                    <p className="title">Dispatch Customer Order Report</p>
                  </div>
                </div>
                <Link to="/TripActivity">
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

export default Test;

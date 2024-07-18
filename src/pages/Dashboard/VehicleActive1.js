import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "../../assets/styles/main.scss";
import { Tab, Tabs, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { useTranslation } from "react-i18next";
import NoGPS from "../../assets/images/NoGPS.svg";
import NoDataComp from "../../sharedComponent/NoDataComp";
import { DateDDMMYYYY, latestDate } from "../../sharedComponent/common";
const VehicleActive1 = ({
  trakedData,
  untrakedData,
  setSelectedPopMarker,
  componentId,
}) => {
  const {
    sidebar,
    setSidebar,
    Dark,
    setDark,
    setRegionCord,
    DateFormatConfig,
    setMapZoomValue,
    setTriggerMapBoundKeyRandom,
    setCenterDragged,
  } = useContext(AppContext);
  const currentRoute = useLocation().pathname;
  const { t, i18n } = useTranslation();
  return (
    <div className="dashboard-first-item" key={"comonent" + componentId}>
      <div className="style-vehicle-btn25"></div>
      <Tab.Container
        id="left-tabs-example"
        className="va-tab-wrapper"
        defaultActiveKey="0"
      >
        <Row>
          <Col sm={12}>
            <Nav variant="pills" className="va-nav tabs-custom-width-2-50">
              <Nav.Item className="va-tab">
                <Nav.Link className="va-link" eventKey="0">
                  {t("Currently Untracked")} ({trakedData?.length})
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="va-tab">
                <Nav.Link className="va-link" eventKey="1">
                  {t("Not Tracked Yet")} ({untrakedData?.length})
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="0">
                <div className="running-status-card-wrapper">
                  {trakedData && trakedData.length > 0 ? (
                    trakedData.map((ele, index) => {
                      return (
                        <div
                          className="row first-active-card-main"
                          key={"trakedData" + index}
                        >
                          <div
                            className="status-card d-flex justify-content-center active"
                            onClick={() => {
                              setSelectedPopMarker(ele.vehicle_id);
                              setTriggerMapBoundKeyRandom(
                                Math.floor(Math.random() * 10000000)
                              );
                              setCenterDragged([
                                Number(ele?.latitude),
                                Number(ele?.longitude),
                              ]);
                            }}
                          >
                            <div className="col-6 col-md-4 data-content">
                              <label htmlFor="">{t("Vehicle Type")}</label>
                              <p>
                                {ele?.vehicle_type_code
                                  ? ele?.vehicle_type_code
                                  : ""}
                              </p>
                            </div>
                            <div className="col-6 col-md-4 data-content">
                              <label htmlFor="">{t("Vehicle No")}.</label>
                              <p>{ele?.vehicle_number}</p>
                            </div>
                            <div className="col-6 col-md-4 data-content">
                              <label htmlFor="">{t("Date")}</label>

                              <p>
                                {ele?.logged_date
                                  ? DateDDMMYYYY(ele?.logged_date)
                                  : ""}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <NoDataComp />
                  )}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="1">
                <div className="running-status-card-wrapper">
                  {untrakedData && untrakedData.length > 0 ? (
                    untrakedData.map((ele, index) => {
                      return (
                        <>
                          <div
                            className="status-card active"
                            key={"untrakedData" + index}
                            //  onClick={()=>{
                            //   setTriggerMapBoundKeyRandom(Math.floor(Math.random() * 10000000))
                            //   setCenterDragged([Number(ele?.latitude), Number(ele?.longitude)])
                            //                               }}
                          >
                            <div className="row first-active-card-main">
                              {/* <div className="col-6 col-md-4 data-content">
                            <label htmlFor="">{t("Driver Name")}</label>
                            <p>{ele?.user_name}</p>
                          </div> */}
                              <div className="col-6 col-md-4 data-content">
                                <label htmlFor="">{t("Vehicle Type")}</label>
                                <p>
                                  {ele?.vehicle_type_code
                                    ? ele?.vehicle_type_code
                                    : ""}
                                </p>
                              </div>
                              <div className="col-6 col-md-4 data-content">
                                <label htmlFor="">{t("Vehicle No")}.</label>
                                <p>{ele?.vehicle_number}</p>
                              </div>
                              <div className="col-6 col-md-4 data-content">
                                <label htmlFor="">{t("Date")}</label>
                                <p>
                                  {ele?.logged_date
                                    ? DateDDMMYYYY(ele?.logged_date)
                                    : ""}
                                </p>
                                {/* <p>{latestDate(ele?.logged_date,DateFormatConfig)?.toString()}</p> */}
                              </div>
                              {/* <div className="col-6 col-md-4 data-content">
                            <label htmlFor="">{t("Time")}</label>
                            <p>{ele?.logged_time}</p>
                          </div> */}
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <NoDataComp />
                  )}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default VehicleActive1;

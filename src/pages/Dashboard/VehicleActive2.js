import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "../../assets/styles/main.scss";
import { Tab, Tabs, Form, Modal } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import optionDot from "../../assets/images/optionDot.svg";
import copy from "../../assets/images/Copy.svg";
import NoGPS from "../../assets/images/NoGPS.svg";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import NoDataComp from "../../sharedComponent/NoDataComp";

const VehicleActive1 = ({
  scheduleData,
  scheduleCount,
  dispatchData,
  componentId,
}) => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const currentRoute = useLocation().pathname;
  const { t, i18n } = useTranslation();
  const navigation = useNavigate();
  const [shareLink, setShareLink] = useState(false);

  return (
    <div className="dashboard-first-item" key={componentId}>
      <div className="style-vehicle-btn26"></div>
      <Tab.Container
        id="left-tabs-example"
        className="va-tab-wrapper"
        defaultActiveKey="0"
      >
        <Row>
          <Col sm={12}>
            <Nav variant="pills" className="va-nav tabs-custom-width-2-50">
              <Nav.Item className="va-tab" id="diffWidth">
                <Nav.Link
                  className="va-link"
                  eventKey="0"
                  onClick={() => {
                    navigation("/TripManagement");
                  }}
                >
                  {t("Scheduled Trip")} ({scheduleCount})
                </Nav.Link>
              </Nav.Item>
              {/* <Nav.Item className="va-tab">
                <Nav.Link className="va-link" eventKey="1">
                  {t("Dispatched Trip")} ({dispatchData.length})
                </Nav.Link>
              </Nav.Item> */}
            </Nav>
          </Col>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="0">
                <div className="running-status-card-wrapper">
                  {scheduleData && scheduleData.length > 0 ? (
                    scheduleData.map((ele, index) => {
                      return (
                        // <div className="no-trips-wrapper">
                        <div
                          className="status-card d-flex justify-content-center active"
                          key={"scheduleData" + index}
                        >
                          {/* <Dropdown className="pw-dropdown text-end">
                          <Dropdown.Toggle>
                            <div className="">
                              <img src={optionDot} alt="" />
                            </div>
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="pwd-menu">
                            <Dropdown.Item href="#" onClick={() => { setShareLink(true) }}>
                              {t("Share Trip")}
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-1">
                              {t("Track Location")}
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              {t("Show On Map")}
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              {t("Device Details")}
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              {t("Vehicle Details")}
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              {t("Trip Details")}
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              {t("Edit Trip")}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown> */}
                          <div className="row first-active-card-main">
                            <div className="col-6 col-md-4 data-content">
                              <label htmlFor="">{t("Driver Name")}</label>
                              <p>{ele?.user_name}</p>
                            </div>
                            {/* <div className="col-6 col-md-4 data-content">
                              <label htmlFor="">{t("Vehicle Type")}</label>
                              <p>{ele?.vehicle_type}</p>
                            </div> */}
                            <div className="col-6 col-md-4 data-content">
                              <label htmlFor="">{t("Vehicle No")}.</label>
                              <p>{ele?.vehicle_number}</p>
                            </div>
                            <div className="col-6 col-md-4 data-content">
                              <label htmlFor="">{t("Start Date")}</label>
                              <p>{ele?.trip_date?.slice(0, 10)}</p>
                            </div>
                            <div className="col-6 col-md-4 data-content">
                              <label htmlFor="">{t("End Date")}</label>
                              <p>{ele?.trip_end_date?.slice(0, 10)}</p>
                            </div>
                            <div className="col-6 col-md-4 data-content">
                              <label htmlFor="">
                                {t("Start Time")} (E.T.D)
                              </label>
                              <p>{ele?.trip_start_time}</p>
                            </div>
                            <div className="col-6 col-md-4 data-content">
                              <label htmlFor="">{t("End Time")} (E.T.D)</label>
                              <p>{ele?.trip_end_time}</p>
                            </div>

                            <div className="col-6 col-md-4 data-content">
                              <label htmlFor="">{t("Total Distance")}</label>
                              <p>{ele?.distance}</p>
                            </div>
                            <div className="col-6 col-md-4 data-content">
                              <label htmlFor="">{t("From")}</label>
                              <p>
                                {ele?.trip_start_point?.slice(0, 12)}
                                <br />
                              </p>
                            </div>
                            <div className="col-6 col-md-4 data-content">
                              <label htmlFor="">{t("To")}</label>
                              <p>
                                {ele?.trip_end_point?.slice(0, 12)} <br />
                              </p>
                            </div>
                          </div>
                        </div>
                        // </div>
                      );
                    })
                  ) : (
                    <NoDataComp />
                  )}
                </div>
              </Tab.Pane>
              {/* <Tab.Pane eventKey="1">
                <div className="running-status-card-wrapper d-flex justify-content-center">
                  <div className="no-trips-wrapper">
                    {dispatchData && dispatchData.length > 0 ? (
                      dispatchData.map((ele, index) => {
                        return (
                          <>
                            <Dropdown className="pw-dropdown text-end">
                              <Dropdown.Toggle>
                                <div className="">
                                  <img src={optionDot} alt="" />
                                </div>
                              </Dropdown.Toggle>

                              <Dropdown.Menu className="pwd-menu">
                                <Dropdown.Item
                                  href="#"
                                  onClick={() => {
                                    setShareLink(true);
                                  }}
                                >
                                  {t("Share Trip")}
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-1">
                                  {t("Track Location")}
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2">
                                  {t("Show On Map")}
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                  {t("Device Details")}
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                  {t("Vehicle Details")}
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                  {t("Trip Details")}
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                  {t("Edit Trip")}
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                            <div className="row first-active-card-main">
                              <div className="col-6 col-md-4 data-content">
                                <label htmlFor="">{t("Driver Name")}</label>
                                <p>Mark Woods</p>
                              </div>
                              <div className="col-6 col-md-4 data-content">
                                <label htmlFor="">{t("Vehicle Type")}</label>
                                <p>Pickup Truck</p>
                              </div>
                              <div className="col-6 col-md-4 data-content">
                                <label htmlFor="">{t("Vehicle No")}.</label>
                                <p>MH12-2023</p>
                              </div>
                              <div className="col-6 col-md-4 data-content">
                                <label htmlFor="">{t("Date")}</label>
                                <p>06/01/2023</p>
                              </div>
                              <div className="col-6 col-md-4 data-content">
                                <label htmlFor="">{t("Time")} (E.T.D)</label>
                                <p>04:00:00 PM</p>
                              </div>
                              <div className="col-6 col-md-4 data-content">
                                <label htmlFor="">{t("Total Distance")}</label>
                                <p>120Kms</p>
                              </div>
                              <div className="col-6 col-md-4 data-content">
                                <label htmlFor="">{t("From")}</label>
                                <p>
                                  Vishrantwadi,Kalas <br />
                                  Road, Pune
                                </p>
                              </div>
                              <div className="col-6 col-md-4 data-content">
                                <label htmlFor="">{t("To")}</label>
                                <p>
                                  Ch.Shivaji Maharaj <br />
                                  Terminal, Mumbai
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <div className=" text-danger">
                    
                        <img src={NoGPS} alt="" />
                        <p>No Dispatch Trip To Show...</p>
                      </div>
                    )}
                  </div>
                </div>
              </Tab.Pane> */}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      {/* Delete Modal Start */}
      <Modal
        Modal
        show={shareLink}
        onHide={() => setShareLink(false)}
        centered
        size="md"
        className="common-model copy_Link"
      >
        <Modal.Header closeButton>
          <Modal.Title>Share Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-2">
          <p>Link to share</p>
          <div className="copy_body">
            <input
              type="text"
              Value="https://Vehicletrackingsystem.com/12345"
              className="form-control"
            />
            <button className="cx-btn-2">
              <img src={copy} alt="" />
              Copy Link
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Delete Modal End */}
    </div>
  );
};

export default VehicleActive1;

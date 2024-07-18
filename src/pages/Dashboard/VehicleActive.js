import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "../../assets/styles/main.scss";
import { Tab, Tabs, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { useTranslation } from "react-i18next";

const VehicleActive = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const currentRoute = useLocation().pathname;
  const { t, i18n } = useTranslation();

  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="dashboard-first-item">
      <div className="style-vehicle-btn24"></div>
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
                  {t("Running")} (40)
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="va-tab">
                <Nav.Link className="va-link" eventKey="1">
                  {t("Idle")} (20)
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="va-tab">
                <Nav.Link className="va-link" eventKey="2">
                  {t("Parked")} (40)
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12} className="">
            <Tab.Content>
              <Tab.Pane eventKey="0">
                <div className="running-status-card-wrapper">
                  <div className="status-card active">
                    <div
                      className="first-active-card-main row"
                      onClick={() => {
                        handleClick();
                        setIsActive1(false);
                        setIsActive2(false);
                      }}
                    >
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="1">
                <div className="running-status-card-wrapper">
                  <div className="status-card active">
                    <div
                      className="first-active-card-main row"
                      onClick={() => {
                        handleClick();
                        setIsActive1(false);
                        setIsActive2(false);
                      }}
                    >
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="2">
                <div className="running-status-card-wrapper">
                  <div className="status-card active">
                    <div
                      className="first-active-card-main row"
                      onClick={() => {
                        handleClick();
                        setIsActive1(false);
                        setIsActive2(false);
                      }}
                    >
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="first-active-card-main row">
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Driver Name")}</label>
                        <p>Mark Woods</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle Type")}</label>
                        <p>Pickup Truck</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Vehicle No")}.</label>
                        <p>MH12-2023</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("From")}</label>
                        <p>Pune..</p>
                      </div>
                      <div className="col-4 data-content">
                        <label htmlFor="">{t("Distance Travelled")}</label>
                        <p>120Kms</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default VehicleActive;

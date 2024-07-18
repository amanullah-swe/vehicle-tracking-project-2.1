import { React, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import option from "../../../assets/images/option-three-dot.svg";
import Orange_top from "../../../assets/images/Vehicle_Icon/Vehicle_icon_orange_car_top.svg";
import { Dropdown, Modal, Tab, Tabs } from "react-bootstrap";
import alaram from "../../../assets/images/Vehicle_Icon/Details_Alaram.svg";
import charg from "../../../assets/images/Vehicle_Icon/Details_battry_charg.svg";
import qution from "../../../assets/images/Vehicle_Icon/Details_battry_qution.svg";
import battry from "../../../assets/images/Vehicle_Icon/Details_Battry.svg";
import health from "../../../assets/images/Vehicle_Icon/Details_health.svg";
import mail from "../../../assets/images/Vehicle_Icon/Details_mail_pending.svg";
import running from "../../../assets/images/Vehicle_Icon/Details_Running.svg";
import Driver_img from "../../../assets/images/Vehicle_Icon/Driver_img.svg";
import Driver_action1 from "../../../assets/images/Vehicle_Icon/Driver_action1.svg";
import Driver_action2 from "../../../assets/images/Vehicle_Icon/Driver_action2.svg";
import edit from "../../../assets/images/ic-edit.svg";
import deleteIcon from "../../../assets/images/delete.svg";
import licence from "../../../assets/images/licence.jpg";
import pollution from "../../../assets/images/pollution.png";
import insurance from "../../../assets/images/insurance.png";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MapComponent from "../../../sharedComponent/MapComponent";
import { Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { useTranslation } from "react-i18next";

const OnlineAuctionVehicleDetails = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [showdocs, setShowdocs] = useState(false);
  const handleClosedocs = () => setShowdocs(false);
  const handleShowdocs = () => setShowdocs(true);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { t, i18n } = useTranslation();

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
          <div className="main-dashboard-wrapper CustomerProfile">
            <div className="CustomerProfile-head">
              <div className="profile-img">
                <img src={Orange_top} alt="porfile" />
              </div>
              
            </div>
            <div className="information-card mt-5">
              <div className="information-head">
                <div className="imformation-heading">
                  <p>{t("General Information")}</p>
                </div>
              </div>
              <div className="information-contain row">
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Vehicle Category")}</p>
                  <p className="discription-contain">Truck</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Vehicle Number")}</p>
                  <p className="discription-contain">MH-12-2023</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Vehicle Registration Number")}
                  </p>
                  <p className="discription-contain">1234567890</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Chassis Number or VIN Number")}
                  </p>
                  <p className="discription-contain">45678912301573</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Vehicle Model Name & Number")}
                  </p>
                  <p className="discription-contain">VXI, 7705</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Vehicle Model Make Year")}
                  </p>
                  <p className="discription-contain">2023</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Transportation Type")}
                  </p>
                  <p className="discription-contain">Passenger</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Vehicle Capacity")}</p>
                  <p className="discription-contain">4</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Vehicle Fuel Type")}
                  </p>
                  <p className="discription-contain">Petrol</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Driver Name")}</p>
                  <p className="discription-contain">Mr.John Doe</p>
                </div>
              </div>
            </div>
            <div className="information-card">
              <div className="information-head">
                <div className="imformation-heading">
                  <p>{t("Tracking Device Information")}</p>
                </div>
              </div>
              <div className="information-contain row">
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Device IMEI Number")}
                  </p>
                  <p className="discription-contain">0123456789</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Type of Driver")}</p>
                  <p className="discription-contain">Driver Console App</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Sim Card Number")}</p>
                  <p className="discription-contain">4567891230</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Sim Telephone Number")}
                  </p>
                  <p className="discription-contain">6547</p>
                </div>
              </div>
            </div>
            <div className="information-card">
              <div className="information-head">
                <div className="imformation-heading">
                  <p>{t("Additional Information")}</p>
                </div>
              </div>
              <div className="information-contain row">
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Tax Start Date")}</p>
                  <p className="discription-contain">08-10-2022</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Tax End Date")}</p>
                  <p className="discription-contain">08-10-2022</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Insurance Start Date")}
                  </p>
                  <p className="discription-contain">08-10-2022</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Insurance End Date")}
                  </p>
                  <p className="discription-contain">08-10-2022</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Permit Start Date")}
                  </p>
                  <p className="discription-contain">08-10-2022</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Permit End Date")}</p>
                  <p className="discription-contain">08-10-2022</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                  <p className="discription-heading">{t("Vehicle Status")}</p>
                  <p className="discription-contain">Active / Inactive</p>
                </div>
              </div>
            </div>
          </div>
          <div className="tabs-main-details inner-tabs-section responscie-tabss-bigger row m-0">
            <Tab.Container
              id="left-tabs-example"
              className="td-tab-wrapper"
              defaultActiveKey="0"
            >
              <Nav variant="pills" className="td-nav" id="InnerTabNew_VD">
                <Nav.Item className="td-tab">
                  <Nav.Link className="td-link" eventKey="0">
                    {t("Overview")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="td-tab">
                  <Nav.Link className="td-link" eventKey="1">
                    {t("Configuration Info")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="td-tab">
                  <Nav.Link className="td-link" eventKey="2">
                    {t("Alert")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="td-tab">
                  <Nav.Link className="td-link" eventKey="3">
                    {t("Documents")}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Col sm={12} className="">
                <Tab.Content>
                  <Tab.Pane eventKey="0">
                    <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey="first"
                    >
                      <Nav variant="pills" id="newTabMai" className="mb-3">
                        <Nav.Item>
                          <Nav.Link eventKey="first">
                            {t("Vehicle Health Status")}
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">
                            {t("Vehicle Current Position")}
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="three">
                            {t("Assigned Employees")}
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="four">
                            {t("Assigned Trip Details")}
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <div className="transport-main row m-0 p-0">
                            <div className="common-table details-tabel-main">
                              <table>
                                <thead>
                                  <tr>
                                    <th>{t("Sr.no")}</th>
                                    <th>{t("Vehicle Part")}</th>
                                    <th>{t("Status")}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>
                                      <img src={battry} alt="" />
                                      Device Battery
                                    </td>
                                    <td>50%</td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>
                                      <img src={qution} alt="" />
                                      Device Battery Status
                                    </td>
                                    <td>Ok</td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>
                                      <img src={charg} alt="" />
                                      Vehicle Battery Voltage
                                    </td>
                                    <td>12 Volts</td>
                                  </tr>
                                  <tr>
                                    <td>4</td>
                                    <td>
                                      <img src={mail} alt="" />
                                      Pending Messages
                                    </td>
                                    <td>10</td>
                                  </tr>
                                  <tr>
                                    <td>5</td>
                                    <td>
                                      <img src={alaram} alt="" />
                                      Panic Alarm
                                    </td>
                                    <td>Normal</td>
                                  </tr>
                                  <tr>
                                    <td>6</td>
                                    <td>
                                      <img src={running} alt="" />
                                      Running Status
                                    </td>
                                    <td>Running</td>
                                  </tr>
                                  <tr>
                                    <td>7</td>
                                    <td>
                                      <img src={health} alt="" />
                                      Running Status
                                    </td>
                                    <td>06-10-2023, 04:04:58 PM</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <div className="road-map m-0 p-0">
                            <MapComponent />
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="three">
                          <Tab.Container
                            id="left-tabs-example"
                            className="td-tab-wrapper"
                            defaultActiveKey="0"
                          >
                            <Nav
                              variant="pills"
                              className="td-nav"
                              id="InnerTabNew_Foure"
                            >
                              <Nav.Item className="td-tab">
                                <Nav.Link className="td-link" eventKey="0">
                                  {t("Drivers")}
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item className="td-tab">
                                <Nav.Link className="td-link" eventKey="1">
                                  {t("Bus Assistants")}
                                </Nav.Link>
                              </Nav.Item>
                            </Nav>
                            <Col sm={12} className="">
                              <Tab.Content>
                                <Tab.Pane eventKey="0">
                                  <div className="transport-main row m-0 p-0">
                                    <div className="common-table details-tabel-main">
                                      <table className="assign-employee-table">
                                        <thead>
                                          <tr>
                                            <th>{t("Sr.no")}</th>
                                            <th>{t("Image")}</th>
                                            <th>{t("Name")}</th>
                                            <th>{t("Contact Number")}</th>
                                            <th>{t("Action")}</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>1</td>
                                            <td>
                                              <img src={Driver_img} alt="" />
                                            </td>
                                            <td>John Doe</td>
                                            <td>+91 99 22 33 44 55</td>
                                            <td>
                                              <img
                                                src={Driver_action1}
                                                alt=""
                                                className="c-pointer"
                                              />
                                              <img
                                                src={Driver_action2}
                                                alt=""
                                                className="c-pointer"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>2</td>
                                            <td>
                                              <img src={Driver_img} alt="" />
                                            </td>
                                            <td>John Doe</td>
                                            <td>+91 99 22 33 44 55</td>
                                            <td>
                                              <img
                                                src={Driver_action1}
                                                alt=""
                                                className="c-pointer"
                                              />
                                              <img
                                                src={Driver_action2}
                                                alt=""
                                                className="c-pointer"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>3</td>
                                            <td>
                                              <img src={Driver_img} alt="" />
                                            </td>
                                            <td>John Doe</td>
                                            <td>+91 99 22 33 44 55</td>
                                            <td>
                                              <img
                                                src={Driver_action1}
                                                alt=""
                                                className="c-pointer"
                                              />
                                              <img
                                                src={Driver_action2}
                                                alt=""
                                                className="c-pointer"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>4</td>
                                            <td>
                                              <img src={Driver_img} alt="" />
                                            </td>
                                            <td>John Doe</td>
                                            <td>+91 99 22 33 44 55</td>
                                            <td>
                                              <img
                                                src={Driver_action1}
                                                alt=""
                                                className="c-pointer"
                                              />
                                              <img
                                                src={Driver_action2}
                                                alt=""
                                                className="c-pointer"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>5</td>
                                            <td>
                                              <img src={Driver_img} alt="" />
                                            </td>
                                            <td>John Doe</td>
                                            <td>+91 99 22 33 44 55</td>
                                            <td>
                                              <img
                                                src={Driver_action1}
                                                alt=""
                                                className="c-pointer"
                                              />
                                              <img
                                                src={Driver_action2}
                                                alt=""
                                                className="c-pointer"
                                              />
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="1">
                                  <div className="transport-main row m-0 p-0">
                                    <div className="common-table details-tabel-main">
                                      <table className="assign-employee-table">
                                        <thead>
                                          <tr>
                                            <th>{t("Sr.no")}</th>
                                            <th>{t("Image")}</th>
                                            <th>{t("Name")}</th>
                                            <th>{t("Contact Number")}</th>
                                            <th>{t("Action")}</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>1</td>
                                            <td>
                                              <img src={Driver_img} alt="" />
                                            </td>
                                            <td>John Doe</td>
                                            <td>+91 99 22 33 44 55</td>
                                            <td>
                                              <img
                                                src={Driver_action1}
                                                alt=""
                                                className="c-pointer"
                                              />
                                              <img
                                                src={Driver_action2}
                                                alt=""
                                                className="c-pointer"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>2</td>
                                            <td>
                                              <img src={Driver_img} alt="" />
                                            </td>
                                            <td>John Doe</td>
                                            <td>+91 99 22 33 44 55</td>
                                            <td>
                                              <img
                                                src={Driver_action1}
                                                alt=""
                                                className="c-pointer"
                                              />
                                              <img
                                                src={Driver_action2}
                                                alt=""
                                                className="c-pointer"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>3</td>
                                            <td>
                                              <img src={Driver_img} alt="" />
                                            </td>
                                            <td>John Doe</td>
                                            <td>+91 99 22 33 44 55</td>
                                            <td>
                                              <img
                                                src={Driver_action1}
                                                alt=""
                                                className="c-pointer"
                                              />
                                              <img
                                                src={Driver_action2}
                                                alt=""
                                                className="c-pointer"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>4</td>
                                            <td>
                                              <img src={Driver_img} alt="" />
                                            </td>
                                            <td>John Doe</td>
                                            <td>+91 99 22 33 44 55</td>
                                            <td>
                                              <img
                                                src={Driver_action1}
                                                alt=""
                                                className="c-pointer"
                                              />
                                              <img
                                                src={Driver_action2}
                                                alt=""
                                                className="c-pointer"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>5</td>
                                            <td>
                                              <img src={Driver_img} alt="" />
                                            </td>
                                            <td>John Doe</td>
                                            <td>+91 99 22 33 44 55</td>
                                            <td>
                                              <img
                                                src={Driver_action1}
                                                alt=""
                                                className="c-pointer"
                                              />
                                              <img
                                                src={Driver_action2}
                                                alt=""
                                                className="c-pointer"
                                              />
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </Tab.Pane>
                              </Tab.Content>
                            </Col>
                          </Tab.Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="four">
                          <div className="transport-main row m-0 p-0">
                            <div className="common-table details-tabel-main">
                              <table className="assigned-trips-table">
                                <thead>
                                  <tr>
                                    <th>{t("Sr.no")}</th>
                                    <th>{t("Trip Name")}</th>
                                    <th>{t("Trip Type")}</th>
                                    <th>{t("Action")}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>Business Trip</td>
                                    <td>Pick Up</td>
                                    <td>
                                      <img
                                        src={Driver_action1}
                                        alt=""
                                        className="c-pointer"
                                      />
                                      <img
                                        src={edit}
                                        alt=""
                                        className="c-pointer"
                                      />
                                      <img
                                        src={deleteIcon}
                                        alt=""
                                        className="c-pointer"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>Business Trip</td>
                                    <td>Pick Up</td>
                                    <td>
                                      <img
                                        src={Driver_action1}
                                        alt=""
                                        className="c-pointer"
                                      />
                                      <img
                                        src={edit}
                                        alt=""
                                        className="c-pointer"
                                      />
                                      <img
                                        src={deleteIcon}
                                        alt=""
                                        className="c-pointer"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>Business Trip</td>
                                    <td>Pick Up</td>
                                    <td>
                                      <img
                                        src={Driver_action1}
                                        alt=""
                                        className="c-pointer"
                                      />
                                      <img
                                        src={edit}
                                        alt=""
                                        className="c-pointer"
                                      />
                                      <img
                                        src={deleteIcon}
                                        alt=""
                                        className="c-pointer"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>4</td>
                                    <td>Business Trip</td>
                                    <td>Pick Up</td>
                                    <td>
                                      <img
                                        src={Driver_action1}
                                        alt=""
                                        className="c-pointer"
                                      />
                                      <img
                                        src={edit}
                                        alt=""
                                        className="c-pointer"
                                      />
                                      <img
                                        src={deleteIcon}
                                        alt=""
                                        className="c-pointer"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>5</td>
                                    <td>Business Trip</td>
                                    <td>Pick Up</td>
                                    <td>
                                      <img
                                        src={Driver_action1}
                                        alt=""
                                        className="c-pointer"
                                      />
                                      <img
                                        src={edit}
                                        alt=""
                                        className="c-pointer"
                                      />
                                      <img
                                        src={deleteIcon}
                                        alt=""
                                        className="c-pointer"
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </Tab.Pane>
                  <Tab.Pane eventKey="1">
                    <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey="first"
                    >
                      <Nav variant="pills" id="newTabMai" className="mb-3">
                        <Nav.Item>
                          <Nav.Link eventKey="first">
                            {t("GPRS Configuration")}
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second" className="custon-link">
                            {t("Data Frequency Configuration")}
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <div className="transport-main row m-0 p-0">
                            <div className="common-table details-tabel-main">
                              <table className="gps-config-table">
                                <thead>
                                  <tr>
                                    <th>{t("Particular")}</th>
                                    <th>{t("Values")}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>APN Name</td>
                                    <td>Vehicle Tracking System</td>
                                  </tr>
                                  <tr>
                                    <td>GPRS ID</td>
                                    <td>vehicle@xyz.com</td>
                                  </tr>
                                  <tr>
                                    <td>Password</td>
                                    <td>vehicle@123</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <div className="transport-main row m-0 p-0 mb-3">
                            <div className="common-table details-tabel-main">
                              <table className="gps-config-table">
                                <thead>
                                  <tr>
                                    <th>{t("Data Genrating Frequency")}</th>
                                    <th>{t("Values")}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Data Genrating Frequency</td>
                                    <td>0.5s</td>
                                  </tr>
                                  <tr>
                                    <td>Data Genrating Frequency</td>
                                    <td>10s</td>
                                  </tr>
                                  <tr>
                                    <td>Vehicle Parked on Home Network</td>
                                    <td>50s</td>
                                  </tr>
                                  <tr>
                                    <td>Vehicle Parked on Roaming Network</td>
                                    <td>1.05s</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="transport-main row m-0 p-0">
                            <div className="common-table details-tabel-main">
                              <table className="gps-config-table">
                                <thead>
                                  <tr>
                                    <th>{t("Data Sending Frequency")}</th>
                                    <th>{t("Values")}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Data Genrating Frequency</td>
                                    <td>0.5s</td>
                                  </tr>
                                  <tr>
                                    <td>Data Genrating Frequency</td>
                                    <td>10s</td>
                                  </tr>
                                  <tr>
                                    <td>Vehicle Parked on Home Network</td>
                                    <td>50s</td>
                                  </tr>
                                  <tr>
                                    <td>Vehicle Parked on Roaming Network</td>
                                    <td>1.05s</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </Tab.Pane>
                  <Tab.Pane eventKey="2">
                    <div className="transport-main row m-0 p-0 mb-3">
                      <div className="common-table details-tabel-main table-width-700">
                        <table className="alert-table">
                          <thead>
                            <tr>
                              <th>{t("Sr.No")}</th>
                              <th>{t("Alert Name")}</th>
                              <th>{t("Date & Time")}</th>
                              <th>{t("GPS Position")}</th>
                              <th>{t("Location")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Sleep Tracking</td>
                              <td>22-12-2022, 04:04:58 PM</td>
                              <td>19.1834864 N 77.0708995 E</td>
                              <td>Vishrantwadi, Pune</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Accident</td>
                              <td>22-12-2022, 04:04:58 PM</td>
                              <td>19.1834864 N 77.0708995 E</td>
                              <td>Vishrantwadi, Pune</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Rash Driving</td>
                              <td>22-12-2022, 04:04:58 PM</td>
                              <td>19.1834864 N 77.0708995 E</td>
                              <td>Vishrantwadi, Pune</td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>XYZ</td>
                              <td>22-12-2022, 04:04:58 PM</td>
                              <td>19.1834864 N 77.0708995 E</td>
                              <td>Vishrantwadi, Pune</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="3">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="vehicle-doc-card">
                          <label htmlFor="" className="">
                            Registration certificate
                          </label>
                          <div className="doc-inner">
                            <img
                              src={licence}
                              alt=""
                              onClick={handleShowdocs}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="vehicle-doc-card">
                          <label htmlFor="" className="">
                            Insurance Copy
                          </label>
                          <div className="doc-inner">
                            <img
                              src={insurance}
                              alt=""
                              onClick={handleShowdocs}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="vehicle-doc-card">
                          <label htmlFor="" className="">
                            pollution certificate
                          </label>
                          <div className="doc-inner">
                            <img
                              src={pollution}
                              alt=""
                              onClick={handleShowdocs}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Tab.Container>
          </div>
        </div>
        <Modal
          show={showdocs}
          onHide={handleClosedocs}
          centered
          className="common-model"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <img src={licence} alt="" className="w-100" />
          </Modal.Body>
        </Modal>
        <Modal
          show={show}
          onHide={handleClose}
          centered
          className="common-model"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("Delete Vehicle")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {t("Are you sure you want to delete this vehicle")} ?
          </Modal.Body>
          <Modal.Footer className="pop-up-modal-footer btn-wrapper">
            <button className="cx-btn-1" onClick={handleClose}>
              {t("Close")}
            </button>
            <button className="cx-btn-2" onClick={handleClose}>
              {t("Yes")}
            </button>
          </Modal.Footer>
        </Modal>
      </motion.div>
    </>
  );
};

export default OnlineAuctionVehicleDetails;

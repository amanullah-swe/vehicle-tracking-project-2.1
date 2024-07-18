// Usama 09-02-2023
import React, { useContext, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Col, Dropdown, Modal, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import "@splidejs/react-splide/css";
import ic_check_accept from "../../../assets/images/ic_check_accept.svg";
import Export from "../../../assets/images/ic-Export.svg";
import Import from "../../../assets/images/ic-Import.svg";
import ic_reject_cross from "../../../assets/images/ic_reject_cross.svg";
import { motion } from "framer-motion";
import Delete from "../../../assets/images/delete.svg";
import View from "../../../assets/images/Group.svg";
import Nav from "react-bootstrap/Nav";
import ic_r_arrow from "../../../assets/images/ic_r_arrow.svg";
import { Link, useNavigate } from "react-router-dom";
import Pagenation from "../../../sharedComponent/Pagenation";
import { useTranslation } from "react-i18next";

const DirectOrderMarketPlace = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const [view, setView] = useState(false);
  const [vCars, setVCars] = useState(false);
  const [vBike, setVBike] = useState(false);
  const [state, setState] = useState(false);

  const showView = () => {
    setView(true);
  };
  const hideView = () => {
    setView(false);
  };
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleClose3 = () => setShow3(false);

  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  //category
  const [category, setCategory] = useState(false);
  const DeleteCategory = () => setShow(false);
  const showCategory = () => setShow(true);
  //group
  const [group, setGroup] = useState(false);
  const DeleteGroup = () => setShow(false);
  const showGroup = () => setShow(true);

  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const [Immobilization, setImmobilization] = useState(true);
  const [Immobilization1, setImmobilization1] = useState(true);
  const [Tempr, setTempr] = useState(true);
  const [Fuel, setFuel] = useState(true);
  const [ibtn, setIbtn] = useState(true);
  const [seat, setSeat] = useState(true);
  const [echo, setEcho] = useState(true);
  const [ivms, setIVMS] = useState(true);
  const [card, setCard] = useState(true);
  const [speed, setSpeed] = useState(true);
  const [cresh, setCresh] = useState(true);
  const [exicess, setExicess] = useState(true);
  const [towing, setTowing] = useState(true);
  const [plug, setPlug] = useState(true);

  return (
    <motion.div
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}
      className={sidebar ? "taskMain " : "cx-active taskMain"}
      id="cx-main"
    >
      <div id="cx-wrapper" className="Vehicle_Main">
        <div
          className="Vehcle-main-tabs cx-marketPlace-main"
          id="cx-marketPlace"
        >
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Nav variant="pills" id="newTabMai" className="tob_nav_pills">
              <Nav.Item>
                <Nav.Link eventKey="first">{t("Load List")}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">{t("Offer Vehicle")}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="three">{t("Order Confirmation")}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="four">{t("Freight")}</Nav.Link>
              </Nav.Item>
              
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div className="main-master-wrapper">
                  <div id="scroll_insideThe_Padding_tabel">
                    <div className="VA_table">
                      <table className="table tableAdmin">
                        <thead className="tableHead">
                          <tr>
                            <th>{t("Sr.no")}</th>
                            <th>{t("Offer Load Ref. No")}</th>
                            <th>{t("Vehicle Availability Dt.")}</th>
                            <th>{t("From & To")}</th>
                            <th>{t("Cargo Type")}</th>
                            <th>{t("Container Type")}</th>
                            <th>{t("Quantity")}</th>
                            <th>{t("Action")}</th>
                          </tr>
                        </thead>
                        <tbody className="tableBody">
                          <tr>
                            <td>1</td>
                            <td>RF-1234567890-1111</td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>Flat 40ft</td>
                            <td>200</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="#" onClick={() => setShow(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_check_accept} alt="" />
                                  </div>
                                </Link>

                                <Link to="#" onClick={() => setShow2(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_reject_cross} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>RF-1234567890-1111</td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>Flat 40ft</td>
                            <td>200</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="#" onClick={() => setShow(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_check_accept} alt="" />
                                  </div>
                                </Link>

                                <Link to="#" onClick={() => setShow2(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_reject_cross} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td>RF-1234567890-1111</td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>Flat 40ft</td>
                            <td>200</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="#" onClick={() => setShow(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_check_accept} alt="" />
                                  </div>
                                </Link>

                                <Link to="#" onClick={() => setShow2(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_reject_cross} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td>RF-1234567890-1111</td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>Flat 40ft</td>
                            <td>200</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="#" onClick={() => setShow(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_check_accept} alt="" />
                                  </div>
                                </Link>

                                <Link to="#" onClick={() => setShow2(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_reject_cross} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td>RF-1234567890-1111</td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>Flat 40ft</td>
                            <td>200</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="#" onClick={() => setShow(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_check_accept} alt="" />
                                  </div>
                                </Link>

                                <Link to="#" onClick={() => setShow2(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_reject_cross} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td>RF-1234567890-1111</td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>Flat 40ft</td>
                            <td>200</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="#" onClick={() => setShow(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_check_accept} alt="" />
                                  </div>
                                </Link>

                                <Link to="#" onClick={() => setShow2(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_reject_cross} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td>RF-1234567890-1111</td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>Flat 40ft</td>
                            <td>200</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="#" onClick={() => setShow(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_check_accept} alt="" />
                                  </div>
                                </Link>

                                <Link to="#" onClick={() => setShow2(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_reject_cross} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td>RF-1234567890-1111</td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>Flat 40ft</td>
                            <td>200</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="#" onClick={() => setShow(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_check_accept} alt="" />
                                  </div>
                                </Link>

                                <Link to="#" onClick={() => setShow2(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_reject_cross} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td>RF-1234567890-1111</td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>Flat 40ft</td>
                            <td>200</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="#" onClick={() => setShow(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_check_accept} alt="" />
                                  </div>
                                </Link>

                                <Link to="#" onClick={() => setShow2(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_reject_cross} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td>RF-1234567890-1111</td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>Flat 40ft</td>
                            <td>200</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="#" onClick={() => setShow(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_check_accept} alt="" />
                                  </div>
                                </Link>

                                <Link to="#" onClick={() => setShow2(true)}>
                                  <div className="inconsIn me-3">
                                    <img src={ic_reject_cross} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Pagenation />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <div className="main-master-wrapper">
                  <div id="scroll_insideThe_Padding_tabel">
                    <div className="VA_table">
                      <table className="table tableAdmin">
                        <thead className="tableHead">
                          <tr>
                            <th>{t("Sr.no")}</th>
                            <th>{t("Offer Load Ref. No")}</th>
                            <th>{t("Vehicle Availability Dt.")}</th>
                            <th>{t("From & To")}</th>
                            <th>{t("Cargo Type")}</th>
                            <th>{t("Quantity")}</th>
                            <th>{t("Status")}</th>
                            <th>{t("Vehicle Offered")}</th>
                          </tr>
                        </thead>
                        <tbody className="tableBody">
                          <tr>
                            <td>1</td>
                            <td className="refrs-link"> <Link to="/DirectOrderReferenceDetails">RF-1234567890-1111
                            </Link>
                            </td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>200</td>
                            <td>Initated</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/DirectOrderVehicleDetails" >
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>


                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td className="refrs-link"> <Link to="/DirectOrderReferenceDetails">RF-1234567890-1111
                            </Link>
                            </td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>200</td>
                            <td>Initated</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/DirectOrderVehicleDetails" >
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>


                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td className="refrs-link"> <Link to="/DirectOrderReferenceDetails">RF-1234567890-1111
                            </Link>
                            </td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>200</td>
                            <td>Initated</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/DirectOrderVehicleDetails" >
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>


                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td className="refrs-link"> <Link to="/DirectOrderReferenceDetails">RF-1234567890-1111
                            </Link>
                            </td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>200</td>
                            <td>Initated</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/DirectOrderVehicleDetails" >
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>


                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td className="refrs-link"> <Link to="/DirectOrderReferenceDetails">RF-1234567890-1111
                            </Link>
                            </td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>200</td>
                            <td>Initated</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/DirectOrderVehicleDetails" >
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>


                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td className="refrs-link"> <Link to="/DirectOrderReferenceDetails">RF-1234567890-1111
                            </Link>
                            </td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>200</td>
                            <td>Initated</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/DirectOrderVehicleDetails" >
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>


                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Pagenation />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="three">
              <div className="main-master-wrapper">
                  <div id="scroll_insideThe_Padding_tabel">
                    <div className="VA_table">
                      <table className="table tableAdmin">
                        <thead className="tableHead">
                          <tr>
                            <th>{t("Sr.no")}</th>
                            <th>{t("Reference No.")}</th>
                            <th>{t("Operation No.")}</th>
                            <th>{t("Shipper")}</th>
                            <th>{t("Unit Price")}</th>
                            <th>{t("Total Price")}</th>
                            <th>{t("Loading Place")}</th>
                            <th>{t("Exp. Loading Time")}</th>
                            <th>{t("Received On")}</th>
                            <th>{t("Action")}</th>
                          </tr>
                        </thead>
                        <tbody className="tableBody">
                          <tr>
                            <td>1</td>
                            <td className="refrs-link">RF-1234567890-1111</td>
                            <td>12345</td>
                            <td>Shipping Company</td>
                            <td>200</td>
                            <td>400</td>
                            <td>Pune</td>
                            <td>2023-08-31</td>
                            <td>2023-08-31</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/DirectOrderConfirmation" >
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>


                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td className="refrs-link">RF-1234567890-1111</td>
                            <td>12345</td>
                            <td>Shipping Company</td>
                            <td>200</td>
                            <td>400</td>
                            <td>Pune</td>
                            <td>2023-08-31</td>
                            <td>2023-08-31</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/DirectOrderConfirmation" >
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>


                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td className="refrs-link">RF-1234567890-1111</td>
                            <td>12345</td>
                            <td>Shipping Company</td>
                            <td>200</td>
                            <td>400</td>
                            <td>Pune</td>
                            <td>2023-08-31</td>
                            <td>2023-08-31</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/DirectOrderConfirmation" >
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>


                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td className="refrs-link">RF-1234567890-1111</td>
                            <td>12345</td>
                            <td>Shipping Company</td>
                            <td>200</td>
                            <td>400</td>
                            <td>Pune</td>
                            <td>2023-08-31</td>
                            <td>2023-08-31</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/DirectOrderConfirmation" >
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>


                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td className="refrs-link">RF-1234567890-1111</td>
                            <td>12345</td>
                            <td>Shipping Company</td>
                            <td>200</td>
                            <td>400</td>
                            <td>Pune</td>
                            <td>2023-08-31</td>
                            <td>2023-08-31</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/DirectOrderConfirmation" >
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>


                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Pagenation />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="four">
              <div className="main-master-wrapper">
                  <div id="scroll_insideThe_Padding_tabel">
                    <div className="VA_table">
                      <table className="table tableAdmin">
                        <thead className="tableHead">
                          <tr>
                            <th>{t("Sr.no")}</th>
                            <th>{t("Reference No.")}</th>
                            <th>{t("Start City")}</th>
                            <th>{t("Start Date")}</th>
                            <th>{t("End Date")}</th>
                            <th>{t("Status")}</th>
                            <th>{t("Action")}</th>
                            
                          </tr>
                        </thead>
                        <tbody className="tableBody">
                          <tr>
                            <td>1</td>
                            <td className="refrs-link">RF-1234567890-1111</td>
                            <td>Pune, Kalas Road</td>
                            <td>2023-08-31</td>
                            <td>2023-08-31</td>
                            <td>Initated</td>
                            
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="#" >
                                  <div className="inconsIn me-3">
                                    <img src={ic_r_arrow} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td className="refrs-link">RF-1234567890-1111</td>
                            <td>Pune, Kalas Road</td>
                            <td>2023-08-31</td>
                            <td>2023-08-31</td>
                            <td>Initated</td>
                            
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="#" >
                                  <div className="inconsIn me-3">
                                    <img src={ic_r_arrow} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td className="refrs-link">RF-1234567890-1111</td>
                            <td>Pune, Kalas Road</td>
                            <td>2023-08-31</td>
                            <td>2023-08-31</td>
                            <td>Initated</td>
                            
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="#" >
                                  <div className="inconsIn me-3">
                                    <img src={ic_r_arrow} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td className="refrs-link">RF-1234567890-1111</td>
                            <td>Pune, Kalas Road</td>
                            <td>2023-08-31</td>
                            <td>2023-08-31</td>
                            <td>Initated</td>
                            
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="#" >
                                  <div className="inconsIn me-3">
                                    <img src={ic_r_arrow} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr><tr>
                            <td>1</td>
                            <td className="refrs-link">RF-1234567890-1111</td>
                            <td>Pune, Kalas Road</td>
                            <td>2023-08-31</td>
                            <td>2023-08-31</td>
                            <td>Initated</td>
                            
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="#" >
                                  <div className="inconsIn me-3">
                                    <img src={ic_r_arrow} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Pagenation />
                </div>
              </Tab.Pane>
              
            </Tab.Content>
          </Tab.Container>
          {/* =========================== Aprove ========================= */}
          <Modal
            show={show}
            onHide={handleClose}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Approve Request")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {t("Are you sure you want to Approve this request ?")} ?
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer btn-wrapper">
              <button className="cx-btn-1" onClick={handleClose}>
                {t("Cancel")}
              </button>
              <button className="cx-btn-2" onClick={() => navigate("/DirectOrderOfferLoad")} >
                {t("Yes, Approve")}
              </button>
            </Modal.Footer>
          </Modal>

          {/* =============================== Reject ======================= */}
          <Modal
            show={show2}
            onHide={handleClose2}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Reject Request")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {t("Are you sure you want to Reject this request ?")} ?
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer btn-wrapper">
              <button className="cx-btn-1" onClick={handleClose2}>
                {t("No")}
              </button>
              <button className="cx-btn-2" onClick={handleClose2}>
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>

          {/* ===================================== View Offered Vehicle ========================== */}

          {/* <Modal
            show={show3}
            onHide={handleClose3}
            centered
            size="xl"
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Offered Vehicle Details")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {t("Are you sure you want to Approve this request ?")} ?
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer btn-wrapper">
              <button className="cx-btn-1" onClick={handleClose3  }>
                {t("Cancel")}
              </button>
              <button className="cx-btn-2" onClick={()=>navigate("/DirectOrderOfferLoad")} >
                {t("Yes, Approve")}
              </button>
            </Modal.Footer>
          </Modal> */}
        </div>
      </div>
    </motion.div>
  );
};

export default DirectOrderMarketPlace;

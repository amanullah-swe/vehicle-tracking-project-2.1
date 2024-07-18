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
import Nav from "react-bootstrap/Nav";
import View from "../../../assets/images/Group.svg";
import Cat_ye_car from "../../../assets/images/Catagiry_yellow_car.svg";
import { Link, useNavigate } from "react-router-dom";
import Pagenation from "../../../sharedComponent/Pagenation";
import { useTranslation } from "react-i18next";
import ic_r_arrow from "../../../assets/images/ic_r_arrow.svg";

const OnlineAuction = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const { t, i18n } = useTranslation();
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
                <Nav.Link eventKey="first">{t("Auction List")}</Nav.Link>
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
                              <Link to="/BidAuctionDetails" className="bidLink">
                                <button>Bid</button>
                              </Link>
                              {/* <div className="innerFlex d-flex">
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
                                                            </div> */}
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
                            <td className="refrs-link">
                              {" "}
                              <Link to="/AuctionReferenceDetails">
                                RF-1234567890-1111
                              </Link>
                            </td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>200</td>
                            <td>Initated</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/OnlineAuctionVehicleDetails">
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td className="refrs-link">
                              {" "}
                              <Link to="/AuctionReferenceDetails">
                                RF-1234567890-1111
                              </Link>
                            </td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>200</td>
                            <td>Initated</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/OnlineAuctionVehicleDetails">
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td className="refrs-link">
                              {" "}
                              <Link to="/AuctionReferenceDetails">
                                RF-1234567890-1111
                              </Link>
                            </td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>200</td>
                            <td>Initated</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/OnlineAuctionVehicleDetails">
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td className="refrs-link">
                              {" "}
                              <Link to="/AuctionReferenceDetails">
                                RF-1234567890-1111
                              </Link>
                            </td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>200</td>
                            <td>Initated</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/OnlineAuctionVehicleDetails">
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td className="refrs-link">
                              {" "}
                              <Link to="/AuctionReferenceDetails">
                                RF-1234567890-1111
                              </Link>
                            </td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>200</td>
                            <td>Initated</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/OnlineAuctionVehicleDetails">
                                  <div className="inconsIn me-3">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td className="refrs-link">
                              {" "}
                              <Link to="/AuctionReferenceDetails">
                                RF-1234567890-1111
                              </Link>
                            </td>
                            <td>01-01-2023</td>
                            <td>Pune to Kolhapur</td>
                            <td>Container</td>
                            <td>200</td>
                            <td>Initated</td>
                            <td>
                              <div className="innerFlex d-flex">
                                <Link to="/OnlineAuctionVehicleDetails">
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
                                <Link to="/OrderConfDetails">
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
                                <Link to="/OrderConfDetails">
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
                                <Link to="/OrderConfDetails">
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
                                <Link to="/OrderConfDetails">
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
                                <Link to="/OrderConfDetails">
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
                                <Link to="#">
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
                                <Link to="#">
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
                                <Link to="#">
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
                                <Link to="#">
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
                                <Link to="#">
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
        </div>
      </div>
    </motion.div>
  );
};

export default OnlineAuction;

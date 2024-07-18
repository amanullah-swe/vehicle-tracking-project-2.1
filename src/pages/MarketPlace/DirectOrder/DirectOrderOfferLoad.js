// Usama 09-02-2023
import React, { useContext, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Carousel,
  Col,
  Dropdown,
  Form,
  Modal,
  Tab,
  Tabs,
} from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import "@splidejs/react-splide/css";
import ic_check_accept from "../../../assets/images/ic_check_accept.svg";
import Delete from "../../../assets/images/delete.svg";
import View from "../../../assets/images/Group.svg";
import ic_reject_cross from "../../../assets/images/ic_reject_cross.svg";
import { motion } from "framer-motion";
import Nav from "react-bootstrap/Nav";
import Cat_ye_car from "../../../assets/images/Catagiry_yellow_car.svg";
import { Link, useNavigate } from "react-router-dom";
import Pagenation from "../../../sharedComponent/Pagenation";
import { useTranslation } from "react-i18next";

const DirectOrderOfferLoad = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
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
          <div
            className="main-master-wrapper form_input_main"
            id="View_Dispatch_main"
          >
            <div className="headingDetails btn-o">
              <div className="headingTxt btn-o">
                <p className="heading">{t("Offer Load Details")}</p>
                <div className="btn-right-offer">
                  <button className="Cancel">Cancel</button>
                  <button className="Send-Offer">Send Offer</button>
                </div>
              </div>
            </div>
            <div className="DetailsSec">
              <div className="row">
                <div className="col-md-3">
                  <label className="head">
                    {t("Offer Load Reference No.")}
                  </label>
                  <p className="Value">LP-0987654321098-11356</p>
                </div>
                <div className="col-md-3">
                  <label className="head">{t("Cargo Type")}</label>
                  <p className="Value">XYZ</p>
                </div>
                <div className="col-md-3">
                  <label className="head">{t("Quantity")}</label>
                  <p className="Value">800</p>
                </div>
              </div>
            </div>
          </div>

          <div className="main-master-wrapper">
            <div id="scroll_insideThe_Padding_tabel">
              <div className="VA_table">
                <table className="table tableAdmin">
                  <thead className="tableHead">
                    <tr>
                      <th className="t-check-box"><Form.Check type="checkbox" className="m-p-check-list" />All</th>
                      <th>
                        {t("Sr.no")}
                      </th>
                      <th>{t("Offer Load Ref. No")}</th>
                      <th>{t("Model")}</th>
                      <th>{t("Power Plate No. & Type")}</th>
                      <th>{t("Trailer Plate No. & Type")}</th>
                      <th>{t("Driver")}</th>
                      <th>{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    <tr>
                      <td><Form.Check type="checkbox" className="m-p-check-list" /></td>
                      <td> 1</td>
                      <td>RF-1234567890-1111</td>
                      <td>xyz</td>
                      <td>3456-Truck</td>
                      <td>3456-Truck</td>
                      <td>Salman</td>

                      <td>
                        <div className="innerFlex d-flex">
                          <Link to="/DirectOrderVehicleDetails" onClick={() => setShow(true)}>
                            <div className="inconsIn me-3">
                              <img src={View} alt="" />
                            </div>
                          </Link>

                          <Link to="#" onClick={() => setShow2(true)}>
                            <div className="inconsIn me-3">
                              <img src={Delete} alt="" />
                            </div>
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                    <td><Form.Check type="checkbox" className="m-p-check-list" /></td>
                      <td>1</td>
                      <td>RF-1234567890-1111</td>
                      <td>xyz</td>
                      <td>3456-Truck</td>
                      <td>3456-Truck</td>
                      <td>Salman</td>

                      <td>
                        <div className="innerFlex d-flex">
                          <Link to="/DirectOrderVehicleDetails" onClick={() => setShow(true)}>
                            <div className="inconsIn me-3">
                              <img src={View} alt="" />
                            </div>
                          </Link>

                          <Link to="#" onClick={() => setShow2(true)}>
                            <div className="inconsIn me-3">
                              <img src={Delete} alt="" />
                            </div>
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><Form.Check type="checkbox" className="m-p-check-list" /></td>
                      <td> 1</td>
                      <td>RF-1234567890-1111</td>
                      <td>xyz</td>
                      <td>3456-Truck</td>
                      <td>3456-Truck</td>
                      <td>Salman</td>

                      <td>
                        <div className="innerFlex d-flex">
                          <Link to="/DirectOrderVehicleDetails" onClick={() => setShow(true)}>
                            <div className="inconsIn me-3">
                              <img src={View} alt="" />
                            </div>
                          </Link>

                          <Link to="#" onClick={() => setShow2(true)}>
                            <div className="inconsIn me-3">
                              <img src={Delete} alt="" />
                            </div>
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                    <td><Form.Check type="checkbox" className="m-p-check-list" /></td>
                      <td>1</td>
                      <td>RF-1234567890-1111</td>
                      <td>xyz</td>
                      <td>3456-Truck</td>
                      <td>3456-Truck</td>
                      <td>Salman</td>

                      <td>
                        <div className="innerFlex d-flex">
                          <Link to="/DirectOrderVehicleDetails" onClick={() => setShow(true)}>
                            <div className="inconsIn me-3">
                              <img src={View} alt="" />
                            </div>
                          </Link>

                          <Link to="#" onClick={() => setShow2(true)}>
                            <div className="inconsIn me-3">
                              <img src={Delete} alt="" />
                            </div>
                          </Link>
                        </div>
                      </td>
                    </tr><tr>
                      <td><Form.Check type="checkbox" className="m-p-check-list" /></td>
                      <td> 1</td>
                      <td>RF-1234567890-1111</td>
                      <td>xyz</td>
                      <td>3456-Truck</td>
                      <td>3456-Truck</td>
                      <td>Salman</td>

                      <td>
                        <div className="innerFlex d-flex">
                          <Link to="/DirectOrderVehicleDetails" onClick={() => setShow(true)}>
                            <div className="inconsIn me-3">
                              <img src={View} alt="" />
                            </div>
                          </Link>

                          <Link to="#" onClick={() => setShow2(true)}>
                            <div className="inconsIn me-3">
                              <img src={Delete} alt="" />
                            </div>
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                    <td><Form.Check type="checkbox" className="m-p-check-list" /></td>
                      <td>1</td>
                      <td>RF-1234567890-1111</td>
                      <td>xyz</td>
                      <td>3456-Truck</td>
                      <td>3456-Truck</td>
                      <td>Salman</td>

                      <td>
                        <div className="innerFlex d-flex">
                          <Link to="/DirectOrderVehicleDetails" onClick={() => setShow(true)}>
                            <div className="inconsIn me-3">
                              <img src={View} alt="" />
                            </div>
                          </Link>

                          <Link to="#" onClick={() => setShow2(true)}>
                            <div className="inconsIn me-3">
                              <img src={Delete} alt="" />
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
        </div>
      </div>
    </motion.div>
  );
};

export default DirectOrderOfferLoad;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import option from "../../assets/images/option-three-dot.svg";
import webLogo from "../../assets/images/Web-Application-Logo.svg";
import GreenCar from "../../assets/images/Green-car-logo.svg";
import BlueCar from "../../assets/images/Blue-car-logo.svg";
import RedCar from "../../assets/images/red-car-logo.svg";
import YellowCar from "../../assets/images/yellow-car-logo.svg";
import BlackCar from "../../assets/images/black-car-logo.svg";
import flgLogo from "../../assets/images/flagLine.svg";
import flgLogoFill from "../../assets/images/flagFill.svg";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { simpleDeleteCall, simpleGetCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import Loader from "../../sharedComponent/Loader";
import { useTranslation } from "react-i18next";
const LogoUpdate = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)
  const { t, i18n } = useTranslation();

  const handleClose = () => setShow(false);
  const [currentKey, setCurrentKey] = useState("")
  const handleShow = () => setShow(true);
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const [logosData, setLogosData] = useState({})
  useEffect(() => {
    getAlllogos()
  }, [])


  const getAlllogos = () => {
    setLoading(true)
    simpleGetCall(ApiConfig.GET_ALL_LOGO).
      then(res => {
        if (res.result) {
          setLogosData(res.data)
        }
      }).catch(err => {
        notifyError(err)
      }).finally(() => {
        setLoading(false)
      })
  }
  const deleteLogo = () => {
    let body = JSON.stringify({ field_name: currentKey })
    setLoading(true)
    simpleDeleteCall(ApiConfig.DELETE_LOGO, body)
      .then(res => {
        if (res.result) {
          getAlllogos()
          notifySuccess(res.message)
        }
      }).catch(err => {
        notifyError(err)
      }).finally(() => {
        setLoading(false)
      })
  }
  return (
    <motion.div
      className={sidebar ? "taskMain " : "cx-active taskMain"}
      id="cx-main"
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}
    >
      <div id="cx-wrapper" className="Logo_Update">
        {
          loading ? <Loader />
            :
            <>
              {/* <div className="topUpdateBtn">
                <button className="cx-btn-3 form_input_main textend"><Link to="/UpdateCustomerLogo">{t("Upload")}</Link></button>
              </div> */}
              <div className="main-dashboard-wrapper CustomerProfile">
                <div className="row update-logo-main">
                  <div className="col-lg-4 col-md-6 col-sm-12  update-logo-card">
                    <div className="update-logo-head">
                      <p>{t("Web Application Logo")}</p>
                      <div className="customer-option backNone">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                            <img src={option} alt="" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item> <Link to="/UpdateCustomerLogo/logo_logo"> {t("Change Logo")} </Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => { setCurrentKey("logo_logo"); handleShow() }}>
                              <Link to="#">{t("Delete Logo")}</Link>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="update-logo-img">
                    {logosData.logo_logo == null || logosData.logo_logo == "" ? 
                    <img src={webLogo} alt="" /> 
                    :<img src={`${ApiConfig.BASE_URL_FOR_IMAGES_L + logosData.logo_logo}` || webLogo} alt="" />}
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12  update-logo-card">
                    <div className="update-logo-head">
                      <p>{t("Customer location in Google map")}</p>
                      <div className="customer-option backNone">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                            <img src={option} alt="" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item> <Link to="/UpdateCustomerLogo/logo_map_logo"> {t("Change Logo")} </Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => { setCurrentKey("logo_map_logo"); handleShow() }}>
                              <Link to="#">{t("Delete Logo")}</Link>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="update-logo-img">
                      <img src={`${ApiConfig.BASE_URL_FOR_IMAGES_L}${logosData?.logo_map_logo}` || GreenCar} alt="" />
                    </div>
                  </div>
                  {/*<div className="col-lg-4 col-md-6 col-sm-12  update-logo-card">
                    <div className="update-logo-head">
                      <p>{t("Bus location in Google map")}</p>
                      <div className="customer-option backNone">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                            <img src={option} alt="" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item> <Link to="/UpdateCustomerLogo/logo_map_bus"> {t("Change Logo")} </Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => { setCurrentKey("logo_map_bus"); handleShow() }}>
                              <Link to="#">{t("Delete Logo")}</Link>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="update-logo-img">
                      <img src={`${ApiConfig.BASE_URL_FOR_IMAGES_L}${logosData.logo_map_bus}` || BlueCar} alt="" />
                    </div>
                  </div> */}
                  {/*<div className="col-lg-4 col-md-6 col-sm-12  update-logo-card">
                    <div className="update-logo-head">
                      <p>{t("Parked Bus location In Google Map")}</p>
                      <div className="customer-option backNone">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                            <img src={option} alt="" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item> <Link to="/UpdateCustomerLogo/logo_map_bus_available"> {t("Change Logo")} </Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => { setCurrentKey("logo_map_bus_available"); handleShow() }}>
                              <Link to="#">{t("Delete Logo")}</Link>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="update-logo-img">
                      <img
                        src={`${ApiConfig.BASE_URL_FOR_IMAGES_L}${logosData.logo_map_bus_available}` || RedCar}
                        alt=""
                      />
                    </div>
                  </div> */}
                  {/*<div className="col-lg-4 col-md-6 col-sm-12  update-logo-card">
                    <div className="update-logo-head">
                      <p>{t("Untracked Bus location in Google map")}</p>
                      <div className="customer-option backNone">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                            <img src={option} alt="" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item> <Link to="/UpdateCustomerLogo/logo_map_bus_untracked"> {t("Change Logo")} </Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => { setCurrentKey("logo_map_bus_untracked"); handleShow() }}>
                              <Link to="#">{t("Delete Logo")}</Link>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="update-logo-img">
                      <img
                        src={`${ApiConfig.BASE_URL_FOR_IMAGES_L}${logosData.logo_map_bus_untracked}` || YellowCar}
                        alt=""
                      />
                    </div>
                  </div>*/}
                  {/* <div className="col-lg-4 col-md-6 col-sm-12  update-logo-card">
                    <div className="update-logo-head">
                      <p>{t("Idle Bus location in Google map")}</p>
                      <div className="customer-option backNone">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                            <img src={option} alt="" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item> <Link to="/UpdateCustomerLogo/logo_bus_idle"> {t("Change Logo")} </Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => { setCurrentKey("logo_bus_idle"); handleShow() }}>
                              <Link to="#">{t("Delete Logo")}</Link>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="update-logo-img">
                      <img src={`${ApiConfig.BASE_URL_FOR_IMAGES_L}${logosData.logo_bus_idle}` || BlackCar} alt="" />
                    </div>
                  </div>*/}
                  <div className="col-lg-4 col-md-6 col-sm-12  update-logo-card">
                    <div className="update-logo-head">
                      <p>{t("Logo For Email Template")}</p>
                      <div className="customer-option backNone">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                            <img src={option} alt="" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item> <Link to="/UpdateCustomerLogo/logo_email"> {t("Change Logo")} </Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => { setCurrentKey("logo_email"); handleShow() }}>
                              <Link to="#">{t("Delete Logo")}</Link>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="update-logo-img">
                      <img src={`${ApiConfig.BASE_URL_FOR_IMAGES_L}${logosData.logo_email}` || webLogo} alt="" />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12  update-logo-card">
                    <div className="update-logo-head">
                      <p>{t("Logo For Email Banner")}</p>
                      <div className="customer-option backNone">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                            <img src={option} alt="" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item  > <Link to="/UpdateCustomerLogo/logo_email_banner">{t("Change Logo")} </Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => { setCurrentKey("logo_email_banner"); handleShow() }}>
                              <Link to="#">{t("Delete Logo")}</Link>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="update-logo-img">
                      <img src={`${ApiConfig.BASE_URL_FOR_IMAGES_L}${logosData.logo_email_banner}` || webLogo} alt="" />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12  update-logo-card">
                    <div className="update-logo-head">
                      <p>{t("Logo Trip Start Point")}</p>
                      <div className="customer-option backNone">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                            <img src={option} alt="" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item> <Link to="/UpdateCustomerLogo/logo_trip_start_point"> {t("Change Logo")} </Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => { setCurrentKey("logo_trip_start_point"); handleShow() }}>
                              <Link to="#">{t("Delete Logo")}</Link>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="update-logo-img">
                    {logosData.logo_trip_start_point == null || logosData.logo_trip_start_point == "" ? 
                    <img src={flgLogo} alt="" /> 
                    : <img src={`${ApiConfig.BASE_URL_FOR_IMAGES_L + logosData.logo_trip_start_point}` || flgLogo} alt="" />}
                    
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12  update-logo-card">
                    <div className="update-logo-head">
                      <p>{t("Logo Trip End Point")}</p>
                      <div className="customer-option backNone">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                            <img src={option} alt="" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item> <Link to="/UpdateCustomerLogo/logo_trip_end_point"> {t("Change Logo")} </Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => { setCurrentKey("logo_trip_end_point"); handleShow() }}>
                              <Link to="#">{t("Delete Logo")}</Link>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="update-logo-img">
                    {logosData.logo_trip_end_point == null || logosData.logo_trip_end_point == "" ? 
                    <img src={flgLogoFill} alt="" /> :  <img src={`${ApiConfig.BASE_URL_FOR_IMAGES_L +logosData.logo_trip_end_point}` || flgLogoFill} alt="" />}
                     
                    </div>
                  </div>
                </div>
              </div>
            </>
        }

        <div>
          <Modal
            show={show}
            onHide={handleClose}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Delete Customer Logo")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {t("Are you sure you want to delete this Customer Logo")} ?
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer btn-wrapper">
              <button className="cx-btn-1" onClick={handleClose}>
                {t("Close")}
              </button>
              <button className="cx-btn-2" onClick={() => { deleteLogo(); handleClose() }}>
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </motion.div>
  );
};

export default LogoUpdate;

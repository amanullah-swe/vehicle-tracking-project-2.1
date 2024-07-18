import React, { useContext, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Col, Dropdown, Modal, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import "@splidejs/react-splide/css";
import bean_license from "../../../assets/images/bean-license.png";
import { motion } from "framer-motion";
import ic_doc_vehicle from "../../../assets/images/ic_doc_vehicle.svg";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AuctionReferenceDetails = () => {
    const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const { t, i18n } = useTranslation();
    const aninations = {
        initial: { opacity: 0, x: 400 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
    };
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
                        <div className="headingDetails" id="head-refs">
                            <div className="headingTxt">
                                <p className="heading">{t("Reference Details")}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="main-master-wrapper form_input_main"
                        id="View_Dispatch_main"
                    >
                        <div className="headingDetails">
                            <div className="headingTxt">
                                <p className="heading">{t("From")}</p>
                            </div>
                        </div>
                        <div className="DetailsSec">
                            <div className="row">
                                <div className="col-md-3">
                                    <label className="head">{t("Estimated Start Date")}</label>
                                    <p className="Value">2023-07-09</p>
                                </div>
                                <div className="col-md-3">
                                    <label className="head">{t("Country")}</label>
                                    <p className="Value">India</p>
                                </div>
                                <div className="col-md-3">
                                    <label className="head">{t("City")}</label>
                                    <p className="Value">Maharashtra Division</p>
                                </div>
                                <div className="col-md-3">
                                    <label className="head">{t("Address")}</label>
                                    <p className="Value">
                                        125/2, Sainiketan Colony, kalas Road, Vishrantwadi, Pune,
                                        Maharashtra 411015
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="main-master-wrapper form_input_main"
                        id="View_Dispatch_main"
                    >
                        <div className="headingDetails">
                            <div className="headingTxt">
                                <p className="heading">{t("To")}</p>
                            </div>
                        </div>
                        <div className="DetailsSec">
                            <div className="row">
                                <div className="col-md-3">
                                    <label className="head">{t("Estimated Start Date")}</label>
                                    <p className="Value">2023-07-09</p>
                                </div>
                                <div className="col-md-3">
                                    <label className="head">{t("Country")}</label>
                                    <p className="Value">India</p>
                                </div>
                                <div className="col-md-3">
                                    <label className="head">{t("City")}</label>
                                    <p className="Value">Maharashtra Division</p>
                                </div>
                                <div className="col-md-3">
                                    <label className="head">{t("Address")}</label>
                                    <p className="Value">
                                        125/2, Sainiketan Colony, kalas Road, Vishrantwadi, Pune,
                                        Maharashtra 411015
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="main-master-wrapper form_input_main"
                        id="View_Dispatch_main"
                    >
                        <div className="headingDetails">
                            <div className="headingTxt">
                                <p className="heading">{t("Goods Details")}</p>
                            </div>
                        </div>
                        <div className="DetailsSec">
                            <div className="row">
                                <div className="col-md-3 mb
                3">
                                    <label className="head">{t("Packing List")}</label>
                                    <div className="doc-img-ref" onClick={() => setShow(true)}>
                                        <img src={ic_doc_vehicle} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3 ">
                                    <label className="head">
                                        {t("Insurance, Comprehensive & Cargo")}
                                    </label>
                                    <div className="doc-img-ref" onClick={() => setShow2(true)}>
                                        <img src={ic_doc_vehicle} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label className="head">{t("Company Name")}</label>
                                    <p className="Value">Shipper@demo.com</p>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label className="head">{t("Cargo Type")}</label>
                                    <p className="Value">Break Bulk</p>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label className="head">{t("Quantity")}</label>
                                    <p className="Value">100 Quintal</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===================================== Packing List ========================== */}

                    <Modal
                        show={show}
                        onHide={handleClose}
                        centered
                        size="lg"
                        className="common-model"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{t("Packing List")}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <img src={bean_license} alt="" />
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="pop-up-modal-footer btn-wrapper">

                            <button className="cx-btn-2" >
                                {t("Cancel")}
                            </button>
                        </Modal.Footer>
                    </Modal>

                    {/* ===================================== Insurance, Comprehensive & Cargo ========================== */}

                    <Modal
                        show={show2}
                        onHide={handleClose2}
                        centered
                        size="lg"
                        className="common-model"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{t("Insurance, Comprehensive & Cargo")}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <img src={bean_license} alt="" />
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="pop-up-modal-footer btn-wrapper">

                            <button className="cx-btn-2" >
                                {t("Close")}
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </motion.div>
    )
}

export default AuctionReferenceDetails;

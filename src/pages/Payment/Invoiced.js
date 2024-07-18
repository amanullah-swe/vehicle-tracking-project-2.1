// Usama 09-02-2023

import React, { useContext, useState } from "react";
import { Dropdown, Modal, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import DDlogo from "../../assets/images/DDlogo.png";
import Import from "../../assets/images/ic-Import.svg";
import option from "../../assets/images/option-three-dot.svg";
import invoice_icon from "../../assets/images/invoice_icon.svg";
import invoice_icon_big from "../../assets/images/invoice_icon_big.svg";
import Export from "../../assets/images/ic-Export.svg";
import untracked_icon from "../../assets/images/untracked_icon.svg";
import { Link } from "react-router-dom";
import Calendar from "../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import Pagenation from "../../sharedComponent/Pagenation";
import { useTranslation } from "react-i18next";
const Invoiced = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const { t, i18n } = useTranslation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
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
      <div id="cx-wrapper">
        <div className="Vehcle-main-tabs">
          <div className="main-master-wrapper mb-0">
            <div className="all-vehicle-main">
              <div id="scroll_insideThe_Padding_Without_invoice">
                <div className="all-vehical-head row vehicle-top-inputs">
                  <div className="input-section-wrapper">
                    <div className="row">
                      <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Invoice Number"
                        />
                      </div>
                      <div className="col-md-3">
                        <div className="innerSelectBox weekCounter datepicker-main">
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="form-control"
                          />
                          <img src={Calendar} className="calendarLogo" alt="" />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Invoice Amount"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="right-export-btn-section-wrapper">
                    <div className="c-pointer me-2">
                      <img src={Export} alt="" />
                    </div>
                    <div className="c-pointer">
                      <img src={Import} alt="" />
                    </div>
                  </div>
                </div>
                <div className="yauto custom-invoiced-height">
                  <div className="row gx-3 main-cards-wrapper">
                    <div
                      className={
                        sidebar ? "col-lg-4 col-md-6" : "col-lg-3 col-md-6"
                      }
                    >
                      <div
                        className={"common-vehical-card-inner cv-card "}
                      >
                        <Link to="/InvoiceDetails">
                          <div className="vehical-card-head vc-top">
                            <div className="heading top-avatar-wrapper">
                              <img src={invoice_icon} alt="" />
                              <div className="">
                                <p className="sub-heading">{t("Invoice Number")}</p>
                                <p className="title">2023</p>
                              </div>
                            </div>
                          </div>
                          <div className="vehical-card-body vc-body row g-0">
                            <div className="col-lg-7">
                              <div className="row">
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Date")}</p>
                                  <p className="title">20-01-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Due Date")}</p>
                                  <p className="title">02-02-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Amount")}</p>
                                  <p className="title">$5000</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="right-invoice-icon">
                                <img src={invoice_icon_big} alt="" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div
                      className={
                        sidebar ? "col-lg-4 col-md-6" : "col-lg-3 col-md-6"
                      }
                    >
                      <div
                        className={"common-vehical-card-inner cv-card "}
                      >
                        <Link to="/InvoiceDetails">
                          <div className="vehical-card-head vc-top">
                            <div className="heading top-avatar-wrapper">
                              <img src={invoice_icon} alt="" />
                              <div className="">
                                <p className="sub-heading">{t("Invoice Number")}</p>
                                <p className="title">2023</p>
                              </div>
                            </div>
                          </div>
                          <div className="vehical-card-body vc-body row g-0">
                            <div className="col-lg-7">
                              <div className="row">
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Date")}</p>
                                  <p className="title">20-01-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Due Date")}</p>
                                  <p className="title">02-02-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Amount")}</p>
                                  <p className="title">$5000</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="right-invoice-icon">
                                <img src={invoice_icon_big} alt="" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div><div
                      className={
                        sidebar ? "col-lg-4 col-md-6" : "col-lg-3 col-md-6"
                      }
                    >
                      <div
                        className={"common-vehical-card-inner cv-card "}
                      >
                        <Link to="/InvoiceDetails">
                          <div className="vehical-card-head vc-top">
                            <div className="heading top-avatar-wrapper">
                              <img src={invoice_icon} alt="" />
                              <div className="">
                                <p className="sub-heading">{t("Invoice Number")}</p>
                                <p className="title">2023</p>
                              </div>
                            </div>
                          </div>
                          <div className="vehical-card-body vc-body row g-0">
                            <div className="col-lg-7">
                              <div className="row">
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Date")}</p>
                                  <p className="title">20-01-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Due Date")}</p>
                                  <p className="title">02-02-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Amount")}</p>
                                  <p className="title">$5000</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="right-invoice-icon">
                                <img src={invoice_icon_big} alt="" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div><div
                      className={
                        sidebar ? "col-lg-4 col-md-6" : "col-lg-3 col-md-6"
                      }
                    >
                      <div
                        className={"common-vehical-card-inner cv-card "}
                      >
                        <Link to="/InvoiceDetails">
                          <div className="vehical-card-head vc-top">
                            <div className="heading top-avatar-wrapper">
                              <img src={invoice_icon} alt="" />
                              <div className="">
                                <p className="sub-heading">{t("Invoice Number")}</p>
                                <p className="title">2023</p>
                              </div>
                            </div>
                          </div>
                          <div className="vehical-card-body vc-body row g-0">
                            <div className="col-lg-7">
                              <div className="row">
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Date")}</p>
                                  <p className="title">20-01-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Due Date")}</p>
                                  <p className="title">02-02-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Amount")}</p>
                                  <p className="title">$5000</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="right-invoice-icon">
                                <img src={invoice_icon_big} alt="" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div><div
                      className={
                        sidebar ? "col-lg-4 col-md-6" : "col-lg-3 col-md-6"
                      }
                    >
                      <div
                        className={"common-vehical-card-inner cv-card "}
                      >
                        <Link to="/InvoiceDetails">
                          <div className="vehical-card-head vc-top">
                            <div className="heading top-avatar-wrapper">
                              <img src={invoice_icon} alt="" />
                              <div className="">
                                <p className="sub-heading">{t("Invoice Number")}</p>
                                <p className="title">2023</p>
                              </div>
                            </div>
                          </div>
                          <div className="vehical-card-body vc-body row g-0">
                            <div className="col-lg-7">
                              <div className="row">
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Date")}</p>
                                  <p className="title">20-01-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Due Date")}</p>
                                  <p className="title">02-02-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Amount")}</p>
                                  <p className="title">$5000</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="right-invoice-icon">
                                <img src={invoice_icon_big} alt="" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div><div
                      className={
                        sidebar ? "col-lg-4 col-md-6" : "col-lg-3 col-md-6"
                      }
                    >
                      <div
                        className={"common-vehical-card-inner cv-card "}
                      >
                        <Link to="/InvoiceDetails">
                          <div className="vehical-card-head vc-top">
                            <div className="heading top-avatar-wrapper">
                              <img src={invoice_icon} alt="" />
                              <div className="">
                                <p className="sub-heading">{t("Invoice Number")}</p>
                                <p className="title">2023</p>
                              </div>
                            </div>
                          </div>
                          <div className="vehical-card-body vc-body row g-0">
                            <div className="col-lg-7">
                              <div className="row">
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Date")}</p>
                                  <p className="title">20-01-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Due Date")}</p>
                                  <p className="title">02-02-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Amount")}</p>
                                  <p className="title">$5000</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="right-invoice-icon">
                                <img src={invoice_icon_big} alt="" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div><div
                      className={
                        sidebar ? "col-lg-4 col-md-6" : "col-lg-3 col-md-6"
                      }
                    >
                      <div
                        className={"common-vehical-card-inner cv-card "}
                      >
                        <Link to="/InvoiceDetails">
                          <div className="vehical-card-head vc-top">
                            <div className="heading top-avatar-wrapper">
                              <img src={invoice_icon} alt="" />
                              <div className="">
                                <p className="sub-heading">{t("Invoice Number")}</p>
                                <p className="title">2023</p>
                              </div>
                            </div>
                          </div>
                          <div className="vehical-card-body vc-body row g-0">
                            <div className="col-lg-7">
                              <div className="row">
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Date")}</p>
                                  <p className="title">20-01-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Due Date")}</p>
                                  <p className="title">02-02-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Amount")}</p>
                                  <p className="title">$5000</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="right-invoice-icon">
                                <img src={invoice_icon_big} alt="" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div><div
                      className={
                        sidebar ? "col-lg-4 col-md-6" : "col-lg-3 col-md-6"
                      }
                    >
                      <div
                        className={"common-vehical-card-inner cv-card "}
                      >
                        <Link to="/InvoiceDetails">
                          <div className="vehical-card-head vc-top">
                            <div className="heading top-avatar-wrapper">
                              <img src={invoice_icon} alt="" />
                              <div className="">
                                <p className="sub-heading">{t("Invoice Number")}</p>
                                <p className="title">2023</p>
                              </div>
                            </div>
                          </div>
                          <div className="vehical-card-body vc-body row g-0">
                            <div className="col-lg-7">
                              <div className="row">
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Date")}</p>
                                  <p className="title">20-01-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Due Date")}</p>
                                  <p className="title">02-02-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Amount")}</p>
                                  <p className="title">$5000</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="right-invoice-icon">
                                <img src={invoice_icon_big} alt="" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div><div
                      className={
                        sidebar ? "col-lg-4 col-md-6" : "col-lg-3 col-md-6"
                      }
                    >
                      <div
                        className={"common-vehical-card-inner cv-card "}
                      >
                        <Link to="/InvoiceDetails">
                          <div className="vehical-card-head vc-top">
                            <div className="heading top-avatar-wrapper">
                              <img src={invoice_icon} alt="" />
                              <div className="">
                                <p className="sub-heading">{t("Invoice Number")}</p>
                                <p className="title">2023</p>
                              </div>
                            </div>
                          </div>
                          <div className="vehical-card-body vc-body row g-0">
                            <div className="col-lg-7">
                              <div className="row">
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Date")}</p>
                                  <p className="title">20-01-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Due Date")}</p>
                                  <p className="title">02-02-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Amount")}</p>
                                  <p className="title">$5000</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="right-invoice-icon">
                                <img src={invoice_icon_big} alt="" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div><div
                      className={
                        sidebar ? "col-lg-4 col-md-6" : "col-lg-3 col-md-6"
                      }
                    >
                      <div
                        className={"common-vehical-card-inner cv-card "}
                      >
                        <Link to="/InvoiceDetails">
                          <div className="vehical-card-head vc-top">
                            <div className="heading top-avatar-wrapper">
                              <img src={invoice_icon} alt="" />
                              <div className="">
                                <p className="sub-heading">{t("Invoice Number")}</p>
                                <p className="title">2023</p>
                              </div>
                            </div>
                          </div>
                          <div className="vehical-card-body vc-body row g-0">
                            <div className="col-lg-7">
                              <div className="row">
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Date")}</p>
                                  <p className="title">20-01-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Due Date")}</p>
                                  <p className="title">02-02-2023</p>
                                </div>
                                <div className="card-contain col-lg-12">
                                  <p className="sub-heading">{t("Invoice Amount")}</p>
                                  <p className="title">$5000</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="right-invoice-icon">
                                <img src={invoice_icon_big} alt="" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Pagenation />
            </div>
          </div>

          {/* Delete Modal Start */}
          <Modal
            show={show}
            onHide={handleClose}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Delete Assistant")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {t("Are you sure you want to Delete this Assistant")} ?
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer">
              <div class="btn-wrapper">
                <button className="cx-btn-1" onClick={handleClose}>
                  {t("Cancel")}
                </button>
                <button className="cx-btn-2" onClick={handleClose}>
                  {t("Yes")}
                </button>
              </div>
            </Modal.Footer>
          </Modal>
          {/* Delete Modal End */}

          {/* Block Modal Start */}
          <Modal
            show={show1}
            onHide={handleClose1}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Block")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{t("Are you sure you want to Block")} ?</Modal.Body>
            <Modal.Footer className="pop-up-modal-footer">
              <div class="btn-wrapper">
                <button className="cx-btn-1" onClick={handleClose1}>
                  {t("Cancel")}
                </button>
                <button className="cx-btn-2" onClick={handleClose1}>
                  {t("Yes")}
                </button>
              </div>
            </Modal.Footer>
          </Modal>
          {/* Block Modal End */}

          {/* Resign/retire Modal Start */}
          <Modal
            show={show2}
            onHide={handleClose2}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Resign / Retire")} </Modal.Title>
            </Modal.Header>
            <Modal.Body>{t("Are you sure you want to Resign / Retire")} ?</Modal.Body>
            <Modal.Footer className="pop-up-modal-footer">
              <div class="btn-wrapper">
                <button className="cx-btn-1" onClick={handleClose2}>
                  {t("Cancel")}
                </button>
                <button className="cx-btn-2" onClick={handleClose2}>
                  {t("Yes")}
                </button>
              </div>
            </Modal.Footer>
          </Modal>
          {/* Resign/retire Modal End */}
        </div>
      </div>
    </motion.div>
  );
};

export default Invoiced;

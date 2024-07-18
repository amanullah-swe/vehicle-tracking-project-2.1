// Usama 09-02-2023

import React, { useContext, useState } from "react";
import { Col, Dropdown, Modal, Nav, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import DDlogo from "../../assets/images/DDlogo.png";
import Import from "../../assets/images/ic-Import.svg";
import option from "../../assets/images/option-three-dot.svg";
import invoice_icon from "../../assets/images/invoice_icon.svg";
import Export from "../../assets/images/ic-Export.svg";
import untracked_icon from "../../assets/images/untracked_icon.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Pagenation from "../../sharedComponent/Pagenation";
import { useTranslation } from "react-i18next";
const Paid = () => {
  // Filter Dropdown
  const [filter, setfilter] = useState(false);
  const handlefilter = () => setfilter(!filter);
  const { t, i18n } = useTranslation();

  const [show, setShow] = useState(false);

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
        <div className="Vehcle-main-tabs tm-main-tabs">
          <div className="main-master-wrapper mb-0 inner-tabs-section tabs-custom-width-33 ">
            <div id="scroll_insideThe_Padding_Without_invoice">
              <Tab.Container
                id="left-tabs-example"
                className="td-tab-wrapper"
                defaultActiveKey="0"
              >
                <Nav variant="pills" className="td-nav" id="InnerTabNew_Three">
                  <Nav.Item className="td-tab">
                    <Nav.Link className="td-link" eventKey="0">
                      {t("Paid")}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="td-tab">
                    <Nav.Link className="td-link" eventKey="1">
                      {t("Pending")}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="td-tab">
                    <Nav.Link className="td-link" eventKey="2">
                      {t("Failed Transaction")}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Col sm={12} className="">
                  <Tab.Content>
                    <Tab.Pane eventKey="0">
                      <div className="all-vehicle-main">
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
                              <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                <select
                                  required
                                  className="form-select"
                                  aria-label="Default select example"
                                  placeholder="Payment Type"
                                >
                                  <option value="">Payment Type</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </div>
                              <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                <select
                                  required
                                  className="form-select"
                                  aria-label="Default select example"
                                  placeholder="Payment Mode"
                                >
                                  <option value="">Payment Mode</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </div>
                              <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                <select
                                  required
                                  className="form-select"
                                  aria-label="Default select example"
                                  placeholder="+More Filters (1)"
                                >
                                  <option value="">+More Filters (1)</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
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
                        <div className="yauto">
                          <div className="row gx-3 main-cards-wrapper">
                            <div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="1">
                      <div className="all-vehicle-main">
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
                              <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                <select
                                  required
                                  className="form-select"
                                  aria-label="Default select example"
                                  placeholder="Payment Type"
                                >
                                  <option value="">Payment Type</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </div>
                              <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                <select
                                  required
                                  className="form-select"
                                  aria-label="Default select example"
                                  placeholder="Payment Mode"
                                >
                                  <option value="">Payment Mode</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </div>
                              <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                <select
                                  required
                                  className="form-select"
                                  aria-label="Default select example"
                                  placeholder="+More Filters (1)"
                                >
                                  <option value="">+More Filters (1)</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
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
                        <div className="yauto">
                          <div className="row gx-3 main-cards-wrapper">
                          <div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="2">
                      <div className="all-vehicle-main">
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
                              <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                <select
                                  required
                                  className="form-select"
                                  aria-label="Default select example"
                                  placeholder="Payment Type"
                                >
                                  <option value="">Payment Type</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </div>
                              <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                <select
                                  required
                                  className="form-select"
                                  aria-label="Default select example"
                                  placeholder="Payment Mode"
                                >
                                  <option value="">Payment Mode</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </div>
                              <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                <select
                                  required
                                  className="form-select"
                                  aria-label="Default select example"
                                  placeholder="+More Filters (1)"
                                >
                                  <option value="">+More Filters (1)</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
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
                        <div className="yauto">
                          <div className="row gx-3 main-cards-wrapper">
                          <div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div><div
                              className={
                                sidebar
                                  ? "col-lg-4 col-md-6"
                                  : "col-lg-3 col-md-6"
                              }
                            >
                              <div
                                className={"common-vehical-card-inner cv-card "}
                              >
                                <div className="vehical-card-head vc-top">
                                  <div className="heading top-avatar-wrapper">
                                    <img
                                      src={invoice_icon}
                                      alt=""
                                      className="custom-Margin"
                                    />
                                    <div className="">
                                      <p className="sub-heading">
                                        {t("Invoice Number")}
                                      </p>
                                      <p className="title">2023</p>
                                    </div>
                                  </div>
                                  <div className="option customer-option">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentReceipt">
                                            {t("Receipt")}
                                          </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Link to="/PaidPaymentInvoice">
                                            {t("Invoice")}
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="vehical-card-body vc-body row g-0">
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Type")}</p>
                                    <p className="title">Services</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Mode")}</p>
                                    <p className="title">Cash / Online</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">
                                      {t("Payment Identification Number")}
                                    </p>
                                    <p className="title">668</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Amount")}</p>
                                    <p className="title">$1200</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Payment Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                  <div className="card-contain col-lg-6">
                                    <p className="sub-heading">{t("Invoice Date")}</p>
                                    <p className="title">20-01-2023</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Tab.Container>
            </div>
            <Pagenation />
          </div>

          {/* Delete Modal Start */}
          <Modal
            show={show}
            onHide={handleClose}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Delivery Person{t("")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to Delete this Delivery Person{t("")} ?
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

export default Paid;

// Usama 09-02-2023

import React, { useContext, useEffect, useState } from "react";
import { Col, Dropdown, Modal, Nav, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import DDlogo from "../../../assets/images/DDlogo.png";
import Import from "../../../assets/images/ic-Import.svg";
import option from "../../../assets/images/option-three-dot.svg";
import Grouplogo from "../../../assets/images/Customer-profile.png";
import Export from "../../../assets/images/ic-Export.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { simplePostCall } from "../../../api/ApiServices";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import ApiConfig from "../../../api/ApiConfig";
import Pagenation from "../../../sharedComponent/Pagenation";
import Loader from "../../../sharedComponent/Loader";
import ImportUser from "../../../assets/images/imagesuser.png";
import NoDataComp from "../../../sharedComponent/NoDataComp";
import NoMoreDataComp from "../../../sharedComponent/NoMoreDataComp";
import { useTranslation } from "react-i18next";
import { jsPDF } from "jspdf";
import FileSaver from "file-saver";
import { useSelector } from "react-redux";

const FleetManager = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;
  const addonSettingData = useSelector((state) => state.auth.addonModule);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const [ExportStatus, setExportStatus] = useState("active");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const {
    sidebar,
    setSidebar,
    Dark,
    setTransportId,
    recordsPerPage,
    useDebounce,
  } = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const [show1, setShow1] = useState(false);
  const [fleetAllList, setFleetAllList] = useState([]);
  const [FleetActive, setFleetActive] = useState([]);
  const [Fleetinactive, setFleetinactive] = useState([]);
  const [BlockId, setBlockId] = useState("");
  const [ResignedId, setResigned] = useState("");
  const [DeleteId, setDeleteId] = useState("");
  const [FleeName, setFleetName] = useState("");
  const [FleeEmail, setFleetEmail] = useState("");
  const [FleeContact, seFleetContact] = useState("");
  const [page, setPage] = useState(1);
  const [last_page, setlast_page] = useState(false);
  const [currentTab, setCurrentTab] = useState("0");
  const [totalPages, setTotalPages] = useState(0);
  const [totalActive, setTotalActive] = useState(0);
  const [totalInActive, setTotalInActive] = useState(0);
  const [showBlock, setShowBlock] = useState(false);
  const [showesign, setShowresign] = useState(false);
  const handleCloseBlock = () => setShowBlock(false);
  const handleShowBlock = () => setShowBlock(true);
  const handleCloseResign = () => setShowresign(false);
  const handleShowResign = () => setShowresign(true);
  // useEffect(() => {

  //   geinactive(page);
  //   geActive(page);
  // }, [FleeName, FleeEmail, FleeContact]);
  const debouncedSearchDriver = useDebounce(FleeName, 500);
  const debouncedSearchDriversEmail = useDebounce(FleeEmail, 500);
  const debouncedSearchDriversContact = useDebounce(FleeContact, 500);
  const [actionApiCall, setActionApiCall] = useState("");
  useEffect(() => {
    if (currentTab == 0) {
      geActive(1);
    }
    if (currentTab == 1) {
      geinactive(1);
    }
    setPage(1);
    // geATranspoertAllList(page);
  }, [
    debouncedSearchDriver,
    debouncedSearchDriversEmail,
    debouncedSearchDriversContact,
  ]);

  useEffect(() => {
    geActive(1);
    geinactive(1);
  }, [actionApiCall]);
  const handleSelect = () => {
    setPage(0);
    geAllList(1);
    setFleetName("");
    setFleetEmail("");
    seFleetContact("");
    setExportStatus("");
  };
  const handleSelectActive = () => {
    setPage(1);
    geActive(1);
    setFleetName("");
    setFleetEmail("");
    seFleetContact("");
    setExportStatus("active");
  };
  const handleSelectInActive = () => {
    geinactive(1);
    setPage(1);
    setFleetName("");
    setFleetEmail("");
    seFleetContact("");
  };

  function geAllList(currentPage) {
    page == 1 && !currentPage && setLoading(true);

    let newRequestBody = JSON.stringify({
      user_status: "",
      user_name: FleeName,
      user_email: FleeEmail,
      user_mobile: FleeContact,
      page: currentPage,
      page_limit: recordsPerPage,
    });
    simplePostCall(ApiConfig.FLEET_MANAGER_LIST, newRequestBody)
      .then((data) => {
        if (data.result) {
          setTotalPages(data.total);

          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];
          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,

              user_name: eachteam.user_name || "",
              user_profile_pic: eachteam.user_profile_pic || "",
            };
          });
          if (currentPage === 1 || currentPage === 0) {
            setFleetAllList(data.data);
          } else {
            setFleetAllList([...fleetAllList, ...TransportData]);
          }
        } else {
          setFleetAllList(0);
          setlast_page(false);
          setTotalPages(0);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function geActive(currentPage) {
    page == 1 && !currentPage && setLoading(true);

    let newRequestBody = JSON.stringify({
      user_status: "active",
      user_name: FleeName,
      user_email: FleeEmail,
      user_mobile: FleeContact,
      page: currentPage,
      page_limit: recordsPerPage,
    });
    simplePostCall(ApiConfig.FLEET_MANAGER_LIST, newRequestBody)
      .then((data) => {
        if (data.result) {
          setTotalActive(data.total);

          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];
          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,

              user_name: eachteam.user_name || "",
              user_profile_pic: eachteam.user_profile_pic || "",
            };
          });
          if (currentPage === 1 || currentPage === 0) {
            setFleetActive(data.data);
          } else {
            setFleetActive([...FleetActive, ...TransportData]);
          }
        } else {
          setFleetActive(0);
          setlast_page(false);
          setTotalPages(0);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function geinactive(currentPage) {
    page == 1 && !currentPage && setLoading(true);

    let newRequestBody = JSON.stringify({
      user_status: "inactive",
      user_name: FleeName,
      user_email: FleeEmail,
      user_mobile: FleeContact,
      page: currentPage,
      page_limit: recordsPerPage,
    });
    simplePostCall(ApiConfig.FLEET_MANAGER_LIST, newRequestBody)
      .then((data) => {
        if (data.result) {
          setTotalInActive(data.total);

          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];
          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,

              user_name: eachteam.user_name || "",
              user_profile_pic: eachteam.user_profile_pic || "",
            };
          });
          if (currentPage === 1 || currentPage === 0) {
            setFleetinactive(data.data);
          } else {
            setFleetinactive([...Fleetinactive, ...TransportData]);
          }
        } else {
          setFleetinactive(0);
          setlast_page(false);
          setTotalPages(0);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function userBlock() {
    let newRequestBody = JSON.stringify({
      user_id: BlockId,
    });
    simplePostCall(ApiConfig.FlEET_MANAGER_BLOCK, newRequestBody)
      .then((data) => {
        if (data.result) {
          notifySuccess(data.message);
          handleClose1();
          setPage(1);
          setActionApiCall(Math.random() * 100);
          // if (ExportStatus === "active") {
          //   geActive(1);
          // } else {
          //   geinactive(1);
          // }
        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  function userUnBlock() {
    let newRequestBody = JSON.stringify({
      user_id: BlockId,
    });
    simplePostCall(ApiConfig.FlEET_MANAGER_UN_BLOCK, newRequestBody)
      .then((data) => {
        if (data.result) {
          notifySuccess(data.message);
          handleCloseBlock();
          setPage(1);
          setActionApiCall(Math.random() * 100);
          // if (ExportStatus === "active") {
          //   geActive(1);
          // } else {
          //   geinactive(1);
          // }
        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  function userResign() {
    let newRequestBody = JSON.stringify({
      user_id: ResignedId,
    });
    simplePostCall(ApiConfig.FLEET_MANAGER_RESIGEN, newRequestBody)
      .then((data) => {
        if (data.result) {
          notifySuccess(data.message);
          handleClose2();
          setPage(1);
          setActionApiCall(Math.random() * 100);
          // if (ExportStatus === "active") {
          //   geActive(1);
          // } else {
          //   geinactive(1);
          // }
        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  function userUnResign() {
    let newRequestBody = JSON.stringify({
      user_id: ResignedId,
    });
    simplePostCall(ApiConfig.FLEET_MANAGER_UN_RESIGEN, newRequestBody)
      .then((data) => {
        if (data.result) {
          notifySuccess(data.message);
          handleCloseResign();
          setPage(1);
          setActionApiCall(Math.random() * 100);
          // if (ExportStatus === "active") {
          //   geActive(1);
          // } else {
          //   geinactive(1);
          // }
        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  function userDelete() {
    let newRequestBody = JSON.stringify({
      user_id: DeleteId,
    });
    simplePostCall(ApiConfig.FLEET_MANAGER_DELETE, newRequestBody)
      .then((data) => {
        if (data.result) {
          notifySuccess(data.message);
          handleClose();
          setPage(1);
          setActionApiCall(Math.random() * 100);
          // geAllList();
          // geActive();
          // geinactive();
        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  const handleChangeNumber = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    seFleetContact(value);
    setPage(1);
  };
  const onPageLoad = () => {
    setPage(page + 1);

    currentTab == 0
      ? geActive(page + 1)
      : currentTab == 1
      ? geinactive(page + 1)
      : geinactive(page + 1);
  };

  function getExportChat() {
    let newRequestBody = JSON.stringify({
      user_status: ExportStatus,
      user_name: FleeName,
      user_email: FleeEmail,
      user_mobile: FleeContact,
    });
    simplePostCall(ApiConfig.FLEEET_MANAGER, newRequestBody)
      .then((data) => {
        if (data.result) {
          pdfFormat(data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const pdfFormat = (pdfData) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Fleet Manager";
    const headers = [["Sr. No.", "Name", "Email", "Mobile Number"]];
    var data = [];

    pdfData.map((item, index) => {
      data.push([index + 1, item.user_name, item.user_email, item.user_mobile]);
    });

    let content = {
      headStyles: { fillColor: "#9c4900" },
      theme: "grid",
      pageBreak: "auto",
      bodyStyles: { fillColor: "#f6efe9" },
      styles: { fillColor: "#9c4900" },
      head: headers,
      title: title,
      body: data,
    };

    doc.text(title, marginLeft, 25);
    doc.autoTable(content);
    doc.save("VT.pdf");
    return <div></div>;
  };
  const downLoadExcelSheet = () => {
    let newRequestBody = JSON.stringify({
      format: "excel",
      user_status: ExportStatus,
      user_name: FleeName,
      user_email: FleeEmail,
      user_mobile: FleeContact,
    });
    simplePostCall(ApiConfig.FLEEET_MANAGER, newRequestBody)
      .then((res) => {
        if (res?.result) {
          FileSaver.saveAs(ApiConfig.BASE_URL + res.filePath);
        } else {
          notifyError("oops something went wrong?");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
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
        {userRole === "customer" ||
        (accessRights && accessRights.rights_manage_fleet_manager) ? (
          <>
            <Link
              to="/AddFleetManager"
              className="d-flex justify-content-end mb-2"
            >
              <button className="cx-btn-3">+ {t("Fleet Manager")}</button>
            </Link>
          </>
        ) : (
          <></>
        )}
        <div>
          <div className="main-master-wrapper mb-0 inner-tabs-section tabs-custom-width-33">
            <div
              id="scroll_insideThe_Padding53"
              onScroll={(e) => {
                const bottom =
                  e.target.scrollHeight - e.target.scrollTop ===
                  e.target.clientHeight;

                if (bottom && !last_page) onPageLoad();
              }}
            >
              <Tab.Container
                id="left-tabs-example"
                className="td-tab-wrapper"
                defaultActiveKey="0"
              >
                <Nav
                  variant="pills"
                  className="td-nav"
                  id={
                    addonSettingData.addon_historical_data == 1
                      ? "InnerTabNew_Two"
                      : "InnerTabNew_TwoAddOn"
                  }
                  onSelect={(selectedKey) => setCurrentTab(`${selectedKey}`)}
                >
                  {/* <Nav.Item className="td-tab">
                    <Nav.Link className="td-link" eventKey="0" 
                     onClick={handleSelect}
                    >
                      {t("All")}
                      <span className="count-record bg-danger">{totalPages}</span>

                    </Nav.Link>
                  </Nav.Item> */}
                  <Nav.Item className="td-tab">
                    <Nav.Link
                      className="td-link"
                      eventKey="0"
                      onClick={handleSelectActive}
                    >
                      {t("Active")}
                      <span className="count-record bg-danger">
                        {totalActive}
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  {addonSettingData.addon_historical_data == 1 && (
                    <Nav.Item className="td-tab">
                      <Nav.Link
                        className="td-link"
                        eventKey="1"
                        onClick={handleSelectInActive}
                      >
                        {t("Inactive")}
                        <span className="count-record bg-danger">
                          {totalInActive}
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                  )}
                </Nav>

                <Col sm={12} className="">
                  <Tab.Content>
                    <Tab.Pane eventKey="0">
                      <div className="all-vehicle-main">
                        <div className="all-vehical-head row vehicle-top-inputs">
                          <div className="input-section-wrapper">
                            <div className="row">
                              <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t("Fleet Manager Name")}
                                  value={FleeName}
                                  onChange={(e) => {
                                    setFleetName(e.target.value);
                                    setPage(1);
                                  }}
                                />
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t("Email")}
                                  value={FleeEmail}
                                  onChange={(e) => {
                                    setFleetEmail(e.target.value);
                                    setPage(1);
                                  }}
                                />
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                <input
                                  maxLength="10"
                                  minLength={10}
                                  value={FleeContact}
                                  className="form-control"
                                  placeholder={t("Mobile Number")}
                                  onChange={handleChangeNumber}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="right-export-btn-section-wrapper">
                            {/* <div className="c-pointer me-2">
                              <img src={Export} alt="" />
                            </div> */}
                            <div className="customer-option">
                              <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                  <img src={Import} alt="" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <Link
                                      onClick={() => getExportChat()}
                                      className="d-block"
                                    >
                                   {t("PDF")}   
                                    </Link>
                                  </Dropdown.Item>

                                  <Dropdown.Item>
                                    <Link
                                      onClick={(e) => {
                                        downLoadExcelSheet();
                                      }}
                                      className="d-block"
                                    >
                                   {t("Excel")}   
                                    </Link>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                        {loading ? (
                          <Loader />
                        ) : (
                          <>
                            <div
                              className="yauto"
                              id="TransportMananger_height"
                            >
                              <div className="row gx-3 main-cards-wrapper">
                                {FleetActive && FleetActive.length > 0 ? (
                                  FleetActive.map((Activelist, index) => {
                                    return (
                                      <div
                                        className={
                                          sidebar
                                            ? "col-lg-4 col-md-6 mb-3"
                                            : "col-lg-3 col-md-6 mb-3"
                                        }
                                      >
                                        <div className="common-vehical-card-inner h-100">
                                          <div className="vehical-card-head vc-top">
                                            <div className="heading top-avatar-wrapper">
                                              {Activelist.user_profile_pic ===
                                                "" ||
                                              Activelist.user_profile_pic ===
                                                null ? (
                                                <img
                                                  src={ImportUser}
                                                  alt=""
                                                  className="custom-Margin"
                                                />
                                              ) : (
                                                <img
                                                  src={
                                                    
                                                    Activelist.user_profile_pic
                                                  }
                                                  onError={(ev) => {
                                                    handleErrorImage(ev);
                                                  }}
                                                  alt=""
                                                  className="custom-Margin"
                                                />
                                              )}
                                              <div className="">
                                                <p className="sub-heading">
                                                  {t("Fleet Manager Name")}
                                                </p>
                                                <p className="title">
                                                  {Activelist.user_name}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="option customer-option">
                                              <Dropdown>
                                                <Dropdown.Toggle id="dropdown-basic">
                                                  <img src={option} alt="" />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                  <Dropdown.Item>
                                                    <Link
                                                      to={
                                                        "/ViewFleetManager/" +
                                                        Activelist.user_id
                                                      }
                                                      className="d-block"
                                                    >
                                                      {t("View")}
                                                    </Link>
                                                  </Dropdown.Item>
                                                  {userRole === "customer" ||
                                                  (accessRights &&
                                                    accessRights.rights_manage_fleet_manager) ? (
                                                    <>
                                                      <Dropdown.Item>
                                                        <Link
                                                          to={
                                                            "/AddFleetManager/" +
                                                            Activelist.user_id
                                                          }
                                                          className="d-block"
                                                        >
                                                          {t("Edit")}
                                                        </Link>
                                                      </Dropdown.Item>
                                                      <Dropdown.Item>
                                                        <Link
                                                          to={
                                                            "/ChangeFleetPass/" +
                                                            Activelist.user_id
                                                          }
                                                          className="d-block"
                                                          onClick={() => {
                                                            setTransportId(
                                                              Activelist.user_id
                                                            );
                                                          }}
                                                        >
                                                          {t("Change Password")}
                                                        </Link>
                                                      </Dropdown.Item>
                                                      <Dropdown.Item
                                                        href="#"
                                                        onClick={handleShow1}
                                                        className="d-block"
                                                      >
                                                        <Link
                                                          to="#"
                                                          className="d-block"
                                                          onClick={() => {
                                                            setBlockId(
                                                              Activelist.user_id
                                                            );
                                                          }}
                                                        >
                                                          {t("Block")}
                                                        </Link>
                                                      </Dropdown.Item>
                                                      <Dropdown.Item
                                                        href="#"
                                                        onClick={handleShow2}
                                                        className="d-block"
                                                      >
                                                        <Link
                                                          to="#"
                                                          className="d-block"
                                                          onClick={() => {
                                                            setResigned(
                                                              Activelist.user_id
                                                            );
                                                          }}
                                                        >
                                                          {t("Resign")}
                                                        </Link>
                                                      </Dropdown.Item>
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          </div>
                                          <div className="vehical-card-body vc-body row g-0">
                                            <div className="card-contain col-lg-6">
                                              <p className="sub-heading">
                                                {t("Email")}
                                              </p>
                                              <p className="title">
                                                {Activelist.user_email}
                                              </p>
                                            </div>
                                            <div className="card-contain col-lg-6">
                                              <p className="sub-heading">
                                                {t("Mobile Number")}.
                                              </p>
                                              <p className="title">
                                                {Activelist.user_mobile}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <NoDataComp />
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="1">
                      <div className="all-vehicle-main">
                        <div className="all-vehical-head row vehicle-top-inputs">
                          <div className="input-section-wrapper">
                            <div className="row">
                              <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Fleet Manager Name"
                                  value={FleeName}
                                  onChange={(e) => {
                                    setFleetName(e.target.value);
                                    setPage(1);
                                  }}
                                />
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Email"
                                  value={FleeEmail}
                                  onChange={(e) => {
                                    setFleetEmail(e.target.value);
                                    setPage(1);
                                  }}
                                />
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                <input
                                  maxLength="10"
                                  minLength={10}
                                  value={FleeContact}
                                  className="form-control"
                                  placeholder="Mobile Number"
                                  onChange={handleChangeNumber}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="right-export-btn-section-wrapper">
                            {/* <div className="c-pointer me-2">
                              <img src={Export} alt="" />
                            </div> */}
                            <div className="customer-option">
                              <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                  <img src={Import} alt="" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <Link
                                      onClick={() => getExportChat()}
                                      className="d-block"
                                    >
                                      PDF
                                    </Link>
                                  </Dropdown.Item>

                                  <Dropdown.Item>
                                    <Link
                                      onClick={(e) => {
                                        downLoadExcelSheet();
                                      }}
                                      className="d-block"
                                    >
                                      Excel
                                    </Link>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                        {loading ? (
                          <Loader />
                        ) : (
                          <>
                            <div
                              className="yauto"
                              id="TransportMananger_height"
                            >
                              <div className="row gx-3 main-cards-wrapper">
                                {Fleetinactive && Fleetinactive.length > 0 ? (
                                  Fleetinactive.map((itemlist, index) => {
                                    return (
                                      <div
                                        className={
                                          sidebar
                                            ? "col-lg-4 col-md-6 mb-3"
                                            : "col-lg-3 col-md-6 mb-3"
                                        }
                                      >
                                        <div className="common-vehical-card-inner h-100">
                                          <div className="vehical-card-head vc-top">
                                            <div className="heading top-avatar-wrapper">
                                              {itemlist.user_profile_pic ===
                                                "" ||
                                              itemlist.user_profile_pic ===
                                                null ? (
                                                <img
                                                  src={ImportUser}
                                                  alt=""
                                                  className="custom-Margin"
                                                />
                                              ) : (
                                                <img
                                                  src={
                                                    
                                                    itemlist.user_profile_pic
                                                  }
                                                  onError={(ev) => {
                                                    handleErrorImage(ev);
                                                  }}
                                                  alt=""
                                                  className="custom-Margin"
                                                />
                                              )}
                                              <div className="">
                                                <p className="sub-heading">
                                                  {t("Fleet Manager Name")}
                                                </p>
                                                <p className="title">
                                                  {itemlist.user_name}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="option customer-option">
                                              <Dropdown>
                                                <Dropdown.Toggle id="dropdown-basic">
                                                  <img src={option} alt="" />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                  <Dropdown.Item>
                                                    <Link
                                                      to={
                                                        "/ViewFleetManager/" +
                                                        itemlist.user_id
                                                      }
                                                      className="d-block"
                                                    >
                                                      {t("View")}
                                                    </Link>
                                                  </Dropdown.Item>
                                                  {userRole === "customer" ||
                                                  (accessRights &&
                                                    accessRights.rights_manage_fleet_manager) ? (
                                                    //     userRole === "customer" ||
                                                    // (accessRights &&
                                                    //   accessRights.rights_manage_fleet_manager)
                                                    <>
                                                      <Dropdown.Item>
                                                        <Link
                                                          to={
                                                            "/AddFleetManager/" +
                                                            itemlist.user_id
                                                          }
                                                          className="d-block"
                                                        >
                                                          {t("Edit")}
                                                        </Link>
                                                      </Dropdown.Item>
                                                      <Dropdown.Item>
                                                        <Link
                                                          to={
                                                            "/ChangeFleetPass/" +
                                                            itemlist.user_id
                                                          }
                                                          className="d-block"
                                                          onClick={() => {
                                                            setTransportId(
                                                              itemlist.user_id
                                                            );
                                                          }}
                                                        >
                                                          {t("Change Password")}
                                                        </Link>
                                                      </Dropdown.Item>
                                                      {itemlist.user_status ===
                                                      "inactive" ? (
                                                        <Dropdown.Item
                                                          href="#"
                                                          onClick={
                                                            handleShowBlock
                                                          }
                                                        >
                                                          <Link
                                                            to="#"
                                                            className="d-block"
                                                            onClick={() => {
                                                              setBlockId(
                                                                itemlist.user_id
                                                              );
                                                            }}
                                                          >
                                                            {t("UnBlock")}
                                                          </Link>
                                                        </Dropdown.Item>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {itemlist.user_status ===
                                                      "inactive" ? (
                                                        <></>
                                                      ) : (
                                                        <Dropdown.Item
                                                          href="#"
                                                          onClick={
                                                            handleShowResign
                                                          }
                                                        >
                                                          <Link
                                                            to="#"
                                                            className="d-block"
                                                            onClick={() => {
                                                              setResigned(
                                                                itemlist.user_id
                                                              );
                                                            }}
                                                          >
                                                            {t("UnResign")}
                                                          </Link>
                                                        </Dropdown.Item>
                                                      )}
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          </div>
                                          <div className="vehical-card-body vc-body row g-0">
                                            <div className="card-contain col-lg-6">
                                              <p className="sub-heading">
                                                {t("Email")}
                                              </p>
                                              <p className="title">
                                                {itemlist.user_email}
                                              </p>
                                            </div>
                                            <div className="card-contain col-lg-6">
                                              <p className="sub-heading">
                                                {t("Mobile Number")}.
                                              </p>
                                              <p className="title">
                                                {itemlist.user_mobile}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <NoDataComp />
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Tab.Container>
            </div>
            {currentTab == 0 && FleetActive.length > 0 && (
              <Pagenation length={FleetActive.length} total={totalActive} />
            )}
            {currentTab == 1 && Fleetinactive.length > 0 && (
              <Pagenation length={Fleetinactive.length} total={totalInActive} />
            )}
            {/* {currentTab == 0 ? (
              <Pagenation length={FleetActive.length} total={totalActive} />
            ) : currentTab == 1 ? (
              <Pagenation length={Fleetinactive.length} total={totalInActive} />
            ) : (
              <Pagenation length={Fleetinactive.length} total={totalInActive} />
            )} */}

            {/* Delete Modal Start */}
            <Modal
              show={show}
              onHide={handleClose}
              centered
              className="common-model"
            >
              <Modal.Header closeButton>
                <Modal.Title>Deactivate Fleet Manager</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to Deactivate this Fleet Manager ?
              </Modal.Body>
              <Modal.Footer className="pop-up-modal-footer">
                <div class="btn-wrapper">
                  <button className="cx-btn-1" onClick={handleClose}>
                    {t("Cancel")}
                  </button>
                  <button className="cx-btn-2" onClick={userDelete}>
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
                  <button className="cx-btn-2" onClick={userBlock}>
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
              <Modal.Body>
                {t("Are you sure you want to Resign / Retire")} ?
              </Modal.Body>
              <Modal.Footer className="pop-up-modal-footer">
                <div class="btn-wrapper">
                  <button className="cx-btn-1" onClick={handleClose2}>
                    {t("Cancel")}
                  </button>
                  <button className="cx-btn-2" onClick={userResign}>
                    {t("Yes")}
                  </button>
                </div>
              </Modal.Footer>
            </Modal>
            {/* Resign/retire Modal End */}
            {/* UnResign/retire Modal Start */}
            <Modal
              show={showesign}
              onHide={handleCloseResign}
              centered
              className="common-model"
            >
              <Modal.Header closeButton>
                <Modal.Title>{t("UnResign / Retire")} </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {t("Are you sure you want to UnResign / Retire")} ?
              </Modal.Body>
              <Modal.Footer className="pop-up-modal-footer">
                <div class="btn-wrapper">
                  <button className="cx-btn-1" onClick={handleCloseResign}>
                    {t("Cancel")}
                  </button>
                  <button className="cx-btn-2" onClick={userUnResign}>
                    {t("Yes")}
                  </button>
                </div>
              </Modal.Footer>
            </Modal>
            {/* UnResign/retire Modal End */}
            {/* UNBlock Modal Start */}
            <Modal
              show={showBlock}
              onHide={handleClose1}
              centered
              className="common-model"
            >
              <Modal.Header closeButton>
                <Modal.Title>{t("UnBlock")}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{t("Are you sure you want to UnBlock")} ?</Modal.Body>
              <Modal.Footer className="pop-up-modal-footer">
                <div class="btn-wrapper">
                  <button className="cx-btn-1" onClick={handleCloseBlock}>
                    {t("Cancel")}
                  </button>
                  <button className="cx-btn-2" onClick={userUnBlock}>
                    {t("Yes")}
                  </button>
                </div>
              </Modal.Footer>
            </Modal>
            {/* UNBlock Modal End */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FleetManager;

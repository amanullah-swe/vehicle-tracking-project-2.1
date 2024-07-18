import React, { useContext, useEffect, useState } from "react";
import { Dropdown, Modal, Tab, Tabs, Nav, Col } from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import Import from "../../../assets/images/ic-Import.svg";
import ImportUser from "../../../assets/images/imagesuser.png";
import option from "../../../assets/images/option-three-dot.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PostCallWithErrorResponse,
  simplePostCall,
} from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import Pagenation from "../../../sharedComponent/Pagenation";
import Loader from "../../../sharedComponent/Loader";
import NoDataComp from "../../../sharedComponent/NoDataComp";
import NoMoreDataComp from "../../../sharedComponent/NoMoreDataComp";
import { useSelector } from "react-redux";
import SideIc from "../../../assets/images/sideBar.svg";
import export_icon from "../../../assets/images/export_icon.svg";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import FileSaver from "file-saver";

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const DynamicComponent = ({ title, route, dynamic_manage, dynamic_view }) => {
  const {
    sidebar,
    setTransportId,
    setUserRoleRoute,
    setUserRole,
    UserRole,
    recordsPerPage,
    // loading,
    // setLoading,
    useDebounce,
  } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [TransportList, setTransportList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [BlockId, setBlockId] = useState("");
  const [ResignedId, setResigned] = useState("");
  const [DeleteId, setDeleteId] = useState("");
  const [TransportName, setTransportName] = useState("");
  const [TransportEmail, setTransportEmail] = useState("");
  const [TransportContact, setTransportContact] = useState("");
  const [TransportListActive, setTransportActive] = useState([]);
  const [TransportListinactive, setTransportinactive] = useState([]);
  const [TransportExport, setTransportiExport] = useState([]);
  const [page, setPage] = useState(1);
  const [last_page, setlast_page] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalActive, setTotalActive] = useState(0);
  const [totalInActive, setTotalInActive] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const [show1Unblock, setShowUnblock] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleCloseUnblock = () => setShowUnblock(false);
  const handleShowUnBlock = () => setShowUnblock(true);
  const [showUnResign, setShowUnResign] = useState(false);
  const [show2, setShow2] = useState(false);
  const { t, i18n } = useTranslation();

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleCloseUnResign = () => setShowUnResign(false);
  const handleShowUnResign = () => setShowUnResign(true);
  const [currentTab, setCurrentTab] = useState("0");
  const [ExportStatus, setExportStatus] = useState("active");

  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRoleCust = accessRights && accessRights?.rights_role;
  const addonSettingData = useSelector((state) => state.auth.addonModule);

  const handleSelectActive = () => {
    geATranspoertActive(1);
    setPage(1);
    setTransportName("");
    setTransportEmail("");
    setTransportContact("");
    setExportStatus("active");
  };
  const handleSelectInActive = () => {
    geATranspoertinactive(1);
    setPage(1);
    setTransportName("");
    setTransportEmail("");
    setTransportContact("");
    setExportStatus("inactive");
  };

  // useEffect(() => {
  //   geATranspoertinactive(page);
  //   geATranspoertActive(page);

  // }, [TransportName, TransportEmail, TransportContact,title]);

  const debouncedSearchDriver = useDebounce(TransportName, 500);
  const debouncedSearchDriversEmail = useDebounce(TransportEmail, 500);
  const debouncedSearchDriversContact = useDebounce(TransportContact, 500);

  useEffect(() => {
    if (currentTab == 0) {
      geATranspoertActive(1);
    }
    if (currentTab == 1) {
      geATranspoertinactive(1);
    }
    setPage(1);
    // geATranspoertAllList(page);
  }, [
    debouncedSearchDriver,
    debouncedSearchDriversEmail,
    debouncedSearchDriversContact,
    title,
  ]);
  useEffect(() => {
    geATranspoertinactive(1);
  }, []);

  function geATranspoertinactive(currentPage) {
    // page == 1 && !currentPage &&
    setLoading(true);
    setUserRole(title);
    setUserRoleRoute(route);
    let newRequestBody = JSON.stringify({
      user_status: "inactive",
      user_name: TransportName,
      user_email: TransportEmail,
      user_mobile: TransportContact,
      page: currentPage,
      page_limit: recordsPerPage,
      user_role: title,
    });
    simplePostCall(ApiConfig.LIST_USER_ROLE, newRequestBody)
      .then((data) => {
        setLoading(false);
        if (data.result) {
          setTotalInActive(data.total);

          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];
          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,
              user_profile_pic: eachteam.user_profile_pic || "",
              user_name: eachteam.user_name || "",
              user_email: eachteam.user_email || "",
            };
          });

          if (currentPage === 1 || currentPage === 0) {
            setTransportinactive(data.data);
          } else {
            setTransportinactive([...TransportListinactive, ...TransportData]);
          }
        } else {
          // setTransportinactive(data.data);
          setTransportinactive(0);
          setlast_page(false);
          setTotalInActive(0);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function geATranspoertActive(currentPage) {
    // page == 1 && !currentPage && setLoading(true);
    setLoading(true);
    setUserRole(title);
    setUserRoleRoute(route);
    let newRequestBody = JSON.stringify({
      user_status: "active",
      user_name: TransportName,
      user_email: TransportEmail,
      user_mobile: TransportContact,
      page: currentPage,
      page_limit: recordsPerPage,
      user_role: title,
    });
    simplePostCall(ApiConfig.LIST_USER_ROLE, newRequestBody)
      .then((data) => {
        setLoading(false);
        if (data.result) {
          // setTotalPages(data.total)

          setTotalActive(data.total);
          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];
          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,
              user_profile_pic: eachteam.user_profile_pic || "",
              user_name: eachteam.user_name || "",
              user_email: eachteam.user_email || "",
            };
          });

          if (currentPage === 1) {
            setTransportActive(data.data);
          } else {
            setTransportActive([...TransportListActive, ...TransportData]);
          }
        } else {
          // setTransportActive(data.data);
          setTransportActive([]);

          setlast_page(false);
          setTotalActive(0);
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
      user_role: UserRole,
    });

    simplePostCall(ApiConfig.USER_ROLE_BLOCK, newRequestBody)
      .then((data) => {
        if (data.result) {
          setTransportActive([]);
          setPage(1);
          setCurrentTab(1);
          notifySuccess(data.message);
          handleClose1();

          if (ExportStatus === "active") {
            geATranspoertActive(1);
          } else {
            geATranspoertinactive(1);
          }
          // geATranspoertAllList();
          // geATranspoertActive();
          // geATranspoertinactive();
          setCurrentTab("0");
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
      user_role: UserRole,
    });
    simplePostCall(ApiConfig.USER_ROLE_UNBLOCK, newRequestBody)
      .then((data) => {
        if (data.result) {
          setTransportinactive([]);
          setCurrentTab(1);
          notifySuccess(data.message);
          handleCloseUnblock();
          setPage(1);
          if (ExportStatus === "inactive") {
            geATranspoertinactive(1);
          } else {
            geATranspoertinactive(1);
          }
          // geATranspoertAllList();
          // geATranspoertActive();
          // geATranspoertinactive();
          setCurrentTab("0");
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
      user_role: UserRole,
    });

    simplePostCall(ApiConfig.USER_ROLE_RESING, newRequestBody)
      .then((data) => {
        if (data.result) {
          setTransportinactive([]);
          setCurrentTab(1);
          notifySuccess(data.message);
          handleClose2();
          setPage(1);
          if (ExportStatus === "active") {
            geATranspoertActive(1);
          } else {
            geATranspoertinactive(1);
          }
          setCurrentTab("0");
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
      user_role: UserRole,
    });

    simplePostCall(ApiConfig.USER_ROLE_UNRESING, newRequestBody)
      .then((data) => {
        if (data.result) {
          setTransportinactive([]);
          setCurrentTab(1);
          setPage(1);
          notifySuccess(data.message);
          handleCloseUnResign();
          if (ExportStatus === "active") {
            geATranspoertActive(1);
          } else {
            geATranspoertinactive(1);
          }
          setCurrentTab("0");
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
    simplePostCall(ApiConfig.USER_TRANSPORT_DELETE, newRequestBody)
      .then((data) => {
        if (data.result) {
          notifySuccess(data.message);
          setPage(1);
          handleClose();
          if (ExportStatus === "active") {
            geATranspoertActive()();
          } else {
            geATranspoertinactive();
          }
          setCurrentTab("0");
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
    setTransportContact(value);
    setPage(1);
  };

  const onPageLoad = () => {
    setPage(page + 1);

    currentTab == 0
      ? geATranspoertActive(page + 1)
      : currentTab == 1
        ? geATranspoertinactive(page + 1)
        : geATranspoertinactive(page + 1);
  };

  //Export
  function getExportChat() {
    let newRequestBody = JSON.stringify({
      user_status: ExportStatus,
      user_name: TransportName,
      user_email: TransportEmail,
      user_mobile: TransportContact,
      user_role: UserRole,
    });
    simplePostCall(ApiConfig.USER_ROLE_XPERTE, newRequestBody)
      .then((data) => {
        if (data.result) {
          setTransportiExport(data.data);
          pdfFormat(data.data);
        } else {
          notifyError("oops something went wrong?");
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
    // let chatsData = await getExportChat()
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "User Role";
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
      user_name: TransportName,
      user_email: TransportEmail,
      user_mobile: TransportContact,
      user_role: UserRole,
    });
    simplePostCall(ApiConfig.USER_ROLE_XPERTE, newRequestBody)
      .then((res) => {
        if (res.result) {
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
  // const [dynamicAccesR, setdynamicAccesR] = useState({});
  const [dyanamicView, setDyanamicView] = useState(false);
  const [dyanamicManage, setDyanamicManage] = useState(false);
  const [dyanamicDelete, setDyanamicDelete] = useState(false);
  useEffect(() => {
    if (accessRights && title) {
      handledynamicRights();
    }
  }, [accessRights, title]);

  //
  // { name: rights_view_${role_name}_dynm },
  // { name: rights_manage_${role_name}_dynm },
  // { name: rights_delete_${role_name}_dynm }
  const handledynamicRights = () => {
    Object.keys(accessRights).some((key) => {
      if (
        key.endsWith("dynm") &&
        key?.toLowerCase().includes(title.toLowerCase())
      ) {
        if (key?.toLowerCase().includes(`view_`)) {
          setDyanamicView(accessRights[key] == 1);
        }
        if (key?.toLowerCase().includes(`delete_`)) {
          setDyanamicDelete(accessRights[key] == 1);
        }
        if (key?.toLowerCase().includes(`manage_`)) {
          setDyanamicManage(accessRights[key] == 1);
        }
      }
    });
    // setdynamicAccesR(obj);
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
        {(userRoleCust === "customer" || dyanamicManage) && (
          <Link
            to="/AddDynamicUser"
            className="d-flex justify-content-end mb-2"
          >
            <button className="cx-btn-3">+ {title == "dispatchexecutive" ? "Vehicle Attendent" : title}</button>
          </Link>
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
                    addonSettingData?.addon_historical_data == 1
                      ? "InnerTabNew_Two"
                      : "InnerTabNew_TwoAddOn"
                  }
                  onSelect={(selectedKey) => setCurrentTab(`${selectedKey}`)}
                >

                  {addonSettingData.addon_ghatke == 1 ? <>
                    <Nav.Item className="td-tab">
                      <Nav.Link
                        className="td-link cx-relative"
                        eventKey="0"
                        onClick={handleSelectActive}
                      >
                        {t("Active")}
                        <span className="count-record bg-danger">
                          {totalActive}
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                    {addonSettingData?.addon_historical_data == 1 && (
                      <Nav.Item className="td-tab">
                        <Nav.Link
                          className="td-link cx-relative"
                          eventKey="1"
                          onClick={handleSelectInActive}
                        >
                          {t("History/Inactive")}
                          <span className="count-record bg-danger">
                            {totalInActive}
                          </span>
                        </Nav.Link>
                      </Nav.Item>
                    )}

                  </> : <></>}

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
                                  placeholder={t("Role Name")}
                                  onChange={(e) => {
                                    setTransportName(e.target.value);
                                    setPage(1);
                                  }}
                                />
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t("Email")}
                                  onChange={(e) => {
                                    setTransportEmail(e.target.value);
                                    setPage(1);
                                  }}
                                />
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                <input
                                  className="form-control"
                                  maxLength="10"
                                  minLength={10}
                                  value={TransportContact}
                                  placeholder={t("Mobile Number")}
                                  onChange={handleChangeNumber}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="right-export-btn-section-wrapper">
                            <div className="c-pointer me-2"></div>
                            {/* <div className="c-pointer">
                                  
                                <img onClick={() => getExportChat(TransportExport)} src={Import} alt="" />

                                </div> */}
                            <div className="customer-option">
                              <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                  <img src={Import} alt="" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <Link
                                      onClick={() =>
                                        getExportChat(TransportExport)
                                      }
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
                                {TransportListActive &&
                                  TransportListActive.length > 0 ? (
                                  TransportListActive.map((itemlist, index) => {
                                    return (
                                      <div
                                        key={itemlist.user_id}
                                        className={
                                          sidebar
                                            ? "col-lg-4 col-md-6 mb-3"
                                            : "col-lg-3 col-md-6 mb-3"
                                        }
                                      >
                                        <div
                                          className={
                                            "common-vehical-card-inner h-100"
                                          }
                                        >
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
                                                  {t("Role Name")}
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
                                                        "/ViewDynamic/" +
                                                        itemlist.user_id
                                                      }
                                                      className="d-block"
                                                    >
                                                      {t("View")}
                                                    </Link>
                                                  </Dropdown.Item>
                                                  {(userRoleCust ===
                                                    "customer" ||
                                                    dyanamicManage) && (
                                                      <>
                                                        <Dropdown.Item>
                                                          <Link
                                                            to={
                                                              "/AddDynamicUser/" +
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
                                                              "/DynamicPassword/" +
                                                              itemlist.user_id
                                                            }
                                                            onClick={() => {
                                                              setTransportId(
                                                                itemlist.user_id
                                                              );
                                                            }}
                                                            className="d-block"
                                                          >
                                                            {t("Change Password")}
                                                          </Link>
                                                        </Dropdown.Item>
                                                      </>
                                                    )}
                                                  {(userRoleCust ===
                                                    "customer" ||
                                                    dyanamicDelete) && (
                                                      <>
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
                                                                itemlist.user_id
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
                                                                itemlist.user_id
                                                              );
                                                            }}
                                                          >
                                                            {t("Resign")}
                                                          </Link>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                          href="#"
                                                          onClick={handleShow}
                                                          className="d-block"
                                                        >
                                                          {/* <Link
                                                      to="#"
                                                      className="d-block"
                                                      onClick={() => {
                                                        setDeleteId(
                                                          itemlist.user_id
                                                        );
                                                      }}
                                                    >
                                                      {t("Deactivate")}
                                                    </Link> */}
                                                        </Dropdown.Item>
                                                      </>
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
                        {/* {last_page === true ? <NoMoreDataComp /> : ""} */}
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
                                  placeholder={t("Role Name")}
                                  onChange={(e) => {
                                    setTransportName(e.target.value);
                                    setPage(1);
                                  }}
                                />
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t("Email")}
                                  onChange={(e) => {
                                    setTransportEmail(e.target.value);
                                    setPage(1);
                                  }}
                                />
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                <input
                                  // type="text"
                                  maxLength="10"
                                  minLength={10}
                                  value={TransportContact}
                                  className="form-control"
                                  placeholder={t("Mobile Number")}
                                  onChange={handleChangeNumber}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="right-export-btn-section-wrapper">
                            <div className="c-pointer me-2"></div>
                            <div className="customer-option">
                              <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                  <img src={Import} alt="" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <Link
                                      onClick={() =>
                                        getExportChat(TransportExport)
                                      }
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
                                {TransportListinactive &&
                                  TransportListinactive.length > 0 ? (
                                  TransportListinactive?.map(
                                    (itemlist, index) => {
                                      return (
                                        <div
                                          className={
                                            sidebar
                                              ? "col-lg-4 col-md-6 mb-3"
                                              : "col-lg-3 col-md-6 mb-3"
                                          }
                                        >
                                          <div
                                            className={
                                              "common-vehical-card-inner h-100"
                                            }
                                          >
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
                                                    {t("Role Name")}
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
                                                    {accessRights &&
                                                      (accessRights.rights_role ==
                                                        "customer" ||
                                                        accessRights.rights_view_tm) ? (
                                                      <>
                                                        <Dropdown.Item>
                                                          <Link
                                                            to={
                                                              "/ViewDynamic/" +
                                                              itemlist.user_id
                                                            }
                                                            className="d-block"
                                                          >
                                                            {t("View")}
                                                          </Link>
                                                        </Dropdown.Item>
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}

                                                    {(userRoleCust ===
                                                      "customer" ||
                                                      dyanamicManage) && (
                                                        <>
                                                          <Dropdown.Item>
                                                            <Link
                                                              to={
                                                                "/AddDynamicUser/" +
                                                                itemlist.user_id
                                                              }
                                                              className="d-block"
                                                            >
                                                              {t("Edit")}
                                                            </Link>
                                                          </Dropdown.Item>
                                                          <Dropdown.Item>
                                                            <Link
                                                              onClick={() => {
                                                                setTransportId(
                                                                  itemlist.user_id
                                                                );
                                                              }}
                                                              to={
                                                                "/DynamicPassword/" +
                                                                itemlist.user_id
                                                              }
                                                              className="d-block"
                                                            >
                                                              {t(
                                                                "Change Password"
                                                              )}
                                                            </Link>
                                                          </Dropdown.Item>
                                                        </>
                                                      )}

                                                    {(userRoleCust ===
                                                      "customer" ||
                                                      dyanamicDelete) && (
                                                        <>
                                                          {itemlist.user_status ===
                                                            "inactive" ? (
                                                            <Dropdown.Item
                                                              href="#"
                                                              onClick={
                                                                handleShowUnBlock
                                                              }
                                                              className="d-block"
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
                                                                {t("Unblock")}
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
                                                                handleShowUnResign
                                                              }
                                                              className="d-block"
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
                                                                {t("Unresign")}
                                                              </Link>
                                                            </Dropdown.Item>
                                                          )}

                                                          <Dropdown.Item
                                                            href="#"
                                                            onClick={handleShow}
                                                            className="d-block"
                                                          >
                                                            {/* <Link
                                                      to="#"
                                                      className="d-block"
                                                      onClick={() => {
                                                        setDeleteId(
                                                          itemlist.user_id
                                                          );
                                                        }}
                                                    >
                                                      {t("Deactivate")}
                                                    </Link> */}
                                                          </Dropdown.Item>
                                                        </>
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
                                    }
                                  )
                                ) : (
                                  <NoDataComp />
                                )}
                              </div>
                              {/* {last_page === true ? <NoMoreDataComp /> : ""} */}
                            </div>
                          </>
                        )}
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Tab.Container>
            </div>
            {currentTab == 0 && TransportListActive.length > 0 && (
              <Pagenation
                length={TransportListActive.length}
                total={totalActive}
                comp={"Drivers"}
              />
            )}
            {currentTab == 1 && TransportListinactive.length > 0 && (
              <Pagenation
                length={TransportListinactive.length}
                total={totalInActive}
                comp={"Drivers"}
              />
            )}
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
            <Modal.Title>{t("Deactivate Transport Manager")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {t("Are you sure you want to Deactivate this Transport Manager")} ?
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

        {/* unBlock Modal Start */}
        <Modal
          show={show1Unblock}
          onHide={handleCloseUnblock}
          centered
          className="common-model"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("UnBlock")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{t("Are you sure you want to UnBlock")} ?</Modal.Body>
          <Modal.Footer className="pop-up-modal-footer">
            <div class="btn-wrapper">
              <button className="cx-btn-1" onClick={handleCloseUnblock}>
                {t("Cancel")}
              </button>
              <button className="cx-btn-2" onClick={userUnBlock}>
                {t("Yes")}
              </button>
            </div>
          </Modal.Footer>
        </Modal>
        {/* unBlock Modal End */}

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
        {/* Resign/retire Modal Start */}
        <Modal
          show={showUnResign}
          onHide={handleCloseUnResign}
          centered
          className="common-model"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("UnResign / Retire")} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {t("Are you sure you want to UnResign / UnRetire")} ?
          </Modal.Body>
          <Modal.Footer className="pop-up-modal-footer">
            <div class="btn-wrapper">
              <button className="cx-btn-1" onClick={handleCloseUnResign}>
                {t("Cancel")}
              </button>
              <button className="cx-btn-2" onClick={userUnResign}>
                {t("Yes")}
              </button>
            </div>
          </Modal.Footer>
        </Modal>
        {/* Resign/retire Modal End */}
      </div>
    </motion.div>
  );
};

export default DynamicComponent;

// Usama 09-02-2023

import React, { useContext, useState } from "react";
import { Col, Dropdown, Modal, Nav, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import DDlogo from "../../../assets/images/DDlogo.png";
import Import from "../../../assets/images/ic-Import.svg";
import option from "../../../assets/images/option-three-dot.svg";
import Grouplogo from "../../../assets/images/Customer-profile.png";
import Export from "../../../assets/images/ic-Export.svg";
import untracked_icon from "../../../assets/images/untracked_icon.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApiConfig from "../../../api/ApiConfig";
import { simplePostCall } from "../../../api/ApiServices";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import { useEffect } from "react";
import Pagenation from "../../../sharedComponent/Pagenation";
import Loader from "../../../sharedComponent/Loader";
import ImportUser from "../../../assets/images/imagesuser.png";
import NoDataComp from "../../../sharedComponent/NoDataComp";
import { jsPDF } from "jspdf";
import FileSaver from "file-saver";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const VehicleAssistants = () => {
  const [show, setShow] = useState(false);
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;
  const addonSettingData = useSelector((state) => state.auth.addonModule);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);
  const [show1, setShow1] = useState(false);
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
  const { t, i18n } = useTranslation();
  const [VehicleAllList, setVehicleAlllList] = useState([]);
  const [VehicleActive, setVehicleActive] = useState([]);
  const [Vehicleinactive, setVehicleinactive] = useState([]);
  const [BlockId, setBlockId] = useState("");
  const [ResignedId, setResigned] = useState("");
  const [DeleteId, setDeleteId] = useState("");
  const [VechicleName, setVechicleName] = useState("");
  const [VechicleEmail, setVechicleEmail] = useState("");
  const [VechicleContact, seVechicleContact] = useState("");
  const [page, setPage] = useState(1);
  const [last_page, setlast_page] = useState(false);
  const [currentTab, setCurrentTab] = useState("0");
  const [totalPages, setTotalPages] = useState(0);
  const [totalActive, setTotalActive] = useState(0);
  const [totalInActive, setTotalInActive] = useState(0);
  const [ExportStatus, setExportStatus] = useState("active");
  const [showBlock, setShowBlock] = useState(false);
  const [showesign, setShowresign] = useState(false);
  const handleCloseBlock = () => setShowBlock(false);
  const handleShowBlock = () => setShowBlock(true);
  const handleCloseResign = () => setShowresign(false);
  const handleShowResign = () => setShowresign(true);

  const debouncedSearchDriver = useDebounce(VechicleName, 500);
  const debouncedSearchDriversEmail = useDebounce(VechicleEmail, 500);
  const debouncedSearchDriversContact = useDebounce(VechicleContact, 500);
  const [actionApiCall, setActionApiCall] = useState("");
  useEffect(() => {
    if (currentTab == 0) {
      geVechileActive(1);
    }
    if (currentTab == 1) {
      geVechileinactive(1);
    }
    setPage(1);
    // geATranspoertAllList(page);
  }, [
    debouncedSearchDriver,
    debouncedSearchDriversEmail,
    debouncedSearchDriversContact,
  ]);
  useEffect(() => {
    geVechileinactive(1);
    geVechileActive(1);
  }, [actionApiCall]);

  // useEffect(() => {
  //   geVechileActive(page)
  //   geVechileinactive(page)
  //   geVechileList(page)
  // }, [VechicleName, VechicleEmail, VechicleContact])

  const handleSelect = () => {
    setPage(0);
    // geVechileList(1)
    setVechicleName("");
    setVechicleEmail("");
    seVechicleContact("");
    setExportStatus("");
  };
  const handleSelectActive = () => {
    setPage(0);
    geVechileActive(1);
    setVechicleName("");
    setVechicleEmail("");
    seVechicleContact("");
    setExportStatus("active");
  };
  const handleSelectInActive = () => {
    geVechileinactive(1);
    setPage(0);
    setVechicleName("");
    setVechicleEmail("");
    seVechicleContact("");
    setExportStatus("inactive");
  };

  // function geVechileList (currentPage) {
  //   page == 1 && !currentPage && setLoading(true)

  //   let newRequestBody = JSON.stringify({
  //     user_status: '',
  //     user_name: VechicleName,
  //     user_email: VechicleEmail,
  //     user_mobile: VechicleContact,
  //     page: currentPage,
  //     page_limit: recordsPerPage
  //   })
  //   simplePostCall(ApiConfig.VEHICLE_ASISTANTS_LIST, newRequestBody)
  //     .then(data => {
  //       if (data.result) {
  //         setTotalPages(data.total)

  //         setlast_page(data.last_page)
  //         let FilterData = data.data ? data.data : []
  //         let TransportData = FilterData.map((eachteam, index) => {
  //           return {
  //             ...eachteam,

  //             user_name: eachteam.user_name || '',
  //             user_profile_pic: eachteam.user_profile_pic || ''
  //           }
  //         })
  //         if (currentPage === 1 || currentPage === 0) {
  //           setVehicleAlllList(data.data)
  //         } else {
  //           setVehicleAlllList([...VehicleAllList, ...TransportData])
  //         }
  //       } else {
  //         setVehicleAlllList(0)
  //         setlast_page(false)
  //         // setTotalPages(0)
  //       }
  //     })
  //     .catch(err => {
  //       console.log('err', err)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }

  function geVechileActive(currentPage) {
    // page == 1 && !currentPage && setLoading(true)
    setLoading(false);
    let newRequestBody = JSON.stringify({
      user_status: "active",
      user_name: VechicleName,
      user_email: VechicleEmail,
      user_mobile: VechicleContact,
      page: currentPage,
      page_limit: recordsPerPage,
    });
    simplePostCall(ApiConfig.VEHICLE_ASISTANTS_LIST, newRequestBody)
      .then((data) => {
        setLoading(false);
        if (data.result) {
          setTotalActive(data?.total);

          setlast_page(data.last_page);
          // let FilterData = data.data ? data.data : []
          // let TransportData = FilterData.map((eachteam, index) => {
          //   return {
          //     ...eachteam,

          //     user_name: eachteam.user_name || '',
          //     user_profile_pic: eachteam.user_profile_pic || ''
          //   }
          // })
          if (currentPage === 1) {
            setVehicleActive(data.data);
          } else {
            setVehicleActive([...VehicleActive, ...data.data]);
          }
        } else {
          setVehicleActive(0);
          setlast_page(false);
          // setTotalPages(0)
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function geVechileinactive(currentPage) {
    // page == 1 && !currentPage &&
    setLoading(true);

    let newRequestBody = JSON.stringify({
      user_status: "inactive",
      user_name: VechicleName,
      user_email: VechicleEmail,
      user_mobile: VechicleContact,
      page: currentPage,
      page_limit: recordsPerPage,
    });
    simplePostCall(ApiConfig.VEHICLE_ASISTANTS_LIST, newRequestBody)
      .then((data) => {
        setLoading(false);
        if (data.result) {
          setTotalInActive(data.total);

          setlast_page(data.last_page);
          // let FilterData = data.data ? data.data : []
          // let TransportData = FilterData.map((eachteam, index) => {
          //   return {
          //     ...eachteam,

          //     user_name: eachteam.user_name || '',
          //     user_profile_pic: eachteam.user_profile_pic || ''
          //   }
          // })
          if (currentPage === 1) {
            setVehicleinactive(data.data);
          } else {
            setVehicleinactive([...Vehicleinactive, ...data.data]);
          }
        } else {
          setVehicleinactive([]);
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
    simplePostCall(ApiConfig.VEHICLE_ASISTANTS_BLOOK, newRequestBody)
      .then((data) => {
        if (data.result) {
          notifySuccess(data.message);
          handleClose1();
          handleCloseResign();
          setPage(1);
          setActionApiCall(Math.random() * 100);
          // geVechileList()
          // geVechileActive(1)
          // geVechileinactive(1)
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
    simplePostCall(ApiConfig.VEHICLE_ASISTANTS_UN_BLOOK, newRequestBody)
      .then((data) => {
        if (data.result) {
          notifySuccess(data.message);
          handleClose1();
          handleCloseResign();
          setPage(1);
          // geVechileList()
          setActionApiCall(Math.random() * 100);
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
          handleClose2();
          handleCloseResign();
          setPage(1);
          // geVechileList()
          setActionApiCall(Math.random() * 100);
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
    simplePostCall(ApiConfig.VEHICLE_RESIGEN, newRequestBody)
      .then((data) => {
        if (data.result) {
          notifySuccess(data.message);
          handleClose2();
          handleCloseResign();
          setPage(1);
          // geVechileList()
          setActionApiCall(Math.random() * 100);
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
    simplePostCall(ApiConfig.VEHICLE_ASISTANTS, newRequestBody)
      .then((data) => {
        if (data.result) {
          notifySuccess(data.message);
          handleClose();
          setPage(1);
          // geVechileList()
          setActionApiCall(Math.random() * 100);
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
    seVechicleContact(value);
    setPage(1);
  };

  const onPageLoad = () => {
    setPage(page + 1);

    currentTab == 0
      ? geVechileActive(page + 1)
      : currentTab == 1
      ? geVechileinactive(page + 1)
      : geVechileinactive(page + 1);
  };

  function getExportChat() {
    let newRequestBody = JSON.stringify({
      user_status: ExportStatus,
      user_name: VechicleName,
      user_email: VechicleEmail,
      user_mobile: VechicleContact,
    });
    simplePostCall(ApiConfig.VEHICEL_ASISTAN_EXPORT, newRequestBody)
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
    const title = "Vehicle Assistants";
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
      user_name: VechicleName,
      user_email: VechicleEmail,
      user_mobile: VechicleContact,
    });
    simplePostCall(ApiConfig.VEHICEL_ASISTAN_EXPORT, newRequestBody)
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
        (accessRights && accessRights?.rights_manage_vehicle_assistants) ? (
          <>
            <Link
              to="/AddVehicleAssistants"
              className="mb-2 d-flex justify-content-end"
            >
              <button className="cx-btn-3">+ {t("Vehicle Assistant")}</button>
            </Link>
          </>
        ) : (
          <></>
        )}
        <div>
          <div className="main-master-wrapper mb-0 inner-tabs-section tabs-custom-width-33 ">
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
                  {/* <Nav.Item className="td-tab">
                    <Nav.Link
                      className="td-link"
                      eventKey="0"
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
                  {addonSettingData?.addon_historical_data == 1 && (
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
                  {/* {loading ? (
                    <Loader />
                  ) : (
                    <> */}
                  <Tab.Content>
                    <Tab.Pane eventKey="0">
                      <div className="all-vehicle-main">
                        <div className="all-vehical-head row">
                          <div className="col-lg-11 row innerInputsGen">
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Vehicle Assistant Name")}
                                value={VechicleName}
                                onChange={(e) => {
                                  setVechicleName(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Email")}
                                value={VechicleEmail}
                                onChange={(e) => {
                                  setVechicleEmail(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                              <input
                                maxLength="10"
                                minLength={10}
                                value={VechicleContact}
                                className="form-control"
                                placeholder={t("Mobile Number")}
                                onChange={handleChangeNumber}
                              />
                            </div>
                          </div>
                          <div className="col-lg-1 export-btn g-0">
                            {/* <div className="">
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
                                {VehicleActive && VehicleActive.length > 0 ? (
                                  VehicleActive?.map((Activelist, index) => {
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
                                            "common-vehical-card-inner cv-card p-0 h-100"
                                          }
                                        >
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
                                                  {t("Name")}
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
                                                        "/ViewVehicleAssistants/" +
                                                        Activelist.user_id
                                                      }
                                                      className="d-block"
                                                    >
                                                      {t("View")}
                                                    </Link>
                                                  </Dropdown.Item>
                                                  {userRole === "customer" ||
                                                  (accessRights &&
                                                    accessRights.rights_manage_vehicle_assistants) ? (
                                                    <>
                                                      <Dropdown.Item>
                                                        <Link
                                                          to={
                                                            "/AddVehicleAssistants/" +
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
                                                            "/ChangeDelPass/" +
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
                                            <div className="card-contain col-lg-12">
                                              <p className="sub-heading">
                                                {t("Vehicle Assignments")}
                                              </p>
                                              <p className="title">
                                                {Activelist.vehicle_number
                                                  ? Activelist.vehicle_number
                                                  : ""}
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
                        <div className="all-vehical-head row">
                          <div className="col-lg-11 row innerInputsGen">
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Vehicle Assistant Name")}
                                value={VechicleName}
                                onChange={(e) => {
                                  setVechicleName(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Email")}
                                value={VechicleEmail}
                                onChange={(e) => {
                                  setVechicleEmail(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                              <input
                                maxLength="10"
                                minLength={10}
                                value={VechicleContact}
                                className="form-control"
                                placeholder={t("Mobile Number")}
                                onChange={handleChangeNumber}
                              />
                            </div>
                          </div>
                          <div className="col-lg-1 export-btn g-0">
                            {/* <div className="">
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
                                {Vehicleinactive &&
                                Vehicleinactive.length > 0 ? (
                                  Vehicleinactive?.map((itemlist, index) => {
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
                                            "common-vehical-card-inner cv-card p-0 h-100"
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
                                                  {t("Name")}
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
                                                        "/ViewVehicleAssistants/" +
                                                        itemlist.user_id
                                                      }
                                                      className="d-block"
                                                    >
                                                      {t("View")}
                                                    </Link>
                                                  </Dropdown.Item>
                                                  {userRole === "customer" ||
                                                  (accessRights &&
                                                    accessRights.rights_manage_vehicle_assistants) ? (
                                                    <>
                                                      <Dropdown.Item>
                                                        <Link
                                                          to={
                                                            "/AddVehicleAssistants/" +
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
                                                            "/ChangeDelPass/" +
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
                                            <div className="card-contain col-lg-12">
                                              <p className="sub-heading">
                                                {t("Vehicle Assignments")}
                                              </p>
                                              <p className="title">
                                                {itemlist.vehicle_number
                                                  ? itemlist.vehicle_number
                                                  : ""}
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
                  {/* </>
                  )} */}
                </Col>
              </Tab.Container>
            </div>

            {currentTab == 0 && VehicleActive.length > 0 && (
              <Pagenation length={VehicleActive.length} total={totalActive} />
            )}
            {currentTab == 1 && VehicleActive.length > 0 && (
              <Pagenation
                length={Vehicleinactive.length}
                total={totalInActive}
              />
            )}
            {/* {currentTab == 0 ? (
              <Pagenation length={VehicleActive.length} total={totalPages} />
            ) : currentTab == 1 ? (
              <Pagenation length={Vehicleinactive.length} total={totalPages} />
            ) : (
              <Pagenation length={Vehicleinactive.length} total={totalPages} />
            )} */}

            {/* Delete Modal Start */}
            <Modal
              show={show}
              onHide={handleClose}
              centered
              className="common-model"
            >
              <Modal.Header closeButton>
                <Modal.Title>{t("Deactivate Assistant")}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {t("Are you sure you want to Deactivate this Assistant")} ?
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

export default VehicleAssistants;

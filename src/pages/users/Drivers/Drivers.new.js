// Usama 09-02-2023

import React, { useContext, useEffect, useState } from "react";
import { Col, Dropdown, Modal, Nav, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import DDlogo from "../../../assets/images/DDlogo.png";
import Import from "../../../assets/images/ic-Import.svg";
import no_data from "../../../assets/images/no_data.svg";

import Export from "../../../assets/images/ic-Export.svg";
import option from "../../../assets/images/option-three-dot.svg";
import Grouplogo from "../../../assets/images/Customer-profile.png";
import untracked_icon from "../../../assets/images/untracked_icon.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Pagenation from "../../../sharedComponent/Pagenation";
import {
  putMultipartWithAuthCall,
  simpleDeleteCall,
  simplePostCall,
} from "../../../api/ApiServices";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import ApiConfig from "../../../api/ApiConfig";
import NoDataComp from "../../../sharedComponent/NoDataComp";
import NoMoreDataComp from "../../../sharedComponent/NoMoreDataComp";
import Loader from "../../../sharedComponent/Loader";
import ImportUser from "../../../assets/images/imagesuser.png";
import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import FileSaver from "file-saver";

import { useTranslation } from "react-i18next";

const Drivers = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;
  const [show, setShow] = useState(false);
  const { t, i18n } = useTranslation();
  const [ExportStatus, setExportStatus] = useState("active");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false);
  const [showUnresign, setShowUnresign] = useState(false);
  const [show1Unblock, setShowUnBlock] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleCloseUnresing = () => setShowUnresign(false);
  const handleShowUnresing = () => setShowUnresign(true);
  const handleCloseUnblock = () => setShowUnBlock(false);
  const handleShowUnblock = () => setShowUnBlock(true);
  // const [loading, setLoading] = useState(false);
  const [TransportExport, setTransportiExport] = useState([]);

  const {
    sidebar,
    setSidebar,
    recordsPerPage,
    setTransportId,
    useDebounce,
    loading,
    setLoading,
  } = useContext(AppContext);

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const [DriversAllList, setDriversAllList] = useState([]);
  const [DriversListActive, setDriversActive] = useState([]);
  const [DriversListinactive, setDriversinactive] = useState([]);
  const [DriversUntrackede, setDriversUntracked] = useState([]);
  const [BlockId, setBlockId] = useState("");
  const [ResignedId, setResigned] = useState("");
  const [DeleteId, setDeleteId] = useState("");
  const [DriversName, setDriversName] = useState("");
  const [DriversEmail, setDriversEmail] = useState("");
  const [DriversContact, setDriversContact] = useState("");
  const [page, setPage] = useState(1);
  const [last_page, setlast_page] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalActive, setTotalActive] = useState(0);
  const [totalInActive, setTotalInActive] = useState(0);
  const [totalUntrak, setTotalInUntrak] = useState(0);
  const debouncedSearchDriver = useDebounce(DriversName, 500);
  const debouncedSearchDriversEmail = useDebounce(DriversEmail, 500);
  const debouncedSearchDriversContact = useDebounce(DriversContact, 500);
  useEffect(() => {
    if (currentTab == 0) {
      geDriverActive(1, "key");
    }
    if (currentTab == 1) {
      geDriversUntracked(1, "key");
    }
  }, [
    debouncedSearchDriver,
    debouncedSearchDriversEmail,
    debouncedSearchDriversContact,
  ]);
useEffect(() => {
  geDriversUntracked(1, "key");
}, [])

  const handleSelect = () => {
    setPage(1);
    geDriverActive(1, "key");
    setDriversEmail("");
    setDriversName("");
    setDriversContact("");
    setExportStatus("active");
  };
  const handleSelectActive = () => {
    setPage(1);
    geDriversUntracked(1, "key");
    setDriversEmail("");
    setDriversName("");
    setDriversContact("");
    setExportStatus("inactive");
  };
  // const handleSelectInActive = () => {
  //   console.log("currentTabIner Tab", currentTab);

  //   geDriverinactive(1);
  //   setPage(0);
  //   setDriversEmail("");
  //   setDriversName("");
  //   setExportStatus("inactive")

  //   setDriversContact("");
  // };

  // const handleSelectUntracked = () => {
  //   geDriversUntracked(1);
  //   setPage(1);
  //   setDriversEmail("");
  //   setDriversName("");
  //   setDriversContact("");
  // };

  // function geDriverinactive(currentPage) {
  //   page == 1 && !currentPage && setLoading(true);

  //   let newRequestBody = JSON.stringify({
  //     category: "offline",
  //     userName: DriversName,
  //     userEmail: DriversEmail,
  //     userMobile: DriversContact,
  //     page: currentPage,
  //     page_limit: 10,
  //   });
  //   simplePostCall(ApiConfig.DRIVERS_LIST, newRequestBody)
  //     .then((data) => {
  //       if (data.success) {
  //         setTotalInActive(data.total_count);

  //         setlast_page(data.last_page);
  //         let FilterData = data.data ? data.data : [];
  //         let TransportData = FilterData.map((eachteam, index) => {
  //           return {
  //             ...eachteam,

  //             userName: eachteam.userName || "",
  //             email: eachteam.email || "",
  //           };
  //         });
  //         if (currentPage === 1 || currentPage === 0) {
  //           setDriversinactive(data.data);
  //         } else {
  //           setDriversinactive([...DriversListinactive, ...TransportData]);
  //         }
  //       } else {
  //         // setDriversinactive(data.data);
  //         setDriversinactive(0);
  //         setTotalPages(0);

  //         setlast_page(false);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  function geDriversUntracked(currentPage, key) {
    // page == 1 && !currentPage && setLoading(true);
    setLoading(true);
    let newRequestBody = JSON.stringify({
      category: "inactive",
      userName: DriversName,
      userEmail: DriversEmail,
      userMobile: DriversContact,
      page: currentPage,
      page_limit: recordsPerPage,
    });
    simplePostCall(ApiConfig.DRIVERS_LIST, newRequestBody)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          setTotalInUntrak(data?.total_count);
          setTotalPages(data.total_pages);
          setlast_page(data?.last_page);
          if (key == "key") {
            setDriversUntracked(data.data);
          } else {
            setDriversUntracked([...DriversUntrackede, ...data?.data]);
          }
        } else {
          setDriversUntracked([]);
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
  function geDriverActive(currentPage, key) {
    setLoading(true);
    let newRequestBody = JSON.stringify({
      category: "active",
      userName: DriversName,
      userEmail: DriversEmail,
      userMobile: DriversContact,
      page: currentPage,
      page_limit: recordsPerPage,
    });
    simplePostCall(ApiConfig.DRIVERS_LIST, newRequestBody)
      .then((data) => {
        setLoading(false);
        // if (data.success === true) {
        
          // if (key == "key" && currentPage == 1 || currentPage == 0) {
          //   setDriversActive(data.data);
          //   setTotalActive(data?.total_count);
          //   // setlast_page(data?.last_page);
          //   setTotalPages(data.total_pages);
          // } else {
          //   setDriversActive([...DriversListActive, ...data.data]);
          //   setTotalActive(data?.total_count);
          //   // setlast_page(data?.last_page);
          //   setTotalPages(data.total_pages);
          // }
        // } else {
        //   setlast_page(data?.last_page);
        //   setTotalActive(0);
        //   // setDriversActive([]);
        // }

        if (data.success) {
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
          if ( key == "key" || currentPage === 1 || currentPage === 0) {
            setDriversActive(data.data);
          } else {
            setDriversActive([...DriversListActive, ...TransportData]);
          }
        } else {
          setTotalActive(0);
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

  function userBlock() {
    let newRequestBody = JSON.stringify({
      userId: BlockId,
    });
    simplePostCall(ApiConfig.DRIVERS_BLOCK, newRequestBody)
      .then((data) => {
        if (data.success) {
          notifySuccess(data.message);
          setPage(1);
          handleClose1();
          // setDriversActive([]);
          if (ExportStatus === "active") {
            geDriverActive(1, "key");
          } else {
            geDriversUntracked(1, "key");
          }
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
      userId: BlockId,
    });
    simplePostCall(ApiConfig.DRIVERS_UN_BLOCK, newRequestBody)
      .then((data) => {
        if (data.success) {
          notifySuccess(data.message);
          setCurrentTab(1);
          setPage(1);
          handleCloseUnblock();
          // setDriversUntracked([]);
          if (ExportStatus === "active") {
            geDriverActive(1, "key");
          } else {
            geDriversUntracked(1, "key");
          }
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
      userId: ResignedId,
    });
    simplePostCall(ApiConfig.DRIVERS_RESIGEN, newRequestBody)
      .then((data) => {
        if (data.success == true) {
          notifySuccess(data.message);
          setPage(1);
          handleClose2();
          // setDriversActive([]);
          if (ExportStatus === "active") {
            geDriverActive(1, "key");
          } else {
            geDriversUntracked(1, "key");
          }
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
      userId: ResignedId,
    });
    simplePostCall(ApiConfig.DRIVERS_UN_RESIGEN, newRequestBody)
      .then((data) => {
        if (data.success == true) {
          notifySuccess(data.message);
          handleClose2();
          setPage(1);
          // setDriversUntracked([]);
          if (ExportStatus === "active") {
            geDriverActive(1, "key");
          } else {
            geDriversUntracked(1, "key");
          }
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
      userId: DeleteId,
    });
    simpleDeleteCall(ApiConfig.DRIVERS_DELETE, newRequestBody)
      .then((data) => {
        if (data.success === true) {
          notifySuccess(data.message);
          handleCloseUnresing();
          setPage(1);
          if (currentTab == 0) {
            geDriverActive(1, "key");
          }
          if (currentTab == 1) {
            geDriversUntracked(1, "key");
          }
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
    setDriversContact(value);
    setPage(1);
  };
  const onPageLoad = () => {
    // debugger
    // if (currentTab == 0) {
    //   geDriverActive(page + 1);
    // }
    // if (currentTab == 1) {
    //   geDriversUntracked(page + 1);
    // }

    // &&
    currentTab == 0
      ? geDriverActive(page + 1)
      : currentTab == 1
      ? geDriversUntracked(page + 1)
      : currentTab == 2
      ? geDriversUntracked(page + 1)
      : geDriversUntracked(page + 1);
      setPage(page + 1);
  };

  //Export
  function getExportChat(status) {
    let newRequestBody = JSON.stringify({
      category: ExportStatus?ExportStatus:status,
      userName: DriversName,
      userEmail: DriversEmail,
      userMobile: DriversContact,
    });
    simplePostCall(ApiConfig.DRIVER_EXPORT, newRequestBody)
      .then((data) => {
        if (data.success) {
          setTransportiExport(data.data);
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
    // let chatsData = await getExportChat()
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Driver";
    const headers = [["Sr. No.", "Name", "Email", "Mobile Number"]];
    var data = [];

    pdfData.map((item, index) => {
      data.push([index + 1, item.userName, item.email, item.contact]);
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
      category: ExportStatus,
      userName: DriversName,
      userEmail: DriversEmail,
      userMobile: DriversContact,
    });
    simplePostCall(ApiConfig.DRIVER_EXPORT, newRequestBody)
      .then((res) => {
        if (res.success) {
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
        (accessRights && accessRights.rights_manage_driver) ? (
          <>
            <Link to="/AddDrivers" className="d-flex justify-content-end mb-3">
              <button className="cx-btn-3 tbBtn">+ {t("Create Driver")}</button>
            </Link>
          </>
        ) : (
          <></>
        )}
        <div>
          <div className="main-master-wrapper mb-0 inner-tabs-section tabs-custom-width-25 ">
            <div
              id="scroll_insideThe_Padding"
              onScroll={(e) => {
                const bottom =
                  e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
               if (bottom && !last_page&&page<=totalPages) {
                  // if (currentTab == 0) {
                  //   geDriverActive(page+1,"");
                  //   setPage(page + 1);
                  // }
                  // if (currentTab == 1) {
                  //   geDriversUntracked(page+1,"");
                  //   setPage(page + 1);
                  // }
                 
                }
                onPageLoad();
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
                  id="InnerTabNew_Two"
                  onSelect={(selectedKey) => setCurrentTab(`${selectedKey}`)}
                >
                  <Nav.Item className="td-tab">
                    <Nav.Link
                      className="td-link"
                      eventKey="0"
                      onClick={handleSelect}
                    >
                      Active
                      <span className="count-record bg-danger">
                        {totalActive}
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="td-tab">
                    <Nav.Link
                      className="td-link"
                      eventKey="1"
                      onClick={handleSelectActive}
                    >
                      {t("History/Inactive")}

                      <span className="count-record bg-danger">
                        {totalUntrak}
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  {/* <Nav.Item className="td-tab">
                    <Nav.Link
                      className="td-link"
                      eventKey="2"
                      onClick={handleSelectInActive}
                    >
                      {t("Dormant")}
                      <span className="count-record bg-danger">
                        {totalInActive}
                      </span>
                    </Nav.Link>
                  </Nav.Item> */}
                  {/* <Nav.Item className="td-tab">
                    <Nav.Link
                      className="td-link"
                      eventKey="3"
                      onClick={handleSelectUntracked}
                    >
                      Untracked
                      <span className="count-record bg-danger">
                        {totalUntrak}
                      </span>
                    </Nav.Link>
                  </Nav.Item> */}
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
                                  placeholder="Driver Name"
                                  value={DriversName}
                                  onChange={(e) => {
                                    setDriversName(e.target.value);
                                    setPage(1);
                                  }}
                                />
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Driver Email"
                                  value={DriversEmail}
                                  onChange={(e) => {
                                    setDriversEmail(e.target.value);
                                    setPage(1);
                                  }}
                                />
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                <input
                                  maxLength="10"
                                  minLength={10}
                                  value={DriversContact}
                                  className="form-control"
                                  placeholder="Mobile Number"
                                  onChange={handleChangeNumber}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="right-export-btn-section-wrapper">
                            <div className="customer-option">
                              <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                  <img src={Import} alt="" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <Link
                                      onClick={() =>
                                        getExportChat("active")
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
                            {" "}
                            <div
                              className="yauto "
                              id="TransportMananger_height"
                            >
                              <div className="row gx-3 main-cards-wrapper">
                                {DriversListActive &&
                                DriversListActive.length > 0 ? (
                                  DriversListActive.map((itemlist, index) => {
                                    return (
                                      <div
                                        className={
                                          sidebar
                                            ? "col-lg-4 col-md-6 mb-3"
                                            : "col-lg-3 col-md-6 mb-3"
                                        }
                                      >
                                        <div className="common-vehical-card-inner p-0 h-100 ">
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
                                                    
                                                    itemlist?.profilePic
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
                                                  {t("Driver Name")}
                                                </p>
                                                <p className="title">
                                                  {itemlist.userName}
                                                  {/* <span># 7</span> */}
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
                                                        "/ViewDrivers/" +
                                                        itemlist.userId
                                                      }
                                                      className="d-block"
                                                    >
                                                      {t("View")}
                                                    </Link>
                                                  </Dropdown.Item>
                                                  {userRole === "customer" ||
                                                  (accessRights &&
                                                    accessRights.rights_manage_driver) ? (
                                                    <>
                                                      <Dropdown.Item>
                                                        <Link
                                                          to={
                                                            "/AddDrivers/" +
                                                            itemlist.userId
                                                          }
                                                          className="d-block"
                                                        >
                                                          {t("Edit")}
                                                        </Link>
                                                      </Dropdown.Item>
                                                      <Dropdown.Item>
                                                        <Link
                                                          to="/ChangeDriverPassword"
                                                          className="d-block"
                                                          onClick={() => {
                                                            setTransportId(
                                                              itemlist.userId
                                                            );
                                                          }}
                                                        >
                                                          {t("Change Password")}
                                                        </Link>
                                                      </Dropdown.Item>
                                                      <Dropdown.Item
                                                        href="#"
                                                        onClick={handleShow1}
                                                      >
                                                        <Link
                                                          to="#"
                                                          className="d-block"
                                                          onClick={() => {
                                                            setBlockId(
                                                              itemlist.userId
                                                            );
                                                          }}
                                                        >
                                                          {t("Block")}
                                                        </Link>
                                                      </Dropdown.Item>
                                                      <Dropdown.Item
                                                        href="#"
                                                        onClick={handleShow2}
                                                      >
                                                        <Link
                                                          to="#"
                                                          className="d-block"
                                                          onClick={() => {
                                                            setResigned(
                                                              itemlist.userId
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
                                                {itemlist.email}
                                              </p>
                                            </div>
                                            <div className="card-contain col-lg-6">
                                              <p className="sub-heading">
                                                {t("Mobile Number")}
                                              </p>
                                              <p className="title">
                                                {itemlist.contact}
                                              </p>
                                            </div>
                                            <div className="card-contain col-lg-6">
                                              <p className="sub-heading">
                                                {t("Vehicle No.")}
                                              </p>
                                              <p className="title">
                                                {itemlist.assignedVehicles[0] &&
                                                  itemlist.assignedVehicles[0]
                                                    .number}
                                              </p>
                                            </div>
                                            <div className="card-contain col-lg-6">
                                              <p className="sub-heading">
                                                {t("Vehicle Assignment.")}
                                              </p>
                                              <p className="title">
                                                {itemlist.assignedVehicles[0] &&
                                                  itemlist.assignedVehicles[0]
                                                    .name}
                                              </p>
                                            </div>
                                            <div className="card-contain col-lg-12">
                                              <p className="sub-heading">
                                                {t("Address")}
                                              </p>
                                              <p className="title">
                                                {itemlist.address}
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
                              {/* {last_page === true ? <NoMoreDataComp /> : ""} */}
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
                                  placeholder="Driver Name"
                                  value={DriversName}
                                  onChange={(e) => {
                                    setDriversName(e.target.value);
                                    setPage(1);
                                  }}
                                />
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Driver Email"
                                  value={DriversEmail}
                                  onChange={(e) => {
                                    setDriversEmail(e.target.value);
                                    setPage(1);
                                  }}
                                />
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                <input
                                  maxLength="10"
                                  minLength={10}
                                  value={DriversContact}
                                  className="form-control"
                                  placeholder="Mobile Number"
                                  onChange={handleChangeNumber}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="right-export-btn-section-wrapper">
                            <div className="customer-option">
                              <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                  <img src={Import} alt="" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <Link
                                      onClick={() => getExportChat("inactive")}
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

                        <div>
                          {loading ? (
                            <Loader />
                          ) : (
                            <>
                              <div className="row gx-3 main-cards-wrapper">
                                {DriversUntrackede &&
                                DriversUntrackede.length > 0 ? (
                                  DriversUntrackede?.map(
                                    (itemActive, index) => {
                                      return (
                                        <div
                                          className={
                                            sidebar
                                              ? "col-lg-4 col-md-6 mb-3"
                                              : "col-lg-3 col-md-6 mb-3"
                                          }
                                          key={"itemActive" + index}
                                        >
                                          <div className="common-vehical-card-inner p-0 h-100">
                                            <div className="vehical-card-head vc-top">
                                              <div className="heading top-avatar-wrapper">
                                                {itemActive.profilePic === "" ||
                                                itemActive.profilePic ===
                                                  null ? (
                                                  <img
                                                    src={ImportUser}
                                                    alt=""
                                                    className="custom-Margin"
                                                  />
                                                ) : (
                                                  <img
                                                    src={
                                                      
                                                      itemActive.profilePic
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
                                                    {t("Driver Name")}
                                                  </p>
                                                  <p className="title">
                                                    {itemActive.userName}
                                                    {/* <span># 7</span> */}
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
                                                          "/ViewDrivers/" +
                                                          itemActive.userId
                                                        }
                                                        className="d-block"
                                                      >
                                                        {t("View")}
                                                      </Link>
                                                    </Dropdown.Item>
                                                    {userRole === "customer" ||
                                                    (accessRights &&
                                                      accessRights.rights_manage_driver) ? (
                                                      <>
                                                        <Dropdown.Item>
                                                          <Link
                                                            to={
                                                              "/AddDrivers/" +
                                                              itemActive.userId
                                                            }
                                                            className="d-block"
                                                          >
                                                            {t("Edit")}
                                                          </Link>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                          <Link
                                                            to="/ChangeDriverPassword"
                                                            className="d-block"
                                                            onClick={() => {
                                                              setTransportId(
                                                                itemActive.userId
                                                              );
                                                            }}
                                                          >
                                                            {t(
                                                              "Change Password"
                                                            )}
                                                          </Link>
                                                        </Dropdown.Item>
                                                        {itemActive.userStatus ===
                                                        "inactive" ? (
                                                          <Dropdown.Item
                                                            href="#"
                                                            onClick={
                                                              handleShowUnblock
                                                            }
                                                          >
                                                            <Link
                                                              to="#"
                                                              className="d-block"
                                                              onClick={() => {
                                                                setBlockId(
                                                                  itemActive.userId
                                                                );
                                                              }}
                                                            >
                                                              {t("UnBlock")}
                                                            </Link>
                                                          </Dropdown.Item>
                                                        ) : (
                                                          <></>
                                                        )}

                                                        {itemActive.userStatus ===
                                                        "inactive" ? (
                                                          <></>
                                                        ) : (
                                                          <Dropdown.Item
                                                            href="#"
                                                            onClick={
                                                              handleShowUnresing
                                                            }
                                                          >
                                                            <Link
                                                              to="#"
                                                              className="d-block"
                                                              onClick={() => {
                                                                setResigned(
                                                                  itemActive.userId
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
                                                  {itemActive.email}
                                                </p>
                                              </div>
                                              <div className="card-contain col-lg-6">
                                                <p className="sub-heading">
                                                  {t("Mobile Number")}
                                                </p>
                                                <p className="title">
                                                  {itemActive.contact}
                                                </p>
                                              </div>
                                              <div className="card-contain col-lg-6">
                                                <p className="sub-heading">
                                                  {t("Vehicle No.")}
                                                </p>
                                                <p className="title">
                                                  {itemActive
                                                    .assignedVehicles[0] &&
                                                    itemActive
                                                      .assignedVehicles[0]
                                                      .number}
                                                </p>
                                              </div>
                                              <div className="card-contain col-lg-6">
                                                <p className="sub-heading">
                                                  {t("Vehicle Assignment.")}
                                                </p>
                                                <p className="title">
                                                  {itemActive
                                                    .assignedVehicles[0] &&
                                                    itemActive
                                                      .assignedVehicles[0].name}
                                                </p>
                                              </div>
                                              <div className="card-contain col-lg-12">
                                                <p className="sub-heading">
                                                  {t("Address")}
                                                </p>
                                                <p className="title">
                                                  {itemActive.address}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )
                                ) : (
                                  <div>
                                    <div className=" no-data-found-wrapper ">
                                      <div className="no-data-found-inner-wrapper">
                                        <img src={no_data} alt="" />
                                        <p className="no-data-text">
                                          No Records to show
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                          {/* {last_page === true ? <NoMoreDataComp /> : ""} */}
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Tab.Container>
            </div>
            {currentTab == 0&&DriversListActive.length > 0&& <Pagenation
                    length={DriversListActive.length}
                    total={totalActive}
                  />}

{currentTab == 1&&DriversUntrackede.length > 0&&  <Pagenation
                    length={DriversUntrackede.length}
                    total={totalUntrak}
                  />}
            {/* {currentTab == 0
              ? DriversListActive.length > 0 && (
                  <Pagenation
                    length={DriversListActive.length}
                    total={totalActive}
                  />
                )
              : currentTab == 1
              ? DriversUntrackede.length > 0 && (
                  <Pagenation
                    length={DriversUntrackede.length}
                    total={totalUntrak}
                  />
                )
              : currentTab == 2
              ? DriversListinactive.length > 0 && (
                  <Pagenation
                    length={DriversListinactive.length}
                    total={totalInActive}
                  />
                )
              : DriversUntrackede.length > 0 && (
                  <Pagenation
                    length={DriversUntrackede?.length}
                    total={totalUntrak}
                  />
                )} */}
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
            <Modal.Title>{t("Deactivate Driver")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {t("Are you sure you want to Deactivate this Driver")} ?
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

        {/* UnBlock Modal Start */}
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
        {/* UnBlock Modal End */}

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
          show={showUnresign}
          onHide={handleCloseUnresing}
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
              <button className="cx-btn-1" onClick={handleCloseUnresing}>
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

export default Drivers;

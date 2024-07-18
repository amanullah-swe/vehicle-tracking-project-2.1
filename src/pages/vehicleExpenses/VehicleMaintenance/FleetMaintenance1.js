import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import DDlogo from "../../../assets/images/smallDD.svg";
import Calendar from "../../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Delete from "../../../assets/images/delete.svg";
import View from "../../../assets/images/Group.svg";
import EditIc from "../../../assets/images/ic-edit.svg";
import { Col, Modal, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import SideIc from "../../../assets/images/sideBar.svg";
import export_icon from "../../../assets/images/export_icon.svg";
import Form from "react-bootstrap/Form";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import { motion } from "framer-motion";
import Pagenation from "../../../sharedComponent/Pagenation";
import ApiConfig from "../../../api/ApiConfig";
import { simpleDeleteCall, simplePostCall } from "../../../api/ApiServices";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import { jsPDF } from "jspdf";
import { DateDDMMYYYY } from "../../../sharedComponent/common";
import Loader from "../../../sharedComponent/Loader";
import NoDataComp from "../../../sharedComponent/NoDataComp";

import { useTranslation } from "react-i18next";
const FleetMaintenance1 = () => {
  const { sidebar, setSidebar, Dark, setDark, loading, setLoading } =
    useContext(AppContext);
  const [startDate, setStartDate] = useState(new Date());
  const [deleteModal, setDeleteModal] = useState(false);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const { t, i18n } = useTranslation();

  const renderTooltipForEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit
    </Tooltip>
  );
  const renderTooltipForView = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      View
    </Tooltip>
  );
  const renderTooltipForDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete
    </Tooltip>
  );

  const [last_page, setlast_page] = useState(false);
  const [page, setPage] = useState(1);
  const [DeleteId, setDeleteId] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [FilterName, setFiltertName] = useState("");
  const [ItemName, setFiltertItem] = useState("");
  const [Filterdate, setFilterDate] = useState("");
  const [Filterqt, setFiltertqt] = useState("");
  const [fleetList, setFleetList] = useState([]);
  const [dusList, setDusList] = useState([]);
  const [upcomingList, setUpcomingList] = useState([]);
 const [HisteryList, setHisteryList] = useState([]);
  const [currentTab, setCurrentTab] = useState("0");
  const [FleetExportStatus, setFleetExportstaus] = useState("0");
  const handleSelect = () => {
    setPage(0);
    getSparepart(1);
    setFleetExportstaus("")
    // setVechicleName("");
    // setVechicleEmail("");
    // seVechicleContact("");
  };
  const handleSelectDua = () => {
    // geVechileinactive(1);
    setPage(0);
    getdusSparepart(1);
    setFleetExportstaus("dues")

    // setVechicleName("");
    // setVechicleEmail("");
    // seVechicleContact("");
  };
  const handleSelectUpcoming = () => {
    setPage(0);
    getupcomingSparepart(1);
    setFleetExportstaus("upcoming")

    // geVechileActive(1);
    // setVechicleName("");
    // setVechicleEmail("");
    // seVechicleContact("");
  };

  const handleSelectHistory = () => {
    setPage(0);
    getHisterySparepart(1);
    // geVechileActive(1);
    // setVechicleName("");
    // setVechicleEmail("");
    // seVechicleContact("");
  };

  useEffect(() => {
    handalFilter();
  }, [FilterName, ItemName, Filterdate, Filterqt]);

  useEffect(() => {
    if (page === 1) {
      getdusSparepart(page);
      getupcomingSparepart(page);
      getHisterySparepart(page);
      getSparepart(page);
      setLoading(true);
    }
  }, []);

  function getSparepart(currentPage) {
   
    let newRequestBody = JSON.stringify({
      page: currentPage,
      page_limit: "10",
      type: "",
    });
    simplePostCall(ApiConfig.VEHICLE_FLEET_LIST, newRequestBody)
      .then((data) => {
        
        if (data.result) {
          setTotalPages(data.total_count);
          setlast_page(data.last_page);
          let coursesData = data.data ? data.data : [];
          let LearningData = coursesData.map((eachteam, index) => {
            return {
              ...eachteam,
              fleat_maintenance_id: eachteam.fleat_maintenance_id || "",
              fleat_mantenance_task: eachteam.fleat_mantenance_task || "",
            };
          });

          if (currentPage === 1 || currentPage === 0) {
            setFleetList(data.data);
          } else {
            setFleetList([...fleetList, ...LearningData]);
            // setlast_page(false)
          }
        } else {
          setFleetList(0);
          setTotalPages(0);

          setlast_page(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getdusSparepart(currentPage) {
    let newRequestBody = JSON.stringify({
      page: currentPage,
      page_limit: "3",
      type: "dues",
    });
    simplePostCall(ApiConfig.VEHICLE_FLEET_LIST, newRequestBody)
      .then((data) => {
       
        if (data.result) {
          setTotalPages(data.total_count);
          setlast_page(data.last_page);
          let coursesData = data.data ? data.data : [];
          let LearningData = coursesData.map((eachteam, index) => {
            return {
              ...eachteam,
              fleat_maintenance_id: eachteam.fleat_maintenance_id || "",
              fleat_mantenance_task: eachteam.fleat_mantenance_task || "",
            };
          });

          if (currentPage === 1 || currentPage === 0) {
            setDusList(data.data);
          } else {
            setDusList([...dusList, ...LearningData]);
            // setlast_page(false)
          }
        } else {
          setDusList(0);
          setTotalPages(0);

          setlast_page(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getupcomingSparepart(currentPage) {

    let newRequestBody = JSON.stringify({
      page: currentPage,
      page_limit: "10",
      type: "upcoming",
    });
    simplePostCall(ApiConfig.VEHICLE_FLEET_LIST, newRequestBody)
      .then((data) => {
   
        if (data.result) {
          setTotalPages(data.total_count);
          setlast_page(data.last_page);
          let coursesData = data.data ? data.data : [];
          let LearningData = coursesData.map((eachteam, index) => {
            return {
              ...eachteam,
              fleat_maintenance_id: eachteam.fleat_maintenance_id || "",
              fleat_mantenance_task: eachteam.fleat_mantenance_task || "",
            };
          });

          if (currentPage === 1 || currentPage === 0) {
            setUpcomingList(data.data);
          } else {
            setUpcomingList([...upcomingList, ...LearningData]);
            // setlast_page(false)
          }
        } else {
          setUpcomingList(0);
          setTotalPages(0);

          setlast_page(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getHisterySparepart(currentPage) {

    let newRequestBody = JSON.stringify({
      page: currentPage,
      page_limit: "3",
      type: "histery",
    });
    simplePostCall(ApiConfig.VEHICLE_FLEET_LIST, newRequestBody)
      .then((data) => {

        if (data.result) {
          setTotalPages(data.total_count);
          setlast_page(data.last_page);
          let coursesData = data.data ? data.data : [];
          let LearningData = coursesData.map((eachteam, index) => {
            return {
              ...eachteam,
              fleat_maintenance_id: eachteam.fleat_maintenance_id || "",
              fleat_mantenance_task: eachteam.fleat_mantenance_task || "",
            };
          });

          if (currentPage === 1 || currentPage === 0) {
            setHisteryList(data.data);
          } else {
            setHisteryList([...HisteryList, ...LearningData]);
            setTotalPages(0);

            setlast_page(false);
          }
        } else {
          setHisteryList(0);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function userDelete() {
    let newRequestBody = JSON.stringify({
      maintainance_id: DeleteId,
    });
    simpleDeleteCall(ApiConfig.VEHICLEFLEET_DELETE, newRequestBody)
      .then((data) => {
        if (data.result) {
          notifySuccess(data.message);
          setDeleteModal(false);
          getSparepart(1);
          setPage(1);
        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  function handalFilter() {
    let newRequestBody = JSON.stringify({
      // page: "1",
      vehicle_code: FilterName,
      scheduled_duration: ItemName,
      start_date: Filterdate,
      next_due_date: Filterqt,
      type: FleetExportStatus,
      // spareparts_quantity: Filterqt,
    });
    simplePostCall(ApiConfig.VEHICLEFLEET_FILTER, newRequestBody)
      .then((data) => {
        if (data.result) {
          setTotalPages(data.total_count);
          setFleetList(data.data);
        } else {
          // notifyError(data.message);
          setFleetList(0);
          setTotalPages(0);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  function onPageLoad() {
    setPage(page + 1);

    currentTab == 0
      ? getSparepart(page + 1)
      : currentTab == 1
        ? getdusSparepart(page + 1)
        : currentTab == 2
          ? getupcomingSparepart(page + 1)
          : getHisterySparepart(page + 1);
  }






  /// Export 
  function handalExport() {
    if (
      FilterName === "" ||
      ItemName === "" ||
      Filterdate === "" ||
      Filterqt === ""
    ) {
      handalFilterExport();
    } else {
      getExportChat();
    }
  }
  
  function getExportChat() {
    let newRequestBody = JSON.stringify({
  
      type: FleetExportStatus,

    });
    simplePostCall(ApiConfig.FLEET_MANTENSE_LIST_EXPORT,newRequestBody)
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
  
  function handalFilterExport() {
    let newRequestBody = JSON.stringify({
      type:FleetExportStatus,
      vehicle_code: FilterName,
      scheduled_duration: ItemName,
      start_date: Filterdate,
      next_due_date: Filterqt,
    });
    simplePostCall(ApiConfig.VEHICLE_MANTENSE_FILTER, newRequestBody)
      .then((data) => {
        if (data.result) {
     
          pdfFormat(data.data);
        } else {
   
        }
      })
      .catch((error) => {
        console.log("api response", error);
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
    const title = "Fleet Maintenace";
    const headers = [["Sr. No.", "Vehicle Code", "Maintenance Task", "Scheduled Duration (H)"]];
    var data = [];
  
    pdfData.map((item, index) => {
      data.push([
        index + 1,
        item.vehicle_number,
        item.fleat_mantenance_task,
        item.fleat_mantenance_duration,
    
      ]);
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
  return (
    <>
      <motion.div
        className={sidebar ? "taskMain " : "cx-active taskMain"}
        id="cx-main"
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
      >
        <div id="cx-wrapper" className="Fleet_Maintenance">
          {/* Top inputs for instatnt search */}
          <div className="displayFlexInp">
            <div className="innerSelectBox weekCounter selectForm form_input_main">
              <Form.Control
                required
                type="text"
                placeholder="Vehicle Name"
                className="innerCust"
                onChange={(e) => {
                  setFiltertName(e.target.value);
                }}
              />
            </div>
            <div className="innerSelectBox weekCounter selectForm form_input_main">
              <Form.Control
                required
                type="text"
                placeholder="km / duration"
                className="innerCust"
                onChange={(e) => {
                  setFiltertItem(e.target.value);
                }}
              />
            </div>
            <div className="innerSelectBox weekCounter selectForm form_input_main datepicker-main">
              <input
                class="datepicker-here form-control digits"
                type="date"
                data-language="en"
                placeholder="MM-DD-YYYY"
                data-position="top left"
                name="submission_date"
                value={Filterdate}
                // onChange={(date) => setStartDate(date)}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
            <div className="innerSelectBox weekCounter selectForm form_input_main">
              <Form.Control
                required
                type="text"
                placeholder="Kilometers"
                className="innerCust"
              />
            </div>
            <div className="innerSelectBox weekCounter selectForm form_input_main datepicker-main">
              <input
                class="datepicker-here form-control digits"
                type="date"
                data-language="en"
                placeholder="MM-DD-YYYY"
                data-position="top left"
                name="submission_date"
                value={Filterqt}
                // onChange={(date) => setStartDate(date)}
                onChange={(e) => setFiltertqt(e.target.value)}
              />
            </div>
            <div className="innerSelectBox weekCounter selectForm form_input_main">
              <Link to="/AddFleetMaintainence" className="AddAccidentLink">
                <button className="innerCust">+ {t("Add New")}</button>
              </Link>
            </div>
            <div className="headerDivIc form_input_main">
              <Link to="#">
                <img src={SideIc} alt="" />
              </Link>
            </div>
            <div className="headerDivIc form_input_main">
              <Link to="#">
              <img  onClick={() => handalExport()} src={export_icon} alt="" />

              </Link>
            </div>
          </div>

          {/* Vehicle table */}
          <div className="Vehcle-main-tabs" id="Vehcle-main-tabs">
            <div className="main-master-wrapper mb-0 inner-tabs-section">
              <div
                id="scroll_insideThe_Padding_tabel"
                onScroll={(e) => {
                  const bottom =
                    e.target.scrollHeight - e.target.scrollTop ===
                    e.target.clientHeight;

                  if (bottom && !last_page) onPageLoad();
                }}
              >
                <div className="VA_table">
                  <Tab.Container
                    id="left-tabs-example"
                    className="td-tab-wrapper"
                    defaultActiveKey="0"
                  >
                    <Nav
                      variant="pills"
                      className="td-nav"
                      id="InnerTabNew_Foure"
                      onSelect={(selectedKey) =>
                        setCurrentTab(`${selectedKey}`)
                      }
                    >
                      <Nav.Item className="td-tab">
                        <Nav.Link
                          className="td-link"
                          eventKey="0"
                          onClick={handleSelect}
                        >
                          {t("All")}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="td-tab">
                        <Nav.Link
                          className="td-link"
                          eventKey="1"
                          onClick={handleSelectDua}
                        >
                          {t("Dues")}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="td-tab">
                        <Nav.Link
                          className="td-link"
                          eventKey="2"
                          onClick={handleSelectUpcoming}
                        >
                          {t("Upcoming")}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="td-tab">
                        <Nav.Link
                          className="td-link"
                          eventKey="3"
                          onClick={handleSelectHistory}
                        >
                          {t("History")}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Col sm={12} className="">
                      {loading ? (
                        <Loader />
                      ) : (
                        <>
                          <Tab.Content>
                            <Tab.Pane eventKey="0">
                              <div className="scroller">
                                <table className="table tableAdmin">
                                  <thead className="tableHead">
                                    <tr>
                                      <th>{t("Sr.no")}</th>
                                      <th>{t("Vehicle Code")}</th>
                                      <th>{t("Maintenance Task")}</th>
                                      <th>{t("Scheduled Duration")} (H)</th>
                                      <th>{t("Start Date")}</th>
                                      <th>{t("Next Due Date")}</th>
                                      <th>{t("Type of Task")}</th>
                                      <th>{t("Action")}</th>
                                    </tr>
                                  </thead>
                                  {fleetList && fleetList.length > 0 ? (
                                    fleetList.map((itemlist, index) => {
                                      return (
                                        <tbody className="tableBody">
                                          <tr>
                                            <td>{index + 1}</td>
                                            <td>{itemlist.vehicle_number}</td>
                                            <td>
                                              {itemlist.fleat_mantenance_task}
                                            </td>
                                            <td>
                                              {
                                                itemlist.fleat_mantenance_duration
                                              }
                                            </td>
                                            <td>
                                              {DateDDMMYYYY(
                                                itemlist.fleat_mantenance_start_date
                                              )}
                                            </td>
                                            <td>
                                              {DateDDMMYYYY(
                                                itemlist.fleat_mantenance_next_due_date
                                              )}
                                            </td>
                                            <td>
                                              {
                                                itemlist.fleat_mantenance_task_type
                                              }
                                            </td>
                                            <td>
                                              <div className="innerFlex d-flex">
                                                <OverlayTrigger
                                                  placement="bottom"
                                                  delay={{
                                                    show: 250,
                                                    hide: 400,
                                                  }}
                                                  overlay={renderTooltipForView}
                                                >
                                                  <Link
                                                    to={
                                                      "/ViewFleetMaintainence/" +
                                                      itemlist.fleat_maintenance_id
                                                    }
                                                  >
                                                    <div className="inconsIn me-3">
                                                      <img src={View} alt="" />
                                                    </div>
                                                  </Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                  placement="bottom"
                                                  delay={{
                                                    show: 250,
                                                    hide: 400,
                                                  }}
                                                  overlay={renderTooltipForEdit}
                                                >
                                                  <Link
                                                    to={
                                                      "/AddFleetMaintainence/" +
                                                      itemlist.fleat_maintenance_id
                                                    }
                                                  >
                                                    <div className="inconsIn me-3">
                                                      <img
                                                        src={EditIc}
                                                        alt=""
                                                      />
                                                    </div>
                                                  </Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                  placement="bottom"
                                                  delay={{
                                                    show: 250,
                                                    hide: 400,
                                                  }}
                                                  overlay={
                                                    renderTooltipForDelete
                                                  }
                                                >
                                                  <Link
                                                    to="#"
                                                    onClick={() => {
                                                      setDeleteId(
                                                        itemlist.fleat_maintenance_id
                                                      );
                                                      setDeleteModal(true);
                                                    }}
                                                  >
                                                    <div className="inconsIn">
                                                      <img
                                                        src={Delete}
                                                        alt=""
                                                      />
                                                    </div>
                                                  </Link>
                                                </OverlayTrigger>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </table>
                                {last_page === true ? (
                                  <p
                                    style={{
                                      textAlign: "center",
                                      marginTop: "20px",
                                      color: "#9c4900",
                                    }}
                                  >
                                    <b>No More data Found</b>
                                  </p>
                                ) : (
                                  ""
                                )}
                                {fleetList.length > 0 ? "" : <NoDataComp />}
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="1">
                              <div className="scroller">
                                <table className="table tableAdmin">
                                  <thead className="tableHead">
                                    <tr>
                                      <th>{t("Sr.no")}</th>
                                      <th>{t("Vehicle Code")}</th>
                                      <th>{t("Maintenance Task")}</th>
                                      <th>{t("Scheduled Duration")} (H)</th>
                                      <th>{t("Start Date")}</th>
                                      <th>{t("Next Due Date")}</th>
                                      <th>{t("Type of Task")}</th>
                                      <th>{t("Action")}</th>
                                    </tr>
                                  </thead>
                                  {dusList && dusList.length > 0 ? (
                                    dusList.map((itemDua, index) => {
                                      return (
                                        <tbody className="tableBody">
                                          <tr>
                                            <td>{index + 1}</td>
                                            <td>{itemDua.vehicle_number}</td>
                                            <td>
                                              {itemDua.fleat_mantenance_task}
                                            </td>
                                            <td>
                                              {
                                                itemDua.fleat_mantenance_duration
                                              }
                                            </td>
                                            <td>
                                              {DateDDMMYYYY(
                                                itemDua.fleat_mantenance_start_date
                                              )}
                                            </td>
                                            <td>
                                              {DateDDMMYYYY(
                                                itemDua.fleat_mantenance_next_due_date
                                              )}
                                            </td>
                                            <td>
                                              {
                                                itemDua.fleat_mantenance_task_type
                                              }
                                            </td>
                                            <td>
                                              <div className="innerFlex d-flex">
                                                <OverlayTrigger
                                                  placement="bottom"
                                                  delay={{
                                                    show: 250,
                                                    hide: 400,
                                                  }}
                                                  overlay={renderTooltipForView}
                                                >
                                                  <Link
                                                    to={
                                                      "/ViewFleetMaintainence/" +
                                                      itemDua.fleat_maintenance_id
                                                    }
                                                  >
                                                    <div className="inconsIn me-3">
                                                      <img src={View} alt="" />
                                                    </div>
                                                  </Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                  placement="bottom"
                                                  delay={{
                                                    show: 250,
                                                    hide: 400,
                                                  }}
                                                  overlay={renderTooltipForEdit}
                                                >
                                                  <Link
                                                    to={
                                                      "/AddFleetMaintainence/" +
                                                      itemDua.fleat_maintenance_id
                                                    }
                                                  >
                                                    <div className="inconsIn me-3">
                                                      <img
                                                        src={EditIc}
                                                        alt=""
                                                      />
                                                    </div>
                                                  </Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                  placement="bottom"
                                                  delay={{
                                                    show: 250,
                                                    hide: 400,
                                                  }}
                                                  overlay={
                                                    renderTooltipForDelete
                                                  }
                                                >
                                                  <Link
                                                    to="#"
                                                    onClick={() => {
                                                      setDeleteId(
                                                        itemDua.fleat_maintenance_id
                                                      );
                                                      setDeleteModal(true);
                                                    }}
                                                  >
                                                    <div className="inconsIn">
                                                      <img
                                                        src={Delete}
                                                        alt=""
                                                      />
                                                    </div>
                                                  </Link>
                                                </OverlayTrigger>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </table>
                                {last_page === true ? (
                                  <p
                                    style={{
                                      textAlign: "center",
                                      marginTop: "20px",
                                      color: "#9c4900",
                                    }}
                                  >
                                    <b>No More data Found</b>
                                  </p>
                                ) : (
                                  ""
                                )}
                                {dusList.length > 0 ? "" : <NoDataComp />}
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="2">
                              <div className="scroller">
                                <table className="table tableAdmin">
                                  <thead className="tableHead">
                                    <tr>
                                      <th>{t("Sr.no")}</th>
                                      <th>{t("Vehicle Code")}</th>
                                      <th>{t("Maintenance Task")}</th>
                                      <th>{t("Scheduled Duration")} (H)</th>
                                      <th>{t("Start Date")}</th>
                                      <th>{t("Next Due Date")}</th>
                                      <th>{t("Type of Task")}</th>
                                      <th>{t("Action")}</th>
                                    </tr>
                                  </thead>
                                  {upcomingList && upcomingList.length > 0 ? (
                                    upcomingList.map((itemlist, index) => {
                                      return (
                                        <tbody className="tableBody">
                                          <tr>
                                            <td>{index + 1}</td>
                                            <td>{itemlist.vehicle_number}</td>
                                            <td>
                                              {itemlist.fleat_mantenance_task}
                                            </td>
                                            <td>
                                              {
                                                itemlist.fleat_mantenance_duration
                                              }
                                            </td>
                                            <td>
                                              {DateDDMMYYYY(
                                                itemlist.fleat_mantenance_start_date
                                              )}
                                            </td>
                                            <td>
                                              {DateDDMMYYYY(
                                                itemlist.fleat_mantenance_next_due_date
                                              )}
                                            </td>
                                            <td>
                                              {
                                                itemlist.fleat_mantenance_task_type
                                              }
                                            </td>
                                            <td>
                                              <div className="innerFlex d-flex">
                                                <OverlayTrigger
                                                  placement="bottom"
                                                  delay={{
                                                    show: 250,
                                                    hide: 400,
                                                  }}
                                                  overlay={renderTooltipForView}
                                                >
                                                  <Link
                                                    to={
                                                      "/ViewFleetMaintainence/" +
                                                      itemlist.fleat_maintenance_id
                                                    }
                                                  >
                                                    <div className="inconsIn me-3">
                                                      <img src={View} alt="" />
                                                    </div>
                                                  </Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                  placement="bottom"
                                                  delay={{
                                                    show: 250,
                                                    hide: 400,
                                                  }}
                                                  overlay={renderTooltipForEdit}
                                                >
                                                  <Link
                                                    to={
                                                      "/AddFleetMaintainence/" +
                                                      itemlist.fleat_maintenance_id
                                                    }
                                                  >
                                                    <div className="inconsIn me-3">
                                                      <img
                                                        src={EditIc}
                                                        alt=""
                                                      />
                                                    </div>
                                                  </Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                  placement="bottom"
                                                  delay={{
                                                    show: 250,
                                                    hide: 400,
                                                  }}
                                                  overlay={
                                                    renderTooltipForDelete
                                                  }
                                                >
                                                  <Link
                                                    to="#"
                                                    onClick={() => {
                                                      setDeleteId(
                                                        itemlist.fleat_maintenance_id
                                                      );
                                                      setDeleteModal(true);
                                                    }}
                                                  >
                                                    <div className="inconsIn">
                                                      <img
                                                        src={Delete}
                                                        alt=""
                                                      />
                                                    </div>
                                                  </Link>
                                                </OverlayTrigger>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </table>
                                {last_page === true ? (
                                  <p
                                    style={{
                                      textAlign: "center",
                                      marginTop: "20px",
                                      color: "#9c4900",
                                    }}
                                  >
                                    <b>No More data Found</b>
                                  </p>
                                ) : (
                                  ""
                                )}
                                {upcomingList.length > 0 ? "" : <NoDataComp />}
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="3">
                              <div className="scroller">
                                <table className="table tableAdmin">
                                  <thead className="tableHead">
                                    <tr>
                                    <th>{t("Sr.no")}</th>
                                      <th>{t("Vehicle Code")}</th>
                                      <th>{t("Maintenance Task")}</th>
                                      <th>{t("Scheduled Duration")} (H)</th>
                                      <th>{t("Start Date")}</th>
                                      <th>{t("Next Due Date")}</th>
                                      <th>{t("Type of Task")}</th>
                                      <th>{t("Action")}</th>
                                    </tr>
                                  </thead>
                                  {HisteryList && HisteryList.length > 0 ? (
                                    HisteryList.map((itemlist, index) => {
                                      return (
                                        <tbody className="tableBody">
                                          <tr>
                                            <td>{index + 1}</td>
                                            <td>{itemlist.vehicle_number}</td>
                                            <td>
                                              {itemlist.fleat_mantenance_task}
                                            </td>
                                            <td>
                                              {
                                                itemlist.fleat_mantenance_duration
                                              }
                                            </td>
                                            <td>
                                              {DateDDMMYYYY(
                                                itemlist.fleat_mantenance_start_date
                                              )}
                                            </td>
                                            <td>
                                              {DateDDMMYYYY(
                                                itemlist.fleat_mantenance_next_due_date
                                              )}
                                            </td>
                                            <td>
                                              {
                                                itemlist.fleat_mantenance_task_type
                                              }
                                            </td>
                                            <td>
                                              <div className="innerFlex d-flex">
                                                <OverlayTrigger
                                                  placement="bottom"
                                                  delay={{
                                                    show: 250,
                                                    hide: 400,
                                                  }}
                                                  overlay={renderTooltipForView}
                                                >
                                                  <Link
                                                    to={
                                                      "/ViewFleetMaintainence/" +
                                                      itemlist.fleat_maintenance_id
                                                    }
                                                  >
                                                    <div className="inconsIn me-3">
                                                      <img src={View} alt="" />
                                                    </div>
                                                  </Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                  placement="bottom"
                                                  delay={{
                                                    show: 250,
                                                    hide: 400,
                                                  }}
                                                  overlay={renderTooltipForEdit}
                                                >
                                                  <Link
                                                    to={
                                                      "/AddFleetMaintainence/" +
                                                      itemlist.fleat_maintenance_id
                                                    }
                                                  >
                                                    <div className="inconsIn me-3">
                                                      <img
                                                        src={EditIc}
                                                        alt=""
                                                      />
                                                    </div>
                                                  </Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                  placement="bottom"
                                                  delay={{
                                                    show: 250,
                                                    hide: 400,
                                                  }}
                                                  overlay={
                                                    renderTooltipForDelete
                                                  }
                                                >
                                                  <Link
                                                    to="#"
                                                    onClick={() => {
                                                      setDeleteId(
                                                        itemlist.fleat_maintenance_id
                                                      );
                                                      setDeleteModal(true);
                                                    }}
                                                  >
                                                    <div className="inconsIn">
                                                      <img
                                                        src={Delete}
                                                        alt=""
                                                      />
                                                    </div>
                                                  </Link>
                                                </OverlayTrigger>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </table>
                                {HisteryList.length > 0 ? "" : <NoDataComp />}
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        </>
                      )}
                    </Col>
                  </Tab.Container>

                </div>
              </div>
              {currentTab == 0 ? (
                <Pagenation length={fleetList.length} total={totalPages} />
              ) : currentTab == 1 ? (
                <Pagenation length={dusList.length} total={totalPages} />
              ) : currentTab == 2 ? (
                <Pagenation length={upcomingList.length} total={totalPages} />
              ) : (
                <Pagenation length={HisteryList.length} total={totalPages} />
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delete Modal Start */}
      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        centered
        className="common-model"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("Delete Fleet Maintenance")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("Are you sure you want to Delete this Fleet Maintenance")} ?
        </Modal.Body>
        <Modal.Footer className="pop-up-modal-footer">
          <div class="btn-wrapper">
            <button className="cx-btn-1" onClick={() => setDeleteModal(false)}>
              {t("Cancel")}
            </button>
            <button className="cx-btn-2" onClick={() => userDelete()}>
              Yes
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal End */}
    </>
  );
};

export default FleetMaintenance1;

import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import delete_icon from "../../assets/images/delete.svg";
import { Tab, Tabs, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import import_icon from "../../assets/images/import_icon.svg";
import export_icon from "../../assets/images/export_icon.svg";
import edit_icon from "../../assets/images/ic-edit.svg";
import { Button, Dropdown, Modal } from "react-bootstrap";
import Calendar from "../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import Pagenation from "../../sharedComponent/Pagenation";
import { simpleDeleteCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import Loader from "../../sharedComponent/Loader";
import {
  DateDDMMYYYY,
  dateInYYYYMMDDFormat,
  latestDate,
} from "../../sharedComponent/common";
import CommonDatePicker from "../../sharedComponent/CommonDatePicker";
import { useTranslation } from "react-i18next";
import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";
import FileSaver from "file-saver";
import NoDataComp from "../../sharedComponent/NoDataComp";

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const Vacations = () => {
  const accessRights = useSelector((state) => state?.auth.accessRights);
  const userRole = accessRights && accessRights?.rights_role;
  const {
    sidebar,
    setSidebar,
    recordsPerPage,
    Dark,
    setDark,
    useDebounce,
    DateFormatConfig,
  } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const { t, i18n } = useTranslation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loader, setLoader] = useState(true);
  const [deleteID, setDeleteID] = useState("");
  const [vacationList, setvacationList] = useState([]);
  const [last_page, setlast_page] = useState(false);
  const [page, setPage] = useState(1);
  const [total_count, setTotal_count] = useState(null);
  const [filter, setFilter] = useState({
    vacationName: "",
    startDate: "",
    endDate: "",
  });
  const debouncedSearchTerm = useDebounce(filter, 500);
  useEffect(() => {
    getFilterVacation(1, "tab");
  }, [debouncedSearchTerm]);
  const getFilterVacation = (page, tab) => {
    page == 1 && setLoader(true);
    simplePostCall(
      ApiConfig.VACATION,
      JSON.stringify({
        vacationName: filter?.vacationName,
        vacationStartDate: latestDate(filter?.startDate, "yyyy-MM-dd"),
        vacationEndDate: latestDate(filter?.endDate, "yyyy-MM-dd"),
        page: page,
        page_limit: recordsPerPage,
      })
    )
      .then((res) => {
        setLoader(false);
        if (res.result == true) {
          if (tab === "tab") {
            setvacationList(res?.data);
          } else {
            setvacationList([...vacationList, ...res?.data]);
          }

          setlast_page(res.last_page);
          setTotal_count(res.total_count);
        } else {
          setvacationList(res.data);
          // notifyError(res.message);
        }
      })
      .catch((err) => {
        console.log("api response", err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const vocationtDelete = () => {
    handleClose();
    simpleDeleteCall(
      ApiConfig.VACATION_DELETE,
      JSON.stringify({ vacationId: deleteID })
    )
      .then((res) => {
        if (res.result === true) {
          notifySuccess(res.message);
          setvacationList(
            vacationList.filter((item) => item.vacation_id !== deleteID)
          );
          setTotal_count(total_count - 1);
          //  getFilterVacation(page)
        } else {
          notifyError(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  const renderTooltipForEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("Edit")}
    </Tooltip>
  );
  const renderTooltipForDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("Delete")}
    </Tooltip>
  );

  //Export
  function getExportChat() {
    simplePostCall(
      ApiConfig.VACATION_LIST_EXPORT,
      JSON.stringify({
        vacationName: filter?.vacationName,
        vacationStartDate: latestDate(filter?.startDate, "yyyy-MM-dd"),
        vacationEndDate: latestDate(filter?.endDate, "yyyy-MM-dd"),
        page: page,
      })
    )
      .then((data) => {
        if (data.result) {
          pdfFormat(data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {});
  }

  const pdfFormat = (pdfData) => {
    // let chatsData = await getExportChat()
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Vacation";
    const headers = [["Sr. No.", "Vacation Name", "Description", "Status"]];
    var data = [];

    pdfData.map((item, index) => {
      data.push([
        index + 1,
        item.vacation_name,
        item.vacation_desc,
        item.vacation_status,
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
  const downLoadExcelSheet = () => {
    simplePostCall(
      ApiConfig.VACATION_LIST_EXPORT,
      JSON.stringify({
        vacationName: filter?.vacationName,
        vacationStartDate: latestDate(filter?.startDate, "yyyy-MM-dd"),
        vacationEndDate: latestDate(filter?.endDate, "yyyy-MM-dd"),
        format: "Excel",
      })
    )
      .then((res) => {
        if (res?.result === true) {
          FileSaver.saveAs(ApiConfig.BASE_URL + res.filePath);
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        <div id="cx-wrapper" className="Vacations_Main">
          <div className="holidays-filter-wrapper">
            <div className="left-wrapper">
              <div className="row g-0 d-flex justify-content-between">
                <div className="col-md-4">
                  <div className="search-input">
                    <Form className="">
                      <Form.Control
                        type="search"
                        placeholder={t("Vacation Name")}
                        aria-label="Search"
                        value={filter.vacationName}
                        onChange={(e) => {
                          setPage(1);
                          setFilter({
                            ...filter,
                            vacationName: e.target.value,
                            startDate: "",
                            endDate: "",
                          });

                          setvacationList([]);
                        }}
                      />
                    </Form>
                  </div>
                </div>
                <div className="col-md-4" style={{ width: "190px" }}>
                  <div className="date-input">
                    <div className="innerSelectBox weekCounter datepicker-main">
                      <CommonDatePicker
                        dateKey="startDate"
                        setDate={setFilter}
                        data={filter}
                        SetPlaceholder={t("Start Date")}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="date-input">
                    <div className="innerSelectBox weekCounter datepicker-main">
                      <CommonDatePicker
                        dateKey="endDate"
                        setDate={setFilter}
                        data={filter}
                        minDate={filter.startDate}
                        SetPlaceholder={t("End Date")}
                        // keyDisable={filter.startDate}
                      />
                      {/* <DatePicker
                   
                        selected={filter.endDate}
                        onChange={(date) => {
                          setvacationList([])
                          setFilter({
                            ...filter,
                            endDate: date
                          })
                        }}

                        placeholderText="End Date"
                        className="form-control"
                      /> */}
                      {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* rights_manage_vacation */}
            <div className="right-wrapper">
              {/* <div className="right-export-btn-section-wrapper col-md-3 ">
                <button
                            class={
                              (filter.vacationName?.length || filter.startDate?.length ||filter.endDate.length) == 0
                                ? "cx-btn-3 me-3"
                                : "btn-active-ann me-3"
                            }
                            onClick={() => {
                              setvacationList([])
                            setFilter({
                              vacationName: "",
                              startDate: "",
                              endDate: "",
                            })
                            }}
                          >
                            {t("Clear Filter")}
                          </button>
                          </div> */}
              {userRole === "customer" ||
              (accessRights && accessRights?.rights_manage_vacation) ? (
                <Link
                  to="/AddVacation"
                  className="add-holiday-btn"
                  variant="primary"
                >
                  + {t("Add Vacation")}
                </Link>
              ) : null}
              <div className="md_dropdown">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <img src={export_icon} alt="" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link onClick={() => getExportChat()} className="d-block">
                        {t("PDF")}
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link
                        onClick={() => downLoadExcelSheet()}
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
          <div className="main-master-wrapper mt-2">
            {loader ? (
              <Loader />
            ) : (
              <>
                <div
                  id="scroll_insideThe_Padding13"
                  onScroll={(e) => {
                    const bottom =
                      e.target.scrollHeight - e.target.scrollTop ===
                      e.target.clientHeight;

                    if (bottom && !last_page) {
                      setPage(page + 1);
                      getFilterVacation(page + 1);
                    }
                  }}
                >
                  <table className="holiday-table">
                    <thead className="ht-head">
                      <tr>
                        <td>{t("Sr.No.")}</td>
                        <td>{t("Vacation Name")}</td>
                        <td>{t("Start Date")}</td>
                        <td>{t("End Date")}</td>
                        <td>{t("Description")}</td>
                        <td>{t("Status")}</td>
                        {userRole === "customer" ||
                        (accessRights &&
                          accessRights?.rights_manage_vacation) ? (
                          <td>{t("Action")}</td>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody className="ht-body">
                      {vacationList && vacationList?.length > 0 ? (
                        vacationList.map((item, index) => {
                          return (
                            <tr
                              className="table-row-custom"
                              key={"testvacation" + index}
                            >
                              <td>{index + 1}</td>
                              <td>{item?.vacation_name}</td>
                              <td>{DateDDMMYYYY(item?.vacation_start_date)}</td>
                              <td>{DateDDMMYYYY(item?.vacation_end_date)}</td>
                              <td>{item?.vacation_desc}</td>
                              <td>
                                {item?.vacation_status === "active"
                                  ? t("active")
                                  : item?.vacation_status}
                              </td>
                              {userRole === "customer" ||
                              (accessRights &&
                                accessRights?.rights_manage_vacation) ? (
                                <td className="d-flex align-items-center">
                                  <OverlayTrigger
                                    placement="left"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipForEdit}
                                  >
                                    <Link
                                      to={"/AddVacation/" + item?.vacation_id}
                                    >
                                      <div className="inconsIn">
                                        <img src={edit_icon} alt="" />
                                      </div>
                                    </Link>
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipForDelete}
                                  >
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        setDeleteID(item?.vacation_id);
                                        handleShow();
                                      }}
                                    >
                                      <div className="inconsIn">
                                        <img src={delete_icon} alt="" />
                                      </div>
                                    </Link>
                                  </OverlayTrigger>
                                </td>
                              ) : null}
                            </tr>
                          );
                        })
                      ) : (
                        <NoDataComp />
                      )}
                    </tbody>
                  </table>
                  {vacationList?.length > 0 && (
                    <Pagenation
                      length={vacationList && vacationList.length}
                      total={total_count}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
      <Modal show={show} onHide={handleClose} centered className="common-model">
        <Modal.Header closeButton>
          <Modal.Title>{t("Delete Vacation")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("Are you sure you want to delete this Vacation")} ?
        </Modal.Body>
        <Modal.Footer className="pop-up-modal-footer btn-wrapper">
          <button className="cx-btn-1" onClick={handleClose}>
            {t("Close")}
          </button>
          <button className="cx-btn-2" onClick={vocationtDelete}>
            {t("Yes")}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Vacations;

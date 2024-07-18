import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import delete_icon from "../../assets/images/delete.svg";
import { Tab, Tabs, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Calendar from "../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import import_icon from "../../assets/images/import_icon.svg";
import export_icon from "../../assets/images/export_icon.svg";
import edit_icon from "../../assets/images/ic-edit.svg";
import { Button, Dropdown, Modal } from "react-bootstrap";
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
import { useTranslation } from "react-i18next";
import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";
import FileSaver from "file-saver";
import CommonDatePicker from "../../sharedComponent/CommonDatePicker";
import NoDataComp from "../../sharedComponent/NoDataComp";

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const Holidays = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights?.rights_role;
  const {
    sidebar,
    setSidebar,
    Dark,
    setDark,
    recordsPerPage,
    useDebounce,
    DateFormatConfig,
  } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [last_page, setlast_page] = useState(false);
  const [page, setPage] = useState(1);
  const [total_count, setTotal_count] = useState(null);
  const [holidayData, setHolidayData] = useState([]);
  const [holidayDeleteID, setHolidayDeleteID] = useState("");
  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState({ holidayDate_search: "" });
  const [bottom1, setBottom1] = useState(false);
  const debouncedSearchTerm = useDebounce(holidayName, 500);
  const debouncedSearchTerm1 = useDebounce(holidayDate.holidayDate_search, 500);
  useEffect(() => {
    setBottom1(false);
    setPage(1);
    holidaysAllList(1, "tab");
  }, [debouncedSearchTerm, debouncedSearchTerm1]);
  const { t, i18n } = useTranslation();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const holidaysAllList = (page, tab) => {
    page == 1 && setLoader(true);
    simplePostCall(
      ApiConfig.HOLIDAYSLIST,
      JSON.stringify({
        holiday_name: holidayName,
        holiday_date: holidayDate?.holidayDate_search
          ? latestDate(holidayDate?.holidayDate_search, "yyyy-MM-dd")
          : "",
        page: page,
        page_limit: recordsPerPage,
      })
    )
      .then((res) => {
        setLoader(false);
        if (res.result === true) {
          if (tab == "tab") {
            setHolidayData(res?.data);
          } else {
            setHolidayData([...holidayData, ...res.data]);
          }
          setlast_page(res?.last_page);
          setTotal_count(res.total_count);
        } else {
          setHolidayData([]);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const holidayslistDelete = () => {
    handleClose();
    simplePostCall(
      ApiConfig.HOLIDAYSLIST_DELETE,
      JSON.stringify({ holiday_id: holidayDeleteID })
    )
      .then((res) => {
        if (res.result === true) {
          notifySuccess(res.message);
          setHolidayData(
            holidayData.filter((item) => item.holiday_id !== holidayDeleteID)
          );
          setTotal_count(total_count - 1);
        } else {
        }
      })
      .catch((error) => {
        console.log("error response", error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  //Export
  function getExportChat() {
    let newRequestBody = JSON.stringify({
      holiday_name: holidayName,
      holiday_date: latestDate(holidayDate?.holidayDate_search, "yyyy-MM-dd"),
    });
    simplePostCall(ApiConfig.HOLIDAYA_LIST_EXPORT, newRequestBody)
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
        setLoader(false);
      });
  }

  const pdfFormat = (pdfData) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Holidays";
    const headers = [["Sr. No.", "Name", "Description", "Status"]];
    var data = [];

    pdfData.map((item, index) => {
      data.push([
        index + 1,
        item.holiday_name,
        item.holiday_desc,
        item.holiday_status,
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

  //exale
  const downLoadExcelSheet = () => {
    let newRequestBody = JSON.stringify({
      holiday_name: holidayName,
      holiday_date: latestDate(holidayDate?.holidayDate_search, "yyyy-MM-dd"),
      format: "Excel",
    });
    simplePostCall(ApiConfig.HOLIDAYA_LIST_EXPORT, newRequestBody)
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
        <div id="cx-wrapper" className="Holidays_Main">
          <div className="holidays-filter-wrapper">
            <div className="left-wrapper">
              <div className="row g-0 d-flex justify-content-between">
                <div className="col-md-6">
                  <div className="search-input">
                    <Form className="">
                      <Form.Control
                        type="search"
                        placeholder={t("Holiday Name")}
                        aria-label="Search"
                        onChange={(e) => {
                          setHolidayData([]);
                          setHolidayName(e.target.value);
                          setPage(1);
                        }}
                      />
                    </Form>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="innerSelectBox weekCounter datepicker-main">
                    <CommonDatePicker
                      dateKey="holidayDate_search"
                      setDate={setHolidayDate}
                      data={holidayDate}
                    />
                    {/* <img
                      src={Calendar}
                      className="calendarLogo"
                      alt=""
                    />  */}
                  </div>
                </div>
              </div>
            </div>
            <div className="right-wrapper">
              {userRole === "customer" ||
              (accessRights && accessRights?.rights_manage_holiday) ? (
                <Link
                  to="/AddHolidays"
                  className="add-holiday-btn"
                  variant="primary"
                >
                  + {t("Add Holiday")}
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

          <div
            className="main-master-wrapper mt-2 "
            id="scroll_insideThe_Padding3"
          >
            {loader ? (
              <Loader />
            ) : (
              <div
                id="scroll_insideThe_Padding3"
                onScroll={(e) => {
                  setBottom1(e ? true : false);
                  const bottom =
                    e.target.scrollHeight - e.target.scrollTop ===
                    e.target.clientHeight;
                  if (bottom1 && bottom && last_page !== true) {
                    holidaysAllList(page + 1);
                    setPage(page + 1);
                  }
                }}
              >
                <table className="holiday-table ">
                  <thead className="ht-head">
                    <tr>
                      <td>{t("Sr.No.")}</td>
                      <td>{t("Holiday Name")}</td>
                      <td>{t("Date")}</td>
                      <td>{t("Description")}</td>
                      <td>{t("Status")}</td>
                      {userRole === "customer" ||
                      (accessRights && accessRights?.rights_manage_holiday) ? (
                        <td>{t("Action")}</td>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody className="ht-body">
                    {holidayData && holidayData?.length > 0 ? (
                      holidayData.map((listdata, index) => {
                        return (
                          <tr
                            className="table-row-custom"
                            key={"listadat" + index}
                          >
                            <td>{index + 1}</td>
                            <td>{listdata.holiday_name}</td>
                            <td>{DateDDMMYYYY(listdata.holiday_date)}</td>
                            <td>{listdata.holiday_desc}</td>
                            <td>{listdata.holiday_status}</td>
                            {userRole === "customer" ||
                            (accessRights &&
                              accessRights?.rights_manage_holiday) ? (
                              <td>
                                <Link
                                  to={"/AddHolidays/" + listdata.holiday_id}
                                >
                                  <img src={edit_icon} alt="" />
                                </Link>
                                <Link
                                  to="#"
                                  onClick={() => {
                                    setHolidayDeleteID(listdata.holiday_id);
                                    handleShow();
                                  }}
                                >
                                  <img src={delete_icon} alt="" />
                                </Link>
                              </td>
                            ) : null}
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="text-danger d-flex justify-content-center ">
                        <td colSpan={6}>
                          <div className="w-100">
                            {" "}
                            <NoDataComp />
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {holidayData?.length > 0 && (
              <Pagenation length={holidayData?.length} total={total_count} />
            )}
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Delete Holiday")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {t("Are you sure you want to delete this Holiday")} ?
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer">
              <button className="cx-btn-1" onClick={handleClose}>
                {t("Close")}
              </button>
              <button className="cx-btn-2" onClick={holidayslistDelete}>
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </motion.div>
    </>
  );
};

export default Holidays;

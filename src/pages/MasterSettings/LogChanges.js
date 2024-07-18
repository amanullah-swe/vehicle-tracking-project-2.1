import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import delete_icon from "../../assets/images/delete.svg";
import { Tab, Tabs, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Calendar from "../../assets/images/calendar.svg";
import import_icon from "../../assets/images/import_icon.svg";
import export_icon from "../../assets/images/export_icon.svg";

import edit_icon from "../../assets/images/ic-edit.svg";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import Pagenation from "../../sharedComponent/Pagenation";
import ReactSelect from "../../sharedComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CommonDatePicker from "../../sharedComponent/CommonDatePicker";
import { latestDate } from "../../sharedComponent/common";
import { simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const LogChanges = () => {
  const { sidebar, setSidebar, Dark, setDark,recordsPerPage,useDebounce } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { t, i18n } = useTranslation();
 const handleCloseCreate = () => setCreate(false);
  const handleShowCreate = () => setCreate(true);
  const handleCloseEdit = () => setEdit(false);
  const handleShowEdit = () => setEdit(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;

  const [page, setPage] = useState(1);
  const [last_page, setlast_page] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [logList, setLogList] = useState([]);
const [filterData,setFilterData]=useState({
  user_name:"",
  log_date:""
})
const debouncedSearchTerm = useDebounce(filterData, 500);
useEffect(() => {
  getLogListApi(page);

}, [debouncedSearchTerm]);

function getLogListApi(currentPage) {

  let newRequestBody = JSON.stringify({
    log_name:filterData?.user_name,
    log_date:filterData.log_date?latestDate(filterData.log_date,"yyyy-MM-dd"):"",
    page: currentPage,
    page_limit:recordsPerPage
       });
  simplePostCall(ApiConfig.VEHICEL_AVALIVALITY_LIST, newRequestBody)
    .then((data) => {
      if (data.result) {
          setlast_page(data.last_page);
          setTotalCount(data.total?data.total:0)
        if (currentPage === 1) {
          setLogList(data.data);
        } else {
          setLogList([...logList,...data.data]);
        }
      } else {
        setLogList([]);
        setlast_page(false);
     
      }
    })
    .catch((err) => {
      console.log("err", err);
    })
  
}


function onPageLoad() {
  setPage(page + 1);
  getLogListApi(page + 1);
}


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
                        placeholder="Search username ..."
                        aria-label="Search"
                        onChange={(e)=>{
                          setFilterData({...filterData,
                            user_name:e.target.value})
                        }}
                      />
                    </Form>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="innerSelectBox weekCounter datepicker-main">

                  {/* <CommonDatePicker
                      dateKey="log_date"
                      setDate={filterData}
                       data={setFilterData}
                       /> */}
                    {/* <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="form-control"
                    /> */}
                    {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                  </div>
                </div>
              </div>
            </div>
            {userRole === "customer" ||
            (accessRights &&
              accessRights.rights_manage_log_changes_settings) ? (
              <div className="right-wrapper">
                <Link to="#" className="import-icon">
                  <img src={import_icon} alt="" />
                </Link>
                <Link to="#" className="export-icon">
                  <img src={export_icon} alt="" />
                </Link>
              </div>
            ) : null}
          </div>
          <div className="main-master-wrapper mt-3">
            <div id="scroll_insideThe_Padding_tabel">
              <table className="holiday-table">
                <thead className="ht-head logchange">
                  <tr>
                    <td>{t("Sr.No.")}</td>
                    <td>{t("User Name")}</td>
                    <td>{t("Date & Time")}</td>
                    <td>{t("Log Description")}</td>
                    <td>{t("Action")}</td>
                  </tr>
                </thead>
                <tbody className="ht-body">
                  <tr className="table-row-custom">
                    <td>1</td>
                    <td>Fleet Manager</td>
                    <td>01-01-2023, 04:58 AM</td>
                    <td>
                      <span className="blackcolor">John Doe </span> changed the
                      fleet settings
                    </td>
                    <td className="Viewchanges">View changes</td>
                  </tr>          
                </tbody>
              </table>
            </div>
            {logList?.length > 0 && (
              <Pagenation length={logList?.length} total={totalCount} />
            )}
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Delete User Role")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {t("Are you sure you want to delete this Role")} ?
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer">
              <button className="cx-btn-1" onClick={handleClose}>
                {t("Close")}
              </button>
              <button className="cx-btn-2" onClick={handleClose}>
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={edit}
            onHide={handleCloseEdit}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Edit Role")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label className="common-labels">
                {t("Role")} <span className="red-star">*</span>
              </Form.Label>
              <ReactSelect />
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer">
              <button className="cx-btn-1" onClick={handleCloseEdit}>
                {t("Close")}
              </button>
              <button className="cx-btn-2" onClick={handleCloseEdit}>
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={create}
            onHide={handleCloseCreate}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Create Role")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label className="common-labels">
                {t("Role")} <span className="red-star">*</span>
              </Form.Label>
              <ReactSelect />
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer">
              <button className="cx-btn-1" onClick={handleCloseCreate}>
                {t("Close")}
              </button>
              <button className="cx-btn-2" onClick={handleCloseCreate}>
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </motion.div>
    </>
  );
};

export default LogChanges;

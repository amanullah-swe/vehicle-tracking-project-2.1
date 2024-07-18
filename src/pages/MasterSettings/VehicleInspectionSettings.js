import { React, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import delete_icon from "../../assets/images/delete.svg";
import { Tab, Tabs, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Calendar from "../../assets/images/calendar.svg";
import import_icon from "../../assets/images/import_icon.svg";
import export_icon from "../../assets/images/export_icon.svg";
import View from "../../assets/images/Group.svg";
import EditIc from "../../assets/images/ic-edit.svg";
import edit_icon from "../../assets/images/ic-edit.svg";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import Pagenation from "../../sharedComponent/Pagenation";
import ReactSelect from "../../sharedComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const VehicleInspectionSettings = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
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
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
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
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;

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
                        type="text"
                        placeholder="Vehicle Name"
                        aria-label="Vehicle Name"
                      />
                    </Form>
                  </div>
                </div>
              </div>
            </div>

            {userRole === "customer" ||
            (accessRights &&
              accessRights.rights_manage_log_changes_settings) ? (
              <div className="right-wrapper">
                <Link
                  to="/AddVehicleInspectionSetting"
                  className="d-flex justify-content-end mb-3"
                >
                  <button
                    style={{ margin: "0px 13px -14px" }}
                    className="cx-btn-3"
                  >
        {t("+ New Configuration")}
                  </button>
                </Link>
                {/* <Link to="#" className="import-icon">
                  <img src={import_icon} alt="" />
                </Link> */}
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
                    <td>{t("Vehicle Category")}</td>
                    <td>{t("Types of Sub-Category")}</td>
                    <td>{t("No. Of Questionaries")}</td>
                    <td>{t("Action")}</td>
                  </tr>
                </thead>
                <tbody className="ht-body">
                  <tr className="table-row-custom">
                    <td>1</td>
                    <td>Car</td>
                    <td>Interior, Exterior and Other’s</td>
                    <td>50</td>
                    <div className="innerFlex">
                      <Link to="/ViewInspectionDetails">
                        <img src={View} className="me-3" alt="" />
                      </Link>
                      {userRole === "customer" ||
                      (accessRights &&
                        accessRights?.rights_manage_vehicle_inspection_dashboard) ? (
                        <Link to="/NewInspection">
                          <img src={EditIc} alt="" className="me-3" />
                        </Link>
                      ) : null}
                    </div>
                  </tr>
                  <tr className="table-row-custom">
                    <td>2</td>
                    <td>Bus</td>
                    <td>Interior , Exterior.s</td>
                    <td>10</td>
                    
                    <div className="innerFlex">
                      <Link to="/ViewInspectionDetails">
                        <img src={View} className="me-3" alt="" />
                      </Link>
                      {userRole === "customer" ||
                      (accessRights &&
                        accessRights?.rights_manage_vehicle_inspection_dashboard) ? (
                        <Link to="/NewInspection">
                          <img src={EditIc} alt="" className="me-3" />
                        </Link>
                      ) : null}
                    </div>
                  </tr>
                  <tr className="table-row-custom">
                    <td>3</td>
                    <td>Car</td>
                    <td>Interior, Exterior and Other’s</td>
                    <td>50</td>
                    <div className="innerFlex">
                      <Link to="/ViewInspectionDetails">
                        <img src={View} className="me-3" alt="" />
                      </Link>
                      {userRole === "customer" ||
                      (accessRights &&
                        accessRights?.rights_manage_vehicle_inspection_dashboard) ? (
                        <Link to="/NewInspection">
                          <img src={EditIc} alt="" className="me-3" />
                        </Link>
                      ) : null}
                    </div>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagenation />
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

export default VehicleInspectionSettings;

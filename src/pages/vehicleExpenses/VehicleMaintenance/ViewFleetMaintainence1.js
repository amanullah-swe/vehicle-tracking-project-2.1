import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { Dropdown, Modal, Form, Accordion } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import option from "../../../assets/images/option-three-dot.svg";
import Export from "../../../assets/images/export_icon.svg";
import View from "../../../assets/images/Group.svg";
import pen from "../../../assets/images/Pen.svg";
import SideIc from "../../../assets/images/sideBar.svg";
import export_icon from "../../../assets/images/export_icon.svg";
import Delete from "../../../assets/images/delete.svg";
import BigSave from "../../../assets/images/bigSave.svg";
import Calendar from "../../../assets/images/calendar.svg";
import BigInvoice from "../../../assets/images/bigOnvoice.svg";
import { motion } from "framer-motion";
import { simpleGetCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { DateDDMMYYYY } from "../../../sharedComponent/common";
import Loader from "../../../sharedComponent/Loader";

import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
const ViewFleetMaintainence1 = () => {
  const { sidebar, setSidebar, Dark, setDark,loading, setLoading } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [inpute, setInpute] = useState(false)
  const { t, i18n } = useTranslation();
  const [vname, setVname] = useState("Toyota Innova")

  const handleClose = () => setShowModal(false);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };



  const params = useParams();
  let UserId = params.id;
  const [FleerDetails, setFleetDetails] = useState([]);


  useEffect(() => {
    if (UserId) {
      geTransportmanagerDetails();
    }
  }, []);
  const geTransportmanagerDetails = () => {
    setLoading(true)
    simpleGetCall(ApiConfig.VEHICLEFLEET_PROFLIE + UserId)
      .then((res) => {
        setFleetDetails(res.data);
        
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
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
        transition={{ duration: 0.1 }} >
          {loading ? (
                    <Loader />
                  ) : (
                    <>
        <div id="cx-wrapper" className="ViewFleet_Maintainence">
          <div className="main-master-wrapper">
            <div className="headingDetails">
              <div className="headingTxt">
                <p className="heading">{t("Fleet Maintenance Details")}</p>
              </div>
              <div className="customer-option">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <img src={option} alt="" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      {" "}
                      <Link to="/EditFleetMaintainence" className="d-block">{t("Edit")}</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      {" "}
                      <div onClick={() => setDeleteModal(true)}>
                        <Link to="#" className="d-block">
                          {t("Delete")}
                        </Link>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="DetailsSec">
              <div className="row detailsRow">
                <div className="col-md-3 ViewCol3 form_input_main">
                  <label className="head">{t("Vehicle Name")}</label>
                  <p className="Value">{FleerDetails.vehicle_number}</p>
                </div>
                <div className="col-md-3 ViewCol3 form_input_main">
                  <label className="head">{t("Maintenance Task")}</label>
                  <p className="Value">{FleerDetails.fleat_mantenance_task_type}</p>
                </div>
                <div className="col-md-3 ViewCol3 form_input_main">
                  <label className="head">{t("Scheduled Duration")} (H)</label>
                  <p className="Value">{FleerDetails.fleat_mantenance_duration}</p>
                </div>
                <div className="col-md-3 ViewCol3 form_input_main">
                  <label className="head">{t("Start Date")}</label>
                  <p className="Value">
                                            {DateDDMMYYYY(FleerDetails.fleat_mantenance_start_date)}
                                            
                                            </p>
                </div>
                <div className="col-md-3 ViewCol3 form_input_main">
                  <label className="head"> {t("Milage")} </label>
                  <p className="Value">{FleerDetails.fleat_maintenance_due_milage}</p>
                </div>
                <div className="col-md-3 ViewCol3 form_input_main">
                  <label className="head">{t("Fleet Maintenance Next Due Date")}  </label>
                  <p className="Value"> 
                                            {DateDDMMYYYY(FleerDetails.fleat_mantenance_next_due_date)}
                                            
                                            </p>
                </div>
                <div className="col-md-3 ViewCol3 form_input_main">
                  <label className="head">{t("Off Road")}</label>
                  <p className="Value">{FleerDetails.fleat_mantenance_off_road}</p>
                </div>
                <div className="col-md-3"></div>
                <div className="col-md-3 invoiceCOl">
                  <label className="head">{t("Invoice")}</label>
                  <div className="invoiceBox">
                    <div className="headingInvoi">
                      <p>Document No. 1</p>
                      <div>
                        <Link to="#">
                          <img src={Export} className="me-2" alt="" />
                        </Link>
                        <Link to="#">
                          <img src={View} className="me-2" alt="" />
                        </Link>
                        <Link to="#" onClick={() => setDeleteModal(true)}>
                          <img src={Delete} alt="" />
                        </Link>
                      </div>
                    </div>
                    <div className="saveFile">
                      <Link to="#" onClick={() => setShowModal(true)}>
                        <img src={BigSave} alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-wrapper align-items-baseline">
              <Link to="#" className="import-icon">
                <img src={SideIc} alt="" />
              </Link>
              <Link to="#" className="export-icon">
                <img src={export_icon} alt="" />
              </Link>
            </div>
          </div>
          <div className="accordian_mainTabs">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Service-1000</Accordion.Header>
                <Accordion.Body>
                  <div className="DetailsSec">
                    <div className="row detailsRow">
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">
                          {t("Vehicle Name")}
                          <img src={pen} alt="" className="ms-2" onClick={() => { setInpute(!inpute) }} />
                        </label>
                        {inpute === true ?
                          <input type="text" onChange={(e) => { setVname(e.target.value) }} className="form-control eitatable" defaultValue={vname} /> :
                          <p className="Value edatiable">{vname}</p>}
                      </div>
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">{t("Last Service On")}</label>
                        <p className="Value">02-02-2023, 05:38PM</p>
                      </div>
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">{t("Kilometer’s Driven")} (H)</label>
                        <p className="Value">500</p>
                      </div>
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">{t("Next Service On")}</label>
                        <p className="Value">02-10-2023</p>
                      </div>
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">{t("Service Cost")} </label>
                        <p className="Value">5000 $</p>
                      </div>
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">{t("Service Type")}  </label>
                        <p className="Value">Duration</p>
                      </div>
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">{t("Service Mode")}</label>
                        <p className="Value">Automatic</p>
                      </div>
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">{t("Service Notification")}</label>
                        <p className="Value">Yes</p>
                      </div>
                      <div className="col-md-3 invoiceCOl">
                        <label className="head">{t("Invoice")}</label>
                        <div className="invoiceBox">
                          <div className="headingInvoi">
                            <p>Service Invoice</p>
                            <div>
                              <Link to="#">
                                <img src={Export} className="me-2" alt="" />
                              </Link>
                              <Link to="#">
                                <img src={View} className="me-2" alt="" />
                              </Link>
                              <Link to="#" onClick={() => setDeleteModal(true)}>
                                <img src={Delete} alt="" />
                              </Link>
                            </div>
                          </div>
                          <div className="saveFile">
                            <Link to="#" onClick={() => setShowModal(true)}>
                              <img src={BigSave} alt="" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Service-0999</Accordion.Header>
                <Accordion.Body>
                  <div className="DetailsSec">
                    <div className="row detailsRow">
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">
                          {t("Vehicle Name")}
                          <img src={pen} alt="" className="ms-2" onClick={() => { setInpute(!inpute) }} />
                        </label>
                        {inpute === true ?
                          <input type="text" onChange={(e) => { setVname(e.target.value) }} className="form-control eitatable" defaultValue={vname} /> :
                          <p className="Value edatiable">{vname}</p>}
                      </div>
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">{t("Last Service On")}</label>
                        <p className="Value">02-02-2023, 05:38PM</p>
                      </div>
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">{t("Kilometer’s Driven")} (H)</label>
                        <p className="Value">500</p>
                      </div>
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">{t("Next Service On")}</label>
                        <p className="Value">02-10-2023</p>
                      </div>
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">{t("Service Cost")} </label>
                        <p className="Value">5000 $</p>
                      </div>
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">{t("Service Type")}  </label>
                        <p className="Value">Duration</p>
                      </div>
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">{t("Service Mode")}</label>
                        <p className="Value">Automatic</p>
                      </div>
                      <div className="col-md-3 ViewCol3 form_input_main">
                        <label className="head">{t("Service Notification")}</label>
                        <p className="Value">Yes</p>
                      </div>
                      <div className="col-md-3 invoiceCOl">
                        <label className="head">{t("Invoice")}</label>
                        <div className="invoiceBox">
                          <div className="headingInvoi">
                            <p>Service Invoice</p>
                            <div>
                              <Link to="#">
                                <img src={Export} className="me-2" alt="" />
                              </Link>
                              <Link to="#">
                                <img src={View} className="me-2" alt="" />
                              </Link>
                              <Link to="#" onClick={() => setDeleteModal(true)}>
                                <img src={Delete} alt="" />
                              </Link>
                            </div>
                          </div>
                          <div className="saveFile">
                            <Link to="#" onClick={() => setShowModal(true)}>
                              <img src={BigSave} alt="" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        </>)}
      </motion.div>

      {/* invoice view Modal Start */}
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        size="l"
        className="invoice-model"
      >
        <Modal.Body>
          <img src={FleerDetails.fleat_maintenance_invoice_no} className="invoiceBigImg" alt="" />
        </Modal.Body>
      </Modal>
      {/* invoice view  Modal End */}
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
          {t("Are you sure you want to Delete this Fleet Maintenance")}?
        </Modal.Body>
        <Modal.Footer className="pop-up-modal-footer">
          <div class="btn-wrapper">
            <button className="cx-btn-1" onClick={() => setDeleteModal(false)}>
              {t("Cancel")}
            </button>
            <button className="cx-btn-2" onClick={() => setDeleteModal(false)}>
              {t("Yes")}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal End */}
    </>
  );
};

export default ViewFleetMaintainence1;

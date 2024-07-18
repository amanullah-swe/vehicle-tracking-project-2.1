import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import profile from "../../assets/images/Update-profile.svg";
import camera from "../../assets/images/prof_cam.svg";
import { Dropdown, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import edit_icon from "../../assets/images/ic-edit.svg";
import stops_icon from "../../assets/images/stops_icon.svg";
import delete_icon from "../../assets/images/delete.svg";
import close_icon from "../../assets/images/close_icon.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import { motion } from "framer-motion";
import MapComponent from "../../sharedComponent/MapComponent";
import { useTranslation } from "react-i18next";
const AddStop = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const { t, i18n } = useTranslation();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  const handleClick2 = () => {
    setIsActive(!isActive);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  return (
    <motion.div className={sidebar ? "taskMain " : "cx-active taskMain"} id="cx-main" variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}>
      <div id="cx-wrapper">
        <div className="main-master-wrapper CustomerProfile">
          <div className="Heading">
            <p>{t("Add Stop")}</p>
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="information-card row">
              <div className="col-md-6 mb-4">
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <Form.Label className="common-labels">
                      {t("Trip")} <span className="red-star">*</span>
                    </Form.Label>
                    <Form.Select required>
                      <option value="">
                        Select Trip..
                      </option>
                      <option>Trip Type 1</option>
                      <option>Trip Type 2</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please Select Trip
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-12 mb-4">
                    <Form.Label className="common-labels">
                      {t("Stop Name")} <span className="red-star">*</span>
                    </Form.Label>
                    <Form.Select required>
                      <option value="">
                        Select from existing stop locations...
                      </option>
                      <option>Stop 1</option>
                      <option>Stop 2</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please Select Trip
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-12 mb-4">
                    <p className="horizontal-line">{t("OR")}</p>
                  </div>
                  <div className="col-md-12 mb-4">
                    <Form.Label className="common-labels">
                      {t("Stop Code")} <span className="red-star">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Bus Stop Code..."
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Your First Name.
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-12 mb-4">
                    <Form.Label className="label-with-radio">
                      <span className="common-labels">
                        {t("Add to Point of Interest")} ?
                      </span>
                      <div id="customRadios">
                        <div class="form-check greenFlex me-2">
                          <input class="form-check-input" type="radio" name="flexRadioDefault1" id="Yes" />
                          <label class="form-check-label custLabel" for="Yes">
                            {t("Yes")}
                          </label>
                        </div>
                        <div class="form-check  greenFlex">
                          <input class="form-check-input" type="radio" name="flexRadioDefault1" id="No" />
                          <label class="form-check-label custLabel" for="No">
                            {t("No")}
                          </label>
                        </div>
                      </div>
                    </Form.Label>
                  </div>
                  <div className="col-md-12 mb-4">
                    <Form.Label className="common-labels">
                      {t("Set Geofence Area")} <span className="red-star">*</span>
                    </Form.Label>
                    <Form.Select required>
                      <option value="">
                        Select Trip..
                      </option>
                      <option>Trip Type 1</option>
                      <option>Trip Type 2</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please Select Trip
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-12">
                    <div className="stop-priority-btn-wrapper">
                      <button className="">{t("Auto Optimize Priority")}</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="transportMap stopmap">
                  <p className="stop-note">
                    {t("Note")} : {t("Click on map for adding new stop")}.
                  </p>
                  <div className="custom-map-height">
                  <MapComponent />
                  </div>
                  <div className="stop-tooltip-wrapper">
                    <OverlayTrigger
                      trigger="click"
                      key="bottom"
                      placement="bottom"
                      overlay={
                        <Popover
                          id="popover-positioned-bottom"
                          className="popover-main-wrapper"
                          style={{ width: "600px !important" }}
                        >
                          <Popover.Body className="pm-body">
                            <div className="popover-wrapper">
                              <div className="stop-overlay-top">
                                <p>{t("Add Stop")}</p>
                                <button
                                  onClick={() => {
                                    handleClick2();
                                  }}
                                >
                                  <img src={close_icon} alt="" />
                                </button>
                              </div>
                              <div className="pw-bottom">
                                <table className="pwb-table">
                                  <tbody>
                                    <tr>
                                      <td>{t("Stop Name")}</td>
                                      <td>:</td>
                                      <td>Kolhapur, Maharashtra</td>
                                    </tr>
                                    <tr>
                                      <td>{t("Stop Code")}</td>
                                      <td>:</td>
                                      <td>Kolhapur, Maharashtra</td>
                                    </tr>
                                    <tr>
                                      <td>{t("Add to POI")}</td>
                                      <td>:</td>
                                      <td>Yes</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={3}></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="so-btn-wrapper">
                                <button className="cx-btn-2">{t("Add/Update Stop")}</button>
                                <button className="cx-btn-1" onClick={handleShow}>{t("Remove Stop")}</button>
                              </div>
                            </div>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <Button className="red-car-btn">
                        <img
                          src={stops_icon}
                          alt=""
                          className=""
                          onClick={() => {
                            handleClick();
                          }}
                        />
                      </Button>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn-wrapper">
              <button type="" class="cx-btn-1">
                {t("Cancel")}
              </button>
              <button type="submit" class="cx-btn-2">
                {t("Submit")}
              </button>
            </div>
          </Form>
        </div>
        <div className="main-master-wrapper mt-3">
          <div className="Heading">
            <p>{t("Stop List")}</p>
          </div>
          <table className="holiday-table">
            <thead className="ht-head">
              <tr>
                <td>{t("Sr.No.")}</td>
                <td>{t("Stop Name")}</td>
                <td>{t("Stop Code")}</td>
                <td>{t("POI")}</td>
                <td>{t("Geofence Area")}</td>
                <td>{t("Priority")}</td>
                <td>{t("Action")}</td>
                
              </tr>
            </thead>
            <tbody className="ht-body">
              <tr className="table-row-custom">
                <td>1</td>
                <td>Kolhapur</td>
                <td>Kolhapur</td>
                <td>Yes</td>
                <td>Kolhapur City</td>
                <td>1</td>
                <td>
                  <Link to="/EditStop">
                    <img src={edit_icon} alt="" />
                  </Link>
                  <Link to="#" onClick={handleShow}>
                    <img src={delete_icon} alt="" />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete Trip Modal Start */}

      <Modal show={show} onHide={handleClose} centered className="common-model">
        <Modal.Header closeButton>
          <Modal.Title>{t("Delete Stop")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("Are you sure you want to delete this Stop")} ?</Modal.Body>
        <Modal.Footer className="pop-up-modal-footer">
          <button className="cx-btn-1" onClick={handleClose}>
            {t("Close")}
          </button>
          <button className="cx-btn-2" onClick={handleClose}>
            {t("Yes")}
          </button>
        </Modal.Footer>
      </Modal>

      {/* Delete Trip Modal End */}
    </motion.div>
  );
};

export default AddStop;

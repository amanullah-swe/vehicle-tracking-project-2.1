import { React, useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Save from "../../../assets/images/save.svg";
import Inspect from "../../../assets/images/inspect.svg";
import Right from "../../../assets/images/right.svg";
import Invoice from "../../../assets/images/invoice.svg";
import DatePicker from "react-datepicker";
import Calendar from "../../../assets/images/calendar.svg";
import uploadIcon from "../../../assets/images/uploadIcon.svg";
import BigInvoice from "../../../assets/images/bigOnvoice.svg";
import Delete from "../../../assets/images/delete.svg";
import { Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
// Types of files

const EditVehicleAccident = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [preview, setPreview] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { t, i18n } = useTranslation();

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
    <>
      <motion.div
        className={sidebar ? "taskMain " : "cx-active taskMain"}
        id="cx-main"
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div id="cx-wrapper" className="AddVehicle_Accident">
            <div className="main-master-wrapper">
              <div className="vehicleHead">
                <p>{t("Edit Vehicle Incident Details")}</p>
              </div>
              <div className="innerInputsGen mainVehAccident ">
                <div className="addVehicleSe">
                  <div className="addVehicleLeftSec">
                    <div className="row">
                      <div className="col-md-12 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="headinglabelVehi">
                            {t("Vehicle Name")} <span>&#42;</span>{" "}
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Enter Your vehicle Name"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please Enter vehicle Name.
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      <div className="col-md-12 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {" "}
                            {t("Location")} <span>&#42;</span>{" "}
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Enter Your Location"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please Enter Your Location.
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      <div className="col-md-12 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {" "}
                            {t("Expenses")} <span>&#42;</span>{" "}
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Enter Your Amount"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please Enter Your Amount.
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      <div className="col-md-12 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {t("Driver")} <span>&#42;</span>{" "}
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Enter Driver Name"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please Enter Driver Name.
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      <div className="col-md-12 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {" "}
                            {t("Description")} <span>&#42;</span>{" "}
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            required
                            type="text"
                            placeholder="Type Description"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please Type Description.
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      <div className="col-md-12 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {" "}
                            {t("Date")}
                          </Form.Label>
                          <DatePicker
                            // selected={startDate}
                            placeholderText="Select Date"
                            onChange={(date) => setStartDate(date)}
                            className="form-control"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please Select Date.
                          </Form.Control.Feedback>
                          <img
                            src={Calendar}
                            className="addVehCalender"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* This section is for image addidtion in an array on every selection */}
                  <div className="imagesRightSec">
                    <div className="row">
                      <div className="col-md-12 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <label className="common-labels">{t("Invoice")}</label>
                          {/* File name which user will select name will show below */}
                          <div className="savedInvoice">
                            <label>Example Document-Invoice.pdf</label>
                          </div>
                          <img src={Save} className="save" alt="" />
                          {/* below two images will show conditionally */}
                          <img src={Inspect} className="Inspect" alt="" />
                          <img src={Right} className="right" alt="" />
                          <label className="invalidText">
                            {t("Failed to upload")}
                          </label>
                          <label className="retry">{t("Retry")}</label>
                        </div>
                      </div>
                      <div className="col-md-12 form_input_main mb-4">
                        <div className="innerSelectBox weekCounter form_input_main">
                          <label className="common-labels">{t("Invoice")} 2</label>
                          {/* File name which user will select name will show below */}
                          <div className="savedInvoice">
                            <label>Example Document-Invoice.pdf</label>
                          </div>
                          <img src={Save} className="save" alt="" />
                          {/* below two images will show conditionally */}
                          <img src={Inspect} className="Inspect" alt="" />
                          <img src={Right} className="right" alt="" />
                          <label className="invalidText">
                            {t("Failed to upload")}
                          </label>
                          <label className="retry">{t("Retry")}</label>
                        </div>
                        {/* Selected image preview here */}
                        <div className="previewImg">
                          <img src={Invoice} className="InvoiceImg" alt="" />
                        </div>
                      </div>
                      <div className="col-md-12 form_input_main">
                        <div className="fileDropper">
                          <label htmlFor="file" className="imageHolder">
                            <input type="file" id="file" className="d-none" />
                            <div className="innerFlex">
                              <img
                                src={uploadIcon}
                                className="browseImg"
                                alt=""
                              />
                              <p className="innerTxt">Drag & Drop Your File</p>
                              <p className="innerTxt">Or</p>
                              <label htmlFor="file2" className="browseBtn">
                                <input
                                  type="file"
                                  id="file2"
                                  className="d-none"
                                />
                                <p className="mt-1">Browse File</p>
                              </label>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Two Bottom Buttons */}
              <div className="d-flex justify-content-end align-items-center belowBtns">
                <button className="cx-btn-1">{t("Cancel")}</button>
                <button className="cx-btn-2">{t("Update")}</button>
              </div>
            </div>
          </div>
        </Form>
      </motion.div>

      {/* Delete Modal Start */}
      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        centered
        className="common-model"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("Delete Invoice")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("Are you sure you want to Delete Invoice")} ?</Modal.Body>
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

export default EditVehicleAccident;

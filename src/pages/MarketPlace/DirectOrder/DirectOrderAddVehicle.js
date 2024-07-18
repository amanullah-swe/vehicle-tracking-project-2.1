import { React, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import Form from "react-bootstrap/Form";
import XCross from "../../../assets/images/xcross.svg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const DirectOrderAddVehicle = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
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
        transition={{ duration: 0.1 }}
      >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div id="cx-wrapper" className="AddDispatch_Customer">
            <div className="main-master-wrapper">
              <div className="Heading">
                <p>{t("Add Vehicle Details")}</p>
              </div>
              {/* Inputs form section */}
              <div className="innerInputsGen">
                <div className="row mb-3">
                <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Reference Number")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Customer Name..."
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Customer Name...
                      </Form.Control.Feedback>
                    </div>
                  </div>

                


                  <div className="col-md-6  form_input_main mb-3">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Power Plate Number")}
                      </Form.Label>
                      <Form.Select
                        required
                        as="select"
                        type="select"
                        name="Speed_limit"
                      >
                        <option value="">
                        Select Power Plate...
                        </option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="150">150</option>
                      </Form.Select>
                    </div>
                  </div>

                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Year of Manufacture")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Customer Name...
                      </Form.Control.Feedback>
                    </div>
                  </div>

                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Motor Number")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Customer Name...
                      </Form.Control.Feedback>
                    </div>
                  </div>

                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Vehicle Load Capacity in Quintals ")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Customer Name...
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6  form_input_main mb-3">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Trailer Plate Number")}
                      </Form.Label>
                      <Form.Select
                        required
                        as="select"
                        type="select"
                        name="Speed_limit"
                      >
                        <option value="">
                        Select Trailer Plate...
                        </option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="150">150</option>
                      </Form.Select>
                    </div>
                  </div>
                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Chassis Number")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Customer Name...
                      </Form.Control.Feedback>
                    </div>
                  </div>

                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Vehicle Load Capacity in Quintals ")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Customer Name...
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6  form_input_main mb-3">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Driver & License Number")}
                      </Form.Label>
                      <Form.Select
                        required
                        as="select"
                        type="select"
                        name="Speed_limit"
                      >
                        <option value="">
                        Select Driver...
                        </option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="150">150</option>
                      </Form.Select>
                    </div>
                  </div>

                  <div className="col-md-6  form_input_main mb-3">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Vehicle Type")}
                      </Form.Label>
                      <Form.Select
                        required
                        as="select"
                        type="select"
                        name="Speed_limit"
                      >
                        <option value="">
                        Select Vehicle Type...
                        </option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="150">150</option>
                      </Form.Select>
                    </div>
                  </div>
                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Model")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Customer Name...
                      </Form.Control.Feedback>
                    </div>
                  </div>

                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Chassis Number")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Customer Name...
                      </Form.Control.Feedback>
                    </div>
                  </div>

                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Gross Weight")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Customer Name...
                      </Form.Control.Feedback>
                    </div>
                  </div>

                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Current Kms")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Customer Name...
                      </Form.Control.Feedback>
                    </div>
                  </div>

                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Vehicle Type")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Customer Name...
                      </Form.Control.Feedback>
                    </div>
                  </div>

                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Gross Weight")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Customer Name...
                      </Form.Control.Feedback>
                    </div>
                  </div>

                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Current Kms")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Customer Name...
                      </Form.Control.Feedback>
                    </div>
                  </div>

                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Driver Driving License")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Customer Name...
                      </Form.Control.Feedback>
                    </div>
                  </div>
                </div>
              </div>
            
              {/* Two Bottom Buttons */}
              <div className="d-flex justify-content-end align-items-center belowBtns btn-wrapper">
                <button className="cx-btn-1">{t("Cancel")}</button>
                <button className="cx-btn-2">{t("Add")}</button>
              </div>
            </div>
          </div>
        </Form>
      </motion.div>
    </>
  );
};

export default DirectOrderAddVehicle;


import { React, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import Form from "react-bootstrap/Form";
import XCross from "../../../assets/images/xcross.svg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const AddDispatchCustomer = () => {
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
                <p>{t("Add Customer Details")}</p>
              </div>
              {/* Inputs form section */}
              <div className="innerInputsGen">
                <div className="row mb-3">
                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Dispatch Customer Name")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Customer Name...")}
                      />
                      <Form.Control.Feedback type="invalid">
                       {t("Please Enter Customer Name...")} 
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Dispatch Customer Code")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Customer Code...")}
                      />
                      <Form.Control.Feedback type="invalid">
                      {t("Please Enter Customer Code...")}  
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Dispatch Customer Email")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Customer Email...")}
                      />
                      <Form.Control.Feedback type="invalid">
                      {t("Please Enter Customer Email...")}  
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Dispatch Customer Mobile")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        max={15}
                        placeholder={t("Enter Customer Mobile Number...")}
                      />
                      <Form.Control.Feedback type="invalid">
                      {t("Please Enter Customer Mobile Num...")}  
                      </Form.Control.Feedback>
                    </div>
                  </div>
                </div>
              </div>
              {/* Add new details sec */}
              <div className="AddNewForm">
                <div className="innerWrapper">
                  <div className="FormHeading">
                    <p>{t("Address Details")}-1</p>
                  </div>
                  <div className="innerImg">
                    <img src={XCross} alt="" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Delivery Address")}
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        required
                        type="text"
                        placeholder={t("Enter Delivery Address...")}
                      />
                      <Form.Control.Feedback type="invalid">
                      {t("Please Enter Customer Name...")}  
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6  form_input_main mb-3">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Delivery Address Contact Number")}
                      </Form.Label>
                      <Form.Control
                        required
                        max={15}
                        type="text"
                        placeholder={t("Enter Delivery Address Contact Number...")}
                      />
                      <Form.Control.Feedback type="invalid">
                      {t("Please Enter Delivery Address Contact Number...")}  
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6  form_input_main mb-3">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Delivery Address Country Code")}
                      </Form.Label>
                      <Form.Select
                        required
                        as="select"
                        type="select"
                        name="Speed_limit"
                      >
                        <option value="">
                        {t("Enter Delivery Address Country Code...")}  
                        </option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="150">150</option>
                      </Form.Select>
                    </div>
                  </div>
                </div>
              </div>
              <button className="AddNewBtn">+ {t("Add New")}</button>
              {/* Two Bottom Buttons */}
              <div className="d-flex justify-content-end align-items-center belowBtns btn-wrapper">
                <button className="cx-btn-1">{t("Cancel")}</button>
                <button className="cx-btn-2">{t("Submit")}</button>
              </div>
            </div>
          </div>
        </Form>
      </motion.div>
    </>
  );
};

export default AddDispatchCustomer;

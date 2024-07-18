import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useTranslation } from "react-i18next";

const EmailSupport = () => {
    const handelAudio = (e) => {};
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const { t, i18n } = useTranslation();

  return (
    <main className={sidebar ? "taskMain " : "cx-active taskMain"} id="cx-main">
      <div id="cx-wrapper" className="ComposeMessage">
        <div className="main-master-wrapper">
          <div className="Heading">
            <p>{t("Email Support")}</p>
          </div>
          <div className="innerInputsGen mainVehAccident ">
            <div className="insideInpts">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 form_input_main">
                  <div className="innerSelectBox weekCounter mb-2">
                    <Form.Label className="common-labels">{t("Driver")}</Form.Label>
                    <Form.Select as="select" type="select" name="Speed_limit">
                      <option value="">Select Driver ...</option>
                      <option value="0">Driver 1</option>
                      <option value="1">Driver 2</option>
                      <option value="2">Driver 3</option>
                    </Form.Select>
                  </div>
                  <div className="innerSelectBox weekCounter">
                    <Form.Label className="common-labels">{t("Vehicle")}</Form.Label>
                    <Form.Select as="select" type="select" name="Speed_limit">
                      <option value="">Select Vehicle...</option>
                      <option value="0">Vehicle 1</option>
                      <option value="1">Vehicle 2</option>
                      <option value="2">Vehicle 3</option>
                    </Form.Select>
                  </div>
                </div>
                <div className="select_vehicle_icon col-lg-6 col-md-12 col-sm-12 form_input_main">
                  <Form.Label className="common-labels" For="file">
                  {t("Issue")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Subject Here..."
                  />
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 form_input_main">
                  <Form.Label className="common-labels" For="file">
                  {t("Description")}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={8}
                    placeholder="Type Your Message..."
                  />
                </div>
              </div>
            </div>
            {/* Two Bottom Buttons */}
            <div className="d-flex justify-content-end align-items-center btn-wrapper">
              <Link to="#" className="innerLink">
                <button className="cx-btn-1 mx-2">{t("Cancel")}</button>
              </Link>
              <Link to="#" className="innerLink">
                <button className="cx-btn-2">{t("Submit")}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EmailSupport
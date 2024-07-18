import React, { useContext, useState } from "react";
import arrow from "../../assets/images/ic_line_arrow_left.svg";
import DDlogo from "../../assets/images/DDlogo.png";
import logo from "../../assets/images/Web-Application-Logo.svg";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../context/AppContext";
const Registration = () => {
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
  const {
    brand, 
   } = useContext(AppContext);
  return (
    <motion.div
      className="main-auth"
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="login-wrapper" id="registration-main">
        <div className="row">
          <div className="right">
            <div className="wrapper forgot-wrapper ">
              <div>
                <div className="arrow">
                  <Link to="/" className="">
                    <img src={arrow} alt="" />
                  </Link>
                </div>
                <div className="top-logo">
                  <img src={brand?.logo} alt="" />
                </div>
                <h3>{t("Tell us about yourself")} </h3>
                <div className="auth-form">
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="form_input_main">
                        <Form.Label className="common-labels">
                        {t("Your Business Name")}   <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder={t("Enter your Business Name here...")}
                        />
                        <Form.Control.Feedback type="invalid">
                        {t("Please Enter your Business Name.")}  
                        </Form.Control.Feedback>
                      </div>

                      <div className="col-lg-6 form_input_main">
                        <Form.Label className="common-labels">
                       {t("Address")} <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder={t("Address")}
                          required
                          className="text-area"
                        />
                        <Form.Control.Feedback type="invalid">
                       {t("Please Enter Address.")}   
                        </Form.Control.Feedback>
                      </div>
                      <div className="col-lg-6 ">
                        <div className="form_input_main">
                          <Form.Label className="common-labels">
                          {t("City")} <span className="red-star">*</span>
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={t("Country")}
                          />
                          <Form.Control.Feedback type="invalid">
                          {t("Please Enter Country.")}  
                          </Form.Control.Feedback>
                        </div>
                        <div className=" form_input_main select-group">
                          <Form.Label className="common-labels">
                          {t("Country")}   <span className="red-star">*</span>
                          </Form.Label>
                          <Form.Select
                            required
                            as="select"
                            type="select"
                            name="Speed_limit"
                          >
                            <option value="">{t("Select Country")} </option>
                            <option value="50">{t("India")} </option>
                            <option value="100">{t("Canada")} </option>
                            <option value="150">{t("America")} </option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                          {t("Please Enter Enter you Email ID / Mobile Number.")}  
                          </Form.Control.Feedback>
                        </div>
                      </div>

                      <div className="col-md-6 form_input_main">
                        <Form.Label className="common-labels">
                        {t("Email ID")}   <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="email"
                          placeholder={t("Enter you Email ID")}
                        />
                        <Form.Control.Feedback type="invalid">
                        {t("Please Enter Email.")}  
                        </Form.Control.Feedback>
                      </div>
                      <div className="col-md-6 form_input_main">
                        <Form.Label className="common-labels">
                        {t("Password")} <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="password"
                          placeholder={t("Enter you Password")}
                        />
                        <Form.Control.Feedback type="invalid">
                        {t("Please Enter Password.")}  
                        </Form.Control.Feedback>
                      </div>

                      <div className="col-md-6 form_input_main">
                        <Form.Label className="common-labels">
                        {t("Contact Number")} <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder={t("Enter you Contact Number")}
                        />
                        <Form.Control.Feedback type="invalid">
                        {t("Please Enter your Contact Number.")}  
                        </Form.Control.Feedback>
                      </div>

                      <div className="col-md-6 form_input_main select-group">
                        <Form.Label className="common-labels">
                         {t("Time Zone.")}  <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Select
                          required
                          as="select"
                          type="select"
                          name="Speed_limit"
                        >
                          <option value="">{t("Select Timezone")} </option>
                          <option value="50">{t("50")} </option>
                          <option value="100">{t("100")}</option>
                          <option value="150">{t("150")}</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                        {t("Please Select Timezone.")}  
                        </Form.Control.Feedback>
                      </div>

                      <div className="col-md-6 form_input_main select-group">
                        <Form.Label className="common-labels">
                        {t("Customer Category.")}  
                        </Form.Label>
                        <Form.Select
                          required
                          as="select"
                          type="select"
                          name="Speed_limit"
                        >
                          <option value="">
                          {t("Select Your Category of Business")}
                          </option>
                          <option value="50">{t("50")}</option>
                          <option value="100">{t("100")}</option>
                          <option value="150">{t("150")}</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                        {t("Please Select Your Category of Business.")}  
                        </Form.Control.Feedback>
                      </div>

                      <div className="col-md-6 form_input_main select-group">
                        <Form.Label className="common-labels">
                       {t("Customer Organization Type.")}   
                        </Form.Label>
                        <Form.Select
                          required
                          as="select"
                          type="select"
                          name="Speed_limit"
                        >
                          <option value="">{t("Select Organization")}</option>
                          <option value="50">{t("50")}</option>
                          <option value="100">{t("100")}</option>
                          <option value="150">{t("150")}</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                         {t("Please Select Organization.")} 
                        </Form.Control.Feedback>
                      </div>

                      <div className="col-md-6 form_input_main select-group">
                        <Form.Label className="common-labels">
                        {t("Customer Business Domain name.")}  
                        </Form.Label>
                        <Form.Select
                          required
                          as="select"
                          type="select"
                          name="Speed_limit"
                        >
                          <option value="">{t("Select your Business Domain")}</option>
                          <option value="50">{t("50")}</option>
                          <option value="100">{t("100")}</option>
                          <option value="150">{t("150")}</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                        {t("Please Select your Business Domain.")}
                        </Form.Control.Feedback>
                      </div>

                      <div className="col-md-6 form_input_main">
                        <Form.Label className="common-labels">
                         {t("Website")}  <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="email"
                          placeholder={t("Enter URL of your website...")}
                        />
                        <Form.Control.Feedback type="invalid">
                         {t("Please URL of your website.")} 
                        </Form.Control.Feedback>
                      </div>
                    </div>

                    <div className="btn-auth">
                      <Link to="/RegistrationLocation">
                        <button type="submit" className="filled-btn">
                       {t("Save & Proceed")}
                        </button>
                      </Link>

                      <div className="link-style">
                        <Link to="#">{` @ ${brand?.name}`} </Link>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Registration;

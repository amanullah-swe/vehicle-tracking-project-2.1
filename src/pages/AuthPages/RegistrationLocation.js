import React, { useContext, useState } from "react";
import arrow from "../../assets/images/ic_line_arrow_left.svg";
import DDlogo from "../../assets/images/DDlogo.png";
import logo from "../../assets/images/Web-Application-Logo.svg";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MapComponent from "../../sharedComponent/MapComponent";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../context/AppContext";

const RegistrationLocation = () => {
  const [validated, setValidated] = useState(false);

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
              <div className="arrow">
                <Link to="/Registration">
                  <img src={arrow} alt="" />
                </Link>
              </div>
              <div>
                <div className="top-logo">
                  <img src={brand?.logo} alt="" />
                </div>
                <h3>{t("Set you location")} </h3>
                <div className="auth-form">
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <div className="map-wrapper">
                      <MapComponent />
                    </div>
                    <p className="below-map-text">
                     {t("Check the map location is correct else zoom the map and change marker")}
                       
                    </p>
                    <div className="btn-auth">
                      <Link to="/">
                        <button type="submit" className="filled-btn">
                         {t("Submit Details")} 
                        </button>
                      </Link>

                      <div className="link-style">
                        <Link to="#">{` @ ${brand?.name}`}</Link>
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

export default RegistrationLocation;

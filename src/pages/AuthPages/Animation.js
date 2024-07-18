import React, { useContext, useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import logo from "../../assets/images/Web-Application-Logo.svg";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import arrow from "../../assets/images/ic_line_arrow_left.svg";
import { motion } from "framer-motion";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";

const Animation = () => {
  const [validated, setValidated] = useState(false);
  const [none, setNone] = useState(false);
 const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  return (
    <motion.div
      className="main-auth"
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="animation-wrapper">
        <div className="row height-style">
          <div
            className="col-md-12 right cx-relative "
            id="login-with-otp-main-right"
          >
            <div className="tile" id="tile-1">
              <ul className="nav nav-tabs nav-justified" role="tablist">
                <div className="slider" />
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    <i className="fas fa-home" /> Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    <i className="fas fa-id-card" /> Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="contact-tab"
                    data-toggle="tab"
                    href="#contact"
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                  >
                    <i className="fas fa-map-signs" /> Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="setting-tab"
                    data-toggle="tab"
                    href="#setting"
                    role="tab"
                    aria-controls="setting"
                    aria-selected="false"
                  >
                    <i className="fas fa-cogs" /> Settings
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  Home
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  Profile
                </div>
                <div
                  className="tab-pane fade"
                  id="contact"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                >
                  Contact
                </div>
                <div
                  className="tab-pane fade"
                  id="setting"
                  role="tabpanel"
                  aria-labelledby="setting-tab"
                >
                  Settings
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Animation;

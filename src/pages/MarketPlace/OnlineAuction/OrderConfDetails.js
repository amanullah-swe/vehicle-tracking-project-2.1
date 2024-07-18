import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OrderConfDetails = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <motion.div
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}
      className={sidebar ? "taskMain " : "cx-active taskMain"}
      id="cx-main"
    >
      <div id="cx-wrapper" className="order_details">
        <div className="row">
          <div className="col-md-12">
            <div className="detailsCard">
              <div className="headingBox">
                <h1>Order Details</h1>
              </div>
              <div className="contentBox">
                <div className="row">
                  <div className="col-md-3">
                    <div className="flexCOntent">
                      <label htmlFor="" className="key">
                        {t("Reference Number (Offer Vehicle")}
                      </label>
                      <label htmlFor="" className="value">
                        LD-1234567891-1141
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="flexCOntent">
                      <label htmlFor="" className="key">
                        {t("Operation Number")}
                      </label>
                      <label htmlFor="" className="value">
                        456789123
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="flexCOntent">
                      <label htmlFor="" className="key">
                        {t("Shipper")}
                      </label>
                      <label htmlFor="" className="value">
                        LD-1234567891-1141
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="flexCOntent">
                      <label htmlFor="" className="key">
                        {t("Vehicle No.")}
                      </label>
                      <label htmlFor="" className="value">
                        LD-1234567891-1141
                      </label>
                    </div>
                  </div>
                  
                  <div className="col-md-3">
                    <div className="flexCOntent">
                      <label htmlFor="" className="key">
                        {t("Cargo Type")}
                      </label>
                      <label htmlFor="" className="value">
                        456789123
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="flexCOntent">
                      <label htmlFor="" className="key">
                        {t("Quantity")}
                      </label>
                      <label htmlFor="" className="value">
                        LD-1234567891-1141
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="flexCOntent">
                      <label htmlFor="" className="key">
                        {t("Unit Price")}
                      </label>
                      <label htmlFor="" className="value">
                        LD-1234567891-1141
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="flexCOntent">
                      <label htmlFor="" className="key">
                        {t("Total Price")}
                      </label>
                      <label htmlFor="" className="value">
                        LD-1234567891-1141
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="flexCOntent">
                      <label htmlFor="" className="key">
                        {t("Loading Place")}
                      </label>
                      <label htmlFor="" className="value">
                        456789123
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="flexCOntent">
                      <label htmlFor="" className="key">
                        {t("Expected Loading Date")}
                      </label>
                      <label htmlFor="" className="value">
                        LD-1234567891-1141
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="flexCOntent">
                      <label htmlFor="" className="key">
                        {t("Driver Name")}
                      </label>
                      <label htmlFor="" className="value">
                        LD-1234567891-1141
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="flexCOntent">
                      <label htmlFor="" className="key">
                        {t("Driver Contact No.")}
                      </label>
                      <label htmlFor="" className="value">
                        LD-1234567891-1141
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderConfDetails;

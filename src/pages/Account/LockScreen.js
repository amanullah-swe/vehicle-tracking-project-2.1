import React from "react";
import logo from "../../assets/images/Customer-profile.png";
import Lock from "../../assets/images/Lock.svg";
import Rarrow from "../../assets/images/Right-arrow.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LockScreen = () => {
  const { t, i18n } = useTranslation();

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  return (
    <>
      <motion.div
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        <div className="full-body-wrap" id="LockScreen_Responsive">
          <div className="main-screen-box">
            <div className="top-head">
              <img src={logo} alt="img" className="profileimg" />
              <p>
                {t("VT Account")} <img src={Lock} alt="" />
              </p>
            </div>
            <div className="body">
              <p className="ID-mail mb-3">haris@probytes.in</p>
              <p className="password-info">
                {t("Please enter your password to un-lock")}.
              </p>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your password "
                />
                <Link to="/Dashboard">
                  <img src={Rarrow} alt="" />
                </Link>
              </div>
              <p className="Not-account">{t("Not VT Account")} ?</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LockScreen;

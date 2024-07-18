import { React, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import profile from "../../assets/images/Customer-profile.png";
import option from "../../assets/images/option-three-dot.svg";
import GreenIcon from "../../assets/images/Green-check.svg";
import { motion } from "framer-motion";
import { Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ReportDistributionContacts_Details = () => {
  const [show, setShow] = useState(false);
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { t, i18n } = useTranslation();

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
        <div id="cx-wrapper">
          <div
            className="main-dashboard-wrapper CustomerProfile"
            id="viewAdministratorProfile"
          >
            <div className="CustomerProfile-head">
              <div className="porile-img">
                <img src={profile} alt="porfile" />
              </div>
              <div className="customer-option">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <img src={option} alt="" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link to="/EditUser">{t("Edit")}</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link onClick={handleShow}>{t("Delete")}</Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="information-card">
              <div className="information-head">
                <div className="imformation-heading">
                  <p>{t("Contact Information")}</p>
                </div>
              </div>
              <div className="information-contain row">
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                  <p className="discription-heading">{t("Name")}</p>
                  <p className="discription-contain">Mark woods</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                  <p className="discription-heading">{t("Contact Number")}</p>
                  <p className="discription-contain">99999 99999</p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                  <p className="discription-heading">{t("Email")}</p>
                  <p className="discription-contain">
                    markwoods@gmail.com <img src={GreenIcon} alt="" />{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="information-card">
              <div className="information-head">
                <div className="imformation-heading">
                  <p>{t("General Information")}</p>
                </div>
              </div>
              <div className="information-contain row">
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Address")}</p>
                  <p className="discription-contain">
                    100, Vishrantwadi, Kalas, Pune Vishrantwadi, Kalas,
                    Pune-411005
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Modal show={show} onHide={handleClose} centered className="common-model">
        <Modal.Header closeButton>
          <Modal.Title>{t("Delete")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("Are you sure you want to delete this Report Distribution Contacts")}
          ?
        </Modal.Body>
        <Modal.Footer className="pop-up-modal-footer">
          <button className="cx-btn-1" onClick={handleClose}>
            {t("Close")}
          </button>
          <button className="cx-btn-2" onClick={handleClose}>
            {t("Yes")}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReportDistributionContacts_Details;

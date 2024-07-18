import React from "react";
import { useContext } from "react";
import { Form, Modal } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import uploadIcon from "../../assets/images/uploadIcon.svg";
import MapUplode from "../../assets/images/MapUplode.svg";
import CrossAroww from "../../assets/images/CrossAroww.svg";
import Report_Success from "../../assets/images/Report_Success.svg";
import Report_Reject from "../../assets/images/Report_Reject.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ReportIssue = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const { t, i18n } = useTranslation();

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const [success, setSuccess] = useState(false);
  const [reject, setReject] = useState(false);

  const [category, setCategory] = useState(" ");

  const [subcategory, setSubcategory] = useState([" "]);

  const [domain, setDomain] = useState([]);

  const [domainlisting, setDomainlisting] = useState([]);

  const SubCatogryList = (category) => {
    if (category === "") {
      setSubcategory([""]);
    }
    if (category === "Dashboard") {
      setSubcategory(["On-going Trips", "Other"]);
    }
    if (category === "Master Settings") {
      setSubcategory([
        "Customer Settings",
        "General Settings",
        "Integration Settings",
        "Transportation Settings",
        "Notification Settings",
        "Dispatch Settings",
        "Access Rights",
        "Addon Settings (Market Place)",
        "Log Change",
      ]);
    }
    if (category === "Master Data") {
      setSubcategory([
        "Vehicle",
        "Parking Station",
        "Point Of Interest",
        "Geofence Areas",
      ]);
    }
    if (category === "Users") {
      setSubcategory([
        "Administrator",
        "Transport Manager",
        "Driver’s",
        "Fleet Manager",
        "Delivery Person",
        "Vehicle Assistant",
        "User Insight",
      ]);
    }
    if (category === "Hardware Feature Set") {
      setSubcategory([
        "Immobilizer",
        "Fuel sensor",
        "I button",
        "Echo Driving",
        "Seat Belt sensor",
        "IVMS",
        "Card reader",
        "Over Speeding",
        "Crash Detection",
        "Excessive Idling",
        "Towing detection",
        "Temperature Sensors",
        "un plug detection",
      ]);
    }
    if (category === "Trip Management") {
      setSubcategory(["Trip", "Stop"]);
    }
    if (category === "Payment") {
      setSubcategory(["Invoiced", "Paid"]);
    }
    if (category === "Vehicle Expense") {
      setSubcategory([
        "Accident",
        "Accessory",
        "Spare Part",
        "Fine",
        "Fleet Maintenance",
        "Fuel Expenses",
      ]);
    }
    if (category === "Dispatch Management") {
      setSubcategory([
        "Dispatch Customer",
        "Orders",
        "Vehicle Booking Request",
        "Delivery Request",
        "Merchant",
      ]);
    }
    if (category === "Communication") {
      setSubcategory([
        "Announcement",
        "Email",
        "Push Notification",
        "Chat Support",
      ]);
    }
    if (category === "Reports") {
      setSubcategory([
        "Default Reports",
        "Scheduled Report",
        "Customized Reports",
      ]);
    }
    if (category === "Configuration Checker") {
      setSubcategory([""]);
    }
    if (category === "Parking Management") {
      setSubcategory(["Stations", "Suggested Vehicles"]);
    }
    if (category === "Replay or PLaybacks") {
      setSubcategory(["Vehicle 1", "Vehicle 2", "Vehicle 3"]);
    }
    if (category === "Fuel Management") {
      setSubcategory(["Dashboard", "Fuel Alerts"]);
    }
  };

  const domaininnerlIST = (domain) => {
    if (domain === "General Settings") {
      setDomainlisting(["Automation Settings"]);
    }
    if (domain === "Customer Settings") {
      setDomainlisting([]);
    }
  };



  return (
    <motion.div
      className={sidebar ? "taskMain " : "cx-active taskMain"}
      id="cx-main"
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}
    >
      <Form noValidate>
        <div id="cx-wrapper" className="Add_Parking_Slot">
          <div className="main-master-wrapper">
            <div className="Heading">
              <p>{t("Report Issue")}</p>
            </div>
            <div className="innerInputsGen">
              <div className="row">
                <div className="col-md-6 form_input_main">
                  <div className="innerSelectBox weekCounter">
                    <Form.Label className="common-labels">{t("Category")}</Form.Label>
                    <Form.Select
                      required
                      as="select"
                      type="select"
                      name="Speed_limit"
                      onClick={(e) => {
                        setCategory(e.target.value);
                        SubCatogryList(e.target.value);
                      }}
                    >
                      <option value="">Select Category...</option>
                      <option value="Dashboard">Dashboard</option>
                      <option value="Master Settings">Master Settings</option>
                      <option value="Master Data">Master Data</option>
                      <option value="Users">User’s</option>
                      <option value="Report Distribution Contacts">
                        Report Distribution Contacts
                      </option>
                      <option value="Hardware Feature Set">
                        Hardware Feature Set
                      </option>
                      <option value="Trip Management">Trip Management</option>
                      <option value="Vehicle Expense">Vehicle Expense</option>
                      <option value="Dispatch Management">
                        Dispatch Management
                      </option>
                      <option value="Payment">Payment</option>
                      <option value="Communication">Communication </option>
                      <option value="Reports">Reports </option>
                      <option value="Configuration Checker">
                        Configuration Checker
                      </option>
                      <option value="Parking Management">
                        Parking Management
                      </option>
                      <option value="Replay or PLaybacks">
                        Replay or PLaybacks
                      </option>
                      <option value="Fuel Management">Fuel Management</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please Select Status.
                    </Form.Control.Feedback>
                  </div>
                </div>
                <div className="col-md-6 form_input_main">
                  <div className="innerSelectBox weekCounter">
                    <Form.Label className="common-labels">
                      {t("Sub-Category")}
                    </Form.Label>
                    <Form.Select
                      required
                      as="select"
                      type="select"
                      name="Speed_limit"
                      onClick={(e) => {
                        setDomain(e.target.value);
                        domaininnerlIST(e.target.value);
                      }}
                    >
                      <option value="">Select Sub-Category...</option>
                      {subcategory.map((items) => {
                        return <option value={items}>{items}</option>;
                      })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please Select Status.
                    </Form.Control.Feedback>
                  </div>
                </div>
                {domain.length > 0 ? (
                  <div className="col-md-6 form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {domain}
                      </Form.Label>
                      <Form.Select
                        required
                        as="select"
                        type="select"
                        name="Speed_limit"
                      >
                        <option value="">Select Sub-Category...</option>
                        {domainlisting &&
                          domainlisting.map((items) => {
                            return <option value={items}>{items}</option>;
                          })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please Select Status.
                      </Form.Control.Feedback>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="col-md-6 form_input_main">
                  <div className="innerSelectBox weekCounter">
                    <Form.Label className="common-labels">
                      {t("Issue Name")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter name of the issue..."
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter name of the issue...
                    </Form.Control.Feedback>
                  </div>
                </div>
                <div className="col-md-6 form_input_main">
                  <div className="innerSelectBox weekCounter">
                    <Form.Label className="common-labels">{t("Priority")}</Form.Label>
                    <Form.Select
                      required
                      as="select"
                      type="select"
                      name="Speed_limit"
                    >
                      <option value="">Select Vehicles to assign...</option>
                      <option value="50">Vehicles 1</option>
                      <option value="100">Vehicles 2</option>
                      <option value="150">Vehicles 3</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please Select Priority *.
                    </Form.Control.Feedback>
                  </div>
                </div>
                <div className="col-md-12 form_input_main">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="common-labels">
                      {t("Description")}
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      required
                      placeholder="Enter your message here..."
                    />
                  </Form.Group>
                </div>
                <div className="col-lg-6">
                  <div className="fileDropper">
                    <label htmlFor="file" className="imageHolder">
                      <input type="file" id="file" className="d-none" />
                      <div className="innerFlex">
                        <img src={uploadIcon} className="browseImg" alt="" />
                        <p className="innerTxt">Drag & Drop Your File</p>
                        <p className="innerTxt">Or</p>
                        <label htmlFor="file2" className="browseBtn">
                          <input type="file" id="file2" className="d-none" />
                          <p className="mt-1">Browse File</p>
                        </label>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 file_uploded">
                  <div className="heading">Files</div>
                  <div className="file_preview">
                    <div className="single_file">
                      <div className="progress">50%</div>
                      <img src={MapUplode} alt="" className="MapImg" />
                    </div>
                    <div className="single_file">
                      <img src={CrossAroww} alt="" className="CrossAroww" />
                      <img src={MapUplode} alt="" className="MapImg" />
                    </div>
                    <div className="single_file">
                      <img src={CrossAroww} alt="" className="CrossAroww" />
                      <img src={MapUplode} alt="" className="MapImg" />
                    </div>
                    <div className="View_all_btn">
                      <Link to="/ViewReport">{t("View all")}</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center btn-wrapper">
                <button className="cx-btn-1">
                  <Link
                    to="#"
                    onClick={() => {
                      setReject(true);
                    }}
                  >
                    {t("Cancel")}
                  </Link>
                </button>
                <button className="cx-btn-2">
                  <Link
                    to="#"
                    onClick={() => {
                      setSuccess(true);
                    }}
                  >
                    {t("Send")}
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <Modal
            Modal
            show={success}
            onHide={() => {
              setSuccess(false);
            }}
            centered
            size="md"
            className="common-model Report_success"
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <img src={Report_Success} alt="" />
              <p className="mainHeading">
                Your report with Token No. <span>123456789</span> has been
                generated successfully.
              </p>
              <p className="notification">
                You will receive a notification when your request is resolved.
              </p>
              <p className="more">
                Find out more at the
                <span>
                  <Link to="/CustomerSupport">{t("Customer Support")}</Link>
                </span>
              </p>
            </Modal.Body>
          </Modal>
          <Modal
            Modal
            show={reject}
            onHide={() => {
              setReject(false);
            }}
            centered
            size="md"
            className="common-model Report_success"
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <img src={Report_Reject} alt="" />
              <p className="mainHeading">Error creating report token.</p>
              <p className="more">
                Find out more at the
                <span>
                  <Link to="/CustomerSupport">{t("Customer Support")}</Link>
                </span>
              </p>
            </Modal.Body>
          </Modal>
        </div>
      </Form>
    </motion.div>
  );
};

export default ReportIssue;

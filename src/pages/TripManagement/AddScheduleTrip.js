import React, { useContext, useState } from "react";
import { Form, Modal, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import Rcheck from "../../assets/images/red-check.svg";
import add_trip from "../../assets/images/add_trip.svg";
import add_stop_active from "../../assets/images/add_stop_active.svg";
import add_stop_inactive from "../../assets/images/add_stop_inactive.svg";
import geofence_active from "../../assets/images/geofence_active.svg";
import geofence_inactive from "../../assets/images/geofence_inactive.svg";
import view_active from "../../assets/images/view_active.svg";
import view_inactive from "../../assets/images/view_inactive.svg";
import step1 from "../../assets/images/step1.svg";
import step2 from "../../assets/images/step2.svg";
import laststep from "../../assets/images/laststep.svg";
import Geofance from "../../assets/images/Geo-fance.svg";
import Rectangle from "../../assets/images/Rectangle.svg";
import plam from "../../assets/images/plam.svg";
import { useNavigate } from "react-router";
import Multiselect from "multiselect-react-dropdown";
import Gcustomer from "../../assets/images/comp_icon.svg";
import untracked from "../../assets/images/start_icon.svg";
import idle from "../../assets/images/end_icon.svg";
import car from "../../assets/images/Catagiry_yellow_car.svg";
import driver_img from "../../assets/images/Customer-profile.png";
import { Link } from "react-router-dom";
import edit_icon from "../../assets/images/ic-edit.svg";
import delete_icon from "../../assets/images/delete.svg";
import error_icon from "../../assets/images/error_icon.svg";
import { Dropdown } from "react-bootstrap";
import option from "../../assets/images/option-three-dot.svg";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Calendar from "../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import MapComponent from "../../sharedComponent/MapComponent";
import { useTranslation } from "react-i18next";
const AddScheduleTrip = () => {
  const percentage = 66;
  const needDominantBaselineFix = true;
  const [startDate, setStartDate] = useState(new Date());
  const { t, i18n } = useTranslation();

  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);
  const [form4, setForm4] = useState(false);
  const [form5, setForm5] = useState(false);
  const [addnew, setAddnew] = useState(1);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handelNext = () => {
    if (
      form1 == true &&
      form2 == false &&
      form3 == false &&
      form5 == false &&
      form5 == false
    ) {
      setForm1(false);
      setForm2(true);
      setForm3(false);
      setForm4(false);
      setForm5(false);
    } else if (
      form1 == false &&
      form2 == true &&
      form3 == false &&
      form4 == false &&
      form5 == false
    ) {
      setForm1(false);
      setForm2(false);
      setForm3(true);
      setForm4(false);
      setForm5(false);
    } else if (
      form1 == false &&
      form2 == false &&
      form3 == true &&
      form4 == false &&
      form5 == false
    ) {
      setForm1(false);
      setForm2(false);
      setForm3(false);
      setForm4(true);
      setForm5(false);
    } else if (
      form1 == false &&
      form2 == false &&
      form3 == false &&
      form4 == true &&
      form5 == false
    ) {
      setForm1(false);
      setForm2(false);
      setForm3(false);
      setForm4(false);
      setForm5(true);
    } else if (form5 == true) {
      navigate("/Vehicle");
    }
  };
  const handelback = () => {
    if (
      form1 == true &&
      form2 == false &&
      form3 == false &&
      form4 == false &&
      form5 == false
    ) {
      navigate("/Vehicle");
    } else if (
      form1 == false &&
      form2 == true &&
      form3 == false &&
      form4 == false &&
      form5 == false
    ) {
      setForm1(true);
      setForm2(false);
      setForm3(false);
      setForm4(false);
      setForm5(false);
    } else if (
      form1 == false &&
      form2 == false &&
      form3 == true &&
      form4 == false &&
      form5 == false
    ) {
      setForm1(false);
      setForm2(true);
      setForm3(false);
      setForm4(false);
      setForm5(false);
    } else if (
      form1 == false &&
      form2 == false &&
      form3 == false &&
      form4 == true &&
      form5 == false
    ) {
      setForm1(false);
      setForm2(false);
      setForm3(true);
      setForm4(false);
      setForm5(false);
    } else if (
      form1 == false &&
      form2 == false &&
      form3 == false &&
      form4 == false &&
      form5 == true
    ) {
      setForm1(false);
      setForm2(false);
      setForm3(false);
      setForm4(true);
      setForm5(false);
    }
  };

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const projectList = () => {
    setAddnew(addnew + 1);
  };
  const RemoveProject = (index) => {
    setAddnew(addnew - 1);
  };

  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
   return (
    <motion.div className={sidebar ? "taskMain " : "cx-active taskMain"} id="cx-main" variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}>
      <div id="cx-wrapper">
        <div className="main-master-wrapper addvhical-main">
          <div className="addvhical-heading">
            <p>Add Schedule Trip</p>
            {form4 == true || form5 == true ? (
              <>
                <div className="dropdown-wrapper2 customer-option">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <img src={option} alt="" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to="#">Edit</Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="#">Delete</Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="dispatch-trip-stepper">
            <div className="single-step active">
              <img src={add_trip} alt="" />
            </div>
            {form2 == true ||
              form3 == true ||
              form4 == true ||
              form5 == true ? (
              <div className="single-step active">
                <img src={add_stop_active} alt="" />
              </div>
            ) : (
              <div className="single-step">
                <img src={add_stop_inactive} alt="" />
              </div>
            )}
            {form3 == true || form4 == true || form5 == true ? (
              <div className="single-step active">
                <img src={geofence_active} alt="" />
              </div>
            ) : (
              <div className="single-step">
                <img src={geofence_inactive} alt="" />
              </div>
            )}
            {form4 == true || form5 == true ? (
              <>
                <div className="single-step active last-step-dropdown">
                  <img src={view_active} alt="" />
                </div>
              </>
            ) : (
              <div className="single-step">
                <img src={view_inactive} alt="" />
              </div>
            )}
          </div>
          {form1 == true ? (
            <>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="information-card row">
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      Trip Name <span className="red-star">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Trip Name"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Trip Name.
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      Trip Type{" "}
                    </Form.Label>
                    <Form.Select>
                      <option selected disabled>
                        Select Trip Type
                      </option>
                      <option>Trip Type 1</option>
                      <option>Trip Type 2</option>
                    </Form.Select>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      Trip Start Location <span className="red-star">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Trip Start Location"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Trip Start Location.
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      Trip End Location <span className="red-star">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Trip End Location"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Trip End Location.
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      Trip Start Time <span className="red-star">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="time"
                      placeholder="Enter Start Time"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Start Time.
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      Trip End Time <span className="red-star">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="time"
                      placeholder="Enter End Time"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter End Time.
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      Driver Name
                    </Form.Label>
                    <Form.Select>
                      <option selected disabled>
                        Select Driver Name
                      </option>
                      <option>Driver 1</option>
                      <option>Driver 2</option>
                    </Form.Select>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">Vehicle</Form.Label>
                    <Form.Select>
                      <option selected disabled>
                        Select Vehicle..
                      </option>
                      <option>Vehicle 1</option>
                      <option>Vehicle 2</option>
                    </Form.Select>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      Trip Start Date <span className="red-star">*</span>
                    </Form.Label>
                    <div className="innerSelectBox weekCounter datepicker-main">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="form-control"
                      />
                      <img src={Calendar} className="calendarLogo" alt="" />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      Please Enter Start Date.
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      Trip End Date <span className="red-star">*</span>
                    </Form.Label>
                    <div className="innerSelectBox weekCounter datepicker-main">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="form-control"
                      />
                      <img src={Calendar} className="calendarLogo" alt="" />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      Please Enter End Date.
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">Trip Days</Form.Label>
                    <Form.Select>
                      <option selected disabled>
                        Select Days (Repeat, Custom)..
                      </option>
                      <option>Vehicle 1</option>
                      <option>Vehicle 2</option>
                    </Form.Select>
                  </div>
                  <div className="col-md-6 mb-4"></div>

                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      <div className="form-check form-switch trip-switch">
                        <div className="d-flex">
                          <label className="form-check-label" for="Monday">
                            Monday
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="Monday"
                          />
                        </div>
                      </div>
                    </Form.Label>
                    <Form.Control type="time" placeholder="Enter End Time" />
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      <div className="form-check form-switch trip-switch">
                        <div className="d-flex">
                          <label className="form-check-label" for="Tuesday">
                            Tuesday
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="Tuesday"
                          />
                        </div>
                      </div>
                    </Form.Label>
                    <Form.Control type="time" placeholder="Enter End Time" />
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      <div className="form-check form-switch trip-switch">
                        <div className="d-flex">
                          <label className="form-check-label" for="Wednesday">
                            Wednesday
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="Wednesday"
                          />
                        </div>
                      </div>
                    </Form.Label>
                    <Form.Control type="time" placeholder="Enter End Time" />
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      <div className="form-check form-switch trip-switch">
                        <div className="d-flex">
                          <label className="form-check-label" for="Thursday">
                            Thursday
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="Thursday"
                          />
                        </div>
                      </div>
                    </Form.Label>
                    <Form.Control type="time" placeholder="Enter End Time" />
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      <div className="form-check form-switch trip-switch">
                        <div className="d-flex">
                          <label className="form-check-label" for="Friday">
                            Friday
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="Friday"
                          />
                        </div>
                      </div>
                    </Form.Label>
                    <Form.Control type="time" placeholder="Enter End Time" />
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      <div className="form-check form-switch trip-switch">
                        <div className="d-flex">
                          <label className="form-check-label" for="Saturday">
                            Saturday
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="Saturday"
                          />
                        </div>
                      </div>
                    </Form.Label>
                    <Form.Control type="time" placeholder="Enter End Time" />
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      <div className="form-check form-switch trip-switch">
                        <div className="d-flex">
                          <label className="form-check-label" for="Sunday">
                            Sunday
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="Sunday"
                          />
                        </div>
                      </div>
                    </Form.Label>
                    <Form.Control type="time" placeholder="Enter End Time" />
                  </div>
                  <div className="col-md-12">
                    <div className="transportMap trip-map">
                      <div className="innerMap">
                      <MapComponent />
                      </div>
                      <div className="belowContent">
                        <div className="notific">
                          <img src={Gcustomer} alt="" />
                          <label>Company</label>
                        </div>
                        <div className="notific">
                          <img src={untracked} alt="" />
                          <label>Start Point</label>
                        </div>
                        <div className="notific">
                          <img src={idle} alt="" />
                          <label>End Point</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
              <div className="btn-common btn-wrapper">
                <button className="cx-btn-1" onClick={handelback}>
                  Cancel
                </button>
                <button className="cx-btn-2" onClick={handelNext}>
                  Continue
                </button>
              </div>
            </>
          ) : (
            ""
          )}
          {form2 == true ? (
            <>
              <Form noValidate onSubmit={handleSubmit}>
                <div className="information-card row">
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      Stop Name <span className="red-star">*</span>
                    </Form.Label>
                    <Form.Select>
                      <option selected disabled>
                        Select from existing stop locations...
                      </option>
                      <option>Stop 1</option>
                      <option>Stop 2</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please Select from existing stop locations
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      Search Stop
                    </Form.Label>
                    <Form.Control
                      type="search"
                      placeholder="Enter Proper Stop Address or Latitude, Longitude (example:-  8.4683046,76.9457075)..."
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="transportMap trip-map">
                      <div className="innerMap">
                      <MapComponent />
                      </div>
                      <div className="belowContent">
                        <div className="notific">
                          <img src={Gcustomer} alt="" />
                          <label>Company</label>
                        </div>
                        <div className="notific">
                          <img src={untracked} alt="" />
                          <label>Start Point</label>
                        </div>
                        <div className="notific">
                          <img src={idle} alt="" />
                          <label>End Point</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="main-master-wrapper mt-3">
                    <div className="Heading">
                      <p>Stop List</p>
                    </div>
                    <table className="holiday-table">
                      <thead className="ht-head">
                        <tr>
                          <td>Sr.No.</td>
                          <td>Stop Name</td>
                          <td>Stop Code</td>
                          <td>POI</td>
                          <td>Geofence Area</td>
                          <td>Priority</td>
                          <td>Action</td>
                        </tr>
                      </thead>
                      <tbody className="ht-body">
                        <tr className="table-row-custom">
                          <td>1</td>
                          <td>Kolhapur</td>
                          <td>Kolhapur</td>
                          <td>Yes</td>
                          <td>Kolhapur City</td>
                          <td>1</td>
                          <td>
                            <Link to="/EditStop">
                              <img src={edit_icon} alt="" />
                            </Link>
                            <Link to="#" onClick={handleShow}>
                              <img src={delete_icon} alt="" />
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Form>
              <div className="btn-common btn-wrapper">
                <button className="cx-btn-1" onClick={handelback}>
                  Cancel
                </button>
                <button className="cx-btn-2" onClick={handelNext}>
                  Continue
                </button>
              </div>
            </>
          ) : (
            ""
          )}
          {form3 == true ? (
            <>
              <div className="addnew-map">
                <div className="map-head">
                  <p>Set Route Geofencing Borders</p>
                  <div className="">
                    <img src={Geofance} alt="" className="c-pointer" />
                    <img src={Rectangle} alt="" className="c-pointer" />
                    <img src={plam} alt="" className="c-pointer" />
                  </div>
                </div>
                <div className="road-map">
                <MapComponent />
                </div>
              </div>
              <div className="btn-common btn-wrapper">
                <button className="cx-btn-1" onClick={handelback}>
                  Cancel
                </button>
                <button className="cx-btn-2" onClick={handelNext}>
                  Continue
                </button>
              </div>
            </>
          ) : (
            ""
          )}
          {form4 == true ? (
            <>
              <div className="main-master-wrapper">
                <div className="trip-details-wrapper">
                  <p>Trip Days Details</p>
                  <div className="trip-details-inner border-common">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="">Trip Vehicle</label>
                        <p>Car</p>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="">Trip Category</label>
                        <p>Scheduled / Dispatch</p>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="">Trip Type</label>
                        <p>Drop / Pickup</p>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="">Trip Start Point</label>
                        <p>Kolhapur, Maharashtra</p>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="">Trip End Point</label>
                        <p>Pune, Maharashtra</p>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="">Trip Driver</label>
                        <p>Mr. John Doe</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-master-wrapper">
                <div className="trip-details-wrapper">
                  <p>Trip Days Details</p>
                </div>
                <div className="trip-table-wrapper">
                  <table className="holiday-table">
                    <thead className="ht-head">
                      <tr>
                        <td>Sr.No.</td>
                        <td>Trip Date</td>
                        <td>Trip Days</td>
                        <td>Trip Day Start Time</td>
                        <td>Trip Day End Time</td>
                      </tr>
                    </thead>
                    <tbody className="ht-body">
                      <tr className="table-row-custom">
                        <td>1</td>
                        <td>22-01-2023</td>
                        <td>Monday</td>
                        <td>05:30:00 AM</td>
                        <td>05:30:00 PM</td>
                      </tr>
                      <tr className="table-row-custom">
                        <td>2</td>
                        <td>22-01-2023</td>
                        <td>Monday</td>
                        <td>05:30:00 AM</td>
                        <td>05:30:00 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="transportMap trip-map">
                <div className="innerMap">
                <MapComponent />
                </div>
                <div className="belowContent">
                  <div className="notific">
                    <img src={Gcustomer} alt="" />
                    <label>Company</label>
                  </div>
                  <div className="notific">
                    <img src={untracked} alt="" />
                    <label>Start Point</label>
                  </div>
                  <div className="notific">
                    <img src={idle} alt="" />
                    <label>End Point</label>
                  </div>
                </div>
              </div>
              <div className="btn-common btn-wrapper">
                <button className="cx-btn-1" onClick={handelback}>
                  Cancel
                </button>
                <button className="cx-btn-2" onClick={handelNext}>
                  Continue
                </button>
              </div>
            </>
          ) : (
            ""
          )}
          {/* <div className="btn-common">
          <button className="cx-btn-1" onClick={handelback}>
            Cancel
          </button>
          <button className="cx-btn-2" onClick={handelNext}>
            Continue
          </button>
        </div> */}
        </div>
        {form5 == true ? (
          <>
            <div className="main-master-wrapper">
              <div className="trip-details-wrapper">
                <p>Trip Details</p>
                <Link to="#">
                  <button className="end-trip-btn">End Trip</button>
                </Link>
              </div>
              <div className="trip-details-timeline">
                <div className="row">
                  <div className="col-md-3">
                    <div className="td-left-section">
                      <label htmlFor="">Pick-Up Location</label>
                      <p>Chala, Thiruvananthapuram - 695001, Kerala, India.</p>
                      <p>Start Date & Time: 22-01-2023, 04:04:58 AM</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="td-middle-section">
                      <div class="horizontal timeline">
                        <div class="steps">
                          <div class="step">
                            <img src={step1} alt="" />
                          </div>
                          <div class="step">
                            <img src={step2} alt="" />
                          </div>
                          <div class="step current">
                            <img src={step2} alt="" />
                          </div>
                          <div class="step">
                            <img src={step2} alt="" />
                          </div>
                          <div class="step">
                            <img src={laststep} alt="" />
                          </div>
                        </div>

                        <div class="line"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="td-right-section">
                      <label htmlFor="">Drop Location</label>
                      <p>Chala, Thiruvananthapuram - 695001, Kerala, India.</p>
                      <p>End Date & Time 25-01-2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="main-master-wrapper">
                  <div className="transportMap trip-map">
                    <div className="innerMap">
                      <p>Map Overview</p>
                      <MapComponent />
                    </div>
                    <div className="belowContent">
                      <div className="notific">
                        <img src={Gcustomer} alt="" />
                        <label>Company</label>
                      </div>
                      <div className="notific">
                        <img src={untracked} alt="" />
                        <label>Start Point</label>
                      </div>
                      <div className="notific">
                        <img src={idle} alt="" />
                        <label>End Point</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 g-0  ">
                <div className="main-master-wrapper">
                  <div className="vehicle-speed-chart">
                    <div className="vsc-heading">
                      <p>Vehicle Speed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-master-wrapper">
              <Tab.Container
                id="left-tabs-example"
                className="td-tab-wrapper"
                defaultActiveKey="0"
              >
                <Row>
                  <Col sm={12}>
                    <Nav variant="pills" className="td-nav">
                      <Nav.Item className="td-tab">
                        <Nav.Link className="td-link" eventKey="0">
                          Vehicle
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="td-tab">
                        <Nav.Link className="td-link" eventKey="1">
                          Driver
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="td-tab">
                        <Nav.Link className="td-link" eventKey="2">
                          Analytics
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="td-tab">
                        <Nav.Link className="td-link" eventKey="3">
                          Errors
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={12} className="">
                    <Tab.Content>
                      <Tab.Pane eventKey="0">
                        <div className="row g-0">
                          <div className="col-md-3 d-flex justify-content-center align-items-center">
                            <img src={car} alt="" />
                          </div>
                          <div className="col-md-9 mt-3">
                            <div className="vd-wrapper">
                              <div className="vd-inner">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label htmlFor="">Vehicle Name</label>
                                    <p>Volvo Transport</p>
                                  </div>
                                  <div className="col-md-4">
                                    <label htmlFor="">Vehicle Number</label>
                                    <p>MH-12-5022</p>
                                  </div>
                                  <div className="col-md-4">
                                    <label htmlFor="">
                                      Registration Number
                                    </label>
                                    <p>789456123104567</p>
                                  </div>
                                  <div className="col-md-4">
                                    <label htmlFor="">IMEI No.</label>
                                    <p>1234567894561230</p>
                                  </div>
                                  <div className="col-md-4">
                                    <label htmlFor="">Vehicle Type.</label>
                                    <p>Pick-Up Truck</p>
                                  </div>
                                  <div className="col-md-4">
                                    <label htmlFor="">
                                      Transportation Type
                                    </label>
                                    <p>Goods</p>
                                  </div>
                                  <div className="col-md-4">
                                    <label htmlFor="">
                                      Vehicle Capacity / Load
                                    </label>
                                    <p>1 Ton</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="1">
                        <div className="row g-0">
                          <div className="col-md-3 d-flex justify-content-center">
                            <div className="driver-profile">
                              <img src={driver_img} alt="" />
                            </div>
                          </div>
                          <div className="col-md-9 mt-3">
                            <div className="vd-wrapper">
                              <div className="vd-inner">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label htmlFor="">Driver Name</label>
                                    <p>Mark S. Woods</p>
                                  </div>
                                  <div className="col-md-4">
                                    <label htmlFor="">Contact No.</label>
                                    <p>99999 99999</p>
                                  </div>
                                  <div className="col-md-4">
                                    <label htmlFor="">Email</label>
                                    <p>markwoods@gmail.com</p>
                                  </div>
                                  <div className="col-md-4">
                                    <label htmlFor="">Vehicle Number.</label>
                                    <p>MH-12-2023</p>
                                  </div>
                                  <div className="col-md-4">
                                    <label htmlFor="">Vehicle Type.</label>
                                    <p>Toyota Innova</p>
                                  </div>
                                  <div className="col-md-4">
                                    <label htmlFor="">Address</label>
                                    <p>
                                      Vishrantwadi, Kalas Road, Pune- 411030.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="2">
                        <div className="progress-wrapper">
                          <div style={{ width: "150px" }}>
                            <CircularProgressbarWithChildren value={66}>
                              <div style={{ fontSize: 16 }}>
                                <strong className="progress-text">66</strong>
                              </div>
                            </CircularProgressbarWithChildren>
                            <p>Driver Score</p>
                          </div>
                          <div style={{ width: "150px" }}>
                            <CircularProgressbarWithChildren value={66}>
                              <div style={{ fontSize: 16 }}>
                                <strong className="progress-text">66</strong>
                              </div>
                            </CircularProgressbarWithChildren>
                            <p>Accidents Saved</p>
                          </div>
                          <div style={{ width: "150px" }}>
                            <CircularProgressbarWithChildren value={66}>
                              <div style={{ fontSize: 16 }}>
                                <strong className="progress-text">66</strong>
                              </div>
                            </CircularProgressbarWithChildren>
                            <p>Braking Frequency</p>
                          </div>
                          <div style={{ width: "150px" }}>
                            <CircularProgressbarWithChildren value={66}>
                              <div style={{ fontSize: 16 }}>
                                <strong className="progress-text">66</strong>
                              </div>
                            </CircularProgressbarWithChildren>
                            <p>Incentives</p>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="3">
                        <div className="error-list-wrapper">
                          <div className="error-list">
                            <img src={error_icon} alt="" />
                            <div className="error-text">
                              <label htmlFor="">
                                Vehicle error description goes here...{" "}
                              </label>
                              <p>31-01-2023, 04:05:58 PM</p>
                            </div>
                          </div>
                          <div className="error-list">
                            <img src={error_icon} alt="" />
                            <div className="error-text">
                              <label htmlFor="">
                                Vehicle error description goes here...{" "}
                              </label>
                              <p>31-01-2023, 04:05:58 PM</p>
                            </div>
                          </div>
                          <div className="error-list">
                            <img src={error_icon} alt="" />
                            <div className="error-text">
                              <label htmlFor="">
                                Vehicle error description goes here...{" "}
                              </label>
                              <p>31-01-2023, 04:05:58 PM</p>
                            </div>
                          </div>
                          <div className="error-list">
                            <img src={error_icon} alt="" />
                            <div className="error-text">
                              <label htmlFor="">
                                Vehicle error description goes here...{" "}
                              </label>
                              <p>31-01-2023, 04:05:58 PM</p>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
            <div className="main-master-wrapper">
              <Tab.Container
                id="left-tabs-example"
                className="td-tab-wrapper"
                defaultActiveKey="0"
              >
                <div className="trip-details-wrapper">
                  <p>Alerts</p>
                </div>
                <Row>
                  <Col sm={12}>
                    <Nav variant="pills" className="td-nav">
                      <Nav.Item className="td-tab">
                        <Nav.Link className="td-link" eventKey="0">
                          Alert Name
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="td-tab">
                        <Nav.Link className="td-link" eventKey="1">
                          Alert Name
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="td-tab">
                        <Nav.Link className="td-link" eventKey="2">
                          Alert Name
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={12} className="">
                    <Tab.Content>
                      <Tab.Pane eventKey="0">
                        <div className="alert-table-wrapper">
                          <table className="alert-table">
                            <thead className="ht-head">
                              <tr>
                                <td>Sr.No.</td>
                                <td>Event</td>
                                <td>Value</td>
                              </tr>
                            </thead>
                            <tbody className="ht-body">
                              <tr className="table-row-custom">
                                <td>1</td>
                                <td>Alert - 1</td>
                                <td>1</td>
                              </tr>
                              <tr className="table-row-custom">
                                <td>2</td>
                                <td>Alert - 2</td>
                                <td>10</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="1">
                        <div className="alert-table-wrapper">
                          <table className="alert-table">
                            <thead className="ht-head">
                              <tr>
                                <td>Sr.No.</td>
                                <td>Event</td>
                                <td>Value</td>
                              </tr>
                            </thead>
                            <tbody className="ht-body">
                              <tr className="table-row-custom">
                                <td>1</td>
                                <td>Alert - 1</td>
                                <td>1</td>
                              </tr>
                              <tr className="table-row-custom">
                                <td>2</td>
                                <td>Alert - 2</td>
                                <td>10</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="2">
                        <div className="alert-table-wrapper">
                          <table className="alert-table">
                            <thead className="ht-head">
                              <tr>
                                <td>Sr.No.</td>
                                <td>Event</td>
                                <td>Value</td>
                              </tr>
                            </thead>
                            <tbody className="ht-body">
                              <tr className="table-row-custom">
                                <td>1</td>
                                <td>Alert - 1</td>
                                <td>1</td>
                              </tr>
                              <tr className="table-row-custom">
                                <td>2</td>
                                <td>Alert - 2</td>
                                <td>10</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </>
        ) : (
          ""
        )}
        <Modal
          show={show}
          onHide={handleClose}
          centered
          className="common-model"
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Stop</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this Stop ?</Modal.Body>
          <Modal.Footer className="pop-up-modal-footer btn-wrapper">
            <button className="cx-btn-1" onClick={handleClose}>
              Close
            </button>
            <button className="cx-btn-2" onClick={handleClose}>
              Yes
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </motion.div>
  );
};

export default AddScheduleTrip;

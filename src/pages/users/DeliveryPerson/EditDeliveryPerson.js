import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import profile from "../../../assets/images/Update-profile.svg";
import camera from "../../../assets/images/ic-camera.svg";
import { Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Calendar from "../../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const EditDeliveryPerson = () => {

  const [startDate, setStartDate] = useState(new Date());
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
    <motion.div className={sidebar ? "taskMain " : "cx-active taskMain"} id="cx-main" variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}>
      <div id="cx-wrapper">
        <div className="main-dashboard-wrapper CustomerProfile">
          <div className="Heading">
            <p>{t("Edit Delivery Person Details")}</p>
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="CustomerProfile-head">
              <label
                htmlFor="uploadPic"
                className="porile-img d-block c-pointer"
              >
                <Form.Control
                  required
                  type="file"
                  id="uploadPic"
                  className="d-none"
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="select-picture-feedback"
                >
                  Please Choose Picture.
                </Form.Control.Feedback>

                <img src={profile} alt="porfile" />
                <img src={camera} alt="" className="cameraimg" />
              </label>
            </div>
            <div className="information-card row">
              <div className="col-md-6 mb-4">
                <Form.Label className="common-labels">
                  {t("First Name")} <span className="red-star">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Your First Name"
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Your First Name.
                </Form.Control.Feedback>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Label className="common-labels">
                  {t("User Password")} <span className="red-star">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter Your Password"
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Your Password
                </Form.Control.Feedback>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Label className="common-labels">{t("Last Name")}</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Last Name" />
              </div>
              <div className="col-md-6 mb-4">
                <Form.Label className="common-labels">
                  {t("Confirm Password")} <span className="red-star">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter Your Password"
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Password Again to Confirm
                </Form.Control.Feedback>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Label className="common-labels">
                  {t("Email")} <span className="red-star">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter Your Email"
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Your Email
                </Form.Control.Feedback>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Label className="common-labels">
                  {t("Internal Number")}
                </Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter Your Internal Number"
                />
              </div>
              <div className="col-md-6 mb-4">
                <Form.Label className="common-labels">
                  {t("Contact Number")} <span className="red-star">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="tel"
                  placeholder="Enter Your Contact Number"
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Your Contact Number
                </Form.Control.Feedback>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Label className="common-labels">{t("Joining Date")}</Form.Label>
                <div className="innerSelectBox weekCounter datepicker-main">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control"
                  />
                  <img src={Calendar} className="calendarLogo" alt="" />
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <Form.Label className="common-labels">{t("Address")}</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Address" />
              </div>
              <div className="col-md-6 mb-4">
                <Form.Label className="common-labels">{t("Date Of Birth")}</Form.Label>
                <div className="innerSelectBox weekCounter datepicker-main">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control"
                  />
                  <img src={Calendar} className="calendarLogo" alt="" />
                </div>
                <Form.Label className="common-labels">{t("Nationality")}</Form.Label>
                <Form.Select required>
                  <option selected disabled value="">
                    Select Country
                  </option>
                  <option value="1">Country 1</option>
                  <option value="2">Country 2</option>
                  <option value="3">Country 3</option>
                </Form.Select>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Label className="common-labels">{t("Gender")}</Form.Label>
                <Form.Select required>
                  <option selected disabled value="">
                    Select Gender
                  </option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </Form.Select>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Label className="common-labels">{t("City")}</Form.Label>
                <Form.Select required>
                  <option disabled selected value="">
                    Select City
                  </option>
                  <option value="1">City 1</option>
                  <option value="2">City 2</option>
                  <option value="3">City 3</option>
                </Form.Select>
              </div>
              <div className="edit-form-heading mb-3">
                <p>{t("Vehicle Details")}</p>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Label className="common-labels">
                  {t("Vehicle Number / Name")} <span className="red-star">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="tel"
                  placeholder="Enter Vehicle Number / Name"
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Your Vehicle Number / Name
                </Form.Control.Feedback>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Label className="common-labels">
                  {t("Registration Number")} <span className="red-star">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="tel"
                  placeholder="Enter Registration Number"
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Registration Number
                </Form.Control.Feedback>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Label className="label-with-radio">
                  <span className="common-labels">
                    {t("Vehicle Category")} <span className="red-star">*</span>
                  </span>
                  {/* <div className="radio-wrapper">
                    <p>
                      <label for="test2">Exisiting</label>
                      <input type="radio" id="test2" name="radio-group" />
                      <label for="test2"></label>
                    </p>
                    <p>
                      <label for="test3">New</label>
                      <input type="radio" id="test3" name="radio-group" />
                      <label for="test3"></label>
                    </p>
                  </div> */}
                  <div id="customRadios">
                    <div class="form-check greenFlex me-2">
                      <input class="form-check-input" type="radio" name="flexRadioDefault1" id="Exisiting" />
                      <label class="form-check-label custLabel" for="Exisiting">
                        {t("Exisiting")}
                      </label>
                    </div>
                    <div class="form-check  greenFlex">
                      <input class="form-check-input" type="radio" name="flexRadioDefault1" id="New" />
                      <label class="form-check-label custLabel" for="New">
                        {t("New")}
                      </label>
                    </div>
                  </div>
                </Form.Label>
                <Form.Select required>
                  <option disabled selected value="">
                    Select Vehicle Category
                  </option>
                  <option value="1">City 1</option>
                  <option value="2">City 2</option>
                  <option value="3">City 3</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please Select Vehicle Category
                </Form.Control.Feedback>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Label className="common-labels">
                  {t("Vehicle Capacity")} ({t("Packets")})
                </Form.Label>
                <Form.Select required>
                  <option disabled selected value="">
                    Select Vehicle Capacity...
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </Form.Select>
              </div>
            </div>

            <div class="btn-wrapper">
              <button type="" class="cx-btn-1">
                {t("Cancel")}
              </button>
              <button type="submit" class="cx-btn-2">
                {t("Update")}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </motion.div>
  );
};

export default EditDeliveryPerson;

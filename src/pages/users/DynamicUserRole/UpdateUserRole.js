
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import profile from "../../../assets/images/Update-profile.svg";
import camera from "../../../assets/images/ic-camera.svg";
import { Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Calendar from "../../../assets/images/calendar.svg";

import { motion } from "framer-motion";
import { multipartPostCall, simplePostCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";

import { createGlobalStyle } from "styled-components";
import moment from "moment/moment";
import { notifySuccess, notifyError } from "../../../sharedComponent/notify";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import Loader from "../../../sharedComponent/Loader";
import { useTranslation } from "react-i18next";

const UpdateUserRole = () => {
  const navigate = useNavigate();
  const { sidebar, setSidebar, UserRoleRoute, UserRole } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  
  const [AddTransport, setAddTransport] = useState({
    firstName: "",
    userPassword: "",
    lastName: "",
    confirmPassword: "",
    email: "",
    city: "",
    contactNumber: "",
    nationality: "",
    address: "",
    dateOfBirth: "",
    joiningDate: "",
    gender: "",
    internalNumber: "",
    profilePic: "",
    user_role:"",
    isImageChange: false,

    
  });
 
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const handleCancle = () => {
    setAddTransport({
      firstName: "",
      userPassword: "",
      lastName: "",
      confirmPassword: "",
      email: "",
      city: "",
      contactNumber: "",
      nationality: "",
      address: "",
      dateOfBirth: "",
      joiningDate: "",
      gender: "",
      internalNumber: "",
      profilePic: "",
    });
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      TransportHandal(event);
    }

    setValidated(true);
  };

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const params = useParams();
  let UserId = params.id;

  useEffect(() => {
    if (UserId) {
      geTransportmanagerDetails();
    }
  }, []);
  const geTransportmanagerDetails = () => {
    setLoading(true);
    let newRequestBody = JSON.stringify({
      user_id: UserId.toString(),
      user_role:UserRole

    });
    simplePostCall(ApiConfig.USER_PROFILE, newRequestBody)
      .then((res) => {
        let user_profile = res.data[0];
        setAddTransport({
          firstName: user_profile.user_name,
          userPassword: user_profile.user_password,
          lastName: user_profile.user_last_name,
          confirmPassword: user_profile.user_password,
          email: user_profile.user_email,
          city: user_profile.user_city,
          contactNumber: user_profile.user_mobile,
          nationality: user_profile.user_nationality,
          address: user_profile.user_address,
          dateOfBirth: moment(user_profile.user_dob).utc().format("YYYY-MM-DD"),
          joiningDate: moment(user_profile.user_joining_date)
            .utc()
            .format("YYYY-MM-DD"),
          gender: user_profile.user_gender,
          internalNumber: user_profile.user_internal_no,
          profilePic: user_profile.user_profile_pic,
        });
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const TransportHandal = (e) => {
    if (UserId) {
      UpdateTransport(e);
    } else {
      AddCreateTransport(e);
    }
  };

  const UpdateTransport = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("user_id", UserId);
    formData.append("user_role", UserRole);


    formData.append("firstName", AddTransport.firstName);
    formData.append("userPassword", AddTransport.userPassword);
    formData.append("lastName", AddTransport.lastName);
    formData.append("confirmPassword", AddTransport.confirmPassword);
    formData.append("email", AddTransport.email);
    formData.append("city", AddTransport.city);
    formData.append("contactNumber", AddTransport.contactNumber);
    formData.append("nationality", AddTransport.nationality);
    formData.append("address", AddTransport.address);
    formData.append(
      "dateOfBirth",
      moment(AddTransport.dateOfBirth).utc().format("YYYY-MM-DD")
    );
    formData.append(
      "joiningDate",
      moment(AddTransport.joiningDate).utc().format("YYYY-MM-DD")
    );
    formData.append("gender", AddTransport.gender);
    formData.append("internalNumber", AddTransport.internalNumber);
    formData.append("profilePic", AddTransport.profilePic);

    multipartPostCall(ApiConfig.USER_ROLE_UPDATE, formData)
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
          navigate(`${UserRoleRoute}`);
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };
  
  const AddCreateTransport = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("user_role", UserRole);

    formData.append("firstName", AddTransport.firstName);
    formData.append("userPassword", AddTransport.userPassword);
    formData.append("lastName", AddTransport.lastName);
    formData.append("confirmPassword", AddTransport.confirmPassword);
    formData.append("email", AddTransport.email);
    formData.append("city", AddTransport.city);
    formData.append("contactNumber", AddTransport.contactNumber);
    formData.append("nationality", AddTransport.nationality);
    formData.append("address", AddTransport.address);
    formData.append(
      "dateOfBirth",
      moment(AddTransport.dateOfBirth).utc().format("YYYY-MM-DD")
    );
    formData.append(
      "joiningDate",
      moment(AddTransport.joiningDate).utc().format("YYYY-MM-DD")
    );
    formData.append("gender", AddTransport.gender);
    formData.append("internalNumber", AddTransport.internalNumber);
    formData.append("profilePic", AddTransport.profilePic);

    multipartPostCall(ApiConfig.ADD_USER_ROLE, formData)
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
          navigate(`${UserRoleRoute}`);

        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      setAddTransport({
        ...AddTransport,
        [e.target.name]: e.target.files[0],
        isImageChange: true,
      });
    } else
      setAddTransport({ ...AddTransport, [e.target.name]: e.target.value });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
              <div className="main-dashboard-wrapper CustomerProfile">
                <div className="Heading">
                  <p>
               
                     Update  {UserRole}
                    
                  </p>
                </div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <div className="CustomerProfile-head">
                    <label
                      htmlFor="uploadPic"
                      className="porile-img d-block c-pointer"
                    >
                      <Form.Control
                        // required
                        type="file"
                        id="uploadPic"
                        className="d-none"
                        name="profilePic"
                        onChange={handleChange}
                      />

                      <Form.Control.Feedback
                        type="invalid"
                        className="select-picture-feedback"
                      >
                        {t("Please Choose Picture.")}
                      </Form.Control.Feedback>

                      <div className="main-img-wrapper">
                        <div className="profile-img-wrapper">
                          <img
                            src={
                              !AddTransport.profilePic
                                ? profile
                                : AddTransport.profilePic.length
                                ? 
                                  AddTransport.profilePic
                                : 
                                    AddTransport.profilePic &&
                                  URL.createObjectURL(AddTransport.profilePic)
                            }
                            alt="porfile"
                          />
                        </div>
                        <div className="camera-img-wrapper">
                          <img src={camera} alt="" />
                        </div>
                      </div>
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
                        value={AddTransport.firstName}
                        onChange={(e) => {
                          let value = e.target.value
                          let valueInput = value.replace(/[^A-Za-z ]/ig, '')
                          setAddTransport({
                            ...AddTransport,
                            firstName: valueInput,
                          });
                        }}
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
                        value={AddTransport.userPassword}
                        placeholder="Enter Your Password"
                        onChange={(e) => {
                          let value = e.target.value
                          let valueInput = value.replace(
                            /[^0-9]/gi,
                            ""
                          );
                          setAddTransport({
                            ...AddTransport,
                            userPassword: valueInput,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Your Password
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 mb-4">
                      <Form.Label className="common-labels">
                        {t("Last Name")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Your Last Name"
                        value={AddTransport.lastName}
                        required
                        onChange={(e) => {
                          let value = e.target.value
                          let valueInput = value.replace(/[^A-Za-z ]/ig, '')
                          setAddTransport({
                            ...AddTransport,
                            lastName: valueInput,
                          });
                        }}
                      />
                       <Form.Control.Feedback type="invalid">
                       Enter Your Last Name
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 mb-4">
                      <Form.Label className="common-labels">
                        {t("Confirm Password")}{" "}
                        <span className="red-star">*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="password"
                        value={AddTransport.confirmPassword}
                        placeholder="Enter Your Password"
                        onChange={(e) => {
                          let value = e.target.value
                          let valueInput = value.replace(
                            /[^0-9]/gi,
                            ""
                          );
                          setAddTransport({
                            ...AddTransport,
                            confirmPassword:valueInput,
                          });
                        }}
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
                        value={AddTransport.email}
                        placeholder="Enter Your Email"
                        onChange={(e) => {
                          setAddTransport({
                            ...AddTransport,
                            email: e.target.value,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Your Email
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 mb-4">
                      <Form.Label className="common-labels">{t("City")}</Form.Label>
                      
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Your city"
                        value={AddTransport.city}
                        onChange={(e) => {
                          let value = e.target.value
                          let valueInput = value.replace(/[^A-Za-z ]/ig, '')
                          setAddTransport({
                            ...AddTransport,
                            city: valueInput,
                          });
                        }}
                      />
                        <Form.Control.Feedback type="invalid">
                        Enter Your city
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 mb-4">
                      <Form.Label className="common-labels">
                        {t("Contact Number")}{" "}
                        <span className="red-star">*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Your Contact Number"
                        pattern="[1-9]{1}[0-9]{9}"
                        value={AddTransport.contactNumber}
                        maxLength={10}
                        onChange={(e) => {
                          let value = e.target.value;
                          let valueInput = value.replace(
                            /[^0-9]/gi,
                            ""
                          );
                          setAddTransport({
                            ...AddTransport,
                            contactNumber: valueInput,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Your Contact Number
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 mb-4">
                      <Form.Label className="common-labels">
                        {t("Nationality")}
                      </Form.Label>
                   
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Your Country"
                        value={AddTransport.nationality}
                        onChange={(e) => {
                          let value = e.target.value
                          let valueInput = value.replace(/[^A-Za-z ]/ig, '')
                          setAddTransport({
                            ...AddTransport,
                            nationality:valueInput,
                          });
                        }}
                      />
                       <Form.Control.Feedback type="invalid">
                       Enter Your Country
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <Form.Label className="common-labels">Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Address"
                        value={AddTransport.address}
                        required
                        onChange={(e) => {
                          setAddTransport({
                            ...AddTransport,
                            address: e.target.value,
                          });
                        }}
                      />
                        <Form.Control.Feedback type="invalid">
                       Enter Your Address
                      </Form.Control.Feedback>
                    </div>

                    <div className="col-md-6 mb-4">
                      <Form.Label className="common-labels">
                        {t("Date Of Birth")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          setDate={setAddTransport}
                          data={AddTransport}
                          dateKey="dateOfBirth"
                        />
                        <img src={Calendar} className="calendarLogo" alt="" />
                      </div>
                      

                      <Form.Label className="common-labels">
                        {t("Joining Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        {/* <DatePicker
                    selected={JoningDate}
                    onChange={(date) => setJoningDate(date)}
                    className="form-control"
                  /> */}
                        <CommonDatePicker
                          setDate={setAddTransport}
                          data={AddTransport}
                          dateKey="joiningDate"
                        />

                        <img src={Calendar} className="calendarLogo" alt="" />
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <Form.Label className="common-labels">{t("Gender")}</Form.Label>
                      <Form.Select
                        required
                        value={AddTransport.gender}
                        onChange={(e) => {
                          setAddTransport({
                            ...AddTransport,
                            gender: e.target.value,
                          });
                        }}
                      >
                        <option value="">Select Gender</option>
                        <option value="M">{t("Male")}</option>
                        <option value="F">{t("Female")}</option>
                      </Form.Select>
                    </div>
                    <div className="col-md-6 mb-4">
                      <Form.Label className="common-labels">
                        {t("Internal Number")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        placeholder="Enter Your Internal Number"
                        value={AddTransport.internalNumber}
                        maxLength={14}

                        onChange={(e) => {
                          let value = e.target.value
                          let valueInput = value.replace(
                            /[^0-9]/gi,
                            ""
                          );
                          setAddTransport({
                            ...AddTransport,
                            internalNumber: valueInput,
                          });
                        }}
                      />
                        <Form.Control.Feedback type="invalid">
                        Enter Your Internal Number
                      </Form.Control.Feedback>
                    </div>
                  </div>

                  <div class="btn-wrapper">
                    <button 
                     type="button"
                     className="cx-btn-1"
                     onClick={() => handleCancle()}
                    >
                      {t("Cancel")}
                    </button>
                    <button type="submit" class="cx-btn-2">
                      {UserId ? `${t("Update")}` : `${t("Submit")}`}
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default UpdateUserRole;

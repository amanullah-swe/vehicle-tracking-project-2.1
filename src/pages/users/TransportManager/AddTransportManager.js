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
import ImageUplode from "./ImageUplode";
import { createGlobalStyle } from "styled-components";
import moment from "moment/moment";
import { notifySuccess, notifyError } from "../../../sharedComponent/notify";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import Loader from "../../../sharedComponent/Loader";
import { useTranslation } from "react-i18next";
import MobilePhoneInput from "../../../sharedComponent/MobilePhoneInput";
import {
  countriesWithShortCode,
  latestDate,
} from "../../../sharedComponent/common";
import ImportUser from "../../../assets/images/imagesuser.png";
import CountrySelect from "../../../sharedComponent/CountrySelect";
import { Select } from "antd";
const { Option } = Select;
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const AddDeliveryPerson = () => {
  const navigate = useNavigate();
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const [btnDesable, setBtnDesable] = useState(false);
  const [AddTransport, setAddTransport] = useState({
    firstName: "",
    userPassword: "",
    lastName: "",
    confirmPassword: "",
    email: "",
    city: "",
    contactNumber: "",
    nationality: "India",
    address: "",
    dateOfBirth: "",
    joiningDate: "",
    gender: "",
    internalNumber: "",
    profilePic: "",
    user_country_code: "91",
    isImageChange: false,
  });
  const [errMsg, setErrMsg] = useState({
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

  useEffect(() => {
    if (typeof AddTransport.dateOfBirth == "object") {
      setErrMsg({
        ...errMsg,
        dateOfBirth: "",
      });
    }
    if (typeof AddTransport.joiningDate == "object") {
      setErrMsg({
        ...errMsg,
        joiningDate: "",
      });
    }
    if (AddTransport.contactNumber.length > 0) {
      setErrMsg({
        ...errMsg,
        contactNumber: "",
      });
    }
  }, [AddTransport]);

  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const handleCancle = () => {
    navigate("/TransportManager");
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
    });
    simplePostCall(ApiConfig.USER_TRANSPORT_VIEW, newRequestBody)
      .then((res) => {
        if (res) {
          if (res.result == true) {
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
              user_country_code: user_profile?.user_country_code,
              dateOfBirth: user_profile.user_dob,
              // ? moment(user_profile?.user_dob).utc().format("YYYY-MM-DD")
              // : "",
              joiningDate: user_profile.user_joining_date,
              // ? moment(user_profile.user_joining_date)
              //     .utc()
              //     .format("YYYY-MM-DD")
              // : "",
              gender: user_profile.user_gender,
              internalNumber: user_profile.user_internal_no,
              profilePic: user_profile.user_profile_pic,
            });
          } else {
            setAddTransport({});
          }
        }
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
    setBtnDesable(true);
    e.preventDefault();
    let formData = new FormData();
    formData.append("user_id", UserId);
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
      AddTransport.dateOfBirth
        ? latestDate(AddTransport.dateOfBirth, "yyyy-MM-dd")
        : ""
      // moment(AddTransport.dateOfBirth).utc().format("YYYY-MM-DD")
    );
    formData.append(
      "joiningDate",
      AddTransport.joiningDate
        ? latestDate(AddTransport.joiningDate, "yyyy-MM-dd")
        : ""
      // moment(AddTransport.joiningDate).utc().format("YYYY-MM-DD")
    );
    formData.append("gender", AddTransport.gender);
    formData.append("internalNumber", AddTransport.internalNumber);
    formData.append("profilePic", AddTransport.profilePic);
    formData.append("user_country_code", AddTransport?.user_country_code);
    multipartPostCall(ApiConfig.USER_TRANSPORT_UPDATE, formData)
      .then((res) => {
        setBtnDesable(false);
        if (res.result) {
          notifySuccess(res.message);
          navigate("/TransportManager");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const AddCreateTransport = (e) => {
    e.preventDefault();

    if (AddTransport.contactNumber === "") {
      setErrMsg({
        ...errMsg,
        contactNumber: "Please Enter Mobile Number",
      });
      return;
    }

    if (AddTransport.userPassword !== AddTransport?.confirmPassword) {
      setErrMsg({
        ...errMsg,
        confirmPassword: "Password Does Not Match.",
      });
      return;
    }
    if (AddTransport.confirmPassword.length < 8) {
      setErrMsg({
        ...errMsg,
        confirmPassword: "Password must be at least 8 characters ",
      });
      return;
    }
    if (typeof AddTransport.dateOfBirth != "object") {
      setErrMsg({
        ...errMsg,
        dateOfBirth: "please Select DOB",
      });
      return;
    }
    if (typeof AddTransport.joiningDate != "object") {
      setErrMsg({
        ...errMsg,
        joiningDate: "please Select Joining Date",
      });
      return;
    }
    // if (typeof AddTransport.driverLicenceIssueDt != 'object') {
    //   setErrMsg({
    //     ...errMsg,
    //     driverLicenceIssueDt: "please Select License Issue Date",
    //   });
    //   return;
    // }
    // if (typeof AddTransport.driverLicenceExpiryDt != 'object') {
    //   setErrMsg({
    //     ...errMsg,
    //     driverLicenceExpiryDt: "please Select License Expiry Date",
    //   });
    //   return;
    // }
    setBtnDesable(true);
    let formData = new FormData();
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
      AddTransport.dateOfBirth
        ? latestDate(AddTransport.dateOfBirth, "yyyy-MM-dd")
        : ""
      // moment(AddTransport.dateOfBirth).utc().format("YYYY-MM-DD")
    );
    formData.append(
      "joiningDate",
      AddTransport.joiningDate
        ? latestDate(AddTransport.joiningDate, "yyyy-MM-dd")
        : ""
      // moment(AddTransport.joiningDate).utc().format("YYYY-MM-DD")
    );
    formData.append("gender", AddTransport.gender);
    formData.append("internalNumber", AddTransport.internalNumber);
    formData.append("profilePic", AddTransport.profilePic);
    formData.append("user_country_code", AddTransport?.user_country_code);
    multipartPostCall(ApiConfig.USER_TRANSPORT_ADD, formData)
      .then((res) => {
        setBtnDesable(false);
        if (res.result) {
          notifySuccess(res.message);
          navigate("/TransportManager");
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
  var date = new Date();
  const mobileOnChangeHandler = (phone, country) => {
    setAddTransport({
      ...AddTransport,
      contactNumber: phone?.replace(country.dialCode, ""),
      user_country_code: country?.dialCode,
      nationality: countriesWithShortCode[country.countryCode?.toUpperCase()],
    });
  };
  const countrySelectOnSelect = (code) => {
    setAddTransport({
      ...AddTransport,
      nationality: countriesWithShortCode[code],
    });
  };
  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
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
                    {UserId
                      ? `${t("Edit Transport Manager Details")}`
                      : `${t("New Transport Manager Details")}`}
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
                        accept=".png, .jpg, .jpeg"
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
                              !AddTransport?.profilePic
                                ? profile
                                : AddTransport.profilePic.length
                                ? 
                                  AddTransport.profilePic
                                : 
                                    AddTransport.profilePic &&
                                  URL.createObjectURL(AddTransport?.profilePic)
                            }
                            onError={(ev) => {
                              handleErrorImage(ev);
                            }}
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
                        placeholder={t("Enter Your First Name")}
                        autocomplete="off"
                        value={AddTransport?.firstName}
                        onChange={(e) => {
                          let value = e.target.value;
                          let valueInput = value.replace(/[^A-Za-z ]/gi, "");
                          setAddTransport({
                            ...AddTransport,
                            firstName: valueInput,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter Your First Name.")}
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 mb-4">
                      <Form.Label className="common-labels">
                        {t("Last Name")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("Enter Your Last Name")}
                        value={AddTransport?.lastName}
                        required
                        onChange={(e) => {
                          let value = e.target.value;
                          let valueInput = value.replace(/[^A-Za-z ]/gi, "");
                          setAddTransport({
                            ...AddTransport,
                            lastName: valueInput,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("Enter Your Last Name")}
                      </Form.Control.Feedback>
                    </div>

                    <div className="col-md-6 mb-4">
                      <Form.Label className="common-labels">
                        {t("Email")} <span className="red-star">*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="email"
                        value={AddTransport?.email}
                        placeholder={t("Enter Your Email")}
                        onChange={(e) => {
                          setAddTransport({
                            ...AddTransport,
                            email: e.target.value,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("Enter Your Email")}
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 mb-4">
                      <Form.Label className="common-labels">
                        {t("Mobile Number ")}{" "}
                        <span className="red-star">*</span>
                      </Form.Label>
                      {/* <Form.Control
                        required
                        type="text"
                        placeholder="Enter Your Contact Number"
                        pattern="[1-9]{1}[0-9]{9}"
                        value={AddTransport.contactNumber}
                        maxLength={10}
                        onChange={(e) => {
                          let value = e.target.value;
                          let valueInput = value.replace(/[^0-9]/gi, "");
                          setAddTransport({
                            ...AddTransport,
                            contactNumber: valueInput,
                          });
                        }}
                      /> */}

                      <MobilePhoneInput
                        CommanCountry={AddTransport?.nationality}
                        commanNumber={AddTransport?.contactNumber}
                        commanContryCode={AddTransport?.user_country_code}
                        state={AddTransport}
                        onChangeHandler={mobileOnChangeHandler}
                      />

                      {errMsg?.contactNumber.length > 0 && (
                        <span className="text-danger">
                          {errMsg?.contactNumber}
                        </span>
                      )}
                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter Your Contact Number")}
                      </Form.Control.Feedback>
                    </div>

                    {!UserId && (
                      <>
                        <div className="col-md-6 mb-4">
                          <Form.Label className="common-labels">
                            {t("User Password")}{" "}
                            <span className="red-star">*</span>
                          </Form.Label>
                          <Form.Control
                            autocomplete="off"
                            required
                            type="password"
                            value={AddTransport?.userPassword}
                            placeholder={t("Enter Your Password")}
                            onChange={(e) => {
                              let value = e.target.value;
                              let valueInput = value.replace(
                                /[^0-9 A-Za-z @]/gi,
                                ""
                              );
                              setAddTransport({
                                ...AddTransport,
                                userPassword: valueInput,
                              });
                              setErrMsg({ ...errMsg, confirmPassword: "" });
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {t("Please Enter Your Password")}
                          </Form.Control.Feedback>
                        </div>

                        <div className="col-md-6 mb-4">
                          <Form.Label className="common-labels">
                            {t("Confirm Password")}{" "}
                            <span className="red-star">*</span>
                          </Form.Label>
                          <Form.Control
                            autocomplete="off"
                            required
                            type="password"
                            value={AddTransport?.confirmPassword}
                            placeholder={t("Enter Your Password")}
                            onChange={(e) => {
                              let value = e.target.value;
                              let valueInput = value.replace(
                                /[^0-9 A-Za-z @]/gi,
                                ""
                              );
                              setAddTransport({
                                ...AddTransport,
                                confirmPassword: valueInput,
                              });
                              setErrMsg({ ...errMsg, confirmPassword: "" });
                            }}
                          />
                          {errMsg?.confirmPassword.length > 0 && (
                            <span className="text-danger">
                              {errMsg?.confirmPassword}
                            </span>
                          )}
                          <Form.Control.Feedback type="invalid">
                            {t("Please Enter Password Again to Confirm")}
                          </Form.Control.Feedback>
                        </div>
                      </>
                    )}
                    <div className="col-lg-6 mb-4">
                      <Form.Label className="common-labels">
                        {t("Address")}
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        placeholder={t("Address")}
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
                        {t("Enter Your Address")}
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="col-md-12 mb-4">
                        <Form.Label className="common-labels">
                          {t("City")}
                        </Form.Label>

                        <Form.Control
                          required
                          type="text"
                          placeholder={t("Enter Your city")}
                          value={AddTransport?.city}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(/[^A-Za-z ]/gi, "");
                            setAddTransport({
                              ...AddTransport,
                              city: valueInput,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("Please Enter Your city")}
                        </Form.Control.Feedback>
                      </div>

                      <div className="col-md-12 mb-4 CountyListNPM">
                        <Form.Label className="common-labels">
                          {t("Nationality")}
                        </Form.Label>

                        <CountrySelect
                          countryName={AddTransport?.nationality}
                          state={AddTransport}
                          onChangeHandler={countrySelectOnSelect}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("Please Enter Your Country")}
                        </Form.Control.Feedback>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <Form.Label className="common-labels">
                        {t("Gender")}
                      </Form.Label>
                      <div className="multi-select-1">
                        <Select
                          required
                          style={{ width: "100%", height: "40px" }}
                          value={AddTransport.gender}
                          onChange={(value) => {
                            setAddTransport({
                              ...AddTransport,
                              gender: value,
                            });
                          }}
                          className="custom-select"
                        >
                          <Option
                            value=""
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            Select Gender
                          </Option>
                          <Option
                            value="M"
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            {t("Male")}
                          </Option>
                          <Option
                            value="F"
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            {t("Female")}
                          </Option>
                        </Select>
                      </div>
                      <Form.Control.Feedback type="invalid">
                        {t("Please Select your gender")}
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
                        {errMsg?.dateOfBirth.length > 0 && (
                          <span className="text-danger">
                            {errMsg?.dateOfBirth}
                          </span>
                        )}
                        {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <Form.Label className="common-labels">
                        {t("Joining Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          setDate={setAddTransport}
                          data={AddTransport}
                          dateKey="joiningDate"
                          // minDate={date}
                        />
                        {errMsg?.joiningDate.length > 0 && (
                          <span className="text-danger">
                            {errMsg?.joiningDate}
                          </span>
                        )}
                        {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <Form.Label className="common-labels">
                        {t("Employee Code")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        placeholder={t("Enter Your Internal Number")}
                        value={AddTransport?.internalNumber}
                        maxLength={14}
                        onChange={(e) => {
                          let value = e.target.value;
                          let valueInput = value.replace(/[^0-9]/gi, "");
                          setAddTransport({
                            ...AddTransport,
                            internalNumber: valueInput,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter Your Employee Code")}
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
                      {btnDesable && (
                        <div class="spinner-border cx-btn-load" role="status">
                          <span class="sr-only"> </span>
                        </div>
                      )}
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

export default AddDeliveryPerson;

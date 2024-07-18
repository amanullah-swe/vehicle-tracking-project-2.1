import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import profile from "../../../assets/images/Update-profile.svg";
import camera from "../../../assets/images/ic-camera.svg";
import { Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Calendar from "../../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { multipartPostCall, simplePostCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import { useEffect } from "react";
import moment from "moment";
import { useId } from "react";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import Loader from "../../../sharedComponent/Loader";
import { useTranslation } from "react-i18next";
import { ta } from "date-fns/locale";
import MobilePhoneInput from "../../../sharedComponent/MobilePhoneInput";
import CountrySelect from "../../../sharedComponent/CountrySelect";
import { countriesWithShortCode } from "../../../sharedComponent/common";
import ImportUser from "../../../assets/images/imagesuser.png";
import { Select } from "antd";
const { Option } = Select;
const AddVehicleAssistants = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const { t, i18n } = useTranslation();

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCancle = () => {
    navigate("/VehicleAssistants");
    setVehicleAssistans({
      userName: "",
      userPassword: "",
      userLastName: "",
      confirmPassword: "",
      userEmail: "",
      userMobile: "",
      userNationality: "",
      userAddress: "",
      userDob: "",
      userJoiningDate: "",
      userGender: "",
      userInternalNo: "",
      userProfilePic: "",
      userCity: "",
      userMifarecardID: "",
    });
  };
  const [VehicleAssistans, setVehicleAssistans] = useState({
    userName: "",
    userPassword: "",
    userLastName: "",
    confirmPassword: "",
    userEmail: "",
    userMobile: "",
    userNationality: "India",
    userAddress: "",
    userDob: "",
    userJoiningDate: "",
    userGender: "",
    userInternalNo: "",
    userProfilePic: "",
    userCity: "",
    userMifarecardID: "",
    user_country_code: "91",
  });
  const [errMsg, setErrMsg] = useState({
    userName: "",
    userLastName: "",
    userEmail: "",
    userMobile: "",
    userNationality: "",
    userAddress: "",
    userDob: "",
    userJoiningDate: "",
    userGender: "",
    userInternalNo: "",
    profilePic: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (VehicleAssistans.userMobile.length > 0) {
      setErrMsg({
        ...errMsg,
        userMobile: "",
      });
    }

    if (typeof VehicleAssistans.userDob == "object") {
      setErrMsg({
        ...errMsg,
        userDob: "",
      });
    }
    if (typeof VehicleAssistans.userJoiningDate == "object") {
      setErrMsg({
        ...errMsg,
        userJoiningDate: "",
      });
    }
  }, [VehicleAssistans]);
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
  const [btnDesable, setBtnDesable] = useState(false);
  const params = useParams();
  let UserId = params.id;
  useEffect(() => {
    if (UserId) {
      geFleetDetails();
    }
  }, []);
  const geFleetDetails = () => {
    setLoading(true);
    let newRequestBody = JSON.stringify({
      user_id: UserId.toString(),
    });
    simplePostCall(ApiConfig.VEHICLE_ASISTANTS_PROFLIE, newRequestBody)
      .then((res) => {
        let user_profile = res.data[0];
        setVehicleAssistans({
          userName: user_profile.user_name,
          userPassword: user_profile.user_password,
          userLastName: user_profile.user_last_name,
          confirmPassword: user_profile.user_password,
          userEmail: user_profile.user_email,
          userMobile: user_profile?.user_mobile,
          userCity: user_profile.user_city,
          userNationality: user_profile.user_nationality,
          userAddress: user_profile.user_address,
          userDob: user_profile?.user_dob
            ? moment(user_profile?.user_dob).utc().format("YYYY-MM-DD")
            : "",
          userJoiningDate: user_profile?.user_joining_date
            ? moment(user_profile?.user_joining_date).utc().format("YYYY-MM-DD")
            : "",
          userGender: user_profile.user_gender,
          userInternalNo: user_profile.user_internal_no,
          userProfilePic: user_profile.user_profile_pic,
          userMifarecardID: user_profile.userMifarecardID,
          user_country_code: user_profile.user_country_code,
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
      UpdateManager(e);
    } else {
      AddCreateManager(e);
    }
  };

  const UpdateManager = (e) => {
    e.preventDefault();
    setBtnDesable(true);
    let formData = new FormData();
    formData.append("user_id", UserId);

    formData.append("userName", VehicleAssistans.userName);
    formData.append("userPassword", VehicleAssistans.userPassword);
    formData.append("userLastName", VehicleAssistans.userLastName);
    formData.append("confirmPassword", VehicleAssistans.confirmPassword);
    formData.append("userEmail", VehicleAssistans.userEmail);
    formData.append("userCity", VehicleAssistans.userCity);
    formData.append("userMobile", VehicleAssistans.userMobile);
    formData.append("userNationality", VehicleAssistans.userNationality);
    formData.append("userAddress", VehicleAssistans.userAddress);
    formData.append(
      "userDob",
      moment(VehicleAssistans.userDob).utc().format("YYYY-MM-DD")
    );
    formData.append(
      "userJoiningDate",
      moment(VehicleAssistans.userJoiningDate).utc().format("YYYY-MM-DD")
    );
    formData.append("userGender", VehicleAssistans.userGender);
    formData.append("userInternalNo", VehicleAssistans.userInternalNo);
    formData.append("userMifarecardID", VehicleAssistans.userMifarecardID);
    formData.append("userProfilePic", VehicleAssistans.userProfilePic);
    formData.append("user_country_code", VehicleAssistans?.user_country_code);
    multipartPostCall(ApiConfig.VEHICLE_ASISTANTS_UPDATE, formData)
      .then((res) => {
        setBtnDesable(false);
        if (res.result) {
          notifySuccess(res.message);
          navigate("/VehicleAssistants");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const AddCreateManager = (e) => {
    e.preventDefault();
    if (VehicleAssistans.userMobile.length === 0) {
      setErrMsg({
        ...errMsg,
        userMobile: "Please Enter Mobile Number",
      });
      return;
    }

    if (VehicleAssistans.userPassword !== VehicleAssistans?.confirmPassword) {
      setErrMsg({
        ...errMsg,
        confirmPassword: "Password Does Not Match.",
      });
      return;
    }
    if (VehicleAssistans.confirmPassword.length < 8) {
      setErrMsg({
        ...errMsg,
        confirmPassword: "Password must be at least 8 characters ",
      });
      return;
    }

    if (typeof VehicleAssistans.userDob != "object") {
      setErrMsg({
        ...errMsg,
        userDob: "please Select DOB",
      });
      return;
    }
    if (typeof VehicleAssistans.userJoiningDate != "object") {
      setErrMsg({
        ...errMsg,
        userJoiningDate: "please Select Joining Date",
      });
      return;
    }
    setBtnDesable(true);
    let formData = new FormData();
    formData.append("userName", VehicleAssistans.userName);
    formData.append("userPassword", VehicleAssistans.userPassword);
    formData.append("userLastName", VehicleAssistans.userLastName);
    formData.append("confirmPassword", VehicleAssistans.confirmPassword);
    formData.append("userEmail", VehicleAssistans.userEmail);
    formData.append("userCity", VehicleAssistans.userCity);
    formData.append("userMobile", VehicleAssistans.userMobile);
    formData.append("userNationality", VehicleAssistans.userNationality);
    formData.append("userAddress", VehicleAssistans.userAddress);
    formData.append(
      "userDob",
      moment(VehicleAssistans.userDob).utc().format("YYYY-MM-DD")
    );
    formData.append(
      "userJoiningDate",
      moment(VehicleAssistans.userJoiningDate).utc().format("YYYY-MM-DD")
    );
    formData.append("userGender", VehicleAssistans.userGender);
    formData.append("userInternalNo", VehicleAssistans.userInternalNo);
    formData.append("userMifarecardID", VehicleAssistans.userMifarecardID);
    formData.append("userProfilePic", VehicleAssistans.userProfilePic);
    formData.append("user_country_code", VehicleAssistans?.user_country_code);
    multipartPostCall(ApiConfig.VEHICLE_ASISTANTS_ADD, formData)
      .then((res) => {
        setBtnDesable(false);
        if (res.success) {
          notifySuccess(res.message);
          navigate("/VehicleAssistants");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target.name === "userProfilePic") {
      setVehicleAssistans({
        ...VehicleAssistans,
        [e.target.name]: e.target.files[0],
        isImageChange: true,
      });
    } else
      setVehicleAssistans({
        ...VehicleAssistans,
        [e.target.name]: e.target.value,
      });
  };
  var date = new Date();
  const mobileOnChangeHandler = (phone, country) => {
    setVehicleAssistans({
      ...VehicleAssistans,
      userMobile: phone?.replace(country.dialCode, ""),
      user_country_code: country?.dialCode,
      userNationality:
        countriesWithShortCode[country.countryCode?.toUpperCase()],
    });
  };
  const countrySelectOnSelect = (code) => {
    setVehicleAssistans({
      ...VehicleAssistans,
      userNationality: countriesWithShortCode[code],
    });
  };
  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <div id="cx-wrapper">
            <div className="main-dashboard-wrapper CustomerProfile">
              <div className="Heading">
                <p>
                  {UserId
                    ? t("Update Vehicle Assistant Details")
                    : t("Add Vehicle Assistant Details")}
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
                      name="userProfilePic"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleChange}
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      className="select-picture-feedback"
                    >
                      {t("Please Choose Picture")}.
                    </Form.Control.Feedback>

                    <div className="main-img-wrapper">
                      <div className="profile-img-wrapper">
                        <img
                          src={
                            !VehicleAssistans.userProfilePic
                              ? profile
                              : VehicleAssistans.userProfilePic.length
                              ? 
                                VehicleAssistans.userProfilePic
                              : 
                                  VehicleAssistans.userProfilePic &&
                                URL.createObjectURL(
                                  VehicleAssistans.userProfilePic
                                )
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
                      value={VehicleAssistans.userName}
                      onChange={(e) => {
                        let value = e.target.value;
                        let valueInput = value.replace(/[^A-Za-z ]/gi, "");
                        setVehicleAssistans({
                          ...VehicleAssistans,
                          userName: valueInput,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("Please Enter Your First Name")}.
                    </Form.Control.Feedback>
                  </div>

                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Last Name")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("Enter Your Last Name")}
                      value={VehicleAssistans.userLastName}
                      onChange={(e) => {
                        let value = e.target.value;
                        let valueInput = value.replace(/[^A-Za-z ]/gi, "");
                        setVehicleAssistans({
                          ...VehicleAssistans,
                          userLastName: valueInput,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("Please Enter Your Last Name")}
                    </Form.Control.Feedback>
                  </div>

                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Email")} <span className="red-star">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder={t("Enter Your Email")}
                      value={VehicleAssistans.userEmail}
                      onChange={(e) => {
                        setVehicleAssistans({
                          ...VehicleAssistans,
                          userEmail: e.target.value,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                     {t("Please Enter Your Email")}
                    </Form.Control.Feedback>
                  </div>

                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Mobile Number")} <span className="red-star">*</span>
                    </Form.Label>
                    {/* <Form.Control
                      required
                      type="tel"
                      placeholder="Enter Your Mobile Number"
                      value={VehicleAssistans.userMobile}
                      onChange={(e) => {
                        let value = e.target.value

                        let valueInput = value.replace(
                          /[^0-9]/gi,
                          ""
                        );
                        setVehicleAssistans({
                          ...VehicleAssistans,
                          userMobile:valueInput,
                        });
                      }}
                    /> */}
                    <MobilePhoneInput
                      CommanCountry={VehicleAssistans?.userNationality}
                      commanNumber={VehicleAssistans?.userMobile}
                      commanContryCode={VehicleAssistans?.user_country_code}
                      state={VehicleAssistans}
                      onChangeHandler={mobileOnChangeHandler}
                    />
                    {errMsg?.userMobile.length > 0 && (
                      <span className="text-danger">{errMsg?.userMobile}</span>
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
                          required
                          type="password"
                          placeholder={t("Enter Your Password")}
                          value={VehicleAssistans.userPassword}
                          onChange={(e) => {
                            let value = e.target.value;

                            let valueInput = value.replace(
                              /[^0-9 A-Za-z @]/gi,
                              ""
                            );
                            setVehicleAssistans({
                              ...VehicleAssistans,
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
                          required
                          type="password"
                          placeholder={t("Enter Your Password")}  
                          value={VehicleAssistans.confirmPassword}
                          onChange={(e) => {
                            let value = e.target.value;

                            let valueInput = value.replace(
                              /[^0-9 A-Za-z @]/gi,
                              ""
                            );
                            setVehicleAssistans({
                              ...VehicleAssistans,
                              confirmPassword: valueInput,
                            });
                            setErrMsg({ ...errMsg, confirmPassword: "" });
                          }}
                        />
                        {errMsg?.confirmPassword?.length > 0 && (
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
                      required
                      as="textarea"
                      rows={6}
                      placeholder={t("Address")}
                      value={VehicleAssistans?.userAddress}
                      onChange={(e) => {
                        setVehicleAssistans({
                          ...VehicleAssistans,
                          userAddress: e.target.value,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("Please Enter Your Address")}
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="col-md-12 mb-4">
                      <Form.Label className="common-labels">
                        {t("City")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Your City")}
                        value={VehicleAssistans.userCity}
                        onChange={(e) => {
                          let value = e.target.value;
                          let valueInput = value.replace(/[^A-Za-z ]/gi, "");
                          setVehicleAssistans({
                            ...VehicleAssistans,
                            userCity: valueInput,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter Your City")}
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-12 mb-4 CountyListNPM">
                      <Form.Label className="common-labels">
                        {t("Nationality")}
                      </Form.Label>
                      <CountrySelect
                        countryName={VehicleAssistans.userNationality}
                        state={VehicleAssistans}
                        onChangeHandler={countrySelectOnSelect}
                      />
                      {/* <Form.Control
                      required
                      type="text"
                      placeholder="Enter Your Country"
                      value={VehicleAssistans.userNationality}
                      onChange={(e) => {
                        setVehicleAssistans({
                          ...VehicleAssistans,
                          userNationality: e.target.value,
                        });
                      }} */}
                      {/* /> */}
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Gender")}
                    </Form.Label>
                    <div className="multi-select-1">
                      <Select
                        style={{ width: "100%", height: "40px" }}
                        required
                        value={VehicleAssistans?.userGender}
                        onChange={(value) => {
                          setVehicleAssistans({
                            ...VehicleAssistans,
                            userGender: value,
                          });
                        }}
                        className="custom-select"
                      >
                        <Option selected disabled value="">
                        {t("Select Gender")}  
                        </Option>
                        <Option value="M" style={{ color: "rgba(156, 73, 0)" }}>
                          {t("Male")}
                        </Option>
                        <Option value="F" style={{ color: "rgba(156, 73, 0)" }}>
                          {t("Female")}
                        </Option>
                        <Option value="O" style={{ color: "rgba(156, 73, 0)" }}>
                          {t("other")}
                        </Option>
                      </Select>
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {t("Please Select Your Gender")}
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Date Of Birth")}
                    </Form.Label>
                    <div className="innerSelectBox weekCounter datepicker-main">
                      <CommonDatePicker
                        setDate={setVehicleAssistans}
                        data={VehicleAssistans}
                        dateKey="userDob"
                      />
                      {errMsg?.userDob.length > 0 && (
                        <span className="text-danger">{errMsg?.userDob}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Joining Date")}
                    </Form.Label>
                    <div className="innerSelectBox weekCounter datepicker-main">
                      <CommonDatePicker
                        setDate={setVehicleAssistans}
                        data={VehicleAssistans}
                        dateKey="userJoiningDate"
                        // minDate={date}
                      />

                      {errMsg?.userJoiningDate.length > 0 && (
                        <span className="text-danger">
                          {errMsg?.userJoiningDate}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels ">
                      {t("Employee Code")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      placeholder={t("Enter Your Employee Code")}
                      value={VehicleAssistans.userInternalNo}
                      onChange={(e) => {
                        let value = e.target.value;

                        let valueInput = value.replace(/[^0-9]/gi, "");
                        setVehicleAssistans({
                          ...VehicleAssistans,
                          userInternalNo: valueInput,
                        });
                      }}
                    />
        <Form.Control.Feedback type="invalid">
                      {t("Please Enter Your Employee Code")}
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Mifarecard ID")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("Enter Your Mifarecard Id")}
                      className=""
                      value={VehicleAssistans.userMifarecardID}
                      onChange={(e) => {
                        setVehicleAssistans({
                          ...VehicleAssistans,
                          userMifarecardID: e.target.value,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("Please Enter Mifarecard Id")}
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
        </>
      )}
    </motion.div>
  );
};

export default AddVehicleAssistants;

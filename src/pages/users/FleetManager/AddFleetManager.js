import React, { useContext, useEffect, useState } from "react";
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
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import ApiConfig from "../../../api/ApiConfig";
import moment from "moment";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import Loader from "../../../sharedComponent/Loader";
import ImportUser from "../../../assets/images/imagesuser.png";
import { useTranslation } from "react-i18next";
import CountrySelect from "../../../sharedComponent/CountrySelect";
import MobilePhoneInput from "../../../sharedComponent/MobilePhoneInput";
import { countriesWithShortCode } from "../../../sharedComponent/common";
import { Select } from "antd";
const { Option } = Select;
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const AddFleetManager = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [AddFleetManager, setAddFleetManager] = useState({
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
    user_country_code: "91",
  });
  const handleCancle = () => {
    navigate("/FleetManager");
    setAddFleetManager({
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
    simplePostCall(ApiConfig.FLEET_MANAGER_VIEW, newRequestBody)
      .then((res) => {
        let user_profile = res.data[0];
        setAddFleetManager({
          userName: user_profile.user_name,
          userPassword: user_profile.user_password,
          userLastName: user_profile.user_last_name,
          confirmPassword: user_profile.user_password,
          userEmail: user_profile.user_email,
          userMobile: user_profile.user_mobile,
          userCity: user_profile.user_city,
          userNationality: user_profile.user_nationality,
          userAddress: user_profile.user_address,
          userDob: user_profile.user_dob
            ? moment(user_profile.user_dob).utc().format("YYYY-MM-DD")
            : "",
          userJoiningDate: user_profile.user_joining_date
            ? moment(user_profile.user_joining_date).utc().format("YYYY-MM-DD")
            : "",
          userGender: user_profile.user_gender,
          userInternalNo: user_profile.user_internal_no,
          userProfilePic: user_profile.user_profile_pic,
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
    formData.append("userName", AddFleetManager.userName);
    formData.append("userPassword", AddFleetManager.userPassword);
    formData.append("userLastName", AddFleetManager.userLastName);
    formData.append("confirmPassword", AddFleetManager.confirmPassword);
    formData.append("userEmail", AddFleetManager.userEmail);
    formData.append("userCity", AddFleetManager.userCity);
    formData.append("userMobile", AddFleetManager.userMobile);
    formData.append("userNationality", AddFleetManager.userNationality);
    formData.append("userAddress", AddFleetManager.userAddress);
    formData.append(
      "userDob",
      moment(AddFleetManager.userDob).utc().format("YYYY-MM-DD")
    );
    formData.append(
      "userJoiningDate",
      moment(AddFleetManager.userJoiningDate).utc().format("YYYY-MM-DD")
    );
    formData.append("userGender", AddFleetManager.userGender);
    formData.append("userInternalNo", AddFleetManager.userInternalNo);
    formData.append("userProfilePic", AddFleetManager.userProfilePic);
    formData.append("user_country_code", AddFleetManager?.user_country_code);
    multipartPostCall(ApiConfig.FLEET_UPDATE_PROFLIE, formData)
      .then((res) => {
        setBtnDesable(false);
        if (res.success) {
          notifySuccess(res.message);
          navigate("/FleetManager");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };
  const [errMsg, setErrMsg] = useState({
    userMobile: "",
    userDob: "",
    userJoiningDate: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (typeof AddFleetManager.userDob == "object") {
      setErrMsg({
        ...errMsg,
        userDob: "",
      });
    }
    if (typeof AddFleetManager.userJoiningDate == "object") {
      setErrMsg({
        ...errMsg,
        userJoiningDate: "",
      });
    }
    if (AddFleetManager?.userMobile.length > 0) {
      setErrMsg({
        ...errMsg,
        userMobile: "",
      });
    }
  }, [AddFleetManager]);

  const AddCreateManager = (e) => {
    e.preventDefault();

    if (AddFleetManager?.userMobile.length === 0) {
      setErrMsg({
        ...errMsg,
        userMobile: "Please Enter Mobile Number",
      });
      return;
    }
    if (AddFleetManager.userPassword !== AddFleetManager?.confirmPassword) {
      setErrMsg({
        ...errMsg,
        confirmPassword: "Password Does Not Match.",
      });
      return;
    }
    if (AddFleetManager.confirmPassword.length < 8) {
      setErrMsg({
        ...errMsg,
        confirmPassword: "Password must be at least 8 characters ",
      });
      return;
    }
    if (typeof AddFleetManager.userDob != "object") {
      setErrMsg({
        ...errMsg,
        userDob: "please Select DOB",
      });
      return;
    }
    if (typeof AddFleetManager.userJoiningDate != "object") {
      setErrMsg({
        ...errMsg,
        userJoiningDate: "please Select Joining Date",
      });
      return;
    }
    setBtnDesable(true);
    let formData = new FormData();
    formData.append("userName", AddFleetManager.userName);
    formData.append("userPassword", AddFleetManager.userPassword);
    formData.append("userLastName", AddFleetManager.userLastName);
    formData.append("confirmPassword", AddFleetManager.confirmPassword);
    formData.append("userEmail", AddFleetManager.userEmail);
    formData.append("userCity", AddFleetManager.userCity);
    formData.append("userMobile", AddFleetManager.userMobile);
    formData.append("userNationality", AddFleetManager.userNationality);
    formData.append("userAddress", AddFleetManager.userAddress);
    formData.append(
      "userDob",
      moment(AddFleetManager.userDob).utc().format("YYYY-MM-DD")
    );
    formData.append(
      "userJoiningDate",
      moment(AddFleetManager.userJoiningDate).utc().format("YYYY-MM-DD")
    );
    formData.append("userGender", AddFleetManager.userGender);
    formData.append("userInternalNo", AddFleetManager.userInternalNo);
    formData.append("userProfilePic", AddFleetManager.userProfilePic);
    formData.append("user_country_code", AddFleetManager?.user_country_code);
    multipartPostCall(ApiConfig.FLEET_ADD, formData)
      .then((res) => {
        setBtnDesable(false);
        if (res.success) {
          notifySuccess(res.message);
          navigate("/FleetManager");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target.name === "userProfilePic") {
      setAddFleetManager({
        ...AddFleetManager,
        [e.target.name]: e.target.files[0],
        isImageChange: true,
      });
    } else
      setAddFleetManager({
        ...AddFleetManager,
        [e.target.name]: e.target.value,
      });
  };
  var date = new Date();
  const mobileOnChangeHandler = (phone, country) => {
    setAddFleetManager({
      ...AddFleetManager,
      userMobile: phone?.replace(country.dialCode, ""),
      user_country_code: country?.dialCode,
      userNationality:
        countriesWithShortCode[country.countryCode?.toUpperCase()],
    });
  };
  const countrySelectOnSelect = (code) => {
    setAddFleetManager({
      ...AddFleetManager,
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
                    ? `${t("Update Fleet Manager Details")}`
                    : `${t("Add Fleet Manager Details")}`}
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
                      Please Choose Picture.
                    </Form.Control.Feedback>

                    <div className="main-img-wrapper">
                      <div className="profile-img-wrapper">
                        <img
                          src={
                            !AddFleetManager.userProfilePic
                              ? profile
                              : AddFleetManager.userProfilePic.length
                              ? 
                                AddFleetManager.userProfilePic
                              : 
                                  AddFleetManager.userProfilePic &&
                                URL.createObjectURL(
                                  AddFleetManager.userProfilePic
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
                      value={AddFleetManager.userName}
                      onChange={(e) => {
                        setAddFleetManager({
                          ...AddFleetManager,
                          userName: e.target.value,
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
                      required
                      type="text"
                      placeholder={t("Enter Your Last Name")}
                      value={AddFleetManager.userLastName}
                      onChange={(e) => {
                        setAddFleetManager({
                          ...AddFleetManager,
                          userLastName: e.target.value,
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
                      value={AddFleetManager.userEmail}
                      onChange={(e) => {
                        setAddFleetManager({
                          ...AddFleetManager,
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

                    <MobilePhoneInput
                      CommanCountry={AddFleetManager?.userNationality}
                      commanNumber={AddFleetManager?.userMobile}
                      commanContryCode={AddFleetManager?.user_country_code}
                      state={AddFleetManager}
                      onChangeHandler={mobileOnChangeHandler}
                    />
                    {errMsg.userMobile?.length > 0 && (
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
                          value={AddFleetManager.userPassword}
                          onChange={(e) => {
                            setAddFleetManager({
                              ...AddFleetManager,
                              userPassword: e.target.value,
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
                          value={AddFleetManager.confirmPassword}
                          onChange={(e) => {
                            setAddFleetManager({
                              ...AddFleetManager,
                              confirmPassword: e.target.value,
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
                      value={AddFleetManager.userAddress}
                      onChange={(e) => {
                        setAddFleetManager({
                          ...AddFleetManager,
                          userAddress: e.target.value,
                        });
                      }}
                    />

                    <Form.Control.Feedback type="invalid">
                     {t("Please Enter Your Address")} 
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
                        placeholder={t("Enter Your City")}
                        value={AddFleetManager.userCity}
                        onChange={(e) => {
                          setAddFleetManager({
                            ...AddFleetManager,
                            userCity: e.target.value,
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
                      <div className="innerSelectBox weekCounter datepicker-main">
                        {/* <Form.Control
                        required
                        type="text"
                        placeholder="Enter Your Country"
                        value={AddFleetManager.userNationality}
                        onChange={(e) => {
                          setAddFleetManager({
                            ...AddFleetManager,
                            userNationality: e.target.value,
                          });
                        }}
                      /> */}
                        <CountrySelect
                          countryName={AddFleetManager.userNationality}
                          state={AddFleetManager}
                          placeholder={t("Please Select Country")}
                          onChangeHandler={countrySelectOnSelect}
                        />
                        <Form.Control.Feedback type="invalid">
                        {t("Please Enter Your Nationality")}  
                        </Form.Control.Feedback>
                        {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                      </div>
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
                        value={AddFleetManager.userGender}
                        onChange={(value) => {
                          setAddFleetManager({
                            ...AddFleetManager,
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
                        <Option value="o" style={{ color: "rgba(156, 73, 0)" }}>
                        {t("other")}  
                        </Option>
                      </Select>
                    </div>
                    <Form.Control.Feedback type="invalid">
                     {t("Please Enter Your Gender")} 
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Date Of Birth")}
                    </Form.Label>
                    <div className="innerSelectBox weekCounter datepicker-main mb-4">
                      <CommonDatePicker
                        setDate={setAddFleetManager}
                        data={AddFleetManager}
                        dateKey="userDob"
                      />
                      {errMsg?.userDob?.length > 0 && (
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
                        setDate={setAddFleetManager}
                        data={AddFleetManager}
                        dateKey="userJoiningDate"
                      />
                      {errMsg?.userJoiningDate?.length > 0 && (
                        <span className="text-danger">
                          {errMsg?.userJoiningDate}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Employee Code")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("Employee Code")}
                      value={AddFleetManager.userInternalNo}
                      onChange={(e) => {
                        setAddFleetManager({
                          ...AddFleetManager,
                          userInternalNo: e.target.value,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                    {t("Please Enter Employee Code")}  
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

export default AddFleetManager;

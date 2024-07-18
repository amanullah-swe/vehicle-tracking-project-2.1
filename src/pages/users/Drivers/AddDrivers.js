import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import profile from "../../../assets/images/Update-profile.svg";
import camera from "../../../assets/images/prof_cam.svg";
import { Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Calendar from "../../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import ApiConfig from "../../../api/ApiConfig";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import { useTranslation } from "react-i18next";
import ImportUser from "../../../assets/images/imagesuser.png";
import {
  multipartPostCall,
  putMultipartWithAuthCall,
  putWithAuthCall,
  simpleGetCallWithErrorResponse,
  simplePostCall,
} from "../../../api/ApiServices";
import moment from "moment";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import Loader from "../../../sharedComponent/Loader";
import MobilePhoneInput from "../../../sharedComponent/MobilePhoneInput";
import { countriesWithShortCode, latestDate, } from "../../../sharedComponent/common";
import CountrySelect from "../../../sharedComponent/CountrySelect";
import range from "lodash/range";
import { Select } from "antd";
const { Option } = Select;
const AddDrivers = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      HandalPerson(event);
    }

    setValidated(true);
  };
  const [loading, setLoading] = useState(false);

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const handleCancle = () => {
    setAddDrivers({
      userName: "",
      userLastName: "",
      userEmail: "",
      userMobile: "",
      userNationality: "",
      userAddress: "",
      userDob: "",
      userJoiningDate: "",
      userGender: "",
      userRole: "driver",
      userInternalNo: "",
      profilePic: "",
      driverLicenceNumber: "",
      driverLicenceIssueDt: "",
      driverLicenceExpiryDt: "",
      driverLicenceType: "",
      driverExperience: "",
      driverLicenceArea: "",
      driverMiFareCardNo: "",
      userPassword: "",
      confirmPassword: "",
    });
    navigate("/Drivers");
  };
  const [AddDrivers, setAddDrivers] = useState({
    userName: "",
    userLastName: "",
    userEmail: "",
    userMobile: "",
    userNationality: "",
    userAddress: "",
    userDob: "",
    userJoiningDate: "",
    userGender: "",
    userRole: "driver",
    userInternalNo: "",
    profilePic: "",
    driverLicenceNumber: "",
    driverLicenceIssueDt: "",
    driverLicenceExpiryDt: "",
    driverLicenceType: "",
    driverExperience: "",
    driverLicenceArea: "",
    driverMiFareCardNo: "",
    user_country_code: "91",
    userPassword: "",
    confirmPassword: "",
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
    userRole: "driver",
    userInternalNo: "",
    profilePic: "",
    driverLicenceNumber: "",
    driverLicenceIssueDt: "",
    driverLicenceExpiryDt: "",
    driverLicenceType: "",
    driverExperience: "",
    driverLicenceArea: "",
    driverMiFareCardNo: "",
    user_country_code: "",
    userPassword: "",
    confirmPassword: "",
  });
  const [btnDesable, setBtnDesable] = useState(false);
  const ExperienceRange = range(1, 61, 1);
  const params = useParams();
  let UserId = params.id;
  useEffect(() => {
    // setLoading(true)
    gepersonDetails();
  }, []);

  const gepersonDetails = () => {
    simpleGetCallWithErrorResponse(
      ApiConfig.DRIVER_PROFLE + "?user_id=" + UserId
    )
      .then((res) => {
        let user_profile = res.json.data.userDetails[0];
        setAddDrivers({
          userName: user_profile?.user_name ? user_profile?.user_name : "",
          userLastName: user_profile?.user_last_name
            ? user_profile?.user_last_name
            : "",
          userRole: user_profile?.userRole ? user_profile?.userRole : "",
          userEmail: user_profile?.user_email ? user_profile?.user_email : "",
          userMobile: user_profile?.user_mobile
            ? user_profile?.user_mobile
            : "",
          user_country_code: user_profile?.user_country_code
            ? user_profile?.user_country_code
            : "",
          userNationality: user_profile?.user_nationality
            ? user_profile?.user_nationality
            : "",
          userAddress: user_profile?.user_address
            ? user_profile?.user_address
            : "",
          City: user_profile?.user_city ? user_profile?.user_city : "",
          userDob: user_profile?.user_dob
            ? moment(user_profile?.user_dob).utc().format("YYYY-MM-DD")
            : "",
          userJoiningDate: user_profile?.user_joining_date
            ? moment(user_profile?.user_joining_date).utc().format("YYYY-MM-DD")
            : "",
          userGender: user_profile?.user_gender
            ? user_profile?.user_gender
            : "",
          userInternalNo: user_profile?.user_internal_no
            ? user_profile?.user_internal_no
            : "",
          profilePic: user_profile?.user_profile_pic,

          driverLicenceNumber: user_profile?.driver_licence_number,
          driverLicenceIssueDt: user_profile?.driver_licence_issue_date
            ? moment(user_profile?.driver_licence_issue_date)
                .utc()
                .format("YYYY-MM-DD")
            : "",
          driverLicenceExpiryDt: user_profile?.driver_licence_expire_date
            ? moment(user_profile?.driver_licence_expire_date)
                .utc()
                .format("YYYY-MM-DD")
            : "",
          driverLicenceType: user_profile?.driver_licence_type,
          driverExperience: user_profile?.driver_experience,
          driverLicenceArea: user_profile?.driver_licence_area,
          driverMiFareCardNo: user_profile?.driver_mifare_card_no,
        });
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const HandalPerson = (e) => {
    if (UserId) {
      UpdatePerson(e);
    } else {
      AddCreateDriver(e);
    }
  };

  const UpdatePerson = (e) => {
    e.preventDefault();
    setBtnDesable(true);
    let formData = new FormData();
    formData.append("user_id", UserId);
    formData.append("userName", AddDrivers.userName);
    formData.append("userLastName", AddDrivers.userLastName);
    formData.append("userEmail", AddDrivers.userEmail);
    formData.append("userMobile", AddDrivers.userMobile);
    formData.append("userNationality", AddDrivers.userNationality);
    formData.append("userAddress", AddDrivers.userAddress);
    formData.append(
      "userDob",
      moment(AddDrivers.userDob).utc().format("YYYY-MM-DD")
    );
    formData.append(
      "userJoiningDate",
      moment(AddDrivers.userJoiningDate).utc().format("YYYY-MM-DD")
    );
    formData.append("userGender", AddDrivers.userGender);
    formData.append("userRole", "driver");
    formData.append("userInternalNo", AddDrivers.userInternalNo);
    formData.append("profilePic", AddDrivers.profilePic);
    formData.append("driverLicenceNumber", AddDrivers.driverLicenceNumber);
    formData.append(
      "driverLicenceIssueDt",
      moment(AddDrivers.driverLicenceIssueDt).utc().format("YYYY-MM-DD")
    );
    formData.append(
      "driverLicenceExpiryDt",
      moment(AddDrivers.driverLicenceExpiryDt).utc().format("YYYY-MM-DD")
    );
    formData.append("user_country_code", AddDrivers?.user_country_code);
    formData.append("driverLicenceType", AddDrivers.driverLicenceType);
    formData.append("driverExperience", AddDrivers.driverExperience);
    formData.append("driverLicenceArea", AddDrivers.driverLicenceArea);
    formData.append("driverMiFareCardNo", AddDrivers.driverMiFareCardNo);
    formData.append("user_city", AddDrivers.City);
    putWithAuthCall(ApiConfig.DRIVERS_UPDATE, formData)
      .then((res) => {
        setBtnDesable(false);
        if (res.success) {
          notifySuccess(res.message);
          navigate("/Drivers");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (AddDrivers?.userMobile?.length > 0) {
      setErrMsg({
        ...errMsg,
        userMobile: "",
      });
    }

    if (typeof AddDrivers?.userDob == "object") {
      setErrMsg({
        ...errMsg,
        userDob: "",
      });
    }
    if (typeof AddDrivers?.userJoiningDate == "object") {
      setErrMsg({
        ...errMsg,
        userJoiningDate: "",
      });
    }
    if (typeof AddDrivers?.driverLicenceIssueDt == "object") {
      setErrMsg({
        ...errMsg,
        driverLicenceIssueDt: "",
      });
    }
    if (typeof AddDrivers?.driverLicenceExpiryDt == "object") {
      setErrMsg({
        ...errMsg,
        driverLicenceExpiryDt: "",
      });
    }
  }, [AddDrivers]);
  const AddCreateDriver = (e) => {
    e.preventDefault();
    if (AddDrivers.userMobile.length === 0) {
      setErrMsg({
        ...errMsg,
        userMobile: t("Please Enter Mobile Number"),
      });
      return;
    }
    if (AddDrivers.userPassword !== AddDrivers?.confirmPassword) {
      setErrMsg({
        ...errMsg,
        confirmPassword: t("Password Does Not Match"),
      });
      return;
    }
    if (AddDrivers?.confirmPassword.length < 8) {
      setErrMsg({ ...errMsg, confirmPassword: t("Password must be at least 8 characters") });
      return;
    }
    if (typeof AddDrivers.userDob != "object") {
      setErrMsg({
        ...errMsg,
        userDob: t("Please Select DOB"),
      });
      return;
    }
    if (typeof AddDrivers.userJoiningDate != "object") {
      setErrMsg({
        ...errMsg,
        userJoiningDate: t("Please Select Joining Date"),
      });
      return;
    }
    if (typeof AddDrivers.driverLicenceIssueDt != "object") {
      setErrMsg({
        ...errMsg,
        driverLicenceIssueDt: t("Please Select License Issue Date"),
      });
      return;
    }
    if (typeof AddDrivers.driverLicenceExpiryDt != "object") {
      setErrMsg({
        ...errMsg,
        driverLicenceExpiryDt: t("Please Select License Expiry Date"),
      });
      return;
    }
    setBtnDesable(true);
    let formData = new FormData();
    formData.append("userName", AddDrivers.userName);
    formData.append("userLastName", AddDrivers.userLastName);
    formData.append("userEmail", AddDrivers.userEmail);
    formData.append("userMobile", AddDrivers.userMobile);
    formData.append("userNationality", AddDrivers.userNationality);
    formData.append("userAddress", AddDrivers.userAddress);
    formData.append(
      "userDob",
      AddDrivers.userDob
        ? //  latestDate(AddDrivers.userDob,"YYYY-MM-DD") : ""
          moment(AddDrivers.userDob).utc().format("YYYY-MM-DD")
        : null
    );
    formData.append(
      "userJoiningDate",
      AddDrivers.userJoiningDate
        ? // ? latestDate(AddDrivers.userJoiningDate,"YYYY-MM-DD")
          // : ""
          moment(AddDrivers.userJoiningDate).utc().format("YYYY-MM-DD")
        : null
    );
    formData.append("userGender", AddDrivers.userGender);
    formData.append("userRole", AddDrivers.userRole);
    formData.append("userInternalNo", AddDrivers.userInternalNo);
    formData.append("profilePic", AddDrivers.profilePic);

    formData.append("driverLicenceNumber", AddDrivers.driverLicenceNumber);
    formData.append(
      "driverLicenceIssueDt",
      AddDrivers?.userJoiningDate
        ? // ? latestDate(AddDrivers.userJoiningDate,"YYYY-MM-DD")
          // : ""
          moment(AddDrivers.driverLicenceIssueDt).utc().format("YYYY-MM-DD")
        : null
    );
    formData.append(
      "driverLicenceExpiryDt",
      AddDrivers.driverLicenceExpiryDt
        ? // ? latestDate(AddDrivers.driverLicenceExpiryDt,"YYYY-MM-DD")
          // : ""
          moment(AddDrivers.driverLicenceExpiryDt).utc().format("YYYY-MM-DD")
        : null
    );

    formData.append("driverLicenceType", AddDrivers.driverLicenceType);
    formData.append("driverExperience", AddDrivers.driverExperience);
    formData.append("driverLicenceArea", AddDrivers.driverLicenceArea);
    formData.append("driverMiFareCardNo", AddDrivers.driverMiFareCardNo);
    formData.append("user_country_code", AddDrivers?.user_country_code);
    formData.append("user_password", AddDrivers.userPassword);
    formData.append("confirm_Password", AddDrivers.confirmPassword);
    formData.append("user_city", AddDrivers.City);
    multipartPostCall(ApiConfig.DRIVERS_ADD, formData)
      .then((res) => {
        setBtnDesable(false);
        if (res.success) {
          notifySuccess(res.message);
          navigate("/Drivers");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      setAddDrivers({
        ...AddDrivers,
        [e.target.name]: e.target.files[0],
      });
    } else setAddDrivers({ ...AddDrivers, [e.target.name]: e.target.value });
  };
  var date = new Date();
  const mobileOnChangeHandler = (phone, country) => {
    setAddDrivers({
      ...AddDrivers,
      userMobile: phone?.replace(country.dialCode, ""),
      user_country_code: country?.dialCode,
      userNationality:
        countriesWithShortCode[country.countryCode?.toUpperCase()],
    });
  };
  const countrySelectOnSelect = (code) => {
    setAddDrivers({
      ...AddDrivers,
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
                <p>{UserId ? t("Update Driver Details") : t("New Driver Details")}</p>
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
                      accept=".png, .jpg, .jpeg"
                      name="profilePic"
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
                            !AddDrivers.profilePic
                              ? profile
                              : AddDrivers.profilePic.length
                              ? 
                                AddDrivers.profilePic
                              : 
                                  AddDrivers.profilePic &&
                                URL.createObjectURL(AddDrivers.profilePic)
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
                      value={AddDrivers.userName}
                      onChange={(e) => {
                        let value = e.target.value;
                        let valueInput = value.replace(/[^A-Za-z ]/gi, "");
                        setAddDrivers({
                          ...AddDrivers,
                          userName: valueInput,
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
                      placeholder= {t("Enter Your Last Name")}
                      value={AddDrivers.userLastName}
                      onChange={(e) => {
                        let value = e.target.value;
                        let valueInput = value.replace(/[^A-Za-z ]/gi, "");
                        setAddDrivers({
                          ...AddDrivers,
                          userLastName: valueInput,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                     {t("Please Enter Your Last Name.")} 
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
                      value={AddDrivers.userEmail}
                      onChange={(e) => {
                        setAddDrivers({
                          ...AddDrivers,
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
                  placeholder="Enter Your Contact Number"
                  value={AddDrivers.userMobile}
                  onChange={(e) => {
                    let value = e.target.value
                    let valueInput = value.replace(
                      /[^0-9]/gi,
                      ""
                    );
                    setAddDrivers({
                      ...AddDrivers,
                      userMobile:valueInput,
                    });
                  }}
                /> */}

                    <MobilePhoneInput
                      CommanCountry={AddDrivers?.userNationality}
                      commanNumber={AddDrivers?.userMobile}
                      commanContryCode={AddDrivers?.user_country_code}
                      state={AddDrivers}
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
                          {t("Password")} <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          // autocomplete="off"
                          required
                          type="password"
                          value={AddDrivers.userPassword}
                          placeholder={t("Enter Your Password")}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(
                              /[^0-9 A-Za-z @]/gi,
                              ""
                            );
                            setAddDrivers({
                              ...AddDrivers,
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
                          // autocomplete="off"
                          required
                          type="password"
                          value={AddDrivers.confirmPassword}
                          placeholder= {t("Enter Your Password")}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(
                              /[^0-9 A-Za-z @]/gi,
                              ""
                            );
                            setAddDrivers({
                              ...AddDrivers,
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
                      required
                      rows={6}
                      placeholder={t("Address")}
                      value={AddDrivers.userAddress}
                      onChange={(e) => {
                        setAddDrivers({
                          ...AddDrivers,
                          userAddress: e.target.value,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                   {t("Please Enter Your Address")}   
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="col-lg-12 mb-4">
                      <Form.Label className="common-labels">
                        {t("City")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("City")}
                        value={AddDrivers.City}
                        onChange={(e) => {
                          setAddDrivers({
                            ...AddDrivers,
                            City: e.target.value,
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
                        countryName={AddDrivers.userNationality}
                        state={AddDrivers}
                        placeholder={t("Please Select Country")}
                        onChangeHandler={countrySelectOnSelect}
                      />
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
                        onChange={(value) => {
                          setAddDrivers({
                            ...AddDrivers,
                            userGender: value,
                          });
                        }}
                        value={AddDrivers.userGender}
                        className="custom-select"
                      >
                        <Option
                          selected
                          value=""
                          style={{ color: "rgba(156, 73, 0)" }}
                        >
                        {t("Select Gender")}  
                        </Option>
                        <Option value="M" style={{ color: "rgba(156, 73, 0)" }}>
                        {t("Male")}  
                        </Option>
                        <Option value="F" style={{ color: "rgba(156, 73, 0)" }}>
                         {t("Female")} 
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
                        setDate={setAddDrivers}
                        data={AddDrivers}
                        dateKey="userDob"
                      />
                      {errMsg?.userDob.length > 0 && (
                        <span className="text-danger">{errMsg?.userDob}</span>
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
                      placeholder={t("Enter Your Employee Code")}
                      value={AddDrivers?.userInternalNo}
                      onChange={(e) => {
                        let value = e.target.value;
                        let valueInput = value.replace(/[^0-9]/gi, "");
                        setAddDrivers({
                          ...AddDrivers,
                          userInternalNo: valueInput,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                    {t("Please Enter Your Employee code")}  
                    </Form.Control.Feedback>
                  </div>

                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Joining Date")}
                    </Form.Label>
                    <div className="innerSelectBox weekCounter datepicker-main">
                      <CommonDatePicker
                        setDate={setAddDrivers}
                        data={AddDrivers}
                        dateKey="userJoiningDate"
                      />
                      {errMsg?.userJoiningDate.length > 0 && (
                        <span className="text-danger">
                          {errMsg?.userJoiningDate}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("License Number")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("Enter Your Licence Number")}
                      value={AddDrivers.driverLicenceNumber}
                      onChange={(e) => {
                        let value = e.target.value;
                        let valueInput = value.replace(/[^0-9]/gi, "");
                        setAddDrivers({
                          ...AddDrivers,
                          driverLicenceNumber: valueInput,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                     {t("Please Enter Your Licence Number")} 
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("License Type")}{" "}
                    </Form.Label>
                    <div className="multi-select-1">
                      <Select
                        style={{ width: "100%", height: "40px" }}
                        required
                        value={AddDrivers.driverLicenceType}
                        onChange={(value) => {
                          setAddDrivers({
                            ...AddDrivers,
                            driverLicenceType: value,
                          });
                        }}
                        className="custom-select"
                      >
                        <Option
                          selected
                          disabled
                          value=""
                          style={{ color: "rgba(156, 73, 0)" }}
                        >
                         {t("Licence Type")} 
                        </Option>
                        <Option
                          value="Heavy Rigid"
                          style={{ color: "rgba(156, 73, 0)" }}
                        >
                        {t("Heavy Rigid")}  
                        </Option>
                        <Option
                          value="Light Rigid"
                          style={{ color: "rgba(156, 73, 0)" }}
                        >
                        {t("Light Rigid")}  
                        </Option>
                        <Option
                          value="Heavy Combination"
                          style={{ color: "rgba(156, 73, 0)" }}
                        >
                        {t("Heavy Combination")}  
                        </Option>
                        <Option
                          value="rigid"
                          style={{ color: "rgba(156, 73, 0)" }}
                        >
                        {t("rigid")}  
                        </Option>
                        <Option
                          value="Medium Rigid"
                          style={{ color: "rgba(156, 73, 0)" }}
                        >
                         {t("Medium Rigid")} 
                        </Option>
                        <Option
                          value="other"
                          style={{ color: "rgba(156, 73, 0)" }}
                        >
                        {t("other")}  
                        </Option>
                      </Select>
                    </div>
                    <Form.Control.Feedback type="invalid">
                    {t("Please Enter Your Licence Type")}  
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("License Issue Date")}
                    </Form.Label>

                    <div className="innerSelectBox weekCounter datepicker-main">
                      <CommonDatePicker
                        setDate={setAddDrivers}
                        data={AddDrivers}
                        dateKey="driverLicenceIssueDt"
                      />
                    </div>
                    {errMsg?.driverLicenceIssueDt.length > 0 && (
                      <span className="text-danger">
                        {errMsg?.driverLicenceIssueDt}
                      </span>
                    )}
                    {/* <div  className="col-md-6 mb-4">
                <Form.Label className="common-labels mt-3">
                  {t(" License Expiry Date")}
                </Form.Label>
                <div className="innerSelectBox weekCounter datepicker-main">
                <CommonDatePicker setDate={setAddDrivers} data={AddDrivers} dateKey="driverLicenceExpiryDt"
                      minDate={AddDrivers?.driverLicenceIssueDt}
                
                />
                </div>
                </div> */}
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("License Expiry Date")}
                    </Form.Label>

                    <div className="innerSelectBox weekCounter datepicker-main">
                      <CommonDatePicker
                        setDate={setAddDrivers}
                        data={AddDrivers}
                        dateKey="driverLicenceExpiryDt"
                        minDate={AddDrivers?.driverLicenceIssueDt}
                      />
                      {errMsg?.driverLicenceExpiryDt.length > 0 && (
                        <span className="text-danger">
                          {errMsg?.driverLicenceExpiryDt}
                        </span>
                      )}
                    </div>
                    {/* <div  className="col-md-6 mb-4">
                <Form.Label className="common-labels mt-3">
                  {t(" License Expiry Date")}
                </Form.Label>
                <div className="innerSelectBox weekCounter datepicker-main">
                <CommonDatePicker setDate={setAddDrivers} data={AddDrivers} dateKey="driverLicenceExpiryDt"
                      minDate={AddDrivers?.driverLicenceIssueDt}
                
                />
                </div>
                </div> */}
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("License Area")}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder={t("Enter Your Licence Area")}
                      value={AddDrivers.driverLicenceArea}
                      onChange={(e) => {
                        setAddDrivers({
                          ...AddDrivers,
                          driverLicenceArea: e.target.value,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                    {t("Please Enter Your Licence Area")}  
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Experience")} ({t("Years")})
                    </Form.Label>
                    <div className="multi-select-1">
                      <Select
                        style={{ width: "100%", height: "40px" }}
                        required
                        onChange={(value) => {
                          setAddDrivers({
                            ...AddDrivers,
                            driverExperience: value,
                          });
                        }}
                        className="custom-select"
                        value={AddDrivers.driverExperience}
                      >
                        <Option
                          selected
                          value=""
                          style={{ color: "rgba(156, 73, 0)" }}
                        >
                        {t("Experience (Years)")}  
                        </Option>
                        {ExperienceRange &&
                          ExperienceRange?.map((ele, index) => {
                            return (
                              <Option
                                value={ele}
                                key={"ex" + index}
                                style={{ color: "rgba(156, 73, 0)" }}
                              >
                                {ele}
                              </Option>
                            );
                          })}
                      </Select>
                    </div>
                    <Form.Control.Feedback type="invalid">
                    {t("Please Enter Your Experience")}  
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Mifare Card ID")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("Enter Your Mifarecard ID")}
                      value={AddDrivers.driverMiFareCardNo}
                      onChange={(e) => {
                        setAddDrivers({
                          ...AddDrivers,
                          driverMiFareCardNo: e.target.value,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                    {t("Please Enter Your Mifarecard ID")}  
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
                  <button
                    type={UserId ? t("Submit") : t("Submit")}
                    class="cx-btn-2"
                    // onClick={(e)=>{
                    //   newValidation(e)
                    // }}
                  >
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

export default AddDrivers;

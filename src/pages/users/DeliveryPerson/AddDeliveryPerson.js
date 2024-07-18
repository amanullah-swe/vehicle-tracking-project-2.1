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
import {
  multipartPostCall,
  simpleGetCallWithErrorResponse,
  simplePostCall,
} from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import moment from "moment";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import Loader from "../../../sharedComponent/Loader";
import { useTranslation } from "react-i18next";
import { countriesWithShortCode } from "../../../sharedComponent/common";
import MobilePhoneInput from "../../../sharedComponent/MobilePhoneInput";
import CountrySelect from "../../../sharedComponent/CountrySelect";
import ImportUser from "../../../assets/images/imagesuser.png";
import range from "lodash/range";
import { Select } from "antd";
const { Option } = Select;
const AddDeliveryPerson = () => {
  // const [startDate, setStartDate] = useState(new Date());

  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const { t, i18n } = useTranslation();
  const capacityData = range(1, 60, 1);
  const handleCancle = () => {
    setAddDelivery({
      firstName: "",
      userPassword: "",
      lastName: "",
      confirmPassword: "",
      email: "",
      city: "",
      contactNumber: "",
      nationality: "",
      address: "",
      joiningDate: "",
      gender: "",
      internalNumber: "",
      profilePic: "",
      vehicleNumberOrName: "",
      registrationNumber: "",
      vehicleCategory: "",
      vehicleCapacity: "",
    });
  };
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
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const [CategeryType, setCategeryType] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(false);
  const [CategeryStatus, setCategeryStatus] = useState("Exisiting");
  const [AddDelivery, setAddDelivery] = useState({
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
    vehicleNumberOrName: "",
    registrationNumber: "",
    vehicleCategory: "",
    vehicleCapacity: "",
    user_country_code: "91",
    driverLicenceNumber: "",
    driverLicenceIssueDt: "",
    driverLicenceExpiryDt: "",
    driverLicenceType: "",
    driverExperience: "",
    driverLicenceArea: "",
    driverMiFareCardNo: "",
  });
  const [btnDesable, setBtnDesable] = useState(false);
  const ExperienceRange = range(1, 61, 1);
  const params = useParams();
  let UserId = params.id;

  useEffect(() => {
    geDeliverAllList();
    if (UserId) {
      gepersonDetails();
    }
  }, []);
  function geDeliverAllList() {
    simpleGetCallWithErrorResponse(ApiConfig.DELIVERY_PERSON_DRUPDOWN)
      .then((data) => {
        setCategeryType(data?.json.data ? data?.json.data : []);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {});
  }
  const gepersonDetails = () => {
    setLoading(true);

    let newRequestBody = JSON.stringify({
      user_id: UserId,
    });
    simplePostCall(ApiConfig.DELIVERY_PERSON_VIEW, newRequestBody)
      .then((res) => {
        let user_profile = res.data[0];
        setEditData(true);

        setAddDelivery({
          firstName: user_profile.user_name,
          userPassword: user_profile.user_password,
          lastName: user_profile.user_last_name,
          confirmPassword: user_profile.user_password,
          email: user_profile.user_email,
          city: user_profile.user_city,
          contactNumber: user_profile.user_mobile,
          nationality: user_profile.user_nationality,
          address: user_profile.user_address,
          dateOfBirth: user_profile.user_dob
            ? moment(user_profile?.user_dob).utc().format("YYYY-MM-DD")
            : "",
          joiningDate: user_profile.user_joining_date
            ? moment(user_profile.user_joining_date).utc().format("YYYY-MM-DD")
            : "",
          gender: user_profile.user_gender,
          internalNumber: user_profile.user_internal_no,
          profilePic: user_profile.user_profile_pic,
          vehicleNumberOrName: user_profile.vehicle_number,
          registrationNumber: user_profile.vehicle_reg_no,
          vehicleCategory: user_profile.vehicle_type,
          vehicleCapacity: user_profile.vehicle_seat_capacity,
          user_country_code: user_profile.user_country_code,
          driverLicenceNumber: user_profile.driver_licence_number,
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
      AddCreatePerson(e);
    }
  };

  const [errMsg, setErrMsg] = useState({
    contactNumber: "",
    dateOfBirth: "",
    joiningDate: "",
    confirmPassword: "",
    driverLicenceIssueDt: "",
    driverLicenceExpiryDt: "",
  });

  useEffect(() => {
    if (AddDelivery.contactNumber.length > 0) {
      setErrMsg({
        ...errMsg,
        contactNumber: "",
      });
    }
    if (typeof AddDelivery.dateOfBirth == "object") {
      setErrMsg({
        ...errMsg,
        dateOfBirth: "",
      });
    }
    if (typeof AddDelivery.joiningDate == "object") {
      setErrMsg({
        ...errMsg,
        joiningDate: "",
      });
    }
    if (typeof AddDelivery.driverLicenceIssueDt == "object") {
      setErrMsg({
        ...errMsg,
        driverLicenceIssueDt: "",
      });
    }
    if (typeof AddDelivery.driverLicenceExpiryDt == "object") {
      setErrMsg({
        ...errMsg,
        driverLicenceExpiryDt: "",
      });
    }
  }, [AddDelivery]);
  const UpdatePerson = (e) => {
    e.preventDefault();
    setBtnDesable(true);
    let formData = new FormData();
    formData.append("user_id", UserId);
    formData.append("firstName", AddDelivery.firstName);
    formData.append("lastName", AddDelivery.lastName);
    formData.append("email", AddDelivery.email);
    formData.append("city", AddDelivery.city);
    formData.append("contactNumber", AddDelivery.contactNumber);
    formData.append("nationality", AddDelivery.nationality);
    formData.append("address", AddDelivery.address);
    formData.append(
      "dateOfBirth",
      moment(AddDelivery?.dateOfBirth).utc().format("YYYY-MM-DD")
    );
    formData.append(
      "joiningDate",
      moment(AddDelivery?.joiningDate).utc().format("YYYY-MM-DD")
    );

    formData.append("driverLicenceNumber", AddDelivery?.driverLicenceNumber);
    formData.append(
      "driverLicenceIssueDt",
      AddDelivery?.driverLicenceIssueDt
        ? moment(AddDelivery?.driverLicenceIssueDt).utc().format("YYYY-MM-DD")
        : null
    );
    formData.append(
      "driverLicenceExpiryDt",
      AddDelivery?.driverLicenceExpiryDt
        ? // ? latestDate(AddDelivery.driverLicenceExpiryDt,"YYYY-MM-DD")
          // : ""
          moment(AddDelivery?.driverLicenceExpiryDt).utc().format("YYYY-MM-DD")
        : null
    );

    formData.append("driverLicenceType", AddDelivery.driverLicenceType);
    formData.append("driverExperience", AddDelivery.driverExperience);
    formData.append("driverLicenceArea", AddDelivery.driverLicenceArea);
    formData.append("driverMiFareCardNo", AddDelivery.driverMiFareCardNo);
    formData.append("gender", AddDelivery.gender);
    formData.append("internalNumber", AddDelivery.internalNumber);
    formData.append("profilePic", AddDelivery.profilePic);
    formData.append("vehicleNumberOrName", AddDelivery.vehicleNumberOrName);
    formData.append("registrationNumber", AddDelivery.registrationNumber);
    formData.append("vehicleCategory", AddDelivery.vehicleCategory);
    formData.append("vehicleCapacity", AddDelivery.vehicleCapacity);
    formData.append("user_country_code", AddDelivery?.user_country_code);
    multipartPostCall(ApiConfig.DELIVERY_PERSON_UPDATE, formData)
      .then((res) => {
        setBtnDesable(false);
        if (res.result) {
          notifySuccess(res.message);
          navigate("/DeliveryPerson");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const AddCreatePerson = (e) => {
    e.preventDefault();
    if (AddDelivery.contactNumber.length === 0) {
      setErrMsg({
        ...errMsg,
        contactNumber: "Please Enter Mobile Number",
      });
      return;
    }
    if (AddDelivery.userPassword !== AddDelivery?.confirmPassword) {
      setErrMsg({
        ...errMsg,
        confirmPassword: "Password Does Not Match.",
      });
      return;
    }
    if (AddDelivery.confirmPassword.length < 8) {
      setErrMsg({
        ...errMsg,
        confirmPassword: "Password must be at least 8 characters ",
      });
      return;
    }
    if (typeof AddDelivery.dateOfBirth != "object") {
      setErrMsg({
        ...errMsg,
        dateOfBirth: "please Select DOB",
      });
      return;
    }
    if (typeof AddDelivery.joiningDate != "object") {
      setErrMsg({
        ...errMsg,
        joiningDate: "please Select Joining Date",
      });
      return;
    }
    if (typeof AddDelivery.driverLicenceIssueDt != "object") {
      setErrMsg({
        ...errMsg,
        driverLicenceIssueDt: "please Select License Issue Date",
      });
      return;
    }
    if (typeof AddDelivery.driverLicenceExpiryDt != "object") {
      setErrMsg({
        ...errMsg,
        driverLicenceExpiryDt: "please Select License Expiry Date",
      });
      return;
    }
    setBtnDesable(true);
    let formData = new FormData();
    formData.append("firstName", AddDelivery.firstName);
    formData.append("userPassword", AddDelivery.userPassword);
    formData.append("lastName", AddDelivery.lastName);
    formData.append("confirmPassword", AddDelivery.confirmPassword);
    formData.append("email", AddDelivery.email);
    formData.append("city", AddDelivery.city);
    formData.append("contactNumber", AddDelivery.contactNumber);
    formData.append("nationality", AddDelivery.nationality);
    formData.append("address", AddDelivery.address);
    formData.append(
      "dateOfBirth",
      moment(AddDelivery.dateOfBirth).utc().format("YYYY-MM-DD")
    );
    formData.append(
      "joiningDate",
      moment(AddDelivery.joiningDate).utc().format("YYYY-MM-DD")
    );

    formData.append("driverLicenceNumber", AddDelivery.driverLicenceNumber);
    formData.append(
      "driverLicenceIssueDt",
      AddDelivery?.driverLicenceIssueDt
        ? moment(AddDelivery?.driverLicenceIssueDt).utc().format("YYYY-MM-DD")
        : null
    );
    formData.append(
      "driverLicenceExpiryDt",
      AddDelivery?.driverLicenceExpiryDt
        ? moment(AddDelivery?.driverLicenceExpiryDt).utc().format("YYYY-MM-DD")
        : null
    );

    formData.append("driverLicenceType", AddDelivery.driverLicenceType);
    formData.append("driverExperience", AddDelivery.driverExperience);
    formData.append("driverLicenceArea", AddDelivery.driverLicenceArea);
    formData.append("driverMiFareCardNo", AddDelivery.driverMiFareCardNo);
    formData.append("gender", AddDelivery.gender);
    formData.append("internalNumber", AddDelivery.internalNumber);
    formData.append("profilePic", AddDelivery.profilePic);
    formData.append("vehicleNumberOrName", AddDelivery.vehicleNumberOrName);
    formData.append("registrationNumber", AddDelivery.registrationNumber);
    formData.append("vehicleCategory", AddDelivery.vehicleCategory);
    formData.append("vehicleCapacity", AddDelivery.vehicleCapacity);
    formData.append("user_country_code", AddDelivery?.user_country_code);
    multipartPostCall(ApiConfig.DELIVERY_PERSON_ADD, formData)
      .then((res) => {
        setBtnDesable(false);
        if (res.result) {
          notifySuccess(res.message);
          navigate("/DeliveryPerson");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      setAddDelivery({
        ...AddDelivery,
        [e.target.name]: e.target.files[0],
      });
    } else setAddDelivery({ ...AddDelivery, [e.target.name]: e.target.value });
  };
  var date = new Date();
  const mobileOnChangeHandler = (phone, country) => {
    setAddDelivery({
      ...AddDelivery,
      contactNumber: phone?.replace(country.dialCode, ""),
      user_country_code: country?.dialCode,
      nationality: countriesWithShortCode[country.countryCode?.toUpperCase()],
    });
  };
  const countrySelectOnSelect = (code) => {
    setAddDelivery({
      ...AddDelivery,
      nationality: countriesWithShortCode[code],
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
                  {editData
                    ? t("Edit Delivery Person Details")
                    : t("New Delivery Person Details")}
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
                      Please Choose Picture.
                    </Form.Control.Feedback>

                    <div className="main-img-wrapper">
                      <div className="profile-img-wrapper">
                        <img
                          src={
                            !AddDelivery.profilePic
                              ? profile
                              : AddDelivery.profilePic.length
                              ? 
                                AddDelivery.profilePic
                              : 
                                  AddDelivery.profilePic &&
                                URL.createObjectURL(AddDelivery.profilePic)
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
                      pattern="[a-zA-Z]*"
                      value={AddDelivery.firstName}
                      onChange={(e) => {
                        let value = e.target.value;
                        let valueInput = value.replace(/[^A-Za-z ]/gi, "");
                        setAddDelivery({
                          ...AddDelivery,
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
                      {t("Last Name")} <span className="red-star">(optional)</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("Enter Your Last Name")}
                      value={AddDelivery.lastName}
                      onChange={(e) => {
                        let value = e.target.value;

                        let valueInput = value.replace(/[^A-Za-z ]/gi, "");
                        setAddDelivery({
                          ...AddDelivery,
                          lastName: valueInput,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                     {t("Please Enter Your last name")} 
                    </Form.Control.Feedback>
                  </div>

                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Email")} <span className="red-star">(optional)</span>
                    </Form.Label>
                    <Form.Control
                    
                      type="email"
                      placeholder={t("Enter Your Email")}
                      value={AddDelivery.email}
                      onChange={(e) => {
                        setAddDelivery({
                          ...AddDelivery,
                          email: e.target.value,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                    {t("Please Enter Your Email")}  
                    </Form.Control.Feedback>
                  </div>

                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Mobile Number ")} <span className="red-star">*</span>
                    </Form.Label>
                    <MobilePhoneInput
                      CommanCountry={AddDelivery?.nationality}
                      commanNumber={AddDelivery?.contactNumber}
                      commanContryCode={AddDelivery?.user_country_code}
                      state={AddDelivery}
                      onChangeHandler={mobileOnChangeHandler}
                    />
                    {errMsg?.contactNumber?.length > 0 && (
                      <span className="text-danger">
                        {errMsg?.contactNumber}
                      </span>
                    )}
                    {/* <Form.Control
                      required
                      type="tel"
                      placeholder="Enter Your Contact Number"
                      value={AddDelivery.contactNumber}
                      onChange={(e) => {
                        const re = /^[0-9\b]+$/;

                  

                        if (e.target.value === '' || re.test(e.target.value)) {
                          setAddDelivery({
                            ...AddDelivery,
                            contactNumber: e.target.value,
                          });
                        }

                      }}
                    /> */}
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
                          value={AddDelivery.userPassword}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(
                              /[^0-9 A-Za-z @]/gi,
                              ""
                            );
                            setAddDelivery({
                              ...AddDelivery,
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
                          value={AddDelivery.confirmPassword}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(
                              /[^0-9 A-Za-z @]/gi,
                              ""
                            );
                            setAddDelivery({
                              ...AddDelivery,
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
                      value={AddDelivery.address}
                      onChange={(e) => {
                        setAddDelivery({
                          ...AddDelivery,
                          address: e.target.value,
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
                        placeholder={t("Enter Your city")}
                        value={AddDelivery.city}
                        onChange={(e) => {
                          let value = e.target.value;

                          let valueInput = value.replace(/[^A-Za-z ]/gi, "");
                          setAddDelivery({
                            ...AddDelivery,
                            city: valueInput,
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
                        countryName={AddDelivery.nationality}
                        state={AddDelivery}
                        onChangeHandler={countrySelectOnSelect}
                      />
                      {/* <Form.Control
                      required
                      type="text"
                      placeholder="Enter Your Country"
                      value={AddDelivery.nationality}

                      onChange={(e) => {
                        let value = e.target.value

                        let valueInput = value.replace(/[^A-Za-z ]/ig, '')
                        setAddDelivery({
                          ...AddDelivery,
                          nationality: valueInput,
                        });
                      }}
                    /> */}
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
                          setAddDelivery({
                            ...AddDelivery,
                            gender: value,
                          });
                        }}
                        value={AddDelivery.gender}
                        className="custom-select"
                      >
                        <Option value="" style={{ color: "rgba(156, 73, 0)" }}>
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
                      {t("Employee Code")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      placeholder={t("Enter Your Employee Code")}
                      value={AddDelivery.internalNumber}
                      onChange={(e) => {
                        const re = /^[0-9\b]+$/;

                        // if value is not blank, then test the regex

                        if (e.target.value === "" || re.test(e.target.value)) {
                          setAddDelivery({
                            ...AddDelivery,
                            internalNumber: e.target.value,
                          });
                        }
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                    {t("Please Enter Employee Code")}  
                    </Form.Control.Feedback>
                  </div>

                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Date Of Birth")}
                    </Form.Label>
                    <div className="innerSelectBox weekCounter datepicker-main">
                      <CommonDatePicker
                        setDate={setAddDelivery}
                        data={AddDelivery}
                        dateKey="dateOfBirth"
                      />
                      {errMsg?.dateOfBirth?.length > 0 && (
                        <span className="text-danger">
                          {errMsg?.dateOfBirth}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Joining Date")}
                    </Form.Label>
                    <div className="innerSelectBox weekCounter datepicker-main">
                      <CommonDatePicker
                        setDate={setAddDelivery}
                        data={AddDelivery}
                        dateKey="joiningDate"
                      />
                      {errMsg?.joiningDate?.length > 0 && (
                        <span className="text-danger">
                          {errMsg?.joiningDate}
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
                      value={AddDelivery.driverLicenceNumber}
                      onChange={(e) => {
                        let value = e.target.value;
                        let valueInput = value.replace(/[^0-9]/gi, "");
                        setAddDelivery({
                          ...AddDelivery,
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
                        required
                        style={{ width: "100%", height: "40px" }}
                        value={AddDelivery.driverLicenceType}
                        onChange={(value) => {
                          setAddDelivery({
                            ...AddDelivery,
                            driverLicenceType: value,
                          });
                        }}
                        className="custom-select"
                      >
                        <Option
                          selected
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
                        setDate={setAddDelivery}
                        data={AddDelivery}
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
                <CommonDatePicker setDate={setAddDrivers} data={AddDelivery} dateKey="driverLicenceExpiryDt"
                      minDate={AddDelivery?.driverLicenceIssueDt}
                
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
                        setDate={setAddDelivery}
                        data={AddDelivery}
                        dateKey="driverLicenceExpiryDt"
                        minDate={AddDelivery?.driverLicenceIssueDt}
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
                <CommonDatePicker setDate={setAddDrivers} data={AddDelivery} dateKey="driverLicenceExpiryDt"
                      minDate={AddDelivery?.driverLicenceIssueDt}
                
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
                      value={AddDelivery.driverLicenceArea}
                      onChange={(e) => {
                        setAddDelivery({
                          ...AddDelivery,
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
                        showSearch
                        required
                        onChange={(value) => {
                          setAddDelivery({
                            ...AddDelivery,
                            driverExperience: value,
                          });
                        }}
                        className="custom-select"
                        value={AddDelivery.driverExperience}
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
                      value={AddDelivery.driverMiFareCardNo}
                      onChange={(e) => {
                        setAddDelivery({
                          ...AddDelivery,
                          driverMiFareCardNo: e.target.value,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                    {t("Please Enter Your Mifarecard ID")}  
                    </Form.Control.Feedback>
                  </div>
                  <div className="edit-form-heading mb-3">
                    <p>{t("Vehicle Details")}</p>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Vehicle Number / Name")}{" "}
                      <span className="red-star">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      placeholder={t("Enter Vehicle Number / Name")}
                      value={AddDelivery.vehicleNumberOrName}
                      onChange={(e) => {
                        setAddDelivery({
                          ...AddDelivery,
                          vehicleNumberOrName: e.target.value,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                    {t("Please Enter Your Vehicle Number / Name")}  
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Registration Number")}{" "}
                      <span className="red-star">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      placeholder={t("Enter Registration Number")}
                     
                      value={AddDelivery.registrationNumber}
                      onChange={(e) => {
                       

                        // if value is not blank, then test the regex

                      
                          setAddDelivery({
                            ...AddDelivery,
                            registrationNumber: e.target.value,
                          });
                        
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                    {t("Please Enter Registration Number")}  
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="label-with-radio">
                      <span className="common-labels">
                        {t("Vehicle Type")} <span className="red-star">*</span>
                      </span>

                      <div id="customRadios">
                        <div class="form-check greenFlex me-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault1"
                            id="Exisiting"
                            checked={
                              CategeryStatus === "Exisiting" ? true : false
                            }
                            onChange={(e) => {
                              setCategeryStatus("Exisiting");
                            }}
                          />
                          <label
                            class="form-check-label custLabel"
                            for="Exisiting"
                          >
                            {t("Existing")}
                          </label>
                        </div>
                        <div class="form-check  greenFlex">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault1"
                            checked={CategeryStatus === "New" ? true : false}
                            id="New"
                            onChange={(e) => {
                              setCategeryStatus("New");
                            }}
                          />
                          <label class="form-check-label custLabel" for="New">
                            {t("New")}
                          </label>
                        </div>
                      </div>
                    </Form.Label>
                    {CategeryStatus === "New" ? (
                      <>
                        <Form.Control
                          required
                          type="text"
                          placeholder={t("Enter vehicle Type")}
                          // value={AddDelivery.vehicleNumberOrName}
                          onChange={(e) => {
                            setAddDelivery({
                              ...AddDelivery,
                              vehicleCategory: e.target.value,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                       {t("Please Enter Your vehicle Type")}   
                        </Form.Control.Feedback>
                      </>
                    ) : (
                      <>
                        <div className="multi-select-1">
                          <Select
                            required
                            style={{ width: "100%", height: "40px" }}
                            onChange={(value) => {
                              setAddDelivery({
                                ...AddDelivery,
                                vehicleCategory: value,
                              });
                            }}
                            className="custom-select"
                            value={AddDelivery.vehicleCategory}
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                            {t("Select Vehicle Type...")}  
                            </Option>
                            {CategeryType &&
                              CategeryType.length &&
                              CategeryType.map((Typelist, index) => {
                                return (
                                  <>
                                    <Option
                                      style={{ color: "rgba(156, 73, 0)" }}
                                      key={"delivery" + index}
                                      value={Typelist.vehicle_type_id}
                                    >
                                      {Typelist.vehicle_type_code}
                                    </Option>
                                  </>
                                );
                              })}
                          </Select>
                        </div>
                        <Form.Control.Feedback type="invalid">
                        {t("Please Select Vehicle Type")}  
                        </Form.Control.Feedback>
                      </>
                    )}
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Vehicle Capacity (Packets)")} 
                    </Form.Label>
                    <div className="multi-select-1">
                      <Select
                        required
                        style={{ width: "100%", height: "40px" }}
                        onChange={(value) => {
                          setAddDelivery({
                            ...AddDelivery,
                            vehicleCapacity: value,
                          });
                        }}
                        showSearch
                        value={AddDelivery.vehicleCapacity}
                        className="custom-select"
                      >
                        <Option value="" style={{ color: "rgba(156, 73, 0)" }}>
                       {t("Select Vehicle Capacity...")}   
                        </Option>
                        {capacityData &&
                          capacityData?.map((ele, index) => {
                            return (
                              <Option
                                value={ele}
                                style={{ color: "rgba(156, 73, 0)" }}
                              >
                                {ele}
                              </Option>
                            );
                          })}
                      </Select>
                    </div>
                    <Form.Control.Feedback type="invalid">
                   {t("Please Select Vehicle Capacity")}   
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
                  <button type="" class="cx-btn-2">
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

export default AddDeliveryPerson;

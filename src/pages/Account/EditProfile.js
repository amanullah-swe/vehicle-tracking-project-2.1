import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import profile from "../../assets/images/Update-profile.svg";
import camera from "../../assets/images/ic-camera.svg";
import { Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImportUser from "../../assets/images/imagesuser.png";
import Calendar from "../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import CommonDatePicker from "../../sharedComponent/CommonDatePicker";
import MobilePhoneInput from "../../sharedComponent/MobilePhoneInput";
import {
  countriesWithShortCode,
  latestDate,
} from "../../sharedComponent/common";
import CountrySelect from "../../sharedComponent/CountrySelect";
import ApiConfig from "../../api/ApiConfig";
import { multipartPostCall, simplePostCall } from "../../api/ApiServices";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import { Select } from "antd";
const { Option } = Select;
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const EditProfile = () => {
  const [startDate, setStartDate] = useState(new Date());
  const {
    sidebar,
    setSidebar,
    Dark,
    setDark,
    setcustomerProfile,
    customerData,
    loading,
    setLoading,
  } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const params = useParams();
  let UserId = params.id;
  const { t, i18n } = useTranslation();
  const navigation = useNavigate();
  const [userDetails, setUserDetails] = useState({
    user_profile_pic: "",
    user_name: "",
    user_last_name: "",
    user_number: "",
    user_country_code: "",
    user_email: "",
    user_address: "",
    user_city: "",
    user_natinality: "",
    user_dob: "",
    user_joining_date: "",
    user_gender: "",
    user_internation_number: "",
    // user_password: "",
    // user_confirmPassword: "",
    // isImageChange: false,
  });
  const [trigger, setTrigger] = useState(null);
  const mobileOnChangeHandler = (phone, country) => {
    setUserDetails({
      ...userDetails,
      user_number: phone?.replace(country.dialCode, ""),
      user_country_code: country?.dialCode,
      user_natinality:
        countriesWithShortCode[country.countryCode?.toUpperCase()],
    });
  };

  const mobileOnChangeHandlerI = (phone, country) => {
    setUserDetails({
      ...userDetails,
      user_internation_number: phone.replace(country.dialCode, ""),
      user_country_code: country.dialCode,
      user_natinality:
        countriesWithShortCode[country.countryCode?.toUpperCase()],
    });
  };

  const countrySelectOnSelect = (code) => {
    setUserDetails({
      ...userDetails,
      user_natinality: countriesWithShortCode[code],
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      updateProfile(event);
    }

    setValidated(true);
  };

  useEffect(() => {
    if (UserId) {
      getUserDetails();
    }
  }, []);
  const getUserDetails = (id) => {
    setLoading(true);
    let newRequestBody = JSON.stringify({
      user_id: UserId.toString(),
      user_role: customerData.UserRole,
    });
    simplePostCall(ApiConfig?.USER_PROFILE, newRequestBody)
      .then((res) => {
        setLoading(false);
        if (res.result == true) {
          let user_profile = res?.data[0];
          setUserDetails({
            user_name: user_profile?.user_name,
            // userPassword: user_profile?.user_password,
            user_last_name: user_profile?.user_last_name,
            // confirmPassword: user_profile?.user_confirmPassword,
            user_email: user_profile?.user_email,
            user_city: user_profile?.user_city,
            user_number: user_profile?.user_mobile,
            user_natinality: user_profile?.user_nationality,
            user_address: user_profile?.user_address,
            user_dob: user_profile?.user_dob,
            user_joining_date: user_profile?.user_joining_date,
            user_gender: user_profile?.user_gender,
            user_internation_number: user_profile?.user_internal_no,
            user_profile_pic: user_profile?.user_profile_pic,
            user_country_code: user_profile?.user_country_code,
          });
          setTrigger(Math.random() * 1000);
          if (id == "update") {
            setcustomerProfile(res?.data[0]);
            localStorage.setItem("user", JSON.stringify(res.data[0]));
          }
        } else {
          // setUserDetails({});
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("user_id", UserId);
    formData.append("firstName", userDetails.user_name);
    // formData.append("userPassword", userDetails.user_password);
    // formData.append("confirmPassword", userDetails.user_confirmPassword);
    formData.append("lastName", userDetails.user_last_name);
    formData.append("address", userDetails.user_address);
    formData.append("email", userDetails.user_email);
    formData.append("city", userDetails.user_city);
    formData.append("contactNumber", userDetails.user_number);
    formData.append("nationality", userDetails.user_natinality);
    formData.append(
      "dateOfBirth",
      latestDate(userDetails?.user_dob, "yyyy-MM-dd")
    );
    formData.append(
      "joiningDate",
      latestDate(userDetails?.user_joining_date, "yyyy-MM-dd")
    );
    formData.append("gender", userDetails.user_gender);
    formData.append("internalNumber", userDetails.user_internation_number);
    formData.append("profilePic", userDetails.user_profile_pic);
    formData.append("user_country_code", userDetails?.user_country_code);
    multipartPostCall(ApiConfig.USER_ROLE_UPDATE, formData)
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
          getUserDetails("update");
          // localStorage.setItem("user", JSON.stringify(res.json?.data[0]));
          // setcustomerProfile(res.data[0]);
          navigation("/MyProfile");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  // const handleChange = (e) => {
  //   if (e.target.name === "user_profile_pic") {
  //     setUserDetails({
  //       ...userDetails,
  //       [e.target.name]: e.target.files[0],
  //       // isImageChange: true,
  //     });
  //   } else
  //   setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  // };
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
      {trigger && (
        <div id="cx-wrapper">
          <div
            className="main-dashboard-wrapper CustomerProfile"
            id="EditProfile_Reponsive"
          >
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="CustomerProfile-head">
                <label
                  htmlFor="uploadPic"
                  className="porile-img d-block c-pointer"
                >
                  <Form.Control
                    accept="image/png, image/gif, image/jpeg"
                    type="file"
                    id="uploadPic"
                    className="d-none"
                    name="user_profile_pic"
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        user_profile_pic: e.target.files[0],
                      });
                    }}
                  />

                  <Form.Control.Feedback type="invalid">
                    Please Choose Picture.
                  </Form.Control.Feedback>
                  <div className="main-img-wrapper">
                    <div className="profile-img-wrapper">
                      <img
                        src={
                          !userDetails?.user_profile_pic
                            ? ImportUser
                            : userDetails?.user_profile_pic.length
                              ? userDetails?.user_profile_pic
                              : ApiConfig.BASE_URL_FOR_IMAGES_L +
                              userDetails?.user_profile_pic &&
                              URL.createObjectURL(userDetails?.user_profile_pic)
                        }
                        onError={(ev) => {
                          handleErrorImage(ev);
                        }}
                        alt="porfile"
                      />
                      <img src={camera} alt="" className="cameraimg" />
                    </div>
                  </div>
                </label>
              </div>
              <div className="information-card row">
                <div className="col-md-6 form_input_main">
                  <Form.Label className="common-labels">
                    {t("First Name")}
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Please Enter Name"
                    autocomplete="off"
                    value={userDetails.user_name}
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        user_name: e.target.value,
                      });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter First Name.
                  </Form.Control.Feedback>
                </div>

                <div className="col-md-6 form_input_main">
                  <Form.Label className="common-labels">
                    {t("Last Name")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Please Enter Last Name"
                    value={userDetails?.user_last_name}
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        user_last_name: e.target.value,
                      });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Last Name.
                  </Form.Control.Feedback>
                </div>

                <div className="col-md-6 form_input_main">
                  <Form.Label className="common-labels">
                    {t("Gender")}
                  </Form.Label>
                  <div className="multi-select-1">
                    <Select
                      style={{ width: "100%", height: "40px" }}
                      value={userDetails.user_gender}
                      onChange={(value) =>
                        setUserDetails({
                          ...userDetails,
                          user_gender: value,
                        })
                      }
                      className="custom-select"
                    >
                      <Option value="" style={{ color: "rgba(156, 73, 0)" }}>
                        Please Select Gender
                      </Option>
                      <Option value="M" style={{ color: "rgba(156, 73, 0)" }}>
                        Male
                      </Option>
                      <Option value="F" style={{ color: "rgba(156, 73, 0)" }}>
                        Female
                      </Option>
                      <Option value="O" style={{ color: "rgba(156, 73, 0)" }}>
                        other
                      </Option>
                    </Select>
                  </div>
                  <Form.Control.Feedback type="invalid">
                    Please Select Gender.
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-6 form_input_main">
                  <Form.Label className="common-labels">
                    {t("Mobile Number")}
                  </Form.Label>

                  <MobilePhoneInput
                    CommanCountry={userDetails?.user_natinality}
                    commanNumber={userDetails?.user_number}
                    commanContryCode={userDetails?.user_country_code}
                    state={userDetails}
                    onChangeHandler={mobileOnChangeHandler}
                  />

                  <Form.Control.Feedback type="invalid">
                    Please Enter Mobile Number.
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-6 form_input_main">
                  <Form.Label className="common-labels">
                    {t("Email")}
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="please Enter email id"
                    value={userDetails?.user_email}
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        user_email: e.target.value,
                      });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Valid mail id.
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-6 form_input_main CountyListNPM">
                  <Form.Label className="common-labels">
                    {t("Nationality")}
                  </Form.Label>
                  <CountrySelect
                    countryName={userDetails?.user_natinality}
                    state={userDetails}
                    onChangeHandler={countrySelectOnSelect}
                  />
                  {/* <Form.Select aria-label="Default select example">
                  <option>India</option>
                  <option value="1">USA</option>
                  <option value="2">UAE</option>
                </Form.Select> */}
                  <Form.Control.Feedback type="invalid">
                    Please Select Gender.
                  </Form.Control.Feedback>
                </div>

                <div className="col-md-6 form_input_main">
                  <Form.Label className="common-labels">{t("City")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Please Enter City"
                    value={userDetails?.user_city}
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        user_city: e.target.value,
                      });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter City Name.
                  </Form.Control.Feedback>
                </div>

                <div className="col-md-6 form_input_main">
                  <Form.Label className="common-labels">
                    {t("Date Of Birth")}
                  </Form.Label>
                  <div className="innerSelectBox weekCounter datepicker-main">
                    {/* <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control"
                  />
                  <img src={Calendar} className="calendarLogo" alt="" /> */}

                    <CommonDatePicker
                      dateKey="user_dob"
                      setDate={setUserDetails}
                      data={userDetails}
                      SetPlaceholder={"Date Of Birth"}
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">
                    Please Enter D.O.B
                  </Form.Control.Feedback>
                </div>
                <div className="col-lg-6 form_input_main">
                  <Form.Label className="common-labels">
                    {t("Address")}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Please enter Address"
                    value={userDetails?.user_address}
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        user_address: e.target.value,
                      });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Address.
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-12 col-lg-6  form_input_main">
                  <div className="displayBoth">
                    <div className="innerStartDate">
                      <Form.Label className="common-labels">
                        {t("Joining Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main form_input_main">
                        {/* <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="form-control"
                      />
                      <img src={Calendar} className="calendarLogo" alt="" /> */}

                        <CommonDatePicker
                          dateKey="user_joining_date"
                          setDate={setUserDetails}
                          data={userDetails}
                          SetPlaceholder={"Joinging "}
                        />
                      </div>
                      <Form.Control.Feedback type="invalid">
                        Please Enter Joining Date
                      </Form.Control.Feedback>
                    </div>
                    <div className="innerCnum">
                      <div className="form_input_main">
                        <Form.Label className="common-labels">
                          {t("Employee Code")}
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={userDetails?.user_internation_number}
                          placeholder="please Enter number"
                          onChange={(e) => {
                            setUserDetails({
                              ...userDetails,
                              user_internation_number: e.target.value,
                            });
                          }}
                        />

                        {/* <MobilePhoneInput
                        CommanCountry={userDetails?.user_natinality}
                        commanNumber={userDetails?.user_internation_number}
                        commanContryCode={'91'}
                        state={userDetails}
                        onChangeHandler={mobileOnChangeHandlerI}
                      /> */}
                        <Form.Control.Feedback type="invalid">
                          Please Enter Employee Code.
                        </Form.Control.Feedback>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btns-main btn-wrapper">
                {/* <Link to="#"> */}
                <button
                  type="button"
                  className="cx-btn-1"
                  onClick={() => {
                    navigation("/MyProfile");
                  }}
                >
                  {t("Cancel")}
                </button>
                {/* </Link> */}
                {/* <Link to="#"> */}
                <button type="submit" className="cx-btn-2">
                  {t("Update")}
                </button>
                {/* </Link> */}
              </div>
            </Form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default EditProfile;

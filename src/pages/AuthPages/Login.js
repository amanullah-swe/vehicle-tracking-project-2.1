import React, { useContext, useState } from "react";

import logo from "../../assets/images/Web-Application-Logo.svg";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import { PostCallWithErrorResponse } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifySuccess, notifyError } from "../../sharedComponent/notify";
import { useDispatch } from "react-redux";
import { login, saveSetting, addonSetting } from "../../store/loginSlice";
import { ColorRing } from "react-loader-spinner";
import { io } from "socket.io-client";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
const Login = ({ }) => {
  const { t, i18n } = useTranslation();
  let option = {
    timeout: 20000,
    query: {
      UID: localStorage.getItem('id'),
    },
  }
  const {
    setCustomerData,
    setRegionCord,
    loading,
    setLoading,
    geUserListList, brand, getallbrand, setTimeZone, setcustomerProfile, setSocket
  } = useContext(AppContext);
  const dispach = useDispatch();
  const [validated, setValidated] = useState(false);

  const [userDetails, setUserDetails] = useState({
    user_name: "",
    password: "",
    app_type: "null",
    device_id: "111",
    device_token: "12345",
    device_os: "web",
  });

  const [errMsg, setErrMsg] = useState({ user_name: "", password: "" });
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } {
      alert(t("validate"))
    }

    setValidated(true);
  };

  const aninations = {
    initial: { opacity: 0, x: -400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const Userlogin = (e) => {
    e.preventDefault();
    if (userDetails?.user_name === "") {
      setErrMsg({ ...errMsg, user_name: t("Please Enter user name") });
      return;
    }
    if (userDetails.password === "") {
      setErrMsg({ ...errMsg, password: t("Please Enter Password") });
      return;
    }
    //  if (userDetails.password.length < 8) {
    //   setErrMsg({ ...errMsg, password: "Password must be at least 8 characters " });
    //   return;
    // } 
    //  if (!/[A-Z]/.test(userDetails.password)) {
    //   setErrMsg({ ...errMsg, password: "Password must include at least one uppercase letter" });
    //   return;
    // }  if (!/[a-z]/.test(userDetails.password)) {
    //   setErrMsg({ ...errMsg, password: "Password must include at least one lowercase letter" });
    //   return;
    // }
    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(userDetails.password)) {
    //   setErrMsg({ ...errMsg, password: "Password must include at least one special character" });
    //   return;
    // } 
    else {
      setLoading(true);
      PostCallWithErrorResponse(ApiConfig.USER_LOGIN, {
        ...userDetails,
      })
        .then((res) => {
          setLoading(false);

          if (res.json?.success && res.json?.success === true) {
            getallbrand()
            setcustomerProfile(res.json?.user)
            handleSetRegionCard(res.json.customer?.customer_latitude, res.json.customer?.customer_longitude)
            localStorage.setItem("api_key", res.json.customer.api_key);
            localStorage.setItem("user", JSON.stringify(res.json?.user));
            localStorage.setItem("lat", res.json.customer.customer_latitude);
            localStorage.setItem("customer_distance_unit", res.json.customer.customer_distance_unit)
            localStorage.setItem("customer_temperature_unit", res.json.customer.customer_temperature_unit)
            localStorage.setItem("dispatch_settings_default_unloading_time_duration", res.json.customer.dispatch_settings_default_unloading_time_duration)
            localStorage.setItem("dispatch_settings_default_loading_time_duration", res.json.customer.dispatch_settings_default_loading_time_duration)
            localStorage.setItem("long", res.json.customer.customer_longitude);
            localStorage.setItem("settings_week_start_day", "Monday",);
            
            
            localStorage.setItem(
              "customer_first_name",
              res.json.customer.customer_first_name
            );
            localStorage.setItem(
              "customer_role",
              res.json.customer.customer_role
            );
            localStorage.setItem("customer_id", res.json.customer.customer_id);
            localStorage.setItem("User_id", res.json.User_id);
      
            localStorage.setItem(
              "user_profile_pic",
              res.json.user.user_profile_pic
            );
            localStorage.setItem("id", res.json.user_id);
            localStorage.setItem("UserRole", res.json.user.user_role);

            localStorage.setItem("logedIn", true);
            localStorage.setItem("timeZone", res?.json.customer?.customer_time_zone);
            setTimeZone(res?.json.customer?.customer_time_zone)
            geUserListList();
            handleSetRegionCard(res.json.customer?.customer_latitude, res.json.customer?.customer_longitude);

            dispach(
              login({
                lat: res.json.customer.customer_latitude,
                long: res.json.customer.customer_longitude,
                customer_first_name: res.json.customer.customer_first_name,
                customer_role: res.json.customer.customer_role,
                customer_id: res.json.customer.customer_id,
                user_profile_pic: res.json.user.user_profile_pic,
                UserRole: res.json.user.user_role,
              })
            );
            setCustomerData({
              id: res.json.user_id,
              api_key: res.json.customer.api_key,
              lat: Number(res.json.customer.customer_latitude),
              long: Number(res.json.customer.customer_longitude),
              customer_id: res.json.customer.customer_id,
              UserRole: res.json.user.user_role,
              User_id: res.json.user_id,
              Userdistance:res.json.customer.customer_distance_unit,
              dispatch_settings_default_loading_time_duration:res.json.customer.dispatch_settings_default_loading_time_duration,
              dispatch_settings_default_unloading_time_duration:res.json.customer.dispatch_settings_default_unloading_time_duration
            });
            if (res.json.TransportationGeofence && res.json.accessRightUser) {
              localStorage.setItem(
                "TransportationGeofence",
                JSON.stringify(res.json.TransportationGeofence)
              );
              localStorage.setItem(
                "addonModule",
                JSON.stringify(res.json?.addons)
              );
              localStorage.setItem(
                "accessRights",
                JSON.stringify(res.json.accessRightUser)
              );
              localStorage.setItem(
                "accessreports",
                JSON.stringify(res.json.reports)
              );
              dispach(
                saveSetting({
                  accessRights: res.json.accessRightUser,
                  accessreports: res.json.reports,
                  TransportationGeofence: res.json.TransportationGeofence,
                }),

              );
              dispach(
                addonSetting({
                  addonModule: res.json?.addons,

                })
              );
            }
            localStorage.setItem("vehicleTabListActive", "vehicle");

            setSocket(io(`${ApiConfig.BASE_URL}?UID=${res?.json?.user_id}&user_customer_id=${res?.json?.customer?.customer_id}`, option))

          } else {
            notifyError(res?.json?.message);
          }
        })

        .catch((err) => {
          setLoading(false);

          console.log(err);
        });
    }
  };

  const handleSetRegionCard = (lat, lng) => {
    setRegionCord([Number(lat), Number(lng)]);
  }
  useEffect(()=>{
    getallbrand()
  
  },[])
  return (
    <motion.div
      className="main-auth"
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="login-wrapper">
        <div className="row height-style">
          <div className="col-md-6 left">
            <div className="bg-img">
              <h3>
              {t("A New Way")} <br />
    {t("To Track Your")} <br />
    {t("Vehicle")}
              </h3>
            </div>
          </div>

          <div className="col-md-6 right cx-relative">
            <div className="wrapper row">
              <div>
                <div className="top-logo">
                  <img src={brand?.logo || logo
                  } alt="" />
                </div>
                <h3>{t("Welcome Back !")}</h3>
                <div className="auth-form">
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-4">
                      <Form.Label className="common-labels">
                      {t("Email ID / Mobile Number")}  
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Your Email ID / Mobile Number")}
                        value={userDetails.email}
                        onChange={(e) => {
                          setErrMsg({ ...errMsg, user_name: "" });
                          setUserDetails({
                            ...userDetails,
                            user_name: e.target.value.trim(),
                          });
                        }}
                      />
                      {errMsg?.user_name && <div className="text-danger">{errMsg?.user_name}</div>}
                      <Form.Control.Feedback type="invalid">
                     {t("Please Enter Email ID / Mobile Number")}.
                      </Form.Control.Feedback>
                    </div>
                    <div className="mb-2">
                      <Form.Label className="common-labels">
                       {t("Password")} 
                      </Form.Label>
                      <Form.Control
                        required
                        type="password"
                        placeholder={t("Enter your password")}
                        value={userDetails?.password}
                        onChange={(e) => {
                          setErrMsg({ ...errMsg, password: "" });
                          setUserDetails({
                            ...userDetails,
                            password: e.target.value.trim(),
                          });
                        }}
                      />
                      {errMsg?.password && <div className="text-danger">{errMsg?.password}</div>}
                      <Form.Control.Feedback type="invalid">
                       {t("Please Enter password")}.
                      </Form.Control.Feedback>
                    </div>
                    <div className="forgot-link d-flex justify-content-between align-items-center">
                      {/* <Link to="/Registration">{t("Sign Up")} </Link> */}
                      <Link to="/Register">{t("Sign Up")} </Link>
                      <Link to="/ForgetPassword">{t("Forgot Password ?")}</Link>
                    </div>
                    <div className="btn-auth">
                      <Link to="/Dashboard">
                        <button
                          type="button"
                          className="filled-btn"
                          onClick={Userlogin}
                          disabled={loading ? true : false}
                        >
                         {t("Log In")} {" "}
                          {loading && (
                            <ColorRing
                              visible={true}
                              height="30"
                              width="30"
                              ariaLabel="blocks-loading"
                              wrapperStyle={{}}
                              wrapperClass="blocks-wrapper"
                              colors={[
                                "#e15b64",
                                "#f47e60",
                                "#f8b26a",
                                "#abbd81",
                                "#849b87",
                              ]}
                            />
                          )}
                        </button>
                      </Link>

                      {/* not implimented hide instructed by haris sir  02/11/2023 */}


                      {/* <div className="or-section-main">
                        <div className="left"></div>
                        <div className="or-text">
                          <span>OR</span>
                        </div>
                        <div className="right"></div>
                      </div>
                      <Link to="/LoginWithOTP">
                        <button type="submit" className="filled-btn">
                          Log In with OTP
                        </button>
                      </Link>
                      <Link to="/Registration">
                        <button className="unfilled-btn">
                          Register As Customer
                        </button>
                      </Link>
                      <div className="link-style">
                        <Link to="/DemoAccount">
                          Try Our Free Demo (No Credit Card Details Required )
                        </Link>
                      </div> */}
                      <div className="link-style">
                        <Link to="#">{new Date()?.getFullYear()}{` @ ${brand?.name}`}  </Link>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;

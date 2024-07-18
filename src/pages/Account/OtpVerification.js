import React, { useContext, useState } from "react";
import arrow from "../../assets/images/ic_line_arrow_left.svg";
import logo from "../../assets/images/ic_lock.svg";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const OtpVerification = () => {
  // const [validated, setValidated] = useState(false);
  // const [email, setEmail] = useState("");
  // const [error, setError] = useState("");
  // function isEmailValid(email) {
  //   const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  //   return regex.test(email);
  // }
  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   } else if (!isEmailValid(email)) {
  //     event.preventDefault();
  //     setValidated(true);
  //     setError("Please enter a valid email address.");
  //   } else {
  //     // Perform the API request or other actions here
  //   }

  //   setValidated(true);
  // };
  const { sidebar, setSidebar, Dark, setDark  ,loading, setLoading, customerProfile} = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [passwordData, setPasswordData] = useState({
    user_old_password: "",
    user_new_password: "",
    user_confirm_password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Validation passed, you can handle password change logic here
      if (passwordData.user_new_password === passwordData.user_confirm_password) {
        // Passwords match, update the password
        // You can make an API call or update the password in your state
        // Reset the form and state
        updatepasswordApiCall()
        setValidated(false);
      } else {
        handleErrorConfirmation()
        // Passwords do not match, handle the error
        // You might want to show an error message to the user
      }
    }

    setValidated(true);
  };
  const [errMsg, setErrMsg] = useState({
errPassword:""
  })
  const handleErrorConfirmation=()=>{
      setErrMsg({
        ...errMsg,
        errPassword:"Password Does Not Match.",
      });
      return;
    
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrMsg({...errMsg,errPassword:""})
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const updatepasswordApiCall = () => {
     setLoading(true);
    let newRequestBody = JSON.stringify({password:passwordData?.user_new_password.trim(),confirm_password:passwordData?.user_confirm_password.trim(),verification_token:passwordData?.user_old_password.trim()});
    simplePostCall(ApiConfig?.USER_OTPVERIFICATION, newRequestBody)
      .then((res) => {
        if (res.success===true) {
          navigate("/");
          notifySuccess(res.message);
        } else {
          notifyError(res?.message);
        }
          
       
        
        // setcustomerProfile({});
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <motion.div
      className="main-auth"
      variants={aninations}
      initial="initial"GeneralSetting
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="login-wrapper">
        <div className="row height-style">
          <div className="col-md-6 left">
            <div className="bg-img">
              <h3>
                A New Way <br /> To Track Your <br /> Vehicle
              </h3>
            </div>
          </div>

          <div className="col-md-6 right cx-relative">
            <div className="wrapper forgot-wrapper  row">
              <div>
                <div className="arrow ">
                  <Link to="/ForgetPassword">
                    <img src={arrow} alt="" />
                  </Link>
                </div>
                <div className="top-logo">
                  <img src={logo} alt="" />
                </div>
                <h3>OTP Verification ?</h3>
                {/* <div className="auth-form">
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-4">
                      <Form.Label className="common-labels">
                        Enter your OTP below to reset your password.
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter your Email ID / Mobile Number"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Your OTP.
                      </Form.Control.Feedback>
                      {error && <div className="error-message">{error}</div>}
                    </div>

                    <div className="btn-auth">
                      <Link to="#">
                        <button type="submit" className="filled-btn">
                          Verify
                        </button>
                      </Link>

                      <div className="link-style">
                        <Link to="#">2023 @ Vehicle Tracking</Link>
                      </div>
                    </div>
                  </Form>
                </div> */}


           <div className="form-wrapper">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <Form.Group
                      className="form_input_main"
                      controlId="user_old_password"
                    >
                      <Form.Label>{t("Users OTP")}</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="user_old_password"
                        value={passwordData.user_old_password}
                        onChange={handleInputChange}
                        placeholder="Enter Your OTP"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter OTP.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group
                      className="form_input_main"
                      controlId="user_new_password"
                    >
                      <Form.Label>{t("New Password")}</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        name="user_new_password"
                        value={passwordData.user_new_password}
                        onChange={handleInputChange}
                        placeholder="Enter New Password"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter New Password.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group
                      className="form_input_main"
                      controlId="user_confirm_password"
                    >
                      <Form.Label>{t("Confirm Password")}</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        name="user_confirm_password"
                        value={passwordData.user_confirm_password}
                        onChange={handleInputChange}
                        placeholder="Re-enter Your New Password"
                      />
                      
                      <Form.Control.Feedback type="invalid">
                      Please Enter Confirm Password.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                 {errMsg?.errPassword.length > 0 && (
    <span className="text-danger">
      {errMsg?.errPassword}
    </span>
  )}
                </div>
                <div className="btns-main btn-wrapper">
                  <Link to="/ForgetPassword">
                    <button type="button" className="cx-btn-1">
                      {t("Cancel")}
                    </button>
                  </Link>
                  <button type="submit" className="cx-btn-2">
                    {t("Submit")}
                  </button>
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

export default OtpVerification;

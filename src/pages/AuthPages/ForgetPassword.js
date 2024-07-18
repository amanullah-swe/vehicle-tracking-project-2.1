import React, { useContext, useState } from "react";
import arrow from "../../assets/images/ic_line_arrow_left.svg";
import { motion } from "framer-motion";

import logo from "../../assets/images/ic_lock.svg";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../context/AppContext";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const ForgetPassword = () => {
  const { t, i18n } = useTranslation();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate()

  const {
   brand, 
  } = useContext(AppContext);

  // function isNumberValid(number) {
  //   const regex = /^[0-9]+$/;
  //   return regex.test(number);
  // }
function isEmailValid(email) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
  }
  const updatepasswordApiCall = (e) => {
    e.preventDefault();
  if(!isEmailValid(email)){
    setError(t("Please enter a valid email address."));
  }else{
    let newRequestBody = JSON.stringify({email:email});
    simplePostCall(ApiConfig?.USER_FORGET, newRequestBody)
      .then((res) => {
        if (res.success===true) {
          navigate("/OtpVerification");
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
       //  setLoading(false);
      });
  }
    // setLoading(true);
};
const handleEnterKeyPress = (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent the default form submission
    updatepasswordApiCall(e);
  }
}
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
             {t("A New Way")}
                 <br /> {t("To Track Your")} <br /> {t("Vehicle")} 
              </h3>
            </div>
          </div>

          <div className="col-md-6 right cx-relative">
            <div className="wrapper forgot-wrapper  row">
              <div>
                <div className="arrow ">
                  <Link to="/">
                    <img src={arrow} alt="" />
                  </Link>
                </div>
                <div className="top-logo">
                  <img src={brand?.logo} alt="" />
                </div>
                <h3>{t("Lost your password ?")} </h3>
                <div className="auth-form">
        
                    <div className="mb-4">
                      <Form.Label className="common-labels">
                     {t("Enter your e-mail address below to reset your password.")}   
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter your Email ID / Mobile Number")}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value) 
                          setError("")
                        }

                        }
                        onKeyPress={handleEnterKeyPress}

                      />
                      <Form.Control.Feedback type="invalid">
                     {t("Please Enter Enter you Email ID / Mobile Number.")}   
                      </Form.Control.Feedback>
                      {error && <div className="text-danger">{error}</div>}
                    </div>

                    <div className="btn-auth">
                 
                        <button type="button"  onClick={(e)=>{updatepasswordApiCall(e)}}className="filled-btn">
                       {t("Recover")}   
                        </button>
                     

                      <div className="link-style">
                        <Link to="#">{new Date()?.getFullYear()}{` @ ${brand?.name}`} </Link>
                      </div>
                    </div>
              
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgetPassword;

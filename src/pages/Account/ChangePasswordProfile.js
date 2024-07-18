import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
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
const ChangePasswordProfile = () => {
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
        if (passwordData.user_confirm_password === "") {
          setErrMsg({ ...errMsg, errPassword: "Please Enter Password" });
          return;
        }  if (passwordData.user_confirm_password.length < 8) {
          setErrMsg({ ...errMsg, errPassword: "Password must be at least 8 characters " });
          return;
        } 
        //  if (!/[A-Z]/.test(passwordData.user_confirm_password)) {
        //   setErrMsg({ ...errMsg, errPassword: "Password must include at least one uppercase letter" });
        //   return;
        // }  if (!/[a-z]/.test(passwordData.user_confirm_password)) {
        //   setErrMsg({ ...errMsg, errPassword: "Password must include at least one lowercase letter" });
        //   return;
        // }
        // if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordData.user_confirm_password)) {
        //   setErrMsg({ ...errMsg, errPassword: "Password must include at least one special character" });
        //   return;
        // }
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
     let idUser=localStorage.getItem("id")
    let newRequestBody = JSON.stringify({...passwordData,user_id:customerProfile.user_id});
    simplePostCall(ApiConfig?.USER_UPDATE_PASSWORD, newRequestBody)
      .then((res) => {
        if (res.success===true) {
          navigate("/MyProfile");
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
          <div className="main-master-wrapper" id="EditProfile_Reponsive">
            <div className="Heading">
              <p>{t("Change Password")}</p>
            </div>
            <div className="form-wrapper">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group
                      className="form_input_main"
                      controlId="user_old_password"
                    >
                      <Form.Label>{t("Users Password")}</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        name="user_old_password"
                        value={passwordData.user_old_password}
                        onChange={handleInputChange}
                        placeholder="Enter Your Password"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Current Password.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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
                  <Link to="/MyProfile">
                    <button type="button" className="cx-btn-1">
                      {t("Cancel")}
                    </button>
                  </Link>
                  <button type="submit" className="cx-btn-2">
                    {t("Update")}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ChangePasswordProfile;

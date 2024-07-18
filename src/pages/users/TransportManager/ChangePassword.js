import { React, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import delete_icon from "../../../assets/images/delete.svg";
import { Tab, Tabs, Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { Link, useNavigate, useParams } from "react-router-dom";
import import_icon from "../../../assets/images/import_icon.svg";
import export_icon from "../../../assets/images/export_icon.svg";
import edit_icon from "../../../assets/images/ic-edit.svg";
import { motion } from "framer-motion";
import { simplePostCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const { t, i18n } = useTranslation();

  const { sidebar, setSidebar, Dark, setDark, TransportId } =
    useContext(AppContext);
    const {id}=useParams()
    const handleCancle = () => {
      navigate("/TransportManager");
      setpassword({
        newPassword: "",
        confirmPassword: "",
      });
    };
  const [password, setpassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState({
    confirmPassword:""
  })
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      ChangePassword(event)
    }

    setValidated(true);
  };

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  function ChangePassword(e) {
    e.preventDefault();
    if (password.newPassword !== password?.confirmPassword) {
      setErrMsg({
        ...errMsg,
        confirmPassword: "Password Does Not Match",
      });
      return;
    }
    if (password.confirmPassword.length < 8) {
      setErrMsg({ ...errMsg, confirmPassword: "Password must be at least 8 characters " });
      return;
    } 

    let newRequestBody = JSON.stringify({
      user_id: TransportId?TransportId:id,
      newPassword: password.newPassword,
      confirmPassword: password.confirmPassword,
    });
    simplePostCall(ApiConfig.USER_TRANSPORT_CHANGEPASSWORD, newRequestBody)
      .then((data) => {
        if (data.result) {
          notifySuccess(data.message);
          navigate("/TransportManager");
        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

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
          <div className="main-master-wrapper">
            <div className="Heading">
              <p>{t("Change Password")}</p>
            </div>
            <div className="form-wrapper">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>{t("New Password")}</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        placeholder={t("Enter New Password")}
                        value={password.newPassword}
                        onChange={(e) => {
                          setpassword({
                            ...password,
                            newPassword: e.target.value,
                          });
                          setErrMsg({...errMsg,confirmPassword:""})
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                    {t("Please Enter New Password")}    
                     </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>{t("Confirm Password")}</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        placeholder={t("Re-enter Your New Password")}
                        value={password.confirmPassword}
                        onChange={(e) => {
                          setErrMsg({...errMsg,confirmPassword:""})
                          setpassword({
                            ...password,
                            confirmPassword: e.target.value,
                          });
                        }}
                      />
                         {errMsg?.confirmPassword.length > 0 && (
                          <span className="text-danger">
                            {errMsg?.confirmPassword}
                          </span>
                        )}
                      <Form.Control.Feedback type="invalid">
                    {t("Password Does Not Match.")}    
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
                <div className="btn-wrapper">
                  <button type="button" className="cx-btn-1" 
                  onClick={() => handleCancle()}
                  >
                    {t("Cancel")}
                  </button>
                  <button
                    type="submit"
                    className="cx-btn-2"
                
                  >
                    {t("Submit")}
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

export default ChangePassword;

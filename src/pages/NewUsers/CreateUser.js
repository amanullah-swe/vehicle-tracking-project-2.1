import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import profile from "../../assets/images/Update-profile.svg";
import camera from "../../assets/images/ic-camera.svg";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const CreateUser = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const { t, i18n } = useTranslation();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <main className={sidebar ? "taskMain " : "cx-active taskMain"} id="cx-main">
      <div id="cx-wrapper" className="Update_Customer_Profile ">
        <div
          className="main-dashboard-wrapper CustomerProfile "
          id="Create_User_Responsive"
        >
          <p className="main-page-heading">{t("New Contact Details")}</p>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="CustomerProfile-head">
              <label
                htmlFor="uploadPic"
                className="porile-img d-block c-pointer"
              >
                <Form.Control
                  required
                  type="file"
                  id="uploadPic"
                  className="d-none"
                />
                <Form.Control.Feedback type="invalid">
                  Please Choose Picture.
                </Form.Control.Feedback>

                <img src={profile} alt="porfile" />
                <img src={camera} alt="" className="cameraimg" />
              </label>
            </div>
            <div className="information-card row mb-0">
              <div className="col-md-6 form_input_main ">
                <Form.Label className="common-labels">
                  {t("First Name")} <span>&#42;</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter First Name"
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Customer Name.
                </Form.Control.Feedback>
              </div>

              <div className="col-md-6 form_input_main">
                <Form.Label className="common-labels">
                  {t("Last Name")}
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter last name"
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Contact No.
                </Form.Control.Feedback>
              </div>

              <div className="col-lg-6 form_input_main">
                <Form.Label className="common-labels">
                  {t("Email")} <span>&#42;</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Your Email ID"
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Email ID.
                </Form.Control.Feedback>
              </div>
              <div className="col-lg-6 ">
                <div className="form_input_main">
                  <Form.Label className="common-labels">
                    {t("Contact Number")} <span>&#42;</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter Your Contact Number"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Contact Number.
                  </Form.Control.Feedback>
                </div>
              </div>
              <div className="col-lg-12 form_input_main">
                <Form.Label className="common-labels">
                  {t("Address")}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Enter Your Address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Address.
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="btns-main">
              <Link to="/AllUsers">
                <button type="" className="cx-btn-1">
                  {t("Cancel")}
                </button>
              </Link>
              <Link to="/AllUsers">
                <button type="submit" className="cx-btn-2">
                  {t("Submit")}
                </button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default CreateUser;

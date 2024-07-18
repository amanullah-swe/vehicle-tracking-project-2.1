import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import profile from "../../../assets/images/Update-profile.svg";
import camera from "../../../assets/images/ic-camera.svg";
import Creoss from "../../../assets/images/Creoss_Red.svg";
import Warehouser_icon from "../../../assets/images/Warehouser_icon.svg";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import MapComponent from "../../../sharedComponent/MapComponent";
import { useTranslation } from "react-i18next";
const AddMerchant = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const [addwarehoues, setAddwarehoues] = useState(1);
  const { t, i18n } = useTranslation();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const addnewhouse = () => {
    setAddwarehoues(addwarehoues + 1);
  };
  const removenewhouse = () => {
    setAddwarehoues(addwarehoues - 1);
  };
  return (
    <main className={sidebar ? "taskMain " : "cx-active taskMain"} id="cx-main">
      <div id="cx-wrapper" className="Update_Customer_Profile ">
        <div
          className="main-dashboard-wrapper CustomerProfile "
          id="Create_User_Responsive"
        >
          <p className="main-page-heading">{t("New Merchant Details")}</p>
          <div className="CustomerProfile-head">
            <label htmlFor="uploadPic" className="porile-img d-block c-pointer">
              <Form.Control
                required
                type="file"
                id="uploadPic"
                className="d-none"
              />
              <Form.Control.Feedback type="invalid">
              {t("Please Choose Picture")}
              </Form.Control.Feedback>

              <img src={profile} alt="porfile" />
              <img src={camera} alt="" className="cameraimg" />
            </label>
          </div>
          <div className="information-card row mb-0">
            <div className="col-md-6 form_input_main ">
              <Form.Label className="common-labels">
                {t("Merchant Name TTT")} <span>&#42;</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder={t("Enter First Merchant Name")}
              />
              <Form.Control.Feedback type="invalid">
             {t("Please Enter Merchant Name.")}   
              </Form.Control.Feedback>
            </div>

            <div className="col-md-6 form_input_main">
              <Form.Label className="common-labels">
                {t("Contact Person Name")}
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder={t("Enter last Contact Person Name")}
              />
              <Form.Control.Feedback type="invalid">
             {t("Please Enter Contact No.")}   
              </Form.Control.Feedback>
            </div>
            {[...Array(addwarehoues)].map((rec, index) => {
              return (
                <div className="col-lg-12">
                  <div className="warehouse_details">
                    <div className="headerDet">
                      <label className="headerTxtDet">
                        {t("Warehouse Details")}-{index + 1}
                      </label>
                      {addwarehoues > 1 ? (
                        <div className="defult_check_address">
                          <img
                            src={Creoss}
                            alt=""
                            onClick={() => {
                              removenewhouse();
                            }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="col-md-12 col-sm-12 colFormDet">
                          <Form.Label className="common-labels">
                            {t("Warehouser Name")} <span>&#42;</span>
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={t("Enter First Name")}
                          />
                          <Form.Control.Feedback type="invalid">
                           {t("Please Enter Warehouser Name.")} 
                          </Form.Control.Feedback>
                        </div>
                        <div className="col-md-12 colFormDet">
                          <Form.Label className="common-labels">
                            {t("Warehouse Address")} <span>&#42;</span>
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            required
                            type="text"
                            placeholder={t("Enter Warehouse Address...")}
                          />
                          <Form.Control.Feedback type="invalid">
                           {t("Please Enter Pickup Address...")} 
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className=" addmerchant m-0 p-0">
                          <img src={Warehouser_icon} alt="" />
                          <MapComponent ComponentId={"dashboard"} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="btn-active-ann"
            onClick={() => {
              addnewhouse();
            }}
          >
            + {t("Add New")}
          </button>
          <div className="btns-main">
            <Link to="/Merchant">
              <button type="" className="cx-btn-1">
                {t("Cancel")}
              </button>
            </Link>
            <Link to="/Merchant">
              <button type="submit" className="cx-btn-2">
                {t("Submit")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddMerchant;

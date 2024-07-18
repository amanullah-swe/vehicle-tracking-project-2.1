import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Documantaion from "../../assets/images/Documantaion.svg";
import upload_dash from "../../assets/images/upload_dash.svg";
import upload_dash_g from "../../assets/images/upload_dash_g.svg";
import uploadIcon from "../../assets/images/uploadIcon.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  SimpleUploadFiles,
  simpleGetCall,
  simplePostCall,
} from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import Loader from "../../sharedComponent/Loader";
import DragAndDrop from "../../sharedComponent/DragAndDrop";
import { useTranslation } from "react-i18next";

const UpdateCustomerLogo = () => {
  const { sidebar, setLoading, loading,customerLogo, setCustomerLogo,getAlllogos} = useContext(AppContext);

   
  const { type } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [errorMsg, setErrorMsg] = useState("")
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const [logosData, setLogosData] = useState({});
  useEffect(() => {
    getAlllogos1();
  }, []);

  const getAlllogos1 = () => {
    setLoading(true);
    simpleGetCall(ApiConfig.GET_ALL_LOGO)
      .then((res) => {
        if (res.result) {
          setLogosData(res.data);
        }
      })
      .catch((err) => {
        notifyError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const saveLogos = () => {
    if (logosData[type]=== null) {
      setErrorMsg(t("Please uplode image"))
    } else {
      let formdata = new FormData();
      type && formdata.append("logo_logo", logosData[type]);
      formdata.append("type", type);
      formdata.append("logo_id", logosData.logo_id);
      setLoading(true);
      SimpleUploadFiles(ApiConfig.UPDATE_LOGO, formdata)
        .then((res) => {
          if (res.result) {
            notifySuccess(res.message);
            getAlllogos()
            navigate("/CustomerProfile");
          } else {
            notifyError(res?.error);
          }
        })
        .catch((err) => {
          console.log("err", err);
          notifyError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
      <div id="cx-wrapper" className="Update_Customer_Logo">
        <div className="main-dashboard-wrapper CustomerProfile">
          <p className="main-page-heading">{t("Update Customer Profile")}</p>
          <div className="row upload-customer-logo">
            {type == "logo_logo" ? (
              <div className=" col-md-6 form_input_main  single-card-customer-logo">
                <span className="logo-name">{t("Web Application Logo")}</span>
                <span className="logo-size">
                  ({t("Recommended Size")} 240px X 80px)
                </span>
                <div className="logo-file-name">
                  <div className="first">
                    <img src={Documantaion} alt="" />
                    <p>
                      {
                        logosData.logo_logo?.name
                          ? logosData.logo_logo?.name
                          : logosData.logo_logo}
                    </p>
                  </div>
                  <div className="last">
                    <img src={ upload_dash_g} alt="" />
                  </div>
                </div>
                {
                  errorMsg && <div className="errorMsg">{errorMsg}</div>
                }
                <DragAndDrop
                  lkey={"logo_logo"}
                  setter={setLogosData}
                  data={logosData}
                  size={{ width: 240, height: 80 }}
                  setErrorMsg={setErrorMsg}
                />
              </div>
            ) : type == "logo_map_logo" ? (
              <div className="col-md-6 form_input_main single-card-customer-logo">
                <span className="logo-name">
                  {t("Customer location in Google map")}
                </span>
                <span className="logo-size">
                  ({t("Recommended Size")} 40px X 40px)
                </span>
                <div className="logo-file-name">
                  <div className="first">
                    <img src={Documantaion} alt="" />
                    <p>
                      {
                        logosData.logo_map_logo?.name
                          ? logosData.logo_map_logo?.name
                          : logosData.logo_map_logo}
                    </p>
                  </div>
                  <div className="last">
                    <img src={upload_dash} alt="" />
                  </div>
                </div>
                {
                  errorMsg && <div className="errorMsg">{errorMsg}</div>
                }
                <DragAndDrop
                  lkey={"logo_map_logo"}
                  setter={setLogosData}
                  data={logosData}
                  size={{ width: 40, height: 40 }}
                  setErrorMsg={setErrorMsg}
                />
              </div>
            ) : type == "logo_email" ? (
              <div className=" col-md-6 form_input_main  single-card-customer-logo">
                <span className="logo-name">
                  {t("Logo For Email Template")}
                </span>
                <span className="logo-size">
                  ({t("Recommended Size")} 600px X 270px)
                </span>
                <div className="logo-file-name">
                  <div className="first">
                    <img src={Documantaion} alt="" />
                    <p>{ logosData?.logo_email?.name?logosData.logo_email?.name:logosData?.logo_email}</p>
                  </div>
                  <div className="last">
                    <img src={upload_dash} alt="" />
                  </div>
                </div>
                {
                  errorMsg && <div className="errorMsg">{errorMsg}</div>
                }
                <DragAndDrop
                  lkey={"logo_email"}
                  setter={setLogosData}
                  data={logosData}
                  size={{ width: 600, height: 270 }}
                  setErrorMsg={setErrorMsg}
                />
              </div>
            ) : type == "logo_email_banner" ? (
              <div className=" col-md-6 form_input_main single-card-customer-logo">
                <span className="logo-name">{t("Logo For Email Banner")}</span>
                <span className="logo-size">
                  ({t("Recommended Size")} 600px X 270px)
                </span>
                <div className="logo-file-name">
                  <div className="first">
                    <img src={Documantaion} alt="" />
                    <p>
                      {
                        logosData?.logo_email_banner?.name
                          ? logosData?.logo_email_banner?.name
                          : logosData?.logo_email_banner}
                    </p>
                  </div>
                  <div className="last">
                    <img src={upload_dash} alt="" />
                  </div>
                </div>
                {
                  errorMsg && <div className="errorMsg">{errorMsg}</div>
                }
                <DragAndDrop
                  lkey={"logo_email_banner"}
                  setter={setLogosData}
                  data={logosData}
                  size={{ width: 600, height: 270 }}
                  setErrorMsg={setErrorMsg}
                />
              </div>
            ) : type == "logo_trip_start_point" ? (
              <div className=" col-md-6 form_input_main  single-card-customer-logo">
                <span className="logo-name">{t("Logo Trip Start Point")}</span>
                <span className="logo-size">
                  ({t("Recommended Size")} 240px X 80px)
                </span>
                <div className="logo-file-name">
                  <div className="first">
                    <img src={Documantaion} alt="" />
                    <p>
                      {
                        logosData?.logo_trip_start_point?.name
                          ? logosData?.logo_trip_start_point?.name
                          : logosData?.logo_trip_start_point}
                    </p>
                  </div>
                  <div className="last">
                    <img src={upload_dash} alt="" />
                  </div>
                </div>
                {
                  errorMsg && <div className="errorMsg">{errorMsg}</div>
                }
                <DragAndDrop
                  lkey={"logo_trip_start_point"}
                  setter={setLogosData}
                  data={logosData}
                  size={{ width: 240, height: 80 }}
                  setErrorMsg={setErrorMsg}
                />
              </div>
            ) : type == "logo_map_bus" ? (
              <div className=" col-md-6 form_input_main  single-card-customer-logo">
                <span className="logo-name">
                  {t("Bus location in Google map")}
                </span>
                <span className="logo-size">
                  ({t("Recommended Size")} 240px X 80px)
                </span>
                <div className="logo-file-name">
                  <div className="first">
                    <img src={Documantaion} alt="" />
                    <p>
                      {
                        logosData?.logo_map_bus?.name
                          ? logosData?.logo_map_bus?.name
                          : logosData?.logo_map_bus}
                    </p>
                  </div>
                  <div className="last">
                    <img src={upload_dash} alt="" />
                  </div>
                </div>
                {
                  errorMsg && <div className="errorMsg">{errorMsg}</div>
                }
                <DragAndDrop
                  lkey={"logo_map_bus"}
                  setter={setLogosData}
                  data={logosData}
                  size={{ width: 240, height: 80 }}
                  setErrorMsg={setErrorMsg}
                />
              </div>
            ) : type == "logo_map_bus_available" ? (
              <div className=" col-md-6 form_input_main  single-card-customer-logo">
                <span className="logo-name">
                  {t("Parked Bus location In Google Map")}
                </span>
                <span className="logo-size">
                  ({t("Recommended Size")} 240px X 80px)
                </span>
                <div className="logo-file-name">
                  <div className="first">
                    <img src={Documantaion} alt="" />
                    <p>
                      {
                        logosData?.logo_map_bus_available?.name
                          ? logosData?.logo_map_bus_available?.name
                          : logosData?.logo_map_bus_available}
                    </p>
                  </div>
                  <div className="last">
                    <img src={upload_dash} alt="" />
                  </div>
                </div>
                {
                  errorMsg && <div className="errorMsg">{errorMsg}</div>
                }
                <DragAndDrop
                  lkey={"logo_map_bus_available"}
                  setter={setLogosData}
                  data={logosData}
                  size={{ width: 240, height: 80 }}
                  setErrorMsg={setErrorMsg}
                />
              </div>
            ) : type === "logo_bus_idle" ? (
              <div className=" col-md-6 form_input_main  single-card-customer-logo">
                <span className="logo-name">
                  {t("Idle Bus location in Google map")}
                </span>
                <span className="logo-size">
                  ({t("Recommended Size")} 240px X 80px)
                </span>
                <div className="logo-file-name">
                  <div className="first">
                    <img src={Documantaion} alt="" />
                    <p>
                      {
                        logosData?.logo_bus_idle?.name
                          ? logosData?.logo_bus_idle?.name
                          : logosData?.logo_bus_idle}
                    </p>
                  </div>
                  <div className="last">
                    <img src={upload_dash} alt="" />
                  </div>
                </div>
                {
                  errorMsg && <div className="errorMsg">{errorMsg}</div>
                }
                <DragAndDrop
                  lkey={"logo_bus_idle"}
                  setter={setLogosData}
                  data={logosData}
                  size={{ width: 240, height: 80 }}
                  setErrorMsg={setErrorMsg}
                />
              </div>
            ) : type === "logo_map_bus_untracked" ? (
              <div className=" col-md-6 form_input_main  single-card-customer-logo">
                <span className="logo-name">
                  {t("Untracked Bus location in Google map")}
                </span>
                <span className="logo-size">
                  ({t("Recommended Size")} 240px X 80px)
                </span>
                <div className="logo-file-name">
                  <div className="first">
                    <img src={Documantaion} alt="" />
                    <p>
                      {
                        logosData?.logo_map_bus_untracked?.name
                          ? logosData?.logo_map_bus_untracked?.name
                          : logosData?.logo_map_bus_untracked}
                    </p>
                  </div>
                  <div className="last">
                    <img src={upload_dash} alt="" />
                  </div>
                </div>
                {
                  errorMsg && <div className="errorMsg">{errorMsg}</div>
                }
                <DragAndDrop
                  lkey={"logo_map_bus_untracked"}
                  setter={setLogosData}
                  data={logosData}
                  size={{ width: 240, height: 80 }}
                  setErrorMsg={setErrorMsg}
                />
              </div>
            ) : (
              <div className=" col-md-6 form_input_main  single-card-customer-logo">
                <span className="logo-name">{t("Logo Trip End Point")}</span>
                <span className="logo-size">
                  ({t("Recommended Size")} 240px X 80px)
                </span>
                <div className="logo-file-name">
                  <div className="first">
                    <img src={Documantaion} alt="" />
                    <p>
                      {
                        logosData?.logo_trip_end_point?.name
                          ? logosData?.logo_trip_end_point?.name
                          : logosData?.logo_trip_end_point}
                    </p>
                  </div>
                  <div className="last">
                    <img src={upload_dash} alt="" />
                  </div>
                </div>
                {
                  errorMsg && <div className="errorMsg">{errorMsg}</div>
                }
                <DragAndDrop
                  lkey={"logo_trip_end_point"}
                  setter={setLogosData}
                  data={logosData}
                  size={{ width: 240, height: 80 }}
                  setErrorMsg={setErrorMsg}
                />
              </div>
            )}

            <div className="btns-main btn-wrapper">
              <Link to="/LogoUpdate">
                <button type="" className="cx-btn-1">
                  {t("Cancel")}
                </button>
              </Link>
              {/* <Link to="#"> */}
              <button
                type="submit" className="cx-btn-2" onClick={saveLogos}
              >
                {t("Update")}
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default UpdateCustomerLogo;

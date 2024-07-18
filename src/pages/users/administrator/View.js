import { React, useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import profile from "../../../assets/images/Customer-profile.png";
import GreenIcon from "../../../assets/images/Green-check.svg";
import CrossBtn from "../../../assets/images/Creoss_Red.svg"
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { simplePostCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import Loader from "../../../sharedComponent/Loader";
import ImportUser from "../../../assets/images/imagesuser.png";
import { DateDDMMYYYY } from "../../../sharedComponent/common";
import { useTranslation } from "react-i18next";

const View = () => {
  const { sidebar,DateFormatConfig } = useContext(AppContext);

  const [AdministratorDetails, setAdministratorDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();


  const params = useParams();
  let UserId = params.id;
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  useEffect(() => {
    if (UserId) {
      geAdminsterDetails();
    }
  }, []);
  const geAdminsterDetails = () => {
    setLoading(true)

    let newRequestBody = JSON.stringify({
      user_id: UserId.toString(),
    });
    simplePostCall(ApiConfig.USER_ADMINISTRATOR_PROFILE, newRequestBody)
      .then((res) => {
        setAdministratorDetails(res?.data);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
 };
  return (
    <>
     {loading ? (
                    <Loader />
                  ) : (
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
          <div
            className="main-dashboard-wrapper CustomerProfile"
            id="viewAdministratorProfile"
          >
            <div className="CustomerProfile-head">
              <div className="porile-img">
      
              <img  src={
                    AdministratorDetails?.user_profile_pic
                      ?AdministratorDetails?.user_profile_pic
                      : ImportUser
                  }
                  onError={(ev) => {
                    handleErrorImage(ev);
                  }}
                   alt="porfile" />

              
            
              </div>
            </div>
            <div className="information-card">
              <div className="information-head">
                <div className="imformation-heading">
                  <p>{t("Contact Information")}</p>
                </div>
              </div>
              <div className="information-contain row">
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                  <p className="discription-heading">{t("Name")}</p>
                  <p className="discription-contain">
                    {AdministratorDetails?.user_name}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                  <p className="discription-heading">{t("Mobile Number")}</p>
                  <p className="discription-contain">
                    {AdministratorDetails?.user_mobile}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                  <p className="discription-heading">{t("Email")}</p>
                  <p className="discription-contain">
                    {AdministratorDetails.user_email}{" "}
                    <img src={AdministratorDetails?.user_email_verification=="yes"?GreenIcon:CrossBtn} alt="" />{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="information-card">
              <div className="information-head">
                <div className="imformation-heading">
                  <p>{t("General Information")}</p>
                </div>
              </div>
              <div className="information-contain row">
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Address")}</p>
                  <p className="discription-contain">
                    {AdministratorDetails?.user_address}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                  <p className="discription-heading">{t("City")}</p>
                  <p className="discription-contain">
                    {AdministratorDetails?.user_city}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                  <p className="discription-heading">{t("Nationality")}</p>
                  <p className="discription-contain">
                    {AdministratorDetails?.user_nationality}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                  <p className="discription-heading">{t("Date Of Birth")}</p>
                  <p className="discription-contain">
                 {AdministratorDetails?.user_dob?DateDDMMYYYY(AdministratorDetails?.user_dob):""}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                  <p className="discription-heading">{t("Joining Date")}</p>
                  <p className="discription-contain">
                    
                 {AdministratorDetails?.user_joining_date?DateDDMMYYYY(AdministratorDetails?.user_joining_date):""}

                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                  <p className="discription-heading">{t("Gender")}</p>
                  <p className="discription-contain">
                    {AdministratorDetails?.user_gender=="M"?"Male":AdministratorDetails?.user_gender=="F"?"Female":"Other"}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                  <p className="discription-heading">{t("Employee Code")}</p>
                  <p className="discription-contain">
                    {AdministratorDetails?.user_internal_no}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                  <p className="discription-heading">{t("Status")}</p>
                  <p className="discription-contain">
                    {AdministratorDetails?.user_status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      </>
                  )}
    </>
  );
};

export default View;

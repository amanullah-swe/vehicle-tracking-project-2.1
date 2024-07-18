import { React, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import option from "../../assets/images/option-three-dot.svg";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ImportUser from "../../assets/images/imagesuser.png";
import ApiConfig from "../../api/ApiConfig";
import { useState } from "react";
import { useEffect } from "react";
import { DateDDMMYYYY } from "../../sharedComponent/common";
import { simplePostCall } from "../../api/ApiServices";
import CrossBtn from "../../assets/images/Creoss_Red.svg";
import GreenIcon from "../../assets/images/Green-check.svg";
import Loader from "../../sharedComponent/Loader";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const MyProfile = () => {
  const { sidebar, customerProfile, setcustomerProfile } =
    useContext(AppContext);
  const { t, i18n } = useTranslation();
  const [proFileDetails, setProFileDetails] = useState({});
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    let idUser = localStorage.getItem("id");
    let userRole = localStorage.getItem("UserRole");
    if (idUser && userRole) {
      getUserDetails(idUser, userRole);
    }

    //  setProFileDetails({...customerProfile,user_role:userRole,user_id:idUser})
  }, []);

  const getUserDetails = (idUser, userRole) => {
    setLoading(true);
    let newRequestBody = JSON.stringify({
      user_id: idUser.toString(),
      user_role: userRole,
    });
    simplePostCall(ApiConfig?.USER_PROFILE, newRequestBody)
      .then((res) => {
        setLoading(false);
        if (res) {
          let user_profile = res.data[0];
          setProFileDetails(res.data[0]);
          setcustomerProfile(res.data[0]);
          localStorage.setItem("user", JSON.stringify(res.data[0]));
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
  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
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
        {loading ? (
          <Loader />
        ) : (
          <> <div id="cx-wrapper">
            <div className="main-dashboard-wrapper CustomerProfile">
              <div className="CustomerProfile-head">
                <div className="porile-img">
                  <img
                    src={
                      proFileDetails?.user_profile_pic
                        ? proFileDetails?.user_profile_pic
                        : ImportUser
                    }
                    onError={(ev) => {
                      handleErrorImage(ev);
                    }}
                    alt="porfile"
                  />
                </div>
                <div className="customer-option">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <img src={option} alt="" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to={"/EditProfile/" + proFileDetails?.user_id}>
                          {t("Edit")}
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/ChangePasswordProfile">
                          {t("Change Password")}
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="information-card mb-4">
                <div className="information-head">
                  <div className="imformation-heading">
                    <p>{t("Contact Information")}</p>
                  </div>
                </div>
                <div className="information-contain row">
                  <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                    <p className="discription-heading">{t("Name")}</p>
                    <p className="discription-contain">
                      {proFileDetails?.user_name}
                    </p>
                  </div>
                  <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                    <p className="discription-heading">{t("Last Name")}</p>
                    <p className="discription-contain">
                      {proFileDetails?.user_last_name}
                    </p>
                  </div>
                  <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                    <p className="discription-heading">{t("Mobile Number")}</p>
                    <p className="discription-contain">
                      {proFileDetails?.user_mobile}
                    </p>
                  </div>
                  <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                    <p className="discription-heading">{t("Email")}</p>
                    <p className="discription-contain">
                      {proFileDetails?.user_email}
                      <img
                        src={
                          proFileDetails?.user_email_verification == "yes"
                            ? GreenIcon
                            : CrossBtn
                        }
                        alt=""
                      />{" "}
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
                  <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 mb-2">
                    <p className="discription-heading">{t("Address")}</p>
                    <p className="discription-contain">
                      {proFileDetails?.user_address}
                    </p>
                  </div>
                  <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                    <p className="discription-heading">{t("City")}</p>
                    <p className="discription-contain">
                      {proFileDetails?.user_city}
                    </p>
                  </div>
                  <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                    <p className="discription-heading">{t("Nationality")}</p>
                    <p className="discription-contain">
                      {proFileDetails?.user_nationality}
                    </p>
                  </div>
                  <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                    <p className="discription-heading">{t("Date Of Birth")}</p>
                    <p className="discription-contain">
                      {DateDDMMYYYY(proFileDetails?.user_dob)}
                    </p>
                  </div>
                  <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                    <p className="discription-heading">{t("Joining Date")}</p>
                    <p className="discription-contain">
                      {DateDDMMYYYY(proFileDetails?.user_joining_date)}
                    </p>
                  </div>
                  <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                    <p className="discription-heading">{t("Gender")}</p>
                    <p className="discription-contain">
                      {proFileDetails?.user_gender == "M"
                        ? "Male"
                        : proFileDetails?.user_gender == "F"
                          ? "Female"
                          : "Other"}
                    </p>
                  </div>
                  <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                    <p className="discription-heading">{t("Employee Code")}</p>
                    <p className="discription-contain">
                      {proFileDetails?.user_internal_no}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div></>)}
      </motion.div>
    </>
  );
};

export default MyProfile;

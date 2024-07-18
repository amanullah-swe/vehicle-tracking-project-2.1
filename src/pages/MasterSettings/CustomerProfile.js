import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import profile from "../../assets/images/Update-profile.svg";
import option from "../../assets/images/option-three-dot.svg";
import edit from "../../assets/images/ic-edit.svg";
import viewall from "../../assets/images/view-all.svg";
import viewallar from "../../assets/images/view-all_arabic.svg";
import car from "../../assets/images/ic-car.svg";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MapComponent from "../../sharedComponent/MapComponent";
import {
  postMultipartWithAuthCallWithErrorResponse,
  simplePostCall,
} from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import Loader from "../../sharedComponent/Loader";
import { notifyError } from "../../sharedComponent/notify";
import { DateDDMMYYYY } from "../../sharedComponent/common";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import profileDemo from "../../assets/images/profileDemo.png";
// import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import big_Logo from "../../assets/images/Web-Application-Logo.svg";
const CustomerProfile = () => {
  const [langStatus, setLangStatus ] = useState(0); 
  const { sidebar, setRegionCord, customerLogo, customerData } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [transportList, setTransportList] = useState([]);
  const [vehiclesLis, setVehiclesLis] = useState([]);
  const [customerSetting, setCustomerSetting] = useState({});
  const accessRights = useSelector((state) => state.auth.accessRights);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const userRole = accessRights && accessRights.rights_role;

  const renderTooltipForEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Editable Item
    </Tooltip>
  );
  useEffect(() => {
    getProfileDetails();
    if (userRole == "customer" || accessRights?.rights_view_tm == 1) {
      geATranspoertAllList();
    }
    if (userRole == "customer" || accessRights?.rights_view_vehicle == 1) {
      geAVehiclelList();
    }
  }, []);

  function geAVehiclelList() {
    let newRequestBody = JSON.stringify({
      vehicle_type: "allvehicle",
      page: 1,
    });
    simplePostCall(ApiConfig.GET_VEHICLE_LIST, newRequestBody)
      .then((data) => {
        if (data.result) {
          setVehiclesLis(data.data);
        } else {
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  function geATranspoertAllList() {
    let newRequestBody = JSON.stringify({
      // running_status: "all",
      user_status: "active",
      // "user_name": "",
      // "user_email": "",
      // "user_mobile": "",
      page: 1,
      page_limit: "10",
    });
    simplePostCall(ApiConfig.USER_TRANSPORT, newRequestBody)
      .then((data) => {
        if (data.result) {
          setTransportList(data.data);
        } else {
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  const getProfileDetails = () => {
    setLoading(true);
    postMultipartWithAuthCallWithErrorResponse(ApiConfig.GET_CUSTOMER_PROFILE)
      .then((res) => {
        // setLoading(false)
        if (res.json.result) {
          setRegionCord([
            Number(res.json.data.customer_latitude),
            Number(res.json.data.customer_longitude),
          ]);
          setCustomerSetting(res.json.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
        notifyError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const { t, i18n } = useTranslation();
  const handleErrorImage = (ev) => {
    ev.target.src = big_Logo;
  };
  return (
    <>
      <motion.div
        className={sidebar ? "taskMain " : "cx-active taskMain"}
        id="cx-main"
        //     variants={aninations}
        // initial="initial"
        // animate="animate"
        // exit="exit"
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
      >
        <div id="cx-wrapper" className="Customer_Profile">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="main-dashboard-wrapper CustomerProfile">
                <div className="CustomerProfile-head">
                  <div className="porile-img">
                    {/* {customerSetting?.user_profile_pic ? (
                      <img
                        src={`${ApiConfig.BASE_URL}${customerSetting?.user_profile_pic}`}
                        alt="porfile"
                      />
                    ) : (
                      <img src={profile} alt="n icon" />
                    )} */}

                    {customerLogo?.logo_logo && (
                      <img
                        src={
                          customerLogo?.logo_logo.length > 0
                            ? `${
                                ApiConfig.BASE_URL_FOR_IMAGES_L +
                                customerLogo.logo_logo
                              }`
                            : ""
                        }
                        onError={(ev) => {
                          handleErrorImage(ev);
                        }}
                        alt="Logo"
                      />
                    )}
                  </div>
                  <div className="customer-option">
                    {accessRights.rights_role == "customer" ||
                    accessRights.rights_manage_master_customer_profile ||
                    accessRights?.rights_manage_customer_profile ? (
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                          <img src={option} alt="" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <Link to="/UpdateCustomerProfile">
                              {t("Update Profile")}
                            </Link>
                          </Dropdown.Item>
                          {customerData.customer_id == 9999 ? <></> : <>
                          
                          <Dropdown.Item>
                            <Link to="/LogoUpdate">{t("Update Logo")}</Link>
                          </Dropdown.Item>
                          </>}
                          
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : null}
                  </div>
                </div>
                <div className="information-card">
                  <div className="information-head">
                    <div className="imformation-heading">
                      <p>{t("Contact Information")}</p>
                    </div>
                    {/* <div className="edit-information">
                      <OverlayTrigger
                        placement="left"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltipForEdit}
                      >
                        <Link to="#">
                          <div className="inconsIn">
                            <img src={edit} alt="" />
                          </div>
                        </Link>
                      </OverlayTrigger>
                    </div> */}
                  </div>
                  <div className="information-contain row">
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">{t("Name")}</p>
                      <p className="discription-contain">
                        {customerSetting?.customer_name}
                      </p>
                    </div>
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">{t("Email")}</p>
                      <p className="discription-contain">
                        {customerSetting?.customer_email}
                      </p>
                    </div>
                    {customerSetting?.customer_country_code && (
                      <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                        <p className="discription-heading">
                          {t("Mobile Number")}
                        </p>
                        <p className="discription-contain">
                          {`${
                            customerSetting?.customer_country_code
                              ? `${customerSetting?.customer_country_code}`
                              : ""
                          } ${customerSetting?.customer_mobile}`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="information-card">
                  <div className="information-head">
                    <div className="imformation-heading">
                      <p>{t("General Information")}</p>
                    </div>
                    {/* <div className="edit-information">
                      <OverlayTrigger
                        placement="left"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltipForEdit}
                      >
                        <Link to="#">
                          <div className="inconsIn">
                            <img src={edit} alt="" />
                          </div>
                        </Link>
                      </OverlayTrigger>
                    </div> */}
                  </div>
                  <div className="information-contain row">
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">{t("Address")}</p>
                      <p className="discription-contain">
                        {customerSetting.customer_address}
                      </p>
                    </div>
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">{t("City")}</p>
                      <p className="discription-contain">
                        {" "}
                        {customerSetting.customer_city}
                      </p>
                    </div>
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">{t("Country")}</p>
                      <p className="discription-contain">
                        {customerSetting.customer_country}
                      </p>
                    </div>
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">{t("Currency")}</p>
                      <p className="discription-contain">
                        {customerSetting.currency_name}
                        {customerSetting.currency_symbol &&
                          " (" + customerSetting.currency_symbol + ")"}
                      </p>
                    </div>
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">{t("Timezone")}</p>
                      <p className="discription-contain">
                        {customerSetting.customer_time_zone}
                      </p>
                    </div>
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">
                        {t("Distance Unit")}
                      </p>
                      <p className="discription-contain">
                        {customerSetting?.customer_distance_unit}
                      </p>
                    </div>
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">
                        {t("Temperature Unit")}
                      </p>
                      <p className="discription-contain">
                        {customerSetting?.customer_temperature_unit}
                      </p>
                    </div>
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">{t("Website")}</p>
                      <p
                        className="discription-contain"
                        style={{ overflowWrap: "break-word" }}
                      >
                        {/* <a href={customerSetting.customer_website} target="_blank" rel="noopener noreferrer"> */}
                        {customerSetting.customer_website}
                        {/* </a> */}
                      </p>
                    </div>
                    <div className="information-discriptiopn col-lg-12 form_input_main">
                      <p className="discription-heading">{t("Status")}</p>
                      <p className="discription-contain">
                        {customerSetting.customer_status}
                      </p>
                    </div>
                  </div>
                </div>
{customerData.customer_id == 9999 ? <></> :<>
<div className="information-card">
                  <div className="information-head">
                    <div className="imformation-heading">
                      <p>{t("Subscribe Information")}</p>
                    </div>
                  </div>
                  <div className="information-contain row">
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">
                        {t("Customer Plan")}
                      </p>
                      <p className="discription-contain">
                        {customerSetting.plan_name}
                      </p>
                    </div>
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">{t("Account Type")}</p>
                      <p className="discription-contain">
                        {customerSetting.customer_account_type}
                      </p>
                    </div>
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">{t("Expiry Date")}</p>
                      <p className="discription-contain">
                        {customerSetting.customer_expiry_date &&
                          DateDDMMYYYY(customerSetting.customer_expiry_date)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="information-card">
                  <div className="information-head">
                    <div className="imformation-heading">
                      <p>{t("Server Information")}</p>
                    </div>
                  </div>
                  <div className="information-contain row">
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">{t("Port")}</p>
                      <p className="discription-contain">
                        {customerSetting.customer_port}
                      </p>
                    </div>
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">{t("IP")}</p>
                      <p className="discription-contain">
                        {customerSetting?.customer_ip_address}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="information-card">
                  <div className="information-head">
                    <div className="imformation-heading">
                      <p>{t("API Information")}</p>
                    </div>
                  </div>
                  <div className="information-contain row">
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">{t("Customer ID")}</p>
                      <p className="discription-contain">
                        {customerSetting.customer_id}
                      </p>
                    </div>
                    <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                      <p className="discription-heading">{t("API Key")}</p>
                      <p className="discription-contain">
                        {customerSetting.customer_api_key}
                      </p>
                    </div>
                  </div>
                </div>

</>}
                

              </div>
              {customerData.customer_id == 9999 ? <></> : <>
              <div
              className="transport-main row m-0 p-0 "
              style={{ justifyContent: "space-between" }}
            >
              {(userRole == "customer" ||
                accessRights?.rights_view_tm == 1) && (
                <div className="right-section col-lg-6">
                  <div className="transport-head">
                    <p>{t("Transport manager")}</p>
                    <Link to="/TransportManager">
                      {/* <img src={ viewall} alt="" /> */}
                      {langStatus === 0 ? <img src={viewall} alt=''/> : langStatus === 1 ? <img src={viewallar} alt=''/> : <img src={viewall} alt=''/>}
                      
                    </Link>
                  </div>
                  <div className="common-table">
                    {transportList?.length ? (
                      <table>
                        <thead>
                          <tr>
                            <th id="twoTables">{t("Sr.no")}</th>
                            <th>{t("Transport Manager")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transportList?.map((tranporter, index) => {
                            return (
                              <tr key={"tranporter" + index}>
                                <td>{index + 1}</td>
                                <td>{tranporter.user_name}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <div
                        style={{
                          color: "red",
                          textAlign: "center",
                          padding: "50% 0 50% 0",
                        }}
                      >
                        No data found
                      </div>
                    )}
                  </div>
                </div>
              )}
              {(userRole == "customer" ||
                accessRights?.rights_view_vehicle == 1) && (
                <div className="left-section col-lg-6">
                  <div className="transport-head">
                    <p>{t("Vehicles")}</p>
                    <Link to="/Vehicle">
                      {/* <img src={viewallar} alt="" /> */}
                      {langStatus === 0 ? <img src={viewall} alt=''/> : langStatus === 1 ? <img src={viewallar} alt=''/> : <img src={viewall} alt=''/>}
                     
                    </Link>
                  </div>
                  <div className="common-table">
                    <table>
                      <thead>
                        <tr>
                          <th id="twoTables">{t("Sr.no")}</th>
                          <th>{t("Vehicle Name")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vehiclesLis.length
                          ? vehiclesLis.map((vehicle, index) => {
                              return (
                                <tr key={"vehicle" + index}>
                                  <td>{index + 1}</td>
                                  <td>{vehicle.vehicle_number}</td>
                                </tr>
                              );
                            })
                          : t("No Vehicle Found")}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
              
              
              
              
              
              
              
              
              
              </>}
             
              <div style={{ marginTop: "10px" }} />
              <div className="road-map CustomerProfile">
                <MapComponent
                  componentId={"CustomerProfile"}
                  customerSetting={customerSetting}
                />
              </div>
              {/* <div className="ApplicationStatistics">
                <div className="ApplicationStatistics-head">
                  <p>{t("Application Statistics")}</p>
                </div>
                <div className="common-table">
                  <table>
                    <thead>
                      <tr>
                        <th id="FirstMiunWIdth">{t("Sr.no")}</th>
                        <th>{t("Application Statistics")}</th>
                        <th>{t("Value")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          {" "}
                          <img src={car} alt="" className="tableImg" />{" "}
                          Transport Manager (Android)
                        </td>
                        <td>00</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>
                          <img src={car} alt="" className="tableImg" />{" "}
                          Transport Manager (IOS)
                        </td>
                        <td>00</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>
                          <img src={car} alt="" className="tableImg" /> Driver
                          Console (Android)
                        </td>
                        <td>00</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>
                          <img src={car} alt="" className="tableImg" /> Delivery
                          App (Android)
                        </td>
                        <td>00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> */}
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};
export default CustomerProfile;

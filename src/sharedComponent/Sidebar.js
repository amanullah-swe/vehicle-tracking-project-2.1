import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Logo from "../assets/images/logo.png";
import { Accordion } from "react-bootstrap";
import ic_marketplace from "../assets/images/ic_marketplace.svg";
import ic_marketplace_active from "../assets/images/ic_marketplace_active.svg";
import big_Logo from "../assets/images/Web-Application-Logo.svg";
import dashboard_icon from "../assets/images/sidebar/icons/dashboard.svg";
import dashboard_icon_active from "../assets/images/sidebar/icons/dashboard_active.svg";
import setting_icon from "../assets/images/sidebar/icons/setting.svg";
import setting_icon_active from "../assets/images/sidebar/icons/setting_active.svg";
import data_icon from "../assets/images/sidebar/icons/data.svg";
import data_icon_active from "../assets/images/sidebar/icons/data_active.svg";
import user_icon from "../assets/images/sidebar/icons/user.svg";
import user_icon_active from "../assets/images/sidebar/icons/user_active.svg";
import trip_icon from "../assets/images/sidebar/icons/trip.svg";
import trip_icon_active from "../assets/images/sidebar/icons/trip_active.svg";
import vehicle_ex_icon from "../assets/images/sidebar/icons/vehicle-ex.svg";
import vehicle_ex_icon_active from "../assets/images/sidebar/icons/vehicle-ex_active.svg";
import dispatch_icon from "../assets/images/sidebar/icons/dispatch.svg";
import dispatch_icon_active from "../assets/images/sidebar/icons/dispatch_active.svg";
import payment_icon from "../assets/images/sidebar/icons/payment.svg";
import payment_icon_active from "../assets/images/sidebar/icons/payment_active.svg";
import communication_icon from "../assets/images/sidebar/icons/communication.svg";
import communication_icon_active from "../assets/images/sidebar/icons/communication_active.svg";
import reports_icon from "../assets/images/sidebar/icons/reports.svg";
import reports_icon_active from "../assets/images/sidebar/icons/reports_active.svg";
import config_icon from "../assets/images/sidebar/icons/config.svg";
import config_icon_active from "../assets/images/sidebar/icons/config_active.svg";
import ParkingManagement_icon_active from "../assets/images/sidebar/icons/ParkingManagement_icon_active.svg";
import Report_Distribution from "../assets/images/sidebar/icons/Report_Distribution.svg";
import Report_Distribution_active from "../assets/images/sidebar/icons/Report_Distribution_active.svg";
import ParkingManagement_icon from "../assets/images/sidebar/icons/ParkingManagement_icon.svg";
import ReplayPlayback_active from "../assets/images/sidebar/icons/ReplayPlayback_active.svg";
import ReplayPlayback_icon from "../assets/images/sidebar/icons/ReplayPlayback.svg";
import Feture_set from "../assets/images/sidebar/icons/Feature_set.svg";
import Feture_set_active from "../assets/images/sidebar/icons/Feature_set_active.svg";
import FuelManagement from "../assets/images/sidebar/icons/FuelManagement.svg";
import FuelManagement_active from "../assets/images/sidebar/icons/FuelManagement_active.svg";
import double_arrow from "../assets/images/double_arrow.svg";
import VehicleInspection_active from "../assets/images/sidebar/icons/VehicleInspection_active.svg";
import VehicleInspection from "../assets/images/sidebar/icons/VehicleInspection.svg";
import { useMediaQuery } from "react-responsive";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ApiConfig from "../api/ApiConfig";
const Sidebar = () => {
  const temporaryHide = false;
  const addOnSetting = true;
  const [masterSetting, setMasterSetting] = useState(false);
  const [masterSetting1, setMasterSetting1] = useState(false);
  const [masterData, setMasterData] = useState(false);
  const [masterData1, setMasterData1] = useState(false);
  const [Users, setUsers] = useState(false);
  const [Users1, setUsers1] = useState(false);
  const [NewUser1, setNewUser1] = useState(false);
  const [featureSet1, setFeatureSet1] = useState(false);
  const [TripManagement, setTripManagement] = useState(false);
  const [TripManagement1, setTripManagement1] = useState(false);
  const [VehicleExpenses, setVehicleExpenses] = useState(false);
  const [VehicleExpenses1, setVehicleExpenses1] = useState(false);
  const [DispatchManagement, setDispatchManagement] = useState(false);
  const [DispatchManagement1, setDispatchManagement1] = useState(false);
  const [Payment, setPayment] = useState(false);
  const [Payment1, setPayment1] = useState(false);
  const [Inspection, setInspection] = useState(false);
  const [Inspection1, setInspection1] = useState(false);
  const [MarketPlace, setMarketPlace] = useState(false);
  const [MarketPlace1, setMarketPlace1] = useState(false);
  const [Communication, setCommunication] = useState(false);
  const [Communication1, setCommunication1] = useState(false);
  const [Reports, setReports] = useState(false);
  const [Reports1, setReports1] = useState(false);
  const [ConfigurationChecker, setConfigurationChecker] = useState(false);
  const [ConfigurationChecker1, setConfigurationChecker1] = useState(false);
  const [ParkingManagement, setParkingManagement] = useState(false);
  const [ParkingManagement1, setParkingManagement1] = useState(false);
  const [ReplayPlayback, setReplayPlayback] = useState(false);
  const [ReplayPlayback1, setReplayPlayback1] = useState(false);
  const [FuelMana, setFuelMana] = useState(false);
  const [FuelMana1, setFuelMana1] = useState(false);
  const accessRights = useSelector((state) => state.auth.accessRights);
  const addonSettingData = useSelector((state) => state.auth.addonModule);
  const userRole = "noRole";
  const userRoleCustomer = accessRights && accessRights.rights_role;
  const navigate = useNavigate();
  const currentRoute = useLocation().pathname;
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const { t } = useTranslation();
  useEffect(() => {
    isMobile ? setSidebar(false) : setSidebar(false);
    handleOpenMenu();
    return () => { };
  }, [isMobile]);

  const [Purchasemenue, setPurchasemenue] = useState();

  const handleOpenMenu = () => {
    if (currentRoute === "/" || currentRoute === "/") {
      setDashboard(true);
    } else if (currentRoute === "/" || currentRoute === "/") {
      setPurchasemenue(true);
    }
  };

  const [Dashboard, setDashboard] = useState(true);
  const [Dashboard1, setDashboard1] = useState(true);
  const [Announcements, setAnnouncements] = useState(false);
  const [Email, setEmail] = useState(false);
  const [PushNotifications, setPushNotifications] = useState(false);
  const {
    sidebar,
    setSidebar,
    userListRole,
    setVehicleTabListActive,
    customerLogo,
    ChatCount,
    setDispatchStatus,
  } = useContext(AppContext);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  // useEffect(() => {
  //   setSidebar(true)
  // }, [])

  const dynamicComponents = userListRole;
  const [dynamicAccesR, setdynamicAccesR] = useState({});
  const [dyanamicView, setDyanamicView] = useState(false);
  const [dyanamicManage, setDyanamicManage] = useState(false);
  const [dyanamicDelete, setDyanamicDelete] = useState(false);
  const [dynamicMaproute, setDynamicMaproute] = useState([]);
  useEffect(() => {
    if (accessRights && userListRole && userRole !== "customer") {
      handledynamicRights(userListRole);
    } else {
      setDynamicMaproute(userListRole);
    }
  }, [accessRights, userListRole]);
  const handledynamicRights = (userListRoleU) => {
    let obj = {};
    Object.keys(accessRights).some((key) => {
      if (
        key.endsWith("dynm") &&
        key?.toLowerCase()?.includes("rights_view_")
      ) {
        obj = { ...obj, [key]: accessRights[key] };
      }
    });
    if (Object.values(obj).some((param) => param == 1)) {
      setDyanamicView(true);
    } else {
      setDyanamicView(false);
    }
    setdynamicAccesR(obj);
    const filteredRoles = userListRoleU.filter((role) =>
      Object.keys(obj).some(
        (key) =>
          role.role_name.toLowerCase() == key.split("_")[2] && obj[key] == 1
      )
    );

    setDynamicMaproute(filteredRoles);
  };

  const handleErrorImage = (ev) => {
    ev.target.src = big_Logo;
  };
  const handleErrorImage1 = (ev) => {
    ev.target.src = Logo;
  };
  // const accessRightsValue = (object) => {
  //   for (const key in object) {
  //     if (object[key] == 1) {
  //       return true; // Return true if any property has a value of 1
  //     }
  //   }
  //   return false; // Return false if none of the properties have a value of 1
  // };

  const handleVeicleTab = () => {
    if (accessRights?.rights_view_vehicle) {
      localStorage.setItem("vehicleTabListActive", "vehicle");
      setVehicleTabListActive("vehicle");
      return true;
    }

    if (
      !accessRights?.rights_view_vehicle &&
      accessRights?.rights_view_vehiclegroup
    ) {
      localStorage.setItem("vehicleTabListActive", "group");
      setVehicleTabListActive("group");
      return true;
    }

    if (
      !accessRights?.rights_view_vehicle &&
      accessRights?.rights_view_vehiclesync
    ) {
      localStorage.setItem("vehicleTabListActive", "sync");
      setVehicleTabListActive("sync");
      return true;
    }
    if (
      !accessRights?.rights_view_vehicle &&
      accessRights?.rights_view_vehicletype
    ) {
      localStorage.setItem("vehicleTabListActive", "category");
      setVehicleTabListActive("category");
      return true;
    }
    if (
      !accessRights?.rights_view_vehicle &&
      accessRights?.rights_view_hardware_feature_set
    ) {
      localStorage.setItem("vehicleTabListActive", "FeatureSet");
      setVehicleTabListActive("FeatureSet");
      return true;
    }
  };
  return (
    <div className="cx-sidebar ">
      <div
        className={
          sidebar
            ? "cx-sidebar-wrapper "
            : "cx-sidebar-wrapper sidebarActive slide-bar-new"
        }
      >
        <aside>
          <div className="outer-main-menu ">
            <div className="menus-main ">
              {sidebar ? (
                <div className="top-logo-big">
                  <div className="left">
                    <Link to="/dashboard">
                      {customerLogo?.logo_logo && (
                        <img
                          src={
                            customerLogo?.logo_logo.length > 0
                              ? `${ApiConfig.BASE_URL_FOR_IMAGES_L +
                              customerLogo?.logo_logo
                              }`
                              : big_Logo
                          }
                          onError={(ev) => {
                            handleErrorImage(ev);
                          }}
                          alt="Logo"
                        />
                      )}
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="top-logo-small">
                  <div className="left ">
                    <Link to="/dashboard">
                      {customerLogo?.logo_logo && (
                        <img
                          src={
                            customerLogo?.logo_logo.length > 0
                              ? `${ApiConfig.BASE_URL_FOR_IMAGES_L +
                              customerLogo.logo_logo
                              }`
                              : Logo
                          }
                          onError={(ev) => {
                            handleErrorImage1(ev);
                          }}
                          alt="Logo"
                        />
                      )}
                    </Link>
                  </div>
                </div>
              )}

              <div className="arrow-sidebar">
                <Link
                  to="#"
                  className="sidebar-arrows"
                  onClick={() => {
                    handleSidebar();
                    // setDashboard(true)
                    // setDashboard1(true)
                    setConfigurationChecker(false);
                    setCommunication(false);
                    setReports(false);
                    setDispatchManagement(false);
                    setPayment(false);
                    setUsers(false);
                    setVehicleExpenses(false);
                    setMasterData(false);
                    setMasterSetting(false);
                    setParkingManagement(false);
                    setReplayPlayback(false);
                  }}
                >
                  <img src={double_arrow} alt="" />
                </Link>
              </div>

              <div className="sidebar-menu-wrapper">
                <Accordion>
                  {/* ================> Dashboard Start <============== */}
                  {(userRole === "customer" ||
                    accessRights?.rights_dashboard_map === 1) && (
                      <Accordion.Item eventKey="7" id="single_accordian_item">
                        <Accordion.Header>
                          <div
                            className="menus-items"
                            onClick={() => {
                              isMobile ? setSidebar(false) : setSidebar(true);
                            }}
                          >
                            <Link
                              to="/dashboard"
                              className="icon-menu-name"
                              onMouseOver={() => setDashboard1(true)}
                              onMouseOut={() => setDashboard1(false)}
                              onClick={() => {
                                setCommunication(false);
                                setDispatchManagement(false);
                                setPayment(false);
                                setUsers(false);
                                setVehicleExpenses(false);
                                setMasterData(false);
                                setMasterSetting(false);
                                setReplayPlayback(false);
                                setParkingManagement(false);
                                setConfigurationChecker(false);
                                setReports(false);
                              }}
                            >
                              <div className="icon-left">
                                {currentRoute === "/dashboard" ||
                                  Dashboard1 === true ? (
                                  <img src={dashboard_icon_active} alt="" />
                                ) : (
                                  <img src={dashboard_icon} alt="" />
                                )}
                              </div>

                              <div
                                className={
                                  currentRoute === "/dashboard" ||
                                    Dashboard1 === true
                                    ? "menu-name activeColorBrown"
                                    : "menu-name"
                                }
                              >
                                {t("Dashboard")}
                              </div>
                            </Link>
                          </div>
                        </Accordion.Header>
                      </Accordion.Item>
                    )}
                  {/* ================> Dashboard End <============== */}

                  {/* ================> Master Setting Start <============== */}



                  {addonSettingData.addon_ghatke == 1 ? <></> :
                    <>
                      {userRoleCustomer === "customer" ||
                        accessRights?.rights_view_customer_profile ||
                        accessRights?.rights_manage_general_settings ||
                        accessRights?.rights_manage_integration_settings ||
                        accessRights?.rights_manage_transportation_settings ||
                        accessRights.rights_manage_notification_settings ||
                        (addonSettingData["addon_dispatch"] &&
                          accessRights?.rights_manage_dispatch_settings) ||
                        accessRights.rights_manage_access_rights ||
                        accessRights.rights_view_addon_settings ||
                        accessRights?.rights_view_log_changes_settings ? (
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            <div
                              className="icon-menu-name"
                              onMouseOver={() => setMasterSetting1(true)}
                              onMouseOut={() => setMasterSetting1(false)}
                            >
                              <div className="icon-left">
                                {masterSetting === true ||
                                  masterSetting1 === true ||
                                  masterSetting === true ||
                                  currentRoute === "/CustomerProfile" ||
                                  currentRoute === "/UpdateCustomerProfile" ||
                                  currentRoute === "/UpdateCustomerLogo" ||
                                  currentRoute === "/GeneralSetting" ||
                                  currentRoute === "/IntegrationSetting" ||
                                  currentRoute === "/TransportationSetting" ||
                                  currentRoute === "/NotificationSetting" ||
                                  (addonSettingData["addon_dispatch"] == 1 &&
                                    accessRights?.rights_manage_dispatch_settings ==
                                    1 &&
                                    currentRoute === "/DispatchSetting") ||
                                  currentRoute === "/AcessRole" ||
                                  currentRoute === "/UserRole" ||
                                  currentRoute === "/LogoUpdate" ||
                                  currentRoute === "/AddOnSettings" ||
                                  currentRoute === "/LogChanges" ||
                                  currentRoute === "/AddOnSettingsCart" ? (
                                  <Link
                                    to="/CustomerProfile"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img src={setting_icon_active} alt="" />
                                  </Link>
                                ) : (
                                  <Link
                                    to="/CustomerProfile"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img src={setting_icon} alt="" />
                                  </Link>
                                )}
                              </div>
                              <div
                                className={
                                  masterSetting1 === true ||
                                    masterSetting === true ||
                                    currentRoute === "/CustomerProfile" ||
                                    currentRoute === "/UpdateCustomerProfile" ||
                                    currentRoute === "/UpdateCustomerLogo" ||
                                    currentRoute === "/GeneralSetting" ||
                                    currentRoute === "/IntegrationSetting" ||
                                    currentRoute === "/TransportationSetting" ||
                                    currentRoute === "/NotificationSetting" ||
                                    (addonSettingData["addon_dispatch"] == 1 &&
                                      currentRoute === "/DispatchSetting") ||
                                    currentRoute === "/AccessRight" ||
                                    currentRoute === "/AcessRole" ||
                                    currentRoute === "/UserRole" ||
                                    currentRoute === "/LogoUpdate" ||
                                    currentRoute === "/AddOnSettings" ||
                                    currentRoute === "/LogChanges" ||
                                    currentRoute === "/AddOnSettingsCart"
                                    ? "menu-name activeColorBrown"
                                    : "menu-name"
                                }
                              >
                                {t("Master Settings")}
                              </div>
                            </div>
                          </Accordion.Header>

                          <Accordion.Body>
                            <div className="sub-menus">
                              <ul className="actionnmenulist">
                                {(userRole === "customer" ||
                                  accessRights?.rights_view_customer_profile ==
                                  1) && (
                                    <li>
                                      <Link
                                        onClick={() => {
                                          setParkingManagement(false);
                                          setReplayPlayback(false);
                                          isMobile
                                            ? setSidebar(false)
                                            : setSidebar(true);
                                        }}
                                        className={
                                          currentRoute === "/CustomerProfile" ||
                                            currentRoute === "/UpdateCustomerProfile" ||
                                            currentRoute === "/LogoUpdate" ||
                                            currentRoute === "/UpdateCustomerLogo"
                                            ? "activeColorBrown"
                                            : ""
                                        }
                                        to="/CustomerProfile"
                                      >
                                        {t("Customer Settings")}
                                      </Link>
                                    </li>
                                  )}
                                {userRole === "customer" ||
                                  (accessRights &&
                                    accessRights?.rights_manage_general_settings ==
                                    1) ? (
                                  <li>
                                    <Link
                                      onClick={() => {
                                        setParkingManagement(false);
                                        isMobile
                                          ? setSidebar(false)
                                          : setSidebar(true);
                                      }}
                                      to="/GeneralSetting"
                                      className={
                                        currentRoute === "/GeneralSetting" &&
                                        "activeColorBrown"
                                      }
                                    >
                                      {t("General Settings")}
                                    </Link>
                                  </li>
                                ) : (
                                  <></>
                                )}
                                {userRole === "customer" ||
                                  (accessRights &&
                                    accessRights?.rights_manage_integration_settings ==
                                    1) ? (
                                  <li>
                                    <Link
                                      onClick={() => {
                                        setParkingManagement(false);
                                        setReplayPlayback(false);
                                        isMobile
                                          ? setSidebar(false)
                                          : setSidebar(true);
                                      }}
                                      to="/IntegrationSetting"
                                      className={
                                        currentRoute === "/IntegrationSetting" &&
                                        "activeColorBrown"
                                      }
                                    >
                                      {t("Integration Settings")}
                                    </Link>
                                  </li>
                                ) : (
                                  <></>
                                )}
                                {userRole === "customer" ||
                                  (accessRights &&
                                    accessRights?.rights_manage_transportation_settings ==
                                    1) ? (
                                  <li>
                                    <Link
                                      onClick={() => {
                                        setParkingManagement(false);
                                        isMobile
                                          ? setSidebar(false)
                                          : setSidebar(true);
                                      }}
                                      to="/TransportationSetting"
                                      className={
                                        currentRoute === "/TransportationSetting" &&
                                        "activeColorBrown"
                                      }
                                    >
                                      {t("Transportation Settings")}
                                    </Link>
                                  </li>
                                ) : (
                                  <></>
                                )}
                                {userRole === "customer" ||
                                  (accessRights &&
                                    accessRights.rights_manage_notification_settings ==
                                    1) ? (
                                  <li>
                                    <Link
                                      onClick={() => {
                                        setParkingManagement(false);
                                        setReplayPlayback(false);
                                        isMobile
                                          ? setSidebar(false)
                                          : setSidebar(true);
                                      }}
                                      to="/NotificationSetting"
                                      className={
                                        currentRoute === "/NotificationSetting" &&
                                        "activeColorBrown"
                                      }
                                    >
                                      {t("Notification Settings")}
                                    </Link>
                                  </li>
                                ) : (
                                  <></>
                                )}
                                {(userRole === "customer" &&
                                  addonSettingData["addon_dispatch"] == 1) ||
                                  (addonSettingData["addon_dispatch"] == 1 &&
                                    accessRights.rights_manage_dispatch_settings ==
                                    1) ? (
                                  <li>
                                    <Link
                                      onClick={() => {
                                        setParkingManagement(false);
                                        isMobile
                                          ? setSidebar(false)
                                          : setSidebar(true);
                                      }}
                                      to="/DispatchSetting"
                                      className={
                                        currentRoute === "/DispatchSetting" &&
                                        "activeColorBrown"
                                      }
                                    >
                                      {t("Dispatch Settings")}
                                    </Link>
                                  </li>
                                ) : (
                                  <></>
                                )}

                                {temporaryHide &&
                                  addonSettingData["addon_vehicle_inspection"] ==
                                  1 && (
                                    <li>
                                      <Link
                                        onClick={() => {
                                          setParkingManagement(false);
                                          isMobile
                                            ? setSidebar(false)
                                            : setSidebar(true);
                                        }}
                                        to="/VehicleInspectionSettings"
                                        className={
                                          currentRoute ===
                                          "/VehicleInspectionSettings" &&
                                          "activeColorBrown"
                                        }
                                      >
                                        {t("Inspection Settings")}
                                      </Link>
                                    </li>
                                  )}
                                {
                                  // ||  accessRights?.rights_manage_access_rights==1
                                  //  (
                                  userRoleCustomer === "customer" && (
                                    // (
                                    //   accessRights?.rights_manage_access_rights==1)
                                    //   )
                                    // &&
                                    <>
                                      <li>
                                        <Link
                                          onClick={() => {
                                            setParkingManagement(false);
                                            setReplayPlayback(false);
                                            isMobile
                                              ? setSidebar(false)
                                              : setSidebar(true);
                                          }}
                                          to="/AccessRight"
                                          className={
                                            (currentRoute === "/AccessRight" ||
                                              currentRoute === "/UserRole") &&
                                            "activeColorBrown"
                                          }
                                        >
                                          {t("Access Rights")}
                                        </Link>
                                      </li>
                                    </>
                                  )
                                }
                                {userRole === "customer" ||
                                  (accessRights &&
                                    accessRights.rights_view_addon_settings == 1) ? (
                                  <li>
                                    <Link
                                      onClick={() => {
                                        setParkingManagement(false);
                                        isMobile
                                          ? setSidebar(false)
                                          : setSidebar(true);
                                      }}
                                      to="/AddOnSettings"
                                      className={
                                        currentRoute === "/AddOnSettings" ||
                                          currentRoute === "/AddOnSettingsCart"
                                          ? "activeColorBrown"
                                          : ""
                                      }
                                    >
                                      {t("Addon Settings")}
                                    </Link>
                                  </li>
                                ) : (
                                  <></>
                                )}

                                {(userRole === "customer" &&
                                  temporaryHide &&
                                  addonSettingData?.addon_driver_assessment) ||
                                  (addonSettingData?.addon_driver_assessment == 1 &&
                                    temporaryHide &&
                                    accessRights &&
                                    accessRights?.rights_view_log_changes_settings ==
                                    1) ? (
                                  <li>
                                    <Link
                                      onClick={() => {
                                        setParkingManagement(false);
                                        isMobile
                                          ? setSidebar(false)
                                          : setSidebar(true);
                                      }}
                                      to="/LogChanges"
                                      className={
                                        currentRoute === "/LogChanges"
                                          ? "activeColorBrown"
                                          : ""
                                      }
                                    >
                                      {t("Log Changes")}
                                    </Link>
                                  </li>
                                ) : (
                                  <></>
                                )}

                                {/*  {(userRole === "customer" &&
                              temporaryHide && addonSettingData?.addon_driver_assessment == 1) ||
                              (temporaryHide && accessRights &&
                                accessRights?.rights_view_log_changes_settings == 1 &&
                                addonSettingData?.addon_driver_assessment == 1) ? (
                              <li>
                                <Link
                                  onClick={() => {
                                    setParkingManagement(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  to="/AvailableVehicleList"
                                  className={
                                    currentRoute === "/AvailableVehicleList"
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                >
                                  {t("Driver Availability")}
                                </Link>
                              </li>
                            ) : (
                              <></>
                            )} */}
                                {(userRole === "customer" &&
                                  temporaryHide &&
                                  addonSettingData?.addon_driver_assessment == 1) ||
                                  (temporaryHide &&
                                    accessRights &&
                                    accessRights?.rights_view_log_changes_settings ==
                                    1 &&
                                    addonSettingData?.addon_driver_assessment ==
                                    1) ? (
                                  <li>
                                    <Link
                                      onClick={() => {
                                        setParkingManagement(false);
                                        isMobile
                                          ? setSidebar(false)
                                          : setSidebar(true);
                                      }}
                                      to="/DriverDutyRoaster"
                                      className={
                                        currentRoute === "/DriverDutyRoaster"
                                          ? "activeColorBrown"
                                          : ""
                                      }
                                    >
                                      {t("Driver Duty Roaster")}
                                    </Link>
                                  </li>
                                ) : (
                                  <></>
                                )}
                              </ul>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      ) : null}
                    </>
                  }


                  {/* ================> Master Setting End <============== */}

                  {/* ================> Master Data Start <============== */}
                  <Accordion.Item eventKey="1">
                    {userRole === "customer" ||
                      (accessRights &&
                        (accessRights?.rights_view_vehicle ||
                          accessRights?.rights_view_vehicletype ||
                          accessRights?.rights_view_vehiclesync ||
                          accessRights?.rights_view_vehiclegroup ||
                          accessRights?.rights_view_hardware_feature_set ||
                          accessRights?.rights_view_holiday ||
                          accessRights?.rights_view_vacation ||
                          accessRights?.rights_view_vehicletype ||
                          accessRights?.rights_view_vacation ||
                          accessRights?.rights_view_parking_station ||
                          accessRights.rights_view_point_of_interest ||
                          accessRights?.rights_view_geofence_area)) ? (
                      <Accordion.Header>
                        <div
                          className="icon-menu-name"
                          onMouseOver={() => setMasterData1(true)}
                          onMouseOut={() => setMasterData1(false)}
                        >
                          <div className="icon-left">
                            {masterData === true ||
                              masterData1 === true ||
                              currentRoute === "/Vehicle" ||
                              currentRoute === "/Holidays" ||
                              currentRoute === "/Vacations" ||
                              currentRoute === "/EditVacation" ||
                              currentRoute === "/ParkingSlot" ||
                              currentRoute === "/AddHolidays" ||
                              currentRoute === "/EditHolidays" ||
                              currentRoute === "/AddVehicle" ||
                              currentRoute === "/AddVacation" ||
                              currentRoute === "/EditVacation" ||
                              currentRoute === "/AddParkingSlot" ||
                              currentRoute === "/EditParkingSlot" ||
                              currentRoute === "/AddPointOfInterest" ||
                              currentRoute === "/AddGeofenceArea" ||
                              currentRoute === "/AddVehicleCategory" ||
                              currentRoute === "/AddVehicleGroup" ||
                              currentRoute === "/NewSyncRequest" ||
                              currentRoute === "/PointOfIntrest" ||
                              currentRoute === "/VehicleDetails" ||
                              currentRoute === "/GeofenceAreas" ||
                              currentRoute.includes("/VehicleDetails") ||
                              currentRoute.includes("/AddVehicle") ||
                              currentRoute.includes("/AddHolidays") ||
                              currentRoute === "/EditGeofenceArea" ? (
                              <Link
                                to="/Vehicle"
                                onClick={() => {
                                  setDashboard1(false);
                                  setSidebar(true);
                                }}
                              >
                                <img src={data_icon_active} alt="" />
                              </Link>
                            ) : (
                              <Link
                                to="/Vehicle"
                                onClick={() => {
                                  setDashboard1(false);
                                  setSidebar(true);
                                }}
                              >
                                <img src={data_icon} alt="" />
                              </Link>
                            )}
                          </div>

                          <div
                            className={
                              masterData === true ||
                                masterData1 === true ||
                                currentRoute === "/Vehicle" ||
                                currentRoute === "/Holidays" ||
                                currentRoute === "/Vacations" ||
                                currentRoute === "/EditVacation" ||
                                currentRoute === "/ParkingSlot" ||
                                currentRoute === "/AddHolidays" ||
                                currentRoute === "/EditHolidays" ||
                                currentRoute === "/AddVehicle" ||
                                currentRoute === "/AddVacation" ||
                                currentRoute === "/EditVacation" ||
                                currentRoute === "/AddParkingSlot" ||
                                currentRoute === "/EditParkingSlot" ||
                                currentRoute === "/AddPointOfInterest" ||
                                currentRoute === "/AddGeofenceArea" ||
                                currentRoute === "/AddVehicleCategory" ||
                                currentRoute === "/AddVehicleGroup" ||
                                currentRoute === "/NewSyncRequest" ||
                                currentRoute === "/PointOfIntrest" ||
                                currentRoute === "/VehicleDetails" ||
                                currentRoute === "/GeofenceAreas" ||
                                currentRoute === "/EditGeofenceArea" ||
                                currentRoute.includes("/VehicleDetails") ||
                                currentRoute.includes("/AddVehicle") ||
                                currentRoute.includes("/AddHolidays")
                                ? "menu-name activeColorBrown"
                                : "menu-name"
                            }
                          >

                            {t("Master Data")}
                          </div>
                          {/* </Link> */}
                        </div>
                      </Accordion.Header>
                    ) : null}

                    <Accordion.Body>
                      <div className="sub-menus">
                        <ul className="actionnmenulist">

                          {addonSettingData.addon_ghatke == 1 ? <>
                            {(userRole === "customer" ||
                              accessRights?.rights_view_customer_profile ==
                              1) && (
                                <li>
                                  <Link
                                    onClick={() => {
                                      setParkingManagement(false);
                                      setReplayPlayback(false);
                                      isMobile
                                        ? setSidebar(false)
                                        : setSidebar(true);
                                    }}
                                    className={
                                      currentRoute === "/CustomerProfile" ||
                                        currentRoute === "/UpdateCustomerProfile" ||
                                        currentRoute === "/LogoUpdate" ||
                                        currentRoute === "/UpdateCustomerLogo"
                                        ? "activeColorBrown"
                                        : ""
                                    }
                                    to="/CustomerProfile"
                                  >
                                    {t("Customer Settings")}
                                  </Link>
                                </li>
                              )}
                          </> : <></>}



                          {userRole === "customer" ||
                            (accessRights && accessRights?.rights_view_vehicle) ||
                            accessRights?.rights_view_vehicletype ||
                            accessRights?.rights_view_vehiclesync ||
                            accessRights?.rights_view_vehiclegroup ||
                            accessRights?.rights_view_hardware_feature_set ? (
                            <li>
                              <Link
                                onClick={() => {
                                  setParkingManagement(false);
                                  setReplayPlayback(false);
                                  handleVeicleTab();
                                  // localStorage.setItem(
                                  //   "vehicleTabListActive",
                                  //   "vehicle"
                                  // );
                                  // setVehicleTabListActive("vehicle");
                                  isMobile
                                    ? setSidebar(false)
                                    : setSidebar(true);
                                }}
                                className={
                                  currentRoute === "/Vehicle" ||
                                    currentRoute === "/AddVehicle" ||
                                    currentRoute === "/AddVehicleCategory" ||
                                    currentRoute === "/AddVehicleGroup" ||
                                    currentRoute === "/NewSyncRequest" ||
                                    currentRoute === "/VehicleDetails" ||
                                    currentRoute.includes("/VehicleDetails") ||
                                    currentRoute.includes("/AddVehicle") ||
                                    currentRoute.includes("/AddHolidays")
                                    ? "activeColorBrown"
                                    : ""
                                }
                                to="/Vehicle"
                              >
                                {addonSettingData.addon_ghatke == 1 ? <> {t("Vehicles Master ")}</> : <> {t("Vehicles")}</>}


                              </Link>
                            </li>
                          ) : (
                            <></>
                          )}

                          {addonSettingData.addon_ghatke == 1 ? <>






                            {dynamicMaproute &&
                              dynamicMaproute?.map((item, index) => {
                                return (
                                  <div key={"test" + index}>
                                    <li>
                                      <Link
                                        onClick={() => {
                                          localStorage.setItem(
                                            "dynamicRole",
                                            item.role_name
                                          );
                                          localStorage.setItem(
                                            "dynamicRoleRoute",
                                            item.role_route
                                          );
                                          setParkingManagement(false);
                                          setReplayPlayback(false);
                                          isMobile
                                            ? setSidebar(false)
                                            : setSidebar(true);
                                        }}
                                        to={item.role_route}
                                        className={
                                          currentRoute === "/test" ||
                                            currentRoute ===
                                            "/AddDynamicUser" ||
                                            currentRoute ===
                                            "/EditTransportManager" ||
                                            currentRoute === "/ViewDynamic" ||
                                            currentRoute === "/DynamicPassword"
                                            ? "activeColorBrown"
                                            : ""
                                        }
                                      >
                                        {item.role_name == "dispatchexecutive" ? "Vehicle Attendent" : item.role_name}
                                      </Link>
                                    </li>
                                  </div>
                                );
                              })
                            }

                            {userRole === "customer" ||
                              (accessRights &&
                                accessRights?.rights_view_driver) ? (
                              <li>
                                <Link
                                  onClick={() => {
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  to="/Drivers"
                                  className={
                                    currentRoute === "/Drivers" ||
                                      currentRoute === "/ViewDrivers" ||
                                      currentRoute === "/AddDrivers" ||
                                      currentRoute === "/ChangeDriverPassword" ||
                                      currentRoute.includes("/ViewDrivers") ||
                                      currentRoute.includes("/AddDrivers")
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                >
                                  {t("Driver")}
                                </Link>
                              </li>
                            ) : (
                              <></>
                            )}


                          </> :

                            <></>

                          }







                          {userRole === "customer" ||
                            (accessRights &&
                              accessRights?.rights_view_holiday) ? (
                            <li>
                              <Link
                                onClick={() => {
                                  setParkingManagement(false);
                                  setReplayPlayback(false);
                                  isMobile
                                    ? setSidebar(false)
                                    : setSidebar(true);
                                }}
                                to="/Holidays"
                                className={
                                  currentRoute === "/Holidays" ||
                                    currentRoute === "/AddHolidays" ||
                                    currentRoute === "/EditHolidays"
                                    ? "activeColorBrown"
                                    : ""
                                }
                              >
                                {t("Holidays")}
                              </Link>
                            </li>
                          ) : (
                            <></>
                          )}

                          {userRole === "customer" ||
                            (accessRights &&
                              accessRights?.rights_view_vacation) ? (
                            <li>
                              <Link
                                onClick={() => {
                                  setParkingManagement(false);
                                  setReplayPlayback(false);
                                  isMobile
                                    ? setSidebar(false)
                                    : setSidebar(true);
                                }}
                                to="/Vacations"
                                className={
                                  currentRoute === "/Vacations" ||
                                    currentRoute === "/EditVacation" ||
                                    currentRoute === "/AddVacation"
                                    ? "activeColorBrown"
                                    : ""
                                }
                              >
                                {t("Vacations")}
                              </Link>
                            </li>
                          ) : (
                            <></>
                          )}

                          {userRole === "customer" ||
                            (accessRights &&
                              accessRights?.rights_view_parking_station) ? (
                            <li>
                              <Link
                                onClick={() => {
                                  setParkingManagement(false);
                                  setReplayPlayback(false);
                                  isMobile
                                    ? setSidebar(false)
                                    : setSidebar(true);
                                }}
                                to="/ParkingSlot"
                                className={
                                  currentRoute === "/ParkingSlot" ||
                                    currentRoute === "/AddParkingSlot" ||
                                    currentRoute === "/EditParkingSlot"
                                    ? "activeColorBrown"
                                    : ""
                                }
                              >
                                {t("Parking Station")}
                              </Link>
                            </li>
                          ) : (
                            <></>
                          )}

                          {userRole === "customer" ||
                            (accessRights &&
                              accessRights.rights_view_point_of_interest) ? (
                            <li>
                              <Link
                                onClick={() => {
                                  setParkingManagement(false);
                                  setReplayPlayback(false);
                                  isMobile
                                    ? setSidebar(false)
                                    : setSidebar(true);
                                }}
                                to="/PointOfIntrest"
                                className={
                                  currentRoute === "/PointOfIntrest" ||
                                    currentRoute === "/AddPointOfInterest" ||
                                    currentRoute === "/EditPointOfInterest"
                                    ? "activeColorBrown"
                                    : ""
                                }
                              >
                                {t("Point of Interest")}
                              </Link>
                            </li>
                          ) : (
                            <></>
                          )}

                          {userRole === "customer" ||
                            (accessRights &&
                              accessRights?.rights_view_geofence_area) ? (
                            <li>
                              <Link
                                onClick={() => {
                                  setParkingManagement(false);
                                  setReplayPlayback(false);
                                  isMobile
                                    ? setSidebar(false)
                                    : setSidebar(true);
                                }}
                                to="/GeofenceAreas"
                                className={
                                  currentRoute === "/GeofenceAreas" ||
                                    currentRoute === "/AddGeofenceArea" ||
                                    currentRoute === "/EditGeofenceArea"
                                    ? "activeColorBrown"
                                    : ""
                                }
                              >
                                {t("Geofence Areas")}
                              </Link>
                            </li>
                          ) : (
                            <></>
                          )}
                        </ul>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* ================> Master Data End <============== */}

                  {/* ================> Users Start <============== */}


                  {addonSettingData.addon_ghatke == 1 ? <></> :
                    <>

                      <Accordion.Item eventKey="2">
                        {userRole === "customer" ||
                          dyanamicView ||
                          accessRights?.rights_view_admin ||
                          accessRights?.rights_view_tm ||
                          accessRights?.rights_view_driver ||
                          (addonSettingData?.addon_dispatch == 1 &&
                            accessRights?.rights_view_helper) ||
                          (addonSettingData?.addon_fleetmanager_role == 1 &&
                            accessRights?.rights_view_fleet_manager) ||
                          (addonSettingData.addon_busassistant_role == 1 &&
                            accessRights?.rights_view_vehicle_assistants) ? (
                          <Accordion.Header>
                            <div
                              className="icon-menu-name"
                              onMouseOver={() => setUsers1(true)}
                              onMouseOut={() => setUsers1(false)}
                            >
                              <div className="icon-left">
                                {Users === true ||
                                  Users1 === true ||
                                  currentRoute === "/administrator" ||
                                  currentRoute === "/TransportManager" ||
                                  currentRoute === "/Drivers" ||
                                  // addonSettingData["addon_dispatch"]==1&&currentRoute === '/DeliveryPerson' ||
                                  currentRoute === "/view" ||
                                  (addonSettingData.addon_fleetmanager_role == 1 &&
                                    (currentRoute === "/FleetManager" ||
                                      currentRoute === "/AddFleetManager" ||
                                      currentRoute === "/ViewFleetManager")) ||
                                  currentRoute === "/VehicleAssistants" ||
                                  currentRoute === "/AddTransportManager" ||
                                  currentRoute === "/EditTransportManager" ||
                                  currentRoute === "/ViewTransportManager" ||
                                  currentRoute === "/ChangePassword" ||
                                  currentRoute === "/ViewDrivers" ||
                                  currentRoute === "/AddDrivers" ||
                                  currentRoute === "/ChangeDriverPassword" ||
                                  // addonSettingData["addon_dispatch"]==1&& currentRoute === '/ViewDeliveryPerson' ||
                                  // addonSettingData["addon_dispatch"]==1&&   currentRoute === '/AddDeliveryPerson' ||
                                  (addonSettingData?.addon_dispatch == 1 &&
                                    (currentRoute === "/ViewDeliveryPerson" ||
                                      currentRoute === "/AddDeliveryPerson" ||
                                      currentRoute === "/DeliveryPerson" ||
                                      currentRoute === "/ChangePassDelivery")) ||
                                  currentRoute === "/ChangeFleetPass" ||
                                  currentRoute === "/VehicleAssistants" ||
                                  currentRoute === "/AddVehicleAssistants" ||
                                  currentRoute === "/ViewVehicleAssistants" ||
                                  currentRoute === "/UserDashboard" ||
                                  currentRoute === "/UserAlert" ||
                                  currentRoute === "/ChangeDelPass" ||
                                  currentRoute.includes("/view") ||
                                  currentRoute.includes("/ViewTransportManager") ||
                                  currentRoute.includes("/AddTransportManager") ||
                                  currentRoute.includes("/ChangePassword") ||
                                  currentRoute.includes("/EditProfile") ||
                                  currentRoute.includes("/MyProfile") ||
                                  currentRoute.includes("/user-tester") ||
                                  currentRoute.includes("/ViewDrivers") ||
                                  currentRoute.includes("/AddDrivers") ||
                                  currentRoute.includes("/ViewDeliveryPerson") ||
                                  currentRoute.includes("/AddDeliveryPerson") ||
                                  currentRoute.includes("/ViewFleetManager") ||
                                  currentRoute.includes("/AddFleetManager") ||
                                  currentRoute.includes(
                                    "/ViewVehicleAssistants"
                                  ) ? (
                                  <Link
                                    to="/administrator"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img src={user_icon_active} alt="" />
                                  </Link>
                                ) : (
                                  <Link
                                    to="/administrator"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img src={user_icon} alt="" />
                                  </Link>
                                )}
                              </div>

                              <div
                                className={
                                  Users === true ||
                                    Users1 === true ||
                                    currentRoute === "/administrator" ||
                                    currentRoute === "/TransportManager" ||
                                    currentRoute === "/Drivers" ||
                                    currentRoute === "/DeliveryPerson" ||
                                    currentRoute === "/view" ||
                                    currentRoute === "/FleetManager" ||
                                    currentRoute === "/VehicleAssistants" ||
                                    currentRoute === "/AddTransportManager" ||
                                    currentRoute === "/EditTransportManager" ||
                                    currentRoute === "/ViewTransportManager" ||
                                    currentRoute === "/ChangePassword" ||
                                    currentRoute === "/ViewDrivers" ||
                                    currentRoute === "/AddDrivers" ||
                                    currentRoute === "/ChangeDriverPassword" ||
                                    currentRoute === "/ViewDeliveryPerson" ||
                                    currentRoute === "/AddDeliveryPerson" ||
                                    currentRoute === "/ChangePassDelivery" ||
                                    currentRoute === "/ChangeFleetPass" ||
                                    currentRoute === "/ViewFleetManager" ||
                                    currentRoute === "/AddFleetManager" ||
                                    currentRoute === "/VehicleAssistants" ||
                                    currentRoute === "/AddVehicleAssistants" ||
                                    currentRoute === "/ViewVehicleAssistants" ||
                                    currentRoute === "/UserDashboard" ||
                                    currentRoute === "/UserAlert" ||
                                    currentRoute === "/ChangeDelPass" ||
                                    currentRoute.includes("/view") ||
                                    currentRoute.includes(
                                      "/ViewTransportManager"
                                    ) ||
                                    currentRoute.includes("/AddTransportManager") ||
                                    currentRoute.includes("/ChangePassword") ||
                                    currentRoute.includes("/EditProfile") ||
                                    currentRoute.includes("/MyProfile") ||
                                    currentRoute.includes("/user-tester") ||
                                    currentRoute.includes("/ViewDrivers") ||
                                    currentRoute.includes("/AddDrivers") ||
                                    currentRoute.includes("/ViewDeliveryPerson") ||
                                    currentRoute.includes("/AddDeliveryPerson") ||
                                    currentRoute.includes("/ViewFleetManager") ||
                                    currentRoute.includes("/AddFleetManager") ||
                                    currentRoute.includes("/ViewVehicleAssistants")
                                    ? "menu-name activeColorBrown"
                                    : "menu-name"
                                }
                              >
                                {userRole === "customer" ||
                                  (accessRights &&
                                    accessRights?.rights_view_admin) ? (
                                  <>  {t("Users")}</>

                                ) : (
                                  <>
                                    <> Users management</>

                                  </>
                                )}
                              </div>
                            </div>
                          </Accordion.Header>
                        ) : null}

                        <Accordion.Body>
                          <div className="sub-menus">
                            <ul className="actionnmenulist">
                              {userRole === "customer" ||
                                (accessRights &&
                                  accessRights?.rights_view_admin) ? (
                                <li>
                                  <Link
                                    onClick={() => {
                                      setParkingManagement(false);
                                      setReplayPlayback(false);
                                      isMobile
                                        ? setSidebar(false)
                                        : setSidebar(true);
                                    }}
                                    className={
                                      currentRoute === "/administrator" ||
                                        currentRoute === "/view" ||
                                        currentRoute.includes("/view")
                                        ? "activeColorBrown"
                                        : ""
                                    }
                                    to="/administrator"
                                  >
                                    {t("Administrator")}
                                  </Link>
                                </li>
                              ) : (
                                <></>
                              )}

                              {userRole === "customer" ||
                                (accessRights && accessRights?.rights_view_tm) ? (
                                <li>
                                  <Link
                                    onClick={() => {
                                      setParkingManagement(false);
                                      setReplayPlayback(false);
                                      isMobile
                                        ? setSidebar(false)
                                        : setSidebar(true);
                                    }}
                                    to="/TransportManager"
                                    className={
                                      currentRoute === "/TransportManager" ||
                                        currentRoute === "/AddTransportManager" ||
                                        currentRoute === "/EditTransportManager" ||
                                        currentRoute === "/ViewTransportManager" ||
                                        currentRoute === "/ChangePassword" ||
                                        currentRoute.includes(
                                          "/ViewTransportManager"
                                        ) ||
                                        currentRoute.includes(
                                          "/AddTransportManager"
                                        ) ||
                                        currentRoute.includes("/ChangePassword") ||
                                        currentRoute.includes("/EditProfile") ||
                                        currentRoute.includes("/MyProfile")
                                        ? "activeColorBrown"
                                        : ""
                                    }
                                  >
                                    {t("Transport Manager")}
                                  </Link>
                                </li>
                              ) : (
                                <></>
                              )}

                              {
                                // (userRole === "customer" )?
                                dynamicMaproute &&
                                dynamicMaproute?.map((item, index) => {
                                  return (
                                    <div key={"test" + index}>
                                      <li>
                                        <Link
                                          onClick={() => {
                                            localStorage.setItem(
                                              "dynamicRole",
                                              item.role_name
                                            );
                                            localStorage.setItem(
                                              "dynamicRoleRoute",
                                              item.role_route
                                            );
                                            setParkingManagement(false);
                                            setReplayPlayback(false);
                                            isMobile
                                              ? setSidebar(false)
                                              : setSidebar(true);
                                          }}
                                          to={item.role_route}
                                          className={
                                            currentRoute === "/test" ||
                                              currentRoute ===
                                              "/AddDynamicUser" ||
                                              currentRoute ===
                                              "/EditTransportManager" ||
                                              currentRoute === "/ViewDynamic" ||
                                              currentRoute === "/DynamicPassword"
                                              ? "activeColorBrown"
                                              : ""
                                          }
                                        >
                                          {item.role_name}
                                        </Link>
                                      </li>
                                    </div>
                                  );
                                })
                                // :<></>
                              }
                              {userRole === "customer" ||
                                (accessRights &&
                                  accessRights?.rights_view_driver) ? (
                                <li>
                                  <Link
                                    onClick={() => {
                                      setParkingManagement(false);
                                      setReplayPlayback(false);
                                      isMobile
                                        ? setSidebar(false)
                                        : setSidebar(true);
                                    }}
                                    to="/Drivers"
                                    className={
                                      currentRoute === "/Drivers" ||
                                        currentRoute === "/ViewDrivers" ||
                                        currentRoute === "/AddDrivers" ||
                                        currentRoute === "/ChangeDriverPassword" ||
                                        currentRoute.includes("/ViewDrivers") ||
                                        currentRoute.includes("/AddDrivers")
                                        ? "activeColorBrown"
                                        : ""
                                    }
                                  >
                                    {t("Drivers")}
                                  </Link>
                                </li>
                              ) : (
                                <></>
                              )}

                              {(userRole === "customer" &&
                                addonSettingData?.addon_dispatch == 1) ||
                                (addonSettingData?.addon_dispatch == 1 &&
                                  accessRights?.rights_view_helper) ? (
                                <>
                                  <li>
                                    <Link
                                      onClick={() => {
                                        setParkingManagement(false);
                                        setReplayPlayback(false);
                                        isMobile
                                          ? setSidebar(false)
                                          : setSidebar(true);
                                      }}
                                      to="/DeliveryPerson"
                                      className={
                                        currentRoute === "/DeliveryPerson" ||
                                          currentRoute === "/ViewDeliveryPerson" ||
                                          currentRoute === "/AddDeliveryPerson" ||
                                          currentRoute === "/ChangePassDelivery" ||
                                          currentRoute.includes(
                                            "/ViewDeliveryPerson"
                                          ) ||
                                          currentRoute.includes(
                                            "/AddDeliveryPerson"
                                          )
                                          ? "activeColorBrown"
                                          : ""
                                      }
                                    >
                                      {t("Delivery Person")}
                                    </Link>
                                  </li>
                                </>
                              ) : (
                                <></>
                              )}

                              {(userRole === "customer" &&
                                addonSettingData?.addon_fleetmanager_role == 1) ||
                                (addonSettingData?.addon_fleetmanager_role == 1 &&
                                  accessRights &&
                                  accessRights?.rights_view_fleet_manager) ? (
                                <li>
                                  <Link
                                    onClick={() => {
                                      setParkingManagement(false);
                                      setReplayPlayback(false);
                                      isMobile
                                        ? setSidebar(false)
                                        : setSidebar(true);
                                    }}
                                    to="/FleetManager"
                                    className={
                                      currentRoute === "/FleetManager" ||
                                        currentRoute === "/ChangeFleetPass" ||
                                        currentRoute === "/ViewFleetManager" ||
                                        currentRoute === "/AddFleetManager" ||
                                        currentRoute.includes(
                                          "/ViewFleetManager"
                                        ) ||
                                        currentRoute.includes("/AddFleetManager")
                                        ? "activeColorBrown"
                                        : ""
                                    }
                                  >
                                    {t("Fleet Manager")}
                                  </Link>
                                </li>
                              ) : null}

                              {(userRole === "customer" &&
                                addonSettingData["addon_busassistant_role"] ==
                                1) ||
                                (addonSettingData["addon_busassistant_role"] == 1 &&
                                  accessRights &&
                                  accessRights?.rights_view_vehicle_assistants) ? (
                                <li>
                                  <Link
                                    onClick={() => {
                                      setParkingManagement(false);
                                      setReplayPlayback(false);
                                      isMobile
                                        ? setSidebar(false)
                                        : setSidebar(true);
                                    }}
                                    to="/VehicleAssistants"
                                    className={
                                      currentRoute === "/VehicleAssistants" ||
                                        currentRoute === "/AddVehicleAssistants" ||
                                        currentRoute === "/ViewVehicleAssistants" ||
                                        currentRoute === "/ChangeDelPass" ||
                                        currentRoute.includes(
                                          "/ViewVehicleAssistants"
                                        ) ||
                                        currentRoute.includes(
                                          "/AddVehicleAssistants"
                                        )
                                        ? "activeColorBrown"
                                        : ""
                                    }
                                  >
                                    {t("Vehicle Assistants")}
                                  </Link>
                                </li>
                              ) : (
                                <></>
                              )}
                              {temporaryHide && (
                                <li>
                                  <Link
                                    onClick={() => {
                                      setParkingManagement(false);
                                      setReplayPlayback(false);
                                      isMobile
                                        ? setSidebar(false)
                                        : setSidebar(true);
                                    }}
                                    to="/UserDashboard"
                                    className={
                                      currentRoute === "/UserDashboard" ||
                                        currentRoute === "/UserAlert"
                                        ? "activeColorBrown"
                                        : ""
                                    }
                                  >
                                    {t("User's Insight")}
                                  </Link>
                                </li>
                              )}
                            </ul>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  }





                  {/* ================> Users End <============== */}

                  {/* ================> New User Start <============== */}

                  {accessRights &&
                    temporaryHide &&
                    accessRights?.rights_view_report_distribution ? (
                    <Accordion.Item eventKey="8" id="single_accordian_item">
                      <Accordion.Header>
                        <div className="menus-items">
                          <Link
                            to="/AllUsers"
                            className="icon-menu-name"
                            onMouseOver={() => setNewUser1(true)}
                            onMouseOut={() => setNewUser1(false)}
                            onClick={() => {
                              setCommunication(false);
                              setTripManagement(false);
                              setParkingManagement(false);
                              setReplayPlayback(false);
                              setDispatchManagement(false);
                              setPayment(false);
                              setUsers(false);
                              setVehicleExpenses(false);
                              setMasterData(false);
                              setMasterSetting(false);
                              isMobile ? setSidebar(false) : setSidebar(true);
                            }}
                          >
                            <div className="icon-left">
                              {NewUser1 === true ||
                                currentRoute === "/AllUsers" ||
                                currentRoute === "/CreateUser" ||
                                currentRoute ===
                                "/ReportDistributionContactsDetails" ||
                                currentRoute === "/EditUser" ? (
                                <img src={Report_Distribution_active} alt="" />
                              ) : (
                                <img src={Report_Distribution} alt="" />
                              )}
                            </div>
                            <div
                              className={
                                NewUser1 === true ||
                                  currentRoute === "/AllUsers" ||
                                  currentRoute === "/CreateUser" ||
                                  currentRoute ===
                                  "/ReportDistributionContactsDetails" ||
                                  currentRoute === "/EditUser"
                                  ? "menu-name activeColorBrown"
                                  : "menu-name"
                              }
                            >
                              {t("Report Distribution")}
                            </div>
                          </Link>
                        </div>
                      </Accordion.Header>
                    </Accordion.Item>
                  ) : null}

                  {/* ================> New User End <============== */}
                  {userRole === "customer" ||
                    (accessRights &&
                      accessRights?.rights_view_hardware_feature_set) ? (
                    <Accordion.Item eventKey="15" id="single_accordian_item">
                      <Accordion.Header>
                        <div className="menus-items">
                          <Link
                            to="/FeatureSet"
                            className="icon-menu-name"
                            onMouseOver={() => setFeatureSet1(true)}
                            onMouseOut={() => setFeatureSet1(false)}
                            onClick={() => {
                              setCommunication(false);
                              setTripManagement(false);
                              setParkingManagement(false);
                              setReplayPlayback(false);
                              setDispatchManagement(false);
                              setPayment(false);
                              setUsers(false);
                              setVehicleExpenses(false);
                              setMasterData(false);
                              setMasterSetting(false);
                              isMobile ? setSidebar(false) : setSidebar(true);
                            }}
                          >
                            <div className="icon-left">
                              {featureSet1 === true ||
                                currentRoute === "/FeatureSet" ? (
                                <img src={Feture_set_active} alt="" />
                              ) : (
                                <img src={Feture_set} alt="" />
                              )}
                            </div>
                            <div
                              className={
                                featureSet1 === true ||
                                  currentRoute === "/FeatureSet"
                                  ? "menu-name activeColorBrown"
                                  : "menu-name"
                              }
                            >
                              {t("Hardware Feature Set")}
                            </div>
                          </Link>
                        </div>
                      </Accordion.Header>
                    </Accordion.Item>
                  ) : null}

                  {/* ================> Trip Management Start <============== */}

                  {userRole === "customer" ||
                    (accessRights && accessRights.rights_view_trips) ? (
                    <Accordion.Item eventKey="9">
                      <Accordion.Header>
                        <div className="menus-items">
                          <Link
                            to="#"
                            className="icon-menu-name"
                            onMouseOver={() => setTripManagement1(true)}
                            onMouseOut={() => setTripManagement1(false)}
                            onClick={() => {
                              setCommunication(false);
                              setParkingManagement(false);
                              setReplayPlayback(false);
                              setDispatchManagement(false);
                              setPayment(false);
                              setUsers(false);
                              setVehicleExpenses(false);
                              setMasterData(false);
                              setMasterSetting(false);
                              isMobile ? setSidebar(false) : setSidebar(true);
                            }}
                          >
                            <div className="icon-left">
                              {TripManagement1 === true ||
                                currentRoute === "/TripManagement" ||
                                currentRoute === "/ViewDispatchTrip" ||
                                currentRoute === "/ViewStop" ||
                                currentRoute === "/EditStop" ||
                                currentRoute === "/EditDispatchTrip" ||
                                currentRoute.includes("/ViewDispatchTrip") ||
                                currentRoute.includes("/EditDispatchTrip") ? (
                                <img src={trip_icon_active} alt="" />
                              ) : (
                                <img src={trip_icon} alt="" />
                              )}
                            </div>
                            <div
                              className={
                                TripManagement1 === true ||
                                  currentRoute === "/TripManagement" ||
                                  currentRoute === "/ViewDispatchTrip" ||
                                  currentRoute === "/ViewStop" ||
                                  currentRoute === "/EditStop" ||
                                  currentRoute === "/EditDispatchTrip" ||
                                  currentRoute.includes("/ViewDispatchTrip") ||
                                  currentRoute.includes("/EditDispatchTrip")
                                  ? "menu-name activeColorBrown"
                                  : "menu-name"
                              }
                            >
                              {t("Trip Management")}
                            </div>
                          </Link>
                        </div>
                      </Accordion.Header>

                      <Accordion.Body>
                        <div className="sub-menus">
                          <ul className="actionnmenulist">


                            <li>
                              <Link
                                onClick={() => {
                                  setParkingManagement(false);
                                  isMobile
                                    ? setSidebar(false)
                                    : setSidebar(true);
                                }}
                                to="/TripManagement"
                                className={
                                  currentRoute === "/TripManagement"
                                    ? "activeColorBrown"
                                    : ""
                                }
                              >
                                {t("Trip")}
                              </Link>
                            </li>
                            {accessRights && accessRights.rights_vehicle_availability ||
                              (accessRights && accessRights.rights_driver_availability) ? (
                              <>
                                <li>
                                  <Link
                                    onClick={() => {
                                      setParkingManagement(false);
                                      isMobile
                                        ? setSidebar(false)
                                        : setSidebar(true);
                                    }}
                                    to="/VehicleAvailability"
                                    className={
                                      currentRoute === "/VehicleAvailability"
                                        ? "activeColorBrown"
                                        : ""
                                    }
                                  >
                                    {t("Vehicle Availability")}
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    onClick={() => {
                                      setParkingManagement(false);
                                      isMobile
                                        ? setSidebar(false)
                                        : setSidebar(true);
                                    }}
                                    to="/AvailableVehicleList"
                                    className={
                                      currentRoute === "/AvailableVehicleList"
                                        ? "activeColorBrown"
                                        : ""
                                    }
                                  >
                                    {t("Driver Availability")}
                                  </Link>
                                </li>
                              </>
                            ) :

                              <></>
                            }


                            {/* <li>
                              <Link
                                onClick={() => {
                                  setParkingManagement(false);
                                  isMobile
                                    ? setSidebar(false)
                                    : setSidebar(true);
                                }}
                                to="#"
                                className={
                                  currentRoute === "/UnplannedTripsAutorouting"
                                    ? "activeColorBrown"
                                    : ""
                                }
                              >
                                {t("Find Nearest Vehicle")}
                              </Link>
                            </li>*/}
                          </ul>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ) : null}

                  {/* ================> Trip Management End <============== */}

                  {/* ================> Vehicle Expense Start <============== */}

                  {addonSettingData["addon_vehicle_expense"] == 1 && (
                    <Accordion.Item eventKey="3">
                      {userRole === "customer" ||
                        (accessRights &&
                          (accessRights?.rights_view_accident ||
                            accessRights?.rights_view_accessory ||
                            accessRights?.rights_view_spare_parts ||
                            accessRights?.rights_view_fine ||
                            accessRights?.rights_view_vehicle_maintainance ||
                            accessRights?.rights_view_fuel_expenses)) ? (
                        <Accordion.Header>
                          <div
                            className="icon-menu-name"
                            onMouseOver={() => setVehicleExpenses1(true)}
                            onMouseOut={() => setVehicleExpenses1(false)}
                          >
                            <div className="icon-left">
                              {VehicleExpenses1 === true ||
                                currentRoute === "/VehicleAccident" ||
                                currentRoute === "/VehicleAccesory" ||
                                currentRoute === "/VehicleSpareParts" ||
                                currentRoute === "/AddVehicleAccident" ||
                                currentRoute === "/EditVehicleAccident" ||
                                currentRoute === "/ViewVehicleAccident" ||
                                currentRoute === "/VehicleAccesory" ||
                                currentRoute === "/AddVehicleAccesory" ||
                                currentRoute === "/ViewVehicleAccesory" ||
                                currentRoute === "/VehicleSpareParts" ||
                                currentRoute === "/AddVehicleSpareParts" ||
                                currentRoute === "/EditVehicleSpareParts" ||
                                currentRoute === "/ViewVehicleSpareParts" ||
                                currentRoute === "/VehicleFine" ||
                                currentRoute === "/AddVehicleFine" ||
                                currentRoute === "/ViewVehicleFine" ||
                                currentRoute === "/EditVehicleFine" ||
                                currentRoute === "/VehicleMaintenance" ||
                                currentRoute === "/AddVehicleMaintenance" ||
                                currentRoute === "/ViewVehicleMaintenance" ||
                                currentRoute === "/EditVehicleMaintenance" ||
                                currentRoute === "/FuelExpenses" ||
                                currentRoute === "/AddFuelExpenses" ||
                                currentRoute === "/ViewFuelExpenses" ||
                                currentRoute === "/EditFuelExpenses" ||
                                currentRoute.includes("/ViewVehicleAccident") ||
                                currentRoute.includes("/AddVehicleAccident") ||
                                currentRoute.includes("/ViewVehicleAccesory") ||
                                currentRoute.includes("/AddVehicleAccesory") ||
                                currentRoute.includes("/ViewVehicleSpareParts") ||
                                currentRoute.includes("/AddVehicleSpareParts") ||
                                currentRoute.includes("/ViewVehicleFine") ||
                                currentRoute.includes("/AddVehicleFine") ||
                                currentRoute.includes("/ViewVehicleMaintenance") ||
                                currentRoute.includes("/AddVehicleMaintenance") ||
                                currentRoute.includes("/ViewFuelExpenses") ||
                                currentRoute.includes("/AddFuelExpenses")

                                ? (
                                  <Link
                                    to="/VehicleAccident"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img src={vehicle_ex_icon_active} alt="" />
                                  </Link>
                                ) : (
                                  <Link
                                    to="/VehicleAccident"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img src={vehicle_ex_icon} alt="" />
                                  </Link>
                                )}
                            </div>

                            <div
                              className={
                                VehicleExpenses1 === true ||
                                  currentRoute === "/VehicleAccident" ||
                                  currentRoute === "/VehicleAccesory" ||
                                  currentRoute === "/VehicleSpareParts" ||
                                  currentRoute === "/AddVehicleAccident" ||
                                  currentRoute === "/EditVehicleAccident" ||
                                  currentRoute === "/ViewVehicleAccident" ||
                                  currentRoute === "/VehicleAccesory" ||
                                  currentRoute === "/AddVehicleAccesory" ||
                                  currentRoute === "/ViewVehicleAccesory" ||
                                  currentRoute === "/VehicleSpareParts" ||
                                  currentRoute === "/AddVehicleSpareParts" ||
                                  currentRoute === "/EditVehicleSpareParts" ||
                                  currentRoute === "/ViewVehicleSpareParts" ||
                                  currentRoute === "/VehicleFine" ||
                                  currentRoute === "/AddVehicleFine" ||
                                  currentRoute === "/ViewVehicleFine" ||
                                  currentRoute === "/EditVehicleFine" ||
                                  currentRoute === "/VehicleMaintenance" ||
                                  currentRoute === "/AddVehicleMaintenance" ||
                                  currentRoute === "/ViewVehicleMaintenance" ||
                                  currentRoute === "/EditVehicleMaintenance" ||
                                  currentRoute === "/FuelExpenses" ||
                                  currentRoute === "/AddFuelExpenses" ||
                                  currentRoute === "/ViewFuelExpenses" ||
                                  currentRoute === "/EditFuelExpenses" ||
                                  currentRoute.includes("/ViewVehicleAccident") ||
                                  currentRoute.includes("/AddVehicleAccident") ||
                                  currentRoute.includes("/AddVehicleAccesory") ||
                                  currentRoute.includes("/ViewVehicleSpareParts") ||
                                  currentRoute.includes("/AddVehicleSpareParts") ||
                                  currentRoute.includes("/ViewVehicleFine") ||
                                  currentRoute.includes("/AddVehicleFine") ||
                                  currentRoute.includes("/ViewVehicleMaintenance") ||
                                  currentRoute.includes("/AddVehicleMaintenance") ||
                                  currentRoute.includes("/ViewFuelExpenses") ||
                                  currentRoute.includes("/AddFuelExpenses")
                                  ? "menu-name activeColorBrown"
                                  : "menu-name"
                              }
                            >
                              {t("Vehicle Expenses")}
                            </div>
                          </div>
                        </Accordion.Header>
                      ) : null}

                      <Accordion.Body>
                        <div className="sub-menus">
                          <ul className="actionnmenulist">
                            {userRole === "customer" ||
                              (accessRights &&
                                accessRights.rights_view_accident) ? (
                              <li>
                                <Link
                                  onClick={() => {
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  className={
                                    currentRoute === "/VehicleAccident" ||
                                      currentRoute === "/AddVehicleAccident" ||
                                      currentRoute === "/EditVehicleAccident" ||
                                      currentRoute === "/ViewVehicleAccident" ||
                                      currentRoute.includes("/ViewVehicleAccident") ||
                                      currentRoute.includes("/AddVehicleAccident")
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                  to="/VehicleAccident"
                                >
                                  {t("Vehicle Accident")}
                                </Link>
                              </li>
                            ) : null}
                            {userRole === "customer" ||
                              (accessRights &&
                                accessRights.rights_view_accessory) ? (
                              <li>
                                <Link
                                  onClick={() => {
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  to="/VehicleAccesory"
                                  className={
                                    currentRoute === "/VehicleAccesory" ||
                                      currentRoute === "/AddVehicleAccesory" ||
                                      currentRoute === "/ViewVehicleAccesory" ||
                                      currentRoute.includes("/ViewVehicleAccesory") ||
                                      currentRoute.includes("/AddVehicleAccesory")
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                >
                                  {t("Vehicle Accessory")}
                                </Link>
                              </li>
                            ) : null}
                            {userRole === "customer" ||
                              (accessRights &&
                                accessRights?.rights_view_spare_parts) ? (
                              <li>
                                <Link
                                  onClick={() => {
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  to="/VehicleSpareParts"
                                  className={
                                    currentRoute === "/VehicleSpareParts" ||
                                      currentRoute === "/AddVehicleSpareParts" ||
                                      currentRoute === "/ViewVehicleSpareParts" ||
                                      currentRoute === "/EditVehicleSpareParts" ||
                                      currentRoute.includes("/ViewVehicleSpareParts") ||
                                      currentRoute.includes("/AddVehicleSpareParts")
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                >
                                  {t("Vehicle Spare Parts")}
                                </Link>
                              </li>
                            ) : null}

                            {userRole === "customer" ||
                              (accessRights && accessRights?.rights_view_fine) ? (
                              <li>
                                <Link
                                  onClick={() => {
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  to="/VehicleFine"
                                  className={
                                    currentRoute === "/VehicleFine" ||
                                      currentRoute === "/AddVehicleFine" ||
                                      currentRoute === "/ViewVehicleFine" ||
                                      currentRoute === "/EditVehicleFine" ||
                                      currentRoute.includes("/ViewVehicleFine") ||
                                      currentRoute.includes("/AddVehicleFine")
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                >
                                  {t("Vehicle Fine")}
                                </Link>
                              </li>
                            ) : null}

                            {userRole === "customer" ||
                              (accessRights &&
                                accessRights?.rights_view_vehicle_maintainance) ? (
                              <li>
                                <Link
                                  onClick={() => {
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  to="/VehicleMaintenance"
                                  className={
                                    currentRoute === "/VehicleMaintenance" ||
                                      currentRoute === "/AddVehicleMaintenance" ||
                                      currentRoute ===
                                      "/ViewVehicleMaintenance" ||
                                      currentRoute === "/EditVehicleMaintenance" ||
                                      currentRoute.includes("/ViewVehicleMaintenance") ||
                                      currentRoute.includes("/AddVehicleMaintenance")
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                >
                                  {t("Vehicle Maintenance")}
                                </Link>
                              </li>
                            ) : null}

                            {userRole === "customer" ||
                              (accessRights &&
                                accessRights?.rights_view_fuel_expenses) ? (
                              <li>
                                <Link
                                  onClick={() => {
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  to="/FuelExpenses"
                                  className={
                                    currentRoute === "/FuelExpenses" ||
                                      currentRoute === "/AddFuelExpenses" ||
                                      currentRoute === "/ViewFuelExpenses" ||
                                      currentRoute === "/EditFuelExpenses" ||
                                      currentRoute.includes("/ViewFuelExpenses") ||
                                      currentRoute.includes("/AddFuelExpenses")
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                >
                                  {t("Vehicle Fuel Expense")}
                                </Link>
                              </li>
                            ) : null}
                          </ul>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  )}

                  {/* ================> Vehicle Expense End <============== */}

                  {/* ================> Dispatch Management Start <============== */}
                  {addonSettingData["addon_dispatch"] == 1 && (
                    <Accordion.Item eventKey="4">
                      {userRole === "customer" ||
                        (accessRights &&
                          (accessRights?.rights_view_dispatch_customer ||
                            accessRights?.rights_view_orders ||
                            accessRights?.rights_view_vehicle_booking_request ||
                            accessRights?.rights_view_vehicle_booking_orders ||
                            accessRights?.rights_manage_delivery_requests ||
                            accessRights?.rights_view_merchants)) ? (
                        <Accordion.Header>
                          <div
                            className="icon-menu-name"
                            onMouseOver={() => setDispatchManagement1(true)}
                            onMouseOut={() => setDispatchManagement1(false)}
                          >
                            <div className="icon-left">
                              {DispatchManagement === true ||
                                DispatchManagement1 === true ||
                                currentRoute === "/DispatchCustomer" ||
                                currentRoute === "/AddDispatchCustomer" ||
                                currentRoute === "/ViewDispatch" ||
                                currentRoute === "/EditCustomerDispatch" ||
                                currentRoute === "/DispatchOrder" ||
                                currentRoute === "/ManualRouting" ||
                                currentRoute === "/Merchant" ||
                                currentRoute === "/AddMerchant" ||
                                currentRoute === "/EditMerchant" ||
                                currentRoute === "/ViewMerchant" ||
                                currentRoute === "/DeliveryRequest" ||
                                currentRoute === "/VehicleBooking" ||
                                currentRoute === "/VehicleBookingList" ||
                                currentRoute === "/ViewOrders" ||
                                currentRoute === "/DispatchDashboard" ||
                                currentRoute.includes("/EditCustomerDispatch") ||
                                currentRoute.includes("/DeliveryRequest") ||
                                currentRoute.includes("/ViewMerchant") ? (
                                <Link
                                  to="/DispatchCustomer"
                                  onClick={() => {
                                    setDashboard1(false);
                                    setSidebar(true);
                                  }}
                                >
                                  <img src={dispatch_icon_active} alt="" />
                                </Link>
                              ) : (
                                <Link
                                  to="/DispatchCustomer"
                                  onClick={() => {
                                    setDashboard1(false);
                                    setSidebar(true);
                                  }}
                                >
                                  <img src={dispatch_icon} alt="" />
                                </Link>
                              )}
                            </div>

                            <div
                              className={
                                DispatchManagement1 === true ||
                                  DispatchManagement === true ||
                                  currentRoute === "/DispatchCustomer" ||
                                  currentRoute === "/AddDispatchCustomer" ||
                                  currentRoute === "/ViewDispatch" ||
                                  currentRoute === "/EditCustomerDispatch" ||
                                  currentRoute === "/DispatchOrder" ||
                                  currentRoute === "/ManualRouting" ||
                                  currentRoute === "/DeliveryRequest" ||
                                  currentRoute === "/Merchant" ||
                                  currentRoute === "/ViewMerchant" ||
                                  currentRoute === "/EditMerchant" ||
                                  currentRoute === "/AddMerchant" ||
                                  currentRoute === "/VehicleBooking" ||
                                  currentRoute === "/ViewOrders" ||
                                  currentRoute === "/VehicleBookingList" ||
                                  currentRoute === "/DispatchDashboard" ||
                                  currentRoute.includes(
                                    "/EditCustomerDispatch"
                                  ) ||
                                  currentRoute.includes("/DeliveryRequest") ||
                                  currentRoute.includes("/ViewMerchant")
                                  ? "menu-name activeColorBrown"
                                  : "menu-name"
                              }
                            >
                              {t("Dispatch Management")}
                            </div>
                          </div>
                        </Accordion.Header>
                      ) : null}

                      <Accordion.Body>
                        <div className="sub-menus">
                          <ul className="actionnmenulist">
                            {userRole === "customer" ||
                              (accessRights &&
                                accessRights?.dispatch_manage_dashboard) ? (
                              <li>
                                <Link
                                  onClick={() => {
                                    setDispatchManagement(false);
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  className={
                                    currentRoute ===
                                      "/VehicleInspectionDashboard" ||
                                      currentRoute ===
                                      "/VehicleInspectionDashboard" ||
                                      currentRoute === "/DispatchDashboard"
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                  to="/DispatchDashboard"
                                >
                                  {t("Dispatch Dashboard")}
                                </Link>
                              </li>
                            ) : null}
                            {userRole === "customer" ||
                              (accessRights &&
                                accessRights?.rights_view_dispatch_customer) ? (
                              <li>
                                <Link
                                  onClick={() => {
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  className={
                                    currentRoute === "/DispatchCustomer" ||
                                      currentRoute === "/AddDispatchCustomer" ||
                                      currentRoute === "/ViewDispatch" ||
                                      currentRoute === "/EditCustomerDispatch" ||
                                      currentRoute.includes(
                                        "/EditCustomerDispatch"
                                      )
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                  to="/DispatchCustomer"
                                >
                                  {t("Dispatch Customer")}
                                </Link>
                              </li>
                            ) : null}
                            {userRole === "customer" ||
                              (accessRights &&
                                accessRights?.rights_view_orders) ? (
                              <li>
                                <Link
                                  onClick={() => {
                                    localStorage.setItem(
                                      "dispatchKey",
                                      "pending"
                                    );
                                    setDispatchStatus("pending");
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  to="/DispatchOrder"
                                  className={
                                    currentRoute === "/DispatchOrder" ||
                                      currentRoute === "/ManualRouting" ||
                                      currentRoute === "/ViewOrders" ||
                                      currentRoute.includes("/DeliveryRequest")
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                >
                                  {t("Orders")}
                                </Link>
                              </li>
                            ) : null}

                            {userRole === "customer" ||
                              (accessRights &&

                                accessRights?.rights_manage_vehicle_booking_request) && !addonSettingData.addon_ghatke == 1 ? (
                              // rights_view_vehicle_booking_request
                              <li>
                                <Link
                                  onClick={() => {
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  to="/VehicleBooking2"
                                  className={
                                    currentRoute === "/VehicleBooking2"
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                >
                                  {t("Vehicle Booking Req")}
                                </Link>
                              </li>
                            ) : null}

                            {userRole === "customer" ||
                              (accessRights &&

                                accessRights?.rights_view_vehicle_booking_orders) && !addonSettingData.addon_ghatke == 1 ? (
                              <li>
                                <Link
                                  onClick={() => {
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  to="/VehicleBookingList"
                                  className={
                                    currentRoute === "/VehicleBookingList"
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                >
                                  {t("Vehicle Booking Orders")}
                                </Link>
                              </li>
                            ) : null}

                            {(userRole === "customer" &&
                              addonSettingData["addon_dispatch"] == 1) ||
                              (addonSettingData["addon_dispatch"] == 1 &&
                                accessRights &&
                                accessRights?.rights_view_merchants) ? (
                              <li>
                                <Link
                                  onClick={() => {
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  to="/Merchant"
                                  className={
                                    currentRoute === "/Merchant" ||
                                      currentRoute === "/AddMerchant" ||
                                      currentRoute === "/ViewMerchant" ||
                                      currentRoute === "/EditMerchant" ||
                                      currentRoute.includes("/ViewMerchant")
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                >

                                  {t("Merchant")}



                                </Link>
                              </li>
                            ) : null}
                          </ul>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  )}

                  {/* ================> Dispatch Management End <============== */}

                  {/* ================> Payment Start <============== */}
                  {temporaryHide && (
                    <Accordion.Item eventKey="5">
                      {userRole === "customer" ||
                        (accessRights &&
                          (accessRights?.rights_view_invoiced ||
                            accessRights?.rights_view_paid)) ? (
                        <Accordion.Header>
                          <div
                            className="icon-menu-name"
                            onMouseOver={() => setPayment1(true)}
                            onMouseOut={() => setPayment1(false)}
                          >
                            <div className="icon-left">
                              {Payment === true ||
                                Payment1 === true ||
                                currentRoute === "/Invoiced" ||
                                currentRoute === "/InvoiceDetails" ||
                                currentRoute === "/Paid" ||
                                currentRoute === "/PaidPaymentReceipt" ||
                                currentRoute === "/PaidPaymentInvoice" ? (
                                <Link
                                  to="/Invoiced"
                                  onClick={() => {
                                    setDashboard1(false);
                                    setSidebar(true);
                                  }}
                                >
                                  <img src={payment_icon_active} alt="" />
                                </Link>
                              ) : (
                                <Link
                                  to="/Invoiced"
                                  onClick={() => {
                                    setDashboard1(false);
                                    setSidebar(true);
                                  }}
                                >
                                  <img src={payment_icon} alt="" />
                                </Link>
                              )}
                            </div>

                            <div
                              className={
                                Payment1 === true ||
                                  Payment === true ||
                                  currentRoute === "/Invoiced" ||
                                  currentRoute === "/InvoiceDetails" ||
                                  currentRoute === "/Paid" ||
                                  currentRoute === "/PaidPaymentReceipt" ||
                                  currentRoute === "/PaidPaymentInvoice"
                                  ? "menu-name activeColorBrown"
                                  : "menu-name"
                              }
                            >
                              {t("Payment")}
                            </div>
                          </div>
                        </Accordion.Header>
                      ) : null}

                      <Accordion.Body>
                        <div className="sub-menus">
                          <ul className="actionnmenulist">
                            {userRole === "customer" ||
                              (accessRights &&
                                accessRights?.rights_view_invoiced) ? (
                              <li>
                                <Link
                                  onClick={() => {
                                    setDispatchManagement(false);
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  className={
                                    currentRoute === "/Invoiced" ||
                                      currentRoute === "/InvoiceDetails"
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                  to="/Invoiced"
                                >
                                  {t("Invoiced")}
                                </Link>
                              </li>
                            ) : null}
                            {userRole === "customer" ||
                              (accessRights && accessRights?.rights_view_paid) ? (
                              <li>
                                <Link
                                  to="/Paid"
                                  className={
                                    currentRoute === "/Paid" ||
                                      currentRoute === "/PaidPaymentReceipt" ||
                                      currentRoute === "/PaidPaymentInvoice"
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                  onClick={() => {
                                    setDispatchManagement(false);
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                >
                                  {t("Paid")}
                                </Link>
                              </li>
                            ) : null}
                          </ul>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  )}

                  {/* ================> Payment End <============== */}

                  {/* ================> Communication Start <============== */}

                  <Accordion.Item eventKey="6">
                    {((userRole === "customer") ||
                      (accessRights &&
                        (accessRights?.rights_view_announcement ||
                          accessRights?.rights_view_email ||
                          accessRights?.rights_view_push_notification ||
                          accessRights?.rights_view_chat_support))) ? (
                      <Accordion.Header>
                        <div
                          className="icon-menu-name"
                          onMouseOver={() => setCommunication1(true)}
                          onMouseOut={() => setCommunication1(false)}
                        >
                          <div className="icon-left">
                            {Communication === true ||
                              Communication1 === true ||
                              currentRoute === "/Announcement" ||
                              currentRoute === "/Addaudio" ||
                              currentRoute === "/EditAudio" ||
                              currentRoute === "/Email" ||
                              currentRoute === "/EmailDetails" ||
                              currentRoute === "/ComposeEmail" ||
                              currentRoute === "/PushNotification" ||
                              currentRoute === "/NotificationDetails" ||
                              currentRoute === "/ComposeMessage" ||
                              currentRoute === "/MyMessages" ||
                              currentRoute === "/AddPushNotification" ||
                              currentRoute.includes("/Addaudio") ||
                              currentRoute.includes("/EmailDetailsTm") ||
                              currentRoute.includes("/NotificationDetails")
                              ? (
                                <Link
                                  to="#"
                                  onClick={() => {
                                    setDashboard1(false);
                                    setSidebar(true);
                                  }}
                                >
                                  <img src={communication_icon_active} alt="" />
                                </Link>
                              ) : (
                                <Link
                                  to="/Announcement"
                                  onClick={() => {
                                    setDashboard1(false);
                                    setSidebar(true);
                                  }}
                                >
                                  <img src={communication_icon} alt="" />
                                </Link>
                              )}
                          </div>
                          <div
                            className={
                              Communication === true ||
                                Communication1 === true ||
                                currentRoute === "/Announcement" ||
                                currentRoute === "/Addaudio" ||
                                currentRoute === "/EditAudio" ||
                                currentRoute === "/Email" ||
                                currentRoute === "/EmailDetails" ||
                                currentRoute === "/ComposeEmail" ||
                                currentRoute === "/PushNotification" ||
                                currentRoute === "/NotificationDetails" ||
                                currentRoute === "/ComposeMessage" ||
                                currentRoute === "/MyMessages" ||
                                currentRoute === "/AddPushNotification" ||
                                currentRoute.includes("/Addaudio") ||
                                currentRoute.includes("/EmailDetailsTm") ||
                                currentRoute.includes("/NotificationDetails")
                                ? "menu-name activeColorBrown"
                                : "menu-name"
                            }
                          >
                            {t("Communication")} {addonSettingData.addon_ghatke == 1 ? null : (<Stack direction="horizontal" gap={2} className="ms-4">
                              <Badge style={{ backgroundColor: '#9C4900' }} bg="#9C4900">{ChatCount}</Badge> </Stack>)}
                          </div>
                        </div>
                      </Accordion.Header>
                    ) : null}
                    <Accordion.Body>
                      <div className="sub-menus">
                        <ul className="actionnmenulist">
                          {userRole === "customer" ||
                            (accessRights &&
                              accessRights?.rights_view_announcement) ? (
                            <li>
                              <Link
                                className={
                                  currentRoute === "/Announcement" ||
                                    currentRoute === "/Addaudio" ||
                                    currentRoute === "/EditAudio" ||
                                    currentRoute.includes("/Addaudio")
                                    ? "activeColorBrown"
                                    : ""
                                }
                                to="/Announcement"
                                onClick={() => {
                                  setDispatchManagement(false);
                                  setParkingManagement(false);
                                  setReplayPlayback(false);
                                  isMobile
                                    ? setSidebar(false)
                                    : setSidebar(true);
                                }}
                              >
                                {t("Announcements")}
                              </Link>
                            </li>
                          ) : (
                            <></>
                          )}
                          {userRole === "customer" ||
                            (accessRights &&
                              accessRights?.rights_view_email) ? (
                            <li>
                              <Link
                                to="/Email"
                                className={
                                  currentRoute === "/Email" ||
                                    currentRoute === "/EmailDetails" ||
                                    currentRoute === "/ComposeEmail" ||
                                    currentRoute.includes("/EmailDetailsTm")
                                    ? "activeColorBrown"
                                    : ""
                                }
                                onClick={() => {
                                  setDispatchManagement(false);
                                  setParkingManagement(false);
                                  setReplayPlayback(false);
                                  isMobile
                                    ? setSidebar(false)
                                    : setSidebar(true);
                                }}
                              >
                                {t("Email")}
                              </Link>
                            </li>
                          ) : null}
                          {userRole === "customer" ||
                            (accessRights &&
                              accessRights?.rights_view_push_notification) ? (
                            <li>
                              <Link
                                to="/PushNotification"
                                className={
                                  currentRoute === "/PushNotification" ||
                                    currentRoute === "/NotificationDetails" ||
                                    currentRoute === "/AddTripFleet" ||
                                    currentRoute === "/AddPushNotification" ||
                                    currentRoute.includes("/NotificationDetails")
                                    ? "activeColorBrown"
                                    : ""
                                }
                                onClick={() => {
                                  setDispatchManagement(false);
                                  setParkingManagement(false);
                                  setReplayPlayback(false);
                                  isMobile
                                    ? setSidebar(false)
                                    : setSidebar(true);
                                }}
                              >
                                {t("Push Notification")}
                              </Link>
                            </li>
                          ) : null}

                          {userRole === "customer" ||
                            (accessRights &&
                              accessRights?.rights_view_chat_support) ? (
                            <li>
                              <Link
                                to="/MyMessages"
                                className={
                                  (currentRoute === "/MyMessages" ||
                                    currentRoute === "/ComposeMessage") &&
                                  "activeColorBrown"
                                }
                                onClick={() => {
                                  setDispatchManagement(false);
                                  setParkingManagement(false);
                                  setReplayPlayback(false);
                                  isMobile
                                    ? setSidebar(false)
                                    : setSidebar(true);
                                }}
                              >
                                <div className="d-flex justify-content-between">
                                  {t("Chat")}{/* <Stack direction="horizontal" gap={2}>
      <Badge style={{ backgroundColor: '#9C4900' }} bg="#9C4900" >16</Badge>  </Stack> */}  </div>
                              </Link>
                            </li>
                          ) : null}

                          {userRole === "customer" ||
                            (accessRights &&
                              accessRights?.rights_view_chat_support) ? (
                            <li>
                              <Link
                                to="/TeamMessages"
                                className={
                                  (currentRoute === "/TeamMessages" ||
                                    currentRoute === "/ComposeMessage") &&
                                  "activeColorBrown"
                                }
                                onClick={() => {
                                  setDispatchManagement(false);
                                  setParkingManagement(false);
                                  setReplayPlayback(false);
                                  isMobile
                                    ? setSidebar(false)
                                    : setSidebar(true);
                                }}
                              >
                                <div className="d-flex justify-content-between ">
                                  {t("Teams")}{/* <Stack direction="horizontal" gap={2}>
      <Badge style={{ backgroundColor: '#9C4900' }} bg="#9C4900">16</Badge> </Stack>  */}</div>
                              </Link>
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* ================> Communication End <============== */}

                  {/* ================> Reports Start <============== */}

                  {accessRights && accessRights?.rights_view_reports ? (
                    <Accordion.Item eventKey="20" id="single_accordian_item">
                      <Accordion.Header>
                        <div className="main-menus">
                          <div
                            className={
                              Reports ? "menus-items  " : "menus-items"
                            }
                          >
                            <Link
                              to="#"
                              className="icon-menu-name"
                              onMouseOver={() => setReports1(true)}
                              onMouseOut={() => setReports1(false)}
                              onClick={() => {
                                setCommunication(false);
                                setReports(!Reports);
                                setDispatchManagement(false);
                                setParkingManagement(false);
                                setReplayPlayback(false);
                                setPayment(false);
                                setUsers(false);
                                setVehicleExpenses(false);
                                setMasterData(false);
                                setMasterSetting(false);
                                isMobile ? setSidebar(false) : setSidebar(true);
                              }}
                            >
                              <div className="icon-left">
                                {Reports === true ||
                                  Reports1 === true ||
                                  currentRoute === "/Reports" ||
                                  currentRoute === "/ScheduleReport" ||
                                  currentRoute === "/GenerateCustomReport" ||
                                  currentRoute === "/ReportView" ? (
                                  <Link
                                    to="/Reports"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img src={reports_icon_active} alt="" />
                                  </Link>
                                ) : (
                                  <Link
                                    to="/Reports"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img src={reports_icon} alt="" />
                                  </Link>
                                )}
                              </div>

                              <div
                                className={
                                  Reports1 === true ||
                                    Reports === true ||
                                    currentRoute === "/Reports" ||
                                    currentRoute === "/ScheduleReport" ||
                                    currentRoute === "/GenerateCustomReport" ||
                                    currentRoute === "/ReportView"
                                    ? "menu-name activeColorBrown"
                                    : "menu-name"
                                }
                              >
                                <Link
                                  to="/Reports"
                                  onClick={() => {
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                >
                                  {t("Reports")}
                                </Link>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </Accordion.Header>
                    </Accordion.Item>
                  ) : null}
                  {/* ================> Reports End <============== */}

                  {/* ================> ConfigurationChecker Start <============== */}
                  {(userRole === "customer" && temporaryHide) ||
                    (temporaryHide &&
                      accessRights &&
                      accessRights.rights_view_configuration_checker) ? (
                    <Accordion.Item eventKey="10" id="single_accordian_item">
                      <Accordion.Header>
                        <div className="main-menus">
                          <div
                            className={
                              ConfigurationChecker
                                ? "menus-items  "
                                : "menus-items"
                            }
                          >
                            <Link
                              to="#"
                              className="icon-menu-name"
                              onMouseOver={() => setConfigurationChecker1(true)}
                              onMouseOut={() => setConfigurationChecker1(false)}
                              onClick={() => {
                                setConfigurationChecker(!ConfigurationChecker);
                                setCommunication(false);
                                setParkingManagement(false);
                                setReplayPlayback(false);
                                setReports(false);
                                setDispatchManagement(false);
                                setPayment(false);
                                setUsers(false);
                                setVehicleExpenses(false);
                                setMasterData(false);
                                setMasterSetting(false);
                                isMobile ? setSidebar(false) : setSidebar(true);
                              }}
                            >
                              <div className="icon-left">
                                {ConfigurationChecker === true ||
                                  ConfigurationChecker1 === true ||
                                  currentRoute === "/ConfigurationChecker" ||
                                  currentRoute === "/Paid" ? (
                                  <Link
                                    to="/ConfigurationChecker"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img src={config_icon_active} alt="" />
                                  </Link>
                                ) : (
                                  <Link
                                    to="/ConfigurationChecker"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img src={config_icon} alt="" />
                                  </Link>
                                )}
                              </div>

                              <div
                                className={
                                  ConfigurationChecker1 === true ||
                                    ConfigurationChecker === true ||
                                    currentRoute === "/ConfigurationChecker"
                                    ? "menu-name activeColorBrown"
                                    : "menu-name"
                                }
                              >
                                <Link
                                  to="/ConfigurationChecker"
                                  onClick={() => {
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                >
                                  {t("Configuration Checker")}
                                </Link>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </Accordion.Header>
                    </Accordion.Item>
                  ) : (
                    <></>
                  )}
                  {/* ================> ConfigurationChecker End <============== */}

                  {/* ================> Parking Management Start <============== */}

                  {/*  {((userRole === "customer") ||
                    (accessRights &&
                      // temporaryHide&&
                      accessRights?.rights_view_parking_management)) ? (
                    <Accordion.Item eventKey="13" id="single_accordian_item">
                      <Accordion.Header>
                        <div className="main-menus">
                          <div
                            className={
                              ParkingManagement
                                ? "menus-items  "
                                : "menus-items"
                            }
                          >
                            <Link
                              to="#"
                              className="icon-menu-name"
                              onMouseOver={() => setParkingManagement1(true)}
                              onMouseOut={() => setParkingManagement1(false)}
                              onClick={() => {
                                setParkingManagement(!ParkingManagement);
                                setConfigurationChecker(false);
                                setCommunication(false);
                                setReports(false);
                                setDispatchManagement(false);
                                setPayment(false);
                                setUsers(false);
                                setVehicleExpenses(false);
                                setMasterData(false);
                                setMasterSetting(false);
                                isMobile ? setSidebar(false) : setSidebar(true);
                              }}
                            >
                              <div className="icon-left">
                                {ParkingManagement === true ||
                                  ParkingManagement1 === true ||
                                  currentRoute === "/ParkingManagement" ||
                                  currentRoute === "/AddParkingManagement" ? (
                                  <Link
                                    to="/ParkingManagement"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img
                                      src={ParkingManagement_icon_active}
                                      alt=""
                                    />
                                  </Link>
                                ) : (
                                  <Link
                                    to="/ParkingManagement"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img src={ParkingManagement_icon} alt="" />
                                  </Link>
                                )}
                              </div>

                              <div
                                className={
                                  ParkingManagement1 === true ||
                                    ParkingManagement === true ||
                                    currentRoute === "/ParkingManagement" ||
                                    currentRoute === "/AddParkingManagement"
                                    ? "menu-name activeColorBrown"
                                    : "menu-name"
                                }
                              >
                                <Link
                                  to="/ParkingManagement"
                                  onClick={() => {
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                >
                                  {t("Parking Management")}
                                </Link>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </Accordion.Header>
                    </Accordion.Item>
                  ) : null}*/}

                  {/* ================> Parking Management End <============== */}

                  {/* ================> Parking Management Start <============== */}

                  {userRole === "customer" ||
                    (accessRights &&
                      accessRights?.rights_view_replay_or_paybacks) ? (
                    <Accordion.Item eventKey="11" id="single_accordian_item">
                      <Accordion.Header>
                        <div className="main-menus">
                          <div
                            className={
                              ReplayPlayback ? "menus-items  " : "menus-items"
                            }
                          >
                            <Link
                              to="#"
                              className="icon-menu-name"
                              onMouseOver={() => setReplayPlayback1(true)}
                              onMouseOut={() => setReplayPlayback1(false)}
                              onClick={() => {
                                setReplayPlayback(!ReplayPlayback);
                                setParkingManagement(false);
                                setReplayPlayback(false);
                                setConfigurationChecker(false);
                                setCommunication(false);
                                setReports(false);
                                setDispatchManagement(false);
                                setPayment(false);
                                setUsers(false);
                                setVehicleExpenses(false);
                                setMasterData(false);
                                setMasterSetting(false);
                                isMobile ? setSidebar(false) : setSidebar(true);
                              }}
                            >
                              <div className="icon-left">
                                {ReplayPlayback === true ||
                                  ReplayPlayback1 === true ||
                                  currentRoute === "/ReplayPlayback" ? (
                                  <Link
                                    to="/ReplayPlayback"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img src={ReplayPlayback_active} alt="" />
                                  </Link>
                                ) : (
                                  <Link
                                    to="/ReplayPlayback"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img src={ReplayPlayback_icon} alt="" />
                                  </Link>
                                )}
                              </div>

                              <div
                                className={
                                  ReplayPlayback1 === true ||
                                    ReplayPlayback === true ||
                                    currentRoute === "/ReplayPlayback"
                                    ? "menu-name activeColorBrown"
                                    : "menu-name"
                                }
                              >
                                <Link
                                  to="/ReplayPlayback"
                                  onClick={() => {
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                >
                                  {t("Replay or Playback's")}
                                </Link>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </Accordion.Header>
                    </Accordion.Item>
                  ) : null}

                  {/* ================> Parking Management End <============== */}

                  {/* ================> Fuel Management Start <============== */}
                  {
                    <Accordion.Item eventKey="12">
                      {(userRole === "customer" && temporaryHide) ||
                        (temporaryHide &&
                          accessRights &&
                          (accessRights?.rights_view_fuel_management_dashboard ||
                            accessRights?.rights_view_fuel_management_fuel_details ||
                            accessRights?.rights_view_fuel_management_fuel_alerts)) ? (
                        <Accordion.Header>
                          <div
                            className="icon-menu-name"
                            onMouseOver={() => setFuelMana1(true)}
                            onMouseOut={() => setFuelMana1(false)}
                          >
                            <div className="icon-left">
                              {FuelMana === true ||
                                FuelMana1 === true ||
                                currentRoute === "/FuelManagementDashbord" ||
                                currentRoute === "/FuelAlerts" ||
                                currentRoute === "/FuelManagementDetails" ? (
                                <Link
                                  to="/FuelManagementDashbord"
                                  onClick={() => {
                                    setDashboard1(false);
                                    setSidebar(true);
                                  }}
                                >
                                  <img src={FuelManagement_active} alt="" />
                                </Link>
                              ) : (
                                <Link
                                  to="/FuelManagementDashbord"
                                  onClick={() => {
                                    setDashboard1(false);
                                    setSidebar(true);
                                  }}
                                >
                                  <img src={FuelManagement} alt="" />
                                </Link>
                              )}
                            </div>

                            <div
                              className={
                                FuelMana1 === true ||
                                  FuelMana === true ||
                                  currentRoute === "/FuelManagementDashbord" ||
                                  currentRoute === "/FuelAlerts" ||
                                  currentRoute === "/FuelManagementDetails"
                                  ? "menu-name activeColorBrown"
                                  : "menu-name"
                              }
                            >
                              {t("Fuel Management")}
                            </div>
                          </div>
                        </Accordion.Header>
                      ) : null}
                      <Accordion.Body>
                        <div className="sub-menus">
                          <ul className="actionnmenulist">
                            {userRole === "customer" ||
                              (accessRights &&
                                accessRights?.rights_view_fuel_management_dashboard) ? (
                              <li>
                                <Link
                                  onClick={() => {
                                    setDispatchManagement(false);
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                  className={
                                    currentRoute === "/FuelManagementDashbord"
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                  to="/FuelManagementDashbord"
                                >
                                  {t("Dashboard")}
                                </Link>
                              </li>
                            ) : null}

                            {userRole === "customer" ||
                              (accessRights &&
                                accessRights?.rights_view_fuel_management_fuel_details) ? (
                              <li>
                                <Link
                                  to="/FuelManagementDetails"
                                  className={
                                    currentRoute === "/FuelManagementDetails"
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                  onClick={() => {
                                    setDispatchManagement(false);
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                >
                                  {t("Fuel Details")}
                                </Link>
                              </li>
                            ) : null}

                            {userRole === "customer" ||
                              (accessRights &&
                                accessRights?.rights_view_fuel_management_fuel_alerts) ? (
                              <li>
                                <Link
                                  to="/FuelAlerts"
                                  className={
                                    currentRoute === "/FuelAlerts"
                                      ? "activeColorBrown"
                                      : ""
                                  }
                                  onClick={() => {
                                    setDispatchManagement(false);
                                    setParkingManagement(false);
                                    setReplayPlayback(false);
                                    isMobile
                                      ? setSidebar(false)
                                      : setSidebar(true);
                                  }}
                                >
                                  {t("Fuel Alerts")}
                                </Link>
                              </li>
                            ) : null}
                          </ul>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  }

                  {/* ================> Payment End <============== */}
                  {/* ================> Vehicle Inspection Start <============== */}
                  {addonSettingData["addon_vehicle_inspection"] == 1 &&
                    temporaryHide && (
                      <Accordion.Item eventKey="16">
                        {userRole === "customer" ||
                          (accessRights &&
                            (accessRights?.rights_view_vehicle_inspection_dashboard ||
                              accessRights?.rights_view_vehicle_inspection_inspection)) ? (
                          <Accordion.Header>
                            <div
                              className="icon-menu-name"
                              onMouseOver={() => setInspection1(true)}
                              onMouseOut={() => setInspection1(false)}
                            >
                              <div className="icon-left">
                                {Inspection === true ||
                                  Inspection1 === true ||
                                  currentRoute === "/VehicleInspection" ||
                                  currentRoute === "/NewInspection" ||
                                  currentRoute === "/ViewInspectionDetails" ||
                                  currentRoute ===
                                  "/VehicleInspectionDashboard" ||
                                  currentRoute === "/NewVehicleInspection" ? (
                                  <Link
                                    to="/VehicleInspection"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img
                                      src={VehicleInspection_active}
                                      alt=""
                                    />
                                  </Link>
                                ) : (
                                  <Link
                                    to="/VehicleInspection"
                                    onClick={() => {
                                      setDashboard1(false);
                                      setSidebar(true);
                                    }}
                                  >
                                    <img src={VehicleInspection} alt="" />
                                  </Link>
                                )}
                              </div>

                              <div
                                className={
                                  Inspection1 === true ||
                                    Inspection === true ||
                                    currentRoute === "/VehicleInspection" ||
                                    currentRoute === "/NewInspection" ||
                                    currentRoute ===
                                    "/VehicleInspectionDashboard" ||
                                    currentRoute === "/ViewInspectionDetails" ||
                                    currentRoute === "/NewVehicleInspection"
                                    ? "menu-name activeColorBrown"
                                    : "menu-name"
                                }
                              >
                                {t("Vehicle Inspection")}
                              </div>
                            </div>
                          </Accordion.Header>
                        ) : null}
                        <Accordion.Body>
                          <div className="sub-menus">
                            <ul className="actionnmenulist">
                              {userRole === "customer" ||
                                (accessRights &&
                                  accessRights?.rights_view_vehicle_inspection_dashboard) ? (
                                <li>
                                  <Link
                                    onClick={() => {
                                      setDispatchManagement(false);
                                      setParkingManagement(false);
                                      setReplayPlayback(false);
                                      isMobile
                                        ? setSidebar(false)
                                        : setSidebar(true);
                                    }}
                                    className={
                                      currentRoute ===
                                        "/VehicleInspectionDashboard" ||
                                        currentRoute ===
                                        "/VehicleInspectionDashboard"
                                        ? "activeColorBrown"
                                        : ""
                                    }
                                    to="/VehicleInspectionDashboard"
                                  >
                                    {t("Dashboard")}
                                  </Link>
                                </li>
                              ) : null}
                              {userRole === "customer" ||
                                (accessRights &&
                                  accessRights?.rights_view_vehicle_inspection_inspection) ? (
                                <li>
                                  <Link
                                    to="/VehicleInspection"
                                    className={
                                      currentRoute === "/VehicleInspection" ||
                                        currentRoute === "/NewInspection" ||
                                        currentRoute ===
                                        "/ViewInspectionDetails" ||
                                        currentRoute === "/NewVehicleInspection"
                                        ? "activeColorBrown"
                                        : ""
                                    }
                                    onClick={() => {
                                      setDispatchManagement(false);
                                      setParkingManagement(false);
                                      setReplayPlayback(false);
                                      isMobile
                                        ? setSidebar(false)
                                        : setSidebar(true);
                                    }}
                                  >
                                    {t("Inspection")}
                                  </Link>
                                </li>
                              ) : null}
                            </ul>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    )}
                  {/* ================> Vehicle Inspection End <============== */}

                  {/* ================> Market Place Start <============== */}
                  {/* {addonSettingData["addon_vehicle_marketplace"] == 1 &&
                    temporaryHide && ( */}
                  <Accordion.Item eventKey="17">
                    <Accordion.Header>
                      <div
                        className="icon-menu-name"
                        onMouseOver={() => setMarketPlace1(true)}
                        onMouseOut={() => setMarketPlace1(false)}
                      >
                        {/*   */}
                        <div className="icon-left">
                          {MarketPlace === true ||
                            MarketPlace1 === true ||
                            currentRoute === "/OfferVehicleMarketPlace" ||
                            currentRoute === "/OfferDriverMarketPlace" ||
                            currentRoute === "/OnlineAuctionMarketPlace" ||
                            currentRoute === "/DirectOrderConfirmation" ||
                            currentRoute === "/DirectOrderOfferLoad" ||
                            currentRoute === "/OnlineAuctionVehicleDetails" ||
                            currentRoute === "/AuctionReferenceDetails" ||
                            currentRoute === "/BidAuctionDetails" ||
                            currentRoute === "/DirectOrderReferenceDetails" ||
                            currentRoute === "/AuctionOfferDetails" ||
                            currentRoute === "/OrderConfDetails" ||
                            currentRoute === "/OnlineAuction" ||
                            currentRoute === "/DirectOrderVehicleDetails" ||
                            currentRoute === "/DirectOrderMarketPlace" ? (
                            <Link
                              to="/OfferVehicleMarketPlace"
                              onClick={() => {
                                setDashboard1(false);
                                setSidebar(true);
                              }}
                            >
                              <img src={ic_marketplace_active} alt="" />
                            </Link>
                          ) : (
                            <Link
                              to="/OfferVehicleMarketPlace"
                              onClick={() => {
                                setDashboard1(false);
                                setSidebar(true);
                              }}
                            >
                              <img src={ic_marketplace} alt="" />
                            </Link>
                          )}
                        </div>

                        <div
                          className={
                            MarketPlace1 === true ||
                              MarketPlace === true ||
                              currentRoute === "/OfferVehicleMarketPlace" ||
                              currentRoute === "/OfferDriverMarketPlace" ||
                              currentRoute === "/OnlineAuctionMarketPlace" ||
                              currentRoute === "/AuctionOfferDetails" ||
                              currentRoute ===
                              "/OnlineAuctionVehicleDetails" ||
                              currentRoute === "/AuctionReferenceDetails" ||
                              currentRoute === "/BidAuctionDetails" ||
                              currentRoute === "/OrderConfDetails" ||
                              currentRoute === "/DirectOrderConfirmation" ||
                              currentRoute === "/DirectOrderOfferLoad" ||
                              currentRoute ===
                              "/DirectOrderReferenceDetails" ||
                              currentRoute === "/OnlineAuction" ||
                              currentRoute === "/DirectOrderVehicleDetails" ||
                              currentRoute === "/DirectOrderMarketPlace"
                              ? "menu-name activeColorBrown"
                              : "menu-name"
                          }
                        >
                          {t("Market Place")}
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="sub-menus">
                        <ul className="actionnmenulist">
                          <li>
                            <Link
                              onClick={() => {
                                setDispatchManagement(false);
                                setParkingManagement(false);
                                setReplayPlayback(false);
                                isMobile
                                  ? setSidebar(false)
                                  : setSidebar(true);
                              }}
                              className={
                                currentRoute === "/OfferVehicleMarketPlace"
                                  ? "activeColorBrown"
                                  : ""
                              }
                              to="/OfferVehicleMarketPlace"
                            >
                              {t("Offer Vehicle")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/OfferDriverMarketPlace"
                              className={
                                currentRoute === "/OfferDriverMarketPlace"
                                  ? "activeColorBrown"
                                  : ""
                              }
                              onClick={() => {
                                setDispatchManagement(false);
                                setParkingManagement(false);
                                setReplayPlayback(false);
                                isMobile
                                  ? setSidebar(false)
                                  : setSidebar(true);
                              }}
                            >
                              {t("Offer Driver")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/DirectOrderMarketPlace"
                              className={
                                currentRoute ===
                                  "/DirectOrderMarketPlace" ||
                                  currentRoute ===
                                  "/DirectOrderReferenceDetails" ||
                                  currentRoute ===
                                  "/DirectOrderVehicleDetails" ||
                                  currentRoute ===
                                  "/DirectOrderConfirmation" ||
                                  currentRoute === "/DirectOrderOfferLoad" ||
                                  currentRoute ===
                                  "/DirectOrderVehicleDetails"
                                  ? "activeColorBrown"
                                  : ""
                              }
                              onClick={() => {
                                setDispatchManagement(false);
                                setParkingManagement(false);
                                setReplayPlayback(false);
                                isMobile
                                  ? setSidebar(false)
                                  : setSidebar(true);
                              }}
                            >
                              {t("Direct Order")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/OnlineAuction"
                              className={
                                currentRoute === "/OnlineAuction" ||
                                  currentRoute ===
                                  "/OnlineAuctionMarketPlace" ||
                                  currentRoute === "/AuctionOfferDetails" ||
                                  currentRoute ===
                                  "/OnlineAuctionVehicleDetails" ||
                                  currentRoute ===
                                  "/AuctionReferenceDetails" ||
                                  currentRoute === "/BidAuctionDetails" ||
                                  currentRoute === "/OrderConfDetails"
                                  ? "activeColorBrown"
                                  : ""
                              }
                              onClick={() => {
                                setDispatchManagement(false);
                                setParkingManagement(false);
                                setReplayPlayback(false);
                                isMobile
                                  ? setSidebar(false)
                                  : setSidebar(true);
                              }}
                            >
                              {t("Online Auction")}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  {/* )}  */}

                  {/* ================> Market Place End <============== */}
                </Accordion>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;

// {(userRole === "customer" &&
// addonSettingData["addon_dispatch"] == 1) ||
// (addonSettingData["addon_dispatch"] == 1 &&
//   accessRights &&
//   accessRights?.rights_manage_delivery_requests) ? (

// <li>
//   <Link
//     onClick={() => {
//       setDispatchStatus("Pending")
//       localStorage.setItem(
//         "dispatchKey",
//         "Pending"
//       );
//       setParkingManagement(false);
//       setReplayPlayback(false);
//       isMobile
//         ? setSidebar(false)
//         : setSidebar(true);
//     }}
//     to="/DeliveryRequest"
//     className={
//       currentRoute === "/DeliveryRequest"
//         ? "activeColorBrown"
//         : ""
//     }
//   >
//     {t("Delivery Request")}
//   </Link>
// </li>
// ) : null}

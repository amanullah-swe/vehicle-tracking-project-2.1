import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { AppContext } from "../context/AppContext";
import bell from "../assets/images/bell.svg";
import chat from "../assets/images/chat.png";
import profile from "../assets/images/profile.png";
import online from "../assets/images/online.svg";
import earth from "../assets/images/earth.svg";
import { Accordion, Dropdown } from "react-bootstrap";
import ImportUser from "../assets/images/imagesuser.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import HeaderStepper1 from "../assets/images/HeaderStepper1.svg";
import HeaderStepper2 from "../assets/images/HeaderStepper2.svg";
import HeaderStepper3 from "../assets/images/HeaderStepper3.svg";
import DropDownTopArrow from "../assets/images/DropDownTopArrow.svg";
import { useDispatch } from "react-redux";
import { signout } from "../store/loginSlice";
import { motion } from "framer-motion";
import DropdownLanguage from "./MultiLang/DropdownLanguage";
import { useTranslation } from "react-i18next";
import ApiConfig from "../api/ApiConfig";
import { useSelector } from "react-redux";

const Header = ({ }) => {
  const [customer, setCustomer] = useState(false);
  const [langague, setLangague] = useState(false);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const {
    sidebar,
    ReportHader,
    setGoogleMap,
    onlineCount,
    userListRole,
    routeIdEdit,
    ChatCount,
    setVehicleTabListActive, customerProfile, UserRole, UserRoleRoute, socket
  } = useContext(AppContext);
  const accessRights = useSelector((state) => state.auth.accessRights);
  const addonSettingData = useSelector((state) => state.auth.addonModule);
  // accessRights && accessRights.rights_role;
  const userRole = "noRole"
  const currentRoute = useLocation().pathname;

  // console.log("checking the header  message =====================", ReportHader)
  // console.log("checking the header route =====================", currentRoute.includes("/ReportsAndStatisticsUsageAudit"))

  const [proFileDetails, setProFileDetails] = useState({})
  useEffect(() => {
    setProFileDetails(customerProfile)
  }, [customerProfile]);
  const { id } = useParams();
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const dynamicComponents = userListRole;

  const logout = (e) => {
    e.preventDefault();
    dispatch(signout());
    localStorage.clear();
    socket && socket?.disconnect();
    // setLoggedIn(false)
  };
  function capitalizeFirstLetter(str) {
    if (str.length === 0) {
      return str; // Return an empty string if the input is empty.
    } else {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
  };
  return (
    <div
      className="cx-header"
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}
    >
      <div
        className={
          sidebar ? "cx-header-wrapper " : "cx-header-wrapper cx-active-header"
        }
      >
        {((userRole === "customer") || (accessRights?.rights_dashboard_map === 1)) && ((currentRoute === "/Dashboard" || currentRoute === "/dashboard") && (
          <div className="main-heading">
            <p></p>
            <p>{t("Dashboard")}</p>
          </div>
        ))
          ||


          /*Master Setting Routes  */
          (currentRoute === "/CustomerProfile" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Company Profile")}</p>
            </div>
          )) ||
          (currentRoute === "/404" && (
            <div className="main-heading">
              <p></p>
              <p>{t("")}</p>
            </div>
          )) ||
          (currentRoute === "/UpdateCustomerProfile" && (
            <div className="main-heading">
              <Link to="/CustomerProfile">
                <p>{t("Customer Setting")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span> {t("Update Profile")}
              </p>
            </div>
          )) ||
          (currentRoute === "/DispatchDashboard" && (
            <div className="main-heading">
              <Link to="/DispatchDashboard">
                <p>{t("Dispatch Dashboard")}</p>
              </Link>
              <p>

              </p>
            </div>
          )) ||
          (currentRoute === "/LogoUpdate" && (
            <div className="main-heading">
              <Link to="/CustomerProfile">
                <p>{t("Customer Setting")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Logo")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/UpdateCustomerLogo") && (
            <div className="main-heading">
              <Link to="/CustomerProfile">
                <p>{t("Customer Settings")}</p>
              </Link>
              <p>
                {" "}
                <span className="mx-1">/</span>
                {t("Update Logo")}
              </p>
            </div>
          )) ||
          (currentRoute === "/GeneralSetting" && (
            <div className="main-heading">
              <p></p>
              <p>{t("General Settings")}</p>
            </div>
          )) ||
          (currentRoute === "/IntegrationSetting" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Integration Settings")}</p>
            </div>
          )) ||
          (currentRoute === "/TransportationSetting" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Transportation Settings")}</p>
            </div>
          )) ||
          (currentRoute === "/NotificationSetting" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Notification Settings")}</p>
            </div>
          )) ||
          (currentRoute === "/DispatchSetting" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Dispatch Settings")}</p>
            </div>
          )) ||
          (currentRoute === "/AccessRight" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Access Rights")}</p>
            </div>
          )) ||
          (currentRoute === "/UserRole" && (
            <div className="main-heading">
              <Link to="/AccessRight">
                <p>{t("Access Rights")}</p>
              </Link>
              <p>
                {" "}
                <span className="mx-1">/</span>
                {t("Users Roles")}
              </p>
            </div>
          )) ||
          (currentRoute === "/UserAlert" && (
            <div className="main-heading">
              <Link to="/UserDashboard">
                <p>{t("User's Insight")}</p>
              </Link>
              <p>
                {" "}
                <span className="mx-1">/</span>
                {t("User Alert's")}
              </p>
            </div>
          )) ||
          (currentRoute === "/UserDashboard" && (
            <div className="main-heading">
              <p></p>
              <p>{t("User's Insight")}</p>
            </div>
          )) ||
          (currentRoute === "/AddOnSettings" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Add-on Settings")}</p>
            </div>
          )) ||
          (currentRoute === "/VehicleAvailability" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Vehicle Availability Calendar")}</p>
            </div>
          )) ||

          (currentRoute === "/VehicleAvailabilityList" && (
            <div className="main-heading">
              <Link to="/VehicleAvailability"> <p>{t("Vehicle Availability Calendar/")} </p></Link>

              <p>{t("Vehicle Availability List")}</p>
            </div>
          )) ||
          (currentRoute === "/DriverDutyRoaster" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Driver Duty Roaster")}</p>
            </div>
          )) ||
          (currentRoute === "/DriverAvailabilityList" && (
            <div className="main-heading">
              <Link to="/AvailableVehicleList"> <p>{t("Driver Availability Calendar/")} </p></Link>

              <p>{t("Driver Availability List")}</p>
            </div>
          )) ||
          (currentRoute === "/AvailableVehicleList" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Driver Availability Calendar")}</p>
            </div>
          )) ||
          /*Parking Slot routes  */
          (currentRoute === "/ParkingSlot" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Parking Station")}</p>
            </div>
          )) ||
          (currentRoute === "/AddOnSettingsCart" && (
            <div className="main-heading">
              <Link to="/AddOnSettings">
                <p>{t("Addon Setting")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("My Cart")}
              </p>
            </div>
          )) ||
          (currentRoute === "/Vehicle" && (
            <div
              className="main-heading"
              onClick={() => {
                localStorage.setItem("vehicleTabListActive", "vehicle");
                setVehicleTabListActive("vehicle");
              }}
            >
              <p></p>
              <p>{t("Vehicles")}</p>
            </div>
          )) ||
          (currentRoute.split("/")[1] === "AddVehicle" && (
            <div className="main-heading">
              <Link to="/Vehicle">
                <p>{t("Vehicle")}</p>
              </Link>
              <p>
                {" "}
                <span className="mx-1">/</span>
                {routeIdEdit ? t("Update Vehicle") : t("Add Vehicle")}
              </p>
            </div>
          )) ||
          (currentRoute.split("/")[1] === "AddVehicleCategory" && (
            <div
              className="main-heading"
              onClick={() => {
                localStorage.setItem("vehicleTabListActive", "category");
                setVehicleTabListActive("category");
              }}
            >
              <Link to="/Vehicle">
                <p>{t("Vehicle Type")}</p>
              </Link>
              <p>
                {" "}
                <span className="mx-1">/</span>
                {/* {t(routeIdEdit ? "Update Vehicle Type" : "Add Vehicle Type")} */}
                {routeIdEdit ? t("Update Vehicle Type") : t("Add Vehicle Type")}
              </p>
            </div>
          )) ||
          (currentRoute.split("/")[1] === "AddVehicleGroup" && (
            <div
              className="main-heading"
              onClick={() => {
                localStorage.setItem("vehicleTabListActive", "group");
                setVehicleTabListActive("group");
              }}
            >
              <Link to="/Vehicle">
                <p>{t("Group")}</p>
              </Link>
              <p>
                {" "}
                <span className="mx-1">/</span>
                {routeIdEdit ? t("Update Group") : t("Add Group")}
              </p>
            </div>
          )) ||
          (currentRoute.split("/")[1] === "VehicleDetails" && (
            <div
              className="main-heading"
              onClick={() => {
                localStorage.setItem("vehicleTabListActive", "vehicle");
                setVehicleTabListActive("vehicle");
              }}
            >
              <Link to="/Vehicle">
                <p>{t("Vehicle")}</p>
              </Link>
              <p>
                {" "}
                <span className="mx-1">/</span>
                {t("Vehicle Details")}
              </p>
            </div>
          )) ||
          (currentRoute.split("/")[1] === "NewSyncRequest" && (
            <div
              className="main-heading"
              onClick={() => {
                localStorage.setItem("vehicleTabListActive", "sync");
                setVehicleTabListActive("sync");
              }}
            >
              <Link to="/Vehicle">
                <p>
                  {t("SyncRequest")}
                  <span className="mx-1">/</span>
                </p>
              </Link>
              <p>
                {routeIdEdit ? t("Update Sync Request") : t("Add Sync Request")}
              </p>
            </div>
          )) ||
          (currentRoute === "/Holidays" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Holidays")}</p>
            </div>
          )) ||
          (currentRoute.includes("/AddHolidays") && (
            <div className="main-heading">
              <Link to="/Holidays">
                <p>{t("Holidays")}</p>
              </Link>
              <p>
                {" "}
                <span className="mx-1">/</span>
                {t("Add Holidays")}
              </p>
            </div>
          )) ||
          // =======
          (currentRoute === "/Vacations" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Vacations")}</p>
            </div>
          )) ||
          (currentRoute.includes("/AddVacation") && (
            <div className="main-heading">
              <Link to="/Vacations">
                <p>{t("Vacations")}</p>
              </Link>
              <p>
                {" "}
                <span className="mx-1">/</span>
                {t("Add Vacations")}
              </p>
            </div>
          )) ||
          // ==========
          (currentRoute.includes("/AddParkingSlot") && (
            <>
              <div className="main-heading">
                <Link to="/ParkingSlot">
                  {/* <p>{t("Parking Station")}</p> */}
                </Link>
                <p>
                  {/* <span className="mx-1">/</span> */}
                  {t("Add Parking Station")}
                </p>
              </div>
            </>
          )) ||
          /*Points of interest routes  */
          (currentRoute === "/PointOfIntrest" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Point of Interest")}</p>
            </div>
          )) ||
          (currentRoute.includes("/AddPointOfInterest") && (
            <>
              <div className="main-heading">
                <Link to="/PointOfIntrest">
                  <p>{t("Point of Interest")}</p>
                </Link>
                <p>
                  {" "}
                  <span className="mx-1">/</span>
                  {t("Add Location")}
                </p>
              </div>
            </>
          )) ||
          /*Geofence Areas*/
          (currentRoute === "/GeofenceAreas" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Geofence Areas")}</p>
            </div>
          )) ||
          (currentRoute.includes("/AddGeofenceArea") && (
            <>
              <div className="main-heading">
                <Link to="/GeofenceAreas">
                  <div
                    className={
                      currentRoute === "/GeofenceArea"
                        ? `main-headingCod`
                        : `notSameRoute`
                    }
                  >
                    <p>{t("Geofence Areas")}</p>
                  </div>
                </Link>
                <p>
                  {" "}
                  <span className="mx-1">/</span>
                  {t("Add Geofence")}
                </p>
              </div>
            </>
          )) ||
          (currentRoute === "/administrator" ||
            currentRoute === "/administrator" ? (
            <div className="main-heading">
              <Link to="/administrator">
                <p></p>
                <p>{t("Administrator")}</p>
              </Link>
            </div>
          ) : (
            ""
          )) ||
          (currentRoute.includes("/view") && (
            <div className="main-heading">
              <Link to="/administrator">
                <p>{t("Administrator")}</p>
              </Link>
              <p>
                {" "}
                <span className="mx-1">/</span>
                {t("view")}
              </p>
            </div>
          )) ||
          (currentRoute === "/TransportManager" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Transport Manager")}</p>
            </div>
          )) ||
          (currentRoute.includes("/AddTransportManager") && (
            <div className="main-heading">
              <Link to="/TransportManager">
                <p>{t("Transport Manager")}</p>
              </Link>
              <p>
                {" "}
                {/* <span className="mx-1">/</span>{t(" Transport Manager")} */}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/ViewTransportManager") && (
            <div className="main-heading">
              <Link to="/TransportManager">
                <p>{t("Transport Manager")}</p>
              </Link>
              <p>
                {" "}
                <span className="mx-1">/</span>
                {t("View Transport Manager")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/EditTransportManager") && (
            <div className="main-heading">
              <Link to="/TransportManager">
                <p>{t("Transport Manager")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Edit Transport Manager")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/ChangePassword") && (
            <div className="main-heading">
              <Link to="/MyProfile">
                <p>{t("My Profile")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Change Password")}
              </p>
            </div>
          )) ||
          // ===================================
          (currentRoute.includes("/Drivers") ? (
            <div className="main-heading">
              <p></p>
              <p>{t("Driver ")}</p>
            </div>
          ) : (
            ""
          )) ||
          (currentRoute.includes("/ViewDrivers") && (
            <div className="main-heading">
              <Link to="/Drivers">
                <p>{t("Driver")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("View Dispatch Driver")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/ReportDistributionContactsDetails") && (
            <div className="main-heading">
              <Link to="/AllUsers">
                <p>{t("Report Distribution Contacts")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Contact Details")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/AddDrivers") && (
            <div className="main-heading">
              <Link to="/Drivers">
                <p>{t("Driver")}</p>
              </Link>
              <p>
                {/* <span className="mx-1">/</span>{t("Add Dispatch Driver Details")} */}
              </p>
            </div>
          )) ||

          (currentRoute.includes("/ChangeDriverPassword") && (
            <div className="main-heading">
              <Link to="/Drivers">
                <p>{t("Dispatch Driver")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Change Password")}
              </p>
            </div>
          )) ||
          // ===========================
          (currentRoute.includes("/DeliveryPerson") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Delivery Person")}</p>
            </div>
          )) ||
          (currentRoute.includes("/AddDeliveryPerson") && (
            <div className="main-heading">
              <Link to="/DeliveryPerson">
                <p>{t("Delivery Person")}</p>
              </Link>
              <p>
                {" "}
                {/* <span className="mx-1">/</span>{t("Add Delivery Person Details")} */}
              </p>
            </div>
          )) ||

          (currentRoute.includes("/ViewDeliveryPerson") && (
            <div className="main-heading">
              <Link to="/DeliveryPerson">
                <p>{t("Delivery Person")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("View Delivery Person")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/ChangePassDelivery") && (
            <div className="main-heading">
              <Link to="/DeliveryPerson">
                <p>{t("Delivery Person")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Change Password")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/DeliveryPerson") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Delivery Person")}</p>
            </div>
          )) ||
          /*FLEET MANAGER*/
          (currentRoute.includes("/FleetManager") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Fleet Manager")}</p>
              <p>
                {" "}
                {/* <span className="mx-1">/</span>{t("Add Fleet Manager Details")} */}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/ViewFleetManager") ? (
            <div className="main-heading">
              <p></p>
              <p>{t("View Fleet Manager")}</p>
            </div>
          ) : null) ||
          (currentRoute.includes("/AddFleetManager") && (
            <div className="main-heading">
              <Link to="/FleetManager">
                <p>{t("Fleet Manager")}</p>
              </Link>
              <p>
                {" "}
                {/* <span className="mx-1">/</span>{t("Add Fleet Manager Details")} */}
              </p>
            </div>
          )) ||

          (currentRoute.includes("/LogChanges") && (
            <div className="main-heading">
              <p></p>
              <p>
                {" "}
                {t("Log Changes")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/ChangeFleetPass") && (
            <div className="main-heading">
              <Link to="/FleetManager">
                <p>{t("Fleet Manager")}</p>
              </Link>
              <p>
                {" "}
                <span className="mx-1">/</span>
                {t("Change Password")}
              </p>
            </div>
          )) ||
          // Vehicle Maintenence
          (currentRoute.includes("/VehicleMaintenance") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Vehicle Maintenance")}</p>
            </div>
          )) ||
          (currentRoute.includes("/AddVehicleMaintenance/") ? (
            <div className="main-heading">
              <Link to="/VehicleMaintenance">
                <p>{t("Vehicle Maintenance")} </p>
              </Link>
              <p className="mx-1">/ Update Vehicle Maintenance</p>
              <p>
                {" "}
                {/* <span className="mx-1">/</span>{t("Add Vehicle Incident Details")} */}
              </p>
            </div>
          ) : null) ||
          (currentRoute.includes("/AddVehicleMaintenance") && (
            <div className="main-heading">
              <Link to="/VehicleMaintenance">
                <p>{t("Vehicle Maintenance")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Add Vehicle Maintenance")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/ViewVehicleMaintenance") && (
            <div className="main-heading">
              <Link to="/VehicleMaintenance">
                <p>{t("Vehicle Maintenance")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("View Vehicle Maintenance")}
              </p>
            </div>
          )) ||
          /*VEHICLE ASSISTANT*/
          (currentRoute.includes("/VehicleAssistants") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Vehicle Assistants")}</p>
            </div>
          )) ||
          (currentRoute.includes("/ViewVehicleAssistants ") ||
            currentRoute.includes("/ViewVehicleAssistants") ? (
            <div className="main-heading">
              <Link to="/VehicleAssistants">
                <p>{t("Vehicle Assistant")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("View Vehicle Assistants")}
              </p>
            </div>
          ) : null) ||
          (currentRoute.includes("/AddVehicleAssistants") && (
            <div className="main-heading">
              <Link to="/VehicleAssistants">
                <p>{t("Vehicle Assistant")}</p>
              </Link>
              <p>
                {/* <span className="mx-1">/</span>{t("Add Vehicle Assistant Details")} */}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/DispatchCustomer") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Dispatch Customer")}</p>
            </div>
          )) ||
          (currentRoute.includes("/EditCustomerDispatch") && (
            <div className="main-heading">
              <Link to="/DispatchCustomer">
                <p>{t("Dispatch Customer")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Edit Customer Dispatch")}
              </p>
            </div>
          )) ||

          (currentRoute.includes("/ChangeDelPass") && (
            <div className="main-heading">
              <Link to="/VehicleAssistants">
                <p>{t("Vehicle Assistant")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Change Password")}
              </p>
            </div>
          )) ||
          // New Users Routes
          (currentRoute.includes("/AllUsers") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Report Distribution Contacts")}</p>
            </div>
          )) ||
          (currentRoute.includes("/CreateUser") && (
            <div className="main-heading">
              <Link to="/AllUsers">
                <p>{t("Report Distribution Contacts")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Add Contact")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/EditUser") && (
            <div className="main-heading">
              <Link to="/AllUsers">
                <p>{t("Report Distribution Contacts")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Edit Contact")}
              </p>
            </div>
          )) ||
          /*TRIP MANAGEMENT*/
          (currentRoute.includes("/TripManagement") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Trip Management")}</p>
            </div>
          )) ||
          (currentRoute.includes("/AddDispatchTrip") && (
            <div className="main-heading">
              <Link to="/TripManagement">
                <p>{t("Trip Management")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Add Scheduled Trip")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/ViewDispatchTrip") && (
            <div className="main-heading">
              <Link to="/TripManagement">
                <p>{t("Trip Management")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("View Dispatch Trips")}
              </p>
            </div>
          )) ||

          (currentRoute.includes("/DispatchViewOrder") && (
            <div className="main-heading">
              <Link to="/TripManagement">
                <p>{t("Trip Management")}</p>
              </Link>
              <Link to="/ViewDispatchTrip">
                <p>{t("/ View Dispatch Trip")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("View Order Details")}
              </p>
            </div>
          )) ||

          (currentRoute.includes("/AddNewOrder") && (
            <div className="main-heading">
              <Link to="/TripManagement">
                <p>{t("Trip Management")}</p>
              </Link>
              <Link to="/ViewDispatchTrip">
                <p>{t("/ View Dispatch Trip")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Add pickup location")}
              </p>
            </div>
          )) ||

          (currentRoute.includes("/ViewInvoice") && (
            <div className="main-heading">
              <Link to="/TripManagement">
                <p>{t("Trip Management")}</p>
              </Link>
              <Link to="/DispatchViewOrder">
                <p>{t("/ View Order Details")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("View Invoice")}
              </p>
            </div>
          )) ||

          (currentRoute.includes("/EditInvoice") && (
            <div className="main-heading">
              <Link to="/TripManagement">
                <p>{t("Trip Management")}</p>
              </Link>
              {/* <Link to="/DispatchViewOrder">
                <p>{t("/ View Order Details")}</p>
              </Link> */}
              <p>
                <span className="mx-1">/</span>
                {t("Edit Invoice")}
              </p>
            </div>
          ))

          ||
          (currentRoute.includes("/ViewStop") && (
            <div className="main-heading">
              <Link to="/TripManagement">
                <p>{t("Trip Management")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("View Stop")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/EditDispatchTrip") && (
            <div className="main-heading">
              <Link to="/TripManagement">
                <p>{t("Trip Management")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {id ? t("Edit Dispatch Trips") : t("Add Dispatch Trips")}

              </p>
            </div>
          )) ||
          (currentRoute.includes("/AddStop") && (
            <div className="main-heading">
              <Link to="/TripManagement">
                <p>{t("Trip Management")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Add Stop")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/EditStop") && (
            <div className="main-heading">
              <Link to="/TripManagement">
                <p>{t("Trip Management")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Edit Stop")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/ViewStop") && (
            <div className="main-heading">
              <Link to="/TripManagement">
                <p>{t("Trip Management")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Stop Details")}
              </p>
            </div>
          )) ||
          /*Vehicle Accident*/

          (currentRoute.includes("/ViewVehicleAccident") ? (
            <div className="main-heading">
              <p></p>
              <Link to='/VehicleAccident'>
                <p>{t("Vehicle Accident")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("View Vehicle Accident")}
              </p>
            </div>
          ) : null) ||
          (currentRoute.includes("/VehicleAccident") ? (
            <div className="main-heading">
              <p></p>
              <p>{t("Vehicle Accident")}</p>
              <p>
                {" "}
                {/* <span className="mx-1">/</span>{t("Add Vehicle Incident Details")} */}
              </p>
            </div>
          ) : null) ||


          (currentRoute.includes("/AddVehicleAccident/") ? (
            <div className="main-heading">
              <Link to="/VehicleAccident">
                <p>{t("Vehicle Accident")} </p>
              </Link>
              <p className="mx-1">/ Update Vehicle Accident</p>
              <p>
                {" "}
                {/* <span className="mx-1">/</span>{t("Add Vehicle Incident Details")} */}
              </p>
            </div>
          ) : null) ||
          (currentRoute.includes("/AddVehicleAccident") ? (
            <div className="main-heading">
              <Link to="/VehicleAccident">
                <p>{t("Vehicle Accident")} </p>
              </Link>
              <p className="mx-1">/ Add Vehicle Accident</p>
              <p>
                {" "}
                {/* <span className="mx-1">/</span>{t("Add Vehicle Incident Details")} */}
              </p>
            </div>
          ) : null) ||
          (currentRoute.includes("/EditVehicleAccident") && (
            <div className="main-heading">
              <Link to="/VehicleAccident">
                <p>{t("Vehicle Accident")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Edit Vehicle Incident Details")}
              </p>
            </div>
          )) ||
          /*Vehicle Accesroy*/
          (currentRoute.includes("/ViewVehicleAccesory") && (
            <div className="main-heading">
              <p></p>
              <Link to='/VehicleAccesory' >
                <p>{t("Vehicle Accessory")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("View Vehicle Accessory")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/VehicleAccesory") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Vehicle Accessory")}</p>
              <p>
                {" "}
                {/* <span className="mx-1">/</span>{t("Add Vehicle Accesory Details")} */}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/AddVehicleAccesory/") && (
            <div className="main-heading">
              <Link to="/VehicleAccesory">
                <p>{t("Vehicle Accessory")}</p>
              </Link>
              <p className="mx-1">/ Update Vehicle Accessory</p>
              <p>
                {" "}
                {/* <span className="mx-1">/</span>{t("Add Vehicle Accesory Details")} */}
              </p>
            </div>
          )) || (currentRoute.includes("/AddVehicleAccesory") && (
            <div className="main-heading">
              <Link to="/VehicleAccesory">
                <p>{t("Vehicle Accessory")}</p>
              </Link>
              <p className="mx-1">/ Add Vehicle Accessory</p>
              <p>
                {" "}
                {/* <span className="mx-1">/</span>{t("Add Vehicle Accesory Details")} */}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/EditVehicleAccesory") && (
            <div className="main-heading">
              <Link to="/VehicleAccesory">
                <p>{t("Vehicle Accessory")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Edit Vehicle Accessory Details")}
              </p>
            </div>
          )) ||
          /*Vehicle Spare parts*/
          (currentRoute.includes("/ViewVehicleSpareParts") && (
            <div className="main-heading">
              <p></p>
              <Link to='/VehicleSpareParts'>
                <p>{t("Vehicle Spare Parts")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("View Vehicle SpareParts")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/VehicleSpareParts") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Vehicle Spare Parts")}</p>
            </div>
          )) ||

          (currentRoute.includes("/AddVehicleSpareParts/") ? (
            <div className="main-heading">
              <Link to="/VehicleSpareParts">
                <p>{t("Vehicle Spare Parts")} </p>
              </Link>
              <p className="mx-1">/ Update Vehicle Spare Parts</p>
              <p>
                {" "}
                {/* <span className="mx-1">/</span>{t("Add Vehicle Incident Details")} */}
              </p>
            </div>
          ) : null) ||
          (currentRoute.includes("/AddVehicleSpareParts") && (
            <div className="main-heading">
              <Link to="/VehicleSpareParts">
                <p>{t("Vehicle Spare Parts")}</p>
              </Link>
              <p className="mx-1">/ Add Vehicle Spare Parts</p>
              <p>
                {/* <span className="mx-1">/</span>{t("Add Vehicle Spare Details")} */}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/EditVehicleSpareParts") && (
            <div className="main-heading">
              <Link to="/VehicleSpareParts">
                <p>{t("Vehicle Spare Parts")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Edit Vehicle Spare Details")}
              </p>
            </div>
          )) ||
          /*Vehicle Fine*/
          (currentRoute.includes("/ViewVehicleFine") && (
            <div className="main-heading">
              <p></p>
              <Link to='/VehicleFine'>
                <p>{t("Vehicle Fine")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("View Vehicle Fine")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/VehicleFine") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Vehicle Fine")}</p>
            </div>
          )) ||
          (currentRoute.includes("/AddVehicleFine/") ? (
            <div className="main-heading">
              <Link to="/VehicleFine">
                <p>{t("Vehicle Fine")} </p>
              </Link>
              <p className="mx-1">/ Update Vehicle Fine</p>
              <p>
                {" "}
                {/* <span className="mx-1">/</span>{t("Add Vehicle Incident Details")} */}
              </p>
            </div>
          ) : null) ||
          (currentRoute.includes("/AddVehicleFine") && (
            <div className="main-heading">
              <Link to="/VehicleFine">
                <p>{t("Vehicle Fine")}</p>
              </Link>
              <p className="mx-1">/ Add Vehicle Fine</p>
              <p>
                {/* <span className="mx-1">/</span>{t("Add Vehicle Fine Details")} */}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/EditVehicleFine") && (
            <div className="main-heading">
              <Link to="/VehicleFine">
                <p>{t("Vehicle Fine")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Edit Vehicle Fine Details")}
              </p>
            </div>
          )) ||
          /*Fleet Maintenance*/
          (currentRoute.includes("/FleetMaintenance ") ||
            currentRoute.includes("/ViewFleetMaintainence") ? (
            <div className="main-heading">
              <p></p>
              <p>{t("Fleet Maintenance")}</p>
            </div>
          ) : null) ||
          (currentRoute.includes("/AddFleetMaintainence") && (
            <div className="main-heading">
              <Link to="/FleetMaintenance">
                <p>{t("Fleet Maintenance")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Add Fleet Maintenance")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/EditFleetMaintainence") && (
            <div className="main-heading">
              <Link to="/FleetMaintenance">
                <p>{t("Fleet Maintenance")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Edit Fleet Maintenance")}
              </p>
            </div>
          )) ||
          /*Fuel Expenses*/
          (currentRoute.includes("/ViewFuelExpenses") && (
            <div className="main-heading">
              <Link to='/FuelExpenses'>
                <p>{t("Fuel Expenses")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("View Fuel Expenses")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/FuelExpenses") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Fuel Expenses")}</p>
            </div>
          )) ||
          (currentRoute.includes("/AddFuelExpenses/") && (
            <div className="main-heading">
              <Link to="/FuelExpenses">
                <p>{t("Fuel Expenses")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Update Fuel Expenses")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/AddFuelExpenses") && (
            <div className="main-heading">
              <Link to="/FuelExpenses">
                <p>{t("Fuel Expenses")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Add Fuel Expenses")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/EditFuelExpenses") && (
            <div className="main-heading">
              <Link to="/FuelExpenses">
                <p>{t("Fuel Expenses")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Edit Fuel Expenses")}
              </p>
            </div>
          )) ||
          /*Dispatch Module*/
          (currentRoute.includes("/DispatchCustomer") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Dispatch Customer")}</p>
            </div>
          )) ||
          (currentRoute.includes("/ViewDispatch") && (
            <div className="main-heading">
              <Link to="/DispatchCustomer">
                <p>{t("Dispatch Customer")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Customer Details")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/AddDispatchCustomer") && (
            <div className="main-heading">
              <Link to="/DispatchCustomer">
                <p>{t("Dispatch Customer")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Add Customer Details")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/EditCustomerDispatch") && (
            <div className="main-heading">
              <Link to="/DispatchCustomer">
                <p>{t("Dispatch Customer")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Edit Customer Details")}
              </p>
            </div>
          )) ||
          /*Dispatch Order*/
          (currentRoute.includes("/DispatchOrder") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Orders")}</p>
            </div>
          )) ||
          (currentRoute.includes("/Importdata") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Import Orders")}</p>
            </div>
          )) ||

          (currentRoute.includes("/ViewOrders") && (
            <div className="main-heading">
              <Link to="/DispatchOrder">
                <p>{t("Orders")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Order Details")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/EditCustomerDispatch") && (
            <div className="main-heading">
              <Link to="/DispatchOrder">
                <p>{t("Dispatch Customer")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Edit Customer Details")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/ManualRouting") && (
            <div className="main-heading">
              <Link to="/DispatchOrder">
                <p>
                  {t("Order")}
                  <span className="mx-1">/</span>
                </p>
              </Link>
              <p>{t("Manual Routing")}</p>
            </div>
          )) ||
          /*Payment Module Invoiced*/
          (currentRoute.includes("/Invoiced") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Invoiced")}</p>
            </div>
          )) ||
          (currentRoute.includes("/InvoiceDetails") && (
            <div className="main-heading">
              <Link to="/Invoiced">
                <p>{t("Invoiced")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Invoice Details")}
              </p>
            </div>
          )) ||
          /*Payment Module Paid*/
          (currentRoute.includes("/Paid") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Paid Invoices")}</p>
            </div>
          )) ||
          (currentRoute.includes("/PaidPaymentReceipt") && (
            <div className="main-heading">
              <Link to="/Paid">
                <p>{t("Paid Invoices")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Receipt")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/PaidPaymentInvoice") && (
            <div className="main-heading">
              <Link to="/Paid">
                <p>{t("Paid Invoices")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Invoice")}
              </p>
            </div>
          )) ||
          /*Announcement*/
          (currentRoute.includes("/Announcement") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Announcements")}</p>
            </div>
          )) ||
          (currentRoute.includes("/Addaudio") && (
            <div className="main-heading">
              <Link to="/Announcement">
                <p>{t("Announcement")}</p>
              </Link>
              <p>{/* <span className="mx-1">/</span>{t("Add Audio")} */}</p>
            </div>
          )) ||
          (currentRoute.includes("/EditAudio") && (
            <div className="main-heading">
              <Link to="/Announcement">
                <p>{t("Announcement")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Edit Audio")}
              </p>
            </div>
          )) ||
          /*Email*/
          (currentRoute.includes("/Email") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Email")}</p>
            </div>
          )) ||
          (currentRoute.includes("/ComposeEmail") && (
            <div className="main-heading">
              <Link to="/Email">
                <p>{t("Email")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Compose Email")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/ComposeEmailHelpler") && (
            <div className="main-heading">
              <Link to="/Email">
                <p>{t("Email")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Compose Email")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/EmailDetails") && (
            <div className="main-heading">
              <Link to="/Email">
                <p>{t("Email")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Email Details")}
              </p>
            </div>
          )) ||
          /*Push Notification*/
          (currentRoute.includes("/PushNotification") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Push Notification")}</p>
            </div>
          )) ||
          (currentRoute.includes("/AddPushNotification") && (
            <div className="main-heading">
              <Link to="/PushNotification">
                <p>{t("Push Notification")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Add Push Notification")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/AddTripFleet") && (
            <div className="main-heading">
              <Link to="/PushNotification">
                <p>{t("Push Notification")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Add Push Notification")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/NotificationDetails") && (
            <div className="main-heading">
              <Link to="/PushNotification">
                <p>{t("Push Notification")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Notification Details")}
              </p>
            </div>
          )) ||


          ////////////////////////////////// /*Reports*///////////////////////////////////
          (currentRoute.includes("/ReportsAndStatisticsUsageAudit") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          ))
          ||
          (currentRoute.includes("/mobleAppUsageDetailsR") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          ))
          ||
          (currentRoute.includes("/TrackingdevicesAndSimDetailsR") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          ))
          || (currentRoute.includes("/lastLoginDetailsR") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          ))
          ||

          (currentRoute.includes("/MobileAppDetailsR") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          ))
          || (currentRoute.includes("/DataUsageR") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          ))
          ||
          (currentRoute.includes("/Reports") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Reports")}</p>
            </div>
          )) ||
          (currentRoute.includes("/Alert") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Reports")}</p>
              <span>{ReportHader}</span>
            </div>
          )) ||

          (currentRoute.includes("/Temperaturereport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/ScheduleReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>{t("Reports")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Schedule Report")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/GenerateCustomReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>{t("Reports")}</p>
              </Link>
              <p>
                <span className="mx-1">/</span>
                {t("Generate Custom Report")}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/ReportView") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/DriverListignitionReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/DriverBehaviourReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          )) ||

          (currentRoute.includes("/VehicleLocationReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          )) ||

          (currentRoute.includes("/ReportOverSpeedView") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span>     {ReportHader}
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/VehicleCountAndCapacity") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/ImmobiliserReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/ {t("IVMS Real Time Report")} / </span> {ReportHader}
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/RealTimeReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/DispatchReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/ Delivery Dispatch  Report /")}  </span> {ReportHader}
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/TripAssignedVersusCompleted") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/ Trip Report/ Trip Assigned Versus Completed")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/TripActivityReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/ Trip Report/ Trip Activity Report")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/TripVersusPickupCount") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/ Trip Report/ Trip Versus Pickup Count")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/TripManifestReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/ Trip Report/ Trip Manifest Report")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/LiveTripLocationReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/ Trip Report/ Live Trip Location Report")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/DriverActivetySummaryReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/ Trip Report/ Driver Activety Summary Report ")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/PickUpPointReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/ Trip Report/ Pick Up Point Report")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/DriverLicenceExpiryReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/Maintenance Report / Driver Licence Expiry Report")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/InspectionDueReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/Maintenance Report / Inspection Due Report")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/InsuranceExpiryReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/Maintenance Report / Insurance Expiry Report")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/RegistrationExpiryReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/Maintenance Report /Registration Expiry Report")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/TaxExpiryReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/Maintenance Report /Tax Expiry Report")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/MaintenanceOverduesReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/Maintenance Report / Maintenance Overdues Report")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/MaintenanceDuesSoonReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/Maintenance Report / Maintenance Dues Soon Report")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/VehicleExpenseReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/Expence Report /Vehicle Expense Report")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/VehicleFuelExpenseReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">{t("/Expence Report /Vehicle Fuel Expense Report")}  </span>
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/VehicleparkingSlot") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/TripScheduleEta") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/VehicleLocationSignal") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>
                  {t("Reports")}
                  <span className="mx-1">/</span> {ReportHader}
                </p>
              </Link>

            </div>
          )) ||
          (currentRoute.includes("/ConfigurationChecker") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Application Configuration Checker")}</p>
            </div>
          )) ||
          (currentRoute === "/AddParkingManagement" && (
            <div className="main-heading">
              <Link to="/ParkingManagement">
                <p>
                  {t("Parking Management")}
                  <span className="mx-1">/</span>
                </p>
              </Link>
              <p>{t("Add Parking Station")}</p>
            </div>
          )) ||
          (currentRoute.includes("/ParkingManagement") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Parking Management")}</p>
            </div>
          )) ||
          (currentRoute === "/FeatureSet" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Hardware Feature Set")}</p>
            </div>
          )) ||
          (currentRoute.includes("/FuelManagementDashbord") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Fuel Management")}</p>
            </div>
          )) ||
          (currentRoute.includes("/FuelManagementDetails") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Fuel Management")}</p>
            </div>
          )) ||
          (currentRoute.includes("/FuelAlerts") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Fuel Alerts")}</p>
            </div>
          )) ||
          /*Master Setting Routes  */
          (currentRoute.includes("/MyProfile") && (
            <div className="main-heading">
              <p></p>
              <p>{t("My Profile")}</p>
            </div>
          )) ||
          (currentRoute.includes("/ReplayPlayback") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Playback's")}</p>
            </div>
          )) ||
          ((currentRoute === "/ViewReport" ||
            currentRoute === "/ReportIssue") && (
              <div className="main-heading">
                <Link to="/CustomerSupport">
                  <p>
                    {t("Customer Support")}
                    <span className="mx-1">/</span>
                  </p>
                </Link>
                <Link to="/CustomerSupport">
                  <p>
                    {t("Email Support")}
                    <span className="mx-1">/</span>
                  </p>
                </Link>
                <p>{t("Report Issue")}</p>
              </div>
            )) ||
          (currentRoute.includes("/CustomerSupport") && (
            <div className="main-heading">
              <p></p>
              <p>{t("Customer Support")}</p>
            </div>
          )) ||
          (currentRoute.includes("/EmailSupport") && (
            <div className="main-heading">
              <Link to="/CustomerSupport">
                <p>
                  {t("Customer Support")}
                  <span className="mx-1">/</span>
                </p>
              </Link>
              <p>{t("Email Support")}</p>
            </div>
          )) ||
          (currentRoute.includes("/EditProfile") && (
            <div className="main-heading">
              <Link to="/MyProfile">
                <p>
                  {t("My Profile")} <span className="mx-1">/</span>
                </p>
              </Link>
              <p>{t("Update Profile")}</p>
            </div>
          )) ||
          (currentRoute.includes("/ChangePasswordProfile") && (
            <div className="main-heading">
              <Link to="/MyProfile">
                <p>
                  {t("My Profile")} <span className="mx-1">/</span>
                </p>
              </Link>
              <p>{t("Change Password")}</p>
            </div>
          )) ||
          (currentRoute.includes("/DeliveryRequest") && (
            <div className="main-heading">
              <Link to="/DispatchOrder">
                <p>
                  {t(" Orders")} <span className="mx-1">/</span>
                </p>
              </Link>
              <p></p>
              <p>{t("Delivery Request")}</p>
            </div>
          )) ||
          (currentRoute.includes("/AddMerchant") && (
            <div className="main-heading">
              <Link to="/Merchant">
                <p>
                  {t(" Merchant")} <span className="mx-1">/</span>
                </p>
              </Link>
              <p>{t("Add  Merchant")}</p>
            </div>
          )) ||
          (currentRoute.includes("/AddOrder") && (
            <div className="main-heading">
              <Link to="/DispatchOrder">
                <p>
                  {t("Orders")} <span className="mx-1">/</span>
                </p>
              </Link>
              <p>{t("Add Order")}</p>
            </div>
          )) ||
          (currentRoute.includes("/AddMerchant") && (
            <div className="main-heading">
              <Link to="/Merchant">
                <p>
                  {t(" Merchant")} <span className="mx-1">/</span>
                </p>
              </Link>
              <p>{t("Add  Merchant")}</p>
            </div>
          ))

          ||
          (currentRoute.includes("/VehicleNotification") && (
            <div className="main-heading">
              <Link to="/VehicleNotification">
                <p>
                  {t("Vehicle Notification")} <span className="mx-1"></span>
                </p>
              </Link>
            </div>
          )) ||
          (currentRoute.includes("/VehicleInspectionSettings") && (
            <div className="main-heading">
              <Link to="/VehicleInspectionSettings">
                <p>
                  {t("Vehicle Inspection Settings")}{" "}
                  <span className="mx-1"></span>
                </p>
              </Link>
            </div>
          )) ||
          (currentRoute.includes("/OfferVehicleMarketPlace") && (
            <div className="main-heading">
              <p></p>
              <p>
                {t("Offer Vehicle Market Place")}{" "}
                <span className="mx-1"></span>
              </p>
            </div>
          )) || (currentRoute.includes("/OfferDriverMarketPlace") && (
            <div className="main-heading">
              <p></p>
              <p>
                {t("Offer Driver Market Place")}{" "}
                <span className="mx-1"></span>
              </p>
            </div>
          )) ||
          // ////// Taleeb's Code
          (currentRoute.includes("/DriverActivertiyReport") && (
            <div className="main-heading">
              <Link to="/Reports">
                <p>{t("Driver Report / Driver Activity Report")}  </p>

              </Link>
              <p>
                {/* {t("Driver Report / Driver Activity Report")} {" "} */}
                <span className="mx-1"></span>
              </p>
            </div>
          )) ||
          // ////////////
          (currentRoute.includes("/DirectOrderMarketPlace") && (
            <div className="main-heading">
              <p></p>
              <p>
                {t("Direct Order Market Place")}{" "}
                <span className="mx-1"></span>
              </p>
            </div>
          )) ||
          (currentRoute.includes("/OnlineAuction") && (
            <div className="main-heading">
              <p></p>
              <p>
                {t("Online Auction")}{" "}
                <span className="mx-1"></span>
              </p>
            </div>
          )) ||
          (currentRoute.includes("/VehicleInspection") && (
            <div className="main-heading">
              <p></p>
              <p>
                {t("Vehicle Inspection")}{" "}
              </p>
            </div>
          )) ||
          (currentRoute.includes("/EditMerchant") && (
            <div className="main-heading">
              <Link to="/Merchant">
                <p>
                  {t(" Merchant")} <span className="mx-1">/</span>
                </p>
              </Link>
              <p>{t("Edit  Merchant")}</p>
            </div>
          )) ||
          (currentRoute.includes("/ViewMerchant") && (
            <div className="main-heading">
              <Link to="/Merchant">
                <p>
                  {t(" Merchant")} <span className="mx-1">/</span>
                </p>
              </Link>
              <p>{t(" Merchant Details")}</p>
            </div>
          )) ||
          (currentRoute.includes("/Merchant") && (
            <div className="main-heading">
              <p></p>
              <p>{t(" Merchant")}</p>
            </div>
          )) ||
          (currentRoute == "/VehicleBooking" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Vehicle Booking Request")}</p>
            </div>
          )) ||
          (currentRoute == "/VehicleBooking2" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Vehicle Booking Request")}</p>
            </div>
          ))
          ||
          (currentRoute == "/VehicleBookingList" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Vehicle Booking Order")}</p>
            </div>
          )) ||
          (currentRoute == "/MyMessages" && (
            <div className="main-heading">
              <p></p>
              <p>{t("My Messages")}</p>
            </div>
          ))
          ||
          (currentRoute == "/TeamMessages" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Team Messages")}</p>
            </div>
          )) ||
          (currentRoute == "/ComposeMessage" && (
            <div className="main-heading">
              <p></p>
              <Link to="/MyMessages">
                <p>{t("My Messages")}</p>
              </Link>
            </div>
          ))
          ||
          (currentRoute == "/TeamComposeMessage" && (
            <div className="main-heading">
              <p></p>
              <Link to="/TeamMessages">
                <p>{t("Team Messages")}</p>
              </Link>
            </div>
          ))

          || (currentRoute == "/VehicleInspectionDashboard" && (
            <div className="main-heading">
              <p></p>
              <p>{t("Vehicle Inspection Dashboard")}</p>
            </div>
          )) ||
          // My messages
          (currentRoute.includes("/MyMessages ") ||
            currentRoute.includes("/ComposeMessage") ? (
            <div className="main-heading">
              <p></p>
              <Link to="/MyMessages">
                <p>{t("My Messages")}</p>
              </Link>
            </div>
          ) : (
            ""
          ))

          ||
          (currentRoute === UserRoleRoute && (
            <div className="main-heading">
              <p></p>
              <p>{t(capitalizeFirstLetter(UserRole == "dispatchexecutive" ? "Vehicle Attendent" : UserRole))}</p>
            </div>
          ))

          ||
          // My messages
          (currentRoute.includes("/AddDynamicUser") ? (
            <div className="main-heading">
              <p></p>
              <Link to={UserRoleRoute}>
                <p>{t(capitalizeFirstLetter(UserRole == "dispatchexecutive" ? "Vehicle Attendent" : UserRole))}</p>
              </Link>
            </div>
          ) : "")
          ||
          (currentRoute.includes("/DynamicPassword") ? (
            <div className="main-heading">
              <p></p>
              <Link to={UserRoleRoute}>
                <p>{t(capitalizeFirstLetter(UserRole == "dispatchexecutive" ? "Dispatch Executive" : UserRole))}/changePassword</p>
              </Link>
            </div>
          ) : "")
          ||
          (currentRoute.includes("/ViewDynamic") ? (
            <div className="main-heading">
              <p></p>
              <Link to={UserRoleRoute}>
                <p>{t(capitalizeFirstLetter(UserRole == "dispatchexecutive" ? "Vehicle Attendent" : UserRole))}</p>
              </Link>
            </div>
          ) : "")

        }

        {dynamicComponents &&
          dynamicComponents?.map((item, index) => {
            return (
              <div key={"dynamic" + index}>
                {currentRoute.includes(item.role_name) ||
                  currentRoute.includes(item.role_name) ? (
                  <div className="main-heading">
                    <p></p>
                    <Link to={`${UserRoleRoute == "dispatchexecutive" ? "Dispatch Executive" : UserRoleRoute}`}>

                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}

        <header className="d-flex">
          {/* <button onClick={()=>setGoogleMap(!googleMap)} className="btn-map-change ">
            {googleMap ? <span>Leaflet Map</span> : <span>Google Map</span>}
          </button> */}
          {((userRole === "customer") || (accessRights?.rights_dashboard_map === 1)) && <Link to="/dashboard">
            <label htmlFor="" >
              <span>
                <img src={online} alt="" />
              </span>
              {onlineCount ? onlineCount : 0} {t("Vehicles Online")}
            </label>
          </Link>}

          {/* <Link to="#" className="bell">
            <img src={earth} className="bellyIcon" alt="" />
          </Link> */}
          {/* <Link to="#" className="bell">
            <img src={bell} className="bellyIcon" alt="" />
          </Link> */}
          <Dropdown
            className="notification-header"
            id="notification_header_responsive"
          >
            {(accessRights?.rights_manage_notification_settings === 1) && <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="header-prfl-img"
            >
              <Link to="/VehicleNotification" className="import-icon">
                <img src={bell} className="bellyIcon" alt="" />
              </Link>
            </Dropdown.Toggle>}

            {/* <Dropdown.Menu>
              <div className="main-wrapper">
                <img src={DropDownTopArrow} className="toparrow" alt="" />
                <div className="stepper"></div>
                <div className="contain">
                  <img src={HeaderStepper1} alt="" />
                  <div className="body">
                    <p className="heading">Monday, 6th Apirl 2020</p>
                    <p className="sunHeading">Book for General Service</p>
                    <p className="action">COMPLETED</p>
                  </div>
                </div>
              </div>
              <div className="main-wrapper">
                <div className="stepper"></div>
                <div className="contain">
                  <img src={HeaderStepper2} alt="" />
                  <div className="body">
                    <p className="heading">Thursday, 24th October 2021</p>
                    <p className="sunHeading">
                      Vehicle LV 001 has been marked for recall.
                    </p>
                    <p className="dedline">14:07-21/11/2021</p>
                  </div>
                </div>
              </div>
              <div className="main-wrapper">
                <div className="stepper2"></div>
                <div className="contain">
                  <img src={HeaderStepper3} alt="" />
                  <div className="body">
                    <p className="heading">Monday, 13th August 2018</p>
                    <p className="sunHeading">Maintenance Completed, Collect</p>
                    <p className="dedline">14:07-21/11/2021</p>
                  </div>
                </div>
              </div>
            </Dropdown.Menu> */}
          </Dropdown>

          {addonSettingData.addon_ghatke == 1 ? <> </> : (
            <Link to='MyMessages' >

              <div className="d-flex flex-column mr-2" >

                <Stack className="badge-div ms-1" direction="horizontal" gap={2}>
                  <Badge className="badge" style={{ backgroundColor: '#9C4900' }} bg="#9C4900">{ChatCount} </Badge> </Stack>

                <Accordion id="inner_header" style={{ marginRight: '1rem' }}>

                  <Dropdown className="header-dropDown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="header-prfl-img"
                    >
                      <img src={
                        chat

                      }
                        // onError={(ev) => {
                        //   handleErrorImage(ev);
                        // }}
                        className="bellyIcon" alt=""
                        height='2px' width='2px'
                      />
                    </Dropdown.Toggle>


                  </Dropdown>

                </Accordion>
              </div>
            </Link>
          )}
          <Accordion id="inner_header">
            <Dropdown className="header-dropDown">
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="header-prfl-img"
              >
                <img src={
                  proFileDetails?.user_profile_pic
                    ? ApiConfig.BASE_URL_FOR_IMAGES_L + proFileDetails?.user_profile_pic
                    : ImportUser

                }
                  onError={(ev) => {
                    handleErrorImage(ev);
                  }}
                  className="bellyIcon" alt=""

                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <img src={DropDownTopArrow} className="toparrow" alt="" />
                <Dropdown.Item>
                  <Link to="/MyProfile">{t("My Profile")}</Link>
                </Dropdown.Item>
                {/*{((userRole === "customer" || accessRights?.rights_view_chat_support === 1)) && <Dropdown.Item>
                  <Link to="/MyMessages">{t("My Messages")}</Link>
                </Dropdown.Item>}*/}

                {/*  {((userRole === "customer" || accessRights?.rights_view_chat_support === 1)) && <Accordion.Item eventKey="0">
                  <Accordion.Header>{t("Customer Support")}</Accordion.Header>
                  <Accordion.Body>
                    <Link to="/Email">{t("Email")}</Link>
                    <Link to="/MyMessages">{t("Chat")}</Link>
                  </Accordion.Body>
                </Accordion.Item>}*/}
                <Accordion.Item eventKey="1">
                  <Accordion.Header>{t("My Language")}</Accordion.Header>
                  <Accordion.Body>
                    {/* <LangDropDown/> */}
                    <DropdownLanguage />
                  </Accordion.Body>
                </Accordion.Item>
                {/* <Dropdown.Item>
                  <Link to="/LockScreen">{t("Lock Screen")}</Link>
                </Dropdown.Item> */}
                <Dropdown.Item>
                  <Link to="#" onClick={logout}>
                    {t("Logout")}
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Accordion>
          {/* <Link to="#" className="header-prfl-img">
            <img src={profile} className="bellyIcon" alt="" />
          </Link> */}
        </header>
      </div>
    </div>
  );
};

export default Header;

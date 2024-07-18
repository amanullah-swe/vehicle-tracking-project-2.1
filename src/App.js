import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Router,
  NavLink,
} from "react-router-dom";
import React, { Suspense, useMemo } from "react";
//line coment bcoz of overrideing css in //
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/main.scss";
import Sidebar from "./sharedComponent/Sidebar";
import Header from "./sharedComponent/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import "react-datepicker/dist/react-datepicker.css";

// import AddOnSettingsCart from "./pages/MasterSettings/AddOnSettingsCart";
import Holidays from "./pages/MasterData/Holidays";
import AddHolidays from "./pages/MasterData/AddHolidays";
import Vacations from "./pages/MasterData/Vacations";
import AddVacation from "./pages/MasterData/AddVacation";

// import UpdateCustomerProfile from "./pages/MasterSettings/UpdateCustomerProfile";
// import LogoUpdate from "./pages/MasterSettings/LogoUpdate";
import Login from "./pages/AuthPages/Login";
import ForgetPassword from "./pages/AuthPages/ForgetPassword";
import Registration from "./pages/AuthPages/Registration";
import DemoAccount from "./pages/AuthPages/DemoAccount";
import Vehicle from "./pages/MasterData/Vehicle";
import AddVehicle from "./pages/MasterData/AddVehicle";
import LoginWithOTP from "./pages/AuthPages/LoginWithOTP";
import Animation from "./pages/AuthPages/Animation";

import AddVehicleCategory from "./pages/MasterData/AddVehicleCategory";
import ParkingSlot from "./pages/parkingSlot/ParkingSlot";
import AddParkingSlot from "./pages/parkingSlot/AddParkingSlot";
import RegistrationLocation from "./pages/AuthPages/RegistrationLocation";
import PointOfIntrest from "./pages/pointsOfIntrest/PointOfIntrest";
import AddPointOfInterest from "./pages/pointsOfIntrest/AddPointOfInterest";
import GeofenceArea from "./pages/geofenceArea/GeofenceArea";
import NewSyncRequest from "./pages/MasterData/NewSyncRequest";
import AddGeofenceArea from "./pages/geofenceArea/AddGeofenceArea";
import VehicleAccident from "./pages/vehicleExpenses/vehicleAccident/VehicleAccident";
import AddVehicleAccident from "./pages/vehicleExpenses/vehicleAccident/AddVehicleAccident";
import EditVehicleAccident from "./pages/vehicleExpenses/vehicleAccident/EditVehicleAccident";
import VehicleDetails from "./pages/MasterData/VehicleDetails";
import AddVehicleGroup from "./pages/MasterData/AddVehicleGroup";
import MyProfile from "./pages/Account/MyProfile";
import EditProfile from "./pages/Account/EditProfile";
import ChangePasswordProfile from "./pages/Account/ChangePasswordProfile";
import MyMessages from "./pages/Account/MyMessages";
import ComposeMessage from "./pages/Account/ComposeMessage";
import ChatBox from "./pages/Account/ChatBox";
import ViewVehicleAccident from "./pages/vehicleExpenses/vehicleAccident/ViewVehicleAccident";
import ViewVehicleAccesory from "./pages/vehicleExpenses/vehicleAccesory/ViewVehicleAccesory";
import AddVehicleAccesory from "./pages/vehicleExpenses/vehicleAccesory/AddVehicleAccesory";
import VehicleAccesory from "./pages/vehicleExpenses/vehicleAccesory/VehicleAccesory";
import VehicleSpareParts from "./pages/vehicleExpenses/vehicleSpareParts/VehicleSpareParts";
import AddVehicleSpareParts from "./pages/vehicleExpenses/vehicleSpareParts/AddVehicleSpareParts";
import EditVehicleSpareParts from "./pages/vehicleExpenses/vehicleSpareParts/EditVehicleSpareParts";
import ViewVehicleSpareParts from "./pages/vehicleExpenses/vehicleSpareParts/ViewVehicleSpareParts";
import VehicleFine from "./pages/vehicleExpenses/vehicleFine/VehicleFine";
import AddVehicleFine from "./pages/vehicleExpenses/vehicleFine/AddVehicleFine";
import ViewVehicleFine from "./pages/vehicleExpenses/vehicleFine/ViewVehicleFine";
import EditVehicleFine from "./pages/vehicleExpenses/vehicleFine/EditVehicleFine";
import CustomerSupport from "./pages/Account/CustomerSupport";
import FuelExpenses from "./pages/vehicleExpenses/FuelExpenses/FuelExpenses";
import AddFuelExpenses from "./pages/vehicleExpenses/FuelExpenses/AddFuelExpenses";
import EditFuelExpenses from "./pages/vehicleExpenses/FuelExpenses/EditFuelExpenses";
import ViewFuelExpenses from "./pages/vehicleExpenses/FuelExpenses/ViewFuelExpenses";
// import TripManagement from "./pages/TripManagement/TripManagement";
// import ViewDispatchTrip from "./pages/TripManagement/ViewDispatchTrip";
// import EditDispatchTrip from "./pages/TripManagement/EditDispatchTrip";
import DispatchCustomer from "./pages/Dispatch/DispatchCustomer/DispatchCustomer";
import ViewDispatch from "./pages/Dispatch/DispatchCustomer/ViewDispatch";
import EditCustomerDispatch from "./pages/Dispatch/DispatchCustomer/EditCustomerDispatch";
import DispatchOrder from "./pages/Dispatch/DispatchOrder/DispatchOrder";
import ViewOrders from "./pages/Dispatch/DispatchOrder/ViewOrders";
import OrderImporData from "./pages/Dispatch/DispatchOrder/OrderImporData.js";
// import EditStop from "./pages/TripManagement/EditStop";
// import ViewStop from "./pages/TripManagement/ViewStop";
import ManualRouting from "./pages/Dispatch/DispatchOrder/ManualRouting";
// import UpdateCustomerLogo from "./pages/MasterSettings/UpdateCustomerLogo";
import LockScreen from "./pages/Account/LockScreen";

import Announcement from "./pages/vehicleExpenses/Communication/Announcement";
import Addaudio from "./pages/vehicleExpenses/Communication/Addaudio";
import EditAudio from "./pages/vehicleExpenses/Communication/EditAudio";
import Email from "./pages/vehicleExpenses/Communication/Email";
import EmailDetails from "./pages/vehicleExpenses/Communication/EmailDetails";
import ComposeEmail from "./pages/vehicleExpenses/Communication/ComposeEmail";
import PushNotification from "./pages/vehicleExpenses/Communication/PushNotification";
import NotificationDetails from "./pages/vehicleExpenses/Communication/NotificationDetails";
import AddPushNotification from "./pages/vehicleExpenses/Communication/AddPushNotification";
import Reports from "./pages/vehicleExpenses/Report/Reports";
import GenerateCustomReport from "./pages/vehicleExpenses/Report/GenerateCustomReport";
import ScheduleReport from "./pages/vehicleExpenses/Report/ScheduleReport";
import ReportView from "./pages/vehicleExpenses/Report/ReportView";
import TripVersusPickupCount from "./pages/vehicleExpenses/Report/TripReportView/TripVersusPickupCount"
import UnplannedTripsAutorouting from "./pages/vehicleExpenses/Report/UnplannedTripsAutorouting/UnplannedTripsAutorouting";


import ConfigurationChecker from "./pages/ConfigurationChecker";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import EmailSupport from "./pages/Account/EmailSupport";
import Aos from "aos";
import "aos/dist/aos.css";
import ParkingManagement from "./pages/ParkingManagement/ParkingManagement";
import ReplayPlayback from "./pages/ReplayPlayback/ReplayPlayback";
// import FuelManagementDashbord from "./pages/FuelManagement/FuelManagementDashbord";
// import FuelManagementDetails from "./pages/FuelManagement/FuelManagementDetails";
// import FuelAlerts from "./pages/FuelManagement/FuelAlerts";
import { AppContext } from "./context/AppContext";
import AddTripFleet from "./pages/vehicleExpenses/Communication/AddTripFleet";
import InfoComponent from "./sharedComponent/SupportHelp/InfoComponent";
import NotificationDetails2 from "./pages/vehicleExpenses/Communication/NotificationDetails2";
import DeliveryRequest from "./pages/Dispatch/Delivery/DeliveryRequest";
import AddOrderGhatge from "./pages/Dispatch/Delivery/AddOrderGhatge";
import VehicleBooking from "./pages/Dispatch/Vehicle_Booking/VehicleBooking";
import VehicleBooking2 from "./pages/Dispatch/Vehicle_Booking/VehicleBooking2";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import { useSelector } from "react-redux";
import UserAlert from "./pages/UserDashboard/UserAlert";
import ComposeEmailHelpler from "./pages/vehicleExpenses/Communication/ComposeEmailHelpler";
import Merchant from "./pages/Dispatch/Merchant/Merchant";
import EmailDetailsDriver from "./pages/vehicleExpenses/Communication/EmailDetailsDriver";
import VehicleInspection from "./pages/VehicleInspection/VehicleInspection";
import NewInspection from "./pages/VehicleInspection/NewInspection";
import NewVehicleInspection from "./pages/VehicleInspection/NewVehicleInspection";
import ViewInspectionDetails from "./pages/VehicleInspection/ViewInspectionDetails";
import VehicleBookingList from "./pages/Dispatch/Vehicle_Booking/VehicleBookingList";
import AddVehicleMaintenance from "./pages/vehicleExpenses/VehicleMaintenance/AddVehicleMaintenance";
import VehicleMaintenance from "./pages/vehicleExpenses/VehicleMaintenance/VehicleMaintenance";
import ViewVehicleMaintenance from "./pages/vehicleExpenses/VehicleMaintenance/ViewVehicleMaintenance";
import VehicleInspectionDashboard from "./pages/VehicleInspection/VehicleInspectionDashboard.js";
import InspectionPDF from "./pages/VehicleInspection/InspectionPDF";
// import ShareTrip from "./pages/TripManagement/ShareTrip";
import { notifyError, notifySuccess } from "./sharedComponent/notify";

import VehicleNotification from "./pages/vehicleExpenses/VehicleMaintenance/VehicleNotification";
// import VehicleInspectionSettings from "./pages/MasterSettings/VehicleInspectionSettings";
// import AddVehicleInspectionSetting from "./pages/MasterSettings/AddVehicleInspectionSetting";
// import AddVehicleInspection2 from "./pages/MasterSettings/AddVehicleInspection2";
// import VehicleInspectionTab from "./pages/MasterSettings/VehicleInspectionTab";


import DashboardShare from "./pages/Dashboard/DashboardShare";


import OtpVerification from "./pages/Account/OtpVerification";
import NoPage from "./sharedComponent/NoPage";
import { isValidRoute } from "./sharedComponent/IsRouteValidation";
import DispatchDashboard from "./pages/VehicleInspection/DispatchDashboard.js";
import DashboardDispatch from "./pages/Dispatch/DispatchOrder/DashboardDispatch.js";

// abubakar import for report
// import TripReport from "./pages/vehicleExpenses/Report/DefaultReports/TripReport/Test.js";
import Test from "./pages/vehicleExpenses/Report/DefaultReports/TripReport/Test.js";
import TripActivity from "./pages/vehicleExpenses/Report/DefaultReports/TripReport/TripActivity.js";
import VehicleRunningReport from "./pages/vehicleExpenses/Report/DefaultReports/VehicleRunningReport/VehicleRunningReport.js";
import NewUiReport from "./pages/vehicleExpenses/Report/DefaultReports/VehicleRunningReport/NewUiReport.js";
import { latestDate } from "./sharedComponent/common.js";
import VehicleLocationReport from "./pages/vehicleExpenses/Report/DefaultReports/VehicleLocationReport";
import VehicleCountAndCapacity from "./pages/vehicleExpenses/Report/DefaultReports/VehicleCountAndCapacity.js";
import VehicleparkingSlot from "./pages/vehicleExpenses/Report/DefaultReports/VehicleparkingSlot.js";
import ReportOverSpeedView from "./pages/vehicleExpenses/Report/ReportOverSpeedView.js";
import VehicleLocationSignal from "./pages/vehicleExpenses/Report/DefaultReports/VehicleLocationSignal.js";
import Alert from "./pages/vehicleExpenses/Report/Alertsview/Alert.js";
import ImmobiliserReport from "./pages/vehicleExpenses/Report/DefaultReports/ImmobiliserReport.js";
import DeliveryReports from "./pages/vehicleExpenses/Report/DeliveryReports.js";
import RealTimeTrackingReport from "./pages/vehicleExpenses/Report/RealTimeTrackingReport.js";
import DispatchReport from "./pages/vehicleExpenses/Report/DispatchReport.js";
import Temperaturereport from "./pages/vehicleExpenses/Report/Temperaturesensorreports/Temperaturereport.js";
import Register from "./pages/AuthPages/Register.js";
import BackDropLoader from "./sharedComponent/BackDropLoader.js";
import TripScheduleEta from "./pages/vehicleExpenses/Report/TripScheduleEta.js";
import DriverListignitionReport from "./pages/vehicleExpenses/Report/DriverListignitionReport.js";
import DriverBehaviourReport from "./pages/vehicleExpenses/Report/DriverBehaviourReport.js";
import DriverActivertiyReport from "./pages/vehicleExpenses/Report/DriverActivertiyReport.js";
import ViewOrdersShare from "./pages/Dispatch/DispatchOrder/ViewOrdersShare.js";
import DispatchCustomerOrderReport from "./pages/vehicleExpenses/Report/TripReportView/DispatchCustomerOrderReport.js";
import LiveTripLocationReport from "./pages/vehicleExpenses/Report/TripReportView/LiveTripLocationReport.js";
import TripAssignedVersusCompleted from "./pages/vehicleExpenses/Report/TripReportView/TripAssignedVersusCompleted.js";
import TripManifestReport from "./pages/vehicleExpenses/Report/TripReportView/TripManifestReport.js";
import TripActivityReport from "./pages/vehicleExpenses/Report/TripReportView/TripActivityReport.js";
import PickUpPointReport from "./pages/vehicleExpenses/Report/TripReportView/PickUpPointReport.js";
import { useTranslation } from "react-i18next";
import DriverActivetySummaryReport from "./pages/vehicleExpenses/Report/TripReportView/DriverActivetySummaryReport.js";
import AddNewOrder from "./pages/Dispatch/Dispatch Executive/AddNewOrder";
import DispatchViewOrder from "./pages/Dispatch/Dispatch Executive/DispatchViewOrder/DispatchViewOrder";
import ViewInvoice from "./pages/Dispatch/Dispatch Executive/ViewInvoice/ViewInvoice";
import EditInvoice from "./pages/Dispatch/Dispatch Executive/EditInvoice/EditInvoice";
import TeamMessages from "./pages/Account/TeamMessages.js";
import TeamComposeMessage from "./pages/Account/TeamComposeMessage.js";
import MaintenanceOverduesReport from "./pages/vehicleExpenses/Report/MaintenanceViewReport/MaintenanceOverduesReport.js";
import VehicleExpenseReport from "./pages/vehicleExpenses/Report/ExpenceReports/VehicleExpenseReport.js";
import VehicleFuelExpenseReport from "./pages/vehicleExpenses/Report/ExpenceReports/VehicleFuelExpenseReport.js";
import DriverLicenceExpiryReport from "./pages/vehicleExpenses/Report/MaintenanceViewReport/DriverLicenceExpiryReport.js";
import MaintenanceDuesSoonReport from "./pages/vehicleExpenses/Report/MaintenanceViewReport/MaintenanceDuesSoonReport.js";
import InspectionDueReport from "./pages/vehicleExpenses/Report/MaintenanceViewReport/InspectionDueReport.js";
import InsuranceExpiryReport from "./pages/vehicleExpenses/Report/MaintenanceViewReport/InsuranceExpiryReport.js";
import RegistrationExpiryReport from "./pages/vehicleExpenses/Report/MaintenanceViewReport/RegistrationExpiryReport.js";
import TaxExpiryReport from "./pages/vehicleExpenses/Report/MaintenanceViewReport/TaxExpiryReport.js";
import EditMerchant_temp from "./pages/Dispatch/Merchant/EditMerchant_temp";
import SystemReportsAndStatisticsUsageAudit from "./pages/vehicleExpenses/Report/usageStatisticsReport/SystemReportsAndStatisticsUsageAudit.js";
import DataUsageViewReport from "./pages/vehicleExpenses/Report/usageStatisticsReport/DataUsageViewReport.js";
import ViewMobileAppDetails from "./pages/vehicleExpenses/Report/usageStatisticsReport/ViewMobileAppDetails.js";
import TrackingdevicesAndSimDetails from "./pages/vehicleExpenses/Report/usageStatisticsReport/TrackingdevicesAndSimDetails.js";
import LastLoginDetails from "./pages/vehicleExpenses/Report/usageStatisticsReport/LastLoginDetails.js";
import MobileAppUsageDetails from "./pages/vehicleExpenses/Report/usageStatisticsReport/MobileAppUsageDetails.js";

const routes = [
  "/ShareTrip",
  "/DashboardShare",
  "/ViewOrdersShare"
  // { path: "/", name: "login", Component: Login },
  // { path: "/LoginWithOTP", name: "loginwithotp", Component: LoginWithOTP },
];
function App() {
  // ////////Taleeb's Code Start ///////////
  const { i18n, t } = useTranslation();
  useEffect(() => {
    // Set the language in i18n when the component mounts

    i18n.changeLanguage(localStorage.getItem('language'));

  }, []);

  // ////////////// Taleeb's Code End ///////////////

  let accessRights = useSelector((state) => state.auth.accessRights);
  const addonSettingData = useSelector((state) => state.auth.addonModule);
  const userRole = accessRights && accessRights.rights_role;
  const {
    setPositionCercle,
    setPositionRectangle,
    setPostionPolygon,
    setPostionRadius,
    setMapLatLngData,
    setLayerTypeSend,
    setRadius,
    components,
    userListRole,
    backDrop,
    help_setting_disable, set_help_setting_disable
  } = useContext(AppContext);
  const location = useLocation();
  let currentRoute = location.pathname;

  const navigate = useNavigate();
  const logedIn = useSelector((state) => state.auth.login);
  // const [logedIn, setLoggedIn] = useState(
  //   localStorage.getItem("logedIn") ? localStorage.getItem("logedIn") : false
  // );
  useEffect(() => {
    if (!logedIn) {
      if (
        currentRoute.includes("ShareTrip") ||
        currentRoute.includes("DashboardShare") ||
        currentRoute.includes("ViewOrdersShare") ||
        currentRoute.includes("ForgetPassword") ||
        currentRoute.includes("OtpVerification") ||
        currentRoute.includes("Registration") ||
        currentRoute.includes("Register") ||
        currentRoute.includes("DemoAccount") ||
        currentRoute.includes("LoginWithOTP") ||
        currentRoute.includes("Animation") ||
        currentRoute.includes("RegistrationLocation") ||
        currentRoute.includes("LockScreen")
      ) {
        navigate(currentRoute);
      } else navigate("/");
    } else {
      if (currentRoute !== "/") {
        if (
          isValidRoute(
            currentRoute,
            userListRole,
            accessRights,
            addonSettingData,
            "NoRole",
            userRole
          )
        ) {
          navigate(currentRoute);
        } else {
          notifyError(
            t("You don't have the right to access this page. Please contact the administrator for the necessary access rights.")
          );
          if (accessRights && accessRights?.rights_dashboard_map) {
            navigate("/dashboard");
          } else {
            navigate("/MyProfile");
          }
        }
      } else {
        if (accessRights && accessRights?.rights_dashboard_map) {
          navigate("/dashboard");
        } else {
          navigate("/MyProfile");
        }

        // navigate("/dashboard")
      }
    }
  }, [logedIn, currentRoute, accessRights]);

  // useEffect(() => {
  //   if (!logedIn) {
  //     navigate("/");
  //   } else {
  //     if (currentRoute !== "/") {
  //       navigate(currentRoute);
  //     } else navigate("/dashboard");
  //   }
  // }, [logedIn, currentRoute]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  useEffect(() => {
    setPostionPolygon([]);
    setPositionRectangle([]);
    setPositionCercle([]);
    setPostionRadius("");
    setRadius("");
    setLayerTypeSend("");
    setMapLatLngData([]);
  }, [currentRoute]);

  const dynamicComponents = userListRole;

  return (
    <>
      {backDrop && <BackDropLoader />}
      <ToastContainer />
      <Suspense fallback={<div>{t("Loading...")} </div>}>
        <div className="container auth-container">
          {/* <AnimatedRoutes/> */}
          <AnimatePresence>
            <Routes>
              <Route path="/" element={<Login />} />
              {/* <Route path={"/" || "/Login"} element={<Login />} /> */}
              <Route path="LoginWithOTP" element={<LoginWithOTP />} />
              <Route path="Animation" element={<Animation />} />
              <Route
                path="RegistrationLocation"
                element={<RegistrationLocation />}
              />

              <Route path="ForgetPassword" element={<ForgetPassword />} />
              <Route path="OtpVerification" element={<OtpVerification />} />
              <Route path="Registration" element={<Registration />} />
              <Route path="Register" element={<Register />} />
              <Route path="DemoAccount" element={<DemoAccount />} />
              <Route path="InspectionPDF" element={<InspectionPDF />} />
              {/* <Route path="ShareTrip/:id" element={<ShareTrip />} /> */}

            </Routes>
          </AnimatePresence>
        </div>
        <div>
          <Routes>
            <Route path="DashboardShare/:id" element={<DashboardShare />} />
            <Route path="ViewOrdersShare/:id" element={<ViewOrdersShare />} />


          </Routes>
        </div>

        <div className="App  background_main_wrapper" id="max-width">
          {currentRoute !== "/" &&
            currentRoute !== "/ForgetPassword" &&
            currentRoute !== "/OtpVerification" &&
            currentRoute !== "/Registration" &&
            currentRoute !== "/Register" &&
            currentRoute !== "/DemoAccount" &&
            currentRoute !== "/LoginWithOTP" &&
            currentRoute !== "/Animation" &&
            currentRoute !== "/RegistrationLocation" &&
            currentRoute !== "/InspectionPDF/" &&
            currentRoute !== "/LockScreen" && (
              <AnimatePresence>
                {routes.indexOf(`/${location.pathname.split("/")[1]}`) > -1 ? (
                  <></>
                ) : (
                  <>
                    <Header />
                    <Sidebar />
                  </>
                )}
              </AnimatePresence>
            )}


          {/* ========== Info Help Compo start ======== */}



          {currentRoute === "/dashboard" ||
            currentRoute === "/CustomerProfile" ||
            currentRoute === "/GeneralSetting" ||
            currentRoute === "/IntegrationSetting" ||
            currentRoute === "/TransportationSetting" ||
            currentRoute === "/NotificationSetting" ||
            currentRoute === "/DispatchSetting" ||
            currentRoute === "/AcessRole" ||
            currentRoute === "/LogChanges" ||
            currentRoute === "/VehicleAvailability" ||
            currentRoute === "/DriverDutyRoaster" ||
            currentRoute === "/DriverAvailabilityList" ||
            currentRoute === "/Vehicle" ||
            currentRoute === "/Holidays" ||
            currentRoute === "/Vacations" ||
            currentRoute === "/ParkingSlot" ||
            currentRoute === "/PointOfIntrest" ||
            currentRoute === "/GeofenceAreas" ||
            currentRoute === "/AddOnSettings" ||
            currentRoute === "/DispatchOrder" ||
            currentRoute === "/DispatchDashboard" ||
            currentRoute === "/AccessRight" ||
            currentRoute === "/Merchant" ||
            currentRoute === "/DispatchCustomer" ? (
            <InfoComponent />
          ) : (
            <></>
          )}

          {/* ========== Info Help Compo end ======== */}

          <AnimatePresence>
            <Routes>
              {/* ============ DASHBOARD ============= */}
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="404" element={<NoPage />} />
              {/* ============ MASTER SETTING ============= */}

              {/* ============ MASTER DATA ============= */}
              <Route path="Vehicle" element={<Vehicle />} />
              <Route path="Holidays" element={<Holidays />} />
              <Route path="Vacations" element={<Vacations />} />
              <Route path="AddVehicle" element={<AddVehicle />}>
                <Route path=":id" element={<AddVehicle />} />
              </Route>
              <Route path="AddVehicleCategory" element={<AddVehicleCategory />}>
                <Route path=":id" element={<AddVehicleCategory />} />
              </Route>
              <Route path="NewSyncRequest" element={<NewSyncRequest />} />
              {/* <Route path="VehicleDetails" element={<VehicleDetails />} />  */}
              <Route path="AddVehicleGroup" element={<AddVehicleGroup />} />
              <Route path="AddVehicleGroup" element={<AddVehicleGroup />}>
                <Route path=":id" element={<AddVehicleGroup />} />
              </Route>
              <Route path="AddHolidays" element={<AddHolidays />} />
              <Route path="AddVacation" element={<AddVacation />} />
              {/* ============ Parking Slots ============= */}
              <Route path="ParkingSlot" element={<ParkingSlot />} />
              <Route path="AddParkingSlot" element={<AddParkingSlot />}>
                <Route path=":id" element={<AddParkingSlot />} />
              </Route>
              {/* ============ Points of interest ============= */}
              <Route path="PointOfIntrest" element={<PointOfIntrest />} />
              <Route path="AddPointOfInterest" element={<AddPointOfInterest />}>
                <Route path=":id" element={<AddPointOfInterest />} />
              </Route>
              {/* ============ Geofence Area ============= */}
              <Route path="GeofenceAreas" element={<GeofenceArea />} />
              <Route path="AddGeofenceArea" element={<AddGeofenceArea />} />
              <Route path="AddGeofenceArea" element={<AddGeofenceArea />}>
                <Route path=":id" element={<AddGeofenceArea />} />
              </Route>





              {/* Trip Management */}
              {/* <Route path="TripManagement" element={<TripManagement />} /> */}
              {/* <Route path="ViewDispatchTrip" element={<ViewDispatchTrip />} /> */}
              {/* <Route
                path="ViewDispatchTrip/:id"
                element={<ViewDispatchTrip />}
              /> */}
              {/* <Route path="EditDispatchTrip" element={<EditDispatchTrip />} /> */}
              <Route
              // path="EditDispatchTrip/:id"
              // element={<EditDispatchTrip />}
              />
              {/* <Route path="AddStop" element={<EditStop />} /> */}
              {/* <Route path="EditStop" element={<EditStop />} /> */}
              {/* <Route path="EditStop/:id" element={<EditStop />} /> */}
              {/* <Route path="ViewStop" element={<ViewStop />} /> */}
              {/* <Route path="ViewStop/:id" element={<ViewStop />} /> */}
              {/* ============ Vehicle Accident  ============= */}
              <Route path="VehicleAccident" element={<VehicleAccident />} />
              <Route
                path="AddVehicleAccident"
                element={<AddVehicleAccident />}
              />
              <Route
                path="AddVehicleAccident/:id"
                element={<AddVehicleAccident />}
              />
              <Route
                path="EditVehicleAccident"
                element={<EditVehicleAccident />}
              />
              <Route
                path="ViewVehicleAccident/:id"
                element={<ViewVehicleAccident />}
              />
              {/* ============ Account  ============= */}
              <Route path="MyProfile" element={<MyProfile />} />
              <Route path="EditProfile" element={<EditProfile />} />
              <Route path="EditProfile/:id" element={<EditProfile />} />
              <Route
                path="ChangePasswordProfile"
                element={<ChangePasswordProfile />}
              />
              <Route path="MyMessages" element={<MyMessages />} />
              <Route path="MyMessages/:id" element={<MyMessages />} />
              <Route path="TeamMessages" element={<TeamMessages />} />
              <Route path="ComposeMessage" element={<ComposeMessage />} />
              <Route path="TeamComposeMessage" element={<TeamComposeMessage />} />
              <Route path="ChatBox" element={<ChatBox />} />
              <Route path="CustomerSupport" element={<CustomerSupport />} />
              {/* ============ Vehicle Accesory  ============= */}
              <Route path="VehicleAccesory" element={<VehicleAccesory />} />
              <Route
                path="AddVehicleAccesory"
                element={<AddVehicleAccesory />}
              />
              <Route
                path="AddVehicleAccesory/:id"
                element={<AddVehicleAccesory />}
              />
              <Route
                path="ViewVehicleAccesory/:id"
                element={<ViewVehicleAccesory />}
              />
              {/* ============ Vehicle Spare Parts  ============= */}
              <Route path="VehicleSpareParts" element={<VehicleSpareParts />} />
              <Route
                path="AddVehicleSpareParts/:id"
                element={<AddVehicleSpareParts />}
              />
              <Route
                path="AddVehicleSpareParts"
                element={<AddVehicleSpareParts />}
              />
              <Route
                path="EditVehicleSpareParts"
                element={<EditVehicleSpareParts />}
              />
              <Route
                path="ViewVehicleSpareParts/:id"
                element={<ViewVehicleSpareParts />}
              />
              {/* ============ Vehicle Fine  ============= */}
              <Route path="VehicleFine" element={<VehicleFine />} />
              <Route path="AddVehicleFine" element={<AddVehicleFine />} />
              <Route path="AddVehicleFine/:id" element={<AddVehicleFine />} />
              <Route path="EditVehicleFine" element={<EditVehicleFine />} />
              <Route path="ViewVehicleFine/:id" element={<ViewVehicleFine />} />
              {/* ============ Fuel Expenses ============= */}
              <Route path="FuelExpenses" element={<FuelExpenses />} />
              <Route
                path="ViewFuelExpenses/:id"
                element={<ViewFuelExpenses />}
              />
              <Route path="AddFuelExpenses/:id" element={<AddFuelExpenses />} />
              <Route path="AddFuelExpenses" element={<AddFuelExpenses />} />
              <Route path="EditFuelExpenses" element={<EditFuelExpenses />} />
              {/* ============ Dispatch Module ============= */}
              <Route path="DispatchCustomer" element={<DispatchCustomer />} />
              <Route path="ViewDispatch" element={<ViewDispatch />} />
              <Route path="ViewDispatch/:id" element={<ViewDispatch />} />
              <Route
                path="AddDispatchCustomer"
                element={<EditCustomerDispatch />}
              />
              <Route
                path="EditCustomerDispatch"
                element={<EditCustomerDispatch />}
              />
              <Route
                path="EditCustomerDispatch/:id"
                element={<EditCustomerDispatch />}
              />
              <Route path="DispatchOrder" element={<DispatchOrder />} />
              <Route path="ViewOrders" element={<ViewOrders />} />

              <Route path="Importdata" element={<OrderImporData />} />
              <Route path="ViewOrders/:id" element={<ViewOrders />} />
              <Route path="ManualRouting" element={<ManualRouting />} />
              <Route path="DeliveryRequest" element={<DeliveryRequest />} />
              <Route path="AddOrder" element={<AddOrderGhatge />} />
              <Route path="DeliveryRequest/:id" element={<DeliveryRequest />} />
              <Route path="AddOrder/:id" element={<AddOrderGhatge />} />
              <Route path="VehicleBooking" element={<VehicleBooking />} />
              <Route path="VehicleBooking2" element={<VehicleBooking2 />} />
              {/* ============ Configuration Checker ============= */}
              <Route
                path="ConfigurationChecker"
                element={<ConfigurationChecker />}
              />
              {/* <Route path="LogoUpdate" element={<LogoUpdate />} /> */}
              {/* <Route
                path="UpdateCustomerLogo"
                element={<UpdateCustomerLogo />}
              /> */}
              <Route path="AddVehicle" element={<AddVehicle />} />
              <Route
                path="AddVehicleCategory"
                element={<AddVehicleCategory />}
              />
              <Route path="NewSyncRequest" element={<NewSyncRequest />} />
              <Route path="VehicleDetails" element={<VehicleDetails />}>
                <Route path=":id" element={<VehicleDetails />} />
              </Route>
              <Route path="AddVehicleGroup" element={<AddVehicleGroup />} />
              <Route path="LockScreen" element={<LockScreen />} />
              {/* <Route path="AddOnSettingsCart" element={<AddOnSettingsCart />} /> */}
              <Route path="/AddHolidays/" element={<AddHolidays />}>
                <Route path=":id" element={<AddHolidays />} />
              </Route>
              <Route path="AddVacation" element={<AddVacation />}>
                <Route path=":id" element={<AddVacation />} />
              </Route>
              {/* <Route
                path="UpdateCustomerProfile"
                element={<UpdateCustomerProfile />}
              /> */}
              <Route path="Announcement" element={<Announcement />} />
              <Route
                path="EditCustomerDispatch"
                element={<EditCustomerDispatch />}
              />
              {/* ============ Communication Module ============= */}
              <Route path="Announcement" element={<Announcement />} />
              <Route path="DispatchOrder" element={<DispatchOrder />} />
              <Route path="ViewOrders" element={<ViewOrders />} />
              <Route path="ManualRouting" element={<ManualRouting />} />
              <Route path="Addaudio" element={<Addaudio />} />
              <Route path="Addaudio/:id" element={<Addaudio />} />
              <Route path="EditAudio" element={<EditAudio />} />
              <Route path="Email" element={<Email />} />
              <Route path="EmailSupport" element={<EmailSupport />} />
              <Route path="EmailDetails/:id" element={<EmailDetails />} />
              <Route
                path="EmailDetailsTm/:id"
                element={<EmailDetailsDriver />}
              />
              <Route path="ComposeEmail" element={<ComposeEmail />} />
              <Route
                path="ComposeEmailHelpler"
                element={<ComposeEmailHelpler />}
              />
              <Route path="PushNotification" element={<PushNotification />} />
              <Route
                path="NotificationDetails2/:id"
                element={<NotificationDetails2 />}
              />
              <Route path="AddTripFleet" element={<AddTripFleet />} />
              <Route
                path="NotificationDetails/:id"
                element={<NotificationDetails />}
              />
              <Route
                path="AddPushNotification"
                element={<AddPushNotification />}
              />
              {/* ============ Reports Module ============= */}
              <Route path="Reports" element={<Reports />} />
              <Route path="ReportList" element={<NewUiReport />} />
              <Route path="ScheduleReport" element={<ScheduleReport />} />
              <Route
                path="GenerateCustomReport"
                element={<GenerateCustomReport />}
              />
              <Route path="/ReportView/:id" element={<ReportView />} />
              <Route
                path="/DeliveryReports/:id"
                element={<DeliveryReports />}
              />
              <Route
                path="/VehicleLocationReport"
                element={<VehicleLocationReport />}
              />
              <Route
                path="/VehicleCountAndCapacity"
                element={<VehicleCountAndCapacity />}
              />
              <Route
                path="/VehicleparkingSlot"
                element={<VehicleparkingSlot />}
              />
              <Route
                path="/VehicleLocationSignal"
                element={<VehicleLocationSignal />}
              />
              <Route
                path="/ImmobiliserReport"
                element={<ImmobiliserReport />}
              />
              {/*================== usage statics Reports ==================  */}
              <Route
                path="/ReportsAndStatisticsUsageAudit"
                element={<SystemReportsAndStatisticsUsageAudit />}
              />
              <Route
                path="/DataUsageR"
                element={<DataUsageViewReport />}
              />
              <Route
                path="/MobileAppDetailsR"
                element={<ViewMobileAppDetails />}
              />
              <Route
                path="/TrackingdevicesAndSimDetailsR"
                element={<TrackingdevicesAndSimDetails />}
              />

              <Route
                path="/lastLoginDetailsR"
                element={<LastLoginDetails />}
              />
              <Route
                path="/mobleAppUsageDetailsR"
                element={<MobileAppUsageDetails />}
              />





              {/* ============ Configuration Checker ============= */}
              <Route
                path="ConfigurationChecker"
                element={<ConfigurationChecker />}
              />
              {/* ============ Lock Screeen ============= */}
              <Route path="LockScreen" element={<LockScreen />} />
              {/* ============ User Section ============= */}
              <Route path="UserDashboard" element={<UserDashboard />} />
              <Route path="UserAlert" element={<UserAlert />} />


              {/* ============ ParkingManagement ============= */}
              <Route path="ParkingManagement" element={<ParkingManagement />} />
              {/* ============ Replay Playback ============= */}
              {/* <Route path="ReplayPlayback" element={<ReplayPlayback />} /> */}
              <Route path="ReplayPlayback" element={<ReplayPlayback />}>
                <Route path=":id" element={<ReplayPlayback />} />
              </Route>


              {/* ============ Reports Module ============= */}
              <Route path="Reports" element={<Reports />} />
              <Route path="TripScheduleEta" element={<TripScheduleEta />} />
              <Route path="ReportList" element={<NewUiReport />} />
              <Route path="ScheduleReport" element={<ScheduleReport />} />
              <Route
                path="GenerateCustomReport"
                element={<GenerateCustomReport />}
              />
              <Route path="ReportView" element={<ReportView />} />
              <Route
                path="UnplannedTripsAutorouting"
                element={<UnplannedTripsAutorouting />}
              />
              <Route path="Alert" element={<Alert />} />
              <Route path="Temperaturereport" element={<Temperaturereport />} />
              <Route path="test" element={<Test />} />
              <Route path="TripActivity" element={<TripActivity />} />
              <Route
                path="VehicleRunningReport"
                element={<VehicleRunningReport />}
              />
              <Route
                path="VehicleCountAndCapacity"
                element={<VehicleCountAndCapacity />}
              />
              {/* <Route path="tripreport" element={<TripReport/>}/> */}
              {/* ============ New Users Module ============= */}

              {/* ============ Configuration Checker ============= */}
              <Route
                path="ConfigurationChecker"
                element={<ConfigurationChecker />}
              />
              {/* ============ Lock Screeen ============= */}

              {/* ============ ParkingManagement ============= */}
              <Route path="ParkingManagement" element={<ParkingManagement />} />
              {/* ============ Vehicle Inspection ============= */}
              <Route
                path="VehicleInspectionDashboard"
                element={<VehicleInspectionDashboard />}
              />
              <Route path="VehicleInspection" element={<VehicleInspection />} />
              <Route path="NewInspection" element={<NewInspection />} />
              <Route
                path="NewVehicleInspection"
                element={<NewVehicleInspection />}
              />
              <Route
                path="ViewInspectionDetails"
                element={<ViewInspectionDetails />}
              />
              {/* ============ Replay Playback ============= */}
              <Route path="ReplayPlayback" element={<ReplayPlayback />} />
              {/* ============ Fuel ManagementDashbord ============= */}
              {/* <Route
                path="FuelManagementDashbord"
                element={<FuelManagementDashbord />}
              />
              <Route
                path="FuelManagementDetails"
                element={<FuelManagementDetails />}
              />
              <Route path="FuelAlerts" element={<FuelAlerts />} />
              <Route
                path="VehicleBookingList"
                element={<VehicleBookingList />}
              /> */}
              {/*============ Vehicle Maintance Routes =========*/}
              <Route
                path="AddVehicleMaintenance"
                element={<AddVehicleMaintenance />}
              />
              <Route
                path="AddVehicleMaintenance/:id"
                element={<AddVehicleMaintenance />}
              />
              <Route
                path="VehicleMaintenance"
                element={<VehicleMaintenance />}
              />
              <Route
                path="ViewVehicleMaintenance/:id/:type"
                element={<ViewVehicleMaintenance />}
              />
              <Route
                path="ViewVehicleMaintenance"
                element={<ViewVehicleMaintenance />}
              />
              <Route
                path="VehicleNotification"
                element={<VehicleNotification />}
              />
              {/*============ Vehicle Inspection setting Routes =========*/}
              {/* <Route
                path="VehicleInspectionSettings"
                element={<VehicleInspectionSettings />}
              /> */}
              {/* <Route
                path="AddVehicleInspectionSetting"
                element={<AddVehicleInspectionSetting />}
              /> */}
              {/* <Route
                path="AddVehicleInspection2"
                element={<AddVehicleInspection2 />}
              /> */}
              {/* <Route
                path="VehicleInspectionTab"
                element={<VehicleInspectionTab />}
              /> */}
              {/* report management */}
              <Route
                path="RealTimeReport"
                element={<RealTimeTrackingReport />}
              />
              <Route path="DispatchReport" element={<DispatchReport />} />
              {/* <Route />
              <Route
                path="DirectOrderOfferLoad"
                element={<DirectOrderOfferLoad />}
              /> */}
              {/* <Route path="OnlineAuction" element={<OnlineAuction />} /> */}
              {/* <Route path="BidAuctionDetails" element={<BidAuctionDetails />} /> */}
              {/* <Route
                path="AuctionOfferDetails"
                element={<AuctionOfferDetails />}
              /> */}
              {/* <Route path="OrderConfDetails" element={<OrderConfDetails />} /> */}
              {/* <Route path="AuctionAddVehicle" element={<AuctionAddVehicle />} /> */}
              {/* <Route
                path="AuctionReferenceDetails"
                element={<AuctionReferenceDetails />}
              /> */}
              {/* <Route
                path="DirectOrderVehicleDetails"
                element={<DirectOrderVehicleDetails />}
              /> */}
              {/* <Route
                path="DirectOrderConfirmation"
                element={<DirectOrderConfirmation />}
              /> */}
              {/* <Route
                path="OnlineAuctionVehicleDetails"
                element={<OnlineAuctionVehicleDetails />}
              /> */}
              <Route path="DispatchDashboard" element={<DispatchDashboard />} />
              <Route
                path="ReportOverSpeedView"
                element={<ReportOverSpeedView />}
              />
              <Route
                path="DriverListignitionReport"
                element={<DriverListignitionReport />}
              />
              <Route
                path="DriverActivetySummaryReport"
                element={<DriverActivetySummaryReport />}
              />
              <Route
                path="DriverActivertiyReport"
                element={<DriverActivertiyReport />}
              />
              <Route
                path="DriverBehaviourReport"
                element={<DriverBehaviourReport />}
              />
              {/* ==========================TripReportView=================================== */}
              <Route
                path="TripVersusPickupCount"
                element={<TripVersusPickupCount />}
              />
              <Route
                path="DispatchCustomerOrderReport"
                element={<DispatchCustomerOrderReport />}
              />
              <Route
                path="LiveTripLocationReport"
                element={<LiveTripLocationReport />}
              />
              <Route
                path="TripAssignedVersusCompleted"
                element={<TripAssignedVersusCompleted />}
              />
              <Route
                path="TripManifestReport"
                element={<TripManifestReport />}
              />
              <Route
                path="TripActivityReport"
                element={<TripActivityReport />}
              />
              <Route
                path="PickUpPointReport"
                element={<PickUpPointReport />}
              />
              <Route
                path="InspectionDueReport"
                element={<InspectionDueReport />}
              />
              <Route
                path="InsuranceExpiryReport"
                element={<InsuranceExpiryReport />}
              />

              <Route
                path="RegistrationExpiryReport"
                element={<RegistrationExpiryReport />}
              />
              <Route
                path="TaxExpiryReport"
                element={<TaxExpiryReport />}
              />
              <Route
                path="DriverLicenceExpiryReport"
                element={<DriverLicenceExpiryReport />}
              />
              <Route
                path="MaintenanceOverduesReport"
                element={<MaintenanceOverduesReport />}
              />
              <Route
                path="MaintenanceDuesSoonReport"
                element={<MaintenanceDuesSoonReport />}
              />
              <Route
                path="VehicleExpenseReport"
                element={<VehicleExpenseReport />}
              />
              <Route
                path="VehicleFuelExpenseReport"
                element={<VehicleFuelExpenseReport />}
              />
              <Route path="DashboardDispatch" element={<DashboardDispatch />} />


              {/* //////////////////////////// Dispatch Executive //////////////////////////////////////////////////////////////*/}
              <Route path="AddNewOrder" element={<AddNewOrder />} />
              <Route path="DispatchViewOrder" element={<DispatchViewOrder />} />
              <Route path="ViewInvoice" element={<ViewInvoice />} />
              <Route path="EditInvoice" element={<EditInvoice />} />


            </Routes>
          </AnimatePresence>




        </div>
      </Suspense>
    </>
  );
}

export default App;

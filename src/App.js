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




// import UpdateCustomerProfile from "./pages/MasterSettings/UpdateCustomerProfile";
// import LogoUpdate from "./pages/MasterSettings/LogoUpdate";
import Login from "./pages/AuthPages/Login";
import ForgetPassword from "./pages/AuthPages/ForgetPassword";
import Registration from "./pages/AuthPages/Registration";
import DemoAccount from "./pages/AuthPages/DemoAccount";


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



import VehicleDetails from "./pages/MasterData/VehicleDetails";
import AddVehicleGroup from "./pages/MasterData/AddVehicleGroup";
import MyProfile from "./pages/Account/MyProfile";
import EditProfile from "./pages/Account/EditProfile";
import ChangePasswordProfile from "./pages/Account/ChangePasswordProfile";

import ComposeMessage from "./pages/Account/ComposeMessage";
import ChatBox from "./pages/Account/ChatBox";

import CustomerSupport from "./pages/Account/CustomerSupport";



// import UpdateCustomerLogo from "./pages/MasterSettings/UpdateCustomerLogo";
import LockScreen from "./pages/Account/LockScreen";

import Reports from "./pages/vehicleExpenses/Report/Reports";
import GenerateCustomReport from "./pages/vehicleExpenses/Report/GenerateCustomReport";
import ScheduleReport from "./pages/vehicleExpenses/Report/ScheduleReport";
import ReportView from "./pages/vehicleExpenses/Report/ReportView";



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

import InfoComponent from "./sharedComponent/SupportHelp/InfoComponent";


// import UserDashboard from "./pages/UserDashboard/UserDashboard";
import { useSelector } from "react-redux";
// import UserAlert from "./pages/UserDashboard/UserAlert";



// import ShareTrip from "./pages/TripManagement/ShareTrip";
import { notifyError, notifySuccess } from "./sharedComponent/notify";


import DashboardShare from "./pages/Dashboard/DashboardShare";


import OtpVerification from "./pages/Account/OtpVerification";
import NoPage from "./sharedComponent/NoPage";
import { isValidRoute } from "./sharedComponent/IsRouteValidation";

// abubakar import for report
// import TripReport from "./pages/vehicleExpenses/Report/DefaultReports/TripReport/Test.js";
import Test from "./pages/vehicleExpenses/Report/DefaultReports/TripReport/Test.js";
import VehicleRunningReport from "./pages/vehicleExpenses/Report/DefaultReports/VehicleRunningReport/VehicleRunningReport.js";
import NewUiReport from "./pages/vehicleExpenses/Report/DefaultReports/VehicleRunningReport/NewUiReport.js";
import { latestDate } from "./sharedComponent/common.js";
import VehicleLocationReport from "./pages/vehicleExpenses/Report/DefaultReports/VehicleLocationReport";
import VehicleCountAndCapacity from "./pages/vehicleExpenses/Report/DefaultReports/VehicleCountAndCapacity.js";
import VehicleparkingSlot from "./pages/vehicleExpenses/Report/DefaultReports/VehicleparkingSlot.js";

import VehicleLocationSignal from "./pages/vehicleExpenses/Report/DefaultReports/VehicleLocationSignal.js";

import DeliveryReports from "./pages/vehicleExpenses/Report/DeliveryReports.js";
import RealTimeTrackingReport from "./pages/vehicleExpenses/Report/RealTimeTrackingReport.js";
import DispatchReport from "./pages/vehicleExpenses/Report/DispatchReport.js";

import Register from "./pages/AuthPages/Register.js";
import BackDropLoader from "./sharedComponent/BackDropLoader.js";
import TripScheduleEta from "./pages/vehicleExpenses/Report/TripScheduleEta.js";
import DriverListignitionReport from "./pages/vehicleExpenses/Report/DriverListignitionReport.js";

import DriverActivertiyReport from "./pages/vehicleExpenses/Report/DriverActivertiyReport.js";





import { useTranslation } from "react-i18next";



import TeamComposeMessage from "./pages/Account/TeamComposeMessage.js";





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

              {/* <Route path="ShareTrip/:id" element={<ShareTrip />} /> */}

            </Routes>
          </AnimatePresence>
        </div>
        <div>
          <Routes>
            <Route path="DashboardShare/:id" element={<DashboardShare />} />



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

              <Route path="AddVehicleCategory" element={<AddVehicleCategory />}>
                <Route path=":id" element={<AddVehicleCategory />} />
              </Route>
              <Route path="NewSyncRequest" element={<NewSyncRequest />} />
              {/* <Route path="VehicleDetails" element={<VehicleDetails />} />  */}
              <Route path="AddVehicleGroup" element={<AddVehicleGroup />} />
              <Route path="AddVehicleGroup" element={<AddVehicleGroup />}>
                <Route path=":id" element={<AddVehicleGroup />} />
              </Route>

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

              {/* ============ Account  ============= */}
              <Route path="MyProfile" element={<MyProfile />} />
              <Route path="EditProfile" element={<EditProfile />} />
              <Route path="EditProfile/:id" element={<EditProfile />} />
              <Route
                path="ChangePasswordProfile"
                element={<ChangePasswordProfile />}
              />


              <Route path="ComposeMessage" element={<ComposeMessage />} />
              <Route path="TeamComposeMessage" element={<TeamComposeMessage />} />
              <Route path="ChatBox" element={<ChatBox />} />
              <Route path="CustomerSupport" element={<CustomerSupport />} />
              {/* ============ Vehicle Accesory  ============= */}


              {/* ============ Vehicle Spare Parts  ============= */}


              {/* ============ Vehicle Fine  ============= */}

              {/* ============ Fuel Expenses ============= */}


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

              {/* <Route
                path="UpdateCustomerProfile"
                element={<UpdateCustomerProfile />}
              /> */}

              {/* ============ Communication Module ============= */}

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



              {/* ============ Configuration Checker ============= */}
              <Route
                path="ConfigurationChecker"
                element={<ConfigurationChecker />}
              />
              {/* ============ Lock Screeen ============= */}
              <Route path="LockScreen" element={<LockScreen />} />
              {/* ============ User Section ============= */}
              {/* <Route path="UserDashboard" element={<UserDashboard />} /> */}
              {/* <Route path="UserAlert" element={<UserAlert />} /> */}


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

              <Route path="test" element={<Test />} />
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


              {/* ============ Replay Playback ============= */}
              <Route path="ReplayPlayback" element={<ReplayPlayback />} />

              {/* report management */}
              <Route
                path="RealTimeReport"
                element={<RealTimeTrackingReport />}
              />
              <Route path="DispatchReport" element={<DispatchReport />} />


              <Route
                path="DriverListignitionReport"
                element={<DriverListignitionReport />}
              />

              <Route
                path="DriverActivertiyReport"
                element={<DriverActivertiyReport />}
              />

              {/* //////////////////////////// Dispatch Executive //////////////////////////////////////////////////////////////*/}


            </Routes>
          </AnimatePresence>




        </div>
      </Suspense>
    </>
  );
}

export default App;

import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import DDlogo from "../../assets/images/DDlogo.png";
import { motion } from "framer-motion";
import { simpleGetCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import Loader from "../../sharedComponent/Loader";
import { useTranslation } from "react-i18next";

const AccessRight = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const temporary = false;
  const [roles, setRoles] = useState([]);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [selRole, setSelRole] = useState("customer");
  const [accessRights, setAccessRights] = useState({});

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  useEffect(() => {
    getRoles();
  }, []);

  const getAccessRight = () => {
    setLoading(true);
    simplePostCall(
      ApiConfig.GET_ACCESS_RIGHTS,
      JSON.stringify({ rights_role: selRole })
    )
      .then((res) => {
        if (res.result) setAccessRights(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getRoles = () => {
    simpleGetCall(ApiConfig.GET_ROLES_FOR_RIGHTS)
      .then((res) => {
        if (res.result) setRoles(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getAccessRight();
  }, [selRole]);

  const submitData = () => {
    let body = JSON.stringify({ ...accessRights, rights_role: selRole });
    simplePostCall(ApiConfig.UPDATE_ACCESS_RIGHTS, body).then((res) => {
      if (res.result) {
        notifySuccess(res.message);
        getAccessRight();
      } else notifyError(res.message);
    });
  };
  const [isVisible, setIsVisible] = useState(true); // Initially set the button to be visible

  useEffect(() => {
    let isScrolling;
    window.addEventListener("scroll", () => {
      clearTimeout(isScrolling);

      // Hide the button immediately when scrolling starts
      setIsVisible(false);

      // After a delay (500ms), show the button again when scrolling stops
      isScrolling = setTimeout(() => {
        setIsVisible(true);
      }, 500); // Adjust the delay duration according to your preference
    });

    // Cleanup: Remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <>
      <motion.div
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
        className={sidebar ? "taskMain " : "cx-active taskMain"}
        id="cx-main"
      >
        <div id="cx-wrapper" className="Access_Right">
          {loading ? (
            <Loader />
          ) : (
            <div className="main-master-wrapper">
              <div className="innerInputsGen">
                <div className="row">
                  <form>
                    <div className="col-md-6  form_input_main">
                      <div className="innerSelectBox weekCounter form_input_main">
                        <p className="headingMain">{t("User Role")}</p>
                        <select
                          required
                          className="form-select"
                          aria-label="Default select example"
                          value={selRole}
                          onChange={(e) => {
                            setSelRole(e.target.value);
                          }}
                        >
                          <option value="">{t("Select User Role")} </option>
                          {roles.map((role, index) => {
                            return (
                              <option
                                value={role.rights_role}
                                key={"role" + index}
                                style={{ color: "rgba(143, 67, 0, 0.8)" }}
                              >
                                {role.rights_role.charAt(0).toUpperCase() +
                                  role.rights_role.slice(1)}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="Heading">
                      <p>{t("Accountant")}</p>
                    </div>
                    <div className="col-md-12">
                      <div className="weekCounter form_input_main">
                        <label className=" accesHeading belowLine">
                          {t("Customer Admin")}
                        </label>
                        <div className="row">
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsView2"
                              checked={accessRights.rights_view_admin}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_view_admin: e.target.checked,
                                })
                              }
                            />
                            <label className="innerLabel" htmlFor="RightsView2">
                              {t("Rights View Admin")}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="weekCounter form_input_main">
                        <label className=" accesHeading belowLine">
                          {t("Transport Manager")}
                        </label>
                        <div className="row">
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsView1"
                              checked={accessRights.rights_view_tm}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_view_tm: e.target.checked,
                                })
                              }
                            />
                            <label className="innerLabel" htmlFor="RightsView1">
                              {t("Rights View Tm")}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="weekCounter form_input_main">
                        <label className=" accesHeading belowLine">
                          {t("Drivers")}
                        </label>
                        <div className="row">
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsView4"
                              checked={accessRights.rights_view_driver}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_view_driver: e.target.checked,
                                })
                              }
                            />
                            <label className="innerLabel" htmlFor="RightsView4">
                              Rights View Driver
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="weekCounter form_input_main">
                        <label className="accesHeading belowLine">
                          Vehicle Assistant
                        </label>
                        <div className="row">
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsVehicle1"
                              checked={
                                accessRights.rights_view_vehicle_assignment
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_view_vehicle_assignment:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsVehicle1"
                            >
                              Rights View Vehicle Assistant
                            </label>
                          </div>
                          {/* <div className="col-md-4 greenCheck">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="RightsViewVa"
                        />
                        <label className="innerLabel" htmlFor="RightsViewVa">Rights View VA</label>
                      </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="weekCounter form_input_main">
                        <label className=" accesHeading belowLine">
                          Dashboard
                        </label>
                        <div className="row">
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsVehicl54"
                              checked={accessRights.rights_dashboard_vehicles}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_dashboard_vehicles: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsVehicl54"
                            >
                              Rights Dashboard Vehicle
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsView99"
                              checked={accessRights.rights_dashboard_map}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_dashboard_map: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsView99"
                            >
                              Rights Dashboard Map
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsPending"
                              checked={accessRights.rights_dashboard_pendings}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_dashboard_pendings: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsPending"
                            >
                              Rights Dashboard Pending
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsStatics"
                              checked={accessRights.rights_dashboard_statistics}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_dashboard_statistics: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsStatics"
                            >
                              Rights Dashboard Statistics
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="weekCounter form_input_main">
                        <label className=" accesHeading belowLine">
                          Master Settings & Scheduled Pickups{" "}
                        </label>
                        <div className="row mb-2">
                          <div className="multiHeading">
                            <label>Customer Profile & Logo</label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsCustomerPro"
                              checked={
                                accessRights.rights_view_customer_profile
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_view_customer_profile:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsCustomerPro"
                            >
                              Right to View Customer Profile
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsCustomerManage"
                              checked={
                                accessRights.rights_manage_customer_profile
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_customer_profile:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsCustomerManage"
                            >
                              Right to manage Customer Profile{" "}
                            </label>
                          </div>
                          {/* <div className="col-md-4 greenCheck mb-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="RightsCustomerLogo"
                          checked={accessRights.rights_manage_customer_profile}
                        />
                        <label className="innerLabel" htmlFor="RightsCustomerLogo">
                          Right to Manage Customer Logo
                        </label>
                      </div> */}
                          <div className="multiHeading">
                            <label>Academic Settings</label>
                          </div>
                          <div className="col-md-12 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsAcedmicSet"
                              checked={
                                accessRights.rights_manage_accademic_settings
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_accademic_settings:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsAcedmicSet"
                            >
                              Right to manage Academic Settings
                            </label>
                          </div>
                          <div className="multiHeading">
                            <label>Shift</label>
                          </div>
                          <div className="col-md-12 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsmanShift"
                              checked={accessRights.rights_manage_shift}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_shift: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsmanShift"
                            >
                              Right to manage Shift
                            </label>
                          </div>
                          <div className="multiHeading">
                            <label>Vehicle Types & Vehicles</label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsVehicleType"
                              checked={accessRights.rights_view_vehicletype}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_view_vehicletype: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsVehicleType"
                            >
                              Right to View Vehicle Type
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightManVehType"
                              checked={accessRights.rights_manage_vehicletype}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_vehicletype: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightManVehType"
                            >
                              Right to manage Vehicle Type
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsToVVeh"
                              checked={accessRights.rights_view_vehicle}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_view_vehicle: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsToVVeh"
                            >
                              Right to view Vehicle
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightToManVeh2"
                              checked={accessRights.rights_manage_vehicle}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_vehicle: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightToManVeh2"
                            >
                              Right to manage Vehicle
                            </label>
                          </div>
                          <div className="multiHeading">
                            <label>Vehicle Assignment</label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsVehAsses"
                              checked={
                                accessRights.rights_view_vehicle_assignment
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_view_vehicle_assignment:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsVehAsses"
                            >
                              Right to View Vehicle Assignment
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsManAsses3"
                              checked={
                                accessRights.rights_manage_vehicle_assignment
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_vehicle_assignment:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsManAsses3"
                            >
                              Right to manage Vehicle Assignment
                            </label>
                          </div>
                          <div className="multiHeading">
                            <label>General Settings</label>
                          </div>
                          <div className="col-md-12 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightToGenSet"
                              checked={
                                accessRights.rights_manage_general_settings
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_general_settings:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightToGenSet"
                            >
                              Right to Manage General Settings
                            </label>
                          </div>
                          <div className="multiHeading">
                            <label>Notification Settings</label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightToViwNotiSet"
                              checked={
                                accessRights.rights_manage_notification_parent
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_notification_parent:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightToViwNotiSet"
                            >
                              Right to Manage Notification Parent
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightToViwNotiSet"
                              checked={
                                accessRights.rights_manage_notification_settings
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_notification_settings:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightToViwNotiSet"
                            >
                              Right to Manage Notification Settings
                            </label>
                          </div>
                          <div className="multiHeading">
                            <label>Configuration</label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsConfigChecker"
                              checked={accessRights.rights_device_configuration}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_device_configuration: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsConfigChecker"
                            >
                              Right to Device Configuration
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsConfigChecker"
                              checked={
                                accessRights.rights_manage_configuration_settings
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_configuration_settings:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsConfigChecker"
                            >
                              Right to Manage Configuration settings
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="weekCounter form_input_main">
                        <label className=" accesHeading belowLine">
                          Instant Trips, Vehicle Expenses, Payment, Announcement
                        </label>
                        <div className="row mb-2">
                          <div className="multiHeading">
                            <label>Routes</label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsVewROute3"
                              checked={accessRights.rights_view_route}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_view_route: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsVewROute3"
                            >
                              Rights View Route
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsManrou3"
                              checked={accessRights.rights_manage_route}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_route: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsManrou3"
                            >
                              Rights Manage Route
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsTestRou5"
                              checked={accessRights.rights_test_route}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_test_route: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsTestRou5"
                            >
                              Rights Test Route
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsApprove0"
                              checked={accessRights.rights_approve_route}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_approve_route: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsApprove0"
                            >
                              Rights Approve Route
                            </label>
                          </div>
                          <div className="multiHeading">
                            <label>Pickup Points</label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="viewPickPoints"
                              checked={accessRights.rights_view_pickuppoint}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_view_pickuppoint: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="viewPickPoints"
                            >
                              Rights View Pickuppoint
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="viewPickPoints"
                              checked={accessRights.rights_manage_pickup}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_pickup: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="viewPickPoints"
                            >
                              Rights Manage Pickup
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="managePickPoints"
                              checked={accessRights.rights_manage_pickuppoint}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_pickuppoint: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="managePickPoints"
                            >
                              Rights Manage Pickuppoint
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="managePickPoints"
                              checked={accessRights.rights_view_pickup}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_view_pickup: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="managePickPoints"
                            >
                              Rights View Pickup
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="weekCounter form_input_main">
                        <label className=" accesHeading belowLine">
                          Notification
                        </label>
                        <div className="row mb-2">
                          <div className="multiHeading">
                            <label>Sheduled Trips</label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="rightsToManage99T"
                              checked={accessRights.rights_manage_trips}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_trips: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="rightsToManage99T"
                            >
                              Rights Manage Trips
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsViInstPs"
                              checked={accessRights.rights_view_instant_trips}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_view_instant_trips: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsViInstPs"
                            >
                              Rights View Instant Trips
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsDeViewTrips"
                              checked={accessRights.rights_view_trips}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_view_trips: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsDeViewTrips"
                            >
                              Rights View Trips
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsExpManaVeh"
                              checked={
                                accessRights.rights_manage_vehicle_expense
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_vehicle_expense:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsExpManaVeh"
                            >
                              Rights Manage Vehicle Expense
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsVPaymentVE"
                              checked={accessRights.rights_online_payment}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_online_payment: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsVPaymentVE"
                            >
                              Rights Online Payment
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightInstTrips54"
                              checked={accessRights.rights_manage_instant_trips}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_instant_trips: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightInstTrips54"
                            >
                              Rights Manage Instant Trips
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsAnnouncVeh09"
                              checked={
                                accessRights.rights_manage_announcement_vehicle
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_announcement_vehicle:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsAnnouncVeh09"
                            >
                              Rights Manage Announcement Vehicle
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsToNotiSec99"
                              checked={
                                accessRights.rights_manage_notification_admin
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_notification_admin:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsToNotiSec99"
                            >
                              Rights Manage Notification Admin
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="Rpaymentsight"
                              checked={accessRights.rights_manage_payment}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_payment: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="Rpaymentsight"
                            >
                              Rights Manage Payment
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="weekCounter form_input_main">
                        <label className=" accesHeading belowLine">
                          Historical Data
                        </label>
                        <div className="row mb-2">
                          <div className="col-md-12 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsHistoric"
                              checked={
                                accessRights.rights_manage_notification_tm
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_notification_tm:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsHistoric"
                            >
                              Rights Manage Notification Tm
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="weekCounter form_input_main">
                        <label className=" accesHeading belowLine">
                          Reports
                        </label>
                        <div className="row mb-2">
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsReponotiDr"
                              checked={
                                accessRights.rights_manage_notification_driver
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_notification_driver:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsReponotiDr"
                            >
                              Rights Manage Notification Driver
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsRepoNotiFep"
                              checked={
                                accessRights.rights_manage_notification_helper
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_notification_helper:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsRepoNotiFep"
                            >
                              Rights Manage Notification Helper
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightRepoNotiAcount"
                              checked={
                                accessRights.rights_manage_notification_accountant
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_notification_accountant:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightRepoNotiAcount"
                            >
                              Rights Manage Notification Accountant
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsRepoMsgs"
                              checked={accessRights.rights_messages}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_messages: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsRepoMsgs"
                            >
                              Rights Messages
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsTagRepo"
                              checked={accessRights.rights_manage_tag_prints}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_tag_prints: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsTagRepo"
                            >
                              Rights Manage Tag Prints
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsRepoNotiVen"
                              checked={
                                accessRights.rights_manage_notification_tag_vendor
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_notification_tag_vendor:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsRepoNotiVen"
                            >
                              Rights Manage Notification Tag Vendor
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsRepoManRigSur"
                              checked={
                                accessRights.rights_manage_notification_surveyor
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_notification_surveyor:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsRepoManRigSur"
                            >
                              Rights Manage Notification Surveyor
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsDeManPlac"
                              checked={
                                accessRights.rights_manage_notification_route_planner
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_notification_route_planner:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsDeManPlac"
                            >
                              Rights Manage Notification Route Planner
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsSupporRepo"
                              checked={
                                accessRights.rights_manage_notification_support
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_notification_support:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsSupporRepo"
                            >
                              Rights Manage Notification Support
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsDeRpeoHsi"
                              checked={accessRights.rights_historical_data}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_historical_data: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsDeRpeoHsi"
                            >
                              Rights Historical Data
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsTrEreome"
                              checked={
                                accessRights.rights_transportation_report
                              }
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_transportation_report:
                                    e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsTrEreome"
                            >
                              Rights Transportation Report
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsDRiverPreo"
                              checked={accessRights.rights_driver_report}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_driver_report: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsDRiverPreo"
                            >
                              Rights Driver Report
                            </label>
                          </div>
                          <div className="col-md-4 greenCheck mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="RightsVihePort"
                              checked={accessRights.rights_vehicle_report}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_vehicle_report: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="innerLabel"
                              htmlFor="RightsVihePort"
                            >
                              Rights Vehicle Report
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          <div className="submit-button-wrapper">
            {isVisible && (
              <div className="d-flex justify-content-end align-items-center btn-wrapper">
                <button className="globalBtn" onClick={submitData}>
                  {t("Submit")}
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AccessRight;

import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Col, Nav, Tab } from "react-bootstrap";
import Import from "../../../assets/images/ic-Import.svg";
import Export from "../../../assets/images/ic-Export.svg";
import ReactSelect from "../../../sharedComponent/ReactSelect";
import { useEffect } from "react";
import { simpleGetCall, simplePostCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import Loader from "../../../sharedComponent/Loader";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Value } from "sass";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const AcessRole = () => {
  const {
    sidebar,
    setSidebar,
    Dark,
    setDark,
    setLoading,
    loading,
    userListRole,
    setUserListRole,
    customerData,
    socket,
    setupdateKey,
  } = useContext(AppContext);
  const [roles, setRoles] = useState([]);
  const userRole = "noRole";

  const [selRole, setSelRole] = useState("2259");
  
  const [accessRights, setAccessRights] = useState({});
  const [view_report, set_view_report] = useState(0);
  const [dynamic_access_rights, setDynamic_access_rights] = useState({});
  const addonSettingData = useSelector((state) => state.auth.addonModule);
  let customerId = Number(customerData?.customer_id);
  const { t, i18n } = useTranslation();
  let temperary = false;

  useEffect(() => {
    getRoles();
  }, []);
  const getRoles = () => {
    simpleGetCall(ApiConfig.GET_ROLES_FOR_RIGHTS)
      .then((res) => {
        if (res.result) {
          setRoles(res?.data);
          let idData = res.data.filter((ele) => ele.rights_role === "customer");
          setSelRole(idData[0]?.rights_id);
        }
      })
      .catch((err) => {
        console.log(err.message);  
      });
  };
  // ggyjgjhgujh
  useEffect(() => {
    getAccessRight();
  }, [selRole]);
  const getAccessRight = () => {
    setLoading(true);
    simplePostCall(
      ApiConfig.GET_ACCESS_RIGHTS,
      JSON.stringify({
        rights_role: roles?.filter((ele) => ele.rights_id === selRole)[0]
          ?.rights_role,
      })
    )
      .then((res) => {
        if (res.result) {
          setAccessRights({ ...res?.data });

          let commobj = {};
          Object.keys(res?.data).some((key) => {
            if (key.endsWith("dynm")) {
              let [right, action, name, co] = key.split("_");
              commobj[name] = { [key]: res?.data[key], ...commobj[name] };
            }
          });
          setDynamic_access_rights(commobj);
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [updateEmitKey, setUpdateEmitKey] = useState("");
  const submitData = () => {
    let body = JSON.stringify({
      ...accessRights,
      rights_role: roles?.filter((ele) => ele.rights_id === selRole)[0]
        ?.rights_role,

        rights_view_reports : view_report,
    });
    setLoading(true);
    simplePostCall(ApiConfig.UPDATE_ACCESS_RIGHTS, body)
      .then((res) => {
        if (res.result) {
          setupdateKey(Math.random() * 100);
          setUpdateEmitKey(Math.random() * 100);
          getAccessRight();

          notifySuccess(res.message);
        } else notifyError(res?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (customerId && selRole && socket) {
      const data = {
        user_customer_id: customerId,
        user_role: roles?.filter((ele) => ele.rights_id === selRole)[0]
          ?.rights_role,
        is_access: "access_right",
      };
      socket && socket.emit("addonsAndAccessRight", data);
    }
  }, [socket, customerId, updateEmitKey]);

  const handleOnChange = (e, key, name) => {
    let manage = key.includes("manage");
    if (manage) {
      setAccessRights({
        ...accessRights,
        [key]: e.target.checked ? 1 : 0,
        [key?.replace("manage", "view")]: 1,
      });
    } else if (key.includes("manage") || key.includes("view")) {
      accessRights?.[key.replace("view", "manage")] && manageView(name);
      setAccessRights({
        ...accessRights,
        [key]: e.target.checked ? 1 : 0,
      });
    } else {
      setAccessRights({
        ...accessRights,
        [key]: e.target.checked ? 1 : 0,
      });
    }
  };

  const manageView = (props) => {
    if (props === "dispatch_manage_dashboard" || props === "true") {
    } else {
      notifyError(`Please Disable Manage ${props} First`);
    }
  };
useEffect(()=>{
  set_view_report(accessRights?.rights_view_reports);
},[accessRights?.rights_view_reports])
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
      <div id="cx-wrapper">
        <div id="Access_right_new">
          <div className="all-vehical-head row vehicle-top-inputs">
            <div className="input-section-wrapper">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12 mb-1">
                  <ReactSelect
                    setterFucntionsId={setSelRole}
                    selectedValue={selRole}
                    selValue={selRole}
                    placehold="Select Role"
                    optionList={roles.map((role, index) => ({
                      id: role.rights_id,
                      value: role.rights_id,
                      label:
                        role.rights_role == "customer"
                          ? "Admin"
                          : role.rights_role,
                    }))}
                    setid={true}
                  />
                </div>
              </div>
            </div>
            <div className="right-export-btn-section-wrapper">
              <Link to="/UserRole" className="d-flex justify-content-end mb-1">
                <button className="cx-btn-3 tbBtn">{t("User Roles")}</button>
              </Link>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="header_tabel_top">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                    <p className="title">{t("Module")}</p>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                    <p className="title">{t("Features")}</p>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                    <p className="text-right title">{t("Action")}</p>
                  </div>
                </div>
              </div>

              <div className="ScrollingSetting">
                {/* Dashboard */}
                <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-5">
                      <div className="left">
                        <div className="title">{t("Dashboard")}</div>
                        <div className="contain">
                          <ul>
                            {temperary && <li>{t("Dashboard Vehicles")}</li>}
                            <li>{t("Dashboard Map")}</li>
                            {temperary && (
                              <>
                                <li>{t("Dashboard Pending's")}</li>
                                <li>{t("Dashboard Statistics")}</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                          {temperary && (
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_dashboard_vehicles
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_dashboard_vehicles: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                    })
                                  }
                                />
                              </div>
                            </li>
                          )}
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_dashboard_map}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_dashboard_map: e.target.checked
                                      ? 1
                                      : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          {temperary && (
                            <>
                              <li>
                                <div
                                  className="form-check form-switch"
                                  id="custom_switch"
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={
                                      accessRights?.rights_dashboard_pendings
                                    }
                                    onChange={(e) =>
                                      setAccessRights({
                                        ...accessRights,
                                        rights_dashboard_pendings: e.target
                                          .checked
                                          ? 1
                                          : 0,
                                      })
                                    }
                                  />
                                </div>
                              </li>
                              <li>
                                <div
                                  className="form-check form-switch"
                                  id="custom_switch"
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={
                                      accessRights?.rights_dashboard_statistics
                                    }
                                    onChange={(e) =>
                                      setAccessRights({
                                        ...accessRights,
                                        rights_dashboard_statistics: e.target
                                          .checked
                                          ? 1
                                          : 0,
                                      })
                                    }
                                  />
                                </div>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Master Setting */}
                <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 ">
                      <div className="left">
                        <div className="title">{t("Master Setting")}</div>
                        <div className="contain sub-contain">
                          <ul>
                            <li>
                              <div className="head">
                                {t("Customer Settings")}
                              </div>
                              <ul>
                                <li>{t("View Customer Setting")}</li>
                                <li>{t("Manage Customer Setting")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">
                                {t("General Settings")}
                              </div>
                              <ul>
                                {/* <li>{t("View General Setting")}</li> */}
                                <li>{t("Manage General Setting")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">
                                {t("Integration Setting")}
                              </div>
                              <ul>
                                {/* <li>{t("View Integration Setting")}</li> */}
                                <li>{t("Manage Integration Setting")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">
                                {t("Transportation Setting")}
                              </div>
                              <ul>
                                {/* <li>{t("View Transportation Setting")}</li> */}
                                <li>{t("Manage Transportation Setting")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">
                                {t("Notification Setting")}
                              </div>
                              <ul>
                                {/* <li>{t("View Notification Setting")}</li> */}
                                <li>{t("Manage Notification Setting")}</li>
                              </ul>
                            </li>
                            {addonSettingData["addon_dispatch"] == 1 && (
                              <li>
                                <div className="head">
                                  {t("Dispatch Setting")}
                                </div>
                                <ul>
                                  {/* <li>{t("View Dispatch Setting")}</li> */}
                                  <li>{t("Manage Dispatch Setting")}</li>
                                </ul>
                              </li>
                            )}
                            {/* {
                      
                         <li>
                              <div className="head">{t("Access Right")}</div>
                              <ul>
                             
                                <li>{t("Manage Access Right")}</li>
                              </ul>
                            </li>} */}

                            <li>
                              <div className="head">{t("Addon Setting")}</div>
                              <ul>
                                <li>{t("View Addon Setting")}</li>
                                <li>{t("Manage Addon Setting")}</li>
                              </ul>
                            </li>

                            <li>
                              <div className="head">{t("Report")}</div>
                              <ul>
                                <li>{t("Report View")}</li>
                              </ul>
                            </li>
                            {temperary && (
                              <li>
                                <div className="head">{t("Log Changes")}</div>
                                <ul>
                                  <li>{t("View Log Changes")}</li>
                                  <li>{t("Manage Log Changes")}</li>
                                </ul>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 ">
                      <div className="right">
                        <ul>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                // style={{color : "#9c4900"}}
                                className="form-check-input"
                                type="checkbox"
                                // disabled={accessRights.rights_manage_customer_profile ? true : false}
                                checked={
                                  accessRights?.rights_view_customer_profile ||
                                  accessRights.rights_manage_customer_profile
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_customer_profile &&
                                    manageView("Customer");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_customer_profile: e.target
                                      .checked
                                      ? 1
                                      : 0,

                                    // rights_view_route: e.target.checked ? 1 : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>

                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_manage_customer_profile
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_customer_profile: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                    rights_view_customer_profile: 1,
                                    // rights_view_customer_profile:rights_manage_customer_profile
                                    // rights_manage_route: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          {/* <li>
                          <div
                            className="form-check form-switch"
                            id="custom_switch"
                          >
                            3
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={accessRights.rights_test_route}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_test_route: e.target.checked ? 1 : 0,
                                })
                              }
                            />
                          </div>
                        </li> */}
                          {/* <li>
                          <div
                            className="form-check form-switch"
                            id="custom_switch"
                          >4
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={accessRights.rights_view_pickuppoint}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_view_pickuppoint: e.target.checked
                                    ? 1
                                    : 0,
                                })
                              }
                            />
                          </div>
                        </li> */}
                          {/* <li>
                          <div
                            className="form-check form-switch"
                            id="custom_switch"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={accessRights.rights_manage_pickuppoint}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_pickuppoint: e.target.checked
                                    ? 1
                                    : 0,
                                })
                              }
                            />
                          </div>
                        </li> */}
                          {/* <li>
                          <div
                            className="form-check form-switch"
                            id="custom_switch"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={accessRights.rights_view_trips}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_view_trips: e.target.checked ? 1 : 0,
                                })
                              }
                            />
                          </div>
                        </li> */}
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights.rights_manage_general_settings
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_general_settings: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                    // rights_manage_trips: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_manage_integration_settings
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_integration_settings: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                    // rights_view_route: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_manage_transportation_settings
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_transportation_settings: e
                                      .target.checked
                                      ? 1
                                      : 0,
                                    // rights_manage_route: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_manage_notification_settings
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_notification_settings: e
                                      .target.checked
                                      ? 1
                                      : 0,
                                    // rights_test_route: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          {addonSettingData["addon_dispatch"] == 1 && (
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_manage_dispatch_settings
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_dispatch_settings: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                      // rights_view_pickuppoint: e.target.checked ? 1: 0,
                                    })
                                  }
                                />
                              </div>
                            </li>
                          )}
                          {/* { 
                    
                        <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_manage_access_rights 
                                }
                                disabled={roles?.filter((ele)=>ele.rights_id===selRole)[0]?.rights_role=="customer"? true : false}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_access_rights: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                    // rights_manage_pickuppoint: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </div>
                          </li>} */}

                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_addon_settings ||
                                  accessRights?.rights_manage_addon_settings
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_addon_settings &&
                                    manageView("Addon");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_addon_settings: e.target.checked
                                      ? 1
                                      : 0,
                                    // rights_manage_pickuppoint: e.target.checked ? 1 : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_manage_addon_settings
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_addon_settings: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                    rights_view_addon_settings: 1,
                                    // rights_view_trips: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </div>
                          </li>

                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                // checked={accessRights?.rights_view_reports }
                              checked={view_report}
                                onChange={(e) => {
                                  accessRights?.rights_view_reports &&
                                    manageView("true");
                                  // setAccessRights({
                                  //   ...accessRights,
                                  //   rights_view_reports: e.target.checked
                                  //     ? 1
                                  //     : 0,
                                  // });

                                  set_view_report(e.target.checked ? 1 : 0)
                                }}
                              />
                            </div>
                          </li>
                          {temperary && (
                            <>
                              {" "}
                              <li>
                                <div
                                  className="form-check form-switch"
                                  id="custom_switch"
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={
                                      accessRights?.rights_view_log_changes_settings
                                    }
                                    onChange={(e) =>
                                      setAccessRights({
                                        ...accessRights,
                                        rights_view_log_changes_settings: e
                                          .target.checked
                                          ? 1
                                          : 0,
                                        // rights_manage_trips: e.target.checked ? 1 : 0,
                                      })
                                    }
                                  />
                                </div>
                              </li>
                              <li>
                                <div
                                  className="form-check form-switch"
                                  id="custom_switch"
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={
                                      accessRights?.rights_manage_log_changes_settings
                                    }
                                    onChange={(e) =>
                                      setAccessRights({
                                        ...accessRights,
                                        rights_manage_log_changes_settings: e
                                          .target.checked
                                          ? 1
                                          : 0,
                                        // rights_manage_trips: e.target.checked ? 1 : 0,
                                      })
                                    }
                                  />
                                </div>
                              </li>
                            </>
                          )}

                          {/* <li>
                          <div
                            className="form-check form-switch"
                            id="custom_switch"
                          >12
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={accessRights.rights_manage_trips}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_trips: e.target.checked ? 1 : 0,
                                })
                              }
                            />
                          </div>
                        </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Master Data */}
                <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-9">
                      <div className="left">
                        <div className="title">{t("Master Data")}</div>
                        <div className="contain sub-contain">
                          <ul>
                            <li>
                              <div className="head">{t("Vehicles")}</div>
                              <ul>
                                <li>{t("View Vehicle")}</li>
                                <li>{t("Manage Vehicle")}</li>
                              </ul>
                            </li>

                            <li>
                              <div className="head">{t("Vehicle Group")}</div>
                              <ul>
                                <li>{t("View Vehicle Group")}</li>
                                <li>{t("Manage Vehicle Group")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">{t("Vehicles Sync")}</div>
                              <ul>
                                <li>{t("View Vehicles Sync")}</li>
                                <li>{t("Manage Vehicles Sync")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">{t("Vehicles types")}</div>
                              <ul>
                                <li>{t("View Vehicle types")}</li>
                                <li>{t("Manage Vehicle types")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">{t("Holidays")}</div>
                              <ul>
                                <li>{t("View Holidays")}</li>
                                <li>{t("Manage Holidays")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">{t("Vacations")}</div>
                              <ul>
                                <li>{t("View Vacations")}</li>
                                <li>{t("Manage Vacations")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">{t("Parking Station")}</div>
                              <ul>
                                <li>{t("View Parking Station")}</li>
                                <li>{t("Manage Parking Station")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">
                                {t("Point of Interest")}
                              </div>
                              <ul>
                                <li>{t("View Point of Interest")}</li>
                                <li>{t("Manage Point of Interest")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">{t("Geofence Areas")}</div>
                              <ul>
                                <li>{t("View Geofence Areas")}</li>
                                <li>{t("Manage Geofence Areas")}</li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_vehicle ||
                                  accessRights?.rights_manage_vehicle
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_vehicle &&
                                    manageView("Vehicle");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_vehicle: e.target.checked
                                      ? 1
                                      : 0,

                                    // rights_manage_pickuppoint: e.target.checked
                                    //   ? 1
                                    //   : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_manage_vehicle}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_vehicle: e.target.checked
                                      ? 1
                                      : 0,
                                    rights_view_vehicle: 1,
                                    // rights_view_trips: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </div>
                          </li>

                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_vehiclegroup ||
                                  accessRights?.rights_manage_vehiclegroup
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_vehiclegroup &&
                                    manageView("Vehicle Group");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_vehiclegroup: e.target.checked
                                      ? 1
                                      : 0,
                                    // rights_manage_pickuppoint: e.target.checked ? 1: 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_manage_vehiclegroup
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_vehiclegroup: e.target.checked
                                      ? 1
                                      : 0,
                                    rights_view_vehiclegroup: 1,
                                    // rights_view_trips: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_vehiclesync ||
                                  accessRights?.rights_manage_vehiclesync
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_vehiclesync &&
                                    manageView("Vehicle Sync");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_vehiclesync: e.target.checked
                                      ? 1
                                      : 0,
                                    // rights_manage_pickuppoint: e.target.checked ? 1: 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_manage_vehiclesync
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_vehiclesync: e.target.checked
                                      ? 1
                                      : 0,
                                    rights_view_vehiclesync: 1,
                                    // rights_view_trips: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_vehicletype ||
                                  accessRights?.rights_manage_vehicletype
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_vehicletype &&
                                    manageView("Vehicle Type");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_vehicletype: e.target.checked
                                      ? 1
                                      : 0,
                                    // rights_manage_pickuppoint: e.target.checked ? 1: 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_manage_vehicletype
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_vehicletype: e.target.checked
                                      ? 1
                                      : 0,
                                    rights_view_vehicletype: 1,
                                    // rights_view_trips: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_holiday ||
                                  accessRights?.rights_manage_holiday
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_holiday &&
                                    manageView("Holiday");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_holiday: e.target.checked
                                      ? 1
                                      : 0,
                                    // rights_manage_trips: e.target.checked ? 1 : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_manage_holiday}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_holiday: e.target.checked
                                      ? 1
                                      : 0,
                                    rights_view_holiday: 1,
                                    // rights_view_route: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_vacation ||
                                  accessRights?.rights_manage_vacation
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_vacation &&
                                    manageView("Vacation");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_vacation: e.target.checked
                                      ? 1
                                      : 0,
                                    // rights_manage_route: e.target.checked ? 1 : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_manage_vacation}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_vacation: e.target.checked
                                      ? 1
                                      : 0,
                                    rights_view_vacation: 1,
                                    // rights_test_route: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_parking_station ||
                                  accessRights?.rights_manage_parking_station
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_parking_station &&
                                    manageView("Parking Station");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_parking_station: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                    // rights_view_pickuppoint: e.target.checked ? 1 : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_manage_parking_station
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_parking_station: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                    rights_view_parking_station: 1,
                                    // rights_manage_pickuppoint: e.target.checked ? 1: 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_point_of_interest ||
                                  accessRights.rights_manage_point_of_interest
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_point_of_interest &&
                                    manageView("Point of Intrest");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_point_of_interest: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                    // rights_view_trips: e.target.checked ? 1 : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights.rights_manage_point_of_interest
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_point_of_interest: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                    rights_view_point_of_interest: 1,
                                    // rights_manage_trips: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights.rights_view_geofence_area ||
                                  accessRights.rights_manage_geofence_area
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_geofence_area &&
                                    manageView("Geofance");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_geofence_area: e.target.checked
                                      ? 1
                                      : 0,
                                    // rights_manage_trips: e.target.checked ? 1 : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights.rights_manage_geofence_area
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_geofence_area: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                    rights_view_geofence_area: 1,
                                    // rights_manage_trips: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Users */}
                <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10">
                      <div className="left">
                        <div className="title">{t("Users")}</div>
                        <div className="contain sub-contain">
                          <ul>
                            <li>
                              <div className="head">{t("Administrator")}</div>
                              <ul>
                                <li>{t("View Administrator")}</li>
                                <li>{t("Manage Administrator")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">
                                {t("Transport Manager")}
                              </div>
                              <ul>
                                <li>{t("View Transport Manager")}</li>
                                <li>{t("Manage Transport Manager")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">{t("Drivers")}</div>
                              <ul>
                                <li>{t("View Drivers")}</li>
                                <li>{t("Manage Drivers")}</li>
                                <li>{t("Delete Drivers")}</li>
                              </ul>
                            </li>
                            {addonSettingData["addon_dispatch"] == 1 && (
                              <li>
                                <div className="head">
                                  {t("Delivery Person")}
                                </div>
                                <ul>
                                  <li>{t("View Delivery Person")}</li>
                                  <li>{t("Manage Delivery Person")}</li>
                                </ul>
                              </li>
                            )}
                            {addonSettingData["addon_fleetmanager_role"] ==
                              1 && (
                              <li>
                                <div className="head">{t("Fleet Manager")}</div>
                                <ul>
                                  <li>{t("View Fleet Manager")}</li>
                                  <li>{t("Manage Fleet Manager")}</li>
                                </ul>
                              </li>
                            )}
                            {addonSettingData["addon_busassistant_role"] ==
                              1 && (
                              <li>
                                <div className="head">
                                  {t("Vehicle Assistants")}
                                </div>
                                <ul>
                                  <li>{t("View Vehicle Assistants")}</li>
                                  <li>{t("Manage Vehicle Assistants")}</li>
                                </ul>
                              </li>
                            )}

                            {Object.keys(dynamic_access_rights)?.map(
                              (commonName) => (
                                <li key={commonName}>
                                  <div className="head">
                                    {commonName?.charAt(0)?.toUpperCase() +
                                      commonName?.slice(1)}
                                  </div>
                                  <ul>
                                    {Object.keys(
                                      dynamic_access_rights[commonName]
                                    )
                                      .sort((a, b) => b.localeCompare(a))
                                      .map((key) => (
                                        <li key={key}>
                                          {key
                                            ?.split("_")
                                            ?.join(" ")
                                            ?.slice(-1 * key?.length, -4)}
                                        </li>
                                      ))}
                                  </ul>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 ">
                      <div className="right">
                        <ul>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_admin ||
                                  accessRights?.rights_manage_admin
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_admin &&
                                    manageView("Admin");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_admin: e.target.checked ? 1 : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_manage_admin}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_admin: e.target.checked
                                      ? 1
                                      : 0,
                                    rights_view_admin: 1,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_tm ||
                                  accessRights?.rights_manage_tm
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_tm &&
                                    manageView("Transport Manager");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_tm: e.target.checked ? 1 : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_manage_tm}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_tm: e.target.checked ? 1 : 0,
                                    rights_view_tm: 1,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_driver ||
                                  accessRights.rights_manage_driver
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_driver &&
                                    manageView("Driver");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_driver: e.target.checked
                                      ? 1
                                      : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights.rights_manage_driver}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_driver: e.target.checked
                                      ? 1
                                      : 0,
                                    rights_view_driver: 1,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_delete_driver}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_delete_driver: e.target.checked
                                      ? 1
                                      : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          {addonSettingData["addon_dispatch"] == 1 && (
                            <>
                              <li>
                                <div
                                  className="form-check form-switch"
                                  id="custom_switch"
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={
                                      accessRights?.rights_view_helper ||
                                      accessRights?.rights_manage_helper
                                    }
                                    onChange={(e) => {
                                      accessRights.rights_manage_helper &&
                                        manageView("Deliveray Person");
                                      setAccessRights({
                                        ...accessRights,
                                        rights_view_helper: e.target.checked
                                          ? 1
                                          : 0,
                                      });
                                    }}
                                  />
                                </div>
                              </li>
                              <li>
                                <div
                                  className="form-check form-switch"
                                  id="custom_switch"
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={accessRights?.rights_manage_helper}
                                    onChange={(e) =>
                                      setAccessRights({
                                        ...accessRights,
                                        rights_manage_helper: e.target.checked
                                          ? 1
                                          : 0,
                                        rights_view_helper: 1,
                                      })
                                    }
                                  />
                                </div>
                              </li>{" "}
                            </>
                          )}
                          {addonSettingData["addon_fleetmanager_role"] == 1 && (
                            <>
                              <li>
                                <div
                                  className="form-check form-switch"
                                  id="custom_switch"
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={
                                      accessRights?.rights_view_fleet_manager ||
                                      accessRights?.rights_manage_fleet_manager
                                    }
                                    onChange={(e) => {
                                      accessRights.rights_manage_fleet_manager &&
                                        manageView("Fleet Manager");
                                      setAccessRights({
                                        ...accessRights,
                                        rights_view_fleet_manager: e.target
                                          .checked
                                          ? 1
                                          : 0,
                                      });
                                    }}
                                  />
                                </div>
                              </li>
                              <li>
                                <div
                                  className="form-check form-switch"
                                  id="custom_switch"
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={
                                      accessRights?.rights_manage_fleet_manager
                                    }
                                    onChange={(e) =>
                                      setAccessRights({
                                        ...accessRights,
                                        rights_manage_fleet_manager: e.target
                                          .checked
                                          ? 1
                                          : 0,
                                        rights_view_fleet_manager: 1,
                                      })
                                    }
                                  />
                                </div>
                              </li>
                            </>
                          )}

                          {addonSettingData["addon_busassistant_role"] == 1 && (
                            <>
                              <li>
                                <div
                                  className="form-check form-switch"
                                  id="custom_switch"
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={
                                      accessRights?.rights_view_vehicle_assistants ||
                                      accessRights?.rights_manage_vehicle_assistants
                                    }
                                    onChange={(e) => {
                                      accessRights.rights_manage_vehicle_assistants &&
                                        manageView("Vehicle Assistant");
                                      setAccessRights({
                                        ...accessRights,
                                        rights_view_vehicle_assistants: e.target
                                          .checked
                                          ? 1
                                          : 0,
                                      });
                                    }}
                                  />
                                </div>
                              </li>
                              <li>
                                <div
                                  className="form-check form-switch"
                                  id="custom_switch"
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={
                                      accessRights?.rights_manage_vehicle_assistants
                                    }
                                    onChange={(e) =>
                                      setAccessRights({
                                        ...accessRights,
                                        rights_manage_vehicle_assistants: e
                                          .target.checked
                                          ? 1
                                          : 0,
                                        rights_view_vehicle_assistants: 1,
                                      })
                                    }
                                  />
                                </div>
                              </li>
                            </>
                          )}

                          {Object.keys(dynamic_access_rights)?.map(
                            (commonName) => {
                              return (
                                <>
                                  {Object.keys(
                                    dynamic_access_rights[commonName]
                                  )
                                    ?.sort((a, b) => b.localeCompare(a))
                                    .map((key) => (
                                      <li key={key}>
                                        <div
                                          className="form-check form-switch"
                                          id="custom_switch"
                                        >
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={
                                              accessRights?.[key] ||
                                              accessRights?.[
                                                key.replace("view", "manage")
                                              ]
                                            }
                                            onChange={(e) => {
                                              handleOnChange(
                                                e,
                                                key,
                                                commonName
                                              );
                                            }}
                                          />
                                        </div>
                                      </li>
                                    ))}
                                </>
                              );

                              return null;
                            }
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* {temperary && ( */}

                {/* )} */}

                <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-9">
                      <div className="left">
                        <div className="title">{t("Hardware Feature Set")}</div>
                        <div div className="contain">
                          <ul>
                            <li>{t("View Hardware Feature Set")}</li>
                            <li>{t("Manage Hardware Feature Set")}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_hardware_feature_set ||
                                  accessRights?.rights_manage_hardware_feature_set
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_hardware_feature_set &&
                                    manageView("Hardware Feature set");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_hardware_feature_set: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_manage_hardware_feature_set
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_hardware_feature_set: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                    rights_view_hardware_feature_set: 1,
                                  })
                                }
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 ">
                      <div className="left">
                        <div className="title">{t("Trip Management")}</div>
                        <div className="contain">
                          <ul>
                            <li>{t("View Trip Management")}</li>
                            <li>{t("Manage Trip Management")}</li>
                            <li>{t("Vehicle Availability")}</li>
                            <li>{t("Driver Availability")}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2">
                      <div className="right">
                        <ul>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_trips ||
                                  accessRights?.rights_manage_trips
                                }
                                onChange={(e) => {
                                  accessRights.rights_manage_trips &&
                                    manageView("Trips");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_trips: e.target.checked ? 1 : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_manage_trips}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_trips: e.target.checked
                                      ? 1
                                      : 0,
                                    rights_view_trips: 1,
                                  })
                                }
                              />
                            </div>
                          </li> 
              

                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_vehicle_availability}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_vehicle_availability: e.target.checked
                                      ? 1
                                      : 0,
                                
                                  })
                                }
                              />
                            </div>
                          </li> 
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_driver_availability}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_driver_availability: e.target.checked
                                      ? 1
                                      : 0,
                                  
                                  })
                                }
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Vehicle Expenses */}
                {addonSettingData["addon_vehicle_expense"] == 1 && (
                  <div className="common_access_card">
                    <div className="row">
                      <div className="col-lg-10 col-md-10 col-sm-10 col-9">
                        <div className="left">
                          <div className="title">{t("Vehicle Expenses")}</div>
                          <div className="contain sub-contain">
                            <ul>
                              <li>
                                <div className="head">{t("Accident")}</div>
                                <ul>
                                  <li>{t("View Accident")}</li>
                                  <li>{t("Manage Accident")}</li>
                                </ul>
                              </li>
                              <li>
                                <div className="head">{t("Accessory")}</div>
                                <ul>
                                  <li>{t("View Accessory")}</li>
                                  <li>{t("Manage Accessory")}</li>
                                </ul>
                              </li>
                              <li>
                                <div className="head">{t("Spare Parts")}</div>
                                <ul>
                                  <li>{t("View Spare Parts")}</li>
                                  <li>{t("Manage Spare Parts")}</li>
                                </ul>
                              </li>
                              <li>
                                <div className="head">{t("Fine")}</div>
                                <ul>
                                  <li>{t("View Fine")}</li>
                                  <li>{t("Manage Fine")}</li>
                                </ul>
                              </li>
                              <li>
                                <div className="head">
                                  {t("Vehicle Maintenace")}
                                </div>
                                <ul>
                                  <li>{t("View Vehicle Maintenace")}</li>
                                  <li>{t("Manage Vehicle Maintenace")}</li>
                                </ul>
                              </li>
                              <li>
                                <div className="head">{t("Fuel Expenses")}</div>
                                <ul>
                                  <li>{t("View Fuel Expenses")}</li>
                                  <li>{t("Manage Fuel Expenses")}</li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                        <div className="right">
                          <ul>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_view_accident ||
                                    accessRights?.rights_manage_accident
                                  }
                                  onChange={(e) => {
                                    accessRights.rights_manage_accident &&
                                      manageView("Accident");
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_accident: e.target.checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={accessRights?.rights_manage_accident}
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_accident: e.target.checked
                                        ? 1
                                        : 0,
                                      rights_view_accident: 1,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_view_accessory ||
                                    accessRights?.rights_manage_accessory
                                  }
                                  onChange={(e) => {
                                    accessRights.rights_manage_accessory &&
                                      manageView("Accessory");
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_accessory: e.target.checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_manage_accessory
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_accessory: e.target.checked
                                        ? 1
                                        : 0,
                                      rights_view_accessory: 1,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_view_spare_parts ||
                                    accessRights.rights_manage_spare_parts
                                  }
                                  onChange={(e) => {
                                    accessRights.rights_manage_spare_parts &&
                                      manageView("spare parts");
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_spare_parts: e.target.checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_manage_spare_parts
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_spare_parts: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                      rights_view_spare_parts: 1,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_view_fine ||
                                    accessRights?.rights_manage_fine
                                  }
                                  onChange={(e) => {
                                    accessRights?.rights_manage_fine &&
                                      manageView("Fine");
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_fine: e.target.checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={accessRights?.rights_manage_fine}
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_fine: e.target.checked
                                        ? 1
                                        : 0,
                                      rights_view_fine: 1,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights.rights_view_vehicle_maintainance ||
                                    accessRights?.rights_manage_vehicle_maintainance
                                  }
                                  onChange={(e) => {
                                    accessRights?.rights_manage_vehicle_maintainance &&
                                      manageView("Vehicle Maintance");
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_vehicle_maintainance: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_manage_vehicle_maintainance
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_vehicle_maintainance: e
                                        .target.checked
                                        ? 1
                                        : 0,
                                      rights_view_vehicle_maintainance: 1,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights.rights_view_fuel_expenses ||
                                    accessRights?.rights_manage_fuel_expenses
                                  }
                                  onChange={(e) => {
                                    accessRights?.rights_manage_fuel_expenses &&
                                      manageView("Fuel Expenses");
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_fuel_expenses: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_manage_fuel_expenses
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_fuel_expenses: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                      rights_view_fuel_expenses: 1,
                                    })
                                  }
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vehicle Expenses */}
                {addonSettingData["addon_dispatch"] == 1 && (
                  <div className="common_access_card">
                    <div className="row">
                      <div className="col-lg-10 col-md-10 col-sm-10 col-4">
                        <div className="left">
                          <div className="title">
                            {t("Dispatch Management")}
                          </div>
                          <div className="contain sub-contain">
                            <ul>
                              <li>
                                <div className="head">
                                  {t("Dispatch Customer")}
                                </div>
                                <ul>
                                  <li>{t("View Dispatch Customer")}</li>
                                  <li>{t("Manage Dispatch Customer")}</li>
                                </ul>
                              </li>
                              <li>
                                <div className="head">
                                  {t("Dispatch Dashboard")}
                                </div>
                                <ul>
                                  <li>{t("View Dispatch Dashboard")}</li>
                                </ul>
                              </li>
                              <li>
                                <div className="head">{t("Orders")}</div>
                                <ul>
                                  <li>{t("View Orders")}</li>
                                  <li>{t("Manage Orders")}</li>
                                </ul>
                              </li>
                              <li>
                                <div className="head">
                                  {t("Vehicle Booking Requests")}
                                </div>
                                <ul>
                                  <li>{t("View Vehicle Booking Requests")}</li>
                                  <li>
                                    {t("Manage Vehicle Booking Requests")}
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <div className="head">
                                  {t("Vehicle Booking Orders")}
                                </div>
                                <ul>
                                  <li>{t("View Vehicle Booking Orders")}</li>
                                  <li>{t("Manage Vehicle Booking Orders")}</li>
                                </ul>
                              </li>
                              <li>
                                <div className="head">{t("Add Orders")}</div>
                                <ul>
                                  <li>{t("View Orders")}</li>
                                  <li>{t("Manage Add Orders")}</li>
                                </ul>
                              </li>
                              <li>
                                <div className="head">{t("Merchants")}</div>
                                <ul>
                                  <li>{t("View Merchants")}</li>
                                  <li>{t("Manage Merchants")}</li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-4">
                        <div className="right">
                          <ul>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_view_dispatch_customer ||
                                    accessRights?.rights_manage_dispatch_customer
                                  }
                                  onChange={(e) => {
                                    accessRights.rights_manage_dispatch_customer &&
                                      manageView("Dispatch Customer");
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_dispatch_customer: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_manage_dispatch_customer
                                  }
                                  onChange={(e) => {
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_dispatch_customer: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                      rights_view_dispatch_customer: 1,
                                    });
                                  }}
                                />
                              </div>
                            </li>

                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.dispatch_manage_dashboard
                                  }
                                  onChange={(e) => {
                                    accessRights?.dispatch_manage_dashboard &&
                                      manageView("dispatch_manage_dashboard");
                                    setAccessRights({
                                      ...accessRights,
                                      dispatch_manage_dashboard: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_view_orders ||
                                    accessRights?.rights_manage_orders
                                  }
                                  onChange={(e) => {
                                    accessRights?.rights_manage_orders &&
                                      manageView("order");
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_orders: e.target.checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={accessRights?.rights_manage_orders}
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_orders: e.target.checked
                                        ? 1
                                        : 0,
                                      rights_view_orders: 1,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_view_vehicle_booking_request ||
                                    accessRights?.rights_manage_vehicle_booking_request
                                  }
                                  onChange={(e) => {
                                    accessRights?.rights_manage_vehicle_booking_request &&
                                      manageView("vehicle booking request");
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_vehicle_booking_request: e
                                        .target.checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_manage_vehicle_booking_request
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_vehicle_booking_request: e
                                        .target.checked
                                        ? 1
                                        : 0,
                                      rights_view_vehicle_booking_request: 1,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_view_vehicle_booking_orders ||
                                    accessRights?.rights_manage_vehicle_booking_orders
                                  }
                                  onChange={(e) => {
                                    accessRights?.rights_manage_vehicle_booking_orders &&
                                      manageView("vehicle order request");
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_vehicle_booking_orders: e
                                        .target.checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_manage_vehicle_booking_orders
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_vehicle_booking_orders: e
                                        .target.checked
                                        ? 1
                                        : 0,
                                      rights_view_vehicle_booking_orders: 1,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_view_delivery_requests ||
                                    accessRights?.rights_manage_delivery_requests
                                  }
                                  onChange={(e) => {
                                    accessRights?.rights_manage_delivery_requests &&
                                      manageView("vehicle Delivery request");
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_delivery_requests: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_manage_delivery_requests
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_delivery_requests: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                      rights_view_delivery_requests: 1,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_view_merchants ||
                                    accessRights?.rights_manage_merchants
                                  }
                                  onChange={(e) => {
                                    accessRights?.rights_manage_merchants &&
                                      manageView("Merchant");
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_merchants: e.target.checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_manage_merchants
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_merchants: e.target.checked
                                        ? 1
                                        : 0,
                                      rights_view_merchants: 1,
                                    })
                                  }
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment */}
                {temperary && (
                  <div className="common_access_card">
                    <div className="row">
                      <div className="col-lg-10 col-md-10 col-sm-10 col-9">
                        <div className="left">
                          <div className="title">{t("Payment")}</div>
                          <div className="contain sub-contain">
                            <ul>
                              <li>
                                <div className="head">{t("Invoiced")}</div>
                                <ul>
                                  <li>{t("View Invoiced")}</li>
                                  <li>{t("Manage Invoiced")}</li>
                                </ul>
                              </li>
                              <li>
                                <div className="head">{t("Paid")}</div>
                                <ul>
                                  <li>{t("View Paid")}</li>
                                  <li>{t("Manage Paid")}</li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                        <div className="right">
                          <ul>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={accessRights?.rights_view_invoiced}
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_invoiced: e.target.checked
                                        ? 1
                                        : 0,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={accessRights?.rights_manage_invoiced}
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_invoiced: e.target.checked
                                        ? 1
                                        : 0,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={accessRights?.rights_view_paid}
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_paid: e.target.checked
                                        ? 1
                                        : 0,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={accessRights?.rights_manage_paid}
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_paid: e.target.checked
                                        ? 1
                                        : 0,
                                    })
                                  }
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Communiation */}

               <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-9">
                      <div className="left">
                        <div className="title">{t("Communication")}</div>
                        <div className="contain sub-contain">
                          <ul>
                            <li>
                              <div className="head">{t("Announcements")}</div>
                              <ul>
                                <li>{t("View Announcements")}</li>
                                <li>{t("Manage Announcements")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">{t("Email")}</div>
                              <ul>
                                <li>{t("View Email")}</li>
                                <li>{t("Manage Email")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">
                                {t("Push notifications")}
                              </div>
                              <ul>
                                <li>{t("View Push notifications")}</li>
                                <li>{t("Manage Push notifications")}</li>
                              </ul>
                            </li>
                            <li>
                              <div className="head">{t("Chat Support")}</div>
                              <ul>
                                <li>{t("View Chat Support")}</li>
                                <li>{t("Manage Chat Support")}</li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_announcement ||
                                  accessRights?.rights_manage_announcement
                                }
                                onChange={(e) => {
                                  accessRights?.rights_manage_announcement &&
                                    manageView("Announcement");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_announcement: e.target.checked
                                      ? 1
                                      : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_manage_announcement
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_announcement: e.target.checked
                                      ? 1
                                      : 0,
                                    rights_view_announcement: 1,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_email ||
                                  accessRights?.rights_manage_email
                                }
                                onChange={(e) => {
                                  accessRights?.rights_manage_email &&
                                    manageView("Email");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_email: e.target.checked ? 1 : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_manage_email}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_email: e.target.checked
                                      ? 1
                                      : 0,
                                    rights_view_email: 1,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_push_notification ||
                                  accessRights?.rights_manage_push_notification
                                }
                                onChange={(e) => {
                                  accessRights?.rights_manage_push_notification &&
                                    manageView("Push Notification");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_push_notification: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_manage_push_notification
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_push_notification: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                    rights_view_push_notification: 1,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_chat_support ||
                                  accessRights?.rights_manage_chat_support
                                }
                                onChange={(e) => {
                                  accessRights?.rights_manage_chat_support &&
                                    manageView("Chat support");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_chat_support: e.target.checked
                                      ? 1
                                      : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_manage_chat_support
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_chat_support: e.target.checked
                                      ? 1
                                      : 0,
                                    rights_view_chat_support: 1,
                                  })
                                }
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* changes sequence of report  */}
                
                {false && (
                  <div className="common_access_card">
                    <div className="row">
                      <div className="col-lg-10 col-md-10 col-sm-10 col-9">
                        <div className="left">
                          <div className="title">
                            {t("Report Distribution")}
                          </div>
                          <div className="contain">
                            <ul>
                              <li>{t("View Report Distribution")}</li>
                              <li>{t("Manage Report Distribution")}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                        <div className="right">
                          <ul>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights.rights_view_report_distribution ||
                                    accessRights?.rights_manage_report_distribution
                                  }
                                  onChange={(e) => {
                                    accessRights?.rights_manage_report_distribution &&
                                      manageView("Report Distribution");
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_report_distribution: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_manage_report_distribution
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_report_distribution: e
                                        .target.checked
                                        ? 1
                                        : 0,
                                      rights_view_report_distribution: 1,
                                    })
                                  }
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {accessRights && accessRights.rights_view_reports ? (
               
                  <div className="common_access_card">
                    <div className="row">
                      <div className="col-lg-10 col-md-10 col-sm-10 ">
                        <div className="left">
                          <div className="title">{t("Report")}</div>
                          <div className="contain sub-contain">
                            <ul>
                              <li>
                                <div className="head">
                                  {t("Vehicle Running Report")}
                                </div>
                                <ul>
                                  <li>{t("Vehicle Running Summary Report")}</li>
                                  <li>
                                    {t("Vehicle Ignition Summary Report")}
                                  </li>
                                  <li>{t("Vehicle Running Report")}</li>
                                  <li>{t("Vehicle Stopage Report")}</li>
                                  <li>{t("Vehicle Idle Report")}</li>
                                  <li>
                                    {t("Vehicle First & Last Ignition Report")}
                                  </li>
                                  <li>
                                    {t("Vehicle Location Activity Report")}
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <div className="head">
                                  {t("Vehicle Report")}
                                </div>
                                <ul>
                                  <li>{t("Live Vehicles Location Report")}</li>
                                  <li>
                                    {t("Vehicle Count and Seat Capacity")}
                                  </li>
                                  <li>{t("Vehicle Location Signal")}</li>
                                  <li>{t("Vehicle Speed Report")}</li>
                                </ul>
                              </li>
                              {userRole === "customer" ||
                              (addonSettingData &&
                                addonSettingData.addon_ivms) ? (
                                <li>
                                  <div className="head">
                                    {t("IVMS Real Time Tracking")}
                                  </div>
                                  <ul>
                                    {userRole === "customer" ||
                                    (accessRights &&
                                      addonSettingData.addon_over_speed) ? (
                                      <li>{t("Over Speeding Report")}</li>
                                    ) : null}
                                    {userRole === "customer" ||
                                    (accessRights &&
                                      addonSettingData.addon_seat_belt_sensor) ? (
                                      <li>{t("Seatbelt Violation Report")}</li>
                                    ) : null}
                                    {userRole === "customer" ||
                                    (accessRights &&
                                      addonSettingData.addon_over_speed) ? (
                                      <li>{t("Immobiliser Report")}</li>
                                    ) : null}
                                    {userRole === "customer" ||
                                    (accessRights &&
                                      addonSettingData.addon_temperature_sensor) ? (
                                      <li>{t("Temprature")}</li>
                                    ) : null}
                                    {/* <li>{t("Safe Driver Ranking Report")}</li> */}
                                    <li>
                                      {t(
                                        "Harsh Accelerationand Harsh Breaking Report"
                                      )}
                                    </li>
                                    <li>
                                      {t("Acceleration threshold report")}
                                    </li>
                                  </ul>
                                </li>
                              ) : null}
                              {userRole === "customer" ||
                              (addonSettingData &&
                                addonSettingData.addon_dispatch) ? (
                                <li>
                                  <div className="head">
                                    {t("Delivery Dispatch Report")}
                                  </div>
                                  <ul>
                                    <li>{t("Dispatch Report")}</li>
                                    <li>{t("Dispatch Customer Order")}</li>
                                    <li>{t("Dispatch Merchant Order")}</li>
                                    <li>{t("Delivery Person Order")}</li>
                                    <li>{t("Merchant Order Summary")}</li>
                                    <li>{t("Merchant Order Summary")}</li>
                                    <li>{t("Load And Unload Report")}</li>
                                    <li>
                                      {t("Schedule vs Actual ETA Report")}
                                    </li>
                                  </ul>
                                </li>
                              ) : null}
                              {userRole === "customer" ||
                              (addonSettingData &&
                                addonSettingData.addon_dispatch) 
                                ?
                                 (
                                <li>
                                  <div className="head">
                                    {t("Trip Report")}
                                  </div>
                                  <ul>
                                    <li>{t("Trip Activity Report")}</li>
                                    <li>{t("Trip Assigned Versus Completed")}</li>
                                    <li>{t("Trip Versus Pickup Count")}</li>
                                    <li>{t("Trip Manifest")}</li>
                                    <li>{t("Pickup point Report")}</li>
                                    <li>{t("Live Trip Location Report")}</li>
                                     
                                  </ul>
                                </li>
                              ) 
                              : null
                            }
                              {userRole === "customer" ||
                              (addonSettingData &&
                                addonSettingData.addon_dispatch) 
                                ?
                                 (
                                <li>
                                  <div className="head">
                                    {t("Driver Report")}
                                  </div>
                                  <ul>
                                    <li>{t("Safe Driver Ranking Report")}</li>
                                    <li>{t("Driver First & List ignition Report")}</li>
                                    <li>{t("Driver Activity Report")}</li>
                                    <li>{t("Driver Activity Summary Report")}</li>
                                      
                                     
                                  </ul>
                                </li>
                              ) 
                              : null
                            }
{/* start ///////////////////////  maintainance report //////////////////////////////////////////////// */}
                    {userRole === "customer" ||
                              (addonSettingData &&
                                addonSettingData.addon_dispatch) 
                                ?
                                 (
                                <li>
                                  <div className="head">
                                    {t("Maintenance Reports")}
                                  </div>
                                  <ul>
                                    <li>{t("Inspection Due Report")}</li>
                                    <li>{t("Insurance Expiry Report")}</li>
                                    <li>{t("Registration Expiry Report")}</li>
                                    <li>{t("Tax Expiry Report")}</li>
                                    <li>{t("Maintenance Overdues Report")}</li>
                                    <li>{t("Maintenance Dues Soon Report")}</li>
                                    <li>{t("Driver Licence Expiry Report")}</li>
                                      
                                     
                                  </ul>
                                </li>
                              ) 
                              : null
                            }
 {/* end ///////////////////////  maintainance report //////////////////////////////////////////////// */}
                           
{/* start ///////////////////////  Expense report //////////////////////////////////////////////// */}

{userRole === "customer" ||
                              (addonSettingData &&
                                addonSettingData.addon_dispatch) 
                                ?
                                 (
                                <li>
                                  <div className="head">
                                    {t("Expense Reports")}
                                  </div>
                                  <ul>
                                    <li>{t("Vehicle Expense Report")}</li>
                                    <li>{t("Vehicle Fuel Expense Report")}</li>
                                   
                                  </ul>
                                </li>
                              ) 
                              : null
                            } 

{/* end ///////////////////////  Maintainance Report //////////////////////////////////////////////// */}

                             
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 ">
                        <div className="right">
                          <ul>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.vehicle_running_summary_report
                                  }
                                  onChange={(e) => {
                                    accessRights?.vehicle_running_summary_report &&
                                      manageView("true");
                                    setAccessRights({
                                      ...accessRights,
                                      vehicle_running_summary_report: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.vehicle_ignition_summary_report
                                  }
                                  onChange={(e) => {
                                    accessRights?.vehicle_ignition_summary_report &&
                                      manageView("true");
                                    setAccessRights({
                                      ...accessRights,
                                      vehicle_ignition_summary_report: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={accessRights?.vehicle_running_report}
                                  onChange={(e) => {
                                    accessRights?.vehicle_running_report &&
                                      manageView("true");
                                    setAccessRights({
                                      ...accessRights,
                                      vehicle_running_report: e.target.checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={accessRights?.vehicle_stopage_report}
                                  onChange={(e) => {
                                    accessRights?.vehicle_stopage_report &&
                                      manageView("true");
                                    setAccessRights({
                                      ...accessRights,
                                      vehicle_stopage_report: e.target.checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={accessRights?.vehicle_idle_report}
                                  onChange={(e) => {
                                    accessRights?.vehicle_idle_report &&
                                      manageView("true");
                                    setAccessRights({
                                      ...accessRights,
                                      vehicle_idle_report: e.target.checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.vehicle_first_last_ignition_report
                                  }
                                  onChange={(e) => {
                                    accessRights?.vehicle_first_last_ignition_report &&
                                      manageView("true");
                                    setAccessRights({
                                      ...accessRights,
                                      vehicle_first_last_ignition_report: e
                                        .target.checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.vehicle_location_activity_report
                                  }
                                  onChange={(e) => {
                                    accessRights?.vehicle_location_activity_report &&
                                      manageView("true");
                                    setAccessRights({
                                      ...accessRights,
                                      vehicle_location_activity_report: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.live_vehicles_location_report
                                  }
                                  onChange={(e) => {
                                    accessRights?.live_vehicles_location_report &&
                                      manageView("true");
                                    setAccessRights({
                                      ...accessRights,
                                      live_vehicles_location_report: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.vehicle_count_and_seat_capacity_report
                                  }
                                  onChange={(e) => {
                                    accessRights?.vehicle_count_and_seat_capacity_report &&
                                      manageView("true");
                                    setAccessRights({
                                      ...accessRights,
                                      vehicle_count_and_seat_capacity_report: e
                                        .target.checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.vehicle_location_signal_report
                                  }
                                  onChange={(e) => {
                                    accessRights?.vehicle_location_signal_report &&
                                      manageView("true");
                                    setAccessRights({
                                      ...accessRights,
                                      vehicle_location_signal_report: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={accessRights?.vehicle_speed_report}
                                  onChange={(e) => {
                                    accessRights?.vehicle_speed_report &&
                                      manageView("true");
                                    setAccessRights({
                                      ...accessRights,
                                      vehicle_speed_report: e.target.checked
                                        ? 1
                                        : 0,
                                    });
                                  }}
                                />
                              </div>
                            </li>
                            {userRole === "customer" ||
                            (addonSettingData &&
                              addonSettingData.addon_ivms) ? (
                              <>
                                {userRole === "customer" ||
                                (accessRights &&
                                  addonSettingData.addon_over_speed) ? (
                                  <li>
                                    <div
                                      className="form-check form-switch"
                                      id="custom_switch"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={
                                          accessRights?.over_speeding_report
                                        }
                                        onChange={(e) => {
                                          accessRights?.over_speeding_report &&
                                            manageView("true");
                                          setAccessRights({
                                            ...accessRights,
                                            over_speeding_report: e.target
                                              .checked
                                              ? 1
                                              : 0,
                                          });
                                        }}
                                      />
                                    </div>
                                  </li>
                                ) : null}
                                {userRole === "customer" ||
                                (accessRights &&
                                  addonSettingData.addon_seat_belt_sensor) ? (
                                  <li>
                                    <div
                                      className="form-check form-switch"
                                      id="custom_switch"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={
                                          accessRights?.seatbelt_violation_report
                                        }
                                        onChange={(e) => {
                                          accessRights?.seatbelt_violation_report &&
                                            manageView("true");
                                          setAccessRights({
                                            ...accessRights,
                                            seatbelt_violation_report: e.target
                                              .checked
                                              ? 1
                                              : 0,
                                          });
                                        }}
                                      />
                                    </div>
                                  </li>
                                ) : null}
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={accessRights?.immobiliser_report}
                                      onChange={(e) => {
                                        accessRights?.immobiliser_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          immobiliser_report: e.target.checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                {userRole === "customer" ||
                                (accessRights &&
                                  addonSettingData.addon_temperature_sensor) ? (
                                  <li>
                                    <div
                                      className="form-check form-switch"
                                      id="custom_switch"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={
                                          accessRights?.temperature_report
                                        }
                                        onChange={(e) => {
                                          accessRights?.temperature_report &&
                                            manageView("true");
                                          setAccessRights({
                                            ...accessRights,
                                            temperature_report: e.target.checked
                                              ? 1
                                              : 0,
                                          });
                                        }}
                                      />
                                    </div>
                                  </li>
                                ) : null}
                               
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.harsh_acceleration_and_harsh_breaking_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.harsh_acceleration_and_harsh_breaking_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          harsh_acceleration_and_harsh_breaking_report:
                                            e.target.checked ? 1 : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>

                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.acceleration_vs_deacceleration_threshold_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.acceleration_vs_deacceleration_threshold_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          acceleration_vs_deacceleration_threshold_report:
                                            e.target.checked ? 1 : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                              </>
                            ) : null}

                            {/* dispatch */}

                            {userRole === "customer" ||
                            (addonSettingData &&
                              addonSettingData.addon_dispatch) ? (
                              <>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={accessRights?.dispatch_report}
                                      onChange={(e) => {
                                        accessRights?.dispatch_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          dispatch_report: e.target.checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>

                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.dispatch_customer_order_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.dispatch_customer_order_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          dispatch_customer_order_report: e
                                            .target.checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>

                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.dispatch_merchant_order_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.dispatch_merchant_order_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          dispatch_merchant_order_report: e
                                            .target.checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>

                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.delivery_person_order_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.delivery_person_order_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          delivery_person_order_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>

                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.merchant_order_summary_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.merchant_order_summary_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          merchant_order_summary_report: e
                                            .target.checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.customer_order_summary_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.customer_order_summary_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          customer_order_summary_report: e
                                            .target.checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>

                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={accessRights?.load_upload_report}
                                      onChange={(e) => {
                                        accessRights?.load_upload_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          load_upload_report: e.target.checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                    >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.trip_schedule_eta_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.trip_schedule_eta_report &&
                                        manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          trip_schedule_eta_report: e.target
                                          .checked
                                          ? 1
                                          : 0,
                                        });
                                      }}
                                      />
                                  </div>
                                </li>
                                      {/* ///////////trip report by shailesh////// */}
                                      {userRole === "customer" ||
                            (addonSettingData &&
                              addonSettingData.addon_dispatch) ? (
                                <>
                               
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.trip_activity_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.trip_activity_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          trip_activity_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.trip_assigned_versus_completed_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.trip_assigned_versus_completed_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          trip_assigned_versus_completed_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.trip_versus_pickup_count_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.trip_versus_pickup_count_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          trip_versus_pickup_count_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.trip_manifest_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.trip_manifest_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          trip_manifest_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.pickup_point_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.pickup_point_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          pickup_point_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.live_trip_location_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.live_trip_location_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          live_trip_location_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                </>
                                 ) : null}

                                      {/* /////Driver Report ///// */}
                                      <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.safe_driver_ranking_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.safe_driver_ranking_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          safe_driver_ranking_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                      <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.driver_first_and_last_ignition_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.driver_first_and_last_ignition_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          driver_first_and_last_ignition_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                      <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.user_activity_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.user_activity_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          user_activity_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                      <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.driver_activity_summary_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.driver_activity_summary_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          driver_activity_summary_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>

                              </>
                            ) : null}

 {/* start///////////Maintenance Reports //////////////////////////////////////////////////////////// */}
 {userRole === "customer" ||
                            (addonSettingData &&
                              addonSettingData.addon_dispatch) ? (
                                <>
                               
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.inspection_due_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.inspection_due_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          inspection_due_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.insurance_expiry_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.insurance_expiry_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          insurance_expiry_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.registration_expiry_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.registration_expiry_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          registration_expiry_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.tax_expiry_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.tax_expiry_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          tax_expiry_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.maintenance_overdues_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.maintenance_overdues_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          maintenance_overdues_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.maintenance_dues_soon_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.maintenance_dues_soon_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          maintenance_dues_soon_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.driver_licence_expiry_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.driver_licence_expiry_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          driver_licence_expiry_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                </>
                                 ) : null}

{/* end///////////Maintenance Reports //////////////////////////////////////////////////////////// */}
 
{/* start///////////Expense Reports //////////////////////////////////////////////////////////// */}

{userRole === "customer" ||
                            (addonSettingData &&
                              addonSettingData.addon_dispatch) ? (
                                <>
                               
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.vehicle_expense_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.vehicle_expense_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          vehicle_expense_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.vehicle_expense_report
                                      }
                                      onChange={(e) => {
                                        accessRights?.vehicle_expense_report &&
                                          manageView("true");
                                        setAccessRights({
                                          ...accessRights,
                                          vehicle_expense_report: e.target
                                            .checked
                                            ? 1
                                            : 0,
                                        });
                                      }}
                                    />
                                  </div>
                                </li>
                               
                                </>
                                 ) : null}


{/* end///////////Maintenance Reports //////////////////////////////////////////////////////////// */}
 
    
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {temperary && (
                  <div className="common_access_card">
                    <div className="row">
                      <div className="col-lg-10 col-md-10 col-sm-10 col-9">
                        <div className="left">
                          <div className="title">
                            {t("Configuration Checker")}
                          </div>
                          <div className="contain">
                            <ul>
                              <li>{t("View Configuration Checker")}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                        <div className="right">
                          <ul>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_view_configuration_checker
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_configuration_checker: e
                                        .target.checked
                                        ? 1
                                        : 0,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            {/* <li>
                          <div
                            className="form-check form-switch"
                            id="custom_switch"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={accessRights.rights_delete_helper}
                              onChange={(e) =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_delete_helper: e.target.checked
                                    ? 1
                                    : 0,
                                })
                              }
                            />
                          </div>
                        </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-9">
                      <div className="left">
                        <div className="title">{t("Parking Management")}</div>
                        <div className="contain">
                          <ul>
                            <li>{t("View Parking Management")}</li>
                            <li>{t("Manage Parking Management")} </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_parking_management ||
                                  accessRights?.rights_manage_parking_management
                                }
                                onChange={(e) => {
                                  accessRights?.rights_manage_parking_management &&
                                    manageView("parking Management");
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_parking_management: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                  });
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_manage_parking_management
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_manage_parking_management: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                    rights_view_parking_management: 1,
                                  })
                                }
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>*/}

                <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-9">
                      <div className="left">
                        <div className="title">{t("Replay Or Payback's")}</div>
                        <div className="contain">
                          <ul>
                            <li>{t("View Replay Or Payback's")}</li>
                            {/* <li>{t("Manage Replay Or Payback's")} </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  accessRights?.rights_view_replay_or_paybacks
                                }
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_view_replay_or_paybacks: e.target
                                      .checked
                                      ? 1
                                      : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          {/* <li>
                          <div
                            className='form-check form-switch'
                            id='custom_switch'
                          >
                            <input
                              className='form-check-input'
                              type='checkbox'
                              checked={
                                accessRights.rights_manage_replay_or_paybacks
                              }
                              onChange={e =>
                                setAccessRights({
                                  ...accessRights,
                                  rights_manage_replay_or_paybacks: e.target
                                    .checked
                                    ? 1
                                    : 0
                                })
                              }
                            />
                          </div>
                        </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fuel Management */}
                {temperary && (
                  <div className="common_access_card">
                    <div className="row">
                      <div className="col-lg-10 col-md-10 col-sm-10 col-9">
                        <div className="left">
                          <div className="title">{t("Fuel Management")}</div>
                          <div className="contain sub-contain">
                            <ul>
                              <li>
                                <div className="head">{t("Dashboard")}</div>
                                <ul>
                                  <li>{t("View Dashboard")}</li>
                                  <li>{t("Manage Dashboard")}</li>
                                </ul>
                              </li>
                              <li>
                                <div className="head">{t("Fuel Details")}</div>
                                <ul>
                                  <li>{t("View Fuel Details")}</li>
                                  <li>{t("Manage Fuel Details")}</li>
                                </ul>
                              </li>
                              <li>
                                <div className="head">{t("Fuel Alerts")}</div>
                                <ul>
                                  <li>{t("View Fuel Alerts")}</li>
                                  <li>{t("Manage Fuel Alerts")}</li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                        <div className="right">
                          <ul>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_view_fuel_management_dashboard
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_fuel_management_dashboard: e
                                        .target.checked
                                        ? 1
                                        : 0,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_manage_fuel_management_dashboard
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_fuel_management_dashboard: e
                                        .target.checked
                                        ? 1
                                        : 0,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_view_fuel_management_fuel_details
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_fuel_management_fuel_details:
                                        e.target.checked ? 1 : 0,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_manage_fuel_management_fuel_details
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_fuel_management_fuel_details:
                                        e.target.checked ? 1 : 0,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_view_fuel_management_fuel_alerts
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_fuel_management_fuel_alerts: e
                                        .target.checked
                                        ? 1
                                        : 0,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_manage_fuel_management_fuel_alerts
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_fuel_management_fuel_alerts:
                                        e.target.checked ? 1 : 0,
                                    })
                                  }
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vehicle Inspection*/}
                {
                  // (
                  addonSettingData["addon_vehicle_inspection"] == 1 &&
                    // ||
                    //   addonSettingData["addon_vehicle_marketplace"] == 1)
                    temperary && (
                      <div className="common_access_card">
                        <div className="row">
                          <div className="col-lg-10 col-md-10 col-sm-10 col-9">
                            <div className="left">
                              <div className="title">
                                {t("Vehicle Inspection")}
                              </div>
                              <div className="contain sub-contain">
                                <ul>
                                  <li>
                                    <div className="head">{t("Dashboard")}</div>
                                    <ul>
                                      <li>{t("View Dashboard")}</li>
                                      <li>{t("Manage Dashboard")}</li>
                                    </ul>
                                  </li>
                                  <li>
                                    <div className="head">
                                      {t("Inspection")}
                                    </div>
                                    <ul>
                                      <li>{t("View Inspection")}</li>
                                      <li>{t("Manage Inspection")}</li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                            <div className="right">
                              <ul>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.rights_view_vehicle_inspection_dashboard
                                      }
                                      onChange={(e) =>
                                        setAccessRights({
                                          ...accessRights,
                                          rights_view_vehicle_inspection_dashboard:
                                            e.target.checked ? 1 : 0,
                                        })
                                      }
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.rights_manage_vehicle_inspection_dashboard
                                      }
                                      onChange={(e) =>
                                        setAccessRights({
                                          ...accessRights,
                                          rights_manage_vehicle_inspection_dashboard:
                                            e.target.checked ? 1 : 0,
                                        })
                                      }
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.rights_view_vehicle_inspection_inspection
                                      }
                                      onChange={(e) =>
                                        setAccessRights({
                                          ...accessRights,
                                          rights_view_vehicle_inspection_inspection:
                                            e.target.checked ? 1 : 0,
                                        })
                                      }
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className="form-check form-switch"
                                    id="custom_switch"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        accessRights?.rights_manage_vehicle_inspection_inspection
                                      }
                                      onChange={(e) =>
                                        setAccessRights({
                                          ...accessRights,
                                          rights_manage_vehicle_inspection_inspection:
                                            e.target.checked ? 1 : 0,
                                        })
                                      }
                                    />
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                }

                {temperary && (
                  <div className="common_access_card">
                    <div className="row">
                      <div className="col-lg-10 col-md-10 col-sm-10 col-9">
                        <div className="left">
                          <div className="title">{t("User Insights")}</div>
                          <div className="contain">
                            <ul>
                              <li>{t("View User Insights")}</li>
                              <li>{t("Manage User Insights")}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                        <div className="right">
                          <ul>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_view_user_insights
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_view_user_insights: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <div
                                className="form-check form-switch"
                                id="custom_switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    accessRights?.rights_manage_user_insights
                                  }
                                  onChange={(e) =>
                                    setAccessRights({
                                      ...accessRights,
                                      rights_manage_user_insights: e.target
                                        .checked
                                        ? 1
                                        : 0,
                                    })
                                  }
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="d-flex justify-content-end align-items-center btn-wrapper">
          <button className="globalBtn" onClick={submitData}>
            {t("Submit")}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AcessRole;

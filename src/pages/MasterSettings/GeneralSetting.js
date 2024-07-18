import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
import { simpleGetCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import Loader from "../../sharedComponent/Loader";
import ReactSelect from "../../sharedComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import range from "lodash/range";
import { dateFormat } from "../../store/loginSlice";
import { Select } from "antd";
const { Option } = Select;

const GeneralSetting = () => {
  const dispach = useDispatch();
  const formatDate = useSelector((state) => state.auth.dateFormat);
  const {
    sidebar,
    setSidebar,
    Dark,
    setDateFormatConfig,
    setTimeFormat,
    setGoogleMap,
    setWeekenHide,
    setRecordsPerPage,
    help_setting_disable, set_help_setting_disable
  } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [genralSetting, setGenralSetting] = useState(
    //   {
    //   settings_idle_duration:5,
    //   customer_weekend_days:[]
    // }
    {
      settings_help : 0,
      customer_speed_limit: "",
      customer_date_format: "",
      customer_page_limit: "",
      customer_weekend_days: [],
      customer_customer_geofence: "",
      customer_transportation_geofence: "",
      customer_pickup_geofence: "",
      customer_browser_google_key: "",
      settings_untrack_duration: 60,
      settings_idle_duration: 5,
      settings_acceleration: "",
      settings_deacceleration: "",
      settings_historical_movement_map: "",
      settings_historical_movement_trip_minutes: 5,
      settings_bus_label: 0,
      settings_data_optimise: 0,
      settings_data_collection: 0,
      settings_data_update: 0,
      settings_parkingslot_minimum_vehiclecount: 0,
      settings_parkingslot_anomalycount: 0,
      settings_parkingslot_maximum_radius: 0,
      settings_cctv_ip: null,
      settings_cctv_port: null,
      settings_cctv_username: null,
      settings_cctv_password: null,
      settings_cctv_sdk: null,
      settings_cctv_apache_port: null,
      settings_online_payment: 0,
      settings_busassistant_role: 0,
      settings_historical_data: 0,
      settings_vehicle_expense: 0,
      settings_trip_card: 0,
      settings_employee_attendance: 0,
      settings_fleetmanager_role: 0,
      settings_parked_temperature: 0,
      settings_running_temperature: null,
      settings_time_format:
        localStorage.getItem("settings_time_format") || "24",
      settings_week_start_day:
        localStorage.getItem("settings_week_start_day") || "Monday",
    }
  );


  const { t, i18n } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      handleDays(event);
    }

    setValidated(true);
  };

  const handleDays = (event) => {
    event.preventDefault();
    if (genralSetting?.customer_weekend_days?.length > 0) {
      let body = JSON.stringify({
        ...genralSetting,
        customer_weekend_days:
          genralSetting?.customer_weekend_days.length > 0
            ? genralSetting?.customer_weekend_days.join(",")
            : "",
      });
      setLoading(true);
      simplePostCall(ApiConfig.UPDATE_GENRAL_SETTING, body)
        .then((res) => {
          if (res.result) {
            notifySuccess(res?.message);
            GenralSettings();
          } else {
            console.log("error response", res);
          }
        })
        .catch((err) => {
          console.log("err", err);
          notifyError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError(t("Please Select Working Day"));
    }
  };

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  useEffect(() => {
    GenralSettings();
  }, []);
  

  const GenralSettings = () => {
    setLoading(true);
    simpleGetCall(ApiConfig.GET_ALL_GENRAL_SETTING)
      .then((res) => {
        console.log(res, "");
        if (res?.result) {
          let weekDaysArr = res.data?.customer_weekend_days?.split(",");
          let dateForamte;
          if (res.data?.customer_date_format == "Y-m-d") {
            dateForamte = "YYYY-MM-DD";
            setDateFormatConfig("YYYY-MM-DD");
          }
          if (
            res.data?.customer_date_format == "d-m-y" ||
            res.data?.customer_date_format == "d-m-Y" ||
            res.data?.customer_date_format == "D M j Y"
          ) {
            dateForamte = "dd-mm-yyyy";
            setDateFormatConfig("dd-mm-yyyy");
          }
          if (res.data?.customer_date_format == "Fj,Y") {
            dateForamte = "MM-DD-YYYY";
            setDateFormatConfig("MM-DD-YYYY");
          }
          if (res.data?.customer_date_format == "D M j Y") {
            dateForamte = "dd/mm/yyyy";
            setDateFormatConfig("DD/MM/YYYY");
          }

          setRecordsPerPage(res?.data?.customer_page_limit);
          set_help_setting_disable(res?.data?.settings_help);
          setGenralSetting({
            ...res.data,
            customer_weekend_days: weekDaysArr,
            customer_date_format: dateForamte ? dateForamte : "MM-DD-YYYY",
          });
          localStorage.setItem("page_limit", res.data?.customer_page_limit);
          localStorage.setItem(
            "settings_time_format",
            res.data?.genralSetting.settings_time_format
          );
          localStorage.setItem(
            "settings_week_start_day",
            res.data?.genralSetting.settings_week_start_day
          );
          // setGoogleMap(res.data.settings_historical_movement_map);
          // dispach(
          //   dateFormat({
          //     VtDataFormat: res.data,
          //   })
          // );
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const pickupRadius = range(50, 501, 50);
  const Duration = range(60, 250, 10);
  const speedLimit = range(50, 151, 5);
  const customerGeofenceRadius = range(100, 501, 50);
  const recordsPerPage1 = range(5, 101, 5);
  const transportationGeofence = range(25, 501, 25);
  // const
 

  useEffect(() => {
    if(sessionStorage.getItem('t_help_disable') === '1') {
    const targetElement = document.getElementById('help-setting-card');
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
    }
    }
    setTimeout(() => {
      sessionStorage.removeItem('t_help_disable');
    }, 3000);
    
}, [GenralSettings]);
function handleHelpSettingChange(e) {
  const {  checked } = e.target;
 
  set_help_setting_disable(checked);
 
}
/* function handleHelpSettingChange1(event) {
  const isChecked = event.currentTarget.checked; // Get the checked state
  const valueToStore = isChecked ? 1 : 0; // Assign 1 or 0 based on checked state
set_help_setting_disable(valueToStore)
} */

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
       
        <div id="cx-wrapper" className="General_Setting">
          {loading ? (
            <Loader />
          ) : (
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="main-master-wrapper form_input_main">
                <div className="Heading">
                  <p>{t("Settings ")}</p>
                </div>
                <div className="innerInputsGen" id="switchMain ">
                  <div className="row">
                    <div className="weekCounter col-md-12 form_input_main">
                      <label className="headingText">
                        {t("Weekend days")} <span>&#42;</span>
                      </label>
                      <div className="d-flex align-items-center flex-wrap innerToggle">
                        <div className="form-check form-switch">
                          <div className="d-flex innerFlexTog">
                            <label
                              className="form-check-label toggleLabel"
                              for="Monday"
                            >
                              {t("Monday")}
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="Monday"
                              // checked={
                              //   genralSetting.customer_weekend_days &&
                              //   !genralSetting.customer_weekend_days.includes(
                              //     "mon"
                              //   )
                              // }
                              checked={
                                genralSetting.customer_weekend_days &&
                                genralSetting.customer_weekend_days?.includes(
                                  "mon"
                                )
                              }
                              onChange={(e) => {
                                setError("");
                                let filteredArr =
                                  Array.isArray(
                                    genralSetting?.customer_weekend_days
                                  ) &&
                                  genralSetting?.customer_weekend_days?.filter(
                                    (item) => {
                                      return item !== "mon";
                                    }
                                  );
                                setGenralSetting({
                                  ...genralSetting,
                                  customer_weekend_days: e.target.checked
                                    ? [
                                        ...genralSetting.customer_weekend_days,
                                        "mon",
                                      ]
                                    : filteredArr,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-check form-switch">
                          <div className="d-flex innerFlexTog">
                            <label
                              className="form-check-label  toggleLabel"
                              for="Tuesday"
                            >
                              {t("Tuesday")}
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="Tuesday"
                              checked={
                                genralSetting.customer_weekend_days &&
                                genralSetting.customer_weekend_days.includes(
                                  "tue"
                                )
                              }
                              onChange={(e) => {
                                setError("");
                                let filteredArr =
                                  genralSetting.customer_weekend_days &&
                                  genralSetting.customer_weekend_days?.filter(
                                    (item) => {
                                      return item !== "tue";
                                    }
                                  );
                                setGenralSetting({
                                  ...genralSetting,
                                  customer_weekend_days: e.target.checked
                                    ? [
                                        ...genralSetting.customer_weekend_days,
                                        "tue",
                                      ]
                                    : filteredArr,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-check form-switch">
                          <div className="d-flex innerFlexTog">
                            <label
                              className="form-check-label  toggleLabel"
                              for="Wednesday"
                            >
                              {t("Wednesday")}
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="Wednesday"
                              checked={
                                genralSetting.customer_weekend_days &&
                                genralSetting.customer_weekend_days.includes(
                                  "wed"
                                )
                              }
                              onChange={(e) => {
                                setError("");
                                let filteredArr =
                                  genralSetting.customer_weekend_days &&
                                  genralSetting.customer_weekend_days?.filter(
                                    (item) => {
                                      return item !== "wed";
                                    }
                                  );
                                setGenralSetting({
                                  ...genralSetting,
                                  customer_weekend_days: e.target.checked
                                    ? [
                                        ...genralSetting.customer_weekend_days,
                                        "wed",
                                      ]
                                    : filteredArr,
                                });
                              }}

                              // onChange={(e) =>
                              //   setGenralSetting({
                              //     ...genralSetting,
                              //     customer_weekend_days: e.target.checked
                              //       ? genralSetting.customer_weekend_days.replace(
                              //         "wed",
                              //         ""
                              //       )
                              //       : genralSetting.customer_weekend_days +
                              //       "wed",
                              //   })
                              // }
                            />
                          </div>
                        </div>
                        <div className="form-check form-switch">
                          <div className="d-flex innerFlexTog">
                            <label
                              className="form-check-label  toggleLabel"
                              for="Thursday"
                            >
                              {t("Thursday")}
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="Thursday"
                              // checked={
                              //   genralSetting.customer_weekend_days &&
                              //   !genralSetting.customer_weekend_days.includes(
                              //     "thu"
                              //   )
                              // }
                              checked={
                                genralSetting.customer_weekend_days &&
                                genralSetting.customer_weekend_days.includes(
                                  "thu"
                                )
                              }
                              onChange={(e) => {
                                setError("");
                                let filteredArr =
                                  genralSetting.customer_weekend_days &&
                                  genralSetting.customer_weekend_days?.filter(
                                    (item) => {
                                      return item !== "thu";
                                    }
                                  );
                                setGenralSetting({
                                  ...genralSetting,
                                  customer_weekend_days: e.target.checked
                                    ? [
                                        ...genralSetting.customer_weekend_days,
                                        "thu",
                                      ]
                                    : filteredArr,
                                });
                              }}

                              // onChange={(e) =>
                              //   setGenralSetting({
                              //     ...genralSetting,
                              //     customer_weekend_days: e.target.checked
                              //       ? genralSetting.customer_weekend_days.replace(
                              //         "thu",
                              //         ""
                              //       )
                              //       : genralSetting.customer_weekend_days +
                              //       "thu",
                              //   })
                              // }
                            />
                          </div>
                        </div>
                        <div className="form-check form-switch">
                          <div className="d-flex innerFlexTog">
                            <label
                              className="form-check-label  toggleLabel"
                              for="Friday"
                            >
                              {t("Friday")}
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="Friday"
                              // checked={
                              //   genralSetting.customer_weekend_days &&
                              //   !genralSetting.customer_weekend_days.includes(
                              //     "fri"
                              //   )
                              // }

                              checked={
                                genralSetting.customer_weekend_days &&
                                genralSetting.customer_weekend_days.includes(
                                  "fri"
                                )
                              }
                              onChange={(e) => {
                                setError("");
                                let filteredArr =
                                  genralSetting.customer_weekend_days &&
                                  genralSetting.customer_weekend_days?.filter(
                                    (item) => {
                                      return item !== "fri";
                                    }
                                  );
                                setGenralSetting({
                                  ...genralSetting,
                                  customer_weekend_days: e.target.checked
                                    ? [
                                        ...genralSetting.customer_weekend_days,
                                        "fri",
                                      ]
                                    : filteredArr,
                                });
                              }}

                              // onChange={(e) =>
                              //   setGenralSetting({
                              //     ...genralSetting,
                              //     customer_weekend_days: e.target.checked
                              //       ? genralSetting.customer_weekend_days.replace(
                              //         "fri",
                              //         ""
                              //       )
                              //       : genralSetting.customer_weekend_days +
                              //       "fri",
                              //   })
                              // }
                            />
                          </div>
                        </div>
                        <div className="form-check form-switch">
                          <div className="d-flex innerFlexTog">
                            <label
                              className="form-check-label  toggleLabel"
                              for="Saturday"
                            >
                              {t("Saturday")}
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="Saturday"
                              // checked={
                              //   genralSetting.customer_weekend_days &&
                              //   !genralSetting.customer_weekend_days.includes(
                              //     "sat"
                              //   )
                              // }

                              checked={
                                genralSetting?.customer_weekend_days &&
                                genralSetting?.customer_weekend_days.includes(
                                  "sat"
                                )
                              }
                              onChange={(e) => {
                                setError("");
                                let filteredArr =
                                  genralSetting?.customer_weekend_days &&
                                  genralSetting?.customer_weekend_days?.filter(
                                    (item) => {
                                      return item !== "sat";
                                    }
                                  );
                                setGenralSetting({
                                  ...genralSetting,
                                  customer_weekend_days: e.target.checked
                                    ? [
                                        ...genralSetting.customer_weekend_days,
                                        "sat",
                                      ]
                                    : filteredArr,
                                });
                              }}

                              // onChange={(e) =>
                              //   setGenralSetting({
                              //     ...genralSetting,
                              //     customer_weekend_days: e.target.checked
                              //       ? genralSetting.customer_weekend_days.replace(
                              //         "sat",
                              //         ""
                              //       )
                              //       : genralSetting.customer_weekend_days +
                              //       "sat",
                              //   })
                              // }
                            />
                          </div>
                        </div>
                        <div className="form-check form-switch">
                          <div className="d-flex innerFlexTog">
                            <label
                              className="form-check-label  toggleLabel"
                              for="Sunday"
                            >
                              {t("Sunday")}
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="Sunday"
                              // checked={
                              //   genralSetting.customer_weekend_days &&
                              //   !genralSetting.customer_weekend_days.includes(
                              //     "sun"
                              //   )
                              // }

                              checked={
                                genralSetting.customer_weekend_days &&
                                genralSetting.customer_weekend_days.includes(
                                  "sun"
                                )
                              }
                              onChange={(e) => {
                                setError("");
                                let filteredArr =
                                  genralSetting.customer_weekend_days &&
                                  genralSetting.customer_weekend_days?.filter(
                                    (item) => {
                                      return item !== "sun";
                                    }
                                  );
                                setGenralSetting({
                                  ...genralSetting,
                                  customer_weekend_days: e.target.checked
                                    ? [
                                        ...genralSetting.customer_weekend_days,
                                        "sun",
                                      ]
                                    : filteredArr,
                                });
                              }}

                              // onChange={(e) =>
                              //   setGenralSetting({
                              //     ...genralSetting,
                              //     customer_weekend_days: e.target.checked
                              //       ? genralSetting.customer_weekend_days.replace(
                              //         "sun",
                              //         ""
                              //       )
                              //       : genralSetting.customer_weekend_days +
                              //       "sun",
                              //   })
                              // }
                            />
                          </div>
                        </div>
                      </div>
                      {error && <div className="text-danger">{error}</div>}
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox weekCounter">
                        <div className="weekCounter col-md-12">
                          <label className="dispatchHead form_input_main">
                            {t("Week Start Day")}
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="Monday"
                            checked={
                              genralSetting.settings_week_start_day === "Monday"
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              setWeekenHide("Monday");
                              localStorage.setItem(
                                "settings_week_start_day",
                                "Monday"
                              );
                              setGenralSetting({
                                ...genralSetting,
                                settings_week_start_day: "Monday",
                              });
                            }}
                          />
                        </div>
                      </div>
                     {/*  <div className="form-check form-switch">
                        <div className="d-flex innerFlexTog ">
                          <label
                            className="form-check-label  toggleLabel"
                            for="Sunday"
                          >
                            {t("Sunday")}
                          </label>
                          <input
                            className="form-check-input ms-4"
                            type="checkbox"
                            id="Sunday"
                            checked={
                              genralSetting.settings_week_start_day === "Sunday"
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              setWeekenHide("Sunday");
                              localStorage.setItem(
                                "settings_week_start_day",
                                "Sunday"
                              );

                              setGenralSetting({
                                ...genralSetting,
                                settings_week_start_day: "Sunday",
                              });
                            }}
                          />
                        </div>
                      </div> */}
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Speed Limit")} <span>&#42;</span>
                        </Form.Label>

                        <div className="multi-select-1">
                          <Select
                            // mode="multiple" // Enable multiple selection
                            style={{
                              width: "100%",
                              height: "40px",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            value={genralSetting.customer_speed_limit}
                            onChange={(selectedValues) => {
                              setGenralSetting({
                                ...genralSetting,
                                customer_speed_limit: selectedValues,
                              });
                            }}
                            className="custom-select"
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                            {t("Please Select Speed Limit.")}  
                            </Option>
                            {speedLimit &&
                              speedLimit.map((item) => {
                                return (
                                  <Option
                                    key={item}
                                    value={item}
                                    style={{ color: "rgba(156, 73, 0)" }}
                                  >
                                    {item}
                                  </Option>
                                );
                              })}
                          </Select>
                        </div>
                        {/* <ReactSelect /> */}
                        <Form.Control.Feedback type="invalid">
                          {t("Please Select Speed Limit.")}
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Customer Geofence Radius")} ({t("Meter")}){" "}
                          <span>&#42;</span>{" "}
                        </Form.Label>

                        <div className="multi-select-1">
                          <Select
                            style={{
                              width: "100%",
                              height: "40px",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            value={genralSetting?.customer_customer_geofence}
                            onChange={(value) => {
                              setGenralSetting({
                                ...genralSetting,
                                customer_customer_geofence: value,
                              });
                            }}
                            className="custom-select"
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                            {t("Please Select Geofence Radius.")}  
                            </Option>
                            {customerGeofenceRadius &&
                              customerGeofenceRadius.map((item, i) => {
                                return (
                                  <Option
                                    key={"customerGeofenceRadius" + i}
                                    value={item}
                                    style={{ color: "rgba(156, 73, 0)" }}
                                  >
                                    {/* {`${item} meter`} */}
                                    {`${item} ${t("Meter")}`}
                                  </Option>
                                );
                              })}
                          </Select>
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {t("Please Select Geofence Radius.")}
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Pickup Point Geofence Radius")} ({t("Meter")}){" "}
                          <span>&#42;</span>{" "}
                        </Form.Label>

                        <div className="multi-select-1">
                          <Select
                            style={{
                              width: "100%",
                              height: "40px",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            value={genralSetting.customer_pickup_geofence}
                            onChange={(value) => {
                              setGenralSetting({
                                ...genralSetting,
                                customer_pickup_geofence: value,
                              });
                            }}
                            className="custom-select"
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                          {t("Please Select Geofence Pickup Radius.")}    
                            </Option>
                            {pickupRadius &&
                              pickupRadius.map((item, i) => {
                                return (
                                  <Option
                                    key={"pickupRadius" + i}
                                    value={item}
                                    style={{ color: "rgba(156, 73, 0)" }}
                                  >
                                    {item}
                                  </Option>
                                );
                              })}
                          </Select>
                        </div>

                        <Form.Control.Feedback type="invalid">
                          {t("Please Select Geofence Pickup Radius")}
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Transportation Geofence (Km)")} <span>&#42;</span>{" "}
                        </Form.Label>
                        <div className="multi-select-1">
                          <Select
                            style={{
                              width: "100%",
                              height: "40px",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            value={
                              genralSetting.customer_transportation_geofence
                            }
                            onChange={(value) => {
                              setGenralSetting({
                                ...genralSetting,
                                customer_transportation_geofence: value,
                              });
                            }}
                            className="custom-select"
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                            {t("Please Select Transportation Geofence.")}  
                            </Option>
                            {transportationGeofence &&
                              transportationGeofence.map((item, i) => {
                                return (
                                  <Option
                                    style={{ color: "rgba(156, 73, 0)" }}
                                    key={"transportationGeofence" + i}
                                    value={item}
                                  >{`${item} ${t("km")}`}</Option>
                                );
                              })}
                          </Select>
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {t("Please Select Transportation Geofence.")}
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Records Per Page")} <span>&#42;</span>
                        </Form.Label>
                        <div className="multi-select-1">
                          <Select
                            style={{
                              width: "100%",
                              height: "40px",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            value={genralSetting.customer_page_limit}
                            onChange={(value) => {
                              setGenralSetting({
                                ...genralSetting,
                                customer_page_limit: value,
                              });
                            }}
                            className="custom-select"
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                            {t("Please Select records page.")}  
                            </Option>
                            {recordsPerPage1 &&
                              recordsPerPage1.map((item, i) => {
                                return (
                                  <Option
                                    style={{ color: "rgba(156, 73, 0)" }}
                                    key={"recordsPerPage1" + i}
                                    value={item}
                                  >
                                    {item}
                                  </Option>
                                );
                              })}
                          </Select>
                        </div>

                        <Form.Control.Feedback type="invalid">
                       {t("Please Select records page.")}   
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Date Format")}
                          <span>&#42;</span>{" "}
                        </Form.Label>
                        <div className="multi-select-1">
                          <Select
                            style={{
                              width: "100%",
                              height: "40px",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            value={genralSetting.customer_date_format}
                            onChange={(value) => {
                              setGenralSetting({
                                ...genralSetting,
                                customer_date_format: value,
                              });
                              setDateFormatConfig(value);
                            }}
                            className="custom-select"
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                          {t("Please Select Date Format.")}    
                            </Option>
                            <Option
                              value="dd-mm-yyyy"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              dd-mm-yyyy
                            </Option>
                            <Option
                              value="YYYY-MM-DD"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              YYYY-MM-DD
                            </Option>
                            <Option
                              value="MM-DD-YYYY"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              MM-DD-YYYY
                            </Option>
                            <Option
                              value="dd/mm/yyyy"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              dd/mm/yyyy
                            </Option>
                          </Select>
                        </div>
                        <Form.Control.Feedback type="invalid">
                          Please Select Date Format.
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Duration To Consider Vehicle As Untracked")} (
                          {t("Minute")}){" "}
                        </Form.Label>
                        <div className="multi-select-1">
                          <Select
                            style={{
                              width: "100%",
                              height: "40px",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            value={genralSetting.settings_untrack_duration}
                            onChange={(value) => {
                              setGenralSetting({
                                ...genralSetting,
                                settings_untrack_duration: value,
                              });
                            }}
                            className="custom-select"
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              Please Select Vehicle As Untracked Duration.
                            </Option>
                            {Duration &&
                              Duration.map((item, i) => {
                                return (
                                  <Option
                                    style={{ color: "rgba(156, 73, 0)" }}
                                    key={"Duration" + i}
                                    value={Number(item)}
                                  >
                                    {`${item} Min`}
                                  </Option>
                                );
                              })}
                          </Select>
                        </div>
                        <Form.Control.Feedback type="invalid">
                          Please Select Vehicle As Untracked Duration.
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Duration To Consider Vehicle As Idle/Parked")}(
                          {t("Minutes")}) <span>&#42;</span>{" "}
                        </Form.Label>
                        <div className="multi-select-1">
                          <Select
                            style={{
                              width: "100%",
                              height: "40px",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            value={genralSetting.settings_idle_duration}
                            onChange={(value) => {
                              setGenralSetting({
                                ...genralSetting,
                                settings_idle_duration: value,
                              });
                            }}
                            className="custom-select"
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                          {t("Please Select Duration.")}    
                            </Option>

                            <Option
                              value={1}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              1 Min
                            </Option>
                            <Option
                              value={2}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              2 Min
                            </Option>
                            <Option
                              value={3}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              3 Min
                            </Option>
                            <Option
                              value={4}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              4 Min
                            </Option>
                            <Option
                              value={5}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              5 Min
                            </Option>
                            <Option
                              value={6}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              6 Min
                            </Option>
                            <Option
                              value={7}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              7 Min
                            </Option>
                            <Option
                              value={8}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              8 Min
                            </Option>
                            <Option
                              value={9}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              9 Min
                            </Option>
                            <Option
                              value={10}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              10 Min
                            </Option>
                            <Option
                              value={11}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              11 Min
                            </Option>
                            <Option
                              value={12}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              12 Min
                            </Option>
                            <Option
                              value={13}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              13 Min
                            </Option>
                            <Option
                              value={14}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              14 Min
                            </Option>
                            <Option
                              value={15}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              15 Min
                            </Option>
                            <Option
                              value={16}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              16 Min
                            </Option>
                            <Option
                              value={17}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              17 Min
                            </Option>
                            <Option
                              value={18}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              18 Min
                            </Option>
                            <Option
                              value={19}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              19 Min
                            </Option>
                            <Option
                              value={20}
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              20 Min
                            </Option>
                          </Select>
                        </div>
                        <Form.Control.Feedback type="invalid">
                       {t("Please Select Duration.")}   
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Acceleration Threshold")}
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter Acceleration Threshold"
                          value={genralSetting?.settings_acceleration}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(
                              /[^0-9 A-Za-z ]/gi,
                              ""
                            );
                            setGenralSetting({
                              ...genralSetting,
                              settings_acceleration: valueInput,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter Acceleration Threshold.
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Deacceleration Threshold")}
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter Deacceleration Threshold"
                          value={genralSetting?.settings_deacceleration}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(
                              /[^0-9 A-Za-z ]/gi,
                              ""
                            );
                            setGenralSetting({
                              ...genralSetting,
                              settings_deacceleration: valueInput,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter Deacceleration Threshold.
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    {/* <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Historical Movement Map")}
                        </Form.Label>
                        <Form.Select
                          required
                          as="select"
                          type="select"
                          name="Speed_limit"
                          value={genralSetting?.settings_historical_movement_map}
                          onChange={(e) => {
                            setGenralSetting({
                              ...genralSetting,
                              settings_historical_movement_map: e.target.value,
                            });
                          }}
                        >
                          <option value="leaflet">Leaflet</option>
                          <option value="googleMap">GoogleMap</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          Please Select Historical Movement Map.
                        </Form.Control.Feedback>
                      </div>
                    </div> */}

                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Minutes to Consider Trip Historical Movement")}{" "}
                        </Form.Label>
                        <div className="multi-select-1">
                          <Select
                            style={{
                              width: "100%",
                              height: "40px",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            value={
                              genralSetting.settings_historical_movement_trip_minutes
                            }
                            onChange={(value) => {
                              setGenralSetting({
                                ...genralSetting,
                                settings_historical_movement_trip_minutes:
                                  value,
                              });
                            }}
                            className="custom-select"
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                           {t("Please Select Minutes.")}   
                            </Option>
                            <Option
                              value="30"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              30 sec
                            </Option>
                            <Option
                              value="1"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              1 sec
                            </Option>
                            <Option
                              value="2"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              2 min
                            </Option>
                            <Option
                              value="3"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              3 min
                            </Option>
                            <Option
                              value="4"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              4 min
                            </Option>
                            <Option
                              value="5"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              5 min
                            </Option>
                            <Option
                              value="6"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              6 min
                            </Option>
                            <Option
                              value="7"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              7 min
                            </Option>
                            <Option
                              value="8"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              8 min
                            </Option>
                            <Option
                              value="9"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              9 min
                            </Option>
                            <Option
                              value="10"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              10 min
                            </Option>
                            <Option
                              value="11"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              11 min
                            </Option>
                            <Option
                              value="12"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              12 min
                            </Option>
                            <Option
                              value="13"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              13 min
                            </Option>
                            <Option
                              value="14"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              14 min
                            </Option>
                            <Option
                              value="15"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              15 min
                            </Option>
                          </Select>
                        </div>
                        <Form.Control.Feedback type="invalid">
                          Please Select Minutes.
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    <div className="col-lg-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Time Format")}
                      </Form.Label>
                      <div className="multi-select-1">
                        <Select
                          style={{
                            width: "100%",
                            height: "40px",
                            color: "rgba(156, 73, 0, 0.5)",
                          }}
                          value={genralSetting?.settings_time_format}
                          onChange={(value) => {
                            setGenralSetting({
                              ...genralSetting,
                              settings_time_format: value,
                            });
                            setTimeFormat(value);
                          }}
                          className="custom-select"
                        >
                          <Option
                            value=""
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                         {t("Select Time Format")}   
                          </Option>
                          <Option
                            value="24"
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            24
                          </Option>
                          <Option
                            value="12"
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            12
                          </Option>
                        </Select>
                      </div>

                      <Form.Control.Feedback type="invalid">
                     {t("Please Select Time Format.")}   
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 form_input_main">
                      {genralSetting?.settings_historical_movement_map ===
                        "googleMap" && (
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {t("Google Map Key")}
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Enter google  key "
                            value={genralSetting?.customer_browser_google_key}
                            onChange={(e) => {
                              setGenralSetting({
                                ...genralSetting,
                                customer_browser_google_key: e.target.value,
                              });
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                          {t("Please Enter GoogleMap Key")}  
                          </Form.Control.Feedback>
                        </div>
                      )}
                    </div>

                    {/* <div className="col-md-12 form_input_main weekCounter">
                      <div className="form-check form-switch">
                        <div className="d-flex">
                          <label
                            className="form-check-label  switchLabel"
                            for="googleMap"
                          >
                            {t("Show Vehicle Label in Google Map")}
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="googleMap"
                            checked={genralSetting?.settings_bus_label}
                            onChange={(e) => {
                              setGenralSetting({
                                ...genralSetting,
                                settings_bus_label: e.target.checked,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Automation Setting */}
              <div className="main-master-wrapper form_input_main">
                <div className="Heading">
                  <p>{t("Automation Settings")}</p>
                </div>
                <div className="innerInputsGen" id="dispatch-setting">
                  <div className="row ">
                    <div className="col-md-6 weekCounter">
                      <div className="form-check form-switch align">
                        <div className="d-flex justify-content-between">
                          <label
                            className="form-check-label  switchLabel "
                            for="dataCollection"
                          >
                            {t("Automation Data Collection")}
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="dataCollection"
                            checked={genralSetting?.settings_data_collection}
                            onChange={(e) => {
                              setGenralSetting({
                                ...genralSetting,
                                settings_data_collection: e.target.checked
                                  ? 1
                                  : 0,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-check form-switch align ">
                        <div className="d-flex justify-content-between">
                          <label
                            className="form-check-label  switchLabel"
                            for="dataOptimise"
                          >
                            {t("Automation Data Optimise")}
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="dataOptimise"
                            checked={genralSetting?.settings_data_optimise}
                            onChange={(e) => {
                              setGenralSetting({
                                ...genralSetting,
                                settings_data_optimise: e.target.checked
                                  ? 1
                                  : 0,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-check form-switch align">
                        <div className="d-flex justify-content-between">
                          <label
                            className="form-check-label  switchLabel"
                            for="dataUpdate"
                          >
                            {t("Automation Data Update")}
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="dataUpdate"
                            checked={genralSetting?.settings_data_update}
                            onChange={(e) => {
                              setGenralSetting({
                                ...genralSetting,
                                settings_data_update: e.target.checked ? 1 : 0,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form_input_main weekCounter">
                        <Form.Label className="common-labels">
                          {t(
                            "No. of suggestions Or Anomali count for automatic slot creation"
                          )}
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={
                            genralSetting.settings_parkingslot_anomalycount
                          }
                          max={32767}
                          maxLength={3}
                          onChange={(e) => {
                            if (!isNaN(e.target.value))
                              setGenralSetting({
                                ...genralSetting,
                                settings_parkingslot_anomalycount:
                                  e.target.value,
                              });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter Anomali count.
                        </Form.Control.Feedback>
                      </div>
                      <div className="form_input_main weekCounter">
                        <Form.Label className="common-labels">
                          {t(
                            "Minimum number of vehicles in an area to consider it as parking slot"
                          )}
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={
                            genralSetting.settings_parkingslot_minimum_vehiclecount
                          }
                          maxLength={4}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(
                              /[^0-9 A-Za-z ]/gi,
                              ""
                            );
                            setGenralSetting({
                              ...genralSetting,
                              settings_parkingslot_minimum_vehiclecount:
                                valueInput,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter Minimum number vehicles.
                        </Form.Control.Feedback>
                      </div>
                      <div className="form_input_main weekCounter">
                        <Form.Label className="common-labels">
                          {t("Maximum Radius texts for parking slot creation")}{" "}
                          ({t("Meters")})
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={
                            genralSetting?.settings_parkingslot_maximum_radius
                          }
                          maxLength={4}
                          onChange={(e) => {
                            setGenralSetting({
                              ...genralSetting,
                              settings_parkingslot_maximum_radius:
                                e.target.value,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter Maximum Radiustexts.
                        </Form.Control.Feedback>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Two Bottom Buttons */}

              {/* ---------- NEW UI ---------- */}

              <div>
                <div className="main-master-wrapper form_input_main">
                  <div className="Heading" id="help-setting-card">
                    <p> {t("Help Setting")}</p>

                    <div
                      className="form-check form-switch"
                      id="help-switch-main"
                    >
                      <div className="d-flex innerFlexTog">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="Wednesday"
                          // checked={help_setting_disable}
                          // onChange={handleHelpSettingChange}
                          checked={genralSetting?.settings_help}
                          onChange={(e) => {
                            setGenralSetting({
                              ...genralSetting,
                              settings_help: e.target.checked ? 1 : 0,
                            });
                            // handleHelpSettingChange(e);
                          }}

                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ----------END NEW UI ------------ */}
              {/* Two Bottom Buttons */}
              <div className="d-flex justify-content-end align-items-center btn-wrapper">
                {/* <button type="button" className="cx-btn-1">
                  {t("Cancel")}
                </button> */}
                <button className="cx-btn-2">{t("Submit")}</button>
              </div>
            </Form>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default GeneralSetting;

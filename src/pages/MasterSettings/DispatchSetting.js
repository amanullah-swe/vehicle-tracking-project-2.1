import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import DDlogo from "../../assets/images/DDlogo.png";
import DatePicker from "react-datepicker";
import DatePlus from "../../assets/images/Group 33597.svg";
import redCross from "../../assets/images/redCross.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Select, Space, TimePicker } from "antd";
import ApiConfig from "../../api/ApiConfig";
import Form from "react-bootstrap/Form";

import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import {
  postMultipartWithAuthCallWithErrorResponse,
  postMultipartWithAuthCallWithErrorResponseNodeCreate,
  postWithAuthCall,
  simpleGetCall,
  simplePostCall,
} from "../../api/ApiServices";
import moment from "moment";
import dayjs from "dayjs";
import Loader from "../../sharedComponent/Loader";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const DispatchSetting = () => {
  const { sidebar, setSidebar, Dark, setWeekenHide } = useContext(AppContext);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [timeInput, setTimeInput] = useState("");
  const [dispatchSettings, setDispatchSettings] = useState({
    dispatch_periodical_trip_settings_time: [],
  });

  const [value, onChange] = useState("12:00");
  const { t, i18n } = useTranslation();

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  useEffect(() => {
    getDispatchSettings();
  }, []);

  const getDispatchSettings = () => {
    setLoading(true);
    simpleGetCall(ApiConfig.GET_DISPACH_SETTINGS)
      .then((res) => {
        let data = { ...res.data };
        data.dispatch_periodical_trip_settings_time =
          data.dispatch_periodical_trip_settings_time.map((item) => {
            let splitTime =
              item.dispatch_periodical_trip_settings_time.split(":");
            let hours = splitTime && splitTime[0];
            let minutes = splitTime && splitTime[1];
            let periodicTime = `${hours}:${minutes}`;
            return periodicTime;
          });
        if (res.result) setDispatchSettings(data);
      })
      .catch((err) => {
        notifyError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const submitData = () => {
    let body = JSON.stringify(dispatchSettings);
    simplePostCall(ApiConfig.UPDATE_DISPATCH_SETTING, body)
      .then((res) => {
        if (
          dispatchSettings.dispatch_settings_auto_routing === "periodically" &&
          dispatchSettings?.dispatch_periodical_trip_settings_time.length === 0
        ) {
          notifyError("Please Add Periodic Trip Times");
        } else if (res.result) {
          notifySuccess(res.message);
          getDispatchSettings();
        }
      })
      .catch((err) => console.log(err));
  };

  const [errorMsg, setErrorMsg] = useState("");
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
        <div id="cx-wrapper" className="Dispatch_Setting">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="main-master-wrapper form_input_main">
                <div className="innerInputsGen" id="dispatch-setting">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="innerSelectBox dispatchHead">
                        <label>{t("Dispatch Auto-routing Type")}</label>
                        <div className="multi-select-1">
                          <Select
                            style={{ width: "100%", height: "40px" }}
                            required
                            value={
                              dispatchSettings.dispatch_settings_auto_routing
                            }
                            onChange={(value) =>
                              setDispatchSettings({
                                ...dispatchSettings,
                                dispatch_settings_auto_routing: value,
                              })
                            }
                          >
                            <Option
                              value="instant"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              Instant
                            </Option>
                            <Option
                              value="periodically"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              Periodically
                            </Option>

                            <Option
                              value="manual"
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              Manual
                            </Option>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="weekCounter col-md-12  ">
                      <label className="dispatchHead form_input_main">
                        {t("Select Dispatch Trip days")}
                      </label>
                      <div className="d-flex align-items-center flex-wrap innerToggle">
                        <div className="form-check form-switch">
                          <div className="d-flex innerFlexTog">
                            <label
                              className="form-check-label  toggleLabel"
                              for="Monday"
                            >
                              {t("Monday")}
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="Monday"
                              checked={
                                dispatchSettings.dispatch_settings_monday
                              }
                              onChange={(e) =>
                                setDispatchSettings({
                                  ...dispatchSettings,
                                  dispatch_settings_monday: e.target.checked,
                                })
                              }
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
                                dispatchSettings.dispatch_settings_tuesday
                              }
                              onChange={(e) =>
                                setDispatchSettings({
                                  ...dispatchSettings,
                                  dispatch_settings_tuesday: e.target.checked,
                                })
                              }
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
                                dispatchSettings.dispatch_settings_wednesday
                              }
                              onChange={(e) =>
                                setDispatchSettings({
                                  ...dispatchSettings,
                                  dispatch_settings_wednesday: e.target.checked,
                                })
                              }
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
                              checked={
                                dispatchSettings.dispatch_settings_thursday
                              }
                              onChange={(e) =>
                                setDispatchSettings({
                                  ...dispatchSettings,
                                  dispatch_settings_thursday: e.target.checked,
                                })
                              }
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
                              checked={
                                dispatchSettings.dispatch_settings_friday
                              }
                              onChange={(e) =>
                                setDispatchSettings({
                                  ...dispatchSettings,
                                  dispatch_settings_friday: e.target.checked,
                                })
                              }
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
                              checked={
                                dispatchSettings.dispatch_settings_saturday
                              }
                              onChange={(e) =>
                                setDispatchSettings({
                                  ...dispatchSettings,
                                  dispatch_settings_saturday: e.target.checked,
                                })
                              }
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
                              checked={
                                dispatchSettings.dispatch_settings_sunday
                              }
                              onChange={(e) =>
                                setDispatchSettings({
                                  ...dispatchSettings,
                                  dispatch_settings_sunday: e.target.checked,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="weekCounter col-md-12 "
                      style={{
                        marginTop: "15px",
                      }}
                    >
                      <div className="col-md-7">
                        <div className="innerSelectBox weekCounter">
                          <label
                            className="dispatchHead"
                            style={{ marginTop: "20px", fontSize: "17px" }}
                          ></label>
                          {errorMsg && (
                            <div style={{ color: "red" }}>{errorMsg}</div>
                          )}
                          <div className="row">
                            {/* Load ETA Input */}
                            <div className="col-md-6">
                              <Form.Label className="common-labels">
                                {t("Default Load Duration")}
                              </Form.Label>

                              <Space>
                                <TimePicker
                                  className="form-control carretClass"
                                  size="large"
                                  value={
                                    dispatchSettings.dispatch_settings_default_loading_time_duration
                                      ? dayjs(
                                        dispatchSettings.dispatch_settings_default_loading_time_duration,
                                        "HH:mm:ss"
                                      )
                                      : dayjs("00:00:00", "HH:mm:ss")
                                  }
                                  onChange={(e) => {
                                    let time = e
                                      ? e?.format("HH:mm:ss")
                                      : "00:00:00";

                                    // setDispatchloadtime(time)

                                    setDispatchSettings({
                                      ...dispatchSettings,
                                      dispatch_settings_default_loading_time_duration:
                                        time,
                                    });
                                    setErrorMsg("");
                                  }}
                                  format={"HH:mm:ss"}
                                />
                              </Space>
                            </div>

                            {/* Unload ETA Input */}
                            <div className="col-md-6">
                              <Form.Label className="common-labels">
                                {t("Default Unload Duration")}
                              </Form.Label>
                              <Space>
                                <TimePicker
                                  className="form-control carretClass"
                                  size="large"
                                  value={
                                    dispatchSettings.dispatch_settings_default_unloading_time_duration
                                      ? dayjs(
                                        dispatchSettings.dispatch_settings_default_unloading_time_duration,
                                        "HH:mm:ss"
                                      )
                                      : dayjs("00:00:00", "HH:mm:ss")
                                  }
                                  onChange={(e) => {
                                    let time = e
                                      ? e?.format("HH:mm:ss")
                                      : "00:00:00";
                                    // setDispatchUnloadtime(time);
                                    setDispatchSettings({
                                      ...dispatchSettings,
                                      dispatch_settings_default_unloading_time_duration:
                                        time,
                                    });
                                    setErrorMsg("");
                                  }}
                                  format={"HH:mm:ss"}
                                />
                              </Space>
                            </div>
                            <div className="col-md-12 mt-4">
                              <div className="form-check form-switch">
                                <div className="d-flex innerFlexTog">
                                  <label
                                    className="form-check-label  toggleLabel"
                                    for="Sunday"
                                    style={{ fontSize: "16px" }}
                                  >
                                    {t(
                                      "Dispatch Auto update Based On Geofence Location"
                                    )}
                                  </label>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="Sunday"
                                    checked={
                                      dispatchSettings.dispatch_settings_status_auto_update
                                    }
                                    onChange={(e) =>
                                      setDispatchSettings({
                                        ...dispatchSettings,
                                        dispatch_settings_status_auto_update:
                                          e.target.checked,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {dispatchSettings.dispatch_settings_auto_routing ===
                      "periodically" && (
                        <>
                          <div className="col-md-7">
                            <div className="innerSelectBox weekCounter">
                              <label className="dispatchHead">
                                {t("Periodic Trip Times")} <span>&#42;</span>
                              </label>
                              <Space>
                                <TimePicker
                                  className="form-control carretClass"
                                  size="large"
                                  value={
                                    timeInput
                                      ? dayjs(timeInput, "HH:mm")
                                      : dayjs("00:00", "HH:mm")
                                  }
                                  onChange={(e) => {
                                    let time = e
                                      ? e?.hour() + ":" + e?.minute()
                                      : "00:00";
                                    setTimeInput(time);

                                    setErrorMsg("");
                                  }}
                                  format={"HH:mm"}
                                />
                              </Space>
                              {errorMsg && (
                                <div style={{ color: "red" }}>{errorMsg}</div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-2 weekCounter">
                            <button
                              className="AddOnBtn"
                              onClick={() => {
                                if (timeInput === "") {
                                  setErrorMsg(
                                    "Please enter a periodic trip time"
                                  );
                                } else {
                                  let timeArray = [
                                    ...dispatchSettings.dispatch_periodical_trip_settings_time,
                                  ];
                                  if (timeInput)
                                    setDispatchSettings({
                                      ...dispatchSettings,
                                      dispatch_periodical_trip_settings_time: [
                                        ...timeArray,
                                        timeInput,
                                      ],
                                    });
                                  setTimeInput("");
                                }
                              }}
                            >
                              {t("Add")}
                            </button>
                          </div>
                        </>
                      )}
                  </div>
                  {dispatchSettings.dispatch_settings_auto_routing ===
                    "periodically" &&
                    Array.isArray(
                      dispatchSettings.dispatch_periodical_trip_settings_time
                    ) &&
                    dispatchSettings.dispatch_periodical_trip_settings_time.map(
                      (time, index) => {
                        let splittedTimeArr = time && time.split(":");
                        let hours =
                          Number(splittedTimeArr[0]) < 10
                            ? "0" + Number(splittedTimeArr[0])
                            : splittedTimeArr[0];
                        let minutes =
                          Number(splittedTimeArr[1]) < 10
                            ? "0" + Number(splittedTimeArr[1])
                            : splittedTimeArr[1];
                        return (
                          <div style={{ display: "flex" }}>
                            <div
                              className="selectedDate"
                              key={"selectedDate" + index}
                            >
                              <p className="innerDate">{`${hours}:${minutes}`}</p>
                            </div>
                            <Link to="#">
                              <img
                                src={redCross}
                                alt=""
                                onClick={() =>
                                  setDispatchSettings({
                                    ...dispatchSettings,
                                    dispatch_periodical_trip_settings_time:
                                      dispatchSettings.dispatch_periodical_trip_settings_time.filter(
                                        (item) => item != time
                                      ),
                                  })
                                }
                              />
                            </Link>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
              {/* Two Bottom Buttons */}
              <div className="d-flex justify-content-end align-items-center btn-wrapper">
                {/* <button type="button" className="cx-btn-1">{t("Cancel")}</button> */}
                <button className="cx-btn-2" onClick={submitData}>
                  {t("Submit")}
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default DispatchSetting;

import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import DDlogo from "../../assets/images/DDlogo.png";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
import {
  simpleGetCall,
  simplePostCall,
  simpleGetCallWithErrorResponseNodeCreate,
} from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import Loader from "../../sharedComponent/Loader";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const IntegrationSetting = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [integationSettings, setIntegationSettings] = useState({});
  const [gatewayList, setGatewayList] = useState([]);
  const [seleGateway, setSeleGateway] = useState({});
  const [availableSMGBalanve, setAvailableSMGBalanve] = useState(0);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setLoading(true);
      let body = JSON.stringify(integationSettings);
      simplePostCall(ApiConfig.UPDATE_INTEGRATION_SETTINGS, body)
        .then((res) => {
          if (res.result) {
            notifySuccess(res.message);
            getInteGrationSetting();
          }
        })
        .catch((err) => {
          console.log("errr", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setValidated(true);
  };
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  useEffect(() => {
    getInteGrationSetting();
    // getavailabeleSmsGetWay();
  }, []);

  useEffect(() => {
    if (integationSettings.settings_sms_gateway_status) {
      if (integationSettings.sms) {
        let data = integationSettings.sms.filter(
          (gateway) =>
            gateway.sms_gateway_id == integationSettings.settings_sms_gateway_id
        )[0];

        setSeleGateway(data);
        let queryStr = data?.sms_gateway_request_format
          ?.replace(
            "{username}",
            integationSettings.settings_sms_gateway_username
          )
          ?.replace(
            "{password}",
            integationSettings.settings_sms_gateway_password
          )
          ?.replace(
            "{sendername}",
            integationSettings.settings_sms_gateway_username
          )
          ?.replace("{mobileno}", "7854125412")
          ?.replace("{message}", "testmessage");
        if (
          data?.sms_gateway_url != null &&
          data?.sms_gateway_url != undefined
        ) {
          simpleGetCallWithErrorResponseNodeCreate(
            data?.sms_gateway_url + "?" + queryStr
          )
            .then((res) => {})
            .catch((err) => {
              console.log("error,", err);
            });
        }
      }
    }
  }, [integationSettings, gatewayList]);

  // const getSMSData = async () => {
  //   if (integationSettings.settings_sms_gateway_status) {
  //     if (integationSettings.sms) {
  //       let data = integationSettings.sms.filter(
  //         (gateway) =>
  //           gateway.sms_gateway_id ==
  //           integationSettings.settings_sms_gateway_id
  //       )[0]
  //       setSeleGateway(data);
  //       let queryStr = await integationSettings.sms_gateway_request_format
  //       ?.replace("{username}", integationSettings.settings_sms_gateway_username)
  //       ?.replace("{password}", integationSettings.settings_sms_gateway_password)
  //       ?.replace("{sendername}", integationSettings.settings_sms_gateway_username)
  //       ?.replace("{mobileno}", "7854125412")
  //       ?.replace("{message}", "test message")
  //       clg
  //       simpleGetCallWithErrorResponseNodeCreate(
  //         data.sms_gateway_url + "?"
  //         + queryStr)
  //       .then(res => {
  //         console.log('message resonse,', res);
  //       })
  //     }
  //   }
  // }

  const getInteGrationSetting = () => {
    setLoading(true);
    simpleGetCall(ApiConfig.GET_INTEGRATION_SETTINGS)
      .then((res) => {
        if (res.result) {
          res.data &&
            setIntegationSettings({
              ...res.data.settingsSms,
              sms: res.data.sms,
            });
          setGatewayList(res.data?.masterSmsList);
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getavailabeleSmsGetWay = () => {
    simpleGetCall(ApiConfig.GET_ALL_SMS_GETWAT)
      .then((res) => {
        if (res.result) {
          // setGatewayList(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
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
        <div id="cx-wrapper" className="Integration_Setting">
          {loading ? (
            <Loader />
          ) : (
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="main-master-wrapper form_input_main ">
                <div className="innerInputsGen">
                  <div className="switchMain">
                    <div className="form-check form-switch">
                      <div className="d-flex toggleBetween">
                        <label className="form-check-label" for="smsGateway">
                          {t("SMS Gateway")}
                        </label>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="smsGateway"
                          checked={
                            integationSettings.settings_sms_gateway_status
                          }
                          onChange={(e) => {
                            setIntegationSettings({
                              ...integationSettings,
                              settings_sms_gateway_status: e.target.checked
                                ? 1
                                : 0,
                            });
                          }}
                        />
                      </div>
                    </div>
                    {integationSettings.settings_sms_gateway_status ? (
                      <>
                        {/* Reacharge Button */}
                        <div className="RechargeButtonMain">
                          <a
                            href={seleGateway?.sms_gateway_recharge_url}
                            target="_blank"
                          >
                            <button type="button" className="recharegBtn">
                              {t("Recharge")}
                            </button>
                          </a>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  {integationSettings.settings_sms_gateway_status ? (
                    <>
                      <div className="d-flex justify-content-end paraColor">
                        <p className="rechargelabel">
                          {t("Available Msg")} : {availableSMGBalanve}
                        </p>
                      </div>
                      <div className="integrationGrid">
                        <div className="row integrationRow">
                          {availableSMGBalanve === 0 && (
                            <div className="col-md-12 col12 form_input_main">
                              <div className="mainBorder">
                                <label className="NotiLabel">
                                  {t("You Don't Have Sufficient Balance")}
                                </label>
                              </div>
                            </div>
                          )}
                          {/* Enable Form Input */}
                          <div className="col-md-6 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("SMS Gateway ID")}
                              </Form.Label>
                              <div className="multi-select-1">
                                <Select
                                  style={{
                                    width: "100%",
                                    height: "40px",
                                    color: "rgba(156, 73, 0, 0.5)",
                                  }}
                                  value={
                                    integationSettings?.settings_sms_gateway_id
                                  }
                                  onChange={(value) => {
                                    let smaDetailsData =
                                      gatewayList &&
                                      gatewayList.filter(
                                        (item) => item.sms_gateway_id === value
                                      );
                                    setIntegationSettings({
                                      ...integationSettings,
                                      settings_sms_gateway_id: value,
                                      sms: smaDetailsData,
                                    });
                                  }}
                                  className="custom-select"
                                >
                                  <Option
                                    value=""
                                    style={{ color: "rgba(156, 73, 0)" }}
                                  >
                                    Select sms Gateway
                                  </Option>
                                  {gatewayList &&
                                    gatewayList.map((gateway) => {
                                      return (
                                        <Option
                                          value={gateway.sms_gateway_id}
                                          key={
                                            "gateway" + gateway.sms_gateway_id
                                          }
                                          style={{ color: "rgba(156, 73, 0)" }}
                                        >
                                          {gateway?.sms_gateway_name}
                                        </Option>
                                      );
                                    })}
                                </Select>
                              </div>

                              <Form.Control.Feedback type="invalid">
                                Please sms gateway Id
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="col-md-6 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("SMS Gateway Username")}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder=" SMS Gateway Username"
                                value={
                                  integationSettings.settings_sms_gateway_username
                                }
                                onChange={(e) => {
                                  setIntegationSettings({
                                    ...integationSettings,
                                    settings_sms_gateway_username:
                                      e.target.value,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please Enter SMS Gateway Username.
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="col-md-6 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("SMS Gateways Password")}
                              </Form.Label>
                              <Form.Control
                                required
                                type="password"
                                placeholder="SMS Gateways Password"
                                value={
                                  integationSettings.settings_sms_gateway_password
                                }
                                onChange={(e) => {
                                  setIntegationSettings({
                                    ...integationSettings,
                                    settings_sms_gateway_password:
                                      e.target.value,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please Enter SMS Gateway Password.
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="col-md-6 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("SMS Gateway Sender ID")}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="SMS Gateways Sender Id"
                                value={
                                  integationSettings.settings_sms_gateway_sender_id
                                }
                                onChange={(e) => {
                                  setIntegationSettings({
                                    ...integationSettings,
                                    settings_sms_gateway_sender_id:
                                      e.target.value,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please Enter SMS Gateway ID.
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          {/* Signup Button */}
                          <div className="col-md-12 text-end"></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* End Two buttons */}
              <div className="d-flex justify-content-end align-items-center btn-wrapper">
                <button className="cx-btn-2">{t("Submit")}</button>
              </div>
            </Form>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default IntegrationSetting;

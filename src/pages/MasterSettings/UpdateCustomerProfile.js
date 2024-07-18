import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import profile from "../../assets/images/Update-profile.svg";
import camera from "../../assets/images/circleCamers.svg";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import whiteTrash from "../../assets/images/whiteTrash.svg";
import whiteHand from "../../assets/images/whiteHand.svg";
import whiteBox from "../../assets/images/whiteBox.svg";
import whiteBin from "../../assets/images/whiteBin.svg";
import { motion } from "framer-motion";
import MapComponent from "../../sharedComponent/MapComponent";
import {
  postMultipartWithAuthCallWithErrorResponse,
  simpleGetCall,
} from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import Loader from "../../sharedComponent/Loader";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import { SearchFunction } from "../../sharedComponent/LeafletMap/SearchFunction";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import ReactFlagsSelect from "react-flags-select";
import { countriesWithShortCode } from "../../sharedComponent/common";
import MobilePhoneInput from "../../sharedComponent/MobilePhoneInput";
import CountrySelect from "../../sharedComponent/CountrySelect";
import { Select } from "antd";

const { Option } = Select;

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const UpdateCustomerProfile = () => {
  const navigate = useNavigate();
  const {
    sidebar,
    draggedName,
    setRegionCord,
    setPlace,
    setConvertKilometersMiles,
    setConvertTemperatureUnit,
    setTimeFormat,
    getAlllogos,
    customerLogo,
    setCustomerLogo,
  } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const [timezoneData, setTimezoneData] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [addressDetails, setAddressDetails] = useState({
    customer_city: "",
    customer_address: "",
    customer_latitude: "",
    customer_longitude: "",
  });
  const [customerSetting, setCustomerSetting] = useState({
    customer_name: "",
    customer_city: "",
    customer_country: "",
    customer_country_code: "",
    customer_mobile: "",
    customer_email: "",
    customer_port: "",
    customer_address: "",
    customer_latitude: "",
    customer_longitude: "",
    customer_time_zone: "",
    customer_api_key: "",
    customer_status: "",
    customer_plan: "",
    customer_account_type: "",
    customer_expiry_date: "",
    customer_customer_geofence: "",
    customer_pickup_geofence: "",
    customer_website: "",
    customer_distance_unit: "",
    customer_fuel_unit: "",
    customer_temperature_unit: "",
    customer_currency: "",
    user_profile_pic: "",
    currency_id: "",
    currency_code: "",
    currency_name: "",
    currency_symbol: "",
  });
  useEffect(() => {
    setCustomerSetting({ ...customerSetting, ...addressDetails });
  }, [addressDetails]);

  //   useEffect(() => {
  //     if(draggedName){
  //       setCustomerSetting({...customerSetting,
  //         customer_address:draggedName?.display_name?draggedName?.display_name:"",
  //         customer_city:draggedName?.address?.state_district?draggedName?.address?.state_district:"",
  //       })
  //     }
  //  }, [draggedName])

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  useEffect(() => {
    getProfileDetails();
    gettimeZoneDate();
    getCurrencyList();
  }, []);

  const getProfileDetails = () => {
    setLoading(true);
    postMultipartWithAuthCallWithErrorResponse(ApiConfig.GET_CUSTOMER_PROFILE)
      .then((res) => {
        // setLoading(false)
        if (res.json.result) {
          let customerData = res.json?.data;

          setAddressDetails({
            customer_city: customerData?.customer_city,
            customer_address: customerData?.customer_address,
            customer_latitude: customerData?.customer_latitude,
            customer_longitude: customerData?.customer_longitude,
          });
          setCustomerSetting(res.json?.data);
          if (
            res.json.data.customer_longitude &&
            res.json.data.customer_latitude
          ) {
            setPlace(res.json.data.customer_address);
            setRegionCord([
              Number(res.json.data.customer_latitude),
              Number(res.json.data.customer_longitude),
            ]);
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const gettimeZoneDate = () => {
    simpleGetCall(ApiConfig.GET_TIMEZONE_LIST)
      .then((res) => {
        if (res.result) {
          setTimezoneData(res.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {});
  };
  const getCurrencyList = () => {
    simpleGetCall(ApiConfig.CURRNCY_LIST)
      .then((res) => {
        if (res.result) {
          setCurrencyList(res.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {});
  };

  const updateProfile = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const formData = new FormData();
      setLoading(true);
      formData.append(
        "customer_mobile",
        customerSetting.customer_mobile.replace(
          customerSetting.customer_country_code,
          ""
        )
      );
      formData.append("customer_name", customerSetting.customer_name);
      formData.append("customer_address", customerSetting.customer_address);
      formData.append("customer_city", customerSetting.customer_city);
      formData.append("customer_country", customerSetting.customer_country);
      formData.append("customer_website", customerSetting.customer_website);
      formData.append("user_profilePic", customerSetting.user_profile_pic);
      formData.append("customer_latitude", customerSetting.customer_latitude);
      formData.append("customer_longitude", customerSetting.customer_longitude);
      formData.append("customer_currency", customerSetting.customer_currency);
      formData.append("customer_time_zone", customerSetting.customer_time_zone);
      formData.append(
        "customer_country_code",
        customerSetting.customer_country_code
      );
      formData.append(
        "customer_distance_unit",
        customerSetting.customer_distance_unit
      );
      formData.append("customer_fuel_unit", customerSetting.customer_fuel_unit);
      formData.append(
        "customer_temperature_unit",
        customerSetting.customer_temperature_unit
      );

      postMultipartWithAuthCallWithErrorResponse(
        ApiConfig.UPDATE_CUSTOMER_PROFILE,
        formData
      )
        .then((res) => {
          // getProfileDetails();

          // setLoading(false)
          if (res.json.result) {
            notifySuccess(res.json.message);
            navigate("/CustomerProfile");
            localStorage.setItem(
              "customer_distance_unit",
              customerSetting.customer_distance_unit
            );
            localStorage.setItem(
              "customer_temperature_unit",
              customerSetting.customer_temperature_unit
            );
          } else notifyError(res.json.message);
        })
        .catch((err) => {
          console.log("err", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    setValidated(true);
  };

  const mobileOnChangeHandler = (phone, country) => {
    setCustomerSetting({
      ...customerSetting,
      customer_mobile: phone.replace(country.dialCode, ""),
      customer_country_code: country.dialCode,
      customer_country:
        countriesWithShortCode[country.countryCode.toUpperCase()],
    });
  };

  const countrySelectOnSelect = (code) => {
    setCustomerSetting({
      ...customerSetting,
      customer_country: countriesWithShortCode[code],
    });
  };
  console.log(
    "customerSetting======================================",
    customerSetting
  );
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
      <div id="cx-wrapper" className="Update_Customer_Profile">
        {loading ? (
          <Loader />
        ) : (
          <div className="main-dashboard-wrapper CustomerProfile ">
            <p className="main-page-heading customerHeading">
              {t("Update Customer Profile")}
            </p>
            <Form noValidate validated={validated} onSubmit={updateProfile}>
              <div
                className="CustomerProfile-head"
                onClick={() => {
                  navigate("/UpdateCustomerLogo/logo_logo");
                }}
              >
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
                    alt="Logo"
                  />
                )}
              </div>
              <div className="information-card row mb-0">
                <div className="col-md-6 form_input_main ">
                  <Form.Label className="common-labels">
                    {t("Customer Name")}
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Customer Name"
                    value={customerSetting?.customer_name}
                    onChange={(e) => {
                      setCustomerSetting({
                        ...customerSetting,
                        customer_name: e.target.value,
                      });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Customer Name.
                  </Form.Control.Feedback>
                </div>

                <div className="col-md-6 form_input_main">
                  <Form.Label className="common-labels">
                    {t("Contact Number")}
                  </Form.Label>
                  <MobilePhoneInput
                    CommanCountry={customerSetting?.customer_country}
                    commanNumber={customerSetting?.customer_mobile}
                    commanContryCode={customerSetting?.customer_country_code}
                    state={customerSetting}
                    onChangeHandler={mobileOnChangeHandler}
                  />

                  <Form.Control.Feedback type="invalid">
                    Please Enter Contact No.
                  </Form.Control.Feedback>
                </div>

                <div className=" col-lg-6 form_input_main CountyListNPM">
                  <Form.Label className="common-labels">
                    {t("Country")}
                  </Form.Label>
                  <CountrySelect
                    countryName={customerSetting?.customer_country}
                    state={customerSetting}
                    onChangeHandler={countrySelectOnSelect}
                  />

                  <Form.Control.Feedback type="invalid">
                    Please Enter Country.
                  </Form.Control.Feedback>
                </div>

                <div className="col-lg-6 form_input_main">
                  <Form.Label className="common-labels">
                    {t("Address")}
                  </Form.Label>
                  <SearchFunction
                    customerSetting={addressDetails}
                    setCustomerSetting={setAddressDetails}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Address.
                  </Form.Control.Feedback>
                </div>

                <div className="col-md-6 form_input_main">
                  <Form.Label className="common-labels">{t("City")}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="City"
                    value={customerSetting?.customer_city}
                    onChange={(e) => {
                      setCustomerSetting({
                        ...customerSetting,
                        customer_city: e.target.value,
                      });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter City.
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-6 form_input_main">
                  <Form.Label className="common-labels">
                    {t("Timezone")}
                  </Form.Label>
                  <div className="multi-select-1">
                    <Select
                      style={{ width: "100%", height: "40px" }}
                      required
                      placeholder="Please select Timezone."
                      value={customerSetting?.customer_time_zone}
                      onChange={(value) => {
                        setCustomerSetting({
                          ...customerSetting,
                          customer_time_zone: value,
                        });
                      }}
                      showSearch // Enable search functionality
                      className="custom-select"
                    >
                      <Option value="" style={{ color: "rgb(143, 67, 0)" }}>
                        Select time zone
                      </Option>
                      {timezoneData?.map((zone, index) => (
                        <Option
                          style={{ color: "rgb(143, 67, 0)" }}
                          key={"zone" + index}
                          value={zone.customer_time_zone}
                        >
                          {zone.timezone_name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <Form.Control.Feedback type="invalid">
                    Please select Timezone.
                  </Form.Control.Feedback>
                </div>
                <div className="col-lg-6 form_input_main">
                  <Form.Label className="common-labels">
                    {t("Distance Unit")}
                  </Form.Label>
                  <div className="multi-select-1">
                    <Select
                      style={{ width: "100%", height: "40px" }}
                      required
                      placeholder="Please select Distance unit."
                      value={customerSetting.customer_distance_unit}
                      onChange={(value) => {
                        setCustomerSetting({
                          ...customerSetting,
                          customer_distance_unit: value,
                        });
                        setConvertKilometersMiles(value);
                      }}
                      className="custom-select"
                    >
                      <Option value="" style={{ color: "rgb(143, 67, 0)" }}>
                        Select Distance unit
                      </Option>
                      <Option value={"km"} style={{ color: "rgb(143, 67, 0)" }}>
                        Km
                      </Option>
                      <Option
                        value={"miles"}
                        style={{ color: "rgb(143, 67, 0)" }}
                      >
                        Miles
                      </Option>
                    </Select>
                  </div>
                  <Form.Control.Feedback type="invalid">
                    Please Select Distance Unit.
                  </Form.Control.Feedback>
                </div>
                <div className="col-lg-6 form_input_main">
                  <Form.Label className="common-labels">
                    {t("Currency")}
                  </Form.Label>
                  <div className="multi-select-1">
                    <Select
                      style={{ width: "100%", height: "40px" }}
                      required
                      placeholder="Please select Currency."
                      value={customerSetting.customer_currency}
                      onChange={(value) => {
                        setCustomerSetting({
                          ...customerSetting,
                          customer_currency: value,
                        });
                      }}
                      showSearch // Enable search functionality
                      className="custom-select"
                    >
                      <Option value="" style={{ color: "rgb(143, 67, 0)" }}>
                        Currency
                      </Option>
                      {currencyList &&
                        currencyList.map((cur, index) => (
                          <Option
                            value={cur.currency_id}
                            key={"cur" + index}
                            style={{ color: "rgb(143, 67, 0)" }}
                          >
                            {cur.currency_name}
                          </Option>
                        ))}
                    </Select>
                  </div>
                  <Form.Control.Feedback type="invalid">
                    Please Select Currency.
                  </Form.Control.Feedback>
                </div>

                <div className="col-md-6 form_input_main">
                  <div className="innerSelectBox weekCounter">
                    <label className="common-labels form-label">
                      {t("Select Fuel Unit")} <span>*</span>
                    </label>
                    <div className="multi-select-1">
                      <Select
                        style={{ width: "100%", height: "40px" }}
                        required
                        placeholder="Fuel Unit"
                        value={customerSetting.customer_fuel_unit}
                        onChange={(value) => {
                          setCustomerSetting({
                            ...customerSetting,
                            customer_fuel_unit: value,
                          });
                        }}
                        className="custom-select"
                      >
                        <Option value="" style={{ color: "rgb(143, 67, 0)" }}>
                          Fuel Unit
                        </Option>
                        <Option
                          value={"liters"}
                          style={{ color: "rgb(143, 67, 0)" }}
                        >
                          Liters
                        </Option>
                        <Option
                          value={"gallons"}
                          style={{ color: "rgb(143, 67, 0)" }}
                        >
                          Gallons
                        </Option>
                      </Select>
                    </div>
                    <div className="invalid-feedback">
                      Please Select Fuel Unit.
                    </div>
                  </div>
                </div>
                <div className="col-md-6 form_input_main">
                  <div className="innerSelectBox weekCounter">
                    <label className="common-labels form-label">
                      {t("Select Temperature Unit")} <span>*</span>{" "}
                    </label>
                    <div className="multi-select-1">
                      <Select
                        style={{ width: "100%", height: "40px" }}
                        required
                        placeholder="Temperature Unit"
                        value={customerSetting.customer_temperature_unit}
                        onChange={(value) => {
                          setCustomerSetting({
                            ...customerSetting,
                            customer_temperature_unit: value,
                          });
                          setConvertTemperatureUnit(value);
                        }}
                        className="custom-select"
                      >
                        <Option value="" style={{ color: "rgb(143, 67, 0)" }}>
                          Temperature Unit
                        </Option>
                        <Option
                          value={"celsius"}
                          style={{ color: "rgb(143, 67, 0)" }}
                        >
                          Celsius
                        </Option>
                        <Option
                          value={"fahrenheit"}
                          style={{ color: "rgb(143, 67, 0)" }}
                        >
                          Fahrenheit
                        </Option>
                        <Option
                          value={"kelvin"}
                          style={{ color: "rgb(143, 67, 0)" }}
                        >
                          Kelvin
                        </Option>
                      </Select>
                    </div>
                    <div className="invalid-feedback">
                      Please Select Temperature Unit.
                    </div>
                  </div>
                </div>
                <div className="col-md-6 form_input_main">
                  <div className="">
                    <Form.Label className="common-labels">
                      {t("Website")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Website"
                      value={customerSetting.customer_website}
                      onChange={(e) => {
                        setCustomerSetting({
                          ...customerSetting,
                          customer_website: e.target.value,
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Website.
                    </Form.Control.Feedback>
                  </div>
                </div>

                <div className="road-map addParkingMap">
                  {/* <div className="color-circle"></div> */}

                  <MapComponent
                    componentId={"updateProfile"}
                    customerSetting={addressDetails}
                    setCustomerSetting={setAddressDetails}
                  />
                </div>
              </div>
              <div className="btns-main btn-wrapper">
                <button
                  type="button"
                  className="cx-btn-1"
                  onClick={() => {
                    navigate("/CustomerProfile");
                  }}
                >
                  {t("Cancel")}
                </button>
                <button
                  type="submit"
                  className="cx-btn-2"
                  // onClick={updateProfile}
                >
                  {t("Update")}
                </button>
              </div>
            </Form>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UpdateCustomerProfile;

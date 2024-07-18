import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";

import blue_front from "../../assets/images/Vehicle_Icon/Vehicle_Icon_blue_car_front.svg";
import blue_mini from "../../assets/images/Vehicle_Icon/Vehicle_Icon_blue_car_mini.svg";
import blue_side from "../../assets/images/Vehicle_Icon/Vehicle_Icon_blue_car_side.svg";
import { useTranslation } from "react-i18next";

import red_front from "../../assets/images/Vehicle_Icon/Vehicle_Icon_red_car_front.svg";
import red_mini from "../../assets/images/Vehicle_Icon/Vehicle_Icon_red_car_mini.svg";
import red_side from "../../assets/images/Vehicle_Icon/Vehicle_Icon_red_car_side.svg";
import yellow_front from "../../assets/images/Vehicle_Icon/Vehicle_Icon_yellow_car_front.svg";
import yellow_mini from "../../assets/images/Vehicle_Icon/Vehicle_Icon_yellow_car_mini.svg";
import yellow_side from "../../assets/images/Vehicle_Icon/Vehicle_Icon_yellow_car_side.svg";
import wight_side from "../../assets/images/Vehicle_Icon/Vehicle_Icon_wight_car_side.svg";
import green_front from "../../assets/images/Vehicle_Icon/Vehicle_Icon_green_car_front.svg";
import police_front from "../../assets/images/Vehicle_Icon/Vehicle_Icon_police_car_front.svg";
import sport_front from "../../assets/images/Vehicle_Icon/Vehicle_Icon_sport_front.svg";
import track_front from "../../assets/images/Vehicle_Icon/Vehicle_Icon_yellow_track_front.svg";
import taxi_front from "../../assets/images/Vehicle_Icon/Vehicle_Icon_taxi.svg";
import green_mini from "../../assets/images/Vehicle_Icon/Vehicle_Icon_green_car_mini.svg";
import green_side from "../../assets/images/Vehicle_Icon/Vehicle_Icon_green_car_side.svg";
import orange_side from "../../assets/images/Vehicle_Icon/Vehicle_Icon_orange_car_side.svg";
import blue_book from "../../assets/images/Vehicle_Icon/Vehicle_Icon_book.svg";
import blue_book2 from "../../assets/images/Vehicle_Icon/Vehicle_Icon_book2.svg";
import blue_ID from "../../assets/images/Vehicle_Icon/Vehicle_Icon_ID.svg";
import black_side from "../../assets/images/Vehicle_Icon/Vehicle_Icon_black_side.svg";

import { Link, json, useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import {
  multipartPostCallWithErrorResponse,
  multipartPostCallWithErrorResponseCategory,
  simpleGetCall,
  simplePostCall,
} from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import { useRef } from "react";
import { Select } from "antd";
const { Option } = Select;
// import { ChooseIcon } from "../../sharedComponent/IconsGroupVehicle";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const AddVehicleCategory = () => {
  const {
    sidebar,
    setSidebar,
    Dark,
    setDark,
    setVehicleTabListActive,
    customerData,
  } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  let paramID = useParams();
  const vehicleID = paramID.id;

  const { t, i18n } = useTranslation();
  const refrunning = useRef();
  const refparked = useRef();
  const refidle = useRef();
  const refuntracked = useRef();
  const ref = useRef();
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      apiAddVehicleCategory(event);
    }

    setValidated(true);
  };
  const [addVehicleCategory, setAddVehicleCategory] = useState({
    vehicleCategName: "",
    vehicleCategDescription: "",
    categoryIcon: "",
    categoryIconId: "",
    running: "",
    parked: "",
    idle: "",
    untracked: "",
    seat_capacity: "",
    vehicle_type_fuel: "",
    vehicle_count: "",
  });

  const [exitNew, setExitNew] = useState("Exisiting");
  const [errMsg, setErrMsg] = useState({
    running: "",
    parked: "",
    idle: "",
    untracked: "",
  });
  const [customize, setCustomize] = useState("custom");
  const [categoryStatus, setCategoryStatus] = useState(false);
  console.log(categoryStatus, "categoryStatus");
  const [error, setError] = useState("");
  useEffect(() => {
    getCategoryList();
    if (vehicleID) {
      getVehiclesEditSingleDetails();
      setAddVehicleCategory({
        ...addVehicleCategory,
        vehicleID: Number(vehicleID),
      });
    }
  }, []);

  const [feulDataList, setfeulDataList] = useState([
    {
      title: t("Petrol"),
      id: 1,
    },
    {
      title: t("Diesel"),
      id: 2,
    },
    {
      title: t("Oil"),
      id: 3,
    },
    {
      title: t("Gas"),
      id: 4,
    },
    {
      title: t("Electric"),
      id: 5,
    },
  ]);
  const [iconLoader, setIconLoader] = useState(false);
  const [vehicleIcons, setVehicleIcons] = useState([]);
  const [sendCategoryId, setsendCategoryId] = useState("");

  const getVehiclesEditSingleDetails = () => {
    setIconLoader(true);
    simplePostCall(
      ApiConfig.VEHICLE_SINGLE_CATEGORY,
      JSON.stringify({ vehicle_type_id: vehicleID })
    )
      .then((res) => {
        if (res.result === true) {
          let vehicle_count = res?.vehicle_count;
          setAddVehicleCategory({
            vehicleCategName:
              res.data?.vehicle_type_icon > 40
                ? res.data?.vehicle_type_code
                : res.data?.vehicle_type_code,
            vehicleCategDescription: res.data?.vehicle_type_description,

            running:
              res.data.vehicle_type_id > 40
                ? Number(res.data.vehicle_type_icon)
                : res.data.vehicle_type_id,
            parked:
              res.data.vehicle_type_id > 40
                ? Number(res.data.vehicle_type_icon)
                : res.data.vehicle_type_id,
            idle:
              res.data.vehicle_type_id > 40
                ? Number(res.data.vehicle_type_icon)
                : res.data.vehicle_type_id,
            untracked:
              res.data.vehicle_type_id > 40
                ? Number(res.data.vehicle_type_icon)
                : res.data.vehicle_type_id,
            categoryIconId:
              res.data?.vehicle_type_icon !== null &&
              res.data?.vehicle_type_icon > 40
                ? res.data?.vehicle_type_id
                : "",
            seat_capacity: res.data?.vehicle_type_capacity,
            vehicle_type_fuel: res.data.vehicle_type_fuel,
            vehicle_count: vehicle_count,
          });
          setsendCategoryId(res?.data.vehicle_type_icon);
          setExitNew(res.data?.vehicle_type_id > 40 ? "New" : "Exisiting");
          setCustomize("newIcon");
        } else {
          notifyError(res?.error);
          // console.log("error,", res);
        }
      })
      .catch((err) => {
        console.log("error response", err);
      })
      .finally(() => {
        setIconLoader(false);
      });
  };
  console.log(customize, "customize");
  const [btnDesable, setBtnDesable] = useState(false);
  const apiAddVehicleCategory = (e) => {
    e.preventDefault();
    if (customize === "newIcon" && addVehicleCategory.running.length == "") {
      setErrMsg({
        ...errMsg,
        running: "Please Select Running icon ",
      });
      return;
    }
    if (customize === "newIcon" && addVehicleCategory.parked.length == "") {
      setErrMsg({
        ...errMsg,
        parked: "Please Select parked icon ",
      });
      return;
    }
    if (customize === "newIcon" && addVehicleCategory.idle.length == "") {
      setErrMsg({
        ...errMsg,
        idle: "Please Select idle icon ",
      });
      return;
    }
    if (customize === "newIcon" && addVehicleCategory.untracked.length == "") {
      setErrMsg({
        ...errMsg,
        untracked: "Please Select untracked icon ",
      });
      return;
    }
    setBtnDesable(true);
    let exitIcons = new FormData();
    let CustomIcons = new FormData();
    exitIcons.append("categoryIcon", addVehicleCategory.categoryIcon);
    exitIcons.append("vehicleCategName", addVehicleCategory.vehicleCategName);
    exitIcons.append(
      "vehicleCategDescription",
      addVehicleCategory.vehicleCategDescription
    );
    exitIcons.append("vehicle_type_id", vehicleID);
    exitIcons.append("vehicle_type_fuel", addVehicleCategory.vehicle_type_fuel);
    CustomIcons.append(
      "vehicle_type_fuel",
      addVehicleCategory.vehicle_type_fuel
    );
    exitIcons.append("categoryIconId", addVehicleCategory.categoryIconId);
    CustomIcons.append("Running", addVehicleCategory.running);
    CustomIcons.append("Parked", addVehicleCategory.parked);
    CustomIcons.append("Idle", addVehicleCategory.idle);
    CustomIcons.append("Untracked", addVehicleCategory.untracked);
    CustomIcons.append("categoryIconId", addVehicleCategory.categoryIconId);
    CustomIcons.append("vehicleCategName", addVehicleCategory.vehicleCategName);
    CustomIcons.append(
      "vehicleCategDescription",
      addVehicleCategory.vehicleCategDescription
    );
    CustomIcons.append("vehicle_type_id", vehicleID);
    CustomIcons.append("seat_capacity", addVehicleCategory.seat_capacity);
    exitIcons.append("seat_capacity", addVehicleCategory.seat_capacity);
    let payLoadFormData = categoryStatus ? CustomIcons : exitIcons;
    multipartPostCallWithErrorResponseCategory(
      vehicleID
        ? ApiConfig.VEHICLE_UPDATECATEGORY
        : ApiConfig.VEHICLE_ADDCATEGORY,
      payLoadFormData,
      categoryStatus,
      sendCategoryId,
      customize
    )
      .then((res) => {
        setBtnDesable(false);
        if (res.json.success === true) {
          navigate("/Vehicle");
          setVehicleTabListActive("category");
          localStorage.setItem("vehicleTabListActive", "category");
          notifySuccess(res.json.message);
        } else {
          notifyError(res.json.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  // useEffect(() => {
  //   automaticDataCategory()
  // }, [])

  const automaticDataCategory = (data) => {
    let newData = CategoryDataList.filter(
      (ele) => ele.vehicle_type_code == data
    );
    setAddVehicleCategory({
      ...AddVehicleCategory,
      vehicleCategName: newData[0]?.vehicle_type_code,
      seat_capacity: newData[0]?.seat_capacity,
      categoryIconId: newData[0]?.vehicle_type_id,
      vehicleCategDescription: newData[0]?.vehicle_type_description,
      categoryIcon: "",
      running: "",
      parked: "",
      idle: "",
      untracked: "",
      vehicle_type_fuel: "",
    });
    setsendCategoryId(newData[0]?.vehicle_type_id);
  };

  const [CategoryDataList, setCategoryDataList] = useState([]);
  const getCategoryList = () => {
    simpleGetCall(ApiConfig.VEHICLE_DROWPDOWN_DEFAULT_CATEGORY)
      .then((res) => {
        setCategoryDataList(res?.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  const clearFileInput = () => {
    // Set the file input element's value to an empty string
    // addVehicleCategory.running&&  refrunning.current?.value = "",
    // addVehicleCategory.parked&& refparked.current?.value = "",
    // addVehicleCategory.idle&& refidle.current?.value = "",
    // addVehicleCategory.untracked&& refuntracked.current?.value = ""
  };
  const renderTooltipForEdit = ({ Data, ...props }) => (
    <Tooltip id="button-tooltip" {...props}>
      {Data}
    </Tooltip>
  );
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
        <div id="cx-wrapper">
          <div className="main-master-wrapper">
            <div className="Heading">
              <p>
                {vehicleID
                  ? `${t("Update Vehicle Type")}`
                  : `${t("Add Vehicle Type")}`}
              </p>
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="row vehicle_caregory">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="col-md-12 mb-3 form_input_main">
                        <div className="d-flex justify-content-between flex-wrap">
                          <Form.Label className="common-labels label-with-radio custom-label-title form_input_main me-0">
                            <p>
                              {t("Vehicle Type")} <span>&#42;</span>
                            </p>
                          </Form.Label>

                          {!vehicleID && (
                            <div id="customRadios">
                              <div class="form-check greenFlex me-2">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault2"
                                  id="Exisiting"
                                  checked={
                                    exitNew === "Exisiting" ? true : false
                                  }
                                  onChange={(e) => {
                                    setCategoryStatus(false);

                                    setExitNew("Exisiting");
                                    setAddVehicleCategory({
                                      ...addVehicleCategory,
                                      vehicleCategName: "",
                                    });
                                  }}
                                />
                                <label
                                  class="form-check-label custLabel"
                                  for="Exisiting"
                                >
                                  {t("Existing Icon")}
                                </label>
                              </div>
                              <div class="form-check  greenFlex">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault2"
                                  id="New"
                                  checked={exitNew === "New" ? true : false}
                                  onChange={(e) => {
                                    setExitNew("New");
                                    setCategoryStatus(true);
                                    setAddVehicleCategory({
                                      ...addVehicleCategory,
                                      vehicleCategName: "",
                                      // vehicleType: e.target.value,
                                    });
                                  }}
                                />
                                <label
                                  class="form-check-label custLabel"
                                  for="New"
                                >
                                  {t("New")}
                                </label>
                              </div>
                            </div>
                          )}
                        </div>

                        {exitNew === "Exisiting" && (
                          <div className="multi-select-1">
                            <Select
                              style={{
                                width: "100%",
                                height: "40px",
                                color: "rgba(156, 73, 0, 0.5)",
                              }}
                              required
                              name="vehicleCategory"
                              value={
                                addVehicleCategory.vehicleCategName
                                  ? addVehicleCategory.vehicleCategName
                                  : ""
                              }
                              placeholder={t("Enter Vehicle Type Name...")}
                              onChange={(value) => {
                                setCustomize("custom");
                                setCategoryStatus(false);
                                setAddVehicleCategory({
                                  ...addVehicleCategory,
                                  categoryIcon: "",
                                  running: "",
                                  parked: "",
                                  idle: "",
                                  untracked: "",
                                  vehicleCategName: value,
                                });

                                CategoryDataList.length > 0 &&
                                  automaticDataCategory(value);
                              }}
                              className="custom-select"
                            >
                              <Option
                                selected
                                value=""
                                style={{ color: "rgba(156, 73, 0)" }}
                              >
                                {t("Select Vehicle Type...")}
                              </Option>
                              {CategoryDataList && CategoryDataList?.length > 0
                                ? CategoryDataList?.map((item, index) => {
                                    return (
                                      <Option
                                        style={{ color: "rgba(156, 73, 0)" }}
                                        key={"vehicleCategory" + index}
                                        value={item.vehicle_type_code}
                                      >
                                        {item.vehicle_type_code}
                                      </Option>
                                    );
                                  })
                                : t("no data available")}
                            </Select>
                          </div>
                        )}

                        {exitNew === "New" && (
                          <Form.Control
                            required
                            type="text"
                            name="vehicleCategory"
                            value={
                              addVehicleCategory.vehicleCategName
                                ? addVehicleCategory.vehicleCategName
                                : ""
                            }
                            placeholder={t("Enter Vehicle Type Name...")}
                            disabled={addVehicleCategory?.vehicle_count > 0}
                            onChange={(e) => {
                              setAddVehicleCategory({
                                ...addVehicleCategory,
                                vehicleCategName: e.target.value,
                                // vehicleType: e.target.value,
                              });
                            }}
                          />
                        )}

                        <Form.Control.Feedback type="invalid">
                          {t("PLease  Enter Vehicle Type Name")}
                        </Form.Control.Feedback>

                        <Form.Control.Feedback type="invalid">
                          PLease Enter Vehicle Type Name
                        </Form.Control.Feedback>
                      </div>
                      <div className="col-md-12 mb-3 text-main">
                        <Form.Label className="common-labels">
                          {t("Vehicle Type Seat Capacity")}
                        </Form.Label>
                        <Form.Control
                          required
                          min="0"
                          type="tel"
                          value={
                            addVehicleCategory.seat_capacity
                              ? addVehicleCategory.seat_capacity
                              : ""
                          }
                          placeholder={t("Enter seat capacity")}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(/[^0-9]/gi, "");
                            if (isNaN(e.target.value)) {
                              setError(t("Please Enter number."));
                            } else {
                              setError("");
                            }
                            setAddVehicleCategory({
                              ...addVehicleCategory,
                              seat_capacity: valueInput,
                              // vehicleTypeDescription: e.target.value,
                            });
                          }}
                        />
                        {error && <div className="text-danger">{error}</div>}
                        <Form.Control.Feedback type="invalid">
                          {t("PLease  Enter vehicle Capacity")}
                        </Form.Control.Feedback>
                      </div>
                      <div className="col-md-12 mb-3 text-main">
                        <Form.Label className="common-labels">
                          {t("Vehicle Fuel")}
                        </Form.Label>

                        <div className="multi-select-1">
                          <Select
                            style={{
                              width: "100%",
                              height: "40px",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            showSearch
                            value={
                              addVehicleCategory.vehicle_type_fuel
                                ? addVehicleCategory.vehicle_type_fuel
                                : ""
                            }
                            onChange={(value) =>
                              setAddVehicleCategory({
                                ...addVehicleCategory,
                                vehicle_type_fuel: value,
                              })
                            }
                            className="custom-select"
                            placeholder="Select Fuel Type..."
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              Select Fuel Type...
                            </Option>
                            {feulDataList && feulDataList.length > 0
                              ? feulDataList.map((item, index) => {
                                  return (
                                    <Option
                                      style={{ color: "rgba(156, 73, 0)" }}
                                      key={"feaul" + index}
                                      value={item.title}
                                    >
                                      {item.title}
                                    </Option>
                                  );
                                })
                              : "no data available"}
                          </Select>
                        </div>

                        <Form.Control.Feedback type="invalid">
                          PLease Enter vehicle feul capacity
                        </Form.Control.Feedback>
                      </div>

                      <div className="d-flex justify-content-between flex-wrap">
                        <Form.Label className="common-labels label-with-radio custom-label-title form_input_main me-0">
                          <p>
                            {t("Select Icon ")} <span>&#42;</span>
                          </p>
                        </Form.Label>

                        {!vehicleID && (
                          <div id="customRadios">
                            <div class="form-check greenFlex me-2">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="custom"
                                id="custom"
                                checked={customize === "custom" ? true : false}
                                onChange={(e) => {
                                  setCategoryStatus(false);

                                  setCustomize("custom");
                                }}
                              />
                              <label
                                class="form-check-label custLabel"
                                for="custom"
                              >
                                {t("Existing Icon")}
                              </label>
                            </div>
                            <div class="form-check  greenFlex">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="custom"
                                id="newIcon"
                                checked={customize === "newIcon" ? true : false}
                                onChange={(e) => {
                                  setCustomize("newIcon");
                                  setCategoryStatus(true);
                                  // setAddVehicleCategory({
                                  //   ...addVehicleCategory,
                                  //   vehicleCategName: ""
                                  //   // vehicleType: e.target.value,
                                  // })
                                }}
                              />
                              <label
                                class="form-check-label custLabel"
                                for="newIcon"
                              >
                                {t("New Icon")}
                              </label>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="col-md-12 mb-3 select_vehicle_icon">
                        {/* <Form.Label className="common-labels">
                          {t("Choose Vehicle Icon")}
                        </Form.Label> */}
                      { customize==="newIcon" && <div className="row">
                          <div className="col-md-3 mb-3 ">

                            <Form.Label className="common-labels" For="file">
                              {t("Running")}
                            </Form.Label>
                            <Form.Control
                              ref={refrunning}
                              type="file"
                              accept="image/png, image/gif, image/jpeg"
                              id="file"
                              placeholder={t("Browse a file...")}
                              onChange={(e) => {
                                setCategoryStatus(true)
                                setsendCategoryId(vehicleID)
                                setErrMsg({
                                  ...errMsg,
                                  running: "",
                                });
                                setAddVehicleCategory({
                                  ...addVehicleCategory,
                                  categoryIconId: "",
                                  running: e.target.files[0],
                                  // selectVehicleIcon: e.target.files[0],
                                })
                              }
                              }
                            />
                                    {errMsg.running.length > 0 && (
                        <span className="text-danger">
                          {errMsg.running}
                        </span>
                      )}
                            {
                              addVehicleCategory?.running !== "" && addVehicleCategory?.running && (
                                <img
                                  style={{ width: "50px", height: "70px", marginTop: "5px", objectFit: "contain" }}
                                  src={addVehicleCategory?.running > 40
                                    ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id}/vehicle_type/${addVehicleCategory?.running}/Running.png` : (typeof (addVehicleCategory?.running) !== "object") ? `${ApiConfig.BASE_URL}uploads/vehicle_type/${addVehicleCategory?.running}/Running.svg`
                                      : addVehicleCategory?.running &&
                                      URL.createObjectURL(addVehicleCategory?.running)}
                                  alt={t("Not img found")}
                                />
                              )
                            }
                          </div>
                          <div className="col-md-3 mb-3 ">

                            <Form.Label className="common-labels" For="file">
                              {t("Parked")}
                            </Form.Label>
                            <Form.Control

                              ref={refparked}
                              type="file"
                              accept="image/png, image/gif, image/jpeg"
                              id="file"
                              placeholder={t("Browse a file...")}
                              onChange={(e) => {
                                setCategoryStatus(true)
                                setsendCategoryId(vehicleID)
                                setErrMsg({
                                  ...errMsg,
                                  parked: "",
                                });
                                setAddVehicleCategory({
                                  ...addVehicleCategory,
                                  categoryIconId: "",
                                  parked: e.target.files[0],
                                  // selectVehicleIcon: e.target.files[0],
                                })
                              }
                              }
                            />
                                                   {errMsg.parked.length > 0 && (
                        <span className="text-danger">
                          {errMsg.parked}
                        </span>
                      )}
                            {
                              addVehicleCategory?.parked != "" && addVehicleCategory?.parked && (
                                <img
                                  style={{ width: "50px", height: "70px", marginTop: "5px", objectFit: "contain" }}
                                  src={addVehicleCategory?.parked > 40
                                    ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id}/vehicle_type/${addVehicleCategory?.parked}/Parked.png` : (typeof (addVehicleCategory?.parked) !== "object") ? `${ApiConfig.BASE_URL}uploads/vehicle_type/${addVehicleCategory?.parked}/Parked.svg`

                                      : addVehicleCategory?.parked &&
                                      URL.createObjectURL(addVehicleCategory?.parked)}
                                      alt={t("Not img found")}
                                />
                              )
                            }
                          </div>
                          <div className="col-md-3 mb-3 ">

                            <Form.Label className="common-labels" For="file">
                              {t("Idle")}
                            </Form.Label>
                            <Form.Control

                              ref={refidle}
                              type="file"
                              accept="image/png, image/gif, image/jpeg"
                              id="file"
                              placeholder={t("Browse a file...")}
                              onChange={(e) => {
                                setCategoryStatus(true)
                                setsendCategoryId(vehicleID)
                                setErrMsg({
                                  ...errMsg,
                                  idle: "",
                                });
                                setAddVehicleCategory({
                                  ...addVehicleCategory,
                                  categoryIconId: "",
                                  idle: e.target.files[0],
                                  // selectVehicleIcon: e.target.files[0],
                                })
                              }
                              }
                            />
                                                              {errMsg.idle.length > 0 && (
                        <span className="text-danger">
                          {errMsg.idle}
                        </span>
                      )}
                            {
                              addVehicleCategory?.idle != "" && addVehicleCategory?.idle && (
                                <img
                                  style={{ width: "50px", height: "70px", marginTop: "5px", objectFit: "contain" }}
                                  src={addVehicleCategory?.idle > 40
                                    ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id}/vehicle_type/${addVehicleCategory?.idle}/Idle.png` : (typeof (addVehicleCategory?.idle) !== "object") ? `${ApiConfig.BASE_URL}uploads/vehicle_type/${addVehicleCategory?.idle}/Idle.svg`

                                      : addVehicleCategory?.idle &&
                                      URL.createObjectURL(addVehicleCategory?.idle)}
                                      alt={t("Not img found")}
                                />
                              )
                            }
                          </div>
                          <div className="col-md-3 mb-3 ">

                            <Form.Label className="common-labels" For="file">
                              {t("Untracked")}
                            </Form.Label>
                            <Form.Control

                              ref={refuntracked}
                              type="file"
                              accept="image/png, image/gif, image/jpeg"
                              id="file"
                              placeholder={t("Browse a file...")}
                              onChange={(e) => {
                                setCategoryStatus(true)
                                setsendCategoryId(vehicleID)
                                setErrMsg({
                                  ...errMsg,
                                  untracked: "",
                                });
                                setAddVehicleCategory({
                                  ...addVehicleCategory,
                                  categoryIconId: "",
                                  untracked: e.target.files[0],
                                  // selectVehicleIcon: e.target.files[0],
                                })
                              }
                              }
                            />
                                                                            {errMsg.untracked.length > 0 && (
                        <span className="text-danger">
                          {errMsg.untracked}
                        </span>
                      )}
                            {
                              addVehicleCategory?.untracked != "" && addVehicleCategory?.untracked && (
                                <img
                                  style={{ width: "50px", height: "70px", marginTop: "5px", objectFit: "contain" }}
                                  src={addVehicleCategory?.untracked > 40
                                    ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id}/vehicle_type/${addVehicleCategory?.untracked}/Untracked.png` : (typeof (addVehicleCategory?.untracked) !== "object") ? `${ApiConfig.BASE_URL}uploads/vehicle_type/${addVehicleCategory?.untracked}/Untracked.svg`

                                      : addVehicleCategory?.untracked &&
                                      URL.createObjectURL(addVehicleCategory?.untracked)}
                                      alt={t("Not img found")}
                                />
                              )
                            }
                          </div>
                        </div>}
                        {/* <Form.Label className="common-labels" For="file">
                          {t("Select Vehicle Icon")}
                        </Form.Label>
                        <Form.Control
                          ref={ref}
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          id="file"
                          placeholder="Browse a file..."
                          onChange={(e) =>
                            setAddVehicleCategory({
                              ...addVehicleCategory,
                              categoryIconId: "",
                              categoryIcon: e.target.files[0],
                              // selectVehicleIcon: e.target.files[0],
                            })
                          }
                        /> */}

                        {/* {
                          addVehicleCategory?.categoryIcon != "" && addVehicleCategory?.categoryIcon && (
                            <img
                              style={{ width: "50px", height: "70px", marginTop: "5px", objectFit: "contain" }}
                              src={ addVehicleCategory?.categoryIcon === "string"
                                ? `${ApiConfig.BASE_URL}${addVehicleCategory?.categoryIcon}`
                                : addVehicleCategory?.categoryIcon &&
                                URL.createObjectURL(addVehicleCategory?.categoryIcon)}
                             alt={t("Not img found")}
                            />
                          )
                        } */}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="col-md-12 text-main">
                        <Form.Label className="common-labels">
                          {t("Vehicle Type Description")}
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          required
                          type="text"
                          rows="9"
                          value={
                            addVehicleCategory.vehicleCategDescription
                              ? addVehicleCategory.vehicleCategDescription
                              : ""
                          }
                          placeholder={t("Enter Vehicle Type Description...")}
                          onChange={(e) =>
                            setAddVehicleCategory({
                              ...addVehicleCategory,
                              vehicleCategDescription: e.target.value,
                              // vehicleTypeDescription: e.target.value,
                            })
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("Please Enter Vehicle Type Description")}
                        </Form.Control.Feedback>
                      </div>
                    </div>

                    <div className="row m-0 p-0 mb-3 logo-custom-main">
                      {customize === "custom" && (
                        <div className="col-md-12">
                          {/* <div className="or-section">
                          <hr />
                          <Form.Label className="common-labels">{t("OR")}</Form.Label>
                          <hr />
                        </div> */}
                          <div className="innerImages">
                            {iconLoader ? (
                              "Loading..."
                            ) : CategoryDataList.length > 0 ? (
                              CategoryDataList &&
                              CategoryDataList?.map((icon) => {
                                return (
                                  <label
                                    class="custom-checkbox"
                                    for={icon?.vehicle_type_icon}
                                  >
                                    <input
                                      // disabled={ addVehicleCategory.categoryIcon === "string" || "object"
                                      //   ? true : false}
                                      class="d-none"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id={icon?.vehicle_type_icon}
                                      checked={
                                        addVehicleCategory?.categoryIconId ==
                                        icon?.vehicle_type_icon
                                          ? true
                                          : false
                                      }
                                      onChange={() => {
                                        setAddVehicleCategory({
                                          ...addVehicleCategory,
                                          running: "",
                                          parked: "",
                                          idle: "",
                                          untracked: "",
                                          categoryIcon: "",
                                          categoryIconId:
                                            icon.vehicle_type_icon,

                                          // selectVehicleIcon: icon,
                                        });
                                        // clearFileInput()
                                        setCategoryStatus(false);
                                        setsendCategoryId(
                                          icon.vehicle_type_icon
                                        );
                                      }}
                                    />
                                    <OverlayTrigger
                                      placement="right"
                                      delay={{ show: 250, hide: 400 }}
                                      // overlay={renderTooltipForEdit}
                                      overlay={(props) =>
                                        renderTooltipForEdit({
                                          Data: icon?.vehicle_type_code,
                                          ...props,
                                        })
                                      }
                                    >
                                      {/* <Link
                                      to="#"
                                      onClick={() => {
                                        setDeleteID(item?.vacation_id);
                                        handleShow();
                                      }}
                                    >
                                      <div className="inconsIn">
                                        <img src={delete_icon} alt="" />
                                      </div>
                                    </Link> */}
                                      <img
                                        style={{
                                          width: "50px",
                                          height: "70px",
                                        }}
                                        src={`${ApiConfig.BASE_URL}uploads/vehicle_type/${icon?.vehicle_type_icon}/Parked.svg`}
                                        alt="no icon"
                                      />
                                    </OverlayTrigger>
                                    {/* <img  style={{ width: "50px", height: "70px", }} src={`${ApiConfig.BASE_URL}uploads/vehicle_type/${icon}/Parked.svg`} alt="no icon" /> */}
                                  </label>
                                );
                              })
                            ) : (
                              <div className="text-danger">
                                {t("No Icon found")}{" "}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {!vehicleID && (
                        <div className="col-md-6 priview-icon">
                          <p className="common-labels mb-4">{t("Preview")} </p>

                          {addVehicleCategory.running ||
                          addVehicleCategory.parked ||
                          addVehicleCategory.idle ||
                          addVehicleCategory.untracked ? (
                            (addVehicleCategory.running ||
                              addVehicleCategory.parked ||
                              addVehicleCategory.idle ||
                              addVehicleCategory.untracked) &&
                            customize === "newIcon" && (
                              <div className="d-flex justify-content-space-between">
                                <figure>
                                  <figcaption className="common-labels mb-4 text-center ">
                                    {t("Running")}{" "}
                                  </figcaption>
                                  {addVehicleCategory.running !== "" && (
                                    <img
                                      style={{ width: "100px", height: "70px" }}
                                      src={
                                        addVehicleCategory?.running > 40
                                          ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id}/vehicle_type/${addVehicleCategory?.running}/Running.png`
                                          : typeof addVehicleCategory?.running !==
                                            "object"
                                          ? `${ApiConfig.BASE_URL}uploads/vehicle_type/${addVehicleCategory?.running}/Running.svg`
                                          : addVehicleCategory?.running &&
                                            URL.createObjectURL(
                                              addVehicleCategory?.running
                                            )
                                      }
                                      alt="Not img found"
                                    />
                                  )}
                                </figure>
                                <figure>
                                  <figcaption className="common-labels mb-4 text-center ">
                                    {t("Parked")}
                                  </figcaption>
                                  {addVehicleCategory.parked !== "" && (
                                    <img
                                      style={{ width: "100px", height: "70px" }}
                                      src={
                                        addVehicleCategory?.parked > 40
                                          ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id}/vehicle_type/${addVehicleCategory?.parked}/Parked.png`
                                          : typeof addVehicleCategory?.parked !==
                                            "object"
                                          ? `${ApiConfig.BASE_URL}uploads/vehicle_type/${addVehicleCategory?.parked}/Parked.svg`
                                          : addVehicleCategory?.parked &&
                                            URL.createObjectURL(
                                              addVehicleCategory?.parked
                                            )
                                      }
                                      alt="Not img found"
                                    />
                                  )}
                                </figure>
                                <figure>
                                  <figcaption className="common-labels mb-4 text-center ">
                                    {t("")}
                                  </figcaption>
                                  {addVehicleCategory.idle !== "" && (
                                    <img
                                      style={{ width: "100px", height: "70px" }}
                                      src={
                                        addVehicleCategory?.idle > 40
                                          ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id}/vehicle_type/${addVehicleCategory?.idle}/Idle.png`
                                          : typeof addVehicleCategory?.idle !==
                                            "object"
                                          ? `${ApiConfig.BASE_URL}uploads/vehicle_type/${addVehicleCategory?.idle}/Idle.svg`
                                          : addVehicleCategory?.idle &&
                                            URL.createObjectURL(
                                              addVehicleCategory?.idle
                                            )
                                      }
                                      alt="Not img found"
                                    />
                                  )}
                                </figure>
                                <figure>
                                  <figcaption className="common-labels mb-4 text-center ">
                                    {t("Untracked")}{" "}
                                  </figcaption>
                                  {addVehicleCategory.untracked !== "" && (
                                    <img
                                      style={{ width: "100px", height: "70px" }}
                                      src={
                                        addVehicleCategory?.untracked > 40
                                          ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id}/vehicle_type/${addVehicleCategory?.untracked}/Untracked.png`
                                          : typeof addVehicleCategory?.untracked !==
                                            "object"
                                          ? `${ApiConfig.BASE_URL}uploads/vehicle_type/${addVehicleCategory?.untracked}/Untracked.svg`
                                          : addVehicleCategory?.untracked &&
                                            URL.createObjectURL(
                                              addVehicleCategory?.untracked
                                            )
                                      }
                                      alt={t("Not img found")}
                                    />
                                  )}
                                </figure>
                              </div>

                              // <img
                              //   style={{ width: "100px", height: "70px", }}
                              //   src={ addVehicleCategory?.categoryIcon === "string"
                              //     ? `${ApiConfig.BASE_URL}${addVehicleCategory?.categoryIcon}`
                              //     : addVehicleCategory?.categoryIcon &&
                              //     URL.createObjectURL(addVehicleCategory?.categoryIcon)}
                              //   alt="Not img found"
                              // />
                            )
                          ) : customize === "custom" &&
                            addVehicleCategory.categoryIconId !== "" &&
                            addVehicleCategory.categoryIconId !== null &&
                            addVehicleCategory.categoryIconId !== undefined ? (
                            <div className="d-flex justify-content-space-between">
                              ) (
                              {/* <figure>
                                <figcaption className="common-labels mb-4 text-center ">Customer</figcaption>
                                <img
                                  src={`${ApiConfig.BASE_URL}uploads/vehicle_type/${addVehicleCategory?.categoryIconId}/Customer.svg`}
                                  alt="no icon"
                                />
                              </figure> */}
                              <figure>
                                <figcaption className="common-labels mb-4 text-center ">
                                  {t("Running")}{" "}
                                </figcaption>{" "}
                                <img
                                  style={{ width: "120px", height: "150px" }}
                                  src={`${ApiConfig.BASE_URL}uploads/vehicle_type/${addVehicleCategory?.categoryIconId}/Running.svg`}
                                  alt="no icon"
                                />
                              </figure>
                              <figure>
                                <figcaption className="common-labels mb-4 text-center">
                                  {t("Parked")}{" "}
                                </figcaption>{" "}
                                <img
                                  style={{ width: "120px", height: "150px" }}
                                  src={`${ApiConfig.BASE_URL}uploads/vehicle_type/${addVehicleCategory?.categoryIconId}/Parked.svg`}
                                  alt="no icon"
                                />
                              </figure>
                              <figure>
                                <figcaption className="common-labels mb-4 text-center">
                                  {t("Idle")}{" "}
                                </figcaption>{" "}
                                <img
                                  style={{ width: "120px", height: "150px" }}
                                  src={`${ApiConfig.BASE_URL}uploads/vehicle_type/${addVehicleCategory?.categoryIconId}/Idle.svg`}
                                  alt="no icon"
                                />
                              </figure>
                              <figure>
                                <figcaption className="common-labels mb-4 text-center">
                                  {t("Untracked")}{" "}
                                </figcaption>{" "}
                                <img
                                  style={{ width: "120px", height: "150px" }}
                                  src={`${ApiConfig.BASE_URL}uploads/vehicle_type/${addVehicleCategory?.categoryIconId}/Untracked.svg`}
                                  alt="no icon"
                                />
                              </figure>
                              {/* <figure>
                                <figcaption>Running</figcaption> <img
                                  src={`${ApiConfig.BASE_URL}uploads/vehicle_type/${addVehicleCategory?.categoryIconId}/running.svg`}
                                  alt="no icon"
                                /></figure> */}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="botttom-btn btn-wrapper">
                  <button
                    className="cx-btn-1"
                    type="button"
                    onClick={() => {
                      setVehicleTabListActive("category");
                      localStorage.setItem("vehicleTabListActive", "category");
                      navigate("/Vehicle");
                      setAddVehicleCategory({
                        vehicleCategName: "",
                        vehicleCategDescription: "",
                        categoryIcon: "",
                        categoryIconId: "",
                      });
                    }}
                  >
                    {t("Cancel")}
                  </button>

                  <button className="cx-btn-2" disabled={btnDesable}>
                    {btnDesable && (
                      <div class="spinner-border cx-btn-load" role="status">
                        <span class="sr-only"> </span>
                      </div>
                    )}
                    {vehicleID ? `${t("Update")}` : `${t("Submit")}`}
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AddVehicleCategory;

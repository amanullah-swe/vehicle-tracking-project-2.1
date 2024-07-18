import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import DDlogo from "../../assets/images/DDlogo.png";
import Multiselect from "multiselect-react-dropdown";
import Geofance from "../../assets/images/Geo-fance.svg";
import Rectangle from "../../assets/images/Rectangle.svg";
import plam from "../../assets/images/plam.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import whiteTrash from "../../assets/images/whiteTrash.svg";
import whiteHand from "../../assets/images/whiteHand.svg";
import whiteBox from "../../assets/images/whiteBox.svg";
import whiteBin from "../../assets/images/whiteBin.svg";
import { motion } from "framer-motion";
import MapComponent from "../../sharedComponent/MapComponent";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import ApiConfig from "../../api/ApiConfig";
import {
  simpleGetCall,
  simpleGetCallWithErrorResponse,
  simplePostCall,
} from "../../api/ApiServices";
import { useTranslation } from "react-i18next";
import green_box from "../../assets/images/green_box.svg";
import { Select, Space } from "antd";
const { Option } = Select;
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const AddVehicleGroup = () => {
  const { t, i18n } = useTranslation();

  const {
    sidebar,
    setSidebar,
    Dark,
    setDark,
    radius,
    place,
    setPositionRectangle,
    setPositionCercle,
    setPostionRadius,
    setLayerTypeSend,
    setPlace,
    setMapLatLngData,
    mapLatLngData,
    layerTypeSend,
    setRadius,
    setPostionPolygon,
    vehicleTabListActive,
    setVehicleTabListActive,
    getTransporatioData,
    setErrMsgMap,
    errMsgMap,
  } = useContext(AppContext);
  const [btnDesable, setBtnDesable] = useState(false);
  let paramID = useParams();
  const vehicleID = paramID.id;
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      handleValidation(event);
    }

    setValidated(true);
  };

  const handleValidation = (e) => {
    e.preventDefault();
    if (groupVehicle.length === 0) {
      setErrMsg(t("Please Select Vehicle"));
      return;
    }
    if (mapLatLngData.length === 0) {
      setErrMsgMap(
        t("You can use below tools to  draw at least one geofence.")
      );
      return;
    } else {
      apiAddVehicle(e);
    }
  };
  const [groupVehicle, setGroupVehicle] = useState([]);
  const [groupVehicleList, setGroupVehicleList] = useState([]);
  const [addVehicleCategory, setAddVehicleCategory] = useState({
    groupName: "",
    groupManagerId: "",
  });

  const [vehicleListData, setVehicleListData] = useState([]);
  const [managerListData, setManagerListData] = useState([]);

  const apiAddVehicle = (e) => {
    e.preventDefault();
    // let sendId =
    //   groupVehicle &&
    //   groupVehicle?.map((ele, index) => {
    //     return ele.vehicle_id;
    //   });

    e.preventDefault();
    setBtnDesable(true);
    simplePostCall(
      vehicleID ? ApiConfig.VEHICLE_UPDATEGROUP : ApiConfig.VEHICLE_ADDGROUP,
      JSON.stringify({
        ...addVehicleCategory,
        vehicleGroupId: vehicleID,
        vehicleIds: groupVehicle,
        drowradius: radius,
        drowtype: layerTypeSend,
        drowvalue: mapLatLngData,
      })
    )
      .then((res) => {
        setBtnDesable(false);
        if (res.result === true) {
          setVehicleTabListActive("group");
          localStorage.setItem("vehicleTabListActive", "group");
          navigate("/Vehicle");
          notifySuccess(res.message);
        } else {
          notifyError(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };
  useEffect(() => {
    getVehicleList();
    getManagerList();
    if (vehicleID) {
      getEditDataOfVehicleGroup(vehicleID);
    }
    getTransporatioData();
  }, []);

  const getEditDataOfVehicleGroup = (vehicleID) => {
    simpleGetCallWithErrorResponse(
      `${ApiConfig.VEHICLE_GROUP_EDIT_DATA}?vehicleGroupId=${vehicleID}`
    )
      .then((res) => {
        if (res.json.success === true) {
          let data = res.json.data[0];
          setAddVehicleCategory({
            groupName: data?.vehicle_group_name,
            groupManagerId: data?.vehicle_group_manager_id,
          });
          let sendId =
            data?.vehicles &&
            data?.vehicles?.map((ele, index) => {
              return ele.vehicle_id;
            });
          setGroupVehicle(sendId);
          setMapLatLngData(data?.drowvalue);
          setLayerTypeSend(data?.type);
          if (data.type == "circle") {
            if (!data.drowvalue.includes(null)) {
              setPositionCercle(data.drowvalue ? data.drowvalue : []);
            }
            setPostionRadius(Number(data.radius) ? Number(data.radius) : "");
            setRadius(Number(data.radius) ? Number(data.radius) : "");
          }
          if (data.type === "polygon") {
            if (!data.drowvalue.includes(null)) {
              setPostionPolygon(data.drowvalue);
            }
          }

          if (data.type === "rectangle") {
            if (!data.drowvalue.includes(null)) {
              setPositionRectangle(data?.drowvalue);
            }
          }
          // if (!data.drowvalue.includes(null)) {
          //   setMapLatLngData(data?.drowvalue ? data.drowvalue : []);
          // }
        } else {
          console.log("error respnosnjr,", res);
        }
      })
      .catch((err) => {
        console.log("error respnosnjr,", err);
      });
  };

  const getVehicleList = () => {
    simplePostCall(
      ApiConfig.VEHICLEGROUP_AllVEHICLE_DROPDOWN,
      JSON.stringify({ key: "VehicleList" })
    )
      .then((res) => {
        if (res.success === true) {
          setGroupVehicleList(res.data);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };
  const getManagerList = () => {
    simplePostCall(ApiConfig.VEHICLE_DROWPDOWN_MANAGER, JSON.stringify({}))
      .then((res) => {
        setManagerListData(res?.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };
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
      <div id="cx-wrapper" className="AddVehicle_Group">
        <div className="main-master-wrapper ">
          <div className="Heading">
            <p>
              {vehicleID ? t("Edit Vehicle Group") : t("Add Vehicle Group")}
            </p>
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="row vehicle_caregory">
              <div className="col-md-4 mb-3">
                <Form.Label className="common-labels" for="typeVi">
                  {t("Group Name")}
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="typeVi"
                  placeholder={t("Enter Group Name...")}
                  value={
                    addVehicleCategory.groupName
                      ? addVehicleCategory.groupName
                      : ""
                  }
                  onChange={(e) =>
                    setAddVehicleCategory({
                      ...addVehicleCategory,
                      groupName: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {t("Enter Group Name")}
                </Form.Control.Feedback>
              </div>
              <div className="col-md-4 mb-3 innerInputsGen">
                <div className="innerSelectBox">
                  <Form.Label className="common-labels me-0">
                    {t("Group Manager")}
                  </Form.Label>
                  <div className="multi-select-1">
                    <Select
                      style={{ width: "100%", height: "40px" }}
                      placeholder="Select Fuel Type..."
                      value={
                        addVehicleCategory.groupManagerId
                          ? addVehicleCategory.groupManagerId
                          : ""
                      }
                      onChange={(value) =>
                        setAddVehicleCategory({
                          ...addVehicleCategory,
                          groupManagerId: value,
                        })
                      }
                      showSearch
                      className="custom-select"
                    >
                      <Option value="" style={{ color: "rgba(156, 73, 0)" }}>
                        Select Group Manager
                      </Option>
                      {/* managerListData */}
                      {managerListData && managerListData?.length > 0
                        ? managerListData.map((ele, index) => {
                            return (
                              <Option
                                key={"testt" + index}
                                value={ele.user_id}
                                style={{ color: "rgba(156, 73, 0)" }}
                              >
                                {ele.user_name}
                              </Option>
                            );
                          })
                        : "no data available"}
                    </Select>
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {t("Please Select Group Manager")}
                  </Form.Control.Feedback>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <Form.Label className="common-labels custom-label-title me-0">
                  <p>{t("Vehicles")}</p>
                </Form.Label>
                <div className="dropdown-wrapper w-100">
                  <div className="multi-select-1 w-100">
                    <div className="multi-select-1">
                      <Select
                        mode="multiple" // Enable multiple selection
                        style={{ width: "100%", color: "rgba(156, 73, 0)" }}
                        placeholder={t("Select Vehicle")}
                        key={"select vehicle"}
                        onChange={(selectedValues) => {
                          setGroupVehicle(selectedValues);
                          setErrMsg("");
                        }}
                        value={groupVehicle}
                        optionLabelProp="label"
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {groupVehicleList.map((data, index) => (
                          <Option
                            style={{ color: "rgba(156, 73, 0)" }}
                            key={data.vehicle_id}
                            value={data.vehicle_id}
                            label={data.vehicle_number}
                          >
                            <Space>
                              <span role="img" aria-label={data.vehicle_id}>
                                {data.vehicle_number}
                              </span>
                            </Space>
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
                {errMsg?.length > 0 && (
                  <span className="text-danger">{errMsg}</span>
                )}
              </div>
              <div className="addnew-map">
                <div className="road-map addParkingMap">
                  {errMsgMap.length > 0 && (
                    <span className="text-danger">{errMsgMap}</span>
                  )}
                  <MapComponent componentId={"VehicleGroup"} />
                </div>
              </div>

              <div className="btn-common btn-wrapper justify-content-between">
                <div className="notific">
                  <img src={green_box} alt="" />
                  <label>{t("Transportation Coverage Area")}</label>
                </div>
                <div className="d-flex">
                  <button
                    className="cx-btn-1"
                    type="button"
                    onClick={() => {
                      setVehicleTabListActive("group");
                      localStorage.setItem("vehicleTabListActive", "group");
                      navigate("/Vehicle");
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
                    {vehicleID ? t("Update") : t("Submit")}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </motion.div>
  );
};

export default AddVehicleGroup;

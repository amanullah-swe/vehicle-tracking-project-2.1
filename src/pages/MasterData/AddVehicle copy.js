import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import Rcheck from "../../assets/images/red-check.svg";
import Gcheck from "../../assets/images/Green-check.svg";
// import DDlogo from "../../assets/images/DDlogo.png";
import Close from "../../assets/images/Close.svg";
import Geofance from "../../assets/images/Geo-fance.svg";
import Rectangle from "../../assets/images/Rectangle.svg";
import plam from "../../assets/images/plam.svg";
import { useNavigate } from "react-router";
import Multiselect from "multiselect-react-dropdown";
import whiteTrash from "../../assets/images/whiteTrash.svg";
import whiteHand from "../../assets/images/whiteHand.svg";
import whiteBox from "../../assets/images/whiteBox.svg";
import whiteBin from "../../assets/images/whiteBin.svg";
import Calendar from "../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import MapComponent from "../../sharedComponent/MapComponent";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import {
  multipartPostCall,
  simpleGetCall,
  simplePostCall,
} from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { Link, useParams } from "react-router-dom";
import CommonDatePicker from "../../sharedComponent/CommonDatePicker";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  Col,
  Dropdown,
  Modal,
  Tab,
  Tabs,
  Nav,
} from "react-bootstrap";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Feature_CarLock from "../../assets/images/Feature_CarLock.svg";
import Import from "../../assets/images/ic-Import.svg";
import Feature_CarLock_active from "../../assets/images/Feature_CarLock_active.svg";
import Feature_temp_active from "../../assets/images/Feature_temp_active.svg";
import Feature_temp from "../../assets/images/Feature_temp1.svg";
import Feature_Fuel_active from "../../assets/images/Feature_Fule_active.svg";
import Feature_Fuel from "../../assets/images/Feature_Fule.svg";
import Feature_I_active from "../../assets/images/Feature_i_active.svg";
import Feature_I from "../../assets/images/Feature_I.svg";
import Feature_Echo_active from "../../assets/images/Feature_Echo_active.svg";
import Feature_Echo from "../../assets/images/Feture_echo.svg";
import Feature_Seat_active from "../../assets/images/Feature_Seat_active.svg";
import Feature_Seat from "../../assets/images/Feature_Seat.svg";
import Feature_IVMS_active from "../../assets/images/Feature_IVMS_active.svg";
import Feature_IVMS from "../../assets/images/Feature_IVMS.svg";
import Feature_Card_active from "../../assets/images/Feature_Card_active.svg";
import Feature_Card from "../../assets/images/Feature_Card.svg";
import Feature_Overspeed_active from "../../assets/images/Feature_Overspeed_active.svg";
import Feature_Overspeed from "../../assets/images/Feature_overspeed.svg";
import Feature_Crash_active from "../../assets/images/Feature_Crash_active.svg";
import Feature_Crash from "../../assets/images/Feature_creash.svg";
import Feature_Towing_active from "../../assets/images/Feature_Towing_active.svg";
import Feature_Towing from "../../assets/images/Feature_Towing.svg";
import Feature_Unplag_active from "../../assets/images/Feature_Unplag_active.svg";
import Feature_Unplag from "../../assets/images/Feature_Unplag.svg";
import Feature_Exicess_active from "../../assets/images/Feature_Exicess_active.svg";
import Feature_Exicess from "../../assets/images/Feature_Exicess.svg";
import Tracking_Active from "../../assets/images/Tracking-ON.svg";
import Tracking from "../../assets/images/Tracking-Off.svg";
import MapOffline_Active from "../../assets/images/Offinemap-ON.svg";
import MapOffline from "../../assets/images/Offinemap-Off.svg";
import green_box from "../../assets/images/green_box.svg";
import range from "lodash/range";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const featureDataListNew = [
  {
    feature: "Immobilization",
    activeImg: Feature_CarLock_active,
    inActiveImg: Feature_CarLock,
    feature_id: 13,
  },
  {
    feature: "Temperature Sensors",
    feature_id: 1,
    activeImg: Feature_temp_active,
    inActiveImg: Feature_temp,
  },
  {
    feature_id: 2,
    feature: "Fuel sensor",
    activeImg: Feature_Fuel_active,
    inActiveImg: Feature_Fuel,
  },
  {
    feature_id: 3,
    feature: "I button",
    activeImg: Feature_I_active,
    inActiveImg: Feature_I,
  },
  {
    feature_id: 4,
    feature: "Seat Belt sensor",
    activeImg: Feature_Seat_active,
    inActiveImg: Feature_Seat,
  },
  {
    feature_id: 5,
    feature: "Echo Driving",
    activeImg: Feature_Echo_active,
    inActiveImg: Feature_Echo,
  },
  {
    feature_id: 6,
    feature: "IVMS",
    activeImg: Feature_IVMS_active,
    inActiveImg: Feature_IVMS,
  },
  {
    feature_id: 7,
    feature: "Card reader",
    activeImg: Feature_Card_active,
    inActiveImg: Feature_Card,
  },
  {
    feature_id: 8,
    feature: "Over Speeding",
    activeImg: Feature_Overspeed_active,
    inActiveImg: Feature_Overspeed,
  },
  {
    feature_id: 9,
    feature: "Crash Detection",
    activeImg: Feature_Crash_active,
    inActiveImg: Feature_Crash,
  },
  {
    feature_id: 10,
    feature: "Excessive Idling",
    activeImg: Feature_Exicess_active,
    inActiveImg: Feature_Exicess,
  },
  {
    feature_id: 11,
    feature: "Towing detection",
    activeImg: Feature_Towing_active,
    inActiveImg: Feature_Towing,
  },
  {
    feature_id: 12,
    feature: "unplug detection",
    activeImg: Feature_Unplag_active,
    inActiveImg: Feature_Unplag,
  },
  {
    feature_id: 14,
    feature: "Tracking",
    activeImg: Tracking_Active,
    inActiveImg: Tracking,
  },
  {
    feature_id: 15,
    feature: "Offline map",
    activeImg: MapOffline_Active,
    inActiveImg: MapOffline,
  },
];
const AddVehicle = () => {
  const {
    sidebar,
    setSidebar,
    Dark,
    setDark,
    radius,
    place,
    setRadius,
    setRegionCord,
    setRadiusDraw,
    errMsgMap,
    setErrMsgMap,
    setMapZoomValue,
    setPostionPolygon,
    setPositionRectangle,
    setPositionCercle,
    setPostionRadius,
    layerTypeSend,
    setLayerTypeSend,
    setPlace,
    mapLatLngData,
    setMapLatLngData,
    vehicleTabListActive,
    setVehicleTabListActive,
    getTransporatioData,
  } = useContext(AppContext);

  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  let paramID = useParams();
  const vehicleID = paramID.id;
  const [screenTab, setScreenTab] = useState("Vehicle Information");
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);
  const [form4, setForm4] = useState(false);
  const [form5, setForm5] = useState(false);
  const [form6, setForm6] = useState(false);
  const { t, i18n } = useTranslation();

  const [temperatureData, setTemperatureData] = useState([
    {
      sensorName: "",
      minimumTemperatureRunning: "",
      maximumTemperatureRunning: "",
      minimumTemperatureParked: "",
      maximumTemperatureParked: "",
    },
  ]);

  const [featurevalueSend, setFeaturevalueSend] = useState(70);
  const [valueFeatureId, setValueFeatureId] = useState("");
  const [valueFeatureIdNew, setValueFeatureIdNew] = useState(8);
  const [valueFeatureIdSpped, setValueFeatureIdSpeed] = useState(true);
  const [valueFeatureIdTemp, setValueFeatureIdTemp] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);

  const [addVehicleData, setAddVehicleData] = useState({
    user_id: "",
    vehicle_id: "",
    vehicleNumber_Name: "",
    registrationNumber: "",
    vehicleCategory: "",
    vehicleCapacity: "",
    modelNameandNumber: "",
    chassisNumberorVINnumber: "",
    engineNumber: "",
    fuelType: "",
    odometerReading: "",
    driverId: "",
    vehicleGroupId: [],
    vehicle_group_vehicle_id: "",
    imeiNumber: "",
    typeOfDevice: "",
    simCardNumber: "",
    simTelephonenumber: "",
    insuranceStartDate: new Date(),
    insuranceEndDate: new Date(),
    permitStartDate: new Date(),
    permitEndDate: new Date(),
    municipalityPermissionStartDate: new Date(),
    municipalityPermissionEndDate: new Date(),
    makeYear: new Date(),
    registration_certificate: "",
    pollution_certificate: "",
    insurance_copy: "",
    vehicle_image_path: "",
    ownername: "",
    pollutionStartDate: new Date(),
    pollutionEndDate: new Date(),
    // certificates: []
  });

  const [exitNew, setExitNew] = useState("Exisiting");
  const [passanger, setPassanger] = useState("Passenger");
  const [errMsg, setErrMsg] = useState({
    user_id: "",
    vehicle_id: "",
    vehicleNumber_Name: "",
    registrationNumber: "",
    vehicleCategory: "",
    vehicleCapacity: "",
    modelNameandNumber: "",
    chassisNumberorVINnumber: "",
    engineNumber: "",
    fuelType: "",
    odometerReading: "",
    driverId: "",
    vehicleGroupId: "",
    vehicle_group_vehicle_id: "",
    imeiNumber: "",
    typeOfDevice: "",
    simCardNumber: "",
    simTelephonenumber: "",
    insuranceStartDate: "",
    insuranceEndDate: "",
    pollutionStartDate: "",
    pollutionEndDate: "",
    permitEndDate: "",
    municipalityPermissionStartDate: "",
    municipalityPermissionEndDate: "",
    makeYear: "",
    sensorName: "",
    minimumTemperatureRunning: "",
    maximumTemperatureRunning: "",
    minimumTemperatureParked: "",
    maximumTemperatureParked: "",
    Geofance: "",
    vehicle_image_path: "",
    ownername: "",
  });
  const [groupVehicle, setGroupVehicle] = useState([]);
  const [featureDataList, setFeatureDataList] = useState([]);
  const [groupVehicleList, setGroupVehicleList] = useState([]);
  const [feulDataList, setfeulDataList] = useState([
    {
      title: "Petrol",
      id: 1,
    },
    {
      title: "Diesel",
      id: 2,
    },
    {
      title: "Oil",
      id: 3,
    },
    {
      title: "Gas",
      id: 4,
    },
    {
      title: "Electric",
      id: 5,
    },
  ]);
  const [driverDataList, setDriverDataList] = useState([]);
  const [categoryDataList, setCategoryDataList] = useState([]);
  // const [capcityDataList, setCapcityDataList] = useState(

  // );
  const capcityDataList = range(2, 61, 1);
  const yearDataList = range(1950, 2050, 1);
  const [deviceDataList, setDeviceDataList] = useState([]);
  const [deviceListData, setDeviceListData] = useState([]);
  const [featureSendData, setFeatureSendData] = useState({
    Tracking: true,
    "Over Speeding": true,
  });
  const [featureSendDataValue, setFeatureSendDataValue] = useState({});

  const automaticDataCategory = (data) => {
    let newData = categoryDataList.filter((ele) => ele.vehicle_type_id == data);
    setAddVehicleData({
      ...addVehicleData,
      vehicleCategory: newData[0].vehicle_type_id,
      vehicleCapacity: newData[0].vehicle_type_capacity
        ? newData[0].vehicle_type_capacity
        : 5,
    });
  };
  const [featureSelectedData, setFeatureSelectedData] = useState([
    {
      feature_id: 14,
      is_active: true,
      feature: "Tracking",
      is_default: true,
      activeImg:
        "/static/media/Tracking-ON.8f03e875839ff22da8602fe64cca484a.svg",
      inActiveImg:
        "/static/media/Tracking-Off.4e9734a7d1ff061bff8d0c4a093f368a.svg",
    },
    {
      feature_id: 8,
      is_active: true,
      feature: "Over Speeding",
      is_default: true,
      activeImg:
        "/static/media/Feature_Overspeed_active.8ef0abb6ee60ddad321a09ba69df4919.svg",
      inActiveImg:
        "/static/media/Feature_overspeed.24d8eeb0ce8c6cb158ae031007e6ea35.svg",
    },
  ]);
  const [featureSelectedDataFix, setFeatureSelectedDataFix] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const addVehicleDatacopy = { ...addVehicleData };
    addVehicleDatacopy[name] = value;
    setAddVehicleData(addVehicleDatacopy);
    const errMsgcopy = { ...errMsg };
    errMsgcopy[name] = "";
    setErrMsg(errMsgcopy);
  };
  const handleScreenTabNext = (e) => {
    if (screenTab === "Vehicle Information") {
      if (addVehicleData.vehicleNumber_Name.length === 0) {
        setErrMsg({
          ...errMsg,
          vehicleNumber_Name: "Enter vehicleNumber name",
        });
        return;
      }
      if (addVehicleData.registrationNumber.length === 0) {
        setErrMsg({
          ...errMsg,
          registrationNumber: "Enter registration Number ",
        });
        return;
      }
      if (addVehicleData.vehicleCategory.length === 0) {
        setErrMsg({
          ...errMsg,
          vehicleCategory: "Enter vehicleCategory  ",
        });
        return;
      }
      if (addVehicleData.vehicleCapacity.length === 0) {
        setErrMsg({
          ...errMsg,
          vehicleCapacity: "Enter vehicleCapacity  ",
        });
        return;
      }
      if (addVehicleData.driverId.length === 0) {
        setErrMsg({
          ...errMsg,
          driverId: "Enter driverId  ",
        });
        return;
      }

      if (addVehicleData.vehicleGroupId.length === 0) {
        setErrMsg({
          ...errMsg,
          vehicleGroupId: "select vehicle Group  ",
        });
        return;
      } else {
        setForm2(true);
        setScreenTab("Tracking Device");
      }
    }
    if (screenTab == "Tracking Device") {
      if (addVehicleData.imeiNumber.length === 0) {
        setErrMsg({
          ...errMsg,
          imeiNumber: "Enter imeiNumber  ",
        });
        return;
      }
      if (addVehicleData.typeOfDevice.length === 0) {
        setErrMsg({
          ...errMsg,
          typeOfDevice: "Enter typeOfDevice  ",
        });
        return;
      } else {
        setForm3(true);
        setScreenTab("Hardware Feature-Set");
      }
    }

    if (screenTab === "Hardware Feature-Set") {
      setForm4(true);
      setScreenTab("FeatureSetValue");
    }
    if (screenTab === "FeatureSetValue") {
      setForm6(true);
      setScreenTab("Validity Informations");
    }
    if (screenTab === "Validity Informations") {
      setForm5(true);
      setScreenTab("Vehicle Geo-fence");
    }
    if (screenTab === "Vehicle Geo-fence") {
      if (mapLatLngData.length === 0) {
        setErrMsgMap(
          " you can use below tools to  draw at least onegeofence. "
        );
        return;
      } else {
        apiAddVehicle(e);
      }
      setForm6(true);
    }
  };
  const handleScreenTabBack = () => {
    if (screenTab === "Vehicle Information") {
      setVehicleTabListActive("vehicle");
      localStorage.setItem("vehicleTabListActive", "vehicle");
      navigate("/Vehicle");
    }
    if (screenTab === "Tracking Device") {
      setForm2(false);
      setScreenTab("Vehicle Information");
    }
    if (screenTab === "Hardware Feature-Set") {
      setForm3(false);
      setScreenTab("Tracking Device");
    }
    if (screenTab === "FeatureSetValue") {
      setForm4(false);
      setScreenTab("Hardware Feature-Set");
    }
    if (screenTab === "Validity Informations") {
      setForm6(false);
      setScreenTab("FeatureSetValue");
    }
    if (screenTab === "Vehicle Geo-fence") {
      setForm5(false);
      setScreenTab("Validity Informations");
    }
  };
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event, section) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (section === "Vehicle Geo-fence") {
        apiAddVehicle(event);
      }
    }
    setValidated(true);
  };

  function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }

  const apiAddVehicle = (e) => {
    e.preventDefault();
    const keysToRemove = ["activeImg", "inActiveImg"];

    for (let i = 0; i < featureSelectedData.length; i++) {
      for (const key of keysToRemove) {
        delete featureSelectedData[i][key];
      }
    }

    let data = featureSelectedData.map((ele, index) => {
      return ele.feature_id === 1
        ? { ...ele, feature_set_value: JSON.stringify(temperatureData) }
        : ele.feature_id === 8
        ? { ...ele, feature_set_value: featurevalueSend }
        : ele;
    });

    let EditSendData;
    if (vehicleID) {
      EditSendData = featureSelectedData.map((obj1) => {
        const obj2 = featureSelectedDataFix.filter(
          (obj2) => obj2.feature_id === obj1.feature_id
        );

        return {
          ...obj1,
          vehicle_features_list_id: obj2[0]?.vehicle_features_list_id
            ? obj2[0].vehicle_features_list_id
            : false,
        };
      });
      EditSendData.map((ele, index) => {
        return ele.feature_id === 1
          ? { ...ele, feature_set_value: JSON.stringify(temperatureData) }
          : ele.feature_id === 8
          ? { ...ele, feature_set_value: featurevalueSend }
          : ele;
      });
    }

    let vehicleFormData = new FormData();
    vehicleFormData.append("user_id", addVehicleData.user_id);
    vehicleFormData.append(
      "featurelist",
      JSON.stringify(vehicleID ? EditSendData : data)
    );
    vehicleFormData.append("vehicle_id", addVehicleData.vehicle_id);
    vehicleFormData.append(
      "vehicleNumber_Name",
      addVehicleData.vehicleNumber_Name
    );
    vehicleFormData.append(
      "registrationNumber",
      addVehicleData.registrationNumber
    );
    vehicleFormData.append("vehicleCategory", addVehicleData.vehicleCategory);
    vehicleFormData.append("vehicleCapacity", addVehicleData.vehicleCapacity);
    vehicleFormData.append(
      "modelNameandNumber",
      addVehicleData.modelNameandNumber
    );
    vehicleFormData.append(
      "chassisNumberorVINnumber",
      addVehicleData.chassisNumberorVINnumber
    );
    vehicleFormData.append("engineNumber", addVehicleData.engineNumber);
    vehicleFormData.append("fuelType", addVehicleData.fuelType);
    vehicleFormData.append("odometerReading", addVehicleData.odometerReading);
    vehicleFormData.append("driverId", addVehicleData.driverId);
    vehicleFormData.append(
      "vehicleGroupId",
      JSON.stringify(addVehicleData.vehicleGroupId)
    );
    vehicleFormData.append(
      "vehicle_group_vehicle_id",
      addVehicleData.vehicle_group_vehicle_id
    );
    vehicleFormData.append("imeiNumber", addVehicleData.imeiNumber);
    vehicleFormData.append("typeOfDevice", addVehicleData.typeOfDevice);
    vehicleFormData.append("simCardNumber", addVehicleData.simCardNumber);
    vehicleFormData.append(
      "simTelephonenumber",
      addVehicleData.simTelephonenumber
    );
    vehicleFormData.append(
      "registration_certificate",
      addVehicleData.registration_certificate
    );
    vehicleFormData.append(
      "pollution_certificate",
      addVehicleData.pollution_certificate
    );
    vehicleFormData.append("insurance_copy", addVehicleData.insurance_copy);
    vehicleFormData.append(
      "vehicle_image_path",
      addVehicleData.vehicle_image_path
    );
    vehicleFormData.append("ownername", addVehicleData.ownername);

    vehicleFormData.append(
      "insuranceStartDate",
      typeof addVehicleData?.insuranceStartDate === "object"
        ? addVehicleData?.insuranceStartDate.toISOString().toString()
        : addVehicleData?.insuranceStartDate
    );
    vehicleFormData.append(
      "insuranceEndDate",
      typeof addVehicleData?.insuranceEndDate === "object"
        ? addVehicleData.insuranceEndDate.toISOString().toString()
        : addVehicleData.insuranceEndDate
    );
    vehicleFormData.append(
      "pollutionStartDate",
      typeof addVehicleData?.pollutionStartDate === "object"
        ? addVehicleData?.pollutionStartDate.toISOString().toString()
        : addVehicleData?.pollutionStartDate
    );
    vehicleFormData.append(
      "pollutionEndDate",
      typeof addVehicleData?.pollutionEndDate === "object"
        ? addVehicleData?.pollutionEndDate.toISOString().toString()
        : addVehicleData?.pollutionEndDate
    );
    vehicleFormData.append(
      "permitStartDate",
      typeof addVehicleData?.permitStartDate === "object"
        ? addVehicleData.permitStartDate.toISOString().toString()
        : addVehicleData?.permitStartDate
    );
    vehicleFormData.append(
      "permitEndDate",
      typeof addVehicleData?.permitEndDate === "object"
        ? addVehicleData.permitEndDate.toISOString().toString()
        : addVehicleData?.permitEndDate
    );
    vehicleFormData.append(
      "municipalityPermissionStartDate",
      typeof addVehicleData?.municipalityPermissionStartDate === "object"
        ? addVehicleData.municipalityPermissionStartDate
            .toISOString()
            .toString()
        : addVehicleData?.municipalityPermissionStartDate
    );
    vehicleFormData.append(
      "municipalityPermissionEndDate",
      typeof addVehicleData?.municipalityPermissionEndDate === "object"
        ? addVehicleData.municipalityPermissionEndDate.toISOString().toString()
        : addVehicleData?.municipalityPermissionEndDate
    );
    vehicleFormData.append(
      "makeYear",
      typeof addVehicleData?.makeYear === "object"
        ? addVehicleData.makeYear.toISOString().toString()
        : addVehicleData?.makeYear
    );

    vehicleFormData.append("address", place);
    vehicleFormData.append("vehicleID", vehicleID);
    vehicleFormData.append(
      "temperatureSensor",
      JSON.stringify(temperatureData)
    );
    vehicleFormData.append("drowradius", radius);
    vehicleFormData.append("drowtype", layerTypeSend);
    vehicleFormData.append("drowvalue", JSON.stringify(mapLatLngData));
    multipartPostCall(
      vehicleID ? ApiConfig.VEHICLE_UPDATE : ApiConfig.VEHICLE_ADD,
      vehicleFormData
    )
      .then((res) => {
        if (res.result === true) {
          setVehicleTabListActive("vehicle");
          localStorage.setItem("vehicleTabListActive", "vehicle");
          navigate("/Vehicle");
          setMapLatLngData([]);
          setLayerTypeSend("");
          setRadius("");
          notifySuccess(res.message);
        } else {
          notifyError(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };
  // draopdown list
  useEffect(() => {
    if (vehicleID) {
      getsingleListDetails();
    }
    getTransporatioData();
    getDeviceList();
    getDriverList();
    getGroupList();
    getCategoryList();
  }, []);

  const getsingleListDetails = () => {
    simpleGetCall(ApiConfig.VEHICLE_DETAILS_SINGLE + `?vehicle_id=${vehicleID}`)
      .then((res) => {
        if (res.result === true) {
          let data = res?.obj;
          setMapZoomValue(8);
          let selectedVehicleGroupIdsArr =
            res?.group &&
            res?.group.map((item) => {
              return item.vehicle_group_vehicle_group_id;
            });

          setFeaturevalueSend(res?.featureSelectValue["8"]);
          let dataUpdate = {
            vehicle_id: data.vehicle_id,
            vehicleNumber_Name: data.vehicleNumber_Name
              ? data.vehicleNumber_Name
              : "",
            registrationNumber: data.registrationNumber
              ? data.registrationNumber
              : "",
            vehicleCategory: res.catgory[0].vehicle_type_id
              ? res.catgory[0].vehicle_type_id
              : "",
            vehicleCapacity: data.vehicleCapacity ? data.vehicleCapacity : "",
            modelNameandNumber: data.modelNameandNumber
              ? data.modelNameandNumber
              : "",
            chassisNumberorVINnumber: data.chassisNumberorVINnumber
              ? data.chassisNumberorVINnumber
              : "",
            engineNumber: data.engineNumber ? data.engineNumber : "",
            fuelType: data.fuelType ? data.fuelType : "",
            odometerReading: data.odometerReading ? data.odometerReading : "",
            driverId: data.driverId ? data.driverId : "",
            vehicleGroupId: selectedVehicleGroupIdsArr
              ? selectedVehicleGroupIdsArr
              : [],
            vehicle_group_vehicle_id: data.vehicle_group_vehicle_id
              ? data.vehicle_group_vehicle_id
              : "",
            imeiNumber: data.imeiNumber ? data.imeiNumber : "",
            typeOfDevice: data.typeOfDevice ? data.typeOfDevice : "",
            simCardNumber: data.simCardNumberr ? data.simCardNumberr : "",
            simTelephonenumber: data.simTelephonenumber
              ? data.simTelephonenumber
              : "",
            insuranceStartDate: data.insuranceStartDatenew
              ? data.insuranceStartDatenew
              : new Date(),
            insuranceEndDate: data.insuranceEndDate
              ? data.insuranceEndDate
              : new Date(),
            permitStartDate: data.permitStartDatene
              ? data.permitStartDatenew
              : new Date(),
            permitEndDate: data.permitEndDate ? data.permitEndDate : new Date(),
            pollutionStartDate: data.pollutionStartDate
              ? data.pollutionStartDate
              : new Date(),
            pollutionEndDate: data.pollutionEndDate
              ? data.pollutionEndDate
              : new Date(),
            municipalityPermissionStartDate:
              data.municipalityPermissionStartDate
                ? data.municipalityPermissionStartDate
                : new Date(),
            municipalityPermissionEndDate: data.municipalityPermissionEndDate
              ? data.municipalityPermissionEndDate
              : new Date(),
            makeYear: data.makeYear ? data.makeYear : new Date(),
            registration_certificate: data?.registration_certificate,
            pollution_certificate: data?.pollution_certificate,
            insurance_copy: data?.insurance_copy,
            vehicle_image_path: data?.vehicle_image_path,
          };
          getFeatureList(data?.typeOfDevice);
          setAddVehicleData(dataUpdate);
          setGroupVehicle(res?.group ? res?.group : []);
          setFeatureSendData(res?.featureSelect ? res?.featureSelect : {});
          let speedDefault = res.feature?.filter((ele) => ele.feature_id == 8);
          let TempDefault = res.feature?.filter((ele) => ele.feature_id == 1);
          setValueFeatureIdSpeed(speedDefault[0].is_active);
          setValueFeatureIdTemp(TempDefault[0].is_active);
          setValueFeatureIdNew(8);
          setValueFeatureId(1);

          setFeatureSendDataValue(
            res?.featureSelectValue ? res?.featureSelectValue : {}
          );

          setFeatureSelectedData(res?.feature ? res?.feature : []);
          setFeatureSelectedDataFix(res?.feature ? res?.feature : []);

          setTemperatureData(res.sensors);

          setMapLatLngData(
            res.geofence.drowvalue ? res.geofence.drowvalue : []
          );
          if (res.geofence.type == "circle") {
            if (!res.geofence.drowvalue.includes(null)) {
              setPositionCercle(
                res.geofence.drowvalue ? res.geofence.drowvalue : []
              );
              setLayerTypeSend(res.geofence.type);
            }
            setPostionRadius(
              Number(res.geofence?.radius) ? Number(res.geofence?.radius) : ""
            );
            setRadius(
              Number(res.geofence?.radius) ? Number(res.geofence?.radius) : ""
            );
            setMapLatLngData(
              res.geofence.drowvalue ? res.geofence.drowvalue : []
            );
          }

          if (res.geofence.type === "polygon") {
            if (!res.geofence.drowvalue.includes(null)) {
              setLayerTypeSend(res.geofence.type);
              setPostionPolygon(res.geofence.drowvalue);
              setMapLatLngData(
                res.geofence.drowvalue ? res.geofence.drowvalue : []
              );
            }
          }
          if (res.geofence.type === "rectangle") {
            if (!res.geofence.drowvalue.includes(null)) {
              setLayerTypeSend(res.geofence.type);
              setPositionRectangle(res.geofence.drowvalue);
              setMapLatLngData(
                res.geofence.drowvalue ? res.geofence.drowvalue : []
              );
            }
          }
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  const getDeviceList = () => {
    simplePostCall(
      ApiConfig.VEHICLE_DROWPDOWN,
      JSON.stringify({
        key: "TypeOfDevice",
      })
    )
      .then((res) => {
        if (res.result === true) {
          setDeviceDataList(res?.data);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };
  const getDriverList = () => {
    simplePostCall(
      ApiConfig.VEHICLE_DROWPDOWN,
      JSON.stringify({
        key: "DriversList",
      })
    )
      .then((res) => {
        setDriverDataList(res.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };
  const getGroupList = () => {
    simplePostCall(
      ApiConfig.VEHICLE_DROWPDOWN,
      JSON.stringify({
        key: "VehicleGroup",
      })
    )
      .then((res) => {
        setGroupVehicleList(res?.data ? res.data : []);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };
  const getCategoryList = () => {
    simplePostCall(
      ApiConfig.VEHICLE_DROWPDOWN,
      JSON.stringify({
        key: "VehicleCategory",
      })
    )
      .then((res) => {
        setCategoryDataList(res?.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  const getFeatureList = (id) => {
    simplePostCall(
      ApiConfig.VEHICLE_FEATURE_LIST_BUY,
      JSON.stringify({
        hardware_id: id,
      })
    )
      .then((res) => {
        if (res.result === true) {
          let newData = res.buyFeaturelist;
          const mergedArray = newData?.map((obj1) => {
            const matchingObj = featureDataListNew.find(
              (obj2) => obj2.feature === obj1.feature
            );
            return { ...obj1, ...matchingObj };
          });
          setFeatureDataList(mergedArray);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };
  //   useEffect(() => {

  //  }, [])
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
        <div
          className="main-master-wrapper addvhical-main custom_height_Form_full"
          id="Add-vehicle"
        >
          <div className="add-vehicle-form-wrapper">
            <div className="addvhical-heading">
              <p>
                {vehicleID ? `${t("Edit Vehicle")}` : `${t("Add Vehicle")}`}
              </p>
            </div>
            <div className="stepperauto">
              <div className="AddVehicle-steper">
                <div className="single-step active">
                  <p>{t("Vehicle Information")}</p>
                  <img src={Gcheck} alt="" />
                </div>
                {form2 == true ||
                form3 == true ||
                form4 == true ||
                form6 == true ||
                form5 == true ? (
                  <div className="single-step active">
                    <p>{t("Tracking Device")}</p>
                    <img src={Gcheck} alt="" />
                  </div>
                ) : (
                  <div className="single-step">
                    <p>{t("Tracking Device")}</p>
                    <img src={Rcheck} alt="" />
                  </div>
                )}
                {form3 == true ||
                form4 == true ||
                form5 == true ||
                form6 == true ? (
                  <div className="single-step active">
                    <p>{t("Hardware Feature-Set")}</p>
                    <img src={Gcheck} alt="" />
                  </div>
                ) : (
                  <div className="single-step">
                    <p>{t("Hardware Feature-Set")}</p>
                    <img src={Rcheck} alt="" />
                  </div>
                )}
                {((valueFeatureIdNew === 8 && valueFeatureIdSpped) ||
                  (valueFeatureId === 1 && valueFeatureIdTemp)) &&
                  (form4 == true || form6 == true ? (
                    <div className="single-step active">
                      <p>{t("Feature set value")}</p>
                      <img src={Gcheck} alt="" />
                    </div>
                  ) : (
                    <div className="single-step">
                      <p>{t("Feature set Value")}</p>
                      <img src={Rcheck} alt="" />
                    </div>
                  ))}
                {form6 == true || form5 == true ? (
                  <div className="single-step active">
                    <p>{t("Validity Informations")}</p>
                    <img src={Gcheck} alt="" />
                  </div>
                ) : (
                  <div className="single-step">
                    <p>{t("Validity Informations")}</p>
                    <img src={Rcheck} alt="" />
                  </div>
                )}
                {form5 == true ? (
                  <div className="single-step last-step active">
                    <p>{t("Vehicle Geo-fence")}</p>
                    <img src={Gcheck} alt="" />
                  </div>
                ) : (
                  <div className="single-step">
                    <p>{t("Vehicle Geo-fence")}</p>
                    <img src={Rcheck} alt="" />
                  </div>
                )}
              </div>
            </div>
            <div className="main-form-section">
              <Form
                noValidate
                validated={validated}
                onSubmit={(e) => handleSubmit(e, screenTab)}
              >
                {screenTab == "Vehicle Information" && (
                  <div className="information-card innerInputsGen row mt-4 mb-0">
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Vehicle Image")}
                      </Form.Label>
                      <Form.Control
                        // required
                        type="file"
                        placeholder="Browse"
                        name="vehicle_image_path"
                        onChange={(e) => {
                          setAddVehicleData({
                            ...addVehicleData,
                            vehicle_image_path: e.target.files[0],
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Select Registration certificate.
                      </Form.Control.Feedback>
                      {addVehicleData?.vehicle_image_path && (
                        <img
                          style={{
                            width: "50px",
                            height: "70px",
                            marginTop: "5px",
                            objectFit: "contain",
                          }}
                          src={
                            typeof addVehicleData?.vehicle_image_path ===
                            "string"
                              ? `${ApiConfig.BASE_URL}${addVehicleData?.vehicle_image_path}`
                              : addVehicleData?.vehicle_image_path &&
                                URL.createObjectURL(
                                  addVehicleData?.vehicle_image_path
                                )
                          }
                          alt="Not img found"
                        />
                      )}
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Owner Name")}
                        {/* <span>&#42;</span> */}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter owner name..."
                        name="ownername"
                        value={addVehicleData?.ownername}
                        onChange={handleChange}
                      />
                      {errMsg?.ownername.length > 0 && (
                        <span className="text-danger">{errMsg?.ownername}</span>
                      )}
                      <Form.Control.Feedback type="invalid">
                        Please Enter owner name.
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Vehicle Number/Name")} <span>&#42;</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Vehicle Name/Number..."
                        name="vehicleNumber_Name"
                        value={addVehicleData.vehicleNumber_Name}
                        onChange={handleChange}
                      />
                      {errMsg.vehicleNumber_Name.length > 0 && (
                        <span className="text-danger">
                          {errMsg.vehicleNumber_Name}
                        </span>
                      )}
                      <Form.Control.Feedback type="invalid">
                        Please Enter Vehicle Number/Name.
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Registration Number")} <span>&#42;</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Registration Number..."
                        name="registrationNumber"
                        value={addVehicleData.registrationNumber}
                        onChange={handleChange}
                      />
                      {errMsg.registrationNumber.length > 0 && (
                        <span className="text-danger">
                          {errMsg.registrationNumber}
                        </span>
                      )}
                      <Form.Control.Feedback type="invalid">
                        Please Enter Registration Number.
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="d-flex justify-content-between flex-wrap">
                        <Form.Label className="common-labels label-with-radio custom-label-title form_input_main me-0">
                          <p>
                            {t("Vehicle Category")} <span>&#42;</span>
                          </p>
                        </Form.Label>

                        <div id="customRadios">
                          <div class="form-check greenFlex me-2">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault2"
                              id="Exisiting"
                              checked={exitNew === "Exisiting" ? true : false}
                              onChange={(e) => {
                                setExitNew("Exisiting");
                                setAddVehicleData({
                                  ...addVehicleData,
                                  vehicleCategory: "",
                                });
                              }}
                            />
                            <label
                              class="form-check-label custLabel"
                              for="Exisiting"
                            >
                              {t("Exisiting")}
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
                                setAddVehicleData({
                                  ...addVehicleData,
                                  vehicleCategory: "",
                                });
                              }}
                            />
                            <label class="form-check-label custLabel" for="New">
                              {t("New")}
                            </label>
                          </div>
                        </div>
                      </div>
                      {exitNew === "Exisiting" && (
                        <select
                          required
                          className="form-select"
                          aria-label="Default select example"
                          placeholder="Select Vehicle Capacity..."
                          name="vehicleCategory"
                          value={addVehicleData?.vehicleCategory}
                          // onChange={handleChange}
                          onChange={(e) => {
                            setErrMsg({
                              ...errMsg,
                              vehicleCategory: "",
                            });
                            automaticDataCategory(e.target.value);
                            // setAddVehicleData({
                            //   ...addVehicleData,
                            //   vehicleCategory: Number(e.target.value)
                            // })
                          }}
                        >
                          <option selected value="">
                            Select Vehicle Category...
                          </option>
                          {categoryDataList && categoryDataList?.length > 0
                            ? categoryDataList?.map((item, index) => {
                                return (
                                  <option
                                    key={"vehicleCategory" + index}
                                    value={item?.vehicle_type_id}
                                  >
                                    {item.vehicle_type_code}
                                  </option>
                                );
                              })
                            : "no data available"}
                        </select>
                      )}

                      {exitNew === "New" && (
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter vehicleCategory..."
                          name="vehicleCategory"
                          value={addVehicleData.vehicleCategory}
                          onChange={handleChange}
                        />
                      )}
                      {errMsg.vehicleCategory.length > 0 && (
                        <span className="text-danger">
                          {errMsg.vehicleCategory}
                        </span>
                      )}
                    </div>

                    <div className="col-md-6 form_input_main">
                      <div className="">
                        <div className="d-flex justify-content-between flex-wrap">
                          <Form.Label className="common-labels label-with-radio custom-label-title me-0">
                            <p>
                              {t("Vehicle Capacity")} <span>&#42;</span>
                            </p>
                          </Form.Label>
                          <div id="customRadios">
                            <div class="form-check greenFlex me-2">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefault1"
                                id="Goods"
                                checked={passanger == "Goods" ? true : false}
                                onChange={(e) => {
                                  setPassanger("Goods");
                                  setAddVehicleData({
                                    ...addVehicleData,
                                    vehicleCapacity: "",
                                  });
                                }}
                              />
                              <label
                                class="form-check-label custLabel"
                                for="Goods"
                              >
                                Goods
                              </label>
                            </div>
                            <div class="form-check  greenFlex">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefault1"
                                id="Passenger"
                                checked={
                                  passanger === "Passenger" ? true : false
                                }
                                onChange={(e) => {
                                  setPassanger("Passenger");
                                  setAddVehicleData({
                                    ...addVehicleData,
                                    vehicleCapacity: "",
                                  });
                                }}
                              />
                              <label
                                class="form-check-label custLabel"
                                for="Passenger"
                              >
                                {t("Passenger")}
                              </label>
                            </div>
                          </div>
                        </div>
                        {passanger == "Passenger" && (
                          <select
                            required
                            className="form-select"
                            aria-label="Default select example"
                            placeholder="Select Vehicle Capacity..."
                            name="vehicleCapacity"
                            value={addVehicleData?.vehicleCapacity}
                            onChange={handleChange}
                          >
                            <option value="">Select Vehicle Capacity...</option>

                            {capcityDataList && capcityDataList?.length > 0
                              ? capcityDataList.map((item, index) => {
                                  return (
                                    <option
                                      key={"capacity" + index}
                                      value={item}
                                    >
                                      {item}
                                    </option>
                                  );
                                })
                              : "no data available"}
                          </select>
                        )}
                        {passanger == "Goods" && (
                          <Form.Control
                            required
                            type="number"
                            placeholder="Enter vehicleCapacity..."
                            name="vehicleCapacity"
                            value={addVehicleData.vehicleCapacity}
                            onChange={handleChange}
                          />
                        )}
                      </div>
                      {errMsg.vehicleCapacity.length > 0 && (
                        <span className="text-danger">
                          {errMsg.vehicleCapacity}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Model Name & Number")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Model Name & Number..."
                        name="modelNameandNumber"
                        value={addVehicleData.modelNameandNumber}
                        onChange={handleChange}
                      />
                      {errMsg.modelNameandNumber.length > 0 && (
                        <span className="text-danger">
                          {errMsg.vehicleCapacity}
                        </span>
                      )}
                      <Form.Control.Feedback type="invalid">
                        Please Enter Registration Number.
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Make Year")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        {/* <CommonDatePicker
                          dateKey="makeYear"
                          setDate={setAddVehicleData}
                          data={addVehicleData}
                        /> */}

                        {
                          <select
                            required
                            className="form-select"
                            aria-label="Default select example"
                            placeholder="Select year"
                            name="makeYear"
                            value={addVehicleData?.makeYear}
                            onChange={handleChange}
                          >
                            <option value="">Select Vehicle Capacity...</option>

                            {capcityDataList && capcityDataList?.length > 0
                              ? capcityDataList.map((item, index) => {
                                  return (
                                    <option
                                      key={"makeYear" + index}
                                      value={item}
                                    >
                                      {item}
                                    </option>
                                  );
                                })
                              : "no data available"}
                          </select>
                        }

                        {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                      </div>
                      <Form.Control.Feedback type="invalid">
                        Please Enter Registration Number.
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Chassis Number or VIN number")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Number or VIN number ..."
                        name="chassisNumberorVINnumber"
                        value={addVehicleData.chassisNumberorVINnumber}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Registration Number.
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Engine Number")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Engine Number ..."
                        name="engineNumber"
                        value={addVehicleData.engineNumber}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Registration Number.
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Registration Certificate")}
                      </Form.Label>
                      <Form.Control
                        // required
                        type="file"
                        placeholder="Browse"
                        name="registration_certificate"
                        onChange={(e) => {
                          setAddVehicleData({
                            ...addVehicleData,
                            registration_certificate: e.target.files[0],
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Select Registration certificate.
                      </Form.Control.Feedback>
                      {addVehicleData?.registration_certificate && (
                        <img
                          style={{
                            width: "50px",
                            height: "70px",
                            marginTop: "5px",
                            objectFit: "contain",
                          }}
                          src={
                            typeof addVehicleData?.registration_certificate ===
                            "string"
                              ? `${ApiConfig.BASE_URL}${addVehicleData?.registration_certificate}`
                              : addVehicleData?.registration_certificate &&
                                URL.createObjectURL(
                                  addVehicleData?.registration_certificate
                                )
                          }
                          alt="Not img found"
                        />
                      )}
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Insurance Copy")}
                      </Form.Label>
                      <Form.Control
                        // required
                        type="file"
                        placeholder="Browse"
                        name="insurance_copy"
                        onChange={(e) => {
                          setAddVehicleData({
                            ...addVehicleData,
                            insurance_copy: e.target.files[0],
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select insurance copy.
                      </Form.Control.Feedback>
                      {addVehicleData?.insurance_copy && (
                        <img
                          style={{
                            width: "50px",
                            height: "70px",
                            marginTop: "5px",
                            objectFit: "contain",
                          }}
                          src={
                            typeof addVehicleData?.insurance_copy === "string"
                              ? `${ApiConfig.BASE_URL}${addVehicleData?.insurance_copy}`
                              : addVehicleData?.insurance_copy &&
                                URL.createObjectURL(
                                  addVehicleData?.insurance_copy
                                )
                          }
                          alt="Not img found"
                        />
                      )}
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Pollution Certificate")}
                      </Form.Label>
                      <Form.Control
                        // required
                        type="file"
                        placeholder="Browse"
                        name="pollution_certificate"
                        onChange={(e) => {
                          setAddVehicleData({
                            ...addVehicleData,
                            pollution_certificate: e.target.files[0],
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter pollution certificate.
                      </Form.Control.Feedback>
                      {addVehicleData?.pollution_certificate && (
                        <img
                          style={{
                            width: "50px",
                            height: "70px",
                            marginTop: "5px",
                            objectFit: "contain",
                          }}
                          src={
                            typeof addVehicleData?.pollution_certificate ===
                            "string"
                              ? `${ApiConfig.BASE_URL}${addVehicleData?.pollution_certificate}`
                              : addVehicleData?.pollution_certificate &&
                                URL.createObjectURL(
                                  addVehicleData?.pollution_certificate
                                )
                          }
                          alt="Not img found"
                        />
                      )}
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox ">
                        <Form.Label className="common-labels custom-label-title me-0">
                          <p>{t("Fuel Type")}</p>
                        </Form.Label>
                        <select
                          required
                          className="form-select"
                          aria-label="Default select example"
                          placeholder="Select Fuel Type..."
                          name="fuelType"
                          value={addVehicleData.fuelType}
                          onChange={handleChange}
                        >
                          <option value="">Select Fuel Type...</option>
                          {feulDataList && feulDataList?.length > 0
                            ? feulDataList?.map((item, index) => {
                                return (
                                  <option
                                    key={"feaul" + index}
                                    value={item.title}
                                  >
                                    {item.title}
                                  </option>
                                );
                              })
                            : "no data available"}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Odometer Reading Cart")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Enter Odometer Reading ..."
                        name="odometerReading"
                        value={addVehicleData.odometerReading}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Registration Number.
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox ">
                        <Form.Label className="common-labels custom-label-title me-0">
                          <p>{t("Driver")}</p>
                        </Form.Label>
                        <select
                          required
                          className="form-select"
                          aria-label="Default select example"
                          placeholder="Select Driver..."
                          name="driverId"
                          value={addVehicleData.driverId}
                          onChange={handleChange}
                        >
                          <option value="">Select Driver...</option>
                          {driverDataList && driverDataList.length > 0
                            ? driverDataList?.map((item, index) => {
                                return (
                                  <option
                                    key={"driver" + index}
                                    value={Number(item?.user_id)}
                                  >
                                    {item?.user_name}
                                  </option>
                                );
                              })
                            : "no data  available"}
                        </select>
                        {errMsg.driverId.length > 0 && (
                          <span className="text-danger">{errMsg.driverId}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <Form.Label className="common-labels custom-label-title me-0">
                        <p>{t("Vehicle Group")}</p>
                      </Form.Label>
                      <div className="dropdown-wrapper w-100">
                        <div className="multi-select-1 w-100">
                          <Multiselect
                            className="multi-select-main"
                            name="vehicleGroupId"
                            displayValue="vehicle_group_name"
                            onKeyPressFn={function noRefCheck() {}}
                            onRemove={(vehicleGroup) => {
                              let selectedVehicleGroupIdsArr =
                                vehicleGroup &&
                                vehicleGroup.map((item) => {
                                  return item.vehicle_group_id;
                                });
                              setAddVehicleData({
                                ...addVehicleData,
                                vehicleGroupId: selectedVehicleGroupIdsArr,
                              });
                              setGroupVehicle(vehicleGroup);
                            }}
                            onSearch={function noRefCheck() {}}
                            onSelect={(vehicleGroup) => {
                              let selectedVehicleGroupIdsArr =
                                vehicleGroup &&
                                vehicleGroup.map((item) => {
                                  return item.vehicle_group_id;
                                });
                              setAddVehicleData({
                                ...addVehicleData,
                                vehicleGroupId: selectedVehicleGroupIdsArr,
                              });
                              setErrMsg({
                                ...errMsg,
                                vehicleGroupId: "",
                              });
                              setGroupVehicle(vehicleGroup);
                            }}
                            selectedValues={groupVehicle}
                            options={groupVehicleList}
                            showCheckbox
                            placeholder="Select Vehicle Group ..."
                            style={{
                              chips: {
                                background: "#8f4300",
                                "border-radius": "20px",
                              },
                              input: {
                                "&::checked": {
                                  color: "#8f4300",
                                },
                              },
                              searchBox: {},
                            }}
                          />
                          {errMsg.vehicleGroupId.length > 0 && (
                            <span className="text-danger">
                              {errMsg.vehicleGroupId}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {screenTab === "Tracking Device" && (
                  <div className="information-card innerInputsGen row mt-4 mb-0">
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels custom-label-title">
                        <p>
                          {t("IMEI Number")} <span>&#42;</span>
                        </p>
                      </Form.Label>
                      <Form.Control
                        required
                        type="number "
                        placeholder="Enter IMEI Number..."
                        name="imeiNumber"
                        value={
                          addVehicleData.imeiNumber
                            ? addVehicleData.imeiNumber
                            : ""
                        }
                        onChange={handleChange}
                        maxLength={15}
                        minLength={25}
                      />
                      {errMsg.imeiNumber.length > 0 && (
                        <span className="text-danger">{errMsg.imeiNumber}</span>
                      )}
                      <Form.Control.Feedback type="invalid">
                        Please Enter IMEI Number .
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox ">
                        <Form.Label className="common-labels custom-label-title me-0">
                          <p>
                            {t("Type of Device")} <span>&#42;</span>
                          </p>
                        </Form.Label>
                        <select
                          required
                          className="form-select"
                          aria-label="Default select example"
                          placeholder="Select Type of Device ..."
                          name="typeOfDevice"
                          value={
                            addVehicleData?.typeOfDevice
                              ? addVehicleData?.typeOfDevice
                              : ""
                          }
                          onChange={(e) => {
                            getFeatureList(e.target.value);
                            handleChange(e);
                          }}
                        >
                          <option value="">Select Type of Device</option>
                          {deviceDataList && deviceDataList?.length > 0
                            ? deviceDataList.map((item, index) => {
                                return (
                                  <option
                                    key={"test" + index}
                                    value={item.hardware_id}
                                  >
                                    {item.hardware_name}
                                  </option>
                                );
                              })
                            : "no data aviable"}
                        </select>
                        {errMsg.typeOfDevice.length > 0 && (
                          <span className="text-danger">
                            {errMsg.typeOfDevice}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Sim Card Number")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Enter Sim card Number..."
                        name="simCardNumber"
                        value={
                          addVehicleData?.simCardNumber
                            ? addVehicleData?.simCardNumber
                            : ""
                        }
                        onChange={handleChange}
                        maxLength={15}
                        minLength={10}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Sim card Number.
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Sim Telephone Number")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="type"
                        placeholder="Enter Sim Telephone Number ..."
                        name="simTelephonenumber"
                        value={
                          addVehicleData?.simTelephonenumber
                            ? addVehicleData?.simTelephonenumber
                            : ""
                        }
                        onChange={handleChange}
                        maxLength={12}
                        minLength={7}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Sim telephone Number.
                      </Form.Control.Feedback>
                    </div>
                  </div>
                )}

                {screenTab === "Hardware Feature-Set" && (
                  <>
                    {/* Feature Hardware set from 1576 till 11282 */}
                    <div id="fetureset_main">
                      <div className="inner_tabs_For_FeatureSet">
                        <Tab.Container
                          id="left-tabs-example"
                          className="Inner_tab_featureSet"
                          defaultActiveKey="0"
                        >
                          <Col sm={12} className="">
                            <Tab.Content>
                              <Tab.Pane eventKey="0">
                                <div className="all-vehicle-main featureSet_card_main">
                                  <div className="yauto" id="arrange-paading">
                                    <div className="row main-cards-wrapper gx-3">
                                      {featureDataList &&
                                      featureDataList.length > 0 ? (
                                        featureDataList.map((ele, i) => {
                                          return (
                                            <div
                                              className={
                                                sidebar
                                                  ? "col-xl-4 col-lg-6 col-md-6"
                                                  : "col-xl-3 col-lg-4 col-md-6"
                                              }
                                              id="fetureset_single_card"
                                            >
                                              <div
                                                className={
                                                  "common-vehical-card-inner"
                                                }
                                              >
                                                <div className="vehical-card-head add_harware_feature">
                                                  <div className="heading">
                                                    {featureSendData[
                                                      ele.feature
                                                    ] === true ? (
                                                      <img
                                                        src={ele.activeImg}
                                                        alt="NO IMAGE"
                                                      />
                                                    ) : (
                                                      <img
                                                        src={ele.inActiveImg}
                                                        alt=""
                                                      />
                                                    )}
                                                    <div className="">
                                                      {/* <p className="sub-heading">
                                                  Vehicle Number
                                                </p> */}
                                                      <p className="title">
                                                        {ele.feature}
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <div
                                                    className="form-check form-switch"
                                                    id="custom_switch"
                                                  >
                                                    <div className="d-flex innerFlexTog">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={ele.sendKey}
                                                        disabled={
                                                          ele.feature_id == 14
                                                            ? true
                                                            : ele.feature_id ==
                                                              8
                                                            ? true
                                                            : false
                                                        }
                                                        checked={
                                                          featureSendData[
                                                            ele.feature
                                                          ] === true
                                                            ? true
                                                            : false
                                                        }
                                                        onChange={(e) => {
                                                          let titleKey =
                                                            ele.feature.trim();
                                                          setFeatureSendData({
                                                            ...featureSendData,
                                                            [titleKey]: e.target
                                                              .checked
                                                              ? true
                                                              : false,
                                                          });
                                                          let objectData = ele;
                                                          if (
                                                            e.target.checked
                                                          ) {
                                                            if (
                                                              ele.feature_id ===
                                                              1
                                                            ) {
                                                              setValueFeatureIdTemp(
                                                                true
                                                              );
                                                              setValueFeatureId(
                                                                1
                                                              );
                                                              // setShow(true)
                                                            }
                                                            if (
                                                              ele.feature_id ===
                                                              8
                                                            ) {
                                                              // setShow1(true)
                                                              setValueFeatureIdSpeed(
                                                                true
                                                              );
                                                              setValueFeatureIdNew(
                                                                8
                                                              );
                                                            }

                                                            let filterData1 =
                                                              featureSelectedData &&
                                                              featureSelectedData.filter(
                                                                (item) =>
                                                                  item.feature_id !==
                                                                  ele.feature_id
                                                              );

                                                            setFeatureSelectedData(
                                                              [
                                                                ...filterData1,
                                                                {
                                                                  ...ele,
                                                                  is_active:
                                                                    e.target
                                                                      .checked,
                                                                },
                                                              ]
                                                            );
                                                          } else {
                                                            if (
                                                              ele.feature_id ===
                                                              1
                                                            ) {
                                                              setValueFeatureIdTemp(
                                                                false
                                                              );

                                                              setValueFeatureId(
                                                                1
                                                              );
                                                            }
                                                            if (
                                                              ele.feature_id ===
                                                              8
                                                            ) {
                                                              // setShow1(false)
                                                              setValueFeatureIdSpeed(
                                                                false
                                                              );
                                                              setValueFeatureIdNew(
                                                                8
                                                              );
                                                            }
                                                            let filterData =
                                                              featureSelectedData &&
                                                              featureSelectedData.filter(
                                                                (item) =>
                                                                  item.feature_id !==
                                                                  ele.feature_id
                                                              );
                                                            setFeatureSelectedData(
                                                              [
                                                                ...filterData,
                                                                {
                                                                  ...ele,
                                                                  is_active: false,
                                                                },
                                                              ]
                                                            );
                                                          }
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                                {/* {(ele.feature_id === 8 || ele.feature_id === 1) && 
                                              <div className="d-flex justify-content-end">

                                                <button type="button" className="custom_btn_link" onClick={() => { ele.feature_id === 1 ? setShow(true) : setShow1(true) }}> Set Value</button>
                                              </div>} */}

                                                {/* {
                                                (ele.feature_id === 8) && (  (valueFeatureIdNew === 8 && valueFeatureIdSpped) &&

                                              <div className="form_input_main">

                                                  <Form.Control

                                                    type="text"
                                                    // disabled={featureSendData[ele.feature] === true ? false : true}
                                                    placeholder="enter over Speed value "
                                                    value={featurevalueSend}
                                     onChange={(e)=>{
                                      setFeaturevalueSend(e.target.value)
                                     }}

                                                  />


                                                </div>)

                                              } */}
                                                {/* { (ele.feature_id === 1) &&((valueFeatureId === 1 && valueFeatureIdTemp) &&

                                                 <div className="form_input_main">

                                                  <Form.Control

                                                    type="number"
                                                    // disabled={featureSendData[ele.feature] === true ? false : true}
                                                    placeholder={`maximum tempurature running`}
                                                    value={temperatureData.maximumTemperatureRunning}
                                                      onChange={(e) => {
                                                         setTemperatureData({
                                                        ...temperatureData,
                                                       
                                                        maximumTemperatureRunning: e.target.value
                                                      })

                                                    }
                                                    }
                                                    maxLength={5}

                                                  />
                                                  <Form.Control

                                                    type="number"
                                                    // disabled={featureSendData[ele.feature] === true ? false : true}
                                                    placeholder={`minimum tempertaure runnning`}
                                                    value={temperatureData.minimumTemperatureRunning}
                                                    onChange={(e) => {
                                                       setTemperatureData({
                                                       
                                                      ...temperatureData,
                                                      minimumTemperatureRunning: e.target.value
                                                    })

                                                  }
                                                  }
                                                  maxLength={5}

                                                  />
                                                  <Form.Control

                                                    type="number"
                                                    // disabled={featureSendData[ele.feature] === true ? false : true}
                                                    placeholder={`maximum tempertaure parked`}
                                                    value={temperatureData.maximumTemperatureParked}
                                                    onChange={(e) => {
                                                       setTemperatureData({
                                                      ...temperatureData,
                                                     
                                                      maximumTemperatureParked: e.target.value
                                                    })

                                                  }
                                                  }
                                                  maxLength={5}

                                                  />
                                                  <Form.Control

                                                    type="number"
                                                    // disabled={featureSendData[ele.feature] === true ? false : true}
                                                    placeholder={`minimum tempertaure parked`}
                                                 
                                                    value={temperatureData.minimumTemperatureParked}
                                                    onChange={(e) => {
                                                       setTemperatureData({
                                                      ...temperatureData,
                                                     
                                                      minimumTemperatureParked: e.target.value
                                                    })

                                                  }
                                                  }
                                                  maxLength={5}

                                                  />


                                                </div>)

                                              } */}
                                              </div>
                                            </div>
                                          );
                                        })
                                      ) : (
                                        <div className="d-flex justify-content-center text-danger">
                                          No feature set Available for selected
                                          device{" "}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          </Col>
                        </Tab.Container>
                      </div>
                    </div>
                  </>
                )}

                {screenTab == "FeatureSetValue" && (
                  <div className="information-card innerInputsGen row mt-4 mb-0">
                    {valueFeatureId === 1 && valueFeatureIdTemp && (
                      <>
                        {temperatureData.map((outerItem, index) => {
                          return (
                            <div className="addNew-main">
                              <div className="addnew-head">
                                <p>
                                  {t("Temperature Sensor")} {index + 1}
                                </p>
                                {index + 1 > 1 ? (
                                  <img
                                    src={Close}
                                    alt=""
                                    onClick={() => {
                                      if (temperatureData.length > 1) {
                                        const copySubDeatails = [
                                          ...temperatureData,
                                        ];
                                        copySubDeatails.splice(index, 1);
                                        setTemperatureData(copySubDeatails);
                                      }
                                    }}
                                    className="c-pointer"
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="addNew-body row">
                                <div className="col-md-6 form_input_main">
                                  <Form.Label className="common-labels custom-label-title">
                                    <p>{t("Sensor Name")}</p>
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Sensor Name"
                                    value={outerItem?.sensorName}
                                    onChange={(e) => {
                                      setTemperatureData(
                                        temperatureData.map(
                                          (item, innerIndex) => {
                                            return innerIndex == index
                                              ? {
                                                  ...item,
                                                  sensorName: e.target.value,
                                                }
                                              : item;
                                          }
                                        )
                                      );
                                    }}
                                  />
                                </div>
                                <div className="col-md-6 form_input_main demo-section"></div>
                                <div className="col-md-6 form_input_main">
                                  <Form.Label className="common-labels custom-label-title">
                                    <p>
                                      {t(
                                        "Minimum Temperature Threshold on Vehicle Running"
                                      )}
                                    </p>
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    placeholder="Enter Minimum Temperature Threshold on Vehicle Running"
                                    value={outerItem?.minimumTemperatureRunning}
                                    onChange={(e) => {
                                      setTemperatureData(
                                        temperatureData.map(
                                          (item, innerIndex) => {
                                            return innerIndex == index
                                              ? {
                                                  ...item,
                                                  minimumTemperatureRunning:
                                                    e.target.value,
                                                }
                                              : item;
                                          }
                                        )
                                      );
                                    }}
                                  />
                                </div>
                                <div className="col-md-6 form_input_main">
                                  <Form.Label className="common-labels custom-label-title">
                                    <p>
                                      {t(
                                        "Maximum Temperature Threshold on Vehicle Running"
                                      )}
                                    </p>
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    placeholder="Enter Maximum Temperature Threshold on Vehicle Running"
                                    value={outerItem?.maximumTemperatureRunning}
                                    onChange={(e) => {
                                      setTemperatureData(
                                        temperatureData.map(
                                          (item, innerIndex) => {
                                            return innerIndex == index
                                              ? {
                                                  ...item,
                                                  maximumTemperatureRunning:
                                                    e.target.value,
                                                }
                                              : item;
                                          }
                                        )
                                      );
                                    }}
                                  />
                                </div>
                                <div className="col-md-6 form_input_main">
                                  <Form.Label className="common-labels custom-label-title">
                                    <p>
                                      {t(
                                        "Minimum Temperature Threshold on Vehicle Parked"
                                      )}
                                    </p>
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    placeholder="Enter Minimum Temperature Threshold on Vehicle Parked"
                                    value={outerItem?.minimumTemperatureParked}
                                    onChange={(e) => {
                                      setTemperatureData(
                                        temperatureData.map(
                                          (item, innerIndex) => {
                                            return innerIndex == index
                                              ? {
                                                  ...item,
                                                  minimumTemperatureParked:
                                                    e.target.value,
                                                }
                                              : item;
                                          }
                                        )
                                      );
                                    }}
                                  />
                                </div>
                                <div className="col-md-6 form_input_main">
                                  <Form.Label className="common-labels custom-label-title">
                                    <p>
                                      {t(
                                        "Maximum Temperature Threshold on Vehicle Parked"
                                      )}
                                    </p>
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    placeholder="Enter Maximum Temperature Threshold on Vehicle Parked"
                                    value={outerItem?.maximumTemperatureParked}
                                    onChange={(e) => {
                                      setTemperatureData(
                                        temperatureData.map(
                                          (item, innerIndex) => {
                                            return innerIndex == index
                                              ? {
                                                  ...item,
                                                  maximumTemperatureParked:
                                                    e.target.value,
                                                }
                                              : item;
                                          }
                                        )
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div className="add_btn_wrapper">
                          <button
                            className={
                              temperatureData.length > 3
                                ? "cx-btn-2 bordernone mb-3 d-none"
                                : "cx-btn-2 bordernone mb-3"
                            }
                            // disabled={temperatureData.length>3?true:false}
                            // onClick={() => projectList()}
                            onClick={() => {
                              let data = {
                                sensorName: "",
                                minimumTemperatureRunning: "",
                                maximumTemperatureRunning: "",
                                minimumTemperatureParked: "",
                                maximumTemperatureParked: "",
                              };
                              setTemperatureData([...temperatureData, data]);
                            }}
                          >
                            + {t("Add New")}
                          </button>
                        </div>
                      </>
                    )}

                    {/* <div className="col-md-6">
                      <div className="form_input_main">
                        <Form.Label className="common-labels">
                          Temperature Sensors
                        </Form.Label>
                        <Form.Control
                          className="mb-2"
                          type="number"
                          // disabled={featureSendData[ele.feature] === true ? false : true}
                          placeholder={`Maximum tempurature running`}
                          value={temperatureData.maximumTemperatureRunning}
                          onChange={(e) => {
                            setTemperatureData({
                              ...temperatureData,

                              maximumTemperatureRunning: e.target.value
                            })

                          }
                          }
                          maxLength={5}

                        />
                        <Form.Control
                          className="mb-2"
                          type="number"
                          // disabled={featureSendData[ele.feature] === true ? false : true}
                          placeholder={`Minimum tempertaure runnning`}
                          value={temperatureData.minimumTemperatureRunning}
                          onChange={(e) => {
                            setTemperatureData({

                              ...temperatureData,
                              minimumTemperatureRunning: e.target.value
                            })

                          }
                          }
                          maxLength={5}

                        />
                        <Form.Control
                          className="mb-2"
                          type="number"
                          // disabled={featureSendData[ele.feature] === true ? false : true}
                          placeholder={`Maximum tempertaure parked`}
                          value={temperatureData.maximumTemperatureParked}
                          onChange={(e) => {
                            setTemperatureData({
                              ...temperatureData,

                              maximumTemperatureParked: e.target.value
                            })

                          }
                          }
                          maxLength={5}

                        />
                        <Form.Control
                          className="mb-2"
                          type="number"
                          // disabled={featureSendData[ele.feature] === true ? false : true}
                          placeholder={`Minimum tempertaure parked`}

                          value={temperatureData.minimumTemperatureParked}
                          onChange={(e) => {
                            setTemperatureData({
                              ...temperatureData,

                              minimumTemperatureParked: e.target.value
                            })

                          }
                          }
                          maxLength={5}

                        />


                      </div>
                    </div> */}
                    {valueFeatureIdNew === 8 && valueFeatureIdSpped && (
                      <div className="addNew-main">
                        <div className="col-md-6">
                          <div className="form_input_main">
                            <Form.Label className="common-labels">
                              Over Speed
                            </Form.Label>
                            <Form.Control
                              type="number"
                              // disabled={featureSendData[ele.feature] === true ? false : true}
                              placeholder="Enter over speed value "
                              value={featurevalueSend}
                              onChange={(e) => {
                                setFeaturevalueSend(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* <div className="col-md-6 form_input_main">
    <Form.Label className="common-labels">
      {t("Insurance Start Date")}
    </Form.Label>
    <div className="innerSelectBox weekCounter datepicker-main">
      <CommonDatePicker
        dateKey={"insuranceStartDate"}
        setDate={setAddVehicleData}
        data={addVehicleData}
      />

      <img src={Calendar} className="calendarLogo" alt="" />
    </div>
  </div>
  <div className="col-md-6 form_input_main">
    <Form.Label className="common-labels">
      {t("Insurance End Date")}
    </Form.Label>
    <div className="innerSelectBox weekCounter datepicker-main">
      <CommonDatePicker
        dateKey={"insuranceEndDate"}
        setDate={setAddVehicleData}
        data={addVehicleData}
      />

      <img src={Calendar} className="calendarLogo" alt="" />
    </div>
  </div>
  <div className="col-md-6 form_input_main">
    <Form.Label className="common-labels">
      {t("Permit Start Date")}
    </Form.Label>
    <div className="innerSelectBox weekCounter datepicker-main">
      <CommonDatePicker
        dateKey={"permitStartDate"}
        setDate={setAddVehicleData}
        data={addVehicleData}
      />

      <img src={Calendar} className="calendarLogo" alt="" />
    </div>
  </div>
  <div className="col-md-6 form_input_main">
    <Form.Label className="common-labels">
      {t("Permit End Date")}
    </Form.Label>
    <div className="innerSelectBox weekCounter datepicker-main">
      <CommonDatePicker
        dateKey={"permitEndDate"}
        setDate={setAddVehicleData}
        data={addVehicleData}
      />

      <img src={Calendar} className="calendarLogo" alt="" />
    </div>
  </div>
  <div className="col-md-6 form_input_main">
    <Form.Label className="common-labels">
      {t("Municipality Permission Start Date")}
    </Form.Label>
    <div className="innerSelectBox weekCounter datepicker-main">
      <CommonDatePicker
        dateKey={"municipalityPermissionStartDate"}
        setDate={setAddVehicleData}
        data={addVehicleData}
      />

      <img src={Calendar} className="calendarLogo" alt="" />
    </div>
  </div>
  <div className="col-md-6 form_input_main">
    <Form.Label className="common-labels">
      {t("Municipality Permission End Date")}
    </Form.Label>
    <div className="innerSelectBox weekCounter datepicker-main">
      <CommonDatePicker
        dateKey={"municipalityPermissionEndDate"}
        setDate={setAddVehicleData}
        data={addVehicleData}
      />

      <img src={Calendar} className="calendarLogo" alt="" />
    </div>
  </div> */}
                  </div>
                )}
                {screenTab == "Validity Informations" && (
                  <div className="information-card innerInputsGen row mt-4 mb-0">
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Insurance Start Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          dateKey={"insuranceStartDate"}
                          setDate={setAddVehicleData}
                          data={addVehicleData}
                        />

                        <img src={Calendar} className="calendarLogo" alt="" />
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Insurance End Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          dateKey={"insuranceEndDate"}
                          setDate={setAddVehicleData}
                          data={addVehicleData}
                        />

                        <img src={Calendar} className="calendarLogo" alt="" />
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Permit Start Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          dateKey={"permitStartDate"}
                          setDate={setAddVehicleData}
                          data={addVehicleData}
                        />

                        <img src={Calendar} className="calendarLogo" alt="" />
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Permit End Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          dateKey={"permitEndDate"}
                          setDate={setAddVehicleData}
                          data={addVehicleData}
                        />

                        <img src={Calendar} className="calendarLogo" alt="" />
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Municipality Permission Start Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          dateKey={"municipalityPermissionStartDate"}
                          setDate={setAddVehicleData}
                          data={addVehicleData}
                        />

                        <img src={Calendar} className="calendarLogo" alt="" />
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Municipality Permission End Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          dateKey={"municipalityPermissionEndDate"}
                          setDate={setAddVehicleData}
                          data={addVehicleData}
                        />

                        <img src={Calendar} className="calendarLogo" alt="" />
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("pollutionStartDate End Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          dateKey={"pollutionStartDate"}
                          setDate={setAddVehicleData}
                          data={addVehicleData}
                        />

                        <img src={Calendar} className="calendarLogo" alt="" />
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("pollutionEndDate End Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          dateKey={"pollutionEndDate"}
                          setDate={setAddVehicleData}
                          data={addVehicleData}
                        />

                        <img src={Calendar} className="calendarLogo" alt="" />
                      </div>
                    </div>
                  </div>
                )}

                {screenTab == "Vehicle Geo-fence" && (
                  <>
                    <div className="addnew-map">
                      <div className="map-head">
                        <p>
                          If you want to set geofence for vehicle separately,
                          you can use below tools to draw geofence.
                        </p>
                      </div>
                      <div className="road-map addParkingMap">
                        {errMsgMap.length > 0 && (
                          <span className="text-danger">{errMsgMap}</span>
                        )}
                        <MapComponent componentId={"addVehicle"} />
                        <div className="belowContent">
                          {/* <div className="notific">
                <img src={blue_box} alt="" className="" />
                <label>{t("Geofence")}</label>
              </div>
              <div className="notific">
                <img src={idle} alt="" />
                <label>{t("Icon")}</label>
              </div> */}
                        </div>
                      </div>
                      <div className="notific">
                        <img src={green_box} alt="" />
                        <label>{t("Transportation Coverage Area")}</label>
                      </div>
                    </div>
                  </>
                )}

                <div className="btn-common btn-wrapper">
                  <button
                    type="button"
                    onClick={handleScreenTabBack}
                    className={"cx-btn-1"}
                  >
                    {/* {form1 === true ? " back" : "Back"} */}
                    {screenTab == "Vehicle Information"
                      ? t("Cancel")
                      : t("Back ")}
                  </button>
                  <button
                    className="cx-btn-2"
                    // type="button"
                    type={form6 === true ? "button" : "button"}
                    onClick={(e) => handleScreenTabNext(e)}
                  >
                    {form5 === true
                      ? vehicleID
                        ? `${t("Update")}`
                        : `${t("Submit")}`
                      : `${t("Next")}`}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>

        <Modal
          show={show1}
          onHide={handleClose1}
          centered
          className="common-model"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("Vehicle Over Speed")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form_input_main">
              <Form.Control
                type="text"
                // disabled={featureSendData[ele.feature] === true ? false : true}
                placeholder="enter over Speed value "
                value={featurevalueSend}
                onChange={(e) => {
                  setFeaturevalueSend(e.target.value);
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="pop-up-modal-footer btn-wrapper">
            <button className="cx-btn-1" onClick={handleClose1}>
              {t("Close")}
            </button>
            <button className="cx-btn-2" onClick={handleClose1}>
              {t("Yes")}
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={show}
          onHide={handleClose}
          centered
          className="common-model"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("TEMPERATURE Senosor ")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form_input_main">
              <Form.Control
                className="mb-2"
                type="number"
                // disabled={featureSendData[ele.feature] === true ? false : true}
                placeholder={`maximum tempurature running`}
                value={temperatureData.maximumTemperatureRunning}
                onChange={(e) => {
                  setTemperatureData({
                    ...temperatureData,

                    maximumTemperatureRunning: e.target.value,
                  });
                }}
                maxLength={5}
              />
              <Form.Control
                className="mb-2"
                type="number"
                // disabled={featureSendData[ele.feature] === true ? false : true}
                placeholder={`minimum tempertaure runnning`}
                value={temperatureData.minimumTemperatureRunning}
                onChange={(e) => {
                  setTemperatureData({
                    ...temperatureData,
                    minimumTemperatureRunning: e.target.value,
                  });
                }}
                maxLength={5}
              />
              <Form.Control
                className="mb-2"
                type="number"
                // disabled={featureSendData[ele.feature] === true ? false : true}
                placeholder={`maximum tempertaure parked`}
                value={temperatureData.maximumTemperatureParked}
                onChange={(e) => {
                  setTemperatureData({
                    ...temperatureData,

                    maximumTemperatureParked: e.target.value,
                  });
                }}
                maxLength={5}
              />
              <Form.Control
                className="mb-2"
                type="number"
                // disabled={featureSendData[ele.feature] === true ? false : true}
                placeholder={`minimum tempertaure parked`}
                value={temperatureData.minimumTemperatureParked}
                onChange={(e) => {
                  setTemperatureData({
                    ...temperatureData,

                    minimumTemperatureParked: e.target.value,
                  });
                }}
                maxLength={5}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="pop-up-modal-footer btn-wrapper">
            <button className="cx-btn-1" onClick={handleClose}>
              {t("Close")}
            </button>
            <button className="cx-btn-2" onClick={handleClose}>
              {t("Yes")}
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </motion.div>
  );
};

export default AddVehicle;

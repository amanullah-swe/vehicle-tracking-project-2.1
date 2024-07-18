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
import { DateDDMMYYYY, latestDate } from "../../sharedComponent/common";
import moment from "moment";
import { Select, Space } from "antd";
import { useSelector } from "react-redux";
const { Option } = Select;
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
  {
    feature_id: 16,
    feature: "LV CAN",
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
    setTriggerMapBoundKeyRandom,
    customerData,
  } = useContext(AppContext);
  const [btnDesable, setBtnDesable] = useState(false);
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
  const accessRights = useSelector((state) => state.auth.accessRights);
  const [temperatureData, setTemperatureData] = useState([
    {
      sensorName: "",
      minimumTemperatureRunning: "",
      maximumTemperatureRunning: "",
      minimumTemperatureParked: "",
      maximumTemperatureParked: "",
    },
  ]);
  const addonSettingData = useSelector((state) => state.auth.addonModule);
  // const [addonSettingData, setaddonSettingData] = useState(1); 

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
    vehicle_assistant_id: "",
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
    insuranceStartDate: "",
    insuranceEndDate: "",
    permitStartDate: "",
    permitEndDate: "",
    municipalityPermissionStartDate: "",
    municipalityPermissionEndDate: "",
    makeYear: "",
    registration_certificate: "",
    pollution_certificate: "",
    insurance_copy: "",
    vehicle_image_path: "",
    ownername: "",
    pollutionStartDate: "",
    pollutionEndDate: "",
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
  const [vehicleAssistantList, setVehicleAssistantList] = useState([]);
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
    let newData = categoryDataList?.filter(
      (ele) => ele.vehicle_type_id == data
    );
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
  const years = range(1950, 2100, 1);
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
          vehicleNumber_Name: t("Please Enter Vehicle Number"),
        });
        return;
      }
      if (addVehicleData.registrationNumber.length === 0) {
        setErrMsg({
          ...errMsg,
          registrationNumber: t("Please Enter Registration Number"),
        });
        return;
      }

      if (addVehicleData.vehicleCategory.length === 0) {
        setErrMsg({
          ...errMsg,
          vehicleCategory: t("please Enter vehicle Type"),
        });
        return;
      }
      if (addVehicleData.vehicleCapacity.length === 0) {
        setErrMsg({
          ...errMsg,
          vehicleCapacity: t("Please Enter Vehicle Capacity"),
        });
        return;
      } else {
        setForm2(true);
        setScreenTab("Tracking Device");
      addonSettingData.addon_ghatke === 1 &&  setForm5(true);
      }
    }
    if (screenTab == "Tracking Device") {
      if (addVehicleData.imeiNumber?.length === 0) {
        setErrMsg({
          ...errMsg,
          imeiNumber: t("Please Enter IMEI Number"),
        });
        return;
      }
      if (addVehicleData?.typeOfDevice.length === 0) {
        setErrMsg({
          ...errMsg,
          typeOfDevice: t("Please Enter Device"),
        });
        return;
      } else if (addonSettingData.addon_ghatke  !== 1){
       /*  addonSettingData.addon_ghatke  != 1 && */ 
        setForm3(true);
        setScreenTab("Hardware Feature-Set");

//  setForm6(true);
//       setScreenTab("Validity Informations");

      }
    }

    if (screenTab === "Hardware Feature-Set") {
      setForm4(true);
      setScreenTab("FeatureSetValue");
    }
    if (screenTab === "FeatureSetValue") {
      if (valueFeatureId === 1 && valueFeatureIdTemp) {
        if (temperatureData[0]?.sensorName.length === 0) {
          setErrMsg({
            ...errMsg,
            sensorName: "Please Enter sensor Name  ",
          });
          return;
        }
        if (temperatureData[0]?.minimumTemperatureRunning.length === 0) {
          setErrMsg({
            ...errMsg,
            minimumTemperatureRunning:
              "Please Enter Minimum Running Tempertaure ",
          });
          return;
        }
        if (temperatureData[0]?.maximumTemperatureRunning.length === 0) {
          setErrMsg({
            ...errMsg,
            maximumTemperatureRunning:
              "Please Enter Maximum Running Tempertaure",
          });
          return;
        }
        if (temperatureData[0]?.minimumTemperatureParked.length === 0) {
          setErrMsg({
            ...errMsg,
            minimumTemperatureParked: "Please Enter minimum Parked Tempertaure",
          });
          return;
        }
        if (temperatureData[0]?.maximumTemperatureParked.length === 0) {
          setErrMsg({
            ...errMsg,
            maximumTemperatureParked: "Please Enter Maximum Parked Tempertaure",
          });
          return;
        }
      }
      setForm6(true);
      setScreenTab("Validity Informations");
    }


    // if (screenTab === "Tracking Device" /* "Validity Informations" */  ) 
    // {
    //   setForm5(true);
    //   apiAddVehicle(e);
    //   setForm6(true);
    //   // getTransporatioData()
    //   // setScreenTab("Vehicle Geo-fence");
    // }
   
    if (addonSettingData.addon_ghatke === 1) {
      if (screenTab === "Tracking Device") {
        setForm5(true);
        apiAddVehicle(e);
        setForm6(true);
      }
    } 
    if(addonSettingData.addon_ghatke !== 1){
      if (screenTab === "Tracking Device") {
        setForm3(true);
        setScreenTab("Hardware Feature-Set");
    }
  }
if(addonSettingData.addon_ghatke !== 1) {
  if (screenTab === "Validity Informations") {
    setForm5(true);
    // getTransporatioData()
    setScreenTab("Vehicle Geo-fence");
  } }
   
   
if(addonSettingData.addon_ghatke !== 1){
  if (screenTab === "Vehicle Geo-fence") {
    apiAddVehicle(e);
    setForm6(true);
}
}

  
  };
  

  const handleSumbmit = (e) => {
    if (addVehicleData.vehicleNumber_Name.length === 0) {
      setErrMsg({
        ...errMsg,
        vehicleNumber_Name: t("Please Enter Vehicle Number"),
      });
      return;
    }
    if (addVehicleData.registrationNumber.length === 0) {
      setErrMsg({
        ...errMsg,
        registrationNumber: t("Please Enter Registration Number"),
      });
      return;
    }
    if (addVehicleData.vehicleCategory.length === 0) {
      setErrMsg({
        ...errMsg,
        vehicleCategory: t("please Enter vehicle Type"),
      });
      return;
    }
    if (addVehicleData.vehicleCapacity.length === 0) {
      setErrMsg({
        ...errMsg,
        vehicleCapacity: t("Please Enter Vehicle Capacity"),
      });
      return;
    }

    if (addVehicleData.imeiNumber?.length === 0) {
      setErrMsg({
        ...errMsg,
        imeiNumber: t("Please Enter IMEI Number"),
      });
      return;
    }
    if (addVehicleData?.typeOfDevice.length === 0) {
      setErrMsg({
        ...errMsg,
        typeOfDevice: t("Please Enter Device"),
      });
      return;
    }
if(addonSettingData.addon_ghatke !== 1) {
    apiAddVehicle(e);
}
  };
  const handleScreenTabBack = () => {
    if (screenTab === "Vehicle Information") {
      setVehicleTabListActive("vehicle");
      localStorage.setItem("vehicleTabListActive", "vehicle");
      navigate("/Vehicle");
    }
    if(addonSettingData.addon_ghatke === 1) {
    if (screenTab === "Tracking Device") {
      setForm2(false);
      setForm5(false)
      setForm6(false)
      setScreenTab("Vehicle Information");
    }
  } else if(screenTab === "Tracking Device") {
    setForm2(false);
    setScreenTab("Vehicle Information");
  }
  if(addonSettingData.addon_ghatke !== 1) {
    if (screenTab === "Hardware Feature-Set") {
      setForm3(false);
      setScreenTab("Tracking Device");
    } }
   if(addonSettingData.addon_ghatke !== 1) {
    if (screenTab === "FeatureSetValue") {
      setForm4(false);
      setScreenTab("Hardware Feature-Set");
    } }
    if(addonSettingData.addon_ghatke !== 1) {
    if (screenTab === "Validity Informations") {
      setForm6(false);
      // setScreenTab("FeatureSetValue");
      setScreenTab("FeatureSetValue");
    } }
    if(addonSettingData.addon_ghatke !== 1){
    if (screenTab === "Vehicle Geo-fence") {
      setForm5(false);
      setScreenTab("Validity Informations");
    } }
  };
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event, section) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (addonSettingData.addon_ghatke !== 1 ){
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
    setBtnDesable(true);
    const keysToRemove = ["activeImg", "inActiveImg"];
    let updatedData;
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

      updatedData = EditSendData?.map((ele, index) => {
        return ele.feature_id === 1
          ? { ...ele, feature_set_value: JSON.stringify(temperatureData) }
          : ele.feature_id === 8
          ? { ...ele, feature_set_value: featurevalueSend }
          : ele;
      });
    }

    let vehicleFormData = new FormData();
    vehicleFormData.append("vehicle_mode", passanger);
    vehicleFormData.append("user_id", addVehicleData.user_id);
    vehicleFormData.append(
      "vehicle_assistant_id",
      addVehicleData?.vehicle_assistant_id
    );
    vehicleFormData.append(
      "featurelist",
      JSON.stringify(vehicleID ? updatedData : data)
    );
    vehicleFormData.append("vehicle_id", addVehicleData?.vehicle_id);
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
      addVehicleData?.modelNameandNumber
        ? addVehicleData?.modelNameandNumber
        : 0
    );
    vehicleFormData.append(
      "chassisNumberorVINnumber",
      addVehicleData.chassisNumberorVINnumber
        ? addVehicleData.chassisNumberorVINnumber
        : 0
    );
    vehicleFormData.append(
      "engineNumber",
      addVehicleData?.engineNumber ? addVehicleData?.engineNumber : 0
    );
    vehicleFormData.append("fuelType", addVehicleData.fuelType);
    vehicleFormData.append(
      "odometerReading",
      addVehicleData.odometerReading ? addVehicleData.odometerReading : 0
    );
    vehicleFormData.append("driverId", addVehicleData.driverId);
    vehicleFormData.append(
      "vehicleGroupId",
      JSON.stringify(addVehicleData.vehicleGroupId)
    );
    vehicleFormData.append(
      "vehicle_group_vehicle_id",
      addVehicleData.vehicle_group_vehicle_id
    );
    vehicleFormData.append("imeiNumber", addVehicleData?.imeiNumber);
    vehicleFormData.append("typeOfDevice", addVehicleData?.typeOfDevice);
    vehicleFormData.append("simCardNumber", addVehicleData?.simCardNumber);
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
      addVehicleData?.insuranceStartDate
        ? latestDate(addVehicleData?.insuranceStartDate, "yyyy-MM-dd")
        : addVehicleData?.insuranceStartDate
    );
    vehicleFormData.append(
      "insuranceEndDate",
      addVehicleData?.insuranceEndDate
        ? latestDate(addVehicleData?.insuranceEndDate, "yyyy-MM-dd")
        : addVehicleData?.insuranceEndDate
    );
    vehicleFormData.append(
      "pollutionStartDate",
      addVehicleData?.pollutionStartDate
        ? latestDate(addVehicleData?.pollutionStartDate, "yyyy-MM-dd")
        : addVehicleData?.pollutionStartDate
    );
    vehicleFormData.append(
      "pollutionEndDate",
      addVehicleData?.pollutionEndDate
        ? latestDate(addVehicleData?.pollutionEndDate, "yyyy-MM-dd")
        : addVehicleData?.pollutionStartDate
    );
    vehicleFormData.append(
      "permitStartDate",
      addVehicleData?.permitStartDate
        ? latestDate(addVehicleData?.permitStartDate, "yyyy-MM-dd")
        : addVehicleData?.permitStartDate
    );
    vehicleFormData.append(
      "permitEndDate",
      addVehicleData?.permitEndDate
        ? latestDate(addVehicleData?.permitEndDate, "yyyy-MM-dd")
        : addVehicleData?.permitEndDate
    );
    vehicleFormData.append(
      "municipalityPermissionStartDate",
      addVehicleData?.municipalityPermissionStartDate
        ? latestDate(
            addVehicleData?.municipalityPermissionStartDate,
            "yyyy-MM-dd"
          )
        : addVehicleData?.municipalityPermissionStartDate
    );
    vehicleFormData.append(
      "municipalityPermissionEndDate",
      addVehicleData?.municipalityPermissionEndDate
        ? latestDate(
            addVehicleData?.municipalityPermissionEndDate,
            "yyyy-MM-dd"
          )
        : addVehicleData?.municipalityPermissionEndDate
    );
    vehicleFormData.append("makeYear", addVehicleData?.makeYear);

    vehicleFormData.append("address", place);
    vehicleFormData.append("vehicleID", vehicleID);
    vehicleFormData.append("vehicle_id", vehicleID);
    vehicleFormData.append(
      "temperatureSensor",
      JSON.stringify(temperatureData)
    );
    vehicleFormData.append("drowradius", radius ? radius : "");
    vehicleFormData.append("drowtype", layerTypeSend);
    vehicleFormData.append("drowvalue", JSON.stringify(mapLatLngData));
    multipartPostCall(
      vehicleID ? ApiConfig.VEHICLE_UPDATE : ApiConfig.VEHICLE_ADD,
      vehicleFormData
    )
      .then((res) => {
        setBtnDesable(false);
        if (res.result === true) {
          setVehicleTabListActive("vehicle");
          localStorage.setItem("vehicleTabListActive", "vehicle");
          navigate("/Vehicle");
          notifySuccess(res?.message);
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
    getAssistantList();
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

          setFeaturevalueSend(
            res?.featureSelectValue[8] ? res?.featureSelectValue[8] : 80
          );
          let categoryupdated = res.catgory?.[0]
            ? res.catgory[0].vehicle_type_id
            : "";
          let dataUpdate = {
            vehicle_assistant_id: data?.vehicle_assistant_id,
            vehicle_id: data?.vehicle_id,
            vehicleNumber_Name: data?.vehicleNumber_Name
              ? data.vehicleNumber_Name
              : "",
            registrationNumber: data.registrationNumber
              ? data.registrationNumber
              : "",
            vehicleCategory: categoryupdated,
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
            insuranceStartDate: data.insuranceStartDate
              ? data.insuranceStartDate
              : "",
            insuranceEndDate: data?.insuranceEndDate
              ? data?.insuranceEndDate
              : "",
            permitStartDate: data?.permitStartDate ? data?.permitStartDate : "",
            permitEndDate: data.permitEndDate ? data.permitEndDate : "",
            pollutionStartDate: data.pollutionStartDate
              ? data.pollutionStartDate
              : "",
            pollutionEndDate: data.pollutionEndDate
              ? data.pollutionEndDate
              : "",
            municipalityPermissionStartDate:
              data.municipalityPermissionStartDate
                ? data.municipalityPermissionStartDate
                : "",
            municipalityPermissionEndDate: data.municipalityPermissionEndDate
              ? data.municipalityPermissionEndDate
              : "",
            makeYear: data.makeYear ? data.makeYear : "",
            registration_certificate: data?.registration_certificate,
            pollution_certificate: data?.pollution_certificate,
            insurance_copy: data?.insurance_copy,
            vehicle_image_path: data?.vehicle_image_path,
          };
          setAddVehicleData(dataUpdate);
          setPassanger(data?.vehicle_mode ? data?.vehicle_mode : "Goods");
          // setLayerTypeSend(res.geofence.type);
          // setMapLatLngData(
          //   res.geofence.drowvalue ? res.geofence?.drowvalue : []
          // );

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

          if (res.geofence.type == "polygon") {
            if (!res.geofence.drowvalue.includes(null)) {
              setLayerTypeSend(res.geofence.type);
              setPostionPolygon(res.geofence.drowvalue);
              setMapLatLngData(
                res.geofence.drowvalue ? res.geofence.drowvalue : []
              );
            }
          }
          if (res.geofence.type == "rectangle") {
            if (!res.geofence.drowvalue.includes(null)) {
              setLayerTypeSend(res.geofence.type);
              setPositionRectangle(res.geofence.drowvalue);
              setMapLatLngData(
                res.geofence.drowvalue ? res.geofence.drowvalue : []
              );
            }

            setTriggerMapBoundKeyRandom(Math.floor(Math.random() * 10000000));
          }

          getFeatureList(data?.typeOfDevice);

          setGroupVehicle(res?.group ? res?.group : []);
          setFeatureSendData(res?.featureSelect ? res?.featureSelect : {});
          let speedDefault = res.feature?.filter((ele) => ele.feature_id == 8);
          let TempDefault = res.feature?.filter((ele) => ele.feature_id == 1);
          setValueFeatureIdSpeed(speedDefault[0]?.is_active);
          setValueFeatureIdTemp(TempDefault[0]?.is_active);
          setValueFeatureIdNew(8);
          setValueFeatureId(1);
          setFeatureSendDataValue(
            res?.featureSelectValue ? res?.featureSelectValue : {}
          );
          setFeatureSelectedData(res?.feature ? res?.feature : []);
          setFeatureSelectedDataFix(res?.feature ? res?.feature : []);
          setTemperatureData(res.sensors);
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
  const getAssistantList = () => {
    simplePostCall(
      ApiConfig.VEHICLE_DROWPDOWN,
      JSON.stringify({
        key: "assistantList",
      })
    )
      .then((res) => {
        setVehicleAssistantList(res.data);
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
          // setFeatureSelectedData(res?.feature ? res?.feature : []);
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
          <div
            className="add-vehicle-form-wrapper"
            id="scroll_insideThe_Padding83"
          >
            <div className="addvhical-heading">
              <p>
                {vehicleID ? `${t("Edit Vehicle")}` : `${t("Add Vehicle")}`}
              </p>
            </div>
            <div className="stepperauto">
              <div className="AddVehicle-steper">
                <div className="single-step active">
                  {sidebar ? (
                    <p className="smallTxt">{t("Vehicle Information")}</p>
                  ) : (
                    <p>{t("Vehicle Information")}</p>
                  )}
                  {sidebar ? (
                    <img className= {addonSettingData.addon_ghatke ===1 ? "img_with_two_steps_sidebar_on" : "smallImg" }src={Gcheck} alt="" />
                  ) : (
                    <img  className={addonSettingData.addon_ghatke === 1 ? "img_with_two_steps" : ""} src={Gcheck} alt="" style={{width: "" }} />
                  )}
                </div>
             
                {form2 == true ||
                form3 == true ||
                form4 == true ||
                form6 == true ||
                form5 == true ? (
                  <div className="single-step active">
                    {sidebar ? (
                      <p className="smallTxt">{t("Tracking Device")}</p>
                    ) : (
                      <p>{t("Tracking Device")}</p>
                    )}
                    {sidebar ? (
                      <img className={addonSettingData.addon_ghatke === 1 ? "img_with_two_steps_sidebar_on" : "smallImg"} src={Gcheck} alt="" />
                    ) : (
                      <img className={addonSettingData.addon_ghatke === 1 ? "img_with_two_steps" : ""} src={Gcheck} alt="" /* style={{width: "5%" }} */ />
                    )}
                  </div>
                ) : (
                  <div className="single-step">
                    {sidebar ? (
                      <p className="smallTxt">{t("Tracking Device")}</p>
                    ) : (
                      <p>{t("Tracking Device")}</p>
                    )}
                    {sidebar ? (
                      <img className={addonSettingData.addon_ghatke === 1 ? "img_with_two_steps_sidebar_on" : "smallImg"} src={Rcheck} alt="" />
                    ) : (
                      <img className={addonSettingData.addon_ghatke === 1 ? "img_with_two_steps" : ""} src={Rcheck} alt="" /* style={{width: "5%" }} */ />
                    )}
                  </div>
                )}   
                
                { addonSettingData.addon_ghatke === 1 ? <></> :
                                 accessRights.rights_manage_hardware_feature_set ||
                  accessRights?.rights_view_hardware_feature_set ? (
                    <>
                {form3 == true ||
                form4 == true ||
                form5 == true ||
                form6 == true ? (
                  <div className="single-step active">
                    {sidebar ? (
                      <p className="smallTxt">{t("Hardware Feature-Sets")}</p>
                    ) : (
                      <p>{t("Hardware Feature-Set")}</p>
                    )}
                    {sidebar ? (
                      <img className="smallImg" src={Gcheck} alt="" />
                    ) : (
                      <img src={Gcheck} alt="" />
                    )}
                  </div>
                ) : (
                  <div className="single-step">
                    {sidebar ? (
                      <p className="smallTxt">{t("Hardware Feature-Set")}</p>
                    ) : (
                      <p>{t("Hardware Feature-Set")}</p>
                    )}
                    {sidebar ? (
                      <img className="smallImg" src={Rcheck} alt="" />
                    ) : (
                      <img src={Rcheck} alt="" />
                    )}
                  </div>
                )}
            

                 {((valueFeatureIdNew === 8 && valueFeatureIdSpped) ||
                  (valueFeatureId === 1 && valueFeatureIdTemp)) &&
                  (form4 == true || form6 == true ? (
                    <div className="single-step active">
                      {sidebar ? (
                        <p className="smallTxt">{t("Feature set value")}</p>
                      ) : (
                        <p>{t("Feature set value")}</p>
                      )}
                      {sidebar ? (
                        <img className="smallImg" src={Gcheck} alt="" />
                      ) : (
                        <img src={Gcheck} alt="" />
                      )}
                    </div>
                  ) : (
                    <div className="single-step">
                      {sidebar ? (
                        <p className="smallTxt">{t("Feature set value")}</p>
                      ) : (
                        <p>{t("Feature set value")}</p>
                      )}
                      {sidebar ? (
                        <img className="smallImg" src={Rcheck} alt="" />
                      ) : (
                        <img src={Rcheck} alt="" />
                      )}
                    </div>
                  ))} 
                   </> 
                 ) : null 
                } 
                      

                { addonSettingData.addon_ghatke !== 1 &&
                 
                  <>
              {form6 == true || form5 == true ? 
              
              (
                <div className="single-step active">
                  {sidebar ? (
                    <p className="smallTxt">{t("Validity Informations")}</p>
                  ) : (
                    <p>{t("Validity Informations")}</p>
                  )}
                  {sidebar ? (
                    <img className="smallImg" src={Gcheck} alt="" />
                  ) : (
                    <img src={Gcheck} alt="" />
                  )}
                </div>
              ) 
              :
               (
                <div className="single-step">
                  {sidebar ? (
                    <p className="smallTxt">{t("Validity Informations")}</p>
                  ) : (
                    <p>{t("Validity Informations")}</p>
                  )}
                  {sidebar ? (
                    <img className="smallImg" src={Rcheck} alt="" />
                  ) : (
                    <img src={Rcheck} alt="" />
                  )}
                </div>
              )}
              </>}

                { addonSettingData.addon_ghatke === 1 ? <></> :
                  accessRights.rights_manage_transportation_settings ||
                  accessRights?.rights_manage_transportation_settings ? (
                    <>
                {form5 == true ? (
                  <div className="single-step last-step active">
                    {sidebar ? (
                      <p className="smallTxt">{t("Vehicle Geo-fence")}</p>
                    ) : (
                      <p>{t("Vehicle Geo-fence")}</p>
                    )}
                    {sidebar ? (
                      <img className="smallImg" src={Gcheck} alt="" />
                    ) : (
                      <img src={Gcheck} alt="" />
                    )}
                  </div>
                ) : (
                  <div className="single-step">
                    {sidebar ? (
                      <p className="smallTxt">{t("Vehicle Geo-fence")}</p>
                    ) : (
                      <p>{t("Vehicle Geo-fence")}</p>
                    )}
                    {sidebar ? (
                      <img className="smallImg" src={Rcheck} alt="" />
                    ) : (
                      <img src={Rcheck} alt="" />
                    )}
                  </div>
                )}
                </>
              ) : null}
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
                        {t("Vehicle Number/Name")} <span>&#42;</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Vehicle Name/Number...")}
                        name="vehicleNumber_Name"
                        value={addVehicleData.vehicleNumber_Name}
                        onChange={handleChange}
                      />
                      {errMsg.vehicleNumber_Name.length > 0 && (
                        <span className="text-danger">
                          {errMsg.vehicleNumber_Name}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Registration Number")} <span>&#42;</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Registration Number...")}
                        name="registrationNumber"
                        value={addVehicleData.registrationNumber}
                        onChange={handleChange}
                      />
                      {errMsg.registrationNumber.length > 0 && (
                        <span className="text-danger">
                          {errMsg.registrationNumber}
                        </span>
                      )}
                    </div>

                    <div className="col-md-6 form_input_main">
                      <div className="d-flex justify-content-between flex-wrap">
                        <Form.Label className="common-labels label-with-radio custom-label-title form_input_main me-0">
                          <p>
                            {t("Vehicle Type")} <span>&#42;</span>
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
                              {t("Existing")}
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
                        <div className="multi-select-1">
                          <Select
                            style={{
                              width: "100%",
                              height: "40px",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            showSearch
                            value={addVehicleData?.vehicleCategory}
                            onChange={(value) => {
                              setErrMsg({
                                ...errMsg,
                                vehicleCategory: "",
                              });
                              automaticDataCategory(value);
                            }}
                            className="custom-select"
                            placeholder={t("Select Vehicle Type...")}
                          >
                            <Option
                              style={{ color: "rgb(156, 73, 0)" }}
                              key={"1"}
                            >
                              {t("Select Vehicle Type...")}
                            </Option>
                            {categoryDataList && categoryDataList?.length > 0
                              ? categoryDataList?.map((item, index) => {
                                  return (
                                    <Option
                                      key={"vehicleCategory" + index}
                                      style={{ color: "rgb(156, 73, 0)" }}
                                      value={item?.vehicle_type_id}
                                    >
                                      {item.vehicle_type_code}
                                    </Option>
                                  );
                                })
                              : "no data available"}
                          </Select>
                        </div>
                      )}

                      {exitNew === "New" && (
                        <Form.Control
                          required
                          type="text"
                          placeholder={t("Enter vehicle Type..")}
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
                              {t(
                                passanger == "Goods"
                                  ? "Goods Capacity"
                                  : "Seat Capacity"
                              )}{" "}
                              <span>&#42;</span>
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
                                {t("Goods")}
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
                          <div className="multi-select-1">
                            <Select
                              style={{
                                width: "100%",
                                height: "40px",
                                color: "rgba(156, 73, 0, 0.5)",
                              }}
                              showSearch
                              value={addVehicleData?.vehicleCapacity}
                              onChange={(value) => {
                                const updatedAddVehicleData = {
                                  ...addVehicleData,
                                  vehicleCapacity: value,
                                };
                                setAddVehicleData(updatedAddVehicleData);
                              }}
                              className="custom-select"
                              placeholder={t("Select vehicle capacity...")}
                            >
                              <Option
                                value=""
                                style={{ color: "rgba(156, 73, 0)" }}
                              >
                                {t("Select Vehicle Capacity.")}
                              </Option>
                              {capcityDataList &&
                              capcityDataList?.length > 0 ? (
                                capcityDataList.map((item, index) => (
                                  <Option
                                    key={"capacity" + index}
                                    value={item}
                                    style={{ color: "rgba(156, 73, 0)" }}
                                  >
                                    {item}
                                  </Option>
                                ))
                              ) : (
                                <Option value="" disabled>
                                  {t("No data available")}
                                </Option>
                              )}
                            </Select>
                          </div>
                        )}
                        {passanger == "Goods" && (
                          <Form.Control
                            min="0"
                            type="number"
                            placeholder={t("Enter Goods Capacity...")}
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
                      <div className="innerSelectBox ">
                        <Form.Label className="common-labels custom-label-title me-0">
                          <p>
                            {t("Driver")}
                            {/*   <span>&#42;</span> */}
                          </p>
                        </Form.Label>
                        <div className="multi-select-1">
                          <Select
                            style={{
                              width: "100%",
                              height: "40px",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            showSearch
                            value={addVehicleData.driverId}
                            onChange={(value) => {
                              const updatedAddVehicleData = {
                                ...addVehicleData,
                                driverId: value,
                              };
                              setAddVehicleData(updatedAddVehicleData);
                            }}
                            className="custom-select"
                            placeholder={t("Select Driver...")}
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              {t("Select Driver...")}
                            </Option>
                            {driverDataList && driverDataList.length > 0
                              ? driverDataList.map((item, index) => (
                                  <Option
                                    style={{ color: "rgba(156, 73, 0)" }}
                                    key={"Driver" + index}
                                    value={Number(item?.user_id)}
                                  >
                                    {item?.user_name}
                                  </Option>
                                ))
                              : "no data available"}
                          </Select>
                        </div>
                        {errMsg.driverId.length > 0 && (
                          <span className="text-danger">{errMsg.driverId}</span>
                        )}
                      </div>
                    </div>
                    {
                       addonSettingData.addon_ghatke == 0  ? (
                        <>
                        </>
                    
                   
                   
                    ) :
                    <>
                    <div className="col-md-6 form_input_main">

                     <div className="innerSelectBox ">
                    <Form.Label className="common-labels custom-label-title me-0">
                      <p>
                        {t("Vehicle Assistant")}
                        {/*   <span>&#42;</span> */}
                      </p>
                    </Form.Label>
                    <div className="multi-select-1">
                      <Select
                        style={{
                          width: "100%",
                          height: "40px",
                          color: "rgba(156, 73, 0, 0.5)",
                        }}
                        showSearch
                        value={addVehicleData?.vehicle_assistant_id}
                        onChange={(value) => {
                          const updatedAddVehicleData = {
                            ...addVehicleData,
                            vehicle_assistant_id: value,
                          };
                          setAddVehicleData(updatedAddVehicleData);
                        }}
                        className="custom-select"
                        placeholder={t("Select Vehicle Assistant...")}
                      >
                        <Option
                          value=""
                          style={{ color: "rgba(156, 73, 0)" }}
                        >
                          {t("Select Vehicle Assistant...")}
                        </Option>
                        {vehicleAssistantList &&
                        vehicleAssistantList.length > 0
                          ? vehicleAssistantList.map((item, index) => (
                              <Option
                                style={{ color: "rgba(156, 73, 0)" }}
                                key={"assistant" + index}
                                value={Number(item?.user_id)}
                              >
                                {item?.user_name}
                              </Option>
                            ))
                          : "no data available"}
                      </Select>
                    </div>
                  </div>
                  </div>

                
                    <div className="col-md-6 mb-3">
                      <Form.Label className="common-labels custom-label-title me-0">
                        <p>
                          {t("Vehicle Group")}
                          {/* <span>&#42;</span> */}
                        </p>
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
                                vehicleGroup?.map((item) => {
                                  return item?.vehicle_group_id;
                                });
                              setAddVehicleData({
                                ...addVehicleData,
                                vehicleGroupId: selectedVehicleGroupIdsArr,
                              });

                              setGroupVehicle(vehicleGroup);
                            }}
                            onSearch={function noRefCheck() {}}
                            onSelect={(vehicleGroup) => {
                              console.log(
                                vehicleGroup,
                                "vehicleGroup??????????????"
                              );
                              let selectedVehicleGroupIdsArr =
                                vehicleGroup &&
                                vehicleGroup?.map((item) => {
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
                            placeholder={t("Select Vehicle Group ...")}
                            style={{
                              color: "rgba(156, 73, 0)",
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
                    </>
                  }

                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Vehicle Image")}
                      </Form.Label>
                      <Form.Control
                        accept="image/png, image/gif, image/jpeg"
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
                        {t("Model Name & Number")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Model Name & Number...")}
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

                      <div className="multi-select-1">
                        <Select
                          style={{
                            width: "100%",
                            height: "40px",
                            color: "rgba(156, 73, 0, 0.5)",
                          }}
                          showSearch
                          value={addVehicleData?.makeYear}
                          onChange={(value) => {
                            const updatedAddVehicleData = {
                              ...addVehicleData,
                              makeYear: value,
                            };
                            setAddVehicleData(updatedAddVehicleData);
                          }}
                          className="custom-select"
                          placeholder={t("Select Make Year.")}
                        >
                          <Option
                            value=""
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            {t("Select Make Year.")}
                          </Option>
                          {years && years.length > 0
                            ? years.map((item, index) => (
                                <Option
                                  key={"years" + index}
                                  value={item}
                                  style={{ color: "rgba(156, 73, 0)" }}
                                >
                                  {item}
                                </Option>
                              ))
                            : "no data available"}
                        </Select>
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Chassis Number or VIN number")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Chassis Number or VIN number...")}
                        name="chassisNumberorVINnumber"
                        value={addVehicleData.chassisNumberorVINnumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Engine Number")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Engine Number ...")}
                        name="engineNumber"
                        value={addVehicleData.engineNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Registration Certificate")}
                      </Form.Label>
                      <Form.Control
                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
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
                        {t("Please Select Registration certificate.")}
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
                        {t("Insurance Certificate")}
                      </Form.Label>
                      <Form.Control
                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
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
                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
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
                        <div className="multi-select-1">
                          <Select
                            style={{
                              width: "100%",
                              height: "40px",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            showSearch
                            value={addVehicleData.fuelType}
                            onChange={(value) => {
                              const updatedAddVehicleData = {
                                ...addVehicleData,
                                fuelType: value,
                              };
                              setAddVehicleData(updatedAddVehicleData);
                            }}
                            className="custom-select"
                            placeholder={t("Select Fuel Type...")}
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              {t("Select Fuel Type...")}
                            </Option>
                            {feulDataList && feulDataList.length > 0
                              ? feulDataList.map((item, index) => (
                                  <Option
                                    style={{ color: "rgba(156, 73, 0)" }}
                                    key={"feaul" + index}
                                    value={item.title}
                                  >
                                    {item.title}
                                  </Option>
                                ))
                              : "no data available"}
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Odometer Reading")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        min="0"
                        placeholder={t("Enter Odometer Reading ...")}
                        name="odometerReading"
                        value={addVehicleData.odometerReading}
                        onChange={handleChange}
                      />
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
                        placeholder={t("Enter IMEI Number...")}
                        name="imeiNumber"
                        value={
                          addVehicleData.imeiNumber
                            ? addVehicleData.imeiNumber
                            : ""
                        }
                        onChange={handleChange}
                        maxLength="20"
                        minLength="5"
                      />
                      {errMsg.imeiNumber.length > 0 && (
                        <span className="text-danger">{errMsg.imeiNumber}</span>
                      )}
                    </div>
                    <div className="col-md-6 form_input_main">
                      <div className="innerSelectBox ">
                        <Form.Label className="common-labels custom-label-title me-0">
                          <p>
                            {t("Type of Device")} <span>&#42;</span>
                          </p>
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
                              addVehicleData?.typeOfDevice
                                ? addVehicleData?.typeOfDevice
                                : ""
                            }
                            onChange={(value) => {
                              getFeatureList(value);
                              handleChange({
                                target: { name: "typeOfDevice", value },
                              });
                            }}
                            className="custom-select"
                            placeholder={t("Select Type of Device ...")}
                          >
                            <Option
                              value=""
                              style={{ color: "rgba(156, 73, 0)" }}
                            >
                              {t("Select Type of Device ...")}
                            </Option>
                            {deviceDataList && deviceDataList?.length > 0
                              ? deviceDataList.map((item, index) => (
                                  <Option
                                    style={{ color: "rgba(156, 73, 0)" }}
                                    key={"test" + index}
                                    value={item.hardware_id}
                                  >
                                    {item.hardware_name}
                                  </Option>
                                ))
                              : "no data available"}
                          </Select>
                        </div>
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
                        min="0"
                        type="number"
                        placeholder={t("Enter Sim card Number...")}
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
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Sim Telephone Number")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="type"
                        placeholder={t("Enter Sim Telephone Number ...")}
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
                    </div>
                  </div>
                )}
                {
                accessRights.rights_view_hardware_feature_set ||
                accessRights?.rights_manage_hardware_feature_set ? (
                  <>
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
                </>
              ) : null}

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
                                      setErrMsg({
                                        ...errMsg,
                                        sensorName: "",
                                      });
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
                                  {errMsg.sensorName.length > 0 && (
                                    <span className="text-danger">
                                      {errMsg.sensorName}
                                    </span>
                                  )}
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
                                      setErrMsg({
                                        ...errMsg,
                                        minimumTemperatureRunning: "",
                                      });
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
                                  {errMsg.minimumTemperatureRunning.length >
                                    0 && (
                                    <span className="text-danger">
                                      {errMsg.minimumTemperatureRunning}
                                    </span>
                                  )}
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
                                    min="0"
                                    type="number"
                                    placeholder="Enter Maximum Temperature Threshold on Vehicle Running"
                                    value={outerItem?.maximumTemperatureRunning}
                                    onChange={(e) => {
                                      setErrMsg({
                                        ...errMsg,
                                        maximumTemperatureRunning: "",
                                      });
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
                                  {errMsg.maximumTemperatureRunning.length >
                                    0 && (
                                    <span className="text-danger">
                                      {errMsg.maximumTemperatureRunning}
                                    </span>
                                  )}
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
                                    min="0"
                                    type="number"
                                    placeholder="Enter Minimum Temperature Threshold on Vehicle Parked"
                                    value={outerItem?.minimumTemperatureParked}
                                    onChange={(e) => {
                                      setErrMsg({
                                        ...errMsg,
                                        minimumTemperatureParked: "",
                                      });
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
                                  {errMsg.minimumTemperatureParked.length >
                                    0 && (
                                    <span className="text-danger">
                                      {errMsg.minimumTemperatureParked}
                                    </span>
                                  )}
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
                                    min="0"
                                    type="number"
                                    placeholder="Enter Maximum Temperature Threshold on Vehicle Parked"
                                    value={outerItem?.maximumTemperatureParked}
                                    onChange={(e) => {
                                      setErrMsg({
                                        ...errMsg,
                                        maximumTemperatureParked: "",
                                      });
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
                                  {errMsg.maximumTemperatureParked.length >
                                    0 && (
                                    <span className="text-danger">
                                      {errMsg.maximumTemperatureParked}
                                    </span>
                                  )}
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

                    {valueFeatureIdNew === 8 && valueFeatureIdSpped && (
                      <div className="addNew-main">
                        <div className="col-md-6">
                          <div className="form_input_main">
                            <Form.Label className="common-labels">
                              {t("Speed Limit")}
                            </Form.Label>
                            <Form.Control
                              type="number"
                              min="0"
                              // disabled={featureSendData[ele.feature] === true ? false : true}
                              placeholder={t("Enter over speed value")}
                              value={featurevalueSend}
                              onChange={(e) => {
                                setFeaturevalueSend(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
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
                          SetPlaceholder={t("Insurance Start Date")}
                        />

                        {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Insurance End Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          minDate={addVehicleData?.insuranceStartDate}
                          // minDate={""}
                          dateKey={"insuranceEndDate"}
                          setDate={setAddVehicleData}
                          data={addVehicleData}
                          SetPlaceholder={t("Insurance End Date")}
                        />

                        {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
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
                          SetPlaceholder={t("Permit Start Date")}
                        />

                        {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Permit End Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          minDate={addVehicleData?.permitStartDate}
                          dateKey={"permitEndDate"}
                          setDate={setAddVehicleData}
                          data={addVehicleData}
                          SetPlaceholder={t("Permit End Date")}
                        />

                        {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
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
                          SetPlaceholder={t(
                            "Municipality Permission Start Date"
                          )}
                        />

                        {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Municipality Permission End Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          minDate={
                            addVehicleData?.municipalityPermissionStartDate
                          }
                          dateKey={"municipalityPermissionEndDate"}
                          setDate={setAddVehicleData}
                          data={addVehicleData}
                          SetPlaceholder={t("Municipality Permission End Date")}
                        />

                        <img src={Calendar} className="calendarLogo" alt="" />
                       </div>
                    </div>
                     <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Pollution Start Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          dateKey={"pollutionStartDate"}
                          setDate={setAddVehicleData}
                          data={addVehicleData}
                          SetPlaceholder={t("Pollution Start Date")}
                        /> 

                        {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                      </div>
                    </div>
                    <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Pollution End Date")}
                      </Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          minDate={addVehicleData?.pollutionStartDate}
                          dateKey={"pollutionEndDate"}
                          setDate={setAddVehicleData}
                          data={addVehicleData}
                          SetPlaceholder={t("Pollution End Date")}
                        />

                        {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                      </div>
                    </div>
                  </div>
                 )} 

                {screenTab == "Vehicle Geo-fence" && (
                  <>
                    <div className="addnew-map">
                      <div className="map-head">
                        <p>
                          {t(
                            "If you want to set geofence for vehicle separately, you can use below tools to draw geofence."
                          )}
                        </p>
                      </div>
                      <div className="road-map addParkingMap">
                        {errMsgMap.length > 0 && (
                          <span className="text-danger">{errMsgMap}</span>
                        )}
                        <MapComponent componentId={"addVehicle"} />
                        <div className="belowContent"></div>
                      </div>
                      <div className="notific ml-2">
                        <img src={green_box} alt="" />
                        <label
                          style={{
                            marginLeft: "10px",
                            color: "rgb(156, 73, 0)",
                          }}
                        >
                          {t("Transportation Coverage Area")}
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <div
                  className="btn-common btn-wrapper"
                  style={{ marginTop: "20px" }}
                >
                  <>
                    <button
                      type="button"
                      onClick={handleScreenTabBack}
                      className={"cx-btn-1"}
                    >
                      {/* {form1 === true ? " back" : "Back"} */}
                      {screenTab == "Vehicle Information"
                        ? t("Cancel")
                        : t("Back")}
                    </button>
                    <button
                      className="cx-btn-2"
                      // type="button"
                      disabled={btnDesable}
                      type={form6 === true ? "button" : "button"}
                      onClick={(e) => handleScreenTabNext(e)}
                    >
                      {form5 === true
                        ? vehicleID
                          ? `${t("Update")}`
                          : `${t("Submit")}`
                          
                        : `${t("Next")}`
                        }
                      {btnDesable && form5 == true && (
                        <div class="spinner-border cx-btn-load" role="status">
                          <span class="sr-only"> </span>
                        </div>
                      )}
                    </button>

                      {addonSettingData.addon_ghatke !== 1 && (form2 == true ||
                      form3 == true ||
                      form4 == true ||
                      form6 == true) &&
                    form5 != true ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          handleSumbmit(e);
                        }}
                        className={"cx-btn-1"}
                      >
                        {t("Finish")}

                        {btnDesable && form5 !== true && (
                          <div class="spinner-border cx-btn-load" role="status">
                            <span class="sr-only"> </span>
                          </div>
                        )}
                      </button>
                    ) : (
                      ""
                    )} 
                  </>
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
                min="0"
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
                min="0"
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
                min="0"
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
                min="0"
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

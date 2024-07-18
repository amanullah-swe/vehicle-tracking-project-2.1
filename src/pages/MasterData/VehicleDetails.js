import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import option from "../../assets/images/option-three-dot.svg";
import Orange_top from "../../assets/images/Vehicle_Icon/Vehicle_icon_orange_car_top.svg";
import dummy_vehicle_ic from "../../assets/images/dummy_vehicle_ic.svg";
import { Dropdown, Modal, Tab, Tabs } from "react-bootstrap";
import alaram from "../../assets/images/Vehicle_Icon/Details_Alaram.svg";
import charg from "../../assets/images/Vehicle_Icon/Details_battry_charg.svg";
import qution from "../../assets/images/Vehicle_Icon/Details_battry_qution.svg";
import battry from "../../assets/images/Vehicle_Icon/Details_Battry.svg";
import health from "../../assets/images/Vehicle_Icon/Details_health.svg";
import mail from "../../assets/images/Vehicle_Icon/Details_mail_pending.svg";
import running from "../../assets/images/Vehicle_Icon/Details_Running.svg";
import Driver_img from "../../assets/images/Vehicle_Icon/Driver_img.svg";
import Driver_action1 from "../../assets/images/Vehicle_Icon/Driver_action1.svg";
import Driver_action2 from "../../assets/images/Vehicle_Icon/Driver_action2.svg";
import edit from "../../assets/images/ic-edit.svg";
import deleteIcon from "../../assets/images/delete.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import licence from "../../assets/images/licence.jpg";
import pollution from "../../assets/images/pollution.png";
import insurance from "../../assets/images/insurance.png";
import ImportUser from '../../assets/images/imagesuser.png'
import { motion } from "framer-motion";
import MapComponent from "../../sharedComponent/MapComponent";
import ApiConfig from "../../api/ApiConfig";
import {
  simpleDeleteCall,
  simpleGetCall,
  simplePostCall,
} from "../../api/ApiServices";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import { Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { useTranslation } from "react-i18next";
import ImageValid from "../../sharedComponent/ImageValid";
import { useSelector } from "react-redux";
import { DateDDMMYYYY } from "../../sharedComponent/common";

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};


const VehicleDetails = () => {
  const { t, i18n } = useTranslation();
  const { sidebar, setSidebar, Dark, setRegionCord, customerData } =
    useContext(AppContext);
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights?.rights_role;
 const [show, setShow] = useState(false);
  const [showdocs, setShowdocs] = useState(false);
  const handleClosedocs = () => setShowdocs(false);
  const handleShowdocs = () => setShowdocs(true);
  const [imbStatusData, setImbStatusData] = useState({});
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let paramID = useParams();
  const vehicleID = paramID.id;
  const navigate = useNavigate();
  const addonSettingData = useSelector((state) => state.auth.addonModule);
  
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [assistant,setAssistant]=useState({})
  // const [imbData,setImbData]=useState([])
  const [tabsDetails, setTabsDetails] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [urlTaps, setUrlTaps] = useState("");
  
  const [alertTab, setAlertTab] = useState(localStorage.getItem("alertTab")?localStorage.getItem("alertTab"):"0")
  useEffect(() => {
    if (vehicleID ) {
      getVehicleDetails();
    } 
  }, []);

  const getVehicleDetails = () => {
    simplePostCall(ApiConfig.VEHICLE_DETAILS + `?vehicle_id=${vehicleID}`)
      .then((res) => {
        if (res.result === true) {
          setVehicleDetails({
            ...res.data[0],
            vehicle_type_icon: res.data[0]?.category[0]?.vehicle_type_icon,
            vehicle_type_code: res.data[0]?.category[0]?.vehicle_type_code,
          });
          setAssistant(res.data[0].vehicle_assistant_details[0])
if(alertTab=="2"){
  getDetailstabsApi(
    ApiConfig.ALERT_DATA +
      `?imei=${
        res.data[0]?.vehicle_imei 
          ? res.data[0]?.vehicle_imei 
          : ""
      }`
  );
}else{
  getDetailstabsApi(
    ApiConfig.VEHICLE_HELTH +
      `?imei=${
        res.data[0]?.vehicle_imei ? res.data[0]?.vehicle_imei : ""
      }`
  );

}
}
})   
      .catch((error) => {
        console.log("api response", error);
      });
  };

  const getDetailstabsApi = (url) => {
    simpleGetCall(url)
      .then((res) => {
        if (res.result === true) {
          setTabsDetails(res?.data);
          if (res.message === "Vehicle current position") {
            setUrlTaps("geofance");

            setRegionCord([
              Number(res?.data[0].latitude)
                ? Number(res?.data[0].latitude)
                : 28.12,
              Number(res?.data[0].longitude)
                ? Number(res?.data[0].longitude)
                : 75.215,
            ]);
          }
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  const assignvehicletDelete = () => {
    handleClose();
    simpleDeleteCall(
      ApiConfig.VEHICLE_DELETE + `?vehicle_id=${deleteId}`
      // ApiConfig.ASSIGN_TRIP_DETAILS_DELETE + `?vehicle_id=${deleteId}`
    )
      .then((res) => {
        if (res.result === true) {
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
  const ActivationCancle=()=>{
    notifySuccess(`vehciele ${imbStatusData?.feature_set_value==="activated"?"deactivated":"activated"} is cancle`);
  }

  const vehicletImobilization = () => {
    handleClose2();
    simplePostCall(
      ApiConfig?.VEHICLE_IMOBILIZATION,
      JSON.stringify({...imbStatusData,user_customer_id :customerData.customer_id, feature_set_value:imbStatusData.feature_set_value==="activated"?"deactivated":"activated"})
    )
      .then((res) => {
        if (res?.result === true) {
          notifySuccess(res?.message);
          getVehicleDetails()
          // if (vehicleTabList === "vehicle" || vehicleTabList === "group") {
          //   vehicleAllList(tabURL, page, "key");
          // }
          // if (view === true) {
          //   apiCallForSubgroup(groupdeletlist, "key");
          // }
          // if (vCars === true) {
          //   apiCallForSubCategory(groupdeletlist, "key");
          // }
        } else {
          notifyError(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };
  const OverviewSubdata = [
    {
      Title: t("Vehicle Health Status"),
      eventKey: "first",
      url:
        ApiConfig.VEHICLE_HELTH +
        `?imei=${
          vehicleDetails?.vehicle_imei ? vehicleDetails?.vehicle_imei : ""
        }`,

      key: "vehiclehelth",
    },
    {
      Title: t("Vehicle Current Position"),
      eventKey: "second",
      url:
        ApiConfig.CURRENT_POSITION +
        `?imei=${
          vehicleDetails?.vehicle_imei ? vehicleDetails?.vehicle_imei : ""
        }`,
      key: "geofance",
    },
    {
      Title: t("Assigned Employees"),
      eventKey: "three",
      url:
        ApiConfig.DRIVERS_ASSIST +
        `?vehicle_assignment_vehicle_id=${
          vehicleDetails?.vehicle_id ? vehicleDetails?.vehicle_id : ""
        }`,
    },
    {
      Title: t("Assigned Trip Details"),
      eventKey: "four",
      url:
        ApiConfig.ASSIGN_TRIP_DETAILS +
        `?trip_vehicle_id=${
          vehicleDetails?.vehicle_id ? vehicleDetails?.vehicle_id : ""
        }`,
    },
  ];


  const handleErrorImage1 = (ev) => {
    ev.target.src = ImportUser;
 };



// Alternatively, you can use smooth scrolling
// function scrollToBottomSmooth() {
//   window.scrollTo({
//     top: document.documentElement.scrollHeight || document.body.scrollHeight,
//     behavior: 'smooth'
//   });
// }

// scrollToBottomSmooth();

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
          <div className="main-dashboard-wrapper CustomerProfile">
            <div className="CustomerProfile-head">
              <div className="profile-img">
                <ImageValid
                  item={vehicleDetails}
                  componentId={"Vehicledetails"}
                />
                {/* <img src={Orange_top} alt="porfile" /> */}
              </div>
              {userRole === "customer" ||
              accessRights?.rights_manage_vehicle ? (
                <>
                  <div className="customer-option">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src={option} alt="" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>
                          {" "}
                          <Link
                            to={"/AddVehicle/" + vehicleDetails?.vehicle_id}
                            className="d-block"
                          >
                            {t("Edit")}
                          </Link>
                        </Dropdown.Item>
                      
                        <Dropdown.Item>
                          {" "}
                          <Link
                            to="#"
                            onClick={() => {
                              setDeleteId(vehicleDetails?.vehicle_id);
                              handleShow();
                            }}
                          >
                            {t("Delete")}
                          </Link>
                        </Dropdown.Item>
                       {vehicleDetails?.immobolizaion?.is_active&& <Dropdown.Item>
                          <Link
                      className="d-block"
                          onClick={() => {
                              setImbStatusData({
                                vehicle_id:vehicleDetails?.immobolizaion?.vehicle_id,
                                feature_set_value:vehicleDetails?.immobolizaion.feature_set_value,
                                vehicle_imei :vehicleDetails?.vehicle_imei
                              });
                              handleShow2();
                            }}
                          >
                            {t(
                              vehicleDetails?.immobolizaion?.feature_set_value==="activated"
                                ? "Deactivate immobilization"
                                : "Activate immobilization "
                            )}
                            {/* activate immobilization */}
                          </Link>
                        </Dropdown.Item>}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="information-card mt-5">
              <div className="information-head">
                <div className="imformation-heading">
                  <p>{t("General Information")}</p>
                </div>
              </div>
              <div className="information-contain row">
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Vehicle Type")}</p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_type_code}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Vehicle Number")}</p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_number}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Vehicle Registration Number")}
                  </p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_reg_no}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Chassis Number or VIN Number")}
                  </p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_chaise_no}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Vehicle Model Name & Number")}
                  </p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_model_no}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Vehicle Model Make Year")}
                  </p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_model_make}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Vehicle IMEI NO")}</p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_imei}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Vehicle Capacity")}</p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_seat_capacity}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Vehicle Fuel Type")}
                  </p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_fuel_type}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Driver Name")}</p>
                  <p className="discription-contain">
                    {vehicleDetails?.user_name
                      ? vehicleDetails?.user_name
                      : vehicleDetails?.vehicle_driver_id}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("vehicle Assistant Name")}</p>
                  <p className="discription-contain">
                    {assistant&&assistant?.assistant_name

                      ? assistant?.assistant_name
                      : "no assistant"}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Odometer Reading ")}
                  </p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_odometer}
                  </p>
                </div>
              </div>
            </div>
            <div className="information-card">
              <div className="information-head">
                <div className="imformation-heading">
                  <p>{t("Tracking Device Information")}</p>
                </div>
              </div>
              <div className="information-contain row">
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Device IMEI Number")}
                  </p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_imei}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Type of Device")}</p>
                  <p className="discription-contain">
                    {vehicleDetails?.hardware_name}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Sim Card Number")}</p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_simcard_no}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Sim Telephone Number")}
                  </p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_sim_telephone_no}
                  </p>
                </div>
              </div>
            </div>
            <div className="information-card">
              <div className="information-head">
                <div className="imformation-heading">
                  <p>{t("Additional Information")}</p>
                </div>
              </div>
              <div className="information-contain row">
                {/* <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Tax Start Date")}</p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_tax_start_date}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Tax End Date")}</p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_tax_end_date}
                  </p>
                </div> */}
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Insurance Start Date")}
                  </p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_insurance_start_date
                      ? DateDDMMYYYY(
                          vehicleDetails?.vehicle_insurance_start_date
                        )
                      : ""}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Insurance End Date")}
                  </p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_insurance_end_date
                      ? DateDDMMYYYY(vehicleDetails?.vehicle_insurance_end_date)
                      : ""}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Permit Start Date")}
                  </p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_permit_start_date
                      ? DateDDMMYYYY(vehicleDetails?.vehicle_permit_start_date)
                      : ""}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">{t("Permit End Date")}</p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_permit_start_date
                      ? DateDDMMYYYY(vehicleDetails?.vehicle_permit_start_date)
                      : ""}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Municipality Permission Start Date")}
                  </p>
                  <p className="discription-contain">
                    {vehicleDetails?.municipality_permission_startdate
                      ? DateDDMMYYYY(
                          vehicleDetails?.municipality_permission_startdate
                        )
                      : ""}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Municipality Permission End Date")}
                  </p>
                  <p className="discription-contain">
                    {vehicleDetails?.municipality_permission_enddate
                      ? DateDDMMYYYY(
                          vehicleDetails?.municipality_permission_enddate
                        )
                      : ""}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Pollution Start Date")}
                  </p>
                  <p className="discription-contain">
                    {vehicleDetails?.pollution_start_date
                      ? DateDDMMYYYY(vehicleDetails?.pollution_start_date)
                      : ""}
                  </p>
                </div>{" "}
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                  <p className="discription-heading">
                    {t("Pollution End Date")}
                  </p>
                  <p className="discription-contain">
                    {vehicleDetails?.pollution_end_date
                      ? DateDDMMYYYY(vehicleDetails?.pollution_end_date)
                      : ""}
                  </p>
                </div>
                <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                  <p className="discription-heading">{t("Vehicle Status")}</p>
                  <p className="discription-contain">
                    {vehicleDetails?.vehicle_status}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {addonSettingData.addon_ghatke === 1 ? <></> :<>
          
          <div className="tabs-main-details inner-tabs-section responscie-tabss-bigger row m-0">
          <Tab.Container
            id="left-tabs-example"
            className="td-tab-wrapper"
            defaultActiveKey={alertTab}
          >
            <Nav variant="pills" className="td-nav" id="InnerTabNew_VD">
              <Nav.Item className="td-tab">
                <Nav.Link
                  className="td-link"
                  eventKey="0"
                  onClick={() => {
                    setTabsDetails([])
                    // setUrlTaps(ApiConfig.VEHICLE_HELTH);
                    setAlertTab("0")
                    localStorage.setItem(
                      "alertTab",
                      "0"
                    );
                    getDetailstabsApi(
                      ApiConfig.VEHICLE_HELTH +
                        `?imei=${
                          vehicleDetails?.vehicle_imei
                            ? vehicleDetails?.vehicle_imei
                            : ""
                        }`
                    );
                  }}
                >
                  {t("Overview")}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="td-tab">
                <Nav.Link
                  className="td-link"
                  eventKey="1"
                  onClick={() => {
                    // setUrlTaps(ApiConfig.CONFIURATION_INF_GPRS);
                    setAlertTab("1")
                    localStorage.setItem(
                      "alertTab",
                      "1"
                    );
                    getDetailstabsApi(
                      ApiConfig.CONFIURATION_INF_GPRS +
                        `?imei=${
                          vehicleDetails?.vehicle_imei
                            ? vehicleDetails?.vehicle_imei
                            : ""
                        }`
                    );
                  }}
                >
                  {t("Configuration Info")}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="td-tab">
                <Nav.Link
                  className="td-link"
                  eventKey="2"
                  onClick={() => {
                    // setUrlTaps(ApiConfig.ALERT_DATA);
                    setTabsDetails([])
                    setAlertTab("2")
                    localStorage.setItem(
                      "alertTab",
                      "2"
                    );
                    getDetailstabsApi(
                      ApiConfig.ALERT_DATA +
                        `?imei=${
                          vehicleDetails?.vehicle_imei
                            ? vehicleDetails?.vehicle_imei
                            : ""
                        }`
                    );
                  }}
                >
                  {t("Alert")}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="td-tab">
                <Nav.Link className="td-link" eventKey="3" onClick={()=>{
                   setTabsDetails([])
                     setAlertTab("3")
                     localStorage.setItem(
                       "alertTab",
                       "3"
                     );
                }}>
                  {t("Documents")}
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Col sm={12} className="">
              <Tab.Content>
                <Tab.Pane eventKey="0">
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="first"
                  >
                    <Nav variant="pills" id="newTabMai" className="mb-3">
                      {OverviewSubdata?.map((item, index) => {
                        return (
                          <Nav.Item>
                            <Nav.Link
                              eventKey={item.eventKey}
                              onClick={() => {
                                // setUrlTaps(item.key);
                                setTabsDetails([])
                                getDetailstabsApi(item.url);
                              }}
                              key={"item.eventKey" + index}
                            >
                              {item.Title}
                            </Nav.Link>
                          </Nav.Item>
                        );
                      })}
                      {/* <Nav.Item>
                        <Nav.Link eventKey="first">
                          Vehicle Health Status
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          Vehicle Current Position
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="three">
                          Assigned Employees
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="four">
                          Assigned Trip Details
                        </Nav.Link>
                      </Nav.Item> */}
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <div className="transport-main row m-0 p-0">
                          <div className="common-table details-tabel-main">
                            <table>
                              <thead>
                                <tr>
                                  <th>{t("Sr.no")}</th>
                                  <th>{t("Vehicle Part")}</th>
                                  <th>{t("Status")}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* {tabsDetails && tabsDetails.length>0 && tabsDetails.map((staus,index)=>{
                                  return(  <tr>
                                    <td>{index+1}</td>
                                    <td>
                                      <img src={battry} alt="" />
                                      Device Battery
                                    </td>
                                    <td>50%</td>
                                  </tr>)
                                })} */}

                                <tr>
                                  <td>1</td>
                                  <td>
                                    <img src={battry} alt="" />
                                  {t("Device Battery")}  
                                  </td>
                                  <td>
                                    {tabsDetails[0]?.battery_charge_level}%
                                  </td>
                                </tr>

                                <tr>
                                  <td>2</td>
                                  <td>
                                    <img src={qution} alt="" />
                                  {t("Device Battery Status")}  
                                  </td>
                                  <td>
                                    {tabsDetails[0]?.battery_charge_status}
                                  </td>
                                </tr>
                                <tr>
                                  <td>3</td>
                                  <td>
                                    <img src={charg} alt="" />
                                  {t("Vehicle Battery Voltage")}  
                                  </td>
                                  <td>{tabsDetails[0]?.battery_voltage}</td>
                                </tr>
                                <tr>
                                  <td>4</td>
                                  <td>
                                    <img src={mail} alt="" />
                                  {t("Pending Messages")}  
                                  </td>
                                  <td>
                                    {tabsDetails[0]?.pending_gprs_packets}
                                  </td>
                                </tr>
                                <tr>
                                  <td>5</td>
                                  <td>
                                    <img src={alaram} alt="" />
                                  {t("Panic Alarm")}  
                                  </td>
                                  <td>{tabsDetails[0]?.panic_status}</td>
                                </tr>
                                <tr>
                                  <td>6</td>
                                  <td>
                                    <img src={running} alt="" />
                                  {t("Running Status")}  
                                  </td>
                                  <td>{tabsDetails[0]?.metering_status}</td>
                                </tr>
                                <tr>
                                  <td>7</td>
                                  <td>
                                    <img src={health} alt="" />
                                  {t("Last Health Status Received")}  
                                  </td>
                                  <td>{tabsDetails[0]?.logged_date}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div className="road-map m-0 p-0">
                          {urlTaps === "geofance" && tabsDetails[0] ? (
                            tabsDetails[0]?.latitude &&
                            tabsDetails[0]?.longitude && (
                              <MapComponent
                                tabsDetails={tabsDetails[0]}
                                componentId={"vahicledetails"}
                              />
                            )
                          ) : (
                            <div className="d-flex justify-content-center text-danger">
                              {t("No Data Found for Current Position")}
                            </div>
                          )}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="three">
                        <Tab.Container
                          id="left-tabs-example"
                          className="td-tab-wrapper"
                          defaultActiveKey="0"
                        >
                          <Nav
                            variant="pills"
                            className="td-nav"
                            id="InnerTabNew_Foure"
                          >
                            <Nav.Item className="td-tab">
                              <Nav.Link
                                className="td-link"
                                eventKey="0"
                                onClick={() => {
                                  setTabsDetails([])
                                  setUrlTaps(ApiConfig.DRIVERS_ASSIST);

                                  getDetailstabsApi(
                                    ApiConfig.DRIVERS_ASSIST +
                                      `?vehicle_assignment_vehicle_id=${
                                        vehicleDetails?.vehicle_id
                                          ? vehicleDetails?.vehicle_id
                                          : ""
                                      }`
                                  );
                                }}
                              >
                                {t("Drivers")}
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="td-tab">
                              <Nav.Link
                                className="td-link"
                                eventKey="1"
                                onClick={() => {
                                  // setUrlTaps(ApiConfig.BUS_ASSISTANT);
                                  setTabsDetails([])
                                  getDetailstabsApi(
                                    ApiConfig.BUS_ASSISTANT +
                                      `?vehicle_assignment_vehicle_id=${
                                        vehicleDetails?.vehicle_id
                                          ? vehicleDetails?.vehicle_id
                                          : ""
                                      }`
                                  );
                                }}
                              >
                                {t("Vehicle Assistants")}
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                          <Col sm={12} className="">
                            <Tab.Content>
                              <Tab.Pane eventKey="0">
                                <div className="transport-main row m-0 p-0">
                                  <div className="common-table details-tabel-main">
                                    <table className="assign-employee-table">
                                      <thead>
                                        <tr>
                                          <th>{t("Sr.no")}</th>
                                          <th>{t("Image")}</th>
                                          <th>{t("Name")}</th>
                                          <th>{t("Contact Number")}</th>
                                          <th>{t("Action")}</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {tabsDetails &&
                                          tabsDetails?.length > 0 &&
                                          tabsDetails?.map((staus, index) => {
                                            return (
                                              <tr>
                                                <td>{index + 1}</td>
                                                <td>
                                               { staus?.user_profile_pic?  <img
                                                  style={{
                                                    width: "80px",
                                                    height:"80px",
                                                    borderRadius: "5px",
                                                  }}
                                                    src={
                                                      staus?.user_profile_pic
                                                        ? `${ApiConfig.BASE_URL}${staus?.user_profile_pic}`
                                                        : ImportUser
                                                    }
                                                    onError={(ev) => {
                                                      handleErrorImage1(ev);
                                                    }}
                                                    // user_profile_pic
                                                    alt=""
                                                  />: <img
                                                  style={{
                                                    width: "80px",
                                                    height:"80px",
                                                    borderRadius: "5px",
                                                  }}
                                                  src={
                                                    ImportUser
                                                  }
                                                  // user_profile_pic
                                                  alt=""
                                                />}
                                                </td>
                                                <td>{staus?.user_name}</td>
                                                <td>{staus?.user_mobile}</td>
                                                <td>
                                                  <img
                                                    onClick={() => {
                                                      navigate(
                                                        "/ViewDrivers/" +
                                                          staus?.user_id
                                                      );
                                                    }}
                                                    src={Driver_action1}
                                                    alt=""
                                                    className="c-pointer"
                                                  />
                                                  {/* <img
                                                    src={Driver_action2}
                                                    alt=""
                                                    className="c-pointer"
                                                  /> */}
                                                </td>
                                              </tr>
                                            );
                                          })}
                                        {/* <tr>
                                          <td>1</td>
                                          <td>
                                            <img src={Driver_img} alt="" />
                                          </td>
                                          <td>John Doe</td>
                                          <td>+91 99 22 33 44 55</td>
                                          <td>
                                            <img
                                              src={Driver_action1}
                                              alt=""
                                              className="c-pointer"
                                            />
                                            <img
                                              src={Driver_action2}
                                              alt=""
                                              className="c-pointer"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>2</td>
                                          <td>
                                            <img src={Driver_img} alt="" />
                                          </td>
                                          <td>John Doe</td>
                                          <td>+91 99 22 33 44 55</td>
                                          <td>
                                            <img
                                              src={Driver_action1}
                                              alt=""
                                              className="c-pointer"
                                            />
                                            <img
                                              src={Driver_action2}
                                              alt=""
                                              className="c-pointer"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>3</td>
                                          <td>
                                            <img src={Driver_img} alt="" />
                                          </td>
                                          <td>John Doe</td>
                                          <td>+91 99 22 33 44 55</td>
                                          <td>
                                            <img
                                              src={Driver_action1}
                                              alt=""
                                              className="c-pointer"
                                            />
                                            <img
                                              src={Driver_action2}
                                              alt=""
                                              className="c-pointer"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>4</td>
                                          <td>
                                            <img src={Driver_img} alt="" />
                                          </td>
                                          <td>John Doe</td>
                                          <td>+91 99 22 33 44 55</td>
                                          <td>
                                            <img
                                              src={Driver_action1}
                                              alt=""
                                              className="c-pointer"
                                            />
                                            <img
                                              src={Driver_action2}
                                              alt=""
                                              className="c-pointer"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>5</td>
                                          <td>
                                            <img src={Driver_img} alt="" />
                                          </td>
                                          <td>John Doe</td>
                                          <td>+91 99 22 33 44 55</td>
                                          <td>
                                            <img
                                              src={Driver_action1}
                                              alt=""
                                              className="c-pointer"
                                            />
                                            <img
                                              src={Driver_action2}
                                              alt=""
                                              className="c-pointer"
                                            />
                                          </td>
                                        </tr> */}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="1">
                                <div className="transport-main row m-0 p-0">
                                  <div className="common-table details-tabel-main">
                                    <table className="assign-employee-table">
                                      <thead>
                                        <tr>
                                          <th>{t("Sr.no")}</th>
                                          <th>{t("Image")}</th>
                                          <th>{t("Name")}</th>
                                          <th>{t("Contact Number")}</th>
                                          <th>{t("Action")}</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {tabsDetails &&
                                          tabsDetails?.length > 0 &&
                                          tabsDetails?.map((staus, index) => {
                                            return (
                                              <tr>
                                                <td>{index + 1}</td>
                                                <td>
                                                { staus?.user_profile_pic?  <img
                                                    style={{
                                                      width: "80px",
                                                      height:"80px",
                                                      borderRadius: "5px",
                                                    }}
                                                    src={
                                                      staus?.user_profile_pic
                                                        ? `${ApiConfig.BASE_URL}${staus?.user_profile_pic}`
                                                        : ImportUser
                                                    }
                                                    onError={(ev) => {
                                                      handleErrorImage1(ev);
                                                    }}
                                                    // user_profile_pic
                                                    alt=""
                                                  />: <img
                                                  style={{
                                                    width: "80px",
                                                    height:"80px",
                                                    borderRadius: "5px",
                                                  }}
                                                  src={
                                                    ImportUser
                                                  }
                                                  // user_profile_pic
                                                  alt=""
                                                />}
                                                </td>
                                                <td>{staus?.user_name}</td>
                                                <td>{staus?.user_mobile}</td>
                                                <td>
                                                  <img
                                                    onClick={() => {
                                                      navigate(
                                                        "/ViewVehicleAssistants/" +
                                                          staus?.user_id
                                                      );
                                                    }}
                                                    src={Driver_action1}
                                                    alt=""
                                                    className="c-pointer"
                                                  />
                                                  {/* <img
                                                    src={Driver_action2}
                                                    alt=""
                                                    className="c-pointer"
                                                  /> */}
                                                </td>
                                              </tr>
                                            );
                                          })}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          </Col>
                        </Tab.Container>
                      </Tab.Pane>
                      <Tab.Pane eventKey="four">
                        <div className="transport-main row m-0 p-0">
                          <div className="common-table details-tabel-main">
                            <table className="assigned-trips-table">
                              <thead>
                                <tr>
                                  <th>{t("Sr.no")}</th>
                                  <th>{t("Trip Name")}</th>
                                  <th>{t("Trip Type")}</th>
                                  <th>{t("Action")}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {tabsDetails &&
                                  tabsDetails.length > 0 &&
                                  tabsDetails?.map((staus, index) => {
                                    return (
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                          {staus?.trip_name
                                            ? staus?.trip_name
                                            : "no trip name available"}
                                        </td>
                                        <td>{staus?.trip_category?staus?.trip_category:"not available"}</td>

                                        <td>
                                    { staus.trip_id&&     <img
                                            onClick={() =>
                                              navigate(
                                                "/ViewDispatchTrip/" + staus.trip_id
                                              )
                                            }
                                            src={Driver_action1}
                                            alt=""
                                            className="c-pointer"
                                          />}
                                      {  staus.trip_id&&   <img
                                            src={edit}
                                            alt=""
                                            className="c-pointer"
                                            onClick={() =>
                                              navigate(
                                                "/EditDispatchTrip/" + staus.trip_id
                                              )
                                            }
                                          />}
                                          {/* <img
                                            src={deleteIcon}
                                            alt=""
                                            className="c-pointer"
                                          
                                          /> */}
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Tab.Pane>
                <Tab.Pane eventKey="1">
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="first"
                  >
                    <Nav variant="pills" id="newTabMai" className="mb-3">
                      <Nav.Item>
                        <Nav.Link
                          eventKey="first"
                          onClick={() => {
                            setTabsDetails([])
                            setUrlTaps(ApiConfig.CONFIURATION_INF_GPRS);

                            getDetailstabsApi(
                              ApiConfig.CONFIURATION_INF_GPRS +
                                `?imei=${
                                  vehicleDetails?.vehicle_imei
                                    ? vehicleDetails?.vehicle_imei
                                    : ""
                                }`
                            );
                          }}
                        >
                          {t("GPRS Configuration")}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="second"
                          className="custon-link"
                          onClick={() => {
                            setTabsDetails([])
                            setUrlTaps(ApiConfig.CONFIURATION_INF_DF);

                            getDetailstabsApi(
                              ApiConfig.CONFIURATION_INF_DF +
                                `?imei=${
                                  vehicleDetails?.vehicle_imei
                                    ? vehicleDetails?.vehicle_imei
                                    : ""
                                }`
                            );
                          }}
                        >
                          {t("Data Frequency Configuration")}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <div className="transport-main row m-0 p-0">
                          <div className="common-table details-tabel-main">
                            <table className="gps-config-table">
                              <thead>
                                <tr>
                                  <th>{t("Particular")}</th>
                                  <th>{t("Values")}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{t("APN Name")} </td>
                                  <td>{tabsDetails[0]?.username}</td>
                                </tr>
                                <tr>
                                  <td>{t("GPRS ID")} </td>
                                  <td>{tabsDetails[0]?.username}</td>
                                </tr>
                                <tr>
                                  <td>{t("Password")} </td>
                                  <td>{tabsDetails[0]?.password}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div className="transport-main row m-0 p-0 mb-3">
                          <div className="common-table details-tabel-main">
                            <table className="gps-config-table">
                              <thead>
                                <tr>
                                  <th>{t("Data Genrating Frequency")}</th>
                                  <th>{t("Values")}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{t("Data Genrating Frequency")}  </td>
                                  <td>{t("0.5s")} </td>
                                </tr>
                                <tr>
                                  <td>{t("Data Genrating Frequency")} </td>
                                  <td>{t("10s")} </td>
                                </tr>
                                <tr>
                                  <td>{t("Vehicle Parked on Home Network")} </td>
                                  <td>{t("50s")} </td>
                                </tr>
                                <tr>
                                  <td>{t("Vehicle Parked on Roaming Network")} </td>
                                  <td>{t("1.05s")} </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="transport-main row m-0 p-0">
                          <div className="common-table details-tabel-main">
                            <table className="gps-config-table">
                              <thead>
                                <tr>
                                  <th>{t("Data Sending Frequency")}</th>
                                  <th>{t("Values")}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{t("Data Genrating Frequency")} </td>
                                  <td>{t("0.5s")} </td>
                                </tr>
                                <tr>
                                  <td>{t("Data Genrating Frequency")} </td>
                                  <td>{t("10s")} </td>
                                </tr>
                                <tr>
                                  <td>{t("Vehicle Parked on Home Network")} </td>
                                  <td>{t("50s")} </td>
                                </tr>
                                <tr>
                                  <td>{t("Vehicle Parked on Roaming Network")} </td>
                                  <td>{t("1.05s")} </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                  <div className="transport-main row m-0 p-0 mb-3">
                    <div className="common-table details-tabel-main table-width-700">
                      <table className="alert-table">
                        <thead>
                          <tr>
                            <th>{t("Sr.No")}</th>
                            <th>{t("Alert Name")}</th>
                            <th>{t("Date & Time")}</th>
                            <th>{t("GPS Position")}</th>
                            {/* <th>{t("Location")}</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {tabsDetails &&
                            tabsDetails?.length > 0 &&
                            tabsDetails?.map((staus, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{staus?.alert_type_alert_name}</td>
                                  <td>{`${staus?.logged_date} ${staus?.cur_time}`}</td>
                                  <td>{`${staus?.latitude} ${staus?.latitude_direction} ${staus?.longitude} ${staus?.longitude_direction}`}</td>
                                  {/* <td>
                                    {staus?.location
                                      ? staus.location
                                      : "No Loaction found"}
                                  </td> */}
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="3">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="vehicle-doc-card">
                        <label htmlFor="" className="">
                        {t("Registration Certificate")}  
                        </label>

                        <div className="doc-inner">
                          <img
                            src={
                              // vehicleDetails?.registration_certificate
                                // ?
                                 `${ApiConfig.BASE_URL}${vehicleDetails?.registration_certificate}`
                                // : licence
                            }
                            alt={t("No Document available")} 
                            onClick={handleShowdocs}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="vehicle-doc-card">
                        <label htmlFor="" className="">
                        {t("Insurance Copy")}  
                        </label>
                        <div className="doc-inner">
                          <img
                            src={
                              // vehicleDetails?.insurance_copy
                                // ?
                                 `${ApiConfig.BASE_URL}${vehicleDetails?.insurance_copy}`
                                // : insurance
                            }
                            alt={t("No Document available")} 
                            onClick={handleShowdocs}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="vehicle-doc-card">
                        <label htmlFor="" className="">
                       {t("Pollution Certificate")}   
                        </label>
                        <div className="doc-inner">
                          <img
                            src={
                              // vehicleDetails?.pollution_certificate
                              //   ? 
                                `${ApiConfig.BASE_URL}${vehicleDetails?.pollution_certificate}`
                                // : pollution
                            }
                            alt={t("No Document available")} 
                            onClick={handleShowdocs}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Tab.Container>
        </div>
          </>}
         
        </div>
        <Modal
          show={showdocs}
          onHide={handleClosedocs}
          centered
          className="common-model"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <img src={licence} alt="" className="w-100" />
          </Modal.Body>
        </Modal>
        <Modal
          show={show}
          onHide={handleClose}
          centered
          className="common-model"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("Delete Vehicle")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {t("Are you sure you want to delete this vehicle")} ?
          </Modal.Body>
          <Modal.Footer className="pop-up-modal-footer btn-wrapper">
            <button className="cx-btn-1" onClick={handleClose}>
              {t("Close")}
            </button>
            <button className="cx-btn-2" onClick={assignvehicletDelete}>
              {t("Yes")}
            </button>
          </Modal.Footer>
        </Modal>

        
        <Modal
            show={show2}
            onHide={handleClose2}
            centered
            className="common-model"
          >
            {/* <Modal.Header closeButton>
              <Modal.Title>{t('Change Feature Status')}</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
              {t(
                // `Do  you want  to ${
                //   featureActionData.is_active == true ? 'Enable' : 'Disable'
                // } this Feature ?`
                imbStatusData?.feature_set_value==="activated"
                  ? "Do you want to deactivate immobilization? Once deactivated, the vehicle will start during the next ignition. Are you sure you want to proceed?"
                  : "Do you want to activate immobilization? Once activated, the vehicle will not start during the next ignition. Do you wish to continue?"
              )}
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer btn-wrapper">
              <button className="cx-btn-1" onClick={()=>{
                handleClose2()
                ActivationCancle()
                }}>
                {t("Cancel")}
              </button>
              <button
                className="cx-btn-2"
                onClick={() => {
                  vehicletImobilization();
                }}
              >
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>
      </motion.div>
    </>
  );
};

export default VehicleDetails;

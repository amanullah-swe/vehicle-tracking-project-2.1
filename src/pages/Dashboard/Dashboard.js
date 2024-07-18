import React, { useState, useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "../../assets/styles/main.scss";
import Multiselect from "multiselect-react-dropdown";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Vehicle1 from "../../assets/images/vehicle-green.svg";
import Vehicle2 from "../../assets/images/vehicle-red.svg";
import vehicle6 from "../../assets/images/vehicle-green-yellow.svg";
import vehicle7 from "../../assets/images/vehicle-green-aqua.svg";
import route from "../../assets/images/route.svg";
import { motion } from "framer-motion";
import yellowCar from "../../assets/images/yellow-card-map.svg";
import customer from "../../assets/images/customer.svg";
import running from "../../assets/images/running.svg";
import parked from "../../assets/images/parked.svg";
import untracked from "../../assets/images/untracked.svg";
import idle from "../../assets/images/idle.svg";
import copy from "../../assets/images/Copy.svg";
import { Tab, Tabs, Form, Modal, TabContent } from "react-bootstrap";
// import { MultiSelect } from "react-multi-select-component";
import { MultiSelect } from "primereact/multiselect";
import MapComponent from "../../sharedComponent/MapComponent";
import { useTranslation } from "react-i18next";
import GoogleMapComponent from "../../sharedComponent/GoogleMap/GoogleMapComponent";
import { simpleGetCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import mqtt from "precompiled-mqtt";
import { CopyToClipboard } from "react-copy-to-clipboard";
import NoDataComp from "../../sharedComponent/NoDataComp";
import VehicleActive1 from "./VehicleActive1";
import VehicleActive2 from "./VehicleActive2";
import { Select, Space } from "antd";
import { useSelector } from "react-redux";
const { Option } = Select;
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const Dashboard = () => {
  let accessRights = useSelector((state) => state.auth.accessRights);
  const addonSettingData = useSelector((state) => state.auth.addonModule);
  const userRole = accessRights && accessRights.rights_role;
  const {
    sidebar,
    setSidebar,
    socket,
    language,
    setMapZoomValue,
    triggerMap,
    setTriggerMap,
    customerData,
    googleMap,
    triggerMapBoundKey,
    setTriggerMapBoundKey,
    setRegionCord,
    onlineCount,
    setOnlineCount,
    setCenterDragged,
    triggerMapBoundKeyRandom,
    setTriggerMapBoundKeyRandom,
    setMapLayer,
    setMapRectangle,
    setRadiusDraw,
    setCircle,
    timeZone,
    setRecordsPerPage,
  } = useContext(AppContext);
  const currentRoute = useLocation().pathname;
  const { t, i18n } = useTranslation();
  const navigation = useNavigate();
  // Multi Select Component

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedVehicleData, setSelectedVehicleData] = useState([]);
  const [selectedGroupData, setSelectedGroupData] = useState([]);
  const [groupVehicleList, setGroupVehicleList] = useState([]);
  const [singleVehicleList, setSingleVehicleList] = useState([]);
  const [flags, setFlags] = useState(true);
  const [statusList, setStatusList] = useState([
    { name: t("Running"), idName: "B" },
    { name: t("Parked"), idName: "A" },
    { name: t("Idle"), idName: "d" },
    { name: t("Untracked"), idName: "U" },
  ]);

  // Overlay on click
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [bikeBg, setBikeBg] = useState(false);
  // Right Tabs show / hide
  const [isShown, setIsShown] = useState(false);
  const [isShown1, setIsShown1] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
  const [isShown3, setIsShown3] = useState(false);
  const [isShown4, setIsShown4] = useState(false);
  const [isShown5, setIsShown5] = useState(false);
  const [shareLink, setShareLink] = useState(false);
  const [ShareCureentLink, setShareCureentLink] = useState(false);
  const [shareLinkData, setShareLinkData] = useState("10");
  const [ShareCureentlatitudeLink, setShareCureentlatitudeLink] = useState("");
  const [ShareCureentlongitudeLink, setShareCureentlongitudeLink] =
    useState("");
  console.log("ShareCureentlatitudeLink", ShareCureentlatitudeLink);
  console.log("ShareCureentlongitudeLink", ShareCureentlongitudeLink);
  //live data  with all dsetaials
  const [mapDataLive, setMapDataLive] = useState([]);
  const [runningData, setRuningData] = useState([]);
  const [parkedData, setParkedData] = useState([]);
  const [idleData, setIdleData] = useState([]);
  const [trakedData, setTrakedData] = useState([]);
  const [untrakedData, setUnTrakedData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [scheduleCount, setScheduleCount] = useState(0);
  const [dispatchData, setDispatchData] = useState([]);
  const [selectedPopmMrker, setSelectedPopMarker] = useState(0);
  const [customerSettingdata, setCustomerSettingdata] = useState({});
  const [dashboardVehicle, setDashboardVehicle] = useState([]);
  const url = new URL(ApiConfig?.BASE_URL);
  const hostName = url.host;
  let signalPublish = `${hostName}/signals`;
  let customerId = Number(customerData?.customer_id);
  const [connectStatus, setConnectStatus] = useState("allVehicle");
  const [filterData, setFilterData] = useState([]);
  const [liveStatus, setLiveStatus] = useState({});

  const GenralSettings = () => {
    simpleGetCall(ApiConfig.GET_ALL_GENRAL_SETTING)
      .then((res) => {
        if (res.result) {
          setRecordsPerPage(res.data?.customer_page_limit);
          setCustomerSettingdata(res?.data);
          localStorage.setItem("page_limit", res.data?.customer_page_limit);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {});
  };
  const getVehicleList = () => {
    simplePostCall(
      ApiConfig.VEHICLEGROUP_AllVEHICLE_DROPDOWN,
      JSON.stringify({ key: "VehicleList" })
    )
      .then((res) => {
        if (res.success === true) {
          setSingleVehicleList(res.data);
        }
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

  const getScheduleTrips = () => {
    simplePostCall(
      ApiConfig.GET_TRIP_LIST,
      JSON.stringify({
        name: "",
        email: "",
        number: "",
        time: "",
        page: 1,
        type: "planned",
      })
    )
      .then((res) => {
        if (res.result == true) {
          setScheduleData(res?.data ? res.data : []);
          setScheduleCount(res.total_count);
        } else {
          setScheduleData([]);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  // connection of mqtt local
  // 1440,1121

  //routew

  useEffect(() => {
    if (currentRoute == "/dashboard" || currentRoute == "/Dashboard") {
      if (customerId) getVehicleList();
      getGroupList();
      GenralSettings();
      getScheduleTrips();
    }
  }, [customerId]);

  useEffect(() => {
    setMapLayer([]);
    setMapRectangle([]);
    setRadiusDraw("");
    setCircle([]);
  }, []);

  // filter data to publish  grup  vehicle and status  fron Frontend
  useEffect(() => {
    if (timeZone != "undefined" && timeZone != "null") {
      if (connectStatus === "group_id") {
        // let newData = filterData.map((ele) => ele.vehicle_group_id);
        setFlags(true);
        dashboardallvehicledata({
          user_customer_id: customerId,
          group_id: filterData.join(),
          timeZone: timeZone,
        });
      }
      if (connectStatus === "imei") {
        // let newData = filterData.map((ele) => ele.vehicle_imei);
        setFlags(true);
        dashboardallvehicledata({
          user_customer_id: customerId,
          imei: filterData.join(),
          timeZone: timeZone,
        });
      }
      if (connectStatus === "running_status") {
        let newData = filterData.map((ele) => ele.idName);
        setFlags(true);
        dashboardallvehicledata({
          user_customer_id: customerId,
          running_status: filterData.join(),
          timeZone: timeZone,
        });
      }
      if (connectStatus === "allVehicle") {
        setFlags(true);
        dashboardallvehicledata({
          user_customer_id: customerId,
          timeZone: timeZone,
        });
      }
    }
  }, [connectStatus, filterData, timeZone]);

  useEffect(() => {
    if (
      selectedStatus.length === 0 &&
      selectedVehicleData.length === 0 &&
      selectedGroupData.length === 0
    ) {
      setConnectStatus("allVehicle");
    }
  }, [selectedGroupData, selectedStatus, selectedVehicleData, flags]);

  // client conncetion and recive data to show
  useEffect(() => {
    if (customerId && timeZone != "undefined" && timeZone != "null" && socket) {
      const data = { user_customer_id: customerId, timeZone: timeZone };
      socket && socket.emit("allVehicles", data);
      socket &&
        socket.on(`getNotification/${customerId}`, (data) => {
          setLiveStatus(JSON.parse(data));
        });
    }
  }, [socket, customerId, timeZone]);

  useEffect(() => {
    let dataforfilterNew = [...dashboardVehicle];
    let newLiveData =
      dataforfilterNew.length > 0 &&
      dataforfilterNew &&
      dataforfilterNew?.map((vc) => {
        if (vc.vehicle_imei == liveStatus.imei) {
          return { ...vc, ...liveStatus };
        } else {
          return { ...vc };
        }
      });
    setDashboardVehicle(newLiveData ? newLiveData : []);
    let run =
      newLiveData && newLiveData
        ? newLiveData?.filter((ele) => ele?.metering_status == "B")
        : [];
    let park =
      newLiveData && newLiveData
        ? newLiveData?.filter((ele) => ele?.metering_status == "A")
        : [];
    let idle =
      newLiveData && newLiveData
        ? newLiveData?.filter((ele) => ele?.metering_status == "d")
        : [];
    setRuningData(run);
    setParkedData(park);
    setIdleData(idle);
    setOnlineCount(
      Number(run?.length) + Number(park?.length) + Number(idle?.length)
    );
    setTrakedData(
      newLiveData
        ? newLiveData?.filter((ele) => ele?.metering_status == "U")
        : []
    );
  }, [liveStatus]);
  useEffect(() => {
    setMapDataLive(dashboardVehicle);
  }, [dashboardVehicle]);
  const dashboardallvehicledata = (data) => {
    simplePostCall(ApiConfig.MQTTCONNECTION, JSON.stringify(data))
      .then((res) => {
        if (res.result === true) {
          let data = res?.data;
          setDashboardVehicle(data);
          setMapDataLive(data);
          setRuningData(data?.filter((ele) => ele?.metering_status == "B"));
          setParkedData(data?.filter((ele) => ele?.metering_status == "A"));
          setIdleData(data?.filter((ele) => ele?.metering_status == "d"));
          setTrakedData(data?.filter((ele) => ele?.metering_status == "U"));
          setUnTrakedData(res?.neverTracked ? res?.neverTracked : []);
          setOnlineCount(res.count);
          setTriggerMapBoundKey(res.randomNumber);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {});
  };

  // time zonew
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsShown(false);
        setIsShown1(false);
        setIsShown2(false);
        setIsShown3(false);
        setIsShown4(false);
        setIsShown5(false);
      }
    };

    document.addEventListener("pointerleave", handleClickOutside);

    return () => {
      document.removeEventListener("pointerleave", handleClickOutside);
    };
  }, []);

  return (
    <>
      <motion.div
        className={sidebar && sidebar ? "taskMain " : "cx-active taskMain"}
        id="cx-main"
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
        key={"motionAnimation"}
      >
        <div
          id="cx-wrapper"
          className="dashboard_responsive"
          key={"mainContainer"}
        >
          <div className="main-dashboard-wrapper">
            <div className="topsection">
              {(userRole === "customer" ||
                accessRights?.rights_dashboard_map == 1) && (
                <>
                  {/* <p>{t("Location Overview")}</p> */}
                  <div className="dropdown-wrapper" style={{ flex: 1 }}>
                    <div
                      className="row"
                      style={{ width: "100%" }}
                      key={"multiselctVAlues"}
                    >
                      <div
                        className="col-md-4 margin-lft-response"
                        key={"multiselct001"}
                      >
                      {
                        accessRights?.rights_manage_vehiclegroup == 1  ? 
                        <>
                        <div className="multi-select-1">
                          <Select
                            mode="multiple" // Enable multiple selection
                            style={{
                              width: "95%",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            // placeholder={`Groups (${groupVehicleList?.length})`}
                            placeholder={t("Groups_taleeb", {groups_length :groupVehicleList?.length }) }
                            key={"selectedGroupData"}
                            onChange={(selectedValues) => {
                              setConnectStatus("group_id");
                              setSelectedStatus([]);
                              setSelectedVehicleData([]);
                              setSelectedGroupData(selectedValues);
                              setFilterData(selectedValues);
                            }}
                            value={selectedGroupData}
                            optionLabelProp="label"
                            filterOption={(input, option) =>
                              option?.label
                                ?.toLowerCase()
                                ?.indexOf(input?.toLowerCase()) >= 0
                            }
                          >
                            {groupVehicleList?.map((data, index) => (
                              <Option
                                key={data?.vehicle_group_id}
                                value={data?.vehicle_group_id}
                                label={data?.vehicle_group_name}
                                style={{ color: "rgba(156, 73, 0)" }}
                              >
                                <Space>
                                  <span
                                    role="group"
                                    aria-label={data.vehicle_group_id}
                                  >
                                    {data.vehicle_group_name}
                                  </span>
                                </Space>
                              </Option>
                            ))}
                          </Select>
                         
                        </div>
                        </>
                        :<></>
                    }
                      </div>
                      <div className="col-md-4" key={"multiselct002"}>
                        <div className="multi-select-1">
                          <Select
                            mode="multiple" // Enable multiple selection
                            style={{
                              width: "95%",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            // placeholder={`Vehicle (${singleVehicleList?.length})`}
                            placeholder={t("Vehicle_taleeb",{vehicle_length : singleVehicleList?.length}) }
                            optionLabelProp="label"
                            onChange={(selectedValues) => {
                              setConnectStatus("imei");
                              setSelectedGroupData([]);
                              setSelectedStatus([]);
                              setSelectedVehicleData(selectedValues);
                              setFilterData(selectedValues);
                            }}
                            value={selectedVehicleData}
                            filterOption={(input, option) =>
                              option?.label
                                ?.toLowerCase()
                                ?.indexOf(input?.toLowerCase()) >= 0
                            }
                          >
                            {singleVehicleList?.map((data, index) => (
                              <Option
                                key={data?.vehicle_number}
                                value={data?.vehicle_imei}
                                label={data?.vehicle_number}
                                style={{ color: "rgba(156, 73, 0)" }}
                              >
                                <Space>
                                  <span
                                    role="vehicle"
                                    aria-label={data?.vehicle_number}
                                  >
                                    {data?.vehicle_number}
                                  </span>
                                </Space>
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div className="col-md-4" key={"multiselct003"}>
                        <div className="multi-select-1">
                          <Select
                            mode="multiple" // Enable multiple selection
                            style={{
                              width: "95%",
                              color: "rgba(156, 73, 0, 0.5)",
                            }}
                            // placeholder={`Status (${statusList?.length})`}
                            placeholder={t("Status_taleeb", {status_length :statusList?.length}) }
                            optionLabelProp="label"
                            onChange={(selectedValues) => {
                              setConnectStatus("running_status");
                              setSelectedGroupData([]);
                              setSelectedVehicleData([]);
                              setSelectedStatus(selectedValues);
                              setFilterData(selectedValues);
                            }}
                            value={selectedStatus}
                            filterOption={(input, option) =>
                              option?.label
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {statusList.map((status, index) => (
                              <Option
                                key={status?.name}
                                value={status?.idName}
                                label={status?.name}
                                style={{ color: "rgba(156, 73, 0)" }}
                              >
                                <Space>
                                  <span role="status" aria-label={status.name}>
                                    {status?.name}
                                  </span>
                                </Space>
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div
              className="dashboard-main-map"
              style={{ height: "calc(100vh - 150px)" }}
              key={"mapContainerOuter"}
            >
              <div className="dashboard-inner-wrapper" key={"mapContainer"}>
                {(userRole === "customer" ||
                  accessRights?.rights_dashboard_map == 1) && (
                  <div className="map-wrapper left">
                    <MapComponent
                      componentId={"dashBoard"}
                      iconMarker={yellowCar}
                      mapDataLive={mapDataLive}
                      setShareLink={setShareLink}
                      setShareCureentLink={setShareCureentLink}
                      setShareLinkData={setShareLinkData}
                      setShareCureentlatitudeLink={setShareCureentlatitudeLink}
                      setShareCureentlongitudeLink={
                        setShareCureentlongitudeLink
                      }
                      selectedPopmMrker={selectedPopmMrker}
                      setSelectedPopMarker={setSelectedPopMarker}
                      customerSettingdata={customerSettingdata}
                    />
                    {/* // )} */}
                  </div>
                )}

                <div className="right-vehicle-status-wrapper right">
                  <Tab.Container id="right-tabs-example">
                    {(userRole === "customer" ||
                      accessRights?.rights_dashboard_map == 1) && (
                      <Col sm={12}>
                        <Nav
                          ref={navRef}
                          variant="pills"
                          className="flex-column rvs-nav"
                          data-bs-custom-class="custom-tooltip"
                        >
                          <Nav.Item
                            className="vehicle1 vehicle-tabs"
                            onClick={() => {
                              setIsShown(!isShown);
                              setIsShown1(false);
                              setIsShown2(false);
                              setIsShown3(false);
                              setIsShown4(false);
                              setIsShown5(false);
                              // setTriggerMap(false)
                            }}
                          >
                            <Nav.Link eventKey="first" title={t("Running")}>
                              <img src={Vehicle1} alt="" />
                              <span>{runningData?.length}</span>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item
                            className="vehicle1 vehicle-tabs"
                            onClick={() => {
                              console.log("isShown4");
                              setIsShown4(!isShown4);
                              setIsShown1(false);
                              setIsShown2(false);
                              setIsShown(false);
                              setIsShown5(false);
                              setIsShown3(false);
                              // setTriggerMap(false)
                            }}
                          >
                            <Nav.Link eventKey="second" title={t("Idle")}>
                              <img src={vehicle6} alt="" />
                              <span>{idleData?.length}</span>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item
                            className="vehicle1 vehicle-tabs"
                            onClick={() => {
                              console.log("isShown5");
                              setIsShown5(!isShown5);
                              setIsShown(false);
                              setIsShown1(false);
                              setIsShown2(false);
                              setIsShown3(false);
                              setIsShown4(false);
                              // setTriggerMap(false)
                            }}
                          >
                            <Nav.Link eventKey="third" title={t("Parked")}>
                              <img src={vehicle7} alt="" />
                              <span>{parkedData?.length}</span>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item
                            className="vehicle1 vehicle-tabs"
                            onClick={() => {
                              setIsShown1(!isShown1);
                              setIsShown(false);
                              setIsShown2(false);
                              setIsShown3(false);
                              setIsShown4(false);
                              setIsShown5(false);
                            }}
                          >
                            <Nav.Link eventKey="fourth" title={t("Untracked")}>
                              <img src={Vehicle2} alt="" />
                              <span>
                                {trakedData?.length + untrakedData?.length}
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                          {(userRole === "customer" ||
                            accessRights.rights_view_trips == 1) && (
                            <Nav.Item
                              className="vehicle1 vehicle-tabs"
                              onClick={() => {
                                {
                                  //
                                  setIsShown2(!isShown2);
                                  setIsShown3(false);
                                  setIsShown1(false);
                                  setIsShown(false);
                                  setIsShown4(false);
                                  setIsShown5(false);
                                  // setTriggerMap(false)
                                }
                              }}
                            >
                              <Nav.Link eventKey="fifth" title="Scheduled">
                                <img src={route} alt="" />
                                <span>{scheduleCount}</span>
                              </Nav.Link>
                            </Nav.Item>
                          )}

                          <Nav.Item
                            className="vehicle1 vehicle-tabs"
                            onClick={() => {
                              {
                                setIsShown3(false);
                                setIsShown1(false);
                                setIsShown2(false);
                                setIsShown4(false);
                                setIsShown5(false);
                                setIsShown(false);
                                setMapLayer([]);
                                setMapRectangle([]);
                                setRadiusDraw("");
                                setCircle([]);
                                setTriggerMap(!triggerMap);
                              }
                            }}
                          >
                            <Nav.Link eventKey="sixth" title="Map Resize">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 8 8"
                              >
                                <path
                                  fill="#35a6bf"
                                  d="M0 0v8h8V5.62a.5.5 0 0 0 0-.22V-.01H0zm1 1h6v4H5.5a.5.5 0 0 0-.09 0a.5.5 0 1 0 .09 1H7v1H1V1zm2.5 1C2.67 2 2 2.67 2 3.5C2 4.5 3.5 6 3.5 6S5 4.5 5 3.5C5 2.67 4.33 2 3.5 2zm0 1c.28 0 .5.22.5.5s-.22.5-.5.5s-.5-.22-.5-.5s.22-.5.5-.5z"
                                />
                              </svg>

                              {/* <span>{t("Boundries")}</span> */}
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                    )}
                    {(userRole === "customer" ||
                      accessRights?.rights_dashboard_map == 1) && (
                      <Col sm={12}>
                        <div className="outer-new">
                          <Tab.Content
                            className={"vehicle-main-tab"}
                            id={isShown ? "vehicle-main-tab-active" : ""}
                          >
                            <Tab.Pane eventKey="first">
                              <div className="dashboard-first-item">
                                <div className="style-vehicle-btn1"></div>
                                <Tab.Container
                                  id="left-tabs-example"
                                  className="va-tab-wrapper"
                                  defaultActiveKey="0"
                                >
                                  <Row className={!isShown ? "none" : ""}>
                                    <Col sm={12}>
                                      <Nav
                                        variant="pills"
                                        className="va-nav tabs-custom-width-2-50"
                                      >
                                        <Nav.Item
                                          className="va-tab"
                                          id="diffWidth"
                                        >
                                          <Nav.Link
                                            className="va-link"
                                            eventKey="0"
                                          >
                                            {t("Running")} (
                                            {runningData?.length})
                                          </Nav.Link>
                                        </Nav.Item>
                                      </Nav>
                                    </Col>

                                    <Col sm={12}>
                                      <Tab.Content>
                                        <Tab.Pane
                                          eventKey="0"
                                          key={"runningData120"}
                                        >
                                          <div className="running-status-card-wrapper">
                                            {runningData &&
                                            runningData.length > 0 ? (
                                              runningData?.map((ele, index) => {
                                                return (
                                                  <>
                                                    <div
                                                      className="status-card active"
                                                      key={"running" + index}
                                                      onClick={() => {
                                                        setSelectedPopMarker(
                                                          ele.vehicle_id
                                                        );
                                                        setTriggerMapBoundKeyRandom(
                                                          Math.floor(
                                                            Math.random() *
                                                              10000000
                                                          )
                                                        );
                                                        setCenterDragged([
                                                          Number(ele?.latitude),
                                                          Number(
                                                            ele?.longitude
                                                          ),
                                                        ]);
                                                      }}
                                                    >
                                                      <div
                                                        className="first-active-card-main row"
                                                        onClick={() => {
                                                          setBikeBg(!bikeBg);
                                                          setShow(!show);
                                                        }}
                                                        ref={target}
                                                        key={"running" + index}
                                                      >
                                                        <div className="col-4 data-content">
                                                          <label htmlFor="">
                                                            {t("Driver Name")}
                                                          </label>
                                                          <p>
                                                            {ele?.user_name}
                                                          </p>
                                                        </div>
                                                        <div className="col-4 data-content">
                                                          <label htmlFor="">
                                                            {t("Vehicle Type")}
                                                          </label>
                                                          <p>
                                                            {ele?.vehicle_type_code
                                                              ? ele?.vehicle_type_code
                                                              : ""}
                                                          </p>
                                                        </div>
                                                        <div className="col-4 data-content">
                                                          <label htmlFor="">
                                                            {t("Vehicle No")}.
                                                          </label>
                                                          <p>
                                                            {
                                                              ele?.vehicle_number
                                                            }
                                                          </p>
                                                        </div>
                                                        <div className="col-4 data-content">
                                                          <label htmlFor="">
                                                            {t("From")}
                                                          </label>
                                                          <p>..</p>
                                                        </div>
                                                        <div className="col-4 data-content">
                                                          <label htmlFor="">
                                                            {t(
                                                              "Distance Travelled"
                                                            )}
                                                          </label>
                                                          <p>
                                                            {
                                                              ele?.vehicle_type_total_distance_travelled
                                                            }
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </>
                                                );
                                              })
                                            ) : (
                                              <NoDataComp />
                                            )}
                                          </div>
                                        </Tab.Pane>
                                      </Tab.Content>
                                    </Col>
                                  </Row>
                                </Tab.Container>
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        </div>
                        {/* {../../../../../} */}
                        <div className="outer-new">
                          <Tab.Content
                            className={"vehicle-main-tab"}
                            id={isShown4 ? "vehicle-main-tab-active" : ""}
                          >
                            <Tab.Pane eventKey="second">
                              <div className="dashboard-first-item">
                                <div className="style-vehicle-btn23"></div>
                                <Tab.Container
                                  id="left-tabs-example"
                                  className="va-tab-wrapper"
                                  defaultActiveKey="0"
                                >
                                  <Row className={!isShown4 ? "none" : ""}>
                                    <Col sm={12}>
                                      <Nav
                                        variant="pills"
                                        className="va-nav tabs-custom-width-2-50"
                                      >
                                        <Nav.Item
                                          className="va-tab"
                                          id="diffWidth"
                                        >
                                          <Nav.Link
                                            className="va-link"
                                            eventKey="0"
                                          >
                                            {t("Idle")}({idleData?.length})
                                          </Nav.Link>
                                        </Nav.Item>
                                      </Nav>
                                    </Col>

                                    <Col sm={12}>
                                      <Tab.Content>
                                        <Tab.Pane
                                          eventKey="0"
                                          key={"runningData120"}
                                        >
                                          <div className="running-status-card-wrapper">
                                            {idleData &&
                                            idleData?.length > 0 ? (
                                              idleData?.map((ele, index) => {
                                                return (
                                                  <div
                                                    className="status-card active"
                                                    onClick={() => {
                                                      setSelectedPopMarker(
                                                        ele.vehicle_id
                                                      );
                                                      setTriggerMapBoundKeyRandom(
                                                        Math.floor(
                                                          Math.random() *
                                                            10000000
                                                        )
                                                      );
                                                      setCenterDragged([
                                                        Number(ele?.latitude),
                                                        Number(ele?.longitude),
                                                      ]);
                                                    }}
                                                    key={"idleData" + index}
                                                  >
                                                    <div className="first-active-card-main row">
                                                      <div className="col-4 data-content">
                                                        <label htmlFor="">
                                                          {t("Driver Name")}
                                                        </label>
                                                        <p>{ele?.user_name}</p>
                                                      </div>
                                                      <div className="col-4 data-content">
                                                        <label htmlFor="">
                                                          {t("Vehicle Type")}
                                                        </label>
                                                        <p>
                                                          {ele?.vehicle_type_code
                                                            ? ele?.vehicle_type_code
                                                            : ""}
                                                        </p>
                                                      </div>
                                                      <div className="col-4 data-content">
                                                        <label htmlFor="">
                                                          {t("Vehicle No")}.
                                                        </label>
                                                        <p>
                                                          {ele?.vehicle_number}
                                                        </p>
                                                      </div>
                                                      <div className="col-4 data-content">
                                                        <label htmlFor="">
                                                          {t("From")}
                                                        </label>
                                                        <p>..</p>
                                                      </div>
                                                      <div className="col-4 data-content">
                                                        <label htmlFor="">
                                                          {t(
                                                            "Distance Travelled"
                                                          )}
                                                        </label>
                                                        <p>
                                                          {
                                                            ele?.vehicle_type_total_distance_travelled
                                                          }
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              })
                                            ) : (
                                              <NoDataComp />
                                            )}
                                          </div>
                                        </Tab.Pane>
                                      </Tab.Content>
                                    </Col>
                                  </Row>
                                </Tab.Container>
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        </div>

                        {/* {../../../../../.././} */}
                        {/* {../../../../../../../../../} */}
                        <div className="outer-new">
                          <Tab.Content
                            className={"vehicle-main-tab"}
                            id={isShown5 ? "vehicle-main-tab-active" : ""}
                          >
                            <Tab.Pane eventKey="third">
                              <div className="dashboard-first-item">
                                <div className="style-vehicle-btn24"></div>
                                <Tab.Container
                                  id="left-tabs-example"
                                  className="va-tab-wrapper"
                                  defaultActiveKey="0"
                                >
                                  <Row className={!isShown5 ? "none" : ""}>
                                    <Col sm={12}>
                                      <Nav
                                        variant="pills"
                                        className="va-nav tabs-custom-width-2-50"
                                      >
                                        <Nav.Item
                                          className="va-tab"
                                          id="diffWidth"
                                        >
                                          <Nav.Link
                                            className="va-link"
                                            eventKey="0"
                                          >
                                            {t("Parked")} ({parkedData?.length})
                                          </Nav.Link>
                                        </Nav.Item>
                                      </Nav>
                                    </Col>
                                    <Col sm={12}>
                                      <Tab.Content>
                                        <Tab.Pane
                                          eventKey="0"
                                          key={"runningData120"}
                                        >
                                          <div className="running-status-card-wrapper">
                                            {parkedData &&
                                            parkedData.length > 0 ? (
                                              parkedData.map((ele, index) => {
                                                return (
                                                  <>
                                                    <div className="status-card d-flex justify-content-center  active">
                                                      <div
                                                        className="first-active-card-main row"
                                                        onClick={() => {
                                                          setSelectedPopMarker(
                                                            ele.vehicle_id
                                                          );
                                                          setTriggerMapBoundKeyRandom(
                                                            Math.floor(
                                                              Math.random() *
                                                                10000000
                                                            )
                                                          );
                                                          setCenterDragged([
                                                            Number(
                                                              ele?.latitude
                                                            ),
                                                            Number(
                                                              ele?.longitude
                                                            ),
                                                          ]);
                                                        }}
                                                        key={
                                                          "parkedData" + index
                                                        }
                                                      >
                                                        <div className="col-4 data-content">
                                                          <label htmlFor="">
                                                            {t("Driver Name")}
                                                          </label>
                                                          <p>
                                                            {ele?.user_name}
                                                          </p>
                                                        </div>
                                                        <div className="col-4 data-content">
                                                          <label htmlFor="">
                                                            {t("Vehicle Type")}
                                                          </label>
                                                          <p>
                                                            {ele?.vehicle_type_code
                                                              ? ele?.vehicle_type_code
                                                              : ""}
                                                          </p>
                                                        </div>
                                                        <div className="col-4 data-content">
                                                          <label htmlFor="">
                                                            {t("Vehicle No")}.
                                                          </label>
                                                          <p>
                                                            {ele?.vehicle_number
                                                              ? ele.vehicle_number
                                                              : ""}
                                                          </p>
                                                        </div>
                                                        <div className="col-4 data-content">
                                                          <label htmlFor="">
                                                            {t("From")}
                                                          </label>
                                                          <p>..</p>
                                                        </div>
                                                        <div className="col-4 data-content">
                                                          <label htmlFor="">
                                                            {t(
                                                              "Distance Travelled"
                                                            )}
                                                          </label>
                                                          <p>
                                                            {
                                                              ele?.vehicle_type_total_distance_travelled
                                                            }
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </>
                                                );
                                              })
                                            ) : (
                                              <NoDataComp />
                                            )}
                                          </div>
                                        </Tab.Pane>
                                      </Tab.Content>
                                    </Col>
                                  </Row>
                                </Tab.Container>
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        </div>
                        {/* {../../../../../../../../../} */}

                        {(userRole === "customer" ||
                          accessRights?.rights_dashboard_map == 1) && (
                          <Tab.Content
                            className={"vehicle-main-tab"}
                            id={isShown1 ? "vehicle-main-tab-active" : ""}
                          >
                            <Tab.Pane eventKey="fourth">
                              <div className={!isShown1 ? "none" : ""}>
                                <div className="style-vehicle-btn25"></div>
                                {
                                  <VehicleActive1
                                    componentId={"status1"}
                                    trakedData={trakedData}
                                    untrakedData={untrakedData}
                                    setSelectedPopMarker={setSelectedPopMarker}
                                  />
                                }
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        )}

                        {accessRights.rights_view_trips == 1 && (
                          <Tab.Content
                            className={"vehicle-main-tab"}
                            id={isShown2 ? "vehicle-main-tab-active" : ""}
                          >
                            <Tab.Pane eventKey="fifth">
                              <div className={!isShown2 ? "none" : ""}>
                                <div className="style-vehicle-btn26"></div>
                                {
                                  <VehicleActive2
                                    componentId={"status2"}
                                    scheduleData={scheduleData}
                                    scheduleCount={scheduleCount}
                                  />
                                }
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        )}

                        <div
                          className={
                            isShown3
                              ? "dashboard-first-item dashboard-first-item-active"
                              : "dashboard-first-item"
                          }
                        >
                          <div className="style-vehicle-btn4"></div>
                          <Tab.Content
                            className={
                              isShown3
                                ? "tools-main-tab tools-main-tab-active"
                                : "tools-main-tab"
                            }
                          ></Tab.Content>
                        </div>
                      </Col>
                    )}
                  </Tab.Container>
                </div>
                {/* Bottom Wrapper */}
              </div>

              {/* Right SideBar */}
            </div>
          </div>
        </div>
      </motion.div>

      {timeZone && customerData && (
        <Modal
          Modal
          show={shareLink}
          onHide={() => setShareLink(false)}
          centered
          size="md"
          className="common-model copy_Link"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("Share Tracking Location")}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pb-2">
            <p>{t("Link to Share")}</p>
            <input
              type="text"
              Value={`${
                ` ${ApiConfig?.BASE_URL_SHARE}DashboardShare/` +
                shareLinkData +
                `&user_customer_id=${
                  customerData?.customer_id
                }&timeZone=${timeZone?.replace("/", "-")}`
              }`}
              className="form-control"
            />
            <div className="copy_body d-flex justify-content-end">
              <CopyToClipboard
                text={`${
                  ` ${ApiConfig?.BASE_URL_SHARE}DashboardShare/` +
                  shareLinkData +
                  `&user_customer_id=${
                    customerData?.customer_id
                  }&timeZone=${timeZone?.replace("/", "-")}`
                }`}
                onCopy={() => setShareLink(false)}
              >
                <button className="cx-btn-2  mt-2">
                  <img src={copy} alt="" />
                  {t("Copy Link")}
                </button>
              </CopyToClipboard>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {timeZone && customerData && (
        <Modal
          Modal
          show={ShareCureentLink}
          onHide={() => setShareCureentLink(false)}
          centered
          size="md"
          className="common-model copy_Link"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("Share Current Loaction")}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pb-2">
            <p>{t("Share Link")}</p>
            <input
              type="text"
              value={`https://www.google.com/maps?q=${ShareCureentlatitudeLink},${ShareCureentlongitudeLink}`}
              className="form-control"
            />
            <div className="copy_body d-flex justify-content-end">
              <CopyToClipboard
                text={`https://www.google.com/maps?q=${ShareCureentlatitudeLink},${ShareCureentlongitudeLink}`}
                onCopy={() => setShareCureentLink(false)}
              >
                <button className="cx-btn-2  mt-2">
                  <img src={copy} alt="" />
                  {t("Copy Link")}
                </button>
              </CopyToClipboard>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {/* Delete Modal End */}
    </>
  );
};

export default Dashboard;

import React, { useState, useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import "../../../assets/styles/main.scss";
import Multiselect from "multiselect-react-dropdown";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Vehicle1 from "../../../assets/images/vehicle-green.svg";
import Vehicle2 from "../../../assets/images/vehicle-red.svg";
import route from "../../../assets/images/route.svg";
import { motion } from "framer-motion";
import yellowCar from "../../../assets/images/yellow-card-map.svg";
import customer from "../../../assets/images/customer.svg";
import running from "../../../assets/images/running.svg";
import parked from "../../../assets/images/parked.svg";
import untracked from "../../../assets/images/untracked.svg";
import idle from "../../../assets/images/idle.svg";
import copy from "../../../assets/images/Copy.svg";
import { Tab, Tabs, Form, Modal } from "react-bootstrap";
// import { MultiSelect } from "react-multi-select-component";
import { MultiSelect } from "primereact/multiselect";
import MapComponent from "../../../sharedComponent/MapComponent";
import { useTranslation } from "react-i18next";
import GoogleMapComponent from "../../../sharedComponent/GoogleMap/GoogleMapComponent";
import { simpleGetCall, simplePostCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import mqtt from "precompiled-mqtt";
import { CopyToClipboard } from "react-copy-to-clipboard";
import NoDataComp from "../../../sharedComponent/NoDataComp";
// import VehicleActive1 from "./VehicleActive1";
// import VehicleActive2 from "./VehicleActive2";
import { Select, Space } from "antd";
import { useSelector } from "react-redux";
import { notifyError } from "../../../sharedComponent/notify";
import DispatchOrder from "./DispatchOrder";
const { Option } = Select;
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const DashboardDispatch = () => {
  let accessRights = useSelector((state) => state.accessRights);
  const addonSettingData = useSelector((state) => state.addonModule);
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
  let navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedVehicleData, setSelectedVehicleData] = useState([]);
  const [selectedGroupData, setSelectedGroupData] = useState([]);
  const [groupVehicleList, setGroupVehicleList] = useState([]);
  const [singleVehicleList, setSingleVehicleList] = useState([]);
  const [flags, setFlags] = useState(true);
  const [statusList, setStatusList] = useState([
    { name: "Running", idName: "B" },
    { name: "Parked", idName: "A" },
    { name: "Idle", idName: "d" },
    { name: "Untracked", idName: "U" },
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
  const [shareLink, setShareLink] = useState(false);
  const [shareLinkData, setShareLinkData] = useState("10");
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
  //new implimemtataion
  const [mapView, setMapView] = useState(false);
  const [mearchantList, setMearchantList] = useState([]);
  const [mearchantSelcted, setMearchantSelected] = useState([]);
  const [customerList, setCustomer] = useState([]);
  const [customerSelected, setCustomerSelected] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const [driverSelected, setDriverSelected] = useState([]);
  const [orderDropList, setOrderDrop] = useState([]);
  const [orderDropSelected, setOrderDropSelected] = useState([]);
  const DriverListDropDown = () => {
    let body = JSON.stringify({});
    simplePostCall(
      ApiConfig.VEHICLE_DROWPDOWN,
      JSON.stringify({
        key: "DriversList",
      })
    )
      .then((res) => {
        if (res.result) {
          setDriverList(res.data);
        } else {
          notifyError(res.message);
        }
      })
      .catch((errr) => {
        console.log("errr", errr);
      })
      .finally(() => {
        // setLoading1(false);
      });
  };
  const MarchantListDropDown = () => {
    let body = JSON.stringify({});
    simplePostCall(ApiConfig?.MARCHANT_DROPDOWN, body)
      .then((res) => {
        if (res.result) {
          setMearchantList(res?.data);
        } else {
          notifyError(res.message);
        }
      })
      .catch((errr) => {
        console.log("errr", errr);
      })
      .finally(() => {
        // setLoading1(false);
      });
  };
  useEffect(() => {
    DriverListDropDown();
    MarchantListDropDown();
  }, []);

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
    if (
      currentRoute == "/DashboardDispatch" ||
      currentRoute == "/DashboardDispatch"
    ) {
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
                  <p
                    className="cx-btn-2 btnmap"
                    onClick={() => {
                      navigate("/DispatchOrder");
                    }}
                  >
                    {t("List View")}
                  </p>
                  <div className="dropdown-wrapper">
                    <div
                      className="row"
                      style={{ width: "100%" }}
                      key={"multiselctVAlues"}
                    >
                      <div className="col-md-4" key={"multiselct002"}>
                        <div className="multi-select-1">
                          <Select
                            mode="multiple" // Enable multiple selection
                            style={{ width: "100%" }}
                            placeholder={`Driver  ${driverList?.length}`}
                            key={"oreder"}
                            onChange={(selectedValues) => {
                              setDriverSelected(selectedValues);
                            }}
                            value={driverSelected}
                            optionLabelProp="label"
                            filterOption={(input, option) =>
                              option?.label
                                ?.toLowerCase()
                                ?.indexOf(input?.toLowerCase()) >= 0
                            }
                          >
                            {driverList?.map((data, index) => (
                              <Option
                                key={data?.user_id}
                                value={data?.user_id}
                                label={data?.user_name}
                              >
                                <Space>
                                  <span role="driver" aria-label={data.user_id}>
                                    {data?.user_name}
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
                            style={{ width: "100%" }}
                            placeholder={`Merchant  ${mearchantList?.length}`}
                            key={"selectedGroupData"}
                            onChange={(selectedValues) => {
                              setMearchantSelected(selectedValues);
                              // console.log(selectedValues, "selectedValues");
                              // setConnectStatus("group_id");
                              // setSelectedStatus([]);
                              // setSelectedVehicleData([]);
                              // setSelectedGroupData(selectedValues);
                              // setFilterData(selectedValues);
                            }}
                            value={mearchantSelcted}
                            optionLabelProp="label"
                            filterOption={(input, option) =>
                              option?.label
                                ?.toLowerCase()
                                ?.indexOf(input?.toLowerCase()) >= 0
                            }
                          >
                            {mearchantList?.map((data, index) => (
                              <Option
                                key={data?.vendor_id}
                                value={data?.vendor_id}
                                label={data?.vendor_name}
                              >
                                <Space>
                                  <span
                                    role="group"
                                    aria-label={data?.vendor_id}
                                  >
                                    {data?.vendor_name}
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
              style={{ height: "calc(100vh - 188px)" }}
              key={"mapContainerOuter"}
            >
              <div className="dashboard-inner-wrapper" key={"mapContainer"}>
                {(userRole === "customer" ||
                  accessRights?.rights_dashboard_map == 1) && (
                  <div className="map-wrapper left">
                    {/* {googleMap === "googleMap" && <GoogleMapComponent />} */}
                    {/* {googleMap === "leaflet" && ( */}
                    <MapComponent
                      componentId={"dashBoard"}
                      iconMarker={yellowCar}
                      mapDataLive={mapDataLive}
                      setShareLink={setShareLink}
                      setShareLinkData={setShareLinkData}
                      selectedPopmMrker={selectedPopmMrker}
                      setSelectedPopMarker={setSelectedPopMarker}
                      customerSettingdata={customerSettingdata}
                    />
                    {/* // )} */}

                    <div className="bottom-wrapper">
                      <div className="bottom-status">
                        <img src={customer} alt="" />
                        <span>{t("Running")}</span>
                      </div>
                      <div className="bottom-status">
                        <img src={running} alt="" />
                        <span>{t("Parked")}</span>
                      </div>
                      <div className="bottom-status">
                        <img src={parked} alt="" />
                        <span>{t("Untracked")}</span>
                      </div>
                      <div className="bottom-status">
                        <img src={untracked} alt="" />
                        <span>{t("Idle")}</span>
                      </div>
                      <div className="bottom-status">
                        <img src={idle} alt="" />
                        <span>{t("Customer")}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="right-vehicle-status-wrapper right">
                  <Tab.Container id="right-tabs-example">
                    {(userRole === "customer" ||
                      accessRights?.rights_dashboard_map == 1) && (
                      <Col sm={12}>
                        <Nav variant="pills" className="flex-column rvs-nav">
                          <Nav.Item
                            className="vehicle1 vehicle-tabs"
                            onClick={() => {
                              setIsShown(!isShown);
                              setIsShown1(false);
                              setIsShown2(false);
                              setIsShown3(false);
                              // setTriggerMap(false)
                            }}
                          >
                            <Nav.Link eventKey="first">
                              <img src={Vehicle1} alt="" />
                              <span>
                                {runningData?.length +
                                  idleData?.length +
                                  parkedData?.length}
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                          {/* <Nav.Item
                            className="vehicle1 vehicle-tabs"
                            onClick={() => {
                              setIsShown1(!isShown1);
                              setIsShown(false);
                              setIsShown2(false);
                              setIsShown3(false);
                            }}
                          >
                            <Nav.Link eventKey="second">
                              <img src={Vehicle2} alt="" />
                              <span>
                                {trakedData?.length + untrakedData?.length}
                              </span>
                            </Nav.Link>
                          </Nav.Item> */}
                          {/* {(userRole === "customer"  ||accessRights.rights_view_trips==1) &&    <Nav.Item
                            className="vehicle1 vehicle-tabs"
                            onClick={() => {
                              {
                                //
                                setIsShown2(!isShown2);
                                setIsShown3(false);
                                setIsShown1(false);
                                setIsShown(false);
                                // setTriggerMap(false)
                              }
                            }}
                          >
                            <Nav.Link eventKey="third">
                              <img src={route} alt="" />
                              <span>{scheduleCount}</span>
                            </Nav.Link>
                          </Nav.Item>} */}
                          <Nav.Item
                            className="vehicle1 vehicle-tabs"
                            onClick={() => {
                              {
                                setIsShown3(false);
                                setIsShown1(false);
                                setIsShown2(false);
                                setIsShown(false);
                                setMapLayer([]);
                                setMapRectangle([]);
                                setRadiusDraw("");
                                setCircle([]);
                                setTriggerMap(!triggerMap);
                              }
                            }}
                          >
                            <Nav.Link eventKey="fourth">
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
                              <div className="">
                                <DispatchOrder />
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        </div>

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
            <Modal.Title>{t("Share Location")}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pb-2">
            <p>{t("Link to share")}</p>
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
      {/* Delete Modal End */}
    </>
  );
};

export default DashboardDispatch;

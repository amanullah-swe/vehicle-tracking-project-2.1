import { React, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import SideIc from "../../../assets/images/sideBar.svg";
import View from "../../../assets/images/Group.svg";
import { OverlayTrigger, Tooltip, Tab, Tabs, Nav, Col } from "react-bootstrap";
import Delete from '../../../assets/images/delete.svg'
import Rider from "../../../assets/images/rider.png";
import RiderView from "../../../assets/images/ReAssign-driver.svg";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
import Pagenation from "../../../sharedComponent/Pagenation";
import {
  simpleDeleteCall,
  simpleGetCall,
  simpleGetCallTime,
  simplePostCall,
} from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { useEffect } from "react";
import Loader from "../../../sharedComponent/Loader";
import moment from "moment";
import { useTranslation } from "react-i18next";
import {
  DateDDMMYYYY,
  convertGMTToLocal,
  getTime,
} from "../../../sharedComponent/common";
import { useSelector } from "react-redux";
import NoDataComp from "../../../sharedComponent/NoDataComp";
import { Space, TimePicker, Select } from "antd";
import { Modal } from "react-bootstrap";
import CommonSelect from "../../../sharedComponent/ReactSelect";
import dayjs from "dayjs";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import end_Trip from "../../../assets/images/trip_end.png";
import end_Trip_vew from "../../../assets/images/cancel-trip.svg";
import EditIc from "../../../assets/images/ic-edit.svg";
import MapComponent from "../../../sharedComponent/MapComponent";
import { addonSetting } from "../../../store/loginSlice";
import { set } from "date-fns";

const { Option } = Select;
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const DispatchOrder = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  // const userRole = accessRights && accessRights.rights_role;
  const userRole = "noRole";
  const addonSettingData = useSelector((state) => state.auth.addonModule);
  const [dispatch_executive, set_dispatch_executive] = useState(true);
  const [DeleteId, setDeleteId] = useState('')
  const [multiple_order_data, set_multiple_order_data] = useState([]);
  const [multiple_order_data_flag, set_multiple_order_data_flag] = useState(false);

  const {
    sidebar,
    useDebounce,
    setViewId,
    recordsPerPage,
    timeZone,
    socket,
    customerData,
    dispatchStatus,
    setDispatchStatus,
    linkState,
    getTransporatioData,
    setTriggerMapBoundKey,
  } = useContext(AppContext);
  console.log("dispatchStatus", dispatchStatus);
  const { t, i18n } = useTranslation();
  const renderTooltipForView = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("View")}
    </Tooltip>
  );
  const renderTooltipForDelete = props => (
    <Tooltip id='button-tooltip' {...props}>
      {t('Delete')}
    </Tooltip>
  )
  const renderTooltipForView1 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("Assign Trip")}
    </Tooltip>
  );
  const renderTooltipForRider = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("ReAssign Driver")}
    </Tooltip>
  );
  const renderTooltipForEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("Edit")}
    </Tooltip>
  );
  // const renderTooltipForDelete = (props) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     {t("Cancel Trip")}
  //   </Tooltip>
  // );
  let navigate = useNavigate();
  const [filter, setFilter] = useState({
    orderNumber: "",
    custName: "",
    Pickup: "",
    Drop: "",
  });
  const [loading, setLoading] = useState(false);
  const [last_page, setlast_page] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [mapView, setMapView] = useState(false);
  const [mearchantList, setMearchantList] = useState([]);
  const [mearchantSelcted, setMearchantSelected] = useState([]);
  const [customerList, setCustomer] = useState([]);
  const [customerSelected, setCustomerSelected] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const [driverSelected, setDriverSelected] = useState([]);
  const [orderDropList, setOrderDrop] = useState([]);
  const [orderDropSelected, setOrderDropSelected] = useState([]);
  const [statusOrder, setStatusOrder] = useState(1);
  const debouncedSearchTerm = useDebounce(filter, 500);
  const debouncedstatusOrder = useDebounce(statusOrder, 500);
  const debouncedmearchantSelcted = useDebounce(mearchantSelcted, 500);
  const debouncedriverSelected = useDebounce(driverSelected, 500);
  const [defaltkey, setDefaltkey] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  console.log("selectedOrders", selectedOrders);
  const [Multipalmodelstats, setMultipalModelstats] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // or "desc"
  console.log("sortOrder", sortOrder);
  console.log("orderList", orderList);
  const [sortColumn, setSortColumn] = useState("dispatch_package_order_number");
  const handleCheckboxChange = (selectedOrder) => {
    setSelectedOrders((prevSelected) => {
      if (
        prevSelected.some(
          (o) => o.dispatch_package_id === selectedOrder.dispatch_package_id
        )
      ) {
        // If the selected order is already in the list, remove it
        return prevSelected.filter(
          (o) => o.dispatch_package_id !== selectedOrder.dispatch_package_id
        );
      } else {
        // If the selected order is not in the list, add it
        return [...prevSelected, selectedOrder];
      }
    });
  };
  useEffect(() => {
    if (dispatchStatus === "pending") {
      setDefaltkey("Pending");
      setStatusOrder("0");
      setPage(1);
      getOrderList("0", 1, "key");
    }
    if (dispatchStatus === "Progress") {
      setDefaltkey("In Progress");
      setDriverShow(true);
      getVehicleList();
      setStatusOrder("1,2,3,4");
      setPage(1);
      getOrderList("1,2,3,4", 1, "key");
    }
    if (dispatchStatus === "Completed") {
      setDefaltkey("Completed");
      setDriverShow(true);
      setStatusOrder("5,6,7");
      setPage(1);
      getOrderList("5,6,7", 1, "key");
    }
    if (dispatchStatus === "All") {
      setDefaltkey("All");
      setDriverShow(true);
      setStatusOrder("");
      setPage(1);
      getOrderList("", 1, "key");
    }
  }, [
    debouncedSearchTerm,
    debouncedstatusOrder,
    debouncedmearchantSelcted,
    debouncedriverSelected,
    mapView,
  ]); //defaltkey if issue with renfder add dependency

  const getOrderList = (statusOrder, page1, key) => {
    key == "key" && setLoading(true);
    let pageNumber = mapView ? null : page1;
    simpleGetCall(
      ApiConfig.GET_ORDER_LIST +
      pageNumber +
      `&dispatch_customer_name=${filter?.custName
      }&dispatch_package_order_number=${filter?.orderNumber}&page_limit=${mapView ? null : recordsPerPage
      }&dispatch_package_status=${statusOrder}&merchants=${mearchantSelcted?.join(
        ","
      )}&drivers=${driverSelected?.join(",")}&pickUp=${filter?.Pickup
      }&dropLocation=${filter?.Drop}`
    )
      .then((res) => {
        if (res.result) {
          setlast_page(res?.last_page);
          if (key == "key" && page1 == 1) {
            // setOrderList(res.resultQuery);
            const sortedOrders = sortData(res.resultQuery);
            setOrderList(sortedOrders);
            setlast_page(res.last_page);
            setTotalPages(res?.total);
          } else {
            setOrderList([...orderList, ...res.resultQuery]);
            setlast_page(res?.last_page);
            setTotalPages(res?.total);
          }
          setTriggerMapBoundKey(Math.floor(Math.random() * 10000000));
        } else {
          setOrderList([]);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [routingData, setRoutingData] = useState({
    trip_start_time: dayjs(new Date()).format("HH:mm:ss"),
    trip_end_time: "",
    vehicle_id: "",
  });
  //live Data
  const [vehicleList, setVehicleList] = useState([]);
  const [liveStatus, setLiveStatus] = useState([]);
  const [dashboardVehicle, setDashboardVehicle] = useState([]);
  const [driverShow, setDriverShow] = useState(false);
  useEffect(() => {
    if (socket && statusOrder == "1,2") {
      socket &&
        socket?.on(`getNotification/${customerData?.customer_id}`, (data) => {
          setLiveStatus(JSON.parse(data));
        });
    }
  }, [socket, statusOrder, customerData?.customer_id]);
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
  }, [liveStatus]);

  useEffect(() => {
    let newArray = orderList.map((item) => {
      let vehicleList1 = vehicleList.find(
        (updated) => updated.imei === item.imei
      );
      item = { ...item, ...vehicleList1 };
      return item;
    });
    setDashboardVehicle(newArray);
  }, [orderList, vehicleList]);

  const getOrderListTime = (startPoint, EndPoint) => {
    simpleGetCallTime(
      `https://routing.openstreetmap.de/routed-car/route/v1/driving/${startPoint};${EndPoint}?overview=false&alternatives=true&steps=false`
    )
      .then((res) => {
        if (res.code == "Ok") {
          const route = res.routes[0];
          // const distance = route.summary.totalDistance; // in meters
          const currentTime = new Date()
            .toLocaleTimeString("en-US", { timeZone, hour12: false })
            .split(" ")[0];
          const time = new Date(Date.now() + route?.duration * 1000)
            .toLocaleTimeString("en-US", { timeZone, hour12: false })
            .split(" ")[0];
          // setEndSendTime(time)
          setRoutingData({
            ...routingData,
            trip_start_time: currentTime,
            trip_end_time: time,
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [loading1, setLoading1] = useState(false);
  const [orderDetailsSend, setOrderDetailsSend] = useState("");
  useEffect(() => {
    if (timeZone) {
      getVehicleList();
      // getOrderDetails();
    }
    // getTransporatioData();
  }, [timeZone]);

  const [errMsg, setErrMsg] = useState({
    trip_end_time: "",
    trip_start_time: "",
    vehicle_id: "",
  });
  const handalevalidation = () => {
    if (routingData?.vehicle_id.length === 0) {
      setErrMsg({
        ...errMsg,
        vehicle_id: t("Please Select Vehicle"),
      });
      return;
    }
    // if (routingData?.trip_start_time.length === 0) {
    //   setErrMsg({
    //     ...errMsg,
    //     trip_start_time: "Please Enter  start Time",

    //   });
    //   return;
    // }

    // if (routingData?.trip_end_time.length === 0) {
    //   setErrMsg({
    //     ...errMsg,
    //     trip_end_time: "Please Enter  End Time ",

    //   });
    //   return;
    // }
    setLoading1(true);
    let body = /* multiple_order_data_flag ? JSON.stringify(multiple_order_data) : */ JSON.stringify({

      ...routingData,
      order_id: orderDetailsSend?.order_id,
      // orderDetails:   orderDetailsSend === "" ? selectedOrders : orderDetailsSend,
      orderDetails: multiple_order_data_flag ? multiple_order_data : (orderDetailsSend === "" ? selectedOrders : orderDetailsSend),

      // drowtype: layerTypeSend,
      // drowradius: radius,
      // drowvalue: mapLatLngData,
      timeZone: timeZone,
      vehicle_id: routingData?.vehicle_id,
      // ...(multiple_order_data_flag ? multiple_order_data : {})
    });

    let body2 = multiple_order_data;
    simplePostCall(ApiConfig.ADD_MANUAL_ROUTING_VIEW, body)
      .then((res) => {
        setLoading1(false);
        if (res.result) {
          notifySuccess(res.message);
          setModelstats(false);
          setOrderDetailsSend("");
          setMultipalModelstats(false);
          setPage(1);
          getOrderList(statusOrder, "key");
          setDispatchStatus("pending");
          localStorage.setItem("dispatchKey", "pending");
          setSelectedOrders([]);
        } else {
          notifyError(res.message);
        }
      })
      .catch((errr) => {
        console.log("errr", errr);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getVehicleList = () => {
    setLoading(true);
    simplePostCall(
      ApiConfig.MANUAL_VEHICLE_LIST,
      JSON.stringify({ timeZone: timeZone })
    )
      .then((res) => {
        setVehicleList(res?.data);
        let vehicles = res?.data;
        var grades = [];
        vehicles?.map((grade, index) => {
          grades.push({
            label: grade.vehicle_number,
            value: grade.vehicle_id,
          });
        });
        setGradeState({ ...gradeState, grades: grades });
      })
      .catch((err) => {
        console?.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  let driver = vehicleList?.filter(
    (driver) => driver.vehicle_id == routingData?.vehicle_id
  )[0];
  const [gradeState, setGradeState] = useState({
    grades: [],
  });
  const [modelstats, setModelstats] = useState(false);

  const handleModel = (props) => {
    setModelstats(props);
  };
  const handleModelmultipal = (props) => {
    if (selectedOrders.length === 0) {
      notifySuccess(t("Select Multiple Order"));
    } else {
      setMultipalModelstats(props);
      // setSelectedOrders([])
    }
  };
  const [modelstats1, setModelstats1] = useState(false);
  const handleModel1 = (props) => {
    setModelstats1(props);
  };
  const handleCancle = (pros) => {
    notifySuccess(pros);
  };
  const ReassignDriver = () => {
    if (routingData?.vehicle_id.length === 0) {
      setErrMsg({
        ...errMsg,
        vehicle_id: t("Please Select Vehicle"),
      });
      return;
    }
    setLoading1(true);
    let body = JSON.stringify({
      // ...routingData,
      order_id: orderDetailsSend?.order_id,
      orderDetails: orderDetailsSend,
      timeZone: timeZone,
      vehicle_id: routingData?.vehicle_id,
      trip_id: orderDetailsSend.trip_id,
    });
    simplePostCall(ApiConfig?.UPDATE_DRIVER_FOR_TRIP, body)
      .then((res) => {
        setLoading1(false);
        setModelstats1(false);
        if (res.result) {
          notifySuccess(res.message);
          getOrderList(statusOrder, 1, "key");
        } else {
          notifyError(res.message);
        }
      })
      .catch((errr) => {
        console.log("errr", errr);
      })
      .finally(() => {
        setLoading1(false);
      });
  };
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalPending, setDeleteModalPending] = useState(false);
  const [endTripData, setEndTripData] = useState({});
  const deleteItem = () => {
    setLoading(true);
    simplePostCall(
      ApiConfig.END_TRIP_ADMIN,
      JSON.stringify({ ...endTripData, timeZone: timeZone })
    )
      .then((res) => {
        if (res.result) {
          setPage(1);
          getOrderList(statusOrder, 1, "key");
          notifySuccess(res.message);
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
        setLoading1(false);
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
        setLoading1(false);
      });
  };
  useEffect(() => {
    DriverListDropDown();
    MarchantListDropDown();
  }, []);

  const renderSortArrow = (column) => {
    if (column === sortColumn) {
      return sortOrder === "asc" ? "🔼" : "🔽";
    }
    return null;
  };

  // const sortData = (data) => {
  //   const sortedData = [...data].sort((a, b) => {
  //     const columnA = a[sortColumn];
  //     const columnB = b[sortColumn];

  //     // Handle sorting based on the data type of the column (string, number, date, etc.)
  //     // Modify this logic based on your actual data types
  //     if (sortOrder === "asc") {
  //       return columnA > columnB ? 1 : -1;
  //     } else {
  //       return columnA < columnB ? 1 : -1;
  //     }
  //   });

  //   return sortedData;
  // };

  const sortData = (data) => {
    const sortedData = [...data].sort((a, b) => {
      const columnA = a[sortColumn];
      const columnB = b[sortColumn];

      // Handle sorting based on the data type of the column (string, number, date, etc.)
      // Modify this logic based on your actual data types
      if (sortOrder === "asc") {
        if (columnA > columnB) return 1;
        if (columnA < columnB) return -1;
        return 0;
      } else {
        if (columnA < columnB) return 1;
        if (columnA > columnB) return -1;
        return 0;
      }
    });

    return sortedData;
  };
  const handleSort = (column) => {
    console?.log(column);
    // Toggle the sorting order when the same column is clicked
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }

    // Sort the data locally based on the current sorting parameters
    const sortedOrders = sortData(orderList);
    setOrderList(sortedOrders);
  };

  const extractPrimaryLocation = (fullLocation) => {
    // Check if fullLocation is null or undefined
    if (!fullLocation) {
      return "";
    }

    // Assuming the location is separated by commas
    const parts = fullLocation.split(",");

    // Use the first two parts as the primary location
    const primaryLocation = parts.slice(0, 2).join(", ").trim();

    return primaryLocation;
  };
  function tripDelete() {
    let newRequestBody = JSON.stringify({
      dispatch_package_id: DeleteId,
      dispatch_package_status: 'remove'
    })
    simplePostCall(ApiConfig.DELETE_DISPATCH_PENDING_ORDER, newRequestBody)
      .then(data => {
        if (data.result) {
          // notifySuccess(data.message)
          if (data.message == "well done ! order status updated successfully") {
            notifySuccess('Order Deleted Successfully!')
          } else {
            notifySuccess(data.message)
          }
          setDeleteModalPending(false)
          getOrderList("0", 1, "key");
          // getVechicleAccident(1)
          // reportViewList( currentDate.toDayDate, yearStartDate, yearEndDate, firstDayOfMonth, endDayOfMonth, NextDateShow.toNextDate, optionData, weekStartDate, weekEndDate, page );

          // setPage(1)
        } else {
          notifyError(data.message)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }

  const handleCheckMultiple = (dispatch_package_id) => {
    let body = {
      dispatch_package_id: dispatch_package_id
    }

    simplePostCall(
      ApiConfig.VIEW_MULTIPLE_POINT,
      JSON.stringify(body)
    )
      .then((res) => {
        if (res?.result) {
          set_multiple_order_data(res?.data);
          set_multiple_order_data_flag(true);
        } else {
          set_multiple_order_data_flag(false);
        }
        // setVehicleList(res?.data);
        // let vehicles = res?.data;
        // var grades = [];
        // vehicles?.map((grade, index) => {
        //   grades.push({
        //     label: grade.vehicle_number,
        //     value: grade.vehicle_id,
        //   });
        // });
        // setGradeState({ ...gradeState, grades: grades });
      })
      .catch((err) => {
        console?.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

  }
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
        <div id="cx-wrapper" className="Dispatch_Order">
          {/* Top inputs for instatnt search */}
          <div className="d-flex justify-content-end"></div>

          {/* Tabs Section */}
          {defaltkey && (
            <div id="dispatchTabs">
              <Tab.Container
                id="left-tabs-example"
                className="td-tab-wrapper"
                defaultActiveKey={defaltkey}
              >
                <Nav
                  variant="pills"
                // id={addonSettingData?.addon_historical_data == 1 ? "InnerTabNew_Two" : "InnerTabNew_TwoAddOn"}
                // onSelect={selectedKey => setCurrentTab(`${selectedKey}`)}
                >
                  <Nav.Item>
                    <Nav.Link
                      className=""
                      eventKey="Pending"
                      onClick={() => {
                        setDriverShow(false);
                        setMapView(false);
                        setStatusOrder("0");
                        setDispatchStatus("pending");
                        localStorage.setItem("dispatchKey", "pending");
                      }}
                    // onClick={handleSelectActive}
                    >
                      {t("Pending")}
                      <span>{/* {totalActive} */}</span>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link
                      className=""
                      style={{}}
                      eventKey="In Progress"
                      onClick={() => {
                        setDriverShow(true);
                        // getVehicleList();
                        setStatusOrder("1,2,3,4");
                        setDispatchStatus("Progress");
                        localStorage.setItem("dispatchKey", "Progress");
                      }}
                    // onClick={handleSelectActive}
                    >
                      {t("In Progress")}
                      <span>{/* {totalActive} */}</span>
                    </Nav.Link>
                  </Nav.Item>
                  {addonSettingData.addon_historical_data == 1 && (
                    <Nav.Item>
                      <Nav.Link
                        className=""
                        eventKey="Completed"
                        onClick={() => {
                          setDriverShow(true);
                          setMapView(false);
                          setStatusOrder("6,5,7");
                          setDispatchStatus("Completed");
                          localStorage.setItem("dispatchKey", "Completed");
                        }}
                      // onClick={handleSelectActive}
                      >
                        {t("History")}
                        <span>{/* {totalActive} */}</span>
                      </Nav.Link>
                    </Nav.Item>
                  )}
                  <Nav.Item className="resp_correction">
                    <Nav.Link
                      className=""
                      eventKey="All"
                      onClick={() => {
                        setDriverShow(true);
                        setMapView(false);
                        setStatusOrder("");
                        setDispatchStatus("All");
                        localStorage.setItem("dispatchKey", "All");
                      }}
                    // onClick={handleSelectActive}
                    >
                      {t("All")}
                      <span>{/* {totalActive} */}</span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                {addonSettingData["addon_dispatch"] == 1 &&
                  accessRights?.rights_manage_delivery_requests ? (
                  <>
                    <Link to="/Importdata" className="">
                      <button className="cx-btn-3">{t("Import Data")}</button>
                    </Link>
                  </>
                ) : (
                  <></>
                )}

                {(userRole === "customer" &&
                  addonSettingData["addon_dispatch"] == 1) ||
                  (addonSettingData["addon_dispatch"] == 1 &&
                    accessRights &&
                    accessRights?.rights_manage_delivery_requests) ? (
                  // <Link to={addonSettingData?.addon_ghatke == 1 ? "/AddOrder" : "/DeliveryRequest"} className="">
                  <Link to='/DeliveryRequest' className="">
                    <button className="cx-btn-3">+ {addonSettingData.addon_ghatke == 1 ? t("Add Collection") : t('Add Order')}</button>
                  </Link>
                ) : null}
              </Tab.Container>
            </div>
          )}
          <div className="searchMainBox">
            <div className="searchsInsider">
              <div className="innerSelectBox weekCounter form_input_main">
                <Form.Control
                  required
                  type="text"
                  placeholder={t("Order Number")}
                  className="innerCust"
                  value={filter?.orderNumber}
                  onChange={(e) => {
                    setOrderList([]);
                    setFilter({ ...filter, orderNumber: e.target.value });
                  }}
                />
              </div>
              <div className="innerSelectBox weekCounter form_input_main">
                <Form.Control
                  required
                  name="Speed_limit"
                  placeholder={t("Customer Name")}
                  className="innerCust"
                  value={filter?.custName}
                  onChange={(e) => {
                    setOrderList([]);
                    setFilter({ ...filter, custName: e.target.value });
                  }}
                />
              </div>
              {dispatchStatus === "pending" ? (
                <>
                  <div className="innerSelectBox weekCounter form_input_main">
                    <Form.Control
                      required
                      name="Speed_limit"
                      placeholder={t("Pick-Up Location")}
                      className="innerCust"
                      value={filter?.Pickup}
                      onChange={(e) => {
                        setOrderList([]);
                        setFilter({ ...filter, Pickup: e.target.value });
                      }}
                    />
                  </div>
                  <div className="innerSelectBox weekCounter form_input_main">
                    <Form.Control
                      required
                      name="Speed_limit"
                      placeholder={t("Drop Location")}
                      className="innerCust"
                      value={filter?.Drop}
                      onChange={(e) => {
                        setOrderList([]);
                        setFilter({ ...filter, Drop: e.target.value });
                      }}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}

              {driverShow && (
                <div className="innerSelectBox weekCounter form_input_main">
                  <div className="col-md-12" key={"multiselct001"}>
                    <div className="multi-select-1">
                      <Select
                        mode="multiple" // Enable multiple selection
                        style={{ width: "100%" }}
                        placeholder={t("Driver Name", {
                          driver_length: driverList?.length,
                        })}
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
                        className="custom-select"
                      >
                        {driverList?.map((data, index) => (
                          <Option
                            key={data?.user_id}
                            style={{ color: "rgba(156, 73, 0)" }}
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
                </div>
              )}

              <div className="innerSelectBox weekCounter form_input_main">
                <div className="col-md-12" key={"multiselct001"}>
                  <div className="multi-select-1">
                    <Select
                      mode="multiple" // Enable multiple selection
                      style={{ width: "100%" }}
                      // placeholder={`Merchant  ${mearchantList?.length}`}
                      placeholder={t("Merchant", {
                        merchant_length: mearchantList?.length,
                      })}
                      key={"selectedGroupData"}
                      onChange={(selectedValues) => {
                        setMearchantSelected(selectedValues);
                      }}
                      value={mearchantSelcted}
                      optionLabelProp="label"
                      filterOption={(input, option) =>
                        option?.label
                          ?.toLowerCase()
                          ?.indexOf(input?.toLowerCase()) >= 0
                      }
                      className="custom-select"
                    >
                      {mearchantList?.map((data, index) => (
                        <Option
                          key={data?.vendor_id}
                          value={data?.vendor_id}
                          label={data?.vendor_name}
                          style={{ color: "rgba(156, 73, 0)" }}
                        >
                          <Space>
                            <span role="group" aria-label={data?.vendor_id}>
                              {data?.vendor_name}
                            </span>
                          </Space>
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              {accessRights?.rights_manage_delivery_requests ? (
                <>
                  <div className="innerSelectBox weekCounter form_input_main">
                    <Link
                      to="#"
                      className=""
                      onClick={() => {
                        handleModelmultipal(true);
                      }}
                    >
                      <button className="cx-btn-3">
                        + {addonSettingData.addon_ghatke == 1 ? t("Assign Multiple Collection") : t('Assign Multiple Order')}
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <></>
              )}

              {(userRole === "customer" &&
                addonSettingData["addon_dispatch"] == 1) ||
                (addonSettingData["addon_dispatch"] == 1 &&
                  accessRights &&
                  accessRights?.rights_manage_delivery_requests) ? (
                <>
                  {statusOrder == "1,2,3,4" && (
                    <div className="innerSelectBox weekCounter form_input_main">
                      <div className="col-md-12">
                        <button
                          className="cx-btn-2 btnmap"
                          onClick={() => {
                            setMapView(!mapView);
                            setTriggerMapBoundKey(
                              Math.floor(Math.random() * 10000000)
                            );
                          }}
                        >
                          {mapView ? t("List View") : t("Map View")}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>

          {/* Vehicle table */}
          {loading ? (
            <Loader />
          ) : (
            <>
              {mapView ? (
                <div className="DispatchMenuMap">
                  <div className="mainMapeOrdr">
                    <div className="map-main">
                      <MapComponent
                        componentId={"DispatchOrder"}
                        dispatchData={dashboardVehicle}
                      />
                      {/* <div className="flagComments">
                      <div className="me-2">
                        <img src={flagLine} alt="" />
                        <label>Start Point</label>
                      </div>
                      <img src={flagFill} alt="" />
                      <label>End Point</label>
                    </div> */}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="main-master-wrapper">
                  <div
                    id="scroll_insideThe_Padding_tabel"
                    onScroll={(e) => {
                      const bottom =
                        e.target.scrollHeight - e.target.scrollTop ===
                        e.target.clientHeight;
                      if (bottom && !last_page) {
                        setPage(page + 1);
                        console.log(page);
                        getOrderList(statusOrder, page, page == 1 ? "key" : "");
                      }
                    }}
                  >
                    <div className="VA_table">
                      {orderList && orderList?.length > 0 ? (
                        <table className="table tableAdmin">
                          <thead className="tableHead">
                            <tr>
                              {(dispatchStatus === "pending" && accessRights?.rights_manage_delivery_requests) ? (
                                <th>{t("Select Order")} </th>
                              ) : (
                                ""
                              )}

                              <th>{t("Sr.no")}</th>

                              <th
                                onClick={() =>
                                  handleSort("dispatch_package_order_number")
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {t("Order Number")}
                              </th>
                              {dispatchStatus === "pending" ? (
                                <>
                                  <th
                                    onClick={() =>
                                      handleSort(
                                        "dispatch_package_order_number"
                                      )
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    {t("Pick-Up Location")}
                                  </th>
                                  <th
                                    onClick={() =>
                                      handleSort(
                                        "dispatch_package_order_number"
                                      )
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    {t("Drop Location")}
                                  </th>
                                </>
                              ) : (
                                <>
                                  <th
                                    onClick={() =>
                                      handleSort(
                                        "dispatch_package_order_number"
                                      )
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    {t("Order Status")}
                                  </th>
                                  <th
                                    onClick={() =>
                                      handleSort(
                                        "dispatch_package_order_number"
                                      )
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    {t("Trip Id")}
                                  </th>
                                </>
                              )}
                              <th
                                onClick={() =>
                                  handleSort("dispatch_package_order_number")
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {t("Order Date & Time")}
                              </th>
                              {driverShow && (
                                <th
                                  onClick={() =>
                                    handleSort("dispatch_package_order_number")
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  {t("Driver Name")}
                                </th>
                              )}
                              <th
                                onClick={() =>
                                  handleSort("dispatch_package_order_number")
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {t("Customer Name")}
                              </th>

                              <th
                                onClick={() =>
                                  handleSort("dispatch_package_order_number")
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {t("Merchant Name")}
                              </th>
                              {(userRole == "customer" ||
                                accessRights?.rights_view_orders == 1) && (
                                  <th>{t("Action")}</th>
                                )}
                            </tr>
                          </thead>
                          <tbody className="tableBody">
                            {orderList?.map((order, index) => {
                              const maxLength = 27; // Set your desired maximum length
                              const address =
                                order?.dispatch_customer_address_address ||
                                "No address available";

                              const shortenedText =
                                address.length > maxLength
                                  ? address.substring(0, maxLength) + "..."
                                  : address;
                              return (
                                <tr key={"order" + index}>
                                  {(dispatchStatus === "pending" && accessRights?.rights_manage_delivery_requests) ? (
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked={selectedOrders.some(
                                          (o) =>
                                            o.dispatch_package_id ===
                                            order.dispatch_package_id
                                        )}
                                        onChange={() =>
                                          handleCheckboxChange(order)
                                        }
                                      />
                                    </td>
                                  ) : (
                                    ""
                                  )}

                                  <td>{index + 1}</td>

                                  <td>
                                    {order?.dispatch_package_order_number}
                                  </td>
                                  {dispatchStatus === "pending" ? (
                                    <>
                                      <td>
                                        {extractPrimaryLocation(
                                          order?.vendor_warehouse_address
                                        )}
                                      </td>
                                      <td>{shortenedText}</td>
                                    </>
                                  ) : (
                                    <>
                                      <td>
                                        {order?.dispatch_package_status == "0"
                                          ? "Order Received"
                                          : order?.dispatch_package_status ==
                                            "1"
                                            ? "Delivery Person Assigned"
                                            : order?.dispatch_package_status ==
                                              "2"
                                              ? "Order Dispatched"
                                              : order?.dispatch_package_status ==
                                                "3"
                                                ? "Rready to Delivery"
                                                : order?.dispatch_package_status ==
                                                  "4"
                                                  ? "Payment Done"
                                                  : order?.dispatch_package_status ==
                                                    "5"
                                                    ? "Order Delivered"
                                                    : order?.dispatch_package_status ==
                                                      "6"
                                                      ? "Returned"
                                                      : order?.dispatch_package_status ==
                                                        "7"
                                                        ? "Return Back to Warehouse"
                                                        : order?.dispatch_package_status ==
                                                          "8"
                                                          ? "Driver Reached For Pickup "
                                                          : order?.dispatch_package_status ==
                                                            "9"
                                                            ? "Driver Reached For Delivery"
                                                            : order?.dispatch_package_status ==
                                                              "10"
                                                              ? "cancelled"
                                                              : ""}
                                      </td>
                                      <td>
                                        {" "}
                                        <Link
                                          to={
                                            "/ViewDispatchTrip/" + order.trip_id
                                          }
                                          className="linkTxt"
                                        >
                                          {order.trip_id}
                                        </Link>
                                      </td>
                                    </>
                                  )}

                                  <td>
                                    {DateDDMMYYYY(
                                      order?.dispatch_package_order_datetime
                                    )}{" "}
                                    {getTime(
                                      order.dispatch_package_order_datetime
                                    )}
                                    {/* {`${order?.dispatch_package_order_datetime?.slice(0,19)?.split('T')[0]} ${order?.dispatch_package_order_datetime?.slice(0,19)?.split('T')[1]}` } */}
                                  </td>
                                  {driverShow && (
                                    <td>
                                      {order?.user_name
                                        ? order?.user_name
                                        : "not assign yet"}
                                    </td>
                                  )}
                                  <td>{order?.dispatch_customer_name}</td>

                                  <td>{order?.vendor_name}</td>
                                  <td>
                                    <div className="innerFlex d-flex align-items-center me-2 ">
                                      <>
                                        {(userRole == "customer" ||
                                          accessRights?.rights_view_orders ==
                                          1) && (
                                            <OverlayTrigger
                                              placement="top"
                                              delay={{ show: 250, hide: 400 }}
                                              overlay={renderTooltipForView}
                                            >
                                              <Link
                                                onClick={() => {
                                                  setViewId(
                                                    order?.dispatch_package_id
                                                  );
                                                  localStorage.setItem(
                                                    "orderId",
                                                    order?.dispatch_package_id
                                                  );
                                                }}
                                                to={
                                                  "/ViewOrders/" +
                                                  order.dispatch_package_id
                                                }
                                              >
                                                <div className="inconsIn d-flex">
                                                  <img
                                                    src={View}
                                                    className="mr-2"
                                                    alt=""
                                                  />
                                                </div>
                                              </Link>
                                            </OverlayTrigger>
                                          )}
                                        {/* {(userRole == "customer" ||
                                  accessRights?.rights_manage_orders) && ( */}

                                        {(statusOrder == "" ||
                                          statusOrder == 0) &&
                                          accessRights?.rights_manage_delivery_requests ==
                                          1 &&
                                          order.dispatch_package_status ==
                                          "0" && (
                                            <>
                                              <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltipForView1}
                                              >
                                                <Link
                                                  onClick={() => {
                                                    handleModel(true);
                                                    getOrderListTime(
                                                      [
                                                        Number(
                                                          order?.vendor_warehouse_longitude
                                                        ),
                                                        Number(
                                                          order?.vendor_warehouse_latitude
                                                        ),
                                                      ].join(","),
                                                      [
                                                        Number(
                                                          order?.dispatch_customer_address_longitude
                                                        ),
                                                        Number(
                                                          order?.dispatch_customer_address_latitude
                                                        ),
                                                      ].join(",")
                                                    );
                                                    setOrderDetailsSend(order);
                                                  }}
                                                >
                                                  <div className="inconsIn d-flex">
                                                    {/* Assign Trip */}
                                                    <img
                                                      src={SideIc}
                                                      className="mr-2"
                                                      alt=""
                                                      onClick={() => handleCheckMultiple(order?.dispatch_package_id)}
                                                    />
                                                  </div>
                                                </Link>
                                              </OverlayTrigger>

                                              <OverlayTrigger
                                                placement="bottom"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltipForEdit}
                                              >
                                                <Link
                                                  to={
                                                    "/DeliveryRequest/" +
                                                    order.dispatch_package_id
                                                  }
                                                >
                                                  <div className="inconsIn me-2">
                                                    <img src={EditIc} alt="" />
                                                  </div>
                                                </Link>
                                              </OverlayTrigger>
                                              <OverlayTrigger
                                                placement="bottom"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltipForDelete}
                                              >
                                                <Link
                                                  to='#' /* {
                                                    "/DeliveryRequest/" +
                                                    order.dispatch_package_id
                                                  } */
                                                  onClick={() => {
                                                    setDeleteId(order.dispatch_package_id)
                                                    setDeleteModalPending(true)
                                                  }}
                                                >
                                                  <div className="inconsIn me-3">
                                                    <img src={Delete} alt="" />
                                                  </div>
                                                </Link>
                                              </OverlayTrigger>
                                            </>
                                          )}

                                        {addonSettingData?.addon_ghatke == 1 ? (
                                          <></>
                                        ) : (
                                          <>
                                            {(statusOrder == "" ||
                                              statusOrder == "1,2,3,4") &&
                                              accessRights?.rights_manage_delivery_requests ==
                                              1 &&
                                              (order.dispatch_package_status ==
                                                "1" ||
                                                order.dispatch_package_status ==
                                                "3" ||
                                                order.dispatch_package_status ==
                                                "4" ||
                                                order.dispatch_package_status ==
                                                "2") && (
                                                <>
                                                  {" "}
                                                  <OverlayTrigger
                                                    placement="bottom"
                                                    delay={{
                                                      show: 250,
                                                      hide: 400,
                                                    }}
                                                    overlay={
                                                      renderTooltipForEdit
                                                    }
                                                  >
                                                    <Link
                                                      to={
                                                        "/DeliveryRequest/" +
                                                        order.dispatch_package_id
                                                      }
                                                    >
                                                      <div className="inconsIn me-3">
                                                        <img
                                                          src={EditIc}
                                                          alt=""
                                                        />
                                                      </div>
                                                    </Link>
                                                  </OverlayTrigger>
                                                  <OverlayTrigger
                                                    placement="top"
                                                    delay={{
                                                      show: 250,
                                                      hide: 400,
                                                    }}
                                                    overlay={
                                                      renderTooltipForRider
                                                    }
                                                  >
                                                    <Link>
                                                      <div
                                                        className="inconsIn d-flex "
                                                        onClick={() => {
                                                          setRoutingData({
                                                            ...routingData,
                                                            vehicle_id:
                                                              order?.trip_vehicle_id,
                                                          });
                                                          setOrderDetailsSend(
                                                            order
                                                          );
                                                          handleModel1(true);
                                                        }}
                                                      >
                                                        {/* Assign Trip */}
                                                        <img
                                                          src={RiderView}
                                                          className="mr-2"
                                                          alt=""
                                                          style={{
                                                            height: "20px",
                                                            width: "20px",
                                                          }}
                                                        />
                                                      </div>
                                                    </Link>
                                                  </OverlayTrigger>
                                                  <OverlayTrigger
                                                    placement="top"
                                                    delay={{
                                                      show: 250,
                                                      hide: 400,
                                                    }}
                                                    overlay={
                                                      renderTooltipForDelete
                                                    }
                                                  >
                                                    <Link
                                                      to="#"
                                                      onClick={() => {
                                                        setEndTripData({
                                                          dispatch_package_status:
                                                            "10",

                                                          dispatch_package_id:
                                                            order?.dispatch_package_id,
                                                        });
                                                        // setSelectedItem(
                                                        //   single.dispatch_customer_id
                                                        // );
                                                        setDeleteModal(true);
                                                      }}
                                                    >
                                                      <div className="inconsIn">
                                                        <img
                                                          src={end_Trip_vew}
                                                          alt=""
                                                          style={{
                                                            height: "20px",
                                                            width: "20px",
                                                          }}
                                                        />
                                                      </div>
                                                    </Link>
                                                  </OverlayTrigger>
                                                </>
                                              )}
                                          </>
                                        )}
                                        {/* // )} */}
                                      </>

                                      {/* <div className="innerFlex">
                          <button className="cx-btn-2">Assign Trip </button>
                              </div> */}
                                      {/* {(userRole == "customer" ||
                                  accessRights?.rights_manage_delivery_requests) && (
                                    <OverlayTrigger
                                      placement="bottom"
                                      delay={{ show: 250, hide: 400 }}
                                      overlay={renderTooltipForView}
                                    >
                                      <Link
                                        onClick={() => {
                                          setViewId(order.dispatch_package_id);
                                        }}
                                        to={"/ViewOrders"}
                                      >
                                        <div className="inconsIn d-flex">
                                          <img src={View} alt="" />
                                        </div>
                                      </Link>
                                    </OverlayTrigger>
                                  )} */}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      ) : (
                        <NoDataComp />
                      )}
                    </div>
                  </div>
                  {orderList?.length > 0 && (
                    <Pagenation
                      length={orderList?.length}
                      total={totalPages}
                      comp={"regDispatch"}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {loading1 ? (
          <Loader />
        ) : (
          <>
            {" "}
            <div
              className="modal  pm-body"
              style={{
                display: modelstats > 0 ? "block" : "none",
              }}
              id="modal-on-map"
            // onClick={() => {
            //   setMapLatLngData([]);
            // }}
            >
              <Modal.Dialog
                className="popover-main-wrapperHot"
                style={{ top: "20%" }}
              >
                <Modal.Header>
                  <Modal.Title className="headingHot d-flex flex-column">
                    {/* <p style={{color:"#8f4300"}}> */}
                    {t("Assign Order")}
                    {/* </p> */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      className="headerFlex"
                    >
                      <p>
                        {" "}
                        <label className="greenDot"></label>
                        {t("online")}
                      </p>
                      <p>
                        {" "}
                        <label className="redDot"></label>
                        {t("Busy")}
                      </p>
                      <p>
                        {" "}
                        <label className="greyDot"></label>
                        {t("Offline")}
                      </p>
                    </div>
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form
                  // noValidate
                  // validated={validated}
                  // onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-md-12 form_input_main mt-3">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {t("Vehicle & Driver")}
                          </Form.Label>

                          <CommonSelect
                            setterKey={"vehicle_id"}
                            componentId={true}
                            placehold={t("Select")}
                            setID={true}
                            setErrMsg={setErrMsg}
                            errMsg={errMsg}
                            errKey={"manual"}
                            setterFucntions={setRoutingData}
                            data={routingData}
                            selectedValue={routingData?.vehicle_id}
                            selValue={routingData?.vehicle_id}
                            setid={true}
                            optionList={
                              vehicleList &&
                              vehicleList?.map((single) => ({
                                id: single?.vehicle_id,
                                value: single?.vehicle_number,
                                label: (
                                  <div className="d-flex me-2">
                                    <div
                                      style={{
                                        backgroundColor:
                                          single?.metering_status == "T"
                                            ? "red"
                                            : single?.metering_status == "B"
                                              ? "green"
                                              : "grey", // Set your desired background color here
                                        width: "10px", // Set your desired width here
                                        height: "10px", // Set your desired height here
                                        borderRadius: "50%", // Make it a circle
                                        marginRight: "10px", // Set the space between the circle and the text
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginTop: "8px",
                                      }}
                                    ></div>
                                    {/* <img src="https://via.placeholder.com/30x30" alt="Vanilla" /> */}
                                    {`${single?.vehicle_number}  (${single?.user_name
                                      ? single?.user_name
                                      : "No Driver Available"
                                      })`}
                                  </div>
                                ),

                                // `${single?.vehicle_number} >> ${single?.user_name?single?.user_name:"No Driver Available"}`
                              }))
                            }
                          />
                          {errMsg?.vehicle_id.length > 0 && (
                            <span className="text-danger">
                              {errMsg?.vehicle_id}
                            </span>
                          )}
                          <Form.Control.Feedback>
                            Please Select Vehicle...
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      {/* <div className="col-md-12  form_input_main">

                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Driver with vehicle")}
                      </Form.Label>
                   
                      <div>
                      {driver?.user_name && driver?.vehicle_number && (
                            <span
                              style={{ color: "#9c4900" }}
                            >{`${driver?.user_name}>>${driver?.vehicle_number}`}</span>
                          )}
                      </div>
                    
                    </div>
                  </div> */}
                      {/* <div className="col-md-12 col-lg-6 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {t("Start Time")}
                          </Form.Label>
                          <Space>
                            <TimePicker
                              className="form-control carretClass"
                              size="large"
                              allowClear={true}
                              value={
                                routingData?.trip_start_time &&
                                dayjs(routingData?.trip_start_time, "HH:mm:ss")
                              }
                              showNow={false}
                              onChange={(e) => {
                                if (e) {
                                  const currentTime = dayjs();
                                  const selectedTime = dayjs(
                                    e.format("HH:mm:ss"),
                                    "HH:mm:ss"
                                  );
                                  const differenceInMinutes = selectedTime.diff(
                                    currentTime,
                                    "minute"
                                  );
                                  if (
                                    selectedTime.isAfter(currentTime) ||
                                    selectedTime.isSame(currentTime) ||
                                    differenceInMinutes >= -120
                                  ) {
                                    let time =
                                      e.hour() +
                                      ":" +
                                      e.minute() +
                                      ":" +
                                      e.second();
                                    setRoutingData({
                                      ...routingData,
                                      trip_start_time: time,
                                    });
                                  } else {
                                    setRoutingData({
                                      ...routingData,
                                      trip_start_time: "",
                                    });
                                  }
                                }
                          
                                setErrMsg({ ...errMsg, trip_start_time: "" });
                              }}
                            />
                            {errMsg?.trip_start_time.length > 0 && (
                              <span className="text-danger">
                                {errMsg?.trip_start_time}
                              </span>
                            )}
                          </Space>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {t("End Time")}
                          </Form.Label>
                          <Space>
                            <TimePicker
                              className="form-control carretClass"
                              size="large"
                              allowClear={true}
                              // value={dayjs("20:12:36", "HH:mm:ss")}
                              // defaultValue={}
                              value={
                                routingData?.trip_end_time &&
                                dayjs(routingData?.trip_end_time, "HH:mm:ss")
                              }
                              showNow={false}
                              onChange={(e) => {
                                if (e) {
                                  let time =
                                    e.hour() +
                                    ":" +
                                    e.minute() +
                                    ":" +
                                    e.second();
                                  setRoutingData({
                                    ...routingData,
                                    trip_end_time: time,
                                  });
                                } else {
                                  setRoutingData({
                                    ...routingData,
                                    trip_end_time: "",
                                  });
                                }
                                setErrMsg({ ...errMsg, trip_end_time: "" });
                              }}
                            />
                          </Space>
                          {errMsg?.trip_end_time.length > 0 && (
                            <span className="text-danger">
                              {errMsg?.trip_end_time}
                            </span>
                          )}
                        </div>
                      </div> */}
                    </div>
                    <Modal.Footer>
                      <div className="d-flex justify-content-end align-items-center belowBtns btn-wrapper">
                        <button
                          type="button"
                          onClick={() => {
                            handleCancle(t("Order cancel for now"));
                            handleModel(false);
                            setRoutingData({
                              trip_end_time: "",
                              trip_start_time: "",
                              vehicle_id: "",
                            });
                          }}
                          className="cx-btn-1"
                        >
                          {t("Cancel")}
                        </button>
                        <button
                          type="button"
                          onClick={() => handalevalidation()}
                          className="cx-btn-2"
                        >
                          {t("Assign Trip")}
                        </button>
                      </div>
                    </Modal.Footer>
                  </Form>
                </Modal.Body>
              </Modal.Dialog>
            </div>
            <div
              className="modal  pm-body"
              style={{
                display: modelstats1 > 0 ? "block" : "none",
              }}
              id="modal-on-map"
            // onClick={() => {
            //   setMapLatLngData([]);
            // }}
            >
              <Modal.Dialog
                className="popover-main-wrapperHot"
                style={{ top: "20%" }}
              >
                <Modal.Header>
                  <Modal.Title className="headingHot d-flex flex-column">
                    {/* <p style={{color:"#8f4300"}}> */}
                    {t("Reassigning Driver")}
                    {/* </p> */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      className="headerFlex"
                    >
                      <p>
                        {" "}
                        <label className="greenDot"></label> {t("online")}
                      </p>
                      <p>
                        {" "}
                        <label className="redDot"></label>
                        {t("Busy")}
                      </p>
                      <p>
                        {" "}
                        <label className="greyDot"></label>
                        {t("Offline")}
                      </p>
                    </div>
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form
                  // noValidate
                  // validated={validated}
                  // onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-md-12 form_input_main mt-3">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {t("Vehicle & Driver")}
                          </Form.Label>

                          <CommonSelect
                            setterKey={"vehicle_id"}
                            componentId={true}
                            setID={true}
                            setErrMsg={setErrMsg}
                            errMsg={errMsg}
                            errKey={"manual"}
                            setterFucntions={setRoutingData}
                            data={routingData}
                            selectedValue={routingData?.vehicle_id}
                            selValue={routingData?.vehicle_id}
                            setid={true}
                            optionList={
                              vehicleList &&
                              vehicleList?.map((single) => ({
                                id: single?.vehicle_id,
                                value: single?.vehicle_number,
                                label: (
                                  <div className="d-flex me-2">
                                    <div
                                      style={{
                                        backgroundColor:
                                          single?.metering_status == "T"
                                            ? "red"
                                            : single?.metering_status == "B"
                                              ? "green"
                                              : "grey", // Set your desired background color here
                                        width: "10px", // Set your desired width here
                                        height: "10px", // Set your desired height here
                                        borderRadius: "50%", // Make it a circle
                                        marginRight: "10px", // Set the space between the circle and the text
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginTop: "8px",
                                      }}
                                    ></div>
                                    {/* <img src="https://via.placeholder.com/30x30" alt="Vanilla" /> */}
                                    {`${single?.vehicle_number}  (${single?.user_name
                                      ? single?.user_name
                                      : t("No Driver Available")
                                      })`}
                                  </div>
                                ),

                                // `${single?.vehicle_number} >> ${single?.user_name?single?.user_name:"No Driver Available"}`
                              }))
                            }
                          />
                          {errMsg?.vehicle_id.length > 0 && (
                            <span className="text-danger">
                              {errMsg?.vehicle_id}
                            </span>
                          )}
                          <Form.Control.Feedback>
                            {t("Please Select Vehicle...")}
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      {/* <div className="col-md-12  form_input_main">

                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Driver with vehicle")}
                      </Form.Label>
                   
                      <div>
                      {driver?.user_name && driver?.vehicle_number && (
                            <span
                              style={{ color: "#9c4900" }}
                            >{`${driver?.user_name}>>${driver?.vehicle_number}`}</span>
                          )}
                      </div>
                    
                    </div>
                  </div> */}
                    </div>
                    <Modal.Footer>
                      <div className="d-flex justify-content-end align-items-center belowBtns btn-wrapper">
                        <button
                          type="button"
                          onClick={() => {
                            handleCancle("Re assign Driver Cancle");
                            handleModel1(false);
                            setRoutingData({
                              trip_end_time: "",
                              trip_start_time: "",
                              vehicle_id: "",
                            });
                          }}
                          className="cx-btn-1"
                        >
                          {t("Cancel")}
                        </button>
                        <button
                          type="button"
                          onClick={() => ReassignDriver()}
                          className="cx-btn-2"
                        >
                          {t("Re-assign")}
                        </button>
                      </div>
                    </Modal.Footer>
                  </Form>
                </Modal.Body>
              </Modal.Dialog>
            </div>
            <Modal
              show={deleteModal}
              onHide={() => setDeleteModal(false)}
              centered
              className="common-model"
            >
              <Modal.Header closeButton>
                <Modal.Title>{t("Cancel Trip")} </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {t("Are you sure you want to cancel  this trip ?")}
              </Modal.Body>
              <Modal.Footer className="pop-up-modal-footer">
                <div class="btn-wrapper">
                  <button
                    className="cx-btn-1"
                    onClick={() => {
                      setDeleteModal(false);
                    }}
                  >
                    {t("Cancel")}
                  </button>
                  <button
                    className="cx-btn-2"
                    onClick={() => {
                      deleteItem();
                      setDeleteModal(false);
                    }}
                  >
                    {t("Yes")}
                  </button>
                </div>
              </Modal.Footer>
            </Modal>
            <Modal
              show={deleteModalPending}
              onHide={() => setDeleteModalPending(false)}
              centered
              className="common-model"
            >
              <Modal.Header closeButton>
                <Modal.Title>{t("Delete Trip")} </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {t("Are you sure you want to delete  this trip ?")}
              </Modal.Body>
              <Modal.Footer className="pop-up-modal-footer">
                <div class="btn-wrapper">
                  <button className="cx-btn-1" onClick={() => { setDeleteModalPending(false); }} > {t("Cancel")} </button>
                  <button className="cx-btn-2" /* onClick={() => { deleteItem(); setDeleteModalPending(false); }} */ onClick={tripDelete} >
                    {t("Yes")}
                  </button>
                </div>
              </Modal.Footer>
            </Modal>
            <div
              className="modal  pm-body"
              style={{
                display: Multipalmodelstats > 0 ? "block" : "none",
              }}
              id="modal-on-map"
            // onClick={() => {
            //   setMapLatLngData([]);
            // }}
            >
              <Modal.Dialog
                className="popover-main-wrapperHot"
                style={{ top: "20%" }}
              >
                <Modal.Header>
                  <Modal.Title className="headingHot d-flex flex-column">
                    {/* <p style={{color:"#8f4300"}}> */}
                    {t("Multiple Assign Order")}
                    {/* </p> */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      className="headerFlex"
                    >
                      <p>
                        {" "}
                        <label className="greenDot"></label> {t("online")}
                      </p>
                      <p>
                        {" "}
                        <label className="redDot"></label> {t("Busy")}
                      </p>
                      <p>
                        {" "}
                        <label className="greyDot"></label>
                        {t("Offline")}
                      </p>
                    </div>
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form
                  // noValidate
                  // validated={validated}
                  // onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-md-12 form_input_main mt-3">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {t("Vehicle & Driver")}
                          </Form.Label>

                          <CommonSelect
                            setterKey={"vehicle_id"}
                            componentId={true}
                            setID={true}
                            setErrMsg={setErrMsg}
                            errMsg={errMsg}
                            errKey={"manual"}
                            setterFucntions={setRoutingData}
                            data={routingData}
                            selectedValue={routingData?.vehicle_id}
                            selValue={routingData?.vehicle_id}
                            setid={true}
                            optionList={
                              vehicleList &&
                              vehicleList?.map((single) => ({
                                id: single?.vehicle_id,
                                value: single?.vehicle_number,
                                label: (
                                  <div className="d-flex me-2">
                                    <div
                                      style={{
                                        backgroundColor:
                                          single?.metering_status == "T"
                                            ? "red"
                                            : single?.metering_status == "B"
                                              ? "green"
                                              : "grey", // Set your desired background color here
                                        width: "10px", // Set your desired width here
                                        height: "10px", // Set your desired height here
                                        borderRadius: "50%", // Make it a circle
                                        marginRight: "10px", // Set the space between the circle and the text
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginTop: "8px",
                                      }}
                                    ></div>
                                    {/* <img src="https://via.placeholder.com/30x30" alt="Vanilla" /> */}
                                    {`${single?.vehicle_number}  (${single?.user_name
                                      ? single?.user_name
                                      : t("No Driver Available")
                                      })`}
                                  </div>
                                ),

                                // `${single?.vehicle_number} >> ${single?.user_name?single?.user_name:"No Driver Available"}`
                              }))
                            }
                          />
                          {errMsg?.vehicle_id.length > 0 && (
                            <span className="text-danger">
                              {errMsg?.vehicle_id}
                            </span>
                          )}
                          <Form.Control.Feedback>
                            {t("Please Select Vehicle...")}
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      {/* <div className="col-md-12  form_input_main">

                  <div className="innerSelectBox weekCounter">
                    <Form.Label className="common-labels">
                      {t("Driver with vehicle")}
                    </Form.Label>
                 
                    <div>
                    {driver?.user_name && driver?.vehicle_number && (
                          <span
                            style={{ color: "#9c4900" }}
                          >{`${driver?.user_name}>>${driver?.vehicle_number}`}</span>
                        )}
                    </div>
                  
                  </div>
                </div> */}
                      {/* <div className="col-md-12 col-lg-6 form_input_main">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Start Time")}
                        </Form.Label>
                        <Space>
                          <TimePicker
                            className="form-control carretClass"
                            size="large"
                            allowClear={true}
                            value={
                              routingData?.trip_start_time &&
                              dayjs(routingData?.trip_start_time, "HH:mm:ss")
                            }
                            showNow={false}
                            onChange={(e) => {
                              if (e) {
                                const currentTime = dayjs();
                                const selectedTime = dayjs(
                                  e.format("HH:mm:ss"),
                                  "HH:mm:ss"
                                );
                                const differenceInMinutes = selectedTime.diff(
                                  currentTime,
                                  "minute"
                                );
                                if (
                                  selectedTime.isAfter(currentTime) ||
                                  selectedTime.isSame(currentTime) ||
                                  differenceInMinutes >= -120
                                ) {
                                  let time =
                                    e.hour() +
                                    ":" +
                                    e.minute() +
                                    ":" +
                                    e.second();
                                  setRoutingData({
                                    ...routingData,
                                    trip_start_time: time,
                                  });
                                } else {
                                  setRoutingData({
                                    ...routingData,
                                    trip_start_time: "",
                                  });
                                }
                              }
                        
                              setErrMsg({ ...errMsg, trip_start_time: "" });
                            }}
                          />
                          {errMsg?.trip_start_time.length > 0 && (
                            <span className="text-danger">
                              {errMsg?.trip_start_time}
                            </span>
                          )}
                        </Space>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6 form_input_main">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("End Time")}
                        </Form.Label>
                        <Space>
                          <TimePicker
                            className="form-control carretClass"
                            size="large"
                            allowClear={true}
                            // value={dayjs("20:12:36", "HH:mm:ss")}
                            // defaultValue={}
                            value={
                              routingData?.trip_end_time &&
                              dayjs(routingData?.trip_end_time, "HH:mm:ss")
                            }
                            showNow={false}
                            onChange={(e) => {
                              if (e) {
                                let time =
                                  e.hour() +
                                  ":" +
                                  e.minute() +
                                  ":" +
                                  e.second();
                                setRoutingData({
                                  ...routingData,
                                  trip_end_time: time,
                                });
                              } else {
                                setRoutingData({
                                  ...routingData,
                                  trip_end_time: "",
                                });
                              }
                              setErrMsg({ ...errMsg, trip_end_time: "" });
                            }}
                          />
                        </Space>
                        {errMsg?.trip_end_time.length > 0 && (
                          <span className="text-danger">
                            {errMsg?.trip_end_time}
                          </span>
                        )}
                      </div>
                    </div> */}
                    </div>
                    <Modal.Footer>
                      <div className="d-flex justify-content-end align-items-center belowBtns btn-wrapper">
                        <button
                          type="button"
                          onClick={() => {
                            handleCancle(t("Order cancel for now"));
                            handleModelmultipal(false);
                            setRoutingData({
                              trip_end_time: "",
                              trip_start_time: "",
                              vehicle_id: "",
                            });
                          }}
                          className="cx-btn-1"
                        >
                          {t("Cancel")}
                        </button>
                        <button
                          type="button"
                          onClick={() => handalevalidation()}
                          className="cx-btn-2"
                        >
                          {t("Assign Trip")}
                        </button>
                      </div>
                    </Modal.Footer>
                  </Form>
                </Modal.Body>
              </Modal.Dialog>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default DispatchOrder;

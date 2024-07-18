// Usama 09-02-2023Tab.Pane
import React, { useContext, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Col, Dropdown, Modal, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import DDlogo from "../../assets/images/DDlogo.png";
import Export from "../../assets/images/ic-Export.svg";
import Import from "../../assets/images/ic-Import.svg";
import Gcar from "../../assets/images/Green-car-logo.svg";
import option from "../../assets/images/option-three-dot.svg";
import Orange_top from "../../assets/images/Vehicle_Icon/Vehicle_icon_orange_car_top.svg";
import dummy_vehicle_ic from "../../assets/images/dummy_vehicle_ic.svg";
import { motion } from "framer-motion";
import Nav from "react-bootstrap/Nav";
import Gbike from "../../assets/images/green-bike-map.svg";
import Rbike from "../../assets/images/red-bike-map.svg";
import Bcar from "../../assets/images/Blue-car-logo.svg";
import Rcar from "../../assets/images/red-car-logo.svg";
import BKcar from "../../assets/images/black-car-logo.svg";
import GRbike from "../../assets/images/Grey-bike-logo.svg";
import GRcar from "../../assets/images/Grey-car-logo.svg";
import Ycar from "../../assets/images/yellow-car-logo.svg";
import Ybike from "../../assets/images/yellow-bike-map.svg";
import YQcar from "../../assets/images/yellow-qution-car.svg";
import YQbike from "../../assets/images/yellow-qution-bike.svg";
import Cat_ye_car from "../../assets/images/Catagiry_yellow_car.svg";
import Cat_ye_bike from "../../assets/images/Catagiry_yellow_bike.svg";
import Feature_CarLock_active from "../../assets/images/Feature_CarLock_active.svg";
import Feature_Fuel_active from "../../assets/images/Feature_Fule_active.svg";
import Feature_Fuel from "../../assets/images/Feature_Fule.svg";
import Feature_temp_active from "../../assets/images/Feature_temp_active.svg";
import Feature_temp from "../../assets/images/Feature_temp1.svg";
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
import Feature_CarLock from "../../assets/images/Feature_CarLock.svg";
import Tracking_Active from "../../assets/images/Tracking-ON.svg";
import Tracking from "../../assets/images/Tracking-Off.svg";
import MapOffline_Active from "../../assets/images/Offinemap-ON.svg";
import MapOffline from "../../assets/images/Offinemap-Off.svg";
import Pump from "../../assets/images/Petrol-Pump.svg";
import route from "../../assets/images/Road_Route.svg";
import Seats from "../../assets/images/Seats.svg";
import Repair from "../../assets/images/Repair.svg";
import weight from "../../assets/images/weight.svg";
import EVlogo from "../../assets/images/EV-logo.svg";
import Qustiontracking from "../../assets/images/Qustion-tracking.svg";
import arrow from "../../assets/images/ic_line_arrow_left.svg";
import Grouplogo from "../../assets/images/Group-logo.svg";
import { Link, useNavigate } from "react-router-dom";
// import { useNavItem } from "@restart/ui/esm/NavItemy";
import idle from "../../assets/images/idle.svg";
import whiteTrash from "../../assets/images/whiteTrash.svg";
import whiteHand from "../../assets/images/whiteHand.svg";
import whiteBox from "../../assets/images/whiteBox.svg";
import whiteBin from "../../assets/images/whiteBin.svg";
import blue_box from "../../assets/images/blue_box.svg";
import green_box from "../../assets/images/green_box.svg";
import Pagenation from "../../sharedComponent/Pagenation";
import MapComponent from "../../sharedComponent/MapComponent";
import {
  simpleDeleteCall,
  simpleGetCall,
  simplePostCall,
} from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import Loader from "../../sharedComponent/Loader";
import {
  DateDDMMYYYY,
  getTime,
  latestDate,
} from "../../sharedComponent/common";
import { Pagination } from "antd";
import Slider from "react-slick";
import NoDataComp from "../../sharedComponent/NoDataComp";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import FileSaver from "file-saver";
import ImageValid from "../../sharedComponent/ImageValid";
import Item from "antd/es/list/Item";
import CommonDatePicker from "../../sharedComponent/CommonDatePicker";

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const Vehicle = () => {
  const { t, i18n } = useTranslation();
  const {
    sidebar,
    recordsPerPage,
    useDebounce,
    vehicleTabListActive,
    setVehicleTabListActive,
    customerData,
    setRouteIdEdit,
    DateFormatConfig,
    timeZone,
  } = useContext(AppContext);
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = "noRole";
  // const userRole = accessRights && accessRights?.rights_role;
  const mainTabs = [
    {
      Title: "Vehicle",
      tabs: "vehicle",
      path: "/AddVehicle",
      Btname:
        userRole === "customer" ||
        (accessRights && accessRights?.rights_manage_vehicle)
          ? "Add Vehicle"
          : "",
      eventKey: "first",
      url: ApiConfig.GET_VEHICLE_LIST,
      urlExport: ApiConfig.GET_VEHICLE_LIST_EXPORT,
    },
    {
      // Title: "Vehicle Category",
      Title: "Vehicle Type",
      tabs: "category",
      path: "/AddVehicleCategory",
      Btname:
        userRole === "customer" ||
        (accessRights && accessRights?.rights_manage_vehicletype)
          ? t("Add Vehicle Type")
          : "",
      eventKey: "second",
      url: ApiConfig.GET_VEHICLE_CATEGORY,
      urlExport: ApiConfig.GET_VEHICLE_CATEGORY_EXPORT,
    },
    {
      Title: "Vehicle Group",
      path: "/AddVehicleGroup",
      Btname:
        userRole === "customer" ||
        (accessRights && accessRights?.rights_manage_vehiclegroup)
          ? t("Add Vehicle Group")
          : "",
      eventKey: "three",
      url: ApiConfig.GET_VEHICLE_GROUP,
      urlExport: ApiConfig.GET_VEHICLE_GROUP_EXPORT,
      tabs: "group",
    },
    {
      Title: "Sync",
      path: "/NewSyncRequest",
      Btname:
        userRole === "customer" ||
        (accessRights && accessRights?.rights_manage_vehiclesync)
          ? t("New Sync Request")
          : "",
      eventKey: "four",
      url: ApiConfig.GET_VEHICLE_SYNC,
      urlExport: ApiConfig.GET_VEHICLE_SYNC_EXPORT,
      tabs: "sync",
    },
  ];
  const subTabs = [
    { subTitle: "All", eventKey: 1, sendTitle: "allvehicle" },
    { subTitle: "Online", eventKey: 2, sendTitle: "online" },
    { subTitle: "Offline", eventKey: 3, sendTitle: "offline" },
    {
      subTitle: "Untracked/Not Tracked Yet",
      eventKey: 4,
      sendTitle: "untracked",
    },
  ];

  // pagination
  const [last_page, setlast_page] = useState(false);
  const [flagSearch, setflagSearch] = useState(false);
  // last_page
  const [page, setPage] = useState(1);
  const [bottom, setBottom] = useState("");
  const [imbStatusData, setImbStatusData] = useState({});
  const [total_count, setTotal_count] = useState(null);
  const [view, setView] = useState(false);
  const [vCars, setVCars] = useState(false);
  const [groupIdPdf, setGroupIdPdf] = useState("");
  const [categoryIdPdf, setCategoryIdPdf] = useState("");
  const showView = () => {
    setView(true);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const handleShow1 = () => setShow1(true);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [featureEventKey, setFeatureEventKey] = useState("Five");
  const navigate = useNavigate();
  

  //category
  const showGroup = () => setShow(true);
  const [loader, setLoader] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteID, setDeleteID] = useState(1);
  const [subcategory, setSubcategory] = useState(1);
  const [TabData, setTabData] = useState([]);
  const [groupSubData, setGroupSubData] = useState([]);
  const [groupDeletBody, setGroupDeletBody] = useState({});
  const [categorySubData, setCategorySubData] = useState([]);
  const [tabURLExport, setTabURLExport] = useState(
    ApiConfig.GET_VEHICLE_LIST_EXPORT
  );
  const [tabURLDelete, setTabURLDelete] = useState(
    ApiConfig.VEHICLE_DELETE + `?vehicle_id=${deleteID}`
  );
  const [vehicleTabList, setVehicleTabList] = useState("");
  const [sendSubcategory, setSendSubcategory] = useState("allvehicle");
  const [tabURL, setTabURL] = useState(ApiConfig.GET_VEHICLE_LIST);
  const [eventKeymaincategory, seteventKeyMaincategory] = useState("first");
  const [bodyToSend, setbodyToSend] = useState([]);
  const [pathTitlecategory, setPathTitlecategory] = useState({
    Title: "vehicle",
    path: "/AddVehicle",
    Btname:
      userRole === "customer" ||
      (accessRights && accessRights.rights_manage_vehicle)
        ? "Add Vehicle"
        : "",
    eventKey: "first",
  });
  const [searchData, setSearchData] = useState({
    vehicleCategory: "",
    vehicletype: "",
    vehicleCapacity: "",
    transportationType: "",
    requestDate: "",
  });

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const debouncedSearchTerm = useDebounce(searchData, 500);
  useEffect(() => {
    if (flagSearch == true) {
      vehicleAllList(tabURL, 1, "key");
    } else {
      setflagSearch(true);
    }
  }, [debouncedSearchTerm]);
  useEffect(() => {
    const requestBodySync = JSON.stringify({
      vehicle_name: searchData?.vehicletype,
      vehicle_capacity: searchData?.vehicleCapacity,
      vehicle_category: searchData?.vehicleCategory,
      vehicle_type: sendSubcategory,
      page: page,
      page_limit: recordsPerPage,
      timeZone: timeZone,
    });
    const requestBodyOther = JSON.stringify({
      syncrequest_sync_period: searchData?.vehicleCapacity,
      syncrequest_sync_status: searchData?.transportationType,
      syncrequest_requested_datetime: latestDate(
        searchData?.requestDate,
        "yyyy-MM-dd"
      ),
      vehicle_number: searchData?.vehicletype,
      page: page,
      page_limit: recordsPerPage,
      timeZone: timeZone,
    });

    const bodygroup = JSON.stringify({
      groupName: searchData?.vehicletype,
      managerName: searchData?.vehicleCategory,
      vehicleNo: searchData?.vehicleCapacity,
      page: page,
      page_limit: recordsPerPage,
      timeZone: timeZone,
    });
    const restBodyCapycity = JSON.stringify({
      categoryName: searchData?.vehicletype,
      seatCapacity: searchData?.vehicleCategory,
      page: page,
      page_limit: recordsPerPage,
      timeZone: timeZone,
    });
    if (vehicleTabList === "sync") {
      setbodyToSend(requestBodyOther);
    }
    if (vehicleTabList === "group") {
      setbodyToSend(bodygroup);
    }
    if (vehicleTabList === "category") {
      setbodyToSend(restBodyCapycity);
    }
    if (vehicleTabList === "vehicle") {
      setbodyToSend(requestBodySync);
    }
  }, [vehicleTabList]);

  const vehicleAllList = (tabURL, page, key, tabCard) => {
    page == 1 && setLoader(true);
    const requestBodySync = JSON.stringify({
      vehicle_name: searchData?.vehicletype,
      vehicle_capacity: searchData?.vehicleCapacity,
      vehicle_category: searchData?.vehicleCategory,
      vehicle_type: sendSubcategory,
      page: page,
      page_limit: recordsPerPage,
      timeZone: timeZone,
    });
    const requestBodyOther = JSON.stringify({
      syncrequest_sync_period: searchData?.vehicleCapacity,
      syncrequest_sync_status: searchData?.transportationType,
      syncrequest_requested_datetime: latestDate(
        searchData?.requestDate,
        "yyyy-MM-dd"
      ),
      vehicle_number: searchData?.vehicletype,
      page: page,
      page_limit: recordsPerPage,
      timeZone: timeZone,
    });

    const bodygroup = JSON.stringify({
      groupName: searchData?.vehicletype,
      managerName: searchData?.vehicleCategory,
      vehicleNo: searchData?.vehicleCapacity,
      page: page,
      page_limit: recordsPerPage,
      timeZone: timeZone,
    });
    const restBodyCapycity = JSON.stringify({
      categoryName: searchData?.vehicletype,
      seatCapacity: searchData?.vehicleCategory,
      page: page,
      page_limit: recordsPerPage,
      timeZone: timeZone,
    });
    let body =
      tabCard === "sync" || vehicleTabList === "sync"
        ? requestBodyOther
        : tabCard === "group" || vehicleTabList === "group"
        ? bodygroup
        : tabCard === "category" || vehicleTabList === "category"
        ? restBodyCapycity
        : requestBodySync;

    simplePostCall(tabURL, body)
      .then((res) => {
        setLoader(false);
        if (res.result === true) {
          if (key === "key") {
            setTabData(res?.data);
            setlast_page(res?.last_page ? res?.last_page : "");
            setTotal_count(res?.total_count ? res?.total_count : "");
          } else {
            setTabData([...TabData, ...res.data]);
            setlast_page(res?.last_page ? res?.last_page : "");
            setTotal_count(res?.total_count ? res?.total_count : "");
          }
        } else {
          setTabData([]);
        }
      })
      .catch((error) => {
        console?.log("api response", error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const vehicletDelete = () => {
    handleClose();
    simpleDeleteCall(tabURLDelete, JSON.stringify(groupDeletBody))
      .then((res) => {
        if (res?.result === true) {
          notifySuccess(res?.message);
          if (
            vehicleTabList === "category" ||
            vehicleTabList === "group" ||
            vehicleTabList === "vehicle"
          ) {
            vehicleAllList(tabURL, page, "key");
          }
          if (view === true) {
            apiCallForSubgroup(groupdeletlist, "key");
          }
          if (vCars === true) {
            apiCallForSubCategory(groupdeletlist, "key");
          }
        } else {
          notifyError(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  //apiCallForSubgroup
  const [groupdeletlist, setGroupdeletlist] = useState(0);

  const apiCallForSubgroup = (id) => {
    setLoader(true);
    simplePostCall(
      ApiConfig.VEHICLE_LISTGROUPVIEW,
      JSON.stringify({
        groupId: id,
        page: pageNumber,
      })
    )
      .then((res) => {
        setLoader(false);
        if (res.success == true) {
          setGroupSubData(res.data);
        } else {
          setGroupSubData(res.data);
          setGroupDeletBody({});
          // setTabData(res.data);
          // notifyError(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  //vehicle group sub category

  const apiCallForSubCategory = (id) => {
    setLoader(true);
    simplePostCall(
      ApiConfig.GET_VEHICLE_SUB_CATEGORY,
      JSON.stringify({
        categoryId: id,
        page: pageNumber,
      })
    )
      .then((res) => {
        setLoader(false);
        if (res.success == true) {
          setCategorySubData(res?.data);
          if (res.data.length > 0) {
            setVCars(true);
          } else {
            setVCars(false);
          }
        } else {
          // setTabData(res.data);
          // notifyError(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  // feature set module
  const [featureListData, setFeatureListData] = useState([]);
  const [featureSubTab, setFeatureSubTab] = useState(1);
  const [featureCardData, setFeatureCardData] = useState([]);
  const [featureCard_Id, setFeatureCard_Id] = useState("");
  const [featureCardDataSearch, setFeatureCardDataSearch] = useState({
    vehicle_number: "",
    vehicle_type_description: "",
  });
  const [last_pageFeature, setlast_pageFeature] = useState(false);
  // last_page
  const [pageFeature, setPageFeature] = useState(1);

  const [total_countFeature, setTotal_countFeature] = useState(0);
  const debouncedSearchTermFeature = useDebounce(featureCardDataSearch, 500);
  useEffect(() => {
    if (flagSearch == true) {
      featureAllListDataApi(featureCard_Id, 1);
    } else {
      setflagSearch(true);
    }
  }, [debouncedSearchTermFeature]);
  useEffect(() => {
    if (featureListData.length > 0) {
      featureAllListDataApi(featureCard_Id, 1);
    }
  }, [featureListData]);

  const featureAllListDataApi = async (id, pageNum, tab) => {
    simplePostCall(
      ApiConfig.FEATURELIST_DATA_ALL,
      JSON.stringify({
        ...featureCardDataSearch,
        feature_id: id,
        page: pageNum ? pageNum : pageFeature,
        page_limit: recordsPerPage,
      })
    )
      .then((res) => {
        if (res.result == true) {
          setTotal_countFeature(res.total);
          setlast_pageFeature(res.last_page);
          let data = res.featureListVehicle ? res.featureListVehicle : [];
          tab === "tab"
            ? setFeatureCardData(data)
            : setFeatureCardData([...featureCardData, ...data]);

          // let coursesData = res.featureListVehicle ? res.featureListVehicle : [];
          // let LearningData = coursesData.map((eachteam, index) => {
          //   return {
          //     ...eachteam,
          //     vehicle_number: eachteam.vehicle_number || "",
          //     vehicle_seat_capacity: eachteam.vehicle_seat_capacity || "",

          //   };
          // });

          // setlast_page(false)
        } else {
          setFeatureCardData([]);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  //enable disbale api
  const [featureActionData, setFeatureActionData] = useState({});
  const featureActionApi = (data) => {
    setflagSearch(false);
    setPageFeature(1);
    setFeatureCardData([]);
    handleClose1();
    simplePostCall(ApiConfig.FEATURELIST_DATA_ACTION, JSON.stringify(data))
      .then((res) => {
        if (res.result === true) {
          featureAllListDataApi(featureCard_Id, 1, "tab");
          notifySuccess(res.message);
        } else {
          notifyError(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };
  const getFeatureListApi = () => {
    setLoader(true);
    simpleGetCall(ApiConfig?.VEHICLE_FEATURE_LIST_TO_MYCARD, JSON.stringify({}))
      .then((res) => {
        setLoader(false);
        if (res.result === true) {
          let data = res?.featureList;
          setFeatureListData(res?.featureList);
          setBottom(false);
          setPageFeature(1);
          setflagSearch(false);
          setFeatureCardDataSearch({
            vehicle_number: "",
            vehicle_type_description: "",
          });
          setFeatureCard_Id(data[0].feature_id);
          setFeatureSubTab(data[0].feature_id);

          featureAllListDataApi(data[0].feature_id, 1, "tab");
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };
  // imobilization
  const [imbKeyData, setImbKeyData] = useState("vehicle");

  const ActivationCancle = () => {
    notifySuccess(
      `vehicle ${
        imbStatusData?.feature_set_value === "activated"
          ? "deactivated"
          : "activated"
      } is cancel`
    );
  };
  // const ActivationCancle = () => {
  //   const activationStatus = imbStatusData?.feature_set_value === "activated" ? 'deactivated' : 'activated';
  //   const translatedMessage = i18n.t('activation_cancellation', { activationStatus }); // Using interpolation
  
  //   notifySuccess(translatedMessage);
  // };

  const vehicletImobilization = (key) => {
    handleClose2();
    simplePostCall(
      ApiConfig?.VEHICLE_IMOBILIZATION,
      JSON.stringify({
        ...imbStatusData,
        user_customer_id: customerData.customer_id,
        feature_set_value:
          imbStatusData.feature_set_value === "activated"
            ? "deactivated"
            : "activated",
      })
    )
      .then((res) => {
        if (res?.result === true) {
          notifySuccess(res?.message);
          if (key === "vehicle") {
            if (vehicleTabList === "vehicle" || vehicleTabList === "group") {
              vehicleAllList(tabURL, page, "key");
            }
            if (view === true) {
              apiCallForSubgroup(groupdeletlist, "key");
            }
            if (vCars === true) {
              apiCallForSubCategory(groupdeletlist, "key");
            }
          }
          if (key === "feature") {
            featureAllListDataApi(featureCard_Id, 1, "tab");
          }
        } else {
          notifyError(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };
  // export data \
  //Export

  const getExportChat = (tabURL, page) => {
    const requestBodySync = JSON.stringify({
      vehicle_name: searchData.vehicletype,
      vehicle_capacity: searchData.vehicleCapacity,
      vehicle_category: searchData.vehicleCategory,
      vehicle_type: sendSubcategory,
      page: page,
      page_limit: recordsPerPage,
      format: "",
    });
    const requestBodyOther = JSON.stringify({
      syncrequest_sync_period: searchData.vehicleCapacity,
      syncrequest_sync_status: searchData.transportationType,
      syncrequest_requested_datetime: searchData.vehicleCategory,
      vehicle_number: searchData.vehicletype,
      page: page,
      page_limit: recordsPerPage,
      format: "",
    });

    const bodygroup = JSON.stringify({
      groupName: searchData.vehicletype,
      managerName: searchData.vehicleCategory,
      vehicleNo: searchData.vehicleCapacity,
      page: page,
      page_limit: recordsPerPage,
      format: "",
    });
    const restBodyCapycity = JSON.stringify({
      categoryName: searchData.vehicletype,
      seatCapacity: searchData.vehicleCategory,
      page: page,
      page_limit: recordsPerPage,
      format: "",
    });
    const reuestBodyFEature = JSON.stringify({
      vehicle_number: "",
      vehicle_type_description: "",
      feature_id: featureSubTab,
      format: "",
    });

    const groupBody = JSON.stringify({
      groupId: groupIdPdf,
      page: page,
      format: "",
    });
    const categoryBody = JSON.stringify({
      categoryId: categoryIdPdf,
      page: page,
      format: "",
    });

    let body =
      vehicleTabList === "sync"
        ? requestBodyOther
        : vehicleTabList === "group" && view === false
        ? bodygroup
        : vehicleTabList === "group" && view === true
        ? groupBody
        : vehicleTabList === "category" && vCars === false
        ? restBodyCapycity
        : vehicleTabList === "category" && vCars === true
        ? categoryBody
        : vehicleTabList === "vehicle"
        ? requestBodySync
        : reuestBodyFEature;
    simplePostCall(tabURL, body)
      .then((data) => {
        if (data.result) {
          pdfFormat(data?.data, data?.header, data?.type);
        } else {
          notifyError(data.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {});
  };

  const pdfFormat = (pdfData, header, titleTab) => {
    // let chatsData = await getExportChat()
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    let content = {
      headStyles: { fillColor: "#9c4900" },
      theme: "grid",
      pageBreak: "auto",
      bodyStyles: { fillColor: "#f6efe9" },
      styles: { fillColor: "#9c4900" },
      head: header,
      title: titleTab,
      body: pdfData,
    };

    doc.text(titleTab, marginLeft, 25);
    doc.autoTable(content);
    doc.save("VT.pdf");
    return <div></div>;
  };
  const downLoadExcelSheet = (tabURLExport, pagenumber) => {
    const requestBodySync = JSON.stringify({
      vehicle_name: searchData.vehicletype,
      vehicle_capacity: searchData.vehicleCapacity,
      vehicle_category: searchData.vehicleCategory,
      vehicle_type: sendSubcategory,
      page: pagenumber,
      page_limit: recordsPerPage,
      format: "Excel",
    });
    const requestBodyOther = JSON.stringify({
      syncrequest_sync_period: searchData.vehicleCapacity,
      syncrequest_sync_status: searchData.transportationType,
      syncrequest_requested_datetime: searchData.vehicleCategory,
      vehicle_number: searchData.vehicletype,
      page: pagenumber,
      page_limit: recordsPerPage,
      format: "Excel",
    });

    const bodygroup = JSON.stringify({
      groupName: searchData.vehicletype,
      managerName: searchData.vehicleCategory,
      vehicleNo: searchData.vehicleCapacity,
      page: pagenumber,
      page_limit: recordsPerPage,
      format: "Excel",
    });
    const restBodyCapycity = JSON.stringify({
      categoryName: searchData.vehicletype,
      seatCapacity: searchData.vehicleCategory,
      page: pagenumber,
      page_limit: recordsPerPage,
      format: "Excel",
    });
    const reuestBodyFEature = JSON.stringify({
      vehicle_number: "",
      vehicle_type_description: "",
      feature_id: featureSubTab,
      format: "excel",
    });

    const groupBody = JSON.stringify({
      groupId: groupIdPdf,
      page: pagenumber,
      format: "Excel",
    });
    const categoryBody = JSON.stringify({
      categoryId: categoryIdPdf,
      page: pagenumber,
      format: "Excel",
    });
    let body =
      vehicleTabList === "vehicle"
        ? requestBodySync
        : vehicleTabList === "sync"
        ? requestBodyOther
        : vehicleTabList === "group" && view === false
        ? bodygroup
        : vehicleTabList === "group" && view === true
        ? groupBody
        : vehicleTabList === "category" && vCars === false
        ? restBodyCapycity
        : vehicleTabList === "category" && vCars === true
        ? categoryBody
        : reuestBodyFEature;
    simplePostCall(tabURLExport, body)
      .then((res) => {
        if (res?.result === true) {
          FileSaver.saveAs(ApiConfig.BASE_URL + res.filePath);
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (
      vehicleTabListActive === "vehicle" &&
      accessRights?.rights_view_vehicle
    ) {
      setVehicleTabListActive("vehicle");
      setTabData([]);
      setTabURL(ApiConfig.GET_VEHICLE_LIST);
      vehicleAllList(ApiConfig.GET_VEHICLE_LIST, 1, "key", "vehicle");
      setTabURLExport(ApiConfig.GET_VEHICLE_LIST_EXPORT);
      setSubcategory(1);
      setPage(1);
      setSendSubcategory("allvehicle");
      setPathTitlecategory({
        Title: "vehicle",
        path: "/AddVehicle",
        Btname:
          userRole === "customer" ||
          (accessRights && accessRights.rights_manage_vehicle)
            ? "Add Vehicle"
            : "",
        eventKey: "first",
      });
      seteventKeyMaincategory("first");
      setVehicleTabList("vehicle");
    }
    if (
      vehicleTabListActive === "category" ||
      (accessRights?.rights_view_vehicletype &&
        !accessRights?.rights_view_vehicle)
    ) {
      setVehicleTabListActive("category");
      setTabData([]);
      setVehicleTabList("category");
      setTabURL(ApiConfig.GET_VEHICLE_CATEGORY);
      vehicleAllList(ApiConfig.GET_VEHICLE_CATEGORY, 1, "key", "category");
      setTabURLExport(ApiConfig.GET_VEHICLE_CATEGORY_EXPORT);
      setCategorySubData([]);
      setVCars(false);
      setSubcategory(1);
      setSendSubcategory("allvehicle");
      seteventKeyMaincategory("second");
      setPathTitlecategory({
        Title: "Vehicle Type",
        tabs: "category",
        path: "/AddVehicleCategory",
        Btname:
          userRole === "customer" ||
          (accessRights && accessRights?.rights_manage_vehicletype)
            ? "Add Vehicle Type"
            : "",
        eventKey: "second",
        url: ApiConfig.GET_VEHICLE_CATEGORY,
        urlExport: ApiConfig.GET_VEHICLE_CATEGORY_EXPORT,
      });
    }

    if (
      vehicleTabListActive === "group" &&
      accessRights?.rights_view_vehiclegroup
    ) {
      setVehicleTabListActive("group");
      setTabData([]);
      setVehicleTabList("group");
      setTabURL(ApiConfig.GET_VEHICLE_GROUP);
      vehicleAllList(ApiConfig.GET_VEHICLE_GROUP, 1, "key", "group");
      setTabURLExport(ApiConfig.GET_VEHICLE_GROUP_EXPORT);
      setView(false);
      setSubcategory(1);
      setSendSubcategory("allvehicle");
      seteventKeyMaincategory("three");
      setPathTitlecategory({
        Title: "Vehicle Group",
        path: "/AddVehicleGroup",
        Btname: "Add Vehicle Group",
        eventKey: "three",
        url: ApiConfig.GET_VEHICLE_GROUP,
        urlExport: ApiConfig.GET_VEHICLE_GROUP_EXPORT,
        tabs: "group",
      });
    }
    if (
      vehicleTabListActive === "sync" &&
      accessRights?.rights_view_vehiclesync
    ) {
      setVehicleTabListActive("sync");
      setTabData([]);
      setVehicleTabList("sync");
      setTabURL(ApiConfig.GET_VEHICLE_SYNC);
      vehicleAllList(ApiConfig.GET_VEHICLE_SYNC, 1, "key", "sync");
      setTabURLExport(ApiConfig.GET_VEHICLE_SYNC_EXPORT);
      setView(false);
      setSubcategory(1);
      setSendSubcategory("allvehicle");
      seteventKeyMaincategory("four");
      setPathTitlecategory({
        Title: "Sync",
        path: "/NewSyncRequest",
        Btname: "New Sync Request",
        eventKey: "four",
        url: ApiConfig.GET_VEHICLE_SYNC,
        urlExport: ApiConfig.GET_VEHICLE_SYNC_EXPORT,
        tabs: "sync",
      });
    }
    if (
      vehicleTabListActive === "FeatureSet" &&
      (accessRights?.rights_view_hardware_feature_set ||
        userRole === "customer")
    ) {
      setVehicleTabListActive("FeatureSet");
      seteventKeyMaincategory("Five");
      setFeatureEventKey("Five");
      setVehicleTabList("FeatureSet");
      setTabURLExport(ApiConfig.GET_FEATURE_LIST_EXPORT);
      getFeatureListApi();
      setFeatureCardData([]);
      featureAllListDataApi(1, 1);
      setVCars(false);
      setView(false);
    }
  }, []);
  const [mainTabsData, setMainTabsData] = useState([]);

  const AccessRightRoute = () => {
    let data = [];
    if (
      userRole == "customer" ||
      (accessRights?.rights_view_vehicle &&
        accessRights?.rights_view_vehicletype &&
        accessRights?.rights_view_vehiclegroup &&
        accessRights?.rights_view_vehiclesync)
    ) {
      setMainTabsData([
        {
          Title: "Vehicle",
          tabs: "vehicle",
          path: "/AddVehicle",
          Btname:
            userRole === "customer" ||
            (accessRights && accessRights?.rights_manage_vehicle)
              ? "Add Vehicle"
              : "",
          eventKey: "first",
          url: ApiConfig.GET_VEHICLE_LIST,
          urlExport: ApiConfig.GET_VEHICLE_LIST_EXPORT,
        },
        {
          Title: "Vehicle Type",
          tabs: "category",
          path: "/AddVehicleCategory",
          Btname:
            userRole === "customer" ||
            (accessRights && accessRights?.rights_manage_vehicletype)
              ? "Add Vehicle Type"
              : "",
          eventKey: "second",
          url: ApiConfig.GET_VEHICLE_CATEGORY,
          urlExport: ApiConfig.GET_VEHICLE_CATEGORY_EXPORT,
        },
        {
          Title: "Vehicle Group",
          path: "/AddVehicleGroup",
          Btname:
            userRole === "customer" ||
            (accessRights && accessRights?.rights_manage_vehicle)
              ? "Add Vehicle Group"
              : "",
          eventKey: "three",
          url: ApiConfig.GET_VEHICLE_GROUP,
          urlExport: ApiConfig.GET_VEHICLE_GROUP_EXPORT,
          tabs: "group",
        },
        {
          Title: "Sync",
          path: "/NewSyncRequest",
          Btname:
            userRole === "customer" ||
            (accessRights && accessRights?.rights_manage_vehicle)
              ? "New Sync Request"
              : "",
          eventKey: "four",
          url: ApiConfig.GET_VEHICLE_SYNC,
          urlExport: ApiConfig.GET_VEHICLE_SYNC_EXPORT,
          tabs: "sync",
        },
      ]);
    } else {
      //
      if (accessRights && accessRights?.rights_view_vehicle) {
        let Temp = [
          {
            Title: "Vehicle",
            tabs: "vehicle",
            path: "/AddVehicle",
            Btname:
              userRole === "customer" ||
              (accessRights && accessRights?.rights_manage_vehicle)
                ? "Add Vehicle"
                : "",
            eventKey: "first",
            url: ApiConfig.GET_VEHICLE_LIST,
            urlExport: ApiConfig.GET_VEHICLE_LIST_EXPORT,
          },
        ];
        data?.push(...Temp);
        // setMainTabsData([...mainTabsData, ...data]);
      }

      if (accessRights && accessRights?.rights_view_vehiclegroup) {
        // if (true) {
        let Temp2 = [
          {
            Title: "Vehicle Group",
            path: "/AddVehicleGroup",
            Btname:
              userRole === "customer" ||
              (accessRights && accessRights?.rights_manage_vehiclegroup)
                ? "Add Vehicle Group"
                : "",
            eventKey: "three",
            url: ApiConfig.GET_VEHICLE_GROUP,
            urlExport: ApiConfig.GET_VEHICLE_GROUP_EXPORT,
            tabs: "group",
          },
        ];
        data?.push(...Temp2);
        // setMainTabsData([...mainTabsData, ...data]);
      }
      if (accessRights && accessRights?.rights_view_vehiclesync) {
        // if (true) {
        let Temp3 = [
          {
            Title: "Sync",
            path: "/NewSyncRequest",
            Btname:
              userRole === "customer" ||
              (accessRights && accessRights?.rights_manage_vehiclesync)
                ? "New Sync Request"
                : "",
            eventKey: "four",
            url: ApiConfig.GET_VEHICLE_SYNC,
            urlExport: ApiConfig.GET_VEHICLE_SYNC_EXPORT,
            tabs: "sync",
          },
        ];
        data?.push(...Temp3);
        // setMainTabsData([...mainTabsData, ...data]);
      }

      if (accessRights && accessRights?.rights_view_vehicletype) {
        let Temp4 = [
          {
            Title: "Vehicle Type",
            tabs: "category",
            path: "/AddVehicleCategory",
            Btname:
              userRole === "customer" ||
              (accessRights && accessRights?.rights_manage_vehicletype)
                ? "Add Vehicle Type"
                : "",
            eventKey: "second",
            url: ApiConfig.GET_VEHICLE_CATEGORY,
            urlExport: ApiConfig.GET_VEHICLE_CATEGORY_EXPORT,
          },
        ];
        data.push(...Temp4);
        //  setMainTabsData([...mainTabsData, ...data]);
      }
      setMainTabsData(data);
    }
  };

  useEffect(() => {
    if (
      (accessRights && accessRights?.rights_view_vehicle) ||
      (accessRights && accessRights?.rights_view_vehicletype) ||
      (accessRights && accessRights?.rights_view_vehiclesync) ||
      (accessRights && accessRights?.rights_view_vehiclegroup) ||
      accessRights?.rights_manage_vehicletype ||
      accessRights?.rights_manage_vehicle ||
      userRole == "customer"
    ) {
      AccessRightRoute();
    }
  }, [accessRights, userRole]);

  return (
    <motion.div
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}
      className={sidebar ? "taskMain " : "cx-active taskMain"}
      id="cx-main"
    >
      <div id="cx-wrapper" className="Vehicle_Main">
        <div className="Vehcle-main-tabs">
          <Tab.Container
            id="left-tabs-example"
            activeKey={eventKeymaincategory}
          >
            <Nav variant="pills" id="newTabMai" className="mb-0 customTabsMain">
              {mainTabsData &&
                mainTabsData?.map((tab, index) => {
                  return (
                    <Nav.Item key={"navigation" + index}>
                      <Nav.Link
                        eventKey={tab.eventKey}
                        onClick={() => {
                          setBottom(false);
                          setSearchData({
                            vehicleCategory: "",
                            vehicletype: "",
                            vehicleCapacity: "",
                            transportationType: "",
                          });
                          setVehicleTabListActive(tab.tabs);
                          localStorage.setItem(
                            "vehicleTabListActive",
                            tab.tabs
                          );
                          setPage(1);
                          setVehicleTabList(tab.tabs);
                          setPathTitlecategory(tab);
                          seteventKeyMaincategory(tab.eventKey);
                          setTabURL(tab.url);
                          setTabURLExport(tab.urlExport);
                          setTabData([]);
                          setVCars(false);
                          setView(false);

                          // vehicleAllList(tab.url, page)
                        }}
                      >
                        {t(tab.Title)}
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              <Nav.Item>
                {(userRole === "customer" ||
                  accessRights?.rights_view_hardware_feature_set == 1) && (
                  <Nav.Link
                    eventKey="Five"
                    onClick={() => {
                      setBottom(false);
                      setVehicleTabListActive("FeatureSet");
                      localStorage.setItem(
                        "vehicleTabListActive",
                        "FeatureSet"
                      );
                      seteventKeyMaincategory("Five");
                      setVehicleTabList("");
                      setTabURLExport(ApiConfig.GET_FEATURE_LIST_EXPORT);
                      getFeatureListApi();
                      setFeatureCardData([]);
                      // featureAllListDataApi(1, 1);
                      setVCars(false);
                      setView(false);
                    }}
                  >
                     {t("Hardware Feature-Set")}
                    
                  </Nav.Link>
                )}
              </Nav.Item>
            </Nav>
            <Tab.Content>
              {eventKeymaincategory !== "Five" && (
                <Tab.Pane eventKey={eventKeymaincategory}>
                  {pathTitlecategory?.Btname && (
                    <Link
                      to={pathTitlecategory.path}
                      onClick={() => setRouteIdEdit(false)}
                    >
                      <button className="cx-btn-1 tbBtn">
                        <span>{t("+")}</span>
                        {t(pathTitlecategory?.Btname)}
                      </button>
                    </Link>
                  )}

                  <div className="main-master-wrapper inner-tabs-section overflow-hidden length-height">
                    <div>
                      <Tab.Container
                        id="left-tabs-example"
                        className="td-tab-wrapper"
                        defaultActiveKey={subcategory}
                      >
                        {vehicleTabList == "vehicle" && (
                          <Nav
                            variant="pills"
                            className="td-nav"
                            id="InnerTabNew_Foure"
                          >
                            {subTabs?.map((subTab, index) => {
                              return (
                                <Nav.Item
                                  className="td-tab"
                                  key={"testing" + index}
                                >
                                  <Nav.Link
                                    className="td-link"
                                    eventKey={subTab.eventKey}
                                    onClick={() => {
                                      setBottom(false);
                                      setPage(1);
                                      setSearchData({
                                        vehicleCategory: "",
                                        vehicletype: "",
                                        vehicleCapacity: "",
                                        transportationType: "",
                                      });
                                      setSubcategory(subTab.eventKey);
                                      setSendSubcategory(subTab.sendTitle);
                                      setTabData([]);
                                    }}
                                  >
                                    {t(subTab.subTitle)}
                                  </Nav.Link>
                                </Nav.Item>
                              );
                            })}
                          </Nav>
                        )}

                        <Col sm={12} className="">
                          <Tab.Content>
                            <Tab.Pane eventKey={subcategory}>
                              <div className="all-vehicle-main">
                                {vehicleTabList === "sync" && (
                                  <div className="all-vehical-head row vehicle-top-inputs">
                                    <div className="input-section-wrapper">
                                      <div className="row">
                                        <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder={t("Vehicle Number")}
                                            onChange={(e) => {
                                              setTabData([]);
                                              setPage(1);
                                              setSearchData({
                                                ...searchData,
                                                vehicletype: e.target.value,
                                              });
                                            }}
                                          />
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12 mb-3 d-flex">
                                          <div className="innerSelectBox weekCounter datepicker-main">
                                            <CommonDatePicker
                                              dateKey="requestDate"
                                              setDate={setSearchData}
                                              data={searchData}
                                              SetPlaceholder={
                                                t("Request Sync Date")
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder={t("Sync Period")}
                                            onChange={(e) => {
                                              setTabData([]);
                                              setPage(1);
                                              setSearchData({
                                                ...searchData,
                                                vehicleCapacity: e.target.value,
                                              });
                                            }}
                                          />
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12 mb-3 ">
                                          <input
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder={t(
                                              "Sync Request Status"
                                            )}
                                            onChange={(e) => {
                                              setTabData([]);
                                              setPage(1);
                                              setSearchData({
                                                ...searchData,
                                                transportationType:
                                                  e.target.value,
                                              });
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="right-export-btn-section-wrapper iconBg">
                                      <div className="md_dropdown">
                                        <Dropdown>
                                          <Dropdown.Toggle id="dropdown-basic">
                                            <img src={Import} alt="" />
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item>
                                              <Link
                                                onClick={() =>
                                                  getExportChat(
                                                    tabURLExport,
                                                    1,
                                                    ""
                                                  )
                                                }
                                                className="d-block"
                                              >
                                               {t("PDF")} 
                                              </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                              <Link
                                                onClick={() =>
                                                  downLoadExcelSheet(
                                                    tabURLExport,
                                                    1
                                                  )
                                                }
                                                className="d-block"
                                              >
                                              {t("Excel")}  
                                              </Link>
                                            </Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {(vehicleTabList === "group" ||
                                  vehicleTabList === "category" ||
                                  vehicleTabList === "vehicle") && (
                                  <div className="all-vehical-head row vehicle-top-inputs">
                                    <div className="input-section-wrapper">
                                      {view === false && vCars === false && (
                                        <div
                                          className="row"
                                          key={"viewCategory"}
                                        >
                                          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder={
                                                vehicleTabList === "group"
                                                  ? t("Group Name")
                                                  : vehicleTabList ===
                                                    "category"
                                                  ? t("Category Name")
                                                  : t("Vehicle Number")
                                              }
                                              value={
                                                searchData?.vehicletype
                                                  ? searchData.vehicletype
                                                  : ""
                                              }
                                              onChange={(e) => {
                                                setTabData([]);

                                                setSearchData({
                                                  ...searchData,
                                                  vehicletype: e.target.value,
                                                });
                                                setPage(1);
                                              }}
                                            />
                                          </div>
                                          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder={
                                                vehicleTabList === "group"
                                                  ? t("Group Manager")
                                                  : vehicleTabList ===
                                                    "category"
                                                  ? t("Seat Capacity")
                                                  : t("Vehicle Type")
                                              }
                                              value={
                                                searchData?.vehicleCategory
                                                  ? searchData.vehicleCategory
                                                  : ""
                                              }
                                              onChange={(e) => {
                                                setTabData([]);
                                                setSearchData({
                                                  ...searchData,
                                                  vehicleCategory:
                                                    e.target.value,
                                                });
                                                setPage(1);
                                              }}
                                            />
                                          </div>
                                          {vehicleTabList !== "category" && (
                                            <div
                                              className="col-lg-3 col-md-6 col-sm-12 mb-3"
                                              key={"notcategory"}
                                            >
                                              <input
                                                type={
                                                  vehicleTabList === "group"
                                                    ? "text"
                                                    : "number"
                                                }
                                                className="form-control"
                                                min="1"
                                                placeholder={
                                                  vehicleTabList === "group"
                                                    ? t("Vehicle Count")
                                                    : t("Vehicle Capacity")
                                                }
                                                value={
                                                  searchData?.vehicleCapacity
                                                    ? searchData?.vehicleCapacity
                                                    : ""
                                                }
                                                onChange={(e) => {
                                                  setTabData([]);
                                                  setPage(1);
                                                  setSearchData({
                                                    ...searchData,
                                                    vehicleCapacity:
                                                      e.target.value,
                                                  });
                                                }}
                                              />
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>

                                    <div
                                      className="right-export-btn-section-wrapper"
                                      key={"buttonImport"}
                                    >
                                      {/* <div className="c-pointer me-2">
                                      <img src={Export} alt="" />
                                    </div> */}

                                      <div className="md_dropdown">
                                        <Dropdown>
                                          <Dropdown.Toggle id="dropdown-basic">
                                            <img src={Import} alt="" />
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item>
                                              <Link
                                                onClick={() =>
                                                  getExportChat(
                                                    tabURLExport,
                                                    1,
                                                    ""
                                                  )
                                                }
                                                className="d-block"
                                              >
                                               {t("PDF")} 
                                              </Link>
                                            </Dropdown.Item>

                                            <Dropdown.Item>
                                              <Link
                                                onClick={() =>
                                                  downLoadExcelSheet(
                                                    tabURLExport,
                                                    1
                                                  )
                                                }
                                                className="d-block"
                                              >
                                               {t("Excel")} 
                                              </Link>
                                            </Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <div
                                  className=""
                                  style={{ marginTop: "30px" }}
                                  id={
                                    vehicleTabList == "vehicle"
                                      ? "arrange-paading"
                                      : "arrange-paading2"
                                  }
                                  // id="scroll_insideThe_Padding_tabel"
                                  onScroll={(e) => {
                                    setBottom(e ? true : false);
                                    const bottom1 =
                                      e.target.scrollHeight -
                                        e.target.scrollTop ===
                                      e.target.clientHeight;

                                    if (
                                      bottom &&
                                      bottom1 &&
                                      !last_page &&
                                      view === false &&
                                      vCars === false
                                    ) {
                                      setPage(page + 1);

                                      vehicleAllList(tabURL, page + 1);
                                    }
                                  }}
                                >
                                  {loader ? (
                                    <Loader />
                                  ) : (
                                    <div className="row main-cards-wrapper  ">
                                      {vehicleTabList === "vehicle" && (
                                        <>
                                          {TabData && TabData.length > 0 ? (
                                            <>
                                              {TabData?.map((item, index) => {
                                                return (
                                                  <div
                                                    className={
                                                      sidebar
                                                        ? "col-xl-4 col-lg-6 col-md-6"
                                                        : "col-xl-3 col-lg-4 col-md-6"
                                                    }
                                                    key={"vehicle" + index}
                                                  >
                                                    <div
                                                      className={
                                                        "common-vehical-card-inner"
                                                      }
                                                    >
                                                      {/* item.vehicle_image_path?`${ApiConfig.BASE_URL}${item?.vehicle_image_path}`: */}
                                                      <div className="vehical-card-head">
                                                        <div className="heading">
                                                          <ImageValid
                                                            item={item}
                                                          />
                                                          {/* <img src={item.vehicle_type_code === "Bike" ? GRbike : GRbike || item.vehicle_type_code === "Truck" ? Gcar : GRbike || item.vehicle_type_code === "Bus" ? Cat_ye_car : GRbike} alt="" /> */}
                                                          <div className="">
                                                            <p className="sub-heading">
                                                              {t(
                                                                "Vehicle Number"
                                                              )}
                                                            </p>
                                                            <p className="title">
                                                              {
                                                                item?.vehicle_number
                                                              }
                                                            </p>
                                                          </div>
                                                        </div>

                                                        <div className="option customer-option">
                                                          <Dropdown>
                                                            {(userRole ===
                                                              "customer" ||
                                                              accessRights?.rights_view_vehicle ==
                                                                1) && (
                                                              <Dropdown.Toggle id="dropdown-basic">
                                                                <img
                                                                  src={option}
                                                                  alt=""
                                                                />
                                                              </Dropdown.Toggle>
                                                            )}

                                                            <Dropdown.Menu>
                                                              {(userRole ===
                                                                "customer" ||
                                                                accessRights?.rights_view_vehicle ==
                                                                  1) && (
                                                                <Dropdown.Item>
                                                                  <Link
                                                                    to={
                                                                      "/VehicleDetails/" +
                                                                      item.vehicle_id
                                                                    }
                                                                    className="d-block"
                                                                  >
                                                                    {t("View")}
                                                                  </Link>
                                                                </Dropdown.Item>
                                                              )}

                                                              {userRole ===
                                                                "customer" ||
                                                              accessRights?.rights_manage_vehicle ==
                                                                1 ? (
                                                                <>
                                                                  <Dropdown.Item>
                                                                    <Link
                                                                      to={
                                                                        "/AddVehicle/" +
                                                                        item.vehicle_id
                                                                      }
                                                                      className="d-block"
                                                                      onClick={() =>
                                                                        setRouteIdEdit(
                                                                          true
                                                                        )
                                                                      }
                                                                    >
                                                                      {t(
                                                                        "Edit"
                                                                      )}
                                                                    </Link>
                                                                  </Dropdown.Item>
                                                                  <Dropdown.Item
                                                                    onClick={() => {
                                                                      setDeleteID(
                                                                        item.vehicle_id
                                                                      );
                                                                      setTabURLDelete(
                                                                        ApiConfig.VEHICLE_DELETE +
                                                                          `?vehicle_id=${item.vehicle_id}`
                                                                      );
                                                                      handleShow();
                                                                    }}
                                                                  >
                                                                    <Link
                                                                      to="#"
                                                                      className="d-block"
                                                                    >
                                                                      {t(
                                                                        "Delete"
                                                                      )}
                                                                    </Link>
                                                                  </Dropdown.Item>
                                                                  {item
                                                                    ?.immobolizaion
                                                                    ?.is_active && (
                                                                    <Dropdown.Item>
                                                                      <Link
                                                                        className="d-block"
                                                                        onClick={() => {
                                                                          setImbKeyData(
                                                                            "vehicle"
                                                                          );
                                                                          setImbStatusData(
                                                                            {
                                                                              vehicle_id:
                                                                                item
                                                                                  ?.immobolizaion
                                                                                  ?.vehicle_id,
                                                                              feature_set_value:
                                                                                item
                                                                                  ?.immobolizaion
                                                                                  .feature_set_value,
                                                                              vehicle_imei:
                                                                                item?.vehicle_imei,
                                                                            }
                                                                          );
                                                                          handleShow2();
                                                                        }}
                                                                      >
                                                                        {t(
                                                                          item
                                                                            ?.immobolizaion
                                                                            ?.feature_set_value ===
                                                                            "activated"
                                                                            ? "Deactivate immobilization"
                                                                            : "Activate immobilization "
                                                                        )}
                                                                      </Link>
                                                                    </Dropdown.Item>
                                                                  )}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )}
                                                            </Dropdown.Menu>
                                                          </Dropdown>
                                                        </div>
                                                      </div>
                                                      <div className="vehical-card-body row">
                                                        {/* <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                        <p className="sub-heading">
                                                          {t("Vehicle Number")}
                                                        </p>
                                                        <p className="title">
                                                          {item.vehicle_number}
                                                        </p>
                                                      </div> */}
                                                        <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                          <p className="sub-heading">
                                                            {t("Driver Name")}
                                                          </p>
                                                          <p className="title">
                                                            {item?.user_name}
                                                          </p>
                                                        </div>
                                                        <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                          <p className="sub-heading">
                                                            {t("IMEI No.")}
                                                          </p>
                                                          <p className="title">
                                                            {item?.vehicle_imei}
                                                          </p>
                                                        </div>
                                                        <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                          <p className="sub-heading">
                                                            {t("Vehicle Type")}
                                                          </p>
                                                          <p className="title">
                                                            {" "}
                                                            {
                                                              item?.vehicle_type_code
                                                            }
                                                          </p>
                                                        </div>

                                                        <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                          <p className="sub-heading">
                                                            {t(
                                                              "Vehicle Capacity / Passenger"
                                                            )}
                                                          </p>
                                                          <p className="title">
                                                            {
                                                              item.vehicle_seat_capacity
                                                            }
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              })}
                                            </>
                                          ) : (
                                            <NoDataComp />
                                          )}
                                        </>
                                      )}

                                      {vehicleTabList === t("category") && (
                                        <>
                                          {vCars === true ? (
                                            <>
                                              <>
                                                <img
                                                  src={arrow}
                                                  alt=""
                                                  style={{
                                                    width: "50px",
                                                    margin: "10px 0",
                                                  }}
                                                  className="c-pointer"
                                                  onClick={() => {
                                                    setVCars(false);
                                                    // vehicleAllList(ApiConfig.GET_VEHICLE_CATEGORY, 1,"key","category");
                                                  }}
                                                />
                                                <div
                                                  className="yauto"
                                                  id="arrange-paading2"
                                                  key={"subDataMenue"}
                                                >
                                                  {categorySubData &&
                                                  categorySubData?.length >
                                                    0 ? (
                                                    categorySubData?.map(
                                                      (ele, index) => {
                                                        return (
                                                          <div
                                                            key={
                                                              "testingsub" +
                                                              index
                                                            }
                                                            className={
                                                              sidebar
                                                                ? "common-vehical-card"
                                                                : "common-vehical-card-inner"
                                                            }
                                                          >
                                                            <div className="vehical-card-head">
                                                              <div className="heading">
                                                                <ImageValid
                                                                  item={ele}
                                                                />
                                                                {/* vehicle_type_icon */}
                                                                <div className="">
                                                                  <p className="sub-heading">
                                                                    {t(
                                                                      "Vehicle Name "
                                                                    )}
                                                                  </p>
                                                                  <p className="title">
                                                                    {
                                                                      ele?.vehicle_number
                                                                    }
                                                                  </p>
                                                                </div>
                                                              </div>
                                                              <div className="option customer-option">
                                                                <Dropdown>
                                                                  <Dropdown.Toggle id="dropdown-basic">
                                                                    <img
                                                                      src={
                                                                        option
                                                                      }
                                                                      alt=""
                                                                    />
                                                                  </Dropdown.Toggle>

                                                                  <Dropdown.Menu>
                                                                    <Dropdown.Item>
                                                                      <Link
                                                                        to={
                                                                          "/VehicleDetails/" +
                                                                          ele?.vehicle_id
                                                                        }
                                                                        className="d-block"
                                                                      >
                                                                        {t(
                                                                          "View"
                                                                        )}
                                                                      </Link>
                                                                    </Dropdown.Item>
                                                                    {userRole ===
                                                                      "customer" ||
                                                                    (accessRights &&
                                                                      accessRights?.rights_manage_vehicle ==
                                                                        1) ? (
                                                                      <>
                                                                        <Dropdown.Item>
                                                                          <Link
                                                                            to={
                                                                              "/AddVehicle/" +
                                                                              ele?.vehicle_id
                                                                            }
                                                                            className="d-block"
                                                                            onClick={() =>
                                                                              setRouteIdEdit(
                                                                                true
                                                                              )
                                                                            }
                                                                          >
                                                                            {t(
                                                                              "Edit"
                                                                            )}
                                                                          </Link>
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item
                                                                          onClick={() => {
                                                                            setTabURLDelete(
                                                                              ApiConfig.VEHICLE__CATEGORY_DELETE +
                                                                                `?vehicle_id=${ele?.vehicle_id}`
                                                                            );
                                                                            handleShow();
                                                                          }}
                                                                        >
                                                                          <Link
                                                                            to="#"
                                                                            className="d-block"
                                                                          >
                                                                            {t(
                                                                              "Delete"
                                                                            )}
                                                                          </Link>
                                                                        </Dropdown.Item>
                                                                      </>
                                                                    ) : (
                                                                      <></>
                                                                    )}
                                                                  </Dropdown.Menu>
                                                                </Dropdown>
                                                              </div>
                                                            </div>
                                                            <div
                                                              className="vehical-card-body row"
                                                              key={
                                                                "suCategoryData"
                                                              }
                                                            >
                                                              <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                                <p className="sub-heading">
                                                                  {t(
                                                                    "Vehicle Number"
                                                                  )}
                                                                </p>
                                                                <p className="title">
                                                                  {" "}
                                                                  {
                                                                    ele?.vehicle_number
                                                                  }
                                                                </p>
                                                              </div>
                                                              <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                                <p className="sub-heading">
                                                                  {t(
                                                                    "Driver Name"
                                                                  )}
                                                                </p>
                                                                <p className="title">
                                                                  {
                                                                    ele?.driver_name
                                                                  }
                                                                </p>
                                                              </div>
                                                              <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                                <p className="sub-heading">
                                                                  {t(
                                                                    "IMEI No."
                                                                  )}
                                                                </p>
                                                                <p className="title">
                                                                  {
                                                                    ele?.vehicle_imei
                                                                  }
                                                                </p>
                                                              </div>
                                                              <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                                <p className="sub-heading">
                                                                  {t(
                                                                    "Vehicle Type"
                                                                  )}
                                                                </p>
                                                                <p className="title">
                                                                  {" "}
                                                                  {
                                                                    ele?.vehicle_type_code
                                                                  }
                                                                </p>
                                                              </div>
                                                              <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                                <p className="sub-heading">
                                                                  {t(
                                                                    "Transportation Type"
                                                                  )}
                                                                </p>
                                                                <p className="title">
                                                                  {" "}
                                                                  {
                                                                    ele?.vehicle_number
                                                                  }
                                                                </p>
                                                              </div>
                                                              <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                                <p className="sub-heading">
                                                                  index
                                                                  {t(
                                                                    "Vehicle Capacity / Passenger"
                                                                  )}
                                                                </p>
                                                                <p className="title">
                                                                  {" "}
                                                                  {
                                                                    ele?.vehicle_seat_capacity
                                                                  }
                                                                </p>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        );
                                                      }
                                                    )
                                                  ) : (
                                                    <NoDataComp />
                                                  )}
                                                </div>
                                              </>
                                            </>
                                          ) : (
                                            <>
                                              {TabData &&
                                              TabData?.length > 0 ? (
                                                TabData?.map((item, index) => {
                                                  return (
                                                    <div className="col-md-4">
                                                      <div
                                                        key={
                                                          "vehicleCategory" +
                                                          index
                                                        }
                                                        className={
                                                          sidebar
                                                            ? "common-cat-vehical-card"
                                                            : "common-cat-vehical-card-inner"
                                                        }
                                                        // onClick={() => {
                                                        //   apiCallForSubCategory(item.vehicle_type_id)
                                                        //   setVCars(true)
                                                        // }}
                                                      >
                                                        <div
                                                          className="cat-head"
                                                          onClick={() => {
                                                            if (
                                                              userRole ===
                                                                "customer" ||
                                                              accessRights?.rights_view_vehicle
                                                            ) {
                                                              setGroupdeletlist(
                                                                item.vehicle_type_id
                                                              );
                                                              apiCallForSubCategory(
                                                                item.vehicle_type_id
                                                              );
                                                              setCategoryIdPdf(
                                                                item.vehicle_type_id
                                                              );
                                                              setVCars(true);
                                                              setTabURLExport(
                                                                ApiConfig.GET_VEHICLE_SUB_CATEGORY_EXPORT,
                                                                page
                                                              );
                                                            }
                                                          }}
                                                        >
                                                          <ImageValid
                                                            item={item}
                                                          />
                                                        </div>
                                                        <div className="cat-body w-100">
                                                          <div className="cat-body-head">
                                                            <p>
                                                              {
                                                                item.vehicle_type_code
                                                              }
                                                            </p>
                                                            <p className="count_number">
                                                              {item?.vehicle_count
                                                                ? item?.vehicle_count
                                                                : 0}
                                                            </p>
                                                            {userRole ===
                                                              "customer" ||
                                                            (accessRights &&
                                                              accessRights?.rights_manage_vehicletype ==
                                                                1) ? (
                                                              <div className="option customer-option">
                                                                <Dropdown>
                                                                  <Dropdown.Toggle
                                                                    id="dropdown-basic"
                                                                    style={{
                                                                      backgroundColor:
                                                                        "transparent",
                                                                    }}
                                                                  >
                                                                    <img
                                                                      src={
                                                                        option
                                                                      }
                                                                      alt=""
                                                                    />
                                                                  </Dropdown.Toggle>

                                                                  <Dropdown.Menu>
                                                                    <Dropdown.Item>
                                                                      <Link
                                                                        to={
                                                                          "/AddVehicleCategory/" +
                                                                          item?.vehicle_type_id
                                                                        }
                                                                        className="d-block"
                                                                        onClick={() =>
                                                                          setRouteIdEdit(
                                                                            true
                                                                          )
                                                                        }
                                                                      >
                                                                        {t(
                                                                          "Edit"
                                                                        )}
                                                                      </Link>
                                                                    </Dropdown.Item>
                                                                  </Dropdown.Menu>
                                                                </Dropdown>
                                                              </div>
                                                            ) : (
                                                              <></>
                                                            )}
                                                          </div>
                                                          <div className="cat-body-details">
                                                            <label htmlFor="">
                                                              <img
                                                                src={route}
                                                                alt=""
                                                              />
                                                              {item?.vehicle_type_total_distance_travelled
                                                                ? item?.vehicle_type_total_distance_travelled
                                                                : "00"}
                                                              {/* 2.5K */}
                                                            </label>
                                                            <label htmlFor="">
                                                              <img
                                                                src={Repair}
                                                                alt=""
                                                              />
                                                              {item?.vehicle_type_avg_maintenance_cost
                                                                ? item?.vehicle_type_avg_maintenance_cost
                                                                : "00"}
                                                              {/* "5$/m" */}
                                                            </label>
                                                            <label htmlFor="">
                                                              <img
                                                                src={Pump}
                                                                alt=""
                                                              />
                                                              {item?.vehicle_type_fuel
                                                                ? item?.vehicle_type_fuel
                                                                : "00"}
                                                            </label>
                                                            <label htmlFor="">
                                                              <img
                                                                src={Seats}
                                                                alt=""
                                                              />
                                                              {item?.vehicle_type_capacity
                                                                ? item?.vehicle_type_capacity
                                                                : "00"}
                                                            </label>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                })
                                              ) : (
                                                <NoDataComp />
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}

                                      {vehicleTabList === "group" && (
                                        <>
                                          {view === true ? (
                                            <>
                                              <div className="back-btn-wrapper">
                                                <button
                                                  className="cx-btn-1"
                                                  onClick={() => {
                                                    setView(false);
                                                  }}
                                                >
                                                  {" "}
                                                  {t("Back To Group Vehicle")}
                                                </button>
                                              </div>
                                              {groupSubData &&
                                              groupSubData.length > 0 ? (
                                                groupSubData?.map(
                                                  (item, index) => {
                                                    return (
                                                      <div
                                                        key={
                                                          "SUBcaTEGORY" + index
                                                        }
                                                        className={
                                                          sidebar
                                                            ? "col-xl-4 col-lg-6 col-md-6"
                                                            : "col-xl-3 col-lg-4 col-md-6"
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            "common-vehical-card-inner"
                                                          }
                                                        >
                                                          <div className="vehical-card-head">
                                                            <div className="heading">
                                                              <ImageValid
                                                                item={item}
                                                              />
                                                              <div className="">
                                                                <p className="sub-heading">
                                                                  {t(
                                                                    "Vehicle Name"
                                                                  )}
                                                                </p>
                                                                <p className="title">
                                                                  {
                                                                    item?.vehicle_model_no
                                                                  }
                                                                </p>
                                                              </div>
                                                            </div>
                                                            <div className="option customer-option">
                                                              <Dropdown>
                                                                {(userRole ===
                                                                  "customer" ||
                                                                  accessRights?.rights_view_vehicle ==
                                                                    1) && (
                                                                  <Dropdown.Toggle id="dropdown-basic">
                                                                    <img
                                                                      src={
                                                                        option
                                                                      }
                                                                      alt=""
                                                                    />
                                                                  </Dropdown.Toggle>
                                                                )}

                                                                <Dropdown.Menu>
                                                                  {(userRole ===
                                                                    "customer" ||
                                                                    accessRights?.rights_view_vehicle ==
                                                                      1) && (
                                                                    <Dropdown.Item>
                                                                      <Link
                                                                        to={
                                                                          "/VehicleDetails/" +
                                                                          item?.vehicle_id
                                                                        }
                                                                        className="d-block"
                                                                      >
                                                                        {t(
                                                                          "View"
                                                                        )}
                                                                      </Link>
                                                                    </Dropdown.Item>
                                                                  )}

                                                                  {userRole ===
                                                                    "customer" ||
                                                                  (accessRights &&
                                                                    accessRights?.rights_manage_vehicle ==
                                                                      1) ? (
                                                                    <>
                                                                      <Dropdown.Item>
                                                                        <Link
                                                                          to={
                                                                            "/AddVehicle/" +
                                                                            item?.vehicle_id
                                                                          }
                                                                          className="d-block"
                                                                          onClick={() =>
                                                                            setRouteIdEdit(
                                                                              true
                                                                            )
                                                                          }
                                                                        >
                                                                          {t(
                                                                            "Edit"
                                                                          )}
                                                                        </Link>
                                                                      </Dropdown.Item>
                                                                      <Dropdown.Item
                                                                        onClick={() => {
                                                                          handleShow();
                                                                          setGroupDeletBody(
                                                                            {
                                                                              vehicleGroupId:
                                                                                item.vehicle_group_vehicle_group_id,
                                                                              vehicle_id:
                                                                                item.vehicle_id,
                                                                            }
                                                                          );
                                                                          setTabURLDelete(
                                                                            ApiConfig.GROUP_VEHICLE_DELETE
                                                                            // +
                                                                            // `?vehicle_id=${item.vehicle_id}`
                                                                          );
                                                                        }}
                                                                      >
                                                                        <Link
                                                                          to="#"
                                                                          className="d-block"
                                                                        >
                                                                          {t(
                                                                            "Delete"
                                                                          )}
                                                                        </Link>
                                                                      </Dropdown.Item>
                                                                    </>
                                                                  ) : (
                                                                    <></>
                                                                  )}
                                                                </Dropdown.Menu>
                                                              </Dropdown>
                                                            </div>
                                                          </div>
                                                          <div className="vehical-card-body row">
                                                            <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                              <p className="sub-heading">
                                                                {t(
                                                                  "Vehicle Number"
                                                                )}
                                                              </p>
                                                              <p className="title">
                                                                {
                                                                  item?.vehicle_number
                                                                }
                                                              </p>
                                                            </div>
                                                            <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                              <p className="sub-heading">
                                                                {t(
                                                                  "Driver Name"
                                                                )}
                                                              </p>
                                                              <p className="title">
                                                                {
                                                                  item?.user_name
                                                                }
                                                              </p>
                                                            </div>
                                                            <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                              <p className="sub-heading">
                                                                {t("IMEI No.")}
                                                              </p>
                                                              <p className="title">
                                                                {
                                                                  item?.vehicle_imei
                                                                }
                                                              </p>
                                                            </div>
                                                            <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                              <p className="sub-heading">
                                                                {t(
                                                                  "Vehicle Type"
                                                                )}
                                                              </p>
                                                              <p className="title">
                                                                {
                                                                  item?.vehicle_type
                                                                }
                                                              </p>
                                                            </div>
                                                            <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                              <p className="sub-heading">
                                                                {t(
                                                                  "Transportation Type"
                                                                )}
                                                              </p>
                                                              <p className="title">
                                                                Passenger
                                                              </p>
                                                            </div>
                                                            <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                              <p className="sub-heading">
                                                                {t(
                                                                  "Vehicle Capacity / Passenger"
                                                                )}
                                                              </p>
                                                              <p className="title">
                                                                {
                                                                  item?.vehicle_seat_capacity
                                                                }
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    );
                                                  }
                                                )
                                              ) : (
                                                <NoDataComp />
                                              )}
                                            </>
                                          ) : (
                                            <>
                                              {TabData && TabData.length > 0 ? (
                                                TabData?.map((item, index) => {
                                                  return (
                                                    <div
                                                      key={
                                                        "vehicleGroup" + index
                                                      }
                                                      className={
                                                        sidebar
                                                          ? "col-xl-4 col-lg-6 col-md-6"
                                                          : "col-xl-3 col-lg-4 col-md-6"
                                                      }
                                                    >
                                                      <div
                                                        className={
                                                          "common-vehical-card-inner"
                                                        }
                                                      >
                                                        <div className="vehical-card-head ">
                                                          <div className="heading">
                                                            <img
                                                              src={Grouplogo}
                                                              alt=""
                                                              className="custom-Margin "
                                                            />
                                                            <div className="">
                                                              <p className="sub-heading">
                                                               {t("Group Name")} 
                                                              </p>
                                                              <p className="title">
                                                                {
                                                                  item?.vehicle_group_name
                                                                }
                                                              </p>
                                                            </div>
                                                          </div>
                                                          <div className="option customer-option">
                                                            <Dropdown>
                                                              {(userRole ===
                                                                "customer" ||
                                                                accessRights?.rights_view_vehicle ==
                                                                  1) && (
                                                                <Dropdown.Toggle id="dropdown-basic">
                                                                  <img
                                                                    src={option}
                                                                    alt=""
                                                                  />
                                                                </Dropdown.Toggle>
                                                              )}
                                                              <Dropdown.Menu>
                                                                {(userRole ===
                                                                  "customer" ||
                                                                  accessRights?.rights_view_vehicle ==
                                                                    1) && (
                                                                  <Dropdown.Item>
                                                                    <Link
                                                                      to="#"
                                                                      onClick={() => {
                                                                        setTabURLExport(
                                                                          ApiConfig.VEHICLE_LISTGROUPVIEW_EXPORT,
                                                                          page
                                                                        );
                                                                        showView();
                                                                        setGroupIdPdf(
                                                                          item?.vehicle_group_id
                                                                        );
                                                                        setGroupdeletlist(
                                                                          item?.vehicle_group_id
                                                                        );
                                                                        apiCallForSubgroup(
                                                                          item?.vehicle_group_id
                                                                        );
                                                                      }}
                                                                      className="d-block"
                                                                    >
                                                                      {t(
                                                                        "View"
                                                                      )}
                                                                    </Link>
                                                                  </Dropdown.Item>
                                                                )}

                                                                {userRole ===
                                                                  "customer" ||
                                                                (accessRights &&
                                                                  accessRights?.rights_manage_vehiclegroup == 1) ? (
                                                                  <>
                                                                    <Dropdown.Item>
                                                                      <Link
                                                                        to={
                                                                          "/AddVehicleGroup/" +
                                                                          item?.vehicle_group_id
                                                                        }
                                                                        className="d-block"
                                                                        onClick={() =>
                                                                          setRouteIdEdit(
                                                                            true
                                                                          )
                                                                        }
                                                                      >
                                                                        {t(
                                                                          "Edit"
                                                                        )}
                                                                      </Link>
                                                                    </Dropdown.Item>
                                                                    {/* <Dropdown.Item>
                                                                <Link
                                                                  to="#"
                                                                  className="d-block"
                                                                >
                                                                  {t(
                                                                    "Geofence"
                                                                  )}
                                                                </Link>
                                                              </Dropdown.Item> */}
                                                                    <Dropdown.Item
                                                                      onClick={() => {
                                                                        setTabURLDelete(
                                                                          ApiConfig.VEHICLEGROUP_DELETE +
                                                                            `?groupId=${item?.vehicle_group_id}`
                                                                        );
                                                                        showGroup();
                                                                      }}
                                                                    >
                                                                      <Link
                                                                        to="#"
                                                                        className="d-block"
                                                                      >
                                                                        {t(
                                                                          "Delete"
                                                                        )}
                                                                      </Link>
                                                                    </Dropdown.Item>
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )}
                                                              </Dropdown.Menu>
                                                            </Dropdown>
                                                          </div>
                                                        </div>
                                                        <div className="vehical-card-body row">
                                                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                            <p className="sub-heading">
                                                              {t(
                                                                "Group Manager"
                                                              )}
                                                            </p>
                                                            <p className="title">
                                                              {
                                                                item?.manager_name
                                                              }
                                                            </p>
                                                          </div>
                                                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                            <p className="sub-heading">
                                                              {t(
                                                                "Group Created At"
                                                              )}
                                                            </p>
                                                            <p className="title">
                                                              {item?.vehicle_group_createat &&
                                                                DateDDMMYYYY(
                                                                  item?.vehicle_group_createat
                                                                )}
                                                            </p>
                                                          </div>
                                                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                            <p className="sub-heading">
                                                              {t("Drivers")}
                                                            </p>
                                                            <p className="title">
                                                              {
                                                                item?.vehicle_group_manager_id
                                                              }
                                                            </p>
                                                          </div>
                                                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                            <p className="sub-heading">
                                                              {t(
                                                                "Vehicles Count"
                                                              )}
                                                            </p>
                                                            <p className="title">
                                                              {
                                                                item?.vehicle_count
                                                              }
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                })
                                              ) : (
                                                <NoDataComp />
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}

                                      {/*  */}

                                      <>
                                        {
                                          <div
                                            className="yauto"
                                            id="viewCard_Group"
                                          ></div>
                                        }
                                      </>

                                      {vehicleTabList === "sync" && (
                                        <>
                                          {TabData && TabData?.length > 0 ? (
                                            TabData?.map((item, index) => {
                                              return (
                                                <div
                                                  key={"vehicleSync" + index}
                                                  className={
                                                    sidebar
                                                      ? "col-xl-4 col-lg-6 col-md-6"
                                                      : "col-xl-3 col-lg-4 col-md-6"
                                                  }
                                                >
                                                  <div
                                                    className={
                                                      "common-vehical-card-inner"
                                                    }
                                                  >
                                                    <div className="vehical-card-head">
                                                      <div className="heading">
                                                        <ImageValid
                                                          item={item}
                                                        />
                                                        <div className="">
                                                          <p className="sub-heading">
                                                            {t("Vehicle Name")}
                                                          </p>
                                                          <p className="title">
                                                            {
                                                              item?.vehicle_number
                                                            }
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="vehical-card-body row">
                                                      <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                        <p className="sub-heading">
                                                          {t(
                                                            "Sync Request Date"
                                                          )}
                                                        </p>
                                                        <p className="title">
                                                          {DateDDMMYYYY(
                                                            item?.syncrequest_requested_datetime
                                                          )}
                                                        </p>
                                                      </div>
                                                      <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                        <p className="sub-heading">
                                                          {t(
                                                            "Sync Request Time"
                                                          )}
                                                        </p>
                                                        <p className="title">
                                                          {getTime(
                                                            item?.syncrequest_requested_datetime
                                                          )}
                                                        </p>
                                                      </div>
                                                      <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                        <p className="sub-heading">
                                                          {t("Sync Period")}
                                                        </p>
                                                        <p className="title">
                                                          {
                                                            item?.syncrequest_sync_period
                                                          }
                                                        </p>
                                                      </div>

                                                      {item?.syncrequest_sync_period ==
                                                        "Specific Date" && (
                                                        <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                          <p className="sub-heading">
                                                            {t("Sync  Date")}
                                                          </p>
                                                          <p className="title">
                                                            {DateDDMMYYYY(
                                                              item?.syncrequest_requested_datetime
                                                            )}
                                                          </p>
                                                        </div>
                                                      )}
                                                      {item?.syncrequest_sync_period ==
                                                        "Range" && (
                                                        <>
                                                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                            <p className="sub-heading">
                                                              {t(
                                                                "Sync Start Date"
                                                              )}
                                                            </p>
                                                            <p className="title">
                                                              {DateDDMMYYYY(
                                                                item?.syncrequest_requested_datetime
                                                              )}
                                                            </p>
                                                          </div>
                                                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                            <p className="sub-heading">
                                                              {t(
                                                                "Sync End Date"
                                                              )}
                                                            </p>
                                                            <p className="title">
                                                              {item?.syncrequest_sync_datetime &&
                                                                DateDDMMYYYY(
                                                                  item?.syncrequest_sync_datetime
                                                                )}
                                                            </p>
                                                          </div>
                                                        </>
                                                      )}
                                                      <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                        <p className="sub-heading">
                                                          {t(
                                                            "Sync Request Status"
                                                          )}
                                                        </p>
                                                        <p className="title">
                                                          {
                                                            item?.syncrequest_sync_status
                                                          }
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            })
                                          ) : (
                                            <NoDataComp />
                                          )}
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                                {/* {} */}
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Tab.Container>
                    </div>

                    {vCars != true && view != true && TabData?.length > 0 && (
                      <Pagenation
                        length={TabData?.length}
                        total={total_count}
                        comp={"Merchant"}
                      />
                    )}
                  </div>
                  {/* // } */}
                </Tab.Pane>
              )}
              {/* Static  Tab.Pane added from 1529 till 11237*/}

              {featureCard_Id && (
                <Tab.Pane eventKey="Five">
                  <div id="fetureset_main">
                    <div className="inner_tabs_For_FeatureSet">
                      <Tab.Container
                        id="left-tabs-example"
                        className="Inner_tab_featureSet"
                        defaultActiveKey={Number(featureCard_Id)}
                      >
                        <Nav
                          variant="pills"
                          className="td-nav mb-3"
                          id="InnerTabNew_feature"
                        >
                          <Nav.Item className="UL_main_feature">
                            <Splide
                              options={{
                                rewind: true,
                                // type: 'loop',
                                focus: 0,
                                // omitEnd  : true,
                                autoWidth: true,
                                next: "splide__arrow--next your-class-next",
                                gap: "1rem",
                              }}
                              aria-label="My Favorite Images"
                            >
                              {/* {console.log("FEATURELIST : ", featureListData)} taleeb for testing nav bar static or dynamic */}
                              {featureListData && 
                                featureListData?.map((ele) => {
                                  return (
                                    <SplideSlide>
                                      <Nav.Link
                                        className="td-link"
                                        eventKey={ele.feature_id}
                                        onClick={() => {
                                          setBottom(false);
                                          setPageFeature(1);

                                          setflagSearch(false);
                                          setFeatureCardDataSearch({
                                            vehicle_number: "",
                                            vehicle_type_description: "",
                                          });
                                          setFeatureCard_Id(ele.feature_id);
                                          setFeatureSubTab(ele.feature_id);

                                          featureAllListDataApi(
                                            ele.feature_id,
                                            1,
                                            "tab"
                                          );
                                        }}
                                      >
                                        {ele.feature}
                                      </Nav.Link>
                                    </SplideSlide>
                                  );
                                })}
                            </Splide>
                          </Nav.Item>
                        </Nav>
                        <Col
                          sm={12}
                          className=""
                          id="scroll_insideThe_Padding183"
                        >
                          <Tab.Content>
                            <Tab.Pane eventKey={featureSubTab}>
                              <div className="all-vehicle-main featureSet_card_main">
                                <div className="all-vehical-head row vehicle-top-inputs">
                                  <div className="input-section-wrapper">
                                    <div className="row">
                                      <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={t("Vehicle Number,No., Reg. No, IMEI...")}
                                          onChange={(e) => {
                                            setPageFeature(1);
                                            setTabData([]);
                                            setFeatureCardData([]);
                                            setFeatureCardDataSearch({
                                              ...featureCardDataSearch,
                                              vehicle_number: e.target.value,
                                            });
                                          }}
                                          value={
                                            featureCardDataSearch.vehicle_number
                                          }
                                        />
                                      </div>
                                      <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={t("Vehicle Type")}
                                          onChange={(e) => {
                                            setPageFeature(1);
                                            setTabData([]);
                                            setFeatureCardData([]);
                                            setFeatureCardDataSearch({
                                              ...featureCardDataSearch,
                                              vehicle_type_description:
                                                e.target.value,
                                            });
                                          }}
                                          value={
                                            featureCardDataSearch.vehicle_type_description
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="right-export-btn-section-wrapper">
                                    {/* <div className="c-pointer me-2">
                                    <img src={Export} alt="" />
                                  </div> */}

                                    <div className="md_dropdown">
                                      <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic">
                                          <img src={Import} alt="" />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                          <Dropdown.Item>
                                            <Link
                                              onClick={() =>
                                                getExportChat(
                                                  tabURLExport,
                                                  1,
                                                  ""
                                                )
                                              }
                                              className="d-block"
                                            >
                                           {t("PDF")}    
                                            </Link>
                                          </Dropdown.Item>

                                          <Dropdown.Item>
                                            <Link
                                              onClick={() =>
                                                downLoadExcelSheet(
                                                  tabURLExport,
                                                  1
                                                )
                                              }
                                              className="d-block"
                                            >
                                              {t("Excel")} 
                                            </Link>
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className="yauto"
                                  id="scroll_insideThe_Padding_tabel"
                                  onScroll={(e) => {
                                    setBottom(e ? true : false);
                                    const bottom1 =
                                      e.target.scrollHeight -
                                        e.target.scrollTop ===
                                      e.target.clientHeight;
                                    if (flagSearch === true) {
                                      if (
                                        bottom &&
                                        bottom1 &&
                                        !last_pageFeature
                                      ) {
                                        setPageFeature(pageFeature + 1);
                                        featureAllListDataApi(
                                          featureCard_Id,
                                          pageFeature + 1
                                        );
                                      }
                                    }
                                  }}
                                >
                                  <div className="row main-cards-wrapper gx-3">
                                    {featureSubTab == featureSubTab && (
                                      <>
                                        {featureCardData &&
                                        featureCardData.length > 0 ? (
                                          featureCardData?.map((ele, index) => {
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
                                                  <div
                                                    className="vehical-card-head"
                                                    key={
                                                      "Immobilization" + index
                                                    }
                                                  >
                                                    <div className="heading">
                                                      {ele.feature_id == 13 &&
                                                        (ele?.is_active ==
                                                        true ? (
                                                          <img
                                                            src={
                                                              Feature_CarLock_active
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={
                                                              Feature_CarLock
                                                            }
                                                            alt=""
                                                          />
                                                        ))}
                                                      {ele.feature_id == 1 &&
                                                        (ele?.is_active ? (
                                                          <img
                                                            src={
                                                              Feature_temp_active
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={Feature_temp}
                                                            alt=""
                                                          />
                                                        ))}
                                                      {ele.feature_id == 2 &&
                                                        (ele?.is_active ==
                                                        true ? (
                                                          <img
                                                            src={
                                                              Feature_Fuel_active
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={Feature_Fuel}
                                                            alt=""
                                                          />
                                                        ))}
                                                      {ele.feature_id == 3 &&
                                                        (ele?.is_active ==
                                                        true ? (
                                                          <img
                                                            src={
                                                              Feature_I_active
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={Feature_I}
                                                            alt=""
                                                          />
                                                        ))}

                                                      {ele.feature_id == 4 &&
                                                        (ele?.is_active ==
                                                        true ? (
                                                          <img
                                                            src={
                                                              Feature_Seat_active
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={Feature_Seat}
                                                            alt=""
                                                          />
                                                        ))}
                                                      {ele.feature_id == 5 &&
                                                        (ele?.is_active ==
                                                        true ? (
                                                          <img
                                                            src={
                                                              Feature_Echo_active
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={Feature_Echo}
                                                            alt=""
                                                          />
                                                        ))}
                                                      {ele.feature_id == 6 &&
                                                        (ele?.is_active ==
                                                        true ? (
                                                          <img
                                                            src={
                                                              Feature_IVMS_active
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={Feature_IVMS}
                                                            alt=""
                                                          />
                                                        ))}
                                                      {ele.feature_id == 7 &&
                                                        (ele?.is_active ==
                                                        true ? (
                                                          <img
                                                            src={
                                                              Feature_Card_active
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={Feature_Card}
                                                            alt=""
                                                          />
                                                        ))}
                                                      {ele.feature_id == 8 &&
                                                        (ele?.is_active ==
                                                        true ? (
                                                          <img
                                                            src={
                                                              Feature_Overspeed_active
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={
                                                              Feature_Overspeed
                                                            }
                                                            alt=""
                                                          />
                                                        ))}
                                                      {ele.feature_id == 9 &&
                                                        (ele?.is_active ==
                                                        true ? (
                                                          <img
                                                            src={
                                                              Feature_Crash_active
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={Feature_Crash}
                                                            alt=""
                                                          />
                                                        ))}
                                                      {ele.feature_id == 10 &&
                                                        (ele?.is_active ==
                                                        true ? (
                                                          <img
                                                            src={
                                                              Feature_Exicess_active
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={
                                                              Feature_Exicess
                                                            }
                                                            alt=""
                                                          />
                                                        ))}
                                                      {ele.feature_id == 11 &&
                                                        (ele?.is_active ==
                                                        true ? (
                                                          <img
                                                            src={
                                                              Feature_Towing_active
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={Feature_Towing}
                                                            alt=""
                                                          />
                                                        ))}
                                                      {ele.feature_id == 12 &&
                                                        (ele?.is_active ==
                                                        true ? (
                                                          <img
                                                            src={
                                                              Feature_Unplag_active
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={Feature_Unplag}
                                                            alt=""
                                                          />
                                                        ))}
                                                      {ele.feature_id == 14 &&
                                                        (ele?.is_active ==
                                                        true ? (
                                                          <img
                                                            src={
                                                              Tracking_Active
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={Tracking}
                                                            alt=""
                                                          />
                                                        ))}
                                                      {ele.feature_id == 15 &&
                                                        (ele?.is_active ==
                                                        true ? (
                                                          <img
                                                            src={
                                                              MapOffline_Active
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={MapOffline}
                                                            alt=""
                                                          />
                                                        ))}
                                                      <div className="">
                                                        <p className="sub-heading">
                                                          {t("Vehicle Number")}
                                                        </p>
                                                        <p className="title">
                                                          {ele?.vehicle_number}
                                                        </p>
                                                      </div>
                                                    </div>

                                                    {(userRole == "customer" ||
                                                      accessRights?.rights_manage_hardware_feature_set ==
                                                        1) && (
                                                      <div
                                                        className="form-check form-switch"
                                                        id="custom_switch"
                                                      >
                                                        <div className="d-flex innerFlexTog">
                                                          <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={ele.is_active}
                                                            checked={
                                                              ele?.is_active
                                                            }
                                                            disabled={
                                                              ele.feature_id ==
                                                              14
                                                                ? true
                                                                : ele.feature_id ==
                                                                  8
                                                                ? true
                                                                : false
                                                            }
                                                            onChange={() => {
                                                              setFeatureActionData(
                                                                {
                                                                  feature_id:
                                                                    ele.feature_id,
                                                                  feature_set_value:
                                                                    ele.feature_set_value,
                                                                  vehicle_id:
                                                                    ele.vehicle_id,
                                                                  is_active:
                                                                    !ele.is_active,
                                                                  vehicle_features_list_id:
                                                                    ele.vehicle_features_list_id,
                                                                }
                                                              );
                                                              ele?.is_active ==
                                                              true
                                                                ? handleShow1()
                                                                : featureActionApi(
                                                                    {
                                                                      feature_id:
                                                                        ele.feature_id,
                                                                      feature_set_value:
                                                                        ele.feature_set_value,
                                                                      vehicle_id:
                                                                        ele.vehicle_id,
                                                                      is_active:
                                                                        !ele.is_active,
                                                                      vehicle_features_list_id:
                                                                        ele.vehicle_features_list_id,
                                                                    }
                                                                  );
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                    )}
                                                  </div>
                                                  <div className="vehical-card-body row">
                                                    <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                      <p className="sub-heading">
                                                        {t("Registraion No.")}
                                                      </p>
                                                      <p className="title">
                                                        {ele?.vehicle_model_no}
                                                      </p>
                                                    </div>
                                                    <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                      <p className="sub-heading">
                                                        {t("Hardware Name")}
                                                      </p>
                                                      <p className="title">
                                                        {ele?.hardware_name}
                                                      </p>
                                                    </div>
                                                    <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                      <p className="sub-heading">
                                                        {t("IMEI No.")}
                                                      </p>
                                                      <p className="title">
                                                        {ele?.vehicle_imei}
                                                      </p>
                                                    </div>
                                                    <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                      <p className="sub-heading">
                                                        {t("Vehicle Type")}
                                                      </p>
                                                      <p className="title">
                                                        {ele?.vehicle_type_code}
                                                      </p>
                                                    </div>
                                                    {ele.feature_id == 13 &&
                                                      ele.is_active &&
                                                      (userRole == "customer" ||
                                                        accessRights?.rights_manage_hardware_feature_set ==
                                                          1) && (
                                                        <>
                                                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                            <p className="sub-heading">
                                                             {t("Vehicle Status")} 
                                                            </p>
                                                            <div
                                                              className="form-check form-switch"
                                                              id="custom_switch"
                                                            >
                                                              <div className="d-flex innerFlexTog">
                                                                <input
                                                                  className="form-check-input"
                                                                  type="checkbox"
                                                                  // id={ele.is_active}
                                                                  checked={
                                                                    ele?.feature_set_value ===
                                                                    "activated"
                                                                      ? true
                                                                      : false
                                                                  }
                                                                  onChange={() => {
                                                                    setImbKeyData(
                                                                      "feature"
                                                                    );
                                                                    setImbStatusData(
                                                                      {
                                                                        vehicle_id:
                                                                          ele?.vehicle_id,
                                                                        feature_set_value:
                                                                          ele?.feature_set_value,
                                                                        vehicle_imei:
                                                                          ele?.vehicle_imei,
                                                                      }
                                                                    );
                                                                    handleShow2();
                                                                  }}
                                                                />
                                                              </div>
                                                            </div>
                                                            {/* <p className="title">{ele?.vehicle_imei}</p> */}
                                                          </div>

                                                          {/* <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                  <p className="sub-heading">
                                                    Vehicle Capacity
                                                  </p>
                                                  <p className="title">{ele?.vehicle_seat_capacity}</p>
                                                </div> */}
                                                        </>
                                                      )}
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          })
                                        ) : (
                                          <NoDataComp />
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {/* <p className="reg-color mt-3">Showing 1 - 10 of 200</p> */}
                              {featureCardData.length > 0 && (
                                <Pagenation
                                  length={featureCardData?.length}
                                  total={total_countFeature}
                                  comp={"Merchant"}
                                />
                              )}
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Tab.Container>
                    </div>
                  </div>
                </Tab.Pane>
              )}
            </Tab.Content>
          </Tab.Container>

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
              <button className="cx-btn-2" onClick={vehicletDelete}>
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={show1}
            onHide={handleClose1}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Change Feature Status")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
    {t('Do you want to {{action}} this Feature ?', {
    action: featureActionData.is_active ? t('Enable') : t('Disable')
  })}
</Modal.Body>
            <Modal.Footer className="pop-up-modal-footer btn-wrapper">
              <button className="cx-btn-1" onClick={handleClose1}>
                {t("Close")}
              </button>
              <button
                className="cx-btn-2"
                onClick={() => {
                  featureActionApi(featureActionData);
                }}
              >
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
              
                imbStatusData?.feature_set_value === "activated"
                  ? "Do you want to deactivate immobilization? Once deactivated, the vehicle will start during the next ignition. Are you sure you want to proceed?"
                  : "Do you want to activate immobilization? Once activated, the vehicle will not start during the next ignition. Do you wish to continue?"
              )}
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer btn-wrapper">
              <button
                className="cx-btn-1"
                onClick={() => {
                  handleClose2();
                  ActivationCancle();
                }}
              >
                {t("Cancel")}
              </button>
              <button
                className="cx-btn-2"
                onClick={() => {
                  vehicletImobilization(imbKeyData);
                }}
              >
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </motion.div>
  );
};

export default Vehicle;

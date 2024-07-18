import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Import from "../../assets/images/ic-Import.svg";
import Feature_CarLock from "../../assets/images/Feature_CarLock.svg";
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
import Tracking_Active from "../../assets/images/Tracking-ON.svg";
import Tracking from "../../assets/images/Tracking-Off.svg";
import MapOffline_Active from "../../assets/images/Offinemap-ON.svg";
import MapOffline from "../../assets/images/Offinemap-Off.svg";
import Export from "../../assets/images/ic-Export.svg";
import DDlogo from "../../assets/images/DDlogo.png";
import { useState } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import Nav from "react-bootstrap/Nav";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import { simpleGetCall, simplePostCall } from "../../api/ApiServices";
import { Carousel, Col, Dropdown, Modal, Tab, Tabs } from "react-bootstrap";
import Pagenation from "../../sharedComponent/Pagenation";
import NoDataComp from "../../sharedComponent/NoDataComp";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import FileSaver from "file-saver";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import Loader from "../../sharedComponent/Loader";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const FeatureSet = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;

  const { t, i18n } = useTranslation();
  const {
    sidebar,
    useDebounce,
    setVehicleTabListActive,
    recordsPerPage,
    customerData,
    loading,
    setLoading,
  } = useContext(AppContext);
  const [feature_list, setFeature_list] = useState(false);
  const [flagSearch, setflagSearch] = useState(false);
  const [Immobilization, setImmobilization] = useState(true);
  const [commomText, setCommomText] = useState("Temperature Sensors");
  const [toggleLogo, setToggleLogo] = useState(false);
  const [logoActive, setLogoActive] = useState(Feature_CarLock_active);
  const [logoUnActive, setLogoUnActive] = useState(Feature_CarLock);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show1, setShow1] = useState(false);
  const [featureListData, setFeatureListData] = useState([]);
  const [featureSubTab, setFeatureSubTab] = useState(1);
  const [featureCardData, setFeatureCardData] = useState([]);
  const [featureCard_Id, setFeatureCard_Id] = useState(1);
  const [featureCardDataSearch, setFeatureCardDataSearch] = useState({
    vehicle_number: "",
    vehicle_type_description: "",
  });
  const [last_pageFeature, setlast_pageFeature] = useState(false);
  // last_page
  const [pageFeature, setPageFeature] = useState(1);
  const [total_countFeature, setTotal_countFeature] = useState(0);
  const [bottom, setBottom] = useState(false);
  const [loaderCard, setloaderCard] = useState(false);
  const debouncedSearchTermFeature = useDebounce(featureCardDataSearch, 500);
  useEffect(() => {
    if (flagSearch === true) {
      setBottom(false);
      featureAllListDataApi(featureCard_Id, 1);
    } else {
      setflagSearch(true);
    }
  }, [debouncedSearchTermFeature]);
  useEffect(() => {
    if (featureListData?.length > 0) {
      featureAllListDataApi(featureCard_Id, 1);
    }
  }, [featureListData]);

  const featureAllListDataApi = (id, pageFeature, tab) => {
    pageFeature === 1 && setloaderCard(true);
    simplePostCall(
      ApiConfig.FEATURELIST_DATA_ALL,
      JSON.stringify({
        ...featureCardDataSearch,
        feature_id: id,
        page: pageFeature,
        page_limit: recordsPerPage,
      })
    )
      .then((res) => {
        setBottom(false);
        setloaderCard(false);
        if (res.result == true) {
          setTotal_countFeature(res.total);
          setlast_pageFeature(res.last_page);
          let data = res.featureListVehicle ? res.featureListVehicle : [];
          tab === "tab"
            ? setFeatureCardData(data)
            : setFeatureCardData([...featureCardData, ...data]);
        } else {
          setFeatureCardData([]);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      })
      .finally((error) => {
        // setloader(false)
        console.log("api response", error);
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
  useEffect(() => {
    getFeatureListApi();
  }, []);

  const getFeatureListApi = () => {
    setLoading(true);
    simpleGetCall(ApiConfig.VEHICLE_FEATURE_LIST_TO_MYCARD, JSON.stringify({}))
      .then((res) => {
        setLoading(false);
        if (res.result === true) {
          let data = res?.featureList;
          setFeatureListData(data);
          setCommomText(data[0]?.feature);
          setFeatureCard_Id(data[0]?.feature_id);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  // export

  const getExportChat = () => {
    const reuestBodyFEature = JSON.stringify({
      vehicle_number: "",
      vehicle_type_description: "",
      feature_id: featureSubTab,
      format: "",
    });

    simplePostCall(ApiConfig.GET_FEATURE_LIST_EXPORT, reuestBodyFEature)
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

  const downLoadExcelSheet = () => {
    const reuestBodyFEature = JSON.stringify({
      vehicle_number: "",
      vehicle_type_description: "",
      feature_id: featureSubTab,
      format: "excel",
    });

    simplePostCall(ApiConfig.GET_FEATURE_LIST_EXPORT, reuestBodyFEature)
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

  const [imbKeyData, setImbKeyData] = useState("vehicle");
  const [imbStatusData, setImbStatusData] = useState({});
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const ActivationCancle = () => {
    notifySuccess(
      `vehciele ${
        imbStatusData?.feature_set_value === "activated"
          ? "deactivated"
          : "activated"
      } is cancel`
    );
  };

  const vehicletImobilization = () => {
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
          featureAllListDataApi(featureCard_Id, 1, "tab");
          // if(key==="vehicle"){
          //   if (vehicleTabList === "vehicle" || vehicleTabList === "group") {
          //     vehicleAllList(tabURL, page, "key");
          //   }
          //   if (view === true) {
          //     apiCallForSubgroup(groupdeletlist, "key");
          //   }
          //   if (vCars === true) {
          //     apiCallForSubCategory(groupdeletlist, "key");
          //   }
          // }
          // if(key==="feature"){
          //   featureAllListDataApi(featureCard_Id, 1, "tab");
          // }
        } else {
          notifyError(res.message);
        }
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <div id="cx-wrapper" className="Feature_set">
            <div className="haeder">
              <div
                className={
                  featureListData?.length > 0
                    ? "Feature_select"
                    : "Feature_select invisible "
                }
              >
                <label
                  htmlFor=""
                  onClick={() => {
                    setFeature_list(!feature_list);
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    placeholder="Select Hardware Feature Set"
                    value={commomText}
                  />
                  <img
                    src={DDlogo}
                    alt=""
                    id={feature_list === true ? "UP" : "Down"}
                  />
                </label>
                {feature_list === true ? (
                  <div id="Feature_menu">
                    {/* <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                /> */}
                    <div className="list">
                      {featureListData &&
                        featureListData?.map((ele, index) => {
                          return (
                            <div
                              className="single_list"
                              onClick={() => {
                                setflagSearch(false);
                                setPageFeature(1);
                                setFeatureCardData([]);
                                // setFeatureCardDataSearch({
                                //     vehicle_number: "",
                                //     vehicle_type_description: ""
                                //   })
                                setFeatureCard_Id(ele.feature_id);
                                setFeatureSubTab(ele.feature_id);

                                featureAllListDataApi(ele.feature_id, 1, "tab");
                                setBottom(false);
                                setCommomText(ele.feature);
                                setFeature_list(false);
                              }}
                            >
                              <img
                                src={
                                  (ele.feature_id == 1 &&
                                    Feature_temp_active) ||
                                  (ele.feature_id == 2 &&
                                    Feature_Fuel_active) ||
                                  (ele.feature_id == 3 && Feature_I_active) ||
                                  (ele.feature_id == 4 &&
                                    Feature_Seat_active) ||
                                  (ele.feature_id == 5 &&
                                    Feature_Echo_active) ||
                                  (ele.feature_id == 6 &&
                                    Feature_IVMS_active) ||
                                  (ele.feature_id == 7 &&
                                    Feature_Card_active) ||
                                  (ele.feature_id == 8 &&
                                    Feature_Overspeed_active) ||
                                  (ele.feature_id == 9 &&
                                    Feature_Crash_active) ||
                                  (ele.feature_id == 10 &&
                                    Feature_Exicess_active) ||
                                  (ele.feature_id == 11 &&
                                    Feature_Towing_active) ||
                                  (ele.feature_id == 12 &&
                                    Feature_Unplag_active) ||
                                  (ele.feature_id == 14 && Tracking_Active) ||
                                  (ele.feature_id == 13 &&
                                    Feature_CarLock_active) ||
                                  (ele.feature_id == 15 && MapOffline_Active)
                                }
                                alt=""
                              />
                              <p>{ele.feature}</p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {userRole === "customer" ||
              (accessRights && accessRights?.rights_manage_vehicle) ? (
                <Link
                  to="/AddVehicle"
                  className="d-flex justify-content-end"
                  onClick={() => {
                    localStorage.setItem("vehicleTabListActive", "vehicle");
                    setVehicleTabListActive("vehicle");
                  }}
                >
                  <button className="cx-btn-3 tbBtn">
                    + {t("Add Vehicle")}
                  </button>
                </Link>
              ) : null}
            </div>
            <div className="Vehcle-main-tabs">
              <div className="main-master-wrapper mb-0 inner-tabs-section tabs-custom-width-33">
                <div id="scroll_insideThe_Padding53">
                  <div className="all-vehicle-main">
                    <div className="all-vehical-head row vehicle-top-inputs">
                      <div className="input-section-wrapper">
                        <div className="row">
                          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={t("Vehicle Name,No., Reg. No, IMEI...")}
                              onChange={(e) => {
                                setBottom(false);
                                setFeatureCardData([]);
                                setFeatureCardDataSearch({
                                  ...featureCardDataSearch,
                                  vehicle_number: e.target.value,
                                });
                                setPageFeature(1);
                              }}
                              value={featureCardDataSearch.vehicle_number}
                            />
                          </div>
                          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={t("Vehicle Category")}
                              onChange={(e) => {
                                setPageFeature(1);
                                setFeatureCardData([]);
                                setFeatureCardDataSearch({
                                  ...featureCardDataSearch,
                                  vehicle_type_description: e.target.value,
                                });
                              }}
                              value={
                                featureCardDataSearch?.vehicle_type_description
                              }
                            />
                          </div>
                          {/* <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Contact Number"
                                                />
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Start Time & End Time"
                                                />
                                            </div> */}
                        </div>
                      </div>
                      <div className="right-export-btn-section-wrapper">
                        <div className="c-pointer me-2"></div>
                        {/* <div className="c-pointer">
                                            <img src={Import} alt="" />
                                        </div> */}
                        <div className="md_dropdown">
                          <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                              <img src={Import} alt="" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <Link
                                  onClick={() => getExportChat()}
                                  className="d-block"
                                >
                                {t("PDF")}  
                                </Link>
                              </Dropdown.Item>

                              <Dropdown.Item>
                                <Link
                                  onClick={() => downLoadExcelSheet()}
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
                    <div className="yauto" id="TransportMananger_height">
                      <div
                        className="yauto"
                        id="scroll_insideThe_Padding_tabel"
                        onScroll={(e) => {
                          setBottom(e ? true : false);

                          const bottom1 =
                            e.target.scrollHeight - e.target.scrollTop ===
                            e.target.clientHeight;

                          if (bottom && bottom1 && !last_pageFeature) {
                            setPageFeature(pageFeature + 1);
                            featureAllListDataApi(
                              featureCard_Id,
                              pageFeature + 1
                            );
                          }
                        }}
                      >
                        {loaderCard ? (
                          <Loader />
                        ) : (
                          <>
                            {" "}
                            <div className="row main-cards-wrapper gx-3">
                              {featureSubTab == featureSubTab && (
                                <>
                                  {featureCardData &&
                                  featureCardData?.length > 0 ? (
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
                                              key={"Immobilization" + index}
                                            >
                                              <div className="heading">
                                                {ele.feature_id == 13 &&
                                                  (ele?.is_active == true ? (
                                                    <img
                                                      src={
                                                        Feature_CarLock_active
                                                      }
                                                      alt=""
                                                    />
                                                  ) : (
                                                    <img
                                                      src={Feature_CarLock}
                                                      alt=""
                                                    />
                                                  ))}
                                                {ele.feature_id == 1 &&
                                                  (ele?.is_active ? (
                                                    <img
                                                      src={Feature_temp_active}
                                                      alt=""
                                                    />
                                                  ) : (
                                                    <img
                                                      src={Feature_temp}
                                                      alt=""
                                                    />
                                                  ))}
                                                {ele.feature_id == 2 &&
                                                  (ele?.is_active == true ? (
                                                    <img
                                                      src={Feature_Fuel_active}
                                                      alt=""
                                                    />
                                                  ) : (
                                                    <img
                                                      src={Feature_Fuel}
                                                      alt=""
                                                    />
                                                  ))}
                                                {ele.feature_id == 3 &&
                                                  (ele?.is_active == true ? (
                                                    <img
                                                      src={Feature_I_active}
                                                      alt=""
                                                    />
                                                  ) : (
                                                    <img
                                                      src={Feature_I}
                                                      alt=""
                                                    />
                                                  ))}

                                                {ele.feature_id == 4 &&
                                                  (ele?.is_active == true ? (
                                                    <img
                                                      src={Feature_Seat_active}
                                                      alt=""
                                                    />
                                                  ) : (
                                                    <img
                                                      src={Feature_Seat}
                                                      alt=""
                                                    />
                                                  ))}
                                                {ele.feature_id == 5 &&
                                                  (ele?.is_active == true ? (
                                                    <img
                                                      src={Feature_Echo_active}
                                                      alt=""
                                                    />
                                                  ) : (
                                                    <img
                                                      src={Feature_Echo}
                                                      alt=""
                                                    />
                                                  ))}
                                                {ele.feature_id == 6 &&
                                                  (ele?.is_active == true ? (
                                                    <img
                                                      src={Feature_IVMS_active}
                                                      alt=""
                                                    />
                                                  ) : (
                                                    <img
                                                      src={Feature_IVMS}
                                                      alt=""
                                                    />
                                                  ))}
                                                {ele.feature_id == 7 &&
                                                  (ele?.is_active == true ? (
                                                    <img
                                                      src={Feature_Card_active}
                                                      alt=""
                                                    />
                                                  ) : (
                                                    <img
                                                      src={Feature_Card}
                                                      alt=""
                                                    />
                                                  ))}
                                                {ele.feature_id == 8 &&
                                                  (ele?.is_active == true ? (
                                                    <img
                                                      src={
                                                        Feature_Overspeed_active
                                                      }
                                                      alt=""
                                                    />
                                                  ) : (
                                                    <img
                                                      src={Feature_Overspeed}
                                                      alt=""
                                                    />
                                                  ))}
                                                {ele.feature_id == 9 &&
                                                  (ele?.is_active == true ? (
                                                    <img
                                                      src={Feature_Crash_active}
                                                      alt=""
                                                    />
                                                  ) : (
                                                    <img
                                                      src={Feature_Crash}
                                                      alt=""
                                                    />
                                                  ))}
                                                {ele.feature_id == 10 &&
                                                  (ele?.is_active == true ? (
                                                    <img
                                                      src={
                                                        Feature_Exicess_active
                                                      }
                                                      alt=""
                                                    />
                                                  ) : (
                                                    <img
                                                      src={Feature_Exicess}
                                                      alt=""
                                                    />
                                                  ))}
                                                {ele.feature_id == 11 &&
                                                  (ele?.is_active == true ? (
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
                                                  (ele?.is_active == true ? (
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
                                                  (ele?.is_active == true ? (
                                                    <img
                                                      src={Tracking_Active}
                                                      alt=""
                                                    />
                                                  ) : (
                                                    <img
                                                      src={Tracking}
                                                      alt=""
                                                    />
                                                  ))}
                                                {ele.feature_id == 15 &&
                                                  (ele?.is_active == true ? (
                                                    <img
                                                      src={MapOffline_Active}
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
                                                      checked={ele?.is_active}
                                                      disabled={
                                                        ele.feature_id == 14
                                                          ? true
                                                          : ele.feature_id == 8
                                                          ? true
                                                          : false
                                                      }
                                                      onChange={() => {
                                                        setFeatureActionData({
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
                                                        });
                                                        ele?.is_active == true
                                                          ? handleShow1()
                                                          : featureActionApi({
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
                                                            });
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
                                                  
                                                  {t("Vehicle Category.")}

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
                                                        Vehicle Status
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
                                                              setImbStatusData({
                                                                vehicle_id:
                                                                  ele?.vehicle_id,
                                                                feature_set_value:
                                                                  ele?.feature_set_value,
                                                                vehicle_imei:
                                                                  ele?.vehicle_imei,
                                                              });
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
                                              {/* <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                  <p className="sub-heading">
                                                    Transportation Type
                                                  </p>
                                                  <p className="title">{ele?.vehicle_imei}</p>
                                                </div>
                                                <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                  <p className="sub-heading">
                                                    Vehicle Capacity
                                                  </p>
                                                  <p className="title">{ele?.vehicle_seat_capacity}</p>
                                                </div> */}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })
                                  ) : (
                                    // <div className="d-flex justify-content-center text-danger">
                                    //   {t("No Data Found")}
                                    // </div>
                                    <NoDataComp />
                                  )}
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {featureCardData.length > 0 && (
                  <Pagenation
                    length={featureCardData?.length}
                    total={total_countFeature}
                    comp={"FeatureSet"}
                  />
                )}
              </div>
              <Modal
                show={show1}
                onHide={handleClose1}
                centered
                className="common-model"
              >
                <Modal.Header closeButton>
                  <Modal.Title>{t("Change Feature Status")}</Modal.Title>
                </Modal.Header>
               {/*  <Modal.Body>
                  {t(
                    `Do  you want  to ${
                      featureActionData.is_active == true ? "Enable" : "Disable"
                    } this Feature ?`
                  )}
                </Modal.Body> */}
                <Modal.Body>
  {t(
    `Do you want to ${
      featureActionData.is_active == true ? "Enable" : "Disable"
    } this Feature?`
  )}
</Modal.Body>

                <Modal.Footer className="pop-up-modal-footer btn-wrapper">
                  <button className="cx-btn-1" onClick={handleClose1}>
                    {t("Close")}
                  </button>
                  <button
                    className="cx-btn-2"
                    onClick={() => featureActionApi(featureActionData)}
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
                    // `Do  you want  to ${
                    //   featureActionData.is_active == true ? 'Enable' : 'Disable'
                    // } this Feature ?`
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
                      vehicletImobilization();
                    }}
                  >
                    {t("Yes")}
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default FeatureSet;

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
import { Splide, SplideSlide } from "@splidejs/react-splide";
const FeatureSet = () => {
  const { t, i18n } = useTranslation();

  const { sidebar,useDebounce } = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const [feature_list, setFeature_list] = useState(false);

  const [Immobilization, setImmobilization] = useState(true);
  const [commomText, setCommomText] = useState("");
  const [toggleLogo, setToggleLogo] = useState(false);
  const [logoActive, setLogoActive] = useState(Feature_CarLock_active);
  const [logoUnActive, setLogoUnActive] = useState(Feature_CarLock);

    // feature set module 
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [show1, setShow1] = useState(false);
    const [featureListData, setFeatureListData] = useState([])
    const [featureSubTab, setFeatureSubTab] = useState(1)
    const [featureCardData, setFeatureCardData] = useState([])
    const [featureCard_Id, setFeatureCard_Id] = useState(1)
    const [featureCardDataSearch, setFeatureCardDataSearch] = useState({
      vehicle_number: "",
      vehicle_type_description: ""
    })
    const [last_pageFeature, setlast_pageFeature] = useState(false);
    // last_page
    const [pageFeature, setPageFeature] = useState(1);
    const [total_countFeature, setTotal_countFeature] = useState(0);
  
    const debouncedSearchTermFeature = useDebounce(featureCardDataSearch, 500);
    useEffect(() => {
      featureAllListDataApi(featureCard_Id, pageFeature)
    }, [debouncedSearchTermFeature])
  
    const featureAllListDataApi = (id, pageFeature) => {
      simplePostCall(
        ApiConfig.FEATURELIST_DATA_ALL,
        JSON.stringify({
          ...featureCardDataSearch, feature_id: id, page: pageFeature
        })
      )
        .then((res) => {
  
          if (res.result) {
            setTotal_countFeature(res.total);
            setlast_pageFeature(res.last_page);
            let coursesData = res.featureListVehicle ? res.featureListVehicle : [];
            let LearningData = coursesData.map((eachteam, index) => {
              return {
                ...eachteam,
                vehicle_number: eachteam.vehicle_number || "",
                vehicle_seat_capacity: eachteam.vehicle_seat_capacity || "",
  
              };
            });
  
            if (pageFeature === 1) {
              setFeatureCardData(res.featureListVehicle);
            } else {
              setFeatureCardData([...featureCardData, ...LearningData]);
              // setlast_page(false)
            }
          } else {
            setFeatureCardData(0);
          }
  
  
  
  
        })
        .catch((error) => {
          console.log("api response", error);
        });
    };
  
  
    //enable disbale api
    const [featureActionData, setFeatureActionData] = useState({})
    const featureActionApi = (data) => {
      handleClose1()
      simplePostCall(
        ApiConfig.FEATURELIST_DATA_ACTION,
        JSON.stringify(
          data
        )
      )
        .then((res) => {
          if (res.result === true) {
            featureAllListDataApi(featureCard_Id, pageFeature)
            notifySuccess(res.message)
          } else {
  
            notifyError(res.message)
          }
        })
        .catch((error) => {
          console.log("api response", error);
        });
    };
    useEffect(() => {
      getFeatureListApi()
    }, [])
    
    const getFeatureListApi = () => {
      simpleGetCall(
        ApiConfig.VEHICLE_FEATURE_LIST_TO_MYCARD,
        JSON.stringify({
  
        })
      )
        .then((res) => {
          if (res.result === true) {
  
            setFeatureListData(res.featureList)
          }
        })
        .catch((error) => {
          console.log("api response", error);
        })
    }
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
      <div id="cx-wrapper" className="Feature_set">
<Tab.Container id="left-tabs-example" defaultActiveKey="Five">
<Nav variant="pills" id="newTabMai" className="mb-3">
{/* <Nav.Item>
                <Nav.Link eventKey="Five" onClick={() => {
                  // seteventKeyMaincategory("Five")
                  // setVehicleTabList("")
                  // setTabURLExport(ApiConfig.GET_FEATURE_LIST_EXPORT)
                  // getFeatureListApi()
                  // setFeatureCardData([])
                  // featureAllListDataApi(1, pageFeature)
                  // setVCars(false)
                  // setView(false)

                }}>Hardware Feature-Set</Nav.Link>
              </Nav.Item> */}
</Nav>
<Tab.Pane eventKey="Five" >
                <div id="fetureset_main">
                  <div className="inner_tabs_For_FeatureSet"


                  >
                    <Tab.Container
                      id="left-tabs-example"
                      className="Inner_tab_featureSet"
                      defaultActiveKey="1"
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
                       
                              focus: 0,
                         
                              autoWidth: true,
                              next: 'splide__arrow--next your-class-next',
                              gap: '1rem',
                            }}
                            aria-label="My Favorite Images">
                            {featureListData && featureListData.map((ele) => {
                              return (
                                <SplideSlide>
                                  <Nav.Link className="td-link" eventKey={ele.feature_id} onClick={() => {
                                    setFeatureCardDataSearch({
                                      vehicle_number: "",
                                      vehicle_type_description: ""
                                    })
                                    setFeatureCard_Id(ele.feature_id)
                                    setFeatureSubTab(ele.feature_id)

                                    featureAllListDataApi(ele.feature_id, pageFeature)
                                  }}>
                                    {ele.feature}
                                  </Nav.Link>
                                </SplideSlide>
                              )
                            })}


                          </Splide>
                        </Nav.Item>
                      </Nav>
                      <Col sm={12} className="">
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
                                        placeholder="Vehicle Name,No., Reg. No, IMEI..."
                                        onChange={(e) => {
                                          // setTabData([])
                                          setFeatureCardDataSearch({
                                            ...featureCardDataSearch,
                                            vehicle_number: e.target.value
                                          })
                                          // setPage(1)
                                        }}
                                        value={featureCardDataSearch.vehicle_number}
                                      />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Vehicle Category"
                                        onChange={(e) => {
                                          // setTabData([])
                                          setFeatureCardDataSearch({
                                            ...featureCardDataSearch,
                                            vehicle_type_description: e.target.value
                                          })
                                          // setPage(1)
                                        }}
                                        value={featureCardDataSearch.vehicle_type_description}
                                      />
                                    </div>

                                  </div>
                                </div>
                                <div className="right-export-btn-section-wrapper">
                                <div className="md_dropdown">
                                    <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        <img src={Import} alt="" />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link
                                            // onClick={() => getExportChat(tabURLExport, page, "")}
                                            className="d-block"
                                          >
                                            PDF
                                          </Link>
                                        </Dropdown.Item>


                                        <Dropdown.Item>
                                          <Link
                                            // onClick={() => downLoadExcelSheet(tabURLExport)}
                                            className="d-block"
                                          >
                                            Excel
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                  <div className="c-pointer me-2">
                                  
                                  <button className="cx-btn-1 tbBtn">
                                 Add Vehicle
                  
                             </button>
                                  </div>
                                  {/* <div className="c-pointer">
                                    <img src={Import} alt="" onClick={() => getExportChat(tabURLExport, page, "")} />
                                  </div> */}
                                
                             
                                </div>
                              </div>

                              <div className="yauto"

                                id="scroll_insideThe_Padding_tabel"
                                onScroll={(e) => {
                                  const bottom =
                                    e.target.scrollHeight - e.target.scrollTop ===
                                    e.target.clientHeight;

                                  if (bottom && !last_pageFeature) {
                                    setPageFeature(pageFeature + 1);
                                    featureAllListDataApi(featureCard_Id, pageFeature + 1);
                                  }
                                }}
                              >
                                <div className="row main-cards-wrapper gx-3">
                                  {featureSubTab == featureSubTab &&
                                    <>
                                      {(featureCardData && featureCardData.length > 0 ?
                                        featureCardData.map((ele, index) => {
                                          return (<div
                                            className={
                                              sidebar
                                                ? "col-xl-4 col-lg-6 col-md-6"
                                                : "col-xl-3 col-lg-4 col-md-6"
                                            }
                                            id="fetureset_single_card"

                                          >
                                            <div
                                              className={"common-vehical-card-inner"}
                                            >
                                              <div className="vehical-card-head" key={"Immobilization" + index}>
                                                <div className="heading">
                                                  {ele.feature_id == 13 && (ele?.is_active == true ? <img src={Feature_CarLock_active} alt="" /> : <img src={Feature_CarLock} alt="" />)}
                                                  {ele.feature_id == 1 && (ele?.is_active ? <img src={Feature_temp_active} alt="" /> : <img src={Feature_temp} alt="" />)}
                                                  {ele.feature_id == 2 && (ele?.is_active == true ? <img src={Feature_Fuel_active} alt="" /> : <img src={Feature_Fuel} alt="" />)}
                                                  {ele.feature_id == 3 && (ele?.is_active == true ? <img src={Feature_I_active} alt="" /> : <img src={Feature_I} alt="" />)}

                                                  {ele.feature_id == 4 && (ele?.is_active == true ? <img src={Feature_Seat_active} alt="" /> : <img src={Feature_Seat} alt="" />)}
                                                  {ele.feature_id == 5 && (ele?.is_active == true ? <img src={Feature_Echo_active} alt="" /> : <img src={Feature_Echo} alt="" />)}
                                                  {ele.feature_id == 6 && (ele?.is_active == true ? <img src={Feature_IVMS_active} alt="" /> : <img src={Feature_IVMS} alt="" />)}
                                                  {ele.feature_id == 7 && (ele?.is_active == true ? <img src={Feature_Card_active} alt="" /> : <img src={Feature_Card} alt="" />)}
                                                  {ele.feature_id == 8 && (ele?.is_active == true ? <img src={Feature_Overspeed_active} alt="" /> : <img src={Feature_Overspeed} alt="" />)}
                                                  {ele.feature_id == 9 && (ele?.is_active == true ? <img src={Feature_Crash_active} alt="" /> : <img src={Feature_Crash} alt="" />)}
                                                  {ele.feature_id == 10 && (ele?.is_active == true ? <img src={Feature_Exicess_active} alt="" /> : <img src={Feature_Exicess} alt="" />)}
                                                  {ele.feature_id == 11 && (ele?.is_active == true ? <img src={Feature_Towing_active} alt="" /> : <img src={Feature_Towing} alt="" />)}
                                                  {ele.feature_id == 12 && (ele?.is_active == true ? <img src={Feature_Unplag_active} alt="" /> : <img src={Feature_Unplag} alt="" />)}
                                                  {ele.feature_id == 14 && (ele?.is_active == true ? <img src={Tracking_Active} alt="" /> : <img src={Tracking} alt="" />)}
                                                  {ele.feature_id == 15 && (ele?.is_active == true ? <img src={MapOffline_Active} alt="" /> : <img src={MapOffline} alt="" />)}
                                                  <div className="">
                                                    <p className="sub-heading">
                                                      Vehicle Number
                                                    </p>
                                                    <p className="title">{ele?.vehicle_number}</p>
                                                  </div>
                                                </div>
                                                <div className="form-check form-switch" id="custom_switch">
                                                  <div className="d-flex innerFlexTog">
                                                    <input
                                                      className="form-check-input"
                                                      type="checkbox"
                                                      id={ele.is_active}
                                                      checked={ele?.is_active}
                                                      disabled={ele.feature_id == 14 ? true : ele.feature_id == 8 ? true : false}
                                                      onChange={() => {

                                                        setFeatureActionData({
                                                          feature_id: ele.feature_id,
                                                          feature_set_value: ele.feature_set_value,
                                                          vehicle_id: ele.vehicle_id,
                                                          is_active: !ele.is_active,
                                                          vehicle_features_list_id: ele.vehicle_features_list_id
                                                        })
                                                        ele?.is_active == true ? handleShow1() : featureActionApi({
                                                          feature_id: ele.feature_id,
                                                          feature_set_value: ele.feature_set_value,
                                                          vehicle_id: ele.vehicle_id,
                                                          is_active: !ele.is_active,
                                                          vehicle_features_list_id: ele.vehicle_features_list_id
                                                        })
                                                      }


                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="vehical-card-body row">
                                                <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                  <p className="sub-heading">
                                                    Vehicle Number
                                                  </p>
                                                  <p className="title">{ele?.vehicle_number}</p>
                                                </div>
                                                <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                  <p className="sub-heading">
                                                    Driver Name
                                                  </p>
                                                  <p className="title">{ele?.user_name}</p>
                                                </div>
                                                <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                  <p className="sub-heading">
                                                    IMEI No.
                                                  </p>
                                                  <p className="title">{ele?.vehicle_imei}</p>
                                                </div>
                                                <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                                                  <p className="sub-heading">
                                                    Vehicle Type.
                                                  </p>
                                                  <p className="title">{ele?.vehicle_type_description}</p>
                                                </div>
                                                <div className="card-contain col-lg-6 col-md-6 col-sm-6">
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
                                                </div>
                                              </div>
                                            </div>
                                          </div>)
                                        }) : (
                                          <div className="d-flex justify-content-center text-danger">
                                            {t("No Data Found")}
                                          </div>
                                        ))}
                                    </>


                                  }


                                </div>
                              </div>
                            </div>
                           
                            {featureCardData.length > 0 && <Pagenation length={featureCardData?.length} total={total_countFeature} />}
                          </Tab.Pane>


                        </Tab.Content>
                      </Col>
                    </Tab.Container>
                  </div>
                </div>
              </Tab.Pane>
</Tab.Container>




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
              {t(`Do  you want  to ${featureActionData.is_active == true ? "Enable" : "Disable"} this Feature ?`)}
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer btn-wrapper">
              <button className="cx-btn-1" onClick={handleClose1}>
                {t("Close")}
              </button>
              <button className="cx-btn-2"
                onClick={() => featureActionApi(featureActionData)}
              >
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>

        <div className="haeder">

          
          <div className="Feature_select">
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
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
                <div className="list">
                  {featureListData && featureListData.map((ele,index)=>{
                                                                 
                    return(
                      <div
                      className="single_list"
                      onClick={() => {
                        setCommomText(ele.feature);
                        setFeature_list(false);
                      }}
                    >
                      <img src={
(ele.feature_id == 1 && Feature_temp_active)||
(ele.feature_id == 2 &&Feature_Fuel_active )||
(ele.feature_id == 3 &&Feature_I_active) ||
(ele.feature_id == 4 &&Feature_Seat_active) ||
(ele.feature_id == 5 &&Feature_Echo_active) ||
(ele.feature_id == 6 &&Feature_IVMS_active) ||
(ele.feature_id == 7 &&Feature_Card_active) ||
(ele.feature_id == 8 &&Feature_Overspeed_active) ||
(ele.feature_id == 9 && Feature_Crash_active) ||
(ele.feature_id == 10 &&Feature_Exicess_active)||
(ele.feature_id == 11 &&Feature_Towing_active)||
(ele.feature_id == 12 &&Feature_Unplag_active)||
(ele.feature_id == 14 &&Tracking_Active)||
(ele.feature_id == 13 &&Feature_CarLock_active) ||
(ele.feature_id == 15 &&MapOffline_Active)} alt="" />
                      <p>{ele.feature}</p>
                    </div>
                    )
                  })}
                 
                  {/* <div
                    className="single_list"
                    onClick={() => {
                      setCommomText("Fuel sensor");
                      setFeature_list(false);
                      setLogoActive(Feature_Fuel_active);
                      setLogoUnActive(Feature_Fuel);
                    }}
                  >
                    <img src={Feature_Fuel_active} alt="" />
                    <p>Fuel sensor</p>
                  </div>
                  <div
                    className="single_list"
                    onClick={() => {
                      setCommomText("I button");
                      setFeature_list(false);
                      setLogoActive(Feature_I_active);
                      setLogoUnActive(Feature_I);
                    }}
                  >
                    <img src={Feature_I_active} alt="" />
                    <p>I button</p>
                  </div>
                  <div
                    className="single_list"
                    onClick={() => {
                      setCommomText("Echo Driving");
                      setFeature_list(false);
                      setLogoActive(Feature_Echo_active);
                      setLogoUnActive(Feature_Echo);
                    }}
                  >
                    <img src={Feature_Echo_active} alt="" />
                    <p>Echo Driving</p>
                  </div>
                  <div
                    className="single_list"
                    onClick={() => {
                      setCommomText("Seat Belt sensor");
                      setFeature_list(false);
                      setLogoActive(Feature_Seat_active);
                      setLogoUnActive(Feature_Seat);
                    }}
                  >
                    <img src={Feature_Seat_active} alt="" />
                    <p>Seat Belt sensor</p>
                  </div>
                  <div
                    className="single_list"
                    onClick={() => {
                      setCommomText("IVMS");
                      setFeature_list(false);
                      setLogoActive(Feature_IVMS_active);
                      setLogoUnActive(Feature_IVMS);
                    }}
                  >
                    <img src={Feature_IVMS_active} alt="" />
                    <p>IVMS</p>
                  </div>
                  <div
                    className="single_list"
                    onClick={() => {
                      setCommomText("Card reader");
                      setFeature_list(false);
                      setLogoActive(Feature_Card_active);
                      setLogoUnActive(Feature_Card);
                    }}
                  >
                    <img src={Feature_Card_active} alt="" />
                    <p>Card reader</p>
                  </div>
                  <div
                    className="single_list"
                    onClick={() => {
                      setCommomText("Over Speeding");
                      setFeature_list(false);
                      setLogoActive(Feature_Overspeed_active);
                      setLogoUnActive(Feature_Overspeed);
                    }}
                  >
                    <img src={Feature_Overspeed_active} alt="" />
                    <p>Over Speeding</p>
                  </div>
                  <div
                    className="single_list"
                    onClick={() => {
                      setCommomText("Crash Detection");
                      setFeature_list(false);
                      setLogoActive(Feature_Crash_active);
                      setLogoUnActive(Feature_Crash);
                    }}
                  >
                    <img src={Feature_Crash_active} alt="" />
                    <p>Crash Detection</p>
                  </div>
                  <div
                    className="single_list"
                    onClick={() => {
                      setCommomText("Excessive Idling");
                      setFeature_list(false);
                      setLogoActive(Feature_Exicess_active);
                      setLogoUnActive(Feature_Exicess);
                    }}
                  >
                    <img src={Feature_Exicess_active} alt="" />
                    <p>Excessive Idling</p>
                  </div>
                  <div
                    className="single_list"
                    onClick={() => {
                      setCommomText("Towing detection");
                      setFeature_list(false);
                      setLogoActive(Feature_Towing_active);
                      setLogoUnActive(Feature_Towing);
                    }}
                  >
                    <img src={Feature_Towing_active} alt="" />
                    <p>Towing detection</p>
                  </div>
                  <div
                    className="single_list"
                    onClick={() => {
                      setCommomText("Temperature Sensors");
                      setFeature_list(false);
                      setLogoActive(Feature_temp_active);
                      setLogoUnActive(Feature_temp);
                    }}
                  >
                    <img src={Feature_Towing_active} alt="" />
                    <p>Temperature Sensors</p>
                  </div>
                  <div
                    className="single_list"
                    onClick={() => {
                      setCommomText("un plug detection");
                      setFeature_list(false);
                      setLogoActive(Feature_Unplag_active);
                      setLogoUnActive(Feature_Unplag);
                    }}
                  >
                    <img src={Feature_Unplag_active} alt="" />
                    <p>un plug detection</p>
                  </div> */}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <Link to="/AddVehicle" className="d-flex justify-content-end">
            <button className="cx-btn-3 tbBtn">+ {t("Add Vehicle")}</button>
          </Link>
        </div>
        <div className="Vehcle-main-tabs" id="cutomScroll">
          <div className="main-master-wrapper mb-0 inner-tabs-section tabs-custom-width-33">
            <div id="scroll_insideThe_Padding">
              <div className="all-vehicle-main">
                <div className="all-vehical-head row vehicle-top-inputs">
                  <div className="input-section-wrapper">
                    <div className="row">
                      <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Trip Name, Driver Name..."
                        />
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
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
                      </div>
                    </div>
                  </div>
                  <div className="right-export-btn-section-wrapper">
                    <div className="c-pointer me-2"></div>
                    <div className="c-pointer">
                      <img src={Import} alt="" />
                    </div>
                  </div>
                </div>
                <div className="yauto" id="TransportMananger_height">
                  <div className="row gx-3 main-cards-wrapper">
                    <div
                      className={
                        sidebar
                          ? "col-xl-4 col-lg-6 col-md-6"
                          : "col-xl-3 col-lg-4 col-md-6"
                      }
                      id="fetureset_single_card"
                    >
                      <div className={"common-vehical-card-inner"}>
                        <div className="vehical-card-head">
                          <div className="heading">
                            {toggleLogo === true ? (
                              <img src={logoActive} alt="" />
                            ) : (
                              <img src={logoUnActive} alt="" />
                            )}
                            <div className="">
                              <p className="sub-heading">{t("Vehicle Number")}</p>
                              <p className="title">Volvo Transport</p>
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
                                id="Tuesday"
                                onChange={() => setToggleLogo(!toggleLogo)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="vehical-card-body row">
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Number")}</p>
                            <p className="title">MH-12-5022</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Driver Name")}</p>
                            <p className="title">Mr. John Doe</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("IMEI No.")}</p>
                            <p className="title">1234567894561230</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Type")}</p>
                            <p className="title">Pick-Up Truck</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Transportation Type")}</p>
                            <p className="title">Goods</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Contact Driver")}</p>
                            <p className="title">9922405367</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        sidebar
                          ? "col-xl-4 col-lg-6 col-md-6"
                          : "col-xl-3 col-lg-4 col-md-6"
                      }
                      id="fetureset_single_card"
                    >
                      <div className={"common-vehical-card-inner"}>
                        <div className="vehical-card-head">
                          <div className="heading">
                            <img src={logoActive} alt="" />
                            <div className="">
                              <p className="sub-heading">{t("Vehicle Number")}</p>
                              <p className="title">Volvo Transport</p>
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
                                id="Tuesday"
                                onChange={() => setToggleLogo(!toggleLogo)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="vehical-card-body row">
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Number")}</p>
                            <p className="title">MH-12-5022</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Driver Name")}</p>
                            <p className="title">Mr. John Doe</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("IMEI No.")}</p>
                            <p className="title">1234567894561230</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Type")}</p>
                            <p className="title">Pick-Up Truck</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Transportation Type")}</p>
                            <p className="title">Goods</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Contact Driver")}</p>
                            <p className="title">9922405367</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        sidebar
                          ? "col-xl-4 col-lg-6 col-md-6"
                          : "col-xl-3 col-lg-4 col-md-6"
                      }
                      id="fetureset_single_card"
                    >
                      <div className={"common-vehical-card-inner"}>
                        <div className="vehical-card-head">
                          <div className="heading">
                            <img src={logoActive} alt="" />
                            <div className="">
                              <p className="sub-heading">{t("Vehicle Number")}</p>
                              <p className="title">Volvo Transport</p>
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
                                id="Tuesday"
                                onChange={() => setToggleLogo(!toggleLogo)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="vehical-card-body row">
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Number")}</p>
                            <p className="title">MH-12-5022</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Driver Name")}</p>
                            <p className="title">Mr. John Doe</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("IMEI No.")}</p>
                            <p className="title">1234567894561230</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Type")}</p>
                            <p className="title">Pick-Up Truck</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Transportation Type")}</p>
                            <p className="title">Goods</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Contact Driver")}</p>
                            <p className="title">9922405367</p>
                          </div>
                        </div>
                      </div>
                    </div><div
                      className={
                        sidebar
                          ? "col-xl-4 col-lg-6 col-md-6"
                          : "col-xl-3 col-lg-4 col-md-6"
                      }
                      id="fetureset_single_card"
                    >
                      <div className={"common-vehical-card-inner"}>
                        <div className="vehical-card-head">
                          <div className="heading">
                            <img src={logoActive} alt="" />
                            <div className="">
                              <p className="sub-heading">{t("Vehicle Number")}</p>
                              <p className="title">Volvo Transport</p>
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
                                id="Tuesday"
                                onChange={() => setToggleLogo(!toggleLogo)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="vehical-card-body row">
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Number")}</p>
                            <p className="title">MH-12-5022</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Driver Name")}</p>
                            <p className="title">Mr. John Doe</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("IMEI No.")}</p>
                            <p className="title">1234567894561230</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Type")}</p>
                            <p className="title">Pick-Up Truck</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Transportation Type")}</p>
                            <p className="title">Goods</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Contact Driver")}</p>
                            <p className="title">9922405367</p>
                          </div>
                        </div>
                      </div>
                    </div><div
                      className={
                        sidebar
                          ? "col-xl-4 col-lg-6 col-md-6"
                          : "col-xl-3 col-lg-4 col-md-6"
                      }
                      id="fetureset_single_card"
                    >
                      <div className={"common-vehical-card-inner"}>
                        <div className="vehical-card-head">
                          <div className="heading">
                            <img src={logoActive} alt="" />
                            <div className="">
                              <p className="sub-heading">{t("Vehicle Number")}</p>
                              <p className="title">Volvo Transport</p>
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
                                id="Tuesday"
                                onChange={() => setToggleLogo(!toggleLogo)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="vehical-card-body row">
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Number")}</p>
                            <p className="title">MH-12-5022</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Driver Name")}</p>
                            <p className="title">Mr. John Doe</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("IMEI No.")}</p>
                            <p className="title">1234567894561230</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Type")}</p>
                            <p className="title">Pick-Up Truck</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Transportation Type")}</p>
                            <p className="title">Goods</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Contact Driver")}</p>
                            <p className="title">9922405367</p>
                          </div>
                        </div>
                      </div>
                    </div><div
                      className={
                        sidebar
                          ? "col-xl-4 col-lg-6 col-md-6"
                          : "col-xl-3 col-lg-4 col-md-6"
                      }
                      id="fetureset_single_card"
                    >
                      <div className={"common-vehical-card-inner"}>
                        <div className="vehical-card-head">
                          <div className="heading">
                            <img src={logoActive} alt="" />
                            <div className="">
                              <p className="sub-heading">{t("Vehicle Number")}</p>
                              <p className="title">Volvo Transport</p>
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
                                id="Tuesday"
                                onChange={() => setToggleLogo(!toggleLogo)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="vehical-card-body row">
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Number")}</p>
                            <p className="title">MH-12-5022</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Driver Name")}</p>
                            <p className="title">Mr. John Doe</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("IMEI No.")}</p>
                            <p className="title">1234567894561230</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Type")}</p>
                            <p className="title">Pick-Up Truck</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Transportation Type")}</p>
                            <p className="title">Goods</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Contact Driver")}</p>
                            <p className="title">9922405367</p>
                          </div>
                        </div>
                      </div>
                    </div><div
                      className={
                        sidebar
                          ? "col-xl-4 col-lg-6 col-md-6"
                          : "col-xl-3 col-lg-4 col-md-6"
                      }
                      id="fetureset_single_card"
                    >
                      <div className={"common-vehical-card-inner"}>
                        <div className="vehical-card-head">
                          <div className="heading">
                            <img src={logoActive} alt="" />
                            <div className="">
                              <p className="sub-heading">{t("Vehicle Number")}</p>
                              <p className="title">Volvo Transport</p>
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
                                id="Tuesday"
                                onChange={() => setToggleLogo(!toggleLogo)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="vehical-card-body row">
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Number")}</p>
                            <p className="title">MH-12-5022</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Driver Name")}</p>
                            <p className="title">Mr. John Doe</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("IMEI No.")}</p>
                            <p className="title">1234567894561230</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Type")}</p>
                            <p className="title">Pick-Up Truck</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Transportation Type")}</p>
                            <p className="title">Goods</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Contact Driver")}</p>
                            <p className="title">9922405367</p>
                          </div>
                        </div>
                      </div>
                    </div><div
                      className={
                        sidebar
                          ? "col-xl-4 col-lg-6 col-md-6"
                          : "col-xl-3 col-lg-4 col-md-6"
                      }
                      id="fetureset_single_card"
                    >
                      <div className={"common-vehical-card-inner"}>
                        <div className="vehical-card-head">
                          <div className="heading">
                            <img src={logoActive} alt="" />
                            <div className="">
                              <p className="sub-heading">{t("Vehicle Number")}</p>
                              <p className="title">Volvo Transport</p>
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
                                id="Tuesday"
                                onChange={() => setToggleLogo(!toggleLogo)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="vehical-card-body row">
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Number")}</p>
                            <p className="title">MH-12-5022</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Driver Name")}</p>
                            <p className="title">Mr. John Doe</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("IMEI No.")}</p>
                            <p className="title">1234567894561230</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Type")}</p>
                            <p className="title">Pick-Up Truck</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Transportation Type")}</p>
                            <p className="title">Goods</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Contact Driver")}</p>
                            <p className="title">9922405367</p>
                          </div>
                        </div>
                      </div>
                    </div><div
                      className={
                        sidebar
                          ? "col-xl-4 col-lg-6 col-md-6"
                          : "col-xl-3 col-lg-4 col-md-6"
                      }
                      id="fetureset_single_card"
                    >
                      <div className={"common-vehical-card-inner"}>
                        <div className="vehical-card-head">
                          <div className="heading">
                            <img src={logoActive} alt="" />
                            <div className="">
                              <p className="sub-heading">{t("Vehicle Number")}</p>
                              <p className="title">Volvo Transport</p>
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
                                id="Tuesday"
                                onChange={() => setToggleLogo(!toggleLogo)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="vehical-card-body row">
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Number")}</p>
                            <p className="title">MH-12-5022</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Driver Name")}</p>
                            <p className="title">Mr. John Doe</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("IMEI No.")}</p>
                            <p className="title">1234567894561230</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Type")}</p>
                            <p className="title">Pick-Up Truck</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Transportation Type")}</p>
                            <p className="title">Goods</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Contact Driver")}</p>
                            <p className="title">9922405367</p>
                          </div>
                        </div>
                      </div>
                    </div><div
                      className={
                        sidebar
                          ? "col-xl-4 col-lg-6 col-md-6"
                          : "col-xl-3 col-lg-4 col-md-6"
                      }
                      id="fetureset_single_card"
                    >
                      <div className={"common-vehical-card-inner"}>
                        <div className="vehical-card-head">
                          <div className="heading">
                            <img src={logoActive} alt="" />
                            <div className="">
                              <p className="sub-heading">{t("Vehicle Number")}</p>
                              <p className="title">Volvo Transport</p>
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
                                id="Tuesday"
                                onChange={() => setToggleLogo(!toggleLogo)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="vehical-card-body row">
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Number")}</p>
                            <p className="title">MH-12-5022</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Driver Name")}</p>
                            <p className="title">Mr. John Doe</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("IMEI No.")}</p>
                            <p className="title">1234567894561230</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Type")}</p>
                            <p className="title">Pick-Up Truck</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Transportation Type")}</p>
                            <p className="title">Goods</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Contact Driver")}</p>
                            <p className="title">9922405367</p>
                          </div>
                        </div>
                      </div>
                    </div><div
                      className={
                        sidebar
                          ? "col-xl-4 col-lg-6 col-md-6"
                          : "col-xl-3 col-lg-4 col-md-6"
                      }
                      id="fetureset_single_card"
                    >
                      <div className={"common-vehical-card-inner"}>
                        <div className="vehical-card-head">
                          <div className="heading">
                            <img src={logoActive} alt="" />
                            <div className="">
                              <p className="sub-heading">{t("Vehicle Number")}</p>
                              <p className="title">Volvo Transport</p>
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
                                id="Tuesday"
                                onChange={() => setToggleLogo(!toggleLogo)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="vehical-card-body row">
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Number")}</p>
                            <p className="title">MH-12-5022</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Driver Name")}</p>
                            <p className="title">Mr. John Doe</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("IMEI No.")}</p>
                            <p className="title">1234567894561230</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Type")}</p>
                            <p className="title">Pick-Up Truck</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Transportation Type")}</p>
                            <p className="title">Goods</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Contact Driver")}</p>
                            <p className="title">9922405367</p>
                          </div>
                        </div>
                      </div>
                    </div><div
                      className={
                        sidebar
                          ? "col-xl-4 col-lg-6 col-md-6"
                          : "col-xl-3 col-lg-4 col-md-6"
                      }
                      id="fetureset_single_card"
                    >
                      <div className={"common-vehical-card-inner"}>
                        <div className="vehical-card-head">
                          <div className="heading">
                            <img src={logoActive} alt="" />
                            <div className="">
                              <p className="sub-heading">{t("Vehicle Number")}</p>
                              <p className="title">Volvo Transport</p>
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
                                id="Tuesday"
                                onChange={() => setToggleLogo(!toggleLogo)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="vehical-card-body row">
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Number")}</p>
                            <p className="title">MH-12-5022</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Driver Name")}</p>
                            <p className="title">Mr. John Doe</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("IMEI No.")}</p>
                            <p className="title">1234567894561230</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Vehicle Type")}</p>
                            <p className="title">Pick-Up Truck</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Transportation Type")}</p>
                            <p className="title">Goods</p>
                          </div>
                          <div className="card-contain col-lg-6 col-md-6 col-sm-6">
                            <p className="sub-heading">{t("Contact Driver")}</p>
                            <p className="title">9922405367</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="reg-color mt-3">{t("Showing")} 1 - 10 of 200</p>
          </div>
        </div> 
      </div>
    </motion.div>
  );
};

export default FeatureSet;

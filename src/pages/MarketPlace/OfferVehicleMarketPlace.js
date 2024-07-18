// Usama 09-02-2023
import React, { useContext, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Col, Dropdown, Modal, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Export from "../../assets/images/ic-Export.svg";
import Import from "../../assets/images/ic-Import.svg";
import { motion } from "framer-motion";
import Nav from "react-bootstrap/Nav";
import Cat_ye_car from "../../assets/images/Catagiry_yellow_car.svg";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PostCallWithErrorResponse, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import Loader from "../../sharedComponent/Loader";
import Pagenation from "../../sharedComponent/Pagenation";
import NoDataComp from "../../sharedComponent/NoDataComp";

const OfferVehicleMarketPlace = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [view, setView] = useState(false);
  const [vCars, setVCars] = useState(false);
  const [vBike, setVBike] = useState(false);
  const [state, setState] = useState(false);
  const [loader, setLoader] = useState(false);
  const [vehicleList, setVehicleList] = useState('');

  const [searchKey, setSearchKey] = useState('');
  const [vehicleCategory, setvehicleCategory] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');

  const [vehicleOfferList, setVehicleOfferList] = useState([]);
  const [vehicleAssignedList, setVehicleAssignedList] = useState([]);
  const [VehicleAvailableList, setVehicleAvailableList] = useState([]);
  const [vehicleBlockList, setVehicleBlockList] = useState([]);
  const [vehicleAllList, setVehicleAllList] = useState({
    list: [],
    next_page: false,
    total: 0    
  });


  const [vehicleListType, setVehicleListType] = useState(1);
  const [selectedObj, setSelectedObj] = useState([]);
  const [last_page, setlast_page] = useState(false);
  const [total_count, setTotal_count] = useState(null);
  const [allVehiCoun, setallVehiCount] = useState(0);
  const [page, setPage] = useState(1);
  const [bottom, setBottom] = useState("");
  const [tabURL, setTabURL] = useState(ApiConfig.GET_VEHICLE_LIST);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  // Function to handle checkbox toggle
  const handleCheckboxChange = (index, data) => {
    // setSelectedObj([...selectedObj, data]);
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [index]: !prevCheckedItems[index],
    }));
    if (selectedObj.includes(data)) {
      setSelectedObj((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== data)
      );
    } else {
      // If it's not checked, add it to the array
      setSelectedObj((prevSelectedItems) => [...prevSelectedItems, data]);
    }
  };

  // removeFromSelected 
  const removeFromSelected = (data) => {
    // selectedObj.filter((item, index))
  }
  const showView = () => {
    setView(true);
  };

  const hideView = () => {
    setView(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  //category
  const [category, setCategory] = useState(false);
  const DeleteCategory = () => setShow(false);
  const showCategory = () => setShow(true);
  //group
  const [group, setGroup] = useState(false);
  const DeleteGroup = () => setShow(false);
  const showGroup = () => setShow(true);

  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  let api_key = localStorage?.getItem("api_key") || "";
  // let api_key = '2ed20897c7e2db4144b10b200cb9a326';
  let user_customer_id = Number(localStorage?.getItem("customer_id")) || "";
  let user_id = localStorage?.getItem("id") || "";

 
  const getAllVehicleList = (api_key, user_customer_id, page, searchKey, vehicleCapacity, vehicleCategory) => {
    setLoader(true);
    let payload = {
      customer_id: user_customer_id,
      api_key: api_key,
      transporter_id: 6576,
      search_key: searchKey,
      limit: 12,
      page: page,
      vehicle_capacity: vehicleCapacity,
      vehicle_category: vehicleCategory
    };

    simplePostCall(ApiConfig.MARKET_PLACE_ALL_VEHICLE_LIST, JSON.stringify(payload))
      .then((res) => {
        setLoader(true);
        if (res.result) {
          setVehicleAllList({list: [...vehicleAllList.list, ...res?.list], next_page: res.next_page, total: res.total});
          setLoader(false);
        }
        setLoader(false);
      })
      .catch((error) => {
        console.error('Error fetching vehicle list:', error);
        setLoader(false);
      });
  };

  const getOfferedVehicleList = (api_key, user_customer_id, page, searchKey, vehicleCapacity, vehicleCategory) => {
    
    setLoader(true);
    let payload = {
      customer_id: user_customer_id,
      api_key: api_key,
      transporter_id: 6576,
      search_key: searchKey,
      limit: 12,
      page: page,
      vehicle_capacity: vehicleCapacity,
      vehicle_category: vehicleCategory
    };

    simplePostCall(ApiConfig.MARKET_PLACE_VEHICLE_OFFERED_LIST, JSON.stringify(payload))
      .then((res) => {
        if (res.result) { 
          setVehicleOfferList(res);
          setLoader(false);
        }
        setLoader(false);
      }).catch((error) => {
        console.log(error)
      })
  };

  const getAssignedVehicleList = (api_key, user_customer_id, page, searchKey, vehicleCapacity, vehicleCategory) => {
    setLoader(true);
    let payload = {
      customer_id: user_customer_id,
      api_key: api_key,
      transporter_id: 6576,
      search_key: searchKey,
      limit: 12,
      page: page,
      vehicle_capacity: vehicleCapacity,
      vehicle_category: vehicleCategory
    };

    simplePostCall(ApiConfig.MARKET_PLACE_VEHICLE_ASSIGN_LIST, JSON.stringify(payload))
      .then((res) => {
        if (res.result) {
          setVehicleAssignedList(res)
          setLoader(false);
        }
        setLoader(false);
      }).catch((error) => {
        console.log(error)
      })
  };
  
  const getAvailableVehicleList = (api_key, user_customer_id, page, searchKey, vehicleCapacity, vehicleCategory) => {
    setLoader(true);
    let payload = {
      customer_id: user_customer_id,
      api_key: api_key,
      transporter_id: 6576,
      search_key: searchKey,
      limit: 12,
      page: page,
      vehicle_capacity: vehicleCapacity,
      vehicle_category: vehicleCategory
    };

    simplePostCall(ApiConfig.MARKET_PLACE_AVAILABLE_LIST, JSON.stringify(payload))
      .then((res) => {
        if (res.result) {
          setVehicleAvailableList(res)
          setLoader(false);
        }
        setLoader(false);
      }).catch((error) => {
        console.log(error)
      })
  };
  
  const getBlockVehicleList = (api_key, user_customer_id, page, searchKey, vehicleCapacity, vehicleCategory) => {
    setLoader(true);
    let payload = {
      customer_id: user_customer_id,
      api_key: api_key,
      transporter_id: 6576,
      search_key: searchKey,
      limit: 12,
      page: page,
      vehicle_capacity: vehicleCapacity,
      vehicle_category: vehicleCategory
    };

    simplePostCall(ApiConfig.MARKET_PLACE_BLOCK_LIST, JSON.stringify(payload))
      .then((res) => {
        if (res.result) {
          setVehicleBlockList(res)
          setLoader(false);
        }
        setLoader(false);
      }).catch((error) => {
        console.log(error)
      })
  };

  const enableOfferVehicle = (api_key, user_customer_id, Vehicle_id) =>{

    setLoader(true);
    let payload = {
      customer_id: user_customer_id,
      api_key: api_key,
      vehicle_id: Vehicle_id,
      transporter_id: 6576,
    };

    simplePostCall(ApiConfig.MARKET_PLACE_ENABLE_VEHICLE_OFFER, JSON.stringify(payload))
      .then((res) => {
        if (res.result) {
          setLoader(false);
          getAllVehicleList(api_key, user_customer_id, page, searchKey,vehicleCapacity, vehicleCategory)
          getOfferedVehicleList(api_key, user_customer_id, page, searchKey,vehicleCapacity, vehicleCategory)
        }
        setLoader(false);
      }).catch((error) => {
        setLoader(false);
        console.log(error)
      })
  }
 
  const disableOfferVehicle = (api_key, user_customer_id, Vehicle_id) =>{

    setLoader(true);
    let payload = {
      customer_id: user_customer_id,
      api_key: api_key,
      vehicle_id: Vehicle_id,
      transporter_id: 6576,
    };

    simplePostCall(ApiConfig.MARKET_PLACE_DISABLE_VEHICLE_OFFER, JSON.stringify(payload))
      .then((res) => {
        if (res.result) {
          setLoader(false);
          getAllVehicleList(api_key, user_customer_id, page, searchKey,vehicleCapacity, vehicleCategory)
          getOfferedVehicleList(api_key, user_customer_id, page, searchKey,vehicleCapacity, vehicleCategory)
        }
        setLoader(false);
      }).catch((error) => {
        setLoader(false);
        console.log(error)
      })
  }

  useEffect(() => {
    AOS.init({ duration: 2000 });


    // planning to fetch all list then show it 
    getAllVehicleList(api_key, user_customer_id, page, searchKey,vehicleCapacity, vehicleCategory);
    getOfferedVehicleList(api_key,user_customer_id, page, searchKey,vehicleCapacity, vehicleCategory);
    getAssignedVehicleList(api_key, user_customer_id, page, searchKey,vehicleCapacity, vehicleCategory);
    getAvailableVehicleList(api_key, user_customer_id, page, searchKey,vehicleCapacity, vehicleCategory);
    getBlockVehicleList(api_key, user_customer_id, page, searchKey,vehicleCapacity, vehicleCategory);
  }, []);

  // fetch the vihecleList according to the header
  useEffect(() => {
    switch (vehicleListType) {
      case 1:
        // fetch all vehicle
        getAllVehicleList(api_key, user_customer_id, page, searchKey, vehicleCapacity, vehicleCategory);
        break;
      case 2:
        // fetch offered vehicle
        getOfferedVehicleList(api_key, user_customer_id, page, searchKey, vehicleCapacity, vehicleCategory);
        break;
      case 3:
        // fetch assigned vehicle
        getAssignedVehicleList(api_key, user_customer_id, page, searchKey, vehicleCapacity, vehicleCategory);
        break;
      case 4:
        // fetch available vehicle
        getAvailableVehicleList(api_key, user_customer_id, page, searchKey, vehicleCapacity, vehicleCategory);
        break;
      case 5:
        // fetch block vehicle
        getBlockVehicleList(api_key, user_customer_id, page, searchKey, vehicleCapacity, vehicleCategory);
        break;

      default:
        break;
    }
  }, [vehicleListType, searchKey, vehicleCapacity, vehicleCategory])


  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

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
        <div
          className="Vehcle-main-tabs cx-marketPlace-main"
          id="cx-marketPlace"
        >
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Nav variant="pills" id="newTabMai" className="tob_nav_pills">
              <Nav.Item>
                <Nav.Link
                  eventKey="first"
                  onClick={() => {
                    setVehicleListType(1)
                    setPage(1)
                  }}
                >
                  {t(`All Vehicles (${vehicleAllList.total ? vehicleAllList.total : 0 })`)}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="second"
                  onClick={() => {
                    setVehicleListType(2)
                    setPage(1)
                  }}
                >
                  {t(`Offered (${vehicleOfferList.total ? vehicleOfferList.total : 0})`)}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    setVehicleListType(3)
                    setPage(1)
                  }}
                  eventKey="three"
                >
                  {t(`Assigned Vehicles (${vehicleAssignedList.total? vehicleAssignedList.total : 0})`)}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="four"
                  onClick={() => {
                    setVehicleListType(4)
                    setPage(1)
                  }}
                >
                  {t(`Available (${VehicleAvailableList?.total ? VehicleAvailableList?.total : 0})`)}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="Five"
                  onClick={() => {
                    setVehicleListType(5)
                    setPage(1)
                  }}
                >
                  {t(`Blocked (${vehicleBlockList?.total ? vehicleBlockList?.total : 0})`)}
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div className="main-master-wrapper mb-0 inner-tabs-section overflow-hidden">
                  <div id="scroll_insideThe_Padding">
                    <div className="all-vehicle-main">
                      <div className="all-vehical-head row vehicle-top-inputs">
                        <div className="input-section-wrapper">
                          <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Name,No., Reg. No, IMEI..."
                                onChange={(e)=>{
                                  setSearchKey(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Category"
                                onChange={(e)=>{
                                  setvehicleCategory(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Capacity"
                                onChange={(e)=>{
                                  setVehicleCapacity(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                              <select
                                required
                                className="form-select"
                                aria-label="Default select example"
                                placeholder="Transportation Type"
                              >
                                <option value="">Transportation Type</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="right-export-btn-section-wrapper">
                          <div className="c-pointer me-2">
                            <img src={Export} alt="" />
                          </div>
                          <div className="c-pointer">
                            <img src={Import} alt="" />
                          </div>
                        </div>
                      </div>
                      {
                        loader ? <Loader /> :
                        vehicleAllList && vehicleAllList.list?.length > 0 ?
                          <div className="yauto" id="arrange-paading"
                            onScroll={(e) => {
                              setBottom(e ? true : false)
                              const bottom =
                                e.target.scrollHeight - e.target.scrollTop ===
                                e.target.clientHeight

                              if(vehicleAllList.next_page != false){
                                if (bottom && !last_page) {
                                  setPage(vehicleAllList.next_page);
                                  getAllVehicleList(api_key, user_customer_id,vehicleAllList.next_page)
                                }
                              }
                            }}>
                            <div className="row main-cards-wrapper gx-3">
                              {
                                vehicleAllList?.list?.map((itemvehicle, index) => {
                                  console.log(" items vehicle ", itemvehicle)
                                  return (
                                    <div
                                      className={
                                        sidebar
                                          ? "col-lg-6 col-md-6"
                                          : "col-lg-4 col-md-6"
                                      }
                                      key={index}
                                    >
                                      <div className={"common-cat-vehical-card-inner"}>
                                        <div className="cat-body w-100">
                                          <div
                                            className="head-with-img"
                                            id="head-with-img-switch"
                                          >
                                            <div id="head-with-img">
                                              <div className="left img">
                                                <img src={Cat_ye_car} alt="" />
                                              </div>
                                              <div className="right v-name cat-body-discription">
                                                <label htmlFor="">
                                                  {t("Vehicle Number")}
                                                </label>
                                                <p>{itemvehicle.plate_number ? itemvehicle.plate_number : "No Data"}</p>
                                              </div>
                                            </div>

                                            <div
                                              className="form-check form-switch"
                                              id="custom_switch"
                                            >
                                              {/* <label htmlFor={`checkbox-${index}`}>Hello</label> */}
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`checkbox-${index}`}
                                                checked={itemvehicle.offer_status === 1} // Simplified boolean expression
                                                onChange={(e) => {
                                                  const isChecked = e.target.checked; // Check if the checkbox is checked or unchecked

                                                  if (isChecked) {
                                                    enableOfferVehicle(api_key, user_customer_id, itemvehicle.vehicle_id);
                                                  } else {
                                                    disableOfferVehicle(api_key, user_customer_id, itemvehicle.vehicle_id);
                                                  }

                                                  handleCheckboxChange(index, itemvehicle);
                                                }}
                                              />

                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-lg-6 cat-body-discription mt-2">
                                              <label htmlFor="">
                                                {t("Vehicle Number")}
                                              </label>
                                              <p>{itemvehicle.plate_number ? itemvehicle.plate_number : "No Data"}</p>
                                            </div>
                                            <div className="col-lg-6 cat-body-discription mt-2">
                                              <label htmlFor="">{t("Driver Name")}</label>
                                              <p>{itemvehicle?.user_name ? itemvehicle?.user_name : ''}</p>
                                            </div>
                                            <div className="col-lg-6 cat-body-discription mt-2">
                                              <label htmlFor="">{t("IMEI No.")}</label>
                                              <p>{itemvehicle?.vehicle_imei ? itemvehicle?.vehicle_imei : "No Data"}</p>
                                            </div>
                                            <div className="col-lg-6 cat-body-discription mt-2">
                                              <label htmlFor="">
                                                {t("Vehicle Type")}
                                              </label>
                                              <p>{itemvehicle.vehicle_type ? itemvehicle.vehicle_type : "No Data"}</p>
                                            </div>
                                            <div className="col-lg-6 cat-body-discription mt-2">
                                              <label htmlFor="">
                                                {t("Vehicle Capacity")}
                                              </label>
                                              <p>{itemvehicle.capacity ? itemvehicle.capacity : "No Data"}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })
                              }

                            </div>
                          </div>
                          : <div colSpan={20} className='text-center'><NoDataComp /></div>
                      }
                    </div>
                  </div>
                  {/* <p className="reg-color mt-3"> */}
                  <Pagenation length={vehicleAllList?.list?.length} total={vehicleAllList?.total} />
                  {/* </p> */}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <div className="main-master-wrapper mb-0 inner-tabs-section overflow-hidden">
                  <div id="scroll_insideThe_Padding">
                    <div className="all-vehicle-main">
                      <div className="all-vehical-head row vehicle-top-inputs">
                        <div className="input-section-wrapper">
                          <div className="row">
                          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Name,No., Reg. No, IMEI..."
                                onChange={(e)=>{
                                  setSearchKey(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Category"
                                onChange={(e)=>{
                                  setvehicleCategory(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Capacity"
                                onChange={(e)=>{
                                  setVehicleCapacity(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                              <select
                                required
                                className="form-select"
                                aria-label="Default select example"
                                placeholder="Transportation Type"
                              >
                                <option value="">Transportation Type</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="right-export-btn-section-wrapper">
                          <div className="c-pointer me-2">
                            <img src={Export} alt="" />
                          </div>
                          <div className="c-pointer">
                            <img src={Import} alt="" />
                          </div>
                        </div>
                      </div>

                      <div className="yauto" id="arrange-paading"
                        onScroll={(e) => {
                          setBottom(e ? true : false)
                          const bottom =
                            e.target.scrollHeight - e.target.scrollTop ===
                            e.target.clientHeight

                            if (vehicleOfferList?.next_page) {
                              if (bottom && !last_page) {
                                setPage(page + 1);
                                getOfferedVehicleList(api_key, user_customer_id, vehicleOfferList.next_page, searchKey, vehicleCapacity, vehicleCategory);
                              }
                            }

                        }}>
                        {
                          loader ? <Loader /> :

                          vehicleOfferList && vehicleOfferList.list?.length > 0 ?
                            <>
                              <div className="row main-cards-wrapper gx-3">
                                {
                                  vehicleOfferList?.list.map((data, index) => {
                                    return (
                                      <div
                                        className={
                                          sidebar
                                            ? "col-lg-6 col-md-6"
                                            : "col-lg-4 col-md-6"
                                        }
                                      >
                                        <div className={"common-cat-vehical-card-inner"}>
                                          <div className="cat-body w-100">
                                            <div className="head-with-img">
                                              <div className="left img">
                                                <img src={Cat_ye_car} alt="" />
                                              </div>
                                              <div className="right v-name cat-body-discription">
                                                <label htmlFor="">
                                                  {t("Vehicle Number")}
                                                </label>
                                                <p>{data.plate_number == null || undefined ? "No Data" : data.plate_number}</p>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">
                                                  {t("Vehicle Number")}
                                                </label>
                                                <p>{data.plate_number == null || undefined ? "No Data" : data.plate_number}</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">{t("Driver Name")}</label>
                                                <p>Mr. John Doe</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">{t("IMEI No.")}</label>
                                                <p>{data.vehicle_imei == null || undefined ? "No Data" : data.vehicle_imei}</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">
                                                  {t("Vehicle Type")}
                                                </label>
                                                <p>{data.vehicle_type == null || undefined ? "No Data" : data.vehicle_type}</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">
                                                  {t("Vehicle Capacity")}
                                                </label>
                                                <p>{data.capacity == null || undefined ? "No Data" : data.capacity}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </>
                            : <div colSpan={20} className='text-center'><NoDataComp /></div>
                        }
                      </div>
                    </div>
                  </div>
                  {
                    vehicleOfferList && vehicleOfferList.list?.length > 0 ?
                      <Pagenation length={vehicleOfferList.list.length} total={vehicleOfferList.total} /> :
                      null
                  }
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="three">
                <div className="main-master-wrapper mb-0 inner-tabs-section overflow-hidden">
                  <div id="scroll_insideThe_Padding">
                    <div className="all-vehicle-main">
                      <div className="all-vehical-head row vehicle-top-inputs">
                        <div className="input-section-wrapper">
                          <div className="row">
                          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Name,No., Reg. No, IMEI..."
                                onChange={(e)=>{
                                  setSearchKey(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Category"
                                onChange={(e)=>{
                                  setvehicleCategory(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Capacity"
                                onChange={(e)=>{
                                  setVehicleCapacity(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                              <select
                                required
                                className="form-select"
                                aria-label="Default select example"
                                placeholder="Transportation Type"
                              >
                                <option value="">Transportation Type</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="right-export-btn-section-wrapper">
                          <div className="c-pointer me-2">
                            <img src={Export} alt="" />
                          </div>
                          <div className="c-pointer">
                            <img src={Import} alt="" />
                          </div>
                        </div>
                      </div>

                      <div className="yauto" id="arrange-paading"
                        onScroll={(e) => {
                          setBottom(e ? true : false)
                          const bottom =
                            e.target.scrollHeight - e.target.scrollTop ===
                            e.target.clientHeight


                            if (vehicleAssignedList?.next_page) {
                              if (bottom && !last_page) {
                                setPage(page + 1);
                                getOfferedVehicleList(api_key, user_customer_id, vehicleAssignedList.next_page, searchKey, vehicleCapacity, vehicleCategory);
                              }
                            }

                        }}>
                        {
                          loader ? <Loader /> :

                          vehicleAssignedList && vehicleAssignedList.length > 0 ?
                            <>
                              <div className="row main-cards-wrapper gx-3">
                                {
                                  vehicleAssignedList.map((data, index) => {
                                    return (
                                      <div
                                        className={
                                          sidebar
                                            ? "col-lg-6 col-md-6"
                                            : "col-lg-4 col-md-6"
                                        }
                                      >
                                        <div className={"common-cat-vehical-card-inner"}>
                                          <div className="cat-body w-100">
                                            <div className="head-with-img">
                                              <div className="left img">
                                                <img src={Cat_ye_car} alt="" />
                                              </div>
                                              <div className="right v-name cat-body-discription">
                                                <label htmlFor="">
                                                  {t("Vehicle Number")}
                                                </label>
                                                <p>{data.plate_number == null || undefined ? "No Data" : data.plate_number}</p>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">
                                                  {t("Vehicle Number")}
                                                </label>
                                                <p>{data.plate_number == null || undefined ? "No Data" : data.plate_number}</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">{t("Driver Name")}</label>
                                                <p>Mr. John Doe</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">{t("IMEI No.")}</label>
                                                <p>{data.vehicle_imei == null || undefined ? "No Data" : data.vehicle_imei}</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">
                                                  {t("Vehicle Type")}
                                                </label>
                                                <p>{data.vehicle_type == null || undefined ? "No Data" : data.vehicle_type}</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">
                                                  {t("Vehicle Capacity")}
                                                </label>
                                                <p>{data.capacity == null || undefined ? "No Data" : data.capacity}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </>
                            : <div colSpan={20} className='text-center'><NoDataComp /></div>
                        }
                      </div>
                    </div>
                  </div>
                  {
                    vehicleAssignedList && vehicleAssignedList.list?.length > 0 ?
                      <Pagenation length={vehicleAssignedList.list?.length} total={vehicleAssignedList.total} /> :
                      null
                  }
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="four">
                <div className="main-master-wrapper mb-0 inner-tabs-section overflow-hidden">
                  <div id="scroll_insideThe_Padding">
                    <div className="all-vehicle-main">
                      <div className="all-vehical-head row vehicle-top-inputs">
                        <div className="input-section-wrapper">
                          <div className="row">
                          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Name,No., Reg. No, IMEI..."
                                onChange={(e)=>{
                                  setSearchKey(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Category"
                                onChange={(e)=>{
                                  setvehicleCategory(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Capacity"
                                onChange={(e)=>{
                                  setVehicleCapacity(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                              <select
                                required
                                className="form-select"
                                aria-label="Default select example"
                                placeholder="Transportation Type"
                              >
                                <option value="">Transportation Type</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="right-export-btn-section-wrapper">
                          <div className="c-pointer me-2">
                            <img src={Export} alt="" />
                          </div>
                          <div className="c-pointer">
                            <img src={Import} alt="" />
                          </div>
                        </div>
                      </div>

                      <div className="yauto" id="arrange-paading"
                        onScroll={(e) => {
                          setBottom(e ? true : false)
                          const bottom =
                            e.target.scrollHeight - e.target.scrollTop ===
                            e.target.clientHeight

                            if (vehicleAssignedList?.next_page) {
                              if (bottom && !last_page) {
                                setPage(page + 1);
                                getAvailableVehicleList(api_key, user_customer_id, vehicleAssignedList?.next_page, searchKey,vehicleCapacity, vehicleCategory)
                              }
                            }

                        }}>
                        {
                          loader ? <Loader /> :

                          VehicleAvailableList && VehicleAvailableList?.list?.length > 0 ?
                            <>
                              <div className="row main-cards-wrapper gx-3">
                                {
                                  VehicleAvailableList?.list?.map((data, index) => {
                                    return (
                                      <div
                                        className={
                                          sidebar
                                            ? "col-lg-6 col-md-6"
                                            : "col-lg-4 col-md-6"
                                        }
                                      >
                                        <div className={"common-cat-vehical-card-inner"}>
                                          <div className="cat-body w-100">
                                            <div className="head-with-img">
                                              <div className="left img">
                                                <img src={Cat_ye_car} alt="" />
                                              </div>
                                              <div className="right v-name cat-body-discription">
                                                <label htmlFor="">
                                                  {t("Vehicle Number")}
                                                </label>
                                                <p>{data.plate_number == null || undefined ? "No Data" : data.plate_number}</p>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">
                                                  {t("Vehicle Number")}
                                                </label>
                                                <p>{data.plate_number == null || undefined ? "No Data" : data.plate_number}</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">{t("Driver Name")}</label>
                                                <p>Mr. John Doe</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">{t("IMEI No.")}</label>
                                                <p>{data.vehicle_imei == null || undefined ? "No Data" : data.vehicle_imei}</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">
                                                  {t("Vehicle Type")}
                                                </label>
                                                <p>{data.vehicle_type == null || undefined ? "No Data" : data.vehicle_type}</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">
                                                  {t("Vehicle Capacity")}
                                                </label>
                                                <p>{data.capacity == null || undefined ? "No Data" : data.capacity}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </>
                            : <div colSpan={20} className='text-center'><NoDataComp /></div>
                        }
                      </div>
                    </div>
                  </div>
                  {
                    VehicleAvailableList && VehicleAvailableList.list?.length > 0 ?
                      <Pagenation length={VehicleAvailableList.list.length} total={VehicleAvailableList.total} /> :
                      null
                  }
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="Five">
                <div className="main-master-wrapper mb-0 inner-tabs-section overflow-hidden">
                  <div id="scroll_insideThe_Padding">
                    <div className="all-vehicle-main">
                      <div className="all-vehical-head row vehicle-top-inputs">
                        <div className="input-section-wrapper">
                          <div className="row">
                          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Name,No., Reg. No, IMEI..."
                                onChange={(e)=>{
                                  setSearchKey(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Category"
                                onChange={(e)=>{
                                  setvehicleCategory(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Capacity"
                                onChange={(e)=>{
                                  setVehicleCapacity(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                              <select
                                required
                                className="form-select"
                                aria-label="Default select example"
                                placeholder="Transportation Type"
                              >
                                <option value="">Transportation Type</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="right-export-btn-section-wrapper">
                          <div className="c-pointer me-2">
                            <img src={Export} alt="" />
                          </div>
                          <div className="c-pointer">
                            <img src={Import} alt="" />
                          </div>
                        </div>
                      </div>

                      <div className="yauto" id="arrange-paading"
                        onScroll={(e) => {
                          setBottom(e ? true : false)
                          const bottom =
                            e.target.scrollHeight - e.target.scrollTop ===
                            e.target.clientHeight


                            if (vehicleAssignedList?.next_page) {
                              if (bottom && !last_page) {
                                setPage(page + 1);
                                getBlockVehicleList(api_key, user_customer_id, vehicleAssignedList?.next_page, searchKey,vehicleCapacity, vehicleCategory)
                              }
                            }

                        }}>
                        {
                          loader ? <Loader /> :

                          vehicleBlockList && vehicleBlockList.length > 0 ?
                            <>
                              <div className="row main-cards-wrapper gx-3">
                                {
                                  vehicleBlockList.map((data, index) => {
                                    return (
                                      <div
                                        className={
                                          sidebar
                                            ? "col-lg-6 col-md-6"
                                            : "col-lg-4 col-md-6"
                                        }
                                      >
                                        <div className={"common-cat-vehical-card-inner"}>
                                          <div className="cat-body w-100">
                                            <div className="head-with-img">
                                              <div className="left img">
                                                <img src={Cat_ye_car} alt="" />
                                              </div>
                                              <div className="right v-name cat-body-discription">
                                                <label htmlFor="">
                                                  {t("Vehicle Number")}
                                                </label>
                                                <p>{data.plate_number == null || undefined ? "No Data" : data.plate_number}</p>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">
                                                  {t("Vehicle Number")}
                                                </label>
                                                <p>{data.plate_number == null || undefined ? "No Data" : data.plate_number}</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">{t("Driver Name")}</label>
                                                <p>Mr. John Doe</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">{t("IMEI No.")}</label>
                                                <p>{data.vehicle_imei == null || undefined ? "No Data" : data.vehicle_imei}</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">
                                                  {t("Vehicle Type")}
                                                </label>
                                                <p>{data.vehicle_type == null || undefined ? "No Data" : data.vehicle_type}</p>
                                              </div>
                                              <div className="col-lg-6 cat-body-discription mt-2">
                                                <label htmlFor="">
                                                  {t("Vehicle Capacity")}
                                                </label>
                                                <p>{data.capacity == null || undefined ? "No Data" : data.capacity}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </>
                            : <div colSpan={20} className='text-center'><NoDataComp /></div>
                        }
                      </div>
                    </div>
                  </div>
                  {
                    VehicleAvailableList && VehicleAvailableList.length > 0 ?
                      <Pagenation length={VehicleAvailableList.length} total={VehicleAvailableList.total} /> :
                      null
                  }
                </div>
              </Tab.Pane>
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
              <button className="cx-btn-2" onClick={handleClose}>
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </motion.div>
  );
};

export default OfferVehicleMarketPlace;

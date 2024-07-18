// Usama 09-02-2023
import React, { useContext, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Col, Dropdown, Modal, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import Grouplogo from "../../assets/images/Customer-profile.png";
import "@splidejs/react-splide/css";
import Export from "../../assets/images/ic-Export.svg";
import Import from "../../assets/images/ic-Import.svg";
import { motion } from "framer-motion";
import Nav from "react-bootstrap/Nav";
import Cat_ye_car from "../../assets/images/Catagiry_yellow_car.svg";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import Loader from "../../sharedComponent/Loader";
import NoDataComp from "../../sharedComponent/NoDataComp";
import Pagenation from "../../sharedComponent/Pagenation";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import ImportUser from "../../assets/images/imagesuser.png";




const OfferDriverMarketPlace = () => {

  const customer_id = localStorage.getItem("customer_id")
  const api_key = localStorage.getItem("api_key");
  // const api_key = "22f67b706908c5e7249879b8c59d1dfd"


  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [view, setView] = useState(false);
  const [vCars, setVCars] = useState(false);
  const [vBike, setVBike] = useState(false);
  const [state, setState] = useState(false);

  // here we store direct response so we can mange the paginatoin effeciently 
  const [allDriverList, setAllDriverList] = useState({ result: false, list: [], next_page: 0, message: "" });
  const [driverOfferedList, setDriverOfferedList] = useState({ result: false, list: [], next_page: 0, message: "" });
  const [driverAssignedList, setDriverAssignedList] = useState({ result: false, list: [], next_page: 0, message: "" });
  const [driverBlockList, setDriverBlockList] = useState({ result: false, list: [], next_page: 0, message: "" });
  const [driverAvailableList, setDriverAvailableList] = useState({ result: false, list: [], next_page: 0, message: "" });

  const [filter, setFilter] = useState({ search: "", email: "" })
  const [allDriverFilter, setAllDriverFilter] = useState({ search: "", email: "" })
  const [offerDriverFilter, setOfferDriverFilter] = useState({ search: "", email: "" })
  const [assignDriverFilter, setAssignDriverFilter] = useState({ search: "", email: "" })
  const [availbleDriverFilter, setAvailableDriverFilter] = useState({ search: "", email: "" })
  const [blockDriverFiler, setBlockDriverFiler] = useState({ search: "", email: "" })

  // this will indicate the where screen is and which filter and pagination change
  const [indicator, setIndicator] = useState('');

  const [mainLoader, setMainLoader] = useState(true);
  const [childLoader, setChildLoader] = useState({
    first: false,
    second: false,
    three: false,
    four: false,
    five: false
  })

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

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };



  useEffect(() => {
    // fetchAllDriverList();
    // fetchDiriverOffedList();
    // fetchDriverAssignList();
    // only for initail load 
    fetchAllData()
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {

    const getData = setTimeout(() => {
      setMainLoader(true);
      switch (indicator) {
        case "first":
          // we should do empty the state first
          setAllDriverList(prev => ({ ...prev, result: false, list: [], next_page: 0, message: "" }));
          fetchAllDriverList();
          break;
        case "second":
          setDriverOfferedList(prev => ({ ...prev, result: false, list: [], next_page: 0, message: "" }));
          fetchDiriverOffedList();
          break;
        case "three":
          setDriverAssignedList(prev => ({ ...prev, result: false, list: [], next_page: 0, message: "" }));
          fetchDriverAssignList();
          break;
        case 'four':
          setDriverAvailableList(prev => ({ ...prev, result: false, list: [], next_page: 0, message: "" }));
          fetchDriverAvailableList();
          break;
        case 'five':
          setDriverBlockList(prev => ({ ...prev, result: false, list: [], next_page: 0, message: "" }));
          fetchDriverBlockList();
          break;
      }
    }, 500)
    return () => clearTimeout(getData)
  }, [allDriverFilter, offerDriverFilter, assignDriverFilter, availbleDriverFilter, blockDriverFiler])

  const fetchAllData = () => {
    setMainLoader(true);
    const formData = {
      customer_id: Number(customer_id),
      api_key: api_key,
      transporter_id: 6576,
      search_key: "",
      emailSearch: "",
      limit: 10
    };

    Promise.all([
      simplePostCall(ApiConfig.MARKET_PLACE_DRIVER_ALL_LIST, JSON.stringify(formData)),
      simplePostCall(ApiConfig.MARKET_PLACE_DRIVER_OFFERED_LIST, JSON.stringify(formData)),
      simplePostCall(ApiConfig.MARKET_PLACE_DRIVER_ASSIGNED_LIST, JSON.stringify(formData)),
      simplePostCall(ApiConfig.MARKET_PLACE_DRIVER_AVAILABLE_LIST, JSON.stringify(formData)),
      simplePostCall(ApiConfig.MARKET_PLACE_DRIVER_BLOCK_LIST, JSON.stringify(formData))
    ])
      .then(([
        allDrivers,
        offeredDrivers,
        assignedDrivers,
        availableDrivers,
        blockDrivers
      ]) => {
        setAllDriverList(allDrivers);
        setDriverOfferedList(offeredDrivers);
        setDriverAssignedList(assignedDrivers);
        setDriverAvailableList(availableDrivers);
        setDriverBlockList(blockDrivers);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setMainLoader(false);
      });
  }

  const fetchAllDriverList = (page = 1) => {
    setChildLoader(prev => ({ ...prev, first: true }))
    const formData = { page, customer_id: customer_id, api_key: api_key, transporter_id: 6576, search_key: allDriverFilter?.search, limit: 10, emailSearch: allDriverFilter?.email, };
    simplePostCall(ApiConfig.MARKET_PLACE_DRIVER_ALL_LIST, JSON.stringify(formData))
      .then(res => {
        console.log(res);
        if (res.result) {
          setAllDriverList(prev => {
            return (
              {
                ...prev,
                result: true,
                list: [...prev.list, ...res.list],
                next_page: res.next_page,
              }
            )
          })
        }
        else {
          setAllDriverList(prev => {
            return (
              {
                ...prev,
                result: false,
                list: [],
                next_page: false,
              }
            )
          })
        }
      })
      .catch(err => {
        console.log(err);
      }).finally(() => {
        setChildLoader(prev => ({ ...prev, first: false }))
        setMainLoader(false);
      })
  }

  const fetchDiriverOffedList = (page = 1) => {
    setChildLoader(prev => ({ ...prev, second: true }))
    const formData = { customer_id: customer_id, page, api_key: api_key, transporter_id: 6576, search_key: offerDriverFilter?.search, limit: 10, emailSearch: offerDriverFilter?.email, };
    simplePostCall(ApiConfig.MARKET_PLACE_DRIVER_OFFERED_LIST, JSON.stringify(formData))
      .then(res => {
        console.log(res);
        if (res.result) {
          setDriverOfferedList(prev => {
            return (
              {
                ...prev,
                result: true,
                list: [...prev.list, ...res.list],
                next_page: res.next_page,
              }
            )
          })
        }
        else {
          setDriverOfferedList(prev => {
            return (
              {
                ...prev,
                list: [],
                next_page: false,
                result: false,
              }
            )
          })
        }
      })
      .catch(err => {
        console.log(err);
      }).finally(() => {
        setChildLoader(prev => ({ ...prev, second: false }))
        setMainLoader(false);
      })
  }

  const fetchDriverAssignList = (page = 1) => {
    setChildLoader(prev => ({ ...prev, three: true }))
    const formData = { customer_id: customer_id, page, api_key: api_key, transporter_id: 6576, search_key: assignDriverFilter?.search, limit: 10, emailSearch: assignDriverFilter?.email, };
    simplePostCall(ApiConfig.MARKET_PLACE_DRIVER_ASSIGNED_LIST, JSON.stringify(formData))
      .then(res => {
        console.log(res);
        if (res.result) {
          setDriverAssignedList(prev => {
            return (
              {
                ...prev,
                result: true,
                list: [...prev.list, ...res.list],
                next_page: res.next_page,
              }
            )
          })
        }
        else {
          setDriverAssignedList(prev => {
            return (
              {
                ...prev,
                result: false,
                list: [],
                next_page: false,
              }
            )
          })
        }
      })
      .catch(err => {
        console.log(err);
      }).finally(() => {
        setChildLoader(prev => ({ ...prev, three: false }))
        setMainLoader(false);
      })
  }


  const fetchDriverAvailableList = (page = 1) => {
    setChildLoader(prev => ({ ...prev, four: true }))
    const formData = { customer_id: customer_id, page, api_key: api_key, transporter_id: 6576, search_key: availbleDriverFilter?.search, limit: 10, emailSearch: availbleDriverFilter?.email, };
    simplePostCall(ApiConfig.MARKET_PLACE_DRIVER_AVAILABLE_LIST, JSON.stringify(formData))
      .then(res => {
        console.log(res);
        if (res.result) {
          setDriverAvailableList(prev => {
            return (
              {
                ...prev,
                result: true,
                list: [...prev.list, ...res.list],
                next_page: res.next_page,
              }
            )
          })
        }
        else {
          setDriverAvailableList(prev => {
            return (
              {
                ...prev,
                result: false,
                list: [],
                next_page: false,
              }
            )
          })
        }
      })
      .catch(err => {
        console.log(err);
      }).finally(() => {
        setChildLoader(prev => ({ ...prev, four: false }))
        setMainLoader(false);
      })
  }
  const fetchDriverBlockList = (page = 1) => {
    setChildLoader(prev => ({ ...prev, five: true }))
    const formData = { customer_id: customer_id, page, api_key: api_key, transporter_id: 6576, search_key: blockDriverFiler?.search, limit: 10, emailSearch: blockDriverFiler?.email, };
    simplePostCall(ApiConfig.MARKET_PLACE_DRIVER_BLOCK_LIST, JSON.stringify(formData))
      .then(res => {
        console.log(res);
        if (res.result) {
          setDriverBlockList(prev => {
            return (
              {
                ...prev,
                result: true,
                list: [...prev.list, ...res.list],
                next_page: res.next_page,
              }
            )
          })
        }
        else {
          setDriverBlockList(prev => {
            return (
              {
                ...prev,
                result: false,
                list: [],
                next_page: false,
              }
            )
          })
        }
      })
      .catch(err => {
        console.log(err);
      }).finally(() => {
        setChildLoader(prev => ({ ...prev, five: false }))
        setMainLoader(false);
      })
  }

  const handleToogle = (e, user_id) => {
    const isChecked = e.target.checked;
    setMainLoader(true);
    if (isChecked) {
      const formData = { customer_id: customer_id, api_key: api_key, transporter_id: 9237, driver_id: user_id };
      // do some thing 
      simplePostCall(ApiConfig.MARKET_PLACE_DRIVER_OFFER_ENABLE, JSON.stringify(formData))
        .then(res => {
          // console.log(res);
          if (res.result) {
            notifySuccess(res.message);
            fetchAllData()


            // fetch driver offer
          } else {
            notifyError(res.message)
          }
        }).catch(err => {
          console.log(err);
        })
    }
    else {
      // do something 
      const formData = { "customer_id": customer_id, "api_key": api_key, "transporter_id": 9237, "driver_id": user_id };
      simplePostCall(ApiConfig.MARKET_PLACE_DRIVER_OFFER_DISABLE, JSON.stringify(formData))
        .then(res => {
          // console.log(res);

          if (res.result) {
            fetchAllData();
          } else {
            notifyError(res.message)
          }
        }).catch(err => {
          console.log(err);
        })
    }

  }


  const handleTransportationFilterChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilter(prev => ({ ...prev, [name]: value }))
  }

  const [Immobilization, setImmobilization] = useState(true);
  const [Immobilization1, setImmobilization1] = useState(true);
  const [Tempr, setTempr] = useState(true);
  const [Fuel, setFuel] = useState(true);
  const [ibtn, setIbtn] = useState(true);
  const [seat, setSeat] = useState(true);
  const [echo, setEcho] = useState(true);
  const [ivms, setIVMS] = useState(true);
  const [card, setCard] = useState(true);
  const [speed, setSpeed] = useState(true);
  const [cresh, setCresh] = useState(true);
  const [exicess, setExicess] = useState(true);
  const [towing, setTowing] = useState(true);
  const [plug, setPlug] = useState(true);

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
                <Nav.Link eventKey="first" onClick={() => setIndicator("first")}>{t(`All Drivers (${allDriverList?.total ? allDriverList.total : 0})`)}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" onClick={() => setIndicator("second")}>{t(`Offered (${driverOfferedList?.total ? driverOfferedList.total : 0})`)}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="three" onClick={() => setIndicator("three")}>
                  {t(`Assigned Vehicles (${driverBlockList?.total ? driverBlockList.total : 0})`)}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="four" onClick={() => setIndicator("four")}>  {t(`Available (${driverAvailableList?.total ? driverAvailableList.total : 0})`)}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Five" onClick={() => setIndicator("five")}>{t(`Blocked (${driverAvailableList?.total ? driverAvailableList.total : 0})`)}</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div className="main-master-wrapper mb-0 inner-tabs-section overflow-hidden">
                  <div id="scroll_insideThe_Padding">
                    <div className="all-vehicle-main">
                      <div className="all-vehical-head row vehicle-top-inputs">
                        <div onClick={
                          // here we set the indicator to first, we dont want to call the all driver api twice thats why we set now 
                          // and i user try to chage the filter fo the all drive this function click and the indicator set first and all is working
                          //if we set initially indicator to first then will call api twise which is wrong 
                          () => { setIndicator("first") }
                        } className="input-section-wrapper">
                          <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Driver Name,No., Reg. No, IMEI..."
                                name="search"
                                value={allDriverFilter.search}
                                onChange={(e) => setAllDriverFilter(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email Category"
                                name="email"
                                value={allDriverFilter.email}
                                onChange={(e) => setAllDriverFilter(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                              />
                            </div>
                            {/* <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Vehicle Capacity"
                                name="vehicleCapacity"
                                value={filter.vehicleCapacity}
                                onChange={handleTransportationFilterChange}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                              <select
                                required
                                className="form-select"
                                aria-label="Default select example"
                                placeholder="Transportation Type"
                                name="transportationType"
                                value={filter.transportationType}
                                onChange={handleTransportationFilterChange}
                              >
                                <option value="">Transportation Type</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div> */}
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

                      <div className="yauto"
                        onScroll={(e) => {
                          // setBottom(e ? true : false)

                          const scrollHeight = e.target.scrollHeight;
                          const scrollTop = e.target.scrollTop;
                          const clientHeight = e.target.clientHeight;

                          const atBottom = Math.floor(scrollHeight - scrollTop) === clientHeight;
                          // console.log("atBottom: ", atBottom);

                          if (!childLoader?.first && allDriverList.next_page != false) {
                            if (atBottom) {
                              fetchAllDriverList(allDriverList.next_page)
                            }
                          }
                          // console.log("i got the scroll")
                        }}
                        id="arrange-paading">
                        {mainLoader ? <Loader /> :
                          <div className="row main-cards-wrapper gx-3">
                            {allDriverList && allDriverList?.result && allDriverList?.list.map((data, index) => {
                              return (<div
                                key={index}
                                className={
                                  sidebar
                                    ? "col-lg-6 col-md-6"
                                    : "col-lg-4 col-md-6"
                                }
                              >
                                <div className={"common-cat-vehical-card-inner"}>
                                  <div className="cat-body w-100">
                                    <div
                                      className="head-with-img"
                                      id="head-with-img-switch"
                                    >
                                      <div id="head-with-img">
                                        <div className="left img" id="dr-m-img">
                                          <img src={data?.user_profile_pic ? data?.user_profile_pic : ""} onError={(e) => e.target.src = ImportUser} alt="" />
                                        </div>
                                        <div className="right v-name cat-body-discription">
                                          <label htmlFor="">
                                            {t("Driver Name")}
                                          </label>
                                          <p>{data?.user_name ? data?.user_name : ""}</p>
                                        </div>
                                      </div>

                                      <div
                                        className="form-check form-switch"
                                        id="custom_switch"
                                      >
                                        <input
                                          className="form-check-input"
                                          checked={data?.offer_status}
                                          onChange={(e) => handleToogle(e, data?.user_id)}
                                          type="checkbox"
                                          id="Tuesday"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-lg-6 cat-body-discription mt-2">
                                        <label htmlFor="">{t("Email")}</label>
                                        <p>{data?.user_email ? data?.user_email : ""}</p>
                                      </div>
                                      <div className="col-lg-6 cat-body-discription mt-2">
                                        <label htmlFor="">{t("Contact No.")}</label>
                                        <p>{data?.user_mobile ? data?.user_mobile : ""}</p>
                                      </div>
                                      <div className="col-lg-6 cat-body-discription mt-2">
                                        <label htmlFor="">{t("Vehicle No.")}</label>
                                        <p>{data?.plate_no ? data?.plate_no : ""}</p>
                                      </div>
                                      <div className="col-lg-6 cat-body-discription mt-2">
                                        <label htmlFor="">
                                          {t("Vehicle Assignment.")}
                                        </label>
                                        <p>{data?.vehicle_type ? data.vehicle_type : ""}</p>
                                      </div>
                                      <div className="col-lg-12 cat-body-discription mt-2">
                                        <label htmlFor="">{t("Address")}</label>
                                        <p>
                                          {data?.user_address ? data?.user_address : ""}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>)
                            })}

                            {/* if data is not availabe then show not data screen */}
                            {(!allDriverList ? <div colSpan={20} className='text-center'><NoDataComp /></div> : !allDriverList?.result) && <div colSpan={20} className='text-center'><NoDataComp /></div>}
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  <Pagenation
                    length={allDriverList ? allDriverList?.list ? allDriverList?.list?.length : 0 : 0}
                    total={allDriverList ? allDriverList?.total ? allDriverList?.total : 0 : 0} />
                  {/* <p className="reg-color mt-3">
                    {t("Showing")} 1 - 10 {t("of")} 200
                  </p> */}
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
                                placeholder="Driver Name,No., Reg. No, IMEI..."
                                name="search"
                                value={offerDriverFilter.search}
                                onChange={e => setOfferDriverFilter(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={offerDriverFilter.email}
                                onChange={e => setOfferDriverFilter(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                              />
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

                      <div className="yauto"
                        onScroll={(e) => {
                          // setBottom(e ? true : false)

                          const scrollHeight = e.target.scrollHeight;
                          const scrollTop = e.target.scrollTop;
                          const clientHeight = e.target.clientHeight;

                          const atBottom = Math.floor(scrollHeight - scrollTop) === clientHeight;
                          // console.log("atBottom: ", atBottom);

                          if (!childLoader?.second && driverOfferedList.next_page != false) {
                            if (atBottom) {
                              // setPage(vehicleAllList.next_page);
                              // fetchDiriverOffedList(driverOfferedList.next_page)
                            }
                          }
                          // console.log("i got the scroll")
                        }}
                        id="arrange-paading">
                        {mainLoader ? <Loader /> :
                          <div className="row main-cards-wrapper gx-3">
                            {driverOfferedList && driverOfferedList?.result && driverOfferedList?.list?.map((data, index) => {
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
                                          <img src={data?.user_profile_pic ? data?.user_profile_pic : ""} onError={(e) => e.target.src = ImportUser} alt="" />
                                        </div>
                                        <div className="right v-name cat-body-discription">
                                          <label htmlFor="">
                                            {t("Driver Name")}
                                          </label>
                                          <p>{data?.user_name ? data?.user_name : ""}</p>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-lg-6 cat-body-discription mt-2">
                                          <label htmlFor="">{t("Email")}</label>
                                          <p>{data?.user_email ? data?.user_email : ""}</p>
                                        </div>
                                        <div className="col-lg-6 cat-body-discription mt-2">
                                          <label htmlFor="">{t("Contact No.")}</label>
                                          <p>{data?.user_mobile ? data?.user_mobile : ""}</p>
                                        </div>
                                        <div className="col-lg-6 cat-body-discription mt-2">
                                          <label htmlFor="">{t("Vehicle No.")}</label>
                                          <p>{data?.plate_no ? data?.plate_no : ""}</p>
                                        </div>
                                        <div className="col-lg-6 cat-body-discription mt-2">
                                          <label htmlFor="">
                                            {t("Vehicle Assignment.")}
                                          </label>
                                          <p>{data?.vehicle_type ? data?.vehicle_type : ""}</p>
                                        </div>
                                        <div className="col-lg-12 cat-body-discription mt-2">
                                          <label htmlFor="">{t("Address")}</label>
                                          <p>
                                            {data?.user_address ? data?.user_address : ""}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                            }
                            {/* if data is not availabe then show not data screen */}
                            {(!driverOfferedList ? <div colSpan={20} className='text-center'><NoDataComp /></div> : !driverOfferedList?.result) && <div colSpan={20} className='text-center'><NoDataComp /></div>}

                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  {/* <p className="reg-color mt-3">
                    {t("Showing")} 1 - 10 {t("of")} 200
                  </p> */}
                  <Pagenation
                    length={driverOfferedList ? driverOfferedList?.list ? driverOfferedList?.list?.length : 0 : 0}
                    total={driverOfferedList ? driverOfferedList?.total ? driverOfferedList?.total : 0 : 0} />
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
                                name="search"
                                value={assignDriverFilter.search}
                                onChange={e => setAssignDriverFilter(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={assignDriverFilter.email}
                                onChange={e => setAssignDriverFilter(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                              />
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

                      <div className="yauto"
                        onScroll={(e) => {
                          // setBottom(e ? true : false)

                          const scrollHeight = e.target.scrollHeight;
                          const scrollTop = e.target.scrollTop;
                          const clientHeight = e.target.clientHeight;

                          const atBottom = Math.floor(scrollHeight - scrollTop) === clientHeight;
                          // console.log("atBottom: ", atBottom);

                          if (!childLoader?.three && driverAssignedList.next_page != false) {
                            if (atBottom) {
                              fetchDriverAssignList(driverAssignedList.next_page)
                            }
                          }
                          // console.log("i got the scroll")
                        }}
                        id="arrange-paading">
                        <div className="row main-cards-wrapper gx-3">
                          {driverAssignedList && driverAssignedList?.result && driverAssignedList?.list?.map((data, index) => {
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
                                        <img src={data?.user_profile_pic ? data?.user_profile_pic : ""} onError={(e) => e.target.src = ImportUser} alt="" />
                                      </div>
                                      <div className="right v-name cat-body-discription">
                                        <label htmlFor="">
                                          {t("Driver Name")}
                                        </label>
                                        <p>{data?.user_name ? data?.user_name : ""}</p>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-lg-6 cat-body-discription mt-2">
                                        <label htmlFor="">{t("Email")}</label>
                                        <p>{data?.user_email ? data?.user_email : ""}</p>
                                      </div>
                                      <div className="col-lg-6 cat-body-discription mt-2">
                                        <label htmlFor="">{t("Contact No.")}</label>
                                        <p>{data?.user_mobile ? data?.user_mobile : ""}</p>
                                      </div>
                                      <div className="col-lg-6 cat-body-discription mt-2">
                                        <label htmlFor="">{t("Vehicle No.")}</label>
                                        <p>{data?.plate_no ? data?.plate_no : ""}</p>
                                      </div>
                                      <div className="col-lg-6 cat-body-discription mt-2">
                                        <label htmlFor="">
                                          {t("Vehicle Assignment.")}
                                        </label>
                                        <p>{data?.vehicle_type ? data?.vehicle_type : ""}</p>
                                      </div>
                                      <div className="col-lg-12 cat-body-discription mt-2">
                                        <label htmlFor="">{t("Address")}</label>
                                        <p>
                                          {data?.user_address ? data?.user_address : ""}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                          {/* if data is not availabe then show not data screen */}
                          {(!driverAssignedList ? <div colSpan={20} className='text-center'><NoDataComp /></div> : !driverAssignedList?.result) && <div colSpan={20} className='text-center'><NoDataComp /></div>}

                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <p className="reg-color mt-3">
                    {t("Showing")} 1 - 10 {t("of")} 200
                  </p> */}
                  <Pagenation
                    length={driverAssignedList ? driverAssignedList?.list ? driverAssignedList?.list?.length : 0 : 0}
                    total={driverAssignedList ? driverAssignedList?.total ? driverAssignedList?.total : 0 : 0} />
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
                                name="search"
                                value={availbleDriverFilter.search}
                                onChange={(e) => setAvailableDriverFilter(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={availbleDriverFilter.email}
                                onChange={(e) => setAvailableDriverFilter(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                              />
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
                      <div className="yauto"
                        onScroll={(e) => {
                          // setBottom(e ? true : false)

                          const scrollHeight = e.target.scrollHeight;
                          const scrollTop = e.target.scrollTop;
                          const clientHeight = e.target.clientHeight;

                          const atBottom = Math.floor(scrollHeight - scrollTop) === clientHeight;
                          // console.log("atBottom: ", atBottom);

                          if (!childLoader?.four && driverAvailableList.next_page != false) {
                            if (atBottom) {
                              fetchDriverAvailableList(driverAvailableList.next_page)
                            }
                          }
                          // console.log("i got the scroll")
                        }}
                        id="arrange-paading">
                        {mainLoader ? <Loader /> :
                          <div className="row main-cards-wrapper gx-3">
                            {driverAvailableList && driverAvailableList?.result && driverAvailableList?.list?.map((data, index) => {
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
                                          <img src={data?.user_profile_pic ? data?.user_profile_pic : ""} onError={(e) => e.target.src = ImportUser} alt="" />
                                        </div>
                                        <div className="right v-name cat-body-discription">
                                          <label htmlFor="">
                                            {t("Driver Name")}
                                          </label>
                                          <p>{data?.user_name ? data?.user_name : ""}</p>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-lg-6 cat-body-discription mt-2">
                                          <label htmlFor="">{t("Email")}</label>
                                          <p>{data?.user_email ? data?.user_email : ""}</p>
                                        </div>
                                        <div className="col-lg-6 cat-body-discription mt-2">
                                          <label htmlFor="">{t("Contact No.")}</label>
                                          <p>{data?.user_mobile ? data?.user_mobile : ""}</p>
                                        </div>
                                        <div className="col-lg-6 cat-body-discription mt-2">
                                          <label htmlFor="">{t("Vehicle No.")}</label>
                                          <p>{data?.plate_no ? data?.plate_no : ""}</p>
                                        </div>
                                        <div className="col-lg-6 cat-body-discription mt-2">
                                          <label htmlFor="">
                                            {t("Vehicle Assignment.")}
                                          </label>
                                          <p>{data?.vehicle_type ? data?.vehicle_type : ""}</p>
                                        </div>
                                        <div className="col-lg-12 cat-body-discription mt-2">
                                          <label htmlFor="">{t("Address")}</label>
                                          <p>
                                            {data?.user_address ? data?.user_address : ""}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                            }
                            {/* if data is not availabe then show not data screen */}
                            {(!driverOfferedList ? <div colSpan={20} className='text-center'><NoDataComp /></div> : !driverOfferedList?.result) && <div colSpan={20} className='text-center'><NoDataComp /></div>}

                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  <Pagenation
                    length={driverAvailableList ? driverAvailableList?.list ? driverAvailableList?.list?.length : 0 : 0}
                    total={driverAvailableList ? driverAvailableList?.total ? driverAvailableList?.total : 0 : 0} />
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
                                name="search"
                                value={blockDriverFiler.search}
                                onChange={(e) => setBlockDriverFiler(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={blockDriverFiler.email}
                                onChange={(e) => setBlockDriverFiler(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                              />
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
                      <div className="yauto"
                        onScroll={(e) => {
                          // setBottom(e ? true : false)

                          const scrollHeight = e.target.scrollHeight;
                          const scrollTop = e.target.scrollTop;
                          const clientHeight = e.target.clientHeight;

                          const atBottom = Math.floor(scrollHeight - scrollTop) === clientHeight;
                          // console.log("atBottom: ", atBottom);

                          if (!childLoader?.five && driverBlockList.next_page != false) {
                            if (atBottom)
                              fetchDriverBlockList(driverBlockList.next_page)
                          }
                        }}
                        id="arrange-paading">
                        {mainLoader ? <Loader /> :
                          <div className="row main-cards-wrapper gx-3">
                            {driverBlockList && driverBlockList?.result && driverBlockList?.list?.map((data, index) => {
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
                                          <img src={data?.user_profile_pic ? data?.user_profile_pic : ""} onError={(e) => e.target.src = ImportUser} alt="" />
                                        </div>
                                        <div className="right v-name cat-body-discription">
                                          <label htmlFor="">
                                            {t("Driver Name")}
                                          </label>
                                          <p>{data?.user_name ? data?.user_name : ""}</p>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-lg-6 cat-body-discription mt-2">
                                          <label htmlFor="">{t("Email")}</label>
                                          <p>{data?.user_email ? data?.user_email : ""}</p>
                                        </div>
                                        <div className="col-lg-6 cat-body-discription mt-2">
                                          <label htmlFor="">{t("Contact No.")}</label>
                                          <p>{data?.user_mobile ? data?.user_mobile : ""}</p>
                                        </div>
                                        <div className="col-lg-6 cat-body-discription mt-2">
                                          <label htmlFor="">{t("Vehicle No.")}</label>
                                          <p>{data?.plate_no ? data?.plate_no : ""}</p>
                                        </div>
                                        <div className="col-lg-6 cat-body-discription mt-2">
                                          <label htmlFor="">
                                            {t("Vehicle Assignment.")}
                                          </label>
                                          <p>{data?.vehicle_type ? data?.vehicle_type : ""}</p>
                                        </div>
                                        <div className="col-lg-12 cat-body-discription mt-2">
                                          <label htmlFor="">{t("Address")}</label>
                                          <p>
                                            {data?.user_address ? data?.user_address : ""}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                            }
                            {/* if data is not availabe then show not data screen */}
                            {(!driverBlockList ? <div colSpan={20} className='text-center'><NoDataComp /></div> : !driverBlockList?.result) && <div colSpan={20} className='text-center'><NoDataComp /></div>}

                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  <Pagenation
                    length={driverBlockList ? driverBlockList?.list ? driverBlockList?.list?.length : 0 : 0}
                    total={driverBlockList ? driverBlockList?.total ? driverBlockList?.total : 0 : 0} />
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
    </motion.div >
  );
};

export default OfferDriverMarketPlace;

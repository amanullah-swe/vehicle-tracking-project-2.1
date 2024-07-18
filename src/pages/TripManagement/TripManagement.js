// Usama 09-02-2023
import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Col,
  Dropdown,
  Form,
  Modal,
  Nav,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import Import from "../../assets/images/ic-Import.svg";
import trip_icon from "../../assets/images/trip_icon.svg";
import option from "../../assets/images/option-three-dot.svg";
import stop_icon from "../../assets/images/stop_icon.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { simpleDeleteCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import Loader from "../../sharedComponent/Loader";
import Pagenation from "../../sharedComponent/Pagenation";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import { useCallback } from "react";
import { Space, TimePicker, Button } from "antd";
import dayjs from "dayjs";
import NoDataComp from "../../sharedComponent/NoDataComp";
import { useTranslation } from "react-i18next";
import copy from "../../assets/images/Copy.svg";
import { jsPDF } from "jspdf";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ImportUser from "../../assets/images/imagesuser.png";
import { useSelector } from "react-redux";
import VehicleBookingList2 from './VehicleBookingList2'
import FileSaver from "file-saver";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const TripManagement = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;
  const { t } = useTranslation();
  const [shareLink, setShareLink] = useState(false);


  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    pickup_point_code: "",
    pickup_point_name: "",
    priority: "",
    distance: "",
  });
  const [params, set_params] = useState({
    trip_id: '',
    vehicle_id: '',
    trip_start_time: '',
    trip_end_time: ''
  })
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleCloseRepeat = () => setShowRepeat(false);
  const handleShow2 = () => setShow2(true);
  const handleShowRepeat = async (trip_id, vehicle_id, trip_start_time, trip_end_time) => {
    await set_params({
      trip_id: trip_id,
      vehicle_id: vehicle_id,
      trip_start_time: trip_start_time,
      trip_end_time: trip_end_time
    });

    setShowRepeat(true);
  }
  const handleShow = () => setShow(true);
  const [tripFilter, setTripFilter] = useState({
    name: "",
    email: "",
    number: "",
    time: "",
  });
  const [last_page, setlast_page] = useState(false);
  const { sidebar, customerData, useDebounce, recordsPerPage, timeZone } =
    useContext(AppContext);
  const [totalPages, setTotalPages] = useState(0);
  const [total_count, setTotal_count] = useState(0);
  const observerRef = useRef();
  const [trripStopsData, setTrripStopsData] = useState([]);
  const debouncedSearchTerm = useDebounce(filter, 500);
  const debouncedFilterTrip = useDebounce(tripFilter, 500);
  const [loading, setLoading] = useState(false);
  const [tripList, setTripList] = useState([]);
  const [currntItem, setCurrntItem] = useState(null);
  const [tripActiveKey, settripActiveKey] = useState("planned");
  const [currentTrip, setCurrentTrip] = useState(null);
  const addonSettingData = useSelector((state) => state.auth.addonModule);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !last_page) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [last_page]);
  const repeatTrip = () => {
    // let stops = stoplist.map((stop) => stop?.pickup_point_id);
    let body = JSON.stringify({
      vehicle_id: params?.vehicle_id,
      trip_end_time: params?.trip_end_time,
      trip_start_time: params?.trip_start_time,
      trip_id: params?.trip_id
    });
    simplePostCall(ApiConfig.REPEAT_TRIP, body)
      .then((res) => {
        if (res.result && !res.error) {
          notifySuccess(res.message);
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        notifyError(err);
        console.log("err", err);
      })
      .finally(() => { });
  };
  // useEffect(() => {
  //   getAllTrips("planned");
  // }, [])
  useEffect(() => {
    getTripStops(1, "key");
  }, [debouncedSearchTerm]);
  useEffect(() => {
    setTripList([]);
    getAllTrips(tripActiveKey, 1, "key");
  }, [debouncedFilterTrip]);
  useEffect(() => {
    getAllTrips(tripActiveKey, page);
  }, [page]);


  const getAllTrips = (type, pageNo, key) => {
    pageNo == 1 && setLoading(true);
    let body = JSON.stringify({
      page: pageNo ? pageNo : 1,
      type: type,
      page_limit: recordsPerPage,
      ...tripFilter,
    });
    simplePostCall(ApiConfig.GET_TRIP_LIST, body)
      .then((res) => {
        setLoading(false);
        if (res.result == true) {
          if (key == "key") {
            let data = res.data;
            setTripList(data);
            setlast_page(res?.last_page);
            setTotalPages(res.total_pages);
            setTotal_count(res.total_count);
          } else {
            let data = res.data;
            setTripList([...tripList, ...data]);
            setlast_page(res?.last_page);
            setTotalPages(res.total_pages);
            setTotal_count(res.total_count);
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getTripStops = (pageNo, key) => {
    pageNo == 1 && setLoading(true);
    let body = JSON.stringify({
      page: pageNo ? pageNo : 1,
      ...filter,
      page_limit: recordsPerPage,
    });
    simplePostCall(ApiConfig.GET_TRIP_STOP, body)
      .then((res) => {
        setLoading(false);
        if (res.result == true) {
          if (key == "key") {
            setTrripStopsData(res?.data);
            setlast_page(!res.last_page);
            setTotalPages(res.total_pages);
          } else {
            setTrripStopsData([...trripStopsData, ...res.data]);
            setlast_page(!res?.last_page);
            setTotalPages(res.total_pages);
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const deleteStop = () => {
    simplePostCall(
      ApiConfig.DELETE_STOP_BY_ID,
      JSON.stringify({
        pickup_point_id: currntItem,
      })
    )
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
          getTripStops(1, "key");
          // setTrripStopsData(
          //   trripStopsData.filter((stop) => stop.pickup_point_id != currntItem)
          // );
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const deletetrip = () => {
    setLoading(true);
    simpleDeleteCall(
      ApiConfig.DELETE_TRIP,
      JSON.stringify({ trip_id: currentTrip })
    )
      .then((res) => {
        if (res.result) {
          getAllTrips(tripActiveKey, 1, "key");
          notifySuccess(res.message);
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
        notifyError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const TripListView = () => {
    return (
      <div className="row gx-3 main-cards-wrapper">
        {tripList?.length ? (
          <>
            {tripList?.map((trip, index) => {
              return (
                <div
                  className={
                    sidebar ? "col-lg-4 col-md-6" : "col-lg-3 col-md-6"
                  }
                  key={index}
                >
                  <div className={"common-vehical-card-inner cv-card p-0"}>
                    <div className="vehical-card-head">
                      <div className="heading">
                        <img src={trip_icon} alt="" />
                        <div className="">
                          <p className="sub-heading">{t("Trip Name")}</p>
                          <p
                            className="title text-truncate"
                            style={{ maxWidth: "180px" }}
                          >
                            {trip?.trip_name}
                          </p>
                        </div>
                      </div>
                      <div className="option customer-option">
                        <Dropdown>
                          <Dropdown.Toggle>
                            <img src={option} alt="" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {accessRights &&
                              accessRights?.rights_view_trips && (
                                <Dropdown.Item>
                                  <Link
                                    to={"/ViewDispatchTrip/" + trip.trip_id}
                                    className="d-block"
                                    onClick={() => sessionStorage.setItem('trip_id', trip?.trip_id)}
                                  >
                                    {t("View")}
                                  </Link>
                                </Dropdown.Item>
                              )}
                            {accessRights &&
                              accessRights?.rights_view_trips && addonSettingData?.addon_ghatke == 1 &&
                              <>
                                <Dropdown.Item>
                                  {tripActiveKey === 'completed' && <Link
                                    to={"#"}
                                    className="d-block"
                                    onClick={() => handleShowRepeat(trip.trip_id, trip.vehicle_id, trip.trip_start_time, trip.trip_end_time)}
                                  >
                                    {t("Repeat")}
                                  </Link>}
                                </Dropdown.Item>
                              </>}


                            {accessRights &&
                              accessRights?.rights_manage_trips && !addonSettingData?.addon_ghatke == 1 ? (
                              <>
                                <Dropdown.Item>
                                  {tripActiveKey === 'completed' ? (<Link
                                    to={"#"}
                                    className="d-block"
                                    onClick={() => handleShowRepeat(trip.trip_id, trip.vehicle_id, trip.trip_start_time, trip.trip_end_time)}
                                  >
                                    {t("Repeat")}
                                  </Link>) : (
                                    <Link
                                      to={"/EditDispatchTrip/" + trip.trip_id}
                                      className="d-block"
                                    >
                                      {t("Edit")}
                                    </Link>)}
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    setShareLink(true);
                                    setCurrentTrip(trip.trip_id);
                                  }}
                                >
                                  <Link to="#" className="d-block">
                                    {t("Share")}
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    setCurrentTrip(trip.trip_id);
                                    handleShow();
                                  }}
                                >
                                  <Link to="#" className="d-block">
                                    {t("Delete")}
                                  </Link>
                                </Dropdown.Item>
                              </>
                            ) : null}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>

                    <div className="vehical-card-body row">
                      <div className="card-contain col-lg-6">
                        <p className="sub-heading">{t("Vehicle")}</p>
                        <p className="title">{trip?.vehicle_number}</p>
                      </div>
                      <div className="card-contain col-lg-6">
                        <p className="sub-heading">{t("Trip Category")}</p>
                        <p className="title">{trip?.trip_category}</p>
                      </div>
                      <div className="card-contain col-lg-6">
                        <p className="sub-heading">{t("Start Time")}</p>
                        <p className="title">{trip?.trip_start_time}</p>
                      </div>
                      <div className="card-contain col-lg-6">
                        <p className="sub-heading">{t("End Time")}</p>
                        <p className="title">{trip?.trip_end_time}</p>
                      </div>
                      <div className="card-contain col-lg-6">
                        <p className="sub-heading">{t("Driver Name")}</p>
                        <p className="title">{trip?.user_name}</p>
                      </div>
                      <div className="card-contain col-lg-6">
                        <p className="sub-heading">{t("Driver Email")}</p>
                        <p className="title">{trip?.user_email}</p>
                      </div>
                      <div className="card-contain col-lg-6">
                        <p className="sub-heading">{t("Contact Number")}</p>
                        <p className="title">{trip?.user_mobile}</p>
                      </div>
                      {tripActiveKey == "unplanned" ? (
                        <></>
                      ) : (
                        <>
                          <div className="card-contain col-lg-6">
                            <p className="sub-heading">{t("Trip Id")}</p>
                            <p className="title">{trip?.trip_id}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {/* {last_page && (
              <p
                style={{ color: "#9c4900" }}
                className="text-center text-danger"
              >
                {" "}
                No More Data Found
              </p>
            )} */}
          </>
        ) : (
          <NoDataComp />
        )}
      </div>
    );
  };

  const getExPort = (formate) => {
    let newRequestBody = JSON.stringify({
      format: formate,
      trip_name: "",
      pickup_point_distance_from_source: "",
      pickup_point_priority: "",
      pickup_point_name_and_code: "",
    });
    simplePostCall(ApiConfig.GET_TRIP_STOP_EXPORT, newRequestBody)
      .then((data) => {
        if (data.result) {
          pdfFormat1(data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const pdfFormat1 = (pdfData) => {
    // let chatsData = await getExportChat()
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Trip Management";
    const headers = [["Sr. No.", "Stop Name", "Pick up Code", "Distance"]];
    var data = [];

    pdfData.map((item, index) => {
      data.push([
        index + 1,
        item?.pickup_point_name,
        item?.pickup_point_code,
        item?.pickup_point_distance_from_source,
        // item?.announcement_date,
      ]);
    });

    let content = {
      headStyles: { fillColor: "#9c4900" },
      theme: "grid",
      pageBreak: "auto",
      bodyStyles: { fillColor: "#f6efe9" },
      styles: { fillColor: "#9c4900" },
      head: headers,
      title: title,
      body: data,
    };

    doc.text(title, marginLeft, 25);
    doc.autoTable(content);
    doc.save("VT.pdf");
    return <div></div>;
  };

  const downLoadExcelSheet = (formate) => {
    let newRequestBody = JSON.stringify({
      format: formate,
      trip_name: "",
      pickup_point_distance_from_source: "",
      pickup_point_priority: "",
      pickup_point_name_and_code: "",
    });
    simplePostCall(ApiConfig.GET_TRIP_STOP_EXPORT, newRequestBody)
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

  const downLoadExcelSheetTrips = (formate) => {
    let newRequestBody = JSON.stringify({
      format: formate,
      type: tripActiveKey,
      name: "",
      email: "",
      number: "",
      time: "",
    });
    simplePostCall(ApiConfig.TRIPE_LIST, newRequestBody)
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
  const InputElements = useCallback(
    ({ setTripFilter, tripFilter, exportStatus }) => {
      function getExportChat(formate) {
        let newRequestBody = JSON.stringify({
          format: formate,
          type: exportStatus,
          name: "",
          email: "",
          number: "",
          time: "",
        });
        simplePostCall(ApiConfig.TRIPE_LIST, newRequestBody)
          .then((data) => {
            if (data.result) {
              pdfFormat(data.data);
            } else {
              notifyError(data?.message);
            }
          })
          .catch((err) => {
            console.log("err", err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      const pdfFormat = (pdfData) => {
        // let chatsData = await getExportChat()
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);
        const title = "Trip Management";
        const headers = [["Sr. No.", "Trip Name", "Vehicle", "Trip Category"]];
        var data = [];

        pdfData.map((item, index) => {
          data.push([
            index + 1,
            item?.trip_name,
            item?.vehicle_number,
            item?.trip_category,
            // item?.announcement_date,
          ]);
        });

        let content = {
          headStyles: { fillColor: "#9c4900" },
          theme: "grid",
          pageBreak: "auto",
          bodyStyles: { fillColor: "#f6efe9" },
          styles: { fillColor: "#9c4900" },
          head: headers,
          title: title,
          body: data,
        };

        doc.text(title, marginLeft, 25);
        doc.autoTable(content);
        doc.save("VT.pdf");
        return <div></div>;
      };




      return (
        <div className="all-vehical-head row vehicle-top-inputs">
          <div className="input-section-wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={t("Trip Name, Executive Name...")}
                  value={tripFilter?.name}
                  onChange={(e) => {
                    setTripFilter({ ...tripFilter, name: e.target.value });
                    e.target.focus();
                  }}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={t("Email")}
                  value={tripFilter?.email}
                  onChange={(e) => {
                    setTripFilter({ ...tripFilter, email: e.target.value });
                  }}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={t("Contact Number")}
                  value={tripFilter?.number}
                  onChange={(e) => {
                    // setTripFilter({ ...tripFilter, number: e.target.value });
                    const inputValue = e.target.value;
                    if (/^\d*$/.test(inputValue)) {
                      setTripFilter({ ...tripFilter, number: inputValue });
                    }
                  }}
                />
              </div>
              {/* <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                <Space>
                  <TimePicker
                    className="form-control carretClass"
                    size="large"
                    allowClear={true}
                    // use12Hours
                    // clearIcon={clearIcon}
                    // inputReadOnly

                    defaultValue={
                      tripFilter?.time && dayjs(tripFilter?.time, "HH:mm:ss")
                    }
                    onChange={(e) => {
                      if (e) {
                        let time =
                          e.hour() + ":" + e.minute() + ":" + e.second();
                        setTripFilter({
                          ...tripFilter,
                          time: time,
                        });
                      } else {
                        setTripFilter({
                          ...tripFilter,
                          time: "", // Clear the time value
                        });
                      }
                    }}
                  />
                </Space>
                <Form.Control.Feedback type="invalid">
                  Please Enter Start Time.
                </Form.Control.Feedback>
              </div> */}
            </div>
          </div>
          <div className="right-export-btn-section-wrapper">
            <div className="c-pointer me-2"></div>

            <div className="md_dropdown">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <img src={Import} alt="" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link onClick={() => getExportChat("")} className="d-block">
                      {t("PDF")}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      onClick={() => downLoadExcelSheetTrips("Excel")}
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
      );
    },
    []
  );

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
      <div id="cx-wrapper" className="Trip_Management">
        <div className="Vehcle-main-tabs" id="">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Nav variant="pills" id="newTabMai" className="">
              <>
                <Nav.Item>
                  <Nav.Link
                    eventKey="first"
                    onClick={() => {
                      setPage(1);
                      setlast_page();
                      settripActiveKey("planned");

                      getAllTrips("planned", 1, "key");
                      setTripList([]);
                    }}
                  >
                    {t("Trip")}
                  </Nav.Link>
                </Nav.Item>

                {!addonSettingData.addon_ghatke == 1 &&
                  <>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="second"
                        onClick={() => {
                          setPage(1);
                          setlast_page(null);
                          setTrripStopsData([]);

                          getTripStops(1, "key");
                        }}
                      >
                        {t("Stop")}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="third"
                        onClick={() => {
                          setPage(1);
                          setlast_page(null);
                          setTrripStopsData([]);

                          // getTripStops(1, "key");
                        }}
                      >
                        {t("Trip Routes")}
                      </Nav.Link>
                    </Nav.Item>
                  </>

                }


              </>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                {accessRights.rights_manage_trips && !addonSettingData?.addon_ghatke == 1 ? (
                  <Link
                    to="/EditDispatchTrip"
                    className="d-flex justify-content-end"
                  >
                    <button className="cx-btn-1 tbBtn">
                      + {t("New Trip")}
                    </button>
                  </Link>
                ) : null}
                <div className="main-master-wrapper mb-0 inner-tabs-section tabs-custom-width-33">
                  <div
                    id="scroll_insideThe_Padding33"
                    onScroll={(e) => {
                      const bottom =
                        e.target.scrollHeight - e.target.scrollTop ===
                        e.target.clientHeight;
                      if (bottom && !last_page) {
                        setPage(page + 1);
                        getAllTrips(tripActiveKey, page + 1);
                      }
                    }}
                  >
                    {
                      <Tab.Container
                        className="td-tab-wrapper"
                        defaultActiveKey="planned"
                      >
                        <Nav
                          variant="pills"
                          className="td-nav"
                          // id="InnerTabNew_Three"
                          id={
                            addonSettingData.addon_historical_data == 1
                              ? "InnerTabNew_Three"
                              : "InnerTabNew_ThreeAddOn"
                          }
                        >
                          {/*  {addonSettingData?.addon_ghatke == 1 ? (
                            <></>
                          ) : ( */}
                          <>
                            <Nav.Item className="td-tab">
                              <Nav.Link
                                className={"td-link"}
                                eventKey="planned"
                                onClick={() => {
                                  setTripFilter({
                                    name: "",
                                    email: "",
                                    number: "",
                                    time: "",
                                  });
                                  settripActiveKey("planned");
                                  setPage(1);
                                  setlast_page();
                                  setTripList([]);
                                }}
                              >
                                {t("Planned")}
                              </Nav.Link>
                            </Nav.Item>
                          </>
                          {/* )} */}

                          {addonSettingData?.addon_ghatke == 1 ? (
                            <></>
                          ) : (
                            <>
                              <Nav.Item className="td-tab">
                                <Nav.Link
                                  className={`td-link `}
                                  eventKey="unplanned"
                                  onClick={() => {
                                    setTripFilter({
                                      name: "",
                                      email: "",
                                      number: "",
                                      time: "",
                                    });
                                    settripActiveKey("unplanned");
                                    setPage(1);
                                    setlast_page();
                                    setTripList([]);
                                  }}
                                >
                                  {t("Unplanned")}
                                </Nav.Link>
                              </Nav.Item>
                            </>
                          )}

                          {/* {addonSettingData.addon_historical_data == 1 && ( */}
                          <Nav.Item className="td-tab">
                            <Nav.Link
                              className={`td-link `}
                              eventKey="completed"
                              onClick={() => {
                                setTripFilter({
                                  name: "",
                                  email: "",
                                  number: "",
                                  time: "",
                                });
                                settripActiveKey("completed");
                                setPage(1);
                                setlast_page();
                                setTripList([]);
                              }}
                            >
                              {t("Completed")}
                            </Nav.Link>
                          </Nav.Item>
                          {/* )} */}
                        </Nav>
                        <Col sm={12} className="">
                          {loading ? (
                            <Loader />
                          ) : (
                            <>
                              <Tab.Content>
                                <Tab.Pane eventKey="planned">
                                  <div className="all-vehicle-main">
                                    <InputElements
                                      setTripFilter={setTripFilter}
                                      tripFilter={tripFilter}
                                      exportStatus={tripActiveKey}
                                    />
                                    <div className="yauto TransportMananger_height">
                                      <TripListView />
                                    </div>
                                  </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="unplanned">
                                  <div className="all-vehicle-main">
                                    <InputElements
                                      setTripFilter={setTripFilter}
                                      tripFilter={tripFilter}
                                      exportStatus={tripActiveKey}
                                    />
                                    <div className="yauto TransportMananger_height">
                                      <TripListView />
                                    </div>
                                  </div>
                                </Tab.Pane>
                                {/* {addonSettingData.addon_historical_data ==
                                  1 && ( */}
                                <Tab.Pane eventKey="completed">
                                  <div className="all-vehicle-main">
                                    <InputElements
                                      setTripFilter={setTripFilter}
                                      tripFilter={tripFilter}
                                      exportStatus={tripActiveKey}
                                    />
                                    <div className="yauto completed">
                                      <TripListView />
                                    </div>
                                  </div>
                                </Tab.Pane>
                                {/* )} */}
                              </Tab.Content>
                            </>
                          )}
                        </Col>
                      </Tab.Container>
                    }

                  </div>

                  {tripList?.length > 0 && (
                    <Pagenation
                      length={tripList.length}
                      total={total_count}
                      comp={"trip"}
                    />
                  )}

                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                {/* <Link to="/AddStop">
                  <button className="cx-btn-1 tbBtn">+ {t("New Stop")}</button>
                </Link> */}
                <div className="main-master-wrapper mb-0 inner-tabs-section tabs-custom-width-33">
                  <div
                    id="scroll_insideThe_Padding83"
                    onScroll={(e) => {
                      const bottom =
                        e.target.scrollHeight - e.target.scrollTop ===
                        e.target.clientHeight;
                      if (bottom) {
                        setPage(page + 1);
                        getTripStops(page + 1);
                      }
                    }}
                  >
                    <div className="all-vehicle-main">
                      <div className="all-vehical-head row vehicle-top-inputs">
                        <div className="input-section-wrapper">
                          <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Pick-Up Point Trip")}
                                value={filter.trip_name}
                                onChange={(e) => {
                                  setTrripStopsData([]);
                                  setFilter({
                                    ...filter,
                                    trip_name: e.target.value,
                                  });
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Pick-Up Point Name, Code...")}
                                value={filter.pickup_point_name_and_code}
                                onChange={(e) => {
                                  setTrripStopsData([]);
                                  setFilter({
                                    ...filter,
                                    pickup_point_name_and_code: e.target.value,
                                  });
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Pick-Up Point Priority")}
                                value={filter.pickup_point_priority}
                                onChange={(e) => {
                                  setTrripStopsData([]);
                                  setFilter({
                                    ...filter,
                                    pickup_point_priority: e.target.value,
                                  });
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Distance From Customer(Km)")}
                                value={filter.pickup_point_distance_from_source}
                                onChange={(e) => {
                                  setTrripStopsData([]);
                                  setFilter({
                                    ...filter,
                                    pickup_point_distance_from_source:
                                      e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="right-export-btn-section-wrapper">
                          <div className="c-pointer me-2"></div>
                          {/* <div className="c-pointer">
                            <img src={Import} alt=""  onClick={()=>{
                              getExPort()
                            }}/>
                          </div> */}

                          <div className="md_dropdown">
                            <Dropdown>
                              <Dropdown.Toggle id="dropdown-basic">
                                <img src={Import} alt="" />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => getExPort("")}
                                    className="d-block"
                                  >
                                    {t("PDF")}
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => downLoadExcelSheet("Excel")}
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
                      {loading ? (
                        <Loader />
                      ) : (
                        <>
                          <div className="yauto" id="TransportMananger_height2">
                            <div className="all-vehical-body main-master-wrapper row m-0 p-0">
                              {trripStopsData && trripStopsData.length ? (
                                trripStopsData?.map((tripStop, index) => {
                                  return (
                                    <div className="col-md-4" key={index}>
                                      <div
                                        className={
                                          sidebar
                                            ? "common-vehical-card cv-card p-0"
                                            : "common-vehical-card-inner cv-card p-0 "
                                        }
                                        key={"tripStop" + index}
                                      >
                                        <div className="vehical-card-head">
                                          <div className="heading">
                                            <img src={stop_icon} alt="" />
                                            <div className="">
                                              <p className="sub-heading">
                                                {t("Stop Name")}
                                              </p>
                                              <p className="title">
                                                {tripStop.pickup_point_name}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="option customer-option">
                                            <Dropdown>
                                              <Dropdown.Toggle>
                                                <img src={option} alt="" />
                                              </Dropdown.Toggle>

                                              <Dropdown.Menu>
                                                {accessRights &&
                                                  accessRights?.rights_view_trips && (
                                                    <Dropdown.Item>
                                                      <Link
                                                        to={
                                                          "/ViewStop/" +
                                                          tripStop.pickup_point_id
                                                        }
                                                        className="d-block"
                                                      >
                                                        {t("View")}
                                                      </Link>
                                                    </Dropdown.Item>
                                                  )}
                                                {accessRights &&
                                                  accessRights?.rights_manage_trips ? (
                                                  <>
                                                    <Dropdown.Item>
                                                      <Link
                                                        to={
                                                          "/EditStop/" +
                                                          tripStop.pickup_point_id
                                                        }
                                                        className="d-block"
                                                      >
                                                        {t("Edit")}
                                                      </Link>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      onClick={() => {
                                                        handleShow2();
                                                        setCurrntItem(
                                                          tripStop.pickup_point_id
                                                        );
                                                      }}
                                                    >
                                                      <Link
                                                        to="#"
                                                        className="d-block"
                                                      >
                                                        {t("Delete")}
                                                      </Link>
                                                    </Dropdown.Item>
                                                  </>
                                                ) : null}
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                        <div className="vehical-card-body row">
                                          <div className="card-contain col-lg-6">
                                            <p className="sub-heading">
                                              {t("Pick-Up Point Trip")}
                                            </p>
                                            <p className="title">
                                              {tripStop.trip_name}
                                            </p>
                                          </div>
                                          <div className="card-contain col-lg-6">
                                            <p className="sub-heading">
                                              {t("Pick-Up Point Code")}
                                            </p>
                                            <p className="title">
                                              {tripStop.pickup_point_code}
                                            </p>
                                          </div>
                                          <div className="card-contain col-lg-6">
                                            <p className="sub-heading">
                                              {t("Pick-Up Point Priority")}
                                            </p>
                                            <p className="title">
                                              {tripStop.pickup_point_priority}
                                            </p>
                                          </div>
                                          <div className="card-contain col-lg-6">
                                            <p className="sub-heading">
                                              {t("Distance From Customer(Km)")}
                                            </p>
                                            <p className="title">
                                              {
                                                tripStop.pickup_point_distance_from_source
                                              }
                                            </p>
                                          </div>
                                          <div className="card-contain col-lg-6">
                                            <p className="sub-heading">
                                              {t("Stop Latitude")}
                                            </p>
                                            <p className="title">
                                              {tripStop.pickup_point_latitude}
                                            </p>
                                          </div>
                                          <div className="card-contain col-lg-6">
                                            <p className="sub-heading">
                                              {t("Stop Longitude")}
                                            </p>
                                            <p className="title">
                                              {tripStop.pickup_point_longitude}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <>
                                  <NoDataComp />
                                </>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                  </div>

                  {trripStopsData?.length > 0 && (
                    <Pagenation
                      length={trripStopsData?.length}
                      total={totalPages}
                      comp={"trip"}
                    />
                  )}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <VehicleBookingList2 />
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
              <Modal.Title>{t("Delete Trip")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {t("Are you sure you want to delete this Trip")} ?
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer">
              <button className="cx-btn-1" onClick={handleClose}>
                {t("Close")}
              </button>
              <button
                className="cx-btn-2"
                onClick={() => {
                  deletetrip();
                  handleClose();
                }}
              >
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showRepeat}
            onHide={handleCloseRepeat}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Repeat Trip")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {t("Are you sure you want to repeat this Trip")} ?
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer">
              <button className="cx-btn-1" onClick={handleCloseRepeat}>
                {t("Close")}
              </button>
              <button
                className="cx-btn-2"
                onClick={() => {
                  repeatTrip();
                  handleCloseRepeat();
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
            <Modal.Header closeButton>
              <Modal.Title>{t("Delete Stop")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {t("Are you sure you want to delete this Stop")}?
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer">
              <button className="cx-btn-1" onClick={() => setShow2(false)}>
                {t("Close")}
              </button>
              <button
                className="cx-btn-2"
                onClick={() => {
                  deleteStop();
                  setShow2(false);
                }}
              >
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>
          {/* Delete Modal Start */}
          {customerData?.customer_id && timeZone && (
            <Modal
              Modal
              show={shareLink}
              onHide={() => setShareLink(false)}
              centered
              size="md"
              className="common-model copy_Link"
            >
              <Modal.Header closeButton>
                <Modal.Title>{t("Share Trip")}</Modal.Title>
              </Modal.Header>
              <Modal.Body className="pb-2">
                <p>{t("Link to share")}</p>
                <input
                  type="text"
                  Value={`${`${ApiConfig?.BASE_URL_SHARE}ShareTrip/` +
                    currentTrip +
                    `&user_customer_id=${customerData?.customer_id
                    }&timeZone=${timeZone?.replace("/", "-")}`
                    }`}
                  className="form-control"
                />
                <div className="copy_body d-flex justify-content-end">
                  <CopyToClipboard
                    text={`${`${ApiConfig?.BASE_URL_SHARE}ShareTrip/` +
                      currentTrip +
                      `&user_customer_id=${customerData?.customer_id
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
        </div>


      </div>
    </motion.div>
  );
};

export default TripManagement;

import { React, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link, useParams } from "react-router-dom";
import Logout from "../../assets/images/import_icon.svg";
import Share from "../../assets/images/XMLID_1022_.svg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Nav from "react-bootstrap/Nav";
import option from "../../assets/images/option-three-dot.svg";
import { Accordion, Col, Dropdown, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import MapComponent from "../../sharedComponent/MapComponent";
import playback from "../../assets/images/AudioControls/Playback.svg";
import backword from "../../assets/images/AudioControls/Backword.svg";
import Forword from "../../assets/images/AudioControls/Forword.svg";
import Forword1 from "../../assets/images/AudioControls/Forword1.svg";
import playback_active from "../../assets/images/AudioControls/Playback_active.svg";
import backword_active from "../../assets/images/AudioControls/Backword_active.svg";
import Forword_active from "../../assets/images/AudioControls/Forword_active.svg";
import Forword1_active from "../../assets/images/AudioControls/Forword1_active.svg";
import Pause from "../../assets/images/AudioControls/Pause.svg";
import Replay from "../../assets/images/AudioControls/Replay.svg";
import play from "../../assets/images/AudioControls/Play.svg";
import Calendar from "../../assets/images/calendar.svg";
import { useTranslation } from "react-i18next";
import profile from "../../assets/images/profile.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { simpleGetCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { Space, TimePicker } from "antd";
import dayjs from "dayjs";
import FileSaver from "file-saver";
import { notifyError } from "../../sharedComponent/notify";
import jsPDF from "jspdf";
import CommonDatePicker from "../../sharedComponent/CommonDatePicker";
import { latestDate } from "../../sharedComponent/common";
import ImportUser from "../../assets/images/imagesuser.png";
import Loader from "../../sharedComponent/Loader";
import NoDataComp from "../../sharedComponent/NoDataComp";
import { Select } from "antd";
const { Option } = Select;
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const ReplayPlayback = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;
  const {
    sidebar,
    setTriggerMapBoundKeyRandom,
    setCenterDragged,
    DateFormatConfig,
    loading,
    setLoading,
  } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00:00 to compare just the date part
    return today;
  };
  // moving car data
  const [mapBoundReplay, setMapBoundReplay] = useState(true);
  const [mapListRoad, setMapListRoad] = useState([]);
  const [carSpeed, setCarSpeed] = useState(1);
  const [cursor, setCursor] = useState(0);
  const [carPlay, setCarPlay] = useState(true);
  const [currentTrack, setCurrentTrack] = useState({});
  const [speedData, setSpeedData] = useState([]);
  const [prevPos, setPrevPos] = useState([]);
  const [reversCar, setReversCar] = useState(false);
  const [updatedTrackRoad, setUpdatedTrackRoad] = useState([]);
  const [vehicleIcon, setVehicleIcon] = useState("");
  const [overSpeedColor, setOverSpeedColor] = useState(false);
  const [BreakTrackRoad, setBreakTrackRoad] = useState([[]]);
  const [indexValue, setIndexValue] = useState(0);
  const [indexValuenot, setIndexValuenot] = useState(false);
  const [countOverSpeed, setcountOverSpeed] = useState(0);
  const [Roadcontrol, setRoadcontrol] = useState(true);
  let lastindexOfRoad = mapListRoad && mapListRoad?.length - 1;
  let firstValue = cursor == 0;
  let lastValue = cursor == mapListRoad?.length - 1;

  let TripsBounds =
    mapListRoad &&
    mapListRoad?.length > 0 &&
    mapListRoad?.map((ele) => [Number(ele.lat), Number(ele.lng)]);

  useEffect(() => {
    // intial render defallt data
    if (cursor == 0) {
      setCurrentTrack(mapListRoad[cursor]);
      setUpdatedTrackRoad([mapListRoad[cursor]]);
    }
    if (carPlay) {
      const interval = setInterval(() => {
        if (!carPlay) return;
        if (cursor == mapListRoad?.length - 1) {
          setPrevPos(mapListRoad[cursor]);
          let newRoad = [...updatedTrackRoad];
          newRoad.push(mapListRoad[mapListRoad?.length - 1]);
          setUpdatedTrackRoad(newRoad);
          setCarPlay(false);
          setReversCar(false);
        }
        //backmovement of car main spped logic backward
        if (reversCar && cursor > -1) {
          // set proper index
          if (cursor > 0) {
            setCursor(cursor - 1);
          } else {
            setCursor(0);
          }
          let newoverSpeed = currentTrack?.obj?.path;
          if (newoverSpeed?.length) {
            if (BreakTrackRoad?.length) {
              if (BreakTrackRoad[indexValue - 1]?.length > 0) {
                BreakTrackRoad[indexValue - 1]?.pop();
                setIndexValuenot(true);
              } else {
                if (indexValuenot) {
                  setIndexValue((indexValue) => indexValue - 1);
                  BreakTrackRoad && BreakTrackRoad?.pop();
                }
                setIndexValuenot(false);
              }
            }
          }

          let newdata = [...updatedTrackRoad];
          let latestData = newdata?.filter(
            (element) =>
              element?.latitude !== currentTrack?.latitude &&
              element?.longitude !== currentTrack?.longitude
          );
          setUpdatedTrackRoad(latestData);
        }
        //Farward movemonet of car  main spped logic farward
        if (
          !reversCar &&
          cursor !== mapListRoad.length - 1 &&
          mapListRoad.length
        ) {
          let newSpeed = mapListRoad[cursor + 1].obj?.path;
          let newoverSpeed = currentTrack.obj?.path;
          if (newoverSpeed?.length && newSpeed?.length) {
            BreakTrackRoad[indexValue]?.push(...newoverSpeed); // Push newoverSpeed into the
            setIndexValuenot(true);
          } else {
            if (indexValuenot) {
              setIndexValue((indexValue) => indexValue + 1);
              BreakTrackRoad?.push([]);
            }
            setIndexValuenot(false);
          }

          if (cursor == mapListRoad?.length) {
            setCursor(cursor);
          } else {
            setCursor(cursor + 1);
          }
          setCursor(cursor + 1);
          let newdata = [...updatedTrackRoad];
          newdata?.push(mapListRoad[cursor]);
          setUpdatedTrackRoad(newdata);
        }

        // set at zero index
        if (cursor == 0 && updatedTrackRoad?.length == 1) {
          // setCarPlay(false);
          setReversCar(false);
        }
        setCurrentTrack(mapListRoad[cursor]);

        if (cursor > 0) setPrevPos(mapListRoad[cursor - 1]);
      }, 1600 / carSpeed);
      return () => {
        clearInterval(interval);
      };
    }
  }, [cursor, carPlay, mapListRoad]);

  useEffect(() => {
    if (
      prevPos != undefined &&
      currentTrack != undefined &&
      prevPos[1] !== currentTrack[1] &&
      prevPos[0] !== currentTrack[0]
    )
      setPrevPos(currentTrack);
  }, [currentTrack, prevPos]);

  const handleplay = () => {
    if (cursor == mapListRoad?.length - 1) {
      setCursor(cursor - 1);
      setCarPlay(true);
      // setReversCar(true);
    } else {
      setCursor(cursor + 1);
      setCarPlay(true);
      // setReversCar(false);
    }
  };
  let paramID = useParams();
  const vehicleID = paramID.id;
  const [searchData, setSearchData] = useState({
    vehicle_id: "",
    trip_end_date: new Date(),
    trip_start_time: "",
    trip_end_time: "",
  });

  const [activeKye, setActiveKye] = useState(0);
  const [listDataTrips, setListDataTrips] = useState([]);
  const [singleVehicleList, setSingleVehicleList] = useState([]);
  useEffect(() => {
    if (vehicleID) {
      setSearchData({
        ...searchData,
        vehicle_id: vehicleID,
        trip_end_date: new Date(),
        trip_start_time: "00:00:00",
        trip_end_time: "23:59:59",
      });
      getCompletedTrips({
        vehicle_id: vehicleID,
        trip_end_date: new Date(),
        trip_start_time: "00:00:00",
        trip_end_time: "23:59:59",
      });
    }
    getVehicleList(vehicleID);
  }, []);

  const getCompletedTrips = (body) => {
    setLoading(true);
    simplePostCall(
      ApiConfig.COMPLETED_TRIPS_SINGLE,
      JSON.stringify({
        ...body,
        trip_end_date: body?.trip_end_date
          ? latestDate(body?.trip_end_date, "yyyy-MM-dd")
          : new Date(),
      })
    )
      .then((res) => {
        setLoading(false);
        if (res?.result == true) {
          setListDataTrips(res?.arr);
          setMapListRoad(
            res?.arr[0]?.location_data ? res?.arr[0]?.location_data : []
          );
          setCursor(0);
          setCurrentTrack(res?.arr[0]?.location_data[0]);
          setPrevPos([]);
          setReversCar(false);
          setUpdatedTrackRoad(
            [res?.arr[0]?.location_data[0]]
              ? [res?.arr[0]?.location_data[0]]
              : []
          );
          setVehicleIcon(Math?.random());
          setCarPlay(true);
        } else {
          notifyError(res?.message);
          setListDataTrips([]);
          setMapListRoad([]);
          setCursor(0);
          setCurrentTrack({});
          setPrevPos([]);
          setReversCar(false);
          setUpdatedTrackRoad([]);
          // setVehicleIcon(Math.random());
          setCarPlay(false);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((e) => {
        console.log(e);
      });
  };

  const getVehicleList = (vehicleID) => {
    simpleGetCall(ApiConfig.GET_COMPLETED_TRIPS_DROPDOWN)
      .then((res) => {
        if (res?.result === true) {
          setSingleVehicleList(res?.data);
          let idData = res?.data[0]?.vehicle_id;
          if (!vehicleID) {
            if (idData) {
              setSearchData({
                ...searchData,
                vehicle_id: idData,
                trip_end_date: new Date(),
                trip_start_time: "00:00:00",
                trip_end_time: "23:59:59",
              });
              getCompletedTrips({
                vehicle_id: idData,
                trip_end_date: new Date(),
                trip_start_time: "00:00:00",
                trip_end_time: "23:59:59",
              });
            }
          }
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  //Export
  function getExportChat() {
    let newRequestBody = JSON.stringify({
      ...searchData,
      trip_end_date: latestDate(searchData?.trip_end_date, "yyyy-MM-dd"),
      formate: "",
    });
    simplePostCall(ApiConfig.COMPLETED_TRIPS_EXPORT, newRequestBody)
      .then((data) => {
        if (data.result) {
          pdfFormat(data?.data);
        } else {
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        // setLoader(false)
      });
  }

  const pdfFormat = (pdfData) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Vehicle Completed Trips";
    const headers = [
      [
        "Sr. No.",
        "Vehicle NUnmber",
        "Driver Name",
        "Date",
        "Start Time",
        "End Time",
      ],
    ];
    var data = [];

    pdfData.map((item, index) => {
      data.push([
        index + 1,
        item.vehicle_name,
        item.user_name,
        item.trip_date,
        item.trip_start_time,
        item.trip_end_time,
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

  //exale
  const downLoadExcelSheet = () => {
    let newRequestBody = JSON.stringify({
      ...searchData,
      trip_end_date: latestDate(searchData?.trip_end_date, "yyyy-MM-dd"),
      format: "Excel",
    });
    simplePostCall(ApiConfig.COMPLETED_TRIPS_EXPORT, newRequestBody)
      .then((res) => {
        if (res?.result === true) {
          FileSaver.saveAs(ApiConfig.BASE_URL + res?.filePath);
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
  };
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
        <div id="cx-wrapper" className="Parking_Slot ReplayPlayback">
          <div className="upperMainSet">
            <div className="row top-content g-3">
              <div className="col-lg-10 col-md-12 arrange-margin left">
                <div className="row p-0">
                  <div className="col-md-3">
                    <div className="weekCounter">
                      <div className="multi-select-1">
                        <Select
                          required
                          className="custom-select"
                          style={{ height: "40px", width: "100%" }}
                          value={searchData?.vehicle_id}
                          placeholder="Enter Vehicle Type Name..."
                          onChange={(value) => {
                            // setsearchFlag(true);
                            setSearchData({
                              ...searchData,
                              vehicle_id: value,
                            });
                          }}
                        >
                          {singleVehicleList && singleVehicleList?.length > 0
                            ? singleVehicleList?.map((item, index) => {
                              return (
                                <Option
                                  style={{ color: "rgba(156, 73, 0)" }}
                                  key={"vehicleCategory" + index}
                                  value={item.vehicle_id}
                                >
                                  {item.vehicle_number}
                                </Option>
                              );
                            })
                            : "no data available"}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="weekCounter">
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          dateKey="trip_end_date"
                          setDate={setSearchData}
                          data={searchData}
                          dataDisbal={getToday()}
                          SetPlaceholder={"Trip  Date"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="weekCounter">
                      <Space>
                        <TimePicker
                          className="form-control carretClass"
                          size="large"
                          placeholder={t("Select Time")}
                          // use12Hours
                          // allowClear={false}
                          // clearIcon={clearIcon}
                          // inputReadOnly
                          allowClear={true}
                          defaultValue={
                            searchData.trip_start_time &&
                            dayjs(searchData?.trip_start_time, "HH:mm:ss")
                          }
                          onChange={(e) => {
                            // setsearchFlag(true);
                            if (e) {
                              let time =
                                e.hour() + ":" + e.minute() + ":" + e.second();
                              setSearchData({
                                ...searchData,
                                trip_start_time: time,
                              });
                            }
                          }}
                        />
                      </Space>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="weekCounter">
                      <Space>
                        <TimePicker
                          className="form-control carretClass"
                          size="large"
                          allowClear={true}
                          placeholder={t("Select Time")}
                          // use12Hours
                          // clearIcon={clearIcon}
                          // inputReadOnly
                          defaultValue={
                            searchData.trip_end_time &&
                            dayjs(searchData.trip_end_time, "HH:mm:ss")
                          }
                          onChange={(e) => {
                            if (e) {
                              let time =
                                e.hour() + ":" + e.minute() + ":" + e.second();
                              setSearchData({
                                ...searchData,
                                trip_end_time: time,
                              });
                            }
                          }}
                        />
                      </Space>
                    </div>
                  </div>
                </div>
              </div>

              {/* {userRole === "customer" ||
              (accessRights &&
                accessRights?.rights_manage_replay_or_paybacks) ? ( */}
              <div className="col-lg-2 col-md-12 mainCol4 right">
                <div className="leftSideSec">
                  <button
                    onClick={() => {
                      setSearchData({
                        ...searchData,
                        trip_end_date: searchData?.trip_end_date
                          ? searchData?.trip_end_date
                          : new Date(),
                      });
                      getCompletedTrips(searchData);
                    }}
                    className="cx-btn-1"
                  >
                    {" "}
                    {t("Submit")}
                  </button>
                  {/* <Link to="#">
                      <div className="inconMain">
                        <img src={Logout} alt="" />
                      </div>
                    </Link> */}
                  <div
                    className="inconMain left-margin md_dropdown"
                    id="ReplayPlayback-export"
                  >
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src={Share} alt="" />
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
              {/* // ) : null} */}
            </div>

            {loading ? (
              <Loader />
            ) : (
              <>
                {" "}
                <div
                  className="row body-content body-content2 g-3"
                  id="play-vehicle-driver-cards"
                >
                  <div className="col-lg-12 col-md-12 order-1">
                    <div className="tabsCon">
                      <Tab.Container
                        id="left-tabs-example"
                        className="td-tab-wrapper"
                        defaultActiveKey="0"
                      >
                        <Col lg={12} className="order-1">
                          <Tab.Content className="custom_height_adjust">
                            <Tab.Pane eventKey="0">
                              <div className="row">
                                {listDataTrips && listDataTrips?.length > 0 ? (
                                  listDataTrips?.map((ele, index) => {
                                    return (
                                      <div className="col-lg-4 col-md-4 col-sm-12">
                                        <div id="navPills">
                                          <Nav
                                            variant="pills"
                                            className="flex-column"
                                            id=""
                                          >
                                            <Nav.Item>
                                              <Nav.Link
                                                eventKey={index}
                                                active={
                                                  index == activeKye
                                                    ? true
                                                    : false
                                                }
                                                onClick={() => {
                                                  setActiveKye(index);
                                                  setBreakTrackRoad([[]]);
                                                  setMapListRoad(
                                                    ele?.location_data
                                                  );
                                                  // setVehicleIcon(index);
                                                  setCursor(0);
                                                  setCurrentTrack(
                                                    ele?.location_data[0]
                                                  );
                                                  setPrevPos([]);
                                                  setReversCar(false);
                                                  setUpdatedTrackRoad([
                                                    ele?.location_data[0],
                                                  ]);
                                                  setCarSpeed(1);
                                                  setIndexValue(0);
                                                  setVehicleIcon(Math.random());
                                                  setCarPlay(true);
                                                  setTriggerMapBoundKeyRandom(
                                                    Math.floor(
                                                      Math.random() * 10000000
                                                    )
                                                  );
                                                  setCenterDragged([
                                                    Number(
                                                      ele?.location_data[0]
                                                        ?.latitude
                                                    ),
                                                    Number(
                                                      ele?.location_data[0]
                                                        ?.longitude
                                                    ),
                                                  ]);
                                                }}
                                              >
                                                <div
                                                  className="AllFlexNav"
                                                  key={"trips+index" + index}
                                                >
                                                  <div className="d-img">
                                                    <img
                                                      src={
                                                        ele?.user_profile_pic
                                                          ? ele?.user_profile_pic
                                                          : ImportUser
                                                      }
                                                      alt=""
                                                      onError={(ev) => {
                                                        handleErrorImage(ev);
                                                      }}
                                                    />
                                                  </div>
                                                  <div>
                                                    <p className="paraNav">
                                                      {t("Driver Name")}
                                                    </p>
                                                    <p className="paraNavTxt">
                                                      {ele?.user_name}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="paraNav">
                                                      {t("From")}
                                                    </p>
                                                    <p className="paraNavTxt">
                                                      {ele?.trip_start_time}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="paraNav">
                                                      {t("To")}
                                                    </p>
                                                    <p className="paraNavTxt">
                                                      {ele?.trip_end_time}
                                                    </p>
                                                  </div>
                                                </div>
                                              </Nav.Link>
                                            </Nav.Item>
                                          </Nav>
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <>
                                    <div className="">
                                      <div className="justify-content-center align-item-center">
                                        <p className="paraNav text-center text-danger ">
                                          {Roadcontrol ? (
                                            <NoDataComp />
                                          ) : (
                                            t("Completed Trips not Found")
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Tab.Container>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 order-2">
                    {mapListRoad?.length > 0 && currentTrack && (
                      <div className="mainMape" id="ReplayPlayback">
                        <div className="Custom_header">
                          <div className="heading">{t("Map Overview")}</div>

                          <div className="controls">
                            <button>
                              <div
                                // className="dropdown-wrapper"
                                onClick={() => {
                                  setMapBoundReplay(!mapBoundReplay);
                                }}
                              >
                                {mapBoundReplay ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 8 8"
                                  >
                                    <path
                                      fill="red"
                                      d="M0 0v8h8V5.62a.5.5 0 0 0 0-.22V-.01H0zm1 1h6v4H5.5a.5.5 0 0 0-.09 0a.5.5 0 1 0 .09 1H7v1H1V1zm2.5 1C2.67 2 2 2.67 2 3.5C2 4.5 3.5 6 3.5 6S5 4.5 5 3.5C5 2.67 4.33 2 3.5 2zm0 1c.28 0 .5.22.5.5s-.22.5-.5.5s-.5-.22-.5-.5s.22-.5.5-.5z"
                                    />
                                  </svg>
                                ) : (
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
                                )}
                              </div>
                            </button>

                            {!carPlay ? (
                              <button
                                onClick={() => {
                                  handleplay();
                                  // setVehicleIcon(Math.random());
                                  setCarPlay(true);
                                }}
                              >
                                <img src={play} alt="" />
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setCarPlay(false);
                                  // setVehicleIcon(Math.random());
                                }}
                              >
                                <img src={Pause} alt="" />
                              </button>
                            )}
                            <button>
                              <img
                                src={Replay}
                                alt=""
                                onClick={() => {
                                  setCarPlay(false);
                                  setReversCar(false);
                                  setVehicleIcon(Math.random());
                                  setUpdatedTrackRoad([mapListRoad[0]]);
                                  setIndexValue(0);
                                  setCursor(0);
                                  setBreakTrackRoad([]);
                                  setCarSpeed(1);
                                }}
                              />
                            </button>
                            <button
                              disabled={carSpeed < 2 ? true : false}
                              onClick={() => setCarSpeed(carSpeed - 1)}
                            >
                              {carSpeed === 1 ? (
                                <img src={playback} alt="" />
                              ) : (
                                <img src={playback_active} alt="" />
                              )}
                            </button>
                            <button>
                              <p
                                style={{
                                  color: "#9c4900",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              >
                                {carSpeed}&nbsp;X
                              </p>
                            </button>
                            <button
                              disabled={carSpeed > 3 ? true : false}
                              onClick={() => setCarSpeed(carSpeed + 1)}
                            >
                              {carSpeed >= 4 ? (
                                <img src={Forword1} alt="" />
                              ) : (
                                <img src={Forword1_active} alt="" />
                              )}
                            </button>

                            <button
                              disabled={firstValue}
                              onClick={() => {
                                setReversCar(true);
                                // setCarPlay(true);
                                // setCursor(cursor+1);
                              }}
                            >
                              <img
                                src={reversCar ? backword : backword_active}
                                alt=""
                              />
                            </button>

                            <button
                              disabled={lastValue}
                              onClick={() => {
                                setReversCar(false);
                                // setCarPlay(true);
                                setCursor(cursor + 1);
                              }}
                            >
                              <img
                                src={reversCar ? Forword_active : Forword}
                                alt=""
                              />
                            </button>
                          </div>
                        </div>
                        {
                          // mapListRoad?.length > 0 &&
                          mapListRoad?.length > 0 && currentTrack && (
                            <>
                              <MapComponent
                                componentId={"playback"}
                                mapListRoad={mapListRoad}
                                prevPos={prevPos}
                                currentTrack={currentTrack}
                                updatedTrackRoad={updatedTrackRoad}
                                TripsBounds={TripsBounds}
                                BreakTrackRoad={BreakTrackRoad}
                                vehicleIcon={vehicleIcon}
                                overSpeedColor={overSpeedColor}
                                mapBoundReplay={mapBoundReplay}
                                carSpeed={carSpeed}
                              />
                              <div className="map_bottom_labels">
                                <div className="label label_1">
                                  <div className="box"></div>
                                  <p>{t("Predefined route")} </p>
                                </div>
                                <div className="label label_2">
                                  <div className="box"></div>
                                  <p>{t("Historical route")} </p>
                                </div>
                                <div className="label label_3">
                                  <div className="box"></div>
                                  <p>{t("Speed limit exceed")} </p>
                                </div>
                              </div>
                            </>
                          )
                        }
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ReplayPlayback;

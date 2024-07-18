import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../../assets/images/import_icon.svg";
import Share from "../../assets/images/XMLID_1022_.svg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Nav from "react-bootstrap/Nav";
import option from "../../assets/images/option-three-dot.svg";
import { Col, Dropdown, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import MapComponent from "../../sharedComponent/MapComponent";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import { simpleDeleteCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import Loader from "../../sharedComponent/Loader";
import Pagenation from "../../sharedComponent/Pagenation";
import { useTranslation } from "react-i18next";
import GoogleMapComponent from "../../sharedComponent/GoogleMap/GoogleMapComponent";
import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";
import FileSaver from "file-saver";
import NoDataComp from "../../sharedComponent/NoDataComp";

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const ParkingSlot = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;

  const {
    googleMap,
    sidebar,
    useDebounce,
    setMarker,
    recordsPerPage,
    setRegionCord,
    setMapZoomValue,
    setPlace,
    layerTypeSend,
    setLayerTypeSend,
    mapLatLngData,
    setMapLatLngData,
    setMapRectangle,
    errMsgMap,
    setErrMsgMap,
    setRadius,
    setMapLayer,
    loading,
    setLoading,
    radiusDraw,
    setRadiusDraw,
    draggedName,
    setDraggedName,
    setCircle,
    positionCercle,
    setPositionCercle,
    positionRectangle,
    setPositionRectangle,
    setPostionRadius,
    setPostionPolygon,
    mapLayer,
    setCenterDragged,
    mapZoomValue,
  } = useContext(AppContext);
  const navigation = useNavigate();
  const [searchData, setSearchData] = useState({
    slotCode: "",
    slotName: "",
    address: "",
  });
  const [loader, setLoader] = useState(false);
  const [tabClicked, setTabClicked] = useState(false);
  const [navClicked, setNavClicked] = useState(false);
  const [cardDetails, setCardDetails] = useState([]);
  const [cardDetailsSearch, setCardDetailsSearch] = useState([]);
  const [singleCardDetails, setSingleCardDetails] = useState({
    address: "",
    school_id: "",
    slot_code: "",
    slot_gps_latitude: "",
    slot_gps_longitude: "",
    slot_id: "",
    slot_name: "",
    slot_status: "",
  });
  const [last_page, setlast_page] = useState(false);
  // last_page
  const [page, setPage] = useState(1);
  const [total_count, setTotal_count] = useState(null);

  const debouncedSearchTerm = useDebounce(searchData, 500);
  useEffect(() => {
    getFilterParkingSlot(1, "All");
  }, [debouncedSearchTerm]);
  const [deletedId, setDeletedId] = useState("");
  const { t, i18n } = useTranslation();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [tabApi, setTabApi] = useState("all");

  const getFilterParkingSlot = (page, tabType) => {
    page == 1 && setLoader(true);
    simplePostCall(
      ApiConfig.PARKING_SLOT_LISTS,
      JSON.stringify({
        slotCode: searchData?.slotCode?.trim(),
        slotName: searchData?.slotName?.trim(),
        address: searchData?.address?.trim(),
        page: page,
        page_limit: recordsPerPage,
        type: tabType,
        access_rights: "rights_view_parking_station",
      })
    )
      .then((res) => {
        setLoader(false);
        if (res.result === true) {
          // if (searchData.slotCode !== "") {
          //   setCardDetailsSearch(res.data)
          //   setCardDetails(res.data);
          // } else if (searchData.slotName !== "") {
          //   setCardDetailsSearch(res.data)
          //   setCardDetails(res.data);
          // } else if (searchData.address !== "") {
          //   setCardDetailsSearch(res.data)
          //   setCardDetails(res.data);
          // } else {
          // }

          setCardDetails([...cardDetails, ...res.data]);
          setlast_page(res?.last_page);
          setTotal_count(res?.total_count);
          setTabClicked(false);
        } else {
          setCardDetails([]);
        }
      })
      .catch((err) => {
        console.log("api response", err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const ParkingSlotDelete = () => {
    setTabClicked(false);
    handleClose();
    simpleDeleteCall(
      ApiConfig.PARKING_SLOT_DELETE,
      JSON.stringify({ slot_id: deletedId })
    )
      .then((res) => {
        setPostionPolygon([]);
        setPositionRectangle([]);
        setPositionCercle([]);
        setPostionRadius("");
        if (res.result === true) {
          notifySuccess(res.message);
          let filteredData =
            cardDetails &&
            cardDetails.filter((item) => {
              return item.slot_id !== deletedId;
            });
          setCardDetails(filteredData);
        } else {
          notifyError(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  function isRowNotAllNull(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] !== null) {
          return true; // If any non-null value is found in a row, return true
        }
      }
    }
    return false; // If all rows are composed of null values, return false
  }

  const getSingleLIstParkingSlot = (id) => {
    const newdata = cardDetails.filter((ele) => ele.slot_id === id);

    if (newdata[0]) {
      setMapZoomValue(9);

      if (newdata && newdata[0].type == "rectangle") {
        setPositionRectangle(newdata[0]?.drowvalue);
      }
      if (newdata && newdata[0].type == "circle") {
        let dataout = newdata[0]?.drowvalue;
        setPostionRadius(
          Number(newdata[0]?.radius) ? Number(newdata[0]?.radius) : ""
        );
        setPositionCercle(dataout);
      }
      if (newdata[0].type == "polygon") {
        setPostionPolygon(newdata[0]?.drowvalue);
      }
      // setRegionCord([
      //   Number(newdata[0].slot_gps_latitude),
      //   Number(newdata[0].slot_gps_longitude),
      // ]);
      if (newdata[0].slot_gps_latitude && newdata[0].slot_gps_longitude) {
        setCenterDragged([
          Number(newdata[0].slot_gps_latitude),
          Number(newdata[0].slot_gps_longitude),
        ]);
      }
    }
  };

  //Export
  function getExportChat() {
    simplePostCall(
      ApiConfig.PARKING_POINT_OF_INTERST,
      JSON.stringify({ ...searchData })
    )
      .then((data) => {
        if (data.result) {
          pdfFormat(data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {});
  }

  const pdfFormat = (pdfData) => {
    // let chatsData = await getExportChat()
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Parking Station";
    const headers = [["Sr. No.", "Slot Name", "Slot Code", "Address"]];
    var data = [];

    pdfData.map((item, index) => {
      data.push([index + 1, item.slot_name, item.slot_code, item.address]);
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
  const downLoadExcelSheet = () => {
    let newRequestBody = JSON.stringify({
      ...searchData,
      format: "Excel",
    });
    simplePostCall(ApiConfig.POINT_OF_INTEREST_EXPORT, newRequestBody)
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
        <div id="cx-wrapper" className="Parking_Slot">
          <div className="upperMainSet">
            <div className="row">
              <div className="col-md-8 form_input_main">
                <div className="row PMINg">
                  <div className="col-md-4 col-sm-12">
                    <div className="weekCounter">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("Slot Name")}
                        value={searchData.slotName}
                        onChange={(e) => {
                          setCardDetails([]);
                          setPage(1);

                          setSearchData({
                            ...searchData,
                            slotName: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="weekCounter">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("Slot Code")}
                        value={searchData.slotCode}
                        onChange={(e) => {
                          setCardDetails([]);
                          setPage(1);
                          setSearchData({
                            ...searchData,
                            slotCode: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="weekCounter">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("Address")}
                        value={searchData.address}
                        onChange={(e) => {
                          setCardDetails([]);
                          setPage(1);
                          setSearchData({
                            ...searchData,
                            address: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mainCol4">
                <div className="leftSideSec">
                  {userRole === "customer" ||
                  (accessRights &&
                    accessRights?.rights_manage_parking_station) ? (
                    <div
                      onClick={() => {
                        navigation("/AddParkingSlot");
                        setPostionPolygon([]);
                        setPositionRectangle([]);
                        setPositionCercle([]);
                        setPostionRadius("");
                      }}
                      className="addParkBtn"
                    >
                      <button>+ {t("Add Parking Slot")}</button>
                    </div>
                  ) : (
                    <></>
                  )}

                  {/* <Link to="#">
                      <div className="inconMain left-margin me-0">
                        <img
                          onClick={() => getExportChat()}
                          src={Share}
                          alt=""
                        />
                      </div>
                    </Link> */}
                  <div className="md_dropdown">
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
            </div>

            <div className="row body-content" style={{ height: "100%" }}>
              <div className="col-md-8">
                <div className="mainMape">
                  {googleMap === "leaflet" && (
                    <MapComponent
                      componentId={"parkingView"}
                      cardDetails={cardDetails}
                    />
                  )}
                  {googleMap === "googleMap" && <GoogleMapComponent />}

                  {tabClicked && singleCardDetails && (
                    <div
                      className="innerMapDetails"
                      id="model-responsive-on-map"
                    >
                      <div className="headingDetails">
                        <div className="headingTxt">
                          <p className="heading">
                            {t("Parking Station Details")}
                          </p>
                        </div>

                        <div className="customer-option">
                          <div
                            onClick={() => {
                              setMapZoomValue(7);
                              setTabClicked(false);
                              setPostionPolygon([]);
                              setPositionRectangle([]);
                              setPositionCercle([]);
                              setPostionRadius("");
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="#9c4900"
                              class="bi bi-x"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                          </div>

                          {userRole === "customer" ||
                          (accessRights &&
                            accessRights?.rights_manage_parking_station) ? (
                            <Dropdown>
                              <Dropdown.Toggle id="dropdown-basic">
                                <img src={option} alt="" />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link
                                    to={
                                      "/AddParkingSlot/" +
                                      singleCardDetails?.slot_id
                                    }
                                    className="d-block"
                                  >
                                    {t("Edit")}
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link
                                    tp="#"
                                    onClick={() => {
                                      setShow(true);
                                      setDeletedId(singleCardDetails?.slot_id);
                                    }}
                                    className="d-block"
                                  >
                                    {t("Delete")}
                                  </Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          ) : null}
                        </div>
                      </div>
                      <div className="innerCOntent">
                        <div className="row">
                          {/* <div className='col-lg-3 col-md-4 col-sm-5 dividedCol form_input_main'>
                            <p className='paraHead'>{t('Customer Name')}</p>
                            <p className='paraVal'>
                              {singleCardDetails?.slot_name}
                            </p>
                          </div> */}
                          <div className="col-lg-3 col-md-4 col-sm-5 dividedCol form_input_main">
                            <p className="paraHead">{t("Slot Name")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.slot_name}
                            </p>
                          </div>
                          <div className="col-lg-3 col-md-4 col-sm-5 dividedCol form_input_main">
                            <p className="paraHead">{t("Slot ID")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.slot_id}
                            </p>
                          </div>
                          <div className="col-lg-3 col-md-4 col-sm-5 dividedCol form_input_main">
                            <p className="paraHead">{t("Slot Code")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.slot_code}
                            </p>
                          </div>
                          <div className="col-md-12 dividedCol form_input_main">
                            <p className="paraHead">{t("Address")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.address}
                            </p>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6 dividedCol form_input_main">
                            <p className="paraHead">
                              {t("Slot GPS Lattitude")}
                            </p>
                            <p className="paraVal">
                              {singleCardDetails?.slot_gps_latitude}
                            </p>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6 dividedCol form_input_main">
                            <p className="paraHead">
                              {t("Slot GPS Longitude")}
                            </p>
                            <p className="paraVal">
                              {singleCardDetails?.slot_gps_longitude}
                            </p>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6 dividedCol form_input_main">
                            <p className="paraHead">{t("Slot Status")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.slot_status}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {navClicked && (
                    <div className="innerMapDetails">
                      <div className="headingDetails">
                        <div className="headingTxt">
                          <p className="heading">
                            {t("Parking Station Details")}
                          </p>
                        </div>
                        <div className="AddParkBtn">
                          <Link to="/AddParkingSlot" className="addLink">
                            <button> + {t("Add Parking Station")}</button>
                          </Link>
                        </div>
                      </div>
                      <div className="innerCOntent">
                        <div className="row">
                          <div className="col-md-12 dividedCol">
                            <p className="paraHead">{t("Address")}</p>
                            <p className="paraVal">
                              SGRA 82, Shanti Gardens Third St, Thrimoorthy
                              Nagar, Kamaleshwaram, Thiruvananthapuram, Kerala
                              695009, India
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* {loader ? (
                <Loader />
              ) : ( */}
              <div className="col-lg-4 col-md-12">
                <div className="tabsCon">
                  <Tab.Container
                    id="left-tabs-example"
                    className="td-tab-wrapper"
                    defaultActiveKey="0"
                  >
                    <Nav
                      variant="pills"
                      className="td-nav"
                      id="InnerTabNew_Two"
                      // when we add suggest tab comment inline stly
                    >
                      <Nav.Item className="td-tab" style={{ width: "100%" }}>
                        <Nav.Link
                          className="td-link"
                          eventKey="0"
                          onClick={() => {
                            setTabApi("all");
                            getFilterParkingSlot(1, "All");
                          }}
                        >
                          {t("All")}
                        </Nav.Link>
                      </Nav.Item>
                      {/* as per haris sir we  we do later now comment it suggest  we can show according to vehiicle parked at nmax time  */}
                      {/* <Nav.Item className="td-tab">
                        <Nav.Link
                          className="td-link"
                          eventKey="1"
                          onClick={() => {
                            setTabApi("all");
                            getFilterParkingSlot(1, "suggest");
                          }}
                        >
                          {t("Suggested")}
                        </Nav.Link>
                      </Nav.Item> */}
                    </Nav>

                    <Col sm={12} className="">
                      <Tab.Content
                        onScroll={(e) => {
                          const bottom =
                            e.target.scrollHeight - e.target.scrollTop ===
                            e.target.clientHeight;
                          if (bottom && !last_page) {
                            setPage(page + 1);
                            getFilterParkingSlot(page + 1);
                          }
                        }}
                      >
                        <Tab.Pane eventKey="0">
                          {loader ? (
                            <Loader />
                          ) : (
                            <div id="navPills">
                              <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                  {cardDetails && cardDetails?.length > 0 ? (
                                    cardDetails.map((item, index) => {
                                      return (
                                        <Nav.Link
                                          eventKey={index + 1}
                                          onClick={() => {
                                            // setMapZoomValue(16);
                                            setTabClicked(true);
                                            setPostionPolygon([]);
                                            setPositionRectangle([]);
                                            setPositionCercle([]);
                                            setPostionRadius("");

                                            getSingleLIstParkingSlot(
                                              item.slot_id
                                            );

                                            // setRegionCord([
                                            //   Number(item.slot_gps_latitude),

                                            //   Number(item.slot_gps_longitude),
                                            // ]);
                                            // setMarker([
                                            //   Number(item.slot_gps_latitude),

                                            //   Number(item.slot_gps_longitude)
                                            // ]);
                                            setSingleCardDetails(item);
                                            setNavClicked(false);
                                          }}
                                        >
                                          <div className="AllFlexNav">
                                            <div>
                                              <p className="paraNav">
                                                {t("Slot Name Taleeb")}
                                              </p>
                                              <p className="paraNavTxt">
                                                {item.slot_name}
                                              </p>
                                            </div>
                                            <div>
                                              <p className="paraNav">
                                                {t("Slot Code Taleeb")}
                                              </p>
                                              <p className="paraNavTxt">
                                                {" "}
                                                {item.slot_code}
                                              </p>
                                            </div>
                                            <div>
                                              <p className="paraNav">
                                                {t("Address Taleeb")}
                                              </p>
                                              <p className="paraNavTxt">
                                                {item.address}
                                              </p>
                                            </div>
                                          </div>
                                        </Nav.Link>
                                      );
                                    })
                                  ) : (
                                    <NoDataComp />
                                  )}
                                  <hr />
                                </Nav.Item>
                              </Nav>
                              {cardDetails.length > 0 && (
                                <Pagenation
                                  length={cardDetails?.length}
                                  total={total_count}
                                />
                              )}
                            </div>
                          )}
                        </Tab.Pane>
                        <Tab.Pane eventKey="1">
                          <Nav
                            variant="pills"
                            className="flex-column"
                            id="navPills"
                          >
                            <Nav.Item
                              onClick={() => {
                                setTabClicked(false);
                                setNavClicked(true);
                              }}
                            >
                              <Nav.Link eventKey="first">
                                <div className="row">
                                  <div className="col-md-12 parkingSLotCOl">
                                    <p className="paraNav">{t("Address")}</p>
                                    <p className="paraNavTxt">
                                      Vishrantwadi, Kalas Road, Pune,
                                      Maharashtra.
                                    </p>
                                  </div>
                                </div>
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Tab.Container>
                </div>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delete Modal Start */}
      <Modal show={show} onHide={handleClose} centered className="common-model">
        <Modal.Header closeButton>
          <Modal.Title>{t("Delete Parking Station")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("Are you sure you want to delete this parking Station")} ?
        </Modal.Body>
        <Modal.Footer className="pop-up-modal-footer btn-wrapper">
          <div class="btn-wrapper">
            <button className="cx-btn-1" onClick={handleClose}>
              {t("Cancel")}
            </button>
            <button
              className="cx-btn-2"
              onClick={() => {
                ParkingSlotDelete();
                handleClose();
              }}
            >
              {t("Yes")}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal End */}
    </>
  );
};

export default ParkingSlot;

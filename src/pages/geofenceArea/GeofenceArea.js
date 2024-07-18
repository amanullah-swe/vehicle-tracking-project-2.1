import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import Logout from "../../assets/images/import_icon.svg";
import Share from "../../assets/images/XMLID_1022_.svg";
import blue_box from "../../assets/images/blue_box.svg";
import green_box from "../../assets/images/Redcercle.svg";
import idle from "../../assets/images/bluePolygon.svg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Nav from "react-bootstrap/Nav";
import option from "../../assets/images/option-three-dot.svg";
import { Dropdown, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import MapComponent from "../../sharedComponent/MapComponent";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import ApiConfig from "../../api/ApiConfig";
import { simpleDeleteCall, simplePostCall } from "../../api/ApiServices";
import Pagenation from "../../sharedComponent/Pagenation";
import Loader from "../../sharedComponent/Loader";
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
const GeofenceArea = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;

  const {
    googleMap,
    sidebar,
    useDebounce,
    setMarker,
    setRegionCord,
    recordsPerPage,
    setPositionCercle,
    positionRectangle,
    setPositionRectangle,
    setPostionRadius,
    setPostionPolygon,
    postionPolygon,
    multiCercledata,
    setMultiCercledata,
    mapLayer,
    mapZoomValue,
    setMapZoomValue,
  } = useContext(AppContext);
  const [loader, setLoader] = useState(false);
  const [searchData, setSearchData] = useState({
    area_name: "",
    area_address: "",
    area_latitude: "",
  });

  const [tabClicked, setTabClicked] = useState(false);
  const [navClicked, setNavClicked] = useState(false);
  const { t, i18n } = useTranslation();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [isView, setIsView] = useState(false);
  const [cardDetails, setCardDetails] = useState([]);

  const [deletedId, setDeletedId] = useState("");
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
    getFilterGeofance(page);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    let newCardData = [...cardDetails];
    let polygon =
      newCardData.length > 0 &&
      newCardData.filter((ele) => ele.type === "polygon");
    let newpoly =
      polygon &&
      polygon.map((ele) => (ele.drowvalue[0][0] != null ? ele.drowvalue : []));
    let rectangle =
      newCardData.length > 0 &&
      newCardData.filter((ele) => ele.type === "rectangle");
    let newrectangle =
      rectangle &&
      rectangle.map((ele) =>
        ele.drowvalue[0][0] != null ? ele.drowvalue : []
      );
    let circle =
      newCardData.length > 0 &&
      newCardData.filter((ele) => ele.type === "circle");
    let NewCercle =
      circle &&
      circle.map((ele) => {
        return { circleData: ele.drowvalue, radiusData: Number(ele.radius) };
      });
    if (polygon.length > 0) {
      setPostionPolygon([newpoly]);
    }
    if (rectangle.length > 0) {
      setPositionRectangle([newrectangle]);
    }
    if (NewCercle.length > 0) {
      setMultiCercledata(NewCercle);
    }
  }, [cardDetails]);

  const getFilterGeofance = (page) => {
    page == 1 && setLoader(true);
    simplePostCall(
      ApiConfig.GEOFANCE_AREA_LISTS,
      JSON.stringify({ ...searchData, page: page, page_limit: recordsPerPage })
    )
      .then((res) => {
        if (res.result == true) {
          // if (searchData.area_address !== "") {
          //   setCardDetails(res.data);
          // } else if (searchData.area_latitude !== "") {
          //   setCardDetails(res.data);
          // } else if (searchData.area_name !== "") {
          //   setCardDetails(res.data);
          // } else {
          // }
          setCardDetails([...cardDetails, ...res.data]);
          setlast_page(res.last_page);
          setTotal_count(res.total_count);
        } else {
          setCardDetails(res.data ? res.data : []);
        }
      })
      .catch((err) => {
        console.log("api response", err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const geofanceDelete = () => {
    handleClose();
    simpleDeleteCall(
      ApiConfig.GEOFANCE_AREA_DELETE,
      JSON.stringify({ area_id: deletedId })
    )
      .then((res) => {
        if (res.result === true) {
          setPostionPolygon([]);
          setPositionRectangle([]);
          setPositionCercle([]);
          setPostionRadius("");
          setTabClicked(false);
          notifySuccess(res.message);
          let filteredData =
            cardDetails &&
            cardDetails.filter((item) => {
              return item.area_id !== deletedId;
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

  const filterGeoFanceData = (id) => {
    const newdata = cardDetails.filter((ele) => ele.area_id === id);

    if (newdata[0]) {
      setMapZoomValue(7);

      // if (newdata && newdata[0].type == "rectangle") {
      //   setPositionRectangle(newdata[0].drowvalue);
      // }
      // if (newdata && newdata[0].type == "circle") {
      //   let dataout = newdata[0]?.drowvalue;
      //   setPostionRadius(
      //     Number(newdata[0]?.radius) ? Number(newdata[0]?.radius) : ""
      //   );
      //   setPositionCercle(dataout);
      // }
      // if (newdata[0].type == "polygon") {
      //   setPostionPolygon(newdata[0].drowvalue);
      // }
      setRegionCord([
        Number(newdata[0].area_latitude),
        Number(newdata[0].area_longitude),
      ]);
    }
  };

  //Export
  function getExportChat() {
    let newRequestBody = JSON.stringify({
      ...searchData,
    });
    simplePostCall(ApiConfig.GEOFANCE_AREA_LIST_EXPORT, newRequestBody)
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
    const title = "Geofence Areas";
    const headers = [["Sr. No.", "Location Name", "Description"]];
    var data = [];

    pdfData.map((item, index) => {
      data.push([index + 1, item.area_name, item.area_address]);
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
  // excel
  const downLoadExcelSheet = () => {
    let newRequestBody = JSON.stringify({
      ...searchData,
      format: "Excel",
    });
    simplePostCall(ApiConfig.GEOFANCE_AREA_LIST_EXPORT, newRequestBody)
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
        <div id="cx-wrapper" className="Point_Of_Intrest GeofenceArea">
          <div className="upperMainSet">
            <div className="row">
              <div className="col-md-8 form_input_main">
                <div className="row PMINg">
                  <div className="col-md-3">
                    <div className="weekCounter">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("Location Name")}
                        onChange={(e) => {
                          {
                            setCardDetails([]);
                            setPage(1);
                            setSearchData({
                              ...searchData,
                              area_name: e.target.value,
                            });
                          }
                        }}
                        // name="area_name"
                        // onChange={handleChange}
                        value={searchData.area_name}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-4">
                    <div className="weekCounter">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("Latitude, Longitude")}
                        onChange={(e) => {
                          setCardDetails([]);
                          setPage(1);
                          setSearchData({
                            ...searchData,
                            area_latitude: e.target.value,
                          });
                        }}
                        // name="area_name"
                        // onChange={handleChange}
                        value={searchData.area_latitude}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-4">
                    <div className="weekCounter">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("Address")}
                        onChange={(e) => {
                          setCardDetails([]);
                          setPage(1);
                          setSearchData({
                            ...searchData,
                            area_address: e.target.value,
                          });
                        }}
                        // name="area_name"
                        // onChange={handleChange}
                        value={searchData.area_address}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mainCol4">
                <div className="leftSideSec">
                  {userRole === "customer" ||
                  (accessRights &&
                    accessRights?.rights_manage_geofence_area) ? (
                    <Link to="/AddGeofenceArea" className="addParkBtn">
                      <button> + {t("Add Geofence")}</button>
                    </Link>
                  ) : null}

                  {/* <Link to="#" className="addParkBtn">
                    <button>{t("Sync Geofence")}</button>
                  </Link> */}
                  {/* <Link to="#">
                      <div className="inconMain">
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
                      componentId={"geofanceView"}
                      cardDetails={cardDetails}
                    />
                  )}
                  {googleMap === "googleMap" && <GoogleMapComponent />}
                  {tabClicked && (
                    <div
                      className="innerMapDetails"
                      id="model-responsive-on-map"
                    >
                      <div className="headingDetails">
                        <div className="headingTxt">
                          <p className="heading">{t("Geofence Details")}</p>
                        </div>
                        <div className="customer-option">
                          <div
                            onClick={() => {
                              setTabClicked(false);
                              setMapZoomValue(7);
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
                          <Dropdown className={isView ? `d-none` : ""}>
                            <Dropdown.Toggle id="dropdown-basic">
                              <img src={option} alt="" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {(userRole === "customer" ||
                                accessRights?.rights_view_geofence_area) && (
                                <Dropdown.Item>
                                  <Link
                                    to="#"
                                    onClick={() => setIsView(true)}
                                    className="d-block"
                                  >
                                    {t("View")}
                                  </Link>
                                </Dropdown.Item>
                              )}
                              {userRole === "customer" ||
                              accessRights?.rights_manage_geofence_area ? (
                                <>
                                  <Dropdown.Item>
                                    <Link
                                      to={
                                        "/AddGeofenceArea/" +
                                        singleCardDetails?.area_id
                                      }
                                      className="d-block"
                                    >
                                      {t("Edit")}
                                    </Link>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        setShow(true);
                                        setDeletedId(
                                          singleCardDetails?.area_id
                                        );
                                      }}
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
                      <div className="innerCOntent">
                        <div className="row">
                          <div className="col-md-4 dividedCol form_input_main">
                            <p className="paraHead">{t("Location Name")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.area_name}
                            </p>
                          </div>
                          <div className="col-md-4 dividedCol form_input_main">
                            <p className="paraHead">{t("Latitude")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.area_latitude}
                            </p>
                          </div>
                          <div className="col-md-4 dividedCol form_input_main">
                            <p className="paraHead">{t("Longitude")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.area_longitude}
                            </p>
                          </div>
                          <div className="col-md-12 dividedCol form_input_main">
                            <p className="paraHead">{t("Address")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.area_address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    className="col-lg-6 d-flex justify-content-between "
                    style={{ marginTop: "5px", marginBottom: "-20px" }}
                  >
                    <div className="notific">
                      <img
                        src={green_box}
                        alt=""
                        style={{ marginRight: "5px" }}
                      />
                      <label className="new-txt-clr">{t("Circle")}</label>
                    </div>
                    <div className="notific">
                      <img
                        src={blue_box}
                        alt=""
                        className=""
                        style={{ marginRight: "5px" }}
                      />
                      <label className="new-txt-clr">{t("Rectangle")}</label>
                    </div>
                    <div className="notific">
                      <img src={idle} alt="" style={{ marginRight: "5px" }} />
                      <label className="new-txt-clr">{t("Polygon")}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="tabsCon">
                  {isView ? (
                    <div className="addGeolog" id="customBorder_bottom">
                      <p>{t("Area Details")}</p>
                      {userRole === "customer" ||
                      (accessRights &&
                        accessRights?.rights_manage_geofence_area) ? (
                        <Link to="/AddGeofenceArea" className="innerGroBtn">
                          <button>+ {t("Add New")}</button>
                        </Link>
                      ) : null}
                    </div>
                  ) : (
                    <div className="headGeo">
                      <p>{t("Geofence Areas")}</p>
                    </div>
                  )}
                  {loader ? (
                    <Loader />
                  ) : (
                    <Nav
                      variant="pills"
                      id="navPills"
                      onScroll={(e) => {
                        const bottom =
                          e.target.scrollHeight - e.target.scrollTop ===
                          e.target.clientHeight;

                        if (bottom && !last_page) {
                          setPage(page + 1);
                          getFilterGeofance(page + 1);
                        }
                      }}
                    >
                      <Nav.Item>
                        <Nav.Item>
                          {cardDetails && cardDetails?.length > 0 ? (
                            cardDetails?.map((item, index) => {
                              return (
                                <Nav.Link
                                  eventKey={index}
                                  onClick={() => {
                                    setTabClicked(true);
                                    setMapZoomValue(9);
                                    setIsView(false);
                                    // setPostionPolygon([]);
                                    // setPositionRectangle([]);
                                    // setPositionCercle([]);
                                    // setPostionRadius("");
                                    filterGeoFanceData(item.area_id);
                                    setSingleCardDetails(item);
                                  }}
                                >
                                  <div className="AllFlexNav">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <p className="paraNav">
                                          {t("Location Name")}
                                        </p>
                                        <p className="paraNavTxt">
                                          {item?.area_name}
                                        </p>
                                      </div>
                                      <div className="col-md-6">
                                        <p className="paraNav">
                                          {t("Address")}
                                        </p>
                                        <p className="paraNavTxt">
                                          {item?.area_address}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Nav.Link>
                              );
                            })
                          ) : (
                            <NoDataComp />
                          )}
                        </Nav.Item>
                      </Nav.Item>
                      {cardDetails?.length > 0 && (
                        <Pagenation
                          length={cardDetails?.length}
                          total={total_count}
                        />
                      )}
                    </Nav>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delete Modal Start */}
      <Modal show={show} onHide={handleClose} centered className="common-model">
        <Modal.Header closeButton>
          <Modal.Title>{t("Delete Geofence Area")} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("Are you sure you want to delete this Geofence Area location")} ?
        </Modal.Body>
        <Modal.Footer className="pop-up-modal-footer">
          <div class="btn-wrapper">
            <button className="cx-btn-1" onClick={handleClose}>
              {t("Cancel")}
            </button>
            <button className="cx-btn-2" onClick={geofanceDelete}>
              {t("Yes")}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal End */}
    </>
  );
};

export default GeofenceArea;

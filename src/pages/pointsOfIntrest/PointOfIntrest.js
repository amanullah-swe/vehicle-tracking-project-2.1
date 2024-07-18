import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import Logout from "../../assets/images/import_icon.svg";
import Share from "../../assets/images/XMLID_1022_.svg";
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
const PointOfIntrest = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;

  const {
    sidebar,
    useDebounce,
    setMarker,
    setRegionCord,
    recordsPerPage,
    mapZoomValue,
    setMapZoomValue,
    googleMap,
  } = useContext(AppContext);

  const [last_page, setlast_page] = useState(false);
  // last_page
  const [page, setPage] = useState(1);
  const [total_count, setTotal_count] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tabClicked, setTabClicked] = useState(false);
  const [navClicked, setNavClicked] = useState(false);
  const { t, i18n } = useTranslation();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [deletedId, setDeletedId] = useState("");
  const [cardDetails, setCardDetails] = useState([]);
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
  const [pageNumber, setPageNumber] = useState(1);
  const [searchData, setSearchData] = useState({
    location_name: "",
    location_address: "",
    location_latitude: "",
  });
  const debouncedSearchTerm = useDebounce(searchData, 500);
  useEffect(() => {
    getFilterPointofintrest(1);
  }, [debouncedSearchTerm]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const searchDataDatacopy = { ...searchData };
    searchDataDatacopy[name] = value;
    setSearchData(searchDataDatacopy);
  };

  const getFilterPointofintrest = (page) => {
    page == 1 && setLoading(true);
    simplePostCall(
      ApiConfig.POINT_OF_INTEREST_LISTS,
      JSON.stringify({
        ...searchData,
        location_longitude: searchData?.location_latitude,
        page: page,
        page_limit: recordsPerPage,
      })
    )
      .then((res) => {
        if (res.result === true) {
          // if (searchData.location_name !== "") {
          //   setCardDetails(res.data);
          // } else if (searchData.location_address !== "") {
          //   setCardDetails(res.data);
          // } else if (searchData.location_latitude !== "") {
          //   setCardDetails(res.data);
          // } else {
          // }
          setCardDetails([...cardDetails, ...res.data]);
          setlast_page(res.last_page);
          setTotal_count(res.total_count);
        } else {
          setCardDetails([]);
        }
      })
      .catch((err) => {
        console.log("Error response,", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const PointofIntrestDelete = () => {
    setCardDetails([]);
    handleClose();
    simpleDeleteCall(
      ApiConfig.POINT_OF_INTEREST_DELETE,
      JSON.stringify({ location_id: deletedId })
    )
      .then((res) => {
        if (res.result === true) {
          setTabClicked(false);
          notifySuccess(res.message);
          let filteredData =
            cardDetails &&
            cardDetails.filter((item) => {
              return item.location_id !== deletedId;
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

  //Export
  function getExportChat() {
    let newRequestBody = JSON.stringify({
      ...searchData,
    });
    simplePostCall(ApiConfig.POINT_OF_INTEREST_EXPORT, newRequestBody)
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
    const title = "Point Of Interest";
    const headers = [["Sr. No.", "Location Name", "Description"]];
    var data = [];

    pdfData.map((item, index) => {
      data.push([index + 1, item.location_name, item.location_address]);
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
        <div id="cx-wrapper" className="Point_Of_Intrest">
          <div className="upperMainSet">
            <div className="row ">
              <div className="col-md-8 form_input_main">
                <div className="row PMINg">
                  <div className="col-md-4 col-sm-12">
                    <div className="weekCounter">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("Location Name")}
                        onChange={(e) => {
                          setCardDetails([]);
                          setPage(1);
                          setSearchData({
                            ...searchData,
                            location_name: e.target.value,
                          });
                        }}
                        // name="area_name"
                        // onChange={handleChange}
                        value={searchData?.location_name}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
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
                            location_latitude: e.target.value.trim(),
                          });
                        }}
                        // name="area_latitude"
                        // onChange={handleChange}
                        value={searchData.location_latitude}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
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
                            location_address: e.target.value,
                          });
                        }}
                        // name="area_address"
                        // onChange={handleChange}
                        value={searchData.location_address}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mainCol4">
                <div className="leftSideSec">
                  {userRole === "customer" ||
                  (accessRights &&
                    accessRights?.rights_manage_point_of_interest) ? (
                    <Link to="/AddPointOfInterest" className="addParkBtn">
                      <button>+ {t("Add Location")}</button>
                    </Link>
                  ) : (
                    <></>
                  )}

                  {/* <Link to="#">
                      <div className="inconMain m-0">
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
                      cardDetails={cardDetails}
                      componentId={"pointOfView"}
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
                          <p className="heading">
                            {t("Point Of Interest Details")}
                          </p>
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
                          {userRole === "customer" ||
                          (accessRights &&
                            accessRights?.rights_manage_point_of_interest) ? (
                            <Dropdown>
                              <Dropdown.Toggle id="dropdown-basic">
                                <img src={option} alt="" />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link
                                    to={
                                      "/AddPointOfInterest/" +
                                      singleCardDetails?.location_id
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
                                        singleCardDetails?.location_id
                                      );
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
                          <div className="col-md-4 dividedCol form_input_main">
                            <p className="paraHead">{t("Location Name")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.location_name}
                            </p>
                          </div>
                          <div className="col-md-4 dividedCol form_input_main">
                            <p className="paraHead">{t("Latitude")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.location_latitude}
                            </p>
                          </div>
                          <div className="col-md-4 dividedCol form_input_main">
                            <p className="paraHead">{t("Longitude")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.location_longitude}
                            </p>
                          </div>
                          <div className="col-md-12 dividedCol form_input_main">
                            <p className="paraHead">{t("Address")}</p>
                            <p className="paraVal">
                              {singleCardDetails?.location_address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="tabsCon">
                  {loading ? (
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
                          getFilterPointofintrest(page + 1);
                        }
                      }}
                    >
                      <Nav.Item>
                        {cardDetails && cardDetails.length > 0 ? (
                          cardDetails?.map((item, index) => {
                            return (
                              <Nav.Link
                                eventKey={index}
                                onClick={() => {
                                  setTabClicked(true);
                                  setMapZoomValue(10);
                                  setRegionCord([
                                    item?.location_latitude
                                      ? item?.location_latitude
                                      : 28.25,
                                    item.location_longitude
                                      ? item.location_longitude
                                      : 75.25,
                                  ]);
                                  // setMarker([
                                  //   item?.location_latitude? item?.location_latitude:""
                                  //   ,
                                  //   item.location_longitude? item.location_longitude:""

                                  // ]);
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
                                        {item.location_name}
                                      </p>
                                    </div>
                                    <div className="col-md-6">
                                      <p className="paraNav">{t("Address")}</p>
                                      <p className="paraNavTxt">
                                        {item.location_address}
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
                      {cardDetails?.length > 0 && (
                        <Pagenation
                          length={cardDetails.length}
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
          <Modal.Title>{t("Delete Location")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("Are you sure you want to delete this Location")} ?
        </Modal.Body>
        <Modal.Footer className="pop-up-modal-footer">
          <div class="btn-wrapper">
            <button className="cx-btn-1" onClick={handleClose}>
              {t("Cancel")}
            </button>
            <button className="cx-btn-2" onClick={PointofIntrestDelete}>
              {t("Yes")}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal End */}
    </>
  );
};

export default PointOfIntrest;

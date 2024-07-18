import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Form from "react-bootstrap/Form";
import DDlogo from "../../assets/images/DDlogo.png";
import whiteTrash from "../../assets/images/whiteTrash.svg";
import whiteHand from "../../assets/images/whiteHand.svg";
import whiteBox from "../../assets/images/whiteBox.svg";
import whiteBin from "../../assets/images/whiteBin.svg";
import green_box from "../../assets/images/green_box.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import MapComponent from "../../sharedComponent/MapComponent";
import { SearchFunction } from "../../sharedComponent/LeafletMap/SearchFunction";
import { simplePostCall } from "../../api/ApiServices";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import ApiConfig from "../../api/ApiConfig";
import ButtonLoader from "../../sharedComponent/ButtonLoader";
import { useTranslation } from "react-i18next";
import GoogleMapComponent from "../../sharedComponent/GoogleMap/GoogleMapComponent";

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const AddPointOfInterest = () => {
  const {
    googleMap,
    sidebar,
    place,
    regionCord,
    setRegionCord,
    setPlace,
    mapLayer,
    setMapLayer,
    mapRectangle,
    setMapRectangle,
    circle,
    setCircle,
    radius,
    setRadius,
    setDraggedName,
    draggedName,
    setPositionCercle,
    positionRectangle,
    setPositionRectangle,
    setPostionRadius,
    setPostionPolygon,
    getTransporatioData,
  } = useContext(AppContext);
  let paramID = useParams();
  const IdPointOfIntrestEdit = paramID.id;
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const { t, i18n } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      addPointIDataMapDetails(event);
    }

    setValidated(true);
  };

  const [pointIData, setPointIData] = useState({
    location_name: "",
  });

  const [loader, setLoader] = useState(false);
  const addPointIDataMapDetails = (e) => {
    e.preventDefault();
    setLoader(true);
    simplePostCall(
      IdPointOfIntrestEdit
        ? ApiConfig.POINT_OF_INTEREST_UPDATE
        : ApiConfig.POINT_OF_INTEREST_ADD,
      JSON.stringify({
        ...pointIData,
        location_address: place,
        drowvalue: [{ lat: regionCord[0], lng: regionCord[1] }],
        // location_latitude:,
        // location_longitude: regionCord[1],
        location_id: IdPointOfIntrestEdit,
        // mapLayer,
        // circle: circle,
        // radius: radius,
        // mapRectangle: mapRectangle,
      })
    )
      .then((res) => {
        if (res.result === true) {
          navigate("/PointOfIntrest");
          notifySuccess(res.message);
          setLoader(false);
        } else {
          notifyError(res?.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    if (IdPointOfIntrestEdit) {
      PointsingleData();
    }
    getTransporatioData();
  }, []);
  const PointsingleData = () => {
    simplePostCall(
      ApiConfig.POINT_OF_INTEREST_SINGLE_EDIT,
      JSON.stringify({ location_id: Number(IdPointOfIntrestEdit) })
    )
      .then((res) => {
        if (res?.result === true) {
          let result = res?.data[0];
          // let regionCordObj = [{lat: Number(result?.location_latitude),lng:Number(result?.location_longitude)}]
          //  setRegionCord(regionCordObj);
          setRegionCord([
            Number(result?.location_latitude),
            Number(result?.location_longitude),
          ]);
          setPlace(result?.location_address);
          setPointIData({
            location_name: result?.location_name,
          });
        }
      })
      .catch((error) => {
        console.log("api response", error);
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div id="cx-wrapper" className="AddPointOfInterest">
            <div className="main-master-wrapper">
              <div className="Heading">
                <p>
                  {IdPointOfIntrestEdit
                    ? `${t("Edit Location")}`
                    : `${t("Add Location")}`}
                </p>
              </div>
              <div className="innerInputsGen">
                <div className="row">
                  <div className="col-md-6 form_input_main ">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Location Name")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Location Name...")}
                        onChange={(e) =>
                          setPointIData({
                            ...pointIData,
                            location_name: e.target.value,
                          })
                        }
                        value={pointIData.location_name}
                      />
                      <Form.Control.Feedback type="invalid">
                     {t("Enter a Location Name")}   
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6 form_input_main ">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Location Address")}
                      </Form.Label>
                      {/* <Form.Control
                        required
                        type="text"
                         value={draggedName}
                        placeholder="Enter Location Address"
                      /> */}
                      <SearchFunction />
                      <Form.Control.Feedback type="invalid">
                      {t("Please Enter Location Address")}  
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-12 weekCounter form_input_main">
                    <div className="addParkingMap">
                      {googleMap === "leaflet" && (
                        <MapComponent componentId={"pointIntrestAdd"} />
                      )}
                      {googleMap === "googleMap" && <GoogleMapComponent />}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center btn-wrapper">
                  <div className="notific">
                    <img src={green_box} alt="" />
                    <label>{t("Transportation Coverage Area")}</label>
                  </div>
                  <div className="d-flex" style={{ marginTop: "40px" }}>
                    <button
                      type="button"
                      className="cx-btn-1"
                      onClick={() => {
                        navigate("/PointOfIntrest");
                      }}
                    >
                      {t("Cancel")}
                    </button>
                    <button
                      className="cx-btn-2"
                      disabled={loader ? true : false}
                    >
                      {loader ? (
                        <ButtonLoader />
                      ) : IdPointOfIntrestEdit ? (
                        `${t("Update")}`
                      ) : (
                        `${t("Submit")}`
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </motion.div>
    </>
  );
};

export default AddPointOfInterest;

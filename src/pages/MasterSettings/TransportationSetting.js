import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import blue_box from "../../assets/images/blue_box.svg";
import green_box from "../../assets/images/green_box.svg";
import idle from "../../assets/images/idle.svg";
import VectorHand from "../../assets/images/Vector6.svg";
import VectorBin from "../../assets/images/Vector7.svg";
import { useTranslation } from "react-i18next";
import Gcustomer from "../../assets/images/customer.svg";
import untracked from "../../assets/images/untracked.svg";
import { Link, useNavigate } from "react-router-dom";
import whiteTrash from "../../assets/images/whiteTrash.svg";
import whiteHand from "../../assets/images/whiteHand.svg";
import whiteBox from "../../assets/images/whiteBox.svg";
import whiteBin from "../../assets/images/whiteBin.svg";
import { motion } from "framer-motion";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import MapComponent from "../../sharedComponent/MapComponent";
import { simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const TransportationSetting = () => {
  const { t, i18n } = useTranslation();
  const {
    sidebar,
    setSidebar,
    Dark,
    setDark,
    mapLayer,
    errMsgMap,
    setErrMsgMap,
    layerTypeSend,
    mapLatLngData,
    setMapLayer,
    mapRectangle,
    setMapRectangle,
    circle,
    setCircle,
    radius,
    setRadiusDraw,
    setRadius,
    regionCord,
    setRegionCord,
    setMapZoomValue,
    getTransporatioData,
  } = useContext(AppContext);
  const navigation = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getTransporatioData();
  }, []);

  const mapValidation = () => {
    if (mapLatLngData.length === 0) {
      setErrMsgMap("You have to draw at least one geofence area ");
      return;
    } else {
      postTransporatioData();
    }
  };

  const postTransporatioData = () => {
    let Body;
    if (layerTypeSend === "circle") {
      Body = {
        drowradius: radius,
        drowtype: layerTypeSend,
        drowvalue: mapLatLngData,
      };
    } else {
      Body = {
        drowtype: layerTypeSend,
        drowvalue: mapLatLngData,
      };
    }
    setLoader(true);
    simplePostCall(ApiConfig.TRASPORTATION_ADD, JSON.stringify(Body))
      .then((res) => {
        setLoader(false);
        if (res.result === true) {
          setCircle([]);
          setMapRectangle([]);
          setMapLayer([]);
          setRadius("");
          getTransporatioData();
          notifySuccess("Geofence Updated Successfully..!");
          // notifySuccess(res.message);
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        console.log("api response", err);
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
        <div id="cx-wrapper" className="Transportation_Setting">
          {/* Main Heading icons */}

          {/* Map COntent */}
          <div className="transportMap">
            <div className="innerMap addParkingMap">
              <div className="">
                {errMsgMap.length > 0 && (
                  <span className="text-danger">{errMsgMap}</span>
                )}
                <MapComponent componentId={"transportation"} />
              </div>
            </div>
            <div className="belowContent">
              <div className="notific">
                <img src={green_box} alt="" />
                <label>{t("Transportation Coverage Area")}</label>
              </div>
              <div className="notific">
                <img src={blue_box} alt="" className="" />
                <label>{t("Geofence")}</label>
              </div>
              <div className="notific">
                <img src={idle} alt="" />
                <label>{t("Icon")}</label>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center btn-wrapper">
            {/* <button type="button"
             className="cx-btn-1">{t("Cancel")}</button> */}
            <button className="cx-btn-2" onClick={mapValidation}>
              {t("Submit")}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TransportationSetting;

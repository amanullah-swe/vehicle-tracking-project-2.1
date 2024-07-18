import React, { useState, useContext, useEffect, useRef } from "react";
import {  useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "../../assets/styles/main.scss";
import { motion } from "framer-motion";
import customer from "../../assets/images/customer.svg";
import running from "../../assets/images/running.svg";
import parked from "../../assets/images/parked.svg";
import untracked from "../../assets/images/untracked.svg";
import idle from "../../assets/images/idle.svg";
import MapComponent from "../../sharedComponent/MapComponent";
import { useTranslation } from "react-i18next";
import ApiConfig from "../../api/ApiConfig";
import {  simplePostCallShare } from "../../api/ApiServices";
import io from "socket.io-client";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const DashboardShare = () => {
  const { sidebar, customerData, googleMap } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const [mapBound, setMapBound] = useState(true);
  const { id } = useParams();
  let parts = id.split("&");
  let Auth = parts[1].split("=");
  let paramId = parts[0];
  let customerId = Auth[1];
  let timeZone=parts[2].split("=")[1].replace("-", "/")
 const [mapDataLive, setMapDataLive] = useState([]);
 let option = {
  timeout: 20000,
  }
const [connection, setConnection] = useState("")
useEffect(()=>{
  if(customerId){
  setConnection(io(`${ApiConfig.BASE_URL}?user_customer_id=${customerId}`,option))
  }
},[customerId])

 useEffect(() => {
    if(paramId &&timeZone&&connection){
       getVehicleDetails(paramId,timeZone)
    const dataSingle= { user_customer_id: customerId,imei:paramId ,timeZone:timeZone};
    connection && connection.emit('singleVehicle',dataSingle)
    connection && connection.on(`${paramId}`, (data) => {
      setMapDataLive(data)
       
      })
    }
     }, [paramId,timeZone,connection])

 const getVehicleDetails = (paramId,timeZone) => {
    simplePostCallShare(
      ApiConfig.GET_VEHICLE_SINGLE_API_TRACK,
      JSON.stringify({ vehicle_imei:paramId?paramId.toString():"" ,user_customer_id:customerId,timeZone:timeZone}),customerId
    )
      .then((res) => {
        if (res.result === true) {
          setMapDataLive(res?.data)
          // setSingleVehicleList(res.data);
        }else{
          setMapDataLive([])
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  return (
    <>
      <motion.div
        className={sidebar ? "" : ""}
        id=""
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
      >
        <div  className="dashboard_responsive dashboard_responsive2">
          <div className="main-dashboard-wrapper dashboard_share">
           
            <div className="dashboard-main-map">
              <div className="dashboard-inner-wrapper">
                <div className="map-wrapper left">
                  {googleMap === "leaflet" && (
                    <MapComponent
                      componentId={"dashBoardShare"}
                      mapBound={mapBound}
                      mapDataLive={mapDataLive}
                    />
                  )}

                  <div className="bottom-wrapper">
                    <div className="bottom-status">
                      <img src={customer} alt="" />
                      <span>
                        {t("Running")}
                        {/* TAleeb Running */}
                        </span>
                    </div>
                    <div className="bottom-status">
                      <img src={running} alt="" />
                      <span>{t("Parked")}</span>
                    </div>
                    <div className="bottom-status">
                      <img src={parked} alt="" />
                      <span>{t("Untracked")}</span>
                    </div>
                    <div className="bottom-status">
                      <img src={untracked} alt="" />
                      <span>{t("Idle")}</span>
                    </div>
                    <div className="bottom-status">
                      <img src={idle} alt="" />
                      <span>{t("Customer")}</span>
                    </div>
                  </div>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </>
  );
};

export default DashboardShare;

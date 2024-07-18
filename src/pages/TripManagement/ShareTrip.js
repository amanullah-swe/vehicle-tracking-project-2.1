import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {  useParams } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import step1 from "../../assets/images/step1.svg";
import step2 from "../../assets/images/step2.svg";
import laststep from "../../assets/images/laststep.svg";
import MapComponent from "../../sharedComponent/MapComponent";
import Gcustomer from "../../assets/images/comp_icon.svg";
import untracked from "../../assets/images/start_icon.svg";
import idle from "../../assets/images/end_icon.svg";
import ApiConfig from "../../api/ApiConfig";
import {
  simplePostCall,simpleGetCallNew, simplePostCallShare
} from "../../api/ApiServices";
import { AppContext } from "../../context/AppContext";
import { DateDDMMYYYY } from "../../sharedComponent/common";
import io from "socket.io-client";
import { ColorRing, ThreeCircles, FidgetSpinner } from "react-loader-spinner";
const ShareTrip = () => {
  const { t, i18n } = useTranslation();
  const { sidebar, loading, customerData, setLoading,} = useContext(AppContext);
  const [tripDetails, setTripDetails] = useState({});

  // const getTripDetailsSingle = () => {
  //   setLoading(true);
  //   simpleGetCall(ApiConfig.SHARE_TRIP + id )
  //     .then((res) => {
  //       if (res.result) {
  //         // setTripDetails(res.data);
  //         if (res.data.trip_start_latitude && res.data.trip_start_longitude)
  //         getLiveVehicleApi({
  //           user_customer_id:Number(customerId),
  //           vehicleId:81
  //           })

  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };


  const [liveVehicleDetails, setLiveVehicleDetails] = useState({});
  const [stopsData, setStopsData] = useState([
  ]);
  const [paramId, setParamId] = useState("");
  const [mapDataLive, setMapDataLive] = useState([]);
  const [mapModifiedData, setMapModifiedData] = useState({});
  const [stopList, setStopList] = useState([]);
  const [IsLoading, setIsLoading] = useState(true)
  // let parts = id.split("&");
  // let Auth = parts[1].split("=");
  // let paramId1 = parts[0];
  // let vehicleId = paramId1;
  // let customerId = Auth[1];
  //live data  with all dsetaials

  const { id } = useParams();
  let parts = id.split("&");
  let Auth = parts[1].split("=");
   let paramId1 = parts[0];
  let customerId = Auth[1];
  let timeZone=parts[2].split("=")[1].replace("-", "/")
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
    if (id) {
      getTripDetails();
      stopsByTripId();
    }
  }, [id]); 

  
  useEffect(() => {
    if(paramId &&timeZone&&connection){
    const dataSingle= { user_customer_id: customerId,imei:paramId ,timeZone:timeZone};
    connection && connection.emit('singleVehicle',dataSingle)
    connection && connection.on(`${paramId}`, (data) => {
      setMapDataLive(data[0])
       
      })
    }
     }, [paramId,timeZone,connection])
  const getTripDetails = () => {
    setLoading(true);
    simpleGetCallNew(ApiConfig.GET_TRIP_DETAILS +paramId1,customerId)
      .then((res) => {
        if (res.result) {
          setTripDetails(res.data);
          setMapModifiedData({
            vendor_warehouse_latitude: res.data?.trip_start_latitude,
            vendor_warehouse_longitude: res.data?.trip_start_longitude,
            dispatch_customer_address_latitude: res.data?.trip_end_latitude,
            dispatch_customer_address_longitude: res.data?.trip_end_longitude,
            vendor_warehouse_address: res.data?.trip_start_point,
            dispatch_customer_address_address: res.data?.trip_end_point,
          });
          let idData = res.data.vehicle_details[0]?.vehicle_imei;
          let idDataVehicle = res.data.vehicle_details[0]?.vehicle_id;
          setParamId(idData);
          getLiveVehicleApi({
            user_customer_id: Number(customerId),
            vehicleId: idDataVehicle,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
const stopsByTripId = () => {
  simplePostCallShare(
      ApiConfig.GET_STOP_LIST_BY_ID,
      JSON.stringify({ pickup_point_trip_id: paramId1}),customerId
    )
      .then((res) => {
        if (res.result) {
          setStopList(res.data);
          setStopsData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getLiveVehicleApi = (body) => {
    setLoading(true);
    simplePostCallShare(ApiConfig?.GET_DISPATCH_SINGLE_VEHICLE, JSON.stringify(body),customerId)
      .then((res) => {
        if (res?.result === true) {
           setIsLoading(false)
          setLiveVehicleDetails(res?.data[0]);
          setParamId(res.data[0].vehicle_imei);
        } else {
          setLiveVehicleDetails({});
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  
     // useEffect(() => {
  //   console.log("shareTrip",paramId,timeZone)
  //   if(paramId&&timeZone){
  //     const dataSingle= { user_customer_id: customerId,imei:paramId,timeZone:timeZone };
  //   socket && socket.emit('singleVehicle',dataSingle)
  //   socket && socket.on(`${paramId}`, (data) => {
  //     setLiveVehicleDetails(data[0])
       
  //     })
  //   }
   
  //   }, [paramId,timeZone])



  return (
    <>

     {IsLoading?
//      <div class="spinner-border text-success" role="status">
//   <span class="sr-only"></span>
// </div>
<div className="loader-wrapper">
<FidgetSpinner
  visible={IsLoading}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  ballColors={['#fc7700', '#fc7700', '#fc7700']}
  backgroundColor="#9c4900"
/>
    </div>
: <div id="sharePoint">
        <div className="main-master-wrapper form_input_main">
          {/* <div className="trip-details-wrapper">
            <p>{t("Trip Details")}</p>
            <Link to="#">
              <button className="end-trip-btn">{t("End Trip")}</button>
            </Link>
          </div> */}
          <div className="trip-details-timeline">
            <div className="row">
              <div className="col-lg-2">
                <div className="td-left-section">
                  <label htmlFor="">{t("Pick-Up Location")}</label>

                  <p>{tripDetails.trip_start_point}</p>
                  <p>
                    {t("Start Date & Time")} :
                    {DateDDMMYYYY(tripDetails.trip_date)}{" "}
                    {tripDetails.trip_start_time}
                  </p>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="td-middle-section">
                  <div class="horizontal timeline">
                    <div class="steps">
                      <div class="step">
                        <OverlayTrigger
                          rootClose={true}
                          trigger="hover"
                          key="bottom"
                          placement="bottom"
                          overlay={
                            <Popover
                              id="popover-positioned-bottom"
                              className="trip-popover"
                              style={{ width: "600px !important" }}
                            >
                              <Popover.Body className="tp-body">
                                <div className="trip-popover-wrapper">
                                  {t(" Package Dispatched.")}
                                </div>
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <img
                            src={step1}
                            alt=""
                            className=""
                            onClick={() => {}}
                          />
                        </OverlayTrigger>
                      </div>
                      {stopsData &&
                        stopsData.map((ele, index) => {
                          return (
                            <div class="step" key={index}>
                              <OverlayTrigger
                                rootClose={true}
                                trigger="hover"
                                key="top"
                                placement="top"
                                overlay={
                                  <Popover
                                    id="popover-positioned-bottom"
                                    className="trip-popover"
                                    style={{ width: "600px !important" }}
                                  >
                                    <Popover.Body className="tp-body">
                                      <div className="trip-popover-wrapper">
                                        {t(
                                          `Package Arrived at ${ele.pickup_point_name}`
                                        )}
                                      </div>
                                    </Popover.Body>
                                  </Popover>
                                }
                              >
                                <img
                                  src={step2}
                                  alt=""
                                  className=""
                                  onClick={() => {}}
                                />
                              </OverlayTrigger>
                            </div>
                          );
                        })}

                      <div class="step">
                        <OverlayTrigger
                          rootClose={true}
                          trigger="hover"
                          key="bottom"
                          placement="bottom"
                          overlay={
                            <Popover
                              id="popover-positioned-bottom"
                              className="trip-popover"
                              style={{ width: "600px !important" }}
                            >
                              <Popover.Body className="tp-body">
                                <div className="trip-popover-wrapper">
                                  {t("Package Recieved")}
                                </div>
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <img
                            src={laststep}
                            alt=""
                            className=""
                            onClick={() => {}}
                          />
                        </OverlayTrigger>
                      </div>
                    </div>

                    <div class="line"></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="td-right-section">
                  <label htmlFor="">{t("Drop Location")}</label>
                  {/* <p>{tripDetails.trip_end_point}</p>
                                    <p>
                                        {t("End Date & Time")} :
                                        {DateDDMMYYYY(tripDetails.trip_end_date)}{" "}
                                        {tripDetails.trip_end_time}
                                    </p> */}
                  <p>{tripDetails.trip_end_point}</p>
                  <p>
                    {t("End Date & Time")} :
                    {DateDDMMYYYY(tripDetails.trip_end_date)}{" "}
                    {tripDetails.trip_end_time}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="main-master-wrapper form_input_main">
              <div className="transportMap trip-map">
                <div className="innerMap">
                  <p>{t("Map Overview")}</p>
                  <MapComponent
                    tripDetails={tripDetails}
                    // componentId={"viewtrip"}

                    data={mapModifiedData}
                    componentId={"viewtrip"}
                    viewTripVehicle={liveVehicleDetails}
                    stoplist={stopList}
                    setStoplist={stopList}
                    moveStop={false}
                    stopsByTripId={stopsByTripId}
                    stopData={stopsData}
                    setStopData={stopsData}
                  />
                </div>
                <div className="belowContent">
                  <div className="notific">
                    <img src={Gcustomer} alt="" />
                    <label>{t("Company")}</label>
                  </div>
                  <div className="notific">
                    <img src={untracked} alt="" />
                    <label>{t("Start Point")}</label>
                  </div>
                  <div className="notific">
                    <img src={idle} alt="" />
                    <label>{t("End Point")}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
};

export default ShareTrip;

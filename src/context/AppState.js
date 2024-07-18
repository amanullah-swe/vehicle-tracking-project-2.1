import { useEffect, useMemo } from "react";
import { AppContext } from "./AppContext";
import React, { useState } from "react";
import io from "socket.io-client";
import {
  PostCallWithErrorResponse,
  simpleGetCall,
  simplePostCall,
} from "../api/ApiServices";
import ApiConfig from "../api/ApiConfig";
import { notificationMsg, notifyError } from "../sharedComponent/notify";
import { addonSetting, saveSetting } from "../store/loginSlice";
import { useDispatch } from "react-redux";
import { dispatchmodule } from "../sharedComponent/common";
import callingRingtone from "../assets/Audio/notification.mp3";
import useSound from "use-sound";
const AppState = (props) => {
  let option = {
    timeout: 20000,
    query: {
      UID: localStorage.getItem("id"),
    },
  };
  const dispach = useDispatch();
  const [backDrop, setBackDrop] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(
    localStorage.getItem("page_limit") ? localStorage.getItem("page_limit") : 10
  );
  const [PushNotificationStatus, setPushNotificationStatus] =
    useState("transport-manager");
  const [DateFormatConfig, setDateFormatConfig] = useState("dd-mm-yyyy");
  const [ConvertKilometersMiles, setConvertKilometersMiles] = useState("km");
  const [ConvertTemperatureUnit, setConvertTemperatureUnit] =
    useState("celsius");
  const [TimeFormat, setTimeFormat] = useState("24");
  const [imageUrl, set_imageUrl] = useState("");

  const [DynamicRole, setDynamicRole] = useState([]);
  const [add_new_order_ids, set_add_new_order_ids] = useState({})
  const [pickup_point_id, set_pickup_point_id] = useState("");
  const [pickup_point_trip_id, set_pickup_point_trip_id] = useState("");
  const [dispatch_package_id, set_dispatch_package_id] = useState("");
  const [VehicleStatus, setVehicleStatus] = useState("vehicle");
  const [is_last_row, set_is_last_row] = useState("");
  const [dispatchStatus, setDispatchStatus] = useState(
    localStorage.getItem("dispatchKey")
      ? localStorage.getItem("dispatchKey")
      : "pending"
  );
  const [UserRole, setUserRole] = useState(localStorage.getItem("dynamicRole"));
  const [UserRoleRoute, setUserRoleRoute] = useState(
    localStorage.getItem("dynamicRoleRoute")
  );
  const [DriverStatus, setDriverStatus] = useState("driver");
  const [EmailStatus, setEmailStatus] = useState("customer");
  const [customerData, setCustomerData] = useState({
    id: localStorage.getItem("id") ? localStorage.getItem("id") : null,
    lat: localStorage.getItem("lat") ? localStorage.getItem("lat") : null,
    long: localStorage.getItem("long") ? localStorage.getItem("long") : null,
    userdistance: localStorage.getItem("customer_distance_unit")
      ? localStorage.getItem("customer_distance_unit")
      : null,
    customer_first_name: localStorage.getItem("customer_first_name")
      ? localStorage.getItem("customer_first_name")
      : null,
    customer_role: localStorage.getItem("customer_role")
      ? localStorage.getItem("customer_role")
      : null,
    user_profile_pic: localStorage.getItem("user_profile_pic")
      ? localStorage.getItem("user_profile_pic")
      : null,
    customer_id: localStorage.getItem("customer_id")
      ? localStorage.getItem("customer_id")
      : null,
    api_key: localStorage.getItem("api_key")
      ? localStorage.getItem("api_key")
      : null,
    UserRole: localStorage.getItem("UserRole")
      ? localStorage.getItem("UserRole")
      : null,
    User_id: localStorage.getItem("User_id")
      ? localStorage.getItem("User_id")
      : null,
  });
  const [TransportId, setTransportId] = useState("");
  const [ViewId, setViewId] = useState(
    localStorage.getItem("orderId") ? localStorage.getItem("orderId") : null
  );
  const [googleMap, setGoogleMap] = useState("leaflet");
  const [infoOpen, setInfoOpen] = useState(false);
  const [customerProfile, setcustomerProfile] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  //map leaflet data
  const [mapLayer, setMapLayer] = useState([]);
  const [mapRectangle, setMapRectangle] = useState([]);
  const [circle, setCircle] = useState([]);
  const [radius, setRadius] = useState();
  const [radiusDraw, setRadiusDraw] = useState(0);
  const [regionCord, setRegionCord] = useState([
    Number(localStorage.getItem("lat"))
      ? Number(localStorage.getItem("lat"))
      : 0.0,
    Number(localStorage.getItem("long"))
      ? Number(localStorage.getItem("long"))
      : 0.0,
  ]);
  const [timeZone, setTimeZone] = useState(localStorage.getItem("timeZone"));
  const [linkState, setLinkState] = useState(null);
  const [LinkReport, setLinkReport] = useState(
    localStorage.getItem("ReportLink") ? localStorage.getItem("ReportLink") : ""
  );

  const [triggerMap, setTriggerMap] = useState(false);
  const [triggerMapBoundKey, setTriggerMapBoundKey] = useState("");
  const [ReportHader, setReportHader] = useState("");
  const [triggerMapBoundKeyRandom, setTriggerMapBoundKeyRandom] = useState(120);
  const [OptionDynamicDownload, setOptionDynamicDownload] = useState("");
  const [place, setPlace] = useState("");
  const [mapZoomValue, setMapZoomValue] = useState(10);
  const [draggedName, setDraggedName] = useState("");
  const [marker, setMarker] = useState([29.24, 75.254]);
  const [layerTypeSend, setLayerTypeSend] = useState("");
  const [editMerchantaddrees, seEditMerchantaddrees] = useState("");
  const [ChatCount, seChatCount] = useState(0);
  const [mapLatLngData, setMapLatLngData] = useState([]);
  const [errMsgMap, setErrMsgMap] = useState("");
  const [loading, setLoading] = useState(false);
  const [onlineCount, setOnlineCount] = useState("");
  const [centerDragged, setCenterDragged] = useState([]);
  //extra draw shape
  const [positionCercle, setPositionCercle] = useState([]);
  const [positionRectangle, setPositionRectangle] = useState([]);
  const [postionPolygon, setPostionPolygon] = useState([]);
  const [postionRadius, setPostionRadius] = useState("");
  const [recentChatdata, setRecentChatdata] = useState([]);
  const [multiCercledata, setMultiCercledata] = useState([]);
  const [userListRole, setUserListRole] = useState([]);
  const [CategoryId, setCategoryId] = useState("");
  const [routeIdEdit, setRouteIdEdit] = useState(false);
  const [updateKey, setupdateKey] = useState("");
  const [WeekenHide, setWeekenHide] = useState("Monday");
  const [Createcompose, setCreatecompose] = useState("All");
  const [invoice_details , set_invoice_details] = useState([]);
  const [brand, setBrand] = useState({});
  // const [help_setting_disable , set_help_setting_disable] = useState (null)
  const [help_setting_disable, set_help_setting_disable] = useState(
   /*  localStorage.getItem('help_setting_disable') === 'true' */ 0
  );
  const [membersArray, setMembersArray] = useState([])

 
  const [play, { stop }] = useSound(callingRingtone);
  // const [audio, setAudio] = useState(null);

  const ENDPOINT = ApiConfig.BASE_URL;
  function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
  }
   // Update localStorage whenever the state changes
  //  useEffect(() => {
  //   localStorage.setItem('help_setting_disable', help_setting_disable);
  // }, [help_setting_disable]);

/*   const playAudio = useMemo(
    () => () => {
      try {
        if (audio) {
          audio.currentTime = 0;
          // audio.removeEventListener("ended", handleAudioEnded);
          audio.play();
          // audio.addEventListener("ended", handleAudioEnded);
        }
      } catch (error) {
        console.log("Audio catch error");
      }
    },
    [audio]
  ); */



  const getTransporatioData = () => {
    setLoading(true);
    simplePostCall(ApiConfig.GET_CUSTOMER_GEOFANCE_AREA)
      .then((res) => {
        setLoading(false);
        if (res.result == true) {
          if (res.type == "circle") {
            setRegionCord([res.data[0]?.lat, res.data[0]?.lng]);
            setCircle([
              res.data[0]?.lat ? res.data[0]?.lat : "",
              res.data[0]?.lng ? res.data[0]?.lng : "",
            ]);
            setRadiusDraw(res.data[0]?.radius);
            // setRadius(res.data[0]?.radius)

            // setMapLatLngData([res.data[0]?.lat ? res.data[0]?.lat : "", res.data[0]?.lng ? res.data[0]?.lng : ""])
          }

          if (res.type == "polygon") {
            let dataCard = res?.data[0];
            setRegionCord([dataCard[0], dataCard[1]]);
            setMapLayer(res?.data);
            // setMapLatLngData(res?.data)
          }
          if (res.type == "rectangle") {
            let dataCard = res?.data[0];

            setRegionCord([dataCard[0], dataCard[1]]);
            setMapRectangle(res?.data);
            // setMapLatLngData(res?.data)
          }

          // setMapZoomValue(10)
        } else {
          // notifyError(res.message);
        }
      })
      .catch((err) => {
        console.log("api response", err);
      });
  };
  const [ChangeLang, SetChangeLang] = useState("");
  const [socket, setSocket] = useState();
  const [socketNotifcation, setSocketNotifcation] = useState();

  const getSocketSettings = ({ accessRight, addon }) => {
    if (accessRight) {
      dispach(
        saveSetting({
          accessRights: accessRight,
        })
      );
      localStorage.setItem("accessRights", JSON.stringify(accessRight));
    }
    if (addon) {
      dispach(
        addonSetting({
          addonModule: addon,
        })
      );
      localStorage.setItem("addonModule", JSON.stringify(addon));
    }
  };
  useEffect(() => {
    if (customerData.id) {
      setSocket(
        io(
          `${ApiConfig.BASE_URL}?UID=${customerData.id}&user_customer_id=${customerData.customer_id}`,
          option
        )
      );
    }
  }, [customerData.customer_id]);

  useEffect(() => {
    if (customerData.id) {
      setSocketNotifcation(
        io(
          `${ApiConfig.BASE_URL}?user_id=${customerData.id}&customer_id=${customerData.customer_id}&user_type=$customer`,
          option
        )
      );
    }
  }, [customerData.customer_id]);

  useEffect(() => {
    if (customerData.customer_id && socket && customerData?.UserRole) {
      if (customerData.customer_id && customerData.UserRole) {
        const data1 = {
          user_customer_id: customerData.customer_id,
          user_role: customerData.UserRole,
        };
        socket && socket.emit("addons-switch", data1);
        socket &&
          socket.on(`user-access/${customerData?.UserRole}`, (data) => {
            let dt = JSON?.parse(data);
            if (customerData.UserRole === dt?.rights_role) {
              getSocketSettings({ accessRight: JSON.parse(data), addon: "" });
            }
          });
        socket &&
          socket.on(`user-addon`, (data) => {
            getSocketSettings({ accessRight: "", addon: JSON.parse(data) });
          });
      }
    }
  }, [customerData.customer_id, socket, customerData?.UserRole]);

  useEffect(() => {
    if (customerData.customer_id) {
      geUserListList();
      getAlllogos();
    }
  }, [customerData.customer_id]);

  //  useEffect(() => {
  //   if(customerProfile.user_id&&customerData?.UserRole){
  //      getUserDetails()
  //   } }, [])

  function geUserListList() {
    simpleGetCall(ApiConfig.USERS_ROLE_LIST)
      .then((data) => {
        // let udated =data?.data.map((ele)=>{
        // return {...ele,dynamic_view:1,dynamic_manage:1}
        // })
        setUserListRole(data?.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  const [vehicleTabListActive, setVehicleTabListActive] = useState(
    localStorage.getItem("vehicleTabListActive")
      ? localStorage.getItem("vehicleTabListActive")
      : "vehicle"
  );
  //  setVehicleTabListActive("vehicle")
  //
  const [customerLogo, setCustomerLogo] = useState("");
  const getAlllogos = () => {
    setLoading(true);
    simpleGetCall(ApiConfig.GET_ALL_LOGO)
      .then((res) => {
        if (res.result) {
          setCustomerLogo(res?.data);
        }
      })
      .catch((err) => {
        notifyError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getUserDetails = () => {
    setLoading(true);
    let newRequestBody = JSON.stringify({
      user_id: customerProfile?.user_id.toString(),
      user_role: customerData?.UserRole,
    });
    simplePostCall(ApiConfig?.USER_PROFILE, newRequestBody)
      .then((res) => {
        setLoading(false);
        if (res) {
          let user_profile = res.data[0];
          setcustomerProfile(res.data[0]);
          localStorage.setItem("user", JSON.stringify(res.data[0]));
        }
        // setcustomerProfile({});
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getallbrand();
  }, []);

  const getallbrand = () => {
    setLoading(true);
    PostCallWithErrorResponse(ApiConfig.brand)
      .then((res) => {
        setBrand(res.json.data);
      })
      .catch((err) => {
        notifyError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  useEffect(() => {
    // Check and request permissions for microphone and camera
    socketNotifcation &&
    socketNotifcation.on("socket-notification", (data) => {
            console.log(data)
         notificationMsg(data.message);
        play()
        return () => {
          socketNotifcation && socketNotifcation.off("socket-notification");
        };
      });
    return () => {
      socketNotifcation && socketNotifcation.off("socket-notification");
    };
  }, [socketNotifcation]);



  useEffect(() => {
    socket && 
      socket.on("get-unread-msgs-count", (value) => {
        let data = value;

        seChatCount(data?.allUnreadMsgs);
      });
    return () => {
      socket && socket.off("get-unread-msgs-count");
    };
  }, [socket]);






  return (
    <div>
      <AppContext.Provider
        value={{
          help_setting_disable,
          set_help_setting_disable,
          backDrop,
          setBackDrop,
          sidebar,
          setSidebar,
          customerData,
          setCustomerData,
          TransportId,
          setTransportId,
          googleMap,
          setGoogleMap,
          place,
          setPlace,
          getallbrand,
          mapLayer,
          setMapLayer,
          mapRectangle,
          setMapRectangle,
          circle,
          setCircle,
          radius,
          setRadius,
          regionCord,
          setRegionCord,
          marker,
          setMarker,
          layerTypeSend,
          setLayerTypeSend,
          mapLatLngData,
          setMapLatLngData,
          errMsgMap,
          setErrMsgMap,
          useDebounce,
          linkState,
          setLinkState,
          loading,
          setLoading,
          radiusDraw,
          brand,
          setBrand,
          setRadiusDraw,
          draggedName,
          setDraggedName,
          mapZoomValue,
          setMapZoomValue,
          positionCercle,
          setPositionCercle,
          positionRectangle,
          setPositionRectangle,
          postionPolygon,
          setPostionPolygon,
          postionPolygon,
          setPostionPolygon,
          postionRadius,
          setPostionRadius,
          infoOpen,
          setInfoOpen,
          recentChatdata,
          setRecentChatdata,
          getTransporatioData,
          ChangeLang,
          SetChangeLang,
          PushNotificationStatus,
          setPushNotificationStatus,
          EmailStatus,
          setEmailStatus,
          socket,
          setSocket,
          VehicleStatus,
          setVehicleStatus,
          DriverStatus,
          setDriverStatus,
          DateFormatConfig,
          setDateFormatConfig,
          ConvertKilometersMiles,
          setConvertKilometersMiles,
          ConvertTemperatureUnit,
          setConvertTemperatureUnit,
          TimeFormat,
          setTimeFormat,
          multiCercledata,
          setMultiCercledata,
          onlineCount,
          setOnlineCount,
          userListRole,
          setUserListRole,
          UserRole,
          setUserRole,
          OptionDynamicDownload,
          setOptionDynamicDownload,
          DynamicRole,
          setDynamicRole,
          geUserListList,
          centerDragged,
          setCenterDragged,
          triggerMap,
          setTriggerMap,
          UserRoleRoute,
          setUserRoleRoute,
          vehicleTabListActive,
          setVehicleTabListActive,
          CategoryId,
          setCategoryId,
          dispatchStatus,
          setDispatchStatus,
          routeIdEdit,
          setRouteIdEdit,
          triggerMapBoundKey,
          setTriggerMapBoundKey,
          triggerMapBoundKeyRandom,
          LinkReport,
          setLinkReport,
          ReportHader,
          setReportHader,
          setTriggerMapBoundKeyRandom,
          editMerchantaddrees,
          seEditMerchantaddrees,
          ViewId,
          setViewId,
          timeZone,
          setTimeZone,
          customerProfile,
          setcustomerProfile,
          getAlllogos,
          customerLogo,
          setCustomerLogo,
          recordsPerPage,
          setRecordsPerPage,
          updateKey,
          setupdateKey,
          WeekenHide,
          setWeekenHide,
          add_new_order_ids,
          set_add_new_order_ids,
          pickup_point_id,
          set_pickup_point_id,
          pickup_point_trip_id,
          set_pickup_point_trip_id,
          dispatch_package_id,
          set_dispatch_package_id,
          is_last_row,
          set_is_last_row,
          imageUrl,
          set_imageUrl,
          Createcompose, setCreatecompose,
          ChatCount, seChatCount,
          invoice_details, set_invoice_details,
          membersArray, setMembersArray

        }}
      >
        {props.children}
      </AppContext.Provider>
    </div>
  );
};

export default AppState;

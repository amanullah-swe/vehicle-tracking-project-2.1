// import { React, useContext, useState } from "react";
// import { AppContext } from "../../context/AppContext";
// import DDlogo from "../../assets/images/vector199.svg";
// import Form from "react-bootstrap/Form";
// import { motion } from "framer-motion";
// import { useEffect } from "react";
// import { simpleGetCall, simplePostCall } from "../../api/ApiServices";
// import ApiConfig from "../../api/ApiConfig";
// import Loader from "../../sharedComponent/Loader";
// import { notifySuccess } from "../../sharedComponent/notify";
// import { useTranslation } from "react-i18next";
// import range from "lodash/range";
// import { Select } from "antd";
// const { Option } = Select;

// const NotificationSetting = () => {
//   const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
//   const [loading, setLoading] = useState(false);
//   const [validated, setValidated] = useState(false);
//   const [notificationData, setnotificationData] = useState({});
//   const [isSMSGateway, setIsSMSGateway] = useState(0);
//   const { t, i18n } = useTranslation();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     } else {
//       let body = JSON.stringify(notificationData);
//       setLoading(true);

//       simplePostCall(ApiConfig.UPDATE_NOTIFICATIONS, body)
//         .then((res) => {
//           if (res.result) {
//             notifySuccess(res.message);
//             getNotificationsData();
//           }
//         })
//         .catch((err) => {
//           console.log("err", err);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//     setValidated(true);
//   };
//   const aninations = {
//     initial: { opacity: 0, x: 400 },
//     animate: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: 100 },
//   };
//   useEffect(() => {
//     getNotificationsData();
//     getInteGrationSetting();
//   }, []);
//   const getNotificationsData = () => {
//     setLoading(true);
//     simpleGetCall(ApiConfig.GET_NOFIFICATION_DATA)
//       .then((res) => {
//         if (res.result) setnotificationData(res.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const getInteGrationSetting = () => {
//     setLoading(true);
//     simpleGetCall(ApiConfig.GET_INTEGRATION_SETTINGS)
//       .then((res) => {
//         if (res.result) {
//           setIsSMSGateway(res.data.settingsSms.settings_sms_gateway_status);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const kmRange = range(100, 3001, 100);
//   const dayRange = range(1, 16, 1);

//   let count = 1;
//   return (
//     <>
//       <motion.div
//         className={sidebar ? "taskMain " : "cx-active taskMain"}
//         id="cx-main"
//         variants={aninations}
//         initial="initial"
//         animate="animate"
//         exit="exit"
//         transition={{ duration: 0.1 }}
//       >
//         <div id="cx-wrapper" className="Notification_Setting">
//           {/* Table */}
//           {loading ? (
//             <Loader />
//           ) : (
//             <>
//               <div className="main-master-wrapper form_input_main">
//                 <div className="tableBorders" id="customizeTable">
//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th>{t("Sr.No.")}</th>
//                         <th>{t("Type")}</th>
//                         <th>{t("Push Notification")}</th>
//                         <th className="insideTd">{t("Email")}</th>
//                         {isSMSGateway === 1 && <th>{t("SMS")}</th>}
//                       </tr>
//                     </thead>
//                     <tbody className="tableBody">
//                       {notificationData.push &&
//                         Object.keys(notificationData.push).map(
//                           (currentKey, index) => {
//                             let label = currentKey.replaceAll("notification_settings","").replaceAll("_", " ");
//                             let pushData = { ...notificationData.push };
//                             let emailData = { ...notificationData.Email };
//                             let smsNData = { ...notificationData.smsN };
//                             let currentItem =
//                               notificationData.push[currentKey] == 0 ||
//                               notificationData.push[currentKey] == 1;

//                             return (
//                               currentItem && (
//                                 <tr key={currentKey}>
//                                   <td>{count++}</td>
//                                   <td>
//                                     {label.charAt(0).toUpperCase() +
//                                       label.slice(1)}
//                                   </td>
//                                   <td>
//                                     {" "}
//                                     <input
//                                       class="form-check-input"
//                                       type="checkbox"
//                                       checked={pushData && pushData[currentKey]}
//                                       onChange={(e) => {
//                                         pushData[currentKey] = e.target.checked
//                                           ? 1
//                                           : 0;
//                                         setnotificationData({
//                                           ...notificationData,
//                                           push: pushData,
//                                         });
//                                       }}
//                                     />
//                                   </td>
//                                   <td>
//                                     {" "}
//                                     <input
//                                       class="form-check-input"
//                                       type="checkbox"
//                                       value=""
//                                       checked={
//                                         emailData && emailData[currentKey]
//                                       }
//                                       onChange={(e) => {
//                                         emailData[currentKey] = e.target.checked
//                                           ? 1
//                                           : 0;
//                                         setnotificationData({
//                                           ...notificationData,
//                                           Email: emailData,
//                                         });
//                                       }}
//                                     />
//                                   </td>
//                                   {isSMSGateway === 1 && (
//                                     <td>
//                                       {" "}
//                                       <input
//                                         class="form-check-input"
//                                         type="checkbox"
//                                         value=""
//                                         checked={
//                                           smsNData && smsNData[currentKey]
//                                         }
//                                         onChange={(e) => {
//                                           smsNData[currentKey] = e.target
//                                             .checked
//                                             ? 1
//                                             : 0;
//                                           setnotificationData({
//                                             ...notificationData,
//                                             smsN: smsNData,
//                                           });
//                                         }}
//                                       />
//                                     </td>
//                                   )}
//                                 </tr>
//                               )
//                             );
//                           }
//                         )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Vehicle related Setting */}
//               <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                 <div className="main-master-wrapper form_input_main">
//                   <div className="Heading">
//                     <p>{t("Vehicle Related Notification Settings")}</p>
//                   </div>
//                   <div className="innerInputsGen">
//                     <div className="row">
//                       <div className="col-md-6 form_input_main">
//                         <div className="innerSelectBox weekCounter">
//                           <Form.Label className="common-labels">
//                             {t("Vehicle Maintenance Notification")} (
//                             {t("Prior Milage")} {t("km")} )
//                           </Form.Label>

//                           <Form.Select
//                             required
//                             name="Speed_limit"
//                             value={
//                               notificationData.push &&
//                               notificationData.push
//                                 .notification_settings_vehicle_maintenance
//                             }
//                             onChange={(e) => {
//                               setnotificationData({
//                                 ...notificationData,
//                                 push: {
//                                   ...notificationData.push,
//                                   notification_settings_vehicle_maintenance: Number(e.target.value),
//                                 },
//                               });
//                             }}
//                           >
//                             <option value={""}> {t("Please Select Notification (Prior Milage (km))")} </option>
//                             {
//                               kmRange && kmRange.map((km, i) => {
//                                 return (
//                                   // <option key={"kmRange" + i} value={km}>{`${km} (km)`}</option>
//                                   <option key={"kmRange" + i} value={km}>{`${km} (${t("km")})`}</option>
//                                   )
//                               })
//                             }
//                           </Form.Select>

//                           <Form.Control.Feedback type="invalid">
//                             {t(
//                               "Please Select Notification (Prior Milage (km))"
//                             )}
//                           </Form.Control.Feedback>
//                         </div>
//                       </div>
//                       <div className="col-md-6 form_input_main">
//                         <div className="innerSelectBox weekCounter">
//                           <Form.Label className="common-labels">
//                             {t("Vehicle Maintenance Notification")} ({" "}
//                             {t("Prior Days")} )
//                           </Form.Label>

//                           <div className="multi-select-1">
//                             <Select
//                               style={{
//                                 width: "100%",
//                                 height: "40px",
//                                 color: "rgba(156, 73, 0, 0.5)",
//                               }}
//                               showSearch
//                               value={
//                                 notificationData.push &&
//                                 notificationData.push
//                                   .notification_settings_maintenance_days
//                               }
//                               onChange={(value) => {
//                                 setnotificationData({
//                                   ...notificationData,
//                                   push: {
//                                     ...notificationData.push,
//                                     notification_settings_maintenance_days:
//                                       Number(value),
//                                   },
//                                 });
//                               }}
//                               className="custom-select"
//                             >
//                               <Option
//                                 value={""}
//                                 style={{ color: "rgba(156, 73, 0)" }}
//                               >
//                              {t("Please Select Prior Days")}   
//                               </Option>
//                               {dayRange &&
//                                 dayRange.map((day, i) => {
//                                   return (
//                                     <Option
//                                       key={"dayRange1" + i}
//                                       value={day}
//                                       style={{ color: "rgba(156, 73, 0)" }}
//                                     >
//                                       {`${day} ${day === 1 ? t("day") : t("days")}`}
//                                     </Option>
//                                   );
//                                 })}
//                             </Select>
//                           </div>
//                           <Form.Control.Feedback type="invalid">
//                             {t("Please Select Notification (Prior Days)")}
//                           </Form.Control.Feedback>
//                         </div>
//                       </div>
//                       <div className="col-md-6 form_input_main">
//                         <div className="innerSelectBox weekCounter">
//                           <Form.Label className="common-labels">
//                             {t("Notification of Vehicle Insurance Expiry")} ({" "}
//                             {t("Prior Days")} )
//                           </Form.Label>

//                           <div className="multi-select-1">
//                             <Select
//                               style={{
//                                 width: "100%",
//                                 height: "40px",
//                                 color: "rgba(156, 73, 0, 0.5)",
//                               }}
//                               showSearch
//                               value={
//                                 notificationData.push &&
//                                 notificationData.push
//                                   .notification_settings_insurance_days
//                               }
//                               onChange={(value) => {
//                                 setnotificationData({
//                                   ...notificationData,
//                                   push: {
//                                     ...notificationData.push,
//                                     notification_settings_insurance_days:
//                                       Number(value),
//                                   },
//                                 });
//                               }}
//                               className="custom-select"
//                             >
//                               <Option
//                                 value={""}
//                                 style={{ color: "rgba(156, 73, 0)" }}
//                               >
//                            {t("Please Select Vehicle Insurance Expiry (Prior Day)")}     
//                               </Option>
//                               {dayRange &&
//                                 dayRange.map((day, i) => {
//                                   return (
//                                     <Option
//                                       key={"dayRange2" + i}
//                                       value={day}
//                                       style={{ color: "rgba(156, 73, 0)" }}
//                                     >
//                                       {`${day} ${day === 1 ? t("day") : t("days")}`}
//                                     </Option>
//                                   );
//                                 })}
//                             </Select>
//                           </div>
//                           <Form.Control.Feedback type="invalid">
//                             {t(
//                               "Please Select Vehicle Insurance Expiry (Prior Day)"
//                             )}
//                           </Form.Control.Feedback>
//                         </div>
//                       </div>
//                       <div className="col-md-6 form_input_main">
//                         <div className="innerSelectBox weekCounter">
//                           <Form.Label className="common-labels">
//                             {t("Notification of Vehicle Permit Expiry")} ({" "}
//                             {t("Prior Days")} )
//                           </Form.Label>

//                           <div className="multi-select-1">
//                             <Select
//                               style={{
//                                 width: "100%",
//                                 height: "40px",
//                                 color: "rgba(156, 73, 0, 0.5)",
//                               }}
//                               showSearch
//                               value={
//                                 notificationData.push &&
//                                 notificationData.push
//                                   .notification_settings_permit_days
//                               }
//                               onChange={(value) => {
//                                 setnotificationData({
//                                   ...notificationData,
//                                   push: {
//                                     ...notificationData.push,
//                                     notification_settings_permit_days:
//                                       Number(value),
//                                   },
//                                 });
//                               }}
//                               className="custom-select"
//                             >
//                               <Option
//                                 value={""}
//                                 style={{ color: "rgba(156, 73, 0)" }}
//                               >
//                              {t("Please Select Vehicle Permit Expiry (Prior Day)")}   
//                               </Option>
//                               {dayRange &&
//                                 dayRange.map((day, i) => {
//                                   return (
//                                     <Option
//                                       key={"dayRange3" + i}
//                                       value={day}
//                                       style={{ color: "rgba(156, 73, 0)" }}
//                                     >
//                                       {`${day} ${day === 1 ? t("day") : t("days")}`}
//                                     </Option>
//                                   );
//                                 })}
//                             </Select>
//                           </div>

//                           <Form.Control.Feedback type="invalid">
//                             {t(
//                               "Please Select Vehicle Permit Expiry (Prior Day)"
//                             )}
//                           </Form.Control.Feedback>
//                         </div>
//                       </div>
//                       <div className="col-md-6 form_input_main">
//                         <div className="innerSelectBox weekCounter">
//                           <Form.Label className="common-labels">
//                             {t("Vehicle Tax Expiry Notification")} ({" "}
//                             {t("Prior Days")} )
//                           </Form.Label>

//                           <div className="multi-select-1">
//                             <Select
//                               style={{
//                                 width: "100%",
//                                 height: "40px",
//                                 color: "rgba(156, 73, 0, 0.5)",
//                               }}
//                               showSearch
//                               value={
//                                 notificationData.push &&
//                                 notificationData.push
//                                   .notification_settings_taxexpiry_days
//                               }
//                               onChange={(value) => {
//                                 setnotificationData({
//                                   ...notificationData,
//                                   push: {
//                                     ...notificationData.push,
//                                     notification_settings_taxexpiry_days:
//                                       Number(value),
//                                   },
//                                 });
//                               }}
//                               className="custom-select"
//                             >
//                               <Option
//                                 value={""}
//                                 style={{ color: "rgba(156, 73, 0)" }}
//                               >
//                               {t("Please Select Notification (Prior Day)")}  
//                               </Option>
//                               {dayRange &&
//                                 dayRange.map((day, i) => {
//                                   return (
//                                     <Option
//                                       key={"dayRange3" + i}
//                                       value={day}
//                                       style={{ color: "rgba(156, 73, 0)" }}
//                                     >
//                                       {`${day} ${day === 1 ? t("day") : t("days")}`}
//                                     </Option>
//                                   );
//                                 })}
//                             </Select>
//                           </div>

//                           <Form.Control.Feedback type="invalid">
//                             {t("Please Select Notification (Prior Day)")}
//                           </Form.Control.Feedback>
//                         </div>
//                       </div>
//                       <div className="col-md-6 form_input_main">
//                         <div className="innerSelectBox weekCounter">
//                           <Form.Label className="common-labels">
//                             {t("Notification of Vehicle Next Inspection Date")}{" "}
//                             ( {t("Prior Days")} )
//                           </Form.Label>

//                           <div className="multi-select-1">
//                             <Select
//                               style={{
//                                 width: "100%",
//                                 height: "40px",
//                                 color: "rgba(156, 73, 0, 0.5)",
//                               }}
//                               showSearch
//                               value={
//                                 notificationData.push &&
//                                 notificationData.push
//                                   .notification_settings_next_inspection_date
//                               }
//                               onChange={(value) => {
//                                 setnotificationData({
//                                   ...notificationData,
//                                   push: {
//                                     ...notificationData.push,
//                                     notification_settings_next_inspection_date:
//                                       Number(value),
//                                   },
//                                 });
//                               }}
//                               className="custom-select"
//                             >
//                               <Option
//                                 value={""}
//                                 style={{ color: "rgba(156, 73, 0)" }}
//                               >
//                             {t("Please Select Vehicle Next Inspection Date (Prior Days)")}    
//                               </Option>
//                               {dayRange &&
//                                 dayRange.map((day, i) => {
//                                   return (
//                                     <Option
//                                       key={"dayRange4" + i}
//                                       value={day}
//                                       style={{ color: "rgba(156, 73, 0)" }}
//                                     >
//                                       {`${day} ${day === 1 ? t("day") : t("days")}`}
//                                     </Option>
//                                   );
//                                 })}
//                             </Select>
//                           </div>

//                           <Form.Control.Feedback type="invalid">
//                             {t(
//                               "Please Select Vehicle Next Inspection Date (Prior Days)"
//                             )}
//                           </Form.Control.Feedback>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Two Bottom Buttons */}
//                 <div className="d-flex justify-content-end align-items-center btn-wrapper">
//                   {/* <button type="button" className="cx-btn-1">{t("Cancel")}</button> */}
//                   <button className="cx-btn-2">{t("Submit")}</button>
//                 </div>
//               </Form>
//             </>
//           )}
//         </div>
//       </motion.div>
//     </>
//   );
// };

// export default NotificationSetting;




import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Col, Nav, Tab } from "react-bootstrap";
import Import from "../../assets/images/ic-Import.svg";
import Export from "../../assets/images/ic-Export.svg";
import ReactSelect from "../../sharedComponent/ReactSelect";
import { useEffect } from "react";
import { simpleGetCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import Loader from "../../sharedComponent/Loader";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import range from "lodash/range";
import { Value } from "sass";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const NotificationSetting = () => {
  const {
    sidebar,
    setSidebar,
    Dark,
    setDark,
    setLoading,
    loading,
    userListRole,
    setUserListRole,
    customerData,
    socket,
    setupdateKey,
  } = useContext(AppContext);
  const [roles, setRoles] = useState([]);
  const userRole = "noRole";

  const [selRole, setSelRole] = useState("2259");
  const [accessRights, setAccessRights] = useState({});
  const [dynamic_access_rights, setDynamic_access_rights] = useState({});
  const addonSettingData = useSelector((state) => state.auth.addonModule);
  let customerId = Number(customerData?.customer_id);
  const { t, i18n } = useTranslation();

  // ////////////////////////////////////////////////////////////////////
   const [validated, setValidated] = useState(false);
   const [notificationData, setnotificationData] = useState({});
   const [notificationData_push, setnotificationData_push] = useState({});
   const [isSMSGateway, setIsSMSGateway] = useState(0);

   const handleSubmit = (event) => {
         event.preventDefault();
         const form = event.currentTarget;
         if (form.checkValidity() === false) {
           event.preventDefault();
           event.stopPropagation();
         } else {
           let body = JSON.stringify(notificationData);
           setLoading(true);
    
           simplePostCall(ApiConfig.UPDATE_NOTIFICATIONS, body)
             .then((res) => {
               if (res.result) {
                 notifySuccess(res.message);
                 getNotificationsData();
               }
             })
             .catch((err) => {
               console.log("err", err);
             })
             .finally(() => {
               setLoading(false);
             });
         }
         setValidated(true);
       };


       const aninations = {
             initial: { opacity: 0, x: 400 },
             animate: { opacity: 1, x: 0 },
             exit: { opacity: 0, x: 100 },
           };
           useEffect(() => {
             getNotificationsData();
             getInteGrationSetting();
           }, []);
           const getNotificationsData = () => {
             setLoading(true);
             simpleGetCall(ApiConfig.GET_NOFIFICATION_DATA)
               .then((res) => {
                 if (res.result) setnotificationData(res.data);
                 setnotificationData_push(res?.data?.push)
               })
               .catch((err) => {
                 console.log("err", err);
               })
               .finally(() => {
                 setLoading(false);
               });
           };
        
           const getInteGrationSetting = () => {
             setLoading(true);
             simpleGetCall(ApiConfig.GET_INTEGRATION_SETTINGS)
               .then((res) => {
                 if (res.result) {
                   setIsSMSGateway(res.data.settingsSms.settings_sms_gateway_status);
                 }
               })
               .catch((err) => {
                 console.log(err);
               });
           };
        
           const kmRange = range(100, 3001, 100);
           const dayRange = range(1, 16, 1);
        
           let count = 1;

 //// ///////////////////////////////////////////////////////////////////// 
  let temperary = false;

  useEffect(() => {
    getRoles();
  }, []);
  const getRoles = () => {
    simpleGetCall(ApiConfig.GET_ROLES_FOR_RIGHTS)
      .then((res) => {
        if (res.result) {
          setRoles(res?.data);
          let idData = res.data.filter((ele) => ele.rights_role === "customer");
          setSelRole(idData[0]?.rights_id);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  // ggyjgjhgujh
  useEffect(() => {
    getAccessRight();
  }, [selRole]);
  const getAccessRight = () => {
    setLoading(true);
    simplePostCall(
      ApiConfig.GET_ACCESS_RIGHTS,
      JSON.stringify({
        rights_role: roles?.filter((ele) => ele.rights_id === selRole)[0]
          ?.rights_role,
      })
    )
      .then((res) => {
        if (res.result) {
          setAccessRights({ ...res?.data });

          let commobj = {};
          Object.keys(res?.data).some((key) => {
            if (key.endsWith("dynm")) {
              let [right, action, name, co] = key.split("_");
              commobj[name] = { [key]: res?.data[key], ...commobj[name] };
            }
          });
          setDynamic_access_rights(commobj);
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [updateEmitKey, setUpdateEmitKey] = useState("");
  const submitData = () => {
    let body = JSON.stringify({
      ...accessRights,
      rights_role: roles?.filter((ele) => ele.rights_id === selRole)[0]
        ?.rights_role,
    });
    setLoading(true);
    simplePostCall(ApiConfig.UPDATE_ACCESS_RIGHTS, body)
      .then((res) => {
        if (res.result) {
          setupdateKey(Math.random() * 100);
          setUpdateEmitKey(Math.random() * 100);
          getAccessRight();

          notifySuccess(res.message);
        } else notifyError(res?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (customerId && selRole && socket) {
      const data = {
        user_customer_id: customerId,
        user_role: roles?.filter((ele) => ele.rights_id === selRole)[0]
          ?.rights_role,
        is_access: "access_right",
      };
      socket && socket.emit("addonsAndAccessRight", data);
    }
  }, [socket, customerId, updateEmitKey]);

  const handleOnChange = (e, key, name) => {
    let manage = key.includes("manage");
    if (manage) {
      setAccessRights({
        ...accessRights,
        [key]: e.target.checked ? 1 : 0,
        [key?.replace("manage", "view")]: 1,
      });
    } else if (key.includes("manage") || key.includes("view")) {
      accessRights?.[key.replace("view", "manage")] && manageView(name);
      setAccessRights({
        ...accessRights,
        [key]: e.target.checked ? 1 : 0,
      });
    } else {
      setAccessRights({
        ...accessRights,
        [key]: e.target.checked ? 1 : 0,
      });
    }
  };

  const manageView = (props) => {
    if (props === "dispatch_manage_dashboard" || props === "true") {
    } else {
      notifyError(`Please Disable Manage ${props} First`);
    }
  };

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
      <div id="cx-wrapper">
        <div id="Access_right_new">
          {/* <div className="all-vehical-head row vehicle-top-inputs">
            <div className="input-section-wrapper">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12 mb-1">
                  <ReactSelect
                    setterFucntionsId={setSelRole}
                    selectedValue={selRole}
                    selValue={selRole}
                    placehold="Select Role"
                    optionList={roles.map((role, index) => ({
                      id: role.rights_id,
                      value: role.rights_id,
                      label:
                        role.rights_role == "customer"
                          ? "Admin"
                          : role.rights_role,
                    }))}
                    setid={true}
                  />
                </div>
              </div>
            </div>
            <div className="right-export-btn-section-wrapper">
              <Link to="/UserRole" className="d-flex justify-content-end mb-1">
                <button className="cx-btn-3 tbBtn">{t("User Roles")}</button>
              </Link>
            </div>
          </div> */}
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="header_tabel_top">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                    <p className="title">{t("Module")}</p>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                    <p className="title">{t("Features")}</p>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                    <p className="text-right title">{t("Action")}</p>
                  </div>
                </div>
              </div>

              <div className="ScrollingSetting">
               
                {/* Master Data */}
                <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-5">
                      <div className="left">
                        <div className="title">{t("Master Data")}</div>
                        <div className="contain">
                          <ul>
                         
                            <li>{t("Holiday")}</li>
                            <li>{t("Vacations")}</li>
                            <li>{t("Vehicle")}</li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                     
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                               <input
                                className="form-check-input"
                                type="checkbox"
                                checked={notificationData?.push?.notification_settings_holiday }
                                onChange={(e) =>
                                  setnotificationData({
                                    ...notificationData,
                                    push : {
                                      ...notificationData.push,
                                      notification_settings_holiday: e.target.checked
                                      ? 1
                                      : 0,
                                    }
                                  })
                                }
                              />

                              {console.log('taleeb_notification_settings_holiday : ', notificationData?.push?.notification_settings_holiday)}
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked = {false}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_dashboard_map: e.target.checked
                                      ? 1
                                      : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                               checked = {notificationData?.push?.notification_settings_vehicle}
                                onChange={ (e) => {
                                     setnotificationData ({
                                      ...notificationData,
                                      push : {
                                        ...notificationData.push,
                                        notification_settings_vehicle : e.target.checked ? 1 : 0,

                                      }
                                     })
                                }

                                }
                              />
                              {console.log("taleeb_notification_settings_vehicle : ", notificationData?.push?.notification_settings_vehicle)}
                            </div>
                          </li>
                     
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tracking */}
                <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-5">
                      <div className="left">
                        <div className="title">{t("Tracking")}</div>
                        <div className="contain">
                          <ul>
                         
                            <li>{t("Untracked")}</li>
                            <li>{t("Tracking")}</li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                     
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_untracked}
                                onChange={(e)=> {
                                     setnotificationData({
                                      ...notificationData,
                                      push : {
                                        ...notificationData?.push,
                                        notification_settings_untracked : e.target.checked ? 1 : 0,
                                      }
                                     })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                              // checked = {notificationData?.push?.notification_settings_untracked}
                              //   onChange={(e)=> {
                              //        setnotificationData({
                              //         ...notificationData,
                              //         push : {
                              //           ...notificationData?.push,
                              //           notification_settings_untracked : e.target.checked ? 1 : 0,
                              //         }
                              //        })
                              //   }}
                              />
                            </div>
                          </li>
                     
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Trip Management */}
                <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-5">
                      <div className="left">
                        <div className="title">{t("Trip Management")}</div>
                        <div className="contain">
                          <ul>
                         
                          <li>{t("Buscoming")}</li>
                          <li>{t("Pickup Point")}</li>
                            <li>{t("Trip Management")}</li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                      <ul>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                               checked = {notificationData?.push?.notification_settings_buscoming}
                               onChange={(e)=>{
                                   setnotificationData({
                                    ...notificationData,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_buscoming : e.target.checked ? 1 : 0 ,
                                    }
                                   })
                               }}
                              />
                              </div>
                          </li>

                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                               checked = {notificationData?.push?.notification_settings_pickup_point}
                               onChange={(e)=>{
                                   setnotificationData({
                                    ...notificationData,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_pickup_point : e.target.checked ? 1 : 0 ,
                                    }
                                   })
                               }}
                              />
                              </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked ={ notificationData?.push?.notification_settings_trip_managment}
                                onChange={(e)=>{
                                 setnotificationData({
                                  ...notificationData,
                                  push : {
                                    ...notificationData?.push ,
                                    notification_settings_trip_managment : e.target.checked ? 1 : 0
                                  }
                                 })
                                }}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                   
               {/* Dispatch Management */}
<div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-5">
                      <div className="left">
                        <div className="title">{t("Dispatch Management")}</div>
                        <div className="contain">
                          <ul>
                         
                            <li>{t("Order")}</li>
                            <li>{t("Order Status")}</li>
                           
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                     
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                              checked ={ notificationData?.push?.notification_settings_order}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_order : e.target.checked ? 1 : 0,
                                    }
                                  })
                                }}
                              />
                             </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                              checked ={ notificationData?.push?.notification_settings_order_status}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_order_status : e.target.checked ? 1 : 0,
                                    }
                                  })
                                }}
                              />
                            
                            </div>
                          </li>
                        
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
               {/* Driver Behaviour */}
<div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-5">
                      <div className="left">
                        <div className="title">{t("Driver Behaviour")}</div>
                        <div className="contain">
                          <ul>
                         
                            <li>{t("Speed Break")}</li>
                            <li>{t("Seat Belt")}</li>
                            <li>{t("Harsh Acceleration")}</li>
                            <li>{t("Harsh Break")}</li>
                            <li>{t("Geofence Break")}</li>
                            <li>{t("Geofence Entry")}</li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                     
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                               checked = {notificationData?.push?.notification_settings_speed_break}
                              onChange={(e)=>{
                                setnotificationData({
                                  ...notificationData,
                                  push : {
                                    ...notificationData?.push,
                                    notification_settings_speed_break : e.target.checked ? 1 : 0 ,
                                  }
                                })
                              }}
                              />
                              {console.log("notification_settings_speed_break : ", notificationData?.push?.notification_settings_speed_break )}
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                           
                               <input
                                className="form-check-input"
                                type="checkbox"
                               checked = {notificationData?.push?.notification_settings_seat_belt}
                              onChange={(e)=>{
                                setnotificationData({
                                  ...notificationData,
                                  push : {
                                    ...notificationData?.push,
                                    notification_settings_seat_belt : e.target.checked ? 1 : 0 ,
                                  }
                                })
                              }}
                              />
                               {console.log("notification_settings_seat_belt : ", notificationData?.push?.notification_settings_seat_belt )}
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_harsh_accelaration}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_harsh_accelaration : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                               <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_harsh_brak}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_harsh_brak : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                               <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_geofence_break}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_geofence_break : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                            <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_geofence_entry}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_geofence_entry : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                     
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

          {/* Communication */}
<div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-5">
                      <div className="left">
                        <div className="title">{t("Communication")}</div>
                        <div className="contain">
                          <ul>
                         
                            <li>{t("Push Notification")}</li>
                            <li>{t("Message")}</li>
                            <li>{t("Announcement")}</li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                     
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                               <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_pushnotification}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_pushnotification : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                             <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_message}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_message : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_announcement}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_announcement : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                     
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

           {/* User */}
           {/* <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-5">
                      <div className="left">
                        <div className="title">{t("User")}</div>
                        <div className="contain">
                          <ul>
                         
                            <li>{t("Administrator")}</li>
                            <li>{t("Delivery Person")}</li>
                            <li>{t("Driver")}</li>
                            <li>{t("Fleet Manager")}</li>
                          
                            <li>{t("Vehicle Assistants(Helper)")}</li>
                            <li>{t("Transport Manager")}</li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                     
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_dashboard_map}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_dashboard_map: e.target.checked
                                      ? 1
                                      : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_dashboard_map}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_dashboard_map: e.target.checked
                                      ? 1
                                      : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_dashboard_map}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_dashboard_map: e.target.checked
                                      ? 1
                                      : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_dashboard_map}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_dashboard_map: e.target.checked
                                      ? 1
                                      : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_dashboard_map}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_dashboard_map: e.target.checked
                                      ? 1
                                      : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={accessRights?.rights_dashboard_map}
                                onChange={(e) =>
                                  setAccessRights({
                                    ...accessRights,
                                    rights_dashboard_map: e.target.checked
                                      ? 1
                                      : 0,
                                  })
                                }
                              />
                            </div>
                          </li>
                     
                        </ul>
                      </div>
                    </div>
                  </div>
                </div> */}



                


 {/* Parking Management */}
 <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-5">
                      <div className="left">
                        <div className="title">{t("Parking Management")}</div>
                        <div className="contain">
                          <ul>
                         
                            <li>{t("Parking Slots")}</li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                     
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                             <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_parking_slots}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_parking_slots : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                     
                        </ul>
                      </div>
                    </div>
                  </div>
                </div> 

                  {/* Vehicle Maintainance */}
                <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-5">
                      <div className="left">
                        <div className="title">{t("Vehicle Maintainance")}</div>
                        <div className="contain">
                          <ul>
                         
                            <li>{t("Maintainance Days")}</li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                     
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_maintenance_days}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_maintenance_days : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                     
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>   

                  {/* Hardware Malpractice */}
                <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-5">
                      <div className="left">
                        <div className="title">{t("Hardware Malpractice")}</div>
                        <div className="contain">
                          <ul>
                         
                            <li>{t("Battery Low")}</li>
                            <li>{t("Power Off")}</li>
                            <li>{t("Power On")}</li>
                            <li>{t("Simtary Open")}</li>
                            <li>{t("Boxcover Open")}</li>
                            <li>{t("Boxcover Close")}</li>
                            <li>{t("Battery Remove")}</li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                     
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                             <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_battery_low}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_battery_low : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_power_off}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_power_off : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_power_on}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_power_on : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                             <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_simtary_open}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_simtary_open : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                             <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_boxcover_open}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_boxcover_open : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                            <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_boxcover_close}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_boxcover_close : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                             <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_battery_remove}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_battery_remove : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                     
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>  

                 {/* Renewals */}
                <div className="common_access_card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-5">
                      <div className="left">
                        <div className="title">{t("Renewals")}</div>
                        <div className="contain">
                          <ul>
                         
                            <li>{t("Vehicle Tax")}</li>
                            <li>{t("Driver Licence")}</li>
                            <li>{t("Vehicle Insurance")}</li>
                            <li>{t("Vehicle License")}</li>
                            <li>{t("Subscription")}</li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                      <div className="right">
                        <ul>
                     
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                            <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_vehicle_tax}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_vehicle_tax : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_driver_licence}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_driver_licence : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                             <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_vehicle_insurance}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_vehicle_insurance : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                               <input
                                className="form-check-input"
                                type="checkbox"
                              checked = {notificationData?.push?.notification_settings_vehicle_licence}
                                onChange={(e)=>{
                                  setnotificationData({
                                    ...notificationData ,
                                    push : {
                                      ...notificationData?.push,
                                      notification_settings_vehicle_licence : e.target.checked ? 1 : 0 ,
                                    }
                                  })
                                }}
                              />
                            </div>
                          </li>
                          <li>
                            <div
                              className="form-check form-switch"
                              id="custom_switch"
                            >
                               <input
                                className="form-check-input"
                                type="checkbox"
                                checked={notificationData.push?.notification_settings_subscription }
                                onChange={(e) =>
                                  setnotificationData({
                                    ...notificationData,
                                    push : {
                                      ...notificationData.push,
                                    notification_settings_subscription: e.target.checked
                                      ? 1
                                      : 0,
                                    }
                                  })
                                }
                              />
                            </div>
                          </li>
                         
                         
                     
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>      
               

              </div>
            </>
          )}
        </div>

        <div className="d-flex justify-content-end align-items-center btn-wrapper">
          <button className="globalBtn" /* onClick={submitData} */
          onClick={handleSubmit}
          >
            {t("Submit")}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationSetting;

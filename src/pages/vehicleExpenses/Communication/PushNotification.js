import React, { useContext, useEffect, useState } from "react";
import { Dropdown, Nav, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import View from "../../../assets/images/Group.svg";
import Export from "../../../assets/images/Edit-Camunication.svg";
// import Export from "../../../assets/images/Add-Communication.svg";
import { motion } from "framer-motion";
import Pagenation from "../../../sharedComponent/Pagenation";
import ApiConfig from "../../../api/ApiConfig";
import { simpleGetCall, simplePostCall } from "../../../api/ApiServices";
import NoDataComp from "../../../sharedComponent/NoDataComp";
import NoMoreDataComp from "../../../sharedComponent/NoMoreDataComp";
import { useTranslation } from "react-i18next";
import { jsPDF } from "jspdf";
import Import from "../../../assets/images/ic-Import.svg";
import { useSelector } from "react-redux";
import { DateDDMMYYYY } from "../../../sharedComponent/common";
import { notifyError } from "../../../sharedComponent/notify";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const PushNotification = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;
  const addonSettingData = useSelector((state) => state.auth.addonModule);
  const {
    sidebar,
    setSidebar,
    setPushNotificationStatus,
    setVehicleStatus,
    recordsPerPage,
    PushNotificationStatus
  } = useContext(AppContext);
  const [currentTab, setCurrentTab] = useState("0");
  const [page, setPage] = useState(1);
  const [last_page, setlast_page] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [VehicalList, setVehicalList] = useState([]);
  const [DriversList, setDriversList] = useState([]);
  const [TransportMangerList, setTransportMangerList] = useState([]);

  const [Adminster, setAdminster] = useState([]);
  const [DiliverList, setDiliverList] = useState([]);
  const [FleetMangerList, setFleetMangerList] = useState([]);
  const [UserRolewiseList, setUserRolewiseList] = useState([]);
  const { t, i18n } = useTranslation();
  const [ExportStatus, setExportStatus] = useState("customer");
  const [DynamicUserSelected, setDynamicUserSelected] = useState("");
  console.log("DynamicUserSelected",DynamicUserSelected);

  // filter State

  const [TransportName, setTransportName] = useState("");
  const [TripName, setTripName] = useState("");
  const [TripVehicle, setTripVehicle] = useState("");
  const [TripDriver, setTripDriver] = useState("");
  console.log("TripDriver++++++++++",TripDriver);
  const [FleetName, setFleetName] = useState("");
  const [ExportName, setExportName] = useState("");
  const [VehicleName, setVehicleName] = useState("");
  const [VehicleNameTrip, setVehicleTrip] = useState("");
  const [VehicleNameDriver, setVehicleDriver] = useState("");
  const [AdministratorName, setAdminsterName] = useState("");
  const [DiliverPerson, setDiliverPersonName] = useState("");
  const [DynamicUserIndex, setDynamicUserIndex] = useState("");
  console.log("DynamicUserIndex",DynamicUserIndex);
  const [userListRole, setUserListRole] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(null);
  const [pdfData, setpdfData] = useState("");
  const [OptionDownload, setOptionDownload] = useState("");
  const [tab_push_noti, set_tab_push_noti] = useState(
    localStorage.getItem("tab_push_noti") || "0"
  );
  // End
  const [loading, setLoading] = useState(false);



  useEffect(() => {
   if(DynamicUserSelected ){
    getTranspoertin(1);
   }
  }, [DynamicUserSelected,PushNotificationStatus]);








  const handleSelect = () => {
    localStorage.setItem("tab_push_noti", "0");
    getTranspoertin(1);
    setPage(1);
    setTransportName("");
    setTripName("");
    setTripVehicle("");
    setTripDriver("");
    setFleetName("");
    setPushNotificationStatus("transport-manager");
    setExportStatus("transport-manager");
  };
  const handleSelectDrivers = () => {
    localStorage.setItem("tab_push_noti", "1");
    getDrivers(1);
    setPage(1);
    setTransportName("");
    setTripName("");
    setTripVehicle("");
    setTripDriver("");
    setFleetName("");
    setPushNotificationStatus("driver");
    setVehicleStatus("vehicle");
  };
  const handleSelectFleet = () => {
    localStorage.setItem("tab_push_noti", "2");
    getFleet(1);
    setPage(1);
    setTransportName("");
    setTripName("");
    setTripVehicle("");
    setTripDriver("");
    setFleetName("");
    setPushNotificationStatus("fleet-manager");
    setExportStatus("fleet-manager");
  };
  const handleSelectVehicle = () => {
    localStorage.setItem("tab_push_noti", "3");
    getvehicalAssist(1);
    setPage(1);
    setTransportName("");
    setTripName("");
    setTripVehicle("");
    setTripDriver("");
    setFleetName("");
    setPushNotificationStatus("helper");
    setVehicleStatus("vehicle");
  };
  const handleSelectAdminter = () => {
    localStorage.setItem("tab_push_noti", "4");
    setPage(1);
    getAdminster(1);
    setPushNotificationStatus("customer");
    setExportStatus("customer");
    setTransportName("");
    setTripName("");
    setTripVehicle("");
    setTripDriver("");
    setFleetName("");
  };
  const handleSelectDiliverPerson = () => {
    localStorage.setItem("tab_push_noti", "5");
    setPage(1);
    getDiliverPerson(1);
    setPushNotificationStatus("delivery-person");
    setExportStatus("delivery-person");
    setTransportName("");
    setTripName("");
    setTripVehicle("");
    setTripDriver("");
    setFleetName("");
  };
  const handleSelectRole = (RoleData,userIndex,tabIndex) => {
    setDynamicUserIndex(userIndex)
    console.log(DynamicUserIndex,"DynamicUserIndex2222222222222");
    setActiveTabIndex(tabIndex);
    console.log(activeTabIndex,"activeTabIndex");
    setDynamicUserSelected(RoleData)
    localStorage.setItem("tab_push_noti", "6");
    setPage(1);
  
    setPushNotificationStatus(RoleData);
    setExportStatus(RoleData);
    setTransportName("");
    setTripName("");
    setTripVehicle("");
    setTripDriver("");
    setFleetName("");
    handleRoleClick();
  };

  const handleRoleClick = (roleId) => {
    setSelectedRoleId(roleId);
    // Add any other logic you want to execute when a role is clicked
  };

  useEffect(() => {
    localStorage.getItem("tab_push_noti") === "4" && handleSelectAdminter();
    localStorage.getItem("tab_push_noti") === "0" && handleSelect();
    localStorage.getItem("tab_push_noti") === "1" && handleSelectDrivers();
    localStorage.getItem("tab_push_noti") === "5" &&
      handleSelectDiliverPerson();
    localStorage.getItem("tab_push_noti") === "2" && handleSelectFleet();
    localStorage.getItem("tab_push_noti") === "3" && handleSelectVehicle();
    // localStorage.getItem("tab_push_noti") === "6" && handleSelectRole();
  }, [localStorage.getItem("tab_push_noti")]);

  useEffect(() => {
    // Cleanup function to execute when the component unmounts
    localStorage.setItem("tab_push_noti", "0");
    // handleSelectAdminter()
    /*  return () => {
      // Remove the tab_push_noti from localStorage when the component unmounts
      localStorage.removeItem('tab_push_noti');
    }; */
  }, []);

  useEffect(() => {
    getDrivers(1);
  }, [TripVehicle, TripName, TripDriver, OptionDownload,]);
  useEffect(() => {
    getFleet(page);
  }, [FleetName,OptionDownload]);
  useEffect(() => {
    getvehicalAssist(1);
  }, [VehicleName, VehicleNameTrip, VehicleNameDriver,OptionDownload]);
  useEffect(() => {
    getAdminster(1);
  }, [AdministratorName,OptionDownload]);
  useEffect(() => {
    getDiliverPerson(1);
  }, [DiliverPerson,OptionDownload]);
  useEffect(() => {
    getTranspoertin(1);
  }, [TransportName,OptionDownload]);

  useEffect(() => {
    geUserListList(1);
  }, [ OptionDownload]);
  function getDrivers(currentPage) {
    page == 1 && !currentPage && setLoading(true);
    let newRequestBody = JSON.stringify({
      notification_driver_route: TripName,
      notification_driver_vehicle: TripVehicle,
      notification_driver_driver: TripDriver,
      notification_driver_role: "driver",
      page: currentPage,
      page_limit: recordsPerPage,
      format: OptionDownload,
    });
    simplePostCall(ApiConfig.PUSH_NOTIFACTION_DRIVER_LIST, newRequestBody)
      .then((data) => {
        if (data.result) {
          const firstKey = data.file_path;
          setpdfData(firstKey);
          if (!firstKey) {
            setDriversList(data.data);
          
            console.log(data.data, "data.data************pdf");
          }
          setTotalPages(data.total);

          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];
          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,
              notification_driver_route:
                eachteam.notification_driver_route || "",
              notification_driver_vehicle:
                eachteam.notification_driver_vehicle || "",
              notification_driver_driver:
                eachteam.notification_driver_driver || "",
            };
          });

          if (currentPage === 1 || currentPage === 0) {
            setDriversList(data.data);
          } else {
            setDriversList([...DriversList, ...TransportData]);
          }
        } else {
          setDriversList(0);
          setlast_page(false);
          setTotalPages(0);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function getFleet(currentPage) {
    page == 1 && !currentPage && setLoading(true);
    let newRequestBody = JSON.stringify({
      notification_tm_name: FleetName,
      page: currentPage,
      notification_role: "fleet-manager",
      page_limit: recordsPerPage,
      format: OptionDownload,
    });
    simplePostCall(ApiConfig.PUSH_NOTIFACTION_TRANSPORT_LIST, newRequestBody)
      .then((data) => {
        if (data.result) {
          const firstKey = data.file_path;
          setpdfData(firstKey);
          if (!firstKey) {
            setFleetMangerList(data.data);
          
            console.log(data.data, "data.data************pdf");
          }
          setTotalPages(data.total);
          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];
          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,
              notification_tm_name: eachteam.notification_tm_name || "",
              notification_tm_message: eachteam.notification_tm_message || "",
              notification_tm_date: eachteam.notification_tm_date || "",
            };
          });
          if (currentPage === 1 || currentPage === 0) {
            setFleetMangerList(data.data);
          } else {
            setFleetMangerList([...FleetMangerList, ...TransportData]);
          }
        } else {
          setFleetMangerList(0);
          setlast_page(false);
          setTotalPages(0);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function getvehicalAssist(currentPage) {
    page == 1 && !currentPage && setLoading(true);
    let newRequestBody = JSON.stringify({
      notification_driver_route: VehicleNameTrip,
      notification_driver_vehicle: VehicleName,
      notification_driver_driver: VehicleNameDriver,
      notification_driver_role: "helper",
      page: currentPage,
      page_limit: recordsPerPage,
      format: OptionDownload,
    });
    simplePostCall(ApiConfig.PUSH_NOTIFACTION_DRIVER_LIST, newRequestBody)
      .then((data) => {
        if (data.result) {
          const firstKey = data.file_path;
          setpdfData(firstKey);
          if (!firstKey) {
            setVehicalList(data.data);
          
            console.log(data.data, "data.data************pdf");
          }
          setTotalPages(data.total);
          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];
          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,
              notification_tm_name: eachteam.notification_tm_name || "",
              notification_tm_message: eachteam.notification_tm_message || "",
              notification_tm_date: eachteam.notification_tm_date || "",
            };
          });
          if (currentPage === 1 || currentPage === 0) {
            setVehicalList(data.data);
          } else {
            setVehicalList([...VehicalList, ...TransportData]);
          }
        } else {
          setVehicalList(0);
          setlast_page(false);
          setTotalPages(0);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function getTranspoertin(currentPage) {
    page == 1 && !currentPage && setLoading(true);
    let newRequestBody = JSON.stringify({
      notification_tm_name: TransportName,
      page: currentPage,
      notification_role: PushNotificationStatus,
      format: OptionDownload,
    });
    simplePostCall(ApiConfig.PUSH_NOTIFACTION_TRANSPORT_LIST, newRequestBody)
      .then((data) => {
        if (data.result) {
          const firstKey = data.file_path;
          setpdfData(firstKey);
          if (!firstKey) {
            setTransportMangerList(data.data);
          
            console.log(data.data, "data.data************pdf");
          }
          setTotalPages(data.total);
          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];

          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,
              notification_tm_name: eachteam.notification_tm_name || "",
              notification_tm_message: eachteam.notification_tm_message || "",
              notification_tm_date: eachteam.notification_tm_date || "",
            };
          });

          if (currentPage === 1 || currentPage === 0) {
            setTransportMangerList(data.data);
          } else {
            setTransportMangerList([...TransportMangerList, ...TransportData]);
          }
        } else {
          setTransportMangerList(0);

          setlast_page(false);
          setTotalPages(0);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function getAdminster(currentPage) {
    page == 1 && !currentPage && setLoading(true);
    let newRequestBody = JSON.stringify({
      notification_tm_name: AdministratorName,
      page: currentPage,
      notification_role: "customer",
      format: OptionDownload,
    });
    simplePostCall(ApiConfig.PUSH_NOTIFACTION_TRANSPORT_LIST, newRequestBody)
      .then((data) => {
        if (data.result) {
          const firstKey = data.file_path;
          setpdfData(firstKey);
          if (!firstKey) {
            setAdminster(data.data);
          
            console.log(data.data, "data.data************pdf");
          }
          setTotalPages(data.total);

          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];

          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,
              notification_tm_name: eachteam.notification_tm_name || "",
              notification_tm_message: eachteam.notification_tm_message || "",
              notification_tm_date: eachteam.notification_tm_date || "",
            };
          });

          if (currentPage === 1 || currentPage === 0) {
            setAdminster(data.data);
          } else {
            setAdminster([...Adminster, ...TransportData]);
          }
        } else {
          setAdminster(0);

          setlast_page(false);
          setTotalPages(0);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function getDiliverPerson(currentPage) {
    page == 1 && !currentPage && setLoading(true);
    let newRequestBody = JSON.stringify({
      notification_tm_name: DiliverPerson,
      page: currentPage,
      notification_role: "delivery-person",
      format: OptionDownload,
    });
    simplePostCall(ApiConfig.PUSH_NOTIFACTION_TRANSPORT_LIST, newRequestBody)
      .then((data) => {
        if (data.result) {
          const firstKey = data.file_path;
          setpdfData(firstKey);
          if (!firstKey) {
            setDiliverList(data.data);
          
            console.log(data.data, "data.data************pdf");
          }
          setTotalPages(data.total);

          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];

          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,
              notification_tm_name: eachteam.notification_tm_name || "",
              notification_tm_message: eachteam.notification_tm_message || "",
              notification_tm_date: eachteam.notification_tm_date || "",
            };
          });

          if (currentPage === 1 || currentPage === 0) {
            setDiliverList(data.data);
          } else {
            setDiliverList([...DiliverList, ...TransportData]);
          }
        } else {
          setDiliverList(0);

          setlast_page(false);
          setTotalPages(0);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  //Export
  function getExportChat() {
    let newRequestBody = JSON.stringify({
      notification_tm_name: ExportName,
      notification_role: ExportStatus,
    });
    simplePostCall(ApiConfig.PUSH_NOTIFACTION_EXPORT, newRequestBody)
      .then((data) => {
        if (data.result) {
          // pdfFormat(data.data);
        } else {
          notifyError(data?.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // const pdfFormat = (pdfData) => {
  //   // let chatsData = await getExportChat()
  //   const unit = "pt";
  //   const size = "A4"; // Use A1, A2, A3 or A4
  //   const orientation = "portrait"; // portrait or landscape
  //   const marginLeft = 40;
  //   const doc = new jsPDF(orientation, unit, size);
  //   doc.setFontSize(15);
  //   const title = "Email";
  //   const headers = [["Sr. No.", "Name", "Subject"]];
  //   var data = [];
  //   pdfData.map((item, index) => {
  //     data.push([
  //       index + 1,
  //       item.notification_tm_name,
  //       item.notification_tm_date,
  //     ]);
  //   });
  //   let content = {
  //     headStyles: { fillColor: "#9c4900" },
  //     theme: "grid",
  //     pageBreak: "auto",
  //     bodyStyles: { fillColor: "#f6efe9" },
  //     styles: { fillColor: "#9c4900" },
  //     head: headers,
  //     title: title,
  //     body: data,
  //   };

  //   doc.text(title, marginLeft, 25);
  //   doc.autoTable(content);
  //   doc.save("VT.pdf");
  //   return <div></div>;
  // };

  /// Export Diraver
  // function getExportChatDriver() {
  //   let newRequestBody = JSON.stringify({
  //     notification_driver_role: "driver",
  //     notification_driver_route: TripName,
  //     notification_driver_vehicle: TripVehicle,
  //     notification_driver_driver: TripDriver,
  //   });
  //   simplePostCall(ApiConfig.PUSHI_NOTIFICATION_DRIVER_EXPOERT, newRequestBody)
  //     .then((data) => {
  //       if (data.result) {
  //         pdfFormatDriver(data.data);
  //       } else {
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }
  useEffect(() => {
    if (pdfData) {
      downloadFile();
    }
  }, [pdfData]);
  const downloadFile = () => {
    fetch(pdfData)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const a = document.createElement("a");
        a.href = url;

        // Extract the file name from the filepath dynamically
        const fileName = pdfData.substring(pdfData.lastIndexOf("/") + 1);
        a.download = fileName;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading file:", error));
  };
  useEffect(() => {
    if (OptionDownload === "pdf" || OptionDownload === "excel") {
      getDrivers(1)
    }
  }, [
    OptionDownload,
    
  ]);


  // const pdfFormatDriver = (pdfData) => {
  //   // let chatsData = await getExportChat()
  //   const unit = "pt";
  //   const size = "A4"; // Use A1, A2, A3 or A4
  //   const orientation = "portrait"; // portrait or landscape
  //   const marginLeft = 40;

  //   const doc = new jsPDF(orientation, unit, size);
  //   doc.setFontSize(15);
  //   const title = "Eamol";
  //   const headers = [["Sr. No.", "Trip Name", "Vehicle"]];
  //   var data = [];
  //   pdfData?.map((item, index) => {
  //     data.push([
  //       index + 1,
  //       item.notification_driver_route,
  //       item.notification_driver_vehicle,
  //     ]);
  //   });

  //   let content = {
  //     headStyles: { fillColor: "#9c4900" },
  //     theme: "grid",
  //     pageBreak: "auto",
  //     bodyStyles: { fillColor: "#f6efe9" },
  //     styles: { fillColor: "#9c4900" },
  //     head: headers,
  //     title: title,
  //     body: data,
  //   };

  //   doc.text(title, marginLeft, 25);
  //   doc.autoTable(content);
  //   doc.save("VT.pdf");
  //   return <div></div>;
  // };

  /// Export vehicle
  // function getExportChatVehicle() {
  //   let newRequestBody = JSON.stringify({
  //     notification_driver_role: "helper",
  //     notification_driver_route: VehicleNameTrip,
  //     notification_driver_vehicle: VehicleName,
  //     notification_driver_driver: VehicleNameDriver,
  //   });
  //   simplePostCall(ApiConfig.PUSH_NOTIFACTION_VEJICLOE_EXPORT, newRequestBody)
  //     .then((data) => {
  //       if (data.result) {
  //         pdfFormatVehicle(data.data);
  //       } else {
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  const pdfFormatVehicle = (pdfData) => {
    // let chatsData = await getExportChat()
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Email";
    const headers = [["Sr. No.", "Trip Name", "Vehicle"]];
    var data = [];
    pdfData?.map((item, index) => {
      data.push([
        index + 1,
        item.notification_driver_route,
        item.notification_driver_vehicle,
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

  //accessRights?.rights_view_tm ||
  //                         accessRights?.rights_view_driver ||
  //                         accessRights?.rights_view_helper ||
  //                         accessRights?.rights_view_fleet_manager ||
  //                         accessRights?.rights_view_vehicle_assistants

  //getuselist
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
        <div className="Vehcle-main-tabs" id="Email_Responsive">
          <div className="outer-tab-vehicle">
            <div id="pushNotification-tab-wrapper" className="nav-container">
              <Tab.Container
                id="left-tabs-example"
                /* defaultActiveKey="0" */ defaultActiveKey={
                  localStorage.getItem("tab_push_noti")
                    ? localStorage.getItem("tab_push_noti")
                    : "0"
                }
              >
                <Nav
                  className="nav-scroll "
                  variant="pills"
                  id="newTabMai"
                  onSelect={(selectedKey) => setCurrentTab(`${selectedKey}`)}
                >
                  {(userRole === "customer" ||
                    (accessRights && accessRights?.rights_view_tm == 1)) && (
                    <Nav.Item className="mr-6" key="0">
                      <Nav.Link eventKey="0" onClick={handleSelect}>
                        {t("Transport Manager")}
                      </Nav.Link>
                    </Nav.Item>
                  )}
                  {(userRole === "customer" ||
                    (accessRights &&
                      accessRights?.rights_view_driver == 1)) && (
                    <Nav.Item  className="mr-6" key="1">
                      <Nav.Link eventKey="1" onClick={handleSelectDrivers}>
                        {t("Drivers")}
                      </Nav.Link>
                    </Nav.Item>
                  )}
                  {addonSettingData?.addon_fleetmanager_role == 1 &&
                    (userRole === "customer" ||
                      (accessRights &&
                        accessRights?.rights_view_fleet_manager == 1)) && (
                      <Nav.Item className="mr-6" key="2">
                        <Nav.Link eventKey="2" onClick={handleSelectFleet}>
                          {t("Fleet Manager")}
                        </Nav.Link>
                      </Nav.Item>
                    )}
                  {addonSettingData?.addon_busassistant_role == 1 &&
                    (userRole === "customer" ||
                      (accessRights &&
                        accessRights?.rights_view_vehicle_assistants == 1)) && (
                      <Nav.Item className="mr-6" key="3">
                        <Nav.Link eventKey="3" onClick={handleSelectVehicle}>
                          {t("Vehicle Assistant")}
                        </Nav.Link>
                      </Nav.Item>
                    )}
                  {(userRole === "customer" ||
                    (accessRights && accessRights?.rights_view_admin == 1)) && (
                    <Nav.Item className="mr-6" key="4">
                      <Nav.Link eventKey="4" onClick={handleSelectAdminter}>
                        {t("Administrator")}
                      </Nav.Link>
                    </Nav.Item>
                  )}
                  {addonSettingData?.addon_dispatch == 1 &&
                    (userRole === "customer" ||
                      (accessRights &&
                        accessRights?.rights_view_helper == 1)) && (
                      <Nav.Item className="mr-6" key="5">
                        <Nav.Link
                          eventKey="5"
                          onClick={handleSelectDiliverPerson}
                        >
                          {t("Delivery Person")}
                        </Nav.Link>
                      </Nav.Item>
                    )}
                  {addonSettingData?.addon_dispatch == 1 &&
                    (userRole === "customer" ||
                      (accessRights &&
                        accessRights?.rights_view_helper == 1)) && (
                          <div
                          id="newTabMaiAAA"
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            
                            
                          }}
                        >
                          {userListRole.length >= 6 && userListRole.slice(6).map((role, index) => {
                            const dynamicIndex = index + 6;
                            return (
                              <Nav.Item key={dynamicIndex}>
                                {/* Render all roles using map */}
                                <Nav.Link
                                  eventKey={dynamicIndex}
                                  onClick={() => handleSelectRole(role.role_name, dynamicIndex)}
                                  className={`mb-2 ${dynamicIndex === activeTabIndex  ? 'active' : ''}`}
                                  style={{
                                    backgroundColor: dynamicIndex === activeTabIndex  ? '#9c4900' : '#fff',
                                    color: dynamicIndex === activeTabIndex  ? 'white' : '#8f4300',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    height: '40px',
                                    width: '185px',
                                    border: '1px solid #f6efe9',
                                    display: 'flex',
                                    flex:'wrap',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    transition: 'background-color 0.3s ease, color 0.3s ease',
                                  }}
                                >
                                  {role.role_name}
                                </Nav.Link>
                              </Nav.Item>
                            );
                          })}
                        </div>
                        
                    )}
                </Nav>
                <Tab.Content
                  id="pushNotification-tab-wrapper"
                  className="main-master-wrapper"
                >
                  {(userRole === "customer" ||
                    (accessRights && accessRights?.rights_view_tm == 1)) && (
                    <Tab.Pane eventKey="0">
                      <div id="pushNotif-table-scroll">
                        <div className="all-vehical-head row vehicle-top-inputs">
                          <div className="input-section-wrapper">
                            <div className="row">
                              <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t("Transport Manager Name")}
                                  value={TransportName}
                                  onChange={(e) => {
                                    setTransportName(e.target.value);
                                    setExportName(e.target.value);
                                    setPage(1);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          {userRole === "customer" ||
                          (accessRights &&
                            accessRights?.rights_manage_push_notification ==
                              1) ? (
                            <div className="right-export-btn-section-wrapper">
                              <div className="c-pointer">
                                {/* <Link
                                  to="/AddTripFleet"
                                  onClick={() =>
                                    localStorage.setItem("tab_push_noti", "0")
                                  }
                                >
                                  <img src={Export} alt="" />
                                </Link> */}
                              </div>
                              <div className="c-pointer md_dropdown right-export-btn-section-wrapper   d-flex align-item-center" >
                              <Link
                                  to="/AddTripFleet"
                                  onClick={() =>
                                    localStorage.setItem("tab_push_noti", "0")
                                  }
                                >
                                  <img src={Export} alt="" />
                                </Link>
                            <Dropdown className="p-0 ml-2" >
                              <Dropdown.Toggle id="dropdown-basic">
                                <img src={Import} alt="" />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => setOptionDownload("pdf")}
                                    className="d-block"
                                  >
                                  {t("PDF")}  
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => setOptionDownload("excel")}
                                    className="d-block"
                                  >
                                  {t("Excel")}  
                                  </Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                                    </div>
                              <div className="c-pointer">
                                {/* <img
                                  onClick={() => getExportChat()}
                                  src={Import}
                                  alt=""
                                /> */}
                              </div>
                            </div>
                          ) : null}

                          <div
                            className="yauto"
                            onScroll={(e) => {
                              const bottom =
                                e.target.scrollHeight - e.target.scrollTop ===
                                e.target.clientHeight;

                              if (bottom && !last_page) {
                                setPage(page + 1);
                                getTranspoertin(page + 1);
                              }
                            }}
                          >
                            <table className="table tableAdmin tabelheiht">
                              <thead className="tableHead">
                                <tr>
                                  <th>{t("Sr.no")}</th>
                                  <th>{t("Transport Manager Name")}</th>
                                  <th>{t("Date")}</th>
                                  <th>{t("Action")}</th>
                                </tr>
                              </thead>
                              {TransportMangerList &&
                              TransportMangerList.length > 0 ? (
                                TransportMangerList?.map((itemlist, index) => {
                                  return (
                                    <tbody className="tableBody">
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>{itemlist.notification_tm_name}</td>
                                        <td>
                                          {DateDDMMYYYY(
                                            itemlist?.notification_tm_date
                                          )}
                                        </td>
                                        <td>
                                          <div className="innerFlex">
                                            <Link
                                              to={
                                                "/NotificationDetails2/" +
                                                itemlist.notification_tm_id
                                              }
                                            >
                                              <img
                                                src={View}
                                                className="me-3"
                                                alt=""
                                              />
                                            </Link>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  );
                                })
                              ) : (
                                <></>
                              )}
                            </table>
                            {/* {last_page === true ? <NoMoreDataComp /> : ""} */}
                          </div>
                        </div>
                      </div>
                      {/* {TransportMangerList?.length > 0 && (
                        <Pagenation
                          length={TransportMangerList?.length}
                          total={totalPages}
                        />
                      )} */}
                        {TransportMangerList && TransportMangerList?.length > 0 ? (
  <>
    {/* Render your data here */}
    <Pagenation
      length={TransportMangerList?.length}
      total={totalPages}
    />
  </>
) : (
  <div><NoDataComp /></div>
)}
                    </Tab.Pane>
                  )}

                  {(userRole === "customer" ||
                    (accessRights &&
                      accessRights?.rights_view_driver == 1)) && (
                    <Tab.Pane eventKey="1">
                      <div id="pushNotif-table-scroll">
                        <div className="all-vehical-head row vehicle-top-inputs">
                          <div className="input-section-wrapper">
                            <div className="row">
                              <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t("Trip Name")}
                                  value={TripName}
                                  onChange={(e) => {
                                    setTripName(e.target.value);
                                    
                                    setPage(1);
                                  }}
                                />
                              </div>
                              <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t("Vehicle")}
                                  value={TripVehicle}
                                  onChange={(e) => {
                                    setTripVehicle(e.target.value);
                                    setPage(1);
                                  }}
                                />
                              </div>
                              <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={t("Driver")}
                                  value={TripDriver}
                                  onChange={(e) => {
                                    setTripDriver(e.target.value);
                                    setExportName(e.target.value);
                                    setPage(1);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="right-export-btn-section-wrapper">
                            {(userRole === "customer" ||
                              (accessRights &&
                                accessRights?.rights_manage_push_notification ==
                                  1)) && (
                              <div className="c-pointer">
                                <Link
                                  to="/AddPushNotification"
                                  onClick={() =>
                                    localStorage.setItem("tab_push_noti", "1")
                                  }
                                >
                                  {/* <img src={Export} alt="" /> */}
                                </Link>
                              </div>
                            )}
                             <div className="c-pointer md_dropdown right-export-btn-section-wrapper d-flex align-item-center    ">
                             {/* <div className="c-pointer">
                              <img
                                onClick={() => getExportChatDriver()}
                                src={Import}
                                alt=""
                              />
                            </div> */}
                              <div className="c-pointer">
                                <Link
                                  to="/AddPushNotification"
                                  onClick={() =>
                                    localStorage.setItem("tab_push_noti", "1")
                                  }
                                >
                                  <img src={Export} alt="" />
                                </Link>
                              </div>
                            <Dropdown className="p-0 ml-2" >
                              <Dropdown.Toggle id="dropdown-basic">
                                <img src={Import} alt="" />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => setOptionDownload("pdf")}
                                    className="d-block"
                                  >
                                  {t("PDF")}  
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => setOptionDownload("excel")}
                                    className="d-block"
                                  >
                                  {t("Excel")}  
                                  </Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                                   </div>
                           
                          </div>
                          <div
                            className="yauto"
                            onScroll={(e) => {
                              const bottom =
                                e.target.scrollHeight - e.target.scrollTop ===
                                e.target.clientHeight;

                              if (bottom && !last_page) {
                                setPage(page + 1);
                                getDrivers(page + 1);
                              }
                            }}
                          >
                            <table className="table tableAdmin tabelheiht">
                              <thead className="tableHead">
                                <tr>
                                  <th>{t("Sr.no")}</th>
                                  <th>{t("Trip Name")}</th>
                                  <th>{t("Vehicle")}</th>
                                  <th>{t("Driver")}</th>

                                  <th>{t("Action")}</th>
                                </tr>
                              </thead>
                              {DriversList && DriversList?.length > 0 ? (
                                DriversList?.map((itemlist, index) => {
                                  return (
                                    <tbody className="tableBody">
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                          {itemlist.notification_driver_route}
                                        </td>
                                        <td>
                                          {itemlist.notification_driver_vehicle}
                                        </td>
                                        <td>
                                          {itemlist.notification_driver_driver}
                                        </td>
                                        <td>
                                          <div className="innerFlex">
                                            <Link
                                              to={
                                                "/NotificationDetails/" +
                                                itemlist.notification_driver_id
                                              }
                                            >
                                              <img
                                                src={View}
                                                className="me-3"
                                                alt=""
                                              />
                                            </Link>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  );
                                })
                              ) : (
                                <></>
                              )}
                            </table>
                            {/* {last_page === true ? <NoMoreDataComp /> : ""} */}
                          </div>
                        </div>
                      </div>
                      {/* {DriversList?.length > 0 && (
                        <Pagenation
                          length={DriversList?.length}
                          total={totalPages}
                        />
                      )} */}
                        {DriversList && DriversList?.length > 0 ? (
  <>
    {/* Render your data here */}
    <Pagenation
      length={DriversList?.length}
      total={totalPages}
    />
  </>
) : (
  <div><NoDataComp /></div>
)}
                    </Tab.Pane>
                  )}
                  {addonSettingData?.addon_fleetmanager_role == 1 &&
                    (userRole === "customer" ||
                      (accessRights &&
                        accessRights?.rights_view_fleet_manager == 1)) && (
                      <Tab.Pane eventKey="2">
                        <div className="" id="pushNotification-tab-wrapper">
                          <div className="all-vehical-head row vehicle-top-inputs">
                            <div className="input-section-wrapper">
                              <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={t("Fleet Manager Name")}
                                    value={FleetName}
                                    onChange={(e) => {
                                      setFleetName(e.target.value);
                                      setExportName(e.target.value);
                                      setPage(1);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="right-export-btn-section-wrapper">
                              {(userRole === "customer" ||
                                (accessRights &&
                                  accessRights?.rights_manage_push_notification ==
                                    1)) && (
                                <div className="c-pointer">
                                  <Link
                                    to="/AddTripFleet"
                                    onClick={() =>
                                      localStorage.setItem("tab_push_noti", "2")
                                    }
                                  >
                                    {/* <img src={Export} alt="" /> */}
                                  </Link>
                                </div>
                              )}
                               <div className="md_dropdown right-export-btn-section-wrapper align-item-center ">
                               <div className="c-pointer">
                                  <Link
                                    to="/AddTripFleet"
                                    onClick={() =>
                                      localStorage.setItem("tab_push_noti", "2")
                                    }
                                  >
                                    <img src={Export} alt="" />
                                  </Link>
                                </div>
                            <Dropdown className="p-0 ml-2">
                              <Dropdown.Toggle id="dropdown-basic">
                                <img src={Import} alt="" />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => setOptionDownload("pdf")}
                                    className="d-block"
                                  >
                                  {t("PDF")}  
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => setOptionDownload("excel")}
                                    className="d-block"
                                  >
                                  {t("Excel")}  
                                  </Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                                   </div>
                              {/* <div className="c-pointer">
                                <img
                                  onClick={() => getExportChat()}
                                  src={Import}
                                  alt=""
                                />
                              </div> */}
                            </div>
                            <div
                              className="yauto"
                              onScroll={(e) => {
                                const bottom =
                                  e.target.scrollHeight - e.target.scrollTop ===
                                  e.target.clientHeight;

                                if (bottom && !last_page) {
                                  setPage(page + 1);
                                  getFleet(page + 1);
                                }
                              }}
                            >
                              <table className="table tableAdmin tabelheiht">
                                <thead className="tableHead">
                                  <tr>
                                    <th>{t("Sr.no")}</th>
                                    <th>{t("Fleet Manager Name")} </th>
                                    <th>{t("Message")}</th>
                                    <th>{t("Date")}</th>
                                    <th>{t("Action")}</th>
                                  </tr>
                                </thead>
                                {FleetMangerList &&
                                FleetMangerList.length > 0 ? (
                                  FleetMangerList?.map((itemlist, index) => {
                                    return (
                                      <tbody className="tableBody">
                                        <tr>
                                          <td>{index + 1}</td>
                                          <td>
                                            {itemlist?.notification_tm_name}
                                          </td>
                                          <td>
                                            {itemlist?.notification_tm_message}
                                          </td>
                                          <td>
                                            {" "}
                                            {DateDDMMYYYY(
                                              itemlist?.notification_tm_date
                                            )}
                                          </td>

                                          <td>
                                            <div className="innerFlex">
                                              <Link
                                                to={
                                                  "/NotificationDetails2/" +
                                                  itemlist?.notification_tm_id
                                                }
                                              >
                                                <img
                                                  src={View}
                                                  className="me-3"
                                                  alt=""
                                                />
                                              </Link>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    );
                                  })
                                ) : (
                                  <></>
                                )}
                              </table>
                              {/* {last_page === true ? <NoMoreDataComp /> : ""} */}
                            </div>
                          </div>
                        </div>
                        {/* {FleetMangerList?.length > 0 && (
                          <Pagenation
                            length={FleetMangerList?.length}
                            total={totalPages}
                          />
                        )} */}
                          {FleetMangerList && FleetMangerList?.length > 0 ? (
  <>
    {/* Render your data here */}
    <Pagenation
      length={FleetMangerList?.length}
      total={totalPages}
    />
  </>
) : (
  <div><NoDataComp /></div>
)}
                      </Tab.Pane>
                    )}
                  {addonSettingData?.addon_busassistant_role == 1 &&
                    (userRole === "customer" ||
                      (accessRights &&
                        accessRights?.rights_view_vehicle_assistants == 1)) && (
                      <Tab.Pane eventKey="3">
                        <div className="" id="pushNotification-tab-wrapper">
                          <div id="">
                            <div className="all-vehical-head row vehicle-top-inputs">
                              <div className="input-section-wrapper">
                                <div className="row">
                                  <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder={t("Trip Name")}
                                      value={VehicleNameTrip}
                                      onChange={(e) => {
                                        setVehicleTrip(e.target.value);
                                        setPage(1);
                                      }}
                                    />
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder={t("Vehicle")}
                                      value={VehicleName}
                                      onChange={(e) => {
                                        setVehicleName(e.target.value);
                                        setPage(1);
                                      }}
                                    />
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder={t("helper")}
                                      value={VehicleNameDriver}
                                      onChange={(e) => {
                                        setVehicleDriver(e.target.value);
                                        setPage(1);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="right-export-btn-section-wrapper">
                                {(userRole === "customer" ||
                                  (accessRights &&
                                    accessRights?.rights_manage_push_notification ==
                                      1)) && (
                                        <div className="c-pointer">
                                  <Link
                                    to="/AddPushNotification"
                                    onClick={() =>
                                      localStorage.setItem("tab_push_noti", "3")
                                    }
                                  >
                                      {/* <img src={Export} alt="" /> */}
                                  </Link>
                                    </div>
                                )}
                                 <div className="md_dropdown right-export-btn-section-wrapper align-item-center ">
                                 <div className="c-pointer">
                                  <Link
                                    to="/AddPushNotification"
                                    onClick={() =>
                                      localStorage.setItem("tab_push_noti", "3")
                                    }
                                  >
                                      <img src={Export} alt="" />
                                  </Link>
                                    </div>
                           
                            <Dropdown className="p-0 ml-2">
                              <Dropdown.Toggle id="dropdown-basic">
                                <img src={Import} alt="" />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => setOptionDownload("pdf")}
                                    className="d-block"
                                  >
                                  {t("PDF")}  
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => setOptionDownload("excel")}
                                    className="d-block"
                                  >
                                  {t("Excel")}  
                                  </Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                                   </div>
                                {/* <div className="c-pointer">
                                  <img
                                    onClick={() => getExportChatVehicle()}
                                    src={Import}
                                    alt=""
                                  />
                                </div> */}
                              </div>
                            </div>

                            <div
                              className="yauto"
                              onScroll={(e) => {
                                const bottom =
                                  e.target.scrollHeight - e.target.scrollTop ===
                                  e.target.clientHeight;

                                if (bottom && !last_page) {
                                  setPage(page + 1);
                                  getvehicalAssist(page + 1);
                                }
                              }}
                            >
                              <table className="table tableAdmin tabelheiht">
                                <thead className="tableHead">
                                  <tr>
                                    <th>{t("Sr.no")}</th>
                                    <th>{t("Trip Name")}</th>
                                    <th>{t("Vehicle")}</th>
                                    <th>{t("helper")}</th>
                                    <th>{t("Action")}</th>
                                  </tr>
                                </thead>
                                {VehicalList && VehicalList.length > 0 ? (
                                  VehicalList?.map((itemlist, index) => {
                                    return (
                                      <tbody className="tableBody">
                                        <tr>
                                          <td>{index + 1}</td>
                                          <td>
                                            {itemlist.notification_driver_route}
                                          </td>
                                          <td>
                                            {
                                              itemlist.notification_driver_vehicle
                                            }
                                          </td>
                                          <td>
                                            {
                                              itemlist.notification_driver_driver
                                            }
                                          </td>
                                          <td>
                                            <div className="innerFlex">
                                              <Link
                                                to={
                                                  "/NotificationDetails/" +
                                                  itemlist.notification_driver_id
                                                }
                                              >
                                                <img
                                                  src={View}
                                                  className="me-3"
                                                  alt=""
                                                />
                                              </Link>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    );
                                  })
                                ) : (
                                  <></>
                                )}
                              </table>
                            </div>
                          </div>
                        </div>
                        {/* {VehicalList?.length > 0 && (
                          <Pagenation
                            length={VehicalList?.length}
                            total={totalPages}
                          />
                        )} */}
                          {VehicalList && VehicalList?.length > 0 ? (
  <>
    {/* Render your data here */}
    <Pagenation
      length={VehicalList?.length}
      total={totalPages}
    />
  </>
) : (
  <div><NoDataComp /></div>
)}
                      </Tab.Pane>
                    )}
                  {(userRole === "customer" ||
                    (accessRights && accessRights?.rights_view_admin == 1)) && (
                    <Tab.Pane eventKey="4">
                      <div className="">
                        <div id="">
                          <div className="all-vehical-head row vehicle-top-inputs">
                            <div className="input-section-wrapper">
                              <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={t("Trip Name")}
                                    value={AdministratorName}
                                    onChange={(e) => {
                                      setAdminsterName(e.target.value);
                                      setExportName(e.target.value);

                                      setPage(1);
                                    }}
                                  />
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                  {/* <select
                                  required
                                  className="form-select"
                                  aria-label="Default select example"
                                  placeholder="Vehicle"
                                >
                                  <option value="">Vehicle</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select> */}
                                </div>
                              </div>
                            </div>
                            <div className="right-export-btn-section-wrapper">
                              {(userRole === "customer" ||
                                (accessRights &&
                                  accessRights?.rights_manage_push_notification ==
                                    1)) && (
                                <div className="c-pointer ">
                                  <Link
                                    to="/AddTripFleet"
                                    onClick={() =>
                                      localStorage.setItem("tab_push_noti", "4")
                                    }
                                  >
                                    {/* <img src={Export} alt="" /> */}
                                  </Link>
                                </div>
                              )} 
                              <div className="c-pointer">
                                <img
                                  onClick={() => getExportChat()}
                                  // src={Import}
                                  alt=""
                                />
                                 <div className="md_dropdown right-export-btn-section-wrapper align-item-center ">
                                 <div className="c-pointer ">
                                  <Link
                                    to="/AddTripFleet"
                                    onClick={() =>
                                      localStorage.setItem("tab_push_noti", "4")
                                    }
                                  >
                                    <img src={Export} alt="" />
                                  </Link>
                                </div>
                            <Dropdown className="p-0 ml-2">
                              <Dropdown.Toggle id="dropdown-basic">
                                <img src={Import} alt="" />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => setOptionDownload("pdf")}
                                    className="d-block"
                                  >
                                  {t("PDF")}  
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => setOptionDownload("excel")}
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
                          <div
                            className="yauto"
                            onScroll={(e) => {
                              const bottom =
                                e.target.scrollHeight - e.target.scrollTop ===
                                e.target.clientHeight;

                              if (bottom && !last_page) {
                                setPage(page + 1);
                                getAdminster(page + 1);
                              }
                            }}
                          >
                            <table className="table tableAdmin tabelheiht">
                              <thead className="tableHead">
                                <tr>
                                  <th>{t("Sr.no")}</th>
                                  <th>{t("Name")}</th>
                                  <th>{t("Massage")}</th>
                                  <th>{t("Date")}</th>
                                </tr>
                              </thead>
                              {Adminster && Adminster.length > 0 ? (
                                Adminster?.map((itemlist, index) => {
                                  return (
                                    <tbody className="tableBody">
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>{itemlist.notification_tm_name}</td>
                                        <td>
                                          {itemlist.notification_tm_message}
                                        </td>

                                        <td>
                                          {" "}
                                          {DateDDMMYYYY(
                                            itemlist.notification_tm_date
                                          )}
                                        </td>

                                        <td>
                                          <div className="innerFlex">
                                            <Link
                                              to={
                                                "/NotificationDetails2/" +
                                                itemlist.notification_tm_id
                                              }
                                            >
                                              <img
                                                src={View}
                                                className="me-3"
                                                alt=""
                                              />
                                            </Link>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  );
                                })
                              ) : (
                                <></>
                              )}
                            </table>
                            {/* {last_page === true ? <NoMoreDataComp /> : ""} */}
                          </div>
                        </div>
                      </div>
                      {/* {Adminster?.length > 0 && (
                        <Pagenation
                          length={Adminster?.length}
                          total={totalPages}
                        />
                      )} */}
                        {Adminster && Adminster.length > 0 ? (
  <>
    {/* Render your data here */}
    <Pagenation
      length={Adminster.length}
      total={totalPages}
    />
  </>
) : (
  <div><NoDataComp /></div>
)}
                    </Tab.Pane>
                  )}
                  {addonSettingData?.addon_dispatch == 1 &&
                    (userRole === "customer" ||
                      (accessRights &&
                        accessRights?.rights_view_helper == 1)) && (
                      <Tab.Pane eventKey="5">
                        <div className="">
                          <div id="">
                            <div className="all-vehical-head row vehicle-top-inputs">
                              <div className="input-section-wrapper">
                                <div className="row">
                                  <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder={t("Trip Name")}
                                      value={DiliverPerson}
                                      onChange={(e) => {
                                        setDiliverPersonName(e.target.value);
                                        setExportName(e.target.value);

                                        setPage(1);
                                      }}
                                    />
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                    {/* <select
                                  required
                                  className="form-select"
                                  aria-label="Default select example"
                                  placeholder="Vehicle"
                                >
                                  <option value="">Vehicle</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select> */}
                                  </div>
                                </div>
                              </div>
                              <div className="right-export-btn-section-wrapper">
                                {(userRole === "customer" ||
                                  (accessRights &&
                                    accessRights?.rights_manage_push_notification ==
                                      1)) && (
                                  <div className="c-pointer">
                                    <Link
                                      to="/AddTripFleet"
                                      onClick={() =>
                                        localStorage.setItem(
                                          "tab_push_noti",
                                          "5"
                                        )
                                      }
                                    >
                                      {/* <img src={Export} alt="" /> */}
                                    </Link>
                                  </div>
                                )}
                                 <div className="md_dropdown right-export-btn-section-wrapper align-item-center ">
                                 <div className="c-pointer ">
                                 <Link
                                      to="/AddTripFleet"
                                      onClick={() =>
                                        localStorage.setItem(
                                          "tab_push_noti",
                                          "5"
                                        )
                                      }
                                    >
                                    <img src={Export} alt="" />
                                  </Link>
                                </div>
                            <Dropdown className="p-0 ml-2">
                              <Dropdown.Toggle id="dropdown-basic">
                                <img src={Import} alt="" />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => setOptionDownload("pdf")}
                                    className="d-block"
                                  >
                                  {t("PDF")}  
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => setOptionDownload("excel")}
                                    className="d-block"
                                  >
                                  {t("Excel")}  
                                  </Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                                   </div>
                                <div className="c-pointer">
                                  <img
                                    onClick={() => getExportChat()}
                                    // src={Import}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                            <div
                              className="yauto"
                              onScroll={(e) => {
                                const bottom =
                                  e.target.scrollHeight - e.target.scrollTop ===
                                  e.target.clientHeight;

                                if (bottom && !last_page) {
                                  setPage(page + 1);
                                  getDiliverPerson(page + 1);
                                }
                              }}
                            >
                              <table className="table tableAdmin tabelheiht">
                                <thead className="tableHead">
                                  <tr>
                                    <th>{t("Sr.no")}</th>
                                    <th>{t("Trip Name")}</th>
                                    <th>{t("Massage")}</th>
                                    <th>{t("Date")}</th>
                                    <th>{t("Action")}</th>
                                  </tr>
                                </thead>
                                {DiliverList && DiliverList.length > 0 ? (
                                  DiliverList?.map((itemlist, index) => {
                                    return (
                                      <tbody className="tableBody">
                                        <tr>
                                          <td>{index + 1}</td>
                                          <td>
                                            {itemlist.notification_tm_name}
                                          </td>
                                          <td>
                                            {itemlist.notification_tm_message}
                                          </td>

                                          <td>
                                            {" "}
                                            {DateDDMMYYYY(
                                              itemlist?.notification_tm_date
                                            )}
                                          </td>

                                          <td>
                                            <div className="innerFlex">
                                              <Link
                                                to={
                                                  "/NotificationDetails2/" +
                                                  itemlist.notification_tm_id
                                                }
                                              >
                                                <img
                                                  src={View}
                                                  className="me-3"
                                                  alt=""
                                                />
                                              </Link>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    );
                                  })
                                ) : (
                                  <></>
                                )}
                              </table>
                              {/* {last_page === true ? <NoMoreDataComp /> : ""} */}
                            </div>
                          </div>
                        </div>
                        {/* {DiliverList?.length > 0&&DiliverList?.length===0 &&  <NoDataComp /> && (
                          <Pagenation
                            length={DiliverList?.length}
                            total={totalPages}
                          />
                        )} */}
                    {DiliverList && DiliverList.length > 0 ? (
  <>
    {/* Render your data here */}
    <Pagenation
      length={DiliverList.length}
      total={totalPages}
    />
  </>
) : (
  <div><NoDataComp /></div>
)}


                      </Tab.Pane>
                    )}
                  {addonSettingData?.addon_dispatch == 1 &&
                    (userRole === "customer" ||
                      (accessRights &&
                        accessRights?.rights_view_helper == 1)) && (
                      <Tab.Pane eventKey={DynamicUserIndex}>
                        <div className="">
                          <div id="">
                            <div className="all-vehical-head row vehicle-top-inputs">
                              <div className="input-section-wrapper">
                                <div className="row">
                                  <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder={t("Role Name")}
                                      value={userListRole.role_name}
                                      onChange={(e) => {
                                        setSelectedRoleId(e.target.value);
                                        setExportName(e.target.value);

                                        setPage(1);
                                      }}
                                    />
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                                    {/* <select
                                  required
                                  className="form-select"
                                  aria-label="Default select example"
                                  placeholder="Vehicle"
                                >
                                  <option value="">Vehicle</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select> */}
                                  </div>
                                </div>
                              </div>
                              <div className="right-export-btn-section-wrapper">
                                {(userRole === "customer" ||
                                  (accessRights &&
                                    accessRights?.rights_manage_push_notification ==
                                      1)) && (
                                  <div className="c-pointer">
                                    <Link
                                      to="/AddTripFleet"
                                      
                                    >
                                      {/* <img src={Export} alt="" /> */}
                                    </Link>
                                  </div>
                                )}
                                 <div className="md_dropdown right-export-btn-section-wrapper align-item-center ">
                                 <div className="c-pointer ">
                                 <Link
                                      to="/AddTripFleet"
                                      
                                    >
                                    <img src={Export} alt="" />
                                  </Link>
                                </div>
                            <Dropdown className="p-0 ml-2">
                              <Dropdown.Toggle id="dropdown-basic">
                                <img src={Import} alt="" />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => setOptionDownload("pdf")}
                                    className="d-block"
                                  >
                                  {t("PDF")}  
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link
                                    onClick={() => setOptionDownload("excel")}
                                    className="d-block"
                                  >
                                  {t("Excel")}  
                                  </Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                                   </div>
                                <div className="c-pointer">
                                  <img
                                    onClick={() => getExportChat()}
                                    // src={Import}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                            <div
                              className="yauto"
                              onScroll={(e) => {
                                const bottom =
                                  e.target.scrollHeight - e.target.scrollTop ===
                                  e.target.clientHeight;

                                if (bottom && !last_page) {
                                  setPage(page + 1);
                                  getDiliverPerson(page + 1);
                                }
                              }}
                            >
                              
                              <table className="table tableAdmin tabelheiht">
                                <thead className="tableHead">
                                  <tr>
                                    <th>{t("Sr.no")}</th>
                                    <th>{t("Role Name")}</th>
                                    <th>{t("Massage")}</th>
                                    <th>{t("Date")}</th>
                                    <th>{t("Action")}</th>
                                  </tr>
                                </thead>
                                {TransportMangerList && TransportMangerList?.length > 0 ? (
                                  TransportMangerList?.map((itemlist, index) => {
                                    return (
                                      <tbody className="tableBody">
                                        <tr>
                                          <td>{index + 1}</td>
                                          <td>
                                            {itemlist.notification_tm_name}
                                          </td>
                                          <td>
                                            {itemlist.notification_tm_message}
                                          </td>

                                          <td>
                                            {" "}
                                            {DateDDMMYYYY(
                                              itemlist?.notification_tm_date
                                            )}
                                          </td>

                                          <td>
                                            <div className="innerFlex">
                                              <Link
                                                to={
                                                  "/NotificationDetails2/" +
                                                  itemlist.notification_tm_id
                                                }
                                              >
                                                <img
                                                  src={View}
                                                  className="me-3"
                                                  alt=""
                                                />
                                              </Link>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    );
                                  })
                                ) : (
                                  <></>
                                )}
                              </table>
                              {/* {last_page === true ? <NoMoreDataComp /> : ""} */}
                            </div>
                          </div>
                        </div>
                        {/* {TransportMangerList?.length > 0 && (
                          <Pagenation
                            length={TransportMangerList?.length}
                            total={totalPages}
                          />
                        )} */}
                          {TransportMangerList && TransportMangerList?.length > 0 ? (
  <>
    {/* Render your data here */}
    <Pagenation
      length={TransportMangerList?.length}
      total={totalPages}
    />
  </>
) : (
  <div><NoDataComp /></div>
)}
                      </Tab.Pane>
                    )}

                  {/* /////for role////// */}
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PushNotification;

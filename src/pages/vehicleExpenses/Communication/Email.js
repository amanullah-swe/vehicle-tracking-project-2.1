import React, { useContext, useEffect, useState } from "react";
import { Nav, Tab, Tabs } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import View from "../../../assets/images/Group.svg";
import Export from "../../../assets/images/Edit-Camunication.svg";
// import Export from "../../../assets/images/Add-Communication.svg";
import { motion } from "framer-motion";
import Pagenation from "../../../sharedComponent/Pagenation";
import { simpleGetCall, simplePostCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import NoMoreDataComp from "../../../sharedComponent/NoMoreDataComp";
import { useTranslation } from "react-i18next";
import { jsPDF } from "jspdf";
import Import from "../../../assets/images/ic-Import.svg";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NoDataComp from "../../../sharedComponent/NoDataComp";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const Email = () => {
  
 const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;
  const addonSettingData = useSelector(state => state.auth.addonModule)
  const [DriversList, setDriversList] = useState([]);

 const {
    sidebar,
    EmailStatus,
    setVehicleStatus,
    setEmailStatus,
    setDriverStatus,recordsPerPage
  } = useContext(AppContext);
const [currentTab, setCurrentTab] = useState("0");
const [currentTabParams1, setCurrentTabParams1] = useState(currentTab);
const [loading, setLoading] = useState(false);
 const [page, setPage] = useState(1);
  const [last_page, setlast_page] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
 const [emaillist, setEmailList] = useState([]);
 console.log(emaillist,"emaillist222222222222222222222");
 const [taleeb_tab, set_taleeb_tab] = useState(localStorage.getItem('taleeb_tab') || '0');

  // filter State
  const { t, i18n } = useTranslation();
 const [TransportName, setTransportName] = useState("");
  const [driverSubject, setdriverSubject] = useState("");
  const [VehcileNameDeiver, setVehicleNameDriver] = useState("");
  const [TripVehicle, setTripVehicle] = useState("");
  const [TripDriver, setTripDriver] = useState("");
  const [routeName, setrouteName] = useState("");
  const [VehicleName, setVehicleName] = useState("");
  const [VehicleNameSubject, setVehicleSubject] = useState("");
  const [VehicleNameDriver, setVehicleDriver] = useState("");
  const [AdministratorName, setAdminsterName] = useState("");
  const [AdministratorSubject, setAdminsterSubject] = useState("");
  const [ExportStatus, setExportStatus] = useState("customer");
  const [pdfData, setpdfData] = useState("");
  const [OptionDownload, setOptionDownload] = useState("");
  const [DynamicUserIndex, setDynamicUserIndex] = useState("");
  const [DynamicUserSelected, setDynamicUserSelected] = useState("");
  console.log("DynamicUserSelected",DynamicUserSelected);
  const [activeTabIndex, setActiveTabIndex] = useState(null);
  console.log(activeTabIndex,"activeTabIndex");
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [userListRole, setUserListRole] = useState([]);
console.log ("taleeb_EXPORTSTATUS : ", ExportStatus)
  // End

  useEffect(() => {
    if(DynamicUserSelected ){
      getEmaillist(1);
    }
   }, [DynamicUserSelected,EmailStatus]);

   
  
  const handleSelect = () => {
    // taleeb'addition to original code//
       localStorage.setItem('taleeb_tab', '1')
/////////////////////////////////////////
    // getTranspoertin(1);
    setExportStatus("transport-manager")
   
    setEmailStatus("transport-manager");
    getEmaillist(1, "transport-manager");
    setPage(1);
    setTransportName("");
    setVehicleName("");
    setTripVehicle("");
    setTripDriver("");
    setrouteName("");
    // setEmailStatus("transport-manager");
    // getEmaillist(1, "transport-manager");
    // setExportStatus("transport-manager")
  };


  const handleSelectDrivers = () => {

    // getDrivers(1);
    getDriverList(1);
    setPage(1);
    setTransportName("");
    setVehicleName("");
    setTripVehicle("");
    setTripDriver("");
    setrouteName("");
    setDriverStatus("driver");
    setVehicleStatus("vehicle");
    // setExportStatus("customer")

        // taleeb'addition to original code//
localStorage.setItem('taleeb_tab', '2')
/////////////////////////////////////////

  };

 


  const handleSelectFleet = () => {
    // taleeb'addition to original code//
    localStorage.removeItem('taleeb_tab')
localStorage.setItem('taleeb_tab', '4')
/////////////////////////////////////////
    // getFleet(1);
    setExportStatus("fleet-manager")
    setEmailStatus("fleet-manager");
    getEmaillist(1, "fleet-manager");
    setPage(1);
    setTransportName("");
    setVehicleName("");
    setTripVehicle("");
    setTripDriver("");
    setrouteName("");
    // setEmailStatus("fleet-manager");
    // getEmaillist(1, "fleet-manager");
    // setExportStatus("fleet-manager")

   
  };
  const handleSelectVehicleAssistant = () => {
    // taleeb'addition to original code//
localStorage.setItem('taleeb_tab', '0')
/////////////////////////////////////////
    // getFleet(1);
    setExportStatus("vehicle-assistant")
    setEmailStatus("vehicle-assistant");
    getEmaillist(1, "vehicle-assistant");
    setPage(1);
    setTransportName("");
    setVehicleName("");
    setTripVehicle("");
    setTripDriver("");
    setrouteName("");
    // setEmailStatus("vehicle-assistant");
    // getEmaillist(1, "vehicle-assistant");
    // setExportStatus("vehicle-assistant")
  };
  const handleSelectVehicle = () => {

    // taleeb'addition to original code//
localStorage.setItem('taleeb_tab', '5')
/////////////////////////////////////////
    // getvehicalAssist(1);
    setPage(1);
    setTransportName("");
    setVehicleName("");
    setTripVehicle("");
    setTripDriver("");
    setrouteName("");
    setDriverStatus("driver");

    setVehicleStatus("vehicle");
    getVehicleList(1, "vehicle-assistant");
  };
  /* useEffect(() => {
    handleSelectAdminter()
  }); */
  const handleSelectAdminter = () => {
// taleeb'addition to original code//
localStorage.setItem('taleeb_tab', '0')
/////////////////////////////////////////
    setPage(1);
    // getAdminster(1);
    setEmailStatus("customer");
    getEmaillist(1, "customer");
    setExportStatus("customer")

    setTransportName("");
    setVehicleName("");
    setTripVehicle("");
    setTripDriver("");
    setrouteName("");
  };
  const handleSelectDiliverPerson = () => {

    // taleeb'addition to original code//
localStorage.setItem('taleeb_tab', '3')
/////////////////////////////////////////
    setPage(1);
    //  getDiliverPerson(1)
    setExportStatus("delivery-person")
    setEmailStatus("delivery-person");
    
    getEmaillist(1, "delivery-person");

    setTransportName("");
    setVehicleName("");
    setTripVehicle("");
    setTripDriver("");
    setrouteName("");
    // getEmaillist(1, "delivery-person");
  };
  const handleSelectRole = (RoleData,userIndex,tabIndex) => {
    setDynamicUserIndex(userIndex)
    console.log(DynamicUserIndex,"DynamicUserIndex2222222222222");
    setActiveTabIndex(tabIndex);
    console.log(activeTabIndex,"activeTabIndex");
    setDynamicUserSelected(RoleData)
    // localStorage.setItem("tab_push_noti", "6");
    setPage(1);
  
    setEmailStatus(RoleData);
    setExportStatus(RoleData);
    setTransportName("");
    
    setTripVehicle("");
    setTripDriver("");
    
    handleRoleClick();
  };
  const handleRoleClick = (roleId) => {
    setSelectedRoleId(roleId);
   };
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
  useEffect(() => {
    geUserListList(1);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
    localStorage.getItem('taleeb_tab') === '0' && handleSelectAdminter();
    localStorage.getItem('taleeb_tab') === '1' && handleSelect();
    localStorage.getItem('taleeb_tab') === '2' && handleSelectDrivers();
    localStorage.getItem('taleeb_tab') === '3' && handleSelectDiliverPerson();
    localStorage.getItem('taleeb_tab') === '4' && handleSelectFleet();
    localStorage.getItem('taleeb_tab') === '5' && handleSelectVehicle();
  }, 300); 

  
 
  
  return () => clearTimeout(timer);
 } , [ localStorage.getItem('taleeb_tab'),]);

 /* useEffect(() => {
  const timer = setTimeout(() => {
    // Call the function to fetch driver list after 2 seconds
    handleSelectDrivers()
    handleSelectVehicle()
    

  }, 100); // 2000 milliseconds = 2 seconds

  // Clean up the timer to prevent memory leaks
  return () => clearTimeout(timer);
}, []); */

  function getEmaillist(currentPage, status) {
    page == 1 && !currentPage && setLoading(true);
    let newRequestBody = JSON.stringify({
      name: AdministratorName,
      page: currentPage,
      status: status,
      type: EmailStatus, 
      // type: localStorage.getItem('taleeb_tab') === '0' ? "customer": localStorage.getItem('taleeb_tab') === '1' ? "transport-manager" : localStorage.getItem('taleeb_tab') === '3' ? "delivery-person" : localStorage.getItem('taleeb_tab') === '4'? ExportStatus : localStorage.getItem('taleeb_tab') === '4' ? 'fleet-manager' : 'customer' ,
      subject: AdministratorSubject,
      message: "",
      page_limit:recordsPerPage,
      format:OptionDownload
    });
    simplePostCall(ApiConfig.ADMINISTRATOR_EMAIL, newRequestBody)
      .then((data) => {
        if (data.result) {
          const firstKey = data.file_path;
          setpdfData(firstKey);
          if (!firstKey) {
            setEmailList(data.data);
          
            console.log(data.data, "data.data************pdf");
          }else{
            setOptionDownload("")
             
          }
          setTotalPages(data.total);

          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];
          let TransportData = FilterData?.map((eachteam, index) => {
            return {
              ...eachteam,
              email_staff_name: eachteam.email_staff_name || "",
              email_staff_subject: eachteam.email_staff_subject || "",
              email_staff_message: eachteam.email_staff_message || "",
            };
          });

          if (currentPage === 1 || currentPage === 0) {
            setEmailList(data.data);
          } 
          
          else {
            setEmailList([...emaillist, ...TransportData]);
          }
        } else {
          // setEmailList(0);

          // setlast_page(false);
          // setTotalPages(0);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getDriverList(1);
  }, [routeName, VehicleName, VehicleNameDriver, driverSubject]);
 function getDriverList(currentPage) {
    page == 1 && !currentPage && setLoading(true);
    let newRequestBody = JSON.stringify({
      vehicle: VehicleName,
      page: currentPage,
      route: routeName,
      type: ExportStatus,
      name: AdministratorName,
       subject: driverSubject,
      driver: VehicleNameDriver,
      page_limit:recordsPerPage,
      format:OptionDownload
    });
    simplePostCall(ApiConfig.EMAIL_DRIVER_AND_DELIVER, newRequestBody)
      .then((data) => {
        if (data.result) {
          const firstKey = data.file_path;
          setpdfData(firstKey);
          if (!firstKey) {
            setEmailList(data.data);
          
            console.log(data.data, "data.data************pdf");
          }else{
            setOptionDownload("")
            setEmailList()
          }
          setTotalPages(data.total);

          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];
          console.log("taleeb_FilterData_Driver : ", FilterData)
          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,
              email_driver_route: eachteam.email_driver_route || "",
              email_driver_subject: eachteam.email_driver_subject || "",
              email_driver_message: eachteam.email_driver_message || "",
            };
          });

          if (currentPage === 1 || currentPage === 0) {
            setEmailList(data.data);
          } else {
            setEmailList([...emaillist, ...TransportData]);
          }
        } else {
          setEmailList(0);
        
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

  useEffect(() => {
    getVehicleList(1);
  }, [VehcileNameDeiver, TripVehicle, TripDriver, VehicleNameSubject]);
 function getVehicleList(currentPage) {
    page == 1 && !currentPage && setLoading(true);
    let newRequestBody = JSON.stringify({
      vehicle: TripVehicle,
      page: currentPage,
      route: VehcileNameDeiver,
      subject: VehicleNameSubject,
      helper: TripDriver,
      page_limit:recordsPerPage,
      format:OptionDownload
    });
    simplePostCall(ApiConfig.EMAIL_HELPER_LIST, newRequestBody)
      .then((data) => {
        if (data.result) {
          const firstKey = data.file_path;
          setpdfData(firstKey);
          if (!firstKey) {
            setEmailList(data.data);
          
            console.log(data.data, "data.data************pdf");
          }else{
            setOptionDownload("")
          }
          setTotalPages(data.total);

          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];
          // console.log("taleeb_FilterData : ", FilterData)
          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,
              email_driver_route: eachteam.email_driver_route || "",
              email_driver_subject: eachteam.email_driver_subject || "",
              email_driver_message: eachteam.email_driver_message || "",
            };
          });

          if (currentPage === 1 || currentPage === 0) {
            setEmailList(data.data);
          } else {
            setEmailList([...emaillist, ...TransportData]);
          }
        } else {
          setEmailList(0);
         
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


  useEffect(() => {
    getEmaillist(1, EmailStatus);
  }, [AdministratorName, AdministratorSubject, EmailStatus]);
  useEffect(() => {
    getEmaillist(1,"customer");
  }, []);
 //Export 
  function getExportChat() {
  let newRequestBody = JSON.stringify({
      type: ExportStatus,
      name: AdministratorName,
      subject: AdministratorSubject,
      message: ""
  });
    simplePostCall(ApiConfig.EMAIL_LIST_EXPORTL, newRequestBody)
      .then((data) => {
        if (data.result) {

          pdfFormat(data.data)

        } else {

        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
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
      // getEmaillist(1, EmailStatus)
      getEmaillist()
    }
  }, [
    OptionDownload,
    EmailStatus,
     
  ]);

  const pdfFormat = (pdfData) => {

    // let chatsData = await getExportChat()
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Email";
    const headers = [
      ["Sr. No.", "Name", "Subject",],
    ];
    var data = [];


    pdfData.map((item, index) => {
      data.push([
        index + 1,
        item.email_staff_name,
        item.email_staff_subject


      ])
    })

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
    return (
      <div>

      </div>
    );
  };

  /// Export Diraver 
  function getExportChatDriver() {
   let newRequestBody = JSON.stringify({
      route: routeName,
      vehicle: VehicleName,
      driver: VehicleNameDriver,
      subject: driverSubject,
  });
    simplePostCall(ApiConfig.EMAIL_DRIVER_EXPORT, newRequestBody)
      .then((data) => {
        if (data.result) {
          const firstKey = data.file_path;
          setpdfData(firstKey);
          if (!firstKey) {
            getEmaillist(data.data);
          
            console.log(data.data, "data.data************pdf");
          }
        // pdfFormatDriver(data.data)
       } else {

        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // const pdfFormatDriver = (pdfData) => {

  //   // let chatsData = await getExportChat()
  //   const unit = "pt";
  //   const size = "A4"; // Use A1, A2, A3 or A4
  //   const orientation = "portrait"; // portrait or landscape
  //   const marginLeft = 40;

  //   const doc = new jsPDF(orientation, unit, size);
  //   doc.setFontSize(15);
  //   const title = "Eamol";
  //   const headers = [
  //     ["Sr. No.", "Trip Name", "Vehicle"],

  //   ];
  //   var data = [];


  //   pdfData.map((item, index) => {
  //     data.push([
  //       index + 1,
  //       item.email_driver_route,
  //       item.email_driver_vehicle,


  //     ])
  //   })

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
  //   return (
  //     <div>

  //     </div>
  //   );
  // };




  /// Export vehicle
  function getExportChatVehicle() {
   let newRequestBody = JSON.stringify({
      route: VehcileNameDeiver,
      vehicle: TripVehicle,
      helper: TripDriver,
      subject: VehicleNameSubject,
     });
    simplePostCall(ApiConfig.VEHICLE_LIST_EXPOERT, newRequestBody)
      .then((data) => {
        if (data.result) {
          const firstKey = data.file_path;
          setpdfData(firstKey);
          if (!firstKey) {
            setEmailList(data.data);
          
            console.log(data.data, "data.data************pdf");
          }

          // pdfFormatVehicle(data.data)

        } else {

        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // const pdfFormatVehicle = (pdfData) => {

  //   // let chatsData = await getExportChat()
  //   const unit = "pt";
  //   const size = "A4"; // Use A1, A2, A3 or A4
  //   const orientation = "portrait"; // portrait or landscape
  //   const marginLeft = 40;

  //   const doc = new jsPDF(orientation, unit, size);
  //   doc.setFontSize(15);
  //   const title = "Email";
  //   const headers = [
  //     ["Sr. No.", "Trip Name", "Vehicle",],

  //   ];
  //   var data = [];


  //   pdfData.map((item, index) => {
  //     data.push([
  //       index + 1,
  //       item.email_helper_route,
  //       item.email_helper_vehicle,


  //     ])
  //   })

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
  //   return (
  //     <div>

  //     </div>
  //   );
  // };

  // accessRights?.rights_view_admin ||
  //                         accessRights?.rights_view_tm ||
  //                         accessRights?.rights_view_driver ||
  //                         accessRights?.rights_view_helper ||
  //                         accessRights?.rights_view_fleet_manager ||
  //                         accessRights?.rights_view_vehicle_assistants


  
 
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
            <Tab.Container id="left-tabs-example" /* defaultActiveKey="0" */ defaultActiveKey={localStorage.getItem('taleeb_tab') ? localStorage.getItem('taleeb_tab'): '0'}>
              <Nav
                variant="pills"
                id="newTabMai"
                className=""
                onSelect={(selectedKey) => setCurrentTab(`${selectedKey}`)}
              >
             {(  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_view_admin==1)) &&   <Nav.Item key="0">
                  <Nav.Link eventKey="0" onClick={handleSelectAdminter} >
                   {t("Administrator")} 
                  </Nav.Link>
                </Nav.Item>}
        { (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_view_tm==1)) &&       <Nav.Item key="1">
                  <Nav.Link eventKey="1" onClick={handleSelect}>
                   {t("Transport Manager")} 
                  </Nav.Link>
                </Nav.Item>}
        { (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_view_driver==1)) &&       <Nav.Item key="2">
                  <Nav.Link eventKey="2" onClick={handleSelectDrivers}>
                  {t("Drivers")}  
                  </Nav.Link>
                </Nav.Item>}
               {(addonSettingData?.addon_dispatch==1&& (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_view_helper==1))) &&<Nav.Item key="3">
                  <Nav.Link eventKey="3" onClick={handleSelectDiliverPerson}>
                   {t("Delivery Person")} 
                  </Nav.Link>
                </Nav.Item>}
            {( addonSettingData?.addon_fleetmanager_role==1&&  (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_view_fleet_manager==1))   )&&<Nav.Item key="4">
                  <Nav.Link eventKey="4" onClick={handleSelectFleet}>
                  {t("Fleet Manager")}  
                  </Nav.Link>
                </Nav.Item>}
          {  (addonSettingData?.addon_busassistant_role==1&&(  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_view_vehicle_assistants==1))) &&       <Nav.Item key="5">
                  <Nav.Link eventKey="5" onClick={handleSelectVehicle}>
                 {t("Vehicle Assistant")}   
                  </Nav.Link>
                </Nav.Item>}
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
                className="main-master-wrapper"
                id="email_wrapper-tab"
              >
               {(  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_view_admin==1)) &&  <Tab.Pane eventKey="0">
                  <div className="">
                    <div id="">
                      <div className="all-vehical-head row vehicle-top-inputs">
                        <div className="input-section-wrapper">
                          <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Adminstrator Name")}
                                value={AdministratorName}
                                onChange={(e) => {
                                  setAdminsterName(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Subject")}
                                value={AdministratorSubject}
                                onChange={(e) => {
                                  setAdminsterSubject(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        {
                        (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_manage_email==1)) ? (<>
                            <div className="right-export-btn-section-wrapper">
                              <div className="c-pointer mr-6" style={{marginTop:'0.43rem'}} >
                                <Link to="/ComposeEmail" onClick={() => localStorage.setItem('taleeb_tab', '0')}>
                                  <img src={Export} alt="" />
                                </Link>
                              </div>
                             {/*  <div className="c-pointer">
                                <img onClick={() => getExportChat()} src={Import} alt="" />

                              </div> */}
                               <div className="md_dropdown right-export-btn-section-wrapper ">
                            <Dropdown>
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
                           {/*  <div className="md_dropdown right-export-btn-section-wrapper ">
                            <Dropdown>
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
                                   </div> */}
                          </>) : null
                        }
                      </div>
                      <div
                        className="yauto"
                        onScroll={(e) => {
                          const bottom =
                            e.target.scrollHeight - e.target.scrollTop ===
                            e.target.clientHeight;

                          if (bottom && !last_page) {
                            setPage(page + 1);
                            getEmaillist(page + 1,"customer");
                          }
                        }}
                      >
                        <table className="table tableAdmin tabelheiht">
                          <thead className="tableHead">
                            <tr>
                              <th>{t("Sr.no")}</th>
                              <th>{t("Adminstrator Name")}</th>
                              <th>{t("Subject")}</th>
                              <th>{t("Action")}</th>
                            </tr>
                          </thead>
                          {emaillist && emaillist.length > 0 ? (
                            emaillist?.map((itemlist, index) => {
                              return (
                                <tbody className="tableBody">
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{itemlist.email_staff_name}</td>
                                    <td>{itemlist.email_staff_subject}</td>
                                    {/* <td>john@gmail.com </td> */}

                                    <td>
                                      <div className="innerFlex">
                                        <Link
                                          to={
                                            "/EmailDetailsTm/" +
                                            itemlist?.email_staff_id
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
                {/* {emaillist?.length>0&&  <Pagenation length={emaillist?.length} total={totalPages} />} */}
                {emaillist && emaillist?.length > 0 ? (
  <>
    {/* Render your data here */}
    <Pagenation
      length={emaillist?.length}
      total={totalPages}
    />
  </>
) : (
  <div><NoDataComp /></div>
)}
                </Tab.Pane>}
                { (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_view_tm==1)) && <Tab.Pane eventKey="1">
                  <div className="">
                    <div id="">
                      <div className="all-vehical-head row vehicle-top-inputs">
                        <div className="input-section-wrapper">
                          <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Transport Name")}
                                value={AdministratorName}
                                onChange={(e) => {
                                  setAdminsterName(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Subject")}
                                value={AdministratorSubject}
                                onChange={(e) => {
                                  setAdminsterSubject(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* <div className="right-export-btn-section-wrapper"> */}
                    { (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_manage_email==1)) &&    
                               /*  <div className="c-pointer" >
                            <Link to="/ComposeEmail" onClick={() => localStorage.setItem('taleeb_tab', '1')}>
                              
                           
                              <img src={Export} alt="" />
                            </Link>
                          </div> */
                          <div className="right-export-btn-section-wrapper">
                          <div className="c-pointer mr-6" style={{marginTop:'0.43rem'}} >
                            <Link to="/ComposeEmail" onClick={() => localStorage.setItem('taleeb_tab', '1')}>
                              <img src={Export} alt="" />
                            </Link>
                          </div>
                         {/*  <div className="c-pointer">
                            <img onClick={() => getExportChat()} src={Import} alt="" />

                          </div> */}
                           <div className="md_dropdown right-export-btn-section-wrapper ">
                        <Dropdown>
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
                          }
                          {/* <div className="c-pointer"> */}
                            {/* <img onClick={() => getExportChat()} src={Import} alt="" /> */}

                          {/* </div> */}
                          
                        {/* </div> */}
                      </div>
                      <div
                        className="yauto"
                        onScroll={(e) => {
                          const bottom =
                            e.target.scrollHeight - e.target.scrollTop ===
                            e.target.clientHeight;

                          if (bottom && !last_page) {
                            setPage(page + 1);
                            getEmaillist(page + 1,"transport-manager");
                          }
                        }}
                      >
                        {console.log("TALEEB_ITEMLIST : ", emaillist)}
                        <table className="table tableAdmin tabelheiht">
                          <thead className="tableHead">
                            <tr>
                              <th>{t("Sr.no")}</th>
                              <th>{t("Transport Name")} </th>

                              <th>{t("Subject")} </th>
                              <th>{t("Action")} </th>
                            </tr>
                          </thead>
                          {emaillist && emaillist.length > 0 ? (
                            emaillist?.map((itemlist, index) => {
                              return (
                                <tbody className="tableBody">
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{itemlist.email_staff_name}</td>
                                    <td>{itemlist.email_staff_subject}</td>

                                    <td>
                                      <div className="innerFlex">
                                        <Link
                                          to={
                                            "/EmailDetailsTm/" +
                                            itemlist?.email_staff_id
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
                {/* { emaillist?.length>0&&  <Pagenation length={emaillist?.length} total={totalPages} />} */}
                {emaillist && emaillist?.length > 0 ? (
  <>
    {/* Render your data here */}
    <Pagenation
      length={emaillist?.length}
      total={totalPages}
    />
  </>
) : (
  <div><NoDataComp /></div>
)}
                </Tab.Pane>}
               { (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_view_driver==1)) && <Tab.Pane eventKey="2">
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
                                value={routeName}
                                onChange={(e) => {
                                  setrouteName(e.target.value);
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
                              {/* <select
                                required
                                className="form-select"
                                aria-label="Default select example"
                                placeholder="Driver"
                              >
                                <option value="">Driver</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select> */}
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Driver")}
                                value={VehicleNameDriver}
                                onChange={(e) => {
                                  setVehicleDriver(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Subject")}
                                value={driverSubject}
                                onChange={(e) => {
                                  setdriverSubject(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="right-export-btn-section-wrapper">
                     {  (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_manage_email==1)) &&  
                              <>
                            {/*   <div className="c-pointer">
                            <Link to="/ComposeEmailHelpler" onClick={() => localStorage.setItem('taleeb_tab', '2')}>
                              <img src={Export} alt="" />
                            </Link>
                          </div>
                          <div className="c-pointer">
                            <img onClick={() => getExportChatDriver()} src={Import} alt="" />

                          </div> */}
 <div className="right-export-btn-section-wrapper">
                          <div className="c-pointer mr-5" style={{marginTop:'0.43rem'}} >
                            <Link to="/ComposeEmailHelpler" onClick={() => localStorage.setItem('taleeb_tab', '2')}>
                              <img src={Export} alt="" />
                            </Link>
                          </div>
                         {/*  <div className="c-pointer">
                            <img onClick={() => getExportChat()} src={Import} alt="" />

                          </div> */}
                           <div className="md_dropdown right-export-btn-section-wrapper ms-2 ">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                            <img src={Import} alt="" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <Link
                               
                               onClick={() => setOptionDownload("pdf")}
                                // onClick={() => getExportChatDriver()} 
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
                          
                          </>}
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
                            getDriverList(page + 1);
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
                              <th>{t("Subject")}</th>
                              <th>{t("Action")}</th>
                            </tr>
                          </thead>
                          {emaillist && emaillist?.length > 0 ? (
                            emaillist?.map((itemlist, index) => {
                              return (
                                <tbody className="tableBody">
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{itemlist?.email_driver_route}</td>
                                    <td>{itemlist?.email_driver_vehicle}</td>
                                    <td>{itemlist?.email_driver_driver}</td>
                                    <td>{itemlist?.email_driver_subject}</td>
                                    <td>
                                      <div className="innerFlex">
                                        <Link
                                          to={
                                            "/EmailDetails/" +
                                            itemlist.email_driver_id
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
                {emaillist?.length > 0 &&   <Pagenation length={emaillist?.length} total={totalPages} />}
                </Tab.Pane>}
               {(addonSettingData?.addon_dispatch==1&& (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_view_helper==1))) && <Tab.Pane eventKey="3">
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
                                  setPage(1);
                                }}
                              />
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Subject")}
                                value={AdministratorSubject}
                                onChange={(e) => {
                                  setAdminsterSubject(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* <div className="right-export-btn-section-wrapper"> */}
                    {  (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_manage_email==1)) &&  
                              <>
                             {/*  <div className="c-pointer">
                            <Link to="/ComposeEmail" onClick={() => localStorage.setItem('taleeb_tab', '3')}>
                              <img src={Export} alt="" />
                            </Link>
                          </div>
                          <div className="c-pointer">
                            <img onClick={() => getExportChat()} src={Import} alt="" />

                          </div> */}

<div className="right-export-btn-section-wrapper">
                          <div className="c-pointer mr-6 " style={{marginTop:'0.43rem'}} >
                            <Link to="/ComposeEmail" onClick={() => localStorage.setItem('taleeb_tab', '3')}>
                              <img src={Export} alt="" />
                            </Link>
                          </div>
                         {/*  <div className="c-pointer">
                            <img onClick={() => getExportChat()} src={Import} alt="" />

                          </div> */}
                           <div className="md_dropdown right-export-btn-section-wrapper ">
                        <Dropdown>
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
                          </>}
                        {/* </div> */}
                         
                      </div>
                      <div
                        className="yauto"
                        onScroll={(e) => {
                          const bottom =
                            e.target.scrollHeight - e.target.scrollTop ===
                            e.target.clientHeight;

                          if (bottom && !last_page) {
                            setPage(page + 1);
                            getEmaillist(page + 1,"delivery-person");
                          }
                        }}
                      >
                        <table className="table tableAdmin tabelheiht">
                          <thead className="tableHead">
                            <tr>
                              <th>{t("Sr.no")}</th>
                              <th>{t("Trip Name")}</th>

                              <th>{t("Subject")}</th>
                              <th>{t("Action")}</th>
                            </tr>
                          </thead>
                          {emaillist && emaillist.length > 0 ? (
                            emaillist?.map((itemlist, index) => {
                              return (
                                <tbody className="tableBody">
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{itemlist.email_staff_name}</td>
                                    <td>{itemlist.email_staff_subject}</td>

                                    <td>
                                      <div className="innerFlex">
                                        <Link
                                          to={
                                            "/EmailDetailsTm/" +
                                            itemlist.email_staff_id
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
                 {emaillist?.length>0&&  <Pagenation length={emaillist?.length} total={totalPages} />}
                </Tab.Pane>}
               { ( addonSettingData?.addon_fleetmanager_role==1&&  (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_view_fleet_manager==1))   )&&<Tab.Pane eventKey="4">
                  <div className="">
                    <div id="">
                      <div className="all-vehical-head row vehicle-top-inputs">
                        <div className="input-section-wrapper">
                          <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Fleet Name")}
                                value={AdministratorName}
                                onChange={(e) => {
                                  setAdminsterName(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Subject")}
                                value={AdministratorSubject}
                                onChange={(e) => {
                                  setAdminsterSubject(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="right-export-btn-section-wrapper">
                      {  (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_manage_email==1)) &&  
                              <>
                            {/*   <div className="c-pointer" >
                            <Link to="/ComposeEmail" onClick={() => localStorage.setItem('taleeb_tab', '4')}>
                              <img src={Export} alt="" />
                            </Link>
                          </div>
                          <div className="c-pointer">
                            <img onClick={() => getExportChat()} src={Import} alt="" />

                          </div> */}

<div className="right-export-btn-section-wrapper">
                          <div className="c-pointer mr-6" style={{marginTop:'0.43rem'}} >
                            <Link to="/ComposeEmail" onClick={() => localStorage.setItem('taleeb_tab', '4')}>
                              <img src={Export} alt="" />
                            </Link>
                          </div>
                         {/*  <div className="c-pointer">
                            <img onClick={() => getExportChat()} src={Import} alt="" />

                          </div> */}
                           <div className="md_dropdown right-export-btn-section-wrapper ">
                        <Dropdown>
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
</>}
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
                            getEmaillist(page + 1,"fleet-manager");
                          }
                        }}
                      >
                        <table className="table tableAdmin tabelheiht">
                          <thead className="tableHead">
                            <tr>
                              <th>{t("Sr.no")}</th>
                              <th>{t("Fleet Name")}</th>

                              <th>{t("Subject")}</th>
                              <th>{t("Action")}</th>
                            </tr>
                          </thead>
                          {emaillist && emaillist.length > 0 ? (
                            emaillist?.map((itemlist, index) => {
                              return (
                                <tbody className="tableBody">
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{itemlist.email_staff_name}</td>
                                    <td>{itemlist.email_staff_subject}</td>

                                    <td>
                                      <div className="innerFlex">
                                        <Link
                                          to={
                                            "/EmailDetailsTm/" +
                                            itemlist.email_staff_id
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
          {  emaillist?.length>0&&       <Pagenation length={emaillist?.length} total={totalPages} />}
                </Tab.Pane>}
             { (addonSettingData?.addon_busassistant_role==1&&(  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_view_vehicle_assistants==1))) &&    <Tab.Pane eventKey="5">
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
                                value={VehcileNameDeiver}
                                onChange={(e) => {
                                  setVehicleNameDriver(e.target.value);
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
                                placeholder={t("helper")}
                                value={TripDriver}
                                onChange={(e) => {
                                  setTripDriver(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Subject")}
                                value={VehicleNameSubject}
                                onChange={(e) => {
                                  setVehicleSubject(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="right-export-btn-section-wrapper">
                     { (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_manage_email==1)) &&
                                   <>
                                  {/*  <div className="c-pointer " >
                            <Link to="/ComposeEmailHelpler" onClick={() => localStorage.setItem('taleeb_tab', '5') 
                          }>
                              <img src={Export} alt="" />
                            </Link>
                          </div>
                          <div className="c-pointer">
                            <img onClick={() => getExportChatVehicle()} src={Import} alt="" />

                          </div> */}
<div className="right-export-btn-section-wrapper">
                          <div className="c-pointer mr-5" style={{marginTop:'0.43rem'}} >
                            <Link to="/ComposeEmailHelpler" onClick={() => localStorage.setItem('taleeb_tab', '5')}>
                              <img src={Export} alt="" />
                            </Link>
                          </div>
                         {/*  <div className="c-pointer">
                            <img onClick={() => getExportChat()} src={Import} alt="" />

                          </div> */}
                           <div className="md_dropdown right-export-btn-section-wrapper ms-2 ">
                        <Dropdown>
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

</>}
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
                            getVehicleList(page + 1);
                          }
                        }}
                      >
                        <table className="table tableAdmin tabelheiht">
                          <thead className="tableHead">
                            <tr>
                              <th>{t("Sr.no")}</th>
                              <th>{t("Trip Name")}</th>
                              <th>{t("Vehicle")}</th>
                              <th>{t("Helper")}</th>
                              <th>{t("Subject")}</th>
                              <th>{t("Action")}</th>
                            </tr>
                          </thead>
                          {emaillist && emaillist.length > 0 ? (
                            emaillist?.map((itemlist, index) => {
                              return (
                                <tbody className="tableBody">
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{itemlist.email_helper_route}</td>
                                    <td>{itemlist.email_helper_vehicle}</td>
                                    <td>{itemlist.email_helper_helper}</td>
                                    <td>{itemlist.email_helper_subject}</td>
                                    {console.log("TAleeb_VA : ",itemlist.email_helper_route)}
                                    <td>
                                      <div className="innerFlex">
                                        <Link
                                          to={
                                            "/EmailDetails/" +
                                            itemlist.email_helper_id
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
               { emaillist?.length>0&&   <Pagenation length={emaillist?.length} total={totalPages} />}
                </Tab.Pane>}
                
                { (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_view_tm==1)) && <Tab.Pane eventKey={DynamicUserIndex}>
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
                                  setAdminsterName(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Subject")}
                                value={AdministratorSubject}
                                onChange={(e) => {
                                  setAdminsterSubject(e.target.value);
                                  setPage(1);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* <div className="right-export-btn-section-wrapper"> */}
                    { (  (userRole === "customer" )||
                            (accessRights &&
                              accessRights?.rights_manage_email==1)) &&    
                               /*  <div className="c-pointer" >
                            <Link to="/ComposeEmail" onClick={() => localStorage.setItem('taleeb_tab', '1')}>
                              
                           
                              <img src={Export} alt="" />
                            </Link>
                          </div> */
                          <div className="right-export-btn-section-wrapper">
                          <div className="c-pointer mr-6" style={{marginTop:'0.43rem'}} >
                            <Link to="/ComposeEmail" onClick={() => localStorage.setItem('taleeb_tab', '1')}>
                              <img src={Export} alt="" />
                            </Link>
                          </div>
                         {/*  <div className="c-pointer">
                            <img onClick={() => getExportChat()} src={Import} alt="" />

                          </div> */}
                           <div className="md_dropdown right-export-btn-section-wrapper ">
                        <Dropdown>
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
                          }
                          {/* <div className="c-pointer"> */}
                            {/* <img onClick={() => getExportChat()} src={Import} alt="" /> */}

                          {/* </div> */}
                          
                        {/* </div> */}
                      </div>
                      <div
                        className="yauto"
                        onScroll={(e) => {
                          const bottom =
                            e.target.scrollHeight - e.target.scrollTop ===
                            e.target.clientHeight;

                          if (bottom && !last_page) {
                            setPage(page + 1);
                            getEmaillist(page + 1,"transport-manager");
                          }
                        }}
                      >
                        {console.log("TALEEB_ITEMLIST : ", emaillist)}
                        <table className="table tableAdmin tabelheiht">
                          <thead className="tableHead">
                            <tr>
                              <th>{t("Sr.no")}</th>
                              <th>{t("Transport Name")} </th>

                              <th>{t("Subject")} </th>
                              <th>{t("Action")} </th>
                            </tr>
                          </thead>
                          {emaillist && emaillist.length > 0 ? (
                            emaillist?.map((itemlist, index) => {
                              return (
                                <tbody className="tableBody">
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{itemlist.email_staff_name}</td>
                                    <td>{itemlist.email_staff_subject}</td>

                                    <td>
                                      <div className="innerFlex">
                                        <Link
                                          to={
                                            "/EmailDetailsTm/" +
                                            itemlist?.email_staff_id
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
                {/* { emaillist?.length>0&&  <Pagenation length={emaillist?.length} total={totalPages} />} */}
                {emaillist && emaillist?.length > 0 ? (
  <>
    {/* Render your data here */}
    <Pagenation
      length={emaillist?.length}
      total={totalPages}
    />
  </>
) : (
  <div><NoDataComp /></div>
)}
                </Tab.Pane>}
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Email;

import { React, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { motion } from "framer-motion";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import { Space, TimePicker } from "antd";
import Select from "react-select";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Calendar from "../../../assets/images/calendar.svg";
import XCross from "../../../assets/images/xcross.svg";
import MapComponent from "../../../sharedComponent/MapComponent";


import { simpleGetCall, simplePostCall , multipartPostCall} from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { useEffect } from "react";
import CommonSelect from "../../../sharedComponent/ReactSelect";
import { SearchFunction } from "../../../sharedComponent/LeafletMap/SearchFunction";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import Loader from "../../../sharedComponent/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { latestDate } from "../../../sharedComponent/common";
const AddOrderGhatge = () => {
  const { t, i18n } = useTranslation();

  const { sidebar, setSidebar, Dark, customerData, timeZone, setDispatchStatus } =
    useContext(AppContext);
    const [dispatch_executive , set_dispatch_executive] = useState(false)
    const accessRights = useSelector((state) => state.auth.accessRights);
    const addonSettingData = useSelector((state) => state.auth.addonModule);

  const [loading, setLoading] = useState(false);
  let newId = useParams();
  let paramID = newId?.id;
  const [deleveryDetails, setDeleveryDetails] = useState({
    device: "web",
    time: dayjs(new Date()).format("HH:mm:ss"),
    dispatch_package_order_datetime: new Date(),
    vehicle_type_id: "",
    weight_of_goods: "",
    height: "",
    width: "",
    length: "",
    types_of_goods: "",
    number_of_goods: "",
    dispatch_package_vendor_warehouse_id: "",
    dispatch_package_vendor_id: "",
    dispatch_package_customer_id: "",
    dispatch_package_address_id: "",
    
  });

  const [activeData, setActiveData] = useState([]);
  const [warehouseAddress, setWarehouseAddress] = useState();
  const [user_role, set_user_role] = useState();
  const [transportation_list, set_transportation_list] = useState([]);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const [option, setOption] = useState([]);
  const customStyles = {
    control: (base) => ({
      ...base,
      color: "#f6efe9",
      fontSize: 14,
      borderRadius: 10,
      border: "1px solid #f6efe9",
      backgroundColor: 'white',
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #f6efe9",
      },
      // This line disable the blue border
      boxShadow: "none",
    }),
  };
  const [state, setState] = useState({
    topics: [],
    selectedTopics: [],
  });

  const navigate = useNavigate();
  const [wareHouses, setwareHouses] = useState([]);
  const [merchentDropDown, setMerchentDropDown] = useState([]);
  const [customerDropDown, setCustomerDropDown] = useState([]);
  const [vehicleDropDown, setVehicleDropDown] = useState([]);
  const [validated, setValidated] = useState(false);
  const [deleveryAddress, setDeleveryAddress] = useState();
  const [addressDropdopdown, setAddressDropdopdown] = useState([]);
  const [VehicalType, setVehicalType] = useState([]);
  const [TypeID, setTypeID] = useState([]);
  const [transportationList, setTransportationList] = useState([]);
  const [selectedTransportManager, setSelectedTransportManager] = useState(null)
  const [dispatch_user_id, set_dispatch_user_id] = useState(null)
  const [gradeState, setGradeState] = useState({
    isloading: true,
    grades: [],
  });
  const [errMsg, setErrMsg] = useState({
    vehicle_type_id: "",
    dispatch_package_vendor_warehouse_id: "",
    dispatch_package_vendor_id: "",
    // dispatch_package_customer_id: "",
    dispatch_package_address_id: "",
    milk_run_vehicle_no: ''
  });
  useEffect(() => {
    if (paramID) {
      singleListApicall(paramID);
    }
    console.log('dispatchid-->', dispatch_user_id)
  }, [paramID]);

  const singleListApicall = (paramID) => {
    simpleGetCall(ApiConfig.GET_ORDER_DETAILS + paramID)
      .then((res) => {
        if (res?.result) {
          let timeResponse =
            res?.data?.dispatch_package_order_datetime?.split(" ")[1];
          setDeleveryDetails({ ...res?.data, time: timeResponse });
          setActiveData(res?.timeLineData);
          set_dispatch_user_id(res?.data?.dispatch_user_id)
            
        
        } else {
          notifyError(res.message);
        }
      })
      .catch((errr) => {
        console.log("errr", errr);
      })
      .finally(() => {
        setLoading(false);
      });
  };
/////////added code////////////////////////////////////////////
const userRole = () => {
  simpleGetCall(ApiConfig.USERS_ROLE_LIST)
    .then((res) => {
      if (res.result) {
        console.log('res--->', res)
        set_user_role(res?.data)
      } else {
        notifyError(res.message);
      }
    })
    .catch((errr) => {
      console.log("errr", errr);
    })
    .finally(() => {
      setLoading(false);
    });
};
useEffect(() => {
  var choiceArry =[]
  
   state.selectedTopics?.map((valuedata, index) => {

      choiceArry.push(
        valuedata.value,
        
      )
    })
    setTypeID(choiceArry);
  }, [state.selectedTopics]);
  function onTopicChange(selectedOption) {

    var selected_topics = [];
  
    
    if (selectedOption?.length > 0) {
      selectedOption.map((topic, index) => {
        selected_topics.push(topic.value);
      });
    }

    setState({
      ...state,
      topics: selected_topics,
      selectedTopics: selectedOption,
    });
 
  }

function geVehicalList() {
  let newRequestBody = JSON.stringify({
    notification_role:  'dispatchexecutive',
    // dispatch_user_id: user_role?.[0]?.role_id,
  });
  simplePostCall(ApiConfig.TRASPORTATION_LIST, newRequestBody)
    .then((res) => {

      if(res?.result){
        // set_transportation_list(res?.data);
        setTransportationList(
          res?.data.map((item) => ({
            value: item.user_id,
            label: item.user_name,
          }))
        );
      }

    
      
    })
    .catch((error) => {
      console.log("api response", error);
    });
}

useEffect(() => {
  if (dispatch_user_id !== null) {
    console.log('Updated dispatch_user_id:', dispatch_user_id);
    if(transportationList){
      const matchingTransport = transportationList?.filter(item => item.value == dispatch_user_id);
      console.log("matchingTransport-->", matchingTransport)
     set_dispatch_user_id(dispatch_user_id)
      setSelectedTransportManager(matchingTransport)

    }
  }
}, [dispatch_user_id]);



const handleTransportManagerChange = (selectedOption) => {
  setSelectedTransportManager(selectedOption );

  
};
useEffect(()=>{
  console.log("setSelectedTransportManager-->", selectedTransportManager)
}, [selectedTransportManager])
useEffect(() => {
  geVehicalList();
  userRole();
}, []);
//////////////end of added code/////////////////////////////////////////

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (deleveryDetails?.vehicle_type_id?.length === 0) {
      setErrMsg({
        ...errMsg,
        vehicle_type_id: t("Please Select Vehicle"),
      });
      return;
    }
    if (deleveryDetails?.dispatch_package_vendor_warehouse_id?.length == 0) {
      setErrMsg({
        ...errMsg,
        dispatch_package_vendor_warehouse_id: "Please Select vender house ",
      });
      return;
    }
    if (deleveryDetails?.dispatch_package_vendor_id?.length == 0) {
      setErrMsg({
        ...errMsg,
        dispatch_package_vendor_id: "Please Select vender ",
      });
      return;
    }

    if (deleveryDetails?.dispatch_package_address_id?.length == 0) {
      setErrMsg({
        ...errMsg,
        dispatch_package_address_id: "Please Select customer address ",
      });
      return;
    }
    if (form.checkValidity() === false) {
      event.stopPropagation();

      // if(deleveryDetails?.vehicle_type_id?.length !== 0 && deleveryDetails?.dispatch_package_vendor_warehouse_id?.length !==0 &&deleveryDetails?.dispatch_package_address_id?.length !==0&&deleveryDetails?.dispatch_package_vendor_id?.length !==0)
    } else {
      let body = JSON.stringify({
        ...deleveryDetails,
        dispatch_package_order_datetime: `${latestDate(
          deleveryDetails?.dispatch_package_order_datetime,
          "yyyy-MM-dd"
        )} T ${deleveryDetails?.time}`,
        timeZone: timeZone,
        dispatch_package_id: paramID,
        activeData: paramID ? activeData : [],
        userId:customerData.User_id,
        dispatch_user_id : selectedTransportManager?.value,
      });
      simplePostCall(
        paramID ? ApiConfig.UPDATE_ORDER : ApiConfig.ADD_ORDER,
        body
      )
        .then((res) => {
          if (res.result) {
            setDispatchStatus("pending");
            localStorage.setItem("dispatchKey", "pending");
            notifySuccess(res.message);
            navigate("/DispatchOrder");
          } else {
            notifyError(res.message);
          }
        })
        .catch((errr) => {
          console.log("errr", errr);
        })
        .finally(() => {
          setLoading(false);
        });

      setLoading(true);
    }
    setValidated(true);
  };
  useEffect(() => {
    if (timeZone) {
      getAllDropDowns();
      const currentTime = new Date()
        .toLocaleTimeString("en-US", { timeZone, hour12: false })
        .split(" ")[0];
      setDeleveryDetails({ ...deleveryDetails, time: currentTime });
    }
  }, [timeZone]);
  useEffect(() => {
    setErrMsg({
      ...errMsg,
      dispatch_package_vendor_warehouse_id: " ",
    });
  }, [deleveryDetails?.dispatch_package_vendor_warehouse_id]);

  useEffect(() => {
    setErrMsg({ ...errMsg, dispatch_package_vendor_id: "" });

    if (deleveryDetails && deleveryDetails?.dispatch_package_vendor_id) {
      let merchent = merchentDropDown?.filter(
        (single) =>
          single?.vendor_id == deleveryDetails?.dispatch_package_vendor_id
      );
      if (merchent && merchent?.length) {
        setwareHouses(
          merchent[0].warehouse != null ? merchent[0].warehouse : []
        );
      }
    }
  }, [deleveryDetails, merchentDropDown]);

  useEffect(() => {
    setErrMsg({ ...errMsg, dispatch_package_vendor_warehouse_id: "" });

    if (deleveryDetails?.dispatch_package_vendor_warehouse_id) {
      let seleWarehouse = wareHouses?.filter(
        (single) =>
          single?.vendor_warehouse_id ===
          deleveryDetails?.dispatch_package_vendor_warehouse_id
      );

      seleWarehouse !== null &&
        setWarehouseAddress(seleWarehouse[0]?.vendor_warehouse_address);
    }
  }, [deleveryDetails, wareHouses]);
  useEffect(() => {
    if (deleveryDetails?.dispatch_package_customer_id) {
      let sele = customerDropDown.filter(
        (single) =>
          single?.dispatch_customer_id ===
          deleveryDetails.dispatch_package_customer_id
      );
      sele !== null &&
        setAddressDropdopdown(sele[0]?.dispatch_customer_address);
    }
  }, [deleveryDetails, customerDropDown]);

  useEffect(() => {
    setErrMsg({ ...errMsg, dispatch_package_address_id: "" });
    if (deleveryDetails.dispatch_package_address_id) {
      let sele =
        addressDropdopdown &&
        addressDropdopdown?.filter(
          (single) =>
            single?.dispatch_customer_address_id ===
            deleveryDetails?.dispatch_package_address_id
        );

      sele !== null &&
        sele?.length &&
        setDeleveryAddress(sele[0]?.dispatch_customer_address_address);
    }
  }, [deleveryDetails, addressDropdopdown]);

  const getAllDropDowns = () => {
    Promise.all([
      simplePostCall(ApiConfig.MERCHENT_DROPDOWN),
      simplePostCall(ApiConfig.CUSTOMER_DROPDOWN),
      simplePostCall(ApiConfig.VEHICLE_TYPE_DROPDOWN),
    ]).then((res) => {
      if (res?.length) {
        res.map((dropdown, index) => {
          if (dropdown.result) {
            if (index == 0) setMerchentDropDown(dropdown.data);
            else if (index == 1) {
              setCustomerDropDown(dropdown.data);
            } else if (index == 2) {
              setVehicleDropDown(dropdown.data);
            }
          }
        });
      }
    });
  };

  const handleResetClick = (e, val) => {
    setOption([]);
    setDeleveryDetails({
      dispatch_package_order_datetime: "",
      time: "",
      dispatch_package_vendor_warehouse_id: "",
      dispatch_package_vendor_id: "",
      dispatch_package_customer_id: "",
      dispatch_package_address_id: "",
    });

    setDeleveryAddress("");

    setWarehouseAddress("");
  };
  var date = new Date();




  ////////////////////////////////////////////////////////////////////////////////////////////////////
  const [routingData, setRoutingData] = useState({
    trip_start_time: dayjs(new Date()).format("HH:mm:ss"),
    trip_end_time: "",
    vehicle_id: "",
  });
  const [vehicleList, setVehicleList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const getVehicleList = () => {
    setLoading(true);
    simplePostCall(
      ApiConfig.MANUAL_VEHICLE_LIST,
      JSON.stringify({ timeZone: timeZone })
    )
      .then((res) => {
        setVehicleList(res?.data);
        let vehicles = res?.data;
        var grades = [];
        vehicles?.map((grade, index) => {
          grades.push({
            label: grade.vehicle_number,
            value: grade.vehicle_id,
          });
        });
        setGradeState({ ...gradeState, grades: grades });
      })
      .catch((err) => {
        console?.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
 
 /*  useEffect(() => {
    let newArray = orderList.map((item) => {
      let vehicleList1 = vehicleList.find(
        (updated) => updated.imei === item.imei
      );
      item = { ...item, ...vehicleList1 };
      return item;
    });
    setDashboardVehicle(newArray);
  }, [orderList, vehicleList]); */
  let driver = vehicleList?.filter(
    (driver) => driver.vehicle_id == routingData?.vehicle_id
  )[0];
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
       <div id="cx-wrapper" className="vehicle_Booking">
         {loading ? (
           <Loader />
         ) : (
           <div className="main-master-wrapper">
             {/* Header section */}
             <div className="header">
               <label className="headerTxt">
                 {paramID ? t("Update Order") : t("Add Order")}
               </label>
             </div>
           
             {/* COntent section */}
             <Form noValidate validated={validated} onSubmit={handleSubmit}>
               {deleveryDetails?.dispatch_package_status != 2 && (
                 <>
                   <div className="row vehicleMainRow">
                    

                     <div className="detailsSec">
                 {/* <div className="headerDet">
                   <label className="headerTxtDet"> {t("Drop Details")}</label>
                 </div> */}
                 <div className="row">
                 <div className="col-md-6 col-sm-12 colForm">
                       <Form.Label>
                         {t("Date")} <span>&#42;</span>
                       </Form.Label>
                       <div className="innerSelectBox weekCounter datepicker-main">
                         {/* <DatePicker placeholderText="Select Date Range..." className="form-control" /> */}
                         <CommonDatePicker
                           dateKey="dispatch_package_order_datetime"
                           setDate={setDeleveryDetails}
                           data={deleveryDetails}
                           minDate={date}
                         />
                         {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                       </div>

                       <Form.Control.Feedback>
                         {t("Add Date")}{" "}
                       </Form.Control.Feedback>
                     </div>
                     <div className="col-md-6 col-sm-12 colForm mt-2">
                       <div className="innerSelectBox weekCounter">
                         <label className="dispatchHead">
                           {t("Time")} <span>&#42;</span>
                         </label>
                         <Space>
                           <TimePicker
                             className="form-control carretClass"
                             // placeholder={t("Select Time)}
                             // placeholder=`${t("Select Time)}`
                             size="large"
                             allowClear={true}
                             value={
                               deleveryDetails?.time &&
                               dayjs(deleveryDetails?.time, "HH:mm:ss")
                             }
                             showNow={false}
                             placeholder={t("Select Time")}
                             onChange={(e) => {
                               if (e) {
                                 let time =
                                   e.hour() +
                                   ":" +
                                   e.minute() +
                                   ":" +
                                   e.second();
                                 setDeleveryDetails({
                                   ...deleveryDetails,
                                   time: time,
                                 });
                               } else {
                                 setDeleveryDetails({
                                   ...deleveryDetails,
                                   time: "",
                                 });
                               }
                             }}
                           />
                         </Space>
                       </div>
                       <Form.Control.Feedback>
                         {t("Add Time")}{" "}
                       </Form.Control.Feedback>
                     </div>
                   <div className="col-md-6 col-sm-12 colFormDet">
                     <Form.Label className="common-labels">
                       {t("Customer")}
                     </Form.Label>
                     <CommonSelect
                       setterKey={"dispatch_package_customer_id"}
                       setID={true}
                       setterFucntions={setDeleveryDetails}
                       selectedValue={
                         deleveryDetails?.dispatch_package_customer_id
                       }
                       selValue={deleveryDetails?.dispatch_package_customer_id}
                       data={deleveryDetails}
                       placehold={t("Select")}
                       optionList={
                         customerDropDown &&
                         customerDropDown?.map((single) => ({
                           id: single.dispatch_customer_id,
                           value: single.dispatch_customer_id,
                           label: single.dispatch_customer_name,
                         }))
                       }
                     />

                     <Form.Control.Feedback>
                       {t("Please Select customer...")}
                     </Form.Control.Feedback>
                   </div>
               {/*     <div className="col-md-6 col-sm-12 colFormDet">
                     <Form.Label className="common-labels">
                       {t("Customer Address")}
                     </Form.Label>
                     <CommonSelect
                       setterKey={"dispatch_package_address_id"}
                       setID={true}
                       setterFucntions={setDeleveryDetails}
                       data={deleveryDetails}
                       selectedValue={
                         deleveryDetails?.dispatch_package_address_id
                       }
                       selValue={deleveryDetails?.dispatch_package_address_id}
                       placehold={t("Select")}
                       optionList={
                         addressDropdopdown && addressDropdopdown?.length
                           ? addressDropdopdown.map((single) => ({
                               id: single.dispatch_customer_address_id,
                               value: single.dispatch_customer_address_id,
                               label: single.dispatch_customer_address_address,
                             }))
                           : []
                       }
                     />
                     <Form.Control.Feedback>
                       {t("Please Select customer...")}
                     </Form.Control.Feedback>
                   </div>
                   <div className="col-md-12 colFormDet">
                     <Form.Label className="common-labels">
                       {t("Delivery Address")}
                     </Form.Label>
                     <Form.Control
                       as="textarea"
                       disabled
                       rows={3}
                       required
                       type="text"
                       placeholder={t("Enter Delivery Address...")}
                       value={deleveryAddress}
                     />
                     {errMsg?.dispatch_package_address_id?.length > 0 && (
                       <span className="text-danger">
                         {errMsg?.dispatch_package_address_id}
                       </span>
                     )}
                     <Form.Control.Feedback type="invalid">
                       {t("Please Enter Delivery Address...")}
                     </Form.Control.Feedback>
                   </div> */}
                      <div className="col-md-6 col-sm-12 colFormDet">
                     <Form.Label className="common-labels">
                       {t("Route")}
                     </Form.Label>
                     <CommonSelect
                       setterKey={"dispatch_package_address_id"}
                       setID={true}
                       setterFucntions={setDeleveryDetails}
                       data={deleveryDetails}
                       selectedValue={
                         deleveryDetails?.dispatch_package_address_id
                       }
                       selValue={deleveryDetails?.dispatch_package_address_id}
                       placehold={t("Select")}
                       optionList={
                         addressDropdopdown && addressDropdopdown?.length
                           ? addressDropdopdown.map((single) => ({
                               id: single.dispatch_customer_address_id,
                               value: single.dispatch_customer_address_id,
                               label: single.dispatch_customer_address_address,
                             }))
                           : []
                       }
                     />
                     <Form.Control.Feedback>
                       {t("Please Select customer...")}
                     </Form.Control.Feedback>
                   </div>

                   <div className="col-md-6 col-sm-12 colFormDet">
                          <Form.Label className="common-labels">
                            {t("Vehicle & Driver")}
                          </Form.Label>

                          <CommonSelect
                            setterKey={"vehicle_id"}
                            componentId={true}
                            placehold={t("Select")}
                            setID={true}
                            setErrMsg={setErrMsg}
                            errMsg={errMsg}
                            errKey={"manual"}
                            setterFucntions={setRoutingData}
                            data={routingData}
                            selectedValue={routingData?.vehicle_id}
                            selValue={routingData?.vehicle_id}
                            setid={true}
                            optionList={
                              vehicleList &&
                              vehicleList?.map((single) => ({
                                id: single?.vehicle_id,
                                value: single?.vehicle_number,
                                label: (
                                  <div className="d-flex me-2">
                                    <div
                                      style={{
                                        backgroundColor:
                                          single?.metering_status == "T"
                                            ? "red"
                                            : single?.metering_status == "B"
                                            ? "green"
                                            : "grey", // Set your desired background color here
                                        width: "10px", // Set your desired width here
                                        height: "10px", // Set your desired height here
                                        borderRadius: "50%", // Make it a circle
                                        marginRight: "10px", // Set the space between the circle and the text
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginTop: "8px",
                                      }}
                                    ></div>
                                    {/* <img src="https://via.placeholder.com/30x30" alt="Vanilla" /> */}
                                    {`${single?.vehicle_number}  (${
                                      single?.user_name
                                        ? single?.user_name
                                        : "No Driver Available"
                                    })`}
                                  </div>
                                ),

                                // `${single?.vehicle_number} >> ${single?.user_name?single?.user_name:"No Driver Available"}`
                              }))
                            }
                          />
                          {errMsg?.vehicle_id?.length > 0 && (
                            <span className="text-danger">
                              {errMsg?.vehicle_id}
                            </span>
                          )}
                          <Form.Control.Feedback>
                            Please Select Vehicle...
                          </Form.Control.Feedback>
                        </div>
                        <div className="col-md-6 col-sm-12 colFormDet">
    
    <Form.Label className="common-labels">
      {t("Vehicle Attendant")} <span>&#42;</span>
    </Form.Label>
    <Select
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral50: "rgba(156, 73, 0, 0.5)",
          primary25: "#f6efe9",
          primary: "#8f4300",
          primary75: '#4C9AFF',
          background: "#8f4300",
          color: "#8f4300",
        },
      })}
      value={selectedTransportManager}
    //  label={selectedTransportManager}
      onChange={handleTransportManagerChange}
      placeholder={t("Select")}
      options={transportationList}
      isMulti={false}
    />
  </div>
  <div className="col-md-6 col-sm-12 colFormDet">
                         <Form.Label className="common-labels">
                           {t("Supplier")}
                         </Form.Label>
                         <CommonSelect
                         isMulti={true}
                           setID={true}
                           // selectedValue={option}
                           setterKey={"dispatch_package_vendor_id"}
                           setterFucntions={setDeleveryDetails}
                           selectedValue={
                             deleveryDetails?.dispatch_package_vendor_id
                           }
                           selValue={
                             deleveryDetails?.dispatch_package_vendor_id
                           }
                           data={deleveryDetails}
                           placehold={t("Select")}
                           optionList={merchentDropDown.map((merchent) => ({
                             id: merchent.vendor_id,
                             value: merchent.vendor_id,
                             label: merchent.vendor_name,
                           }))}
                         />
                         {errMsg?.dispatch_package_vendor_id?.length > 0 && (
                           <span className="text-danger">
                             {errMsg?.dispatch_package_vendor_id}
                           </span>
                         )}
                         <Form.Control.Feedback>
                           {t("Please Enter Merchant...")}
                         </Form.Control.Feedback>
                       </div>
                 </div>
               </div>



            

                
                
    

       

                
                  

                    
                   </div>
                 
               
                 </>
               )}
               <div className="detailsSec" style={{border:'none'}}>
                
               </div>
               <div className="d-flex justify-content-end" /* style={{paddingTop:'10%'}} */>
                 <button
                   type="button"
                   onClick={(e) => {
                     handleResetClick(e);
                     navigate("/DispatchOrder");
                   }}
                   className="cx-btn-1"
                 >
                   {t("Cancel")}
                 </button>
                 <button className="cx-btn-2">
                   {paramID ? t("Update") : t("Submit")}
                 </button>
               </div>

               {/* <div className="detailsSec" style={{border:'none', }}>
                
                </div> */}
             </Form>
           </div>
         )}
       </div>
     </motion.div>
    </>

  );
};

export default AddOrderGhatge;

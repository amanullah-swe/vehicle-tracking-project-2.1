

import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { motion } from "framer-motion";
import { getWithAuthCall, simplePostCall } from "../../../api/ApiServices";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import ApiConfig from "../../../api/ApiConfig";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import Select from "react-select";

import { useTranslation } from "react-i18next";
const ComposeEmailHelpler = () => {

  const { sidebar, DriverStatus,VehicleStatus } = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const navigate = useNavigate();
  const [state, setState] = useState({
    topics: [],
    selectedTopics: [],
    drivertopic: [],
    selectedDriver: [],
     Vehilepic: [],
    selectedVehicle: [],

  });
  const [VehicleId, setVehicleId] = useState("");
  const [DriverId, setDriverId] = useState("");
  const [DriverList, setDriverList] = useState([]);
  const [TypeID, setTypeID] = useState([]);
  const [vehicleList, setvehicleList] = useState([]);

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
  const [gradeState, setGradeState] = useState({
    isloading: true,
    grades: [],
  });
  const [DriverState, setDriverState] = useState({
    isloading: true,
    driverList: [],
  });
   const [VehicleState, setVehicleState] = useState({
    isloading: true,
    VehicleList: [],
  });
  const [VehicalType, setVehicalType] = useState([]);
  // const [VehicleId, setVehicleID] = useState("");
  const [AddAccessry, setAddAccessry] = useState({
    route: "",
    vehicle: "",
    subject: "",
    message: "",
    

  });
  useEffect(() => {
    var choiceArry =[]
    
     state.selectedTopics.map((valuedata, index) => {
  
        choiceArry.push(
          valuedata.value,
          
        )
      })
      setTypeID(choiceArry);

      if(choiceArry){
        // geDiverList(choiceArry)
        // geVehicleList(choiceArry)
      }
    }, [state.selectedTopics]);


    useEffect(() => {
      var choiceArryVehicle =[]
      
       state.selectedVehicle.map((valuedata, index) => {
    
        choiceArryVehicle.push(
            valuedata.value,
            
          )
        })
        setVehicleId(choiceArryVehicle);
  
        
      }, [state.selectedVehicle]);




  useEffect(() => {
    geVehicalList();
  }, []);

  const AddCreateTrip = (e) => {
    e.preventDefault();
    let newRequestBody = JSON.stringify({
      route: TypeID,
      vehicle:VehicleId,
      subject:AddAccessry.subject,
      message:AddAccessry.message,
      // type:DriverStatus
      type: localStorage.getItem('taleeb_tab') === '2' ? DriverStatus : /* VehicleStatus */ 'helper'
      

    });

    // simplePostCall(DriverStatus === "driver"? ApiConfig.ADD_DRIVER :ApiConfig.ADD_VEHICLE, newRequestBody)
    simplePostCall(localStorage.getItem('taleeb_tab') == 2? ApiConfig.ADD_DRIVER :ApiConfig.ADD_VEHICLE, newRequestBody)
    
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
          navigate("/Email");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));

      // Set a timeout to remove 'taleeb_tab' from localStorage after 3 seconds
    setTimeout(() => {
      localStorage.removeItem('taleeb_tab');
    }, 3000);
  };

  // ///////// this api func is called in trip dd //////////////////////
  function geVehicalList() {
    let newRequestBody = JSON.stringify({
      notification_driver_role: DriverStatus,
    });
    simplePostCall(ApiConfig.DERIVER_VECHILE_LIST, newRequestBody)
      .then((data) => {
    setVehicalType(data.data);
     
      let Type = data.data;
      var grades = [];

      Type.map((grade, index) => {
        grades.push({
          label: grade.trip_start_point,
          value: grade.trip_id,
        });
      });
      setGradeState({ ...gradeState, grades: grades });

    })
    .catch((error) => {
      console.log("api response", error);
    });
  }
//  ///////////////////////////////////////////////////////////////////


  function onTopicChange(selectedOption) {

    var selected_topics = [];
  
    
    if (selectedOption.length > 0) {
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
  function onDriverChange(selectedOption) {

    var selected_topics = [];
  
    
    if (selectedOption.length > 0) {
      selectedOption.map((topic, index) => {
        selected_topics.push(topic.value);
      });
    }

    setState({
      ...state,
      drivertopic: selected_topics,
      selectedDriver: selectedOption,
    });

 
  }
  function onVehicleChange(selectedOption) {

    var selected_topics = [];
  
    
    if (selectedOption.length > 0) {
      selectedOption.map((topic, index) => {
        selected_topics.push(topic.value);
      });
    }

    setState({
      ...state,
      Vehilepic: selected_topics,
      selectedVehicle: selectedOption,
    });

 
  }
  function geDiverList(id) {
    let newRequestBody = JSON.stringify({
      dropDownType: DriverStatus,
      trip_ids:id
    });
    simplePostCall(ApiConfig.DROP_DOWN_LIST_DRIVER, newRequestBody)
      .then((data) => {
      

      //  if(DriverStatus === "vehicle"){
      //   let Type = data.data;
      //   var Drivergrades = [];
  
      //   Type.map((grade, index) => {
      //     Drivergrades.push({
      //       label: grade.vehicle_number,
      //       value: grade.vehicle_id,
      //     });
      //   });
      //  } else {
        let Type = data.data;
        var Drivergrades = [];
  
        Type.map((grade, index) => {
          Drivergrades.push({
            label: grade.user_name,
            value: grade.user_id,
          });
        });
      //  }
    
      setDriverState({ ...DriverState, driverList: Drivergrades });

    })
    .catch((error) => {
      console.log("api response", error);
    });
  }

  function getVehicelList() {
    getWithAuthCall(ApiConfig.VEHICEL_AVALIVALITY_DROPDAWAN)
      .then((data) => {
        // setVehicalType(data?.data);
        setvehicleList(data?.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  function getDriverList() {
    getWithAuthCall(ApiConfig.DRIVER_AVALIVALITY_DROPDAWAN)
      .then((data) => {
        // setVehicalType(data?.data);
        setDriverList(data?.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  useEffect(() => {
    getVehicelList();
    getDriverList()
  }, [,]);
 /*  function geVehicleList(id) {
    let newRequestBody = JSON.stringify({
      dropDownType: VehicleStatus,
      trip_ids:id
    });
    simplePostCall(ApiConfig.DROP_DOWN_LIST_DRIVER, newRequestBody)
    // simplePostCall(ApiConfig.EMAIL_DRIVER_AND_DELIVER, newRequestBody)
      .then((data) => {
        console.log("taleeb_data : ", data)
     let Type = data.data;
      var Vehiclegrades = [];

      Type?.map((grade, index) => {
        Vehiclegrades.push({
          label: grade.vehicle_number,
          value: grade.vehicle_id,
          // label: grade.email_driver_driver,
          // value: grade.email_driver_id,
        });
      });
      console.log("taleeb_Vehiclegrades : ", Vehiclegrades)
      setVehicleState({ ...DriverState, VehicleList: Vehiclegrades });
    
console.log("taleeb_VehicleList : ", VehicleState)
    })
    .catch((error) => {
      console.log("api taleeb response", error);
    });
  } */
  const { t, i18n } = useTranslation();

 /*  const handleClick = (e) => {
   
    // Set a timeout to remove 'taleeb_tab' from localStorage after 7 seconds
    setTimeout(() => {
      localStorage.removeItem('taleeb_tab');
    }, 3000);
  }; */

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
        <div className="main-master-wrapper">
          <div className="Heading">
          {/* <p>{t("A")} </p> */}
          <p>{localStorage.getItem("taleeb_tab")=== "2" ? t("Driver") : t("Vehicle Assistant")} </p>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-12 form_input_main">
              <div className="innerSelectBox weekCounter">
                <Form.Label className="common-labels">
                  {" "}
                  {t("Trip")} <span>&#42;</span>{" "}
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
                  value={state.selectedTopics}
                  onChange={onTopicChange}
                  options={gradeState.grades}
                  placeholder={t("Select")}
                  isMulti={true}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12 form_input_main">
              <div className="innerSelectBox weekCounter">
                <Form.Label className="common-labels">
                  {" "}
                {t("Driver")}   <span>&#42;</span>{" "}
                </Form.Label>
               
                {/*  <Select
              
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
                  value={state.selectedDriver}
                  onChange={onDriverChange}
                  options={DriverState.driverList}
                  isMulti={true}
                /> */}
                 <div>
              <select
                      className="form-select"
                      aria-label="Default select example"
                      placeholder={t("Vehicle list")}
                      onChange={(e) => setDriverId(e.target.value)}
                    >
                      <option value="">{t("Select Driver")} </option>
                      {DriverList &&
                        DriverList.map((Person) => (
                          <option Value={Person.user_id}>
                            {Person.user_name}
                          </option>
                        ))}
                    </select>
              </div>
                {console.log("taleeb_DriverState.driverList : ", DriverState)}
              </div>
            </div>
            <div className="col-md-6 col-sm-12 form_input_main">
              <div className="innerSelectBox weekCounter">
                <Form.Label className="common-labels">
                  {" "}
                {t("Vehicle")}   <span>&#42;</span>{" "}
                </Form.Label>
                
                   {/*  <Select
                  // className="js-example-basic-single form-control"
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
                  value={state?.selectedVehicle}
                  onChange={onVehicleChange}
                  options={VehicleState.VehicleList}
                  isMulti={true}
                /> */}
                  <div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  placeholder={t("Vehicle list")}
                  onChange={(e) => setVehicleId(e.target.value)}
                >
                  <option value="">{t("Vehicle")}</option>
                  {vehicleList.map((vehicle) => (
                    <option Value={vehicle.vehicle_id}>
                      {vehicle.vehicle_number}
                    </option>
                  ))}
                </select>
              </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 form_input_main">
              <div className="innerSelectBox weekCounter">
                <Form.Label className="common-labels">
                 {t("Subject")}  <span>&#42;</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder={t("Enter Subject here...")}
                  onChange={(e) => {
                    setAddAccessry({
                      ...AddAccessry,
                      subject: e.target.value,
                    });
                  }}
                 />
              </div>
            </div>
            <div className="col-md-6 col-sm-12 form_input_main">
              <div className="innerSelectBox weekCounter">
                <Form.Label className="common-labels">
                {t("Message")}   <span>&#42;</span>
                </Form.Label>
                <textarea
                  className="form-control"
                  rows="11"
                  placeholder={t("Enter your message here...")}
                  onChange={(e) => {
                    setAddAccessry({
                      ...AddAccessry,
                      message: e.target.value,
                    });
                  }}
                ></textarea>
              </div>
            </div>
            <div className="d-flex justify-content-end btn-wrapper">
              <Link to="/Email">
                <button className="cx-btn-1" /* onClick={handleClick} */>{t("Cancel")} </button>
              </Link>
              <button
                className="cx-btn-2"
                onClick={(e) => {
                  AddCreateTrip(e);
                }}
              >
                {t("Send")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComposeEmailHelpler;

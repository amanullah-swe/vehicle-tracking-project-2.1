import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { motion } from "framer-motion";
import { simplePostCall } from "../../../api/ApiServices";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import ApiConfig from "../../../api/ApiConfig";
import CommonSelect from "../../../sharedComponent/ReactSelect";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const AddPushNotification = () => {
  const { sidebar, setSidebar, PushNotificationStatus, VehicleStatus } = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const { t, i18n } = useTranslation();


  const navigate = useNavigate();
  const [state, setState] = useState({
    topics: [],
    selectedTopics: [],
    drivertopic: [],
    selectedDriver: [],
     Vehilepic: [],
    selectedVehicle: [],
  });
  const [TypeID, setTypeID] = useState([]);

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
  useEffect(() => {
    var choiceArry =[]
    
     state.selectedTopics.map((valuedata, index) => {
  
        choiceArry.push(
          valuedata.value,
          
        )
      })
      setTypeID(choiceArry);

      if(choiceArry){
        geDiverList(choiceArry)
        geVehicleList(choiceArry)
      }
    }, [state.selectedTopics]);
  const [VehicalType, setVehicalType] = useState([]);
  const [userName, setUserName] = useState("");
  const [userNameDeriver, setUserDeriver] = useState("");
  const [userNameVehicle, setUserVehicle] = useState("");
  const [userId, setUserID] = useState("");
  const [AddAccessry, setAddAccessry] = useState({
    notification_driver_route: "",
    notification_driver_vehicle: "",
    notification_driver_driver: "",
    notification_driver_message: "",
    notification_driver_datetime: "",
    notification_driver_role: "driver",
  });

  useEffect(() => {
    geVehicalList();
  }, []);

  const AddCreateTrip = (e) => {
    e.preventDefault();
    let newRequestBody = JSON.stringify({
      notification_driver_route: userName,
      notification_driver_vehicle: userNameVehicle,
      notification_driver_driver: userNameDeriver,
      notification_driver_message: AddAccessry.notification_driver_message,
      notification_driver_datetime: AddAccessry.notification_driver_datetime,
      notification_driver_role: PushNotificationStatus,
      trip_ids:TypeID

    });

    simplePostCall(ApiConfig.ADD_PUSH_VEICILE, newRequestBody)
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
          navigate("/PushNotification");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  function geVehicalList() {
    let newRequestBody = JSON.stringify({
      notification_driver_role: PushNotificationStatus,
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
      dropDownType: PushNotificationStatus,
      trip_ids:id
    });
    simplePostCall(ApiConfig.DROP_DOWN_LIST_DRIVER, newRequestBody)
      .then((data) => {
      let Type = data.data;
      var Drivergrades = [];

      Type.map((grade, index) => {
        Drivergrades.push({
          label: grade.user_name,
          value: grade.user_id,
        });
      });
      setDriverState({ ...DriverState, driverList: Drivergrades });

    })
    .catch((error) => {
      console.log("api response", error);
    });
  }
  function geVehicleList(id) {
    let newRequestBody = JSON.stringify({
      dropDownType: VehicleStatus,
      trip_ids:id
    });
    simplePostCall(ApiConfig.DROP_DOWN_LIST_DRIVER, newRequestBody)
      .then((data) => {
       let Type = data.data;
      var Vehiclegrades = [];

      Type.map((grade, index) => {
        Vehiclegrades.push({
          label: grade.vehicle_number,
          value: grade.vehicle_id,
        });
      });
      setVehicleState({ ...DriverState, VehicleList: Vehiclegrades });

    })
    .catch((error) => {
      console.log("api response", error);
    });
  }

  /* useEffect(() => {
     // Set a timeout to remove 'tab_push_noti' from localStorage after 3 seconds
     setTimeout(() => {
      localStorage.removeItem('tab_push_noti');
    }, 3000);
  }, []) */
  
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
            <p>{t("Add Notification")}</p>
          </div>
          <div className="row">
            <div className="col-md-12 mb-4">
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
            <div className="col-md-12 mb-4">
              <div className="innerSelectBox weekCounter">
                <Form.Label className="common-labels">
                  {" "}
                  {t("Driver")} <span>&#42;</span>{" "}
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
                  value={state.selectedDriver}
                  onChange={onDriverChange}
                  options={DriverState.driverList}
                  placeholder={t("Select")}
                  isMulti={true}
                />
              </div>
            </div>
            <div className="col-md-12 mb-4">
              <div className="innerSelectBox weekCounter">
                <Form.Label className="common-labels">
                  {" "}
                  {t("Vehicle")} <span>&#42;</span>{" "}
                </Form.Label>
                
                    <Select
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
                  value={state.selectedVehicle}
                  onChange={onVehicleChange}
                  options={VehicleState?.VehicleList}
                  placeholder={t("Select")}
                  isMulti={true}
                />
              </div>
            </div>
         
            <div className="col-md-12 mb-4">
              <div className="innerSelectBox weekCounter">
                <Form.Label className="common-labels">
                  {t("Message")} <span>&#42;</span>
                </Form.Label>
                <textarea
                  className="form-control"
                  rows="11"
                  placeholder={t("Enter your message here...")}
                  onChange={(e) => {
                    setAddAccessry({
                      ...AddAccessry,
                      notification_driver_message: e.target.value,
                    });
                  }}
                ></textarea>
              </div>
            </div>
            <div className="d-flex justify-content-end btn-wrapper">
              <Link to="/PushNotification">
                <button className="cx-btn-1">{t("Cancel")}</button>
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

export default AddPushNotification;

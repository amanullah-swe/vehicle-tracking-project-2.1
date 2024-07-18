import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { motion } from "framer-motion";
import CommonSelect from "../../../sharedComponent/ReactSelect";
import Select from "react-select";

import {
  getWithAuthCall,
  simpleGetCall,
  simplePostCall,
} from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import { useTranslation } from "react-i18next";




const AddTripFleet = () => {
  const { sidebar, setSidebar, Dark, PushNotificationStatus, loading, setLoading } =
    useContext(AppContext);
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
  });
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      AddCreateTrip(event);
    }
  
    setValidated(true);
  };
  
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
  const [VehicalType, setVehicalType] = useState([]);
  const [TypeID, setTypeID] = useState([]);
  const [AddAccessry, setAddAccessry] = useState({
    notification_tm_message: "",
    notification_tm_date: "",
    notification_tm_name: "",
  });

  useEffect(() => {
    geVehicalList();
  }, []);


 

  useEffect(() => {
  var choiceArry =[]
  
   state.selectedTopics.map((valuedata, index) => {

      choiceArry.push(
        valuedata.value,
        
      )
    })
    setTypeID(choiceArry);
  }, [state.selectedTopics]);

  const AddCreateTrip = (e) => {
    e.preventDefault();
    let newRequestBody = JSON.stringify({
      notification_tm_message: AddAccessry.notification_tm_message,

      user_ids: TypeID,
      notification_role: PushNotificationStatus,
    });

    simplePostCall(ApiConfig.ADD_PUSH_TM, newRequestBody)
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
      notification_role: PushNotificationStatus,
    });
    simplePostCall(ApiConfig.TRASPORTATION_LIST, newRequestBody)
      .then((data) => {
  
        let Type = data.data;
        setVehicalType(data.data);
        var grades = [];

        Type.map((grade, index) => {
          grades.push({
            label: grade.user_name,
            value: grade.user_id,
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

  const handleClick = (e) => {
   
    // Set a timeout to remove 'tab_push_noti' from localStorage after 7 seconds
    setTimeout(() => {
      localStorage.removeItem('tab_push_noti');
    }, 3000);
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
        <div className="main-master-wrapper">
          <div className="Heading">
            <p>{t("Add Notification")}</p>
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12 mb-4">
              <div className="innerSelectBox weekCounter">
                <Form.Label className="common-labels">
                  {" "}
                  {t("Name")} <span>&#42;</span>{" "}
                </Form.Label>
              
                <Select
                required
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
                  {t("Message")} <span>&#42;</span>
                </Form.Label>
                <textarea
                required
                  className="form-control"
                  rows="11"
                  placeholder={t("Enter your message here...")}
                  onChange={(e) => {
                    setAddAccessry({
                      ...AddAccessry,
                      notification_tm_message: e.target.value,
                    });
                  }}
                ></textarea>
                  <Form.Control.Feedback type="invalid">
                      {t("Please Enter your message here")}  
                      </Form.Control.Feedback>
              </div>
            </div>
            <div className="d-flex justify-content-end btn-wrapper">
            <Link to="/PushNotification">
              <button className="cx-btn-1" onClick={handleClick}>{t("Cancel")}</button>
          </Link>

              <button
                className="cx-btn-2"
                type="submit"
                // onClick={(e) => {
                //   AddCreateTrip(e);
                // }}
                onClick={handleClick}
              >
                {t("Send")}
              </button>
            </div>
          </div>
          </Form>

        </div>
      </div>
    </motion.div>
  );
};

export default AddTripFleet;

import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

import { motion } from "framer-motion";
import { multipartPostCall, simpleGetCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import moment from "moment";
import ReactAudioPlayer from "react-audio-player";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const AddVehicleInspectionSetting = () => {
  const [audio, setAudio] = useState("");
  const [announcement, setAnnouncement] = useState("");
 const customStyles = {
    control: (base) => ({
      ...base,
      color: "#f6efe9",
      fontSize: 14,
      borderRadius: 10,
      border: "1px solid #f6efe9",
      backgroundColor: "white",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #f6efe9",
      },
      
      // This line disable the blue border
      boxShadow: "none",
      position:"top",
      top:"0"
    }),
  };
  const { sidebar, setSidebar, CategoryId, setCategoryId} = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const { t, i18n } = useTranslation();

  const params = useParams();
  let UserId = params.id;
  useEffect(() => {
    if (UserId) {
      geAudioDetails();
    }
  }, []);


  useEffect(() => {
    geVehicalList()
    geVehicalCategory()
  }, []);

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [state, setState] = useState({
    topics: [],
    selectedTopics: [],
 
    selectedCatagry: [],
    Vehilepic: [],
   
  });


  const handleCancle = () => {
  
  };
  const [AddAaudio, setAddAaudio] = useState({
    announcement_type: "",
    announcement_content: "",
    format: "",
    announcement_path: "",
    text: "",
  });


  const [gradeState, setGradeState] = useState({
    grades: [],
  });
  const [CategoryState, setCategoryState] = useState({
    grades: [],
  });
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

  function onCatagryChange(selectedOption) {
    var selected_topics = [];

    if (selectedOption.length > 0) {
      selectedOption.map((topic, index) => {
        selected_topics.push(topic.value);
      });
    }

    setState({
      ...state,
      Vehilepic: selected_topics,
      selectedCatagry: selectedOption,
    });
  }

  const geAudioDetails = () => {
    simpleGetCall(ApiConfig.COMINCATION_PROFLIE + UserId)
      .then((res) => {
        let user_profile = res.data;

        setAddAaudio({
          announcement_type: user_profile.announcement_type,
          announcement_content: user_profile.announcement_content,
          announcement_path: user_profile.announcement_path,
          format: user_profile.format,
          text:
            user_profile.format === "text"
              ? user_profile.announcement_path
              : "",
        });
        setAnnouncement(user_profile.format);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      HandalAccident(event);
    }
    setValidated(true);
  };

  const HandalAccident = (e) => {
    if (UserId) {
      UpdateAccessory(e);
    } else {
      AddCreateAccessory(e);
    }
  };



  function AddCreateAccessory(e) {
    e.preventDefault();
   
    let newRequestBody = JSON.stringify({
      vehicle_category_id: state.auth.selectedCatagry.value,
      inspection_category_type_id : state.auth.topics
    });

    simplePostCall(ApiConfig.SETP_1_INSPATION, newRequestBody)
      .then((data) => {
        setCategoryId(data.vehicle_category_id)
        if (data.result) {
          navigate("/AddVehicleInspection2");
          
        } else {
          // notifyError(data.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  const UpdateAccessory = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("announcement_id", UserId);

    formData.append("announcement_type", AddAaudio.announcement_type);
    formData.append("announcement_content", AddAaudio.announcement_content);
    formData.append("format", announcement);
    if (
      AddAaudio.format === "AudioType" ||
      AddAaudio.format === "Images" ||
      AddAaudio.format === "AudioType" ||
      AddAaudio.format === "Images"
    ) {
      formData.append("announcement_path", AddAaudio.announcement_path);
    } else {
      formData.append("text", AddAaudio.text);
    }

    multipartPostCall(ApiConfig.COMINCATION_UPDATE, formData)
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
          navigate("/Announcement");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };





  function geVehicalCategory() {
    let newRequestBody = JSON.stringify({
        key: "vehicleCategory",
    });
    simplePostCall(ApiConfig.VEHICEL_INSPATION_CATEGORY, newRequestBody)
      .then((data) => {
         let Type = data.data;
      var grades = [];

      Type.map((grade, index) => {
        grades.push({
            
          label: grade.vehicle_type_code,
          value: grade.vehicle_type_id,
        });
      });
      setCategoryState({ ...gradeState, grades: grades });

    })
    .catch((error) => {
      console.log("api response", error);
    });
  }





  function geVehicalList() {
    let newRequestBody = JSON.stringify({
        key: "inspectionCategoryTypes",
    });
    simplePostCall(ApiConfig.VEHICEL_INSPATION_CATEGORY, newRequestBody)
      .then((data) => {
        let Type = data.data;
      var grades = [];

      Type.map((grade, index) => {
        grades.push({
            
          label: grade.inspection_category_type,
          value: grade.inspection_category_type_id,
        });
      });
      setGradeState({ ...gradeState, grades: grades });

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
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div id="cx-wrapper" Add_Audio>
          <div className="main-master-wrapper customHeaightIntegration">
            <div className="Heading">
              <p>{UserId ? "Update Configuration" : "New Configurationt"}</p>
            </div>
            <div className="innerInputsGen mainVehAccident ">
              <div className="">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {" "}
                        {t("Vehicle Category")} <span>&#42;</span>{" "}
                      </Form.Label>

                      <Select
                      
                        styles={customStyles}
                        className="sawankoPani"
                        theme={(theme) => ({
                          ...theme,
                          
                          colors: {
                            ...theme.colors,
                            neutral50: "rgba(156, 73, 0, 0.5)",
                            primary25: "#f6efe9",
                            primary: "#8f4300",
                            primary75: "#4C9AFF",
                            background: "#8f4300",
                            color: "#8f4300",
                          },
                        })}
                        value={state.auth.selectedCatagry}
                        onChange={onCatagryChange}
                        options={CategoryState.grades}
                     
                      />
                       
                
                      <Form.Control.Feedback type="invalid">
                        {t("Enter Title.")}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 form_input_main">
                    <div className="innerSelectBox weekCounter form_input_main">
                      <Form.Label className="common-labels">
                        {" "}
                        Vehicle Sub-Category <span>&#42;</span>
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
                            primary75: "#4C9AFF",
                            background: "#8f4300",
                            color: "#8f4300",
                          },
                        })}
                        value={state.auth.selectedTopics}
                        onChange={onTopicChange}
                        options={gradeState.grades}
                        isMulti={true}
                      />
                      <Form.Control.Feedback type="invalid">
                        Enter type.
                      </Form.Control.Feedback>
                    </div>
                  </div>
                </div>
              </div>
              {/* Two Bottom Buttons */}
              <div className="d-flex justify-content-end align-items-center belowBtns">
                <button
                  type="button"
                  className="cx-btn-1"
                  onClick={() => handleCancle()}
                >
                  {t("Cancel")}
                </button>
                <button className="cx-btn-2">
                  {UserId ? "Update" : "Save & Proceed"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </motion.div>
  );
};

export default AddVehicleInspectionSetting;

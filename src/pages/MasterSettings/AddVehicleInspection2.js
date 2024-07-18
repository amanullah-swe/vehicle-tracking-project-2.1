import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Creoss from "../../assets/images/Creoss_Red.svg";

import { motion } from "framer-motion";
import {
  multipartPostCall,
  simpleGetCall,
  simplePostCall,
} from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import moment from "moment";
import ReactAudioPlayer from "react-audio-player";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const AddVehicleInspection2 = () => {
  const [requirements, setrequirements] = useState([
    // {
    //   id: 1,
    //   inspection_category_type: "",
    //   vehicle_type_code: "",
    //   PartCatgrey: "",
    // },
  ]);

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
    }),
  };
  const { sidebar, setSidebar, Dark, CategoryId } = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const { t, i18n } = useTranslation();

  const params = useParams();
  let UserId = params.id;
  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    geVehicalList();
  
  }, []);

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [state, setState] = useState({
    topics: [],
    selectedTopics: [],
    drivertopic: [],
    selectedDriver: [],
    Vehilepic: [],
    selectedVehicle: [],
  });
  console.log("state,", state)

  const handleCancle = () => {
    setAddAaudio({
      announcement_type: "",
      announcement_content: "",
      format: "",
      announcement_path: "",
      text: "",
    });
  };
  const [AddAaudio, setAddAaudio] = useState({
    announcement_type: "",
    announcement_content: "",
    format: "",
    announcement_path: "",
    text: "",
  });
  console.log(AddAaudio);

  const [gradeState, setGradeState] = useState({
    grades: [],
    partData:[]
  });

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

  const AddCreateAccessory = (e) => {
    e.preventDefault();
    navigate("/VehicleInspectionTab");
    // let formData = new FormData();
    // formData.append("announcement_type", AddAaudio.announcement_type);
    // formData.append("announcement_content", AddAaudio.announcement_content);
    // formData.append("format", announcement);
    // if (
    //   announcement === "AudioType" ||
    //   announcement === "Images" ||
    //   AddAaudio.format === "AudioType" ||
    //   AddAaudio.format === "Images"
    // ) {
    //   formData.append("announcement_path", AddAaudio.announcement_path);
    // } else {
    //   formData.append("text", AddAaudio.text);
    // }

    // multipartPostCall(ApiConfig.ADD_CMINICATION, formData)
    //   .then((res) => {
    //     if (res.result) {
    //       notifySuccess(res.message);
    //       navigate("/VehicleInspectionTab");
    //     } else {
    //       notifyError(res.message);
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  const UpdateAccessory = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("announcement_id", UserId);

    formData.append("announcement_type", AddAaudio.announcement_type);
    formData.append("announcement_content", AddAaudio.announcement_content);

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

  function getDetails() {
    let newRequestBody = JSON.stringify({
      vehicle_category_id: CategoryId,
    });
    simplePostCall(ApiConfig.GET_INSPATION_DATA, newRequestBody)
      .then((data) => {
        console.log(data);
        setrequirements(data.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  // //// Row Data v ///
  const onRequirementAdd = () => {

    let temp = {
      // id: Math.floor(Math.random() * 100 + 1),
      id: Math.floor(Math.random() * 100 + 1),
      inspection_category_type: "",
      vehicle_type_code:requirements[0].vehicle_type_code,
      vehicle_category_id:requirements[0].vehicle_type_id,

      PartCatgrey: "",
    };

    let addRequirements = [...requirements, temp];
    setrequirements(addRequirements);
    // setChoiseData(choiceArry)


  };

  const onRemoveRequirement = (id) => {
    let tempRequirements = [];
    requirements.map((eachRequirement) => {
      if (eachRequirement.id !== id) tempRequirements.push(eachRequirement);
      return true;
    });
    setrequirements(tempRequirements);
  };

  function 
  onTopicChange(selectedOption,index) {
   let finalArr = requirements.map((item, i) => {
      return index === i ? {
        ...item,
        inspection_category_type: selectedOption,
        inspection_category_type_id: selectedOption.value
      } : item
    })
    setrequirements(finalArr)

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
  
  function onpartChange(selectedOption,index) {


    let finalArr = requirements.map((item, i) => {
      return index === i ? {
        ...item,
        inspection_part_type: selectedOption,

      } : item
    })
    setrequirements(finalArr)

   
 
  }





  function geVehicalList() {
    let newRequestBody = JSON.stringify({
      key: "inspectionCategoryTypes",
    });
    simplePostCall(ApiConfig.VEHICEL_INSPATION_CATEGORY, newRequestBody)
      .then((data) => {
        console.log(data);

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
          <div className="main-master-wrapper">
            <div className="Heading">
              <p>
                {UserId
                  ? "Update Configuration Part"
                  : "New Configuration Part"}
              </p>
            </div>
            <div className="innerInputsGen mainVehAccident ">
              <div className="">
                <>
                  {requirements &&
                    requirements.length > 0 &&
                    requirements.map((eachRequirement, index) => {
                      // console.log(eachRequirement);
                      return (
                        <div className="col-lg-12" key={index}>
                          <div className="warehouse_details">
                            <div className="headerDet border-0">
                              <label className="headerTxtDet ">
                                <span></span>
                              </label>
                            
                              {index === 0 ? (
                                <></>
                              ) : (
                                <div className="defult_check_address mb-2">
                                  <img
                                    src={Creoss}
                                    alt=""
                                    onClick={() => {
                                      onRemoveRequirement(eachRequirement.id);
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sm-12 form_input_main">
                                <div className="innerSelectBox weekCounter">
                                  <Form.Label className="common-labels">
                                    {" "}
                                    {t("Vehicle Category")} <span>&#42;</span>{" "}
                                  </Form.Label>

                                  <Form.Control
                                    // required
                                    isDisabled
                                    type="text"
                                    placeholder="Vehicle Category"
                                    value={eachRequirement.vehicle_type_code}
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

                                 {eachRequirement.id ?
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
                                //  value={state.auth.selectedTopics}
                                value={eachRequirement?.inspection_category_type}
                                 onChange={(selectedOption) => {onTopicChange(selectedOption,index)}}
                                 options={gradeState.grades}
                                //  isMulti={true}
                               /> 
                               :
                               <Form.Control
                               isDisabled
                               type="text"
                               placeholder="Vehicle Category"
                               value={eachRequirement.inspection_category_type}
                             />
                                }
                                  <Form.Control.Feedback type="invalid">
                                    Enter type.
                                  </Form.Control.Feedback>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 form_input_main">
                              <div className="innerSelectBox weekCounter form_input_main">
                                <Form.Label className="common-labels">
                                  {" "}
                                  Part Category <span>&#42;</span>
                                </Form.Label>

                              
                            <Form.Control
                                    // required
                                    isDisabled
                                    type="text"
                                    placeholder="Part Category"
                                    // value={eachRequirement?.inspection_part_type}

                                    onChange={(selectedOption) => {onpartChange(selectedOption,index)}}
                                  />
                                <Form.Control.Feedback type="invalid">
                                  Enter Part Category.
                                </Form.Control.Feedback>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  <button
                    type="button"
                    className="btn-active-ann"
                    onClick={() => {
                      onRequirementAdd();
                    }}
                  >
                    + {t("Add New")}
                  </button>
                </>
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

export default AddVehicleInspection2;

import React from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { motion } from "framer-motion";
import { Accordion, Carousel, Modal, Nav, Tab, TabPane } from "react-bootstrap";
import yellow_tri from "../../assets/images/Yellow_Tri.svg";
import Red_tri from "../../assets/images/Red_Tri.svg";
import view from "../../assets/images/InspPrivew.svg";
import uploads from "../../assets/images/InspUpload.svg";
import Green_tri from "../../assets/images/Green-check.svg";
import uploadIcon from "../../assets/images/uploadIcon.svg";
import Creoss from "../../assets/images/Creoss_Red.svg";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import Select from "react-select";
import Repair_car1 from "../../assets/images/Repair_car1.svg";
import Repair_car from "../../assets/images/Repair_car2.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from 'react-select/creatable';

  const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  });
const VehicleInspectionTab = () => {
    const defaultOptions = [
        createOption('One'),
        createOption('Two'),
        createOption('Three'),
      ];
  const navigate = useNavigate();
  const { sidebar } = useContext(AppContext);

  const [imageModal, setImageModal] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [addwarehoues, setAddwarehoues] = useState(1);
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState("");
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
  const addnewhouse = () => {
    setAddwarehoues(addwarehoues + 1);
  };
  const removenewhouse = () => {
    setAddwarehoues(addwarehoues - 1);
  };
  const handleClose = () => {
    setImageModal(false);
  };
  const handleShow = () => {
    setImageModal(true);
  };
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const [interior, setInterior] = useState(true);
  const [exterior, setExterior] = useState(false);
 const [othes, setOther] = useState(false);
 const [next, setNext] = useState("");
 

  const [state, setState] = useState({
    topics: [],
    selectedTopics: [],
    drivertopic: [],
    selectedDriver: [],
    Vehilepic: [],
    selectedVehicle: [],
  });
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
  const HandleSubmit = () => {
    if (interior === true) {
      setInterior(false);
      setExterior(true);
      setOther(false);
    }
    if (exterior === true) {
      setInterior(false);
      setExterior(false);
      setOther(true);
    }
    if (othes === true) {
      setInterior(false);
      setExterior(false);
      setOther(false);
    }

    // if (interior === false || exterior === false || othes === false) {
    //     navigate("/AddVehicleInspection2");
    //   }
  };
  const HandleCancle = () => {
    if (interior === true) {
      setNext("/NewInspection");
    }
    if (exterior === true) {
      setInterior(true);
      setExterior(false);
      setOther(false);
    }
    if (othes === true) {
      setInterior(false);
      setExterior(true);
      setOther(false);
    }
  };




  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
    }, 1000);
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
      <div id="cx-wrapper" className="New_inspition">
        <div className="main-master-wrapper">
          <div className="Heading">New Vehicle Inspection</div>
          <div className="Vehicle_information">
            <div id="Vehicle_Information_Tabs">
              <div className="Steps">
                {interior === true ? (
                  <>
                    <div
                      className={interior === false ? "Step_button" : "active"}
                    >
                      Interior
                    </div>
                    <div
                      className={exterior === false ? "Step_button" : "active"}
                    >
                      Exterior
                    </div>
                    <div className={othes === false ? "Step_button" : "active"}>
                      Other’s
                    </div>
                  </>
                ) : (
                  ""
                )}
                {exterior === true ? (
                  <>
                    <div
                      className={interior === false ? "Step_button" : "active"}
                    >
                      Interior
                      <img src={Green_tri} alt="" />
                    </div>
                    <div
                      className={exterior === false ? "Step_button" : "active"}
                    >
                      Exterior
                    </div>
                    <div className={othes === false ? "Step_button" : "active"}>
                      Other’s
                    </div>
                  </>
                ) : (
                  ""
                )}
                {othes === true ? (
                  <>
                    <div
                      className={interior === false ? "Step_button" : "active"}
                    >
                      Interior <img src={Green_tri} alt="" />
                    </div>
                    <div
                      className={exterior === false ? "Step_button" : "active"}
                    >
                      Exterior <img src={Green_tri} alt="" />
                    </div>
                    <div className={othes === false ? "Step_button" : "active"}>
                      Other’s
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="Step_Body_main">
                {interior === true ? (
                  <div className="tab_contain_inspiction">
                    <div className="Brake_Contain">
                      <>
                        {[...Array(addwarehoues)].map((rec, index) => {
                          return (
                            <div className="col-lg-12">
                              <div className="heading">
                                <p>Interior Question No. {index + 1}</p>
                              </div>
                              <div className="warehouse_details">
                                <div className="headerDet border-0">
                                  <label className="headerTxtDet ">
                                    <span></span>
                                  </label>
                                  {addwarehoues > 1 ? (
                                    <div className="defult_check_address mb-2">
                                      <img
                                        src={Creoss}
                                        alt=""
                                        onClick={() => {
                                          removenewhouse();
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="row">
                                  <div className="col-lg-6 col-md-6 col-sm-12 form_input_main">
                                    <div className="innerSelectBox weekCounter">
                                      <Form.Label className="common-labels">
                                        {" "}
                                        {t("Part Category *")}{" "}
                                        <span>&#42;</span>{" "}
                                      </Form.Label>

                                      <select
                                        required
                                        className="form-select"
                                        aria-label="Default select example"
                                        placeholder="Select Part Category "
                                        value={announcement}
                                        onChange={(e) => {
                                          setAnnouncement(e.target.value);
                                        }}
                                      >
                                        <option value="Car">Car</option>
                                        <option value="Truck">Truck</option>
                                        <option value="Pick-Up Van">
                                          Pick-Up Van
                                        </option>
                                        <option value="Images">Image</option>
                                      </select>
                                      <Form.Control.Feedback type="invalid">
                                        {t("Enter Title.")}
                                      </Form.Control.Feedback>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-12 form_input_main">
                                    <div className="innerSelectBox weekCounter form_input_main">
                                      <Form.Label className="common-labels">
                                        {" "}
                                        Part / Particular <span>&#42;</span>
                                      </Form.Label>

                                      {/* <Select
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
                                      /> */}
                                      <CreatableSelect
      isClearable
      styles={customStyles}
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={(newValue) => setValue(newValue)}
      onCreateOption={handleCreate}
      options={options}
      value={value}
    />
                                      <Form.Control.Feedback type="invalid">
                                        Enter type.
                                      </Form.Control.Feedback>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <button
                          className="btn-active-ann"
                          onClick={() => {
                            addnewhouse();
                          }}
                        >
                          + {t("Add New")}
                        </button>
                      </>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {exterior === true ? (
                  <div className="tab_contain_inspiction">
                    <div className="Brake_Contain">
                      <>
                        {[...Array(addwarehoues)].map((rec, index) => {
                          return (
                            <div className="col-lg-12">
                              <div className="warehouse_details">
                                <div className="heading">
                                  <p>Interior Question No. {index + 1}</p>
                                </div>
                                <div className="headerDet border-0">
                                  <label className="headerTxtDet ">
                                    <span></span>
                                  </label>
                                  {addwarehoues > 1 ? (
                                    <div className="defult_check_address mb-2">
                                      <img
                                        src={Creoss}
                                        alt=""
                                        onClick={() => {
                                          removenewhouse();
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="row">
                                  <div className="col-lg-6 col-md-6 col-sm-12 form_input_main">
                                    <div className="innerSelectBox weekCounter">
                                      <Form.Label className="common-labels">
                                        {" "}
                                        {t("Part Category *")}{" "}
                                        <span>&#42;</span>{" "}
                                      </Form.Label>

                                      <select
                                        required
                                        className="form-select"
                                        aria-label="Default select example"
                                        placeholder="Select Part Category "
                                        value={announcement}
                                        onChange={(e) => {
                                          setAnnouncement(e.target.value);
                                        }}
                                      >
                                        <option value="Car">Car</option>
                                        <option value="Truck">Truck</option>
                                        <option value="Pick-Up Van">
                                          Pick-Up Van
                                        </option>
                                        <option value="Images">Image</option>
                                      </select>
                                      <Form.Control.Feedback type="invalid">
                                        {t("Enter Title.")}
                                      </Form.Control.Feedback>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-12 form_input_main">
                                    <div className="innerSelectBox weekCounter form_input_main">
                                      <Form.Label className="common-labels">
                                        {" "}
                                        Part / Particular <span>&#42;</span>
                                      </Form.Label>

                                      {/* <Select
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
                                      /> */}

<CreatableSelect
      isClearable
      styles={customStyles}
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={(newValue) => setValue(newValue)}
      onCreateOption={handleCreate}
      options={options}
      value={value}
    />
                                      <Form.Control.Feedback type="invalid">
                                        Enter type.
                                      </Form.Control.Feedback>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <button
                          className="btn-active-ann"
                          onClick={() => {
                            addnewhouse();
                          }}
                        >
                          + {t("Add New")}
                        </button>
                      </>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {othes === true ? (
                  <div className="tab_contain_inspiction">
                    <div className="Brake_Contain">
                      <>
                        {[...Array(addwarehoues)].map((rec, index) => {
                          return (
                            <div className="col-lg-12">
                              <div className="warehouse_details">
                                <div className="heading">
                                  <p>Interior Question No. {index + 1}</p>
                                </div>
                                <div className="headerDet border-0">
                                  <label className="headerTxtDet ">
                                    <span></span>
                                  </label>
                                  {addwarehoues > 1 ? (
                                    <div className="defult_check_address mb-2">
                                      <img
                                        src={Creoss}
                                        alt=""
                                        onClick={() => {
                                          removenewhouse();
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="row">
                                  <div className="col-lg-6 col-md-6 col-sm-12 form_input_main">
                                    <div className="innerSelectBox weekCounter">
                                      <Form.Label className="common-labels">
                                        {" "}
                                        {t("Part Category *")}{" "}
                                        <span>&#42;</span>{" "}
                                      </Form.Label>

                                      <select
                                        required
                                        className="form-select"
                                        aria-label="Default select example"
                                        placeholder="Select Part Category "
                                        value={announcement}
                                        onChange={(e) => {
                                          setAnnouncement(e.target.value);
                                        }}
                                      >
                                        <option value="Car">Car</option>
                                        <option value="Truck">Truck</option>
                                        <option value="Pick-Up Van">
                                          Pick-Up Van
                                        </option>
                                        <option value="Images">Image</option>
                                      </select>
                                      <Form.Control.Feedback type="invalid">
                                        {t("Enter Title.")}
                                      </Form.Control.Feedback>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-12 form_input_main">
                                    <div className="innerSelectBox weekCounter form_input_main">
                                      <Form.Label className="common-labels">
                                        {" "}
                                        Part / Particular <span>&#42;</span>
                                      </Form.Label>

                                      {/* <Select
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
                                      /> */}
                                       <CreatableSelect
      isClearable
      styles={customStyles}
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={(newValue) => setValue(newValue)}
      onCreateOption={handleCreate}
      options={options}
      value={value}
    />
                                      <Form.Control.Feedback type="invalid">
                                        Enter type.
                                      </Form.Control.Feedback>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <button
                          className="btn-active-ann"
                          onClick={() => {
                            addnewhouse();
                          }}
                        >
                          + {t("Add New")}
                        </button>
                      </>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="btns-main btn-wrapper mt-3">
              <button
                type=""
                className="cx-btn-1"
                onClick={() => {
                  HandleCancle();
                }}
              >
                <Link to={next}>Cancle</Link>
              </button>
              <button
                type="submit"
                className="cx-btn-2"
                onClick={() => {
                  HandleSubmit();
                }}
              >
                <Link to={next}>Next</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleInspectionTab;

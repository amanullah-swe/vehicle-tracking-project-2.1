import React, { useContext, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import audio1 from "../../../assets/Audio/audio1.mp3";
import { motion } from "framer-motion";
import { multipartPostCall, simpleGetCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import moment from "moment";
import ReactAudioPlayer from "react-audio-player";
import { useTranslation } from "react-i18next";


const Addaudio = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [audio, setAudio] = useState("");
  const [announcement, setAnnouncement] = useState("");
const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
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

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [imageWidth, setImageWidth] = useState({
    sabaqAudio: "100%",
    Uploade: "100%",
    tarjamaAudio: "100%",
    Description: "100%",
    subSabaqTitle: "100%",
    arabicAudio: "100%",
  });
  const handleCancle = () => {
    setAddAaudio({
      announcement_type: "",
      announcement_content: "",
      format: "",
      announcement_path:"",
      text:""
    });
    navigate("/Announcement")
  };
  const [AddAaudio, setAddAaudio] = useState({
    announcement_type: "",
    announcement_content: "",
    format: "",
    announcement_path:"",
    text:""
   
  });
  ;
const handleChange = (e) => {
 
    if (e.target.name === "announcement_path") {
      setAddAaudio({
        ...AddAaudio,
        [e.target.name]: e.target.files[0],
        isImageChange: true,
      });
    } else
    setAddAaudio({ ...AddAaudio, [e.target.name]: e.target.value });
  };

  const geAudioDetails = () => {
    simpleGetCall(ApiConfig.COMINCATION_PROFLIE + UserId)
      .then((res) => {
        let user_profile = res.data;
        setAddAaudio({
          announcement_type: user_profile.announcement_type,
          announcement_content: user_profile.announcement_content,
          announcement_path: user_profile.announcement_path,
          format:user_profile.format,
          text:user_profile.format === "text" ? user_profile.announcement_path:""
         
        });
        setAnnouncement(user_profile.format)
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

  const AddCreateAccessory = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("announcement_type", AddAaudio.announcement_type);
    formData.append("announcement_content", AddAaudio.announcement_content);
    formData.append("format", announcement);
    if(announcement === "AudioType" || announcement === "Images" || AddAaudio.format ==="AudioType"|| AddAaudio.format === "Images" ){
      formData.append("announcement_path", AddAaudio.announcement_path);
    }else {
      formData.append("text", AddAaudio.text);
    }
    
   


    multipartPostCall(ApiConfig.ADD_CMINICATION, formData)
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

  const UpdateAccessory = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("announcement_id", UserId);

    formData.append("announcement_type", AddAaudio.announcement_type);
    formData.append("announcement_content", AddAaudio.announcement_content);
    formData.append("format", announcement);
    if(AddAaudio.format === "AudioType" || AddAaudio.format === "Images"|| AddAaudio.format ==="AudioType"|| AddAaudio.format === "Images"){
      formData.append("announcement_path", AddAaudio.announcement_path);
    }else {
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
  const imageInputRef = useRef(null);

  const handleImageLabelClick = () => {
    // Trigger click on the image input when the label is clicked
    imageInputRef.current.click();
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
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div id="cx-wrapper" Add_Audio>
          <div className="main-master-wrapper">
            <div className="Heading">
              <p>{UserId ? t("Update Announcement"): t("Add Announcement")}</p>
            </div>
            <div className="innerInputsGen mainVehAccident ">
              <div className="">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {" "}
                        {t("Announcement Title")} <span>&#42;</span>{" "}
                      </Form.Label>
                      <Form.Control
                      maxLength={30}
                        required
                        type="text"
                        placeholder={t("Enter Title....")}
                        value={AddAaudio.announcement_content}
                        onChange={(e) => {
                          setAddAaudio({
                            ...AddAaudio,
                            announcement_content: e.target.value,
                          });
                        }}
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
                     {t("Announcement type")}    <span>&#42;</span>
                      </Form.Label>

                     
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter type...")}
                        value={AddAaudio.announcement_type}
                        onChange={(e) => {
                          setAddAaudio({
                            ...AddAaudio,
                            announcement_type: e.target.value,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                     {t("Enter type.")} 
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                    <Form.Label className="common-labels">
                      {" "}
                     {t("Content Type")}  <span>&#42;</span>{" "}
                    </Form.Label>
                    <select
                      required
                      className="form-select"
                      aria-label="Default select example"
                      placeholder={t("Content Type")}
                      value={announcement}
                      onChange={(e) => { setAnnouncement(e.target.value) }}
                    >
                      <option value="">{t("Content Type")} </option>
                      <option value="AudioType">{t("Audio")} </option>
                      <option value="text">{t("Text")} </option>
                      <option value="Images">{t("Image")} </option>
                    </select>
                  </div>
                  {announcement === "AudioType" ?
                    <>
                      <div className="select_vehicle_icon col-lg-6 col-md-12 col-sm-12 form_input_main">
                        <Form.Label className="common-labels">
                          {t("Choose Audio")} <span>&#42;</span>
                        </Form.Label>
                        <Form.Label className="common-labels" For="file" htmlFor="">
                          {/* Audio File <span>&#42;</span>{" "} */}
                          {typeof AddAaudio?.announcement_path === "string"
                            ? AddAaudio?.announcement_path.substring(
                              AddAaudio?.announcement_path.length - 35,
                              AddAaudio?.announcement_path.length
                            )
                            : ""}
                        </Form.Label>

                        <Form.Control
                          type="file"
                          id="myFile"
                          accept="audio/mp3,audio/*;capture=microphone"
                          name="sabaqAudio"
                          // value={AddAaudio?.audio_file}
                          style={{ width: imageWidth.sabaqAudio }}
                          onChange={(e) => {
                            setImageWidth({ ...imageWidth, sabaqAudio: "100%" });
                            setAddAaudio({
                              ...AddAaudio,
                              announcement_path: e.target.files[0],
                            });
                          }}
                        />

                        <Form.Control.Feedback type="invalid" tooltip>
                          {t("Vehicle Icon")}
                        </Form.Control.Feedback>
                      </div>
                      <div className="col-md-6 col-sm-12 ">
                        <label className="common-labels">{t("Preview")}</label>
                        <div className="Audio_custom" id="add-audio-preview">
                          <ReactAudioPlayer

                            src={
                              !AddAaudio.announcement_path
                                ? ""
                                : AddAaudio.announcement_path.length
                                  ? AddAaudio.announcement_path
                                  : AddAaudio.announcement_path &&
                                  URL.createObjectURL(AddAaudio.announcement_path)
                            }
                            controls
                          />
                        </div>
                      </div>
                    </> : ""}
                  {announcement === "text" ?
                    <>
                      <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                        <Form.Label className="common-labels">
                          {" "}
                        {t("Announcement")}  <span>&#42;</span>{" "}
                        </Form.Label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("Announcement")}
                          value={AddAaudio.text}
                          onChange={(e) => {
                         
                            setAddAaudio({
                              ...AddAaudio,
                              text: e.target.value,
                            });
                          }}
                          
                        />
                      </div>
                    </> : ""
                  }
                  {announcement === "Images"  ?
                    <>
                      <div className="select_vehicle_icon col-lg-6 col-md-12 col-sm-12 form_input_main">
                        <Form.Label  className="common-labels">
                       {t("Choose Images")}    <span>&#42;</span>
                        </Form.Label>
                      {/* {UserId && !isEditMode ? 
                       <>
                        <Form.Label className="common-labels" For="file" htmlFor=""  style={{ display:"block" ,padding:"5px"}} onClick={handleImageLabelClick} >
                          {typeof AddAaudio?.announcement_path === "string"
                            ? AddAaudio?.announcement_path.substring(
                              AddAaudio?.announcement_path.length - 35,
                              AddAaudio?.announcement_path.length
                            )
                            : AddAaudio?.announcement_path?.name?AddAaudio?.announcement_path?.name: t("Choose File")}
                        </Form.Label>
                       <Form.Control
                          type="file"
                          id="myFile"
                          accept=".jpg, .jpeg, .png"
                          name="announcement_path"
                          // style={{ display: 'none' }}
                          ref={imageInputRef}
                         onChange={handleChange}
                        />
                        </>:<>
                        <Form.Control
                          type="file"
                          id="myFile"
                          accept=".jpg, .jpeg, .png"
                          name="announcement_path"
                          onChange={handleChange}
                        />
                        </>} */}
                     {UserId && !isEditMode ? (
        <>
          <Form.Label className="common-labels" htmlFor="myFile"  style={{"display": 'block', "padding": '5px' ,"border": "2px solid", "border-color": "antiquewhite" }} onClick={handleImageLabelClick}>
            {AddAaudio?.announcement_path ? (
              typeof AddAaudio.announcement_path === 'string' ? (
                AddAaudio.announcement_path.substring(AddAaudio.announcement_path.length - 35)
              ) : (
                AddAaudio.announcement_path.name
              )
            ) : (
              t("Choose File")
            )}
          </Form.Label>
          <Form.Control
            type="file"
            id="myFile"
            accept=".jpg, .jpeg, .png"
            name="announcement_path"
            ref={imageInputRef}
            style={{ display: 'none' }}
            onChange={handleChange}
          />
        </>
      ) : (
        <Form.Control
          type="file"
          id="myFile"
          accept=".jpg, .jpeg, .png"
          name="announcement_path"
          onChange={handleChange}
          
        />
      )}
                     

                   

                        <Form.Control.Feedback type="invalid" tooltip>
                        {t("Vehicle Icon")}  
                        </Form.Control.Feedback>
                      </div>
                      <div className="col-md-6 col-sm-12 ">
                        {AddAaudio.announcement_path.length === 0 ? "" :
                          <>
                            <label className="common-labels">{t("Preview")} </label>
                            <div className="Audio_custom" id="add-ann_IMages">
                              {AddAaudio.announcement_path && 
                              <img 
                              
                       
                            src={
                              !AddAaudio.announcement_path
                                ? ""
                                : AddAaudio.announcement_path.length
                                ? ApiConfig.BASE_URL_FOR_IMAGES +
                                AddAaudio.announcement_path
                                : ApiConfig.BASE_URL_FOR_IMAGES +
                                AddAaudio.announcement_path &&
                                  URL.createObjectURL(AddAaudio.announcement_path)
                            }
                            alt="Preview" />}
                            </div>
                          </>
                        }
                      </div>
                    </> : ""
                  }
                </div>
              </div>
              {/* Two Bottom Buttons */}
              <div className="d-flex justify-content-end align-items-center belowBtns">
                <button      type="button"
                     className="cx-btn-1"
                     onClick={() => handleCancle()}>{t("Cancel")}</button>
                <button className="cx-btn-2">
                  {UserId ? t("Update") : t("Submit")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </motion.div>
  );
};

export default Addaudio;

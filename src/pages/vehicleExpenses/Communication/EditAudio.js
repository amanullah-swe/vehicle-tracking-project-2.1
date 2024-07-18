import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { motion } from "framer-motion";
import audio1 from "../../../assets/Audio/audio1.mp3";
import { useTranslation } from "react-i18next";
const EditAudio = () => {
  const [audio, setAudio] = useState("");

  const handelAudio = (e) => {
    setAudio(e.target.value);
  };
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const { t, i18n } = useTranslation();

  return (
    <motion.div className={sidebar ? "taskMain " : "cx-active taskMain"} id="cx-main" variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}>
      <div id="cx-wrapper">
        <div className="main-master-wrapper">
          <div className="Heading">
            <p>{t("Edit Audio")}</p>
          </div>
          <div className="innerInputsGen mainVehAccident ">
            <div className="">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 form_input_main">
                  <div className="innerSelectBox weekCounter">
                    <Form.Label className="common-labels">
                      {" "}
                      {t("Audio Title")} <span>&#42;</span>{" "}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Audio Title..."
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("Please Enter vehicle Number.")}
                    </Form.Control.Feedback>
                  </div>
                </div>
                <div className="select_vehicle_icon col-lg-6 col-md-12 col-sm-12 form_input_main">
                  <Form.Label className="common-labels" For="file">
                    {t("Audio File")} <span>&#42;</span>{" "}
                  </Form.Label>
                  <Form.Control
                    type="file"
                    required
                    id="file"
                    placeholder="Browse a file..."
                    accept="audio/*"
                    onChange={(e) => {
                      handelAudio(e);
                    }}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t("Vehicle Icon")}
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-6 col-sm-12 form_input_main">
                  <label className="common-labels">{t("Preview")}</label>
                  <div className="Audio_custom">
                    <audio src={audio1} controls></audio>
                  </div>
                </div>
                <div className="col-lg-6">{audio ?  <div className="Audio_custom">
                    <audio src={audio1} controls></audio>
                  </div>: null}</div>
              </div>
            </div>
            {/* Two Bottom Buttons */}
            <div className="d-flex justify-content-end align-items-center">
              <Link to="/Announcement">
                <button className="cx-btn-1">{t("Cancel")}</button>
              </Link>
              <Link to="/Announcement">
                <button className="cx-btn-2">{t("Update")}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditAudio;

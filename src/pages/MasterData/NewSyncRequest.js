import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import DDlogo from "../../assets/images/DDlogo.png";
import { AppContext } from "../../context/AppContext";
import Calendar from "../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { notifySuccess } from "../../sharedComponent/notify";
import ApiConfig from "../../api/ApiConfig";
import { simpleGetCall, simplePostCall } from "../../api/ApiServices";
import CommonDatePicker from "../../sharedComponent/CommonDatePicker";
import { useTranslation } from "react-i18next";
import CommonSelect from "../../sharedComponent/ReactSelect";
import { latestDate } from "../../sharedComponent/common";
import { Select } from "antd";
const { Option } = Select;
const animations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const NewSyncRequest = () => {
  const { t, i18n } = useTranslation();
  const {
    sidebar,
    setSidebar,
    Dark,
    setDark,
    vehicleTabListActive,
    setVehicleTabListActive,
  } = useContext(AppContext);
  const navigate = useNavigate();
  let paramID = useParams();
  const vehicleID = paramID.id;
  const [startDate, setStartDate] = useState(new Date());
  const [vehicledropdown, setVehicledropdown] = useState([]);
  const [addsyncData, setAddsyncData] = useState({
    vehicleId: "",
    syncPeriod: "Complete",
    syncStartDate: new Date(),
    syncEndDate: new Date(),
  });

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      apiAddVehicle(event);
    }

    setValidated(true);
  };

  const apiAddVehicle = (e) => {
    e.preventDefault();
    simplePostCall(
      vehicleID ? ApiConfig.VEHICLE_UPDATESync : ApiConfig.VEHICLE_ADDSync,
      JSON.stringify({
        ...addsyncData,
        vehicleId: addsyncData.vehicle_id,
        vehicleID: vehicleID,
        syncEndDate: addsyncData.syncEndDate
          ? latestDate(addsyncData.syncEndDate, "yyyy-MM-dd")
          : addsyncData.syncEndDate,
        syncStartDate: addsyncData.syncStartDate
          ? latestDate(addsyncData.syncStartDate, "yyyy-MM-dd")
          : addsyncData.syncStartDate,
      })
    )
      .then((res) => {
        if (res.result === true) {
          setVehicleTabListActive("sync");
          localStorage.setItem("vehicleTabListActive", "sync");
          // four
          navigate("/Vehicle");
          notifySuccess(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  useEffect(() => {
    getVehicle();
  }, []);

  const getVehicle = () => {
    simplePostCall(
      ApiConfig.VEHICLE_DROWPDOWN,
      JSON.stringify({
        key: "syncList",
      })
    )
      .then((res) => {
        if (res.result === true) {
          setVehicledropdown(res.data);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}
      className={sidebar ? "taskMain " : "cx-active taskMain"}
      id="cx-main"
    >
      <div id="cx-wrapper">
        <div className="main-master-wrapper heightCalc">
          <div className="Heading">
            <p>{t("Add Vehicle Sync Request")}</p>
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="information-card innerInputsGen row mt-4">
              <div className="col-md-6 mb-4">
                <div className="innerSelectBox ">
                  <Form.Label className="common-labels me-0">
                    {t("Vehicle")} <span>&#42;</span>
                  </Form.Label>

                  <CommonSelect
                    setID={true}
                    setterKey={"vehicle_id"}
                    setterFucntions={setAddsyncData}
                    data={addsyncData}
                    optionList={vehicledropdown.map((vehicle) => ({
                      id: vehicle.vehicle_id,
                      label: vehicle.vehicle_number,
                    }))}
                  />
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="innerSelectBox ">
                  <Form.Label className="common-labels me-0">
                    {t("Sync Period")} <span>&#42;</span>
                  </Form.Label>
                  <div className="multi-select-1">
                    <Select
                      style={{
                        width: "100%",
                        height: "40px",
                        color: "rgba(156, 73, 0, 0.5)",
                      }}
                      required
                      value={
                        addsyncData.syncPeriod ? addsyncData.syncPeriod : ""
                      }
                      onChange={(value) =>
                        setAddsyncData({
                          ...addsyncData,
                          syncPeriod: value,
                        })
                      }
                      className="custom-select"
                    >
                      <Option
                        value="Complete"
                        style={{ color: "rgba(156, 73, 0)" }}
                      >
                        {t("Complete")}{" "}
                      </Option>
                      <Option
                        value="Specific Date"
                        style={{ color: "rgba(156, 73, 0)" }}
                      >
                        {t("Specific Date")}{" "}
                      </Option>
                      <Option
                        value="Range"
                        style={{ color: "rgba(156, 73, 0)" }}
                      >
                        {t("Range")}{" "}
                      </Option>
                    </Select>
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {t("Please Select")}
                  </Form.Control.Feedback>
                </div>
              </div>
              {addsyncData.syncPeriod == "Specific Date" && (
                <div className="col-md-6 mb-4">
                  <Form.Label className="common-labels">
                    {t("Sync  Date")}
                  </Form.Label>
                  <div className="innerSelectBox weekCounter datepicker-main">
                    <CommonDatePicker
                      dateKey="syncStartDate"
                      setDate={setAddsyncData}
                      data={addsyncData}
                      dataDisbal={new Date()}
                      // minDate={new Date()}
                    />
                  </div>

                  <Form.Control.Feedback type="invalid">
                    {t("Please Enter Sync Start Date.")}
                  </Form.Control.Feedback>
                </div>
              )}
              {addsyncData.syncPeriod == "Range" && (
                <>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Sync Start Date")}
                    </Form.Label>
                    <div className="innerSelectBox weekCounter datepicker-main">
                      <CommonDatePicker
                        dateKey="syncStartDate"
                        setDate={setAddsyncData}
                        data={addsyncData}
                        dataDisbal={new Date()}
                      />
                    </div>

                    <Form.Control.Feedback type="invalid">
                      {t("Please Enter Sync Start Date.")}
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Sync End Date")}
                    </Form.Label>
                    <div className="innerSelectBox weekCounter datepicker-main">
                      <CommonDatePicker
                        dateKey={"syncEndDate"}
                        setDate={setAddsyncData}
                        data={addsyncData}
                        minDate={addsyncData.syncStartDate}
                        dataDisbal={new Date()}
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {t("Please Enter Sync End Date")}
                    </Form.Control.Feedback>
                  </div>
                </>
              )}

              <div className="botttom-btn btn-wrapper">
                <button
                  className="cx-btn-1"
                  type="button"
                  onClick={() => {
                    setVehicleTabListActive("sync");
                    localStorage.setItem("vehicleTabListActive", "sync");
                    navigate("/Vehicle");
                  }}
                >
                  {t("Cancel")}
                </button>

                <button className="cx-btn-2">{t("Submit")}</button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </motion.div>
  );
};

export default NewSyncRequest;

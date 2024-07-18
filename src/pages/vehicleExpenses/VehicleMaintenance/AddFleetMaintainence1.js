import { React, useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import Form from "react-bootstrap/Form";
import Save from "../../../assets/images/save.svg";
import Inspect from "../../../assets/images/inspect.svg";
import Right from "../../../assets/images/right.svg";
import Invoice from "../../../assets/images/invoice.svg";
import DatePicker from "react-datepicker";
import Calendar from "../../../assets/images/calendar.svg";
import uploadIcon from "../../../assets/images/uploadIcon.svg";
import { motion } from "framer-motion";
import {
  getWithAuthCall,
  multipartPostCall,
  simpleGetCall,
  simplePUTCall,
} from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import moment from "moment";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import { useNavigate, useParams } from "react-router-dom";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import Loader from "../../../sharedComponent/Loader";

import { useTranslation } from "react-i18next";
// Types of files

const AddFleetMaintainence1 = () => {
  const { sidebar, setSidebar, Dark, setDark, loading, setLoading } =
    useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  const [VehicalType, setVehicalType] = useState([]);
  const params = useParams();
  const [DateCheck, setDateCheck] = useState(false);

  let UserId = params.id;
  useEffect(() => {
    if (UserId) {
      geAccessoryDetails();
      geVehicalList();
    } else {
      geVehicalList();
    }
  }, []);
  const [AddAccessry, setAddAccessry] = useState({
    vehicle_id: "",
    maintenance_task: "",
    scheduled_duration: "",
    due_milage: "",
    off_road: "",
    due_mode: "",
    start_date: "",
    next_due_date: "",
    invoice: "",
  });
  const { t, i18n } = useTranslation();

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
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const geAccessoryDetails = () => {
    setLoading(true);
    simpleGetCall(ApiConfig.VEHICLEFLEET_PROFLIE + UserId)
      .then((res) => {
        let user_profile = res.data;

        setAddAccessry({
          vehicle_id: user_profile.fleat_maintenance_id,
          maintenance_task: user_profile.fleat_mantenance_task,
          scheduled_duration: user_profile.fleat_mantenance_duration,
          due_milage: user_profile.fleat_maintenance_due_milage,
          start_date: moment(user_profile.fleat_mantenance_start_date)
            .utc()
            .format("YYYY-MM-DD"),
          off_road: user_profile.fleat_mantenance_off_road,
          invoice: user_profile.fleat_maintenance_invoice_no,
          due_mode: user_profile.spareparts_amount,
          next_due_date: moment(user_profile.fleat_mantenance_next_due_date)
            .utc()
            .format("YYYY-MM-DD"),
        });
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
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
    formData.append("vehicle_id", AddAccessry.vehicle_id);
    formData.append("maintenance_task", AddAccessry.maintenance_task);
    formData.append("scheduled_duration", AddAccessry.scheduled_duration);
    formData.append("due_milage", AddAccessry.due_milage);
    formData.append("off_road", AddAccessry.off_road);
    formData.append("due_mode", AddAccessry.due_mode);
    formData.append(
      "start_date",
      moment(AddAccessry.start_date).utc().format("YYYY-MM-DD")
    );
    formData.append(
      "next_due_date",
      moment(AddAccessry.next_due_date).utc().format("YYYY-MM-DD")
    );
    formData.append("invoice", AddAccessry.invoice);

    multipartPostCall(ApiConfig.VEHICLEFLEET_ADD, formData)
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
          navigate("/FleetMaintenance");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const UpdateAccessory = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("maintainance_id", UserId);
    formData.append(
      "start_date",
      moment(AddAccessry.start_date).utc().format("YYYY-MM-DD")
    );
    formData.append(
      "next_due_date",
      moment(AddAccessry.next_due_date).utc().format("YYYY-MM-DD")
    );
    let newRequestBody = JSON.stringify({
      maintainance_id: UserId,
      start_date: AddAccessry.start_date,
      next_due_date: AddAccessry.next_due_date,
    });

    simplePUTCall(ApiConfig.VEHICLFLEET_UPDATE, newRequestBody)
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
          navigate("/FleetMaintenance");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };
  function geVehicalList() {
    getWithAuthCall(ApiConfig.VEHICLE_ACCIDENT_VEHICALE_LIST)
      .then((data) => {
       setVehicalType(data.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  const handleChange = (e) => {
    if (e.target.name === "invoice") {
      setAddAccessry({
        ...AddAccessry,
        [e.target.name]: e.target.files[0],
      });
    } else setAddAccessry({ ...AddAccessry, [e.target.name]: e.target.value });
  };

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
        {loading ? (
          <Loader />
        ) : (
          <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div id="cx-wrapper" className="AddFleet_Maintainence">
                <div className="main-master-wrapper">
                  <div className="vehicleHead">
                    <p>{t("Add New Details")}</p>
                  </div>
                  <div className="innerInputsGen mainVehAccident ">
                    <div className="addVehicleSe">
                      <div className="addVehicleLeftSec">
                        <div className="row">
                          <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("Vehicle Name")} <span>&#42;</span>
                              </Form.Label>
                              <Form.Select
                                disabled={UserId ? true : false}
                                required
                                placeholder="Enter Your vehicle Name"
                                value={AddAccessry.vehicle_id}
                                onChange={(e) => {
                                  setAddAccessry({
                                    ...AddAccessry,
                                    vehicle_id: e.target.value,
                                  });
                                }}
                              >
                                {VehicalType &&
                                  VehicalType.length &&
                                  VehicalType.map((Typelist, index) => {
                                    return (
                                      <>
                                        {/* <option value="select">Enter Your vehicle Name</option> */}
                                        <option
                                          key={"delivery" + index}
                                          value={Typelist.vehicle_id}
                                        >
                                          {Typelist.vehicle_number}
                                        </option>
                                      </>
                                    );
                                  })}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {t("Please Enter vehicle code.")}
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {" "}
                                {t("Maintenance Task")} <span>&#42;</span>{" "}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Enter Maintenance Task"
                                disabled={UserId ? true : false}
                                value={AddAccessry.maintenance_task}
                                onChange={(e) => {
                                  setAddAccessry({
                                    ...AddAccessry,
                                    maintenance_task: e.target.value,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                {t("Enter Maintenance Task")}
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {" "}
                                {t("Sheduled Duration")} <span>&#42;</span>{" "}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Select Duration"
                                disabled={UserId ? true : false}
                                value={AddAccessry.scheduled_duration}
                                onChange={(e) => {
                                  setAddAccessry({
                                    ...AddAccessry,
                                    scheduled_duration: e.target.value,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                {t("Please Select Duration")}
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="col-md-12 form_input_main">
                            {/* <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {" "}
                            Start Date <span>&#42;</span>{" "}
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Start Date "
                          />
                          <Form.Control.Feedback type="invalid">
                            Please Start Date.
                          </Form.Control.Feedback>
                        </div> */}
                          </div>
                          <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <div className="d-flex justify-content-between  align-items-center flex-wrap">
                                <Form.Label className="common-labels nextLabel ">
                                  {" "}
                                  {t("Start Date/ Milage")} <span>&#42;</span>
                                </Form.Label>
                                {/* <div id="customRadios">
                              <div class="form-check greenFlex me-2">
                                <input   
                                 onChange={(e) => {
                                  setDateCheck(true)
                                }}
                                class="form-check-input" type="radio" name="flexRadioDefault1" id="Date" />
                                <label class="form-check-label custLabel" for="Date">
                                  Date
                                </label>
                              </div>
                              <div class="form-check  greenFlex">
                                <input  onChange={(e) => {
                                  setDateCheck(false)
                                }}class="form-check-input" type="radio" name="flexRadioDefault1" id="Milage" />
                                <label class="form-check-label custLabel" for="Milage">
                                  Milage
                                </label>
                              </div>
                            </div> */}
                              </div>
                              {DateCheck === true ? (
                                <CommonDatePicker
                                  setDate={setAddAccessry}
                                  data={AddAccessry}
                                  dateKey="start_date"
                                />
                              ) : (
                                //    <input
                                //    required
                                //    class="datepicker-here form-control digits"
                                //    type="date"
                                //    data-language="en"
                                //    placeholder="MM-DD-YYYY"
                                //    data-position="top left"
                                //    name="submission_date"
                                //    // min={moment().format("YYYY-MM-DD")}
                                //    value={AddAccessry.start_date}
                                //    // onChange={(date) => setStartDate(date)}
                                //    onChange={(e) =>
                                //     setAddAccessry({
                                //        ...AddAccessry,
                                //        start_date: e.target.value,
                                //      })
                                //    }
                                //  />

                                <>
                                  <CommonDatePicker
                                    setDate={setAddAccessry}
                                    data={AddAccessry}
                                    dateKey="start_date"
                                  />
                                </>
                              )}
                              {DateCheck === false ? (
                                <>
                                  <Form.Label className="common-labels">
                                    {" "}
                                    {t("Milage")} <span>&#42;</span>{" "}
                                  </Form.Label>
                                  <Form.Control
                                    required
                                    disabled={UserId ? true : false}
                                    type="text"
                                    placeholder="Milage"
                                    value={AddAccessry.due_milage}
                                    // onChange={(date) => setStartDate(date)}
                                    onChange={(e) =>
                                      setAddAccessry({
                                        ...AddAccessry,
                                        due_milage: e.target.value,
                                      })
                                    }
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {t("Please Milage.")}
                                  </Form.Control.Feedback>
                                </>
                              ) : (
                                <>
                                  <Form.Label className="common-labels">
                                    {" "}
                                    {t("Milage")} <span>&#42;</span>{" "}
                                  </Form.Label>
                                  <Form.Control
                                    disabled={UserId ? true : false}
                                    required
                                    type="text"
                                    placeholder="Milage"
                                    value={AddAccessry.due_milage}
                                    // onChange={(date) => setStartDate(date)}
                                    onChange={(e) =>
                                      setAddAccessry({
                                        ...AddAccessry,
                                        due_milage: e.target.value,
                                      })
                                    }
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {t("Please Milage.")}
                                  </Form.Control.Feedback>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <div className="d-flex justify-content-between  align-items-center flex-wrap">
                                <Form.Label className="common-labels nextLabel ">
                                  {t("Service Type")} <span>&#42;</span>
                                </Form.Label>
                                <div id="customRadios">
                                  <div class="form-check greenFlex me-2">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault11"
                                      id="Date"
                                    />
                                    <label
                                      class="form-check-label custLabel"
                                      for="Date"
                                    >
                                      {t("Kilomiter")}
                                    </label>
                                  </div>
                                  <div class="form-check  greenFlex">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault11"
                                      id="Milage"
                                    />
                                    <label
                                      class="form-check-label custLabel"
                                      for="Milage"
                                    >
                                      {t("Duration")}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Enter km / Duration"
                              />
                              <Form.Control.Feedback type="invalid">
                                Please Select Date.
                              </Form.Control.Feedback>
                            </div>
                          </div>

                          <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("Maintenance Task")} <span>&#42;</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Enter Maintenance Task"
                              />
                              <Form.Control.Feedback type="invalid">
                                Enter Maintenance Task
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels nextLabel">
                                {t("Next Due Date")}
                                <span>&#42;</span>
                              </Form.Label>
                              <CommonDatePicker
                                setDate={setAddAccessry}
                                data={AddAccessry}
                                dateKey="next_due_date"
                              />

                              {/* <input
                       required
                       class="datepicker-here form-control digits"
                       type="date"
                       data-language="en"
                       placeholder="MM-DD-YYYY"
                       data-position="top left"
                       name="submission_date"
                       // min={moment().format("YYYY-MM-DD")}
                       value={AddAccessry.next_due_date}
                       // onChange={(date) => setStartDate(date)}
                       onChange={(e) =>
                        setAddAccessry({
                           ...AddAccessry,
                           next_due_date: e.target.value,
                         })
                       }
                     />
                          <Form.Control.Feedback type="invalid">
                            Please Select Date.
                          </Form.Control.Feedback> */}
                            </div>
                          </div>
                          <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <div className="d-flex justify-content-between  align-items-center flex-wrap">
                                <Form.Label className="common-labels">
                                  {t("Send Service Notification")} ?
                                </Form.Label>
                                <div id="customRadios">
                                  <div class="form-check greenFlex me-2">
                                    <input
                                      checked={
                                        AddAccessry.off_road === 1
                                          ? true
                                          : false
                                      }
                                      disabled={UserId ? true : false}
                                      onChange={(e) =>
                                        setAddAccessry({
                                          ...AddAccessry,
                                          off_road: true,
                                        })
                                      }
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault1"
                                      id="Yes1"
                                    />
                                    <label
                                      class="form-check-label custLabel"
                                      for="Yes1"
                                    >
                                      {t("Yes")}
                                    </label>
                                  </div>
                                  <div class="form-check  greenFlex">
                                    <input
                                      disabled={UserId ? true : false}
                                      checked={
                                        AddAccessry.off_road === 0
                                          ? true
                                          : false
                                      }
                                      onChange={(e) =>
                                        setAddAccessry({
                                          ...AddAccessry,
                                          off_road: false,
                                        })
                                      }
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault1"
                                      id="No1"
                                    />
                                    <label
                                      class="form-check-label custLabel"
                                      for="No1"
                                    >
                                      {t("No")}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* This section is for image addidtion in an array on every selection */}
                      <div className="imagesRightSec">
                        <div className="row">
                          <div className="col-md-12 form_input_main"></div>
                          <div className="col-md-12 form_input_main">
                            {/* Selected image preview here */}
                            <div className="previewImg">
                              <img
                                src={
                                  !AddAccessry.invoice
                                    ? Invoice
                                    : AddAccessry.invoice.length
                                    ? AddAccessry.invoice
                                    : AddAccessry.invoice &&
                                      URL.createObjectURL(AddAccessry.invoice)
                                }
                                className="InvoiceImg"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-md-12 form_input_main">
                            <div className="fileDropper">
                              <label htmlFor="file" className="imageHolder">
                                <input
                                  type="file"
                                  id="file"
                                  className="d-none"
                                />
                                <div className="innerFlex">
                                  <img
                                    src={uploadIcon}
                                    className="browseImg"
                                    alt=""
                                  />
                                  <p className="innerTxt">
                                    {t("Drag & Drop Your File")}
                                  </p>
                                  <p className="innerTxt">{t("Or")}</p>
                                  <label
                                    htmlFor="invoice"
                                    className="browseBtn"
                                  >
                                    <input
                                      disabled={UserId ? true : false}
                                      type="file"
                                      id="invoice"
                                      name="invoice"
                                      className="d-none"
                                      onChange={handleChange}
                                    />
                                    <p className="mt-1">{t("Browse File")}</p>
                                  </label>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div> 
                    </div>
                  </div>
                  {/* Two Bottom Buttons */}
                  <div className="d-flex justify-content-end align-items-center belowBtns">
                    <button className="cx-btn-1">{t("Cancel")}</button>
                    <button className="cx-btn-2">
                      {UserId ? <>{t("Update")}</> : <>{t("Submit")}</>}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </>
        )}
      </motion.div>
    </>
  );
};

export default AddFleetMaintainence1;

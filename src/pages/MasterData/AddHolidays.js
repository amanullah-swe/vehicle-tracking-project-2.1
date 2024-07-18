import { React, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import delete_icon from "../../assets/images/delete.svg";
import { Tab, Tabs, Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import import_icon from "../../assets/images/import_icon.svg";
import export_icon from "../../assets/images/export_icon.svg";
import edit_icon from "../../assets/images/ic-edit.svg";
import Calendar from "../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import { useEffect } from "react";
import {
  DateDDMMYYYY,
  dateDDMMYYYYInSlash,
  latestDate,
} from "../../sharedComponent/common";
import { useTranslation } from "react-i18next";
import CommonDatePicker from "../../sharedComponent/CommonDatePicker";

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const AddHolidays = () => {
  const { sidebar, setSidebar, Dark, setDark, DateFormatConfig } =
    useContext(AppContext);
  const { t, i18n } = useTranslation();
  let paramId = useParams();
  const EditId = paramId.id;
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [holidayData, setHolidayData] = useState({
    holiday_name: "",
    holiday_date: new Date(),
    holiday_desc: "",
  });
  const [btnDesable, setBtnDesable] = useState(false);
  const handleCancle = () => {
    navigate("/Holidays");
    setHolidayData({
      holiday_name: "",
      holiday_date: new Date(),
      holiday_desc: "",
    });
  };
  const handleSubmit = (event, action) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      holidaysAddApi(event);
    }
    setValidated(true);
  };

  const holidaysAddApi = (e) => {
    e.preventDefault();
    setBtnDesable(true);
    simplePostCall(
      EditId ? ApiConfig.HOLIDAYSLIST_UPDATE : ApiConfig.HOLIDAYSLIST_ADD,
      JSON.stringify({
        ...holidayData,
        holiday_date: latestDate(holidayData?.holiday_date, "yyyy-MM-dd"),
        holiday_id: EditId,
      })
    )
      .then((res) => {
        setBtnDesable(false);
        if (res.result === true) {
          navigate("/Holidays");
          // notifySuccess("Holiday added successfully..!");
          notifySuccess(res.message);
        } else {
          notifyError(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  useEffect(() => {
    if (EditId) {
      holidaysSingleData();
    }
  }, []);

  const holidaysSingleData = () => {
    simplePostCall(
      ApiConfig.HOLIDAYSLIST_SINGLE,
      JSON.stringify({ holiday_id: Number(EditId) })
    )
      .then((res) => {
        if (res?.result === true) {
          let data = res?.data[0];
          let holiday_date = data.holiday_date.split("T");
          setHolidayData({
            holiday_name: data.holiday_name,
            holiday_date: new Date(holiday_date[0]),
            holiday_desc: data.holiday_desc,
          });
          // notifySuccess(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };
  return (
    <>
      <motion.div
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
        className={sidebar ? "taskMain " : "cx-active taskMain"}
        id="cx-main"
      >
        <div id="cx-wrapper">
          <div className="main-master-wrapper">
            <div className="Heading">
              <p>{EditId ? `${t("Edit Holiday")}` : `${t("Add Holiday")}`}</p>
            </div>
            <div className="form-wrapper">
              <Form
                noValidate
                validated={validated}
                onSubmit={(e) => handleSubmit(e, "add")}
              >
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>{t("Holiday Name")}</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Holiday Name")}
                        onChange={(e) =>
                          setHolidayData({
                            ...holidayData,
                            holiday_name: e.target.value,
                          })
                        }
                        value={holidayData.holiday_name}
                      />
                      <Form.Control.Feedback type="invalid">
                    {t("Please Enter Holiday Name.")}    
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>{t("Holiday Date")}</Form.Label>

                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          dateKey="holiday_date"
                          setDate={setHolidayData}
                          data={holidayData}
                          minDate={new Date()}
                        />

                        {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                      </div>

                      <Form.Control.Feedback type="invalid">
                      {t("Please Select Holiday Date.")}  
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>{t("Holiday Description")}</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        required
                        placeholder={t("Enter Description...")}
                        onChange={(e) =>
                          setHolidayData({
                            ...holidayData,
                            holiday_desc: e.target.value,
                          })
                        }
                        value={holidayData.holiday_desc}
                      />
                      <Form.Control.Feedback type="invalid">
                     {t("Please Enter Holiday Description")}   
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
                <div className="btn-wrapper">
                  <button
                    type="button"
                    className="cx-btn-1"
                    onClick={() => handleCancle()}
                  >
                    {t("Cancel")}
                  </button>
                  <button
                    type="submit"
                    className="cx-btn-2"
                    disabled={btnDesable}
                    // onClick={(e) => handleSubmit(e, "add")}
                  >
                    {btnDesable && (
                      <div class="spinner-border cx-btn-load" role="status">
                        <span class="sr-only"> </span>
                      </div>
                    )}
                    {EditId ? `${t("Update")}` : `${t("Submit")}`}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AddHolidays;

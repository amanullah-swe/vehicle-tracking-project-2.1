import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import delete_icon from "../../assets/images/delete.svg";
import { Tab, Tabs, Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { Link, useNavigate, useParams } from "react-router-dom";
import import_icon from "../../assets/images/import_icon.svg";
import export_icon from "../../assets/images/export_icon.svg";
import edit_icon from "../../assets/images/ic-edit.svg";
import Calendar from "../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import CommonDatePicker from "../../sharedComponent/CommonDatePicker";
import { useTranslation } from "react-i18next";
import { latestDate } from "../../sharedComponent/common";

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const AddVacation = () => {
  const { sidebar, setSidebar, Dark, setDark, DateFormatConfig } =
    useContext(AppContext);
  const { t, i18n } = useTranslation();
  const [btnDesable, setBtnDesable] = useState(false);
  let paramId = useParams();
  const EditId = paramId.id;
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate !== null && date > endDate) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate !== null && date < startDate) {
      setStartDate(date);
    }
  };
  const [vacationData, setVacationData] = useState({
    vacation_name: "",
    vacation_start_date: new Date(),
    vacation_end_date: new Date(),
    vacation_desc: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    //  else if (vacationData.vacation_start_date  > vacationData.vacation_end_date) {
    //   notifyError("End date should be grater than start date")
    // }
    else {
      vacationAddApi(event);
    }

    setValidated(true);
  };
  useEffect(() => {
    if (EditId) {
      vacationSingleData();
    }
  }, []);
  const vacationAddApi = (e) => {
    e.preventDefault();
    setBtnDesable(true);
    simplePostCall(
      EditId ? ApiConfig.VACATION_UPDATE : ApiConfig.VACATION_ADD,
      JSON.stringify({
        ...vacationData,
        vacation_start_date: latestDate(
          vacationData?.vacation_start_date,
          "yyyy-MM-dd"
        ),
        vacation_end_date: latestDate(
          vacationData?.vacation_end_date,
          "yyyy-MM-dd"
        ),
      })
    )
      .then((res) => {
        setBtnDesable(false);
        if (res.result === true) {
          navigate("/Vacations");
          notifySuccess(res.message);
        } else {
          notifyError(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  const handleCancle = () => {
    navigate("/Vacations");
    setVacationData({
      vacation_name: "",
      vacation_start_date: "",
      vacation_end_date: "",
      vacation_desc: "",
    });
  };

  const vacationSingleData = () => {
    simplePostCall(
      ApiConfig.VACATION_SINGLE,
      JSON.stringify({ vacation_id: Number(EditId) })
    )
      .then((res) => {
        if (res?.result === true) {
          let data = res?.data[0];
          let startDate = data.vacation_start_date.split("T");
          let endDate = data.vacation_end_date.split("T");
          setVacationData({
            vacation_id: data.vacation_id,
            vacation_name: data.vacation_name ? data.vacation_name : "",
            vacation_start_date: data.vacation_start_date
              ? new Date(startDate[0])
              : "",
            vacation_end_date: data.vacation_end_date
              ? new Date(endDate[0])
              : "",
            vacation_desc: data.vacation_desc ? data.vacation_desc : "",
          });
          setStartDate(new Date(data.vacation_start_date));
          setEndDate(new Date(data.vacation_end_date));
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
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
        <div id="cx-wrapper">
          <div className="main-master-wrapper">
            <div className="Heading">
              <p>{EditId ? t("Edit Vacation") : t("Add Vacation")}</p>
            </div>
            <div className="form-wrapper">
              <Form
                noValidate
                validated={validated}
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>{t("Vacation Name")}</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Vacation Name")}
                        onChange={(e) =>
                          setVacationData({
                            ...vacationData,
                            vacation_name: e.target.value,
                          })
                        }
                        value={vacationData.vacation_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter Vacation Name.")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>{t("Vacation Start Date")}</Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          dateKey="vacation_start_date"
                          setDate={setVacationData}
                          data={vacationData}
                          // minDate={new Date}
                        />

                        <div>
                          <Form.Control.Feedback type="invalid">
                            {t("Please Select Vacation Start Date.")}
                          </Form.Control.Feedback>
                        </div>

                        {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>{t("Vacation End Date")}</Form.Label>
                      <div className="innerSelectBox weekCounter datepicker-main">
                        <CommonDatePicker
                          dateKey="vacation_end_date"
                          setDate={setVacationData}
                          data={vacationData}
                          minDate={vacationData?.vacation_start_date}
                        />

                        {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                      </div>
                      <Form.Control.Feedback type="invalid">
                        {t("Please Select Vacation End Date.")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>{t("Vacation Description")}</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows={6}
                        placeholder={t("Enter Description...")}
                        style={{ height: "100px" }}
                        onChange={(e) =>
                          setVacationData({
                            ...vacationData,
                            vacation_desc: e.target.value,
                          })
                        }
                        value={vacationData.vacation_desc}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("Please Select Vacation Description")}
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

export default AddVacation;

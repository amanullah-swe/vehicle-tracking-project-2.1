import { React, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { color, motion } from "framer-motion";
import import_icon from "../../assets/images/import_icon.svg";
import export_icon from "../../assets/images/export_icon.svg";
import DatePicker from "react-datepicker";
import Calendar from "../../assets/images/calendar.svg";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import ReactSelect from "../../sharedComponent/ReactSelect";
import { useTranslation } from "react-i18next";

const UserAlert = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { t, i18n } = useTranslation();

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
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
        <div className="displayFlexInp useralert">
          <div className="innerSelectBox weekCounter selectForm form_input_main">
            <Form.Select
              required
              as="select"
              type="select"
              name="Speed_limit"
              className="innerCust"
            >
              <option value="">Vehicle Name</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
            </Form.Select>
          </div>
          <div className="innerSelectBox weekCounter selectForm form_input_main">
            <Form.Select
              required
              as="select"
              type="select"
              name="Speed_limit"
              className="innerCust"
            >
              <option value="">User Name</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
            </Form.Select>
          </div>
          <div className="innerSelectBox weekCounter selectForm form_input_main">
            <Form.Control
              required
              type="text"
              placeholder="Alert Name."
              className="innerCust"
            />
          </div>
          <div className="innerSelectBox weekCounter selectForm form_input_main datepicker-main">
            <DatePicker
              selected={startDate}
              // placeholderText="Select Date"
              onChange={(date) => setStartDate(date)}
              className="form-control innerCust"
              placeholderText="Date To  "
            />
            <img src={Calendar} className="calendarLogo" alt="" />
          </div>
          <div className="headerDivIc form_input_main">
            <Link to="#">
              <img src={import_icon} alt="" />
            </Link>
          </div>
          <div className="headerDivIc form_input_main">
            <Link to="#">
              <img src={export_icon} alt="" />
            </Link>
          </div>
        </div>
        <div className="UserAlert_main">
          <div className="tabel_wraper">
            <table className="table tableUseralert">
              <thead className="tableHead">
                <tr>
                  <th>{t("Sr.no")}</th>
                  <th>{t("Date & Time")}</th>
                  <th>{t("User Name")}</th>
                  <th>{t("Alert Name")}</th>
                  <th>{t("Location")}</th>
                </tr>
              </thead>
              <tbody className="tableBody">
                <tr>
                  <td>1</td>
                  <td>22-12-2022, 04:04:58 PM</td>
                  <td>Fleet Manager- John Doe</td>
                  <td>Sleep Tracking</td>
                  <td>Vishrantwadi, Pune</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>22-12-2022, 04:04:58 PM</td>
                  <td>Fleet Manager- John Doe</td>
                  <td>Sleep Tracking</td>
                  <td>Vishrantwadi, Pune</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>22-12-2022, 04:04:58 PM</td>
                  <td>Fleet Manager- John Doe</td>
                  <td>Sleep Tracking</td>
                  <td>Vishrantwadi, Pune</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>22-12-2022, 04:04:58 PM</td>
                  <td>Fleet Manager- John Doe</td>
                  <td>Sleep Tracking</td>
                  <td>Vishrantwadi, Pune</td>
                </tr>
                <tr>
                  <td>5 </td>
                  <td>22-12-2022, 04:04:58 PM</td>
                  <td>Fleet Manager- John Doe</td>
                  <td>Sleep Tracking</td>
                  <td>Vishrantwadi, Pune</td>
                </tr>
                <tr>
                  <td>6 </td>
                  <td>22-12-2022, 04:04:58 PM</td>
                  <td>Fleet Manager- John Doe</td>
                  <td>Sleep Tracking</td>
                  <td>Vishrantwadi, Pune</td>
                </tr>
                <tr>
                  <td>7 </td>
                  <td>22-12-2022, 04:04:58 PM</td>
                  <td>Fleet Manager- John Doe</td>
                  <td>Sleep Tracking</td>
                  <td>Vishrantwadi, Pune</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>22-12-2022, 04:04:58 PM</td>
                  <td>Fleet Manager- John Doe</td>
                  <td>Sleep Tracking</td>
                  <td>Vishrantwadi, Pune</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>22-12-2022, 04:04:58 PM</td>
                  <td>Fleet Manager- John Doe</td>
                  <td>Sleep Tracking</td>
                  <td>Vishrantwadi, Pune</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>22-12-2022, 04:04:58 PM</td>
                  <td>Fleet Manager- John Doe</td>
                  <td>Sleep Tracking</td>
                  <td>Vishrantwadi, Pune</td>
                </tr>
                <tr>
                  <td>11 </td>
                  <td>22-12-2022, 04:04:58 PM</td>
                  <td>Fleet Manager- John Doe</td>
                  <td>Sleep Tracking</td>
                  <td>Vishrantwadi, Pune</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>22-12-2022, 04:04:58 PM</td>
                  <td>Fleet Manager- John Doe</td>
                  <td>Sleep Tracking</td>
                  <td>Vishrantwadi, Pune</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>22-12-2022, 04:04:58 PM</td>
                  <td>Fleet Manager- John Doe</td>
                  <td>Sleep Tracking</td>
                  <td>Vishrantwadi, Pune</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserAlert;

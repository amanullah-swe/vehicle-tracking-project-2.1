import { React, useContext, useRef } from "react";
import Calendar from "../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getYear";
import range from "lodash/range";
import Carosule_left from "../assets/images/Carosule_left.svg";
import Carosule_Right from "../assets/images/Carosule_Right.svg";
import { AppContext } from "../context/AppContext";
import { latestDate } from "./common";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";

export default function CommonDatePicker({
  
  dateKey,
  setDate,
  data,
  keyDisable,
  minDate,
  dataDisbal,
  SetPlaceholder,

}) {
  const { DateFormatConfig,WeekenHide } = useContext(AppContext);
  console.log("WeekenHide",WeekenHide);
  const years = range(1950, 2100);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const datepickerRef = useRef(null);
  const handleImageClick = () => {
    if (datepickerRef.current) {
      datepickerRef.current.setOpen(true); // Programmatically open the datepicker
    }
  };
  var date = new Date();
  var todayDate = moment(date).format("dd-mm-yyyy"); 















  const isWeekday = (date) => {
    const day = date.getDay();
  
    if (WeekenHide === "Sunday") {
      // Disable Sunday
      return day !== 0;
    } else if (WeekenHide === "Monday") {
      // Disable Monday
      return day !== 1;
    }
  
    // For other cases, allow all days
    return true;
  };
  const calendarStartDay = WeekenHide === "Monday" ? 1 : 0;


  const { t, i18n } = useTranslation()
  return (
    <>
    <DatePicker
     calendarStartDay={calendarStartDay}
      maxDate={dataDisbal}
      className="datepicker-here form-control digits"
      minDate={minDate && minDate}
      filterDate={isWeekday}
      ref={datepickerRef}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="top_section">
          <button
            type="button"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            >
            <img src={Carosule_left} alt="" />
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
            >
            {years?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[date?.getMonth()]}
            onChange={({ target: { value } }) =>
            changeMonth(months.indexOf(value))
          }
          >
            {months?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            >
            <img src={Carosule_Right} alt="" />
          </button>
        </div>
      )}
      disabled={keyDisable}
      // selected={data[dateKey] ? data[dateKey] :""}
      selected={data[dateKey] ? new Date(data[dateKey]) :""}
      //  value={data[dateKey] && data[dateKey]}
      placeholderText={`${t("Please Select")} ${SetPlaceholder? SetPlaceholder: t("Date")}`}
      onChange={(date) => {   
        let dateItem = { ...data }; 
        dateItem[dateKey] =date 
        setDate({ ...dateItem });
      } }
      dateFormat={
        DateFormatConfig === "dd-mm-yyyy"
        ? "dd-MM-yyyy"
        : DateFormatConfig === "YYYY-MM-DD"
        ? "yyyy-MM-dd"
        : DateFormatConfig === "MM-DD-YYYY"
        ? "MM-dd-yyyy"
        : "dd/MM/yyyy"
      }
      />
     <img
        src={Calendar}
        className="calendarLogo"
        alt=""
        onClick={handleImageClick} // Open the datepicker on image click
      />
      </>
  );
}

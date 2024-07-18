import React, { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import View from "../../../assets/images/Group.svg";
import Export from "../../../assets/images/Edit-Camunication.svg";
import Import from "../../../assets/images/ic-Import.svg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getReports } from "../../../store/reportSlice";
import { getDrivers } from "../../../store/driverSlice";
import { getvehicleList } from "../../../store/vehicleListSlice";
import { getTripActivity } from "../../../store/tripActivitySlice";
import { getDriverRanking } from "../../../store/driverRankingSlice";
import { getVehicleAlert } from "../../../store/VehicleAlertSlice";
import { getAcceleration } from "../../../store/accelerationSlice";
import NoDataComp from "../../../sharedComponent/NoDataComp";
import { addInterval } from "../../../sharedComponent/common";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const ReportFilter = () => {
  const [selectedDriver, setSelectedDriver] = useState(0);
  const [selectedVehicleList, setSelectedVehicleList] = useState(0);

  const drivers = useSelector((state) => state.driver.drivers);
  const vehicleList = useSelector((state) => state.vehicleList.vehicleList);
  const tripActivity = useSelector((state) => state.tripActivity.tripActivity);

  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [getVehicalDetails, setVehicleDetails] = useState([]);

  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const params = useParams();
  //   const [selectedDataMethode, setSelectedDataMethode] = useState("Week");
  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getvehicleList());
    dispatch(getTripActivity());
    // dispatch(getDriverRanking());
    // dispatch(getVehicleAlert());
    // dispatch(getAcceleration());
  }, []);
  const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });
  const [currentValue, setCurrentValue] = useState(0);
  const [selectedValue, setSelectedValue] = useState("date");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showData, setShowData] = useState("");
  useEffect(() => {
    addInterval(
      new Date(),
      currentValue,
      selectedValue,
      setShowData
      //   setCurrentDate
    );
  }, []);

  const handleNextButtonClick = () => {
    // Increment the selected date based on the interval
    setCurrentValue((prev) => prev + 1);
    setSelectedDate(
      addInterval(
        selectedDate,
        1,
        selectedValue,
        setShowData,
        setCurrentDate,
        currentValue
      )
    ); // Change selectedValue to the appropriate interval
  };
  const handleBackButtonClick = () => {
    // Decrement the selected date based on the interval
    setCurrentValue((prev) => prev - 1);
    setSelectedDate(
      addInterval(
        selectedDate,
        -1,
        selectedValue,
        setShowData,
        setCurrentDate,
        currentValue
      )
    ); // Change 'year' to the appropriate interval
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
        <div className="report-viwe-head" id="Viwe_Report_Respoasive">
          <div className="leftContent">
            <div class="btn-wrapper">
              <button onClick={handleBackButtonClick} class="cx-btn-2">
                Back
              </button>
            </div>
            <div class="btn-wrapper">
              <button
                // className=""
                class="cx-btn-2"
                onClick={handleNextButtonClick}
              >
                Next
              </button>
            </div>
            <div>
              <div className="innerSelectBox weekCounter datepicker-main">
                <CommonDatePicker
                  dateKey={"toDayDate"}
                  setDate={setCurrentDate}
                  data={currentDate}
                  SetPlaceholder={"Today Date"}
                />
              </div>
            </div>
          </div>

          {showData?.toString() && (
            <p>
              {t("Vehicle Summary Report")}:{showData?.toString()}{" "}
            </p>
          )}

          <div>
            <select
            id="selectBox"
              className="form-select"
              aria-label="Default select example"
              placeholder="Vehicle"
              value={selectedValue}
              onChange={(e) => {
                // handleIntervalChange(e)
                setSelectedValue(e.target.value);
                // setCurrentDate({ toDayDate: new Date("12-02-2025") })
                addInterval(
                  new Date(),
                  currentValue,
                  e.target.value,
                  setShowData
                  //   setCurrentDate
                );
                // setSelectedDataMethode( addInterval(new Date(), 0,e.target.value));
                // getAllDates(e.target.value)
              }}
            >
              {/* <option value="">{t("Sort here")}</option> */}
              <option value="annual">{t("Annual")}</option>
              <option value="half-year">{t("Half-Year")}</option>
              <option value="quarter">{t("Quater")}</option>
              <option value="month">{t("Month")}</option>
              <option value="week">{t("Week")}</option>
              <option value="date">{t("Date")}</option>
              {/* <option value="Custom Range"> {t("Custom Range")}</option> */}
            </select>
          </div>

        </div>
        <div className="Vehcle-main-tabs">
          <div className="main-master-wrapper" id="View_Report_Header">
            <div className="all-vehical-head row vehicle-top-inputs">
              <div className="input-section-wrapper">
                <div className="row">
                  <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Trip Name"
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                    {/* {getVehicalDetails.map((vehical) =>{ */}

                    <select
                      className="form-select"
                      aria-label="Default select example"
                      placeholder="Vehicle"
                    >
                      <option value="">All Vehicle</option>
                      {vehicleList?.map((vehicle) => (
                        <option key={vehicle.vehicle_id}>
                          {vehicle.vehicle_number}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      placeholder="Driver"
                      onChange={(e) => setSelectedDriver(e.target.value)}
                      value={selectedDriver}
                    >
                      <option value="">All Driver</option>
                      {drivers.map(({ userId, userName }) => (
                        <option key={userId} value={userId}>
                          {userName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* <div className="right-export-btn-section-wrapper">
                <Link to="#">
                  <div className="c-pointer">
                    <img src={Export} alt="" />
                  </div>
                </Link>
                <div className="c-pointer">
                
                </div>
              </div> */}
              <div className="right-export-btn-section-wrapper">
                <div className="customer-option">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <img src={Import} alt="" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link
                          //   onClick={() =>
                          //     getExportChat(TransportExport)
                          //   }
                          className="d-block"
                        >
                          PDF
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item>
                        <Link
                          //   onClick={(e) => {
                          //     downLoadExcelSheet();
                          //   }}
                          className="d-block"
                        >
                          Excel
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="yauto">
              <div className="totalTabelHeight">
                {tripActivity.length > 0 ? (
                  <table className="table tableAdmin tabelheiht">
                    <thead className="tableHead">
                      <tr>
                        <th>{t("trip vehicle id")}</th>
                        <th>{t("trip route id")}</th>
                        <th>{t("trip type")}</th>
                        <th>{t("trip shift")}</th>
                        <th>{t("trip status")}</th>
                        <th>{t("trip driver id")}</th>
                        <th>{t("trip helper id")}</th>
                        <th>{t("vehicle imei")}</th>
                        <th>{t("vehicle status")}</th>
                        <th>{t("Action")}</th>
                      </tr>
                    </thead>
                    <tbody className="tableBody">
                      {tripActivity?.map((tripmodel) => (
                        <tr key={tripmodel.trip_id}>
                          <td>{tripmodel.trip_vehicle_id}</td>
                          <td>{tripmodel.trip_route_id}</td>
                          <td>{tripmodel.trip_type}</td>
                          <td>{tripmodel.trip_shift}</td>
                          <td>{tripmodel.trip_status}</td>
                          <td>{tripmodel.trip_driver_id}</td>
                          <td>{tripmodel.trip_helper_id}</td>
                          <td>{tripmodel.vehicle_imei}</td>
                          <td>{tripmodel.vehicle_status}</td>
                          <td>
                            <div className="innerFlex">
                              <Link to="/NotificationDetails ">
                                <img src={View} className="me-3" alt="" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="justify-content-center align-item-center">
                    <NoDataComp />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportFilter;

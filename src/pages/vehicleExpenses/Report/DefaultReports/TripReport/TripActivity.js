import React, { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../../../../context/AppContext";
import View from "../../../../../assets/images/Group.svg";
import Export from "../../../../../assets/images/Edit-Camunication.svg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getReports } from "../../../../../store/reportSlice";
import { getDrivers } from "../../../../../store/driverSlice";
import { getvehicleList } from "../../../../../store/vehicleListSlice";
import { getTripActivity } from "../../../../../store/tripActivitySlice";
// import { getDriverRanking } from "../../../store/driverRankingSlice";
// import { getVehicleAlert } from "../../../store/VehicleAlertSlice";
// import { getAcceleration } from "../../../store/accelerationSlice";

const TripActivity = () => {
  const [selectedDriver, setSelectedDriver] = useState(0);
  const [selectedVehicleList, setSelectedVehicleList] = useState(0);

  const drivers = useSelector((state) => state.driver.drivers);
  const vehicleList = useSelector((state) => state.vehicleList.vehicleList);
  const tripActivity = useSelector((state) => state.tripActivity.tripActivity);

  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getvehicleList());
    dispatch(getTripActivity());
    // dispatch(getDriverRanking());
    // dispatch(getVehicleAlert());
    // dispatch(getAcceleration());
  }, []);

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
          <p>{t("Vehicle Summary Report")} : January 2023</p>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              {t("Sort By")}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" className="tolisthead">
                <p>{t("Sort By")}</p>
                <p className="custom-save-btn">{t("Save")}</p>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">{t("Annual")}</Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                {t("Semi-Annual")}
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">{t("Quater")}</Dropdown.Item>
              <Dropdown.Item href="#/action-3">{t("Month")}</Dropdown.Item>
              <Dropdown.Item href="#/action-3">{t("Week")}</Dropdown.Item>
              <Dropdown.Item href="#/action-3">{t("Day")}</Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                {t("Custom Range")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      placeholder="Vehicle"
                    >
                      <option value={0}>Vehicle</option>
                      {vehicleList.map((vehicle) => (
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
                      <option value={0}>Driver</option>
                      {drivers.map(({ userId, userName }) => (
                        <option key={userId} value={userId}>
                          {userName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="right-export-btn-section-wrapper">
                <Link to="#">
                  <div className="c-pointer">
                    <img src={Export} alt="" />
                  </div>
                </Link>
                <div className="c-pointer">
                  {/* <img src={Import} alt="" /> */}
                </div>
              </div>
            </div>
            <div className="yauto">
              <div className="totalTabelHeight">
                <table className="table tableAdmin tabelheiht">
                  <thead className="tableHead">
                    <tr>
                      <th>{t("trip_vehicle_id")}</th>
                      <th>{t("trip_route_id")}</th>
                      <th>{t("trip_type")}</th>
                      <th>{t("trip_shift")}</th>
                      <th>{t("trip_status")}</th>
                      <th>{t("trip_driver_id")}</th>
                      <th>{t("trip_helper_id")}</th>
                      <th>{t("vehicle_imei")}</th>
                      <th>{t("vehicle_status")}</th>
                      <th>{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {tripActivity.map((tripmodel) => (
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
                          {/* <Link to="/NotificationDetails "> */}
                            {/* <Link to="# ">
                              <img src={View} className="me-3" alt="" />
                            </Link> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TripActivity;

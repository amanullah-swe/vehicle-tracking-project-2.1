import React from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Logout from "../../assets/images/import_icon.svg";
import Share from "../../assets/images/XMLID_1022_.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const FuelAlerts = () => {

  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;

  const { sidebar } = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const { t, i18n } = useTranslation();

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
      <div id="cx-wrapper" className="FuelManagementDashbord">
        <div className="top_contain_fule">
          <div className="row top-content ">
            <div className="col-lg-10 col-md-12 arrange-margin left">
              <div className="row p-0">
                <div className="col-md-3">
                  <div className="weekCounter">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="weekCounter">
                    <input
                      type="Date"
                      className="form-control"
                      placeholder="Date"
                    />
                  </div>
                </div>
              </div>
            </div>
            {
              userRole === "customer" ||
                (accessRights &&
                  accessRights?.rights_manage_fuel_management_fuel_alerts) ? (
                <div className="col-lg-2 col-md-12 mainCol4 right">
                  <div className="leftSideSec">
                    <Link to="#">
                      <div className="inconMain left-margin me-0">
                        <img src={Share} alt="" />
                      </div>
                    </Link>
                  </div>
                </div>
              ) : null
            }

          </div>
        </div>
        <div className="FuelALertDetails">
          <div className="AbnormalFuelConsumption">
            <div className="Heading_fule">
              <p>{t("Abnormal Fuel Consumption")}</p>
            </div>
            <div className="AbnormalFuelConsumption_table">
              <table className="AbnormalFuelConsumption_table_main">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Vehicle")}</th>
                    <th>{t("Driver")}</th>
                    <th>{t("Abnormal Activity")}</th>
                    <th>{t("Date")}</th>
                    <th>{t("Status")}</th>
                  </tr>
                </thead>
                <tbody className="tableBody">
                  <tr>
                    <td>1</td>
                    <td>Toyota Innova</td>
                    <td>FERNANDO ALONSO</td>
                    <td>
                      Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                      skkdskdd sllslc{" "}
                    </td>
                    <td>01-01-2023</td>
                    <td className="redColor">High</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Bajaj Pulsur</td>
                    <td>MARIO ANDRETTI</td>
                    <td>
                      Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                      skkdskdd sllslc{" "}
                    </td>
                    <td>15-08-2023</td>
                    <td className="yellowColor">Moderate</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>City Honda</td>
                    <td>JIM CLARK</td>
                    <td>
                      Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                      skkdskdd sllslc{" "}
                    </td>
                    <td>15-08-2023</td>
                    <td className="Low">Low</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Suzuki Desire</td>
                    <td>JUAN MANUEL FANGIO</td>
                    <td>
                      Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                      skkdskdd sllslc{" "}
                    </td>
                    <td>22-10-2023</td>
                    <td className="Low">Low</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Honda Activa</td>
                    <td>A.J. FOYT</td>
                    <td>
                      Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                      skkdskdd sllslc{" "}
                    </td>
                    <td>18-12-2023</td>
                    <td className="Low">Low</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="AbnormalGroupExpense">
            <div className="Heading_fule">
              <p>{t("Abnormal Group Expense")}</p>
            </div>
            <div className="AbnormalFuelConsumption_table">
              <table className="AbnormalFuelConsumption_table_main">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Vehicle")}</th>
                    <th>{t("Driver")}</th>
                    <th>{t("Abnormal Activity")}</th>
                    <th>{t("Date")}</th>
                    <th>{t("Status")}</th>
                  </tr>
                </thead>
                <tbody className="tableBody">
                  <tr>
                    <td>1</td>
                    <td>Toyota Innova</td>
                    <td>FERNANDO ALONSO</td>
                    <td>
                      Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                      skkdskdd sllslc{" "}
                    </td>
                    <td>01-01-2023</td>
                    <td className="redColor">High</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Bajaj Pulsur</td>
                    <td>MARIO ANDRETTI</td>
                    <td>
                      Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                      skkdskdd sllslc{" "}
                    </td>
                    <td>15-08-2023</td>
                    <td className="yellowColor">Moderate</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>City Honda</td>
                    <td>JIM CLARK</td>
                    <td>
                      Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                      skkdskdd sllslc{" "}
                    </td>
                    <td>15-08-2023</td>
                    <td className="Low">Low</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Suzuki Desire</td>
                    <td>JUAN MANUEL FANGIO</td>
                    <td>
                      Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                      skkdskdd sllslc{" "}
                    </td>
                    <td>22-10-2023</td>
                    <td className="Low">Low</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Honda Activa</td>
                    <td>A.J. FOYT</td>
                    <td>
                      Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                      skkdskdd sllslc{" "}
                    </td>
                    <td>18-12-2023</td>
                    <td className="Low">Low</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FuelAlerts;

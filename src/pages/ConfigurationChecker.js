import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ConfigurationChecker = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
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
        <div className="main-master-wrapper form_input_main">
          <div className="config-checker-desc">
            <p>Description</p>
          </div>
          <div className="config-checker-desc-text">
            <p>
              This script checks if your server configuration meets the
              requirements for running our application.It checks configuration
              and data entry for each and every modules,also vehicle
              assignment,trip assignment settings are correct. There are two
              kinds of requirements being checked. Mandatory requirements are
              those that have to be met to allow our application to work as
              expected. There are also some optional requirements being checked
              which will show you a warning when they do not meet.You can use
              our application without them but some specific functionality may
              be not available in this case.
            </p>
          </div>
        </div>
        <div className="main-master-wrapper form_input_main">
          <div className="config-checker-desc">
            <p>Conclusion</p>
          </div>
          <div className="config-checker-desc-text">
            <p>
              Applications does not satisfy required configuration, please do
              all missing configuration before start using of application, pay
              attention to the errors listed above and check if your application
              will use the corresponding features..
            </p>
          </div>
        </div>
        <div className="main-master-wrapper form_input_main" id="ForOver_Flow_IN_ConfiCheckeer">
          <div className="config-checker-summary-wrapper">
            <div className="summary-status-wrapper">
              <div className="config-checker-desc">
                <p>Summary</p>
              </div>
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="passed common-summary-tab">
                    <p>Passed</p>
                    <p>05</p>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="failed common-summary-tab">
                    <p>Failed</p>
                    <p>05</p>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="warning common-summary-tab">
                    <p>Warning</p>
                    <p>05</p>
                  </div>
                </div>
              </div>
              <div className="summary-table-wrapper">
                <table className="summary-table">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Details</th>
                      <th>Result</th>
                      <th>Memo</th>
                      <th>Required Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-row-custom">
                      <td className="passed">1</td>
                      <td className="passed">Vehicle Type</td>
                      <td className="passed">Passed</td>
                      <td className="passed"></td>
                      <td className="passed"></td>
                    </tr>
                    <tr className="table-row-custom">
                      <td className="passed">2</td>
                      <td className="passed">Vehicles</td>
                      <td className="passed">Passed</td>
                      <td className="passed"></td>
                      <td className="passed"></td>
                    </tr>
                    <tr className="table-row-custom">
                      <td className="passed">3</td>
                      <td className="passed">Drivers</td>
                      <td className="passed">Passed</td>
                      <td className="passed"></td>
                      <td className="passed"></td>
                    </tr>
                    <tr className="table-row-custom">
                      <td className="passed">4</td>
                      <td className="passed">Bus Assistants</td>
                      <td className="passed">Passed</td>
                      <td className="passed"></td>
                      <td className="passed"></td>
                    </tr>
                    <tr className="table-row-custom">
                      <td className="warning">5</td>
                      <td className="warning">Driver Assignment</td>
                      <td className="warning">Warning</td>
                      <td className="warning">
                        Below Drivers Are Not Assigned Yet <br />
                        Ajinkya <br />
                        Bhagyesh <br />
                        Pawan <br />
                        Avinash
                      </td>
                      <td className="warning">
                        <Link to="#">Go to Vehicle Assignment</Link>
                      </td>
                    </tr>
                    <tr className="table-row-custom">
                      <td className="passed">6</td>
                      <td className="passed">Routes</td>
                      <td className="passed">Passed</td>
                      <td className="passed"></td>
                      <td className="passed"></td>
                    </tr>
                    <tr className="table-row-custom">
                      <td className="failed">7</td>
                      <td className="failed">Pickup Points</td>
                      <td className="failed">Failed</td>
                      <td className="failed">
                        Below routes are not assigned with any pickup point.{" "}
                        <br />
                        Ajinkya <br />
                        Bhagyesh <br />
                        Pawan <br />
                        Avinash
                      </td>
                      <td className="failed">
                        <Link to="#">Go to Pickup points</Link>
                      </td>
                    </tr>
                    <tr className="table-row-custom">
                      <td className="failed">8</td>
                      <td className="failed">General Settings</td>
                      <td className="failed">Failed</td>
                      <td className="failed">Transportation Type os not Set</td>
                      <td className="failed">
                        <Link to="#">Go to General Settings</Link>
                      </td>
                    </tr>
                    <tr className="table-row-custom">
                      <td className="passed">9</td>
                      <td className="passed">Notification Settings</td>
                      <td className="passed">Passed</td>
                      <td className="passed"></td>
                      <td className="passed"></td>
                    </tr>
                    <tr className="table-row-custom">
                      <td className="passed">10</td>
                      <td className="passed">Trips </td>
                      <td className="passed">Passed</td>
                      <td className="passed"></td>
                      <td className="passed"></td>
                    </tr>
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

export default ConfigurationChecker;

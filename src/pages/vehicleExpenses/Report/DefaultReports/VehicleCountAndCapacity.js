import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { AppContext } from "../../../../context/AppContext";
import SubHeader from "../../../../sharedComponent/SubHeader";
import Chart from "react-apexcharts";
import { simplePostCall } from "../../../../api/ApiServices";
import ApiConfig from "../../../../api/ApiConfig";
import Loader from "../../../../sharedComponent/Loader";

const VehicleCountAndCapacity = () => {
  const { t } = useTranslation();
  const [tripList, setTripList] = useState([]);
  const {
    sidebar,
    setLinkReport,
    setReportHader,
    OptionDynamicDownload,
    setOptionDynamicDownload,
    recordsPerPage,
    timeZone,
  } = useContext(AppContext);
  const [locationalCap, setLocationalCap] = useState([]);
  const [loading, setLoading] = useState(false);
  const [NextDateShow, setNextDateShow] = useState({ toNextDate: new Date() });
  const [VehicleId, setVehicleId] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState(0);
  const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });

  const [data, setData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          t("(Vehicle < 5)"),
          t("(Vehicle < 10)"),
          t("(Vehicle 10 - 20)"),
          t("(Vehicle 20 - 40)"),
          t("(Vehicle 40 - 60)"),
          t("(Vehicle 60 - 80)"),
        ],
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
        },
      },
      colors: ["#9c4900"],
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  });

  const getSeactAndVehicleCap = () => {
    setLoading(true);
    let payload = {
      format: "",
    };
    simplePostCall(
      ApiConfig.GET_VEHICLE_COUNT_AND_SEATS,
      JSON.stringify(payload)
    )
      .then((res) => {
        if (res?.result) {
          setData((prevData) => ({
            ...prevData,
            series: res?.series,
          }));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSeactAndVehicleCap();
  }, []);

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  useEffect(() => {
    if (OptionDynamicDownload === "pdf" || OptionDynamicDownload === "excel") {
      getSeactAndVehicleCap(NextDateShow, VehicleId);
    }
  }, [NextDateShow, VehicleId]);

  useEffect(() => {
    getSeactAndVehicleCap(currentDate.toDayDate, VehicleId);
  }, [VehicleId, currentDate, NextDateShow]);
  useEffect(() => {
    getSeactAndVehicleCap(currentDate.toDayDate, VehicleId);
  }, [VehicleId, , currentDate, NextDateShow]);
  return (
    <>
      <motion.div
        className={sidebar && sidebar ? "taskMain " : "cx-active  taskMain"}
        id="cx-main"
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
        // key={"motionAnimation"}
      >
        <div
          id="cx-wrapper"
          className="Vehicle_inspition_dashboard heightFixed"
        >
          <div className="row">
            <div className="col-md-12 mb-4">
              <SubHeader />
            </div>
            <div className="col-md-12">
              {loading ? (
                <Loader />
              ) : (
                <div className="maincountgraph">
                  <div className="graphCard">
                    {/* <div className="divClassName">
                      <button
                        className="buttonClassName"
                        onClick={() => setOptionDynamicDownload("pdf")}
                      >
                        Download PDF
                      </button>
                    </div> */}
                    <div className="leftLine">
                      <span className="graphspan"> {t("VehicleCount")}</span>
                      {/* <span>V</span>
                                            <span>e</span>
                                            <span>h</span>
                                            <span>i</span>
                                            <span>c</span>
                                            <span>l</span>
                                            <span>e</span>
                                            <span>C</span>
                                            <span>o</span>
                                            <span>u</span>
                                            <span>n</span>
                                            <span>t</span> */}
                    </div>

                    <div className="graph">
                      <Chart
                        options={data.options}
                        series={data.series}
                        type="bar"
                        width="100%"
                        height="500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default VehicleCountAndCapacity;

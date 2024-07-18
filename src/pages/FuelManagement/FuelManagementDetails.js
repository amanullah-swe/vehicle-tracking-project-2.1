import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import Logout from "../../assets/images/import_icon.svg";
import Share from "../../assets/images/XMLID_1022_.svg";
import arrowup from "../../assets/images/arrowup.svg";
import arrowdown from "../../assets/images/arrowdown.svg";
import Chart from "react-apexcharts";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FuelManagementDetails = () => {
  const { sidebar } = useContext(AppContext);
  const { t, i18n } = useTranslation();

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const [state, setState] = useState({
    series: [
      {
        name: "Amount",
        data: [0, 600, 100, 700, 300, 100, 400, 100, 400, 200],
      },
    ],
    chart: {
      height: 350,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    options: {
      chart: {
        height: 440,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#803900"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "#8F430080",
          type: "vertical",
          shadeIntensity: 0.5,
          // gradientToColors: "#FF7800",
          opacityFrom: 0,
          opacityTo: 0,
          stops: [0, 90, 10, 100],
          colorStops: [],
        },
      },
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#8F4300"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "day",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="arrow_box">' +
            "<span>" +
            series[seriesIndex][dataPointIndex] +
            "</span>" +
            "$" +
            "</div>"
          );
        },
      },
    },
  });

  const [barState, setBarState] = useState({
    series: [
      {
        name: "Amount",
        data: [
          300, 200, 400, 100, 300, 50, 350, 200, 400, 200, 100, 400, 250, 320,
          245, 470, 540, 580, 100, 50, 470, 589, 450, 250,
        ],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#F6EFE9"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#F6EFE9"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "day",
        categories: [
          "MT",
          "B",
          "UC",
          "PT",
          "T",
          "AW",
          "UC",
          "XZ",
          "ZZ",
          "LC",
          "MT",
          "AY",
          "UC",
          "XZ",
          "T",
          "TR",
          "AW",
          "LC",
          "UC",
          "AY",
          "AW",
          "ZZ",
        ],
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            "Utility Cab" +
            "</span>" +
            "</div>"
          );
        },
      },
    },
  });

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
                      placeholder="Select Car"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="weekCounter">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Vehicle"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="weekCounter">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Date from"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="weekCounter">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Date To"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-12 mainCol4 right">
              <div className="leftSideSec">
                <Link to="#">
                  <div className="inconMain">
                    <img src={Logout} alt="" />
                  </div>
                </Link>
                <Link to="#">
                  <div className="inconMain left-margin me-0">
                    <img src={Share} alt="" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="Top_section_first mb-4">
          <div className="row ">
            <div className="col-lg-8">
              <div className="Summary">
                <div className="Heading_fule">
                  <p>{t("Summary")}</p>
                </div>
                <div className="Summary_body">
                  <div className="summary_left">
                    <div>
                      <p className="TotalSpend">{t("Total Spend")}</p>
                      <p className="amount">$2,250.50</p>
                    </div>
                    <div className="">
                      <div className="increes">
                        <p>{t("Increased by")} 50%</p>
                        <img src={arrowup} alt="" />
                      </div>
                      <p className="month">*{t("As per last month")}</p>
                    </div>
                  </div>
                  <div className="summery_right">
                    <Chart
                      options={state.auth.options}
                      series={state.auth.series}
                      type="area"
                      width="100%"
                      height="200"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="TopSpends">
                <div className="Heading_fule">
                  <p>{t("Top Spends")}</p>
                </div>
                <div className="row TopSpends_Body">
                  <div className="col-lg-6">
                    <div className="single_card_Spends topmar">
                      <p className="title">{t("Total Quantity")}</p>
                      <div className="amount_arrow">
                        <p className="amount">1000</p>
                        <img src={arrowup} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="single_card_Spends topmar">
                      <p className="title">{t("Total Runnings")}</p>
                      <div className="amount_arrow">
                        <p className="amount">5600kms</p>
                        <img src={arrowdown} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="single_card_Spends">
                      <p className="title">{t("Total Vehicle's")}</p>
                      <div className="amount_arrow">
                        <p className="amount">50</p>
                        <img src={arrowdown} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="single_card_Spends">
                      <p className="title">{t("Total Driver's")}</p>
                      <div className="amount_arrow">
                        <p className="amount">20</p>
                        <img src={arrowup} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Graph_Section_second mb-4">
          <div className="row">
            <div className="col-lg-12 mb-4">
              <div className="TopSpendsbyVehicles">
                <div className="Heading_fule">
                  <p className="heading">{t("Top Spends by Vehicles")}</p>
                  <p className="viewAll">{t("View All")}</p>
                </div>
                <div className="single_card_TopSpendsbyVehicles">
                  <p className="title">{t("Total Spend by")}</p>
                  <p className="amount">Utility Cab</p>
                </div>
                <div className="Barchart">
                  {/* <Chart
                                        options={barState.options}
                                        series={barState.series}
                                        type="area"
                                        width="100%"
                                        height="200"
                                    /> */}
                  <Chart
                    options={barState.options}
                    series={barState.series}
                    type="bar"
                    width="100%"
                    height="300"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="TopSpendsbyVehicles">
                <div className="Heading_fule">
                  <p className="heading">{t("Top Spends by Driver's")}</p>
                  <p className="viewAll">{t("View All")}</p>
                </div>
                <div className="single_card_TopSpendsbyVehicles">
                  <p className="title">{t("Total Spend by")}</p>
                  <p className="amount">Johnath Doe</p>
                </div>
                <div className="Barchart">
                  {/* <Chart
                                        options={barState.options}
                                        series={barState.series}
                                        type="area"
                                        width="100%"
                                        height="200"
                                    /> */}
                  <Chart
                    options={barState.options}
                    series={barState.series}
                    type="bar"
                    width="100%"
                    height="300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FuelManagementDetails;

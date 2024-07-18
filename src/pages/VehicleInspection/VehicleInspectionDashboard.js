import React from 'react'
import { motion } from "framer-motion";
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import import_icon from "../../assets/images/sideBar.svg";
import export_icon from "../../assets/images/export_icon.svg";
import Calendar from "../../assets/images/calendar.svg";
import { Link } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import { useTranslation } from 'react-i18next';
import { DatePicker } from 'antd';
import { useState } from 'react';
import arrowup from "../../assets/images/arrowup.svg";
import arrowdown from "../../assets/images/arrowdown.svg";
import EngineOprator from "../../assets/images/EngineOprator.svg";
import BreackSystem from "../../assets/images/BreackSystem.svg";
import Tires from "../../assets/images/Tires.svg";
import FuelTank from "../../assets/images/FuelTank.svg";
import Chart from "react-apexcharts";
import Carousel from 'react-bootstrap/Carousel';
import { useSelector } from 'react-redux';

const VehicleInspectionDashboard = () => {

    const accessRights = useSelector((state) => state.auth.accessRights);
    const userRole = accessRights && accessRights.rights_role;

    const { sidebar } = useContext(AppContext);
    const aninations = {
        initial: { opacity: 0, x: 400 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
    };
    const { t, i18n } = useTranslation();
    const [startDate, setStartDate] = useState("")
    const [vehicleSelect, setVehicleSelect] = useState("All")

    const [stateChaneg, setStateChaneg] = useState({
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

    const [state, setState] = useState({
        series: [
            {
                name: "Amount",
                data: [0, 100, 400, 100, 400, 200, 600, 100, 700, 300,],
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

    const [circle, setCircle] = useState({
        series: [50, 25, 20, 5],

        chart: {
            type: "donut",
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
        options: {
            chart: {
                height: 440,
                type: "donut",
                toolbar: {
                    show: false,
                },
            },
            labels: ["Checked and OK", "Require Attention", "Immediate Attention", "Dead Vehicles"],
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                },
            },
            colors: ["#62C572", "#FF9932", "#D95B5D", "#3C486B"],
            stroke: {
                width: 0,
            },
            //   tooltip: {
            //     enabled: false,
            //   },
        },
    });

    const [circle1, setCircle1] = useState({
        series: [20, 5, 50, 25],

        chart: {
            type: "donut",
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
        options: {
            chart: {
                height: 440,
                type: "donut",
                toolbar: {
                    show: false,
                },
            },
            labels: ["Fleet Manager ", "Driver", "Vehicle Assistant", "Supervisor's"],
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                },
            },
            colors: ["#F45050", "#3C486B", "#F9D949", "#926C6C"],
            stroke: {
                width: 0,
            },
            //   tooltip: {
            //     enabled: false,
            //   },
        },
    });

    const [barState, setBarState] = useState({
        series: [
            {
                name: "Amount",
                data: [300, 200, 400, 100, 300, 50, 350, 200, 400, 200, 100],
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
                    "T",
                    "PT",
                    "XZ",
                    "ZZ",
                    "LC",
                    "AY",
                    "TR",
                    "AW",
                ],
            },
            yaxis: {
                categories: [
                    "MT",
                    "B",
                    "UC",
                    "T",
                    "PT",
                    "XZ",
                    "ZZ",
                    "LC",
                    "AY",
                    "TR",
                    "AW",
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
            transition={{ duration: 0.1 }} >
            <div id="cx-wrapper" className="Vehicle_inspition_dashboard">
                <div className="holidays-filter-wrapper">
                    <div className="left-wrapper">
                        <div className="row g-0 d-flex justify-content-between">
                            <div className="col-md-4">
                                <div className="search-input">
                                    <Form.Select
                                        required
                                        as="select"
                                        type="select"
                                        name="Speed_limit"
                                        className="innerCust"
                                        onChange={(e) => { setVehicleSelect(e.target.value) }}
                                    >
                                        <option value="">Vehicle Name</option>
                                        <option value="All">All Vehicle</option>
                                        <option value="Truck">Truck</option>
                                        <option value="Car">Car</option>
                                        <option value="Bike">Bike</option>
                                    </Form.Select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="date-input">
                                    <div className="innerSelectBox weekCounter datepicker-main">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            className="form-control"
                                            placeholder='Start Date'
                                        />
                                        <img src={Calendar} className="calendarLogo" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="date-input">
                                    <div className="innerSelectBox weekCounter datepicker-main">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            className="form-control"
                                            placeholder='End Date'
                                        />
                                        <img src={Calendar} className="calendarLogo" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        userRole === "customer" ||
                            (accessRights &&
                                accessRights?.rights_manage_vehicle_inspection_dashboard) ? (
                            <div className="right-wrapper">
                                <Link
                                    to="/AddVacation"
                                    className="add-holiday-btn"
                                    variant="primary"
                                >
                                    + {t("New Inspection")}
                                </Link>
                                <Link to="#" className="import-icon">
                                    <img src={import_icon} alt="" />
                                </Link>
                                <Link to="#" className="export-icon">
                                    <img src={export_icon} alt="" />
                                </Link>
                            </div>
                        ) : null
                    }
                </div>
                <div className="row mt-3">
                    <div className="col-lg-8">
                        <div className="Summary">
                            <div className="Heading_fule">
                                <p>{t("Inspection Summary")}</p>
                            </div>
                            <div className="Summary_body">
                                <div className="summary_left">
                                    <div className="">
                                        <p className="TotalSpend">{t("Total Inspections")}</p>
                                        <p className="amount">{vehicleSelect === "All" ? "5000" : "1682"}</p>
                                    </div>
                                    <div className="">
                                        <div className="increes">
                                            <p>{t("Increased by")} {vehicleSelect === "All" ? "50%" : "23%"}</p>
                                            <img src={arrowdown} alt="" />
                                        </div>
                                        <p className="month">*{t("As per last month")}</p>
                                    </div>
                                </div>
                                <div className="summery_right">
                                    {vehicleSelect != "All" ? 
                                    <Chart
                                        options={stateChaneg.options}
                                        series={stateChaneg.series}
                                        type="area"
                                        width="100%"
                                        height="200"
                                    /> :
                                    <Chart
                                        options={state.auth.options}
                                        series={state.auth.series}
                                        type="area"
                                        width="100%"
                                        height="200"
                                    /> }

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="TopSpends">
                            <div className="Heading_fule">
                                <p>{t("Inspection Status")}</p>
                            </div>
                            <div className="row TopSpends_Body">
                                <div className="col-lg-6">
                                    <div className="single_card_Spends topmar">
                                        <p className="title">{t("Total Inspections")}</p>
                                        <div className="amount_arrow">
                                            <p className="amount">1000</p>
                                            <img src={arrowup} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="single_card_Spends topmar">
                                        <p className="title">{t("Checked and OK")}</p>
                                        <div className="amount_arrow">
                                            <p className="amount">5600kms</p>
                                            <img src={arrowdown} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mt-4">
                                    <div className="single_card_Spends">
                                        <p className="title">{t("Require Attentions")}</p>
                                        <div className="amount_arrow">
                                            <p className="amount">50</p>
                                            <img src={arrowdown} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mt-4">
                                    <div className="single_card_Spends">
                                        <p className="title">{t("Immediate Attentions")}</p>
                                        <div className="amount_arrow">
                                            <p className="amount">20</p>
                                            <img src={arrowup} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {vehicleSelect != "All" ?
                        <div className="col-lg-12 mt-4">
                            <div className="FaultType">
                                <div className="heading">Fault Type’s</div>
                                <Carousel interval={300000}>
                                    <Carousel.Item>
                                        <div className="FaultType_main">
                                            <div className="FaultType_Card">
                                                <div className="contain">
                                                    <label htmlFor="">Engine operations</label>
                                                    <p>08 Vehicles</p>
                                                </div>
                                                <div className="img">
                                                    <img src={EngineOprator} alt="" />
                                                </div>
                                            </div>
                                            <div className="FaultType_Card">
                                                <div className="contain">
                                                    <label htmlFor="">Brake System</label>
                                                    <p>07 Vehicles</p>
                                                </div>
                                                <div className="img">
                                                    <img src={BreackSystem} alt="" />
                                                </div>
                                            </div>
                                            <div className="FaultType_Card">
                                                <div className="contain">
                                                    <label htmlFor="">Tires</label>
                                                    <p>07 Vehicles</p>
                                                </div>
                                                <div className="img">
                                                    <img src={Tires} alt="" />
                                                </div>
                                            </div>
                                            <div className="FaultType_Card">
                                                <div className="contain">
                                                    <label htmlFor="">Fuel System</label>
                                                    <p>06 Vehicles</p>
                                                </div>
                                                <div className="img">
                                                    <img src={FuelTank} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="FaultType_main">
                                            <div className="FaultType_Card">
                                                <div className="contain">
                                                    <label htmlFor="">Engine operations</label>
                                                    <p>08 Vehicles</p>
                                                </div>
                                                <div className="img">
                                                    <img src={EngineOprator} alt="" />
                                                </div>
                                            </div>
                                            <div className="FaultType_Card">
                                                <div className="contain">
                                                    <label htmlFor="">Brake System</label>
                                                    <p>07 Vehicles</p>
                                                </div>
                                                <div className="img">
                                                    <img src={BreackSystem} alt="" />
                                                </div>
                                            </div>
                                            <div className="FaultType_Card">
                                                <div className="contain">
                                                    <label htmlFor="">Tires</label>
                                                    <p>07 Vehicles</p>
                                                </div>
                                                <div className="img">
                                                    <img src={Tires} alt="" />
                                                </div>
                                            </div>
                                            <div className="FaultType_Card">
                                                <div className="contain">
                                                    <label htmlFor="">Fuel System</label>
                                                    <p>06 Vehicles</p>
                                                </div>
                                                <div className="img">
                                                    <img src={FuelTank} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="FaultType_main">
                                            <div className="FaultType_Card">
                                                <div className="contain">
                                                    <label htmlFor="">Engine operations</label>
                                                    <p>08 Vehicles</p>
                                                </div>
                                                <div className="img">
                                                    <img src={EngineOprator} alt="" />
                                                </div>
                                            </div>
                                            <div className="FaultType_Card">
                                                <div className="contain">
                                                    <label htmlFor="">Brake System</label>
                                                    <p>07 Vehicles</p>
                                                </div>
                                                <div className="img">
                                                    <img src={BreackSystem} alt="" />
                                                </div>
                                            </div>
                                            <div className="FaultType_Card">
                                                <div className="contain">
                                                    <label htmlFor="">Tires</label>
                                                    <p>07 Vehicles</p>
                                                </div>
                                                <div className="img">
                                                    <img src={Tires} alt="" />
                                                </div>
                                            </div>
                                            <div className="FaultType_Card">
                                                <div className="contain">
                                                    <label htmlFor="">Fuel System</label>
                                                    <p>06 Vehicles</p>
                                                </div>
                                                <div className="img">
                                                    <img src={FuelTank} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div> : ""}
                    {vehicleSelect === "All" ? <>
                        <div className="col-lg-4 mt-4 compnentFixHeight">
                            <div className="TopSpendCategories">
                                <div className="Heading_fule">
                                    <p className="heading">{t("Inspections This Month")}</p>
                                </div>
                                <div className="single_card_TopSpendCategories">
                                    <p className="title">{t("Total Inspections")}</p>
                                    <p className="amount">500</p>
                                </div>
                                <div className="circle_chart">
                                    <Chart
                                        options={circle.options}
                                        series={circle.series}
                                        type="donut"
                                        width="100%"
                                        height="200"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 mt-4 compnentFixHeight">
                            <div className="TopSpendCategories">
                                <div className="Heading_fule">
                                    <p className="heading">{t("Top Inspector’s")}</p>
                                </div>
                                <div className="single_card_TopSpendCategories">
                                    <p className="title">{t("InspectIon By")}</p>
                                    <p className="amount">{t("Fleet Manager")}</p>
                                </div>
                                <div className="circle_chart">
                                    <Chart
                                        options={circle1.options}
                                        series={circle1.series}
                                        type="donut"
                                        width="100%"
                                        height="200"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 mt-4 compnentFixHeight">
                            <div className="TopSpendCategories">
                                <div className="Heading_fule">
                                    <p className="heading">{t("Top Spend Categories")}</p>
                                </div>
                                <div className="FaultType">
                                    <div className="FaultType_List">
                                        <p>Engine Operations</p>
                                        <label htmlFor="">58 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Brake System</p>
                                        <label htmlFor="">18 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Tires</p>
                                        <label htmlFor="">28 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Fuel System</p>
                                        <label htmlFor="">32 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Lightning Device</p>
                                        <label htmlFor="">31 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Safety Equipment's</p>
                                        <label htmlFor="">58 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Steering Mechanism</p>
                                        <label htmlFor="">58 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Suspensions</p>
                                        <label htmlFor="">58 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Engine operations</p>
                                        <label htmlFor="">58 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Engine Operations</p>
                                        <label htmlFor="">58 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Brake System</p>
                                        <label htmlFor="">18 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Tires</p>
                                        <label htmlFor="">28 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Fuel System</p>
                                        <label htmlFor="">32 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Lightning Device</p>
                                        <label htmlFor="">31 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Safety Equipment's</p>
                                        <label htmlFor="">58 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Steering Mechanism</p>
                                        <label htmlFor="">58 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Suspensions</p>
                                        <label htmlFor="">58 Vehicles</label>
                                    </div>
                                    <div className="FaultType_List">
                                        <p>Engine operations</p>
                                        <label htmlFor="">58 Vehicles</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : ""}

                    <div className="col-lg-6 mt-4">
                        <div className="TopSpendsbyVehicles">
                            <div className="Heading_fule">
                                <p className="heading">{t("Top Condition Vehicles Type")}</p>
                                <p className="viewAll">{t("View All")}</p>
                            </div>
                            <div className="single_card_TopSpendsbyVehicles">
                                <p className="title">{t("Vehicle Type ")}</p>
                                <p className="amount">{vehicleSelect === "All" ? "Utility Cab" : "MH12GF5022"}</p>
                            </div>
                            <div className="Barchart">
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

                    <div className="col-lg-6 mt-4">
                        <div className="lastActvity">
                            <div className="Heading_fule">
                                <p className="">{t("Inspection Log")}</p>
                                <p className="viewAll">{t("View All")}</p>
                            </div>
                            <div className="body">
                                <div className="activeList">
                                    <div className="time">01-01-2023, 03:15 PM</div>
                                    <div className="activePersone">
                                        <span>Fleet Manager John Doe</span> inspected <span>MH09GF1122</span>
                                    </div>
                                </div>
                                <div className="activeList">
                                    <div className="time">01-01-2023, 03:15 PM</div>
                                    <div className="activePersone">
                                        <span>Fleet Manager John Doe</span> inspected <span>MH09GF1122</span>
                                    </div>
                                </div>
                                <div className="activeList">
                                    <div className="time">01-01-2023, 03:15 PM</div>
                                    <div className="activePersone">
                                        <span>Fleet Manager John Doe</span> inspected <span>MH09GF1122</span>
                                    </div>
                                </div>

                                <div className="activeList">
                                    <div className="time">01-01-2023, 03:15 PM</div>
                                    <div className="activePersone">
                                        <span>Fleet Manager John Doe</span> inspected <span>MH09GF1122</span>
                                    </div>
                                </div>
                                <div className="activeList">
                                    <div className="time">01-01-2023, 03:15 PM</div>
                                    <div className="activePersone">
                                        <span>Fleet Manager John Doe</span> inspected <span>MH09GF1122</span>
                                    </div>
                                </div>
                                <div className="activeList">
                                    <div className="time">01-01-2023, 03:15 PM</div>
                                    <div className="activePersone">
                                        <span>Fleet Manager John Doe</span> inspected <span>MH09GF1122</span>
                                    </div>
                                </div>
                                <div className="activeList">
                                    <div className="time">01-01-2023, 03:15 PM</div>
                                    <div className="activePersone">
                                        <span>Fleet Manager John Doe</span> inspected <span>MH09GF1122</span>
                                    </div>
                                </div>
                                <div className="activeList">
                                    <div className="time">01-01-2023, 03:15 PM</div>
                                    <div className="activePersone">
                                        <span>Fleet Manager John Doe</span> inspected <span>MH09GF1122</span>
                                    </div>
                                </div>
                                <div className="activeList">
                                    <div className="time">01-01-2023, 03:15 PM</div>
                                    <div className="activePersone">
                                        <span>Fleet Manager John Doe</span> inspected <span>MH09GF1122</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12 mt-4">
                        <div className="UserTabel">
                            <div className="heading">
                                <p className="main">{t("Inspection Repair ")}</p>
                                <p className="viewall">
                                    <Link to="/UserAlert">{t("View all")}</Link>
                                </p>
                            </div>
                            <table className="table tableAdmin">
                                <thead className="tableHead">
                                    <tr>
                                        <th>{t("Sr.no")}</th>
                                        <th>{t("Vehicle Type")}</th>
                                        <th>{t("Vehicle Number")}</th>
                                        <th>{t("Inspection Date")}</th>
                                        <th>{t("Requested By")}</th>
                                        <th>{t("Inspected By")}</th>
                                        {vehicleSelect != "All" ? <th>{t("Repair Cost")}</th> : ""}
                                        <th>{t("Vehicle Compliance")}</th>
                                    </tr>
                                </thead>
                                <tbody className="tableBody">
                                    <tr>
                                        <td>1</td>
                                        <td>Truck</td>
                                        <td>MH12AA1234</td>
                                        <td>02-02-2023,05:49PM</td>
                                        <td>John Doe</td>
                                        <td>Fleet Manager- John Doe</td>
                                        {vehicleSelect != "All" ? <td>$2500</td> : ""}
                                        <td>Ok, Can be Driven...</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Car</td>
                                        <td>MH09FF4567</td>
                                        <td>02-02-2023,05:49PM</td>
                                        <td>K Gowtham</td>
                                        <td>Driver- K Gowtham</td>
                                        {vehicleSelect != "All" ? <td>$1500</td> : ""}
                                        <td>Alert! Need Attent...</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Utility Cab</td>
                                        <td>MH11GF1236</td>
                                        <td>02-02-2023,05:49PM</td>
                                        <td>Kyle Richie</td>
                                        <td>Transport Manager- Kyle Richie</td>
                                        {vehicleSelect != "All" ? <td>$2658</td> : ""}
                                        <td>Ok, Can be Driven...</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Pickup Van</td>
                                        <td>MH09GF0467</td>
                                        <td>02-02-2023,05:49PM</td>
                                        <td>James Bond</td>
                                        <td>Vehicle Assistant- James Bond</td>
                                        {vehicleSelect != "All" ? <td>$2500</td> : ""}
                                        <td>Brake Faults...</td>
                                    </tr>
                                    <tr>
                                        <td>5 </td>
                                        <td>Pickup Truck</td>
                                        <td>MH12KK9865</td>
                                        <td>02-02-2023,05:49PM</td>
                                        <td>Rohit Sharma</td>
                                        <td>Driver- Rohit Sharma</td>{vehicleSelect != "All" ? <td>$3579</td> : ""}
                                        <td>Oil Change and Re...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default VehicleInspectionDashboard
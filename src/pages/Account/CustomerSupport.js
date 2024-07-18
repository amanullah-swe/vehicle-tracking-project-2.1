import React, { useContext, useState } from "react";
import { Col, Dropdown, Form, Nav, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import Calendar from "../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import Export from "../../assets/images/ic-Export.svg";
import View from "../../assets/images/Group.svg";
import edit_icon from "../../assets/images/ic-edit.svg";
import right from "../../assets/images/rightDoubleArrow.svg";
import left from "../../assets/images/leftDoubleArrow.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Chart from "react-apexcharts";

const CustomerSupport = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const { t, i18n } = useTranslation();

  const [issueChart, setIssueChart] = useState("All")

  const [all, setAll] = useState({
    series: [
      {
        name: 'Series 1',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 2',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 3',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
      {
        name: 'Series 4',
        data: [30, 40, 35, 50],
      },
    ],
    chart: {
      type: "bar",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#775DD0", "#00E396", "#FEB019", "#FF4560"],
    options: {
      // chart: {
      //   height: 540,
      //   type: "area",
      //   toolbar: {
      //     show: false,
      //   },
      // },
      // dataLabels: {
      //   enabled: true,
      //   enabledOnSeries: [1],
      // },
      yaxis: {
        show: false, // Set to false to disable the y-axis
      },
      xaxis: {
        type: "day",
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
        ],
        labels: {
          color: ["#8F430080"],
          style: {
            fontSize: '12px'
          }
        }
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="issue_Tooltip">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Issue" +
            "</div>"
          );
        },
      },
    },
  });

  const [pending, setPending] = useState({
    series: [
      {
        name: "Amount",
        data: [30, 20, 40, 10, 30, 50, 35, 20, 40, 20, 10, 32, 45, 12, 65, 74, 14, 90, 45, 10, 87, 12, 80, 10, 12, 42, 48, 12, 98, 60]
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
      colors: ["#775DD0"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#775DD0"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      yaxis: {
        show: false, // Set to false to disable the y-axis
      },
      xaxis: {
        type: "day",
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
        ],
        labels: {
          color: ["#8F430080"],
          style: {
            fontSize: '12px'
          }
        }
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {        
          return (
            '<div class="issue_Tooltip">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Issue" +
            "</div>"
          );
        },
      },
    },
  });


  const [onHold, setOnHold] = useState({
    series: [
      {
        name: "Amount",
        data: [20, 10, 32, 45, 12, 65, 74, 14, 90, 45, 10, 87, 30, 20, 40, 10, 30, 50, 35, 20, 40, 12, 80, 10, 12, 42, 48, 12, 98, 60]
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
      colors: ["#FEB019"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#FEB019"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      yaxis: {
        show: false, // Set to false to disable the y-axis
      },
      xaxis: {
        type: "day",
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
        ],
        labels: {
          color: ["#8F430080"],
          style: {
            fontSize: '12px'
          }
        }
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="issue_Tooltip">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Issue" +
            "</div>"
          );
        },
      },
    },
  });

  const [resolved, setResolved] = useState({
    series: [
      {
        name: "Amount",
        data: [32, 45, 12, 65, 74, 14, 90, 45, 10, 30, 20, 40, 10, 30, 50, 35, 20, 40, 20, 10, 87, 12, 80, 10, 12, 42, 48, 12, 98, 60]
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
      colors: ["#00E396"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#00E396"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      yaxis: {
        show: false, // Set to false to disable the y-axis
      },
      xaxis: {
        type: "day",
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
        ],
        labels: {
          color: ["#8F430080"],
          style: {
            fontSize: '12px'
          }
        }
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="issue_Tooltip">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Issue" +
            "</div>"
          );
        },
      },
    },
  });

  const [Rejected, setRejected] = useState({
    series: [
      {
        name: "Amount",
        data: [30, 20, 20, 40, 20, 10, 32, 45, 12, 65, 74, 14, 90, 40, 10, 30, 50, 35, 45, 10, 87, 12, 80, 10, 12, 42, 48, 12, 98, 60]
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
      colors: ["#FF4560"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#FF4560"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      yaxis: {
        show: false, // Set to false to disable the y-axis
      },
      xaxis: {
        type: "day",
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
        ],
        labels: {
          color: ["#8F430080"],
          style: {
            fontSize: '12px'
          }
        }
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="issue_Tooltip">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Issue" +
            "</div>"
          );
        },
      },
    },
  });


  return (
    <main className={sidebar ? "taskMain " : "cx-active taskMain"} id="cx-main">
      <div id="cx-wrapper">
        <div className="row" id="Customer_Responsive">
          <div className="search-input innerSelectBox">
            <Form className="">
              <Form.Control
                type="search"
                placeholder="Username ..."
                aria-label="Search"
              />
            </Form>
          </div>
          <div className="search-input innerSelectBox">
            <Form className="">
              <Form.Control
                type="search"
                placeholder="Token No ..."
                aria-label="Search"
              />
            </Form>
          </div>
          <div className="mb-3 innerSelectBox weekcounder ">
            <select
              className="form-select"
              aria-label="Default select example"
              placeholder="Transportation Type"
            >
              <option selected>Category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="innerSelectBox weekCounter datepicker-main">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="form-control"
            />
            <img src={Calendar} className="calendarLogo" alt="" />
          </div>
          <div className="BTNwidthCustom cx-btn-3">
            <Link to="/ReportIssue">
              + {t("Report Issue")}
            </Link>
          </div>
          <div className="exportBTN">
            <div className="c-pointer">
              <Link to="/EmailSupport">
                <img src={Export} alt="" />
              </Link>
            </div>
          </div>
        </div>
        <div
          className="main-master-wrapper mb-3 inner-tabs-section custom-width-tab"
        >
          <div className="topChart_Report">
            <div className="containHeading">
              <p className="heading">
               {t(" Quick Statistics")}
              </p>
              <p className="contain">
                {t("List of issues reported by User's")}
              </p>
            </div>
            <div className="Chart_types">
              <div className="single_issue">
                <p className="count Total">2000</p>
                <p className="labels">{t("Total Issues")}</p>
              </div>
              <div className="single_issue">
                <p className="count Pending">10%</p>
                <p className="labels">{t("Pending Issues")}</p>
              </div>
              <div className="single_issue">
                <p className="count Resolved">75%</p>
                <p className="labels">{t("Resolved Issues")}</p>
              </div>
              <div className="single_issue">
                <p className="count OnHold">80%</p>
                <p className="labels">{t("On Hold Issues")}</p>
              </div>
              <div className="single_issue">
                <p className="count Rejected">5%</p>
                <p className="labels">{t("Rejected Issues")}</p>
              </div>
            </div>
          </div>
          <div className="chart">
            {issueChart === "All" ?
              <Chart
                options={all.options}
                series={all.series}
                type="bar"
                height={260}
              /> : ""}
            {issueChart === "Pending" ?
              <Chart
                options={pending.options}
                series={pending.series}
                type="bar"
                height={260}
              /> : ""}
            {issueChart === "Resolved" ?
              <Chart
                options={resolved.options}
                series={resolved.series}
                type="bar"
                height={260}
              /> : ""}
            {issueChart === "OnHold" ?
              <Chart
                options={onHold.options}
                series={onHold.series}
                type="bar"
                height={260}
              /> : ""}
            {issueChart === "Rejected" ?
              <Chart
                options={Rejected.options}
                series={Rejected.series}
                type="bar"
                height={260}
              /> : ""}
          </div>
          <div className="months">
            <img src={left} alt="" />
            <p className="monts_labels">November</p>
            <img src={right} alt="" />
          </div>
        </div>
        <div
          className="main-master-wrapper mb-0 inner-tabs-section custom-width-tab"
          id="customerSupportTabs"
        >
          <Tab.Container
            id="left-tabs-example"
            className="td-tab-wrapper"
            defaultActiveKey="0"
          >
            <Nav variant="pills" className="td-nav" id="InnerTabNew_Five">
              <Nav.Item className="td-tab" onClick={() => { setIssueChart("All") }}>
                <Nav.Link className="td-link" eventKey="0">
                  {t("All")}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="td-tab" onClick={() => { setIssueChart("Pending") }}>
                <Nav.Link className="td-link" eventKey="1">
                  {t("Pending")}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="td-tab" onClick={() => { setIssueChart("OnHold") }}>
                <Nav.Link className="td-link" eventKey="2">
                  {t("On Hold")}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="td-tab" onClick={() => { setIssueChart("Rejected") }}>
                <Nav.Link className="td-link" eventKey="3">
                  {t("Rejected")}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="td-tab" onClick={() => { setIssueChart("Resolved") }} >
                <Nav.Link className="td-link" eventKey="4">
                  {t("Resolved")}
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Col sm={12} className="">
              <Tab.Content>
                <Tab.Pane eventKey="0">
                  <div className="all-vehicle-main">
                    <div className="yauto">
                      <div
                        className="main-master-wrapper mb-0 p-0"
                        id="CustomerSupport"
                      >
                        <table className="holiday-table">
                          <thead className="ht-head">
                            <tr>
                              <td>{t("Sr.No.")}</td>
                              <td>{t("Username")}</td>
                              <td>{t("Token No.")}</td>
                              <td>{t("Issue")}</td>
                              <td>{t("Issue Date")}</td>
                              <td>{t("Resolved Date")}</td>
                              <td>{t("Status")}</td>
                              <td>{t("Action")}</td>
                            </tr>
                          </thead>
                          <tbody className="ht-body">
                            <tr className="table-row-custom">
                              <td>1</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Resolved</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>2</td>
                              <td>Bajaj Pulsur</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>On Hold</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>3</td>
                              <td>City Honda</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Pending</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>4</td>
                              <td>Suzuki Desire</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Rejected</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>5</td>
                              <td>Honda Activa</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Resolved</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>6</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Resolved</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>7</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Resolved</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>8</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Resolved</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="1">
                  <div className="all-vehicle-main">
                    <div className="yauto">
                      <div
                        className="main-master-wrapper mb-0 p-0"
                        id="CustomerSupport"
                      >
                        <table className="holiday-table">
                          <thead className="ht-head">
                            <tr>
                              <td>{t("Sr.No.")}</td>
                              <td>{t("Username")}</td>
                              <td>{t("Token No.")}</td>
                              <td>{t("Issue")}</td>
                              <td>{t("Issue Date")}</td>
                              <td>{t("Status")}</td>
                              <td>{t("Action")}</td>
                            </tr>
                          </thead>
                          <tbody className="ht-body">
                            <tr className="table-row-custom">
                              <td>1</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>Pending</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>2</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>Pending</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>3</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>Pending</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>4</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>Pending</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>5</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>Pending</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>6</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>Pending</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>7</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>Pending</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>8</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>Pending</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                  <div className="all-vehicle-main">
                    <div className="yauto">
                      <div
                        className="main-master-wrapper mb-0 p-0"
                        id="CustomerSupport"
                      >
                        <table className="holiday-table">
                          <thead className="ht-head">
                            <tr>
                              <td>{t("Sr.No.")}</td>
                              <td>{t("Username")}</td>
                              <td>{t("Token No.")}</td>
                              <td>{t("Issue")}</td>
                              <td>{t("Issue Date")}</td>
                              <td>{t("On Hold Date")}</td>
                              <td>{t("Status")}</td>
                              <td>{t("Action")}</td>
                            </tr>
                          </thead>
                          <tbody className="ht-body">
                            <tr className="table-row-custom">
                              <td>1</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>On Hold</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>2</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>On Hold</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>3</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>On Hold</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>4</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>On Hold</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>5</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>On Hold</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>6</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>On Hold</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>7</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>On Hold</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>8</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>On Hold</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="3">
                  <div className="all-vehicle-main">
                    <div className="yauto">
                      <div
                        className="main-master-wrapper mb-0 p-0"
                        id="CustomerSupport"
                      >
                        <table className="holiday-table">
                          <thead className="ht-head">
                            <tr>
                              <td>{t("Sr.No.")}</td>
                              <td>{t("Username")}</td>
                              <td>{t("Token No.")}</td>
                              <td>{t("Issue")}</td>
                              <td>{t("Issue Date")}</td>
                              <td>{t("Rejected Date")}</td>
                              <td>{t("Status")}</td>
                              <td>{t("Action")}</td>
                            </tr>
                          </thead>
                          <tbody className="ht-body">
                            <tr className="table-row-custom">
                              <td>1</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Rejected</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>2</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Rejected</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>3</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Rejected</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>4</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Rejected</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>5</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Rejected</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>6</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Rejected</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>7</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Rejected</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>8</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Rejected</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="4">
                  <div className="all-vehicle-main">
                    <div className="yauto">
                      <div
                        className="main-master-wrapper mb-0 p-0"
                        id="CustomerSupport"
                      >
                        <table className="holiday-table">
                          <thead className="ht-head">
                            <tr>
                              <td>{t("Sr.No.")}</td>
                              <td>{t("Username")}</td>
                              <td>{t("Token No.")}</td>
                              <td>{t("Issue")}</td>
                              <td>{t("Issue Date")}</td>
                              <td>{t("Resolved Date")}</td>
                              <td>{t("Status")}</td>
                              <td>{t("Action")}</td>
                            </tr>
                          </thead>
                          <tbody className="ht-body">
                            <tr className="table-row-custom">
                              <td>1</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Resolved</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>2</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Resolved</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>3</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Resolved</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>4</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Resolved</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>5</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Resolved</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>6</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Resolved</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>7</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Resolved</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                            <tr className="table-row-custom">
                              <td>8</td>
                              <td>Toyota Innova</td>
                              <td>1234356</td>
                              <td>
                                Lorem ipsum dolor sit amet, consetetur sadip sjhsdks
                                skkdskdd sllslc
                              </td>
                              <td>01-01-2023</td>
                              <td>01-01-2023</td>
                              <td>Resolved</td>
                              <td className="d-flex align-items-center">
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={View} alt="" />
                                  </div>
                                </Link>
                                <Link to="#">
                                  <div className="inconsIn">
                                    <img src={edit_icon} alt="" />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Tab.Container>
        </div>
      </div>
    </main>
  );
};

export default CustomerSupport;

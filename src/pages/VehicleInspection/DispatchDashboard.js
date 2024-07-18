import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import import_icon from "../../assets/images/sideBar.svg";
import export_icon from "../../assets/images/export_icon.svg";
import Calendar from "../../assets/images/calendar.svg";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import { DatePicker } from "antd";
import { useState } from "react";
import arrowup from "../../assets/images/arrowup.svg";
import arrowdown from "../../assets/images/arrowdown.svg";
import EngineOprator from "../../assets/images/EngineOprator.svg";
import BreackSystem from "../../assets/images/BreackSystem.svg";
import Tires from "../../assets/images/Tires.svg";
import FuelTank from "../../assets/images/FuelTank.svg";
import Chart from "react-apexcharts";
import Carousel from "react-bootstrap/Carousel";
import { useSelector } from "react-redux";
import ImportUser from "../../assets/images/imagesuser.png";
import CommonDatePicker from "../../sharedComponent/CommonDatePicker";
import { notifyError } from "../../sharedComponent/notify";
import { simpleGetCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import {
  DateDDMMYYYY,
  addInterval,
  latestDate,
} from "../../sharedComponent/common";
import range from "lodash/range";
import Loader from "../../sharedComponent/Loader";
import moment from "moment";
import NoDataComp from "../../sharedComponent/NoDataComp";
import { Select } from "antd";
const { Option } = Select;
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const DispatchDashboard = () => {
  const maxDate = new Date();
  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
  };
  useEffect(() => {
    OrderSummery(2024, 4);
    // OrderSummerystatic(2024)
  }, []);

  // const userRole = accessRights && accessRights.rights_role;

  const { sidebar, setLinkState, setDispatchStatus } = useContext(AppContext);

  const handleLinkClick = (stateValue) => {
    setLinkState(stateValue);
  };
  const { t, i18n } = useTranslation();
  const [startDate, setStartDate] = useState({ DateToday: new Date() });

  const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });
  const [optionData, setOptionData] = useState("month");
  const [daysToAdd, setDaysToAdd] = useState(30);
  const [NextDateShow, setNextDateShow] = useState({ toNextDate: new Date() });
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date());
  const [endDayOfMonth, setEndDayOfMonth] = useState(new Date());

  // State for weekStartDate and weekEndDate
  const [weekStartDate, setWeekStartDate] = useState(new Date());

  const [weekEndDate, setWeekEndDate] = useState(new Date());

  //   const handleNextButtonClick = () => {
  //     const newDate = new Date(NextDateShow.toNextDate);
  //     const currentDate = latestDate(new Date(),"yyyy-MM-dd") ;
  // const camparDate = latestDate(newDate,"yyyy-MM-dd")
  // const camparMonthe = latestDate(firstDayOfMonth,"yyyy-MM-dd")
  //     console.log(newDate);
  //     console.log(currentDate);
  //     console.log(currentDate.substring(0, 7))
  //     console.log(camparMonthe.substring(0, 7))

  //     if (camparDate === currentDate) {
  //         console.log("Nahi jana ka");
  //     } else if (camparMonthe.substring(0, 7) === currentDate.substring(0, 7) ) {
  //         // Process further if newDate is after or equal to the current date

  //     } else {
  //       newDate.setDate(newDate.getDate() + daysToAdd);
  //       setNextDateShow({ toNextDate: newDate });
  //     }
  // };

  const handleNextButtonClick = () => {
    // const { toNextDate, selectedOption } = NextDateShow;

    // Get the current date and format it to 'yyyy-MM-dd'
    const currentDate = latestDate(new Date(), "yyyy-MM-dd");

    // Get the new date from the state and format it to 'yyyy-MM-dd'
    const newDate = new Date(NextDateShow.toNextDate);
    const camparDate = latestDate(newDate, "yyyy-MM-dd");
    const camparMonthe = latestDate(firstDayOfMonth, "yyyy-MM-dd");

    // Disable the button based on the selected option
    if (
      (optionData === "month" &&
        camparMonthe.substring(0, 7) === currentDate.substring(0, 7)) ||
      // (optionData === 'week' && camparDate === currentDate) ||
      (optionData === "date" && camparDate === currentDate)
    ) {
      console.log("Next button disabled");
    } else {
      // Enable the button and update the next date
      // newDate.setDate(newDate.getDate() + daysToAdd);
      // setNextDateShow({ toNextDate: newDate, selectedOption });
      newDate.setDate(newDate.getDate() + daysToAdd);
      setNextDateShow({ toNextDate: newDate });
    }
  };

  const handleprivesButtonClick = () => {
    const newDate = new Date(NextDateShow.toNextDate);
    newDate.setDate(newDate.getDate() - daysToAdd);
    setNextDateShow({ toNextDate: newDate });
    console.log(`Subtracting ${daysToAdd} days. New date: ${newDate}`);
  };

  // Match current date and update number of days based on the selected option
  useEffect(() => {
    setNextDateShow({ toNextDate: currentDate.toDayDate });
    // const currentDate = moment();

    // console.log("checking", currentDate.isSame(currentDate, `${optionData == 'month' ? 'month':  optionData == 'week' ? 'week' : optionData == 'date' ? 'date' : ''  }`))
    switch (optionData) {
      case "month":
        setDaysToAdd(30);
        break;
      case "week":
        setDaysToAdd(7);
        break;
      case "date":
        setDaysToAdd(1);
        break;
      default:
        setDaysToAdd(30); // Default to 30 days for month
        break;
    }
  }, [optionData, currentDate]);

  // State for NextDateShow

  const formattedNextDate = () => {
    switch (optionData) {
      case "month":
        // Use state for firstDayOfMonth
        const firstDayOfMonthState = new Date(
          NextDateShow.toNextDate.getFullYear(),
          NextDateShow.toNextDate.getMonth(),
          1
        );
        if (firstDayOfMonth.getTime() !== firstDayOfMonthState.getTime()) {
          setFirstDayOfMonth(firstDayOfMonthState);
        }

        const lastDayOfMonth = new Date(
          NextDateShow.toNextDate.getFullYear(),
          NextDateShow.toNextDate.getMonth() + 1,
          0
        );
        if (endDayOfMonth.getTime() !== lastDayOfMonth.getTime()) {
          setEndDayOfMonth(lastDayOfMonth);
        }
        return `${firstDayOfMonthState.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })} - ${lastDayOfMonth.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`;
      // Other cases...

      case "week":
        // Use state for weekStartDate and weekEndDate
        const weekStartDateState = new Date(NextDateShow.toNextDate);
        const weekEndDateState = new Date(weekStartDateState);
        weekEndDateState.setDate(weekEndDateState.getDate() + 6);

        if (weekStartDate.getTime() !== weekStartDateState.getTime()) {
          setWeekStartDate(weekStartDateState);
        }

        if (weekEndDate.getTime() !== weekEndDateState.getTime()) {
          setWeekEndDate(weekEndDateState);
        }

        return `${weekStartDateState.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        })} - ${weekEndDateState.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`;
      case "date":
        return NextDateShow.toNextDate.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      default:
        // If 'current date' is selected, display the current month
        const currentMonth = new Date(
          NextDateShow.toNextDate.getFullYear(),
          NextDateShow.toNextDate.getMonth(),
          1
        );
        const lastDayOfCurrentMonth = new Date(
          NextDateShow.toNextDate.getFullYear(),
          NextDateShow.toNextDate.getMonth() + 1,
          0
        );
        return `${currentMonth.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })} - ${lastDayOfCurrentMonth.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`;
    }
  };

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
      // labels: ["Delivered", "Inprogress", "Cancel", "Return"],
      // labels: [`${t("Delivered")}`, `${t("Inprogress")}`, `${t("Cancel")}`, `${t("Return")}`,],
      labels: [t("Delivered"), t("Inprogress"), t("Cancel"), t("Return")],
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
      annotations: {
        // Add vertical line
        xaxis: [
          {
            x: 10, // Adjust the x-coordinate as needed
            borderColor: "#FF0000", // Set the color of the line
            label: {
              show: true,
              text: "Target", // Add label for the line
              style: {
                color: "#FF0000", // Set the color of the label
              },
            },
          },
        ],
      },
    },
  });

  const [circleDriver, setCircleDriver] = useState({
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
      // labels: ["Delivered", "Inprogress", "Cancel", "Return", "Blank"],
      labels: [
        `${t("Delivered_1_Taleeb")}`,
        `${t("Inprogress_1")}`,
        `${t("Cancel_1")}`,
        `${t("Return_1")}`,
        `${t("Blank_1")}`,
      ],
      labels: [
        t("Delivered"),
        t("Inprogress"),
        t("Cancel"),
        t("Return"),
        t("Blank"),
      ],
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
        },
      },
      colors: ["#62C572", "#FF9932", "#D95B5D", "#3C486B", "#FFFDD0"],
      stroke: {
        width: 0,
      },
      //   tooltip: {
      //     enabled: false,
      //   },
    },
  });

  const years = range(1950, 2100, 1);
  /*  const months = [
    {
      monthName: "January",
      monthId: 1,
    },
    {
      monthName: "February",
      monthId: 2,
    },
    {
      monthName: "March",
      monthId: 3,
    },
    {
      monthName: "April",
      monthId: 4,
    },
    {
      monthName: "May",
      monthId: 5,
    },
    {
      monthName: "June",
      monthId: 6,
    },
    {
      monthName: "July",
      monthId: 7,
    },
    {
      monthName: "August",
      monthId: 8,
    },
    {
      monthName: "September",
      monthId: 9,
    },
    {
      monthName: "October",
      monthId: 10,
    },
    {
      monthName: "November",
      monthId: 11,
    },
    {
      monthName: "December",
      monthId: 12,
    },
  ]; */

  const months = [
    {
      monthName: t("January"),
      monthId: 1,
    },
    {
      monthName: t("February"),
      monthId: 2,
    },
    {
      monthName: t("March"),
      monthId: 3,
    },
    {
      monthName: t("April"),
      monthId: 4,
    },
    {
      monthName: t("May"),
      monthId: 5,
    },
    {
      monthName: t("June"),
      monthId: 6,
    },
    {
      monthName: t("July"),
      monthId: 7,
    },
    {
      monthName: t("August"),
      monthId: 8,
    },
    {
      monthName: t("September"),
      monthId: 9,
    },
    {
      monthName: t("October"),
      monthId: 10,
    },
    {
      monthName: t("November"),
      monthId: 11,
    },
    {
      monthName: t("December"),
      monthId: 12,
    },
  ];

  const [month, setMonth] = useState("February");
  const [yearSelected, setYearSelected] = useState(new Date()?.getFullYear());
  // const [month1, setMonth1] = useState(new Date()?.getMonth());
  const currentMonth = new Date().getMonth() + 1;

  // Set the initial selected month to the current month
  const [month1, setMonth1] = useState(currentMonth);
  const [mearchantList, setMearchantList] = useState([]);

  // const [OptionData, setOptionData] = useState("");
  // console.log(OptionData);
  const [driverList, setDriverList] = useState([]);
  const [OrderSummeryList, setOrderSummeryList] = useState([]);
  const [OrderIncreased, setOrderIncreased] = useState([]);
  const [OrderSummeryListStatic, setOrderSummeryStatic] = useState([]);
  console.log("OrderSummeryListStatic", OrderSummeryListStatic);
  const [OrderSummeryListStatus, setOrderSummeryStatus] = useState([]);
  const [OrderDeliverable, setOrderDeliverable] = useState([]);
  const [OrderListData, setOrderListData] = useState([]);
  const [NextPage, setNextPage] = useState(true);
  console.log("NextPage", NextPage);
  // const [OrderListData, setOrderListData] = useState([]);

  const [driverSelected, setDriverSelected] = useState("8152");

  const [showDriver, setShowDriver] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    OrderSummerystatic(startDate?.DateToday);
  }, [startDate]);

  useEffect(() => {
    OrderSummeryDurabal(8152);
  }, [showDriver]);
  // const date = new Date(startDate);

  useEffect(() => {
    let data = driverList.find((ele) => ele.user_id == driverSelected);
    setShowDriver(data);
  }, [driverSelected]);

  const DriverListDropDown = () => {
    simplePostCall(
      ApiConfig.VEHICLE_DROWPDOWN,
      JSON.stringify({
        key: "DriversList",
      })
    )
      .then((res) => {
        if (res.result) {
          setDriverList(res?.data);
        } else {
          // notifyError(res.message);
        }
      })
      .catch((errr) => {
        console.log("errr", errr);
      })
      .finally(() => {
        // setLoading1(false);
      });
  };

  const OrderSummery = (year, month) => {
    // let body = JSON.stringify({});
    setLoading(true);
    simplePostCall(
      ApiConfig.GET_DISPACH_DASHBORD_SUMMARY,
      JSON.stringify({
        month: month,
        year: year,
      })
    )
      .then((res) => {
        if (res.success === true && res.circleGraphData && res.GraphData) {
          // Your code
          setOrderSummeryStatus(
            res?.circleGraphData ? res?.circleGraphData : []
          );
          setOrderSummeryList(res?.GraphData);
          setOrderIncreased(res);
        } else {
          notifyError(res.message);
        }

        // if (res.success) {

        // } else {
        //   notifyError(res.message);
        // }
      })
      .catch((errr) => {
        console.log("errr", errr);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const OrderSummerystatic = (month) => {
    simplePostCall(
      ApiConfig.GET_DISPACH_DASHBORD_STATIC,
      JSON.stringify({
        dispatch_package_activity_date: latestDate(month, "yyyy-MM-dd"),
      })
    )
      .then((res) => {
        if (res.success) {
          setOrderSummeryStatic(res);
        } else {
          notifyError(res.message);
        }
      })
      .catch((errr) => {
        console.log("errr", errr);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    OrderSummeryOrderList(
      currentDate.toDayDate,
      firstDayOfMonth,
      endDayOfMonth,
      NextDateShow.toNextDate,
      optionData,
      weekStartDate,
      weekEndDate
    );
  }, [
    weekEndDate,
    weekStartDate,
    currentDate,
    NextDateShow,
    firstDayOfMonth,
    optionData,
    endDayOfMonth,
  ]);

  const OrderSummeryOrderList = (
    date,
    firstmonth,
    endmonth,
    nextDate,
    selelctedData,
    weekStart,
    weekEnd
  ) => {
    let requestData;

    if (selelctedData === "month") {
      requestData = {
        page: "",
        page_limit: "",
        from_date: latestDate(firstmonth, "yyyy-MM-dd"),
        to_date: latestDate(endmonth, "yyyy-MM-dd"),
      };
    } else if (selelctedData === "week") {
      // Handle OtherMonth case
      requestData = {
        page: "",
        page_limit: "",
        from_date: latestDate(weekStart, "yyyy-MM-dd"),
        to_date: latestDate(weekEnd, "yyyy-MM-dd"),
      };
    } else {
      // Handle other cases
      requestData = {
        page: "",
        page_limit: "",
        from_date: latestDate(nextDate, "yyyy-MM-dd"),
        to_date: latestDate(nextDate, "yyyy-MM-dd"),
      };
    }

    if (requestData) {
      simplePostCall(
        ApiConfig.GET_DISPACH_DASHBORD_LIST,
        JSON.stringify(requestData)
      )
        .then((res) => {
          if (res.result) {
            setOrderListData(res.resultQuery);
            setNextPage(res.next);
          } else {
            // notifyError(res.message);
            setOrderListData([]);
            setNextPage(res.next);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const OrderSummeryDurabal = () => {
    simpleGetCall(ApiConfig.GET_DISPACH_DASHBORD_DURALBAL + driverSelected)
      .then((res) => {
        if (res.success) {
          setOrderDeliverable(res?.circleGraphData ? res?.circleGraphData : []);
        } else {
          // notifyError(res.message);
        }
      })
      .catch((errr) => {
        console.log("errr", errr);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const MarchantListDropDown = () => {
    let body = JSON.stringify({});
    simplePostCall(ApiConfig?.MARCHANT_DROPDOWN, body)
      .then((res) => {
        if (res.result) {
          setMearchantList(res?.data);
        } else {
          notifyError(res.message);
        }
      })
      .catch((errr) => {
        console.log("errr", errr);
      })
      .finally(() => {
        // setLoading1(false);
      });
  };
  useEffect(() => {
    DriverListDropDown();
    MarchantListDropDown();
  }, []);

  const [currentValue, setCurrentValue] = useState(0);
  const [selectedValue, setSelectedValue] = useState("date");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showData, setShowData] = useState("");
  const [selectiondata, setSelectiondata] = useState([]);
  const [state, setState] = useState({
    series: [
      {
        name: "order",
        data: [
          12, 61, 100, 12, 1, 2, 4, 5, 4, 78, 5, 465, 4, 5, 1, 61, 100, 12, 1,
          2, 4, 5, 4, 78, 5, 465, 4, 5, 1, 4, 5, 1,
        ],
      },
    ],
    chart: {
      height: 350,
      type: "line", // Set type to "line"
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
        type: "line", // Set type to "line"
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
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ],
      },
      zoom: {
        enabled: false, // Disable zoom in the options
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
            "-order" +
            "</div>"
          );
        },
      },
    },
  });

  // Render the Chart component

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
      {loading ? (
        <Loader />
      ) : (
        <>
          <div id="cx-wrapper" className="Vehicle_inspition_dashboard">
            <div className="row mt-2">
              <div className="col-lg-12">
                <div className="Summary">
                  <div className="Heading_fule">
                    <p>{t("Order Summary")}</p>
                    <div className="search-input">
                      <div className="multi-select-1">
                        <Select
                          required
                          as="select"
                          value={yearSelected}
                          onChange={(value) => {
                            setYearSelected(value);
                            OrderSummery(value, 1);
                          }}
                          className="custom-select"
                        >
                          <Option
                            value=""
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            Select Year.
                          </Option>

                          {years && years?.length > 0
                            ? years.map((item, index) => {
                                return (
                                  <Option
                                    key={"years" + index}
                                    value={item}
                                    style={{ color: "rgba(156, 73, 0)" }}
                                  >
                                    {item}
                                  </Option>
                                );
                              })
                            : "no data available"}
                        </Select>
                      </div>
                    </div>
                    <div className="search-input">
                      <div className="multi-select-1">
                        <Select
                          required
                          value={month1}
                          defaultValue={2}
                          onChange={(value) => {
                            setMonth1(Number(value));
                            OrderSummery(yearSelected, Number(value));
                          }}
                          className="custom-select"
                        >
                          <Option
                            value="1"
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            Select Month
                          </Option>
                          {months &&
                            months.map((ele, index) => {
                              return (
                                <Option
                                  key={"ele" + index}
                                  value={ele.monthId}
                                  style={{ color: "rgba(156, 73, 0)" }}
                                >
                                  {ele.monthName}
                                </Option>
                              );
                            })}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="Summary_body">
                    <div className="summary_left">
                      <div className="">
                        <p className="TotalSpend">
                          {t("Total orders of the month")}
                        </p>
                        <p className="amount">
                          {OrderSummeryListStatus.totalOrders}
                        </p>
                      </div>
                      <div className="">
                        <div className="increes">
                          <p>
                            {t("Increased by")}
                            <span></span>
                            {OrderIncreased.percentageChange == "100"
                              ? "0"
                              : OrderIncreased.percentageChange}
                          </p>
                          <img src={arrowdown} alt="" />
                          {/* <img src={arrowup} alt="" /> */}
                        </div>
                        <p className="month">*{t("As per last month")}</p>
                      </div>
                      <div className="circle_chart">
                        {OrderSummeryListStatus?.data && (
                          <Chart
                            options={circle.options}
                            series={OrderSummeryListStatus?.data}
                            type="donut"
                            width="100%"
                            height="200"
                          />
                        )}
                      </div>
                    </div>
                    <div className="summery_right">
                      <Chart
                        options={state.options}
                        series={[OrderSummeryList]}
                        type="area"
                        width="100%"
                        height="200"
                      />
                      <h1 className="monthe-list">{t("Days of month")}</h1>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="col-lg-4">
            <div className="TopSpends">
              <div className="Heading_fule">
                <p>{t("Dispatch Statistics")}</p>
                <div className="innerSelectBox weekCounter datepicker-main">
                  <CommonDatePicker
                    dateKey="currentDate"
                    setDate={setStartDate}
                    data={startDate}

                  />
                </div>
              </div>
              <div className="row TopSpends_Body">
                <div className="col-lg-4 ">
            
                  <div className="single_card_Spends">
                    <p className="title">{t(" Order")}</p>

                    <div className="amount_arrow">
                      <p className="amount">50</p>
                   
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single_card_Spends">
                    <p className="title">{t(" Order Delivered")}</p>
                    <div className="amount_arrow">
                      <p className="amount">20</p>
                     
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single_card_Spends">
                    <p className="title">{t("Order Pending")}</p>
                    <div className="amount_arrow">
                      <p className="amount">20</p>
                     
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single_card_Spends topmar">
                    <p className="title">{t("Total Orders")}</p>
                    <div className="amount_arrow">
                      <p className="amount">1000</p>
                  
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single_card_Spends topmar">
                    <p className="title">{t("Total Delivery")}</p>
                    <div className="amount_arrow">
                      <p className="amount">420</p>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

              <div className="col-lg-8 mt-2">
                <div className="TopSpendCategoriesnew">
                  <div className="Heading_fule">
                    <p className="heading">{t("Delivery Executive Statistics")}</p>

                    <div className="search-input">
                      <lebal style={{ color: "#8f4300" }}>
                        {" "}
                        {t("Select Executive Person")}
                      </lebal>
                      <div className="multi-select-1">
                        <Select
                          style={{ width: "100%", height: "40px" }}
                          required
                          as="select"
                          value={driverSelected}
                          onChange={(value) => {
                            setDriverSelected(value);
                          }}
                          className="custom-select"
                        >
                          <Option
                            selected
                            value=""
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            Select Executive Person
                          </Option>
                          {driverList.map((ele, index) => {
                            return (
                              <Option
                                key={ele?.user_id}
                                value={ele?.user_id}
                                style={{ color: "rgba(156, 73, 0)" }}
                              >
                                {ele?.user_name}
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="circle_chart">
                        {OrderDeliverable?.data && (
                          <Chart
                            options={circleDriver.options}
                            series={OrderDeliverable.data}
                            type="donut"
                            width="100%"
                            height="200"
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="card text-center d-flex align-items-center justify-content-center border-0">
                        <img
                          src={
                            
                            OrderDeliverable.driverProfile
                          }
                          onError={(ev) => {
                            handleErrorImage(ev);
                          }}
                          className="card-img-top"
                          alt="Person"
                          style={{ height: "100px", width: "100px" }}
                        />
                        <div className="card-body text-start">
                          <p className="title">
                            {t("Name")}: {OrderDeliverable?.driverName}
                          </p>
                          <p className="title">
                            {t("Number")} : {OrderDeliverable?.driverNumber}
                          </p>
                        </div>
                      </div>
                      {/* <div className="single_card_TopSpendCategories">
                <div className="d-flex">

                  <div>
                    <img
                      src={ImportUser}
                      alt="no Image"
                      style={{ height: "100px", width: "100px" }}
                    />
                  </div>
                  <div
                    style={{
                      margin: "20px",
                      padding: "5px",

                      // border: '1px solid #ccc', // optional, to make the div visible
                    }}
                  >
                    <p className="title">Name:{showDriver?.user_name}</p>
                    <p className="title"> Number:{showDriver?.user_id}</p>
                  </div>
                </div>
              </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt-2 ">
                <div className="TopSpends">
                  <div className="Heading_fule">
                    <p>{t("Daily Dispatch Statistics")}</p>
                    <div className="innerSelectBox weekCounter datepicker-main">
                      <CommonDatePicker
                        dateKey="DateToday"
                        setDate={setStartDate}
                        data={startDate}
                      />
                    </div>
                  </div>
                  <div className="row TopSpends_Body">
                    <div className="col-lg-4">
                      <Link
                        to="/DispatchOrder"
                        onClick={() => {
                          setDispatchStatus("pending");
                          localStorage.setItem("dispatchKey", "pending");
                          // handleLinkClick('order')
                        }}
                      >
                        <div className="single_card_Spends">
                          <p className="title">{t("Order")}</p>
                          <div className="amount_arrow">
                            <p className="amount">
                              {OrderSummeryListStatic?.data?.today_orders}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-4">
                      <Link
                        to="/DispatchOrder"
                        onClick={
                          () => {
                            setDispatchStatus("Completed");
                            localStorage.setItem("dispatchKey", "Completed");
                          }
                          //  handleLinkClick('orderDelivered')
                        }
                      >
                        <div className="single_card_Spends">
                          <p className="title">{t("Order Delivered")}</p>
                          <div className="amount_arrow">
                            <p className="amount">
                              {OrderSummeryListStatic.data?.deliver_count}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-4">
                      <Link
                        to="/DispatchOrder"
                        onClick={
                          () => {
                            setDispatchStatus("pending");
                            localStorage.setItem("dispatchKey", "pending");
                          }
                          //  handleLinkClick('orderPending')
                        }
                      >
                        <div className="single_card_Spends">
                          <p className="title">{t("Order Pending")}</p>
                          <div className="amount_arrow">
                            <p className="amount">
                              {OrderSummeryListStatic.data?.pending_count}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-4">
                      <Link
                        to="/DispatchOrder"
                        onClick={
                          () => {
                            setDispatchStatus("Progress");
                            localStorage.setItem("dispatchKey", "Progress");
                          }
                          //  handleLinkClick('orderProgress')
                        }
                      >
                        <div className="single_card_Spends">
                          <p className="title">{t("In Progress")}</p>
                          <div className="amount_arrow">
                            <p className="amount">
                              {OrderSummeryListStatic.data?.inprogress_count}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-4">
                      <Link
                        to="/DispatchOrder"
                        onClick={
                          () => {
                            setDispatchStatus("Completed");
                            localStorage.setItem("dispatchKey", "Completed");
                          }
                          //  handleLinkClick('orderreturn')
                        }
                      >
                        <div className="single_card_Spends topmar">
                          <p className="title">{t("Order return")}</p>
                          <div className="amount_arrow">
                            <p className="amount">
                              {OrderSummeryListStatic.data?.return_count}
                            </p>
                            {/* <img src={arrowdown} alt="" /> */}
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-4">
                      <div className="single_card_Spends topmar">
                        <p className="title">{t("Monthly Orders")}</p>
                        <div className="amount_arrow">
                          <p className="amount">
                            {OrderSummeryListStatic.monthly?.total_orders}
                          </p>
                          {/* <img src={arrowup} alt="" /> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="single_card_Spends topmar">
                        <p className="title">{t("Monthly Delivery")}</p>
                        <div className="amount_arrow">
                          <p className="amount">
                            {OrderSummeryListStatic.monthly?.deliver_count}
                          </p>
                          {/* <img src={arrowdown} alt="" /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="UserTabel">
                  <div className="heading">
                    <p className="main">{t("Summary")}</p>
                    <div>
                      <p>
                        <p>
                          {t("Date")}: {formattedNextDate()}
                        </p>
                      </p>
                    </div>
                    <div className="innerSelectBox weekCounter datepicker-main">
                      <CommonDatePicker
                        dateKey={"toDayDate"}
                        setDate={setCurrentDate}
                        data={currentDate}
                        SetPlaceholder={"Today Date"}
                        dataDisbal={maxDate}
                      />
                    </div>

                    <div>
                      <div className="multi-select-1">
                        <Select
                          id="selectBox"
                          placeholder="Vehicle"
                          value={optionData}
                          onChange={(value) => setOptionData(value)}
                          className="custom-select"
                        >
                          <Option
                            selected
                            value="date"
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            {t("Date")}
                          </Option>
                          <Option
                            value="month"
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            {t("Month")}
                          </Option>
                          <Option
                            value="week"
                            style={{ color: "rgba(156, 73, 0)" }}
                          >
                            {t("Week")}
                          </Option>
                        </Select>
                      </div>
                    </div>
                    <div className="leftContent d-flex">
                      <div class="btn-wrapper">
                        <button
                          class="cx-btn-2"
                          onClick={handleprivesButtonClick}
                        >
                          {t("Back")}
                        </button>
                      </div>

                      <div class="btn-wrapper">
                        <button
                          onClick={handleNextButtonClick}
                          class="cx-btn-2"
                          disabled={NextPage === false ? true : false}
                        >
                          {t("Next")}
                        </button>
                      </div>
                      <div></div>
                    </div>

                    {/* <div
                  class="btn-wrapper"
                  onClick={() => {
                    navigate("/DispatchOrder");
                  }}
                >
                  <button class="cx-btn-2"> All View</button>
                </div> */}
                    {/* <p className="viewall">
                                    <Link to="/DispatchOrder">{t("View all")}</Link>
                                </p> */}
                  </div>
                  <table className="table tableAdmin">
                    <thead className="tableHead">
                      <tr>
                        <th>{t("Sr.no")}</th>
                        <th>{t("Executive Person")}</th>
                        <th>{t("Orders assigned")}</th>
                        <th>{t("Orders Status")}</th>
                        {/* <th>{t("Orders Pending")}</th> */}
                        <th>{t("Total Distance")}</th>
                        {/* {vehicleSelect != "All" ? <th>{t("Repair Cost")}</th> : ""} */}
                        <th>{t("Total Duration")}</th>
                      </tr>
                    </thead>
                    <tbody className="tableBody">
                      {OrderListData && OrderListData.length > 0 ? (
                        OrderListData?.map((itemlist, index) => {
                          return (
                            <>
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  {itemlist.user_name
                                    ? itemlist.user_name
                                    : "Delivery Executive Not Assigned"}
                                </td>
                                <td>
                                  {itemlist.dispatch_package_order_number}
                                </td>
                                <td>
                                  {itemlist.dispatch_package_status == 0
                                    ? "Order Received"
                                    : itemlist.dispatch_package_status == 1
                                    ? "Delivery Executive assigned"
                                    : itemlist.dispatch_package_status == 2
                                    ? "Order Dispatched"
                                    : itemlist.dispatch_package_status == 3
                                    ? "Ready for Delivery"
                                    : itemlist.dispatch_package_status == 4
                                    ? "Payment Done"
                                    : itemlist.dispatch_package_status == 5
                                    ? "Order Delivered"
                                    : itemlist.dispatch_package_status == 6
                                    ? "Returned"
                                    : itemlist.dispatch_package_status == 7
                                    ? "Return Back to Warehouse"
                                    : itemlist.dispatch_package_status == 8
                                    ? "Driver Reached for Pickup"
                                    : itemlist.dispatch_package_status == 9
                                    ? "Driver reached for Delivery"
                                    : "Invalid Status"}
                                </td>

                                <td>{itemlist.total_distance}</td>

                                <td>{itemlist.total_duration}</td>
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <div className="">{/* <NoDataComp /> */}</div>
                      )}
                    </tbody>
                  </table>
                  {OrderListData.length === 0 && !loading && <NoDataComp />}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default DispatchDashboard;

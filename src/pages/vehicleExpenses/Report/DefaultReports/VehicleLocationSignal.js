import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { AppContext } from "../../../../context/AppContext";
import SubHeader from "../../../../sharedComponent/SubHeader";
import CommonDatePicker from "../../../../sharedComponent/CommonDatePicker";
import Dropdown from "react-bootstrap/Dropdown";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  DateDDMMYYYY,
  TimeFormatForAll,
  addInterval,
  latestDate,
} from "../../../../sharedComponent/common";
import { getWithAuthCall, simplePostCall } from "../../../../api/ApiServices";
import ApiConfig from "../../../../api/ApiConfig";
import Loader from "./../../../../sharedComponent/Loader";
import NoDataComp from "../../../../sharedComponent/NoDataComp";
import Select from "react-select";
const VehicleLocationSignal = () => {
  const { sidebar, setSidebar, LinkReport, setDark } = useContext(AppContext);

  return (
    <>
      {LinkReport === "vehiclereport/vehiclelocationsignal" ? (
        <LocationSignal />
      ) : (
        <GraphChart />
      )}
    </>
  );
};

export default VehicleLocationSignal;

const LocationSignal = () => {
  const customStyles = {
    // Style for the container surrounding the dropdown
    container: (provided) => ({
      ...provided,
      width: "300px",
      borderColor: "9c4900 ", // Set the width as needed
      // Add more custom styles here
    }),
    // Style for the dropdown control (the input field and dropdown indicator)
    control: (provided) => ({
      ...provided,
      borderColor: "#9c4900", // Example border color
      // Add more custom styles here
    }),
    // Style for the dropdown menu
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#9c4900", // Example background color
      // Add more custom styles here
    }),
    // Style for individual options
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#9c4900" : "white", // Example selected option color
      color: state.isSelected ? "white" : "black", // Example selected option text color
      // Add more custom styles here
    }),
    // Style for the dropdown indicator
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#9c4900 ", // Example color
      // Add more custom styles here
    }),
  };
  const [loading, setLoading] = useState(false);
  const [vehicleList, setvehicleList] = useState([]);
  const [vehicleListSelectOptionList, setVehicleListSelectOptionList] =
    useState([]);

  const { t } = useTranslation();
  const [tripList, setTripList] = useState([]);
  const {
    sidebar,
    setLinkReport,
    LinkReport,
    OptionDynamicDownload,
    setOptionDynamicDownload,
  } = useContext(AppContext);

  const maxDate = new Date();
  useEffect(() => {
    setOptionDynamicDownload("");
  }, [LinkReport]);

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const [OrderListData, setOrderListData] = useState([]);

  const [pdfData, setpdfData] = useState("");
  const [NextPage, setNextPage] = useState(true);

  const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });
  const [optionData, setOptionData] = useState("date");
  const [VehicleId, setVehicleId] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [vehicleimei, setVehicleImei] = useState("");
  const [daysToAdd, setDaysToAdd] = useState(30);
  const [vehicleshow, setvehicleshow] = useState();
  const [selectedVehicleId, setSelectedVehicleId] = useState(0);
  const [NextDateShow, setNextDateShow] = useState({ toNextDate: new Date() });
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date());
  const [endDayOfMonth, setEndDayOfMonth] = useState(new Date());

  // State for weekStartDate and weekEndDate
  const [weekStartDate, setWeekStartDate] = useState(new Date());

  const [weekEndDate, setWeekEndDate] = useState(new Date());

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
    setDaysToAdd(1);
  }, [optionData, currentDate]);

  // State for NextDateShow

  const formattedNextDate = () => {
    switch (optionData) {
      case "date":
        return NextDateShow.toNextDate?.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      default:
    }
  };

  // Pdf  and Exial

  // Api List UseEffacdt

  useEffect(() => {
    reportViewList(currentDate.toDayDate, VehicleId);
  }, [
    VehicleId,
    vehicleimei,
    currentDate,
    NextDateShow,
    optionData,
    LinkReport,
  ]);

  useEffect(() => {}, [LinkReport]);

  useEffect(() => {
    if (VehicleId) {
      reportViewList(currentDate.toDayDate, VehicleId);
    }
  }, [
    OptionDynamicDownload,
    currentDate,
    optionData,
    LinkReport,
    VehicleId,
    vehicleimei,
  ]);

  useEffect(() => {
    if (OptionDynamicDownload === "pdf" || OptionDynamicDownload === "excel") {
      reportViewList(currentDate.toDayDate, VehicleId, vehicleimei);
    }
  }, [
    OptionDynamicDownload,

    currentDate,
    NextDateShow,
    vehicleimei,
    optionData,
    VehicleId,
    LinkReport,
  ]);

  const reportViewList = (date, formatpdf) => {
    let requestData;
    requestData = {
      format: OptionDynamicDownload,
      //   report_date: "2024-02-01",
      //   vehicle: "MP09SH3111"
      report_date: latestDate(date, "yyyy-MM-dd"),
      //   vehicle_imei: vehicleimei
      vehicle_id: VehicleId,
    };

    if (requestData) {
      setLoading(true);
      simplePostCall(
        ApiConfig.GET_REPORT_LSIT + LinkReport,
        JSON.stringify(requestData)
      )
        .then((res) => {
          if (res.result) {
            setLoading(false);

            setOptionDynamicDownload("");

            // Extract the array of items from the response
            const firstKey = res.filepath;
            setpdfData(firstKey);
            if (!firstKey) {
              //   setOrderListData(res?.data.location_data  );
              setOrderListData(res?.location_data);
            }
            // Set the array to the state
          } else {
            // Handle the case when the result is false
            // notifyError(res.message);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        })
        .finally(() => {
          // setLoading(false);
        });
    }
  };

  useEffect(() => {
    getVehicelList();
  }, [,]);

  function getVehicelList() {
    getWithAuthCall(ApiConfig.VEHICEL_AVALIVALITY_DROPDAWAN)
      .then((data) => {
        setvehicleList(data?.data);
        const tempArr =
          data?.data &&
          data?.data.map((item) => {
            return {
              label: item?.vehicle_number,
              value: item?.vehicle_id,
            };
          });
        tempArr && setVehicleListSelectOptionList(tempArr);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  useEffect(() => {
    if (pdfData) {
      downloadFile();
    }
  }, [pdfData]);
  const handleSetToday = () => {
    setCurrentDate({ toDayDate: new Date() }); // Set the current date
  };

  const downloadFile = () => {
    fetch(pdfData)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const a = document.createElement("a");
        a.href = url;

        // Extract the file name from the filepath dynamically
        const fileName = pdfData.substring(pdfData.lastIndexOf("/") + 1);
        a.download = fileName;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading file:", error));
  };

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
      >
        <div
          id="cx-wrapper"
          className="Vehicle_inspition_dashboard heightFixed"
        >
          <div className="row">
            <div className="col-md-12 mb-3">
              <SubHeader />
            </div>
          </div>
          <div className="mainInnerCard">
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div className="firstDiv d-flex align-items-center">
                <button className="todayBtn mr-3" onClick={handleSetToday}>
                {t("Today")} 
                </button>
                <div className="innerSelectBox weekCounter datepicker-main BGiMP mr-3">
                  <CommonDatePicker
                    dateKey={"toDayDate"}
                    setDate={setCurrentDate}
                    data={currentDate}
                    SetPlaceholder={t("Today Date")}
                    dataDisbal={maxDate}
                  />
                </div>
                <div className="dropDowns">
                  <Select
                    className="droplist"
                    options={vehicleListSelectOptionList}
                    styles={customStyles}
                    placeholder={t("Select")}
                    // value={vehicleListSelectOptionList}
                    onChange={(e) => {
                      setVehicleId(e.value);
                      const show =
                        (vehicleList &&
                          vehicleList.find(
                            (vehicle) => vehicle.vehicle_id == e.value
                          )?.vehicle_number) ||
                        "Select vehicle";
                      setSelectedVehicle(show);
                    }}
                  />
                </div>
              </div>
              <div className="leftContent d-flex mr-3">
                <div class="btn-wrapper">
                  <button class="cx-btn-2" onClick={handleprivesButtonClick}>
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
            </div>
            <div className="detailsInsider">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="headingDetail">
                    <h1>{t("Vehicle Location Signal")} </h1>
                    <p>{t("Date:")}  {formattedNextDate()}</p>
                    <p>
                     {t("Selected Vehicle Number:")} {" "}
                      {selectedVehicle || t("Select vehicle")}
                    </p>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="heighScroller">
                    <table className="table tableAdmin table-striped">
                      <thead className="tableHead">
                        <tr>
                          <th>{t("Sr.no")}</th>
                          <th>{t("Date")}</th>
                          <th>{t("Time")}</th>
                          <th>{t("GPS Data")}</th>
                          <th>{t("GPS Quality")}</th>
                          <th>{t("Latitude")}</th>
                          <th>{t("Longitude")}</th>
                          <th>{t("Metering Status")}</th>
                          <th>{t("Power Status")}</th>
                          <th>{t("GSM Signal Strength")}</th>
                          <th>{t("Seat Belt")}</th>
                          <th></th>
                        </tr>
                      </thead>
                      {loading ? (
                        <Loader />
                      ) : (
                        <>
                          <tbody className="tableBody">
                            {OrderListData && OrderListData?.length > 0 ? (
                              OrderListData?.map((itemlist, index) => {
                                return (
                                  <>
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{itemlist.logged_date ?DateDDMMYYYY(itemlist.logged_date):"NA"}</td>
                                      <td>{itemlist.logged_time?TimeFormatForAll(itemlist.logged_time):"NA"}</td>
                                      <td>{itemlist.gps_data_valid}</td>

                                      <td>{itemlist.gps_quality}</td>

                                      <td className="ellipsis">
                                        {itemlist.latitude}
                                      </td>
                                      <td>{itemlist.longitude}</td>

                                      <td>{itemlist.metering_status}</td>
                                      <td>{itemlist.power_status}</td>
                                      <td>{itemlist.gsm_signal_strength}</td>
                                      <td>{itemlist.seat_belt}</td>
                                    </tr>
                                  </>
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </tbody>
                        </>
                      )}
                    </table>
                    {OrderListData?.length === 0 && !loading && <NoDataComp />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const GraphChart = () => {
  const { t } = useTranslation();
  const [vehicleList, setvehicleList] = useState([]);
  const [VehicleId, setVehicleId] = useState("");
  const [NextDateShow, setNextDateShow] = useState({ toNextDate: new Date() });
  const [optionData, setOptionData] = useState("date");
  const [daysToAdd, setDaysToAdd] = useState(30);
  const [NextPage, setNextPage] = useState(true);
  const [pdfData, setpdfData] = useState("");

  const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date());
  const [tripList, setTripList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [OptionDownload, setOptionDownload] = useState("");
  const [format, setFormat] = useState("OptionDownload");

  const {
    sidebar,
    setLinkReport,
    setOptionDynamicDownload,
    LinkReport,
    OptionDynamicDownload,
  } = useContext(AppContext);
  const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });
  const maxDate = new Date();
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  useEffect(() => {
    if (OptionDynamicDownload === "pdf" || OptionDynamicDownload === "excel") {
      getLineGraphData(NextDateShow, VehicleId);
    }
  }, [NextDateShow, optionData, VehicleId, LinkReport]);

  useEffect(() => {
    getVehicelList();
  }, [,]);

  function getVehicelList() {
    getWithAuthCall(ApiConfig.VEHICEL_AVALIVALITY_DROPDAWAN)
      .then((data) => {
        // setVehicalType(data?.data);
        setvehicleList(data?.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  const [data, setData] = useState({
    series: [
      {
        name: "Desktops",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 300,
        type: "line",
        zoom: {
          enabled: false,
        },
      },

      colors: ["#9c4900", "#9c4900"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: t("Speed (kmph)"),
        align: "left",
      },
      grid: {
        row: {
          // colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      yaxis: {
        tickAmount: 4,
        min: 0,
        max: 100,
      },
      xaxis: {
        categories: [],
      },
    },
  });
  console.log(data);

  // Api call for graph data
  const getLineGraphData = (date) => {
    let payload = {
      request_date: latestDate(date, "yyyy-MM-dd"),
      vehicle_id: VehicleId,
      format: OptionDynamicDownload,
      language: "en",
    };
    simplePostCall(
      ApiConfig.GET_VEHICLE_SPEEDING_REPORT,
      JSON.stringify(payload)
    )
      .then((res) => {
        if (res.result) {
          setOptionDynamicDownload("");

          // Extract the array of items from the response
          const firstKey = res.filepath;
          setpdfData(firstKey);
          if (!firstKey) {
            setData({
              ...data,
              series: [
                {
                  data: res?.speed,
                },
              ],
              options: {
                xaxis: {
                  categories: res?.time,
                  labels: {
                    rotate: -90,
                  },
                },
              },
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLineGraphData(currentDate.toDayDate, VehicleId);
  }, [VehicleId, currentDate, NextDateShow, optionData, LinkReport]);

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
    setDaysToAdd(1);
  }, [optionData, currentDate]);

  useEffect(() => {
    if (pdfData) {
      downloadFile();
    }
  }, [pdfData]);
  const handleSetToday = () => {
    setCurrentDate({ toDayDate: new Date() }); // Set the current date
  };
  const downloadFile = () => {
    fetch(pdfData)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const a = document.createElement("a");
        a.href = url;

        // Extract the file name from the filepath dynamically
        const fileName = pdfData.substring(pdfData.lastIndexOf("/") + 1);
        a.download = fileName;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading file:", error));
  };

  const formattedNextDate = () => {
    switch (optionData) {
      case "date":
        return NextDateShow.toNextDate?.toLocaleString("en-US", {
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
        return `${currentMonth?.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })} - ${lastDayOfCurrentMonth?.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`;
    }
  };
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
      >
        <div
          id="cx-wrapper"
          className="Vehicle_inspition_dashboard heightFixed"
        >
          <div className="row">
            <div className="col-lg-12 mt-2">
              <div className="middle-header">
                <p>{t("Vehicle Speed Report")}  </p>
              </div>
            </div>
          </div>
          <div className="mainInnerCard mt-2">
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div className="firstDiv d-flex align-items-center">
                <button className="todayBtn mr-3" onClick={handleSetToday}>
                 {t("Today")} 
                </button>
                <div className="innerSelectBox weekCounter datepicker-main BGiMP mr-3">
                  <CommonDatePicker
                    dateKey={"toDayDate"}
                    setDate={setCurrentDate}
                    data={currentDate}
                    SetPlaceholder={t("Today Date")}
                    dataDisbal={maxDate}
                  />
                </div>
                <div className="dropDowns">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    placeholder="Vehicle list"
                    onChange={(e) => {
                      setVehicleId(e.target.value);
                      const show =
                        (vehicleList &&
                          vehicleList.find(
                            (vehicle) => vehicle.vehicle_id == e.target.value
                          )?.vehicle_number) ||
                        "Select vehicle";
                      setSelectedVehicle(show);
                    }}
                  >
                    <option value={0}>{t("Vehicle")} </option>
                    {vehicleList.map((vehicle) => (
                      <option Value={vehicle.vehicle_id}>
                        {vehicle.vehicle_number}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="leftContent d-flex mr-3">
                <div class="btn-wrapper">
                  <button class="cx-btn-2" onClick={handleprivesButtonClick}>
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
            </div>
            <div className="detailsInsider">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="headingDetail">
                    <h1>{t("Vehicle Speed Report")} </h1>
                    <h2>{formattedNextDate()}</h2>
                    <p>{selectedVehicle || t("Select vehicle")}</p>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="syncChart">
                    <div className="leftside  ">
                      <span>{t("Speed(KMPH)")} </span>
                    </div>
                    {/* <div className="divClassName">
                      <button
                        className="buttonClassName"
                        onClick={() => setOptionDynamicDownload("pdf")}
                      >
                        Download PDF
                      </button>
                    </div> */}
                    <Chart
                      options={data.options}
                      series={data.series}
                      type="line"
                      height={300}
                    />
                    <div className="straightLine"></div>
                    <div className="bottomline2">
                      <span>{t("Time")} </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

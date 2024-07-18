import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { AppContext } from "../../../../context/AppContext";
import SubHeader from "../../../../sharedComponent/SubHeader";
import CommonDatePicker from "../../../../sharedComponent/CommonDatePicker";
import Dropdown from "react-bootstrap/Dropdown";
import { getWithAuthCall, simplePostCall } from "../../../../api/ApiServices";
import ApiConfig from "../../../../api/ApiConfig";
import { latestDate } from "../../../../sharedComponent/common";
import Loader from "../../../../sharedComponent/Loader";
import NoDataComp from "../../../../sharedComponent/NoDataComp";
import { set } from "lodash";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const ImmobiliserReport = () => {
  const {
    sidebar,
    setOptionDynamicDownload,
    LinkReport,
    OptionDynamicDownload,
  } = useContext(AppContext);
  const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });
  const [EndDate, setEndDate] = useState({ toDayEnd: new Date() });
  const maxDate = new Date();
  const { t } = useTranslation();
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const [loading, setLoading] = useState(false);
  const [OrderListData, setOrderListData] = useState([]);
  const [VehicleList, setvehicleList] = useState([]);
  const [pdfData, setpdfData] = useState("");
  const [VehicleId, setVehicleId] = useState("");
  // State for weekStartDate and weekEndDate

  useEffect(() => {
    reportViewList();
  }, [LinkReport]);

  useEffect(() => {
    if (VehicleId) {
      reportViewList();
    }
  }, [VehicleId]);

  useEffect(() => {
    if (OptionDynamicDownload === "pdf" || OptionDynamicDownload === "excel") {
      reportViewList();
    }
  }, [OptionDynamicDownload]);

  const reportViewList = () => {
    let requestData;

    requestData = {
      startdate: latestDate(currentDate.toDayDate, "yyyy-MM-dd"),
      enddate: latestDate(EndDate.toDayEnd, "yyyy-MM-dd"),
      vehicle_id: VehicleId,
      format: OptionDynamicDownload,
    };

    if (requestData) {
      {
        OptionDynamicDownload == "pdf" || OptionDynamicDownload == "excel"
          ? setLoading(false)
          : setLoading(true);
      }
      setOptionDynamicDownload("");
      // setLoading(true);
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
              setOrderListData(res.signal_data);
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
    if (pdfData) {
      downloadFile();
    }
  }, [pdfData]);

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
          <div className="immobiliserCard">
            <div className="row">
              <div className="col-md-12 mb-4">
                <SubHeader />
              </div>
              <div className="col-md-3 mb-4">
                <div className="dropDowns">
                  <div className="multi-select-1">
                    <Select
                      style={{ height: "40px", width: "100%" }}
                      placeholder={t("Vehicle list")}
                      className="custom-select"
                      onChange={(value) => setVehicleId(value)}
                    >
                      <Option value={0} style={{ color: "rgba(156, 73, 0)" }}>
                        {t("Vehicle")}{" "}
                      </Option>
                      {VehicleList.map((data) => (
                        <Option
                          value={data.vehicle_id}
                          style={{ color: "rgba(156, 73, 0)" }}
                        >
                          {data.vehicle_number}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="innerSelectBox weekCounter datepicker-main BGiMP mr-3">
                  <CommonDatePicker
                    dateKey={"toDayDate"}
                    setDate={setCurrentDate}
                    data={currentDate}
                    SetPlaceholder={t("Today Date")}
                    dataDisbal={maxDate}
                  />
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="innerSelectBox weekCounter datepicker-main BGiMP mr-3">
                  <CommonDatePicker
                    dateKey={"toDayEnd"}
                    setDate={setEndDate}
                    data={EndDate}
                    SetPlaceholder={t("Today End")}
                    dataDisbal={maxDate}
                  />
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <button
                  className="searchBtn"
                  onClick={() => {
                    reportViewList();
                  }}
                >
                  {t("Search")}{" "}
                </button>
              </div>
              <div className="col-md-12">
                <div className="heighScroller">
                  <table className="table tableAdmin table-striped">
                    <thead className="tableHead">
                      <tr>
                        <th>{t("Sr.no")}</th>
                        <th>{t("Vehicle")}</th>
                        <th>{t("Immobilisation Status")}</th>
                        <th>{t("Enabled Date")}</th>
                        <th>{t("Enabled Time")}</th>
                        <th>{t("Disabled Date")}</th>
                        <th>{t("Disabled Time")}</th>
                      </tr>
                    </thead>
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        <tbody className="tableBody">
                          {OrderListData && OrderListData.length > 0 ? (
                            OrderListData?.map((itemlist, index) => {
                              return (
                                <>
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{itemlist.vehicle_number}</td>
                                    <td>{itemlist.status}</td>
                                    <td>
                                      {itemlist.enable_date
                                        ? itemlist.enable_date
                                        : ""}
                                    </td>
                                    <td>
                                      {itemlist.enable_time
                                        ? itemlist.enable_time
                                        : ""}
                                    </td>
                                    <td className="ellipsis">
                                      {itemlist.disable_date
                                        ? itemlist.disable_date
                                        : ""}
                                    </td>
                                    <td className="ellipsis">
                                      {itemlist.disable_time
                                        ? itemlist.disable_time
                                        : ""}
                                    </td>
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
                  {OrderListData.length === 0 && !loading && <NoDataComp />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ImmobiliserReport;

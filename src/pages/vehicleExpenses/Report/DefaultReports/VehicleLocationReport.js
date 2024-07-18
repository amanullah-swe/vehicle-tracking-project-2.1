import React, { useContext, useState, useEffect, Fragment } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
// import ApiConfig from "../../../api/ApiConfig";
import { getWithAuthCall, simplePostCall } from "../../../../api/ApiServices";
import { AppContext } from "../../../../context/AppContext";
import SubHeader from "../../../../sharedComponent/SubHeader";
import ApiConfig from "../../../../api/ApiConfig";
import Loader from "../../../../sharedComponent/Loader";
import NoDataComp from "../../../../sharedComponent/NoDataComp";
// import ApiConfig from "../../../../api/ApiConfig";

const VehicleLocationReport = () => {



  const { sidebar, setSidebar, LinkReport, OptionDynamicDownload } = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const { t, i18n } = useTranslation();
  const [OrderListData, setOrderListData] = useState([]);
  const [pdfData, setpdfData] = useState("");
  const [loading, setLoading] = useState(true);



  // State for weekStartDate and weekEndDate



  useEffect(() => {

    reportViewList();
   }, [LinkReport]);

  useEffect(() => {
    if (OptionDynamicDownload === "pdf" || OptionDynamicDownload === "excel") {
      reportViewList();
    }
  }, [OptionDynamicDownload]);

  const reportViewList = () => {
    let requestData;

    requestData = {
      running_status: '',
      format: OptionDynamicDownload,

    };

    if (requestData) {
      // setLoading(true);
      simplePostCall(
        ApiConfig.GET_REPORT_LSIT + LinkReport,
        JSON.stringify(requestData)
      )
        .then((res) => {
          console.log(res);
          if (res.result) {
            setLoading(false);
            // Extract the array of items from the response
            const firstKey = res.filepath;
            setpdfData(firstKey);
            if (!firstKey) {
              setOrderListData(res.data? res.data : res.listData);
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
          setLoading(false);
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
      <div id="cx-wrapper" className="Vehicle_inspition_dashboard heightFixed">
        <div className="report-viwe-head" id="Viwe_Report_Respoasive">
          <p></p>
        </div>
        {/* New UI ADD */}
        <div className="row">
          <div className="col-md-12">
            <SubHeader />
          </div>
          <div className="col-lg-12 mt-2">
           <div className="heighScroller"> 
           <div className="UserTabel">
              <table className="table tableAdmin table-striped">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Vehicle Number")}</th>
                    <th>{t("Vehicle Reg No")}</th>
                    <th>{t("Vehicle Status")}</th>
                    {/* <th>{t("Orders Pending")}</th> */}
                    <th>{t("Vehicle Imei")}</th>
                    {/* {vehicleSelect != "All" ? <th>{t("Repair Cost")}</th> : ""} */}
                    <th>{t("Location")}</th>
                    <th>{t("Last Tracked")}</th>
                  </tr>
                </thead>
                {loading /* && pdfData */ ? (
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
                            <td>{itemlist.vehicle_number
                            }</td>
                            <td>{itemlist.vehicle_reg_no}</td>
                            <td>{itemlist.running_status}</td>

                            <td>{itemlist.vehicle_imei}</td>

                            <td className="ellipsis">{itemlist.location}</td>
                            <td>{itemlist.last_tracked}</td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <div className="">{/* <NoDataComp /> */}</div>
                  )}
                </tbody>
                </>
                )}
              </table>
            {OrderListData?.length===0&&!loading&& <NoDataComp />}

            </div>
           </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleLocationReport;


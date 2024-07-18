import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Pagenation from "../../sharedComponent/Pagenation";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../context/AppContext";
import Form from "react-bootstrap/Form";
import export_icon from "../../assets/images/export_icon.svg";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { simpleGetCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { DateDDMMYYYY } from "../../sharedComponent/common";
import Loader from "../../sharedComponent/Loader";
import { Dropdown } from "react-bootstrap";
import Import from "../../assets/images/ic-Import.svg";

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
export default function VehicleAvailabilityList() {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;
  const { sidebar, useDebounce, recordsPerPage } = useContext(AppContext);
  const [VehicleAvailbilitList, setVehicleAvailbilitList] = useState([]);
  const [FiltertData, setFiltertData] = useState("");
  const [total, setTotals] = useState("");
  const [page, setPage] = useState(1);
  const [last_page, setlast_page] = useState(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [OptionDownload, setOptionDownload] = useState("");
  const [pdfData, setpdfData] = useState("");

  const [datalist, setDataList] = useState([]);
  const debouncedSearchTerm = useDebounce(FiltertData, 500);
  useEffect(() => {
    getAvailbilitylist(1);
  }, [debouncedSearchTerm]);
  // useEffect(() => {
  //   geAdministratorList();
  // }, []);
  function geAdministratorList() {
    simpleGetCall(ApiConfig.USER_ADMINISTRATOR)
      .then((data) => {
        if (data.result) {
          setDataList(data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
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
    if (OptionDownload === "pdf" || OptionDownload === "excel") {
      getAvailbilitylist()
    }
  }, [
    OptionDownload,
    VehicleAvailbilitList
  ]);

  //   const debouncedSearchTerm = useDebounce(FiltertData, 500);
  //  useEffect(() => {

  //     getAvailbilitylist(1);

  //   }, [debouncedSearchTerm]);

  function getAvailbilitylist(currentPage) {
    // setLoading(true);

    let newRequestBody = JSON.stringify({
      vehicle_name: FiltertData,
      vehicle_type: "",
      page: currentPage,
      page_limit: recordsPerPage,
      format: OptionDownload,
    });
    simplePostCall(ApiConfig.VEHICEL_AVALIVALITY_LIST, newRequestBody)
      .then((data) => {
        if (data.result) {
          console.log(data, "dataqqqqqqqqqqqq");
          const firstKey = data.file_path;
          setpdfData(firstKey);
          setLoading(false);
          if (!firstKey) {
            setVehicleAvailbilitList(data.data);
          
            console.log(data.data, "data.data************pdf");
          }
          // Set the array to the state
         else {
          setOptionDownload("");
        
        }

          setTotals(data?.total);
          setlast_page(data.last_page);
          if (currentPage === 1) {
            setVehicleAvailbilitList(data.data);
            console.log("VehicleAvailbilitList", VehicleAvailbilitList);
          } else {
            setVehicleAvailbilitList([...VehicleAvailbilitList, ...data.data]);
          }
        } else {
          setOptionDownload("");
          // setTransportinactive(data.data);
          setVehicleAvailbilitList()
          setlast_page(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function onPageLoad() {
    setPage(page + 1);
    getAvailbilitylist(page + 1);
  }
  console.log("VehicleAvailbilitList", VehicleAvailbilitList);
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
          <div id="cx-wrapper" className="Vehicle_inspition">
            {/* Top inputs for instatnt search */}
            <div className="Header_Top">
              <div className="displayFlexInp">
                <div
                  className="innerSelectBox weekCounter selectForm form_input_main"
                  style={{ width: "330px" }}
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder={t("Vehicle Name")}
                    className="innerCust"
                    onChange={(e) => {
                      setFiltertData(e.target.value);
                    }}
                  />
                </div>
              </div>

              {userRole === "customer" ||
              (accessRights &&
                accessRights?.rights_manage_vehicle_inspection_dashboard) ? (
                <>
                  <div className="md_dropdown">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src={Import} alt="" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link
                            onClick={() => setOptionDownload("pdf")}
                            className="d-block"
                          >
                          {t("PDF")}  
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link
                            onClick={() => setOptionDownload("excel")}
                            className="d-block"
                          >
                          {t("Excel")}  
                          </Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </>
              ) : null}
            </div>
            {/* Vehicle table */}
            <div className="main-master-wrapper">
              <div
                id="scroll_insideThe_Padding83"
                onScroll={(e) => {
                  const bottom =
                    e.target.scrollHeight - e.target.scrollTop ===
                    e.target.clientHeight;

                  if (bottom && !last_page) onPageLoad();
                }}
              >
                <div className="VA_table">
                  <table className="table tableAdmin">
                    <thead className="tableHead">
                      <tr>
                        <th>{t("Sr.no")}</th>
                        <th>{t("Vehicle Name")}</th>
                        <th>{t("Vehicle Type")}</th>

                        <th>{t("Last Trip")}</th>
                        {/* <th>{t("Action")}</th> */}
                      </tr>
                    </thead>
                    <tbody className="tableBody">
                      {VehicleAvailbilitList?.map((data, index) => {
                        return (
                          <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{data.vehicle_number}</td>
                            <td>{data.vehicle_type_code}</td>
                            <td>{DateDDMMYYYY(data.trip_date)}</td>
                            {/* <td> + Assign Trip</td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {VehicleAvailbilitList?.length > 0 && (
                <Pagenation
                  length={VehicleAvailbilitList?.length}
                  total={VehicleAvailbilitList.length}
                />
              )}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

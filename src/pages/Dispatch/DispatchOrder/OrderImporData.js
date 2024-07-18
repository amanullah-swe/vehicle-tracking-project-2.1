import { React, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { motion } from "framer-motion";
import {
  simplePostCall,
  multipartPostCallWithErrorResponse,
} from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { useEffect } from "react";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import Loader from "../../../sharedComponent/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const OrderExileFile = () => {
  const { sidebar } = useContext(AppContext);

  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [downloadFile, setDownloadFile] = useState("");
  const [addFile, setAddFile] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setAddFile(file);
      } else {
        alert(
          "Invalid file type. Please select a file with .xls or .xlsx extension."
        );
        event.target.value = null;
      }
    }
  };

  // / Fatch download Api
  const downloadFiles = () => {
    setLoading(true);

    const body = {
      format: downloadFile,
    };

    simplePostCall(ApiConfig.DOWNLOAD_IMPORT_DATA, JSON.stringify(body))
      .then((res) => {
        if (res.result) {
          console.log(res.result);
          setLoading(false);
          const firstKey = res.filePath;
          downloadFileImportData(firstKey);
          setDownloadFile("");
          console.log("firstKey", firstKey);
        } else {
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  useEffect(() => {
    if (downloadFile === "excel") {
      downloadFiles();
    }
  }, [downloadFile]);

  // fatch download url
  const downloadFileImportData = (pdfData) => {
    setLoading(true);
    if (pdfData) {
      fetch(pdfData)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));

          const a = document.createElement("a");
          a.href = url;
          const fileName = pdfData.substring(pdfData.lastIndexOf("/") + 1);
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          setLoading(false);
        })
        .catch((error) => console.error("Error downloading file:", error));
    } else {
      console.log("Error In downloading file ");
    }
  };

  const handleUploadFile = (event) => {
    setLoading(true);

    event.preventDefault();
    if (addFile) {
      const formData = new FormData();
      formData.append("file", addFile);
      multipartPostCallWithErrorResponse(ApiConfig.IMPORT_ORDER_ADD, formData)
        .then((res) => {
          console.log("UploadFile", res.json);
          // const responseData = res.json.data;
          // const uploadSuccess = responseData.every((item) => item.result === true);

          if (res.json.result) {
            notifySuccess(res.json.message);
            setLoading(false);
            setAddFile("");
            navigate("/DispatchOrder");
          } else {
            console.log("Data Not Found ");
            notifyError(res.json.message);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      notifyError(t("Upload File cannot be blank."));
      setLoading(false);
    }
  };

  return (
    <>
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
            <div id="cx-wrapper" className="vehicle_Booking">
              <div className="main-master-wrapper">
                <div className="header">
                  <label className="headerTxt">
                    {t("Import Order Details")}{" "}
                  </label>
                </div>

                <div className="mt-3">
                  <div className="Container-md ">
                    <h6 style={{ color: "#9c4900 " }}>{t("Upload File")}  </h6>
                    <input
                      // id="fileInput"
                      type="file"
                      accept=".xls,.xlsx"
                      className="cx-btn-3"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="d-flex justify-content-start mt-3 ">
                    <div>
                      <button className="cx-btn-2" onClick={handleUploadFile}>
                        {t("Upload")}{" "}
                      </button>
                    </div>
                    <div>
                      <button
                        className="cx-btn-1"
                        onClick={() => setDownloadFile("excel")}
                      >
                        {t("Download Import Format")}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <hr />
                  <h6 className="headerTxt">
                    {t(
                      "Please follow the instruction before uploading the file"
                    )}
                    .
                  </h6>
                  <ul>
                    <li>{t("Uploading file should be a .xls file")} </li>
                    <li>
                      {t(
                        "Successive rows should be filled out from first row onwards"
                      )}{" "}
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <hr />
                  <h6 className="headerTxt">
                    {t(
                      "Please follow the instruction before uploading the file"
                    )}
                    .
                  </h6>
                  <ul>
                    <li>{t("Uploading file should be a .xls file")} </li>
                    <li>
                      {t(
                        "Successive rows should be filled out from first row onwards"
                      )}{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default OrderExileFile;

import { Dropdown, Modal, Tab, Tabs } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import option from "../../../assets/images/option-three-dot.svg";
import Import from "../../../assets/images/ic-Import.svg";
import Export from "../../../assets/images/ic-Export.svg";
import music from "../../../assets/images/music.svg";
import doc from "../../../assets/images/doc_1.svg";
import imagePri from "../../../assets/images/AudioControls/imagePri.jpg";
import audio1 from "../../../assets/Audio/audio1.mp3";
import { Link } from "react-router-dom";
import Calendar from "../../../assets/images/calendar.svg";
import announceImg from "../../../assets/images/announce.png";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { simpleDeleteCall, simplePostCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import Form from "react-bootstrap/Form";
import Pagenation from "../../../sharedComponent/Pagenation";
import { jsPDF } from "jspdf";
import ReactAudioPlayer from "react-audio-player";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import { DateDDMMYYYY, latestDate } from "../../../sharedComponent/common";
import NoDataComp from "../../../sharedComponent/NoDataComp";
import NoMoreDataComp from "../../../sharedComponent/NoMoreDataComp";
import { useTranslation } from "react-i18next";
import Loader from "../../../sharedComponent/Loader";
import { useSelector } from "react-redux";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const Announcement = () => {
  const { sidebar, setSidebar, Dark, loading, setLoading, recordsPerPage } =
    useContext(AppContext);
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;
  const [startDate, setStartDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [AnnouncmentList, setAnnouncmentList] = useState([]);
  const [page, setPage] = useState(1);
  const [last_page, setlast_page] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [DeleteId, setDeleteId] = useState("");
  const [FilterTital, setFilterTital] = useState("");
  const [FilterDate, setFilterDate] = useState("");
  const [OptionDownload, setOptionDownload] = useState("");
  const [pdfData, setpdfData] = useState("");
  const [disableChooseFile, setDisableChooseFile] = useState(false);
  const { t, i18n } = useTranslation();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    geAnnouncementlist(1);
  }, [FilterTital, FilterDate]);
  function geAnnouncementlist(currentPage) {
    // setLoading(true);

    let newRequestBody = JSON.stringify({
      page: currentPage,
      announcement_content: FilterTital,
      announcement_date: latestDate(FilterDate?.submission_date, "yyyy-MM-dd"),
      page_limit: recordsPerPage,
      format:OptionDownload
    });
    simplePostCall(ApiConfig.COMINCATION_LIST, newRequestBody)
      .then((data) => {
        if (data.result) {
          const firstKey = data.file_path;
          setpdfData(firstKey);
          if (!firstKey) {
            setAnnouncmentList(data.data);
          
            console.log(data.data, "data.data************pdf");
          }
          setTotalPages(data.total);

          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];
          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,
              user_profile_pic: eachteam.user_profile_pic || "",
              user_name: eachteam.user_name || "",
              user_email: eachteam.user_email || "",
            };
          });

          if (currentPage === 1 || currentPage === 0) {
            setAnnouncmentList(data.data);
          } else {
            setAnnouncmentList([...AnnouncmentList, ...TransportData]);
          }
        } else {
          // setTransportActive(data.data);
          setAnnouncmentList(0);

          setlast_page(false);
          setTotalPages(0);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function userDelete() {
    let newRequestBody = JSON.stringify({
      announcement_id: DeleteId,
    });
    simplePostCall(ApiConfig.COMINCATION_DELETE, newRequestBody)
      .then((data) => {
        if (data.result) {
          notifySuccess(data.message);
          handleClose();
          geAnnouncementlist(page);
        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  function onPageLoad() {
    setPage(page + 1);
    geAnnouncementlist(page + 1);
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
      geAnnouncementlist()
    }
  }, [
    OptionDownload,
    
  ]);

  function getExportChat() {
    simplePostCall(ApiConfig.ANNOUNCEMENT_EXPORT)
      .then((data) => {
        if (data.result) {
          pdfFormat(data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const pdfFormat = (pdfData) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = t("Announcement");
    const headers = [[t("Sr. No"), t("Announcement Title"), t("Date")]];
    var data = [];

    pdfData.map((item, index) => {
      data.push([index + 1, item.announcement_content, item.announcement_date]);
    });

    let content = {
      headStyles: { fillColor: "#9c4900" },
      theme: "grid",
      pageBreak: "auto",
      bodyStyles: { fillColor: "#f6efe9" },
      styles: { fillColor: "#9c4900" },
      head: headers,
      title: title,
      body: data,
    };

    doc.text(title, marginLeft, 25);
    doc.autoTable(content);
    doc.save("VT.pdf");
    return <div></div>;
  };

  const handleErrorImage = (ev) => {
    ev.target.src = announceImg;
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
      {loading ? (
        <Loader />
      ) : (
        <div id="cx-wrapper">
          <div className="d-flex justify-content-end mb-2">
            {userRole === "customer" ||
            (accessRights && accessRights?.rights_manage_announcement) ? (
              <Link to="/Addaudio">
                <button className="cx-btn-3">+ {t("Add Announcement")}</button>
              </Link>
            ) : null}
          </div>
          <div className="main-master-wrapper mb-0 inner-tabs-section">
            <div className="all-vehicle-main">
              <div className="all-vehical-head">
                <div className="row">
                  <div id="Annousement_Responsive">
                    <div className="all-vehicle-main">
                      <div className="all-vehical-head row vehicle-top-inputs">
                        <div className="input-section-wrapper">
                          <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Announcement Title")}
                                value={FilterTital}
                                onChange={(e) => {
                                  setFilterTital(e.target.value);
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3 custom-padding-left2">
                              <div className="innerSelectBox weekCounter datepicker-main">
                                <CommonDatePicker
                                  dateKey="submission_date"
                                  setDate={setFilterDate}
                                  data={FilterDate}
                                />
                              </div>
                            </div>
                            
                          </div>
                        </div>
                        <div className="right-export-btn-section-wrapper align-items-center ">
                          <button
                            class={
                              (FilterDate.length || FilterTital.length) == 0
                                ? "cx-btn-3 me-3"
                                : "btn-active-ann me-3"
                            }
                            onClick={() => {
                              setFilterDate("");
                              setFilterTital("");
                            }}
                          >
                            {t("Clear Filter")}
                          </button>
                          {/* <div className="c-pointer">
                            <img
                              onClick={() => getExportChat()}
                              src={Import}
                              alt=""
                            />
                          </div> */}
                             <div className="md_dropdown ">
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
                        </div>
                      </div>
                      <div id="announcement-card-wrapper">
                        <div
                          className="yauto"
                          onScroll={(e) => {
                            const bottom =
                              e.target.scrollHeight - e.target.scrollTop ===
                              e.target.clientHeight;

                            if (bottom && !last_page) onPageLoad();
                          }}
                        >
                          <div className="row gx-3 main-cards-wrapper">
                            {AnnouncmentList && AnnouncmentList.length > 0 ? (
                              AnnouncmentList?.map((itemlist, index) => {
                                return (
                                  <>
                                    {itemlist?.format === "AudioType" ? (
                                      <div
                                        className={
                                          sidebar
                                            ? "col-lg-4 col-md-6"
                                            : "col-lg-3 col-md-6"
                                        }
                                      >
                                        <div
                                          className={
                                            "common-vehical-card-inner "
                                          }
                                        >
                                          <div className="vehical-card-head">
                                            <div
                                              className="heading"
                                              id="custom-logo-music"
                                            >
                                              <img src={music} alt="" />
                                              <div className="">
                                                <p className="sub-heading">
                                                 {t("Announcement Title")} 
                                                </p>
                                                <p
                                                  className="title"
                                                  style={{
                                                    wordBreak: "break-all",
                                                  }}
                                                >
                                                  {
                                                    itemlist.announcement_content
                                                  }
                                                </p>
                                              </div>
                                            </div>
                                            {(userRole === "customer" ||
                                              (accessRights &&
                                                accessRights?.rights_manage_announcement ==
                                                  1)) && (
                                              <div className="option customer-option">
                                                <Dropdown>
                                                  <Dropdown.Toggle id="dropdown-basic">
                                                    <img src={option} alt="" />
                                                  </Dropdown.Toggle>

                                                  <Dropdown.Menu>
                                                    <Dropdown.Item>
                                                      <Link
                                                        to={
                                                          "/Addaudio/" +
                                                          itemlist.announcement_id
                                                        }
                                                      >
                                                     {t("Edit")}   
                                                      </Link>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      onClick={() => {
                                                        setDeleteId(
                                                          itemlist.announcement_id
                                                        );
                                                        handleShow();
                                                      }}
                                                    >
                                                      <Link to="#">{t("Delete")} </Link>
                                                    </Dropdown.Item>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </div>
                                            )}
                                          </div>
                                          <div className="vehical-card-body row">
                                            <div className="card-contain col-lg-12">
                                              <p className="sub-heading">
                                               {t("Audio Clip")} 
                                              </p>
                                              <div className="Audio_custom">
                                                <ReactAudioPlayer
                                                  src={
                                                    ApiConfig.BASE_URL +
                                                    itemlist.announcement_path
                                                  }
                                                  controls
                                                />
                                              </div>
                                            </div>
                                            <div className="card-contain col-lg-12">
                                              <p className="sub-heading">
                                              {t("Announcement Date")}{" "}
                                              </p>
                                              <p className="title2">
                                                {DateDDMMYYYY(
                                                  itemlist.announcement_date
                                                )}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : itemlist.format === "Images" ? (
                                      <div
                                        className={
                                          sidebar
                                            ? "col-lg-4 col-md-6"
                                            : "col-lg-3 col-md-6"
                                        }
                                      >
                                        <div
                                          className={
                                            "common-vehical-card-inner "
                                          }
                                        >
                                          <div className="vehical-card-head">
                                            <div
                                              className="heading"
                                              id="custom-logo-music"
                                            >
                                              <img src={ ApiConfig.BASE_URL +
                                                    itemlist?.announcement_path} alt="" />
                                              <div className="">
                                                <p className="sub-heading">
                                                {t("Announcement Title")}  
                                                </p>
                                                <p
                                                  className="title"
                                                  style={{
                                                    wordBreak: "break-all",
                                                  }}
                                                >
                                                  {
                                                    itemlist.announcement_content
                                                  }
                                                </p>
                                              </div>
                                            </div>
                                            {(userRole === "customer" ||
                                              (accessRights &&
                                                accessRights?.rights_manage_announcement ==
                                                  1)) && (
                                              <div className="option customer-option">
                                                <Dropdown>
                                                  <Dropdown.Toggle id="dropdown-basic">
                                                    <img src={option} alt="" />
                                                  </Dropdown.Toggle>

                                                  <Dropdown.Menu>
                                                    <Dropdown.Item>
                                                      <Link
                                                        to={
                                                          "/Addaudio/" +
                                                          itemlist.announcement_id
                                                        }
                                                      >
                                                     {t("Edit")}   
                                                      </Link>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      onClick={() => {
                                                        setDeleteId(
                                                          itemlist.announcement_id
                                                        );
                                                        handleShow();
                                                      }}
                                                    >
                                                      <Link to="#">{t("Delete")} </Link>
                                                    </Dropdown.Item>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </div>
                                            )}
                                          </div>
                                          <div className="vehical-card-body row">
                                            <div className="card-contain col-lg-12">
                                              <p className="sub-heading">
                                             {t("Image Announcement")}   
                                              </p>
                                              <div className="Img_custom">
                                                <img
                                                  src={
                                                    ApiConfig.BASE_URL +
                                                    itemlist?.announcement_path
                                                  }
                                                  onError={(ev) => {
                                                    handleErrorImage(ev);
                                                  }}
                                                  alt=""
                                                />
                                              </div>
                                            </div>
                                            <div className="card-contain col-lg-12">
                                              <p className="sub-heading">
                                              {t("Announcement Date")}  {" "}
                                              </p>
                                              <p className="title2">
                                                {DateDDMMYYYY(
                                                  itemlist.announcement_date
                                                )}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div
                                        className={
                                          sidebar
                                            ? "col-lg-4 col-md-6"
                                            : "col-lg-3 col-md-6"
                                        }
                                      >
                                        <div
                                          className={
                                            "common-vehical-card-inner "
                                          }
                                        >
                                          <div className="vehical-card-head">
                                            <div
                                              className="heading"
                                              id="custom-logo-music"
                                            >
                                              <img   src={doc} alt=""  />
                                              <div className="">
                                                <div className="sub-title-flex">
                                                  <p className="sub-heading">
                                                  {t("Announcement Title")}  
                                                  </p>
                                                </div>
                                                <p
                                                  className="title"
                                                  style={{
                                                    wordBreak: "break-all",
                                                  }}
                                                >
                                                  {
                                                    itemlist.announcement_content
                                                  }
                                                </p>
                                              </div>
                                            </div>
                                            {(userRole === "customer" ||
                                              (accessRights &&
                                                accessRights?.rights_manage_announcement ==
                                                  1)) && (
                                              <div className="option customer-option">
                                                <Dropdown>
                                                  <Dropdown.Toggle id="dropdown-basic">
                                                    <img src={option} alt="" />
                                                  </Dropdown.Toggle>

                                                  <Dropdown.Menu>
                                                    <Dropdown.Item>
                                                      <Link
                                                        to={
                                                          "/Addaudio/" +
                                                          itemlist.announcement_id
                                                        }
                                                      >
                                                    {t("Edit")}    
                                                      </Link>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      onClick={() => {
                                                        setDeleteId(
                                                          itemlist.announcement_id
                                                        );
                                                        handleShow();
                                                      }}
                                                    >
                                                      <Link to="#">{t("Delete")} </Link>
                                                    </Dropdown.Item>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </div>
                                            )}
                                          </div>
                                          <div className="vehical-card-body row">
                                            <div className="card-contain col-lg-12">
                                              <p className="sub-heading">
                                            {t("Text Announcement")}    
                                              </p>
                                              <div className="Text_custom">
                                                {itemlist?.announcement_path
                                                  ? itemlist?.announcement_path
                                                  : "Soon........."}
                                              </div>
                                            </div>
                                            <div className="card-contain col-lg-12">
                                              <p className="sub-heading">
                                               {t("Announcement Date")} {" "}
                                              </p>
                                              <p className="title2">
                                                {" "}
                                                {itemlist.announcement_date &&
                                                  DateDDMMYYYY(
                                                    itemlist?.announcement_date
                                                  )}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                );
                              })
                            ) : (
                              <div>
                                <NoDataComp />
                              </div>
                            )}
                          </div>
                        </div>
                        {AnnouncmentList?.length > 0 && (
                          <Pagenation
                          style={{"margin-top": "55px"}}
                            comp={"anounce"}
                            length={AnnouncmentList?.length}
                            total={totalPages}
                          />
                        )}
                      </div>
                    </div>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      centered
                      className="common-model"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>{t("Delete Trip")}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {t("Are you sure you want to delete this Trip")} ?
                      </Modal.Body>
                      <Modal.Footer>
                        <button className="cx-btn-1" onClick={handleClose}>
                          {t("Close")}
                        </button>
                        <button className="cx-btn-2" onClick={handleClose}>
                          {t("Yes")}
                        </button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>

            <Modal
              show={show}
              onHide={handleClose}
              centered
              className="common-model"
            >
              <Modal.Header closeButton>
                <Modal.Title>{t("Delete Audio")}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {t("Are you sure you want to delete this Audio")} ?
              </Modal.Body>
              <Modal.Footer className="pop-up-modal-footer">
                <button className="cx-btn-1" onClick={handleClose}>
                  {t("Close")}
                </button>
                <button className="cx-btn-2" onClick={() => userDelete()}>
                  {t("Yes")}
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Announcement;

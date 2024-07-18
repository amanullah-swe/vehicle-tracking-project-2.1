import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import delete_icon from "../../../assets/images/delete.svg";
import { Tab, Tabs, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Calendar from "../../../assets/images/calendar.svg";
import import_icon from "../../../assets/images/import_icon.svg";
import export_icon from "../../../assets/images/export_icon.svg";
import edit_icon from "../../../assets/images/ic-edit.svg";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import Pagenation from "../../../sharedComponent/Pagenation";
import ReactSelect from "../../../sharedComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import ApiConfig from "../../../api/ApiConfig";
import { simplePostCall } from "../../../api/ApiServices";
import NoMoreDataComp from "../../../sharedComponent/NoMoreDataComp";
import NoDataComp from "../../../sharedComponent/NoDataComp";
import { DateDDMMYYYY, latestDate } from "../../../sharedComponent/common";
import Loader from "../../../sharedComponent/Loader";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const VehicleNotification = () => {
  const {
    sidebar,
    setSidebar,
    Dark,
    setDark,
    recordsPerPage,
    loading,
    setLoading,
  } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { t, i18n } = useTranslation();
  const [totalActive, setTotalActive] = useState(0);
  const [Maintenacepage, setMaintenacePage] = useState(1);
  const [last_page, setlast_page] = useState(false);
  const [vehicleNotification, setvehicleNotification] = useState([]);
  const handleCloseCreate = () => setCreate(false);
  const handleShowCreate = () => setCreate(true);
  const handleCloseEdit = () => setEdit(false);
  const handleShowEdit = () => setEdit(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [vehicleList, setvehicleList] = useState([]);
  const [VehicleId, setVehicleId] = useState("");
  const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });

  const [daysToAdd, setDaysToAdd] = useState(1);
  const [OptionDownload, setOptionDownload] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [optionData, setOptionData] = useState("date");
  const [NextDateShow, setNextDateShow] = useState({ toNextDate: new Date() });
  const [EndDate, setEndDate] = useState({ toDayEnd: new Date() });
  const [TypeList,setTypeList ] = useState([]);
  const [ TypeId, setTypeId ] = useState("");
  const maxDate = new Date();
  useEffect(() => {
    setNextDateShow({ toNextDate: currentDate.toDayDate });
    // const currentDate = moment();

    // console.log("checking", currentDate.isSame(currentDate, `${optionData == 'month' ? 'month':  optionData == 'week' ? 'week' : optionData == 'date' ? 'date' : ''  }`))
    switch (optionData) {
      case "month":
        setDaysToAdd(29);
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
  }, [optionData, currentDate, EndDate]);

  useEffect(() => {
    if (TypeId) {
      getNotification(
        currentDate.toDayDate,
         NextDateShow.toNextDate,
        optionData,
           );
    } 
  }, [
    NextDateShow,
   optionData,  
  ]);
  useEffect(() => {
    if (TypeId) {
      getNotification(1);
    }
  }, [TypeId]);
  
  const renderTooltipForEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("Edit")}
    </Tooltip>
  );
  const renderTooltipForDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("Delete")}
    </Tooltip>
  );
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;

  useEffect(() => {
    getNotification(1);

    // geATranspoertAllList(page);
  }, []);
 
  function getNotification(currentPage) {
    currentPage == 1 && setLoading(true);
    let newRequestBody = JSON.stringify({
      page: "",
      page_limit: recordsPerPage,
      type:TypeId,
      format: OptionDownload,
      date: latestDate(currentDate.toDayDate, "yyyy-MM-dd"),
       
    });
    simplePostCall(ApiConfig.NOTIFICATION_API, newRequestBody)
      .then((data) => {
        setLoading(false);
        if (data.result) {  
          // setTotalPages(data.total)
          setTotalActive(data.total_count);

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
            setvehicleNotification(data.data);
            setTypeList(data.data)
          } else {
            setvehicleNotification([...vehicleNotification, ...TransportData]);
          }
        } else {
          setvehicleNotification(0);
          setTotalActive(data.total_count);

          setlast_page(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  function onPageLoad() {
    setMaintenacePage(Maintenacepage + 1);
    getNotification(Maintenacepage + 1);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
            <div id="cx-wrapper" className="Holidays_Main col-lg-12">

              <div className="vntable">
              <div>
                <select
                style={{width:"300px"}}
                  className="form-select"
                  aria-label="Default select example"
                  placeholder={t("Vehicle list")}
                  onChange={(e) => setTypeId(e.target.value)}
                >
                  <option value="">{t("Type List")} </option>
                  {/* {TypeList?.map((vehicle) => (
                    <option Value={vehicle.notification_type}>
                      {vehicle.notification_type}
                    </option>
                  ))} */}
                     <option value="alert">Alert</option>
                    <option value="danger">Danger</option>
                    <option value="emergency">Emergency</option>
                   <option value="info">Info</option>
                </select>
              </div>
              <div className="innerSelectBox weekCounter datepicker-main">
                <CommonDatePicker
                  dateKey={"toDayDate"}
                  setDate={setCurrentDate}
                  data={currentDate}
                  // SetPlaceholder={t("Today Date")}
                  dataDisbal={maxDate}
                />
              </div>
              {/* <div className="innerSelectBox weekCounter datepicker-main">
                <CommonDatePicker
                  dateKey={"toDayEnd"}
                  setDate={setEndDate}
                  data={EndDate}
                  SetPlaceholder={t("Today End")}
                  dataDisbal={maxDate}
                />
              </div> */}
              </div>
              <div className="main-master-wrapper">
                <div
                  id="scroll_insideThe_Padding_tabel"
                  onScroll={(e) => {
                    const bottom =
                      e.target.scrollHeight - e.target.scrollTop ===
                      e.target.clientHeight;
                    if (bottom && !last_page) onPageLoad();
                  }}
                >
                  <div className="VA_table">
                    <table className="holiday-table">
                      <thead className="ht-head logchange">
                        <tr>
                          <td>{t("Sr.No.")}</td>
                          <td>{t("Message")}</td>
                          <td>{t("Date")}</td>
                          <td>{t("type")}</td>
                        </tr>
                      </thead>
                      {vehicleNotification && vehicleNotification?.length > 0 ? (
                        vehicleNotification?.map((itemlist, index) => {
                          return (
                            <tbody className="ht-body">
                              <tr className="table-row-custom">
                                <td className="widthAutoTabel">{index + 1}</td>
                                <td className="customHeadertabel">
                               <Link to={itemlist.notification_url && itemlist.notification_url !='#' ? `/${itemlist.notification_url}` : '/VehicleNotification'}>   {itemlist.notification_text} </Link>
                                </td>
                                <td className="widthinper3">
                                  {DateDDMMYYYY(itemlist.notification_date)}
                                </td>

                                <td className="Viewchanges widthinper4">
                                  {itemlist.notification_type}
                                </td>
                              </tr>
                            </tbody>
                          );
                        })
                      ) : (
                        <></>
                      )}
                      {vehicleNotification.length > 0 && (
                        <Pagenation
                          length={vehicleNotification.length}
                          total={totalActive}
                        />
                      )}
                    </table>
                    {last_page === true ? <NoMoreDataComp /> : ""}
                    {vehicleNotification.length > 0 ? <></> : <NoDataComp />}
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
                  <Modal.Title>{t("Delete User Role")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {t("Are you sure you want to delete this Role")} ?
                </Modal.Body>
                <Modal.Footer className="pop-up-modal-footer">
                  <button className="cx-btn-1" onClick={handleClose}>
                    {t("Close")}
                  </button>
                  <button className="cx-btn-2" onClick={handleClose}>
                    {t("Yes")}
                  </button>
                </Modal.Footer>
              </Modal>
              <Modal
                show={edit}
                onHide={handleCloseEdit}
                centered
                className="common-model"
              >
                <Modal.Header closeButton>
                  <Modal.Title>{t("Edit Role")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Label className="common-labels">
                    {t("Role")} <span className="red-star">*</span>
                  </Form.Label>
                  <ReactSelect />
                </Modal.Body>
                <Modal.Footer className="pop-up-modal-footer">
                  <button className="cx-btn-1" onClick={handleCloseEdit}>
                    {t("Close")}
                  </button>
                  <button className="cx-btn-2" onClick={handleCloseEdit}>
                    {t("Yes")}
                  </button>
                </Modal.Footer>
              </Modal>
              <Modal
                show={create}
                onHide={handleCloseCreate}
                centered
                className="common-model"
              >
                <Modal.Header closeButton>
                  <Modal.Title>{t("Create Role")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Label className="common-labels">
                    {t("Role")} <span className="red-star">*</span>
                  </Form.Label>
                  <ReactSelect />
                </Modal.Body>
                <Modal.Footer className="pop-up-modal-footer">
                  <button className="cx-btn-1" onClick={handleCloseCreate}>
                    {t("Close")}
                  </button>
                  <button className="cx-btn-2" onClick={handleCloseCreate}>
                    {t("Yes")}
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default VehicleNotification;

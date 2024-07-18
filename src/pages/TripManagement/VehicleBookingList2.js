import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext"
import DDlogo from "../../assets/images/smallDD.svg";
import Calendar from "../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";
import SideIc from "../../assets/images/sideBar.svg";
import Delete from "../../assets/images/delete.svg";
import View from "../../assets/images/Group.svg";
import EditIc from "../../assets/images/ic-edit.svg";
import { Modal, OverlayTrigger, Tooltip , Dropdown} from "react-bootstrap";
import export_icon from "../../assets/images/export_icon.svg";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import Select from "react-select";
import Import from "../../assets/images/ic-Import.svg";
import { jsPDF } from "jspdf";
import FileSaver from "file-saver";
import Pagenation from "../../sharedComponent/Pagenation";
import { useTranslation } from "react-i18next";
import ApiConfig from "../../api/ApiConfig";
import { simplePostCall } from "../../api/ApiServices";
import { DateDDMMYYYY, getTime } from "../../sharedComponent/common";
import { Space, TimePicker } from "antd";
import CommonDatePicker from "../../sharedComponent/CommonDatePicker";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import { useSelector } from "react-redux";
import NoMoreDataComp from "../../sharedComponent/NoMoreDataComp";
import Loader from "../../sharedComponent/Loader";

const VehicleBookingList2 = () => {

  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;

  const { sidebar, setSidebar, Dark, setDark, useDebounce ,recordsPerPage} =
    useContext(AppContext);

  const customStyles = { 
    control: (base) => ({
      ...base,
      color: "#f6efe9",
      fontSize: 14,
      borderRadius: 10,
      border: "1px solid #f6efe9",
      backgroundColor: "white",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #f6efe9",
      },
      // This line disable the blue border
      boxShadow: "none",
    }),
  };
  const [state, setState] = useState({
    topics: [],
    selectedTopics: [],
  });


  const [gradeState, setGradeState] = useState({
    grades: [],
  });
  const [trripStopsData, setTrripStopsData] = useState([]);
  
  const [startDate, setStartDate] = useState(new Date());
  const [filter, setFilter] = useState({custName:"",orderNumber:"", order_no: "", dispatch_customer_name: ""});
  const [last_page, setlast_page] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [vehicleBookingList, setVehicleBookingList] = useState([]);
  const [assignModal, setAssignModal] = useState(false);
  const { t, i18n } = useTranslation();
  const [validated, setValidated] = useState(false);
  const [tripDetails, setTripDetails] = useState({});
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState([]);
  const [setselectedVehicleTypeId, setSetselectedVehicleTypeId] = useState("");
  const selectedVehicle = selectedId.map((id) => ({
    vehicle_booking_request_id: tripDetails?.vehicle_booking_request_id,
    vehicle_id: id,
  }));
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const renderTooltipForView = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      View
    </Tooltip>
  );

  const debouncedSearchTerm = useDebounce(filter, 500);
  useEffect(() => {
    getVehicleBookingList();
  }, [debouncedSearchTerm]);
  const getVehicleBookingList = (currentpage) => {
    currentpage==1&&  setLoading(true);
     let body = JSON.stringify({
      ...filter,
       page: currentpage ? currentpage : page,  page_limit:recordsPerPage,
    });
    simplePostCall(ApiConfig?.VEHICLE_BOOKING_LIST,body)
      .then((res) => {
        setLoading(false);
        // if (res.result) {
        //   setVehicleBookingList([...vehicleBookingList, ...res.resultQuery]);
        //   setlast_page(res.last_page);
        //   setTotalPages(res.totalPages);
        // }
        if (currentpage == 1) {
          setVehicleBookingList(res.resultQuery);
        } else {
          setVehicleBookingList([...vehicleBookingList, ...res.resultQuery]);
          setlast_page(res.last_page);
          setTotalPages(res.total);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setLoading(true);
      let body = JSON.stringify({
        ...tripDetails,
        selectedVehicle,
      });
      simplePostCall(ApiConfig.VEHICLE_ASSIGN, body)
        .then((res) => {
          setAssignModal(false)
          if (res.success) {
            notifySuccess(res.message);
            // setAssignModal(!assignModal);
            navigate("/TripManagement");
          } else {
            notifyError(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setValidated(true);
  };
  function onTopicChange(selectedOption) {

    var selected_topics = [];

    if (selectedOption?.length > 0) {
      selectedOption.map((topic, index) => {
        selected_topics.push(topic.value);
      });
    }

    setState({
      ...state,
      topics: selected_topics,
      selectedTopics: selectedOption,
    });
  }

  const getVehicleList = () => {
    setLoading(true);
    let body = JSON.stringify({
      vehicleType: "isSelected",
      vehicle_type_id: setselectedVehicleTypeId,
    });
    simplePostCall(ApiConfig.FILTERED_VEHICLE_LIST, body)
      .then((res) => {
        setLoading(false);
        // setVehicleList(res?.data);
        let vehicles = res?.data;
        var grades = [];
        vehicles.map((grade, index) => {
          let body = JSON.stringify({
            vehicleType: "isSelected",
            vehicle_type_id: tripDetails?.vehicle_type_id,
          });
          grades.push({
            label: grade.vehicle_number,
            value: grade.vehicle_id,
            id: grade.user_name,
          });
        });
        setGradeState({ ...gradeState, grades: grades });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    var choiceArry = [];
    state?.selectedTopics?.map((valuedata, index) => {
      choiceArry?.push(valuedata.value);
    });
    setSelectedId(choiceArry);
  }, [state.selectedTopics]);

  useEffect(() => {
    if(setselectedVehicleTypeId){
     getVehicleList();
    }

    // return () => { };
  }, [setselectedVehicleTypeId]);





  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const getExPort = (formate) => {
    let newRequestBody = JSON.stringify({
      format: formate,
      trip_name: "",
      pickup_point_distance_from_source: "",
      pickup_point_priority: "",
      pickup_point_name_and_code: "",
    });
    simplePostCall(ApiConfig.GET_TRIP_STOP_EXPORT, newRequestBody)
      .then((data) => {
        if (data.result) {
          pdfFormat1(data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const downLoadExcelSheet = (formate) => {
    let newRequestBody = JSON.stringify({
      format: formate,
      trip_name: "",
      pickup_point_distance_from_source: "",
      pickup_point_priority: "",
      pickup_point_name_and_code: "",
    });
    simplePostCall(ApiConfig.GET_TRIP_STOP_EXPORT, newRequestBody)
      .then((res) => {
        if (res?.result === true) {
          FileSaver.saveAs(ApiConfig.BASE_URL + res.filePath);
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const pdfFormat1 = (pdfData) => {
    // let chatsData = await getExportChat()
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Trip Management";
    const headers = [["Sr. No.", "Stop Name", "Pick up Code", "Distance"]];
    var data = [];

    pdfData.map((item, index) => {
      data.push([
        index + 1,
        item?.pickup_point_name,
        item?.pickup_point_code,
        item?.pickup_point_distance_from_source,
        // item?.announcement_date,
      ]);
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
  return (
    <>
      {/* <motion.div
        className={sidebar ? "taskMain " : "cx-active taskMain"}
        id="cx-main"
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
      > */}
        <div id="cx-wrapper" className="Dispatch_Order">
          {/* Top inputs for instatnt search */}
       
          {/* Vehicle table */}
          <div className="main-master-wrapper">
            <div
              id="scroll_insideThe_Padding_tabel"
              onScroll={(e) => {
                const bottom =
                  e.target.scrollHeight - e.target.scrollTop ===
                  e.target.clientHeight;
                if (bottom && !last_page) {
                  setPage(page + 1);
                  getVehicleBookingList(page + 1);
                }
              }}
            >
              <div className="VA_table">

              <div className="all-vehical-head row vehicle-top-inputs">
                        <div className="input-section-wrapper">
                          <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Trip ID")}
                                // value={filter.trip_name}
                                onChange={(e) => {
                                  setVehicleBookingList([]);
                                  setFilter({ ...filter, orderNumber: e.target.value });
                                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Start Location")}
                                value={filter?.custName}
                onChange={(e) => {
                  setVehicleBookingList([]);
                  setFilter({ ...filter, custName: e.target.value });
                }}
                              />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("End Location")}
                                value={filter.pickup_point_priority}
                                onChange={(e) => {
                                  setTrripStopsData([]);
                                  setFilter({
                                    ...filter,
                                    pickup_point_priority: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          
                          </div>
                        </div>
              
                      </div>

                <table className="table tableAdmin">
                  <thead className="tableHead">
                    <tr>
                      <th>{t("Sr.no")}</th>
                      <th>{t("Trip id")}</th>
                      <th>{t("Start Loaction ")}</th>
                      <th>{t("End Loaction")}</th>
                      <th>{t("Date & Time")}</th>
                      <th>{t("Action")}</th>
                      {/* <th>{t("Order Status")}</th> */}
                   {  (userRole === "customer") ||
                (accessRights && accessRights?.rights_manage_vehicle_booking_orders==1) && <th>{t("Action")}</th>}
                    </tr>
                  </thead>
                  {loading ? (
            <Loader />
          ) : (
            <>
                  <tbody className="tableBody">
                    {vehicleBookingList&&vehicleBookingList?.map((vehicle, index) => {
                      return (
                        <tr key={vehicle?.vehicle_booking_request_id}>
                          <td>{index + 1}</td>
                          <td>{vehicle?.order_no}</td>
                          <td>{vehicle?.dispatch_customer_name}</td>
                          <td className="text-center">{vehicle?.number_of_vehicles}</td>
                          {/* <td>
                            {vehicle?.order_status_v_b === "0" ||
                              vehicle?.order_status_v_b == null
                              ? "Order Placed"
                              : "Vehicle Assign"}
                          </td> */}
                          <td>
                            {DateDDMMYYYY(
                              vehicle?.vehicle_booking_request_date
                            )}{" "}
                            {vehicle?.vehicle_booking_request_time}
                          </td>
                          <td>
                            <div className="innerFlex">
                          
                          {((userRole === "customer") ||
                (accessRights && accessRights?.rights_manage_vehicle_booking_orders==1)) &&
                <button
                                className={
                                  vehicle?.order_status_v_b === "0" ||
                                    vehicle?.order_status_v_b == null
                                    ? "cx-btn-2"
                                    : "cx-btn-1"
                                }
                                disabled={
                                  vehicle?.order_status_v_b === "0" ||
                                    vehicle?.order_status_v_b == null
                                    ? false
                                    : true
                                }
                                onClick={() => {
                                  setAssignModal(true);
                                  setSetselectedVehicleTypeId(
                                    vehicle?.vehicle_type_id
                                  );

                                  setTripDetails({
                                    ...tripDetails,
                                    vehicle_booking_request_id:
                                      vehicle?.vehicle_booking_request_id,
                                    trip_date:
                                      vehicle?.vehicle_booking_request_date,
                                    startTime:
                                      vehicle?.vehicle_booking_request_time,
                                    vehicleNumber: vehicle?.number_of_vehicles,
                                  });
                                }}
                              >
                                                                {vehicle?.order_status_v_b === "0" ||
                                  vehicle?.order_status_v_b == null
                                  ? "Assign"
                                  : "Assigned"}
                              </button>
                }    
                              {/* </OverlayTrigger> */}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                   
                                              

                   
                  </tbody>
                  </>
          )}
                </table>
                <div>
                    {/* {last_page === true ? <NoMoreDataComp /> : ""} */}
                    </div>
              </div>
            </div>
       { vehicleBookingList?.length>0&&    <Pagenation
              length={vehicleBookingList?.length}
              total={totalPages}
            />}
          </div>
        </div>
      {/* </motion.div> */}

      {/* Delete Modal Start */}
      <Modal
        show={assignModal}
        onHide={() => setAssignModal(false)}
        centered
        className="common-model"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("Assign Route")} </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-1">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 form_input_main mt-3">
                <div className="innerSelectBox weekCounter">
                  <Form.Label className="common-labels">
                    {t("Date")}
                  </Form.Label>
                  <div className="innerSelectBox weekCounter datepicker-main">
                  <CommonDatePicker
                    dateKey="trip_date"
                    setDate={setTripDetails}
                    data={tripDetails}
                    keyDisable={true}
                  />
                 </div>

                  <Form.Control.Feedback>
                    Please Select Start Date
                  </Form.Control.Feedback>
                </div>
              </div>

             
             
              <div className="col-md-12 col-sm-12 colForm mb-2 mt-4">
                <Form.Label>
                  Vehicles <span>&#42;</span>
                </Form.Label>

                <Select
                  // className="js-example-basic-single form-control"
                  styles={customStyles}
                  theme={(theme) => ({
                    ...theme,

                    colors: {
                      ...theme.colors,
                      neutral50: "rgba(156, 73, 0, 0.5)",
                      primary25: "#f6efe9",
                      primary: "#8f4300",
                      primary75: "#4C9AFF",
                      background: "#8f4300",
                      color: "#8f4300",
                    },
                  })}
                  id={state?.selectedTopics}
                  value={state?.selectedTopics}
                  onChange={onTopicChange}
                  options={gradeState.grades}
                  isMulti={true}
                />

                <Form.Control.Feedback>
                  Please select Vehicle
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 colForm mb-2">
              <Form.Label>
                Drivers of Vehicles <span>&#42;</span>
              </Form.Label>
              {state?.selectedTopics?.map((topic, index) => {
                return (
                  <p>
                    {topic?.label}

                    {">>"}
                    {topic?.id ? topic?.id : "Driver not assigned"}
                  </p>
                );
              })}
            </div>
            <Modal.Footer>
              <div className="d-flex justify-content-end align-items-center belowBtns btn-wrapper">
                <button
                  onClick={() => setAssignModal(false)}
                  type="button"
                  className="cx-btn-1"
                >
                  {t("Cancel")}
                </button>
                <button type="Assign" className="cx-btn-2">
                  {t("Assign")}
                </button>
              </div>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Delete Modal End */}
    </>
  );
};

export default VehicleBookingList2;

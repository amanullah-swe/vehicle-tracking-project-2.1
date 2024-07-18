import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import DDlogo from "../../../assets/images/smallDD.svg";
import Calendar from "../../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";
import SideIc from "../../../assets/images/sideBar.svg";
import Delete from "../../../assets/images/delete.svg";
import View from "../../../assets/images/Group.svg";
import EditIc from "../../../assets/images/ic-edit.svg";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import export_icon from "../../../assets/images/export_icon.svg";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import Select from "react-select";

import Pagenation from "../../../sharedComponent/Pagenation";
import { useTranslation } from "react-i18next";
import ApiConfig from "../../../api/ApiConfig";
import { simplePostCall } from "../../../api/ApiServices";
import { DateDDMMYYYY, getTime } from "../../../sharedComponent/common";
import { Space, TimePicker } from "antd";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import { useSelector } from "react-redux";
import NoMoreDataComp from "../../../sharedComponent/NoMoreDataComp";
import Loader from "../../../sharedComponent/Loader";

const VehicleBookingList = () => {

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

    if (selectedOption.length > 0) {
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
        <div id="cx-wrapper" className="Dispatch_Order">
          {/* Top inputs for instatnt search */}
          <div className="displayFlexInp">
            <div className="innerSelectBox weekCounter selectForm form_input_main">
              <Form.Control
                required
                type="text"
                placeholder="Order Number"
                className="innerCust"
                onChange={(e) => {
                  setVehicleBookingList([]);
                  setFilter({ ...filter, orderNumber: e.target.value });
                }}
              />
            </div>
            <div className="innerSelectBox weekCounter selectForm form_input_main">
              <Form.Control
                required
                name="Speed_limit"
                placeholder="Customer Name"
                className="innerCust"
                value={filter?.custName}
                onChange={(e) => {
                  setVehicleBookingList([]);
                  setFilter({ ...filter, custName: e.target.value });
                }}
              />
            </div>
          
            <div className="innerSelectBox weekCounter selectForm form_input_main dNo"></div>
            {/* <div className="innerSelectBox weekCounter selectForm form_input_main">
              <Link to="/ManualRouting" className="AddAccidentLink">
                <button className="innerCust">{t("Manual Routing")}</button>
              </Link>
            </div> */}
            {
              userRole === "customer" ||
                (accessRights && accessRights?.rights_manage_vehicle_booking_orders) ? (
                <>
                  {/* <div className="headerDivIc diffBtns form_input_main">
                    <Link to="#">
                      <img src={SideIc} alt="" />
                    </Link>
                  </div> */}
                  {/* <div className="headerDivIc diffBtns form_input_main">
                    <Link to="#">
                      <img src={export_icon} alt="" />
                    </Link>
                  </div> */}
                </>
              ) : null
            }
          </div>
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
                <table className="table tableAdmin">
                  <thead className="tableHead">
                    <tr>
                      <th>{t("Sr.no")}</th>
                      <th>{t("Order Number")}</th>
                      <th>{t("Customer Name")}</th>
                      <th>{t("Number Of Vehicles")}</th>
                      <th>{t("Order Status")}</th>
                      <th>{t("Order Date & Time")}</th>
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
                          <td>
                            {vehicle?.order_status_v_b === "0" ||
                              vehicle?.order_status_v_b == null
                              ? "Order Placed"
                              : "Vehicle Assign"}
                          </td>
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
       { vehicleBookingList.length>0&&    <Pagenation
              length={vehicleBookingList?.length}
              total={totalPages}
            />}
          </div>
        </div>
      </motion.div>

      {/* Delete Modal Start */}
      <Modal
        show={assignModal}
        onHide={() => setAssignModal(false)}
        centered
        className="common-model"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("Assign Vehicle")} </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-1">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 form_input_main mt-3">
                <div className="innerSelectBox weekCounter">
                  <Form.Label className="common-labels">
                    {t("Start Date")}
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

              <div className="col-md-12 col-lg-6 form_input_main mt-3">
                <div className="innerSelectBox weekCounter">
                  <Form.Label className="common-labels">
                    {t("Start Time")}
                  </Form.Label>
                  <Space>
                    <TimePicker
                      className="form-control carretClass"
                      placeholder="Start Time"
                      size="large"
                      disabled
                      value={
                        tripDetails.startTime
                          ? dayjs(tripDetails.startTime, "HH:mm:ss")
                          : dayjs(new Date())
                      }
                      onChange={(e) => {
                        if (e) {
                          let startTime =
                            e.hour() + ":" + e.minute() + ":" + e.second();
                          setTripDetails({ ...tripDetails, startTime });
                        }
                      }}
                    />
                  </Space>
                </div>
              </div>
              <div className="col-md-6 form_input_main ">
                <div className="innerSelectBox weekCounter">
                  <Form.Label className="common-labels">
                    {t("End Date")}
                  </Form.Label>
                  <div className="innerSelectBox weekCounter datepicker-main">
                  <CommonDatePicker
                    dateKey="trip_end_date"
                    setDate={setTripDetails}
                    data={tripDetails}
                    minDate={tripDetails?.trip_date}
                  />
             </div>
                  <Form.Control.Feedback>
                    Please Select Start Date
                  </Form.Control.Feedback>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 form_input_main">
                <div className="innerSelectBox weekCounter">
                  <Form.Label className="common-labels">
                    {t("End Time")}
                  </Form.Label>
                  <Space>
                    <TimePicker
                      className="form-control carretClass"
                      placeholder="End Time"
                      size="large"
                      value={
                        tripDetails.endTime
                          ? dayjs(tripDetails.endTime, "HH:mm:ss")
                          : dayjs(new Date())
                      }
                      onChange={(e) => {
                        if (e) {
                          let endTime =
                            e.hour() + ":" + e.minute() + ":" + e.second();
                          setTripDetails({ ...tripDetails, endTime });
                        }
                      }}
                    />
                  </Space>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 colForm mb-2">
                <Form.Label>
                  Vehicles to be Assigned <span>&#42;</span>
                </Form.Label>
                <input
                  type="text"
                  class="form-control"
                  value={tripDetails?.vehicleNumber}
                  disabled
                // placeholder="How many vehicles you want ?"
                // onChange={(e) => setNumberOfVehicles(e.target.value)}
                />
              </div>
              <div className="col-md-12 col-sm-12 colForm mb-2">
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

export default VehicleBookingList;

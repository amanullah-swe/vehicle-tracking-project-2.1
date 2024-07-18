import { React, useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import Form from "react-bootstrap/Form";
import { Modal,/*  OverlayTrigger, Tooltip */ } from 'react-bootstrap'
import Save from "../../../assets/images/save.svg";
import Inspect from "../../../assets/images/inspect.svg";
import Right from "../../../assets/images/right.svg";
import Invoice from "../../../assets/images/invoice.svg";
import DatePicker from "react-datepicker";
import Calendar from "../../../assets/images/calendar.svg";
import uploadIcon from "../../../assets/images/uploadIcon.svg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Delete from '../../../assets/images/delete.svg'
import ApiConfig from "../../../api/ApiConfig";
import './AddVehicleMaintainance.scss'
import {
  getWithAuthCall,
  multipartPostCall,
  simpleGetCall, simplePostCall
} from "../../../api/ApiServices";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import moment from "moment";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import { useNavigate, useParams } from "react-router-dom";
import { DateDDMMYYYY } from "../../../sharedComponent/common";
import Select from "react-select";
import './AddVehicleMaintainance.scss';
// Types of files

import pdfIcon from '../../../assets/images/InspetionPDF/pdf-Icon-regular.svg'


const AddVehicleMaintenance = () => {
  const params = useParams();
  const navigate = useNavigate();
  let UserId = params.id;
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const { t, i18n } = useTranslation();
  const [service_mode, setService_mode] = useState("Automatic");
  const [autoDate, setAutoDate] = useState("");
  const [expense_file_expense_id, set_expense_file_expense_id] = useState('')
  const [expense_file_id, set_expense_file_id] = useState('')
  const [invoice_index, set_invoice_index] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [update_invoice_array, set_update_invoice_array] = useState({
    invoice: []
  })

  const [send_service_notification, setSend_service_notification] =
    useState("Yes");
  const [vehicle_Maintainance_details, setVehicle_Maintainance_details] =
    useState({
      vehicle_id: "",
      maintenance_task: "",
      kilometers_driven: "",
      service_date: new Date(),
      next_service_date: "",
      next_service_kilometers: "",
      next_service_duration: "",
      send_service_notification: true,
      invoice: [],
      maintainance_id: "",
      service_notification_duration: "",
      number_of_service_notification: "",
      service_mode: "",
    });



  const dateFilter = DateDDMMYYYY(vehicle_Maintainance_details.next_service_date);
  const [VehicalType, setVehicalType] = useState([]);

  const customStyles = {
    control: (base) => ({
      ...base,
      color: "#f6efe9",
      fontSize: 14,
      borderRadius: 10,
      border: "1px solid #f6efe9",
      backgroundColor: 'white',
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #f6efe9",
      },
      // This line disable the blue border
      boxShadow: "none",
    }),
  };

  const [vehicleState, setVehicleState] = useState({
    isloading: true,
    vehicles: [],
  });
  // Convert driverState.drivers to options format for react-select
  const vehicleOptions = vehicleState?.vehicles?.map((vehicle) => ({
    value: vehicle.value,
    label: vehicle.label,
  }));
  // Find the selected driver option
  const selectedVehicle = vehicleOptions.find(option => option.value === vehicle_Maintainance_details.vehicle_id);


  function geVehicalList() {
    getWithAuthCall(ApiConfig.VEHICLE_ACCIDENT_VEHICALE_LIST)
      .then((data) => {
        setVehicalType(data.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  // start new geVehicalList fun made by me/////////////////////////////////////
  function geVehicalList_new() {
    // getWithAuthCall(ApiConfig.VEHICLE_ACCIDENT_VEHICALE_LIST)
    getWithAuthCall(ApiConfig.VEHICEL_AVALIVALITY_DROPDAWAN)
      .then((data) => {
        let Type = data?.data

        setVehicalType(data?.data);
        var vehicles = [];

        Type?.map((vehicle, index) => {
          vehicles?.push({
            value: vehicle.vehicle_id,
            label: vehicle.vehicle_number
          })

        });

        setVehicleState({ ...vehicleState, vehicles: vehicles })


      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  // end new geVehicalList fun made by me/////////////////////////////////////
  useEffect(() => {
    set_expense_file_expense_id(expense_file_expense_id);

  }, [expense_file_expense_id])

  const getDetails = () => {
    // setLoading(true);
    simpleGetCall(ApiConfig.SINGLE_VEHICLE_MAINTENANCE_DETAILS + UserId)
      .then((res) => {
        let data = res?.details;

        //   const invoice = res?.details?.maintainance_invoice;
        // vehicle_Maintainance_details?.invoice.push(invoice);
        // const invoice_array = [];
        // invoice_array.push(invoice);

        // console.log('invoice--->',invoice_array )

        set_expense_file_expense_id(data?.invoices?.[0]?.expense_file_expense_id)
        setVehicle_Maintainance_details({
          vehicle_id: data.maintainance_vehicle_id,
          maintainance_id: data.maintainance_id,
          maintenance_task: data.maintainance_task,
          kilometers_driven: data.maintainance_kilometers_driven,
          service_date: UserId ? data.maintainance_service_date : moment(data.maintainance_service_date).format("YYYY-MM-DD"),
          // service_date: data.maintainance_service_date,
          maintainance_completion_date: data?.maintainance_completion_date && moment(data?.maintainance_completion_date).format("YYYY-MM-DD"),
          // next_service_date: data.maintainance_next_service_date,
          next_service_date: UserId ? data.maintainance_next_service_date : moment(data.maintainance_next_service_date).format("YYYY-MM-DD"),


          next_service_kilometers: data.maintainance_next_service_kilometers,
          next_service_duration: data.maintainance_next_service_duration,
          service_cost: data.maintainance_expense,
          send_service_notification:
            data.maintainance_send_service_notification,
          invoice: data.invoices,
          // invoice: invoice_array,
          service_mode: data.maintainance_service_mode,
          service_notification_duration:
            data.maintainance_service_notification_duration,
          number_of_service_notification:
            data.maintainance_number_of_service_notification,
        });
        if (data.maintainance_send_service_notification === true) {
          setSend_service_notification("Yes")
        } else {
          setSend_service_notification("No")

        }

      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        // setLoading(false);
      });
  };
  const handleCancle = () => {
    navigate("/VehicleMaintenance");

  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      AddVehicleMaintainance(event);
    }
    setValidated(true);
  };
  const handleChange = (e) => {
    if (e.target.name === "invoice") {
      if (UserId) {
        const newFiles = Array.from(e.target.files);
        set_update_invoice_array((prevState) => ({
          ...prevState,
          [e.target.name]: [...prevState[e.target.name], ...newFiles]
        }))
      } else {
        const newFiles = Array.from(e.target.files);
        setVehicle_Maintainance_details((prevState) => ({
          ...prevState,
          [e.target.name]: [...prevState[e.target.name], ...newFiles]
        }))
      }
      // setVehicle_Maintainance_details({
      //   ...vehicle_Maintainance_details,
      //   // [e.target.name]: e.target.files[0],
      //   [e.target.name]: [...e.target.files],
      // });
    } else setVehicle_Maintainance_details({ ...vehicle_Maintainance_details, [e.target.name]: e.target.value });
  };
  const handleDelete = (indexToRemove) => {
    setVehicle_Maintainance_details((prevState) => ({
      ...prevState,
      invoice: prevState.invoice?.filter((_, index) => index !== indexToRemove),
    }));
  };
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  useEffect(() => {
    if (UserId) {
      getDetails();
      geVehicalList_new();
      // geVehicalList();
    } else {
      geVehicalList_new();
      // geVehicalList();
    }
  }, []);
  useEffect(() => {
    if (UserId) {
      // setStartDate(dateFilter);
    } else {
      setStartDate(autoDate);
    }
  }, [autoDate, dateFilter]);


  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  const AddVehicleMaintainance = (e) => {
    e.preventDefault();
    // console.log("moment=====",  moment(new Date(vehicle_Maintainance_details.next_service_date.getTime() + 1 * 24 * 60 * 60 * 1000)).format("YYYY-MM-DD"));

    let formData = new FormData();
    formData.append("vehicle_id", vehicle_Maintainance_details.vehicle_id);
    formData.append(
      "maintainance_id",
      vehicle_Maintainance_details.maintainance_id
    );
    formData.append(
      "maintenance_task",
      vehicle_Maintainance_details.maintenance_task
    );
    formData.append(
      "kilometers_driven",
      vehicle_Maintainance_details.kilometers_driven
    );
    formData.append(
      "service_date",
      moment(vehicle_Maintainance_details.service_date)

        .format("YYYY-MM-DD")
    );

    {
      vehicle_Maintainance_details.next_service_date === "Invalid date" ||
        vehicle_Maintainance_details.next_service_date === "" || vehicle_Maintainance_details.next_service_date === null
        ? formData.append(
          "next_service_date",

          moment(startDate).format("YYYY-MM-DD")
        )
        : formData.append(
          "next_service_date", moment(vehicle_Maintainance_details.next_service_date)

            .format("YYYY-MM-DD")
        );


    }
    formData.append(
      "next_service_kilometers",
      vehicle_Maintainance_details.next_service_kilometers
    );
    formData.append(
      "next_service_duration",
      vehicle_Maintainance_details.next_service_duration
    );
    {
      vehicle_Maintainance_details.service_mode === "Manual" ?
        formData.append("service_mode", vehicle_Maintainance_details.service_mode)
        :
        formData.append("service_mode", service_mode)
    }

    formData.append("service_cost", vehicle_Maintainance_details.service_cost);

    formData.append(
      "completion_date",
      moment(vehicle_Maintainance_details.maintainance_completion_date)

        .format("YYYY-MM-DD")
    );
    formData.append(
      "send_service_notification",
      vehicle_Maintainance_details.send_service_notification
    );
    formData.append(
      "number_of_service_notification",
      vehicle_Maintainance_details.number_of_service_notification
    );
    formData.append(
      "service_notification_duration",
      vehicle_Maintainance_details.service_notification_duration
    );

    // formData.append("invoice", vehicle_Maintainance_details.invoice);

    const filesArray = vehicle_Maintainance_details?.invoice?.filter(Boolean);

    if (UserId) {
      formData.append("invoice", vehicle_Maintainance_details.invoice);
    } else {
      filesArray?.forEach((photo) => {
        if (photo) {
          formData.append('invoice', photo)
        }
      })
    }



    // formData.append("auto_next_service_date", startDate);

    multipartPostCall(
      UserId
        ? ApiConfig.UPDATE_VEHICLE_MAINTENANCE
        : ApiConfig.ADD_VEHICLE_MAINTENANCE,
      formData
    )
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
          navigate("/VehicleMaintenance");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const AddDays = () => {
    if (vehicle_Maintainance_details?.service_date) {

      setAutoDate(
        new Date(vehicle_Maintainance_details?.service_date).getTime() +
        Number(vehicle_Maintainance_details?.next_service_duration) *
        24 *
        60 *
        60 *
        1000
      );
    }
  };
  useEffect(() => {
    AddDays();

    return () => { };
  }, [
    vehicle_Maintainance_details?.service_date,
    vehicle_Maintainance_details.next_service_duration,
  ]);


  const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00:00 to compare just the date part
    return today;

  };

  const handleChange_new = (e) => {
    if (e.target.name === "invoice") {
      if (UserId) {
        const newFiles = Array.from(e.target.files);
        set_update_invoice_array((prevState) => ({
          ...prevState,
          [e.target.name]: [...prevState[e.target.name], ...newFiles]
        }))
      } else {
        const newFiles = Array.from(e.target.files);
        setVehicle_Maintainance_details((prevState) => ({
          ...prevState,
          [e.target.name]: [...prevState[e.target.name], ...newFiles]
        }))
      }
      // setVehicle_Maintainance_details({
      //   ...vehicle_Maintainance_details,
      //   // [e.target.name]: e.target.files[0],
      //   [e.target.name]: [...e.target.files],
      // });
    } else setVehicle_Maintainance_details({ ...vehicle_Maintainance_details, [e.target.name]: e.target.value });
  };

  const handleDeleteUpdate = (indexToRemove) => {
    if (UserId) {
      set_update_invoice_array((prevState) => ({
        ...prevState,
        invoice: prevState?.invoice?.filter((_, index) => index !== indexToRemove),
      }))
    }
  }


  const renderPDF = (url) => {
    console.log('ihave run -->', url)
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  };
  const isPDF = (url) => /\.pdf$/i.test(url);

  function invoiceDelete() {
    let newRequestBody = JSON.stringify({
      // incident_id: DeleteId
      expense_file_id: expense_file_id
    })
    simplePostCall(ApiConfig.VEHICLE_ACCIDENT_INVOICE_DELETE, newRequestBody)
      .then(data => {
        if (data?.result) {
          notifySuccess(data?.message)
          setDeleteModal(false)
          // getVechicleAccident(1)
          // setPage(1)
        } else {
          notifyError(data?.message)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }
  const handleDelete_new = (indexToRemove) => {
    setVehicle_Maintainance_details((prevState) => ({
      ...prevState,
      invoice: prevState?.invoice?.filter((_, index) => index !== indexToRemove),
    }))
  }

  function invoiceUpdate() {
    if (update_invoice_array?.invoice?.length > 0) {
      const formData = new FormData();
      formData.append("expense_file_expense_id", expense_file_expense_id ? expense_file_expense_id : UserId);
      formData.append("expense_file_expense_type", 'maintenance');

      const filesArray = update_invoice_array?.invoice?.filter(Boolean);
      filesArray?.forEach((photo) => {
        if (photo) {
          formData.append('invoice', photo)
        }
      })
      multipartPostCall(ApiConfig.VEHICLE_ACCIDENT_INVOICE_UPDATE, formData)
        .then(data => {
          console.log('UPdatedata--->', data)
          if (data?.result) {
            notifySuccess(data?.message)
            setDeleteModal(false)
            // getVechicleAccident(1)
            // setPage(1)
          } else {
            notifyError(data?.message)
          }
        })
        .catch(error => {
          console.log('api response-->', error)
        })
    } else {
      return null;
    }
  }



  const handlePdfDownload = (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    // setShowModal(false);
    // console.log(invoice.expense_file_path)
    const pdfPath = url; // Replace with your PDF file path

    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'filename.pdf'; // Optional: specify the filename for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div id="cx-wrapper" className="AddFleet_Maintainence">
            <div className="main-master-wrapper mb-4">
              <div className="vehicleHead">
                <p>{UserId ? "Update" : "Add"} New Details</p>
              </div>
              <div className="innerInputsGen mainVehAccident vehivleBody">
                <div className="">
                  <div className="addVehicleLeftSec">
                    <div className="row">

                      {/*start of old vehicle name dd disabled by me//////////////////////////////////////////////////////////////  */}

                      {/*    <div className="col-md-6 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {t("Vehicle Name")} <span>&#42;</span>
                          </Form.Label>
                          <Form.Select
                            disabled={UserId ? true : false}
                            required
                            placeholder="Please  Select vehicle Name"
                            value={vehicle_Maintainance_details?.vehicle_id}
                            onChange={(e) => {
                              setVehicle_Maintainance_details({
                                ...vehicle_Maintainance_details,
                                vehicle_id: e.target.value,
                              });
                            }}
                          >
                                <option value="">Enter Your vehicle Name</option>
                            {VehicalType &&
                              VehicalType?.length &&
                              VehicalType.map((Typelist, index) => {
                                return (
                                  <>
                                
                                    <option
                                      key={"delivery" + index}
                                      value={Typelist.vehicle_id}
                                    >
                                      {Typelist.vehicle_number}
                                    </option>
                                  </>
                                );
                              })}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please Enter vehicle code.
                          </Form.Control.Feedback>
                        </div>
                      </div> */}
                      {/*end of old vehicle name dd disabled by me//////////////////////////////////////////////////////////////  */}


                      {/* start new vehicle name dd made by me//////////////////////////////////////////////// */}
                      <div className="col-md-6 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {" "}
                            {t("Vehicle Name")} <span>&#42;</span>{" "}
                          </Form.Label>

                          <Select
                            styles={customStyles}
                            theme={(theme) => ({
                              ...theme,

                              colors: {
                                ...theme.colors,
                                neutral50: "rgba(156, 73, 0, 0.5)",
                                primary25: "#f6efe9",
                                primary: "#8f4300",
                                primary75: '#4C9AFF',
                                background: "#8f4300",
                                color: "#8f4300",
                              },
                            })}
                            disabled={UserId ? true : false}
                            required
                            placeholder="Select Vehicle Name"
                            value={selectedVehicle}
                            options={vehicleState?.vehicles}
                            onChange={(selectedOption) => {
                              setVehicle_Maintainance_details({
                                ...vehicle_Maintainance_details,
                                vehicle_id: selectedOption ? selectedOption.value : '',
                              });
                            }}

                          >

                          </Select>
                          <Form.Control.Feedback type="invalid">
                            Please select vehicle Name
                          </Form.Control.Feedback>
                        </div>
                      </div>


                      {/* end new vehicle name dd made by me//////////////////////////////////////////////// */}

                      <div className="col-md-6 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {t("Service Task")} <span>&#42;</span>
                          </Form.Label>
                          <Form.Control
                            disabled={UserId ? true : false}
                            required
                            type="text"
                            placeholder="Enter Your Service Task"
                            value={
                              vehicle_Maintainance_details.maintenance_task
                            }
                            onChange={(e) => {
                              let value = e.target.value
                              let valueInput = value.replace(/[^A-Za-z ]/ig, '')
                              setVehicle_Maintainance_details({
                                ...vehicle_Maintainance_details,
                                maintenance_task: valueInput?.trim(),
                              });
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please Enter Service Task.
                          </Form.Control.Feedback>
                        </div>
                      </div>

                      <div className="col-md-6 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {t("Kilometers Driven")} <span>&#42;</span>
                          </Form.Label>
                          <Form.Control
                            disabled={UserId ? true : false}
                            required
                            type="text"
                            placeholder="Enter Your Kilometers Driven"
                            value={
                              vehicle_Maintainance_details.kilometers_driven
                            }
                            onChange={(e) => {
                              let value = e.target.value;
                              let valueInput = value.replace(
                                /[^0-9]/gi,
                                ""
                              );
                              setVehicle_Maintainance_details({
                                ...vehicle_Maintainance_details,
                                kilometers_driven: valueInput,
                              });
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please Enter Kilometers Driven.
                          </Form.Control.Feedback>
                        </div>
                      </div>

                      <div className="col-md-6 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <div className="d-flex justify-content-between  align-items-center flex-wrap">
                            <Form.Label className="common-labels nextLabel ">
                              {t("Next Service Kilometers")} <span>&#42;</span>
                            </Form.Label>
                          </div>
                          <Form.Control
                            disabled={UserId ? true : false}
                            required
                            type="text"
                            placeholder="Enter Next Service Kilometers"
                            value={
                              vehicle_Maintainance_details.next_service_kilometers
                            }
                            onChange={(e) => {
                              let value = e.target.value;
                              let valueInput = value.replace(
                                /[^0-9]/gi,
                                ""
                              );
                              setVehicle_Maintainance_details({
                                ...vehicle_Maintainance_details,
                                next_service_kilometers: valueInput,
                              });
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please Enter Next Service Kilometers.
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      {vehicle_Maintainance_details.service_mode ===
                        "Manual" ? (
                        <></>
                      ) : (
                        <>
                          <div className="col-md-6 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <>
                                <div className="d-flex justify-content-between  align-items-center flex-wrap">
                                  <Form.Label className="common-labels">
                                    {t("Service Mode")} ? <span>&#42;</span>
                                  </Form.Label>
                                  <div id="customRadios">
                                    <div class="form-check greenFlex me-2">
                                      <input
                                        disabled={UserId ? true : false}
                                        class="form-check-input"
                                        type="radio"
                                        name="auto_service"
                                        id="auto_service"
                                        checked={
                                          service_mode === "Automatic"
                                            ? true
                                            : false
                                        }
                                        onChange={(e) => {
                                          setService_mode(
                                            e.target.checked ? "Automatic" : ""
                                          );
                                        }}
                                      />
                                      <label
                                        class="form-check-label custLabel"
                                        for="auto_service"
                                      >
                                        {t("Automatic")}
                                      </label>
                                    </div>
                                    <div class="form-check  greenFlex">
                                      <input
                                        disabled={UserId ? true : false}
                                        class="form-check-input"
                                        type="radio"
                                        name="manual_service"
                                        id="manual_service"
                                        checked={
                                          service_mode === "Manual"
                                            ? true
                                            : false
                                        }
                                        onChange={(e) => {
                                          setService_mode(
                                            e.target.checked ? "Manual" : ""
                                          );
                                        }}
                                      />
                                      <label
                                        class="form-check-label custLabel"
                                        for="manual_service"
                                      >
                                        {t("Manual")}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </>
                            </div>
                          </div>

                          <div className="col-md-6 form_input_main">
                            {service_mode === "Automatic" ? (
                              <div className="innerSelectBox weekCounter">
                                <Form.Label className="common-labels">
                                  {t("Next Service Duration")}{" "}
                                  <span>&#42;</span>
                                </Form.Label>
                                <Form.Control
                                  disabled={UserId ? true : false}
                                  required
                                  type="text"
                                  placeholder="Enter Next Service Duration"
                                  value={
                                    vehicle_Maintainance_details.next_service_duration
                                  }
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    let valueInput = value.replace(
                                      /[^0-9]/gi,
                                      ""
                                    );
                                    setVehicle_Maintainance_details({
                                      ...vehicle_Maintainance_details,
                                      next_service_duration: valueInput,
                                    });
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Enter Next Service Duration
                                </Form.Control.Feedback>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </>
                      )}

                      <div className="col-md-6 form_input_main">
                        <Form.Label className="common-labels nextLabel ">
                          {t("Service Date")} <span>&#42;</span>
                        </Form.Label>
                        <div className="innerSelectBox weekCounter datepicker-main">
                          {/* <div className="d-flex justify-content-between  align-items-center flex-wrap"> */}

                          <CommonDatePicker
                            setDate={setVehicle_Maintainance_details}
                            data={vehicle_Maintainance_details}
                            dateKey="service_date"
                            keyDisable={UserId ? true : false}
                          />
                          {/* </div> */}

                          <Form.Control.Feedback type="invalid">
                            Please Select Date.
                          </Form.Control.Feedback>
                          {/* <img
                            src={Calendar}
                            className="addVehCalender addonCalneder"
                            alt=""
                          /> */}
                        </div>
                      </div>
                      <div className="col-md-6 form_input_main">
                        {vehicle_Maintainance_details.service_mode ===
                          "Manual" ? (
                          <>
                            <Form.Label className="common-labels nextLabel">
                              {t("Next Service Date Manual")}
                              <span>&#42;</span>
                            </Form.Label>
                            <div className="innerSelectBox weekCounter datepicker-main">

                              <DatePicker
                                className="datepicker-here form-control digits"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels nextLabel">
                                {t("Next Service Date")}
                                <span>&#42;</span>
                              </Form.Label>

                              <>
                                <div className="innerSelectBox weekCounter datepicker-main">
                                  {service_mode === "Automatic" ? (
                                    <DatePicker
                                      className="datepicker-here form-control digits"
                                      // minDate={minDate}
                                      onKeyDown={(e) => {
                                        e.preventDefault();
                                      }}
                                      selected={autoDate}
                                      disabled
                                      dateFormat="dd-MM-yyyy"
                                    />

                                  ) : (
                                    <CommonDatePicker
                                      setDate={setVehicle_Maintainance_details}
                                      data={vehicle_Maintainance_details}
                                      dateKey="next_service_date"
                                      keyDisable={UserId ? true : false}
                                    />
                                  )}
                                </div>
                              </>

                              <Form.Control.Feedback type="invalid">
                                Please Select Date.
                              </Form.Control.Feedback>

                            </div>
                          </>
                        )}
                      </div>

                      {UserId && (
                        <>
                          <div className="col-md-6 form_input_main">
                            <Form.Label className="common-labels nextLabel">
                              {t("Completion Date")}
                              <span>&#42;</span>
                            </Form.Label>
                            <div className="innerSelectBox weekCounter datepicker-main">
                              <CommonDatePicker
                                setDate={setVehicle_Maintainance_details}
                                data={vehicle_Maintainance_details}
                                dateKey="maintainance_completion_date"
                                dataDisbal={getToday()}
                              // keyDisable={UserId ? true : false}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please Select Date.
                              </Form.Control.Feedback>

                            </div>
                          </div>
                          <div className="col-md-6 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <div className="d-flex justify-content-between  align-items-center flex-wrap">
                                <Form.Label className="common-labels nextLabel ">
                                  {t("Service Cost")} <span>&#42;</span>
                                </Form.Label>
                              </div>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Enter Service Cost"
                                value={
                                  vehicle_Maintainance_details.service_cost
                                }
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let valueInput = value.replace(
                                    /[^0-9]/gi,
                                    ""
                                  );
                                  setVehicle_Maintainance_details({
                                    ...vehicle_Maintainance_details,
                                    service_cost: valueInput,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please Enter Next Service Kilometers.
                              </Form.Control.Feedback>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="col-md-12 form_input_main">
                        <div className="vehicleHead mt-4">
                          <p className="">{t("Service Settings")}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 form_input_main">
                          <div className="innerSelectBox weekCounter">
                            <div className="d-flex justify-content-between  align-items-center flex-wrap">
                              <Form.Label className="common-labels">
                                {t("Send Service  Notification")} ?
                              </Form.Label>
                              <div id="customRadios">
                                <div class="form-check greenFlex me-2">
                                  <input
                                    disabled={UserId ? true : false}
                                    class="form-check-input"
                                    type="radio"
                                    name="notify_yes"
                                    checked={
                                      send_service_notification === "Yes"
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      setSend_service_notification("Yes");
                                      setVehicle_Maintainance_details({
                                        ...vehicle_Maintainance_details,
                                        send_service_notification:
                                          e.target.checked,
                                      });
                                    }}
                                  />
                                  <label
                                    class="form-check-label custLabel"
                                    for="notify_Yes"
                                  >
                                    {t("Yes")}
                                  </label>
                                </div>
                                <div class="form-check  greenFlex">
                                  <input
                                    disabled={UserId ? true : false}
                                    class="form-check-input"
                                    type="radio"
                                    name="notify_no"
                                    id="notify_no"
                                    checked={
                                      send_service_notification === "No"
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      setSend_service_notification("No");
                                      setVehicle_Maintainance_details({
                                        ...vehicle_Maintainance_details,
                                        send_service_notification: e.target
                                          .checked
                                          ? false
                                          : true,
                                      });
                                    }}
                                  />
                                  <label
                                    class="form-check-label custLabel"
                                    for="notify_no"
                                  >
                                    {t("No")}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {vehicle_Maintainance_details?.send_service_notification && (
                          <>
                            <div className="col-md-6 form_input_main">
                              <div className="innerSelectBox weekCounter">
                                <div className="d-flex justify-content-between  align-items-center flex-wrap">
                                  <Form.Label className="common-labels nextLabel ">
                                    {t("Notify Days Before Service")}{" "}
                                    <span>&#42;</span>
                                  </Form.Label>
                                </div>
                                <Form.Control
                                  required
                                  disabled={UserId ? true : false}
                                  type="text"
                                  placeholder="Enter Notify Days"
                                  value={
                                    vehicle_Maintainance_details.service_notification_duration
                                  }
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    let valueInput = value.replace(
                                      /[^0-9]/gi,
                                      ""
                                    );
                                    setVehicle_Maintainance_details({
                                      ...vehicle_Maintainance_details,
                                      service_notification_duration:
                                        valueInput,
                                    });
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please Enter Next Service Kilometers.
                                </Form.Control.Feedback>
                              </div>
                            </div>
                            <div className="col-md-6 form_input_main">
                              <div className="innerSelectBox weekCounter">
                                <div className="d-flex justify-content-between  align-items-center flex-wrap">
                                  <Form.Label className="common-labels nextLabel ">
                                    {t("Notifications In a Day")}{" "}
                                    <span>&#42;</span>
                                  </Form.Label>
                                </div>
                                <Form.Control
                                  required
                                  disabled={UserId ? true : false}
                                  type="text"
                                  placeholder="Enter Number Of Notifications"
                                  value={
                                    vehicle_Maintainance_details?.number_of_service_notification
                                  }
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    let valueInput = value.replace(
                                      /[^0-9]/gi,
                                      ""
                                    );
                                    setVehicle_Maintainance_details({
                                      ...vehicle_Maintainance_details,
                                      number_of_service_notification:
                                        valueInput,
                                    });
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please Enter Next Service Kilometers.
                                </Form.Control.Feedback>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="imagesRightSec">
                        <div className="row">
                          <div className="col-md-12 form_input_main"></div>

                          <div className="col-md-6 form_input_main">

                            {/* <div className="previewImg-s">
                              
                                {vehicle_Maintainance_details?.invoice?.length === 0 && <div style={{height:'280px', width: '100%' }}> </div>}

{Array.isArray(vehicle_Maintainance_details?.invoice) && vehicle_Maintainance_details?.invoice?.map((file, index) => (
    <div key={index} className="preview-container">
      <div className="delete-icon" onClick={() => handleDelete(index)}>
            <img src={Delete} alt="Delete"  style={{cursor:'pointer'}}/>
          </div>
      {file.type === 'application/pdf' ? (
        <iframe
          title={`PDF Preview ${index}`}
          src={URL.createObjectURL(file)}
          className={vehicle_Maintainance_details?.invoice?.length < 3 ? 'InvoiceImg-s ' : 'InvoiceImg-2-s ' }
        />
      ) : (
        <img
          src={typeof file === 'string' ? file : URL.createObjectURL(file)}
          className={vehicle_Maintainance_details?.invoice?.length < 3 ? 'InvoiceImg-s ' : 'InvoiceImg-2-s '}
          alt=""
          
        />
      )}
    </div>
  ))}
                              </div> */}

                            <div className="previewImg-s">
                              {/* <img
                                src={
                                  !vehicle_Maintainance_details.invoice
                                    ? Invoice
                                    : vehicle_Maintainance_details.invoice?.length
                                    ? vehicle_Maintainance_details.invoice
                                    : vehicle_Maintainance_details.invoice &&
                                      URL.createObjectURL(vehicle_Maintainance_details.invoice)
                                }
                                className="InvoiceImg"
                                alt=""
                              /> */}

                              {vehicle_Maintainance_details?.invoice?.length === 0 && <div style={{ height: '280px', width: '100%' }}> </div>}

                              {Array.isArray(vehicle_Maintainance_details?.invoice) && vehicle_Maintainance_details?.invoice?.map((file, index) => (
                                <div key={index} className="preview-container">
                                  <div className="delete-icon"
                                    onClick={() => {
                                      set_expense_file_id(file.expense_file_id);

                                      set_invoice_index(index);
                                      if (UserId) {
                                        setDeleteModal(true);
                                      } else { handleDelete(index); }

                                    }}>
                                    <img src={Delete} alt="Delete" style={{ cursor: 'pointer' }} />
                                  </div>
                                  {file.type === 'application/pdf' || isPDF(file.incidentOG) ? (<>

                                    {/* <iframe
                                      title={`PDF Preview ${index}`}
                                      // src={URL.createObjectURL(file)}
                                      src={UserId ? renderPDF(file.expense_file_path) : URL.createObjectURL(file)}
                                      className={vehicle_Maintainance_details?.invoice?.length < 3 ? 'InvoiceImg-s' : 'InvoiceImg-2-s'}
                                    /> */}
                                    <img
                                      src={pdfIcon}
                                      className={vehicle_Maintainance_details?.invoice?.length < 3 ? 'InvoiceImg-s' : 'InvoiceImg-2-s'}
                                      style={{ objectFit: "contain" }}
                                      alt=""
                                      onClick={(e) => handlePdfDownload(e, file.expense_file_path)}
                                    />
                                  </>

                                  ) : (
                                    <img
                                      // src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                                      src={UserId ? file.expense_file_path : URL.createObjectURL(file)}
                                      className={vehicle_Maintainance_details?.invoice?.length < 3 ? 'InvoiceImg-s' : 'InvoiceImg-2-s'}
                                      alt=""
                                    />
                                  )}
                                </div>
                              ))}

                              {Array.isArray(update_invoice_array?.invoice) && update_invoice_array?.invoice?.map((file, index) => (
                                <div key={index + vehicle_Maintainance_details?.invoice?.length} className="preview-container">
                                  <div className="delete-icon"
                                    onClick={() => {
                                      // setDeleteModal(true);
                                      // set_expense_file_id(file.expense_file_id);
                                      // set_expense_file_expense_id(file.expense_file_expense_id)
                                      // set_invoice_index(index);
                                      handleDeleteUpdate(index);


                                    }

                                    }>
                                    <img src={Delete} alt="Delete" style={{ cursor: 'pointer' }} />
                                  </div>
                                  {file.type === 'application/pdf' || isPDF(file) ? (
                                    <iframe
                                      title={`PDF Preview ${index}`}
                                      src={URL.createObjectURL(file)}
                                      // className={update_invoice_array?.invoice?.length < 3 ? 'InvoiceImg' : 'InvoiceImg-2'}
                                      className="InvoiceImg-2-s"
                                    />
                                  ) : (
                                    <img
                                      src={URL.createObjectURL(file)}
                                      // className={update_invoice_array?.invoice?.length < 3 ? 'InvoiceImg' : 'InvoiceImg-2'}
                                      alt=""
                                      className="InvoiceImg-2-s"
                                    />
                                  )}
                                </div>
                              ))}
                            </div>


                          </div>
                          <div className="col-md-6 form_input_main"></div>
                          <div className="col-md-6 form_input_main">
                            <div className="fileDropper">
                              <label htmlFor="file" className="imageHolder">
                                <input
                                  type="file"
                                  id="file"
                                  className="d-none"
                                />
                                <div className="innerFlex">

                                  <label
                                    htmlFor="invoice"
                                    className="browseBtn"
                                  >
                                    <input

                                      type="file"
                                      id="invoice"
                                      name="invoice"
                                      className="d-none"
                                      onChange={handleChange}
                                      multiple
                                      accept=".jpg,.jpeg,.png,.pdf"


                                    />

                                    <p className="mt-1">Browse File</p>
                                  </label>
                                </div>
                              </label>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center belowBtns">
                <button
                  type="button"
                  onClick={() => handleCancle()}
                  className="cx-btn-1">{t("Cancel")}</button>
                <button className="cx-btn-2" onClick={UserId && invoiceUpdate}>  {UserId ? "Update" : "Submit"}</button>
              </div>
            </div>
          </div>
        </Form>
      </motion.div>
      {/* Delete Modal Start */}
      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        centered
        className='common-model'
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('Delete Invoice')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('Are you sure you want to delete this invoice')} ?
        </Modal.Body>
        <Modal.Footer className='pop-up-modal-footer'>
          <div class='btn-wrapper'>
            <button className='cx-btn-1' onClick={() => setDeleteModal(false)}>
              {t('Cancel')}
            </button>
            <button className='cx-btn-2' onClick={() => {
              handleDelete(invoice_index);
              invoiceDelete();
            }
            }>
              Yes
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal End */}
    </>
  );
};

export default AddVehicleMaintenance;

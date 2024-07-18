import { React, useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import Form from "react-bootstrap/Form";
import Save from "../../../assets/images/save.svg";
import Inspect from "../../../assets/images/inspect.svg";
import Right from "../../../assets/images/right.svg";
import Invoice from "../../../assets/images/invoice.svg";
import DatePicker from "react-datepicker";
import Calendar from "../../../assets/images/calendar.svg";
import uploadIcon from "../../../assets/images/uploadIcon.svg";
import { motion } from "framer-motion";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import ApiConfig from "../../../api/ApiConfig";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import Select from "react-select";
import Delete from '../../../assets/images/delete.svg'
import { Modal,/*  OverlayTrigger, Tooltip */ } from 'react-bootstrap'

import {
  getWithAuthCall,
  multipartPostCall,
  putMultipartWithAuthCall, simpleDeleteCall,
  putWithAuthCall,
  simpleGetCallWithErrorResponse,
  simplePUTCall,
  simplePostCall,
} from "../../../api/ApiServices";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Loader from "../../../sharedComponent/Loader";
import { useTranslation } from "react-i18next";
import { sr } from "date-fns/locale";
import { classNames } from "primereact/utils";

import pdfIcon from '../../../assets/images/InspetionPDF/pdf-Icon-regular.svg'
// Types of files

const AddVehicleAccident = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false)
  const [expense_file_id, set_expense_file_id] = useState('')
  const [expense_file_expense_id, set_expense_file_expense_id] = useState('')
  const [invoice_index, set_invoice_index] = useState('')
  const [update_invoice_array, set_update_invoice_array] = useState({
    invoice: []
  })
  const [AddAccident, setAddAccident] = useState({
    vehicle_id: "",
    location: "",
    expenses: "",
    driver_id: "",
    route_id: "",
    description: "",
    invoice: [],
    date: "",
  });
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
  const handleCancle = () => {
    navigate("/VehicleAccident")
    setAddAccident({
      date: "",
    });
  };
  const [DeliverType, setDeliverType] = useState([]);
  const [submit_loading, set_submit_loading] = useState(false);
  const [driverState, setDriverState] = useState({
    isloading: true,
    drivers: [],
  });
  // Convert driverState.drivers to options format for react-select
  const driverOptions = driverState.drivers.map((driver) => ({
    value: driver.value,
    label: driver.label,
  }));
  // Find the selected driver option
  const selectedDriver = driverOptions.find(option => option.value === AddAccident.driver_id);


  const [vehicleState, setVehicleState] = useState({
    isloading: true,
    vehicles: [],
  });
  // Convert driverState.drivers to options format for react-select
  const vehicleOptions = vehicleState?.vehicles?.map((vehicle) => ({
    // value: vehicle.vehicle_id,
    value: vehicle.value,
    label: vehicle.label,
    // label: vehicle.vehicle_number,
  }));
  const selectedVehicle = vehicleOptions.find(option => option.value === AddAccident.vehicle_id);


  const [VehicalType, setVehicalType] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const { t, i18n } = useTranslation();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      HandalAccident(event);
    }
    setValidated(true);
  };
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const params = useParams();
  let UserId = params.id;

  useEffect(() => {
    if (UserId) {
      geAccidentDetails();
      // geDeliverAllList();
      geDeliverAllList_new();
      // geVehicalList();
      geVehicalList_new();
    } else {
      // geDeliverAllList();
      geDeliverAllList_new();
      // geVehicalList();
      geVehicalList_new();
    }
  }, []);
  useEffect(() => {
    set_expense_file_expense_id(expense_file_expense_id);

  }, [expense_file_expense_id])
  const geAccidentDetails = () => {
    setLoading(true);
    let newRequestBody = JSON.stringify({
      incident_id: UserId.toString(),
    });
    simplePostCall(ApiConfig.VEHICLE_PROFLIE, newRequestBody)
      .then((res) => {
        let user_profile = res?.data;
        set_expense_file_expense_id(user_profile?.invoices?.[0]?.expense_file_expense_id)
        setAddAccident({
          vehicle_id: user_profile.incident_vehicle_id,
          location: user_profile.incident_location,
          expenses: user_profile.incident_expense,
          driver_id: user_profile.incident_driver_id,
          // route_id: user_profile.route_id,
          description: user_profile.incident_description,
          invoice: user_profile.invoices,
          // date: moment(user_profile.incident_date).utc().format("YYYY-MM-DD"),
          date: moment(user_profile.incident_date).format("YYYY-MM-DD"),
        });
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const HandalAccident = (e) => {
    if (UserId) {
      UpdateAccident(e);
    } else {
      AddCreateAccident(e);
    }
  };

  const UpdateAccident = (e) => {
    e.preventDefault();

    let newRequestBody = JSON.stringify({
      incident_id: UserId,
      vehicle_id: AddAccident?.vehicle_id,
      // driver_id : AddAccident?.driver_id,
      // location : AddAccident?.location,
      // expenses : AddAccident?.expenses,
      // description: AddAccident?.description,


      // date: moment(AddAccident.date).utc().format("YYYY-MM-DD"),
      date: moment(AddAccident.date).format("YYYY-MM-DD"),
    });
    set_submit_loading(true)
    simplePUTCall(ApiConfig.VEHICLE_ACCIDENT_UPDATE, newRequestBody)
      .then((res) => {
        set_submit_loading(false)
        if (res.result) {
          notifySuccess(res.message);
          navigate("/VehicleAccident");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        set_submit_loading(false)
        console.log(err)
      });
  };

  const AddCreateAccident = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("vehicle_id", AddAccident.vehicle_id);
    formData.append("location", AddAccident.location);
    formData.append("expenses", AddAccident.expenses);
    formData.append("driver_id", AddAccident.driver_id);
    // formData.append("route_id", AddAccident.route_id);
    formData.append("description", AddAccident.description);
    // formData.append("invoice", AddAccident.invoice);
    const filesArray = AddAccident?.invoice.filter(Boolean);
    filesArray.forEach((photo) => {
      if (photo) {
        formData.append('invoice', photo)
      }
    })
    formData.append(
      "date",
      // moment(AddAccident.date).utc().format("YYYY-MM-DD")
      moment(AddAccident.date).format("YYYY-MM-DD")
    );

    set_submit_loading(true)
    multipartPostCall(ApiConfig.VEHICLE_ASSISTANTS_ADD, formData)
      .then((res) => {
        set_submit_loading(false)
        if (res.result) {
          notifySuccess(res.message);
          navigate("/VehicleAccident");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        set_submit_loading(false)
        console.log(err)
      });
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
        setAddAccident((prevState) => ({
          ...prevState,
          [e.target.name]: [...prevState[e.target.name], ...newFiles]
        }))
      }
      // setAddAccident({
      //   ...AddAccident,
      //   // [e.target.name]: e.target.files[0],
      //   [e.target.name]: [...e.target.files],
      // });
    } else setAddAccident({ ...AddAccident, [e.target.name]: e.target.value });
  };
  const handleDeleteUpdate = (indexToRemove) => {
    if (UserId) {
      set_update_invoice_array((prevState) => ({
        ...prevState,
        invoice: prevState?.invoice?.filter((_, index) => index !== indexToRemove),
      }))
    }
  }

  const handleDelete = (indexToRemove) => {


    setAddAccident((prevState) => ({
      ...prevState,
      invoice: prevState?.invoice?.filter((_, index) => index !== indexToRemove),
    }))
  }

  function geDeliverAllList() {
    getWithAuthCall(ApiConfig.VEHICLE_ACCIDENT_DRAIVER_LIST)
      .then((data) => {

        setDeliverType(data?.data);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  // start new deDeliverAllList fun made by me////////////////////////////// 
  function geDeliverAllList_new() {
    // getWithAuthCall(ApiConfig.VEHICLE_ACCIDENT_DRAIVER_LIST)
    getWithAuthCall(ApiConfig.DRIVER_AVALIVALITY_DROPDAWAN)
      /*   const body = {
          category : "active",
          page : ''
        }
        simplePostCall(ApiConfig.DRIVERS_LIST, JSON.stringify(body)) */
      .then((data) => {
        let Type = data?.data

        setDeliverType(data?.data);
        var drivers = [];

        // Type?.map((driver , index)=>{
        //   drivers?.push({
        //      value : driver.driver_id,
        //      label : driver.driver_name
        //   })

        // });
        Type?.map((driver, index) => {
          drivers?.push({
            value: driver.user_id,
            label: driver.user_name
          })

        });

        setDriverState({ ...driverState, drivers: drivers })


      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  // end new deDeliverAllList fun made by me////////////////////////////// 
  function geVehicalList() {
    getWithAuthCall(ApiConfig.VEHICLE_ACCIDENT_VEHICALE_LIST)
      .then((data) => {
        setVehicalType(data?.data);
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
        console.log('data--->', data)
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
  }

  function invoiceUpdate() {
    if (update_invoice_array?.invoice?.length > 0) {

      const formData = new FormData();
      formData.append("expense_file_expense_id", expense_file_expense_id ? expense_file_expense_id : UserId);
      formData.append("expense_file_expense_type", 'incident');

      const filesArray = update_invoice_array?.invoice.filter(Boolean);
      filesArray.forEach((photo) => {
        if (photo) {
          formData.append('invoice', photo)
        }
      })


      multipartPostCall(ApiConfig.VEHICLE_ACCIDENT_INVOICE_UPDATE, formData)
        .then(data => {
          // console.log('UPdatedata--->', data)
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
        {loading || submit_loading ? (
          <Loader />
        ) : (
          <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div id="cx-wrapper" className="AddVehicle_Accident">
                <div className="main-master-wrapper">
                  <div className="vehicleHead">
                    <p> {UserId ? "Update" : "New"} Vehicle Incident Details</p>
                  </div>
                  <div className="innerInputsGen mainVehAccident ">
                    <div className="addVehicleSe">
                      <div className="addVehicleLeftSec">
                        <div className="row">

                          {/*start of old vehicle name dd disabled by me//////////////////////////////////////////////////////////////  */}
                          {/*  <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="headinglabelVehi">
                                {t("Vehicle Name")} <span>&#42;</span>{" "}
                              </Form.Label>

                              <Form.Select
                                disabled={UserId ? true : false}
                                required
                                placeholder="Enter Your vehicle Name"
                                value={AddAccident.vehicle_id}
                                onChange={(e) => {
                                  setAddAccident({
                                    ...AddAccident,
                                    vehicle_id: e.target.value,
                                  });
                                }}
                              >
                                 <option value="">Please select vehicle Name</option>
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
                              Please select vehicle Name
                              </Form.Control.Feedback>
                            </div>
                           
                          </div> */}

                          {/*end of old vehicle name dd disabled by me//////////////////////////////////////////////////////////////  */}


                          {/* start new vehicle name dd made by me//////////////////////////////////////////////// */}
                          <div className="col-md-12 form_input_main">
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
                                isDisabled={UserId ? true : false}
                                required
                                placeholder="Enter Vehicle Name"
                                value={selectedVehicle}
                                options={vehicleState?.vehicles}
                                onChange={(selectedOption) => {
                                  setAddAccident({
                                    ...AddAccident,
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




                          <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {" "}
                                {t("Location")} <span>&#42;</span>{" "}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                disabled={UserId ? true : false}
                                placeholder="Enter Your Location"
                                value={AddAccident.location}
                                onChange={(e) => {
                                  setAddAccident({
                                    ...AddAccident,
                                    location: e.target.value,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please Enter Your Location.
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {" "}
                                {t("Total Expense")} <span>&#42;</span>{" "}
                              </Form.Label>
                              <Form.Control
                                disabled={UserId ? true : false}
                                required
                                type="text"
                                placeholder="Enter Your Amount"
                                value={AddAccident.expenses}
                                onChange={(e) => {
                                  const inputValue = e.target.value.replace(/[^0-9]/g, '');
                                  setAddAccident({
                                    ...AddAccident,
                                    expenses: inputValue,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please Enter Your Amount.
                              </Form.Control.Feedback>
                            </div>
                          </div>

                          {/* start old Driver DD disabled by me////////////////////////////////////////////// */}
                          {/*    <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("Driver")} <span>&#42;</span>{" "}
                              </Form.Label>

                              <Form.Select
                              
                                disabled={UserId ? true : false}
                                required
                                placeholder="Enter Driver Name"
                                value={AddAccident.driver_id}
                                onChange={(e) => {
                                  setAddAccident({
                                    ...AddAccident,
                                    driver_id: e.target.value,
                                  });
                                }}
                              >
                                <option value=""> Please Select Driver Name</option>
                                {DeliverType &&
                                  DeliverType?.length &&
                                  DeliverType.map((Typelist, index) => {
                                    return (
                                      <>
                                        
                                        <option
                                          key={"delivery" + index}
                                          value={Typelist.driver_id}
                                        >
                                          {Typelist.driver_name}
                                        </option>
                                      </>
                                    );
                                  })}
                              </Form.Select>
                             
                              <Form.Control.Feedback type="invalid">
                                Please Select Driver Name.
                              </Form.Control.Feedback>
                            </div>
                          </div> */}
                          {/* end old Driver DD disabled by me////////////////////////////////////////////// */}
                          {/* start new dd added by me/////////////////////////////////////////////////////////////////////////////////////// */}

                          <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("Driver")} <span>&#42;</span>{" "}
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
                                isDisabled={UserId ? true : false}
                                required
                                placeholder="Enter Driver Name"
                                value={selectedDriver}
                                options={driverState.drivers}
                                onChange={(selectedOption) => {
                                  setAddAccident({
                                    ...AddAccident,
                                    driver_id: selectedOption ? selectedOption.value : '',
                                  });
                                }}

                              >

                              </Select>

                              <Form.Control.Feedback type="invalid">
                                Please Select Driver Name.
                              </Form.Control.Feedback>
                            </div>
                          </div>

                          {/* end new dd added by me/////////////////////////////////////////////////////////////////////////////////////// */}
                          <div className="col-md-12 form_input_main">
                            <Form.Label className="common-labels">
                              {" "}
                              {t("Date")} <span>&#42;</span>
                            </Form.Label>
                            <div className="innerSelectBox weekCounter datepicker-main">


                              <CommonDatePicker
                                setDate={setAddAccident}
                                data={AddAccident}
                                dateKey="date"
                              />

                              {/* <input
                        class="datepicker-here form-control digits"
                        type="date"
                        data-language="en"
                        placeholder="MM-DD-YYYY"
                        data-position="top left"
                        name="submission_date"
                        // min={moment().format("YYYY-MM-DD")}
                        value={AddAccident.date}
                        // onChange={(date) => setStartDate(date)}
                        onChange={(e) =>
                          setAddAccident({
                            ...AddAccident,
                            date: e.target.value,
                          })
                        }
/> */}

                              <Form.Control.Feedback type="invalid">
                                Please Select Date.
                              </Form.Control.Feedback>
                              {/* <img
                            src={Calendar}
                            className="addVehCalender"
                            alt=""
                          /> */}
                            </div>
                          </div>


                          <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {" "}
                                {t("Description")} {/* <span>&#42;</span> */}{" "}
                              </Form.Label>
                              <Form.Control
                                disabled={UserId ? true : false}
                                as="textarea"
                                rows={3}
                                required={false}
                                type="text"
                                placeholder="Type Description"
                                value={AddAccident.description}
                                onChange={(e) => {
                                  setAddAccident({
                                    ...AddAccident,
                                    description: e.target.value,
                                  });
                                }}
                              />
                              {/* <Form.Control.Feedback type="invalid">
                                Please Type Description.
                              </Form.Control.Feedback> */}
                            </div>
                          </div>

                        </div>
                      </div>
                      {/* This section is for image addidtion in an array on every selection */}
                      <div className="imagesRightSec">
                        <div className="row">
                          <div className="col-md-12 form_input_main">
                            {/* <div className="innerSelectBox weekCounter">
                          <label className="common-labels">Invoice</label>
                          
                          <div className="savedInvoice">
                            <label>Example Document-Invoice.pdf</label>
                          </div>
                          <img src={Save} className="save" alt="" />
      
                          <img src={Inspect} className="Inspect" alt="" />
                          <img src={Right} className="right" alt="" />
                          <label className="invalidText">
                            {t("Failed to upload")}
                          </label>
                          <label className="retry">Retry</label>
                        </div> */}
                          </div>
                          <div className="col-md-12 form_input_main mb-4">
                            {/* <div className="innerSelectBox weekCounter form_input_main">
                          <label className="common-labels">Invoice 2</label>
                      
                          <div className="savedInvoice">
                            <label>Example Document-Invoice.pdf</label>
                          </div>
                          <img src={Save} className="save" alt="" />
           
                          <img src={Inspect} className="Inspect" alt="" />
                          <img src={Right} className="right" alt="" />
                          <label className="invalidText">
                            {t("Failed to upload")}
                          </label>
                          <label className="retry">{t("Retry")}</label>
                        </div>
                        {/* Selected image preview here */}
                            <div className="previewImg">
                              {/* <img
                                src={
                                  !AddAccident.invoice
                                    ? Invoice
                                    : AddAccident.invoice?.length
                                      ? AddAccident.invoice
                                 : AddAccident.invoice &&
                                      URL.createObjectURL(AddAccident.invoice[0])
                                }
                                className="InvoiceImg"
                                alt=""
                              /> */}

                              {AddAccident?.invoice?.length === 0 && <div style={{ height: '280px', width: '100%' }}> </div>}

                              {Array.isArray(AddAccident?.invoice) && AddAccident?.invoice?.map((file, index) => (
                                <div key={index} className="preview-container">
                                  <div className="delete-icon"
                                    onClick={() => {
                                      set_expense_file_id(file.expense_file_id);

                                      set_invoice_index(index);
                                      if (UserId) {
                                        setDeleteModal(true);
                                      } else {
                                        // handleDelete(invoice_index);
                                        handleDelete(index)
                                      }
                                    }

                                    }>
                                    <img src={Delete} alt="Delete" style={{ cursor: 'pointer' }} />
                                  </div>
                                  {file.type === 'application/pdf' || isPDF(file.incidentOG) ? (
                                    <>
                                      {/* <iframe
                                      title={`PDF Preview ${index}`}
                                      src={UserId ? renderPDF(file.expense_file_path) : URL.createObjectURL(file)}
                                      className={AddAccident?.invoice?.length < 3 ? 'InvoiceImg' : 'InvoiceImg-2'}
                                    /> */}

                                      <img
                                        src={pdfIcon}
                                        className={AddAccident?.invoice?.length < 3 ? 'InvoiceImg' : 'InvoiceImg-2'}
                                        style={{ objectFit: "contain" }}
                                        alt=""
                                        onClick={(e) => handlePdfDownload(e, file.expense_file_path)}
                                      />

                                    </>

                                  ) : (
                                    <img
                                      // src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                                      src={UserId ? file.expense_file_path : URL.createObjectURL(file)}
                                      className={AddAccident?.invoice?.length < 3 ? 'InvoiceImg' : 'InvoiceImg-2'}
                                      alt=""
                                    />
                                  )}
                                </div>
                              ))}

                              {Array.isArray(update_invoice_array?.invoice) && update_invoice_array?.invoice?.map((file, index) => (
                                <div key={index + AddAccident?.invoice?.length} className="preview-container">
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
                                      className="InvoiceImg-2"
                                    />
                                  ) : (
                                    <img
                                      src={URL.createObjectURL(file)}
                                      // className={update_invoice_array?.invoice?.length < 3 ? 'InvoiceImg' : 'InvoiceImg-2'}
                                      alt=""
                                      className="InvoiceImg-2"
                                    />
                                  )}
                                </div>
                              ))}



                            </div>
                          </div>
                          {
                            // !UserId&&
                            <div className="col-md-12 form_input_main">
                              <div className="fileDropper">
                                <label htmlFor="" className="imageHolder">
                                  {/* <input
                                  type="file"
                                  id="file"
                                  className="d-none"
                                /> */}
                                  <div className="innerFlex">
                                    {/* <img
                                    src={uploadIcon}
                                    className="browseImg"
                                    alt=""
                                  />
                                  <p className="innerTxt">
                                    Drag & Drop Your File
                                  </p> */}
                                    {/* <p className="innerTxt">Or</p> */}
                                    <label
                                      htmlFor="invoice"
                                      className="browseBtn"
                                    >
                                      <input
                                        // disabled={UserId ? true : false}
                                        type="file"
                                        id="invoice"
                                        name="invoice"
                                        className="d-none"
                                        onChange={handleChange}
                                        multiple
                                        accept=".jpg,.jpeg,.png,.pdf"

                                      />
                                      <p className="mt-1">Choose File</p>
                                    </label>
                                    {console.log("invoice--->", AddAccident?.invoice)}
                                  </div>
                                </label>
                              </div>
                            </div>}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Two Bottom Buttons */}
                  <div className="d-flex justify-content-end align-items-center belowBtns">
                    <button className="cx-btn-1"
                      type="button"

                      onClick={() => handleCancle()}>

                      Cancel</button>
                    <button className="cx-btn-2" onClick={UserId && invoiceUpdate}>
                      {UserId ? "Update" : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </>
        )}
      </motion.div >
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
            }}>
              Yes
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal End */}
    </>
  );
};

export default AddVehicleAccident;

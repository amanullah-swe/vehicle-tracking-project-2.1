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
import ApiConfig from "../../../api/ApiConfig";
import Delete from '../../../assets/images/delete.svg'
import { Modal,/*  OverlayTrigger, Tooltip */ } from 'react-bootstrap'
import {
  getWithAuthCall,
  multipartPostCall,
  simpleGetCall,
  simplePUTCall, simplePostCall
} from "../../../api/ApiServices";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import Loader from "../../../sharedComponent/Loader";
import Select from "react-select";
import pdfIcon from '../../../assets/images/InspetionPDF/pdf-Icon-regular.svg'
import { useTranslation } from "react-i18next";
// Types of files

const AddVehicleFine = () => {

  const { sidebar, setSidebar, Dark, setDark, loading, setLoading } =
    useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const params = useParams();
  let UserId = params.id;
  const { t, i18n } = useTranslation();
  const [deleteModal, setDeleteModal] = useState(false)
  const [expense_file_id, set_expense_file_id] = useState('')
  const [invoice_index, set_invoice_index] = useState('')
  const [submit_loading, set_submit_loading] = useState(false);
  const [expense_file_expense_id, set_expense_file_expense_id] = useState('')

  const [update_invoice_array, set_update_invoice_array] = useState({
    fine_invoice_no: []
  })
  const status_options = [
    { value: 'Paid', label: 'Paid' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Inprogress', label: 'Inprogress' },
  ]

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

  const handleCancle = () => {
    navigate("/VehicleFine")
    setAddAccessry({

      fine_date: "",

    });
  };
  const [AddAccessry, setAddAccessry] = useState({
    fine_reason: "",
    fine_date: "",
    fine_status: "",
    fine_vehicle_id: "",
    fine_amount: "",
    fine_invoice_no: [],
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
  const selectedVehicle = vehicleOptions.find(option => option.value === AddAccessry.fine_vehicle_id);

  const selectedStatus = status_options.find(option => option.value === AddAccessry?.fine_status);

  const navigate = useNavigate();
  const [VehicalType, setVehicalType] = useState([]);
  useEffect(() => {
    if (UserId) {
      geAccessoryDetails();
      geVehicalList_new();
      // geVehicalList();
    } else {
      geVehicalList_new();
      // geVehicalList();
    }
  }, []);
  const geAccessoryDetails = () => {
    setLoading(true);
    simpleGetCall(ApiConfig.VEHICLE_FINE_PROFILE + UserId)
      .then((res) => {
        let user_profile = res?.data;
        set_expense_file_expense_id(user_profile?.invoices?.[0]?.expense_file_expense_id)
        console.log('user_profile?.invoices?.[0]?.expense_file_expense_id-->', user_profile?.invoices?.[0]?.expense_file_expense_id);
        setAddAccessry({
          fine_reason: user_profile.fine_reason,
          fine_status: user_profile.fine_status,
          fine_vehicle_id: user_profile.fine_vehicle_id,
          fine_amount: user_profile.fine_amount,
          fine_date: moment(user_profile.fine_date).format("YYYY-MM-DD"),
          fine_invoice_no: user_profile.invoices,
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
      UpdateAccessory(e);
    } else {
      AddCreateAccessory(e);
    }
  };

  const AddCreateAccessory = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("fine_reason", AddAccessry.fine_reason);
    formData.append("fine_status", AddAccessry.fine_status);
    formData.append("fine_vehicle_id", AddAccessry.fine_vehicle_id);
    formData.append("fine_amount", AddAccessry.fine_amount);
    formData.append(
      "fine_date",
      moment(AddAccessry.fine_date).format("YYYY-MM-DD")
    );
    // formData.append("fine_invoice_no", AddAccessry.fine_invoice_no);
    const filesArray = AddAccessry?.fine_invoice_no.filter(Boolean);
    filesArray.forEach((photo) => {
      if (photo) {
        formData.append('fine_invoice_no', photo)
      }
    })
    set_submit_loading(true)
    multipartPostCall(ApiConfig.VEHICLE_FINE_ADD, formData)
      .then((res) => {
        set_submit_loading(false)
        if (res.result) {
          notifySuccess(res.message);
          navigate("/VehicleFine");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        set_submit_loading(false)
        console.log(err)
      });
  };

  const UpdateAccessory = (e) => {
    e.preventDefault();

    let newRequestBody = JSON.stringify({
      fine_id: UserId,
      fine_date: moment(AddAccessry.fine_date).format("YYYY-MM-DD"),
    });
    set_submit_loading(true)
    simplePUTCall(ApiConfig.VEHICLE_FINE_UPDATE, newRequestBody)
      .then((res) => {
        set_submit_loading(false)
        if (res.result) {
          notifySuccess(res.message);
          navigate("/VehicleFine");
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => {
        set_submit_loading(false)
        console.log(err)
      });
  };
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
  const handleChange = (e) => {
    if (e.target.name === "fine_invoice_no") {
      if (UserId) {
        const newFiles = Array.from(e.target.files);
        set_update_invoice_array((prevState) => ({
          ...prevState,
          [e.target.name]: [...prevState[e.target.name], ...newFiles]
        }))
      } else {
        const newFiles = Array.from(e.target.files);
        setAddAccessry((prevState) => ({
          ...prevState,
          [e.target.name]: [...prevState[e.target.name], ...newFiles]
        }))
      }
      // setAddAccessry({
      //   ...AddAccessry,
      //   // [e.target.name]: e.target.files[0],
      //   [e.target.name]: [...e.target.files],
      // });
    } else setAddAccessry({ ...AddAccessry, [e.target.name]: e.target.value });
  };

  const handleDeleteUpdate = (indexToRemove) => {
    if (UserId) {
      set_update_invoice_array((prevState) => ({
        ...prevState,
        fine_invoice_no: prevState?.fine_invoice_no?.filter((_, index) => index !== indexToRemove),
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
  const handleDelete = (indexToRemove) => {
    setAddAccessry((prevState) => ({
      ...prevState,
      fine_invoice_no: prevState?.fine_invoice_no?.filter((_, index) => index !== indexToRemove),
    }))
  }

  function invoiceUpdate() {
    if (update_invoice_array?.fine_invoice_no?.length > 0) {
      const formData = new FormData();
      formData.append("expense_file_expense_id", expense_file_expense_id ? expense_file_expense_id : UserId);
      formData.append("expense_file_expense_type", 'fine');

      const filesArray = update_invoice_array?.fine_invoice_no.filter(Boolean);
      filesArray.forEach((photo) => {
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
  useEffect(() => {
    set_expense_file_expense_id(expense_file_expense_id);

  }, [expense_file_expense_id])



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
        {loading || submit_loading ? (
          <Loader />
        ) : (
          <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div id="cx-wrapper" className="AddVehicle_Fine">
                <div className="main-master-wrapper">
                  <div className="vehicleHead">
                    <p>{UserId ? "Update" : "New"} Vehicle Fine Details</p>
                  </div>
                  <div className="innerInputsGen mainVehAccident ">
                    <div className="addVehicleSe">
                      <div className="addVehicleLeftSec">
                        <div className="row">
                          {/*start of old vehicle name dd disabled by me//////////////////////////////////////////////////////////////  */}

                          {/*   <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {" "}
                                {t("Vehicle Name")} <span>&#42;</span>{" "}
                              </Form.Label>
                              <Form.Select
                                disabled={UserId ? true : false}
                                required
                                placeholder="Enter Your vehicle Name"
                                value={AddAccessry.fine_vehicle_id}
                                onChange={(e) => {
                                  setAddAccessry({
                                    ...AddAccessry,
                                    fine_vehicle_id: e.target.value,
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
                                Please Enter vehicle Name.
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
                                placeholder="Select Vehicle Name"
                                value={selectedVehicle}
                                options={vehicleState?.vehicles}
                                onChange={(selectedOption) => {
                                  setAddAccessry({
                                    ...AddAccessry,
                                    fine_vehicle_id: selectedOption ? selectedOption.value : '',
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
                                {t("Reason")} <span>&#42;</span>{" "}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Type Your Reason"
                                isDisabled={UserId ? true : false}
                                value={AddAccessry.fine_reason}
                                onChange={(e) => {
                                  setAddAccessry({
                                    ...AddAccessry,
                                    fine_reason: e.target.value,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please Type Your Reason.
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {" "}
                                {t("Status")} <span>&#42;</span>{" "}
                              </Form.Label>
                              {/* <Form.Control
                                required
                                type="text"
                                placeholder="Enter Status"
                                disabled={UserId ? true : false}
                                value={AddAccessry.fine_status}
                                onChange={(e) => {
                                  setAddAccessry({
                                    ...AddAccessry,
                                    fine_status: e.target.value,
                                  });
                                }}
                              /> */}
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
                                placeholder="Select Status"
                                value={selectedStatus}
                                options={status_options}
                                onChange={(selectedOption) => {
                                  setAddAccessry({
                                    ...AddAccessry,
                                    fine_status: selectedOption ? selectedOption.value : '',
                                  });
                                }}


                              >

                              </Select>
                              {console.log('fine_status-->', AddAccessry?.fine_status)}
                              <Form.Control.Feedback type="invalid">
                                Please Enter Status.
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="col-md-12 form_input_main">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {" "}
                                {t("Amount")} <span>&#42;</span>{" "}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Enter Amount"
                                disabled={UserId ? true : false}
                                value={AddAccessry.fine_amount}
                                onChange={(e) => {
                                  const inputValue = e.target.value.replace(/[^0-9]/g, '');
                                  setAddAccessry({
                                    ...AddAccessry,
                                    fine_amount: inputValue,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please Enter Amount
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="col-md-12 form_input_main">
                            <Form.Label className="common-labels">
                              {" "}
                              {t("Date")} <span>&#42;</span>
                            </Form.Label>
                            <div className="innerSelectBox weekCounter datepicker-main">

                              <CommonDatePicker
                                setDate={setAddAccessry}
                                data={AddAccessry}
                                dateKey="fine_date"
                              />

                              {/* <input
                        class="datepicker-here form-control digits"
                        type="date"
                        data-language="en"
                        placeholder="MM-DD-YYYY"
                        data-position="top left"
                        name="submission_date"
                        // min={moment().format("YYYY-MM-DD")}
                        value={AddAccessry.fine_date}
                        // onChange={(date) => setStartDate(date)}
                        onChange={(e) =>
                          setAddAccessry({
                            ...AddAccessry,
                            fine_date: e.target.value,
                          })
                        }
/> */}
                              <Form.Control.Feedback type="invalid">
                                Please Select Date.
                              </Form.Control.Feedback>

                            </div>
                          </div>
                        </div>
                      </div>
                      {/* This section is for image addidtion in an array on every selection */}
                      <div className="imagesRightSec">
                        <div className="row">
                          <div className="col-md-12 form_input_main"></div>
                          <div className="col-md-12 form_input_main">
                            {/* Selected image preview here */}
                            <div className="previewImg">
                              {/* <img
                                src={
                                  !AddAccessry.fine_invoice_no
                                    ? Invoice
                                    : AddAccessry.fine_invoice_no?.length
                                    ? AddAccessry.fine_invoice_no
                                    : AddAccessry.fine_invoice_no &&
                                      URL.createObjectURL(
                                        AddAccessry.fine_invoice_no
                                      )
                                }
                                className="InvoiceImg"
                                alt=""
                              /> */}

                              {AddAccessry?.fine_invoice_no?.length === 0 && <div style={{ height: '280px', width: '100%' }}> </div>}

                              {Array.isArray(AddAccessry?.fine_invoice_no) && AddAccessry?.fine_invoice_no?.map((file, index) => (
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
                                  {file.type === 'application/pdf' || isPDF(file.incidentOG) ? (
                                    <>

                                      <img
                                        src={pdfIcon}
                                        className={AddAccessry?.invoice?.length < 3 ? 'InvoiceImg' : 'InvoiceImg-2'}
                                        style={{ objectFit: "contain" }}
                                        alt=""
                                        onClick={(e) => handlePdfDownload(e, file.expense_file_path)}
                                      />

                                      {/* <iframe
                                        title={`PDF Preview ${index}`}
                                        // src={URL.createObjectURL(file)}
                                        src={UserId ? renderPDF(file.expense_file_path) : URL.createObjectURL(file)}
                                        className={AddAccessry?.fine_invoice_no?.length < 3 ? 'InvoiceImg' : 'InvoiceImg-2'}
                                      /> */}
                                    </>
                                  ) : (
                                    <img
                                      // src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                                      src={UserId ? file.expense_file_path : URL.createObjectURL(file)}
                                      className={AddAccessry?.fine_invoice_no?.length < 3 ? 'InvoiceImg' : 'InvoiceImg-2'}
                                      alt=""
                                    />
                                  )}
                                </div>
                              ))}

                              {Array.isArray(update_invoice_array?.fine_invoice_no) && update_invoice_array?.fine_invoice_no?.map((file, index) => (
                                <div key={index + AddAccessry?.fine_invoice_no?.length} className="preview-container">
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
                                      // className={update_invoice_array?.fine_invoice_no?.length < 3 ? 'InvoiceImg' : 'InvoiceImg-2'}
                                      className="InvoiceImg-2"
                                    />
                                  ) : (
                                    <img
                                      src={URL.createObjectURL(file)}
                                      // className={update_invoice_array?.fine_invoice_no?.length < 3 ? 'InvoiceImg' : 'InvoiceImg-2'}
                                      alt=""
                                      className="InvoiceImg-2"
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-md-12 form_input_main">
                            <div className="fileDropper">
                              <label htmlFor="file" className="imageHolder">
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
                                  </p>
                                  <p className="innerTxt">Or</p> */}
                                  <label
                                    htmlFor="fine_invoice_no"
                                    className="browseBtn"
                                  >
                                    <input
                                      // disabled={UserId ? true : false}
                                      type="file"
                                      id="fine_invoice_no"
                                      name="fine_invoice_no"
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
                  {/* Two Bottom Buttons */}
                  <div className="d-flex justify-content-end align-items-center belowBtns">
                    <button className="cx-btn-1"
                      type="button"

                      onClick={() => handleCancle()}

                    >Cancel</button>
                    <button type="submit" className="cx-btn-2" onClick={UserId && invoiceUpdate}>
                      {UserId ? "Update" : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </>
        )}
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

export default AddVehicleFine;

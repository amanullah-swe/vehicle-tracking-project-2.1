import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { motion } from "framer-motion";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import { Space, TimePicker } from "antd";
import dayjs from "dayjs";
import CommonSelect from "../../../sharedComponent/ReactSelect";
import ApiConfig from "../../../api/ApiConfig";
import { simplePostCall } from "../../../api/ApiServices";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import { useNavigate } from "react-router-dom";
import Calendar from "../../../assets/images/calendar.svg";
import { latestDate, countriesWithShortCode } from "../../../sharedComponent/common";
import MobilePhoneInput from "../../../sharedComponent/MobilePhoneInput";
const VehicleBooking2 = () => {

  const [error_message , set_error_message] = useState({});
    const [AddDrivers, setAddDrivers] = useState({
        userMobile: "",
        userNationality: "",
        user_country_code: "91",
       });

  const { t, i18n } = useTranslation();
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [deleveryDetails, setDeleveryDetails] = useState({
    vehicle_booking_request_date:"",
    time: dayjs(new Date()).format('HH:mm:ss'),
    vehicle_type_id : '',
    pickup_location:'',
  });

  const [vehicleDropDown, setVehicleDropDown] = useState([]);
  const [merchentDropDown, setMerchentDropDown] = useState([]);
  const [customerDropDown, setCustomerDropDown] = useState([]);
  const [wareHouses, setwareHouses] = useState([]);
  const [warehouseAddress, setWarehouseAddress] = useState();
  const [deleveryAddress, setDeleveryAddress] = useState();
  const [addressDropdopdown, setAddressDropdopdown] = useState([]);
  const [setselectedVehicleTypeId, setSetselectedVehicleTypeId] = useState({});
  const [numberOfVehicles, setNumberOfVehicles] = useState(1);


  const mobileOnChangeHandler = (phone, country) => {
    setAddDrivers({
      ...AddDrivers,
      userMobile: phone?.replace(country.dialCode, ""),
      user_country_code: country?.dialCode,
      userNationality:
        countriesWithShortCode[country.countryCode?.toUpperCase()],
    });
  };

  const getAllDropDowns = () => {
    Promise?.all([
      simplePostCall(ApiConfig.MERCHENT_DROPDOWN),
      simplePostCall(ApiConfig.CUSTOMER_DROPDOWN),
      simplePostCall(ApiConfig.VEHICLE_TYPE_DROPDOWN),
    ]).then((res) => {
      if (res?.length>2) {
          res?.map((dropdown, index) => {

          if (dropdown?.result) {
            if (index == 0) setMerchentDropDown(dropdown.data);
            else if (index == 1) {
              setCustomerDropDown(dropdown?.data);
            } else if (index == 2) {
              
              setVehicleDropDown(dropdown?.data);
              // let vehicles = dropdown.data;
              // var grades = [];
              // vehicles.map((grade, index) => {
              //   grades.push({
              //     label: grade.vehicle_type_code,
              //     value: grade.vehicle_type_id,
              //   });
              // });
              // setGradeState({ ...gradeState, grades: grades });
            }
          }
        });
      }else{
        notifyError(res?.message)
      }
    });
  };

  useEffect(() => {
    getAllDropDowns();
  }, []);

  useEffect(() => {
    if (deleveryDetails && deleveryDetails.vendor_id) {
      let merchent = merchentDropDown.filter(
        (single) => single.vendor_id == deleveryDetails.vendor_id
      );
      if (merchent && merchent.length) {
        setwareHouses(
          merchent[0].warehouse != null ? merchent[0].warehouse : []
        );
      }
    }
  }, [deleveryDetails, merchentDropDown]);

  useEffect(() => {
    if (deleveryDetails.vendor_warehouse_id) {
      let seleWarehouse = wareHouses.filter(
        (single) =>
          single.vendor_warehouse_id === deleveryDetails.vendor_warehouse_id
      );
 
      seleWarehouse !== null &&
        setWarehouseAddress(seleWarehouse[0].vendor_warehouse_address);
    }
  }, [deleveryDetails, wareHouses]);

  useEffect(() => {
    if (deleveryDetails.customer_id) {
      let sele = customerDropDown.filter(
        (single) => single.dispatch_customer_id === deleveryDetails.customer_id
      );
      sele !== null && setAddressDropdopdown(sele[0].dispatch_customer_address);
    }
  }, [deleveryDetails, customerDropDown]);

  useEffect(() => {
    if (deleveryDetails.customer_address_id) {

      let sele =
        addressDropdopdown &&
        addressDropdopdown.filter(
          (single) =>
            single.dispatch_customer_address_id ===
            deleveryDetails.customer_address_id
        );

      sele !== null &&
        sele.length &&
        setDeleveryAddress(sele[0].dispatch_customer_address_address);
    }
  }, [deleveryDetails, addressDropdopdown]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
if(deleveryDetails?.vehicle_type_id?.length === 0 ){
  set_error_message({
    ...error_message,
    vehicle_type_id : 'Please select a vehicle.'
  })
}

if(deleveryDetails?.pickup_location?.length === 0 ){
  set_error_message({
    ...error_message,
    pickup_location : 'Please select pickup location.'
  })
  return;
} 


    
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setLoading(true);
      let body = JSON.stringify({
        ...deleveryDetails,
        vehicle_booking_request_date:latestDate(deleveryDetails?.vehicle_booking_request_date, "yyyy-MM-dd"),
        vehicle_booking_request_time: deleveryDetails?.time,
        number_of_vehicles: numberOfVehicles,
        vehicle_type_id: setselectedVehicleTypeId?.vehicle_type_id,
       
      });
      simplePostCall(ApiConfig?.ADD_VEHICLE_BOOKING, body)
        .then((res) => {
          if (res.result) {
            notifySuccess(res.message);
            navigate("/VehicleBookingList");
          } else {
            notifyError(res.message);
          }
        })
        .catch((errr) => {
          console.log("errr", errr);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    setValidated(true);
  };

  const handleResetClick = (e, val) => {
    setDeleveryDetails({});
    setNumberOfVehicles("")
    setDeleveryAddress("");
    setWarehouseAddress("");
    navigate("/VehicleBookingList")
  };
  var date = new Date();


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
        <div id="cx-wrapper" className="vehicle_Booking">
          <div className="main-master-wrapper">
            {/* Header section */}
            <div className="header">
              <label className="headerTxt">Add Vehicle Booking</label>
            </div>
            {/* COntent section */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="row vehicleMainRow">
              <div className="detailsSec">
                {/* <div className="headerDet">
                  <label className="headerTxtDet">Booking Details</label> */}
                  {/* <div className="defult_check_address">
                    <div
                      className="form-check form-switch custom_address"
                      id="custom_switch_address"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="defult_Pick"
                        defaultChecked
                      />
                      <label className="defult-adrs-txt" htmlFor="defult_Pick">
                        Use Default Address
                      </label>
                    </div>
                  </div> */}
                {/* </div> */}
                <div className="row">
                  <div className="col-md-6 col-sm-12 colFormDet">
                    <Form.Label className="common-labels">Pickup Location</Form.Label>
                    <CommonSelect
                      setID={true}
                      setterKey={"pickup_location"}
                      setErrMsg={set_error_message}
                         errMsg={error_message}
                         componentId={true}
                        //  errKey={"dispatch"}
                         errKey={"pickup_location"}
                      setterFucntions={setDeleveryDetails}
                      selectedValue={deleveryDetails?.pickup_location}
                      selValue={deleveryDetails?.pickup_location}
                      data={deleveryDetails}
                      placehold={t('Select')}
                      optionList={merchentDropDown.map((merchent) => ({
                        id: merchent.vendor_id,
                        value : merchent.vendor_id,
                        label: merchent.vendor_name,
                      }))}
                    />
                    {error_message?.pickup_location?.length > 0 && !deleveryDetails?.pickup_location  && 
                       <span className="text-danger mt-1" style={{fontSize:'.875em'}} >{error_message?.pickup_location}</span>}

                    <Form.Control.Feedback>
                      Please Enter Pickup Location...
                    </Form.Control.Feedback>
                  </div>

                  <div className="col-md-6 col-sm-12 colFormDet">
                    <Form.Label className="common-labels">Drop Location</Form.Label>
                    <CommonSelect
                      setID={true}
                      setterKey={"vendor_id"}
                      setterFucntions={setDeleveryDetails}
                      data={deleveryDetails}
                      optionList={merchentDropDown.map((merchent) => ({
                        id: merchent.vendor_id,
                        label: merchent.vendor_name,
                      }))}
                    />
                    <Form.Control.Feedback>
                      Please Enter Drop Location...
                    </Form.Control.Feedback>
                  </div>

                  <div className="col-md-3 col-sm-12 colFormDet ">
                    <Form.Label className="common-labels">Pickup Date</Form.Label>
                  
                    {/* <div className="d-flex justify-content-between"> */}
                    <div className="col-md-6- innerSelectBox weekCounter datepicker-main">
                    
                    <CommonDatePicker 
                      dateKey="vehicle_booking_request_date"
                      setDate={setDeleveryDetails}
                      data={deleveryDetails}
                      minDate={date}

                    />
                    {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                  </div>
                 
                  </div>

                  <div className="col-md-3 col-sm-12 colFormDet ">
                    <Form.Label className="common-labels">Pickup Time</Form.Label>
                
                    <Space>
                      <TimePicker
                        className="form-control carretClass"
                        size="large"
                        allowClear={false}
                        inputReadOnly
                        value={
                          deleveryDetails.time
                            ? dayjs(deleveryDetails.time, "HH:mm:ss")
                            :  dayjs(new Date()).format('HH:mm:ss')
                        }
                        onChange={(e) => {
                          if (e) {
                            let time =
                              e.hour() + ":" + e.minute() + ":" + e.second();
                            setDeleveryDetails({ ...deleveryDetails, time });
                          }
                        }}
                      />
                    </Space>
                    <Form.Control.Feedback>
                      Please Enter Time...
                    </Form.Control.Feedback>
              
                  </div>
                 
                  <div className="col-md-3 col-sm-12 colFormDet ">
                    <Form.Label className="common-labels">Drop Date</Form.Label>
                  
                    {/* <div className="d-flex justify-content-between"> */}
                    <div className="col-md-6- innerSelectBox weekCounter datepicker-main">
                    
                    <CommonDatePicker 
                      dateKey="vehicle_booking_request_date"
                      setDate={setDeleveryDetails}
                      data={deleveryDetails}
                      minDate={date}

                    />
                    {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                  </div>
                 
                  </div>

                  <div className="col-md-3 col-sm-12 colFormDet ">
                    <Form.Label className="common-labels">Drop Time</Form.Label>
                
                    <Space>
                      <TimePicker
                        className="form-control carretClass"
                        size="large"
                        allowClear={false}
                        inputReadOnly
                        value={
                          deleveryDetails.time
                            ? dayjs(deleveryDetails.time, "HH:mm:ss")
                            :  dayjs(new Date()).format('HH:mm:ss')
                        }
                        onChange={(e) => {
                          if (e) {
                            let time =
                              e.hour() + ":" + e.minute() + ":" + e.second();
                            setDeleveryDetails({ ...deleveryDetails, time });
                          }
                        }}
                      />
                    </Space>
                    <Form.Control.Feedback>
                      Please Enter Warehouse...
                    </Form.Control.Feedback>
              
                  </div>
                  <div className="col-md-6 col-sm-12 colFormDet">
                  <Form.Label className="common-labels">
                    Vehicle Type <span>&#42;</span>
                  </Form.Label>
                 
                    <CommonSelect
                         setID={true}
                         setterKey={"vehicle_type_id"}
                         setErrMsg={set_error_message}
                         errMsg={error_message}
                         componentId={true}
                         errKey={"dispatch"}
                         setterFucntions={setDeleveryDetails}
                         selectedValue={deleveryDetails?.vehicle_type_id}
                         selValue={deleveryDetails?.vehicle_type_id}
                         data={deleveryDetails}
                         placehold={t("Select")}
                         optionList={vehicleDropDown.map((vehicle) => ({
                           id: vehicle.vehicle_type_id,
                           value: vehicle.vehicle_type_id,
                           label: vehicle.vehicle_type_code,
                         }))}
                       />
                       {error_message?.vehicle_type_id?.length > 0  && 
                       <span className="text-danger mt-1" style={{fontSize:'.875em'}} >{error_message?.vehicle_type_id}</span>}

                  <Form.Control.Feedback>
                    Please select Vehicle
                  </Form.Control.Feedback>
                </div>
                  <div className="col-md-6 col-sm-12 colFormDet">
                  <Form.Label className="common-labels">
                    Vehicle  <span>&#42;</span>
                  </Form.Label>
                 
                    <CommonSelect
                         setID={true}
                         setterKey={"vehicle_type_id"}
                         setErrMsg={set_error_message}
                         errMsg={error_message}
                         componentId={true}
                         errKey={"dispatch"}
                         setterFucntions={setDeleveryDetails}
                         selectedValue={deleveryDetails?.vehicle_type_id}
                         selValue={deleveryDetails?.vehicle_type_id}
                         data={deleveryDetails}
                         placehold={t("Select")}
                         optionList={vehicleDropDown.map((vehicle) => ({
                           id: vehicle.vehicle_type_id,
                           value: vehicle.vehicle_type_id,
                           label: vehicle.vehicle_type_code,
                         }))}
                       />
                       {error_message?.vehicle_type_id?.length > 0  && 
                       <span className="text-danger mt-1" style={{fontSize:'.875em'}} >{error_message?.vehicle_type_id}</span>}

                  <Form.Control.Feedback>
                    Please select Vehicle
                  </Form.Control.Feedback>
                </div>
            
                <div className="col-md-6 col-sm-12 colForm">
                  <Form.Label>Number of Vehicles</Form.Label>
               
                  <Form.Control
  type="text"
  required
  class="form-control"
  value={numberOfVehicles}
  placeholder="How many vehicles do you want?"
  onChange={(e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || (re.test(e.target.value) && parseInt(e.target.value) > 0)) {
      setNumberOfVehicles(e.target.value);
    }
  }}
/>

                  <Form.Control.Feedback type="invalid">
                    Please Enter Number of Vehicles
                  </Form.Control.Feedback>
                </div>
                  <div className="col-md-6 colFormDet">
                  <Form.Label className="common-labels">
                                {" "}
                                {t("Name")} <span>&#42;</span>{" "}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                // disabled={UserId ? true : false}
                                placeholder="Enter Your Name"
                                // value={AddAccident.location}
                                // onChange={(e) => {
                                //   setAddAccident({
                                //     ...AddAccident,
                                //     location: e.target.value,
                                //   });
                                // }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please Enter Your Name.
                              </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 ">
                    <Form.Label className="common-labels">
                      {t("Mobile Number")} <span className="red-star">*</span>
                    </Form.Label>
                    <MobilePhoneInput
                      CommanCountry={AddDrivers?.userNationality}
                      commanNumber={AddDrivers?.userMobile}
                      commanContryCode={AddDrivers?.user_country_code}
                      state={AddDrivers}
                      onChangeHandler={mobileOnChangeHandler}
                    />

                    {/* {errMsg?.userMobile.length > 0 && (
                      <span className="text-danger">{errMsg?.userMobile}</span>
                    )} */}
                    <Form.Control.Feedback type="invalid">
                     {t("Please Enter Your Contact Number")} 
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-md-6 colFormDet">
                  <Form.Label className="common-labels">
                                {" "}
                                {t("Email")} <span>&#42;</span>{" "}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                // disabled={UserId ? true : false}
                                placeholder="Enter Your Email"
                                // value={AddAccident.location}
                                // onChange={(e) => {
                                //   setAddAccident({
                                //     ...AddAccident,
                                //     location: e.target.value,
                                //   });
                                // }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please Enter Your Email.
                              </Form.Control.Feedback>
                    </div>

                 

                  <div className="col-md-12 colFormDet">
                 
                  </div>
                </div>
              </div>
                <div className="col-md-6 col-sm-12 colForm">
                  {/* <Form.Label>Date</Form.Label>
                  <div className="innerSelectBox weekCounter datepicker-main">
                    <CommonDatePicker
                      dateKey="vehicle_booking_request_date"
                      setDate={setDeleveryDetails}
                      data={deleveryDetails}
                      minDate={date}

                    />
                    <img src={Calendar} className="calendarLogo" alt="" />
                  </div>
                  <Form.Control.Feedback>Add Date</Form.Control.Feedback> */}
                </div>
                <div className="col-md-6 col-sm-12 colForm">
                  <div className="innerSelectBox weekCounter">
                    {/* <Form.Label>
                      Time <span>&#42;</span>
                    </Form.Label>
                    <Space>
                      <TimePicker
                        className="form-control carretClass"
                        size="large"
                        allowClear={false}
                        inputReadOnly
                        value={
                          deleveryDetails.time
                            ? dayjs(deleveryDetails.time, "HH:mm:ss")
                            :  dayjs(new Date()).format('HH:mm:ss')
                        }
                        onChange={(e) => {
                          if (e) {
                            let time =
                              e.hour() + ":" + e.minute() + ":" + e.second();
                            setDeleveryDetails({ ...deleveryDetails, time });
                          }
                        }}
                      />
                    </Space> */}
                  </div>
                  {/* <Form.Control.Feedback>Add Time</Form.Control.Feedback> */}
                </div>
               

            

                <div className="col-md-6 col-sm-12"></div>
                <div className="col-md-6 col-sm-12"></div>
                <div className="col-md-6 col-sm-12"></div>
                <div className="col-md-6 col-sm-12"></div>
              </div>
          
           {/*    <div className="detailsSec" style={{border:'none'}}>
                <div className="headerDet" style={{border:'none'}}>
                 
                </div>
                <div className="row">
                
                
                </div>
              </div> */}
              <div className="d-flex justify-content-end" /* style={{paddingTop:'10%'}} */>
                <button
                  type="button"
                  onClick={(e) => {
                    handleResetClick(e);
                  }}
                  className="cx-btn-1"
                >
                  Cancel
                </button>
                <button className="cx-btn-2">Submit</button>
              </div>
            </Form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default VehicleBooking2;

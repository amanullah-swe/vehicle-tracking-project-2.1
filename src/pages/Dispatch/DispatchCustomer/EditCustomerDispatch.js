import { Fragment, React, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import Form from "react-bootstrap/Form";
import XCross from "../../../assets/images/xcross.svg";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  simpleGetCall,
  simplePUTCall,
  simplePostCall,
} from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { useEffect } from "react";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import { SearchFunction } from "../../../sharedComponent/LeafletMap/SearchFunction";
import { useTranslation } from "react-i18next";
import { SearchAddress } from "../../../sharedComponent/LeafletMap/SearchAddress";
import { yearsToDays } from "date-fns";
import { Space, TimePicker } from "antd";
import dayjs from "dayjs";

const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const EditCustomerDispatch = () => {
  const { id } = useParams();
  const { sidebar, setSidebar, Dark, setDark, customerData } =
    useContext(AppContext);

  const [validated, setValidated] = useState(false);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState({
    dispatch_customer_address_address: "",
  });
  const [dispatchDetails, setDispatchDetails] = useState({
    dispatch_customer_name: "",
    dispatch_customer_code: "",
    dispatch_customer_email: "",
    dispatch_customer_mobile: "",
    dispatch_customer_address: [
      {
        dispatch_customer_address_address: "",
        dispatch_customer_address_mobile: "",
        dispatch_customer_address_status: "active",
        dispatch_customer_address_latitude: 0,
        dispatch_customer_address_longitude: 0,
        dispatch_customer_address_country_code: "",
        dispatch_customer_address_unload_duration: "",
        dispatch_customer_address_person_name: "",
        dispatch_customer_address_is_default: 0,
        dispatch_customer_created_by: Number(customerData?.id),
      },
    ],
  });
console.log("dispatchDetails",dispatchDetails);
  // const [customerDetails, setCustomerDetails] = useState({
  //   dispatch_customer_address_address: "",
  //   dispatch_customer_address_mobile: "",
  //   dispatch_customer_address_country_code: "",
  // });

  useEffect(() => {
    // setDispatchDetails((prevDispatchDetails) => ({
    //   ...prevDispatchDetails,
    //   dispatch_customer_address: [customerDetails],
    // }));

    return () => {
      setDispatchDetails({
        dispatch_customer_name: "",
        dispatch_customer_code: "",
        dispatch_customer_email: "",
        dispatch_customer_mobile: "",
        dispatch_customer_address: [
          {
            dispatch_customer_address_address: "",
            dispatch_customer_address_mobile: "",
            dispatch_customer_address_status: "active",
            dispatch_customer_address_latitude: 0,
            dispatch_customer_address_longitude: 0,
            dispatch_customer_address_country_code: "",
            dispatch_customer_address_unload_duration: "",
            dispatch_customer_address_person_name:"",
            dispatch_customer_address_is_default: 0,
            dispatch_customer_created_by: Number(customerData?.id),
          },
        ],
      });
    };
  }, []);
  // customerDetails
  const getDispatchDetails = () => {
    setLoading(true);
    simpleGetCall(ApiConfig.GET_VIEW_DISPATCH_DETAILS + id)
      .then((res) => {
        console.log("res,", res);
        if (res.result) {
          setDispatchDetails(res?.data);
          // setCustomerDetails(res?.data?.dispatch_customer_address[0]);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (id) getDispatchDetails();
  }, [id]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (
        dispatchDetails.dispatch_customer_address[0]
          .dispatch_customer_address_address.length === 0
      ) {
        setErrMsg({
          ...errMsg,
          dispatch_customer_address_address: "Please Enter Address or select",
        });
      } else {
        setLoading(true);
        if (id) {
          let payLoadBody = JSON.stringify(dispatchDetails);
          simplePUTCall(ApiConfig.UPDATE_DISPATCH_DETAILS, payLoadBody)
            .then((res) => {
              if (res?.result === true) {
                // getDispatchDetails();
                notifySuccess(res.message);
                navigate("/DispatchCustomer");
              } else {
                notifyError(res.message);
              }
            })
            .catch((err) => {
              console.log("err", err);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          // let body = JSON.stringify(dispatchDetails);
          let body = JSON.stringify(dispatchDetails);
          simplePostCall(ApiConfig.UPDATE_DISPATCH_DETAILS, body)
            .then((res) => {
              if (res.result) {
                setDispatchDetails(res.data);
                notifySuccess(res.message);
                navigate("/DispatchCustomer");
              } else {
                notifyError(res.message);
              }
            })
            .catch((err) => {
              console.log("err", err);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      }
    }
    setValidated(true);
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div id="cx-wrapper" className="EditCustomer_Dispatch">
            <div className="main-master-wrapper">
              <div className="Heading">
                <p>
                  {id ? `${t("Edit")}` : `${t("Add")}`} {t("Customer Details")}
                </p>
              </div>
              {/* Inputs form section */}
              <div className="innerInputsGen">
                <div className="row mb-3">
                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Dispatch Customer Name")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Customer Name...")}
                        value={dispatchDetails.dispatch_customer_name}
                        onChange={(e) => {
                          let value = e.target.value;
                          let valueInput = value.replace(/[^A-Za-z ]/gi, "");
                          setDispatchDetails({
                            ...dispatchDetails,
                            dispatch_customer_name: valueInput,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                      {t("Please Enter Customer Name...")}  
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Dispatch Customer Code")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Customer Code...")}
                        value={dispatchDetails.dispatch_customer_code}
                        onChange={(e) =>
                          setDispatchDetails({
                            ...dispatchDetails,
                            dispatch_customer_code: e.target.value,
                          })
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                     {t("Please Enter Customer Code...")}   
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {" "}
                        {t("Dispatch Customer Email")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Customer Email...")}
                        value={dispatchDetails.dispatch_customer_email}
                        onChange={(e) =>
                          setDispatchDetails({
                            ...dispatchDetails,
                            dispatch_customer_email: e.target.value,
                          })
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                     {t("Please Enter Customer Email...")}   
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-md-6  form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Dispatch Customer Mobile")}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("Enter Customer Mobile Number...")}
                        value={dispatchDetails?.dispatch_customer_mobile}
                        maxLength="15"
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            setDispatchDetails({
                              ...dispatchDetails,
                              dispatch_customer_mobile: e.target.value,
                            });
                          }
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                      {t("Please Enter Customer Mobile Num...")}  
                      </Form.Control.Feedback>
                    </div>
                  </div>
                </div>
              </div>
              {/* Add new details sec */}
              <div className="AddNewForm">
                {dispatchDetails?.dispatch_customer_address &&
                  dispatchDetails?.dispatch_customer_address?.map(
                    (address, index) => {
                      return (
                        <Fragment key={"addresss" + index}>
                          <div className="innerWrapper">
                            <div className="FormHeading">
                              <p>
                                {t("Address") + " " + (index +1)} 
                                {/* -{index + 1} */}
                              </p>
                            </div>
                            <div className="innerImg">
                              {index > 0 && (
                                <img
                                  src={XCross}
                                  alt=""
                                  onClick={() => {
                                    if (
                                      dispatchDetails.dispatch_customer_address
                                        .length > 1
                                    )
                                      setDispatchDetails({
                                        ...dispatchDetails,
                                        dispatch_customer_address:
                                          dispatchDetails.dispatch_customer_address.filter(
                                            (_, filterIndex) =>
                                              filterIndex != index
                                          ),
                                      });
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <div className="innerSelectBox weekCounter">
                                <Form.Label className="common-labels">
                                  {t("Delivery Address")}
                                </Form.Label>
                                <SearchAddress
                                  displayValue={address?.dispatch_customer_address_address}
                                  required={true}
                                  onClickHandler={(locationData, latLng) => {
                                    const {display_name} = locationData
                                    const {x, y} = latLng
                                    // setDispatchDetails((prevDispatchDetails) => ({
                                    //   ...prevDispatchDetails,
                                    //   dispatch_customer_address: prevDispatchDetails.dispatch_customer_address.map((address, i) =>
                                    //     i === index ? {
                                    //        ...address,
                                    //        ["dispatch_customer_address_address"]: display_name || "",
                                    //        ["dispatch_customer_address_latitude"] : y || "",
                                    //        ["dispatch_customer_address_longitude"] : x || ""
                                    //   } : address
                                    //   ),
                                    // }));
                                  }}
                                  state={dispatchDetails?.dispatch_customer_address}
                                  setState={setDispatchDetails}
                                  index={index}
                                  keyProperty={"dispatch_customer_address"}
                                  addressKey={"dispatch_customer_address_address"}
                                  latKey={"dispatch_customer_address_latitude"}
                                  lngKey={"dispatch_customer_address_longitude"}
                                />
                                {errMsg.dispatch_customer_address_address
                                  .length > 0 && (
                                  <span className="text-danger">
                                    {errMsg.dispatch_customer_address_address}
                                  </span>
                                )}
                                {/* <Form.Control
                              as="textarea"
                              rows={3}
                              required
                              type="text"
                              placeholder="Enter Delivery Address..."
                              value={address.dispatch_customer_address_address}
                              onChange={(e) =>
                                setDispatchDetails({
                                  ...dispatchDetails, dispatch_customer_address: dispatchDetails.dispatch_customer_address.map((innderAddess, innerIndex) => {
                                    return innerIndex === index ? { ...innderAddess, dispatch_customer_address_address: e.target.value } : innderAddess
                                  })
                                })}
                            /> */}
                                <Form.Control.Feedback type="invalid">
                                {t("Please Enter Delivery Address...")}  
                                </Form.Control.Feedback>
                              </div>
                            </div>
                            <div className="col-md-6  form_input_main mb-3">
                              <div className="innerSelectBox weekCounter">
                               



                                <Form.Label className="common-labels">
                                {t("Delivery Person Name")}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                // maxLength="6"
                                name="Speed_limit"
                                value={
                                  dispatchDetails.dispatch_customer_address[
                                    index
                                  ].dispatch_customer_address_person_name
                                }
                                onChange={(e) => {
                                
  
                                  const updatedAddresses = [
                                    ...dispatchDetails.dispatch_customer_address,
                                  ];
                                  updatedAddresses[index] = {
                                    ...updatedAddresses[index],
                                    dispatch_customer_address_person_name:
                                      e.target.value,
                                  };
                                  setDispatchDetails({
                                    ...dispatchDetails,
                                    dispatch_customer_address:
                                      updatedAddresses,
                                  });
                                }}
                              
                              />
                              <Form.Control.Feedback type="invalid">
                             {t("Please Enter Load Time...")}   
                              </Form.Control.Feedback>
                              </div>
                            </div>
                            <div className="col-md-6  form_input_main mb-3">
                              <div className="innerSelectBox weekCounter">
                                <Form.Label className="common-labels">
                                  {t("Delivery Address Country Code")}
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  maxLength="3"
                                  name="Speed_limit"
                                  value={
                                    dispatchDetails.dispatch_customer_address[
                                      index
                                    ].dispatch_customer_address_country_code
                                  }
                                  onChange={(e) => {
                                    const updatedAddresses = [
                                      ...dispatchDetails.dispatch_customer_address,
                                    ];
                                    updatedAddresses[index] = {
                                      ...updatedAddresses[index],
                                      dispatch_customer_address_country_code:
                                        e.target.value,
                                    };
                                    setDispatchDetails({
                                      ...dispatchDetails,
                                      dispatch_customer_address:
                                        updatedAddresses,
                                    });
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                {t("Please Enter Address Country Code...")}  
                                </Form.Control.Feedback>
                                {/* <option value="">
                                  Enter Delivery Address Country Code...
                                </option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="150">150</option>
                              </Form.Control> */}
                              </div>
                            </div> 
                            <div className="col-md-6  form_input_main mb-3">
                            <div className="innerSelectBox weekCounter">
                            <Form.Label className="common-labels">
                            {t("Delivery Address Contact Number")}
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={t("Enter Delivery Address Contact Number...")}
                            maxLength="15"
                            value={
                              address.dispatch_customer_address_mobile
                            }
                            onChange={(e) => {
                              const updatedAddresses = [
                                ...dispatchDetails.dispatch_customer_address,
                              ];
                              updatedAddresses[index] = {
                                ...updatedAddresses[index],
                                dispatch_customer_address_mobile:
                                  e.target.value,
                              };
                              setDispatchDetails({
                                ...dispatchDetails,
                                dispatch_customer_address:
                                  updatedAddresses,
                              });
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                        {t("Please Enter Delivery Address Contact Number...")}    
                          </Form.Control.Feedback>
                              {/* <option value="">
                                Enter Delivery Address Country Code...
                              </option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                              <option value="150">150</option>
                            </Form.Control> */}
                            </div>
                            
                          </div>
                            <div className="col-md-6  form_input_main mb-3">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("Average Unloading Duration (Min)")}
                              </Form.Label>
                              <Form.Control
                                required
                                type="number"
                                maxLength="6"
                                name="Speed_limit"
                                value={
                                  dispatchDetails.dispatch_customer_address[
                                    index
                                  ].dispatch_customer_address_unload_duration
                                }
                                onChange={(e) => {
                                  const re = /^[0-9\b]+$/;
                                  if (e.target.value === '' || re.test(e.target.value)) {

                                  const updatedAddresses = [
                                    ...dispatchDetails.dispatch_customer_address,
                                  ];
                                  updatedAddresses[index] = {
                                    ...updatedAddresses[index],
                                    dispatch_customer_address_unload_duration:
                                      e.target.value,
                                  };
                                  setDispatchDetails({
                                    ...dispatchDetails,
                                    dispatch_customer_address:
                                      updatedAddresses,
                                  });
                                }}
                              }
                              />
                             {/* <Space>
                                <TimePicker
                                  className="form-control carretClass"
                                  size="large"
                                  value={
                                    dispatchDetails.dispatch_customer_address[
                                      index
                                    ].dispatch_customer_address_unload_duration
                                      ? dayjs(dispatchDetails.dispatch_customer_address[
                                        index
                                      ].dispatch_customer_address_unload_duration, "HH:mm")
                                      : dayjs("00:00", "HH:mm")
                                  } 
                                  
                                  onChange={(e) => {
                                    let time = e
                                      ? e?.hour() +
                                      ":" +
                                      e?.minute()
                                      : "00:00";
                                      const updatedAddresses = [
                                        ...dispatchDetails.dispatch_customer_address,
                                      ];
                                      updatedAddresses[index] = {
                                        ...updatedAddresses[index],
                                        dispatch_customer_address_unload_duration:
                                        time,
                                      };
                                      setDispatchDetails({
                                        ...dispatchDetails,
                                        dispatch_customer_address:
                                          updatedAddresses,
                                      });
                                    }}
                                      // setDispatchloadtime(time)
                                      
                                        
                                        
                                  format={'HH:mm'}
                                />
                              </Space>*/}
                              <Form.Control.Feedback type="invalid">
                              {t("Please Enter Load Time...")}  
                              </Form.Control.Feedback>
                              {/* <option value="">
                                Enter Delivery Address Country Code...
                              </option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                              <option value="150">150</option>
                            </Form.Control> */}
                            </div>
                            
                          </div>
                        
                          </div>
                        </Fragment>
                      );
                    }
                  )}
              </div>
              <button
                className="AddNewBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setDispatchDetails({
                    ...dispatchDetails,
                    dispatch_customer_address: [
                      ...dispatchDetails.dispatch_customer_address,
                      {
                        dispatch_customer_address_address: "",
                        dispatch_customer_address_mobile: "",
                        dispatch_customer_address_status: "active",
                        dispatch_customer_address_latitude: 0,
                        dispatch_customer_address_longitude: 0,
                        dispatch_customer_address_country_code: "",
                        dispatch_customer_address_is_default: 0,
                        dispatch_customer_created_by: Number(customerData?.id),
                      },
                    ],
                  });
                }}
              >
                + {t("Add New")}
              </button>
              {/* {/* Two Bottom Buttons */}
              <div className="d-flex justify-content-end align-items-center belowBtns btn-wrapper">
                <button
                  className="cx-btn-1"
                  onClick={() => {
                    navigate("/DispatchCustomer");
                  }}
                >
                  {t("Cancel")}
                </button>

                <button className="cx-btn-2">
                  {id ? `${t("Update")}` : `${t("Submit")}`}
                </button>
              </div>
            </div>
          </div>
        </Form>
      </motion.div>
    </>
  );
};

export default EditCustomerDispatch;
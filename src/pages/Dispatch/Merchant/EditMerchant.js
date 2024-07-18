import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import profile from "../../../assets/images/Update-profile.svg";
import camera from "../../../assets/images/ic-camera.svg";
import Creoss from "../../../assets/images/Creoss_Red.svg";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import MapComponent from "../../../sharedComponent/MapComponent";
import { useEffect } from "react";
import { multipartPostCall, simplePostCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import Loader from "../../../sharedComponent/Loader";
import { SearchFunction } from "../../../sharedComponent/LeafletMap/SearchFunction";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import { useTranslation } from "react-i18next";
import Warehouser_icon from "../../../assets/images/Warehouser_icon.svg";
import ImportUser from "../../../assets/images/imagesuser.png";
import { Space, TimePicker } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
const EditMerchant = () => {
  const { id } = useParams();
  const { sidebar, setLoading, loading, customerData } =
    useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const addonSettingData = useSelector((state) => state.auth.addonModule);

  const [merchentDetails, setMerchentDetails] = useState({
    warehouse: [
      {
        vendor_warehouse_name: "",
        vendor_warehouse_loading_duration: "",
        vendor_warehouse_longitude: "",
        vendor_warehouse_latitude: ""
      },
    ],
    // editMerchantaddrees:editMerchantaddrees,
  });

  const [errMsg, setErrMsg] = useState({
    vendor_name: "",
    contact_person_name: "",
    vendor_mobile: "",
    vendor_email: "",
    vendor_confirm_password: "",
    vendor_warehouse_latitude: "",
    master_vendor_gst: ""

  });
  const [AddDetails, setAddDetails] = useState({
    vendor_name: "",
    contact_person_name: "",
    vendor_mobile: "",
    vendor_email: "",
    vendor_confirm_password: "",
    vendor_password: "",
    master_vendor_gst: ""
  });
  const handleResetClick = () => {
    navigate("/Merchant")
    setMerchentDetails({

      vendor_name: "",
      contact_person_name: "",
      vendor_mobile: "",
      vendor_email: "",
      vendor_confirm_password: "",
      vendor_password: "",
      master_vendor_gst: "",

      warehouse: [
        {
          vendor_warehouse_name: "",
          vendor_warehouse_loading_duration: "",
          vendor_warehouse_longitude: "",
          vendor_warehouse_latitude: ""
        },
      ],
    });

    setAddDetails({});
  };
  const { t, i18n } = useTranslation();
  // const [addwarehoues, setAddwarehoues] = useState(1);
  useEffect(() => {
    if (merchentDetails?.warehouse[0].vendor_warehouse_latitude && merchentDetails?.warehouse[0].vendor_warehouse_longitude) {
      setErrMsg({ ...errMsg, vendor_warehouse_latitude: "" })
    }
  }, [merchentDetails?.warehouse[0].vendor_warehouse_latitude, merchentDetails?.warehouse[0].vendor_warehouse_longitude])

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    if (AddDetails?.vendor_name.length === 0) {
      setErrMsg({
        ...errMsg,
        vendor_name: t("Please Enter name"),
      });
      return;
    }

    if (AddDetails.vendor_mobile.length === 0) {
      setErrMsg({
        ...errMsg,
        vendor_mobile: t("Please Enter Mobile Number."),
      });
      return;
    } if (AddDetails.vendor_email.length === 0) {
      setErrMsg({
        ...errMsg,
        vendor_email: t("Please Enter Email"),
      });
      return;
    }
    if (!id && AddDetails?.vendor_password !== AddDetails?.vendor_confirm_password) {
      setErrMsg({
        ...errMsg,
        vendor_confirm_password: t("Password Does Not Match."),
      });
      return;
    }
    // if (AddDetails.vendor_confirm_password.length < 8) {
    //   setErrMsg({ ...errMsg, vendor_confirm_password: "Password must be at least 8 characters " });
    //   return;
    // } 

    if (merchentDetails?.warehouse[0].vendor_warehouse_latitude.length === 0 || merchentDetails?.warehouse[0]?.vendor_warehouse_longitude?.length === 0) {
      setErrMsg({
        ...errMsg,
        vendor_warehouse_latitude: t("Please Search and Add Address"),
      });
      return;
    }

    //       vendor_warehouse_address
    // : 
    // "Kunene Region, Namibia"
    // vendor_warehouse_latitude
    // : 
    // -19.6792809
    // vendor_warehouse_longitude
    // : 
    // 1




    setLoading(true);
    let body = JSON.stringify(merchentDetails?.warehouse);
    let formData = new FormData();
    formData.append("user_id", id);

    formData.append("vendor_name", AddDetails.vendor_name);
    formData.append("vendor_email", AddDetails.vendor_email);
    formData.append("vendor_password", AddDetails.vendor_password);
    formData.append(
      "vendor_confirm_password",
      AddDetails.vendor_confirm_password
    );
    formData.append("contact_person_name", AddDetails.contact_person_name);
    formData.append("master_vendor_gst", AddDetails.master_vendor_gst);
    formData.append("vendor_mobile", AddDetails.vendor_mobile);
    formData.append("profilePath", AddDetails.profilePic);
    formData.append("vendor_address", body);
    // formData.append("vendor_warehouse_name", AddDetails.vendor_warehouse_name);
    multipartPostCall(
      id ? ApiConfig.UPDATE_MERCHENT : ApiConfig.ADD_MERCHENT,
      formData
    )
      .then((res) => {
        setLoading(false);
        if (res.result) {
          notifySuccess(res.message);
          navigate("/Merchant")
          // if (id) navigate("/ViewMerchant/" + id);
          // else navigate("/ViewMerchant/" + res.vendor_id);
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err));


  };

  useEffect(() => {
    if (id) {
      getMerchentDetails();
    }
  }, [id]);
  const getMerchentDetails = () => {
    setLoading(true);
    let body = JSON.stringify({ vendor_id: id });
    simplePostCall(ApiConfig.VIEW_MERCHENT, body)
      .then((res) => {
        if (res.result) {
          setMerchentDetails(res.data);
          setAddDetails(res.data);
        }
      })
      .catch((err) => {
        console.log("err", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const addnewhouse = () => {
    setMerchentDetails({
      ...merchentDetails,
      warehouse: [...merchentDetails.warehouse, {}],
    });
  };
  const removenewhouse = (index) => {
    let filterData =
      merchentDetails.warehouse &&
      merchentDetails.warehouse.filter((item, inner) => inner != index);
    setMerchentDetails({ ...merchentDetails, warehouse: filterData });
  };

  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      setAddDetails({
        ...AddDetails,
        [e.target.name]: e.target.files[0],
      });
    } else
      setAddDetails({
        ...AddDetails,
        [e.target.name]: e.target.value,
      });
  };

  ///////// NEw start //

  const [state, setState] = useState({
    topics: [],
    selectedTopics: [],
    drivertopic: [],
    selectedDriver: [],
    Vehilepic: [],
    selectedVehicle: [],
  });

  const [requirements, setrequirements] = useState([
    // {
    //   id: 1,
    //   inspection_category_type: "",
    //   vehicle_type_code: "",
    //   PartCatgrey: "",
    // },
  ]);

  function onTopicChange(selectedOption, index) {
    let finalArr = requirements.map((item, i) => {
      return index === i
        ? {
          ...item,
          inspection_category_type: selectedOption,
          inspection_category_type_id: selectedOption.value,
        }
        : item;
    });
    setrequirements(finalArr);

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
  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
  };
  return (
    <main className={sidebar ? "taskMain " : "cx-active taskMain"} id="cx-main">
      <div id="cx-wrapper" className="Update_Customer_Profile ">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div
              className="main-dashboard-wrapper CustomerProfile "
              id="Create_User_Responsive"
            >
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <p className="main-page-heading">

                  {
                    customerData.customer_id == 9999 ? (
                      <>

                        {id ? t("Edit Merchant Details") : t("New Merchant Details")}
                      </>



                    ) : <>
                      {id ? t("Edit Merchant Details") : t("New Merchant Details")}
                    </>}

                </p>
                <div className="CustomerProfile-head">
                  <label
                    htmlFor="uploadPic"
                    className="porile-img d-block c-pointer"
                  >
                    <Form.Control
                      // required
                      type="file"
                      id="uploadPic"
                      className="d-none"
                      name="profilePic"
                      onChange={handleChange}
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      className="select-picture-feedback"
                    >
                      {t("Please Choose Picture.")}
                    </Form.Control.Feedback>

                    <div className="main-img-wrapper">
                      <div className="profile-img-wrapper">
                        <img
                          src={
                            !AddDetails.profilePic
                              ? profile
                              : AddDetails.profilePic.length
                                ?
                                AddDetails.profilePic
                                :
                                AddDetails.profilePic &&
                                URL.createObjectURL(AddDetails.profilePic)
                          }
                          onError={(ev) => {
                            handleErrorImage(ev);
                          }}
                          alt="porfile"
                        />
                      </div>
                      <div className="camera-img-wrapper">
                        <img src={camera} alt="" />
                      </div>
                    </div>
                  </label>
                </div>
                <div className="information-card row mb-0">
                  <div className="col-md-6 form_input_main ">
                    <Form.Label className="common-labels">


                      {
                        customerData.customer_id == 9999 ? (
                          <>

                            {t("Merchant Name")} <span>&#42;</span>
                          </>



                        ) : <>
                          {t("Merchant Name")} <span>&#42;</span>
                        </>}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("Enter Name")}
                      value={AddDetails.vendor_name}
                      onChange={(e) => {
                        let value = e.target.value;
                        let valueInput = value.replace(/[^A-Za-z ]/gi, "");
                        setAddDetails({
                          ...AddDetails,
                          vendor_name: valueInput,
                        });
                        setErrMsg({ ...errMsg, vendor_name: "" })
                      }}
                    />
                    {errMsg?.vendor_name.length > 0 && (
                      <span className="text-danger">
                        {errMsg?.vendor_name}
                      </span>
                    )}
                    <Form.Control.Feedback type="invalid">
                      Please Enter Customer Name.
                    </Form.Control.Feedback>
                  </div>

                  <div className="col-md-6 form_input_main">
                    <Form.Label className="common-labels">
                      {t("Contact Person Name")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("Contact Person Name")}
                      value={AddDetails.contact_person_name}
                      onChange={(e) => {
                        let value = e.target.value;
                        let valueInput = value.replace(/[^A-Za-z ]/gi, "");
                        setAddDetails({
                          ...AddDetails,
                          contact_person_name: valueInput,
                        });
                        setErrMsg({ ...errMsg, contact_person_name: "" })
                      }}
                    />
                    {errMsg?.contact_person_name.length > 0 && (
                      <span className="text-danger">
                        {errMsg?.contact_person_name}
                      </span>
                    )}
                    <Form.Control.Feedback type="invalid">
                      {t("Please Enter Contact Person Name...")}
                    </Form.Control.Feedback>
                  </div>

                  {id ? (
                    <></>
                  ) : (
                    <>
                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          {t("User Password")}{" "}
                          <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="password"
                          value={AddDetails.vendor_password}
                          placeholder={t("Enter Your Password")}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(
                              /[^0-9 A-Za-z @]/gi,
                              ""
                            );
                            setAddDetails({
                              ...AddDetails,
                              vendor_password: valueInput,
                            });
                            setErrMsg({ ...errMsg, vendor_confirm_password: "" });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("Please Enter Your Password")}
                        </Form.Control.Feedback>
                      </div>
                    </>
                  )}
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Contact Number")} <span className="red-star">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("Enter Your Contact Number")}
                      pattern="[1-9]{1}[0-9]{9}"
                      value={AddDetails.vendor_mobile}
                      maxLength={10}
                      onChange={(e) => {
                        let value = e.target.value;
                        let valueInput = value.replace(/[^0-9]/gi, "");
                        setAddDetails({
                          ...AddDetails,
                          vendor_mobile: valueInput,
                        });
                        setErrMsg({ ...errMsg, vendor_mobile: "" })
                      }}
                    />
                    {errMsg?.vendor_mobile.length > 0 && (
                      <span className="text-danger">
                        {errMsg?.vendor_mobile}
                      </span>
                    )}
                    <Form.Control.Feedback type="invalid">
                      {t("Please Enter Your Contact Number")}
                    </Form.Control.Feedback>
                  </div>

                  {addonSettingData.addon_ghatke == 1 ? <>
                    <div className="col-md-6 mb-4">
                      <Form.Label className="common-labels">
                        {t("GST ")} <span className="red-star">*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="taxt"
                        placeholder={t("Enter Your GST")}

                        value={AddDetails?.master_vendor_gst}

                        onChange={(e) => {
                          let value = e.target.value;

                          setAddDetails({
                            ...AddDetails,
                            master_vendor_gst: value,
                          });
                          setErrMsg({ ...errMsg, master_vendor_gst: "" })
                        }}
                      />
                      {errMsg?.master_vendor_gst.length > 0 && (
                        <span className="text-danger">
                          {errMsg?.master_vendor_gst}
                        </span>
                      )}
                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter Your GST")}
                      </Form.Control.Feedback>
                    </div>
                  </> : <></>}



                  {id ? (
                    <></>
                  ) : (
                    <>
                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          {t("Confirm Password")}{" "}
                          <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="password"
                          value={AddDetails.vendor_confirm_password}
                          placeholder={t("Enter Your Password")}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(
                              /[^0-9 A-Za-z @]/gi,
                              ""
                            );
                            setAddDetails({
                              ...AddDetails,
                              vendor_confirm_password: valueInput,
                            });
                            setErrMsg({ ...errMsg, vendor_confirm_password: "" });

                          }}
                        />
                        {errMsg?.vendor_confirm_password.length > 0 && (
                          <span className="text-danger">
                            {errMsg?.vendor_confirm_password}
                          </span>
                        )}
                        <Form.Control.Feedback type="invalid">
                          {t("Please Enter Password Again to Confirm")}
                        </Form.Control.Feedback>
                      </div>
                    </>
                  )}
                  <div className="col-md-6 mb-4">
                    <Form.Label className="common-labels">
                      {t("Email")} <span className="red-star">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="email"
                      value={AddDetails.vendor_email}
                      placeholder={t("Enter Your Email")}
                      onChange={(e) => {
                        let value = e.target.value;

                        setAddDetails({
                          ...AddDetails,
                          vendor_email: value,
                        });
                        setErrMsg({ ...errMsg, vendor_email: "" })
                      }}
                    />
                    {errMsg?.vendor_email.length > 0 && (
                      <span className="text-danger">
                        {errMsg?.vendor_email}
                      </span>
                    )}
                    <Form.Control.Feedback type="invalid">
                      {t("Please Enter Your Email")}
                    </Form.Control.Feedback>
                  </div>


                  {/* {addwarehoues.} */}
                  {merchentDetails.warehouse &&
                    merchentDetails.warehouse.map((single, index) => {
                      let address = single.vendor_warehouse_address;
                      return (
                        <div className="col-lg-12" key={"warehouse" + index}>
                          <div className="warehouse_details">
                            <div className="headerDet">
                              <label className="headerTxtDet">
                                {t("Warehouse Details")}-{index + 1}
                              </label>
                              {/* <div className="defult_check_address">
                                <img
                                  src={Creoss}
                                  alt=""
                               
                                  onClick={() => {
                                    if (merchentDetails.warehouse.length > 1)
                                      setMerchentDetails({
                                        ...merchentDetails,
                                        warehouse:
                                          merchentDetails.warehouse.filter(
                                            (_, filterIndex) =>
                                              filterIndex != index
                                          ),
                                      });
                                  }}
                                />
                              </div> */}
                            </div>
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="col-md-12 col-sm-12 colFormDet">
                                  <Form.Label className="common-labels">
                                    {t("Warehouse Name")} <span>&#42;</span>
                                  </Form.Label>
                                  <Form.Control
                                    required
                                    type="text"
                                    placeholder={t("Enter First Name")}
                                    value={single.vendor_warehouse_name}
                                    onChange={(e) => {
                                      let data = merchentDetails.warehouse;
                                      data[index].vendor_warehouse_name =
                                        e.target.value;
                                      setMerchentDetails({
                                        ...merchentDetails,
                                        warehouse: data,
                                      });
                                    }}
                                  // onChange={(e) => {
                                  //   let value = e.target.value

                                  //   setAddDetails({
                                  //     ...AddDetails,
                                  //     vendor_warehouse_name: value,
                                  //   });
                                  // }}
                                  // value={single?.vendor_warehouse_name}
                                  // onChange={(selectedOption) => {onTopicChange(selectedOption,index)}}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {t("Please Enter Warehouser Name...")}
                                  </Form.Control.Feedback>
                                </div>
                                <div className="col-md-12 colFormDet">
                                  <Form.Label className="common-labels">
                                    {t("Warehouse Address")} <span>&#42;</span>
                                  </Form.Label>
                                  <SearchFunction
                                    address={address}
                                    comp="EditMerchant"
                                    setter={setMerchentDetails}
                                    data={merchentDetails.warehouse}
                                    currentIndex={index}
                                  />

                                  <Form.Control.Feedback type="invalid">
                                    {t("Please Enter Pickup Address...")}
                                  </Form.Control.Feedback>
                                </div>
                                <div className="col-md-12 colFormDet">
                                  <Form.Label className="common-labels">
                                    {t("Average loading Duration (Min)")} <span>&#42;</span>
                                  </Form.Label>
                                  <Form.Control
                                    required
                                    type="text"

                                    maxLength="4"
                                    placeholder={t("Enter Warehouse load Duration")}
                                    value={single.vendor_warehouse_loading_duration}
                                    onChange={(e) => {
                                      const re = /^[0-9\b]+$/;
                                      if (e.target.value === '' || re.test(e.target.value)) {
                                        let data = merchentDetails.warehouse;
                                        data[index].vendor_warehouse_loading_duration =
                                          e.target.value;
                                        setMerchentDetails({
                                          ...merchentDetails,
                                          warehouse: data,
                                        });
                                      }
                                    }
                                    }

                                  />
                                  {/* <Space>
                                <TimePicker
                                  className="form-control carretClass"
                                  size="large"
                                  value={
                                    single.vendor_warehouse_loading_duration
                                      ? dayjs(single.vendor_warehouse_loading_duration, "HH:mm")
                                      : dayjs("00:00", "HH:mm")
                                  }
                                  onChange={(e) => {
                                    let time = e
                                      ? e?.hour() +
                                      ":" +
                                      e?.minute()
                                      : "00:00";
                                      let data = merchentDetails.warehouse;
                                      data[index].vendor_warehouse_loading_duration = time
                                      setMerchentDetails({
                                        ...merchentDetails,
                                        warehouse: data,
                                      });

                                    
                                  }}
                                  format={'HH:mm'}
                                />
                              </Space>*/}

                                  <Form.Control.Feedback type="invalid">
                                    {t("Please Enter Pickup Address...")}
                                  </Form.Control.Feedback>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className=" addmerchant m-0 p-0">
                                  <MapComponent
                                    componentId={"EditMerchant"}
                                    data={merchentDetails}
                                    currentIndex={index}
                                    setter={setMerchentDetails}
                                    latlong={{
                                      lat: single.vendor_warehouse_latitude,
                                      long: single.vendor_warehouse_longitude,
                                    }}
                                  />
                                  {errMsg?.vendor_warehouse_latitude.length > 0 && (
                                    <span className="text-danger">
                                      {errMsg?.vendor_warehouse_latitude}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                </div>
                {/* <button
                  type="button"
                  className="btn-active-ann"
                  onClick={() => {
                    addnewhouse();
                  }}
                >
                  + {t("Add Warehouse")}
                </button> */}
                <div className="btns-main">
                  <Link to="/Merchant">
                    <button
                      type="button"
                      className="cx-btn-1"
                      onClick={handleResetClick}
                    >
                      {t("Cancel")}
                    </button>
                  </Link>
                  <Link to="#">
                    <button
                      type="submit"
                      className="cx-btn-2"
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      {id ? t("Update") : t("Submit")}
                    </button>
                  </Link>
                </div>
              </Form>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default EditMerchant;

import { React, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { motion } from "framer-motion";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import { Space, TimePicker } from "antd";
import Select from "react-select";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Calendar from "../../../assets/images/calendar.svg";
import XCross from "../../../assets/images/xcross.svg";
import MapComponent from "../../../sharedComponent/MapComponent";
import { simpleGetCall, simplePostCall, multipartPostCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { useEffect } from "react";
import CommonSelect from "../../../sharedComponent/ReactSelect";
import { SearchFunction } from "../../../sharedComponent/LeafletMap/SearchFunction";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import Loader from "../../../sharedComponent/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { latestDate } from "../../../sharedComponent/common";
const DeliveryRequest = () => {
  const { t, i18n } = useTranslation();
  const [edit_merchant_data, set_edit_merchant_data] = useState([]);
  const [multiple_order_flag, set_multiple_order_flag] = useState(false);
  const [formBlocks, setFormBlocks] = useState([
    {
      merchant: '',
      warehouse: '',
      pickupAddress: '',
      warehouses: []
    }
  ]);

  console.log("checking formBlock========= ", formBlocks);
  const handleAddBlock = () => {
    setFormBlocks([
      ...formBlocks,
      {
        merchant: '',
        warehouse: '',
        pickupAddress: '',
        warehouses: []
      }
    ]);
  };

  const handleDeleteBlock = (index) => {
    setFormBlocks(formBlocks.filter((_, i) => i !== index));
  };

  const handleMerchantChange = (selectedOption, index) => {

    const updatedBlocks = [...formBlocks];

    updatedBlocks[index].merchant = selectedOption.value;
    setFormBlocks(updatedBlocks);
    const selectedMerchant = merchentDropDown.find(
      (merchant) => merchant.vendor_id === selectedOption.value
    );
    console.log('selectedMerchant-->', selectedMerchant)
    if (selectedMerchant && selectedMerchant.warehouse) {
      updatedBlocks[index].warehouses = selectedMerchant?.warehouse
      setwareHouses(selectedMerchant.warehouse);

    } else {
      updatedBlocks[index].warehouses = [];
      setwareHouses([]);
    }
    // Clear warehouse and pickup address when merchant changes
    updatedBlocks[index].warehouse = '';
    updatedBlocks[index].pickupAddress = '';

    setFormBlocks(updatedBlocks)
  };

  const handleWarehouseChange = (selectedOption, index) => {
    const updatedBlocks = [...formBlocks];
    updatedBlocks[index].warehouse = selectedOption.value;
    updatedBlocks[index].pickupAddress = selectedOption.address;
    setFormBlocks(updatedBlocks);
  };

  const { sidebar, setSidebar, Dark, customerData, timeZone, setDispatchStatus } =
    useContext(AppContext);
  const [dispatch_executive, set_dispatch_executive] = useState(false)
  const accessRights = useSelector((state) => state.auth.accessRights);
  const addonSettingData = useSelector((state) => state.auth.addonModule);

  const [loading, setLoading] = useState(false);
  let newId = useParams();
  let paramID = newId?.id;
  const [deleveryDetails, setDeleveryDetails] = useState({
    device: "web",
    time: dayjs(new Date()).format("HH:mm:ss"),
    dispatch_package_order_datetime: formatDate(new Date()),
    vehicle_type_id: "",
    weight_of_goods: "",
    height: "",
    width: "",
    length: "",
    types_of_goods: "",
    number_of_goods: "",
    dispatch_package_vendor_warehouse_id: "",
    dispatch_package_vendor_id: "",
    dispatch_package_customer_id: "",
    dispatch_package_address_id: "",

  });
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }


  const [activeData, setActiveData] = useState([]);
  const [warehouseAddress, setWarehouseAddress] = useState();
  const [user_role, set_user_role] = useState();
  const [transportation_list, set_transportation_list] = useState([]);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const [option, setOption] = useState([]);
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
  const [state, setState] = useState({
    topics: [],
    selectedTopics: [],
  });

  const navigate = useNavigate();
  const [wareHouses, setwareHouses] = useState([]);
  const [merchentDropDown, setMerchentDropDown] = useState([]);
  const [customerDropDown, setCustomerDropDown] = useState([]);
  const [vehicleDropDown, setVehicleDropDown] = useState([]);
  const [validated, setValidated] = useState(false);
  const [deleveryAddress, setDeleveryAddress] = useState();
  const [addressDropdopdown, setAddressDropdopdown] = useState([]);
  const [VehicalType, setVehicalType] = useState([]);
  const [TypeID, setTypeID] = useState([]);
  const [transportationList, setTransportationList] = useState([]);
  const [selectedTransportManager, setSelectedTransportManager] = useState(null)
  const [dispatch_user_id, set_dispatch_user_id] = useState(null)
  const [gradeState, setGradeState] = useState({
    isloading: true,
    grades: [],
  });

  const [errMsg, setErrMsg] = useState({});

  useEffect(() => {
    if (paramID) {

      singleListApicall(paramID);
      edit_merchant_details(paramID);
    }


  }, [paramID]);

  const singleListApicall = (paramID) => {
    simpleGetCall(ApiConfig.GET_ORDER_DETAILS + paramID)
      .then((res) => {
        if (res?.result) {
          let timeResponse =
            res?.data?.dispatch_package_order_datetime?.split(" ")[1];
          setDeleveryDetails({ ...res?.data, time: timeResponse });
          setActiveData(res?.timeLineData);
          set_dispatch_user_id(res?.data?.dispatch_user_id)



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
  };

  const edit_merchant_details = (paramID) => {
    let body = {
      dispatch_package_id: paramID
    }
    simplePostCall(ApiConfig.VIEW_MULTIPLE_POINT, JSON.stringify(body))
      .then((res) => {
        if (res?.result) {


          set_edit_merchant_data(res?.data);
          set_multiple_order_flag(true);
          set_dispatch_user_id(res?.data?.dispatch_user_id)
          // Transform the response data into the format required for formBlocks
          const newFormBlocks = res.data.map((data) => ({
            // merchant: data.dispatch_package_vendor_id,
            merchant: data.vendor_warehouse_vendor_id,
            // warehouse: data.dispatch_package_vendor_warehouse_id,
            warehouse: data.package_order_location_id,
            pickupAddress: data.vendor_warehouse_address,
            package_type: data.package_type,
            warehouses: [
              {
                vendor_warehouse_address: data.vendor_warehouse_address,
                vendor_warehouse_id: data.package_order_location_id,
                vendor_warehouse_name: data.vendor_warehouse_name,
                vendor_warehouse_vendor_id: data.vendor_warehouse_vendor_id,

              }]
          }));

          // Remove the object with package_type: 'drop' from the newFormBlocks array
          const updatedFormBlocks = newFormBlocks.filter(block => block.package_type !== 'drop');
          // Update the state with the new form blocks
          setFormBlocks(updatedFormBlocks);


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
  };
  /////////added code////////////////////////////////////////////
  const userRole = () => {
    simpleGetCall(ApiConfig.USERS_ROLE_LIST)
      .then((res) => {
        if (res.result) {
          console.log('res--->', res)
          set_user_role(res?.data)
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
  };
  useEffect(() => {
    var choiceArry = []

    state.selectedTopics?.map((valuedata, index) => {

      choiceArry.push(
        valuedata.value,

      )
    })
    setTypeID(choiceArry);
  }, [state.selectedTopics]);
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

  function geVehicalList() {


    // first check if use Role is dispatch user then don not fetch the user and just set that user only 


    const user = JSON.parse(localStorage.getItem("user"));
    // console.log("checking use role ===========", user)
    if (user?.user_role === "dispatchexecutive") {
      setSelectedTransportManager({
        label: user?.user_name,
        value: user?.user_id,
      })
      setTransportationList([{
        label: user?.user_name,
        value: user?.user_id,
      }])
    }
    else {


      let newRequestBody = JSON.stringify({
        notification_role: 'dispatchexecutive',
        // dispatch_user_id: user_role?.[0]?.role_id,
      });



      simplePostCall(ApiConfig.TRASPORTATION_LIST, newRequestBody)
        .then((res) => {

          if (res?.result) {
            // set_transportation_list(res?.data);
            setTransportationList(
              res?.data.map((item) => ({
                value: item.user_id,
                label: item.user_name,
              }))
            );
          }



        })
        .catch((error) => {
          console.log("api response", error);
        });
    }
  }

  useEffect(() => {
    if (dispatch_user_id !== null) {
      console.log('Updated dispatch_user_id:', dispatch_user_id);
      if (transportationList) {
        const matchingTransport = transportationList?.filter(item => item.value == dispatch_user_id);

        set_dispatch_user_id(dispatch_user_id)

        setSelectedTransportManager(matchingTransport)
        console.log("setSelectedTransportManager-->", selectedTransportManager)

      }
    }
  }, [dispatch_user_id]);



  const handleTransportManagerChange = (selectedOption) => {


    console.log('checking ============', selectedOption);
    setSelectedTransportManager(selectedOption);


  };
  useEffect(() => {
    console.log("setSelectedTransportManagertaleeb-->", selectedTransportManager)
  }, [selectedTransportManager])
  useEffect(() => {
    geVehicalList();
    userRole();
  }, []);
  //////////////end of added code/////////////////////////////////////////

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (paramID) {
      if (deleveryDetails?.vehicle_type_id?.length === 0) {
        setErrMsg({
          ...errMsg,
          vehicle_type_id: t("Please Select Vehicle"),
        });
        return;
      }



      if (deleveryDetails?.dispatch_package_vendor_warehouse_id?.length == 0) {
        // if (formBlocks[0]?.warehouse?.length == 0) {
        setErrMsg({
          ...errMsg,
          dispatch_package_vendor_warehouse_id: "Please Select vender house ",
        });
        return;
      }
      if (deleveryDetails?.dispatch_package_vendor_id?.length == 0) {
        // if (formBlocks[0]?.merchant?.length == 0) {
        setErrMsg({
          ...errMsg,
          dispatch_package_vendor_id: "Please Select vender ",
        });
        return;
        if (deleveryDetails?.dispatch_package_address_id?.length == 0) {
          setErrMsg({
            ...errMsg,
            dispatch_package_address_id: "Please Select customer address ",
          });
          return;
        }

      }
      if (addonSettingData.addon_ghatke == 1) {

        if (!selectedTransportManager) {
          console.log('hi there')
          setErrMsg({
            ...errMsg,
            selectedTransportManager: t("Please Select Vehicle Attaindent"),
          });
          return;
        }

      }
    } else {




      if (deleveryDetails?.vehicle_type_id?.length === 0) {
        console.log('hi there')
        setErrMsg({
          ...errMsg,
          vehicle_type_id: t("Please Select Vehicle"),
        });
        return;
      }
      const newErrMsg = {};
      let valid = true;

      formBlocks.forEach((block, index) => {
        if (!block.warehouse || block.warehouse?.length === 0) {
          newErrMsg[`dispatch_package_vendor_warehouse_id_${index}`] = `Please Select vendor house for merchant ${index + 1}`;
          valid = false;
        }

        if (!block.merchant || block.merchant?.length === 0) {
          newErrMsg[`dispatch_package_vendor_id_${index}`] = `Please Select vendor for merchant ${index + 1}`;
          valid = false;
        }
      });
      setErrMsg(newErrMsg);
      if (!valid) {
        return;
      }
      if (deleveryDetails?.dispatch_package_address_id?.length == 0) {
        setErrMsg({
          ...errMsg,
          dispatch_package_address_id: "Please Select customer address ",
        });
        return;
      }
      if (addonSettingData.addon_ghatke == 1) {

        if (!selectedTransportManager) {

          setErrMsg({
            ...errMsg,
            selectedTransportManager: t("Please Select Vehicle Attaindent"),
          });
          return;
        }

      }
    }
    if (form.checkValidity() === false) {
      event.stopPropagation();

      // if(deleveryDetails?.vehicle_type_id?.length !== 0 && deleveryDetails?.dispatch_package_vendor_warehouse_id?.length !==0 &&deleveryDetails?.dispatch_package_address_id?.length !==0&&deleveryDetails?.dispatch_package_vendor_id?.length !==0)
    } else {

      if (/* !multiple_order_flag */ false) {
        var body = JSON.stringify({
          ...deleveryDetails,
          dispatch_package_order_datetime: `${latestDate(
            deleveryDetails?.dispatch_package_order_datetime,
            "yyyy-MM-dd"
          )} T ${deleveryDetails?.time}`,
          timeZone: timeZone,
          dispatch_package_id: paramID,
          activeData: paramID ? activeData : [],
          userId: customerData.User_id,
          dispatch_user_id: selectedTransportManager?.value,


        });
      }

      // Create the orders array by mapping over formBlocks
      else {

        const order_ids = [
          {
            dispatch_package_address_id: deleveryDetails?.dispatch_package_address_id,
            package_type: "drop"
          },
          ...formBlocks.map(block => ({
            dispatch_package_vendor_warehouse_id: block?.warehouse,
            // dispatch_package_vendor_id: block?.merchant,
            // dispatch_package_address_id: deleveryDetails?.dispatch_package_address_id,
            package_type: 'pickup'
          }))
        ];
        var orders = {
          device: "web",
          time: deleveryDetails?.time,
          dispatch_package_order_datetime: deleveryDetails?.dispatch_package_order_datetime,
          vehicle_type_id: deleveryDetails?.vehicle_type_id,
          weight_of_goods: deleveryDetails?.weight_of_goods,
          height: deleveryDetails?.height,
          width: deleveryDetails?.width,
          length: deleveryDetails?.length,
          types_of_goods: deleveryDetails?.types_of_goods,
          number_of_goods: deleveryDetails?.number_of_goods,
          dispatch_package_vendor_warehouse_id: formBlocks[0]?.warehouse,
          dispatch_package_vendor_id: formBlocks[0]?.merchant,
          dispatch_package_customer_id: deleveryDetails?.dispatch_package_customer_id,
          dispatch_package_address_id: deleveryDetails?.dispatch_package_address_id,
          timeZone: "Asia/Kolkata",
          activeData: [],
          userId: "undefined",

          order_ids: order_ids,
        }


        var body = {
          device: "web",
          time: deleveryDetails?.time,
          dispatch_package_order_datetime: deleveryDetails?.dispatch_package_order_datetime,
          vehicle_type_id: deleveryDetails?.vehicle_type_id,
          weight_of_goods: deleveryDetails?.weight_of_goods,
          height: deleveryDetails?.height,
          width: deleveryDetails?.width,
          length: deleveryDetails?.length,
          types_of_goods: deleveryDetails?.types_of_goods,
          number_of_goods: deleveryDetails?.number_of_goods,
          dispatch_package_vendor_warehouse_id: formBlocks[0]?.warehouse,
          dispatch_package_vendor_id: formBlocks[0]?.merchant,
          dispatch_package_customer_id: deleveryDetails?.dispatch_package_customer_id,
          dispatch_package_address_id: deleveryDetails?.dispatch_package_address_id,
          timeZone: "Asia/Kolkata",
          activeData: [],
          userId: "undefined",
          // orders: orders,
          dispatch_user_id: selectedTransportManager?.value ? selectedTransportManager?.value : dispatch_user_id,

          orders: JSON.stringify(order_ids)
        };
        if (paramID) {
          body.dispatch_package_id = paramID;
        }
      }
      console.log('Payload:-->', body); // Log the payload for debugging

      // console.log('body.orders-->', body)

      // simplePostCall(
      //   paramID ? ApiConfig.UPDATE_ORDER : ApiConfig.ADD_ORDER,
      //   body
      // )
      simplePostCall(
        paramID ? ApiConfig.UPDATE_ORDER_NEW : ApiConfig.ADD_ORDER_NEW,
        JSON.stringify(body)
      )



        .then((res) => {
          if (res.result) {
            setDispatchStatus("pending");
            localStorage.setItem("dispatchKey", "pending");
            notifySuccess(res.message);
            navigate("/DispatchOrder");
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

      setLoading(true);
    }
    setValidated(true);
  };




  useEffect(() => {
    if (timeZone) {
      getAllDropDowns();
      const currentTime = new Date()
        .toLocaleTimeString("en-US", { timeZone, hour12: false })
        .split(" ")[0];
      setDeleveryDetails({ ...deleveryDetails, time: currentTime });
    }
  }, [timeZone]);
  useEffect(() => {
    setErrMsg({
      ...errMsg,
      dispatch_package_vendor_warehouse_id: " ",
    });
  }, [deleveryDetails?.dispatch_package_vendor_warehouse_id]);

  useEffect(() => {
    setErrMsg({ ...errMsg, dispatch_package_vendor_id: "" });
    if (paramID) {
      if (deleveryDetails && deleveryDetails?.dispatch_package_vendor_id) {

        let merchent = merchentDropDown?.filter(
          (single) =>
            single?.vendor_id == deleveryDetails?.dispatch_package_vendor_id
        );

        if (merchent && merchent?.length) {
          setwareHouses(
            merchent[0].warehouse != null ? merchent[0].warehouse : []
          );
        }


      }
    } else {

      if (/* true */ formBlocks?.[0]?.merchant /* deleveryDetails && deleveryDetails?.dispatch_package_vendor_id */) {
        let merchent = merchentDropDown?.filter(
          (single) =>
            // single?.vendor_id == deleveryDetails?.dispatch_package_vendor_id
            single?.vendor_id == formBlocks[0]?.merchant
        );

        if (merchent && merchent?.length) {
          setwareHouses(
            merchent[0].warehouse != null ? merchent[0].warehouse : []
          );
        }

      }
    }

    // console.log('warehouse-->',wareHouses)
  }, [deleveryDetails, merchentDropDown, formBlocks]);

  useEffect(() => {
    setErrMsg({ ...errMsg, dispatch_package_vendor_warehouse_id: "" });

    if (paramID) {
      if (deleveryDetails?.dispatch_package_vendor_warehouse_id) {

        let seleWarehouse = wareHouses?.filter(
          (single) =>
            single?.vendor_warehouse_id === deleveryDetails?.dispatch_package_vendor_warehouse_id
        )
        seleWarehouse !== null &&
          setWarehouseAddress(seleWarehouse[0]?.vendor_warehouse_address);

      }

    } else {
      // if (deleveryDetails?.dispatch_package_vendor_warehouse_id) {
      if ( /* true */ formBlocks?.[0]?.warehouse) {
        let seleWarehouse = wareHouses?.filter(
          (single) =>
            // single?.vendor_warehouse_id === deleveryDetails?.dispatch_package_vendor_warehouse_id
            single?.vendor_warehouse_id === formBlocks[0]?.warehouse,
        );

        // seleWarehouse !== null &&
        //   setWarehouseAddress(seleWarehouse[0]?.vendor_warehouse_address);

        // If a matching warehouse is found, update the warehouse address and formBlocks state
        if (seleWarehouse && seleWarehouse?.length > 0) {
          const newWarehouseAddress = seleWarehouse[0]?.vendor_warehouse_address;

          // Set the warehouse address in a state variable if needed
          setWarehouseAddress(newWarehouseAddress);

          // Update formBlocks state with the new pickupAddress
          setFormBlocks((prevBlocks) => {
            const updatedBlocks = prevBlocks.map((block, index) => {
              // Update only the block that has the matching warehouse ID
              if (index === 0) { // Adjust the condition if needed to target the correct block
                return {
                  ...block,
                  pickupAddress: newWarehouseAddress
                };
              }
              return block;
            });
            return updatedBlocks;
          });
        }
      }
    }

  }, [deleveryDetails, wareHouses, formBlocks[0]?.warehouse]);
  useEffect(() => {
    if (deleveryDetails?.dispatch_package_customer_id) {
      let sele = customerDropDown.filter(
        (single) =>
          single?.dispatch_customer_id ===
          deleveryDetails.dispatch_package_customer_id
      );
      sele !== null &&
        setAddressDropdopdown(sele[0]?.dispatch_customer_address);
    }
  }, [deleveryDetails, customerDropDown]);

  useEffect(() => {
    setErrMsg({ ...errMsg, dispatch_package_address_id: "" });
    if (deleveryDetails.dispatch_package_address_id) {
      let sele =
        addressDropdopdown &&
        addressDropdopdown?.filter(
          (single) =>
            single?.dispatch_customer_address_id ===
            deleveryDetails?.dispatch_package_address_id
        );

      sele !== null &&
        sele?.length &&
        setDeleveryAddress(sele[0]?.dispatch_customer_address_address);
    }
  }, [deleveryDetails, addressDropdopdown]);

  const [warehousesArray, setWarehousesArray] = useState([]);

  const getAllDropDowns = () => {
    Promise.all([
      simplePostCall(ApiConfig.MERCHENT_DROPDOWN),
      simplePostCall(ApiConfig.CUSTOMER_DROPDOWN),
      simplePostCall(ApiConfig.VEHICLE_TYPE_DROPDOWN),
    ]).then((res) => {
      if (res?.length) {
        res.map((dropdown, index) => {
          if (dropdown.result) {
            // if (index == 0) setMerchentDropDown(dropdown.data);
            if (index == 0) {

              setMerchentDropDown(dropdown.data);
              // Extract warehouse data
              const warehouseArray = dropdown.data.map(vendor => vendor.warehouse).flat();

              setWarehousesArray(warehouseArray);
              // console.log('warehousesArray-->', warehousesArray)

            }

            else if (index == 1) {
              setCustomerDropDown(dropdown.data);
            } else if (index == 2) {
              setVehicleDropDown(dropdown.data);
            }
          }
        });
      }
    });
  };
  // useEffect(() => {
  //   console.log('warehousesArray-->', warehousesArray);
  // }, [warehousesArray]);

  const handleResetClick = (e, val) => {
    setOption([]);
    setDeleveryDetails({
      dispatch_package_order_datetime: "",
      time: "",
      dispatch_package_vendor_warehouse_id: "",
      dispatch_package_vendor_id: "",
      dispatch_package_customer_id: "",
      dispatch_package_address_id: "",
    });

    setDeleveryAddress("");

    setWarehouseAddress("");
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
          {loading ? (
            <Loader />
          ) : (
            <div className="main-master-wrapper">
              {/* Header section */}
              <div className="header">
                <label className="headerTxt">
                  {paramID ? t("Update Order") : t("Add Order")}
                </label>
              </div>

              {/* COntent section */}
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {deleveryDetails?.dispatch_package_status != 2 && (
                  <>
                    <div className="row vehicleMainRow">
                      <div className="col-md-6 col-sm-12 colForm">
                        <Form.Label>
                          {t("Date")} <span>&#42;</span>
                        </Form.Label>
                        <div className="innerSelectBox weekCounter datepicker-main">
                          {/* <DatePicker placeholderText="Select Date Range..." className="form-control" /> */}
                          <CommonDatePicker
                            dateKey="dispatch_package_order_datetime"
                            setDate={setDeleveryDetails}
                            data={deleveryDetails}
                            minDate={date}
                          />
                          {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                        </div>

                        <Form.Control.Feedback>
                          {t("Add Date")}{" "}
                        </Form.Control.Feedback>
                      </div>
                      <div className="col-md-6 col-sm-12 colForm">
                        <div className="innerSelectBox weekCounter">
                          <label className="dispatchHead">
                            {t("Time")} <span>&#42;</span>
                          </label>
                          <Space>
                            <TimePicker
                              className="form-control carretClass"
                              // placeholder={t("Select Time)}
                              // placeholder=`${t("Select Time)}`
                              size="large"
                              allowClear={true}
                              value={
                                deleveryDetails?.time &&
                                dayjs(deleveryDetails?.time, "HH:mm:ss")
                              }
                              showNow={false}
                              placeholder={t("Select Time")}
                              onChange={(e) => {
                                if (e) {
                                  let time =
                                    e.hour() +
                                    ":" +
                                    e.minute() +
                                    ":" +
                                    e.second();
                                  setDeleveryDetails({
                                    ...deleveryDetails,
                                    time: time,
                                  });
                                } else {
                                  setDeleveryDetails({
                                    ...deleveryDetails,
                                    time: "",
                                  });
                                }
                              }}
                            />
                          </Space>
                        </div>
                        <Form.Control.Feedback>
                          {t("Add Time")}{" "}
                        </Form.Control.Feedback>
                      </div>
                      <div className="col-md-6 col-sm-12 colForm">
                        <Form.Label className="common-labels">
                          {t("Vehicle Type")} <span>&#42;</span>
                        </Form.Label>
                        <CommonSelect
                          setID={true}
                          setterKey={"vehicle_type_id"}
                          setErrMsg={setErrMsg}
                          errMsg={errMsg}
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

                        {errMsg?.vehicle_type_id?.length > 0 && (
                          <span className="text-danger">
                            {errMsg?.vehicle_type_id}
                          </span>
                        )}
                        <Form.Control.Feedback>
                          {t("Please select Vehicle")}
                        </Form.Control.Feedback>
                      </div>

                      <div className="col-md-6 col-sm-12 colForm">
                        <Form.Label className="common-labels">
                          {t("Number of Goods")} <span>(Optional)</span>
                        </Form.Label>
                        <Form.Control
                          /* required */
                          type="text"
                          placeholder={t("please Enter Number of Goods")}
                          value={deleveryDetails?.number_of_goods}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(/[^0-9]/gi, "");
                            setDeleveryDetails({
                              ...deleveryDetails,
                              number_of_goods: valueInput,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("Number of Goods...")}
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    {!addonSettingData.addon_ghatke == 1 && <div className="AddNewForm">
                      <div className="innerWrapper">
                        <div className="FormHeading">
                          <p>{t("Select The Size of Package Item")}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6  form_input_main mb-3">
                          <div className="innerSelectBox weekCounter">
                            <Form.Label className="common-labels">
                              {t("Weight of Goods")}<span>(Optional)</span>
                            </Form.Label>
                            <Form.Control
                              // required
                              type="text"
                              placeholder={t("Please Enter Weight of Goods")}
                              value={deleveryDetails?.weight_of_goods}
                              onChange={(e) => {
                                let value = e.target.value;
                                let valueInput = value.replace(
                                  /[^0-9 A-Za-z]/gi,
                                  ""
                                );
                                setDeleveryDetails({
                                  ...deleveryDetails,
                                  weight_of_goods: valueInput,
                                });
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {t("Weight of Goods...")}
                            </Form.Control.Feedback>
                          </div>
                        </div>
                        <div className="col-md-6  form_input_main mb-3">
                          <div className="innerSelectBox weekCounter">
                            <Form.Label className="common-labels">
                              {t("length (cm)")}<span>(Optional)</span>
                            </Form.Label>
                            <Form.Control
                              // required
                              type="text"
                              placeholder={t("Enter length (cm)...")}
                              value={deleveryDetails?.length}
                              onChange={(e) => {
                                let value = e.target.value;
                                let valueInput = value.replace(
                                  /[^0-9 A-Za-z]/gi,
                                  ""
                                );
                                setDeleveryDetails({
                                  ...deleveryDetails,
                                  length: valueInput,
                                });
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {t("Please Enter length (cm)...")}
                            </Form.Control.Feedback>
                          </div>
                        </div>
                        <div className="col-md-6  form_input_main mb-3">
                          <div className="innerSelectBox weekCounter">
                            <Form.Label className="common-labels">
                              {t("Width (cm)")}<span>(Optional)</span>
                            </Form.Label>
                            <Form.Control
                              // required
                              type="text"
                              placeholder={t("Enter Width (cm)...")}
                              value={deleveryDetails?.width}
                              onChange={(e) => {
                                let value = e.target.value;
                                let valueInput = value.replace(
                                  /[^0-9 A-Za-z]/gi,
                                  ""
                                );
                                setDeleveryDetails({
                                  ...deleveryDetails,
                                  width: valueInput,
                                });
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {t("Please Width (cm)...")}
                            </Form.Control.Feedback>
                          </div>
                        </div>
                        <div className="col-md-6  form_input_main mb-3">
                          <div className="innerSelectBox weekCounter">
                            <Form.Label className="common-labels">
                              {t("Height (cm)")} <span>(Optional)</span>
                            </Form.Label>
                            <Form.Control
                              // required
                              type="text"
                              placeholder={t("Enter Height (cm))...")}
                              value={deleveryDetails?.height}
                              onChange={(e) => {
                                let value = e.target.value;
                                let valueInput = value.replace(
                                  /[^0-9 A-Za-z]/gi,
                                  ""
                                );
                                setDeleveryDetails({
                                  ...deleveryDetails,
                                  height: valueInput,
                                });
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {t("Please Height (cm)...")}
                            </Form.Control.Feedback>
                          </div>
                        </div>
                        <div className="col-md-6  form_input_main mb-3">
                          <div className="innerSelectBox weekCounter">
                            <Form.Label className="common-labels">
                              {t("Types Of Goods")} <span>(Optional)</span>
                            </Form.Label>
                            <Form.Control
                              // required
                              type="text"
                              placeholder={t("Enter Types Of Goods..")}
                              value={deleveryDetails?.types_of_goods}
                              onChange={(e) => {
                                let value = e.target.value;
                                let valueInput = value.replace(
                                  /[^0-9 A-Za-z]/gi,
                                  ""
                                );
                                setDeleveryDetails({
                                  ...deleveryDetails,
                                  types_of_goods: valueInput,
                                });
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {t("Please Types Of Goods.")}
                            </Form.Control.Feedback>
                          </div>
                        </div>
                        {/* ////////////////////added code //////////////////////////////////// */}
                        {/* <div className="col-md-6 col-sm-12 form_input_main">
              <div className="innerSelectBox weekCounter">
                <Form.Label className="common-labels">
                  {" "}
                 {t("Transport Manager")}  <span>&#42;</span>{" "}
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
                      primary75: '#4C9AFF',
                      background: "#8f4300",
                      color: "#8f4300",
                    },
          
          
          
                  })}
                  value={state.selectedTopics}
                  onChange={onTopicChange}
                  placeholder={t("Select")}
                  options={gradeState.grades}
                  isMulti={true}
                />
             
              </div>
            </div> */}
                        {/* { addonSettingData.addon_ghatke == 1 &&
<div className="col-md-6 col-sm-12 form_input_main">
      <div className="innerSelectBox weekCounter">
        <Form.Label className="common-labels">
          {t("Dispatch Executive")} <span>&#42;</span>
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
          value={selectedTransportManager}
     
          onChange={handleTransportManagerChange}
          placeholder={t("Select")}
          options={transportationList}
          isMulti={false}
        />
      </div>
    </div> } */}

                        {/* ///////////////end of added code//////////////////////// */}

                      </div>
                    </div>}

                    <div className="detailsSec">
                      {/* <div className="headerDet">
                   <label className="headerTxtDet">Pick-Up Details</label>
                   <div className="defult_check_address">
                     <div
                       className="form-check form-switch custom_address"
                       id="custom_switch_address"
                     >
                       <input
                         className="form-check-input"
                         type="checkbox"
                         id="defult_Pick"
                         name="address"
                       />
                       <label
                         className="defult-adrs-txt"
                         htmlFor="defult_Pick"
                       >
                         Use Default Address
                       </label>
                     </div>
                   </div>
                 </div> */}
                      {/*  <div className="row">
                       <div className="col-md-6 col-sm-12 colFormDet">
                         <Form.Label className="common-labels">
                           {t("Merchant")}
                         </Form.Label>
                         <CommonSelect
                           setID={true}
                           // selectedValue={option}
                           setterKey={"dispatch_package_vendor_id"}
                           setterFucntions={setDeleveryDetails}
                           selectedValue={
                             deleveryDetails?.dispatch_package_vendor_id
                           }
                           selValue={
                             deleveryDetails?.dispatch_package_vendor_id
                           }
                           data={deleveryDetails}
                           placehold={t("Select")}
                           optionList={merchentDropDown.map((merchent) => ({
                             id: merchent.vendor_id,
                             value: merchent.vendor_id,
                             label: merchent.vendor_name,
                           }))}
                         />
                         {errMsg?.dispatch_package_vendor_id?.length > 0 && (
                           <span className="text-danger">
                             {errMsg?.dispatch_package_vendor_id}
                           </span>
                         )}
                         <Form.Control.Feedback>
                           {t("Please Enter Merchant...")}
                         </Form.Control.Feedback>
                       </div>
                       <div className="col-md-6 col-sm-12 colFormDet">
                         <Form.Label className="common-labels">
                           {t("Warehouse")}
                         </Form.Label>
                         <CommonSelect
                           setterKey={"dispatch_package_vendor_warehouse_id"}
                           setID={true}
                           setterFucntions={setDeleveryDetails}
                           selectedValue={
                             deleveryDetails?.dispatch_package_vendor_warehouse_id
                           }
                           selValue={
                             deleveryDetails?.dispatch_package_vendor_warehouse_id
                           }
                           data={deleveryDetails}
                           placehold={t("Select")}
                           optionList={
                             wareHouses &&
                             wareHouses.map((single) => ({
                               id: single.vendor_warehouse_id,
                               value: single.vendor_warehouse_id,
                               label: single.vendor_warehouse_name,
                             }))
                           }
                         />

                         <Form.Control.Feedback>
                           {t("Please Enter Warehouse...")}
                         </Form.Control.Feedback>
                       </div>
                       <div className="col-md-12 colFormDet">
                         <Form.Label className="common-labels">
                           {t("Pickup Address")}
                         </Form.Label>
                         <SearchFunction  comp={"DeliveryRequest"} setter={setDeleveryDetails} data={deleveryDetails}/> 
                         <Form.Control
                           as="textarea"
                           disabled
                           rows={3}
                           type="text"
                           placeholder={t("Enter Pickup  Address...")}
                           value={warehouseAddress}
                         />
                         {errMsg?.dispatch_package_vendor_warehouse_id?.length >
                           0 && (
                           <span className="text-danger">
                             {errMsg?.dispatch_package_vendor_warehouse_id}
                           </span>
                         )}
                         <Form.Control.Feedback type="invalid">
                           {t("Please Enter Pickup Address......")}
                         </Form.Control.Feedback>
                       </div>
                     </div>
                     */}
                      {/* {console.log('formBlock-->', formBlocks)} */}
                      {false ? <></>
/* edit_merchant_data?.map((detail, index) =>(
  <div className="row" key={index}>
  <div className="col-md-6 col-sm-12 colFormDet">
    <Form.Label className="common-labels">
      {t("Merchant")}
    </Form.Label>
    <CommonSelect
      setID={true}
      setterKey={"dispatch_package_vendor_id"}
      setterFucntions={setDeleveryDetails}
      selectedValue={detail.dispatch_package_vendor_id}
      selValue={detail.dispatch_package_vendor_id}
      data={detail}
      placehold={t("Select")}
      optionList={merchentDropDown.map((merchent) => ({
        id: merchent.vendor_id,
        value: merchent.vendor_id,
        label: merchent.vendor_name,
      }))}
    />
    {errMsg?.dispatch_package_vendor_id?.length > 0 && (
      <span className="text-danger">
        {errMsg?.dispatch_package_vendor_id}
      </span>
    )}
    <Form.Control.Feedback>
      {t("Please Enter Merchant...")}
    </Form.Control.Feedback>
  </div>
  <div className="col-md-6 col-sm-12 colFormDet">
    <Form.Label className="common-labels">
      {t("Warehouse")}
    </Form.Label>
    <CommonSelect
      setterKey={"dispatch_package_vendor_warehouse_id"}
      setID={true}
      setterFucntions={setDeleveryDetails}
      selectedValue={detail.dispatch_package_vendor_warehouse_id}
      selValue={detail.dispatch_package_vendor_warehouse_id}
      data={detail}
      placehold={t("Select")}
      optionList={
        wareHouses &&
        wareHouses.map((single) => ({
          id: single.vendor_warehouse_id,
          value: single.vendor_warehouse_id,
          label: single.vendor_warehouse_name,
        }))
      }
    />
    <Form.Control.Feedback>
      {t("Please Enter Warehouse...")}
    </Form.Control.Feedback>
  </div>
  <div className="col-md-12 colFormDet">
    <Form.Label className="common-labels">
      {t("Pickup Address")}
    </Form.Label>
    <Form.Control
      as="textarea"
      disabled
      rows={3}
      type="text"
      placeholder={t("Enter Pickup Address...")}
      value={detail.vendor_warehouse_address}
    />
    {errMsg?.dispatch_package_vendor_warehouse_id?.length > 0 && (
      <span className="text-danger">
        {errMsg?.dispatch_package_vendor_warehouse_id}
      </span>
    )}
    <Form.Control.Feedback type="invalid">
      {t("Please Enter Pickup Address...")}
    </Form.Control.Feedback>
  </div>
</div>
 )) */: (


                          <div>
                            <div className="d-flex justify-content-end align-items-center">
                              {/* <div className="col-md-2 col-sm-12"> */}
                              <button className="cx-btn-2-add-merchant" type="button" onClick={handleAddBlock}>Add Merchant</button>
                              {/* </div> */}
                            </div>
                            {/* {console.log('wareHouses-->', wareHouses)} */}
                            {/* {console.log('merchentDropDown-->', merchentDropDown)} */}
                            {formBlocks?.map((block, index) => (
                              <div className="row" key={index}>
                                {index !== 0 && (
                                  <div className="d-flex justify-content-end align-items-center">
                                    {/* <div className="col-md-2 col-sm-12"> */}
                                    {formBlocks?.length > 1 && (
                                      <button className="cx-btn-2-add-merchant" type="button" onClick={() => handleDeleteBlock(index)}>Delete Merchant</button>
                                    )}
                                    {/* </div> */}
                                  </div>
                                )}
                                <div className="col-md-6 col-sm-12 colFormDet">
                                  <Form.Label className="common-labels">
                                    {t("Merchant")}
                                  </Form.Label>

                                  <Select
                                    // value={merchentDropDown.find(option => option.vendor_id === block.merchant)}
                                    value={merchentDropDown.find(option => option.vendor_id === block.merchant) ?
                                      {
                                        value: merchentDropDown.find(option => option.vendor_id === block.merchant).vendor_id,
                                        label: merchentDropDown.find(option => option.vendor_id === block.merchant).vendor_name
                                      } : null}

                                    onChange={(option) => handleMerchantChange(option, index)}
                                    options={merchentDropDown.map((merchent) => ({
                                      value: merchent.vendor_id,
                                      label: merchent.vendor_name,
                                    }))}
                                    placeholder={t("Select")}
                                    styles={{
                                      control: (base) => ({
                                        ...base,
                                        color: "#8f4300",
                                        fontSize: 14,
                                        borderRadius: 10,
                                        border: "1px solid #f6efe9",
                                        backgroundColor: "white",
                                        boxShadow: "none",
                                        "&:hover": {
                                          border: "1px solid #f6efe9",
                                        },
                                      }),
                                    }}
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
                                        cursor: "pointer",
                                      },
                                    })}
                                  />
                                  {/* {errMsg?.dispatch_package_vendor_id?.length > 0 && (
              <span className="text-danger">
                {errMsg.dispatch_package_vendor_id}
              </span>
            )} */}
                                  {errMsg[`dispatch_package_vendor_id_${index}`] && !formBlocks?.[index]?.merchant && (
                                    <span className="text-danger">
                                      {errMsg[`dispatch_package_vendor_id_${index}`]}
                                    </span>
                                  )}
                                  <Form.Control.Feedback>
                                    {t("Please Enter Merchant...")}
                                  </Form.Control.Feedback>
                                </div>
                                <div className="col-md-6 col-sm-12 colFormDet">
                                  <Form.Label className="common-labels">
                                    {t("Warehouse")}
                                  </Form.Label>

                                  <Select
                                    // value={wareHouses.find(option => option.vendor_warehouse_id === block.warehouse)}

                                    // value={wareHouses.find(option => option.vendor_warehouse_id === block.warehouse) ? 
                                    value={block?.warehouses?.find(option => option.vendor_warehouse_id === block.warehouse) ?
                                      // {
                                      //     value: wareHouses.find(option => option.vendor_warehouse_id === block.warehouse).vendor_warehouse_id,
                                      //     label: wareHouses.find(option => option.vendor_warehouse_id === block.warehouse).vendor_warehouse_name
                                      //   } : null}
                                      {
                                        value: block.warehouses.find(option => option.vendor_warehouse_id === block.warehouse).vendor_warehouse_id,
                                        label: block.warehouses.find(option => option.vendor_warehouse_id === block.warehouse).vendor_warehouse_name
                                      } : null}
                                    onChange={(option) => handleWarehouseChange(option, index)}
                                    // options={
                                    //   wareHouses && wareHouses.map((single) => ({
                                    //     value: single.vendor_warehouse_id,
                                    //     label: single.vendor_warehouse_name,
                                    //     address : single.vendor_warehouse_address
                                    //   }))
                                    // }
                                    options={block.warehouses.map((single) => ({
                                      value: single.vendor_warehouse_id,
                                      label: single.vendor_warehouse_name,
                                      address: single.vendor_warehouse_address
                                    }))}
                                    placeholder={t("Select")}
                                    styles={{
                                      control: (base) => ({
                                        ...base,
                                        color: "#8f4300",
                                        fontSize: 14,
                                        borderRadius: 10,
                                        border: "1px solid #f6efe9",
                                        backgroundColor: "white",
                                        boxShadow: "none",
                                        "&:hover": {
                                          border: "1px solid #f6efe9",
                                        },
                                      }),
                                    }}
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
                                        cursor: "pointer",
                                      },
                                    })}
                                  />
                                  {errMsg[`dispatch_package_vendor_warehouse_id_${index}`] && !formBlocks?.[index]?.warehouse && (
                                    <span className="text-danger">
                                      {errMsg[`dispatch_package_vendor_warehouse_id_${index}`]}
                                    </span>
                                  )}
                                  <Form.Control.Feedback>
                                    {t("Please Enter Warehouse...")}
                                  </Form.Control.Feedback>
                                </div>
                                <div className="col-md-12 colFormDet">
                                  <Form.Label className="common-labels">
                                    {t("Pickup Address")}
                                  </Form.Label>
                                  <Form.Control
                                    required
                                    className="mt-2 mb-1"
                                    as="textarea"
                                    disabled
                                    rows={3}
                                    type="text"
                                    placeholder={t("Enter Pickup Address...")}
                                    // value={block.pickupAddress}
                                    // value={warehouseAddress}
                                    // value={wareHouses.find(option => option.vendor_warehouse_id === block.warehouse) ? 

                                    //  wareHouses.find(option => option.vendor_warehouse_id === block.warehouse).vendor_warehouse_address
                                    //   : null}
                                    value={block.warehouses.find(option => option.vendor_warehouse_id === block.warehouse) ?
                                      block.warehouses.find(option => option.vendor_warehouse_id === block.warehouse).vendor_warehouse_address
                                      : ''}
                                  />
                                  {/* {errMsg?.dispatch_package_vendor_warehouse_id?.length > 0 && (
              <span className="text-danger">
                {errMsg.dispatch_package_vendor_warehouse_id}
              </span>
            )} */}
                                  {errMsg[`dispatch_package_vendor_warehouse_id_${index}`] && !formBlocks?.[index]?.pickupAddress && (
                                    <span className="text-danger">
                                      {errMsg[`dispatch_package_vendor_warehouse_id_${index}`]}
                                    </span>
                                  )}
                                  <Form.Control.Feedback type="invalid">
                                    {t("Please Enter Pickup Address...")}
                                  </Form.Control.Feedback>
                                </div>
                                {/* {formBlocks?.length > 1 && (
            <div className="col-md-12 colFormDet">
              <button className="cx-btn-2" onClick={() => handleDeleteBlock(index)}>Delete Merchant</button>
            </div>
          )} */}
                              </div>
                            ))}

                          </div>

                        )

                      }
                    </div>
                  </>
                )}

                <div className="detailsSec">
                  <div className="headerDet">
                    <label className="headerTxtDet"> {t("Drop Details")}</label>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12 colFormDet">
                      <Form.Label className="common-labels">
                        {t("Customer")}
                      </Form.Label>
                      <CommonSelect
                        setterKey={"dispatch_package_customer_id"}
                        setID={true}
                        setterFucntions={setDeleveryDetails}
                        selectedValue={
                          deleveryDetails?.dispatch_package_customer_id
                        }
                        selValue={deleveryDetails?.dispatch_package_customer_id}
                        data={deleveryDetails}
                        placehold={t("Select")}
                        optionList={
                          customerDropDown &&
                          customerDropDown?.map((single) => ({
                            id: single.dispatch_customer_id,
                            value: single.dispatch_customer_id,
                            label: single.dispatch_customer_name,
                          }))
                        }
                      />

                      <Form.Control.Feedback>
                        {t("Please Select customer...")}
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 col-sm-12 colFormDet">
                      <Form.Label className="common-labels">
                        {t("Customer Address")}
                      </Form.Label>
                      <CommonSelect
                        setterKey={"dispatch_package_address_id"}
                        setID={true}
                        setterFucntions={setDeleveryDetails}
                        data={deleveryDetails}
                        selectedValue={
                          deleveryDetails?.dispatch_package_address_id
                        }
                        selValue={deleveryDetails?.dispatch_package_address_id}
                        placehold={t("Select")}
                        optionList={
                          addressDropdopdown && addressDropdopdown?.length
                            ? addressDropdopdown.map((single) => ({
                              id: single.dispatch_customer_address_id,
                              value: single.dispatch_customer_address_id,
                              label: single.dispatch_customer_address_address,
                            }))
                            : []
                        }
                      />
                      <Form.Control.Feedback>
                        {t("Please Select customer...")}
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-12 colFormDet">
                      <Form.Label className="common-labels">
                        {t("Delivery Address")}
                      </Form.Label>
                      <Form.Control
                        className="mt-2 mb-1"
                        as="textarea"
                        disabled
                        rows={3}
                        required
                        type="text"
                        placeholder={t("Enter Delivery Address...")}
                        value={deleveryAddress}
                      />
                      {errMsg?.dispatch_package_address_id?.length > 0 && (
                        <span className="text-danger">
                          {errMsg?.dispatch_package_address_id}
                        </span>
                      )}
                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter Delivery Address...")}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                </div>

                {addonSettingData.addon_ghatke == 1 && <div className="AddNewForm">
                  <div className="innerWrapper">
                    <div className="FormHeading">
                      <p>{t("Select The Size of Package Item")}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6  form_input_main mb-3">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Weight of Goods")} <span>(Optional)</span>
                        </Form.Label>
                        <Form.Control
                          // required
                          type="text"
                          placeholder={t("Please Enter Weight of Goods")}
                          value={deleveryDetails?.weight_of_goods}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(
                              /[^0-9 A-Za-z]/gi,
                              ""
                            );
                            setDeleveryDetails({
                              ...deleveryDetails,
                              weight_of_goods: valueInput,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("Weight of Goods...")}
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    <div className="col-md-6  form_input_main mb-3">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("length (cm)")} <span>(Optional)</span>
                        </Form.Label>
                        <Form.Control
                          // required
                          type="text"
                          placeholder={t("Enter length (cm)...")}
                          value={deleveryDetails?.length}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(
                              /[^0-9 A-Za-z]/gi,
                              ""
                            );
                            setDeleveryDetails({
                              ...deleveryDetails,
                              length: valueInput,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("Please Enter length (cm)...")}
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    <div className="col-md-6  form_input_main mb-3">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Width (cm)")} <span>(Optional)</span>
                        </Form.Label>
                        <Form.Control
                          // required
                          type="text"
                          placeholder={t("Enter Width (cm)...")}
                          value={deleveryDetails?.width}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(
                              /[^0-9 A-Za-z]/gi,
                              ""
                            );
                            setDeleveryDetails({
                              ...deleveryDetails,
                              width: valueInput,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("Please Width (cm)...")}
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    <div className="col-md-6  form_input_main mb-3">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Height (cm)")} <span>(Optional)</span>
                        </Form.Label>
                        <Form.Control
                          // required
                          type="text"
                          placeholder={t("Enter Height (cm))...")}
                          value={deleveryDetails?.height}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(
                              /[^0-9 A-Za-z]/gi,
                              ""
                            );
                            setDeleveryDetails({
                              ...deleveryDetails,
                              height: valueInput,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("Please Height (cm)...")}
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    <div className="col-md-6  form_input_main mb-3">
                      <div className="innerSelectBox weekCounter">
                        <Form.Label className="common-labels">
                          {t("Types Of Goods")} <span>(Optional)</span>
                        </Form.Label>
                        <Form.Control
                          // required
                          type="text"
                          placeholder={t("Enter Types Of Goods..")}
                          value={deleveryDetails?.types_of_goods}
                          onChange={(e) => {
                            let value = e.target.value;
                            let valueInput = value.replace(
                              /[^0-9 A-Za-z]/gi,
                              ""
                            );
                            setDeleveryDetails({
                              ...deleveryDetails,
                              types_of_goods: valueInput,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("Please Types Of Goods.")}
                        </Form.Control.Feedback>
                      </div>
                    </div>
                    {/* ////////////////////added code //////////////////////////////////// */}
                    {/* <div className="col-md-6 col-sm-12 form_input_main">
              <div className="innerSelectBox weekCounter">
                <Form.Label className="common-labels">
                  {" "}
                 {t("Transport Manager")}  <span>&#42;</span>{" "}
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
                      primary75: '#4C9AFF',
                      background: "#8f4300",
                      color: "#8f4300",
                    },
          
          
          
                  })}
                  value={state.selectedTopics}
                  onChange={onTopicChange}
                  placeholder={t("Select")}
                  options={gradeState.grades}
                  isMulti={true}
                />
             
              </div>
            </div> */}
                    {addonSettingData.addon_ghatke == 1 && /* userRole === "customer" && */
                      <div className="col-md-6 col-sm-12 form_input_main">
                        <div className="innerSelectBox weekCounter">
                          <Form.Label className="common-labels">
                            {t("Vehicle Attendant")} <span>&#42;</span>
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
                            value={selectedTransportManager}
                            //  label={selectedTransportManager}
                            onChange={handleTransportManagerChange}
                            placeholder={t("Select")}
                            options={transportationList}
                            isMulti={false}
                          />
                          {errMsg?.selectedTransportManager?.length > 0 && !selectedTransportManager && (
                            <span className="text-danger">
                              {errMsg?.selectedTransportManager}
                            </span>
                          )}
                        </div>
                        {/* {console.log('selectedTransportManagerLAST-->', selectedTransportManager)} */}
                      </div>}

                    {/* ///////////////end of added code//////////////////////// */}

                  </div>
                </div>}
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      handleResetClick(e);
                      navigate("/DispatchOrder");
                    }}
                    className="cx-btn-1"
                  >
                    {t("Cancel")}
                  </button>
                  <button className="cx-btn-2" type="submit">
                    {paramID ? t("Update") : t("Submit")}
                  </button>
                </div>
              </Form>
            </div>
          )}
        </div>
      </motion.div>
    </>

  );
};

export default DeliveryRequest;

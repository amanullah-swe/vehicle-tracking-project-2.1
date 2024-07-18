import { React, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { motion } from "framer-motion";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import CommonDatePicker from "../../../sharedComponent/CommonDatePicker";
import { Rate, Space, TimePicker } from "antd";
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
import { json, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { latestDate } from "../../../sharedComponent/common";
import { Button } from "react-bootstrap";
import NoDataComp from "../../../sharedComponent/NoDataComp";

const AddNewOrder = () => {

  const { t, i18n } = useTranslation();
  const isLastRow = sessionStorage.getItem('isLastRow');
  const [auto_fetch_data, set_auto_fetch_data] = useState([]);

  const [invoicePhotosAndOcrData, setInvoicePhotosAndOcrData] = useState([{
    image: null,
    imageOrcData: null,
    filteredItems: [],
    totalValue: 0,
  }]);
  const [invoicePhotos_to_send, setInvoicePhotos_to_send] = useState([]);

  const [secondLoader, setSecondLoader] = useState(false);



  const handleAddPhoto = () => {
    setInvoicePhotosAndOcrData(prev => [...prev, {
      image: null,
      imageOrcData: null,
      filteredItems: [],
    }]);
  };

  const handleDeletePhoto = (index) => {
    if (invoicePhotosAndOcrData.length > 1) { // Prevent deleting the last input
      // console.log("checking handle delete")
      setInvoicePhotosAndOcrData(prev => prev.filter((item, i) => i != index));
    }
  };


  const handleFileChange = (event, index) => {
    const file = event.target.files[0];



    // console.log("checking the handle change");

    // handle the empty image
    if (!file) {
      setInvoicePhotosAndOcrData(prev => {
        const data = [...prev];
        data[index] = {
          image: null,
          imageOrcData: null,
          filteredItems: [],
          totalValue: 0,
          invoiceNo: ""
        }
        return data;
      })
      notifyError("Please upload proper invoice");
      return;
    }

    // check the items is duplicate or not 
    /*let duplicate = false;
    invoicePhotosAndOcrData.forEach((data, index) => {
      const fileName = data.image ? data.image.name : "";
      if (fileName == file.name) {
        duplicate = true;
        return;
      }

    })
    if (duplicate) {
      event.preventDefault();
      event.target.value = null;
      notifyError("Duplicate invoice !");
      return;
    } */
    // console.log(file.name);


    // feth the Ocr data of the image  and the update the state 
    getImageOcr(file, index, event);
  };

  function getImageOcr(img, index, event) {
    setSecondLoader(true)
    // set loader true 
    const formData = new FormData();
    formData.append('img_url', img);

    multipartPostCall(ApiConfig?.GET_INVOIC_DETAILS, formData)
      .then((res) => {
        if (res.success) {
          let totalValue = 0;
          // convert the string to the array of object 
          const itemCodes = res?.invoice?.[0]?.items.map((item) => {
            const splitItems = item.item.split(' ');
            const obj = {
              SrNo: splitItems[0],
              ItemCode: splitItems[1],
              ItemDescription: `${splitItems[2]} ${splitItems[3]}`,
              UM: splitItems[4],
              PONo: splitItems[5],
              SrNo2: splitItems[6],
              Quantity: splitItems[7],
              Rate: splitItems[8]
            }
            // first update the total value 
            totalValue += Number(splitItems[8]);
            // add zeros max at four position
            return obj;
          });
          totalValue = totalValue.toFixed(4);

          const invoiceNo = res.invoice[0]?.SuplrInvNo?.slice(0, -1) ? res.invoice[0]?.SuplrInvNo?.slice(0, -1) : "";

          // console.log("checking item filter ==============", itemCodes);
          setInvoicePhotosAndOcrData(prev => {
            const data = [...prev];
            data[index] = {
              image: img,
              imageOrcData: res,
              filteredItems: itemCodes,
              totalValue,
              invoiceNo,
            }
            return data;
          });

        } else {
          notifyError("Please upload proper invoice");
          event.target.value = null;
          setInvoicePhotosAndOcrData(prev => {
            const data = [...prev];
            data[index] = {
              image: null,
              imageOrcData: null,
              filteredItems: [],
              totalValue: 0,
              invoiceNo: ""
            }
            return data;
          });
        }
      })
      .catch((err) => {
        console?.log(err);
        notifyError("Please upload proper invoice");
        setInvoicePhotosAndOcrData(prev => {
          const data = [...prev];
          data[index] = {
            image: null,
            imageOrcData: null,
            filteredItems: [],
            totalValue: 0,
            invoiceNo: ""
          }
          return data;
        });
      })
      .finally(() => {
        setSecondLoader(false);
      });
  }


  const handelInvoiceTableItemChange = (e, parentIndex, childeIndex) => {
    const { name, value } = e.target;
    // here we go dip into the state for example
    /*[
       {
        fileredItems:[
        {
        spacific itme: and its value;
        }
        
        ]
       }
    ]*/
    setInvoicePhotosAndOcrData(prev => {
      // get all the data 
      const data = [...prev];
      // select the tageted index second data 
      const childData = [...data[parentIndex].filteredItems];
      // get all the data of the second data's targeted items 
      const item = {
        ...childData[childeIndex],
        // modify the specific value 
        [name]: value
      }




      // assige the new item to second data 
      childData[childeIndex] = item;


      // calculate the total value
      let totalValue = 0;

      childData.map((item) => {
        if (item.Rate) {
          totalValue += (Number(item.Rate) * Number(item.Quantity));
        }
      })

      totalValue = totalValue.toFixed(4);

      // assign the second data to the first 
      data[parentIndex] = {
        ...data[parentIndex],
        filteredItems: childData,
        totalValue: totalValue
      }


      // console.log("checking the state update ============", data);
      // assign the modified data to the state
      return data;
    })

    // console.log("checking====name ", name, " vlaue ========= ", value);
  }









  const { sidebar, setSidebar, Dark, setDark, timeZone, setDispatchStatus, is_last_row } = useContext(AppContext);
  const ids = {
    pickup_point_id: localStorage.getItem('pickup_point_id'),
    dispatch_package_id: localStorage.getItem('dispatch_package_id'),
    pickup_point_trip_id: localStorage.getItem('pickup_point_trip_id'),
  }

  // console.log(' ids --->', ids)
  const [dispatch_executive, set_dispatch_executive] = useState(true)
  const [loading, setLoading] = useState(false);

  // console.log("dispatch_package_id : ", ids.dispatch_package_id)
  let newId = useParams();
  let paramID = newId?.id;


  const [deleveryDetails, setDeleveryDetails] = useState({
    device: "web",
    time: dayjs(new Date()).format("HH:mm:ss"),
    dispatch_package_order_datetime: new Date(),
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

  const [deleveryDetails_new, setDeleveryDetails_new] = useState({
    device_new: "web",
    time_new: dayjs(new Date()).format("HH:mm:ss"),
    dispatch_package_order_datetime_new: new Date(),
    milk_run_vehicle_no: "",
    milk_run_vehicle_id: "",
    escort_name: "",
    milk_run_route: "",
    start_km_for_milk_run: "",
    supplier_name: "",
    po_no: "",
    invoice_no: "",
    item_code: "",
    quantity: "",
    basic_value: "",
    value_with_taxes: "",
    photo_of_material: "",
    start_km_supplier: "",
    end_km_supplier: "",
    in_time_supplier: "0",
    out_time_supplier: "0",
    check_in_dispatch_customer: "",
    check_out_dispatch_customer: "",
    end_km_based_location: "",
    km_reading: "",
    material_received_by: "",
    vehicle_utilization: "",
    customer_gate_entery: "",
    description: "",
    remark: "",
    invoice_photo: "",
    material_photo: "",
    gate_pass_photo: "",
    vehicle_weight_slip_photo: "",
    pick_up_address: "",
    delivery_address: "",
    start_trip_with_start_time: "",
    end_trip_with_end_time: "",
  });


  const [activeData, setActiveData] = useState([]);
  const [warehouseAddress, setWarehouseAddress] = useState();
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const [option, setOption] = useState([]);

  const navigate = useNavigate();
  const [wareHouses, setwareHouses] = useState([]);
  const [merchentDropDown, setMerchentDropDown] = useState([]);
  const [customerDropDown, setCustomerDropDown] = useState([]);
  const [vehicleDropDown, setVehicleDropDown] = useState([]);
  const [validated, setValidated] = useState(false);
  const [deleveryAddress, setDeleveryAddress] = useState();
  const [addressDropdopdown, setAddressDropdopdown] = useState([]);
  const [invoice_details, set_invoice_details] = useState([])
  const [invoice_item, set_invoice_item] = useState([])
  const [errMsg, setErrMsg] = useState({
    vehicle_type_id: "",
    dispatch_package_vendor_warehouse_id: "",
    dispatch_package_vendor_id: "",
    // dispatch_package_customer_id: "",
    dispatch_package_address_id: "",
    milk_run_vehicle_no: ''
  });

  useEffect(() => {
    if (paramID) {
      singleListApicall(paramID);
    }
  }, [paramID]);


  useEffect(() => {
    if (invoicePhotos_to_send[0]) {
      const formData = new FormData();
      formData.append('img_url', invoicePhotos_to_send[0]);

      multipartPostCall(ApiConfig?.GET_INVOIC_DETAILS, formData)
        .then((res) => {
          if (res.success) {
            set_invoice_details(res);
            set_invoice_item(res?.invoice?.items);

            console.log('checking t_response ---> ', invoice_details);
            console.log('checking t_invoice_item ---> ', invoice_item);
            var splitItems = res?.invoice?.[0]?.items?.[0]?.item?.split(' ')
            console.log('splitItems-->', splitItems)
            // Accumulate splitItems1[1] values in an array
            const itemCodes = res?.invoice?.[0]?.items.map((item) => {
              const splitItems1 = item.item.split(' ');

              return splitItems1[1];

            });
            const basicValue = res?.invoice?.[0]?.items.map((item) => {
              const splitItems8 = item.item.split(' ');

              return splitItems8[8];

            });



            let basicValueNumber = basicValue?.map(Number);
            let sum = 0;
            console.log('checking basicValue-->', basicValue)
            console.log('checking basicValueNumber-->', basicValueNumber)


            // Running the for loop
            for (let i = 0; i < basicValueNumber?.length; i++) {
              sum += basicValueNumber[i];
            }


            // console.log('sum-->',sum)
            // Join the item codes with a taleeb comma
            const joinedItemCodes = itemCodes.join(', ');

            setDeleveryDetails_new({
              ...deleveryDetails_new,
              invoice_no: res?.invoice?.[0]?.SuplrInvNo,
              po_no: splitItems[5],
              item_code: joinedItemCodes,
              basic_value: sum


            })

            if (res?.data?.length === 0) {
              // set_no_data_found(true);
            }
          }
        })
        .catch((err) => {
          console?.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [invoicePhotos_to_send[0]]);


  const autoFetch = () => {
    let body = JSON.stringify({
      pickup_point_id: ids?.pickup_point_id,
      pickup_point_trip_id: ids?.pickup_point_trip_id
    })
    simplePostCall(ApiConfig.POINT_DETAILS, body)
      .then((res) => {
        if (res.result) {
          set_auto_fetch_data(res.data)

          // console.log("t_res--->", res)
          res?.data[0]?.activity.forEach(activityItem => {
            if (activityItem.dispatch_package_activity_status == "9") {
              setDeleveryDetails_new({
                ...deleveryDetails_new,
                in_time_supplier: activityItem.dispatch_package_activity_time
              });
            }
            if (activityItem.dispatch_package_activity_status == "5") {
              setDeleveryDetails_new({
                ...deleveryDetails_new,
                out_time_supplier: activityItem.dispatch_package_activity_time
              });
            }
          });
          setDeleveryDetails_new({
            ...deleveryDetails_new,
            milk_run_vehicle_no: res?.data[0]?.vehicle_number,
            milk_run_route: res?.data[0]?.pickup_point_name,
            quantity: res?.data[0]?.number_of_goods,
            // in_time_supplier: res?.data[0]?.vendor_warehouse_loading_duration,
            // out_time_supplier: un_loading,
            // check_in_dispatch_customer: res?.data[0]?.dispatch_customer_address_person_name,
            // check_out_dispatch_customer: res?.data[0]?.dispatch_customer_address_person_name,
            end_km_based_location: res?.data[0]?.dispatch_customer_address_address,
            km_reading: res?.data[0]?.pickup_point_distance_from_source,
            end_km_supplier: res?.data[0]?.pickup_point_distance_from_source,
            start_km_supplier: res?.data[0]?.start_km,
            milk_run_vehicle_id: res?.data[0]?.trip_vehicle_id

          })
        } else {
          notifyError(res.message)
        }
      })
      .catch((error) => {
        console.log('t_error ---> ', error)
      })
  }
  useEffect(() => {
    autoFetch();
  }, [])

  const singleListApicall = (paramID) => {
    simpleGetCall(ApiConfig.GET_ORDER_DETAILS + paramID)
      .then((res) => {
        if (res.result) {
          let timeResponse =
            res?.data?.dispatch_package_order_datetime?.split(" ")[1];
          setDeleveryDetails({ ...res?.data, time: timeResponse });
          setActiveData(res?.timeLineData);
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
  /////////////////////////////////////////////Handle Submit Function for dispatch_executive Add New Order Page ////////////////////////////////////////////////////////////////////////////////////////
  // const handleSubmitForDispatch = (event) => {
  //   event.preventDefault();
  //   // console.log("HII Submit function")
  //   const form = event.currentTarget;
  //   /*  if (deleveryDetails_new?.milk_run_vehicle_no?.length === 0) {
  //      setErrMsg({
  //        ...errMsg,
  //        milk_run_vehicle_no: t("Please Select Milk Run Vehicle No"),
  //      });
  //      console.log("errMsg : ", errMsg?.milk_run_vehicle_no  )
  //      return;
  //    }
  //    if (deleveryDetails?.dispatch_package_vendor_warehouse_id?.length == 0) {
  //      setErrMsg({
  //        ...errMsg,
  //        dispatch_package_vendor_warehouse_id: "Please Select vender house ",
  //      });
  //      return;
  //    }
  //    if (deleveryDetails?.dispatch_package_vendor_id?.length == 0) {
  //      setErrMsg({
  //        ...errMsg,
  //        dispatch_package_vendor_id: "Please Select vender ",
  //      });
  //      return;
  //    }

  //    if (deleveryDetails?.dispatch_package_address_id?.length == 0) {
  //      setErrMsg({
  //        ...errMsg,
  //        dispatch_package_address_id: "Please Select customer address ",
  //      });
  //      return;
  //    } */
  //   if (form.checkValidity() === false) {
  //     event.stopPropagation();
  //     // if(deleveryDetails?.vehicle_type_id?.length !== 0 && deleveryDetails?.dispatch_package_vendor_warehouse_id?.length !==0 &&deleveryDetails?.dispatch_package_address_id?.length !==0&&deleveryDetails?.dispatch_package_vendor_id?.length !==0)
  //   } else {
  //     let body = JSON.stringify({
  //       ...deleveryDetails_new,
  //       dispatch_package_order_datetime_new: `${latestDate(
  //         deleveryDetails_new?.dispatch_package_order_datetime_new,
  //         "yyyy-MM-dd"
  //       )} T ${deleveryDetails_new?.time_new}`,
  //       /* timeZone: timeZone,
  //       dispatch_package_id: paramID,
  //       activeData: paramID ? activeData : [], */
  //     });


  //     // calling this function for every image 
  //     const apiCalls = invoicePhotosAndOcrData.map(async (data, index) => {
  //       const items = data?.filteredItems?.map(item => {
  //         return ({
  //           item_code: item.ItemCode,
  //           item_type: '',
  //           item_description: item.ItemDescription, // assuming this is empty in the original data
  //           item_pono: item.PONo,
  //           item_rate: parseFloat(item.Rate),
  //           item_quantity: parseFloat(item.Quantity)
  //         });
  //       })

  //       // console.log("checking the items ======", items);
  //       // calling api for each image data


  //       const tempItem = items[0];
  //       const invoiceNo = data?.invoiceNo;
  //       const PoNo = tempItem.item_pono ? tempItem.item_pono : "";
  //       const item_code = tempItem.item_code ? tempItem.item_code : '';
  //       const item_quantity = tempItem.item_quantity ? tempItem.item_quantity : "";
  //       const item_rate = tempItem.item_rate ? tempItem.item_rate : "";

  //       const formData = new FormData();
  //       formData.append('pickup_point_id', ids?.pickup_point_id);
  //       // formData.append('dispatch_executive_id', 1234567892);
  //       formData.append('vehicle_id', deleveryDetails_new?.milk_run_vehicle_id);
  //       formData.append('pickuppoints_details_route', deleveryDetails_new?.milk_run_route);
  //       formData.append('pickuppoints_details_start_kilometer_milk_run', deleveryDetails_new?.start_km_for_milk_run);
  //       formData.append('pickuppoints_details_po_no', PoNo);
  //       formData.append('pickuppoints_details_invoice_no', invoiceNo);
  //       formData.append('pickuppoints_details_item_code', item_code);
  //       formData.append('pickuppoints_details_quantity', item_quantity);
  //       formData.append('pickuppoints_details_basic_value', item_rate);
  //       formData.append('pickuppoints_details_value_with_taxes', deleveryDetails_new?.value_with_taxes);
  //       formData.append('pickuppoints_details_img_item', deleveryDetails_new?.material_photo);

  //       const filesArray = invoicePhotos_to_send.filter(Boolean);
  //       formData.append('pickuppoints_details_invoice_img', data.image ? data.image : null); // Append each photo to FormData

  //       //       const invoicePhotosToSend = invoicePhotos.filter(photo => photo !== null); // Remove null elements
  //       // invoicePhotosToSend.forEach((photo, index) => {
  //       //   formData.append(`pickuppoints_details_invoice_img[${index}]`, photo); // Append each photo to FormData with an index
  //       // });
  //       // formData.append('pickuppoints_details_invoice_img', invoicePhotos_to_send);
  //       formData.append('pickuppoints_details_vehicle_weight_img', deleveryDetails_new?.vehicle_weight_slip_photo);
  //       formData.append('pickuppoints_details_get_pass_img', deleveryDetails_new?.gate_pass_photo);
  //       formData.append('pickuppoints_details_start_kilometer_supplier', deleveryDetails_new?.start_km_supplier);
  //       formData.append('pickuppoints_details_end_kilometer_supplier', deleveryDetails_new?.end_km_supplier);
  //       formData.append('pickuppoints_details_in_time_supplier', deleveryDetails_new?.in_time_supplier);
  //       formData.append('pickuppoints_details_out_time_supplier', deleveryDetails_new?.out_time_supplier);
  //       formData.append('pickuppoints_details_check_in_dcustomer', deleveryDetails_new?.check_in_dispatch_customer);
  //       formData.append('pickuppoints_details_check_out_dcustomer', deleveryDetails_new?.check_out_dispatch_customer);
  //       formData.append('pickuppoints_details_end_kilometer_based_location', deleveryDetails_new?.end_km_based_location);
  //       formData.append('pickuppoints_details_kilometer_reading', deleveryDetails_new?.km_reading);
  //       formData.append('pickuppoints_details_received_by', deleveryDetails_new?.material_received_by);
  //       formData.append('pickuppoints_details_vehicle_utilization', deleveryDetails_new?.vehicle_utilization);
  //       formData.append('pickuppoints_details_gate_entry', deleveryDetails_new?.customer_gate_entery);
  //       formData.append('pickuppoints_details_item_desc', deleveryDetails_new?.description);
  //       formData.append('pickuppoints_details_item_remark', deleveryDetails_new?.remark);
  //       formData.append('pickuppoints_details_trip_id', ids?.pickup_point_trip_id);
  //       formData.append('pickuppoints_details_dispatch_id', ids?.dispatch_package_id);
  //       formData.append("items", JSON.stringify(items));

  //       // return multipartPostCall(
  //       //   paramID ? ApiConfig.UPDATE_ORDER : ApiConfig.GET_POST_DISPATCHEXECUTIVE_NEW_ORDER,
  //       //   formData
  //       // )
  //       // .then((res) => {
  //       //   if (res.result) {
  //       //     setDispatchStatus("pending");
  //       //     localStorage.setItem("dispatchKey", "pending");
  //       //     // if (index === invoicePhotosAndOcrData?.length - 1) {
  //       //     // } // navigate("/ViewDispatchTrip");
  //       //     notifySuccess(res.message);
  //       //     navigate("/TripManagement");
  //       //   } else {
  //       //     notifyError(res.message);
  //       //   }
  //       // })
  //       // .catch((errr) => {
  //       //   console.log("errr", errr);
  //       // })
  //       // .finally(() => {
  //       //   setLoading(false);
  //       // });

  //       return await fetch(paramID ? ApiConfig.UPDATE_ORDER : ApiConfig.GET_POST_DISPATCHEXECUTIVE_NEW_ORDER, {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           //'Content-Type': 'multipart/form-data',
  //           Authorization: localStorage.getItem("api_key"),
  //           user_customer_id: localStorage.getItem("customer_id"),
  //           user_id: localStorage.getItem("id")
  //         },
  //         body: formData,
  //       })
  //     })

  //     console.log("checking the api calls", apiCalls);
  //     // Promise.all(apiCalls).then((res) => {
  //     //   console.log(res);
  //     //   console.log("api is success")

  //     // })
  //     //   .catch((err) => {
  //     //     console.log(err)
  //     //     console.log("api is failed")
  //     //   })
  //     // setLoading(true);
  //   }
  //   setValidated(true);
  // };
  const handleSubmitForDispatch = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    // setLoading(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setLoading(true);
      let body = JSON.stringify({
        ...deleveryDetails_new,
        dispatch_package_order_datetime_new: `${latestDate(
          deleveryDetails_new?.dispatch_package_order_datetime_new,
          "yyyy-MM-dd"
        )} T ${deleveryDetails_new?.time_new}`,
      });

      const apiCalls = invoicePhotosAndOcrData.map(async (data, index) => {
        const items = data?.filteredItems?.map(item => ({
          item_code: item.ItemCode,
          item_type: '',
          item_description: item.ItemDescription,
          item_pono: item.PONo,
          item_rate: parseFloat(item.Rate),
          item_quantity: parseFloat(item.Quantity),
          item_um: item.UM
        }));

        const tempItem = items[0];
        const invoiceNo = data?.invoiceNo;
        const PoNo = tempItem.item_pono ? tempItem.item_pono : "";
        const item_code = tempItem.item_code ? tempItem.item_code : '';
        const item_quantity = tempItem.item_quantity ? tempItem.item_quantity : "";
        const item_rate = tempItem.item_rate ? tempItem.item_rate : "";

        const formData = new FormData();
        formData.append('pickup_point_id', ids?.pickup_point_id);
        formData.append('vehicle_id', deleveryDetails_new?.milk_run_vehicle_id);
        formData.append('pickuppoints_details_route', deleveryDetails_new?.milk_run_route);
        formData.append('pickuppoints_details_start_kilometer_milk_run', deleveryDetails_new?.start_km_for_milk_run);
        formData.append('pickuppoints_details_po_no', PoNo);
        formData.append('pickuppoints_details_invoice_no', invoiceNo);
        formData.append('pickuppoints_details_item_code', item_code);
        formData.append('pickuppoints_details_quantity', item_quantity);
        formData.append('pickuppoints_details_basic_value', item_rate);
        formData.append('pickuppoints_details_value_with_taxes', deleveryDetails_new?.value_with_taxes);
        formData.append('pickuppoints_details_img_item', deleveryDetails_new?.material_photo);
        formData.append('pickuppoints_details_invoice_img', data.image ? data.image : null);
        formData.append('pickuppoints_details_vehicle_weight_img', deleveryDetails_new?.vehicle_weight_slip_photo);
        formData.append('pickuppoints_details_get_pass_img', deleveryDetails_new?.gate_pass_photo);
        formData.append('pickuppoints_details_start_kilometer_supplier', deleveryDetails_new?.start_km_supplier);
        formData.append('pickuppoints_details_end_kilometer_supplier', deleveryDetails_new?.end_km_supplier);
        formData.append('pickuppoints_details_in_time_supplier', deleveryDetails_new?.in_time_supplier);
        formData.append('pickuppoints_details_out_time_supplier', deleveryDetails_new?.out_time_supplier);
        formData.append('pickuppoints_details_check_in_dcustomer', deleveryDetails_new?.check_in_dispatch_customer);
        formData.append('pickuppoints_details_check_out_dcustomer', deleveryDetails_new?.check_out_dispatch_customer);
        formData.append('pickuppoints_details_end_kilometer_based_location', deleveryDetails_new?.end_km_based_location);
        formData.append('pickuppoints_details_kilometer_reading', deleveryDetails_new?.km_reading);
        formData.append('pickuppoints_details_received_by', deleveryDetails_new?.material_received_by);
        formData.append('pickuppoints_details_vehicle_utilization', deleveryDetails_new?.vehicle_utilization);
        formData.append('pickuppoints_details_gate_entry', deleveryDetails_new?.customer_gate_entery);
        formData.append('pickuppoints_details_item_desc', deleveryDetails_new?.description);
        formData.append('pickuppoints_details_item_remark', deleveryDetails_new?.remark);
        formData.append('pickuppoints_details_trip_id', ids?.pickup_point_trip_id);
        formData.append('pickuppoints_details_dispatch_id', ids?.dispatch_package_id);
        formData.append("items", JSON.stringify(items));

        return await fetch(paramID ? ApiConfig.UPDATE_ORDER : ApiConfig.GET_POST_DISPATCHEXECUTIVE_NEW_ORDER, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: localStorage.getItem("api_key"),
            user_customer_id: localStorage.getItem("customer_id"),
            user_id: localStorage.getItem("id")
          },
          body: formData,
        }).then(response => response.text())
          .then(result => getResult(result));
      });

      try {
        const results = await Promise.all(apiCalls);

        const allSuccessful = results.every(res => res.result);

        if (allSuccessful) {
          setDispatchStatus("pending");
          localStorage.setItem("dispatchKey", "pending");
          notifySuccess("On Trip stop add details successfully");
          navigate("/TripManagement");
        } else {
          const failedResults = results.filter(res => !res.result);
          notifyError("Something went wrong.");
        }
      } catch (error) {
        notifyError('Something went wrong.');
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    setValidated(true);
  };

  async function getResult(data) {
    return JSON.parse(data.trim());
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (deleveryDetails?.vehicle_type_id?.length === 0) {
      setErrMsg({
        ...errMsg,
        vehicle_type_id: t("Please Select Vehicle"),
      });
      return;
    }
    if (deleveryDetails?.dispatch_package_vendor_warehouse_id?.length == 0) {
      setErrMsg({
        ...errMsg,
        dispatch_package_vendor_warehouse_id: "Please Select vender house ",
      });
      return;
    }
    if (deleveryDetails?.dispatch_package_vendor_id?.length == 0) {
      setErrMsg({
        ...errMsg,
        dispatch_package_vendor_id: "Please Select vender ",
      });
      return;
    }

    if (deleveryDetails?.dispatch_package_address_id?.length == 0) {
      setErrMsg({
        ...errMsg,
        dispatch_package_address_id: "Please Select customer address ",
      });
      return;
    }
    if (form.checkValidity() === false) {
      event.stopPropagation();

      // if(deleveryDetails?.vehicle_type_id?.length !== 0 && deleveryDetails?.dispatch_package_vendor_warehouse_id?.length !==0 &&deleveryDetails?.dispatch_package_address_id?.length !==0&&deleveryDetails?.dispatch_package_vendor_id?.length !==0)
    } else {
      let body = JSON.stringify({
        ...deleveryDetails,
        dispatch_package_order_datetime: `${latestDate(
          deleveryDetails?.dispatch_package_order_datetime,
          "yyyy-MM-dd"
        )} T ${deleveryDetails?.time}`,
        timeZone: timeZone,
        dispatch_package_id: paramID,
        activeData: paramID ? activeData : [],
      });
      simplePostCall(
        paramID ? ApiConfig.UPDATE_ORDER : ApiConfig.ADD_ORDER,
        body
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
  }, [deleveryDetails, merchentDropDown]);

  useEffect(() => {
    setErrMsg({ ...errMsg, dispatch_package_vendor_warehouse_id: "" });

    if (deleveryDetails?.dispatch_package_vendor_warehouse_id) {
      let seleWarehouse = wareHouses?.filter(
        (single) =>
          single?.vendor_warehouse_id ===
          deleveryDetails?.dispatch_package_vendor_warehouse_id
      );

      seleWarehouse !== null &&
        setWarehouseAddress(seleWarehouse[0]?.vendor_warehouse_address);
    }
  }, [deleveryDetails, wareHouses]);
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

  const getAllDropDowns = () => {
    Promise.all([
      simplePostCall(ApiConfig.MERCHENT_DROPDOWN),
      simplePostCall(ApiConfig.CUSTOMER_DROPDOWN),
      simplePostCall(ApiConfig.VEHICLE_TYPE_DROPDOWN),
    ]).then((res) => {
      if (res.length) {
        res.map((dropdown, index) => {
          if (dropdown.result) {
            if (index == 0) setMerchentDropDown(dropdown.data);
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


  const handleInvoiceChange = (e, index) => {
    setInvoicePhotosAndOcrData(prev => {
      const data = [...prev];
      const item = {
        ...data[index],
        invoiceNo: e.target.value
      }
      data[index] = {
        ...item
      }
      return data;
    })
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
        <div id="cx-wrapper" className="vehicle_Booking">
          {loading ? (
            <Loader />
          ) : (
            <div className="main-master-wrapper">
              {/* Header section */}

              <div className="header">
                <label className="headerTxt">
                  {paramID ? t("Update pickup location") : t("Add pickup location")}
                </label>
              </div>
              {/* COntent section */}
              <div className="row">
                <Form noValidate validated={validated} onSubmit={handleSubmitForDispatch}>
                  {deleveryDetails?.dispatch_package_status != 2 && (
                    <>
                      <div className="AddNewForm">
                        <div className="innerWrapper">
                          <div className="FormHeading">
                            <p>{t("Upload Photos")}</p>
                          </div>
                        </div>


                        {/* <div className="col-12 form_input_main"> */}
                        <Form.Label className="common-labels ms-2">
                          {t("Invoice Photos")}
                        </Form.Label>

                        {invoicePhotosAndOcrData.map((data, index) => (
                          <div className="col-12 d-md-flex" key={index} /*style={{ display: 'flex'
        }} */>
                            <div className="col-md-6 col-9 ">
                              <Form.Control
                                required
                                accept="image/png,image/jpeg"
                                type="file"
                                placeholder="Browse Image"
                                name={`invoice_photo_${index}`} // Use unique name for each input
                                onChange={(event) => handleFileChange(event, index)}
                              />

                            </div>
                            <div className="col-md-2 col-3">
                              {invoicePhotosAndOcrData.length > 1 && index > 0 ? ( // Show delete button only for additional inputs
                                <Button className=" btn-sm btn-dark" type="button" size="small" onClick={() => handleDeletePhoto(index)} style={{ backgroundColor: '#9C4900' }}>
                                  Delete
                                </Button>
                              ) : invoicePhotosAndOcrData.length > 0 && (
                                <Button className="btn btn-sm btn-dark" type="button" size="small" onClick={handleAddPhoto} style={{ backgroundColor: '#9C4900' }}>
                                  Add
                                </Button>
                              )}
                            </div>
                            <div className="col-md-4 col-6">
                              {data.image && (
                                <img
                                  style={{ width: '9rem', height: '5rem', marginLeft: '1rem' }}
                                  src={URL.createObjectURL(data.image)}
                                  alt={`Invoice Photo ${index + 1}`}
                                />
                              )}
                            </div>

                          </div>
                        ))}

                        {/* </div> */}


                        {/* <div className="col-md-4 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Invoice Photo")}
                      </Form.Label>
                      <Form.Control
                      required
                        accept="image/png, image/gif, image/jpeg"
                        type="file"
                        placeholder="Browse"
                        name="invoice_photo"
                        onChange={(e) => {
                          setDeleveryDetails_new({
                            ...deleveryDetails_new,
                            invoice_photo: e.target.files[0],
                          });
                        }}
                      />
                      {deleveryDetails_new?.invoice_photo && (
                        <img
                          style={{
                            width: "9rem",
                            height: "5rem",
                            marginTop: "1rem",
                            objectFit: "cover",
                          }}
                          src={
                            typeof deleveryDetails_new?.invoice_photo ===
                            "string"
                              ? `${ApiConfig.BASE_URL}${deleveryDetails_new?.invoice_photo}`
                              : deleveryDetails_new?.invoice_photo &&
                                URL.createObjectURL(
                                  deleveryDetails_new?.invoice_photo
                                )
                          }
                          alt="img not found"
                        />
                      )}
                       <Form.Control.Feedback type="invalid">
                    {t("Please Enter Invoice Image")}
                  </Form.Control.Feedback>
                    </div> */}
                        <div className="col-12 form_input_main">
                          <Form.Label className="common-labels">
                            {t("Material Photo")}
                          </Form.Label>
                          <div className="col-6 form_input_main">



                            <Form.Control className=""
                              required
                              accept="image/png, image/gif, image/jpeg"
                              type="file"
                              placeholder="Browse"
                              name="material_photo"
                              onChange={(e) => {
                                setDeleveryDetails_new({
                                  ...deleveryDetails_new,
                                  material_photo: e.target.files[0],
                                });
                              }}
                            />

                            {deleveryDetails_new?.material_photo && (
                              <img
                                style={{
                                  width: "9rem",
                                  height: "5rem",
                                  marginTop: "1rem",
                                  objectFit: "cover",
                                }}
                                src={
                                  typeof deleveryDetails_new?.material_photo ===
                                    "string"
                                    ? `${ApiConfig.BASE_URL}${deleveryDetails_new?.material_photo}`
                                    : deleveryDetails_new?.material_photo &&
                                    URL?.createObjectURL(
                                      deleveryDetails_new?.material_photo
                                    )
                                }
                                alt="img not found"
                              />
                            )}

                            {/*  <Form.Control.Feedback type="invalid">
                    {t("Please Enter Material Image")}
                  </Form.Control.Feedback> */}
                          </div>
                        </div>
                        {/* <div className="col-md-4 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Gate Pass")}
                      </Form.Label>
                      <Form.Control
                      required
                        accept="image/png, image/gif, image/jpeg"
                        type="file"
                        placeholder="Browse"
                        name="gate_pass_photo"
                        onChange={(e) => {
                          setDeleveryDetails_new({
                            ...deleveryDetails_new,
                            gate_pass_photo: e.target.files[0],
                          });
                        }}
                      />

                      {deleveryDetails_new?.gate_pass_photo && (
                        <img
                          style={{
                            width: "9rem",
                            height: "5rem",
                            marginTop: "1rem",
                            objectFit: "cover",
                          }}
                          src={
                            typeof deleveryDetails_new?.gate_pass_photo ===
                            "string"
                              ? `${ApiConfig.BASE_URL}${deleveryDetails_new?.gate_pass_photo}`
                              : deleveryDetails_new?.gate_pass_photo &&
                                URL.createObjectURL(
                                  deleveryDetails_new?.gate_pass_photo
                                )
                          }
                          alt="img not found"
                        />
                      )}
                       <Form.Control.Feedback type="invalid">
                    {t("Please Enter Gate Pass Image.")}
                  </Form.Control.Feedback>
                    </div> */}


                      </div>
                      {/* </div> */}
                      <div className="row vehicleMainRow">
                        <div className="col-md-6 col-sm-12 colForm">
                          <Form.Label>
                            {t("Material Collection Date")} <span>&#42;</span>
                          </Form.Label>
                          <div className="innerSelectBox weekCounter datepicker-main">
                            {/* <DatePicker placeholderText="Select Date Range..." className="form-control" /> */}
                            <CommonDatePicker
                              keyDisable={true}
                              dateKey="dispatch_package_order_datetime_new"
                              setDate={setDeleveryDetails_new}
                              data={deleveryDetails_new}
                              minDate={date}
                              dataDisbal={date}
                            />
                            {/* <img src={Calendar} className="calendarLogo" alt="" /> */}
                          </div>

                          <Form.Control.Feedback>
                            {t("Add Date")}{" "}
                          </Form.Control.Feedback>
                        </div>
                        {/* <div className="col-md-6 col-sm-12 colForm">
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
                </div> */}

                        <div className="col-md-6 col-sm-12 colForm">
                          <Form.Label className="common-labels">
                            {t("Milk Run Vehicle No.")}
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={t("Please Enter Milk Run Vehicle No.")}
                            value={deleveryDetails_new?.milk_run_vehicle_no}
                            // value={auto_fetch_data[0].trip_vehicle_id }
                            onChange={(e) => {
                              let value = e.target.value;
                              // let valueInput = value.replace(/[^0-9]/gi, "");
                              let valueInput = value.replace(
                                /[^0-9 A-Za-z]/gi,
                                ""
                              );
                              setDeleveryDetails_new({
                                ...deleveryDetails_new,
                                milk_run_vehicle_no: valueInput,
                              });
                            }}
                          />
                          {/* {console.log("oooo---> ", auto_fetch_data)} */}

                          {errMsg?.milk_run_vehicle_no.length > 0 && (
                            <span className="text-danger">
                              {errMsg?.milk_run_vehicle_no}
                            </span>
                          )}
                          <Form.Control.Feedback type="invalid">
                            {t("Please Enter Milk Run Vehicle No.")}
                          </Form.Control.Feedback>
                        </div>

                        {/* <div className="col-md-6  form_input_main mb-3">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Escort Name")}
                      </Form.Label>
                      <Form.Control
                        // required
                        type="text"
                        placeholder={t("Enter Escort Name...")}
                        value={deleveryDetails_new?.escort_name}
                        onChange={(e) => {
                          let value = e.target.value;
                          let valueInput = value.replace(
                            /[^0-9 A-Za-z]/gi,
                            ""
                          );
                          setDeleveryDetails_new({
                            ...deleveryDetails_new,
                            escort_name: valueInput,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter Escort Name.")}
                      </Form.Control.Feedback>
                    </div>
                  </div> */}
                        <div className="col-md-6 col-sm-12 colForm">
                          <Form.Label className="common-labels">
                            {t("Milk Run Route")}
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={t("Enter Milk Run Route...")}
                            value={deleveryDetails_new?.milk_run_route}
                            onChange={(e) => {
                              let value = e.target.value;
                              let valueInput = value.replace(
                                /[^0-9 A-Za-z]/gi,
                                ""
                              );
                              setDeleveryDetails_new({
                                ...deleveryDetails_new,
                                milk_run_route: valueInput,
                              });
                            }}
                          />


                          <Form.Control.Feedback type="invalid">
                            {t("Please Enter Milk Run Route")}
                          </Form.Control.Feedback>
                        </div>


                        <div className="col-md-6 col-sm-12 colForm">
                          <Form.Label className="common-labels">
                            {t("Start KM For Milk Run.")}
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={t("Please Enter Start KM For Milk Run...")}
                            value={deleveryDetails_new?.start_km_for_milk_run}
                            onChange={(e) => {
                              let value = e.target.value;
                              let valueInput = value.replace(/[^0-9]/gi, "");
                              setDeleveryDetails_new({
                                ...deleveryDetails_new,
                                start_km_for_milk_run: valueInput,
                              });
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {t("Please Enter Start KM For Milk Run.")}
                          </Form.Control.Feedback>
                        </div>

                        {/*   <div className="col-md-6  form_input_main mb-3">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("Supplier Name")}
                      </Form.Label>
                      <Form.Control
                        // required
                        type="text"
                        placeholder={t("Enter Supplier Name...")}
                        value={deleveryDetails_new?.supplier_name}
                        onChange={(e) => {
                          let value = e.target.value;
                          let valueInput = value.replace(
                            /[^0-9 A-Za-z]/gi,
                            ""
                          );
                          setDeleveryDetails_new({
                            ...deleveryDetails_new,
                            supplier_name: valueInput,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("Please Enter Supplier Name.")}
                      </Form.Control.Feedback>
                    </div>
                  </div> */}
                        {/* 
                        <div className="col-md-6 col-sm-12 colForm">

                          <Form.Label className="common-labels">
                            {t("PO No.")}
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder={t("Enter PO No...")}
                            value={deleveryDetails_new?.po_no}
                            onChange={(e) => {
                              let value = e.target.value;
                              let valueInput = value.replace(
                                /[^0-9 A-Za-z]/gi,
                                ""
                              );
                              setDeleveryDetails_new({
                                ...deleveryDetails_new,
                                po_no: valueInput,
                              });
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {t("Please Enter PO No.")}
                          </Form.Control.Feedback>
                        </div> */}

                        {/* 
                        <div className="col-md-6  form_input_main mb-3">
                          <div className="innerSelectBox weekCounter">
                            <Form.Label className="common-labels">
                              {t("Invoice No.")}
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder={t("Enter Invoice No...")}
                              value={deleveryDetails_new?.invoice_no}
                              onChange={(e) => {
                                let value = e.target.value;
                                let valueInput = value.replace(
                                  /[^0-9 A-Za-z]/gi,
                                  ""
                                );
                                setDeleveryDetails_new({
                                  ...deleveryDetails_new,
                                  invoice_no: valueInput,
                                });
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {t("Please Enter Invoice No.")}
                            </Form.Control.Feedback>
                          </div>
                        </div> */}

                        {/* <div className="col-md-6  form_input_main mb-3">
                          <div className="innerSelectBox weekCounter">
                            <Form.Label className="common-labels">
                              {t("Item Code")}
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder={t("Enter Item Code...")}
                              value={deleveryDetails_new?.item_code}
                              onChange={(e) => {
                                let value = e.target.value;
                                let valueInput = value.replace(
                                  /[^0-9 A-Za-z]/gi,
                                  ""
                                );
                                setDeleveryDetails_new({
                                  ...deleveryDetails_new,
                                  item_code: valueInput,
                                });
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {t("Please Enter Item Code.")}
                            </Form.Control.Feedback>
                          </div>
                        </div> */}

                        {/* <div className="col-md-6  form_input_main mb-3">
                          <div className="innerSelectBox weekCounter">
                            <Form.Label className="common-labels">
                              {t("Quantity.")}
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder={t("Enter Quantity...")}
                              value={deleveryDetails_new?.quantity}
                              onChange={(e) => {
                                let value = e.target.value;
                                let valueInput = value.replace(
                                  /[^0-9 A-Za-z]/gi,
                                  ""
                                );
                                setDeleveryDetails_new({
                                  ...deleveryDetails_new,
                                  quantity: valueInput,
                                });
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {t("Please Enter Quantity.")}
                            </Form.Control.Feedback>
                          </div>
                        </div> */}

                        {/* <div className="col-md-6  form_input_main mb-3">
                          <div className="innerSelectBox weekCounter">
                            <Form.Label className="common-labels">
                              {t("Basic Value.")}
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder={t("Enter Basic Value...")}
                              value={deleveryDetails_new?.basic_value}
                              onChange={(e) => {
                                let value = e.target.value;
                                let valueInput = value.replace(
                                  /[^0-9 A-Za-z]/gi,
                                  ""
                                );
                                setDeleveryDetails_new({
                                  ...deleveryDetails_new,
                                  basic_value: valueInput,
                                });
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {t("Please Enter Basic Value.")}
                            </Form.Control.Feedback>
                          </div>
                        </div> */}

                        <div className="col-md-6  form_input_main mb-3">
                          <div className="innerSelectBox weekCounter">
                            <Form.Label className="common-labels">
                              {t("Value With Taxes.")}
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder={t("Enter Value With Taxes...")}
                              value={deleveryDetails_new?.value_with_taxes}
                              onChange={(e) => {
                                let value = e.target.value;
                                let valueInput = value.replace(
                                  /[^0-9 A-Za-z]/gi,
                                  ""
                                );
                                setDeleveryDetails_new({
                                  ...deleveryDetails_new,
                                  value_with_taxes: valueInput,
                                });
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {t("Please Enter Value With Taxes.")}
                            </Form.Control.Feedback>
                          </div>
                        </div>
                        {/* <div className="col-md-6 form_input_main">
                      <Form.Label className="common-labels">
                        {t("Photo Of Material")}
                      </Form.Label>
                      <Form.Control
                        accept="image/png, image/gif, image/jpeg"
                        type="file"
                        placeholder="Browse"
                        name="photo_of_material"
                        onChange={(e) => {
                          setDeleveryDetails_new({
                            ...deleveryDetails_new,
                            photo_of_material: e.target.files[0],
                          });
                        }}
                      />

                      {deleveryDetails_new?.photo_of_material && (
                        <img
                          style={{
                            width: "9rem",
                            height: "5rem",
                            marginTop: "1rem",
                            objectFit: "cover",
                          }}
                          src={
                            typeof deleveryDetails_new?.photo_of_material ===
                            "string"
                              ? `${ApiConfig.BASE_URL}${deleveryDetails_new?.photo_of_material}`
                              : deleveryDetails_new?.photo_of_material &&
                                URL.createObjectURL(
                                  deleveryDetails_new?.photo_of_material
                                )
                          }
                          alt="img not found"
                        />
                      )}
                    </div> */}


                        <div className="col-md-6  form_input_main mb-3">
                          <div className="innerSelectBox weekCounter">
                            <Form.Label className="common-labels">
                              {t("Start KM Supplier")}
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder={t("Enter Start KM Supplier...")}
                              value={deleveryDetails_new?.start_km_supplier}
                              onChange={(e) => {
                                let value = e.target.value;
                                let valueInput = value.replace(
                                  /[^0-9 A-Za-z]/gi,
                                  ""
                                );
                                setDeleveryDetails_new({
                                  ...deleveryDetails_new,
                                  start_km_supplier: valueInput,
                                });
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {t("Please Enter Start KM Supplier.")}
                            </Form.Control.Feedback>
                          </div>
                        </div>

                        <div className="col-md-6  form_input_main mb-3">
                          <div className="innerSelectBox weekCounter">
                            <Form.Label className="common-labels">
                              {t("End KM Supplier")}
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder={t("Enter End KM Supplier...")}
                              value={deleveryDetails_new?.end_km_supplier}
                              onChange={(e) => {
                                let value = e.target.value;
                                let valueInput = value.replace(
                                  /[^0-9 A-Za-z]/gi,
                                  ""
                                );
                                setDeleveryDetails_new({
                                  ...deleveryDetails_new,
                                  end_km_supplier: valueInput,
                                });
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {t("Please Enter End KM Supplier.")}
                            </Form.Control.Feedback>
                          </div>
                        </div>

                        <div className="col-md-6  form_input_main mb-3">
                          <div className="innerSelectBox weekCounter">
                            <Form.Label className="common-labels">
                              {t("In Time Supplier")}
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder={t("Enter In Time Supplier...")}
                              value={deleveryDetails_new?.in_time_supplier}
                              onChange={(e) => {
                                let value = e.target.value;
                                let valueInput = value.replace(
                                  /[^0-9 A-Za-z :]/gi,
                                  ""
                                );
                                setDeleveryDetails_new({
                                  ...deleveryDetails_new,
                                  in_time_supplier: valueInput,
                                });
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {t("Please Enter In Time Supplier.")}
                            </Form.Control.Feedback>
                          </div>
                        </div>

                        <div className="col-md-6  form_input_main mb-3">
                          <div className="innerSelectBox weekCounter">
                            <Form.Label className="common-labels">
                              {t("Out Time Supplier")}
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder={t("Enter Out Time Supplier...")}
                              value={deleveryDetails_new?.out_time_supplier}
                              onChange={(e) => {
                                let value = e.target.value;
                                let valueInput = value.replace(
                                  /[^0-9 A-Za-z :]/gi,
                                  ""
                                );
                                setDeleveryDetails_new({
                                  ...deleveryDetails_new,
                                  out_time_supplier: valueInput,
                                });
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {t("Please Enter Out Time Supplier.")}
                            </Form.Control.Feedback>
                          </div>
                        </div>




                        {isLastRow == 1 ? (<>
                          <div className="col-md-6  form_input_main mb-3">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("Check In Dispatch Customer")}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder={t("Enter Check In Dispatch Customer...")}
                                value={deleveryDetails_new?.check_in_dispatch_customer}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  // let valueInput = value.replace(
                                  //   /[^0-9 A-Za-z]/gi,
                                  //   ""
                                  // );
                                  setDeleveryDetails_new({
                                    ...deleveryDetails_new,
                                    check_in_dispatch_customer: value,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                {t("Please Enter Check In Dispatch Customer.")}
                              </Form.Control.Feedback>
                            </div>
                          </div>

                          <div className="col-md-6  form_input_main mb-3">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("Check Out Dispatch Customer")}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder={t("Enter Check Out Dispatch Customer...")}
                                value={deleveryDetails_new?.check_out_dispatch_customer}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  // let valueInput = value.replace(
                                  //   /[^0-9 A-Za-z]/gi,
                                  //   ""
                                  // );
                                  setDeleveryDetails_new({
                                    ...deleveryDetails_new,
                                    check_out_dispatch_customer: value,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                {t("Please Enter Check Out Dispatch Customer.")}
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="col-md-6  form_input_main mb-3">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("End KM Based Location")}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder={t("Enter End KM Based Location...")}
                                value={deleveryDetails_new?.end_km_based_location}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let valueInput = value.replace(
                                    /[^0-9 A-Za-z]/gi,
                                    ""
                                  );
                                  setDeleveryDetails_new({
                                    ...deleveryDetails_new,
                                    end_km_based_location: valueInput,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                {t("Please Enter End KM Based Location.")}
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="col-md-6  form_input_main mb-3">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("KM Reading")}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder={t("Enter KM Reading...")}
                                value={deleveryDetails_new?.km_reading}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let valueInput = value.replace(
                                    /[^0-9 A-Za-z]/gi,
                                    ""
                                  );
                                  setDeleveryDetails_new({
                                    ...deleveryDetails_new,
                                    km_reading: valueInput,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                {t("Please Enter KM Reading.")}
                              </Form.Control.Feedback>
                            </div>
                          </div>

                          <div className="col-md-6  form_input_main mb-3">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("Material Received By")}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder={t("Enter Material Received By...")}
                                value={deleveryDetails_new?.material_received_by}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let valueInput = value.replace(
                                    /[^0-9 A-Za-z]/gi,
                                    ""
                                  );
                                  setDeleveryDetails_new({
                                    ...deleveryDetails_new,
                                    material_received_by: valueInput,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                {t("Please Enter Material Received By.")}
                              </Form.Control.Feedback>
                            </div>
                          </div>

                          <div className="col-md-6  form_input_main mb-3">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("Vehicle Utilization")}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder={t("Enter Vehicle Utilization...")}
                                value={deleveryDetails_new?.vehicle_utilization}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let valueInput = value.replace(
                                    /[^0-9 A-Za-z]/gi,
                                    ""
                                  );
                                  setDeleveryDetails_new({
                                    ...deleveryDetails_new,
                                    vehicle_utilization: valueInput,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                {t("Please Enter Vehicle Utilization.")}
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="col-md-6  form_input_main mb-3">
                            <div className="innerSelectBox weekCounter">
                              <Form.Label className="common-labels">
                                {t("Customer Gate Entry")}
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder={t("Enter Customer Gate Entry...")}
                                value={deleveryDetails_new?.customer_gate_entery}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let valueInput = value.replace(
                                    /[^0-9 A-Za-z]/gi,
                                    ""
                                  );
                                  setDeleveryDetails_new({
                                    ...deleveryDetails_new,
                                    customer_gate_entery: valueInput,
                                  });
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                {t("Please Enter Customer Gate Entery.")}
                              </Form.Control.Feedback>
                            </div>
                          </div>

                          <div className="col-md-6 form_input_main">
                            <Form.Label className="common-labels">
                              {t("Gate Pass")}
                            </Form.Label>
                            <Form.Control
                              required
                              accept="image/png, image/gif, image/jpeg"
                              type="file"
                              placeholder="Browse"
                              name="gate_pass_photo"
                              onChange={(e) => {
                                setDeleveryDetails_new({
                                  ...deleveryDetails_new,
                                  gate_pass_photo: e.target.files[0],
                                });
                              }}
                            />

                            {deleveryDetails_new?.gate_pass_photo && (
                              <img
                                style={{
                                  width: "9rem",
                                  height: "5rem",
                                  marginTop: "1rem",
                                  objectFit: "cover",
                                }}
                                src={
                                  typeof deleveryDetails_new?.gate_pass_photo ===
                                    "string"
                                    ? `${ApiConfig.BASE_URL}${deleveryDetails_new?.gate_pass_photo}`
                                    : deleveryDetails_new?.gate_pass_photo &&
                                    URL?.createObjectURL(
                                      deleveryDetails_new?.gate_pass_photo
                                    )
                                }
                                alt="img not found"
                              />
                            )}
                            <Form.Control.Feedback type="invalid">
                              {t("Please Enter Gate Pass Image.")}
                            </Form.Control.Feedback>
                          </div>

                          <div className="col-md-6 form_input_main">
                            <Form.Label className="common-labels">
                              {t("Vehicle Weight Slip")}
                            </Form.Label>
                            <Form.Control
                              required
                              accept="image/png, image/gif, image/jpeg"
                              type="file"
                              placeholder="Browse"
                              name="vehicle_weight_slip_photo"
                              onChange={(e) => {
                                setDeleveryDetails_new({
                                  ...deleveryDetails_new,
                                  vehicle_weight_slip_photo: e.target.files[0],
                                });
                              }}
                            />

                            {deleveryDetails_new?.vehicle_weight_slip_photo && (
                              <img
                                style={{
                                  width: "9rem",
                                  height: "5rem",
                                  marginTop: "1rem",
                                  objectFit: "cover",
                                }}
                                src={
                                  typeof deleveryDetails_new?.vehicle_weight_slip_photo ===
                                    "string"
                                    ? `${ApiConfig.BASE_URL}${deleveryDetails_new?.vehicle_weight_slip_photo}`
                                    : deleveryDetails_new?.vehicle_weight_slip_photo &&
                                    URL?.createObjectURL(
                                      deleveryDetails_new?.vehicle_weight_slip_photo
                                    )
                                }
                                alt="img not found"
                              />
                            )}
                            <Form.Control.Feedback type="invalid">
                              {t("Please Enter Vehicle Weight Slip Image.")}
                            </Form.Control.Feedback>
                          </div>


                          <div className="col-md-6  form_input_main mb-3">
                            <div className="innerSelectBox weekCounter">
                            </div></div>
                        </>)
                          : (null)
                        }

                        <div className="col-6">
                          <Form.Group className="mb-3">
                            <Form.Label className="common-labels">
                              {t("Description")}
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              // required
                              placeholder={t("Enter Description...")}
                              value={deleveryDetails_new?.description}
                              onChange={(e) =>
                                setDeleveryDetails_new({
                                  ...deleveryDetails_new,
                                  description: e.target.value,
                                })
                              }

                            />
                            {/* <Form.Control.Feedback type="invalid">
                     {t("Please Enter Description")}   
                      </Form.Control.Feedback> */}
                          </Form.Group>
                        </div>

                        <div className="col-6">
                          <Form.Group className="mb-3">
                            <Form.Label className="common-labels">
                              {t("Remarks")}
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              // required
                              placeholder={t("Enter Remarks...")}
                              value={deleveryDetails_new?.remark}
                              onChange={(e) =>
                                setDeleveryDetails_new({
                                  ...deleveryDetails_new,
                                  remark: e.target.value,
                                })
                              }

                            />
                            {/* <Form.Control.Feedback type="invalid">
                     {t("Please Enter Remarks")}   
                      </Form.Control.Feedback> */}
                          </Form.Group>
                        </div>



                      </div>

                      {/* <div className="detailsSec">
                <div className="headerDet">
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
            </div>
                
              </div> */}
                    </>
                  )}

                  {/* ///////// Location Start //////// */}
                  {/*  <div className="detailsSec">
            <div className="headerDet">
              <label className="headerTxtDet"> {t("Location")}</label>
            </div>
            <div className="row">
             
 
                               
                                <div className="col-md-6 colFormDet">
                                  <Form.Label className="common-labels">
                                    {t("Pick Up Address")} <span>&#42;</span>
                                  </Form.Label>
                                  <SearchFunction
                                   setterKey="pick_up_address"
                                   setter={setDeleveryDetails_new}
                                   data={deleveryDetails_new}
                                   latKey={"trip_start_latitude"}
                                   lngKey={"trip_start_longitude"}
                                   valueSarch={deleveryDetails_new?.pick_up_address}
                                   comp={"DeliveryRequest"}
                                   setErrMsg={setErrMsg}
                                   errMsg={errMsg}
                                  />

                                  <Form.Control.Feedback type="invalid">
                                 {t("Please Enter Pickup Address...")}   
                                  </Form.Control.Feedback>
                                </div> 
                             
                                <div className="col-md-6 colFormDet">
                                  <Form.Label className="common-labels">
                                    {t("Delivery Address")} <span>&#42;</span>
                                  </Form.Label>
                                  <SearchFunction
                                   setterKey="delivery_address"
                                   setter={setDeleveryDetails_new}
                                   data={deleveryDetails_new}
                                   latKey={"trip_start_latitude"}
                                   lngKey={"trip_start_longitude"}
                                   valueSarch={deleveryDetails_new?.delivery_address}
                                   comp={"DeliveryRequest"}
                                   setErrMsg={setErrMsg}
                                   errMsg={errMsg}
                                  />
                           
                                  <Form.Control.Feedback type="invalid">
                                 {t("Please Enter Delivery Address...")}   
                                  </Form.Control.Feedback>
                                </div> 
                             
                                <div className="col-md-6 colFormDet">
<Form.Label className="common-labels">
                                    {t("Start Trip With Start Time")} <span>&#42;</span>
                                  </Form.Label>

                                  <Space className="col-md-12 mr-1">
                                <TimePicker
                                  className="form-control carretClass"
                                  placeholder={t("Select Start Trip With Start Time...")}
                                  size="large"
                                  locale={{
                                    // Override Ant Design's default locale
                                    ok: t("antd.time-picker.ok"), // Arabic translation for "OK"
                                    now: t("antd.time-picker.now"), // Arabic translation for "Now"
                                  }}

                                   onChange={(time, timeString)=>{
                                    setDeleveryDetails_new({
                                      ...deleveryDetails_new,
                                      start_trip_with_start_time : timeString,

                                    })
                                    }}

                                
                                />
                              </Space>
                          
  </div>


<div className="col-md-6 colFormDet">
<Form.Label className="common-labels">
                                    {t("End Trip With End Time")} <span>&#42;</span>
                                  </Form.Label>

                                  <Space className="col-md-12 mr-1">
                                <TimePicker
                                  className="form-control carretClass"
                                  placeholder={t("End Trip With End Time...")}
                                  size="large"
                                  locale={{
                                    // Override Ant Design's default locale
                                    ok: t("antd.time-picker.ok"), // Arabic translation for "OK"
                                    now: t("antd.time-picker.now"), // Arabic translation for "Now"
                                  }}

                                  onChange={(time, timeString)=>{
                                    setDeleveryDetails_new({
                                      ...deleveryDetails_new,
                                      end_trip_with_end_time : timeString,

                                    })
                                    }}

                               
                                />
                              </Space>

  </div>


                            
                            
            </div>
          </div> */}
                  {/* ///////// Location  End //////// */}
                  <div className="col mb-4 DetailsSec" id="View_Dispatch_main">
                    {
                      invoicePhotosAndOcrData?.map((data, parentIndex) => {
                        return (<>
                          {secondLoader && <Loader />}
                          {data.image &&
                            <div className="mb-2" key={parentIndex} >
                              <h3>Invoice {parentIndex + 1}</h3>
                              <div className="row">
                                <p>Invoice no :-
                                  <input
                                    // onChange={(e) => handelInvoiceTableItemChange(e, parentIndex, childeIndex)}
                                    className="edatiableInputInvoice"
                                    type="text"
                                    name="SrNo"
                                    onChange={(e) => handleInvoiceChange(e, parentIndex)}
                                    value={data?.invoiceNo}
                                  />
                                </p>
                                <div className="table-responsive">
                                  <table className="holiday-table table" >
                                    <thead className="ht-head text-center">
                                      <tr>
                                        <td>{t("Sr.No.")}</td>
                                        <td>{t("Item Code")}</td>
                                        <td>{t("Item Description")}</td>
                                        <td>{t("UM")}</td>
                                        <td>{t("PO No")}</td>
                                        {/* <td>{t("Sr No")}</td> */}
                                        <td>{t("Quantity")}</td>
                                        <td>{t("Rate")}</td>

                                      </tr>
                                    </thead>
                                    <tbody className="ht-body text-center">

                                      {
                                        data?.filteredItems?.map((item, childeIndex) => {
                                          return (<tr className="table-row-custom" key={"listadat" + childeIndex}>
                                            <td>
                                              <input
                                                onChange={(e) => handelInvoiceTableItemChange(e, parentIndex, childeIndex)}
                                                className="edatiableInputInvoice"
                                                type="text"
                                                name="SrNo"
                                                value={item?.SrNo}
                                              />
                                            </td>
                                            <td>
                                              <input
                                                onChange={(e) => handelInvoiceTableItemChange(e, parentIndex, childeIndex)}
                                                className="edatiableInputInvoice"
                                                name="ItemCode"
                                                type="text"
                                                value={item?.ItemCode}
                                              />
                                            </td>
                                            <td>
                                              <input
                                                onChange={(e) => handelInvoiceTableItemChange(e, parentIndex, childeIndex)}
                                                className="edatiableInputInvoice"
                                                name="ItemDescription"
                                                type="text"
                                                value={item?.ItemDescription}
                                              />
                                            </td>
                                            <td>
                                              <input
                                                onChange={(e) => handelInvoiceTableItemChange(e, parentIndex, childeIndex)}
                                                className="edatiableInputInvoice"
                                                type="text"
                                                name="UM"
                                                value={item?.UM}
                                              />
                                            </td>
                                            <td>
                                              <input
                                                onChange={(e) => handelInvoiceTableItemChange(e, parentIndex, childeIndex)}
                                                className="edatiableInputInvoice"
                                                type="text"
                                                name="PONo"
                                                value={item?.PONo}
                                              />
                                            </td>
                                            {/* <td>
                                              <input
                                                onChange={(e) => handelInvoiceTableItemChange(e, parentIndex, childeIndex)}
                                                className="edatiableInputInvoice"
                                                name="SrNo2"
                                                type="text"
                                                value={item?.SrNo2}
                                              />
                                            </td> */}
                                            <td>
                                              <input
                                                onChange={(e) => handelInvoiceTableItemChange(e, parentIndex, childeIndex)}
                                                className="edatiableInputInvoice"
                                                type="text"
                                                name="Quantity"
                                                value={item?.Quantity} />
                                            </td>
                                            <td>
                                              <input
                                                onChange={(e) => handelInvoiceTableItemChange(e, parentIndex, childeIndex)}
                                                className="edatiableInputInvoice"
                                                type="text"
                                                name="Rate"
                                                value={item?.Rate}
                                              />
                                            </td>
                                          </tr>)
                                        })
                                      }
                                    </tbody>

                                    <tfooter className="bg-primary text-end" >
                                    </tfooter>
                                  </table>
                                </div>
                              </div>
                              <div className="d-flex justify-content-end mt-2" >
                                <div className="Value"> Total Value :  {data?.totalValue}</div>
                                <div className="Value mx-3">  </div>
                              </div>
                            </div>
                          }
                        </>)
                      })
                    }
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      onClick={(e) => {
                        handleResetClick(e);
                        navigate("/ViewDispatchTrip");
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
            </div>
          )}
        </div>

      </motion.div >
    </>
  )

}

export default AddNewOrder;
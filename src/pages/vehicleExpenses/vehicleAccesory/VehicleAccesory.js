import { React, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import DDlogo from '../../../assets/images/smallDD.svg'
import Calendar from '../../../assets/images/calendar.svg'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import SideIc from '../../../assets/images/sideBar.svg'
import Delete from '../../../assets/images/delete.svg'
import View from '../../../assets/images/Group.svg'
import EditIc from '../../../assets/images/ic-edit.svg'
import { Modal, OverlayTrigger, Tooltip, Dropdown, Spinner } from 'react-bootstrap'
import export_icon from '../../../assets/images/export_icon.svg'
import Form from 'react-bootstrap/Form'
import { motion } from 'framer-motion'
import Pagenation from '../../../sharedComponent/Pagenation'
import ApiConfig from '../../../api/ApiConfig'
import { simpleDeleteCall, simplePostCall, getWithAuthCall, simplePostCallPromise } from '../../../api/ApiServices'
import { notifyError, notifySuccess } from '../../../sharedComponent/notify'
import { DateDDMMYYYY, latestDate } from '../../../sharedComponent/common'
import Loader from '../../../sharedComponent/Loader'
import NoDataComp from '../../../sharedComponent/NoDataComp'
import { jsPDF } from 'jspdf'
import Select from "react-select";
import car_placeholder from '../../../assets/car_placeholder.png'
import dummy_vehicle_ic from "../../../assets/images/dummy_vehicle_ic.svg";
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import CommonDatePicker from '../../../sharedComponent/CommonDatePicker'

import { Select as AntdSelect } from 'antd';
const { Option } = AntdSelect;
const VehicleAccesory = () => {
  const accessRights = useSelector(state => state.auth.accessRights)
  // const userRole = accessRights && accessRights.rights_role
  const userRole = "no Role"
  const { sidebar, setSidebar, Dark, setDark, recordsPerPage, setOptionDynamicDownload } = useContext(AppContext)
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [yearStartDate, setyearStartDate] = useState(new Date());
  const [yearEndDate, setyearEndDate] = useState(new Date());
  const [total_pages, set_total_pages] = useState(null)
  const [trigger, setTrigger] = useState(false);
  const [spinner_loading, set_spinner_loading] = useState(false);

  ////////////////////////////////////////////////////////////////////////////////////////
  const [tripName, setFiltertTrip] = useState('')
  const [TransportList, setTransportList] = useState([])

  const [tripLocation, setFiltertlocation] = useState('')
  const [pdfData, setpdfData] = useState("");

  const { t, i18n } = useTranslation()
  const [NextDateShow, setNextDateShow] = useState({ toNextDate: new Date() });
  const [optionData, setOptionData] = useState("all");
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date());
  const [endDayOfMonth, setEndDayOfMonth] = useState(new Date());
  // State for weekStartDate and weekEndDate
  const [weekStartDate, setWeekStartDate] = useState(new Date());

  const [weekEndDate, setWeekEndDate] = useState(new Date());
  const [daysToAdd, setDaysToAdd] = useState(30);
  const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });
  const maxDate = new Date();
  const [NextPage, setNextPage] = useState(true);
  const [OptionDownload, setOptionDownload] = useState("");

  const [FilterName, setFiltertName] = useState({ vehicle_name: '' })
  const [vehicleState, setVehicleState] = useState({
    isloading: true,
    vehicles: [],
  });
  const [VehicalType, setVehicalType] = useState([]);
  const [loading_for_filter, set_loading_for_filter] = useState(false)
  // Convert driverState.drivers to options format for react-select
  const vehicleOptions = vehicleState?.vehicles?.map((vehicle) => ({
    value: vehicle.vehicle_id,
    label: vehicle.vehicle_number,
  }));
  // Find the selected driver option
  const selectedVehicle = vehicleOptions.find(option => option.value === FilterName);
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
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
  }
  const renderTooltipForEdit = props => (
    <Tooltip id='button-tooltip' {...props}>
      {t('Edit')}
    </Tooltip>
  )
  const renderTooltipForView = props => (
    <Tooltip id='button-tooltip' {...props}>
      {t('View')}
    </Tooltip>
  )
  const renderTooltipForDelete = props => (
    <Tooltip id='button-tooltip' {...props}>
      {t('Delete')}
    </Tooltip>
  )

  const [AccesoryList, setAccesoryList] = useState([])
  const [last_page, setlast_page] = useState(false)
  const [page, setPage] = useState(1)
  const [DeleteId, setDeleteId] = useState('')
  const [totalPages, setTotalPages] = useState(0)

  const [ItemName, setFiltertItem] = useState('')
  const [LocationPrice, setFiltertPrice] = useState('')

  // useEffect(() => {
  //   if (page === 1) {
  //     getAccesoryAccident(page)
  //     setLoading(true)
  //   }
  // }, [])

  // useEffect(() => {
  //   handalFilter()
  // }, [FilterName, ItemName, LocationPrice, startDate])

  function getAccesoryAccident(currentPage) {
    let newRequestBody = JSON.stringify({
      page: currentPage,
      page_limit: recordsPerPage
    })
    simplePostCall(ApiConfig.Vehicle_ACCESSORY_LIST, newRequestBody)
      .then(data => {
        if (data.result) {
          setTotalPages(data.total_count)
          setlast_page(data.last_page)
          let coursesData = data.data ? data.data : []
          let LearningData = coursesData.map((eachteam, index) => {
            return {
              ...eachteam,
              user_profile_pic: eachteam.user_profile_pic || '',
              user_name: eachteam.user_name || '',
              user_email: eachteam.user_email || ''
            }
          })

          if (currentPage === 1) {
            setAccesoryList(data.data)
          } else {
            setAccesoryList([...AccesoryList, ...LearningData])
            // setlast_page(false)
          }
        } else {
          setAccesoryList(0)
        }
      })
      .catch(err => {
        console.log('err', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }


  function userDelete() {
    let newRequestBody = JSON.stringify({
      accessory_id: DeleteId
    })
    simpleDeleteCall(ApiConfig.Vehicle_ACCESSORY_DELETE, newRequestBody)
      .then(data => {
        if (data.result) {
          notifySuccess(data.message)
          setDeleteModal(false)
          // getAccesoryAccident(1)
          reportViewList(currentDate.toDayDate, yearStartDate, yearEndDate, firstDayOfMonth, endDayOfMonth, NextDateShow.toNextDate, optionData, weekStartDate, weekEndDate, page);
          // setPage(1)
        } else {
          notifyError(data.message)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }

  function handalFilter() {
    let newRequestBody = JSON.stringify({
      page: '1',
      vehicle_name: FilterName?.vehicle_name,
      item: ItemName,
      price: LocationPrice,
      date: startDate,
      page_limit: recordsPerPage,
    })
    set_loading_for_filter(true)
    simplePostCall(ApiConfig.Vehicle_ACCESSORY_FILTER, newRequestBody)
      .then(data => {
        set_loading_for_filter(false)
        if (data.result) {
          setTotalPages(data.total_count)
          setAccesoryList(data.data)
        } else {
          // notifyError(data.message);
          setAccesoryList([])
          setTotalPages(0)
        }
      })
      .catch(error => {
        set_loading_for_filter(false)
        console.log('api response', error)
      })
  }


  async function onPageLoad() {


    if (page < total_pages + 1) {

      setPage((prevState) => prevState + 1);


      // console.log('page-->', page)
      await reportViewList(currentDate.toDayDate, yearStartDate, yearEndDate, firstDayOfMonth, endDayOfMonth, NextDateShow.toNextDate, optionData, weekStartDate, weekEndDate, page);

    }
  }

  /// Export

  function handalExport() {
    if (
      FilterName === '' ||
      ItemName === '' ||
      LocationPrice === '' ||
      startDate === ''
    ) {
      handalFilterExport()
    } else {
      getExportChat()
    }
  }

  function getExportChat() {
    simplePostCall(ApiConfig.VEHICLE_ACCESSORY_LIST_EXPORT)
      .then(data => {
        if (data.result) {
          pdfFormat(data.data)
        } else {
        }
      })
      .catch(err => {
        console.log('err', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handalFilterExport() {
    let newRequestBody = JSON.stringify({
      vehicle_name: FilterName?.vehicle_name,
      item: ItemName,
      price: LocationPrice,
      date: startDate
    })
    simplePostCall(ApiConfig.VEHICLE_ACCESSORY_FILTER_EXPORT, newRequestBody)
      .then(data => {
        if (data.result) {
          pdfFormat(data.data)
        } else {
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }
  const downloadFile = () => {
    fetch(pdfData)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const a = document.createElement("a");
        a.href = url;

        // Extract the file name from the filepath dynamically
        const fileName = pdfData.substring(pdfData.lastIndexOf("/") + 1);
        a.download = fileName;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading file:", error));
  };

  useEffect(() => {
    if (pdfData) {
      downloadFile();
    }
  }, [pdfData]);

  const pdfFormat = pdfData => {

    // let chatsData = await getExportChat()
    const unit = 'pt'
    const size = 'A4' // Use A1, A2, A3 or A4
    const orientation = 'portrait' // portrait or landscape
    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)
    doc.setFontSize(15)
    const title = 'Vehicle Accesory'
    const headers = [
      ['Sr. No.', 'Vehicle Name', 'Accessory Item', 'Quantity', 'Price']
    ]
    var data = []

    pdfData.map((item, index) => {
      data.push([
        index + 1,
        item.vehicle_number,
        item.accessory_item,
        item.accessory_quantity,
        item.accessory_price
      ])
    })

    let content = {
      headStyles: { fillColor: '#9c4900' },
      theme: 'grid',
      pageBreak: 'auto',
      bodyStyles: { fillColor: '#f6efe9' },
      styles: { fillColor: '#9c4900' },
      head: headers,
      title: title,
      body: data
    }

    doc.text(title, marginLeft, 25)
    doc.autoTable(content)
    doc.save('VT.pdf')
    return <div></div>
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
  useEffect(() => {
    geVehicalList_new();
  }, [])

  // end new geVehicalList fun made by me/////////////////////////////////////

  const formattedNextDate = () => {
    if (NextDateShow && NextDateShow.toNextDate) {
      switch (optionData) {

        case "year":
          // Use state for yearStartDate and yearEndDate
          const yearStartDateState = new Date(NextDateShow.toNextDate.getFullYear(), 0, 1); // January 1st
          const yearEndDateState = new Date(NextDateShow.toNextDate.getFullYear(), 11, 31); // December 31st

          if (yearStartDate.getTime() !== yearStartDateState.getTime() || yearEndDate.getTime() !== yearEndDateState.getTime()) {
            setyearStartDate(yearStartDateState);
            setyearEndDate(yearEndDateState);
          }

          return `${yearStartDateState.toLocaleString("en-US", {
            day: "numeric",
            month: "long",
          })} ${yearStartDateState.getFullYear()} - ${yearEndDateState.toLocaleString("en-US", {
            day: "numeric",
            month: "long",
          })} ${yearEndDateState.getFullYear()}`;

        case "month":
          // Use state for firstDayOfMonth
          const firstDayOfMonthState = new Date(
            NextDateShow.toNextDate.getFullYear(),
            NextDateShow.toNextDate.getMonth(),
            1
          );
          if (firstDayOfMonth.getTime() !== firstDayOfMonthState.getTime()) {
            setFirstDayOfMonth(firstDayOfMonthState);
          }

          const lastDayOfMonth = new Date(
            NextDateShow.toNextDate.getFullYear(),
            NextDateShow.toNextDate.getMonth() + 1,
            0
          );
          if (endDayOfMonth.getTime() !== lastDayOfMonth.getTime()) {
            setEndDayOfMonth(lastDayOfMonth);
          }
          return `${firstDayOfMonthState.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })} - ${lastDayOfMonth.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}`;
        // Other cases...

        case "week":
          // Use state for weekStartDate and weekEndDate
          const weekStartDateState = new Date(NextDateShow.toNextDate);
          const weekEndDateState = new Date(weekStartDateState);
          weekEndDateState.setDate(weekEndDateState.getDate() + 6);

          if (weekStartDate.getTime() !== weekStartDateState.getTime()) {
            setWeekStartDate(weekStartDateState);
          }

          if (weekEndDate.getTime() !== weekEndDateState.getTime()) {
            setWeekEndDate(weekEndDateState);
          }

          return `${weekStartDateState.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
          })} - ${weekEndDateState.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}`;
        case "date":
          return NextDateShow.toNextDate.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });
        case "all":
          return NextDateShow.toNextDate.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });
        default:
          // If 'current date' is selected, display the current month
          const currentMonth = new Date(
            NextDateShow.toNextDate.getFullYear(),
            NextDateShow.toNextDate.getMonth(),
            1
          );
          const lastDayOfCurrentMonth = new Date(
            NextDateShow.toNextDate.getFullYear(),
            NextDateShow.toNextDate.getMonth() + 1,
            0
          );
          return `${currentMonth.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })} - ${lastDayOfCurrentMonth.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}`;
      }
    } else {
      // Handle the case when NextDateShow or NextDateShow.toNextDate is null

      const newDate = new Date(NextDateShow.toNextDate);
      console.log(newDate, "-=-=-=-=-=-=-=-=-=-=-");
      newDate.setDate(newDate.getDate() - daysToAdd);
      setNextDateShow({ toNextDate: newDate });
      console.log("NextDateShow", "[[[[[[[]]]]]]]]]");
    }
  };

  const handleprivesButtonClick = () => {
    setTrigger(true);
    setPage(1);

    const newDate = new Date(NextDateShow.toNextDate);
    newDate.setDate(newDate.getDate() - daysToAdd);
    if (optionData !== 'all') {
      setNextDateShow({ toNextDate: newDate });
      console.log(`Subtracting ${daysToAdd} days. New date: ${newDate}`);
    }
  };
  const handleNextButtonClick = () => {
    setTrigger(true);
    setPage(1)
    // const { toNextDate, selectedOption } = NextDateShow;

    // Get the current date and format it to 'yyyy-MM-dd'
    const currentDate = latestDate(new Date(), "yyyy-MM-dd");

    // Get the new date from the state and format it to 'yyyy-MM-dd'
    const newDate = new Date(NextDateShow.toNextDate);
    const camparDate = latestDate(newDate, "yyyy-MM-dd");
    const camparMonthe = latestDate(firstDayOfMonth, "yyyy-MM-dd");

    // Disable the button based on the selected option
    if (
      (optionData === "month" &&
        camparMonthe.substring(0, 7) === currentDate.substring(0, 7)) ||
      (optionData === "week" && camparDate === currentDate) ||
      (optionData === "date" && camparDate === currentDate)
    ) {
      console.log("Next button disabled");
    } else if (optionData !== 'all') {
      // Enable the button and update the next date
      // newDate.setDate(newDate.getDate() + daysToAdd);
      // setNextDateShow({ toNextDate: newDate, selectedOption });
      newDate.setDate(newDate.getDate() + daysToAdd);
      setNextDateShow({ toNextDate: newDate });
    }
  };
  // Match current date and update number of days based on the selected option
  useEffect(() => {
    setNextDateShow({ toNextDate: currentDate.toDayDate });
    // const currentDate = moment();

    // console.log("checking", currentDate.isSame(currentDate, `${optionData == 'month' ? 'month':  optionData == 'week' ? 'week' : optionData == 'date' ? 'date' : ''  }`))
    switch (optionData) {
      case "year":
        // Set daysToAdd for year (adjust as needed)
        setDaysToAdd(365); // Adjust for leap years if necessary
        break;
      case "month":
        setDaysToAdd(29);
        break;
      case "week":
        setDaysToAdd(7);
        break;
      case "date":
        setDaysToAdd(1);
        break;
      default:
        setDaysToAdd(30); // Default to 30 days for month
        break;
    }
  }, [optionData, currentDate]);

  const reportViewList = async (
    date,
    yearStart, yearEnd,
    firstmonth,
    endmonth,
    nextDate,
    selelctedDrop,
    weekStart,
    weekEnd, currentPage
  ) => {
    let requestData;

    if (selelctedDrop === "month") {
      requestData = {
        page: currentPage,
        vehicle_name: FilterName?.vehicle_name?.toLowerCase(),
        item: ItemName,
        price: LocationPrice,
        date: latestDate(firstmonth, "yyyy-MM-dd"),
        lastDate: latestDate(endmonth, "yyyy-MM-dd"),
        page_limit: recordsPerPage,
        format: OptionDownload,
      };
    } else if (selelctedDrop === "year") {
      requestData = {
        page: currentPage,
        vehicle_name: FilterName?.vehicle_name?.toLowerCase(),
        item: ItemName,
        price: LocationPrice,
        date: latestDate(yearStart, "yyyy-MM-dd"),
        lastDate: latestDate(yearEnd, "yyyy-MM-dd"),
        page_limit: recordsPerPage,
        format: OptionDownload,
      };
    }
    else if (selelctedDrop === "week") {
      // Handle OtherMonth case
      requestData = {

        page: currentPage,
        vehicle_name: FilterName?.vehicle_name?.toLowerCase(),
        item: ItemName,
        price: LocationPrice,
        date: latestDate(weekStart, "yyyy-MM-dd"),
        lastDate: latestDate(weekEnd, "yyyy-MM-dd"),
        format: OptionDownload,
        page_limit: recordsPerPage,
      };
    } else if (selelctedDrop === "date") {
      requestData = {

        page: currentPage,
        vehicle_name: FilterName?.vehicle_name?.toLowerCase(),
        item: ItemName,
        price: LocationPrice,
        date: latestDate(nextDate, "yyyy-MM-dd"),
        lastDate: latestDate(nextDate, "yyyy-MM-dd"),
        format: OptionDownload,
        page_limit: recordsPerPage,
      }
    }
    else {
      // Handle other cases
      requestData = {

        page: currentPage,
        vehicle_name: FilterName?.vehicle_name?.toLowerCase(),
        item: ItemName,
        price: LocationPrice,
        date: '',
        lastDate: '',
        format: OptionDownload,

        page_limit: recordsPerPage,
      };
    }

    // if (requestData) {
    //   // {
    //   //   OptionDownload == "pdf" || OptionDownload == "excel"
    //   //     ? setLoading(false)
    //   //     : setLoading(true);
    //   // }
    //   setOptionDownload("");
    //   simplePostCall(
    //     ApiConfig.Vehicle_ACCESSORY_FILTER ,
    //     JSON.stringify(requestData)
    //   )
    //     .then((res) => {
    //       if (res?.result) {

    //         setLoading(false);
    //         setOptionDynamicDownload("");
    //         // Extract the array of items from the response
    //         const firstKey = res.filepath;

    //         console.log(pdfData);
    //         setpdfData(firstKey);
    //         if (!firstKey) {
    //           set_total_pages(res?.total_pages)
    //           let coursesData = res?.data ? res?.data : []
    //           let LearningData = coursesData.map((eachteam, index) => {
    //             return {
    //               ...eachteam,
    //               user_profile_pic: eachteam.user_profile_pic || '',
    //               user_name: eachteam.user_name || '',
    //               user_email: eachteam.user_email || ''
    //             }
    //           })
    //           if(currentPage === 1 || currentPage === ''){
    //           // setOrderListData(res.data ? res.data : res.data);
    //           setAccesoryList(res.data ? res.data : res.data);
    //           setlast_page(res?.last_page)
    //           setTotalPages(res?.total_count)
    //           } else {
    //             setAccesoryList([...AccesoryList, ...LearningData])
    //               // setlast_page(false)
    //               setlast_page(res?.last_page)
    //               setTotalPages(res?.total_count)
    //             }
    //         }
    //         // Set the array to the state
    //       } else {
    //         setOptionDownload("");
    //         setAccesoryList([]);
    //         // notifyError(res.message)
    //         // Handle the case when the result is false
    //         // notifyError(res.message);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("Error:", err);
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
    // }

    if (requestData) {
      setOptionDownload("");
      try {
        OptionDownload && set_spinner_loading(true);
        const res = await simplePostCallPromise(ApiConfig.Vehicle_ACCESSORY_FILTER, JSON.stringify(requestData));
        if (res?.result) {
          setLoading(false);

          setOptionDynamicDownload("");
          const firstKey = res.file_path;
          setpdfData(firstKey);

          if (!firstKey) {
            set_total_pages(res?.total_pages);
            const coursesData = res?.data || [];
            const LearningData = coursesData.map((eachteam) => ({
              ...eachteam,
              user_profile_pic: eachteam.user_profile_pic || '',
              user_name: eachteam.user_name || '',
              user_email: eachteam.user_email || '',
            }));

            if (currentPage === 1 || currentPage === '') {
              setAccesoryList(coursesData);
              setlast_page(res?.last_page);
              setTotalPages(res?.total_count);
            } else {
              setAccesoryList((prev) => [...prev, ...LearningData]);
              setlast_page(res?.last_page);
              setTotalPages(res?.total_count);
            }
          }
        } else {

          setOptionDownload("");
          setAccesoryList([]);
        }
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
        set_spinner_loading(false);
      }
    }
  };


  useEffect(() => {
    // setPage(1);

    if (trigger) {
      reportViewList(
        currentDate.toDayDate,
        yearStartDate, yearEndDate,
        firstDayOfMonth,
        endDayOfMonth,
        NextDateShow.toNextDate,
        optionData,
        weekStartDate,
        weekEndDate, page
      );
      setTrigger(false);
    }
  }, [
    weekEndDate,
    weekStartDate,
    // currentDate,
    NextDateShow,
    firstDayOfMonth,
    optionData,
    endDayOfMonth,
    FilterName?.vehicle_name,
    LocationPrice,
    ItemName, yearStartDate, yearEndDate, trigger

  ]);
  useEffect(() => {
    setPage(1);
    setTrigger(true)
  }, [FilterName?.vehicle_name, LocationPrice, ItemName, optionData,
    /*   weekEndDate,
      weekStartDate,
      // currentDate,
      NextDateShow,
      firstDayOfMonth,
      optionData,
      endDayOfMonth,
      FilterName?.vehicle_name,
      LocationPrice,
      ItemName,   yearStartDate, yearEndDate, trigger */
  ])

  useEffect(() => {
    if (OptionDownload === "pdf" || OptionDownload === "excel") {
      reportViewList(
        currentDate.toDayDate,
        yearStartDate, yearEndDate,
        firstDayOfMonth,
        endDayOfMonth,
        NextDateShow.toNextDate,
        optionData,
        weekStartDate,
        weekEndDate,

      );
    }
  }, [
    OptionDownload,
    weekEndDate,
    weekStartDate,
    currentDate,
    NextDateShow,
    firstDayOfMonth,
    optionData,
    endDayOfMonth,

    yearStartDate, yearEndDate,
  ]);
  const handleErrorImage = (ev) => {
    ev.target.src = dummy_vehicle_ic;
    ev.target.onError = null;
  };
  return (
    <>
      <motion.div
        className={sidebar ? 'taskMain ' : 'cx-active taskMain'}
        id='cx-main'
        variants={aninations}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ duration: 0.1 }}
      >

        <div id='cx-wrapper' className='Vehicle_Accesory'>
          {/* Top inputs for instatnt search */}
          {/*   <div className='displayFlexInp---  displayFlexInp-for-expense-header d-flex justify-content-end '>
              <div className='innerSelectBox weekCounter selectForm-1 form_input_main mr-8 mx-8'>
                  {userRole === 'customer' ||
                  (accessRights && accessRights?.rights_manage_accessory) ? (
                    <Link to='/AddVehicleAccesory' className='AddAccidentLink'>
                      <button className='innerCust' >
                        + {t('Add Accessory')}
                      </button>
                    </Link>
                  ) : null}
                </div>

              </div> */}

          <div className='displayFlexInp---  displayFlexInp-for-expense-header'>

            <div className='innerSelectBox weekCounter selectForm-1 form_input_main'>
              <p>
                <p style={{ color: '#9C4900' }}>
                  {t("Date:")} {formattedNextDate()}
                </p>
              </p>
            </div>
            <div className='innerSelectBox weekCounter selectForm-1 form_input_main'>
              {/* <Form.Control
                    required
                    type='text'
                    value={FilterName}
                    placeholder='Vehicle Name'
                    className='innerCust'
                    onChange={e => {
                      setFiltertName(e.target.value)
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
                // disabled={UserId ? true : false}
                // required
                placeholder="Vehicle Name"
                value={selectedVehicle}
                options={vehicleState?.vehicles}
                isClearable
                isSearchable
                onChange={(selectedOption) => {
                  setFiltertName({
                    vehicle_name: selectedOption ? selectedOption.label : '',
                  });
                }}

              >

              </Select>

            </div>
            <div className='innerSelectBox weekCounter selectForm-1 form_input_main'>
              {/* <Form.Control
                required
                type="text"
                placeholder="Accessory Item, Quantity..."
                className="innerCust"
                
              /> */}
              <Form.Control
                required
                type='text'
                placeholder='Accessory Item, Quantity...'
                className='innerCust'
                value={ItemName}
                onChange={(e) => {
                  // const inputValue = e.target.value.replace(/[^0-9]/g, '');
                  // setFiltertItem(inputValue)
                  setFiltertItem(e.target.value)
                }}
              />
            </div>
            {/*   <div className='innerSelectBox weekCounter selectForm-1 form_input_main'>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Price'
                    value={LocationPrice}
                    className='innerCust'
                    onChange={(e )=> {
                      const inputValue = e.target.value.replace(/[^0-9]/g, '');
                      setFiltertPrice(inputValue)
                    }}
                  />
                </div> */}
            <div className='innerSelectBox weekCounter selectForm-1 form_input_main datepicker-main'>
              {/* <input
                    class='datepicker-here form-control digits'
                    type='date'
                    data-language='en'
                    placeholder='MM-DD-YYYY'
                    data-position='top left'
                    name='submission_date'
                    value={startDate}
                    // onChange={(date) => setStartDate(date)}
                    onChange={e => setStartDate(e.target.value)}
                  /> */}
              <CommonDatePicker
                dateKey={"toDayDate"}
                setDate={setCurrentDate}
                data={currentDate}
                SetPlaceholder={t("Today Date")}
                dataDisbal={maxDate}
              />
            </div>
            <div className='innerSelectBox weekCounter selectForm-1 form_input_main'>
              <div className="multi-select-1">
                <AntdSelect
                  style={{ width: "100%", height: '38px' }}
                  id="selectBox"
                  placeholder={t("Filter")}
                  value={optionData}
                  // options={FilterOption}
                  onChange={(value) => setOptionData(value)}
                  className="custom-select"
                >
                  <Option

                    value="all"
                    style={{ color: "rgba(156, 73, 0)" }}
                  >
                    {t("All")}
                  </Option>
                  {/* <Option
                  
                    value="date"
                    style={{ color: "rgba(156, 73, 0)" }}
                  >
                    {t("Day")}
                  </Option>
                  <Option value="week" style={{ color: "rgba(156, 73, 0)" }}>
                    {t("Week")}
                  </Option> */}
                  <Option value="month" style={{ color: "rgba(156, 73, 0)" }}>
                    {t("Month")}
                  </Option>
                  <Option value="year" style={{ color: "rgba(156, 73, 0)" }}>
                    {t("Year")}
                  </Option>
                </AntdSelect>

              </div>
            </div>
            <div className="leftContent d-flex mb-1 ">
              <div class="btn-wrapper">
                <button class="cx-btn-2" onClick={handleprivesButtonClick}>
                  {t("Back")}
                </button>
              </div>

              <div class="btn-wrapper">
                <button
                  onClick={handleNextButtonClick}
                  class="cx-btn-2"
                  disabled={NextPage === false ? true : false}
                >
                  {t("Next")}
                </button>
              </div>
              <div></div>
            </div>
            <div className='innerSelectBox weekCounter selectForm-1 form_input_main'>
              {userRole === 'customer' ||
                (accessRights && accessRights?.rights_manage_accessory) ? (
                <Link to='/AddVehicleAccesory' className='AddAccidentLink'>
                  <button className='innerCust' /* style={{width:'100%'}} */>
                    + {t('Add Accessory')}
                  </button>
                </Link>
              ) : null}
            </div>
            {/* <div className='headerDivIc form_input_main'>
                  <Link to='#'>
                    <img src={SideIc} alt='' />
                  </Link>
                </div> */}
            {/* <div className='headerDivIc form_input_main'>
                  <Link to='#'>
                    <img
                      onClick={() => handalExport()}
                      src={export_icon}
                      alt=''
                    />
                  </Link>
                </div> */}
            <div className="md_dropdown">
              {spinner_loading ? (<Spinner animation="border" role="status" style={{ color: '#9C4900' }}>
                <span className="visually-hidden">Loading...</span>
              </Spinner>) : (
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <img src={export_icon} alt="" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link
                        onClick={() => setOptionDownload("pdf")}
                        className="d-block"
                      >
                        {t("PDF")}
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link
                        onClick={() => setOptionDownload("excel")}
                        className="d-block"
                      >
                        {t("Excel")}
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>

          {/* Vehicle table */}
          {loading || loading_for_filter ? (
            <Loader />
          ) : (
            <>       <div className='main-master-wrapper'>
              <div
                id='scroll_insideThe_Padding_tabel'
                // onScroll={e => {
                //   const bottom =
                //     e.target.scrollHeight - e.target.scrollTop ===
                //     e.target.clientHeight

                //   if (bottom && !last_page) onPageLoad()
                // }}
                onScroll={e => {
                  const element = e.target;
                  const nearBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 5;

                  if (nearBottom) {

                    onPageLoad();
                  }
                }}
              >
                <div className='VA_table'>
                  <table className='table tableAdmin'>
                    <thead className='tableHead'>
                      <tr>
                        <th>{t('Sr.no')}</th>
                        <th width='25%'>{t('Vehicle Name')}</th>
                        <th>{t('Accessory Item')}</th>
                        <th>{t('Quantity')}</th>
                        <th>{t('Price')}</th>
                        <th>{t('Purchase Date')}</th>
                        <th>{t('Action')}</th>
                      </tr>
                    </thead>
                    {AccesoryList && AccesoryList.length > 0 ? (
                      AccesoryList.map((itemlist, index) => {
                        return (
                          <tbody className='tableBody'>
                            <tr>
                              <td>{index + 1}</td>
                              <td> <img
                                src={itemlist?.vehicle_image_path || dummy_vehicle_ic}
                                width='50rem'
                                height='35rem'

                                onError={(ev) => {
                                  handleErrorImage(ev);
                                }}
                                alt='No Image Found'
                                style={{ marginRight: '10px', borderRadius: '5px' }} // Add some space between the text and image
                              />{itemlist.vehicle_number}</td>
                              <td>{itemlist.accessory_item}</td>
                              <td>{itemlist.accessory_quantity}</td>
                              <td>{itemlist.accessory_price}</td>
                              <td>
                                {DateDDMMYYYY(
                                  itemlist.accessory_purchase_date
                                )}
                              </td>
                              <td>
                                <div className='innerFlex d-flex'>
                                  {userRole === 'customer' ||
                                    (accessRights &&
                                      accessRights?.rights_view_accessory) ? (
                                    <OverlayTrigger
                                      placement='bottom'
                                      delay={{ show: 250, hide: 400 }}
                                      overlay={renderTooltipForView}
                                    >
                                      <Link
                                        to={
                                          '/ViewVehicleAccesory/' +
                                          itemlist.accessory_id
                                        }
                                      >
                                        <div className='inconsIn me-3'>
                                          <img src={View} alt='' />
                                        </div>
                                      </Link>
                                    </OverlayTrigger>) : null}
                                  {userRole === 'customer' ||
                                    (accessRights &&
                                      accessRights?.rights_manage_accessory) ? (
                                    <>
                                      <OverlayTrigger
                                        placement='bottom'
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipForEdit}
                                      >
                                        <Link
                                          to={
                                            '/AddVehicleAccesory/' +
                                            itemlist.accessory_id
                                          }
                                        >
                                          <div className='inconsIn me-3'>
                                            <img src={EditIc} alt='' />
                                          </div>
                                        </Link>
                                      </OverlayTrigger>
                                      <OverlayTrigger
                                        placement='bottom'
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipForDelete}
                                      >
                                        <Link
                                          to='#'
                                          onClick={() => {
                                            setDeleteId(itemlist.accessory_id)
                                            setDeleteModal(true)
                                          }}
                                        >
                                          <div className='inconsIn'>
                                            <img src={Delete} alt='' />
                                          </div>
                                        </Link>
                                      </OverlayTrigger>
                                    </>
                                  ) : null}

                                  {/* <Link to="/ViewVehicleAccesory">
                            <img src={View} className="me-3" alt="" />
                          </Link>
                          <Link to="/EditVehicleAccesory">
                            <img src={EditIc} alt="" className="me-3" />
                          </Link>
                          <Link to="#" onClick={() => setDeleteModal(true)}>
                            <img src={Delete} alt="" />
                          </Link> */}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        )
                      })
                    ) : (
                      <tbody><tr><td colSpan={20} className='text-center'><NoDataComp /></td></tr></tbody>
                    )}
                  </table>
                </div>
                {/* {AccesoryList.length > 0 ? '' : <NoDataComp />} */}
              </div>
              {/* {last_page === true ? (
                  <p
                    style={{
                      textAlign: 'center',
                      marginTop: '20px',
                      color: '#9c4900'
                    }}
                  >
                    <b>No More data Found</b>
                  </p>
                ) : (
                  ''
                )} */}

            </div>
            </>
          )}
        </div>
        {AccesoryList?.length > 0 && <Pagenation length={AccesoryList?.length} total={totalPages} />}
      </motion.div>

      {/* Delete Modal Start */}
      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        centered
        className='common-model'
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('Delete Vehicle Accessory')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('Are you sure you want to Delete this Vehicle Accessory')} ?
        </Modal.Body>
        <Modal.Footer className='pop-up-modal-footer'>
          <div class='btn-wrapper'>
            <button className='cx-btn-1' onClick={() => setDeleteModal(false)}>
              {t('Cancel')}
            </button>
            <button className='cx-btn-2' onClick={userDelete}>
              Yes
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal End */}
    </>
  )
}

export default VehicleAccesory

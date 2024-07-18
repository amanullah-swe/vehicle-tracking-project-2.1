import { React, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import DDlogo from '../../../assets/images/smallDD.svg'
import Calendar from '../../../assets/images/calendar.svg'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import Delete from '../../../assets/images/delete.svg'
import View from '../../../assets/images/Group.svg'
import EditIc from '../../../assets/images/ic-edit.svg'
import { Col, Modal, Nav, OverlayTrigger, Tooltip , Spinner } from 'react-bootstrap'
import SideIc from '../../../assets/images/sideBar.svg'
import export_icon from '../../../assets/images/export_icon.svg'
import Form from 'react-bootstrap/Form'
import { Dropdown, Tab, Tabs } from 'react-bootstrap'
import car_placeholder from '../../../assets/car_placeholder.png'
import dummy_vehicle_ic from "../../../assets/images/dummy_vehicle_ic.svg";
import { motion } from 'framer-motion'
import Pagenation from '../../../sharedComponent/Pagenation'
import { useTranslation } from 'react-i18next'
import { simplePostCall, getWithAuthCall, simplePostCallPromise } from '../../../api/ApiServices'
import ApiConfig from '../../../api/ApiConfig'
import NoDataComp from '../../../sharedComponent/NoDataComp'
import NoMoreDataComp from '../../../sharedComponent/NoMoreDataComp'
import { DateDDMMYYYY , latestDate } from '../../../sharedComponent/common'
import { useSelector } from 'react-redux'
import Loader from '../../../sharedComponent/Loader'
import Select from "react-select";
import CommonDatePicker from '../../../sharedComponent/CommonDatePicker'

import { Select as AntdSelect } from 'antd';
const { Option } = AntdSelect;


const VehicleMaintenance = () => {
  const accessRights = useSelector(state => state.auth.accessRights)
  // accessRights && accessRights.rights_role
  const userRole = "no Role"

  const { sidebar, setSidebar, Dark, setDark,recordsPerPage ,/* loading, setLoading, */ setOptionDynamicDownload} = useContext(AppContext)
  const [startDate, setStartDate] = useState(new Date())
  const [deleteModal, setDeleteModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentTab, setCurrentTab] = useState('0')
  const [VehicleName, setVehicleName] = useState('')
  const [VehicleServiceDate, setVehicleServiceDate] = useState('')
  const [VehicleKilometers, setVehicleKilometers] = useState('')
  const [MaintenaceStatus, setMaintenaceStatus] = useState('all')
  const [totalActive, setTotalActive] = useState(0)
  const [Maintenacepage, setMaintenacePage] = useState(1)
 const [last_page, setlast_page] = useState(false)
  const [vehicleMaintenaceList, setvehicleMaintenaceList] = useState([])
  const [yearStartDate, setyearStartDate] = useState(new Date());
  const [yearEndDate, setyearEndDate] = useState(new Date());
  const [total_pages, set_total_pages] = useState(null)
  const [trigger, setTrigger] = useState(false);
  const [spinner_loading, set_spinner_loading] = useState(false);
  ///////////////////////////////////////////////////////////////////////////////////////
  const [page, setPage] = useState(1)
  const [ItemName, setFiltertItem] = useState('')
  const [LocationPrice, setFiltertPrice] = useState('')
  const [AccesoryList, setAccesoryList] = useState([])
 

  const [totalPages, setTotalPages] = useState(0)
  const [pdfData, setpdfData] = useState("");
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
  ///////////////////////////////////////////////////////////////////////////////////////////

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
  }
  const { t, i18n } = useTranslation()

  const renderTooltipForEdit = props => (
    <Tooltip id='button-tooltip' {...props}>
      Edit
    </Tooltip>
  )
  const renderTooltipForView = props => (
    <Tooltip id='button-tooltip' {...props}>
      View
    </Tooltip>
  )
  const [vehicleState, setVehicleState] = useState({
    isloading: true,
    vehicles: [],
  });
  const [VehicalType, setVehicalType] = useState([]);
  const [FilterName, setFilterName] = useState('');
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
  const handleSelectAll = () => {
    setPage(1);
    setCurrentTab("0")
    setMaintenaceStatus('all')
    // geMaintenance(1, 'all')
    reportViewList( currentDate.toDayDate, yearStartDate, yearEndDate, firstDayOfMonth, endDayOfMonth, NextDateShow.toNextDate, optionData, weekStartDate, weekEndDate , 1, 'all');
    setMaintenacePage(1)
    setVehicleName('')
    setFilterName('')
    setVehicleServiceDate('')
    setVehicleKilometers('')
  }
  const handleSelectDuse = () => {
    setPage(1);
    setCurrentTab("1")
    setMaintenaceStatus('dues')
    // geMaintenance(1, 'dues')
    reportViewList( currentDate.toDayDate, yearStartDate, yearEndDate, firstDayOfMonth, endDayOfMonth, NextDateShow.toNextDate, optionData, weekStartDate, weekEndDate , 1, 'dues');

    setMaintenacePage(1)
    setVehicleName('')
    setFilterName('')
    setVehicleServiceDate('')
    setVehicleKilometers('')
  }
  const handleSelectUpcoming = () => {
    setPage(1);
    setCurrentTab("2")
    setMaintenaceStatus('upcoming')
    // geMaintenance(1, 'upcoming')
    reportViewList( currentDate.toDayDate, yearStartDate, yearEndDate, firstDayOfMonth, endDayOfMonth, NextDateShow.toNextDate, optionData, weekStartDate, weekEndDate , 1, 'upcoming');

    setMaintenacePage(1)
    setVehicleName('')
    setFilterName('')
    setVehicleServiceDate('')
    setVehicleKilometers('')
  }

  const handleSelectHistory = () => {
    setPage(1);
    setCurrentTab("3")
    setMaintenaceStatus('history')
    // geMaintenance(1, 'history')
    reportViewList( currentDate.toDayDate, yearStartDate, yearEndDate, firstDayOfMonth, endDayOfMonth, NextDateShow.toNextDate, optionData, weekStartDate, weekEndDate , 1, 'history');
    setMaintenacePage(1)
    setVehicleName('')
    setFilterName('')
    setVehicleServiceDate('')
    setVehicleKilometers('')
  }

  // useEffect(() => {
  //   // geMaintenance(Maintenacepage, 'all')
  //   reportViewList( currentDate.toDayDate,  yearStartDate, yearEndDate, firstDayOfMonth, endDayOfMonth, NextDateShow.toNextDate, optionData, weekStartDate, weekEndDate , Maintenacepage, 'all');
  //   // geATranspoertAllList(page);
  // }, [VehicleName, FilterName, VehicleServiceDate, VehicleKilometers])

  // useEffect(()=>{
  //   geMaintenance();
  // }, [])
  function geMaintenance (currentPage, status) {
   currentPage==1 && setLoading(true);
  let newRequestBody = JSON.stringify({
      type: status,
      // vehicle_name: VehicleName,
      vehicle_name: FilterName?.vehicle_name ? FilterName?.vehicle_name : '',
      kilometers: VehicleKilometers,
      service_date: VehicleServiceDate,
      next_service_date: VehicleServiceDate,
      page: currentPage,
      page_limit:recordsPerPage
    })
    simplePostCall(ApiConfig.MAINTENANCE_LIST, newRequestBody)
      .then(data => {
        setLoading(false)
        if (data.result) {
          // setTotalPages(data.total)
          setTotalActive(data.total_count)

          setlast_page(data.last_page)
          let FilterData = data.data ? data.data : []
          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,
              user_profile_pic: eachteam.user_profile_pic || '',
              user_name: eachteam.user_name || '',
              user_email: eachteam.user_email || ''
            }
          })
          console.log('TransportList --->', TransportData)

          if (currentPage === 1 || currentPage === 0) {
            setvehicleMaintenaceList(data.data)
          } else {
            setvehicleMaintenaceList([
              ...vehicleMaintenaceList,
              ...TransportData
            ])
          }
        } else {
          setvehicleMaintenaceList(0)
          setTotalActive(data.total_count)

          setlast_page(false)
        }
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  // function onPageLoad () {
  //   setMaintenacePage(Maintenacepage + 1)
  //   geMaintenance(Maintenacepage + 1, 'all')
  // }
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
 async  function onPageLoad () {  
    if(page < total_pages + 1 ){
     
  setPage((prevState) => prevState + 1);
      
//  console.log('page-->', page)
await reportViewList( currentDate.toDayDate, yearStartDate, yearEndDate, firstDayOfMonth, endDayOfMonth, NextDateShow.toNextDate, optionData, weekStartDate, weekEndDate, page, 'all');

// Wait for an additional 3 seconds
//  await delay(1000); 
}
}

  // function onPageLoadduse () {
  //   setMaintenacePage(Maintenacepage + 1)
  //   geMaintenance(Maintenacepage + 1, 'dues')
  // }
  async  function onPageLoadduse () {  
    if(page < total_pages + 1 ){
    
  setPage((prevState) => prevState + 1);
      
//  console.log('page-->', page)
await reportViewList( currentDate.toDayDate, yearStartDate, yearEndDate, firstDayOfMonth, endDayOfMonth, NextDateShow.toNextDate, optionData, weekStartDate, weekEndDate, page, 'dues');

// Wait for an additional 3 seconds
//  await delay(1000); 
}
}

  // function onPageLoadUpcoming () {
  //   setMaintenacePage(Maintenacepage + 1)
  //   geMaintenance(Maintenacepage + 1, 'upcoming')
  // }
  async  function onPageLoadUpcoming () {  
    if(page < total_pages + 1 ){
    
  setPage((prevState) => prevState + 1);
      
//  console.log('page-->', page)
await reportViewList( currentDate.toDayDate, yearStartDate, yearEndDate, firstDayOfMonth, endDayOfMonth, NextDateShow.toNextDate, optionData, weekStartDate, weekEndDate, page, 'upcoming');

// Wait for an additional 3 seconds
//  await delay(1000); 
}
}
  // function onPageLoadHistery () {
  //   setMaintenacePage(Maintenacepage + 1)
  //   geMaintenance(Maintenacepage + 1, 'history')
  // }

  async  function onPageLoadHistery () {  
    if(page < total_pages + 1 ){
    
  setPage((prevState) => prevState + 1);
      
//  console.log('page-->', page)
await reportViewList( currentDate.toDayDate, yearStartDate, yearEndDate, firstDayOfMonth, endDayOfMonth, NextDateShow.toNextDate, optionData, weekStartDate, weekEndDate, page, 'history');

// Wait for an additional 3 seconds
//  await delay(1000); 
}
}

    // start new geVehicalList fun made by me/////////////////////////////////////

function geVehicalList_new() {
  // getWithAuthCall(ApiConfig.VEHICLE_ACCIDENT_VEHICALE_LIST)
  getWithAuthCall(ApiConfig.VEHICEL_AVALIVALITY_DROPDAWAN)
  .then((data) => {
    let Type = data?.data
  
    setVehicalType(data?.data);
    var vehicles =[];

    Type?.map((vehicle , index)=>{
      vehicles?.push({
         value : vehicle.vehicle_id,
         label : vehicle.vehicle_number
      })

    });

    setVehicleState({...vehicleState , vehicles : vehicles})


  })
    .catch((error) => {
      console.log("api response", error);
    });
}
useEffect(()=>{
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
  setMaintenacePage(1);
  setPage(1);
  setTrigger(true);
  const newDate = new Date(NextDateShow.toNextDate);
  newDate.setDate(newDate.getDate() - daysToAdd);
  if(optionData !== 'all'){
  setNextDateShow({ toNextDate: newDate });
  console.log(`Subtracting ${daysToAdd} days. New date: ${newDate}`);
  }
};
const handleNextButtonClick = () => {
  setMaintenacePage(1)
  setPage(1);
  setTrigger(true);
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
  weekEnd, currentPage, status
) => {
  let requestData;

  if (selelctedDrop === "month") {
    requestData = {
          
     type: status,
     vehicle_name: FilterName?.vehicle_name ? FilterName?.vehicle_name?.toLowerCase(): '',
      kilometers: VehicleKilometers,
      service_date: /* VehicleServiceDate, */ latestDate(firstmonth, "yyyy-MM-dd"),
      next_service_date: /* VehicleServiceDate, */ latestDate(firstmonth, "yyyy-MM-dd"),
      // date: latestDate(firstmonth, "yyyy-MM-dd"),
      lastDate :latestDate(endmonth, "yyyy-MM-dd"),
      page: currentPage,
      page_limit:recordsPerPage,
      format : OptionDownload,
    };
  } else if (selelctedDrop === "year") {
    requestData = {
          
     type: status,
     vehicle_name: FilterName?.vehicle_name ? FilterName?.vehicle_name?.toLowerCase(): '',
      kilometers: VehicleKilometers,
      service_date: /* VehicleServiceDate, */ latestDate(yearStart, "yyyy-MM-dd"),
      next_service_date: /* VehicleServiceDate, */ latestDate(yearStart, "yyyy-MM-dd"),
      // date: latestDate(firstmonth, "yyyy-MM-dd"),
      lastDate :latestDate(yearEnd, "yyyy-MM-dd"),
      page: currentPage,
      page_limit:recordsPerPage,
      format : OptionDownload,
    };
  }
   else if (selelctedDrop === "week") {
    // Handle OtherMonth case
    requestData = {
    
   

      type: status,
      vehicle_name: FilterName?.vehicle_name ? FilterName?.vehicle_name?.toLowerCase() : '',
       kilometers: VehicleKilometers,
       service_date: /* VehicleServiceDate, */ latestDate(weekStart, "yyyy-MM-dd"),
       next_service_date: /* VehicleServiceDate, */ latestDate(weekStart, "yyyy-MM-dd"),
      //  date: latestDate(weekStart, "yyyy-MM-dd"),
      lastDate :latestDate(weekEnd, "yyyy-MM-dd"),
       page: currentPage,
       page_limit:recordsPerPage,
       format : OptionDownload,
    
    };
  }  else if (selelctedDrop === "date") {
    requestData = {
      type: status,
      vehicle_name: FilterName?.vehicle_name ? FilterName?.vehicle_name?.toLowerCase() : '',
       kilometers: VehicleKilometers,
       service_date: /* VehicleServiceDate, */ latestDate(nextDate, "yyyy-MM-dd"),
       next_service_date: /* VehicleServiceDate, */ latestDate(nextDate, "yyyy-MM-dd"),
      //  date: latestDate(nextDate, "yyyy-MM-dd"),
       lastDate :latestDate(nextDate, "yyyy-MM-dd"),
       page: currentPage,
       page_limit:recordsPerPage,
       format : OptionDownload,
    };
  }
  else {
    // Handle other cases
    requestData = {
      type: status,
      vehicle_name: FilterName?.vehicle_name ? FilterName?.vehicle_name?.toLowerCase() : '',
       kilometers: VehicleKilometers,
       service_date: /* VehicleServiceDate, */ '',
       next_service_date: /* VehicleServiceDate, */ '',
      //  date: latestDate(nextDate, "yyyy-MM-dd"),
       lastDate :'',
       page: currentPage,
       page_limit:recordsPerPage,
       format : OptionDownload,
    };
  }

  // if (requestData) {
  //   // {
  //   //   OptionDownload == "pdf" || OptionDownload == "excel"
  //   //     ? setLoading(false)
  //   //     : setLoading(true);
  //   // }
  //   setOptionDownload("");
  //   // simplePostCall(
  //     simplePostCallPromise(
  //     ApiConfig.MAINTENANCE_LIST ,
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
  //           setvehicleMaintenaceList(res.data ? res.data : res.data);
  //           setlast_page(res?.last_page)
  //           setTotalActive(res?.total_count)
  //           }
  //           else {
  //             setvehicleMaintenaceList([...vehicleMaintenaceList, ...LearningData])
  //               // setlast_page(false)
  //               setlast_page(res?.last_page)
  //               setTotalPages(res?.total_count)
  //             }

  //         }
  //         // Set the array to the state
  //       } else {
  //         setOptionDownload("");
  //         setvehicleMaintenaceList([]);
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
      const res = await simplePostCallPromise(ApiConfig.MAINTENANCE_LIST, JSON.stringify(requestData));
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
            setvehicleMaintenaceList(coursesData);
            setlast_page(res?.last_page);
            setTotalActive(res?.total_count);
          } else {
            setvehicleMaintenaceList((prev) => [...prev, ...LearningData]);
            setlast_page(res?.last_page);
            setTotalPages(res?.total_count);
          }
        }
      } else {
        setOptionDownload("");
        setvehicleMaintenaceList([]);
      }
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
      set_spinner_loading(false);
    }
  }
};


  useEffect(()=>{
    // setPage(1);
      // setMaintenacePage(1);
      if(trigger){
    reportViewList(
            currentDate.toDayDate,
            yearStartDate, yearEndDate,
            firstDayOfMonth,
            endDayOfMonth,
            NextDateShow.toNextDate,
            optionData,
            weekStartDate,
            weekEndDate, page ,MaintenaceStatus
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
       VehicleKilometers,
      VehicleServiceDate,
      yearStartDate, yearEndDate, trigger
      
    ]);
    useEffect(()=>{
      setPage(1);
      setMaintenacePage(1);
      setTrigger(true);
    },[FilterName?.vehicle_name, VehicleKilometers, optionData
    /* weekEndDate,
    weekStartDate,
    // currentDate,
    NextDateShow,
    firstDayOfMonth,
    optionData,
    endDayOfMonth,
    FilterName?.vehicle_name,
     VehicleKilometers,
    VehicleServiceDate,
    yearStartDate, yearEndDate, */])
    

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
      weekEndDate, '', MaintenaceStatus
   
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
  endDayOfMonth, VehicleKilometers,
  VehicleServiceDate,
  yearStartDate, yearEndDate,
]);
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
        <div id='cx-wrapper' className='Fleet_Maintenance'>
          {/* Top inputs for instatnt search */}
          <div className='displayFlexInp- displayFlexInp-for-expense-header'>
         
            <div className='innerSelectBox weekCounter selectForm-1 form_input_main'>
                  <p>
                    <p style={{color:'#9C4900'}}>
                      {t("Date:")} {formattedNextDate()}
                    </p>
                  </p>
                </div>
              {/* <input
                type='text'
                className='form-control'
                placeholder='Vehicle Name'
                value={VehicleName}
                onChange={e => {
                  setVehicleName(e.target.value)
                  setMaintenacePage(1)
                }}
              /> */}
                 <div className='innerSelectBox weekCounter selectForm-1 form_input_main'>

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
                                  }, })}
                             
                                placeholder="Vehicle Name"
                                value={selectedVehicle}
                                options={vehicleState?.vehicles}
                                isClearable
                                isSearchable
                                onChange={(selectedOption) => {
                                  setFilterName({
                                    vehicle_name: selectedOption ? selectedOption.label : '',
                                  });
                                  setMaintenacePage(1)
                                }}
                               
                              >
                               
                              </Select>
            </div>
            <div className='innerSelectBox weekCounter selectForm-1 form_input_main'>
              <Form.Control
                required
                type='text'
                placeholder='Kilometers'
                className='innerCust'
                value={VehicleKilometers}
                onChange={e => {
                  const inputValue = e.target.value.replace(/[^0-9]/g, '');
                  setVehicleKilometers(inputValue)
                  setMaintenacePage(1)
                }}
              />
            </div>
            <div className='innerSelectBox weekCounter selectForm-1 form_input_main datepicker-main'>
            
             {/*  <input
                class='datepicker-here form-control digits'
                type='date'
                data-language='en'
                placeholder='MM-DD-YYYY'
                data-position='top left'
                name='submission_date'
                value={VehicleServiceDate}
                // onChange={(date) => setStartDate(date)}
                onChange={e => setVehicleServiceDate(e.target.value)}
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
                  style={{ width: "100%", height:'38px' }}
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
                  <Option  value="month" style={{ color: "rgba(156, 73, 0)" }}>
                    {t("Month")}
                  </Option>
                  <Option  value="year" style={{ color: "rgba(156, 73, 0)" }}>
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
              (accessRights &&
                accessRights?.rights_manage_vehicle_maintainance) ? (
                <Link to='/AddVehicleMaintenance' className='AddAccidentLink'>
                  <button className='innerCust'>+ {t('Add New')}</button>
                </Link>
              ) : null}
            </div>
            {/* <div className="headerDivIc form_input_main">
              <Link to="#">
                <img src={SideIc} alt="" />
              </Link>
            </div> */}
            {/* <div className='headerDivIc form_input_main'>
              <Link to='#'>
                <img src={export_icon} alt='' />
              </Link>
            </div> */}
              <div className="md_dropdown">
              {spinner_loading ? ( <Spinner animation="border" role="status" style={{color:'#9C4900'}}>
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
                  </Dropdown> )}
                </div>
          </div>

          {/* Vehicle table */}

          {loading ? (
          <Loader />
        ) : (
          <>
          <div className='Vehcle-main-tabs' id='Vehcle-main-tabs'>
            <div className='main-master-wrapper mb-0 inner-tabs-section'>
              <div id='scroll_insideThe_Padding_tabel'>
                <div className='VA_table'>
                  <Tab.Container
                    id='left-tabs-example'
                    className='td-tab-wrapper'
                    defaultActiveKey='0'
                   activeKey={currentTab} 
                  >
                    <Nav
                      variant='pills'
                      className='td-nav'
                      id='InnerTabNew_Foure'
                       onSelect={selectedKey => setCurrentTab(`${selectedKey}`)}
                    >
                      <Nav.Item className='td-tab'>
                        <Nav.Link
                          className='td-link'
                          eventKey='0'
                          onClick={handleSelectAll}
                        >
                          All
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className='td-tab'>
                        <Nav.Link
                          className='td-link'
                          eventKey='1'
                          onClick={handleSelectDuse}
                        >
                          Dues
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className='td-tab'>
                        <Nav.Link
                          className='td-link'
                          eventKey='2'
                          onClick={handleSelectUpcoming}
                        >
                          Upcoming
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className='td-tab'>
                        <Nav.Link
                          className='td-link'
                          eventKey='3'
                          onClick={handleSelectHistory}
                        >
                          History
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Col sm={12} className=''>
                      <Tab.Content>
                        <Tab.Pane eventKey='0'>
                          {/* Vehicle table */}
                          <div className='main-master-wrapper'>
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
                                const nearBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
                              
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
                                      <th>{t('Service Date')}</th>
                                      <th>{t('Kilometers Driven')}</th>
                                      <th>{t('Due Date')}</th>
                                      <th>{t('Service Cost')}</th>
                                      <th>{t('Action')}</th>
                                    </tr>
                                  </thead>
                                  {vehicleMaintenaceList &&
                                  vehicleMaintenaceList.length > 0 ? (
                                    vehicleMaintenaceList.map(
                                      (itemlist, index) => {
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
    style={{ marginRight: '10px', borderRadius:'5px' }} // Add some space between the text and image
  />{itemlist.vehicle_number}</td>
                                              <td>
                                                {DateDDMMYYYY(
                                                  itemlist.maintainance_service_date
                                                )}
                                              </td>
                                              <td>
                                                {
                                                  itemlist.maintainance_kilometers_driven
                                                }
                                              </td>
                                              <td>
                                                {DateDDMMYYYY(
                                                  itemlist.maintainance_next_service_date
                                                )}
                                              </td>
                                              <td>
                                                {itemlist.maintainance_expense ==
                                                  null &&
                                                itemlist.last_maintainance_expense
                                                  ? itemlist.last_maintainance_expense
                                                  : itemlist.maintainance_expense
                                                  ? itemlist.maintainance_expense
                                                  : 'Not completed'}
                                              </td>
                                              <td>
                                                <div className='innerFlex d-flex'>
                                                {userRole === 'customer' ||
                                                  (accessRights &&
                                                    accessRights?.rights_view_vehicle_maintainance) ? (
                                                  <OverlayTrigger
                                                    placement='bottom'
                                                    delay={{
                                                      show: 250,
                                                      hide: 400
                                                    }}
                                                    overlay={
                                                      renderTooltipForView
                                                    }
                                                  >
                                                    <Link
                                                      to={
                                                        '/ViewVehicleMaintenance/' +
                                                        itemlist.maintainance_vehicle_id +
                                                        '/' +
                                                        itemlist.maintainance_task
                                                      }
                                                    >
                                                      <div className='inconsIn me-3'>
                                                        <img
                                                          src={View}
                                                          alt=''
                                                        />
                                                      </div>
                                                    </Link>
                                                  </OverlayTrigger> ) : null}
                                                  {userRole === 'customer' ||
                                                  (accessRights &&
                                                    accessRights?.rights_manage_vehicle_maintainance) ? (
                                                    <OverlayTrigger
                                                      placement='bottom'
                                                      delay={{
                                                        show: 250,
                                                        hide: 400
                                                      }}
                                                      overlay={
                                                        renderTooltipForEdit
                                                      }
                                                    >
                                                      <Link
                                                        to={
                                                          '/AddVehicleMaintenance/' +
                                                          itemlist.maintainance_id
                                                        }
                                                      >
                                                        <div className='inconsIn me-3'>
                                                          <img
                                                            src={EditIc}
                                                            alt=''
                                                          />
                                                        </div>
                                                      </Link>
                                                    </OverlayTrigger>
                                                  ) : null}
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        )
                                      }
                                    )
                                  ) : (
                                    <></>
                                  )}
                                </table>
                                {/* {last_page === true ? <NoMoreDataComp /> : ''} */}
                                {vehicleMaintenaceList.length > 0 ? (
                                  <></>
                                ) : (
                                  <NoDataComp />
                                )}
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey='1'>
                          {/* Vehicle table */}
                          <div className='main-master-wrapper'>
                            <div
                              id='scroll_insideThe_Padding_tabel'
                              // onScroll={e => {
                              //   const bottom =
                              //     e.target.scrollHeight - e.target.scrollTop ===
                              //     e.target.clientHeight

                              //   if (bottom && !last_page) onPageLoadduse()
                              // }}
                              onScroll={e => {
                                const element = e.target;
                                const nearBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
                              
                                if (nearBottom) {
                                
                                  onPageLoadduse();
                                }
                              }}
                            >
                              <div className='VA_table'>
                                <table className='table tableAdmin'>
                                  <thead className='tableHead'>
                                    <tr>
                                      <th>{t('Sr.no')}</th>
                                      <th width='25%'>{t('Vehicle Name')}</th>
                                      <th>{t('Service Date')}</th>
                                      <th>{t('Kilometers Driven')}</th>
                                      <th>{t('Due Date')}</th>
                                      <th>{t('Service Cost')}</th>
                                      <th>{t('Action')}</th>
                                    </tr>
                                  </thead>

                                  {vehicleMaintenaceList &&
                                  vehicleMaintenaceList.length > 0 ? (
                                    vehicleMaintenaceList.map(
                                      (itemlist, index) => {
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
    style={{ marginRight: '10px', borderRadius:'5px' }} // Add some space between the text and image
  />{itemlist.vehicle_number}</td>
                                              <td>
                                                {DateDDMMYYYY(
                                                  itemlist.maintainance_service_date
                                                )}
                                              </td>
                                              <td>
                                                {
                                                  itemlist.maintainance_kilometers_driven
                                                }
                                              </td>
                                              <td>
                                                {DateDDMMYYYY(
                                                  itemlist?.maintainance_next_service_date
                                                )}
                                              </td>
                                              <td>
                                                {itemlist.maintainance_expense ==
                                                  null &&
                                                itemlist.last_maintainance_expense
                                                  ? itemlist.last_maintainance_expense
                                                  : itemlist.maintainance_expense
                                                  ? itemlist.maintainance_expense
                                                  : 'Not completed'}
                                              </td>
                                            {/*   <td>
                                                <div className='innerFlex d-flex'>
                                                {userRole === 'customer' ||
                                                  (accessRights &&
                                                    accessRights?.rights_view_vehicle_maintainance) ? (
                                                  <OverlayTrigger
                                                    placement='bottom'
                                                    delay={{
                                                      show: 250,
                                                      hide: 400
                                                    }}
                                                    overlay={
                                                      renderTooltipForView
                                                    }
                                                  >
                                                    <Link
                                                      to={
                                                        '/ViewVehicleMaintenance/' +
                                                        itemlist?.maintainance_vehicle_id +
                                                        '/'+
                                                        itemlist?.maintainance_task?.trim()
                                                      }
                                                    >
                                                      <div className='inconsIn me-3'>
                                                        <img
                                                          src={View}
                                                          alt=''
                                                        />
                                                      </div>
                                                    </Link>
                                                  </OverlayTrigger> ) : null }
                                                  {userRole === 'customer' ||
                                                  (accessRights &&
                                                    accessRights?.rights_manage_vehicle_maintainance) ? (
                                                  <OverlayTrigger
                                                    placement='bottom'
                                                    delay={{
                                                      show: 250,
                                                      hide: 400
                                                    }}
                                                    overlay={
                                                      renderTooltipForEdit
                                                    }
                                                  >
                                                    <Link
                                                      to={
                                                        '/AddVehicleMaintenance/' +
                                                        itemlist.maintainance_id
                                                      }
                                                    >
                                                      <div className='inconsIn me-3'>
                                                        <img
                                                          src={EditIc}
                                                          alt=''
                                                        />
                                                      </div>
                                                    </Link>
                                                  </OverlayTrigger> ) : null }
                                                </div>
                                              </td> */}
                                                <td>
                                                <div className='innerFlex d-flex'>
                                                {userRole === 'customer' ||
                                                  (accessRights &&
                                                    accessRights?.rights_view_vehicle_maintainance) ? (
                                                  <OverlayTrigger
                                                    placement='bottom'
                                                    delay={{
                                                      show: 250,
                                                      hide: 400
                                                    }}
                                                    overlay={
                                                      renderTooltipForView
                                                    }
                                                  >
                                                    <Link
                                                      to={
                                                        '/ViewVehicleMaintenance/' +
                                                        itemlist.maintainance_vehicle_id +
                                                        '/' +
                                                        itemlist.maintainance_task
                                                      }
                                                    >
                                                      <div className='inconsIn me-3'>
                                                        <img
                                                          src={View}
                                                          alt=''
                                                        />
                                                      </div>
                                                    </Link>
                                                  </OverlayTrigger> ) : null}
                                                  {userRole === 'customer' ||
                                                  (accessRights &&
                                                    accessRights?.rights_manage_vehicle_maintainance) ? (
                                                    <OverlayTrigger
                                                      placement='bottom'
                                                      delay={{
                                                        show: 250,
                                                        hide: 400
                                                      }}
                                                      overlay={
                                                        renderTooltipForEdit
                                                      }
                                                    >
                                                      <Link
                                                        to={
                                                          '/AddVehicleMaintenance/' +
                                                          itemlist.maintainance_id
                                                        }
                                                      >
                                                        <div className='inconsIn me-3'>
                                                          <img
                                                            src={EditIc}
                                                            alt=''
                                                          />
                                                        </div>
                                                      </Link>
                                                    </OverlayTrigger>
                                                  ) : null}
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        )
                                      }
                                    )
                                  ) : (
                                    <></>
                                  )}
                                </table>
                                {/* {last_page === true ? <NoMoreDataComp /> : ''} */}
                                {vehicleMaintenaceList.length > 0 ? (
                                  <></>
                                ) : (
                                  <NoDataComp />
                                )}
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey='2'>
                          {/* Vehicle table */}
                          <div className='main-master-wrapper'>
                            <div
                              id='scroll_insideThe_Padding_tabel'
                              // onScroll={e => {
                              //   const bottom =
                              //     e.target.scrollHeight - e.target.scrollTop ===
                              //     e.target.clientHeight

                              //   if (bottom && !last_page) onPageLoadUpcoming()
                              // }}
                              onScroll={e => {
                                const element = e.target;
                                const nearBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
                              
                                if (nearBottom) {
                                
                                  onPageLoadUpcoming();
                                }
                              }}
                            >
                              <div className='VA_table'>
                                <table className='table tableAdmin'>
                                  <thead className='tableHead'>
                                    <tr>
                                      <th>{t('Sr.no')}</th>
                                      <th width='25%'>{t('Vehicle Name')}</th>
                                      <th>{t('Service Date')}</th>
                                      <th>{t('Kilometers Driven')}</th>
                                      <th>{t('Due Date')}</th>
                                      <th>{t('Service Cost')}</th>
                                      <th>{t('Action')}</th>
                                    </tr>
                                  </thead>
                                  {vehicleMaintenaceList &&
                                  vehicleMaintenaceList.length > 0 ? (
                                    vehicleMaintenaceList.map(
                                      (itemlist, index) => {
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
    style={{ marginRight: '10px', borderRadius:'5px' }} // Add some space between the text and image
  />{itemlist.vehicle_number}</td>
                                              <td>
                                                {DateDDMMYYYY(
                                                  itemlist.maintainance_service_date
                                                )}
                                              </td>
                                              <td>
                                                {
                                                  itemlist.maintainance_kilometers_driven
                                                }
                                              </td>
                                              <td>
                                                {DateDDMMYYYY(
                                                  itemlist.maintainance_next_service_date
                                                )}
                                              </td>
                                              <td>
                                                {itemlist.maintainance_expense ==
                                                  null &&
                                                itemlist.last_maintainance_expense
                                                  ? itemlist.last_maintainance_expense
                                                  : itemlist.maintainance_expense
                                                  ? itemlist.maintainance_expense
                                                  : 'Not completed'}
                                              </td>
                                           {/*    <td>
                                                <div className='innerFlex d-flex'>
                                                {userRole === 'customer' ||
                                                  (accessRights &&
                                                    accessRights?.rights_view_vehicle_maintainance) ? (
                                                  <OverlayTrigger
                                                    placement='bottom'
                                                    delay={{
                                                      show: 250,
                                                      hide: 400
                                                    }}
                                                    overlay={
                                                      renderTooltipForView
                                                    }
                                                  >
                                                    <Link
                                                      to={
                                                        '/ViewVehicleMaintenance/' +
                                                        itemlist.maintainance_vehicle_id +
                                                        '/' +
                                                        itemlist?.maintainance_task?.trim()
                                                      }
                                                    >
                                                      <div className='inconsIn me-3'>
                                                        <img
                                                          src={View}
                                                          alt=''
                                                        />
                                                      </div>
                                                    </Link>
                                                  </OverlayTrigger> ) : null }
                                                  {userRole === 'customer' ||
                                                  (accessRights &&
                                                    accessRights?.rights_manage_vehicle_maintainance) ? (
                                                  <OverlayTrigger
                                                    placement='bottom'
                                                    delay={{
                                                      show: 250,
                                                      hide: 400
                                                    }}
                                                    overlay={
                                                      renderTooltipForEdit
                                                    }
                                                  >
                                                    <Link
                                                      to={
                                                        '/AddVehicleMaintenance/' +
                                                        itemlist.maintainance_id
                                                      }
                                                    >
                                                      <div className='inconsIn me-3'>
                                                        <img
                                                          src={EditIc}
                                                          alt=''
                                                        />
                                                      </div>
                                                    </Link>
                                                  </OverlayTrigger> ) : null }
                                                </div>
                                              </td> */}
                                                <td>
                                                <div className='innerFlex d-flex'>
                                                {userRole === 'customer' ||
                                                  (accessRights &&
                                                    accessRights?.rights_view_vehicle_maintainance) ? (
                                                  <OverlayTrigger
                                                    placement='bottom'
                                                    delay={{
                                                      show: 250,
                                                      hide: 400
                                                    }}
                                                    overlay={
                                                      renderTooltipForView
                                                    }
                                                  >
                                                    <Link
                                                      to={
                                                        '/ViewVehicleMaintenance/' +
                                                        itemlist.maintainance_vehicle_id +
                                                        '/' +
                                                        itemlist.maintainance_task
                                                      }
                                                    >
                                                      <div className='inconsIn me-3'>
                                                        <img
                                                          src={View}
                                                          alt=''
                                                        />
                                                      </div>
                                                    </Link>
                                                  </OverlayTrigger> ) : null}
                                                  {userRole === 'customer' ||
                                                  (accessRights &&
                                                    accessRights?.rights_manage_vehicle_maintainance) ? (
                                                    <OverlayTrigger
                                                      placement='bottom'
                                                      delay={{
                                                        show: 250,
                                                        hide: 400
                                                      }}
                                                      overlay={
                                                        renderTooltipForEdit
                                                      }
                                                    >
                                                      <Link
                                                        to={
                                                          '/AddVehicleMaintenance/' +
                                                          itemlist.maintainance_id
                                                        }
                                                      >
                                                        <div className='inconsIn me-3'>
                                                          <img
                                                            src={EditIc}
                                                            alt=''
                                                          />
                                                        </div>
                                                      </Link>
                                                    </OverlayTrigger>
                                                  ) : null}
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        )
                                      }
                                    )
                                  ) : (
                                    <></>
                                  )}
                                </table>
                                {/* {last_page === true ? <NoMoreDataComp /> : ''} */}
                                {vehicleMaintenaceList.length > 0 ? (
                                  <></>
                                ) : (
                                  <NoDataComp />
                                )}
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey='3'>
                          {/* Vehicle table */}
                          <div className='main-master-wrapper'>
                            <div
                              id='scroll_insideThe_Padding_tabel'
                              // onScroll={e => {
                              //   const bottom =
                              //     e.target.scrollHeight - e.target.scrollTop ===
                              //     e.target.clientHeight

                              //   if (bottom && !last_page) onPageLoadHistery()
                              // }}
                              onScroll={e => {
                                const element = e.target;
                                const nearBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
                              
                                if (nearBottom) {
                                
                                  onPageLoadHistery();
                                }
                              }}
                            >
                              <div className='VA_table'>
                                <table className='table tableAdmin'>
                                  <thead className='tableHead'>
                                    <tr>
                                      <th>{t('Sr.no')}</th>
                                      <th width='25%'>{t('Vehicle Name')}</th>
                                      <th>{t('Service Date')}</th>
                                      <th>{t('Kilometers Driven')}</th>
                                      <th>{t('Due Date')}</th>
                                      <th>{t('Last Service Cost')}</th>
                                      <th>{t('Action')}</th>
                                    </tr>
                                  </thead>
                                  {vehicleMaintenaceList &&
                                  vehicleMaintenaceList.length > 0 ? (
                                    vehicleMaintenaceList.map(
                                      (itemlist, index) => {
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
    style={{ marginRight: '10px', borderRadius:'5px' }} // Add some space between the text and image
  />{itemlist.vehicle_number}</td>
                                              <td>
                                                {DateDDMMYYYY(
                                                  itemlist.maintainance_service_date
                                                )}
                                              </td>
                                              <td>
                                                {
                                                  itemlist.maintainance_kilometers_driven
                                                }
                                              </td>
                                              <td>
                                                {DateDDMMYYYY(
                                                  itemlist?.maintainance_next_service_date
                                                )}
                                              </td>
                                              <td>
                                                {itemlist.maintainance_expense ==
                                                  null &&
                                                itemlist.last_maintainance_expense
                                                  ? itemlist.last_maintainance_expense
                                                  : itemlist.maintainance_expense
                                                  ? itemlist.maintainance_expense
                                                  : 'Not completed'}
                                              </td>
                                         {/*      <td>
                                                <div className='innerFlex d-flex'>
                                                {userRole === 'customer' ||
                                                  (accessRights &&
                                                    accessRights?.rights_view_vehicle_maintainance) ? (
                                                  <OverlayTrigger
                                                    placement='bottom'
                                                    delay={{
                                                      show: 250,
                                                      hide: 400
                                                    }}
                                                    overlay={
                                                      renderTooltipForView
                                                    }
                                                  >
                                                    <Link
                                                      to={
                                                        '/ViewVehicleMaintenance/'+
                                                        itemlist?.maintainance_vehicle_id
                                                      }
                                                    >
                                                      <div className='inconsIn me-3'>
                                                        <img
                                                          src={View}
                                                          alt=''
                                                        />
                                                      </div>
                                                    </Link>
                                                  </OverlayTrigger> ) : null }
                                                  {userRole === 'customer' ||
                                                  (accessRights &&
                                                    accessRights?.rights_manage_vehicle_maintainance) ? (
                                                  <OverlayTrigger
                                                    placement='bottom'
                                                    delay={{
                                                      show: 250,
                                                      hide: 400
                                                    }}
                                                    overlay={
                                                      renderTooltipForEdit
                                                    }
                                                  >
                                                    <Link
                                                      to={
                                                        '/AddVehicleMaintenance/' +
                                                        itemlist.maintainance_id
                                                      }
                                                    >
                                                      <div className='inconsIn me-3'>
                                                        <img
                                                          src={EditIc}
                                                          alt=''
                                                        />
                                                      </div>
                                                    </Link>
                                                  </OverlayTrigger> ) : null }
                                                </div>
                                              </td> */}
  <td>
                                                <div className='innerFlex d-flex'>
                                                {userRole === 'customer' ||
                                                  (accessRights &&
                                                    accessRights?.rights_view_vehicle_maintainance) ? (
                                                  <OverlayTrigger
                                                    placement='bottom'
                                                    delay={{
                                                      show: 250,
                                                      hide: 400
                                                    }}
                                                    overlay={
                                                      renderTooltipForView
                                                    }
                                                  >
                                                    <Link
                                                      to={
                                                        '/ViewVehicleMaintenance/' +
                                                        itemlist.maintainance_vehicle_id +
                                                        '/' +
                                                        itemlist.maintainance_task
                                                      }
                                                    >
                                                      <div className='inconsIn me-3'>
                                                        <img
                                                          src={View}
                                                          alt=''
                                                        />
                                                      </div>
                                                    </Link>
                                                  </OverlayTrigger> ) : null}
                                                  {userRole === 'customer' ||
                                                  (accessRights &&
                                                    accessRights?.rights_manage_vehicle_maintainance) ? (
                                                    <OverlayTrigger
                                                      placement='bottom'
                                                      delay={{
                                                        show: 250,
                                                        hide: 400
                                                      }}
                                                      overlay={
                                                        renderTooltipForEdit
                                                      }
                                                    >
                                                      <Link
                                                        to={
                                                          '/AddVehicleMaintenance/' +
                                                          itemlist.maintainance_id
                                                        }
                                                      >
                                                        <div className='inconsIn me-3'>
                                                          <img
                                                            src={EditIc}
                                                            alt=''
                                                          />
                                                        </div>
                                                      </Link>
                                                    </OverlayTrigger>
                                                  ) : null}
                                                </div>
                                              </td>

                                            </tr>
                                          </tbody>
                                        )
                                      }
                                    )
                                  ) : (
                                    <></>
                                  )}
                                </table>
                                {/* {last_page === true ? <NoMoreDataComp /> : ''} */}
                                {vehicleMaintenaceList.length > 0 ? (
                                  <></>
                                ) : (
                                  <NoDataComp />
                                )}
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Tab.Container>
                </div>
              </div>
         { vehicleMaintenaceList?.length>0 &&    <Pagenation
                length={vehicleMaintenaceList.length}
                total={totalActive}
              />}
            </div>
          </div>
          </>
        )}

        </div>
      </motion.div>

      {/* Delete Modal Start */}
      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        centered
        className='common-model'
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('Delete Fleet Maintenance')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('Are you sure you want to Delete this Fleet Maintenance')} ?
        </Modal.Body>
        <Modal.Footer className='pop-up-modal-footer'>
          <div class='btn-wrapper'>
            <button className='cx-btn-1' onClick={() => setDeleteModal(false)}>
              {t('Cancel')}
            </button>
            <button className='cx-btn-2' onClick={() => setDeleteModal(false)}>
              {t('Yes')}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal End */}
    </>
  )
}

export default VehicleMaintenance

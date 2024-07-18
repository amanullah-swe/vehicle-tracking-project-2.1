import { React, useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import profile from '../../../assets/images/Customer-profile.png'
import GreenIcon from '../../../assets/images/Green-check.svg'
import camera from '../../../assets/images/prof_cam.svg'
import { Carousel, Col, Dropdown, Modal, Nav, Tab, Tabs } from 'react-bootstrap'
import option from '../../../assets/images/option-three-dot.svg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import t1 from '../../../assets/images/t1.svg'
import t2 from '../../../assets/images/t2.svg'
import ImportUser from '../../../assets/images/imagesuser.png'
import CrossBtn from "../../../assets/images/Creoss_Red.svg"
import t5 from '../../../assets/images/t5.svg'
import t6 from '../../../assets/images/t6.svg'
import t7 from '../../../assets/images/t7.svg'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import {
  simpleDeleteCall,
  simpleGetCallWithErrorResponse,
  simplePostCall
} from '../../../api/ApiServices'
import ApiConfig from '../../../api/ApiConfig'
import { notifyError, notifySuccess } from '../../../sharedComponent/notify'
import { DateDDMMYYYY } from '../../../sharedComponent/common'
import Loader from '../../../sharedComponent/Loader'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import NoDataComp from '../../../sharedComponent/NoDataComp'

const ViewDrivers = () => {
  const accessRights = useSelector(state => state.auth.accessRights)
  const userRole = accessRights && accessRights.rights_role
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const { t, i18n } = useTranslation()
  const [showblock, setShowblock] = useState(false)
  const [showresign, setShowresign] = useState(false)
  const handleCloseBlock = () => setShowblock(false)
  const handleShowblock = () => setShowblock(true)
  const handleCloseresign = () => setShowresign(false)
  const handleShowresign = () => setShowresign(true)
  const [DriverID, setDriverID] = useState('')
  const [DriverBlock, setDriverBlock] = useState('')
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
  }
  const [Drivers, setDriversAll] = useState([])
  const [SchedulAll, setSchedulAll] = useState([])
  const [ComplatedAll, setComplatedAll] = useState([])

  const [personDetails, setpersonDetails] = useState([])

  const params = useParams()
  let UserId = params.id

  useEffect(() => {
    if (UserId) {
      geDeliveryDetails()
      geDriverActive()
      getScheduledActive()
      getCompletedActive()
    }
  }, [])
  const geDeliveryDetails = () => {
    setLoading(true)

    simpleGetCallWithErrorResponse(
      ApiConfig.DRIVER_PROFLE + '?user_id=' + UserId
    )
      .then(res => {
        let user_profile = res.json.data.userDetails[0]

        setpersonDetails(user_profile)
      })
      .catch(err => {
        console.log('err', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function geDriverActive () {
    let newRequestBody = JSON.stringify({
      driverId: UserId,
      tripCategory: ''
    })
    simplePostCall(ApiConfig.DRIVERS_TRIPS, newRequestBody)
      .then(data => {
        if (data.success) {
          setDriversAll(data.data)
        } else {
          setDriversAll(data.data)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }
  function getScheduledActive () {
    let newRequestBody = JSON.stringify({
      driverId: UserId,
      tripCategory: 'Scheduled'
    })
    simplePostCall(ApiConfig.DRIVERS_TRIPS, newRequestBody)
      .then(data => {
        if (data.success) {
          setSchedulAll(data.data)
        } else {
          setSchedulAll(data.data)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }

  function getCompletedActive () {
    let newRequestBody = JSON.stringify({
      driverId: UserId,
      tripCategory: 'Dispatch'
    })
    simplePostCall(ApiConfig.DRIVERS_TRIPS, newRequestBody)
      .then(data => {
        if (data.success) {
          setComplatedAll(data.data)
        } else {
          setComplatedAll(data.data)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }

  function userDelete () {
    let newRequestBody = JSON.stringify({
      userId: UserId
    })
    simpleDeleteCall(ApiConfig.DRIVERS_DELETE, newRequestBody)
      .then(data => {
        if (data.success) {
          notifySuccess(data.message)
          handleClose()
        } else {
          notifyError(data.message)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }
  function handalResign () {
    if (DriverID === 'active') {
      userResign()
    } else {
      userUnResign()
    }
  }

  function handalBlock () {
    if (DriverBlock === 'active') {
      userBlock()
    } else {
      userUnBlock()
    }
  }

  function userBlock () {
    handleClose()
    let newRequestBody = JSON.stringify({
      userId: UserId
    })
    simplePostCall(ApiConfig.DRIVERS_BLOCK, newRequestBody)
      .then(data => {
        if (data.success) {
          notifySuccess(data.message)
          geDeliveryDetails()
          geDriverActive()
          getScheduledActive()
          getCompletedActive()
          // navigate('/Drivers')
        } else {
          notifyError(data.message)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }

  function userUnBlock () {
    handleClose()
    let newRequestBody = JSON.stringify({
      userId: UserId
    })
    simplePostCall(ApiConfig.DRIVERS_UN_BLOCK, newRequestBody)
      .then(data => {
        if (data.success) {
          notifySuccess(data.message)
          geDeliveryDetails()
          geDriverActive()
          getScheduledActive()
          getCompletedActive()
          // navigate('/Drivers')
        } else {
          notifyError(data.message)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }

  function userResign () {
    handleCloseresign()
    let newRequestBody = JSON.stringify({
      userId: UserId
    })
    simplePostCall(ApiConfig.DRIVERS_RESIGEN, newRequestBody)
      .then(data => {
        if (data.success) {
          notifySuccess(data.message)
          geDeliveryDetails()
          geDriverActive()
          getScheduledActive()
          getCompletedActive()
          // navigate('/Drivers')
        } else {
          notifyError(data.message)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }

  function userUnResign () {
    handleCloseresign()
    let newRequestBody = JSON.stringify({
      userId: UserId
    })
    simplePostCall(ApiConfig.DRIVERS_UN_RESIGEN, newRequestBody)
      .then(data => {
        if (data.success) {
          notifySuccess(data.message)
          geDeliveryDetails()
          geDriverActive()
          getScheduledActive()
          getCompletedActive()
          // navigate('/Drivers')
        } else {
          notifyError(data.message)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }
  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
 };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
            <div id='cx-wrapper' className='view_drivers'>
              <div
                className='main-dashboard-wrapper CustomerProfile'
                id='viewAdministratorProfile'
              >
                <div className='CustomerProfile-head'>
                  <div className='porile-img prof-img'>
                    {personDetails.user_profile_pic === '' ||
                    personDetails.user_profile_pic === null ? (
                      <img src={ImportUser} alt='porfile' />
                    ) : (
                      <img
                        src={
                          
                          personDetails.user_profile_pic
                        }
                        onError={(ev) => {
                          handleErrorImage(ev);
                        }}
                        alt='porfile'
                      />
                    )}
                  </div>
                  {userRole === 'customer' ||
                  (accessRights && accessRights.rights_manage_driver) ? (
                    <div className='customer-option'>
                      <Dropdown>
                        <Dropdown.Toggle id='dropdown-basic'>
                          <img src={option} alt='' />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <Link
                              to={'/AddDrivers/' + UserId}
                              className='d-block'
                            >
                              {t('Edit')}
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link
                              to={'/ChangeDriverPassword/' + UserId}
                              className='d-block'
                            >
                              {t('changePassword')}
                            </Link>
                          </Dropdown.Item>
                          {personDetails?.user_status === 'active' ? (
                            <>
                              <Dropdown.Item
                                href='#'
                                onClick={() => {
                                  handleShow()
                                  handleShowblock()
                                  setDriverBlock(personDetails.user_status)
                                }}
                                className='d-block'
                              >
                                <Link to='#' className='d-block'>
                                  {t('block')}
                                </Link>
                              </Dropdown.Item>
                              <Dropdown.Item
                                href='#'
                                onClick={() => {
                                  handleShowresign()
                                  setDriverID(personDetails.user_status)
                                }}
                                className='d-block'
                              >
                                <Link to='#' className='d-block'>
                                  {t('Resign')}
                                </Link>
                              </Dropdown.Item>
                            </>
                          ) : (
                            <>
                              {personDetails?.user_status === 'inactive' ? (
                                <Dropdown.Item
                                  href='#'
                                  onClick={() => {
                                    handleShow()
                                    setDriverBlock(personDetails.user_status)
                                  }}
                                  className='d-block'
                                >
                                  <Link to='#' className='d-block'>
                                    {t('Unblock')}
                                  </Link>
                                </Dropdown.Item>
                              ) : (
                                <></>
                              )}
                              {personDetails?.user_status === 'inactive' ? (
                                <></>
                              ) : (
                                <Dropdown.Item
                                  href='#'
                                  onClick={() => {
                                    handleShowresign()
                                    setDriverID(personDetails?.user_status)
                                  }}
                                  className='d-block'
                                >
                                  <Link to='#' className='d-block'>
                                    {t('UnResign')}
                                  </Link>
                                </Dropdown.Item>
                              )}
                            </>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  ) : null}
                </div>
                <div className='information-card'>
                  <div className='information-head'>
                    <div className='imformation-heading'>
                      <p>{t('Contact Information')}</p>
                    </div>
                  </div>
                  <div className='information-contain row'>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>{t('First Name')}</p>
                      <p className='discription-contain'>
                        {personDetails?.user_name}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>{t('Last Name')}</p>
                      <p className='discription-contain'>
                        {personDetails?.user_last_name}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>
                        {t('Mobile Number')}
                      </p>
                      <p className='discription-contain'>
                        {personDetails?.user_mobile}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>{t('Email')}</p>
                      <p className='discription-contain'>
                        {personDetails?.user_email}{' '}
                        <img src={personDetails?.user_email_verification=="yes"?GreenIcon:CrossBtn} alt="" />{" "}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>
                        {t('Vehicle Assignments')}
                      </p>
                      <p className='discription-contain'>
                      {personDetails?.vehicle_number}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='information-card mt-4 pt-3'>
                  <div className='information-head'>
                    <div className='imformation-heading'>
                      <p>{t('General Information')}</p>
                    </div>
                  </div>
                  <div className='information-contain row'>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main'>
                      <p className='discription-heading'>{t('Address')}</p>
                      <p className='discription-contain'>
                        {personDetails?.user_address}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6 '>
                      <p className='discription-heading'>{t('City')}</p>
                      <p className='discription-contain'>
                        {personDetails?.user_city}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>{t('Nationality')}</p>
                      <p className='discription-contain'>
                        {personDetails?.user_nationality}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>
                        {t('Experience')} (Years)
                      </p>
                      <p className='discription-contain'>
                        {personDetails?.driver_experience}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>
                        {t('Total Distance Travelled')}
                      </p>
                      <p className='discription-contain'>
                        {personDetails?.driver_total_distance_traveled} Kms
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>{t('Joining Date')}</p>
                      <p className='discription-contain'>
                        {personDetails?.user_joining_date?DateDDMMYYYY(personDetails?.user_joining_date):""}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>
                        {t('Date Of Birth')}
                      </p>
                      <p className='discription-contain'>
                        {personDetails?.user_dob?DateDDMMYYYY(personDetails.user_dob):""}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>{t('Gender')}</p>
                      <p className='discription-contain'>
                        {personDetails?.user_gender=="M"?"Male":personDetails?.user_gender=="F"?"Female":"other"}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6 mt-3'>
                      <p className='discription-heading'>{t('Status')}</p>
                      <p className='discription-contain'>
                        {personDetails?.user_status}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='information-card mt-4 pt-3'>
                  <div className='information-head'>
                    <div className='imformation-heading'>
                      <p>{t('License Information')}</p>
                    </div>
                  </div>
                  <div className='information-contain row'>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main'>
                      <p className='discription-heading'>
                        {t('License Information')}
                      </p>
                      <p className='discription-contain'>
                        {personDetails?.driver_licence_number}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>
                        {t('License Issue Date')}
                      </p>
                      <p className='discription-contain'>
                        {personDetails?.driver_licence_issue_date?DateDDMMYYYY(personDetails.driver_licence_issue_date):""}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>
                        {t('License Expiry Date')}
                      </p>
                      <p className='discription-contain'>
                        {personDetails.driver_licence_expire_date?DateDDMMYYYY(personDetails.driver_licence_expire_date):""}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>{t('License Type')}</p>
                      <p className='discription-contain'>
                        {personDetails?.driver_licence_type}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>{t('License Area')}</p>
                      <p className='discription-contain'>
                        {personDetails?.driver_licence_area}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='tabs-main-details inner-tabs-section row m-0'>
                <Tab.Container
                  id='left-tabs-example'
                  className='td-tab-wrapper'
                  defaultActiveKey='0'
                >
                  <Nav variant='pills' className='td-nav' id='InnerTabNew_Auto'>
                    <Nav.Item className='td-tab'>
                      <Nav.Link className='td-link' eventKey='0'>
                        {t('Recent Activity')}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='td-tab'>
                      <Nav.Link className='td-link' eventKey='1'>
                        {t('Scheduled Trips')}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='td-tab'>
                      <Nav.Link className='td-link' eventKey='2'>
                        {t('Completed Trips')}
                      </Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item className='td-tab'>
                      <Nav.Link className='td-link' eventKey='3'>
                        {t('Driver’s Score')}
                      </Nav.Link>
                    </Nav.Item> */}
                  </Nav>

                  <Col sm={12} className=''>
                    <Tab.Content>
                      <Tab.Pane eventKey='0'>
                        <div className='transport-main row m-0 p-0 mb-3'>
                          <div className='common-table details-tabel-main vd-table'>
                            <table>
                              <thead>
                                <tr>
                                  <th id='spacingBetween'>{t('Sr.No')}</th>
                                  <th>{t('Vehicle Type')}</th>
                                  <th>{t('Date')}</th>
                                  <th>{t('Time')}</th>
                                  <th>{t('From')}</th>
                                  <th>{t('To')}</th>
                                  <th>{t('Total Distance')}</th>
                                  <th>{t('Status')}</th>
                                </tr>
                              </thead>
                              {Drivers && Drivers.length > 0 ? (
                                Drivers?.map((personDetails, index) => {
                                  return (
                                    <tbody>
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                          {personDetails?.vehicle_type_code}
                                        </td>
                                        <td>
                                          { personDetails?.trip_date?DateDDMMYYYY(
                                            personDetails.trip_date
                                          ):""}
                                        </td>
                                        <td>{personDetails?.trip_start_time}</td>
                                        <td>
                                          {personDetails?.trip_start_point}
                                        </td>
                                        <td className='maxWidth'>
                                          {personDetails?.trip_end_point}
                                        </td>
                                        <td>120Kms</td>
                                        <td>{personDetails?.trip_status}</td>
                                      </tr>
                                    </tbody>
                                  )
                                })
                              ) : (
                                //  <NoDataComp/>
                                // <div>
                                //   <p
                                //     style={{
                                //       fontSize: '20px',
                                //       marginTop: '200px'
                                //     }}
                                //     className=' text-center justify-content-center align-items-center'
                                //   >
                                //     No data
                                //   </p>
                                // </div>
                                ""
                              )}
                            </table>
                          </div>
                   { Drivers?.length<=0&&      <p className='no-data'>
                            {t('No Recent Activity Found')}
                          </p>}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey='1'>
                        <div className='transport-main row m-0 p-0 mb-3'>
                          <div className='common-table details-tabel-main vd-table'>
                            <table>
                              <thead>
                                <tr>
                                  <th id='spacingBetween'>{t('Sr.No')}</th>
                                  <th>{t('Vehicle Type')}</th>
                                  <th>{t('Date')}</th>
                                  <th>{t('E.T.D')}</th>
                                  <th>{t('From')}</th>
                                  <th>{t('To')}</th>
                                  <th>{t('Total Distance')}</th>
                                  <th>{t('Trip Type')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {SchedulAll && SchedulAll.length > 0 ? (
                                  SchedulAll?.map((iteam, index) => {
                                    return (
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>{iteam.vehicle_type_code}</td>
                                        <td>{iteam.trip_date?DateDDMMYYYY(iteam.trip_date):""}</td>

                                        <td>{iteam.trip_start_time}</td>
                                        <td
                                          style={{
                                            width: '50px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                          }}
                                        >
                                          {iteam.trip_start_point}
                                        </td>
                                        <td className='maxWidth'>
                                          {iteam.trip_end_point}
                                        </td>
                                        <td>120Kms</td>
                                        <td>
                                          <div className='type-wrapper'>
                                            <OverlayTrigger
                                              key='bottom'
                                              placement='bottom'
                                              overlay={
                                                <Tooltip
                                                  wrapperStyle={{
                                                    backgroundColor: '#4A4A4A'
                                                  }}
                                                  id='tooltip-bottom'
                                                  className='t1'
                                                >
                                                  Sunday
                                                </Tooltip>
                                              }
                                            >
                                              <img src={t1} alt='' id='t1' />
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                              key='bottom'
                                              placement='bottom'
                                              overlay={
                                                <Tooltip id='tooltip-bottom'>
                                                  Not Available
                                                </Tooltip>
                                              }
                                            >
                                              <img src={t2} alt='' id='t2' />
                                            </OverlayTrigger>

                                            {/* <img src={t3} alt="" id="t3" />
                              <img src={t4} alt="" id="t4" /> */}

                                            <img src={t5} alt='' id='t5' />
                                            <OverlayTrigger
                                              key='bottom'
                                              placement='bottom'
                                              overlay={
                                                <Tooltip id='tooltip-bottom'>
                                                  {iteam.trip_running_days}
                                                </Tooltip>
                                              }
                                            >
                                              <img src={t6} alt='' id='t6' />
                                            </OverlayTrigger>

                                            <img src={t7} alt='' id='t7' />
                                          </div>
                                        </td>
                                      </tr>
                                    )
                                  })
                                ) : (
                                  // <NoDataComp/>
                                  // <div>
                                  //   <p
                                  //     style={{
                                  //       fontSize: '20px',
                                  //       marginTop: '200px'
                                  //     }}
                                  //     className=' text-center justify-content-center align-items-center'
                                  //   >
                                  //     No data
                                  //   </p>
                                  // </div>
                                  <></>
                                )}
                              </tbody>
                            </table>
                          </div>
                      {SchedulAll?.length<=0&&    <p className='no-data'>
                            {t('No Trips Scheduled now')}
                          </p>}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey='2'>
                        <div className='transport-main row m-0 p-0 mb-3'>
                          <div className='common-table details-tabel-main vd-table'>
                            <table>
                              <thead>
                                <tr>
                                  <th id='spacingBetween'>{t('Sr.No')}</th>
                                  <th>{t('Vehicle Type')}</th>
                                  <th>{t('Date')}</th>
                                  <th>{t('E.T.D')}</th>
                                  <th>{t('From')}</th>
                                  <th>{t('To')}</th>
                                  <th>{t('Total Distance')}</th>
                                  <th>{t('Trip Type')}</th>
                                </tr>
                              </thead>
                              {ComplatedAll && ComplatedAll.length > 0 ? (
                                ComplatedAll.map((completeditem, index) => {
                                  return (
                                    <tbody>
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                          {completeditem.vehicle_type_code}
                                        </td>
                                        <td>
                                          {   completeditem.trip_date?DateDDMMYYYY(
                                            completeditem.trip_date
                                          ):""}
                                        </td>
                                        <td>{completeditem?.trip_start_time}</td>
                                        <td>
                                          {completeditem?.trip_start_point}
                                        </td>
                                        <td className='maxWidth'>
                                          {completeditem?.trip_end_point}
                                        </td>
                                        {/* <td>120Kms</td> */}
                                        <td>{completeditem?.trip_status}</td>
                                      </tr>
                                    </tbody>
                                  )
                                })
                              ) : (
                                // <div>
                                //   <p
                                //     style={{
                                //       fontSize: '20px',
                                //       marginTop: '200px'
                                //     }}
                                //     className=' text-center justify-content-center align-items-center'
                                //   >
                                //     No data
                                //   </p>
                                // </div>

                                // <NoDataComp/>
                                <></>
                              )}
                            </table>
                          </div>
                      { ComplatedAll?.length<=0&&   <p className='no-data'>{t('No Trip Found')}</p>}
                        </div>
                      </Tab.Pane>
                      {/* <Tab.Pane eventKey='3'>
                        <div className='DriverScore'>
                          <div className='header'>
                            <p className='title'>Particulars</p>
                            <Carousel interval={300000}>
                              <Carousel.Item>
                                <div className='carosleInnerTab'>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                </div>
                              </Carousel.Item>
                              <Carousel.Item>
                                <div className='carosleInnerTab'>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                </div>
                              </Carousel.Item>
                              <Carousel.Item>
                                <div className='carosleInnerTab'>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                  <p className='date'>01-06-2023</p>
                                </div>
                              </Carousel.Item>
                            </Carousel>
                          </div>
                          <div className='ScroreTabel'>
                            <table>
                              <tr>
                                <td>Vehicle Number</td>
                                <td>Mh-12-2023</td>
                                <td>Mh-12-2023</td>
                                <td>Mh-12-2023</td>
                                <td>Mh-12-2023</td>
                                <td>Mh-12-2023</td>
                                <td>Mh-12-2023</td>
                                <td>Mh-12-2023</td>
                                <td>Mh-12-2023</td>
                              </tr>
                              <tr>
                                <td>Site Name</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                              </tr>
                              <tr>
                                <td>Distance (Km)</td>
                                <td>10.58</td>
                                <td>10.58</td>
                                <td>10.58</td>
                                <td>10.58</td>
                                <td>10.58</td>
                                <td>10.58</td>
                                <td>10.58</td>
                                <td>10.58</td>
                              </tr>
                              <tr>
                                <td>Harsh Acceleration Occurrence</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </tr>
                              <tr>
                                <td>Acceleration per 100km</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                              </tr>
                              <tr>
                                <td>Harsh Brake Occurrences</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </tr>
                              <tr>
                                <td>Seat-Belt Violation Time</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </tr>
                              <tr>
                                <td>
                                  Seatbelt Violation Time: Seconds Per 10km
                                </td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </tr>
                              <tr>
                                <td>Max Speed Recorded (Km/h)</td>
                                <td>30</td>
                                <td>30</td>
                                <td>30</td>
                                <td>30</td>
                                <td>30</td>
                                <td>30</td>
                                <td>30</td>
                                <td>30</td>
                              </tr>
                              <tr>
                                <td>Max Over Speed Event Value (Km/h)</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </tr>
                              <tr>
                                <td>Over speeding Time</td>
                                <td>00.00.00s</td>
                                <td>00.00.00s</td>
                                <td>00.00.00s</td>
                                <td>00.00.00s</td>
                                <td>00.00.00s</td>
                                <td>00.00.00s</td>
                                <td>00.00.00s</td>
                                <td>00.00.00s</td>
                              </tr>
                              <tr>
                                <td>Over speeding Time: Seconds Per 10km</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </tr>
                              <tr className='TotalScore'>
                                <td>Total Score</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                              </tr>
                              <tr>
                                <td>Total Score Previous Week</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </Tab.Pane> */}
                    </Tab.Content>
                  </Col>
                </Tab.Container>
              </div>
              {/* block Modal Start */}
              <Modal
                show={show}
                onHide={handleClose}
                centered
                className='common-model'
              >
                <Modal.Header closeButton>
                  <Modal.Title>block Driver</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to{' '}
                  {DriverBlock === 'active' ? 'block' : 'Unblock'} this
                  Driver ?
                </Modal.Body>
                <Modal.Footer className='pop-up-modal-footer'>
                  <div class='btn-wrapper'>
                    <button className='cx-btn-1' onClick={handleClose}>
                      {t('Cancel')}
                    </button>
                    <button className='cx-btn-2' onClick={handalBlock}>
                      Yes
                    </button>
                  </div>
                </Modal.Footer>
              </Modal>
              {/* block Modal End */}

              {/* Resign Modal Start */}
              <Modal
                show={showresign}
                onHide={handleCloseresign}
                centered
                className='common-model'
              >
                <Modal.Header closeButton>
                  <Modal.Title>Resign Driver</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to{' '}
                  {DriverID === 'active' ? 'Resign' : 'UnResign'} this Driver ?
                </Modal.Body>
                <Modal.Footer className='pop-up-modal-footer'>
                  <div class='btn-wrapper'>
                    <button className='cx-btn-1' onClick={handleCloseresign}>
                      {t('Cancel')}
                    </button>
                    <button className='cx-btn-2' onClick={handalResign}>
                      Yes
                    </button>
                  </div>
                </Modal.Footer>
              </Modal>
              {/* Resign Modal End */}
            </div>
          </motion.div>
        </>
      )}
    </>
  )
}

export default ViewDrivers

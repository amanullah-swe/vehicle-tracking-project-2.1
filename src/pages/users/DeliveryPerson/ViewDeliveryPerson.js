import { React, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import profile from '../../../assets/images/Customer-profile.png'
import GreenIcon from '../../../assets/images/Green-check.svg'
import { Dropdown, Modal } from 'react-bootstrap'
import option from '../../../assets/images/option-three-dot.svg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { simplePostCall } from '../../../api/ApiServices'
import ApiConfig from '../../../api/ApiConfig'
import { notifyError, notifySuccess } from '../../../sharedComponent/notify'
import { DateDDMMYYYY } from '../../../sharedComponent/common'
import Loader from '../../../sharedComponent/Loader'
import CrossBtn from "../../../assets/images/Creoss_Red.svg"
import { useTranslation } from 'react-i18next'
import ImportUser from '../../../assets/images/imagesuser.png'
import { useSelector } from 'react-redux'
const ViewDeliveryPerson = () => {
  const accessRights = useSelector(state => state.auth.accessRights)
  const userRole = accessRights && accessRights.rights_role
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext)

  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const { t, i18n } = useTranslation()
  const [showblock, setShowblock] = useState(false)
  const [showresign, setShowresign] = useState(false)
  const handleCloseBlock = () => setShowblock(false)
  const handleShowblock = () => setShowblock(true)
  const handleCloseresign = () => setShowresign(false)
  const handleShowresign = () => setShowresign(true)
  const [deliver, setDeliverId] = useState('')
  const [driverBlock, setdriverBlock] = useState('')
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
  }
  const [itemlist, setitemlist] = useState([])
  const params = useParams()
  let UserId = params.id
  const navigate = useNavigate()

  useEffect(() => {
    if (UserId) {
      geDeliveryDetails()
    }
  }, [])
  const geDeliveryDetails = () => {
    setLoading(true)

    let newRequestBody = JSON.stringify({
      user_id: UserId.toString()
    })
    simplePostCall(ApiConfig.DELIVERY_PERSON_VIEW, newRequestBody)
      .then(res => {
        setitemlist(res.data)  
      })
      .catch(err => {
        console.log('err', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handalResign () {
    if (deliver === 'active') {
      userResign()
    } else {
      userUnResign()
    }
  }

  function handalBlock () {
    if (driverBlock === 'active') {
      userBlock()
    } else {
      userUnBlock()
    }
  }

  function userBlock () {
    let newRequestBody = JSON.stringify({
      userId: UserId
    })
    simplePostCall(ApiConfig.DRIVERS_BLOCK, newRequestBody)
      .then(data => {
        if (data.success) {
          notifySuccess(data.message)
          navigate('/DeliveryPerson')
        } else {
          notifyError(data.message)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }

  function userUnBlock () {
    let newRequestBody = JSON.stringify({
      userId: UserId
    })
    simplePostCall(ApiConfig.DRIVERS_UN_BLOCK, newRequestBody)
      .then(data => {
        if (data.success) {
          notifySuccess(data.message)
          navigate('/DeliveryPerson')
        } else {
          notifyError(data.message)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }

  function userResign () {
    let newRequestBody = JSON.stringify({
      userId: UserId
    })
    simplePostCall(ApiConfig.DRIVERS_RESIGEN, newRequestBody)
      .then(data => {
        if (data.success) {
          notifySuccess(data.message)
          navigate('/DeliveryPerson')
        } else {
          notifyError(data.message)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }

  function userUnResign () {
    let newRequestBody = JSON.stringify({
      userId: UserId
    })
    simplePostCall(ApiConfig.DRIVERS_UN_RESIGEN, newRequestBody)
      .then(data => {
        if (data.success) {
          notifySuccess(data.message)
          navigate('/DeliveryPerson')
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
            {itemlist && itemlist.length > 0 ? (
              itemlist.map((itemlist, index) => {
                return (
                  <div id='cx-wrapper'>
                    <div
                      className='main-dashboard-wrapper CustomerProfile'
                      id='viewAdministratorProfile'
                    >
                      <div className='CustomerProfile-head'>
                        <div className='porile-img'>
                          <img
                            src={
                              
                              itemlist.user_profile_pic
                            }
                            onError={(ev) => {
                              handleErrorImage(ev);
                            }}
                            alt='porfile'
                          />
                        </div>
                        {userRole === 'customer' ||
                        (accessRights && accessRights.rights_manage_helper) ? (
                          <div className='customer-option'>
                            <Dropdown>
                              <Dropdown.Toggle id='dropdown-basic'>
                                <img src={option} alt='' />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link
                                    to={'/AddDeliveryPerson/' + UserId}
                                    className='d-block'
                                  >
                                    {t('Edit')}
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link
                                    to={'/ChangePassword/' + UserId}
                                    className='d-block'
                                  >
                                    {t('Change Password')}
                                  </Link>
                                </Dropdown.Item>
                                {itemlist.user_status === 'active' ? (
                                  <>
                                    <Dropdown.Item
                                      href='#'
                                      onClick={() => {
                                        handleShowblock()
                                        setdriverBlock(itemlist.user_status)
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
                                        setDeliverId(itemlist.user_status)
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
                                    {itemlist.user_status === 'inactive' ? (
                                      <Dropdown.Item
                                        href='#'
                                        onClick={() => {
                                          handleShowblock()

                                          setdriverBlock(itemlist.user_status)
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
                                    {itemlist.user_status === 'inactive' ? (
                                      <></>
                                    ) : (
                                      <Dropdown.Item
                                        href='#'
                                        onClick={() => {
                                          handleShowresign()
                                          setDeliverId(itemlist.user_status)
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
                            <p className='discription-heading'>{t('Name')}</p>
                            <p className='discription-contain'>
                              {itemlist?.user_name}
                            </p>
                          </div>
                          <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                            <p className='discription-heading'>
                              {t('Mobile Number')}
                            </p>
                            <p className='discription-contain'>
                              {itemlist?.user_mobile}
                            </p>
                          </div>
                          <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                            <p className='discription-heading'>{t('Email')}</p>
                            <p className='discription-contain'>
                              {itemlist?.user_email}{' '}
                              <img src={itemlist?.user_email_verification=="yes"?GreenIcon:CrossBtn} alt="" />{" "}
                            </p>
                          </div>
                          <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                            <p className='discription-heading'>
                              {t('Employee Code')}
                            </p>
                            <p className='discription-contain'>
                              {itemlist?.user_internal_no}
                            </p>
                          </div>
                          <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                            <p className='discription-heading'>
                              {t('Vehicle Assignements')}
                            </p>
                            <p className='discription-contain'>
                              {itemlist?.vehicle_number?itemlist?.vehicle_number +
                                '-' +
                                itemlist.vehicle_reg_no:""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='information-card'>
                        <div className='information-head'>
                          <div className='imformation-heading'>
                            <p>{t('General Information')}</p>
                          </div>
                        </div>
                        <div className='information-contain row'>
                          <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main'>
                            <p className='discription-heading'>
                              {t('Address')}
                            </p>
                            <p className='discription-contain'>
                              {itemlist?.user_address}
                            </p>
                          </div>
                          <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                            <p className='discription-heading'>{t('City')}</p>
                            <p className='discription-contain'>
                              {itemlist?.user_city}
                            </p>
                          </div>
                          <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                            <p className='discription-heading'>
                              {t('Nationality')}
                            </p>
                            <p className='discription-contain'>
                              {itemlist.user_nationality}
                            </p>
                          </div>
                          <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                            <p className='discription-heading'>
                              {t('Date Of Birth')}
                            </p>
                            <p className='discription-contain'>
                              {itemlist.user_dob?DateDDMMYYYY(itemlist.user_dob):""}
                            </p>
                          </div>
                          <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                            <p className='discription-heading'>
                              {t('Joining Date')}
                            </p>
                            <p className='discription-contain'>
                              {itemlist.user_joining_date?DateDDMMYYYY(itemlist.user_joining_date):""}
                            </p>
                          </div>
                          <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                            <p className='discription-heading'>{t('Gender')}</p>
                            <p className='discription-contain'>
                              {itemlist.user_gender=="M"?"Male":itemlist.user_gender=="F"?"Female":"Other"}
                            </p>
                          </div>

                          <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                            <p className='discription-heading'>{t('Status')}</p>
                            <p className='discription-contain'>
                              {itemlist?.user_status}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <div className='information-contain row'>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main'>
                      <p className='discription-heading'>
                        {t('Licence Information')}
                      </p>
                      <p className='discription-contain'>
                        {itemlist?.driver_licence_number}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>
                        {t('Licence Issue Date')}
                      </p>
                      <p className='discription-contain'>
                        {itemlist?.driver_licence_issue_date?DateDDMMYYYY(itemlist.driver_licence_issue_date):""}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>
                        {t('Licence Expiry Date')}
                      </p>
                      <p className='discription-contain'>
                        {itemlist.driver_licence_expire_date?DateDDMMYYYY(itemlist.driver_licence_expire_date):""}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>{t('Licence Type')}</p>
                      <p className='discription-contain'>
                        {itemlist?.driver_licence_type}
                      </p>
                    </div>
                    <div className='information-discriptiopn col-lg-3 col-md-4 col-sm-6'>
                      <p className='discription-heading'>{t('Licence Area')}</p>
                      <p className='discription-contain'>
                        {itemlist?.driver_licence_area}
                      </p>
                    </div>
                  </div> */}
                    </div>
                    {/* block Modal Start */}
                    <Modal
                      show={showblock}
                      onHide={handleCloseBlock}
                      centered
                      className='common-model'
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>block Delivery Person</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Are you sure you want to{' '}
                        {driverBlock === 'active' ? 'block' : 'Unblock'} this
                        Delivery Person ?
                      </Modal.Body>
                      <Modal.Footer className='pop-up-modal-footer'>
                        <div class='btn-wrapper'>
                          <button
                            className='cx-btn-1'
                            onClick={handleCloseBlock}
                          >
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
                        <Modal.Title>Resign Delivery Person</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Are you sure you want to{' '}
                        {deliver === 'active' ? 'Resign' : 'UnResign'} this
                        Delivery Person ?
                      </Modal.Body>
                      <Modal.Footer className='pop-up-modal-footer'>
                        <div class='btn-wrapper'>
                          <button
                            className='cx-btn-1'
                            onClick={handleCloseresign}
                          >
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
                )
              })
            ) : (
              <div>
                <p
                  style={{
                    fontSize: '20px',
                    marginTop: '200px'
                  }}
                  className=' text-center justify-content-center align-items-center'
                >
                  No data
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </>
  )
}

export default ViewDeliveryPerson

import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import edit_icon from '../../assets/images/ic-edit.svg'
import stops_icon from '../../assets/images/stops_icon.svg'
import delete_icon from '../../assets/images/delete.svg'
import close_icon from '../../assets/images/close_icon.svg'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import { motion } from 'framer-motion'
import MapComponent from '../../sharedComponent/MapComponent'
import { useEffect } from 'react'
import { simplePostCall } from '../../api/ApiServices'
import ApiConfig from '../../api/ApiConfig'
import Loader from '../../sharedComponent/Loader'
import { Modal } from 'react-bootstrap'
import { notifySuccess } from '../../sharedComponent/notify'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const ViewStop = () => {
  const accessRights = useSelector(state => state.auth.accessRights)
  const userRole = accessRights && accessRights.rights_role
  const { sidebar, loading, setLoading, setRegionCord } = useContext(AppContext)
  const { id } = useParams()
  const { t, i18n } = useTranslation()

  const handleShow = () => setShow(true)
  const [show2, setShow2] = useState(false)
  const [stopDetails, setStopDetails] = useState({})
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState(false)
  const handleClick = () => {
    setIsActive(!isActive)
  }
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)

  const handleClick2 = () => {
    setIsActive(!isActive)
  }

  useEffect(() => {
    if (id) {
      getStopDetails()
    }
  }, [id])
  const deleteStop = () => {
    simplePostCall(
      ApiConfig.DELETE_STOP_BY_ID,
      JSON.stringify({
        pickup_point_id: id
      })
    )
      .then(res => {
        console.log('res', res)
        if (res.result) {
          notifySuccess(res.message)
          navigate('/TripManagement')
        }
      })
      .catch(err => {
        console.log('err', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const getStopDetails = () => {
    setLoading(true)
    let body = JSON.stringify({ pickup_point_id: id })
   simplePostCall(ApiConfig.GET_STOP_DETAILS, body)
      .then(res => {
  
        if (res.result) {
          setStopDetails(res.data)
          setRegionCord([
            Number(res.data.pickup_point_latitude),
            Number(res.data.pickup_point_longitude)
          ])
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
  }
  return (
    <motion.div
      className={sidebar ? 'taskMain ' : 'cx-active taskMain'}
      id='cx-main'
      variants={aninations}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 0.1 }}
    >
      <div id='cx-wrapper'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className='main-master-wrapper CustomerProfile'>
              <div className='Heading'>
                <p>{t('Stop Details')}</p>
                {userRole === 'customer' ||
                (accessRights && accessRights?.rights_manage_trips) ? (
                  <div className='action-btn-wrapper'>
                    <Link to={'/EditStop/' + stopDetails.pickup_point_id}>
                      <img src={edit_icon} alt='' />
                    </Link>
                    <Link to='#' onClick={handleShow}>
                      <img src={delete_icon} alt='' />
                    </Link>
                  </div>
                ) : null}
              </div>
              <div className='stop-details-wrapper'>
                <div className='row'>
                  <div className='col-md-4 form_input_main'>
                    <label htmlFor=''>{t('Stop Name')}</label>
                    <p>{stopDetails.pickup_point_name}</p>
                  </div>
                  <div className='col-md-4 form_input_main'>
                    <label htmlFor=''>{t('Stop Code')}</label>
                    <p>{stopDetails.pickup_point_code}</p>
                  </div>
                  <div className='col-md-4 form_input_main'>
                    <label htmlFor=''>{t("Distance from Customer (KM)")} </label>
                    <p>{stopDetails.pickup_point_distance_from_source}Kms</p>
                  </div>
                  <div className='col-md-4 form_input_main'>
                    <label htmlFor=''>{t('Stop Priority')}</label>
                    <p>2</p>
                  </div>
                  <div className='col-md-4 form_input_main'>
                    <label htmlFor=''>{t('Stop Latitude')}</label>
                    <p>{stopDetails.pickup_point_latitude}</p>
                  </div>
                  <div className='col-md-4 form_input_main'>
                    <label htmlFor=''>{t('Stop Longitude')}</label>
                    <p>{stopDetails.pickup_point_longitude}</p>
                  </div>
                  <div className='col-md-12'>
                    <div className='transportMap stopmap'>
                      <div className='custom-map-height2'>
                        <MapComponent
                          stopDetails={stopDetails}
                          componentId={'viewStop'}
                        />
                        {/* position={{ pickup_point_latitude: stopDetails.pickup_point_latitude, pickup_point_longitude: stopDetails.pickup_point_longitude }} */}
                      </div>
                      {/* <div className="stop-tooltip-wrapper">
                        <OverlayTrigger
                          trigger="click"
                          key="bottom"
                          placement="bottom"
                          overlay={
                            <Popover
                              id="popover-positioned-bottom"
                              className="popover-main-wrapper"
                              style={{ width: "600px !important" }}
                            >
                              <Popover.Body className="pm-body">
                                <div className="popover-wrapper">
                                  <div className="stop-overlay-top">
                                    <p>Add Stop</p>
                                    <button
                                      onClick={() => {
                                        handleClick2();
                                      }}
                                    >
                                      <img src={close_icon} alt="" />
                                    </button>
                                  </div>
                                  <div className="pw-bottom">
                                    <table className="pwb-table">
                                      <tbody>
                                        <tr>
                                          <td>{t("Stop Name")}</td>
                                          <td>:</td>
                                          <td>Kolhapur, Maharashtra</td>
                                        </tr>
                                        <tr>
                                          <td>{t("Stop Code")}</td>
                                          <td>:</td>
                                          <td>Kolhapur, Maharashtra</td>
                                        </tr>
                                        <tr>
                                          <td>{t("Add to POI")}</td>
                                          <td>:</td>
                                          <td>Yes</td>
                                        </tr>
                                        <tr>
                                          <td colSpan={3}></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="so-btn-wrapper">
                                    <button className="cx-btn-2">
                                      {t("Add/Update Stop")}
                                    </button>
                                    <button
                                      className="cx-btn-1"
                                      onClick={handleShow}
                                    >
                                      {t("Remove Stop")}
                                    </button>
                                  </div>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <Button className="red-car-btn">
                            <img
                              src={stops_icon}
                              alt=""
                              className=""
                              onClick={() => {
                                handleClick();
                              }}
                            />
                          </Button>
                        </OverlayTrigger>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Modal show={show} onHide={handleClose} centered className='common-model'>
        <Modal.Header closeButton>
          <Modal.Title>{t('Delete Trip')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('Are you sure you want to delete this Trip')} ?
        </Modal.Body>
        <Modal.Footer className='pop-up-modal-footer'>
          <button className='cx-btn-1' onClick={() => setShow2(false)}>
            {t('Close')}
          </button>
          <button
            className='cx-btn-2'
            onClick={() => {
              deleteStop()
              setShow2(false)
            }}
          >
            {t('Yes')}
          </button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  )
}

export default ViewStop

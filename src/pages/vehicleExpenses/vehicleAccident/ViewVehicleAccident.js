import { React, useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { Dropdown, Modal } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import option from '../../../assets/images/option-three-dot.svg'
import Export from '../../../assets/images/export_icon.svg'
import View from '../../../assets/images/Group.svg'
import Delete from '../../../assets/images/delete.svg'
import BigSave from '../../../assets/images/bigSave.svg'
import BigInvoice from '../../../assets/images/bigOnvoice.svg'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { simpleDeleteCall, simplePostCall } from '../../../api/ApiServices'
import ApiConfig from '../../../api/ApiConfig'
import { DateDDMMYYYY } from '../../../sharedComponent/common'
import Loader from '../../../sharedComponent/Loader'
import image_placeholder from "../../../assets/images/image_placeholder.jpg";
import { useTranslation } from 'react-i18next'
import { notifyError, notifySuccess } from '../../../sharedComponent/notify'
import { useSelector } from 'react-redux'
import PdfPreview from './PdfViewer'
import pdfIcon from '../../../assets/images/InspetionPDF/pdf-Icon-regular.svg'

const ViewVehicleAccident = () => {
  const accessRights = useSelector(state => state.auth.accessRights)
  const userRole = accessRights && accessRights.rights_role

  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext)
  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const { t, i18n } = useTranslation()

  const handleClose = () => setShowModal(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath);
    setShowModal(true);

  }
  const handleCloseImage = () => {
    setShowModal(false);
    setSelectedImage(null);
  }
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
  }
  const navigate = useNavigate()

  const params = useParams()
  let UserId = params.id
  const [VehicalDetails, setVehicalDetails] = useState([])


  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (UserId) {
      geTransportmanagerDetails()
    }
  }, [])
  const geTransportmanagerDetails = () => {
    setLoading(true)
    let newRequestBody = JSON.stringify({
      incident_id: UserId.toString()
    })
    simplePostCall(ApiConfig.VEHICLE_PROFLIE, newRequestBody)
      .then(res => {
        setVehicalDetails(res.data)
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
      incident_id: UserId
    })
    simpleDeleteCall(ApiConfig.VEHICLE_ASSISTANTS, newRequestBody)
      .then(data => {
        if (data.result) {
          notifySuccess(data.message)
          setDeleteModal(false)
          navigate('/VehicleAccident')
        } else {
          notifyError(data.message)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }
  const handleErrorImage = (ev) => {
    ev.target.src = image_placeholder;
  };
  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url)
  };
  const isPDF = (url) => /\.pdf$/i.test(url);
  const renderPDF = (url) => {
    console.log('ihave run -->', url)
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  };



  const handlePdfDownload = (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(false);
    // console.log(invoice.expense_file_path)
    const pdfPath = url; // Replace with your PDF file path

    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'filename.pdf'; // Optional: specify the filename for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
        {loading ? (
          <Loader />
        ) : (
          <>
            <div id='cx-wrapper' className='ViewVehicle_Accident'>
              <div className='main-master-wrapper'>
                <div className='headingDetails'>
                  <div className='headingTxt'>
                    <p className='heading'>{t('Vehicle Incident Details')}</p>
                  </div>
                  {userRole === 'customer' ||
                    (accessRights && accessRights?.rights_manage_accident) ? (
                    <div className='customer-option'>
                      <Dropdown>
                        <Dropdown.Toggle id='dropdown-basic'>
                          <img src={option} alt='' />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item>
                            {' '}
                            <Link
                              to={'/AddVehicleAccident/' + UserId}
                              className='d-block'
                            >
                              {t('Edit')}
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            {' '}
                            <Link
                              onClick={() => setDeleteModal(true)}
                              className='d-block'
                              to='#'
                            >
                              {t('Delete')}
                            </Link>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  ) : null}
                </div>
                <div className='DetailsSec'>
                  <div className='row detailsRow'>
                    <div className='col-md-3 ViewCol3 form_input_main'>
                      <label className='head'>Vehicle Name</label>
                      <p className='Value'>{VehicalDetails.vehicle_number}</p>
                    </div>
                    <div className='col-md-3 ViewCol3 form_input_main'>
                      <label className='head'>Location</label>
                      <p className='Value'>
                        {VehicalDetails.incident_location}
                      </p>
                    </div>
                    <div className='col-md-3 ViewCol3 form_input_main'>
                      <label className='head'>Expenses</label>
                      <p className='Value'>{VehicalDetails.incident_expense}</p>
                    </div>
                    <div className='col-md-3 ViewCol3 form_input_main'>
                      <label className='head'>Driver</label>
                      <p className='Value'>{VehicalDetails.driver_name}</p>
                    </div>
                    <div className='col-md-3 ViewCol3 form_input_main'>
                      <label className='head'>Description</label>
                      <p className='Value'>
                        {VehicalDetails.incident_description}
                      </p>
                    </div>
                    <div className='col-md-3 ViewCol3 form_input_main'>
                      <label className='head'>Date</label>
                      <p className='Value'>
                        {DateDDMMYYYY(VehicalDetails.incident_date)}
                      </p>
                    </div>
                    <div className='col-md-6'></div>
                    <div className='col-md-12 invoiceCOl'>
                      <label className='head'>{t('Invoice')}</label>
                      <div className='invoiceBox d-flex justify-content-start align-items-center flex-wrap'>
                        {/* <div className='headingInvoi'>
                          <p>Document No. 1</p> */}
                        {/* <div className="viewLinks">
                        <Link to="#">
                          <img src={Export} className="me-2" alt="" />
                        </Link>
                        <Link to="#">
                          <img src={View} className="me-2" alt="" />
                        </Link>
                        <Link to="#" onClick={() => setDeleteModal(true)}>
                          <img src={Delete} alt="" />
                        </Link>
                      </div> */}
                        {/* </div> */}

                        {VehicalDetails?.invoices?.map((invoice, index) => (
                          <>

                            <div className='saveFile mx-2 my-2'>
                              <Link to="#" onClick={() => handleImageClick(invoice?.expense_file_path)} key={index}>
                                {console.log('invoice.type-->', invoice.type)}
                                {isImage(invoice.incidentOG) ? (
                                  <>
                                    <img
                                      src={invoice.expense_file_path ? invoice.expense_file_path : image_placeholder}
                                      alt=""
                                      width="170"
                                      height="120"
                                      onError={(ev) => {
                                        handleErrorImage(
                                          ev
                                        );
                                      }}
                                    />
                                    {/* invoice view Modal Start */}
                                    <Modal
                                      show={showModal}
                                      onHide={handleCloseImage}
                                      centered
                                      size='l'
                                      className='invoice-model'
                                    >
                                      <Modal.Body>
                                        {selectedImage && <img
                                          src={selectedImage}
                                          className='invoiceBigImg'
                                          alt=''
                                        />}

                                      </Modal.Body>
                                    </Modal>
                                    {/* invoice view  Modal End */}
                                  </>) : (<>
                                    {/* <iframe key={`pdf-${index}`}
                                      title={`PDF Preview ${index}`}
                                      //  src={invoice.expense_file_path}
                                      src={renderPDF(invoice.expense_file_path)}
                                      width='200'
                                      height='150'

                                    /> */}
                                    <img
                                      src={pdfIcon}
                                      width={170}
                                      height={100}
                                      alt=""
                                      onClick={(e) => handlePdfDownload(e, invoice.expense_file_path)}
                                    />
                                  </>

                                )}
                              </Link>
                            </div>
                          </>))}
                        {/* <Link to='#' onClick={() => setShowModal(true)}>
                            <img
                              src={VehicalDetails?.invoices[0]?.expense_file_path}
                              alt=''
                              width='170'
                              height='120'
                            />
                          </Link> */}

                        {/* {console.log('expense_file_path-->', VehicalDetails?.invoices[0]?.expense_file_path)} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>

      {/* invoice view Modal Start */}
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        size='l'
        className='invoice-model'
      >
        {/*  <Modal.Body>
          <img
            src={VehicalDetails?.incident_invoice_no}
            className='invoiceBigImg'
            alt=''
          />
        </Modal.Body> */}
      </Modal>
      {/* invoice view  Modal End */}

      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        centered
        className='common-model'
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('Delete Vehicle Accident')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('Are you sure you want to Delete this Vehicle Accident')} ?
        </Modal.Body>
        <Modal.Footer className='pop-up-modal-footer'>
          <div class='btn-wrapper'>
            <button className='cx-btn-1' onClick={() => setDeleteModal(false)}>
              {t('Cancel')}
            </button>
            <button className='cx-btn-2' onClick={() => userDelete()}>
              {t('Yes')}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewVehicleAccident

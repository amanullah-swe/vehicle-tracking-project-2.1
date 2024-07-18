import { React, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { Dropdown, Modal } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import option from '../../../assets/images/option-three-dot.svg'
import Export from '../../../assets/images/export_icon.svg'
import View from '../../../assets/images/Group.svg'
import Delete from '../../../assets/images/delete.svg'
import BigSave from '../../../assets/images/bigSave.svg'
import BigInvoice from '../../../assets/images/bigOnvoice.svg'
import image_placeholder from "../../../assets/images/image_placeholder.jpg";
import { motion } from 'framer-motion'
import ApiConfig from '../../../api/ApiConfig'
import { simpleGetCall, simpleDeleteCall } from '../../../api/ApiServices'

import { DateDDMMYYYY } from '../../../sharedComponent/common'
import Loader from '../../../sharedComponent/Loader'
import { notifyError, notifySuccess } from '../../../sharedComponent/notify'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import pdfIcon from '../../../assets/images/InspetionPDF/pdf-Icon-regular.svg'

const ViewVehicleFine = () => {
  const accessRights = useSelector(state => state.auth.accessRights)
  const userRole = accessRights && accessRights.rights_role
  const { sidebar, setSidebar, Dark, loading, setLoading } =
    useContext(AppContext)
  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const { t, i18n } = useTranslation();

  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath);
    setShowModal(true);
  }
  const handleCloseImage = () => {
    setShowModal(false);
    setSelectedImage(null);
  }
  const handleClose = () => setShowModal(false)
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
  }

  const params = useParams()
  let UserId = params.id
  const navigate = useNavigate()

  const [AccesoryDetails, setAccesoryDetails] = useState([])

  useEffect(() => {
    if (UserId) {
      geTransportmanagerDetails()
    }
  }, [])
  const geTransportmanagerDetails = () => {
    setLoading(true)
    simpleGetCall(ApiConfig.VEHICLE_FINE_PROFILE + UserId)
      .then(res => {
        setAccesoryDetails(res.data)
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
      fine_id: UserId
    })
    simpleDeleteCall(ApiConfig.VEHICLE_FINE_DELTE, newRequestBody)
      .then(data => {
        if (data.result) {
          notifySuccess(data.message)
          setDeleteModal(false)
          navigate('/VehicleFine')
        } else {
          notifyError(data.message)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }
  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url)
  };
  const isPDF = (url) => /\.pdf$/i.test(url);
  const renderPDF = (url) => {
    // console.log('ihave run -->', url)
    //  console.log('tttt',  `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`)
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
  };


  const renderPDF2 = (url) => {
    return url;
  };
  const handleErrorImage = (ev) => {
    ev.target.src = image_placeholder;
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
            <div id='cx-wrapper' className='ViewVehicle_Fine'>
              <div className='main-master-wrapper'>
                <div className='headingDetails'>
                  <div className='headingTxt'>
                    <p className='heading'>{t('Vehicle Fine Details')}</p>
                  </div>
                  {userRole === 'customer' ||
                    (accessRights && accessRights?.rights_manage_fine) ? (
                    <div className='customer-option'>
                      <Dropdown>
                        <Dropdown.Toggle id='dropdown-basic'>
                          <img src={option} alt='' />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item>
                            {' '}
                            <Link
                              to={'/AddVehicleFine/' + UserId}
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
                      <p className='Value'>{AccesoryDetails.vehicle_number}</p>
                    </div>
                    <div className='col-md-3 ViewCol3 form_input_main'>
                      <label className='head'>Reason</label>
                      <p className='Value'>{AccesoryDetails.fine_reason}</p>
                    </div>

                    <div className='col-md-3 ViewCol3 form_input_main'>
                      <label className='head'>Price</label>
                      <p className='Value'>{AccesoryDetails.fine_amount}</p>
                    </div>
                    <div className='col-md-3 ViewCol3 form_input_main'>
                      <label className='head'> Date</label>
                      <p className='Value'>
                        {DateDDMMYYYY(AccesoryDetails.fine_date)}
                      </p>
                    </div>
                    <div className='col-md-3 invoiceCOl'>
                      <label className='head'>{t('Invoice')}</label>
                      {/* <div className='invoiceBox'>
                        <div className='headingInvoi'>
                          <p>Document No. 1</p>
                          <div>
                        <Link to="#">
                          <img src={Export} className="me-2" alt="" />
                        </Link>
                        <Link to="#">
                          <img src={View} className="me-2" alt="" />
                        </Link>
                        <Link to="#" onClick={() => setDeleteModal(true)}>
                          <img src={Delete} alt="" />
                        </Link>
                      </div>
                        </div>
                        <div className='saveFile'>
                          <Link to='#' onClick={() => setShowModal(true)}>
                            <img src={BigSave} alt='' />
                          </Link>
                        </div>
                      </div> */}

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

                        {AccesoryDetails?.invoices?.map((invoice, index) => (
                          <div className='saveFile mx-2 my-2'>
                            <Link to="#" onClick={() => handleImageClick(invoice?.expense_file_path)} key={index}>
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
                                    onHide={() => handleCloseImage()}
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
                                  {/* <div style={{ width: '200px', height: '150px', overflow: 'auto' }}>
                                    <Document
                                      file={renderPDF2(invoice.expense_file_path)}
                                      onLoadError={console.error}
                                    >
                                      <Page pageNumber={1} width={200} />
                                    </Document>
                                  </div> */}
                                  <img
                                    src={pdfIcon}
                                    width={170}
                                    height={100}
                                    alt=""
                                    onClick={(e) => handlePdfDownload(e, invoice.expense_file_path)}
                                  />

                                </>)}
                            </Link>
                          </div>))}
                        {/* <Link to='#' onClick={() => setShowModal(true)}>
                            <img
                              src={AccesoryDetails?.invoices[0]?.expense_file_path}
                              alt=''
                              width='170'
                              height='120'
                            />
                          </Link> */}

                        {/* {console.log('expense_file_path-->', AccesoryDetails?.invoices[0]?.expense_file_path)} */}
                      </div>
                    </div>
                    <div className='col-md-9'></div>
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
        {/*   <Modal.Body>
          <img
            src={AccesoryDetails.fine_invoice_no}
            className='invoiceBigImg'
            alt=''
          />
        </Modal.Body> */}
      </Modal>
      {/* invoice view  Modal End */}
      {/* Delete Modal Start */}
      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        centered
        className='common-model'
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('Delete Vehicle Fine')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('Are you sure you want to Delete this Vehicle Fine')} ?
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
      {/* Delete Modal End */}
    </>
  )
}

export default ViewVehicleFine

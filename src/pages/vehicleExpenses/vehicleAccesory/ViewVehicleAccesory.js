import { React, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { Dropdown, Modal } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import option from '../../../assets/images/option-three-dot.svg'
import Export from '../../../assets/images/export_icon.svg'
import View from '../../../assets/images/Group.svg'
import Delete from '../../../assets/images/delete.svg'
import BigSave from '../../../assets/images/bigSave.svg'
import BigInvoice from '../../../assets/images/bigOnvoice.svg'
import image_placeholder from "../../../assets/images/image_placeholder.jpg";
import { motion } from 'framer-motion'
import ApiConfig from '../../../api/ApiConfig'
import { Document, Page } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {
  simpleDeleteCall,
  simpleGetCall,
  simplePostCall
} from '../../../api/ApiServices'

import { DateDDMMYYYY } from '../../../sharedComponent/common'
import Loader from '../../../sharedComponent/Loader'

import { useTranslation } from 'react-i18next'
import { notifyError, notifySuccess } from '../../../sharedComponent/notify'
import { useSelector } from 'react-redux'
import AddVehicleAccesory from './AddVehicleAccesory'

import pdfIcon from '../../../assets/images/InspetionPDF/pdf-Icon-regular.svg'

const ViewVehicleAccesory = () => {
  const accessRights = useSelector(state => state.auth.accessRights)
  const userRole = accessRights && accessRights.rights_role

  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext)
  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
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
  const { t, i18n } = useTranslation()

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
  }
  const params = useParams()
  let UserId = params.id
  const [loading, setLoading] = useState(false)
  const [AccesoryDetails, setAccesoryDetails] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (UserId) {
      geTransportmanagerDetails()
    }
  }, [])
  const geTransportmanagerDetails = () => {
    setLoading(true)
    simpleGetCall(ApiConfig.Vehicle_ACCESSORY_Profile + UserId)
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
      accessory_id: UserId
    })
    simpleDeleteCall(ApiConfig.Vehicle_ACCESSORY_DELETE, newRequestBody)
      .then(data => {
        if (data.result) {
          notifySuccess(data.message)
          setDeleteModal(false)
          navigate('/VehicleAccesory')
        } else {
          notifyError(data.message)
        }
      })
      .catch(error => {
        console.log('api response', error)
      })
  }




  const [pdfBlobUrl, setPdfBlobUrl] = useState('')


  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url)
  };
  const isPDF = (url) => /\.pdf$/i.test(url);

  const renderPDF = (url) => {
    // const fetchAndDisplayPDF = async () => {
    //   try {
    //     const response = await fetch(url);
    //     const blob = await response.blob();
    //     const blobUrl = URL.createObjectURL(blob);
    //     setPdfBlobUrl(blobUrl);
    //   } catch (error) {
    //     console.error('Error fetching PDF:', error);
    //   }
    // };
    // fetchAndDisplayPDF().then((res) => {
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    // })

    // console.log('ihave run -->', `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`)
    //  console.log('tttt',  `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`)
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
  };



  const renderPDF2 = (url) => {
    return url;
  };
  // useEffect(()=>{
  //   const timer = setTimeout(() => {
  //     console.log('moye moye');
  //     renderPDF();
  //   }, 5000);
  // }, [])


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
            <div id='cx-wrapper' className='ViewVehicle_Accesory'>
              <div className='main-master-wrapper'>
                <div className='headingDetails'>
                  <div className='headingTxt'>
                    <p className='heading'>{t('Vehicle Accessory Details')}</p>
                  </div>
                  {userRole === 'customer' ||
                    (accessRights && accessRights?.rights_manage_accessory) ? (
                    <div className='customer-option'>
                      <Dropdown>
                        <Dropdown.Toggle id='dropdown-basic'>
                          <img src={option} alt='' />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item>
                            {' '}
                            <Link
                              to={'/AddVehicleAccesory/' + UserId}
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
                      <label className='head'>Accessory Name</label>
                      <p className='Value'>{AccesoryDetails.accessory_item}</p>
                    </div>
                    <div className='col-md-3 ViewCol3 form_input_main'>
                      <label className='head'>Quantity</label>
                      <p className='Value'>
                        {AccesoryDetails.accessory_quantity}
                      </p>
                    </div>
                    <div className='col-md-3 ViewCol3 form_input_main'>
                      <label className='head'>Price</label>
                      <p className='Value'>{AccesoryDetails.accessory_price}</p>
                    </div>
                    <div className='col-md-3 ViewCol3 form_input_main'>
                      <label className='head'>Purchase from </label>
                      <p className='Value'>
                        {AccesoryDetails.accessory_purchase_from}
                      </p>
                    </div>
                    <div className='col-md-3 ViewCol3 form_input_main'>
                      <label className='head'>Date</label>
                      <p className='Value'>
                        {DateDDMMYYYY(AccesoryDetails.accessory_purchase_date)}
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
                                  {/* <div style={{ width: '200px', height: '150px', overflow: 'auto' }}>
                                    <Document
                                      file={renderPDF2(invoice.expense_file_path)}
                                      onLoadError={console.error}
                                    >
                                      <Page pageNumber={1} width={200} />
                                    </Document>
                                  </div> */}

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
        {/* <Modal.Body>
          <img
            src={AccesoryDetails?.accessory_invoice_no}
            className='invoiceBigImg'
            alt='no image Found'
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

export default ViewVehicleAccesory

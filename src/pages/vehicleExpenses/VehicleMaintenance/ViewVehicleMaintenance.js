import { React, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { Dropdown, Modal, Form, Accordion } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import option from '../../../assets/images/option-three-dot.svg'
import Export from '../../../assets/images/export_icon.svg'
import View from '../../../assets/images/Group.svg'
import pen from '../../../assets/images/Pen.svg'
import SideIc from '../../../assets/images/sideBar.svg'
import export_icon from '../../../assets/images/export_icon.svg'
import Delete from '../../../assets/images/delete.svg'
import BigSave from '../../../assets/images/bigSave.svg'
import Calendar from '../../../assets/images/calendar.svg'
import image_placeholder from "../../../assets/images/image_placeholder.jpg";
import BigInvoice from '../../../assets/images/bigOnvoice.svg'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import DatePicker from 'react-datepicker'
import ApiConfig from '../../../api/ApiConfig'
import EditIc from '../../../assets/images/ic-edit.svg'

import { simpleGetCall } from '../../../api/ApiServices'
import NoDataComp from '../../../sharedComponent/NoDataComp'
import { DateDDMMYYYY } from '../../../sharedComponent/common'
import { Document, Page, pdfjs } from 'react-pdf'
import { useSelector } from 'react-redux'

import pdfIcon from '../../../assets/images/InspetionPDF/pdf-Icon-regular.svg'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const ViewVehicleMaintenance = () => {
  const accessRights = useSelector(state => state.auth.accessRights)
  // const userRole = accessRights && accessRights.rights_role
  const userRole = "no Role"

  const { sidebar, setSidebar, loading, setLoading } = useContext(AppContext)
  const [selectedImage, setSelectedImage] = useState(null);
  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [inpute, setInpute] = useState(false)
  const { t, i18n } = useTranslation()
  const [vname, setVname] = useState('Toyota Innova')
  const [imageUrl, setImageURL] = useState('')
  const handleClose = () => setShowModal(false)
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
  }
  const [startDate, setStartDate] = useState(new Date())
  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath);
    setShowModal(true);
  }
  const handleCloseImage = () => {
    setShowModal(false);
    setSelectedImage(null);
  }
  const params = useParams()
  let UserId = params.id
  let Usertype = params.type
  const [Details, setDetails] = useState([])

  useEffect(() => {
    if (UserId) {
      getDetails()
    }
  }, [])
  const getDetails = () => {
    setLoading(true)
    simpleGetCall(ApiConfig.MAINTENANCE_VIEW_ALL + UserId + '/' + Usertype)
      .then(res => {
        setDetails(res.details)
        console.log(res.details);
      })
      .catch(err => {
        console.log('err', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // const downloadImage = (url, fileName) => {
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = fileName;
  //   link.click();
  // };

  // const handleDownload = (imageUrl) => {
  //   const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
  //   console.log("Extracted File Name:", fileName);
  //   downloadImage(imageUrl, fileName);
  // };
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
        <div id='cx-wrapper' className='ViewFleet_Maintainence'>
          <div className='holidays-filter-wrapper'>
            <div className='left-wrapper'></div>
            <div className='right-wrapper align-items-baseline'>
              {/* <Link to="#" className="import-icon">
                <img src={SideIc} alt="" />
              </Link> */}
              {/* <Link to="#" className="export-icon" style={{ padding: "10px" }}>
                <img src={export_icon} alt="" />
              </Link> */}
            </div>
          </div>
          <div className='accordian_mainTabs'>
            <Accordion defaultActiveKey='0'>
              {Details && Details.length > 0 ? (
                Details.map((itemlist, index) => {
                  return (
                    <Accordion.Item eventKey={index + 1}>
                      <Accordion.Header>
                        {itemlist.service_number} {' - '}
                        <span
                          className={
                            itemlist.maintainance_service_status === 'pending'
                              ? 'text-danger'
                              : 'text-success'
                          }
                        >
                          {itemlist.maintainance_service_status}
                        </span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className='DetailsSec'>
                          {itemlist.maintainance_service_status ===
                            'completed' ? (
                            <></>
                          ) : (
                            <>
                              {userRole === 'customer' ||
                                (accessRights &&
                                  accessRights?.rights_manage_vehicle_maintainance) ? (
                                <Link
                                  to={
                                    '/AddVehicleMaintenance/' +
                                    itemlist.maintainance_id
                                  }
                                  className='d-flex justify-content-end align-items-center my-2 '
                                >
                                  <div className='inconsIn me-3'>
                                    <img src={EditIc} alt='' />
                                  </div>
                                </Link>
                              ) : null}
                            </>
                          )}
                          <div className='row detailsRow'>
                            <div className='col-md-3 ViewCol3 form_input_main'>
                              <label className='head'>
                                {t('Vehicle Name')}
                                {/* <img
                            src={pen}
                            alt=""
                            className="ms-2"
                            onClick={() => {
                              setInpute(!inpute);
                            }}
                          /> */}
                              </label>
                              <p className='Value'>{itemlist.vehicle_number}</p>

                              {/* {inpute === true ? (
                          <input
                            type="text"
                            onChange={(e) => {
                              setVname(e.target.value);
                            }}
                            className="form-control eitatable"
                            defaultValue={vname}
                          />
                        ) : (
                          <p className="Value edatiable">{vname}</p>
                        )} */}
                            </div>
                            {itemlist.maintainance_service_status ===
                              'completed' ? (
                              <>
                                <div className='col-md-3 ViewCol3 form_input_main'>
                                  <label className='head'>
                                    {t('Last Service On')}
                                  </label>
                                  <p className='Value'>
                                    {DateDDMMYYYY(itemlist.last_service_date)}
                                  </p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className='col-md-3 ViewCol3 form_input_main'>
                                  <label className='head'>
                                    {t('Service Date')}
                                  </label>
                                  <p className='Value'>
                                    {DateDDMMYYYY(
                                      itemlist.maintainance_service_date
                                    )}
                                  </p>
                                </div>
                              </>
                            )}

                            <div className='col-md-3 ViewCol3 form_input_main'>
                              <label className='head'>
                                {t('Kilometer’s Driven')} (H)
                              </label>
                              <p className='Value'>
                                {itemlist.maintainance_kilometers_driven}
                              </p>
                            </div>
                            <div className='col-md-3 ViewCol3 form_input_main'>
                              <label className='head'>
                                {t('Next Service Kilometers')} (H)
                              </label>
                              <p className='Value'>
                                {itemlist.maintainance_next_service_kilometers}
                              </p>
                            </div>
                            <div className='col-md-3 ViewCol3 form_input_main'>
                              <label className='head'>
                                {t('Next Service On')}
                              </label>
                              {itemlist.maintainance_next_service_date ===
                                null ? (
                                <p className='Value'>NA</p>
                              ) : (
                                <p className='Value'>
                                  {DateDDMMYYYY(
                                    itemlist.maintainance_next_service_date
                                  )}
                                </p>
                              )}
                            </div>
                            <div className='col-md-3 ViewCol3 form_input_main'>
                              <label className='head'>
                                {t('Service Cost')}{' '}
                              </label>
                              <p className='Value'>
                                {itemlist.maintainance_expense}
                              </p>
                            </div>
                            <div className='col-md-3 ViewCol3 form_input_main'>
                              <label className='head'>
                                {t('Service task')}{' '}
                              </label>
                              <p className='Value'>
                                {itemlist.maintainance_task}
                              </p>
                            </div>
                            <div className='col-md-3 ViewCol3 form_input_main'>
                              <label className='head'>
                                {t('Service Mode')}
                              </label>
                              <p className='Value'>
                                {itemlist.maintainance_service_mode}
                              </p>
                            </div>
                            <div className='col-md-3 ViewCol3 form_input_main'>
                              <label className='head'>
                                {t('Service Completion Type')}
                              </label>
                              <p className='Value'>
                                {itemlist.maintainance_service_completion_type ??
                                  itemlist.maintainance_service_status}
                              </p>
                            </div>
                            <div className='col-md-3 ViewCol3 form_input_main'>
                              <label className='head'>
                                {t('Service Notification')}
                              </label>
                              <p className='Value'>
                                {itemlist.maintainance_send_service_notification
                                  ? `${'You will be notified before ' +
                                  itemlist?.maintainance_service_notification_duration
                                  } days`
                                  : 'NA'}
                              </p>
                            </div>
                            <div className='DetailsSec'>
                              <div className='row detailsRow'>
                                {itemlist.maintainance_service_status ===
                                  'completed' ?
                                  (
                                    <>
                                      {/*      <div className='col-md-3 invoiceCOl'>
                                      <label className='head'>
                                        {t('Invoice')}
                                      </label>
                                      <div className='invoiceBox'>
                                        <div className='headingInvoi'>
                                          <p>Service Invoice</p>
                                          <div></div>
                                        </div>
                                        <div className='saveFile'>
                                          {itemlist.maintainance_invoice.includes(
                                            '.pdf'
                                          ) ? (
                                            <a
                                              href={
                                                itemlist.maintainance_invoice
                                              }
                                              style={{ marginTop: '10px' }}
                                            >
                                              Open invoice
                                            </a>
                                          ) : (
                                            <Link
                                              to='#'
                                              onClick={() => setShowModal(true)}
                                            >
                                              {itemlist.maintainance_invoice ===
                                                '' ||
                                              itemlist.maintainance_invoice ===
                                                'null' ? (
                                                <>
                                                  <img
                                                    className='invc_img'
                                                    style={{
                                                      width:
                                                        '-webkit-fill-available',
                                                      height: '130px'
                                                    }}
                                                    onClick={() => {
                                                      setImageURL(BigSave)
                                                    }}
                                                    src={BigSave}
                                                    alt=''
                                                  />
                                                </>
                                              ) : (
                                                <img
                                                  className='invc_img'
                                                  style={{
                                                    width:
                                                      '-webkit-fill-available',
                                                    height: '130px'
                                                  }}
                                                  onClick={() => {
                                                    setImageURL(
                                                      itemlist.maintainance_invoice
                                                    )
                                                  }}
                                                  src={
                                                    itemlist &&
                                                    itemlist?.maintainance_invoice
                                                  }
                                                  alt=''
                                                />
                                              )}
                                            </Link>
                                          )}
                                        </div>
                                      </div>
                                    </div> */}
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

                                          {itemlist?.invoices?.map((invoice, index) => (
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
                                src={itemlist?.invoices[0]?.expense_file_path}
                                alt=''
                                width='170'
                                height='120'
                              />
                            </Link> */}

                                          {/* {console.log('expense_file_path-->', itemlist?.invoices[0]?.expense_file_path)} */}
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  )
                })
              ) : (
                <NoDataComp />
              )}
            </Accordion>
          </div>
        </div>
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
          <img src={imageUrl} className='invoiceBigImg' alt='' />
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
          <Modal.Title>Delete Fleet Maintenance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to Delete this Fleet Maintenance ?
        </Modal.Body>
        <Modal.Footer className='pop-up-modal-footer'>
          <div class='btn-wrapper'>
            <button className='cx-btn-1' onClick={() => setDeleteModal(false)}>
              Cancel
            </button>
            <button className='cx-btn-2' onClick={() => setDeleteModal(false)}>
              Yes
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal End */}
    </>
  )
}

export default ViewVehicleMaintenance

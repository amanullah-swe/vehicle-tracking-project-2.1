import React, { useContext, useState } from 'react'
import { Col, Dropdown, Modal, Nav, Tab, Tabs } from 'react-bootstrap'
import { AppContext } from '../../context/AppContext'
import trip_icon from '../../assets/images/Customer-profile.png'
import Import from '../../assets/images/ic-Import.svg'
import Export from '../../assets/images/ic-Export.svg'
import option from '../../assets/images/option-three-dot.svg'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const AllUsers = () => {
  const accessRights = useSelector(state => state.auth.accessRights)
  const userRole = accessRights && accessRights.rights_role

  const [show, setShow] = useState(false)
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { t, i18n } = useTranslation()

  return (
    <main className={sidebar ? 'taskMain ' : 'cx-active taskMain'} id='cx-main'>
      <div id='cx-wrapper'>
        <div className='Vehcle-main-tabs' id='All_Users_Responsive'>
          {
            // rights_manage_report_distribution
            userRole === 'customer' ||
            (accessRights &&
              accessRights?.rights_manage_report_distribution) ? (
              <Link to='/CreateUser' className='d-flex justify-content-end'>
                <button className='cx-btn-3 mb-3'>
                  + {t('Create Contact')}
                </button>
              </Link>
            ) : null
          }
          <div className='main-master-wrapper mb-0 inner-tabs-section tabs-custom-width-33'>
            <div id='scroll_insideThe_Padding'>
              <div className='all-vehicle-main'>
                <div className='all-vehical-head row vehicle-top-inputs'>
                  <div className='input-section-wrapper'>
                    <div className='row'>
                      <div className='col-lg-3 col-md-6 col-sm-12 mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='User Name'
                        />
                      </div>
                      <div className='col-lg-3 col-md-6 col-sm-12 mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Email'
                        />
                      </div>
                      <div className='col-lg-3 col-md-6 col-sm-12 mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Contact Number'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='right-export-btn-section-wrapper'>
                    <div className='c-pointer me-2'>
                      <img src={Export} alt='' />
                    </div>
                    <div className='c-pointer'>
                      <img src={Import} alt='' />
                    </div>
                  </div>
                </div>
                <div className='yauto'>
                  <div
                    className='row gx-3 main-cards-wrapper '
                    id='cutomHeight2'
                  >
                    <div
                      className={
                        sidebar ? 'col-lg-4 col-md-6' : 'col-lg-3 col-md-6'
                      }
                    >
                      <div className={'common-vehical-card-inner cv-card p-0'}>
                        <div className='vehical-card-head'>
                          <div className='heading'>
                            <img src={trip_icon} alt='' />
                            <div className=''>
                              <p className='sub-heading'>{t("User's Name")}</p>
                              <p className='title'>Mark S. Woods</p>
                            </div>
                          </div>
                          <div className='option customer-option'>
                            {userRole === 'customer' ||
                            (accessRights &&
                              accessRights?.rights_manage_report_distribution) ? (
                              <Dropdown>
                                <Dropdown.Toggle id='dropdown-basic'>
                                  <img src={option} alt='' />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <Link to='/ReportDistributionContactsDetails'>
                                      {t('View')}
                                    </Link>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <Link to='/EditUser'>{t('Edit')}</Link>
                                  </Dropdown.Item>
                                  <Dropdown.Item onClick={handleShow}>
                                    <Link to='#'>{t('Delete')}</Link>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            ) : null}
                          </div>
                        </div>
                        <div className='vehical-card-body row'>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Contact Number')}</p>
                            <p className='title'>99999 99999</p>
                          </div>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Email')}</p>
                            <p className='title'>markwoods@gmail.com</p>
                          </div>
                          <div className='card-contain col-lg-12'>
                            <p className='sub-heading'>{t('Address')}</p>
                            <p className='title'>
                              Vishrantwadi, Kalas Road, Pune- 411030.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        sidebar ? 'col-lg-4 col-md-6' : 'col-lg-3 col-md-6'
                      }
                    >
                      <div className={'common-vehical-card-inner cv-card p-0'}>
                        <div className='vehical-card-head'>
                          <div className='heading'>
                            <img src={trip_icon} alt='' />
                            <div className=''>
                              <p className='sub-heading'>{t("User's Name")}</p>
                              <p className='title'>Mark S. Woods</p>
                            </div>
                          </div>
                          <div className='option customer-option'>
                            <Dropdown>
                              <Dropdown.Toggle id='dropdown-basic'>
                                <img src={option} alt='' />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link to='/ReportDistributionContactsDetails'>
                                    {t('View')}
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link to='/EditUser'>{t('Edit')}</Link>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleShow}>
                                  <Link to='#'>{t('Delete')}</Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <div className='vehical-card-body row'>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Contact Number')}</p>
                            <p className='title'>99999 99999</p>
                          </div>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Email')}</p>
                            <p className='title'>markwoods@gmail.com</p>
                          </div>
                          <div className='card-contain col-lg-12'>
                            <p className='sub-heading'>{t('Address')}</p>
                            <p className='title'>
                              Vishrantwadi, Kalas Road, Pune- 411030.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        sidebar ? 'col-lg-4 col-md-6' : 'col-lg-3 col-md-6'
                      }
                    >
                      <div className={'common-vehical-card-inner cv-card p-0'}>
                        <div className='vehical-card-head'>
                          <div className='heading'>
                            <img src={trip_icon} alt='' />
                            <div className=''>
                              <p className='sub-heading'>{t("User's Name")}</p>
                              <p className='title'>Mark S. Woods</p>
                            </div>
                          </div>
                          <div className='option customer-option'>
                            <Dropdown>
                              <Dropdown.Toggle id='dropdown-basic'>
                                <img src={option} alt='' />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link to='/ReportDistributionContactsDetails'>
                                    {t('View')}
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link to='/EditUser'>{t('Edit')}</Link>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleShow}>
                                  <Link to='#'>{t('Delete')}</Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <div className='vehical-card-body row'>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Contact Number')}</p>
                            <p className='title'>99999 99999</p>
                          </div>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Email')}</p>
                            <p className='title'>markwoods@gmail.com</p>
                          </div>
                          <div className='card-contain col-lg-12'>
                            <p className='sub-heading'>{t('Address')}</p>
                            <p className='title'>
                              Vishrantwadi, Kalas Road, Pune- 411030.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        sidebar ? 'col-lg-4 col-md-6' : 'col-lg-3 col-md-6'
                      }
                    >
                      <div className={'common-vehical-card-inner cv-card p-0'}>
                        <div className='vehical-card-head'>
                          <div className='heading'>
                            <img src={trip_icon} alt='' />
                            <div className=''>
                              <p className='sub-heading'>{t("User's Name")}</p>
                              <p className='title'>Mark S. Woods</p>
                            </div>
                          </div>
                          <div className='option customer-option'>
                            <Dropdown>
                              <Dropdown.Toggle id='dropdown-basic'>
                                <img src={option} alt='' />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link to='/ReportDistributionContactsDetails'>
                                    {t('View')}
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link to='/EditUser'>{t('Edit')}</Link>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleShow}>
                                  <Link to='#'>{t('Delete')}</Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <div className='vehical-card-body row'>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Contact Number')}</p>
                            <p className='title'>99999 99999</p>
                          </div>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Email')}</p>
                            <p className='title'>markwoods@gmail.com</p>
                          </div>
                          <div className='card-contain col-lg-12'>
                            <p className='sub-heading'>{t('Address')}</p>
                            <p className='title'>
                              Vishrantwadi, Kalas Road, Pune- 411030.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        sidebar ? 'col-lg-4 col-md-6' : 'col-lg-3 col-md-6'
                      }
                    >
                      <div className={'common-vehical-card-inner cv-card p-0'}>
                        <div className='vehical-card-head'>
                          <div className='heading'>
                            <img src={trip_icon} alt='' />
                            <div className=''>
                              <p className='sub-heading'>{t("User's Name")}</p>
                              <p className='title'>Mark S. Woods</p>
                            </div>
                          </div>
                          <div className='option customer-option'>
                            <Dropdown>
                              <Dropdown.Toggle id='dropdown-basic'>
                                <img src={option} alt='' />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link to='/ReportDistributionContactsDetails'>
                                    {t('View')}
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link to='/EditUser'>{t('Edit')}</Link>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleShow}>
                                  <Link to='#'>{t('Delete')}</Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <div className='vehical-card-body row'>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Contact Number')}</p>
                            <p className='title'>99999 99999</p>
                          </div>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Email')}</p>
                            <p className='title'>markwoods@gmail.com</p>
                          </div>
                          <div className='card-contain col-lg-12'>
                            <p className='sub-heading'>{t('Address')}</p>
                            <p className='title'>
                              Vishrantwadi, Kalas Road, Pune- 411030.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        sidebar ? 'col-lg-4 col-md-6' : 'col-lg-3 col-md-6'
                      }
                    >
                      <div className={'common-vehical-card-inner cv-card p-0'}>
                        <div className='vehical-card-head'>
                          <div className='heading'>
                            <img src={trip_icon} alt='' />
                            <div className=''>
                              <p className='sub-heading'>{t("User's Name")}</p>
                              <p className='title'>Mark S. Woods</p>
                            </div>
                          </div>
                          <div className='option customer-option'>
                            <Dropdown>
                              <Dropdown.Toggle id='dropdown-basic'>
                                <img src={option} alt='' />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link to='/ReportDistributionContactsDetails'>
                                    {t('View')}
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link to='/EditUser'>{t('Edit')}</Link>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleShow}>
                                  <Link to='#'>{t('Delete')}</Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <div className='vehical-card-body row'>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Contact Number')}</p>
                            <p className='title'>99999 99999</p>
                          </div>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Email')}</p>
                            <p className='title'>markwoods@gmail.com</p>
                          </div>
                          <div className='card-contain col-lg-12'>
                            <p className='sub-heading'>{t('Address')}</p>
                            <p className='title'>
                              Vishrantwadi, Kalas Road, Pune- 411030.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        sidebar ? 'col-lg-4 col-md-6' : 'col-lg-3 col-md-6'
                      }
                    >
                      <div className={'common-vehical-card-inner cv-card p-0'}>
                        <div className='vehical-card-head'>
                          <div className='heading'>
                            <img src={trip_icon} alt='' />
                            <div className=''>
                              <p className='sub-heading'>{t("User's Name")}</p>
                              <p className='title'>Mark S. Woods</p>
                            </div>
                          </div>
                          <div className='option customer-option'>
                            <Dropdown>
                              <Dropdown.Toggle id='dropdown-basic'>
                                <img src={option} alt='' />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link to='/ReportDistributionContactsDetails'>
                                    {t('View')}
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link to='/EditUser'>{t('Edit')}</Link>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleShow}>
                                  <Link to='#'>{t('Delete')}</Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <div className='vehical-card-body row'>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Contact Number')}</p>
                            <p className='title'>99999 99999</p>
                          </div>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Email')}</p>
                            <p className='title'>markwoods@gmail.com</p>
                          </div>
                          <div className='card-contain col-lg-12'>
                            <p className='sub-heading'>{t('Address')}</p>
                            <p className='title'>
                              Vishrantwadi, Kalas Road, Pune- 411030.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        sidebar ? 'col-lg-4 col-md-6' : 'col-lg-3 col-md-6'
                      }
                    >
                      <div className={'common-vehical-card-inner cv-card p-0'}>
                        <div className='vehical-card-head'>
                          <div className='heading'>
                            <img src={trip_icon} alt='' />
                            <div className=''>
                              <p className='sub-heading'>{t("User's Name")}</p>
                              <p className='title'>Mark S. Woods</p>
                            </div>
                          </div>
                          <div className='option customer-option'>
                            <Dropdown>
                              <Dropdown.Toggle id='dropdown-basic'>
                                <img src={option} alt='' />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link to='/ReportDistributionContactsDetails'>
                                    {t('View')}
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link to='/EditUser'>{t('Edit')}</Link>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleShow}>
                                  <Link to='#'>{t('Delete')}</Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <div className='vehical-card-body row'>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Contact Number')}</p>
                            <p className='title'>99999 99999</p>
                          </div>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Email')}</p>
                            <p className='title'>markwoods@gmail.com</p>
                          </div>
                          <div className='card-contain col-lg-12'>
                            <p className='sub-heading'>{t('Address')}</p>
                            <p className='title'>
                              Vishrantwadi, Kalas Road, Pune- 411030.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        sidebar ? 'col-lg-4 col-md-6' : 'col-lg-3 col-md-6'
                      }
                    >
                      <div className={'common-vehical-card-inner cv-card p-0'}>
                        <div className='vehical-card-head'>
                          <div className='heading'>
                            <img src={trip_icon} alt='' />
                            <div className=''>
                              <p className='sub-heading'>{t("User's Name")}</p>
                              <p className='title'>Mark S. Woods</p>
                            </div>
                          </div>
                          <div className='option customer-option'>
                            <Dropdown>
                              <Dropdown.Toggle id='dropdown-basic'>
                                <img src={option} alt='' />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link to='/ReportDistributionContactsDetails'>
                                    {t('View')}
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link to='/EditUser'>{t('Edit')}</Link>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleShow}>
                                  <Link to='#'>{t('Delete')}</Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <div className='vehical-card-body row'>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Contact Number')}</p>
                            <p className='title'>99999 99999</p>
                          </div>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Email')}</p>
                            <p className='title'>markwoods@gmail.com</p>
                          </div>
                          <div className='card-contain col-lg-12'>
                            <p className='sub-heading'>{t('Address')}</p>
                            <p className='title'>
                              Vishrantwadi, Kalas Road, Pune- 411030.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        sidebar ? 'col-lg-4 col-md-6' : 'col-lg-3 col-md-6'
                      }
                    >
                      <div className={'common-vehical-card-inner cv-card p-0'}>
                        <div className='vehical-card-head'>
                          <div className='heading'>
                            <img src={trip_icon} alt='' />
                            <div className=''>
                              <p className='sub-heading'>{t("User's Name")}</p>
                              <p className='title'>Mark S. Woods</p>
                            </div>
                          </div>
                          <div className='option customer-option'>
                            <Dropdown>
                              <Dropdown.Toggle id='dropdown-basic'>
                                <img src={option} alt='' />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link to='/ReportDistributionContactsDetails'>
                                    {t('View')}
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link to='/EditUser'>{t('Edit')}</Link>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleShow}>
                                  <Link to='#'>{t('Delete')}</Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <div className='vehical-card-body row'>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Contact Number')}</p>
                            <p className='title'>99999 99999</p>
                          </div>
                          <div className='card-contain col-lg-6'>
                            <p className='sub-heading'>{t('Email')}</p>
                            <p className='title'>markwoods@gmail.com</p>
                          </div>
                          <div className='card-contain col-lg-12'>
                            <p className='sub-heading'>{t('Address')}</p>
                            <p className='title'>
                              Vishrantwadi, Kalas Road, Pune- 411030.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className='reg-color m-0 p-0 mt-3'>
              {t('Showing')} 1 - 10 of 200
            </p>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            centered
            className='common-model'
          >
            <Modal.Header closeButton>
              <Modal.Title>{t('Delete')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {t(
                'Are you sure you want to delete this Report Distribution Contacts'
              )}{' '}
              ?
            </Modal.Body>
            <Modal.Footer className='pop-up-modal-footer'>
              <button className='cx-btn-1' onClick={handleClose}>
                {t('Close')}
              </button>
              <button className='cx-btn-2' onClick={handleClose}>
                {t('Yes')}
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </main>
  )
}

export default AllUsers

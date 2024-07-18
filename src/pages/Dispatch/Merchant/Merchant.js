import React, { useContext, useEffect, useState } from "react";
import { Col, Dropdown, Modal, Nav, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import trip_icon from "../../../assets/images/Customer-profile.png";
import Import from "../../../assets/images/ic-Import.svg";
import Export from "../../../assets/images/ic-Export.svg";
import option from "../../../assets/images/option-three-dot.svg";
import { Link, json } from "react-router-dom";
import { simpleDeleteCall, simplePostCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import Pagenation from "../../../sharedComponent/Pagenation";
import NoDataComp from "../../../sharedComponent/NoDataComp";
import Loader from "../../../sharedComponent/Loader";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { notifySuccess } from "../../../sharedComponent/notify";
import ImportUser from "../../../assets/images/imagesuser.png";

const Merchant = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;

  const [show, setShow] = useState(false);
  const {
    sidebar,
    setSidebar,
    Dark,
    customerData,
    loading,
    setLoading,
    useDebounce,
    recordsPerPage,
  } = useContext(AppContext);
  const [merchentList, setMerchentList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const handleClose = () => setShow(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [last_page, setLast_page] = useState(false);
  const [filter, setFilter] = useState({
    vendor_name: "",
    vendor_warehouse_name: "",
  });
  const debouncedSearchTerm = useDebounce(filter, 500);

  useEffect(() => {
    setMerchentList([]);
    getMerchentList(1);
  }, [debouncedSearchTerm]);
  const handleShow = (id) => {
    setShow(true);
    setSelectedItem(id);
  };

  const getMerchentList = (currentpage) => {
    currentpage == 1 && setLoading(true);
    let body = JSON.stringify({
      ...filter,
      page: currentpage ? currentpage : page,
      page_limit: recordsPerPage,
    });
    simplePostCall(ApiConfig.GET_MERCHENT_LIST, body)
      .then((res) => {
        if (res.result) {
          if (currentpage == 1) {
            setMerchentList(res.resultQuery);
            setTotal(res?.total);
            setLast_page(res.last_page);
          } else {
            setMerchentList([...merchentList, ...res.resultQuery]);
            setTotal(res?.total);
            setLast_page(res.last_page);
          }
        }
      })
      .catch((err) => {
        console.log("err", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteItem = () => {
    setLoading(true);
    setMerchentList([]);

    let body = JSON.stringify({
      vendor_id: selectedItem,
    });
    simplePostCall(ApiConfig.DELETE_MERCHANT_DELETE, body)
      .then((res) => {
        if (res.result) {
          getMerchentList(1);
          notifySuccess(res.message);
          handleClose();
          setPage(page - 1);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const { t, i18n } = useTranslation();
  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
  };
  return (
    <main className={sidebar ? "taskMain " : "cx-active taskMain"} id="cx-main">
      <div id="cx-wrapper">
        <div className="Vehcle-main-tabs" id="All_Users_Responsive">
          {userRole === "customer" ||
          (accessRights && accessRights?.rights_manage_merchants) ? (
            <Link to="/AddMerchant" className="d-flex justify-content-end">
              {
                customerData.customer_id == 9999 ? (
                  <>
                  
                
              <button className="cx-btn-3 mb-2">+ {t("Add Merchant")}</button>

                  </>
              
             
             
              ) : <>
              <button className="cx-btn-3 mb-2">+ {t("Add Merchant")}</button>

              </>}
            </Link>
          ) : null}
          <div className="main-master-wrapper mb-0 inner-tabs-section tabs-custom-width-33">
            <div id="scroll_insideThe_Padding53" className="overflow-hidden">
              <div className="all-vehicle-main">
                <div className="all-vehical-head row vehicle-top-inputs">
                  <div className="input-section-wrapper">
                    <div className="row">
                      <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("Enter Name")}
                          value={filter?.vendor_name}
                          onChange={(e) => {
                            setMerchentList([]);
                            setFilter({ vendor_name: e.target.value });
                          }}
                        />
                      </div>
                      {/* <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Warehouse ID"
                                      onChange={(e) => {
                                        setMerchentList([]);
                                        setFilter({ vendor_id: e.target.value });
                                      }}
                                    />
                                  </div> */}
                    </div>
                  </div>
                  {userRole === "customer" ||
                  (accessRights && accessRights?.rights_manage_merchants) ? (
                    <div className="right-export-btn-section-wrapper">
                      {/* <div className='c-pointer me-2'>
                                    <img src={Export} alt='' />
                                  </div> */}
                      {/* <div className='c-pointer'>
                                    <img src={Import} alt='' />
                                  </div> */}
                    </div>
                  ) : null}
                </div>
                <div
                  className="yauto"
                  id="scroll_insideThe_Padding53"
                  onScroll={(e) => {
                    const bottom =
                      e.target.scrollHeight - e.target.scrollTop ===
                      e.target.clientHeight;
                    if (bottom && !last_page) {
                      setPage(page + 1);
                      getMerchentList(page + 1);
                    }
                  }}
                >
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      <div
                        className="row gx-3 main-cards-wrapper "
                        id="cutomHeight2"
                      >
                        {merchentList.length ? (
                          <>
                            {merchentList.map((merchent, index) => {
                              return (
                                <div
                                  key={"merchent" + index}
                                  className={
                                    sidebar
                                      ? "col-lg-4 col-md-6"
                                      : "col-lg-3 col-md-6"
                                  }
                                >
                                  <div
                                    className={
                                      "common-vehical-card-inner cv-card p-0"
                                    }
                                  >
                                    <div className="vehical-card-head">
                                      <div className="heading">
                                        {/* <img src={trip_icon} alt="" /> */}
                                        {merchent.user_profile_pic === "" ||
                                        merchent.user_profile_pic === null ||
                                        merchent.user_profile_pic ===
                                          "undefined" ? (
                                          <img
                                            src={ImportUser}
                                            alt=""
                                            className="custom-Margin"
                                          />
                                        ) : (
                                          <img
                                            src={
                                            
                                              merchent.user_profile_pic
                                            }
                                            onError={(ev) => {
                                              handleErrorImage(ev);
                                            }}
                                            alt=""
                                            className="custom-Margin"
                                          />
                                        )}
                                        <div className="">

                                        {
                                          customerData.customer_id == 9999 ? (
                                            <>
                                            
                                          
                                            <p className="sub-heading">
                                            {t("Merchant Name")}

                                        
                                          </p>
                          
                                            </>
                                        
                                       
                                       
                                        ) : <>
                                        <p className="sub-heading">
                                        {t("Merchant Name")}

                                    
                                      </p>
                          
                                        </>}
                                          
                                          <p className="title">
                                            {merchent.vendor_name}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="option customer-option">
                                        <Dropdown>
                                          <Dropdown.Toggle id="dropdown-basic">
                                            <img src={option} alt="" />
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            {(userRole === "customer" ||
                                              (accessRights &&
                                                accessRights?.rights_view_merchants)) && (
                                              <Dropdown.Item>
                                                <Link
                                                  to={
                                                    "/ViewMerchant/" +
                                                    merchent.vendor_id
                                                  }
                                                >
                                                  {t("View")}
                                                </Link>
                                              </Dropdown.Item>
                                            )}
                                            {/* accessRights?.rights_view_merchants */}
                                            {userRole === "customer" ||
                                            (accessRights &&
                                              accessRights?.rights_manage_merchants) ? (
                                              <>
                                                <Dropdown.Item>
                                                  <Link
                                                    to={
                                                      "/EditMerchant/" +
                                                      merchent?.vendor_id
                                                    }
                                                  >
                                                    {t("Edit")}
                                                  </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                  <Link
                                                    to="#"
                                                    onClick={() =>
                                                      handleShow(
                                                        merchent?.vendor_id
                                                      )
                                                    }
                                                  >
                                                    {t("Delete")}
                                                  </Link>
                                                </Dropdown.Item>
                                              </>
                                            ) : null}
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                    </div>
                                    <div className="vehical-card-body row">
                                      <div className="card-contain col-lg-6">
                                      {
                                        customerData.customer_id == 9999 ? (
                                          <>
                                          
                                        
                                          <p className="sub-heading">
                                          {t("Merchant ID")}

                                        </p>
                        
                                          </>
                                      
                                     
                                     
                                      ) : <>
                                      <p className="sub-heading">
                                          {t("Merchant ID")}

                                        </p>
                        
                                      </>}
                                        
                                        <p className="title">
                                          {merchent?.vendor_id}
                                        </p>
                                      </div>
                                      <div className="card-contain col-lg-6">
                                      
                                      

                                        {
                                          customerData.customer_id == 9999 ? (
                                            <>
                                            
                                          
                                            <p className="sub-heading">
                                            {t("Merchant Email")}
  
                                          </p>
                          
                                            </>
                                        
                                       
                                       
                                        ) : <>
                                        <p className="sub-heading">
                                        {t("Merchant Email")}
                                      </p>
                          
                                        </>}
                                        <p className="title">
                                          {merchent?.vendor_email}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            {/* {last_page && (
                            <p className="text-center text-danger">
                              {t("No More Data Found")}
                            </p>
                          )} */}
                          </>
                        ) : (
                          <NoDataComp />
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {merchentList?.length > 0 && (
              <Pagenation
                total={total}
                length={merchentList?.length}
                comp={"Merchant"}
              />
            )}
          </div>

          <Modal
            show={show}
            onHide={handleClose}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Delete")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
           

              {
                customerData.customer_id == 9999 ? (
                  <>
                  
                
                  {t("Are you sure you want to delete this Merchant")} ? 

                  </>
              
             
             
              ) : <>
              {t("Are you sure you want to delete this Merchant")} ? 

              </>}
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer">
              <button className="cx-btn-1" onClick={handleClose}>
                {t("Close")}
              </button>
              <button className="cx-btn-2" type="button" onClick={deleteItem}>
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </main>
  );
};

export default Merchant;

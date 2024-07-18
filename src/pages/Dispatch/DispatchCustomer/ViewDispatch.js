import { React, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import option from "../../../assets/images/option-three-dot.svg";
import SideIc from "../../../assets/images/sideBar.svg";
import export_icon from "../../../assets/images/export_icon.svg";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dropdown, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import { simpleDeleteCall, simpleGetCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { useEffect } from "react";
import Loader from "../../../sharedComponent/Loader";
import { notifySuccess } from "../../../sharedComponent/notify";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const ViewDispatch = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const [dispatchDetails, setDispatchDetails] = useState({});
  const { id } = useParams();
  const getDispatchDetails = () => {
    setLoading(true);
    simpleGetCall(ApiConfig.GET_VIEW_DISPATCH_DETAILS + id)
      .then((res) => {
        if (res.result) {
          setDispatchDetails(res.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (id) getDispatchDetails();
  }, [id]);
  const deleteItem = () => {
    setLoading(true);
    simpleDeleteCall(ApiConfig.DELETE_DISPATCH_DELETE + selectedItem)
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
          navigate("/DispatchCustomer");
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <motion.div
        className={sidebar ? "taskMain " : "cx-active taskMain"}
        id="cx-main"
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
      >
        <div id="cx-wrapper" className="View_Dispatch">
          {loading ? (
            <Loader />
          ) : (
            <>
              {/* Top inputs for instatnt search */}
              <div className="displayFlexInp">
                {/* <div className="innerSelectBox weekCounter selectForm form_input_main">
                  <Form.Select
                    required
                    as="select"
                    type="select"
                    name="Speed_limit"
                    className="innerCust"
                  >
                    <option value="">Vehicle Name</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                  </Form.Select>
                </div> */}
                {/* <div className="innerSelectBox weekCounter selectForm form_input_main">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Customer Code"
                    className="innerCust"
                    value={dispatchDetails.dispatch_customer_code}
                  />
                </div> */}
                <div className="innerSelectBox weekCounter selectForm form_input_main dNo"></div>
                <div className="innerSelectBox weekCounter selectForm form_input_main dNo"></div>
               { userRole === "customer" ||
                    (accessRights &&
                      accessRights?.rights_manage_dispatch_customer==1)&& <div className="innerSelectBox weekCounter selectForm form_input_main">
                  <Link to="/AddDispatchCustomer" className="AddAccidentLink">
                    <button className="innerCust">+ {t("Add Customer")}</button>
                  </Link>
                </div>}
                {/* <div className="headerDivIc form_input_main">
                  <Link to="#">
                    <img src={SideIc} alt="" />
                  </Link>
                </div>
                <div className="headerDivIc form_input_main">
                  <Link to="#">
                    <img src={export_icon} alt="" />
                  </Link>
                </div> */}
              </div>
              <div
                className="main-master-wrapper form_input_main"
                id="View_Dispatch_main"
              >
                <div className="headingDetails">
                  <div className="headingTxt">
                    <p className="heading">{t("Customer Details")}</p>
                  </div>
                  {/* <div className="customer-option">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src={option} alt="" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link
                            to={"/EditCustomerDispatch/" + id}
                            className="d-block"
                          >
                            {t("Edit")}
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link
                            onClick={() => {
                              setSelectedItem(
                                dispatchDetails.dispatch_customer_id
                              );
                              setDeleteModal(true);
                            }}
                            className="d-block"
                            to="#"
                          >
                            {t("Delete")}
                          </Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div> */}
                </div>
                <div className="DetailsSec">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="head">{t("Customer Name")}</label>
                      <p className="Value">
                        {dispatchDetails.dispatch_customer_name}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <label className="head">{t("Customer Code")}</label>
                      <p className="Value">
                        {dispatchDetails.dispatch_customer_code}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <label className="head">{t("Customer Email")}</label>
                      <p className="Value">
                        {dispatchDetails.dispatch_customer_email}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <label className="head">{t("Customer Mobile No.")}</label>
                      <p className="Value">
                        {dispatchDetails.dispatch_customer_mobile}
                      </p>
                    </div>
                  </div>
                  {dispatchDetails.dispatch_customer_address &&
                dispatchDetails.dispatch_customer_address.map(
                  (address, index) => {
                    return (
                      <div
                        className="" style={{

                          marginTop:"10px"
                        }}
                        id="View_Dispatch_main"
                        key={"address" + index}
                      >
                        {/* <div className="headingDetails">
                          <div className="headingTxt">
                            <p className="heading">{t("Address")} -{index + 1}</p>
                          </div>
                        </div> */}
                        <div className="DetailsSec">
                          <div className="row">
                            <div className="col-md-6">
                              <label className="head">
                                {t("Dispatch Customer Address")}
                              </label>
                              <p className="Value">
                                {address.dispatch_customer_address_address}
                              </p>
                            </div>
                            <div className="col-md-3">
                              <label className="head">
                                {t("Dispatch Customer Country Code")}
                              </label>
                              <p className="Value">
                                {address.dispatch_customer_address_country_code}
                              </p>
                            </div>
                            <div className="col-md-3">
                              <label className="head">
                                {t("Dispatch Customer Country Code")}
                              </label>
                              <p className="Value">
                                {address.dispatch_customer_address_country_code}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
                </div>
              </div>
             
            </>
          )}
        </div>
      </motion.div>
      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        centered
        className="common-model"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("Delete Customer Details")} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("Are you sure you want to delete this Details")} ?
        </Modal.Body>
        <Modal.Footer className="pop-up-modal-footer">
          <div class="btn-wrapper">
            <button className="cx-btn-1" onClick={() => setDeleteModal(false)}>
              {t("Cancel")}
            </button>
            <button
              className="cx-btn-2"
              onClick={() => {
                deleteItem();
                setDeleteModal(false);
              }}
            >
              {t("Yes")}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewDispatch;

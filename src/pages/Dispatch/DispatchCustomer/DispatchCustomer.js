import { React, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { Link, useLocation } from "react-router-dom";
import SideIc from "../../../assets/images/sideBar.svg";
import export_icon from "../../../assets/images/export_icon.svg";
import Delete from "../../../assets/images/delete.svg";
import View from "../../../assets/images/Group.svg";
import EditIc from "../../../assets/images/ic-edit.svg";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
import Pagenation from "../../../sharedComponent/Pagenation";
import { simpleDeleteCall, simpleGetCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import Loader from "../../../sharedComponent/Loader";
import { useEffect } from "react";
import { useRef } from "react";
import { notifySuccess } from "../../../sharedComponent/notify";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import NoDataComp from "../../../sharedComponent/NoDataComp";

const DispatchCustomer = () => {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;

  const {
    sidebar,
    useDebounce,
    loading,
    setLoading,
    customerData,
    recordsPerPage,
  } = useContext(AppContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const { t, i18n } = useTranslation();
  const [deleteModal, setDeleteModal] = useState(false);
  const [dispatchLIst, setDispatchLIst] = useState([]);
  const [last_page, setlast_page] = useState(false);
  const [lastLoad, setlastLoad] = useState(false);
  const [filter, setFilter] = useState({ cust_name: "", cust_code: "" });
  const debouncedSearchTerm = useDebounce(filter, 500);
  const [totalPages, setTotalPages] = useState(0);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8,
  };
  const [page, setPage] = useState(0);
  useEffect(() => {
    getDispatchList(1, "");
  }, [debouncedSearchTerm]);

  const renderTooltipForEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("Edit")}
    </Tooltip>
  );
  const renderTooltipForView = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("View")}
    </Tooltip>
  );
  const renderTooltipForDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("Delete")}
    </Tooltip>
  );

  const deleteItem = () => {
    setLoading(true);
    simpleDeleteCall(ApiConfig.DELETE_DISPATCH_DELETE + selectedItem)
      .then((res) => {
        if (res.result) {
          // setlastLoad(true)
          getDispatchList(1, "delete");
          notifySuccess(res.message);
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
  let marchanRole = customerData.UserRole;
  let UserID = marchanRole === "merchant" ? customerData?.id : null;

  const getDispatchList = (page, current) => {
    setLoading(true);
    simpleGetCall(
      ApiConfig.GET_DISPATCH_LIST +
        page +
        `&dispatch_customer_code=${filter.cust_code}&dispatch_customer_name=${filter.cust_name}&user_id=${UserID}&page_limit=${recordsPerPage}`
    )
      .then((res) => {
        setLoading(false);
        if (res.result) {
          if (current === "delete") {
            setDispatchLIst(res.resultQuery);
            setTotalPages(res.totalPages);
          } else {
            setDispatchLIst([...dispatchLIst, ...res.resultQuery]);
            setTotalPages(res.totalPages);
          }
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
        {loading ? (
          <Loader />
        ) : (
          <>
            <div id="cx-wrapper" className="Dispatch_Customer">
              {/* Top inputs for instatnt search */}

              <div className="displayFlexInp">
                <div className="innerSelectBox weekCounter selectForm form_input_main">
                  <Form.Control
                    required
                    name="Speed_limit"
                    className="innerCust"
                    placeholder={t("Customer Name")}
                    value={filter.cust_name}
                    onChange={(e) => {
                      setFilter({ ...filter, cust_name: e.target.value });
                      setDispatchLIst([]);
                      setPage(0);
                    }}
                  />
                </div>
                <div className="innerSelectBox weekCounter selectForm form_input_main">
                  <Form.Control
                    required
                    type="text"
                    placeholder={t("Customer Code")}
                    className="innerCust"
                    value={filter.cust_code}
                    onChange={(e) => {
                      setFilter({ ...filter, cust_code: e.target.value });
                      setDispatchLIst([]);
                      setPage(0);
                    }}
                  />
                </div>
                <div className="innerSelectBox weekCounter selectForm form_input_main dNo"></div>
                <div className="innerSelectBox weekCounter selectForm form_input_main dNo"></div>
                {userRole === "customer" ||
                (accessRights &&
                  accessRights?.rights_manage_dispatch_customer) ? (
                  <>
                    <div className="innerSelectBox weekCounter selectForm form_input_main">
                      <Link
                        to="/AddDispatchCustomer"
                        className="AddAccidentLink"
                      >
                        <button className="innerCust">
                          + {t("Add Customer")}
                        </button>
                      </Link>
                    </div>
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
                  </>
                ) : null}
              </div>

              {/* Vehicle table */}
              {loading ? (
                <Loader />
              ) : (
                <>
                  <div className="main-master-wrapper ">
                    <div id="scroll_insideThe_Padding_tabel53">
                      <div className="VA_table" style={{ height: 520 }}>
                        <table className="table tableAdmin">
                          <thead className="tableHead">
                            <tr>
                              <th>{t("Sr.no")}</th>
                              <th>{t("Customer Name")}</th>
                              <th>{t("Customer Code")}</th>
                              <th>{t("Customer Email")}</th>
                              <th>{t("Customer Mobile")}</th>
                              <th>{t("Action")}</th>
                            </tr>
                          </thead>

                          <tbody className="tableBody">
                            {dispatchLIst
                              // filter(dis=>{
                              //   if(filter.cust_name.length || filter.cust_code){
                              //     return dis.dispatch_customer_name.toLowerCase().includes(filter.cust_name) || dis.cust_code.toLowerCase().includes(filter.cust_code)
                              //   }else return dis
                              // }).
                              .map((single, index) => {
                                return (
                                  <tr key={"customer" + index}>
                                    <td>{index + 1}</td>
                                    <td>{single.dispatch_customer_name}</td>
                                    <td>{single.dispatch_customer_code}</td>
                                    <td>{single.dispatch_customer_email}</td>
                                    <td>{single.dispatch_customer_mobile}</td>
                                    <td>
                                      <div className="innerFlex d-flex">
                                        {userRole === "customer" ||
                                          (accessRights &&
                                            accessRights?.rights_view_dispatch_customer && (
                                              <OverlayTrigger
                                                placement="bottom"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltipForView}
                                              >
                                                <Link
                                                  to={
                                                    "/ViewDispatch/" +
                                                    single.dispatch_customer_id
                                                  }
                                                >
                                                  <div className="inconsIn me-3">
                                                    <img src={View} alt="" />
                                                  </div>
                                                </Link>
                                              </OverlayTrigger>
                                            ))}
                                        {userRole === "customer" ||
                                        (accessRights &&
                                          accessRights?.rights_manage_dispatch_customer) ? (
                                          <>
                                            <OverlayTrigger
                                              placement="bottom"
                                              delay={{ show: 250, hide: 400 }}
                                              overlay={renderTooltipForEdit}
                                            >
                                              <Link
                                                to={
                                                  "/EditCustomerDispatch/" +
                                                  single.dispatch_customer_id
                                                }
                                              >
                                                <div className="inconsIn me-3">
                                                  <img src={EditIc} alt="" />
                                                </div>
                                              </Link>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                              placement="bottom"
                                              delay={{ show: 250, hide: 400 }}
                                              overlay={renderTooltipForDelete}
                                            >
                                              <Link
                                                to="#"
                                                onClick={() => {
                                                  setSelectedItem(
                                                    single.dispatch_customer_id
                                                  );
                                                  setDeleteModal(true);
                                                }}
                                              >
                                                <div className="inconsIn">
                                                  <img src={Delete} alt="" />
                                                </div>
                                              </Link>
                                            </OverlayTrigger>
                                          </>
                                        ) : null}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        {dispatchLIst.length === 0 && !loading && (
                          <NoDataComp />
                        )}
                      </div>
                    </div>
                    {dispatchLIst?.length > 0 && (
                      <Pagenation
                        length={dispatchLIst?.length}
                        total={dispatchLIst?.length}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </motion.div>

      {/* Delete Modal Start */}
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
            <button
              className="cx-btn-1"
              onClick={() => {
                setDeleteModal(false);
              }}
            >
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
      {/* Delete Modal End */}
    </>
  );
};

export default DispatchCustomer;

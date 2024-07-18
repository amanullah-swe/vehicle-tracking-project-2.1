import { React, useContext, useState } from "react";
// import { AppContext } from "../../../context/AppContext";
import { AppContext } from "../../context/AppContext";
import cart from "../../assets/images/cart.svg";
import noAddon from "../../assets/images/no_addon_icon.svg";
import { Tab, Tabs, Form, Modal } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Cart from "./AddOnSettingsCart";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { simpleGetCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { useEffect } from "react";
import Loader from "../../sharedComponent/Loader";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import { useTranslation } from "react-i18next";
import NoDataComp from "../../sharedComponent/NoDataComp";
import { monthNameDateFormate } from "../../sharedComponent/common";
import { useDispatch } from "react-redux";
import { addonSetting } from "../../store/loginSlice";
import { useSelector } from "react-redux";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const AddOnSettings = () => {
  const { sidebar, setSidebar, Dark, setDark, customerData, socket } =
    useContext(AppContext);
  const dispach = useDispatch();
  let customerId = Number(customerData?.customer_id);
  let accessRights = useSelector((state) => state.auth.accessRights);
  const addonSettingData = useSelector((state) => state.auth.addonModule);
  const userRole = accessRights && accessRights.rights_role;
  const [loading, setLoading] = useState(false);
  const [addOnmyCardList, setAddOnmyCardList] = useState([]);
  const [addOnmyCardListFree, setAddOnmyCardListFree] = useState([]);
  const [addOnmyCardListPremium, setAddOnmyCardListPremium] = useState([]);
  const { t, i18n } = useTranslation();
  const [loader, setLoader] = useState(false);
  const [deletData, setDeletData] = useState({
    is_active: "",
    addon_name: "",
    addon_activity_id: "",
  });
  //data action pop
  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);
  useEffect(() => {
    getAddonmyData();
  }, []);

  const [btnDesable, setBtnDesable] = useState(false);
  const [loaderID, setloaderID] = useState();

  //my addon data
  const getAddonmyData = () => {
    setLoader(true);
    simplePostCall(ApiConfig.GET_ADD_ON_SETINGS)
      .then((res) => {
        setLoader(false);
        if (res.result) {
          let dataRecieve = res.data;
          setAddOnmyCardListPremium(dataRecieve.premiumAddon);
          setAddOnmyCardListFree(dataRecieve.freeAddon);
          setAddOnmyCardList(dataRecieve.myAddon);
          // setAddOnmyCard(res.featureList)
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        // setLoading(false)
      });
  };
  //my addon data
  const getAddonmySettingSave = () => {
    simplePostCall(ApiConfig.GET_ADD_ON_SETINGS_SAVE)
      .then((res) => {
        if (res.result == true) {
          dispach(
            addonSetting({
              addonModule: res.data,
            })
          );
          localStorage.setItem("addonModule", JSON.stringify(res.data));
          // setAddOnmyCard(res.featureList)
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        // setLoading(false)
      });
  };
  const action = () => {
    handleClose2();
    simplePostCall(
      ApiConfig.ACTIVATE_ADD_ON_NEW,
      // value ? ApiConfig.DEACTIVATE_ADD_ON : ApiConfig.ACTIVATE_ADD_ON,
      JSON.stringify(deletData)
    )
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
          getAddonmyData();
          const data = { user_customer_id: customerId };
          socket && socket.emit("addonsAndAccessRight", data);
          getAddonmySettingSave();
        }
      })
      .catch((err) => {
        notifyError(err);
      })
      .finally(() => {
        // setActionLoading(false);
      });
  };

  const actionBtnBUY = (data) => {
    // handleClose2()
    setBtnDesable(true);
    simplePostCall(
      ApiConfig.ADDON_PAYMENET_GATEWAY,
      // value ? ApiConfig.DEACTIVATE_ADD_ON : ApiConfig.ACTIVATE_ADD_ON,
      JSON.stringify(data)
    )
      .then((res) => {
        setBtnDesable(false);
        if (res.result) {
          notifySuccess(res.message);
          getAddonmyData();
          const data = { user_customer_id: customerId };
          socket && socket.emit("addon", data);
          getAddonmySettingSave();
        }
      })
      .catch((err) => {
        notifyError(err);
      })
      .finally(() => {
        // setActionLoading(false);
      });
  };
  const actionTOAddCard = (value, key) => {
    simplePostCall(
      ApiConfig.ADD_ON_ADD_TO_CARD,
      JSON.stringify({
        addon_cart_addon_info_id: value,
        addon_cart_content_type: key,
      })
    )
      .then((res) => {
        if (res.result) {
          notifySuccess(res?.data);
          getAddonmyData();
          // getAddOnBuy()
        }
        notifyError(res.error);
      })
      .catch((err) => {
        notifyError(err);
      })
      .finally(() => {
        // setActionLoading(false)
      });
  };

  const handleCancle = () => {
    notifySuccess(" Action Cancelled Successfully");
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
        {/* Vehicle related Setting */}
        <div id="cx-wrapper" className="Add_on_setting">
          <div className="main-master-wrapper new-scroll">
            {(userRole === "customer" ||
              (accessRights &&
                accessRights?.rights_manage_addon_settings == 1)) && (
              <div className="Heading">
                <p> {t("Web Application Add-ons")}</p>
                <Link to="/AddOnSettingsCart">
                  <button className="cx-btn-3">
                    <img src={cart} alt="" />
                    {t("My Cart")}
                  </button>
                </Link>
              </div>
            )}

            <div
              className="add-on-tabs-wrapper"
              id="scroll_insideThe_Padding83"
            >
              <Tab.Container
                id="left-tabs-example"
                className="aot-tab-wrapper"
                defaultActiveKey="0"
              >
                <Row>
                  <Col sm={12} className="outer-tab-add-on-setting">
                    <Nav variant="pills" className="aot-nav">
                      <Nav.Item className="aot-tab">
                        <Nav.Link
                          className="aot-link"
                          eventKey="0"
                          // onClick={() => getAddOnMy()}
                        >
                          {t("My Add-ons")}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="aot-tab">
                        <Nav.Link
                          className="aot-link"
                          eventKey="1"
                          // onClick={() => getAddOnBuy()}
                        >
                          {t("Premium Add-ons")}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="aot-tab">
                        <Nav.Link
                          className="aot-link"
                          eventKey="2"
                          // onClick={() => getAddOnSettings()}
                        >
                          {t("Free Add-ons")}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={12} className="">
                    {loader ? (
                      <Loader />
                    ) : (
                      <Tab.Content>
                        <Tab.Pane eventKey="0">
                          <div className="add-on-card-wrapper">
                            <div className="row">
                            {
                                addOnmyCardList &&
                                addOnmyCardList?.length > 0 ? (
                                  addOnmyCardList.map((ele, index) => {
                                    return (
                                      <div
                                        className={
                                          sidebar
                                            ? "col-md-6 col-lg-4"
                                            : "col-md-4 col-lg-3"
                                        }
                                        key={"addOnCard" + index}
                                      >
                                        <div className="add-on-card">
                                          <div className="ao-card-header">
                                            <p>{t(ele?.addon_info_name)}</p>
                                            {(userRole === "customer" ||
                                              (accessRights &&
                                                accessRights?.rights_manage_addon_settings ==
                                                  1)) && (
                                              <button
                                                className={
                                                  ele[
                                                    ele.addon_info_addon_column
                                                  ]
                                                    ? "cx-btn-1 00"
                                                    : "cx-btn-2"
                                                }
                                                onClick={() => {
                                                  handleShow2();
                                                  setDeletData({
                                                    addon_activity_id:
                                                      ele?.master_addon_activity
                                                        ?.addon_activity_id,
                                                    is_active: ele[
                                                      ele
                                                        ?.addon_info_addon_column
                                                    ]
                                                      ? 0
                                                      : 1,
                                                    addon_name:
                                                      ele?.addon_info_addon_column,
                                                    addon_activity_addon_name:
                                                      ele?.addon_info_addon_column,
                                                  });
                                                }}
                                              >
                                                {ele[
                                                  ele.addon_info_addon_column
                                                ]
                                                  ? t("Disable")
                                                  : t("Enable")}
                                              </button>
                                            )}
                                          </div>
                                          <div className="ao-card-table-wrapper">
                                            <table className="ao-card-table">
                                              <thead className="ao-card-head">
                                                <tr>
                                                  <th>
                                                   {/*  {t(
                                                      `${
                                                        ele?.addon_pricing_addon_subscription_period ==
                                                        "monthly"
                                                          ? "Monthly"
                                                          : "Annually"
                                                      } Subscription`
                                                    )} */}
                                                    {`${
                                                        ele?.addon_pricing_addon_subscription_period ==
                                                        "monthly"
                                                          ? t("Monthly")
                                                          : t("Annually")
                                                      } ${t("Subscription")} `
                                                    }
                                                  </th>
                                                  <th>{t("Next Renewal")}</th>
                                                </tr>
                                              </thead>
                                              <tbody className="ao-card-body">
                                                <tr>
                                                  {ele?.addon_pricing_addon_subscription_price ==
                                                  0 ? (
                                                    <td>{t("Free")} </td>
                                                  ) : (
                                                    <td>
                                                      {
                                                        ele?.addon_pricing_addon_subscription_price
                                                      }
                                                      {ele?.currency_symbol}
                                                    </td>
                                                  )}
                                                  {/* <td>
                                                  {
                                                    ele?.addon_pricing_addon_price
                                                  }
                                                  {ele?.currency_symbol}
                                                </td> */}
                                                  <td>
                                                    {ele?.addon_activity_activated_on &&
                                                      monthNameDateFormate(
                                                        ele?.addon_activity_activated_on
                                                      )}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <NoDataComp />
                                )
                                // <div className="text-start text-danger">Data Not Found</div>
                              }
                            </div>
                          </div>
                          <div className="bottom-notes-section">
                            <div className="note-left">
                              <p>
                                <span className="red-star">* </span>{" "}
                                {t("Subscription cycle")} - {t("First day of every month")}
                                
                              </p>
                            </div>
                            <div className="total-right">
                              <p>{t("Total monthly Subscription")} - 300$ </p>
                            </div>
                          </div>
                        </Tab.Pane>

                        {/* ======== If Customer Did not have any Addons then Show folloing screen (Start) ======== */}
                        {/* <Tab.Pane eventKey="0">
                      <div className="no-add-on">
                        <img src={noAddon} alt="" />
                        <h2>No Add-ons found...</h2>
                        <div className="new-addon">
                          <Link to="#">Click here</Link>
                          <p>to get new add-ons</p>
                        </div>
                      </div>
                    </Tab.Pane> */}
                        {/* ======== If Customer Did not have any Addons then Show folloing screen (End) ======== */}

                        <Tab.Pane eventKey="1">
                          <div className="add-on-card-wrapper">
                            <div className="row">
                              {addOnmyCardListPremium &&
                              addOnmyCardListPremium.length > 0 ? (
                                addOnmyCardListPremium?.map((ele) => {
                                  return (
                                    <div
                                      className={
                                        sidebar
                                          ? "col-md-6 col-lg-4"
                                          : "col-md-4 col-lg-3"
                                      }
                                    >
                                      <div className="add-on-card">
                                        <div className="ao-card-header">
                                          <p>{t(ele.addon_info_name)}</p>
                                          {(userRole === "customer" ||
                                            (accessRights &&
                                              accessRights?.rights_manage_addon_settings ==
                                                1)) && (
                                            <>
                                              {ele[
                                                ele.addon_info_addon_column
                                              ] == 0 ? (
                                                <button
                                                  className="cx-btn-2"
                                                  onClick={() => {
                                                    setloaderID(
                                                      ele.addon_pricing_addon_info_id
                                                    );
                                                    actionBtnBUY([
                                                      {
                                                        is_active: ele[
                                                          ele
                                                            ?.addon_info_addon_column
                                                        ]
                                                          ? 0
                                                          : 1,

                                                        addon_info_addon_column:
                                                          ele?.addon_info_addon_column,
                                                      },
                                                    ]);
                                                  }}
                                                >
                                                  {btnDesable &&
                                                    ele.addon_pricing_addon_info_id ===
                                                      loaderID && (
                                                      <div
                                                        class="spinner-border cx-btn-load"
                                                        role="status"
                                                      >
                                                        <span class="sr-only">
                                                          {" "}
                                                        </span>
                                                      </div>
                                                    )}
                                                  {t("Buy")}
                                                </button>
                                              ) : (
                                                <button className="cx-btn-1">
                                                  {t("Activated")}
                                                </button>
                                              )}
                                            </>
                                          )}
                                        </div>
                                        <div className="ao-card-table-wrapper">
                                          <table className="ao-card-table">
                                            <thead className="ao-card-head">
                                              <tr>
                                                <th>
                                                  {t(
                                                    `${
                                                      ele?.addon_pricing_addon_subscription_period ==
                                                      "monthly"
                                                        ? "Monthly"
                                                        : "Annually"
                                                    } Subscription`
                                                  )}
                                                </th>
                                                <th>{t("Activation Price")}</th>
                                              </tr>
                                            </thead>
                                            <tbody className="ao-card-body">
                                              <tr>
                                                {ele?.addon_pricing_addon_subscription_price ==
                                                0 ? (
                                                  <td>{t("Free")} </td>
                                                ) : (
                                                  <td>
                                                    {
                                                      ele?.addon_pricing_addon_subscription_price
                                                    }
                                                    {ele?.currency_symbol}
                                                  </td>
                                                )}
                                                {ele?.addon_pricing_addon_price ==
                                                0 ? (
                                                  <td>{t("Free")} </td>
                                                ) : (
                                                  <td>
                                                    {
                                                      ele?.addon_pricing_addon_price
                                                    }
                                                    {ele?.currency_symbol}
                                                  </td>
                                                )}
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                        <div className="ao-card-header">
                                          <p>{t("")}</p>
                                          {!ele?.already_in_cart &&
                                            ele[ele.addon_info_addon_column] ==
                                              0 && (
                                              <button
                                                className="cx-btn-1 00"
                                                onClick={() =>
                                                  actionTOAddCard(
                                                    ele?.addon_pricing_addon_info_id,
                                                    ele?.addon_info_addon_column
                                                  )
                                                }
                                              >
                                                {t("Add to Cart")}
                                              </button>
                                            )}

                                          {/* {ele[ele.addon_info_addon_column] ==
                                            0 && (
                                            <button
                                              className="cx-btn-1 00"
                                              onClick={() =>
                                                actionTOAddCard(
                                                  ele?.addon_pricing_addon_info_id,
                                                  ele?.addon_info_addon_column
                                                )
                                              }
                                            >
                                              {t("added to Card")}
                                            </button>
                                          )} */}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="no-add-on">
                                  <img src={noAddon} alt="" />
                                  <h2>{t("No Add-ons found...")} </h2>
                                  {/* <div className="new-addon">
                                    <Link to="#">Click here</Link>
                                    <p>to get new add-ons</p>
                                  </div> */}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="bottom-notes-section">
                            <div className="note-left">
                              <p>
                                <span className="red-star">* </span>{" "}
                                {t("Subscription cycle")} - {t("First day of every month")} 
                              </p>
                            </div>
                            <div className="total-right">
                              <p> </p>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="2">
                          <div className="add-on-card-wrapper">
                            <div className="row">
                              {
                                addOnmyCardListFree &&
                                addOnmyCardListFree.length > 0 ? (
                                  addOnmyCardListFree.map((ele, index) => {
                                    return (
                                      <div
                                        className={
                                          sidebar
                                            ? "col-md-6 col-lg-4"
                                            : "col-md-4 col-lg-3"
                                        }
                                        key={"index" + index}
                                      >
                                        <div className="add-on-card">
                                          <div className="ao-card-header">
                                            <p>{t(ele?.addon_info_name)}</p>
                                            {(userRole === "customer" ||
                                              (accessRights &&
                                                accessRights?.rights_manage_addon_settings ==
                                                  1)) && (
                                              <button
                                                className={
                                                  ele[
                                                    ele.addon_info_addon_column
                                                  ]
                                                    ? "cx-btn-1 00"
                                                    : "cx-btn-2"
                                                }
                                                onClick={() => {
                                                  // action(ele?.feature);
                                                  // setAddOnSettings([...])
                                                  // setActionBtn(!actionBtn)

                                                  handleShow2();
                                                  setDeletData({
                                                    addon_activity_id:
                                                      ele?.master_addon_activity
                                                        ?.addon_activity_id,
                                                    is_active: ele[
                                                      ele
                                                        ?.addon_info_addon_column
                                                    ]
                                                      ? 0
                                                      : 1,
                                                    addon_name:
                                                      ele?.addon_info_addon_column,
                                                    addon_activity_addon_name:
                                                      ele?.addon_info_addon_column,
                                                  });
                                                }}
                                              >
                                                {ele[
                                                  ele.addon_info_addon_column
                                                ]
                                                  ? t("Disable")
                                                  : t("Enable")}
                                              </button>
                                            )}
                                          </div>
                                          <div className="ao-card-table-wrapper">
                                            <table className="ao-card-table">
                                              <thead className="ao-card-head">
                                                <tr>
                                                  <th>
                                                    {t("Activation Price")}
                                                  </th>
                                                  {/* <th>
                                                  {t(
                                                    "Monthly Subscription Price"
                                                  )}
                                                </th> */}
                                                  <th>
                                                  {t(
                                                      `${
                                                        ele?.addon_pricing_addon_subscription_period ==
                                                        "monthly"
                                                          ? t("Monthly")
                                                          : t("Annually")
                                                      } t("Subscription")`
                                                    )}
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody className="ao-card-body">
                                                <tr>
                                                  <td>{t("Free")} </td>
                                                  <td>{t("Free")} </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <NoDataComp />
                                )

                                // <div className="text-end text-danger">Data Not Found</div>
                              }
                            </div>
                          </div>
                          <div className="bottom-notes-section">
                            <div className="note-left">
                              <p>
                                <span className="red-star">* </span>{" "}
                                {t("Subscription cycle")} -{" "}
                                {t("First day of every month")}
                              </p>
                            </div>
                            <div className="total-right">
                              <p> </p>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    )}
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </div>
          <Modal
            show={show2}
            onHide={handleClose2}
            centered
            className="common-model"
          >
            {/* <Modal.Header closeButton>
              <Modal.Title>{t('Change Feature Status')}</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
              {
                // `Do  you want  to ${
                //   featureActionData.is_active == true ? 'Enable' : 'Disable'
                // } this Feature ?`
                deletData?.is_active
                  ? t("Do you want to Enable This Feature ?")
                  : t("Do you want to Disable This Feature ?")
              }
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer btn-wrapper">
              <button
                className="cx-btn-1"
                onClick={() => {
                  handleCancle();
                  handleClose2();
                  // ActivationCancle();
                }}
              >
                {t("Cancel")}
              </button>
              <button
                className="cx-btn-2"
                onClick={() => {
                  action();
                  // actionBuy(deletData)
                  // vehicletImobilization(imbKeyData);
                }}
              >
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </motion.div>
    </>
  );
};

export default AddOnSettings;

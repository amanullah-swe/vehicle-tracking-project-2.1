import { React, useContext, useEffect, useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import delete_icon from "../../assets/images/delete.svg";
import { Tab, Tabs, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import Loader from "../../sharedComponent/Loader";
import { Data } from "@react-google-maps/api";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const AddOnSettingsCart = () => {
  const { sidebar, setSidebar, Dark, setDark, customerData } =
    useContext(AppContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { t, i18n } = useTranslation();
  const [loader, setLoader] = useState(false);
  const [addOnmyCardList, setAddOnmyCardList] = useState([]);
  const [deletData, setDeletData] = useState({
    addon_cart_addon_info_id:"",
    addon_cart_content_type:""
  });
  const [deleteId, setdeleteId] = useState("")
  useEffect(() => {
    getAddonmyData();
  }, []);
  //my addon data
  const [btnDesable, setBtnDesable] = useState(false);

  const getAddonmyData = () => {
    setLoader(true);
    simplePostCall(ApiConfig.GET_ADD_ON_SETINGS_CARD_LIST,JSON.stringify({}))
      .then((res) => {
        setLoader(false);
        if (res.result===true) {
          let dataRecieve = res.data;
          setAddOnmyCardList(
            dataRecieve
            // .myAddon.map((ele, index) => {
            //   return {
            //     ...ele,
            //     addon_pricing_addon_subscription_price: (
            //       Math.random() * 90 +
            //       10
            //     ).toFixed(2),
            //   };
            // })
          );
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

  const actionDelete = (Data) => {
    handleClose()
    simplePostCall(
      ApiConfig.DELETED_ON_ADD_TO_CARD,
      JSON.stringify(Data)
    )
      .then((res) => {
        if (res.result) {
          notifySuccess(res.message);
          getAddonmyData();
        }
      })
      .catch((err) => {
        notifyError(err);
      })
      .finally(() => {
        // setActionLoading(false);
      });
  };


  const actionBuy = (Data) => {
    // handleClose()
    setBtnDesable(true);
    simplePostCall(
      ApiConfig?.ADDON_PAYMENET_GATEWAY,
      JSON.stringify(Data)
    )
      .then((res) => {
        setBtnDesable(false);
        if (res.result) {
          notifySuccess(res.message);
          getAddonmyData();
        }
      })
      .catch((err) => {
        notifyError(err);
      })
      .finally(() => {
        // setActionLoading(false);
      });
  };
  const handleCancle = () => {
    notifySuccess( t("Action Cancelled Successfully"));
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

        {loader ? (
          <Loader />
        ) : (
          <div id="cx-wrapper" className="AddOn_Settings_Cart">
            <div className="row">
             { addOnmyCardList.length>0?
              <div className="col-lg-8">
                <div className="main-cart-wrapper">
                  <div className="Heading">
                    <p>{t("My Cart")}</p>
                    <p className="cart-count">{addOnmyCardList?.length}</p>
                  </div>
                  <div className="cart-cards-wrapper">
                    {addOnmyCardList && addOnmyCardList ? (
                      addOnmyCardList?.map((ele, index) => {
                        return (
                          <div className="cart-card">
                            <div className="cc-heading">
                              <p>{t(ele?.addon_info_name)}</p>
                              <img
                                src={delete_icon}
                                alt=""
                                onClick={() => {
                                  handleShow();
                                  setdeleteId({
                                    addon_cart_id:ele.addon_cart_id,
                                    addon_cart_content_type:ele?.addon_info_addon_column
                                  })
                                  setDeletData(
                                  {  addon_cart_addon_info_id:ele?.addon_pricing_addon_info_id,
                                    addon_cart_content_type:ele?.addon_info_addon_column}
                                  );
                                }}
                              />
                            </div>
                            <div className="cc-body">
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
                                        <td>Free</td>
                                      ) : (
                                        <td>
                                          {
                                            ele?.addon_pricing_addon_subscription_price
                                          }
                                          {ele?.currency_symbol}
                                        </td>
                                      )}
                                      {ele?.addon_pricing_addon_price == 0 ? (
                                        <td>Free</td>
                                      ) : (
                                        <td>
                                          {ele?.addon_pricing_addon_price}
                                          {ele?.currency_symbol}
                                        </td>
                                      )}
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="cart-bottom-section">
                        <p>+ {t("Add more add-ons")} ?</p>
                        <Link to="/AddOnSettings">{t("Click here")}...</Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>:   
                // <div className="cart-bottom-section">
                //         <p>+ {t("Add more add-ons")} ?</p>
                //         <Link to="/AddOnSettings">{t("Click here")}...</Link>
                //       </div>

                <div className="col-lg-12">
                <div className="main-cart-wrapper">
                  <div className="Heading">
                    <p>{t("My Cart")}</p>
                    {/* <p className="cart-count">{addOnmyCardList?.length}</p> */}
                  </div>
                  <div className="cart-cards-wrapper">
                    {/* {addOnmyCardList && addOnmyCardList ? (
                      addOnmyCardList.map((ele, index) => {
                        return (
                          <div className="cart-card">
                            <div className="cc-heading">
                              <p>{t(ele?.addon_info_name)}</p>
                              <img
                                src={delete_icon}
                                alt=""
                                onClick={() => {
                                  handleShow();
                                  setdeleteId({
                                    addon_cart_id:ele.addon_cart_id
                                  })
                                  setDeletData(
                                  {  addon_cart_addon_info_id:ele?.addon_pricing_addon_info_id,
                                    addon_cart_content_type:ele?.addon_info_addon_column}
                                  );
                                }}
                              />
                            </div>
                            <div className="cc-body">
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
                                        <td>Free</td>
                                      ) : (
                                        <td>
                                          {
                                            ele?.addon_pricing_addon_subscription_price
                                          }
                                          {ele?.currency_symbol}
                                        </td>
                                      )}
                                      {ele?.addon_pricing_addon_price == 0 ? (
                                        <td>Free</td>
                                      ) : (
                                        <td>
                                          {ele?.addon_pricing_addon_price}
                                          {ele?.currency_symbol}
                                        </td>
                                      )}
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="cart-bottom-section">
                        <p>+ {t("Add more add-ons")} ?</p>
                        <Link to="/AddOnSettings">{t("Click here")}...</Link>
                      </div>
                    )} */}
                     <div className="cart-bottom-section">
                        <p>+ {t("Add more add-ons")} ?</p>
                        <Link to="/AddOnSettings">{t("Click here")}...</Link>
                      </div>
                  </div>
                </div>
              </div>
                      }

             {  addOnmyCardList.length>0&& <div className="col-lg-4">
                <div className="main-summary-wrapper">
                  <div className="order-summary">
                    <div className="Heading">
                      <p>{t("Order Summary")}</p>
                    </div>
                    <div className="order-table-wrapper">
                      <table className="order-table">
                        {addOnmyCardList.length>0 &&
                          addOnmyCardList.map((ele, index) => {
                            return (
                              <>
                                <thead>
                                  <tr>
                                    <th>{t(ele?.addon_info_name)}</th>
                                    {ele?.addon_pricing_addon_subscription_price ==
                                    0 ? (
                                      <th>Free</th>
                                    ) : (
                                      <th>
                                        {
                                          ele?.addon_pricing_addon_subscription_price
                                        }
                                        {ele?.currency_symbol}
                                      </th>
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      Activation fees -{" "}
                                      {ele?.addon_pricing_addon_price == 0 ? (
                                        "Free"
                                      ) : (
                                        <>
                                          {" "}
                                          {ele?.addon_pricing_addon_price}
                                          {ele?.currency_symbol}{" "}
                                        </>
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </>
                            );
                          })}
                      </table>
                    </div>

                <div className="order-total">
                      <p>{t("Total")}</p>
                      <p>
                        {addOnmyCardList
                          ?.reduce((total, item) => {
                            const subscriptionPrice =
                              parseFloat(
                                item["addon_pricing_addon_subscription_price"]
                              ) || 0;
                            return total + subscriptionPrice;
                          }, 0)
                          .toFixed(2)}
                      </p>
                    </div>
                    <div className="cx-btn-2" onClick={()=>{
                      actionBuy(addOnmyCardList)
                    }}>    {  btnDesable&&      <div
                      class="spinner-border cx-btn-load"
                      role="status"
                     
                    >
                      <span class="sr-only"> </span>
                    </div>}{t("Checkout Now")}</div>
                  </div>
              { addOnmyCardList.length>0&&   <div className="subscription-summary">
                    <div className="order-summary">
                      <div className="Heading">
                        <p>{t("Expected Monthly Subscription")}</p>
                      </div>
                      <div className="order-table-wrapper">
                        <table className="order-table">
                          {addOnmyCardList &&
                            addOnmyCardList.map((ele, index) => {
                              return (
                                <>
                                  <thead>
                                    <tr>
                                      <th>{t(ele?.addon_info_name)}</th>
                                      {ele?.addon_pricing_addon_subscription_price ==
                                      0 ? (
                                        <th>Free</th>
                                      ) : (
                                        <th>
                                          {
                                            ele?.addon_pricing_addon_subscription_price
                                          }
                                          {ele?.currency_symbol}
                                        </th>
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        Activation fees -{" "}
                                        {ele?.addon_pricing_addon_price == 0 ? (
                                          "Free"
                                        ) : (
                                          <>
                                            {" "}
                                            {ele?.addon_pricing_addon_price}
                                            {ele?.currency_symbol}{" "}
                                          </>
                                        )}
                                      </td>
                                    </tr>
                                  </tbody>
                                </>
                              );
                            })}
                        </table>
                      </div>
                      <div className="order-total">
                        <p>{t("Total")}</p>
                        <p>
                          {addOnmyCardList
                            ?.reduce((total, item) => {
                              const subscriptionPrice =
                                parseFloat(
                                  item["addon_pricing_addon_subscription_price"]
                                ) || 0;
                              return total + subscriptionPrice;
                            }, 0)
                            ?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>}
                </div>
              </div>}
       {   addOnmyCardList.length>0&&     <div className="col-lg-4">
              </div>}
            </div>
          </div>
        )}
        {/* Delete Modal Start */}
        <Modal
          show={show}
          onHide={handleClose}
          centered
          className="common-model"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("Delete Add-on")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {t("Are you sure you want to delete this add-on from your card?")} ?
          </Modal.Body>
          <Modal.Footer className="pop-up-modal-footer">
            <div class="btn-wrapper">
              <button
                className="cx-btn-1"
                onClick={() => {
                  handleClose();
                  handleCancle();
                }}
              >
                {t("Cancel")}
              </button>
              <button
                className="cx-btn-2"
                onClick={() => {
                  actionDelete(deleteId);
                }}
              >
                {t("Yes")}
              </button>
            </div>
          </Modal.Footer>
        </Modal>
        {/* Delete Modal End */}
      </motion.div>
    </>
  );
};

export default AddOnSettingsCart;

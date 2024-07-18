import { React, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import profile from "../../../assets/images/Customer-profile.png";
import option from "../../../assets/images/option-three-dot.svg";
import GreenIcon from "../../../assets/images/Green-check.svg";
import Warehouser_icon from "../../../assets/images/Warehouser_icon.svg";
import { motion } from "framer-motion";
import { Dropdown, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import MapComponent from "../../../sharedComponent/MapComponent";
import { simplePostCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { useEffect } from "react";
import Loader from "../../../sharedComponent/Loader";
import { useTranslation } from "react-i18next";
import ImportUser from "../../../assets/images/imagesuser.png";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const ViewMerchant = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [selWareHouse, setSelWareHouse] = useState();
  const { t, i18n } = useTranslation();

  const { sidebar, setSidebar, Dark, setDark, loading, setLoading } =
    useContext(AppContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [merchentDetails, setMerchentDetails] = useState({});


  useEffect(() => {
    if (id) {
      getMerchentDetails();
    }
  }, [id]);
  const getMerchentDetails = () => {
    setLoading(true);
    let body = JSON.stringify({ vendor_id: id });
    simplePostCall(ApiConfig.VIEW_MERCHENT, body)
      .then((res) => {
        if (res.result) {
          setMerchentDetails(res.data);
        }
      })
      .catch((err) => {
        console.log("err", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
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
          <div id="cx-wrapper">
            <div
              className="main-dashboard-wrapper CustomerProfile"
              id="viewAdministratorProfile"
            >
              <div className="CustomerProfile-head">
                <div className="porile-img">
                  {/* <img src={profile} alt="porfile" />
                   */}

                  {merchentDetails.profilePic === "" ||
                  merchentDetails.profilePic === null ||
                  merchentDetails.profilePic === "undefined" ? (
                    <img src={ImportUser} alt="" className="custom-Margin" />
                  ) : (
                    <img
                      src={
                     
                        merchentDetails.profilePic
                      }
                      onError={(ev) => {
                        handleErrorImage(ev);
                      }}
                      alt=""
                      className="custom-Margin"
                    />
                  )}
                </div>
                {/* <div className="customer-option">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <img src={option} alt="" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to={"/EditMerchant/" + id}>{t("Edit")}</Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link onClick={handleShow}>{t("Delete")}</Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div> */}
              </div>
              <div className="information-card">
                <div className="information-head">
                  <div className="imformation-heading">
                    <p>{t("Merchant Information")}</p>
                  </div>
                </div>
                <div className="information-contain row">
                  <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                    <p className="discription-heading">{t("Merchant Name")}</p>
                    <p className="discription-contain">
                      {merchentDetails?.vendor_name}
                    </p>
                  </div>
                  <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                    <p className="discription-heading">{t("Merchant ID")}</p>
                    <p className="discription-contain">
                      {merchentDetails?.vendor_id}
                    </p>
                  </div>
                  <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                    <p className="discription-heading">
                      {t("Contact Person Name")}
                    </p>
                    <p className="discription-contain">
                      {merchentDetails?.contact_person_name}
                    </p>
                  </div> 
                  <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                    <p className="discription-heading">
                      {t("GST Number")}
                    </p>
                    <p className="discription-contain">
                      {merchentDetails?.master_vendor_gst}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="heading_warehoues">{t("Warehouse Details")}</div>
            <div className="warehouse_Listing">
              <div className="row">
                <div className="list_wrapper col-lg-6">
                  {merchentDetails?.warehouse &&
                    merchentDetails?.warehouse.map((single, index) => {              
                     return (
                        <div
                          key={"warehouse" + index}
                          className={
                            selWareHouse &&
                            selWareHouse.vendor_warehouse_id ===
                              single.vendor_warehouse_id
                              ? "Single_listing_active"
                              : "Single_listing"
                          }
                        >
                          <div
                            className="row"
                            onClick={() => {
                              setSelWareHouse(single);
                            }}
                          >
                            <div className=" col-lg-3 col-md-4 col-sm-6">
                              <p className="warehoue-heading">
                                {t("Warehouse Name")}
                              </p>
                              <p className="warehoue-contain">
                                {single.vendor_warehouse_name}
                              </p>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                              <p className="warehoue-heading">
                                {t("Warehouse ID")}
                              </p>
                              <p className="warehoue-contain">
                                {single.vendor_warehouse_id}
                              </p>
                            </div>
                            <div className=" col-lg-6 col-md-4 col-sm-6">
                              <p className="warehoue-heading">{t("Address")}</p>
                              <p className="warehoue-contain">
                                {single.vendor_warehouse_address}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="col-lg-6">
                  <div className=" viewmerchant m-0 p-0">
                    {/* <div className="custom-tooltip">
                                        <div className="box">
                                            <p>Warehouse Name</p>
                                        </div>
                                        <img src={Warehouser_icon} alt="" />
                                    </div> */}
                    <div className="map_main_warehouse">
                      <MapComponent
                        componentId={"ViewMerchant"}
                        warehouse={merchentDetails.warehouse}
                        selWareHouse={selWareHouse}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
      <Modal show={show} onHide={handleClose} centered className="common-model">
        <Modal.Header closeButton>
          <Modal.Title>{t("Delete")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("Are you sure you want to delete this Merchant")}?
        </Modal.Body>
        <Modal.Footer className="pop-up-modal-footer">
          <button className="cx-btn-1" onClick={handleClose}>
            {t("Close")}
          </button>
          <button className="cx-btn-2" onClick={handleClose}>
            {t("Yes")}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewMerchant;

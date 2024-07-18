import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import profile from "../../../assets/images/Customer-profile.png";
import GreenIcon from "../../../assets/images/Green-check.svg";
import { Dropdown, Modal } from "react-bootstrap";
import option from "../../../assets/images/option-three-dot.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { simplePostCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import { DateDDMMYYYY } from "../../../sharedComponent/common";
import Loader from "../../../sharedComponent/Loader";
import ImportUser from "../../../assets/images/imagesuser.png";
import { useTranslation } from "react-i18next";
import CrossBtn from "../../../assets/images/Creoss_Red.svg"
const ViewDynamic = () => {
  const { sidebar, UserRoleRoute, Dark, UserRole } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [TransportId, setTransportId] = useState("");
  const [TransportBlock, setTransportBlock] = useState("");

  const [show, setShow] = useState(false);
  const [showblock, setShowblock] = useState(false);
  const [showresign, setShowresign] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseBlock = () => setShowblock(false);
  const handleShowblock = () => setShowblock(true);
  const handleCloseresign = () => setShowresign(false);
  const handleShowresign = () => setShowresign(true);
  const [TransportDetails, setTransportDetails] = useState([]);

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const params = useParams();
  let UserId = params.id;

  useEffect(() => {
    if (UserId) {
      geTransportmanagerDetails();
    }
  }, []);
  const geTransportmanagerDetails = () => {
    setLoading(true);
    let newRequestBody = JSON.stringify({
      user_id: UserId.toString(),
      user_role: UserRole
    });
    simplePostCall(ApiConfig.USER_PROFILE, newRequestBody)
      .then((res) => {
        setTransportDetails(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  function handalResign() {
    if (TransportId === "active") {
      userResign()
    } else {
      userUnResign()
    }

  }

  function handalBlock() {
    if (TransportBlock === "active") {
      userBlock()
    } else {
      userUnBlock()
    }

  }



  function userBlock() {
    let newRequestBody = JSON.stringify({
      user_id: UserId,
      user_role: UserRole

    });

    simplePostCall(ApiConfig.USER_ROLE_BLOCK, newRequestBody)
      .then((data) => {
        if (data.result) {

          notifySuccess(data.message);
          handleClose();
          navigate(`${UserRoleRoute}`);


        } else {
          notifyError(data.message);

        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  function userUnBlock() {
    let newRequestBody = JSON.stringify({
      user_id: UserId,
      user_role: UserRole

    });
    simplePostCall(ApiConfig.USER_ROLE_UNBLOCK, newRequestBody)
      .then((data) => {
        if (data.result) {

          notifySuccess(data.message);
          handleClose();
          navigate(`${UserRoleRoute}`);


        } else {
          notifyError(data.message);

        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }






  function userResign() {
    let newRequestBody = JSON.stringify({
      user_id: UserId,
      user_role: UserRole

    });

    simplePostCall(ApiConfig.USER_ROLE_RESING, newRequestBody)
      .then((data) => {
        if (data.result) {

          notifySuccess(data.message);
          handleClose();
          navigate(`${UserRoleRoute}`);

        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  function userUnResign() {
    let newRequestBody = JSON.stringify({
      user_id: UserId,
      user_role: UserRole

    });

    simplePostCall(ApiConfig.USER_ROLE_UNRESING, newRequestBody)
      .then((data) => {
        if (data.result) {
          notifySuccess(data.message);
          handleClose();
          navigate(`${UserRoleRoute}`);


        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
            {TransportDetails && TransportDetails.length > 0 ? (
              TransportDetails.map((itemlist, index) => {
                return (
                  <div id="cx-wrapper">
                    <div
                      className="main-dashboard-wrapper CustomerProfile"
                      id="viewAdministratorProfile"
                    >
                      <div className="CustomerProfile-head">
                        <div className="porile-img">
                          {itemlist.user_profile_pic === "" ||
                            itemlist.user_profile_pic === null ? (
                            <img src={ImportUser} alt="porfile" />
                          ) : (
                            <img
                              src={

                                itemlist.user_profile_pic
                              }
                              onError={(ev) => {
                                handleErrorImage(ev);
                              }}
                              alt="porfile"
                            />
                          )}
                        </div>
                        <div className="customer-option">
                          <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                              <img src={option} alt="" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <Link
                                  to={"/AddDynamicUser/" + UserId}
                                  className="d-block"
                                >
                                  {t("Edit")}
                                </Link>
                              </Dropdown.Item>


                              <Dropdown.Item>
                                <Link
                                  to={"/DynamicPassword/" + UserId}
                                  className="d-block"
                                >
                                  {t("Change Password")}
                                </Link>
                              </Dropdown.Item>
                              {itemlist.user_status === "active" ?
                                <>
                                  <Dropdown.Item
                                    href="#"

                                    onClick={() => {
                                      handleShowblock()
                                      setTransportBlock(
                                        itemlist.user_status
                                      );
                                    }}
                                    className="d-block"
                                  >
                                    <Link to="#" className="d-block">
                                      {t("block")}
                                    </Link>
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#"
                                    onClick={() => {
                                      handleShowresign()
                                      setTransportId(
                                        itemlist.user_status
                                      );
                                    }}

                                    className="d-block"
                                  >
                                    <Link to="#" className="d-block">
                                      {t("Resign")}
                                    </Link>
                                  </Dropdown.Item>
                                </>
                                :
                                <>
                                  {itemlist.user_status === "inactive" ? <Dropdown.Item
                                    href="#"

                                    onClick={() => {
                                      handleShowblock()
                                      setTransportBlock(
                                        itemlist.user_status
                                      );
                                    }}
                                    className="d-block"
                                  >
                                    <Link to="#" className="d-block">
                                      {t("Unblock")}
                                    </Link>
                                  </Dropdown.Item> : <></>}
                                  {itemlist.user_status === "inactive" ? <></> :
                                    <Dropdown.Item
                                      href="#"
                                      onClick={() => {
                                        handleShowresign()
                                        setTransportId(
                                          itemlist.user_status
                                        );
                                      }}

                                      className="d-block"
                                    >
                                      <Link to="#" className="d-block">
                                        {t("UnResign")}
                                      </Link>
                                    </Dropdown.Item>}
                                </>
                              }


                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      <div className="information-card">
                        <div className="information-head">
                          <div className="imformation-heading">
                            <p>{t("Contact Information")}</p>
                          </div>
                        </div>
                        <div className="information-contain row">
                          <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                            <p className="discription-heading">{t("Name")}</p>
                            <p className="discription-contain">
                              {itemlist?.user_name}
                            </p>
                          </div>
                          <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                            <p className="discription-heading">
                              {t("Mobile Number")}
                            </p>
                            <p className="discription-contain">
                              {itemlist?.user_mobile}
                            </p>
                          </div>
                          <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                            <p className="discription-heading">{t("Email")}</p>
                            <p className="discription-contain">
                              {itemlist?.user_email}{" "}
                              <img src={itemlist?.user_email_verification == "yes" ? GreenIcon : CrossBtn} alt="" />{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="information-card">
                        <div className="information-head">
                          <div className="imformation-heading">
                            <p>{t("General Information")}</p>
                          </div>
                        </div>
                        <div className="information-contain row">
                          <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main">
                            <p className="discription-heading">
                              {t("Address")}
                            </p>
                            <p className="discription-contain">
                              {itemlist?.user_address}
                            </p>
                          </div>
                          <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                            <p className="discription-heading">{t("City")}</p>
                            <p className="discription-contain">
                              {itemlist?.user_city}{" "}
                            </p>
                          </div>
                          <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                            <p className="discription-heading">
                              {t("Nationality")}
                            </p>
                            <p className="discription-contain">
                              {itemlist?.user_nationality}
                            </p>
                          </div>
                          <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                            <p className="discription-heading">
                              {t("Date Of Birth")}
                            </p>
                            <p className="discription-contain">
                              {itemlist.user_dob ? DateDDMMYYYY(itemlist.user_dob) : ""}
                            </p>
                          </div>
                          <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                            <p className="discription-heading">
                              {t("Joining Date")}
                            </p>
                            <p className="discription-contain">
                              {itemlist.user_joining_date ? DateDDMMYYYY(itemlist.user_joining_date) : ""}
                            </p>
                          </div>
                          <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                            <p className="discription-heading">{t("Gender")}</p>
                            <p className="discription-contain">
                              {itemlist.user_gender == "M" ? "Male" : itemlist.user_gender == "F" ? "Female" : "Other"}
                            </p>
                          </div>
                          <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                            <p className="discription-heading">
                              {t("Employee Code")}.
                            </p>
                            <p className="discription-contain">
                              {itemlist.user_internal_no}
                            </p>
                          </div>
                          <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6">
                            <p className="discription-heading">{t("Status")}</p>
                            <p className="discription-contain">
                              {itemlist.user_status}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* resign Modal Start */}
                    <Modal
                      show={showresign}
                      onHide={handleCloseresign}
                      centered
                      className="common-model"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          {t("Resign Transport Manager")}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>

                        Are you sure you want to  {TransportId === "active" ? "Resign" : "UnResign"} this Transport Manager


                      </Modal.Body>
                      <Modal.Footer className="pop-up-modal-footer">
                        <div class="btn-wrapper">
                          <button
                            className="cx-btn-1"
                            onClick={handleCloseresign}
                          >
                            {t("Cancel")}
                          </button>
                          <button className="cx-btn-2" onClick={handalResign}>
                            {t("Yes")}
                          </button>
                        </div>
                      </Modal.Footer>
                    </Modal>
                    {/* resign Modal End */}

                    {/* Block Modal Start */}
                    <Modal
                      show={showblock}
                      onHide={handleCloseBlock}
                      centered
                      className="common-model"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          {t("Block Transport Manager")}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>

                        Are you sure you want to {TransportBlock === "active" ? "Block" : "UnBlock"}  this Transport Manager

                      </Modal.Body>
                      <Modal.Footer className="pop-up-modal-footer">
                        <div class="btn-wrapper">
                          <button
                            className="cx-btn-1"
                            onClick={handleCloseBlock}
                          >
                            {t("Cancel")}
                          </button>
                          <button className="cx-btn-2" onClick={handalBlock}>
                            {t("Yes")}
                          </button>
                        </div>
                      </Modal.Footer>
                    </Modal>
                    {/* Block Modal End */}
                  </div>
                );
              })
            ) : (
              <div>
                <p
                  style={{
                    fontSize: "20px",
                    marginTop: "200px",
                  }}
                  className=" text-center justify-content-center align-items-center"
                >
                  {t("No data")}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </>
  );
};

export default ViewDynamic;

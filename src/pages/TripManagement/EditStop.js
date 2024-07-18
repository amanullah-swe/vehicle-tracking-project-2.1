import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
import MapComponent from "../../sharedComponent/MapComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import Loader from "../../sharedComponent/Loader";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import { useTranslation } from "react-i18next";

const EditStop = () => {
  const { sidebar, setLoading, setRegionCord, loading } = useContext(AppContext);
  const navigate=useNavigate()
    
  const [validated, setValidated] = useState(false);
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [stopDetails, setStopDetails] = useState({
    isPOI:"yes"
  });
 const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  const handleClick2 = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (id) {
      getStopDetails();
    }
  }, [id]);
  useEffect(() => {
    if (stopDetails.pickup_point_latitude && stopDetails.pickup_point_longitude)
      setRegionCord([
        Number(stopDetails.pickup_point_latitude),
        Number(stopDetails.pickup_point_longitude),
      ]);
  }, [stopDetails]);

  const getStopDetails = () => {
    setLoading(true);
    let body = JSON.stringify({ pickup_point_id: id });
   simplePostCall(ApiConfig.GET_STOP_DETAILS, body)
      .then((res) => {
        if (res.result) {
          setStopDetails({...res.data, isPOI:"yes"});
          setRegionCord([
            Number(res.data.pickup_point_latitude),
            Number(res.data.pickup_point_longitude),
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setLoading(true);
      let body = JSON.stringify(stopDetails);
      simplePostCall(ApiConfig.UPDATE_STOP, body)
        .then((res) => {
          if (res.result) {
            navigate("/TripManagement")
            notifySuccess(res.message);
          } else {
            notifyError(res.message);
          }
        })
        .catch((err) => {
          console.log("err", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    setValidated(true);
  };
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  return (
    <motion.div
      className={sidebar ? "taskMain " : "cx-active taskMain"}
      id="cx-main"
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}
    >
      <div id="cx-wrapper">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="main-master-wrapper CustomerProfile">
              <div className="Heading">
                <p>{t("Edit Stop")}</p>
              </div>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="information-card row">
                  <div className="col-md-6 mb-4">
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <Form.Label className="common-labels">
                          {t("Trip")} <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          placeholder={t("Trip name...")}
                          value={stopDetails.trip_name}
                        disabled
                        />
                        <Form.Control.Feedback type="invalid">
                        {t("Please Enter Trip Name")}  
                        </Form.Control.Feedback>
                      </div>
                      <div className="col-md-12 mb-4">
                        <Form.Label className="common-labels">
                          {t("Stop Name")} <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          placeholder={t("Stop Name...")}
                          value={stopDetails.pickup_point_name}
                          onChange={(e) => {
                            setStopDetails({
                              ...stopDetails,
                              pickup_point_name: e.target.value,
                            });
                          }}
                        />

                        <Form.Control.Feedback type="invalid">
                       {t("Please Enter name")}   
                        </Form.Control.Feedback>
                      </div>
                      <div className="col-md-12 mb-4">
                        <Form.Label className="common-labels">
                          {t("Stop Code")} <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder={t("Enter Stop Code...")}
                          value={stopDetails.pickup_point_code}
                          onChange={(e) => {
                            setStopDetails({
                              ...stopDetails,
                              pickup_point_code: e.target.value,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                        {t("Please Enter Your First Name.")}  
                        </Form.Control.Feedback>
                      </div>
                      <div className="col-md-12 mb-4">
                        <Form.Label className="common-labels">
                          {t("Stop Latitude")} <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder={t("Enter Stop Latitude...")}
                          value={stopDetails?.pickup_point_latitude}
                  
                          onChange={(e) => {
                            setStopDetails({
                              ...stopDetails,
                              pickup_point_latitude: e.target.value,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                         {t("Please Enter Stop Latitude.")} 
                        </Form.Control.Feedback>
                      </div>
                      <div className="col-md-12 mb-4">
                        <Form.Label className="common-labels">
                          {t("Stop Longitude")} <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder={t("Enter Stop Longitude...")}
                          value={stopDetails.pickup_point_longitude}
                         
                          onChange={(e) => {
                            setStopDetails({
                              ...stopDetails,
                              pickup_point_longitude: e.target.value,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                        {t("Please Enter Stop Longitude.")}  
                        </Form.Control.Feedback>
                      </div>
                      <div className="col-md-12 mb-4">
                    <Form.Label className="label-with-radio">
                      <span className="common-labels">
                        {t("Add to Point of Interest")} ?
                      </span>
                      <div id="customRadios">
                        <div class="form-check greenFlex me-2">
                          <input class="form-check-input" type="radio" name="flexRadioDefault1" id="Yes"
                          onChange={(e)=>{
                            setStopDetails({...stopDetails,isPOI:"yes"})
                          }}
                          checked={stopDetails.isPOI=="yes"?true:false}
                          />
                          <label class="form-check-label custLabel" for="Yes">
                            {t("Yes")}
                          </label>
                        </div>
                        <div class="form-check  greenFlex">
                          <input class="form-check-input" type="radio" name="flexRadioDefault1" id="No"
                               onChange={(e)=>{
                                setStopDetails({...stopDetails,isPOI:"no"})
                              }}
                              checked={stopDetails.isPOI=="no"?true:false}
                          />
                          <label class="form-check-label custLabel" for="No">
                            {t("No")}
                          </label>
                        </div>
                      </div>
                    </Form.Label>
                  </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="transportMap stopmap">
                      {/* <p className="stop-note">
                        {t("Note")} : {t("Click on map for adding new stop")}.
                      </p> */}
                      <div className="custom-map-height">
                        <MapComponent
                          editStop={true}
                          stopDetails={stopDetails}
                          setStopDetails={setStopDetails}
                          // pickup_point_name={stopDetails?.pickup_point_name}
                          componentId={"AddStop"}
                          // position={{
                          //   pickup_point_latitude:
                          //    Number( stopDetails?.pickup_point_latitude),
                          //   pickup_point_longitude:
                          //     Number(stopDetails?.pickup_point_longitude),
                          // }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="btn-wrapper">
                  <button type="" class="cx-btn-1" onClick={getStopDetails}>
                    {t("Cancel")}
                  </button>
                  <button type="submit" class="cx-btn-2">
                    {t("Update")}
                  </button>
                </div>
              </Form>
            </div>
            {/* <div className="main-master-wrapper mt-3">
          <div className="Heading">
            <p>{t("Stop List")}</p>
          </div>
          <table className="holiday-table">
            <thead className="ht-head">
              <tr>
                <td>{t("Sr.No.")}</td>
                <td>{t("Stop Name")}</td>
                <td>{t("Stop Code")}</td>
                <td>{t("POI")}</td>
                <td>{t("Geofence Area")}</td>
                <td>{t("Priority")}</td>
                <td>{t("Action")}</td>
              </tr>
            </thead>
            <tbody className="ht-body">
              <tr className="table-row-custom">
                <td>1</td>
                <td>Kolhapur</td>
                <td>Kolhapur</td>
                <td>Yes</td>
                <td>Kolhapur City</td>
                <td>1</td>
                <td>
                  <Link to="/EditStop">
                    <img src={edit_icon} alt="" />
                  </Link>
                  <Link to="#" onClick={handleShow}>
                    <img src={delete_icon} alt="" />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
          </>
        )}
      </div>
      {/* Delete Trip Modal Start */}

      <Modal show={show} onHide={handleClose} centered className="common-model">
        <Modal.Header closeButton>
          <Modal.Title>{t("Delete Stop")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("Are you sure you want to delete this Stop")} ?
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

      {/* Delete Trip Modal End */}
    </motion.div>
  );
};

export default EditStop;

import React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import profile from "../../assets/images/profile.png";
import Resolve from "../../assets/images/Resolve.svg";
import Reject from "../../assets/images/Reject.svg";
import On_Hold from "../../assets/images/On_Hold.svg";
import option from "../../assets/images/optionDot.svg";
import MapUplode from "../../assets/images/MapUplode.svg";
import CrossAroww from "../../assets/images/CrossAroww.svg";
import dot from "../../assets/images/Dot.svg";
import { Dropdown, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const ViewReport = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);

  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const [resolve, setResolve] = useState(false);
  const [onhold, setOnhold] = useState(false);
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
      <div className="main-master-wrapper" id="View_report_main">
        <div className="head">
          <div className="left">
            <img src={profile} alt="" className="Profile_imfg" />
            <div className="contain">
              <div className="heading">
                <p>
                  Want to change the driver setting but unable to change it.
                </p>
                <div className="labels">
                  <img src={Resolve} alt="" />
                  <img src={Reject} alt="" />
                  <img src={On_Hold} alt="" />
                </div>
              </div>
              <div className="reported_person">
                <p>
                  <span>John Doe</span> reported the issue.
                </p>
                <img src={dot} alt="" />
                <p>
                  Priority- <span>High</span>
                </p>
              </div>
              <div className="reportLocation">
                <p className="path">Master Data</p>
                <p className="path">Vehicles</p>
                <p className="path">Vehicles Group</p>
                <p className="path">MH-12-5022</p>
              </div>
            </div>
          </div>
          <div className="right">
            <p className="date">02-03-2023, 05:45PM</p>
            <div className="customer-option custom_report">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <img src={option} alt="" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <p className="markAs">Mark as</p>
                  <Dropdown.Item
                    onClick={() => {
                      setOnhold(true);
                    }}
                  >
                    <Link to="#">On Hold</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="#"> Rejected</Link>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setResolve(true);
                    }}
                  >
                    <Link to="#"> Resolved</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="report_message">
          <p>
            Hi,
            <br />
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
            <br />
            <br />
            <br />
            Thanks
          </p>
        </div>
        <div className="Attachments">
          <div className="heading">Attachments</div>
          <div className="files">
            <div className="single_file">
              <img src={MapUplode} alt="" />
              <img src={CrossAroww} alt="" className="cross" />
            </div>
            <div className="single_file">
              <img src={MapUplode} alt="" />
              <img src={CrossAroww} alt="" className="cross" />
            </div>
            <div className="single_file">
              <img src={MapUplode} alt="" />
              <img src={CrossAroww} alt="" className="cross" />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center btn-wrapper btn_report_view">
          <button className="cx-btn-1">
            <Link to="#">Cancel</Link>
          </button>
          <button className="cx-btn-2">
            <Link to="#">Save</Link>
          </button>
        </div>

        {/* Modal Token Rejected */}
        <Modal
          Modal
          show={resolve}
          onHide={() => {
            setResolve(false);
          }}
          centered
          size="md"
          className="common-model"
        >
          <Modal.Header closeButton>
            <p className="modal-title">Token Rejected</p>
          </Modal.Header>
          <Modal.Body className="pb-0">
            <p>Why are you rejecting this token request ?</p>
            <div className="col-lg-12 col-md-12 col-sm-12 form_input_main">
              <Form.Control
                as="textarea"
                rows={8}
                placeholder="Please describe your reason for rejection..."
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="pe-0 pb-0">
            <div className="d-flex justify-content-end align-items-center btn-wrapper btn_report_view">
              <button
                className="cx-btn-1"
                onClick={() => {
                  setResolve(false);
                }}
              >
                <Link to="#">Cancel</Link>
              </button>
              <button
                className="cx-btn-2"
                onClick={() => {
                  setResolve(false);
                }}
              >
                <Link to="#">Submit</Link>
              </button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Modal on_Hold */}
        <Modal
          Modal
          show={onhold}
          onHide={() => {
            setOnhold(false);
          }}
          centered
          size="md"
          className="common-model"
        >
          <Modal.Header closeButton>
            <p className="modal-title">Token On Hold</p>
          </Modal.Header>
          <Modal.Body className="pb-0">
            <p>Why are you putting this token request on hold?</p>
            <div className="col-lg-12 col-md-12 col-sm-12 form_input_main">
              <Form.Control
                as="textarea"
                rows={8}
                placeholder="Please describe your reason for putting it on hold...."
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="pe-0 pb-0">
            <div className="d-flex justify-content-end align-items-center btn-wrapper btn_report_view">
              <button
                className="cx-btn-1"
                onClick={() => {
                  setOnhold(false);
                }}
              >
                <Link to="#">Cancel</Link>
              </button>
              <button
                className="cx-btn-2"
                onClick={() => {
                  setOnhold(false);
                }}
              >
                <Link to="#">Submit</Link>
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </motion.div>
  );
};

export default ViewReport;

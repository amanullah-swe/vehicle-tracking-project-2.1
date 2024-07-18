import React, { useContext, useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import logo from "../../assets/images/Web-Application-Logo.svg";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import arrow from "../../assets/images/ic_line_arrow_left.svg";
import { motion } from "framer-motion";
import Nav from "react-bootstrap/Nav";
const LoginWithOTP = () => {
  const [validated, setValidated] = useState(false);
  const [none, setNone] = useState(false);
const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
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
      className="main-auth"
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="login-wrapper">
        <div className="row height-style">
          <div className="col-md-6 left">
            <div className="bg-img">
              <h3>
                A New Way <br /> To Track Your <br /> Vehicle
              </h3>
            </div>
          </div>

          <div
            className="col-md-6 right cx-relative "
            id="login-with-otp-main-right"
          >
            <div className="wrapper row">
              <div>
                <div className="arrow">
                  <Link to="/" className="">
                    <img src={arrow} alt="" />
                  </Link>
                </div>

                <div className="top-logo arro-below-logo">
                  <img src={logo} alt="" />
                </div>

                <h3>Welcome Back !</h3>
                <div className="auth-form Vehcle-main-tabs">
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Tabs
                      defaultActiveKey="1"
                      id="uncontrolled-tab-example"
                      className="mb-3 login-otp-tab"
                    >
                      <Tab
                        eventKey="1"
                        title="Email OTP"
                        className="left-tab"
                        onClick={() => setNone(false)}
                      >
                        <div className="">
                          <div className="form_input_main">
                            <Form.Label className="common-labels">
                              Email ID
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Email ID"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please Enter Email ID.
                            </Form.Control.Feedback>
                          </div>

                          <div className="otp-text form_input_main">
                            <Form.Label className="common-labels">
                              An OTP has been sent to your email, <br />
                              Please Verify it below
                            </Form.Label>
                          </div>
                          <div className="otp-input">
                            <Form.Control required type="text" maxLength={1} />
                            <Form.Control required type="text" maxLength={1} />
                            <Form.Control required type="text" maxLength={1} />
                            <Form.Control required type="text" maxLength={1} />
                          </div>
                          <div className="forgot-link">
                            <Link to="#">Resend OTP : </Link>{" "}
                            <span>00:59s</span>
                          </div>

                          <div className="btn-auth">
                            <Link to="/Dashboard">
                              <button type="submit" className="filled-btn">
                                Verify
                              </button>
                            </Link>

                            <div className="link-style">
                              <Link to="#">2023 @ Vehicle Tracking</Link>
                            </div>
                          </div>
                        </div>
                      </Tab>
                      <Tab
                        eventKey="2"
                        title="Mobile Number OTP"
                        onClick={() => setNone(true)}
                      >
                        <div className="right">
                          <div
                            className={
                              none ? "login-otp-text " : "login-otp-text"
                            }
                          >
                            <div className="form_input_main">
                              <Form.Label className="common-labels">
                                Mobile Number
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Mobile Number"
                              />
                              <Form.Control.Feedback type="invalid">
                                Please Enter Mobile Number.
                              </Form.Control.Feedback>
                            </div>
                            <div className="otp-text form_input_main">
                              <Form.Label className="common-labels">
                                An OTP has been sent to your mobile number,{" "}
                                <br />
                                Please Verify it below
                              </Form.Label>
                            </div>
                            <div className="otp-input">
                              <Form.Control
                                required
                                type="text"
                                maxLength={1}
                              />
                              <Form.Control
                                required
                                type="text"
                                maxLength={1}
                              />
                              <Form.Control
                                required
                                type="text"
                                maxLength={1}
                              />
                              <Form.Control
                                required
                                type="text"
                                maxLength={1}
                              />
                            </div>
                            <div className="forgot-link">
                              <Link to="#">Resend OTP : </Link>
                              <span>00:59s</span>
                            </div>
                            <div className="btn-auth">
                              <Link to="/Dashboard">
                                <button type="submit" className="filled-btn">
                                  Verify
                                </button>
                              </Link>

                              <div className="link-style">
                                <Link to="#">2023 @ Vehicle Tracking</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>

                    {/* <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey="first"
                      className="mb-3 login-otp-tab"
                    >
                      <Nav variant="pills" className="flex-row">
                        <Nav.Item>
                          <Nav.Link eventKey="first">Email OTP</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey="second">
                            Mobile Number OTP
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <div className="form_input_main">
                            <Form.Label className="common-labels">
                              Email ID
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Email ID"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please Enter Email ID.
                            </Form.Control.Feedback>
                          </div>

                          <div className="otp-text form_input_main">
                            <Form.Label className="common-labels">
                              An OTP has been sent to your email, <br />
                              Please Verify it below
                            </Form.Label>
                          </div>
                          <div className="otp-input">
                            <Form.Control required type="text" maxLength={1} />
                            <Form.Control required type="text" maxLength={1} />
                            <Form.Control required type="text" maxLength={1} />
                            <Form.Control required type="text" maxLength={1} />
                          </div>
                          <div className="forgot-link">
                            <Link to="#">Resend OTP : </Link>{" "}
                            <span>00:59s</span>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <div className="right">
                            <div
                              className={
                                none ? "login-otp-text none" : "login-otp-text"
                              }
                            >
                              <div className="form_input_main">
                                <Form.Label className="common-labels">
                                  Mobile Number
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="Mobile Number"
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please Enter Mobile Number.
                                </Form.Control.Feedback>
                              </div>
                              <div className="otp-text form_input_main">
                                <Form.Label className="common-labels">
                                  An OTP has been sent to your mobile number,{" "}
                                  <br />
                                  Please Verify it below
                                </Form.Label>
                              </div>
                              <div className="otp-input">
                                <Form.Control
                                  required
                                  type="text"
                                  maxLength={1}
                                />
                                <Form.Control
                                  required
                                  type="text"
                                  maxLength={1}
                                />
                                <Form.Control
                                  required
                                  type="text"
                                  maxLength={1}
                                />
                                <Form.Control
                                  required
                                  type="text"
                                  maxLength={1}
                                />
                              </div>
                              <div className="forgot-link">
                                <Link to="#">Resend OTP : </Link>
                                <span>00:59s</span>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container> */}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginWithOTP;

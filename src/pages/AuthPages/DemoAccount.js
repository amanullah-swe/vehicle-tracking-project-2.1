import React, { useContext, useState } from "react";
import arrow from "../../assets/images/ic_line_arrow_left.svg";
import DDlogo from "../../assets/images/DDlogo.png";
import logo from "../../assets/images/Web-Application-Logo.svg";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DemoAccount = () => {
  const [validated, setValidated] = useState(false);

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
      className="main-auth container"
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="login-wrapper" id="registration-main">
        <div className="row">
          <div className="right">
            <div className="wrapper forgot-wrapper ">
              <div className="arrow">
                <Link to="/">
                  <img src={arrow} alt="" />
                </Link>
              </div>
              <div>
                <div className="top-logo">
                  <img src={logo} alt="" />
                </div>
                <h3>Try it for free</h3>
                <div className="auth-form">
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="mb-4">
                        <Form.Label className="common-labels">
                          Name <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter your Business Name here..."
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter your Business Name.
                        </Form.Control.Feedback>
                      </div>

                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          Email ID <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="email"
                          placeholder="Enter you Email ID "
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter Email.
                        </Form.Control.Feedback>
                      </div>

                      <div className="col-md-6 mb-4 select-group">
                        <Form.Label className="common-labels">
                          Nationality <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Select
                          required
                          as="select"
                          type="select"
                          name="Speed_limit"
                        >
                          <option value="">Select Country</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                          <option value="150">150</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          Please Select Timezone.
                        </Form.Control.Feedback>
                      </div>
                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          Contact Number <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter you Email ID "
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter your Contact Number.
                        </Form.Control.Feedback>
                      </div>

                      <div className="col-md-6 mb-4">
                        <Form.Label className="common-labels">
                          City <span className="red-star">*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="email"
                          placeholder="Enter a Location"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please URL of your website.
                        </Form.Control.Feedback>
                      </div>
                    </div>

                    <div className="btn-auth">
                      <Link to="/">
                        <button type="submit" className="filled-btn">
                          Try It Now
                        </button>
                      </Link>

                      <div className="link-style">
                        <Link to="#">2023 @ Vehicle Tracking</Link>
                      </div>
                    </div>
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

export default DemoAccount;

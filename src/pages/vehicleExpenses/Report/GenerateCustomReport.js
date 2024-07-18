import React, { useContext } from 'react'
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
const GenerateCustomReport = () => {
    const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
    const aninations = {
        initial: { opacity: 0, x: 400 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
    };
    const { t, i18n } = useTranslation();
    return (
        <motion.div className={sidebar ? "taskMain " : "cx-active taskMain"} id="cx-main" variants={aninations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.1 }}>
            <div id='cx-wrapper'>
                <div className="main-master-wrapper">
                    <div className="Heading">
                        <p>{t("Generate Custom Report")}</p>
                    </div>
                    <div className="row">
                        <div className="col-md-6 form_input_main">
                            <div className="innerSelectBox weekCounter">
                                <Form.Label className="common-labels custom-label-title me-0">
                                    <p>{t("Parent Area")}</p>
                                </Form.Label>
                                <select
                                required
                                    className="form-select"
                                    aria-label="Default select example"
                                    placeholder="Select Fuel Type..."
                                >
                                    <option value="">Select Area...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 form_input_main">
                            <div className="innerSelectBox weekCounter">
                                <Form.Label className="common-labels">
                                    {" "}
                                    {t("Geofence Areas")}<span>&#42;</span>{" "}
                                </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Area.."
                                />
                            </div>
                        </div>
                        <div className="col-md-6 form_input_main">
                            <div className="innerSelectBox weekCounter">
                                <Form.Label className="common-labels">
                                    {" "}
                                    {t("Address")} <span>&#42;</span>{" "}
                                </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Address..."
                                />
                            </div>
                        </div>
                        <div className="col-md-6 form_input_main">
                            <div className="innerSelectBox weekCounter">
                                <Form.Label className="common-labels">
                                    {" "}
                                    {t("Landmark")}
                                </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Landmark..."
                                />
                            </div>
                        </div>
                        <div className="col-md-6 form_input_main">
                            <div className="innerSelectBox weekCounter">
                                <Form.Label className="common-labels">
                                    {" "}
                                    {t("City / State")} <span>&#42;</span>{" "}
                                </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter City / state.auth..."
                                />
                            </div>
                        </div>
                        <div className="col-md-6 form_input_main">
                            <div className="innerSelectBox weekCounter">
                                <Form.Label className="common-labels">
                                    {" "}
                                    {t("Country")}
                                </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Country..."
                                />
                            </div>
                        </div>
                        <div className="Heading">
                            <p>{t("Recipients")} </p>
                        </div>
                        <div className="row p-0 m-0">
                            <div className="col-md-12 form_input_main">
                                <div className="innerSelectBox weekCounter">
                                    <Form.Label className="common-labels">
                                        {" "}
                                        {t("Users")}
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Select Users..."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Link to="/Reports" ><button className="cx-btn-1">{t("Cancel")}</button></Link>
                            <Link to="/Reports" ><button className="cx-btn-2">{t("Submit")}</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default GenerateCustomReport
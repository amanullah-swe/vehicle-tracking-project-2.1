import React from 'react'
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import yellow_tri from "../../assets/images/Yellow_Tri.svg"
import Red_tri from "../../assets/images/Red_Tri.svg"
import Green_tri from "../../assets/images/Green-check.svg"
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const NewInspection = () => {
    const { sidebar } = useContext(AppContext);
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
            transition={{ duration: 0.1 }} >
            <div id="cx-wrapper" className="New_inspition">
                <div className="main-master-wrapper">
                    <div className="Heading">
                        New Vehicle Inspection
                    </div>
                    <div className="New_inspition_Body">
                        <div className="GeneralInformation">
                            <div className="genral_heading">
                                General Information
                            </div>
                            <div className="New_contain">
                                <label htmlFor="">Vehicle Number</label>
                                <div className="Search_conponent mb-3">
                                    <input type="text" defaultValue='MH09AJ5022' className="form-control" />
                                    <div className="cx-btn-2 customBTN2">Search</div>
                                </div>
                                <div className="GenralBody">
                                    <label htmlFor="" className='HeadLabel'>Vehicle Number</label>
                                    <div className="Vehicle_Card mb-3">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="single_contain">
                                                    <label htmlFor="">
                                                        Vehicle Number
                                                    </label>
                                                    <p>MH09AJ5022</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_contain">
                                                    <label htmlFor="">
                                                        Vehicle Type
                                                    </label>
                                                    <p>Utility Cab</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_contain">
                                                    <label htmlFor="">
                                                        Vehicle Name
                                                    </label>
                                                    <p>Honda</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_contain">
                                                    <label htmlFor="">
                                                        Total Kms Driven
                                                    </label>
                                                    <p>97,000kms</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_contain">
                                                    <label htmlFor="">
                                                        Last Inspection Date
                                                    </label>
                                                    <p>02-02-2023, 05:48PM</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_contain">
                                                    <label htmlFor="">
                                                        Last Inspection Done By
                                                    </label>
                                                    <p>Driver- Smith Dave</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cx-btn-2 customBTN2">
                                        <Link to="/NewVehicleInspection">
                                            Add New Inspection
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="RecentInspections">
                            <div className="genral_heading">
                                Most Recent Inspections
                            </div>
                            <div className="Recent_Body">
                                <div className="Single_Lisy">
                                    <div className="ListLabel">Inspection-0007</div>
                                    <div className="List_alert">
                                        <div className="alert_sign">
                                            <img src={Green_tri} alt="" />
                                            <p>60</p>
                                        </div>
                                        <div className="alert_sign">
                                            <img src={yellow_tri} alt="" />
                                            <p>60</p>
                                        </div>
                                        <div className="alert_sign">
                                            <img src={Red_tri} alt="" />
                                            <p>60</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="Single_Lisy">
                                    <div className="ListLabel">Inspection-0007</div>
                                    <div className="List_alert">
                                        <div className="alert_sign">
                                            <img src={Green_tri} alt="" />
                                            <p>60</p>
                                        </div>
                                        <div className="alert_sign">
                                            <img src={yellow_tri} alt="" />
                                            <p>60</p>
                                        </div>
                                        <div className="alert_sign">
                                            <img src={Red_tri} alt="" />
                                            <p>60</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="Single_Lisy">
                                    <div className="ListLabel">Inspection-0007</div>
                                    <div className="List_alert">
                                        <div className="alert_sign">
                                            <img src={Green_tri} alt="" />
                                            <p>60</p>
                                        </div>
                                        <div className="alert_sign">
                                            <img src={yellow_tri} alt="" />
                                            <p>60</p>
                                        </div>
                                        <div className="alert_sign">
                                            <img src={Red_tri} alt="" />
                                            <p>60</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="Single_Lisy">
                                    <div className="ListLabel">Inspection-0007</div>
                                    <div className="List_alert">
                                        <div className="alert_sign">
                                            <img src={Green_tri} alt="" />
                                            <p>60</p>
                                        </div>
                                        <div className="alert_sign">
                                            <img src={yellow_tri} alt="" />
                                            <p>60</p>
                                        </div>
                                        <div className="alert_sign">
                                            <img src={Red_tri} alt="" />
                                            <p>60</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="Single_Lisy">
                                    <div className="ListLabel">Inspection-0007</div>
                                    <div className="List_alert">
                                        <div className="alert_sign">
                                            <img src={Green_tri} alt="" />
                                            <p>60</p>
                                        </div>
                                        <div className="alert_sign">
                                            <img src={yellow_tri} alt="" />
                                            <p>60</p>
                                        </div>
                                        <div className="alert_sign">
                                            <img src={Red_tri} alt="" />
                                            <p>60</p>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/ViewInspectionDetails" className="Last_view_ALl">
                                    View All
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default NewInspection
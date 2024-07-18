import React from 'react'
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import { motion } from "framer-motion";
import { Accordion, Carousel, Modal, Nav, Tab, TabPane } from 'react-bootstrap';
import yellow_tri from "../../assets/images/Yellow_Tri.svg"
import Red_tri from "../../assets/images/Red_Tri.svg"
import view from "../../assets/images/InspPrivew.svg"
import uploads from "../../assets/images/InspUpload.svg"
import Green_tri from "../../assets/images/Green-check.svg"
import uploadIcon from "../../assets/images/uploadIcon.svg";
import Document_1 from "../../assets/images/Document_1.svg"
import Document_2 from "../../assets/images/Document_2.svg"
import Document_3 from "../../assets/images/Document_3.svg"
import Document_4 from "../../assets/images/Document_4.svg"
import Repair_car1 from "../../assets/images/Repair_car1.svg"
import Repair_car from "../../assets/images/Repair_car2.svg"
import { useState } from 'react';
import { Link } from 'react-router-dom';

const NewVehicleInspection = () => {
    const { sidebar } = useContext(AppContext);
    const [checkRadio, setCheckRadio] = useState(false)
    const [imageModal, setImageModal] = useState(false);

    const handleClose = () => {
        setImageModal(false)
    }
    const handleShow = () => {
        setImageModal(true)
    }
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const aninations = {
        initial: { opacity: 0, x: 400 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
    };
    const [interior, setInterior] = useState(true)
    const [exterior, setExterior] = useState(false)
    const [othes, setOther] = useState(false)
    const [summary, setSummary] = useState(false)
    const [next, setNext] = useState("")

    const HandleSubmit = () => {
        if (interior === true) {
            setInterior(false)
            setExterior(true);
            setOther(false)
            setSummary(false)
        }
        if (exterior === true) {
            setInterior(false)
            setExterior(false);
            setOther(true)
            setSummary(false)
        }
        if (othes === true) {
            setInterior(false)
            setExterior(false);
            setOther(false)
            setSummary(true)
        }
        if (summary === true) {
            setNext("/ViewInspectionDetails")
        }
    }
    const HandleCancle = () => {
        if (interior === true) {
            setNext("/NewInspection")
        }
        if (exterior === true) {
            setInterior(true)
            setExterior(false);
            setOther(false)
            setSummary(false)
        }
        if (othes === true) {
            setInterior(false)
            setExterior(true);
            setOther(false)
            setSummary(false)
        }
        if (summary === true) {
            setInterior(false)
            setExterior(false);
            setOther(true)
            setSummary(false)
        }
    }

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
                    <div className="Vehicle_information">
                        <div className="heading">Vehicle Information</div>
                        <div className="Vehicle_Details">
                            <div className="row">
                                <div className="col-lg-3">
                                    <label htmlFor="">Vehicle Number</label>
                                    <p>MH09AJ5022</p>
                                </div>
                                <div className="col-lg-3">
                                    <label htmlFor="">Vehicle Type</label>
                                    <p>Utility Cab</p>
                                </div>
                                <div className="col-lg-3">
                                    <label htmlFor="">Vehicle Name</label>
                                    <p>Honda</p>
                                </div>
                                <div className="col-lg-3">
                                    <label htmlFor="">Last Inspection Date</label>
                                    <p>02-02-2023, 05:48PM</p>
                                </div>
                            </div>
                        </div>
                        <div id='Vehicle_Information_Tabs'>
                            <div className="Steps">
                                {interior === true ?
                                    <>
                                        <div className={interior === false ? "Step_button" : "active"}>Interior</div>
                                        <div className={exterior === false ? "Step_button" : "active"}>Exterior</div>
                                        <div className={othes === false ? "Step_button" : "active"}>Other’s</div>
                                        <div className={summary === false ? "Step_button" : "active"}>Summary</div>
                                    </> : ""}
                                {exterior === true ?
                                    <>
                                        <div className={interior === false ? "Step_button" : "active"}>Interior<img src={Green_tri} alt="" /></div>
                                        <div className={exterior === false ? "Step_button" : "active"}>Exterior</div>
                                        <div className={othes === false ? "Step_button" : "active"}>Other’s</div>
                                        <div className={summary === false ? "Step_button" : "active"}>Summary</div>
                                    </> : ""}
                                {othes === true ?
                                    <>
                                        <div className={interior === false ? "Step_button" : "active"}>Interior <img src={Green_tri} alt="" /></div>
                                        <div className={exterior === false ? "Step_button" : "active"}>Exterior <img src={Green_tri} alt="" /></div>
                                        <div className={othes === false ? "Step_button" : "active"}>Other’s</div>
                                        <div className={summary === false ? "Step_button" : "active"}>Summary</div>
                                    </> : ""}
                                {summary === true ?
                                    <>
                                        <div className={interior === false ? "Step_button" : "active"}>Interior <img src={Green_tri} alt="" /></div>
                                        <div className={exterior === false ? "Step_button" : "active"}>Exterior <img src={Green_tri} alt="" /></div>
                                        <div className={othes === false ? "Step_button" : "active"}>Other’s <img src={Green_tri} alt="" /></div>
                                        <div className={summary === false ? "Step_button" : "active"}>Summary</div>
                                    </> : ""}
                            </div>
                            <div className="Step_Body_main">
                                {interior === true ?
                                    <div className="tab_contain_inspiction">
                                        <div className="heading">
                                            <p>Brake System</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow_tri} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={Red_tri} alt="" />
                                                    <label htmlFor="">1 Immediate Attention Required</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Brake_Contain">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Name of Part / Particular</th>
                                                        <th>Attachment </th>
                                                        <th>Checked and OK</th>
                                                        <th>May Require Attention</th>
                                                        <th>Requires Immediate Attention</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Service Brakes</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />+1
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parking Brakes</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />+1
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake drums/ rotors</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadio3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake hose</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Low pressure warning device</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio4" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="heading">
                                            <p>COUPLING DEVICES</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow_tri} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={Red_tri} alt="" />
                                                    <label htmlFor="">1 Immediate Attention Required</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Brake_Contain">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Name of Part / Particular</th>
                                                        <th>Attachment </th>
                                                        <th>Checked and OK</th>
                                                        <th>May Require Attention</th>
                                                        <th>Requires Immediate Attention</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Fifth wheel</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pintle hooks</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td className='lastFirst'>Drawbar/towbar eye and tongue</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio5" value="" /></td>
                                                        <td className='RedNo lastRight'><input type="radio" defaultChecked name="muhRadio5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> : ""}
                                {exterior === true ?
                                    <div className="tab_contain_inspiction">
                                        <div className="heading">
                                            <p>Brake System</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow_tri} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={Red_tri} alt="" />
                                                    <label htmlFor="">1 Immediate Attention Required</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Brake_Contain">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Name of Part / Particular</th>
                                                        <th>Attachment </th>
                                                        <th>Checked and OK</th>
                                                        <th>May Require Attention</th>
                                                        <th>Requires Immediate Attention</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Service Brakes</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />+1
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadio" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parking Brakes</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />+1
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake drums/ rotors</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake hose</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Low pressure warning device</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadio4" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="heading">
                                            <p>COUPLING DEVICES</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow_tri} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={Red_tri} alt="" />
                                                    <label htmlFor="">1 Immediate Attention Required</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Brake_Contain">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Name of Part / Particular</th>
                                                        <th>Attachment </th>
                                                        <th>Checked and OK</th>
                                                        <th>May Require Attention</th>
                                                        <th>Requires Immediate Attention</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Fifth wheel</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadio3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pintle hooks</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td className='lastFirst'>Drawbar/towbar eye and tongue</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio5" value="" /></td>
                                                        <td className='RedNo lastRight'><input type="radio" name="muhRadio5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> : ""}
                                {othes === true ?
                                    <div className="tab_contain_inspiction">
                                        <div className="heading">
                                            <p>Brake System</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow_tri} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={Red_tri} alt="" />
                                                    <label htmlFor="">1 Immediate Attention Required</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Brake_Contain">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Name of Part / Particular</th>
                                                        <th>Attachment </th>
                                                        <th>Checked and OK</th>
                                                        <th>May Require Attention</th>
                                                        <th>Requires Immediate Attention</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Parking Brakes</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />+1
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Service Brakes</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />+1
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake drums/ rotors</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake hose</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Low pressure warning device</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio4" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="heading">
                                            <p>COUPLING DEVICES</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow_tri} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={Red_tri} alt="" />
                                                    <label htmlFor="">1 Immediate Attention Required</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Brake_Contain">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Name of Part / Particular</th>
                                                        <th>Attachment </th>
                                                        <th>Checked and OK</th>
                                                        <th>May Require Attention</th>
                                                        <th>Requires Immediate Attention</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Fifth wheel</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pintle hooks</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td className='lastFirst'>Drawbar/towbar eye and tongue</td>
                                                        <td className='Upload_Section'>
                                                            <label htmlFor="upld"><img src={uploads} alt="" /></label>
                                                            <input type="file" id='upld' />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio5" value="" /></td>
                                                        <td className='RedNo lastRight'><input type="radio" defaultChecked name="muhRadio5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> : ""}
                                {summary === true ?
                                    <div className="tab_contain_Summary">
                                        <div className="heading">
                                            Inspection Summary
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 mb-4">
                                                <div className="leftSide">Inspection Date</div>
                                            </div>
                                            <div className="col-lg-8 mb-4">
                                                <div className="RightSide">02-02-2023, 04:59PM</div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="leftSide">Inspected By</div>
                                            </div>
                                            <div className="col-lg-8 mb-4">
                                                <div className="RightSide">Driver-John Doe</div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="leftSide">Inspected Variants</div>
                                            </div>
                                            <div className="col-lg-8 mb-4">
                                                <div className="Summary_Accordian">
                                                    <Accordion defaultActiveKey="0">
                                                        <Accordion.Item eventKey="0">
                                                            <Accordion.Header><img src={Red_tri} alt="" /> 10 Immediate Attention Required</Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className="inner_Accordian">
                                                                    <div className="Single_List">
                                                                        <div className="contain">
                                                                            <p>Brake System</p>
                                                                            <img src={view} alt="" onClick={() => { handleShow() }} className='c-pointer' />
                                                                        </div>
                                                                        <div className="cheack">
                                                                            <img src={Red_tri} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="Single_List">
                                                                        <div className="contain">
                                                                            <p>Coupling Devices</p>
                                                                            <img src={view} alt="" onClick={() => { handleShow() }} className='c-pointer' />
                                                                        </div>
                                                                        <div className="cheack">
                                                                            <img src={Red_tri} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="Single_List">
                                                                        <div className="contain">
                                                                            <p>Engine Operations</p>
                                                                            <img src={view} alt="" onClick={() => { handleShow() }} className='c-pointer' />
                                                                        </div>
                                                                        <div className="cheack">
                                                                            <img src={Red_tri} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="Single_List">
                                                                        <div className="contain">
                                                                            <p>Tires</p>
                                                                            <img src={view} alt="" onClick={() => { handleShow() }} className='c-pointer' />
                                                                        </div>
                                                                        <div className="cheack">
                                                                            <img src={Red_tri} alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="1">
                                                            <Accordion.Header><img src={yellow_tri} alt="" />5 Attention Required</Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className="inner_Accordian">
                                                                    <div className="Single_List">
                                                                        <div className="contain">
                                                                            <p>Brake System</p>
                                                                            <img src={view} alt="" onClick={() => { handleShow() }} className='c-pointer' />
                                                                        </div>
                                                                        <div className="cheack">
                                                                            <img src={yellow_tri} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="Single_List">
                                                                        <div className="contain">
                                                                            <p>Coupling Devices</p>
                                                                            <img src={view} alt="" onClick={() => { handleShow() }} className='c-pointer' />
                                                                        </div>
                                                                        <div className="cheack">
                                                                            <img src={yellow_tri} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="Single_List">
                                                                        <div className="contain">
                                                                            <p>Engine Operations</p>
                                                                            <img src={view} alt="" onClick={() => { handleShow() }} className='c-pointer' />
                                                                        </div>
                                                                        <div className="cheack">
                                                                            <img src={yellow_tri} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="Single_List">
                                                                        <div className="contain">
                                                                            <p>Tires</p>
                                                                            <img src={view} alt="" onClick={() => { handleShow() }} className='c-pointer' />
                                                                        </div>
                                                                        <div className="cheack">
                                                                            <img src={yellow_tri} alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="2">
                                                            <Accordion.Header><img src={Green_tri} alt="" />5 60 Checked and OK</Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className="inner_Accordian">
                                                                    <div className="Single_List">
                                                                        <div className="contain">
                                                                            <p>Brake System</p>
                                                                            <img src={view} alt="" onClick={() => { handleShow() }} className='c-pointer' />
                                                                        </div>
                                                                        <div className="cheack">
                                                                            <img src={Green_tri} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="Single_List">
                                                                        <div className="contain">
                                                                            <p>Coupling Devices</p>
                                                                            <img src={view} alt="" onClick={() => { handleShow() }} className='c-pointer' />
                                                                        </div>
                                                                        <div className="cheack">
                                                                            <img src={Green_tri} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="Single_List">
                                                                        <div className="contain">
                                                                            <p>Engine Operations</p>
                                                                            <img src={view} alt="" onClick={() => { handleShow() }} className='c-pointer' />
                                                                        </div>
                                                                        <div className="cheack">
                                                                            <img src={Green_tri} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="Single_List">
                                                                        <div className="contain">
                                                                            <p>Tires</p>
                                                                            <img src={view} alt="" onClick={() => { handleShow() }} className='c-pointer' />
                                                                        </div>
                                                                        <div className="cheack">
                                                                            <img src={Red_tri} alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="leftSide">Inspection Remark</div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="radioSelect">
                                                    <div className="single_radio_select">
                                                        <label htmlFor="OkToDriver" className={checkRadio === false ? "" : 'chewckedBtn'}>Ok to drive
                                                            <input type="radio" id='OkToDriver' name='Remark'/>
                                                        </label>
                                                    </div>
                                                    <div className="single_radio_select">
                                                        <label htmlFor="NeedMaintenance">Need Maintenance, Not Ok to Drive
                                                            <input type="radio" id='NeedMaintenance' name='Remark'  />
                                                        </label>
                                                    </div>
                                                    <div className="single_radio_select">
                                                        <label htmlFor="NeedAction">Need Immediate Action
                                                            <input type="radio" id='NeedAction' name='Remark' />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="RightSide">
                                                    <textarea name="" id="" cols="30" rows="4" placeholder='Enter Remark' defaultValue="Vehicle is not advised to be driven. Need immediate action." className='form-control'></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : ""}

                            </div>
                        </div>
                        <div className="btns-main btn-wrapper mt-3">
                            <button type="" className="cx-btn-1" onClick={() => { HandleCancle() }}>
                                <Link to={next}>Cancle</Link>
                            </button>
                            <button type="submit" className="cx-btn-2" onClick={() => { HandleSubmit() }}>
                                <Link to={next}>Next</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={imageModal}
                onHide={handleClose}
                centered
                size='xl'
                className="common-model"
            >
                <Modal.Body className='p-0'>
                    <div className="intarior_modal">
                        <div className="pervious">
                            <div className="modal_headin">Pervious</div>
                            <Carousel activeIndex={index} onSelect={handleSelect}>
                                <Carousel.Item>
                                    <img
                                        className="d-block"
                                        src={Repair_car1}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <p className="click">Clicked By- Driver, John Doe</p>
                                        <p className="time">02-02-23,04:59 PM</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block"
                                        src={Repair_car}
                                        alt="Second slide"
                                    />

                                    <Carousel.Caption>
                                        <p className="click">Clicked By- Driver, John Doe</p>
                                        <p className="time">02-02-23,04:59 PM</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block"
                                        src={Repair_car1}
                                        alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                        <p className="click">Clicked By- Driver, John Doe</p>
                                        <p className="time">02-02-23,04:59 PM</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                            <div className="remark">
                                <label htmlFor="" className='heading_remark'>Remark</label>
                                <textarea name="" id="" cols="30" rows="4" placeholder='Write your remark here...' className="form-control"></textarea>
                            </div>
                        </div>
                        <div id="Preview_Modal">
                            <div className="modal_headin">Current</div>
                            <div className="fileDropper">
                                <label htmlFor="file" className="imageHolder">
                                    <input type="file" id="file" className="d-none" />
                                    <div className="innerFlex">
                                        <img src={uploadIcon} className="browseImg" alt="" />
                                        <p className="innerTxt">Drag & Drop Your File</p>
                                        <p className="innerTxt">Or</p>
                                        <label htmlFor="file2" className="browseBtn">
                                            <input type="file" id="file2" className="d-none" />
                                            <p className="mt-1">Browse File</p>
                                        </label>
                                    </div>
                                </label>
                            </div>
                            <div className="remark">
                                <label htmlFor="" className='heading_remark'>Action</label>
                                <div className="alert_modal">
                                    <div className='GreenOk'>
                                        <input type="radio" name="modal1" value="" id='ok' />
                                        <label htmlFor="ok">Checked and OK</label>
                                    </div>
                                    <div className='Yellow'>
                                        <input type="radio" defaultChecked name="modal1" value="" id='attention' />
                                        <label htmlFor="attention">May Require Attention</label>
                                    </div>
                                    <div className='RedNo'>
                                        <input type="radio" name="modal1" value="" id='Immediate' />
                                        <label htmlFor="Immediate">Requires Immediate Attention</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="pe-0 pb-0">
                    <div className="d-flex justify-content-end align-items-center btn-wrapper btn_report_view">
                        <button
                            className="cx-btn-1"
                            onClick={() => { setImageModal(false) }}
                        >
                            <Link to="#">Cancel</Link>
                        </button>
                        <button
                            className="cx-btn-2"
                            onClick={() => { setImageModal(false) }}
                        >
                            <Link to="#">Save</Link>
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </motion.div >

    )
}

export default NewVehicleInspection
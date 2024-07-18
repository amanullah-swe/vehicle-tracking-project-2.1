import React from 'react'
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import { motion } from "framer-motion";
import profile from "../../assets/images/CarProfile.svg";
import { Link } from 'react-router-dom';
import { Accordion, Carousel, Col, Modal, Nav, Row, Tab, TabPane } from 'react-bootstrap';
import red from "../../assets/images/Red_Tri.svg"
import view from "../../assets/images/InspPrivew.svg"
import yellow from "../../assets/images/Yellow_Tri.svg"
import green from "../../assets/images/Green-check.svg"
import IN_green from "../../assets/images/IN_green.svg"
import IN_yellow from "../../assets/images/IN_Red.svg"
import IN_red from "../../assets/images/IN_yellow.svg"
import IN_dot from "../../assets/images/IN_dot.svg"
import Download2 from "../../assets/images/Download2.svg"
import Inerior_Car from "../../assets/images/Inerior_Car.svg"
import Exterior_car from "../../assets/images/Exterior_car.svg"
import Car_Base from "../../assets/images/Car_Base.svg"
import Typer_maping from "../../assets/images/Typer_maping.svg"
import Document_1 from "../../assets/images/Document_1.svg"
import Document_2 from "../../assets/images/Document_2.svg"
import Document_3 from "../../assets/images/Document_3.svg"
import Document_4 from "../../assets/images/Document_4.svg"
import Repair_car1 from "../../assets/images/Repair_car1.svg"
import Repair_car from "../../assets/images/Repair_car2.svg"
import Imtarior1 from "../../assets/images/Intarior_Images/InteriorImages (1).jpg"
import Imtarior2 from "../../assets/images/Intarior_Images/InteriorImages (2).jpg"
import Imtarior3 from "../../assets/images/Intarior_Images/InteriorImages (3).jpg"
import Imtarior4 from "../../assets/images/Intarior_Images/InteriorImages (4).jpg"
import Imtarior5 from "../../assets/images/Intarior_Images/InteriorImages (5).jpg"
import Imtarior6 from "../../assets/images/Intarior_Images/InteriorImages (6).jpg"
import Imtarior7 from "../../assets/images/Intarior_Images/InteriorImages (7).jpg"
import Imtarior8 from "../../assets/images/Intarior_Images/InteriorImages (8).jpg"
import Imtarior9 from "../../assets/images/Intarior_Images/InteriorImages (5).jpg"
import ExteriorImages1 from "../../assets/images/Extarior_Images/ExteriorImages (1).jpg"
import ExteriorImages2 from "../../assets/images/Extarior_Images/ExteriorImages (2).jpg"
import ExteriorImages3 from "../../assets/images/Extarior_Images/ExteriorImages (3).jpg"
import ExteriorImages4 from "../../assets/images/Extarior_Images/ExteriorImages (4).jpg"
import ExteriorImages5 from "../../assets/images/Extarior_Images/ExteriorImages (5).jpg"
import ExteriorImages6 from "../../assets/images/Extarior_Images/ExteriorImages (6).jpg"
import ExteriorImages7 from "../../assets/images/Extarior_Images/ExteriorImages (7).jpg"
import ExteriorImages8 from "../../assets/images/Extarior_Images/ExteriorImages (8).jpg"
import ExteriorImages9 from "../../assets/images/Extarior_Images/ExteriorImages (9).jpg"
import OtherImages1 from "../../assets/images/Other_Images/OtherImages (1).jpg"
import OtherImages2 from "../../assets/images/Other_Images/OtherImages (2).jpg"
import OtherImages3 from "../../assets/images/Other_Images/OtherImages (3).jpg"
import OtherImages4 from "../../assets/images/Other_Images/OtherImages (4).jpg"
import OtherImages5 from "../../assets/images/Other_Images/OtherImages (5).jpg"
import OtherImages6 from "../../assets/images/Other_Images/OtherImages (6).jpg"
import OtherImages7 from "../../assets/images/Other_Images/OtherImages (7).jpg"
import OtherImages8 from "../../assets/images/Other_Images/OtherImages (8).jpg"
import OtherImages9 from "../../assets/images/Other_Images/OtherImages (9).jpg"
import { useState } from 'react';
import pdfdown from "../VehicleInspection/InspectionPDF.js"
import Chart from "react-apexcharts";
// import { PDFExport } from '@progress/kendo-react-pdf';
// import { Image } from '@progress/kendo-react-common';
import PDFprofile from "../../assets/images/InspetionPDF/FrontPageProfile.svg"
import HeaderLeftLogo from "../../assets/images/InspetionPDF/HeaderLeftLogo.svg"
import CarView from "../../assets/images/InspetionPDF/CarView.svg"
import ProfilePhoto from "../../assets/images/InspetionPDF/ProfilePhoto.svg"
import Persone from "../../assets/images/InspetionPDF/Persone.svg"
import Drive from "../../assets/images/InspetionPDF/Drive.svg"
import Star from "../../assets/images/InspetionPDF/Star.svg"
import Logo from "../../assets/images/Web-Application-Logo.svg"

const ViewInspectionDetails = () => {
    const { sidebar } = useContext(AppContext);
    const [imageModal, setImageModal] = useState(false);

    const handleClose = () => {
        setImageModal(false)
    }
    const handleShow = () => {
        setImageModal(true)
    }

    const pdfExportComponent = React.useRef(null);

    const exportPDF = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };


    const aninations = {
        initial: { opacity: 0, x: 400 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
    };

    const [state, setState] = useState({
        series: [
            {
                name: "Last Service",
                data: [31, 100, 28],
            },
            {
                name: "Current Service",
                data: [11, 20, 100],
            },
        ],
        chart: {
            type: false,
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        options: {
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 10,
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return "$" + "" + val;
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                },
                style: {
                    fontSize: '16px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 'bold',
                    colors: undefined
                },
            },
            chart: {
                height: 440,
                toolbar: {
                    show: false,
                },
            },
            colors: ["#803900", "#C7A180"],
            fill: {
                type: "fill",
            },
            grid: {
                show: false,
            },

            stroke: {
                curve: "smooth",
                width: 1,
                colors: ["#803900", "#C7A180"],
            },
            xaxis: {
                type: 'category',
                categories: ["Interior", "Exterior", "Other’s"],
                labels: {
                    style: {
                        colors: ["#8F4300", "#8F4300", "#8F4300"],
                        fontSize: '16px',
                        fontWeight: 400,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                    axisBorder: {
                        show: true,
                        color: '#78909C',
                        height: 1,
                        width: '100%',
                        offsetX: 0,
                        offsetY: 0
                    },
                },
            },
            yaxis: {
                show: false,
                labels: {
                    show: false,
                    formatter: function (val) {
                        return val + "%";
                    }
                }
            },
            // dataLabels: {
            //     enabled: false,
            //     enabledOnSeries: [1],
            // },
        },
    });
    return (
        <motion.div
            className={sidebar ? "taskMain " : "cx-active taskMain"}
            id="cx-main"
            variants={aninations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.1 }} >
            <div id="cx-wrapper">
                <div className="main-dashboard-wrapper CustomerProfile">
                    <div id="cx-wrapper" className="New_inspition">
                        <div className="CustomerProfile-head">
                            <div className="porile-img">
                                <img src={profile} alt="porfile" />
                            </div>
                        </div>
                    </div>
                    <div className="information-card m-0">
                        <div className="information-head">
                            <div className="imformation-heading">
                                <p>Vehicle Information</p>
                            </div>
                        </div>
                        <div className="information-contain  row">
                            <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                <p className="discription-heading">Vehicle Number</p>
                                <p className="discription-contain">MH09AJ5022</p>
                            </div>
                            <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                <p className="discription-heading">Vehicle Type</p>
                                <p className="discription-contain">Utility Cab</p>
                            </div>
                            <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                <p className="discription-heading">Vehicle Name</p>
                                <p className="discription-contain">Honda</p>
                            </div>
                            <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                <p className="discription-heading">Last Inspection Date</p>
                                <p className="discription-contain">02-02-2023, 05:48PM</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="Accordian_Body_View">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Inspection-0010
                                <span>
                                    <a href={pdfdown} onClick={exportPDF} download>Download
                                        <img src={Download2} alt="" />
                                    </a>
                                </span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="information-card m-0">
                                    <div className="information-contain  row">
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Inspection Date</p>
                                            <p className="discription-contain">02-02-2023, 05:49 PM</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Requested By</p>
                                            <p className="discription-contain">Rohit Sharma</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Inspected By</p>
                                            <p className="discription-contain">Driver- Rohit Sharma</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Vehicle Compliances</p>
                                            <p className="discription-contain">Engine Fault</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="Tab_Details_Inner">
                                    <div className="heading">Overview</div>
                                    <div className="Overview">
                                        <div className="row">
                                            <div className="col-lg-6 mb-4">
                                                <div className="Overview_Card">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="Overview_Card">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Card">
                                                    <div className="row innerOver">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Card">
                                                    <div className="row innerOver">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Highlights</div>
                                    <div className="Highlights">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Accident</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">RC Copy</p>
                                                    <p className="decition linked">Yes <span> ( Optional ) </span></p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Accessory Changed</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Insurance Copy</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Fine</p>
                                                    <p className="decition linked">Yes, Unpaid</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Service Logs</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Maintenance</p>
                                                    <p className="decition">02-02-2023,05:39PM</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Tyre Life</p>
                                                    <p className="decition">Checked and OK</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List mb-0">
                                                    <p className="labels">Fuel Expense</p>
                                                    <p className="decition">$500/month</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List mb-0">
                                                    <p className="labels">Odometer</p>
                                                    <p className="decition">67,000Kms</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Interior</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>Brake System</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parking Brakes</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake drums/ rotors</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadio3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake hose</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Low pressure warning device</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain">
                                                    <div className="left_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <label htmlFor="">Window Mirror</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Door Function</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Seat Head-rest</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Back-Seats</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Boot Flooring</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Car_map_Img">
                                                        <img src={Inerior_Car} alt="" />
                                                    </div>
                                                    <div className="Right_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Odometer</label>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Dashboard</label>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Electronic Controls</label>
                                                                <div className="line_Rindicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Gear Box</label>
                                                                <div className="line_Rindicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Floor Matting</label>
                                                                <div className="line_Rindicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Exterior</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>LIGHTING DEVICES</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                        <td>Head lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioE1" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE1" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE1" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioE2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tail lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadioE3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dash lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioE4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Turn Indicators</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioE5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain_Extarior">
                                                    <div className="left_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <label htmlFor="">Right Lights</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Bumper</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Bonet </label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Right Mirror</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Doors</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Door Handle</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator6">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Body</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator7">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Boot Door</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator8">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Reflectors</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator9">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Car_map_Img">
                                                        <img src={Exterior_car} alt="" />
                                                    </div>
                                                    <div className="Right_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Left Lights</label>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Turn Indicator</label>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Air Bumper</label>
                                                                <div className="line_Rindicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Windshield</label>
                                                                <div className="line_Rindicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Window Glass</label>
                                                                <div className="line_Rindicator10">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Roof Top</label>
                                                                <div className="line_Rindicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Back Glass</label>
                                                                <div className="line_Rindicator6">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Fuel Lid</label>
                                                                <div className="line_Rindicator7">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Plate Light</label>
                                                                <div className="line_Rindicator8">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Number Plate</label>
                                                                <div className="line_Rindicator9">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Others</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>Service</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                        <td>Door Oil</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { setImageModal(true) }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioO1" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO1" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO1" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Floor cleaning</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { setImageModal(true) }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioO2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Windshield water</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadioO3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dicky Matt</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioO4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tissue Paper Box</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioO5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map mt-4">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain_Others">
                                                    <img src={Car_Base} alt="" className='EmptyBody' />
                                                    <div className="common_indicatos">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Left Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Left Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single2">
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Left Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Left Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single3">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Right Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Right Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single4">
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Right Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Right Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Body_Contain_Tyer">
                                                <img src={Typer_maping} alt="" />
                                                <div className="common_indicatos">
                                                    <div className="List_single">
                                                        <div className="contain">
                                                            <img src={IN_yellow} alt="" />
                                                            <div className="labels_contain">
                                                                <p>Rear-Left Rim</p>
                                                                <label htmlFor="">Alloy Rim</label>
                                                            </div>
                                                            <div className="line_Rindicator12">
                                                                <img src={IN_dot} alt="" className="dot" />
                                                            </div>
                                                        </div>
                                                        <div className="contain">
                                                            <img src={IN_green} alt="" />
                                                            <div className="labels_contain">
                                                                <p>Rear-Left Tyre</p>
                                                                <label htmlFor="">MRF-185/60 R15</label>
                                                            </div>
                                                            <div className="line_Rindicator13">
                                                                <img src={IN_dot} alt="" className="dot" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Documents</div>
                                    <div className="Documents">
                                        <div className="row">
                                            <div className="col-lg-6 mb-4">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Registration certificate
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_1} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Insurance Copy
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_2} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Last service invoice
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_4} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        pollution certificate
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_3} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Interior Images</div>
                                    <div className="InteriorImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior1} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior2} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior3} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior4} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior5} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior6} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior7} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior8} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior9} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Exterior Images</div>
                                    <div className="ExteriorImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages1} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages2} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages3} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages4} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages5} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages6} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages7} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages8} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages9} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Other Images</div>
                                    <div className="OtherImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages1} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages2} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages3} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages4} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages5} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages6} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages7} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages8} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages9} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Inspection-0240</Accordion.Header>
                            <Accordion.Body>
                                <div className="information-card m-0">
                                    <div className="information-contain  row">
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Inspection Date</p>
                                            <p className="discription-contain">02-02-2023, 05:49 PM</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Requested By</p>
                                            <p className="discription-contain">Rohit Sharma</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Inspected By</p>
                                            <p className="discription-contain">Driver- Rohit Sharma</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Vehicle Compliances</p>
                                            <p className="discription-contain">Engine Fault</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="Tab_Details_Inner">
                                    <div className="heading">Overview</div>
                                    <div className="Overview">
                                        <div className="row">
                                            <div className="col-lg-6 mb-4">
                                                <div className="Overview_Card">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="Overview_Card">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Card">
                                                    <div className="row innerOver">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Card">
                                                    <div className="row innerOver">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Highlights</div>
                                    <div className="Highlights">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Accident</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">RC Copy</p>
                                                    <p className="decition linked">Yes <span> ( Optional ) </span></p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Accessory Changed</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Insurance Copy</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Fine</p>
                                                    <p className="decition linked">Yes, Unpaid</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Service Logs</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Maintenance</p>
                                                    <p className="decition">02-02-2023,05:39PM</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Tyre Life</p>
                                                    <p className="decition">Checked and OK</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List mb-0">
                                                    <p className="labels">Fuel Expense</p>
                                                    <p className="decition">$500/month</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List mb-0">
                                                    <p className="labels">Odometer</p>
                                                    <p className="decition">67,000Kms</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Interior</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>Brake System</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parking Brakes</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake drums/ rotors</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadio3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake hose</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Low pressure warning device</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain">
                                                    <div className="left_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <label htmlFor="">Window Mirror</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Door Function</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Seat Head-rest</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Back-Seats</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Boot Flooring</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Car_map_Img">
                                                        <img src={Inerior_Car} alt="" />
                                                    </div>
                                                    <div className="Right_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Odometer</label>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Dashboard</label>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Electronic Controls</label>
                                                                <div className="line_Rindicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Gear Box</label>
                                                                <div className="line_Rindicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Floor Matting</label>
                                                                <div className="line_Rindicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Exterior</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>LIGHTING DEVICES</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                        <td>Head lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioE1" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE1" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE1" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioE2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tail lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadioE3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dash lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioE4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Turn Indicators</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioE5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain_Extarior">
                                                    <div className="left_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <label htmlFor="">Right Lights</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Bumper</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Bonet </label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Right Mirror</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Doors</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Door Handle</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator6">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Body</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator7">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Boot Door</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator8">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Reflectors</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator9">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Car_map_Img">
                                                        <img src={Exterior_car} alt="" />
                                                    </div>
                                                    <div className="Right_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Left Lights</label>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Turn Indicator</label>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Air Bumper</label>
                                                                <div className="line_Rindicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Windshield</label>
                                                                <div className="line_Rindicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Window Glass</label>
                                                                <div className="line_Rindicator10">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Roof Top</label>
                                                                <div className="line_Rindicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Back Glass</label>
                                                                <div className="line_Rindicator6">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Fuel Lid</label>
                                                                <div className="line_Rindicator7">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Plate Light</label>
                                                                <div className="line_Rindicator8">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Number Plate</label>
                                                                <div className="line_Rindicator9">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Others</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>Service</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                        <td>Door Oil</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { setImageModal(true) }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioO1" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO1" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO1" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Floor cleaning</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { setImageModal(true) }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioO2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Windshield water</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadioO3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dicky Matt</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioO4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tissue Paper Box</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioO5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map mt-4">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain_Others">
                                                    <img src={Car_Base} alt="" className='EmptyBody' />
                                                    <div className="common_indicatos">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Left Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Left Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single2">
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Left Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Left Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single3">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Right Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Right Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single4">
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Right Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Right Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Body_Contain_Tyer">
                                                <img src={Typer_maping} alt="" />
                                                <div className="common_indicatos">
                                                    <div className="List_single">
                                                        <div className="contain">
                                                            <img src={IN_yellow} alt="" />
                                                            <div className="labels_contain">
                                                                <p>Rear-Left Rim</p>
                                                                <label htmlFor="">Alloy Rim</label>
                                                            </div>
                                                            <div className="line_Rindicator12">
                                                                <img src={IN_dot} alt="" className="dot" />
                                                            </div>
                                                        </div>
                                                        <div className="contain">
                                                            <img src={IN_green} alt="" />
                                                            <div className="labels_contain">
                                                                <p>Rear-Left Tyre</p>
                                                                <label htmlFor="">MRF-185/60 R15</label>
                                                            </div>
                                                            <div className="line_Rindicator13">
                                                                <img src={IN_dot} alt="" className="dot" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Documents</div>
                                    <div className="Documents">
                                        <div className="row">
                                            <div className="col-lg-6 mb-4">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Registration certificate
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_1} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Insurance Copy
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_2} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Last service invoice
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_4} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        pollution certificate
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_3} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Interior Images</div>
                                    <div className="InteriorImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior1} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior2} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior3} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior4} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior5} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior6} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior7} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior8} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior9} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Exterior Images</div>
                                    <div className="ExteriorImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages1} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages2} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages3} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages4} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages5} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages6} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages7} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages8} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages9} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Other Images</div>
                                    <div className="OtherImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages1} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages2} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages3} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages4} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages5} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages6} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages7} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages8} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages9} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Inspection-0038</Accordion.Header>
                            <Accordion.Body>
                                <div className="information-card m-0">
                                    <div className="information-contain  row">
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Inspection Date</p>
                                            <p className="discription-contain">02-02-2023, 05:49 PM</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Requested By</p>
                                            <p className="discription-contain">Rohit Sharma</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Inspected By</p>
                                            <p className="discription-contain">Driver- Rohit Sharma</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Vehicle Compliances</p>
                                            <p className="discription-contain">Engine Fault</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="Tab_Details_Inner">
                                    <div className="heading">Overview</div>
                                    <div className="Overview">
                                        <div className="row">
                                            <div className="col-lg-6 mb-4">
                                                <div className="Overview_Card">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="Overview_Card">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Card">
                                                    <div className="row innerOver">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Card">
                                                    <div className="row innerOver">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Highlights</div>
                                    <div className="Highlights">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Accident</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">RC Copy</p>
                                                    <p className="decition linked">Yes <span> ( Optional ) </span></p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Accessory Changed</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Insurance Copy</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Fine</p>
                                                    <p className="decition linked">Yes, Unpaid</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Service Logs</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Maintenance</p>
                                                    <p className="decition">02-02-2023,05:39PM</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Tyre Life</p>
                                                    <p className="decition">Checked and OK</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List mb-0">
                                                    <p className="labels">Fuel Expense</p>
                                                    <p className="decition">$500/month</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List mb-0">
                                                    <p className="labels">Odometer</p>
                                                    <p className="decition">67,000Kms</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Interior</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>Brake System</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parking Brakes</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake drums/ rotors</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadio3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake hose</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Low pressure warning device</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain">
                                                    <div className="left_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <label htmlFor="">Window Mirror</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Door Function</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Seat Head-rest</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Back-Seats</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Boot Flooring</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Car_map_Img">
                                                        <img src={Inerior_Car} alt="" />
                                                    </div>
                                                    <div className="Right_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Odometer</label>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Dashboard</label>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Electronic Controls</label>
                                                                <div className="line_Rindicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Gear Box</label>
                                                                <div className="line_Rindicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Floor Matting</label>
                                                                <div className="line_Rindicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Exterior</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>LIGHTING DEVICES</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                        <td>Head lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioE1" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE1" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE1" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioE2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tail lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadioE3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dash lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioE4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Turn Indicators</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioE5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain_Extarior">
                                                    <div className="left_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <label htmlFor="">Right Lights</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Bumper</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Bonet </label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Right Mirror</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Doors</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Door Handle</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator6">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Body</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator7">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Boot Door</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator8">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Reflectors</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator9">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Car_map_Img">
                                                        <img src={Exterior_car} alt="" />
                                                    </div>
                                                    <div className="Right_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Left Lights</label>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Turn Indicator</label>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Air Bumper</label>
                                                                <div className="line_Rindicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Windshield</label>
                                                                <div className="line_Rindicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Window Glass</label>
                                                                <div className="line_Rindicator10">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Roof Top</label>
                                                                <div className="line_Rindicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Back Glass</label>
                                                                <div className="line_Rindicator6">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Fuel Lid</label>
                                                                <div className="line_Rindicator7">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Plate Light</label>
                                                                <div className="line_Rindicator8">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Number Plate</label>
                                                                <div className="line_Rindicator9">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Others</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>Service</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                        <td>Door Oil</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { setImageModal(true) }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioO1" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO1" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO1" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Floor cleaning</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { setImageModal(true) }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioO2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Windshield water</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadioO3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dicky Matt</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioO4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tissue Paper Box</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioO5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map mt-4">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain_Others">
                                                    <img src={Car_Base} alt="" className='EmptyBody' />
                                                    <div className="common_indicatos">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Left Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Left Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single2">
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Left Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Left Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single3">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Right Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Right Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single4">
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Right Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Right Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Body_Contain_Tyer">
                                                <img src={Typer_maping} alt="" />
                                                <div className="common_indicatos">
                                                    <div className="List_single">
                                                        <div className="contain">
                                                            <img src={IN_yellow} alt="" />
                                                            <div className="labels_contain">
                                                                <p>Rear-Left Rim</p>
                                                                <label htmlFor="">Alloy Rim</label>
                                                            </div>
                                                            <div className="line_Rindicator12">
                                                                <img src={IN_dot} alt="" className="dot" />
                                                            </div>
                                                        </div>
                                                        <div className="contain">
                                                            <img src={IN_green} alt="" />
                                                            <div className="labels_contain">
                                                                <p>Rear-Left Tyre</p>
                                                                <label htmlFor="">MRF-185/60 R15</label>
                                                            </div>
                                                            <div className="line_Rindicator13">
                                                                <img src={IN_dot} alt="" className="dot" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Documents</div>
                                    <div className="Documents">
                                        <div className="row">
                                            <div className="col-lg-6 mb-4">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Registration certificate
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_1} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Insurance Copy
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_2} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Last service invoice
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_4} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        pollution certificate
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_3} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Interior Images</div>
                                    <div className="InteriorImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior1} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior2} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior3} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior4} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior5} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior6} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior7} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior8} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior9} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Exterior Images</div>
                                    <div className="ExteriorImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages1} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages2} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages3} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages4} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages5} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages6} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages7} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages8} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages9} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Other Images</div>
                                    <div className="OtherImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages1} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages2} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages3} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages4} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages5} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages6} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages7} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages8} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages9} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Inspection-0148</Accordion.Header>
                            <Accordion.Body>
                                <div className="information-card m-0">
                                    <div className="information-contain  row">
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Inspection Date</p>
                                            <p className="discription-contain">02-02-2023, 05:49 PM</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Requested By</p>
                                            <p className="discription-contain">Rohit Sharma</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Inspected By</p>
                                            <p className="discription-contain">Driver- Rohit Sharma</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Vehicle Compliances</p>
                                            <p className="discription-contain">Engine Fault</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="Tab_Details_Inner">
                                    <div className="heading">Overview</div>
                                    <div className="Overview">
                                        <div className="row">
                                            <div className="col-lg-6 mb-4">
                                                <div className="Overview_Card">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="Overview_Card">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Card">
                                                    <div className="row innerOver">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Card">
                                                    <div className="row innerOver">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Highlights</div>
                                    <div className="Highlights">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Accident</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">RC Copy</p>
                                                    <p className="decition linked">Yes <span> ( Optional ) </span></p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Accessory Changed</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Insurance Copy</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Fine</p>
                                                    <p className="decition linked">Yes, Unpaid</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Service Logs</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Maintenance</p>
                                                    <p className="decition">02-02-2023,05:39PM</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Tyre Life</p>
                                                    <p className="decition">Checked and OK</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List mb-0">
                                                    <p className="labels">Fuel Expense</p>
                                                    <p className="decition">$500/month</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List mb-0">
                                                    <p className="labels">Odometer</p>
                                                    <p className="decition">67,000Kms</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Interior</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>Brake System</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parking Brakes</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake drums/ rotors</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadio3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake hose</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Low pressure warning device</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain">
                                                    <div className="left_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <label htmlFor="">Window Mirror</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Door Function</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Seat Head-rest</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Back-Seats</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Boot Flooring</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Car_map_Img">
                                                        <img src={Inerior_Car} alt="" />
                                                    </div>
                                                    <div className="Right_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Odometer</label>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Dashboard</label>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Electronic Controls</label>
                                                                <div className="line_Rindicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Gear Box</label>
                                                                <div className="line_Rindicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Floor Matting</label>
                                                                <div className="line_Rindicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Exterior</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>LIGHTING DEVICES</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                        <td>Head lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioE1" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE1" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE1" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioE2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tail lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadioE3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dash lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioE4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Turn Indicators</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioE5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain_Extarior">
                                                    <div className="left_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <label htmlFor="">Right Lights</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Bumper</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Bonet </label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Right Mirror</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Doors</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Door Handle</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator6">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Body</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator7">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Boot Door</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator8">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Reflectors</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator9">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Car_map_Img">
                                                        <img src={Exterior_car} alt="" />
                                                    </div>
                                                    <div className="Right_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Left Lights</label>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Turn Indicator</label>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Air Bumper</label>
                                                                <div className="line_Rindicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Windshield</label>
                                                                <div className="line_Rindicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Window Glass</label>
                                                                <div className="line_Rindicator10">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Roof Top</label>
                                                                <div className="line_Rindicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Back Glass</label>
                                                                <div className="line_Rindicator6">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Fuel Lid</label>
                                                                <div className="line_Rindicator7">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Plate Light</label>
                                                                <div className="line_Rindicator8">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Number Plate</label>
                                                                <div className="line_Rindicator9">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Others</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>Service</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                        <td>Door Oil</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { setImageModal(true) }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioO1" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO1" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO1" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Floor cleaning</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { setImageModal(true) }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioO2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Windshield water</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadioO3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dicky Matt</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioO4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tissue Paper Box</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioO5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map mt-4">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain_Others">
                                                    <img src={Car_Base} alt="" className='EmptyBody' />
                                                    <div className="common_indicatos">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Left Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Left Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single2">
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Left Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Left Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single3">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Right Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Right Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single4">
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Right Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Right Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Body_Contain_Tyer">
                                                <img src={Typer_maping} alt="" />
                                                <div className="common_indicatos">
                                                    <div className="List_single">
                                                        <div className="contain">
                                                            <img src={IN_yellow} alt="" />
                                                            <div className="labels_contain">
                                                                <p>Rear-Left Rim</p>
                                                                <label htmlFor="">Alloy Rim</label>
                                                            </div>
                                                            <div className="line_Rindicator12">
                                                                <img src={IN_dot} alt="" className="dot" />
                                                            </div>
                                                        </div>
                                                        <div className="contain">
                                                            <img src={IN_green} alt="" />
                                                            <div className="labels_contain">
                                                                <p>Rear-Left Tyre</p>
                                                                <label htmlFor="">MRF-185/60 R15</label>
                                                            </div>
                                                            <div className="line_Rindicator13">
                                                                <img src={IN_dot} alt="" className="dot" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Documents</div>
                                    <div className="Documents">
                                        <div className="row">
                                            <div className="col-lg-6 mb-4">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Registration certificate
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_1} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Insurance Copy
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_2} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Last service invoice
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_4} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        pollution certificate
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_3} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Interior Images</div>
                                    <div className="InteriorImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior1} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior2} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior3} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior4} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior5} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior6} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior7} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior8} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior9} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Exterior Images</div>
                                    <div className="ExteriorImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages1} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages2} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages3} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages4} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages5} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages6} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages7} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages8} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages9} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Other Images</div>
                                    <div className="OtherImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages1} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages2} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages3} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages4} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages5} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages6} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages7} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages8} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages9} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Inspection-1089</Accordion.Header>
                            <Accordion.Body>
                                <div className="information-card m-0">
                                    <div className="information-contain  row">
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Inspection Date</p>
                                            <p className="discription-contain">02-02-2023, 05:49 PM</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Requested By</p>
                                            <p className="discription-contain">Rohit Sharma</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Inspected By</p>
                                            <p className="discription-contain">Driver- Rohit Sharma</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Vehicle Compliances</p>
                                            <p className="discription-contain">Engine Fault</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="Tab_Details_Inner">
                                    <div className="heading">Overview</div>
                                    <div className="Overview">
                                        <div className="row">
                                            <div className="col-lg-6 mb-4">
                                                <div className="Overview_Card">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="Overview_Card">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Card">
                                                    <div className="row innerOver">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Card">
                                                    <div className="row innerOver">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Highlights</div>
                                    <div className="Highlights">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Accident</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">RC Copy</p>
                                                    <p className="decition linked">Yes <span> ( Optional ) </span></p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Accessory Changed</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Insurance Copy</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Fine</p>
                                                    <p className="decition linked">Yes, Unpaid</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Service Logs</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Maintenance</p>
                                                    <p className="decition">02-02-2023,05:39PM</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Tyre Life</p>
                                                    <p className="decition">Checked and OK</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List mb-0">
                                                    <p className="labels">Fuel Expense</p>
                                                    <p className="decition">$500/month</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List mb-0">
                                                    <p className="labels">Odometer</p>
                                                    <p className="decition">67,000Kms</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Interior</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>Brake System</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parking Brakes</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake drums/ rotors</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadio3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake hose</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Low pressure warning device</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain">
                                                    <div className="left_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <label htmlFor="">Window Mirror</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Door Function</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Seat Head-rest</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Back-Seats</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Boot Flooring</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Car_map_Img">
                                                        <img src={Inerior_Car} alt="" />
                                                    </div>
                                                    <div className="Right_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Odometer</label>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Dashboard</label>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Electronic Controls</label>
                                                                <div className="line_Rindicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Gear Box</label>
                                                                <div className="line_Rindicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Floor Matting</label>
                                                                <div className="line_Rindicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Exterior</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>LIGHTING DEVICES</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                        <td>Head lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioE1" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE1" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE1" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioE2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tail lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadioE3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dash lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioE4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Turn Indicators</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioE5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain_Extarior">
                                                    <div className="left_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <label htmlFor="">Right Lights</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Bumper</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Bonet </label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Right Mirror</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Doors</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Door Handle</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator6">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Body</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator7">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Boot Door</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator8">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Reflectors</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator9">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Car_map_Img">
                                                        <img src={Exterior_car} alt="" />
                                                    </div>
                                                    <div className="Right_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Left Lights</label>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Turn Indicator</label>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Air Bumper</label>
                                                                <div className="line_Rindicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Windshield</label>
                                                                <div className="line_Rindicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Window Glass</label>
                                                                <div className="line_Rindicator10">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Roof Top</label>
                                                                <div className="line_Rindicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Back Glass</label>
                                                                <div className="line_Rindicator6">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Fuel Lid</label>
                                                                <div className="line_Rindicator7">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Plate Light</label>
                                                                <div className="line_Rindicator8">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Number Plate</label>
                                                                <div className="line_Rindicator9">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Others</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>Service</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                        <td>Door Oil</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { setImageModal(true) }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioO1" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO1" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO1" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Floor cleaning</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { setImageModal(true) }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioO2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Windshield water</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadioO3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dicky Matt</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioO4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tissue Paper Box</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioO5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map mt-4">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain_Others">
                                                    <img src={Car_Base} alt="" className='EmptyBody' />
                                                    <div className="common_indicatos">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Left Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Left Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single2">
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Left Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Left Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single3">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Right Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Right Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single4">
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Right Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Right Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Body_Contain_Tyer">
                                                <img src={Typer_maping} alt="" />
                                                <div className="common_indicatos">
                                                    <div className="List_single">
                                                        <div className="contain">
                                                            <img src={IN_yellow} alt="" />
                                                            <div className="labels_contain">
                                                                <p>Rear-Left Rim</p>
                                                                <label htmlFor="">Alloy Rim</label>
                                                            </div>
                                                            <div className="line_Rindicator12">
                                                                <img src={IN_dot} alt="" className="dot" />
                                                            </div>
                                                        </div>
                                                        <div className="contain">
                                                            <img src={IN_green} alt="" />
                                                            <div className="labels_contain">
                                                                <p>Rear-Left Tyre</p>
                                                                <label htmlFor="">MRF-185/60 R15</label>
                                                            </div>
                                                            <div className="line_Rindicator13">
                                                                <img src={IN_dot} alt="" className="dot" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Documents</div>
                                    <div className="Documents">
                                        <div className="row">
                                            <div className="col-lg-6 mb-4">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Registration certificate
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_1} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Insurance Copy
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_2} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Last service invoice
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_4} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        pollution certificate
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_3} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Interior Images</div>
                                    <div className="InteriorImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior1} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior2} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior3} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior4} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior5} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior6} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior7} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior8} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior9} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Exterior Images</div>
                                    <div className="ExteriorImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages1} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages2} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages3} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages4} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages5} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages6} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages7} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages8} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages9} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Other Images</div>
                                    <div className="OtherImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages1} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages2} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages3} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages4} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages5} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages6} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages7} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages8} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages9} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header>Inspection-0010</Accordion.Header>
                            <Accordion.Body>
                                <div className="information-card m-0">
                                    <div className="information-contain  row">
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Inspection Date</p>
                                            <p className="discription-contain">02-02-2023, 05:49 PM</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Requested By</p>
                                            <p className="discription-contain">Rohit Sharma</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Inspected By</p>
                                            <p className="discription-contain">Driver- Rohit Sharma</p>
                                        </div>
                                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 form_input_main mb-0">
                                            <p className="discription-heading">Vehicle Compliances</p>
                                            <p className="discription-contain">Engine Fault</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="Tab_Details_Inner">
                                    <div className="heading">Overview</div>
                                    <div className="Overview">
                                        <div className="row">
                                            <div className="col-lg-6 mb-4">
                                                <div className="Overview_Card">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="Overview_Card">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Card">
                                                    <div className="row innerOver">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Card">
                                                    <div className="row innerOver">
                                                        <div className="col-lg-6">
                                                            <div className="progress_over">

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="Overview_Contain">
                                                                <div className="over_Heading">
                                                                    Interiors
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={red} alt="" />
                                                                    10 Immediate Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={yellow} alt="" />
                                                                    5 Attention Required
                                                                </div>
                                                                <div className="over_List">
                                                                    <img src={green} alt="" />
                                                                    60 Checked and OK
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Highlights</div>
                                    <div className="Highlights">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Accident</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">RC Copy</p>
                                                    <p className="decition linked">Yes <span> ( Optional ) </span></p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Accessory Changed</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Insurance Copy</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Fine</p>
                                                    <p className="decition linked">Yes, Unpaid</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Service Logs</p>
                                                    <p className="decition linked">Yes</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Vehicle Maintenance</p>
                                                    <p className="decition">02-02-2023,05:39PM</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List">
                                                    <p className="labels">Tyre Life</p>
                                                    <p className="decition">Checked and OK</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List mb-0">
                                                    <p className="labels">Fuel Expense</p>
                                                    <p className="decition">$500/month</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Highlights_List mb-0">
                                                    <p className="labels">Odometer</p>
                                                    <p className="decition">67,000Kms</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Interior</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>Brake System</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parking Brakes</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake drums/ rotors</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadio3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake hose</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadio4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadio4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Low pressure warning device</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadio5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadio5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadio5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain">
                                                    <div className="left_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <label htmlFor="">Window Mirror</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Door Function</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Seat Head-rest</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Back-Seats</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Boot Flooring</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Car_map_Img">
                                                        <img src={Inerior_Car} alt="" />
                                                    </div>
                                                    <div className="Right_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Odometer</label>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Dashboard</label>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Electronic Controls</label>
                                                                <div className="line_Rindicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Gear Box</label>
                                                                <div className="line_Rindicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Floor Matting</label>
                                                                <div className="line_Rindicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Exterior</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>LIGHTING DEVICES</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                        <td>Head lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioE1" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE1" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE1" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Brake lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioE2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tail lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadioE3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dash lights</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioE4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioE4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Turn Indicators</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioE5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioE5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioE5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain_Extarior">
                                                    <div className="left_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <label htmlFor="">Right Lights</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Bumper</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Bonet </label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Right Mirror</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Doors</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Door Handle</label>
                                                                <img src={IN_red} alt="" />
                                                                <div className="line_indicator6">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Body</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator7">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Boot Door</label>
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="line_indicator8">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <label htmlFor="">Reflectors</label>
                                                                <img src={IN_green} alt="" />
                                                                <div className="line_indicator9">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Car_map_Img">
                                                        <img src={Exterior_car} alt="" />
                                                    </div>
                                                    <div className="Right_Listing">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Left Lights</label>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Turn Indicator</label>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Air Bumper</label>
                                                                <div className="line_Rindicator3">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Windshield</label>
                                                                <div className="line_Rindicator4">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Window Glass</label>
                                                                <div className="line_Rindicator10">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Roof Top</label>
                                                                <div className="line_Rindicator5">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Back Glass</label>
                                                                <div className="line_Rindicator6">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <label htmlFor="">Fuel Lid</label>
                                                                <div className="line_Rindicator7">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <label htmlFor="">Plate Light</label>
                                                                <div className="line_Rindicator8">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <label htmlFor="">Number Plate</label>
                                                                <div className="line_Rindicator9">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Others</div>
                                    <div className="Interior">
                                        <div className="heading">
                                            <p>Service</p>
                                            <div className="alert_tab">
                                                <div className="single_alert">
                                                    <img src={yellow} alt="" />
                                                    <label htmlFor="">1 Attention Required</label>
                                                </div>
                                                <div className="single_alert">
                                                    <img src={red} alt="" />
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
                                                        <td>Door Oil</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { setImageModal(true) }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioO1" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO1" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO1" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Floor cleaning</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { setImageModal(true) }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO2" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioO2" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO2" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Windshield water</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO3" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO3" value="" /></td>
                                                        <td className='RedNo'><input type="radio" defaultChecked name="muhRadioO3" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dicky Matt</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" name="muhRadioO4" value="" /></td>
                                                        <td className='Yellow'><input type="radio" defaultChecked name="muhRadioO4" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO4" value="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tissue Paper Box</td>
                                                        <td className='Upload_Section'>
                                                            <img src={view} alt="" onClick={() => { handleShow() }} />
                                                        </td>
                                                        <td className='GreenOk'><input type="radio" defaultChecked name="muhRadioO5" value="" /></td>
                                                        <td className='Yellow'><input type="radio" name="muhRadioO5" value="" /></td>
                                                        <td className='RedNo'><input type="radio" name="muhRadioO5" value="" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interior_car_map mt-4">
                                                <div className="head_indecator">
                                                    <div className="single_indicator">
                                                        <img src={IN_green} alt="" />
                                                        <label htmlFor="">Checked And OK</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_yellow} alt="" />
                                                        <label htmlFor="">May Require Attention</label>
                                                    </div>
                                                    <div className="single_indicator">
                                                        <img src={IN_red} alt="" />
                                                        <label htmlFor="">Requires Immediate Attention</label>
                                                    </div>
                                                </div>
                                                <div className="body_contain_Others">
                                                    <img src={Car_Base} alt="" className='EmptyBody' />
                                                    <div className="common_indicatos">
                                                        <div className="List_single">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Left Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Left Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single2">
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Left Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Left Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single3">
                                                            <div className="contain">
                                                                <img src={IN_yellow} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Right Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Front-Right Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="List_single4">
                                                            <div className="contain">
                                                                <img src={IN_green} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Right Rim</p>
                                                                    <label htmlFor="">Alloy Rim</label>
                                                                </div>
                                                                <div className="line_Rindicator1">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                            <div className="contain">
                                                                <img src={IN_red} alt="" />
                                                                <div className="labels_contain">
                                                                    <p>Rear-Right Tyre</p>
                                                                    <label htmlFor="">MRF-185/60 R15</label>
                                                                </div>
                                                                <div className="line_Rindicator2">
                                                                    <img src={IN_dot} alt="" className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Body_Contain_Tyer">
                                                <img src={Typer_maping} alt="" />
                                                <div className="common_indicatos">
                                                    <div className="List_single">
                                                        <div className="contain">
                                                            <img src={IN_yellow} alt="" />
                                                            <div className="labels_contain">
                                                                <p>Rear-Left Rim</p>
                                                                <label htmlFor="">Alloy Rim</label>
                                                            </div>
                                                            <div className="line_Rindicator12">
                                                                <img src={IN_dot} alt="" className="dot" />
                                                            </div>
                                                        </div>
                                                        <div className="contain">
                                                            <img src={IN_green} alt="" />
                                                            <div className="labels_contain">
                                                                <p>Rear-Left Tyre</p>
                                                                <label htmlFor="">MRF-185/60 R15</label>
                                                            </div>
                                                            <div className="line_Rindicator13">
                                                                <img src={IN_dot} alt="" className="dot" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Documents</div>
                                    <div className="Documents">
                                        <div className="row">
                                            <div className="col-lg-6 mb-4">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Registration certificate
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_1} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Insurance Copy
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_2} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        Last service invoice
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_4} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single_Documents">
                                                    <div className="heading_Documents">
                                                        pollution certificate
                                                    </div>
                                                    <div className="Body_Document">
                                                        <img src={Document_3} alt="Doc" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Interior Images</div>
                                    <div className="InteriorImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior1} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior2} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior3} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior4} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior5} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior6} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior7} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior8} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single_image_inatior">
                                                    <img src={Imtarior9} alt="" className="Image_Inatrior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Exterior Images</div>
                                    <div className="ExteriorImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages1} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages2} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages3} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages4} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages5} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages6} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages7} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages8} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Extarior_card">
                                                    <img src={ExteriorImages9} alt="" className="Image_Extarior" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading">Other Images</div>
                                    <div className="OtherImages">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages1} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages2} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages3} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages4} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages5} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages6} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages7} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages8} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Single_Card_Other">
                                                    <img src={OtherImages9} alt="" className="Image_other" />
                                                    <p>Cluster Meter</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
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
                        </div>
                        <div className="current">
                            <div className="bodt_Cureent">
                                <div className="modal_headin">Current</div>
                                <img src={Repair_car} alt="" />
                                <div className="catopn_static">
                                    <p className="click">Clicked By- Driver, John Doe</p>
                                    <p className="time">02-02-23,04:59 PM</p>
                                </div>
                            </div>
                            <div className="remark">
                                <p>Remark</p><span>Not in good Condition</span>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* //PDF Inspection */}
            {/* <div className='DRFINSPECTION'>
                <PDFExport
                    ref={pdfExportComponent} paperSize="A4"
                    fileName="Inpection"
                    forcePageBreak=".page-break"
                >
                    <div className='FrontPage'>
                        <div className="TopSection">
                            <img src={PDFprofile} alt="" />
                        </div>
                        <div className="bodyHeading">
                            <div className="logo">
                                <img src={Logo} alt="" />
                            </div>
                        </div>
                        <div className="lastSection">
                            <p>VEHICLE <br /> INSPECTION <br /> REPORT</p>
                            <p className="bottomP">www.vehicletrackingsystem.com</p>
                        </div>
                    </div>
                    <div className='page-break SecondPage'>
                        <div className="header">
                            <img src={Logo} alt="" />
                            <div className="Name">Vehicle Inspection Report</div>
                            <img src={HeaderLeftLogo} alt="" />
                        </div>
                        <div className="body">
                            <div className="Section1">
                                <img src={CarView} alt="" />
                            </div>
                            <div className="DetailsSection">
                                <div className="Heading">Vehicle Details</div>
                                <div className="row">
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Number</p>
                                            <p className='Deatils'>MH12GG2022</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Registration No.</p>
                                            <p className='Deatils'>221100336654860</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Type</p>
                                            <p className='Deatils'>Car</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Registration Date</p>
                                            <p className='Deatils'>01-02-1997</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Name</p>
                                            <p className='Deatils'>Honda</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Insurance Validity</p>
                                            <p className='Deatils'>05-02-2023</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Color</p>
                                            <p className='Deatils'>White</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Engine No.</p>
                                            <p className='Deatils'>12345678910</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Driver Name</p>
                                            <p className='Deatils'>Driver Name</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Location</p>
                                            <p className='Deatils'>Vishtrantwadi, Kalas road, <br /> Pune, Maharashtara.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="DreiverDetails">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="CardDetails">
                                            <div className="Heading">Requested By</div>
                                            <div className="RequestedBy">
                                                <img src={ProfilePhoto} alt="" className='ProImg' />
                                                <div className="leftContain">
                                                    <div className="singleRow">
                                                        <img src={Persone} alt="" />
                                                        <p>Rohit Sharma</p>
                                                    </div>
                                                    <div className="singleRow">
                                                        <img src={Drive} alt="" />
                                                        <p>Driver</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="CardDetails">
                                            <div className="Heading">Inspected By</div>
                                            <div className="RequestedBy">
                                                <img src={ProfilePhoto} alt="" className='ProImg' />
                                                <div className="leftContain">
                                                    <div className="singleRow">
                                                        <img src={Persone} alt="" />
                                                        <p>Rohit Sharma</p>
                                                    </div>
                                                    <div className="singleRow">
                                                        <img src={Star} alt="" />
                                                        <p>+ 4yrs EXPERIENCE</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="DetailsSection">
                                <div className="Heading">Highlights</div>
                                <div className="row">
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Accident</p>
                                            <p className='Deatils'>YES</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>RC Copy</p>
                                            <p className='Deatils'>YES</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Accessories Changed</p>
                                            <p className='Deatils'>YES</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Insurance Copy</p>
                                            <p className='Deatils'>YES</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Fine</p>
                                            <p className='Deatils'>YES,UNPAID</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Pollution Certificate</p>
                                            <p className='Deatils'>YES</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Maintenance</p>
                                            <p className='Deatils'>02-02-2023, 05:56PM</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Odometer</p>
                                            <p className='Deatils'>76,000KMS</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Fuel Expense</p>
                                            <p className='Deatils'>$300/ MONTH</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="singleLine">
                                            <p className='MAinHeading'>Tyre Life</p>
                                            <p className='Deatils'>CHECKED AND OK</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Footer">
                            <p className="webLink">www.vehicletrackingsystem.com</p>
                            <p className="PageIndicator">Page 01/13</p>
                        </div>
                    </div>
                    <div className='page-break ThridPage'>
                        <div className="header">
                            <img src={Logo} alt="" />
                            <div className="Name">Vehicle Inspection Report</div>
                            <img src={HeaderLeftLogo} alt="" />
                        </div>
                        <div className="body">
                            <div className="heading">Overview</div>
                            <div className="card_wrapper">
                                <div className="sigle_Card">
                                    <div className="Overview_Card">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="progress_over">

                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Contain">
                                                    <div className="over_Heading">
                                                        Interiors
                                                    </div>
                                                    <div className="over_List">
                                                        <img src={red} alt="" />
                                                        10 Immediate Attention Required
                                                    </div>
                                                    <div className="over_List">
                                                        <img src={yellow} alt="" />
                                                        5 Attention Required
                                                    </div>
                                                    <div className="over_List">
                                                        <img src={green} alt="" />
                                                        60 Checked and OK
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border_dash_Right"></div>
                                </div>
                                <div className="sigle_Card_Right">
                                    <div className="Overview_Card">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="progress_over">

                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Contain">
                                                    <div className="over_Heading">
                                                        Exterior
                                                    </div>
                                                    <div className="over_List">
                                                        <img src={red} alt="" />
                                                        10 Immediate Attention Required
                                                    </div>
                                                    <div className="over_List">
                                                        <img src={yellow} alt="" />
                                                        5 Attention Required
                                                    </div>
                                                    <div className="over_List">
                                                        <img src={green} alt="" />
                                                        60 Checked and OK
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border_dash_Left"></div>
                                    </div>
                                </div>
                                <div className="sigle_Card">
                                    <div className="Overview_Card">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="progress_over">

                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Contain">
                                                    <div className="over_Heading">
                                                        Other’s
                                                    </div>
                                                    <div className="over_List">
                                                        <img src={red} alt="" />
                                                        10 Immediate Attention Required
                                                    </div>
                                                    <div className="over_List">
                                                        <img src={yellow} alt="" />
                                                        5 Attention Required
                                                    </div>
                                                    <div className="over_List">
                                                        <img src={green} alt="" />
                                                        60 Checked and OK
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border_dash_Right"></div>
                                </div>
                                <div className="sigle_Card_Right">
                                    <div className="Overview_Card">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="progress_over">

                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="Overview_Contain">
                                                    <div className="over_Heading">
                                                        Overall Performance
                                                    </div>
                                                    <div className="over_List">
                                                        <img src={red} alt="" />
                                                        10 Immediate Attention Required
                                                    </div>
                                                    <div className="over_List">
                                                        <img src={yellow} alt="" />
                                                        5 Attention Required
                                                    </div>
                                                    <div className="over_List">
                                                        <img src={green} alt="" />
                                                        60 Checked and OK
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border_dash_Left"></div>
                                    </div>
                                </div>
                                <div className="sigle_Card">
                                    <div className="Overview_Card">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="Overview_Contain p-4">
                                                    <div className="over_Heading">
                                                        Remark
                                                    </div>
                                                    <div className="over_List">
                                                        Vehicle is not advised to drive, Need immediate attention. Vehicle cannot be driven.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Footer">
                            <p className="webLink">www.vehicletrackingsystem.com</p>
                            <p className="PageIndicator">Page 01/13</p>
                        </div>
                    </div>
                    <div className='page-break IntaropPDF'>
                        <div className="header">
                            <img src={Logo} alt="" />
                            <div className="Name">Vehicle Inspection Report</div>
                            <img src={HeaderLeftLogo} alt="" />
                        </div>
                        <div className="body">
                            <div className="headingMain">Interiors</div>
                            <div className="Interior">
                                <div className="heading">
                                    <p>Brake System</p>
                                    <div className="alert_tab">
                                        <div className="single_alert">
                                            <img src={yellow} alt="" />
                                            <label htmlFor="">1 Attention Required</label>
                                        </div>
                                        <div className="single_alert">
                                            <img src={red} alt="" />
                                            <label htmlFor="">1 Immediate Attention Required</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="Brake_Contain">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name of Part / Particular</th>
                                                <th>Checked and OK</th>
                                                <th>May Require Attention</th>
                                                <th>Requires Immediate Attention</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Service Brakes</td>
                                                <td className='GreenOk'><input type="radio" defaultChecked value="" /></td>
                                                <td className='Yellow'><input type="radio" disabled value="" /></td>
                                                <td className='RedNo'><input type="radio" disabled value="" /></td>
                                            </tr>
                                            <tr>
                                                <td>Parking Brakes</td>
                                                <td className='GreenOk'><input type="radio" disabled value="" /></td>
                                                <td className='Yellow'><input type="radio" defaultChecked value="" /></td>
                                                <td className='RedNo'><input type="radio" disabled value="" /></td>
                                            </tr>
                                            <tr>
                                                <td>Brake drums/ rotors</td>
                                                <td className='GreenOk'><input type="radio" disabled value="" /></td>
                                                <td className='Yellow'><input type="radio" disabled value="" /></td>
                                                <td className='RedNo'><input type="radio" defaultChecked value="" /></td>
                                            </tr>
                                            <tr>
                                                <td>Brake hose</td>
                                                <td className='GreenOk'><input type="radio" disabled value="" /></td>
                                                <td className='Yellow'><input type="radio" defaultChecked value="" /></td>
                                                <td className='RedNo'><input type="radio" disabled value="" /></td>
                                            </tr>
                                            <tr>
                                                <td>Low pressure warning device</td>
                                                <td className='GreenOk'><input type="radio" defaultChecked value="" /></td>
                                                <td className='Yellow'><input type="radio" disabled value="" /></td>
                                                <td className='RedNo'><input type="radio" disabled value="" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="Interior">
                                <div className="heading">
                                    <p>Brake System</p>
                                    <div className="alert_tab">
                                        <div className="single_alert">
                                            <img src={yellow} alt="" />
                                            <label htmlFor="">1 Attention Required</label>
                                        </div>
                                        <div className="single_alert">
                                            <img src={red} alt="" />
                                            <label htmlFor="">1 Immediate Attention Required</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="Brake_Contain">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name of Part / Particular</th>
                                                <th>Checked and OK</th>
                                                <th>May Require Attention</th>
                                                <th>Requires Immediate Attention</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Service Brakes</td>
                                                <td className='GreenOk'><input type="radio" defaultChecked value="" /></td>
                                                <td className='Yellow'><input type="radio" disabled value="" /></td>
                                                <td className='RedNo'><input type="radio" disabled value="" /></td>
                                            </tr>
                                            <tr>
                                                <td>Parking Brakes</td>
                                                <td className='GreenOk'><input type="radio" disabled value="" /></td>
                                                <td className='Yellow'><input type="radio" defaultChecked value="" /></td>
                                                <td className='RedNo'><input type="radio" disabled value="" /></td>
                                            </tr>
                                            <tr>
                                                <td>Brake drums/ rotors</td>
                                                <td className='GreenOk'><input type="radio" disabled value="" /></td>
                                                <td className='Yellow'><input type="radio" disabled value="" /></td>
                                                <td className='RedNo'><input type="radio" defaultChecked value="" /></td>
                                            </tr>
                                            <tr>
                                                <td>Brake hose</td>
                                                <td className='GreenOk'><input type="radio" disabled value="" /></td>
                                                <td className='Yellow'><input type="radio" defaultChecked value="" /></td>
                                                <td className='RedNo'><input type="radio" disabled value="" /></td>
                                            </tr>
                                            <tr>
                                                <td>Low pressure warning device</td>
                                                <td className='GreenOk'><input type="radio" defaultChecked value="" /></td>
                                                <td className='Yellow'><input type="radio" disabled value="" /></td>
                                                <td className='RedNo'><input type="radio" disabled value="" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="Interior">
                                <div className="heading">
                                    <p>Brake System</p>
                                    <div className="alert_tab">
                                        <div className="single_alert">
                                            <img src={yellow} alt="" />
                                            <label htmlFor="">1 Attention Required</label>
                                        </div>
                                        <div className="single_alert">
                                            <img src={red} alt="" />
                                            <label htmlFor="">1 Immediate Attention Required</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="Brake_Contain">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name of Part / Particular</th>
                                                <th>Checked and OK</th>
                                                <th>May Require Attention</th>
                                                <th>Requires Immediate Attention</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Service Brakes</td>
                                                <td className='GreenOk'><input type="radio" defaultChecked value="" /></td>
                                                <td className='Yellow'><input type="radio" disabled value="" /></td>
                                                <td className='RedNo'><input type="radio" disabled value="" /></td>
                                            </tr>
                                            <tr>
                                                <td>Parking Brakes</td>
                                                <td className='GreenOk'><input type="radio" disabled value="" /></td>
                                                <td className='Yellow'><input type="radio" defaultChecked value="" /></td>
                                                <td className='RedNo'><input type="radio" disabled value="" /></td>
                                            </tr>
                                            <tr>
                                                <td>Brake drums/ rotors</td>
                                                <td className='GreenOk'><input type="radio" disabled value="" /></td>
                                                <td className='Yellow'><input type="radio" disabled value="" /></td>
                                                <td className='RedNo'><input type="radio" defaultChecked value="" /></td>
                                            </tr>
                                            <tr>
                                                <td>Brake hose</td>
                                                <td className='GreenOk'><input type="radio" disabled value="" /></td>
                                                <td className='Yellow'><input type="radio" defaultChecked value="" /></td>
                                                <td className='RedNo'><input type="radio" disabled value="" /></td>
                                            </tr>
                                            <tr>
                                                <td>Low pressure warning device</td>
                                                <td className='GreenOk'><input type="radio" defaultChecked value="" /></td>
                                                <td className='Yellow'><input type="radio" disabled value="" /></td>
                                                <td className='RedNo'><input type="radio" disabled value="" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="Footer">
                            <p className="webLink">www.vehicletrackingsystem.com</p>
                            <p className="PageIndicator">Page 01/13</p>
                        </div>
                    </div>
                </PDFExport >
            </div > */}
            
        </motion.div >



    )
}

export default ViewInspectionDetails
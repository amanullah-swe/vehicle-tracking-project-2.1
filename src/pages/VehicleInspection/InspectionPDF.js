import React from 'react'
import { PDFExport } from '@progress/kendo-react-pdf';
// import { Image } from '@progress/kendo-react-common';
import profile from "../../assets/images/InspetionPDF/FrontPageProfile.svg"
import HeaderLeftLogo from "../../assets/images/InspetionPDF/HeaderLeftLogo.svg"
import CarView from "../../assets/images/InspetionPDF/CarView.svg"
import ProfilePhoto from "../../assets/images/InspetionPDF/ProfilePhoto.svg"
import Persone from "../../assets/images/InspetionPDF/Persone.svg"
import Drive from "../../assets/images/InspetionPDF/Drive.svg"
import Star from "../../assets/images/InspetionPDF/Star.svg"
import red from "../../assets/images/Red_Tri.svg"
import yellow from "../../assets/images/Yellow_Tri.svg"
import green from "../../assets/images/Green-check.svg"
import Logo from "../../assets/images/Web-Application-Logo.svg"
import IN_dot from "../../assets/images/IN_dot.svg"
import IN_green from "../../assets/images/IN_green.svg"
import IN_yellow from "../../assets/images/IN_Red.svg"
import IN_red from "../../assets/images/IN_yellow.svg"
import Inerior_Car from "../../assets/images/Inerior_Car.svg"
import Car_Base from "../../assets/images/Car_Base.svg"
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
import Document_1 from "../../assets/images/Document_1.svg"
import Document_2 from "../../assets/images/Document_2.svg"
import Document_3 from "../../assets/images/Document_3.svg"
import Document_4 from "../../assets/images/Document_4.svg"
import Exterior_car from "../../assets/images/Exterior_car.svg"

const InspectionPDF = () => {
    const pdfExportComponent = React.useRef(null);

    const exportPDF = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    return (
        <div>
            <button onClick={exportPDF}>Export PDF</button>
            <PDFExport
                ref={pdfExportComponent} paperSize="A4"
                fileName="Inpection"
                forcePageBreak=".page-break"
            >
                <div className='FrontPage'>
                    <div className="TopSection">
                        <img src={profile} alt="" />
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
                        <p className="PageIndicator">Page 02/13</p>
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
                        <p className="PageIndicator">Page 03/13</p>
                    </div>
                </div>
                <div className="page-break Intarior_Img_Map">
                    <div className="header">
                        <img src={Logo} alt="" />
                        <div className="Name">Vehicle Inspection Report</div>
                        <img src={HeaderLeftLogo} alt="" />
                    </div>
                    <div className="body">
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
                        <div className="InteriorImagesMap">
                            <div className="heading">Interior Images</div>
                            <div className="imageWrpper">
                                <div className="singlrimg">
                                    <img src={Imtarior7} alt="" />
                                    <label htmlFor="">Front AC Vent</label>
                                </div>
                                <div className="singlrimg">
                                    <img src={Imtarior7} alt="" />
                                    <label htmlFor="">Front AC Vent</label>
                                </div>
                                <div className="singlrimg">
                                    <img src={Imtarior7} alt="" />
                                    <label htmlFor="">Front AC Vent</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Footer">
                        <p className="webLink">www.vehicletrackingsystem.com</p>
                        <p className="PageIndicator">Page 04/13</p>
                    </div>
                </div>
                <div className="page-break Intarior_Img_View">
                    <div className="header">
                        <img src={Logo} alt="" />
                        <div className="Name">Vehicle Inspection Report</div>
                        <img src={HeaderLeftLogo} alt="" />
                    </div>
                    <div className="body">
                        <div className="heading">
                            Interior Images
                        </div>
                        <div className="View_body">
                            <div className="single_view">
                                <img src={Imtarior8} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={Imtarior7} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={Imtarior9} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages1} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages2} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages3} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={Imtarior7} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={Imtarior7} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={Imtarior7} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                        </div>
                    </div>

                    <div className="Footer">
                        <p className="webLink">www.vehicletrackingsystem.com</p>
                        <p className="PageIndicator">Page 05/13</p>
                    </div>
                </div>
                <div className='page-break IntaropPDF'>
                    <div className="header">
                        <img src={Logo} alt="" />
                        <div className="Name">Vehicle Inspection Report</div>
                        <img src={HeaderLeftLogo} alt="" />
                    </div>
                    <div className="body">
                        <div className="headingMain">Exterior</div>
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
                        <p className="PageIndicator">Page 03/13</p>
                    </div>
                </div>
                <div className="page-break ExtariorMapIMage">
                    <div className="header">
                        <img src={Logo} alt="" />
                        <div className="Name">Vehicle Inspection Report</div>
                        <img src={HeaderLeftLogo} alt="" />
                    </div>
                    <div className="body">
                        <div className="heading">
                            Exterior
                        </div>
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
                        <div className="InteriorImagesMap">
                            <div className="heading">Interior Images</div>
                            <div className="imageWrpper">
                                <div className="singlrimg">
                                    <img src={Imtarior7} alt="" />
                                    <label htmlFor="">Front AC Vent</label>
                                </div>
                                <div className="singlrimg">
                                    <img src={Imtarior7} alt="" />
                                    <label htmlFor="">Front AC Vent</label>
                                </div>
                                <div className="singlrimg">
                                    <img src={Imtarior7} alt="" />
                                    <label htmlFor="">Front AC Vent</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Footer">
                        <p className="webLink">www.vehicletrackingsystem.com</p>
                        <p className="PageIndicator">Page 03/13</p>
                    </div>
                </div>
                <div className="page-break Intarior_Img_View">
                    <div className="header">
                        <img src={Logo} alt="" />
                        <div className="Name">Vehicle Inspection Report</div>
                        <img src={HeaderLeftLogo} alt="" />
                    </div>
                    <div className="body">
                        <div className="heading">
                            Exterior Images
                        </div>
                        <div className="View_body">
                            <div className="single_view">
                                <img src={ExteriorImages5} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages4} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages9} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages1} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages2} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages3} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages7} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages6} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages8} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                        </div>
                    </div>

                    <div className="Footer">
                        <p className="webLink">www.vehicletrackingsystem.com</p>
                        <p className="PageIndicator">Page 05/13</p>
                    </div>
                </div>
                <div className='page-break IntaropPDF'>
                    <div className="header">
                        <img src={Logo} alt="" />
                        <div className="Name">Vehicle Inspection Report</div>
                        <img src={HeaderLeftLogo} alt="" />
                    </div>
                    <div className="body">
                        <div className="headingMain">Other’s</div>
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
                        <p className="PageIndicator">Page 03/13</p>
                    </div>
                </div>
                <div className="page-break OtherMapImages">
                    <div className="header">
                        <img src={Logo} alt="" />
                        <div className="Name">Vehicle Inspection Report</div>
                        <img src={HeaderLeftLogo} alt="" />
                    </div>
                    <div className="body">
                        <div className="heading">
                            Other's
                        </div>
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
                    </div>
                    <div className="Footer">
                        <p className="webLink">www.vehicletrackingsystem.com</p>
                        <p className="PageIndicator">Page 03/13</p>
                    </div>
                </div>
                <div className="page-break Intarior_Img_View">
                    <div className="header">
                        <img src={Logo} alt="" />
                        <div className="Name">Vehicle Inspection Report</div>
                        <img src={HeaderLeftLogo} alt="" />
                    </div>
                    <div className="body">
                        <div className="heading">
                            Exterior Images
                        </div>
                        <div className="View_body">
                            <div className="single_view">
                                <img src={ExteriorImages3} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages7} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages6} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages8} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages5} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages4} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages9} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages1} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                            <div className="single_view">
                                <img src={ExteriorImages2} alt="" />
                                <label htmlFor="">Cluster Meter</label>
                            </div>
                        </div>
                    </div>

                    <div className="Footer">
                        <p className="webLink">www.vehicletrackingsystem.com</p>
                        <p className="PageIndicator">Page 05/13</p>
                    </div>
                </div>
                <div className="page-break DocumentsUpload">
                    <div className="header">
                        <img src={Logo} alt="" />
                        <div className="Name">Vehicle Inspection Report</div>
                        <img src={HeaderLeftLogo} alt="" />
                    </div> <div className="body">
                        <div className="heading">
                            Documents
                        </div>
                        <div className="View_all_Documents row">
                            <div className="Single_Documents">
                                <img src={Document_1} alt="" />
                                <label htmlFor="">Registration Certificate</label>
                            </div>
                            <div className="Single_Documents">
                                <img src={Document_2} alt="" />
                                <label htmlFor="">Insurance Copy</label>
                            </div>
                            <div className="Single_Documents">
                                <img src={Document_3} alt="" />
                                <label htmlFor="">Service Copy</label>
                            </div>
                            <div className="Single_Documents">
                                <img src={Document_4} alt="" />
                                <label htmlFor="">Pollution Certificate </label>
                            </div>
                        </div>
                    </div>
                    <div className="Footer">
                        <p className="webLink">www.vehicletrackingsystem.com</p>
                        <p className="PageIndicator">Page 05/13</p>
                    </div>
                </div>
                <div className="page-break InspectorRemark">
                    218418
                </div>
            </PDFExport >
        </div >
    );
};


export default InspectionPDF
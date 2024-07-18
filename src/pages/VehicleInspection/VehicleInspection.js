import { React, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import DDlogo from "../../assets/images/smallDD.svg";
import Calendar from "../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import SideIc from "../../assets/images/sideBar.svg";
import Delete from "../../assets/images/delete.svg";
import View from "../../assets/images/Group.svg";
import EditIc from "../../assets/images/ic-edit.svg";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import export_icon from "../../assets/images/export_icon.svg";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
import Pagenation from "../../sharedComponent/Pagenation";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";


const VehicleInspection = () => {
    const accessRights = useSelector((state) => state.auth.accessRights);
    const userRole = accessRights && accessRights.rights_role;

    const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
    const [startDate, setStartDate] = useState(new Date());
    const [deleteModal, setDeleteModal] = useState(false);
    const { t, i18n } = useTranslation();
    const [endDate, setEndDate] = useState("")

    const aninations = {
        initial: { opacity: 0, x: 400 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
    };
    const renderTooltipForView = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            View
        </Tooltip>
    );
    return (
        <>
            <motion.div
                className={sidebar ? "taskMain " : "cx-active taskMain"}
                id="cx-main"
                variants={aninations}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.1 }} >
                <div id="cx-wrapper" className="Vehicle_inspition">
                    {/* Top inputs for instatnt search */}
                    <div className="Header_Top">
                        <div className="">
                            <Form.Select
                                required
                                as="select"
                                type="select"
                                name="Speed_limit"
                                className="innerCust"
                            >
                                <option value="">Vehicle Type</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="150">150</option>
                            </Form.Select>
                        </div>
                        <div className="">
                            <Form.Control
                                required
                                type="text"
                                placeholder="Vehicle Name, Number..."
                                className="innerCust"
                            />
                        </div>
                        <div
                            className="datepicker-main"
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="date to"
                        >
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                className="form-control"
                                placeholderText="Inspection Date"
                            />
                            <img src={Calendar} className="calendarLogo" alt="" />
                        </div>
                        <div className="">
                            <Form.Control
                                required
                                type="text"
                                placeholder="Inspection By"
                                className="innerCust"
                            />
                        </div>
                        <div
                            className="datepicker-main"
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="date to"
                        >
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                className="form-control"
                                placeholderText="Due Date"
                            />
                            <img src={Calendar} className="calendarLogo" alt="" />
                        </div>
                        {
                            userRole === "customer" ||
                                (accessRights &&
                                    accessRights?.rights_manage_vehicle_inspection_dashboard) ? (
                                <>
                                    <div className="">
                                        <Link to="/NewInspection" className="AddAccidentLink">
                                            <button className="VInspition">+ {t("New Inspection")}</button>
                                        </Link>
                                    </div>
                                    <div className="headerDivIc diffBtns form_input_main">
                                        <Link to="#">
                                            <img src={SideIc} alt="" />
                                        </Link>
                                    </div>
                                    <div className="headerDivIc diffBtns form_input_main">
                                        <Link to="#">
                                            <img src={export_icon} alt="" />
                                        </Link>
                                    </div>
                                </>
                            ) : null
                        }

                    </div>
                    {/* Vehicle table */}
                    <div className="main-master-wrapper">
                        <div id="scroll_insideThe_Padding_tabel">
                            <div className="VA_table">
                                <table className="table tableAdmin">
                                    <thead className="tableHead">
                                        <tr>
                                            <th>{t("Sr.no")}</th>
                                            <th>{t("Vehicle Type")}</th>
                                            <th>{t("Vehicle Number")}</th>
                                            <th>{t("Inspection Date")}</th>
                                            <th>{t("Requested By")}</th>
                                            <th>{t("Inspected by")}</th>
                                            <th>{t("Vehicle Compliances")}</th>
                                            <th>{t("Action")}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tableBody">
                                        <tr>
                                            <td>1</td>
                                            <td>Van</td>
                                            <td>MH12AA1234</td>
                                            <td>01-01-2023</td>
                                            <td>John Doe</td>
                                            <td>Fleet Manager- John Doe</td>
                                            <td>Ok ! Can be Driven</td>
                                            <td>
                                                <div className="innerFlex">
                                                    <Link to="/ViewInspectionDetails">
                                                        <img src={View} className="me-3" alt="" />
                                                    </Link>
                                                    {
                                                        userRole === "customer" ||
                                                            (accessRights &&
                                                                accessRights?.rights_manage_vehicle_inspection_dashboard) ? (
                                                            <Link to="/NewInspection">
                                                                <img src={EditIc} alt="" className="me-3" />
                                                            </Link>
                                                        ) : null
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Truck</td>
                                            <td>MH09FF4567</td>
                                            <td>15-08-2023</td>
                                            <td>John Doe</td>
                                            <td>Driver- K Gowtham</td>
                                            <td>Danger ! Engine Fault</td>
                                            <td>
                                                <div className="innerFlex">
                                                    <Link to="/ViewInspectionDetails">
                                                        <img src={View} className="me-3" alt="" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Utility Cab</td>
                                            <td>MH11GF1236</td>
                                            <td>09-10-2023</td>
                                            <td>John Doe</td>
                                            <td>Transport Manager- Kyle Richie</td>
                                            <td>Need Repair</td>
                                            <td>
                                                <div className="innerFlex">
                                                    <Link to="/ViewInspectionDetails">
                                                        <img src={View} className="me-3" alt="" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Pickup Van</td>
                                            <td>MH09GF0467</td>
                                            <td>22-04-2023</td>
                                            <td>John Deo</td>
                                            <td>Vehicle Assistant- James Bond</td>
                                            <td>Not Applicable</td>
                                            <td>
                                                <div className="innerFlex">
                                                    <Link to="/ViewInspectionDetails">
                                                        <img src={View} className="me-3" alt="" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>Car</td>
                                            <td>MH12KK9865</td>
                                            <td>01-01-2023</td>
                                            <td>John Doe</td>
                                            <td>Driver- Rohit Sharma</td>
                                            <td>Ok ! Can be Driven</td>
                                            <td>
                                                <div className="innerFlex">
                                                    <Link to="/ViewInspectionDetails">
                                                        <img src={View} className="me-3" alt="" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>Bus</td>
                                            <td>MH12AA1234</td>
                                            <td>15-08-2023</td>
                                            <td>John Doe</td>
                                            <td>Fleet Manager- John Doe</td>
                                            <td>Danger ! Engine Fault</td>
                                            <td>
                                                <div className="innerFlex">
                                                    <Link to="/ViewInspectionDetails">
                                                        <img src={View} className="me-3" alt="" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>School Bus</td>
                                            <td>MH09FF4567</td>
                                            <td>09-10-2023</td>
                                            <td>John Doe</td>
                                            <td>Driver- K Gowtham</td>
                                            <td>Need Repair</td>
                                            <td>
                                                <div className="innerFlex">
                                                    <Link to="/ViewInspectionDetails">
                                                        <img src={View} className="me-3" alt="" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>Bike</td>
                                            <td>MH11GF1236</td>
                                            <td>22-04-2023</td>
                                            <td>John Deo</td>
                                            <td>Transport Manager- Kyle Richie</td>
                                            <td>Not Applicable</td>
                                            <td>
                                                <div className="innerFlex">
                                                    <Link to="/ViewInspectionDetails">
                                                        <img src={View} className="me-3" alt="" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td>Premium Car</td>
                                            <td>Premium Car</td>
                                            <td>01-01-2023</td>
                                            <td>John Doe</td>
                                            <td>Vehicle Assistant- James Bond</td>
                                            <td>Ok ! Can be Driven</td>
                                            <td>
                                                <div className="innerFlex">
                                                    <Link to="/ViewInspectionDetails">
                                                        <img src={View} className="me-3" alt="" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>10</td>
                                            <td>Car</td>
                                            <td>MH12KK9865</td>
                                            <td>01-01-2023</td>
                                            <td>John Doe</td>
                                            <td>Driver- Rohit Sharma</td>
                                            <td>Ok ! Can be Driven</td>
                                            <td>
                                                <div className="innerFlex">
                                                    <Link to="/ViewInspectionDetails">
                                                        <img src={View} className="me-3" alt="" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>11</td>
                                            <td>Bus</td>
                                            <td>MH12AA1234</td>
                                            <td>15-08-2023</td>
                                            <td>John Doe</td>
                                            <td>Fleet Manager- John Doe</td>
                                            <td>Danger ! Engine Fault</td>
                                            <td>
                                                <div className="innerFlex">
                                                    <Link to="/ViewInspectionDetails">
                                                        <img src={View} className="me-3" alt="" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>12</td>
                                            <td>School Bus</td>
                                            <td>MH09FF4567</td>
                                            <td>09-10-2023</td>
                                            <td>John Doe</td>
                                            <td>Driver- K Gowtham</td>
                                            <td>Need Repair</td>
                                            <td>
                                                <div className="innerFlex">
                                                    <Link to="/ViewInspectionDetails">
                                                        <img src={View} className="me-3" alt="" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Pagenation />
                    </div>
                </div>
            </motion.div>

            {/* Delete Modal Start */}
            <Modal
                show={deleteModal}
                onHide={() => setDeleteModal(false)}
                centered
                className="common-model"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("Delete Customer Details")} </Modal.Title>
                </Modal.Header>
                <Modal.Body>{t("Are you sure you want to delete this Details")} ?</Modal.Body>
                <Modal.Footer className="pop-up-modal-footer">
                    <div class="btn-wrapper">
                        <button className="cx-btn-1" onClick={() => setDeleteModal(false)}>
                            {t("Cancel")}
                        </button>
                        <button className="cx-btn-2" onClick={() => setDeleteModal(false)}>
                            {t("Yes")}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* Delete Modal End */}
        </>
    );
};

export default VehicleInspection;

import React, { useContext, useState, } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../../../context/AppContext";
import Dropdown from 'react-bootstrap/Dropdown';
import CommonDatePicker from "../../../../sharedComponent/CommonDatePicker";


const TopDriversFilter = () => {
    const { sidebar, setSidebar, LinkReport, setDark } = useContext(AppContext);
    const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });
    const maxDate = new Date();

    const aninations = {
        initial: { opacity: 0, x: 400 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
    };
    const { t, i18n } = useTranslation();
    return (
        <>
            <motion.div
                variants={aninations}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.1 }}>
                <div className="topHeadFilter">
                    <div className="dropDowns">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                All Vehicles
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <input type="text" className="form-control mb-1" />
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="dropDowns">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                All Vehicles
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <input type="text" className="form-control mb-1" />
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="dropDowns">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                All Vehicles
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <input type="text" className="form-control mb-1" />
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="dropDowns">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                All Vehicles
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <input type="text" className="form-control mb-1" />
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="innerSelectBox weekCounter datepicker-main BGiMP mr-3">
                        <CommonDatePicker
                            dateKey={"toDayDate"}
                            setDate={setCurrentDate}
                            data={currentDate}
                            SetPlaceholder={"Today Date"}
                            dataDisbal={maxDate}
                        />
                    </div>
                    <div className="innerSelectBox weekCounter datepicker-main BGiMP mr-3">
                        <CommonDatePicker
                            dateKey={"toDayDate"}
                            setDate={setCurrentDate}
                            data={currentDate}
                            SetPlaceholder={"Today Date"}
                            dataDisbal={maxDate}
                        />
                    </div>
                    <div className="cornerBtn">
                        <button className="searchBtn">Search</button>
                        <button className="clearBtn">Clear</button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default TopDriversFilter;

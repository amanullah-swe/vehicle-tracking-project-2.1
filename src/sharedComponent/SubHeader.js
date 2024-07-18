import React, { useContext, useState, } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../src/context/AppContext";
import { useLocation, Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Import from "../../src/assets/images/ic-Import.svg"



const SubHeader = () => {

    const { sidebar, setSidebar, LinkReport, setOptionDynamicDownload } = useContext(AppContext);


    const currentRoute = useLocation().pathname;
    console.log(currentRoute);


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

                <div className="mainSubHeader">
                    <div className="heading"><h1>{
                        currentRoute === "/VehicleLocationReport" &&
                        t("Live Vehicles Location Report") ||
                        currentRoute === "/VehicleCountAndCapacity" &&
                        t("Vehicle Count And Seat Capacity") ||
                        currentRoute === "/VehicleparkingSlot" &&
                        t("Vehicle Parking Slot") ||
                        currentRoute === "/VehicleLocationSignal" &&
                        t("Vehicle Location Signal") ||
                        currentRoute === "/ImmobiliserReport" &&
                        t("Immobiliser Report") ||
                        currentRoute === "/Temperaturereport" &&
                        t("Temperature Sensor Report")
                    }</h1></div>
                    <div className="right-export-btn-section-wrapper">
                        <div className="c-pointer me-2"></div>
                        {
                            currentRoute !== "/VehicleCountAndCapacity" &&
                            <div className="md_dropdown">
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic">
                                        <img src={Import} height="30" width="30" alt="" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                            <Link
                                                onClick={() => setOptionDynamicDownload("pdf")}
                                                className="d-block"
                                            >
                                              {t("PDF")}  
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link
                                                onClick={() => setOptionDynamicDownload("excel")}
                                                className="d-block"
                                            >
                                             {t("Excel")}   
                                            </Link>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        }
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default SubHeader;

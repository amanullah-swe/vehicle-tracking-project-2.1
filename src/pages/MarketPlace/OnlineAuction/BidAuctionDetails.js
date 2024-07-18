import React, { useContext, useState, useEffect } from "react";
import { Carousel, Col, Dropdown, Modal, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BidAuctionDetails = () => {
    const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
    const aninations = {
        initial: { opacity: 0, x: 400 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
    };
    const { t, i18n } = useTranslation();
    return (
        <motion.div
            variants={aninations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.1 }}
            className={sidebar ? "taskMain " : "cx-active taskMain"}
            id="cx-main">
            <div id="cx-wrapper" className="bidAuctionDetails">
                <div className="row">
                    <div className="col-md-6">
                        <div className="GoodsCard">
                            <div className="goodsHeading">
                                <h1>Good Details</h1>
                            </div>
                            <div className="goodsContent">
                                <div className="innerDetailsFlex">
                                    <label htmlFor="" className="key">Reference Number</label>
                                    <label htmlFor="" className="value">LD-1234567891-1234</label>
                                </div>
                                <div className="innerDetailsFlex">
                                    <label htmlFor="" className="key">Company Name</label>
                                    <label htmlFor="" className="value">Shipping Company</label>
                                </div>
                                <div className="innerDetailsFlex">
                                    <label htmlFor="" className="key">Cargo Type</label>
                                    <label htmlFor="" className="value">Break Bulk</label>
                                </div>
                                <div className="innerDetailsFlex">
                                    <label htmlFor="" className="key">Quantity</label>
                                    <label htmlFor="" className="value">600 Quintals</label>
                                </div>
                                <div className="innerDetailsFlex">
                                    <label htmlFor="" className="key">Expected Arrival Time</label>
                                    <label htmlFor="" className="value">2023-09-20</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="auctionDetailCard">
                            <div className="auctionHeading">
                                <h1>Auction Details</h1>
                            </div>
                            <div className="auctionContent">
                                <div className="innerDetailsFlex">
                                    <label htmlFor="" className="key">Auction Name</label>
                                    <label htmlFor="" className="value">119</label>
                                </div>
                                <div className="innerDetailsFlex">
                                    <label htmlFor="" className="key">Auction Duration</label>
                                    <label htmlFor="" className="value">5Days</label>
                                </div>
                                <div className="innerDetailsFlex">
                                    <label htmlFor="" className="key">Auction Type</label>
                                    <label htmlFor="" className="value">---</label>
                                </div>
                                <div className="innerDetailsFlex">
                                    <label htmlFor="" className="key">Your Bid</label>
                                    <label htmlFor="" className="value">0</label>
                                </div>
                                <div className="innerDetailsFlex">
                                    <label htmlFor="" className="key">Start Date</label>
                                    <label htmlFor="" className="value">2023-09-20</label>
                                </div>
                                <div className="innerDetailsFlex">
                                    <label htmlFor="" className="key">End Date</label>
                                    <label htmlFor="" className="value">2023-09-20</label>
                                </div>
                            </div>
                            <div className="auctionFooter">
                                <div className="bidBox">
                                    <label htmlFor="" className="labeBid">Enter Bid Amount</label>
                                    <input type="text" className="form-control" value="500" />
                                    <Link to="/AuctionOfferDetails" className="bidLink">
                                        <button>Make a Bid</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default BidAuctionDetails;

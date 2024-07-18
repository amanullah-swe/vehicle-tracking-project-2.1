import React, { useContext, useState } from 'react';
// import trip_icon from "../assets/images/trip_icon.svg";
import trip_icon from "../../../../../assets/images/Report/RpoetSubCat.svg";
import AppContext from 'antd/es/app/context';
import { useTranslation } from "react-i18next";
const NewUiReport = () => {
    const { t } = useTranslation();
    const [tripList, setTripList] = useState([]);
    const {
        sidebar,
        customerData,
        useDebounce,
        recordsPerPage,
        timeZone,
      } = useContext(AppContext);
    return (
        <div className="row gx-3 main-cards-wrapper"       id="cx-main">
        {tripList?.map((trip, index) => {
            return (
              <div
                className={
                  sidebar ? "col-lg-4 col-md-6" : "col-lg-3 col-md-6"
                }
               
              >
                <div className={"common-vehical-card-inner cv-card p-0"}>
                  <div className="vehical-card-head">
                    <div className="heading">
                    <img src={trip_icon} alt="" />
                      <div className="">
                        <p className="sub-heading">{t("Trip Name")}</p>
                        <p
                          className="title text-truncate"
                          style={{ maxWidth: "180px" }}
                        >
                          {trip?.trip_name}
                        </p>
                      </div>
                    </div>
                    <div className="option customer-option">
                 
                    </div>
                  </div>
                  <div className="vehical-card-body row">
                    <div className="card-contain col-lg-6">
                      <p className="sub-heading">{t("Vehicle")}</p>
                      <p className="title">{trip?.vehicle_number}</p>
                    </div>
                    <div className="card-contain col-lg-6">
                      <p className="sub-heading">{t("Trip Category")}</p>
                      <p className="title">{trip?.trip_category}</p>
                    </div>
                    <div className="card-contain col-lg-6">
                      <p className="sub-heading">{t("Start Time")}</p>
                      <p className="title">{trip?.trip_start_time}</p>
                    </div>
                    <div className="card-contain col-lg-6">
                      <p className="sub-heading">{t("End Time")}</p>
                      <p className="title">{trip?.trip_end_time}</p>
                    </div>
                    <div className="card-contain col-lg-6">
                      <p className="sub-heading">{t("Driver Name")}</p>
                      <p className="title">{trip?.user_name}</p>
                    </div>
                    <div className="card-contain col-lg-6">
                      <p className="sub-heading">{t("Driver Email")}</p>
                      <p className="title">{trip?.user_email}</p>
                    </div>
                    <div className="card-contain col-lg-6">
                      <p className="sub-heading">{t("Number")}</p>
                      <p className="title">{trip?.user_mobile}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    );
};

export default NewUiReport;
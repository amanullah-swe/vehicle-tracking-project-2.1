import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { motion } from "framer-motion";
import { useParams } from 'react-router-dom';
import ApiConfig from '../../../api/ApiConfig';
import { simplePostCall } from '../../../api/ApiServices';
import { useTranslation } from 'react-i18next';
const EmailDetails = () => {
    const { sidebar, setSidebar, Dark, DriverStatus } = useContext(AppContext);
    const aninations = {
        initial: { opacity: 0, x: 400 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
    }; 
    const { t, i18n } = useTranslation();
    const [Details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    let UserId = params.id;
  
    useEffect(() => {
      if (DriverStatus === "driver") {
        geDetails();
      } else {
        geDetailsAsisment()
      }
    }, []);
    const geDetails = () => {
      setLoading(true)
  
      let newRequestBody = JSON.stringify({
        driver_id: UserId.toString(),
      });
      simplePostCall(ApiConfig.VIEW_DRIVER, newRequestBody)
        .then((res) => {
            setDetails(res.data);

        })
        .catch((err) => {
          console.log("err", err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    const geDetailsAsisment = () => {
        setLoading(true)
    
        let newRequestBody = JSON.stringify({
            helper_id: UserId.toString(),
        });
        simplePostCall(ApiConfig.VIEW_ASSISMENT, newRequestBody)
          .then((res) => {
              setDetails(res.data);
    
          })
          .catch((err) => {
            console.log("err", err);
          })
          .finally(() => {
            setLoading(false);
          });
      };
    return (
        <motion.div className={sidebar ? "taskMain " : "cx-active taskMain"} id="cx-main" variants={aninations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.1 }}>
            <div id='cx-wrapper'>
                <div className="main-master-wrapper information-card">
                    <div className="Heading">
                        {/* <p>{t("Subject Taleeb Here")}</p> */}
                        <p>{localStorage.getItem("taleeb_tab") === '2' ? t("Driver") : t("Helper") }</p>
                        {console.log("taleeb_Details : ",Details )}
                    </div>
                    <div className="information-contain row">
                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 mb-4">
                            <p className="discription-heading">{t("Trip Name")}</p>
                            <p className="discription-contain">{Details?.email_driver_route ? Details?.email_driver_route :Details?.email_helper_route}</p>
                        </div>
                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 mb-4">
                            <p className="discription-heading">{t("Vehicle")}</p>
                            <p className="discription-contain">{Details?.email_driver_vehicle ? Details?.email_driver_vehicle : Details?.email_helper_vehicle}</p>
                        </div>
                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 mb-4">
                            <p className="discription-heading">{DriverStatus === "driver" ? `${t("Driver")}` : `${t("helper")}`}</p>
                            <p className="discription-contain">{Details?.email_driver_driver? Details?.email_driver_driver :Details?.email_helper_helper}</p>
                        </div>
                        <div className="information-discriptiopn col-lg-12">
                            <p className="discription-heading">{t("Message")}</p>
                            <p className="discription-contain">{Details?.email_driver_message ? Details?.email_driver_message : Details?.email_helper_message}.</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default EmailDetails
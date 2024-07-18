import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { motion } from "framer-motion";
import ApiConfig from '../../../api/ApiConfig';
import { simplePostCall } from '../../../api/ApiServices';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const EmailDetailsDriver = () => {
    const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
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
      if (UserId) {
        geDetails();
      }
    }, []);
    const geDetails = () => {
      setLoading(true)
  
      let newRequestBody = JSON.stringify({
          id: UserId.toString(),
      });
      simplePostCall(ApiConfig.VIEW_EMAIL_TM, newRequestBody)
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
                        <p>{localStorage.getItem("taleeb_tab") === "0" ? t("Administrator") : localStorage.getItem("taleeb_tab") === "1" ? t("Transport Manager") : localStorage.getItem("taleeb_tab") === "3" ? t("Delivery Person") : localStorage.getItem("taleeb_tab") === "4" ? t("Fleet Manager") : t("Subject Here")}</p>
                        {console.log("taleeb_Details : ", Details)}
                    </div>
                    <div className="information-contain row">
                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 mb-4">
                            <p className="discription-heading">{t("Name")}</p>
                            <p className="discription-contain">{Details?.email_staff_name}</p>
                        </div>
                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 mb-4">
                            <p className="discription-heading">{t("Subject")}</p>
                            <p className="discription-contain">{Details?.email_staff_subject}</p>
                        </div>
                     
                        <div className="information-discriptiopn col-lg-12">
                            <p className="discription-heading">{t("Message")}</p>
                            <p className="discription-contain">{Details?.email_staff_message}.</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default EmailDetailsDriver
import React, { useContext, useEffect,useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { motion } from "framer-motion";
import { useParams } from 'react-router-dom';
import ApiConfig from '../../../api/ApiConfig';
import { simplePostCall } from '../../../api/ApiServices';
import { useTranslation } from 'react-i18next';
const NotificationDetails2 = () => {
    const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
    const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  }; 
  const { t, i18n } = useTranslation();
  const [pushDetails, setPushDetails] = useState([]);
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
        notification_tm_id: UserId.toString(),
    });
    simplePostCall(ApiConfig.PUSHI_NOTIFICATION_TM, newRequestBody)
      .then((res) => {
        setPushDetails(res.data);

      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };





  return (
        <motion.div className={sidebar ? "taskMain " : "cx-active taskMain"} id="cx-main"variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}>
            <div id='cx-wrapper'>
                <div className="main-master-wrapper information-card">
                    <div className="Heading">
                    <p>{pushDetails.notification_role ? 
                pushDetails.notification_role.charAt(0).toUpperCase() + 
                pushDetails.notification_role.slice(1).toLowerCase() : ''}</p>
                    </div>

                    {console.log("taleeb_PushDetails : ",pushDetails )}
                    <div className="information-contain row">
                        
                        <div className="information-discriptiopn col-lg-3 col-md-4 col-sm-6 mb-4">
                            <p className="discription-heading">{t("Transport Manager Name")}</p>
                            <p className="discription-contain">{pushDetails.notification_tm_name}</p>
                        </div>
                        <div className="information-discriptiopn col-lg-12">
                            <p className="discription-heading">{t("Message")}</p>
                            <p className="discription-contain">{pushDetails.notification_tm_message}.</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default NotificationDetails2

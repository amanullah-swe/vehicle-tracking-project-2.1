import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import no_data from "../assets/images/no_data.svg";
const NoPage = () => {
    const { sidebar, } = useContext(AppContext);
    const aninations = {
        initial: { opacity: 0, x: 400 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
      };
  return (
    <motion.div
        className={sidebar ? "taskMain " : "cx-active taskMain"}
        id="cx-main"
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
      >
        <div id="cx-wrapper">
        <div className=" no-data-found-wrapper ">
        <div className="no-data-found-inner-wrapper">
          <img src={no_data} alt="" />
          <p className="no-data-text">{("No Page  Found ")}</p>
        </div>
      </div>
        </div>
      </motion.div>
  )
}

export default NoPage
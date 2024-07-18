import React from "react";
import no_data from "../assets/images/no_data.svg";
import { useTranslation } from "react-i18next";

const NoDataComp = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <div className=" no-data-found-wrapper ">
        <div className="no-data-found-inner-wrapper">
          <img src={no_data} alt="" />
          <p className="no-data-text">{t("No Records to show")}</p>
        </div>
      </div>
    </div>
  );
};

export default NoDataComp;

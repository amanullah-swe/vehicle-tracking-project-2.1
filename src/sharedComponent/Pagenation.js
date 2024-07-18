import React from "react";
import { useTranslation } from "react-i18next";

const Pagenation = ({ length, total, comp }) => {
  const { t } = useTranslation();
  return (
    <p
      className={
        comp == "trip"
          ? "reg-colortrips"
          : comp == "Drivers"
            ? "reg-colorDriver"
            : comp == "FeatureSet"
              ? "reg-colorFeatureSet"
              : comp == "Merchant"
                ? "reg-colorMerchant" : comp === "regDispatch" ? "reg-color-dispatch" :
                  comp === "anounce" ? "reg-coloranaunce" : "reg-color"
      }
    >
      {t("Showing")} 1 - {length} {t("of")} {total}
      {/* {`Showing 1 - ${length} of ${total}`} */}
    </p>
  );
};

export default Pagenation;

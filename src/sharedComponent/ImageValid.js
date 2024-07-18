import React, { useContext, useState } from "react";
import dummy_vehicle_ic from "../assets/images/dummy_vehicle_ic.svg";
import dummy_Car from "../assets/images/black-car-logo.svg";
import ApiConfig from "../api/ApiConfig";
import { AppContext } from "../context/AppContext";
const ImageValid = ({ item, componentId }) => {
  const { customerData } = useContext(AppContext);
  const handleErrorImage = (ev) => {
    console.log("checking============= ", ev.target.src)
    ev.target.src = dummy_vehicle_ic;
  };
  return (
    <div>
      {item.vehicle_image_path || item.vehicle_type_icon ? (
        <img
          style={
            componentId == "Vehicledetails"
              ? { height: "100%", width: "100%" } :
              componentId == "viewDispatch" ? { height: "100px", width: "100px" } : { height: "50px", width: "50px" }
          }
          src={
            item?.vehicle_image_path &&
              item?.vehicle_image_path != "undefined" &&
              item?.vehicle_image_path != null &&
              item?.vehicle_image_path != ""
              ? `${ApiConfig.BASE_URL}${item?.vehicle_image_path}`
              : Number(item?.vehicle_type_icon) > 40
                ? `${ApiConfig.BASE_URL}uploads/${customerData.customer_id
                }/vehicle_type/${item?.vehicle_type_icon}/${item?.metering_status === "A"
                  ? "Parked"
                  : item?.metering_status === "B"
                    ? "Running"
                    : item?.metering_status === "d"
                      ? "Idle"
                      : "Untracked"
                }.png`
                : Number(item?.vehicle_type_icon) < 40
                  ? `${ApiConfig.BASE_URL}uploads/vehicle_type/${item?.vehicle_type_icon
                  }/${item?.metering_status === "A"
                    ? "Parked"
                    : item?.metering_status === "B"
                      ? "Running"
                      : item?.metering_status === "d"
                        ? "Idle"
                        : "Untracked"
                  }.svg`
                  : `${ApiConfig.BASE_URL}uploads/vehicle_type/${5}/${item?.metering_status === "A"
                    ? "Parked"
                    : item?.metering_status === "B"
                      ? "Running"
                      : item?.metering_status === "d"
                        ? "Idle"
                        : "Untracked"
                  }.svg`
          }
          onError={(ev) => {
            handleErrorImage(ev);
          }}
          alt="no icon"
        />
      ) : (
        <img
          style={
            componentId == "Vehicledetails"
              ? { height: "100%", width: "100%" } :
              componentId == "viewDispatch" ? { height: "100px", width: "100px" }
                : { height: "50px", width: "50px" }
          }
          src={dummy_vehicle_ic}
          alt="no vehicle icon"
        />
      )}
    </div>
  );
};

export default ImageValid;

import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
// import 'react-phone-input-2/lib/style.css';
import { countriesWithShortCode } from "./common";
import './MobilePhoneInput.scss'

const MobilePhoneInput = ({
  CommanCountry,
  commanNumber,
  commanContryCode,
  state,
  onChangeHandler,
}) => {
  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };
  const [randomValue, setRandomValue] = useState("");
  useEffect(() => {
    setRandomValue(`+${commanContryCode}${commanNumber}`);
  }, [commanNumber, commanContryCode, CommanCountry]);
  return (
    <div
      className="mobile-number-input-style"
      style={{ color: "rgb(143, 67, 0)" }}
    >
      <PhoneInput
        className="form_input_main"
        required={commanNumber ? true : false}
        placeholder="Enter phone number"
        country={getKeyByValue(
          countriesWithShortCode,
          CommanCountry
        )?.toLowerCase()}
        enableSearch={true}
        value={randomValue}
        onChange={onChangeHandler}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && commanContryCode && !commanNumber) {
            e.preventDefault();
          }
        }}
      />
    </div>
  );
};

export default MobilePhoneInput;

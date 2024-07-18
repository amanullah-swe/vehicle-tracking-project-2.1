import { useEffect } from "react";
import { React, useState } from "react";
import Select from "react-select";

const CommonSelect = ({
  disable,
  setID,
  single,
  optionList,
  data,
  setterFucntions,
  setterKey,
  placehold,
  selValue,
  setterFucntionsId,
  isMulti,
  selectedValue,
  setErrMsg,
  errMsg,
  componentId,
  errKey,
  selectedValueDefalt,
}) => {
  const [selectedOption, setSelectedOption] = useState([
    { label: selectedValue, value: selectedValue },
  ]);
  const customStyles = {
    control: (base) => ({
      ...base,
      color: "#8f4300",
      fontSize: 14,

      borderRadius: 10,
      border: "1px solid #f6efe9",
      backgroundColor: "white",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #f6efe9",
      },
      // boxShadow: "none",
    }),
  };

  useEffect(() => {
    if (selValue) {
      let option = optionList.filter(
        ({ value }) => value && value.label === selValue
      );
      if (option) {
        // setSelectedOption(option);
      }
    }
  }, [selValue, optionList]);
  return (
    <div>
      <Select
        isDisabled={disable ? disable : false}
        value={optionList && optionList?.find((item) => item.id == selValue)}
        onChange={(sel) => {
          setSelectedOption(sel);
          // setErrMsg({...errMsg,Data[setterKey]:""})
          if (single) {
            setterFucntions(sel.id);
          } else if (!data) {
            setterFucntions && setterFucntions(sel);
            setterFucntionsId(sel.id);
            // setErrMsg({...errMsg ,setterKey:""})
          } 

         
          else {
            let inputData = data;
            inputData[setterKey] = setID ? sel.id : sel;
            setterFucntions({ ...inputData });
          }

       

          if (componentId) {
            if (errKey === "dispatch") {
              setErrMsg({ ...errMsg, vehicle_type_id: "" });
            }
            if (errKey === "manual") {
              setErrMsg({ ...errMsg, vehicle_id: "" });
            }
          }
        }}
        placeholder={placehold}
        options={optionList}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,

          colors: {
            ...theme.colors,
            neutral50: "rgba(156, 73, 0, 0.5)",
            primary25: "#f6efe9",
            primary: "#8f4300",
            primary75: "#4C9AFF",
            background: "#8f4300",
            color: "#8f4300",
            cursor: "pointer",
          },
        })}
        isMulti={isMulti}
      />
    </div>
  );
};

export default CommonSelect;



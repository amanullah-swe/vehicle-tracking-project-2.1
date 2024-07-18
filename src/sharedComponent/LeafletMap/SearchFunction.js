import React, { useContext, useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import Form from "react-bootstrap/Form";
import { AppContext } from "../../context/AppContext";
import { async } from "q";
import { getLocationName } from "../../api/ApiServices";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
export const SearchFunction = ({
  address,
  comp,
  currentIndex,
  setStopData,
  setCustomerSetting,
  customerSetting,
  setter,
  data,
  setterKey,
  latKey,
  lngKey,
  valueSarch,
  errMsg,
  setErrMsg,
  // subkey
}) => {
  const {
    sidebar,
    place,
    setPlace,
    setRegionCord,
    setDraggedName,
    useDebounce,
    draggedName,
    seEditMerchantaddrees,
  } = useContext(AppContext);
  const [inputValue, setInputValue] = useState();
  // comp=="EditDispatchTrip"?valueSarch:comp === "EditCustomerDispatch" ? address : setterKey ? data[setterKey] : place
  const [inputValueSet, setInputValueSet] = useState("");

  seEditMerchantaddrees(inputValue);

  useEffect(() => {
    if (comp == "EditDispatchTrip" || comp == "DeliveryRequest") {
      setInputValue(data[setterKey]);
    } else {
      setInputValue(place);
    }
  }, []);

  useEffect(() => {
    if (!customerSetting?.customer_address) setInputValue("");
  }, [customerSetting?.customer_address]);

  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const [results, setResults] = useState([]); // State to store search results
  const [onchagneCalled, setOnchagneCalled] = useState();
  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length && onchagneCalled)
      searchPlace(debouncedSearchTerm);
  }, [debouncedSearchTerm, onchagneCalled]);
  // State to store search results
  const provider = new OpenStreetMapProvider(); // Instantiate the OpenStreetMapProvider

  const handleInputChange = async (event, comp, data) => {
    if (comp === "EditDispatchTrip" || comp === "EditCustomerDispatch1" || comp == "DeliveryRequest") {
      if (setterKey) {
        let allValues = { ...data };
        allValues[setterKey] = event.target.value;
        setter({ ...allValues });
      }
    }

    setOnchagneCalled(true);
    const input = event.target.value; 
    console.log(input);
    setInputValue(input);
  };

  const searchPlace = async (input) => {
    const searchResults = await provider.search({ query: input }); 
    setResults(searchResults); 
  };
  useEffect(() => {
    return () => {
      setInputValue("");
    };
  }, []);

  useEffect(() => {
    if (comp === "EditMerchant" && address && address.length > 0) {
      setInputValue(address);
    }
    if (comp == "EditDispatchTrip" || comp == "EditCustomerDispatch1" || comp == "DeliveryRequest") {
      setInputValue(valueSarch);
    }
  }, [comp, address]);
  useEffect(() => {
    if (draggedName) {
      setInputValue(draggedName?.display_name ? draggedName?.display_name : "");
    }
  }, [draggedName]);
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <div className="location-search-input-main">
        <Form.Control
          // required
          className="location-search-input"
          autocomplete="off"
          type="search"
          placeholder={t("Search Location")}
          name="query"
          onChange={(event) => {
            handleInputChange(event, comp, data);
            if (setterKey) {
              let allValues = { ...errMsg };
              allValues[setterKey] = "";
              setErrMsg({ ...allValues });
            }
          }}
          // :comp=="EditCustomerDispatch"?data[setterKey][currentIndex][subkey]
          value={
            comp == "EditDispatchTrip" || comp == "EditCustomerDispatch1" || comp == "DeliveryRequest"
              ? data[setterKey]
              : inputValue
          }
        />
        <Form.Control.Feedback type="invalid">
          Please Enter Address.
        </Form.Control.Feedback>
        <button
          className={
            comp == "EditDispatchTrip" || comp == "DeliveryRequest" && data[setterKey]?.length
              ? "cat-delete-btn"
              : place?.length > 0
              ? "cat-delete-btn"
              : "none"
          }
          type="button"
          onClick={() => {
            if (
              comp === "EditDispatchTrip" ||
              comp === "EditCustomerDispatch1" || 
              comp == "DeliveryRequest"
            ) {
              if (setterKey) {
                let allValues = { ...data };
                allValues[setterKey] = "";
                setter({ ...allValues });
              }
            }
            setPlace("");
            setResults([]);
            setInputValue("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
        {results.length ? (
          <ul className="Search_order">
            {results.map((result, index) => {
              return (
                <div
                  key={index}
                  onClick={async () => {
                    setPlace(result.label ? result.label : draggedName);
                    setRegionCord([result.y, result.x]);
                    // setInputValue(result.label)
                    setOnchagneCalled(false);
                    setResults([]);
                    let latLng = { lng: result.x, lat: result.y };
                    let loc = await getLocationName(latLng);
                    if (comp == "EditCustomerDispatch") {
                      let addressData = [...data.dispatch_customer_address];
                      addressData[
                        currentIndex
                      ].dispatch_customer_address_latitude = latLng?.lat;
                      addressData[
                        currentIndex
                      ].dispatch_customer_address_longitude = latLng?.lng;
                      addressData[
                        currentIndex
                      ].dispatch_customer_address_address = loc?.display_name;

                      setter({
                        ...data,
                        dispatch_customer_address: addressData,
                      });
                      return;
                    }
                    if (comp == "EditCustomerDispatch1") {
                      setter({
                        ...data,
                        dispatch_customer_address_latitude: latLng?.lat,
                        dispatch_customer_address_longitude: latLng?.lng,
                        dispatch_customer_address_address: loc?.display_name,
                      });
                      return;
                    }

                    if (comp == "DeliveryRequest") {
                      setter({ ...data });
                    }
                    if (comp == "EditMerchant") {
                      //   let warehouseData = data;
                      // console.log("warehouseData",warehouseData);
                      // console.log("warehouseData[currentIndex]",warehouseData[currentIndex]);

                      //   warehouseData[currentIndex].vendor_warehouse_latitude = latLng && latLng?.lat;
                      //   warehouseData[currentIndex].vendor_warehouse_longitude = latLng && latLng?.lng;
                      //   warehouseData[currentIndex].vendor_warehouse_address = loc && loc?.display_name;

                      //   data[currentIndex].vendor_warehouse_address = warehouseData
                      //   setter({ ...data, warehouse: data })

                      let warehouseData = data;
                      warehouseData[currentIndex].vendor_warehouse_latitude =
                        latLng?.lat;
                      warehouseData[currentIndex].vendor_warehouse_longitude =
                        latLng?.lng;
                      warehouseData[currentIndex].vendor_warehouse_address =
                        loc?.display_name;
                      setter({ warehouse: warehouseData });
                    }
                    if (setterKey) {
                      let allValues = { ...data };
                      allValues[latKey] = latLng?.lat;
                      allValues[setterKey] = loc?.display_name;
                      allValues[lngKey] = latLng?.lng;
                      setter({ ...allValues });
                    }
                    if (setCustomerSetting) {
                      setCustomerSetting({
                        ...customerSetting,
                        customer_longitude: latLng?.lng,
                        customer_latitude: latLng?.lat,
                        customer_address: loc?.display_name,
                        customer_country: loc?.address?.country,
                        customer_city: loc?.address?.state_district
                          ? loc?.address?.state_district
                          : loc?.address?.city
                          ? loc?.address?.city
                          : loc?.address?.subdistrict,
                        // customer_time_zone: timeZone.timezone_id,
                        // customer_currency: currency
                      });
                    }
                    if (setStopData)
                      setStopData({
                        location_longitude: result.x,
                        location_latitude: result.y,
                        location_name: result.label,
                        pickup_point_name: result.label,
                      });
                  }}
                >
                  {/* className="maindiveSearch"
              className="overflowScroller" */}
                  <p style={{ cursor: "pointer" }}>{result.label}</p>
                </div>
              );
            })}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

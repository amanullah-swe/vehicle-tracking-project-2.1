import React, { useContext, useEffect, useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import Form from "react-bootstrap/Form";
import { async } from "q";
import { getLocationName } from "../../api/ApiServices";
import { AppContext } from "../../context/AppContext";
import { useTranslation } from "react-i18next";

export const SearchAddress = ({
  state,
  setState,
  index,
  keyProperty,
  addressKey,
  latKey,
  lngKey,
  displayValue,
  required,
  onClickHandler,
}) => {
  const provider = new OpenStreetMapProvider();

  // CONTEXT
  const {useDebounce} = useContext(AppContext)
  // CONTEXT

  // STATES
  const [results, setResults] = useState([]);
  const [place, setPlace] = useState("");
  // STATES

  const searchPlace = async (input) => {
    const searchResults = await provider.search({ query: input });
    setResults(searchResults);
  };
  const debouncedSearchTerm = useDebounce(place, 500);

  useEffect(() => {
    searchPlace(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleInputChange = async (event) => {
    const { value } = event.target;
    setPlace(value);
  };
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className="location-search-input-main">
        <Form.Control
          className="location-search-input"
          autocomplete="off"
          type="search"
          placeholder={t("Search Location")}
          name="query"
          value={displayValue || place || ""}
          onChange={handleInputChange}
          onKeyDown={handleInputChange}
          required={required}
        />
        <Form.Control.Feedback type="invalid">
         {t("Please enter location")} 
        </Form.Control.Feedback>
        <button
          className={place.length > 0 ? "cat-delete-btn" : "d-none"}
          // className={"cat-delete-btn"}
          type="button"
          onClick={() => {
            setPlace("");
            setResults([]);
            if (index || index == 0) {
              setState((prevDispatchDetails) => ({
                ...prevDispatchDetails,
                [keyProperty]:
                  prevDispatchDetails.dispatch_customer_address.map(
                    (address, i) =>
                      i === index
                        ? {
                            ...address,
                            [addressKey]: "",
                            [latKey]: "",
                            [lngKey]: "",
                          }
                        : address
                  ),
              }));
            } else {
              setState((prevDispatchDetails) => ({
                ...prevDispatchDetails,
                [addressKey]: "",
                [latKey]: "",
                [lngKey]: "",
              }));
            }
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
            {results.map((result, idx) => (
              <div
                key={idx}
                onClick={async () => {
                  try {
                    const { x, y } = result;
                    let latLng = { lng: x, lat: y };
                    let locationData = await getLocationName(latLng);
                    const { display_name } = locationData;
                    if (index || index == 0) {
                      setState((prevDispatchDetails) => ({
                        ...prevDispatchDetails,
                        [keyProperty]:
                          prevDispatchDetails.dispatch_customer_address.map(
                            (address, i) =>
                              i === index
                                ? {
                                    ...address,
                                    [addressKey]: display_name || "",
                                    [latKey]: y || "",
                                    [lngKey]: x || "",
                                  }
                                : address
                          ),
                      }));
                    } else {
                      setState((prevDispatchDetails) => ({
                        ...prevDispatchDetails,
                        [addressKey]: display_name || "",
                        [latKey]: y || "",
                        [lngKey]: x || "",
                      }));
                    }
                    onClickHandler(locationData, result);
                    setResults([]);
                  } catch (error) {
                    console.error("catch error,", error);
                  }
                }}
              >
                <p style={{ cursor: "pointer" }}>{result.label}</p>
              </div>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

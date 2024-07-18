import React, { useContext, useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import Form from "react-bootstrap/Form";
import { AppContext } from "../../context/AppContext";
export default function ({ setTripDetails, tripDetails, itemKey }) {
    const [results, setResults] = useState([]); // State to store search results
    const {setRegionCord} = useContext(AppContext);

    // State to store search results
    const provider = new OpenStreetMapProvider(); // Instantiate the OpenStreetMapProvider
    const handleInputChange = async (event) => {
        let trip = { ...tripDetails };
        trip[itemKey] = event.target.value
        setTripDetails(trip);
        const input = event.target.value; // Get input value from event
        const searchResults = await provider.search({ query: input }); // Search for locations
        setResults(searchResults); // Update state with search results
    };
    return (
        <div>
            <div className="location-search-input-main">
                <Form.Control
                    className="location-search-input"
                    autocomplete="off"
                    type="search"
                    placeholder="Search Location"
                    name="query"
                    onChange={handleInputChange}
                    value={tripDetails[itemKey]}
                    list={itemKey}
                />
                {
                    results?.length ?
                    <ul id={itemKey} >
                    {results.map((result, index) => (
                        <li value={result.label} key={itemKey + index} 
                        onClick={(event) => {
                            console.log("asd",event);
                            setRegionCord([result.y, result.x]);
                            setResults([]);
                        }} >
                            <p style={{ cursor: "pointer", }}>{result.label}</p>
                        </li>
                    ))}
                </ul>
                   : <>
                   </>
                }
                
            </div>
        </div>
    )
}

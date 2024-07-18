import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";

export default function AutoCompleteSearch() {
    const {place ,setPlace} = useContext(AppContext);
     const placeInputRef = useRef(null);
     const [custome, setCustome] = useState([
       {
         location:""
       }
     ])
   
    
    
   
  
   
     useEffect( () => {
       initPlaceAPI();
       
     }, [custome]);
   
   
     
     const initPlaceAPI = async () => {
       if (
         window.google &&
         window.google.maps &&
         window.google.maps.places &&
         window.google.maps.places.Autocomplete
       ) {
         let autocomplete = new window.google.maps.places.Autocomplete(
           placeInputRef.current
         );
         new window.google.maps.event.addListener(
           autocomplete,
           "place_changed",
           function () {
             let place = autocomplete.getPlace();
          
   
             setPlace({
               ...place,
               center: {
                 lat: place.geometry.location.lat(),
                 lng: place.geometry.location.lng(),
               },
               address: place.name,
             });
           }
         );
       }
     };
   
   
   
   
   
     return (
       <div  >
         <div
           className="gps"
           style={{
             position: "relative",
           }}
         >
           <input
            //   className="input-field"
            //  id="inputGroupSelect01 place-fw"
            
             ref={placeInputRef}
              value={custome.location}
             onChange={(e) => {
               setCustome({
                 ...custome,
                 location: e.target.value,
               });
               
             }}
           />
       
         </div>
       </div>



     );
   }
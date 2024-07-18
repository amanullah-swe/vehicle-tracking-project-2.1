import axios from 'axios'
import React, { useEffect, useState } from 'react'

function TripReport() {

    const[getActivityTrip, setActivityTrip] = useState(null)

    const ActivityTrip =  async() => {
        try{
        const response = await axios.get("https://api.vehicletracking.qa:3000/customer/reports/tripactivity")
    setActivityTrip(response.data)
} catch(error){
    console.log(error.message);
}
    } 

    useEffect(() => {
        ActivityTrip()
        
    },[])


  return (
    <div>
        
    </div>
  )
}

export default TripReport
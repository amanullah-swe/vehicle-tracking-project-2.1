import React, { useContext } from 'react'
import ApiConfig from '../../api/ApiConfig';
import { AppContext } from '../../context/AppContext';

const  mqttConnection=(setMapData,publishData,subscriptionData,vehicleId)=> {
    const {customerData } =
    useContext(AppContext);
   let topicSubstion= `${subscriptionData}/${customerData.customer_id}/${vehicleId.toString()}`
 
   const host = ApiConfig.BASE_URL_MQTT;
    const [mqttClient, setMqttClient] = useState(mqtt.connect(host, {
          }));
    const mqttSub = (subscription, client) => {
       if (client) {
         const { topic, qos } = subscription;
         client.subscribe(topic, (error) => {
           if (error) {
             console.log('Subscribe to topics error', error)
             return
           }
         });
       }
     };
    const mqttPublish = (publishData, client) => {
       if (client) {
         const { topic, qos, payload } = publishData;
      client.publish(topic, JSON.stringify(payload), error => {
           if (error) { console.log('Publish error: ', error); }
         });
       }
     }
    useEffect(() => { const client = mqtt.connect(host, { });
    client.on('connect', () => {
         mqttSub({
           topic:topicSubstion
         }, client)
         mqttPublish({
                   topic:publishData,
                   payload: {
                     customer_id:customerData.customer_id,
                     imei:vehicleId.toString()
                   }
                 }, client) });
    if (client) {
         client.on('message', (topic, message) => {
         
           if (topic == topicSubstion) {
             const payload = { topic, message: message.toString() };
                let messagesParsedData = JSON.parse(message)
                setMapData(messagesParsedData)

       }
         });
         client.on('error', (error) => {
          console.error('MQTT error:', error);
        });
       }
       setMqttClient(client); // Store the MQTT client in component state
    }, []);

  return (
    <div>

    </div>
  )
}

export default mqttConnection
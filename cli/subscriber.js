const mqtt = require("mqtt");

var mqttClient;

const mqttHost = '192.168.100.105';
const protocol = 'mqtt';
const port = '1883';


function connectToBroker(){

    const clientId = "client" + Math.random().toString(36).substring(7);

    const hostURL = `${protocol}://${mqttHost}:${port}`;

    const options = {
        keepAlive: 60,
        clientId: clientId,
        protocolId: "MQTT",
        protocolVersion: 4 ,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout:30 * 1000
    };

    mqttClient = mqtt.connect(hostURL, options);

    mqttClient.on('error', (err)=>{
        console.log('error: ', err);
        mqttClient.end();
    });

    mqttClient.on("connect", () => {
        console.log("Client connected:" + clientId);
      });
    
      // Received Message
    mqttClient.on("message", (topic, message, packet) => {
        console.log(
          "Received Message: " + message.toString() + "\nOn topic: " + topic
        );
      });
}

function subscribeToTopic(topic){
    console.log(`Subscribing to topic: ${topic}`);

    mqttClient.subscribe(topic, {qos: 0});
}

connectToBroker();

subscribeToTopic("temperature");
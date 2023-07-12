const mqtt = require("mqtt");

var mqttClient;

const mqttHost = "192.168.0.94";
const protocol = "mqtt";
const port = "1883";

function connectToBroker() {
  const clientId = "client" + Math.random().toString(36).substring(7);

  const hostURL = `${protocol}://${mqttHost}:${port}`;

  const options = {
    keepAlive: 60,
    clientId: clientId,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  };

  mqttClient = mqtt.connect(hostURL, options);

  mqttClient.on("error", (err) => {
    console.log("Error: ", err);
    mqttClient.end();
  });

  mqttClient.on("reconnect", () => {
    console.log("reconnecting...");
  });

  mqttClient.on("connect", () => {
    console.log("Client connected: " + clientId);
  });

  // received message
  mqttClient.on("message", (topic, message, packet) => {
    console.log(
      "Message received: " + message.toString() + "\nOn topic: " + topic
    );
  });
}

function publishMessage(topic, message) {
  console.log(`Sending topic: ${topic}, Message: ${message}`);

  mqttClient.publish(topic, message, {
    qos: 0,
    retain: false,
  });
}

connectToBroker();

publishMessage("temperature", "32");

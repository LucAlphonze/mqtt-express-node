const mqttService = require("../service/mqttService");
require("dotenv").config({});

// Change this to point to your MQTT broker
const MQTT_HOST_NAME = `mqtt://mosquitto:1883`;
const options = {
  clientId: "pub_client",
  username: "pub_client",
  password: "pubclient",
};
var mqttClient = new mqttService(MQTT_HOST_NAME);
mqttClient.connect(options);

exports.getPublisherPage = async function (req, res) {
  try {
    res.render("pages/publisher");
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

exports.publishMQTTMessage = async function (req, res) {
  try {
    const topic = req.body.topic;
    const message = req.body.message;

    console.log(`Request Topic: ${topic}`);
    console.log(`Request Message: ${message}`);

    mqttClient.publish(topic, message.toString(), {});
    res
      .status(200)
      .json({ status: "200", message: "Sucessfully published MQTT Message" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

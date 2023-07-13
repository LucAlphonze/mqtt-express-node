const mqtt = require("mqtt");

class MQTTService {
  constructor(host, messageCallback) {
    this.mqttClient = null;
    this.host = host;
    this.messageCallback = messageCallback;
  }

  connect(options) {
    this.mqttClient = mqtt.connect(this.host, options);

    // error
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // connect
    this.mqttClient.on("connect", () => {
      console.log("MQTT client connected");
    });

    // Call the message callback function when the message arrives
    this.mqttClient.on("message", function (topic, message) {
      console.log(message.toString());
      if (this.messageCallback) this.messageCallback(topic, message);
    });

    this.mqttClient.on("close", () => {
      console.log("MQTT client disconnected");
    });
  }
  // publish message
  publish(topic, message, options) {
    this.mqttClient.publish(topic, message);
  }

  subscribe(topic, options) {
    this.mqttClient.subscribe(topic, options);
  }
}

module.exports = MQTTService;

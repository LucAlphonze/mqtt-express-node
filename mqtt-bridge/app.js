require("dotenv").config({ path: "./.env" });
const mqtt = require("mqtt");
const axios = require("axios");

const express = require("express");
const app = express();
const port = 3000;

// Serve Static Files
app.use(express.static("public"));
app.use("/assets", express.static("public"));

// template view engine
app.set("view engine", "ejs");

// Set the json request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const subscriberRouter = require("./routes/subscriber");
const publisherRouter = require("./routes/publisher");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/subscriber", subscriberRouter);
app.use("/publisher", publisherRouter);

app.listen(port, () => {
  console.log(`pub-sub listening on port ${port}`);
});

//primero se conecta el cliente que trae datos desde el dispositivo
const servClient = mqtt.connect(`mqtt://mosquitto:1883`, {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASSWORD,
});
servClient.on("connect", function () {
  servClient.subscribe("rgeneral", function (err) {
    console.log("servClient conectado");
    if (err) {
      throw new Error(`Subscribe to MQTT Broker failed: ${err.message}`);
    }
  });
});

servClient.on("message", function (topic, message) {
  var messageJSON = JSON.parse(message.toString());

  var pruebaJson = {
    valor_lectura: messageJSON.valor_lectura,
    id_variable: messageJSON.id_variable,
    fecha_lectura: new Date().toISOString(),
  };
  axios
    .post(`http://rest-api:3001/api/registro-general`, pruebaJson)
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

servClient.on("error", function (error) {
  console.log(error);
  throw new Error(error.message);
});

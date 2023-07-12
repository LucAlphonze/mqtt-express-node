require("dotenv").config();
var logger = require("morgan");

const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

// servidor de express
const app = express();

// middleware
app.use(logger("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// conexion base de datos

dbConnection();

// rutas
app.use("/api/variables", require("./routes/variable.route"));
app.use("/api/registro-general", require("./routes/registroGeneral.route"));

module.exports = app;

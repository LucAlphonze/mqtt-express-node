const { Schema, model } = require("mongoose");

const VariableSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
});

module.exports = model("Variable", VariableSchema);

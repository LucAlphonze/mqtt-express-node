const { Schema, model } = require("mongoose");

const RegistroGeneralSchema = Schema({
  id_variable: {
    type: Schema.Types.ObjectId,
    ref: "Variable",
    // required: true,
  },
  fecha_lectura: {
    type: Date,
    required: true,
  },
  valor_lectura: {
    type: Number,
  },
});

module.exports = model("RegistroGeneral", RegistroGeneralSchema);

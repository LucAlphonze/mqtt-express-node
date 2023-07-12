const mongoose = require("mongoose");
const dbConnection = async () => {
  var atlas =
    "mongodb+srv://admin:Vg2b7rO6bx8qDFsW@cluster0.xvqceg8.mongodb.net/?retryWrites=true&w=majority";
  // var db = process.env.DB_CNN
  try {
    await mongoose.connect(atlas);
    console.log("BD Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la BD ver logs");
  }
};

module.exports = {
  dbConnection,
};

const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    origin: {
      type: String,
      require: true,
    },
    destination: {
      type: String,
      require: true,
    },
    secret_key: {
      type: String,
      require: true,
    },
    timestamp: {
      type: Date,
      require: true,
    },
  },
  {
    timeStamps: true,
  }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;

const mongoose = require("mongoose");

// Define the schema for the TimeSeriesData collection
const TimeSeriesDataSchema = new mongoose.Schema({
  // Timestamp represents the minute in which the data is received and is required
  timestamp: { type: Date, required: true },

  // Data is an array of objects containing specific information
  data: [
    {
      // Name of the person associated with the data
      name: String,

      // Origin location
      origin: String,

      // Destination location
      destination: String,

      // Timestamp for individual data entries 
      timestamp: Date,
    },
  ],
});

// Create a Mongoose model for the TimeSeriesData collection using the defined schema
const TimeSeriesDataModel = mongoose.model(
  "TimeSeriesData",
  TimeSeriesDataSchema
);

// Export the model to be used in other parts of the application
module.exports = TimeSeriesDataModel;

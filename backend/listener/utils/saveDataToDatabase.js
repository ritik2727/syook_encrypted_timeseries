const TimeSeriesDataModel = require("../models/dataModel");

/**
 * Removes the seconds and milliseconds from a given date.
 * @param {Date} date - The input date (default is the current date).
 * @returns {Date} A new date with seconds and milliseconds set to zero.
 */
const removeSeconds = (date = new Date()) => {
  // Convert minutes to milliseconds and set seconds and milliseconds to zero
  return new Date(date.setSeconds(0, 0));
};

/**
 * Saves data to the TimeSeriesDataModel collection in the database.
 * @param {Array} data - An array of data to be saved.
 * @param {Date} time - The timestamp associated with the data.
 * @returns {Promise} A promise that resolves to the saved document.
 */
const saveDataToDatabase = async (data, time) => {
  const minuteIntervalDate = removeSeconds(time);
  try {
    // Find and update the document or create it if it doesn't exist
    const savedDocument = await TimeSeriesDataModel.findOneAndUpdate(
      { timestamp: minuteIntervalDate },
      { $push: { data } },
      { upsert: true, new: true } // Use { new: true } to return the updated document
    );

    console.log("Data saved successfully.", savedDocument);
    return savedDocument;
  } catch (err) {
    console.error("Error saving data:", err);
    throw err; // Rethrow the error to be caught by the caller if needed
  }
};

module.exports = {
  saveDataToDatabase,
  removeSeconds,
};

const data = require("../data.json"); // Load predefined data
const crypto = require("crypto");

function generateRandomMessage() {
  // Generate a random number of messages
  const numberOfMessages = 2; // Change this to your desired number of messages
  const messages = [];

  for (let i = 0; i < numberOfMessages; i++) {
    const randomName = getRandomName();
    const randomOrigin = getRandomCity();
    const randomDestination = getRandomCity();

    const MessageObj = {
      name: randomName,
      origin: randomOrigin,
      destination: randomDestination,
    };

    // Generate a secret key for the message
    const secretKey = crypto
      .createHash("sha256")
      .update(JSON.stringify(MessageObj))
      .digest("hex");

    const message = {
      name: randomName,
      origin: randomOrigin,
      destination: randomDestination,
      secretKey,
    };

    messages.push(message);
  }

  return messages;
}

function getRandomName() {
  // Get a random name from the predefined data
  const randomIndex = Math.floor(Math.random() * data.names.length);
  return data.names[randomIndex];
}

function getRandomCity() {
  // Get a random city from the predefined data
  const randomIndex = Math.floor(Math.random() * data.cities.length);
  return data.cities[randomIndex];
}

module.exports = {
  generateRandomMessage,
  getRandomCity,
  getRandomName,
};

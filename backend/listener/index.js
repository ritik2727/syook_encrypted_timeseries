const crypto = require("crypto");
const http = require("http");
const socketIo = require("socket.io");
const ConnectDB = require("./config/db");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const { decryptMessage } = require("./utils/decryptMessage");
const { saveDataToDatabase } = require("./utils/saveDataToDatabase");

dotenv.config(); // Load environment variables from .env file
ConnectDB(); // Connect to the database
const app = express(); // Create an Express application

const server = http.createServer(app); // Create an HTTP server

const io = socketIo(server); // Create a WebSocket server using Socket.io

app.use(cors({ origin: true })); // Enable CORS for all routes with allowed origins

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("Emitter connected"); // Log when an emitter is connected

  // Listen for encrypted messages from emitters
  socket.on("encryptedMessages", async (dataStream) => {
    const messageArray = [];
    const time = new Date(new Date().toUTCString()); // Get the current timestamp

    // Process each encrypted message in the data stream
    dataStream.forEach(async (encryptedMessage) => {
      // Decrypt the encrypted message using a secret key
      const decryptedMessage = decryptMessage(encryptedMessage);

      // Parse the decrypted message into a JavaScript object
      var message = JSON.parse(decryptedMessage);
      var message2 = JSON.parse(message);

      message2["timestamp"] = time; // Add the timestamp to the message

      const MessageObj = {
        name: message2.name,
        origin: message2.origin,
        destination: message2.destination,
      };
      // Validate the message using a secret_key
      const calculatedSecretKey = crypto
        .createHash("sha256")
        .update(JSON.stringify(MessageObj))
        .digest("hex");

      // If the calculated secret key matches the provided secret key, add the message to the array
      if (calculatedSecretKey === message2.secretKey) {
        messageArray.push(message2);
      } else {
        console.log("Data validation failed:", message);
      }
    });

    // Upsert the messageArray into the database and emit a response
    const upsertRes = await saveDataToDatabase(messageArray, time);
    io.emit("savedData", { upsertRes });
    console.log("Data saved to the database.");
  });
});

const PORT = process.env.PORT || 5000; // Define the port number

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Listener service is running on port ${PORT}.`);
});

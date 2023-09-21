const io = require("socket.io-client");
const { encryptMessage } = require("./utils/encryptMessage");
const { generateRandomMessage } = require("./utils/randomMessageGenerate");

const socket = io("http://localhost:5000"); // Replace with your Listener service's address

function emitEncryptedMessages() {
  const messages = generateRandomMessage();
  const encryptedMessages = messages.map((message) => {
    return encryptMessage(JSON.stringify(message));
  });
  // Emit the encrypted messages to the socket
  socket.emit("encryptedMessages", encryptedMessages);
}

socket.on("connect", () => {
  console.log("Emitter connected to Listener");
  setInterval(emitEncryptedMessages, 10000); // Send message every 10 seconds
});

socket.on("disconnect", () => {
  console.log("Emitter disconnected from Listener");
});

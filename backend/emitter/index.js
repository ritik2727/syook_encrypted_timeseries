const io = require("socket.io-client");
const crypto = require("crypto");

const socket = io("http://localhost:3000"); // Replace with your Listener service's address

const data = require("./data.json"); // Load predefined data

function generateRandomMessage() {
  const numberOfMessages = Math.floor(Math.random() * (499 - 49 + 1)) + 49; // Random number of messages between 49 and 499
  const messages = [];

  for (let i = 0; i < numberOfMessages; i++) {
    const randomName = getRandomName();
    const randomOrigin = getRandomCity();
    const randomDestination = getRandomCity();

    const secretKey = crypto
      .createHash("sha256")
      .update(`${randomName}${randomOrigin}${randomDestination}`)
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
  const randomIndex = Math.floor(Math.random() * data.names.length);
  return data.names[randomIndex];
}

function getRandomCity() {
  const randomIndex = Math.floor(Math.random() * data.cities.length);
  return data.cities[randomIndex];
}

// Function to encrypt a message using AES-256-CTR
function encryptMessage(textToEncrypt) {
  const text = Buffer.from(textToEncrypt); // textToEncryptAsByteArray
  //   crypto.randomBytes(32).toString('hex');
  const key =
    "c648b408043709aa8e0d7cdfcc0fc9f9879493464cc1012078d0af088abcf6d6";
  const iv = crypto.randomBytes(16); //inicialization vector
  let cipher = crypto.createCipheriv(
    "aes-256-ctr",
    Buffer.from(key, "hex"),
    iv
  );
  let encrypted = cipher.update(JSON.stringify(text), "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + "|" + encrypted.toString("hex");
}

function emitEncryptedMessages() {
  const messages = generateRandomMessage();
  const encryptedMessages = messages.map((message) => ({
    // ...message,
    encrypted: encryptMessage(JSON.stringify(message)),
  }));

  console.log("encryptedMessages", encryptedMessages);

  socket.emit("encryptedMessages", encryptedMessages);
}

socket.on("connect", () => {
  console.log("Emitter connected to Listener");
  setInterval(emitEncryptedMessages, 10000); // Send message every 10 seconds
});

socket.on("disconnect", () => {
  console.log("Emitter disconnected from Listener");
});

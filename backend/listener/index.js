const crypto = require("crypto");
const http = require("http");
const socketIo = require("socket.io");
const ConnectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();
ConnectDB();

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listener service is running on port ${PORT}.`);
});

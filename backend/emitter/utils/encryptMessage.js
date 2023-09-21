const crypto = require("crypto");

// Function to encrypt a message using AES-256-CTR
const encryptMessage = (text) => {
  const key =
    "c648b408043709aa8e0d7cdfcc0fc9f9879493464cc1012078d0af088abcf6d6";
  const iv = crypto.randomBytes(16); // Initialization vector
  let cipher = crypto.createCipheriv(
    "aes-256-ctr",
    Buffer.from(key, "hex"),
    iv
  );
  let encrypted = cipher.update(JSON.stringify(text), "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + "|" + encrypted.toString("hex");
};
module.exports = {
  encryptMessage,
};

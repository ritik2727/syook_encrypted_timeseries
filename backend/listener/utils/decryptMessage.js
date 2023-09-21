const crypto = require("crypto");
/**
 * Decrypts an encrypted message using AES-256-CTR encryption.
 * @param {string} encryptedMessage - The encrypted message to decrypt.
 * @returns {string} The decrypted message.
 */
const decryptMessage = (encryptedMessage) => {
  // Secret key for decryption
  const decryptionKey =
    "c648b408043709aa8e0d7cdfcc0fc9f9879493464cc1012078d0af088abcf6d6";

  // Split the encrypted message into initialization vector (iv) and the encrypted data
  const parts = encryptedMessage.split("|");
  const iv = Buffer.from(parts[0], "hex");
  const encryptedData = parts[1];

  // Create a decipher object using the secret key and iv
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(decryptionKey, "hex"),
    iv
  );

  // Decrypt the data and convert it to UTF-8 format
  const decryptedData =
    decipher.update(encryptedData, "hex", "utf8") + decipher.final("utf8");

  return decryptedData;
};

// Export the decryptMessage function for use in other modules
module.exports = {
  decryptMessage,
};

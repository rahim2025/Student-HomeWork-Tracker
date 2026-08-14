const mongoose = require("mongoose");

// Cached across invocations so a warm serverless instance reuses the existing
// connection instead of paying the Atlas TLS handshake cost on every request.
let connectionPromise = null;

const connectDB = () => {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve();
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGODB_URI, { maxPoolSize: 10 })
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((error) => {
        connectionPromise = null;
        console.error("MongoDB connection failed:", error.message);
        throw error;
      });
  }

  return connectionPromise;
};

module.exports = connectDB;

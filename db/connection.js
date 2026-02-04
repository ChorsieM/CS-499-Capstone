// ENHANCEMENT (Category Three): MongoDB connection using dotenv.
// Keeps credentials out of code and prevents the app from crashing if DB is unavailable.

require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn("ENHANCEMENT: No MONGODB_URI found. App running without database.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("ENHANCEMENT: MongoDB connected");
  } catch (err) {
    console.error("ENHANCEMENT: MongoDB connection error:", err.message);
  }
}

module.exports = { connectDB };

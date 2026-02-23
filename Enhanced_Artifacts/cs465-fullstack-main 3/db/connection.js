// ENHANCEMENT NOTES:
// Added optional MongoDB connection using dotenv. App can still run without DB if MONGODB_URI is not set.
//
/**
 * db/connection.js
 *
 * Databases enhancement (Category Three):
 * - Central place to connect to MongoDB
 * - Uses an environment variable so credentials are not hard-coded
 *
 * NOTE: This project can still run without a database.
 * If MONGODB_URI is not set, we skip connecting and the app still starts.
 */

require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

async function connectToMongo() {
  if (!uri) {
    console.warn('[db] MONGODB_URI not set. Skipping MongoDB connection.');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('[db] Connected to MongoDB');
  } catch (err) {
    console.error('[db] MongoDB connection failed:', err.message);
  }
}

module.exports = { connectToMongo };

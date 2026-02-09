// ENHANCEMENT (Milestone Four - Databases): Rooms logic now pulls from MongoDB using Mongoose.
// This replaces in-memory filtering with database queries + indexes for scalability.

const mongoose = require("mongoose");
const Room = require("../models/Room");
const { toSafeString, toSafeNumber, toAllowedValue } = require("../utils/validation");

function isDbConnected() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

async function getRoomsViewModel(query) {
  const q = toSafeString(query.q, 30);
  const maxPrice = toSafeNumber(query.maxPrice, { min: 0 });
  const minRating = toSafeNumber(query.minRating, { min: 0, max: 5 });
  const sort = toAllowedValue(query.sort, ["price", "rating"]);
  const page = toSafeNumber(query.page, { min: 1 }) || 1;

  const pageSize = 5;

  // If DB isn't connected, return a clean message instead of crashing
  if (!isDbConnected()) {
    return {
      title: "Rooms",
      rooms: [],
      pagination: { page: 1, totalPages: 1, totalResults: 0 },
      filters: {
        q: query.q || "",
        maxPrice: query.maxPrice || "",
        minRating: query.minRating || "",
        sort: query.sort || "",
        page: 1
      },
      message: "Database is not connected yet. Start MongoDB to load rooms."
    };
  }

  // Build query
  const mongoQuery = {};

  if (maxPrice !== null) mongoQuery.pricePerNight = { $lte: maxPrice };
  if (minRating !== null) mongoQuery.rating = { $gte: minRating };

  // Text search (requires text index in Room schema)
  if (q) mongoQuery.$text = { $search: q };

  // Sort
  const mongoSort = {};
  if (sort === "price") mongoSort.pricePerNight = 1;
  if (sort === "rating") mongoSort.rating = -1;

  const totalResults = await Room.countDocuments(mongoQuery);
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  const safePage = Math.min(page, totalPages);

  const rooms = await Room.find(mongoQuery)
    .sort(mongoSort)
    .skip((safePage - 1) * pageSize)
    .limit(pageSize)
    .lean();

  return {
    title: "Rooms",
    rooms,
    pagination: { page: safePage, totalPages, totalResults },
    filters: {
      q: query.q || "",
      maxPrice: query.maxPrice || "",
      minRating: query.minRating || "",
      sort: query.sort || "",
      page: safePage
    }
  };
}

module.exports = { getRoomsViewModel };

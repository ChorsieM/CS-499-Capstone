// ENHANCEMENT NOTES:
// Added filter/sort/search logic (Algorithms & Data Structures). Includes simple input validation and allow-listed sort options to reduce risk.
//
/**
 * roomsService.js
 *
 * Algorithms & Data Structures enhancement:
 * - Filtering (maxPrice, minRating, tag)
 * - Searching (q)
 * - Sorting with a secondary sort (multi-tier)
 *
 * Databases tie-in (simple + optional):
 * - If MongoDB is connected AND a Room model exists, we can pull data from Mongo.
 * - Otherwise we fall back to the in-memory dataset.
 *
 * NOTE: Kept intentionally "plain" so it's easy to follow and not over-engineered.
 */

const mongoose = require('mongoose');
const { rooms: inMemoryRooms } = require('../data/roomsData');

function safeNumber(value) {
  if (value === undefined || value === null || value === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function safeText(value, maxLen = 60) {
  const s = (value || '').toString().trim();
  // Keep it simple: cap length and remove weird characters
  // (basic defensive step to reduce accidental injection/regex issues)
  return s.slice(0, maxLen).replace(/[^\w\s-]/g, '');
}

function normalizeSort(sort) {
  const s = (sort || '').toLowerCase();
  if (s === 'price' || s === 'rating') return s;
  return 'rating';
}

function normalizeTag(tag) {
  const t = safeText(tag, 30).toLowerCase();
  return t || '';
}

function applyFiltersAndSort(rooms, query) {
  const maxPrice = safeNumber(query.maxPrice);
  const minRating = safeNumber(query.minRating);
  const q = safeText(query.q, 60).toLowerCase();
  const tag = normalizeTag(query.tag);
  const sort = normalizeSort(query.sort);

  // 1) Filter in a single pass (simple + efficient)
  let results = rooms.filter((r) => {
    if (maxPrice !== undefined && r.pricePerNight > maxPrice) return false;
    if (minRating !== undefined && r.rating < minRating) return false;

    if (tag) {
      const tags = (r.tags || []).map((x) => String(x).toLowerCase());
      if (!tags.includes(tag)) return false;
    }

    if (q) {
      const haystack = `${r.name} ${(r.tags || []).join(' ')}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });

  // 2) Sort with a secondary sort to make results stable/predictable
  // - If sorting by price, tie-break by rating (higher first)
  // - If sorting by rating, tie-break by price (lower first)
  results = [...results].sort((a, b) => {
    if (sort === 'price') {
      const primary = a.pricePerNight - b.pricePerNight;
      if (primary !== 0) return primary;
      return b.rating - a.rating;
    }
    // default: rating
    const primary = b.rating - a.rating;
    if (primary !== 0) return primary;
    return a.pricePerNight - b.pricePerNight;
  });

  return { results, maxPrice, minRating, q: query.q || '', tag, sort };
}

async function tryGetMongoRooms(query) {
  // Only try DB when connected
  if (!mongoose.connection || mongoose.connection.readyState !== 1) return null;

  let Room;
  try {
    Room = require('../models/Room');
  } catch (e) {
    return null;
  }

  const maxPrice = safeNumber(query.maxPrice);
  const minRating = safeNumber(query.minRating);
  const q = safeText(query.q, 60);
  const tag = normalizeTag(query.tag);
  const sort = normalizeSort(query.sort);

  const filter = {};
  if (maxPrice !== undefined) filter.pricePerNight = { $lte: maxPrice };
  if (minRating !== undefined) filter.rating = { ...(filter.rating || {}), $gte: minRating };
  if (tag) filter.tags = tag;

  // Use text index if there is a search term (safer than building regex from user input)
  if (q) filter.$text = { $search: q };

  // Build sort object (with a secondary key)
  const sortObj =
    sort === 'price'
      ? { pricePerNight: 1, rating: -1 }
      : { rating: -1, pricePerNight: 1 };

  // Keep it lightweight: limit results
  const docs = await Room.find(filter)
    .sort(sortObj)
    .limit(50)
    .lean();

  return { docs, maxPrice, minRating, q: query.q || '', tag, sort };
}

/**
 * Returns a view model for the Rooms page.
 * DB-first when available, otherwise uses in-memory data.
 */
async function getRoomsViewModel(query) {
  const mongo = await tryGetMongoRooms(query);
  const source = mongo ? 'mongo' : 'memory';

  const rooms = mongo
    ? mongo.docs
    : applyFiltersAndSort(inMemoryRooms, query).results;

  const sort = mongo ? mongo.sort : normalizeSort(query.sort);

  const maxPrice = mongo ? (mongo.maxPrice ?? '') : (safeNumber(query.maxPrice) ?? '');
  const minRating = mongo ? (mongo.minRating ?? '') : (safeNumber(query.minRating) ?? '');
  const tag = mongo ? (mongo.tag ?? '') : normalizeTag(query.tag);
  const q = mongo ? (mongo.q ?? '') : (query.q || '');

  return {
    title: 'Rooms',
    source, // helpful for explaining in your writeup/video
    filters: {
      maxPrice,
      minRating,
      q,
      tag,
      sort,
      // flags to keep the template simple (no custom helpers)
      sortIsPrice: sort === 'price',
      sortIsRating: sort === 'rating',
    },
    rooms,
    total: rooms.length,
  };
}

module.exports = {
  getRoomsViewModel,
};

// ENHANCEMENT (Milestone Three): Algorithm + data structure logic.
// Improvements in this version:
// 1) Standardized input validation using utils/validation.js
// 2) Added a Map-based "index" to speed up searching by keyword (data structure upgrade)
// 3) Added multi-tier sorting and simple pagination to better reflect real web app behavior

const roomsData = require('../data/roomsData');
const { toSafeString, toSafeNumber, toAllowedValue } = require('../utils/validation');

// ENHANCEMENT: Build a simple search index using a Map.
// Key = token (word), Value = Set of room IDs that include that token.
// This demonstrates a data structure approach beyond just filtering arrays.
const searchIndex = buildSearchIndex(roomsData);

function buildSearchIndex(data) {
  const index = new Map();

  for (const room of data) {
    const tokens = [
      room.name,
      ...(room.tags || [])
    ]
      .join(" ")
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    for (const token of tokens) {
      if (!index.has(token)) index.set(token, new Set());
      index.get(token).add(room.id);
    }
  }

  return index;
}

function searchRoomsByToken(token) {
  // Returns an array of matching rooms using the Map index
  const idsSet = searchIndex.get(token);
  if (!idsSet) return [];
  const ids = new Set(idsSet);

  return roomsData.filter(r => ids.has(r.id));
}

function getRoomsViewModel(query) {
  // ENHANCEMENT: standardized validation
  const q = toSafeString(query.q, 30).toLowerCase();
  const maxPrice = toSafeNumber(query.maxPrice, { min: 0 });
  const minRating = toSafeNumber(query.minRating, { min: 0, max: 5 });

  // allowlist sort values
  const sort = toAllowedValue(query.sort, ["price", "rating"]);

  // ENHANCEMENT: pagination (simple, but professional)
  const page = toSafeNumber(query.page, { min: 1 }) || 1;
  const pageSize = 3; // keep small for demo

  // 1) SEARCH using Map index (if q is a single token)
  let baseResults = roomsData;

  if (q) {
    const tokens = q.split(/\s+/).filter(Boolean);

    // If the user types one word, use the Map index
    if (tokens.length === 1) {
      baseResults = searchRoomsByToken(tokens[0]);
    } else {
      // If multiple words, fall back to normal array search
      baseResults = roomsData.filter((room) => {
        const nameMatch = room.name.toLowerCase().includes(q);
        const tagMatch = (room.tags || []).some(t => t.toLowerCase().includes(q));
        return nameMatch || tagMatch;
      });
    }
  }

  // 2) FILTER
  let results = baseResults.filter((room) => {
    if (maxPrice !== null && room.pricePerNight > maxPrice) return false;
    if (minRating !== null && room.rating < minRating) return false;
    return true;
  });

  // 3) SORT (multi-tier: tie-breaker included)
  if (sort === "price") {
    results = [...results].sort((a, b) => {
      const primary = a.pricePerNight - b.pricePerNight;
      if (primary !== 0) return primary;
      return b.rating - a.rating; // tie-breaker
    });
  } else if (sort === "rating") {
    results = [...results].sort((a, b) => {
      const primary = b.rating - a.rating;
      if (primary !== 0) return primary;
      return a.pricePerNight - b.pricePerNight; // tie-breaker
    });
  }

  // 4) PAGINATE
  const totalResults = results.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * pageSize;
  const pagedRooms = results.slice(start, start + pageSize);

  return {
    title: "Rooms",
    rooms: pagedRooms,
    pagination: {
      page: safePage,
      totalPages,
      totalResults
    },
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


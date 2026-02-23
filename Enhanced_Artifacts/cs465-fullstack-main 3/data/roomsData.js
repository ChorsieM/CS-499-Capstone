// ENHANCEMENT NOTES:
// Added a small in-memory dataset (array of room objects) to support algorithm enhancements without requiring a database to be running.
//
/**
 * roomsData.js
 *
 * Simple in-memory dataset used for the Algorithms & Data Structures enhancement.
 * Later, this same shape can be moved into a database model (Category Three).
 */

const rooms = [
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    pricePerNight: 149,
    rating: 4.6,
    beds: 2,
    tags: ['ocean', 'popular'],
  },
  {
    id: 'suite',
    name: 'Suite',
    pricePerNight: 219,
    rating: 4.9,
    beds: 2,
    tags: ['spacious', 'premium'],
  },
  {
    id: 'first-class',
    name: 'First Class Room',
    pricePerNight: 179,
    rating: 4.7,
    beds: 1,
    tags: ['quiet', 'balcony'],
  },
  {
    id: 'budget',
    name: 'Budget Room',
    pricePerNight: 99,
    rating: 4.2,
    beds: 1,
    tags: ['simple', 'value'],
  },
];

module.exports = { rooms };

// ENHANCEMENT NOTES:
// Added a Mongoose schema with basic validation and an index to support faster queries as data grows.
//
/**
 * models/Room.js
 *
 * Databases enhancement (Category Three):
 * - Define a schema (validation + structure)
 * - Add indexes to support faster searches
 */

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    pricePerNight: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    beds: { type: Number, default: 1, min: 1 },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Index for common operations (search/filter)
roomSchema.index({ pricePerNight: 1 });
roomSchema.index({ rating: -1 });
roomSchema.index({ name: 'text', tags: 'text' });

module.exports = mongoose.model('Room', roomSchema);
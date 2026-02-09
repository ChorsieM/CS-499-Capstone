// ENHANCEMENT (Category Three): Room schema/model with validation + indexing.
// This supports persistence, safer data handling, and scalable search/sort.

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    pricePerNight: { type: Number, required: true, min: 0 },
    rating: { type: Number, min: 0, max: 5 },
    tags: { type: [String], default: [] }
  },
  { timestamps: true }
);

// ENHANCEMENT: Indexes improve performance on large datasets

// Helps sorting and filtering by price
roomSchema.index({ pricePerNight: 1 });

// Helps sorting/filtering by rating
roomSchema.index({ rating: -1 });

// REQUIRED for keyword search
roomSchema.index({ name: "text", tags: "text" });

module.exports = mongoose.model('Room', roomSchema);

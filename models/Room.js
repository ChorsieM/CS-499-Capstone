// ENHANCEMENT (Category Three): Room schema/model with basic validation.
// This supports persistence + safer data handling.

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

// Simple index for common filtering/sorting
roomSchema.index({ pricePerNight: 1 });

module.exports = mongoose.model('Room', roomSchema);

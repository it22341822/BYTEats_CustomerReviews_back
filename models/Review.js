const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  restaurantId: { type: String, required: true },
  customerName: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

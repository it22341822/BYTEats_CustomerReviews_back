const Review = require('../models/Review');

// Create a new review
const createReview = async (req, res) => {
  try {
    const { restaurantId, customerName, reviewText, rating } = req.body;
    const review = new Review({ restaurantId, customerName, reviewText, rating });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error creating review', error });
  }
};

// Get all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurantId: req.params.restaurantId });
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching reviews', error });
  }
};

//update a review
const updateReview = async (req, res) => {
  try {
    const { customerName, reviewText, rating } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.reviewId,
      { customerName, reviewText, rating },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: 'Error updating review', error });
  }
};


// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting review', error });
  }
};

module.exports = { createReview, getReviews, updateReview, deleteReview };

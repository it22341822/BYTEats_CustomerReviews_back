const express = require('express');
const {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const router = express.Router();

router.post('/reviews', createReview);
router.get('/reviews/:restaurantId', getReviews);
router.put('/reviews/:reviewId', updateReview);
router.delete('/reviews/:reviewId', deleteReview);

module.exports = router;

import { Request, Response } from 'express';
import Review from '../models/Review';

//Get all reviews with optional filtering by restaurantId
export const getReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { restaurantId } = req.query;

    // If restaurantId is provided, filter by it
    const query = restaurantId ? { restaurantId } : {};

    const reviews = await Review.find(query).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get a review
export const getReviewById = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

//Create a review
export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId, customerName, restaurantId, reviewText, rating } = req.body;


    if (!customerId || !customerName || !reviewText || !rating || !restaurantId) {
      res.status(400).json({ message: 'Please provide all required fields' });
      return;
    }

    const review = await Review.create({
      customerId,
      customerName,
      restaurantId,
      reviewText,
      rating
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update Review 
export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reviewText, rating, customerName, restaurantId, customerId } = req.body;
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }

    // authorization check 
    if (customerId && review.customerId !== customerId) {
      res.status(403).json({ message: 'Not authorized to update this review' });
      return;
    }

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      {
        reviewText: reviewText || review.reviewText,
        rating: rating || review.rating,
        customerName: customerName || review.customerName,
        restaurantId: restaurantId || review.restaurantId
      },
      { new: true }
    );

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// delete Review
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { customerId } = req.body;

    const review = await Review.findById(id);

    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }

    //authorization check 
    if (customerId && review.customerId !== customerId) {
      res.status(403).json({ message: 'Not authorized to delete this review' });
      return;
    }

    await Review.findByIdAndDelete(id);

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get reviews
export const getReviewsByCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId } = req.params;

    const reviews = await Review.find({ customerId }).sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
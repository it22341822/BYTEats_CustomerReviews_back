import { Request, Response } from 'express';
import Review from '../models/Review';

//Get all reviews
export const getReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get a single review
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
    const { customerId, customerName, reviewText, rating } = req.body;
    
    if (!customerId || !customerName || !reviewText || !rating) {
      res.status(400).json({ message: 'Please provide all required fields' });
      return;
    }
    
    const review = await Review.create({
      customerId,
      customerName,
      reviewText,
      rating
    });
    
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update the updateReview function
export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reviewText, rating, customerName } = req.body; // Added customerName
    const { id } = req.params;
    
    const review = await Review.findById(id);
    
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }
    
    // Temporarily remove the customerId check for testing
    // if (review.customerId !== customerId) {
    //   res.status(403).json({ message: 'Not authorized to update this review' });
    //   return;
    // }
    
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { reviewText, rating, customerName }, // Added customerName
      { new: true }
    );
    
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// deleteReview
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const review = await Review.findById(id);
    
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }
    
    // Temporarily remove the customerId check for testing
    // if (review.customerId !== customerId) {
    //   res.status(403).json({ message: 'Not authorized to delete this review' });
    //   return;
    // }
    
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
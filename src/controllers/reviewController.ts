// src/controllers/reviewController.ts

import { Request, Response } from 'express';
import Review from '../models/Review';

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Get a single review
// @route   GET /api/reviews/:id
// @access  Public
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

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
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

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reviewText, rating } = req.body;
    const { id } = req.params;
    const customerId = req.body.customerId; // In reality, this would come from authentication middleware
    
    const review = await Review.findById(id);
    
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }
    
    // Check if the user owns this review
    if (review.customerId !== customerId) {
      res.status(403).json({ message: 'Not authorized to update this review' });
      return;
    }
    
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { reviewText, rating },
      { new: true }
    );
    
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const customerId = req.body.customerId; // In reality, this would come from authentication middleware
    
    const review = await Review.findById(id);
    
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }
    
    // Check if the user owns this review
    if (review.customerId !== customerId) {
      res.status(403).json({ message: 'Not authorized to delete this review' });
      return;
    }
    
    await Review.findByIdAndDelete(id);
    
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Get reviews by customer
// @route   GET /api/reviews/customer/:customerId
// @access  Private
export const getReviewsByCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId } = req.params;
    
    const reviews = await Review.find({ customerId }).sort({ createdAt: -1 });
    
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
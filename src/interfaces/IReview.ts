import { Document } from 'mongoose';

export interface IReview extends Document {
  customerId: string;
  customerName: string;
  reviewText: string;
  rating: number;
  restaurantId: string; 
  createdAt: Date;
  updatedAt: Date;
}
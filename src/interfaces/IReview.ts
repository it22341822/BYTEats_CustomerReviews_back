// src/interfaces/IReview.ts

import { Document } from 'mongoose';

export interface IReview extends Document {
  customerId: string;
  customerName: string;
  reviewText: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
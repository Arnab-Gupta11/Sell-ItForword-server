import { Document, Schema } from 'mongoose';

export interface IListing extends Document {
  title: string;
  description: string;
  price: number;
  condition: 'new' | 'used';
  images: string[];
  category: string;
  userID: Schema.Types.ObjectId;
  status: 'available' | 'sold';
  address: string;
  city: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

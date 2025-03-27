import { Document, Schema } from 'mongoose';

export interface IListing extends Document {
  title: string;
  description: string;
  price: number;
  condition: 'new' | 'used';
  image: string;
  category: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  status: 'available' | 'sold';
  isActive:boolean;
  address: string;
  city: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

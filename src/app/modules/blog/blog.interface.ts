import { Document, ObjectId } from 'mongoose';

export interface IBlog extends Document {
  _id: ObjectId;
  title: string;
  content: string;
  image: string;
  category: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

import { Document, Types } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parent?: Types.ObjectId;
  isActive: boolean;
  icon?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

import { Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  icon?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

import { Document, Types } from 'mongoose';

export interface ITransaction extends Document {
  buyerID: Types.ObjectId;
  sellerID: Types.ObjectId;
  listingID: Types.ObjectId;
  transactionId: string;
  status: 'pending' | 'completed';
  paymentStatus: 'pending' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}

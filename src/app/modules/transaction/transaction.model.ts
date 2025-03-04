import mongoose, { Schema } from 'mongoose';
import { ITransaction } from './transaction.interface';

const TransactionSchema = new Schema<ITransaction>(
  {
    buyerID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sellerID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    listingID: { type: Schema.Types.ObjectId, ref: 'Listing', required: true },
    transactionId: { type: String },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const Transaction = mongoose.model<ITransaction>(
  'Transaction',
  TransactionSchema,
);

import Stripe from 'stripe';
import mongoose from 'mongoose';

import { Transaction } from './transaction.model';
import { config } from '../../config';
import { IUser } from '../user/user.interface';
import Listing from '../listing/listing.model';
import AppError from '../../errors/AppError';

const stripe = new Stripe(config.stripe_secret_key as string);

// Create Stripe Checkout Session
export const createCheckoutSession = async (listingId: string, user: IUser) => {
  const listingInfo = await Listing.findById(listingId);

  if (!listingInfo) {
    throw new AppError(404, 'Product is not found');
  }
  const ownProduct = await Listing.findOne({
    userId: user._id,
    _id: listingId,
  });
  if (ownProduct) {
    throw new AppError(403, 'You cannot buy your own product.');
  }
  if (listingInfo.status === 'sold') {
    throw new AppError(404, 'Product is already sold.');
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'bdt',
          product_data: {
            name: listingInfo.title,
            images: [listingInfo.image],
          },
          unit_amount: Math.round(listingInfo.price * 100), // Convert BDT to paisa
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${config.frontend_url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.frontend_url}/cancel`,
    metadata: {
      buyerId: user._id.toString(), // ✅ Convert ObjectId to string
      sellerId: listingInfo.userId.toString(), // ✅ Convert ObjectId to string
      productId: listingId.toString(), // ✅ Convert ObjectId to string
    },
  });

  return {
    id: session.id,
    url: session.url,
  };
};

// Retrieve Payment Details & Save Transaction
export const getPaymentDetails = async (session_id: string) => {
  if (!session_id) {
    throw new AppError(400, 'Session ID is required.');
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (!session.metadata) {
    throw new AppError(400, 'Payment metadata is missing.');
  }

  const { buyerId, sellerId, productId } = session.metadata;
  const totalAnount = session.amount_total! / 100;

  const alreadyPaid = await Transaction.findOne({ transactionId: session.id });
  if (alreadyPaid) {
    return {
      id: session.id,
      amount_total: totalAnount,
      payment_status: session.payment_status,
      buyerId,
      sellerId,
      productId,
      transactionId: alreadyPaid._id,
      createdAt: alreadyPaid.createdAt,
    };
  }

  // Save transaction to database
  const newTransaction = new Transaction({
    transactionId: session.id,
    buyerID: new mongoose.Types.ObjectId(buyerId),
    sellerID: new mongoose.Types.ObjectId(sellerId),
    listingID: new mongoose.Types.ObjectId(productId),
    paymentStatus: session.payment_status === 'paid' ? 'completed' : 'pending',
  });

  await newTransaction.save();

  return {
    id: session.id,
    amount_total: totalAnount,
    payment_status: session.payment_status,
    buyerId,
    sellerId,
    productId,
    transactionId: newTransaction._id,
    createdAt: newTransaction.createdAt,
  };
};

export const TransactionService = {
  createCheckoutSession,
  getPaymentDetails,
};

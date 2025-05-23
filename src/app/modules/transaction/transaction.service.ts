import Stripe from 'stripe';
import mongoose from 'mongoose';

import { Transaction } from './transaction.model';
import { config } from '../../config';
import { IUser } from '../user/user.interface';
import Listing from '../listing/listing.model';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';

const stripe = new Stripe(config.stripe_secret_key as string);

// Create Stripe Checkout Session
const createCheckoutSession = async (listingId: string, user: IUser) => {
  const listingInfo = await Listing.findById(listingId);

  if (!listingInfo) {
    throw new AppError(
      404,
      'The product you are trying to purchase does not exist.',
    );
  }
  const ownProduct = await Listing.findOne({
    userId: user._id,
    _id: listingId,
  });
  if (ownProduct) {
    throw new AppError(403, 'You cannot purchase your own product.');
  }
  if (listingInfo.status === 'sold') {
    throw new AppError(400, 'This product has already been sold.');
  }

  const isPaymentComplete = await Transaction.findOne({ listingID: listingId });
  if (isPaymentComplete?.paymentStatus === 'completed') {
    throw new AppError(
      409,
      'A payment for this listing is currently being processed. Please wait or explore other available listings.',
    );
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
    cancel_url: `${config.frontend_url}/payment/cancel`,
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
const getPaymentDetails = async (session_id: string) => {
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

const purchaseHistoryOfAuserFromDB = async (
  userId: string,
  user: IUser,
  query: Record<string, unknown>,
) => {
  // Check if the requesting user is the same as the userId being queried
  if (user._id.toString() !== userId) {
    throw new AppError(403, 'Unauthorized access.');
  }

  const purchaseHistoryQuery = new QueryBuilder(
    Transaction.find({ buyerID: userId })
      .populate({
        path: 'listingID',
        populate: {
          path: 'category', // Populate category inside listingID
        },
      })
      .populate('buyerID')
      .populate('sellerID')
      .sort({ createdAt: -1 }), // Sorting from newest to oldest
    query,
  ).paginate();

  const result = await purchaseHistoryQuery.modelQuery;
  const meta = await purchaseHistoryQuery.countTotal();

  return {
    meta,
    result,
  };
};

const salesHistoryOfAuserFromDB = async (
  userId: string,
  user: IUser,
  query: Record<string, unknown>,
) => {
  // Check if the requesting user is the same as the userId being queried
  if (user._id.toString() !== userId) {
    throw new AppError(403, 'Unauthorized access.');
  }
  const salesHistoryQuery = new QueryBuilder(
    Transaction.find({ sellerID: userId })
      .populate({
        path: 'listingID',
        populate: {
          path: 'category', // Populate category inside listingID
        },
      })
      .populate('buyerID')
      .populate('sellerID')
      .sort({ createdAt: -1 }),
    query,
  ).paginate();

  const result = await salesHistoryQuery.modelQuery;
  const meta = await salesHistoryQuery.countTotal();

  return {
    meta,
    result,
  };
};

const updateTransactionStatusIntoDB = async (id: string) => {
  const result = await Transaction.findByIdAndUpdate(
    id,
    { status: 'completed' },
    { new: true, runValidators: true },
  );
  return result;
};

export const TransactionService = {
  createCheckoutSession,
  getPaymentDetails,
  purchaseHistoryOfAuserFromDB,
  salesHistoryOfAuserFromDB,
  updateTransactionStatusIntoDB,
};

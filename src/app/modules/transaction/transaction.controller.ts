import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { TransactionService } from './transaction.service';
import sendResponse from '../../utils/sendResponse';

export const createCheckoutSession = catchAsync(
  async (req: Request, res: Response) => {
    const { listingId } = req.body;
    const checkoutSession = await TransactionService.createCheckoutSession(
      listingId,
      req.user,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Payment completed successfully!',
      data: checkoutSession,
    });
  },
);

export const getPaymentDetails = catchAsync(
  async (req: Request, res: Response) => {
    const { session_id } = req.query;
    const paymentDetails = await TransactionService.getPaymentDetails(
      session_id as string,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Generate new access token!',
      data: paymentDetails,
    });
  },
);

export const TransactionController = {
  createCheckoutSession,
  getPaymentDetails,
};

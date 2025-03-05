import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { TransactionService } from './transaction.service';
import sendResponse from '../../utils/sendResponse';

const createCheckoutSession = catchAsync(
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

const getPaymentDetails = catchAsync(async (req: Request, res: Response) => {
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
});
const getPaurchaseHistory = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const purchaseHistory = await TransactionService.purchaseHistoryOfAuserFromDB(
    userId,
    req.user,
    req.query,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Purchase history retrived successfully!',
    data: purchaseHistory,
  });
});
const getSalesHistory = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const salesHistory = await TransactionService.salesHistoryOfAuserFromDB(
    userId,
    req.user,
    req.query,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Sales history retrived successfully!',
    data: salesHistory,
  });
});

export const TransactionController = {
  createCheckoutSession,
  getPaymentDetails,
  getPaurchaseHistory,
  getSalesHistory,
};

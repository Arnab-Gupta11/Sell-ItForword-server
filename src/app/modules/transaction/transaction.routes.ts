import express from 'express';

import auth from '../../middlewares/auth';
import { TransactionController } from './transaction.controller';

const router = express.Router();

router.post('/', auth('user'), TransactionController.createCheckoutSession);
router.get('/payment-details', TransactionController.getPaymentDetails);
router.get(
  '/purchases/:userId',
  auth('user'),
  TransactionController.getPaurchaseHistory,
);
router.get(
  '/sales/:userId',
  auth('user'),
  TransactionController.getSalesHistory,
);
router.put(
  '/status/:id',
  auth('user'),
  TransactionController.updateTransactionStatus,
);

export const TransationRoutes = router;

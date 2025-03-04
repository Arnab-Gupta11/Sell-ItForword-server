import express from 'express';

import auth from '../../middlewares/auth';
import { TransactionController } from './transaction.controller';

const router = express.Router();

router.post('/', auth('user'), TransactionController.createCheckoutSession);
router.get('/payment-details', TransactionController.getPaymentDetails);
// router.get('/:listingId', listingControllers.getSingleListinng);
// router.get(
//   '/categories/:category',
//   listingControllers.getAllListingsByCategory,
// );
// router.get('/user/:id', auth('user'), listingControllers.getAllListingsOfAUser);
// router.delete('/:listingId', auth('user'), listingControllers.deleteListing);
// router.put('/:listingId', auth('user'), listingControllers.updateListing);

export const TransationRoutes = router;

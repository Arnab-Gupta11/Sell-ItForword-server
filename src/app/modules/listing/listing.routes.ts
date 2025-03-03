import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ListingValidations } from './listing.validation';
import { listingControllers } from './listing.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(ListingValidations.createListingValidationSchema),
  listingControllers.createListing,
);
router.get('/', listingControllers.getAllListings);
router.get('/:listingId', listingControllers.getSingleListinng);
router.get(
  '/categories/:category',
  listingControllers.getAllListingsByCategory,
);
router.get('/user', auth('user'), listingControllers.getAllListingsOfAUser);
router.delete('/:listingId', auth('user'), listingControllers.deleteListing);

export const ListingRoutes = router;

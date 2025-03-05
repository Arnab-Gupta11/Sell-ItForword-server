import express from 'express';
import auth from '../../middlewares/auth';
import { WishlistControllers } from './wishlist.controller';

const router = express.Router();

router.put('/:id', auth('user'), WishlistControllers.updateWishlist);
router.get('/:userId', auth('user'), WishlistControllers.getAllWishlistOfAUser);
router.get(
  '/check/:userId',
  auth('user'),
  WishlistControllers.isListingInWishlist,
);
// router.get('/', UserController.getAllUser);
router.delete('/:id', auth('user'), WishlistControllers.removeFromWishlist);
// router.put('/userStatus/:id', auth('admin'), UserController.updateUserInfo);

export const WishlistRoutes = router;

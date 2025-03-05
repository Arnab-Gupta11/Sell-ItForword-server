import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import WishList from './wishlist.model';

const updateWishlistIntoDB = async (listingId: string, user: IUser) => {
  const listingObjectId = new Types.ObjectId(listingId);

  const isUserExist = await User.exists(user._id);
  if (!isUserExist) {
    throw new AppError(
      400,
      'Login to your account.To add the Listing in Your wishlist.',
    );
  }
  let wishlist = await WishList.findOne({ userID: user._id });

  if (!wishlist) {
    wishlist = new WishList({ userID: user._id, listings: [listingId] });
  } else {
    if (!wishlist.listings.includes(listingObjectId)) {
      wishlist.listings.push(listingObjectId);
    } else {
      wishlist.listings = wishlist.listings.filter(
        (id) => id.toString() !== listingId,
      );
    }
  }
  const result = await wishlist.save();
  return result;
};

const removeFromWishlist = async (listingId: string, user: IUser) => {
  const wishlist = await WishList.findOne({ userID: user?._id });
  let result;
  if (wishlist) {
    wishlist.listings = wishlist.listings.filter(
      (id) => id.toString() !== listingId,
    );
    result = await wishlist.save();
  }
  return result;
};

export const getWishlist = async (id: string, user: IUser) => {
  if (user._id.toString() !== id) {
    throw new AppError(403, 'You can not accesss this wishlist.');
  }
  const wishlist = await WishList.findOne({ userID: id }).populate('listings');

  return wishlist;
};

const isListingInWishlist = async (
  listingId: string,
  user: IUser,
): Promise<boolean> => {
  const wishlist = await WishList.findOne({ userID: user._id });

  if (!wishlist) {
    return false;
  }

  return wishlist.listings.some((id) => id.toString() === listingId);
};

export const WishlistServices = {
  updateWishlistIntoDB,
  removeFromWishlist,
  getWishlist,
  isListingInWishlist,
};

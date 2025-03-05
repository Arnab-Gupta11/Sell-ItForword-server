import mongoose from 'mongoose';
import { IWishlist } from './wishlist.interface';

const WishlistSchema = new mongoose.Schema<IWishlist>(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
  },
  { timestamps: true },
);

const WishList = mongoose.model<IWishlist>('Wishlist', WishlistSchema);
export default WishList;

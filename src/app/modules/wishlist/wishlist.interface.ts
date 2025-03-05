import { Types } from 'mongoose';

export interface IWishlist {
  _id?: Types.ObjectId;
  userID: Types.ObjectId;
  listings: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

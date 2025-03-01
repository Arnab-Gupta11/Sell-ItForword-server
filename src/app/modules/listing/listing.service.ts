import QueryBuilder from '../../builder/QueryBuilder';
import Listing from './listing.model';
import { IUser } from '../user/user.interface';
import { IListing } from './listing.interface';
import { listingSearchableFields } from './listing.constant';
import AppError from '../../errors/AppError';

//Save product into database.
const createListingIntoDB = async (
  listingData: Partial<IListing>,
  user: IUser,
) => {
  const newListing = new Listing({ ...listingData, userId: user._id });
  const result = await newListing.save();
  return result;
};
//Get all product from database.
const getAllListingFromDB = async (query: Record<string, unknown>) => {
  const maxPriceData = await Listing.findOne()
    .sort({ price: -1 })
    .select('price')
    .exec();
  const maxListingPrice = maxPriceData?.price || 0;
  const listingQuery = new QueryBuilder(Listing.find(), query)
    .search(listingSearchableFields)
    .filter()
    .filterByPrice(maxListingPrice)
    .sort()
    .sortOrder()
    .paginate();

  const result = await listingQuery.modelQuery;
  const meta = await listingQuery.countTotal();

  return {
    meta,
    result,
  };
};
const getAllListingOfAUserFromDB = async (
  query: Record<string, unknown>,
  user: IUser,
) => {
  const maxPriceData = await Listing.findOne()
    .sort({ price: -1 })
    .select('price')
    .exec();
  const maxListingPrice = maxPriceData?.price || 0;
  const listingQuery = new QueryBuilder(
    Listing.find({ userId: user._id }),
    query,
  )
    .search(listingSearchableFields)
    .filter()
    .filterByPrice(maxListingPrice)
    .sort()
    .sortOrder()
    .paginate();

  const result = await listingQuery.modelQuery;
  const meta = await listingQuery.countTotal();

  return {
    meta,
    result,
  };
};
//Get single product from database.
const getSingleListingFromDB = async (id: string) => {
  const result = await Listing.findById(id).populate('userID');
  if (!result) {
    throw new AppError(404, 'Listing Item not found');
  }
  return result;
};
//Update product into database.
// const updateProductIntoDB = async (id: string, updates: object) => {
//   const result = await Listing.findByIdAndUpdate(
//     id,
//     { ...updates },
//     { new: true, runValidators: true },
//   );
//   return result;
// };
//Delete product from database.
const deleteListingFromDB = async (id: string, user: IUser) => {
  const listing = await Listing.findOne({
    userId: user._id,
    _id: id,
  });
  if (!listing) {
    throw new AppError(404, 'Listing Not Found');
  }
  const result = await Listing.findByIdAndDelete(id);
  return result;
};
// const getMaximumPriceFromDB = async () => {
//   // Find the product with the highest price by sorting in descending order
//   const product = await Product.findOne()
//     .sort({ price: -1 })
//     .select('price')
//     .lean();

//   // Return the price if a product is found, otherwise null
//   return product?.price || null;
// };

const markAsSoldIntoDB = async (id: string, user: IUser) => {
  const listing = await Listing.findById(id);

  if (!listing) {
    throw new AppError(404, 'Listing not found');
  }
  if (listing.userID.toString() !== user?._id)
    throw new AppError(403, 'You are not authorized to update status');

  listing.status = 'sold';
  const result = await listing.save();
  return result;
};

export const listingServices = {
  createListingIntoDB,
  getAllListingFromDB,
  getAllListingOfAUserFromDB,
  deleteListingFromDB,
  getSingleListingFromDB,
  markAsSoldIntoDB,
};

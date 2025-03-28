import QueryBuilder from '../../builder/QueryBuilder';
import Listing from './listing.model';
import { IUser } from '../user/user.interface';
import { IListing } from './listing.interface';
import { listingSearchableFields } from './listing.constant';
import AppError from '../../errors/AppError';
import { ICategory } from '../category/category.interface';

//Save product into database.
const createListingIntoDB = async (
  listingData: Partial<IListing>,
  user: IUser,
) => {
  const newListingData = { ...listingData, userId: user._id };

  const result = await Listing.create(newListingData);
  return result;
};

//Get all product from database.
const getAllListingFromDB = async (query: Record<string, unknown>) => {
  const maxPriceData = await Listing.findOne()
    .sort({ price: -1 })
    .select('price')
    .exec();
  const maxListingPrice = maxPriceData?.price || 0;
  const listingQuery = new QueryBuilder(Listing.find({ isActive: true }), query)
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
  id: string,
) => {
  const maxPriceData = await Listing.findOne()
    .sort({ price: -1 })
    .select('price')
    .exec();
  const maxListingPrice = maxPriceData?.price || 0;
  const listingQuery = new QueryBuilder(
    Listing.find({ userId: id, isActive: true }).populate(
      'category',
      '_id name isActive ',
    ),
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
const getAllListingByCategory = async (
  categoryId: string,
  query: Record<string, unknown>,
) => {
  const maxPriceData = await Listing.findOne()
    .sort({ price: -1 })
    .select('price')
    .exec();
  const maxListingPrice = maxPriceData?.price || 0;
  const listingQuery = new QueryBuilder(
    Listing.find({ category: categoryId, isActive: true }),
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
  const result = await Listing.findById(id)
    .populate('userId', '-createdAt -updatedAt -isBlocked')
    .populate('category', '_id name isActive ');
  if (!result) {
    throw new AppError(404, 'Listing Item not found');
  }
  return result;
};
//Update listing into database.
const updateListingIntoDB = async (
  id: string,
  updates: Partial<ICategory>,
  user: IUser,
) => {
  const listing = await Listing.findOne({
    _id: id,
    userId: user._id,
    isActive: true,
  });
  if (!listing) {
    throw new AppError(404, 'Listing Not Found');
  }
  if (listing.userId.toString() !== user._id.toString())
    throw new AppError(403, 'You are not authorized to update this listings');
  const result = await Listing.findByIdAndUpdate(
    id,
    { ...updates },
    { new: true, runValidators: true },
  );
  return result;
};
//Delete listing from database.
const deleteListingFromDB = async (id: string, user: IUser) => {
  let listing;
  if (user.role === 'admin') {
    listing = await Listing.findOne({
      _id: id,
    });
  } else {
    listing = await Listing.findOne({
      userId: user._id,
      _id: id,
    });
  }

  if (!listing) {
    throw new AppError(404, 'Listing Not Found');
  }
  const result = await Listing.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true, runValidators: true },
  );
  return result;
};

const markAsSoldIntoDB = async (id: string, user: IUser) => {
  const listing = await Listing.findById(id);

  if (!listing) {
    throw new AppError(404, 'Listing not found');
  }
  if (listing.userId.toString() !== user._id.toString())
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
  getAllListingByCategory,
  updateListingIntoDB,
};

import { Category } from '../category/category.model';
import Listing from '../listing/listing.model';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';

const getMetadata = async (authUser: IUser) => {
  if (authUser.role === 'admin') {
    const totalCategories = await Category.estimatedDocumentCount();
    const totalUsers = await User.estimatedDocumentCount();
    const totalListings = await Listing.estimatedDocumentCount();

    const categoryDistribution = await Listing.aggregate([
      //Group all the listings with same category.
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      //Join the category data.
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $project: {
          categoryName: '$category.name',
          count: 1,
          _id: 0,
        },
      },
    ]);

    const listingConditionDistribution = await Listing.aggregate([
      {
        $group: {
          _id: '$condition',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          condition: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ]);

    const latestListings = await Listing.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title image status city price');

    const latestUsers = await User.find({ isBlocked: false, role: 'user' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName email image ');

    return {
      stateData: {
        totalCategories,
        totalUsers,
        totalListings,
      },
      categoryDistribution,
      listingConditionDistribution,
      latestListings,
      latestUsers,
    };
  }
};

export const MetaServices = {
  getMetadata,
};

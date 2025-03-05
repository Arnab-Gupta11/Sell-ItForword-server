import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { WishlistServices } from './wishlist.services';
import sendResponse from '../../utils/sendResponse';

const updateWishlist = catchAsync(async (req: Request, res: Response) => {
  const wishlist = await WishlistServices.updateWishlistIntoDB(
    req.params.id,
    req.user,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Wishlist Updated successfully.',
    data: wishlist,
  });
});
const removeFromWishlist = catchAsync(async (req: Request, res: Response) => {
  const wishlist = await WishlistServices.removeFromWishlist(
    req.params.id,
    req.user,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully removed From Wishlist.',
    data: wishlist,
  });
});
const getAllWishlistOfAUser = catchAsync(
  async (req: Request, res: Response) => {
    const wishlist = await WishlistServices.getWishlist(
      req.params.userId,
      req.user,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Retrived Wishlist Successfully.',
      data: wishlist,
    });
  },
);

const isListingInWishlist = catchAsync(async (req: Request, res: Response) => {
  const wishlist = await WishlistServices.isListingInWishlist(
    req.params.userId,
    req.user,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Checking Completed successfully.',
    data: wishlist,
  });
});

export const WishlistControllers = {
  updateWishlist,
  removeFromWishlist,
  getAllWishlistOfAUser,
  isListingInWishlist,
};

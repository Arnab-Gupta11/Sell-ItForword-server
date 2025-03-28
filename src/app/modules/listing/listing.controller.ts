import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { listingServices } from './listing.service';
import sendResponse from '../../utils/sendResponse';
import { responseMessages } from '../../utils/responseMessage';

//creating a new listing.
const createListing = catchAsync(async (req: Request, res: Response) => {
  const newListing = req.body;
  const result = await listingServices.createListingIntoDB(
    newListing,
    req.user,
  );
  if (result) {
    sendResponse(res, {
      success: true,
      message: responseMessages.LISTING_CREATE,
      statusCode: 201,
      data: result,
    });
  }
});

//get single listing.
const getSingleListinng = catchAsync(async (req: Request, res: Response) => {
  const { listingId } = req.params;
  const result = await listingServices.getSingleListingFromDB(listingId);
  if (result) {
    sendResponse(res, {
      success: true,
      message: responseMessages.LISTING_GET_ONE,
      statusCode: 200,
      data: result,
    });
  }
});

//get all listing.
const getAllListings = catchAsync(async (req: Request, res: Response) => {
  const result = await listingServices.getAllListingFromDB(req.query);
  if (result) {
    sendResponse(res, {
      success: true,
      message: responseMessages.LISTING_GET_ALL,
      statusCode: 200,
      meta: result.meta,
      data: result.result,
    });
  }
});
const getAllListingsByCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const result = await listingServices.getAllListingByCategory(
      categoryId,
      req.query,
    );
    if (result) {
      sendResponse(res, {
        success: true,
        message: responseMessages.LISTING_GET_ALL,
        statusCode: 200,
        meta: result.meta,
        data: result.result,
      });
    }
  },
);
//get all listing of a individual user.
const getAllListingsOfAUser = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await listingServices.getAllListingOfAUserFromDB(
      req.query,
      id,
    );
    if (result) {
      sendResponse(res, {
        success: true,
        message: responseMessages.LISTING_GET_ALL_OF_A_USER,
        statusCode: 200,
        meta: result.meta,
        data: result.result,
      });
    }
  },
);
//update listing.
const updateListing = catchAsync(async (req: Request, res: Response) => {
  const updates = req.body;
  const { listingId } = req.params;
  const result = await listingServices.updateListingIntoDB(
    listingId,
    updates,
    req.user,
  );
  if (result) {
    sendResponse(res, {
      success: true,
      message: responseMessages.LISTING_UPDATE,
      statusCode: 200,
      data: result,
    });
  }
});
//delete product.
const deleteListing = catchAsync(async (req: Request, res: Response) => {
  const { listingId } = req.params;
  const result = await listingServices.deleteListingFromDB(listingId, req.user);
  //If no product found.
  if (result) {
    sendResponse(res, {
      success: true,
      message: responseMessages.LISTING_DELETE,
      statusCode: 200,
      data: result,
    });
  }
});
const markAsSold = catchAsync(async (req: Request, res: Response) => {
  const { listingId } = req.params;
  const result = await listingServices.markAsSoldIntoDB(listingId, req.user);
  //If no product found.
  if (result) {
    sendResponse(res, {
      success: true,
      message: responseMessages.LISTING_SOLD,
      statusCode: 200,
      data: {},
    });
  }
});

export const listingControllers = {
  createListing,
  getAllListings,
  getAllListingsOfAUser,
  getSingleListinng,
  deleteListing,
  markAsSold,
  getAllListingsByCategory,
  updateListing,
};

import { Request, Response } from 'express';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registration completed successfully!',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUser(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const myProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUserById(req.params.id, req.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetch User details successfully',
    data: result,
  });
});

const updateUserInfo = catchAsync(async (req: Request, res: Response) => {
  const updatedUser = await UserServices.updateUserProfileIntoDB(
    req.params.id,
    req.body,
    req.user,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Profile Updated successfully.',
    data: updatedUser,
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const result = await UserServices.updateUserStatusIntoDB(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `User is now ${result?.isBlocked ? 'Banned' : 'Active'}`,
    data: result,
  });
});

export const UserController = {
  registerUser,
  getAllUser,
  myProfile,
  updateUserInfo,
  updateUserStatus,
};

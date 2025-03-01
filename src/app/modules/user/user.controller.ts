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

// const myProfile = catchAsync(async (req, res) => {
//   const result = await UserServices.myProfile(req.user as IJwtPayload);

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Profile retrieved successfully',
//     data: result,
//   });
// });

// const updateProfile = catchAsync(async (req, res) => {
//   const result = await UserServices.updateProfile(
//     req.body,
//     req.file as IImageFile,
//     req.user as IJwtPayload,
//   );

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: `Profile updated successfully`,
//     data: result,
//   });
// });

// const updateUserStatus = catchAsync(async (req, res) => {
//   const userId = req.params.id;
//   const result = await UserServices.updateUserStatus(userId);

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: `User is now ${result.isActive ? 'active' : 'inactive'}`,
//     data: result,
//   });
// });

export const UserController = {
  registerUser,
  getAllUser,
  // myProfile,
  // updateUserStatus,
  // updateProfile,
};

import { Request, Response } from 'express';
import { CategoryServices } from './category.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.createCategory(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Category created succesfully',
    data: result,
  });
});
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllCategories();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Categories retrived succesfully',
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
};

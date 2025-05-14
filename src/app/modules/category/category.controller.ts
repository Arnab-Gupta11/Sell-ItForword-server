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

//get all listing.
const getAllCategoriesByAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryServices.getAllCategoriesByAdmin(req.query);
    if (result) {
      sendResponse(res, {
        success: true,
        message: 'All category retrived successfully.',
        statusCode: 200,
        meta: result.meta,
        data: result.result,
      });
    }
  },
);

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const result = await CategoryServices.getSingleCategoryFromDB(categoryId);
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'Retrived category details successfully.',
      statusCode: 200,
      data: result,
    });
  }
});
//update listing.
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const updates = req.body;
  const { categoryId } = req.params;
  const result = await CategoryServices.updateCategoryFromDB(
    categoryId,
    updates,
  );
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'Category updated successfully.',
      statusCode: 200,
      data: result,
    });
  }
});
//delete product.
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const result = await CategoryServices.deleteCategoryFromDB(categoryId);
  //If no product found.
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'Category deleted successfully.',
      statusCode: 200,
      data: result,
    });
  }
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  getAllCategoriesByAdmin,
  updateCategory,
  deleteCategory,
};

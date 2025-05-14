import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { categorySearchableFields } from './category.constants';
import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (categoryData: Partial<ICategory>) => {
  const category = new Category({
    ...categoryData,
  });

  const result = await category.save();

  return result;
};
const getAllCategories = async () => {
  const result = await Category.find({ isActive: true });
  return result;
};

const getAllCategoriesByAdmin = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(
    Category.find({ isActive: true }),
    query,
  )
    .search(categorySearchableFields)
    .filter()
    .sort()
    .sortOrder()
    .paginate();

  const result = await categoryQuery.modelQuery;
  const meta = await categoryQuery.countTotal();

  return {
    meta,
    result,
  };
};

//Get single product from database.
const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id);
  if (!result) {
    throw new AppError(404, 'Category not found');
  }
  return result;
};
//Update listing into database.
const updateCategoryFromDB = async (
  id: string,
  updates: Partial<ICategory>,
) => {
  const category = await Category.findOne({
    _id: id,
    isActive: true,
  });
  if (!category) {
    throw new AppError(404, 'Category Not Found');
  }

  const result = await Category.findByIdAndUpdate(
    id,
    { ...updates },
    { new: true, runValidators: true },
  );
  return result;
};
//Delete listing from database.
const deleteCategoryFromDB = async (id: string) => {
  const category = await Category.findOne({
    _id: id,
    isActive: true,
  });

  if (!category) {
    throw new AppError(404, 'Category Not Found');
  }
  const result = await Category.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true, runValidators: true },
  );
  return result;
};

export const CategoryServices = {
  createCategory,
  getAllCategories,
  getAllCategoriesByAdmin,
  getSingleCategoryFromDB,
  updateCategoryFromDB,
  deleteCategoryFromDB,
};

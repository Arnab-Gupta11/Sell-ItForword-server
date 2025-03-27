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
  const result = await Category.find({isActive:true}).sort({ createdAt: -1 });
  return result;
};

export const CategoryServices = {
  createCategory,
  getAllCategories,
};

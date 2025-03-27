import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (categoryData: Partial<ICategory>) => {
  const category = new Category({
    ...categoryData,
  });

  const result = await category.save();

  return result;
};

export const CategoryServices = {
  createCategory,
};

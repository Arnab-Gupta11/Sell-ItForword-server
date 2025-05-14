import { Router } from 'express';
import { CategoryControllers } from './category.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidations } from './category.validation';

const router = Router();

// Define routes
router.post(
  '/',
  auth('admin'),
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);
router.get('/', CategoryControllers.getAllCategories);
router.get(
  '/admin',
  auth('admin'),
  CategoryControllers.getAllCategoriesByAdmin,
);
router.get('/:categoryId', CategoryControllers.getSingleCategory);

router.delete(
  '/:categoryId',
  auth('admin'),
  CategoryControllers.deleteCategory,
);
router.put('/:categoryId', auth('admin'), CategoryControllers.updateCategory);

export const CategoryRoutes = router;

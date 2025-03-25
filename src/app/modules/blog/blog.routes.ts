import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import { BlogControllers } from './blog.controller';

const router = Router();

router
  .route('/')
  .post(
    validateRequest(BlogValidations.createBlogValidationSchema),
    BlogControllers.createBlog,
  )
  .get(BlogControllers.getAllBlogs);
router
  .route('/:id')
  .patch(
    validateRequest(BlogValidations.updateBlogValidationSchema),
    BlogControllers.updateBlog,
  )
  .delete(BlogControllers.deleteBlog)
  .get(BlogControllers.getSingleBlog);
export const BlogRoutes = router;

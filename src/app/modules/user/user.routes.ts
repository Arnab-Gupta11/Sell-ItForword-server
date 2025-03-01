import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.registerUser,
);
// router.get('/:id', auth('user'), UserController.getSingleUser);
router.get('/', UserController.getAllUser);
// router.put('/:id', auth('admin', 'user'), UserController.updateUserInfo);
// router.put('/userStatus/:id', auth('admin'), UserController.updateUserInfo);

export const UserRoutes = router;

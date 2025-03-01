import { Router } from 'express';

import { AuthValidation } from './auth.validation';

import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);
router.post('/refresh-token', AuthControllers.refreshToken);
export const AuthRoutes = router;

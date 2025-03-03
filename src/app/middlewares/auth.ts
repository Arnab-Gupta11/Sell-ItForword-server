import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { config } from '../config';
import { TUserRole } from '../modules/user/user.interface';
import User from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, email } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByEmail(email);

    if (!user) {
      throw new AppError(404, 'This user is not found !');
    }

    // checking if the user is blocked
    const userStatus = user?.isBlocked;

    if (userStatus) {
      throw new AppError(403, 'This user is blocked ! !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized!');
    }

    req.user = user;
    next();
  });
};

export default auth;

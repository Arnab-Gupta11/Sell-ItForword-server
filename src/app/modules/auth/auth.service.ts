/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import mongoose from 'mongoose';
import { IAuth, IJwtPayload } from './auth.interface';
import User from '../user/user.model';
import AppError from '../../errors/AppError';
import { config } from '../../config';
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from './auth.utils';
import { Secret } from 'jsonwebtoken';

const loginUser = async (payload: IAuth) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findOne({ email: payload.email }).session(session);
    if (!user) {
      throw new AppError(
        404,
        'No account found with this email address. Please sign up or log in using a different email.',
      );
    }

    if (user.isBlocked) {
      throw new AppError(403, 'This user is Blocked!');
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
      throw new AppError(403, 'Password does not match');
    }

    const jwtPayload: IJwtPayload = {
      userId: user._id.toString() as string,
      fullName: user.fullName as string,
      email: user.email as string,
      profileImg: user.image,
      role: user.role,
    };

    const accessToken = createAccessToken(
      jwtPayload,
      config.jwt_access_secret as string,
    );

    const refreshToken = createRefreshToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
    );

    await session.commitTransaction();

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt_refresh_secret as Secret);
  } catch (err: any) {
    throw new AppError(403, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, 'User does not exist');
  }

  if (user.isBlocked) {
    throw new AppError(400, 'User is blocked');
  }

  const jwtPayload: IJwtPayload = {
    userId: user._id.toString() as string,
    fullName: user.fullName as string,
    email: user.email as string,
    profileImg: user.image,
    role: user.role,
  };

  const newAccessToken = createAccessToken(
    jwtPayload,
    config.jwt_access_secret as Secret,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};

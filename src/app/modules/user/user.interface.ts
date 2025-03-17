/* eslint-disable no-unused-vars */
import { Document, Model, ObjectId } from 'mongoose';
import { USER_ROLE } from './user.constant';

// User Schema Definition
export interface IUser extends Document {
  _id: ObjectId;
  fullName: string;
  email: string;
  password: string;
  image: string;
  role: 'user' | 'admin';
  isBlocked: boolean;
  phone?: string;
  address?: string;
  city?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface userDataPayload {
  fullName: string;
  email: string;
  password: string;
  confirmedPassword: string;
}
export interface UserModel extends Model<IUser> {
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isUserExistsByEmail(id: string): Promise<IUser>;
  checkUserExist(userId: string): Promise<IUser>;
}

export type TUserRole = keyof typeof USER_ROLE;

/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

// User Schema Definition
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  image: string;
  role: 'user' | 'admin';
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface userDataPayload extends IUser {
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

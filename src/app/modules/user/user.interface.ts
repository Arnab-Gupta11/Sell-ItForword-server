import { Document, Model } from 'mongoose';

// Enum for User Roles
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

// User Schema Definition
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  role: UserRole;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
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

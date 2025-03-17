import { ObjectId } from 'mongoose';

export interface IAuth {
  email: string;
  password: string;
}
export interface IJwtPayload {
  userId: ObjectId;
  fullName: string;
  email: string;
  profileImg: string;
  role: string;
}

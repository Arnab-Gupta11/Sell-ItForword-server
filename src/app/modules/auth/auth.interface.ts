export interface IAuth {
  email: string;
  password: string;
}
export interface IJwtPayload {
  userId: string;
  fullName: string;
  email: string;
  profileImg: string;
  role: string;
}

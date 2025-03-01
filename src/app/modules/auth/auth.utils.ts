import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { IJwtPayload } from './auth.interface';
export const createAccessToken = (jwtPayload: IJwtPayload, secret: Secret) => {
  return jwt.sign(jwtPayload, secret, { expiresIn: '7d' });
};
export const createRefreshToken = (jwtPayload: IJwtPayload, secret: Secret) => {
  return jwt.sign(jwtPayload, secret, { expiresIn: '365d' });
};
export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

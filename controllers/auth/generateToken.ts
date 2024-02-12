import * as jwt from 'jsonwebtoken';

type Token = {
  accessToken: string;
  refreshToken: string;
};

const jwtAccessSecret = process.env.JWT_ACCESS_KEY!;
const jwtRefreshSecret = process.env.JWT_ACCESS_KEY!;
const generateToken = (user: string | Buffer | object): Token => {
  return {
    accessToken: jwt.sign(user, jwtAccessSecret, {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_ACCESS_EXPIRY!,
    }),
    refreshToken: jwt.sign(user, jwtRefreshSecret, {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_REFRESH_EXPIRY!,
    }),
  };
};

export default generateToken;

import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import generateToken from './generateToken';

const updateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) throw new Error('Lack of information for authentication');
    const refreshToken = authorizationHeader.split(' ')[1];
    if (!refreshToken) throw new Error('Lack of information for authentication');
    jwt.verify(refreshToken, process.env.JWT_ACCESS_KEY!, (error, decoded) => {
      if (error) return res.status(403).json({ ...error });
      const user = { ...(decoded as jwt.JwtPayload) };
      const token = generateToken({ id: user.id, email: user.email });
      return res.status(200).json({ ...token });
    });
  } catch (e) {
    if (e instanceof Error) return res.status(401).json({ message: e.message });
    next(e);
  }
};

export default updateToken;

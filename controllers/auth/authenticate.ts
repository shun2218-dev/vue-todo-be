import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) throw new Error('Lack of information for authentication');
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) throw new Error('Lack of information for authentication');
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY!, (error, decoded) => {
      if (error) return res.status(403).json({ ...error });
      const user = { ...(decoded as jwt.JwtPayload) };
      res.locals.id = user.id;
      next();
    });
  } catch (e) {
    if (e instanceof Error) return res.status(401).json({ message: e.message });
    next(e);
  }
};

export default authenticate;

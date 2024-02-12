import { exclude } from '../../utils/exclude';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '..';
import { compare } from 'bcrypt';
import { User } from '../../types/db';
import generateToken from './generateToken';

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, hashedPassword: password } = req.body as Pick<User, 'email' | 'hashedPassword'>;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new Error('Failed to find user');
    const isCorrected = await compare(password, user.hashedPassword);

    if (!isCorrected) throw new Error('Failed to sign in');
    const { accessToken, refreshToken } = generateToken(
      exclude(user, ['hashedPassword', 'createdAt', 'updatedAt'])
    );
    return res.status(200).json({ message: 'Login successful!', accessToken, refreshToken });
  } catch (e) {
    next(e);
  }
};

export default signIn;

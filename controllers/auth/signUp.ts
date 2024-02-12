import { NextFunction, Request, Response } from 'express';
import { prisma } from '..';
import { hash } from 'bcrypt';
import { User } from '../../types/db';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, hashedPassword: password } = req.body as Pick<User, 'email' | 'hashedPassword'>;
    const hashedPassword = await hash(password, 12);
    const user = await prisma.user.create({ data: { email, hashedPassword } });
    if (!user) throw new Error('Failed to register user');
    return res.status(201).json({ message: 'Registration successful!' });
  } catch (e) {
    next(e);
  }
};

export default signUp;

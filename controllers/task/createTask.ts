import { NextFunction, Request, Response } from 'express';
import { Task, User } from '../../types/db';
import { prisma } from '..';
import * as jwt from 'jsonwebtoken';

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('createTask');
    const accessToken = req.headers['authorization']?.split(' ')[1];
    console.log(accessToken, 'access token');
    const decoded = jwt.verify(accessToken!, process.env.JWT_ACCESS_KEY!) as Pick<
      User,
      'id' | 'email'
    >;
    const { title, description } = req.body as Pick<Task, 'title' | 'description'>;
    const data = await prisma.task.create({
      data: { title, description, userId: decoded.id },
    });
    if (!data) throw new Error('Failed to create task');
    return res.status(201).json(data);
  } catch (e) {
    next(e);
  }
};

export default createTask;

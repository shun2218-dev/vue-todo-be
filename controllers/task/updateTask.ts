import { NextFunction, Request, Response } from 'express';
import { Task } from '../../types/db';
import { prisma } from '..';

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body as Pick<Task, 'title' | 'description'>;
    const updateData = await prisma.task.update({
      where: {
        id: req.params.taskId,
      },
      data: {
        title,
        description,
      },
    });
    if (!updateData) throw new Error('Failed to update task');
    return res.status(200).json(updateData);
  } catch (e) {
    next(e);
  }
};

export default updateTask;

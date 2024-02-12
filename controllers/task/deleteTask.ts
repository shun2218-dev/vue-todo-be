import { NextFunction, Request, Response } from 'express';
import { prisma } from '..';

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleteData = await prisma.task.delete({
      where: {
        id: req.params.taskId,
      },
    });
    if (!deleteData) throw new Error('Failed to delete task');
    return res.status(200).json(deleteData.id);
  } catch (e) {
    next(e);
  }
};

export default deleteTask;

import { NextFunction, Request, Response } from 'express';
import { QueryParam } from '../../types/index';
import { prisma } from '..';

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderBy, sorted, q, page } = req.query as QueryParam;
    const options = {
      orderBy: sorted === 'title' ? { title: orderBy ?? 'asc' } : { createdAt: orderBy ?? 'asc' },
      where: { title: { contains: q ?? '' }, userId: res.locals.id },
      take: 10,
      skip: page === undefined || parseInt(page) <= 1 ? 0 : (parseInt(page) - 1) * 10,
    };
    const tasks = await prisma.task.findMany(options);
    const taskCount = await prisma.task.count({
      where: options.where,
    });
    if (tasks.length <= 0) {
      return res.status(200).json({
        total_page: 0,
        current_page: 0,
        count: taskCount,
        data: [],
      });
    }
    return res.status(200).json({
      total_page: Math.ceil(taskCount / 10),
      current_page: parseInt(page ?? '1'),
      count: taskCount,
      data: tasks,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
    }
  }
};

export default getTasks;

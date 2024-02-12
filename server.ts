import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { authRouter, taskRouter } from './routes/api';

const app = express();
const port = 3000;

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  return res.status(500).json({ message: err.message });
};

const setShareHeader = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTION');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};

app.use(express.json());
app.use(setShareHeader);
app.use(cors());

app.get('/', (_, res: Response) => {
  console.log('get title');
  res.status(200).json({ title: 'Full Stack Todo App!' });
});

app.use('/api/task', taskRouter);
app.use('/api/auth', authRouter);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});

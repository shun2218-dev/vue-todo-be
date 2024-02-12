import { getTasks, createTask, updateTask, deleteTask } from '../../../controllers/task';
import { Router } from 'express';
import { authenticate } from '../../../controllers/auth';

const router = Router();

router.use(authenticate);

router.get('/', getTasks);

router.post('/', createTask);

router.put('/:taskId', updateTask);

router.delete('/:taskId', deleteTask);

export default router;

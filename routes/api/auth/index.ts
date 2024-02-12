import { signIn, signUp, updateToken } from '../../../controllers/auth';
import { Router } from 'express';

const router = Router();

router.post('/register/profile', signUp);

router.post('/login', signIn);

router.get('/refresh', updateToken);

export default router;
